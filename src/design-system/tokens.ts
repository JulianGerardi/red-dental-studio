import css from '../index.css?raw'

/* Los tokens se leen del CSS real de la app (src/index.css), no se copian:
   si cambiás un valor ahí, el design system lo refleja solo. */

const limpio = css.replace(/\/\*[\s\S]*?\*\//g, '')

type Mapa = Record<string, string>
const claro: Mapa = {}
const oscuro: Mapa = {}
const tema: Mapa = {}
const temaInline: Mapa = {}

for (const [, selector, cuerpo] of limpio.matchAll(/(:root|\.dark|@theme inline|@theme(?: static)?)\s*\{([^{}]*)\}/g)) {
  const destino = selector === ':root' ? claro : selector === '.dark' ? oscuro : selector.startsWith('@theme') && !selector.includes('inline') ? tema : temaInline
  for (const [, nombre, valor] of cuerpo.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) destino[nombre] = valor.trim()
}

export const tokensClaros = claro
export const tokensOscuros = oscuro
export const tokensTema = tema
export const tokensTemaInline = temaInline

/* "218 73% 43%" -> "#1e58be" */
export function hslAHex(triplete: string): string | null {
  const m = triplete.match(/^([\d.]+)\s+([\d.]+)%\s+([\d.]+)%$/)
  if (!m) return null
  const h = Number(m[1]), s = Number(m[2]) / 100, l = Number(m[3]) / 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  const hex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0')
  return `#${hex(f(0))}${hex(f(8))}${hex(f(4))}`
}

export const aCss = (triplete: string) => `hsl(${triplete})`

/* Grupos de los tokens del sistema original (convención shadcn). */
const GRUPOS: [string, RegExp][] = [
  ['Primary', /^primary/],
  ['Secondary', /^secondary/],
  ['Destructive', /^destructive/],
  ['Success', /^success/],
  ['Warning', /^warning/],
  ['Base', /^(background|foreground|card|popover|muted|accent|border|input|ring)/],
  ['Page and surfaces', /^(page-background|gray-|surface-|clinical-)/],
  ['Calendar', /^calendaar?-|^calendar/],
  ['Sidebar', /^sidebar/],
  ['Chart', /^chart-/],
]

export type FilaToken = { nombre: string; claro: string; oscuro?: string }

export function gruposDeTokens(): { grupo: string; filas: FilaToken[] }[] {
  const salida = GRUPOS.map(([grupo]) => ({ grupo, filas: [] as FilaToken[] }))
  for (const nombre of Object.keys(claro)) {
    if (nombre === 'radius') continue
    const i = GRUPOS.findIndex(([, re]) => re.test(nombre))
    if (i >= 0) salida[i].filas.push({ nombre, claro: claro[nombre], oscuro: oscuro[nombre] })
  }
  return salida.filter((g) => g.filas.length > 0)
}

/* Tokens propios de la app (los "dash-*" del Figma y los semánticos), en el
   bloque @theme sin `inline`. */
export const coloresDeTema = Object.entries(tema)
  .filter(([n]) => n.startsWith('color-'))
  .map(([nombre, valor]) => ({ nombre, valor }))

export const sombrasDeTema = Object.entries(tema)
  .filter(([n]) => n.startsWith('shadow-'))
  .map(([nombre, valor]) => ({ nombre, valor }))

/* hex -> nombre del token que ya lo define (para el audit). */
export const tokenPorHex: Record<string, string> = {}
for (const { nombre, valor } of coloresDeTema) {
  if (/^#[0-9a-f]{6}$/i.test(valor)) tokenPorHex[valor.toLowerCase()] ??= nombre.replace('color-', '')
}
for (const [nombre, valor] of Object.entries(claro)) {
  const hex = hslAHex(valor)
  if (hex) tokenPorHex[hex] ??= nombre
}
