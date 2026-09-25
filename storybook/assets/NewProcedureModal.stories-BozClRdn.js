import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { NewProcedureModal } from './NewProcedureModal'
import { esperar, pulsar, secuencia } from '@/design-system/play'

const meta = {
  title: 'Components/Clinical/Dental/NewProcedureModal',
  component: NewProcedureModal,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  args: { open: true, area: 'Tooth 21', teeth: [20, 21, 22], onClose: () => {}, onSave: () => {} },
} satisfies Meta<typeof NewProcedureModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* "Next Step" queda deshabilitado hasta elegir un procedimiento. */
export const NextDisabledUntilProcedure: Story = {}

/* Paso 2 (superficies): sin superficies marcadas "Apply to unset" está
   deshabilitado y "Previous tooth" también en el primer diente. */
export const SurfacesStepEmpty: Story = {
  play: secuencia(pulsar(/^D0120/), pulsar(/chart on tooth/i), pulsar(/next step/i), esperar(/apply to unset/i)),
}
`})))()}export{n,i as r,r as t};