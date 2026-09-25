import type { Meta, StoryObj } from '@storybook/react-vite'
import { LocationHoursModal } from './LocationHoursModal'

const meta = {
  title: 'Components/Settings/LocationHoursModal',
  component: LocationHoursModal,
  parameters: { layout: 'fullscreen' },
  args: { onClose: () => {} },
} satisfies Meta<typeof LocationHoursModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const FromSingleDay: Story = { args: { dia: 3 } }
