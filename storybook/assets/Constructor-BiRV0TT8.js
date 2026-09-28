import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import {
  ArrowDown, ArrowUp, Blocks, Check, ChevronDown, Code2, Copy, CopyPlus, PanelRightClose, Plus, Trash2, X,
} from 'lucide-react'
import { Tabs } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import type { PillTone } from '@/components/ui/pill'
import { cn } from '@/lib/utils'
import { Enlace } from '../navegar'
import { Sitio } from '../Sitio'
import {
  AGREGAR, ANCHOS, ICONOS, NOMBRE_COLUMNA, PLANTILLAS, TIPOS, VerDiseno, campo, generarCodigo, infoDe, nombreComponente, nuevoId,
  type Bloque, type BloqueDe, type Campo, type ColumnaTabla, type Diseno, type NombreIcono, type TipoBloque,
} from './bloques'

/* El constructor: cualquiera arma un componente con las piezas reales de la
   app y se lleva su código. El lienzo muestra lo que se arma; el panel
   flotante del costado tiene los bloques (Build) y el código (Code). Lo que
   se arma queda guardado en este navegador. */

const GUARDADO = 'enamel-builder'

function cargar(): Diseno | null {
  try {
    const t = window.localStorage.getItem(GUARDADO)
    return t ? (JSON.parse(t) as Diseno) : null
  } catch {
    return null
  }
}

/* ── Controles del panel ────────────────────────────────────────────── */

const ETIQUETA = 'text-[12px] font-medium text-ink-medium'
const INPUT = 'h-8 w-full min-w-0 rounded-md border border-line bg-white px-2.5 text-[13px] text-ink outline-none placeholder:text-ink-faint focus:border-dash-blue focus:ring-2 focus:ring-dash-blue/15'

function Texto({ label, value, onChange, placeholder, largo }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; largo?: boolean }) {
  return (
    <label className="flex min-w-0 flex-col gap-1">
      <span className={ETIQUETA}>{label}</span>
      {largo ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3} className={cn(INPUT, 'h-auto py-1.5 leading-snug')} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={INPUT} />
      )}
    </label>
  )
}

function Elegir<T extends string>({ label, value, opciones, onChange }: { label?: string; value: T; opciones: readonly (T | { value: T; label: string })[]; onChange: (v: T) => void }) {
  return (
    <label className="flex min-w-0 flex-col gap-1">
      {label && <span className={ETIQUETA}>{label}</span>}
      <span className="relative">
        <select value={value} onChange={(e) => onChange(e.target.value as T)} className={cn(INPUT, 'appearance-none pr-7')}>
          {opciones.map((o) => {
            const v = typeof o === 'string' ? o : o.value
            return <option key={v} value={v}>{typeof o === 'string' ? o : o.label}</option>
          })}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-2 size-3.5 -translate-y-1/2 text-ink-muted" />
      </span>
    </label>
  )
}

function Segmentos<T extends string>({ label, value, opciones, onChange }: { label: string; value: T; opciones: { value: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div className="flex flex-col gap-1">
      <span className={ETIQUETA}>{label}</span>
      <Tabs size="sm" fullWidth tabs={opciones} value={value} onChange={onChange} aria-label={label} />
    </div>
  )
}

function Llave({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-3 text-[13px] text-ink">
      {label}
      <Switch size="sm" checked={value} onCheckedChange={onChange} aria-label={label} />
    </label>
  )
}

function Quitar({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} className="flex size-8 shrink-0 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted hover:text-dash-bad-fg">
      <X className="size-3.5" />
    </button>
  )
}

function Sumar({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-1 self-start rounded-md px-1.5 py-1 text-[12.5px] font-medium text-dash-blue hover:bg-info-bg">
      <Plus className="size-3.5" /> {children}
    </button>
  )
}

const OPC_ICONO = (Object.keys(ICONOS) as NombreIcono[]).map((k) => ({ value: k, label: k === 'none' ? 'No icon' : k }))
const TONOS: PillTone[] = ['success', 'info', 'warning', 'danger', 'neutral', 'purple']
const CLASES_CAMPO = [
  { value: 'text', label: 'Text' }, { value: 'select', label: 'Select' }, { value: 'date', label: 'Date' },
  { value: 'textarea', label: 'Text area' }, { value: 'search', label: 'Search' },
] as const

/* ── El editor de cada bloque ───────────────────────────────────────── */

function EditorCampo({ c, cambiar, quitar }: { c: Campo; cambiar: (x: Partial<Campo>) => void; quitar: () => void }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-lg border border-line-row bg-surface-subtle p-2.5">
      <div className="flex items-end gap-2">
        <div className="w-[108px] shrink-0"><Elegir label="Type" value={c.clase} opciones={CLASES_CAMPO} onChange={(v) => cambiar({ clase: v })} /></div>
        <div className="min-w-0 flex-1"><Texto label="Label" value={c.label} onChange={(v) => cambiar({ label: v })} /></div>
        <Quitar onClick={quitar} label={\`Remove \${c.label}\`} />
      </div>
      {c.clase !== 'date' && <Texto label="Placeholder" value={c.placeholder} onChange={(v) => cambiar({ placeholder: v })} />}
      {(c.clase === 'select' || c.clase === 'search') && <Texto label="Options (comma separated)" value={c.opciones} onChange={(v) => cambiar({ opciones: v })} />}
      <div className="grid grid-cols-2 gap-2">
        <Texto label="Hint" value={c.hint} onChange={(v) => cambiar({ hint: v })} />
        <Texto label="Error" value={c.error} onChange={(v) => cambiar({ error: v })} placeholder="None" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Llave label="Required" value={c.required} onChange={(v) => cambiar({ required: v })} />
        <Llave label="Disabled" value={c.disabled} onChange={(v) => cambiar({ disabled: v })} />
      </div>
    </div>
  )
}

function Editor({ b, cambiar }: { b: Bloque; cambiar: (x: Partial<Bloque>) => void }) {
  const c = cambiar as (x: object) => void
  switch (b.tipo) {
    case 'encabezado':
      return (
        <>
          <Texto label="Title" value={b.titulo} onChange={(v) => c({ titulo: v })} />
          <Texto label="Description" value={b.bajada} onChange={(v) => c({ bajada: v })} />
          <div className="grid grid-cols-2 gap-2">
            <Texto label="Main action" value={b.accion} onChange={(v) => c({ accion: v })} placeholder="None" />
            <Elegir label="Icon" value={b.icono} opciones={OPC_ICONO} onChange={(v) => c({ icono: v })} />
          </div>
        </>
      )
    case 'texto':
      return (
        <>
          <Texto label="Text" value={b.texto} onChange={(v) => c({ texto: v })} largo />
          <Segmentos label="Tone" value={b.tono} opciones={[{ value: 'normal', label: 'Normal' }, { value: 'suave', label: 'Muted' }]} onChange={(v) => c({ tono: v })} />
        </>
      )
    case 'botones': {
      const poner = (i: number, x: Partial<BloqueDe<'botones'>['botones'][number]>) => c({ botones: b.botones.map((y, k) => (k === i ? { ...y, ...x } : y)) })
      return (
        <>
          <Segmentos label="Align" value={b.alinear} opciones={[{ value: 'inicio', label: 'Start' }, { value: 'fin', label: 'End' }, { value: 'extremos', label: 'Spread' }]} onChange={(v) => c({ alinear: v })} />
          {b.botones.map((x, i) => (
            <div key={i} className="flex flex-col gap-2 rounded-lg border border-line-row bg-surface-subtle p-2.5">
              <div className="flex items-end gap-2">
                <div className="min-w-0 flex-1"><Texto label={\`Button \${i + 1}\`} value={x.label} onChange={(v) => poner(i, { label: v })} /></div>
                <Quitar onClick={() => c({ botones: b.botones.filter((_, k) => k !== i) })} label={\`Remove \${x.label}\`} />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Elegir label="Variant" value={x.variant} opciones={['primary', 'secondary', 'ghost', 'link', 'destructive'] as const} onChange={(v) => poner(i, { variant: v })} />
                <Elegir label="Size" value={x.size} opciones={['sm', 'md', 'lg'] as const} onChange={(v) => poner(i, { size: v })} />
                <Elegir label="Icon" value={x.icono} opciones={OPC_ICONO} onChange={(v) => poner(i, { icono: v })} />
              </div>
            </div>
          ))}
          {b.botones.length < 4 && <Sumar onClick={() => c({ botones: [...b.botones, { label: 'Button', variant: 'secondary', size: 'lg', icono: 'none' }] })}>Add button</Sumar>}
        </>
      )
    }
    case 'pestanas':
      return (
        <>
          <Texto label="Tabs (comma separated)" value={b.tabs} onChange={(v) => c({ tabs: v })} />
          <Segmentos label="Size" value={b.size} opciones={[{ value: 'md', label: 'md · 32px' }, { value: 'sm', label: 'sm · 28px' }]} onChange={(v) => c({ size: v })} />
          <Llave label="Full width" value={b.fullWidth} onChange={(v) => c({ fullWidth: v })} />
        </>
      )
    case 'campos':
      return (
        <>
          <Segmentos label="Columns" value={String(b.columnas) as '1' | '2'} opciones={[{ value: '1', label: 'One' }, { value: '2', label: 'Two' }]} onChange={(v) => c({ columnas: Number(v) })} />
          {b.campos.map((f) => (
            <EditorCampo
              key={f.id}
              c={f}
              cambiar={(x) => c({ campos: b.campos.map((y) => (y.id === f.id ? { ...y, ...x } : y)) })}
              quitar={() => c({ campos: b.campos.filter((y) => y.id !== f.id) })}
            />
          ))}
          <Sumar onClick={() => c({ campos: [...b.campos, campo({ label: 'New field' })] })}>Add field</Sumar>
        </>
      )
    case 'pills':
      return (
        <>
          {b.items.map((x, i) => (
            <div key={i} className="flex items-end gap-2">
              <div className="min-w-0 flex-1"><Texto label={\`Pill \${i + 1}\`} value={x.label} onChange={(v) => c({ items: b.items.map((y, k) => (k === i ? { ...y, label: v } : y)) })} /></div>
              <div className="w-[108px] shrink-0"><Elegir label="Tone" value={x.tone} opciones={TONOS} onChange={(v) => c({ items: b.items.map((y, k) => (k === i ? { ...y, tone: v } : y)) })} /></div>
              <Quitar onClick={() => c({ items: b.items.filter((_, k) => k !== i) })} label={\`Remove \${x.label}\`} />
            </div>
          ))}
          <Sumar onClick={() => c({ items: [...b.items, { label: 'Status', tone: 'info' }] })}>Add pill</Sumar>
        </>
      )
    case 'tabla':
      return (
        <>
          <div className="flex flex-col gap-1">
            <span className={ETIQUETA}>Columns</span>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(NOMBRE_COLUMNA) as ColumnaTabla[]).map((k) => {
                const on = b.columnas.includes(k)
                return (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={on}
                    onClick={() => c({ columnas: on ? b.columnas.filter((x) => x !== k) : (Object.keys(NOMBRE_COLUMNA) as ColumnaTabla[]).filter((x) => x === k || b.columnas.includes(x)) })}
                    className={cn('inline-flex h-7 items-center gap-1 rounded-full border px-2.5 text-[12px] font-medium', on ? 'border-dash-blue bg-info-bg text-dash-blue' : 'border-line text-ink-medium hover:bg-surface-muted')}
                  >
                    {on && <Check className="size-3" />} {NOMBRE_COLUMNA[k]}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex flex-col gap-1">
              <span className={ETIQUETA}>Rows · {b.filas}</span>
              <input type="range" min={1} max={10} value={b.filas} onChange={(e) => c({ filas: Number(e.target.value) })} className="accent-dash-blue" />
            </label>
            <Elegir label="Rows per page" value={String(b.porPagina) as '3' | '5' | '10'} opciones={['3', '5', '10'] as const} onChange={(v) => c({ porPagina: Number(v) })} />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            <Llave label="Search" value={b.buscador} onChange={(v) => c({ buscador: v })} />
            <Llave label="Selectable" value={b.seleccion} onChange={(v) => c({ seleccion: v })} />
            <Llave label="Row actions" value={b.acciones} onChange={(v) => c({ acciones: v })} />
            <Llave label="Compact" value={b.compacta} onChange={(v) => c({ compacta: v })} />
          </div>
        </>
      )
    case 'vacio':
      return (
        <>
          <Elegir label="Icon" value={b.icono} opciones={OPC_ICONO} onChange={(v) => c({ icono: v })} />
          <Texto label="Title" value={b.titulo} onChange={(v) => c({ titulo: v })} />
          <Texto label="Detail" value={b.detalle} onChange={(v) => c({ detalle: v })} largo />
          <Texto label="Action" value={b.accion} onChange={(v) => c({ accion: v })} placeholder="None" />
        </>
      )
    case 'opciones':
      return (
        <>
          <Segmentos label="Control" value={b.control} opciones={[{ value: 'switch', label: 'Switch' }, { value: 'checkbox', label: 'Checkbox' }]} onChange={(v) => c({ control: v })} />
          {b.items.map((x, i) => (
            <div key={i} className="flex items-end gap-2">
              <div className="min-w-0 flex-1"><Texto label={\`Option \${i + 1}\`} value={x.label} onChange={(v) => c({ items: b.items.map((y, k) => (k === i ? { ...y, label: v } : y)) })} /></div>
              <span className="flex h-8 items-center"><Switch size="sm" checked={x.on} onCheckedChange={(v) => c({ items: b.items.map((y, k) => (k === i ? { ...y, on: v } : y)) })} aria-label={\`\${x.label} starts on\`} /></span>
              <Quitar onClick={() => c({ items: b.items.filter((_, k) => k !== i) })} label={\`Remove \${x.label}\`} />
            </div>
          ))}
          <Sumar onClick={() => c({ items: [...b.items, { label: \`Option \${b.items.length + 1}\`, on: false }] })}>Add option</Sumar>
        </>
      )
    case 'turnos':
      return (
        <label className="flex flex-col gap-1">
          <span className={ETIQUETA}>Appointments · {b.cantidad}</span>
          <input type="range" min={1} max={5} value={b.cantidad} onChange={(e) => c({ cantidad: Number(e.target.value) })} className="accent-dash-blue" />
        </label>
      )
    case 'divisor':
      return <p className="m-0 text-[12.5px] text-ink-muted">Una línea fina para separar bloques. No tiene opciones.</p>
  }
}

function resumen(b: Bloque) {
  switch (b.tipo) {
    case 'encabezado': return b.titulo
    case 'texto': return b.texto
    case 'botones': return b.botones.map((x) => x.label).join(' · ')
    case 'pestanas': return b.tabs
    case 'campos': return b.campos.map((x) => x.label).join(' · ')
    case 'pills': return b.items.map((x) => x.label).join(' · ')
    case 'tabla': return b.columnas.map((x) => NOMBRE_COLUMNA[x]).join(' · ')
    case 'vacio': return b.titulo
    case 'opciones': return b.items.map((x) => x.label).join(' · ')
    case 'turnos': return \`\${b.cantidad} appointments\`
    case 'divisor': return ''
  }
}

const copiarNuevo = (b: Bloque): Bloque => {
  const c = JSON.parse(JSON.stringify(b)) as Bloque
  c.id = nuevoId()
  if (c.tipo === 'campos') c.campos = c.campos.map((f) => ({ ...f, id: nuevoId() }))
  return c
}

/* ── La página ──────────────────────────────────────────────────────── */

export function Constructor() {
  const [d, setD] = useState<Diseno>(() => cargar() ?? PLANTILLAS[0]!.crear())
  const [abierto, setAbierto] = useState(true)
  const [pestana, setPestana] = useState<'Build' | 'Code'>('Build')
  const [editando, setEditando] = useState<string | null>(null)
  const [agregando, setAgregando] = useState(false)
  const [copiado, setCopiado] = useState(false)
  const codigo = useMemo(() => generarCodigo(d), [d])

  useEffect(() => {
    try {
      window.localStorage.setItem(GUARDADO, JSON.stringify(d))
    } catch {
      /* Sin almacenamiento (ventana privada): se arma igual, sólo no se guarda. */
    }
  }, [d])

  /* Viniendo de la página de un componente ("Build with Buttons"), se suma
     ese bloque y se abre para editarlo. */
  useEffect(() => {
    let tipo: string | null = null
    try {
      tipo = window.sessionStorage.getItem(AGREGAR)
      window.sessionStorage.removeItem(AGREGAR)
    } catch {
      tipo = null
    }
    const info = TIPOS.find((t) => t.tipo === tipo)
    if (!info) return
    const b = info.nuevo()
    setD((x) => ({ ...x, bloques: [...x.bloques, b] }))
    setEditando(b.id)
  }, [])

  const cambiar = (id: string, cambio: Partial<Bloque>) => setD((x) => ({ ...x, bloques: x.bloques.map((b) => (b.id === id ? ({ ...b, ...cambio } as Bloque) : b)) }))
  const mover = (i: number, paso: -1 | 1) =>
    setD((x) => {
      const bloques = [...x.bloques]
      const j = i + paso
      if (j < 0 || j >= bloques.length) return x
      ;[bloques[i], bloques[j]] = [bloques[j]!, bloques[i]!]
      return { ...x, bloques }
    })
  const agregar = (t: TipoBloque) => {
    const b = infoDe(t).nuevo()
    setD((x) => ({ ...x, bloques: [...x.bloques, b] }))
    setEditando(b.id)
    setAgregando(false)
  }

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(codigo)
    } catch {
      const t = document.createElement('textarea')
      t.value = codigo
      document.body.appendChild(t)
      t.select()
      document.execCommand('copy')
      t.remove()
    }
    setCopiado(true)
    window.setTimeout(() => setCopiado(false), 1600)
  }

  const ancho = ANCHOS[d.ancho]
  const anchoPanel = pestana === 'Code' ? 'lg:w-[560px]' : 'lg:w-[400px]'

  return (
    <Sitio actual="builder--docs" lateral={false}>
      <div className="relative min-h-[calc(100vh-4rem)] bg-page-background [background-image:radial-gradient(color-mix(in_srgb,var(--color-ink)_10%,transparent)_1px,transparent_1px)] [background-size:18px_18px]">
        <div className={cn('flex flex-col gap-8 px-5 pt-8 pb-[60vh] sm:px-8 lg:pb-24', abierto && (pestana === 'Code' ? 'lg:pr-[600px]' : 'lg:pr-[440px]'))}>
          <header className="flex flex-col gap-3">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[14px]">
              <Enlace id="welcome--docs" className="text-dash-blue no-underline hover:underline">Home</Enlace>
              <span className="text-ink-muted">/</span>
              <span className="text-ink">Builder</span>
            </nav>
            <h1 className="m-0 text-[36px] leading-tight font-bold tracking-[-0.02em] text-ink">Builder</h1>
            <p className="m-0 max-w-[62ch] text-[16px] leading-relaxed text-ink-muted">
              Armá un componente con las piezas reales de la app y llevate su código. Elegí un punto de partida, sumá bloques y cambiá lo que quieras desde el panel.
            </p>
          </header>

          <div className="mx-auto w-full" style={{ maxWidth: ancho ?? undefined }}>
            <p className="m-0 mb-2 flex items-center justify-between text-[12px] text-ink-muted">
              <span>Preview · {d.contenedor === 'card' ? 'Card' : d.contenedor === 'panel' ? 'Panel' : 'Page'}</span>
              <span className="tabular-nums">{ancho ? \`\${ancho}px\` : 'Full width'}</span>
            </p>
            <div className={cn(d.contenedor === 'page' && 'overflow-hidden rounded-xl border border-line bg-page-background')}>
              {d.bloques.length ? (
                <MemoryRouter>
                  <VerDiseno d={d} />
                </MemoryRouter>
              ) : (
                <button
                  type="button"
                  onClick={() => { setAbierto(true); setPestana('Build'); setAgregando(true) }}
                  className="flex h-56 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line bg-white/70 text-[14px] text-ink-muted hover:border-dash-blue hover:text-dash-blue"
                >
                  <Plus className="size-5" /> Agregá el primer bloque
                </button>
              )}
            </div>
          </div>
        </div>

        {!abierto && (
          <button
            type="button"
            onClick={() => setAbierto(true)}
            className="fixed right-5 bottom-5 z-30 inline-flex h-11 items-center gap-2 rounded-full bg-dash-blue px-5 text-[14px] font-semibold text-white shadow-[0_12px_32px_-8px_rgb(29_86_188/0.6)] hover:bg-dash-blue-hover"
          >
            <Blocks className="size-4" /> Open builder
          </button>
        )}

        {abierto && (
          <aside
            aria-label="Builder"
            className={cn(
              'fixed inset-x-3 bottom-3 z-30 flex max-h-[62vh] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_64px_-20px_rgb(9_9_11/0.4)]',
              'lg:inset-x-auto lg:top-[84px] lg:right-5 lg:bottom-5 lg:max-h-none',
              anchoPanel,
            )}
          >
            <div className="flex items-center gap-2.5 border-b border-line-row px-4 py-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-dash-blue text-white"><Blocks className="size-4" /></span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-[14px] font-semibold text-ink">Builder</span>
                <span className="truncate text-[12px] text-ink-muted">{nombreComponente(d.nombre)} · {d.bloques.length} {d.bloques.length === 1 ? 'block' : 'blocks'}</span>
              </span>
              <button type="button" onClick={copiar} className="inline-flex h-8 items-center gap-1.5 rounded-md bg-dash-blue px-3 text-[13px] font-medium text-white hover:bg-dash-blue-hover">
                {copiado ? <Check className="size-4" /> : <Copy className="size-4" />} {copiado ? 'Copied' : 'Copy code'}
              </button>
              <button type="button" onClick={() => setAbierto(false)} aria-label="Hide builder" className="flex size-8 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted hover:text-ink">
                <PanelRightClose className="size-4" />
              </button>
            </div>

            <nav aria-label="Builder sections" className="flex gap-5 border-b border-line px-4">
              {(['Build', 'Code'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-current={p === pestana ? 'page' : undefined}
                  onClick={() => setPestana(p)}
                  className={cn('-mb-px inline-flex items-center gap-1.5 border-b-2 py-2.5 text-[14px]', p === pestana ? 'border-dash-blue font-semibold text-ink' : 'border-transparent text-ink-muted hover:text-ink')}
                >
                  {p === 'Build' ? <Blocks className="size-3.5" /> : <Code2 className="size-3.5" />} {p}
                </button>
              ))}
            </nav>

            <div className="min-h-0 flex-1 overflow-y-auto">
              {pestana === 'Build' ? (
                <div className="flex flex-col gap-6 p-4">
                  <section className="flex flex-col gap-2">
                    <span className={ETIQUETA}>Start from</span>
                    <div className="flex flex-wrap gap-1.5">
                      {PLANTILLAS.map((p) => (
                        <button
                          key={p.nombre}
                          type="button"
                          title={p.que}
                          onClick={() => { setD(p.crear()); setEditando(null); setAgregando(false) }}
                          className="inline-flex h-7 items-center rounded-full border border-line px-2.5 text-[12.5px] font-medium text-ink hover:border-dash-blue hover:text-dash-blue"
                        >
                          {p.nombre}
                        </button>
                      ))}
                    </div>
                  </section>

                  <section className="flex flex-col gap-3">
                    <Segmentos label="Container" value={d.contenedor} opciones={[{ value: 'card', label: 'Card' }, { value: 'panel', label: 'Panel' }, { value: 'page', label: 'Page' }]} onChange={(v) => setD((x) => ({ ...x, contenedor: v, tituloPanel: v === 'panel' && !x.tituloPanel ? 'Panel title' : x.tituloPanel }))} />
                    {d.contenedor === 'panel' && <Texto label="Panel title" value={d.tituloPanel} onChange={(v) => setD((x) => ({ ...x, tituloPanel: v }))} />}
                    <Segmentos label="Width" value={d.ancho} opciones={[{ value: 'angosto', label: 'Narrow' }, { value: 'medio', label: 'Medium' }, { value: 'completo', label: 'Full' }]} onChange={(v) => setD((x) => ({ ...x, ancho: v }))} />
                  </section>

                  <section className="flex flex-col gap-2">
                    <span className={ETIQUETA}>Blocks</span>
                    {d.bloques.length === 0 && <p className="m-0 text-[13px] text-ink-muted">Todavía no hay bloques. Sumá el primero.</p>}
                    <ol className="m-0 flex list-none flex-col gap-2 p-0">
                      {d.bloques.map((b, i) => {
                        const info = infoDe(b.tipo)
                        const abiertoB = editando === b.id
                        return (
                          <li key={b.id} className={cn('rounded-xl border bg-white', abiertoB ? 'border-dash-blue/50 shadow-[0_0_0_3px_rgb(29_86_188/0.08)]' : 'border-line')}>
                            <div className="flex items-center gap-1 py-1.5 pr-1.5 pl-2.5">
                              <button type="button" onClick={() => setEditando(abiertoB ? null : b.id)} aria-expanded={abiertoB} className="flex min-w-0 flex-1 items-center gap-2.5 text-left">
                                <span className={cn('flex size-7 shrink-0 items-center justify-center rounded-md', abiertoB ? 'bg-dash-blue text-white' : 'bg-surface-slate text-ink-slate')}>
                                  <info.icono className="size-3.5" />
                                </span>
                                <span className="flex min-w-0 flex-col">
                                  <span className="text-[13px] font-semibold text-ink">{info.nombre}</span>
                                  {resumen(b) && <span className="truncate text-[12px] text-ink-muted">{resumen(b)}</span>}
                                </span>
                              </button>
                              <button type="button" onClick={() => mover(i, -1)} disabled={i === 0} aria-label={\`Move \${info.nombre} up\`} className="flex size-7 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted disabled:opacity-30"><ArrowUp className="size-3.5" /></button>
                              <button type="button" onClick={() => mover(i, 1)} disabled={i === d.bloques.length - 1} aria-label={\`Move \${info.nombre} down\`} className="flex size-7 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted disabled:opacity-30"><ArrowDown className="size-3.5" /></button>
                              <button type="button" onClick={() => setD((x) => ({ ...x, bloques: [...x.bloques.slice(0, i + 1), copiarNuevo(b), ...x.bloques.slice(i + 1)] }))} aria-label={\`Duplicate \${info.nombre}\`} className="flex size-7 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted"><CopyPlus className="size-3.5" /></button>
                              <button type="button" onClick={() => setD((x) => ({ ...x, bloques: x.bloques.filter((y) => y.id !== b.id) }))} aria-label={\`Delete \${info.nombre}\`} className="flex size-7 items-center justify-center rounded-md text-ink-muted hover:bg-dash-bad-bg hover:text-dash-bad-fg"><Trash2 className="size-3.5" /></button>
                            </div>
                            {abiertoB && (
                              <div className="flex flex-col gap-3 border-t border-line-row px-3 pt-3 pb-3.5">
                                <Editor b={b} cambiar={(x) => cambiar(b.id, x)} />
                              </div>
                            )}
                          </li>
                        )
                      })}
                    </ol>
                    {agregando ? (
                      <div className="flex flex-col gap-2 rounded-xl border border-dashed border-dash-blue/40 bg-info-bg/50 p-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[12.5px] font-semibold text-ink">Add a block</span>
                          <button type="button" onClick={() => setAgregando(false)} aria-label="Close" className="flex size-6 items-center justify-center rounded-md text-ink-muted hover:bg-white"><X className="size-3.5" /></button>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          {TIPOS.map((t) => (
                            <button key={t.tipo} type="button" onClick={() => agregar(t.tipo)} className="flex items-start gap-2 rounded-lg border border-line bg-white p-2 text-left hover:border-dash-blue">
                              <t.icono className="mt-0.5 size-4 shrink-0 text-dash-blue" />
                              <span className="flex min-w-0 flex-col">
                                <span className="text-[12.5px] font-semibold text-ink">{t.nombre}</span>
                                <span className="text-[11.5px] leading-snug text-ink-muted">{t.que}</span>
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <button type="button" onClick={() => setAgregando(true)} className="flex h-10 items-center justify-center gap-1.5 rounded-xl border border-dashed border-line text-[13px] font-medium text-dash-blue hover:border-dash-blue hover:bg-info-bg/50">
                        <Plus className="size-4" /> Add block
                      </button>
                    )}
                  </section>
                </div>
              ) : (
                <div className="flex flex-col gap-3 p-4">
                  <Texto label="Component name" value={d.nombre} onChange={(v) => setD((x) => ({ ...x, nombre: v }))} />
                  <p className="m-0 text-[12.5px] leading-relaxed text-ink-muted">
                    Usa los componentes reales de la app, con sus imports. Pegalo en un archivo de <code className="rounded bg-surface-muted px-1 text-[12px]">src/components</code> y listo.
                  </p>
                  <pre className="m-0 overflow-x-auto rounded-xl border border-line bg-surface-subtle p-3.5 font-mono text-[12px] leading-[1.6] text-ink"><Resaltar codigo={codigo} /></pre>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </Sitio>
  )
}

/* Colores de sintaxis simples: palabras clave, textos, componentes y
   comentarios. Alcanza para leerlo de un vistazo. */
function Resaltar({ codigo }: { codigo: string }) {
  const partes: ReactNode[] = []
  const re = /(\\/\\/.*$|'(?:[^'\\\\]|\\\\.)*'|"(?:[^"\\\\]|\\\\.)*"|\\b(?:import|from|export|function|return|const|useState)\\b|<\\/?[A-Z][A-Za-z]*|\\b[A-Z][A-Za-z]+(?=\\s*[({=]))/gm
  let desde = 0
  for (const m of codigo.matchAll(re)) {
    if (m.index! > desde) partes.push(codigo.slice(desde, m.index))
    const t = m[0]
    const clase = t.startsWith('//') ? 'text-ink-faint' : /^['"]/.test(t) ? 'text-green-deep' : /^<\\/?[A-Z]/.test(t) ? 'text-dash-blue' : /^[A-Z]/.test(t) ? 'text-purple-fg' : 'text-dash-bad-fg'
    partes.push(<span key={m.index} className={clase}>{t}</span>)
    desde = m.index! + t.length
  }
  partes.push(codigo.slice(desde))
  return <code>{partes}</code>
}
`})))()}export{n,i as r,r as t};