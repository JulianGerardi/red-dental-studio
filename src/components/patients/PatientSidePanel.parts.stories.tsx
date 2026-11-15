import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarDays, Mail, Phone } from 'lucide-react'
import { conPacientes } from '@/design-system/decorators'
import { EncounterButton, InfoBlock, PendingSignatureButton } from './PatientSidePanel'

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

/* Pending Signature (patient-dashboard.md, 2026-11-10; CON-1611): el encuentro terminó y la Clinical Note quedó sin
   firmar. Ocupa el lugar del botón de encuentro; con el menú plegado queda sólo el ícono. */
export const PendingSignature: Story = { render: () => <div className="w-[220px]"><PendingSignatureButton /></div> }
export const PendingSignatureIconOnly: Story = { render: () => <PendingSignatureButton soloIcono /> }
