import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Page, Seccion } from './Page'
import { elementosDe, esBuscador, esCasilla, esOculto, meta as datos, recetas, sinBorde, type Receta } from './Recipes'
import { ColoresEnUso, EstadosDeLaApp, MedidasDeTipos, ROLES_COLOR, TamanosEnUso, TiposConEstados, TodoLoEncontrado, type Tipo } from './spec'

const meta = {
  title: 'Patterns/Fields',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', options: { showPanel: false } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const campos = recetas.filter((r) => r.tipo === 'field')
const conError = (r: Receta) => /field-error|dash-bad/.test(r.firma)
const familia = (r: Receta) => {
  if (esOculto(r)) return 'Hidden file input'
  if (esCasilla(r)) return 'Checkbox and radio'
  if (r.tag === 'select') return 'Select'
  if (r.tag === 'textarea') return 'Textarea'
  if (conError(r)) return 'Input with error'
  if (esBuscador(r)) return 'Search input'
  if (sinBorde(r)) return 'Inline input'
  return 'Text input'
}
const masUsado = (f: string, extra: (r: Receta) => boolean = () => true) => campos.filter((r) => familia(r) === f && extra(r)).sort((a, b) => b.cantidad - a.cantidad)[0]
const errorDe = (buscador: boolean) => campos.filter((r) => conError(r) && esBuscador(r) === buscador && r.tag === 'input').sort((a, b) => b.cantidad - a.cantidad)[0]

const TIPOS: Tipo[] = [
  { nombre: 'Text input', uso: 'A single-line field.', look: masUsado('Text input'), error: errorDe(false) },
  { nombre: 'Search input', uso: 'A text field with a magnifier icon on the left.', look: masUsado('Search input'), error: errorDe(true) },
  { nombre: 'Select', uso: 'The native select, styled like a text field.', look: masUsado('Select') },
  { nombre: 'Textarea', uso: \`A multi-line field.\${sinBorde(masUsado('Textarea') ?? ({ clases: 'border' } as Receta)) ? ' Its only look has no border of its own: the box comes from the screen.' : ''}\`, look: masUsado('Textarea') },
  { nombre: 'Checkbox', uso: 'A native checkbox tinted with the brand accent.', look: masUsado('Checkbox and radio') },
]

export const Campos: Story = {
  name: 'Fields',
  render: () => {
    const total = datos.elementos.field ?? 0
    return (
      <Page
        titulo="Fields"
        bajada={\`Los \${total} <input>, <select> y <textarea> con estilo propio de la app, leídos del código. Cada tipo se muestra en sus estados, con sus medidas y colores. Los campos de formulario reutilizables (etiqueta + campo + error) están en Components / Patients / Form fields.\`}
      >
        <Seccion titulo="Types and states" nota="El look más usado de cada tipo. Error es el aspecto que toma el campo cuando falla la validación; “—” quiere decir que el código no lo define.">
          <TiposConEstados tipos={TIPOS} columnas={['default', 'focus', 'error', 'disabled']} />
        </Seccion>

        <Seccion titulo="Measures" nota="Leídas de los campos de arriba, ya dibujados.">
          <MedidasDeTipos tipos={TIPOS} />
        </Seccion>

        <Seccion titulo="Sizes in use" nota="Cuántos campos usan cada valor, en toda la app. Si hay más de un valor, hay campos del mismo tipo que no miden lo mismo.">
          <TamanosEnUso looks={campos.filter((r) => !esOculto(r) && !esCasilla(r))} total={total} />
        </Seccion>

        <Seccion titulo="Colors in use" nota="Los colores que usan los campos, con la cantidad de campos que los usan.">
          <ColoresEnUso looks={campos} roles={ROLES_COLOR.filter((r) => r.nombre !== 'Fill on hover')} />
        </Seccion>

        <Seccion titulo="States in the app" nota="Qué porcentaje de los campos define cada estado, qué clases usa y qué falta.">
          <EstadosDeLaApp
            looks={campos}
            total={total}
            filas={[
              { estado: 'Hover', define: (r) => r.estados.hover, clases: /^hover:/, faltante: (n) => \`\${n} fields look the same under the mouse.\` },
              {
                estado: 'Focus',
                define: (r) => r.estados.foco === 'definido',
                clases: /^(?:[^\\s:]+:)*focus(?:-visible)?:(?!outline-none)/,
                faltante: (n, sin) => \`\${n} fields use the browser’s default ring; \${elementosDe(sin.filter((r) => r.estados.foco === 'quitado' || r.estados.foco === 'invisible'))} show no ring at all.\`,
              },
              { estado: 'Error', define: conError, clases: /field-error|dash-bad/, faltante: (n) => \`\${n} fields have no error look: a failed validation is not visible on them.\` },
              { estado: 'Disabled', define: (r) => r.estados.deshabilitado, clases: /(^|:)disabled:|cursor-not-allowed/, faltante: (n) => \`\${n} fields have no disabled look: disabled or not, they look the same.\` },
            ]}
          />
        </Seccion>

        <TodoLoEncontrado tipo="field" familiaDe={familia} cantidad={campos.length} elementos={total} />
      </Page>
    )
  },
}
`})))()}export{n,i as r,r as t};