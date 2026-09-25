import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Page } from './Page'
import { PaginaDeRecetas, recetas, type Receta } from './Recipes'

const meta = {
  title: 'Patterns/Fields',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', options: { showPanel: false } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const familia = (r: Receta) => {
  if (r.tag === 'select') return 'Select'
  if (r.tag === 'textarea') return 'Textarea'
  if (/field-error|dash-bad/.test(r.firma)) return 'Input with error'
  return 'Text input'
}

export const Campos: Story = {
  name: 'Fields',
  render: () => {
    const campos = recetas.filter((r) => r.tipo === 'field')
    const usos = campos.reduce((n, r) => n + r.cantidad, 0)
    return (
      <Page
        titulo="Fields"
        bajada={\`Los \${usos} <input>, <select> y <textarea> con estilo propio de la app: \${campos.length} recetas. Los campos de formulario reutilizables viven en Components / Patients / Form fields; acá está lo que el código escribe a mano, con el estado de foco (borde azul), error (borde rojo) y deshabilitado de cada uno.\`}
      >
        <PaginaDeRecetas tipo="field" familiaDe={familia} orden={['Text input', 'Input with error', 'Select', 'Textarea']} />
      </Page>
    )
  },
}
`})))()}export{n,i as r,r as t};