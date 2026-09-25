import type { Meta, StoryObj } from '@storybook/react-vite'
import { Page } from './Page'
import { PaginaDeRecetas, familiaBoton, recetas } from './Recipes'

const meta = {
  title: 'Patterns/Buttons',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', options: { showPanel: false } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const FAMILIAS = ['Primary (solid blue)', 'Outline', 'Text link', 'Icon-only', 'Floating round', 'Destructive', 'Disabled placeholder', 'List row / menu item', 'Other']

export const Botones: Story = {
  name: 'Buttons',
  render: () => {
    const botones = recetas.filter((r) => r.tipo === 'button')
    const total = botones.reduce((n, r) => n + r.cantidad, 0)
    return (
      <Page
        titulo="Buttons"
        bajada={`Los ${total} botones de la app, leídos del código: ${botones.length} recetas distintas. Casi todos son <button> con clases propias; el componente Button de ui/ casi no se usa. Cada tarjeta dibuja la receta con sus clases reales y sus estados; los cuadros de consistencia muestran cuántos valores distintos de altura, padding, peso y radio conviven dentro de una misma familia.`}
      >
        <PaginaDeRecetas tipo="button" familiaDe={familiaBoton} orden={FAMILIAS} />
      </Page>
    )
  },
}
