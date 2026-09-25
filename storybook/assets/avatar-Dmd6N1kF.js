import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import * as React from 'react'
import { cn } from '@/lib/utils'

export function Avatar({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export function AvatarFallback({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'bg-primary text-primary-foreground flex h-full w-full items-center justify-center rounded-full font-medium',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
`})))()}export{n,i as r,r as t};