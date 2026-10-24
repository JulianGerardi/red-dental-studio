import type { Meta, StoryObj } from '@storybook/react-vite'
import { ExtraOralExam } from './ExtraOralExam'
import { esperar, pulsar, secuencia } from '@/design-system/play'
import { Bloque, Lienzo } from '@/design-system/kit'

const meta = {
  title: 'Components/Clinical/ExtraOralExam',
  component: ExtraOralExam,
  parameters: {
    layout: 'padded',
    docs: {
      story: { inline: false, iframeHeight: 720 },
      description: {
        component: [
          'El examen Extraoral completo: el gráfico de regiones ([ExtraOralDiagram](/docs/components-clinical-dental-extraoraldiagram--docs)) en vez del odontograma, con las acciones y el panel de Findings de [ExamLayout](/docs/components-clinical-examlayout--docs).',
          '',
          '**Add Condition abre el drawer propio** ([RegionConditionDrawer](/docs/components-clinical-dental-regionconditiondrawer--docs)), no el de diente: `ExamLayout` ahora acepta `onCondicion` para reemplazarlo por examen. Add Procedure sigue siendo el genérico -pendiente, no es lo que pidió esta tanda-.',
          '',
          '**Probalo:** clickeá una región del gráfico -queda en ámbar- y después "Add Condition": el drawer abre con esa región ya puesta en "Selected area".',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof ExtraOralExam>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* Clickear una región la suma a "pending" (ámbar) antes de abrir el drawer. */
export const RegionSelected: Story = {
  play: secuencia(pulsar(/^Scalp$/i), esperar(/add condition/i)),
}

/* El flujo completo: región -> Add Condition -> elegir condition -> descriptores -> Save. Queda como finding Active,
   verde en el gráfico. */
export const ConditionCharted: Story = {
  play: secuencia(
    pulsar(/^Right Eye$/i),
    pulsar(/^Add Condition$/i),
    pulsar(/^Blister/i),
    pulsar(/select descriptors/i),
    pulsar(/^Painful$/i),
    pulsar(/^Save$/i),
    esperar(/Blister charted on Right Eye/i),
  ),
}

export const Parts: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="onCondicion" nota="La única diferencia con un examen por diente: ExamLayout recibe onCondicion y, al tocar Add Condition, abre RegionConditionDrawer en vez de NewProcedureDrawer. Add Procedure no cambia.">
        <div />
      </Bloque>
    </Lienzo>
  ),
}
