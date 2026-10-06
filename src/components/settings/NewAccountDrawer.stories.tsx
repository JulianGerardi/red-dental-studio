import type { Meta, StoryObj } from '@storybook/react-vite'
import { NewAccountDrawer } from './NewAccountDrawer'
import { esperar, pulsar, secuencia } from '@/design-system/play'
import { EstadosDelDrawer, PasosDelDrawer, SpecsDelDrawer } from '@/design-system/kit-drawer'

const meta = {
  title: 'Components/Settings/NewAccountDrawer',
  component: NewAccountDrawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 760 },
      description: {
        component: [
          'Alta de una cuenta (una clínica) desde *Settings → Accounts overview → New Account*. Los pasos siguen las pestañas de Edit Account.',
          '',
          '**Draft:** la cuenta nueva queda en Draft hasta tener plan, como las de la lista sin suscripción. El dueño puede copiar el contacto y el domicilio de la cuenta.',
          '',
          '**Probalo:** en *Playground* completá los pasos; destildá "Copy … from account" en Owner para cargar otros datos.',
        ].join('\n'),
      },
    },
  },
  args: { onClose: () => {}, onGuardar: () => {} },
} satisfies Meta<typeof NewAccountDrawer>

export default meta
type Story = StoryObj<typeof meta>

/* El drawer vivo, en el paso 1. */
export const Playground: Story = {}

export const Parts: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <PasosDelDrawer pasos={[
      { nombre: 'Information', secciones: 'General Information: Name, Subdomain (muestra el dominio), Fee Schedule Name · Contact Information: teléfono, Email, Website', obligatorios: 'Name, Country Code, Area Code, Number' },
      { nombre: 'Address', secciones: 'Address Information: Line 1 y 2, Country, State, City, ZIP, Time Zone', obligatorios: 'Todos menos Address Line 2' },
      { nombre: 'Owner', secciones: 'Owner Information: nombre, Birthdate, Email · Contact y Address con "Copy … from account" (tildadas por defecto)', obligatorios: 'First Name, Last Name, Birthdate, Email · y lo que se destilde' },
    ]} />
  ),
}

export const States: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <EstadosDelDrawer estados={[
      { estado: 'Default', cuando: 'Abre en Information.', story: 'Playground' },
      { estado: 'Validation errors', cuando: 'Next Step con Name o el teléfono vacíos.', story: 'With Validation Errors' },
      { estado: 'Owner with own data', cuando: 'Al destildar "Copy contact" o "Copy address" aparecen esos campos, también obligatorios.' },
      { estado: 'Saved', cuando: 'La cuenta entra primera en la tabla, en Draft, con su dueño, y aparece el toast.' },
    ]} />
  ),
}

/* Estado de error: Next Step con Name y el teléfono vacíos. */
export const WithValidationErrors: Story = {
  play: secuencia(pulsar(/^next step$/i), esperar(/required/i)),
}

export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <SpecsDelDrawer filas={[
      ['Size', 'lg · 560px'],
      ['Opens from', 'New Account en Settings → Accounts overview.'],
      ['Steps', 'Las pestañas de Edit Account (Information, Owner), con Address aparte para no alargar el primero.'],
      ['Saves as', 'Draft, sin plan ni licencias.'],
      ['Validation', 'lib/useFormPasos'],
    ]} />
  ),
}
