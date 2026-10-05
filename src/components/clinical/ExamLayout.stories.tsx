import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stethoscope } from 'lucide-react'
import { EmptyState } from '@/components/ui/empty-state'
import { ExamFindingsProvider, ExamLayout } from './ExamLayout'

const meta = {
  title: 'Components/Clinical/ExamLayout',
  component: ExamLayout,
  parameters: {
    layout: 'padded',
    docs: {
      story: { inline: false, iframeHeight: 620 },
      description: { component: 'Lo que comparten todos los exámenes de Clinical Mode: el panel de **Findings** a la izquierda (menos en Vitals) y arriba del contenido **Add Procedure**, **Add Condition** y **View Problem List**, blancas y con el texto que se abre al pasar el mouse. Add Procedure y Add Condition abren el drawer de New Procedure; View Problem List, la tabla flotante. **Probalo:** pasá el mouse por las acciones y editá un finding desde su menú.' },
    },
  },
  args: { findings: true, children: null },
  argTypes: { findings: { control: 'boolean', description: 'El panel de Findings. Vitals no lo lleva.' } },
} satisfies Meta<typeof ExamLayout>

export default meta
type Story = StoryObj<typeof meta>

const contenido = (
  <div className="rounded-xl border border-line bg-white">
    <EmptyState icon={Stethoscope} title="Physical" detail="The exam content goes here." pill="Planned" className="py-16" />
  </div>
)

/* Un examen con el panel de Findings y las acciones. */
export const Playground: Story = { render: (a) => <ExamFindingsProvider><ExamLayout findings={a.findings}>{contenido}</ExamLayout></ExamFindingsProvider> }

/* Como Vitals: sólo las acciones, sin Findings. */
export const WithoutFindings: Story = { render: () => <ExamLayout findings={false}>{contenido}</ExamLayout> }
