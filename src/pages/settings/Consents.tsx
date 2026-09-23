import { useState } from 'react'
import {
  Search, Plus, Bold, Italic, Underline, Heading1, Heading2,
  Pilcrow, List, ListOrdered, X, MapPin, Eye, Send, Power, PowerOff,
  User, Stethoscope, CalendarDays, ClipboardList, type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Pill } from '@/components/ui/pill'
import { Switch } from '@/components/ui/switch'
import { SelectField } from '@/components/patients/form'
import { EmptyState } from '@/components/ui/empty-state'
import { aviso } from '@/components/ui/toaster'

/* Settings → Consents. Figma 4106:170620 ("New Consent Template"): lista de
   templates a la izquierda, editor del texto en el medio, preview en vivo a
   la derecha -las tres variantes del frame son el mismo estado con y sin el
   error de validación, no pantallas distintas; layout replicado, contenido
   simplificado donde hacía falta-.

   Opción 1 de las tres que planteó Julián para el flujo de consentimientos
   -la única con diseño de Figma-. Reusa piezas del sistema: Pill para los
   estados, el mismo anillo azul de fila seleccionada que usa `Seleccionable`
   en TreatmentPlanPicker.tsx, y SelectField para "Current Title" -mismo
   quirk que "First Name" en Employees.tsx: acá los campos son choices, no
   texto libre-.

   El Figma muestra "Consent text" como un solo bloque de texto enriquecido
   con encabezados inline (Nature of procedure, Risk and complications). Sin
   un editor de texto enriquecido real en este prototipo, se separaron en dos
   campos estructurados con su propio label -mismo contenido, modelo de datos
   más simple-, bajo un solo toolbar decorativo (ver comentario en
   ToolbarFormato). El heading de la pantalla queda fijo en "New Consent
   Template" aunque haya un template cargado, tal cual las tres variantes del
   frame. */

/* "Patient acknowledgment" es el mismo texto en todos los consentimientos:
   no se edita por template, sólo se muestra en el preview. */
const RECONOCIMIENTOS_PACIENTE = [
  'I have read and understand the information provided.',
  'I had the opportunity to ask questions.',
  'I voluntarily consent to the proposed treatment.',
]

/* Fechas de ejemplo del preview -no vienen del template, son del envío y de
   la cita del paciente-. */
const CONSENT_ENVIADO = 'September 23, 2026 — 10:30 AM'
const CITA = 'October 15, 2026 — 9:00 AM'

type Procedimiento = { codigo: string; nombre: string }
const PROCEDIMIENTOS_DISPONIBLES: Procedimiento[] = [
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
type ConsentTemplate = {
  id: string
  titulo: string
  activo: boolean
  sistema: boolean
  procedimientos: string[]
  naturaleza: string
  riesgos: string
}

const TEMPLATES_INICIALES: ConsentTemplate[] = [
  {
    id: 't1',
    titulo: 'Extraction Informed Consent',
    activo: true,
    sistema: false,
    procedimientos: ['D7240', 'D3948'],
    naturaleza: 'The proposed treatment has been explained to me in a way that I understood, including what will be done and why it is recommended.',
    riesgos: 'Pain, swelling, bleeding, or bruising.\nInfection or delayed healing.\nReaction to medications or anesthesia.\nNeed for additional treatment if complications occur.',
  },
  {
    id: 't2',
    titulo: 'Root Canal Consent',
    activo: true,
    sistema: false,
    procedimientos: ['D3310'],
    naturaleza: 'The proposed treatment has been explained to me in a way that I understood, including what will be done and why it is recommended.',
    riesgos: 'Alternatives to the proposed treatment, including the option of no treatment, have been discussed with me.\nPossible instrument separation or need for retreatment.\nPersistent pain or swelling after treatment.',
  },
  {
    id: 't3',
    titulo: 'Root Canal Consent – Molar',
    activo: true,
    sistema: true,
    procedimientos: ['D3320'],
    naturaleza: 'The proposed treatment has been explained to me in a way that I understood, including what will be done and why it is recommended.',
    riesgos: 'Alternatives to the proposed treatment, including the option of no treatment, have been discussed with me.\nPossible instrument separation or need for retreatment.',
  },
]

const TITULOS_SUGERIDOS = [
  'Extraction Informed Consent', 'Root Canal Consent', 'Root Canal Consent – Molar',
  'Crown & Bridge Consent', 'Implant Consent', 'HIPAA Acknowledgment',
]

const FILTROS = ['Active', 'Inactive', 'System', 'All'] as const
type Filtro = (typeof FILTROS)[number]

const coincideFiltro = (t: ConsentTemplate, f: Filtro) =>
  f === 'All' || (f === 'Active' && t.activo) || (f === 'Inactive' && !t.activo) || (f === 'System' && t.sistema)

type Borrador = {
  titulo: string
  procedimientos: string[]
  naturaleza: string
  riesgos: string
}

const BORRADOR_VACIO: Borrador = { titulo: '', procedimientos: [], naturaleza: '', riesgos: '' }
const aBorrador = (t: ConsentTemplate): Borrador => ({
  titulo: t.titulo, procedimientos: t.procedimientos, naturaleza: t.naturaleza, riesgos: t.riesgos,
})

/* Un dato del encabezado del preview con su ícono a la izquierda -paciente,
   proveedor, cita y procedimiento-. El ícono es chico y sin caja para no
   comerle ancho al texto: la columna del preview mide ~144px. */
function DatoConIcono({ icono: Icono, children }: { icono: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-1.5">
      <Icono className="text-dash-blue mt-px size-3.5 shrink-0" />
      <div className="min-w-0">{children}</div>
    </div>
  )
}

/* Toolbar decorativo: mismo trato que el botón "Select File" de Documents en
   Employees.tsx -avisa que no está disponible en vez de fingir que hace
   algo-. No hay editor de texto enriquecido real en este prototipo. */
function ToolbarFormato() {
  const iconos = [Bold, Italic, Underline, Heading1, Heading2, Pilcrow, List, ListOrdered]
  return (
    <div className="flex items-center gap-0.5 rounded-t-md border border-b-0 border-[#e4e4e7] bg-[#fafafa] px-2 py-1.5">
      {iconos.map((Icono, i) => (
        <button
          key={i}
          type="button"
          onClick={() => aviso.info('Rich text formatting is not available in this release.')}
          className="rounded p-1.5 text-[#52525b] hover:bg-black/5"
        >
          <Icono className="size-3.5" />
        </button>
      ))}
      <span className="ml-auto pr-1 text-[11px] text-[#a1a1aa]">Basic formatting only</span>
    </div>
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
  const [buscarProcedimiento, setBuscarProcedimiento] = useState('')
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

  const opcionesProcedimiento = PROCEDIMIENTOS_DISPONIBLES.filter(
    (p) => !borrador.procedimientos.includes(p.codigo)
      && `${p.codigo} ${p.nombre}`.toLowerCase().includes(buscarProcedimiento.trim().toLowerCase()),
  )

  return (
    <div className="px-4 py-6 sm:px-8">
      <h1 className="text-2xl font-bold text-[#09090b]">Consent Templates</h1>
      <p className="mt-1 text-sm text-[#71717a]">Create a standard consent document and assign it to one or more procedures.</p>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[300px_1fr_340px]">
        {/* ── Lista ─────────────────────────────────────────────────── */}
        <section className="flex flex-col gap-3 rounded-xl border border-[#e4e4e7] bg-white p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-bold text-[#09090b]">Consent Templates</h2>
            <button
              type="button"
              onClick={nuevoTemplate}
              aria-label="New Template"
              className="text-dash-blue flex items-center gap-1 text-[12px] font-semibold hover:underline"
            >
              <Plus className="size-3.5" /> New
            </button>
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#a1a1aa]" />
            <input
              value={q}
              onChange={(e) => { setQ(e.target.value); setFijados([]) }}
              placeholder="Search templates..."
              className="focus:border-dash-blue h-9 w-full rounded-md border border-[#e4e4e7] bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-[#a1a1aa] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1 rounded-lg bg-[#f1f5f9] p-1">
            {FILTROS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => { setFiltro(f); setFijados([]) }}
                className={cn(
                  'h-7 flex-1 rounded-md text-xs font-medium transition-colors',
                  filtro === f ? 'bg-dash-blue text-white' : 'text-[#64748b] hover:text-[#3f3f46]',
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex max-h-[520px] flex-col gap-2 overflow-y-auto">
            {visibles.length === 0 ? (
              <EmptyState icon={Search} title="No templates" detail="Nothing matches this search or filter." className="py-6" />
            ) : (
              visibles.map((t) => (
                <div
                  key={t.id}
                  className={cn(
                    'flex items-start gap-2 rounded-lg border px-3 py-2.5 transition-colors',
                    actualId === t.id ? 'border-dash-blue bg-[#f8faff]' : 'border-[#e4e4e7] bg-white hover:bg-[#fafafa]',
                  )}
                >
                  <button
                    type="button"
                    onClick={() => elegir(t)}
                    className="flex min-w-0 flex-1 flex-col items-start gap-1 text-left"
                  >
                    <span className={cn('w-full truncate text-[13px] font-bold', t.activo ? 'text-[#09090b]' : 'text-[#a1a1aa]')}>
                      {t.titulo}
                    </span>
                    <span className="flex flex-wrap items-center gap-1.5">
                      <Pill tone={t.activo ? 'success' : 'neutral'} size="sm">{t.activo ? 'Active' : 'Inactive'}</Pill>
                      {t.sistema && <Pill tone="info" size="sm">System</Pill>}
                      <span className="text-[11px] text-[#71717a]">
                        {t.procedimientos.length} procedure{t.procedimientos.length === 1 ? '' : 's'}
                      </span>
                    </span>
                  </button>
                  <Switch
                    checked={t.activo}
                    onCheckedChange={() => alternarActivo(t.id)}
                    aria-label={`${t.activo ? 'Deactivate' : 'Activate'} ${t.titulo}`}
                    className="mt-0.5"
                  />
                </div>
              ))
            )}
          </div>
        </section>

        {/* ── Editor ────────────────────────────────────────────────── */}
        <section className="flex flex-col gap-4 rounded-xl border border-[#e4e4e7] bg-white p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-[240px] flex-1">
              <h2 className="text-lg font-bold text-[#09090b]">New Consent Template</h2>
              <p className="mt-0.5 text-xs text-[#71717a]">Create a standard consent document and assign it to one or more procedures.</p>
            </div>
            {actual && (
              <button
                type="button"
                onClick={() => alternarActivo(actual.id)}
                className={cn(
                  'flex h-9 shrink-0 items-center gap-1.5 rounded-md px-3 text-[13px] font-medium transition-colors',
                  actual.activo
                    ? 'border border-[#e4e4e7] bg-white shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] hover:bg-[#fafafa]'
                    : 'bg-dash-blue hover:bg-dash-blue-hover text-white',
                )}
              >
                {actual.activo ? <PowerOff className="size-4" /> : <Power className="size-4" />}
                {actual.activo ? 'Deactivate template' : 'Activate template'}
              </button>
            )}
          </div>

          {intentado && (!borrador.titulo || borrador.procedimientos.length === 0) && (
            <div className="rounded-md border border-[#f3b6b6] bg-[#fff2f2] px-3 py-2.5 text-[12px] font-medium text-[#b22626]">
              All required fields marked with (*) must be completed before proceeding.
            </div>
          )}

          <SelectField
            label="Current Title"
            required
            options={TITULOS_SUGERIDOS}
            value={borrador.titulo}
            onChange={(v) => setBorrador((b) => ({ ...b, titulo: v }))}
            error={intentado && !borrador.titulo ? 'This field is required.' : undefined}
          />

          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-[#09090b]">
              Search Procedure<span className="text-[#ff0608]">*</span>
            </span>
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#a1a1aa]" />
              <input
                value={buscarProcedimiento}
                onChange={(e) => setBuscarProcedimiento(e.target.value)}
                placeholder="Search..."
                className={cn(
                  'h-9 w-full rounded-md border bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)]',
                  'placeholder:text-[#a1a1aa] focus:outline-none',
                  intentado && borrador.procedimientos.length === 0 ? 'border-[#dc2626]' : 'focus:border-dash-blue border-[#e4e4e7]',
                )}
              />
              {buscarProcedimiento && opcionesProcedimiento.length > 0 && (
                <div className="motion-safe:animate-[loc-in_120ms_ease-out] absolute top-[calc(100%+4px)] left-0 z-30 max-h-52 w-full overflow-y-auto rounded-md border border-[#e4e4e7] bg-white py-1 shadow-lg">
                  {opcionesProcedimiento.map((p) => (
                    <button
                      key={p.codigo}
                      type="button"
                      onClick={() => {
                        setBorrador((b) => ({ ...b, procedimientos: [...b.procedimientos, p.codigo] }))
                        setBuscarProcedimiento('')
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] hover:bg-[#f4f4f5]"
                    >
                      <span className="text-dash-blue font-semibold">{p.codigo}</span>
                      <span className="truncate text-[#3f3f46]">{p.nombre}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {intentado && borrador.procedimientos.length === 0 ? (
              <span className="text-[11px] leading-[1.35] text-[#dc2626]">At least one procedure must be listed.</span>
            ) : (
              borrador.procedimientos.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {borrador.procedimientos.map((codigo) => (
                    <span key={codigo} className="text-dash-blue flex items-center gap-1.5 rounded-full bg-[#f0f5ff] py-1 pr-1.5 pl-2.5 text-[12px] font-medium">
                      {codigo} - {procedimiento(codigo)?.nombre}
                      <button
                        type="button"
                        aria-label={`Remove ${codigo}`}
                        onClick={() => setBorrador((b) => ({ ...b, procedimientos: b.procedimientos.filter((c) => c !== codigo) }))}
                        className="rounded-full p-0.5 hover:bg-[#dbe6ff]"
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )
            )}
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-[#09090b]">Consent text</span>
            <ToolbarFormato />
            <div className="-mt-2 flex flex-col gap-3 rounded-b-md border border-t-0 border-[#e4e4e7] p-3">
              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold tracking-wide text-[#71717a] uppercase">Nature of procedure</span>
                <textarea
                  rows={3}
                  value={borrador.naturaleza}
                  onChange={(e) => setBorrador((b) => ({ ...b, naturaleza: e.target.value }))}
                  placeholder="Describe the procedure in plain language..."
                  className="focus:border-dash-blue w-full resize-none rounded-md border border-[#e4e4e7] bg-white px-3 py-2 text-[13px] placeholder:text-[#a1a1aa] focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold tracking-wide text-[#71717a] uppercase">Risk and complications</span>
                <textarea
                  rows={4}
                  value={borrador.riesgos}
                  onChange={(e) => setBorrador((b) => ({ ...b, riesgos: e.target.value }))}
                  placeholder={'One risk per line...'}
                  className="focus:border-dash-blue w-full resize-none rounded-md border border-[#e4e4e7] bg-white px-3 py-2 text-[13px] placeholder:text-[#a1a1aa] focus:outline-none"
                />
              </label>
            </div>
          </div>

          <div className="mt-2 flex justify-end gap-3">
            <button type="button" onClick={cancelar} className="h-9 rounded-md border border-[#e4e4e7] bg-white px-6 text-[13px] font-medium shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] hover:bg-[#fafafa]">
              Cancel
            </button>
            <button type="button" onClick={guardar} className="bg-dash-blue hover:bg-dash-blue-hover h-9 rounded-md px-6 text-[13px] font-medium text-white transition-colors">
              Save
            </button>
          </div>
        </section>

        {/* ── Preview ───────────────────────────────────────────────── */}
        <section className="h-fit rounded-xl border border-[#e4e4e7] bg-white p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-bold text-[#09090b]">Preview</h2>
            <button
              type="button"
              onClick={() => setVistaPaciente((v) => !v)}
              aria-pressed={vistaPaciente}
              className={cn(
                'flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors',
                vistaPaciente ? 'border-dash-blue bg-dash-blue text-white' : 'border-[#e4e4e7] text-[#64748b] hover:text-[#3f3f46]',
              )}
            >
              <Eye className="size-3.5" /> Patient View
            </button>
          </div>

          <div className="mt-3 flex flex-col gap-1 text-[11px] text-[#71717a]">
            <div className="flex items-center gap-1.5"><MapPin className="size-3.5 shrink-0" /> Los Angeles, Dental Clinic</div>
            <div className="flex items-center gap-1.5"><Send className="size-3.5 shrink-0" /> Consent sent: {CONSENT_ENVIADO}</div>
          </div>

          <p className="mt-3 text-[10px] font-semibold tracking-wide text-[#1d56bc] uppercase">Informed Consent</p>
          <h3 className="text-[17px] leading-tight font-bold text-[#09090b]">{borrador.titulo || 'Untitled Consent'}</h3>

          <div className="mt-3 grid grid-cols-2 gap-3 text-[12px]">
            <DatoConIcono icono={User}>
              <p className="font-bold text-[#09090b]">Sarah Stone</p>
              <p className="text-[#71717a]">DOB: 04/02/1991</p>
              <p className="text-[#71717a]">Patient ID: 12345432</p>
            </DatoConIcono>
            <DatoConIcono icono={Stethoscope}>
              <p className="font-bold text-[#09090b]">John Lorem</p>
              <p className="text-[#71717a]">Provider</p>
            </DatoConIcono>
            <DatoConIcono icono={CalendarDays}>
              <p className="font-bold text-[#09090b]">{CITA}</p>
              <p className="text-[#71717a]">Appointment</p>
            </DatoConIcono>
            <DatoConIcono icono={ClipboardList}>
              <p className="font-bold text-[#09090b]">
                {borrador.procedimientos.length > 0 ? procedimiento(borrador.procedimientos[0])?.nombre : '—'}
              </p>
              <p className="text-[#71717a]">Procedure</p>
            </DatoConIcono>
          </div>

          {!vistaPaciente && (
            <div className="mt-3 flex flex-col gap-2 border-t border-[#f1f1f4] pt-3 text-[12px]">
              <div>
                <p className="text-[10px] font-semibold tracking-wide text-[#71717a] uppercase">Diagnosis</p>
                <p className="text-[#3f3f46]">Non-restorable tooth with recurrent infection.</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-wide text-[#71717a] uppercase">Clinical Findings</p>
                <p className="text-[#3f3f46]">Extensive decay affecting tooth structure and surrounding tissue.</p>
              </div>
            </div>
          )}

          <div className="mt-3 border-t border-[#f1f1f4] pt-3 text-[12px]">
            <p className="text-[10px] font-semibold tracking-wide text-[#71717a] uppercase">Nature of procedure</p>
            <p className="mt-1 text-[#3f3f46]">{borrador.naturaleza || 'No content yet.'}</p>
          </div>

          <div className="mt-3 text-[12px]">
            <p className="text-[10px] font-semibold tracking-wide text-[#71717a] uppercase">Risk and complications</p>
            {borrador.riesgos ? (
              <ul className="mt-1 list-disc pl-4 text-[#3f3f46]">
                {borrador.riesgos.split('\n').filter(Boolean).map((linea, i) => <li key={i}>{linea}</li>)}
              </ul>
            ) : (
              <p className="mt-1 text-[#3f3f46]">No content yet.</p>
            )}
          </div>

          <div className="mt-3 rounded-lg bg-[#f0f5ff] p-3 text-[12px]">
            <ul className="text-dash-blue-hover list-disc space-y-1 pl-4 font-medium">
              {RECONOCIMIENTOS_PACIENTE.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </div>

          <div className="mt-4 border-t border-dashed border-[#d4d4d8] pt-2 text-[11px] text-[#a1a1aa]">
            Patient / Legal Guardian
          </div>
        </section>
      </div>
    </div>
  )
}
