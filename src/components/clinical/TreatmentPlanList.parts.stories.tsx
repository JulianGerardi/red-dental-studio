import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarDays, CircleDollarSign } from 'lucide-react'
import { PLANES } from '@/data/clinical-mode'
import { Dato, PlanCard } from './TreatmentPlanList'

const meta = { title: 'Components/Clinical/TreatmentPlanList parts', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* Los dos datos de la card: total y fecha de creación. */
export const DataBox: Story = {
  render: () => <div className="grid w-[300px] grid-cols-2 gap-1.5"><Dato label="Total amount" valor="$231.12" icono={CircleDollarSign} /><Dato label="Created on" valor="27/08/2026" icono={CalendarDays} /></div>,
}

/* Una card por estado del caso: Planning, Waiting for consent, Accepted (con avance) y Presented. */
export const PlanCardVariants: Story = {
  render: () => (
    <div className="grid max-w-[960px] gap-3 md:grid-cols-2 lg:grid-cols-3">
      {PLANES.slice(0, 6).map((p) => <PlanCard key={p.id} p={p} />)}
    </div>
  ),
}
