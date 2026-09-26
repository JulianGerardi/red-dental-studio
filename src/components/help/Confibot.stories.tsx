import type { Meta, StoryObj } from '@storybook/react-vite'
import { Confibot } from './Confibot'
import { escribir } from '@/design-system/play'

const meta = {
  title: 'Components/Help/Confibot',
  component: Confibot,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  args: { abierto: true, onClose: () => {}, onShowOnScreen: () => {} },
  decorators: [(Story) => <div className="relative h-[640px]"><Story /></div>],
} satisfies Meta<typeof Confibot>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {}

/* Enviar deshabilitado mientras el mensaje está vacío. */
export const SendDisabledWhenEmpty: Story = {}

/* Con un borrador escrito, Enviar se habilita. */
export const WithDraft: Story = { play: escribir(/ask me anything/i, 'How do I add a patient?') }
