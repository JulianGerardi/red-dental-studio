import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { NewExceptionModal } from './NewExceptionModal'
import { esperar, pulsar, secuencia } from '@/design-system/play'

const meta = {
  title: 'Components/Settings/NewExceptionModal',
  component: NewExceptionModal,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  args: { onClose: () => {}, onGuardar: () => {} },
} satisfies Meta<typeof NewExceptionModal>

export default meta
type Story = StoryObj<typeof meta>

export const Create: Story = {}
export const Edit: Story = {
  args: { inicial: { id: 'exc1', nombre: 'Independence Day', abreviatura: 'HOL', razon: 'Holiday', fecha: new Date(2026, 6, 4), horaInicio: '', horaFin: '', todoElDia: true, estado: 'Active' } },
}

/* Estado de error: Save con los campos obligatorios vacíos. */
export const WithValidationErrors: Story = {
  play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i)),
}
`})))()}export{n,i as r,r as t};