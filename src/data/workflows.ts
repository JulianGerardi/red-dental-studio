/* Workflows de Treatment: cuestionarios por pasos que el profesional completa con el paciente. Chief Complaint y Triage
   deciden los badges CC y TR del header. Preguntas de Triage y Reason for Visit tal como están en red.dev; el resto es
   mock. Ver design-reference/figma/modulos/clinical-mode.md. */

export type TipoPregunta = 'single' | 'multiple' | 'yesno' | 'text'
export type Valor = string | string[]

export type Pregunta = {
  id: string
  texto: string
  tipo: TipoPregunta
  opciones?: string[]
  /** Se puede guardar el paso sin contestarla. */
  opcional?: boolean
  /** Preguntas que aparecen colgadas de esta cuando se elige `cuando`. */
  hijas?: { cuando: string; preguntas: Pregunta[] }[]
}

export type PasoWorkflow = { id: string; nombre: string; preguntas: Pregunta[] }
export type CategoriaWorkflow = 'Procedure' | 'Emergency' | 'Complication' | 'Questionnaire'
export const CATEGORIAS_WORKFLOW: CategoriaWorkflow[] = ['Procedure', 'Emergency', 'Complication', 'Questionnaire']

export type Workflow = {
  id: string
  codigo: string
  nombre: string
  categoria: CategoriaWorkflow
  version: number
  fecha: string
  pasos: PasoWorkflow[]
}

export const TIPO_PREGUNTA: Record<TipoPregunta, string> = {
  single: 'Multiple option · one selection',
  multiple: 'Multiple option · multiple selection',
  yesno: 'Yes / No',
  text: 'Text',
}

const sn = (id: string, texto: string, hijas?: Pregunta['hijas']): Pregunta => ({ id, texto, tipo: 'yesno', opciones: ['Yes', 'No'], hijas })

export const WORKFLOWS: Workflow[] = [
  {
    id: 'chief-complaint', codigo: 'CHIEFCOMPLAINT', nombre: 'Chief Complaint', categoria: 'Questionnaire', version: 2, fecha: 'Oct 05, 9:10 AM',
    pasos: [
      {
        id: 'cc-motivo', nombre: 'Reason for Visit',
        preguntas: [
          {
            id: 'cc-motivo-1', texto: 'What is the main reason for your visit today?', tipo: 'single',
            opciones: ['Exam', 'Problem / Concern', 'Continue treatment', 'Cleaning / Maintenance', 'Request specific service', 'Learn about a procedure'],
            hijas: [{ cuando: 'Problem / Concern', preguntas: [{ id: 'cc-motivo-1a', texto: 'Is it related to a previous treatment?', tipo: 'yesno', opciones: ['Yes', 'No'] }] }],
          },
          { id: 'cc-motivo-2', texto: 'Please type your main concern in your own words', tipo: 'text' },
        ],
      },
      {
        id: 'cc-hpi', nombre: 'Current Dental Problems (HPI)',
        preguntas: [
          { id: 'cc-hpi-1', texto: 'Where is the problem?', tipo: 'single', opciones: ['Upper left', 'Upper right', 'Lower left', 'Lower right', 'Front teeth', 'Whole mouth'] },
          { id: 'cc-hpi-2', texto: 'How long have you had it?', tipo: 'single', opciones: ['Today', 'A few days', '1–2 weeks', 'More than a month'] },
          { id: 'cc-hpi-3', texto: 'How would you rate the pain?', tipo: 'single', opciones: ['None', 'Mild', 'Moderate', 'Severe'] },
          { id: 'cc-hpi-4', texto: 'What makes it worse?', tipo: 'multiple', opcional: true, opciones: ['Cold', 'Heat', 'Sweets', 'Chewing'] },
        ],
      },
    ],
  },
  {
    id: 'triage', codigo: 'TRIAGE', nombre: 'Triage', categoria: 'Emergency', version: 24, fecha: 'Oct 05, 9:10 AM',
    pasos: [
      {
        id: 'tr-triage', nombre: 'Triage',
        preguntas: [
          { id: 'tr-1', texto: 'Do any of the following apply to you right now?', tipo: 'multiple', opcional: true, opciones: ['Fever', 'Nausea/Vomiting', 'Recent trauma to the face or jaw', 'Chest pain', 'Uncontrolled bleeding'] },
          sn('tr-2', 'Have you traveled in the last month?'),
          sn('tr-3', 'Is this your first visit?'),
          sn('tr-4', 'Do you feel unsafe in your living situation?'),
          sn('tr-5', 'Do you feel that you are in any danger?'),
          sn('tr-6', 'Have you used alcohol or a recreational substance today?'),
          sn('tr-7', 'Is this a dental emergency today?', [{ cuando: 'Yes', preguntas: [{ id: 'tr-7a', texto: 'Describe the emergency', tipo: 'text' }] }]),
        ],
      },
    ],
  },
  {
    id: 'social-history', codigo: 'SOCIALHISTORY', nombre: 'Social History', categoria: 'Questionnaire', version: 3, fecha: 'Oct 05, 9:11 AM',
    pasos: [
      { id: 'sh-tabaco', nombre: 'Tobacco Use', preguntas: [{ id: 'sh-1', texto: 'Do you use tobacco?', tipo: 'single', opciones: ['Never', 'Former', 'Current'] }] },
      { id: 'sh-alcohol', nombre: 'Alcohol', preguntas: [{ id: 'sh-2', texto: 'How often do you drink alcohol?', tipo: 'single', opciones: ['Never', 'Monthly', 'Weekly', 'Daily'] }] },
      { id: 'sh-drogas', nombre: 'Drugs', preguntas: [sn('sh-3', 'Do you use recreational drugs?')] },
    ],
  },
  {
    id: 'family-history', codigo: 'FAMILYHISTORY', nombre: 'Family History', categoria: 'Questionnaire', version: 1, fecha: 'Oct 05, 9:11 AM',
    pasos: [
      { id: 'fh-familia', nombre: 'Family History', preguntas: [{ id: 'fh-1', texto: 'Has anyone in your family had…', tipo: 'multiple', opciones: ['Diabetes', 'Heart disease', 'Gum disease', 'Oral cancer', 'None of these'] }] },
    ],
  },
  {
    id: 'dental-history', codigo: 'DENTALORALHISTORY', nombre: 'Dental and Oral Health History', categoria: 'Questionnaire', version: 1, fecha: 'Oct 05, 9:12 AM',
    pasos: [
      {
        id: 'dh-historia', nombre: 'Dental Care History and Current Treatment',
        preguntas: [
          { id: 'dh-1', texto: 'When was your last dental visit?', tipo: 'single', opciones: ['Less than 6 months', '6–12 months', '1–2 years', 'More than 2 years'] },
          sn('dh-2', 'Are you currently under dental treatment elsewhere?'),
        ],
      },
    ],
  },
  {
    id: 'prophylaxis', codigo: 'PROPHYLAXIS', nombre: 'Prophylaxis', categoria: 'Procedure', version: 4, fecha: 'Oct 05, 9:30 AM',
    pasos: [
      { id: 'px-zona', nombre: 'Tooth and Location', preguntas: [{ id: 'px-1', texto: 'Area', tipo: 'single', opciones: ['Full mouth', 'Upper arch', 'Lower arch', 'Quadrant'] }] },
      { id: 'px-preop', nombre: 'Non Surgical Patient Pre Op', preguntas: [sn('px-2', 'Medical history reviewed?'), sn('px-3', 'Premedication required?')] },
      { id: 'px-raspado', nombre: 'Prophy Instrument & Scaling', preguntas: [{ id: 'px-4', texto: 'Instruments used', tipo: 'multiple', opciones: ['Ultrasonic scaler', 'Hand scalers', 'Curettes'] }] },
      { id: 'px-interprox', nombre: 'Interproximal Cleaning & Irrigation', preguntas: [{ id: 'px-5', texto: 'Irrigation', tipo: 'single', opciones: ['Chlorhexidine', 'Saline', 'None'] }] },
      { id: 'px-pulido', nombre: 'Prophy Polishing', preguntas: [{ id: 'px-6', texto: 'Paste grit', tipo: 'single', opciones: ['Fine', 'Medium', 'Coarse'] }] },
      { id: 'px-extra', nombre: 'Additional Procedures During Hygiene', preguntas: [{ id: 'px-7', texto: 'Additional procedures', tipo: 'multiple', opcional: true, opciones: ['Fluoride varnish', 'Sealants', 'Desensitizer'] }] },
    ],
  },
]

/* Qué workflow decide cada badge del header. */
export const WORKFLOW_DEL_BADGE = { CC: 'chief-complaint', TR: 'triage' } as const

/* La narrativa clínica del workflow: el borrador que se genera con lo contestado, o el texto ya editado. */
export type Narrativa = { html: string; origen: 'draft' | 'edited'; fecha: string }

export type ProgresoWorkflow = { respuestas: Record<string, Valor>; guardados: string[]; completado?: string; narrativa?: Narrativa }

/* Arranque del mock: Chief Complaint ya contestado (CC en verde) y Triage sin contestar (TR en rojo). */
export const PROGRESO_INICIAL: Record<string, ProgresoWorkflow> = {
  'chief-complaint': {
    respuestas: {
      'cc-motivo-1': 'Problem / Concern', 'cc-motivo-1a': 'No', 'cc-motivo-2': 'Sharp pain on the lower right when I drink something cold.',
      'cc-hpi-1': 'Lower right', 'cc-hpi-2': 'A few days', 'cc-hpi-3': 'Moderate', 'cc-hpi-4': ['Cold', 'Chewing'],
    },
    guardados: ['cc-motivo', 'cc-hpi'],
    completado: 'Oct 05, 9:14 AM',
  },
}

export const contestada = (v: Valor | undefined) => (Array.isArray(v) ? v.length > 0 : !!v?.trim())

/* Las preguntas que se ven con las respuestas actuales: las hijas sólo si se eligió su opción. */
export function preguntasVisibles(preguntas: Pregunta[], r: Record<string, Valor>): Pregunta[] {
  return preguntas.flatMap((p) => {
    const v = r[p.id]
    const hijas = (p.hijas ?? []).filter((h) => (Array.isArray(v) ? v.includes(h.cuando) : v === h.cuando)).flatMap((h) => preguntasVisibles(h.preguntas, r))
    return [p, ...hijas]
  })
}

export const pasoListo = (paso: PasoWorkflow, r: Record<string, Valor>) =>
  preguntasVisibles(paso.preguntas, r).every((p) => p.opcional || contestada(r[p.id]))

export const textoRespuesta = (v: Valor | undefined) => (Array.isArray(v) ? v.join(', ') : v ?? '')

const escapar = (t: string) => t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!)

/* El borrador de la narrativa: título del workflow, un subtítulo por paso guardado y lo contestado. Vacío si no hay nada
   guardado (red.dev: "No answered questions to summarize"). */
export function borradorNarrativa(wf: Workflow, p?: ProgresoWorkflow): string {
  const r = p?.respuestas ?? {}
  const pasos = wf.pasos
    .filter((paso) => p?.guardados.includes(paso.id))
    .map((paso) => {
      const items = preguntasVisibles(paso.preguntas, r).filter((q) => contestada(r[q.id]))
      if (!items.length) return ''
      const lineas = items.map((q) =>
        q.tipo === 'text' ? `<li><b>${escapar(q.texto)}:</b> “${escapar(textoRespuesta(r[q.id]))}”</li>` : `<li><b>${escapar(q.texto)}</b> ${escapar(textoRespuesta(r[q.id]))}</li>`,
      )
      return `<h3>${escapar(paso.nombre)}</h3><ul>${lineas.join('')}</ul>`
    })
    .filter(Boolean)
  return pasos.length ? `<h2>${escapar(wf.nombre)}</h2>${pasos.join('')}` : ''
}
