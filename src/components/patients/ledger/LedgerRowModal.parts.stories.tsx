import type { Meta, StoryObj } from '@storybook/react-vite'
import { MOVIMIENTOS } from '@/data/ledger'
import { LedgerRowModal } from './LedgerRowDetail'

const meta = { title: 'Components/Ledger/LedgerRowModal', parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 560 } } } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* El detalle completo de un movimiento, en un modal ("View full record"). */
export const FullRecord: Story = { render: () => <LedgerRowModal m={MOVIMIENTOS[0]} onClose={() => {}} /> }
