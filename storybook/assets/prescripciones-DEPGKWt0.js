import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`/* Prescription de Clinical Mode: catálogos de New Prescription (CON-2230) y las recetas del paciente. Ver
   design-reference/figma/modulos/clinical-mode.md (2026-11-27). */

import type { PillTone } from '@/components/ui/pill'

export type EstadoReceta = 'Pending' | 'Active' | 'Expired' | 'Canceled'

/* Pending naranja, Expired y Canceled en rojo como el video (Canceled igual que en Lab order); Active verde. */
export const TONO_RECETA: Record<EstadoReceta, PillTone> = { Pending: 'warning', Active: 'success', Expired: 'danger', Canceled: 'danger' }

export type Medicacion = {
  id: string
  droga: string
  fuerza: string
  fuerzaUnidad: string
  forma: string
  cantidad: string
  recargas: string
  generico: boolean
  controlada: boolean
  /** Update Patient Medications: al activar, entra a la medicación del paciente como Active; si no, Prescribed (CON-2337). */
  actualizar: boolean
  dosis: string
  dosisUnidad: string
  via: string
  frecuencia: string
  duracion: string
  duracionUnidad: string
}

export type Receta = {
  id: string
  proveedor: string
  estado: EstadoReceta
  /** MM/DD/YYYY, como el resto de las tablas. */
  creado: string
  actualizado: string
  vence: string
  medicaciones: Medicacion[]
  indicaciones: string
}

/* Las listas de red.dev (Clinical Mode › Prescription, relevado el 2026-11-27), no las de CON-2230: la app real ya las
   cambió por unas de uso odontológico. Los códigos en mayúsculas de red.dev (MG, APPLICATIONS) van como se leen. */
export const FORMAS = [
  'Buccal tablet', 'Chewable tablet', 'Dental gel', 'Dental paste', 'Ear drop', 'Eye drop', 'Inhalation powder',
  'Injectable solution', 'Injection', 'Mouthwash', 'Nasal spray', 'Oral capsule', 'Oral film', 'Oral gel', 'Oral liquid',
  'Oral lozenge', 'Oral paste', 'Oral solution', 'Oral suspension', 'Oral tablet', 'Other', 'Periodontal gel',
  'Rectal liquid', 'Sublingual tablet', 'Suppository', 'Toothpaste', 'Topical cream', 'Topical gel', 'Topical ointment',
  'Transdermal patch', 'Unknown', 'Vaginal cream', 'Vaginal tablet',
]
export const FRECUENCIAS = ['As needed', 'At bedtime', 'Every 4 to 6 hours', 'Four times daily', 'Immediately', 'Once daily', 'Three times daily', 'Twice daily', 'Unknown']
export const DURACION_UNIDADES = ['Days', 'Weeks', 'Months']
export const FUERZA_UNIDADES = ['g', 'mcg', 'mEq', 'mg', 'ml', 'mmol', '%', 'IU', 'Unknown']
export const DOSIS_UNIDADES = ['Applications', 'Capsules', 'Drops', 'Puffs', 'Sprays', 'Suppository', 'Tablespoons', 'Tablets', 'Teaspoons', 'Unknown']
export const VIAS = ['Buccal', 'Dental', 'Intramuscular', 'Intrathecal', 'Intravenous', 'Oral', 'Periodontal', 'Sublingual', 'Submucosal', 'Topical']

/* La línea que red.dev arma debajo de Directions for use: "Take 2 applications buccally as needed for 7 days". Sólo con
   todos los datos; en singular con 1 (red.dev agrega una "s" siempre: "applicationss"). */
const SINGULAR: Record<string, string> = {
  Applications: 'application', Capsules: 'capsule', Drops: 'drop', Puffs: 'puff', Sprays: 'spray', Suppository: 'suppository',
  Tablespoons: 'tablespoon', Tablets: 'tablet', Teaspoons: 'teaspoon',
}
const PLURAL: Record<string, string> = { Suppository: 'suppositories' }
const ADVERBIO: Record<string, string> = {
  Buccal: 'buccally', Dental: 'dentally', Intramuscular: 'intramuscularly', Intrathecal: 'intrathecally', Intravenous: 'intravenously',
  Oral: 'orally', Periodontal: 'periodontally', Sublingual: 'sublingually', Submucosal: 'submucosally', Topical: 'topically',
}
export function indicacionesDeUso(m: Pick<Medicacion, 'dosis' | 'dosisUnidad' | 'via' | 'frecuencia' | 'duracion' | 'duracionUnidad'>) {
  if (!m.dosis || !m.dosisUnidad || !m.via || !m.frecuencia || !m.duracion || !m.duracionUnidad) return ''
  const uno = Number(m.dosis) === 1
  const unidad = m.dosisUnidad === 'Unknown' ? '' : uno ? SINGULAR[m.dosisUnidad] : PLURAL[m.dosisUnidad] ?? m.dosisUnidad.toLowerCase()
  const frecuencia = m.frecuencia === 'Every 4 to 6 hours' ? 'every 4-6 hours' : m.frecuencia.toLowerCase()
  const dias = Number(m.duracion) === 1 ? m.duracionUnidad.toLowerCase().replace(/s$/, '') : m.duracionUnidad.toLowerCase()
  return ['Take', m.dosis, unidad, ADVERBIO[m.via] ?? m.via.toLowerCase(), frecuencia, 'for', m.duracion, dias].filter(Boolean).join(' ')
}

/* El buscador de Drug Name: genérico o marca (CON-2230). Lo de uso más común en odontología. */
export const DROGAS = [
  'Amoxicillin', 'Amoxicillin / Clavulanate (Augmentin)', 'Azithromycin', 'Cephalexin', 'Clindamycin', 'Metronidazole',
  'Ibuprofen (Advil)', 'Naproxen', 'Acetaminophen (Tylenol)', 'Ketorolac', 'Hydrocodone / Acetaminophen', 'Tramadol',
  'Chlorhexidine 0.12% rinse', 'Fluoride 1.1% gel', 'Nystatin', 'Clonazepam', 'Diazepam', 'Dexamethasone',
]

/* La medicación activa del paciente (Medical History). Guardar una receta que la vuelve a cargar con Update patient
   medications pregunta si se reutiliza (CON-2846; en red.dev, al guardar). */
export const MEDICACION_ACTIVA = ['Ibuprofen (Advil)']

/** Una medicación vacía: los valores por defecto de CON-2347 (Refills 0, genérico sí, controlada no). */
export const medicacionNueva = (id: string): Medicacion => ({
  id, droga: '', fuerza: '', fuerzaUnidad: '', forma: '', cantidad: '', recargas: '0', generico: true, controlada: false,
  actualizar: false, dosis: '', dosisUnidad: '', via: '', frecuencia: '', duracion: '', duracionUnidad: 'Days',
})

/** "Amoxicillin 500 mg": la medicación en una línea (la tabla y el PDF). */
export const nombreMedicacion = (m: Medicacion) => [m.droga, m.fuerza && \`\${m.fuerza} \${m.fuerzaUnidad}\`.trim()].filter(Boolean).join(' ')

const med = (id: string, droga: string, fuerza: string, forma: string, extra: Partial<Medicacion> = {}): Medicacion => ({
  ...medicacionNueva(id), droga, fuerza, fuerzaUnidad: 'mg', forma, cantidad: '20', dosis: '1', dosisUnidad: forma === 'Oral capsule' ? 'Capsules' : 'Tablets',
  via: 'Oral', frecuencia: 'Three times daily', duracion: '7', ...extra,
})

const AMOXI = (id: string) => med(id, 'Amoxicillin', '500', 'Oral capsule', { cantidad: '21' })
const IBU = (id: string) => med(id, 'Ibuprofen (Advil)', '400', 'Oral tablet', { frecuencia: 'Every 4 to 6 hours', duracion: '5' })
const CLINDA = (id: string) => med(id, 'Clindamycin', '300', 'Oral capsule', { frecuencia: 'Four times daily', cantidad: '28' })
const CHX = (id: string) => med(id, 'Chlorhexidine 0.12% rinse', '15', 'Mouthwash', {
  fuerzaUnidad: 'ml', cantidad: '1', dosis: '1', dosisUnidad: 'Tablespoons', via: 'Buccal', frecuencia: 'Twice daily', duracion: '2', duracionUnidad: 'Weeks',
})
const CLONA = (id: string) => med(id, 'Clonazepam', '0.5', 'Oral tablet', { cantidad: '2', frecuencia: 'Immediately', duracion: '1', controlada: true, generico: false })

const r = (id: string, proveedor: string, estado: EstadoReceta, creado: string, actualizado: string, vence: string, medicaciones: Medicacion[], indicaciones = ''): Receta =>
  ({ id, proveedor, estado, creado, actualizado, vence, medicaciones, indicaciones })

/* Las recetas del paciente, de la más nueva a la más vieja. Inventadas para el mock: el video de red.dev muestra la lista
   con un solo provider y nombres de droga sin unidad ("clonazepam 1 G"). */
export const RECETAS: Receta[] = [
  r('rx-14', 'Dr. Julián Gerardi', 'Pending', '11/26/2026', '11/26/2026', '12/26/2026', [AMOXI('m14a'), { ...IBU('m14b'), actualizar: true }], 'Take the antibiotic until the box is finished, even if the pain stops.'),
  r('rx-13', 'Dr. Sarah Stone', 'Pending', '11/24/2026', '11/25/2026', '12/24/2026', [CHX('m13a')]),
  r('rx-12', 'Dr. Julián Gerardi', 'Active', '11/18/2026', '11/18/2026', '02/18/2027', [CLINDA('m12a')], 'Allergic to penicillin.'),
  r('rx-11', 'Dr. Julio Perez', 'Active', '11/10/2026', '11/11/2026', '12/10/2026', [IBU('m11a')]),
  r('rx-10', 'Dr. Sarah Stone', 'Canceled', '10/30/2026', '10/31/2026', '11/30/2026', [CLONA('m10a')]),
  r('rx-09', 'Dr. Julián Gerardi', 'Expired', '08/31/2026', '08/31/2026', '09/30/2026', [CLONA('m09a')], 'Take one hour before the appointment.'),
  r('rx-08', 'Dr. Julián Gerardi', 'Expired', '08/31/2026', '08/31/2026', '09/30/2026', [IBU('m08a')]),
  r('rx-07', 'Dr. Julio Perez', 'Expired', '08/28/2026', '08/28/2026', '09/28/2026', [AMOXI('m07a'), IBU('m07b')]),
  r('rx-06', 'Dr. Sarah Stone', 'Expired', '07/31/2026', '07/31/2026', '08/31/2026', [IBU('m06a')]),
  r('rx-05', 'Dr. Julián Gerardi', 'Canceled', '06/30/2026', '06/30/2026', '07/30/2026', [CLONA('m05a')]),
  r('rx-04', 'Dr. Julián Gerardi', 'Expired', '06/30/2026', '06/30/2026', '07/30/2026', [CHX('m04a')]),
  r('rx-03', 'Dr. Julio Perez', 'Expired', '06/05/2026', '06/05/2026', '07/05/2026', [CLINDA('m03a')]),
  r('rx-02', 'Dr. Sarah Stone', 'Expired', '06/05/2026', '06/05/2026', '07/05/2026', [AMOXI('m02a')]),
  r('rx-01', 'Dr. Julián Gerardi', 'Expired', '06/03/2026', '06/03/2026', '07/03/2026', [CLONA('m01a')]),
]

/** El provider que firma lo que se crea acá: el del encuentro. */
export const PRESCRIPTOR = 'Dr. Julián Gerardi'

/** La receta Pending de una tarea de Pending Task (Complete this task la abre): una medicación de ejemplo. */
export const recetaDeTarea = ({ id, proveedor, creado, vence }: { id: string; proveedor: string; creado: string; vence: string }): Receta =>
  r(id, proveedor, 'Pending', creado, creado, vence, [AMOXI(\`\${id}-m1\`)])
`})))()}export{r as n,n as r,i as t};