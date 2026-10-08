import { CASOS, type EstadoCaso } from '@/data/treatment-plan'
/* Clinical Mode — la barra, las pestañas y el overview salen de **4235:135661**,
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

/* Las pestañas son los exámenes; el botón "Exams" despliega los registros, en el orden de la app real (2026-10-05).
   Overview dejó de ser pestaña: vive en la barra de arriba. */
export const EXAMENES = [
  'Ros', 'BMI', 'Vitals', 'Physical', 'ATM/O-F',
  'Intra Oral', 'Extra Oral', 'DentAssmt', 'Periodontal', 'Radiography',
] as const
export const REGISTROS = [
  'Treatment Plan', 'Treatment', 'Patient Summary', 'Lab Order', 'Prescription', 'Referral',
] as const
export type Pestana = (typeof EXAMENES)[number] | (typeof REGISTROS)[number]

/* Las cards de Treatment Plan del Overview salen de los casos del paciente (los descartados no se muestran), como en
   red.dev: profesional, nombre y estado del caso, grupo, total, fecha de creación y avance. */
export type Plan = {
  id: string
  doctor: string
  rol: string
  nombre: string
  grupo: string
  estado: EstadoCaso
  total: string
  creado: string
  procedimientos: number
  completados: number
}

const DOCTORES = ['Daniel Anderson', 'Perez Martinez', 'Michael Johnson']
export const PLANES: Plan[] = CASOS.filter((c) => c.estado !== 'Discarded').map((c, i) => {
  const procs = c.visitas.flatMap((v) => v.procedimientos).filter((p) => p.estado !== 'Removed')
  return {
    id: c.id, doctor: DOCTORES[i % DOCTORES.length], rol: 'Dentist', nombre: c.nombre, grupo: c.grupo, estado: c.estado,
    total: `$${c.total}`, creado: c.creado, procedimientos: procs.length, completados: procs.filter((p) => p.estado === 'Completed').length,
  }
})

/* La tabla del Overview, como en red.dev: dos pestañas (Problem List y Procedures), cada una con sus estados, su filtro y
   las acciones del menú de cada fila. Ver design-reference/figma/modulos/clinical-mode.md. */
export const ESTADOS_PROBLEMA = [
  'Active', 'Clinic declined', 'Discarded', 'Externally treated', 'In treatment', 'Monitoring', 'No treatment needed', 'Patient declined', 'Referred', 'Treated',
] as const
export type EstadoProblema = (typeof ESTADOS_PROBLEMA)[number]

export type Problema = {
  id: string
  fecha: string
  ubicacion: string
  pieza?: number
  superficie: string
  condicion: string
  examen: string
  proveedor: string
  nota?: string
  estado: EstadoProblema
}

export const PROBLEMAS: Problema[] = [
  { id: 'p1', fecha: '20/08/2026', ubicacion: 'Soft Palate', superficie: '-', condicion: 'Abscess (morphologic abnormality)', examen: 'Intraoral', proveedor: 'Perez Martinez', estado: 'Active' },
  { id: 'p2', fecha: '20/08/2026', ubicacion: 'Right Temple Area', superficie: '-', condicion: 'Abscess (morphologic abnormality)', examen: 'Extraoral', proveedor: 'Perez Martinez', estado: 'Active' },
  { id: 'p3', fecha: '20/08/2026', ubicacion: '-', superficie: '-', condicion: 'Generally unwell', examen: 'Physical', proveedor: 'Perez Martinez', nota: 'Reports fatigue for the last week; no fever.', estado: 'Active' },
  { id: 'p4', fecha: '20/08/2026', ubicacion: '-', superficie: '-', condicion: 'Abnormal weight gain', examen: 'ROS', proveedor: 'Perez Martinez', nota: 'Gained 6 kg in three months; refer to physician.', estado: 'Active' },
  { id: 'p5', fecha: '14/08/2026', ubicacion: '-', pieza: 3, superficie: 'O', condicion: 'Chronic enamel dental caries', examen: 'Dental Assessment', proveedor: 'Perez Martinez', nota: 'Deep lesion, monitor after restoration.', estado: 'In treatment' },
  { id: 'p6', fecha: '14/08/2026', ubicacion: '-', pieza: 14, superficie: 'O, D', condicion: 'Chronic enamel dental caries', examen: 'Dental Assessment', proveedor: 'Perez Martinez', nota: 'Occlusal decay detected on routine exam.', estado: 'Active' },
  { id: 'p7', fecha: '02/08/2026', ubicacion: '-', pieza: 22, superficie: 'L', condicion: 'Dental calculus', examen: 'Periodontal', proveedor: 'Michael Johnson', nota: 'Subgingival calculus, scaling scheduled.', estado: 'Active' },
  { id: 'p8', fecha: '28/07/2026', ubicacion: '-', pieza: 8, superficie: 'B', condicion: 'Abrasion of teeth', examen: 'Extraoral', proveedor: 'Michael Johnson', nota: 'Cervical abrasion from brushing technique.', estado: 'Monitoring' },
  { id: 'p9', fecha: '19/07/2026', ubicacion: '-', pieza: 19, superficie: 'D, L', condicion: 'Recurrent caries', examen: 'Intraoral', proveedor: 'Perez Martinez', estado: 'Treated' },
  { id: 'p10', fecha: '05/07/2026', ubicacion: '-', pieza: 30, superficie: 'M, L', condicion: 'Fractured restoration', examen: 'Dental Assessment', proveedor: 'Perez Martinez', estado: 'Externally treated' },
  { id: 'p11', fecha: '21/06/2026', ubicacion: 'Lower Lip', superficie: '-', condicion: 'Mucocele', examen: 'Intraoral', proveedor: 'Michael Johnson', estado: 'Referred' },
  { id: 'p12', fecha: '10/06/2026', ubicacion: '-', pieza: 1, superficie: '-', condicion: 'Impacted third molar', examen: 'Radiography', proveedor: 'Perez Martinez', nota: 'Patient prefers to wait until symptoms appear.', estado: 'Patient declined' },
  { id: 'p13', fecha: '02/06/2026', ubicacion: '-', pieza: 9, superficie: 'I', condicion: 'Enamel hypoplasia', examen: 'Dental Assessment', proveedor: 'Michael Johnson', estado: 'No treatment needed' },
  { id: 'p14', fecha: '15/05/2026', ubicacion: '-', pieza: 12, superficie: '-', condicion: 'Gingival recession', examen: 'Periodontal', proveedor: 'Perez Martinez', estado: 'Discarded' },
]

export const ESTADOS_PROCEDIMIENTO = ['Completed', 'Discarded', 'Discontinued', 'In progress', 'Planned', 'Referred'] as const
export type EstadoProcedimiento = (typeof ESTADOS_PROCEDIMIENTO)[number]

export type ProcedimientoPaciente = {
  id: string
  fecha: string
  ubicacion: string
  pieza?: number
  superficie: string
  codigo: string
  nombre: string
  proveedor: string
  nota?: string
  estado: EstadoProcedimiento
}

export const PROCEDIMIENTOS: ProcedimientoPaciente[] = [
  { id: 'pr1', fecha: '14/09/2026', ubicacion: '', pieza: 7, superficie: '-', codigo: 'D0220', nombre: 'Intraoral – periapical first radiographic image', proveedor: 'Perez Martinez', estado: 'In progress' },
  { id: 'pr2', fecha: '25/08/2026', ubicacion: '', pieza: 30, superficie: 'B, M', codigo: 'D2140', nombre: 'Amalgam – one surface, primary or permanent', proveedor: 'Michael Johnson', nota: 'Patient asked to postpone; replaced by a composite plan.', estado: 'Discarded' },
  { id: 'pr3', fecha: '25/08/2026', ubicacion: '', pieza: 31, superficie: 'B, D, M', codigo: 'D2140', nombre: 'Amalgam – one surface, primary or permanent', proveedor: 'Michael Johnson', estado: 'In progress' },
  { id: 'pr4', fecha: '14/06/2026', ubicacion: '', pieza: 16, superficie: '-', codigo: 'D7140', nombre: 'Extraction – erupted tooth or exposed root (elevation and/or forceps removal)', proveedor: 'Perez Martinez', estado: 'In progress' },
  { id: 'pr5', fecha: '15/05/2026', ubicacion: 'Soft Palate', superficie: '-', codigo: 'D7286', nombre: 'Incisional biopsy of oral tissue – soft', proveedor: 'Perez Martinez', estado: 'Discarded' },
  { id: 'pr6', fecha: '02/05/2026', ubicacion: '', pieza: 3, superficie: 'O', codigo: 'D2391', nombre: 'Resin-based composite – one surface, posterior', proveedor: 'Perez Martinez', estado: 'Planned' },
  { id: 'pr7', fecha: '02/05/2026', ubicacion: '', pieza: 14, superficie: 'O, D', codigo: 'D2392', nombre: 'Resin-based composite – two surfaces, posterior', proveedor: 'Perez Martinez', estado: 'Planned' },
  { id: 'pr8', fecha: '18/04/2026', ubicacion: '', superficie: '-', codigo: 'D1110', nombre: 'Prophylaxis – adult', proveedor: 'Michael Johnson', nota: 'Light calculus on lower anteriors.', estado: 'Completed' },
  { id: 'pr9', fecha: '18/04/2026', ubicacion: '', superficie: '-', codigo: 'D0120', nombre: 'Periodic oral evaluation – established patient', proveedor: 'Michael Johnson', estado: 'Completed' },
  { id: 'pr10', fecha: '03/03/2026', ubicacion: '', pieza: 19, superficie: '-', codigo: 'D3330', nombre: 'Endodontic therapy, molar tooth', proveedor: 'Perez Martinez', estado: 'Referred' },
  { id: 'pr11', fecha: '12/02/2026', ubicacion: 'Upper Arch', superficie: '-', codigo: 'D4341', nombre: 'Periodontal scaling and root planing – four or more teeth per quadrant', proveedor: 'Michael Johnson', estado: 'Discontinued' },
]

/* Lo que cuelga de cada registro, para el detalle desplegable de la tabla (2026-10-08): el caso de Treatment Plan y el
   procedimiento del caso que le corresponde (de ahí salen la visita, el turno y el consentimiento), los hallazgos que
   resuelve, las órdenes de laboratorio y las derivaciones. Los problemas toman lo de sus procedimientos; sólo las
   derivaciones pueden ser del problema mismo. Ver clinical-mode.md. */
export type EstadoDerivacion = 'Requested' | 'Accepted' | 'Scheduled' | 'Completed' | 'Declined'
export type OrdenVinculada = { id: string; laboratorio: string; trabajo: string; pedida: string; estado: EstadoOrden }
export type Derivacion = { id: string; a: string; especialidad: string; pedida: string; estado: EstadoDerivacion }
export type VinculoProcedimiento = {
  caso?: { id: string; procedimiento: string }
  problemas?: string[]
  ordenes?: OrdenVinculada[]
  derivaciones?: Derivacion[]
}

export const VINCULOS_PROCEDIMIENTO: Record<string, VinculoProcedimiento> = {
  pr2: { problemas: ['p10'] },
  pr4: {
    caso: { id: 'c7', procedimiento: 'c7v1p1' },
    ordenes: [{ id: 'lo-b1', laboratorio: 'Dental laboratory', trabajo: 'Bridge framework', pedida: 'Apr 20, 2026', estado: 'Requested' }],
  },
  pr5: {
    problemas: ['p1'],
    ordenes: [{ id: 'lo-p1', laboratorio: 'Oral pathology lab', trabajo: 'Biopsy analysis', pedida: 'May 15, 2026', estado: 'Canceled' }],
    derivaciones: [{ id: 'rf-2', a: 'Dr. Omar Haddad', especialidad: 'Oral Surgery', pedida: 'May 15, 2026', estado: 'Declined' }],
  },
  pr6: { caso: { id: 'c3', procedimiento: 'c3v1p1' }, problemas: ['p5'] },
  pr7: { caso: { id: 'c3', procedimiento: 'c3v1p2' }, problemas: ['p6'] },
  pr10: {
    caso: { id: 'c5', procedimiento: 'c5v2p1' },
    problemas: ['p9'],
    derivaciones: [{ id: 'rf-1', a: 'Dr. Laura Chen', especialidad: 'Endodontics', pedida: 'Mar 03, 2026', estado: 'Accepted' }],
  },
  /* Se discontinuó y vuelve a planearse en el plan periodontal, que todavía está en Planning: sin turno ni consentimiento. */
  pr11: { caso: { id: 'c1', procedimiento: 'c1v2p1' } },
}

export const DERIVACIONES_PROBLEMA: Record<string, Derivacion[]> = {
  p11: [{ id: 'rf-3', a: 'Dr. Omar Haddad', especialidad: 'Oral Surgery', pedida: 'Jun 21, 2026', estado: 'Scheduled' }],
}

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
  id: `rx${i + 1}`,
  fecha: FECHAS[Math.floor(i / 5)] ?? FECHAS[0],
  profesional: "Dr. Thompson's",
  tipo: TIPOS[i % TIPOS.length],
}))
