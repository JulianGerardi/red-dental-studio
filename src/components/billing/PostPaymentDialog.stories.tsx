import type { Meta, StoryObj } from '@storybook/react-vite'
import { PostPaymentDialog } from './PostPaymentDialog'

const meta = {
  title: 'Components/Billing/PostPaymentDialog',
  component: PostPaymentDialog,
  parameters: { layout: 'fullscreen' },
  args: { tipoInicial: 'Patient Payment', onClose: () => {}, onGuardar: () => {} },
  argTypes: { tipoInicial: { control: 'select', options: ['Patient Payment', 'Credit Adjustment', 'Charge Adjustment'] } },
} satisfies Meta<typeof PostPaymentDialog>

export default meta
type Story = StoryObj<typeof meta>

export const PatientPayment: Story = {}
export const CreditAdjustment: Story = { args: { tipoInicial: 'Credit Adjustment' } }
export const ChargeAdjustment: Story = { args: { tipoInicial: 'Charge Adjustment' } }
