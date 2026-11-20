import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { Baby, FileText, Plus, User, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DatePicker } from '@/components/ui/date-picker'
import { Pill } from '@/components/ui/pill'
import { FieldError, FieldLabel, SearchField, TextArea } from '@/components/patients/form'
import { SurfaceWheel, type Surface } from './dental/SurfaceWheel'
import { PROCEDURES } from './dental/data'
import { TARJETA_PANEL } from '@/lib/estilos'
import type { PendingTask } from '@/components/dashboard/PendingTaskCard'
import { MenuTarea, SIN_ENCUENTRO, TONO_ESTADO, type AccionUI } from '@/components/dashboard/tareas'

/* El detalle de una Lab Order, el que abre Complete this Task desde Pending Task (red.dev, videos de Julián del
   2026-11-20): LAB ORDER con Delivery Expiration Date, estado, PDF y ⋮ arriba; General Information (laboratorio, ASAP,
   procedimientos, dientes y superficies) y Details (trabajo pedido, indicaciones, adjuntos); Cancel y Save abajo. Sin un
   encuentro abierto con el paciente se ve en sólo lectura, pero la dentición se puede cambiar para mirar, como en
   red.dev. Ver design-reference/figma/modulos/clinical-mode.md (2026-11-20). */

const LABORATORIOS = ['Olivos Laboratory', 'North Dental Lab', 'Smile Lab Studio']
const PROCEDIMIENTOS = PROCEDURES.map((p) => \`\${p.code} - \${p.label}\`)
const PERMANENTES = { arriba: Array.from({ length: 16 }, (_, i) => String(i + 1)), abajo: Array.from({ length: 16 }, (_, i) => String(32 - i)) }
const PRIMARIOS = { arriba: 'ABCDEFGHIJ'.split(''), abajo: 'TSRQPONMLK'.split('') }

type Denticion = 'Permanent' | 'Primary'

/* El título de cada caja con su ícono, como red.dev. */
const Titulo = ({ icono: Icono, children }: { icono: LucideIcon; children: string }) => (
  <h3 className="flex items-center gap-3 text-[15px] font-semibold text-ink">
    <span className="flex size-8 items-center justify-center rounded-md border border-line"><Icono className="size-4" aria-hidden /></span>
    {children}
  </h3>
)

export function LabOrderDetail({ tarea, abierto, onVolver, onAccion }: {
  tarea: PendingTask
  /** Hay un encuentro abierto con el paciente: se puede editar y guardar. */
  abierto: boolean
  onVolver: () => void
  onAccion: (t: PendingTask, a: AccionUI) => void
}) {
  const [vence, setVence] = useState<Date | null>(() => { const f = new Date(tarea.expiration); return Number.isNaN(f.getTime()) ? null : f })
  const [lab, setLab] = useState('Olivos Laboratory')
  const [asap, setAsap] = useState(false)
  const [procedimiento, setProcedimiento] = useState('')
  /* Hasta elegir la dentición se ven los dos botones "Initialize…", como red.dev. */
  const [denticion, setDenticion] = useState<Denticion | null>(null)
  const [dientes, setDientes] = useState<string[]>([])
  const [actual, setActual] = useState<string | null>(null)
  const [superficies, setSuperficies] = useState<Record<string, Surface[]>>({})
  const [trabajo, setTrabajo] = useState('')
  const [indicaciones, setIndicaciones] = useState('')
  const [adjuntos, setAdjuntos] = useState<string[]>([])
  const [errores, setErrores] = useState<Record<string, string>>({})

  const filas = denticion === 'Primary' ? PRIMARIOS : PERMANENTES
  const todos = [...filas.arriba, ...filas.abajo]
  const elegirDenticion = (d: Denticion) => { setDenticion(d); setDientes([]); setActual(null); setSuperficies({}) }
  const tocarDiente = (d: string) => {
    const esta = dientes.includes(d)
    setDientes(esta ? dientes.filter((x) => x !== d) : [...dientes, d])
    setActual(esta ? (actual === d ? null : actual) : d)
  }
  /* Toggle all marca todos los dientes o, si ya están todos, los saca. Apply to unset copia las superficies del diente
     actual a los marcados que todavía no tienen. */
  const alternarTodos = () => { const todosMarcados = dientes.length === todos.length; setDientes(todosMarcados ? [] : todos); setActual(todosMarcados ? null : actual ?? todos[0]!) }
  const actuales = actual ? superficies[actual] ?? [] : []
  const aplicarASinMarcar = () => setSuperficies(Object.fromEntries([...Object.entries(superficies), ...dientes.filter((d) => !superficies[d]?.length).map((d) => [d, actuales])]))

  const guardar = () => {
    const e: Record<string, string> = {}
    if (!vence) e.vence = 'Pick the delivery expiration date.'
    if (!lab.trim()) e.lab = 'Choose the receiving laboratory.'
    if (!trabajo.trim()) e.trabajo = 'Describe the dental work requested.'
    setErrores(e)
    if (Object.keys(e).length) return
    aviso.ok(\`Lab order for \${tarea.person} saved.\`)
    onVolver()
  }

  const diente = (d: string) => (
    <button
      key={d} type="button" onClick={() => tocarDiente(d)} disabled={!abierto} aria-pressed={dientes.includes(d)} aria-label={\`Tooth \${d}\`}
      className={cn(
        'flex size-6 items-center justify-center rounded-md text-[11px] font-semibold tabular-nums transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue disabled:cursor-not-allowed disabled:opacity-50',
        dientes.includes(d) ? 'bg-dash-blue text-white' : 'bg-surface-subtle text-ink hover:bg-surface-muted',
        actual === d && 'ring-2 ring-dash-blue ring-offset-1',
      )}
    >
      {d}
    </button>
  )
  const botonDenticion = (d: Denticion, texto: string, Icono: LucideIcon) => (
    <Button key={d} size="sm" variant={denticion === d ? 'primary' : 'secondary'} aria-pressed={denticion === d} onClick={() => elegirDenticion(d)}>
      <Icono /> {texto}
    </Button>
  )

  return (
    <div className="flex flex-col gap-4">
      {!abierto && <Alert tone="warning" title="Read-only mode">{SIN_ENCUENTRO}</Alert>}

      {/* La cabecera: qué es, hasta cuándo, en qué estado y sus acciones. */}
      <div className={cn(TARJETA_PANEL, 'flex flex-wrap items-center gap-3 px-4 py-3 sm:px-6')}>
        <h2 className="text-[15px] font-semibold text-ink uppercase">Lab order</h2>
        <span className="ml-auto flex flex-wrap items-center gap-3">
          <fieldset disabled={!abierto} className="flex items-center gap-2">
            <FieldLabel required>Delivery expiration date</FieldLabel>
            <DatePicker value={vence} onChange={setVence} error={!!errores.vence} className="w-40" />
          </fieldset>
          <Pill tone={TONO_ESTADO[tarea.state] ?? 'info'}>{tarea.state}</Pill>
          <Button variant="secondary" size="sm" onClick={() => onAccion(tarea, 'PDF')} aria-label="Open PDF" title="Open PDF"><FileText /></Button>
          <MenuTarea task={tarea} abierto={abierto} onAccion={onAccion} sin={['Edit']} />
        </span>
        {errores.vence && <span className="w-full text-right"><FieldError>{errores.vence}</FieldError></span>}
      </div>

      <div className="grid min-w-0 gap-4 lg:grid-cols-2">
        <section className={cn(TARJETA_PANEL, 'flex flex-col gap-4 p-4 sm:p-5')} aria-label="General information">
          <Titulo icono={FileText}>General information</Titulo>
          <div className="flex items-end gap-2">
            <SearchField label="Receiving laboratory" required className="min-w-0 flex-1" options={LABORATORIOS} value={lab} onChange={setLab} error={errores.lab} disabled={!abierto} />
            <Button variant="secondary" disabled={!abierto} className={cn(errores.lab && 'mb-6')} onClick={() => aviso.info('New laboratory is not available in this release.')}><Plus /> New laboratory</Button>
          </div>
          <label className="flex w-fit items-center gap-2 text-[13px] text-ink">
            <Checkbox on={asap} onChange={setAsap} label="ASAP" disabled={!abierto} /> ASAP
          </label>
          <SearchField label="Procedures" placeholder="Search by code or description" options={PROCEDIMIENTOS} value={procedimiento} onChange={setProcedimiento} disabled={!abierto} />

          <div className="flex flex-col gap-3">
            <FieldLabel>Teeth &amp; surface</FieldLabel>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Dentition">
              {denticion
                ? [botonDenticion('Permanent', 'Permanent', User), botonDenticion('Primary', 'Primary', Baby)]
                : [botonDenticion('Permanent', 'Initialize permanent dentition', User), botonDenticion('Primary', 'Initialize primary dentition', Baby)]}
            </div>
            {denticion && (
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                <div className="flex flex-col gap-1.5 overflow-x-auto" role="group" aria-label={\`\${denticion} teeth\`}>
                  <span className="text-[11px] text-ink-muted">Maxillary</span>
                  <div className="flex flex-wrap gap-0.5">{filas.arriba.map(diente)}</div>
                  <span className="mt-1 text-[11px] text-ink-muted">Mandibular</span>
                  <div className="flex flex-wrap gap-0.5">{filas.abajo.map(diente)}</div>
                </div>
                <div className={cn('flex shrink-0 flex-col items-center gap-2', !abierto && 'pointer-events-none opacity-50')} aria-disabled={!abierto || undefined}>
                  <SurfaceWheel size={150} value={actuales} onChange={(s) => actual && setSuperficies({ ...superficies, [actual]: s })} />
                  <span className="text-[11px] text-ink-muted">{actual ? \`Surfaces of tooth \${actual}\` : 'Pick a tooth to mark its surfaces'}</span>
                  <span className="flex gap-2">
                    <Button size="sm" variant="secondary" disabled={!abierto} onClick={alternarTodos}>Toggle all</Button>
                    <Button size="sm" variant="secondary" disabled={!abierto || !actuales.length} onClick={aplicarASinMarcar}>Apply to unset</Button>
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>

        <fieldset disabled={!abierto} className={cn(TARJETA_PANEL, 'flex min-w-0 flex-col gap-4 p-4 sm:p-5')} aria-label="Details">
          <Titulo icono={FileText}>Details</Titulo>
          <TextArea label="Dental work requested" required rows={3} value={trabajo} onChange={setTrabajo} error={errores.trabajo} disabled={!abierto} />
          <TextArea label="Special instructions" rows={3} placeholder="Enter special instructions" value={indicaciones} onChange={setIndicaciones} disabled={!abierto} />
          <div className="flex flex-col gap-2">
            <FieldLabel>Attachments</FieldLabel>
            <div className="flex flex-col items-center gap-2 rounded-lg border-2 border-dashed border-line-strong px-4 py-6 text-center">
              <FileText className="text-dash-blue size-6" aria-hidden />
              <span className="text-[13px] font-semibold text-ink">Drag and drop your files</span>
              <span className="text-[11px] text-ink-muted">PDF, JPG, PNG, up to 10MB</span>
              <label className={cn('h-8 rounded-md border border-line bg-white px-3 text-[13px] leading-8 font-medium', abierto ? 'cursor-pointer hover:bg-surface-subtle' : 'cursor-not-allowed opacity-50')}>
                Select file
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="sr-only" disabled={!abierto} onChange={(e) => { const n = e.target.files?.[0]?.name; if (n) setAdjuntos([...adjuntos, n]) }} />
              </label>
              {adjuntos.length > 0 && <ul className="text-[12px] text-ink">{adjuntos.map((a) => <li key={a}>{a}</li>)}</ul>}
            </div>
          </div>
        </fieldset>
      </div>

      <div className="flex justify-between gap-3">
        <Button variant="secondary" onClick={onVolver}>Cancel</Button>
        <Button onClick={guardar} disabled={!abierto}>Save</Button>
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};