import type { Meta, StoryObj } from '@storybook/react-vite'
import { NewRoomModal } from './NewRoomModal'

const meta = {
  title: 'Components/Settings/NewRoomModal',
  component: NewRoomModal,
  parameters: { layout: 'fullscreen' },
  args: { onClose: () => {}, onGuardar: () => {} },
} satisfies Meta<typeof NewRoomModal>

export default meta
type Story = StoryObj<typeof meta>

export const Create: Story = {}
export const Edit: Story = { args: { inicial: { id: 's1', nombre: 'Operatory 1', tipo: 'General', abreviatura: 'OP1' } } }
