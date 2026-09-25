import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Page } from './Page'
import { PaginaDeRecetas, esBuscador, esCasilla, esOculto, meta as datos, recetas, sinBorde, type Receta } from './Recipes'

const meta = {
  title: 'Patterns/Fields',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', options: { showPanel: false } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const familia = (r: Receta) => {
  if (esOculto(r)) return 'Hidden file input'
  if (esCasilla(r)) return 'Checkbox and radio'
  if (r.tag === 'select') return 'Select'
  if (r.tag === 'textarea') return 'Textarea'
  if (/field-error|dash-bad/.test(r.firma)) return 'Input with error'
  if (esBuscador(r)) return 'Search input (with icon)'
  if (sinBorde(r)) return 'Inline input (inside another box)'
  return 'Text input'
}

const ORDEN = ['Text input', 'Search input (with icon)', 'Input with error', 'Select', 'Textarea', 'Checkbox and radio', 'Inline input (inside another box)', 'Hidden file input']

const DESCRIPCIONES: Record<string, string> = {
  'Text input': 'A single-line field with its own border, radius and focus style.',
  'Search input (with icon)': 'A text field with left padding to make room for a magnifier icon. The icon is drawn here the way the screens do.',
  'Input with error': 'Text fields that switch to the error border and message color when validation fails.',
  Select: 'The native <select>, styled like a text field.',
  Textarea: 'A multi-line field.',
  'Checkbox and radio': 'Native checkboxes and radios tinted with the brand accent. The shared Checkbox component is in Components / UI.',
  'Inline input (inside another box)': 'Fields with no border of their own: a wrapper draws the box. The dashed frame here stands in for that wrapper.',
  'Hidden file input': 'A file input hidden with sr-only, triggered by a styled button. There is nothing to draw.',
}

export const Campos: Story = {
  name: 'Fields',
  render: () => {
    const campos = recetas.filter((r) => r.tipo === 'field')
    const usos = datos.elementos.field ?? 0
    return (
      <Page
        titulo="Fields"
        bajada={\`Los \${usos} <input>, <select> y <textarea> con estilo propio de la app: \${campos.length} looks. Los campos de formulario reutilizables viven en Components / Patients / Form fields; acá está lo que el código escribe a mano, con el estado de foco (borde azul), error (borde rojo) y deshabilitado de cada uno.\`}
      >
        <PaginaDeRecetas tipo="field" familiaDe={familia} orden={ORDEN} vista="matriz" descripciones={DESCRIPCIONES} />
      </Page>
    )
  },
}
`})))()}export{n,i as r,r as t};