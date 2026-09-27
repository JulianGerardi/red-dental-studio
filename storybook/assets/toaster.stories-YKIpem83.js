import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toaster, aviso } from './toaster'
import { Button } from './button'

const meta = {
  title: 'Components/UI/Toast',
  component: Toaster,
  parameters: { docs: { description: { component: 'El aviso que confirma o rechaza cada acción, abajo a la izquierda. Se dispara con \`aviso.ok / error / warn / info\` (el \`<Toaster />\` ya está montado en la app y en el preview). **Probalo** en *Playground*: tipo, mensaje y acción.' } } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

type ToastArgs = { type: 'ok' | 'error' | 'warn' | 'info'; message: string; withAction: boolean; actionLabel: string }

/* Elegí tipo, mensaje y acción, y apretá el botón. */
export const Playground: StoryObj<ToastArgs> = {
  args: { type: 'ok', message: 'Consent template updated.', withAction: false, actionLabel: 'Undo' },
  argTypes: {
    type: { control: 'inline-radio', options: ['ok', 'error', 'warn', 'info'], description: 'ok: salió bien · error: no se pudo · warn: salió, pero ojo · info: dato.' },
    message: { control: 'text', description: 'Qué pasó, en pasado y en una línea.' },
    withAction: { control: 'boolean', description: 'Un botón para deshacer o para ir a ver el resultado.' },
    actionLabel: { control: 'text' },
  },
  render: ({ type, message, withAction, actionLabel }) => (
    <Button onClick={() => aviso[type](message, withAction ? { label: actionLabel, onClick: () => aviso.info(\`\${actionLabel} clicked.\`) } : undefined)}>Show toast</Button>
  ),
}

export const Tipos: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="secondary" onClick={() => aviso.ok('Consent template updated.')}>ok</Button>
      <Button variant="secondary" onClick={() => aviso.error('Could not save the appointment.')}>error</Button>
      <Button variant="secondary" onClick={() => aviso.warn('This patient has an open balance.')}>warn</Button>
      <Button variant="secondary" onClick={() => aviso.info('Rich text formatting is not available.')}>info</Button>
      <Button variant="secondary" onClick={() => aviso.ok('Appointment moved.', { label: 'Go to Mar 13', onClick: () => {} })}>with action</Button>
    </div>
  ),
}
`})))()}export{r as n,n as r,i as t};