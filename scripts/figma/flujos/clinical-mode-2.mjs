/* Clinical Mode, segunda tanda (2026-11-16): Treatment (workflows), Radiography y Lab Order en profundidad.
   Physical, ROS, Periodontal, Patient Summary, Prescription y Referral siguen siendo placeholders en la app: se documentan
   desde Platform Design (ver design-reference/figma-docs.md). */
import { clic, pasos, texto, menuFila } from './_util.mjs'

const CM = '/patients/patient-0001/clinical-mode'
const registro = (nombre) => pasos(clic(/^Exams/), clic(typeof nombre === 'string' ? new RegExp(`^${nombre}$`) : nombre, 'menuitem'))

export default {
  pagina: '🦷 Clinical Mode',
  orden: 11,
  resumen: 'Treatment (workflows del encuentro), Radiography y Lab Order en profundidad.',
  jira: ['CON-3114', 'CON-2412', 'CON-2793', 'CON-1649', 'CON-2214', 'CON-2724'],
  flujos: [
    {
      nombre: 'Treatment — Workflows',
      rol: 'Odontólogo',
      jira: ['CON-3114', 'CON-2412', 'CON-2793'],
      resumen: 'Los workflows del encuentro (Chief Complaint, Triage, Social History…): se elige uno, se responde y se guarda el paso.',
      pantallas: [
        { nombre: 'Treatment', ruta: CM, hacer: registro('Treatment'), alto: 'fijo', nota: 'A la izquierda las secciones del workflow elegido con sus preguntas; a la derecha la lista de workflows, el avance y los planes de tratamiento.' },
        { nombre: 'Filter workflows', hacer: clic('Filter workflows'), alto: 'fijo', nota: 'El filtro de la lista de workflows por tipo.' },
        { nombre: 'Workflow actions', ruta: CM, hacer: pasos(registro('Treatment'), clic(/Actions for Chief Complaint/)), alto: 'fijo', nota: 'El ⋮ de cada workflow.' },
        { nombre: 'Workflow selected', ruta: CM, hacer: pasos(registro('Treatment'), clic(/Chief Complaint Questionnaire/)), alto: 'fijo', nota: 'Al elegir un workflow se abren sus preguntas y el avance de pasos.' },
        { nombre: 'Answer question', ruta: CM, hacer: pasos(registro('Treatment'), clic('Yes', 'button', 0)), alto: 'fijo', nota: 'Las respuestas sí/no y de opción múltiple se marcan en el momento; Save Step guarda el paso.' },
        { nombre: 'Hide section', ruta: CM, hacer: pasos(registro('Treatment'), clic(/Hide Triage/)), alto: 'fijo', nota: 'Una sección se puede ocultar con el ojo; Show hidden la vuelve a mostrar.' },
        { nombre: 'Generate Narrative', ruta: CM, hacer: pasos(registro('Treatment'), clic('Generate Narrative')), alto: 'fijo', nota: 'Generate Narrative arma la nota clínica con lo respondido.' },
      ],
    },
    {
      nombre: 'Radiography — Gallery, Upload & Viewer',
      rol: 'Odontólogo',
      jira: ['CON-1649'],
      resumen: 'La galería de radiografías del paciente, la carga de una imagen y el visor.',
      pantallas: [
        { nombre: 'Gallery', ruta: CM, hacer: clic('Radiographic'), alto: 'fijo', nota: 'La galería ordenada por fecha, con tipo (Panoramic, Bitewing, Periapical, Cephalometric), buscador y Add image.' },
        { nombre: 'Add image', hacer: clic('Add image'), alto: 'fijo', nota: 'Add image abre la carga: se arrastra o se elige el archivo y se ve el avance.' },
        { nombre: 'Viewer', ruta: CM, hacer: pasos(clic('Radiographic'), clic(/Open Panoramic/)), alto: 'fijo', nota: 'El visor abre la imagen a pantalla completa con las herramientas de la placa.' },
      ],
    },
    {
      nombre: 'Lab Order — List & Actions',
      rol: 'Odontólogo',
      jira: ['CON-2214'],
      resumen: 'Las órdenes de laboratorio del paciente, con filtro por estado y acciones por fila.',
      pantallas: [
        { nombre: 'Lab Order list', ruta: CM, hacer: registro('Lab Order'), alto: 'fijo', nota: 'La tabla de órdenes: provider, paciente, estado, fechas y acciones. Las que vencen pronto van en rojo.' },
        { nombre: 'Filter', hacer: clic('Filter lab orders by status'), alto: 'fijo', nota: 'Filter por estado (Pending, Requested, Delivered, Delayed, Rejected, Canceled).' },
        { nombre: 'Row actions', ruta: CM, hacer: pasos(registro('Lab Order'), menuFila('James Cartes')), alto: 'fijo', nota: 'El ⋮ de cada orden: View order, Edit order y Cancel order.' },
        { nombre: 'View History', ruta: CM, hacer: pasos(registro('Lab Order'), clic('View History')), alto: 'fijo', nota: 'View History muestra las órdenes anteriores.' },
      ],
    },
  ],
}
