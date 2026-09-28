import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { ReactNode } from 'react'
import { addons } from 'storybook/preview-api'

/* Cómo se va de una página a otra del sitio. El sitio vive adentro del
   Storybook, que es el que sabe qué página mostrar: en vez de un link común
   (que recargaba todo en cada clic) se le pide que cambie de página. El href
   queda igual, así que abrir en otra pestaña o copiar el link sigue andando. */

export const hrefDeId = (id: string) => \`./?path=/\${id.endsWith('--docs') ? 'docs' : 'story'}/\${id}\`

export function ir(id: string) {
  addons.getChannel().emit('selectStory', { storyId: id })
}

export function Enlace({ id, className, children, onClick, ...resto }: { id: string; className?: string; children: ReactNode; onClick?: () => void } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'>) {
  return (
    <a
      {...resto}
      href={hrefDeId(id)}
      target="_top"
      className={className}
      onClick={(e) => {
        onClick?.()
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        e.preventDefault()
        ir(id)
      }}
    >
      {children}
    </a>
  )
}
`})))()}export{r as n,n as r,i as t};