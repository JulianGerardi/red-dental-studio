/* Settings → Employees. Ver design-reference/figma/modulos/employees.md y billing-profile.md. */
import { clic, pasos, menuFila } from './_util.mjs'

const EMP = '/settings/team/emily-chen'

export default {
  pagina: '⚙️ Settings — Employees',
  orden: 15,
  resumen: 'El equipo: alta de empleados, roles por sede, datos de provider, horarios y su Billing Profile.',
  jira: ['CON-1548', 'CON-2889', 'CON-4003'],
  flujos: [
    {
      nombre: 'Employees — List & New Employee',
      rol: 'Administración',
      jira: ['CON-1548', 'CON-2889'],
      resumen: 'Listar al equipo y sumar a alguien: General → Contact → Address.',
      pantallas: [
        { nombre: 'Employees', ruta: '/settings/team', nota: 'Tabla del equipo, con selección múltiple y buscador.' },
        { nombre: 'Row actions', hacer: menuFila('Emily Chen'), nota: 'El ⋮: Edit, Delete, Suspend, Terminate, Disable y Remove Provider Role.' },
        { nombre: 'New Employee · General', ruta: '/settings/team/new', nota: 'New Employee (ruta /team/new). Se puede vincular a una persona que ya existe en el sistema.' },
        { nombre: 'General · required', hacer: clic(/Next Step/), nota: 'Obligatorios: First name, Last name, Birthdate y Email.' },
      ],
    },
    {
      nombre: 'Employees — Employee detail',
      rol: 'Administración',
      jira: ['CON-2889', 'CON-2890', 'CON-3115'],
      resumen: 'El detalle de un empleado, en pestañas.',
      pantallas: [
        { nombre: 'Employee', ruta: EMP, nota: 'Employee: datos personales, contacto y dirección.' },
        { nombre: 'Roles & Location', hacer: clic('Roles & Location', 'tab'), nota: 'Roles & Location: qué rol tiene en cada sede.' },
        { nombre: 'Provider Info', hacer: clic('Provider Info', 'tab'), nota: 'Provider Info: datos del profesional. Primary Provider prepara su Billing Profile.' },
        { nombre: 'Working Hours', hacer: clic('Working Hours', 'tab'), nota: 'Working Hours: los horarios del provider por sede.' },
      ],
    },
    {
      nombre: 'Employees — Provider Billing Profile',
      rol: 'Administración',
      jira: ['CON-4004', 'CON-4005', 'CON-4006', 'CON-4007', 'CON-4031'],
      resumen: 'Guardar Primary Provider suma la pestaña Insurance / Billing Profile; apagarlo pregunta y deja el perfil de lectura.',
      pantallas: [
        { nombre: 'Primary Provider on', ruta: EMP, hacer: pasos(clic('Provider Info', 'tab'), (p) => p.getByRole('switch').first().click(), clic('Save')), nota: 'Con Primary Provider guardado aparece la pestaña del perfil.' },
        { nombre: 'Billing Profile', hacer: clic('Insurance / Billing Profile', 'tab'), nota: 'El perfil del provider: datos de facturación y Contracted With.' },
        { nombre: 'Unsaved changes', hacer: pasos(clic('Cigna Dental contracted', 'checkbox'), clic('Employee', 'tab')), nota: 'Cambiar de pestaña con cambios sin guardar pide confirmación.' },
        { nombre: 'Deactivate Primary Provider', ruta: '/settings/team/elena-martinez', hacer: pasos(clic('Provider Info', 'tab'), (p) => p.getByRole('switch').first().click(), clic('Save')), nota: 'Apagar Primary Provider pregunta antes; si está en Insurance Defaults, queda bloqueado (CON-4031).' },
      ],
    },
  ],
}
