import { AR, CA, ES, GB, MX, US } from 'country-flag-icons/react/3x2'
import { cn } from '@/lib/utils'

/* Bandera de un país, en SVG (los emoji de bandera no se ven en Windows: salen dos letras). Lo usan los Country Code
   (patients.md, 2026-11-04). Sólo están los países de los mocks; uno nuevo se suma en BANDERAS y en isoDe. */
const BANDERAS = { AR, CA, ES, GB, MX, US }
type Iso = keyof typeof BANDERAS

const POR_NOMBRE: [RegExp, Iso][] = [
  [/united states/i, 'US'], [/canada/i, 'CA'], [/argentina/i, 'AR'], [/spain/i, 'ES'], [/mexico/i, 'MX'], [/united kingdom/i, 'GB'],
]
/* +1 es Estados Unidos y Canadá: sin nombre, va Estados Unidos. */
const POR_CODIGO: Record<string, Iso> = { '+1': 'US', '+34': 'ES', '+44': 'GB', '+52': 'MX', '+54': 'AR' }

/** El país de una opción: "(+54) Argentina", "+54" o "Argentina". */
export function isoDe(opcion: string): Iso | undefined {
  const nombre = POR_NOMBRE.find(([r]) => r.test(opcion))
  if (nombre) return nombre[1]
  const codigo = opcion.match(/\+\d+/)?.[0]
  return codigo ? POR_CODIGO[codigo] : undefined
}

/** Decorativa: el código o el nombre van al lado en texto. Sin país conocido, no dibuja nada. */
export function CountryFlag({ opcion, className }: { opcion: string; className?: string }) {
  const iso = isoDe(opcion)
  if (!iso) return null
  const Bandera = BANDERAS[iso]
  return <Bandera aria-hidden className={cn('h-3 w-[18px] shrink-0 rounded-[2px] ring-1 ring-line', className)} />
}
