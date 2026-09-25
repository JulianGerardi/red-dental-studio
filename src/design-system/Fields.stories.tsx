import type { Meta, StoryObj } from '@storybook/react-vite'
import { Page } from './Page'
import { PaginaDeRecetas, meta as datos, recetas, type Receta } from './Recipes'

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
    const usos = datos.elementos.field ?? 0
    return (
      <Page
        titulo="Fields"
        bajada={`Los ${usos} <input>, <select> y <textarea> con estilo propio de la app: ${campos.length} looks. Los campos de formulario reutilizables viven en Components / Patients / Form fields; acá está lo que el código escribe a mano, con el estado de foco (borde azul), error (borde rojo) y deshabilitado de cada uno.`}
      >
        <PaginaDeRecetas tipo="field" familiaDe={familia} orden={['Text input', 'Input with error', 'Select', 'Textarea']} vista="matriz" />
      </Page>
    )
  },
}
