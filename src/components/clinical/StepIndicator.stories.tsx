import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { StepIndicator } from './StepIndicator'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'Components/Clinical/StepIndicator',
  component: StepIndicator,
  args: { total: 3, current: 2 },
} satisfies Meta<typeof StepIndicator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const FirstStep: Story = { args: { current: 1 } }
export const LastStep: Story = { args: { total: 4, current: 4 } }
/* Cada paso con su nombre: lo que usa New Procedure. */
export const WithLabels: Story = { args: { total: 3, current: 2, labels: ['Procedure', 'Surfaces', 'Link to finding'] } }
/* Avanzá y retrocedé para ver la animación al completar un paso. */
export const Interactive: Story = {
  args: { total: 3, current: 1, labels: ['Procedure', 'Surfaces', 'Link to finding'] },
  render: function Render(args) {
    const [paso, setPaso] = useState(args.current)
    return (
      <div className="flex w-[380px] flex-col gap-4">
        <StepIndicator {...args} current={paso} />
        <div className="flex gap-2">
          <Button variant="secondary" disabled={paso <= 1} onClick={() => setPaso((p) => p - 1)}>Back</Button>
          <Button disabled={paso > args.total} onClick={() => setPaso((p) => p + 1)}>Next Step</Button>
        </div>
      </div>
    )
  },
}
