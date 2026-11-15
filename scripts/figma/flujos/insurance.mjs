/* Ficha del paciente → Insurance. Ver design-reference/figma/modulos/insurance.md. */
import { clic, pasos, llenar, foco } from './_util.mjs'

export default {
  pagina: '🛡️ Patient record — Insurance',
  orden: 7,
  resumen: 'Los planes del paciente en orden de prioridad y la suscripción de cada uno (suscriptor, carrier, plan, vigencia).',
  jira: ['CON-1252', 'CON-3259', 'CON-2941'],
  flujos: [
    {
      nombre: 'Insurance — Plans & subscription',
      rol: 'Administración',
      jira: ['CON-1252', 'CON-3259'],
      resumen: 'Consultar los planes, reordenar la prioridad y elegir una suscripción existente.',
      pantallas: [
        { nombre: 'Insurance', ruta: '/patients/1/insurance', nota: 'Insurance Plans arriba (se reordenan arrastrando o con el teclado); debajo, Subscription Information y Patient Information.' },
        { nombre: 'Search existing subscription', hacer: llenar('Search by name or ID', 'aetna'), nota: 'El buscador trae suscripciones que ya existen, por nombre del suscriptor o ID.' },
        { nombre: 'Subscription selected', hacer: clic(/^Lucas Johnson/, 'option'), nota: 'Elegida la suscripción, la card se completa y se habilita Manage Subscription.' },
      ],
    },
    {
      nombre: 'Insurance — New Subscription',
      rol: 'Administración',
      jira: ['CON-3259', 'CON-2941'],
      resumen: 'Alta de una suscripción: Subscriber → Subscription. No deja duplicar carrier + plan + Subscriber ID.',
      pantallas: [
        { nombre: 'New Subscription · Subscriber', ruta: '/patients/1/insurance', hacer: clic('Add New Subscription'), nota: 'Paso Subscriber: el paciente mismo, una persona del sistema o un suscriptor nuevo.' },
        { nombre: 'Subscription · empty', hacer: clic('Next Step'), nota: 'Paso Subscription: Carrier, Plan (se habilita al elegir carrier), Subscriber ID y vigencia.' },
        { nombre: 'Subscription · required', hacer: clic('Save'), nota: 'Save sin completar marca los obligatorios.' },
        {
          nombre: 'Subscription · filled',
          hacer: pasos(llenar('Select carrier', 'Dental'), clic('Dental Dental Of California'), foco('Select plan'), clic('PPO Premiun Plan'), llenar('123456', 'ABC-1'), llenar('MM / DD / YY', '010326')),
          nota: 'Carrier y Plan son buscadores; las fechas se escriben como MM / DD / YY.',
        },
        { nombre: 'Subscription saved', hacer: clic('Save'), nota: 'Save cierra el drawer y deja la suscripción nueva elegida en la pantalla.' },
      ],
    },
    {
      nombre: 'Insurance — Manage & delete subscription',
      rol: 'Administración',
      jira: ['CON-3259'],
      resumen: 'Editar la suscripción elegida o borrarla (sólo si ningún paciente la usa).',
      pantallas: [
        { nombre: 'Manage Subscription', ruta: '/patients/1/insurance', hacer: pasos(llenar('Search by name or ID', 'aetna'), clic(/^Lucas Johnson/, 'option'), clic('Manage Subscription')), nota: 'Manage Subscription abre el drawer con los datos de la suscripción.' },
        { nombre: 'Delete · in use', ruta: '/patients/1/insurance', hacer: pasos(llenar('Search by name or ID', 'john'), clic(/^John Smith/, 'option'), clic('Delete subscription')), nota: 'Una suscripción en uso no se borra: avisa por qué.' },
        { nombre: 'Delete · confirm', ruta: '/patients/1/insurance', hacer: pasos(llenar('Search by name or ID', 'maria'), clic(/^Maria Smith/, 'option'), clic('Delete subscription')), nota: 'Una libre pide confirmación antes de borrarse.' },
      ],
    },
  ],
}
