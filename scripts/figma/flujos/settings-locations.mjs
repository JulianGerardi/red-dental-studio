/* Settings → Locations (con Billing Profile e Insurance Defaults). Ver design-reference/figma/modulos/locations.md,
   billing-profile.md e insurance-defaults.md. */
import { clic, pasos, llenar, menuFila } from './_util.mjs'

const LOC = '/settings/locations/abril'

export default {
  pagina: '⚙️ Settings — Locations',
  orden: 14,
  resumen: 'Las sedes del consultorio: datos, horarios, salas, excepciones, perfil de facturación y defaults de seguros.',
  jira: ['CON-1590', 'CON-4019', 'CON-1173', 'CON-1546', 'CON-2890'],
  flujos: [
    {
      nombre: 'Locations — List & New Location',
      rol: 'Administración',
      jira: ['CON-1590'],
      resumen: 'Listar las sedes y crear una: General → Contact → Address.',
      pantallas: [
        { nombre: 'Settings', ruta: '/settings/general', nota: 'Settings: el índice de todo lo configurable. Los que todavía no existen llevan a un placeholder.' },
        { nombre: 'Locations', ruta: '/settings/locations', nota: 'Tabla de sedes con buscador.' },
        { nombre: 'Row actions', hacer: menuFila('Abril'), nota: 'El ⋮: Edit location y Delete location.' },
        { nombre: 'New Location · General', ruta: '/settings/locations/new', nota: 'New location abre el drawer (ruta /locations/new). Obligatorios: Name y Default Fee Schedule.' },
        { nombre: 'General · required', hacer: clic(/Next Step/), nota: 'Next Step sin completar marca los obligatorios.' },
      ],
    },
    {
      nombre: 'Locations — Information, Working Hours, Rooms, Exceptions',
      rol: 'Administración',
      jira: ['CON-1590', 'CON-38'],
      resumen: 'El detalle de una sede, en pestañas.',
      pantallas: [
        { nombre: 'Information', ruta: LOC, nota: 'Information: General, Contact y Address ("Adress" viene así del Figma, anotado como anomalía).' },
        { nombre: 'Working Hours', ruta: `${LOC}?type=working-hours`, nota: 'Working Hours: cada día Open o Closed con sus horas.' },
        { nombre: 'Working Hours · open a day', hacer: clic('Sunday open', 'switch'), nota: 'Activar un día cerrado abre Set working hours; Cancel lo deja Closed. Aplicar a otros días, en el flujo siguiente.' },
        { nombre: 'Rooms', ruta: `${LOC}?type=rooms`, nota: 'Rooms: las salas de la sede y su estado.' },
        { nombre: 'New Room', hacer: clic('New Room'), nota: 'New Room pide Name y Type; no deja repetir el nombre.' },
        { nombre: 'Deactivate room with appointments', ruta: `${LOC}?type=rooms`, hacer: clic('Operatory 1 active', 'switch'), nota: 'Desactivar una sala con turnos los muestra: se pasan a otra sala o a la lista de espera al confirmar.' },
        { nombre: 'Exceptions', ruta: LOC, hacer: clic('Exceptions', 'tab'), nota: 'Exceptions: feriados y días con horario especial.' },
      ],
    },
    {
      nombre: 'Locations — Set working hours: other days & affected appointments',
      rol: 'Administración, recepción',
      jira: ['CON-1546', 'CON-2890'],
      resumen: 'Cargar un horario una vez y aplicarlo a otros días. Si pisa el horario distinto de un día abierto se pregunta antes, y los turnos que quedan afuera se resuelven antes de guardar.',
      pantallas: [
        { nombre: 'Working Hours', ruta: `${LOC}?type=working-hours`, nota: 'La semana de la sede: Sunday y Saturday cerrados, el resto con sus franjas.' },
        { nombre: 'Set working hours · origin day', hacer: clic('Sunday open', 'switch'), alto: 'fijo', nota: 'Activar Sunday abre el panel con una fila vacía. Sunday (el día de origen) va relleno y no se puede sacar.' },
        { nombre: 'Other days selected', hacer: pasos(clic('00:00 hs'), clic('09:00 hs'), clic('00:00 hs'), clic('14:00 hs'), clic(/^Monday$/), clic(/^Tuesday$/)), alto: 'fijo', nota: '09:00 a 14:00 y Monday y Tuesday elegidos además. Los días adicionales pueden estar Open o Closed.' },
        { nombre: 'Replace working hours?', hacer: clic(/^Save/), alto: 'fijo', nota: 'Monday y Tuesday están Open con otro horario: Save pregunta antes. Nombra sólo esos días, en el orden de la tabla. Cancel vuelve al panel sin guardar.' },
        { nombre: 'Affected appointments', hacer: clic('Confirm'), alto: 'fijo', nota: 'Confirm sigue con los turnos: dos quedan fuera de las horas nuevas (Proposed y Booked). Todavía no se guardó nada.' },
        { nombre: 'Manage one appointment', hacer: pasos(clic(/Actions for appointment for John Smith/), clic('Mark as No Show', 'menuitem')), alto: 'fijo', nota: 'Por turno: Edit appointment, Cancel appointment o Mark as No Show. Cada fila dice qué le va a pasar.' },
        { nombre: 'Hours saved', hacer: clic('Confirm'), nota: 'Confirm guarda las horas en los tres días y pasa el turno que quedaba a Waiting List: "Hours saved for 3 days. 1 appointment was moved to the waiting list."' },
      ],
    },
    {
      nombre: 'Locations — Insurance / Billing Profile',
      rol: 'Administración',
      jira: ['CON-4021', 'CON-4026', 'CON-4027', 'CON-4028'],
      resumen: 'Habilitar la sede como Billing Provider, cargar sus datos y marcar con qué carriers tiene contrato.',
      pantallas: [
        { nombre: 'Billing Profile · disabled', ruta: LOC, hacer: clic('Insurance / Billing Profile', 'tab'), nota: 'Arranca deshabilitado: los datos se ven de lectura.' },
        { nombre: 'Enable · required', hacer: pasos(clic('Use this Location as a Billing Provider', 'switch'), clic('Save and enable')), nota: 'Se habilita sólo al guardar datos válidos (NPI de 10 dígitos, Tax ID de 9).' },
        { nombre: 'Profile enabled', hacer: pasos(llenar('10 digits', '1234567890'), llenar('9 digits', '123456789'), clic('Save and enable')), nota: 'Habilitado: aparece Contracted With con los carriers.' },
        { nombre: 'Contracted With', hacer: clic('Aetna Dental Plans contracted', 'checkbox'), nota: 'Se tilda cada carrier con contrato y se guarda con Save carrier contracts.' },
        { nombre: 'Disable profile', hacer: pasos(clic('Save carrier contracts'), clic('Use this Location as a Billing Provider', 'switch')), nota: 'Deshabilitar pide confirmar. Si el perfil está en Insurance Defaults, no se puede (CON-4032).' },
      ],
    },
    {
      nombre: 'Locations — Insurance Defaults',
      rol: 'Administración',
      jira: ['CON-4029', 'CON-3894', 'CON-3896', 'CON-4030', 'CON-3898', 'CON-3899'],
      resumen: 'Qué Billing Provider, Rendering Provider y referencia contractual usa la sede por defecto.',
      pantallas: [
        { nombre: 'Insurance Defaults', ruta: LOC, hacer: clic('Insurance Defaults', 'tab'), nota: 'Valores iniciales de la sede.' },
        { nombre: 'Specific Billing Profile · required', hacer: pasos(clic('Specific Billing Profile', 'radio'), clic('Save changes')), nota: 'Elegir "Specific" obliga a seleccionar un perfil.' },
        { nombre: 'Select Billing Profile', hacer: clic('Select Billing Profile'), nota: 'El selector lista los Billing Profiles habilitados.' },
        { nombre: 'Defaults saved', hacer: pasos(clic(/Bayside Dental Group/, 'radio'), clic('Select profile'), clic('Save changes')), nota: 'Save changes guarda los defaults.' },
      ],
    },
  ],
}
