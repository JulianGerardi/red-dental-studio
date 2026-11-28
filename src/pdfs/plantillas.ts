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

/* La nota clínica es texto (CON-2975): un finding de examen es "{finding} on #{tooth}/{surface} or location [details: (…)].({note})". */
const FINDING = '<li>{{finding}} on {{location}}{{#details}} [details: ({{details}})]{{/details}}.{{#note}} ({{note}}){{/note}}</li>'

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
    cuando: 'Generate Clinical Note in Clinical Mode (as many times as needed until it is signed), or on its own when the encounter closes after 48 hours. View PDF in Patient Summary (the eye of each encounter), Pending tasks and patient documents; Download in Patient Summary.',
    firma: 'Only the provider: name and date. Addenda are signed by their author.',
    origen: 'app',
    completado: [
      'Sections, texts and order from the clinical notes of red.dev (Patient Summary, 2026-11-28): Medical History; Exams with Review of Systems, Vital Signs, Physical, Extraoral and Intraoral; Prescription; Lab Order; Additional Notes and the provider',
      'Dental Assessment, Radiographic and Periodontal exams, Treatment Plan, Operative Report, Workflows, Referral and the encounter questionnaires: from Jira (CON-2975, CON-3081, CON-3605, CON-3668); not in the red.dev notes we saw',
      'Addenda (CON-2730), after the signature',
    ],
    jira: ['CON-2975', 'CON-3081', 'CON-3605', 'CON-3668', 'CON-2727', 'CON-2728', 'CON-2730', 'CON-2731', 'CON-2816', 'CON-2617', 'CON-1619', 'CON-2055', 'CON-2191', 'CON-2615', 'CON-2614', 'CON-2616', 'CON-2620', 'CON-2621', 'CON-2937', 'CON-2641', 'CON-2643', 'CON-4115'],
    hoja: {
      tipo: 'Dental clinical note',
      titulo: '{{patient_name}}',
      meta: ['Date of visit', '{{visit_date}}'],
      aviso: '{{#auto_generated}}<p class="aviso">Generated automatically when the encounter closed after 48 hours without activity. Workflow narratives are not included.</p>{{/auto_generated}}',
      resumen: [
        ['Patient name', '{{patient_name}}'], ['Date of birth', '{{patient_birth_date}}'], ['Date of visit', '{{visit_date}} — {{visit_time}}'],
        ['Attending dentist', '{{provider_name}}'], ['Contact', '{{patient_phone}}'],
      ],
      secciones: [
        { titulo: 'Medical History', bloques: [
          { tipo: 'libre', html: `<p class="rotulo">Past medical conditions:{{^past_medical_conditions}} <span>Patient reports no known medical conditions.</span>{{/past_medical_conditions}}</p>
<ul class="lista">{{#past_medical_conditions}}<li>{{name}} {{status}} ({{start_date}}).{{#notes}} {{notes}}{{/notes}}</li>{{/past_medical_conditions}}</ul>` },
          { tipo: 'lista', rotulo: 'Current medications:', lista: 'current_medications', vacio: 'Patient reports no current medications.', valor: '<b>{{name}}</b> {{dose}} {{unit}} · {{frequency}} · {{status}} ({{start_date}}).{{#notes}} {{notes}}{{/notes}}' },
          { tipo: 'lista', rotulo: 'Known allergies:', lista: 'known_allergies', vacio: 'No known allergies reported.', valor: 'Allergy to {{allergen}} ({{start_date}}).{{#notes}} {{notes}}{{/notes}}<ul class="lista">{{#reactions}}<li>{{category}} – {{symptom}}</li>{{/reactions}}{{#severity}}<li>Severity: {{severity}}</li>{{/severity}}</ul>' },
          { tipo: 'lista', rotulo: 'Past surgeries and/or hospitalizations:', lista: 'past_surgeries', vacio: 'No past surgeries or hospitalizations reported.', valor: '{{name}} ({{date}}).' },
          { tipo: 'narrativas', lista: 'encounter_questionnaires', titulo: '{{name}}', texto: '{{narrative}}' },
          { tipo: 'libre', html: '{{#has_history_questionnaires}}<h3>Patient History</h3>{{#history_questionnaires}}<div class="narrativa"><p class="narrativa-titulo">{{name}}<span>Completed on {{completed_at}}</span></p><p>{{narrative}}</p></div>{{/history_questionnaires}}{{/has_history_questionnaires}}' },
        ] },
        { titulo: 'Exams', si: 'has_exams', bloques: [{ tipo: 'libre', html: `{{#has_ros}}<h3>Review of Systems (ROS)</h3>
<p>The review of systems was performed to evaluate the presence or absence of symptoms across major body systems.</p>
<table class="tabla"><thead><tr><th style="width:30%">System</th><th style="width:35%">Negative</th><th>Positive</th></tr></thead><tbody>{{#ros}}<tr><td>{{system}}</td><td>{{negative}}</td><td>{{positive}}</td></tr>{{/ros}}</tbody></table>{{/has_ros}}
{{#has_vitals}}<h3>Vital Signs</h3>
<p>Patient vitals were taken:</p>
<table class="tabla"><thead><tr><th style="width:50%">Measurement</th><th>Value</th></tr></thead><tbody>{{#vitals}}<tr><td>{{measurement}}</td><td>{{value}}</td></tr>{{/vitals}}</tbody></table>
{{#out_of_range_values}}<p><b>Out of range values:</b> {{out_of_range_values}}.</p>{{/out_of_range_values}}{{#vitals_notes}}<p><b>Notes:</b> {{vitals_notes}}</p>{{/vitals_notes}}{{/has_vitals}}
{{#has_physical}}<h3>Physical Examination</h3>
<p>A physical examination was performed to assess the patient’s overall health status.</p>
{{#physical}}<p class="rotulo">{{area}}:</p><p>{{#positive}}Positive for <b>{{term}}</b>{{/positive}}{{^positive}}Negative for {{term}}{{/positive}}{{#note}} ({{note}}){{/note}}.</p>{{/physical}}{{/has_physical}}
{{#has_extraoral}}<h3>Extraoral Examination</h3>
<p>The extraoral examination revealed:</p>
<ul class="lista">{{#extraoral_findings}}<li>{{finding}} on <b>{{location}}</b>{{#details}} ({{details}}){{/details}}.</li>{{/extraoral_findings}}</ul>
<p>All other extraoral structures appeared normal.</p>{{/has_extraoral}}
{{#has_intraoral}}<h3>Intraoral Examination</h3>
<p>The intraoral examination identified:</p>
<ul class="lista">{{#intraoral_findings}}<li>{{finding}} on <b>{{location}}</b>{{#details}} ({{details}}){{/details}}.</li>{{/intraoral_findings}}</ul>
<p>All other intraoral structures appeared normal.</p>{{/has_intraoral}}
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
        { titulo: 'Prescription', si: 'has_prescriptions', bloques: [{ tipo: 'libre', html: `<p>The following medication(s) was prescribed to the patient:</p>
{{#prescriptions}}<div class="tarjeta">{{#medications}}<div class="bloque"><p><b>{{drug}}</b> {{strength}}.</p><p>Take {{dose}} {{frequency}} for {{duration}}.</p><p>Dosage form: {{dosage_form}}.</p></div>{{/medications}}{{#indications}}<p>Indications: {{indications}}</p>{{/indications}}<p>Documents sent: {{documents_sent}}</p></div>{{/prescriptions}}` }] },
        { titulo: 'Lab Order', si: 'has_lab_orders', bloques: [{ tipo: 'libre', html: `{{#lab_orders}}<div class="tarjeta"><p>Lab order sent to {{laboratory}}.</p><p>Lab work requested: {{work_requested}}</p>{{#case}}<p><b>Case:</b> {{case}}</p>{{/case}}<ul class="lista">{{#lab_treatments}}<li>{{description}}{{#tooth}} — #{{tooth}}{{/tooth}}.</li>{{/lab_treatments}}</ul>{{#special_instructions}}<p>Special instructions: {{special_instructions}}</p>{{/special_instructions}}<p>Documents sent: {{documents_sent}}</p><p>Expected return: {{expected_return}}</p></div>{{/lab_orders}}` }] },
        { titulo: 'Referral', si: 'has_referrals', bloques: [{ tipo: 'libre', html: `{{#referrals}}<div class="tarjeta"><p>Referral sent to {{referral}}{{#specialties}} ({{specialties}}){{/specialties}}.</p><ul class="lista">{{#referral_procedures}}<li>{{description}}{{#tooth}} — #{{tooth}}{{/tooth}}.</li>{{/referral_procedures}}</ul>{{#notes}}<p>Notes: {{notes}}</p>{{/notes}}<p>Documents sent: {{documents_sent}}</p></div>{{/referrals}}` }] },
        { titulo: 'Additional Notes', si: 'clinical_notes_html', bloques: [{ tipo: 'html', variable: 'clinical_notes_html' }] },
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
    /* El ejemplo es la nota más completa de red.dev que pasó Julián (2026-11-28), con el paciente de la ficha. */
    ejemplo: {
      visit_date: 'August 20, 2026', visit_time: '02:34 PM to 03:20 PM',
      auto_generated: false,
      past_medical_conditions: [{ name: 'Diabetes mellitus type 1', status: 'Chronic', start_date: '06/02/2026', notes: 'Controlled with insulin.' }],
      current_medications: [
        { name: 'Clonazepam', dose: '2', unit: 'mg', frequency: 'as needed', status: 'Suspended', start_date: '06/02/2026', notes: '' },
        { name: 'Ibuprofen', dose: '400', unit: 'mg', frequency: 'as needed', status: 'Suspended', start_date: '07/02/2026', notes: '' },
      ],
      known_allergies: [
        { allergen: 'sulfa drugs', start_date: '05/11/2026', notes: '', reactions: [{ category: 'Anaphylactic', symptom: 'Difficulty Breathing' }], severity: 'Moderate' },
        { allergen: 'lidocaine', start_date: '06/02/2026', notes: '', reactions: [{ category: 'Anaphylactic', symptom: 'Difficulty Breathing' }, { category: 'Anaphylactic', symptom: 'Dizziness or Fainting' }], severity: 'Moderate' },
      ],
      past_surgeries: [{ name: 'Hip replacement', date: '12/01/2025' }],
      encounter_questionnaires: [],
      has_history_questionnaires: false,
      history_questionnaires: [{ name: 'Family History', completed_at: 'August 20, 2026 at 2:30 PM', narrative: 'Patient reports a family history of diabetes.' }],
      has_exams: true,
      has_ros: true,
      ros: [{ system: 'General', negative: '-', positive: 'Abnormal weight gain (since the last visit)' }],
      has_vitals: true,
      vitals: [{ measurement: 'Height', value: '68 in' }, { measurement: 'Weight', value: '187 lbs' }, { measurement: 'BMI', value: '28.4' }],
      out_of_range_values: '', vitals_notes: '',
      has_physical: true,
      physical: [
        { area: 'General Appearance', positive: true, term: 'generally unwell', note: 'tired, poor sleep' },
        { area: 'Neck', positive: false, term: 'tenderness of neck', note: '' },
      ],
      has_extraoral: true,
      extraoral_findings: [
        { finding: 'Atrophy (morphologic abnormality)', location: 'Left Eye', details: 'quantity: solitary; symmetry: unilateral; size: small (e.g., 0.5 cm); shape: round; borders: well demarcated' },
        { finding: 'Abscess (morphologic abnormality)', location: 'Right Temple Area', details: 'symmetry: bilateral' },
      ],
      has_intraoral: true,
      intraoral_findings: [{ finding: 'Abscess (morphologic abnormality)', location: 'Soft Palate', details: 'size: large (e.g., >2 cm)' }],
      /* Lo que sigue viene de Jira y no estaba en las notas de red.dev que vimos: apagado en el ejemplo, con sus campos. */
      dental_assessment: false, dental_assessment_date: '08/20/2026', dental_assessment_no_findings: false, dental_assessment_reviewed: false, dental_assessment_review_note: '',
      dental_assessment_findings: [{ finding: 'Deep caries', location: '#19/O, D', details: 'Extent: Deep', note: '' }],
      radiographic_exams: [], periodontal_exams: [],
      has_treatment_plan: false, has_treatment_cases: false,
      treatment_cases: [{ name: 'Restorative plan', case_type: 'Definitive / Rehabilitation', recommended: true, total: '$2,430.00', decision: 'Accepted', visits: [
        { visit_name: 'Visit 1', visit_cost: '$1,180.00', procedures: [{ code: 'D3330', description: 'Endodontic therapy, molar tooth', anatomic_area: '#19' }] },
      ] }],
      consent_presented: false, has_accepted_consents: false, accepted_consents: [{ consent_name: 'Informed Consent for Dental Treatment', plan_name: 'Restorative plan' }],
      has_procedures: false, procedures: [{ code: 'D2140', description: 'Amalgam – one surface, primary or permanent', location: '#32', status: 'completed' }],
      has_workflows: false, workflows: [{ workflow_name: 'Local anesthesia', narrative: 'Infiltration with 1.7 ml of 2% lidocaine.' }],
      has_prescriptions: true,
      prescriptions: [{ documents_sent: 'No', indications: '', medications: [{ drug: 'Clonazepam', strength: '500 mg', dose: '1.0 applications', frequency: 'as needed', duration: '7 days', dosage_form: 'buccal tablet' }] }],
      has_lab_orders: true,
      lab_orders: [{ laboratory: 'Olivos Laboratory', work_requested: 'Amalgam restoration model.', case: 'Restorative plan', special_instructions: 'Send the try-in before final polishing.', documents_sent: 'No', expected_return: '2026-09-30', lab_treatments: [{ description: 'Amalgam – one surface, primary or permanent', tooth: '32' }] }],
      has_referrals: false, referrals: [{ referral: 'Dr. Mark Bennett', specialties: 'Endodontics', notes: 'Please evaluate #19.', documents_sent: 'No', referral_procedures: [{ description: 'Endodontic therapy, molar tooth', tooth: '19' }] }],
      clinical_notes_html: '<p>Patient responsibilities were discussed including but not limited to daily care, use/misuse, regular maintenance appointments, and routine examination of underlying oral tissues.</p><p>The patient was discharged to return home in satisfactory condition.</p>',
      ...FIRMADO_PROVIDER,
      provider_signed_date: 'August 20, 2026',
      has_addenda: true,
      addenda: [{ author: 'Elena Martinez', created_at: 'August 21, 2026 at 8:40 AM', text: 'Patient called: the abscess drained and pain went down. Keep the follow-up visit.', signed_date: 'August 21, 2026' }],
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
  return Object.fromEntries(Object.entries(datos).map(([k, v]) => [k, /_signed_date$|_signature_image$|_signature_hash$/.test(k) ? '' : k === 'has_addenda' ? false : v]))
}
