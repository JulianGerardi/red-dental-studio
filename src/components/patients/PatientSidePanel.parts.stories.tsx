import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarDays, Mail, Phone } from 'lucide-react'
import { conPacientes } from '@/design-system/decorators'
import { EncounterButton, InfoBlock } from './PatientSidePanel'

const meta = { title: 'Components/Patients/PatientSidePanel parts', parameters: { layout: 'padded' }, decorators: [conPacientes] } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const InfoSection: Story = {
  render: () => (
    <div className="w-[260px]">
      <InfoBlock title="Contact" onEdit={() => {}} items={[
        { icon: CalendarDays, label: 'Birthday', value: 'May 14, 1982' },
        { icon: Phone, label: 'Phone', value: '(555) 123-4567' },
        { icon: Mail, label: 'Email', value: 'abrilviola@gmail.com' },
      ]} />
    </div>
  ),
}
export const StartEncounter: Story = { render: () => <div className="h-40 w-[260px]"><EncounterButton /></div> }
