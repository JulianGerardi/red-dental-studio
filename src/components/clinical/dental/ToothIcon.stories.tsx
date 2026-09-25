import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToothChip, ToothIcon } from './ToothIcon'

const meta = {
  title: 'Components/Clinical/Dental/ToothIcon',
  component: ToothIcon,
  args: { className: 'size-8 text-dash-blue' },
} satisfies Meta<typeof ToothIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Icon: Story = {}
export const Chip: Story = { render: () => <ToothChip /> }
