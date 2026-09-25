import type { Meta, StoryObj } from '@storybook/react-vite'
import { VitalsPanel } from './VitalsPanel'

const meta = {
  title: 'Components/Clinical/VitalsPanel',
  component: VitalsPanel,
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 720 } } },
} satisfies Meta<typeof VitalsPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
