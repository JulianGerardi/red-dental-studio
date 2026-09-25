import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import recetasJson from './generated/recipes.json'
import nombres from './recipe-names.json'
import { Codigo } from './Page'

/* Galería de recetas: lo que el código de la app hace hoy, leído por
   scripts/scan-recipes.mjs. Cada receta se dibuja con las clases exactas que
   tiene en el código -no hay copia a mano-, con su cantidad de usos, dónde
   están y qué estados tiene definidos. */

export type Receta = {
  id: string
  tipo: 'button' | 'field' | 'card' | 'table' | 'pill'
  tag: string
  firma: string
  clases: string
  etiqueta: string
  cantidad: number
  archivos: number
  usos: { archivo: string; linea: number }[]
}

export const recetas = recetasJson as Receta[]
const NOMBRES = nombres as Record<string, { nombre: string; nota?: string }>

export const nombreDe = (r: Receta) => NOMBRES[r.id]?.nombre
export const esCurada = (r: Receta) => !!NOMBRES[r.id]
export const notaDe = (r: Receta) => NOMBRES[r.id]?.nota

/* Familias de botones, por lo que dicen sus clases. */
export function familiaBoton(r: Receta): string {
  const c = new Set(r.clases.split(/\\s+/))
  const f = r.firma
  if (/bg-primary-disabled/.test(f)) return 'Disabled placeholder'
  if (/bg-dash-bad-fg|bg-destructive/.test(f)) return 'Destructive'
  if (c.has('bg-dash-blue') && c.has('text-white')) return 'Primary (solid blue)'
  if (/text-dash-blue/.test(f) && /hover:underline/.test(f)) return 'Text link'
  if (/rounded-full/.test(f) && /shadow/.test(f)) return 'Floating round'
  if (c.has('border') && /border-line/.test(f) && !c.has('text-left')) return 'Outline'
  if ([...c].some((x) => /^size-\\d+$/.test(x)) || /hover:opacity|hover:text-black/.test(f)) return 'Icon-only'
  if (c.has('text-left') || c.has('w-full')) return 'List row / menu item'
  return 'Other'
}

const tieneHover = (r: Receta) => /(^|\\s)(group-)?hover:/.test(r.firma)
const tieneFoco = (r: Receta) => /focus/.test(r.firma)
const tieneDeshabilitado = (r: Receta) => /disabled:|bg-primary-disabled|cursor-not-allowed/.test(r.firma + ' ' + r.clases)

function Indicador({ ok, texto }: { ok: boolean; texto: string }) {
  return (
    <span className={ok ? 'text-dash-ok-fg' : 'text-warn-fg'} title={ok ? \`\${texto} definido\` : \`\${texto} sin definir en esta receta\`}>
      {ok ? '✓' : '✗'} {texto}
    </span>
  )
}

/* Las clases de posición (fixed, absolute, hidden…) sacan al elemento de la
   galería: en la muestra se descartan, el resto queda igual. */
const POSICION = /^(?:(?:[a-z]+:)*(?:fixed|absolute|sticky|hidden|inset-.*|top-.*|left-.*|right-.*|bottom-.*|z-.*|w-full|flex-1|-?translate-.*|-?mt-.*|-?ml-.*))$/
const limpiar = (clases: string) => clases.split(/\\s+/).filter((c) => c && !POSICION.test(c)).join(' ')

function Muestra({ r, estado }: { r: Receta; estado?: 'hover' | 'focus' | 'active' | 'disabled' }) {
  const pseudo = estado === 'hover' ? 'pseudo-hover' : estado === 'focus' ? 'pseudo-focus-visible pseudo-focus' : estado === 'active' ? 'pseudo-active' : ''
  const clases = \`\${limpiar(r.clases)} \${pseudo}\`
  if (r.tipo === 'button') {
    return (
      <button type="button" className={clases} disabled={estado === 'disabled'}>
        {r.etiqueta || <Plus className="size-4" />}
      </button>
    )
  }
  if (r.tipo === 'field') {
    if (r.tag === 'textarea') return <textarea className={clases} disabled={estado === 'disabled'} placeholder={r.etiqueta || 'Placeholder'} rows={2} />
    if (r.tag === 'select') return <select className={clases} disabled={estado === 'disabled'}><option>Option</option></select>
    return <input className={clases} disabled={estado === 'disabled'} placeholder={r.etiqueta || 'Placeholder'} />
  }
  if (r.tipo === 'pill') return <span className={clases}>{r.etiqueta || 'Label'}</span>
  if (r.tipo === 'card') return <div className={\`\${clases} h-16 w-full p-3 text-[12px] text-ink-muted\`}>{r.etiqueta || 'Card'}</div>
  return null
}

const ESTADOS = ['hover', 'focus', 'active', 'disabled'] as const

export function TarjetaReceta({ r, conEstados = true }: { r: Receta; conEstados?: boolean }) {
  const nombre = nombreDe(r)
  const nota = notaDe(r)
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-line bg-white p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-[13px] font-semibold">{nombre ?? <span className="text-ink-medium">{r.etiqueta ? \`“\${r.etiqueta}”\` : \`\${r.tag} recipe\`}</span>} <span className="font-mono text-[11px] font-normal text-ink-faint">{r.id}</span></p>
        <p className="text-[12px] text-ink-muted">{r.cantidad} uses · {r.archivos} files</p>
      </div>
      {nota && <p className="text-[12px] text-ink-medium">{nota}</p>}
      <div className="flex flex-wrap items-center gap-3 rounded-md bg-surface-subtle p-3">
        <Muestra r={r} />
        {conEstados && ESTADOS.map((e) => (
          <span key={e} className="flex flex-col items-start gap-1">
            <Muestra r={r} estado={e} />
            <span className="text-[10px] tracking-wide text-ink-faint uppercase">{e}</span>
          </span>
        ))}
      </div>
      <p className="text-[11.5px] text-ink-muted">
        <Indicador ok={tieneHover(r)} texto="hover" /> · <Indicador ok={tieneFoco(r)} texto="focus" /> · <Indicador ok={tieneDeshabilitado(r)} texto="disabled" />
      </p>
      <details className="text-[11.5px] text-ink-muted">
        <summary className="cursor-pointer">Classes and where it is used</summary>
        <p className="mt-2 break-words"><Codigo>{r.clases || '(sin clases visuales)'}</Codigo></p>
        <ul className="mt-2 list-disc pl-4">
          {r.usos.slice(0, 8).map((u) => <li key={\`\${u.archivo}:\${u.linea}\`}><Codigo>{u.archivo.replace('src/', '')}:{u.linea}</Codigo></li>)}
          {r.usos.length > 8 && <li>… and {r.usos.length - 8} more</li>}
        </ul>
      </details>
    </div>
  )
}

/* Tabla con todas las recetas de un tipo: el inventario completo, para que no
   quede ninguna sin mirar. */
export function InventarioCompleto({ tipo }: { tipo: Receta['tipo'] }) {
  const todas = recetas.filter((r) => r.tipo === tipo)
  const [q, setQ] = useState('')
  const visibles = useMemo(() => todas.filter((r) => \`\${r.firma} \${r.etiqueta} \${r.usos.map((u) => u.archivo).join(' ')}\`.toLowerCase().includes(q.toLowerCase())), [todas, q])
  return (
    <div>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by class, label or file…" className="mb-3 h-9 w-[340px] max-w-full rounded-md border border-line px-3 text-[13px] outline-none focus:border-dash-blue" />
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full text-left text-[12px]">
          <thead className="bg-surface-subtle text-[11px] tracking-wide text-ink-muted uppercase">
            <tr><th className="px-3 py-2">Preview</th><th className="px-3 py-2">Uses</th><th className="px-3 py-2">States</th><th className="px-3 py-2">Visual classes</th></tr>
          </thead>
          <tbody>
            {visibles.map((r) => (
              <tr key={r.id} className="border-t border-line-soft align-top">
                <td className="px-3 py-2"><Muestra r={r} /></td>
                <td className="px-3 py-2 whitespace-nowrap">{r.cantidad} · {r.archivos}f</td>
                <td className="px-3 py-2 whitespace-nowrap text-[11px]"><Indicador ok={tieneHover(r)} texto="h" /> <Indicador ok={tieneFoco(r)} texto="f" /> <Indicador ok={tieneDeshabilitado(r)} texto="d" /></td>
                <td className="px-3 py-2 font-mono text-[11px] text-ink-medium">{r.firma || '-'}{nombreDe(r) && <span className="ml-2 font-sans text-ink">[{nombreDe(r)}]</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[12px] text-ink-muted">{visibles.length} of {todas.length} recipes</p>
    </div>
  )
}

/* ── Consistencia ─────────────────────────────────────────────────────────
   Dentro de una familia, cuántas veces aparece cada valor de altura, padding,
   peso, tamaño de texto, radio y sombra. Si una familia usa tres paddings
   distintos, se ve acá. */
const FACETAS: [string, RegExp][] = [
  ['Height', /^h-\\S+$/],
  ['Padding X', /^px-\\S+$/],
  ['Weight', /^font-(?:normal|medium|semibold|bold)$/],
  ['Text size', /^text-(?:\\[[\\d.]+px\\]|xs|sm|base|lg)$/],
  ['Radius', /^rounded(?:-\\S+)?$/],
  ['Shadow', /^shadow\\S*$/],
  ['Border', /^border(?:-\\S+)?$/],
]

export function Consistencia({ de }: { de: Receta[] }) {
  const filas = FACETAS.map(([nombre, re]) => {
    const cuenta = new Map<string, number>()
    for (const r of de) for (const c of new Set(r.clases.split(/\\s+/).map((x) => x.replace(/^(?:[^\\s:]+:)+/, '')).filter((x) => re.test(x)))) cuenta.set(c, (cuenta.get(c) ?? 0) + r.cantidad)
    return { nombre, valores: [...cuenta].sort((a, b) => b[1] - a[1]) }
  }).filter((f) => f.valores.length > 0)
  if (!filas.length) return null
  return (
    <div className="overflow-hidden rounded-lg border border-line text-[12px]">
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

/* Página completa de un tipo de receta: familias, consistencia, tarjetas de
   las más usadas e inventario completo. */
export function PaginaDeRecetas({
  tipo, familiaDe, orden, maxPorFamilia = 6, estados = true,
}: {
  tipo: Receta['tipo']
  familiaDe: (r: Receta) => string
  orden: string[]
  maxPorFamilia?: number
  estados?: boolean
}) {
  const todas = recetas.filter((r) => r.tipo === tipo)
  return (
    <>
      {orden.map((familia) => {
        const de = todas.filter((r) => familiaDe(r) === familia)
        if (!de.length) return null
        const usos = de.reduce((n, r) => n + r.cantidad, 0)
        return (
          <section key={familia}>
            <h2 className="text-[16px] font-semibold">{familia} · {usos} uses, {de.length} {de.length === 1 ? 'recipe' : 'recipes'}</h2>
            <div className="mt-3"><Consistencia de={de} /></div>
            <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
              {de.slice(0, maxPorFamilia).map((r) => <TarjetaReceta key={r.id} r={r} conEstados={estados} />)}
            </div>
            {de.length > maxPorFamilia && <p className="mt-2 text-[12px] text-ink-muted">{de.length - maxPorFamilia} more recipes of this family are in the full inventory below.</p>}
          </section>
        )
      })}
      <section>
        <h2 className="text-[16px] font-semibold">Full inventory</h2>
        <p className="mt-1 max-w-[70ch] text-[13px] text-ink-muted">Todas las recetas, ordenadas por cantidad de usos. ✓ / ✗ marcan si la receta define hover (h), foco (f) y deshabilitado (d).</p>
        <div className="mt-4"><InventarioCompleto tipo={tipo} /></div>
      </section>
    </>
  )
}
`})))()}export{n,i as r,r as t};