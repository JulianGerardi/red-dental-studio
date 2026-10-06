import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bloque, Lienzo, Tabla } from '@/design-system/kit'
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
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 760 },
      description: {
        component: [
          "El **AI Narrative Editor** de Treatment (Clinical Mode): arma la narrativa clínica con lo contestado y guardado en un workflow, como red.dev. Se abre con *Generate Narrative* (o *Edit Narrative* si ya hay una) y es un drawer xl.",
          "",
          "**Flujo:** al abrir genera el borrador (skeleton mientras tanto) y lo guarda solo como *Original Clinical Draft*. Se edita con la barra de formato; *Apply Changes* se habilita recién al editar. Descartar o regenerar encima de cambios pide confirmación.",
          "",
          "**Probalo:** en *Playground* editá el texto y aplicá los cambios.",
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof NarrativeEditor>

export default meta
type Story = StoryObj<typeof meta>

const args = { wf: CC, open: true, onClose: () => {}, onGuardar: () => {} }

/* El editor vivo con Chief Complaint contestado. */
export const Playground: Story = { args, render: () => <Editor wf={CC} inicial={PROGRESO_INICIAL['chief-complaint']} /> }

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

/* Las partes del editor. */
export const Parts: Story = {
  args,
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts">
        <Tabla encabezado={["Part", "What it does"]} minimo={560}>
          <tr><td className="font-semibold">Status</td><td>Original Clinical Draft (generado y guardado solo) o Edited narrative (aplicada), con la fecha.</td></tr>
          <tr><td className="font-semibold">Format bar</td><td>Bold, Title, Subtitle, Text y List. Deshabilitada mientras genera.</td></tr>
          <tr><td className="font-semibold">Editor</td><td>El texto con títulos por paso guardado y la lista de preguntas y respuestas.</td></tr>
          <tr><td className="font-semibold">Footer</td><td>Discard o Regenerate a la izquierda; Apply Changes a la derecha.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

/* Los estados del editor; cada uno tiene su story. */
export const States: Story = {
  args,
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="States">
        <Tabla encabezado={["State", "When", "Story"]} minimo={560}>
          <tr><td className="font-semibold">Loading</td><td>Generando el borrador: skeleton y barra deshabilitada.</td><td>Draft (al abrir)</td></tr>
          <tr><td className="font-semibold">Draft</td><td>Borrador generado; Apply Changes disabled hasta editar.</td><td>Draft</td></tr>
          <tr><td className="font-semibold">Edited</td><td>Hay cambios sin aplicar: Apply Changes habilitado; descartar o regenerar pide confirmación.</td><td>—</td></tr>
          <tr><td className="font-semibold">Applied</td><td>La narrativa editada quedó guardada en el workflow.</td><td>Edited</td></tr>
          <tr><td className="font-semibold">Empty</td><td>No hay pasos guardados: aviso de error y nada que resumir.</td><td>No Answers</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

/* Medidas y reglas. */
export const Specs: Story = {
  args,
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Specs" nota="Lo común a todos los drawers está en Components / UI / Drawer.">
        <Tabla encabezado={["Item", "Value"]} minimo={560}>
          <tr><td className="font-semibold">Size</td><td>xl · 760px</td></tr>
          <tr><td className="font-semibold">Generation</td><td>900ms de skeleton; el borrador se arma con borradorNarrativa de data/workflows.ts.</td></tr>
          <tr><td className="font-semibold">Saved</td><td>En el workflow: la tarjeta de resumen de Treatment muestra el texto y Edit Narrative lo reabre.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
