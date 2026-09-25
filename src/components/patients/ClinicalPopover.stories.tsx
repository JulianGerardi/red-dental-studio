import type { Meta, StoryObj } from '@storybook/react-vite'
import { ClinicalPopover } from './ClinicalPopover'

const meta = {
  title: 'Components/Patients/ClinicalPopover',
  component: ClinicalPopover,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Allergies',
    anchor: new DOMRect(40, 40, 120, 36),
    items: [
      { id: 'a1', name: 'Penicillin', status: 'Prescribed', since: '2019', detail: 'Rash and swelling', campos: {} },
      { id: 'a2', name: 'Latex', status: 'Completed', since: '2021', detail: 'Contact dermatitis', campos: {} },
    ],
    onAdd: () => {},
    onEdit: () => {},
    onDelete: () => {},
    onClose: () => {},
  },
  decorators: [(Story) => <div className="relative h-[420px]"><Story /></div>],
} satisfies Meta<typeof ClinicalPopover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Empty: Story = { args: { items: [] } }
