/* Ficha del paciente → Ledger. Ver design-reference/figma/modulos/ledger.md. */
import { clic, pasos, llenar } from './_util.mjs'

export default {
  pagina: '💵 Patient record — Ledger',
  orden: 8,
  resumen: 'La cuenta del paciente: cargos, pagos y ajustes, con el detalle de cada fila y las vistas Patient / Guarantor.',
  jira: ['CON-3732'],
  flujos: [
    {
      nombre: 'Ledger — Transactions',
      rol: 'Administración',
      jira: ['CON-3732'],
      resumen: 'Leer la cuenta: métricas arriba, tabla de transacciones, detalle desplegable por fila.',
      pantallas: [
        { nombre: 'Ledger', ruta: '/patients/1/ledger', nota: 'Métricas (Patient balance, Patient responsibility, Unapplied credits, Open charges) y la tabla de transacciones.' },
        { nombre: 'Charge detail', hacer: pasos(llenar(/Search by code/, 'D4341'), clic(/Toggle details/)), nota: 'Buscar por código o descripción. La flecha despliega el detalle del cargo: su caso, la plata y lo que recibió.' },
        { nombre: 'Payment detail', hacer: pasos(llenar(/Search by code/, 'Check payment'), clic(/Toggle details/)), nota: 'El detalle de un pago dice a qué cargos fue y ofrece Apply credit si quedó crédito.' },
        { nombre: 'Row actions', ruta: '/patients/1/ledger', hacer: clic(/^Actions for Periodontal scaling/), nota: 'El ⋮ de un procedimiento lleva a su estimación en Clinical Mode.' },
        { nombre: 'Filter entries', ruta: '/patients/1/ledger', hacer: clic('Filter entries'), nota: 'Filter: Charge, Payment, Adjustment, Insurance, Unapplied Credits.' },
        { nombre: 'Columns', ruta: '/patients/1/ledger', hacer: clic('Columns'), nota: 'Columns elige qué columnas se ven.' },
        { nombre: 'Guarantor View', ruta: '/patients/1/ledger', hacer: clic('Guarantor View', 'tab'), nota: 'Guarantor View suma a todo el Household y cambia las métricas.' },
      ],
    },
    {
      nombre: 'Ledger — Post payment & adjustments',
      rol: 'Administración',
      jira: ['CON-3732', 'CON-4147'],
      resumen: 'Cargar un pago o un ajuste desde la cuenta del paciente (los mismos drawers que Billing).',
      pantallas: [
        { nombre: 'Patient Payment (-)', ruta: '/patients/1/ledger', hacer: clic(/Patient Payment/, 'tab'), nota: 'Pago del paciente: monto, método (varios con + / −) y a qué cargos se aplica.' },
        { nombre: 'Credit Adjustment (-)', ruta: '/patients/1/ledger', hacer: clic(/Credit Adjustment/, 'tab'), nota: 'Ajuste a favor del paciente: tipo, monto y aplicación.' },
        { nombre: 'Charge Adjustment (+)', ruta: '/patients/1/ledger', hacer: clic(/Charge Adjustment/, 'tab'), nota: 'Ajuste de cargo: suma Provider y Visit date; no lleva tabla de aplicación.' },
      ],
    },
  ],
}
