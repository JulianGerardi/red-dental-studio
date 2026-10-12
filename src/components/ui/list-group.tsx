import { Children, isValidElement, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Un grupo de una lista larga adentro de una card: rótulo en versalitas con la cuenta, plegable y con tope de ítems
   ("Show 12 more"). Generaliza el agrupado de Pending documents para el Dashboard con volumen. Ver
   design-reference/figma/modulos/dashboard.md (2026-10-12). */

export const LIST_GROUP_TONES = {
  default: 'text-ink-muted',
  danger: 'text-dash-bad-fg',
  warning: 'text-warn-fg',
  info: 'text-dash-blue',
  success: 'text-dash-ok-fg',
} as const

export type ListGroupTone = keyof typeof LIST_GROUP_TONES

export function ListGroup({
  title, count, tone = 'default', note, collapsible, defaultOpen = true, limit, sticky, empty, className, children,
}: {
  title: string
  /** El total, cuando la lista muestra sólo una parte (los tres que más esperan de cinco). Sin él, cuenta los ítems. */
  count?: number
  /** Color del rótulo: dice qué tan urgente es el grupo (Overdue en rojo, Due today en ámbar). */
  tone?: ListGroupTone
  /** Dato a la derecha del rótulo: "longest 27 min". */
  note?: ReactNode
  /** El rótulo pliega y despliega el grupo (Completed arranca plegado). */
  collapsible?: boolean
  defaultOpen?: boolean
  /** Cuántos ítems se ven antes de "Show N more". Sin tope, se ven todos. */
  limit?: number
  /** El rótulo queda pegado arriba mientras se scrollea la lista de un panel. */
  sticky?: boolean
  /** Texto cuando el grupo no tiene ítems. Sin él, el grupo vacío no se dibuja. */
  empty?: string
  className?: string
  children?: ReactNode
}) {
  const [abierto, setAbierto] = useState(defaultOpen)
  const [todos, setTodos] = useState(false)
  const items = Children.toArray(children).filter(isValidElement)
  if (items.length === 0 && !empty) return null
  const visibles = limit && !todos ? items.slice(0, limit) : items
  const resto = items.length - visibles.length
  const rotulo = (
    <>
      {collapsible && <ChevronDown aria-hidden className={cn('size-3.5 transition-transform', !abierto && '-rotate-90')} />}
      {title} · {count ?? items.length}
    </>
  )

  return (
    <section aria-label={title} className={cn('flex flex-col gap-1.5', className)}>
      <div className={cn('flex min-h-6 items-center justify-between gap-2', sticky && 'sticky top-0 z-10 -mx-1 bg-white px-1 py-1')}>
        {collapsible ? (
          <button
            type="button" aria-expanded={abierto} onClick={() => setAbierto((v) => !v)}
            className={cn(
              'flex items-center gap-1 rounded text-[11px] font-semibold tracking-wide uppercase',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue',
              LIST_GROUP_TONES[tone],
            )}
          >
            {rotulo}
          </button>
        ) : (
          <p className={cn('text-[11px] font-semibold tracking-wide uppercase', LIST_GROUP_TONES[tone])}>{rotulo}</p>
        )}
        {note && <span className="text-[11px] text-ink-muted">{note}</span>}
      </div>

      {abierto && (items.length === 0 ? (
        <p className="rounded-lg px-3 py-3 text-[12px] text-ink-muted shadow-hairline">{empty}</p>
      ) : (
        <ul className="flex flex-col divide-y divide-line-soft rounded-lg bg-white shadow-hairline">
          {visibles.map((it) => <li key={it.key}>{it}</li>)}
        </ul>
      ))}

      {abierto && (resto > 0 || (todos && limit && items.length > limit)) && (
        <button
          type="button" onClick={() => setTodos((v) => !v)}
          className="self-start rounded text-[12px] font-medium text-dash-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue"
        >
          {resto > 0 ? `Show ${resto} more` : 'Show less'}
        </button>
      )}
    </section>
  )
}
