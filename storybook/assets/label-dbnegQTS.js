import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import * as React from 'react'
import { cn } from '@/lib/utils'

/* Label: el rótulo de un campo (shadcn). Ver Components / UI / Label.

   Por qué así:
   - Va asociado al campo (htmlFor) para que tocar el rótulo enfoque el campo
     y los lectores de pantalla lo lean.
   - Si el campo de al lado está deshabilitado (peer-disabled), el rótulo se
     atenúa con él. */

export const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      'text-sm leading-none font-medium',
      'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className,
    )}
    {...props}
  />
))
Label.displayName = 'Label'
`})))()}export{r as n,n as r,i as t};