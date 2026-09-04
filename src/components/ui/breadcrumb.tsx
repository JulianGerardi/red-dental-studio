import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export type Miga = { label: string; to?: string }

/* Rastro de navegación. El último tramo es la pantalla actual y por eso no es
   link: llevaría al mismo lugar. */
export function Breadcrumb({ items }: { items: Miga[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-[13px]">
      {items.map((m, i) => (
        <Fragment key={`${m.label}-${i}`}>
          {i > 0 && <ChevronRight className="size-3.5 shrink-0 text-[#a1a1aa]" />}
          {m.to ? (
            <Link to={m.to} className="text-dash-blue hover:underline">
              {m.label}
            </Link>
          ) : (
            <span className="text-[#71717a]">{m.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  )
}
