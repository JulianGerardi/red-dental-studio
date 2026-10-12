import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { Children, isValidElement, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Una lista larga adentro de una card, en grupos: rótulo en versalitas con la cuenta, plegable y con tope de ítems
   ("Show 12 more"). Generaliza el agrupado de Pending documents para el Dashboard con volumen. Ver
   design-reference/figma/modulos/dashboard.md (2026-10-12). */

export const LIST_GROUP_TONES = {
  default: 'text-ink-muted',
  info: 'text-dash-blue',
} as const

export type ListGroupTone = keyof typeof LIST_GROUP_TONES

export function ListGroup({
  title, tone = 'default', collapsible, defaultOpen = true, limit, sticky, className, children,
}: {
  /** Nombre del grupo; va en versalitas con la cuenta. Sin título, es sólo la lista (la Waiting Room). */
  title?: string
  /** Color del rótulo: azul para lo que sigue (Scheduled), gris para el resto. */
  tone?: ListGroupTone
  /** El rótulo pliega y despliega el grupo (Completed arranca plegado). */
  collapsible?: boolean
  defaultOpen?: boolean
  /** Cuántos ítems se ven antes de "Show N more". Sin tope, se ven todos. */
  limit?: number
  /** El rótulo queda pegado arriba mientras se scrollea la lista de un panel. */
  sticky?: boolean
  className?: string
  children?: ReactNode
}) {
  const [abierto, setAbierto] = useState(defaultOpen)
  const [todos, setTodos] = useState(false)
  const items = Children.toArray(children).filter(isValidElement)
  if (items.length === 0) return null
  const visibles = limit && !todos ? items.slice(0, limit) : items
  const resto = items.length - visibles.length
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
        <div className={cn('flex min-h-6 items-center', sticky && 'sticky top-0 z-10 -mx-1 bg-white px-1 py-1')}>
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
        <ul className="flex flex-col divide-y divide-line-soft rounded-lg bg-white shadow-hairline">
          {visibles.map((it) => <li key={it.key}>{it}</li>)}
        </ul>
      )}

      {abierto && (resto > 0 || (todos && limit && items.length > limit)) && (
        <button
          type="button" onClick={() => setTodos((v) => !v)}
          className="self-start rounded text-[12px] font-medium text-dash-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue"
        >
          {resto > 0 ? \`Show \${resto} more\` : 'Show less'}
        </button>
      )}
    </section>
  )
}
`})))()}export{r as n,n as r,i as t};