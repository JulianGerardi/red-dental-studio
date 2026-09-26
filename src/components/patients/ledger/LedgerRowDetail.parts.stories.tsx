import type { Meta, StoryObj } from '@storybook/react-vite'
import { MOVIMIENTOS } from '@/data/ledger'
import { Campos, FilaConTooltip } from './LedgerRowDetail'

const meta = { title: 'Components/Ledger/LedgerRowDetail parts', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* Los campos del detalle de una fila, en su lista de definición. */
export const DetailFields: Story = { render: () => <dl className="grid w-[420px] grid-cols-2 gap-3"><Campos m={MOVIMIENTOS[0]} /></dl> }

/* La fila con su tooltip lateral (pieza y superficie); abierta, el tooltip sobra. */
export const RowTooltip: Story = {
  render: () => (
    <div className="w-[420px] p-8">
      <FilaConTooltip m={MOVIMIENTOS[0]} abierta={false}>
        <div className="rounded-md border border-line p-3 text-[13px]">Hover this row</div>
      </FilaConTooltip>
    </div>
  ),
}
