import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { OperatoryCard, type Operatory } from './OperatoryCard'
import type { Appointment } from './AppointmentCard'

/* Las salas del Dashboard como lista de acordeones (artifact de Julián, 2026-10-19): cada una se despliega sola y puede
   haber varias abiertas. Cada sala cuenta sus turnos del día; no filtra la Waiting Room, que es independiente.
   Ver design-reference/figma/modulos/dashboard.md. */
export function OperatoryList({ rooms, turnos, onSelect }: {
  rooms: Operatory[]
  /** Los turnos del día, de todas las salas: cada card toma los suyos por nombre. */
  turnos: Appointment[]
  onSelect?: (appt: Appointment, el: HTMLElement) => void
}) {
  const [abiertas, setAbiertas] = useState<string[]>([])
  const alternar = (name: string) => setAbiertas((a) => (a.includes(name) ? a.filter((x) => x !== name) : [...a, name]))
  if (rooms.length === 0) return null
  return (
    <div role="group" aria-label="Rooms" className="flex flex-col gap-2.5">
      {rooms.map((r) => (
        <OperatoryCard
          key={r.name} room={r} turnos={turnos.filter((t) => t.operatory === r.name)}
          abierta={abiertas.includes(r.name)} onToggle={() => alternar(r.name)} onSelect={onSelect}
        />
      ))}
    </div>
  )
}
`})))()}export{n,i as r,r as t};