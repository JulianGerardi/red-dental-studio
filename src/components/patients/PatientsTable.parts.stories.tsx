import type { Meta, StoryObj } from '@storybook/react-vite'
import { Cell, HeadCell } from './PatientsTable'

const meta = { title: 'Components/Patients/PatientsTable parts', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* Las celdas base de la tabla: encabezado (11px semibold gris) y dato (13px, truncado). */
export const HeaderAndDataCells: Story = {
  render: () => (
    <div className="flex h-10 w-[420px] items-center gap-4 border border-line">
      <HeadCell className="w-[120px]">Full name</HeadCell>
      <Cell className="w-[200px]">A very long text that should truncate at the column edge</Cell>
    </div>
  ),
}
