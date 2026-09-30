import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { EXAM_PANEL_TABS, ExamPanelHeader, type ExamPanelTab } from './ExamPanelHeader'

const meta = {
  title: 'Components/Clinical/Dental/ExamPanelHeader',
  component: ExamPanelHeader,
  args: { tab: EXAM_PANEL_TABS[0], onTabChange: () => {}, onNewReview: () => {} },
  decorators: [(Story) => <div className="w-[520px]"><Story /></div>],
} satisfies Meta<typeof ExamPanelHeader>

export default meta
type Story = StoryObj<typeof meta>

function Demo() {
  const [tab, setTab] = useState<ExamPanelTab>('Findings')
  return <ExamPanelHeader tab={tab} onTabChange={setTab} onNewReview={() => {}} />
}

export const Default: Story = { render: () => <Demo /> }
