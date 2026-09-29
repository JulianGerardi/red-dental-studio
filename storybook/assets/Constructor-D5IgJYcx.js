import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from 'react'
import { MemoryRouter } from 'react-router-dom'
import {
  ArrowDown, ArrowUp, Blocks, Check, ChevronDown, Code2, Component, Copy, CopyPlus, Download, Layers, Link2, PanelRightClose, Pencil, Plus, Search, Sparkles, Trash2, X,
} from 'lucide-react'
import { Tabs } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import type { PillTone } from '@/components/ui/pill'
import { cn } from '@/lib/utils'
import { Enlace } from '../navegar'
import { Sitio } from '../Sitio'
import { cargarIndice, type Entrada } from '../Mapa'
import { armarIndice, type Pagina } from '../buscar'
import {
  AGREGAR, ANCHOS, ICONOS, MARCAS, PLANTILLAS, PROPORCIONES, columna, columnasDe, nuevoId, migrarDiseno, TIPOS, VerDiseno, VistaPrevia, campo, contiene, generarCodigo, iconoDe,
  nombreComponente, nombreDe, pestana as nuevaPestana, reIdentificar,
  type Bloque, type BloqueDe, type Campo, type Diseno, type Marca, type IconoReal, type NombreIcono, type Proporcion,
} from './bloques'
import { Lienzo, buscarBloque, entra, insertar, ubicar, useLienzo } from './lienzo'
import { Describir, useDescribir } from './PanelDescribir'
import { armarPaleta, filtrar, type Item, type Seccion } from './paleta'
import { DATOS, conjunto, type CampoDato, type IdConjunto } from './datos'
import { codificar, decodificar, descargarPng, linkDe, soltarCompartido, tomarCompartido } from './compartir'

/* El constructor: cualquiera arma un componente con las piezas reales de la app y se lleva su código. Se arma arrastrando:
   de la paleta (Components) al lienzo, y dentro del lienzo para reordenar. Layers edita lo elegido; Code da el código.
   Lo que se arma queda guardado en este navegador. Ver design-reference/design-system.md › Builder. */

const GUARDADO = 'confidentally-ui-builder'
/* Una pantalla de la app vacía (menú lateral y barra reales), para armarla desde cero. */
const pantallaVacia = (): Diseno => ({ nombre: 'New screen', contenedor: 'app', tituloPanel: '', ancho: 'completo', bloques: [] })
const lista = (s: string) => s.split(',').map((x) => x.trim()).filter(Boolean)

function cargar(): Diseno | null {
  try {
    const t = window.localStorage.getItem(GUARDADO)
    return t ? migrarDiseno(JSON.parse(t) as Diseno) : null
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
  { value: 'text', label: 'Text' }, { value: 'select', label: 'Select' }, { value: 'date', label: 'Date (typed)' }, { value: 'calendar', label: 'Calendar' },
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
      {c.clase !== 'date' && c.clase !== 'calendar' && <Texto label="Placeholder" value={c.placeholder} onChange={(v) => cambiar({ placeholder: v })} />}
      {(c.clase === 'select' || c.clase === 'search') && <Texto label="Options (comma separated)" value={c.opciones} onChange={(v) => cambiar({ opciones: v })} />}
      {c.clase !== 'calendar' && (
        <div className="grid grid-cols-2 gap-2">
          <Texto label="Hint" value={c.hint} onChange={(v) => cambiar({ hint: v })} />
          <Texto label="Error" value={c.error} onChange={(v) => cambiar({ error: v })} placeholder="None" />
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <Llave label="Required" value={c.required} onChange={(v) => cambiar({ required: v })} />
        {c.clase !== 'calendar' && <Llave label="Disabled" value={c.disabled} onChange={(v) => cambiar({ disabled: v })} />}
      </div>
    </div>
  )
}

type Sistema = { entradas: Entrada[]; indice: Pagina[] }
type Ctx = { editando: string | null; setEditando: (id: string | null) => void; sistema: Sistema | null; agregarEn: (lista: string, nombre: string) => void }

const OPC_ICONO_REAL = OPC_ICONO.filter((o) => o.value !== 'none') as { value: IconoReal; label: string }[]

function Editor({ b, cambiar, ctx }: { b: Bloque; cambiar: (x: Partial<Bloque>) => void; ctx: Ctx }) {
  const c = cambiar as (x: object) => void
  switch (b.tipo) {
    case 'modal':
      return (
        <>
          <Texto label="Modal title" value={b.titulo} onChange={(v) => c({ titulo: v })} />
          <div className="grid grid-cols-2 gap-2">
            <Texto label="Button that opens it" value={b.disparador} onChange={(v) => c({ disparador: v })} />
            <Elegir label="Width" value={b.ancho} opciones={[{ value: 'sm', label: 'Small · 480' }, { value: 'md', label: 'Medium · 640' }, { value: 'lg', label: 'Large · 860' }]} onChange={(v) => c({ ancho: v })} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Texto label="Cancel" value={b.cancelar} onChange={(v) => c({ cancelar: v })} />
            <Texto label="Confirm" value={b.confirmar} onChange={(v) => c({ confirmar: v })} />
          </div>
          <Llave label="Destructive (red confirm)" value={b.peligro} onChange={(v) => c({ peligro: v })} />
          <Adentro titulo="Inside the modal" nota="Mientras lo editás, el modal queda abierto en el lienzo.">
            <ListaBloques lista={b.id} bloques={b.bloques} onChange={(x) => c({ bloques: x })} ctx={ctx} padre={b.titulo} />
          </Adentro>
        </>
      )
    case 'seccion':
      return (
        <>
          <Texto label="Section title" value={b.titulo} onChange={(v) => c({ titulo: v })} />
          <Adentro titulo="Inside the section">
            <ListaBloques lista={b.id} bloques={b.bloques} onChange={(x) => c({ bloques: x })} ctx={ctx} padre={b.titulo} />
          </Adentro>
        </>
      )
    case 'pestanasContenido': {
      const poner = (id: string, x: object) => c({ pestanas: b.pestanas.map((p) => (p.id === id ? { ...p, ...x } : p)) })
      return (
        <>
          <div className="grid grid-cols-2 gap-2">
            <Segmentos label="Size" value={b.size} opciones={[{ value: 'md', label: 'md' }, { value: 'sm', label: 'sm' }]} onChange={(v) => c({ size: v })} />
            <div className="flex items-end pb-1.5"><Llave label="Full width" value={b.fullWidth} onChange={(v) => c({ fullWidth: v })} /></div>
          </div>
          {b.pestanas.map((p, i) => (
            <div key={p.id} className="flex flex-col gap-2.5 rounded-lg border border-line-row bg-surface-subtle p-2.5">
              <div className="flex items-end gap-2">
                <div className="min-w-0 flex-1"><Texto label={\`Tab \${i + 1}\`} value={p.label} onChange={(v) => poner(p.id, { label: v })} /></div>
                <Quitar onClick={() => c({ pestanas: b.pestanas.filter((x) => x.id !== p.id) })} label={\`Remove \${p.label}\`} />
              </div>
              <ListaBloques lista={\`\${b.id}:\${p.id}\`} bloques={p.bloques} onChange={(x) => poner(p.id, { bloques: x })} ctx={ctx} padre={p.label} />
            </div>
          ))}
          {b.pestanas.length < 6 && <Sumar onClick={() => c({ pestanas: [...b.pestanas, nuevaPestana(\`Tab \${b.pestanas.length + 1}\`)] })}>Add tab</Sumar>}
        </>
      )
    }
    case 'stats':
      return (
        <>
          {b.items.map((x, i) => {
            const poner = (y: object) => c({ items: b.items.map((z, k) => (k === i ? { ...z, ...y } : z)) })
            return (
              <div key={i} className="flex flex-col gap-2 rounded-lg border border-line-row bg-surface-subtle p-2.5">
                <div className="flex items-end gap-2">
                  <div className="min-w-0 flex-1"><Texto label={\`Card \${i + 1}\`} value={x.titulo} onChange={(v) => poner({ titulo: v })} /></div>
                  <Quitar onClick={() => c({ items: b.items.filter((_, k) => k !== i) })} label={\`Remove \${x.titulo}\`} />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Texto label="Value" value={x.valor} onChange={(v) => poner({ valor: v })} />
                  <Texto label="Change" value={x.delta} onChange={(v) => poner({ delta: v })} />
                  <Elegir label="Icon" value={x.icono} opciones={OPC_ICONO_REAL} onChange={(v) => poner({ icono: v })} />
                </div>
              </div>
            )
          })}
          {b.items.length < 4 && <Sumar onClick={() => c({ items: [...b.items, { titulo: 'New metric', valor: '0', delta: 'No change', icono: 'FileText' }] })}>Add card</Sumar>}
        </>
      )
    case 'detalles':
      return (
        <>
          <Texto label="Title" value={b.titulo} onChange={(v) => c({ titulo: v })} />
          {b.items.map((x, i) => {
            const poner = (y: object) => c({ items: b.items.map((z, k) => (k === i ? { ...z, ...y } : z)) })
            return (
              <div key={i} className="flex items-end gap-2">
                <div className="w-[96px] shrink-0"><Elegir label="Icon" value={x.icono} opciones={OPC_ICONO_REAL} onChange={(v) => poner({ icono: v })} /></div>
                <div className="min-w-0 flex-1"><Texto label="Label" value={x.label} onChange={(v) => poner({ label: v })} /></div>
                <div className="min-w-0 flex-1"><Texto label="Value" value={x.valor} onChange={(v) => poner({ valor: v })} /></div>
                <Quitar onClick={() => c({ items: b.items.filter((_, k) => k !== i) })} label={\`Remove \${x.label}\`} />
              </div>
            )
          })}
          <Sumar onClick={() => c({ items: [...b.items, { icono: 'FileText', label: 'Label', valor: 'Value' }] })}>Add row</Sumar>
        </>
      )
    case 'pago':
      return (
        <>
          <Texto label="Title" value={b.titulo} onChange={(v) => c({ titulo: v })} />
          <Texto label="Payment methods (comma separated)" value={b.metodos} onChange={(v) => c({ metodos: v })} />
          <p className="m-0 -mt-1 text-[11.5px] leading-snug text-ink-muted">Check payment pide número y banco; Card payment, los últimos 4 números; Electronic payment, una referencia.</p>
          <Texto label="Apply to (comma separated, empty hides it)" value={b.aplicarA} onChange={(v) => c({ aplicarA: v })} />
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            <Llave label="Transaction date" value={b.fecha} onChange={(v) => c({ fecha: v })} />
            <Llave label="Several methods" value={b.varios} onChange={(v) => c({ varios: v })} />
            <Llave label="Notes" value={b.notas} onChange={(v) => c({ notas: v })} />
            <Llave label="Total" value={b.total} onChange={(v) => c({ total: v })} />
          </div>
        </>
      )
    case 'calendario':
      return (
        <>
          <Segmentos label="Starts on" value={b.vista} opciones={[{ value: 'Day', label: 'Day' }, { value: 'Week', label: 'Week' }, { value: 'Month', label: 'Month' }]} onChange={(v) => c({ vista: v })} />
          <div className="grid grid-cols-2 gap-x-4">
            <Llave label="Day / Week / Month" value={b.selector} onChange={(v) => c({ selector: v })} />
            <Llave label="Status legend" value={b.leyenda} onChange={(v) => c({ leyenda: v })} />
          </div>
          <p className="m-0 text-[11.5px] leading-snug text-ink-muted">Usa los turnos de ejemplo de Scheduling. En el lienzo se pueden arrastrar.</p>
        </>
      )
    case 'horarios':
      return (
        <>
          <div className="grid grid-cols-2 gap-2">
            <Texto label="Provider" value={b.provider} onChange={(v) => c({ provider: v })} />
            <Texto label="Specialty" value={b.especialidad} onChange={(v) => c({ especialidad: v })} />
          </div>
          <Texto label="Date" value={b.fecha} onChange={(v) => c({ fecha: v })} />
        </>
      )
    case 'tareas':
      return (
        <label className="flex flex-col gap-1">
          <span className={ETIQUETA}>Tasks · {b.cantidad}</span>
          <input type="range" min={1} max={4} value={b.cantidad} onChange={(e) => c({ cantidad: Number(e.target.value) })} className="accent-dash-blue" />
        </label>
      )
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
    case 'tabla': {
      const cj = conjunto(b.datos)
      const campos = cj.campos as Record<string, CampoDato>
      const opcionesCampo = Object.entries(campos).map(([k, f]) => ({ value: k, label: f.header }))
      const poner = (id: string, x: object) => c({ columnas: b.columnas.map((col) => (col.id === id ? { ...col, ...x } : col)) })
      const mover = (i: number, paso: -1 | 1) => {
        const j = i + paso
        if (j < 0 || j >= b.columnas.length) return
        const n = [...b.columnas]
        ;[n[i], n[j]] = [n[j]!, n[i]!]
        c({ columnas: n })
      }
      const libre = Object.keys(campos).find((k) => !b.columnas.some((col) => col.campo === k)) ?? Object.keys(campos)[0]!
      return (
        <>
          <Elegir label="Data" value={b.datos} opciones={(Object.keys(DATOS) as IdConjunto[]).map((k) => ({ value: k, label: DATOS[k].nombre }))} onChange={(v) => c({ datos: v, columnas: conjunto(v).inicial.map((x) => columna(v, x)) })} />
          <div className="flex flex-col gap-1.5">
            <span className={ETIQUETA}>Columns · {b.columnas.length}</span>
            {b.columnas.map((col, i) => (
              <div key={col.id} className="flex items-end gap-1.5 rounded-lg border border-line-row bg-surface-subtle p-2">
                <div className="w-[112px] shrink-0"><Elegir label="Field" value={col.campo} opciones={opcionesCampo} onChange={(v) => poner(col.id, { campo: v, header: campos[v]?.header ?? v, ancho: campos[v]?.ancho ?? null })} /></div>
                <div className="min-w-0 flex-1"><Texto label="Header" value={col.header} onChange={(v) => poner(col.id, { header: v })} /></div>
                <div className="w-[70px] shrink-0"><Elegir label="Width" value={String(col.ancho ?? 'auto')} opciones={['auto', '80', '100', '120', '150', '180', '220', '260']} onChange={(v) => poner(col.id, { ancho: v === 'auto' ? null : Number(v) })} /></div>
                <span className="flex h-8 items-center">
                  <button type="button" onClick={() => mover(i, -1)} disabled={i === 0} aria-label={\`Move \${col.header} left\`} className="flex size-6 items-center justify-center rounded text-ink-muted hover:bg-white disabled:opacity-30"><ArrowUp className="size-3" /></button>
                  <button type="button" onClick={() => mover(i, 1)} disabled={i === b.columnas.length - 1} aria-label={\`Move \${col.header} right\`} className="flex size-6 items-center justify-center rounded text-ink-muted hover:bg-white disabled:opacity-30"><ArrowDown className="size-3" /></button>
                </span>
                <Quitar onClick={() => c({ columnas: b.columnas.filter((x) => x.id !== col.id) })} label={\`Remove \${col.header}\`} />
              </div>
            ))}
            <Sumar onClick={() => c({ columnas: [...b.columnas, columna(b.datos, libre)] })}>Add column</Sumar>
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
    }
    case 'odontograma':
      return (
        <>
          <Llave label="Start with sample findings" value={b.ejemplo} onChange={(v) => c({ ejemplo: v })} />
          <Segmentos label="A surface click marks" value={b.marca} opciones={(Object.keys(MARCAS) as Marca[]).map((m) => ({ value: m, label: m }))} onChange={(v) => c({ marca: v })} />
          <p className="m-0 text-[11.5px] leading-snug text-ink-muted">En el lienzo: el número de la pieza la selecciona; una superficie se marca o se desmarca.</p>
        </>
      )
    case 'receta':
      return (
        <>
          <Texto label="Title" value={b.titulo} onChange={(v) => c({ titulo: v })} />
          <Texto label="Medications (comma separated)" value={b.medicamentos} onChange={(v) => c({ medicamentos: v })} />
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            <Llave label="Refills" value={b.repeticiones} onChange={(v) => c({ repeticiones: v })} />
            <Llave label="Generic substitution" value={b.sustitucion} onChange={(v) => c({ sustitucion: v })} />
            <Llave label="Instructions" value={b.indicaciones} onChange={(v) => c({ indicaciones: v })} />
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
    case 'migas':
      return <Texto label="Items (comma separated, the last one is this screen)" value={b.items} onChange={(v) => c({ items: v })} />
    case 'pasos':
      return (
        <>
          <div className="grid grid-cols-2 gap-2">
            <Elegir label="Steps" value={String(b.total)} opciones={['2', '3', '4', '5', '6']} onChange={(v) => c({ total: Number(v), actual: Math.min(b.actual, Number(v)) })} />
            <Elegir label="Current" value={String(b.actual)} opciones={Array.from({ length: b.total }, (_, i) => String(i + 1))} onChange={(v) => c({ actual: Number(v) })} />
          </div>
          <Texto label="Step names (comma separated)" value={b.etiquetas} onChange={(v) => c({ etiquetas: v })} />
        </>
      )
    case 'paginacion':
      return <Elegir label="Pages" value={String(b.paginas)} opciones={['2', '3', '5', '10', '20']} onChange={(v) => c({ paginas: Number(v) })} />
    case 'busqueda':
      return (
        <>
          <Texto label="Placeholder" value={b.placeholder} onChange={(v) => c({ placeholder: v })} />
          <div className="grid grid-cols-2 gap-2">
            <Texto label="Filter" value={b.filtro} onChange={(v) => c({ filtro: v })} placeholder="None" />
            <Texto label="Main action" value={b.accion} onChange={(v) => c({ accion: v })} placeholder="None" />
          </div>
          {b.filtro && <Texto label="Filter options (comma separated)" value={b.opcionesFiltro} onChange={(v) => c({ opcionesFiltro: v })} />}
        </>
      )
    case 'aviso':
      return (
        <>
          <Segmentos label="Tone" value={b.tono} opciones={[{ value: 'info', label: 'Info' }, { value: 'success', label: 'Success' }, { value: 'warning', label: 'Warning' }, { value: 'danger', label: 'Error' }]} onChange={(v) => c({ tono: v })} />
          <Texto label="Title" value={b.titulo} onChange={(v) => c({ titulo: v })} />
          <Texto label="Text" value={b.texto} onChange={(v) => c({ texto: v })} largo />
        </>
      )
    case 'persona':
      return (
        <>
          <Texto label="Name" value={b.nombre} onChange={(v) => c({ nombre: v })} />
          <Texto label="Detail" value={b.detalle} onChange={(v) => c({ detalle: v })} placeholder="None" />
          <div className="grid grid-cols-2 gap-2">
            <Elegir label="Status" value={b.estado || 'none'} opciones={[{ value: 'none', label: 'None' }, { value: 'Active', label: 'Active' }, { value: 'Inactive', label: 'Inactive' }]} onChange={(v) => c({ estado: v === 'none' ? '' : v })} />
            <div className="flex items-end pb-1.5"><Llave label="Large" value={b.grande} onChange={(v) => c({ grande: v })} /></div>
          </div>
        </>
      )
    case 'metricas':
      return (
        <>
          <Llave label="Stacked (2 × 2, like the Ledger)" value={b.apilada} onChange={(v) => c({ apilada: v })} />
          {b.items.map((x, i) => {
            const poner = (y: object) => c({ items: b.items.map((z, k) => (k === i ? { ...z, ...y } : z)) })
            return (
              <div key={i} className="flex flex-col gap-2 rounded-lg border border-line-row bg-surface-subtle p-2.5">
                <div className="flex items-end gap-2">
                  <div className="min-w-0 flex-1"><Texto label={\`Stat \${i + 1}\`} value={x.titulo} onChange={(v) => poner({ titulo: v })} /></div>
                  <Quitar onClick={() => c({ items: b.items.filter((_, k) => k !== i) })} label={\`Remove \${x.titulo}\`} />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Texto label="Value" value={x.valor} onChange={(v) => poner({ valor: v })} />
                  <Texto label="Note" value={x.nota} onChange={(v) => poner({ nota: v })} />
                  <Elegir label="Icon" value={x.icono} opciones={OPC_ICONO_REAL} onChange={(v) => poner({ icono: v })} />
                </div>
              </div>
            )
          })}
          {b.items.length < 4 && <Sumar onClick={() => c({ items: [...b.items, { titulo: 'New stat', valor: '0', nota: 'No change', icono: 'FileText' }] })}>Add stat</Sumar>}
        </>
      )
    case 'operatorios':
      return (
        <label className="flex flex-col gap-1">
          <span className={ETIQUETA}>Operatories · {b.cantidad}</span>
          <input type="range" min={1} max={4} value={b.cantidad} onChange={(e) => c({ cantidad: Number(e.target.value) })} className="accent-dash-blue" />
        </label>
      )
    case 'pacientes':
      return (
        <label className="flex flex-col gap-1">
          <span className={ETIQUETA}>Patients · {b.cantidad}</span>
          <input type="range" min={1} max={5} value={b.cantidad} onChange={(e) => c({ cantidad: Number(e.target.value) })} className="accent-dash-blue" />
        </label>
      )
    case 'subir':
      return (
        <>
          <Texto label="Title" value={b.titulo} onChange={(v) => c({ titulo: v })} />
          <Texto label="Detail" value={b.detalle} onChange={(v) => c({ detalle: v })} placeholder="None" />
          <Texto label="Button" value={b.accion} onChange={(v) => c({ accion: v })} placeholder="None" />
        </>
      )
    case 'columnas': {
      const cambiarProporcion = (v: Proporcion) => {
        const n = columnasDe(v)
        const cols = b.columnas.slice(0, n)
        /* Si se achica, lo de las columnas que sobran pasa a la última que queda. */
        if (b.columnas.length > n) cols[n - 1] = { ...cols[n - 1]!, bloques: [...cols[n - 1]!.bloques, ...b.columnas.slice(n).flatMap((x) => x.bloques)] }
        while (cols.length < n) cols.push({ id: nuevoId(), bloques: [] })
        c({ proporcion: v, columnas: cols })
      }
      return (
        <>
          <Elegir label="Columns" value={b.proporcion} opciones={(Object.keys(PROPORCIONES) as Proporcion[]).map((k) => ({ value: k, label: k.split('-').join(' : ') }))} onChange={cambiarProporcion} />
          {b.columnas.map((col, i) => (
            <Adentro key={col.id} titulo={\`Column \${i + 1}\`}>
              <ListaBloques lista={\`\${b.id}:\${col.id}\`} bloques={col.bloques} onChange={(x) => c({ columnas: b.columnas.map((y) => (y.id === col.id ? { ...y, bloques: x } : y)) })} ctx={ctx} padre={\`Column \${i + 1}\`} />
            </Adentro>
          ))}
        </>
      )
    }
    case 'pieza': {
      const pagina = ctx.sistema?.indice.find((p) => p.titulo === b.componente && (p.id === b.storyId || p.ejemplos.some((e) => e.id === b.storyId)))
      const ejemplos = pagina?.ejemplos.filter((e) => !/^(playground|specs|anatomy)$/i.test(e.nombre)) ?? []
      return (
        <>
          {!b.pantalla && ejemplos.length > 1 && (
            <Elegir label="Example" value={b.storyId} opciones={ejemplos.map((e) => ({ value: e.id, label: e.nombre }))} onChange={(v) => c({ storyId: v, ejemplo: ejemplos.find((e) => e.id === v)?.nombre ?? '' })} />
          )}
          <p className="m-0 text-[12px] leading-snug text-ink-muted">
            {b.pantalla
              ? 'La pantalla real de la app, escalada al ancho. En el código va como la ruta que ya existe.'
              : 'El componente real de la app, tal como está en Confidentally UI. En el código va su import; los props salen del ejemplo.'}
          </p>
          <Enlace id={pagina?.id ?? b.storyId} className="self-start text-[12.5px] font-medium text-dash-blue hover:underline">Open in Confidentally UI · {b.lugar}</Enlace>
        </>
      )
    }
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
    case 'tabla': return \`\${DATOS[b.datos].nombre} · \${b.columnas.length} columns\`
    case 'odontograma': return \`32 teeth · marks \${b.marca.toLowerCase()}\`
    case 'receta': return b.titulo
    case 'vacio': return b.titulo
    case 'opciones': return b.items.map((x) => x.label).join(' · ')
    case 'turnos': return \`\${b.cantidad} appointments\`
    case 'tareas': return \`\${b.cantidad} tasks\`
    case 'modal': return \`\${b.disparador} → \${b.titulo} · \${b.bloques.length} inside\`
    case 'seccion': return \`\${b.titulo} · \${b.bloques.length} inside\`
    case 'pestanasContenido': return b.pestanas.map((p) => p.label).join(' · ')
    case 'stats': return b.items.map((x) => x.titulo).join(' · ')
    case 'detalles': return b.titulo
    case 'pago': return lista(b.metodos).join(' · ')
    case 'calendario': return \`\${b.vista} view\${b.selector ? ' · Day / Week / Month' : ''}\`
    case 'horarios': return \`\${b.provider} · \${b.fecha}\`
    case 'divisor': return ''
    case 'pieza': return b.ejemplo || b.lugar
    case 'columnas': return \`\${b.columnas.length} columns · \${b.columnas.map((c) => c.bloques.length).join(' + ')} inside\`
    case 'migas': return lista(b.items).join(' › ')
    case 'pasos': return \`Step \${b.actual} of \${b.total}\`
    case 'paginacion': return \`\${b.paginas} pages\`
    case 'busqueda': return [b.placeholder, b.filtro, b.accion].filter(Boolean).join(' · ')
    case 'aviso': return b.titulo
    case 'persona': return b.nombre
    case 'metricas': return b.items.map((x) => x.titulo).join(' · ')
    case 'operatorios': return \`\${b.cantidad} operatories\`
    case 'pacientes': return \`\${b.cantidad} patients\`
    case 'subir': return b.titulo
  }
}

/* El recuadro de lo que va adentro de un bloque contenedor. */
function Adentro({ titulo, nota, children }: { titulo: string; nota?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 border-l-2 border-dash-blue/25 pl-3">
      <span className="flex flex-col">
        <span className={ETIQUETA}>{titulo}</span>
        {nota && <span className="text-[11.5px] text-ink-muted">{nota}</span>}
      </span>
      {children}
    </div>
  )
}

/* Una lista de bloques: la del diseño y la de adentro de cada contenedor (un modal, una sección, cada pestaña).
   Se ordenan, duplican, borran y editan igual en todos los niveles; lo nuevo se suma desde Components. */
function ListaBloques({ lista, bloques, onChange, ctx, padre }: {
  lista: string
  bloques: Bloque[]
  onChange: (b: Bloque[]) => void
  ctx: Ctx
  /** Nombre del contenedor, si es una lista de adentro. */
  padre?: string
}) {
  const poner = (id: string, cambio: Partial<Bloque>) => onChange(bloques.map((b) => (b.id === id ? ({ ...b, ...cambio } as Bloque) : b)))
  const mover = (i: number, paso: -1 | 1) => {
    const j = i + paso
    if (j < 0 || j >= bloques.length) return
    const n = [...bloques]
    ;[n[i], n[j]] = [n[j]!, n[i]!]
    onChange(n)
  }
  const chico = !!padre

  return (
    <div className="flex flex-col gap-2">
      {bloques.length === 0 && <p className="m-0 text-[12.5px] text-ink-muted">{padre ? 'Vacío: arrastrá un bloque adentro en el lienzo, o sumalo desde acá.' : 'Todavía no hay bloques. Arrastrá el primero desde Components.'}</p>}
      <ol className="m-0 flex list-none flex-col gap-2 p-0">
        {bloques.map((b, i) => {
          const Icono = iconoDe(b)
          const nombre = nombreDe(b)
          const este = ctx.editando === b.id
          const abiertoB = !!ctx.editando && contiene([b], ctx.editando)
          return (
            <li key={b.id} ref={este ? (el) => el?.scrollIntoView({ block: 'nearest' }) : undefined} className={cn('scroll-mt-3 rounded-xl border bg-white', este ? 'border-dash-blue/50 shadow-[0_0_0_3px_rgb(29_86_188/0.08)]' : 'border-line')}>
              <div className="flex items-center gap-1 py-1.5 pr-1.5 pl-2.5">
                <button type="button" onClick={() => ctx.setEditando(este ? null : b.id)} aria-expanded={abiertoB} className="flex min-w-0 flex-1 items-center gap-2.5 text-left">
                  <span className={cn('flex shrink-0 items-center justify-center rounded-md', chico ? 'size-6' : 'size-7', abiertoB ? 'bg-dash-blue text-white' : b.tipo === 'pieza' ? 'bg-purple-bg text-purple-fg' : 'bg-surface-slate text-ink-slate')}>
                    <Icono className="size-3.5" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-[13px] font-semibold text-ink">{nombre}</span>
                    {resumen(b) && <span className="truncate text-[12px] text-ink-muted">{resumen(b)}</span>}
                  </span>
                </button>
                <button type="button" onClick={() => mover(i, -1)} disabled={i === 0} aria-label={\`Move \${nombre} up\`} className="flex size-7 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted disabled:opacity-30"><ArrowUp className="size-3.5" /></button>
                <button type="button" onClick={() => mover(i, 1)} disabled={i === bloques.length - 1} aria-label={\`Move \${nombre} down\`} className="flex size-7 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted disabled:opacity-30"><ArrowDown className="size-3.5" /></button>
                <button type="button" onClick={() => onChange([...bloques.slice(0, i + 1), reIdentificar(b), ...bloques.slice(i + 1)])} aria-label={\`Duplicate \${nombre}\`} className="flex size-7 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted"><CopyPlus className="size-3.5" /></button>
                <button type="button" onClick={() => onChange(bloques.filter((y) => y.id !== b.id))} aria-label={\`Delete \${nombre}\`} className="flex size-7 items-center justify-center rounded-md text-ink-muted hover:bg-dash-bad-bg hover:text-dash-bad-fg"><Trash2 className="size-3.5" /></button>
              </div>
              {abiertoB && (
                <div className="flex flex-col gap-3 border-t border-line-row px-3 pt-3 pb-3.5">
                  <Editor b={b} cambiar={(x) => poner(b.id, x)} ctx={ctx} />
                </div>
              )}
            </li>
          )
        })}
      </ol>
      <button type="button" onClick={() => ctx.agregarEn(lista, padre ?? '')} className={cn('flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-line text-[13px] font-medium text-dash-blue hover:border-dash-blue hover:bg-info-bg/50', chico ? 'h-8' : 'h-10')}>
        <Plus className="size-4" /> {padre ? 'Add block inside' : 'Add block'}
      </button>
    </div>
  )
}

/* La paleta: todo lo que se puede soltar en el lienzo. Se arrastra, o con un clic se suma. */
function Paleta({ paleta, sistema, alArrastrar, alTerminar, sumar, dentro, salir, elegido, nuevaPantalla }: {
  paleta: Seccion[]
  sistema: Sistema | null
  alArrastrar: (it: Item) => void
  alTerminar: () => void
  sumar: (it: Item) => void
  dentro: string | null
  salir: () => void
  /** Lo elegido en el lienzo: el clic suma adentro (una sección, un modal) o debajo. */
  elegido: { nombre: string; adentro: boolean; editar: () => void; soltar: () => void } | null
  /** Empezar una pantalla en blanco, si lo armado no es una pantalla. */
  nuevaPantalla: (() => void) | null
}) {
  const [q, setQ] = useState('')
  const hallados = useMemo(() => (q.trim() ? filtrar(paleta, q) : null), [paleta, q])
  const arrastrable = (it: Item) => ({
    draggable: true,
    onDragStart: (ev: React.DragEvent) => {
      ev.dataTransfer.effectAllowed = 'copy'
      ev.dataTransfer.setData('text/plain', it.nombre)
      alArrastrar(it)
    },
    onDragEnd: alTerminar,
    onClick: () => sumar(it),
    title: \`\${it.nombre} · arrastralo al lienzo o hacé clic para sumarlo\`,
  })
  const fila = (it: Item, conLugar = false) => {
    const Icono = it.icono ?? Component
    return (
      <li key={it.clave}>
        <button type="button" {...arrastrable(it)} className="flex w-full cursor-grab items-center gap-2.5 rounded-lg px-2 py-1.5 text-left hover:bg-info-bg/60 active:cursor-grabbing">
          <span className={cn('flex size-7 shrink-0 items-center justify-center rounded-md', it.tipo === 'pieza' ? 'bg-purple-bg text-purple-fg' : 'bg-surface-slate text-ink-slate')}><Icono className="size-3.5" /></span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-[13px] font-medium text-ink">{it.nombre}</span>
            <span className="truncate text-[11.5px] text-ink-muted">{conLugar ? \`\${it.lugar} · \${it.detalle}\` : it.detalle}</span>
          </span>
        </button>
      </li>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <label className="relative block">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-ink-muted" />
        <input id="builder-buscar" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar: tabla, paciente, odontograma…" aria-label="Search components" className={cn(INPUT, 'h-9 pl-8')} />
      </label>
      {nuevaPantalla && (
        <div className="flex items-center justify-between gap-2 rounded-lg border border-dashed border-dash-blue/40 px-2.5 py-2 text-[12px] text-ink">
          <span>¿Armás una pantalla? Empezá una en blanco, con el menú y la barra de la app.</span>
          <button type="button" onClick={nuevaPantalla} className="inline-flex h-7 shrink-0 items-center rounded-md bg-dash-blue px-2.5 font-medium text-white hover:bg-dash-blue-hover">Blank screen</button>
        </div>
      )}
      {dentro !== null && (
        <div className="flex items-center justify-between gap-2 rounded-lg bg-info-bg px-2.5 py-1.5 text-[12px] text-ink">
          <span>Con un clic se suma adentro de <b>{dentro || 'la pestaña'}</b>.</span>
          <button type="button" onClick={salir} aria-label="Stop adding inside" className="flex size-5 items-center justify-center rounded text-ink-muted hover:bg-white"><X className="size-3" /></button>
        </div>
      )}
      {elegido && (
        <div className="flex items-center justify-between gap-2 rounded-lg border border-line-row bg-surface-subtle px-2.5 py-1.5 text-[12px] text-ink">
          <span className="min-w-0">Elegido: <b>{elegido.nombre}</b>. Con un clic se suma {elegido.adentro ? 'adentro' : 'debajo'}.</span>
          <span className="flex shrink-0 items-center gap-1">
            <button type="button" onClick={elegido.editar} className="inline-flex h-6 items-center gap-1 rounded px-1.5 font-medium text-dash-blue hover:bg-white"><Pencil className="size-3" /> Edit</button>
            <button type="button" onClick={elegido.soltar} aria-label="Deselect" className="flex size-6 items-center justify-center rounded text-ink-muted hover:bg-white"><X className="size-3" /></button>
          </span>
        </div>
      )}
      <p className="m-0 -mt-1 text-[12px] leading-snug text-ink-muted">Arrastrá al lienzo: entre bloques, o adentro de una sección, una pestaña o un modal abierto. Un clic en el lienzo elige; doble clic, o el lápiz, lo edita.</p>

      {hallados ? (
        hallados.length ? <ul className="m-0 flex list-none flex-col p-0">{hallados.map((it) => fila(it, true))}</ul> : <p className="m-0 text-[13px] text-ink-muted">Nada con “{q}”. Probá con otra palabra: turno, pago, tabla, modal…</p>
      ) : (
        paleta.map((sec, k) => (
          <section key={sec.titulo} className="flex flex-col gap-2">
            <div className="flex flex-col">
              <span className="text-[13px] font-semibold text-ink">{sec.titulo}</span>
              <span className="text-[11.5px] leading-snug text-ink-muted">{sec.que}</span>
            </div>
            {k === 0 ? (
              sec.grupos.map((g) => (
                <div key={g.nombre} className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-semibold tracking-[0.06em] text-ink-muted uppercase">{g.nombre}</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {g.items.map((it) => {
                      const Icono = it.icono ?? Blocks
                      return (
                        <button key={it.clave} type="button" {...arrastrable(it)} className="flex cursor-grab items-start gap-2 rounded-lg border border-line bg-white p-2 text-left hover:border-dash-blue active:cursor-grabbing">
                          <Icono className="mt-0.5 size-4 shrink-0 text-dash-blue" />
                          <span className="flex min-w-0 flex-col">
                            <span className="text-[12.5px] font-semibold text-ink">{it.nombre}</span>
                            <span className="text-[11.5px] leading-snug text-ink-muted">{it.detalle}</span>
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))
            ) : (
              sec.grupos.map((g) => (
                <details key={g.nombre} className="group rounded-lg border border-line-row">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-2.5 py-2 text-[12.5px] font-medium text-ink [&::-webkit-details-marker]:hidden">
                    {g.nombre}
                    <span className="flex items-center gap-1.5 text-[11.5px] text-ink-muted tabular-nums">{g.items.length}<ChevronDown className="size-3.5 transition-transform group-open:rotate-180" /></span>
                  </summary>
                  <ul className="m-0 flex list-none flex-col border-t border-line-row p-1">{g.items.map((it) => fila(it))}</ul>
                </details>
              ))
            )}
          </section>
        ))
      )}
      {!sistema && <p className="m-0 text-[12px] text-ink-muted">Cargando los componentes de la app…</p>}
    </div>
  )
}

/* ── La página ──────────────────────────────────────────────────────── */

export function Constructor() {
  const [d, setD] = useState<Diseno>(() => cargar() ?? pantallaVacia())
  const [abierto, setAbierto] = useState(true)
  const [pestana, setPestana] = useState<'Describe' | 'Components' | 'Layers' | 'Code'>('Describe')
  const [editando, setEditando] = useState<string | null>(null)
  /* La lista donde el clic en la paleta suma, cuando se pidió "Add block inside" en Layers. */
  const [dentro, setDentro] = useState<{ lista: string; nombre: string } | null>(null)
  const [sistema, setSistema] = useState<Sistema | null>(null)
  const [copiado, setCopiado] = useState(false)
  /* El modal que se abrió tocando su botón en el lienzo. */
  const [modalAbierto, setModalAbierto] = useState<string | null>(null)
  const [link, setLink] = useState<{ url: string; copiado: boolean } | null>(null)
  const [bajando, setBajando] = useState(false)
  /* Abierto desde un link compartido: se muestra ese diseño solo, sin tocar
     el que esta persona tenga armado, hasta que elija editar una copia. */
  const [delLink] = useState(tomarCompartido)
  const [abriendo, setAbriendo] = useState(!!delLink)
  const [visto, setVisto] = useState<Diseno | null>(null)
  const [aviso, setAviso] = useState<'copia' | 'roto' | null>(null)
  const [anterior, setAnterior] = useState<Diseno | null>(null)
  const previa = useRef<HTMLDivElement>(null)
  const actual = visto ?? d
  const codigo = useMemo(() => generarCodigo(actual), [actual])
  const paleta = useMemo(() => (sistema ? armarPaleta(sistema.entradas, sistema.indice) : armarPaleta([], [])), [sistema])

  const editar = (id: string) => {
    setEditando(id)
    setPestana('Layers')
  }
  const edicion = useLienzo({ bloques: d.bloques, setBloques: (f) => setD((x) => ({ ...x, bloques: f(x.bloques) })), elegido: editando, elegir: setEditando, editar })
  const elegidoB = editando ? buscarBloque(d.bloques, editando) : null
  const desc = useDescribir({
    paleta, d, setD, setEditando, setModalAbierto,
    cuantas: { piezas: paleta.slice(1).reduce((n, s) => n + s.grupos.reduce((m, g) => m + g.items.length, 0), 0), bloques: TIPOS.length },
  })
  const ctx: Ctx = {
    editando, setEditando, sistema,
    agregarEn: (lista, nombre) => {
      setDentro(lista === 'raiz' ? null : { lista, nombre })
      setPestana('Components')
    },
  }

  useEffect(() => {
    try {
      window.localStorage.setItem(GUARDADO, JSON.stringify(d))
    } catch {
      /* Sin almacenamiento (ventana privada): se arma igual, sólo no se guarda. */
    }
  }, [d])

  useEffect(() => {
    let vivo = true
    cargarIndice().then((e) => { if (vivo) setSistema({ entradas: e, indice: armarIndice(e) }) })
    return () => { vivo = false }
  }, [])

  useEffect(() => {
    if (!delLink) return
    decodificar(delLink)
      .then((x) => setVisto(migrarDiseno(x)))
      .catch(() => { soltarCompartido(); setAviso('roto') })
      .finally(() => setAbriendo(false))
  }, [delLink])

  /* Con algo elegido: Supr lo borra y Esc lo suelta, si no se está escribiendo. */
  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (visto || !editando || t.closest('input, textarea, select, [contenteditable="true"]')) return
      if (e.key === 'Escape') setEditando(null)
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault()
        edicion.borrar(editando)
      }
    }
    window.addEventListener('keydown', tecla)
    return () => window.removeEventListener('keydown', tecla)
  })

  const editarCopia = () => {
    if (!visto) return
    setAnterior(JSON.stringify(d) === JSON.stringify(visto) ? null : d)
    setD(visto)
    setVisto(null)
    setEditando(null)
    setModalAbierto(null)
    setAviso('copia')
    soltarCompartido()
  }

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
    setPestana('Layers')
  }, [])

  /* El clic en la paleta suma adentro de lo pedido o de la sección o el modal elegidos, si no debajo de lo elegido, si no al final. */
  const sumar = (it: Item) => {
    const b = it.crear()
    setD((x) => {
      const u = editando ? ubicar(x.bloques, editando) : null
      const [lista, indice] =
        dentro && entra(x.bloques, dentro.lista, b.tipo) ? [dentro.lista, Infinity]
        : editando && entra(x.bloques, editando, b.tipo) ? [editando, Infinity]
        : u && entra(x.bloques, u.lista, b.tipo) ? [u.lista, u.indice + 1]
        : ['raiz', Infinity]
      return { ...x, bloques: insertar(x.bloques, lista, indice, b) }
    })
    setEditando(b.id)
  }

  const compartir = async () => {
    const url = linkDe(await codificar(d))
    let copiado = true
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      copiado = false
    }
    setLink({ url, copiado })
  }

  /* La imagen: el modal si hay uno abierto en el lienzo, si no el componente. */
  const bajarPng = async () => {
    const nodo = document.querySelector<HTMLElement>('[data-lienzo] [role="dialog"]') ?? previa.current
    if (!nodo) return
    setBajando(true)
    try {
      await descargarPng(nodo, nombreComponente(actual.nombre))
    } finally {
      setBajando(false)
    }
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

  const anchoPanel = pestana === 'Code' ? 'lg:w-[560px]' : 'lg:w-[400px]'

  if (abriendo) {
    return (
      <Sitio actual="builder--docs" lateral={false}>
        <div className={cn(LIENZO, 'flex items-center justify-center text-[14px] text-ink-muted')}>Abriendo el diseño…</div>
      </Sitio>
    )
  }

  if (visto) {
    const nombre = nombreComponente(visto.nombre)
    return (
      <Sitio actual="builder--docs" lateral={false}>
        <div className={LIENZO}>
          <div className="mx-auto flex max-w-[1180px] flex-col gap-10 px-5 pt-8 pb-24 sm:px-8">
            <div data-lienzo className="flex min-h-[calc(100vh-10rem)] transform-gpu flex-col gap-8">
              <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div className="flex min-w-0 flex-col gap-3">
                  <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[14px]">
                    <Enlace id="welcome--docs" className="text-dash-blue no-underline hover:underline">Home</Enlace>
                    <span className="text-ink-muted">/</span>
                    <span className="text-ink">Shared design</span>
                  </nav>
                  <h1 className="m-0 truncate text-[36px] leading-tight font-bold tracking-[-0.02em] text-ink">{nombre}</h1>
                  <p className="m-0 max-w-[62ch] text-[16px] leading-relaxed text-ink-muted">
                    Un componente armado en el Builder con las piezas reales de la app. Probalo acá mismo; para cambiarlo, editá una copia.
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <button type="button" onClick={editarCopia} className="inline-flex h-9 items-center gap-1.5 rounded-md bg-dash-blue px-3.5 text-[14px] font-medium text-white hover:bg-dash-blue-hover">
                    <Pencil className="size-4" /> Edit a copy
                  </button>
                  <button type="button" onClick={bajarPng} disabled={bajando || !visto.bloques.length} className="inline-flex h-9 items-center gap-1.5 rounded-md border border-line bg-white px-3.5 text-[14px] font-medium text-ink hover:bg-surface-subtle disabled:opacity-50">
                    <Download className="size-4" /> {bajando ? 'Saving…' : 'PNG'}
                  </button>
                </div>
              </header>
              <Muestra d={visto} previa={previa} editando={null} modal={modalAbierto} setModal={setModalAbierto} />
            </div>

            <section aria-label="Code" className="overflow-hidden rounded-xl border border-line bg-white">
              <div className="flex items-center justify-between gap-3 border-b border-line-row px-4 py-2.5">
                <span className="flex min-w-0 items-center gap-2 text-[13px] font-medium text-ink">
                  <Code2 className="size-4 shrink-0 text-ink-muted" /> <span className="truncate">{nombre}.tsx</span>
                </span>
                <button type="button" onClick={copiar} className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-line bg-white px-2.5 text-[13px] font-medium text-ink hover:bg-surface-subtle">
                  {copiado ? <Check className="size-4" /> : <Copy className="size-4" />} {copiado ? 'Copied' : 'Copy code'}
                </button>
              </div>
              <pre className="m-0 max-h-[520px] overflow-auto bg-surface-subtle p-4 font-mono text-[12.5px] leading-[1.6] text-ink"><Resaltar codigo={codigo} /></pre>
            </section>
          </div>
        </div>
      </Sitio>
    )
  }

  return (
    <Sitio actual="builder--docs" lateral={false}>
      <div className={cn(LIENZO, 'relative')}>
        <div className={cn('px-5 pt-8 pb-[60vh] sm:px-8 lg:pb-24', abierto && (pestana === 'Code' ? 'lg:pr-[600px]' : 'lg:pr-[440px]'))}>
        {/* El transform hace que los modales del lienzo (ModalShell es
            position: fixed) se abran sobre el lienzo, centrados en el lugar
            libre, y no sobre el panel. */}
        <div data-lienzo className="flex min-h-[calc(100vh-7rem)] transform-gpu flex-col gap-8">
          <header className="flex flex-col gap-3">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[14px]">
              <Enlace id="welcome--docs" className="text-dash-blue no-underline hover:underline">Home</Enlace>
              <span className="text-ink-muted">/</span>
              <span className="text-ink">Builder</span>
            </nav>
            <h1 className="m-0 text-[36px] leading-tight font-bold tracking-[-0.02em] text-ink">Builder</h1>
            <p className="m-0 max-w-[62ch] text-[16px] leading-relaxed text-ink-muted">
              Armá pantallas de la app desde cero con sus componentes reales, cada uno suelto, y llevate su código. Arrastrá desde el panel al lienzo; ahí se elige, se mueve y se edita.
            </p>
          </header>

          {/* Mientras piensa, lo de antes queda atenuado; mientras arma, cada bloque entra de a uno (docs.css). */}
          <div className={cn('relative flex flex-1 flex-col transition-opacity', desc.estado === 'pensando' && 'opacity-45', desc.estado === 'armando' && 'bl-armando')}>
            {desc.estado !== 'quieto' && (
              <span className="pointer-events-none absolute top-6 left-1/2 z-40 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-3.5 py-1.5 text-[12.5px] font-medium text-white shadow-lg">
                <Sparkles className="bl-orbe size-3.5" /> {desc.estado === 'pensando' ? 'Pensando…' : 'Armando…'}
              </span>
            )}
            <Lienzo edicion={edicion}>
              <Muestra d={d} previa={previa} editando={editando} elegir={setEditando} modal={modalAbierto} setModal={setModalAbierto} />
            </Lienzo>
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
              <button type="button" onClick={() => setAbierto(false)} aria-label="Hide builder" className="flex size-8 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted hover:text-ink">
                <PanelRightClose className="size-4" />
              </button>
            </div>

            {/* Lo que se hace con lo armado: llevarse el código, compartirlo o
                bajarlo como imagen. */}
            <div className="flex flex-col gap-2 border-b border-line-row px-4 py-3">
              <div className="grid grid-cols-3 gap-2">
                <button type="button" onClick={copiar} className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md bg-dash-blue px-2 text-[13px] font-medium text-white hover:bg-dash-blue-hover">
                  {copiado ? <Check className="size-4" /> : <Copy className="size-4" />} {copiado ? 'Copied' : 'Copy code'}
                </button>
                <button type="button" onClick={compartir} className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-line bg-white px-2 text-[13px] font-medium text-ink hover:bg-surface-subtle">
                  <Link2 className="size-4" /> Share link
                </button>
                <button type="button" onClick={bajarPng} disabled={bajando || !d.bloques.length} className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-line bg-white px-2 text-[13px] font-medium text-ink hover:bg-surface-subtle disabled:opacity-50">
                  <Download className="size-4" /> {bajando ? 'Saving…' : 'PNG'}
                </button>
              </div>
              {link && (
                <div className="flex flex-col gap-1.5 rounded-lg bg-info-bg p-2.5">
                  <span className="text-[12px] font-medium text-ink">
                    {link.copiado ? 'Link copiado.' : 'Copiá este link.'} Quien lo abra ve este componente con su código, y puede editar una copia.
                  </span>
                  <span className="flex items-center gap-1.5">
                    <input readOnly value={link.url} onFocus={(e) => e.currentTarget.select()} aria-label="Share link" className={cn(INPUT, 'h-7 flex-1 text-[11.5px] text-ink-muted')} />
                    <a href={link.url} target="_blank" rel="noreferrer" className="shrink-0 text-[12px] font-medium text-dash-blue">Open</a>
                    <button type="button" onClick={() => setLink(null)} aria-label="Close" className="flex size-6 shrink-0 items-center justify-center rounded text-ink-muted hover:bg-white"><X className="size-3.5" /></button>
                  </span>
                </div>
              )}
              {aviso && (
                <div className="flex items-start justify-between gap-2 rounded-lg border border-dash-blue/20 bg-info-bg px-2.5 py-2 text-[12px] text-ink">
                  {aviso === 'roto' ? (
                    <span>No se pudo abrir el diseño del link: puede que esté cortado. Pedí que te lo copien de nuevo.</span>
                  ) : (
                    <span>
                      Estás editando una copia del diseño compartido. Lo que cambies queda en tu navegador; el link no cambia.
                      {anterior && (
                        <>
                          {' '}
                          <button type="button" onClick={() => { setD(anterior); setAnterior(null); setAviso(null) }} className="font-medium text-dash-blue hover:underline">Volver a mi diseño</button>
                        </>
                      )}
                    </span>
                  )}
                  <button type="button" onClick={() => setAviso(null)} aria-label="Dismiss" className="flex size-5 shrink-0 items-center justify-center rounded text-ink-muted hover:bg-white"><X className="size-3" /></button>
                </div>
              )}
            </div>

            <nav aria-label="Builder sections" className="flex gap-5 border-b border-line px-4">
              {(['Describe', 'Components', 'Layers', 'Code'] as const).map((p) => {
                const Icono = { Describe: Sparkles, Components: Component, Layers, Code: Code2 }[p]
                return (
                  <button
                    key={p}
                    type="button"
                    aria-current={p === pestana ? 'page' : undefined}
                    onClick={() => setPestana(p)}
                    className={cn('-mb-px inline-flex items-center gap-1.5 border-b-2 py-2.5 text-[14px]', p === pestana ? 'border-dash-blue font-semibold text-ink' : 'border-transparent text-ink-muted hover:text-ink')}
                  >
                    <Icono className="size-3.5" /> {p}
                  </button>
                )
              })}
            </nav>

            <div className="min-h-0 flex-1 overflow-y-auto">
              {pestana === 'Describe' ? (
                <Describir desc={desc} listo={!!sistema} />
              ) : pestana === 'Components' ? (
                <Paleta
                  paleta={paleta.filter((sec) => sec.titulo !== 'App components')}
                  sistema={sistema}
                  alArrastrar={(it) => edicion.empezar({ tipo: it.tipo, nuevo: it.crear })}
                  alTerminar={edicion.terminar}
                  sumar={sumar}
                  dentro={dentro?.nombre ?? null}
                  salir={() => setDentro(null)}
                  nuevaPantalla={d.contenedor === 'app' ? null : () => { setD(pantallaVacia()); setEditando(null); setModalAbierto(null) }}
                  elegido={elegidoB && !dentro ? { nombre: nombreDe(elegidoB), adentro: elegidoB.tipo === 'modal' || elegidoB.tipo === 'seccion', editar: () => editar(elegidoB.id), soltar: () => setEditando(null) } : null}
                />
              ) : pestana === 'Layers' ? (
                <div className="flex flex-col gap-6 p-4">
                  <section className="flex flex-col gap-2">
                    <span className={ETIQUETA}>Start from</span>
                    <div className="flex flex-wrap gap-1.5">
                      {PLANTILLAS.map((p) => (
                        <button
                          key={p.nombre}
                          type="button"
                          title={p.que}
                          onClick={() => { setD(p.crear()); setEditando(null); setModalAbierto(null) }}
                          className="inline-flex h-7 items-center rounded-full border border-line px-2.5 text-[12.5px] font-medium text-ink hover:border-dash-blue hover:text-dash-blue"
                        >
                          {p.nombre}
                        </button>
                      ))}
                      <button
                        type="button"
                        title="Una pantalla de la app vacía, para armarla desde cero"
                        onClick={() => { setD(pantallaVacia()); setEditando(null); setModalAbierto(null) }}
                        className="inline-flex h-7 items-center rounded-full border border-dashed border-line px-2.5 text-[12.5px] font-medium text-ink-muted hover:border-dash-blue hover:text-dash-blue"
                      >
                        Blank screen
                      </button>
                    </div>
                  </section>

                  <section className="flex flex-col gap-3">
                    <Segmentos label="Container" value={d.contenedor} opciones={[{ value: 'app', label: 'App' }, { value: 'page', label: 'Page' }, { value: 'card', label: 'Card' }, { value: 'panel', label: 'Panel' }, { value: 'libre', label: 'None' }]} onChange={(v) => setD((x) => ({ ...x, contenedor: v, ancho: v === 'app' || v === 'page' ? 'completo' : x.ancho, tituloPanel: v === 'panel' && !x.tituloPanel ? 'Panel title' : x.tituloPanel }))} />
                    {d.contenedor === 'panel' && <Texto label="Panel title" value={d.tituloPanel} onChange={(v) => setD((x) => ({ ...x, tituloPanel: v }))} />}
                    <Segmentos label="Width" value={d.ancho} opciones={[{ value: 'angosto', label: 'Narrow' }, { value: 'medio', label: 'Medium' }, { value: 'completo', label: 'Full' }]} onChange={(v) => setD((x) => ({ ...x, ancho: v }))} />
                  </section>

                  <section className="flex flex-col gap-2">
                    <span className={ETIQUETA}>Blocks</span>
                    <ListaBloques lista="raiz" bloques={d.bloques} onChange={(bloques) => setD((x) => ({ ...x, bloques }))} ctx={ctx} />
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

const LIENZO = 'min-h-[calc(100vh-4rem)] bg-page-background [background-image:radial-gradient(color-mix(in_srgb,var(--color-ink)_10%,transparent)_1px,transparent_1px)] [background-size:18px_18px]'
const NOMBRE_CONTENEDOR = { card: 'Card', panel: 'Panel', page: 'Page', libre: 'No container', app: 'App screen' } as const

/* El componente armado, al ancho elegido. Con \`elegir\` se arma: cada bloque se elige y se arrastra. */
function Muestra({ d, previa, editando, elegir, modal, setModal }: {
  d: Diseno
  previa: RefObject<HTMLDivElement | null>
  editando: string | null
  elegir?: (id: string | null) => void
  modal: string | null
  setModal: (id: string | null) => void
}) {
  const ancho = ANCHOS[d.ancho]
  return (
    <div className="mx-auto w-full" style={{ maxWidth: ancho ?? undefined }}>
      <p className="m-0 mb-2 flex items-center justify-between text-[12px] text-ink-muted">
        <span>Preview · {NOMBRE_CONTENEDOR[d.contenedor]}</span>
        <span className="tabular-nums">{ancho ? \`\${ancho}px\` : 'Full width'}</span>
      </p>
      {/* pt: lugar para la etiqueta del bloque elegido. */}
      <div ref={previa} className={cn(elegir && 'pt-2', d.contenedor === 'page' && 'overflow-hidden rounded-xl border border-line bg-page-background')}>
        {(d.bloques.length > 0 || elegir) && (
          <MemoryRouter>
            <VistaPrevia.Provider value={{ editando, abierto: modal, setAbierto: setModal, elegir }}>
              <VerDiseno d={d} />
            </VistaPrevia.Provider>
          </MemoryRouter>
        )}
      </div>
    </div>
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