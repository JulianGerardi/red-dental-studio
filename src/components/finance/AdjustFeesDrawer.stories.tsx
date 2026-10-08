import type { Meta, StoryObj } from '@storybook/react-vite'
import { AdjustFeesDrawer } from './AdjustFeesDrawer'
import { esperar, pulsar, secuencia } from '@/design-system/play'
import { EstadosDelDrawer, PasosDelDrawer, SpecsDelDrawer } from '@/design-system/kit-drawer'
import { ARANCELES } from '@/data/finanzas'

const meta = {
  title: 'Components/Finance/AdjustFeesDrawer',
  component: AdjustFeesDrawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 720 },
      description: {
        component: [
          'Sube o baja por porcentaje los precios de un fee schedule (*Adjust fees*, en su detalle): todos o los de una categoría, con redondeo a $1 o $5.',
          '',
          '**Un paso:** Change, Percentage, Apply To y Rounding arriba; abajo la vista previa de los primeros cinco códigos (antes → después) y cuántos cambian. El botón dice a cuántos precios se aplica.',
          '',
          '**Probalo:** en *Playground* escribí 5 y cambiá Apply To a una categoría.',
        ].join('\n'),
      },
    },
  },
  args: { arancel: ARANCELES[1], onClose: () => {}, onGuardar: () => {} },
  argTypes: { arancel: { control: false } },
} satisfies Meta<typeof AdjustFeesDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Parts: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <PasosDelDrawer
      nota="Un solo paso: el pie es Cancel / Apply to N fees."
      pasos={[{ nombre: 'Adjustment', secciones: 'Adjustment: Change (Increase / Decrease by), Percentage (%), Apply To, Rounding. Preview: cinco códigos y “N of M fees change.”', obligatorios: 'Percentage' }]}
    />
  ),
}

export const States: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <EstadosDelDrawer estados={[
      { estado: 'Default', cuando: 'Sin porcentaje: la vista previa muestra los precios de hoy y pide escribirlo.', story: 'Playground' },
      { estado: 'Validation errors', cuando: 'Apply sin porcentaje (“This field is required.”) o fuera de 1 a 100.', story: 'With Validation Errors' },
      { estado: 'Preview', cuando: 'Con un porcentaje válido: antes en gris → después en negro, y el botón “Apply to N fees”.' },
      { estado: 'Applied', cuando: 'Se cierra y el toast dice “N fees updated.”.' },
    ]} />
  ),
}

export const WithValidationErrors: Story = {
  play: secuencia(pulsar(/^apply$/i), esperar(/required/i)),
}

export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <SpecsDelDrawer filas={[
      ['Size', 'md · 480px'],
      ['Opens from', 'Adjust fees, en el detalle de un fee schedule (deshabilitado si no tiene precios).'],
      ['Applies to', 'Sólo los códigos con precio; los “Not set” no cambian.'],
      ['Rounding', 'No rounding (centavos), Nearest $1 (default) o Nearest $5. Nunca baja de $0.'],
    ]} />
  ),
}
