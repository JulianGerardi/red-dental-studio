import { useState, type ReactNode } from 'react'
import { FileText, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { SearchPicker } from '@/components/ui/search-picker'
import { FieldHint, FieldLabel, FormFooter, SearchField, TextArea } from '@/components/patients/form'
import { Card } from '@/components/settings/primitives'
import { OBLIGATORIO } from '@/lib/validacion'
import type { DatosDerivacion, ProveedorDerivacion } from '@/data/clinical-mode'
import type { PendingTask } from '@/components/dashboard/PendingTaskCard'
import { MenuTarea, TONO_ESTADO, esEditable, type AccionUI } from '@/components/dashboard/tareas'
import { NewProviderDrawer } from './NewProviderDrawer'
import { Adjuntos, AvisosFicha, EncabezadoFicha, ProcedimientoResumen, ProcedimientosVinculados, type Adjunto } from './FichaClinica'
import { PROCEDIMIENTOS_REFERRAL, agregarProveedor, guardarRegistro, hoy, proveedoresDerivacion, urge, type Registro } from './registros'

/* La ficha de una Referral: la misma para New referral, Edit y la vista de una derivación que ya no se edita. Mismos datos
   y acciones que red.dev (videos de Julián del 2026-11-25 y 27), con el armado de FichaClinica: quién deriva y cuándo en
   el título y dos cards, una debajo de la otra (General information y Details). Reglas de CON-2322 / CON-2323. Ver design-reference/figma/modulos/clinical-mode.md (2026-11-27). */

const MAX_NOTA = 500
const VACIA: DatosDerivacion = { proveedor: '', nota: '', procedimientos: [], asap: false, obligatoria: false, adjuntos: [] }

export function ReferralDetail({ registro, nuevo, abierto, onVolver, onAccion }: {
  registro: Registro
  /** Todavía no existe: Save la crea en Pending. */
  nuevo?: boolean
  /** Hay un encuentro abierto con el paciente. */
  abierto: boolean
  onVolver: () => void
  onAccion: (t: PendingTask, a: AccionUI) => void
}) {
  const inicio = registro.derivacion ?? VACIA
  const [proveedores, setProveedores] = useState<ProveedorDerivacion[]>(proveedoresDerivacion)
  const [proveedor, setProveedor] = useState(inicio.proveedor)
  const [procedimientos, setProcedimientos] = useState<string[]>(inicio.procedimientos)
  const [asap, setAsap] = useState(inicio.asap)
  const [obligatoria, setObligatoria] = useState(inicio.obligatoria)
  const [nota, setNota] = useState(inicio.nota)
  const [adjuntos, setAdjuntos] = useState<Adjunto[]>(inicio.adjuntos)
  const [errores, setErrores] = useState<{ proveedor?: string; nota?: string }>({})
  const [nuevoProveedor, setNuevoProveedor] = useState(false)

  /* Una derivación nueva se carga siempre (New no pide encuentro, como red.dev). Una existente: en Pending (CON-2323) y
     con un encuentro abierto. */
  const editable = nuevo || (abierto && esEditable(registro))
  const elegidos = PROCEDIMIENTOS_REFERRAL.filter((p) => procedimientos.includes(p.id))

  const guardar = () => {
    const e = {
      proveedor: proveedores.some((p) => p.nombre === proveedor) ? undefined : OBLIGATORIO,
      nota: nota.trim() ? undefined : OBLIGATORIO,
    }
    setErrores(e)
    if (e.proveedor || e.nota) return
    guardarRegistro({ ...registro, updated: hoy(), derivacion: { proveedor, nota: nota.trim(), procedimientos, asap, obligatoria, adjuntos: adjuntos.map((a) => ({ nombre: a.nombre, bytes: a.bytes ?? 0 })) } })
    aviso.ok(`The referral has been successfully ${nuevo ? 'created' : 'updated'}.`)
    onVolver()
  }

  const especialidad = (nombre: string) => proveedores.find((p) => p.nombre === nombre)?.especialidad || undefined

  return (
    <div className="flex flex-col gap-4">
      <EncabezadoFicha
        titulo={nuevo ? 'New referral' : 'Referral'} estado={registro.state} tono={TONO_ESTADO[registro.state]} onVolver={onVolver} volverA="referrals"
        /* Quién deriva, cuándo (CON-2609) y hasta cuándo vale, de sólo lectura, en el título como en Lab order. */
        datos={[['Referring provider', registro.provider ?? '—'], ['Referral date', registro.register], ...(registro.expiration ? [['Expiration date', <span key="vence" className={cn(urge(registro) && 'text-dash-bad-fg')}>{registro.expiration}</span>] as [string, ReactNode]] : [])]}
        acciones={!nuevo && <>
          {registro.pdf && <Button variant="secondary" onClick={() => onAccion(registro, 'PDF')}><FileText /> PDF</Button>}
          <MenuTarea task={registro} abierto={abierto} onAccion={onAccion} sin={['Edit']} />
        </>}
      />

      <AvisosFicha abierto={abierto || !!nuevo} editable={editable} nombre="referral" incompleto={Object.values(errores).some(Boolean)} />

      {/* Una card debajo de la otra, como los formularios de la app. */}
      <Card title="General information">
        <fieldset disabled={!editable} className="flex min-w-0 flex-col gap-4">
          <legend className="sr-only">General information</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
              <SearchField
                label="Referral provider" required clearable className="min-w-0 flex-1" placeholder="Search by name or surname"
                options={proveedores.map((p) => p.nombre)} subtext={especialidad} emptyText="No results found."
                value={proveedor} onChange={setProveedor} error={errores.proveedor} disabled={!editable}
              />
              <Button variant="secondary" size="lg" className={cn(errores.proveedor && 'sm:mb-6')} disabled={!editable} onClick={() => setNuevoProveedor(true)}><Plus /> New provider</Button>
            </div>
            <div className={cn('flex flex-wrap items-center gap-x-6 gap-y-3 sm:mt-[26px] sm:h-9', !editable && 'opacity-60')}>
              <label className="flex w-fit items-center gap-2 text-[13px] font-medium text-ink">
                <Checkbox on={asap} onChange={setAsap} label="ASAP" disabled={!editable} /> ASAP
              </label>
              <label className="flex w-fit items-center gap-2 text-[13px] font-medium text-ink">
                <Checkbox on={obligatoria} onChange={setObligatoria} label="Mandatory to continue treatment" disabled={!editable} /> Mandatory to continue treatment
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <FieldLabel>Procedures</FieldLabel>
            <SearchPicker
              multiple ocultarElegidos items={PROCEDIMIENTOS_REFERRAL} getId={(p) => p.id} getText={(p) => `${p.codigo} ${p.nombre} ${p.caso ?? ''} ${p.pieza ?? ''}`}
              renderOption={(p) => <ProcedimientoResumen p={p} />}
              selected={elegidos}
              onSelect={(p) => setProcedimientos((a) => [...new Set([...a, p.id])])}
              placeholder="Search by code or description" ariaLabel="Search procedures" emptyText="No planned procedure matches that search."
              accion="vincular" disabled={!editable}
            />
            {editable && <FieldHint>Only planned procedures can be referred.</FieldHint>}
            <ProcedimientosVinculados items={elegidos} disabled={!editable} onRemove={(p) => setProcedimientos((a) => a.filter((id) => id !== p.id))} />
          </div>
        </fieldset>
      </Card>

      <Card title="Details">
        {/* La nota a todo el ancho y los adjuntos debajo (Julián, 2026-11-27). */}
        <fieldset disabled={!editable} className="flex min-w-0 flex-col gap-4">
          <legend className="sr-only">Details</legend>
          <TextArea
            label="Referral note" required rows={6} placeholder="Why the patient is being referred"
            value={nota} onChange={(v) => setNota(v.slice(0, MAX_NOTA))} error={errores.nota} disabled={!editable}
            hint={`${nota.length}/${MAX_NOTA}`}
          />
          <Adjuntos value={adjuntos} onChange={setAdjuntos} disabled={!editable} />
        </fieldset>
      </Card>

      <div className="mt-1 flex justify-end">
        <FormFooter onCancel={onVolver} onSave={guardar} saveDisabled={!editable} cancelLabel={editable ? 'Cancel' : 'Back'} />
      </div>

      {nuevoProveedor && (
        <NewProviderDrawer
          onClose={() => setNuevoProveedor(false)}
          onGuardar={(p) => { agregarProveedor(p); setProveedores((x) => [...x, p]); setProveedor(p.nombre); setErrores((e) => ({ ...e, proveedor: undefined })); aviso.ok(`${p.nombre} added and selected.`) }}
        />
      )}
    </div>
  )
}
