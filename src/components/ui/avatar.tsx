import * as React from 'react'
import { cn } from '@/lib/utils'

/* Avatar: las iniciales (o la foto) de una persona. Ver Elements / Avatars y figma/README.md (un solo avatar).

   Por qué así:
   - Un solo estilo para toda persona (paciente, provider, empleado, la cuenta
     del topbar): cuadrado con esquinas redondeadas, azul con iniciales
     blancas, el del avatar de Appointments del Dashboard. Antes convivían
     círculos y cuadrados, azul sólido y celeste (Julián, 2026-10-18).
   - El radio es un porcentaje (`rounded-avatar`, 27%): la esquina crece con el
     tamaño y a 44px da los 12px de la card de turno.
   - Iniciales y no un ícono genérico: en una lista, dos letras distinguen a las
     personas de un vistazo. Sin foto no queda vacío.
   - El tamaño sale de la escala (24 a 72): cada uno trae su letra. */

export const AVATAR_SIZES = {
  24: 'size-6 text-[10px]',
  28: 'size-7 text-[11px]',
  32: 'size-8 text-[12px]',
  36: 'size-9 text-[13px]',
  40: 'size-10 text-[13px]',
  44: 'size-11 text-sm',
  56: 'size-14 text-base',
  62: 'size-[62px] text-lg',
  72: 'size-[72px] text-xl',
} as const

export type AvatarSize = keyof typeof AVATAR_SIZES

export const AVATAR_BASE = 'bg-dash-blue flex shrink-0 items-center justify-center overflow-hidden rounded-avatar font-semibold text-white uppercase select-none'

export function Avatar({
  initials,
  photo,
  size = 32,
  className,
  ...props
}: Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> & {
  /** Una o dos letras; con foto no se ven. */
  initials: string
  photo?: string | null
  size?: AvatarSize
}) {
  return (
    <span className={cn(AVATAR_BASE, AVATAR_SIZES[size], className)} {...props}>
      {photo ? <img src={photo} alt="" className="size-full object-cover" /> : initials.slice(0, 2)}
    </span>
  )
}

/** Las iniciales de un nombre: "Dr. Elena Martinez" → "EM". */
export const inicialesDe = (nombre: string) =>
  nombre.replace(/^Dr\.?\s+/i, '').trim().split(/\s+/).slice(0, 2).map((p) => p[0] ?? '').join('').toUpperCase()
