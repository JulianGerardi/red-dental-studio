import type { Meta, StoryObj } from '@storybook/react-vite'
import { HALLAZGOS } from '@/data/clinical-mode'
import { FichaHallazgo, NewCondition, Placa } from './RadiographyViewer'

const meta = {
  title: 'Components/Clinical/RadiographyViewer parts',
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 520 } } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Plate: Story = {
  render: () => <div className="flex gap-4"><div className="h-40 w-64"><Placa id="a" /></div><div className="h-24 w-40"><Placa id="b" chica /></div></div>,
}
export const FindingCard: Story = {
  render: () => <div className="flex w-[320px] flex-col gap-2">{HALLAZGOS.slice(0, 2).map((h) => <FichaHallazgo key={h.id} h={h} onBorrar={() => {}} />)}</div>,
}
export const NewConditionDialog: Story = { parameters: { layout: 'fullscreen' }, render: () => <NewCondition onClose={() => {}} /> }
