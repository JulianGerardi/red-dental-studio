import type { Meta, StoryObj } from '@storybook/react-vite'
import { ReviewExamDialog } from './ReviewExamDialog'

const meta = {
  title: 'Components/Clinical/Dental/ReviewExamDialog',
  component: ReviewExamDialog,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  args: { open: true, onCancel: () => {}, onConfirm: () => {} },
} satisfies Meta<typeof ReviewExamDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
