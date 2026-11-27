import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { FileText, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DatePicker } from '@/components/ui/date-picker'
import { FilterMenu } from '@/components/ui/filter-menu'
import { SearchPicker } from '@/components/ui/search-picker'
import { FieldError, FieldLabel, FormFooter, SearchField, TextArea } from '@/components/patients/form'
import { Card } from '@/components/settings/primitives'
import { RuedaSuperficies, superficiesDe, type SuperficieLab } from './dental/RuedaSuperficies'
import { DentalArch } from './dental/DentalArch'
import { NewLaboratoryDrawer } from './NewLaboratoryDrawer'
import { Adjuntos, COLUMNAS_FICHA, DatoFicha, EncabezadoFicha, ProcedimientoResumen, ProcedimientosVinculados, type Adjunto, type ProcedimientoFicha } from './FichaClinica'
import { PROCEDIMIENTOS, PROCEDIMIENTOS_ORDEN, VINCULOS_PROCEDIMIENTO } from '@/data/clinical-mode'
import { ARCADAS, LABORATORIOS, type Denticion, type Laboratorio } from '@/data/laboratorios'
import { CASOS } from '@/data/treatment-plan'
import type { PendingTask } from '@/components/dashboard/PendingTaskCard'
import { MenuTarea, SIN_ENCUENTRO, TONO_ESTADO, type AccionUI } from '@/components/dashboard/tareas'

/* El detalle de una Lab Order, el que abren Complete this Task y Edit desde Pending Task. Mismos datos y acciones que
   red.dev (videos de Julián del 2026-11-20 y 2026-11-25) con el armado de FichaClinica: General information (con Teeth &
   surface adentro) a la izquierda y Details a la derecha. Sólo se edita con un encuentro abierto y la orden en Pending
   (CON-2218). Ver design-reference/figma/modulos/clinical-mode.md (2026-11-27). */

const NO_EDITABLE = 'This lab order cannot be edited because it is not in an editable state.'

/* CON-3904: sueltos en Planned, o Pending / In progress de un caso aceptado. */
const ELEGIBLES: ProcedimientoFicha[] = PROCEDIMIENTOS.flatMap((p) => {
  const caso = CASOS.find((c) => c.id === VINCULOS_PROCEDIMIENTO[p.id]?.caso?.id)
  const ficha = { ...p, pieza: p.pieza ? String(p.pieza) : undefined }
  if (!caso) return p.estado === 'Planned' ? [ficha] : []
  return caso.aceptado && ['Waiting for consent', 'Accepted', 'In progress'].includes(caso.estado) && ['Pending', 'In progress'].includes(p.estado)
    ? [{ ...ficha, caso: caso.nombre }]
    : []
})
const casoDe = (p: ProcedimientoFicha) => p.caso ?? 'Independent'

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
  const [vinculados, setVinculados] = useState<ProcedimientoFicha[]>(() => ELEGIBLES.filter((p) => PROCEDIMIENTOS_ORDEN.includes(p.id)))
  const [filtroEstado, setFiltroEstado] = useState<string[]>([])
  const [filtroCaso, setFiltroCaso] = useState<string[]>([])
  /* Hasta elegir la dentición se ven los dos botones "Initialize…", como red.dev. Permanent / Primary sólo cambia la
     arcada que se ve: lo marcado en una queda al pasar a la otra (dentición mixta, video del 2026-11-27). */
  const [denticion, setDenticion] = useState<Denticion | null>(null)
  const [dientes, setDientes] = useState<string[]>([])
  const [actual, setActual] = useState<string | null>(null)
  const [superficies, setSuperficies] = useState<Record<string, SuperficieLab[]>>({})
  const [trabajo, setTrabajo] = useState('')
  const [indicaciones, setIndicaciones] = useState('')
  const [adjuntos, setAdjuntos] = useState<Adjunto[]>([])
  const [errores, setErrores] = useState<Record<string, string>>({})

  const filas = ARCADAS[denticion ?? 'Permanent']
  const tocarDiente = (d: string) => {
    const esta = dientes.includes(d)
    setDientes(esta ? dientes.filter((x) => x !== d) : [...dientes, d])
    setActual(esta ? (actual === d ? null : actual) : d)
  }
  /* Como red.dev: Toggle all marca (o saca) todas las superficies del diente elegido; Apply to unset copia las del
     diente elegido a los marcados que todavía no tienen ninguna. */
  const actuales = actual ? superficies[actual] ?? [] : []
  const todasDelActual = actual ? superficiesDe(actual) : []
  const alternarTodas = () => actual && setSuperficies({ ...superficies, [actual]: actuales.length === todasDelActual.length ? [] : [...todasDelActual] })
  const aplicarASinMarcar = () => setSuperficies(Object.fromEntries([
    ...Object.entries(superficies),
    ...dientes.filter((d) => !superficies[d]?.length).map((d) => [d, actuales.filter((s) => superficiesDe(d).includes(s))]),
  ]))
  const permanentes = dientes.filter((d) => /^\\d+$/.test(d)).sort((a, b) => Number(a) - Number(b))
  const temporarios = dientes.filter((d) => !/^\\d+$/.test(d)).sort()

  const opciones = ELEGIBLES.filter((p) => (!filtroEstado.length || filtroEstado.includes(p.estado)) && (!filtroCaso.length || filtroCaso.includes(casoDe(p))))
  const cuenta = (f: (p: ProcedimientoFicha) => boolean) => ELEGIBLES.filter(f).length

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

      <div className={COLUMNAS_FICHA}>
        <Card title="General information">
          <fieldset disabled={!editable} className="flex min-w-0 flex-col gap-6">
            <legend className="sr-only">General information</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* CON-2215 (comentario de Abril): quién la pide y cuándo, de sólo lectura. */}
              <DatoFicha label="Ordering provider">{tarea.provider}</DatoFicha>
              <DatoFicha label="Order date">{tarea.register}</DatoFicha>
              <div className="flex flex-col gap-2 sm:col-span-2 sm:flex-row sm:items-end">
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
              <label className={cn('flex w-fit items-center gap-2 text-[13px] font-medium text-ink sm:mt-[26px] sm:h-9', editable ? 'cursor-pointer' : 'opacity-60')}>
                <Checkbox on={asap} onChange={setAsap} label="ASAP" disabled={!editable} />
                ASAP
              </label>
            </div>

            <div className="flex flex-col gap-2">
              <FieldLabel>Procedures</FieldLabel>
              <div className="flex items-start gap-2">
                <SearchPicker
                  className="min-w-0 flex-1" ariaLabel="Search procedures" placeholder="Search by code or description" multiple ocultarElegidos accion="vincular" disabled={!editable}
                  items={opciones} getId={(p) => p.id} getText={(p) => \`\${p.codigo} \${p.nombre} \${p.caso ?? ''} \${p.pieza ?? ''}\`}
                  renderOption={(p) => <ProcedimientoResumen p={p} />} selected={vinculados} onSelect={(p) => setVinculados((v) => [...v, p])}
                  emptyText={ELEGIBLES.length ? 'No procedures match your search.' : 'No eligible procedures available.'}
                />
                <FilterMenu
                  size="lg" label="Filter procedures" disabled={!editable}
                  groups={[
                    { title: 'Status', options: ['Planned', 'Pending', 'In progress'].map((s) => ({ value: s, count: cuenta((p) => p.estado === s) })).filter((o) => o.count), value: filtroEstado, onChange: setFiltroEstado },
                    { title: 'Treatment case', options: [...new Set(ELEGIBLES.map(casoDe))].map((c) => ({ value: c, count: cuenta((p) => casoDe(p) === c) })), value: filtroCaso, onChange: setFiltroCaso },
                  ]}
                />
              </div>
              <ProcedimientosVinculados items={vinculados} disabled={!editable} onRemove={(p) => setVinculados((v) => v.filter((x) => x.id !== p.id))} />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex min-h-8 flex-wrap items-center gap-3">
                <FieldLabel>Teeth & surface</FieldLabel>
                {denticion && (
                  <span className="ml-auto inline-flex rounded-lg bg-surface-subtle p-0.5" role="group" aria-label="Dentition">
                    {(['Permanent', 'Primary'] as const).map((d) => (
                      <button
                        key={d} type="button" aria-pressed={denticion === d} onClick={() => setDenticion(d)}
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
              </div>
              {!denticion ? (
                <span className="flex flex-wrap gap-2">
                  <Button variant="secondary" disabled={!editable} onClick={() => setDenticion('Permanent')}>Initialize permanent dentition</Button>
                  <Button variant="secondary" disabled={!editable} onClick={() => setDenticion('Primary')}>Initialize primary dentition</Button>
                </span>
              ) : (
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-around">
                  <DentalArch
                    arriba={filas.arriba} abajo={filas.abajo} marcados={dientes} actual={actual} disabled={!editable}
                    conSuperficies={Object.keys(superficies).filter((d) => superficies[d]?.length)} onToggle={tocarDiente}
                  />
                  <div className="flex w-full shrink-0 flex-col items-center gap-3 sm:w-auto">
                    {/* Los dientes marcados de las dos denticiones: tocar uno lo elige para marcarle superficies. */}
                    <div className="flex w-full flex-col gap-2 sm:w-44">
                      {([['Permanent', permanentes], ['Primary', temporarios]] as const).map(([titulo, lista]) => (
                        <div key={titulo} className="flex flex-col gap-1.5">
                          <span className="text-[11px] font-medium text-ink-muted">{titulo}</span>
                          {lista.length ? (
                            <span className="flex flex-wrap gap-1.5" role="group" aria-label={\`\${titulo} teeth\`}>
                              {lista.map((d) => (
                                <button
                                  key={d} type="button" aria-pressed={actual === d} onClick={() => setActual(d)} aria-label={\`Edit surfaces of tooth \${d}\`}
                                  className={cn(
                                    'flex h-7 min-w-7 items-center justify-center rounded-md px-1.5 text-[12px] font-semibold tabular-nums transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue',
                                    actual === d ? 'bg-dash-blue text-white' : 'bg-dash-count-bg text-dash-blue hover:bg-dash-count-bg/70',
                                  )}
                                >
                                  {d}
                                </button>
                              ))}
                            </span>
                          ) : <span className="text-[12px] text-ink-faint">No teeth selected</span>}
                        </div>
                      ))}
                    </div>
                    <RuedaSuperficies diente={actual} value={actuales} disabled={!editable} onChange={(v) => actual && setSuperficies({ ...superficies, [actual]: v })} />
                    <span className="text-[12px] font-medium text-ink">{actual ? \`Surfaces of tooth \${actual}\` : 'Pick a tooth to mark its surfaces'}</span>
                    <span className="flex gap-2">
                      <Button size="sm" variant="secondary" disabled={!editable || !actual} onClick={alternarTodas}>Toggle all</Button>
                      <Button size="sm" variant="secondary" disabled={!editable || !actuales.length} onClick={aplicarASinMarcar}>Apply to unset</Button>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </fieldset>
        </Card>

        {/* El texto libre se lleva el alto que deja la columna de la izquierda: es donde más se escribe y lo que lee el laboratorio. */}
        <Card title="Details" className="flex flex-col" bodyClassName="flex flex-1 flex-col">
          <fieldset disabled={!editable} className="flex min-w-0 flex-1 flex-col gap-4">
            <legend className="sr-only">Details</legend>
            <TextArea
              label="Dental work requested" required crecer rows={7} className="flex-[2]" placeholder="Describe the work the laboratory has to do"
              value={trabajo} onChange={setTrabajo} error={errores.trabajo} disabled={!editable}
            />
            <TextArea label="Special instructions" crecer rows={4} className="flex-1" placeholder="Enter special instructions" value={indicaciones} onChange={setIndicaciones} disabled={!editable} />
            <Adjuntos value={adjuntos} onChange={setAdjuntos} disabled={!editable} error="Only PDF, JPG or PNG files up to 10MB." />
          </fieldset>
        </Card>
      </div>

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
`})))()}export{n,i as r,r as t};