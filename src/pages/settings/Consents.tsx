import { PADDING_PAGINA } from '@/lib/estilos'
import { useEffect, useId, useRef, useState } from 'react'
import { Chip } from '@/components/ui/chip'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { Search, Plus, Bold, Italic, Underline, Heading1, Heading2, Pilcrow, List, ListOrdered, Eye, ArrowLeft, Info, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { cn } from '@/lib/utils'
import { Pill } from '@/components/ui/pill'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { EncabezadoEditor, GRILLA_LISTA_EDITOR, ItemLista, PanelLista, PieEditor, TARJETA_EDITOR } from '@/components/settings/ListaEditor'
import { SelectField } from '@/components/patients/form'
import { aviso } from '@/components/ui/toaster'
import { textoPlano } from '@/components/settings/ConsentDocument'
import { HojaConsentimientoPdf } from '@/components/settings/HojaConsentimientoPdf'
import { Tabs } from '@/components/ui/tabs'
import { PROCEDURES } from '@/components/clinical/dental/data'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { OBLIGATORIO } from '@/lib/validacion'

/* Settings → Consents. Figma 4106:170620 ("New consent template"): lista de
   templates a la izquierda y editor del texto -las tres variantes del frame son
   el mismo estado con y sin el error de validación, no pantallas distintas-.
   El preview, que en el Figma es una tercera columna, se abre a pantalla completa
   desde el pie del editor, como red.dev (CON-4094; consents.md, 2026-11-24).

   Opción 1 de las tres que planteó Julián para el flujo de consentimientos
   -la única con diseño de Figma-. Reusa piezas del sistema: Pill para los
   estados, el mismo anillo azul de fila seleccionada que usa `Seleccionable`
   en TreatmentPlanPicker.tsx, y SelectField para "Current title" -mismo
   quirk que "First name" en Employees.tsx: acá los campos son choices, no
   texto libre-.

   "Consent text" son dos campos con su rótulo y su guía (Nature of procedure,
   Risk and complications), vacíos en un template nuevo. La versión de un solo
   editor enriquecido queda oculta detrás de EDITOR_UNICO. Las partes (lista, tarjeta, editor, procedimientos, texto,
   preview) se exportan para documentarlas en el design system; ver
   design-reference/figma/modulos/consents.md. */

export type Procedimiento = { codigo: string; nombre: string }
const DE_LOS_TEMPLATES: Procedimiento[] = [
  { codigo: 'D7240', nombre: 'Removal of impacted tooth' },
  { codigo: 'D3948', nombre: 'Extraction, angled tooth' },
  { codigo: 'D3310', nombre: 'Root canal therapy, anterior' },
  { codigo: 'D3320', nombre: 'Root canal therapy, premolar' },
  { codigo: 'D2740', nombre: 'Crown – porcelain/ceramic' },
]
/* Los de los templates más el catálogo CDT de la app, por código: el buscador los lista todos al abrirse, como red.dev. */
export const PROCEDIMIENTOS_DISPONIBLES: Procedimiento[] = [
  ...DE_LOS_TEMPLATES,
  ...PROCEDURES.filter((p) => !DE_LOS_TEMPLATES.some((t) => t.codigo === p.code)).map((p) => ({ codigo: p.code, nombre: p.label })),
].sort((a, b) => a.codigo.localeCompare(b.codigo))
const procedimiento = (codigo: string) => PROCEDIMIENTOS_DISPONIBLES.find((p) => p.codigo === codigo)
/* "D7240 - Removal of impacted tooth", como en los chips y en los textos de CON-3719 y CON-3725. */
const conNombre = (codigo: string) => `${codigo} - ${procedimiento(codigo)?.nombre ?? ''}`
const enLista = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')}, and ${xs[xs.length - 1]}`)

/* El cuerpo de Deactivate consent template? (CON-3719): los procedimientos que dejan de tener consentimiento automático. */
function TextoDesactivar({ t }: { t: ConsentTemplate }) {
  const uno = t.procedimientos.length === 1
  return (
    <>
      <p>This template is currently assigned to the following procedure{uno ? '' : 's'}:</p>
      <ul className="my-2 flex flex-col gap-0.5 font-medium text-ink">
        {t.procedimientos.map((c) => <li key={c}>{conNombre(c)}</li>)}
      </ul>
      <p>
        Deactivating this template will disable the automatic consent flow for {uno ? 'this procedure' : 'these procedures'}. No new
        consent documents will be generated for {uno ? 'it' : 'them'} until an active consent template is assigned.
      </p>
    </>
  )
}

/* `activo` y `sistema` son independientes: "System" dice de dónde viene el
   template (viene con el producto), "activo" si hoy se ofrece o no. Un
   template de sistema no se activa, desactiva ni borra (CON-3719, CON-3725). */
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

/* Las pestañas de la lista, como red.dev: Active, System y All (Inactive queda en All). */
const FILTROS = ['Active', 'System', 'All'] as const
export type Filtro = (typeof FILTROS)[number]

const coincideFiltro = (t: ConsentTemplate, f: Filtro) =>
  f === 'All' || (f === 'Active' && t.activo) || (f === 'System' && t.sistema)

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
   con los dos campos de texto no hay formato y avisa, como el botón "Select file" de Employees. */
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

/* Una tarjeta de la lista (ItemLista, común con Coverage tables): título (hasta dos líneas), estado, System si viene con el
   producto y cuántos procedimientos usa. Activate / Deactivate y Delete van en el ⋮ (consents.md, 2026-11-24). */
export function TarjetaTemplate({ t, elegida, onElegir, onAlternar, onBorrar = () => {} }: {
  t: ConsentTemplate
  elegida: boolean
  onElegir: () => void
  onAlternar: () => void
  onBorrar?: () => void
}) {
  return (
    <ItemLista
      nombre={t.titulo} activo={t.activo} elegido={elegida} onElegir={onElegir} onAlternar={onAlternar} onBorrar={onBorrar}
      bloqueado={t.sistema ? 'System templates come with the product and can’t be deactivated or deleted.' : undefined}
      extra={(
        <>
          {t.sistema && <Pill tone="info" size="sm">System</Pill>}
          <span className="text-[11px] text-ink-muted">{t.procedimientos.length} procedure{t.procedimientos.length === 1 ? '' : 's'}</span>
        </>
      )}
    />
  )
}

/* El panel de la izquierda, como red.dev: buscador (con X para borrar) y debajo las pestañas Active, System y All a todo
   el ancho, y la lista. New template va en el título de la pantalla (consents.md, 2026-11-20 y 2026-11-24). */
export function ListaTemplates({ templates, elegidoId, q, onQ, filtro, onFiltro, onElegir, onAlternar, onBorrar = () => {} }: {
  templates: ConsentTemplate[]
  elegidoId: string | null
  q: string
  onQ: (q: string) => void
  filtro: Filtro
  onFiltro: (f: Filtro) => void
  onElegir: (t: ConsentTemplate) => void
  onAlternar: (id: string) => void
  onBorrar?: (t: ConsentTemplate) => void
}) {
  return (
    <PanelLista
      titulo="Templates" q={q} onQ={onQ} placeholder="Search templates" vacio={templates.length === 0}
      pestanas={<Tabs aria-label="Template status" size="sm" fullWidth tabs={FILTROS} value={filtro} onChange={onFiltro} />}
    >
      {templates.map((t) => (
        <TarjetaTemplate key={t.id} t={t} elegida={elegidoId === t.id} onElegir={() => onElegir(t)} onAlternar={() => onAlternar(t.id)} onBorrar={() => onBorrar(t)} />
      ))}
    </PanelLista>
  )
}

/* Buscar y sumar procedimientos, como red.dev: al hacer foco abre la lista de todos los que no están elegidos, filtra
   mientras se escribe (X para borrar) y sin coincidencias dice No results found. Flechas, Enter y Escape. Los elegidos
   quedan como chips que se sacan con la X. Obligatorio: con el error, el borde en rojo y el mensaje en lugar de los chips. */
export function SelectorProcedimientos({ elegidos, onCambiar, error }: {
  elegidos: string[]
  onCambiar: (codigos: string[]) => void
  error?: boolean
}) {
  const [q, setQ] = useState('')
  const [abierto, setAbierto] = useState(false)
  const [activo, setActivo] = useState(0)
  const lista = useRef<HTMLUListElement>(null)
  const opciones = PROCEDIMIENTOS_DISPONIBLES.filter(
    (p) => !elegidos.includes(p.codigo) && `${p.codigo} ${p.nombre}`.toLowerCase().includes(q.trim().toLowerCase()),
  )
  const elegir = (codigo: string) => { onCambiar([...elegidos, codigo]); setQ(''); setActivo(0) }
  const mover = (paso: number) => {
    const i = Math.max(0, Math.min(opciones.length - 1, activo + paso))
    setActivo(i)
    lista.current?.children[i]?.scrollIntoView({ block: 'nearest' })
  }
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="consent-procedimiento" className="text-xs font-medium text-ink">
        Search procedure<span className="text-required">*</span>
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
        <input
          id="consent-procedimiento"
          role="combobox"
          aria-expanded={abierto}
          aria-controls="consent-procedimientos"
          aria-activedescendant={abierto && opciones[activo] ? `consent-proc-${opciones[activo].codigo}` : undefined}
          autoComplete="off"
          value={q}
          onChange={(e) => { setQ(e.target.value); setActivo(0); setAbierto(true) }}
          onFocus={() => setAbierto(true)}
          onBlur={() => setAbierto(false)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') { e.preventDefault(); if (!abierto) setAbierto(true); else mover(1) }
            else if (e.key === 'ArrowUp') { e.preventDefault(); mover(-1) }
            else if (e.key === 'Enter' && abierto && opciones[activo]) { e.preventDefault(); elegir(opciones[activo].codigo) }
            else if (e.key === 'Escape' && abierto) { e.stopPropagation(); setAbierto(false) }
          }}
          placeholder="Search procedures"
          aria-invalid={error || undefined}
          className={cn(
            'h-9 w-full rounded-md border bg-white pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none',
            q ? 'pr-9' : 'pr-3',
            error ? 'border-field-error' : 'focus:border-dash-blue border-line',
          )}
        />
        {q && (
          <button
            type="button" aria-label="Clear search" onMouseDown={(e) => e.preventDefault()} onClick={() => { setQ(''); setActivo(0) }}
            className="absolute top-1/2 right-2 flex size-6 -translate-y-1/2 items-center justify-center rounded text-ink-muted hover:bg-surface-muted"
          >
            <X className="size-3.5" />
          </button>
        )}
        {abierto && (
          <div className="motion-safe:animate-[loc-in_120ms_ease-out] absolute top-[calc(100%+4px)] left-0 z-30 w-full overflow-hidden rounded-md border border-line bg-white shadow-lg">
            {opciones.length === 0 ? (
              <p className="px-3 py-10 text-center text-[13px] text-ink-muted">No results found.</p>
            ) : (
              <ul ref={lista} id="consent-procedimientos" role="listbox" aria-label="Procedures" className="max-h-[320px] overflow-y-auto">
                {opciones.map((p, i) => (
                  <li
                    key={p.codigo} id={`consent-proc-${p.codigo}`} role="option" aria-selected={i === activo}
                    onMouseDown={(e) => e.preventDefault()} onClick={() => elegir(p.codigo)} onMouseEnter={() => setActivo(i)}
                    className={cn('cursor-pointer border-b border-line-row px-3 py-2 text-[13px] text-ink last:border-b-0', i === activo && 'bg-info-bg')}
                  >
                    {p.codigo} - {p.nombre}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      {error ? (
        <span className="text-[11px] leading-[1.35] text-field-error">{OBLIGATORIO}</span>
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
          <span className="text-[12px] leading-snug text-ink-muted italic">{GUIA_NATURALEZA}</span>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold tracking-wide text-ink-muted uppercase">Risk and complications</span>
          <textarea rows={4} value={riesgos} onChange={(e) => onRiesgos(e.target.value)} className={caja} />
          <span className="text-[12px] leading-snug text-ink-muted italic">{GUIA_RIESGOS}</span>
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

/* El editor. El título dice qué se hace (Edit template con su estado, o New consent template), sin bajada; el aviso rojo
   arriba si se intentó guardar con faltantes; Preview, Cancel y Save fijos al pie. Activate / Deactivate está en el ⋮ de
   la lista (consents.md, 2026-11-24). */
export function EditorTemplate({ actual, borrador, onBorrador, intentado, onCancelar, onGuardar, onPreview }: {
  actual?: ConsentTemplate
  borrador: Borrador
  onBorrador: (b: Borrador) => void
  intentado: boolean
  onCancelar: () => void
  onGuardar: () => void
  onPreview: () => void
}) {
  const faltaTitulo = intentado && !borrador.titulo
  const faltaProcedimiento = intentado && borrador.procedimientos.length === 0
  return (
    <section aria-label="Template editor" className={TARJETA_EDITOR}>
      <EncabezadoEditor titulo={actual ? 'Edit template' : 'New consent template'} activo={actual?.activo} />

      {(faltaTitulo || faltaProcedimiento) && (
        <div role="alert" className="rounded-md border border-dash-bad-fg/30 bg-dash-bad-bg px-3 py-2.5 text-[12px] font-medium text-dash-bad-fg">
          All required fields marked with (*) must be completed before proceeding.
        </div>
      )}

      <SelectField
        label="Current title"
        required
        options={TITULOS_SUGERIDOS}
        value={borrador.titulo}
        onChange={(v) => onBorrador({ ...borrador, titulo: v })}
        error={faltaTitulo ? OBLIGATORIO : undefined}
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

      <PieEditor izquierda={<Button variant="secondary" onClick={onPreview}><Eye /> Preview</Button>} onCancelar={onCancelar} onGuardar={onGuardar} />
    </section>
  )
}

/* El preview a pantalla completa, como red.dev (CON-4094, patrón Patient View): tapa la app, arriba Back to editing y
   "Patient View - título", el aviso de que incluye lo que no se guardó y la hoja con el formato del PDF. No guarda nada:
   volver deja el formulario como estaba. Escape también vuelve. */
export function PreviewPaciente({ abierto, onCerrar, borrador }: {
  abierto: boolean
  onCerrar: () => void
  borrador: Borrador
}) {
  const primero = borrador.procedimientos[0]
  return (
    <DialogPrimitive.Root open={abierto} onOpenChange={(o) => { if (!o) onCerrar() }}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content aria-describedby={undefined} className="fixed inset-0 z-50 overflow-y-auto bg-white outline-none motion-safe:animate-[loc-in_150ms_ease-out]">
          <div className="mx-auto flex max-w-[900px] flex-col gap-4 px-4 py-5 sm:px-6 sm:py-6">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <Button variant="secondary" size="sm" onClick={onCerrar}><ArrowLeft /> Back to editing</Button>
              <DialogPrimitive.Title className="min-w-0 text-sm font-semibold text-ink">
                Patient View - {borrador.titulo || 'Untitled template'}
              </DialogPrimitive.Title>
            </div>
            <p role="note" className="flex items-center gap-2 rounded-md border border-line bg-surface-subtle px-3 py-2.5 text-[13px] text-ink-muted">
              <Info className="size-4 shrink-0" aria-hidden /> Preview includes your unsaved changes. Save the template to keep them.
            </p>
            <HojaConsentimientoPdf
              titulo={borrador.titulo}
              procedimiento={primero ? `${primero} — ${procedimiento(primero)?.nombre ?? ''}` : undefined}
              naturaleza={borrador.naturaleza}
              riesgos={borrador.riesgos}
            />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
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
  const [preview, setPreview] = useState(false)
  const [aBorrar, setABorrar] = useState<ConsentTemplate>()
  const [aDesactivar, setADesactivar] = useState<ConsentTemplate>()

  const visibles = templates.filter(
    (t) => (coincideFiltro(t, filtro) || fijados.includes(t.id)) && t.titulo.toLowerCase().includes(q.trim().toLowerCase()),
  )
  const actual = templates.find((t) => t.id === actualId)

  /* CON-3719: desactivar pide confirmación con los procedimientos afectados. CON-3725: activar no puede dejar un
     procedimiento con dos templates activos. Los System no se tocan (consents.md, 2026-11-24). */
  const cambiarActivo = (t: ConsentTemplate, activo: boolean) => {
    setTemplates((ts) => ts.map((x) => (x.id === t.id ? { ...x, activo } : x)))
    setFijados((f) => (f.includes(t.id) ? f : [...f, t.id]))
    aviso.ok(`The consent template has been successfully ${activo ? 'activated' : 'deactivated'}.`)
  }

  const alternarActivo = (id: string) => {
    const t = templates.find((x) => x.id === id)
    if (!t || t.sistema) return
    if (t.activo) { setADesactivar(t); return }
    if (t.procedimientos.length === 0) { aviso.error('At least one procedure must be selected to activate this consent template.'); return }
    const ocupados = t.procedimientos.filter((c) => templates.some((x) => x.id !== t.id && x.activo && x.procedimientos.includes(c)))
    if (ocupados.length) {
      const nombres = ocupados.map(conNombre)
      aviso.error(nombres.length === 1
        ? `A procedure can only have one active consent template. The procedure ${nombres[0]} already has an active consent template.`
        : `A procedure can only have one active consent template. The following procedures already have one: ${enLista(nombres)}.`)
      return
    }
    cambiarActivo(t, true)
  }

  const elegir = (t: ConsentTemplate) => {
    setActualId(t.id)
    setBorrador(aBorrador(t))
    setIntentado(false)
  }

  /* Borrar el que está abierto pasa al primero que queda en la lista; sin ninguno, a un template nuevo. */
  const borrar = (t: ConsentTemplate) => {
    setABorrar(undefined)
    const indice = templates.findIndex((x) => x.id === t.id)
    const quedan = templates.filter((x) => x.id !== t.id)
    setTemplates(quedan)
    if (t.id === actualId) {
      const siguiente = quedan.find((x) => visibles.some((v) => v.id === x.id))
      if (siguiente) elegir(siguiente)
      else nuevoTemplate()
    }
    aviso.ok(`${t.titulo} was deleted.`, {
      label: 'Undo', onClick: () => setTemplates((ts) => [...ts.slice(0, indice), t, ...ts.slice(indice)]),
    })
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
    <div className={cn('@container', PADDING_PAGINA)}>
      <SettingsPageHeader
        titulo="Consent templates"
        accion={<Button size="md" onClick={nuevoTemplate}><Plus /> New template</Button>}
      />

      <div className={GRILLA_LISTA_EDITOR}>
        <ListaTemplates
          templates={visibles}
          elegidoId={actualId}
          q={q}
          onQ={(v) => { setQ(v); setFijados([]) }}
          filtro={filtro}
          onFiltro={(f) => { setFiltro(f); setFijados([]) }}
          onElegir={elegir}
          onAlternar={alternarActivo}
          onBorrar={setABorrar}
        />
        <EditorTemplate
          actual={actual}
          borrador={borrador}
          onBorrador={setBorrador}
          intentado={intentado}
          onCancelar={cancelar}
          onGuardar={guardar}
          onPreview={() => setPreview(true)}
        />
      </div>
      {aDesactivar && (
        <ConfirmDialog
          title="Deactivate consent template?" icon="warning" confirmLabel="Deactivate"
          onCancel={() => setADesactivar(undefined)} onConfirm={() => { cambiarActivo(aDesactivar, false); setADesactivar(undefined) }}
        >
          <TextoDesactivar t={aDesactivar} />
        </ConfirmDialog>
      )}
      {aBorrar && (
        <ConfirmDialog
          title="Delete template?" tone="danger" icon="delete" confirmLabel="Delete"
          onCancel={() => setABorrar(undefined)} onConfirm={() => borrar(aBorrar)}
        >
          “{aBorrar.titulo}” will be removed from the list.
        </ConfirmDialog>
      )}
      <PreviewPaciente abierto={preview} onCerrar={() => setPreview(false)} borrador={borrador} />
    </div>
  )
}
