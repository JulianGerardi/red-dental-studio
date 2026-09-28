import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { ReactNode } from 'react'
import { AmountCell, PersonCell, TextCell } from '@/components/ui/data-table'
import { Pill, type PillTone } from '@/components/ui/pill'

/* Los datos de ejemplo de las tablas del constructor: cuatro conjuntos de la
   app (pacientes, movimientos del Ledger, recetas y turnos), cada uno con
   todas sus columnas posibles. Cada columna sabe dibujarse (\`celda\`) y
   escribirse (\`codigoCelda\`) igual, como los bloques. */

export type TipoCelda = 'persona' | 'texto' | 'fuerte' | 'estado' | 'monto'
export type CampoDato = { header: string; tipo: TipoCelda; ancho?: number }
type Fila = Record<string, string | number>

export type Conjunto = {
  nombre: string
  singular: string
  plural: string
  /** Nombre de la constante en el código generado. */
  variable: string
  /** Campo que nombra una fila (búsqueda, menú de acciones). */
  etiqueta: string
  campos: Record<string, CampoDato>
  /** Columnas con las que arranca una tabla nueva de este conjunto. */
  inicial: string[]
  filas: Fila[]
}

/* Los tonos de estado de toda la app (los mismos de las tablas reales). */
export const TONO_ESTADO: Record<string, PillTone> = {
  Active: 'success', Posted: 'success', Fulfilled: 'success', Completed: 'success', Paid: 'success',
  Booked: 'info', Pending: 'info', Requested: 'info', Scheduled: 'info',
  'In progress': 'purple', 'Check-in': 'purple',
  'No Show': 'warning', Expired: 'warning', Overdue: 'warning',
  Cancelled: 'danger', Voided: 'danger',
  Inactive: 'neutral',
}

export const DATOS = {
  pacientes: {
    nombre: 'Patients', singular: 'patient', plural: 'patients', variable: 'pacientes', etiqueta: 'name',
    inicial: ['name', 'status', 'next', 'provider', 'balance'],
    campos: {
      name: { header: 'Patient', tipo: 'persona' },
      status: { header: 'Status', tipo: 'estado', ancho: 120 },
      next: { header: 'Next appointment', tipo: 'texto', ancho: 180 },
      provider: { header: 'Provider', tipo: 'texto', ancho: 170 },
      balance: { header: 'Balance', tipo: 'monto', ancho: 110 },
      phone: { header: 'Phone', tipo: 'texto', ancho: 150 },
      email: { header: 'Email', tipo: 'texto', ancho: 220 },
      dob: { header: 'Date of birth', tipo: 'texto', ancho: 130 },
      insurance: { header: 'Insurance', tipo: 'texto', ancho: 150 },
      location: { header: 'Location', tipo: 'texto', ancho: 150 },
      lastVisit: { header: 'Last visit', tipo: 'texto', ancho: 130 },
    },
    filas: [
      { id: '1', initials: 'MV', name: 'Maria Abril Viola', status: 'Active', next: '12 Mar 2025 · 10:00', provider: 'Dr. Elena Martinez', balance: 120, phone: '(555) 234-5678', email: 'maria.viola@mail.com', dob: '28/01/1999', insurance: 'Osde 310', location: 'Downtown', lastVisit: '17 Feb 2025' },
      { id: '2', initials: 'NS', name: 'Noah James Smith', status: 'Active', next: '14 Mar 2025 · 09:30', provider: 'Dr. Emily Chen', balance: 0, phone: '(555) 918-2201', email: 'noah.smith@mail.com', dob: '03/07/1987', insurance: 'Delta Dental', location: 'Downtown', lastVisit: '02 Mar 2025' },
      { id: '3', initials: 'EA', name: 'Elias Aguirre', status: 'Inactive', next: '—', provider: 'Sarah Stone', balance: 48.5, phone: '(555) 410-7734', email: 'elias.aguirre@mail.com', dob: '15/11/1975', insurance: '—', location: 'Uptown', lastVisit: '09 Oct 2024' },
      { id: '4', initials: 'JS', name: 'John Smith', status: 'Active', next: '18 Mar 2025 · 11:00', provider: 'Dr. Salgado', balance: 250, phone: '(555) 302-1188', email: 'john.smith@mail.com', dob: '22/04/1974', insurance: 'Cigna', location: 'Uptown', lastVisit: '11 Mar 2025' },
      { id: '5', initials: 'EM', name: 'Elena Marquez', status: 'Active', next: '19 Mar 2025 · 15:30', provider: 'Dr. Elena Martinez', balance: 0, phone: '(555) 671-0932', email: 'elena.marquez@mail.com', dob: '09/09/1992', insurance: 'Osde 210', location: 'Downtown', lastVisit: '20 Feb 2025' },
      { id: '6', initials: 'SS', name: 'Sarah Stone', status: 'Inactive', next: '—', provider: 'Dr. Emily Chen', balance: 32, phone: '(555) 845-2210', email: 'sarah.stone@mail.com', dob: '30/12/1968', insurance: 'Aetna', location: 'Uptown', lastVisit: '14 Aug 2024' },
      { id: '7', initials: 'LF', name: 'Lucas Fernández', status: 'Active', next: '21 Mar 2025 · 08:45', provider: 'Dr. Salgado', balance: 90, phone: '(555) 227-4519', email: 'lucas.fernandez@mail.com', dob: '11/06/2001', insurance: 'Swiss Medical', location: 'Downtown', lastVisit: '05 Mar 2025' },
      { id: '8', initials: 'SR', name: 'Sofía Romero', status: 'Active', next: '24 Mar 2025 · 12:00', provider: 'Sarah Stone', balance: 0, phone: '(555) 580-6671', email: 'sofia.romero@mail.com', dob: '19/02/1996', insurance: 'Galeno', location: 'Uptown', lastVisit: '28 Feb 2025' },
      { id: '9', initials: 'MD', name: 'Martín Díaz', status: 'Active', next: '25 Mar 2025 · 16:15', provider: 'Dr. Emily Chen', balance: 15, phone: '(555) 713-3390', email: 'martin.diaz@mail.com', dob: '07/08/1983', insurance: 'Delta Dental', location: 'Downtown', lastVisit: '10 Mar 2025' },
      { id: '10', initials: 'VR', name: 'Valentina Ruiz', status: 'Inactive', next: '—', provider: 'Dr. Elena Martinez', balance: 60, phone: '(555) 364-9025', email: 'valentina.ruiz@mail.com', dob: '25/05/1979', insurance: 'Osde 410', location: 'Uptown', lastVisit: '03 Dec 2024' },
    ],
  },
  movimientos: {
    nombre: 'Ledger transactions', singular: 'transaction', plural: 'transactions', variable: 'movimientos', etiqueta: 'description',
    inicial: ['date', 'patient', 'description', 'type', 'amount', 'status'],
    campos: {
      date: { header: 'Date', tipo: 'texto', ancho: 120 },
      patient: { header: 'Patient', tipo: 'persona', ancho: 210 },
      code: { header: 'Code', tipo: 'texto', ancho: 90 },
      description: { header: 'Description', tipo: 'fuerte' },
      provider: { header: 'Provider', tipo: 'texto', ancho: 160 },
      type: { header: 'Type', tipo: 'texto', ancho: 110 },
      amount: { header: 'Amount', tipo: 'monto', ancho: 110 },
      status: { header: 'Status', tipo: 'estado', ancho: 110 },
    },
    filas: [
      { id: 't1', initials: 'MV', date: '12 Mar 2025', patient: 'Maria Abril Viola', code: 'D1110', description: 'Prophylaxis - adult', provider: 'Dr. Elena Martinez', type: 'Charge', amount: 95, status: 'Posted' },
      { id: 't2', initials: 'MV', date: '12 Mar 2025', patient: 'Maria Abril Viola', code: '—', description: 'Card payment', provider: 'Front desk', type: 'Payment', amount: -95, status: 'Posted' },
      { id: 't3', initials: 'NS', date: '10 Mar 2025', patient: 'Noah James Smith', code: 'D2391', description: 'Resin composite - one surface', provider: 'Dr. Emily Chen', type: 'Charge', amount: 180, status: 'Pending' },
      { id: 't4', initials: 'JS', date: '08 Mar 2025', patient: 'John Smith', code: 'D0274', description: 'Bitewings - four images', provider: 'Dr. Salgado', type: 'Charge', amount: 72, status: 'Posted' },
      { id: 't5', initials: 'JS', date: '08 Mar 2025', patient: 'John Smith', code: '—', description: 'Insurance payment - Cigna', provider: 'Front desk', type: 'Payment', amount: -58, status: 'Posted' },
      { id: 't6', initials: 'EA', date: '02 Mar 2025', patient: 'Elias Aguirre', code: 'D7140', description: 'Extraction, erupted tooth', provider: 'Sarah Stone', type: 'Charge', amount: 210, status: 'Overdue' },
      { id: 't7', initials: 'EM', date: '28 Feb 2025', patient: 'Elena Marquez', code: '—', description: 'Courtesy discount', provider: 'Front desk', type: 'Adjustment', amount: -20, status: 'Posted' },
      { id: 't8', initials: 'SR', date: '25 Feb 2025', patient: 'Sofía Romero', code: 'D0120', description: 'Periodic oral evaluation', provider: 'Sarah Stone', type: 'Charge', amount: 55, status: 'Voided' },
    ],
  },
  recetas: {
    nombre: 'Prescriptions', singular: 'prescription', plural: 'prescriptions', variable: 'recetas', etiqueta: 'drug',
    inicial: ['drug', 'patient', 'frequency', 'prescriber', 'expires', 'status'],
    campos: {
      drug: { header: 'Medication', tipo: 'fuerte' },
      strength: { header: 'Strength', tipo: 'texto', ancho: 100 },
      frequency: { header: 'Directions', tipo: 'texto', ancho: 190 },
      patient: { header: 'Patient', tipo: 'persona', ancho: 210 },
      prescriber: { header: 'Prescriber', tipo: 'texto', ancho: 160 },
      created: { header: 'Created', tipo: 'texto', ancho: 120 },
      expires: { header: 'Expires', tipo: 'texto', ancho: 120 },
      refills: { header: 'Refills', tipo: 'texto', ancho: 80 },
      status: { header: 'Status', tipo: 'estado', ancho: 110 },
    },
    filas: [
      { id: 'r1', initials: 'MV', drug: 'Amoxicillin', strength: '500 mg', frequency: '1 capsule every 8 h · 7 days', patient: 'Maria Abril Viola', prescriber: 'Dr. Elena Martinez', created: '12 Mar 2025', expires: '12 Apr 2025', refills: '0', status: 'Active' },
      { id: 'r2', initials: 'NS', drug: 'Ibuprofen', strength: '400 mg', frequency: '1 tablet every 6 h · as needed', patient: 'Noah James Smith', prescriber: 'Dr. Emily Chen', created: '10 Mar 2025', expires: '10 Apr 2025', refills: '1', status: 'Active' },
      { id: 'r3', initials: 'JS', drug: 'Chlorhexidine 0.12%', strength: '15 ml', frequency: 'Rinse twice daily · 14 days', patient: 'John Smith', prescriber: 'Dr. Salgado', created: '08 Mar 2025', expires: '08 Apr 2025', refills: '0', status: 'Pending' },
      { id: 'r4', initials: 'EA', drug: 'Paracetamol', strength: '1 g', frequency: '1 tablet every 8 h · 3 days', patient: 'Elias Aguirre', prescriber: 'Sarah Stone', created: '02 Mar 2025', expires: '02 Mar 2025', refills: '0', status: 'Expired' },
      { id: 'r5', initials: 'EM', drug: 'Clindamycin', strength: '300 mg', frequency: '1 capsule every 6 h · 7 days', patient: 'Elena Marquez', prescriber: 'Dr. Elena Martinez', created: '28 Feb 2025', expires: '28 Mar 2025', refills: '0', status: 'Completed' },
      { id: 'r6', initials: 'SR', drug: 'Ketorolac', strength: '10 mg', frequency: '1 tablet every 8 h · 2 days', patient: 'Sofía Romero', prescriber: 'Sarah Stone', created: '25 Feb 2025', expires: '25 Mar 2025', refills: '0', status: 'Cancelled' },
    ],
  },
  turnos: {
    nombre: 'Appointments', singular: 'appointment', plural: 'appointments', variable: 'agenda', etiqueta: 'patient',
    inicial: ['patient', 'date', 'time', 'provider', 'status'],
    campos: {
      patient: { header: 'Patient', tipo: 'persona' },
      date: { header: 'Date', tipo: 'texto', ancho: 120 },
      time: { header: 'Time', tipo: 'texto', ancho: 90 },
      provider: { header: 'Provider', tipo: 'texto', ancho: 170 },
      operatory: { header: 'Operatory', tipo: 'texto', ancho: 120 },
      reason: { header: 'Reason', tipo: 'texto', ancho: 220 },
      status: { header: 'Status', tipo: 'estado', ancho: 120 },
    },
    filas: [
      { id: 'a1', initials: 'NJ', patient: 'Noah James', date: '12 Mar 2025', time: '10:00', provider: 'Dr. Elena Martinez', operatory: 'Operatory 2', reason: 'Implant consultation', status: 'Booked' },
      { id: 'a2', initials: 'MV', patient: 'Maria Abril Viola', date: '12 Mar 2025', time: '11:30', provider: 'Dr. Emily Chen', operatory: 'Operatory 1', reason: 'Routine cleaning', status: 'Check-in' },
      { id: 'a3', initials: 'EA', patient: 'Elias Aguirre', date: '12 Mar 2025', time: '13:00', provider: 'Sarah Stone', operatory: 'Operatory 3', reason: 'Broken crown, in pain', status: 'In progress' },
      { id: 'a4', initials: 'JS', patient: 'John Smith', date: '13 Mar 2025', time: '09:15', provider: 'Dr. Salgado', operatory: 'Operatory 2', reason: 'Prophylaxis - adult', status: 'Fulfilled' },
      { id: 'a5', initials: 'SR', patient: 'Sofía Romero', date: '13 Mar 2025', time: '15:30', provider: 'Dr. Emily Chen', operatory: 'Operatory 1', reason: 'Periodic evaluation', status: 'No Show' },
      { id: 'a6', initials: 'LF', patient: 'Lucas Fernández', date: '14 Mar 2025', time: '08:45', provider: 'Dr. Salgado', operatory: 'Operatory 3', reason: 'Whitening', status: 'Cancelled' },
    ],
  },
} satisfies Record<string, Conjunto>

export type IdConjunto = keyof typeof DATOS
export const conjunto = (id: IdConjunto): Conjunto => DATOS[id]

/* La celda, en pantalla y en código. */
export function celda(tipo: TipoCelda, fila: Fila, campo: string): ReactNode {
  const v = fila[campo]
  if (tipo === 'persona') return <PersonCell name={String(v)} initials={String(fila.initials)} />
  if (tipo === 'estado') return <Pill tone={TONO_ESTADO[String(v)] ?? 'neutral'}>{String(v)}</Pill>
  if (tipo === 'monto') return <AmountCell value={Number(v)} />
  return <TextCell strong={tipo === 'fuerte'}>{String(v)}</TextCell>
}

export function codigoCelda(tipo: TipoCelda, campo: string): string {
  if (tipo === 'persona') return \`<PersonCell name={r.\${campo}} initials={r.initials} />\`
  if (tipo === 'estado') return \`<Pill tone={TONO_ESTADO[r.\${campo}] ?? 'neutral'}>{r.\${campo}}</Pill>\`
  if (tipo === 'monto') return \`<AmountCell value={r.\${campo}} />\`
  return \`<TextCell\${tipo === 'fuerte' ? ' strong' : ''}>{r.\${campo}}</TextCell>\`
}

export const COMPONENTE_CELDA: Record<TipoCelda, string> = { persona: 'PersonCell', estado: 'Pill', monto: 'AmountCell', texto: 'TextCell', fuerte: 'TextCell' }
`})))()}export{n,i as r,r as t};