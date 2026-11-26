import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { cn } from '@/lib/utils'

/* Las dos arcadas como en red.dev (dientes en U, Maxillary arriba y Mandibular abajo, con el lado derecho del paciente a
   la izquierda), dibujadas con botones numerados: la librería del odontograma no admite dos instancias montadas. Ver
   design-reference/figma/modulos/clinical-mode.md (2026-11-25). */

const BOTON = 24

export function DentalArch({ arriba, abajo, marcados, actual, conSuperficies, onToggle, disabled }: {
  /** De izquierda a derecha en pantalla: 1–16 (o A–J) arriba y 32–17 (o T–K) abajo. */
  arriba: string[]
  abajo: string[]
  marcados: string[]
  /** El diente cuyas superficies se editan en la rueda. */
  actual: string | null
  /** Los dientes que ya tienen superficies: llevan un punto. */
  conSuperficies: string[]
  onToggle: (diente: string) => void
  disabled?: boolean
}) {
  const n = arriba.length
  /* Medidas de dibujo: el ancho se escala al contenedor (los dientes van en %), el alto queda fijo. */
  const rx = n > 10 ? 160 : 118
  const ry = n > 10 ? 150 : 110
  const ancho = rx * 2 + BOTON
  const hueco = 36
  const caidaMax = Math.ceil(ry * (1 - Math.sin(Math.PI * 0.1)))
  const alto = caidaMax * 2 + hueco + BOTON * 2
  /* Del molar derecho al izquierdo, en U y sin llegar a la horizontal, como una arcada de verdad. */
  const punto = (i: number, abajoDe: boolean) => {
    const t = Math.PI * (0.9 - (0.8 * i) / (n - 1))
    const x = rx + rx * Math.cos(t)
    const caida = ry * (1 - Math.sin(t))
    return { left: \`calc((100% - \${BOTON}px) * \${x / (rx * 2)})\`, top: abajoDe ? alto - BOTON - caida : caida }
  }

  const diente = (d: string, i: number, abajoDe: boolean) => {
    const marcado = marcados.includes(d)
    return (
      <button
        key={d} type="button" onClick={() => onToggle(d)} disabled={disabled} aria-pressed={marcado} aria-label={\`Tooth \${d}\`}
        style={punto(i, abajoDe)}
        className={cn(
          'absolute flex size-6 items-center justify-center rounded-full border text-[10px] font-semibold tabular-nums transition-colors',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue disabled:cursor-not-allowed disabled:opacity-50',
          marcado ? 'border-dash-blue bg-dash-blue text-white' : 'border-line-strong bg-surface text-ink hover:border-dash-blue hover:bg-dash-count-bg',
          actual === d && 'ring-2 ring-dash-blue ring-offset-2',
        )}
      >
        {d}
        {conSuperficies.includes(d) && <span aria-hidden className="absolute -top-0.5 -right-0.5 size-2 rounded-full border border-surface bg-warn-fg" />}
      </button>
    )
  }

  return (
    <div className="w-full min-w-0">
      <div className="relative mx-auto w-full" style={{ maxWidth: ancho, height: alto }}>
        <div role="group" aria-label="Maxillary">{arriba.map((d, i) => diente(d, i, false))}</div>
        <span aria-hidden className="pointer-events-none absolute inset-x-0 text-center text-[11px] font-medium text-ink-muted" style={{ top: caidaMax * 0.55 }}>Maxillary</span>
        <span aria-hidden className="pointer-events-none absolute inset-x-0 text-center text-[11px] font-medium text-ink-muted" style={{ bottom: caidaMax * 0.55 }}>Mandibular</span>
        <div role="group" aria-label="Mandibular">{abajo.map((d, i) => diente(d, i, true))}</div>
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};