import * as React from 'react'
import { cn } from '@/lib/utils'

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors',
      'placeholder:text-muted-foreground',
      'focus:border-black focus:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none',
      'active:outline-none active:ring-0',
      'disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      className,
    )}
    {...props}
  />
))
Input.displayName = 'Input'
