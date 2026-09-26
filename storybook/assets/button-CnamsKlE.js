import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import * as React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Botón estándar de la app. Cada variante es el look más usado en el código
   para ese tipo de botón, y los tamaños son las tres alturas más usadas
   (36, 32 y 28 px). Los estados que el código casi nunca definía -foco con
   teclado, presionado, deshabilitado y cargando- quedan resueltos acá, una
   sola vez. Ver Elements / Buttons en Storybook. */

export const BUTTON_VARIANTS = {
  /** La acción principal de la pantalla o del diálogo. Una sola por vista. */
  primary: 'bg-dash-blue text-white hover:bg-dash-blue-hover active:bg-dash-blue-active focus-visible:outline-dash-blue',
  /** Acción secundaria al lado de la principal: Cancel, Back, Export. */
  secondary: 'border border-line bg-white text-ink hover:bg-surface-subtle active:bg-surface-muted focus-visible:outline-dash-blue',
  /** Baja jerarquía, sin caja: barras de herramientas y acciones de fila. */
  ghost: 'text-ink-soft hover:bg-surface-muted hover:text-ink active:bg-line focus-visible:outline-dash-blue',
  /** Se lee como un link: navegar o ver más. */
  link: 'text-dash-blue underline-offset-2 hover:underline active:text-dash-blue-active focus-visible:outline-dash-blue',
  /** Borra o descarta. Casi siempre dentro de un diálogo de confirmación. */
  destructive: 'bg-dash-bad-fg text-white hover:bg-dash-bad-hover active:bg-dash-bad-hover focus-visible:outline-dash-bad-fg',
} as const

export const BUTTON_SIZES = {
  sm: 'h-7 gap-1.5 px-2.5 text-[12px] [&_svg]:size-3.5',
  md: 'h-8 gap-1.5 px-3 text-[13px] [&_svg]:size-4',
  lg: 'h-9 gap-2 px-4 text-[13px] [&_svg]:size-4',
} as const

/* Sólo ícono: cuadrado del mismo alto que el tamaño. */
const ICON_ONLY = { sm: 'w-7 px-0', md: 'w-8 px-0', lg: 'w-9 px-0' } as const

export type ButtonVariant = keyof typeof BUTTON_VARIANTS
export type ButtonSize = keyof typeof BUTTON_SIZES

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Botón cuadrado con un solo ícono. Pasale un \`aria-label\`. */
  iconOnly?: boolean
  /** Muestra un spinner y deshabilita el botón mientras dura la acción. */
  loading?: boolean
}

/** Las clases del botón, para dar el mismo aspecto a un link (\`<Link>\`). */
export function buttonClasses({ variant = 'primary', size = 'lg', iconOnly, className }: Pick<ButtonProps, 'variant' | 'size' | 'iconOnly' | 'className'> = {}) {
  return cn(
    'inline-flex shrink-0 items-center justify-center rounded-md font-medium whitespace-nowrap transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    'disabled:pointer-events-none disabled:opacity-40',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    BUTTON_VARIANTS[variant],
    BUTTON_SIZES[size],
    iconOnly && ICON_ONLY[size],
    variant === 'link' && !iconOnly && 'h-auto px-0',
    className,
  )
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'lg', iconOnly, loading, disabled, children, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClasses({ variant, size, iconOnly, className })}
      {...props}
    >
      {loading && <Loader2 className="animate-spin" aria-hidden />}
      {loading && iconOnly ? null : children}
    </button>
  ),
)
Button.displayName = 'Button'
`})))()}export{n,i as r,r as t};