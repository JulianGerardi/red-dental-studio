import type { Meta, StoryObj } from '@storybook/react-vite'
import { LinkTreatmentPlanDrawer } from './LinkTreatmentPlanDrawer'
import { userEvent, within } from 'storybook/test'

const meta = {
  title: 'Components/Scheduling/LinkTreatmentPlanDrawer',
  component: LinkTreatmentPlanDrawer,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  args: { onClose: () => {} },
} satisfies Meta<typeof LinkTreatmentPlanDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* Otro plan elegido: la tarjeta toma borde azul y el radio se marca. */
export const SecondPlanSelected: Story = {
  play: async (c) => {
    const cuerpo = within(c.canvasElement.ownerDocument.body)
    const planes = await cuerpo.findAllByText('Plan 1')
    await userEvent.click(planes[1])
  },
}
