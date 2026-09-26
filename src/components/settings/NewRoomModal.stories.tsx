import type { Meta, StoryObj } from '@storybook/react-vite'
import { NewRoomModal } from './NewRoomModal'
import { esperar, pulsar, secuencia } from '@/design-system/play'

const meta = {
  title: 'Components/Settings/NewRoomModal',
  component: NewRoomModal,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  args: { onClose: () => {}, onGuardar: () => {} },
} satisfies Meta<typeof NewRoomModal>

export default meta
type Story = StoryObj<typeof meta>

export const Create: Story = {}
export const Edit: Story = { args: { inicial: { id: 's1', nombre: 'Operatory 1', tipo: 'General', abreviatura: 'OP1' } } }

/* Estado de error: Save con los campos obligatorios vacíos. */
export const WithValidationErrors: Story = {
  play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i)),
}
