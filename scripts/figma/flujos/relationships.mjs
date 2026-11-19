/* Ficha del paciente → Relationships & Billing. Ver design-reference/figma/modulos/relationships.md
   (CON-4000, CON-3174, CON-3999, CON-4139). Las historias CON-3958 y las de archivar están canceladas: no se usan. */
import { clic, pasos, menuFila, escribir, enDialogo, elegirSelects } from './_util.mjs'

const REL = '/patients/1/relationships'
const abrir = clic('Add Relationship')
const buscar = (nombre) => pasos(escribir(/person/i, nombre, 'combobox'), clic(new RegExp(`^${nombre}`), 'option'))
const contactoCompleto = pasos(
  enDialogo((d) => d.getByPlaceholder('408-XXX-XXXX').fill('4083551234')),
  enDialogo((d) => d.getByPlaceholder('Placeholder@gmail.com').fill('rob.miller@outlook.com')),
  enDialogo((d) => d.getByPlaceholder('5678').fill('90012')),
  elegirSelects(),
)
const roles = pasos(clic('Guardian', 'checkbox'), clic('Guarantor', 'checkbox'))

export default {
  pagina: '🔗 Patient record — Relationships & Billing',
  orden: 6,
  resumen: 'Quién responde por el paciente: guardianes (decisiones) y garantes (pago), y los pacientes del mismo hogar. Lo que se cargue acá define de quién es la cuenta en Ledger y Billing.',
  jira: ['CON-2879', 'CON-2858', 'CON-4000', 'CON-3999', 'CON-3174', 'CON-3985'],
  flujos: [
    {
      nombre: 'Relationships — List',
      rol: 'Recepción · Administración',
      jira: ['CON-2879'],
      resumen: 'Ver las relaciones del paciente y el hogar que comparte garante.',
      pantallas: [
        { nombre: 'Relationships & Billing', ruta: REL, nota: 'Se llega desde Relationships & Billing del menú del paciente. Cada relación es una card con su rol (Guardian, Guarantor) y sus datos de contacto; el nombre lleva a la ficha si la persona también es paciente (CON-4139).' },
        { nombre: 'Row actions', hacer: menuFila('Jessica Miller'), nota: 'El ⋮ ofrece Edit relationship y Delete relationship. Ya no hay archivar ni reactivar (CON-4000).' },
        { nombre: 'Household', ruta: REL, hacer: (p) => p.getByRole('heading', { name: /Household/ }).scrollIntoViewIfNeeded(), nota: 'Debajo, Household / Same Guarantor Patients: los pacientes que comparten garante, sólo lectura. Es lo que suma la vista Guarantor View de Ledger y Billing.' },
      ],
    },
    {
      nombre: 'Relationships — Add (persona con contacto)',
      rol: 'Recepción',
      jira: ['CON-2879', 'CON-3174', 'CON-3985'],
      resumen: 'Vincular a alguien del sistema que ya tiene teléfono y dirección: Person → Relationship. El paso Contact no aparece.',
      pantallas: [
        { nombre: 'Add Relationship · Person', ruta: REL, hacer: abrir, nota: 'Add Relationship abre el drawer. El indicador arranca con Person · Contact · Relationship.' },
        { nombre: 'Person · required', hacer: clic(/Next Step/), nota: 'Next Step sin elegir a nadie avisa y no avanza.' },
        { nombre: 'Person · search', hacer: escribir(/person/i, 'Michael', 'combobox'), nota: 'Select person busca en las personas del sistema (empleados, contactos, suscriptores) y muestra DOB y email para distinguir homónimos.' },
        { nombre: 'Person selected · two steps', hacer: clic(/^Michael/, 'option'), nota: 'Michael Miller ya tiene contacto cargado: el indicador pasa a Person · Relationship (CON-3174, regla 4).' },
        { nombre: 'Relationship · required', hacer: pasos(clic(/Next Step/), clic(/^Save/)), nota: 'Assign relationship role: hay que elegir Guardian, Guarantor o los dos, y a quién responde cada uno. Save sin eso marca los obligatorios.' },
        { nombre: 'Relationship · filled', hacer: pasos(clic('Guardian', 'checkbox'), clic(/is Guardian for/, 'radio'), clic(/^Select$/), clic('Parent')), nota: 'Direction dice quién es responsable de quién ("Michael Miller is Guardian for John Smith"). Relationship to Patient es obligatorio.' },
        { nombre: 'Relationship saved', hacer: clic(/^Save/), nota: 'Save cierra el drawer y suma la card nueva con el teléfono y la dirección que la persona ya tenía.' },
      ],
    },
    {
      nombre: 'Relationships — Add (persona sin contacto)',
      rol: 'Recepción',
      jira: ['CON-2879', 'CON-3174'],
      resumen: 'La persona existente no tiene teléfono ni dirección: aparece el paso Contact para completarlos antes de la relación.',
      pantallas: [
        { nombre: 'Person selected · three steps', ruta: REL, hacer: pasos(abrir, buscar('Robert')), nota: 'Robert Miller no tiene contacto: el indicador mantiene Person · Contact · Relationship.' },
        { nombre: 'Contact · required', hacer: pasos(clic(/Next Step/), clic(/Next Step/)), nota: 'Contact pide General Information (país, teléfono, email) y Address. Next Step sin completar marca cada campo ("This field is required.").' },
        { nombre: 'Contact · filled', hacer: contactoCompleto, nota: 'Con el contacto completo se habilita seguir. El email que la persona ya tenía viene precargado.' },
        { nombre: 'Relationship', hacer: clic(/Next Step/), nota: 'Último paso: roles, Direction y Relationship to Patient. Return vuelve a Contact sin perder lo escrito.' },
        { nombre: 'Relationship saved', hacer: pasos(roles, clic(/is Guardian and Guarantor for/, 'radio'), clic(/^Select$/), clic('Parent'), clic(/^Save/)), nota: 'Con Guardian y Guarantor elegidos, Save suma la card con los dos chips: Legal contact y Financial contact.' },
      ],
    },
    {
      nombre: 'Relationships — Add (persona nueva)',
      rol: 'Recepción',
      jira: ['CON-2879', 'CON-2858', 'CON-3174'],
      resumen: 'La persona no existe en el sistema: se la crea en el mismo drawer y siempre pasa por Contact.',
      pantallas: [
        { nombre: 'Add New Person', ruta: REL, hacer: pasos(abrir, clic('Add New Person', 'checkbox')), nota: 'Add New Person reemplaza el buscador por los datos de la persona: nombre, fecha de nacimiento y email.' },
        { nombre: 'Person · required', hacer: clic(/Next Step/), nota: 'Los obligatorios se marcan al intentar avanzar.' },
        { nombre: 'Person · filled', hacer: pasos(enDialogo((d) => d.getByRole('textbox', { name: /First name/i }).fill('Ana')), enDialogo((d) => d.getByRole('textbox', { name: /Last name/i }).fill('Miller'))), nota: 'Con nombre y apellido cargados; la fecha de nacimiento se elige en el calendario.' },
      ],
    },
    {
      nombre: 'Relationships — Edit & Delete',
      rol: 'Recepción',
      jira: ['CON-2879', 'CON-3999', 'CON-4000'],
      resumen: 'Editar el rol o el parentesco; la dirección de la relación no se cambia. Borrar es definitivo y pide confirmación.',
      pantallas: [
        { nombre: 'Edit Relationship', ruta: REL, hacer: menuFila('Jessica Miller', /Edit/), nota: 'Se edita Role (Guardian, Guarantor) y Relationship to Patient. La persona y la dirección quedan fijas: para cambiarlas se borra la relación y se crea otra.' },
        { nombre: 'Delete Relationship', ruta: REL, hacer: menuFila('Jessica Miller', /Delete/), nota: 'Delete pide confirmación y avisa que no se puede deshacer (CON-3999, borrado físico).' },
        { nombre: 'Relationship deleted', hacer: clic('Delete'), nota: 'Confirmar quita la card y avisa con un toast, sin Undo.' },
        { nombre: 'No related contacts', ruta: REL, hacer: async (p) => { for (let i = 0; i < 2; i += 1) { await p.getByRole('button', { name: /Actions for Jessica Miller/ }).first().click(); await p.getByRole('menuitem', { name: /Delete/ }).click(); await p.getByRole('dialog').last().getByRole('button', { name: 'Delete' }).click(); await p.waitForTimeout(400) } }, nota: 'Sin relaciones queda el vacío "No related contacts" con Add Relationship. Household no cambia.' },
      ],
    },
    {
      nombre: 'Relationships & Billing — Guarantor in billing',
      rol: 'Administración',
      jira: ['CON-2879', 'CON-3732', 'CON-4147'],
      resumen: 'El garante que se carga acá define de quién es la cuenta: Ledger y Billing suman a todo el hogar en Guarantor View.',
      pantallas: [
        { nombre: 'Household on the guarantor', ruta: '/patients/1/relationships', hacer: (p) => p.getByRole('heading', { name: /Household/ }).scrollIntoViewIfNeeded(), nota: 'Los pacientes que comparten garante quedan listados en Household.' },
        { nombre: 'Ledger · Patient View', ruta: '/patients/1/ledger', nota: 'En el Ledger del paciente, Patient View muestra sólo sus movimientos y sus métricas.' },
        { nombre: 'Ledger · Guarantor View', hacer: clic('Guarantor View', 'tab'), nota: 'Guarantor View suma todo el hogar, cambia las métricas y muestra la card Household con el garante y sus dependientes (CON-4076).' },
        { nombre: 'Billing · patient selected', ruta: '/billing', hacer: clic(/Maria Abril Viola/), nota: 'En Billing, al elegir un paciente aparecen Patient View y Guarantor View y los botones de pago.' },
        { nombre: 'Billing · Guarantor View', hacer: clic('Guarantor View', 'tab'), nota: 'Guarantor View lista los movimientos de todo el grupo de garante; los pagos se aplican a cualquiera de ellos con Apply to.' },
      ],
    },
  ],
}
