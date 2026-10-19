import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { Calendar, User } from 'lucide-react'
import { StatusPill } from './primitives'
import { cn } from '@/lib/utils'
import { TARJETA_INTERNA } from '@/lib/estilos'

export type OperatoryStatus = 'Available' | 'Busy' | 'Unavailable'

export type Operatory = {
  name: string
  status: OperatoryStatus
  patientsToday: number
  provider: string
}

const TONE = {
  Available: 'ok',
  Busy: 'busy',
  Unavailable: 'bad',
} as const

/* Sobre la página, la card toma el color de su estado (borde y fondo, los de su pill): de un vistazo se ve qué sala está
   libre (Julián, 2026-10-17). Ver design-reference/figma/modulos/dashboard.md. */
export const OPERATORY_SURFACES = {
  Available: 'border-dash-ok-fg bg-dash-ok-bg',
  Busy: 'border-dash-busy-fg bg-dash-busy-bg',
  Unavailable: 'border-dash-bad-fg bg-dash-bad-bg',
} as const

/* Figma I3636:58505;7350:4654 — este panel NO venía escalado: sus
   valores ya eran limpios (px-13 py-10 gap-5, radius 5, icons 10px,
   textos 11/9/8). Se sube ~1.3× para acompañar al resto.
   Va adentro de un panel (card interna, blanca) o suelta sobre la página, en la tira de arriba del Dashboard (con el
   color de su estado). Con onClick es un botón que elige la sala (Appointments y Waiting Room muestran sólo a los suyos): la elegida lleva el anillo y las demás se
   apagan (2026-10-17). */
export function OperatoryCard({ room, enPagina, seleccionada, atenuada, onClick }: {
  room: Operatory
  /** Sobre el fondo gris de la página, no adentro de un panel: toma el color de su estado. */
  enPagina?: boolean
  /** La sala por la que está filtrada la sala de espera. */
  seleccionada?: boolean
  /** Hay otra sala elegida: ésta se apaga hasta que se pasa el mouse. */
  atenuada?: boolean
  /** La card se vuelve un botón (aria-pressed). */
  onClick?: () => void
}) {
  const clases = cn(
    enPagina ? cn('rounded-lg border', OPERATORY_SURFACES[room.status]) : TARJETA_INTERNA,
    'flex w-full min-w-0 flex-col gap-1.5 px-3.5 py-3 text-left',
    onClick && 'transition-[opacity,box-shadow] hover:shadow-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue',
    seleccionada && '[outline-style:solid] outline-2 outline-offset-2 outline-dash-ring shadow-panel',
    atenuada && 'opacity-60 hover:opacity-100 focus-visible:opacity-100',
  )
  const contenido = (
    <>
      <span className="flex items-center justify-between gap-2">
        <span className="text-dash-name truncate text-sm leading-none font-semibold">
          {room.name}
        </span>
        <StatusPill tone={TONE[room.status]}>{room.status}</StatusPill>
      </span>

      <span className="text-dash-muted flex items-center gap-1 text-xs">
        <Calendar className="size-3.5 shrink-0" />
        <span>Patients today:</span>
        <span className="bg-dash-count-bg text-dash-blue-hover rounded-full px-2 py-[3px] text-[11px] leading-none font-medium">
          {room.patientsToday}
        </span>
      </span>

      <span className="text-dash-muted flex items-center gap-1.5 text-xs">
        <User className="size-3.5 shrink-0" />
        <span className="truncate">{room.provider}</span>
      </span>
    </>
  )

  if (!onClick) return <div className={clases}>{contenido}</div>
  return (
    <button
      type="button" aria-pressed={!!seleccionada} onClick={onClick}
      title={seleccionada ? \`\${room.name} is shown\` : \`Show \${room.name}\`}
      className={clases}
    >
      {contenido}
    </button>
  )
}
`})))()}export{n,i as r,r as t};