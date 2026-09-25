import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ColumnPicker } from './ColumnPicker'
import { esperar, pulsar, secuencia } from '@/design-system/play'

const COLUMNAS = [
  { id: 'fecha', label: 'Date', bloqueada: true },
  { id: 'paciente', label: 'Patient' },
  { id: 'descripcion', label: 'Description' },
  { id: 'monto', label: 'Amount' },
  { id: 'saldo', label: 'Balance', bloqueada: true },
] as const

type Col = (typeof COLUMNAS)[number]['id']

const meta = {
  title: 'Components/Ledger/ColumnPicker',
  component: ColumnPicker,
  args: { columnas: [...COLUMNAS], ocultas: [], onToggle: () => {}, onReset: () => {} },
} satisfies Meta<typeof ColumnPicker>

export default meta
type Story = StoryObj<typeof meta>

function Demo() {
  const [ocultas, setOcultas] = useState<Col[]>(['paciente'])
  return (
    <div className="h-64">
      <ColumnPicker
        columnas={[...COLUMNAS]}
        ocultas={ocultas}
        onToggle={(id) => setOcultas((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]))}
        onReset={() => setOcultas([])}
      />
    </div>
  )
}

export const Default: Story = { render: () => <Demo /> }

/* Menú abierto: las columnas bloqueadas (Date, Balance) aparecen
   deshabilitadas, no se pueden ocultar. */
export const LockedColumnsDisabled: Story = {
  render: () => <Demo />,
  play: secuencia(pulsar(/columns/i), esperar(/reset/i)),
}
