import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bold, List } from 'lucide-react'
import { PROGRESO_INICIAL, WORKFLOWS, type Narrativa, type ProgresoWorkflow } from '@/data/workflows'
import { BotonFormato, NarrativeEditor } from './NarrativeEditor'
import { esperar } from '@/design-system/play'

const [CC, TR] = WORKFLOWS

function Editor({ wf, inicial }: { wf: typeof CC; inicial?: ProgresoWorkflow }) {
  const [p, setP] = useState(inicial)
  const guardar = (n: Omit<Narrativa, 'fecha'>) => setP((x) => ({ ...(x ?? { respuestas: {}, guardados: [] }), narrativa: { ...n, fecha: 'Oct 05, 9:20 AM' } }))
  return <NarrativeEditor wf={wf} progreso={p} open onClose={() => {}} onGuardar={guardar} />
}

const meta = {
  title: 'Components/Clinical/NarrativeEditor',
  component: NarrativeEditor,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 760 } } },
} satisfies Meta<typeof NarrativeEditor>

export default meta
type Story = StoryObj<typeof meta>

const args = { wf: CC, open: true, onClose: () => {}, onGuardar: () => {} }

/* Se abre generando (skeleton de loading) y deja el "Original Clinical Draft" con lo contestado en Chief Complaint.
   Apply Changes queda disabled hasta editar. */
export const Draft: Story = { args, render: () => <Editor wf={CC} inicial={PROGRESO_INICIAL['chief-complaint']} />, play: esperar(/original clinical draft/i) }

/* Sin pasos guardados: el editor queda vacío (empty) y avisa que no hay respuestas para resumir, como red.dev. */
export const NoAnswers: Story = { args, render: () => <Editor wf={TR} />, play: esperar(/no answered questions to summarize/i) }

/* Ya editada: abre la versión aplicada; Regenerate pide confirmación antes de pisarla. */
export const Edited: Story = {
  args,
  render: () => <Editor wf={CC} inicial={{ ...PROGRESO_INICIAL['chief-complaint'], narrativa: { html: '<h2>Chief Complaint</h2><p>Patient reports sharp pain on the lower right with cold drinks, for a few days.</p>', origen: 'edited', fecha: 'Oct 05, 9:20 AM' } }} />,
  play: esperar(/edited narrative/i),
}

/* Los botones de la barra de formato, habilitados y disabled (mientras genera). */
export const FormatButtons: Story = {
  args,
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex items-center gap-1">
      <BotonFormato etiqueta="Bold" icono={Bold} onClick={() => {}} />
      <BotonFormato etiqueta="Title" onClick={() => {}} />
      <BotonFormato etiqueta="List" icono={List} onClick={() => {}} disabled />
    </div>
  ),
}
