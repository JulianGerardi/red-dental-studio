import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bloque, Lienzo, Tabla } from '@/design-system/kit'
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

/* Las partes de la confirmación. */
export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts">
        <Tabla encabezado={["Part", "What it does"]} minimo={560}>
          <tr><td className="font-semibold">Question</td><td>El título es la pregunta: Discard and close?</td></tr>
          <tr><td className="font-semibold">Text</td><td>Qué pasa si se confirma.</td></tr>
          <tr><td className="font-semibold">Buttons</td><td>Cancel y la acción con su verbo; danger en rojo.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

/* Medidas y dónde se usa. */
export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Specs">
        <Tabla encabezado={["Item", "Value"]} minimo={560}>
          <tr><td className="font-semibold">Width</td><td>420px, centrada.</td></tr>
          <tr><td className="font-semibold">Title</td><td>16px Bold</td></tr>
          <tr><td className="font-semibold">Text</td><td>13px</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Where" nota="Todo lo demás es un drawer.">
        <Tabla encabezado={["Question", "Tone"]} minimo={560}>
          <tr><td className="font-semibold">Discard and close? (odontograma)</td><td>danger</td></tr>
          <tr><td className="font-semibold">Back to permanent dentition?</td><td>primary</td></tr>
          <tr><td className="font-semibold">Clear the tooth selection</td><td>danger</td></tr>
          <tr><td className="font-semibold">Discard, Expire, Cancel, Present, Accept del caso</td><td>danger o primary según la acción</td></tr>
          <tr><td className="font-semibold">Confirm procedure</td><td>primary</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
