import type { Meta, StoryObj } from '@storybook/react-vite'
import { TreatmentPlanSection } from './TreatmentPlanSection'
import { esperar, pulsar, secuencia } from '@/design-system/play'
import { Bloque, Lienzo, Tabla } from '@/design-system/kit'

const meta = {
  title: 'Components/Clinical/TreatmentPlanSection',
  component: TreatmentPlanSection,
  parameters: {
    layout: 'padded',
    docs: {
      story: { inline: false, iframeHeight: 720 },
      description: {
        component: [
          'El Treatment Plan de Clinical Mode, como red.dev: a la izquierda los planes por fecha de creación; a la derecha el caso elegido con sus visitas y procedimientos, o los procedimientos sin asignar.',
          '',
          '**Según el estado del caso:** en Planning todo se edita; antes de aceptar el plan (Planning, Pending, Presented) **no hay consentimiento ni turno**: no se ven el bloque de consentimiento, la columna Consent ni el turno de cada visita. Desde Waiting for consent aparecen.',
          '',
          '**Probalo:** en *Playground* elegí otro plan de la lista; en *Accepted Case* se ven el consentimiento y los turnos.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof TreatmentPlanSection>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/* Un caso aceptado: con el bloque de consentimiento, la columna Consent y el turno de cada visita. */
export const AcceptedCase: Story = { args: { casoInicial: 'c5' } }

/* Qué se ve en cada estado del caso. */
export const States: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="By case status">
        <Tabla encabezado={['Status', 'Edit', 'Consent', 'Appointment']} minimo={560}>
          <tr><td className="font-semibold">Planning</td><td>Todo: nombre, alternativa, Move to, categoría, arrastrar</td><td>—</td><td>—</td></tr>
          <tr><td className="font-semibold">Pending</td><td>Preview</td><td>—</td><td>—</td></tr>
          <tr><td className="font-semibold">Presented</td><td>—</td><td>—</td><td>—</td></tr>
          <tr><td className="font-semibold">Waiting for consent</td><td>—</td><td>Bloque y columna Consent</td><td>Turno de cada visita</td></tr>
          <tr><td className="font-semibold">Accepted</td><td>Generate Consent</td><td>Bloque y columna Consent</td><td>Turno de cada visita</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

/* Filas elegidas: "Select all procedures" tilda todas y las acciones en lote
   quedan a la vista. */
export const RowsSelected: Story = { play: pulsar(/select all procedures/i) }

/* Estado de error: "New Alternative Case" abre el diálogo de mover; Save sin
   elegir el caso de destino marca el campo como obligatorio. */
export const MoveDialogWithError: Story = {
  play: secuencia(pulsar(/new alternative case/i), pulsar(/^save$/i), esperar(/required/i)),
}
