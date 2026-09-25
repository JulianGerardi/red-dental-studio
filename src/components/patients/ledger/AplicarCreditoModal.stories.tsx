import type { Meta, StoryObj } from '@storybook/react-vite'
import { MOVIMIENTOS } from '@/data/ledger'
import { AplicarCreditoModal } from './AplicarCreditoModal'

const CREDITO = MOVIMIENTOS.find((m) => (m.creditoDisponible ?? 0) > 0) ?? MOVIMIENTOS[0]

const meta = {
  title: 'Components/Ledger/AplicarCreditoModal',
  component: AplicarCreditoModal,
  parameters: { layout: 'fullscreen' },
  args: { m: CREDITO, cargos: MOVIMIENTOS.filter((m) => m.tipo === 'Charge'), onClose: () => {}, onAplicar: () => {} },
} satisfies Meta<typeof AplicarCreditoModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
