import { useState } from 'react'
import { FileText, Plus, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Chip } from '@/components/ui/chip'
import { DatePicker } from '@/components/ui/date-picker'
import { FilterMenu } from '@/components/ui/filter-menu'
import { Pill } from '@/components/ui/pill'
import { SearchPicker } from '@/components/ui/search-picker'
import { FieldError, FieldLabel, FormFooter, SearchField, TextArea } from '@/components/patients/form'
import { Card } from '@/components/settings/primitives'
import { SurfaceWheel, type Surface } from './dental/SurfaceWheel'
import { DentalArch } from './dental/DentalArch'
import { NewLaboratoryDrawer } from './NewLaboratoryDrawer'
import { Adjuntos, EncabezadoFicha, type Adjunto } from './FichaClinica'
import { TONO_PROCEDIMIENTO } from './accionesProcedimiento'
import { TARJETA_INTERNA } from '@/lib/estilos'
import { PROCEDIMIENTOS, PROCEDIMIENTOS_ORDEN, VINCULOS_PROCEDIMIENTO, type ProcedimientoPaciente } from '@/data/clinical-mode'
import { ARCADAS, LABORATORIOS, type Denticion, type Laboratorio } from '@/data/laboratorios'
import { CASOS } from '@/data/treatment-plan'
import type { PendingTask } from '@/components/dashboard/PendingTaskCard'
import { MenuTarea, SIN_ENCUENTRO, TONO_ESTADO, type AccionUI } from '@/components/dashboard/tareas'

/* El detalle de una Lab Order, el que abren Complete this Task y Edit desde Pending Task. Mismos datos y acciones que
   red.dev (videos de Julián del 2026-11-20 y 2026-11-25) con la estructura de Edit account (FichaClinica): título con
   estado y acciones, cards General information, Teeth & surface y Details, y Cancel / Save abajo a la derecha. Sólo se edita con un encuentro abierto y la orden en Pending (CON-2218).
   Ver design-reference/figma/modulos/clinical-mode.md (2026-11-25). */

const NO_EDITABLE = 'This lab order cannot be edited because it is not in an editable state.'

type Elegible = ProcedimientoPaciente & { caso?: string }

/* CON-3904: sueltos en Planned, o Pending / In progress de un caso aceptado. */
const ELEGIBLES: Elegible[] = PROCEDIMIENTOS.flatMap((p) => {
  const caso = CASOS.find((c) => c.id === VINCULOS_PROCEDIMIENTO[p.id]?.caso?.id)
  if (!caso) return p.estado === 'Planned' ? [p] : []
  return caso.aceptado && ['Waiting for consent', 'Accepted', 'In progress'].includes(caso.estado) && ['Pending', 'In progress'].includes(p.estado)
    ? [{ ...p, caso: caso.nombre }]
    : []
})

const Procedimiento = ({ p }: { p: Elegible }) => (
  <span className="flex min-w-0 flex-col gap-1.5">
    <span className="flex flex-wrap items-center gap-1.5">
      {p.caso && <Chip>{p.caso}</Chip>}
      <Pill tone={TONO_PROCEDIMIENTO[p.estado]}>{p.estado}</Pill>
    </span>
    <span className="text-[13px] text-ink"><span className="font-semibold text-dash-blue">{p.codigo}</span> - {p.nombre}</span>
    <span className="text-[11px] text-ink-muted">Created date: {p.fecha}</span>
  </span>
)

export function LabOrderDetail({ tarea, abierto, onVolver, onAccion }: {
  tarea: PendingTask
  /** Hay un encuentro abierto con el paciente. */
  abierto: boolean
  onVolver: () => void
  onAccion: (t: PendingTask, a: AccionUI) => void
}) {
  /* Sin encuentro no se toca nada; fuera de Pending, tampoco (CON-2218, CON-3904). */
  const editable = abierto && tarea.state === 'Pending'
  const [vence, setVence] = useState<Date | null>(() => { const f = new Date(tarea.expiration); return Number.isNaN(f.getTime()) ? null : f })
  const [laboratorios, setLaboratorios] = useState<Laboratorio[]>(LABORATORIOS)
  const [lab, setLab] = useState(LABORATORIOS[0]!.nombre)
  const [nuevoLab, setNuevoLab] = useState(false)
  const [asap, setAsap] = useState(false)
  const [vinculados, setVinculados] = useState<Elegible[]>(() => ELEGIBLES.filter((p) => PROCEDIMIENTOS_ORDEN.includes(p.id)))
  const [filtroEstado, setFiltroEstado] = useState<string[]>([])
  const [filtroCaso, setFiltroCaso] = useState<string[]>([])
  /* Hasta elegir la dentición se ven los dos botones "Initialize…", como red.dev. */
  const [denticion, setDenticion] = useState<Denticion | null>(null)
  const [dientes, setDientes] = useState<string[]>([])
  const [actual, setActual] = useState<string | null>(null)
  const [superficies, setSuperficies] = useState<Record<string, Surface[]>>({})
  const [trabajo, setTrabajo] = useState('')
  const [indicaciones, setIndicaciones] = useState('')
  const [adjuntos, setAdjuntos] = useState<Adjunto[]>([])
  const [errores, setErrores] = useState<Record<string, string>>({})

  const filas = ARCADAS[denticion ?? 'Permanent']
  const todos = [...filas.arriba, ...filas.abajo]
  const elegirDenticion = (d: Denticion) => { if (d === denticion) return; setDenticion(d); setDientes([]); setActual(null); setSuperficies({}) }
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

  const opciones = ELEGIBLES.filter((p) => (!filtroEstado.length || filtroEstado.includes(p.estado)) && (!filtroCaso.length || filtroCaso.includes(p.caso ?? 'Independent')))
  const cuenta = (f: (p: Elegible) => boolean) => ELEGIBLES.filter(f).length

  const guardar = () => {
    const e: Record<string, string> = {}
    if (!vence) e.vence = 'Pick the delivery expiration date.'
    if (!lab.trim()) e.lab = 'Choose the receiving laboratory.'
    if (!trabajo.trim()) e.trabajo = 'Describe the dental work requested.'
    setErrores(e)
    if (Object.keys(e).length) return
    aviso.ok('The lab order has been successfully updated.')
    onVolver()
  }

  return (
    <div className="flex flex-col gap-4">
      <EncabezadoFicha
        titulo="Lab order" estado={tarea.state} tono={TONO_ESTADO[tarea.state] ?? 'info'}
        acciones={<>
          <Button variant="secondary" onClick={() => onAccion(tarea, 'PDF')}><FileText /> PDF</Button>
          <MenuTarea task={tarea} abierto={abierto} onAccion={onAccion} sin={['Edit']} />
        </>}
      />

      {!abierto
        ? <Alert tone="warning" title="Read-only mode">{SIN_ENCUENTRO}</Alert>
        : !editable && <Alert tone="warning" title="Read-only mode">{NO_EDITABLE}</Alert>}

      <Card title="General information">
        <fieldset disabled={!editable} className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <SearchField
              label="Receiving laboratory" required clearable className="min-w-0 flex-1" placeholder="Search laboratory"
              options={laboratorios.map((l) => l.nombre)} value={lab} onChange={setLab} error={errores.lab} disabled={!editable} emptyText="No laboratories match your search."
            />
            <Button variant="secondary" size="lg" disabled={!editable} className={cn(errores.lab && 'sm:mb-6')} onClick={() => setNuevoLab(true)}><Plus /> New laboratory</Button>
          </div>
          <div className="flex flex-col gap-2">
            <FieldLabel required>Delivery expiration date</FieldLabel>
            <DatePicker value={vence} onChange={setVence} error={!!errores.vence} />
            {errores.vence && <FieldError>{errores.vence}</FieldError>}
          </div>
          <label className={cn('flex w-fit items-center gap-2 text-[13px] font-medium text-ink', editable ? 'cursor-pointer' : 'opacity-60')}>
            <Checkbox on={asap} onChange={setAsap} label="ASAP" disabled={!editable} />
            ASAP
          </label>
        </fieldset>

        <div className="mt-4 flex flex-col gap-2">
          <FieldLabel>Procedures</FieldLabel>
          <div className="flex items-start gap-2">
            <SearchPicker
              className="min-w-0 flex-1" ariaLabel="Search procedures" placeholder="Search by code or description" multiple ocultarElegidos accion="vincular" disabled={!editable}
              items={opciones} getId={(p) => p.id} getText={(p) => `${p.codigo} ${p.nombre} ${p.caso ?? ''}`}
              renderOption={(p) => <Procedimiento p={p} />} selected={vinculados} onSelect={(p) => setVinculados((v) => [...v, p])}
              emptyText={ELEGIBLES.length ? 'No procedures match your search.' : 'No eligible procedures available.'}
            />
            <FilterMenu
              size="lg" label="Filter procedures" disabled={!editable}
              groups={[
                { title: 'Status', options: ['Planned', 'Pending', 'In progress'].map((s) => ({ value: s, count: cuenta((p) => p.estado === s) })).filter((o) => o.count), value: filtroEstado, onChange: setFiltroEstado },
                { title: 'Treatment case', options: [...new Set(ELEGIBLES.map((p) => p.caso ?? 'Independent'))].map((c) => ({ value: c, count: cuenta((p) => (p.caso ?? 'Independent') === c) })), value: filtroCaso, onChange: setFiltroCaso },
              ]}
            />
          </div>
          {vinculados.length ? (
            <ul className="mt-1 grid gap-2 lg:grid-cols-2" aria-label="Linked procedures">
              {vinculados.map((p) => (
                <li key={p.id} className={cn(TARJETA_INTERNA, 'flex items-start gap-3 p-3')}>
                  <span className="min-w-0 flex-1"><Procedimiento p={p} /></span>
                  {editable && (
                    <button
                      type="button" aria-label={`Remove ${p.codigo}`} title="Remove"
                      onClick={() => setVinculados((v) => v.filter((x) => x.id !== p.id))}
                      className="flex size-8 shrink-0 items-center justify-center rounded-md text-ink-muted hover:bg-dash-bad-bg hover:text-field-error focus-visible:outline-2 focus-visible:outline-dash-blue"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[12px] text-ink-muted">No procedures linked.</p>
          )}
        </div>
      </Card>

      <Card
        title="Teeth & surface"
        action={denticion && (
          <span className="inline-flex rounded-lg bg-surface-subtle p-0.5" role="group" aria-label="Dentition">
            {(['Permanent', 'Primary'] as const).map((d) => (
              <button
                key={d} type="button" aria-pressed={denticion === d} onClick={() => elegirDenticion(d)}
                className={cn(
                  'flex h-7 items-center rounded-md px-3 text-[12px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-dash-blue',
                  denticion === d ? 'bg-surface text-dash-blue shadow-sm' : 'text-ink-muted hover:text-ink',
                )}
              >
                {d}
              </button>
            ))}
          </span>
        )}
      >
        {!denticion ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-line-strong px-4 py-8 text-center">
            <span className="flex flex-wrap justify-center gap-2">
              <Button variant="secondary" onClick={() => elegirDenticion('Permanent')}>Initialize permanent dentition</Button>
              <Button variant="secondary" onClick={() => elegirDenticion('Primary')}>Initialize primary dentition</Button>
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-around">
            <DentalArch
              arriba={filas.arriba} abajo={filas.abajo} marcados={dientes} actual={actual} disabled={!editable}
              conSuperficies={Object.keys(superficies).filter((d) => superficies[d]?.length)} onToggle={tocarDiente}
            />
            <div className={cn('flex shrink-0 flex-col items-center gap-3', !editable && 'pointer-events-none opacity-50')} aria-disabled={!editable || undefined}>
              <SurfaceWheel size={150} value={actuales} onChange={(s) => actual && setSuperficies({ ...superficies, [actual]: s })} />
              <span className="text-[12px] font-medium text-ink">{actual ? `Surfaces of tooth ${actual}` : 'Pick a tooth to mark its surfaces'}</span>
              <span className="flex gap-2">
                <Button size="sm" variant="secondary" disabled={!editable} onClick={alternarTodos}>Toggle all</Button>
                <Button size="sm" variant="secondary" disabled={!editable || !actuales.length} onClick={aplicarASinMarcar}>Apply to unset</Button>
              </span>
            </div>
          </div>
        )}
      </Card>

      <Card title="Details">
        <fieldset disabled={!editable} className="flex min-w-0 flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextArea label="Dental work requested" required rows={4} value={trabajo} onChange={setTrabajo} error={errores.trabajo} disabled={!editable} />
            <TextArea label="Special instructions" rows={4} placeholder="Enter special instructions" value={indicaciones} onChange={setIndicaciones} disabled={!editable} />
          </div>
          <Adjuntos value={adjuntos} onChange={setAdjuntos} disabled={!editable} error="Only PDF, JPG or PNG files up to 10MB." />
        </fieldset>
      </Card>

      <div className="mt-1 flex justify-end">
        <FormFooter onCancel={onVolver} onSave={guardar} saveDisabled={!editable} />
      </div>

      {nuevoLab && (
        <NewLaboratoryDrawer
          existentes={laboratorios} onClose={() => setNuevoLab(false)}
          onGuardar={(l) => { setLaboratorios((p) => [...p, l]); setLab(l.nombre); aviso.ok('The laboratory has been successfully created.') }}
        />
      )}
    </div>
  )
}
