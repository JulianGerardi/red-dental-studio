/* Patients: lista, alta y edición. Ver design-reference/figma/modulos/patients.md. */
import { clic, escribir, pasos, menuFila } from './_util.mjs'

const menor = pasos(
  escribir(/First Name/, 'Mia'), escribir(/Last Name/, 'Lopez'),
  clic('Pick a date'), clic(/1990/), escribir('Year', '2016'), clic(/January 15, 2016/),
)

export default {
  pagina: '🧍 Patients',
  orden: 4,
  resumen: 'Recepción busca al paciente, lo da de alta (con guardián si es menor) y edita sus datos desde la lista.',
  jira: ['CON-3910', 'CON-2107', 'CON-2858'],
  flujos: [
    {
      nombre: 'Patients — List',
      rol: 'Recepción',
      jira: ['CON-3910'],
      resumen: 'Consultar pacientes: buscar por nombre y entrar a la ficha o a las acciones de la fila.',
      pantallas: [
        { nombre: 'Patients list', ruta: '/patients', nota: 'Punto de partida. La tabla trae 10 por página; a la derecha, los turnos de hoy y los pacientes recientes.' },
        { nombre: 'Search by name', hacer: pasos(escribir(/Search by Name/, 'Sofia'), clic('Search')), nota: 'Escribe nombre o apellido y toca Search: la tabla queda con las coincidencias.' },
        { nombre: 'Row actions', ruta: '/patients', hacer: menuFila('Abril Viola'), nota: 'El menú ⋮ de la fila ofrece Overview (ficha) y Edit (drawer Edit Patient). El nombre también lleva a la ficha.' },
      ],
    },
    {
      nombre: 'Patients — New Patient (adulto)',
      rol: 'Recepción',
      jira: ['CON-2107'],
      resumen: 'Alta de un adulto: General → Demography → Save. Sin paso Guardian.',
      pantallas: [
        { nombre: 'New Patient · General', ruta: '/patients', hacer: clic(/New Patient/), nota: 'New Patient abre el drawer en el paso General. Obligatorios: First Name, Last Name y Birthdate.' },
        { nombre: 'General · required fields', hacer: clic(/Next Step/), nota: 'Next Step sin completar marca los obligatorios; no avanza.' },
        {
          nombre: 'General · filled',
          hacer: pasos(escribir(/First Name/, 'Laura'), escribir(/Last Name/, 'Gomez'), clic('Pick a date'), clic(/1990/), escribir('Year', '1988'), clic(/January 15, 1988/), escribir(/^Email/, 'laura.gomez@mail.com')),
          nota: 'Con los datos cargados. La fecha se elige en el calendario; el año se puede escribir.',
        },
        { nombre: 'Demography', hacer: clic(/Next Step/), nota: 'Adulto: de General pasa directo a Demography (opcional: teléfono, idioma, dirección).' },
        { nombre: 'Patient added', hacer: clic(/^Save/), nota: 'Save cierra el drawer, suma la fila a la tabla y avisa con un toast.' },
      ],
    },
    {
      nombre: 'Patients — New Patient (menor con guardián)',
      rol: 'Recepción',
      jira: ['CON-2858'],
      resumen: 'Si el paciente es menor de 18 aparece el paso Guardian: se busca a alguien del sistema o se carga una persona nueva.',
      pantallas: [
        { nombre: 'General · minor', ruta: '/patients', hacer: pasos(clic(/New Patient/), menor), nota: 'Con una fecha de nacimiento de menor, el indicador suma el paso Guardian.' },
        { nombre: 'Guardian · empty', hacer: clic(/Next Step/), nota: 'Paso Guardian: avisa que el menor necesita al menos un guardián.' },
        { nombre: 'Guardian · from the system', hacer: pasos(escribir('Guardian', 'Jessica', 'combobox'), clic(/^Jessica Miller/, 'option')), nota: 'Buscar a alguien que ya existe: no se vuelven a pedir sus datos de contacto.' },
        { nombre: 'Guardian · relationship', hacer: pasos(clic(/Select a relationship type/), clic('Parent')), nota: 'Relationship type es obligatorio. "This person is also a guarantor" lo suma como responsable de pago.' },
        { nombre: 'Demography', hacer: clic(/Next Step/), nota: 'Último paso, opcional.' },
        { nombre: 'Patient added', hacer: clic(/^Save/), nota: 'Save: el paciente queda en la lista con su guardián vinculado (ver Relationships & Billing).' },
      ],
    },
    {
      nombre: 'Patients — New Patient (guardián nuevo)',
      rol: 'Recepción',
      jira: ['CON-2858'],
      resumen: 'Alternativa: el guardián no existe en el sistema y se carga como persona nueva.',
      pantallas: [
        { nombre: 'Guardian · Add New Person', ruta: '/patients', hacer: pasos(clic(/New Patient/), menor, clic(/Next Step/), clic('Add New Person', 'checkbox')), nota: 'Add New Person despliega Personal Information; Contact y Address quedan plegados hasta abrirlos o hasta que falte algo.' },
        { nombre: 'Guardian · validation', hacer: pasos(escribir(/^First name/, 'Ana'), escribir(/^Last name/, 'Lopez'), clic(/Next Step/)), nota: 'Next Step con datos incompletos abre la sección donde falta algo y marca el campo.' },
      ],
    },
    {
      nombre: 'Patients — Link existing person',
      rol: 'Recepción',
      jira: ['CON-2107'],
      resumen: 'La persona ya existe (empleado, contacto, suscriptor): se la vincula en vez de cargar sus datos de nuevo.',
      pantallas: [
        { nombre: 'Link a person', ruta: '/patients', hacer: pasos(clic(/New Patient/), clic(/link a person that already exists/, 'checkbox')), nota: 'El tilde cambia los campos por el buscador de personas.' },
        { nombre: 'Person search', hacer: escribir('Person', 'Miller', 'combobox'), nota: 'Busca por nombre. Quien ya es paciente no aparece.' },
        { nombre: 'Person selected', hacer: clic(/^Michael Miller/, 'option'), nota: 'La ficha usará nombre, fecha de nacimiento y email de la persona elegida.' },
      ],
    },
    {
      nombre: 'Patients — Edit',
      rol: 'Recepción',
      jira: ['CON-2107'],
      resumen: 'Editar algo que ya existe: las secciones van en pestañas (no en pasos) y un solo Save Changes guarda todo.',
      pantallas: [
        { nombre: 'Edit Patient · General', ruta: '/patients', hacer: menuFila('Abril Viola', 'Edit'), nota: 'Edit abre el drawer en la pestaña General, con los datos cargados.' },
        { nombre: 'Edit Patient · Guardian', hacer: clic(/Guardian/, 'tab'), nota: 'Guardian: los guardianes del paciente; se agrega uno del sistema o uno nuevo.' },
        { nombre: 'Edit Patient · Demography', hacer: clic(/Demography/, 'tab'), nota: 'Demography: contacto y dirección.' },
      ],
    },
  ],
}
