import type { Meta, StoryObj } from '@storybook/react-vite'
import { CopyFromDrawer } from './CopyFromDrawer'
import { escribir, esperar, pulsarRol, secuencia } from '@/design-system/play'
import { EstadosDelDrawer, SpecsDelDrawer } from '@/design-system/kit-drawer'
import { Bloque, Lienzo, TablaPartes } from '@/design-system/kit'
import { FinanzasProvider } from '@/data/finanzasStore'

const meta = {
  title: 'Components/Finance/CopyFromDrawer',
  component: CopyFromDrawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      decisionsFrom: 'components/finance/CopyFromDrawer.tsx',
      story: { inline: false, iframeHeight: 680 },
      description: {
        component: [
          '**Copy from**, en la pestaña *Coverage Table* de un insurance plan. Trae los rangos de una plantilla (*Copy from template*, las de Settings → Coverage Table) o de otro plan (*Copy from insurance*). Título, bajada y buscador tal cual red.dev.',
          '',
          'Reemplaza el Type y todos los rangos del plan; nada se guarda hasta el *Save* de la pestaña.',
          '',
          '**Probalo:** en *Playground* cambiá de pestaña, buscá por nombre y elegí una.',
        ].join('\n'),
      },
    },
  },
  decorators: [(Story) => <FinanzasProvider><Story /></FinanzasProvider>],
  args: { planId: 'acme-ppo', onClose: () => {}, onCopiar: () => {} },
} satisfies Meta<typeof CopyFromDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Parts: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[
          ['Pestañas', 'Copy from template | Copy from insurance.', 'Tabs fullWidth'],
          ['Buscador', 'Placeholder “Search for name”.', 'input'],
          ['Opciones', 'Nombre — tipo y cantidad de rangos (o el carrier del plan); una sola elegida.', 'OpcionDireccion (radio)'],
          ['Pie', 'Cancel · Confirm.', 'FormFooter'],
        ]} />
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <EstadosDelDrawer estados={[
      { estado: 'Default', cuando: 'Abre en Copy from template, sin nada elegido.', story: 'Playground' },
      { estado: 'Selected', cuando: 'Una opción elegida: Confirm la copia.', story: 'Selected' },
      { estado: 'Empty', cuando: 'La búsqueda no encuentra nada: “No results for …”.', story: 'Empty Search' },
      { estado: 'From insurance', cuando: 'La otra pestaña lista los demás planes (no el que se edita).', story: 'From Insurance' },
    ]} />
  ),
}

export const Selected: Story = { play: secuencia(pulsarRol('radio', /premium ppo/i)) }
export const EmptySearch: Story = { play: secuencia(escribir(/search for name/i, 'zzz'), esperar(/no results/i)) }
export const FromInsurance: Story = { play: secuencia(pulsarRol('tab', /^copy from insurance/i), esperar(/northwind/i)) }

export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <SpecsDelDrawer filas={[
      ['Size', 'md · 560px'],
      ['Copia', 'Type y rangos, con ids nuevos; reemplaza lo que había.'],
      ['Origen', 'red.dev: diálogo “Copy the form to the coverage table”.'],
    ]} />
  ),
}
