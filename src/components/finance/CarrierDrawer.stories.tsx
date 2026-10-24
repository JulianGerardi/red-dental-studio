import type { Meta, StoryObj } from '@storybook/react-vite'
import { CarrierDrawer } from './CarrierDrawer'
import { escribir, esperar, pulsar, secuencia } from '@/design-system/play'
import { EstadosDelDrawer, PasosDelDrawer, SpecsDelDrawer } from '@/design-system/kit-drawer'
import { FinanzasProvider } from '@/data/finanzasStore'

const meta = {
  title: 'Components/Finance/CarrierDrawer',
  component: CarrierDrawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      decisionsFrom: 'components/finance/CarrierDrawer.tsx',
      story: { inline: false, iframeHeight: 720 },
      description: {
        component: [
          '**New Carrier** (*Settings → Billing → Carriers*). Los campos y textos son los de la página New Carrier de red.dev; acá es un drawer con dos pasos, General y Contact.',
          '',
          '*Carrier Name* es un buscador sobre los payers conocidos: elegir uno completa el *Payer ID*. Un nombre que ya está en la lista no se puede repetir. Con (+1) el teléfono pide Area Code y Number. *Location Number* no está acá: se carga después, en Edit Carrier.',
          '',
          '**Después:** el carrier entra en la lista y el toast ofrece *Add plan*.',
          '',
          '**Probalo:** en *Playground* escribí "Hum" en Carrier Name y elegí Humana Dental; Next Step con campos vacíos los marca en rojo.',
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
      { nombre: 'General', secciones: 'General Information: Carrier Name (buscador), Payer ID, Printed Claim Format, Expected Period of Insurance Claim Resolution (days), Do not include Dental Diagnostic Codes, Do not bill Insurance', obligatorios: 'Carrier Name, Payer ID, Printed Claim Format y Expected Period' },
      { nombre: 'Contact', secciones: 'Contact Information: Email, Website, Country Code, Area Code (3 digits), Number (7 digits)', obligatorios: 'Email, Country Code, Area Code y Number' },
    ]} nota="Placeholders de red.dev: Select carrier, 00000, Select a printed claim format, example@example.com, Introduce your website link, 555, 000-0000." />
  ),
}

export const States: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <EstadosDelDrawer estados={[
      { estado: 'Default', cuando: 'Abre en General, vacío.', story: 'Playground' },
      { estado: 'Payer search', cuando: 'Al escribir en Carrier Name sugiere los payers; elegir uno completa el Payer ID.', story: 'Payer Search' },
      { estado: 'Validation errors', cuando: 'Next Step o Save con obligatorios vacíos: “This field is required.” en cada uno.', story: 'With Validation Errors' },
      { estado: 'Duplicate', cuando: 'Un carrier que ya está en la lista: “This carrier is already in your list.”.' },
      { estado: 'Saved', cuando: 'Entra en la lista y el toast dice “{Carrier} was added. Add its insurance plans next.” con Add plan.' },
    ]} />
  ),
}

export const PayerSearch: Story = {
  play: secuencia(escribir(/select carrier/i, 'Hum'), esperar(/humana dental - 73288/i)),
}

export const WithValidationErrors: Story = {
  play: secuencia(pulsar(/^next step$/i), esperar(/this field is required/i)),
}

export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <SpecsDelDrawer filas={[
      ['Size', 'md'],
      ['Opens from', 'New Carrier en la lista; también /settings/finance/carriers/new.'],
      ['Payer ID', 'Sólo dígitos; lo completa el buscador.'],
      ['Validation', 'lib/useFormPasos por paso + nombre único.'],
      ['Origen', 'red.dev: New Carrier es una página; acá drawer (regla de pop ups).'],
    ]} />
  ),
}
