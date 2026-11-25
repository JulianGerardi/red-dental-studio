import { useState, type ReactNode } from 'react'
import { FileText, Paperclip, Plus, Upload, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DrawerSection } from '@/components/ui/drawer'
import { Pill } from '@/components/ui/pill'
import { SearchPicker } from '@/components/ui/search-picker'
import { FieldError, FieldHint, FieldLabel, SearchField, TextArea } from '@/components/patients/form'
import { ICONO_SUELTO, TARJETA_INTERNA, TARJETA_PANEL } from '@/lib/estilos'
import { OBLIGATORIO } from '@/lib/validacion'
import { DERIVACION_TAREA, PROCEDIMIENTOS, PROVEEDORES_DERIVACION, type AdjuntoDerivacion, type ProveedorDerivacion } from '@/data/clinical-mode'
import { NO_ASIGNADOS } from '@/data/treatment-plan'
import type { PendingTask } from '@/components/dashboard/PendingTaskCard'
import { MenuTarea, SIN_ENCUENTRO, TONO_ESTADO, tareaViva, useAccionesTarea, useTareasVivas, type AccionUI } from '@/components/dashboard/tareas'
import { NewProviderDrawer } from './NewProviderDrawer'

/* El detalle de una Referral, el que abre Complete this task desde Pending Task (video de red.dev de Julián, 2026-11-25).
   Mismos datos y acciones que red.dev, con el diseño de Clinical Mode: una sola card como el panel de Treatment plan
   (título, estado y ⋮ arriba; secciones sin caja; Cancel y Save en el pie). Reglas de CON-2322 / CON-2323. Ver
   design-reference/figma/modulos/clinical-mode.md (2026-11-25). */

const MAX_NOTA = 500
const MAX_BYTES = 10 * 1024 * 1024
const FORMATOS = ['application/pdf', 'image/jpeg', 'image/png']

/* Sólo se derivan procedimientos Planned del paciente (CON-2322). */
type Opcion = { id: string; codigo: string; nombre: string; pieza?: string; superficie?: string }
const PLANNED: Opcion[] = [
  ...NO_ASIGNADOS.slice(0, 5).map((p) => ({ id: p.id, codigo: p.codigo, nombre: p.nombre, pieza: p.pieza, superficie: p.superficie })),
  ...PROCEDIMIENTOS.filter((p) => p.estado === 'Planned').map((p) => ({ id: p.id, codigo: p.codigo, nombre: p.nombre, pieza: p.pieza ? String(p.pieza) : undefined, superficie: p.superficie })),
]
const conGuion = (v?: string) => (v && v !== '-' ? v : undefined)

const OpcionProcedimiento = ({ p }: { p: Opcion }) => {
  const zona = [conGuion(p.pieza) && `Tooth ${p.pieza}`, conGuion(p.superficie)].filter(Boolean).join(' · ')
  return (
    <span className="flex min-w-0 flex-col gap-0.5 text-xs">
      <span><span className="font-bold text-dash-blue">{p.codigo} - </span><span className="font-medium text-ink">{p.nombre}</span></span>
      {zona && <span className="text-[11px] text-ink-muted">{zona}</span>}
    </span>
  )
}

const tamano = (b: number) => (b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`)

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
  const [adjuntos, setAdjuntos] = useState<AdjuntoDerivacion[]>(inicio.adjuntos)
  const [errorAdjunto, setErrorAdjunto] = useState<string>()
  const [errores, setErrores] = useState<{ proveedor?: string; nota?: string }>({})
  const [nuevoProveedor, setNuevoProveedor] = useState(false)
  const [arrastrando, setArrastrando] = useState(false)

  /* Sólo se edita en Pending (CON-2323) y con un encuentro abierto. */
  const pendiente = tarea.state === 'Pending'
  const editable = abierto && pendiente

  const sumar = (archivos: FileList | null) => {
    if (!archivos?.length) return
    const validos = [...archivos].filter((f) => FORMATOS.includes(f.type) && f.size <= MAX_BYTES)
    setErrorAdjunto(validos.length < archivos.length ? 'Invalid file format or size.' : undefined)
    setAdjuntos((a) => [...a, ...validos.map((f) => ({ nombre: f.name, bytes: f.size }))])
  }

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
      {!abierto
        ? <Alert tone="warning" title="Read-only mode">{SIN_ENCUENTRO}</Alert>
        : !pendiente && <Alert tone="info" title="This referral can't be edited">It was already requested. Only pending referrals can be edited.</Alert>}

      <section className={cn(TARJETA_PANEL, 'flex min-w-0 flex-col')} aria-labelledby="referral-titulo">
        {/* Encabezado como el del panel de Treatment plan: qué es, su estado y sus acciones. */}
        <header className="flex items-start gap-4 border-b border-line-hair px-4 py-4 sm:items-center sm:px-6">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-center gap-2.5">
              <h2 id="referral-titulo" className="text-lg font-bold text-ink">Referral</h2>
              <Pill tone={TONO_ESTADO[tarea.state] ?? 'info'}>{tarea.state}</Pill>
            </div>
            <p className="text-[12px] text-ink-muted">
              {tarea.person}
              <span aria-hidden> · </span>Register {tarea.register}
              <span aria-hidden> · </span>Expiration date <span className="font-semibold text-dash-bad-fg">{tarea.expiration}</span>
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-2">
            {tarea.pdf && <Button variant="secondary" size="sm" onClick={() => onAccion(tarea, 'PDF')}><FileText /> PDF</Button>}
            <MenuTarea task={tarea} abierto={abierto} onAccion={onAccion} />
          </span>
        </header>

        <fieldset disabled={!editable} className="grid min-w-0 gap-x-10 gap-y-8 px-4 py-5 sm:px-6 lg:grid-cols-2">
          <legend className="sr-only">Referral information</legend>
          <DrawerSection title="General information">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
              <SearchField
                label="Referral provider" required className="min-w-0 flex-1" placeholder="Search by name or surname"
                options={proveedores.map((p) => p.nombre)} subtext={especialidad} emptyText="No results found."
                value={proveedor} onChange={setProveedor} error={errores.proveedor} disabled={!editable}
              />
              <Button variant="secondary" size="lg" className={cn(errores.proveedor && 'sm:mb-6')} disabled={!editable} onClick={() => setNuevoProveedor(true)}><Plus /> New provider</Button>
            </div>

            <div className="flex flex-col gap-2">
              <FieldLabel>Procedures</FieldLabel>
              <SearchPicker
                multiple items={PLANNED} getId={(p) => p.id} getText={(p) => `${p.codigo} ${p.nombre}`}
                renderOption={(p) => <OpcionProcedimiento p={p} />}
                selected={PLANNED.filter((p) => procedimientos.includes(p.id))}
                onSelect={(p) => setProcedimientos((a) => [...new Set([...a, p.id])])}
                onRemove={(p) => setProcedimientos((a) => a.filter((id) => id !== p.id))}
                placeholder="Search by code or description" ariaLabel="Search procedures" emptyText="No planned procedure matches that search."
                accion="vincular" tituloElegidos="Referred procedures"
              />
              <FieldHint>Only planned procedures can be referred.</FieldHint>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <label className="flex w-fit items-center gap-2 text-[13px] text-ink">
                <Checkbox on={asap} onChange={setAsap} label="ASAP" disabled={!editable} /> ASAP
              </label>
              <label className="flex w-fit items-center gap-2 text-[13px] text-ink">
                <Checkbox on={obligatoria} onChange={setObligatoria} label="Mandatory to continue treatment" disabled={!editable} /> Mandatory to continue treatment
              </label>
            </div>
          </DrawerSection>

          <DrawerSection title="Details">
            <TextArea
              label="Referral note" required rows={4} placeholder="Why the patient is being referred"
              value={nota} onChange={(v) => setNota(v.slice(0, MAX_NOTA))} error={errores.nota} disabled={!editable}
              hint={`${nota.length}/${MAX_NOTA}`}
            />
            <div className="flex flex-col gap-2">
              <FieldLabel>Attachments</FieldLabel>
              <div
                onDragOver={(e) => { if (!editable) return; e.preventDefault(); setArrastrando(true) }}
                onDragLeave={() => setArrastrando(false)}
                onDrop={(e) => { e.preventDefault(); setArrastrando(false); if (editable) sumar(e.dataTransfer.files) }}
                className={cn(
                  'flex flex-col items-center gap-1.5 rounded-lg border-2 border-dashed px-4 py-5 text-center transition-colors sm:flex-row sm:gap-3 sm:text-left',
                  arrastrando ? 'border-dash-blue bg-surface-subtle' : 'border-line-strong',
                  !editable && 'opacity-60',
                )}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-dash-count-bg text-dash-blue"><Upload className="size-4" aria-hidden /></span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-[13px] font-semibold text-ink">Drag and drop your files</span>
                  <span className="text-[11px] text-ink-muted">PDF, JPG, PNG, up to 10MB</span>
                </span>
                <label className={cn('h-8 shrink-0 rounded-md border border-line bg-white px-3 text-[13px] leading-8 font-medium focus-within:outline-2 focus-within:outline-dash-blue', editable ? 'cursor-pointer hover:bg-surface-subtle' : 'cursor-not-allowed')}>
                  Select file
                  <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="sr-only" disabled={!editable} onChange={(e) => { sumar(e.target.files); e.target.value = '' }} />
                </label>
              </div>
              {errorAdjunto && <FieldError>{errorAdjunto}</FieldError>}
              {adjuntos.length > 0 && (
                <ul className="flex flex-col gap-2" aria-label="Attached files">
                  {adjuntos.map((a, i) => (
                    <li key={`${a.nombre}-${i}`} className={cn(TARJETA_INTERNA, 'flex items-center gap-3 px-3 py-2')}>
                      <Paperclip className="size-4 shrink-0 text-dash-blue" aria-hidden />
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-[13px] font-medium text-ink">{a.nombre}</span>
                        <span className="text-[11px] text-ink-muted">{tamano(a.bytes)}</span>
                      </span>
                      {editable && (
                        <button type="button" className={ICONO_SUELTO} aria-label={`Remove ${a.nombre}`} onClick={() => setAdjuntos((x) => x.filter((_, n) => n !== i))}>
                          <X className="size-4" />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </DrawerSection>
        </fieldset>

        <footer className="flex justify-between gap-3 border-t border-line-hair px-4 py-4 sm:px-6">
          <Button variant="secondary" onClick={onVolver}>Cancel</Button>
          <Button onClick={guardar} disabled={!editable}>Save</Button>
        </footer>
      </section>

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
