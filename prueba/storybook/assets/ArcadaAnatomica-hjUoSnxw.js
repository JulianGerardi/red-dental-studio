import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { cn } from '@/lib/utils'
import type { Denticion } from '@/data/laboratorios'
import { ARCADAS_RED, VISTA_ARCADAS } from './arcadasRed'

/* Teeth & surface de una Lab order como está armado en red.dev (Julián, 2026-11-27): el dibujo de las dos arcadas con la
   anatomía de cada diente, su número afuera y Maxillary / Mandibular adentro. Cada diente es un botón: se marca en azul
   y el que se está editando lleva el contorno. El dibujo vive en \`arcadasRed\` (generado); los colores son los tokens
   de la app. Ver design-reference/figma/modulos/clinical-mode.md (2026-11-27). */
export function ArcadaAnatomica({ denticion, marcados, actual, onToggle, disabled, className }: {
  denticion: Denticion
  marcados: string[]
  /** El diente cuyas superficies se ven en la rueda. */
  actual: string | null
  onToggle: (diente: string) => void
  /** Sólo lectura: se ve lo marcado, no se cambia. */
  disabled?: boolean
  className?: string
}) {
  const arcada = ARCADAS_RED[denticion]
  return (
    <svg viewBox={VISTA_ARCADAS} role="group" aria-label={\`\${denticion} teeth\`} className={cn('h-[340px] w-auto max-w-full shrink-0 overflow-visible select-none', className)}>
      <g transform="translate(-1 -2)" fill="none" fillRule="evenodd">
        <g transform={arcada.transform || undefined}>
          <g aria-hidden dangerouslySetInnerHTML={{ __html: arcada.fondo }} />
          <g transform={arcada.seleccion}>
            {arcada.dientes.map((t) => {
              const marcado = marcados.includes(t.id)
              return (
                <path
                  key={t.id} d={t.d} transform={t.t} role="button" aria-pressed={marcado} aria-label={\`Tooth \${t.id}\`}
                  aria-disabled={disabled || undefined} tabIndex={disabled ? -1 : 0}
                  onClick={() => { if (!disabled) onToggle(t.id) }}
                  onKeyDown={(e) => { if (!disabled && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onToggle(t.id) } }}
                  className={cn(
                    'outline-none transition-colors [fill-opacity:0.45] focus-visible:stroke-dash-blue focus-visible:stroke-2',
                    marcado ? 'fill-dash-blue' : 'fill-transparent',
                    !disabled && 'cursor-pointer',
                    !disabled && !marcado && 'hover:fill-dash-blue hover:[fill-opacity:0.2]',
                    actual === t.id && 'stroke-dash-blue stroke-2 [fill-opacity:0.6]',
                  )}
                >
                  <title>{\`Tooth \${t.id}\`}</title>
                </path>
              )
            })}
          </g>
        </g>
      </g>
    </svg>
  )
}
`})))()}export{n,i as r,r as t};