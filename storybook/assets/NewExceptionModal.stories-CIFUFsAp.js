import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { NewExceptionModal } from './NewExceptionModal'

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
`})))()}n();export{t as default};