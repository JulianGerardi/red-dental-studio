import type { EstadoNota } from '@/data/ejecucion'
import type { Datos } from '@/pdfs/marco'

/* Patient Summary de Clinical Mode (red.dev: /clinical-mode/treatment-history): los encuentros del paciente con su nota
   clínica. Columnas de CON-2731 y de la lista de red.dev. Lo que pasó en cada encuentro va con las variables de la
   plantilla Clinical note (src/pdfs): de ahí salen la nota, su PDF y las columnas de la tabla; lo que no se hizo, no
   aparece (CON-2975). Ver design-reference/figma/modulos/clinical-mode.md (2026-11-27, Patient Summary). */

/** Estados del encuentro (CON-1612, CON-2955). Planned no entra: todavía no hay nada que resumir. */
export type EstadoHistorial = 'In progress' | 'On hold' | 'Discharged' | 'Completed' | 'Fulfilled' | 'Cancelled'

/** Sólo los que en ese encuentro pasaron a In progress o Completed (CON-2620). */
export type ProcedimientoHistorial = { code: string; description: string; location: string; status: 'in progress' | 'completed' }
export type Adenda = { author: string; created_at: string; text: string; signed_date: string }

/** Los eventos del encuentro (CON-2816), con los nombres de la plantilla. */
export type EventosHistorial = {
  /** height_in, weight_lb, bmi, blood_pressure… */
  vitals?: Datos
  /** Chief Complaint y Triage del encuentro: name y narrative (CON-3605). */
  encounter_questionnaires: Datos[]
  /** Intraoral y Extraoral: exam_name, exam_date y findings. */
  exams: Datos[]
  dental_assessment_findings: Datos[]
  radiographic_exams: Datos[]
  periodontal_exams: Datos[]
  /** Se presentó o se decidió un plan en la visita. */
  treatment_plan?: Datos
  procedures: ProcedimientoHistorial[]
  /** workflow_name y narrative; sólo los confirmados (CON-2621). */
  workflows: Datos[]
  /** Recetas que pasaron a Active (CON-2615). */
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
  eventos: EventosHistorial
  /** Cerrado solo a las 48 h (CON-2937): la nota se generó sin las narrativas de los workflows. */
  automatica?: boolean
  /** Cuándo se firmó. */
  firmada?: string
  adendas?: Adenda[]
}

/** Quién está en la sesión (el de la barra de la app): sólo el provider del encuentro firma su nota (CON-3508). */
export const PROVIDER_SESION = 'Sarah Stone'

/** El encuentro de hoy: aparece cuando empieza y toma su estado de la barra de Clinical Mode (lib/historial). */
export const ENCUENTRO_HOY = 'enc-1127'

/* La historia médica es del paciente, no del encuentro: va igual en todas sus notas (CON-3081, CON-3605). */
export const HISTORIA_PACIENTE: Datos = {
  past_medical_conditions: [{ name: 'Hypertension', status: 'Active', start_date: '03/15/2019', notes: 'Controlled with medication.' }],
  current_medications: [{ name: 'Lisinopril', dose: '10', unit: 'mg', frequency: 'once daily', status: 'Active', start_date: '03/15/2019', notes: '' }],
  known_allergies: [{ allergen: 'latex', start_date: '01/01/2015', notes: 'Use nitrile gloves.', reactions: [{ category: 'Dermatological', symptom: 'Skin rash' }], severity: 'Mild' }],
  past_surgeries: [{ name: 'Appendectomy', date: '06/10/2012' }],
  has_history_questionnaires: true,
  history_questionnaires: [
    { name: 'Family History', completed_at: 'January 14, 2025 at 2:05 PM', narrative: 'Patient reports a family history of diabetes in mother and hypertension in father.' },
    { name: 'Oral History', completed_at: 'January 14, 2025 at 2:08 PM', narrative: 'Patient reports occasional gum bleeding during brushing and sensitivity to cold.' },
    { name: 'Social History', completed_at: 'January 14, 2025 at 2:10 PM', narrative: 'Patient reports no tobacco use and occasional alcohol consumption.' },
  ],
}

const BSAS = 'America/Argentina/Buenos_Aires'
const VITALES: Datos = { height_in: '66', weight_lb: '187', bmi: '30.2', blood_pressure: '128/82', heart_rate: '74', respiratory_rate: '16', temperature: '98.4', oxygen_saturation: '98', out_of_range_values: '', vitals_notes: '' }

const hallazgo = (finding: string, location: string, details = '', note = ''): Datos => ({ finding, location, details, note })
const queja = (narrative: string): Datos => ({ name: 'Chief Complaint', narrative })
const triage = (narrative: string): Datos => ({ name: 'Triage', narrative })
const radiografia = (exam_date: string, ...findings: Datos[]): Datos => ({ exam_date, no_findings: false, has_findings: true, reviewed: false, review_note: '', findings })
const proc = (code: string, description: string, location: string, status: ProcedimientoHistorial['status'] = 'completed'): ProcedimientoHistorial => ({ code, description, location, status })
const medicacion = (drug_brand: string, drug: string, strength: string, dosage_form: string, frequency: string, duration_number: string): Datos =>
  ({ drug_brand, drug, strength, strength_unit: 'mg', dosage_form, dose: '1', dose_unit: dosage_form, frequency, duration_number, duration_unit: 'days' })
const receta = (indications: string, ...medications: Datos[]): Datos => ({ status: 'Active', indications, document_sent: false, medications })
const orden = (laboratory: string, work_requested: string, expiration_date: string, tratamiento: Datos, document_sent = false): Datos => ({
  laboratory, status: 'Requested', work_requested, special_instructions: '-', asap: 'No', mandatory_to_continue_treatment: 'Yes', expiration_date, document_sent, lab_treatments: [tratamiento],
})

const AMOXICILINA = medicacion('Amoxil', 'Amoxicillin', '500', 'capsule', 'every 8 hours', '7')
const IBUPROFENO = medicacion('Advil', 'Ibuprofen', '400', 'tablet', 'every 6 hours', '3')
const ANESTESIA: Datos = { workflow_name: 'Local anesthesia', narrative: 'Infiltration with 1.7 ml of 2% lidocaine with 1:100,000 epinephrine. Aspiration negative. Patient tolerated the procedure well.' }

/* El plan que se presentó en la visita de revisión: dos opciones y la decisión del paciente (CON-2204, CON-3081). */
const PLAN_PRESENTADO: Datos = {
  has_treatment_cases: true,
  treatment_cases: [
    { name: 'Restorative plan', case_type: 'Definitive / Rehabilitation', recommended: true, total: '$2,430.00', decision: 'Accepted', visits: [
      { visit_name: 'Visit 1', visit_cost: '$1,180.00', procedures: [
        { code: 'D3330', description: 'Endodontic therapy, molar tooth', anatomic_area: '#19' },
        { code: 'D1110', description: 'Prophylaxis, adult', anatomic_area: '' },
      ] },
      { visit_name: 'Visit 2', visit_cost: '$1,250.00', procedures: [{ code: 'D2740', description: 'Crown, porcelain/ceramic', anatomic_area: '#19' }] },
    ] },
    { name: 'Extraction and implant', case_type: 'Definitive / Rehabilitation', recommended: false, total: '$2,350.00', decision: 'Declined', visits: [
      { visit_name: 'Visit 1', visit_cost: '$250.00', procedures: [{ code: 'D7140', description: 'Extraction, erupted tooth', anatomic_area: '#19' }] },
      { visit_name: 'Visit 2', visit_cost: '$2,100.00', procedures: [{ code: 'D6010', description: 'Implant body, endosteal', anatomic_area: '#19' }] },
    ] },
  ],
  consent_presented: true,
  has_accepted_consents: true,
  accepted_consents: [
    { consent_name: 'Informed Consent for Dental Treatment', plan_name: 'Restorative plan' },
    { consent_name: 'Informed Refusal of Dental Treatment', plan_name: 'Extraction and implant' },
  ],
}

const SIN_EVENTOS: EventosHistorial = {
  encounter_questionnaires: [], exams: [], dental_assessment_findings: [], radiographic_exams: [], periodontal_exams: [],
  procedures: [], workflows: [], prescriptions: [], lab_orders: [], referrals: [],
}

type Base = Pick<EncuentroHistorial, 'id' | 'fecha' | 'estado' | 'nota' | 'motivo' | 'provider'> & Partial<Omit<EncuentroHistorial, 'eventos'>> & { eventos?: Partial<EventosHistorial> }
const encuentro = ({ eventos, ...e }: Base): EncuentroHistorial => ({ horario: '09:00 AM to 09:45 AM', zona: BSAS, ...e, eventos: { ...SIN_EVENTOS, ...eventos } })

/* Las visitas anteriores: todas cerradas y firmadas por quien atendió. */
const control = (id: string, fecha: string, firmada: string, provider: string, motivo: string, eventos: Partial<EventosHistorial>, extra: Partial<Omit<EncuentroHistorial, 'eventos'>> = {}) =>
  encuentro({ id, fecha, estado: 'Fulfilled', nota: 'Signed', firmada, provider, motivo, eventos: { encounter_questionnaires: [queja(`Patient presents for ${motivo.toLowerCase()}. No pain reported.`)], ...eventos }, ...extra })

const PROFILAXIS = proc('D1110', 'Prophylaxis – adult', '')
const EVALUACION = proc('D0120', 'Periodic oral evaluation – established patient', '')

/** Del más nuevo al más viejo. */
export const ENCUENTROS_HISTORIAL: EncuentroHistorial[] = [
  /* En curso: la nota se puede generar las veces que haga falta, pero todavía no se firma (CON-2727, CON-2728). */
  encuentro({
    id: ENCUENTRO_HOY, fecha: '11/27/2026', horario: '10:00 AM to 10:45 AM', estado: 'In progress', nota: 'Unsigned', motivo: 'Crown prep', provider: PROVIDER_SESION,
    eventos: {
      vitals: VITALES,
      encounter_questionnaires: [queja('Patient reports a broken cusp on an upper left tooth when chewing. No spontaneous pain.'), triage('Pain severity: 2/10. No swelling reported. Patient denies fever.')],
      dental_assessment_findings: [hallazgo('Fractured cusp', '#14/O, D', 'Extent: Moderate')],
      procedures: [proc('D2750', 'Crown – porcelain fused to high noble metal', '#14', 'in progress')],
      workflows: [ANESTESIA],
      lab_orders: [orden('Olivos Laboratory', 'Porcelain-fused-to-metal crown, shade A2.', '12/18/2026', { cdt_code: 'D2750', description: 'Crown – porcelain fused to high noble metal', anatomic_area: '14', treatment_plan: 'Restorative plan' }, true)],
    },
  }),
  /* Completed sin firmar: firmarla lo pasa a Fulfilled (CON-2727). */
  encuentro({
    id: 'enc-1120', fecha: '11/20/2026', estado: 'Completed', nota: 'Unsigned', motivo: 'Root canal follow-up', provider: PROVIDER_SESION,
    eventos: {
      encounter_questionnaires: [queja('Patient reports mild tenderness on #19 when biting, improving since the last visit.'), triage('Pain severity: 3/10. No facial swelling reported.')],
      procedures: [proc('D3330', 'Endodontic therapy, molar tooth', '#19', 'in progress')],
      workflows: [{ workflow_name: 'Rubber dam isolation', narrative: 'Tooth #19 isolated with rubber dam and clamp W8A. Seal verified before access.' }],
      prescriptions: [receta('Take after meals.', AMOXICILINA)],
    },
  }),
  /* El paciente se fue antes de terminar; lo atendió otro provider. */
  encuentro({
    id: 'enc-1113', fecha: '11/13/2026', horario: '04:30 PM to 05:00 PM', estado: 'Discharged', nota: 'Unsigned', motivo: 'Emergency: tooth pain', provider: 'Dr. Elena Martinez',
    eventos: {
      vitals: { ...VITALES, blood_pressure: '145/92', out_of_range_values: 'Blood pressure', vitals_notes: 'Taken seated, patient in pain.' },
      encounter_questionnaires: [queja('Patient reports throbbing pain in the lower left back tooth for five days, worse when chewing and with cold drinks.'), triage('Pain severity: 7/10. No facial swelling reported. Patient denies fever or difficulty swallowing.')],
      exams: [{ exam_name: 'Intraoral Examination', exam_date: '11/13/2026', findings: [hallazgo('Gingival inflammation', 'Left Mandibular Gingiva', 'Severity: Mild; Bleeding: Yes')] }],
    },
  }),
  /* Cerrado solo a las 48 h: la nota quedó generada, sin narrativas, a la espera de la firma (CON-2937). */
  encuentro({
    id: 'enc-1103', fecha: '11/03/2026', estado: 'Fulfilled', nota: 'Unsigned', motivo: 'Endodontic therapy', provider: PROVIDER_SESION, automatica: true,
    eventos: {
      encounter_questionnaires: [queja('Patient presents to start root canal treatment on #19.')],
      radiographic_exams: [radiografia('11/03/2026', hallazgo('Periapical radiolucency', '#19', 'Size: 3 mm; Root: Mesial', 'Consistent with chronic apical periodontitis.'))],
      procedures: [proc('D3330', 'Endodontic therapy, molar tooth', '#19', 'in progress'), proc('D0220', 'Intraoral – periapical first radiographic image', '#19')],
      workflows: [ANESTESIA],
      referrals: [{ referral: 'Dr. Mark Bennett', specialties: 'Endodontics', status: 'Requested', notes: 'Please evaluate #19 before we place the crown.', document_sent: true, referral_procedures: [{ cdt_code: 'D3330', description: 'Endodontic therapy, molar tooth', anatomic_area: '19' }] }],
    },
  }),
  /* De otro provider: se lee con Read Clinical Note, pero sólo la firma quien atendió (CON-3508). */
  encuentro({
    id: 'enc-1027', fecha: '10/27/2026', estado: 'Fulfilled', nota: 'Unsigned', motivo: 'Treatment plan review', provider: 'Dr. Emily Chen',
    eventos: {
      encounter_questionnaires: [queja('Patient comes to review the treatment options for #19.')],
      dental_assessment_findings: [hallazgo('Deep caries', '#19/O, D', 'Extent: Deep', 'Caries close to the pulp.')],
      treatment_plan: PLAN_PRESENTADO,
    },
  }),
  /* Cancelado: no hubo atención, no hay nota. */
  encuentro({ id: 'enc-1020', fecha: '10/20/2026', estado: 'Cancelled', nota: 'None', motivo: 'Cleaning', provider: PROVIDER_SESION }),
  /* Firmada, con un addendum posterior (CON-2730). */
  encuentro({
    id: 'enc-1006', fecha: '10/06/2026', estado: 'Fulfilled', nota: 'Signed', firmada: 'October 6, 2026 at 10:02 AM', motivo: 'Crown prep', provider: PROVIDER_SESION,
    eventos: {
      vitals: VITALES,
      encounter_questionnaires: [queja('Patient presents for crown preparation on #14. No pain reported.')],
      radiographic_exams: [radiografia('10/06/2026', hallazgo('Recurrent caries', '#14', 'Surface: Distal'))],
      procedures: [
        proc('D2950', 'Core buildup, including any pins when required', '#14'),
        proc('D2750', 'Crown – porcelain fused to high noble metal', '#14', 'in progress'),
        proc('D0220', 'Intraoral – periapical first radiographic image', '#14'),
      ],
      workflows: [ANESTESIA],
      lab_orders: [orden('North Dental Lab', 'Temporary crown for #14.', '10/20/2026', { cdt_code: 'D2750', description: 'Crown – porcelain fused to high noble metal', anatomic_area: '14', treatment_plan: 'Restorative plan' })],
    },
    adendas: [{ author: PROVIDER_SESION, created_at: 'October 7, 2026 at 8:40 AM', text: 'Patient called: the temporary crown feels high when biting. Booked a short visit to adjust the occlusion.', signed_date: 'October 7, 2026' }],
  }),
  /* Sin permiso para leer la nota de otro provider (CON-3508, CON-4158). */
  encuentro({ id: 'enc-0922', fecha: '09/22/2026', estado: 'Fulfilled', nota: 'Restricted', motivo: 'Oral surgery consult', provider: 'Dr. Daniel Anderson' }),
  control('enc-0914', '09/14/2026', 'September 14, 2026 at 3:15 PM', PROVIDER_SESION, 'Extraction', {
    vitals: VITALES,
    encounter_questionnaires: [queja('Patient reports pain and swelling around the lower right wisdom tooth for three days.'), triage('Pain severity: 6/10. Mild swelling. Patient denies fever.')],
    exams: [{ exam_name: 'Intraoral Examination', exam_date: '09/14/2026', findings: [hallazgo('Pericoronitis', 'Right Mandibular Gingiva', 'Severity: Moderate')] }],
    procedures: [proc('D7140', 'Extraction – erupted tooth or exposed root', '#32')],
    workflows: [ANESTESIA],
    prescriptions: [receta('Take after meals. Stop ibuprofen if stomach pain appears.', AMOXICILINA, IBUPROFENO)],
  }, { horario: '02:30 PM to 03:10 PM' }),
  control('enc-0901', '09/01/2026', 'September 1, 2026 at 11:40 AM', 'Dr. Elena Martinez', 'Denture impression', {
    procedures: [proc('D5110', 'Complete denture – maxillary', 'Upper arch', 'in progress')],
    lab_orders: [orden('Smile Lab Studio', 'Custom tray and bite rim, maxillary.', '09/15/2026', { cdt_code: 'D5110', description: 'Complete denture – maxillary', anatomic_area: 'Upper arch', treatment_plan: 'Restorative plan' }, true)],
  }),
  control('enc-0825', '08/25/2026', 'August 25, 2026 at 9:50 AM', PROVIDER_SESION, 'Filling', {
    dental_assessment_findings: [hallazgo('Caries', '#30/O', 'Extent: Moderate')],
    procedures: [proc('D2140', 'Amalgam – one surface, primary or permanent', '#30/O'), proc('D0220', 'Intraoral – periapical first radiographic image', '#30')],
    workflows: [ANESTESIA],
  }),
  control('enc-0805', '08/05/2026', 'August 5, 2026 at 10:05 AM', PROVIDER_SESION, 'Cleaning', {
    vitals: VITALES,
    periodontal_exams: [{
      exam_date: '08/05/2026', reviewed: false, new_charting: true,
      has_probing_depths: true, probing_depths: [{ tooth: '19', surface: 'B', value: '5' }],
      has_gingival_margin: false, has_recession: false, recession: [], has_overgrowth: false, overgrowth: [],
      has_bleeding: true, bleeding: [{ tooth: '19', surface: 'B' }], has_suppuration: false, suppuration: [],
    }],
    procedures: [PROFILAXIS, EVALUACION],
  }),
  control('enc-0612', '06/12/2026', 'June 12, 2026 at 4:20 PM', 'Dr. Emily Chen', 'Sensitivity check', {
    dental_assessment_findings: [hallazgo('Gingival recession', '#6/B', 'Extent: 2 mm')],
  }, { zona: 'Europe/Berlin' }),
  encuentro({ id: 'enc-0518', fecha: '05/18/2026', estado: 'Cancelled', nota: 'None', motivo: 'Cleaning', provider: 'Dr. Elena Martinez' }),
  control('enc-0407', '04/07/2026', 'April 7, 2026 at 12:10 PM', PROVIDER_SESION, 'Night guard delivery', {
    procedures: [proc('D9944', 'Occlusal guard – hard appliance, full arch', 'Upper arch')],
  }),
  control('enc-0316', '03/16/2026', 'March 16, 2026 at 9:55 AM', PROVIDER_SESION, 'Night guard impression', {
    procedures: [proc('D9944', 'Occlusal guard – hard appliance, full arch', 'Upper arch', 'in progress')],
    lab_orders: [orden('Olivos Laboratory', 'Hard occlusal guard, maxillary.', '04/06/2026', { cdt_code: 'D9944', description: 'Occlusal guard – hard appliance, full arch', anatomic_area: 'Upper arch', treatment_plan: '-' })],
  }),
  control('enc-0203', '02/03/2026', 'February 3, 2026 at 10:00 AM', PROVIDER_SESION, 'Cleaning', { vitals: VITALES, procedures: [PROFILAXIS, EVALUACION] }),
  control('enc-1118-25', '11/18/2025', 'November 18, 2025 at 3:30 PM', 'Dr. Elena Martinez', 'Sealant', {
    procedures: [proc('D1351', 'Sealant – per tooth', '#13')],
  }),
  control('enc-0902-25', '09/02/2025', 'September 2, 2025 at 11:15 AM', PROVIDER_SESION, 'Whitening consult', {
    dental_assessment_findings: [hallazgo('Extrinsic staining', '#8/B, #9/B')],
  }),
  control('enc-0805-25', '08/05/2025', 'August 5, 2025 at 10:10 AM', PROVIDER_SESION, 'Cleaning', { procedures: [PROFILAXIS, EVALUACION] }),
  control('enc-0520-25', '05/20/2025', 'May 20, 2025 at 5:05 PM', 'Dr. Emily Chen', 'Filling', {
    procedures: [proc('D2391', 'Resin-based composite – one surface, posterior', '#3/O')],
    workflows: [ANESTESIA],
    referrals: [{ referral: 'Dr. Laura Kim', specialties: 'Orthodontics', status: 'Requested', notes: 'Evaluate crowding in the lower anterior teeth.', document_sent: false, referral_procedures: [] }],
  }),
  control('enc-0211-25', '02/11/2025', 'February 11, 2025 at 9:45 AM', PROVIDER_SESION, 'Cleaning', { vitals: VITALES, procedures: [PROFILAXIS, EVALUACION] }),
  control('enc-0114-25', '01/14/2025', 'January 14, 2025 at 2:20 PM', PROVIDER_SESION, 'New patient exam', {
    vitals: VITALES,
    radiographic_exams: [radiografia('01/14/2025', hallazgo('Impacted third molar', '#32', 'Position: Mesioangular'))],
    procedures: [proc('D0150', 'Comprehensive oral evaluation – new or established patient', ''), proc('D0210', 'Intraoral – comprehensive series of radiographic images', '')],
  }),
]
