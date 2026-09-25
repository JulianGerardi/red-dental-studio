import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { ClinicalItemModal } from './ClinicalItemModal'
import { esperar, pulsar, secuencia } from '@/design-system/play'

const meta = {
  title: 'Components/Patients/ClinicalItemModal',
  component: ClinicalItemModal,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  args: { categoria: 'Allergies', onGuardar: () => {}, onClose: () => {} },
  argTypes: { categoria: { control: 'select', options: ['Allergies', 'Medical Conditions', 'Medication', 'Past Surgery and Hospitalization'] } },
} satisfies Meta<typeof ClinicalItemModal>

export default meta
type Story = StoryObj<typeof meta>

export const Allergies: Story = {}
export const Medication: Story = { args: { categoria: 'Medication' } }
export const MedicalConditions: Story = { args: { categoria: 'Medical Conditions' } }
export const PastSurgery: Story = { args: { categoria: 'Past Surgery and Hospitalization' } }

/* Estado de error: Save con los campos obligatorios vacíos. */
export const WithValidationErrors: Story = {
  play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i)),
}
`})))()}export{n,i as r,r as t};