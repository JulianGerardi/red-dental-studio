import type { Meta, StoryObj } from '@storybook/react-vite'
import { PlanCard, VisitRow, type Plan, type Visita } from './TreatmentPlanPicker'

const PLAN: Plan = { id: 'p1', estado: 'Accepted', date: '02/12/2026', doctor: 'Dr. Elena Martinez', therapy: 'Crown and root canal', visitas: 2, procedimientos: 4 }
const VISITA: Visita = { id: 'v1', name: 'Visit 1', procedimientos: ['D3310', 'D2740'], total: '$1,240' }

const meta = {
  title: 'Components/Scheduling/TreatmentPlanPicker',
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="w-[380px]"><Story /></div>],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Plans: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <PlanCard plan={PLAN} on onClick={() => {}} />
      <PlanCard plan={{ ...PLAN, id: 'p2', estado: 'Inprogress', doctor: 'Dr. Emily Chen' }} on={false} onClick={() => {}} />
    </div>
  ),
}

export const Visits: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <VisitRow visita={VISITA} on onClick={() => {}} />
      <VisitRow visita={{ ...VISITA, id: 'v2', name: 'Visit 2', total: '$860' }} on={false} onClick={() => {}} />
    </div>
  ),
}
