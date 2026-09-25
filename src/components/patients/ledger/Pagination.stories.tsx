import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pagination } from './Pagination'

const meta = {
  title: 'Components/Ledger/Pagination',
  component: Pagination,
  args: { pagina: 1, paginas: 6, onChange: () => {} },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

function Demo({ paginas }: { paginas: number }) {
  const [p, setP] = useState(1)
  return <Pagination pagina={p} paginas={paginas} onChange={setP} />
}

export const Default: Story = { render: () => <Demo paginas={6} /> }
export const ManyPages: Story = { render: () => <Demo paginas={24} /> }
