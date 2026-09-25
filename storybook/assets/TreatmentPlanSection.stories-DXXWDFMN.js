import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { TreatmentPlanSection } from './TreatmentPlanSection'
import { esperar, pulsar, secuencia } from '@/design-system/play'

const meta = {
  title: 'Components/Clinical/TreatmentPlanSection',
  component: TreatmentPlanSection,
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 720 } } },
} satisfies Meta<typeof TreatmentPlanSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* Filas elegidas: "Select all procedures" tilda todas y las acciones en lote
   quedan a la vista. */
export const RowsSelected: Story = { play: pulsar(/select all procedures/i) }

/* Estado de error: "New Alternative Case" abre el diálogo de mover; Save sin
   elegir el caso de destino marca el campo como obligatorio. */
export const MoveDialogWithError: Story = {
  play: secuencia(pulsar(/new alternative case/i), pulsar(/^save$/i), esperar(/required/i)),
}
`})))()}export{n,i as r,r as t};