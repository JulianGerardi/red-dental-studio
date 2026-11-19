/* Help. Ver design-reference/figma/modulos/help.md. */
import { clic, escribir } from './_util.mjs'

export default {
  pagina: '❓ Help',
  orden: 19,
  resumen: 'Preguntas frecuentes por módulo, con buscador.',
  jira: [],
  flujos: [
    {
      nombre: 'Help — FAQ',
      rol: 'Todos',
      resumen: 'Buscar una respuesta por tema o por texto. Sin historia en Jira: es una pantalla del clon.',
      pantallas: [
        { nombre: 'Help', ruta: '/help', nota: 'Temas por módulo; el primero arranca abierto. Se llega desde el menú lateral o desde "Frequently asked questions" del Dashboard.' },
        { nombre: 'Topic open', hacer: clic(/^Patients The list/), nota: 'Tocar un tema muestra sus preguntas.' },
        { nombre: 'Answer open', hacer: (p) => p.getByRole('button').filter({ hasText: '?' }).first().click().catch(() => {}), nota: 'Cada pregunta despliega su respuesta.' },
        { nombre: 'Search', ruta: '/help', hacer: (p) => p.getByRole('searchbox').or(p.getByPlaceholder(/Search/).last()).first().fill('appointment'), nota: 'El buscador filtra entre todos los temas.' },
      ],
    },
  ],
}
