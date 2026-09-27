import * as React from 'react'
import { cn } from '@/lib/utils'

/* Avatar: el círculo con las iniciales (o la foto) de una persona. Ver
   Components / UI / Avatar.

   Por qué así:
   - Iniciales y no un ícono genérico: en una lista de pacientes o de
     providers, dos letras distinguen a las personas de un vistazo.
   - Redondo: las personas son círculos en toda la app; las cosas (documentos,
     locaciones) van en cuadrados con esquinas.
   - El tamaño y el color los pone quien lo usa (size-8, bg-dash-count-bg…):
     el avatar de una tabla (32px) no es el del panel del paciente (62px).
   - Sin foto no queda vacío: AvatarFallback siempre muestra las iniciales. */

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
