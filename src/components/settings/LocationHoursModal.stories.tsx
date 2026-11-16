import type { Meta, StoryObj } from '@storybook/react-vite'
import { LocationHoursModal } from './LocationHoursModal'
import { EstadosDelDrawer, SpecsDelDrawer } from '@/design-system/kit-drawer'
import { Bloque, Lienzo, TablaPartes } from '@/design-system/kit'
import { esperar, pulsar, secuencia } from '@/design-system/play'
import { HORARIO_SEMANAL } from '@/data/location-detail'

/* La semana de ejemplo de la locación, en el orden de la tabla (0 = Sunday). */
const SEMANA = Object.values(HORARIO_SEMANAL)

const meta = {
  title: 'Components/Settings/LocationHoursModal',
  component: LocationHoursModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 620 },
      jira: ['CON-1546', 'CON-2890'],
      description: {
        component: [
          '*Set working hours*: lo abren **Edit hours** o activar **Open** en un día cerrado de *Settings → Locations → Working Hours*. Se cargan franjas (Start / End Time, de a dos) y se eligen los días en *Repeat on days*.',
          '',
          '**Aplicar a otros días** (2026-11-16): el día de origen va relleno en azul y no se puede sacar (`aria-disabled`). Los demás se eligen estén Open o Closed. Save reemplaza el horario completo de cada día elegido; no los vincula: después cada uno se edita aparte.',
          '',
          '**Replace working hours?**: si algún día adicional está Open con otro horario, Save pregunta antes, nombrando sólo esos días en el orden de la tabla. No pregunta si sólo cambia el de origen, si los otros están Closed o si ya tienen el mismo horario (se comparan las franjas ordenadas). Cancel vuelve al panel con todo lo cargado.',
          '',
          '**Turnos afectados:** si `onGuardar` devuelve `false`, el panel queda abierto: la pantalla lo usa para abrir *HoursAppointmentsDialog* cuando las horas nuevas dejan afuera turnos Proposed o Booked.',
          '',
          '**Probalo:** en *Playground* (Sunday, cerrado) cargá 09:00 a 14:00, elegí M y T y apretá Save.',
        ].join('\n'),
      },
    },
  },
  args: { onClose: () => {}, horario: SEMANA },
} satisfies Meta<typeof LocationHoursModal>

export default meta
type Story = StoryObj<typeof meta>

/* Abierto desde el switch de Sunday (cerrado): una fila vacía y Sunday fijo. */
export const Playground: Story = { args: { dia: 0 } }

/* Edit hours de Tuesday: sus dos franjas cargadas. */
export const EditHours: Story = { args: { dia: 2, iniciales: HORARIO_SEMANAL.Tuesday.rangos } }

/* El día de origen relleno y sin poder sacarse; Monday y Tuesday elegidos además. */
export const OtherDaysSelected: Story = {
  args: { dia: 0 },
  play: secuencia(pulsar(/^monday$/i), pulsar(/^tuesday$/i)),
}

/* Estado de error: Save con los campos obligatorios vacíos. */
export const WithValidationErrors: Story = {
  args: { dia: 0 },
  play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i)),
}

/* Replace working hours?: Tuesday con sus horas de siempre aplicadas a Wednesday, que tiene cuatro franjas. */
export const ReplaceQuestion: Story = {
  args: { dia: 2, iniciales: HORARIO_SEMANAL.Tuesday.rangos },
  play: secuencia(pulsar(/^wednesday$/i), pulsar(/^save$/i), esperar(/Replace working hours\?/)),
}

export const Parts: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[
          ['Time ranges', 'Start Time y End Time de a dos, con la ✕ para quitar una fila cuando hay más de una.', 'SelectField'],
          ['Add another time range', 'Suma una fila vacía.', 'Link azul con CirclePlus'],
          ['Repeat on days', 'Siete botones S M T W T F S. El día de origen va relleno y fijo; el resto con borde azul cuando está elegido.', 'button aria-pressed'],
          ['Replace working hours?', 'Pregunta antes de pisar el horario distinto de otro día abierto.', 'ConfirmDialog primary'],
          ['Footer', 'Cancel y Save del mismo ancho.', 'DrawerActions'],
        ]} />
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <EstadosDelDrawer estados={[
      { estado: 'Closed day', cuando: 'Desde el switch Open: una fila vacía y el día de origen fijo.', story: 'Playground' },
      { estado: 'Edit hours', cuando: 'Las franjas del día cargadas para editarlas.', story: 'Edit Hours' },
      { estado: 'Other days selected', cuando: 'El día de origen relleno (no se saca) y otros días con borde azul.', story: 'Other Days Selected' },
      { estado: 'Validation errors', cuando: 'Required., Start time must be earlier than end time., Time interval must be at least 30 minutes., This time interval overlaps with another. y Select at least one day.', story: 'With Validation Errors' },
      { estado: 'Replace question', cuando: 'Save con un día adicional Open y otro horario. Cancel vuelve al panel sin guardar.', story: 'Replace Question' },
      { estado: 'Waiting on appointments', cuando: 'onGuardar devolvió false: el panel sigue abierto mientras HoursAppointmentsDialog resuelve los turnos.' },
    ]} />
  ),
}

export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <SpecsDelDrawer filas={[
      ['Size', 'sm · 420px'],
      ['Day buttons', '32 × 32px, radio md. Origen: fondo dash-blue y texto blanco; elegido: borde dash-blue; libre: texto ink-faint.'],
      ['Replace message', '"This will replace the existing working hours for Monday and Tuesday. Do you want to continue?" Sólo días adicionales abiertos con otro horario, en el orden de la tabla.'],
      ['Toasts', '"Hours saved for Sunday." o "Hours saved for 3 days."'],
      ['Props', 'dia (origen 0-6), iniciales (franjas del día), horario (la semana, para comparar), onGuardar(dias, rangos) → false deja el panel abierto.'],
    ]} />
  ),
}
