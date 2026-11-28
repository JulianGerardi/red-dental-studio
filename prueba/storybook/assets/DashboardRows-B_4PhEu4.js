import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { ReactNode } from 'react'
import { ArrowRight, Check, ClipboardList, Clock, FileText, FlaskConical, Pill, Send, TriangleAlert, X, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ACCION_TURNO, MenuCard, accionTurno, type AccionMenu, type Appointment } from './AppointmentCard'
import { completarTarea, type PendingTask } from './PendingTaskCard'
import { MenuTarea, TONO_ESTADO, nombreTarea, type AccionUI } from './tareas'
import { Avatar } from '@/components/ui/avatar'
import { Pill as PillTag } from '@/components/ui/pill'

/* Las filas del Dashboard con volumen (propuesta del 2026-10-12, ver design-reference/figma/modulos/dashboard.md): lo
   mismo que cada card del Figma, en una fila. Mismos datos, mismos chips y mismas acciones; cambia sólo cómo se acomodan.
   Con @container la fila se adapta al ancho de su lista: en renglones en angosto, en columnas cuando entra. */

/* Los chips TR y CC de la card de turno (AppointmentCard), a 24px de alto. */
export function ChipsTurno({ className }: { className?: string }) {
  return (
    <span className={cn('flex shrink-0 items-center gap-1', className)}>
      <span className="flex h-6 items-center gap-0.5 rounded-md bg-green-soft px-1.5 text-[11px] text-ink">
        TR <Check className="text-dash-ok-fg size-3.5" strokeWidth={2.5} />
      </span>
      <span className="flex h-6 items-center gap-0.5 rounded-md bg-dash-bad-chip px-1.5 text-[11px] text-ink">
        CC <X className="size-3.5 text-field-error" strokeWidth={2.5} />
      </span>
    </span>
  )
}

type PropsTurno = {
  appt: Appointment
  /** Identifica la fila: la ficha rápida marca la que la abrió. */
  id?: string
  /** Con la ficha rápida abierta desde esta fila. */
  activa?: boolean
  onSelect?: (appt: Appointment, el: HTMLElement, id?: string) => void
  onEdit?: (appt: Appointment) => void
  /** La sala de arriba ya la dice el chip del título: repetirla en cada fila es ruido (Julián, 2026-10-19). */
  ocultarOperatorio?: boolean
  /** TR y CC: sólo en Checked in de la Waiting Room; antes del check-in no son lo que recepción necesita. */
  chips?: boolean
  /** En lugar del botón: el estado de la visita (Waiting · 12 min, Paused · 23 min). */
  estado?: ReactNode
  /** Después del aviso del botón: mover el turno (Check In lo pasa a la Waiting Room). */
  onAccion?: (appt: Appointment) => void
  /** Las acciones del kebab según el estado de la cita; sin esto, sólo Edit appointment. */
  acciones?: AccionMenu[]
}

/* El nombre abre la ficha rápida y es el camino con teclado: la fila entera no puede ser un botón porque tiene otros adentro. */
export function NombreTurno({ appt, id, activa, onSelect, className }: Pick<PropsTurno, 'appt' | 'id' | 'activa' | 'onSelect'> & { className?: string }) {
  const texto = <span className="truncate text-[13px] font-semibold text-ink">{appt.name}</span>
  if (!onSelect) return <span className={cn('flex min-w-0', className)} title={appt.name}>{texto}</span>
  return (
    <button
      type="button" aria-expanded={!!activa} title={appt.name}
      onClick={(e) => onSelect(appt, e.currentTarget.closest<HTMLElement>('[data-appt-row]')!, id)}
      className={cn('flex min-w-0 rounded-md text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue', className)}
    >
      {texto}
    </button>
  )
}

/* Un turno: hora, iniciales, nombre, provider y operatorio, el botón de la acción que toca (o el estado de la visita)
   y el kebab con Edit appointment. Sin el badge Check In: se confundía con el botón (comparativa del 2026-11-19, ver
   dashboard.md). Angosta en dos renglones; ancha en columnas. */
export function AppointmentRow({ appt, id, activa, onSelect, onEdit, ocultarOperatorio, chips, estado, onAccion, acciones }: PropsTurno) {
  const accion = appt.accion ?? 'Check out'
  const iniciales = <Avatar initials={appt.initials} size={28} />
  const fin = estado ?? (
    <Button size="sm" variant={ACCION_TURNO[accion]} className="shrink-0" onClick={(e) => { e.stopPropagation(); accionTurno(appt); onAccion?.(appt) }}>{accion} <ArrowRight /></Button>
  )
  const menu = <MenuCard nombre={appt.name} onEdit={onEdit && (() => onEdit(appt))} acciones={acciones} />
  const donde = ocultarOperatorio ? appt.provider : \`\${appt.provider} · \${appt.operatory}\`

  return (
    <div className="@container">
      {/* Tocar la fila abre la ficha, como la card (Julián, 2026-10-19); los botones, links y menús de adentro hacen lo
          suyo. Con el teclado se llega por el nombre. */}
      <div
        data-appt-row
        onClick={onSelect && ((e) => {
          if ((e.target as HTMLElement).closest('button, a, [role="menu"], [role="menuitem"]')) return
          onSelect(appt, e.currentTarget, id)
        })}
        className={cn('rounded-lg p-2.5 transition-colors', onSelect && 'cursor-pointer hover:bg-surface-alt', activa && 'bg-info-bg hover:bg-info-bg')}
      >
        {/* La hora en la caja gris de la card (reloj y hora), del alto de la fila (Julián, 2026-10-13). */}
        <div className="flex items-stretch gap-2.5 @4xl:hidden">
          <span className="bg-dash-field flex w-12 shrink-0 flex-col items-center justify-center gap-1 rounded-lg py-2">
            <Clock className="size-3.5 text-ink-medium" />
            <span className="text-[12px] font-semibold text-ink tabular-nums">{appt.time}</span>
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <div className="flex min-h-7 items-center gap-2">
              {iniciales}
              <NombreTurno appt={appt} id={id} activa={activa} onSelect={onSelect} className="flex-1" />
              {chips && <ChipsTurno />}
              {menu}
            </div>
            {/* Provider y sala a la izquierda, la acción o el estado a la derecha; si no entran, el final baja. */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
              <span className="min-w-[120px] flex-1 truncate text-[12px] text-ink-muted" title={donde}>{donde}</span>
              <span className="ml-auto flex shrink-0">{fin}</span>
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-4 @4xl:flex">
          <span className="bg-dash-field flex h-8 w-[72px] shrink-0 items-center justify-center gap-1.5 rounded-lg text-[12px] font-semibold text-ink tabular-nums">
            <Clock className="size-3.5 text-ink-medium" />{appt.time}
          </span>
          {iniciales}
          <NombreTurno appt={appt} id={id} activa={activa} onSelect={onSelect} className="w-52 shrink-0" />
          <span className="min-w-0 flex-1 truncate text-[12px] text-ink-soft">{appt.provider}</span>
          {!ocultarOperatorio && <span className="w-24 shrink-0 truncate text-[12px] text-ink-soft">{appt.operatory}</span>}
          {chips && <ChipsTurno />}
          <span className="flex w-32 shrink-0 justify-end">{fin}</span>
          {menu}
        </div>
      </div>
    </div>
  )
}

const ICONO_TAREA: Record<string, LucideIcon> = {
  'Clinical note': ClipboardList, 'Lab orders': FlaskConical, Prescriptions: Pill, Referrals: Send,
}

/* Expired date si la fecha ya pasó, como red.dev; la Clinical Note no lo lleva (dashboard.md, 2026-11-20). */
const vencida = (t: PendingTask, hoy: Date) => {
  const f = new Date(t.expiration)
  return t.kind !== 'Clinical note' && !Number.isNaN(f.getTime()) && f < new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())
}

type PropsTarea = {
  task: PendingTask
  /** Hay un encuentro abierto con el paciente: el ⋮ deja hacer sus acciones. */
  encuentroAbierto?: boolean
  /** Lo que hacen el ⋮, el PDF y Complete this Task (\`useAccionesTarea\`). Sin esto, el botón sólo avisa. */
  onAccion?: (t: PendingTask, a: AccionUI) => void
  /** El día contra el que se mide el vencimiento (el del Dashboard); por defecto, hoy. */
  hoy?: Date
}

/* Una tarea con el diseño de Pending documents (Julián, 2026-10-19): el ícono del tipo en su cuadrado, el tipo con su
   estado en pills, quién y cuándo se registró abajo, el vencimiento a la derecha, el PDF, Complete this Task y el ⋮.
   El PDF sólo si ya hay documento y Expired date sólo si venció, como red.dev (dashboard.md, 2026-11-20). Va adentro de la lista
   con divisores de PendingTaskList. Ver design-reference/figma/modulos/dashboard.md. */
export function TaskRow({ task, encuentroAbierto = false, onAccion, hoy = new Date() }: PropsTarea) {
  const Icono = ICONO_TAREA[task.kind] ?? ClipboardList
  const expirada = vencida(task, hoy)
  const fecha = task.kind === 'Clinical note' ? 'Completed' : 'Register'
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-3 py-2.5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-info-bg text-dash-busy-fg"><Icono className="size-4" /></span>
      {/* El nombre pide 14rem: en una columna angosta el vencimiento y el botón bajan a otro renglón en vez de aplastarlo. */}
      <span className="min-w-0 flex-1 basis-56">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-[13px] font-semibold text-ink">{task.kind}</span>
          <PillTag tone={TONO_ESTADO[task.state] ?? 'info'} size="sm">{task.state}</PillTag>
          {expirada && <PillTag tone="warning" size="sm"><TriangleAlert className="mr-1 size-2.5" />Expired date</PillTag>}
        </span>
        <span className="block truncate text-[12px] text-ink-muted" title={task.person}>
          {task.person}{task.provider ? \` · \${task.provider}\` : ''} · {fecha} {task.register}
        </span>
      </span>
      <span className="ml-auto flex shrink-0 items-center gap-3">
        <span className="flex flex-col items-end gap-0.5 text-right">
          <span className="text-dash-bad-fg text-[12px] font-semibold tabular-nums">{task.expiration}</span>
          <span className="text-[11px] text-ink-muted">Expiration date</span>
        </span>
        {/* Sin documento queda el hueco: Complete this Task no se corre de una fila a otra. */}
        {task.pdf === false ? <span className="size-7 shrink-0" aria-hidden /> : (
          <button
            type="button" aria-label={\`Open PDF of the \${nombreTarea(task).toLowerCase()} for \${task.person}\`} title="Open PDF"
            onClick={() => onAccion?.(task, 'PDF')}
            className="bg-dash-bad-chip border-dash-bad-fg flex size-7 shrink-0 items-center justify-center rounded-md border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue"
          >
            <FileText className="text-dash-bad-fg size-3.5" />
          </button>
        )}
        <Button size="sm" className="shrink-0" onClick={() => (onAccion ? onAccion(task, 'Complete') : completarTarea(task))}>Complete this task <ArrowRight /></Button>
        {/* El hueco del ⋮ queda aunque la tarea no tenga acciones (Clinical note): las fechas no se corren (dashboard.md, 2026-11-24). */}
        {onAccion && <span className="flex size-7 shrink-0 items-center justify-center"><MenuTarea task={task} abierto={encuentroAbierto} onAccion={onAccion} /></span>}
      </span>
    </div>
  )
}
`})))()}export{n,i as r,r as t};