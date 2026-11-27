import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { DrawerActions } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Trash2, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ModalShell, SelectField } from '@/components/patients/form'
import { aviso } from '@/components/ui/toaster'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import type { EstadoDia } from '@/data/location-detail'
import { OBLIGATORIO } from '@/lib/validacion'

/* Misma grilla de media hora que "New exception": desplegable, no texto
   libre con máscara. */
const HORAS = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2)
  const m = i % 2 === 0 ? '00' : '30'
  return \`\${String(h).padStart(2, '0')}:\${m} hs\`
})

/* Figma 4620:115332: lo abre "Edit hours" o activar Open en un día cerrado.
   Elegir varios días aplica estas franjas a esos días en esta operación: no
   los deja vinculados, así que no hay "All linked days" (ver
   figma/modulos/locations.md, 2026-11-06, CON-1546). El día de origen no se
   puede sacar, y pisar el horario distinto de otro día abierto se pregunta
   antes (Replace working hours?, locations.md 2026-11-16). */

const DIAS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
export const NOMBRES_DIA = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

type Rango = { inicio: string; fin: string }

/* "08:00 hs" (desplegable) <-> "08:00 AM" (chip de la tabla). */
export const aMinutos = (h: string) => {
  const [hh, mm] = h.slice(0, 5).split(':').map(Number)
  return hh * 60 + mm
}
const aChip = (h: string) => {
  const m = aMinutos(h)
  const hh = Math.floor(m / 60)
  return \`\${String(hh % 12 || 12).padStart(2, '0')}:\${String(m % 60).padStart(2, '0')} \${hh < 12 ? 'AM' : 'PM'}\`
}
export const deChip = (h: string) => {
  const [hora, ampm] = h.trim().split(' ')
  const [hh, mm] = hora.split(':').map(Number)
  const h24 = (hh % 12) + (ampm === 'PM' ? 12 : 0)
  return \`\${String(h24).padStart(2, '0')}:\${String(mm).padStart(2, '0')} hs\`
}
const desdeChips = (rangos: string[]): Rango[] =>
  rangos.map((r) => {
    const [inicio, fin] = r.split(' - ')
    return { inicio: deChip(inicio), fin: deChip(fin) }
  })

/* Un día igual a otro compara las franjas ordenadas, no el orden en que se cargaron. */
const clave = (rangos: string[]) =>
  rangos.map((r) => r.split(' - ').map((h) => aMinutos(deChip(h))).join('-')).sort().join('|')
export const mismoHorario = (a: string[], b: string[]) => clave(a) === clave(b)

/* "Monday", "Monday and Tuesday", "Monday, Tuesday and Wednesday". */
export const listaDias = (dias: number[]) => {
  const n = [...dias].sort((a, b) => a - b).map((i) => NOMBRES_DIA[i])
  return n.length < 2 ? n.join('') : \`\${n.slice(0, -1).join(', ')} and \${n[n.length - 1]}\`
}

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

export function LocationHoursModal({
  dia, iniciales, horario, onClose, onGuardar,
}: {
  /** Índice 0-6 (domingo a sábado) del día de origen: queda seleccionado en "Repeat on days". */
  dia?: number
  /** Franjas actuales del día ("08:00 AM - 01:00 PM"), para editarlas. Sin franjas, arranca con una fila vacía. */
  iniciales?: string[]
  /** Horario actual de la semana (0-6): con él se pregunta antes de pisar el de otro día abierto. */
  horario?: EstadoDia[]
  onClose: () => void
  /** Recibe los días elegidos y sus franjas ya en formato de chip, ordenadas. Si devuelve false, todavía no se guardó
      (quedan turnos por resolver): el panel sigue abierto con el borrador y el que lo abrió se encarga del cierre. */
  onGuardar?: (dias: number[], rangos: string[]) => boolean | void
}) {
  const [rangos, setRangos] = useState<Rango[]>(iniciales?.length ? desdeChips(iniciales) : [{ inicio: '', fin: '' }])
  const [dias, setDias] = useState<number[]>(dia !== undefined ? [dia] : [1, 2, 3, 4, 5])
  const [intentado, setIntentado] = useState(false)
  /* Días abiertos, además del de origen, cuyo horario se va a pisar: se pregunta antes (Replace working hours?). */
  const [reemplazo, setReemplazo] = useState<{ dias: number[]; rangos: string[]; pisados: number[] } | null>(null)

  const errores = rangos.map((r, i) => errorDe(r, i, rangos))
  const sinDias = dias.length === 0

  const guardar = () => {
    setIntentado(true)
    if (rangos.some((r) => !r.inicio || !r.fin) || errores.some(Boolean) || sinDias) return
    const ordenados = [...rangos].sort((a, b) => aMinutos(a.inicio) - aMinutos(b.inicio))
    const chips = ordenados.map((r) => \`\${aChip(r.inicio)} - \${aChip(r.fin)}\`)
    const elegidos = [...dias].sort((a, b) => a - b)
    const pisados = elegidos.filter((i) => i !== dia && horario?.[i]?.abierto && !mismoHorario(horario[i].rangos, chips))
    if (pisados.length) setReemplazo({ dias: elegidos, rangos: chips, pisados })
    else terminar(elegidos, chips)
  }

  /* Guarda, salvo que el que abrió el panel pida resolver turnos antes: entonces el panel queda abierto. */
  const terminar = (elegidos: number[], chips: string[]) => {
    setReemplazo(null)
    if (onGuardar?.(elegidos, chips) === false) return
    aviso.ok(elegidos.length === 1 ? \`Hours saved for \${NOMBRES_DIA[elegidos[0]]}.\` : \`Hours saved for \${elegidos.length} days.\`)
    onClose()
  }

  const cambiar = (i: number, k: keyof Rango) => (v: string) =>
    setRangos((p) => p.map((x, j) => (j === i ? { ...x, [k]: v } : x)))

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
                  label="Start time" required placeholder="00:00 hs" options={HORAS} value={r.inicio}
                  onChange={cambiar(i, 'inicio')}
                  error={intentado && !r.inicio ? OBLIGATORIO : undefined}
                />
                <SelectField
                  label="End time" required placeholder="00:00 hs" options={HORAS} value={r.fin}
                  onChange={cambiar(i, 'fin')}
                  error={intentado && !r.fin ? OBLIGATORIO : undefined}
                />
              </div>
              {rangos.length > 1 && (
                <button
                  type="button"
                  aria-label="Delete time range"
                  onClick={() => setRangos((p) => p.filter((_, j) => j !== i))}
                  className="mt-7 shrink-0 rounded p-1 text-dash-bad-fg hover:bg-dash-bad-bg"
                >
                  <Trash2 className="size-4" />
                </button>
              )}
            </div>
            {errores[i] && (
              <p role="alert" className="text-[11px] text-dash-bad-fg">{errores[i]}</p>
            )}
          </div>
        ))}

        <Button variant="secondary" className="self-start" onClick={() => setRangos((p) => [...p, { inicio: '', fin: '' }])}>
          <Plus /> Add another time range
        </Button>

        <div className="border-t border-line pt-4">
          <p className="text-sm font-bold text-ink">Repeat on days</p>
          <p className="mt-0.5 text-[11px] text-ink-muted">
            These hours replace the current hours of each selected day. Each day can still be edited on its own later.
          </p>
          <div className="mt-3 flex gap-2">
            {DIAS.map((d, i) => {
              const on = dias.includes(i)
              /* El día que se está editando queda elegido: no se puede sacar. */
              const fijo = i === dia
              return (
                <button
                  key={i}
                  type="button"
                  aria-pressed={on}
                  aria-disabled={fijo || undefined}
                  aria-label={fijo ? \`\${NOMBRES_DIA[i]} (day being edited)\` : NOMBRES_DIA[i]}
                  title={fijo ? 'Day being edited' : undefined}
                  onClick={() => !fijo && setDias((p) => (on ? p.filter((x) => x !== i) : [...p, i]))}
                  className={cn(
                    'flex size-8 items-center justify-center rounded-md border text-[13px] font-semibold transition-colors',
                    fijo
                      ? 'border-dash-blue bg-dash-blue cursor-default text-white'
                      : on
                        ? 'border-dash-blue text-dash-blue bg-surface'
                        : 'border-transparent text-ink-faint hover:bg-surface-muted',
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
          title="Replace working hours?"
          confirmLabel="Confirm"
          onCancel={() => setReemplazo(null)}
          onConfirm={() => terminar(reemplazo.dias, reemplazo.rangos)}
        >
          This will replace the existing working hours for {listaDias(reemplazo.pisados)}. Do you want to continue?
        </ConfirmDialog>
      )}
    </ModalShell>
  )
}
`})))()}export{n,i as r,r as t};