import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { ReactNode } from 'react'
import { Clock, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { InnerCard } from '@/components/dashboard/primitives'
import { Pill, type PillTone } from '@/components/ui/pill'
import { Avatar } from '@/components/ui/avatar'

/* La card de un turno en una lista angosta, con estado y acciones: los turnos del Patient Dashboard
   (PatientAppointmentCard) y las solicitudes de Scheduling (SolicitudCard). Una sola para que no se
   vuelvan a separar. Ver Elements / Appointment cards y patient-dashboard.md (2026-10-12).

   Por qué así:
   - Barra de 3px a la izquierda del color de la pill: el estado se lee de reojo en la lista, como en
     los bloques del calendario.
   - Avatar con las iniciales, nombre y pill arriba; un nombre largo baja a un segundo renglón (y recién ahí se
     recorta): es lo que identifica a quién llamar, y en el celular el panel de solicitudes mide 260.
   - Motivo, fecha y lugar en gris, un renglón cada uno: la card no crece en una columna angosta.
   - Las acciones abajo a la derecha, con ui/button sm. */

/** El color de la barra: el mismo del borde de la Pill de cada tono. */
export const BARRA_TONOS: Record<PillTone, string> = {
  success: 'border-l-dash-ok-fg',
  info: 'border-l-dash-busy-fg',
  warning: 'border-l-warn-fg',
  danger: 'border-l-dash-bad-fg',
  neutral: 'border-l-ink-faint',
  purple: 'border-l-purple-fg',
}

const inicialesDe = (nombre: string) =>
  nombre.split(/\\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase()

export function TarjetaTurno({
  tono, etiqueta, nombre, iniciales, motivo, cuando, lugar, acciones, className,
}: {
  /** Tono de la pill y de la barra. */
  tono: PillTone
  /** Texto de la pill: el estado del turno o la urgencia de la solicitud. */
  etiqueta: string
  nombre: string
  /** Sin iniciales, salen del nombre. */
  iniciales?: string
  motivo: string
  cuando: string
  lugar: string
  /** Botones del pie (ui/button sm). Sin acciones no hay pie. */
  acciones?: ReactNode
  className?: string
}) {
  return (
    <InnerCard className={cn('border-l-[3px] p-2.5', BARRA_TONOS[tono], className)}>
      <div className="flex items-start gap-2">
        <Avatar initials={iniciales ?? inicialesDe(nombre)} size={24} />
        <span className="line-clamp-2 min-w-0 flex-1 text-xs leading-4 font-semibold break-words text-ink" title={nombre}>{nombre}</span>
        <Pill tone={tono} className="shrink-0">{etiqueta}</Pill>
      </div>
      <p className="mt-1 truncate text-[11px] text-ink-muted" title={motivo}>{motivo}</p>
      <p className="mt-1 flex items-center gap-1.5 text-[11px] text-ink-muted">
        <Clock className="size-3 shrink-0" /> {cuando}
      </p>
      <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-ink-muted">
        <MapPin className="size-3 shrink-0" /> <span className="truncate">{lugar}</span>
      </p>
      {acciones && <div className="mt-2 flex items-center justify-end gap-2">{acciones}</div>}
    </InnerCard>
  )
}
`})))()}export{n,i as r,r as t};