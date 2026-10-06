import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConfirmDialog } from './confirm-dialog'
import { Button } from './button'

type Args = { title: string; text: string; confirmLabel: string; tone: 'primary' | 'danger' }

const meta = {
  title: 'Elements/ConfirmDialog',
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 420 },
      description: {
        component: 'La confirmación de una sola pregunta, lo único que no se abre como drawer (igual que en Confidentally 2.0): chica y centrada, porque se contesta sí o no sin cargar nada. **danger** para lo que borra o descarta sin vuelta. **Probalo** en *Playground*.',
      },
    },
  },
  args: { title: 'Discard and close?', text: 'This returns the whole chart to its default. It cannot be undone.', confirmLabel: 'Discard and close', tone: 'danger' },
  argTypes: {
    title: { control: 'text', description: 'La pregunta.' },
    text: { control: 'text', description: 'Qué pasa si se confirma.' },
    confirmLabel: { control: 'text', description: 'Lo que hace el botón, con el verbo de la acción.' },
    tone: { control: 'inline-radio', options: ['primary', 'danger'], description: 'danger: borra o descarta algo que no se recupera.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

function Demo({ title, text, confirmLabel, tone }: Args) {
  const [abierto, setAbierto] = useState(true)
  return (
    <div className="p-6">
      <Button onClick={() => setAbierto(true)}>Open confirmation</Button>
      {abierto && (
        <ConfirmDialog title={title} confirmLabel={confirmLabel} tone={tone} onCancel={() => setAbierto(false)} onConfirm={() => setAbierto(false)}>
          <p>{text}</p>
        </ConfirmDialog>
      )}
    </div>
  )
}

export const Playground: Story = { render: (args) => <Demo {...args} /> }
export const Primary: Story = { args: { title: 'Back to permanent dentition?', text: 'What was marked on the primary teeth is cleared.', confirmLabel: 'Switch to permanent', tone: 'primary' }, render: (args) => <Demo {...args} /> }
