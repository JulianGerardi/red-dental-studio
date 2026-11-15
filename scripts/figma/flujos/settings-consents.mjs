/* Settings → Consent Templates. Ver design-reference/figma/modulos/consents.md. */
import { clic } from './_util.mjs'

export default {
  pagina: '✍️ Settings — Consent Templates',
  orden: 16,
  resumen: 'Las plantillas de consentimiento por procedimiento: lista a la izquierda, editor a la derecha y vista previa.',
  jira: ['CON-2094', 'CON-3118', 'CON-2865'],
  flujos: [
    {
      nombre: 'Consents — Templates',
      rol: 'Administración · Odontólogo',
      jira: ['CON-2865', 'CON-3118'],
      resumen: 'Elegir una plantilla, editarla y revisar cómo la ve el paciente.',
      pantallas: [
        { nombre: 'Consent Templates', ruta: '/settings/consents', nota: 'Lista por estado (Active, Inactive, System, All) y el editor de la plantilla elegida, con sus procedimientos.' },
        { nombre: 'Tab · System', hacer: clic('System', 'tab'), nota: 'System: las plantillas que trae la plataforma.' },
        { nombre: 'Preview', ruta: '/settings/consents', hacer: clic('Preview'), nota: 'Preview abre la hoja en un drawer.' },
        { nombre: 'Preview · Patient View', hacer: clic('Patient View'), nota: 'Patient View saca lo que es sólo de la clínica.' },
        { nombre: 'New template', ruta: '/settings/consents', hacer: clic('New template'), nota: 'New template arranca en blanco.' },
        { nombre: 'New template · missing fields', hacer: async (p) => { await p.getByRole('button', { name: 'Preview' }).click(); await p.getByRole('dialog', { name: 'Preview' }).getByRole('button', { name: 'Save' }).click() }, nota: 'Save desde el preview lo cierra y deja los faltantes a la vista en el editor.' },
        { nombre: 'Deactivate template', ruta: '/settings/consents', hacer: clic('Deactivate template'), nota: 'Desactivar una plantilla pide confirmar.' },
      ],
    },
  ],
}
