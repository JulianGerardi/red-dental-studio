import type { Meta, StoryObj } from '@storybook/react-vite'
import { OdontogramEmbed } from './OdontogramEmbed'

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
