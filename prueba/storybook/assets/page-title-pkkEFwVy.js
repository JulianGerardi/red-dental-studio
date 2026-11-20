import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { cn } from '@/lib/utils'

/* Escala tipográfica unificada de la app (Figma "Platform Design").
   El título de página es 20px SemiBold #09090b en casi todas las pantallas:
   medido sobre los frames, "Dashboard" y "Patients" tenían la misma altura
   de tinta (15px), o sea el mismo tamaño de fuente.

   El dashboard rediseñado (4430:57451) es la excepción: ahí el título mide
   18px de tinta y 90px de ancho, que da 24px Bold. */
export function PageTitle({
  children,
  size = 'md',
}: {
  children: React.ReactNode
  size?: 'md' | 'lg'
}) {
  return (
    <h1
      className={cn(
        'leading-[1.3] text-ink',
        size === 'lg' ? 'text-2xl font-bold' : 'text-xl font-semibold',
      )}
    >
      {children}
    </h1>
  )
}
`})))()}export{r as n,n as r,i as t};