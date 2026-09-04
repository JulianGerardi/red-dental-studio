import * as React from 'react'
import { cn } from '@/lib/utils'

const variants = {
  active: 'bg-green-50 text-green-700 border-green-200',
  inactive: 'bg-red-50 text-red-600 border-red-200',
  neutral: 'bg-muted text-muted-foreground border-border',
  self: 'bg-muted text-foreground border-border',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
} as const

export function Badge({
  className,
  variant = 'neutral',
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: keyof typeof variants }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
