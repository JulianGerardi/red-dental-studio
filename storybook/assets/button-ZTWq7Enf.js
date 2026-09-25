import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import * as React from 'react'
import { cn } from '@/lib/utils'

/* Variantes calcadas del original: cada intent tiene su cuarteta
   base / hover / active / disabled con foreground propio. */
const variants = {
  default:
    'bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover hover:text-primary-hover-foreground active:bg-primary-active active:text-primary-active-foreground disabled:bg-primary-disabled disabled:text-primary-disabled-foreground',
  secondary:
    'bg-secondary text-secondary-foreground border border-secondary-border shadow-sm hover:bg-secondary-hover hover:text-secondary-hover-foreground active:bg-secondary-active active:text-secondary-active-foreground disabled:bg-secondary-disabled disabled:text-secondary-disabled-foreground',
  destructive:
    'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive-hover hover:text-destructive-hover-foreground active:bg-destructive-active active:text-destructive-active-foreground disabled:bg-destructive-disabled disabled:text-destructive-disabled-foreground',
  success:
    'bg-success text-success-foreground shadow-sm hover:bg-success-hover active:bg-success-active disabled:bg-success-disabled',
  outline:
    'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
} as const

const sizes = {
  default: 'h-9 px-4 py-2',
  sm: 'h-8 rounded-md px-3 text-xs',
  lg: 'h-10 rounded-md px-8',
  icon: 'h-9 w-9',
} as const

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors',
        'focus-visible:ring-ring focus-visible:ring-1 focus-visible:outline-none',
        'disabled:pointer-events-none disabled:cursor-not-allowed!',
        '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      <span className="inline-flex items-center gap-x-2">{children}</span>
    </button>
  ),
)
Button.displayName = 'Button'
`})))()}export{n,i as r,r as t};