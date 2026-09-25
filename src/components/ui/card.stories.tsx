import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'

const meta = {
  title: 'Components/UI/Card',
  component: Card,
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-[340px]">
      <CardHeader>
        <CardTitle>Treatment plan</CardTitle>
        <CardDescription>3 visits · 8 procedures</CardDescription>
      </CardHeader>
      <CardContent className="text-sm">Crown, root canal and follow-up cleaning.</CardContent>
    </Card>
  ),
}
