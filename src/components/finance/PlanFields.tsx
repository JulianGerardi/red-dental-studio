import { X } from 'lucide-react'
import { SearchField, SelectField, TextField } from '@/components/patients/form'
import { PhoneFields, UnitField } from '@/components/finance/fields'
import { ICONO_SUELTO } from '@/lib/estilos'
import { ESTADOS, PAISES } from '@/data/location-options'
import {
  ASIGNACIONES, CONTACTOS, CORONAS_PAGADAS, FUENTES_PAGO, MESES, SI_NO, TIPOS_PLAN, esNorteamerica,
  type Arancel, type PlanSeguro,
} from '@/data/finanzas'

/* Los campos de Detail de un insurance plan (red.dev): General description, Contact Information, Address Information y
   Configurations. Los usan el drawer New Insurance Plan (un paso por grupo) y la pestaña Information del plan (una card por
   grupo). Ver settings-billing.md. */

export const PLAN_VACIO = {
  nombre: '', grupo: '', area: '', numero: '', contactoNombre: '', contactoApellido: '', contactoEmail: '', organizacion: '',
  linea1: '', linea2: '', pais: 'United States of America (the)', estadoUs: '', ciudad: '', zip: '',
  mesRenovacion: '', fuentePago: '', tipo: '', arancelMaximo: '', espera: '', edadMaxima: '', dienteFaltante: '',
  coronas: '', fueraDeRed: '', asignacion: '',
}
export type FormPlan = typeof PLAN_VACIO

/* Lo obligatorio de cada grupo, en el orden de los pasos. */
export const obligatoriosPlan = (codigo: string): (keyof FormPlan)[][] => [
  ['nombre', 'grupo'],
  esNorteamerica(codigo) ? ['area', 'numero'] : ['numero'],
  ['linea1', 'pais', 'estadoUs', 'ciudad', 'zip'],
  ['mesRenovacion', 'fuentePago', 'tipo', 'espera', 'edadMaxima', 'dienteFaltante'],
]

export const formDePlan = (p: PlanSeguro, aranceles: Arancel[]): FormPlan => ({
  nombre: p.nombre, grupo: p.grupo, area: p.telefono.area, numero: p.telefono.numero,
  contactoNombre: p.contacto.nombre, contactoApellido: p.contacto.apellido, contactoEmail: p.contacto.email, organizacion: p.contacto.organizacion,
  linea1: p.linea1, linea2: p.linea2, pais: p.pais, estadoUs: p.estadoUs, ciudad: p.ciudad, zip: p.zip,
  mesRenovacion: p.mesRenovacion, fuentePago: p.fuentePago, tipo: p.tipo,
  arancelMaximo: aranceles.find((a) => a.id === p.arancelMaximoId)?.nombre ?? '',
  espera: p.id ? String(p.espera) : '', edadMaxima: p.id ? String(p.edadMaxima) : '',
  dienteFaltante: p.dienteFaltante, coronas: p.coronas, fueraDeRed: p.fueraDeRed, asignacion: p.asignacion,
})

export const planDeForm = (f: FormPlan, codigo: string, base: PlanSeguro, aranceles: Arancel[]): PlanSeguro => ({
  ...base,
  nombre: f.nombre.trim(), grupo: f.grupo.trim(),
  telefono: { codigo, area: esNorteamerica(codigo) ? f.area : '', numero: f.numero },
  contacto: { nombre: f.contactoNombre.trim(), apellido: f.contactoApellido.trim(), email: f.contactoEmail.trim(), organizacion: f.organizacion.trim() },
  linea1: f.linea1.trim(), linea2: f.linea2.trim(), pais: f.pais, estadoUs: f.estadoUs, ciudad: f.ciudad.trim(), zip: f.zip.trim(),
  mesRenovacion: f.mesRenovacion, fuentePago: f.fuentePago, tipo: f.tipo,
  arancelMaximoId: aranceles.find((a) => a.nombre === f.arancelMaximo)?.id ?? '',
  espera: Number(f.espera) || 0, edadMaxima: Number(f.edadMaxima) || 0,
  dienteFaltante: f.dienteFaltante, coronas: f.coronas, fueraDeRed: f.fueraDeRed, asignacion: f.asignacion,
})

type Props = {
  d: FormPlan
  set: (k: keyof FormPlan) => (v: string) => void
  falta: (k: keyof FormPlan) => string | undefined
}

/* red.dev pone de placeholder "Street name and number" y "Additional info" (los de la dirección): acá dicen qué va. */
export function PlanGeneralFields({ d, set, falta }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <TextField label="Plan/Employer name" required placeholder="Plan or employer name" value={d.nombre} onChange={set('nombre')} error={falta('nombre')} />
      <TextField label="Group #" required placeholder="Group number" value={d.grupo} onChange={set('grupo')} error={falta('grupo')} />
    </div>
  )
}

/* Contact elige a alguien de la agenda y completa los cuatro campos; la ✕ los vacía. */
export function PlanContactFields({ d, set, falta, codigo, onCodigo }: Props & { codigo: string; onCodigo: (c: string) => void }) {
  const nombreContacto = [d.contactoNombre, d.contactoApellido].filter(Boolean).join(' ')
  const elegir = (v: string) => {
    const c = CONTACTOS.find((x) => `${x.nombre} ${x.apellido}` === v)
    if (!c) { set('contactoNombre')(v); return }
    set('contactoNombre')(c.nombre); set('contactoApellido')(c.apellido); set('contactoEmail')(c.email); set('organizacion')(c.organizacion)
  }
  const limpiar = () => (['contactoNombre', 'contactoApellido', 'contactoEmail', 'organizacion'] as const).forEach((k) => set(k)(''))
  return (
    <div className="flex flex-col gap-4">
      <PhoneFields
        required value={{ codigo, area: d.area, numero: d.numero }}
        onChange={(t) => { onCodigo(t.codigo); set('area')(t.area); set('numero')(t.numero) }}
        errores={{ area: falta('area'), numero: falta('numero') }}
      />
      <div className="flex items-end gap-2">
        <SearchField label="Contact" placeholder="Select contact" options={CONTACTOS.map((c) => `${c.nombre} ${c.apellido}`)} value={nombreContacto} onChange={elegir} className="min-w-0 flex-1 sm:max-w-[calc(50%-8px)]" />
        <button type="button" aria-label="Clear contact" onClick={limpiar} disabled={!nombreContacto} className={`${ICONO_SUELTO} mb-1 disabled:opacity-40`}>
          <X className="size-4" />
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="First Name" placeholder="First Name" value={d.contactoNombre} onChange={set('contactoNombre')} />
        <TextField label="Last Name" placeholder="Last Name" value={d.contactoApellido} onChange={set('contactoApellido')} />
        <TextField label="Email" placeholder="Email" value={d.contactoEmail} onChange={set('contactoEmail')} />
        <TextField label="Organization" placeholder="Organization" value={d.organizacion} onChange={set('organizacion')} />
      </div>
    </div>
  )
}

export function PlanAddressFields({ d, set, falta }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <TextField label="Address Line 1" required placeholder="Street name and number" value={d.linea1} onChange={set('linea1')} error={falta('linea1')} />
      <TextField label="Address Line 2" placeholder="Additional info" value={d.linea2} onChange={set('linea2')} />
      <SelectField label="Country" required options={PAISES} value={d.pais} onChange={set('pais')} error={falta('pais')} />
      <SelectField label="State" required placeholder="Select your region" options={ESTADOS} value={d.estadoUs} onChange={set('estadoUs')} error={falta('estadoUs')} />
      <TextField label="City" required placeholder="Your city" value={d.ciudad} onChange={set('ciudad')} error={falta('ciudad')} />
      <TextField label="ZIP Code" required placeholder="Postal code (only numbers)" value={d.zip} onChange={(v) => set('zip')(v.replace(/\D/g, ''))} error={falta('zip')} />
    </div>
  )
}

export function PlanConfigurationFields({ d, set, falta, aranceles }: Props & { aranceles: Arancel[] }) {
  const numero = (k: 'espera' | 'edadMaxima') => (n: number) => set(k)(String(n))
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <SelectField label="Benefit Renewal Month" required placeholder="Select benefit renewal month" options={MESES} value={d.mesRenovacion} onChange={set('mesRenovacion')} error={falta('mesRenovacion')} />
      <SelectField label="Source of Payment" required placeholder="Select source of payment" options={FUENTES_PAGO} value={d.fuentePago} onChange={set('fuentePago')} error={falta('fuentePago')} />
      <SelectField label="Type" required placeholder="Select type" options={TIPOS_PLAN} value={d.tipo} onChange={set('tipo')} error={falta('tipo')} />
      <SelectField
        label="Max Allowable Amount Fee Schedule" placeholder="Select max allowable amount fee schedule"
        options={aranceles.filter((a) => a.estado === 'Active').map((a) => a.nombre)} value={d.arancelMaximo} onChange={set('arancelMaximo')}
      />
      <UnitField label="Waiting Period" required unit="months" value={Number(d.espera) || 0} onChange={numero('espera')} error={falta('espera')} />
      <UnitField label="Dependent Max Age" required unit="years" value={Number(d.edadMaxima) || 0} onChange={numero('edadMaxima')} error={falta('edadMaxima')} />
      <SelectField label="Missing Tooth Clause" required placeholder="Select missing tooth clause" options={SI_NO} value={d.dienteFaltante} onChange={set('dienteFaltante')} error={falta('dienteFaltante')} />
      <SelectField label="Crowns/Bridges Paid On" placeholder="Select crowns/bridges paid on" options={CORONAS_PAGADAS} value={d.coronas} onChange={set('coronas')} />
      <SelectField label="Out of Network Benefits" placeholder="Select out of network benefits" options={SI_NO} value={d.fueraDeRed} onChange={set('fueraDeRed')} />
      <SelectField label="Out of Network Benefit Assignment" placeholder="Select out of network benefit assignment" options={ASIGNACIONES} value={d.asignacion} onChange={set('asignacion')} />
    </div>
  )
}
