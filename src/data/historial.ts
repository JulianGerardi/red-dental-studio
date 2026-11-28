import type { EstadoNota } from '@/data/ejecucion'

/* Patient Summary de Clinical Mode (red.dev: /clinical-mode/treatment-history): los encuentros del paciente con su nota
   clínica. Columnas de CON-2731 y de la lista de red.dev; la nota sale de los eventos del encuentro (CON-2816): lo que
   no se hizo, no aparece. Ver design-reference/figma/modulos/clinical-mode.md (2026-11-27, Patient Summary). */

/** Estados del encuentro (CON-1612, CON-2955). Planned no entra: todavía no hay nada que resumir. */
export type EstadoHistorial = 'In progress' | 'On hold' | 'Discharged' | 'Completed' | 'Fulfilled' | 'Cancelled'

/** Sólo los que en ese encuentro pasaron a In progress o Completed (CON-2620). */
export type ProcedimientoHistorial = { codigo: string; nombre: string; zona?: string; estado: 'in progress' | 'completed' }
export type ExamenHistorial = { nombre: string; hallazgos: string[] }
/** Una receta activa, una orden o una derivación que salió de Pending en el encuentro (CON-2614, CON-2615, CON-2616). */
export type OrdenHistorial = { titulo: string; lineas: string[] }
export type Adenda = { autor: string; fecha: string; texto: string }

export type EncuentroHistorial = {
  id: string
  /** MM/DD/YYYY, en la zona horaria de la sede (CON-3038). */
  fecha: string
  horario: string
  zona: string
  estado: EstadoHistorial
  nota: EstadoNota
  motivo: string
  provider: string
  procedimientos: ProcedimientoHistorial[]
  examenes: ExamenHistorial[]
  derivaciones: OrdenHistorial[]
  laboratorios: OrdenHistorial[]
  recetas: OrdenHistorial[]
  vitales?: string[]
  workflows?: [nombre: string, narrativa: string][]
  /** Cerrado solo a las 48 h (CON-2937): la nota se generó sin las narrativas de los workflows. */
  automatica?: boolean
  /** Cuándo se firmó. */
  firmada?: string
  adendas?: Adenda[]
}

/** Quién está en la sesión (el de la barra de la app): sólo el provider del encuentro firma su nota (CON-3508). */
export const PROVIDER_SESION = 'Sarah Stone'

const BSAS = 'America/Argentina/Buenos_Aires'
const VITALES = ['Height 66 in, Weight 187 pounds; BMI 30.2.', 'Blood pressure: 128/82 mmHg.', 'Heart rate: 74 bpm.', 'Temperature: 98.4 °F.']
const AMOXICILINA: OrdenHistorial = {
  titulo: 'Prescription · Active',
  lineas: ['Amoxil (Amoxicillin) 500 mg capsule: 1 capsule, every 8 hours, for 7 days.', 'Indications: Take after meals.'],
}
const IBUPROFENO: OrdenHistorial = {
  titulo: 'Prescription · Active',
  lineas: ['Advil (Ibuprofen) 400 mg tablet: 1 tablet, every 6 hours, for 3 days.', 'Indications: Stop if stomach pain appears.'],
}

type Base = Pick<EncuentroHistorial, 'id' | 'fecha' | 'estado' | 'nota' | 'motivo' | 'provider'> & Partial<EncuentroHistorial>
const encuentro = (e: Base): EncuentroHistorial => ({
  horario: '09:00 AM to 09:45 AM', zona: BSAS, procedimientos: [], examenes: [], derivaciones: [], laboratorios: [], recetas: [], ...e,
})

/* Las visitas de control de años anteriores: todas cerradas y firmadas por quien atendió. */
const control = (id: string, fecha: string, firmada: string, provider: string, motivo: string, procedimientos: ProcedimientoHistorial[], extra: Partial<EncuentroHistorial> = {}) =>
  encuentro({ id, fecha, estado: 'Fulfilled', nota: 'Signed', firmada, provider, motivo, procedimientos, ...extra })

const PROFILAXIS: ProcedimientoHistorial = { codigo: 'D1110', nombre: 'Prophylaxis – adult', estado: 'completed' }
const EVALUACION: ProcedimientoHistorial = { codigo: 'D0120', nombre: 'Periodic oral evaluation – established patient', estado: 'completed' }
const PERIAPICAL: ProcedimientoHistorial = { codigo: 'D0220', nombre: 'Intraoral – periapical first radiographic image', zona: '#19', estado: 'completed' }

/** El encuentro de hoy: aparece cuando empieza y toma su estado de la barra de Clinical Mode (lib/historial). */
export const ENCUENTRO_HOY = 'enc-1127'

/** Del más nuevo al más viejo. */
export const ENCUENTROS_HISTORIAL: EncuentroHistorial[] = [
  /* En curso: la nota se puede generar las veces que haga falta, pero todavía no se firma (CON-2727, CON-2728). */
  encuentro({
    id: ENCUENTRO_HOY, fecha: '11/27/2026', horario: '10:00 AM to 10:45 AM', estado: 'In progress', nota: 'Unsigned', motivo: 'Crown prep', provider: PROVIDER_SESION,
    procedimientos: [{ codigo: 'D2750', nombre: 'Crown – porcelain fused to high noble metal', zona: '#14', estado: 'in progress' }],
    examenes: [{ nombre: 'Dental Assessment (11/27/2026):', hallazgos: ['Fractured cusp on #14/O, D [details: (Extent: Moderate)].'] }],
    laboratorios: [{ titulo: 'Olivos Laboratory · Requested', lineas: ['Work requested: Porcelain-fused-to-metal crown, shade A2.', 'Expiration date: 12/18/2026.', 'Documents sent: Yes'] }],
    vitales: VITALES,
    workflows: [['Local anesthesia', 'Infiltration with 1.7 ml of 2% lidocaine with 1:100,000 epinephrine. Aspiration negative. Patient tolerated the procedure well.']],
  }),
  /* Completed sin firmar: firmarla lo pasa a Fulfilled (CON-2727). */
  encuentro({
    id: 'enc-1120', fecha: '11/20/2026', estado: 'Completed', nota: 'Unsigned', motivo: 'Root canal follow-up', provider: PROVIDER_SESION,
    procedimientos: [{ codigo: 'D3330', nombre: 'Endodontic therapy, molar tooth', zona: '#19', estado: 'in progress' }],
    recetas: [AMOXICILINA],
    workflows: [['Rubber dam isolation', 'Tooth #19 isolated with rubber dam and clamp W8A. Seal verified before access.']],
  }),
  /* El paciente se fue antes de terminar; lo atendió otro provider. */
  encuentro({
    id: 'enc-1113', fecha: '11/13/2026', horario: '04:30 PM to 05:00 PM', estado: 'Discharged', nota: 'Unsigned', motivo: 'Emergency: tooth pain', provider: 'Dr. Elena Martinez',
    examenes: [{ nombre: 'Intraoral Examination (11/13/2026):', hallazgos: ['Gingival inflammation on Left Mandibular Gingiva [details: (Severity: Mild; Bleeding: Yes)].'] }],
    vitales: VITALES,
  }),
  /* Cerrado solo a las 48 h: la nota quedó generada, sin narrativas, a la espera de la firma (CON-2937). */
  encuentro({
    id: 'enc-1103', fecha: '11/03/2026', estado: 'Fulfilled', nota: 'Unsigned', motivo: 'Endodontic therapy', provider: PROVIDER_SESION, automatica: true,
    procedimientos: [{ codigo: 'D3330', nombre: 'Endodontic therapy, molar tooth', zona: '#19', estado: 'in progress' }, PERIAPICAL],
    examenes: [{ nombre: 'Radiographic Examination (11/03/2026):', hallazgos: ['Periapical radiolucency on #19 [details: (Size: 3 mm; Root: Mesial)]. (Consistent with chronic apical periodontitis.)'] }],
    derivaciones: [{ titulo: 'Dr. Mark Bennett · Endodontics · Requested', lineas: ['Procedures: D3330 Endodontic therapy, molar tooth · 19.', 'Notes: Please evaluate #19 before we place the crown.'] }],
  }),
  /* De otro provider: se lee con Read Clinical Note, pero sólo la firma quien atendió (CON-3508). */
  encuentro({
    id: 'enc-1027', fecha: '10/27/2026', estado: 'Fulfilled', nota: 'Unsigned', motivo: 'Treatment plan review', provider: 'Dr. Emily Chen',
    examenes: [{ nombre: 'Dental Assessment (10/27/2026):', hallazgos: ['Deep caries on #19/O, D [details: (Extent: Deep)]. (Caries close to the pulp.)'] }],
  }),
  /* Cancelado: no hubo atención, no hay nota. */
  encuentro({ id: 'enc-1020', fecha: '10/20/2026', estado: 'Cancelled', nota: 'None', motivo: 'Cleaning', provider: PROVIDER_SESION }),
  /* Firmada, con un addendum posterior (CON-2730). */
  encuentro({
    id: 'enc-1006', fecha: '10/06/2026', estado: 'Fulfilled', nota: 'Signed', firmada: 'October 6, 2026 at 10:02 AM', motivo: 'Crown prep', provider: PROVIDER_SESION,
    procedimientos: [
      { codigo: 'D2950', nombre: 'Core buildup, including any pins when required', zona: '#14', estado: 'completed' },
      { codigo: 'D2750', nombre: 'Crown – porcelain fused to high noble metal', zona: '#14', estado: 'in progress' },
      { codigo: 'D0220', nombre: 'Intraoral – periapical first radiographic image', zona: '#14', estado: 'completed' },
    ],
    examenes: [{ nombre: 'Radiographic Examination (10/06/2026):', hallazgos: ['Recurrent caries on #14 [details: (Surface: Distal)].'] }],
    laboratorios: [{ titulo: 'North Dental Lab · Requested', lineas: ['Work requested: Temporary crown for #14.', 'Expiration date: 10/20/2026.'] }],
    vitales: VITALES,
    workflows: [['Local anesthesia', 'Infiltration with 1.7 ml of 2% lidocaine with 1:100,000 epinephrine. Aspiration negative.']],
    adendas: [{ autor: PROVIDER_SESION, fecha: 'October 7, 2026 at 8:40 AM', texto: 'Patient called: the temporary crown feels high when biting. Booked a short visit to adjust the occlusion.' }],
  }),
  /* Sin permiso para leer la nota de otro provider (CON-3508, CON-4158). */
  encuentro({ id: 'enc-0922', fecha: '09/22/2026', estado: 'Fulfilled', nota: 'Restricted', motivo: 'Oral surgery consult', provider: 'Dr. Daniel Anderson' }),
  control('enc-0914', '09/14/2026', 'September 14, 2026 at 3:15 PM', PROVIDER_SESION, 'Extraction',
    [{ codigo: 'D7140', nombre: 'Extraction – erupted tooth or exposed root', zona: '#32', estado: 'completed' }],
    { horario: '02:30 PM to 03:10 PM', recetas: [AMOXICILINA, IBUPROFENO], vitales: VITALES, examenes: [{ nombre: 'Intraoral Examination (09/14/2026):', hallazgos: ['Pericoronitis on Right Mandibular Gingiva [details: (Severity: Moderate)].'] }] }),
  control('enc-0901', '09/01/2026', 'September 1, 2026 at 11:40 AM', 'Dr. Elena Martinez', 'Denture impression',
    [{ codigo: 'D5110', nombre: 'Complete denture – maxillary', zona: 'Upper arch', estado: 'in progress' }],
    { laboratorios: [{ titulo: 'Smile Lab Studio · Requested', lineas: ['Work requested: Custom tray and bite rim, maxillary.', 'Expiration date: 09/15/2026.', 'Documents sent: Yes'] }] }),
  control('enc-0825', '08/25/2026', 'August 25, 2026 at 9:50 AM', PROVIDER_SESION, 'Filling',
    [{ codigo: 'D2140', nombre: 'Amalgam – one surface, primary or permanent', zona: '#30/O', estado: 'completed' }, { ...PERIAPICAL, zona: '#30' }],
    { examenes: [{ nombre: 'Dental Assessment (08/25/2026):', hallazgos: ['Caries on #30/O [details: (Extent: Moderate)].'] }] }),
  control('enc-0805', '08/05/2026', 'August 5, 2026 at 10:05 AM', PROVIDER_SESION, 'Cleaning', [PROFILAXIS, EVALUACION],
    { examenes: [{ nombre: 'Periodontal Examination (08/05/2026):', hallazgos: ['Probing depth on #19 B: +5 mm.', 'Bleeding on probing on #19 B.'] }], vitales: VITALES }),
  control('enc-0612', '06/12/2026', 'June 12, 2026 at 4:20 PM', 'Dr. Emily Chen', 'Sensitivity check', [],
    { zona: 'Europe/Berlin', examenes: [{ nombre: 'Dental Assessment (06/12/2026):', hallazgos: ['Gingival recession on #6/B [details: (Extent: 2 mm)].'] }] }),
  encuentro({ id: 'enc-0518', fecha: '05/18/2026', estado: 'Cancelled', nota: 'None', motivo: 'Cleaning', provider: 'Dr. Elena Martinez' }),
  control('enc-0407', '04/07/2026', 'April 7, 2026 at 12:10 PM', PROVIDER_SESION, 'Night guard delivery',
    [{ codigo: 'D9944', nombre: 'Occlusal guard – hard appliance, full arch', zona: 'Upper arch', estado: 'completed' }]),
  control('enc-0316', '03/16/2026', 'March 16, 2026 at 9:55 AM', PROVIDER_SESION, 'Night guard impression',
    [{ codigo: 'D9944', nombre: 'Occlusal guard – hard appliance, full arch', zona: 'Upper arch', estado: 'in progress' }],
    { laboratorios: [{ titulo: 'Olivos Laboratory · Requested', lineas: ['Work requested: Hard occlusal guard, maxillary.', 'Expiration date: 04/06/2026.'] }] }),
  control('enc-0203', '02/03/2026', 'February 3, 2026 at 10:00 AM', PROVIDER_SESION, 'Cleaning', [PROFILAXIS, EVALUACION], { vitales: VITALES }),
  control('enc-1118-25', '11/18/2025', 'November 18, 2025 at 3:30 PM', 'Dr. Elena Martinez', 'Sealant',
    [{ codigo: 'D1351', nombre: 'Sealant – per tooth', zona: '#13', estado: 'completed' }]),
  control('enc-0902-25', '09/02/2025', 'September 2, 2025 at 11:15 AM', PROVIDER_SESION, 'Whitening consult', [],
    { examenes: [{ nombre: 'Dental Assessment (09/02/2025):', hallazgos: ['Extrinsic staining on #8/B, #9/B.'] }] }),
  control('enc-0805-25', '08/05/2025', 'August 5, 2025 at 10:10 AM', PROVIDER_SESION, 'Cleaning', [PROFILAXIS, EVALUACION]),
  control('enc-0520-25', '05/20/2025', 'May 20, 2025 at 5:05 PM', 'Dr. Emily Chen', 'Filling',
    [{ codigo: 'D2391', nombre: 'Resin-based composite – one surface, posterior', zona: '#3/O', estado: 'completed' }],
    { derivaciones: [{ titulo: 'Dr. Laura Kim · Orthodontics · Requested', lineas: ['Notes: Evaluate crowding in the lower anterior teeth.'] }] }),
  control('enc-0211-25', '02/11/2025', 'February 11, 2025 at 9:45 AM', PROVIDER_SESION, 'Cleaning', [PROFILAXIS, EVALUACION], { vitales: VITALES }),
  control('enc-0114-25', '01/14/2025', 'January 14, 2025 at 2:20 PM', PROVIDER_SESION, 'New patient exam',
    [{ codigo: 'D0150', nombre: 'Comprehensive oral evaluation – new or established patient', estado: 'completed' }, { codigo: 'D0210', nombre: 'Intraoral – comprehensive series of radiographic images', estado: 'completed' }],
    { vitales: VITALES, examenes: [{ nombre: 'Radiographic Examination (01/14/2025):', hallazgos: ['Impacted third molar on #32 [details: (Position: Mesioangular)].'] }] }),
]
