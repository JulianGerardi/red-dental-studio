import type { Meta, StoryObj } from '@storybook/react-vite'
import { TOPICS } from '@/components/help/topics'
import { TopicCard } from './Help'

const meta = { title: 'Pages/Parts/Help', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Topic: Story = { render: () => <div className="w-[340px]"><TopicCard topic={TOPICS[0]} onOpen={() => {}} /></div> }
