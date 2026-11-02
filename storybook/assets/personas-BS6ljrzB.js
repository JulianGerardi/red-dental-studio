import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { EMPLEADOS } from '@/data/employees'

/* Las personas que el sistema ya tiene cargadas sin ser pacientes: contactos (los de Add Relationship y New
   Subscription), empleados y suscriptores de un seguro. New Patient las busca con "Use this option only to link a
   person that already exists in the system" (modulos/patients.md, 2026-11-02). */

export type PersonaDirectorio = {
  name: string
  initials: string
  dob: string
  email: string
}

/* Contactos: el directorio de Add Relationship y New Subscription. */
export const DIRECTORIO: PersonaDirectorio[] = [
  { name: 'Michael Miller', initials: 'MM', dob: 'May 14, 1982', email: 'mm.thompson@yahoo.com' },
  { name: 'Jessica Miller', initials: 'JM', dob: 'May 14, 1982', email: 'jessica.miller@gmail.com' },
  { name: 'Robert Miller', initials: 'RM', dob: 'March 2, 1979', email: 'rob.miller@outlook.com' },
]

export type TipoPersona = 'Contact' | 'Employee' | 'Subscriber'

export type PersonaSistema = PersonaDirectorio & { first: string; last: string; tipo: TipoPersona }

/* Suscriptores de los seguros de ejemplo (data/insurance.ts) que no son pacientes. */
const SUSCRIPTORES: PersonaDirectorio[] = [
  { name: 'Lucas Johnson', initials: 'LJ', dob: 'August 9, 1975', email: 'lucas.johnson@gmail.com' },
  { name: 'Robert Johnson', initials: 'RJ', dob: 'January 17, 1972', email: 'robert.johnson@outlook.com' },
]

/* El cumpleaños de los empleados viene DD/MM/AAAA; el paciente lo guarda como "May 14, 1982" (como DateField). */
const fechaLarga = (ddmmaaaa: string) => {
  const [d, m, a] = ddmmaaaa.split('/').map(Number)
  return new Date(a!, m! - 1, d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
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
`})))()}export{r as n,n as r,i as t};