/* Billing. Ver design-reference/figma/modulos/billing.md. */
import { clic, pasos, escribir, texto } from './_util.mjs'

const maria = clic(/Maria Abril Viola/)

export default {
  pagina: '💳 Billing',
  orden: 12,
  resumen: 'La cobranza del consultorio: actividad reciente, saldos y, con un paciente elegido, pagos y ajustes.',
  jira: ['CON-1060', 'CON-4147'],
  flujos: [
    {
      nombre: 'Billing — Summary',
      rol: 'Administración',
      jira: ['CON-1060', 'CON-4147'],
      resumen: 'El resumen sin paciente elegido: métricas, actividad reciente, filtros, columnas y Export CSV.',
      pantallas: [
        { nombre: 'Billing', ruta: '/billing', nota: 'Métricas de A/R arriba, Recent Billing Activity, Find Patient y la card Today.' },
        { nombre: 'Filter · Payments', hacer: clic('Payments', 'tab'), nota: 'Filtros de red.dev: All, Payments, Adjustments, Today.' },
        { nombre: 'Columns', ruta: '/billing', hacer: clic(/Columns/), nota: 'Columns elige las columnas visibles.' },
        { nombre: 'Find Patient · Show more', ruta: '/billing', hacer: clic(/^Show \d+ more/), nota: 'Find Patient muestra algunos y Show more abre el resto con scroll adentro.' },
      ],
    },
    {
      nombre: 'Billing — Patient view',
      rol: 'Administración',
      jira: ['CON-4147'],
      resumen: 'Elegir un paciente deja sólo lo suyo y habilita los tres botones de carga.',
      pantallas: [
        { nombre: 'Patient selected', ruta: '/billing', hacer: maria, nota: 'Con un paciente: Patient / Guarantor View y los botones Patient Payment, Credit Adjustment y Charge Adjustment. Export CSV se apaga.' },
        { nombre: 'Payment row detail', hacer: texto(/^Card Payment ····5521$/), nota: 'La fila de un pago se despliega y dice a qué cargo fue.' },
        { nombre: 'Guarantor View', hacer: clic('Guarantor View', 'tab'), nota: 'Guarantor View suma a todo el hogar.' },
      ],
    },
    {
      nombre: 'Billing — New Patient Payment (-)',
      rol: 'Administración',
      jira: ['CON-4147'],
      resumen: 'Cargar un pago: Payment → Allocation → Save.',
      pantallas: [
        { nombre: 'New Patient Payment', ruta: '/billing', hacer: pasos(maria, clic(/Patient Payment \(-\)/)), nota: 'Monto, fecha y método de pago.' },
        { nombre: 'Several payment methods', hacer: clic('Add another payment method'), nota: 'Se suman métodos con + y se quitan con −. Check Payment pide Check y Bank/Branch.' },
        { nombre: 'Allocation', hacer: pasos(clic('Remove this payment method'), escribir(/Amount/, '40'), clic(/Next Step/)), nota: 'Paso Allocation: a qué cargos se aplica el pago. Lo que sobra queda como crédito sin aplicar.' },
        { nombre: 'Payment posted', hacer: clic(/^Save/), nota: 'Save lo suma a la tabla y avisa con un toast.' },
      ],
    },
    {
      nombre: 'Billing — Adjustments',
      rol: 'Administración',
      jira: ['CON-4147'],
      resumen: 'Credit Adjustment (-) y Charge Adjustment (+), cada uno con su drawer.',
      pantallas: [
        { nombre: 'Credit Adjustment (-)', ruta: '/billing', hacer: pasos(maria, clic(/Credit Adjustment \(-\)/)), nota: 'Ajuste a favor: tipo de red.dev, monto y aplicación.' },
        { nombre: 'Enter Charge (+) Adjustment', ruta: '/billing', hacer: pasos(maria, clic(/Charge Adjustment \(\+\)/)), nota: 'Ajuste de cargo: tipo, Provider, Visit date y monto. Sin tabla de aplicación.' },
        { nombre: 'Charge · required', hacer: clic(/^Save/), nota: 'Save sin monto marca el obligatorio.' },
        { nombre: 'Charge posted', hacer: pasos(escribir(/Amount/, '25'), clic(/^Save/)), nota: 'Con el monto, Save lo postea y aparece en la tabla.' },
      ],
    },
  ],
}
