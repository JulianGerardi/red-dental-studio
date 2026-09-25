import type { Meta, StoryObj } from '@storybook/react-vite'
import { DentalAssessmentExam } from './DentalAssessmentExam'

const meta = {
  title: 'Components/Clinical/DentalAssessmentExam',
  component: DentalAssessmentExam,
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 720 } } },
} satisfies Meta<typeof DentalAssessmentExam>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
