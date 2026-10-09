import { useEffect, useId, useRef, useState } from 'react'
import { Chip } from '@/components/ui/chip'
import { Search, Plus, Bold, Italic, Underline, Heading1, Heading2, Pilcrow, List, ListOrdered, Eye, Power, PowerOff, ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Drawer } from '@/components/ui/drawer'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { cn } from '@/lib/utils'
import { Pill } from '@/components/ui/pill'
import { Switch } from '@/components/ui/switch'
import { SelectField } from '@/components/patients/form'
import { EmptyState } from '@/components/ui/empty-state'
import { aviso } from '@/components/ui/toaster'
import { ConsentDocument, textoPlano } from '@/components/settings/ConsentDocument'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Tabs } from '@/components/ui/tabs'

/* Settings → Consents. Figma 4106:170620 ("New Consent Template"): lista de
   templates a la izquierda y editor del texto -las tres variantes del frame son
   el mismo estado con y sin el error de validación, no pantallas distintas-.
   El preview, que en el Figma es una tercera columna, se abre en un drawer desde
   el pie del editor (2026-10-07, ver consents.md).

   Opción 1 de las tres que planteó Julián para el flujo de consentimientos
   -la única con diseño de Figma-. Reusa piezas del sistema: Pill para los
   estados, el mismo anillo azul de fila seleccionada que usa `Seleccionable`
   en TreatmentPlanPicker.tsx, y SelectField para "Current Title" -mismo
   quirk que "First Name" en Employees.tsx: acá los campos son choices, no
   texto libre-.

   "Consent text" son dos campos con su rótulo y su guía (Nature of procedure,
   Risk and complications), vacíos en un template nuevo. La versión de un solo
   editor enriquecido queda oculta detrás de EDITOR_UNICO. Las partes (lista, tarjeta, editor, procedimientos, texto,
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

/* `activo` y `sistema` son independientes: "System" dice de dónde viene el
   template (viene con el producto), "activo" si hoy se ofrece o no. Un
   template de sistema también se puede desactivar. */
export type ConsentTemplate = {
  id: string
  titulo: string
  activo: boolean
  sistema: boolean
  procedimientos: string[]
  naturaleza: string
  /** Un riesgo por línea. */
  riesgos: string
}

/* Oculto a pedido de Julián (2026-10-03): "Consent text" como un solo editor enriquecido, con los dos encabezados como
   contenido. Queda armado por si se vuelve a esta versión: poner esto en `true`. Ver consents.md. */
const EDITOR_UNICO = false

/* El texto del editor único, hecho con los dos campos: la naturaleza del procedimiento y la lista de riesgos. */
const textoDe = (naturaleza: string, riesgos: string) => {
  const lineas = riesgos.split('\n').filter(Boolean)
  return naturaleza || lineas.length
    ? `<h2>Nature of procedure</h2><p>${naturaleza}</p><h2>Risk and complications</h2><ul>${lineas.map((r) => `<li>${r}</li>`).join('')}</ul>`
    : ''
}
const EXPLICADO = 'The proposed treatment has been explained to me in a way that I understood, including what will be done and why it is recommended.'
const ALTERNATIVAS = 'Alternatives to the proposed treatment, including the option of no treatment, have been discussed with me.'

export const TEMPLATES_INICIALES: ConsentTemplate[] = [
  {
    id: 't1',
    titulo: 'Extraction Informed Consent',
    activo: true,
    sistema: false,
    procedimientos: ['D7240', 'D3948'],
    naturaleza: EXPLICADO,
    riesgos: 'Pain, swelling, bleeding, or bruising.\nInfection or delayed healing.\nReaction to medications or anesthesia.\nNeed for additional treatment if complications occur.',
  },
  {
    id: 't2',
    titulo: 'Root Canal Consent',
    activo: true,
    sistema: false,
    procedimientos: ['D3310'],
    naturaleza: EXPLICADO,
    riesgos: `${ALTERNATIVAS}\nPossible instrument separation or need for retreatment.\nPersistent pain or swelling after treatment.`,
  },
  {
    id: 't3',
    titulo: 'Root Canal Consent – Molar',
    activo: true,
    sistema: true,
    procedimientos: ['D3320'],
    naturaleza: EXPLICADO,
    riesgos: `${ALTERNATIVAS}\nPossible instrument separation or need for retreatment.`,
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
  /** Sólo con EDITOR_UNICO: el HTML del editor enriquecido. */
  texto: string
}

export const BORRADOR_VACIO: Borrador = { titulo: '', procedimientos: [], naturaleza: '', riesgos: '', texto: '' }

/* Guía para quien redacta el template: va en el editor, no en la hoja que ve el paciente. */
const GUIA_NATURALEZA = 'Describe the proposed treatment, what the procedure involves, expected outcomes, and other relevant information the patient should understand before treatment.'
const GUIA_RIESGOS = 'Describe the material risks, potential complications, and other relevant considerations associated with the proposed treatment.'
export const aBorrador = (t: ConsentTemplate): Borrador => ({
  titulo: t.titulo, procedimientos: t.procedimientos, naturaleza: t.naturaleza, riesgos: t.riesgos, texto: textoDe(t.naturaleza, t.riesgos),
})

/* Con el editor único cada botón aplica su formato a lo seleccionado (`mousedown` sin foco para no perder la selección);
   con los dos campos de texto no hay formato y avisa, como el botón "Select File" de Employees. */
const FORMATOS = [
  { icono: Bold, label: 'Bold', comando: 'bold' },
  { icono: Italic, label: 'Italic', comando: 'italic' },
  { icono: Underline, label: 'Underline', comando: 'underline' },
  { icono: Heading1, label: 'Heading 1', comando: 'formatBlock', valor: 'h1' },
  { icono: Heading2, label: 'Heading 2', comando: 'formatBlock', valor: 'h2' },
  { icono: Pilcrow, label: 'Paragraph', comando: 'formatBlock', valor: 'p' },
  { icono: List, label: 'Bulleted list', comando: 'insertUnorderedList' },
  { icono: ListOrdered, label: 'Numbered list', comando: 'insertOrderedList' },
] as const

/* Chrome mete la lista dentro del <p> en que estaba el cursor: se saca el <p> y se avisa al editor del cambio. */
function aplicarFormato(comando: string, valor?: string) {
  document.execCommand(comando, false, valor)
  if (!comando.startsWith('insert')) return
  const nodo = getSelection()?.anchorNode
  const lista = (nodo instanceof Element ? nodo : nodo?.parentElement)?.closest('ul,ol')
  const padre = lista?.parentElement
  if (!lista || padre?.tagName !== 'P') return
  const editor = padre.closest('[contenteditable]')
  padre.replaceWith(...padre.childNodes)
  editor?.dispatchEvent(new Event('input', { bubbles: true }))
}

export function ToolbarFormato({ aplica = false }: { aplica?: boolean }) {
  return (
    <div className="flex items-center gap-0.5 rounded-t-md border border-b-0 border-line bg-surface-subtle px-2 py-1.5">
      <TooltipProvider delayDuration={150}>
        {FORMATOS.map((f) => (
          <Tooltip key={f.label}>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={f.label}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => (aplica ? aplicarFormato(f.comando, 'valor' in f ? f.valor : undefined) : aviso.info('Rich text formatting is not available in this release.'))}
                className="rounded p-1.5 text-ink-medium hover:bg-black/5"
              >
                <f.icono className="size-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={4} className="bg-ink text-white">{f.label}</TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
      <span className="ml-auto pr-1 text-[11px] text-ink-faint max-sm:hidden">Basic formatting only</span>
    </div>
  )
}

/* Una tarjeta de la lista: título (hasta dos líneas), estado, System si viene con el producto y cuántos procedimientos
   usa. El interruptor la activa o desactiva sin abrirla; la elegida lleva el borde azul, como `Seleccionable`. */
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
      <Switch checked={t.activo} onCheckedChange={onAlternar} aria-label={`${t.activo ? 'Deactivate' : 'Activate'} ${t.titulo}`} className="mt-0.5" />
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
    <section aria-label="Templates" className="flex flex-col gap-3 self-start rounded-lg bg-white shadow-panel p-4">
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
    (p) => !elegidos.includes(p.codigo) && `${p.codigo} ${p.nombre}`.toLowerCase().includes(q.trim().toLowerCase()),
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
              <Chip key={codigo} removeLabel={`Remove ${codigo}`} onRemove={() => onCambiar(elegidos.filter((c) => c !== codigo))}>
                {codigo} - {procedimiento(codigo)?.nombre}
              </Chip>
            ))}
          </div>
        )
      )}
    </div>
  )
}

/* El texto del consentimiento: dos secciones con su rótulo y, debajo de cada caja, la guía en cursiva para quien redacta
   (no va en la hoja del paciente). Las cajas no traen nada escrito: vacías en un template nuevo. */
export function TextoConsentimiento({ naturaleza, riesgos, onNaturaleza, onRiesgos }: {
  naturaleza: string
  riesgos: string
  onNaturaleza: (v: string) => void
  onRiesgos: (v: string) => void
}) {
  const caja = 'focus:border-dash-blue w-full resize-none rounded-md border border-line bg-white px-3 py-2 text-[13px] focus:outline-none'
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium text-ink">Consent text</span>
      <ToolbarFormato />
      <div className="-mt-2 flex flex-col gap-3 rounded-b-md border border-t-0 border-line p-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold tracking-wide text-ink-muted uppercase">Nature of procedure</span>
          <textarea rows={3} value={naturaleza} onChange={(e) => onNaturaleza(e.target.value)} className={caja} />
          <span className="text-[11.5px] leading-snug text-ink-muted italic">{GUIA_NATURALEZA}</span>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold tracking-wide text-ink-muted uppercase">Risk and complications</span>
          <textarea rows={4} value={riesgos} onChange={(e) => onRiesgos(e.target.value)} className={caja} />
          <span className="text-[11.5px] leading-snug text-ink-muted italic">{GUIA_RIESGOS}</span>
        </label>
      </div>
    </div>
  )
}

/* Oculto (EDITOR_UNICO): el texto como un solo editor con la barra de formato arriba. Vacío, sólo el placeholder. */
const PROSA_EDITOR =
  '[&_h1]:mt-3 [&_h1]:mb-1 [&_h1]:text-[15px] [&_h1]:font-bold [&_h2]:mt-3 [&_h2]:mb-1 [&_h2]:text-[11px] [&_h2]:font-semibold [&_h2]:tracking-wide [&_h2]:text-ink-muted [&_h2]:uppercase [&_p]:my-1 [&_ul]:my-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-1 [&_ol]:list-decimal [&_ol]:pl-5 [&>:first-child]:mt-0'

function TextoConsentimientoUnico({ texto, onTexto }: { texto: string; onTexto: (v: string) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const escrito = useRef<string | null>(null)
  const id = useId()
  /* El editor no es controlado: sólo se reescribe cuando el texto cambia desde afuera (otro template), no al tipear. */
  useEffect(() => {
    if (ref.current && texto !== escrito.current) ref.current.innerHTML = texto
    escrito.current = texto
  }, [texto])
  return (
    <div className="flex flex-col gap-2">
      <span id={id} className="text-xs font-medium text-ink">Consent text</span>
      <div>
        <ToolbarFormato aplica />
        <div className="relative">
          {!textoPlano(texto) && (
            <span aria-hidden className="pointer-events-none absolute top-3 left-3 text-[13px] text-ink-faint">
              Write the consent text the patient will read and sign...
            </span>
          )}
          <div
            ref={ref}
            role="textbox"
            aria-multiline="true"
            aria-labelledby={id}
            contentEditable
            onFocus={() => document.execCommand('defaultParagraphSeparator', false, 'p')}
            onInput={(e) => { escrito.current = e.currentTarget.innerHTML; onTexto(escrito.current) }}
            onPaste={(e) => { e.preventDefault(); document.execCommand('insertText', false, e.clipboardData.getData('text/plain')) }}
            className={cn('focus:border-dash-blue min-h-[220px] rounded-b-md border border-line bg-white p-3 text-[13px] leading-relaxed text-ink focus:outline-none', PROSA_EDITOR)}
          />
        </div>
      </div>
    </div>
  )
}

/* El editor. El título dice qué se hace (Edit Template con su estado, o New Consent Template); Activate o Deactivate a
   la derecha; el aviso rojo arriba si se intentó guardar con faltantes; Preview, Cancel y Save fijos al pie. */
export function EditorTemplate({ actual, borrador, onBorrador, intentado, onAlternar, onCancelar, onGuardar, onPreview }: {
  actual?: ConsentTemplate
  borrador: Borrador
  onBorrador: (b: Borrador) => void
  intentado: boolean
  onAlternar: () => void
  onCancelar: () => void
  onGuardar: () => void
  onPreview: () => void
}) {
  const faltaTitulo = intentado && !borrador.titulo
  const faltaProcedimiento = intentado && borrador.procedimientos.length === 0
  return (
    <section aria-label="Template editor" className="flex flex-col gap-4 self-start rounded-lg bg-white shadow-panel p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-[200px] flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold text-ink">{actual ? 'Edit Template' : 'New Consent Template'}</h2>
            {actual && <Pill tone={actual.activo ? 'success' : 'neutral'} size="sm">{actual.activo ? 'Active' : 'Inactive'}</Pill>}
            {actual?.sistema && <Pill tone="info" size="sm">System</Pill>}
          </div>
          <p className="mt-0.5 text-xs text-ink-muted">
            {actual ? 'Preview shows the sheet with your changes. Save to keep them.' : 'Fill in the details and the text, then save to add it to the list.'}
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
      {EDITOR_UNICO ? (
        <TextoConsentimientoUnico texto={borrador.texto} onTexto={(texto) => onBorrador({ ...borrador, texto })} />
      ) : (
        <TextoConsentimiento
          naturaleza={borrador.naturaleza}
          riesgos={borrador.riesgos}
          onNaturaleza={(naturaleza) => onBorrador({ ...borrador, naturaleza })}
          onRiesgos={(riesgos) => onBorrador({ ...borrador, riesgos })}
        />
      )}

      {/* En angosto Cancel y Save bajan juntos a otra línea y Preview queda arriba. Ver consents.md (2026-10-07). */}
      <div className="sticky bottom-0 z-10 -mx-4 -mb-4 flex flex-wrap items-center justify-end gap-3 rounded-b-xl border-t border-line bg-white px-4 py-3 sm:-mx-5 sm:-mb-5 sm:px-5">
        <Button variant="secondary" className="mr-auto" onClick={onPreview}><Eye /> Preview</Button>
        <div className="flex gap-3">
          <Button variant="secondary" className="px-6" onClick={onCancelar}>Cancel</Button>
          <Button className="px-6" onClick={onGuardar}>Save</Button>
        </div>
      </div>
    </section>
  )
}

/* El preview en un drawer, abierto desde el pie del editor: el "escritorio" gris con la hoja que recibe el paciente
   (ConsentDocument). Patient View saca lo que es sólo de la clínica (diagnóstico y hallazgos). */
export function DrawerPreview({ abierto, onCerrar, borrador, vistaPaciente, onVistaPaciente, onGuardar }: {
  abierto: boolean
  onCerrar: () => void
  borrador: Borrador
  vistaPaciente: boolean
  onVistaPaciente: (v: boolean) => void
  onGuardar: () => void
}) {
  return (
    <Drawer
      open={abierto}
      onClose={onCerrar}
      title="Preview"
      description="What the patient receives"
      size="lg"
      className="bg-surface-muted"
      footer={(
        <>
          <Button variant="secondary" onClick={onCerrar}><ArrowLeft /> Back to editor</Button>
          <Button onClick={onGuardar}><Check /> Save</Button>
        </>
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] text-ink-muted">{vistaPaciente ? 'Without the clinic-only sections.' : 'With diagnosis and clinical findings.'}</p>
        <button
          type="button"
          onClick={() => onVistaPaciente(!vistaPaciente)}
          aria-pressed={vistaPaciente}
          className={cn(
            'flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors',
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
          texto={EDITOR_UNICO ? borrador.texto : undefined}
          vistaPaciente={vistaPaciente}
        />
      </div>
    </Drawer>
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
  /* Con el editor único arranca en un template nuevo y vacío; con los dos campos, en el primero de la lista. */
  const [actualId, setActualId] = useState<string | null>(EDITOR_UNICO ? null : 't1')
  const [borrador, setBorrador] = useState<Borrador>(EDITOR_UNICO ? BORRADOR_VACIO : aBorrador(TEMPLATES_INICIALES[0]))
  const [intentado, setIntentado] = useState(false)
  const [vistaPaciente, setVistaPaciente] = useState(false)
  const [preview, setPreview] = useState(false)

  const visibles = templates.filter(
    (t) => (coincideFiltro(t, filtro) || fijados.includes(t.id)) && t.titulo.toLowerCase().includes(q.trim().toLowerCase()),
  )
  const actual = templates.find((t) => t.id === actualId)

  const alternarActivo = (id: string) => {
    const t = templates.find((x) => x.id === id)
    if (!t) return
    setTemplates((ts) => ts.map((x) => (x.id === id ? { ...x, activo: !x.activo } : x)))
    setFijados((f) => (f.includes(id) ? f : [...f, id]))
    aviso.ok(`Consent template ${t.activo ? 'deactivated' : 'activated'}.`)
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
      const id = `t${Date.now()}`
      setTemplates((ts) => [...ts, { id, activo: true, sistema: false, ...borrador }])
      setActualId(id)
      aviso.ok('Consent template created.')
    }
    setIntentado(false)
  }

  return (
    <div className="@container px-4 py-6 sm:px-8">
      <SettingsPageHeader titulo="Consent Templates" bajada="Create a standard consent document and assign it to one or more procedures." />

      {/* La lista es de 288px: con 240/260 la cuarta pestaña ("All") no entraba y quedaba cortada. */}
      <div className="mt-4 grid grid-cols-1 gap-4 @3xl:grid-cols-[288px_minmax(0,1fr)]">
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
          onPreview={() => setPreview(true)}
        />
      </div>
      {/* Guardar desde el preview lo cierra: si falta algo, los errores quedan a la vista en el editor. */}
      <DrawerPreview
        abierto={preview}
        onCerrar={() => setPreview(false)}
        borrador={borrador}
        vistaPaciente={vistaPaciente}
        onVistaPaciente={setVistaPaciente}
        onGuardar={() => { setPreview(false); guardar() }}
      />
    </div>
  )
}
