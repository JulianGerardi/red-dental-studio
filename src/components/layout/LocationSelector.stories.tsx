import type { Meta, StoryObj } from '@storybook/react-vite'
import { LocationSelector } from './LocationSelector'

const meta = {
  title: 'Components/Layout/LocationSelector',
  component: LocationSelector,
  decorators: [(Story) => <div className="h-[420px] w-[340px]"><Story /></div>],
} satisfies Meta<typeof LocationSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
