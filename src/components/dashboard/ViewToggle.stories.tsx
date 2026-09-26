import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ViewToggle, type DashboardView } from './ViewToggle'

const meta = {
  title: 'Components/Dashboard/ViewToggle',
  component: ViewToggle,
  args: { value: 'Recepcionista', onChange: () => {} },
} satisfies Meta<typeof ViewToggle>

export default meta
type Story = StoryObj<typeof meta>

function Demo() {
  const [v, setV] = useState<DashboardView>('Recepcionista')
  return <ViewToggle value={v} onChange={setV} />
}

export const Default: Story = { render: () => <Demo /> }

/* Segmento elegido: el pill activo se pinta de azul. */
export const ProviderSelected: Story = { args: { value: 'Provider' } }
