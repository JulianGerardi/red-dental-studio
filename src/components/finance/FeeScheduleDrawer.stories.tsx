import type { Meta, StoryObj } from '@storybook/react-vite'
import { FeeScheduleDrawer } from './FeeScheduleDrawer'
import { esperar, pulsar, secuencia } from '@/design-system/play'
import { EstadosDelDrawer, PasosDelDrawer, SpecsDelDrawer } from '@/design-system/kit-drawer'
import { FinanzasProvider } from '@/data/finanzasStore'
import { ARANCELES } from '@/data/finanzas'

const meta = {
  title: 'Components/Finance/FeeScheduleDrawer',
  component: FeeScheduleDrawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 720 },
      description: {
        component: [
          'Alta y edición de un fee schedule (*Settings → Billing → Fee Schedules*), con los pasos de los drawers de 2.0.',
          '',
          '**Nuevo:** General (nombre, tipo, fecha de vigencia, descripción y si es el default) y Fees (de qué fee schedule copia los precios y con qué ajuste, con la vista previa de cuatro códigos). **Editar:** sólo General; los precios se tocan en la tabla o con *Adjust fees*.',
          '',
          '**Probalo:** en *Playground* completá General y en Fees elegí *UCR - Red* con -10. *Edit* abre el de PPO Premium Plan.',
        ].join('\n'),
      },
    },
  },
  decorators: [(Story) => <FinanzasProvider><Story /></FinanzasProvider>],
  args: { onClose: () => {}, onGuardar: () => {} },
  argTypes: { inicial: { control: false } },
} satisfies Meta<typeof FeeScheduleDrawer>

export default meta
type Story = StoryObj<typeof meta>

/* El drawer vivo, en el paso 1. */
export const Playground: Story = {}

/* Editar: un solo paso, con los datos del fee schedule. */
export const Edit: Story = { args: { inicial: ARANCELES[1] } }

export const Parts: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <PasosDelDrawer
      nota="Al editar hay un solo paso (General) y el pie es Cancel / Save."
      pasos={[
        { nombre: 'General', secciones: 'General Information: Name, Type (con su ayuda), Effective Date, Description y la casilla de default', obligatorios: 'Name, Type, Effective Date' },
        { nombre: 'Fees', secciones: 'Fees: Start From y Adjustment (%); Preview con cuatro códigos antes → después', obligatorios: 'Start From' },
      ]}
    />
  ),
}

export const States: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <EstadosDelDrawer estados={[
      { estado: 'Default', cuando: 'Abre en General, sin errores.', story: 'Playground' },
      { estado: 'Validation errors', cuando: 'Next Step con obligatorios vacíos: borde rojo y “This field is required.”. También: nombre repetido, fecha inválida y ajuste fuera de -90 a 200.', story: 'With Validation Errors' },
      { estado: 'Adjustment disabled', cuando: 'Adjustment (%) queda disabled hasta elegir de qué fee schedule se copia; con “Empty schedule” no hay ajuste ni preview.' },
      { estado: 'Default checkbox disabled', cuando: 'Al editar el default, la casilla queda tildada y disabled: para cambiarlo se elige otro como default.', story: 'Edit (con UCR - Red)' },
      { estado: 'Saved', cuando: 'Entra primero en la lista con el toast “… was created.” y su acción Open.' },
    ]} />
  ),
}

/* Error: Next Step con todo vacío. */
export const WithValidationErrors: Story = {
  play: secuencia(pulsar(/^next step$/i), esperar(/required/i)),
}

export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <SpecsDelDrawer filas={[
      ['Size', 'lg · 560px'],
      ['Opens from', 'New fee schedule (lista y /settings/finance/fee-schedule/new); Edit details en la fila y en el detalle.'],
      ['Fees copied', 'Cada precio del fee schedule de base × (1 + ajuste), redondeado al dólar.'],
      ['Validation', 'lib/useFormPasos + nombre único, fecha DD / MM / YY válida y ajuste de -90 a 200.'],
    ]} />
  ),
}
