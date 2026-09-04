/* Modelo de los cuatro bloques clínicos del dashboard del paciente y de sus
   modales de alta (Figma 3751:76503 — "Patient Profile — Documents").

   Cada categoría tiene su propio formulario; la fila del popup, en cambio, es
   siempre la misma: nombre + badge de estado + "Since:" + una línea de detalle.
   Ese detalle nace del formulario de medicación, así que para las otras tres
   se arma con los campos que sí tienen. */

export type Estado = 'Prescribed' | 'Completed'

export type ClinicalItem = {
  id: string
  name: string
  status: Estado
  since: string
  detail: string
  /** Valores crudos del formulario, para que Edit precargue lo mismo. */
  campos: Record<string, string>
}

export type Categoria =
  | 'Allergies'
  | 'Medical Conditions'
  | 'Medication'
  | 'Past Surgery and Hospitalization'

export type Campo =
  | { tipo: 'buscador'; key: string; label: string; req?: boolean; opciones: string[]; ancho?: 'full' }
  | { tipo: 'texto'; key: string; label: string; req?: boolean; ph?: string }
  | { tipo: 'select'; key: string; label: string; req?: boolean; opciones: string[]; ancho?: 'full' }
  | { tipo: 'unidad'; key: string; opciones: string[] }
  | { tipo: 'fecha'; key: string; label: string; req?: boolean; ancho?: 'full' }
  | { tipo: 'notas'; key: string; label: string; req?: boolean; ph: string }
  | { tipo: 'titulo'; label: string }

export type ConfigCategoria = {
  /** Título del modal de alta, tal como está escrito en el Figma. */
  titulo: string
  /** Nombre real de la categoría, para el modal de edición y los toasts. */
  singular: string
  /** Campo que da nombre a la fila del listado. */
  principal: string
  campos: Campo[]
  resumen: (v: Record<string, string>) => string
}

const ESTADOS: Estado[] = ['Prescribed', 'Completed']

export const CONFIG: Record<Categoria, ConfigCategoria> = {
  Allergies: {
    titulo: 'New Allergy',
    singular: 'Allergy',
    principal: 'allergy',
    campos: [
      { tipo: 'buscador', key: 'allergy', label: 'Allergy', req: true, opciones: ['Penicillin', 'Latex', 'Peanuts', 'Pollen', 'Ibuprofen', 'Shellfish'] },
      { tipo: 'select', key: 'status', label: 'Status', req: true, opciones: ESTADOS },
      { tipo: 'select', key: 'severity', label: 'Severity', req: true, opciones: ['Mild', 'Moderate', 'Severe'] },
      { tipo: 'select', key: 'reaction', label: 'Reaction', req: true, ancho: 'full', opciones: ['Rash', 'Swelling', 'Anaphylaxis', 'Nausea', 'Shortness of breath'] },
      { tipo: 'fecha', key: 'start', label: 'Approx Start Date', req: true },
      { tipo: 'fecha', key: 'end', label: 'Approx End Date' },
      { tipo: 'notas', key: 'notes', label: 'Notes', ph: 'Add notes' },
    ],
    resumen: (v) => [v.severity, v.reaction].filter(Boolean).join(' - ').toUpperCase(),
  },

  'Medical Conditions': {
    titulo: 'New Medical Condition',
    singular: 'Medical Condition',
    principal: 'condition',
    campos: [
      { tipo: 'buscador', key: 'condition', label: 'Medical Condition', req: true, opciones: ['Hypertension', 'Type 2 Diabetes', 'Asthma', 'Anemia', 'Hypothyroidism'] },
      { tipo: 'select', key: 'status', label: 'Status', req: true, ancho: 'full', opciones: ESTADOS },
      { tipo: 'fecha', key: 'start', label: 'Approx Start Date', req: true },
      { tipo: 'fecha', key: 'end', label: 'Approx End Date' },
      { tipo: 'notas', key: 'notes', label: 'Notes', ph: 'Add notes' },
    ],
    resumen: (v) => v.notes || v.status.toUpperCase(),
  },

  Medication: {
    /* El frame se llama "New Medication Form" pero el título dice
       "New Allergy". Se replica — ver anomalía 44. */
    titulo: 'New Allergy',
    singular: 'Medication',
    principal: 'medication',
    campos: [
      { tipo: 'buscador', key: 'medication', label: 'Medication', req: true, opciones: ['Amoxicillin', 'Ibuprofen', 'Paracetamol', 'Omeprazole', 'Metformin'] },
      /* "Strenght" es el error del Figma. Anomalía 45. */
      { tipo: 'texto', key: 'strength', label: 'Strenght', req: true, ph: '500' },
      { tipo: 'unidad', key: 'strengthUnit', opciones: ['mg', 'g', 'ml', 'mcg'] },
      { tipo: 'select', key: 'form', label: 'Dosage Form', req: true, opciones: ['Tablet', 'Capsule', 'Syrup', 'Injection'] },
      { tipo: 'select', key: 'status', label: 'Status', req: true, opciones: ESTADOS },
      { tipo: 'fecha', key: 'start', label: 'Approx Start Date', req: true },
      { tipo: 'fecha', key: 'end', label: 'Approx End Date', req: true },
      { tipo: 'titulo', label: 'Direction for Use' },
      { tipo: 'texto', key: 'dose', label: 'Dose', req: true, ph: '1' },
      { tipo: 'unidad', key: 'doseUnit', opciones: ['Tablet', 'Capsule', 'ml', 'Drop'] },
      { tipo: 'select', key: 'frequency', label: 'Frequency', req: true, ancho: 'full', opciones: ['Once daily', 'Twice daily', 'Three times daily', 'As needed'] },
      /* Notes obligatorio sólo acá, y con el placeholder de un formulario de
         referrals. Anomalía 46. */
      { tipo: 'notas', key: 'notes', label: 'Notes', req: true, ph: 'Include patient history, previous treatments, and specific questions for the specialist...' },
    ],
    resumen: (v) => [v.dose, v.frequency].filter(Boolean).join(' - ').toUpperCase(),
  },

  'Past Surgery and Hospitalization': {
    /* Mismo caso que Medication: el frame es de cirugías y el título dice
       "New Allergy". Anomalía 44. */
    titulo: 'New Allergy',
    singular: 'Past Surgery or Hospitalization',
    principal: 'surgery',
    campos: [
      { tipo: 'buscador', key: 'surgery', label: 'Past Surgery or Hospitalization', req: true, opciones: ['Appendectomy', 'Cesarean section', 'Tonsillectomy', 'Gallbladder removal', 'Hernia repair'] },
      /* Sin fecha de fin y a lo ancho de la fila, como en el frame. */
      { tipo: 'fecha', key: 'start', label: 'Approx Start Date', req: true, ancho: 'full' },
      { tipo: 'notas', key: 'notes', label: 'Notes', ph: 'Add notes' },
    ],
    resumen: (v) => v.notes || '—',
  },
}

const MESES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

/* "27 / 04 / 26" -> "April 27, 2026". Si no se puede, devuelve lo tipeado. */
export function fechaLarga(texto: string) {
  const [d, m, y] = texto.split('/').map((x) => x.trim())
  const mes = MESES[Number(m) - 1]
  if (!d || !mes || !y) return texto
  return `${mes} ${Number(d)}, 20${y.padStart(2, '0')}`
}

let secuencia = 0
export const nuevoId = () => `ci-${++secuencia}`

/* Arma la fila del listado a partir de los valores del formulario. */
export function aItem(cat: Categoria, campos: Record<string, string>, id = nuevoId()): ClinicalItem {
  const c = CONFIG[cat]
  return {
    id,
    name: campos[c.principal] || 'Untitled',
    status: (campos.status as Estado) || 'Prescribed',
    since: fechaLarga(campos.start || ''),
    detail: c.resumen(campos),
    campos,
  }
}

const semilla = (cat: Categoria, filas: Record<string, string>[]) =>
  filas.map((f) => aItem(cat, f))

export const ITEMS_INICIALES: Record<Categoria, ClinicalItem[]> = {
  'Past Surgery and Hospitalization': semilla('Past Surgery and Hospitalization', [
    { surgery: 'Appendectomy', status: 'Prescribed', start: '27 / 04 / 26', notes: '10 - ONCE DAILY' },
    { surgery: 'Cesarean section', status: 'Completed', start: '27 / 04 / 26', notes: '5 - TWICE DAILY' },
    { surgery: 'Tonsillectomy', status: 'Prescribed', start: '27 / 04 / 26', notes: '6 - AS NEEDED' },
    { surgery: 'Gallbladder removal', status: 'Completed', start: '27 / 04 / 26', notes: '3 - ONCE DAILY' },
  ]),
  Allergies: semilla('Allergies', [
    { allergy: 'Penicillin', status: 'Prescribed', severity: 'Severe', reaction: 'Rash', start: '27 / 04 / 26' },
    { allergy: 'Latex', status: 'Completed', severity: 'Mild', reaction: 'Swelling', start: '27 / 04 / 26' },
    { allergy: 'Peanuts', status: 'Prescribed', severity: 'Severe', reaction: 'Anaphylaxis', start: '27 / 04 / 26' },
    { allergy: 'Pollen', status: 'Completed', severity: 'Moderate', reaction: 'Nausea', start: '27 / 04 / 26' },
  ]),
  'Medical Conditions': semilla('Medical Conditions', [
    { condition: 'Hypertension', status: 'Prescribed', start: '27 / 04 / 26', notes: '10 - ONCE DAILY' },
    { condition: 'Type 2 Diabetes', status: 'Completed', start: '27 / 04 / 26', notes: '5 - TWICE DAILY' },
    { condition: 'Asthma', status: 'Prescribed', start: '27 / 04 / 26', notes: '6 - AS NEEDED' },
    { condition: 'Anemia', status: 'Completed', start: '27 / 04 / 26', notes: '3 - ONCE DAILY' },
  ]),
  Medication: semilla('Medication', [
    { medication: 'Amoxicillin', status: 'Prescribed', strength: '500', strengthUnit: 'mg', form: 'Tablet', start: '27 / 04 / 26', end: '27 / 05 / 26', dose: '10', doseUnit: 'Tablet', frequency: 'Once daily', notes: 'Take after meals.' },
    { medication: 'Ibuprofen', status: 'Completed', strength: '400', strengthUnit: 'mg', form: 'Tablet', start: '27 / 04 / 26', end: '27 / 05 / 26', dose: '5', doseUnit: 'Tablet', frequency: 'Twice daily', notes: 'Stop if stomach pain appears.' },
    { medication: 'Paracetamol', status: 'Prescribed', strength: '1', strengthUnit: 'g', form: 'Tablet', start: '27 / 04 / 26', end: '27 / 05 / 26', dose: '6', doseUnit: 'Tablet', frequency: 'As needed', notes: 'For pain above 6/10.' },
    { medication: 'Omeprazole', status: 'Completed', strength: '20', strengthUnit: 'mg', form: 'Capsule', start: '27 / 04 / 26', end: '27 / 05 / 26', dose: '3', doseUnit: 'Capsule', frequency: 'Once daily', notes: 'Before breakfast.' },
  ]),
}
