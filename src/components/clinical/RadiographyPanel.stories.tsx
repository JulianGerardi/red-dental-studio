import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadiographyPanel } from './RadiographyPanel'

const meta = {
  title: 'Components/Clinical/RadiographyPanel',
  component: RadiographyPanel,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof RadiographyPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
