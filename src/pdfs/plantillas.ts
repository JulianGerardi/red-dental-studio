/* Los PDFs que genera la plataforma. Salen de CON-4115 (los documentos de la ficha del paciente: consentimientos,
   treatment plans, lab orders, recetas, referrals y exámenes), de la Clinical note de Pending tasks y de CON-2923 (los
   consentimientos de aceptación y de rechazo del caso). `origen`: 'app' es la hoja que ya muestra la app (mismo
   contenido), 'propuesta' la armamos con los campos de Jira y espera el ok. Detalle en
   design-reference/figma/modulos/pdfs.md. */
import { armarHoja, type Bloque, type Columna, type Datos, type Firma, type Hoja } from './marco.ts'

export type Categoria = 'Clinical records' | 'Orders' | 'Treatment & consent'
export type Origen = 'app' | 'propuesta'

export interface Pdf {
  id: string
  categoria: Categoria
  nombre: string
  /** Cuándo se genera y desde dónde se abre. */
  cuando: string
  /** Quién lo firma; sin firmas, quién lo recibe. */
  firma: string
  origen: Origen
  /** Qué partes se completaron porque no vienen de la app ni de Jira. */
  completado?: string[]
  jira: string[]
  hoja: Hoja
  /** Los datos de ejemplo, específicos de este documento (los comunes van en COMUNES). */
  ejemplo: Datos
}

/* Lo que todos los documentos llevan: membrete de la clínica y datos del paciente. La clínica es la de la app
   (data/clinica.ts) y el paciente, John Smith de la ficha. */
export const COMUNES: Datos = {
  practice_initials: 'RD',
  practice_name: 'Red Dental Studio',
  location_name: 'Abril',
  location_address: 'Aroser Allee 97, 5 B, Berlin, 13407, C, AR',
  practice_phone: '+54 312321322',
  practice_email: 'abril@gmail.com',
  patient_name: 'John Smith',
  patient_birth_date: 'January 28, 1999 (27 yrs)',
  patient_id: '12345432',
  patient_phone: '(555) 234-5678',
  patient_email: 'john.smith@email.com',
  patient_address: 'Av Siempreviva 1237, 222, New York, 1232, NY, US',
  provider_name: 'Elena Martinez',
  provider_email: 'emartinez@confidentally.com',
}

const PROVIDER: Firma = { rol: 'Provider', prefijo: 'provider' }
const PACIENTE: Firma = { rol: 'Patient / legal guardian', prefijo: 'patient' }
const FIRMADO_PROVIDER = { provider_signed_date: 'November 25, 2026', provider_signature_image: '' }
const FIRMADO_PACIENTE = { patient_signed_date: 'November 25, 2026', patient_signature_image: '' }
const RESUMEN_PACIENTE: [string, string][] = [['Patient', '{{patient_name}}'], ['Date of birth', '{{patient_birth_date}}'], ['Patient ID', '{{patient_id}}']]

/* Patient acknowledgment del consentimiento: el mismo texto que la hoja de la app (settings/ConsentDocument). */
const RECONOCIMIENTOS = [
  'I have read and understand the information provided regarding the proposed treatment.',
  'I have had the opportunity to ask questions and have received satisfactory answers.',
  'I understand the potential risks, benefits, and alternatives to the proposed treatment.',
  'I understand that I may choose to decline the proposed treatment.',
  'I voluntarily consent to the proposed treatment.',
]
/* La descripción del procedimiento con sus findings y diagnósticos debajo, como los trae el evento del caso (CON-2204):
   el treatment plan y los consentimientos los muestran (pedido de Julián, 2026-11-27). */
const CELDA_PROCEDIMIENTO = '{{description}}{{#findings}}<span class="sub"><b>Finding:</b> {{description}}</span>{{/findings}}{{#diagnoses}}<span class="sub"><b>Diagnosis:</b> {{code}} · {{description}}</span>{{/diagnoses}}'
const COLS_PROCEDIMIENTO: Columna[] = [
  { titulo: 'Code', valor: '{{code}}', ancho: '9%' }, { titulo: 'Description', valor: CELDA_PROCEDIMIENTO }, { titulo: 'Area', valor: '{{anatomic_area}}', ancho: '12%' },
]
/* Los importes con los nombres de Estimate details (EstimateDetails): lo cobrado, lo del seguro, el ajuste del plan y lo
   del paciente suman el fee. La última fila de `importes` es lo que paga el paciente. */
const COLS_IMPORTES: Columna[] = [
  { titulo: 'Fee', valor: '{{fee}}', derecha: true, ancho: '10.5%' }, { titulo: 'Insurance', valor: '{{insurance_portion}}', derecha: true, ancho: '10.5%' },
  { titulo: 'Adjustment', valor: '{{insurance_adjustment}}', derecha: true, ancho: '11.5%' }, { titulo: 'Patient', valor: '{{patient_portion}}', derecha: true, ancho: '10.5%' },
]
const IMPORTES: Bloque = {
  tipo: 'importes',
  filas: [['Plan case total', '{{case_total}}'], ['Insurance portion', '{{total_insurance_portion}}'], ['Insurance adjustments', '{{total_insurance_adjustments}}'], ['Patient portion', '{{total_patient_portion}}']],
  nota: 'The patient portion includes {{deductible_applied}} of deductible. Estimates are not a guarantee of coverage or payment. Final insurance benefits and patient responsibility may vary.',
}

/* El caso del ejemplo (Restorative plan), con los importes que calcula Estimate details (data/estimaciones): cobertura
   del 100 % en D1, 80 % en D2-D4, 85 % permitido y $50 de deducible. Fee = seguro + ajuste + paciente. */
const PROC_ENDODONCIA = { code: 'D3330', description: 'Endodontic therapy, molar tooth', anatomic_area: '19', fee: '$1,100.00', insurance_portion: '$708.00', insurance_adjustment: '$165.00', patient_portion: '$227.00', findings: [{ description: 'Periapical radiolucency' }], diagnoses: [{ code: 'K04.5', description: 'Chronic apical periodontitis' }] }
const PROC_PROFILAXIS = { code: 'D1110', description: 'Prophylaxis, adult', anatomic_area: 'Full mouth', fee: '$80.00', insurance_portion: '$72.00', insurance_adjustment: '$8.00', patient_portion: '$0.00', findings: [], diagnoses: [] }
const PROC_CORONA = { code: 'D2740', description: 'Crown, porcelain/ceramic', anatomic_area: '19', fee: '$1,250.00', insurance_portion: '$850.00', insurance_adjustment: '$187.50', patient_portion: '$212.50', findings: [{ description: 'Deep caries' }], diagnoses: [{ code: 'K02.52', description: 'Dental caries penetrating into dentin' }] }
const TOTALES_CASO = { case_total: '$2,430.00', total_insurance_portion: '$1,630.00', total_insurance_adjustments: '$360.50', total_patient_portion: '$439.50', deductible_applied: '$50.00' }

/* El texto del consentimiento sale del template de Settings › Consents (HTML del editor). */
const TEXTO_TEMPLATE = '<p>Your provider explained the treatment described above, why it is recommended, what it involves and what you can expect afterwards.</p><ul><li>Results can vary from patient to patient.</li><li>Follow the care instructions your provider gives you.</li></ul>'

export const PDFS: Pdf[] = [
  {
    id: 'clinical-note',
    categoria: 'Clinical records',
    nombre: 'Clinical note',
    cuando: 'Generate Clinical Note in Clinical Mode (as many times as needed until it is signed), or on its own when the encounter closes after 48 hours. View PDF in Pending tasks, Treatment history and patient documents.',
    firma: 'The provider who attended the visit. Addenda are signed by their author.',
    origen: 'propuesta',
    completado: [
      'Sections from the encounter events: one per event type (CON-2617), only when something happened in the visit',
      'Medical History grouped as CON-3605',
      'Addenda after the signature (CON-2730)',
    ],
    jira: ['CON-2728', 'CON-2816', 'CON-2617', 'CON-3605', 'CON-1619', 'CON-2055', 'CON-2191', 'CON-2198', 'CON-2199', 'CON-2204', 'CON-2614', 'CON-2615', 'CON-2616', 'CON-2620', 'CON-2621', 'CON-2772', 'CON-2730', 'CON-2937', 'CON-2641', 'CON-2643', 'CON-4115'],
    hoja: {
      tipo: 'Dental clinical note',
      titulo: '{{patient_name}}',
      meta: ['Date of visit', '{{visit_date}}'],
      aviso: '{{#auto_generated}}<p class="aviso">Generated automatically when the encounter closed after 48 hours without activity. Workflow narratives are not included.</p>{{/auto_generated}}',
      resumen: [
        ['Patient name', '{{patient_name}}'], ['Date of birth', '{{patient_birth_date}}'], ['Date of visit', '{{visit_date}} — {{visit_time}}'],
        ['Attending dentist', '{{provider_name}}'], ['Location', '{{location_name}}'], ['Contact', '{{patient_phone}}'],
      ],
      secciones: [
        { titulo: 'Medical History', bloques: [
          { tipo: 'subtitulo', texto: 'This visit' },
          { tipo: 'narrativas', lista: 'encounter_questionnaires', titulo: '{{name}}', texto: '{{narrative}}', vacio: 'No questionnaires answered in this visit.' },
          { tipo: 'subtitulo', texto: 'Patient history' },
          { tipo: 'narrativas', lista: 'history_questionnaires', titulo: '{{name}}', detalle: 'Completed on {{completed_at}}', texto: '{{narrative}}', vacio: 'No history questionnaires answered.' },
          { tipo: 'subtitulo', texto: 'Conditions, allergies and surgeries' },
          { tipo: 'tabla', lista: 'patient_conditions', vacio: 'Patient reports no known medical conditions, allergies or surgeries.', columnas: [
            { titulo: 'Type', valor: '{{type}}', ancho: '19%' },
            { titulo: 'Description', valor: '{{description}}{{#severity}}<span class="sub"><b>Severity:</b> {{severity}}</span>{{/severity}}{{#reactions}}<span class="sub"><b>Reaction:</b> {{name}}</span>{{/reactions}}' },
            { titulo: 'Since', valor: '{{start_date}}', ancho: '13%' }, { titulo: 'Status', valor: '{{status}}', ancho: '11%' }, { titulo: 'Notes', valor: '{{note}}', ancho: '28%' },
          ] },
          { tipo: 'subtitulo', texto: 'Medications' },
          { tipo: 'tabla', lista: 'patient_medications', vacio: 'Patient reports no current medications.', columnas: [
            { titulo: 'Medication', valor: '{{drug_brand}} ({{drug}}) {{strength}} {{strength_unit}}<span class="sub">{{dosage_form}}</span>' },
            { titulo: 'Directions', valor: '{{dose}} {{dose_unit}} {{route}}, {{frequency}}', ancho: '30%' },
            { titulo: 'Since', valor: '{{start_date}}', ancho: '13%' }, { titulo: 'Status', valor: '{{status}}', ancho: '11%' },
          ] },
        ] },
        { titulo: 'Vitals', si: 'has_vitals', bloques: [
          { tipo: 'cuadros', lista: 'vitals', rotulo: '{{observation}}', valor: '{{value}} {{measure}}', vacio: 'No vitals recorded.' },
          { tipo: 'texto', texto: '{{#vitals_notes}}<b>Notes:</b> {{vitals_notes}}{{/vitals_notes}}' },
        ] },
        { titulo: 'Exams and findings', si: 'has_exams', bloques: [
          { tipo: 'grupos', lista: 'exams', titulo: '{{exam_type}}', nota: '{{#review}}<b>Review:</b> {{review}}{{/review}}', tabla: { lista: 'exam_findings', vacio: 'No findings recorded.', columnas: [
            { titulo: 'Finding', valor: '{{description}}{{#descriptors}}<span class="sub"><b>{{name}}:</b> {{answer}}</span>{{/descriptors}}' },
            { titulo: 'Area', valor: '{{anatomic_area}}', ancho: '14%' }, { titulo: 'Result', valor: '{{status}}', ancho: '11%' }, { titulo: 'Notes', valor: '{{note}}', ancho: '34%' },
          ] } },
        ] },
        { titulo: 'Periodontal measures', si: 'has_periodontal_measures', bloques: [
          { tipo: 'tabla', lista: 'periodontal_measures', vacio: 'No significant measures.', columnas: [
            { titulo: 'Tooth', valor: '{{tooth}}', ancho: '12%' }, { titulo: 'Surface', valor: '{{surface}}', ancho: '14%' }, { titulo: 'Measure', valor: '{{measure}}' }, { titulo: 'Value', valor: '{{value}}', derecha: true, ancho: '14%' },
          ] },
          { tipo: 'nota', texto: 'Only clinically significant measures: probing depth of 4 mm or more, gingival recession of 1 mm or more and gingival overgrowth.' },
        ] },
        { titulo: 'Procedures performed', si: 'has_procedures', bloques: [
          { tipo: 'tabla', lista: 'procedures', vacio: 'No procedures performed.', columnas: [...COLS_PROCEDIMIENTO, { titulo: 'Status', valor: '{{status}}', ancho: '13%' }] },
        ] },
        { titulo: 'Treatment plan', si: 'has_treatment_cases', bloques: [
          { tipo: 'grupos', lista: 'treatment_cases', titulo: '{{name}} · {{case_type}}{{#recommended}} · Recommended{{/recommended}}', detalle: '{{status}} · {{total}}', tabla: { lista: 'case_procedures', vacio: 'No procedures.', columnas: [
            { titulo: 'Visit', valor: '{{visit}}', ancho: '8%' }, ...COLS_PROCEDIMIENTO, { titulo: 'Status', valor: '{{status}}', ancho: '12%' },
          ] } },
          { tipo: 'texto', texto: '{{#treatment_discussion}}<b>Discussion:</b> {{treatment_discussion}}{{/treatment_discussion}}' },
        ] },
        { titulo: 'Prescriptions', si: 'has_prescriptions', bloques: [
          { tipo: 'tarjetas', lista: 'prescriptions', titulo: 'Prescription · {{status}}', campos: [
            ['Medications', '{{#medications}}<span class="linea">{{drug_brand}} ({{drug}}) {{strength}} {{strength_unit}} {{dosage_form}}: {{dose}} {{dose_unit}}, {{frequency}}, for {{duration_number}} {{duration_unit}}</span>{{/medications}}'],
            ['Indications', '{{indications}}'],
          ] },
        ] },
        { titulo: 'Lab orders', si: 'has_lab_orders', bloques: [
          { tipo: 'tarjetas', lista: 'lab_orders', titulo: '{{laboratory}} · {{status}}', campos: [
            ['Work requested', '{{work_requested}}'],
            ['Procedures', '{{#lab_treatments}}<span class="linea">{{cdt_code}} {{description}} · {{anatomic_area}} · {{treatment_plan}}</span>{{/lab_treatments}}'],
            ['Special instructions', '{{special_instructions}}'], ['ASAP', '{{asap}}'], ['Mandatory to continue treatment', '{{mandatory_to_continue_treatment}}'],
            ['Expiration date', '{{expiration_date}}'], ['Documents sent', '{{document_sent}}'],
          ] },
        ] },
        { titulo: 'Referrals', si: 'has_referrals', bloques: [
          { tipo: 'tarjetas', lista: 'referrals', titulo: '{{referral}} · {{specialties}} · {{status}}', campos: [
            ['Procedures', '{{#referral_procedures}}<span class="linea">{{cdt_code}} {{description}} · {{anatomic_area}}</span>{{/referral_procedures}}'],
            ['Notes', '{{notes}}'], ['Documents sent', '{{document_sent}}'],
          ] },
        ] },
        { titulo: 'Workflows', si: 'has_workflows', bloques: [
          { tipo: 'narrativas', lista: 'workflows', titulo: '{{workflow_name}}', detalle: '{{workflow_type}}', texto: '{{narrative}}' },
        ] },
        { titulo: 'Additional Notes', bloques: [{ tipo: 'html', variable: 'clinical_notes_html' }] },
      ],
      firmas: [PROVIDER],
      posdata: [
        { titulo: 'Addenda', si: 'has_addenda', bloques: [
          { tipo: 'nota', texto: 'Added after the note was signed. They do not change the signed note.' },
          { tipo: 'narrativas', lista: 'addenda', titulo: 'Addendum by {{author}}', detalle: '{{created_at}}', texto: '{{text}}<span class="firmado">Signed electronically by {{author}} · {{signed_date}}</span>' },
        ] },
      ],
      pie: 'Dental clinical note',
    },
    ejemplo: {
      visit_date: 'November 25, 2026', visit_time: '09:00 AM to 09:45 AM',
      auto_generated: false,
      encounter_questionnaires: [
        { name: 'Chief Complaint', narrative: 'Patient reports throbbing pain in the lower left back tooth for five days, worse when chewing and with cold drinks.' },
        { name: 'Triage', narrative: 'Pain severity: 7/10. No facial swelling reported. Patient denies fever or difficulty swallowing.' },
      ],
      history_questionnaires: [
        { name: 'Dental and Oral Health History', completed_at: 'November 20, 2026 at 10:12 AM', narrative: 'Patient reports occasional gum bleeding during brushing and sensitivity to cold. Last dental visit two years ago.' },
        { name: 'Family History', completed_at: 'November 20, 2026 at 10:15 AM', narrative: 'Patient reports a family history of diabetes in mother and hypertension in father.' },
        { name: 'Social History', completed_at: 'November 20, 2026 at 10:16 AM', narrative: 'Patient reports no tobacco use and occasional alcohol consumption.' },
      ],
      patient_conditions: [
        { type: 'Medical condition', description: 'Hypertension', start_date: 'March 2019', status: 'Active', note: 'Controlled with medication.', severity: '', reactions: [] },
        { type: 'Allergy', description: 'Latex', start_date: '2015', status: 'Active', note: 'Use nitrile gloves.', severity: 'Mild', reactions: [{ name: 'Skin rash' }] },
        { type: 'Surgery', description: 'Appendectomy', start_date: '2012', status: 'Resolved', note: '', severity: '', reactions: [] },
      ],
      patient_medications: [
        { drug_brand: 'Zestril', drug: 'Lisinopril', strength: '10', strength_unit: 'mg', dosage_form: 'Tablet', dose: '1', dose_unit: 'tablet', route: 'oral', frequency: 'once daily', start_date: 'March 2019', status: 'Active' },
      ],
      has_vitals: true,
      vitals: [
        { observation: 'Blood pressure', value: '128/82', measure: 'mmHg' }, { observation: 'Heart rate', value: '74', measure: 'bpm' },
        { observation: 'Temperature', value: '98.4', measure: '°F' }, { observation: 'Respiration', value: '16', measure: 'bpm' },
        { observation: 'SpO2', value: '98', measure: '%' }, { observation: 'Weight', value: '187', measure: 'lb' },
      ],
      vitals_notes: 'Taken seated, before local anesthesia.',
      has_exams: true,
      exams: [
        { exam_type: 'Review of Systems', review: '', exam_findings: [
          { description: 'Hypertension', anatomic_area: '—', status: 'Positive', note: 'Controlled with medication.', descriptors: [] },
          { description: 'Diabetes', anatomic_area: '—', status: 'Negative', note: '', descriptors: [] },
        ] },
        { exam_type: 'Intra Oral', review: 'Pain to percussion and to cold on #19; lingering more than 30 seconds.', exam_findings: [
          { description: 'Deep caries', anatomic_area: '19 (O, D)', status: '—', note: 'Caries close to the pulp.', descriptors: [{ name: 'Extent', answer: 'Deep' }] },
          { description: 'Gingival inflammation', anatomic_area: 'Lower left', status: '—', note: '', descriptors: [{ name: 'Severity', answer: 'Mild' }] },
        ] },
        { exam_type: 'Radiographic', review: 'Periapical image of #19 taken today.', exam_findings: [
          { description: 'Periapical radiolucency', anatomic_area: '19', status: '—', note: 'Consistent with chronic apical periodontitis.', descriptors: [] },
        ] },
      ],
      has_periodontal_measures: true,
      periodontal_measures: [
        { tooth: '18', surface: 'Distobuccal', measure: 'Probing depth', value: '5 mm' },
        { tooth: '19', surface: 'Buccal', measure: 'Probing depth', value: '6 mm' },
        { tooth: '19', surface: 'Lingual', measure: 'Gingival recession', value: '2 mm' },
      ],
      has_procedures: true,
      procedures: [
        { code: 'D0140', description: 'Limited oral evaluation – problem focused', anatomic_area: 'Full mouth', status: 'Completed', findings: [], diagnoses: [] },
        { code: 'D0220', description: 'Intraoral – periapical first radiographic image', anatomic_area: '19', status: 'Completed', findings: [], diagnoses: [] },
        { code: 'D3221', description: 'Pulpal debridement, primary and permanent teeth', anatomic_area: '19', status: 'Completed', findings: [{ description: 'Deep caries' }], diagnoses: [{ code: 'K04.5', description: 'Chronic apical periodontitis' }] },
      ],
      has_treatment_cases: true,
      treatment_cases: [
        { name: 'Restorative plan', case_type: 'Restorative', recommended: true, status: 'Presented', total: '$2,430.00', case_procedures: [
          { visit: '1', code: 'D3330', description: 'Endodontic therapy, molar tooth', anatomic_area: '19', status: 'Referred', findings: [{ description: 'Periapical radiolucency' }], diagnoses: [{ code: 'K04.5', description: 'Chronic apical periodontitis' }] },
          { visit: '1', code: 'D1110', description: 'Prophylaxis, adult', anatomic_area: 'Full mouth', status: 'Planned', findings: [], diagnoses: [] },
          { visit: '2', code: 'D2740', description: 'Crown, porcelain/ceramic', anatomic_area: '19', status: 'Planned', findings: [{ description: 'Deep caries' }], diagnoses: [{ code: 'K02.52', description: 'Dental caries penetrating into dentin' }] },
        ] },
        { name: 'Extraction and implant', case_type: 'Surgical', recommended: false, status: 'Presented', total: '$2,350.00', case_procedures: [
          { visit: '1', code: 'D7140', description: 'Extraction, erupted tooth', anatomic_area: '19', status: 'Planned', findings: [{ description: 'Periapical radiolucency' }], diagnoses: [{ code: 'K04.5', description: 'Chronic apical periodontitis' }] },
          { visit: '2', code: 'D6010', description: 'Implant body, endosteal', anatomic_area: '19', status: 'Planned', findings: [], diagnoses: [] },
        ] },
      ],
      treatment_discussion: 'Both options explained. Patient prefers to keep the tooth and will decide after the endodontic evaluation.',
      has_prescriptions: true,
      prescriptions: [
        { status: 'Active', indications: 'Take after meals. Stop ibuprofen if stomach pain appears.', medications: [
          { drug_brand: 'Amoxil', drug: 'Amoxicillin', strength: '500', strength_unit: 'mg', dosage_form: 'capsule', dose: '1', dose_unit: 'capsule', frequency: 'every 8 hours', duration_number: '7', duration_unit: 'days' },
          { drug_brand: 'Advil', drug: 'Ibuprofen', strength: '400', strength_unit: 'mg', dosage_form: 'tablet', dose: '1', dose_unit: 'tablet', frequency: 'every 6 hours', duration_number: '3', duration_unit: 'days' },
        ] },
      ],
      has_lab_orders: true,
      lab_orders: [
        { laboratory: 'Olivos Laboratory', status: 'Requested', work_requested: 'Zirconia crown, shade A2.', special_instructions: 'Send the try-in before final glazing.', asap: 'No', mandatory_to_continue_treatment: 'Yes', expiration_date: 'December 9, 2026', document_sent: 'Yes', lab_treatments: [
          { cdt_code: 'D2740', description: 'Crown, porcelain/ceramic', anatomic_area: '19', treatment_plan: 'Restorative plan' },
        ] },
      ],
      has_referrals: true,
      referrals: [
        { referral: 'Dr. Mark Bennett', specialties: 'Endodontics', status: 'Sent', notes: 'Please evaluate #19 for root canal treatment before we place the crown.', document_sent: 'Yes', referral_procedures: [
          { cdt_code: 'D3330', description: 'Endodontic therapy, molar tooth', anatomic_area: '19' },
        ] },
      ],
      has_workflows: true,
      workflows: [
        { workflow_name: 'Local anesthesia', workflow_type: 'Procedure', narrative: 'Inferior alveolar nerve block with 1.7 ml of 2% lidocaine with 1:100,000 epinephrine. Aspiration negative. Patient tolerated the procedure well.' },
      ],
      clinical_notes_html: '<p>Patient responsibilities were discussed including but not limited to daily care, use/misuse, regular maintenance appointments, and routine examination of underlying oral tissues.</p><p>The patient was discharged to return home in satisfactory condition.</p>',
      ...FIRMADO_PROVIDER,
      has_addenda: true,
      addenda: [
        { author: 'Elena Martinez', created_at: 'November 26, 2026 at 8:40 AM', text: 'Patient called: pain went down to 2/10. Continue the antibiotic as prescribed.', signed_date: 'November 26, 2026' },
      ],
    },
  },
  {
    id: 'periodontal-exam',
    categoria: 'Clinical records',
    nombre: 'Periodontal exam',
    cuando: 'Download from the patient documents once the periodontal exam is saved.',
    firma: 'The provider who did the exam.',
    origen: 'propuesta',
    completado: ['The whole layout: no PDF of this exam exists yet', 'Columns from the Periodontal chart (Miller class, PD, CAL, BOP)'],
    jira: ['CON-1122', 'CON-1418', 'CON-1428', 'CON-4115'],
    hoja: {
      tipo: 'Periodontal exam',
      titulo: '{{patient_name}}',
      meta: ['Exam date', '{{exam_date}}'],
      resumen: [...RESUMEN_PACIENTE, ['Exam date', '{{exam_date}}'], ['Provider', '{{provider_name}}'], ['Location', '{{location_name}}']],
      secciones: [
        { titulo: 'Periodontal chart', bloques: [
          { tipo: 'tabla', lista: 'teeth', vacio: 'No teeth charted.', columnas: [
            { titulo: 'Tooth', valor: '{{tooth}}', ancho: '9%' }, { titulo: 'Mobility', valor: '{{mobility}}' },
            { titulo: 'Buccal PD', valor: '{{buccal_pd}}' }, { titulo: 'Buccal CAL', valor: '{{buccal_cal}}' }, { titulo: 'Buccal BOP', valor: '{{buccal_bop}}' },
            { titulo: 'Lingual PD', valor: '{{lingual_pd}}' }, { titulo: 'Lingual CAL', valor: '{{lingual_cal}}' }, { titulo: 'Lingual BOP', valor: '{{lingual_bop}}' },
          ] },
          { tipo: 'nota', texto: 'PD: probing depth and CAL: clinical attachment level, in mm (distal, mid, mesial). BOP: sites that bled on probing. Missing teeth are not charted.' },
        ] },
        { titulo: 'Findings', bloques: [{ tipo: 'tabla', lista: 'findings', vacio: 'No findings recorded.', columnas: [
          { titulo: 'Tooth', valor: '{{tooth}}', ancho: '9%' }, { titulo: 'Finding', valor: '{{finding}}', ancho: '36%' }, { titulo: 'Notes', valor: '{{notes}}' },
        ] }] },
        { titulo: 'Notes', bloques: [{ tipo: 'texto', texto: '{{exam_notes}}{{^exam_notes}}No notes.{{/exam_notes}}' }] },
      ],
      firmas: [PROVIDER],
      pie: 'Periodontal exam',
    },
    ejemplo: {
      exam_date: 'November 25, 2026',
      teeth: [
        { tooth: '2', mobility: 'Class I', buccal_pd: '4 3 5', buccal_cal: '5 3 6', buccal_bop: 'D, M', lingual_pd: '3 3 4', lingual_cal: '3 3 4', lingual_bop: '—' },
        { tooth: '3', mobility: '—', buccal_pd: '3 2 3', buccal_cal: '3 2 3', buccal_bop: '—', lingual_pd: '3 2 3', lingual_cal: '3 2 3', lingual_bop: '—' },
        { tooth: '14', mobility: '—', buccal_pd: '5 4 6', buccal_cal: '6 4 7', buccal_bop: 'D, Mid, M', lingual_pd: '4 3 4', lingual_cal: '4 3 4', lingual_bop: 'M' },
        { tooth: '19', mobility: 'Class II', buccal_pd: '6 5 6', buccal_cal: '7 6 7', buccal_bop: 'D, M', lingual_pd: '5 4 5', lingual_cal: '6 4 6', lingual_bop: 'D' },
        { tooth: '30', mobility: '—', buccal_pd: '3 2 3', buccal_cal: '3 2 3', buccal_bop: '—', lingual_pd: '2 2 3', lingual_cal: '2 2 3', lingual_bop: '—' },
      ],
      findings: [
        { tooth: '14', finding: 'Localized chronic periodontitis', notes: 'Bleeding on probing on three buccal sites.' },
        { tooth: '19', finding: 'Furcation involvement, grade II', notes: 'Re-evaluate after scaling and root planing.' },
      ],
      exam_notes: 'Recommend scaling and root planing in the upper left and lower left quadrants. Re-evaluation in 6 weeks.',
      ...FIRMADO_PROVIDER,
    },
  },
  {
    id: 'radiographic-exam',
    categoria: 'Clinical records',
    nombre: 'Radiographic exam',
    cuando: 'Download from the patient documents once the radiographic exam is saved.',
    firma: 'The provider who read the images.',
    origen: 'propuesta',
    completado: ['The whole layout: no PDF of this exam exists yet'],
    jira: ['CON-1649', 'CON-1657', 'CON-1658', 'CON-4115'],
    hoja: {
      tipo: 'Radiographic exam',
      titulo: '{{patient_name}}',
      meta: ['Exam date', '{{exam_date}}'],
      resumen: [...RESUMEN_PACIENTE, ['Exam date', '{{exam_date}}'], ['Provider', '{{provider_name}}'], ['Images', '{{image_count}}']],
      secciones: [
        { titulo: 'Images', bloques: [{ tipo: 'imagenes', lista: 'images', imagen: '{{image_url}}', titulo: '{{name}}', detalle: '{{taken_date}} · Teeth {{teeth}}', vacio: 'No images in this exam.' }] },
        { titulo: 'Findings', bloques: [{ tipo: 'tabla', lista: 'findings', vacio: 'No findings recorded.', columnas: [
          { titulo: 'Tooth', valor: '{{tooth}}', ancho: '9%' }, { titulo: 'Finding', valor: '{{finding}}', ancho: '36%' }, { titulo: 'Notes', valor: '{{notes}}' },
        ] }] },
        { titulo: 'Notes', bloques: [{ tipo: 'texto', texto: '{{exam_notes}}{{^exam_notes}}No notes.{{/exam_notes}}' }] },
      ],
      firmas: [PROVIDER],
      pie: 'Radiographic exam',
    },
    ejemplo: {
      exam_date: 'November 25, 2026',
      image_count: '2',
      images: [
        { image_url: '{{assets_url}}/sample-panoramic.jpg', name: 'Panoramic', taken_date: 'November 25, 2026', teeth: 'All' },
        { image_url: '{{assets_url}}/sample-periapical.jpg', name: 'Periapical', taken_date: 'November 25, 2026', teeth: '18, 19, 20' },
      ],
      findings: [{ tooth: '19', finding: 'Periapical radiolucency', notes: 'Consistent with chronic apical periodontitis. Refer for endodontic evaluation.' }],
      exam_notes: '',
      ...FIRMADO_PROVIDER,
    },
  },
  {
    id: 'lab-order',
    categoria: 'Orders',
    nombre: 'Lab order',
    cuando: 'When the lab order changes to Requested; PDF in Pending tasks and in the lab order.',
    firma: 'Not signed. It goes to the receiving laboratory.',
    origen: 'app',
    jira: ['CON-2215', 'CON-2220', 'CON-2643', 'CON-4115'],
    hoja: {
      tipo: 'Lab order',
      titulo: '{{patient_name}}',
      meta: ['Expiration date', '{{expiration_date}}'],
      resumen: [
        ['Provider', '{{provider_name}}'], ['Laboratory', '{{lab_name}}'], ['Patient Phone', '{{patient_phone}}'],
        ['Email', '{{provider_email}}'], ['Expiration Date', '{{expiration_date}}'],
      ],
      secciones: [
        { titulo: 'Patient Information', bloques: [{ tipo: 'campos', campos: [['Name', '{{patient_name}}'], ['Phone', '{{patient_phone}}'], ['Email', '{{patient_email}}'], ['Address', '{{patient_address}}']] }] },
        { titulo: 'Receiving Laboratory', bloques: [{ tipo: 'campos', campos: [['Name', '{{lab_name}}'], ['Phone', '{{lab_phone}}'], ['Email', '{{lab_email}}'], ['Address', '{{lab_address}}']] }] },
        { titulo: 'Provider Information', bloques: [{ tipo: 'campos', campos: [['Name', '{{provider_name}}'], ['Email', '{{provider_email}}']] }] },
        { titulo: 'Dental Work Request', bloques: [{ tipo: 'texto', texto: '{{work_request}}' }] },
        { titulo: 'Teeth & Surface Specifications', bloques: [{ tipo: 'boca', lista: 'teeth', denticion: '{{dentition}}' }] },
      ],
      pie: 'Lab order',
    },
    ejemplo: {
      expiration_date: 'December 9, 2026',
      lab_name: 'Olivos Laboratory', lab_phone: '+1 212 5550142', lab_email: 'orders@olivoslab.com', lab_address: '410 Park Ave, 3, New York, 10022, NY, US',
      work_request: 'Zirconia bridge, three units, shade B1.',
      dentition: 'Permanent',
      teeth: [{ tooth: '19', surfaces: '' }, { tooth: '20', surfaces: 'O' }, { tooth: '21', surfaces: 'M, D' }],
    },
  },
  {
    id: 'prescription',
    categoria: 'Orders',
    nombre: 'Prescription',
    cuando: 'PDF icon of an Active prescription (Pending tasks, Clinical Mode, patient documents).',
    firma: 'The prescriber.',
    origen: 'propuesta',
    completado: ['Layout: the app PDF only lists the task data', 'Fields from New Prescription (CON-2230)'],
    jira: ['CON-2230', 'CON-2287', 'CON-3034', 'CON-4115'],
    hoja: {
      tipo: 'Prescription',
      titulo: '{{patient_name}}',
      meta: ['Issued', '{{issued_date}}'],
      resumen: [
        ['Patient', '{{patient_name}}'], ['Date of birth', '{{patient_birth_date}}'], ['Phone', '{{patient_phone}}'],
        ['Prescriber', '{{provider_name}}'], ['Expiration date', '{{expiration_date}}'],
      ],
      secciones: [
        { titulo: 'Medications', bloques: [{ tipo: 'tarjetas', lista: 'medications', titulo: '{{drug_name}} {{strength}} · {{dosage_form}}', campos: [
          ['Directions', '{{dose}} {{route}}, {{frequency}}, for {{duration}}'],
          ['Quantity to dispense', '{{quantity}}'], ['Refills', '{{refills}}'],
          ['Generic substitution', '{{generic_substitution}}'], ['Controlled substance', '{{controlled_substance}}'],
        ] }] },
        { titulo: 'Additional indications', bloques: [{ tipo: 'texto', texto: '{{additional_indications}}{{^additional_indications}}No additional indications.{{/additional_indications}}' }] },
      ],
      firmas: [{ rol: 'Prescriber', prefijo: 'provider' }],
      pie: 'Prescription',
    },
    ejemplo: {
      issued_date: 'November 25, 2026', expiration_date: 'May 25, 2027',
      medications: [
        { drug_name: 'Amoxicillin', strength: '500 mg', dosage_form: 'Capsule', dose: '1 capsule', route: 'oral', frequency: 'every 8 hours', duration: '7 days', quantity: '21', refills: '0', generic_substitution: 'Allowed', controlled_substance: 'No' },
        { drug_name: 'Ibuprofen', strength: '400 mg', dosage_form: 'Tablet', dose: '1 tablet', route: 'oral', frequency: 'every 6 hours', duration: '3 days', quantity: '12', refills: '0', generic_substitution: 'Allowed', controlled_substance: 'No' },
      ],
      additional_indications: 'Take after meals. Stop ibuprofen if stomach pain appears.',
      ...FIRMADO_PROVIDER,
    },
  },
  {
    id: 'referral',
    categoria: 'Orders',
    nombre: 'Referral',
    cuando: 'PDF of a referral (Pending tasks, Clinical Mode, patient documents).',
    firma: 'The referring provider. It goes to the referred contact.',
    origen: 'propuesta',
    completado: ['Layout: the app PDF only lists the task data', 'Fields from New Referral (CON-2322) and the provider type and specialty (CON-3128)', 'Findings and diagnoses of each procedure (CON-2616)', 'Attachments as annexes, one page each'],
    jira: ['CON-2322', 'CON-3033', 'CON-3128', 'CON-2616', 'CON-4115'],
    hoja: {
      tipo: 'Referral',
      titulo: '{{patient_name}}',
      meta: ['Created', '{{created_date}}'],
      resumen: [
        ['Patient', '{{patient_name}}'], ['Date of birth', '{{patient_birth_date}}'], ['Phone', '{{patient_phone}}'],
        ['Referring provider', '{{provider_name}}'], ['ASAP', '{{asap}}'], ['Mandatory to continue treatment', '{{mandatory}}'],
      ],
      secciones: [
        { titulo: 'Referred to', bloques: [{ tipo: 'campos', campos: [
          ['Name', '{{contact_name}}'], ['Provider type', '{{contact_type}}'], ['Specialty', '{{contact_specialty}}'],
          ['Phone', '{{contact_phone}}'], ['Email', '{{contact_email}}'], ['Address', '{{contact_address}}'],
        ] }] },
        { titulo: 'Procedures to refer', bloques: [{ tipo: 'tabla', lista: 'procedures', vacio: 'No procedures selected.', columnas: COLS_PROCEDIMIENTO }] },
        { titulo: 'Referral note', bloques: [{ tipo: 'texto', texto: '{{referral_note}}' }] },
        { titulo: 'Attachments', bloques: [
          { tipo: 'tabla', lista: 'attachments', vacio: 'No attachments.', columnas: [
            { titulo: 'Annex', valor: '{{annex_label}}', ancho: '12%' }, { titulo: 'File', valor: '{{name}}' }, { titulo: 'Type', valor: '{{file_type}}', ancho: '16%' },
          ] },
          { tipo: 'nota', texto: 'Each attachment follows this document as an annex, on its own page.' },
        ] },
      ],
      firmas: [{ rol: 'Referring provider', prefijo: 'provider' }],
      anexos: 'attachments',
      pie: 'Referral',
    },
    ejemplo: {
      created_date: 'November 25, 2026', asap: 'Yes', mandatory: 'Yes',
      contact_name: 'Dr. Mark Bennett', contact_type: 'Dentist', contact_specialty: 'Endodontics',
      contact_phone: '+1 646 5550110', contact_email: 'mbennett@rootcare.com', contact_address: '120 W 57th St, 8, New York, 10019, NY, US',
      procedures: [{ code: 'D3330', description: 'Endodontic therapy, molar tooth', anatomic_area: '19', findings: [{ description: 'Periapical radiolucency' }], diagnoses: [{ code: 'K04.5', description: 'Chronic apical periodontitis' }] }],
      referral_note: 'Periapical radiolucency on #19. Please evaluate for root canal treatment before we place the crown.',
      attachments: [
        { annex_label: 'A', name: 'Periapical_19.jpg', file_type: 'Image', is_image: true, file_url: '{{assets_url}}/sample-periapical.jpg' },
        { annex_label: 'B', name: 'Radiographic report.pdf', file_type: 'PDF', is_image: false, file_url: '' },
      ],
      ...FIRMADO_PROVIDER,
    },
  },
  {
    id: 'treatment-plan',
    categoria: 'Treatment & consent',
    nombre: 'Treatment plan',
    cuando: 'When the case is presented to the patient; download from the treatment plan and patient documents.',
    firma: 'Not signed. The patient accepts it with the treatment acceptance consent.',
    origen: 'propuesta',
    completado: ['The whole layout', 'Findings and diagnoses of each procedure (CON-2204)', 'Amounts and estimate disclaimer from Estimate details'],
    jira: ['CON-1634', 'CON-2036', 'CON-1598', 'CON-2204', 'CON-3710', 'CON-4115'],
    hoja: {
      tipo: 'Treatment plan',
      titulo: '{{case_name}}',
      meta: ['Presented', '{{presented_date}}'],
      resumen: [...RESUMEN_PACIENTE, ['Provider', '{{provider_name}}'], ['Status', '{{case_status}}'], ['Insurance', '{{insurance_name}}']],
      secciones: [
        { titulo: 'Procedures by visit', bloques: [{ tipo: 'grupos', lista: 'visits', titulo: '{{visit_name}}', tabla: {
          lista: 'procedures', vacio: 'No procedures.', columnas: [...COLS_PROCEDIMIENTO, ...COLS_IMPORTES],
          subtotal: { rotulo: '{{visit_name}} subtotal', valores: ['{{visit_fee}}', '{{visit_insurance_portion}}', '{{visit_insurance_adjustment}}', '{{visit_patient_portion}}'] },
        } }] },
        { titulo: 'Estimate', bloques: [IMPORTES] },
        { titulo: 'Notes', bloques: [{ tipo: 'texto', texto: '{{case_notes}}{{^case_notes}}No notes.{{/case_notes}}' }] },
      ],
      pie: 'Treatment plan',
    },
    ejemplo: {
      case_name: 'Restorative plan', presented_date: 'November 25, 2026', case_status: 'Presented', insurance_name: 'Delta Dental PPO',
      visits: [
        { visit_name: 'Visit 1', visit_fee: '$1,180.00', visit_insurance_portion: '$780.00', visit_insurance_adjustment: '$173.00', visit_patient_portion: '$227.00', procedures: [PROC_ENDODONCIA, PROC_PROFILAXIS] },
        { visit_name: 'Visit 2', visit_fee: '$1,250.00', visit_insurance_portion: '$850.00', visit_insurance_adjustment: '$187.50', visit_patient_portion: '$212.50', procedures: [PROC_CORONA] },
      ],
      ...TOTALES_CASO,
      case_notes: 'Root canal first; crown once the tooth is asymptomatic.',
    },
  },
  {
    id: 'procedure-consent',
    categoria: 'Treatment & consent',
    nombre: 'Procedure consent',
    cuando: 'When the consent is requested; View consent and Download PDF in the treatment plan.',
    firma: 'The patient (or legal guardian) and the provider.',
    origen: 'app',
    jira: ['CON-195', 'CON-4119', 'CON-4115'],
    hoja: {
      tipo: 'Informed consent',
      titulo: '{{consent_title}}',
      meta: ['Consent sent', '{{sent_date}}'],
      resumen: [...RESUMEN_PACIENTE, ['Provider', '{{provider_name}}'], ['Appointment', '{{appointment}}'], ['Procedure', '{{procedure_name}}']],
      secciones: [
        { titulo: 'Diagnosis', bloques: [{ tipo: 'texto', texto: '{{diagnosis}}' }] },
        { titulo: 'Clinical findings', bloques: [{ tipo: 'texto', texto: '{{clinical_findings}}' }] },
        { titulo: 'Nature of procedure', bloques: [{ tipo: 'texto', texto: '{{nature_of_procedure}}' }] },
        { titulo: 'Risk and complications', bloques: [{ tipo: 'lista', lista: 'risks', valor: '{{text}}', vacio: 'No content yet.' }] },
        { titulo: 'Patient acknowledgment', bloques: [{ tipo: 'casillas', items: RECONOCIMIENTOS, marcada: 'patient_signed_date', aviso: 'All acknowledgment checkboxes must be completed before the patient can sign the consent.' }] },
      ],
      firmas: [PACIENTE, PROVIDER],
      pie: 'Informed consent',
    },
    ejemplo: {
      consent_title: 'Tooth extraction consent', sent_date: '09/23/2026 — 10:30 AM', appointment: '10/15/2026 · 9:00 AM', procedure_name: 'D7140 · Extraction, erupted tooth',
      diagnosis: 'Non-restorable tooth with recurrent infection.',
      clinical_findings: 'Extensive decay affecting tooth structure and surrounding tissue.',
      nature_of_procedure: 'Removal of the tooth under local anesthesia. The socket is cleaned and, if needed, closed with stitches.',
      risks: [{ text: 'Pain, swelling and bruising for a few days.' }, { text: 'Bleeding after the procedure.' }, { text: 'Dry socket.' }, { text: 'Numbness of the lip, chin or tongue, usually temporary.' }],
      ...FIRMADO_PACIENTE, ...FIRMADO_PROVIDER,
    },
  },
  {
    id: 'treatment-acceptance',
    categoria: 'Treatment & consent',
    nombre: 'Treatment acceptance consent',
    cuando: 'Generated and sent when every case of the treatment plan has a decision; one for the accepted case.',
    firma: 'The patient (or legal guardian) and the provider.',
    origen: 'propuesta',
    completado: ['The whole layout', 'The acknowledgment statements', 'Findings and diagnoses of each procedure (CON-2204)'],
    jira: ['CON-2923', 'CON-2715', 'CON-3571', 'CON-2204', 'CON-4115'],
    hoja: {
      tipo: 'Treatment acceptance consent',
      titulo: '{{case_name}}',
      meta: ['Consent sent', '{{sent_date}}'],
      resumen: [...RESUMEN_PACIENTE, ['Provider', '{{provider_name}}'], ['Treatment plan', '{{treatment_plan_name}}'], ['Patient portion', '{{total_patient_portion}}']],
      secciones: [
        { titulo: 'Accepted treatment', bloques: [{ tipo: 'tabla', lista: 'procedures', vacio: 'No procedures.', columnas: [...COLS_PROCEDIMIENTO, ...COLS_IMPORTES] }] },
        { titulo: 'Estimate', bloques: [IMPORTES] },
        { titulo: 'Consent', bloques: [{ tipo: 'html', variable: 'consent_text_html' }] },
        { titulo: 'Patient acknowledgment', bloques: [{ tipo: 'casillas', marcada: 'patient_signed_date', items: [
          'I have reviewed the treatment and the procedures listed above.',
          'I understand the estimated cost and that it may change if the treatment changes.',
          'I understand the risks, benefits, and alternatives explained by my provider.',
          'I accept the treatment described in this document.',
        ] }] },
      ],
      firmas: [PACIENTE, PROVIDER],
      pie: 'Treatment acceptance consent',
    },
    ejemplo: {
      case_name: 'Restorative plan', treatment_plan_name: 'Treatment plan 2026', sent_date: '11/25/2026 — 10:30 AM',
      procedures: [PROC_ENDODONCIA, PROC_PROFILAXIS, PROC_CORONA],
      ...TOTALES_CASO,
      consent_text_html: TEXTO_TEMPLATE,
      ...FIRMADO_PACIENTE, ...FIRMADO_PROVIDER,
    },
  },
  {
    id: 'treatment-refusal',
    categoria: 'Treatment & consent',
    nombre: 'Informed refusal',
    cuando: 'Generated and sent with the acceptance consent; one for each discarded case.',
    firma: 'The patient (or legal guardian) and the provider.',
    origen: 'propuesta',
    completado: ['The whole layout', 'The acknowledgment statements', 'Findings and diagnoses of each procedure (CON-2204)'],
    jira: ['CON-2923', 'CON-2716', 'CON-2204', 'CON-4115'],
    hoja: {
      tipo: 'Informed refusal',
      titulo: '{{case_name}}',
      meta: ['Consent sent', '{{sent_date}}'],
      resumen: [...RESUMEN_PACIENTE, ['Provider', '{{provider_name}}'], ['Treatment plan', '{{treatment_plan_name}}'], ['Decision recorded', '{{decision_date}}']],
      secciones: [
        { titulo: 'Declined treatment', bloques: [{ tipo: 'tabla', lista: 'procedures', vacio: 'No procedures.', columnas: COLS_PROCEDIMIENTO }] },
        { titulo: 'Consent', bloques: [{ tipo: 'html', variable: 'consent_text_html' }] },
        { titulo: 'Patient acknowledgment', bloques: [{ tipo: 'casillas', marcada: 'patient_signed_date', items: [
          'I was informed of the recommended treatment and why it is recommended.',
          'I was informed of the possible consequences of not having it.',
          'I had the opportunity to ask questions and received satisfactory answers.',
          'I decline the treatment described in this document.',
        ] }] },
      ],
      firmas: [PACIENTE, PROVIDER],
      pie: 'Informed refusal',
    },
    ejemplo: {
      case_name: 'Extraction and implant', treatment_plan_name: 'Treatment plan 2026', sent_date: '11/25/2026 — 10:30 AM', decision_date: 'November 25, 2026',
      procedures: [
        { code: 'D7140', description: 'Extraction, erupted tooth', anatomic_area: '19', findings: [{ description: 'Periapical radiolucency' }], diagnoses: [{ code: 'K04.5', description: 'Chronic apical periodontitis' }] },
        { code: 'D6010', description: 'Implant body, endosteal', anatomic_area: '19', findings: [], diagnoses: [] },
      ],
      consent_text_html: '<p>Your provider explained the treatment described above and what can happen if it is not done, including worsening infection, pain, and the loss of the tooth.</p><p>You can ask for this treatment again at any time.</p>',
      ...FIRMADO_PACIENTE, ...FIRMADO_PROVIDER,
    },
  },
]

export const CATEGORIAS = [...new Set(PDFS.map((p) => p.categoria))]

/** El HTML de la plantilla, con sus {{variables}} y {{#listas}}: lo que se le entrega al backend. */
export const htmlDe = (p: Pdf) => armarHoja(p.hoja)
/** Datos de ejemplo completos (comunes + del documento). Las imágenes de ejemplo cuelgan de `assets`: la carpeta
    public/pdfs/ donde se publique. */
export function ejemploDe(p: Pdf, assets: string): Datos {
  const poner = (v: Datos[string]): Datos[string] =>
    typeof v === 'string' ? v.replace('{{assets_url}}', assets) : Array.isArray(v) ? v.map((d) => Object.fromEntries(Object.entries(d).map(([k, x]) => [k, poner(x)]))) : v
  return Object.fromEntries(Object.entries({ ...COMUNES, ...p.ejemplo }).map(([k, v]) => [k, poner(v)]))
}
/** Si lleva firmas: la vista previa deja ver la hoja firmada o sin firmar. */
export const llevaFirmas = (p: Pdf) => !!p.hoja.firmas?.length
/** Los datos de ejemplo sin firmar: las fechas e imágenes de firma vacías. */
export function sinFirmas(datos: Datos): Datos {
  return Object.fromEntries(Object.entries(datos).map(([k, v]) => [k, /_signed_date$|_signature_image$/.test(k) ? '' : k === 'has_addenda' ? false : v]))
}
