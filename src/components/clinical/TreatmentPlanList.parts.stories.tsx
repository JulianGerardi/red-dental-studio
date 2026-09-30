import type { Meta, StoryObj } from '@storybook/react-vite'
import { PLANES } from '@/data/clinical-mode'
import { Dato, PlanCard } from './TreatmentPlanList'

const meta = { title: 'Components/Clinical/TreatmentPlanList parts', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const DataBox: Story = {
  render: () => <div className="flex gap-2"><Dato label="Created On" valor="23/04/2025" azul /><Dato label="Total Procedures" valor="5" /><Dato label="Total Amount" valor="$231.12" /></div>,
}
export const PlanCardVariants: Story = {
  render: () => <div className="w-[300px]"><PlanCard p={PLANES[0]} /></div>,
}
