/* Ficha del paciente → Overview. Ver design-reference/figma/modulos/patient-dashboard.md. */
import { clic, pasos } from './_util.mjs'

export default {
  pagina: '💊 Patient record — Overview',
  orden: 5,
  resumen: 'La ficha: menú del paciente a la izquierda (datos, historia médica) y, en Overview, documentos pendientes, tareas y turnos.',
  jira: ['CON-2107', 'CON-2942', 'CON-2952', 'CON-2944', 'CON-2953', 'CON-2954'],
  flujos: [
    {
      nombre: 'Overview — Patient record',
      rol: 'Recepción · Odontólogo',
      jira: ['CON-2952', 'CON-2942', 'CON-2840'],
      resumen: 'Entrar a la ficha y recorrer lo pendiente: documentos por urgencia, tareas por tipo y turnos.',
      pantallas: [
        { nombre: 'Overview', ruta: '/patients/1', nota: 'Se llega desde Patients (nombre o ⋮ → Overview). El rastro Patients › paciente vuelve a la lista.' },
        { nombre: 'Pending documents · Later', hacer: clic(/^Later/, 'tab'), nota: 'Pending documents filtra por urgencia con pestañas: Overdue, Due this week, Later. Send reminder y Request update avisan al paciente.' },
        { nombre: 'Pending Task · Referrals', hacer: clic(/^Referrals/, 'tab'), nota: 'Pending Task filtra por tipo (Clinical Note, Lab Orders, Prescriptions, Referrals). El resto carga al scrollear, sin botón.' },
        { nombre: 'Appointments · Next', hacer: clic(/^Next Appointments|^Next/, 'tab'), nota: 'Appointments: los turnos del paciente; la pestaña Next deja los próximos.' },
        { nombre: 'Patient menu collapsed', ruta: '/patients/1', hacer: clic('Collapse patient menu'), nota: 'El menú del paciente se pliega para dar ancho al contenido.' },
      ],
    },
    {
      nombre: 'Overview — Edit patient data',
      rol: 'Recepción',
      jira: ['CON-2107', 'CON-2952'],
      resumen: 'Editar los datos generales (pantalla) y los de contacto (drawer) desde el menú del paciente.',
      pantallas: [
        { nombre: 'Edit Patient (General)', ruta: '/patients/1', hacer: clic('Edit General'), nota: 'Edit General lleva a la pantalla Edit Patient: General, Demography y Address. Save vuelve a la ficha.' },
        { nombre: 'Edit Contact Details', ruta: '/patients/1', hacer: clic('Edit Contact'), nota: 'Edit Contact abre el drawer con teléfono, email y dirección. Country, State y City son obligatorios.' },
      ],
    },
    {
      nombre: 'Overview — Medical history',
      rol: 'Odontólogo',
      jira: ['CON-2944', 'CON-2953', 'CON-2847'],
      resumen: 'Allergies, Medical Conditions, Medication y Past Surgery: cada chip abre su lista; desde ahí se agrega, edita o borra.',
      pantallas: [
        { nombre: 'Allergies list', ruta: '/patients/1', hacer: clic('Allergies 4'), nota: 'El chip abre la lista con estado, severidad y fecha. Cada ítem se edita o se borra.' },
        { nombre: 'New Allergy', hacer: clic('Add Allergies'), nota: 'Add Allergies abre el drawer New Allergy. Obligatorios: Allergy, Status, Severity, Reaction y Approx Start Date.' },
        { nombre: 'Medical Conditions list', ruta: '/patients/1', hacer: clic('Medical Conditions 4'), nota: 'Misma pieza para Medical Conditions.' },
        { nombre: 'New Medical Condition', hacer: clic('Add Medical Conditions'), nota: 'Alta de una condición médica.' },
        { nombre: 'Medication list', ruta: '/patients/1', hacer: clic('Medication 4'), nota: 'Medication: dosis, frecuencia y estado (Prescribed, Completed).' },
        { nombre: 'New Medication', hacer: clic('Add Medication'), nota: 'Alta de una medicación (CON-2953). El título dice "New Allergy": viene así del Figma (anomalía 44 en patient-dashboard.md).' },
        { nombre: 'Past Surgery list', ruta: '/patients/1', hacer: clic(/Past Surgery/), nota: 'Past Surgery and Hospitalization.' },
        { nombre: 'New Surgery', hacer: clic(/Add Past Surgery/), nota: 'Alta de una cirugía u hospitalización. Mismo título heredado del Figma (anomalía 44).' },
        { nombre: 'Delete item', ruta: '/patients/1', hacer: pasos(clic('Allergies 4'), clic('Delete Penicillin')), nota: 'Delete quita el ítem de la lista y avisa con un toast.' },
      ],
    },
    {
      nombre: 'Overview — Encounter',
      rol: 'Odontólogo',
      jira: ['CON-1611', 'CON-2793'],
      resumen: 'El botón de encuentro de la ficha comparte estado con Clinical Mode: Start → Complete → (Pending Signature).',
      pantallas: [
        { nombre: 'Start Encounter', ruta: '/patients/1', nota: 'Start Encounter lleva a Clinical Mode con el encuentro empezado.' },
        { nombre: 'Clinical Mode · encounter started', hacer: pasos(clic('Clinical Mode', 'link'), clic(/Start Encounter/)), nota: 'En Clinical Mode el botón pasa a Complete Encounter; el menú ofrece Pause Encounter y Discharge Patient.' },
        { nombre: 'Complete Encounter · sign note', hacer: clic(/Complete Encounter/), nota: 'Complete Encounter ofrece firmar la Clinical Note ahora o dejarla para después.' },
        { nombre: 'Pending Signature', hacer: pasos(clic('Remind me later'), clic('Exit clinical Mode', 'link')), nota: 'Si la nota queda sin firmar, la ficha muestra Pending Signature en lugar del botón de encuentro.' },
        { nombre: 'Review and sign', hacer: clic(/Pending Signature/), nota: 'Pending Signature abre Review and sign; al firmar vuelve Start Encounter.' },
      ],
    },
  ],
}
