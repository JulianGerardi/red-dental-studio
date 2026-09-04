import * as React from 'react'
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
