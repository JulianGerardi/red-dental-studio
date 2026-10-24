import type { Meta, StoryObj } from '@storybook/react-vite'
import { RegionConditionDrawer } from './RegionConditionDrawer'
import { esperar, pulsar, secuencia } from '@/design-system/play'
import { Bloque, Lienzo, Tabla } from '@/design-system/kit'

const meta = {
  title: 'Components/Clinical/Dental/RegionConditionDrawer',
  component: RegionConditionDrawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 720 },
      description: {
        component: [
          'Add Condition de Extraoral/Intraoral: por región del gráfico, no por diente -el drawer de `NewProcedureDrawer` no sirve acá, siempre carga contra un diente-.',
          '',
          '**Dos pasos**, los dos titulados "New Condition" como en la app real: **Condition** -las regiones elegidas en el gráfico, afuera, como chips removibles; el catálogo de condición, propio, con buscador- y **Descriptors** -la misma guía visual de [DescriptorFields](/docs/components-clinical-dental-descriptorfields--docs)-.',
          '',
          '**El botón del paso 1 dice "Select descriptors"**, no "Next Step": así lo dice la app real. Deshabilitado hasta elegir una condition.',
          '',
          '**Probalo:** en *Playground* elegí "Atrophy" y avanzá.',
        ].join('\n'),
      },
    },
  },
  args: {
    open: true,
    regions: ['Right Forehead', 'Right Posterior Head'],
    onRemoveRegion: () => {},
    onClose: () => {},
    onSave: () => {},
  },
} satisfies Meta<typeof RegionConditionDrawer>

export default meta
type Story = StoryObj<typeof meta>

/* Paso 1: el catálogo de condición. "Select descriptors" se habilita al elegir una. */
export const Playground: Story = {}

/* Sin ninguna región elegida: el gráfico queda afuera, con el mensaje de qué hacer. */
export const WithoutRegions: Story = { args: { regions: [] } }

/* Una condition elegida en el catálogo: la fila queda con borde azul (aria-pressed) y "Select descriptors" se
   habilita. */
export const ConditionSelected: Story = {
  play: secuencia(pulsar(/^Atrophy/i), esperar(/select descriptors/i)),
}

/* Paso 2: la guía visual de descriptores, igual que en Add/Edit Condition del resto de la app. */
export const DescriptorsStep: Story = {
  play: secuencia(pulsar(/^Atrophy/i), pulsar(/select descriptors/i), esperar(/tap a pill again to clear it/i)),
}

export const Parts: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Steps" nota="Los dos pasos, siempre los mismos -esta condition no tiene Surfaces ni Link to finding/diagnosis, que son de un procedure.">
        <Tabla encabezado={['Step', 'What it asks']} minimo={480}>
          <tr><td className="font-semibold">Condition</td><td>Las regiones elegidas (chips, con su ✕) y el catálogo de condición, con buscador.</td></tr>
          <tr><td className="font-semibold">Descriptors</td><td>La guía visual de descriptores, opcional.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Specs">
        <Tabla encabezado={['Item', 'Value']} minimo={480}>
          <tr><td className="font-semibold">Size</td><td>md · 480px</td></tr>
          <tr><td className="font-semibold">Title</td><td>New Condition, los dos pasos</td></tr>
          <tr><td className="font-semibold">Next, paso Condition</td><td>"Select descriptors", deshabilitado sin condition elegida</td></tr>
          <tr><td className="font-semibold">Save</td><td>Guarda la condition en las regiones elegidas, con sus descriptores</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
