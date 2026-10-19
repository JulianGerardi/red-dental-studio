import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { OperatoryCard, type Operatory } from './OperatoryCard'

/* Las salas del Dashboard en una tira arriba de los turnos (Julián, 2026-10-13), en una sola fila con scroll horizontal
   (2026-10-19): ocupa un renglón sin importar cuántas salas haya y la card que asoma al borde avisa que hay más. Con
   pocas salas se reparten el ancho; con muchas, cada una mide OPERATORY_MIN y se desliza. Siempre hay una elegida: tocar
   otra la cambia (Appointments y Waiting Room muestran sólo a los suyos). Ver design-reference/figma/modulos/dashboard.md. */

export const OPERATORY_MIN = 232

export function OperatoryStrip({ rooms, elegida, onElegir }: {
  rooms: Operatory[]
  /** El nombre de la sala elegida. */
  elegida?: string | null
  /** Tocar una sala: su nombre. */
  onElegir?: (sala: string) => void
}) {
  if (rooms.length === 0) return null
  return (
    /* -m-1.5 p-1.5: aire para que el scroll no corte el anillo de la elegida ni la sombra. */
    <section
      aria-label="Rooms"
      className="-m-1.5 grid snap-x snap-proximity auto-cols-[minmax(var(--operatory-min),1fr)] grid-flow-col gap-4 overflow-x-auto overscroll-x-contain p-1.5 [scrollbar-width:thin]"
      style={{ '--operatory-min': \`\${OPERATORY_MIN}px\` } as React.CSSProperties}
    >
      {rooms.map((r) => (
        <div key={r.name} className="snap-start">
          <OperatoryCard
            room={r} enPagina
            seleccionada={!!elegida && elegida === r.name}
            atenuada={!!elegida && elegida !== r.name}
            onClick={onElegir && (() => onElegir(r.name))}
          />
        </div>
      ))}
    </section>
  )
}
`})))()}export{n,i as r,r as t};