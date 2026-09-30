import type { Meta, StoryObj } from '@storybook/react-vite'
import { OdontogramEmbed } from './OdontogramEmbed'
import { pulsar } from '@/design-system/play'

const meta = {
  title: 'Components/Clinical/OdontogramEmbed',
  component: OdontogramEmbed,
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 720 } } },
  args: { controlesAbiertos: false, onCerrarControles: () => {} },
} satisfies Meta<typeof OdontogramEmbed>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const ControlsOpen: Story = { args: { controlesAbiertos: true } }

/* Panel de controles abierto en la primera sección: "Previous section" queda
   deshabilitado hasta avanzar. */
export const PreviousSectionDisabled: Story = { args: { controlesAbiertos: true } }

/* Controles minimizados: el botón queda presionado y sólo se ve la barra. */
export const ControlsMinimizedSelected: Story = {
  args: { controlesAbiertos: true },
  play: pulsar(/minimize controls/i),
}
