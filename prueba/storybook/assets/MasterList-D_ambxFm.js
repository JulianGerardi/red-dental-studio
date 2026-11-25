import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { SettingsSearch } from '@/components/settings/SettingsSearch'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import type { PillTone } from '@/components/ui/pill'

/* La lista de la izquierda de Fee Schedules y Coverage Table (red.dev): buscador, un filtro y un ítem por fee schedule o
   tabla, con su menú. El elegido se abre a la derecha. El estado va como punto de color y, para quien no ve el color, con
   su nombre en el title y en texto oculto. Ver settings-billing.md. */

/* El color del punto, el mismo de la pill de cada tono. */
const PUNTO: Record<PillTone, string> = {
  success: 'bg-dash-ok-fg', info: 'bg-dash-busy-fg', warning: 'bg-warn-fg', danger: 'bg-dash-bad-fg', neutral: 'bg-ink-faint', purple: 'bg-purple-fg',
}

export type ItemMaestro = {
  id: string
  nombre: string
  to: string
  /** Al lado del nombre: la pill "Default". */
  etiqueta?: ReactNode
  estado?: { nombre: string; tono: PillTone }
  /** Los ítems del menú ⋮. */
  acciones?: ReactNode
}

export function MasterList({
  items, elegido, q, onQ, placeholder, filtro, vacio = 'No results.', abierto,
}: {
  items: ItemMaestro[]
  elegido?: string
  q: string
  onQ: (v: string) => void
  placeholder: string
  /** El filtro de arriba: estados en Fee Schedules, tipo en Coverage Table. */
  filtro?: ReactNode
  vacio?: string
  /** Sólo para las stories: deja abierto el menú de ese ítem. */
  abierto?: string
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2"><SettingsSearch value={q} onChange={onQ} placeholder={placeholder} className="sm:max-w-none" /></div>
      {filtro}
      <ul aria-label="List" className="flex max-h-[560px] flex-col gap-0.5 overflow-y-auto rounded-lg p-1 shadow-hairline">
        {items.length === 0 && <li className="px-3 py-6 text-center text-[13px] text-ink-muted">{vacio}</li>}
        {items.map((it) => (
          <li key={it.id} className={cn('group flex items-center gap-2 rounded-md pr-1 transition-colors', it.id === elegido ? 'bg-info-bg' : 'hover:bg-surface-subtle')}>
            <Link
              to={it.to}
              aria-current={it.id === elegido ? 'page' : undefined}
              className={cn('flex min-w-0 flex-1 items-center gap-2 py-2 pl-3 text-[13px]', it.id === elegido ? 'font-medium text-dash-blue' : 'text-ink')}
            >
              <span className="truncate">{it.nombre}</span>
              {it.etiqueta}
            </Link>
            {it.estado && (
              <span title={it.estado.nombre} className={cn('size-2 shrink-0 rounded-full', PUNTO[it.estado.tono])}>
                <span className="sr-only">{it.estado.nombre}</span>
              </span>
            )}
            {it.acciones && <RowActionsMenu label={it.nombre} abierto={abierto === it.id}>{it.acciones}</RowActionsMenu>}
          </li>
        ))}
      </ul>
    </div>
  )
}
`})))()}export{n,i as r,r as t};