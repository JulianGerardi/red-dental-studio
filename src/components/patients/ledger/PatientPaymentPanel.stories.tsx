import type { Meta, StoryObj } from '@storybook/react-vite'
import { MOVIMIENTOS } from '@/data/ledger'
import { PatientPaymentPanel } from './PatientPaymentPanel'

const meta = {
  title: 'Components/Ledger/PatientPaymentPanel',
  component: PatientPaymentPanel,
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 720 } } },
  args: { cargos: MOVIMIENTOS.filter((m) => m.tipo === 'Charge'), onCancelar: () => {}, onGuardar: () => {} },
} satisfies Meta<typeof PatientPaymentPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
