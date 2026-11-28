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

/* La nota clínica es texto (CON-2975): un finding de examen es "{finding} on #{tooth}/{surface} or location [details: (…)].({note})".
   "Documents sent: Yes" sólo si se adjuntó un archivo a la orden. */
const FINDING = '<li>{{finding}} on {{location}}{{#details}} [details: ({{details}})]{{/details}}.{{#note}} ({{note}}){{/note}}</li>'
const DOCUMENTOS_ENVIADOS = '{{#document_sent}}<p><b>Documents sent:</b> Yes</p>{{/document_sent}}'

/* Documents Uploaded, como el PDF de red.dev (archivo y peso) más el anexo donde va cada uno: los adjuntos siguen al
   documento, cada uno en su hoja (`Hoja.anexos`; Julián, 2026-11-27). */
const DOCUMENTOS: Bloque = { tipo: 'tabla', lista: 'attachments', vacio: 'No documents uploaded.', columnas: [
  { titulo: 'Annex', valor: '{{#has_file}}{{annex_label}}{{/has_file}}{{^has_file}}—{{/has_file}}', ancho: '12%' }, { titulo: 'File', valor: '{{name}}' }, { titulo: 'Type', valor: '{{file_type}}', ancho: '14%' }, { titulo: 'Size', valor: '{{file_size}}', derecha: true, ancho: '14%' },
] }

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
    firma: 'Only the provider: name, date and time, and the content hash. Addenda are signed by their author.',
    origen: 'propuesta',
    completado: [
      'Texts and order from the clinical note spec (CON-2975, CON-3081, CON-3605, CON-3668) and the notes generated in red.dev',
      'Orders and workflows as label and value: the spec does not give their text',
      'Additional Notes and Addenda (CON-2730), not in the spec',
    ],
    jira: ['CON-2975', 'CON-3081', 'CON-3605', 'CON-3668', 'CON-2727', 'CON-2728', 'CON-2816', 'CON-2617', 'CON-1619', 'CON-2055', 'CON-2191', 'CON-2615', 'CON-2614', 'CON-2616', 'CON-2620', 'CON-2621', 'CON-2730', 'CON-2937', 'CON-2641', 'CON-2643', 'CON-4115'],
    hoja: {
      tipo: 'Dental clinical note',
      titulo: '{{patient_name}}',
      encabezado: { nombre: '{{provider_name}}', datos: [['Date of birth', '{{patient_birth_date}}'], ['Date of visit', '{{visit_date}} — {{visit_time}}'], ['Contact', '{{patient_phone}}']] },
      aviso: '{{#auto_generated}}<p class="aviso">Generated automatically when the encounter closed after 48 hours without activity. Workflow narratives are not included.</p>{{/auto_generated}}',
      secciones: [
        { titulo: 'Vital Signs', si: 'has_vitals', bloques: [{ tipo: 'libre', html: `<p>Patient vitals were taken:</p>
<ul class="lista">{{#height_in}}<li>Height {{height_in}} in, Weight {{weight_lb}} pounds; BMI {{bmi}}.</li>{{/height_in}}{{#blood_pressure}}<li>Blood pressure: {{blood_pressure}} mmHg.</li>{{/blood_pressure}}{{#heart_rate}}<li>Heart rate: {{heart_rate}} bpm.</li>{{/heart_rate}}{{#respiratory_rate}}<li>Respiratory rate: {{respiratory_rate}} rpm.</li>{{/respiratory_rate}}{{#temperature}}<li>Temperature: {{temperature}} °F.</li>{{/temperature}}{{#oxygen_saturation}}<li>Oxygen saturation: {{oxygen_saturation}} %.</li>{{/oxygen_saturation}}</ul>
{{#out_of_range_values}}<p><b>Out of range values:</b> {{out_of_range_values}}.</p>{{/out_of_range_values}}{{#vitals_notes}}<p><b>Notes:</b> {{vitals_notes}}</p>{{/vitals_notes}}` }] },
        { titulo: 'Medical History', bloques: [
          { tipo: 'libre', html: `<p class="rotulo">Past medical conditions:{{^past_medical_conditions}} <span>Patient reports no known medical conditions.</span>{{/past_medical_conditions}}</p>
<ul class="lista">{{#past_medical_conditions}}<li>{{name}} {{status}} ({{start_date}}).{{#notes}} {{notes}}{{/notes}}</li>{{/past_medical_conditions}}</ul>` },
          { tipo: 'lista', rotulo: 'Current medications:', lista: 'current_medications', vacio: 'Patient reports no current medications.', valor: '<b>{{name}}</b> {{dose}} {{unit}} · {{frequency}} · {{status}} ({{start_date}}).{{#notes}} {{notes}}{{/notes}}' },
          { tipo: 'lista', rotulo: 'Known allergies:', lista: 'known_allergies', vacio: 'No known allergies reported.', valor: 'Allergy to {{allergen}} ({{start_date}}).{{#notes}} {{notes}}{{/notes}}<ul class="lista">{{#reactions}}<li>{{category}} – {{symptom}}</li>{{/reactions}}{{#severity}}<li>Severity: {{severity}}</li>{{/severity}}</ul>' },
          { tipo: 'lista', rotulo: 'Past surgeries and/or hospitalizations:', lista: 'past_surgeries', vacio: 'No past surgeries or hospitalizations reported.', valor: '{{name}} ({{date}}).' },
          { tipo: 'narrativas', lista: 'encounter_questionnaires', titulo: '{{name}}', texto: '{{narrative}}' },
          { tipo: 'libre', html: '{{#has_history_questionnaires}}<h3>Patient History</h3>{{/has_history_questionnaires}}' },
          { tipo: 'narrativas', lista: 'history_questionnaires', titulo: '{{name}}', detalle: 'Completed on {{completed_at}}', texto: '{{narrative}}' },
        ] },
        { titulo: 'Exams', si: 'has_exams', bloques: [{ tipo: 'libre', html: `{{#exams}}<div class="bloque"><p class="bloque-titulo">{{exam_name}} ({{exam_date}}):</p><ul class="lista">{{#findings}}${FINDING}{{/findings}}</ul></div>{{/exams}}
{{#dental_assessment}}<div class="bloque"><p class="bloque-titulo">Dental Assessment ({{dental_assessment_date}}):</p>{{#dental_assessment_no_findings}}<p>The dental assessment showed no significant findings; dentition appears healthy.</p>{{/dental_assessment_no_findings}}<ul class="lista">{{#dental_assessment_findings}}${FINDING}{{/dental_assessment_findings}}</ul>{{#dental_assessment_reviewed}}<p>Dental assessment reviewed: stable with no changes from last exam; prior findings unchanged.{{#dental_assessment_review_note}} Note: {{dental_assessment_review_note}}{{/dental_assessment_review_note}}</p>{{/dental_assessment_reviewed}}</div>{{/dental_assessment}}
{{#radiographic_exams}}<div class="bloque"><p class="bloque-titulo">Radiographic Examination ({{exam_date}}):</p>{{#no_findings}}<p>The radiographic examination indicated no abnormalities; all structures are within normal limits.</p>{{/no_findings}}{{#has_findings}}<p>The radiographic examination revealed:</p><ul class="lista">{{#findings}}${FINDING}{{/findings}}</ul>{{/has_findings}}{{#reviewed}}<p>Radiographic findings reviewed: stable and unchanged from prior radiographs; no new issues.{{#review_note}} Note: {{review_note}}{{/review_note}}</p>{{/reviewed}}</div>{{/radiographic_exams}}
{{#periodontal_exams}}<div class="bloque"><p class="bloque-titulo">Periodontal Examination ({{exam_date}}):</p>{{#reviewed}}<p>Periodontal chart reviewed: no changes since prior charting; status stable.</p>{{/reviewed}}{{#new_charting}}<p>A new periodontal charting was performed, with the following clinically significant findings documented individually for each tooth and respective surfaces.</p>
{{#has_probing_depths}}<p class="rotulo">Probing Depths (≥ 4 mm)</p><ul class="lista">{{#probing_depths}}<li>#{{tooth}} {{surface}}: +{{value}} mm.</li>{{/probing_depths}}</ul>{{/has_probing_depths}}
{{#has_gingival_margin}}<p class="rotulo">Gingival Margin Levels (including +1 mm recession and overgrowth)</p>{{#has_recession}}<p>Recession (+1 mm or greater):</p><ul class="lista">{{#recession}}<li>#{{tooth}} {{surface}}: +{{value}} mm.</li>{{/recession}}</ul>{{/has_recession}}{{#has_overgrowth}}<p>Overgrowth (negative values):</p><ul class="lista">{{#overgrowth}}<li>#{{tooth}} {{surface}}: -{{value}} mm.</li>{{/overgrowth}}</ul>{{/has_overgrowth}}{{/has_gingival_margin}}
{{#has_bleeding}}<p class="rotulo">Bleeding on probing</p><ul class="lista">{{#bleeding}}<li>#{{tooth}} {{surface}}.</li>{{/bleeding}}</ul>{{/has_bleeding}}
{{#has_suppuration}}<p class="rotulo">Suppuration</p><ul class="lista">{{#suppuration}}<li>#{{tooth}} {{surface}}.</li>{{/suppuration}}</ul>{{/has_suppuration}}{{/new_charting}}</div>{{/periodontal_exams}}` }] },
        { titulo: 'Treatment Plan', si: 'has_treatment_plan', bloques: [{ tipo: 'libre', html: `{{#has_treatment_cases}}<p>Treatment plan(s) were proposed that included the following sequence(s) of events for each option presented:</p>
{{#treatment_cases}}<div class="bloque"><p class="bloque-titulo">{{name}} – {{case_type}}{{#recommended}} (Recommended){{/recommended}} · Est. total cost: {{total}}</p>{{#visits}}<p>{{visit_name}} (Est. cost: {{visit_cost}})</p><ul class="lista">{{#procedures}}<li><b>{{code}}</b> — {{description}}{{#anatomic_area}} — {{anatomic_area}}{{/anatomic_area}}.</li>{{/procedures}}</ul>{{/visits}}<p>Patient Decision: {{decision}}</p></div>{{/treatment_cases}}{{/has_treatment_cases}}
{{#consent_presented}}<p><b>Consent Summary:</b> The treatment plan(s) presented, including full BRAINS discussion (Benefits, Risks, Alternatives, Including No Treatment, and Sensible Expectations) for each individual option, were thoroughly reviewed and discussed with the patient in clear, understandable language.</p>
<p>All procedures, potential complications, prognosis, financial implications, treatment sequences, and patient decisions (accepted/declined) for every presented plan were explained in detail. The patient had ample opportunity to ask questions, which were fully answered to their satisfaction. Patient verbalized understanding of each proposed treatment option, associated risks (including but not limited to infection, pain, nerve injury, failure rates &lt;5%, tooth fracture), benefits, reasonable alternatives, and consequences of declination or no treatment.</p>
<p>Written informed consent forms were recorded separately for each presented treatment plan (accepted and/or declined options). All patient decisions have been documented accordingly.</p>{{/consent_presented}}
{{#has_accepted_consents}}<p class="rotulo">The following informed consent(s) were accepted by the patient:</p><ul class="lista">{{#accepted_consents}}<li>{{consent_name}} – {{plan_name}}</li>{{/accepted_consents}}</ul>{{/has_accepted_consents}}` }] },
        { titulo: 'Operative Report', si: 'has_procedures', bloques: [
          { tipo: 'subtitulo', texto: 'Procedure' },
          { tipo: 'libre', html: '<ul class="lista">{{#procedures}}<li><b>{{code}}</b> — {{description}}{{#location}} on <b>{{location}}</b>{{/location}} <em>[{{status}}]</em>.</li>{{/procedures}}</ul>' },
        ] },
        { titulo: 'Workflows', si: 'has_workflows', bloques: [
          { tipo: 'narrativas', lista: 'workflows', titulo: '{{workflow_name}}', texto: '{{narrative}}' },
        ] },
        { titulo: 'Prescriptions', si: 'has_prescriptions', bloques: [
          { tipo: 'tarjetas', lista: 'prescriptions', titulo: 'Prescription · {{status}}', campos: [
            ['Medications', '{{#medications}}<span class="linea">{{drug_brand}} ({{drug}}) {{strength}} {{strength_unit}} {{dosage_form}}: {{dose}} {{dose_unit}}, {{frequency}}, for {{duration_number}} {{duration_unit}}</span>{{/medications}}'],
            ['Indications', '{{indications}}'],
          ], pie: DOCUMENTOS_ENVIADOS },
        ] },
        { titulo: 'Lab Orders', si: 'has_lab_orders', bloques: [
          { tipo: 'tarjetas', lista: 'lab_orders', titulo: '{{laboratory}} · {{status}}', campos: [
            ['Work requested', '{{work_requested}}'],
            ['Procedures', '{{#lab_treatments}}<span class="linea">{{cdt_code}} {{description}} · {{anatomic_area}} · {{treatment_plan}}</span>{{/lab_treatments}}'],
            ['Special instructions', '{{special_instructions}}'], ['ASAP', '{{asap}}'], ['Mandatory to continue treatment', '{{mandatory_to_continue_treatment}}'],
            ['Expiration date', '{{expiration_date}}'],
          ], pie: DOCUMENTOS_ENVIADOS },
        ] },
        { titulo: 'Referrals', si: 'has_referrals', bloques: [
          { tipo: 'tarjetas', lista: 'referrals', titulo: '{{referral}} · {{specialties}} · {{status}}', campos: [
            ['Procedures', '{{#referral_procedures}}<span class="linea">{{cdt_code}} {{description}} · {{anatomic_area}}</span>{{/referral_procedures}}'],
            ['Notes', '{{notes}}'],
          ], pie: DOCUMENTOS_ENVIADOS },
        ] },
        { titulo: 'Additional Notes', si: 'clinical_notes_html', bloques: [{ tipo: 'html', variable: 'clinical_notes_html' }] },
      ],
      firmas: [{ ...PROVIDER, hash: true }],
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
      has_vitals: true,
      height_in: '68', weight_lb: '187', bmi: '28.4', blood_pressure: '145/92', heart_rate: '74', respiratory_rate: '16', temperature: '98.4', oxygen_saturation: '98',
      out_of_range_values: 'Blood pressure',
      vitals_notes: 'Taken seated, before local anesthesia.',
      past_medical_conditions: [{ name: 'Hypertension', status: 'Active', start_date: '03/15/2019', notes: 'Controlled with medication.' }],
      current_medications: [
        { name: 'Lisinopril', dose: '10', unit: 'mg', frequency: 'once daily', status: 'Active', start_date: '03/15/2019', notes: 'The patient has to take it for life.' },
      ],
      known_allergies: [
        { allergen: 'latex', start_date: '01/01/2015', notes: 'Use nitrile gloves.', reactions: [{ category: 'Dermatological', symptom: 'Skin rash' }], severity: 'Mild' },
      ],
      past_surgeries: [{ name: 'Appendectomy', date: '06/10/2012' }],
      encounter_questionnaires: [
        { name: 'Chief Complaint', narrative: 'Patient reports throbbing pain in the lower left back tooth for five days, worse when chewing and with cold drinks.' },
        { name: 'Triage', narrative: 'Pain severity: 7/10. No facial swelling reported. Patient denies fever or difficulty swallowing.' },
      ],
      has_history_questionnaires: true,
      history_questionnaires: [
        { name: 'Family History', completed_at: 'November 20, 2026 at 10:15 AM', narrative: 'Patient reports a family history of diabetes in mother and hypertension in father.' },
        { name: 'Oral History', completed_at: 'November 20, 2026 at 10:12 AM', narrative: 'Patient reports occasional gum bleeding during brushing and sensitivity to cold. Last dental visit two years ago.' },
        { name: 'Social History', completed_at: 'November 20, 2026 at 10:16 AM', narrative: 'Patient reports no tobacco use and occasional alcohol consumption.' },
      ],
      has_exams: true,
      exams: [
        { exam_name: 'Intraoral Examination', exam_date: '11/25/2026', findings: [
          { finding: 'Gingival inflammation', location: 'Left Mandibular Gingiva', details: 'Severity: Mild; Bleeding: Yes', note: '' },
        ] },
      ],
      dental_assessment: true, dental_assessment_date: '11/25/2026', dental_assessment_no_findings: false,
      dental_assessment_findings: [{ finding: 'Deep caries', location: '#19/O, D', details: 'Extent: Deep', note: 'Caries close to the pulp.' }],
      dental_assessment_reviewed: false, dental_assessment_review_note: '',
      radiographic_exams: [
        { exam_date: '11/25/2026', no_findings: false, has_findings: true, reviewed: false, review_note: '', findings: [
          { finding: 'Periapical radiolucency', location: '#19', details: 'Size: 3 mm; Root: Mesial', note: 'Consistent with chronic apical periodontitis.' },
        ] },
        { exam_date: '05/12/2026', no_findings: false, has_findings: false, reviewed: true, review_note: 'Compared with today’s periapical image.', findings: [] },
      ],
      periodontal_exams: [
        { exam_date: '11/25/2026', reviewed: false, new_charting: true,
          has_probing_depths: true, probing_depths: [{ tooth: '18', surface: 'DB', value: '5' }, { tooth: '19', surface: 'B', value: '6' }],
          has_gingival_margin: true, has_recession: true, recession: [{ tooth: '19', surface: 'L', value: '2' }], has_overgrowth: false, overgrowth: [],
          has_bleeding: true, bleeding: [{ tooth: '19', surface: 'B' }, { tooth: '19', surface: 'DB' }], has_suppuration: false, suppuration: [] },
      ],
      has_treatment_plan: true,
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
      has_procedures: true,
      procedures: [
        { code: 'D0140', description: 'Limited oral evaluation – problem focused', location: '', status: 'completed' },
        { code: 'D0220', description: 'Intraoral – periapical first radiographic image', location: '#19', status: 'completed' },
        { code: 'D3221', description: 'Pulpal debridement, primary and permanent teeth', location: '#19', status: 'completed' },
      ],
      has_workflows: true,
      workflows: [
        { workflow_name: 'Local anesthesia', narrative: 'Inferior alveolar nerve block with 1.7 ml of 2% lidocaine with 1:100,000 epinephrine. Aspiration negative. Patient tolerated the procedure well.' },
      ],
      has_prescriptions: true,
      prescriptions: [
        { status: 'Active', indications: 'Take after meals. Stop ibuprofen if stomach pain appears.', document_sent: false, medications: [
          { drug_brand: 'Amoxil', drug: 'Amoxicillin', strength: '500', strength_unit: 'mg', dosage_form: 'capsule', dose: '1', dose_unit: 'capsule', frequency: 'every 8 hours', duration_number: '7', duration_unit: 'days' },
          { drug_brand: 'Advil', drug: 'Ibuprofen', strength: '400', strength_unit: 'mg', dosage_form: 'tablet', dose: '1', dose_unit: 'tablet', frequency: 'every 6 hours', duration_number: '3', duration_unit: 'days' },
        ] },
      ],
      has_lab_orders: true,
      lab_orders: [
        { laboratory: 'Olivos Laboratory', status: 'Requested', work_requested: 'Zirconia crown, shade A2.', special_instructions: 'Send the try-in before final glazing.', asap: 'No', mandatory_to_continue_treatment: 'Yes', expiration_date: '12/09/2026', document_sent: true, lab_treatments: [
          { cdt_code: 'D2740', description: 'Crown, porcelain/ceramic', anatomic_area: '19', treatment_plan: 'Restorative plan' },
        ] },
      ],
      has_referrals: true,
      referrals: [
        { referral: 'Dr. Mark Bennett', specialties: 'Endodontics', status: 'Sent', notes: 'Please evaluate #19 for root canal treatment before we place the crown.', document_sent: true, referral_procedures: [
          { cdt_code: 'D3330', description: 'Endodontic therapy, molar tooth', anatomic_area: '19' },
        ] },
      ],
      clinical_notes_html: '<p>Patient responsibilities were discussed including but not limited to daily care, use/misuse, regular maintenance appointments, and routine examination of underlying oral tissues.</p><p>The patient was discharged to return home in satisfactory condition.</p>',
      ...FIRMADO_PROVIDER,
      provider_signed_date: 'November 25, 2026 at 10:02 AM',
      provider_signature_hash: 'sha256:9f2c4e1a7b3d5e8f0a6c2b9d4e7f1a3c5b8d0e2f4a6c8b1d3e5f7a9c0b2d4e6f',
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
      encabezado: { nombre: '{{provider_name}}', datos: [['Date of birth', '{{patient_birth_date}}'], ['Patient ID', '{{patient_id}}'], ['Exam date', '{{exam_date}}'], ['Location', '{{location_name}}']] },
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
      encabezado: { nombre: '{{provider_name}}', datos: [['Date of birth', '{{patient_birth_date}}'], ['Patient ID', '{{patient_id}}'], ['Exam date', '{{exam_date}}'], ['Images', '{{image_count}}']] },
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
    cuando: 'When the lab order changes to Requested; the document icon in the lab orders table, in the lab order and in Pending tasks.',
    firma: 'Not signed. It goes to the receiving laboratory.',
    origen: 'app',
    completado: ['Same data and order as the red.dev document; attachments also go as annexes, one page each'],
    jira: ['CON-2215', 'CON-2220', 'CON-2584', 'CON-2643', 'CON-4115'],
    hoja: {
      tipo: 'Lab order',
      titulo: '{{patient_name}}',
      /* El encabezado del PDF de red.dev: provider, Lab Order ID, teléfono del paciente, mail del provider y vencimiento. */
      encabezado: { nombre: '{{provider_name}}', datos: [['Lab Order ID', '{{lab_order_id}}'], ['Patient Phone', '{{patient_phone}}'], ['Email', '{{provider_email}}'], ['Expiration Date', '{{expiration_date}}']] },
      secciones: [
        { titulo: 'Patient Information', bloques: [{ tipo: 'campos', campos: [['Name', '{{patient_name}}'], ['Phone', '{{patient_phone}}'], ['Email', '{{patient_email}}'], ['Address', '{{patient_address}}']] }] },
        { titulo: 'Receiving Laboratory', bloques: [{ tipo: 'campos', campos: [['Name', '{{lab_name}}'], ['Phone', '{{lab_phone}}'], ['Email', '{{lab_email}}'], ['Address', '{{lab_address}}']] }] },
        { titulo: 'Provider Information', bloques: [{ tipo: 'campos', campos: [['Name', '{{provider_name}}'], ['Email', '{{provider_email}}']] }] },
        { titulo: 'Dental Work Request', bloques: [{ tipo: 'texto', texto: '{{work_request}}' }] },
        /* Como el PDF de red.dev: sin dientes, sin indicaciones o sin adjuntos, la sección no sale. */
        { titulo: 'Teeth & Surface Specifications', si: 'has_teeth', bloques: [{ tipo: 'boca', lista: 'teeth', denticion: '{{dentition}}' }] },
        { titulo: 'Special Instructions', si: 'special_instructions', bloques: [{ tipo: 'texto', texto: '{{special_instructions}}' }] },
        { titulo: 'Documents Uploaded', si: 'has_documents', bloques: [DOCUMENTOS] },
      ],
      anexos: 'attachments',
      pie: 'Lab order',
    },
    ejemplo: {
      lab_order_id: '019d699e-935f-7ee6-9945-46a1628442d0',
      expiration_date: 'December 9, 2026',
      lab_name: 'Olivos Laboratory', lab_phone: '+1 212 5550142', lab_email: 'orders@olivoslab.com', lab_address: '410 Park Ave, 3, New York, 10022, NY, US',
      work_request: 'Zirconia bridge, three units, shade B1.',
      dentition: 'Permanent',
      has_teeth: true,
      teeth: [{ tooth: '19', surfaces: '' }, { tooth: '20', surfaces: 'O' }, { tooth: '21', surfaces: 'M, D' }],
      special_instructions: 'Send the try-in before final glazing.',
      has_documents: true,
      attachments: [
        { annex_label: 'A', name: 'Shade_photo_19.jpg', file_type: 'Image', file_size: '185 KB', has_file: true, is_image: true, file_url: '{{assets_url}}/sample-periapical.jpg' },
      ],
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
      /* El encabezado del PDF de red.dev: provider, Prescription ID, teléfono del paciente, mail del provider, Valid From y vencimiento. */
      encabezado: { nombre: '{{provider_name}}', datos: [['Prescription ID', '{{prescription_id}}'], ['Patient Phone', '{{patient_phone}}'], ['Email', '{{provider_email}}'], ['Valid From', '{{issued_date}}'], ['Expiration Date', '{{expiration_date}}']] },
      secciones: [
        /* Como el PDF de red.dev, más la fecha de nacimiento (identifica al paciente en la farmacia). */
        { titulo: 'Patient Information', bloques: [{ tipo: 'campos', campos: [['Name', '{{patient_name}}'], ['Date of birth', '{{patient_birth_date}}'], ['Phone', '{{patient_phone}}'], ['Email', '{{patient_email}}'], ['Address', '{{patient_address}}']] }] },
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
      prescription_id: '019E8941', issued_date: 'November 25, 2026', expiration_date: 'May 25, 2027',
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
    cuando: 'While the referral is Requested; the document icon in the referrals table, in the referral and in Pending tasks.',
    firma: 'The referring provider. It goes to the referred contact.',
    origen: 'propuesta',
    completado: ['Layout: the app PDF only lists the task data', 'Fields from New Referral (CON-2322) and the provider type and specialty (CON-3128)', 'Findings and diagnoses of each procedure (CON-2616)', 'Attachments as annexes, one page each'],
    jira: ['CON-2322', 'CON-3033', 'CON-3128', 'CON-2616', 'CON-4115'],
    hoja: {
      tipo: 'Referral',
      titulo: '{{patient_name}}',
      encabezado: { nombre: '{{provider_name}}', datos: [['Patient Phone', '{{patient_phone}}'], ['Email', '{{provider_email}}'], ['Created', '{{created_date}}'], ['ASAP', '{{asap}}'], ['Mandatory to continue treatment', '{{mandatory}}']] },
      secciones: [
        /* Las secciones de los documentos de red.dev (Lab order, Prescription): primero el paciente, después a quién
           se deriva y quién deriva. */
        { titulo: 'Patient Information', bloques: [{ tipo: 'campos', campos: [['Name', '{{patient_name}}'], ['Date of birth', '{{patient_birth_date}}'], ['Phone', '{{patient_phone}}'], ['Email', '{{patient_email}}'], ['Address', '{{patient_address}}']] }] },
        { titulo: 'Referred Provider', bloques: [{ tipo: 'campos', campos: [
          ['Name', '{{contact_name}}'], ['Provider type', '{{contact_type}}'], ['Specialty', '{{contact_specialty}}'],
          ['Phone', '{{contact_phone}}'], ['Email', '{{contact_email}}'], ['Address', '{{contact_address}}'],
        ] }] },
        { titulo: 'Provider Information', bloques: [{ tipo: 'campos', campos: [['Name', '{{provider_name}}'], ['Email', '{{provider_email}}']] }] },
        { titulo: 'Procedures to refer', bloques: [{ tipo: 'tabla', lista: 'procedures', vacio: 'No procedures selected.', columnas: COLS_PROCEDIMIENTO }] },
        { titulo: 'Referral note', si: 'referral_note', bloques: [{ tipo: 'texto', texto: '{{referral_note}}' }] },
        { titulo: 'Documents Uploaded', si: 'has_documents', bloques: [DOCUMENTOS] },
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
      has_documents: true,
      attachments: [
        { annex_label: 'A', name: 'Periapical_19.jpg', file_type: 'Image', file_size: '185 KB', has_file: true, is_image: true, file_url: '{{assets_url}}/sample-periapical.jpg' },
        { annex_label: 'B', name: 'Radiographic report.pdf', file_type: 'PDF', file_size: '412 KB', has_file: true, is_image: false, file_url: '' },
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
      encabezado: { nombre: '{{provider_name}}', datos: [['Patient', '{{patient_name}}'], ['Date of birth', '{{patient_birth_date}}'], ['Patient ID', '{{patient_id}}'], ['Status', '{{case_status}}'], ['Insurance', '{{insurance_name}}'], ['Presented', '{{presented_date}}']] },
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
      encabezado: { nombre: '{{provider_name}}', datos: [['Patient', '{{patient_name}}'], ['Date of birth', '{{patient_birth_date}}'], ['Patient ID', '{{patient_id}}'], ['Appointment', '{{appointment}}'], ['Procedure', '{{procedure_name}}'], ['Consent sent', '{{sent_date}}']] },
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
      encabezado: { nombre: '{{provider_name}}', datos: [['Patient', '{{patient_name}}'], ['Date of birth', '{{patient_birth_date}}'], ['Patient ID', '{{patient_id}}'], ['Treatment plan', '{{treatment_plan_name}}'], ['Patient portion', '{{total_patient_portion}}'], ['Consent sent', '{{sent_date}}']] },
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
      encabezado: { nombre: '{{provider_name}}', datos: [['Patient', '{{patient_name}}'], ['Date of birth', '{{patient_birth_date}}'], ['Patient ID', '{{patient_id}}'], ['Treatment plan', '{{treatment_plan_name}}'], ['Decision recorded', '{{decision_date}}'], ['Consent sent', '{{sent_date}}']] },
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
  return Object.fromEntries(Object.entries(datos).map(([k, v]) => [k, /_signed_date$|_signature_image$|_signature_hash$/.test(k) ? '' : k === 'has_addenda' ? false : v]))
}
