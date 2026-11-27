import { useState, type ReactNode } from 'react'
import { FileText, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { SearchPicker } from '@/components/ui/search-picker'
import { FieldHint, FieldLabel, FormFooter, SearchField, TextArea } from '@/components/patients/form'
import { Card } from '@/components/settings/primitives'
import { OBLIGATORIO } from '@/lib/validacion'
import { DERIVACION_TAREA, PROCEDIMIENTOS, PROVEEDORES_DERIVACION, VINCULOS_PROCEDIMIENTO, type ProveedorDerivacion } from '@/data/clinical-mode'
import { CASOS, NO_ASIGNADOS } from '@/data/treatment-plan'
import type { PendingTask } from '@/components/dashboard/PendingTaskCard'
import { MenuTarea, SIN_ENCUENTRO, TONO_ESTADO, tareaViva, useAccionesTarea, useTareasVivas, type AccionUI } from '@/components/dashboard/tareas'
import { NewProviderDrawer } from './NewProviderDrawer'
import { Adjuntos, COLUMNAS_FICHA, EncabezadoFicha, ProcedimientoResumen, ProcedimientosVinculados, type Adjunto, type ProcedimientoFicha } from './FichaClinica'

/* El detalle de una Referral, el que abre Complete this task desde Pending Task (video de red.dev de Julián, 2026-11-25).
   Mismos datos y acciones que red.dev, con el armado de FichaClinica (General information | Details). Reglas de CON-2322 /
   CON-2323. Ver design-reference/figma/modulos/clinical-mode.md (2026-11-27). */

const MAX_NOTA = 500

/* Sólo se derivan procedimientos Planned del paciente (CON-2322): los sueltos del Treatment plan y los de un caso. */
const PLANNED: ProcedimientoFicha[] = [
  ...NO_ASIGNADOS.slice(0, 5).map((p) => ({ id: p.id, codigo: p.codigo, nombre: p.nombre, estado: 'Planned' as const, fecha: p.fecha, pieza: p.pieza, superficie: p.superficie, ubicacion: p.ubicacion })),
  ...PROCEDIMIENTOS.filter((p) => p.estado === 'Planned').map((p) => ({
    ...p, pieza: p.pieza ? String(p.pieza) : undefined, caso: CASOS.find((c) => c.id === VINCULOS_PROCEDIMIENTO[p.id]?.caso?.id)?.nombre,
  })),
]

export function ReferralDetail({ tarea, abierto, onVolver, onAccion }: {
  tarea: PendingTask
  /** Hay un encuentro abierto con el paciente. */
  abierto: boolean
  onVolver: () => void
  onAccion: (t: PendingTask, a: AccionUI) => void
}) {
  const inicio = DERIVACION_TAREA
  const [proveedores, setProveedores] = useState<ProveedorDerivacion[]>(PROVEEDORES_DERIVACION)
  const [proveedor, setProveedor] = useState(inicio.proveedor)
  const [procedimientos, setProcedimientos] = useState<string[]>(inicio.procedimientos)
  const [asap, setAsap] = useState(inicio.asap)
  const [obligatoria, setObligatoria] = useState(inicio.obligatoria)
  const [nota, setNota] = useState(inicio.nota)
  const [adjuntos, setAdjuntos] = useState<Adjunto[]>(inicio.adjuntos)
  const [errores, setErrores] = useState<{ proveedor?: string; nota?: string }>({})
  const [nuevoProveedor, setNuevoProveedor] = useState(false)

  /* Sólo se edita en Pending (CON-2323) y con un encuentro abierto. */
  const pendiente = tarea.state === 'Pending'
  const editable = abierto && pendiente

  const guardar = () => {
    const e = {
      proveedor: proveedores.some((p) => p.nombre === proveedor) ? undefined : OBLIGATORIO,
      nota: nota.trim() ? undefined : OBLIGATORIO,
    }
    setErrores(e)
    if (e.proveedor || e.nota) { aviso.error('All required fields marked with (*) must be completed before proceeding.'); return }
    aviso.ok('The referral has been successfully updated.')
    onVolver()
  }

  const especialidad = (nombre: string) => proveedores.find((p) => p.nombre === nombre)?.especialidad || undefined

  return (
    <div className="flex flex-col gap-4">
      <EncabezadoFicha
        titulo="Referral" estado={tarea.state} tono={TONO_ESTADO[tarea.state] ?? 'info'}
        acciones={<>
          {tarea.pdf && <Button variant="secondary" onClick={() => onAccion(tarea, 'PDF')}><FileText /> PDF</Button>}
          <MenuTarea task={tarea} abierto={abierto} onAccion={onAccion} sin={['Delete']} />
        </>}
      />

      {!abierto
        ? <Alert tone="warning" title="Read-only mode">{SIN_ENCUENTRO}</Alert>
        : !pendiente && <Alert tone="info" title="This referral can't be edited">It was already requested. Only pending referrals can be edited.</Alert>}

      <div className={COLUMNAS_FICHA}>
        <Card title="General information">
          <fieldset disabled={!editable} className="flex min-w-0 flex-col gap-6">
            <legend className="sr-only">General information</legend>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                <SearchField
                  label="Referral provider" required className="min-w-0 flex-1" placeholder="Search by name or surname"
                  options={proveedores.map((p) => p.nombre)} subtext={especialidad} emptyText="No results found."
                  value={proveedor} onChange={setProveedor} error={errores.proveedor} disabled={!editable}
                />
                <Button variant="secondary" size="lg" className={cn(errores.proveedor && 'sm:mb-6')} disabled={!editable} onClick={() => setNuevoProveedor(true)}><Plus /> New provider</Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <label className="flex w-fit items-center gap-2 text-[13px] text-ink">
                  <Checkbox on={asap} onChange={setAsap} label="ASAP" disabled={!editable} /> ASAP
                </label>
                <label className="flex w-fit items-center gap-2 text-[13px] text-ink">
                  <Checkbox on={obligatoria} onChange={setObligatoria} label="Mandatory to continue treatment" disabled={!editable} /> Mandatory to continue treatment
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <FieldLabel>Procedures</FieldLabel>
              <SearchPicker
                multiple ocultarElegidos items={PLANNED} getId={(p) => p.id} getText={(p) => `${p.codigo} ${p.nombre} ${p.caso ?? ''} ${p.pieza ?? ''}`}
                renderOption={(p) => <ProcedimientoResumen p={p} />}
                selected={PLANNED.filter((p) => procedimientos.includes(p.id))}
                onSelect={(p) => setProcedimientos((a) => [...new Set([...a, p.id])])}
                placeholder="Search by code or description" ariaLabel="Search procedures" emptyText="No planned procedure matches that search."
                accion="vincular" disabled={!editable}
              />
              <FieldHint>Only planned procedures can be referred.</FieldHint>
              <ProcedimientosVinculados
                items={PLANNED.filter((p) => procedimientos.includes(p.id))} disabled={!editable}
                onRemove={(p) => setProcedimientos((a) => a.filter((id) => id !== p.id))}
              />
            </div>
          </fieldset>
        </Card>

        {/* La nota es lo que lee el especialista: se lleva el alto que deja la columna de la izquierda. */}
        <Card title="Details" className="flex flex-col" bodyClassName="flex flex-1 flex-col">
          <fieldset disabled={!editable} className="flex min-w-0 flex-1 flex-col gap-4">
            <legend className="sr-only">Details</legend>
            <TextArea
              label="Referral note" required crecer rows={7} className="flex-1" placeholder="Why the patient is being referred"
              value={nota} onChange={(v) => setNota(v.slice(0, MAX_NOTA))} error={errores.nota} disabled={!editable}
              hint={`${nota.length}/${MAX_NOTA}`}
            />
            <Adjuntos value={adjuntos} onChange={setAdjuntos} disabled={!editable} />
          </fieldset>
        </Card>
      </div>

      <div className="mt-1 flex justify-end">
        <FormFooter onCancel={onVolver} onSave={guardar} saveDisabled={!editable} />
      </div>

      {nuevoProveedor && (
        <NewProviderDrawer
          onClose={() => setNuevoProveedor(false)}
          onGuardar={(p) => { setProveedores((x) => [...x, p]); setProveedor(p.nombre); setErrores((e) => ({ ...e, proveedor: undefined })); aviso.ok(`${p.nombre} added and selected.`) }}
        />
      )}
    </div>
  )
}

/** La pestaña Referral: con la tarea de Pending Task, su detalle; sin ella (o al salir con Cancel), lo que había. */
export function ReferralPanel({ tarea, encuentroAbierto, children }: { tarea?: PendingTask; encuentroAbierto: boolean; children: ReactNode }) {
  const [detalle, setDetalle] = useState(tarea?.id)
  useTareasVivas(tarea ? [tarea] : [])
  const viva = tarea && tareaViva(tarea)
  const acciones = useAccionesTarea({ paciente: tarea?.patientId })

  if (!viva || detalle !== viva.id) return <>{children}</>
  /* Cancelada o borrada desde su ⋮: ya no hay detalle que mostrar. */
  if (viva.fuera) { setDetalle(undefined); return null }
  return (
    <>
      <ReferralDetail key={viva.state} tarea={viva} abierto={encuentroAbierto} onVolver={() => setDetalle(undefined)} onAccion={acciones.hacer} />
      {acciones.dialogo}
    </>
  )
}
