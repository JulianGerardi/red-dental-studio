import type { Meta, StoryObj } from '@storybook/react-vite'
import { EditFindingDrawer } from './EditFindingDrawer'

const meta = {
  title: 'Components/Clinical/Dental/EditFindingDrawer',
  component: EditFindingDrawer,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  args: {
    finding: { id: 'F-1', area: 'Tooth 3', condition: 'chronic enamel dental caries', descriptor: 'Deep', date: 'May 14, 2026', status: 'Active', tooth: 3, provider: 'Elena Martinez', surfaces: ['O', 'DB'], notes: '', linked: ['#10987231'], diagnoses: [] },
    onClose: () => {},
    onSave: () => {},
  },
} satisfies Meta<typeof EditFindingDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* Un finding sin pieza (una zona de la boca): sin la rueda de superficies. */
export const WithoutTooth: Story = { args: { finding: { id: 'F-2', area: 'Soft Palate', condition: 'oral candidiasis', descriptor: 'Red', date: 'May 14, 2026', status: 'Active', tooth: null, provider: 'Sarah Stone', surfaces: [], notes: '', linked: [], diagnoses: [] } } }
