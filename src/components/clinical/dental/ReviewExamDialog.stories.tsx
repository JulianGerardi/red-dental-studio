import type { Meta, StoryObj } from '@storybook/react-vite'
import { ReviewExamDialog } from './ReviewExamDialog'
import { escribir } from '@/design-system/play'

const meta = {
  title: 'Components/Clinical/Dental/ReviewExamDialog',
  component: ReviewExamDialog,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  args: { open: true, onCancel: () => {}, onConfirm: () => {} },
} satisfies Meta<typeof ReviewExamDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* "Confirm" queda deshabilitado hasta que se escribe una nota. */
export const ConfirmDisabledUntilNote: Story = {}

/* Con la nota escrita, Confirm se habilita. */
export const WithNote: Story = { play: escribir(/note/i, 'Exam reviewed with the patient.') }
