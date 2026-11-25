import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`/* Los PDFs que genera la plataforma. Salen de CON-4115 (los documentos de la ficha del paciente: consentimientos,
   treatment plans, lab orders, recetas, referrals y exámenes), de la Clinical note de Pending tasks y de CON-2923 (los
   consentimientos de aceptación y de rechazo del caso). \`origen\`: 'app' es la hoja que ya muestra la app (mismo
   contenido), 'propuesta' la armamos con los campos de Jira y espera el ok. Detalle en
   design-reference/figma/modulos/pdfs.md. */
import { armarHoja, type Datos, type Firma, type Hoja } from './marco.ts'

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
/* El texto del consentimiento sale del template de Settings › Consents (HTML del editor). */
const TEXTO_TEMPLATE = '<p>Your provider explained the treatment described above, why it is recommended, what it involves and what you can expect afterwards.</p><ul><li>Results can vary from patient to patient.</li><li>Follow the care instructions your provider gives you.</li></ul>'

export const PDFS: Pdf[] = [
  {
    id: 'clinical-note',
    categoria: 'Clinical records',
    nombre: 'Clinical note',
    cuando: 'View PDF in a clinical note (Pending tasks, Clinical Mode history, patient documents).',
    firma: 'The provider who attended the visit.',
    origen: 'app',
    jira: ['CON-2641', 'CON-2643', 'CON-4115'],
    hoja: {
      tipo: 'Dental clinical note',
      titulo: '{{patient_name}}',
      meta: ['Date of visit', '{{visit_date}}'],
      resumen: [
        ['Patient name', '{{patient_name}}'], ['Date of birth', '{{patient_birth_date}}'], ['Date of visit', '{{visit_date}} — {{visit_time}}'],
        ['Attending dentist', '{{provider_name}}'], ['Contact', '{{patient_phone}}'],
      ],
      secciones: [
        { titulo: 'Medical History', bloques: [
          { tipo: 'lista', rotulo: 'Past medical conditions:', lista: 'medical_conditions', valor: '{{name}}', vacio: 'Patient reports no known medical conditions.' },
          { tipo: 'lista', rotulo: 'Current medications:', lista: 'current_medications', valor: '{{name}}', vacio: 'Patient reports no current medications.' },
          { tipo: 'lista', rotulo: 'Known allergies:', lista: 'allergies', valor: '{{name}}', vacio: 'No known allergies reported.' },
          { tipo: 'lista', rotulo: 'Past surgeries and/or hospitalizations:', lista: 'surgeries', valor: '{{name}}', vacio: 'No past surgeries or hospitalizations reported.' },
        ] },
        { titulo: 'Additional Notes', bloques: [{ tipo: 'html', variable: 'clinical_notes_html' }] },
      ],
      firmas: [PROVIDER],
      pie: 'Dental clinical note',
    },
    ejemplo: {
      visit_date: 'November 25, 2026', visit_time: '09:00 AM to 09:45 AM',
      medical_conditions: [{ name: 'Hypertension, controlled with medication.' }],
      current_medications: [{ name: 'Amoxicillin 500 mg, once daily.' }, { name: 'Ibuprofen 400 mg, as needed.' }],
      allergies: [],
      surgeries: [],
      clinical_notes_html: '<p>Patient responsibilities were discussed including but not limited to daily care, use/misuse, regular maintenance appointments, and routine examination of underlying oral tissues.</p><p>The patient was discharged to return home in satisfactory condition.</p>',
      ...FIRMADO_PROVIDER,
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
        ['Provider', '{{provider_name}}'], ['Lab Order ID', '{{lab_order_id}}'], ['Patient Phone', '{{patient_phone}}'],
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
      lab_order_id: '4f1c2a9e-7b3d-4e21-9c55-1a8f0d6b3e72',
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
        ['Prescriber', '{{provider_name}}'], ['Prescription ID', '{{prescription_id}}'], ['Expiration date', '{{expiration_date}}'],
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
      issued_date: 'November 25, 2026', prescription_id: 'RX-000184', expiration_date: 'May 25, 2027',
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
    completado: ['Layout: the app PDF only lists the task data', 'Fields from New Referral (CON-2322) and the provider type and specialty (CON-3128)'],
    jira: ['CON-2322', 'CON-3033', 'CON-3128', 'CON-4115'],
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
        { titulo: 'Procedures to refer', bloques: [{ tipo: 'tabla', lista: 'procedures', vacio: 'No procedures selected.', columnas: [
          { titulo: 'Code', valor: '{{code}}', ancho: '12%' }, { titulo: 'Description', valor: '{{description}}' },
          { titulo: 'Tooth', valor: '{{tooth}}', ancho: '10%' }, { titulo: 'Surface', valor: '{{surface}}', ancho: '12%' },
        ] }] },
        { titulo: 'Referral note', bloques: [{ tipo: 'texto', texto: '{{referral_note}}' }] },
        { titulo: 'Attachments', bloques: [{ tipo: 'lista', lista: 'attachments', valor: '{{name}}', vacio: 'No attachments.' }] },
      ],
      firmas: [{ rol: 'Referring provider', prefijo: 'provider' }],
      pie: 'Referral',
    },
    ejemplo: {
      created_date: 'November 25, 2026', asap: 'Yes', mandatory: 'Yes',
      contact_name: 'Dr. Mark Bennett', contact_type: 'Dentist', contact_specialty: 'Endodontics',
      contact_phone: '+1 646 5550110', contact_email: 'mbennett@rootcare.com', contact_address: '120 W 57th St, 8, New York, 10019, NY, US',
      procedures: [{ code: 'D3330', description: 'Endodontic therapy, molar tooth', tooth: '19', surface: '—' }],
      referral_note: 'Periapical radiolucency on #19. Please evaluate for root canal treatment before we place the crown.',
      attachments: [{ name: 'Periapical_19.jpg' }, { name: 'Radiographic report.pdf' }],
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
    completado: ['The whole layout', 'The estimate disclaimer'],
    jira: ['CON-1634', 'CON-2036', 'CON-1598', 'CON-4115'],
    hoja: {
      tipo: 'Treatment plan',
      titulo: '{{case_name}}',
      meta: ['Presented', '{{presented_date}}'],
      resumen: [...RESUMEN_PACIENTE, ['Provider', '{{provider_name}}'], ['Status', '{{case_status}}'], ['Insurance', '{{insurance_name}}']],
      secciones: [
        { titulo: 'Procedures by visit', bloques: [{ tipo: 'grupos', lista: 'visits', titulo: '{{visit_name}}', total: '{{visit_total}}', tabla: { lista: 'procedures', vacio: 'No procedures.', columnas: [
          { titulo: 'Code', valor: '{{code}}', ancho: '11%' }, { titulo: 'Description', valor: '{{description}}' }, { titulo: 'Tooth', valor: '{{tooth}}', ancho: '9%' },
          { titulo: 'Fee', valor: '{{fee}}', derecha: true, ancho: '13%' }, { titulo: 'Insurance', valor: '{{insurance_estimate}}', derecha: true, ancho: '13%' }, { titulo: 'Patient', valor: '{{patient_estimate}}', derecha: true, ancho: '13%' },
        ] } }] },
        { titulo: 'Estimate', bloques: [
          { tipo: 'campos', campos: [['Total fees', '{{total_fees}}'], ['Insurance estimate', '{{total_insurance_estimate}}'], ['Patient estimate', '{{total_patient_estimate}}']] },
          { tipo: 'nota', texto: 'This is an estimate. What your insurance pays depends on your plan and may change.' },
        ] },
        { titulo: 'Notes', bloques: [{ tipo: 'texto', texto: '{{case_notes}}{{^case_notes}}No notes.{{/case_notes}}' }] },
      ],
      pie: 'Treatment plan',
    },
    ejemplo: {
      case_name: 'Restorative plan', presented_date: 'November 25, 2026', case_status: 'Presented', insurance_name: 'Delta Dental PPO',
      visits: [
        { visit_name: 'Visit 1', visit_total: '$1,180.00', procedures: [
          { code: 'D3330', description: 'Endodontic therapy, molar tooth', tooth: '19', fee: '$1,100.00', insurance_estimate: '$708.00', patient_estimate: '$227.00' },
          { code: 'D1110', description: 'Prophylaxis, adult', tooth: '—', fee: '$80.00', insurance_estimate: '$72.00', patient_estimate: '$0.00' },
        ] },
        { visit_name: 'Visit 2', visit_total: '$1,250.00', procedures: [
          { code: 'D2740', description: 'Crown, porcelain/ceramic', tooth: '19', fee: '$1,250.00', insurance_estimate: '$531.25', patient_estimate: '$531.25' },
        ] },
      ],
      total_fees: '$2,430.00', total_insurance_estimate: '$1,311.25', total_patient_estimate: '$758.25',
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
    completado: ['The whole layout', 'The acknowledgment statements'],
    jira: ['CON-2923', 'CON-2715', 'CON-3571', 'CON-4115'],
    hoja: {
      tipo: 'Treatment acceptance consent',
      titulo: '{{case_name}}',
      meta: ['Consent sent', '{{sent_date}}'],
      resumen: [...RESUMEN_PACIENTE, ['Provider', '{{provider_name}}'], ['Treatment plan', '{{treatment_plan_name}}'], ['Patient estimate', '{{total_patient_estimate}}']],
      secciones: [
        { titulo: 'Accepted treatment', bloques: [{ tipo: 'tabla', lista: 'procedures', vacio: 'No procedures.', totales: [['Total fees', '{{total_fees}}'], ['Patient estimate', '{{total_patient_estimate}}']], columnas: [
          { titulo: 'Code', valor: '{{code}}', ancho: '11%' }, { titulo: 'Description', valor: '{{description}}' }, { titulo: 'Tooth', valor: '{{tooth}}', ancho: '9%' },
          { titulo: 'Fee', valor: '{{fee}}', derecha: true, ancho: '14%' }, { titulo: 'Patient', valor: '{{patient_estimate}}', derecha: true, ancho: '14%' },
        ] }] },
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
      procedures: [
        { code: 'D3330', description: 'Endodontic therapy, molar tooth', tooth: '19', fee: '$1,100.00', patient_estimate: '$227.00' },
        { code: 'D1110', description: 'Prophylaxis, adult', tooth: '—', fee: '$80.00', patient_estimate: '$0.00' },
        { code: 'D2740', description: 'Crown, porcelain/ceramic', tooth: '19', fee: '$1,250.00', patient_estimate: '$531.25' },
      ],
      total_fees: '$2,430.00', total_patient_estimate: '$758.25',
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
    completado: ['The whole layout', 'The acknowledgment statements'],
    jira: ['CON-2923', 'CON-2716', 'CON-4115'],
    hoja: {
      tipo: 'Informed refusal',
      titulo: '{{case_name}}',
      meta: ['Consent sent', '{{sent_date}}'],
      resumen: [...RESUMEN_PACIENTE, ['Provider', '{{provider_name}}'], ['Treatment plan', '{{treatment_plan_name}}'], ['Decision recorded', '{{decision_date}}']],
      secciones: [
        { titulo: 'Declined treatment', bloques: [{ tipo: 'tabla', lista: 'procedures', vacio: 'No procedures.', columnas: [
          { titulo: 'Code', valor: '{{code}}', ancho: '11%' }, { titulo: 'Description', valor: '{{description}}' }, { titulo: 'Tooth', valor: '{{tooth}}', ancho: '9%' },
        ] }] },
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
        { code: 'D7140', description: 'Extraction, erupted tooth', tooth: '19' },
        { code: 'D6010', description: 'Implant body, endosteal', tooth: '19' },
      ],
      consent_text_html: '<p>Your provider explained the treatment described above and what can happen if it is not done, including worsening infection, pain, and the loss of the tooth.</p><p>You can ask for this treatment again at any time.</p>',
      ...FIRMADO_PACIENTE, ...FIRMADO_PROVIDER,
    },
  },
]

export const CATEGORIAS = [...new Set(PDFS.map((p) => p.categoria))]

/** El HTML de la plantilla, con sus {{variables}} y {{#listas}}: lo que se le entrega al backend. */
export const htmlDe = (p: Pdf) => armarHoja(p.hoja)
/** Datos de ejemplo completos (comunes + del documento). Las imágenes de ejemplo cuelgan de \`assets\`: la carpeta
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
  return Object.fromEntries(Object.entries(datos).map(([k, v]) => [k, /_signed_date$|_signature_image$/.test(k) ? '' : v]))
}
`})))()}export{r as n,n as r,i as t};