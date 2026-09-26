import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { PESOS, colorDeToken, hex, px } from './medir'
import { cn } from '@/lib/utils'

/* Piezas de las páginas de Elements (Buttons, Fields, Pills, Cards, Tables):
   la misma tabla, la misma muestra de color y la misma lectura de medidas en
   todas, para que se lean igual. */

const cacheColor = new Map<string, string>()
const hexDe = (token: string) => {
  if (!cacheColor.has(token)) cacheColor.set(token, colorDeToken(token))
  return cacheColor.get(token)!
}

export function Swatch({ color }: { color: string }) {
  const vacio = color === 'transparent' || !color
  return (
    <span
      aria-hidden
      className={cn('inline-block size-4 shrink-0 rounded border border-black/10', vacio && 'bg-[repeating-linear-gradient(45deg,#e4e4e7_0_2px,#fff_2px_4px)]')}
      style={vacio ? undefined : { background: color }}
    />
  )
}

/* Un token de color: muestra, nombre de la clase y su hex. */
export function Token({ nombre }: { nombre: string | null | undefined }) {
  if (!nombre) return <span className="text-ink-faint">—</span>
  const valor = hexDe(nombre)
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <Swatch color={valor} />
      <span className="font-mono text-[11.5px] text-ink">{nombre.startsWith('[#') ? <span className="text-warn-fg" title="Color escrito a mano, sin token">no token</span> : nombre}</span>
      <span className="text-[11.5px] text-ink-faint tabular-nums">{valor}</span>
    </span>
  )
}

/* Tabla con el mismo aspecto que las tablas de la app. */
export function Tabla({ encabezado, children, minimo = 560, arriba }: { encabezado: string[]; children: ReactNode; minimo?: number; arriba?: boolean }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line-row bg-white">
      <table className="w-full text-left text-[12.5px]" style={{ minWidth: minimo }}>
        <thead className="bg-surface-alt text-[11px] font-semibold text-ink-muted">
          <tr>{encabezado.map((h) => <th key={h} className="px-4 py-2.5 font-semibold whitespace-nowrap">{h}</th>)}</tr>
        </thead>
        <tbody className={cn('[&>tr]:border-t [&>tr]:border-line-row [&_td]:px-4 [&_td]:py-3', arriba ? '[&_td]:align-top' : '[&_td]:align-middle')}>{children}</tbody>
      </table>
    </div>
  )
}

/* Rótulo chico debajo de una muestra. */
export const Rotulo = ({ children }: { children: ReactNode }) => (
  <span className="text-[11px] text-ink-muted">{children}</span>
)

/* Una grilla de muestras con su rótulo. */
export function Muestras({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex flex-wrap items-end gap-x-6 gap-y-5', className)}>{children}</div>
}
export function ConRotulo({ rotulo, children }: { rotulo: ReactNode; children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2">
      {children}
      <Rotulo>{rotulo}</Rotulo>
    </div>
  )
}

/* Lee las medidas de un elemento ya dibujado. `selector` elige el nodo a
   medir dentro de la muestra (el <input> dentro de un campo, por ejemplo). */
export type Medidas = { alto: string; ancho: string; padding: string; texto: string; peso: string; radio: string; gap: string; borde: string; icono: string }

export function useMedidas(selector?: string) {
  const ref = useRef<HTMLDivElement>(null)
  const [m, setM] = useState<Medidas | null>(null)
  useLayoutEffect(() => {
    const raiz = ref.current
    const el = (selector ? raiz?.querySelector(selector) : raiz?.firstElementChild) as HTMLElement | null
    if (!el) return
    const s = getComputedStyle(el)
    const svg = el.querySelector('svg')
    const pl = px(s.paddingLeft)
    const pr = px(s.paddingRight)
    setM({
      alto: `${px(s.height)}px`,
      ancho: `${px(s.width)}px`,
      padding: pl === pr ? `${pl}px` : `${pl}px left · ${pr}px right`,
      texto: `${px(s.fontSize)}px`,
      peso: PESOS[s.fontWeight] ?? s.fontWeight,
      radio: px(s.borderTopLeftRadius) >= 999 ? 'Full' : `${px(s.borderTopLeftRadius)}px`,
      gap: s.columnGap && s.columnGap !== 'normal' ? `${px(s.columnGap)}px` : '—',
      borde: px(s.borderTopWidth) > 0 ? `${px(s.borderTopWidth)}px ${hex(s.borderTopColor)}` : 'None',
      icono: svg ? `${px(getComputedStyle(svg).width)}px` : '—',
    })
  }, [selector])
  return { ref, m }
}

/* Encabezado de sección dentro de una story de Elements. */
export function Bloque({ titulo, nota, children }: { titulo?: string; nota?: ReactNode; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      {titulo && <h3 className="text-[14px] font-semibold text-ink">{titulo}</h3>}
      {nota && <p className="max-w-[72ch] text-[13px] leading-relaxed text-ink-muted">{nota}</p>}
      {children}
    </section>
  )
}

export const Lienzo = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn('flex w-full max-w-[960px] flex-col gap-8 text-ink', className)}>{children}</div>
)
