/* Ficha del paciente → Relationships & Billing. Ver design-reference/figma/modulos/relationships.md. */
import { clic, pasos, menuFila, escribir } from './_util.mjs'

export default {
  pagina: '🔗 Patient record — Relationships & Billing',
  orden: 6,
  resumen: 'Quién responde por el paciente: guardianes (decisiones) y garantes (pago), y los pacientes del mismo hogar.',
  jira: ['CON-2879', 'CON-2858'],
  flujos: [
    {
      nombre: 'Relationships — List',
      rol: 'Recepción · Administración',
      jira: ['CON-2879'],
      resumen: 'Ver las relaciones del paciente y el hogar que comparte garante.',
      pantallas: [
        { nombre: 'Relationships & Billing', ruta: '/patients/1/relationships', nota: 'Tabla de relaciones (rol y parentesco) y, debajo, Household/Same Guarantor Patients.' },
        { nombre: 'Row actions', hacer: menuFila('Jessica Miller'), nota: 'El ⋮ ofrece Edit relationship y Delete relationship.' },
      ],
    },
    {
      nombre: 'Relationships — Add Relationship',
      rol: 'Recepción',
      jira: ['CON-2879'],
      resumen: 'Vincular a un familiar, guardián o garante: Person → Contact → Relationship.',
      pantallas: [
        { nombre: 'Add Relationship · Person', ruta: '/patients/1/relationships', hacer: clic('Add Relationship'), nota: 'Paso Person: se busca a alguien del sistema o se tilda Add New Person.' },
        { nombre: 'Person · required', hacer: clic(/Next Step/), nota: 'Sin persona elegida no avanza.' },
        { nombre: 'Person · Add New Person', hacer: clic('Add New Person', 'checkbox'), nota: 'Add New Person despliega los datos de la persona nueva.' },
        { nombre: 'Add Relationship (ruta /new)', ruta: '/patients/1/relationships/new', nota: 'La ruta /relationships/new abre el mismo drawer directamente (link compartible).' },
      ],
    },
    {
      nombre: 'Relationships — Edit & Delete',
      rol: 'Recepción',
      jira: ['CON-2879'],
      resumen: 'Editar el rol o el parentesco; la dirección de la relación no se cambia: se borra y se crea otra.',
      pantallas: [
        { nombre: 'Edit Relationship', ruta: '/patients/1/relationships', hacer: menuFila('Jessica Miller', /Edit/), nota: 'Se edita Role (Guardian, Guarantor) y Relationship to Patient. La persona y la dirección quedan fijas.' },
        { nombre: 'Delete Relationship', ruta: '/patients/1/relationships', hacer: menuFila('Jessica Miller', /Delete/), nota: 'Delete pide confirmación; no se puede deshacer.' },
      ],
    },
  ],
}
