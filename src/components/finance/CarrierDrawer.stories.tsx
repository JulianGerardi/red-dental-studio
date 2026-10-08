import type { Meta, StoryObj } from '@storybook/react-vite'
import { CarrierDrawer } from './CarrierDrawer'
import { esperar, pulsar, secuencia } from '@/design-system/play'
import { EstadosDelDrawer, PasosDelDrawer, SpecsDelDrawer } from '@/design-system/kit-drawer'
import { FinanzasProvider } from '@/data/finanzasStore'

const meta = {
  title: 'Components/Finance/CarrierDrawer',
  component: CarrierDrawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 720 },
      description: {
        component: [
          'Alta de un carrier (*Settings → Billing → Carriers → New carrier*), con los pasos de New Location: General, Contact y Address.',
          '',
          '**Después:** el toast ofrece *Add plans*, que abre el detalle del carrier con el drawer de New Plan. Editar un carrier es la pestaña *Information* de su detalle, no este drawer.',
          '',
          '**Probalo:** en *Playground* completá cada paso; Next Step con campos vacíos los marca en rojo.',
        ].join('\n'),
      },
    },
  },
  decorators: [(Story) => <FinanzasProvider><Story /></FinanzasProvider>],
  args: { onClose: () => {}, onGuardar: () => {} },
} satisfies Meta<typeof CarrierDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Parts: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <PasosDelDrawer pasos={[
      { nombre: 'General', secciones: 'General Information: Carrier Name, Payer ID (con su ayuda), Claims Submission', obligatorios: 'Todos' },
      { nombre: 'Contact', secciones: 'Contact Information: Phone, Fax, Email, Website', obligatorios: 'Phone' },
      { nombre: 'Address', secciones: 'Claims Address: Line 1 y 2, City, State, ZIP', obligatorios: 'Todos menos Address Line 2' },
    ]} />
  ),
}

export const States: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <EstadosDelDrawer estados={[
      { estado: 'Default', cuando: 'Abre en General con Claims Submission en Electronic.', story: 'Playground' },
      { estado: 'Validation errors', cuando: 'Next Step o Save con obligatorios vacíos; un nombre que ya existe dice “This carrier already exists.”.', story: 'With Validation Errors' },
      { estado: 'Saved', cuando: 'Entra en la lista y el toast ofrece Add plans.' },
    ]} />
  ),
}

export const WithValidationErrors: Story = {
  play: secuencia(pulsar(/^next step$/i), esperar(/required/i)),
}

export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <SpecsDelDrawer filas={[
      ['Size', 'lg · 560px'],
      ['Opens from', 'New carrier en la lista; también /settings/finance/carriers/new.'],
      ['Payer ID', 'Se guarda en mayúsculas.'],
      ['Validation', 'lib/useFormPasos + nombre único.'],
    ]} />
  ),
}
