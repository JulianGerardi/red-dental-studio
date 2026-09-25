import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { PatientSummaryPanel, TreatmentPanel, TreatmentPlanPanel } from './panels'

const meta = {
  title: 'Components/Clinical/Panels',
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 720 } } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const TreatmentPlan: Story = { render: () => <TreatmentPlanPanel /> }
export const Treatment: Story = { render: () => <TreatmentPanel /> }
export const PatientSummary: Story = { render: () => <PatientSummaryPanel /> }
`})))()}n();export{t as default};