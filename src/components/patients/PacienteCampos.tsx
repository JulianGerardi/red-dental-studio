import { useEffect, useMemo, useState } from 'react'
import { Check } from 'lucide-react'
import { DrawerSection } from '@/components/ui/drawer'
import { Pill } from '@/components/ui/pill'
import { Alert } from '@/components/ui/alert'
import { CollapsibleFields, DateField, LinkPersonCheckbox, OptionCheckbox, PersonSearchField, chipsPersona, CountryCodeField, SelectField, TextField } from '@/components/patients/form'
import type { DatosPaciente } from '@/data/patientsStore'
import { PERSONAS_SISTEMA, type PersonaSistema } from '@/data/personas'
import { codigoDe, PAISES_TEL } from '@/data/paises'
import { OBLIGATORIO } from '@/lib/validacion'

/* Las secciones del formulario de paciente. New Patient (CON-1328): General, Guardian (sólo un menor) y Demography, en
   pasos. Edit Patient (CON-1329): General, Demography, Contact y Address en una sola pantalla, sin Guardian. Decisiones
   en design-reference/figma/modulos/patients.md, 2026-10-22 y 2026-11-18. */

export const SECCIONES_PACIENTE = ['General', 'Guardian', 'Demography', 'Contact', 'Address'] as const
export type SeccionPaciente = (typeof SECCIONES_PACIENTE)[number]
export type ErroresPaciente = Partial<Record<keyof DatosPaciente, string>>
export type CambiarPaciente = <K extends keyof DatosPaciente>(campo: K, valor: DatosPaciente[K]) => void

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/* En qué sección vive cada campo: el guardado la usa para señalar la pestaña y llevar al usuario hasta el campo. */
const SECCION_DE_CAMPO: Record<keyof DatosPaciente, SeccionPaciente> = {
  first: 'General', middle: 'General', last: 'General', birthday: 'General', email: 'General', interpreter: 'Demography', portal: 'General',
  guardianName: 'Guardian', guardianNuevo: 'Guardian', gFirst: 'Guardian', gLast: 'Guardian', gEmail: 'Guardian', gDob: 'Guardian',
  gCodigo: 'Guardian', gArea: 'Guardian', gNumero: 'Guardian', gExt: 'Guardian', gLinea1: 'Guardian', gLinea2: 'Guardian',
  gPais: 'Guardian', gEstado: 'Guardian', gCiudad: 'Guardian', gZip: 'Guardian', guardianGarante: 'Guardian', guardianRel: 'Guardian',
  gender: 'Demography', race: 'Demography', ethnicity: 'Demography', marital: 'Demography', profession: 'Demography',
  nationality: 'Demography', language: 'Demography', religion: 'Demography',
  codigo: 'Contact', area: 'Contact', numero: 'Contact', ext: 'Contact',
  linea1: 'Address', linea2: 'Address', pais: 'Address', estado: 'Address', ciudad: 'Address', zip: 'Address',
}

/* Orden en que se recorren los campos para encontrar el primero con error. */
const ORDEN: (keyof DatosPaciente)[] = [
  'first', 'middle', 'last', 'email', 'birthday',
  'guardianName', 'gFirst', 'gLast', 'gEmail', 'gDob', 'gCodigo', 'gArea', 'gNumero', 'gLinea1', 'gPais', 'gEstado', 'gCiudad', 'gZip', 'guardianRel',
  'gender', 'codigo', 'area', 'numero', 'linea1', 'pais', 'estado', 'ciudad', 'zip',
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

/* Las secciones que se ven. Alta: Guardian sólo para un menor de 18 (CON-2858; patients.md, 2026-11-04). Edición: sin
   Guardian, con Contact y Address (CON-1329; patients.md, 2026-11-18). */
export const seccionesDe = (menor: boolean, edicion = false): SeccionPaciente[] =>
  edicion ? ['General', 'Demography', 'Contact', 'Address'] : (['General', 'Guardian', 'Demography'] as SeccionPaciente[]).filter((s) => menor || s !== 'Guardian')

/* Una fecha de nacimiento posterior a hoy (CON-1329). */
const esFutura = (fecha: string) => {
  const f = new Date(fecha)
  return !Number.isNaN(f.getTime()) && f.getTime() > Date.now()
}

export const MENOR_SIN_GUARDIAN = 'This patient is a minor and must have at least one guardian assigned.'

/* Obligatorios (CON-1328 y CON-1329): nombre, apellido, email, nacimiento (no futuro) y Gender. En la edición, también
   el teléfono y la dirección. Guardian (CON-2858), sólo en el alta de un menor: hace falta uno; si hay guardián, su
   relación, y si es nuevo, sus datos, contacto y dirección (patients.md, 2026-11-04). */
export function validarPaciente(d: DatosPaciente, { menor = false, exigirGuardian = false, edicion = false } = {}): ErroresPaciente {
  const e: ErroresPaciente = {}
  if (!d.first.trim()) e.first = OBLIGATORIO
  if (!d.last.trim()) e.last = OBLIGATORIO
  if (!d.birthday.trim()) e.birthday = OBLIGATORIO
  else if (esFutura(d.birthday)) e.birthday = 'Birthdate cannot be in the future.'
  if (!d.email.trim()) e.email = OBLIGATORIO
  else if (!EMAIL.test(d.email.trim())) e.email = 'Enter a valid email.'
  if (!d.gender.trim()) e.gender = OBLIGATORIO
  if (edicion) {
    for (const k of ['codigo', 'area', 'numero', 'linea1', 'pais', 'estado', 'ciudad', 'zip'] as const) if (!d[k].trim()) e[k] = OBLIGATORIO
    if (d.area.trim() && digitos(d.area).length !== 3) e.area = 'Area code must be 3 digits.'
    if (d.numero.trim() && digitos(d.numero).length !== 7) e.numero = 'Number must be 7 digits.'
    return e
  }
  if (!menor) return e
  const g = guardianDe(d)
  if (!g.tiene) {
    if (d.guardianName.trim()) e.guardianName = 'Select a person from the list or tick Add new person.'
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

/* Duplicados (CON-1328 y CON-1329): el mismo nombre completo y email que otro paciente, o, si se pide la cuenta del
   portal, un email que ya usa otro paciente. Devuelve el aviso, o null. */
export function duplicadoDe(pacientes: { id: string; name: string; email: string }[], d: DatosPaciente, excepto?: string) {
  const norm = (x: string) => x.trim().replace(/\s+/g, ' ').toLowerCase()
  const nombre = norm([d.first, d.middle, d.last].filter(Boolean).join(' '))
  const email = norm(d.email)
  const otros = pacientes.filter((p) => p.id !== excepto)
  if (email && otros.some((p) => norm(p.name) === nombre && norm(p.email) === email)) return 'A patient is already registered with this name and email address.'
  if (d.portal && email && otros.some((p) => norm(p.email) === email)) return 'A patient account is already registered with this email address.'
  return null
}

/* El estado de un formulario de paciente. Los errores se ven recién después del primer intento de seguir o guardar, y
   desde ahí se actualizan solos al corregir. `revisar` devuelve dónde llevar al usuario: la sección y el campo del
   primer error. */
export function useFormPaciente(
  inicial: DatosPaciente,
  { guardianMenor = false, nacimiento, edicion = false }: {
    /** Alta (CON-2858): un menor necesita guardián. */
    guardianMenor?: boolean
    /** Edit Patient (CON-1329): sin Guardian, con Contact y Address. */
    edicion?: boolean
    /** El nacimiento que vale si no es el escrito (New Patient vinculado a una persona del sistema). */
    nacimiento?: string
  } = {},
) {
  const [d, setD] = useState(inicial)
  /* Las secciones del último intento: sólo esas se marcan, así el paso siguiente no arranca en rojo. */
  const [intentado, setIntentado] = useState<readonly SeccionPaciente[]>([])
  const [foco, setFoco] = useState<{ campo: keyof DatosPaciente; n: number } | null>(null)
  const menor = esMenor(nacimiento ?? d.birthday)
  const todos = useMemo(() => validarPaciente(d, { menor, exigirGuardian: guardianMenor, edicion }), [d, guardianMenor, menor, edicion])
  const errores: ErroresPaciente = Object.fromEntries(Object.entries(todos).filter(([k]) => intentado.includes(SECCION_DE_CAMPO[k as keyof DatosPaciente])))

  /* Add New Person muestra campos nuevos: arrancan limpios, no en rojo por el intento anterior (patients.md, 2026-11-04). */
  const cambiar: CambiarPaciente = (campo, valor) => {
    if (campo === 'guardianNuevo') setIntentado([])
    setD((p) => ({ ...p, [campo]: valor }))
  }

  /* Marca los errores y devuelve el primero de esas secciones, o null si todo está bien. */
  const revisar = (secciones: readonly SeccionPaciente[]) => {
    setIntentado(secciones)
    const campo = ORDEN.find((k) => todos[k] && secciones.includes(SECCION_DE_CAMPO[k]))
    return campo ? { seccion: SECCION_DE_CAMPO[campo], campo } : null
  }
  const enfocar = (campo: keyof DatosPaciente) => setFoco({ campo, n: Date.now() })
  const conError = (s: SeccionPaciente) => ORDEN.some((k) => errores[k] && SECCION_DE_CAMPO[k] === s)

  /* Después de cambiar de sección ya está montado el campo: se enfoca el primer control de su contenedor. */
  useEffect(() => {
    if (!foco) return
    const el = document.querySelector<HTMLElement>(`[data-campo="${foco.campo}"] input, [data-campo="${foco.campo}"] button`)
    el?.focus()
    el?.scrollIntoView?.({ block: 'center' })
  }, [foco])

  return { d, cambiar, errores, revisar, enfocar, conError, menor, secciones: seccionesDe(menor, edicion), reiniciarIntento: () => setIntentado([]) }
}

/* El contenedor que deja ubicar un campo desde afuera (ver el foco de useFormPaciente). */
const Campo = ({ nombre, children }: { nombre: keyof DatosPaciente; children: React.ReactNode }) => <div data-campo={nombre}>{children}</div>

type Props = { d: DatosPaciente; cambiar: CambiarPaciente; errores: ErroresPaciente; /** false: sin título, para ir en una card que ya lo tiene (Edit Patient). */ conTitulo?: boolean }

/* Con título es la sección del drawer; sin título, sólo los campos, para la card de Edit Patient. */
const Bloque = ({ titulo, conTitulo = true, children }: { titulo: string; conTitulo?: boolean; children: React.ReactNode }) =>
  conTitulo ? <DrawerSection title={titulo}>{children}</DrawerSection> : <div className="flex flex-col gap-4">{children}</div>

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

/* Figma: en New Patient las dos opciones; en Edit Patient, "Interpreter required" y la cuenta del portal como estado
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

export function BuscarPersona({ v }: { v: VinculoPersona }) {
  const elegida = v.personas.find((p) => p.name === v.valor)
  return (
    <div data-campo="persona">
      <PersonSearchField
        label="Person" required placeholder="Search patients by name"
        personas={v.personas.map((p) => p.name)}
        value={v.valor} onChange={v.onValor} error={v.error}
        emptyText="No one in the system matches this name. Untick the option to enter the patient's details."
        hint={elegida ? "The patient record will use this person's name, birthdate and email." : undefined}
        subtitulo={(n) => v.personas.find((x) => x.name === n)?.tipo}
        chips={(n) => { const p = v.personas.find((x) => x.name === n); return p && chipsPersona(p.dob, p.email) }}
      />
    </div>
  )
}

/* Como en 2.0 (CON-1328, grabación de Julián del 2026-11-18): vincular a una persona del sistema (sólo en el alta), los
   datos y la cuenta del portal. Interpreter Required va en Demography, junto a Language (patients.md, 2026-11-18). */
export function CamposGeneral({ d, cambiar, errores, portalVinculado, vinculo, conTitulo }: Props & { portalVinculado?: boolean; vinculo?: VinculoPersona }) {
  return (
    <Bloque titulo="General information" conTitulo={conTitulo}>
      {vinculo && <LinkPersonCheckbox checked={vinculo.activo} onChange={vinculo.onActivo} />}
      {vinculo?.activo ? <BuscarPersona v={vinculo} /> : (
        /* De a dos, como todos los formularios (normalización de formularios, figma/README.md 2026-11-20). */
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Campo nombre="first"><TextField label="First name" required placeholder="John" value={d.first} onChange={(v) => cambiar('first', v)} error={errores.first} /></Campo>
            <Campo nombre="middle"><TextField label="Middle name" placeholder="Lorem" value={d.middle} onChange={(v) => cambiar('middle', v)} /></Campo>
            <Campo nombre="last"><TextField label="Last name" required placeholder="Smith" value={d.last} onChange={(v) => cambiar('last', v)} error={errores.last} /></Campo>
            <Campo nombre="email"><TextField label="Email" required placeholder="john.smith@hotmail.com" value={d.email} onChange={(v) => cambiar('email', v)} error={errores.email} /></Campo>
            <Campo nombre="birthday"><DateField label="Birthdate" required valorInicial={d.birthday} onChange={(v) => cambiar('birthday', v)} error={errores.birthday} /></Campo>
          </div>
        </div>
      )}
      {portalVinculado ? <CuentaPortal /> : (
        <OptionCheckbox label="Create a patient portal account using this email address" checked={d.portal} onChange={(v) => cambiar('portal', v)} />
      )}
    </Bloque>
  )
}

/* Las relaciones de Confidentally 2.0 (grabación de Julián, 2026-11-04), de la A a la Z. */
const RELACIONES = ['Child', 'Grandchild', 'Grandparent', 'Other', 'Other family member', 'Parent', 'Partner', 'Sibling', 'Spouse']

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
    <DrawerSection title="Guardian information">
      <Alert tone="warning" title="This patient is under 18.">Add at least one guardian: search for a person in the system or add a new one.</Alert>
      <Campo nombre="guardianName">
        <PersonSearchField
          label="Guardian" required={obligatorio} placeholder="Search patients by name"
          personas={personas.map((p) => p.name)}
          value={d.guardianName} onChange={(v) => cambiar('guardianName', v)}
          disabled={d.guardianNuevo} error={errores.guardianName}
          emptyText="No one in the system matches this name. Tick Add new person to enter their details."
          subtitulo={(n) => personas.find((x) => x.name === n)?.tipo}
          chips={(n) => { const p = personas.find((x) => x.name === n); return p && chipsPersona(p.dob, p.email) }}
        />
      </Campo>
      <OptionCheckbox
        label="Add new person" checked={d.guardianNuevo}
        onChange={(v) => { cambiar('guardianNuevo', v); if (v) cambiar('guardianName', '') }}
      />
      {d.guardianNuevo && (
        <>
          <CollapsibleFields
            title="Personal information" required defaultOpen error={errorEn(NUEVO_G)}
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
            title="Contact information" required error={errorEn(CONTACTO_G)}
            summary={errorEn(CONTACTO_G) ? 'Complete the phone number.' : tel || 'Add a phone number'}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Campo nombre="gCodigo"><CountryCodeField required value={d.gCodigo} onChange={(v) => cambiar('gCodigo', v)} error={errores.gCodigo} /></Campo>
              <Campo nombre="gArea"><TextField label="Area code (3 digits)" required placeholder="555" value={d.gArea} onChange={(v) => cambiar('gArea', v)} error={errores.gArea} /></Campo>
              <Campo nombre="gNumero"><TextField label="Number (7 digits)" required placeholder="000-0000" value={d.gNumero} onChange={(v) => cambiar('gNumero', v)} error={errores.gNumero} /></Campo>
              <Campo nombre="gExt"><TextField label="Extension" placeholder="Extension" value={d.gExt} onChange={(v) => cambiar('gExt', v)} /></Campo>
            </div>
          </CollapsibleFields>
          <CollapsibleFields
            title="Address information" required error={errorEn(DIRECCION_G)}
            summary={errorEn(DIRECCION_G) ? 'Complete the address.' : dir || 'Add an address'}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Campo nombre="gLinea1"><TextField label="Address line 1" required placeholder="Street and number" value={d.gLinea1} onChange={(v) => cambiar('gLinea1', v)} error={errores.gLinea1} /></Campo>
              <Campo nombre="gLinea2"><TextField label="Address line 2" placeholder="Apt, suite, floor" value={d.gLinea2} onChange={(v) => cambiar('gLinea2', v)} /></Campo>
              <Campo nombre="gPais"><SelectField label="Country" required placeholder="Select country" value={d.gPais} onChange={(v) => cambiar('gPais', v)} error={errores.gPais} /></Campo>
              <Campo nombre="gEstado"><SelectField label="State" required placeholder="Select your region" value={d.gEstado} onChange={(v) => cambiar('gEstado', v)} error={errores.gEstado} /></Campo>
              <Campo nombre="gCiudad"><TextField label="City" required placeholder="City" value={d.gCiudad} onChange={(v) => cambiar('gCiudad', v)} error={errores.gCiudad} /></Campo>
              <Campo nombre="gZip"><TextField label="ZIP code" required placeholder="85016" value={d.gZip} onChange={(v) => cambiar('gZip', v)} error={errores.gZip} /></Campo>
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
                label="Relationship to patient" required placeholder="Select a relationship type" options={RELACIONES}
                value={d.guardianRel} onChange={(v) => cambiar('guardianRel', v)} error={errores.guardianRel}
              />
            </Campo>
          </div>
        </>
      )}
    </DrawerSection>
  )
}

/* Las opciones de Demographic Information, como en 2.0 (grabación de Julián, 2026-11-18). */
const GENEROS = ['Female', 'Male', 'Other', 'Prefer not to say']
const RAZAS = ['American Indian or Alaska Native', 'Asian', 'Black or African American', 'Native Hawaiian or Other Pacific Islander', 'White', 'Other', 'Prefer not to say']
const ETNIAS = ['Hispanic or Latino', 'Not Hispanic or Latino', 'Prefer not to say']
const ESTADOS_CIVILES = ['Single', 'Married', 'Domestic partner', 'Divorced', 'Separated', 'Widowed']
const PROFESIONES = [
  'Administration professionals', 'Administrative and specialized secretaries', 'Agricultural, forestry and fishery labourers',
  'Animal producers', 'Architects, planners, surveyors and designers', 'Armed forces occupations, other ranks',
  'Artistic, cultural and culinary associate professionals', 'Assemblers', 'Authors, journalists and linguists',
  'Blacksmiths, toolmakers and related trades workers', 'Building and housekeeping supervisors', 'Health professionals',
  'Teaching professionals', 'Sales workers', 'Student', 'Retired', 'Other',
]
const NACIONALIDADES = PAISES_TEL.map((p) => p.nombre)
const IDIOMAS = ['English', 'Spanish', 'Portuguese', 'French', 'Chinese', 'Vietnamese', 'Arabic', 'Other']
const RELIGIONES = ['Agnostic', 'Atheist', 'Buddhist', 'Christian', 'Hindu', 'Jewish', 'Muslim', 'Other', 'Prefer not to say']

export function CamposDemography({ d, cambiar, errores, conTitulo }: Props) {
  const sel = (campo: keyof DatosPaciente, label: string, options: string[], extra: { required?: boolean; buscable?: boolean; placeholder?: string } = {}) => (
    <Campo nombre={campo}>
      <SelectField
        label={label} options={options} placeholder={extra.placeholder ?? `Select ${label.toLowerCase()}`}
        required={extra.required} buscable={extra.buscable}
        value={d[campo] as string} onChange={(v) => cambiar(campo, v)} error={errores[campo]}
      />
    </Campo>
  )
  return (
    <Bloque titulo="Demographic information" conTitulo={conTitulo}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sel('gender', 'Gender', GENEROS, { required: true })}
        {sel('race', 'Race', RAZAS)}
        {sel('ethnicity', 'Ethnicity', ETNIAS)}
        {sel('marital', 'Marital status', ESTADOS_CIVILES)}
        {sel('profession', 'Profession', PROFESIONES, { buscable: true })}
        {sel('nationality', 'Nationality', NACIONALIDADES, { buscable: true })}
        {/* Language e Interpreter Required van de la mano: en la misma fila, el checkbox a la altura del select (Julián). */}
        {sel('language', 'Language', IDIOMAS)}
        <div className="flex flex-col justify-end">
          <OptionCheckbox label="Interpreter required" checked={d.interpreter} onChange={(v) => cambiar('interpreter', v)} className="h-9 items-center py-0" />
        </div>
        {sel('religion', 'Religion', RELIGIONES)}
      </div>
    </Bloque>
  )
}

/* Contact y Address del paciente, en Edit Patient (CON-1329): los mismos campos que el guardián nuevo y New Employee. */
export function CamposContacto({ d, cambiar, errores, conTitulo }: Props) {
  return (
    <Bloque titulo="Contact information" conTitulo={conTitulo}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Campo nombre="codigo"><CountryCodeField required value={d.codigo} onChange={(v) => cambiar('codigo', v)} error={errores.codigo} /></Campo>
        <Campo nombre="area"><TextField label="Area code (3 digits)" required placeholder="555" value={d.area} onChange={(v) => cambiar('area', v)} error={errores.area} /></Campo>
        <Campo nombre="numero"><TextField label="Number (7 digits)" required placeholder="000-0000" value={d.numero} onChange={(v) => cambiar('numero', v)} error={errores.numero} /></Campo>
        <Campo nombre="ext"><TextField label="Extension" placeholder="Extension" value={d.ext} onChange={(v) => cambiar('ext', v)} /></Campo>
      </div>
    </Bloque>
  )
}

export function CamposDireccion({ d, cambiar, errores, conTitulo }: Props) {
  return (
    <Bloque titulo="Address information" conTitulo={conTitulo}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Campo nombre="linea1"><TextField label="Address line 1" required placeholder="Street and number" value={d.linea1} onChange={(v) => cambiar('linea1', v)} error={errores.linea1} /></Campo>
        <Campo nombre="linea2"><TextField label="Address line 2" placeholder="Apt, suite, floor" value={d.linea2} onChange={(v) => cambiar('linea2', v)} /></Campo>
        <Campo nombre="pais"><SelectField label="Country" required placeholder="Select country" value={d.pais} onChange={(v) => cambiar('pais', v)} error={errores.pais} /></Campo>
        <Campo nombre="estado"><SelectField label="State" required placeholder="Select your region" value={d.estado} onChange={(v) => cambiar('estado', v)} error={errores.estado} /></Campo>
        <Campo nombre="ciudad"><TextField label="City" required placeholder="City" value={d.ciudad} onChange={(v) => cambiar('ciudad', v)} error={errores.ciudad} /></Campo>
        <Campo nombre="zip"><TextField label="ZIP code" required placeholder="85016" value={d.zip} onChange={(v) => cambiar('zip', v)} error={errores.zip} /></Campo>
      </div>
    </Bloque>
  )
}
