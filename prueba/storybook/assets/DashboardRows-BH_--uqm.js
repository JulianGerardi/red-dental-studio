import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { ArrowRight, Check, FileText, TriangleAlert, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { StatusPill } from './primitives'
import { MenuCard, accionTurno, type Appointment } from './AppointmentCard'
import { completarTarea, type PendingTask } from './PendingTaskCard'

/* Las filas del Dashboard con volumen (propuesta del 2026-10-12, ver design-reference/figma/modulos/dashboard.md): lo
   mismo que cada card del Figma, en una fila. Mismos datos, mismos chips y mismas acciones; cambia sólo cómo se acomodan.
   Con @container la fila se adapta al ancho de su lista: en renglones en angosto, en columnas cuando entra. */

/* Los chips TR y CC de la card de turno (AppointmentCard), a 24px de alto. */
export function ChipsTurno() {
  return (
    <span className="flex shrink-0 items-center gap-1">
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
}

/* El nombre abre la ficha rápida, como en la card: la fila entera no puede ser un botón porque tiene otros adentro. */
export function NombreTurno({ appt, id, activa, onSelect, className }: Omit<PropsTurno, 'onEdit'> & { className?: string }) {
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

const CHECK_IN = <StatusPill tone="ok" className="px-1.5 py-[2px] text-[10px]">Check In</StatusPill>

/* Un turno: hora, iniciales, nombre con Check In, provider y operatorio, TR y CC, Check Out o Cancel y el kebab con
   Edit appointment. Angosta en dos renglones; ancha en columnas. */
export function AppointmentRow({ appt, id, activa, onSelect, onEdit }: PropsTurno) {
  const accion = appt.accion ?? 'Check Out'
  const hora = <span className="w-10 shrink-0 text-[13px] font-semibold text-ink tabular-nums">{appt.time}</span>
  const iniciales = (
    <span className="bg-dash-blue flex size-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-semibold text-white">
      {appt.initials}
    </span>
  )
  const boton = (
    <Button size="sm" className="shrink-0" onClick={() => accionTurno(appt)}>{accion} <ArrowRight /></Button>
  )
  const menu = <MenuCard nombre={appt.name} onEdit={onEdit && (() => onEdit(appt))} />
  const donde = \`\${appt.provider} · \${appt.operatory}\`

  return (
    <div className="@container">
      <div data-appt-row className={cn('py-2 pr-2 pl-3', activa && 'bg-info-bg')}>
        <div className="flex items-start gap-2 @3xl:hidden">
          <span className="flex h-7 items-center">{hora}</span>
          {iniciales}
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex min-h-7 items-center gap-2">
              <NombreTurno appt={appt} id={id} activa={activa} onSelect={onSelect} className="flex-1" />
              <ChipsTurno />
              {menu}
            </div>
            {/* Si no entra, el botón baja a su propio renglón en vez de cortar el provider. */}
            <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
              <span className="flex min-w-[min(240px,100%)] flex-1 items-center gap-1.5">
                {CHECK_IN}
                <span className="truncate text-[11px] text-ink-muted" title={donde}>{donde}</span>
              </span>
              <span className="ml-auto">{boton}</span>
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-4 @3xl:flex">
          {hora}
          {iniciales}
          <span className="flex w-52 shrink-0 items-center gap-2">
            <NombreTurno appt={appt} id={id} activa={activa} onSelect={onSelect} />
            {CHECK_IN}
          </span>
          <span className="min-w-0 flex-1 truncate text-[12px] text-ink-soft">{appt.provider}</span>
          <span className="w-24 shrink-0 truncate text-[12px] text-ink-soft">{appt.operatory}</span>
          <ChipsTurno />
          <span className="flex w-28 shrink-0 justify-end">{boton}</span>
          {menu}
        </div>
      </div>
    </div>
  )
}

/* El documento y "Expired date" de la card de tarea. */
export function DocYVencida() {
  return (
    <span className="flex shrink-0 items-center gap-1.5">
      <button
        type="button" aria-label="Open document"
        className="bg-dash-bad-chip border-dash-bad-fg flex size-7 shrink-0 items-center justify-center rounded-md border"
      >
        <FileText className="text-dash-bad-fg size-3.5" />
      </button>
      <span className="flex shrink-0 items-center gap-1 rounded-md border border-amber-400 bg-amber-50 px-2 py-1.5 text-[11px] font-medium text-amber-700">
        <TriangleAlert className="size-3" /> Expired date
      </span>
    </span>
  )
}

/* Una tarea: lo mismo que PendingTaskCard (tipo, Requested, paciente, documento, Expired date, Register, Expiration
   date y Complete this Task), en el mismo orden pero más compacta. En columnas recién desde 1024px de lista: tiene más
   partes que el turno. */
export function TaskRow({ task }: { task: PendingTask }) {
  const tipo = <span className="text-dash-name truncate text-sm leading-none font-bold">{task.kind}</span>
  const persona = (
    <span className="flex min-w-0 items-center gap-2">
      <span className="bg-dash-count-bg text-dash-blue-hover flex size-7 shrink-0 items-center justify-center rounded-md text-[11px] font-semibold">
        {task.initials}
      </span>
      <span className="text-dash-name truncate text-[13px] font-semibold">{task.person}</span>
    </span>
  )
  const estado = (
    <span className="text-dash-blue flex shrink-0 items-center gap-1.5 text-xs">
      <span className="bg-dash-blue size-1.5 rounded-full" /> {task.state}
    </span>
  )
  const fecha = (rotulo: string, valor: string, color: string) => (
    <span className="flex flex-col gap-0.5 text-[11px]">
      <span className="text-dash-delta">{rotulo}</span>
      <span className={cn('font-medium whitespace-nowrap', color)}>{valor}</span>
    </span>
  )
  const fechas = (
    <span className="flex gap-4">
      {fecha('Register', task.register, 'text-dash-blue')}
      {fecha('Expiration date', task.expiration, 'text-dash-bad-fg')}
    </span>
  )
  const boton = (
    <Button size="sm" className="shrink-0" onClick={() => completarTarea(task)}>Complete this Task <ArrowRight /></Button>
  )

  return (
    <div className="@container">
      <div className="flex flex-col gap-2 py-2.5 pr-2 pl-3 @5xl:hidden">
        <div className="flex items-center justify-between gap-2">{tipo}{estado}</div>
        {/* Si no entran, el documento y Expired date bajan en vez de cortar el nombre; lo mismo el botón. */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="flex min-w-[min(180px,100%)] flex-1">{persona}</span>
          <DocYVencida />
        </div>
        <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
          {fechas}
          <span className="ml-auto">{boton}</span>
        </div>
      </div>

      <div className="hidden items-center gap-4 py-2 pr-2 pl-3 @5xl:flex">
        <span className="flex w-28 shrink-0">{tipo}</span>
        <span className="flex w-44 shrink-0">{persona}</span>
        <span className="w-24 shrink-0">{estado}</span>
        <DocYVencida />
        <span className="flex min-w-0 flex-1 justify-end">{fechas}</span>
        {boton}
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};