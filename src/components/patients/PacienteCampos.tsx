import { useEffect, useMemo, useState } from 'react'
import { Check } from 'lucide-react'
import { DrawerSection } from '@/components/ui/drawer'
import { Pill } from '@/components/ui/pill'
import { SectionNotice } from '@/components/ui/section-notice'
import { DateField, OptionCheckbox, SelectField, TextField } from '@/components/patients/form'
import type { DatosPaciente } from '@/data/patientsStore'

/* Las tres secciones del formulario de paciente -General, Guardian y Demography-, las mismas en New Patient (tres pasos)
   y en Edit Patient (tres pestañas). Figma 3751:73452 (New) y 5277:123056 (Edit). Decisiones y anomalías en
   design-reference/figma/modulos/patients.md, 2026-10-22. */

export const SECCIONES_PACIENTE = ['General', 'Guardian', 'Demography'] as const
export type SeccionPaciente = (typeof SECCIONES_PACIENTE)[number]
export type ErroresPaciente = Partial<Record<keyof DatosPaciente, string>>
export type CambiarPaciente = <K extends keyof DatosPaciente>(campo: K, valor: DatosPaciente[K]) => void

const OBLIGATORIO = 'This field is required.'
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* En qué sección vive cada campo: el guardado la usa para señalar la pestaña y llevar al usuario hasta el campo. */
const SECCION_DE_CAMPO: Record<keyof DatosPaciente, SeccionPaciente> = {
  first: 'General', middle: 'General', last: 'General', birthday: 'General', email: 'General', interpreter: 'General', portal: 'General',
  guardian: 'Guardian', guardianName: 'Guardian', guardianRel: 'Guardian',
  phone: 'Demography', language: 'Demography', address: 'Demography', city: 'Demography', zip: 'Demography',
}

/* Orden en que se recorren los campos para encontrar el primero con error. */
const ORDEN: (keyof DatosPaciente)[] = ['first', 'middle', 'last', 'birthday', 'email', 'guardianName', 'guardianRel', 'phone', 'language', 'address', 'city', 'zip']

/* Obligatorios: nombre, apellido y nacimiento; con "Associate a guardian" tildado, también quién es y qué relación tiene.
   Demography es opcional entero, como dice su aviso. `portalNuevo`: se pide crear la cuenta del portal con este email, así
   que el email hace falta. */
export function validarPaciente(d: DatosPaciente, portalNuevo: boolean): ErroresPaciente {
  const e: ErroresPaciente = {}
  if (!d.first.trim()) e.first = OBLIGATORIO
  if (!d.last.trim()) e.last = OBLIGATORIO
  if (!d.birthday.trim()) e.birthday = OBLIGATORIO
  if (d.email.trim() && !EMAIL.test(d.email.trim())) e.email = 'Enter a valid email.'
  else if (portalNuevo && !d.email.trim()) e.email = 'Enter an email to create the portal account.'
  if (d.guardian) {
    if (!d.guardianName.trim()) e.guardianName = OBLIGATORIO
    if (!d.guardianRel.trim()) e.guardianRel = OBLIGATORIO
  }
  return e
}

/* Si "Associate a guardian" no está tildado, el guardián no se guarda. */
export const limpiarPaciente = (d: DatosPaciente): DatosPaciente =>
  d.guardian ? d : { ...d, guardianName: '', guardianRel: '' }

/* El estado de un formulario de paciente. Los errores se ven recién después del primer intento de seguir o guardar, y
   desde ahí se actualizan solos al corregir. `revisar` devuelve dónde llevar al usuario: la sección y el campo del
   primer error. */
export function useFormPaciente(inicial: DatosPaciente, portalVinculado = false) {
  const [d, setD] = useState(inicial)
  const [intentado, setIntentado] = useState(false)
  const [foco, setFoco] = useState<{ campo: keyof DatosPaciente; n: number } | null>(null)
  const portalNuevo = d.portal && !portalVinculado
  const todos = useMemo(() => validarPaciente(d, portalNuevo), [d, portalNuevo])
  const errores: ErroresPaciente = intentado ? todos : {}

  const cambiar: CambiarPaciente = (campo, valor) => setD((p) => ({ ...p, [campo]: valor }))

  /* Marca los errores y devuelve el primero de esas secciones, o null si todo está bien. */
  const revisar = (secciones: readonly SeccionPaciente[]) => {
    setIntentado(true)
    const campo = ORDEN.find((k) => todos[k] && secciones.includes(SECCION_DE_CAMPO[k]))
    return campo ? { seccion: SECCION_DE_CAMPO[campo], campo } : null
  }
  const enfocar = (campo: keyof DatosPaciente) => setFoco({ campo, n: Date.now() })
  const conError = (s: SeccionPaciente) => ORDEN.some((k) => errores[k] && SECCION_DE_CAMPO[k] === s)

  /* Después de cambiar de sección ya está montado el campo: se enfoca el primer control de su contenedor. */
  useEffect(() => {
    if (!foco) return
    document.querySelector<HTMLElement>(`[data-campo="${foco.campo}"] input, [data-campo="${foco.campo}"] button`)?.focus()
  }, [foco])

  return { d, cambiar, errores, revisar, enfocar, conError, reiniciarIntento: () => setIntentado(false) }
}

/* El contenedor que deja ubicar un campo desde afuera (ver el foco de useFormPaciente). */
const Campo = ({ nombre, children }: { nombre: keyof DatosPaciente; children: React.ReactNode }) => <div data-campo={nombre}>{children}</div>

type Props = { d: DatosPaciente; cambiar: CambiarPaciente; errores: ErroresPaciente }

/* La cuenta del portal ya vinculada (sólo en Edit Patient): un estado, no una opción. */
function CuentaPortal() {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-dash-ok-bg px-4 py-3">
      <span className="bg-dash-ok-fg flex size-5 shrink-0 items-center justify-center rounded-full text-white">
        <Check className="size-3" strokeWidth={3} />
      </span>
      <span className="flex-1 text-[13px] font-semibold text-ink">Patient portal account</span>
      <Pill tone="success" size="sm">Linked</Pill>
    </div>
  )
}

/* Figma: en New Patient las dos opciones; en Edit Patient, "Interpreter Required" y la cuenta del portal como estado
   ("Linked"). Si el paciente aún no tiene cuenta, Edit ofrece la misma opción que New. El Figma dibuja Email a todo el
   ancho; acá va en la grilla de a dos, como pide la regla de los drawers (Components / UI / Drawer → Specs → Fields). */
export function CamposGeneral({ d, cambiar, errores, portalVinculado }: Props & { portalVinculado?: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      {portalVinculado && <CuentaPortal />}
      <DrawerSection title="General Information">
        <OptionCheckbox label="Interpreter Required" checked={d.interpreter} onChange={(v) => cambiar('interpreter', v)} />
        {!portalVinculado && (
          <OptionCheckbox label="Create a patient portal account using this email address" checked={d.portal} onChange={(v) => cambiar('portal', v)} />
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Campo nombre="first"><TextField label="First Name" required placeholder="John" value={d.first} onChange={(v) => cambiar('first', v)} error={errores.first} /></Campo>
          <Campo nombre="middle"><TextField label="Middle Name" placeholder="Lorem" value={d.middle} onChange={(v) => cambiar('middle', v)} /></Campo>
          <Campo nombre="last"><TextField label="Last Name" required placeholder="Smith" value={d.last} onChange={(v) => cambiar('last', v)} error={errores.last} /></Campo>
          <Campo nombre="birthday"><DateField label="Birthdate" required valorInicial={d.birthday} onChange={(v) => cambiar('birthday', v)} error={errores.birthday} /></Campo>
          <Campo nombre="email"><TextField label="Email" placeholder="john.smith@hotmail.com" value={d.email} onChange={(v) => cambiar('email', v)} error={errores.email} /></Campo>
        </div>
      </DrawerSection>
    </div>
  )
}

export function CamposGuardian({ d, cambiar, errores }: Props) {
  return (
    <DrawerSection title="Guardian Information">
      <SectionNotice>
        Optional section. Use this section when a guardian needs to be associated with the patient. It is available in both creation and editing.
      </SectionNotice>
      <OptionCheckbox label="Associate a guardian with this patient" checked={d.guardian} onChange={(v) => cambiar('guardian', v)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Campo nombre="guardianName">
          <TextField label="Guardian Full Name" required placeholder="Full name" disabled={!d.guardian} value={d.guardianName} onChange={(v) => cambiar('guardianName', v)} error={errores.guardianName} />
        </Campo>
        <Campo nombre="guardianRel">
          <SelectField
            label="Relationship to Patient" required options={['Parent', 'Guardian', 'Sibling', 'Spouse', 'Other']}
            disabled={!d.guardian} value={d.guardianRel} onChange={(v) => cambiar('guardianRel', v)} error={errores.guardianRel}
          />
        </Campo>
      </div>
    </DrawerSection>
  )
}

export function CamposDemography({ d, cambiar }: Props) {
  return (
    <DrawerSection title="Demographic Information">
      <SectionNotice>Additional contact and address information. These fields are optional.</SectionNotice>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Campo nombre="phone"><TextField label="Phone" placeholder="408-XXX-XXXX" value={d.phone} onChange={(v) => cambiar('phone', v)} /></Campo>
        <Campo nombre="language"><TextField label="Preferred Language" placeholder="English" value={d.language} onChange={(v) => cambiar('language', v)} /></Campo>
        <Campo nombre="address"><TextField label="Address" placeholder="Street name and number" value={d.address} onChange={(v) => cambiar('address', v)} /></Campo>
        <Campo nombre="city"><SelectField label="City" options={['Phoenix', 'Los Angeles', 'Miami', 'New York']} value={d.city} onChange={(v) => cambiar('city', v)} /></Campo>
        <Campo nombre="zip"><TextField label="ZIP / Postal Code" placeholder="85016" value={d.zip} onChange={(v) => cambiar('zip', v)} /></Campo>
      </div>
    </DrawerSection>
  )
}
