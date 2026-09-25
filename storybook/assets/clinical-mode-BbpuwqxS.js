import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`/* Clinical Mode — la barra, las pestañas y el overview salen de **4235:135661**,
   que es la versión buena; 4235:136450 era un tablero anterior.

   El contenido va tal cual, incluidos los errores del frame: la pestaña dice
   "Ovewiev", la pill verde de la variante abierta dice "Chief Compliace", y
   Medical history repite "Conditions" en dos tiles con conteos distintos (0 y
   5). Ver modulos/clinical-mode.md. */

export type Constante = { icono: 'edad' | 'sexo' | 'peso' | 'altura'; valor: string }

/* En 4235:135661 las constantes van como texto pelado y en este orden. */
export const CONSTANTES: Constante[] = [
  { icono: 'edad', valor: '34 yrs' },
  { icono: 'sexo', valor: 'Male' },
  { icono: 'altura', valor: '1.68 m' },
  { icono: 'peso', valor: '85 kg' },
]

/* Los cuatro contadores redondos de la barra. El 0 va en gris: un contador en
   cero no es una novedad y no debería llamar como los otros. */
/* Los cuatro contadores no son adorno: cada uno abre un desplegable con lo que
   cuenta. Es donde vive ahora la historia clínica del paciente —el tablero
   viejo la tenía como card en la columna izquierda—. */
export type Contador = {
  id: string
  icono: 'link' | 'signos' | 'personas' | 'info'
  titulo: string
  items: string[]
  vacio: string
}

export const CONTADORES: Contador[] = [
  {
    id: 'refs', icono: 'link', titulo: 'Referrals', items: [],
    vacio: 'No referrals for this patient.',
  },
  {
    id: 'medications', icono: 'signos', titulo: 'Medications', vacio: '',
    items: ['Ibuprofeno 1 G', 'Clonazepam 1 G', 'Amoxicillin 500 mg', 'Paracetamol 1 G', 'Omeprazole 20 mg'],
  },
  {
    id: 'conditions', icono: 'personas', titulo: 'Conditions', vacio: '',
    items: ['Hypertension', 'Type 2 diabetes', 'Asthma', 'Bruxism', 'Gastritis'],
  },
  {
    id: 'allergies', icono: 'info', titulo: 'Allergy', vacio: '',
    items: ['Penicillin', 'Latex', 'Ibuprofen', 'Peanuts', 'Pollen'],
  },
]

/* La botonera tiene dos juegos y el botón "Exams" alterna entre ellos
   (4265:56662). Overview dejó de ser pestaña: vive en la barra de arriba. */
export const EXAMENES = [
  'Ros', 'BMI', 'Vitals', 'Physical', 'ATM/O-F',
  'Intra Oral', 'Extra Oral', 'DentAssmt', 'Periodontal', 'Radiography',
] as const
export const REGISTROS = [
  'Treatment Plan', 'Treatment', 'Treatment History',
  'Lab Order', 'Prescription', 'Referral', 'Clinical Note',
] as const
export type Pestana = (typeof EXAMENES)[number] | (typeof REGISTROS)[number]
export type Juego = 'Exams' | 'Records'

export type Plan = {
  id: string
  doctor: string
  rol: string
  nombre: string
  tipo: string
  estado: 'Available' | 'Accepted' | 'Inprogress'
  total: string
  creado: string
  procedimientos: number
  progreso: number
  completados: string
  estimado: string
}

export const PLANES: Plan[] = Array.from({ length: 4 }, (_, i) => ({
  id: \`tp\${i + 1}\`, doctor: 'Daniel Anderson', rol: 'Dentist',
  nombre: 'periodontists Alternative', tipo: 'Comprehensive Care', estado: 'Available',
  total: '$231.12', creado: '23/04/2025', procedimientos: 5,
  progreso: 75, completados: '3 of 5 completed', estimado: 'Expected completion: May 2025',
}))

export type Problema = {
  id: string
  fecha: string
  pieza: number
  /** El frame la rotula "Surface" y muestra "1"; no hay columna de pieza. */
  superficie: string
  condicion: string
  examen: string
  proveedor: string
  nota: string
  estado: 'Active' | 'Resolved' | 'Monitoring'
}

/* El frame repite tres filas idénticas de "Perez Marti..." truncado. Acá la
   columna se llama Date y lleva fechas: un nombre de persona en una columna
   de fechas es del frame, no del dominio. Ver anomalías. */
export const PROBLEMAS: Problema[] = [
  { id: 'p1', fecha: '2025/01/24', pieza: 1,  superficie: '1',  condicion: 'Carries',     examen: 'Dental Assessment', proveedor: 'Perez Martinez',  nota: 'Deep lesion, monitor after restoration.', estado: 'Active' },
  { id: 'p2', fecha: '2025/01/24', pieza: 14, superficie: '1',  condicion: 'Carries',     examen: 'Dental Assessment', proveedor: 'Perez Martinez',  nota: 'Occlusal decay detected on routine exam.', estado: 'Active' },
  { id: 'p3', fecha: '2025/01/24', pieza: 3,  superficie: '1',  condicion: 'Carries',     examen: 'Dental Assessment', proveedor: 'Perez Martinez',  nota: 'Enamel fracture, no pulp involvement.', estado: 'Active' },
  { id: 'p4', fecha: '2024/12/02', pieza: 22, superficie: 'L',  condicion: 'Calculus',    examen: 'Periodontal',       proveedor: 'Michael Johnson', nota: 'Subgingival calculus, scaling scheduled.', estado: 'Active' },
  { id: 'p5', fecha: '2024/11/28', pieza: 30, superficie: 'ML', condicion: 'Restoration', examen: 'Dental Assessment', proveedor: 'Perez Martinez',  nota: 'Composite replaced, margins sealed.', estado: 'Resolved' },
  { id: 'p6', fecha: '2024/11/19', pieza: 8,  superficie: 'B',  condicion: 'Abrasion',    examen: 'Extra Oral',        proveedor: 'Michael Johnson', nota: 'Cervical abrasion from brushing technique.', estado: 'Monitoring' },
  { id: 'p7', fecha: '2024/11/05', pieza: 19, superficie: 'DL', condicion: 'Carries',     examen: 'Intra Oral',        proveedor: 'Perez Martinez',  nota: 'Recurrent caries under old amalgam.', estado: 'Active' },
]

/* Los dos textos del panel lateral que abren las pills verdes de la barra. */
export const PANELES = {
  TR: {
    titulo: 'Triage',
    parrafos: [
      'The user has successfully completed the dental triage questionnaire, addressing key questions such as their dental history, current symptoms, and any previous treatments.',
      'This comprehensive assessment includes inquiries about pain levels, sensitivity to hot or cold, and any noticeable changes in their oral health.',
    ],
    fecha: '12 March 2025',
    hora: '10:00 - 11:00 AM',
  },
  CC: {
    titulo: 'Chief Compliace',
    parrafos: [
      'Patient reports a persistent ache on the lower right side when chewing, first noticed about two weeks ago.',
      'Pain increases with cold drinks and subsides within a minute. No swelling or fever reported.',
    ],
    fecha: '12 March 2025',
    hora: '10:00 - 11:00 AM',
  },
} as const
export type ClavePanel = keyof typeof PANELES

export const ULTIMA_CONDICION = {
  condicion: 'Caries',
  actualizado: '20/06/2025',
  pieza: 3,
}

/* ── Lab Order (Figma 4070:148911, listado) ────────────────────────── */

export type EstadoOrden =
  | 'Pending' | 'Canceled' | 'Rejected' | 'Delayed' | 'Requested' | 'Delivered'

export type OrdenLab = {
  id: string
  proveedor: string
  paciente: string
  estado: EstadoOrden
  actualizado: string
  creado: string
  vence: string
  /** El frame pinta de rojo las que vencen pronto. */
  urgente?: boolean
}

export const ORDENES: OrdenLab[] = [
  { id: 'lo1', proveedor: 'Dr. Julián Gerardi', paciente: 'James Cartes',  estado: 'Pending',   actualizado: 'May 10, 2026', creado: 'May 11, 2026', vence: 'May 18, 2028' },
  { id: 'lo2', proveedor: 'Dr. Sarah Stone',    paciente: 'Maria Lopez',   estado: 'Canceled',  actualizado: 'May 08, 2026', creado: 'May 08, 2026', vence: 'May 12, 2026' },
  { id: 'lo3', proveedor: 'Dr. Julián Gerardi', paciente: 'Carlos Ruiz',   estado: 'Rejected',  actualizado: 'Apr 20, 2026', creado: 'Apr 21, 2026', vence: 'Oct 21, 2026' },
  { id: 'lo4', proveedor: 'Dr. Julio Perez',    paciente: 'Ana Torres',    estado: 'Rejected',  actualizado: 'May 14, 2026', creado: 'May 15, 2026', vence: 'Nov 15, 2026' },
  { id: 'lo5', proveedor: 'Dr. Sarah Stone',    paciente: 'Sofia Sanchez', estado: 'Delayed',   actualizado: 'Mar 15, 2026', creado: 'Mar 16, 2026', vence: 'Sep 16, 2026' },
  { id: 'lo6', proveedor: 'Dr. Julián Gerardi', paciente: 'Laura Martinez',estado: 'Delayed',   actualizado: 'Feb 01, 2026', creado: 'Feb 01, 2026', vence: 'Feb 01, 2027' },
  { id: 'lo7', proveedor: 'Dr. Sarah Stone',    paciente: 'Diego Garcia',  estado: 'Requested', actualizado: 'May 01, 2026', creado: 'May 01, 2026', vence: 'May 14, 2026', urgente: true },
  { id: 'lo8', proveedor: 'Dr. Julio Perez',    paciente: 'Mateo Perez',   estado: 'Requested', actualizado: 'May 05, 2026', creado: 'May 06, 2026', vence: 'Aug 06, 2026' },
  { id: 'lo9', proveedor: 'Dr. Julián Gerardi', paciente: 'Mateo Perez',   estado: 'Delivered', actualizado: 'Apr 12, 2026', creado: 'Apr 12, 2026', vence: 'Apr 19, 2026', urgente: true },
]

/* ── Vitals (Figma 4106:205304 "Vitals — Section (Entry Form)") ────── */

export type EstadoVital = 'Normal' | 'Elevated' | 'Dangerously low'

export const VITAL_COLOR: Record<EstadoVital, { arco: string; pill: string }> = {
  Normal:            { arco: '#1a804d', pill: 'border-dash-ok-fg bg-dash-ok-bg text-dash-ok-fg' },
  Elevated:          { arco: '#d4900c', pill: 'border-warn-fg bg-warn-bg text-warn-fg' },
  'Dangerously low': { arco: '#b22626', pill: 'border-dash-bad-fg bg-dash-bad-bg text-dash-bad-fg' },
}

export type Vital = {
  id: string
  titulo: string
  subtitulo: string
  /** Un valor, salvo Blood Pressure que lleva sistólica y diastólica. */
  campos: { label?: string; valor: number; min: number; max: number; paso: number }[]
  unidad: string
  rango: string
  /** Anthropometry alterna Weight / Hight y lb / kg. */
  alternador?: { grupo: string[]; unidades: string[] }
}

export const VITALES: Vital[] = [
  {
    id: 'anthropometry', titulo: 'Anthropometry', subtitulo: 'Weight measurement',
    campos: [{ valor: 512.2, min: 0, max: 900, paso: 0.1 }],
    unidad: 'lb', rango: 'Range: 0 - 900 lbs',
    alternador: { grupo: ['Weight', 'Hight'], unidades: ['lb', 'kg'] },
  },
  {
    id: 'blood-pressure', titulo: 'Blood Pressure', subtitulo: 'Systolic / Diastolic measurement',
    campos: [
      { label: 'Systolic', valor: 120, min: 50, max: 250, paso: 1 },
      { label: 'Diastolic', valor: 80, min: 30, max: 150, paso: 1 },
    ],
    unidad: 'mHg', rango: 'Range: Systolic 50-250 | Diastolic 30-150 mmHg',
  },
  {
    id: 'temperature', titulo: 'Temperature', subtitulo: 'Measurement',
    campos: [{ valor: 96.5, min: 93, max: 108, paso: 0.1 }],
    unidad: '°F', rango: 'Range: 93 - 108 °F',
  },
  {
    id: 'respiration', titulo: 'Respiration', subtitulo: 'Measurement',
    campos: [{ valor: 25, min: 6, max: 60, paso: 1 }],
    unidad: 'bpm', rango: 'Range: 6 - 60 bpm',
  },
  {
    id: 'heart-rate', titulo: 'Heart Rate', subtitulo: 'Measurement',
    campos: [{ valor: 25, min: 40, max: 220, paso: 1 }],
    unidad: 'bpm', rango: 'Range: 40 - 220 bpm',
  },
  {
    id: 'spo2', titulo: 'SpO2', subtitulo: 'Measurement',
    campos: [{ valor: 65, min: 80, max: 100, paso: 1 }],
    unidad: '%', rango: 'Range: 80 - 100 %',
  },
]

/* El aviso azul que el frame muestra sobre Blood Pressure. Se replica el texto
   tal cual aunque hable de horarios y días en una tarjeta de presión: es del
   frame, copiado de otra pantalla. */
export const AVISO_PRESION = {
  titulo: 'Blood pressure',
  texto: "This will update the hours for all selected days with the time ranges you've set above.",
}

/* ── Radiography (Figma 4106:197453 "Radiography - Initial") ───────── */

export type Radiografia = { id: string; fecha: string; profesional: string; tipo: string }

/* Un hallazgo sobre una placa. El frame de Radiography escribe "Discarted";
   el componente del design system (432:15211) lo escribe bien. Se usa el del
   design system: es el que define el componente. */
export type EstadoHallazgo = 'Active' | 'Discarded'
export type Hallazgo = {
  id: string
  estado: EstadoHallazgo
  fecha: string
  zona: string
  condicion: string
  descriptores: string
}

/* Seis, que es lo que dice el pie del componente: "All result (6)". */
export const HALLAZGOS: Hallazgo[] = [
  { id: 'f1', estado: 'Discarded', fecha: '27, August 2025', zona: 'Soft Palate', condicion: 'Oral Candidiasis', descriptores: 'Red' },
  { id: 'f2', estado: 'Active',    fecha: '27, August 2025', zona: 'Soft Palate', condicion: 'Oral Candidiasis', descriptores: 'Red' },
  { id: 'f3', estado: 'Discarded', fecha: '27, August 2025', zona: 'Soft Palate', condicion: 'Oral Candidiasis', descriptores: 'Red' },
  { id: 'f4', estado: 'Active',    fecha: '27, August 2025', zona: 'Soft Palate', condicion: 'Oral Candidiasis', descriptores: 'Red' },
  { id: 'f5', estado: 'Discarded', fecha: '27, August 2025', zona: 'Soft Palate', condicion: 'Oral Candidiasis', descriptores: 'Red' },
  { id: 'f6', estado: 'Active',    fecha: '27, August 2025', zona: 'Soft Palate', condicion: 'Oral Candidiasis', descriptores: 'Red' },
]

export const ZONAS = ['Uper left', 'Upper right', 'Lower left', 'Lower right']

/* Catálogo del paso 1 de New Condition. Los códigos y las descripciones son
   los del frame, repeticiones incluidas. */
export type Procedimiento = { codigo: string; nombre: string; deshabilitado?: boolean }
export const PROCEDIMIENTOS_CONDICION: Procedimiento[] = [
  { codigo: 'D0120', nombre: 'Periodic Oral Evaluation' },
  { codigo: 'D0270', nombre: 'Bitewing - Single Radiographic Image' },
  { codigo: 'D0150', nombre: 'Comprehensive Oral Evaluation - New or Established Patient', deshabilitado: true },
  { codigo: 'D0270', nombre: 'Bitewing - Single Radiographic Image' },
  { codigo: 'D0270', nombre: 'Bitewing - Single Radiographic Image' },
]

/* El frame repite veinte veces la misma placa, la misma fecha y el mismo
   profesional. Acá varían el tipo y la fecha: una grilla de veinte estudios
   idénticos no se puede leer ni ordenar. Ver anomalías. */
const TIPOS = ['Panoramic', 'Bitewing', 'Periapical', 'Cephalometric', 'Occlusal']
const FECHAS = ['27, August 2025', '14, July 2025', '02, June 2025', '19, May 2025']

export const RADIOGRAFIAS: Radiografia[] = Array.from({ length: 20 }, (_, i) => ({
  id: \`rx\${i + 1}\`,
  fecha: FECHAS[Math.floor(i / 5)] ?? FECHAS[0],
  profesional: "Dr. Thompson's",
  tipo: TIPOS[i % TIPOS.length],
}))
`})))()}export{n,i as r,r as t};