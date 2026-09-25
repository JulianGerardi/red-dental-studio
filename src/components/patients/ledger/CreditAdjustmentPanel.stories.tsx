import type { Meta, StoryObj } from '@storybook/react-vite'
import { MOVIMIENTOS } from '@/data/ledger'
import { CreditAdjustmentPanel } from './CreditAdjustmentPanel'

const meta = {
  title: 'Components/Ledger/CreditAdjustmentPanel',
  component: CreditAdjustmentPanel,
  parameters: { layout: 'padded' },
  args: { cargos: MOVIMIENTOS.filter((m) => m.tipo === 'Charge'), onCancelar: () => {}, onGuardar: () => {} },
} satisfies Meta<typeof CreditAdjustmentPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
