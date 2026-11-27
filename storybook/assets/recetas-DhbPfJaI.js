import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`/* Prescription (CON-2230, CON-2354, CON-2337): los campos y las listas de red.dev (recorrido del 2026-11-27). Las unidades
   se muestran legibles ("mg", "Tablets") y no como el enum crudo de red.dev ("MG", "TABLETS"). Ver
   design-reference/figma/modulos/clinical-mode.md (2026-11-27). */

export const MEDICAMENTOS = [
  'Acetaminophen', 'Amoxicillin', 'Amoxicillin / Clavulanate', 'Azithromycin', 'Benzocaine', 'Chlorhexidine gluconate', 'Clindamycin',
  'Clonazepam', 'Dexamethasone', 'Diazepam', 'Fluconazole', 'Hydrocodone / Acetaminophen', 'Ibuprofen', 'Lidocaine', 'Metronidazole',
  'Naproxen', 'Nystatin', 'Penicillin V potassium', 'Sodium fluoride', 'Triamcinolone',
]
/* La medicación activa del paciente (Medical History). Guardar una receta que la vuelve a cargar con Update patient
   medications pregunta si se reutiliza (CON-2846, que reemplaza el error de CON-2337; en red.dev, al guardar). */
export const MEDICACION_ACTIVA = ['Ibuprofen']
export const UNIDADES_FUERZA = ['g', 'mcg', 'mEq', 'mg', 'mL', 'mmol', '%', 'IU', 'Unknown']
export const FORMAS = [
  'Buccal tablet', 'Chewable tablet', 'Dental gel', 'Dental paste', 'Ear drop', 'Eye drop', 'Inhalation powder', 'Injectable solution', 'Injection',
  'Mouthwash', 'Nasal spray', 'Oral capsule', 'Oral film', 'Oral gel', 'Oral liquid', 'Oral lozenge', 'Oral paste', 'Oral solution', 'Oral suspension',
  'Oral tablet', 'Other', 'Periodontal gel', 'Rectal liquid', 'Sublingual tablet', 'Suppository', 'Toothpaste', 'Topical cream', 'Topical gel',
  'Topical ointment', 'Transdermal patch', 'Unknown', 'Vaginal cream', 'Vaginal tablet',
]
export const UNIDADES_DOSIS = ['Applications', 'Capsules', 'Drops', 'Puffs', 'Sprays', 'Suppository', 'Tablespoons', 'Tablets', 'Teaspoons', 'Unknown']
export const VIAS = ['Buccal', 'Dental', 'Intramuscular', 'Intrathecal', 'Intravenous', 'Oral', 'Periodontal', 'Sublingual', 'Submucosal', 'Topical']
export const FRECUENCIAS = ['As needed', 'At bedtime', 'Every 4 to 6 hours', 'Four times daily', 'Immediately', 'Once daily', 'Three times daily', 'Twice daily', 'Unknown']
export const UNIDADES_DURACION = ['Days', 'Weeks', 'Months']

export type Medicacion = {
  id: number
  nombre: string
  fuerza: string
  unidadFuerza: string
  forma: string
  cantidad: string
  refills: string
  /** CON-2337: al activar la receta, pasa a las medicaciones del paciente como Active (si no, Prescribed). */
  actualizar: boolean
  generico: boolean
  controlada: boolean
  dosis: string
  unidadDosis: string
  via: string
  frecuencia: string
  duracion: string
  unidadDuracion: string
}
export type DatosReceta = { medicaciones: Medicacion[]; indicaciones: string }

let serie = 1
/** Una medicación vacía, con los valores por defecto de red.dev: genérico permitido, Days. */
export const medicacionVacia = (): Medicacion => ({
  id: serie++, nombre: '', fuerza: '', unidadFuerza: '', forma: '', cantidad: '', refills: '', actualizar: false, generico: true, controlada: false,
  dosis: '', unidadDosis: '', via: '', frecuencia: '', duracion: '', unidadDuracion: 'Days',
})
export const medicacion = (m: Partial<Medicacion>): Medicacion => ({ ...medicacionVacia(), ...m })

/** "Ibuprofen 400 mg", como el chip de la lista de red.dev. */
export const nombreMedicacion = (m: Medicacion) => [m.nombre, m.fuerza && \`\${m.fuerza}\${m.unidadFuerza === '%' ? '' : ' '}\${m.unidadFuerza === 'Unknown' ? '' : m.unidadFuerza}\`.trim()].filter(Boolean).join(' ')

const VERBO: Record<string, string> = { Topical: 'Apply', Dental: 'Apply', Periodontal: 'Apply', Intramuscular: 'Inject', Intrathecal: 'Inject', Intravenous: 'Inject', Submucosal: 'Inject' }
const COMO: Record<string, string> = {
  Buccal: 'buccally', Dental: 'on the teeth', Intramuscular: 'intramuscularly', Intrathecal: 'intrathecally', Intravenous: 'intravenously', Oral: 'orally',
  Periodontal: 'in the periodontal pocket', Sublingual: 'sublingually', Submucosal: 'submucosally', Topical: 'topically',
}
/** La unidad de una dosis en una frase: "tablet" si es una, "tablets" si son más. */
export const unidadDeDosis = (n: string, u: string) => {
  if (!u || u === 'Unknown') return ''
  const una = Number(n) === 1
  if (u === 'Suppository') return una ? 'suppository' : 'suppositories'
  return (una ? u.replace(/s$/, '') : u).toLowerCase()
}

/** La indicación en una frase, como la arma red.dev debajo de Directions for Use: "Take 1 tablet orally twice daily for 7 days". */
export function fraseDeUso(m: Medicacion) {
  if (!m.dosis || !m.via || !m.frecuencia || !m.duracion) return ''
  const frecuencia = m.frecuencia === 'Unknown' ? '' : m.frecuencia.toLowerCase()
  const duracion = \`for \${m.duracion} \${Number(m.duracion) === 1 ? m.unidadDuracion.replace(/s$/, '') : m.unidadDuracion}\`.toLowerCase()
  return [VERBO[m.via] ?? 'Take', m.dosis, unidadDeDosis(m.dosis, m.unidadDosis), COMO[m.via], frecuencia, duracion].filter(Boolean).join(' ')
}

/* Lo obligatorio de cada medicación (los asteriscos de red.dev; la unidad acompaña a su número) y sus reglas (CON-2230):
   la medicación sale de la lista y los números son mayores a 0. */
const OBLIGATORIOS: (keyof Medicacion)[] = ['nombre', 'fuerza', 'unidadFuerza', 'forma', 'cantidad', 'dosis', 'unidadDosis', 'via', 'frecuencia', 'duracion', 'unidadDuracion']
const NUMEROS: (keyof Medicacion)[] = ['fuerza', 'cantidad', 'dosis', 'duracion']
export type ErroresMedicacion = Partial<Record<keyof Medicacion, string>>
export function erroresDe(m: Medicacion): { errores: ErroresMedicacion; faltan: boolean } {
  const errores: ErroresMedicacion = {}
  for (const k of OBLIGATORIOS) if (!String(m[k]).trim()) errores[k] = 'This field is required.'
  const faltan = Object.keys(errores).length > 0
  if (m.nombre.trim() && !MEDICAMENTOS.includes(m.nombre)) errores.nombre = 'Select a medication from the list.'
  for (const k of NUMEROS) if (String(m[k]).trim() && !(Number(m[k]) > 0)) errores[k] = 'Enter a number greater than 0.'
  return { errores, faltan }
}
`})))()}export{r as n,n as r,i as t};