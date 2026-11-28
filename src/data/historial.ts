import type { EstadoNota } from '@/data/ejecucion'
import type { Datos } from '@/pdfs/marco'

/* Patient Summary de Clinical Mode (red.dev: /clinical-mode/treatment-history): los encuentros del paciente con su nota
   clínica. Columnas de CON-2731 y de la lista de red.dev. Lo que pasó en cada encuentro va con las variables de la
   plantilla Clinical note (src/pdfs): de ahí salen la nota, su PDF y las columnas de la tabla; lo que no se hizo, no
   aparece (CON-2975). Ver design-reference/figma/modulos/clinical-mode.md (2026-11-27, Patient Summary). */

/** Estados del encuentro (CON-1612, CON-2955). Planned no entra: todavía no hay nada que resumir. */
export type EstadoHistorial = 'In progress' | 'On hold' | 'Discharged' | 'Completed' | 'Fulfilled' | 'Cancelled'

/** Los procedimientos del encuentro que muestra la columna Procedures (en la nota van dentro de la orden o el caso). */
export type ProcedimientoHistorial = { code: string; description: string; location: string; status: 'in progress' | 'completed' }
export type Adenda = { author: string; created_at: string; text: string; signed_date: string }

/** Lo que pasó en el encuentro, con los nombres de variable de la plantilla Clinical note (src/pdfs). */
export type EventosHistorial = {
  /** Review of Systems: system, negative, positive. */
  ros: Datos[]
  /** measurement y value. */
  vitals: Datos[]
  /** Physical Examination: area, positive, term, note. */
  physical: Datos[]
  /** finding, location, details. */
  extraoral_findings: Datos[]
  intraoral_findings: Datos[]
  /** Dental Assessment, Radiographic y Periodontal, con los textos de CON-2975. */
  dental_assessment_findings: Datos[]
  radiographic_exams: Datos[]
  periodontal_exams: Datos[]
  /** Recetas que pasaron a Active (CON-2615): medications, indications, documents_sent. */
  prescriptions: Datos[]
  /** Órdenes y derivaciones que salieron de Pending (CON-2614, CON-2616). */
  lab_orders: Datos[]
  referrals: Datos[]
}

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
  eventos: EventosHistorial
  /** Cerrado solo a las 48 h (CON-2937). */
  automatica?: boolean
  /** Cuándo se firmó. */
  firmada?: string
  adendas?: Adenda[]
}

/** Quién está en la sesión (el de la barra de la app): sólo el provider del encuentro firma su nota (CON-3508). */
export const PROVIDER_SESION = 'Sarah Stone'

/** El encuentro de hoy: aparece cuando empieza y toma su estado de la barra de Clinical Mode (lib/historial). */
export const ENCUENTRO_HOY = 'enc-1127'

/* La historia médica es del paciente, no del encuentro: va igual en todas sus notas, como en red.dev. */
export const HISTORIA_PACIENTE: Datos = {
  past_medical_conditions: [{ name: 'Hypertension', status: 'Active', start_date: '03/15/2019', notes: 'Controlled with medication.' }],
  current_medications: [{ name: 'Lisinopril', dose: '10', unit: 'mg', frequency: 'once daily', status: 'Active', start_date: '03/15/2019', notes: '' }],
  known_allergies: [{ allergen: 'latex', start_date: '01/01/2015', notes: 'Use nitrile gloves.', reactions: [{ category: 'Dermatological', symptom: 'Skin rash' }], severity: 'Mild' }],
  past_surgeries: [{ name: 'Appendectomy', date: '06/10/2012' }],
}

const BSAS = 'America/Argentina/Buenos_Aires'
const vitales = (peso = '187 lbs'): Datos[] => [{ measurement: 'Height', value: '66 in' }, { measurement: 'Weight', value: peso }, { measurement: 'BMI', value: '30.2' }]
const hallazgo = (finding: string, location: string, details = ''): Datos => ({ finding, location, details })
const conNota = (finding: string, location: string, details = '', note = ''): Datos => ({ finding, location, details, note })
const radiografia = (exam_date: string, ...findings: Datos[]): Datos => ({ exam_date, no_findings: false, has_findings: true, reviewed: false, review_note: '', findings })
const proc = (code: string, description: string, location: string, status: ProcedimientoHistorial['status'] = 'completed'): ProcedimientoHistorial => ({ code, description, location, status })
const medicacion = (drug: string, strength: string, dose: string, frequency: string, duration: string, dosage_form: string): Datos => ({ drug, strength, dose, frequency, duration, dosage_form })
const receta = (indications: string, ...medications: Datos[]): Datos => ({ documents_sent: 'No', indications, medications })
const orden = (laboratory: string, work_requested: string, expected_return: string, kase: string, description: string, tooth: string, documents_sent = 'No'): Datos =>
  ({ laboratory, work_requested, case: kase, special_instructions: '', documents_sent, expected_return, lab_treatments: [{ description, tooth }] })

const AMOXICILINA = medicacion('Amoxicillin', '500 mg', '1 capsule', 'every 8 hours', '7 days', 'capsule')
const IBUPROFENO = medicacion('Ibuprofen', '400 mg', '1 tablet', 'every 6 hours', '3 days', 'tablet')
const ROS_GENERAL: Datos = { system: 'General', negative: 'Fever, chills', positive: '-' }

const SIN_EVENTOS: EventosHistorial = {
  ros: [], vitals: [], physical: [], extraoral_findings: [], intraoral_findings: [],
  dental_assessment_findings: [], radiographic_exams: [], periodontal_exams: [],
  prescriptions: [], lab_orders: [], referrals: [],
}

type Base = Pick<EncuentroHistorial, 'id' | 'fecha' | 'estado' | 'nota' | 'motivo' | 'provider'> & Partial<Omit<EncuentroHistorial, 'eventos'>> & { eventos?: Partial<EventosHistorial> }
const encuentro = ({ eventos, ...e }: Base): EncuentroHistorial => ({ horario: '09:00 AM to 09:45 AM', zona: BSAS, procedimientos: [], ...e, eventos: { ...SIN_EVENTOS, ...eventos } })

/* Las visitas anteriores: todas cerradas y firmadas por quien atendió. */
const control = (id: string, fecha: string, firmada: string, provider: string, motivo: string, procedimientos: ProcedimientoHistorial[], eventos: Partial<EventosHistorial> = {}, extra: Partial<Omit<EncuentroHistorial, 'eventos'>> = {}) =>
  encuentro({ id, fecha, estado: 'Fulfilled', nota: 'Signed', firmada, provider, motivo, procedimientos, eventos, ...extra })

const PROFILAXIS = proc('D1110', 'Prophylaxis – adult', '')
const EVALUACION = proc('D0120', 'Periodic oral evaluation – established patient', '')

/** Del más nuevo al más viejo. */
export const ENCUENTROS_HISTORIAL: EncuentroHistorial[] = [
  /* En curso: la nota se puede generar las veces que haga falta, pero todavía no se firma (CON-2727, CON-2728). */
  encuentro({
    id: ENCUENTRO_HOY, fecha: '11/27/2026', horario: '10:00 AM to 10:45 AM', estado: 'In progress', nota: 'Unsigned', motivo: 'Crown prep', provider: PROVIDER_SESION,
    procedimientos: [proc('D2750', 'Crown – porcelain fused to high noble metal', '#14', 'in progress')],
    eventos: {
      vitals: vitales(),
      dental_assessment_findings: [conNota('Fractured cusp', '#14/O, D', 'Extent: Moderate')],
      lab_orders: [orden('Olivos Laboratory', 'Porcelain-fused-to-metal crown, shade A2.', '2026-12-18', 'Restorative plan', 'Crown – porcelain fused to high noble metal', '14', 'Yes')],
    },
  }),
  /* Completed sin firmar: firmarla lo pasa a Fulfilled (CON-2727). */
  encuentro({
    id: 'enc-1120', fecha: '11/20/2026', estado: 'Completed', nota: 'Unsigned', motivo: 'Root canal follow-up', provider: PROVIDER_SESION,
    procedimientos: [proc('D3330', 'Endodontic therapy, molar tooth', '#19', 'in progress')],
    eventos: { prescriptions: [receta('Take after meals.', AMOXICILINA)] },
  }),
  /* El paciente se fue antes de terminar; lo atendió otro provider. Como la nota más completa de red.dev. */
  encuentro({
    id: 'enc-1113', fecha: '11/13/2026', horario: '04:30 PM to 05:00 PM', estado: 'Discharged', nota: 'Unsigned', motivo: 'Emergency: tooth pain', provider: 'Dr. Elena Martinez',
    eventos: {
      ros: [{ system: 'General', negative: '-', positive: 'Abnormal weight gain (since the last visit)' }],
      vitals: vitales('192 lbs'),
      physical: [{ area: 'General Appearance', positive: true, term: 'generally unwell', note: 'tired, poor sleep' }, { area: 'Neck', positive: false, term: 'tenderness of neck', note: '' }],
      extraoral_findings: [hallazgo('Abscess (morphologic abnormality)', 'Left Submandibular Area', 'symmetry: unilateral; size: small (e.g., 0.5 cm)')],
      intraoral_findings: [hallazgo('Gingival inflammation', 'Left Mandibular Gingiva', 'severity: mild; bleeding: yes')],
      prescriptions: [receta('', IBUPROFENO)],
    },
  }),
  /* Cerrado solo a las 48 h: la nota quedó generada, a la espera de la firma (CON-2937). */
  encuentro({
    id: 'enc-1103', fecha: '11/03/2026', estado: 'Fulfilled', nota: 'Unsigned', motivo: 'Endodontic therapy', provider: PROVIDER_SESION, automatica: true,
    procedimientos: [proc('D3330', 'Endodontic therapy, molar tooth', '#19', 'in progress'), proc('D0220', 'Intraoral – periapical first radiographic image', '#19')],
    eventos: {
      radiographic_exams: [radiografia('11/03/2026', conNota('Periapical radiolucency', '#19', 'Size: 3 mm; Root: Mesial', 'Consistent with chronic apical periodontitis.'))],
      referrals: [{ referral: 'Dr. Mark Bennett', specialties: 'Endodontics', notes: 'Please evaluate #19 before we place the crown.', documents_sent: 'Yes', referral_procedures: [{ description: 'Endodontic therapy, molar tooth', tooth: '19' }] }],
    },
  }),
  /* De otro provider: se lee con Read Clinical Note, pero sólo la firma quien atendió (CON-3508). */
  encuentro({
    id: 'enc-1027', fecha: '10/27/2026', estado: 'Fulfilled', nota: 'Unsigned', motivo: 'Treatment plan review', provider: 'Dr. Emily Chen',
    eventos: { dental_assessment_findings: [conNota('Deep caries', '#19/O, D', 'Extent: Deep', 'Caries close to the pulp.')] },
  }),
  /* Cancelado: la lista dice Unsigned, como red.dev; el ojo abre el error de red.dev. */
  encuentro({ id: 'enc-1020', fecha: '10/20/2026', estado: 'Cancelled', nota: 'Unsigned', motivo: 'Cleaning', provider: PROVIDER_SESION }),
  /* Firmada, con un addendum posterior (CON-2730). */
  encuentro({
    id: 'enc-1006', fecha: '10/06/2026', estado: 'Fulfilled', nota: 'Signed', firmada: 'October 6, 2026', motivo: 'Crown prep', provider: PROVIDER_SESION,
    procedimientos: [
      proc('D2950', 'Core buildup, including any pins when required', '#14'),
      proc('D2750', 'Crown – porcelain fused to high noble metal', '#14', 'in progress'),
      proc('D0220', 'Intraoral – periapical first radiographic image', '#14'),
    ],
    eventos: {
      ros: [ROS_GENERAL],
      vitals: vitales(),
      intraoral_findings: [hallazgo('Recurrent caries', '#14', 'surface: distal')],
      radiographic_exams: [radiografia('10/06/2026', conNota('Recurrent caries', '#14', 'Surface: Distal'))],
      lab_orders: [orden('North Dental Lab', 'Temporary crown.', '2026-10-20', 'Restorative plan', 'Crown – porcelain fused to high noble metal', '14')],
    },
    adendas: [{ author: PROVIDER_SESION, created_at: 'October 7, 2026 at 8:40 AM', text: 'Patient called: the temporary crown feels high when biting. Booked a short visit to adjust the occlusion.', signed_date: 'October 7, 2026' }],
  }),
  /* Sin permiso para leer la nota de otro provider (CON-3508, CON-4158). */
  encuentro({ id: 'enc-0922', fecha: '09/22/2026', estado: 'Fulfilled', nota: 'Restricted', motivo: 'Oral surgery consult', provider: 'Dr. Daniel Anderson' }),
  control('enc-0914', '09/14/2026', 'September 14, 2026', PROVIDER_SESION, 'Extraction', [proc('D7140', 'Extraction – erupted tooth or exposed root', '#32')], {
    vitals: vitales(),
    intraoral_findings: [hallazgo('Pericoronitis', 'Right Mandibular Gingiva', 'severity: moderate')],
    prescriptions: [receta('Take after meals. Stop ibuprofen if stomach pain appears.', AMOXICILINA, IBUPROFENO)],
  }, { horario: '02:30 PM to 03:10 PM' }),
  control('enc-0901', '09/01/2026', 'September 1, 2026', 'Dr. Elena Martinez', 'Denture impression', [proc('D5110', 'Complete denture – maxillary', 'Upper arch', 'in progress')], {
    lab_orders: [orden('Smile Lab Studio', 'Custom tray and bite rim, maxillary.', '2026-09-15', 'Denture plan', 'Complete denture – maxillary', '', 'Yes')],
  }),
  control('enc-0825', '08/25/2026', 'August 25, 2026', PROVIDER_SESION, 'Filling', [proc('D2140', 'Amalgam – one surface, primary or permanent', '#30/O'), proc('D0220', 'Intraoral – periapical first radiographic image', '#30')], {
    dental_assessment_findings: [conNota('Caries', '#30/O', 'Extent: Moderate')],
  }),
  /* Sólo los signos vitales, como la de Andy Davis en red.dev: Exams en la nota y tilde en la columna. */
  control('enc-0812', '08/12/2026', 'August 12, 2026', 'Dr. Andy Davis', 'Extraction', [], { vitals: [{ measurement: 'Weight', value: '186 lbs' }] }),
  control('enc-0805', '08/05/2026', 'August 5, 2026', PROVIDER_SESION, 'Cleaning', [PROFILAXIS, EVALUACION], {
    vitals: vitales(),
    periodontal_exams: [{
      exam_date: '08/05/2026', reviewed: false, new_charting: true,
      has_probing_depths: true, probing_depths: [{ tooth: '19', surface: 'B', value: '5' }],
      has_gingival_margin: false, has_recession: false, recession: [], has_overgrowth: false, overgrowth: [],
      has_bleeding: true, bleeding: [{ tooth: '19', surface: 'B' }], has_suppuration: false, suppuration: [],
    }],
  }),
  control('enc-0612', '06/12/2026', 'June 12, 2026', 'Dr. Emily Chen', 'Sensitivity check', [], {
    ros: [ROS_GENERAL],
    dental_assessment_findings: [conNota('Gingival recession', '#6/B', 'Extent: 2 mm')],
  }, { zona: 'Europe/Berlin' }),
  encuentro({ id: 'enc-0518', fecha: '05/18/2026', estado: 'Cancelled', nota: 'Unsigned', motivo: 'Cleaning', provider: 'Dr. Elena Martinez' }),
  control('enc-0407', '04/07/2026', 'April 7, 2026', PROVIDER_SESION, 'Night guard delivery', [proc('D9944', 'Occlusal guard – hard appliance, full arch', 'Upper arch')]),
  control('enc-0316', '03/16/2026', 'March 16, 2026', PROVIDER_SESION, 'Night guard impression', [proc('D9944', 'Occlusal guard – hard appliance, full arch', 'Upper arch', 'in progress')], {
    lab_orders: [orden('Olivos Laboratory', 'Hard occlusal guard, maxillary.', '2026-04-06', 'Night guard', 'Occlusal guard – hard appliance, full arch', '')],
  }),
  control('enc-0203', '02/03/2026', 'February 3, 2026', PROVIDER_SESION, 'Cleaning', [PROFILAXIS, EVALUACION], { vitals: vitales() }),
  control('enc-1118-25', '11/18/2025', 'November 18, 2025', 'Dr. Elena Martinez', 'Sealant', [proc('D1351', 'Sealant – per tooth', '#13')]),
  control('enc-0902-25', '09/02/2025', 'September 2, 2025', PROVIDER_SESION, 'Whitening consult', [], {
    intraoral_findings: [hallazgo('Extrinsic staining', '#8/B, #9/B')],
  }),
  control('enc-0805-25', '08/05/2025', 'August 5, 2025', PROVIDER_SESION, 'Cleaning', [PROFILAXIS, EVALUACION]),
  control('enc-0520-25', '05/20/2025', 'May 20, 2025', 'Dr. Emily Chen', 'Filling', [proc('D2391', 'Resin-based composite – one surface, posterior', '#3/O')], {
    referrals: [{ referral: 'Dr. Laura Kim', specialties: 'Orthodontics', notes: 'Evaluate crowding in the lower anterior teeth.', documents_sent: 'No', referral_procedures: [] }],
  }),
  control('enc-0211-25', '02/11/2025', 'February 11, 2025', PROVIDER_SESION, 'Cleaning', [PROFILAXIS, EVALUACION], { vitals: vitales() }),
  control('enc-0114-25', '01/14/2025', 'January 14, 2025', PROVIDER_SESION, 'New patient exam', [proc('D0150', 'Comprehensive oral evaluation – new or established patient', ''), proc('D0210', 'Intraoral – comprehensive series of radiographic images', '')], {
    ros: [ROS_GENERAL],
    vitals: vitales(),
    radiographic_exams: [radiografia('01/14/2025', conNota('Impacted third molar', '#32', 'Position: Mesioangular'))],
  }),
]
