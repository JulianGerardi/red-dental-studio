import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Codigo } from './Page'
import { CeldaDeEstado, InventarioCompleto, Muestra, elementosDe, type EstadoMuestra, type Receta } from './Recipes'
import { cn } from '@/lib/utils'

/* Piezas comunes de las páginas Buttons y Fields: tipos con sus estados,
   medidas, tamaños en uso, colores en uso y qué hace la app en cada estado.
   Todo sale del código de la app (los looks que lee scan-recipes.mjs) y de los
   estilos calculados de las muestras: nada se escribe a mano. */

/* ── Lectura de estilos ───────────────────────────────────────────────────
   Para saber cuánto vale \`h-9\` o de qué color es \`bg-dash-blue\` se monta un
   elemento con esa clase y se lee su estilo calculado: así los números son los
   de la app, no los de una tabla copiada. */
let caja: HTMLDivElement | null = null
const cache = new Map<string, string>()

function leer(clase: string, prop: string): string {
  const k = \`\${clase}|\${prop}\`
  const hit = cache.get(k)
  if (hit !== undefined) return hit
  if (!caja) {
    caja = document.createElement('div')
    caja.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden'
    document.body.appendChild(caja)
  }
  const el = document.createElement('span')
  el.className = clase
  el.style.display = 'block'
  el.style.borderStyle = 'solid'
  el.style.borderWidth = '1px'
  caja.appendChild(el)
  const v = (getComputedStyle(el) as unknown as Record<string, string>)[prop] ?? ''
  caja.removeChild(el)
  cache.set(k, v)
  return v
}

const px = (v: string) => Math.round(parseFloat(v) * 10) / 10
export function hex(rgb: string): string {
  const m = rgb.match(/rgba?\\(([\\d.]+)[, ]+([\\d.]+)[, ]+([\\d.]+)(?:[, /]+([\\d.]+))?\\)/)
  if (!m) return rgb
  if (m[4] !== undefined && parseFloat(m[4]) === 0) return 'none'
  const h = [m[1], m[2], m[3]].map((n) => Math.round(parseFloat(n!)).toString(16).padStart(2, '0')).join('')
  return \`#\${h}\${m[4] !== undefined && parseFloat(m[4]) < 1 ? \` (\${Math.round(parseFloat(m[4]) * 100)}%)\` : ''}\`
}

const PESOS: Record<string, string> = { '400': 'regular', '500': 'medium', '600': 'semibold', '700': 'bold' }

/* ── Facetas de tamaño: qué clases cuentan y qué propiedad las resuelve ──── */
type Faceta = { nombre: string; re: RegExp; prop: string; formato: (v: string) => string }
const pxTxt = (v: string) => (px(v) >= 999 ? 'pill' : \`\${px(v)}px\`)

export const FACETAS_TAMANO: Faceta[] = [
  { nombre: 'Height', re: /^(?:h|size)-(?:\\d|\\[)/, prop: 'height', formato: pxTxt },
  { nombre: 'Padding (left/right)', re: /^px-(?:\\d|\\[)/, prop: 'paddingLeft', formato: pxTxt },
  { nombre: 'Text size', re: /^text-(?:\\[[\\d.]+px\\]|xs|sm|base|lg|xl)$/, prop: 'fontSize', formato: pxTxt },
  { nombre: 'Weight', re: /^font-(?:normal|medium|semibold|bold)$/, prop: 'fontWeight', formato: (v) => PESOS[v] ?? v },
  { nombre: 'Radius', re: /^rounded(?:-(?:sm|md|lg|xl|2xl|full|\\[[^\\]]+\\]))?$/, prop: 'borderTopLeftRadius', formato: pxTxt },
]

const sinVariante = (c: string) => c.replace(/^(?:[^\\s:]+:)+/, '')
const claseBase = (r: Receta) => r.clases.split(/\\s+/).filter((c) => c && !c.includes(':'))

type Conteo = [string, number][]

/* Cuántos elementos usan cada valor de una faceta. Un look cuenta por sus
   elementos; si un look no fija la faceta (un botón sin altura propia) no suma. */
function conteo(looks: Receta[], f: Faceta): Conteo {
  const c = new Map<string, Set<string>>()
  for (const r of looks) {
    const clase = claseBase(r).filter((x) => f.re.test(x)).pop()
    if (!clase) continue
    const v = f.formato(leer(clase, f.prop))
    if (!v || v === 'auto' || v === 'NaNpx') continue
    const set = c.get(v) ?? new Set<string>()
    r.usos.forEach((u) => set.add(\`\${u.archivo}:\${u.linea}\`))
    c.set(v, set)
  }
  return [...c].map(([v, s]) => [v, s.size] as [string, number]).sort((a, b) => b[1] - a[1])
}

/* ── Colores: qué clases de color usa cada rol ───────────────────────────── */
type Rol = { nombre: string; re: RegExp; prefijo: string; prop: string; variante?: string }
const TEXTO_NO_COLOR = /^text-(?:\\[[\\d.]+px\\]|xs|sm|base|lg|xl|\\dxl|left|center|right|justify|start|end|balance|pretty|ellipsis|clip|wrap|nowrap)$/
const BORDE_NO_COLOR = /^border(?:-(?:0|2|4|8|[trblxyse](?:-\\S+)?|solid|dashed|dotted|none|collapse|separate|spacing-\\S+))?$/

export const ROLES_COLOR: Rol[] = [
  { nombre: 'Fill', re: /^bg-(?!\\[?(?:position|size))/, prefijo: '', prop: 'backgroundColor' },
  { nombre: 'Fill on hover', re: /^hover:bg-/, prefijo: 'hover:', prop: 'backgroundColor' },
  { nombre: 'Text', re: /^text-/, prefijo: '', prop: 'color' },
  { nombre: 'Border', re: /^border-/, prefijo: '', prop: 'borderTopColor' },
  { nombre: 'Border on focus', re: /^focus(?:-visible)?:border-/, prefijo: 'focus:', prop: 'borderTopColor' },
]

function coloresDe(looks: Receta[], rol: Rol): { clase: string; hex: string; n: number }[] {
  const c = new Map<string, Set<string>>()
  for (const r of looks) {
    const todas = r.clases.split(/\\s+/)
    const prefijado = rol.prefijo !== ''
    const clase = todas
      .filter((x) => rol.re.test(x) && (prefijado || !x.includes(':')))
      .filter((x) => {
        const b = sinVariante(x)
        return rol.prop === 'color' ? !TEXTO_NO_COLOR.test(b) : rol.prop === 'borderTopColor' ? !BORDE_NO_COLOR.test(b) : true
      })
      .pop()
    if (!clase) continue
    const set = c.get(clase) ?? new Set<string>()
    r.usos.forEach((u) => set.add(\`\${u.archivo}:\${u.linea}\`))
    c.set(clase, set)
  }
  return [...c]
    .map(([clase, s]) => {
      const base = sinVariante(clase)
      const v = base.startsWith('bg-') || base.startsWith('text-') || base.startsWith('border-') ? leer(base, rol.prop) : ''
      return { clase: base, hex: hex(v), n: s.size }
    })
    .sort((a, b) => b.n - a.n)
}

function Muestrario({ color }: { color: string }) {
  const sin = color === 'none' || color === ''
  return (
    <span
      className={cn('inline-block size-3.5 shrink-0 rounded-[3px] border border-line', sin && 'bg-[repeating-linear-gradient(45deg,#e4e4e7_0_2px,#fff_2px_4px)]')}
      style={sin ? undefined : { background: color.replace(/ \\(.*\\)/, '') }}
      aria-hidden
    />
  )
}

/* ── Tipos y estados ─────────────────────────────────────────────────────── */
export type Tipo = {
  nombre: string
  uso: string
  look?: Receta
  /* Look que se usa cuando el campo falla la validación. */
  error?: Receta
  texto?: string
}
export type Columna = 'default' | 'hover' | 'focus' | 'active' | 'disabled' | 'error'

const TITULO: Record<Columna, string> = { default: 'Default', hover: 'Hover', focus: 'Focus', active: 'Active', disabled: 'Disabled', error: 'Error' }
const NO_HAY = <span className="text-[11px] text-ink-faint">—</span>

function Celda({ t, c }: { t: Tipo; c: Columna }) {
  const r = t.look
  if (!r) return NO_HAY
  if (c === 'default') return <span data-tipo={t.nombre}><Muestra r={r} texto={t.texto} /></span>
  if (c === 'error') return t.error ? <Muestra r={t.error} texto={t.texto} /> : NO_HAY
  return <CeldaDeEstado r={r} e={c as EstadoMuestra} texto={t.texto} />
}

export function TiposConEstados({ tipos, columnas }: { tipos: Tipo[]; columnas: Columna[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line-row bg-white">
      <table className="w-full min-w-[760px] text-left text-[12px]">
        <thead className="bg-surface-alt text-[10px] tracking-wide text-ink-muted uppercase">
          <tr>
            <th className="px-4 py-2.5">Type</th>
            {columnas.map((c) => <th key={c} className="px-3 py-2.5">{TITULO[c]}</th>)}
          </tr>
        </thead>
        <tbody>
          {tipos.map((t) => (
            <tr key={t.nombre} className="border-t border-line-row align-top">
              <td className="w-[210px] px-4 py-4">
                <p className="text-[13px] font-semibold">{t.nombre}</p>
                <p className="mt-0.5 text-ink-muted">{t.uso}</p>
                {t.look && <p className="mt-1 text-[11px] text-ink-faint">{elementosDe([t.look])} in the app · most common look</p>}
              </td>
              {columnas.map((c) => <td key={c} className="px-3 py-4"><Celda t={t} c={c} /></td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ── Medidas: se leen de las muestras ya dibujadas ───────────────────────── */
type Medidas = { alto: string; ancho: string; relleno: string; texto: string; radio: string; fondo: string; color: string; borde: string; bordeColor: string; casilla: boolean }

function medirMuestra(el: Element): Medidas {
  const s = getComputedStyle(el)
  return {
    alto: \`\${px(s.height)}px\`,
    ancho: \`\${px(s.width)}px\`,
    relleno: px(s.paddingLeft) === px(s.paddingRight) ? \`\${px(s.paddingLeft)}px\` : \`\${px(s.paddingLeft)}px left · \${px(s.paddingRight)}px right\`,
    texto: \`\${px(s.fontSize)}px · \${PESOS[s.fontWeight] ?? s.fontWeight}\`,
    radio: pxTxt(s.borderTopLeftRadius),
    fondo: hex(s.backgroundColor),
    color: hex(s.color),
    borde: px(s.borderTopWidth) > 0 ? \`\${px(s.borderTopWidth)}px\` : 'none',
    bordeColor: hex(s.borderTopColor),
    casilla: el.matches('input[type="checkbox"], input[type="radio"]'),
  }
}

/* Nombre del token: la clase de color del look, sin el prefijo. */
const tokenDe = (r: Receta | undefined, prefijo: 'bg-' | 'text-' | 'border-') => {
  const c = (r?.clases ?? '').split(/\\s+/).filter((x) => x.startsWith(prefijo) && !x.includes(':') && (prefijo === 'bg-' || (prefijo === 'text-' ? !TEXTO_NO_COLOR.test(x) : !BORDE_NO_COLOR.test(x)))).pop()
  return c ? c.slice(prefijo.length) : ''
}

export function MedidasDeTipos({ tipos }: { tipos: Tipo[] }) {
  const [m, setM] = useState<Record<string, Medidas>>({})
  useEffect(() => {
    const salida: Record<string, Medidas> = {}
    for (const t of tipos) {
      const cont = document.querySelector(\`[data-tipo="\${CSS.escape(t.nombre)}"]\`)
      const el = cont?.firstElementChild?.matches('span') ? cont.querySelector('input, select, textarea, button') : cont?.firstElementChild
      if (el) salida[t.nombre] = medirMuestra(el)
    }
    setM(salida)
  }, [tipos])
  const dato = (valor: string, token?: string) => (
    <span className="inline-flex items-center gap-1.5">
      {valor.startsWith('#') || valor === 'none' ? <Muestrario color={valor} /> : null}
      <span className="tabular-nums">{valor === 'none' ? 'none' : valor}</span>
      {token && valor !== 'none' && <span className="text-ink-faint">{token}</span>}
    </span>
  )
  return (
    <div className="overflow-x-auto rounded-lg border border-line-row bg-white">
      <table className="w-full min-w-[820px] text-left text-[12px]">
        <thead className="bg-surface-alt text-[10px] tracking-wide text-ink-muted uppercase">
          <tr>
            <th className="px-4 py-2.5">Type</th>
            <th className="px-3 py-2.5">Height</th>
            <th className="px-3 py-2.5">Padding</th>
            <th className="px-3 py-2.5">Text</th>
            <th className="px-3 py-2.5">Radius</th>
            <th className="px-3 py-2.5">Fill</th>
            <th className="px-3 py-2.5">Text color</th>
            <th className="px-3 py-2.5">Border</th>
          </tr>
        </thead>
        <tbody>
          {tipos.map((t) => {
            const x = m[t.nombre]
            return (
              <tr key={t.nombre} className="border-t border-line-row">
                <td className="px-4 py-3 text-[13px] font-semibold whitespace-nowrap">{t.nombre}</td>
                {x ? (
                  x.casilla ? (
                    <>
                      <td className="px-3 py-3 tabular-nums" colSpan={2}>{x.ancho} × {x.alto}</td>
                      <td className="px-3 py-3 text-ink-faint">—</td>
                      <td className="px-3 py-3 tabular-nums">{x.radio}</td>
                      <td className="px-3 py-3">{dato(x.fondo)}</td>
                      <td className="px-3 py-3 text-ink-faint">—</td>
                      <td className="px-3 py-3">{dato(x.borde === 'none' ? 'none' : x.bordeColor, x.borde === 'none' ? undefined : tokenDe(t.look, 'border-'))}</td>
                    </>
                  ) : (
                    <>
                      <td className="px-3 py-3 tabular-nums">{x.alto}</td>
                      <td className="px-3 py-3 tabular-nums">{x.relleno}</td>
                      <td className="px-3 py-3 whitespace-nowrap">{x.texto}</td>
                      <td className="px-3 py-3 tabular-nums">{x.radio}</td>
                      <td className="px-3 py-3 whitespace-nowrap">{dato(x.fondo, tokenDe(t.look, 'bg-'))}</td>
                      <td className="px-3 py-3 whitespace-nowrap">{dato(x.color, tokenDe(t.look, 'text-'))}</td>
                      <td className="px-3 py-3 whitespace-nowrap">{x.borde === 'none' ? 'none' : dato(x.bordeColor, \`\${x.borde} \${tokenDe(t.look, 'border-')}\`)}</td>
                    </>
                  )
                ) : (
                  <td className="px-3 py-3 text-ink-faint" colSpan={7}>—</td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/* ── Tamaños en uso ──────────────────────────────────────────────────────── */
export function TamanosEnUso({ looks, total }: { looks: Receta[]; total: number }) {
  const filas = useMemo(() => FACETAS_TAMANO.map((f) => ({ f, valores: conteo(looks, f) })).filter((x) => x.valores.length), [looks])
  return (
    <div className="overflow-hidden rounded-lg border border-line-row bg-white text-[12px]">
      {filas.map(({ f, valores }) => {
        const max = Math.max(...valores.map(([, n]) => n))
        const resto = valores.slice(6)
        return (
          <div key={f.nombre} className="grid grid-cols-1 gap-2 border-t border-line-row px-4 py-3 first:border-t-0 sm:grid-cols-[150px_1fr]">
            <div>
              <p className="text-[13px] font-semibold">{f.nombre}</p>
              <p className={valores.length > 1 ? 'text-warn-fg' : 'text-dash-ok-fg'}>{valores.length > 1 ? \`\${valores.length} values in use\` : '1 value: consistent'}</p>
            </div>
            <ul className="flex flex-col gap-1">
              {valores.slice(0, 6).map(([v, n]) => (
                <li key={v} className="flex items-center gap-2">
                  <span className="w-[76px] shrink-0 font-medium tabular-nums">{v}</span>
                  <span className="h-2 rounded-full bg-dash-blue" style={{ width: \`\${Math.max(3, (n / max) * 220)}px\` }} />
                  <span className="text-ink-muted tabular-nums">{n} <span className="text-ink-faint">of {total}</span></span>
                </li>
              ))}
              {resto.length > 0 && <li className="text-ink-faint">+ {resto.length} more values, used by {resto.reduce((n, [, c]) => n + c, 0)} {resto.reduce((n, [, c]) => n + c, 0) === 1 ? 'element' : 'elements'} in total</li>}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

/* ── Colores en uso ──────────────────────────────────────────────────────── */
export function ColoresEnUso({ looks, roles = ROLES_COLOR, max = 6 }: { looks: Receta[]; roles?: Rol[]; max?: number }) {
  const filas = useMemo(() => roles.map((r) => ({ r, colores: coloresDe(looks, r) })).filter((x) => x.colores.length), [looks, roles])
  return (
    <div className="overflow-hidden rounded-lg border border-line-row bg-white text-[12px]">
      {filas.map(({ r, colores }) => (
        <div key={r.nombre} className="grid grid-cols-1 gap-2 border-t border-line-row px-4 py-3 first:border-t-0 sm:grid-cols-[150px_1fr]">
          <p className="text-[13px] font-semibold">{r.nombre}</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
            {colores.slice(0, max).map((c) => (
              <li key={c.clase} className="flex items-center gap-1.5">
                <Muestrario color={c.hex} />
                <span className="font-mono text-[11px]">{c.clase.replace(/^(?:bg|text|border)-/, '')}</span>
                <span className="text-ink-faint tabular-nums">{c.hex === 'none' ? '' : c.hex} · {c.n}</span>
              </li>
            ))}
            {colores.length > max && <li className="text-ink-faint">+ {colores.length - max} more</li>}
          </ul>
        </div>
      ))}
    </div>
  )
}

/* ── Qué hace la app en cada estado ──────────────────────────────────────── */
function topClases(looks: Receta[], re: RegExp, n = 3): { clase: string; n: number }[] {
  const c = new Map<string, Set<string>>()
  for (const r of looks)
    for (const clase of new Set(r.clases.split(/\\s+/).filter((x) => re.test(x)))) {
      const set = c.get(clase) ?? new Set<string>()
      r.usos.forEach((u) => set.add(\`\${u.archivo}:\${u.linea}\`))
      c.set(clase, set)
    }
  return [...c].map(([clase, s]) => ({ clase, n: s.size })).sort((a, b) => b.n - a.n).slice(0, n)
}

export type FilaEstado = { estado: string; define: (r: Receta) => boolean; clases: RegExp; faltante: (faltan: number, sin: Receta[]) => string }

export function EstadosDeLaApp({ looks, total, filas }: { looks: Receta[]; total: number; filas: FilaEstado[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line-row bg-white">
      <table className="w-full min-w-[720px] text-left text-[12px]">
        <thead className="bg-surface-alt text-[10px] tracking-wide text-ink-muted uppercase">
          <tr>
            <th className="px-4 py-2.5">State</th>
            <th className="px-3 py-2.5">Defined in</th>
            <th className="px-3 py-2.5">What the code does</th>
            <th className="px-3 py-2.5">What is missing</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((f) => {
            const con = looks.filter(f.define)
            const n = elementosDe(con)
            const pct = total ? Math.round((n / total) * 100) : 0
            const top = topClases(con, f.clases)
            const sin = looks.filter((r) => !f.define(r))
            return (
              <tr key={f.estado} className="border-t border-line-row align-top">
                <td className="px-4 py-3 text-[13px] font-semibold">{f.estado}</td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <span className={cn('font-semibold tabular-nums', pct >= 80 ? 'text-dash-ok-fg' : 'text-warn-fg')}>{pct}%</span>{' '}
                  <span className="text-ink-muted tabular-nums">{n} of {total}</span>
                </td>
                <td className="px-3 py-3">
                  {top.length ? (
                    <ul className="flex flex-wrap gap-1.5">
                      {top.map((t) => <li key={t.clase}><Codigo>{t.clase}</Codigo> <span className="text-ink-faint">×{t.n}</span></li>)}
                    </ul>
                  ) : <span className="text-ink-faint">nothing</span>}
                </td>
                <td className="max-w-[320px] px-3 py-3 text-ink-medium">{f.faltante(Math.max(0, total - n), sin)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/* ── Todo lo encontrado, plegado ─────────────────────────────────────────── */
export function TodoLoEncontrado({ tipo, familiaDe, cantidad, elementos }: { tipo: Receta['tipo']; familiaDe?: (r: Receta) => string; cantidad: number; elementos: number }): ReactNode {
  return (
    <details className="rounded-lg border border-line-row bg-white px-4 py-3">
      <summary className="cursor-pointer text-[13px] font-medium text-dash-blue">Everything found in the code: {cantidad} variants across {elementos} elements</summary>
      <p className="mt-2 mb-3 max-w-[70ch] text-[12.5px] text-ink-muted">Cada combinación de clases que el código dibuja, ordenada por uso. Sirve para buscar un caso puntual y para encontrar los que les falta un estado.</p>
      <InventarioCompleto tipo={tipo} familiaDe={familiaDe} />
    </details>
  )
}
`})))()}export{r as n,n as r,i as t};