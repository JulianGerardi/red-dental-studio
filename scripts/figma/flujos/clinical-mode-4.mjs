/* Clinical Mode, cuarta tanda (2026-11-16): pantallas que en la app son placeholders «Planned» (Prescription, Referral, ROS,
   Treatment History). Se captura el shell real de la app con la pestaña activa y la documentación del flujo; después, en
   Figma, el contenido placeholder se reemplaza por el del diseño de Platform Design (ver design-reference/figma-docs.md). */
import { clic, pasos } from './_util.mjs'

const CM = '/patients/patient-0001/clinical-mode'
const registro = (n) => pasos(clic(/^Exams/), clic(new RegExp(`^${n}$`), 'menuitem'))
const examen = (n) => clic(n, 'button')
const hist = registro('Patient Summary')

export default {
  pagina: '🦷 Clinical Mode',
  orden: 13,
  resumen: 'Prescription, Referral, ROS y Treatment History: diseño de Platform Design adecuado al shell de la plataforma.',
  jira: ['CON-2212', 'CON-2321', 'CON-1397'],
  flujos: [
    {
      nombre: 'Prescription — List & New',
      rol: 'Odontólogo',
      jira: ['CON-2212'],
      resumen: 'Las recetas del paciente y el alta de una receta nueva. En la app hoy es un placeholder «Planned»; el contenido sale del diseño de Platform Design.',
      pantallas: [
        { nombre: 'Prescription list', ruta: CM, hacer: registro('Prescription'), alto: 'fijo', nota: 'Tabla de recetas: provider, medicamentos (con cantidad), estado, fechas de creación, inicio y fin (en rojo si vence pronto) y acciones. Pie "Showing 9 active prescriptions" y View History.' },
        { nombre: 'New Prescription', ruta: CM, hacer: registro('Prescription'), alto: 'fijo', nota: 'New Prescription: Medication Details (medicamento, dosis, forma, cantidad, refills y tres interruptores) y Directions for Use (dosage, vía, frecuencia y duración) con el resumen en azul; Additional instructions, New Medication, Cancel y Save.' },
      ],
    },
    {
      nombre: 'Referral — List & New',
      rol: 'Odontólogo',
      jira: ['CON-2321'],
      resumen: 'Las derivaciones del paciente y el alta de una nueva. En la app hoy es un placeholder «Planned».',
      pantallas: [
        { nombre: 'Referral list', ruta: CM, hacer: registro('Referral'), alto: 'fijo', nota: 'Tabla de derivaciones con filtro, estado y acciones por fila.' },
        { nombre: 'Referral create', ruta: CM, hacer: registro('Referral'), alto: 'fijo', nota: 'Referral: General information (Referral Provider, Procedure Finder, procedimientos elegidos, ASAP y Mandatory to continue treatment) y Notes (Dental Work Requested, Special Instructions y carga de archivos con avance).' },
      ],
    },
    {
      nombre: 'ROS — General',
      rol: 'Odontólogo',
      jira: ['CON-1397'],
      resumen: 'Review of Systems: síntomas por sistema, marcados como negativos o activos. En la app hoy es un placeholder «Planned».',
      pantallas: [
        { nombre: 'ROS · General', ruta: CM, hacer: examen('ROS'), alto: 'fijo', nota: 'A la izquierda los hallazgos del paciente; a la derecha los sistemas (General, H.E.E.N.T, Cardiovascular, Respiratory…) y la tabla de condiciones con interruptor Negative / Active, Mark all Negative y acciones.' },
      ],
    },
    {
      nombre: 'Treatment History',
      rol: 'Odontólogo',
      jira: ['CON-3939'],
      resumen: 'El historial de tratamientos y de planes del paciente. No existe todavía en la app: el diseño de Platform Design está marcado WIP.',
      pantallas: [
        { nombre: 'Treatment History', ruta: CM, hacer: hist, alto: 'fijo', nota: 'Tabla del historial con filtro por fecha. WIP en el diseño: sin estados ni acciones definidos.' },
      ],
    },
  ],
}
