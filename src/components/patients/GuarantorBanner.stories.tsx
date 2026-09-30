import type { Meta, StoryObj } from '@storybook/react-vite'
import { GuarantorBanner } from './GuarantorBanner'

const meta = {
  title: 'Components/Patients/GuarantorBanner',
  component: GuarantorBanner,
  decorators: [(Story) => <div className="w-[520px]"><Story /></div>],
} satisfies Meta<typeof GuarantorBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
