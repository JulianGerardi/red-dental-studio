import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import * as React from 'react'
import { cn } from '@/lib/utils'

/* Tarjeta: la caja blanca que agrupa un solo tema sobre el fondo gris de la
   pantalla. Card es el contenedor; las partes (encabezado, título, bajada,
   contenido y pie) llevan la escala de la app: título 14 semibold, bajada 13,
   20px de margen interno. Ver Elements / Cards en Storybook. */
export const Card = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('bg-card rounded-xl border shadow-sm', className)} {...p} />
)
export const CardHeader = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex items-start justify-between gap-3 px-5 pt-5', className)} {...p} />
)
export const CardTitle = ({ className, ...p }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('text-sm leading-snug font-semibold text-ink', className)} {...p} />
)
export const CardDescription = ({ className, ...p }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('mt-0.5 text-[13px] text-ink-muted', className)} {...p} />
)
export const CardContent = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('px-5 py-4 text-[13px] text-ink-soft', className)} {...p} />
)
export const CardFooter = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex items-center justify-end gap-2 border-t border-line-row px-5 py-3', className)} {...p} />
)
`})))()}export{n,i as r,r as t};