import type { Meta, StoryObj } from '@storybook/react-vite'
import { ManageLicensesDrawer } from './ManageLicensesDrawer'
import { CUENTAS } from '@/pages/settings/Accounts'
import { escribir, esperar, pulsar, secuencia } from '@/design-system/play'
import { EstadosDelDrawer, SpecsDelDrawer } from '@/design-system/kit-drawer'

const CON_PLAN = CUENTAS.find((c) => c.id === 'c11')!
const SIN_PLAN = CUENTAS.find((c) => c.id === 'c2')!
const POR_NOMBRE = Object.fromEntries(CUENTAS.map((c) => [c.nombre, c]))

const meta = {
  title: 'Components/Settings/ManageLicensesDrawer',
  component: ManageLicensesDrawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 620 },
      description: {
        component: [
          'Cuántas licencias tiene una cuenta, desde el menú de una fila de *Accounts overview → Manage licenses*. Un solo paso.',
          '',
          '**Reglas:** no se puede bajar el total por debajo de las licencias en uso (empleados activos y suspendidos); sin plan no hay licencias que ajustar, avisa y Save queda deshabilitado.',
          '',
          '**Probalo:** en *Playground* elegí otra cuenta desde *Controls*.',
        ].join('\n'),
      },
    },
  },
  args: { cuenta: CON_PLAN, onClose: () => {}, onGuardar: () => {} },
  argTypes: {
    cuenta: { control: 'select', options: Object.keys(POR_NOMBRE), mapping: POR_NOMBRE, description: 'La cuenta de la fila.' },
  },
} satisfies Meta<typeof ManageLicensesDrawer>

export default meta
type Story = StoryObj<typeof meta>

/* Cuenta con plan: el total y cuántas quedan libres después de las que están en uso. */
export const Playground: Story = {}

export const Parts: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <SpecsDelDrawer titulo="Parts" filas={[
      ['Subscription', 'Plan, Subscription, Expires on e In use, de a dos (sólo lectura).'],
      ['Licenses', 'Total licenses; debajo, cuántas quedan libres después de las que están en uso.'],
      ['Footer', 'Cancel · Save'],
    ]} />
  ),
}

export const States: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <EstadosDelDrawer estados={[
      { estado: 'Default', cuando: 'Cuenta con plan: el total actual y las libres.', story: 'Playground' },
      { estado: 'Validation errors', cuando: 'Vacío, no entero o menos que las que están en uso.', story: 'With Validation Errors' },
      { estado: 'Save disabled', cuando: 'Cuenta en Draft, sin plan: aviso "This account has no plan yet".', story: 'No Plan' },
    ]} />
  ),
}

/* Estado de error: menos licencias que las que ya se usan. */
export const WithValidationErrors: Story = {
  play: secuencia(escribir(/^0$/, '2'), pulsar(/^save$/i), esperar(/at least/i)),
}

/* Cuenta en Draft, sin plan: aviso y Save disabled. */
export const NoPlan: Story = { args: { cuenta: SIN_PLAN } }

export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <SpecsDelDrawer filas={[
      ['Size', 'md · 480px'],
      ['Opens from', 'Manage licenses, en el menú de cada fila de Accounts overview.'],
      ['Saves', 'El total en la columna Licenses y el toast "… now has N licenses."'],
    ]} />
  ),
}
