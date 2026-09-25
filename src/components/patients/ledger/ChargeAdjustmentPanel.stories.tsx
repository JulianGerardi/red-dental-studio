import type { Meta, StoryObj } from '@storybook/react-vite'
import { MOVIMIENTOS } from '@/data/ledger'
import { ChargeAdjustmentPanel } from './ChargeAdjustmentPanel'

const meta = {
  title: 'Components/Ledger/ChargeAdjustmentPanel',
  component: ChargeAdjustmentPanel,
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 720 } } },
  args: { cargosVisita: MOVIMIENTOS.filter((m) => m.tipo === 'Charge'), onCancelar: () => {}, onGuardar: () => {} },
} satisfies Meta<typeof ChargeAdjustmentPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
