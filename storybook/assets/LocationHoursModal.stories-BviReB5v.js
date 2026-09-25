import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { LocationHoursModal } from './LocationHoursModal'
import { esperar, pulsar, secuencia } from '@/design-system/play'

const meta = {
  title: 'Components/Settings/LocationHoursModal',
  component: LocationHoursModal,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  args: { onClose: () => {} },
} satisfies Meta<typeof LocationHoursModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
/* Viene de una fila puntual: sólo ese día queda seleccionado en "Repeat on days". */
export const FromSingleDay: Story = { args: { dia: 3 } }

/* Estado de error: Save con los campos obligatorios vacíos. */
export const WithValidationErrors: Story = {
  play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i)),
}
`})))()}export{n,i as r,r as t};