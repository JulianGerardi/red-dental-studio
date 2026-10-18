import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toaster, aviso } from './toaster'
import { Button } from './button'

const meta = {
  title: 'Components/UI/Toast',
  component: Toaster,
  parameters: { docs: { description: { component: 'El aviso que confirma o rechaza cada acción, abajo a la izquierda. Se dispara con `aviso.ok / error / warn / info` (el `<Toaster />` ya está montado en la app y en el preview). **Probalo** en *Playground*: tipo, título, mensaje y acción. Con título, el mensaje explica la regla que frenó la acción (*Procedure cannot be updated*).' } } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

type ToastArgs = { type: 'ok' | 'error' | 'warn' | 'info'; title: string; message: string; withAction: boolean; actionLabel: string }

/* Elegí tipo, mensaje y acción, y apretá el botón. */
export const Playground: StoryObj<ToastArgs> = {
  args: { type: 'ok', title: '', message: 'Consent template updated.', withAction: false, actionLabel: 'Undo' },
  argTypes: {
    type: { control: 'inline-radio', options: ['ok', 'error', 'warn', 'info'], description: 'ok: salió bien · error: no se pudo · warn: salió, pero ojo · info: dato.' },
    title: { control: 'text', description: 'Opcional. Con título, el mensaje explica la regla que frenó la acción y la acción baja debajo del texto.' },
    message: { control: 'text', description: 'Qué pasó, en pasado y en una línea.' },
    withAction: { control: 'boolean', description: 'Un botón para deshacer o para ir a ver el resultado.' },
    actionLabel: { control: 'text' },
  },
  render: ({ type, title, message, withAction, actionLabel }) => (
    <Button onClick={() => aviso[type](title ? { titulo: title, texto: message } : message, withAction ? { label: actionLabel, onClick: () => aviso.info(`${actionLabel} clicked.`) } : undefined)}>Show toast</Button>
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
      <Button variant="secondary" onClick={() => aviso.error({ titulo: 'Procedure cannot be updated', texto: 'The treatment case must be Accepted and its treatment plan must be Accepted or In Progress.' }, { label: 'View case', onClick: () => {} })}>with title and action</Button>
    </div>
  ),
}
