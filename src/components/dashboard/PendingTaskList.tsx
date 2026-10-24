import { cn } from '@/lib/utils'
import { ShowMore } from '@/components/ui/show-more'
import { TaskRow } from './DashboardRows'
import type { PendingTask } from './PendingTaskCard'

/* Las tareas pendientes con el diseño de Pending documents (Julián, 2026-10-19): agrupadas por tipo, cada grupo con su
   rótulo en versalitas y la cuenta, y las filas en una sola caja con divisores finos. Los primeros `limit` y "Show N
   more" abre el resto con scroll adentro (ui/show-more). La usan Pending Task del Dashboard y del Patient Dashboard.
   Ver design-reference/figma/modulos/dashboard.md. */
const ORDEN = ['Clinical Note', 'Lab Orders', 'Prescriptions', 'Referrals']

export function PendingTaskList({ tasks, limit, enCaja }: { tasks: PendingTask[]; limit?: number; enCaja?: boolean }) {
  const tipos = [...new Set([...ORDEN.filter((k) => tasks.some((t) => t.kind === k)), ...tasks.map((t) => t.kind)])]
  const enOrden = tipos.flatMap((k) => tasks.filter((t) => t.kind === k))
  if (enOrden.length === 0) return null
  return (
    <ShowMore total={enOrden.length} limit={limit ?? enOrden.length} enCaja={enCaja} label="pending tasks" className="flex flex-col gap-4">
      {(n) => {
        const visibles = enOrden.slice(0, n)
        return tipos.map((k) => {
          const del = visibles.filter((t) => t.kind === k)
          if (!del.length) return null
          return (
            <section key={k} aria-label={k} className="flex flex-col gap-1.5">
              <p className={cn('text-[11px] font-semibold tracking-wide text-ink-muted uppercase')}>{k} · {tasks.filter((t) => t.kind === k).length}</p>
              <ul className="shadow-hairline flex flex-col divide-y divide-line-soft rounded-lg">
                {del.map((t, i) => <li key={i}><TaskRow task={t} /></li>)}
              </ul>
            </section>
          )
        })
      }}
    </ShowMore>
  )
}
