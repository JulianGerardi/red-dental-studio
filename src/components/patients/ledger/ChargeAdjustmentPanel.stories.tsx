import type { Meta, StoryObj } from '@storybook/react-vite'
import { MOVIMIENTOS } from '@/data/ledger'
import { ChargeAdjustmentPanel } from './ChargeAdjustmentPanel'
import { esperar, pulsar, secuencia } from '@/design-system/play'

const meta = {
  title: 'Components/Ledger/ChargeAdjustmentPanel',
  component: ChargeAdjustmentPanel,
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 720 } } },
  args: { cargosVisita: MOVIMIENTOS.filter((m) => m.tipo === 'Charge'), onCancelar: () => {}, onGuardar: () => {} },
} satisfies Meta<typeof ChargeAdjustmentPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* Estado de error: Save con los campos obligatorios vacíos. */
export const WithValidationErrors: Story = {
  play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i)),
}
