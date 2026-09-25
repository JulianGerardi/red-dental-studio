import type { Meta, StoryObj } from '@storybook/react-vite'
import { NewHoursModal } from './NewHoursModal'

const meta = {
  title: 'Components/Settings/NewHoursModal',
  component: NewHoursModal,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  args: { onClose: () => {} },
} satisfies Meta<typeof NewHoursModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
