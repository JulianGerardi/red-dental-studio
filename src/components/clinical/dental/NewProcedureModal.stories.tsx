import type { Meta, StoryObj } from '@storybook/react-vite'
import { NewProcedureModal } from './NewProcedureModal'

const meta = {
  title: 'Components/Clinical/Dental/NewProcedureModal',
  component: NewProcedureModal,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  args: { open: true, area: 'Tooth 21', teeth: [20, 21, 22], onClose: () => {}, onSave: () => {} },
} satisfies Meta<typeof NewProcedureModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
