import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bloque, Lienzo, Tabla } from '@/design-system/kit'
import { ConfirmDialog } from './confirm-dialog'
import { Button } from './button'

type Args = { title: string; text: string; confirmLabel: string; tone: 'primary' | 'danger'; warningIcon: boolean; otherAction: boolean; loading: boolean }

const meta = {
  title: 'Elements/ConfirmDialog',
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 420 },
      description: {
        component: 'La confirmación de una sola pregunta, lo único que no se abre como drawer (igual que en Confidentally 2.0): chica y centrada, porque se contesta sí o no sin cargar nada. **danger** para lo que borra o descarta sin vuelta. Con *warningIcon* y *otherAction* es una decisión de tres salidas antes de seguir (Consent required); con *loading* la acción principal muestra el spinner y los demás botones quedan deshabilitados. **Probalo** en *Playground*.',
      },
    },
  },
  args: { title: 'Discard and close?', text: 'This returns the whole chart to its default. It cannot be undone.', confirmLabel: 'Discard and close', tone: 'danger', warningIcon: false, otherAction: false, loading: false },
  argTypes: {
    title: { control: 'text', description: 'La pregunta.' },
    text: { control: 'text', description: 'Qué pasa si se confirma.' },
    confirmLabel: { control: 'text', description: 'Lo que hace el botón, con el verbo de la acción.' },
    tone: { control: 'inline-radio', options: ['primary', 'danger'], description: 'danger: borra o descarta algo que no se recupera.' },
    warningIcon: { control: 'boolean', description: 'Círculo ámbar con el signo de alerta: la acción pedida quedó frenada por algo que falta.' },
    otherAction: { control: 'boolean', description: 'Una tercera salida entre Cancel y la acción principal (Sign now). El diálogo pasa de 420 a 480px.' },
    loading: { control: 'boolean', description: 'La acción principal está en curso: spinner en su botón y los otros deshabilitados.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

function Demo({ title, text, confirmLabel, tone, warningIcon, otherAction, loading }: Args) {
  const [abierto, setAbierto] = useState(true)
  return (
    <div className="p-6">
      <Button onClick={() => setAbierto(true)}>Open confirmation</Button>
      {abierto && (
        <ConfirmDialog
          title={title} confirmLabel={confirmLabel} tone={tone} loading={loading}
          icon={warningIcon ? 'warning' : undefined}
          otherAction={otherAction ? { label: 'Sign now', onClick: () => setAbierto(false) } : undefined}
          onCancel={() => setAbierto(false)} onConfirm={() => setAbierto(false)}
        >
          <p>{text}</p>
        </ConfirmDialog>
      )}
    </div>
  )
}

export const Playground: Story = { render: (args) => <Demo {...args} /> }
export const Primary: Story = { args: { title: 'Back to permanent dentition?', text: 'What was marked on the primary teeth is cleared.', confirmLabel: 'Switch to permanent', tone: 'primary' }, render: (args) => <Demo {...args} /> }

/* Tres salidas con el ícono de alerta: Consent required. El diálogo completo está en Components / Clinical / ConsentRequiredDialog. */
export const ThreeActions: Story = { args: { title: 'Consent required', text: 'This procedure requires a consent document. Send it to the patient to sign later, or have it signed now.', confirmLabel: 'Send consent and sign later', tone: 'primary', warningIcon: true, otherAction: true }, render: (args) => <Demo {...args} /> }

/* loading: la acción principal con spinner y Cancel y Sign now disabled mientras dura. */
export const Loading: Story = { args: { title: 'Consent required', text: 'This procedure requires a consent document. Send it to the patient to sign later, or have it signed now.', confirmLabel: 'Send consent and sign later', tone: 'primary', warningIcon: true, otherAction: true, loading: true }, render: (args) => <Demo {...args} /> }

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
          <tr><td className="font-semibold">Warning icon</td><td>Opcional: círculo ámbar de 36px a la izquierda del título.</td></tr>
          <tr><td className="font-semibold">Other action</td><td>Opcional: una tercera salida secondary entre Cancel y la principal.</td></tr>
          <tr><td className="font-semibold">Loading</td><td>Spinner en la principal; Cancel, la tercera salida, la X y Esc no cierran mientras dura.</td></tr>
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
          <tr><td className="font-semibold">Width</td><td>420px, centrada; 480px con una tercera salida.</td></tr>
          <tr><td className="font-semibold">Title</td><td>16px Bold</td></tr>
          <tr><td className="font-semibold">Text</td><td>13px</td></tr>
          <tr><td className="font-semibold">Focus</td><td>Entra en Cancel (lo seguro). Al cerrar vuelve al botón que la abrió (Save, Delete…), no al principio de la página.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Where" nota="Todo lo demás es un drawer.">
        <Tabla encabezado={["Question", "Tone"]} minimo={560}>
          <tr><td className="font-semibold">Discard and close? (odontograma)</td><td>danger</td></tr>
          <tr><td className="font-semibold">Back to permanent dentition?</td><td>primary</td></tr>
          <tr><td className="font-semibold">Clear the tooth selection</td><td>danger</td></tr>
          <tr><td className="font-semibold">Discard, Expire, Cancel, Present, Accept del caso</td><td>danger o primary según la acción</td></tr>
          <tr><td className="font-semibold">Confirm procedure</td><td>primary</td></tr>
          <tr><td className="font-semibold">Consent required (Complete, Start)</td><td>primary con ícono de alerta y tercera salida</td></tr>
          <tr><td className="font-semibold">Move treatment visit? (New Appointment, al guardar con una visita linkeada a otro turno)</td><td>primary</td></tr>
          <tr><td className="font-semibold">Clinical Note (al terminar el encuentro; Cancel es "Remind me later")</td><td>primary</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
