import { EMPLEADOS } from '@/data/employees'
import { formatMDY } from '@/lib/fecha'

/* Las personas que el sistema ya tiene cargadas sin ser pacientes: contactos (los de Add Relationship y New
   Subscription), empleados y suscriptores de un seguro. New Patient las busca con "Use this option only to link a
   person that already exists in the system" (modulos/patients.md, 2026-11-02). */

export type PersonaDirectorio = {
  name: string
  initials: string
  dob: string
  email: string
  /** Teléfono y dirección ya cargados: Add Relationship saltea el paso Contact (relationships.md, 2026-11-03). */
  telefono?: string
  direccion?: string
}

/* Contactos: el directorio de Add Relationship y New Subscription. */
export const DIRECTORIO: PersonaDirectorio[] = [
  { name: 'Michael Miller', initials: 'MM', dob: '05/14/1982', email: 'mm.thompson@yahoo.com', telefono: '(555) 765-4321', direccion: '45 Desert View Road, Phoenix, AZ 85018' },
  { name: 'Jessica Miller', initials: 'JM', dob: '05/14/1982', email: 'jessica.miller@gmail.com', telefono: '(555) 123-4567', direccion: '123 Maple Street, Phoenix, AZ 85016' },
  /* La mamá de Sofia Chen: su guardián en Edit Patient. */
  { name: 'Elena Chen', initials: 'EC', dob: '09/03/1990', email: 'elena.chen@mail.com', telefono: '(555) 987-6543', direccion: '88 Bayview Drive, Miami, FL 33131' },
  /* Sin contacto cargado: al elegirlo, Add Relationship pide el paso Contact. */
  { name: 'Robert Miller', initials: 'RM', dob: '03/02/1979', email: 'rob.miller@outlook.com' },
]

export type TipoPersona = 'Contact' | 'Employee' | 'Subscriber'

export type PersonaSistema = PersonaDirectorio & { first: string; last: string; tipo: TipoPersona }

/* Suscriptores de los seguros de ejemplo (data/insurance.ts) que no son pacientes. */
const SUSCRIPTORES: PersonaDirectorio[] = [
  { name: 'Lucas Johnson', initials: 'LJ', dob: '08/09/1975', email: 'lucas.johnson@gmail.com' },
  { name: 'Robert Johnson', initials: 'RJ', dob: '01/17/1972', email: 'robert.johnson@outlook.com' },
]

/* El cumpleaños de los empleados viene DD/MM/AAAA; el paciente lo guarda como "May 14, 1982" (como DateField). */
const fechaLarga = (ddmmaaaa: string) => {
  const [d, m, a] = ddmmaaaa.split('/').map(Number)
  return formatMDY(new Date(a!, m! - 1, d))
}

const conNombre = (p: PersonaDirectorio, tipo: TipoPersona): PersonaSistema => {
  const [first = '', ...resto] = p.name.split(' ')
  return { ...p, first, last: resto.join(' '), tipo }
}

export const PERSONAS_SISTEMA: PersonaSistema[] = [
  ...EMPLEADOS.map((e) => conNombre({ name: e.nombre, initials: e.iniciales, dob: fechaLarga(e.cumpleanos), email: e.email }, 'Employee')),
  ...DIRECTORIO.map((p) => conNombre(p, 'Contact')),
  ...SUSCRIPTORES.map((p) => conNombre(p, 'Subscriber')),
].sort((a, b) => a.name.localeCompare(b.name))
