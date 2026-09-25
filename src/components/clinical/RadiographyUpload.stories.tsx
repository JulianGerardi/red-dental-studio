import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadiographyUpload } from './RadiographyUpload'

const meta = {
  title: 'Components/Clinical/RadiographyUpload',
  component: RadiographyUpload,
  parameters: { layout: 'padded' },
  args: { onCancel: () => {}, onSave: () => {} },
} satisfies Meta<typeof RadiographyUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
