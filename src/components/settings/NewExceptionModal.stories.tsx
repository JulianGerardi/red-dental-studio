import type { Meta, StoryObj } from '@storybook/react-vite'
import { NewExceptionModal } from './NewExceptionModal'

const meta = {
  title: 'Components/Settings/NewExceptionModal',
  component: NewExceptionModal,
  parameters: { layout: 'fullscreen' },
  args: { onClose: () => {}, onGuardar: () => {} },
} satisfies Meta<typeof NewExceptionModal>

export default meta
type Story = StoryObj<typeof meta>

export const Create: Story = {}
export const Edit: Story = {
  args: { inicial: { id: 'exc1', nombre: 'Independence Day', abreviatura: 'HOL', razon: 'Holiday', fecha: new Date(2026, 6, 4), horaInicio: '', horaFin: '', todoElDia: true, estado: 'Active' } },
}
