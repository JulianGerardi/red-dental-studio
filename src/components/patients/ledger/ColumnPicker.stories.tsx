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
  parameters: {
    docs: {
      description: {
        component: [
          'Elegir qué columnas se ven, en el Ledger y en la tabla estándar. Las columnas bloqueadas (Date, Balance) no se pueden ocultar.',
          '',
          '**Mismo botón que el filtro** (`filterTriggerClasses` de Elements / Filter): md 36px junto a buscadores, sm 28px en encabezados de cards; azul con "visibles/total" cuando hay columnas ocultas.',
          '',
          '**Probalo:** en *Playground* cambiá el tamaño desde *Controls* y ocultá columnas desde el menú.',
        ].join('\n'),
      },
    },
  },
  args: { columnas: [...COLUMNAS], ocultas: [], onToggle: () => {}, onReset: () => {}, size: 'md' },
  argTypes: {
    size: { control: 'inline-radio', options: ['md', 'sm'], description: 'md 36px junto a buscadores · sm 28px en encabezados de cards.' },
  },
} satisfies Meta<typeof ColumnPicker>

export default meta
type Story = StoryObj<typeof meta>

function Demo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const [ocultas, setOcultas] = useState<Col[]>(['paciente'])
  return (
    <div className="h-64">
      <ColumnPicker
        size={size}
        columnas={[...COLUMNAS]}
        ocultas={ocultas}
        onToggle={(id) => setOcultas((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]))}
        onReset={() => setOcultas([])}
      />
    </div>
  )
}

/* Con una columna oculta: el botón azul con "4/5". */
export const Playground: Story = { render: (args) => <Demo size={args.size} /> }

/* Sin columnas ocultas, blanco; con alguna oculta, azul con cuántas se ven. */
export const States: Story = {
  render: () => (
    <div className="flex h-24 items-start gap-4">
      <ColumnPicker columnas={[...COLUMNAS]} ocultas={[]} onToggle={() => {}} onReset={() => {}} />
      <ColumnPicker columnas={[...COLUMNAS]} ocultas={['paciente']} onToggle={() => {}} onReset={() => {}} />
      <ColumnPicker size="sm" columnas={[...COLUMNAS]} ocultas={[]} onToggle={() => {}} onReset={() => {}} />
    </div>
  ),
}

/* Menú abierto: las columnas bloqueadas (Date, Balance) aparecen
   deshabilitadas, no se pueden ocultar. */
export const LockedColumnsDisabled: Story = {
  render: () => <Demo />,
  play: secuencia(pulsar(/columns/i), esperar(/reset/i)),
}
