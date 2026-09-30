import type { Meta, StoryObj } from '@storybook/react-vite'
import { PLANS, TreatmentCard } from './Treatments'

const meta = { title: 'Pages/Parts/Treatments', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* Card de plan: completado (verde) y vencido (rojo). */
export const PlanCards: Story = {
  render: () => <div className="flex w-[340px] flex-col gap-3"><TreatmentCard plan={PLANS[0]} /><TreatmentCard plan={PLANS[4]} /></div>,
}
