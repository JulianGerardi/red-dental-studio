import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { EditProcedureModal } from './EditProcedureModal'

const meta = {
  title: 'Components/Clinical/Dental/EditProcedureModal',
  component: EditProcedureModal,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  args: {
    finding: { id: 'F-1', area: 'Tooth 3', condition: 'chronic enamel dental caries', descriptor: 'Deep', date: 'May 14, 2026', status: 'Active', tooth: 3, provider: 'Elena Martinez', surfaces: ['O', 'DB'], notes: '', linked: [], diagnoses: [] },
    onClose: () => {},
    onSave: () => {},
  },
} satisfies Meta<typeof EditProcedureModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
`})))()}n();export{t as default};