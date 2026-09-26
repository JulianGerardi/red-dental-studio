import type { Meta, StoryObj } from '@storybook/react-vite'
import { STATS } from './StatStrip'
import { StatStripApilada } from './StatStrip'

const meta = { title: 'Components/Dashboard/StatStrip parts', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* La variante apilada: título arriba, monto abajo; 2×2 en angosto y cuatro columnas desde 672px. */
export const StackedVariant: Story = { render: () => <StatStripApilada stats={STATS} /> }
