import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spotlight } from './CoachMark'

const meta = { title: 'Components/Help/CoachMark parts', parameters: { layout: 'fullscreen' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* El halo que apunta al control real de la pantalla (`data-tour`). */
export const SpotlightRing: Story = {
  render: () => (
    <div className="relative h-[320px] p-16">
      <button data-tour="demo-target" className="bg-dash-blue h-9 rounded-md px-4 text-[13px] font-medium text-white">Target control</button>
      <Spotlight anchor="demo-target" topicId="demo" />
    </div>
  ),
}
