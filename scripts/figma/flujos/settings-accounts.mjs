/* Settings → Accounts. Ver design-reference/figma/modulos/settings-accounts.md. */
import { clic, menuFila } from './_util.mjs'

export default {
  pagina: '⚙️ Settings — Accounts',
  orden: 13,
  resumen: 'Las cuentas (clínicas) de la plataforma: alta, edición, licencias y suspensión.',
  jira: ['CON-895'],
  flujos: [
    {
      nombre: 'Accounts — Overview & New Account',
      rol: 'Administración de la plataforma',
      jira: ['CON-895'],
      resumen: 'Listar las cuentas y crear una: Information → Address → Owner.',
      pantallas: [
        { nombre: 'Accounts overview', ruta: '/settings/accounts', nota: 'Tabla de cuentas con buscador y filtro por estado.' },
        { nombre: 'Filter by status', hacer: clic('Filter by status'), nota: 'Filtro por estado de la cuenta.' },
        { nombre: 'Row actions', ruta: '/settings/accounts', hacer: menuFila('caba'), nota: 'El ⋮: Edit account, Manage licenses y Suspend.' },
        { nombre: 'New Account · Information', ruta: '/settings/accounts', hacer: clic('New Account'), nota: 'New Account: nombre, subdominio y contacto.' },
        { nombre: 'Information · required', hacer: clic(/Next Step/), nota: 'Next Step marca los obligatorios.' },
      ],
    },
    {
      nombre: 'Accounts — Edit Account',
      rol: 'Administración',
      jira: ['CON-895'],
      resumen: 'La cuenta propia o la de una clínica, en pestañas.',
      pantallas: [
        { nombre: 'Edit Account · Information', ruta: '/settings/account', nota: 'Information: logo, datos generales, contacto y dirección.' },
        { nombre: 'Subscription', hacer: clic('Subscription', 'tab'), nota: 'Subscription: plan y licencias.' },
        { nombre: 'Owner', hacer: clic('Owner', 'tab'), nota: 'Owner: el dueño de la práctica.' },
        { nombre: 'Account from the list', ruta: '/settings/accounts/c10', nota: 'Desde la lista, la misma pantalla con los datos de esa cuenta.' },
      ],
    },
  ],
}
