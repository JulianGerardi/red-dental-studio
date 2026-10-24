import type { Meta, StoryObj } from '@storybook/react-vite'
import { userEvent, within } from 'storybook/test'
import { Stethoscope } from 'lucide-react'
import { EmptyState } from '@/components/ui/empty-state'
import { Bloque, Lienzo, Tabla } from '@/design-system/kit'
import { esperar } from '@/design-system/play'
import { ExamFindingsProvider, ExamLayout } from './ExamLayout'

const meta = {
  title: 'Components/Clinical/ExamLayout',
  component: ExamLayout,
  parameters: {
    layout: 'padded',
    docs: {
      story: { inline: false, iframeHeight: 620 },
      description: { component: 'Lo que comparten todos los exámenes de Clinical Mode: el panel de **Findings** a la izquierda (menos en Vitals) y arriba del contenido **Add Procedure**, **Add Condition** y **View Problem List**, blancas y con el texto que se abre al pasar el mouse. Add Procedure y Add Condition abren el drawer de New Procedure; View Problem List, la tabla flotante, ancha como para que entren todas las columnas y con scroll adentro si una fila abierta la hace más alta que la pantalla. El menú de cada finding empieza con **View full record**: el mismo drawer de la Problem List (procedimientos, caso, derivaciones, órdenes y examen de origen) sin salir del examen; un link a otro registro cambia el drawer a ese y uno a otra pestaña lleva ahí. **Probalo:** pasá el mouse por las acciones y abrí el menú de un finding: View full record o Edit.' },
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

/* View Problem List abierto: la tabla entera, con Status y Actions a la vista. */
export const ProblemListOpen: Story = {
  name: 'Problem list open',
  parameters: { docs: { story: { inline: false, iframeHeight: 720 } } },
  render: () => <ExamLayout findings={false}>{contenido}</ExamLayout>,
  play: async (c) => {
    await userEvent.click(await within(c.canvasElement).findByRole('button', { name: 'View Problem List' }))
    await esperar(/Generally unwell/)(c)
  },
}

/* Con una fila desplegada el flotante llega hasta el borde de la pantalla y scrollea adentro. */
export const ProblemListRowOpen: Story = {
  name: 'Problem list · row open',
  parameters: { docs: { story: { inline: false, iframeHeight: 720 } } },
  render: () => <ExamLayout findings={false}>{contenido}</ExamLayout>,
  play: async (c) => {
    await userEvent.click(await within(c.canvasElement).findByRole('button', { name: 'View Problem List' }))
    await userEvent.click(await within(document.body).findByText(/Generally unwell/))
    await esperar(/View full record/)(c)
  },
}

/* View full record desde el menú de un finding: el drawer de la Problem List. Tooth 3 es la fila Chronic enamel dental
   caries de la tabla, con su procedimiento y su caso. */
export const FindingRecordOpen: Story = {
  name: 'Finding record open',
  parameters: { docs: { story: { inline: false, iframeHeight: 720 } } },
  render: () => <ExamFindingsProvider><ExamLayout examen="Dental Assessment">{contenido}</ExamLayout></ExamFindingsProvider>,
  play: async (c) => {
    await userEvent.click(await within(c.canvasElement).findByRole('button', { name: 'Actions for Tooth 3' }))
    await userEvent.click(await within(document.body).findByRole('menuitem', { name: 'View full record' }))
    await esperar(/Source exam/)(c)
  },
}

/* Medidas del flotante de View Problem List. */
export const Specs: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Finding record">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Where</td><td>Primer ítem del menú de cada finding (Components / Clinical / Dental / FindingActionsMenu).</td></tr>
          <tr><td className="font-semibold">What opens</td><td>El drawer lg de View full record de la Problem List (Components / Clinical / RecordDetail): los datos del finding (con Descriptors) y Procedures, Treatment, Referrals, Lab orders y Source exam.</td></tr>
          <tr><td className="font-semibold">Links</td><td>Un hallazgo o procedimiento vinculado cambia el drawer a ese registro; un caso, una orden, una derivación o un examen llevan a su pestaña y el drawer se cierra.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Problem list overlay">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Width</td><td>Hasta 1240px, o el ancho de la pantalla menos 32px. Desde 1024px la tabla entra entera (Status y Actions incluidos); más angosto, la tabla scrollea de costado adentro de su caja.</td></tr>
          <tr><td className="font-semibold">Height</td><td>Hasta el borde de abajo de la pantalla (menos 16px); si una fila abierta la hace más alta, scrollea adentro del flotante.</td></tr>
          <tr><td className="font-semibold">Position</td><td>Debajo de View Problem List, alineado a su izquierda; si no entra, se corre hacia la izquierda dejando 16px de margen.</td></tr>
          <tr><td className="font-semibold">Shadow</td><td>0 16px 40px negro al 18%, radio 8px (el de la card de la tabla).</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
