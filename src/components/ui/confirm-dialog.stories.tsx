import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bloque, Lienzo, Tabla, Token } from '@/design-system/kit'
import { ConfirmDialog } from './confirm-dialog'
import { Button } from './button'

type Icono = 'auto' | 'warning' | 'delete'
type Args = { title: string; text: string; confirmLabel: string; tone: 'primary' | 'danger'; icon: Icono; otherAction: boolean; loading: boolean }

const meta = {
  title: 'Elements/ConfirmDialog',
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 420 },
      jira: ['CON-1546', 'CON-2890', 'CON-3999'],
      description: {
        component: 'La confirmación de una sola pregunta, lo único que no se abre como drawer (igual que en Confidentally 2.0): chica y centrada, porque se contesta sí o no sin cargar nada. **danger** para lo que borra, descarta o desactiva sin vuelta. Desde el 2026-11-16 el título lleva un ícono de 16 px en línea, sin círculo, que sale solo del tono: info azul (primary) o triángulo rojo (danger). *icon* lo cambia: **warning** (alerta, ámbar o roja) cuando hay algo que revisar antes de seguir, y **delete** (tacho rojo) sólo en lo que borra. Con *otherAction* es una decisión de tres salidas (Consent required); con *loading* la acción principal muestra el spinner y los demás botones quedan deshabilitados. En Figma: *Confidentally UI · Design System* → Feedback & Overlays → Confirm dialog (Tone × Icon). **Probalo:** cambiá *tone* e *icon* en *Playground*.',
      },
    },
  },
  args: { title: 'Discard and close?', text: 'This returns the whole chart to its default. It cannot be undone.', confirmLabel: 'Discard and close', tone: 'danger', icon: 'auto', otherAction: false, loading: false },
  argTypes: {
    title: { control: 'text', description: 'La pregunta.' },
    text: { control: 'text', description: 'Qué pasa si se confirma.' },
    confirmLabel: { control: 'text', description: 'Lo que hace el botón, con el verbo de la acción.' },
    tone: { control: 'inline-radio', options: ['primary', 'danger'], description: 'danger: borra o descarta algo que no se recupera.' },
    icon: { control: 'inline-radio', options: ['auto', 'warning', 'delete'], description: 'auto (sin prop): sale del tono, info azul o triángulo rojo. warning: alerta, hay algo que revisar antes de seguir. delete: tacho, sólo para lo que borra.' },
    otherAction: { control: 'boolean', description: 'Una tercera salida entre Cancel y la acción principal (Sign now). El diálogo pasa de 420 a 480px.' },
    loading: { control: 'boolean', description: 'La acción principal está en curso: spinner en su botón y los otros deshabilitados.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

function Demo({ title, text, confirmLabel, tone, icon, otherAction, loading }: Args) {
  const [abierto, setAbierto] = useState(true)
  return (
    <div className="p-6">
      <Button onClick={() => setAbierto(true)}>Open confirmation</Button>
      {abierto && (
        <ConfirmDialog
          title={title} confirmLabel={confirmLabel} tone={tone} loading={loading}
          icon={icon === 'auto' ? undefined : icon}
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

/* Estados del ícono (2026-11-16): uno por combinación de tone e icon que usa la app. */
export const Neutral: Story = { name: 'Neutral (info)', args: { title: 'Replace working hours?', text: 'This will replace the existing working hours for Monday and Tuesday. Do you want to continue?', confirmLabel: 'Confirm', tone: 'primary' }, render: (args) => <Demo {...args} /> }
export const Warning: Story = { name: 'Warning (review first)', args: { title: 'These hours affect scheduled appointments', text: 'There are scheduled appointments outside the new working hours. You can review and manage each appointment individually, or confirm to move all appointments to the waiting list.', confirmLabel: 'Confirm', tone: 'primary', icon: 'warning' }, render: (args) => <Demo {...args} /> }
export const Danger: Story = { name: 'Danger (discard, deactivate)', args: { title: 'Discard unsaved changes?', text: "Your billing profile changes haven't been saved.", confirmLabel: 'Discard changes', tone: 'danger' }, render: (args) => <Demo {...args} /> }
export const DangerWarning: Story = { name: 'Danger + warning', args: { title: 'This room has scheduled appointments', text: 'There are scheduled appointments assigned to Operatory 1. You can review and manage each appointment individually or confirm to move all of them to the waiting list.', confirmLabel: 'Confirm', tone: 'danger', icon: 'warning' }, render: (args) => <Demo {...args} /> }
export const Delete: Story = { name: 'Delete (trash)', args: { title: 'Delete Relationship', text: 'Are you sure you want to remove this relationship? This action cannot be undone.', confirmLabel: 'Delete', tone: 'danger', icon: 'delete' }, render: (args) => <Demo {...args} /> }

/* Tres salidas con el ícono de alerta: Consent required. El diálogo completo está en Components / Clinical / ConsentRequiredDialog. */
export const ThreeActions: Story = { args: { title: 'Consent required', text: 'This procedure requires a consent document. Send it to the patient to sign later, or have it signed now.', confirmLabel: 'Send consent and sign later', tone: 'primary', icon: 'warning', otherAction: true }, render: (args) => <Demo {...args} /> }

/* loading: la acción principal con spinner y Cancel y Sign now disabled mientras dura. */
export const Loading: Story = { args: { title: 'Consent required', text: 'This procedure requires a consent document. Send it to the patient to sign later, or have it signed now.', confirmLabel: 'Send consent and sign later', tone: 'primary', icon: 'warning', otherAction: true, loading: true }, render: (args) => <Demo {...args} /> }

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
          <tr><td className="font-semibold">Icon</td><td>16 px en línea con el título, sin círculo ni fondo. Sale del tono; <em>icon</em> lo cambia a alerta o tacho (ver States).</td></tr>
          <tr><td className="font-semibold">Other action</td><td>Opcional: una tercera salida secondary entre Cancel y la principal.</td></tr>
          <tr><td className="font-semibold">Loading</td><td>Spinner en la principal; Cancel, la tercera salida, la X y Esc no cierran mientras dura.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

/* Qué ícono lleva cada combinación (2026-11-16). Cada fila tiene su story abierta para probarla. */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="States" nota="El ícono no se elige por pantalla: sale de tone e icon. Un tacho en algo que sólo desactiva o descarta diría que se borra.">
        <Tabla encabezado={['tone', 'icon', 'Ícono', 'Cuándo', 'Story']} minimo={720}>
          <tr><td>primary</td><td>—</td><td>info, <Token nombre="dash-blue" /></td><td>Pregunta simple: Replace working hours?, Move treatment visit?</td><td>Neutral (info)</td></tr>
          <tr><td>primary</td><td>warning</td><td>circle-alert, <Token nombre="warn-fg" /></td><td>Hay algo que revisar antes de seguir: Consent required, turnos afectados.</td><td>Warning, ThreeActions</td></tr>
          <tr><td>danger</td><td>—</td><td>triangle-alert, <Token nombre="dash-bad-fg" /></td><td>Descarta, desactiva o deshabilita: Discard unsaved changes?, Deactivate Operatory 1?</td><td>Danger</td></tr>
          <tr><td>danger</td><td>warning</td><td>circle-alert, <Token nombre="dash-bad-fg" /></td><td>Desactivar con cosas que resolver: This room has scheduled appointments.</td><td>Danger + warning</td></tr>
          <tr><td>danger</td><td>delete</td><td>trash-2, <Token nombre="dash-bad-fg" /></td><td>Borra: Delete Appointment, Delete Relationship, Delete procedure, borrar una suscripción.</td><td>Delete (trash)</td></tr>
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
          <tr><td className="font-semibold">Icon</td><td>16px, 8px a la izquierda del título, alineado con la primera línea (3px desde arriba). Sin círculo.</td></tr>
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
          <tr><td className="font-semibold">Replace working hours? (Locations → Working Hours)</td><td>primary</td></tr>
          <tr><td className="font-semibold">These hours affect scheduled appointments (HoursAppointmentsDialog)</td><td>primary con icon warning</td></tr>
          <tr><td className="font-semibold">This room has scheduled appointments / Deactivate Operatory 1?</td><td>danger (con warning si hay turnos)</td></tr>
          <tr><td className="font-semibold">Delete Appointment, Delete Relationship, Delete procedure, delete subscription</td><td>danger con icon delete</td></tr>
          <tr><td className="font-semibold">Move treatment visit? (New Appointment, al guardar con una visita linkeada a otro turno)</td><td>primary</td></tr>
          <tr><td className="font-semibold">Clinical Note (al terminar el encuentro; Cancel es "Remind me later")</td><td>primary</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
