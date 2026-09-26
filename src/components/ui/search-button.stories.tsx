import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchButton } from './search-button'

const meta = {
  title: 'Components/UI/SearchButton',
  component: SearchButton,
  args: { className: 'h-9' },
} satisfies Meta<typeof SearchButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
