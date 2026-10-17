import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { Calendar, User } from 'lucide-react'
import { InnerCard, StatusPill } from './primitives'

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

/* Figma I3636:58505;7350:4654 — este panel NO venía escalado: sus
   valores ya eran limpios (px-13 py-10 gap-5, radius 5, icons 10px,
   textos 11/9/8). Se sube ~1.3× para acompañar al resto. */
export function OperatoryCard({ room }: { room: Operatory }) {
  return (
    <InnerCard className="flex w-full flex-col gap-1.5 px-3.5 py-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-dash-name truncate text-sm leading-none font-semibold">
          {room.name}
        </p>
        <StatusPill tone={TONE[room.status]}>{room.status}</StatusPill>
      </div>

      <div className="text-dash-muted flex items-center gap-1 text-xs">
        <Calendar className="size-3.5 shrink-0" />
        <span>Patients today:</span>
        <span className="bg-dash-count-bg text-dash-blue-hover rounded-full px-2 py-[3px] text-[11px] leading-none font-medium">
          {room.patientsToday}
        </span>
      </div>

      <div className="text-dash-muted flex items-center gap-1.5 text-xs">
        <User className="size-3.5 shrink-0" />
        <span className="truncate">{room.provider}</span>
      </div>
    </InnerCard>
  )
}
`})))()}export{n,i as r,r as t};