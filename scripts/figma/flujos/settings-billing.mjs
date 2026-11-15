/* Settings → Billing (Fee Schedules, Carriers, Coverage Tables) y Ledger Options.
   Ver design-reference/figma/modulos/settings-billing.md y settings-ledger.md. */
import { clic, pasos, llenar, menuFila } from './_util.mjs'

const F = '/settings/finance'

export default {
  pagina: '⚙️ Settings — Billing & Ledger',
  orden: 17,
  resumen: 'Las tablas de las que depende la facturación: aranceles, carriers con sus planes, tablas de cobertura y opciones del Ledger.',
  jira: ['CON-57', 'CON-1113', 'CON-1063', 'CON-3732'],
  flujos: [
    {
      nombre: 'Billing — Fee Schedules',
      rol: 'Administración',
      jira: ['CON-57'],
      resumen: 'Los aranceles: lista, alta (en blanco o copiando) y edición por procedimiento.',
      pantallas: [
        { nombre: 'Fee Schedules', ruta: `${F}/fee-schedule`, nota: 'Lista con estado y cantidad de asignaciones. Arranca con filtros aplicados.' },
        { nombre: 'Filters', hacer: clic(/^Filters/), nota: 'Filters por estado: Active, Inactive, Archived.' },
        { nombre: 'Row actions', ruta: `${F}/fee-schedule`, hacer: menuFila('Aetna 2026'), nota: 'El ⋮: Edit, View assignments y Compare fees.' },
        { nombre: 'New Fee Schedule', ruta: `${F}/fee-schedule/new`, nota: 'Alta: tipo, vigencia y el monto de cada procedimiento. Copy form trae los de otro arancel; Bulk Edit cambia varios a la vez.' },
        { nombre: 'Edit Fee Schedule', ruta: `${F}/fee-schedule/aetna-2026/edit`, nota: 'Edición con la lista de aranceles al costado para cambiar de uno a otro.' },
      ],
    },
    {
      nombre: 'Billing — Carriers & Insurance Plans',
      rol: 'Administración',
      jira: ['CON-1113', 'CON-4033'],
      resumen: 'Los carriers y sus planes. Un plan nuevo se arma en cuatro pasos y sigue en su Coverage Table.',
      pantallas: [
        { nombre: 'Carriers', ruta: `${F}/carriers`, nota: 'Tabla de carriers.' },
        { nombre: 'New Carrier', ruta: `${F}/carriers/new`, nota: 'New Carrier (ruta /carriers/new). El buscador de carrier completa el Payer ID.' },
        { nombre: 'New Carrier · required', hacer: clic(/Next Step/), nota: 'Next Step marca los obligatorios.' },
        { nombre: 'Edit Carrier · Information', ruta: `${F}/carriers/cigna/edit`, nota: 'Information: datos del carrier y opciones de facturación.' },
        { nombre: 'Insurance Plans / Employers', ruta: `${F}/carriers/cigna/edit/insurance-plans`, nota: 'Los planes del carrier.' },
        { nombre: 'New Insurance Plan', ruta: `${F}/carriers/cigna/edit/insurance-plans/new`, nota: 'Plan nuevo en cuatro pasos (ruta …/insurance-plans/new).' },
        {
          nombre: 'New Insurance Plan · step 2',
          hacer: pasos(llenar('Plan or employer name', 'Globex Corp'), llenar('Group number', 'CIG-7781'), clic(/Next Step/)),
          nota: 'Nombre y número de grupo; después contacto, dirección y beneficios.',
        },
      ],
    },
    {
      nombre: 'Billing — Coverage Tables',
      rol: 'Administración',
      jira: ['CON-1063'],
      resumen: 'Qué porcentaje cubre el seguro por rango de códigos.',
      pantallas: [
        { nombre: 'Coverage Tables', ruta: `${F}/coverage-table`, nota: 'Lista de tablas de cobertura, con filtro por tipo.' },
        { nombre: 'New Coverage Table', ruta: `${F}/coverage-table/new`, nota: 'Alta: se suman rangos de códigos con su porcentaje (Add Range).' },
        { nombre: 'Edit Coverage Table', ruta: `${F}/coverage-table/standard-ppo/edit`, nota: 'Edición de una tabla existente.' },
      ],
    },
    {
      nombre: 'Ledger — Ledger Options',
      rol: 'Administración',
      jira: ['CON-3732'],
      resumen: 'Qué tipos de ajuste y métodos de pago ofrece el Ledger.',
      pantallas: [
        { nombre: 'Ledger Options', ruta: '/settings/ledger', nota: 'Tipos de ajuste y métodos de pago; cada uno se habilita con su switch.' },
        { nombre: 'Tab · Credit', hacer: clic('Credit', 'tab'), nota: 'Pestañas por categoría: Charge, Credit, Production, Collections.' },
      ],
    },
  ],
}
