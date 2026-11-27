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

/* Las listas de CON-2230 tal cual; las que la historia deja con "etc." se completan con las de uso dental. */
export const FORMAS = ['Tablet', 'Capsule', 'Solution', 'Suspension', 'Syrup', 'Ointment', 'Cream', 'Gel', 'Spray', 'Powder', 'Transdermal Patch']
export const FRECUENCIAS = ['Every 4 hours', 'Every 6 hours', 'Every 8 hours', 'Every 12 hours', 'Once daily', 'Twice daily', 'Three times daily', 'Every 7 hours', 'Every 24 hours']
export const DURACION_UNIDADES = ['Days', 'Weeks', 'Months']
export const FUERZA_UNIDADES = ['mg', 'g', 'mcg', 'ml', '%']
export const DOSIS_UNIDADES = ['mg', 'ml', 'Tablet', 'Capsule', 'Drop', 'Puff', 'Application']
export const VIAS = ['Oral', 'Sublingual', 'Topical', 'Buccal', 'Intravenous (IV)', 'Intramuscular (IM)', 'Inhalation']

/* El buscador de Drug Name: genérico o marca (CON-2230). Lo de uso más común en odontología. */
export const DROGAS = [
  'Amoxicillin', 'Amoxicillin / Clavulanate (Augmentin)', 'Azithromycin', 'Cephalexin', 'Clindamycin', 'Metronidazole',
  'Ibuprofen (Advil)', 'Naproxen', 'Acetaminophen (Tylenol)', 'Ketorolac', 'Hydrocodone / Acetaminophen', 'Tramadol',
  'Chlorhexidine 0.12% rinse', 'Fluoride 1.1% gel', 'Nystatin', 'Clonazepam', 'Diazepam', 'Dexamethasone',
]

/* La medicación activa del paciente (Medical History). Con una de estas, Activate pregunta si se reutiliza (CON-2846). */
export const MEDICACION_ACTIVA = ['Ibuprofen (Advil)']

/** Una medicación vacía: los valores por defecto de CON-2347 (Refills 0, genérico sí, controlada no). */
export const medicacionNueva = (id: string): Medicacion => ({
  id, droga: '', fuerza: '', fuerzaUnidad: '', forma: '', cantidad: '', recargas: '0', generico: true, controlada: false,
  actualizar: false, dosis: '', dosisUnidad: '', via: '', frecuencia: '', duracion: '', duracionUnidad: 'Days',
})

/** "Amoxicillin 500 mg": la medicación en una línea (la tabla y el PDF). */
export const nombreMedicacion = (m: Medicacion) => [m.droga, m.fuerza && \`\${m.fuerza} \${m.fuerzaUnidad}\`.trim()].filter(Boolean).join(' ')

const med = (id: string, droga: string, fuerza: string, forma: string, extra: Partial<Medicacion> = {}): Medicacion => ({
  ...medicacionNueva(id), droga, fuerza, fuerzaUnidad: 'mg', forma, cantidad: '20', dosis: '1', dosisUnidad: forma === 'Capsule' ? 'Capsule' : 'Tablet',
  via: 'Oral', frecuencia: 'Every 8 hours', duracion: '7', ...extra,
})

const AMOXI = (id: string) => med(id, 'Amoxicillin', '500', 'Capsule', { cantidad: '21' })
const IBU = (id: string) => med(id, 'Ibuprofen (Advil)', '400', 'Tablet', { frecuencia: 'Every 6 hours', duracion: '5' })
const CLINDA = (id: string) => med(id, 'Clindamycin', '300', 'Capsule', { frecuencia: 'Every 6 hours', cantidad: '28' })
const CHX = (id: string) => med(id, 'Chlorhexidine 0.12% rinse', '15', 'Solution', {
  fuerzaUnidad: 'ml', cantidad: '1', dosis: '15', dosisUnidad: 'ml', via: 'Buccal', frecuencia: 'Twice daily', duracion: '2', duracionUnidad: 'Weeks',
})
const CLONA = (id: string) => med(id, 'Clonazepam', '0.5', 'Tablet', { cantidad: '2', frecuencia: 'Once daily', duracion: '1', controlada: true, generico: false })

const r = (id: string, proveedor: string, estado: EstadoReceta, creado: string, actualizado: string, vence: string, medicaciones: Medicacion[], indicaciones = ''): Receta =>
  ({ id, proveedor, estado, creado, actualizado, vence, medicaciones, indicaciones })

/* Las recetas del paciente, de la más nueva a la más vieja. Inventadas para el mock: el video de red.dev muestra la lista
   con un solo provider y nombres de droga sin unidad ("clonazepam 1 G"). */
export const RECETAS: Receta[] = [
  r('rx-14', 'Dr. Julián Gerardi', 'Pending', '11/26/2026', '11/26/2026', '12/26/2026', [AMOXI('m14a'), IBU('m14b')], 'Take the antibiotic until the box is finished, even if the pain stops.'),
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