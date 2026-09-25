import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
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
`})))()}export{r as n,n as r,i as t};