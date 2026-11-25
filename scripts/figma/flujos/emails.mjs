/* Emails: los mails que manda la plataforma, capturados de la página aparte (/emails/). Ver
   design-reference/figma/modulos/emails.md. */
import { MAILS } from '../../../src/emails/plantillas.ts'
import { clic, pasos } from './_util.mjs'

/* El mail se dibuja en un iframe y la captura no entra ahí: se lo reemplaza por su contenido. Los estilos del mail
   pasan a cada elemento (los de celular, si la caja mide menos de 620 px, como hace el mail): así no se mezclan con
   los de las otras pantallas del lote. */
const sinIframe = (p) => p.evaluate(() => {
  for (const f of document.querySelectorAll('iframe')) {
    const doc = f.contentDocument
    if (!doc?.body) continue
    const movil = f.clientWidth <= 620
    const reglas = []
    for (const hoja of doc.styleSheets) {
      for (const r of hoja.cssRules) {
        if (r.constructor.name === 'CSSMediaRule') { if (movil) reglas.push(...r.cssRules) } else reglas.push(r)
      }
    }
    const caja = document.createElement('div')
    caja.className = f.className
    caja.setAttribute('aria-label', `EmailPreview · ${doc.title}`)
    caja.innerHTML = doc.body.innerHTML
    const deBody = []
    for (const r of reglas) {
      for (const sel of r.selectorText.split(',').map((x) => x.trim())) {
        const els = sel === 'body' ? [caja] : caja.querySelectorAll(sel)
        /* La regla va antes que el estilo inline: éste gana, salvo lo que la regla marca !important. */
        for (const el of els) el.setAttribute('style', `${r.style.cssText};${el.getAttribute('style') ?? ''}`)
      }
    }
    caja.setAttribute('style', `${caja.getAttribute('style') ?? ''};${doc.body.getAttribute('style') ?? ''};overflow:hidden`)
    /* El preflight de Tailwind pisa el tamaño de las imágenes: se fija el que tienen en el mail. */
    const imgs = doc.body.querySelectorAll('img')
    caja.querySelectorAll('img').forEach((i, n) => {
      const { width, height } = imgs[n].getBoundingClientRect()
      if (height) Object.assign(i.style, { width: `${width}px`, height: `${height}px`, maxWidth: 'none' })
    })
    f.replaceWith(caja)
  }
})

const verMail = (id) => pasos((p) => p.waitForFunction((n) => document.querySelector('iframe')?.contentDocument?.title === n, MAILS.find((m) => m.id === id).asunto), sinIframe)

const pantallaDe = (m) => ({
  nombre: m.nombre,
  ruta: `/emails/#${m.id}`,
  hacer: verMail(m.id),
  nota: `${m.disparador}. Lo recibe: ${m.destinatario}. Asunto: "${m.asunto}". `
    + (m.origen === 'propuesta' ? 'Propuesta: el documento no traía el texto; espera aprobación.' : 'Texto del documento "Email Propuesta".')
    + (m.completado?.length ? ` Completado aparte: ${m.completado.join(', ')}.` : ''),
})

const de = (...categorias) => MAILS.filter((m) => categorias.includes(m.categoria))
const jiraDe = (mails) => [...new Set(mails.flatMap((m) => m.jira))].sort()
const flujo = (nombre, rol, resumen, mails) => ({ nombre, rol, resumen, jira: jiraDe(mails), pantallas: mails.map(pantallaDe) })

export default {
  pagina: '📧 Email',
  orden: 20,
  resumen: 'Los 16 mails que manda la plataforma, sobre una sola plantilla para el backend. Página aparte de la app: /emails/. Al pie de esta página quedan los diseños originales (Welcome email y Email onboarding).',
  jira: jiraDe(MAILS),
  flujos: [
    {
      nombre: 'Emails — Template & preview',
      rol: 'Backend',
      jira: ['CON-3325', 'CON-2908'],
      resumen: 'La página de referencia para el backend: elegir un mail, verlo en escritorio y en celular, ver sus {{variables}} y bajar el HTML. Todos los mails comparten el layout (cabecera, cuerpo, aviso legal y pie) y se arman con siete bloques fijos.',
      pantallas: [
        { nombre: 'Email preview (desktop)', ruta: '/emails/#appointment-request', hacer: verMail('appointment-request'), nota: 'Lista de mails por categoría a la izquierda; a la derecha, la ficha (asunto, preheader, quién lo recibe, Jira) y el mail con datos de ejemplo. Este usa todos los bloques: saludo, párrafo, aviso, detalles, botón con enlace de respaldo, nota y firma.' },
        { nombre: 'Email preview (mobile)', ruta: '/emails/#appointment-request', hacer: pasos(clic('Mobile', 'tab'), verMail('appointment-request')), nota: 'Por debajo de 620 px la tarjeta ocupa todo el ancho, el botón se estira y las filas de detalles se apilan (rótulo arriba, valor abajo).' },
        { nombre: 'Variables', ruta: '/emails/#appointment-request', hacer: pasos(clic('Variables', 'tab'), verMail('appointment-request')), nota: 'Muestra las {{variables}} que completa el backend, resaltadas en el texto, y la lista completa en la ficha. Sólo se reemplazan variables: no hay bucles ni condicionales. "Download HTML" baja la plantilla del mail.' },
      ],
    },
    flujo('Emails — Onboarding & accounts', 'Dueño de la cuenta · Paciente · Empleado', 'Altas de cuenta. El de la clínica lo firma Confidentally con su logo; los de paciente y empleado salen con el logo de la clínica y un link de un solo uso para crear la contraseña (sin contraseña en el mail).', de('Onboarding', 'Patient', 'Employee')),
    flujo('Emails — Scheduling', 'Paciente', 'Turnos: pedido (vence a las 24 h, con aviso warning), reservado, confirmado, reprogramado (dos variantes, propuesta) y cancelado. Los datos del turno van en filas fijas: Date, Time, Provider, Location y Address.', de('Scheduling')),
    flujo('Emails — Treatment plan & documents', 'Paciente', 'El plan de tratamiento listo para revisar y el documento para firmar en el portal.', de('Treatment plan', 'Consent/Document')),
    flujo('Emails — Subscription', 'Dueño de la cuenta', 'Estado de la suscripción: suspendida (modo de solo lectura, con aviso), cancelada y vencida. Los tres son propuesta.', de('Subscription')),
    flujo('Emails — Guardian', 'Guardián', 'Invitación al guardián sin usuario (con link para crear la contraseña) y aviso al que ya tiene usuario de que suma un paciente. Propuestas.', de('Guardian')),
  ],
}
