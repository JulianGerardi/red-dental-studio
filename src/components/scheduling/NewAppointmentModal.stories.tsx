import type { Meta, StoryObj } from '@storybook/react-vite'
import { NewAppointmentModal } from './NewAppointmentModal'
import { EstadosDelDrawer, PasosDelDrawer, SpecsDelDrawer } from '@/design-system/kit-drawer'
import { esperar, pulsar, pulsarRol, secuencia } from '@/design-system/play'

const meta = {
  title: 'Components/Scheduling/NewAppointmentModal',
  component: NewAppointmentModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 720 },
      description: {
        component: [
          'Agendar un turno desde *Scheduling → New appointment*, desde una solicitud (*Schedule*) o editando uno existente. Es el drawer de New Appointment de Confidentally 2.0, con el calendario del día que se despliega al costado al tocar la fecha o la hora.',
          '',
          '**Pasos:** *Patient and Scheduling* (paciente, providers, motivo, fecha y horario, operatory y estado) y *Link to treatment plan visit* (plan y visita, opcional; Additional y notas).',
          '',
          '**Visita linkeada a otro turno** (desde 2026-10-17): una visita pertenece a un solo turno. Si la que se elige ya tiene uno, su fila lo muestra —fecha, hora y estado— con un círculo de info, y **Save pregunta *Move treatment visit?***. *Move visit* la desvincula del turno anterior y la linkea al nuevo; *Cancel* vuelve al drawer sin tocar nada. Es una pregunta de sí o no, por eso es un `ConfirmDialog` y no un tercer paso.',
          '',
          '**Probalo:** en *Playground* completá el paso 1, avanzá y elegí **Visit 2** (es la linkeada); después apretá Save.',
        ].join('\n'),
      },
    },
  },
  args: { onClose: () => {} },
} satisfies Meta<typeof NewAppointmentModal>

export default meta
type Story = StoryObj<typeof meta>

/* El drawer vivo, en el paso 1. */
export const Playground: Story = {}

export const Edit: Story = {
  args: { titulo: 'Edit Appointment', inicial: { patient: 'Maria Abril Viola', reason: 'Routine cleaning appointment' } },
}

/* Con el paso 1 completo: Next Step lleva directo al paso 2. */
const COMPLETO = { patient: 'John Smith', primary: 'Dr. Emily Chen', date: '20-10-2026', start: '10 AM', end: '11 AM', operatory: 'Operatory 1', status: 'Booked' }

export const Parts: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <PasosDelDrawer pasos={[
      { nombre: 'Patient and Scheduling', secciones: 'Patient, Primary y Additional Provider · Requestor y Reason for Visit · Date, Start y End Time (con el calendario del día al costado) · Operatory y Status', obligatorios: 'Patient, Primary Provider, Date, Start y End Time, Operatory, Status' },
      { nombre: 'Link to treatment plan visit', secciones: 'Treatment plan · Visit (la fila de una visita linkeada muestra su otro turno) · Additional: ASAP, Follow-up, Premedicate · Notes', obligatorios: 'Nada: el link es opcional. Si la visita está linkeada a otro turno, Save pregunta si se mueve.' },
    ]} nota="Un solo paso con pregunta, no uno por escenario: la pregunta de mover la visita sólo aparece cuando hace falta, así el indicador siempre dice dos pasos." />
  ),
}

export const States: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <EstadosDelDrawer estados={[
      { estado: 'Default', cuando: 'Abre en el paso 1, sin errores.', story: 'Playground' },
      { estado: 'Edit', cuando: 'Con datos del turno: mismo drawer, otro título y otro toast.', story: 'Edit' },
      { estado: 'Validation errors', cuando: 'Next Step con obligatorios vacíos: borde rojo y "This field is required."', story: 'With Validation Errors' },
      { estado: 'Visit linked elsewhere', cuando: 'La visita elegida ya tiene turno: su fila muestra Linked appointment con fecha, hora y estado, y el círculo de info explica que hay que moverla.', story: 'Linked Visit' },
      { estado: 'Move question', cuando: 'Save con esa visita elegida abre Move treatment visit? sobre el drawer. Cancel lo cierra y el drawer sigue como estaba, con el foco otra vez en Save.', story: 'Move Visit Question' },
      { estado: 'Moved', cuando: 'Move visit guarda el turno, cierra el drawer y avisa con dos toasts: el del turno y "Visit 2 moved from the Sep 28, 2026 appointment."' },
    ]} />
  ),
}

/* Estado de error: Save con los campos obligatorios vacíos. */
export const WithValidationErrors: Story = {
  play: secuencia(pulsar(/^next step$/i), esperar(/required|at least|must|invalid/i)),
}

/* Paso 2 con Visit 2, que ya está linkeada a otro turno. */
export const LinkedVisit: Story = {
  args: { titulo: 'New Appointment', inicial: COMPLETO },
  play: secuencia(pulsar(/^next step$/i), pulsarRol('radio', /^Visit 2/), esperar(/Linked appointment/)),
}

/* La pregunta abierta al guardar. */
export const MoveVisitQuestion: Story = {
  args: { titulo: 'New Appointment', inicial: COMPLETO },
  play: secuencia(pulsar(/^next step$/i), pulsarRol('radio', /^Visit 2/), pulsar(/^save$/i), esperar(/Move treatment visit\?/)),
}

export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <SpecsDelDrawer filas={[
      ['Size', 'lg · 560px; con el calendario del día, el panel se despliega a la izquierda'],
      ['Opens from', 'New appointment y Schedule (una solicitud) en Scheduling; Edit en el Dashboard y en Patients.'],
      ['Move question', 'ConfirmDialog de 420px sobre el drawer: Move treatment visit?, con Cancel y Move visit. Detalle en Components / Scheduling / TreatmentPlanPicker.'],
      ['Toasts', '"Appointment for {patient} booked at {time}." y, si se movió una visita, "{Visit} moved from the {date} appointment."'],
      ['Texts', 'Los del Figma; los de la visita linkeada, del prototipo de Julián (2026-10-17).'],
    ]} />
  ),
}
