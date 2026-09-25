import type { Meta, StoryObj } from '@storybook/react-vite'
import { PatientsTable, type PatientRow } from './PatientsTable'

const FILAS: PatientRow[] = [
  { id: 'patient-0001', name: 'Sarah Stone', initials: 'SS', birthday: '04/02/1991', email: 'sarah.stone@mail.com', status: 'Active' },
  { id: 'patient-0002', name: 'John Lorem', initials: 'JL', birthday: '12/09/1985', email: 'john.lorem@mail.com', status: 'Inactive' },
  { id: 'patient-0003', name: 'Maria Abril Viola', initials: 'MV', birthday: '23/11/1978', email: 'maria.viola@mail.com', status: 'Active' },
]

const meta = {
  title: 'Components/Patients/PatientsTable',
  component: PatientsTable,
  parameters: { layout: 'padded' },
  args: { rows: FILAS },
} satisfies Meta<typeof PatientsTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
