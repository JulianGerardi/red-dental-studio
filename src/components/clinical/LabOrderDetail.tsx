import { useState } from 'react'
import { FileText, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DatePicker } from '@/components/ui/date-picker'
import { FilterMenu } from '@/components/ui/filter-menu'
import { SearchPicker } from '@/components/ui/search-picker'
import { Tabs } from '@/components/ui/tabs'
import { FieldError, FieldLabel, FormFooter, SearchField, TextArea } from '@/components/patients/form'
import { Card } from '@/components/settings/primitives'
import { OBLIGATORIO } from '@/lib/validacion'
import { RuedaSuperficies, superficiesDe, type SuperficieLab } from './dental/RuedaSuperficies'
import { ArcadaAnatomica } from './dental/ArcadaAnatomica'
import { NewLaboratoryDrawer } from './NewLaboratoryDrawer'
import { Adjuntos, AvisosFicha, EncabezadoFicha, ProcedimientoResumen, ProcedimientosVinculados, type ProcedimientoFicha } from './FichaClinica'
import { LAB_VACIO, PROCEDIMIENTOS_LAB, agregarLaboratorio, guardarRegistro, hoy, laboratorios as listaLaboratorios, type Registro } from './registros'
import type { Denticion, Laboratorio } from '@/data/laboratorios'
import type { PendingTask } from '@/components/dashboard/PendingTaskCard'
import { MenuTarea, TONO_ESTADO, esEditable, type AccionUI } from '@/components/dashboard/tareas'
import { formatMDY } from '@/lib/fecha'

/* La ficha de una Lab order: la misma para New lab order, Edit y la vista de una orden que ya no se edita. Mismos datos
   y acciones que red.dev (videos de Julián del 2026-11-20 al 27) con el armado de FichaClinica: quién la pide y cuándo
   en el título y dos cards, una debajo de la otra: General information (con Teeth & surface adentro) y Details. Sólo se edita con un encuentro abierto y la orden en
   Pending (CON-2218); se crea en Pending (CON-2215). Ver design-reference/figma/modulos/clinical-mode.md (2026-11-27). */

const MAX_TEXTO = 500
const casoDe = (p: ProcedimientoFicha) => p.caso ?? 'Independent'
const aFecha = (s: string) => { const f = new Date(s); return s && !Number.isNaN(f.getTime()) ? f : null }
const esPermanente = (d: string) => /^\d+$/.test(d)
const hoyDia = () => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate()) }

export function LabOrderDetail({ registro, nuevo, abierto, onVolver, onAccion }: {
  registro: Registro
  /** Todavía no existe: Save la crea en Pending. */
  nuevo?: boolean
  /** Hay un encuentro abierto con el paciente. */
  abierto: boolean
  onVolver: () => void
  onAccion: (t: PendingTask, a: AccionUI) => void
}) {
  const inicio = registro.lab ?? LAB_VACIO
  /* Una orden nueva se carga siempre (New no pide encuentro, como red.dev). Una existente: con encuentro abierto y en
     Pending (CON-2218, CON-3904). */
  const editable = nuevo || (abierto && esEditable(registro))
  const [vence, setVence] = useState<Date | null>(() => aFecha(registro.expiration))
  const [laboratorios, setLaboratorios] = useState<Laboratorio[]>(listaLaboratorios)
  const [lab, setLab] = useState(inicio.laboratorio)
  const [nuevoLab, setNuevoLab] = useState(false)
  const [asap, setAsap] = useState(inicio.asap)
  const [vinculados, setVinculados] = useState<string[]>(inicio.procedimientos)
  const [filtroEstado, setFiltroEstado] = useState<string[]>([])
  const [filtroCaso, setFiltroCaso] = useState<string[]>([])
  /* Hasta elegir la dentición se ven los dos botones "Initialize…", como red.dev. Permanent / Primary sólo cambia la
     arcada que se ve: lo marcado en una queda al pasar a la otra (dentición mixta, video del 2026-11-27). */
  const [denticion, setDenticion] = useState<Denticion | null>(inicio.denticion)
  const [dientes, setDientes] = useState<string[]>(inicio.dientes)
  const [actual, setActual] = useState<string | null>(inicio.dientes[0] ?? null)
  const [superficies, setSuperficies] = useState<Record<string, SuperficieLab[]>>(inicio.superficies)
  const [trabajo, setTrabajo] = useState(inicio.trabajo)
  const [indicaciones, setIndicaciones] = useState(inicio.indicaciones)
  const [adjuntos, setAdjuntos] = useState(inicio.adjuntos)
  const [errores, setErrores] = useState<{ vence?: string; lab?: string; trabajo?: string }>({})

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
  const permanentes = dientes.filter(esPermanente).sort((a, b) => Number(a) - Number(b))
  const temporarios = dientes.filter((d) => !esPermanente(d)).sort()

  /* CON-2215: si el procedimiento tiene diente y superficies, vincularlo los trae marcados; después se pueden cambiar. */
  const vincular = (p: ProcedimientoFicha) => {
    setVinculados((v) => [...v, p.id])
    const d = p.pieza && p.pieza !== '-' ? p.pieza : undefined
    if (!d || dientes.includes(d)) return
    setDenticion((actualDenticion) => actualDenticion ?? (esPermanente(d) ? 'Permanent' : 'Primary'))
    setDientes((v) => [...v, d])
    setActual(d)
    const delProcedimiento = (p.superficie ?? '').split(',').map((x) => x.trim()).filter((x): x is SuperficieLab => (superficiesDe(d) as string[]).includes(x))
    if (delProcedimiento.length) setSuperficies((v) => ({ ...v, [d]: delProcedimiento }))
  }

  const opciones = PROCEDIMIENTOS_LAB.filter((p) => (!filtroEstado.length || filtroEstado.includes(p.estado)) && (!filtroCaso.length || filtroCaso.includes(casoDe(p))))
  const cuenta = (f: (p: ProcedimientoFicha) => boolean) => PROCEDIMIENTOS_LAB.filter(f).length
  const elegidos = PROCEDIMIENTOS_LAB.filter((p) => vinculados.includes(p.id))

  const guardar = () => {
    const e = {
      lab: laboratorios.some((l) => l.nombre === lab) ? undefined : OBLIGATORIO,
      vence: !vence ? OBLIGATORIO : vence < hoyDia() ? 'Date cannot be in the past' : undefined,
      trabajo: trabajo.trim() ? undefined : OBLIGATORIO,
    }
    setErrores(e)
    if (e.lab || e.vence || e.trabajo) return
    guardarRegistro({
      ...registro, expiration: formatMDY(vence!), updated: hoy(),
      lab: { laboratorio: lab, asap, procedimientos: vinculados, denticion, dientes, superficies, trabajo: trabajo.trim(), indicaciones: indicaciones.trim(), adjuntos },
    })
    aviso.ok(`The lab order has been successfully ${nuevo ? 'created' : 'updated'}.`)
    onVolver()
  }

  return (
    <div className="flex flex-col gap-4">
      <EncabezadoFicha
        titulo={nuevo ? 'New lab order' : 'Lab order'} estado={registro.state} tono={TONO_ESTADO[registro.state]} onVolver={onVolver} volverA="lab orders"
        /* CON-2215 (comentario de Abril): quién la pide y cuándo, de sólo lectura, en el título junto al PDF. */
        datos={[['Ordering provider', registro.provider ?? '—'], ['Order date', registro.register]]}
        acciones={!nuevo && <>
          {registro.pdf && <Button variant="secondary" onClick={() => onAccion(registro, 'PDF')}><FileText /> PDF</Button>}
          <MenuTarea task={registro} abierto={abierto} onAccion={onAccion} sin={['Edit']} />
        </>}
      />

      <AvisosFicha abierto={abierto || !!nuevo} editable={editable} nombre="lab order" incompleto={Object.values(errores).includes(OBLIGATORIO)} error={errores.vence && errores.vence !== OBLIGATORIO ? errores.vence : undefined} />

      {/* Una card debajo de la otra, con la misma diagramación que Prescription y Referral (Julián, 2026-11-27). */}
      <Card title="General information">
          <div className="flex min-w-0 flex-col gap-6">
           <fieldset disabled={!editable} className="flex min-w-0 flex-col gap-6">
            <legend className="sr-only">General information</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2 sm:col-span-2 sm:flex-row sm:items-end">
                <SearchField
                  label="Receiving laboratory" required clearable className="min-w-0 flex-1" placeholder="Search laboratory"
                  options={laboratorios.map((l) => l.nombre)} value={lab} onChange={setLab} error={errores.lab} disabled={!editable} emptyText="No laboratories match your search."
                />
                <Button variant="secondary" size="lg" disabled={!editable} className={cn(errores.lab && 'sm:mb-6')} onClick={() => setNuevoLab(true)}><Plus /> New laboratory</Button>
              </div>
              <div className="flex flex-col gap-2">
                <FieldLabel required>Delivery expiration date</FieldLabel>
                {/* El calendario de toda la app; que no quede en el pasado (CON-2215) se revisa al guardar. */}
                <DatePicker value={vence} onChange={setVence} error={!!errores.vence} label="Delivery expiration date" disabled={!editable} className="h-9 w-full" />
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
                  items={opciones} getId={(p) => p.id} getText={(p) => `${p.codigo} ${p.nombre} ${p.caso ?? ''} ${p.pieza ?? ''}`}
                  renderOption={(p) => <ProcedimientoResumen p={p} />} selected={elegidos} onSelect={vincular}
                  emptyText={PROCEDIMIENTOS_LAB.length ? 'No procedures match your search.' : 'No procedures available for this patient.'}
                />
                <FilterMenu
                  size="lg" label="Filter procedures" disabled={!editable}
                  groups={[
                    { title: 'Status', options: ['Planned', 'Pending', 'In progress'].map((s) => ({ value: s, count: cuenta((p) => p.estado === s) })).filter((o) => o.count), value: filtroEstado, onChange: setFiltroEstado },
                    { title: 'Treatment case', options: [...new Set(PROCEDIMIENTOS_LAB.map(casoDe))].map((c) => ({ value: c, count: cuenta((p) => casoDe(p) === c) })), value: filtroCaso, onChange: setFiltroCaso },
                  ]}
                />
              </div>
              <ProcedimientosVinculados items={elegidos} disabled={!editable} onRemove={(p) => setVinculados((v) => v.filter((x) => x !== p.id))} />
            </div>
           </fieldset>

            {/* Teeth & surface como está armado en red.dev: la dentición debajo del rótulo, el dibujo de las arcadas a la
                izquierda y, a la derecha, los dientes marcados, la rueda de superficies y sus dos botones. Fuera del
                fieldset: en sólo lectura también se cambia de arcada y de diente para ver sus superficies. */}
            <div className="flex flex-col gap-3">
              <FieldLabel>Teeth & surface</FieldLabel>
              {!denticion ? (
                editable ? (
                  <span className="flex flex-wrap gap-2">
                    <Button variant="secondary" onClick={() => setDenticion('Permanent')}>Initialize permanent dentition</Button>
                    <Button variant="secondary" onClick={() => setDenticion('Primary')}>Initialize primary dentition</Button>
                  </span>
                ) : <p className="text-[12px] text-ink-muted">No teeth selected.</p>
              ) : (
                <>
                  <Tabs size="sm" aria-label="Dentition" value={denticion} onChange={setDenticion} tabs={['Permanent', 'Primary']} />
                  <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-center sm:gap-10">
                    <ArcadaAnatomica denticion={denticion} marcados={dientes} actual={actual} disabled={!editable} onToggle={tocarDiente} />
                    <div className="flex w-full shrink-0 flex-col gap-5 sm:w-[220px]">
                      {/* Los dientes marcados de las dos denticiones: tocar uno lo elige para marcarle (o ver) sus superficies. */}
                      <div className="flex flex-col gap-3">
                        {([['Permanent', permanentes], ['Primary', temporarios]] as const).map(([titulo, lista]) => (
                          <div key={titulo} className="flex flex-col gap-1.5">
                            <span className="text-[11px] font-semibold tracking-wide text-ink-muted uppercase">{titulo}</span>
                            {lista.length ? (
                              <span className="flex flex-wrap gap-1.5" role="group" aria-label={`${titulo} teeth`}>
                                {lista.map((d) => (
                                  <button
                                    key={d} type="button" aria-pressed={actual === d} onClick={() => setActual(d)} aria-label={`${editable ? 'Edit' : 'View'} surfaces of tooth ${d}`}
                                    className={cn(
                                      'flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-[12px] font-semibold tabular-nums transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue',
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
                      <div className="flex flex-col items-center gap-3">
                        <RuedaSuperficies diente={actual} value={actuales} disabled={!editable} onChange={(v) => actual && setSuperficies({ ...superficies, [actual]: v })} />
                        <span className="text-[12px] font-medium text-ink">{actual ? `Surfaces of tooth ${actual}` : 'Pick a tooth to mark its surfaces'}</span>
                        {editable && (
                          <span className="flex gap-2">
                            <Button size="sm" variant="secondary" disabled={!actual} onClick={alternarTodas}>Toggle all</Button>
                            <Button size="sm" variant="secondary" disabled={!actuales.length} onClick={aplicarASinMarcar}>Apply to unset</Button>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>

      <Card title="Details">
        <fieldset disabled={!editable} className="flex min-w-0 flex-col gap-4">
          <legend className="sr-only">Details</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextArea
              label="Dental work requested" required rows={6} placeholder="Describe the work the laboratory has to do"
              value={trabajo} onChange={(v) => setTrabajo(v.slice(0, MAX_TEXTO))} error={errores.trabajo} disabled={!editable} hint={`${trabajo.length}/${MAX_TEXTO}`}
            />
            <TextArea
              label="Special instructions" rows={6} placeholder="Enter special instructions"
              value={indicaciones} onChange={(v) => setIndicaciones(v.slice(0, MAX_TEXTO))} disabled={!editable} hint={`${indicaciones.length}/${MAX_TEXTO}`}
            />
          </div>
          <Adjuntos value={adjuntos} onChange={setAdjuntos} disabled={!editable} error="Invalid file type or size." />
        </fieldset>
      </Card>

      <div className="mt-1 flex justify-end">
        <FormFooter onCancel={onVolver} onSave={guardar} saveDisabled={!editable} cancelLabel={editable ? 'Cancel' : 'Back'} />
      </div>

      {nuevoLab && (
        <NewLaboratoryDrawer
          existentes={laboratorios} onClose={() => setNuevoLab(false)}
          onGuardar={(l) => { agregarLaboratorio(l); setLaboratorios((p) => [...p, l]); setLab(l.nombre); setErrores((e) => ({ ...e, lab: undefined })); aviso.ok('The laboratory has been successfully created.') }}
        />
      )}
    </div>
  )
}
