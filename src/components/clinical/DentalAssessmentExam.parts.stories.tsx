import type { Meta, StoryObj } from '@storybook/react-vite'
import { NewDocumentDialog } from './DentalAssessmentExam'

const meta = {
  title: 'Components/Clinical/DentalAssessmentExam parts',
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 520 } } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const NewDocument: Story = { render: () => <NewDocumentDialog open onClose={() => {}} onSave={() => {}} /> }
