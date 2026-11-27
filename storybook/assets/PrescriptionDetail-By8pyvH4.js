import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { FileText, Plus, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { DatePicker } from '@/components/ui/date-picker'
import { Pill } from '@/components/ui/pill'
import { Tabs } from '@/components/ui/tabs'
import { FieldError, FieldLabel, FormFooter, SearchField, SelectField, TextArea, TextField } from '@/components/patients/form'
import { Card } from '@/components/settings/primitives'
import { OBLIGATORIO } from '@/lib/validacion'
import { formatMDY } from '@/lib/fecha'
import { TARJETA_INTERNA, BOTON_BORRAR } from '@/lib/estilos'
import {
  FORMAS, FRECUENCIAS, MEDICACION_ACTIVA, MEDICAMENTOS, UNIDADES_DOSIS, UNIDADES_DURACION, UNIDADES_FUERZA, VIAS, erroresDe, fraseDeUso, medicacionVacia, nombreMedicacion,
  type Medicacion,
} from '@/data/recetas'
import type { PendingTask } from '@/components/dashboard/PendingTaskCard'
import { MenuTarea, TONO_ESTADO, esEditable, type AccionUI } from '@/components/dashboard/tareas'
import { AvisosFicha, COLUMNAS_FICHA, DatoFicha, EncabezadoFicha } from './FichaClinica'
import { guardarRegistro, hoy, type Registro } from './registros'

/* La ficha de una Prescription: la misma para New prescription, Edit y la vista de una receta que ya no se edita. Campos,
   listas y validaciones de red.dev (recorrido del 2026-11-27) y de CON-2230 / CON-2354 / CON-2337, con el armado de las
   otras dos fichas (FichaClinica): a la izquierda lo que define la receta (vencimiento y medicaciones, una por pestaña);
   a la derecha el resumen de todas y las indicaciones. Ver design-reference/figma/modulos/clinical-mode.md (2026-11-27). */

const MAX_TEXTO = 500
const aFecha = (s: string) => { const f = new Date(s); return s && !Number.isNaN(f.getTime()) ? f : null }
/* CON-2230: enteros o decimales, sin negativos. */
const decimal = (v: string) => v.replace(/[^\\d.]/g, '').replace(/(\\..*)\\./g, '$1').slice(0, 8)
const entero = (v: string) => v.replace(/\\D/g, '').slice(0, 4)
/* CON-2230: el vencimiento es posterior a hoy y no pasa el límite normativo (6 meses): de mañana a seis meses. */
const manana = () => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1) }
const limite = () => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth() + 6, d.getDate()) }

/* Campos cortos (número, unidad, lista): de a tres en una columna ancha, de a dos en el resto. */
const TRES = 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3'

const SubTitulo = ({ children }: { children: string }) => <h3 className="text-[13px] font-semibold text-ink">{children}</h3>

export function PrescriptionDetail({ registro, nuevo, abierto, onVolver, onAccion }: {
  registro: Registro
  /** Todavía no existe: Save la crea en Pending. */
  nuevo?: boolean
  /** Hay un encuentro abierto con el paciente. */
  abierto: boolean
  onVolver: () => void
  onAccion: (t: PendingTask, a: AccionUI) => void
}) {
  /* Sólo se edita en Pending (CON-2354) y con un encuentro abierto. */
  const editable = abierto && (nuevo || esEditable(registro))
  const [vence, setVence] = useState<Date | null>(() => aFecha(registro.expiration))
  const [medicaciones, setMedicaciones] = useState<Medicacion[]>(() => registro.receta?.medicaciones.length ? registro.receta.medicaciones : [medicacionVacia()])
  const [actual, setActual] = useState(() => String(medicaciones[0]!.id))
  const [indicaciones, setIndicaciones] = useState(registro.receta?.indicaciones ?? '')
  const [intento, setIntento] = useState(false)

  const m = medicaciones.find((x) => String(x.id) === actual) ?? medicaciones[0]!
  const cambiar = <K extends keyof Medicacion>(k: K) => (v: Medicacion[K]) => setMedicaciones((lista) => lista.map((x) => (x.id === m.id ? { ...x, [k]: v } : x)))
  const errores = intento ? erroresDe(m).errores : {}
  const falta = (k: keyof Medicacion) => errores[k]
  /* Una Pending vieja puede abrir con la fecha ya vencida: avisa al guardar (CON-2230). */
  const errorVence = !intento ? undefined : !vence ? OBLIGATORIO : vence < manana() ? 'Date cannot be in the past' : vence > limite() ? 'Date cannot be more than 6 months from today.' : undefined
  const incompleto = intento && (!vence || medicaciones.some((x) => erroresDe(x).faltan))
  const [reusar, setReusar] = useState(false)
  const yaActivas = medicaciones.filter((x) => x.actualizar && MEDICACION_ACTIVA.includes(x.nombre))

  const agregar = () => { const nueva = medicacionVacia(); setMedicaciones((l) => [...l, nueva]); setActual(String(nueva.id)) }
  /* Debe quedar al menos una (CON-2354: "A prescription must contain at least one medication."). */
  const quitar = () => {
    const resto = medicaciones.filter((x) => x.id !== m.id)
    setMedicaciones(resto)
    setActual(String(resto[Math.max(0, medicaciones.indexOf(m) - 1)]!.id))
  }

  const confirmar = () => {
    guardarRegistro({ ...registro, expiration: formatMDY(vence!), updated: hoy(), receta: { medicaciones, indicaciones: indicaciones.trim() } })
    aviso.ok(\`The prescription has been successfully \${nuevo ? 'created' : 'updated'}.\`)
    onVolver()
  }
  const guardar = () => {
    setIntento(true)
    const conErrores = medicaciones.find((x) => Object.keys(erroresDe(x).errores).length)
    if (conErrores) setActual(String(conErrores.id))
    if (!vence || vence < manana() || vence > limite() || conErrores) return
    /* CON-2846: una medicación con Update patient medications que el paciente ya tiene activa pregunta antes. */
    if (yaActivas.length) { setReusar(true); return }
    confirmar()
  }

  const rotulo = (x: Medicacion, i: number) => nombreMedicacion(x) || \`Medication \${i + 1}\`
  const casilla = (k: 'actualizar' | 'generico' | 'controlada', label: string) => (
    <label className={cn('flex w-fit items-center gap-2 text-[13px] font-medium text-ink', editable ? 'cursor-pointer' : 'opacity-60')}>
      <Checkbox on={m[k]} onChange={cambiar(k)} label={label} disabled={!editable} /> {label}
    </label>
  )
  const frase = fraseDeUso(m)

  return (
    <div className="flex flex-col gap-4">
      <EncabezadoFicha
        titulo={nuevo ? 'New prescription' : 'Prescription'} estado={registro.state} tono={TONO_ESTADO[registro.state]} onVolver={onVolver} volverA="prescriptions"
        acciones={!nuevo && <>
          {registro.pdf && <Button variant="secondary" onClick={() => onAccion(registro, 'PDF')}><FileText /> PDF</Button>}
          <MenuTarea task={registro} abierto={abierto} onAccion={onAccion} sin={['Edit']} />
        </>}
      />

      <AvisosFicha abierto={abierto} editable={editable} nombre="prescription" incompleto={incompleto} />

      {/* La columna de la derecha no se estira: queda pegada arriba mientras se recorre la medicación, con el resumen a la vista. */}
      <div className={cn(COLUMNAS_FICHA, 'lg:items-start')}>
        <Card title="General information">
          <div className="flex min-w-0 flex-col gap-6">
            <fieldset disabled={!editable} className={cn(TRES, 'min-w-0')}>
              <legend className="sr-only">General information</legend>
              {/* CON-2230: se guarda quién la hizo y cuándo; de sólo lectura, como en Lab order y Referral. */}
              <DatoFicha label="Prescribing provider">{registro.provider}</DatoFicha>
              <DatoFicha label="Prescription date">{registro.register}</DatoFicha>
              <div className="flex flex-col gap-2">
                <FieldLabel required>Expiration date</FieldLabel>
                {/* CON-2230: ni en el pasado ni más allá del límite; esos días no se eligen. */}
                <DatePicker value={vence} onChange={setVence} error={!!errorVence} min={manana()} max={limite()} label="Expiration date" disabled={!editable} />
                {errorVence && <FieldError>{errorVence}</FieldError>}
              </div>
            </fieldset>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <FieldLabel>Medications</FieldLabel>
                {editable && <Button size="sm" variant="secondary" className="ml-auto" onClick={agregar}><Plus /> Add medication</Button>}
              </div>
              {/* Una pestaña por medicación, con su nombre apenas se elige; el punto rojo marca la que tiene faltantes. */}
              {medicaciones.length > 1 && (
                <Tabs
                  size="sm" aria-label="Medications" value={String(m.id)} onChange={setActual}
                  tabs={medicaciones.map((x, i) => ({ value: String(x.id), label: rotulo(x, i), alerta: intento && Object.keys(erroresDe(x).errores).length > 0 }))}
                />
              )}

              {/* Las pestañas quedan fuera del fieldset: en sólo lectura también se recorren las medicaciones. */}
              <fieldset disabled={!editable} className="flex min-w-0 flex-col gap-4" aria-label={rotulo(m, medicaciones.indexOf(m))}>
                <div className="flex min-h-7 items-center gap-2">
                  <SubTitulo>Medication details</SubTitulo>
                  {editable && medicaciones.length > 1 && (
                    <Button size="sm" variant="ghost" className={cn(BOTON_BORRAR, 'ml-auto')} onClick={quitar}><Trash2 /> Remove medication</Button>
                  )}
                </div>
                <div className={TRES}>
                  <SearchField
                    label="Medication" required clearable className="sm:col-span-2 xl:col-span-3" placeholder="Search by drug name or brand name" options={MEDICAMENTOS}
                    value={m.nombre} onChange={cambiar('nombre')} error={falta('nombre')} disabled={!editable} emptyText="No results found."
                  />
                  <TextField label="Strength" required placeholder="e.g. 500" value={m.fuerza} onChange={(v) => cambiar('fuerza')(decimal(v))} error={falta('fuerza')} disabled={!editable} />
                  <SelectField label="Strength unit" required placeholder="Select strength unit" options={UNIDADES_FUERZA} value={m.unidadFuerza} onChange={cambiar('unidadFuerza')} error={falta('unidadFuerza')} disabled={!editable} />
                  <SelectField label="Dosage form" required placeholder="Select dosage form" options={FORMAS} buscable value={m.forma} onChange={cambiar('forma')} error={falta('forma')} disabled={!editable} />
                  <TextField label="Quantity to dispense" required placeholder="e.g. 30" value={m.cantidad} onChange={(v) => cambiar('cantidad')(entero(v))} error={falta('cantidad')} disabled={!editable} />
                  <TextField label="Refills" placeholder="0" value={m.refills} onChange={(v) => cambiar('refills')(entero(v))} disabled={!editable} />
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {casilla('actualizar', 'Update patient medications')}
                  {casilla('generico', 'Allow generic substitution')}
                  {casilla('controlada', 'Controlled substance')}
                </div>

                <SubTitulo>Directions for use</SubTitulo>
                <div className={TRES}>
                  <TextField label="Dose" required placeholder="e.g. 1" value={m.dosis} onChange={(v) => cambiar('dosis')(decimal(v))} error={falta('dosis')} disabled={!editable} />
                  <SelectField label="Dose unit" required placeholder="Select dose unit" options={UNIDADES_DOSIS} value={m.unidadDosis} onChange={cambiar('unidadDosis')} error={falta('unidadDosis')} disabled={!editable} />
                  <SelectField label="Route" required placeholder="Select route" options={VIAS} value={m.via} onChange={cambiar('via')} error={falta('via')} disabled={!editable} />
                  <SelectField label="Frequency" required placeholder="Select frequency" options={FRECUENCIAS} value={m.frecuencia} onChange={cambiar('frecuencia')} error={falta('frecuencia')} disabled={!editable} />
                  <TextField label="Duration" required placeholder="e.g. 7" value={m.duracion} onChange={(v) => cambiar('duracion')(entero(v))} error={falta('duracion')} disabled={!editable} />
                  <SelectField label="Duration unit" required options={UNIDADES_DURACION} value={m.unidadDuracion} onChange={cambiar('unidadDuracion')} error={falta('unidadDuracion')} disabled={!editable} />
                </div>
                {/* La indicación en una frase, como red.dev debajo de Directions for Use. */}
                {frase && <p className="rounded-md bg-surface-subtle px-3 py-2 text-[13px] text-ink" aria-live="polite">{frase}</p>}
              </fieldset>
            </div>
          </div>
        </Card>

        <Card title="Details" className="lg:sticky lg:top-4" bodyClassName="flex flex-col gap-4">
          {/* Todas las medicaciones a la vista, con la indicación en una frase como la arma red.dev: lo que se revisa antes
              de activar, sin recorrer las pestañas. */}
          <div className="flex flex-col gap-2">
            <FieldLabel>Summary</FieldLabel>
            <ul className="flex flex-col gap-2" aria-label="Prescription summary">
              {medicaciones.map((x, i) => (
                <li key={x.id}>
                  <button
                    type="button" onClick={() => setActual(String(x.id))} aria-current={x.id === m.id || undefined}
                    className={cn(TARJETA_INTERNA, 'flex w-full flex-col gap-1.5 p-3 text-left transition-colors hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-dash-blue', x.id === m.id && medicaciones.length > 1 && 'ring-1 ring-dash-blue')}
                  >
                    <span className="text-[13px] font-semibold text-ink">{rotulo(x, i)}{x.forma && <span className="font-normal text-ink-muted"> · {x.forma}</span>}</span>
                    <span className="text-[12px] text-ink">{fraseDeUso(x) || 'Complete the directions for use.'}</span>
                    {(x.cantidad || x.controlada || !x.generico || x.actualizar) && (
                      <span className="flex flex-wrap items-center gap-1.5 text-[11px] text-ink-muted">
                        {x.cantidad && <span>Quantity {x.cantidad} · Refills {x.refills || '0'}</span>}
                        {x.controlada && <Pill tone="warning">Controlled substance</Pill>}
                        {!x.generico && <Pill tone="neutral">No generic substitution</Pill>}
                        {x.actualizar && <Pill tone="info">Updates patient medications</Pill>}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <fieldset disabled={!editable} className="flex min-w-0 flex-col">
            <legend className="sr-only">Details</legend>
            <TextArea
              label="Additional instructions" rows={7} placeholder="Enter additional instructions"
              value={indicaciones} onChange={(v) => setIndicaciones(v.slice(0, MAX_TEXTO))} disabled={!editable} hint={\`\${indicaciones.length}/\${MAX_TEXTO}\`}
            />
          </fieldset>
        </Card>
      </div>

      <div className="mt-1 flex justify-end">
        <FormFooter onCancel={onVolver} onSave={guardar} saveDisabled={!editable} cancelLabel={editable ? 'Cancel' : 'Back'} />
      </div>

      {reusar && (
        <ConfirmDialog
          title="Medication already active" confirmLabel="Reuse existing medication" cancelLabel="Cancel" icon="warning"
          onCancel={() => setReusar(false)} onConfirm={() => { setReusar(false); confirmar() }}
        >
          <p>This medication is already active for the patient. Do you want to reuse the existing medication?</p>
          <p className="mt-2 font-medium text-ink">{yaActivas.map(nombreMedicacion).join(', ')}</p>
        </ConfirmDialog>
      )}
    </div>
  )
}
`})))()}export{n,i as r,r as t};