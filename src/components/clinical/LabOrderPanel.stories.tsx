import type { Meta, StoryObj } from '@storybook/react-vite'
import { LabOrderPanel } from './LabOrderPanel'

const meta = {
  title: 'Components/Clinical/LabOrderPanel',
  component: LabOrderPanel,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof LabOrderPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
