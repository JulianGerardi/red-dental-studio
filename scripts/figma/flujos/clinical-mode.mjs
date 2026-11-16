/* Clinical Mode. Ver design-reference/figma/modulos/clinical-mode.md y consents.md. */
import { clic, pasos, escribir, texto, llenar } from './_util.mjs'

const CM = '/patients/patient-0001/clinical-mode'
const registro = (nombre) => pasos(clic(/^Exams/), clic(nombre, 'menuitem'))
const examen = (nombre, nota) => ({ nombre, ruta: CM, hacer: clic(nombre), alto: 'fijo', nota })
const firmaProvider = pasos(
  clic(/Provider Signature/),
  (p) => p.getByRole('dialog', { name: 'Provider Signature' }).getByLabel('Email').fill('perez@clinic.com'),
  llenar('Enter password', 'secret'),
)

export default {
  pagina: '🦷 Clinical Mode',
  orden: 10,
  resumen: 'El takeover clínico: encuentro, exámenes, odontograma, plan de tratamiento, consentimientos y órdenes.',
  jira: ['CON-3114', 'CON-1611', 'CON-1397', 'CON-3939', 'CON-2094', 'CON-4119', 'CON-2835'],
  flujos: [
    {
      nombre: 'Clinical Mode — Encounter',
      rol: 'Odontólogo',
      jira: ['CON-1611', 'CON-2793'],
      resumen: 'Empezar, pausar y completar el encuentro. El estado se comparte con la ficha del paciente.',
      pantallas: [
        { nombre: 'Overview', ruta: CM, alto: 'fijo', nota: 'Clinical Mode no usa el app shell. Barra superior: contexto del paciente, encuentro y exámenes. Exit clinical Mode vuelve a la ficha.' },
        { nombre: 'Encounter started', hacer: clic(/Start Encounter/), alto: 'fijo', nota: 'Start Encounter empieza el encuentro: el botón pasa a Complete Encounter.' },
        { nombre: 'Encounter options', hacer: clic('Encounter options'), alto: 'fijo', nota: 'El menú ofrece Pause Encounter y Discharge Patient.' },
        { nombre: 'Pending Encounter', hacer: clic(/Pause Encounter/, 'menuitem'), alto: 'fijo', nota: 'En pausa el botón queda en ámbar (Pending Encounter) hasta retomarlo.' },
        { nombre: 'Complete Encounter', ruta: CM, hacer: pasos(clic(/Start Encounter/), clic(/Complete Encounter/)), alto: 'fijo', nota: 'Complete Encounter ofrece firmar la Clinical Note ahora (Review and sign) o después (Remind me later).' },
      ],
    },
    {
      nombre: 'Clinical Mode — Patient context',
      rol: 'Odontólogo',
      jira: ['CON-3114', 'CON-2412'],
      resumen: 'Los chips de la barra: motivo de consulta, triage, medicación, condiciones y alergias, y la Problem List.',
      pantallas: [
        { nombre: 'Chief Complaint', ruta: CM, hacer: clic('Chief Complaint: completed'), alto: 'fijo', nota: 'CC y TR siguen a los workflows de Treatment: en verde cuando están completos.' },
        { nombre: 'Triage', ruta: CM, hacer: clic('Triage: not completed'), alto: 'fijo', nota: 'Triage sin completar ofrece Answer in Treatment.' },
        { nombre: 'Medications', ruta: CM, hacer: clic('Medications: 4'), alto: 'fijo', nota: 'La misma lista de la ficha del paciente; se agrega, edita o borra.' },
        { nombre: 'Problem List', ruta: CM, hacer: clic('View Problem List'), alto: 'fijo', nota: 'View Problem List abre la tabla flotante con los hallazgos de todos los exámenes.' },
        { nombre: 'Procedures', hacer: clic('Procedures', 'tab'), alto: 'fijo', nota: 'La pestaña Procedures lista los procedimientos; el ⋮ ofrece Start, Edit, Refer, Complete según el estado del caso.' },
        { nombre: 'Procedure detail', hacer: texto(/D7286 - Incisional biopsy/), alto: 'fijo', nota: 'El detalle de un procedimiento lleva a su caso y a su hallazgo.' },
      ],
    },
    {
      nombre: 'Clinical Mode — Exams',
      rol: 'Odontólogo',
      jira: ['CON-1397', 'CON-2067', 'CON-4144'],
      resumen: 'Los exámenes, con los nombres y el orden de red.dev.',
      pantallas: [
        examen('Vitals', 'Vitals: presión, pulso, respiración, saturación y temperatura.'),
        examen('ROS', 'ROS: placeholder «Planned» en la app. El diseño (Review of Systems · New Condition) está en Platform Design y se documenta aparte.'),
        examen('Physical', 'Physical: placeholder «Planned» en la app; todavía no hay diseño en Platform Design.'),
        examen('Extraoral', 'Extraoral: hallazgos por zona de cabeza y cuello.'),
        examen('Intraoral', 'Intraoral: hallazgos por zona de la boca.'),
        examen('Dental assessment', 'Dental assessment: odontograma con condiciones y procedimientos por diente.'),
        examen('Periodontal', 'Periodontal: placeholder «Planned» en la app. El diseño (Periodontal Chart) está en Platform Design y se documenta aparte.'),
        examen('Radiographic', 'Radiographic: hallazgos sobre radiografías.'),
      ],
    },
    {
      nombre: 'Clinical Mode — Add Condition & Procedure',
      rol: 'Odontólogo',
      jira: ['CON-2083', 'CON-1751', 'CON-2833'],
      resumen: 'Desde Dental assessment se carga una condición (con descriptores) o un procedimiento (ligado a un hallazgo).',
      pantallas: [
        { nombre: 'Add Condition', ruta: CM, hacer: pasos(clic('Dental assessment'), clic('Add Condition')), alto: 'fijo', nota: 'Add Condition: se elige la condición y dónde (diente, superficie).' },
        { nombre: 'Condition · Descriptors', hacer: pasos(clic('D2740 on tooth'), clic(/Next Step/)), alto: 'fijo', nota: 'Descriptors: se eligen al crear y se corrigen después desde Edit.' },
        { nombre: 'Condition saved', hacer: pasos(clic('Painful'), clic('Round'), clic(/^Save/)), alto: 'fijo', nota: 'Save suma el hallazgo al diente y a la Problem List.' },
        { nombre: 'Add Procedure', ruta: CM, hacer: pasos(clic('Dental assessment'), clic('Add Procedure')), alto: 'fijo', nota: 'Add Procedure: se busca por código CDT.' },
        { nombre: 'Finding menu', ruta: CM, hacer: pasos(clic('Dental assessment'), clic(/^Actions for Tooth 3$/)), alto: 'fijo', nota: 'El ⋮ de un hallazgo: Edit, View full record y sus acciones.' },
      ],
    },
    {
      nombre: 'Clinical Mode — Records',
      rol: 'Odontólogo',
      jira: ['CON-2214', 'CON-2212', 'CON-2321', 'CON-2724'],
      resumen: 'El menú Exams abre los registros: Treatment, Patient Summary, Lab Order, Prescription y Referral.',
      pantallas: [
        { nombre: 'Records menu', ruta: CM, hacer: clic(/^Exams/), alto: 'fijo', nota: 'El desplegable al lado de Exams cambia entre exámenes y registros.' },
        { nombre: 'Treatment', ruta: CM, hacer: registro('Treatment'), alto: 'fijo', nota: 'Treatment: los workflows del encuentro (Chief Complaint, Triage…) y la narrativa.' },
        { nombre: 'Patient Summary', ruta: CM, hacer: registro('Patient Summary'), alto: 'fijo', nota: 'Patient Summary: placeholder «Planned» en la app; todavía no hay diseño.' },
        { nombre: 'Lab Order', ruta: CM, hacer: registro('Lab Order'), alto: 'fijo', nota: 'Lab Order: órdenes de laboratorio, con filtro por estado; Cancel order se deshace con Undo.' },
        { nombre: 'Prescription', ruta: CM, hacer: registro('Prescription'), alto: 'fijo', nota: 'Prescription: placeholder «Planned» en la app. El diseño (List y New Prescription) está en Platform Design y se documenta aparte.' },
        { nombre: 'Referral', ruta: CM, hacer: registro('Referral'), alto: 'fijo', nota: 'Referral: placeholder «Planned» en la app. El diseño (List y Create) está en Platform Design y se documenta aparte.' },
      ],
    },
    {
      nombre: 'Treatment Plan — Cases',
      rol: 'Odontólogo',
      jira: ['CON-3939', 'CON-3695', 'CON-2835'],
      resumen: 'Los casos por fecha y estado: Planning → Presented → Waiting for consent → Accepted → In progress.',
      pantallas: [
        { nombre: 'Treatment Plan', ruta: CM, hacer: registro('Treatment Plan'), alto: 'fijo', nota: 'A la izquierda, los planes por fecha y estado; a la derecha, el caso abierto con sus visitas y procedimientos.' },
        { nombre: 'Case · Planning', ruta: `${CM}?case=c1`, alto: 'fijo', nota: 'En Planning el caso se edita: procedimientos, visitas y notas.' },
        { nombre: 'Case actions', hacer: clic('Case actions'), alto: 'fijo', nota: 'Case actions cambia con el estado del caso (presentar, aceptar, cancelar…).' },
        { nombre: 'Procedure actions', ruta: `${CM}?case=c1`, hacer: clic(/Actions for D4341/), alto: 'fijo', nota: 'El ⋮ de un procedimiento. Complete queda bloqueado mientras el caso se planea o espera el consentimiento.' },
        { nombre: 'Delete procedure', hacer: clic(/Delete/, 'menuitem'), alto: 'fijo', nota: 'Delete from Tx lo saca del caso y lo deja en Unassigned Items.' },
        { nombre: 'Estimate details', ruta: `${CM}?case=c5`, hacer: clic(/View estimate details/), alto: 'fijo', nota: 'El Total amount abre Estimate details: lo que paga el seguro y lo que paga el paciente.' },
        { nombre: 'Case · Accepted', ruta: `${CM}?case=c5`, alto: 'fijo', nota: 'Al aceptar el caso, sus hallazgos pasan a In Treatment (CON-2835). La columna Consent muestra el estado de cada consentimiento.' },
      ],
    },
    {
      nombre: 'Treatment Plan — Start with consent',
      rol: 'Odontólogo · Paciente',
      jira: ['CON-4119', 'CON-2905', 'CON-2911', 'CON-2866'],
      resumen: 'Start pide el consentimiento firmado: Sign now lleva al documento, firma el provider y el procedimiento queda In progress.',
      pantallas: [
        { nombre: 'Start', ruta: `${CM}?case=c5`, hacer: pasos(clic(/Actions for D2950/), clic(/Start/, 'menuitem')), alto: 'fijo', nota: 'Start con la firma pendiente pregunta: Sign now, Send consent and sign later o Continue without signed consent.' },
        { nombre: 'Procedure Consent', hacer: clic('Sign now'), alto: 'fijo', nota: 'Sign now abre el consentimiento del procedimiento. El paciente ya firmó: falta el provider.' },
        { nombre: 'Provider Signature', hacer: firmaProvider, alto: 'fijo', nota: 'El provider firma en el portal seguro con su email y contraseña.' },
        { nombre: 'Consent signed', hacer: clic(/^Sign$/), alto: 'fijo', nota: 'Con las dos firmas el consentimiento queda aceptado (CON-2927).' },
        { nombre: 'Procedure started', hacer: clic('Confirm Start'), alto: 'fijo', nota: 'Confirm Start deja el procedimiento In progress y la columna Consent en Accepted.' },
      ],
    },
    {
      nombre: 'Treatment Plan — Patient signs consent',
      rol: 'Paciente · Odontólogo',
      jira: ['CON-4119', 'CON-2910', 'CON-2913', 'CON-2860'],
      resumen: 'Desde la columna Consent: el paciente marca las afirmaciones, adopta su firma y después firma el provider.',
      pantallas: [
        { nombre: 'Consent · Requested', ruta: `${CM}?case=c3`, hacer: clic(/Open consent for D2391: Requested/), alto: 'fijo', nota: 'La columna Consent abre el documento. Patient Signature está apagado hasta marcar las afirmaciones.' },
        {
          nombre: 'Patient Signature',
          hacer: async (p) => { for (let i = 0; i < 5; i += 1) await p.getByRole('checkbox').nth(i).click(); await p.getByRole('button', { name: /Patient Signature/ }).click() },
          alto: 'fijo', nota: 'El paciente adopta una firma prediseñada (o la dibuja) con sus iniciales.',
        },
        { nombre: 'Patient signed', hacer: clic(/Adopt and Sign/), alto: 'fijo', nota: 'Firmado el paciente, queda pendiente el provider.' },
        { nombre: 'Consent · Rejected', ruta: `${CM}?case=c5`, hacer: clic(/Open consent for D2750: Rejected/), alto: 'fijo', nota: 'Un consentimiento rechazado: Sign now pide uno nuevo, que queda Requested.' },
        { nombre: 'Consent history', ruta: `${CM}?case=c5`, hacer: clic('Consent history'), alto: 'fijo', nota: 'Consent history lista los consentimientos de cada procedimiento del caso.' },
      ],
    },
  ],
}
