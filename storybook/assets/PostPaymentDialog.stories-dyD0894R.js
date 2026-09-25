import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { PostPaymentDialog } from './PostPaymentDialog'
import { esperar, pulsar, secuencia } from '@/design-system/play'

const meta = {
  title: 'Components/Billing/PostPaymentDialog',
  component: PostPaymentDialog,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  args: { tipoInicial: 'Patient Payment', onClose: () => {}, onGuardar: () => {} },
  argTypes: { tipoInicial: { control: 'select', options: ['Patient Payment', 'Credit Adjustment', 'Charge Adjustment'] } },
} satisfies Meta<typeof PostPaymentDialog>

export default meta
type Story = StoryObj<typeof meta>

export const PatientPayment: Story = {}
export const CreditAdjustment: Story = { args: { tipoInicial: 'Credit Adjustment' } }
export const ChargeAdjustment: Story = { args: { tipoInicial: 'Charge Adjustment' } }

/* Estado de error: Save con los campos obligatorios vacíos. */
export const WithValidationErrors: Story = {
  play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i)),
}
`})))()}export{n,i as r,r as t};