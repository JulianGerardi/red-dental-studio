import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConsentBlock } from './ConsentBlock'

const meta = {
  title: 'Components/Clinical/ConsentBlock',
  component: ConsentBlock,
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 720 } } },
} satisfies Meta<typeof ConsentBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
