import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import * as React from 'react'
import { cn } from '@/lib/utils'
import { Input } from './input'
import { Label } from './label'

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  /** Elemento pegado al borde derecho del input (ej. el ojo de password). */
  adornment?: React.ReactNode
  colSpan?: string
}

/* Replica del grupo label+input del original: alto total 60px
   (label 17 + gap 7 + input 36), sin space-y en el wrapper. */
export function Field({
  label,
  adornment,
  colSpan = 'col-span-12',
  className,
  id,
  ...props
}: FieldProps) {
  return (
    <div className={cn('w-full space-y-0', colSpan)}>
      {/* El label es inline a propósito. No lleva margin: los 24px que lo
          separan del input salen del strut de la línea (line-height 24px
          heredado del contenedor), exactamente como en el original. */}
      <Label htmlFor={id}>{label}</Label>
      <div className="relative mt-0 w-full">
        <Input id={id} className={cn(adornment && 'pr-9', className)} {...props} />
        {adornment}
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};