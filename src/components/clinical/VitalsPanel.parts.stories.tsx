import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { VITALES } from '@/data/clinical-mode'
import { CampoNumero, Medidor, TarjetaVital } from './VitalsPanel'

const meta = { title: 'Components/Clinical/VitalsPanel parts', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const VitalCards: Story = {
  render: () => (
    <div className="grid w-[820px] grid-cols-2 gap-4">
      {VITALES.slice(0, 4).map((v) => <TarjetaVital key={v.id} v={v} aviso={v.id === 'blood-pressure'} />)}
    </div>
  ),
}

function NumberDemo() {
  const [v, setV] = useState(120)
  return <CampoNumero label="Systolic" valor={v} min={50} max={250} paso={1} onChange={setV} />
}
export const NumberField: Story = { render: () => <NumberDemo /> }

function GaugeDemo() {
  const [v, setV] = useState(36.6)
  return (
    <div className="w-[260px]">
      <Medidor pct={0.55} color="#1a804d" etiqueta="Normal" min={30} max={45} valor={v} onValor={setV}>
        <span className="text-sm">{v} °C</span>
      </Medidor>
    </div>
  )
}
export const Gauge: Story = { render: () => <GaugeDemo /> }
