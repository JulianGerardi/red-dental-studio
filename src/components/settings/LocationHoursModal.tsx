import { DrawerActions } from '@/components/ui/drawer'
import { useState } from 'react'
import { CirclePlus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ModalShell, SelectField } from '@/components/patients/form'
import { aviso } from '@/components/ui/toaster'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { Pill } from '@/components/ui/pill'
import { PROVIDERS_LOCACION, type CitaLocacion, type EstadoCita, type EstadoDia } from '@/data/location-detail'

/* Misma grilla de media hora que "New Exception": desplegable, no texto
   libre con máscara. */
const HORAS = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2)
  const m = i % 2 === 0 ? '00' : '30'
  return `${String(h).padStart(2, '0')}:${m} hs`
})

/* Figma 4620:115332: lo abre "Edit hours" o activar Open en un día cerrado.
   Elegir varios días aplica estas franjas a esos días en esta operación: no
   los deja vinculados, así que no hay "All linked days". Si algún día elegido ya está Open con otro horario se pregunta
   "Replace working hours?", y si quedan citas Proposed / Booked fuera del horario nuevo se resuelven antes de guardar
   (figma/modulos/locations.md, 2026-11-06 CON-1546 y 2026-11-16). */

const DIAS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
export const NOMBRES_DIA = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

type Rango = { inicio: string; fin: string }

/* "08:00 hs" (desplegable) <-> "08:00 AM" (chip de la tabla). */
const aMinutos = (h: string) => {
  const [hh, mm] = h.slice(0, 5).split(':').map(Number)
  return hh * 60 + mm
}
const aChip = (h: string) => {
  const m = aMinutos(h)
  const hh = Math.floor(m / 60)
  return `${String(hh % 12 || 12).padStart(2, '0')}:${String(m % 60).padStart(2, '0')} ${hh < 12 ? 'AM' : 'PM'}`
}
const deChip = (h: string) => {
  const [hora, ampm] = h.trim().split(' ')
  const [hh, mm] = hora.split(':').map(Number)
  const h24 = (hh % 12) + (ampm === 'PM' ? 12 : 0)
  return `${String(h24).padStart(2, '0')}:${String(mm).padStart(2, '0')} hs`
}
const desdeChips = (rangos: string[]): Rango[] =>
  rangos.map((r) => {
    const [inicio, fin] = r.split(' - ')
    return { inicio: deChip(inicio), fin: deChip(fin) }
  })
const minutosDeChip = (r: string): [number, number] => {
  const { inicio, fin } = desdeChips([r])[0]
  return [aMinutos(inicio), aMinutos(fin)]
}

/* Se comparan las franjas ordenadas, no en el orden en que se cargaron. */
const ordenadas = (rangos: string[]) => [...rangos].sort((a, b) => minutosDeChip(a)[0] - minutosDeChip(b)[0])
export const mismoHorario = (a: string[], b: string[]) => ordenadas(a).join('|') === ordenadas(b).join('|')

/* Días de "Repeat on days" (sin el de origen) que están Open con un horario distinto: son los que se reemplazan. */
export function diasAReemplazar(origen: number | undefined, dias: number[], horario: Record<string, EstadoDia>, nuevos: string[]) {
  return [...dias].sort((a, b) => a - b).filter((i) => {
    const d = horario[NOMBRES_DIA[i]]
    return i !== origen && d?.abierto && !mismoHorario(d.rangos, nuevos)
  })
}

/* Citas Proposed / Booked de los días guardados que no entran en ninguna franja nueva (empiezan y terminan adentro). */
export function citasFueraDeHorario(dias: number[], nuevos: string[], citas: CitaLocacion[]) {
  const franjas = nuevos.map(minutosDeChip)
  return citas.filter((c) => {
    if ((c.estado !== 'Proposed' && c.estado !== 'Booked') || !dias.includes(c.fecha.getDay())) return false
    const ini = c.fecha.getHours() * 60 + c.fecha.getMinutes()
    return !franjas.some(([a, b]) => ini >= a && ini + 60 <= b)
  })
}

/* Cómo quedó cada cita afectada: sin elegir va a Waiting List. */
export type ResolucionCita = { id: string; estado: EstadoCita; provider: string }

const fechaCita = (d: Date) =>
  d.toLocaleString('en-US', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })
const lista = (nombres: string[]) => new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(nombres)

/* Validaciones de CON-1546: Start < End, mínimo 30 minutos y sin superposición en el mismo día. */
function errorDe(r: Rango, i: number, rangos: Rango[]): string | undefined {
  if (!r.inicio || !r.fin) return undefined
  const a = aMinutos(r.inicio)
  const b = aMinutos(r.fin)
  if (a >= b) return 'Start time must be earlier than end time.'
  if (b - a < 30) return 'Time interval must be at least 30 minutes.'
  const pisa = rangos.some((o, j) => j !== i && o.inicio && o.fin && a < aMinutos(o.fin) && aMinutos(o.inicio) < b)
  if (pisa) return 'This time interval overlaps with another.'
}

type Eleccion = { provider?: string; estado?: 'Cancelled' | 'No Show' }

export function LocationHoursModal({
  dia, iniciales, horario, citas, onClose, onGuardar,
}: {
  /** Índice 0-6 (domingo a sábado) del día de origen: queda seleccionado en "Repeat on days" y no se puede sacar. */
  dia?: number
  /** Franjas actuales del día ("08:00 AM - 01:00 PM"), para editarlas. Sin franjas, arranca con una fila vacía. */
  iniciales?: string[]
  /** Estado de toda la semana, por nombre de día: con él se sabe qué días elegidos ya están Open con otro horario. */
  horario?: Record<string, EstadoDia>
  /** Citas de la locación: las Proposed / Booked que queden fuera del horario nuevo se resuelven antes de guardar. */
  citas?: CitaLocacion[]
  onClose: () => void
  /** Recibe los días elegidos, sus franjas ya en formato de chip, ordenadas, y cómo quedó cada cita afectada. */
  onGuardar?: (dias: number[], rangos: string[], citas: ResolucionCita[]) => void
}) {
  const [rangos, setRangos] = useState<Rango[]>(iniciales?.length ? desdeChips(iniciales) : [{ inicio: '', fin: '' }])
  const [dias, setDias] = useState<number[]>(dia !== undefined ? [dia] : [1, 2, 3, 4, 5])
  const [intentado, setIntentado] = useState(false)
  /* Los dos avisos de antes de guardar. Cancelar en cualquiera vuelve al panel con lo cargado y no guarda nada. */
  const [reemplazo, setReemplazo] = useState<number[] | null>(null)
  const [resolviendo, setResolviendo] = useState<CitaLocacion[] | null>(null)
  const [elegido, setElegido] = useState<Record<string, Eleccion>>({})

  const errores = rangos.map((r, i) => errorDe(r, i, rangos))
  const sinDias = dias.length === 0
  const ordenados = [...rangos].filter((r) => r.inicio && r.fin).sort((a, b) => aMinutos(a.inicio) - aMinutos(b.inicio))
  const chips = ordenados.map((r) => `${aChip(r.inicio)} - ${aChip(r.fin)}`)
  const diasOrdenados = [...dias].sort((a, b) => a - b)

  const finalizar = (afectadas: CitaLocacion[]) => {
    const resoluciones = afectadas.map((c): ResolucionCita => {
      const e = elegido[c.id] ?? {}
      return { id: c.id, estado: e.estado ?? (e.provider ? c.estado : 'Waiting List'), provider: e.provider ?? c.provider }
    })
    const aEspera = resoluciones.filter((r) => r.estado === 'Waiting List').length
    onGuardar?.(diasOrdenados, chips, resoluciones)
    const base = dias.length === 1 ? `Hours saved for ${NOMBRES_DIA[dias[0]]}.` : `Hours saved for ${dias.length} days.`
    aviso.ok(aEspera ? `${base} ${aEspera} appointment${aEspera > 1 ? 's' : ''} moved to the waiting list.` : base)
    onClose()
  }

  /* Después de confirmar el reemplazo (o si no hacía falta): las citas afuera del horario van a su pantalla. */
  const seguir = () => {
    setReemplazo(null)
    const afectadas = citasFueraDeHorario(diasOrdenados, chips, citas ?? [])
    if (!afectadas.length) return finalizar([])
    setElegido({})
    setResolviendo(afectadas)
  }

  const guardar = () => {
    setIntentado(true)
    if (rangos.some((r) => !r.inicio || !r.fin) || errores.some(Boolean) || sinDias) return
    const pisados = horario ? diasAReemplazar(dia, dias, horario, chips) : []
    if (pisados.length) setReemplazo(pisados)
    else seguir()
  }

  const cambiar = (i: number, k: keyof Rango) => (v: string) =>
    setRangos((p) => p.map((x, j) => (j === i ? { ...x, [k]: v } : x)))

  if (resolviendo) {
    const sinResolver = resolviendo.filter((c) => !elegido[c.id]?.provider && !elegido[c.id]?.estado).length
    return (
      <ModalShell
        title="Scheduled appointments"
        description="Appointments outside the new working hours"
        onClose={onClose}
        width="max-w-[560px]"
        actions={<DrawerActions onCancel={() => setResolviendo(null)} onSave={() => finalizar(resolviendo)} saveLabel="Confirm" />}
      >
        <p className="text-[13px] leading-relaxed text-ink-soft">
          There are scheduled appointments assigned to this location. You can review and manage each appointment
          individually, or confirm to move all appointments to the waiting list.
        </p>
        <p className="mt-4 text-sm font-bold text-ink">Affected Appointments ({resolviendo.length})</p>
        <ul className="mt-2 flex flex-col gap-3">
          {resolviendo.map((c) => {
            const e = elegido[c.id] ?? {}
            const resuelta = !!(e.provider || e.estado)
            const poner = (v: Eleccion) => setElegido((p) => ({ ...p, [c.id]: v }))
            return (
              <li key={c.id} className="flex flex-col gap-2 rounded-lg border border-line p-3">
                <div className="flex items-start justify-between gap-3">
                  <span className="min-w-0 leading-snug">
                    <span className="block text-[13px] font-medium text-ink tabular-nums">{fechaCita(c.fecha)}</span>
                    <span className="block text-[12px] text-ink-muted">{c.provider} · Patient: {c.paciente}</span>
                  </span>
                  <Pill tone="info" size="sm">{c.estado}</Pill>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <SelectField
                    label={`Change provider for ${c.paciente}`} hideLabel placeholder="Change provider"
                    options={PROVIDERS_LOCACION.filter((p) => p !== c.provider)}
                    value={e.provider ?? ''} onChange={(v) => poner({ provider: v })}
                  />
                  <SelectField
                    label={`Change status for ${c.paciente}`} hideLabel placeholder="Change status"
                    options={['Cancelled', 'No Show']}
                    value={e.estado ?? ''} onChange={(v) => poner({ estado: v as Eleccion['estado'] })}
                  />
                </div>
                <p className="flex items-center justify-between gap-2 text-[11px] text-ink-muted" aria-live="polite">
                  <span>
                    {e.provider ? `Will be reassigned to ${e.provider}.`
                      : e.estado ? `Will be marked as ${e.estado}.`
                        : 'Will be moved to the waiting list.'}
                  </span>
                  {resuelta && (
                    <button type="button" onClick={() => poner({})} className="text-dash-blue shrink-0 font-semibold hover:underline">
                      Reset
                    </button>
                  )}
                </p>
              </li>
            )
          })}
        </ul>
        <p className="mt-3 text-[11px] text-ink-muted">
          {sinResolver
            ? `${sinResolver} appointment${sinResolver > 1 ? 's' : ''} will move to the waiting list when you confirm.`
            : 'All appointments are resolved.'}
        </p>
      </ModalShell>
    )
  }

  return (
    <ModalShell
      title="Set working hours"
      onClose={onClose}
      width="max-w-[420px]"
      actions={<DrawerActions onCancel={onClose} onSave={guardar} />}
    >
      <div className="flex flex-col gap-4">
        {rangos.map((r, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex items-start gap-2">
              <div className="grid flex-1 grid-cols-2 gap-4">
                <SelectField
                  label="Start Time" placeholder="00:00 hs" options={HORAS} value={r.inicio}
                  onChange={cambiar(i, 'inicio')}
                  error={intentado && !r.inicio ? 'Required.' : undefined}
                />
                <SelectField
                  label="End Time" placeholder="00:00 hs" options={HORAS} value={r.fin}
                  onChange={cambiar(i, 'fin')}
                  error={intentado && !r.fin ? 'Required.' : undefined}
                />
              </div>
              {rangos.length > 1 && (
                <button
                  type="button"
                  aria-label="Remove time range"
                  onClick={() => setRangos((p) => p.filter((_, j) => j !== i))}
                  className="mt-7 shrink-0 rounded p-1 text-ink-muted hover:bg-surface-muted hover:text-dash-bad-fg"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
            {errores[i] && (
              <p role="alert" className="text-[11px] text-dash-bad-fg">{errores[i]}</p>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => setRangos((p) => [...p, { inicio: '', fin: '' }])}
          className="text-dash-blue -mt-2 flex items-center gap-1.5 self-start text-[13px] font-semibold hover:underline"
        >
          <CirclePlus className="size-4" /> Add another time range
        </button>

        <div className="border-t border-line pt-4">
          <p className="text-sm font-bold text-ink">Repeat on days</p>
          <p className="mt-0.5 text-[11px] text-ink-muted">
            These hours replace the current hours of each selected day.
            {dia !== undefined && ` ${NOMBRES_DIA[dia]} is the day you're editing, so it stays selected.`}
          </p>
          <div className="mt-3 flex gap-2">
            {DIAS.map((d, i) => {
              const on = dias.includes(i)
              const origen = i === dia
              return (
                <button
                  key={i}
                  type="button"
                  aria-pressed={on}
                  aria-disabled={origen || undefined}
                  aria-label={NOMBRES_DIA[i]}
                  onClick={() => !origen && setDias((p) => (on ? p.filter((x) => x !== i) : [...p, i]))}
                  className={cn(
                    'flex size-8 items-center justify-center rounded-md border text-[13px] font-semibold transition-colors',
                    on
                      ? 'border-dash-blue text-dash-blue bg-white'
                      : 'border-transparent text-ink-faint hover:bg-surface-muted',
                    origen && 'bg-info-bg cursor-default',
                  )}
                >
                  {d}
                </button>
              )
            })}
          </div>
          {intentado && sinDias && (
            <p role="alert" className="mt-2 text-[11px] text-dash-bad-fg">Select at least one day.</p>
          )}
        </div>
      </div>

      {reemplazo && (
        <ConfirmDialog
          icon="warning"
          title="Replace working hours?"
          confirmLabel="Confirm"
          onCancel={() => setReemplazo(null)}
          onConfirm={seguir}
        >
          <p>This will replace the existing working hours for {lista(reemplazo.map((i) => NOMBRES_DIA[i]))}. Do you want to continue?</p>
        </ConfirmDialog>
      )}
    </ModalShell>
  )
}
