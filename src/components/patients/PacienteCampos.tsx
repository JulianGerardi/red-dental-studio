import { useEffect, useMemo, useState } from 'react'
import { Check } from 'lucide-react'
import { DrawerSection } from '@/components/ui/drawer'
import { Pill } from '@/components/ui/pill'
import { SectionNotice } from '@/components/ui/section-notice'
import { CollapsibleFields, DateField, LinkPersonCheckbox, OptionCheckbox, PersonSearchField, CountryCodeField, SelectField, TextField } from '@/components/patients/form'
import type { DatosPaciente } from '@/data/patientsStore'
import { PERSONAS_SISTEMA, type PersonaSistema } from '@/data/personas'
import { codigoDe } from '@/data/paises'

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
  first: 'General', middle: 'General', last: 'General', birthday: 'General', email: 'General', interpreter: 'Demography', portal: 'General',
  guardianName: 'Guardian', guardianNuevo: 'Guardian', gFirst: 'Guardian', gLast: 'Guardian', gEmail: 'Guardian', gDob: 'Guardian',
  gCodigo: 'Guardian', gArea: 'Guardian', gNumero: 'Guardian', gExt: 'Guardian', gLinea1: 'Guardian', gLinea2: 'Guardian',
  gPais: 'Guardian', gEstado: 'Guardian', gCiudad: 'Guardian', gZip: 'Guardian', guardianGarante: 'Guardian', guardianRel: 'Guardian',
  phone: 'Demography', language: 'Demography', address: 'Demography', city: 'Demography', zip: 'Demography',
}

/* Orden en que se recorren los campos para encontrar el primero con error. */
const ORDEN: (keyof DatosPaciente)[] = [
  'first', 'middle', 'last', 'birthday', 'email',
  'guardianName', 'gFirst', 'gLast', 'gEmail', 'gDob', 'gCodigo', 'gArea', 'gNumero', 'gLinea1', 'gPais', 'gEstado', 'gCiudad', 'gZip', 'guardianRel',
  'phone', 'language', 'address', 'city', 'zip',
]

const CONTACTO_G = ['gCodigo', 'gArea', 'gNumero', 'gExt'] as const
const DIRECCION_G = ['gLinea1', 'gLinea2', 'gPais', 'gEstado', 'gCiudad', 'gZip'] as const
const NUEVO_G = ['gFirst', 'gLast', 'gEmail', 'gDob'] as const
const digitos = (s: string) => s.replace(/\D/g, '')

/* Menor de 18 a hoy. Sin fecha (o ilegible) no se lo trata como menor. */
export function esMenor(nacimiento: string) {
  const f = new Date(nacimiento)
  if (!nacimiento.trim() || Number.isNaN(f.getTime())) return false
  const hoy = new Date()
  const cumplio = hoy.getMonth() > f.getMonth() || (hoy.getMonth() === f.getMonth() && hoy.getDate() >= f.getDate())
  return hoy.getFullYear() - f.getFullYear() - (cumplio ? 0 : 1) < 18
}

/* El guardián elegido del buscador (si lo escrito coincide con alguien), o uno nuevo. Al de sistema no se le piden datos:
   ya están cargados (Julián, 2026-11-04). */
export function guardianDe(d: DatosPaciente) {
  const persona = d.guardianNuevo ? undefined : PERSONAS_SISTEMA.find((p) => p.name === d.guardianName)
  return { persona, tiene: d.guardianNuevo || !!persona }
}

/* Las secciones que se ven: Guardian, sólo para un menor de 18 (CON-2858; patients.md, 2026-11-04). */
export const seccionesDe = (menor: boolean): SeccionPaciente[] =>
  SECCIONES_PACIENTE.filter((s) => menor || s !== 'Guardian')

export const MENOR_SIN_GUARDIAN = 'This patient is a minor and must have at least one guardian assigned.'

/* Obligatorios: nombre, apellido y nacimiento. Guardian (CON-2858), sólo para un menor: en el alta hace falta uno; si hay
   guardián, su relación, y si es nuevo, sus datos, contacto y dirección (patients.md, 2026-11-04). Demography es opcional
   entero, como dice su aviso. `portalNuevo`: se pide crear la cuenta del portal con este email, así que el email hace
   falta. */
export function validarPaciente(d: DatosPaciente, portalNuevo: boolean, menor = false, exigirGuardian = false): ErroresPaciente {
  const e: ErroresPaciente = {}
  if (!d.first.trim()) e.first = OBLIGATORIO
  if (!d.last.trim()) e.last = OBLIGATORIO
  if (!d.birthday.trim()) e.birthday = OBLIGATORIO
  if (d.email.trim() && !EMAIL.test(d.email.trim())) e.email = 'Enter a valid email.'
  else if (portalNuevo && !d.email.trim()) e.email = 'Enter an email to create the portal account.'
  if (!menor) return e
  const g = guardianDe(d)
  if (!g.tiene) {
    if (d.guardianName.trim()) e.guardianName = 'Select a person from the list or tick Add New Person.'
    else if (exigirGuardian) e.guardianName = MENOR_SIN_GUARDIAN
    return e
  }
  if (d.guardianNuevo) {
    for (const k of NUEVO_G) if (!d[k].trim()) e[k] = OBLIGATORIO
    if (d.gEmail.trim() && !EMAIL.test(d.gEmail.trim())) e.gEmail = 'Enter a valid email.'
    for (const k of ['gCodigo', 'gArea', 'gNumero', 'gLinea1', 'gPais', 'gEstado', 'gCiudad', 'gZip'] as const) if (!d[k].trim()) e[k] = OBLIGATORIO
    if (d.gArea.trim() && digitos(d.gArea).length !== 3) e.gArea = 'Area code must be 3 digits.'
    if (d.gNumero.trim() && digitos(d.gNumero).length !== 7) e.gNumero = 'Number must be 7 digits.'
  }
  if (!d.guardianRel.trim()) e.guardianRel = OBLIGATORIO
  return e
}

/* Se guarda sólo lo que corresponde al guardián que quedó: nada si no hay (o si el paciente no es menor), y sin los datos
   de persona nueva si se eligió a alguien del sistema. */
export function limpiarPaciente(d: DatosPaciente, menor: boolean): DatosPaciente {
  const g = guardianDe(d)
  const vaciar = (ks: readonly (keyof DatosPaciente)[]) => Object.fromEntries(ks.map((k) => [k, ''])) as Partial<DatosPaciente>
  if (!menor || !g.tiene) return { ...d, guardianName: '', ...vaciar([...NUEVO_G, ...CONTACTO_G, ...DIRECCION_G, 'guardianRel']), guardianGarante: false }
  return {
    ...d,
    ...(d.guardianNuevo ? { guardianName: [d.gFirst.trim(), d.gLast.trim()].join(' ') } : vaciar([...NUEVO_G, ...CONTACTO_G, ...DIRECCION_G])),
  }
}

/* El estado de un formulario de paciente. Los errores se ven recién después del primer intento de seguir o guardar, y
   desde ahí se actualizan solos al corregir. `revisar` devuelve dónde llevar al usuario: la sección y el campo del
   primer error. */
export function useFormPaciente(
  inicial: DatosPaciente,
  { portalVinculado = false, guardianMenor = false, nacimiento }: {
    portalVinculado?: boolean
    /** Alta (CON-2858): un menor necesita guardián. Edit no lo exige, para no trabar la edición de fichas viejas. */
    guardianMenor?: boolean
    /** El nacimiento que vale si no es el escrito (New Patient vinculado a una persona del sistema). */
    nacimiento?: string
  } = {},
) {
  const [d, setD] = useState(inicial)
  const [intentado, setIntentado] = useState(false)
  const [foco, setFoco] = useState<{ campo: keyof DatosPaciente; n: number } | null>(null)
  const portalNuevo = d.portal && !portalVinculado
  const menor = esMenor(nacimiento ?? d.birthday)
  const todos = useMemo(() => validarPaciente(d, portalNuevo, menor, guardianMenor), [d, portalNuevo, guardianMenor, menor])
  const errores: ErroresPaciente = intentado ? todos : {}

  /* Add New Person muestra campos nuevos: arrancan limpios, no en rojo por el intento anterior (patients.md, 2026-11-04). */
  const cambiar: CambiarPaciente = (campo, valor) => {
    if (campo === 'guardianNuevo') setIntentado(false)
    setD((p) => ({ ...p, [campo]: valor }))
  }

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

  return { d, cambiar, errores, revisar, enfocar, conError, menor, secciones: seccionesDe(menor), reiniciarIntento: () => setIntentado(false) }
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
/* Sólo New Patient: tomar a alguien que el sistema ya tiene (empleado, contacto, suscriptor) en vez de cargar sus datos.
   Ver modulos/patients.md, 2026-11-02. */
export type VinculoPersona = {
  activo: boolean
  onActivo: (v: boolean) => void
  /** Quienes se pueden elegir: las personas del sistema que todavía no son pacientes. */
  personas: PersonaSistema[]
  /** El nombre de la elegida, o lo que se está escribiendo. */
  valor: string
  onValor: (v: string) => void
  error?: string
}

function BuscarPersona({ v }: { v: VinculoPersona }) {
  const elegida = v.personas.find((p) => p.name === v.valor)
  return (
    <div data-campo="persona">
      <PersonSearchField
        label="Person" required placeholder="Search by Name or Last Name"
        personas={v.personas.map((p) => p.name)}
        value={v.valor} onChange={v.onValor} error={v.error}
        emptyText="No one in the system matches this name. Untick the option to enter the patient's details."
        hint={elegida ? "The patient record will use this person's name, birthdate and email." : undefined}
        lineas={(n) => {
          const p = v.personas.find((x) => x.name === n)
          return p && [p.tipo, `DOB: ${p.dob}`, `Email: ${p.email}`]
        }}
      />
    </div>
  )
}

/* Orden de Julián (2026-11-04): primero vincular a una persona del sistema, después los datos y, debajo del email, la
   cuenta del portal. Interpreter Required pasa a Demography. */
export function CamposGeneral({ d, cambiar, errores, portalVinculado, vinculo }: Props & { portalVinculado?: boolean; vinculo?: VinculoPersona }) {
  return (
    <DrawerSection title="General Information">
      {vinculo && <LinkPersonCheckbox checked={vinculo.activo} onChange={vinculo.onActivo} />}
      {vinculo?.activo ? <BuscarPersona v={vinculo} /> : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Campo nombre="first"><TextField label="First Name" required placeholder="John" value={d.first} onChange={(v) => cambiar('first', v)} error={errores.first} /></Campo>
          <Campo nombre="middle"><TextField label="Middle Name" placeholder="Lorem" value={d.middle} onChange={(v) => cambiar('middle', v)} /></Campo>
          <Campo nombre="last"><TextField label="Last Name" required placeholder="Smith" value={d.last} onChange={(v) => cambiar('last', v)} error={errores.last} /></Campo>
          <Campo nombre="birthday"><DateField label="Birthdate" required valorInicial={d.birthday} onChange={(v) => cambiar('birthday', v)} error={errores.birthday} /></Campo>
          <Campo nombre="email"><TextField label="Email" placeholder="john.smith@hotmail.com" value={d.email} onChange={(v) => cambiar('email', v)} error={errores.email} /></Campo>
        </div>
      )}
      {portalVinculado ? <CuentaPortal /> : (
        <OptionCheckbox label="Create a patient portal account using this email address" checked={d.portal} onChange={(v) => cambiar('portal', v)} />
      )}
    </DrawerSection>
  )
}

/* Las relaciones de Confidentally 2.0 (grabación de Julián, 2026-11-04), de la A a la Z. */
const RELACIONES = ['Child', 'Grandchild', 'Grandparent', 'Other', 'Other Family Member', 'Parent', 'Partner', 'Sibling', 'Spouse']

/* El resumen muestra lo cargado aunque esté incompleto, como Personal y Address (Julián, 2026-11-04). */
const telefono = (d: DatosPaciente) => {
  const area = digitos(d.gArea)
  const num = digitos(d.gNumero)
  if (!area && !num) return ''
  return [codigoDe(d.gCodigo), area && `(${area})`, num.length === 7 ? `${num.slice(0, 3)}-${num.slice(3)}` : num, d.gExt.trim() && `ext. ${d.gExt.trim()}`]
    .filter(Boolean).join(' ')
}
const direccion = (d: DatosPaciente) => [d.gLinea1, d.gLinea2, d.gCiudad, d.gEstado, d.gZip].map((x) => x.trim()).filter(Boolean).join(', ')

/* Guardian (CON-2858; patients.md, 2026-11-04), sólo para un menor: buscar a alguien del sistema (sus datos ya están
   cargados: no se piden) o tildar Add New Person y cargarlo en tres desplegables con resumen -datos, contacto y
   dirección-, para que el paso no se estire como en 2.0. Relación y garante aparecen recién cuando hay guardián.
   `obligatorio`: en el alta el guardián hace falta (marca el campo).
   `excluir`: la persona del sistema que se está dando de alta como paciente (no puede ser su propio guardián). */
export function CamposGuardian({ d, cambiar, errores, obligatorio, excluir }: Props & { obligatorio?: boolean; excluir?: string }) {
  const g = guardianDe(d)
  const personas = PERSONAS_SISTEMA.filter((p) => p.name !== excluir)
  const errorEn = (ks: readonly (keyof DatosPaciente)[]) => ks.some((k) => errores[k])
  const tel = telefono(d)
  const dir = direccion(d)
  const persona = [[d.gFirst, d.gLast].map((x) => x.trim()).filter(Boolean).join(' '), d.gEmail.trim(), d.gDob && `DOB: ${d.gDob}`].filter(Boolean).join(' · ')
  return (
    <DrawerSection title="Guardian Information">
      <SectionNotice>This patient is under 18. Add at least one guardian: search for a person in the system or add a new one.</SectionNotice>
      <Campo nombre="guardianName">
        <PersonSearchField
          label="Guardian" required={obligatorio} placeholder="Search by Name or Last Name"
          personas={personas.map((p) => p.name)}
          value={d.guardianName} onChange={(v) => cambiar('guardianName', v)}
          disabled={d.guardianNuevo} error={errores.guardianName}
          emptyText="No one in the system matches this name. Tick Add New Person to enter their details."
          lineas={(n) => {
            const p = personas.find((x) => x.name === n)
            return p && [p.tipo, `DOB: ${p.dob}`, `Email: ${p.email}`]
          }}
        />
      </Campo>
      <OptionCheckbox
        label="Add New Person" checked={d.guardianNuevo}
        onChange={(v) => { cambiar('guardianNuevo', v); if (v) cambiar('guardianName', '') }}
      />
      {d.guardianNuevo && (
        <>
          <CollapsibleFields
            title="Personal Information" required defaultOpen error={errorEn(NUEVO_G)}
            summary={errorEn(NUEVO_G) ? 'Complete name, email and birthdate.' : persona || 'Add name, email and birthdate'}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Campo nombre="gFirst"><TextField label="First name" required placeholder="First name" value={d.gFirst} onChange={(v) => cambiar('gFirst', v)} error={errores.gFirst} /></Campo>
              <Campo nombre="gLast"><TextField label="Last name" required placeholder="Last name" value={d.gLast} onChange={(v) => cambiar('gLast', v)} error={errores.gLast} /></Campo>
              <Campo nombre="gEmail"><TextField label="Email" required placeholder="Email" value={d.gEmail} onChange={(v) => cambiar('gEmail', v)} error={errores.gEmail} /></Campo>
              <Campo nombre="gDob"><DateField label="Birthdate" required placeholder="Birthdate" valorInicial={d.gDob} onChange={(v) => cambiar('gDob', v)} error={errores.gDob} /></Campo>
            </div>
          </CollapsibleFields>
          <CollapsibleFields
            title="Contact Information" required error={errorEn(CONTACTO_G)}
            summary={errorEn(CONTACTO_G) ? 'Complete the phone number.' : tel || 'Add a phone number'}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Campo nombre="gCodigo"><CountryCodeField required value={d.gCodigo} onChange={(v) => cambiar('gCodigo', v)} error={errores.gCodigo} /></Campo>
              <Campo nombre="gArea"><TextField label="Area Code (3 digits)" required placeholder="555" value={d.gArea} onChange={(v) => cambiar('gArea', v)} error={errores.gArea} /></Campo>
              <Campo nombre="gNumero"><TextField label="Number (7 digits)" required placeholder="000-0000" value={d.gNumero} onChange={(v) => cambiar('gNumero', v)} error={errores.gNumero} /></Campo>
              <Campo nombre="gExt"><TextField label="Extension" placeholder="Extension" value={d.gExt} onChange={(v) => cambiar('gExt', v)} /></Campo>
            </div>
          </CollapsibleFields>
          <CollapsibleFields
            title="Address Information" required error={errorEn(DIRECCION_G)}
            summary={errorEn(DIRECCION_G) ? 'Complete the address.' : dir || 'Add an address'}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Campo nombre="gLinea1"><TextField label="Address Line 1" required placeholder="Street and number" value={d.gLinea1} onChange={(v) => cambiar('gLinea1', v)} error={errores.gLinea1} /></Campo>
              <Campo nombre="gLinea2"><TextField label="Address Line 2" placeholder="Apt, suite, floor" value={d.gLinea2} onChange={(v) => cambiar('gLinea2', v)} /></Campo>
              <Campo nombre="gPais"><SelectField label="Country" required placeholder="Select country" value={d.gPais} onChange={(v) => cambiar('gPais', v)} error={errores.gPais} /></Campo>
              <Campo nombre="gEstado"><SelectField label="State" required placeholder="Select your region" value={d.gEstado} onChange={(v) => cambiar('gEstado', v)} error={errores.gEstado} /></Campo>
              <Campo nombre="gCiudad"><TextField label="City" required placeholder="City" value={d.gCiudad} onChange={(v) => cambiar('gCiudad', v)} error={errores.gCiudad} /></Campo>
              <Campo nombre="gZip"><TextField label="ZIP Code" required placeholder="85016" value={d.gZip} onChange={(v) => cambiar('gZip', v)} error={errores.gZip} /></Campo>
            </div>
          </CollapsibleFields>
        </>
      )}
      {g.tiene && (
        <>
          <OptionCheckbox label="This person is also a guarantor" checked={d.guardianGarante} onChange={(v) => cambiar('guardianGarante', v)} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Campo nombre="guardianRel">
              <SelectField
                label="Relationship to Patient" required placeholder="Select a relationship type" options={RELACIONES}
                value={d.guardianRel} onChange={(v) => cambiar('guardianRel', v)} error={errores.guardianRel}
              />
            </Campo>
          </div>
        </>
      )}
    </DrawerSection>
  )
}

export function CamposDemography({ d, cambiar }: Props) {
  return (
    <DrawerSection title="Demographic Information">
      <SectionNotice>Additional contact and address information. These fields are optional.</SectionNotice>
      <OptionCheckbox label="Interpreter Required" checked={d.interpreter} onChange={(v) => cambiar('interpreter', v)} />
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
