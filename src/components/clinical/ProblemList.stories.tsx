import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProblemList } from './ProblemList'

const meta = {
  title: 'Components/Clinical/ProblemList',
  component: ProblemList,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ProblemList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
