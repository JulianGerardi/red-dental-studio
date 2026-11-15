/* Notifications. Ver design-reference/figma/modulos/notifications.md. */
import { clic, pasos } from './_util.mjs'

export default {
  pagina: '🔔 Notifications',
  orden: 18,
  resumen: 'Las alertas del usuario: campana en el header, banner de la más urgente y la pantalla con todo el historial.',
  jira: ['CON-3611'],
  flujos: [
    {
      nombre: 'Notifications — Inbox',
      rol: 'Todos',
      jira: ['CON-3611'],
      resumen: 'Ver lo nuevo desde la campana, entrar al historial, filtrar por fecha y marcar como leído.',
      pantallas: [
        { nombre: 'Bell menu', ruta: '/', hacer: clic(/^Notifications/), nota: 'La campana muestra las últimas sin leer. View all notifications lleva a la pantalla.' },
        { nombre: 'Notifications', ruta: '/notifications', nota: 'Inbox agrupado por fecha (Today, Yesterday, This week…). Pestañas Inbox y Unread.' },
        { nombre: 'Unread', hacer: clic(/Unread/, 'tab'), nota: 'Unread deja sólo las no leídas; el ojo de cada fila la marca leída o no leída.' },
        { nombre: 'Date filter', ruta: '/notifications', hacer: clic(/^Filter notifications by date/), nota: 'Filtro por fecha: atajos (Last 7 days…) o un rango con dos clics en el calendario.' },
        { nombre: 'Last 7 days', hacer: clic('Last 7 days'), nota: 'El atajo acota la lista y las pestañas; Clear dates vuelve a todas.' },
        { nombre: 'Mark all as read', ruta: '/notifications', hacer: clic('Mark all as read'), nota: 'Mark all as read vacía Unread.' },
      ],
    },
  ],
}
