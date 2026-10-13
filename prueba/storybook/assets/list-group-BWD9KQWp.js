import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { Children, isValidElement, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ShowMore } from './show-more'
import { TARJETA_INTERNA } from '@/lib/estilos'

/* Filas dentro de una card, cada una en su card interna (TARJETA_INTERNA) y separadas, con rótulo opcional y el tope de
   ShowMore: se ven los primeros \`limit\` y "Show N more" abre el resto con scroll. Cards y no una caja con divisores: así
   siguen el lenguaje de las demás cards de la app (Julián, 2026-10-13). Ver design-reference/figma/modulos/dashboard.md. */

export const LIST_GROUP_TONES = {
  default: 'text-ink-muted',
  info: 'text-dash-blue',
} as const

export type ListGroupTone = keyof typeof LIST_GROUP_TONES

export function ListGroup({
  title, tone = 'default', collapsible, defaultOpen = true, limit, maxHeight, label, className, children,
}: {
  /** Nombre del grupo; va en versalitas con la cuenta. Sin título, es sólo la lista. */
  title?: string
  /** Color del rótulo. */
  tone?: ListGroupTone
  /** El rótulo pliega y despliega el grupo. */
  collapsible?: boolean
  defaultOpen?: boolean
  /** Cuántas filas se ven antes de "Show N more". Sin tope, se ven todas. */
  limit?: number
  /** Alto máximo de la lista abierta (ver ShowMore). */
  maxHeight?: string
  /** Nombre de lo que se lista, para el lector de pantalla. */
  label?: string
  className?: string
  children?: ReactNode
}) {
  const [abierto, setAbierto] = useState(defaultOpen)
  const items = Children.toArray(children).filter(isValidElement)
  if (items.length === 0) return null
  const rotulo = (
    <>
      {collapsible && <ChevronDown aria-hidden className={cn('size-3.5 transition-transform', !abierto && '-rotate-90')} />}
      {title} · {items.length}
    </>
  )
  const claseRotulo = cn('flex items-center gap-1 rounded text-[11px] font-semibold tracking-wide uppercase', LIST_GROUP_TONES[tone])

  return (
    <section aria-label={title} className={cn('flex flex-col gap-1.5', className)}>
      {title && (
        <div className="flex min-h-6 items-center">
          {collapsible ? (
            <button
              type="button" aria-expanded={abierto} onClick={() => setAbierto((v) => !v)}
              className={cn(claseRotulo, 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue')}
            >
              {rotulo}
            </button>
          ) : (
            <p className={claseRotulo}>{rotulo}</p>
          )}
        </div>
      )}

      {abierto && (
        <ShowMore total={items.length} limit={limit ?? items.length} maxHeight={maxHeight} label={label ?? title}>
          {(cuantos) => (
            <ul className="flex flex-col gap-3">
              {items.slice(0, cuantos).map((it) => <li key={it.key} className={TARJETA_INTERNA}>{it}</li>)}
            </ul>
          )}
        </ShowMore>
      )}
    </section>
  )
}
`})))()}export{r as n,n as r,i as t};