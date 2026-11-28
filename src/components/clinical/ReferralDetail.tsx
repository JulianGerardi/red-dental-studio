import { useState, type ReactNode } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { SearchPicker } from '@/components/ui/search-picker'
import { FieldLabel, FormFooter, SearchField, TextArea } from '@/components/patients/form'
import { Card } from '@/components/settings/primitives'
import { OBLIGATORIO } from '@/lib/validacion'
import type { DatosDerivacion, ProveedorDerivacion } from '@/data/clinical-mode'
import type { PendingTask } from '@/components/dashboard/PendingTaskCard'
import { MenuTarea, TONO_ESTADO, esEditable, type AccionUI } from '@/components/dashboard/tareas'
import { NewProviderDrawer } from './NewProviderDrawer'
import { Adjuntos, AvisosFicha, BotonDocumento, EncabezadoFicha, ProcedimientoResumen, ProcedimientosVinculados, type Adjunto } from './FichaClinica'
import { PROCEDIMIENTOS_REFERRAL, agregarProveedor, guardarRegistro, hoy, proveedoresDerivacion, urge, type Registro } from './registros'

/* La ficha de una Referral: la misma para New referral, Edit y la vista de una derivación que ya no se edita. Mismos datos
   y acciones que red.dev (videos de Julián del 2026-11-25 y 27), con el armado de FichaClinica: quién deriva y cuándo en
   el título y dos cards, una debajo de la otra (General information y Details). Reglas de CON-2322 / CON-2323. Ver design-reference/figma/modulos/clinical-mode.md (2026-11-27). */

const MAX_NOTA = 500
const VACIA: DatosDerivacion = { proveedor: '', nota: '', procedimientos: [], asap: false, obligatoria: false, adjuntos: [] }

export function ReferralDetail({ registro, nuevo, onVolver, onAccion }: {
  registro: Registro
  /** Todavía no existe: Save la crea en Pending. */
  nuevo?: boolean
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
  const [intento, setIntento] = useState(false)
  const [nuevoProveedor, setNuevoProveedor] = useState(false)

  /* Sólo se edita en Pending (CON-2323); no pide un encuentro abierto (Julián, 2026-11-27). */
  const editable = nuevo || esEditable(registro)
  const elegidos = PROCEDIMIENTOS_REFERRAL.filter((p) => procedimientos.includes(p.id))

  /* El provider se elige de la lista; escrito a mano vale si coincide con uno. Los errores se muestran después del
     primer intento y se van al corregir el campo. */
  const elegido = proveedores.find((p) => p.nombre.toLowerCase() === proveedor.trim().toLowerCase())
  const revisar = () => ({
    proveedor: elegido ? undefined : proveedor.trim() ? 'Select a provider from the list.' : OBLIGATORIO,
    nota: nota.trim() ? undefined : OBLIGATORIO,
  })
  const errores: ReturnType<typeof revisar> = intento ? revisar() : { proveedor: undefined, nota: undefined }

  const guardarSiVale = () => {
    setIntento(true)
    const e = revisar()
    if (e.proveedor || e.nota) return false
    guardarRegistro({ ...registro, updated: hoy(), derivacion: { proveedor: elegido!.nombre, nota: nota.trim(), procedimientos, asap, obligatoria, adjuntos: adjuntos.map((a) => ({ nombre: a.nombre, bytes: a.bytes ?? 0, url: a.url })) } })
    return true
  }
  const guardar = () => {
    if (!guardarSiVale()) return
    aviso.ok(`The referral has been successfully ${nuevo ? 'created' : 'updated'}.`)
    onVolver()
  }
  /* Request deja la derivación sin edición: si hay cambios sin guardar, antes se validan y se guardan, así sale con lo
     que se ve en pantalla. Sin cambios, pasa como desde la tabla. */
  const foto = JSON.stringify([proveedor, asap, obligatoria, nota, procedimientos, adjuntos.map((a) => a.nombre)])
  const [original] = useState(foto)
  const accion = (t: PendingTask, a: AccionUI) => { if (a === 'Request' && editable && foto !== original && !guardarSiVale()) return; onAccion(t, a) }

  const especialidad = (nombre: string) => proveedores.find((p) => p.nombre === nombre)?.especialidad || undefined

  return (
    <div className="flex flex-col gap-4">
      <EncabezadoFicha
        titulo={nuevo ? 'New referral' : 'Referral'} estado={registro.state} tono={TONO_ESTADO[registro.state]} onVolver={onVolver} volverA="referrals"
        /* Quién deriva, cuándo (CON-2609) y hasta cuándo vale, de sólo lectura, en el título como en Lab order. En New no
           van: red.dev no los muestra (Julián, 2026-11-28). */
        datos={nuevo ? undefined : [['Referring provider', registro.provider ?? '—'], ['Referral date', registro.register], ...(registro.expiration ? [['Expiration date', <span key="vence" className={cn(urge(registro) && 'text-dash-bad-fg')}>{registro.expiration}</span>] as [string, ReactNode]] : [])]}
        acciones={!nuevo && <>
          <BotonDocumento registro={registro} onAccion={onAccion} />
          <MenuTarea task={registro} onAccion={accion} sin={['Edit']} />
        </>}
      />

      <AvisosFicha editable={editable} nombre="referral" incompleto={Object.values(errores).includes(OBLIGATORIO)} error={errores.proveedor !== OBLIGATORIO ? errores.proveedor : undefined} />

      {/* Una card debajo de la otra, como los formularios de la app. */}
      <Card title="General information">
        <fieldset disabled={!editable} className="flex min-w-0 flex-col gap-4">
          <legend className="sr-only">General information</legend>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
            <SearchField
              label="Referral provider" required clearable className="min-w-0 flex-1" placeholder="Search by name or surname"
              options={proveedores.map((p) => p.nombre)} subtext={especialidad} emptyText="No results found."
              value={proveedor} onChange={setProveedor} error={errores.proveedor} disabled={!editable}
            />
            <Button variant="secondary" size="lg" className="sm:mt-6" disabled={!editable} onClick={() => setNuevoProveedor(true)}><Plus /> New provider</Button>
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
            <ProcedimientosVinculados items={elegidos} disabled={!editable} onRemove={(p) => setProcedimientos((a) => a.filter((id) => id !== p.id))} />
          </div>
          {/* ASAP y Mandatory debajo de Procedures (y de los elegidos), como red.dev (Julián, 2026-11-28). */}
          <div className={cn('flex flex-wrap items-center gap-x-6 gap-y-3', !editable && 'opacity-60')}>
            <label className={cn('flex w-fit items-center gap-2 text-[13px] font-medium text-ink', editable && 'cursor-pointer')}>
              <Checkbox on={asap} onChange={setAsap} label="ASAP" disabled={!editable} /> ASAP
            </label>
            <label className={cn('flex w-fit items-center gap-2 text-[13px] font-medium text-ink', editable && 'cursor-pointer')}>
              <Checkbox on={obligatoria} onChange={setObligatoria} label="Mandatory to continue treatment" disabled={!editable} /> Mandatory to continue treatment
            </label>
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
          onGuardar={(p) => { agregarProveedor(p); setProveedores((x) => [...x, p]); setProveedor(p.nombre); aviso.ok(`${p.nombre} added and selected.`) }}
        />
      )}
    </div>
  )
}
