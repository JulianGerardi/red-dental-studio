import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { ReactNode } from 'react'
import { MoreVertical } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ICONO_SUELTO } from '@/lib/estilos'
import { cn } from '@/lib/utils'

/* El kebab de acciones de fila, igual en toda tabla del sistema: mismo
   ícono, mismo botón sin caja (\`ICONO_SUELTO\`) y el mismo menú desplegable
   de Radix -antes cada tabla lo re-implementaba a mano, con su propio
   click-outside y su propio Escape. */

export function RowActionsMenu({
  label, className, children,
}: {
  label: string
  className?: string
  children: ReactNode
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label={\`Actions for \${label}\`} className={cn(ICONO_SUELTO, className)}>
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[190px]">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
`})))()}export{r as n,n as r,i as t};