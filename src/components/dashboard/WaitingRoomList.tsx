import { ShowMore } from '@/components/ui/show-more'
import { Pill } from '@/components/ui/pill'
import { TARJETA_INTERNA } from '@/lib/estilos'
import { AppointmentRow } from './DashboardRows'
import type { AccionMenu, Appointment } from './AppointmentCard'
import { ETAPAS_ESPERA, claveTurno, minutosDesde, type EnEspera, type EtapaEspera } from './dashboard-data'

/* La Waiting Room agrupada por etapa (comparativa del 2026-11-19, CON-1670): Checked in, On hold y Ready to check out,
   cada grupo con su cuenta total. La acción depende de la etapa: sólo Ready to check out lleva Check Out; las otras
   dicen cuánto lleva la espera o la pausa. Ver design-reference/figma/modulos/dashboard.md. */

/* Primero quien más espera (el `desde` más temprano); los que salen, por hora. */
const porDesde = (a: EnEspera, b: EnEspera) => (a.desde ?? '').localeCompare(b.desde ?? '')
const ORDEN: Record<EtapaEspera, (a: EnEspera, b: EnEspera) => number> = {
  'Checked in': porDesde,
  'On hold': porDesde,
  'Ready to check out': (a, b) => a.time.localeCompare(b.time),
}

/* Con el tope, cada grupo muestra al menos uno: así ninguna etapa queda escondida detrás de "Show N more" y la cuenta
   del rótulo dice dónde están las que faltan. El resto del tope se reparte en orden. */
export function repartir(tamanos: number[], tope: number) {
  const visibles = tamanos.map((n) => Math.min(n, 1))
  let resto = tope - visibles.reduce((a, b) => a + b, 0)
  return visibles.map((v, i) => {
    const suma = Math.max(0, Math.min(tamanos[i]! - v, resto))
    resto -= suma
    return v + suma
  })
}

/* Waiting cuenta desde el check-in y Paused desde el inicio de la pausa actual, no desde la hora de la cita (CON-4178). */
const ESTADO: Partial<Record<EtapaEspera, string>> = { 'Checked in': 'Waiting', 'On hold': 'Paused' }

export function WaitingRoomList({ pacientes, ahora, limit, seleccionada, onSelect, onEdit, onAccion, acciones }: {
  pacientes: EnEspera[]
  /** La hora actual del día (HH:MM) para contar los minutos; null en un día pasado o futuro. */
  ahora: string | null
  /** Cuántas filas se ven antes de "Show N more". */
  limit?: number
  /** Id de la fila que abrió la ficha rápida. */
  seleccionada?: string
  onSelect?: (appt: Appointment, el: HTMLElement, id?: string) => void
  onEdit?: (p: EnEspera) => void
  onAccion?: (p: EnEspera) => void
  /** El kebab según la etapa (Checked in suma Cancel appointment). */
  acciones?: (p: EnEspera) => AccionMenu[]
}) {
  const grupos = ETAPAS_ESPERA
    .map((etapa) => ({ etapa, filas: pacientes.filter((p) => p.etapa === etapa).sort(ORDEN[etapa]) }))
    .filter((g) => g.filas.length > 0)
  if (grupos.length === 0) return null
  const total = pacientes.length
  return (
    <ShowMore total={total} limit={limit ?? total} label="patients in the waiting room" className="flex flex-col gap-4">
      {(n) => {
        const cuantos = n >= total ? grupos.map((g) => g.filas.length) : repartir(grupos.map((g) => g.filas.length), n)
        return grupos.map((g, gi) => (
          <section key={g.etapa} aria-label={g.etapa} className="flex flex-col gap-1.5">
            <p className="text-[11px] font-semibold tracking-wide text-ink-muted uppercase">{g.etapa} · {g.filas.length}</p>
            <ul className="flex flex-col gap-3">
              {g.filas.slice(0, cuantos[gi]).map((p) => {
                const id = `wait-${claveTurno(p)}`
                const min = minutosDesde(p.desde, ahora)
                const texto = ESTADO[p.etapa] && (min === undefined ? ESTADO[p.etapa] : `${ESTADO[p.etapa]} · ${min} min`)
                return (
                  <li key={id} className={TARJETA_INTERNA}>
                    <AppointmentRow
                      appt={{ ...p, accion: 'Check out' }} id={id} activa={seleccionada === id}
                      chips={p.etapa === 'Checked in'}
                      estado={texto && <Pill tone="warning" size="sm" className="tabular-nums">{texto}</Pill>}
                      onSelect={onSelect} onEdit={onEdit && (() => onEdit(p))} onAccion={onAccion && (() => onAccion(p))}
                      acciones={acciones?.(p)}
                    />
                  </li>
                )
              })}
            </ul>
          </section>
        ))
      }}
    </ShowMore>
  )
}
