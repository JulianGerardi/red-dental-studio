import type { Meta, StoryObj } from '@storybook/react-vite'
import { conPacientes } from '@/design-system/decorators'
import { PatientSidePanel } from './PatientSidePanel'

const meta = {
  title: 'Components/Patients/PatientSidePanel',
  component: PatientSidePanel,
  parameters: { layout: 'fullscreen' },
  args: { name: 'Sarah Stone', initials: 'SS', section: 'Dashboard', basePath: '/patients/patient-0001' },
  decorators: [conPacientes, (Story) => <div className="flex h-[760px] bg-page-background"><Story /></div>],
} satisfies Meta<typeof PatientSidePanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const LedgerSelected: Story = { args: { section: 'Ledger' } }
