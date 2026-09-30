import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import {
  Search, Plus, Bold, Italic, Underline, Heading1, Heading2,
  Pilcrow, List, ListOrdered, X, Eye, Power, PowerOff,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { cn } from '@/lib/utils'
import { Pill } from '@/components/ui/pill'
import { Switch } from '@/components/ui/switch'
import { SelectField } from '@/components/patients/form'
import { EmptyState } from '@/components/ui/empty-state'
import { aviso } from '@/components/ui/toaster'
import { ConsentDocument } from '@/components/settings/ConsentDocument'
import { Tabs } from '@/components/ui/tabs'

/* Settings → Consents. Figma 4106:170620 ("New Consent Template"): lista de
   templates a la izquierda, editor del texto en el medio, preview en vivo a
   la derecha -las tres variantes del frame son el mismo estado con y sin el
   error de validación, no pantallas distintas; layout replicado, contenido
   simplificado donde hacía falta-.

   Opción 1 de las tres que planteó Julián para el flujo de consentimientos
   -la única con diseño de Figma-. Reusa piezas del sistema: Pill para los
   estados, el mismo anillo azul de fila seleccionada que usa \`Seleccionable\`
   en TreatmentPlanPicker.tsx, y SelectField para "Current Title" -mismo
   quirk que "First Name" en Employees.tsx: acá los campos son choices, no
   texto libre-.

   El Figma muestra "Consent text" como un solo bloque de texto enriquecido
   con encabezados inline (Nature of procedure, Risk and complications). Sin
   un editor de texto enriquecido real en este prototipo, se separaron en dos
   campos estructurados con su propio label -mismo contenido, modelo de datos
   más simple-, bajo un solo toolbar decorativo (ver comentario en
   ToolbarFormato). Las partes (lista, tarjeta, editor, procedimientos, texto,
   preview) se exportan para documentarlas en el design system; ver
   design-reference/figma/modulos/consents.md. */

export type Procedimiento = { codigo: string; nombre: string }
export const PROCEDIMIENTOS_DISPONIBLES: Procedimiento[] = [
  { codigo: 'D7240', nombre: 'Removal of impacted tooth' },
  { codigo: 'D3948', nombre: 'Extraction, angled tooth' },
  { codigo: 'D3310', nombre: 'Root canal therapy, anterior' },
  { codigo: 'D3320', nombre: 'Root canal therapy, premolar' },
  { codigo: 'D2740', nombre: 'Crown – porcelain/ceramic' },
]
const procedimiento = (codigo: string) => PROCEDIMIENTOS_DISPONIBLES.find((p) => p.codigo === codigo)

/* \`activo\` y \`sistema\` son independientes: "System" dice de dónde viene el
   template (viene con el producto), "activo" si hoy se ofrece o no. Un
   template de sistema también se puede desactivar. */
export type ConsentTemplate = {
  id: string
  titulo: string
  activo: boolean
  sistema: boolean
  procedimientos: string[]
  naturaleza: string
  riesgos: string
}

export const TEMPLATES_INICIALES: ConsentTemplate[] = [
  {
    id: 't1',
    titulo: 'Extraction Informed Consent',
    activo: true,
    sistema: false,
    procedimientos: ['D7240', 'D3948'],
    naturaleza: 'The proposed treatment has been explained to me in a way that I understood, including what will be done and why it is recommended.',
    riesgos: 'Pain, swelling, bleeding, or bruising.\\nInfection or delayed healing.\\nReaction to medications or anesthesia.\\nNeed for additional treatment if complications occur.',
  },
  {
    id: 't2',
    titulo: 'Root Canal Consent',
    activo: true,
    sistema: false,
    procedimientos: ['D3310'],
    naturaleza: 'The proposed treatment has been explained to me in a way that I understood, including what will be done and why it is recommended.',
    riesgos: 'Alternatives to the proposed treatment, including the option of no treatment, have been discussed with me.\\nPossible instrument separation or need for retreatment.\\nPersistent pain or swelling after treatment.',
  },
  {
    id: 't3',
    titulo: 'Root Canal Consent – Molar',
    activo: true,
    sistema: true,
    procedimientos: ['D3320'],
    naturaleza: 'The proposed treatment has been explained to me in a way that I understood, including what will be done and why it is recommended.',
    riesgos: 'Alternatives to the proposed treatment, including the option of no treatment, have been discussed with me.\\nPossible instrument separation or need for retreatment.',
  },
]

const TITULOS_SUGERIDOS = [
  'Extraction Informed Consent', 'Root Canal Consent', 'Root Canal Consent – Molar',
  'Crown & Bridge Consent', 'Implant Consent', 'HIPAA Acknowledgment',
]

const FILTROS = ['Active', 'Inactive', 'System', 'All'] as const
export type Filtro = (typeof FILTROS)[number]

const coincideFiltro = (t: ConsentTemplate, f: Filtro) =>
  f === 'All' || (f === 'Active' && t.activo) || (f === 'Inactive' && !t.activo) || (f === 'System' && t.sistema)

export type Borrador = {
  titulo: string
  procedimientos: string[]
  naturaleza: string
  riesgos: string
}

export const BORRADOR_VACIO: Borrador = { titulo: '', procedimientos: [], naturaleza: '', riesgos: '' }

/* Guía para quien redacta el template: va en el editor, no en la hoja que ve
   el paciente. */
const GUIA_NATURALEZA = 'Describe the proposed treatment, what the procedure involves, expected outcomes, and other relevant information the patient should understand before treatment.'
const GUIA_RIESGOS = 'Describe the material risks, potential complications, and other relevant considerations associated with the proposed treatment.'
export const aBorrador = (t: ConsentTemplate): Borrador => ({
  titulo: t.titulo, procedimientos: t.procedimientos, naturaleza: t.naturaleza, riesgos: t.riesgos,
})

/* Toolbar decorativo: mismo trato que el botón "Select File" de Documents en
   Employees.tsx -avisa que no está disponible en vez de fingir que hace
   algo-. No hay editor de texto enriquecido real en este prototipo. */
export function ToolbarFormato() {
  const iconos = [Bold, Italic, Underline, Heading1, Heading2, Pilcrow, List, ListOrdered]
  return (
    <div className="flex items-center gap-0.5 rounded-t-md border border-b-0 border-line bg-surface-subtle px-2 py-1.5">
      {iconos.map((Icono, i) => (
        <button
          key={i}
          type="button"
          onClick={() => aviso.info('Rich text formatting is not available in this release.')}
          className="rounded p-1.5 text-ink-medium hover:bg-black/5"
        >
          <Icono className="size-3.5" />
        </button>
      ))}
      <span className="ml-auto pr-1 text-[11px] text-ink-faint max-sm:hidden">Basic formatting only</span>
    </div>
  )
}

/* Una tarjeta de la lista: título (hasta dos líneas), estado, System si viene con el producto y cuántos procedimientos
   usa. El interruptor la activa o desactiva sin abrirla; la elegida lleva el borde azul, como \`Seleccionable\`. */
export function TarjetaTemplate({ t, elegida, onElegir, onAlternar }: {
  t: ConsentTemplate
  elegida: boolean
  onElegir: () => void
  onAlternar: () => void
}) {
  return (
    <div className={cn('flex items-start gap-2 self-stretch rounded-lg border px-3 py-2.5 transition-colors', elegida ? 'border-dash-blue bg-info-bg' : 'border-line bg-white hover:bg-surface-subtle')}>
      <button type="button" onClick={onElegir} aria-current={elegida || undefined} className="flex min-w-0 flex-1 flex-col items-start gap-1 text-left">
        <span className={cn('line-clamp-2 w-full text-[13px] font-bold', t.activo ? 'text-ink' : 'text-ink-faint')}>{t.titulo}</span>
        <span className="flex flex-wrap items-center gap-1.5">
          <Pill tone={t.activo ? 'success' : 'neutral'} size="sm">{t.activo ? 'Active' : 'Inactive'}</Pill>
          {t.sistema && <Pill tone="info" size="sm">System</Pill>}
          <span className="text-[11px] text-ink-muted">{t.procedimientos.length} procedure{t.procedimientos.length === 1 ? '' : 's'}</span>
        </span>
      </button>
      <Switch checked={t.activo} onCheckedChange={onAlternar} aria-label={\`\${t.activo ? 'Deactivate' : 'Activate'} \${t.titulo}\`} className="mt-0.5" />
    </div>
  )
}

/* El panel de la izquierda: New template, buscador, filtros (Active, Inactive, System, All) y la lista. */
export function ListaTemplates({ templates, elegidoId, q, onQ, filtro, onFiltro, onElegir, onAlternar, onNuevo }: {
  templates: ConsentTemplate[]
  elegidoId: string | null
  q: string
  onQ: (q: string) => void
  filtro: Filtro
  onFiltro: (f: Filtro) => void
  onElegir: (t: ConsentTemplate) => void
  onAlternar: (id: string) => void
  onNuevo: () => void
}) {
  return (
    <section aria-label="Templates" className="flex flex-col gap-3 self-start rounded-xl border border-line bg-white p-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-ink">Templates</h2>
        <Button size="sm" onClick={onNuevo}><Plus /> New template</Button>
      </div>
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
        <input
          value={q}
          onChange={(e) => onQ(e.target.value)}
          placeholder="Search templates..."
          aria-label="Search templates"
          className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
        />
      </div>
      <Tabs size="sm" fullWidth aria-label="Filter templates" tabs={FILTROS} value={filtro} onChange={onFiltro} />
      <div className="flex max-h-[520px] flex-col gap-2 overflow-y-auto">
        {templates.length === 0 ? (
          <EmptyState icon={Search} title="No templates" detail="Nothing matches this search or filter." className="py-6" />
        ) : (
          templates.map((t) => <TarjetaTemplate key={t.id} t={t} elegida={elegidoId === t.id} onElegir={() => onElegir(t)} onAlternar={() => onAlternar(t.id)} />)
        )}
      </div>
    </section>
  )
}

/* Buscar y sumar procedimientos: el buscador muestra los que coinciden y no están elegidos; los elegidos quedan como
   chips que se sacan con la X. Obligatorio: con el error, el borde en rojo y el mensaje en lugar de los chips. */
export function SelectorProcedimientos({ elegidos, onCambiar, error }: {
  elegidos: string[]
  onCambiar: (codigos: string[]) => void
  error?: boolean
}) {
  const [q, setQ] = useState('')
  const opciones = PROCEDIMIENTOS_DISPONIBLES.filter(
    (p) => !elegidos.includes(p.codigo) && \`\${p.codigo} \${p.nombre}\`.toLowerCase().includes(q.trim().toLowerCase()),
  )
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="consent-procedimiento" className="text-xs font-medium text-ink">
        Search Procedure<span className="text-required">*</span>
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
        <input
          id="consent-procedimiento"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search..."
          aria-invalid={error || undefined}
          className={cn(
            'h-9 w-full rounded-md border bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none',
            error ? 'border-field-error' : 'focus:border-dash-blue border-line',
          )}
        />
        {q && opciones.length > 0 && (
          <div className="motion-safe:animate-[loc-in_120ms_ease-out] absolute top-[calc(100%+4px)] left-0 z-30 max-h-52 w-full overflow-y-auto rounded-md border border-line bg-white py-1 shadow-lg">
            {opciones.map((p) => (
              <button
                key={p.codigo}
                type="button"
                onClick={() => { onCambiar([...elegidos, p.codigo]); setQ('') }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] hover:bg-surface-muted"
              >
                <span className="text-dash-blue font-semibold">{p.codigo}</span>
                <span className="truncate text-ink-soft">{p.nombre}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      {error ? (
        <span className="text-[11px] leading-[1.35] text-field-error">At least one procedure must be listed.</span>
      ) : (
        elegidos.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {elegidos.map((codigo) => (
              <span key={codigo} className="text-dash-blue flex items-center gap-1.5 rounded-full bg-info-bg py-1 pr-1.5 pl-2.5 text-[12px] font-medium">
                {codigo} - {procedimiento(codigo)?.nombre}
                <button type="button" aria-label={\`Remove \${codigo}\`} onClick={() => onCambiar(elegidos.filter((c) => c !== codigo))} className="rounded-full p-0.5 hover:bg-dash-blue/10">
                  <X className="size-3" />
                </button>
              </span>
            ))}
          </div>
        )
      )}
    </div>
  )
}

/* El texto del consentimiento: dos secciones con su rótulo y, debajo de cada caja, la guía en cursiva para quien
   redacta (no va en la hoja del paciente). Un solo toolbar arriba, decorativo. */
export function TextoConsentimiento({ naturaleza, riesgos, onNaturaleza, onRiesgos }: {
  naturaleza: string
  riesgos: string
  onNaturaleza: (v: string) => void
  onRiesgos: (v: string) => void
}) {
  const caja = 'focus:border-dash-blue w-full resize-none rounded-md border border-line bg-white px-3 py-2 text-[13px] placeholder:text-ink-faint focus:outline-none'
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium text-ink">Consent text</span>
      <ToolbarFormato />
      <div className="-mt-2 flex flex-col gap-3 rounded-b-md border border-t-0 border-line p-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold tracking-wide text-ink-muted uppercase">Nature of procedure</span>
          <textarea rows={3} value={naturaleza} onChange={(e) => onNaturaleza(e.target.value)} placeholder="Describe the procedure in plain language..." className={caja} />
          <span className="text-[11.5px] leading-snug text-ink-muted italic">{GUIA_NATURALEZA}</span>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold tracking-wide text-ink-muted uppercase">Risk and complications</span>
          <textarea rows={4} value={riesgos} onChange={(e) => onRiesgos(e.target.value)} placeholder="One risk per line..." className={caja} />
          <span className="text-[11.5px] leading-snug text-ink-muted italic">{GUIA_RIESGOS}</span>
        </label>
      </div>
    </div>
  )
}

/* El editor del medio. El título dice qué se hace (Edit Template con su estado, o New Consent Template); Activate o
   Deactivate a la derecha; el aviso rojo arriba si se intentó guardar con faltantes; Cancel y Save fijos al pie. */
export function EditorTemplate({ actual, borrador, onBorrador, intentado, onAlternar, onCancelar, onGuardar }: {
  actual?: ConsentTemplate
  borrador: Borrador
  onBorrador: (b: Borrador) => void
  intentado: boolean
  onAlternar: () => void
  onCancelar: () => void
  onGuardar: () => void
}) {
  const faltaTitulo = intentado && !borrador.titulo
  const faltaProcedimiento = intentado && borrador.procedimientos.length === 0
  return (
    <section aria-label="Template editor" className="flex flex-col gap-4 self-start rounded-xl border border-line bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-[200px] flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold text-ink">{actual ? 'Edit Template' : 'New Consent Template'}</h2>
            {actual && <Pill tone={actual.activo ? 'success' : 'neutral'} size="sm">{actual.activo ? 'Active' : 'Inactive'}</Pill>}
            {actual?.sistema && <Pill tone="info" size="sm">System</Pill>}
          </div>
          <p className="mt-0.5 text-xs text-ink-muted">
            {actual ? 'Changes show in the preview as you type. Save to keep them.' : 'Fill in the details and the text, then save to add it to the list.'}
          </p>
        </div>
        {actual && (
          <Button variant={actual.activo ? 'secondary' : 'primary'} onClick={onAlternar}>
            {actual.activo ? <PowerOff /> : <Power />} {actual.activo ? 'Deactivate template' : 'Activate template'}
          </Button>
        )}
      </div>

      {(faltaTitulo || faltaProcedimiento) && (
        <div role="alert" className="rounded-md border border-dash-bad-fg/30 bg-dash-bad-bg px-3 py-2.5 text-[12px] font-medium text-dash-bad-fg">
          All required fields marked with (*) must be completed before proceeding.
        </div>
      )}

      <SelectField
        label="Current Title"
        required
        options={TITULOS_SUGERIDOS}
        value={borrador.titulo}
        onChange={(v) => onBorrador({ ...borrador, titulo: v })}
        error={faltaTitulo ? 'This field is required.' : undefined}
      />
      <SelectorProcedimientos elegidos={borrador.procedimientos} onCambiar={(procedimientos) => onBorrador({ ...borrador, procedimientos })} error={faltaProcedimiento} />
      <TextoConsentimiento
        naturaleza={borrador.naturaleza}
        riesgos={borrador.riesgos}
        onNaturaleza={(naturaleza) => onBorrador({ ...borrador, naturaleza })}
        onRiesgos={(riesgos) => onBorrador({ ...borrador, riesgos })}
      />

      <div className="sticky bottom-0 z-10 -mx-4 -mb-4 flex justify-end gap-3 rounded-b-xl border-t border-line bg-white px-4 py-3 sm:-mx-5 sm:-mb-5 sm:px-5">
        <Button variant="secondary" className="px-6" onClick={onCancelar}>Cancel</Button>
        <Button className="px-6" onClick={onGuardar}>Save</Button>
      </div>
    </section>
  )
}

/* La columna del preview: el "escritorio" gris con la hoja que recibe el paciente (ConsentDocument). Patient View
   saca lo que es sólo de la clínica (diagnóstico y hallazgos). */
export function PanelPreview({ borrador, vistaPaciente, onVistaPaciente }: {
  borrador: Borrador
  vistaPaciente: boolean
  onVistaPaciente: (v: boolean) => void
}) {
  return (
    <section aria-label="Preview" className="self-start rounded-xl border border-line bg-surface-muted p-3 @3xl:col-start-2 @5xl:sticky @5xl:top-4 @5xl:col-start-3 @5xl:max-h-[calc(100vh-2rem)] @5xl:overflow-y-auto">
      <div className="flex items-center justify-between gap-2 px-1">
        <div>
          <h2 className="text-sm font-bold text-ink">Preview</h2>
          <p className="text-[11px] text-ink-muted">What the patient receives</p>
        </div>
        <button
          type="button"
          onClick={() => onVistaPaciente(!vistaPaciente)}
          aria-pressed={vistaPaciente}
          className={cn(
            'flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors',
            vistaPaciente ? 'border-dash-blue bg-dash-blue text-white' : 'border-line bg-white text-ink-slate hover:text-ink-soft',
          )}
        >
          <Eye className="size-3.5" /> Patient View
        </button>
      </div>
      <div className="mt-3">
        <ConsentDocument
          titulo={borrador.titulo}
          procedimiento={borrador.procedimientos.length > 0 ? procedimiento(borrador.procedimientos[0])?.nombre : undefined}
          naturaleza={borrador.naturaleza}
          riesgos={borrador.riesgos}
          vistaPaciente={vistaPaciente}
        />
      </div>
    </section>
  )
}

export function SettingsConsents() {
  const [templates, setTemplates] = useState(TEMPLATES_INICIALES)
  const [q, setQ] = useState('')
  const [filtro, setFiltro] = useState<Filtro>('Active')
  /* Templates recién activados/desactivados: se quedan en la lista aunque ya
     no cumplan el filtro, para que se vea el interruptor cambiar en vez de
     que la tarjeta desaparezca de golpe. Se limpia al cambiar de filtro o
     de búsqueda. */
  const [fijados, setFijados] = useState<string[]>([])
  const [actualId, setActualId] = useState<string | null>('t1')
  const [borrador, setBorrador] = useState<Borrador>(aBorrador(TEMPLATES_INICIALES[0]))
  const [intentado, setIntentado] = useState(false)
  const [vistaPaciente, setVistaPaciente] = useState(false)

  const visibles = templates.filter(
    (t) => (coincideFiltro(t, filtro) || fijados.includes(t.id)) && t.titulo.toLowerCase().includes(q.trim().toLowerCase()),
  )
  const actual = templates.find((t) => t.id === actualId)

  const alternarActivo = (id: string) => {
    const t = templates.find((x) => x.id === id)
    if (!t) return
    setTemplates((ts) => ts.map((x) => (x.id === id ? { ...x, activo: !x.activo } : x)))
    setFijados((f) => (f.includes(id) ? f : [...f, id]))
    aviso.ok(\`Consent template \${t.activo ? 'deactivated' : 'activated'}.\`)
  }

  const elegir = (t: ConsentTemplate) => {
    setActualId(t.id)
    setBorrador(aBorrador(t))
    setIntentado(false)
  }

  const nuevoTemplate = () => {
    setActualId(null)
    setBorrador(BORRADOR_VACIO)
    setIntentado(false)
  }

  const cancelar = () => {
    setBorrador(actual ? aBorrador(actual) : BORRADOR_VACIO)
    setIntentado(false)
    aviso.info('Changes discarded.')
  }

  const guardar = () => {
    setIntentado(true)
    if (!borrador.titulo || borrador.procedimientos.length === 0) return

    if (actualId) {
      setTemplates((ts) => ts.map((t) => (t.id === actualId ? { ...t, ...borrador } : t)))
      aviso.ok('Consent template updated.')
    } else {
      const id = \`t\${Date.now()}\`
      setTemplates((ts) => [...ts, { id, activo: true, sistema: false, ...borrador }])
      setActualId(id)
      aviso.ok('Consent template created.')
    }
    setIntentado(false)
  }

  return (
    <div className="@container px-4 py-6 sm:px-8">
      <SettingsPageHeader titulo="Consent Templates" bajada="Create a standard consent document and assign it to one or more procedures." />

      {/* La lista es de 280-288px: con 240/260 la cuarta pestaña ("All") no entraba y quedaba cortada. */}
      <div className="mt-4 grid grid-cols-1 gap-4 @3xl:grid-cols-[280px_minmax(0,1fr)] @5xl:grid-cols-[288px_minmax(0,1fr)_minmax(0,1.15fr)]">
        <ListaTemplates
          templates={visibles}
          elegidoId={actualId}
          q={q}
          onQ={(v) => { setQ(v); setFijados([]) }}
          filtro={filtro}
          onFiltro={(f) => { setFiltro(f); setFijados([]) }}
          onElegir={elegir}
          onAlternar={alternarActivo}
          onNuevo={nuevoTemplate}
        />
        <EditorTemplate
          actual={actual}
          borrador={borrador}
          onBorrador={setBorrador}
          intentado={intentado}
          onAlternar={() => actual && alternarActivo(actual.id)}
          onCancelar={cancelar}
          onGuardar={guardar}
        />
        <PanelPreview borrador={borrador} vistaPaciente={vistaPaciente} onVistaPaciente={setVistaPaciente} />
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};