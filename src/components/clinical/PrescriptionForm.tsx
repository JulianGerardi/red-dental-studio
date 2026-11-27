import { useState, type ReactNode } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { aviso } from '@/components/ui/toaster'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DatePicker, formatMDY } from '@/components/ui/date-picker'
import { Tabs } from '@/components/ui/tabs'
import { FieldError, FieldHint, FieldLabel, FormFooter, SearchField, SelectField, TextArea, TextField } from '@/components/patients/form'
import { Card } from '@/components/settings/primitives'
import { OBLIGATORIO } from '@/lib/validacion'
import {
  DOSIS_UNIDADES, DROGAS, DURACION_UNIDADES, FORMAS, FRECUENCIAS, FUERZA_UNIDADES, TONO_RECETA, VIAS, medicacionNueva,
  type Medicacion, type Receta,
} from '@/data/prescripciones'
import { EncabezadoFicha } from './FichaClinica'

/* New / Edit prescription: la ficha de Clinical Mode con la estructura de Edit account (FichaClinica), como Lab order y
   Referral. Campos y validaciones de CON-2230 y CON-2354. Ver design-reference/figma/modulos/clinical-mode.md
   (2026-11-27). */

const MAX_TEXTO = 500
const DIAS = 24 * 60 * 60 * 1000
const hoy = () => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate()) }
/* Posterior a hoy y hasta el límite normativo de seis meses (CON-2230): el calendario no deja elegir otra cosa. */
const MINIMO = () => new Date(hoy().getTime() + DIAS)
const MAXIMO = () => { const d = hoy(); return new Date(d.getFullYear(), d.getMonth() + 6, d.getDate()) }
const deMDY = (s: string) => { const [m, d, a] = s.split('/').map(Number); return m && d && a ? new Date(a, m - 1, d) : null }

/* Sólo números positivos; con decimales donde la dosis o la concentración los admiten (CON-2230). */
const numero = (v: string, decimales = false) => (decimales ? v.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1') : v.replace(/\D/g, ''))

type Errores = Partial<Record<keyof Medicacion, string>>
const MAYOR_A_CERO = 'Enter a number greater than 0.'

function validar(m: Medicacion): Errores {
  const e: Errores = {}
  const req = (k: keyof Medicacion) => { if (!String(m[k]).trim()) e[k] = OBLIGATORIO }
  ;(['fuerzaUnidad', 'forma', 'dosisUnidad', 'via', 'frecuencia', 'duracionUnidad'] as const).forEach(req)
  if (!m.droga.trim()) e.droga = OBLIGATORIO
  else if (!DROGAS.includes(m.droga)) e.droga = 'Select a medication from the list.'
  ;(['fuerza', 'cantidad', 'dosis', 'duracion'] as const).forEach((k) => {
    if (!m[k].trim()) e[k] = OBLIGATORIO
    else if (!(Number(m[k]) > 0)) e[k] = MAYOR_A_CERO
  })
  return e
}

/** Un valor con su unidad en la misma fila (Strength, Dose, Duration): un rótulo y dos controles. */
function ConUnidad({ label, valor, unidad, opciones, decimales, error, errorUnidad, placeholder, onValor, onUnidad }: {
  label: string
  valor: string
  unidad: string
  opciones: string[]
  decimales?: boolean
  error?: string
  errorUnidad?: string
  placeholder?: string
  onValor: (v: string) => void
  onUnidad: (v: string) => void
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <FieldLabel required>{label}</FieldLabel>
      <div className="grid grid-cols-[minmax(0,1fr)_6.5rem] items-start gap-2">
        <TextField hideLabel label={label} value={valor} placeholder={placeholder} error={error} onChange={(v) => onValor(numero(v, decimales))} />
        <SelectField hideLabel label={`${label} unit`} placeholder="Unit" options={opciones} value={unidad} error={errorUnidad && 'Select a unit.'} onChange={onUnidad} />
      </div>
    </div>
  )
}

/** Una casilla con su nombre al lado: las opciones se guardan con Save (regla de `ui/switch`). */
const Opcion = ({ label, on, onChange }: { label: string; on: boolean; onChange: (v: boolean) => void }) => (
  <label className="flex w-fit items-center gap-2 text-[13px] text-ink">
    <Checkbox on={on} onChange={onChange} label={label} /> {label}
  </label>
)

const Subtitulo = ({ children }: { children: ReactNode }) => <h3 className="text-[13px] font-semibold text-ink">{children}</h3>

export function PrescriptionForm({ receta, onVolver, onGuardar, acciones }: {
  /** La receta que se edita; sin ella, New prescription. */
  receta?: Receta
  onVolver: () => void
  onGuardar: (r: Pick<Receta, 'vence' | 'medicaciones' | 'indicaciones'>) => void
  /** PDF y ⋮ junto al título. */
  acciones?: ReactNode
}) {
  const nueva = !receta
  /* Sólo se edita en Pending (CON-2354); el resto se abre para consultar (CON-2286). */
  const editable = nueva || receta.estado === 'Pending'
  const [vence, setVence] = useState<Date | null>(() => (receta ? deMDY(receta.vence) : null))
  const [meds, setMeds] = useState<Medicacion[]>(() => receta?.medicaciones.map((m) => ({ ...m })) ?? [medicacionNueva('n1')])
  const [activa, setActiva] = useState(meds[0]!.id)
  const [indicaciones, setIndicaciones] = useState(receta?.indicaciones ?? '')
  const [errores, setErrores] = useState<Record<string, Errores>>({})
  const [errorVence, setErrorVence] = useState<string>()
  const [siguiente, setSiguiente] = useState(2)

  const m = meds.find((x) => x.id === activa) ?? meds[0]!
  const e = errores[m.id] ?? {}
  const cambiar = (patch: Partial<Medicacion>) => {
    setMeds((xs) => xs.map((x) => (x.id === m.id ? { ...x, ...patch } : x)))
    /* El error de un campo se va al corregirlo; los demás quedan hasta el próximo Save. */
    setErrores((p) => {
      const propios = { ...p[m.id] }
      Object.keys(patch).forEach((k) => delete propios[k as keyof Medicacion])
      return { ...p, [m.id]: propios }
    })
  }

  const agregar = () => {
    const id = `n${siguiente}`
    setSiguiente((n) => n + 1)
    setMeds((xs) => [...xs, medicacionNueva(id)])
    setActiva(id)
  }
  const quitar = () => {
    /* Siempre queda una (CON-2354). */
    const i = meds.findIndex((x) => x.id === m.id)
    const resto = meds.filter((x) => x.id !== m.id)
    setMeds(resto)
    setActiva(resto[Math.max(0, i - 1)]!.id)
    aviso.ok(`Medication ${i + 1} removed.`)
  }

  const guardar = () => {
    const porMed = Object.fromEntries(meds.map((x) => [x.id, validar(x)]))
    /* Una Pending vieja puede abrir con la fecha ya vencida: se vuelve a validar (CON-2354). */
    const ev = !vence ? OBLIGATORIO : vence < MINIMO() ? 'Date cannot be in the past' : vence > MAXIMO() ? 'Date cannot be more than 6 months from today.' : undefined
    setErrores(porMed)
    setErrorVence(ev)
    const conError = meds.find((x) => Object.keys(porMed[x.id]!).length > 0)
    if (ev || conError) {
      /* Si lo que falla está en otra medicación, se abre esa (la pestaña además lleva el punto rojo). */
      if (conError && !Object.keys(porMed[activa] ?? {}).length) setActiva(conError.id)
      aviso.error('Uncompleted fields: All required fields marked with (*) must be completed before proceeding.')
      return
    }
    onGuardar({ vence: formatMDY(vence!), medicaciones: meds, indicaciones: indicaciones.trim() })
  }

  return (
    <div className="flex flex-col gap-4">
      <EncabezadoFicha
        titulo={nueva ? 'New prescription' : 'Prescription'}
        estado={receta?.estado ?? 'Pending'} tono={TONO_RECETA[receta?.estado ?? 'Pending']}
        acciones={acciones}
      />

      {!editable && (
        <Alert tone="info" title="This prescription can't be edited">Only pending prescriptions can be edited.</Alert>
      )}

      <Card title="General information">
        <fieldset disabled={!editable} className="grid min-w-0 gap-4 sm:grid-cols-2">
          <legend className="sr-only">General information</legend>
          <div className="flex flex-col gap-2">
            <FieldLabel required>Expiration date</FieldLabel>
            <DatePicker
              value={vence} onChange={(d) => { setVence(d); setErrorVence(undefined) }}
              min={MINIMO()} max={MAXIMO()} placeholder="Select date" label="Expiration date"
              error={!!errorVence} disabled={!editable} className="h-9 w-full"
            />
            {errorVence ? <FieldError>{errorVence}</FieldError> : editable && <FieldHint>From tomorrow up to 6 months.</FieldHint>}
          </div>
          <TextArea
            label="Additional instructions" rows={3} placeholder="Enter additional instructions..."
            value={indicaciones} onChange={(v) => setIndicaciones(v.slice(0, MAX_TEXTO))} disabled={!editable}
            hint={editable && `${indicaciones.length}/${MAX_TEXTO}`}
          />
        </fieldset>
      </Card>

      <Card
        title="Medications"
        action={editable && <Button variant="secondary" size="md" onClick={agregar}><Plus /> New medication</Button>}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Tabs
            aria-label="Medications" size="sm" value={m.id} onChange={setActiva}
            tabs={meds.map((x, i) => ({ value: x.id, label: `Medication ${i + 1}`, alerta: Object.keys(errores[x.id] ?? {}).length > 0 }))}
          />
          {editable && meds.length > 1 && (
            <Button variant="ghost" size="sm" className="ml-auto text-field-error hover:text-field-error" onClick={quitar}>
              <Trash2 /> Remove medication {meds.findIndex((x) => x.id === m.id) + 1}
            </Button>
          )}
        </div>

        <fieldset key={m.id} disabled={!editable} className="mt-5 grid min-w-0 gap-x-8 gap-y-6 xl:grid-cols-2">
          <legend className="sr-only">Medication {meds.findIndex((x) => x.id === m.id) + 1}</legend>
          <section className="flex min-w-0 flex-col gap-4" aria-label="Medication details">
            <Subtitulo>Medication details</Subtitulo>
            <SearchField
              label="Medication" required clearable placeholder="Search by drug name or brand name" emptyText="No results found."
              options={DROGAS} value={m.droga} onChange={(v) => cambiar({ droga: v })} error={e.droga} disabled={!editable}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <ConUnidad
                label="Strength" decimales placeholder="e.g. 500" valor={m.fuerza} unidad={m.fuerzaUnidad} opciones={FUERZA_UNIDADES}
                error={e.fuerza} errorUnidad={e.fuerzaUnidad} onValor={(v) => cambiar({ fuerza: v })} onUnidad={(v) => cambiar({ fuerzaUnidad: v })}
              />
              <SelectField label="Dosage form" required options={FORMAS} value={m.forma} error={e.forma} onChange={(v) => cambiar({ forma: v })} />
              <TextField
                label="Quantity to dispense" required placeholder="e.g. 30" value={m.cantidad} error={e.cantidad}
                onChange={(v) => cambiar({ cantidad: numero(v) })}
              />
              <TextField label="Refills" placeholder="0" value={m.recargas} onChange={(v) => cambiar({ recargas: numero(v) })} />
            </div>
            <div className="flex flex-col gap-3 pt-1">
              <Opcion label="Allow generic substitution" on={m.generico} onChange={(v) => cambiar({ generico: v })} />
              <Opcion label="Controlled substance" on={m.controlada} onChange={(v) => cambiar({ controlada: v })} />
              <Opcion label="Update patient medications" on={m.actualizar} onChange={(v) => cambiar({ actualizar: v })} />
            </div>
          </section>

          <section className="flex min-w-0 flex-col gap-4" aria-label="Directions for use">
            <Subtitulo>Directions for use</Subtitulo>
            <div className="grid gap-4 sm:grid-cols-2">
              <ConUnidad
                label="Dose" decimales placeholder="e.g. 1" valor={m.dosis} unidad={m.dosisUnidad} opciones={DOSIS_UNIDADES}
                error={e.dosis} errorUnidad={e.dosisUnidad} onValor={(v) => cambiar({ dosis: v })} onUnidad={(v) => cambiar({ dosisUnidad: v })}
              />
              <SelectField label="Route" required options={VIAS} value={m.via} error={e.via} onChange={(v) => cambiar({ via: v })} />
              <SelectField label="Frequency" required options={FRECUENCIAS} value={m.frecuencia} error={e.frecuencia} onChange={(v) => cambiar({ frecuencia: v })} />
              <ConUnidad
                label="Duration" placeholder="e.g. 7" valor={m.duracion} unidad={m.duracionUnidad} opciones={DURACION_UNIDADES}
                error={e.duracion} errorUnidad={e.duracionUnidad} onValor={(v) => cambiar({ duracion: v })} onUnidad={(v) => cambiar({ duracionUnidad: v })}
              />
            </div>
          </section>
        </fieldset>
      </Card>

      <div className="mt-1 flex justify-end">
        {editable
          ? <FormFooter onCancel={onVolver} onSave={guardar} />
          : <Button variant="secondary" size="md" onClick={onVolver}>Back to prescriptions</Button>}
      </div>
    </div>
  )
}
