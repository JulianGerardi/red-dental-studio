import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export type Miga = { label: string; to?: string }

/* Rastro de navegación. El último tramo es la pantalla actual y por eso no es
   link: llevaría al mismo lugar. Los tramos van separados con "/" (Julián, 2026-10-17). */
export function Breadcrumb({ items }: { items: Miga[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[13px]">
      {items.map((m, i) => (
        <Fragment key={\`\${m.label}-\${i}\`}>
          {i > 0 && <span aria-hidden className="text-ink-faint">/</span>}
          {m.to ? (
            <Link
              to={m.to}
              className="text-dash-blue rounded hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue"
            >
              {m.label}
            </Link>
          ) : (
            <span aria-current={i === items.length - 1 ? 'page' : undefined} className="text-ink-muted">{m.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  )
}
`})))()}export{n,i as r,r as t};