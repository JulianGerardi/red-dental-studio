import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { TooltipProvider } from '@/components/ui/tooltip'
import { WORKFLOWS, PROGRESO_INICIAL, type CategoriaWorkflow, type Valor } from '@/data/workflows'
import { FiltrosAplicados, NarrativeSummary, QuestionBlock, WorkflowCard, WorkflowProgress, type Filtros as TipoFiltros } from './TreatmentPanel'

const meta = {
  title: 'Components/Clinical/TreatmentPanel parts',
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 560 } } },
  decorators: [(Story) => <TooltipProvider><Story /></TooltipProvider>],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const [CC, TR, , , , PX] = WORKFLOWS

function Preguntas() {
  const [r, setR] = useState<Record<string, Valor>>({ 'cc-motivo-1': 'Problem / Concern' })
  return (
    <div className="flex max-w-[560px] flex-col gap-2">
      {CC.pasos[0].preguntas.map((p) => <QuestionBlock key={p.id} pregunta={p} respuestas={r} onResponder={(id, v) => setR((x) => ({ ...x, [id]: v }))} />)}
    </div>
  )
}
/* Preguntas del paso: contestada (azul, con la pregunta que cuelga de la opción elegida) y sin contestar (gris). */
export const Questions: Story = { render: () => <Preguntas /> }

/* Tarjetas de la lista: selected (azul), completa (tilde) y sin empezar. */
export const WorkflowCards: Story = {
  render: () => (
    <ul className="flex w-[290px] flex-col gap-2">
      <li><WorkflowCard wf={TR} seleccionado completo={false} onElegir={() => {}} /></li>
      <li><WorkflowCard wf={CC} seleccionado={false} completo onElegir={() => {}} /></li>
      <li><WorkflowCard wf={PX} seleccionado={false} completo={false} onElegir={() => {}} /></li>
    </ul>
  ),
}

/* Progress: sin empezar, a mitad (tres pasos guardados, en verde) y completo. */
export const Progress: Story = {
  render: () => (
    <div className="grid max-w-[960px] gap-4 md:grid-cols-3">
      <WorkflowProgress wf={PX} guardados={[]} />
      <WorkflowProgress wf={PX} guardados={PX.pasos.slice(0, 3).map((p) => p.id)} />
      <WorkflowProgress wf={CC} guardados={PROGRESO_INICIAL['chief-complaint'].guardados} />
    </div>
  ),
}

function Filtros({ inicial }: { inicial: TipoFiltros }) {
  const [f, setF] = useState<{ categorias: CategoriaWorkflow[]; q: string }>(inicial)
  return (
    <div className="w-[290px]">
      <FiltrosAplicados value={f} onChange={setF} />
    </div>
  )
}
/* Los filtros aplicados en Workflows: un chip por filtro para sacarlo, y Clear. El menú es Elements / Filter. */
export const FiltersApplied: Story = { render: () => <Filtros inicial={{ categorias: ['Questionnaire', 'Emergency'], q: 'history' }} /> }

/* La narrativa guardada, resumida arriba de los pasos. */
export const Narrative: Story = {
  render: () => (
    <div className="max-w-[640px]">
      <NarrativeSummary narrativa={{ html: '<h2>Chief Complaint</h2><h3>Reason for Visit</h3><ul><li>Problem / Concern</li><li>Sharp pain on the lower right when drinking something cold.</li></ul>', origen: 'draft', fecha: 'Oct 05, 9:20 AM' }} onAbrir={() => {}} />
    </div>
  ),
}

/* La card Treatment plans del workflow tiene su propia página: Components / Clinical / Treatment plans card. */
