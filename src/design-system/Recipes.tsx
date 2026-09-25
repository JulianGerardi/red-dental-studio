import { useMemo, useState, type ReactNode } from 'react'
import { Plus } from 'lucide-react'
import recetasJson from './generated/recipes.json'
import metaJson from './generated/recipes-meta.json'
import nombres from './recipe-names.json'
import { Codigo } from './Page'
import { cn } from '@/lib/utils'

/* Galería de looks: lo que el código de la app hace hoy, leído por
   scripts/scan-recipes.mjs. Un "look" es una combinación real de clases: si un
   className tiene un condicional, cada rama es un look aparte (nunca se
   mezclan). Cada look se dibuja con sus clases exactas -no hay copia a mano-,
   con su cantidad de usos, dónde están y qué estados tiene definidos. */

export type Foco = 'definido' | 'quitado' | 'invisible' | 'navegador'
export type Estados = {
  hover: boolean
  hoverSinEfecto: boolean
  hoverGrupo: boolean
  foco: Foco
  activo: boolean
  deshabilitado: boolean
  deshabilitadoPorAtributo: boolean
}
export type Uso = { archivo: string; linea: number; cuando?: string }

export type Receta = {
  id: string
  tipo: 'button' | 'field' | 'card' | 'table' | 'pill'
  tag: string
  firma: string
  clases: string
  etiqueta: string
  cantidad: number
  archivos: number
  estados: Estados
  usos: Uso[]
}

export const recetas = recetasJson as Receta[]
export const meta = metaJson as { elementos: Record<string, number>; usosDeButtonUI: number; truncados: number }
const NOMBRES = nombres as Record<string, { nombre: string; nota?: string }>

export const nombreDe = (r: Receta) => NOMBRES[r.id]?.nombre
export const esCurada = (r: Receta) => !!NOMBRES[r.id]
export const notaDe = (r: Receta) => NOMBRES[r.id]?.nota

/* Elementos distintos (archivo:línea) que dibujan alguno de estos looks: un
   elemento con condicional cae en varios looks y acá cuenta una sola vez. */
export const elementosDe = (de: Receta[]) => new Set(de.flatMap((r) => r.usos.map((u) => `${u.archivo}:${u.linea}`))).size

/* Familias de botones, por lo que dicen sus clases. */
export const FAMILIA_DESHABILITADO = 'Drawn as disabled'
export function familiaBoton(r: Receta): string {
  const c = new Set(r.clases.split(/\s+/))
  const f = r.firma
  if (r.estados.deshabilitado && !r.estados.deshabilitadoPorAtributo && !r.estados.hover) return FAMILIA_DESHABILITADO
  if (/bg-dash-bad-fg|bg-destructive/.test(f)) return 'Destructive'
  if (c.has('bg-dash-blue') && c.has('text-white')) return 'Primary (solid blue)'
  if (/text-dash-blue/.test(f) && /hover:underline/.test(f)) return 'Text link'
  if (/rounded-full/.test(f) && /shadow/.test(f)) return 'Floating round'
  if (c.has('border') && /border-line/.test(f) && !c.has('text-left')) return 'Outline'
  if ([...c].some((x) => /^size-\d+$/.test(x)) || /hover:opacity|hover:text-black/.test(f)) return 'Icon-only'
  if (c.has('text-left') || c.has('w-full')) return 'List row / menu item'
  return 'Other'
}

/* Las clases de posición (fixed, absolute, hidden…) sacan al elemento de la
   galería: en la muestra se descartan, el resto queda igual. */
const POSICION = /^(?:(?:[a-z]+:)*(?:fixed|absolute|sticky|hidden|inset-.*|top-.*|left-.*|right-.*|bottom-.*|z-.*|w-full|flex-1|-?translate-.*|-?mt-.*|-?ml-.*))$/
const limpiar = (clases: string) => clases.split(/\s+/).filter((c) => c && !POSICION.test(c)).join(' ')

export type EstadoMuestra = 'hover' | 'focus' | 'active' | 'disabled'

function Muestra({ r, estado }: { r: Receta; estado?: EstadoMuestra }) {
  const pseudo = estado === 'hover' ? 'pseudo-hover' : estado === 'focus' ? 'pseudo-focus-visible pseudo-focus' : estado === 'active' ? 'pseudo-active' : ''
  const clases = cn(limpiar(r.clases), pseudo)
  /* Sin foco propio, el navegador dibuja su anillo por defecto. Ese anillo no
     es una regla del CSS de la app, así que el addon de pseudo-estados no lo
     puede activar: se pide directo. */
  const estilo = estado === 'focus' && r.estados.foco === 'navegador' ? { outline: 'auto 1px -webkit-focus-ring-color' } : undefined
  const deshabilitado = estado === 'disabled'
  if (r.tipo === 'button') {
    return (
      <button type="button" className={clases} style={estilo} disabled={deshabilitado}>
        {r.etiqueta || <Plus className="size-4" />}
      </button>
    )
  }
  if (r.tipo === 'field') {
    if (r.tag === 'textarea') return <textarea className={clases} style={estilo} disabled={deshabilitado} placeholder={r.etiqueta || 'Placeholder'} rows={2} />
    if (r.tag === 'select') return <select className={clases} style={estilo} disabled={deshabilitado}><option>Option</option></select>
    return <input className={clases} style={estilo} disabled={deshabilitado} placeholder={r.etiqueta || 'Placeholder'} />
  }
  if (r.tipo === 'pill') return <span className={clases}>{r.etiqueta || 'Label'}</span>
  if (r.tipo === 'card') return <div className={`${clases} h-16 w-full p-3 text-[12px] text-ink-muted`}>{r.etiqueta || 'Card'}</div>
  return null
}

/* ── Estados ──────────────────────────────────────────────────────────────
   Cada celda dice la verdad: si el look define el estado, se dibuja tal cual;
   si no, se dice "not defined" en vez de repetir el botón sin cambios. */
const SIN_DEFINIR = <span className="text-[11px] text-ink-faint">— not defined</span>

function ConNota({ nota, children }: { nota?: string; children: ReactNode }) {
  return (
    <span className="flex flex-col items-start gap-1.5">
      {children}
      {nota && <span className="text-[10px] tracking-wide text-ink-muted uppercase">{nota}</span>}
    </span>
  )
}

export function CeldaDeEstado({ r, e }: { r: Receta; e: EstadoMuestra }) {
  const s = r.estados
  if (e === 'hover') return s.hover ? <Muestra r={r} estado="hover" /> : s.hoverSinEfecto ? <span className="text-[11px] text-ink-faint">— repeats the default</span> : SIN_DEFINIR
  if (e === 'active') return s.activo ? <Muestra r={r} estado="active" /> : SIN_DEFINIR
  if (e === 'focus') {
    const nota = s.foco === 'navegador' ? 'browser default' : s.foco === 'quitado' ? 'ring removed' : s.foco === 'invisible' ? 'declared, but invisible' : undefined
    return <ConNota nota={nota}><Muestra r={r} estado="focus" /></ConNota>
  }
  if (s.deshabilitadoPorAtributo) return <Muestra r={r} estado="disabled" />
  if (s.deshabilitado) return <ConNota nota="drawn as disabled"><Muestra r={r} /></ConNota>
  return SIN_DEFINIR
}

const TITULO_ESTADO: Record<EstadoMuestra, string> = { hover: 'Hover', focus: 'Focus', active: 'Active', disabled: 'Disabled' }

function Indicador({ ok, texto, malo }: { ok: boolean; texto: string; malo?: boolean }) {
  return (
    <span className={ok ? 'text-dash-ok-fg' : malo ? 'text-warn-fg' : 'text-ink-faint'} title={ok ? `${texto} definido` : `${texto} sin definir en este look`}>
      {ok ? '✓' : '✗'} {texto}
    </span>
  )
}

const focoOk = (r: Receta) => r.estados.foco === 'definido'

function Detalle({ r }: { r: Receta }) {
  return (
    <details className="text-[11.5px] text-ink-muted">
      <summary className="cursor-pointer">Classes and where it is used</summary>
      <p className="mt-2 break-words"><Codigo>{r.clases || '(sin clases visuales)'}</Codigo></p>
      <ul className="mt-2 list-disc pl-4">
        {r.usos.slice(0, 8).map((u) => (
          <li key={`${u.archivo}:${u.linea}`}>
            <Codigo>{u.archivo.replace('src/', '')}:{u.linea}</Codigo>
            {u.cuando && <span className="ml-1.5">when <Codigo>{u.cuando}</Codigo></span>}
          </li>
        ))}
        {r.usos.length > 8 && <li>… and {r.usos.length - 8} more</li>}
      </ul>
    </details>
  )
}

const ESTADOS_BASE: EstadoMuestra[] = ['hover', 'focus', 'active', 'disabled']

/* Matriz de estados: una fila por look, una columna por estado. */
export function MatrizDeEstados({ de }: { de: Receta[] }) {
  const columnas = ESTADOS_BASE.filter((e) => e !== 'active' || de.some((r) => r.estados.activo))
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-white">
      <table className="w-full min-w-[820px] text-left text-[12px]">
        <thead className="bg-surface-subtle text-[10px] tracking-wide text-ink-muted uppercase">
          <tr>
            <th className="px-3 py-2">Default</th>
            {columnas.map((e) => <th key={e} className="px-3 py-2">{TITULO_ESTADO[e]}</th>)}
            <th className="px-3 py-2">Uses</th>
            <th className="px-3 py-2">Look</th>
          </tr>
        </thead>
        <tbody>
          {de.map((r) => {
            const nombre = nombreDe(r)
            const cuando = [...new Set(r.usos.map((u) => u.cuando).filter(Boolean))]
            return (
              <tr key={r.id} className="border-t border-line-soft align-top">
                <td className="px-3 py-3"><Muestra r={r} /></td>
                {columnas.map((e) => <td key={e} className="px-3 py-3"><CeldaDeEstado r={r} e={e} /></td>)}
                <td className="px-3 py-3 whitespace-nowrap text-ink-muted">{r.cantidad} · {r.archivos}f</td>
                <td className="max-w-[340px] px-3 py-3">
                  <p className="text-[12px] font-semibold text-ink">{nombre ?? <span className="font-normal text-ink-faint">{r.id}</span>}{nombre && <span className="ml-1.5 font-mono text-[10.5px] font-normal text-ink-faint">{r.id}</span>}</p>
                  {notaDe(r) && <p className="mt-0.5 text-ink-medium">{notaDe(r)}</p>}
                  {cuando.length > 0 && <p className="mt-0.5 text-ink-muted">only when <Codigo>{cuando[0] as string}</Codigo>{cuando.length > 1 && ` (+${cuando.length - 1} more)`}</p>}
                  <div className="mt-1"><Detalle r={r} /></div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/* Tarjeta de un look (Cards, Pills y Tables: sin matriz de estados). */
export function TarjetaReceta({ r, conEstados = true }: { r: Receta; conEstados?: boolean }) {
  const nombre = nombreDe(r)
  const nota = notaDe(r)
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-line bg-white p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-[13px] font-semibold">{nombre ?? <span className="text-ink-medium">{r.etiqueta ? `“${r.etiqueta}”` : `${r.tag} look`}</span>} <span className="font-mono text-[11px] font-normal text-ink-faint">{r.id}</span></p>
        <p className="text-[12px] text-ink-muted">{r.cantidad} uses · {r.archivos} files</p>
      </div>
      {nota && <p className="text-[12px] text-ink-medium">{nota}</p>}
      <div className="flex flex-wrap items-center gap-3 rounded-md bg-surface-subtle p-3">
        <Muestra r={r} />
        {conEstados && ESTADOS_BASE.filter((e) => e !== 'active' || r.estados.activo).map((e) => (
          <span key={e} className="flex flex-col items-start gap-1">
            <CeldaDeEstado r={r} e={e} />
            <span className="text-[10px] tracking-wide text-ink-faint uppercase">{e}</span>
          </span>
        ))}
      </div>
      <Detalle r={r} />
    </div>
  )
}

/* Tabla con todos los looks de un tipo: el inventario completo, para que no
   quede ninguno sin mirar. Se puede filtrar por texto y por estado faltante. */
const FILTROS: [string, (r: Receta) => boolean][] = [
  ['All looks', () => true],
  ['Missing hover', (r) => !r.estados.hover],
  ['Missing focus (browser default or removed)', (r) => !focoOk(r)],
  ['Focus ring removed or invisible', (r) => r.estados.foco === 'quitado' || r.estados.foco === 'invisible'],
  ['Missing disabled', (r) => !r.estados.deshabilitado],
  ['Defines active (pressed)', (r) => r.estados.activo],
]

export function InventarioCompleto({ tipo, familiaDe }: { tipo: Receta['tipo']; familiaDe?: (r: Receta) => string }) {
  const todas = useMemo(() => recetas.filter((r) => r.tipo === tipo), [tipo])
  const [q, setQ] = useState('')
  const [f, setF] = useState(0)
  const visibles = useMemo(
    () => todas.filter((r) => FILTROS[f]![1](r) && `${r.firma} ${r.etiqueta} ${r.usos.map((u) => u.archivo).join(' ')}`.toLowerCase().includes(q.toLowerCase())),
    [todas, q, f],
  )
  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by class, label or file…" aria-label="Filter looks" className="h-9 w-[300px] max-w-full rounded-md border border-line px-3 text-[13px] outline-none focus:border-dash-blue" />
        <select value={f} onChange={(e) => setF(Number(e.target.value))} aria-label="Filter by state" className="h-9 rounded-md border border-line bg-white px-2 text-[13px] outline-none focus:border-dash-blue">
          {FILTROS.map(([n], i) => <option key={n} value={i}>{n}</option>)}
        </select>
      </div>
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full text-left text-[12px]">
          <thead className="bg-surface-subtle text-[11px] tracking-wide text-ink-muted uppercase">
            <tr>
              <th className="px-3 py-2">Preview</th>
              {familiaDe && <th className="px-3 py-2">Family</th>}
              <th className="px-3 py-2">Uses</th>
              <th className="px-3 py-2">States</th>
              <th className="px-3 py-2">Visual classes</th>
            </tr>
          </thead>
          <tbody>
            {visibles.map((r) => (
              <tr key={r.id} className="border-t border-line-soft align-top">
                <td className="px-3 py-2"><Muestra r={r} /></td>
                {familiaDe && <td className="px-3 py-2 whitespace-nowrap text-ink-medium">{familiaDe(r)}</td>}
                <td className="px-3 py-2 whitespace-nowrap">{r.cantidad} · {r.archivos}f</td>
                <td className="px-3 py-2 text-[11px] whitespace-nowrap">
                  <Indicador ok={r.estados.hover} texto="hover" /> <Indicador ok={focoOk(r)} texto="focus" malo={r.estados.foco === 'quitado' || r.estados.foco === 'invisible'} /> <Indicador ok={r.estados.deshabilitado} texto="disabled" />
                </td>
                <td className="px-3 py-2 font-mono text-[11px] text-ink-medium">{r.firma || '-'}{nombreDe(r) && <span className="ml-2 font-sans text-ink">[{nombreDe(r)}]</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[12px] text-ink-muted">{visibles.length} of {todas.length} looks</p>
    </div>
  )
}

/* ── Consistencia ─────────────────────────────────────────────────────────
   Dentro de una familia, cuántas veces aparece cada valor de altura, padding,
   peso, tamaño de texto, radio y sombra. Si una familia usa tres paddings
   distintos, se ve acá. */
const FACETAS: [string, RegExp][] = [
  ['Height', /^h-\S+$/],
  ['Padding X', /^px-\S+$/],
  ['Weight', /^font-(?:normal|medium|semibold|bold)$/],
  ['Text size', /^text-(?:\[[\d.]+px\]|xs|sm|base|lg)$/],
  ['Radius', /^rounded(?:-\S+)?$/],
  ['Shadow', /^shadow\S*$/],
  ['Border', /^border(?:-\S+)?$/],
]

function facetas(de: Receta[]) {
  return FACETAS.map(([nombre, re]) => {
    const cuenta = new Map<string, number>()
    for (const r of de) for (const c of new Set(r.clases.split(/\s+/).map((x) => x.replace(/^(?:[^\s:]+:)+/, '')).filter((x) => re.test(x)))) cuenta.set(c, (cuenta.get(c) ?? 0) + r.cantidad)
    return { nombre, valores: [...cuenta].sort((a, b) => b[1] - a[1]) }
  }).filter((f) => f.valores.length > 0)
}

export function Consistencia({ de }: { de: Receta[] }) {
  const filas = facetas(de)
  if (!filas.length) return null
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white text-[12px]">
      {filas.map((f) => (
        <div key={f.nombre} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line-soft px-3 py-2 first:border-t-0">
          <span className="w-24 shrink-0 font-semibold">{f.nombre}</span>
          {f.valores.map(([v, n]) => (
            <span key={v} className={f.valores.length > 1 ? 'rounded bg-warn-bg px-1.5 py-0.5 text-warn-fg' : 'rounded bg-dash-ok-bg px-1.5 py-0.5 text-dash-ok-fg'}>
              <span className="font-mono">{v}</span> ×{n}
            </span>
          ))}
          {f.valores.length > 1 && <span className="text-ink-muted">{f.valores.length} values in use</span>}
        </div>
      ))}
    </div>
  )
}

/* ── Resumen e índice ─────────────────────────────────────────────────────── */
const pct = (n: number, d: number) => (d ? Math.round((n / d) * 100) : 0)

export function ResumenDeEstados({ de, total }: { de: Receta[]; total: number }) {
  const n = de.length
  const dato = (valor: string, texto: string, malo = false) => (
    <div className="flex flex-col">
      <dt className={cn('text-[22px] leading-tight font-bold', malo && 'text-warn-fg')}>{valor}</dt>
      <dd className="text-[12px] text-ink-muted">{texto}</dd>
    </div>
  )
  return (
    <dl className="flex flex-wrap gap-x-10 gap-y-4 rounded-lg border border-line bg-white px-5 py-4">
      {dato(String(total), 'elements in the code')}
      {dato(String(n), 'distinct looks')}
      {dato(`${pct(de.filter((r) => r.estados.hover).length, n)}%`, 'of looks define hover')}
      {dato(`${pct(de.filter(focoOk).length, n)}%`, 'define a focus style', true)}
      {dato(`${pct(de.filter((r) => r.estados.deshabilitado).length, n)}%`, 'define disabled', true)}
      {dato(String(de.filter((r) => r.estados.activo).length), 'define active (pressed)', true)}
    </dl>
  )
}

const slug = (t: string) => `familia-${t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`

export function irA(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function IndiceDeFamilias({ tipo, familiaDe, orden, descripciones }: { tipo: Receta['tipo']; familiaDe: (r: Receta) => string; orden: string[]; descripciones?: Record<string, string> }) {
  const todas = recetas.filter((r) => r.tipo === tipo)
  const celda = (n: number, m: number, malo = true) => (
    <td className={cn('px-3 py-2 whitespace-nowrap tabular-nums', n === 0 && malo ? 'text-warn-fg' : 'text-ink-medium')}>{n} <span className="text-ink-faint">/ {m}</span></td>
  )
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-white">
      <table className="w-full min-w-[760px] text-left text-[12px]">
        <thead className="bg-surface-subtle text-[10px] tracking-wide text-ink-muted uppercase">
          <tr>
            <th className="px-3 py-2">Family</th>
            <th className="px-3 py-2">Elements</th>
            <th className="px-3 py-2">Looks</th>
            <th className="px-3 py-2">Hover</th>
            <th className="px-3 py-2">Focus defined</th>
            <th className="px-3 py-2">Active</th>
            <th className="px-3 py-2">Disabled</th>
          </tr>
        </thead>
        <tbody>
          {orden.map((fam) => {
            const de = todas.filter((r) => familiaDe(r) === fam)
            if (!de.length) return null
            return (
              <tr key={fam} className="border-t border-line-soft align-top">
                <td className="px-3 py-2">
                  <a href={`#${slug(fam)}`} onClick={(e) => { e.preventDefault(); irA(slug(fam)) }} className="text-[13px] font-semibold text-dash-blue hover:underline">{fam}</a>
                  {descripciones?.[fam] && <p className="mt-0.5 max-w-[46ch] text-ink-muted">{descripciones[fam]}</p>}
                </td>
                <td className="px-3 py-2 tabular-nums">{elementosDe(de)}</td>
                <td className="px-3 py-2 tabular-nums">{de.length}</td>
                {celda(de.filter((r) => r.estados.hover).length, de.length)}
                {celda(de.filter(focoOk).length, de.length)}
                {celda(de.filter((r) => r.estados.activo).length, de.length, false)}
                {celda(de.filter((r) => r.estados.deshabilitado).length, de.length)}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/* Una familia: qué es, sus looks con la matriz de estados y las diferencias
   internas. Los primeros `visibles` looks van a la vista; el resto, plegado. */
export function SeccionDeFamilia({ familia, de, descripcion, visibles = 8 }: { familia: string; de: Receta[]; descripcion?: string; visibles?: number }) {
  const cambios = facetas(de).filter((f) => f.valores.length > 1)
  const sinActivo = !de.some((r) => r.estados.activo)
  return (
    <section id={slug(familia)} className="scroll-mt-6">
      <h2 className="text-[16px] font-semibold">{familia} <span className="text-[13px] font-normal text-ink-muted">· {elementosDe(de)} elements, {de.length} {de.length === 1 ? 'look' : 'looks'}</span></h2>
      {descripcion && <p className="mt-1 max-w-[70ch] text-[13px] text-ink-muted">{descripcion}</p>}
      {sinActivo && <p className="mt-1 text-[12px] text-ink-muted">No look in this family defines an active (pressed) state, so that column is left out.</p>}
      <div className="mt-3"><MatrizDeEstados de={de.slice(0, visibles)} /></div>
      {de.length > visibles && (
        <details className="mt-2">
          <summary className="cursor-pointer text-[12.5px] font-medium text-dash-blue">Show the other {de.length - visibles} looks of this family</summary>
          <div className="mt-2"><MatrizDeEstados de={de.slice(visibles)} /></div>
        </details>
      )}
      {cambios.length > 0 && (
        <details className="mt-3">
          <summary className="cursor-pointer text-[12.5px] font-medium text-dash-blue">Differences inside this family: {cambios.map((f) => `${f.nombre.toLowerCase()} (${f.valores.length})`).join(', ')}</summary>
          <div className="mt-2"><Consistencia de={de} /></div>
        </details>
      )}
    </section>
  )
}

/* Página completa de un tipo de receta con matriz de estados (Buttons,
   Fields) o con tarjetas (Cards, Pills, Tables). */
export function PaginaDeRecetas({
  tipo, familiaDe, orden, maxPorFamilia = 6, estados = true, vista = 'tarjetas', descripciones,
}: {
  tipo: Receta['tipo']
  familiaDe: (r: Receta) => string
  orden: string[]
  maxPorFamilia?: number
  estados?: boolean
  vista?: 'matriz' | 'tarjetas'
  descripciones?: Record<string, string>
}) {
  const todas = recetas.filter((r) => r.tipo === tipo)
  return (
    <>
      {orden.map((familia) => {
        const de = todas.filter((r) => familiaDe(r) === familia)
        if (!de.length) return null
        if (vista === 'matriz') return <SeccionDeFamilia key={familia} familia={familia} de={de} descripcion={descripciones?.[familia]} />
        return (
          <section key={familia}>
            <h2 className="text-[16px] font-semibold">{familia} · {elementosDe(de)} elements, {de.length} {de.length === 1 ? 'look' : 'looks'}</h2>
            <div className="mt-3"><Consistencia de={de} /></div>
            <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
              {de.slice(0, maxPorFamilia).map((r) => <TarjetaReceta key={r.id} r={r} conEstados={estados} />)}
            </div>
            {de.length > maxPorFamilia && <p className="mt-2 text-[12px] text-ink-muted">{de.length - maxPorFamilia} more looks of this family are in the full inventory below.</p>}
          </section>
        )
      })}
      <section>
        <h2 className="text-[16px] font-semibold">Full inventory</h2>
        <p className="mt-1 max-w-[70ch] text-[13px] text-ink-muted">Todos los looks, ordenados por cantidad de usos. ✓ / ✗ marcan si el look define hover, foco y deshabilitado; el filtro de estado encuentra los que no.</p>
        <div className="mt-4"><InventarioCompleto tipo={tipo} familiaDe={vista === 'matriz' ? familiaDe : undefined} /></div>
      </section>
    </>
  )
}
