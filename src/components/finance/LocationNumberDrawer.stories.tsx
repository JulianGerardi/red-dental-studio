import type { Meta, StoryObj } from '@storybook/react-vite'
import { LocationNumberDrawer } from './LocationNumberDrawer'
import { EstadosDelDrawer, SpecsDelDrawer } from '@/design-system/kit-drawer'
import { Bloque, Lienzo, TablaPartes } from '@/design-system/kit'
import { ASEGURADORAS } from '@/data/finanzas'

const meta = {
  title: 'Components/Finance/LocationNumberDrawer',
  component: LocationNumberDrawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      decisionsFrom: 'components/finance/LocationNumberDrawer.tsx',
      story: { inline: false, iframeHeight: 640 },
      description: {
        component: [
          '**Location Number**, desde el botón del mismo nombre en *Edit Carrier → Information*. El número que el carrier le asignó a cada locación de la clínica, para que los reclamos electrónicos no se rechacen. Texto y columnas tal cual red.dev (allá es un diálogo).',
          '',
          'Una fila por locación; las vacías no se guardan. Se guarda con el *Save* de la pantalla del carrier.',
          '',
          '**Probalo:** en *Playground* escribí un número en Alaska Medical.',
        ].join('\n'),
      },
    },
  },
  args: { numeros: ASEGURADORAS[0].numerosLocacion, onClose: () => {}, onGuardar: () => {} },
  argTypes: { numeros: { control: 'object', description: 'Número por id de locación.' } },
} satisfies Meta<typeof LocationNumberDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Parts: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[
          ['Texto de ayuda', '“Enter the location number assigned by the insurance carrier…”, de red.dev.', 'DrawerSection description'],
          ['Location Name', 'Cada locación de Settings → Locations.', 'span'],
          ['Number', 'Texto libre, placeholder “Enter a number”.', 'TextField hideLabel'],
          ['Pie', 'Cancel · Save.', 'FormFooter'],
        ]} />
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <EstadosDelDrawer estados={[
      { estado: 'With numbers', cuando: 'El carrier ya tiene números (Aetna: Abril y Bayside).', story: 'Playground' },
      { estado: 'Empty', cuando: 'Ninguna locación con número: todas muestran el placeholder.', story: 'Empty' },
    ]} />
  ),
}

export const Empty: Story = { args: { numeros: {} } }

export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <SpecsDelDrawer filas={[
      ['Size', 'md · 560px'],
      ['Columnas', 'Location Name 1fr · Number 200px'],
      ['Guarda', 'Sólo las filas con número; el carrier se guarda con su Save.'],
    ]} />
  ),
}
