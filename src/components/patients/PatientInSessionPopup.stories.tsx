import type { Meta, StoryObj } from '@storybook/react-vite'
import { PatientInSessionPopup } from './PatientInSessionPopup'

const meta = {
  title: 'Components/Patients/PatientInSessionPopup',
  component: PatientInSessionPopup,
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div className="relative h-[520px]"><Story /></div>],
} satisfies Meta<typeof PatientInSessionPopup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
