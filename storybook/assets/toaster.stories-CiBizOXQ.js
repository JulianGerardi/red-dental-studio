import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { aviso } from './toaster'
import { Button } from './button'

const meta = {
  title: 'Components/UI/Toast',
  parameters: { docs: { description: { component: 'Se dispara con \`aviso.ok / error / warn / info\`. El \`<Toaster />\` ya está montado en el preview.' } } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Tipos: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => aviso.ok('Consent template updated.')}>ok</Button>
      <Button variant="outline" onClick={() => aviso.error('Could not save the appointment.')}>error</Button>
      <Button variant="outline" onClick={() => aviso.warn('This patient has an open balance.')}>warn</Button>
      <Button variant="outline" onClick={() => aviso.info('Rich text formatting is not available.')}>info</Button>
      <Button variant="outline" onClick={() => aviso.ok('Appointment moved.', { label: 'Go to Mar 13', onClick: () => {} })}>with action</Button>
    </div>
  ),
}
`})))()}export{r as n,n as r,i as t};