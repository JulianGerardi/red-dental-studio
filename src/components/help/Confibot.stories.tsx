import type { Meta, StoryObj } from '@storybook/react-vite'
import { Confibot } from './Confibot'

const meta = {
  title: 'Components/Help/Confibot',
  component: Confibot,
  parameters: { layout: 'fullscreen' },
  args: { abierto: true, onClose: () => {}, onShowOnScreen: () => {} },
  decorators: [(Story) => <div className="relative h-[640px]"><Story /></div>],
} satisfies Meta<typeof Confibot>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {}
