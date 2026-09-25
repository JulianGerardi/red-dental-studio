import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Check, X, EllipsisVertical, Pencil, User, DoorClosed, Clock, ArrowRight,
} from 'lucide-react'
import { InnerCard, StatusPill } from './primitives'
import { cn } from '@/lib/utils'
import { ICONO_SUELTO } from '@/lib/estilos'
import { aviso } from '@/components/ui/toaster'

export type Appointment = {
  name: string
  initials: string
  provider: string
  operatory: string
  time: string
  /* Botón del pie. En el frame casi todas dicen "Check Out" y una "Cancel". */
  accion?: 'Check Out' | 'Cancel'
}

/* Figma 4430:57451. El card se rediseñó: sin borde, con la foto y el badge
   "Check In" a la izquierda, los chips TR/CC y el kebab a la derecha, los dos
   campos grises con la caja de hora al costado, y el botón de acción a lo
   ancho del pie. */
export function AppointmentCard({
  appt,
  id,
  activa,
  onSelect,
  onEdit,
  compact,
}: {
  appt: Appointment
  /** Identifica la card entre los dos paneles. */
  id?: string
  /** Con el popup abierto: la card queda marcada con el anillo azul. */
  activa?: boolean
  onSelect?: (appt: Appointment, el: HTMLElement, id?: string) => void
  onEdit?: (appt: Appointment) => void
  /** Versión chica para una lista angosta -el costado de Patients-: una fila
      con nombre + hora/provider, sin los chips TR/CC, sin el "Check In" y
      sin el botón de Check Out. Es otro layout, no el mismo con partes
      escondidas -por eso vive en su propio componente más abajo. */
  compact?: boolean
}) {
  if (compact) return <AppointmentCardCompacta appt={appt} />

  const accion = appt.accion ?? 'Check Out'

  return (
    <InnerCard
      aria-expanded={onSelect ? !!activa : undefined}
      className={cn(
        'flex flex-col gap-2.5 p-3',
        onSelect && 'cursor-pointer transition-colors hover:bg-[#fafbfe]',
        /* Mismo anillo que el FAB de Scheduling: outline + offset, con el
           hueco transparente para que se vea el fondo del panel. */
        '[outline-style:solid] outline-[3px] outline-offset-[3px] outline-transparent transition-[outline-color]',
        activa && 'outline-[var(--color-dash-ring)]',
      )}
      onClick={(e) => onSelect?.(appt, e.currentTarget, id)}
    >
      {/* Fila 1: paciente + acciones */}
      {/* Todo en un renglón, también en angosto: Julián prefiere que el nombre
          se recorte antes que mandar los chips a una segunda línea. */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <span className="bg-dash-blue flex size-11 shrink-0 items-center justify-center rounded-xl text-sm font-semibold text-white">
            {appt.initials}
          </span>
          <span className="flex min-w-0 flex-col gap-1">
            <span className="text-dash-name truncate text-[15px] leading-none font-bold">
              {appt.name}
            </span>
            <StatusPill tone="ok" className="self-start">Check In</StatusPill>
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <span className="flex h-8 items-center gap-1 rounded-lg bg-green-soft px-2 text-[13px] text-ink">
            TR <Check className="text-dash-ok-fg size-4" strokeWidth={2.5} />
          </span>
          <span className="flex h-8 items-center gap-1 rounded-lg bg-dash-bad-chip px-2 text-[13px] text-ink">
            CC <X className="size-4 text-field-error" strokeWidth={2.5} />
          </span>
          <MenuCard nombre={appt.name} onEdit={onEdit && (() => onEdit(appt))} />
        </div>
      </div>

      {/* Fila 2: los dos campos y, al costado, la caja de hora con el alto
          de los dos apilados. */}
      <div className="flex items-stretch gap-2">
        <div className="flex min-w-px flex-1 flex-col gap-2">
          <Field icon={<User className="size-4 shrink-0" />} text={appt.provider} />
          <Field icon={<DoorClosed className="size-4 shrink-0" />} text={appt.operatory} />
        </div>
        <div className="bg-dash-field flex w-[68px] shrink-0 flex-col items-center justify-center gap-1 rounded-lg">
          <Clock className="size-4 text-ink-medium" />
          <span className="text-[13px] font-medium text-ink">{appt.time}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          accion === 'Cancel'
            ? aviso.warn(`Appointment for ${appt.name} was cancelled.`)
            : aviso.ok(`${appt.name} checked out.`)
        }}
        className="bg-dash-blue hover:bg-dash-blue-hover flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold text-white transition-colors"
      >
        {accion} <ArrowRight className="size-4" />
      </button>
    </InnerCard>
  )
}

/* Una fila, no una card de dos pisos: avatar, nombre y hora/provider abajo
   en gris, y una flecha a Scheduling en vez del menú -acá no hay nada para
   editar in situ. Mismo tamaño de trigger que el kebab de las tablas
   (`ICONO_SUELTO`), para que quede a la par de PatientCard al lado -misma
   sombra que esa card también: la `shadow-inner-card` de acá abajo es de
   `InnerCard`, pensada para las cards grandes del Dashboard, y sin borde en
   una fila chica se veía como una línea cortada en vez de una sombra. */
function AppointmentCardCompacta({ appt }: { appt: Appointment }) {
  return (
    <InnerCard className="flex items-center gap-2.5 border border-line p-2.5 shadow-[0_1px_3px_rgb(0_0_0/0.08)]">
      <span className="bg-dash-blue flex size-8 shrink-0 items-center justify-center rounded-lg text-[12px] font-semibold text-white">
        {appt.initials}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-[13px] font-semibold text-ink">{appt.name}</span>
        <span className="flex items-center gap-1 text-[11px] text-ink-muted">
          <Clock className="size-3 shrink-0" />
          <span className="truncate">{appt.time} · {appt.provider}</span>
        </span>
      </span>
      <Link to="/scheduling" aria-label={`View ${appt.name}'s appointment`} className={ICONO_SUELTO}>
        <ArrowRight className="size-4" />
      </Link>
    </InnerCard>
  )
}

function Field({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="bg-dash-field flex h-10 items-center gap-2 rounded-lg px-3 text-[13px] text-ink-medium">
      {icon}
      <span className="truncate">{text}</span>
    </span>
  )
}


/* El kebab del frame está dibujado sin menú. Despliega "Edit appointment",
   que abre el mismo modal de alta con los datos de la card ya cargados. */
function MenuCard({ nombre, onEdit }: { nombre: string; onEdit?: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        aria-label={`Actions for ${nombre}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-ink shadow-sm hover:bg-surface-muted',
          open && 'bg-surface-muted',
        )}
      >
        <EllipsisVertical className="size-4" />
      </button>
      {open && onEdit && (
        <div className="motion-safe:animate-[loc-in_120ms_ease-out] absolute top-full right-0 z-30 mt-1 w-44 overflow-hidden rounded-md border border-line bg-white py-1 shadow-lg">
          <button
            type="button"
            onClick={() => { setOpen(false); onEdit() }}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] hover:bg-surface-muted"
          >
            <Pencil className="size-3.5" /> Edit appointment
          </button>
        </div>
      )}
    </div>
  )
}
