/* Header y Sidebar (app shell). Ver design-reference/figma/modulos/header-sidebar.md. */
import { clic, pasos, llenar } from './_util.mjs'

export default {
  pagina: '🧭 Header & Sidebar',
  orden: 2,
  resumen: 'El app shell de todas las pantallas: menú lateral, sede, buscador, notificaciones, cuenta y Confibot.',
  jira: ['CON-2933'],
  flujos: [
    {
      nombre: 'App shell — Sidebar & header',
      rol: 'Todos',
      jira: ['CON-2933'],
      resumen: 'Moverse por la app y cambiar de sede.',
      pantallas: [
        { nombre: 'Sidebar collapsed', ruta: '/', alto: 'fijo', nota: 'Por defecto el menú va plegado, con tooltips.' },
        { nombre: 'Sidebar expanded', hacer: clic('Expand sidebar'), alto: 'fijo', nota: 'Expand sidebar muestra los nombres de cada sección.' },
        { nombre: 'Select location', ruta: '/', hacer: clic(/Abril - Los Angeles/), alto: 'fijo', nota: 'El selector de sede: favoritas arriba y todas debajo, con el rol que se tiene en cada una.' },
        { nombre: 'Search', ruta: '/', hacer: pasos((p) => p.getByPlaceholder('Search...').first().click(), llenar('Search...', 'john')), alto: 'fijo', nota: 'Buscador global de pacientes (CON-2933).' },
        { nombre: 'My Account', ruta: '/', hacer: clic(/Sarah Stone/), alto: 'fijo', nota: 'Menú de la cuenta: Profile, Suscription, Support, Help center y Log out.' },
        { nombre: 'Notification banner', ruta: '/', alto: 'fijo', nota: 'El banner muestra la notificación más urgente; las flechas pasan a la siguiente y la X lo cierra.' },
      ],
    },
    {
      nombre: 'App shell — Confibot & floating tabs',
      rol: 'Todos',
      resumen: 'Las pestañas flotantes del borde derecho: pacientes en atención y Confibot.',
      pantallas: [
        { nombre: 'Confibot open', ruta: '/', hacer: clic('Open Confibot'), alto: 'fijo', nota: 'La pestaña de Confibot abre el chat; la pestaña se queda y lo cierra.' },
        { nombre: 'Currently being seen', ruta: '/', hacer: clic('Open currently being seen'), alto: 'fijo', nota: 'La otra pestaña lista a los pacientes que están en atención.' },
        { nombre: 'Under construction', ruta: '/message', alto: 'fijo', nota: 'Message, Contacts, Documents y Reports comparten este placeholder.' },
        { nombre: 'Not found', ruta: '/no-existe', alto: 'fijo', nota: 'Ruta desconocida.' },
      ],
    },
  ],
}
