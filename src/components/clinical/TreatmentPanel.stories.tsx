import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bloque, Lienzo, Tabla } from '@/design-system/kit'
import { TreatmentPanel } from './TreatmentPanel'
import { WorkflowsProvider } from './WorkflowsContext'
import { escribir, esperar, pulsar, secuencia } from '@/design-system/play'

const meta = {
  title: 'Components/Clinical/TreatmentPanel',
  component: TreatmentPanel,
  parameters: {
    layout: 'padded',
    docs: {
      story: { inline: false, iframeHeight: 900 },
      description: {
        component: [
          "La pestaña **Treatment** de Clinical Mode (Figma 4540:26288, lógica de red.dev). A la izquierda el workflow elegido con sus pasos y preguntas; a la derecha la lista de Workflows (con el filtro del design system), Progress y la card Treatment plans.",
          "",
          "**CC y TR:** completar Chief Complaint o Triage pone en verde CC o TR en el encabezado de Clinical Mode.",
          "",
          "**Probalo:** en *Playground* contestá las preguntas de Triage y tocá Save Step; elegí otro workflow de la lista o generá la narrativa.",
        ].join('\n'),
      },
    },
  },
  decorators: [(Story) => <WorkflowsProvider><Story /></WorkflowsProvider>],
} satisfies Meta<typeof TreatmentPanel>

export default meta
type Story = StoryObj<typeof meta>

/* Abre en el primer workflow sin completar (Triage), con su paso abierto. Save Step queda disabled hasta contestar lo obligatorio. */
export const Playground: Story = {}

/* Workflow completo y seleccionado: Chief Complaint, con todos los pasos guardados y el tilde en la tarjeta. */
export const CompletedWorkflow: Story = { play: secuencia(pulsar(/^chief complaint/i), esperar(/2\/2 steps completed/i)) }

/* Contestar Triage y guardar: el workflow queda completo (en Clinical Mode, TR pasa a verde). */
export const CompleteTriage: Story = {
  play: async (c) => {
    for (const grupo of c.canvasElement.querySelectorAll('[role="group"]')) {
      const no = [...grupo.querySelectorAll('button')].find((b) => b.textContent === 'No')
      no?.click()
    }
    await secuencia(pulsar(/^save step$/i), esperar(/1\/1 steps completed/i))(c)
  },
}

/* Búsqueda sin coincidencias: estado vacío "No sections found". */
export const NoSections: Story = { play: secuencia(escribir(/search a section/i, 'zzzz'), esperar(/no sections found/i)) }

/* Narrativa: con Chief Complaint completo, Generate Narrative abre el AI Narrative Editor con el borrador. */
export const NarrativeFromAnswers: Story = {
  play: secuencia(pulsar(/^chief complaint/i), pulsar(/^generate narrative$/i), esperar(/original clinical draft/i)),
}

/* Las partes de la pantalla. */
export const Parts: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Workflow (left)">
        <Tabla encabezado={["Part", "What it does"]} minimo={560}>
          <tr><td className="font-semibold">Header</td><td>Nombre del workflow, versión publicada y, si está completo, la fecha.</td></tr>
          <tr><td className="font-semibold">Search</td><td>Busca una sección por nombre.</td></tr>
          <tr><td className="font-semibold">Narrative summary</td><td>La narrativa guardada, con Edit Narrative.</td></tr>
          <tr><td className="font-semibold">Steps</td><td>Cada paso plegable con sus preguntas; Save Step guarda y abre el siguiente; se pueden ocultar pasos.</td></tr>
          <tr><td className="font-semibold">Question</td><td>Opciones como botones; una respuesta puede abrir preguntas que cuelgan de ella.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Right column">
        <Tabla encabezado={["Part", "What it does"]} minimo={560}>
          <tr><td className="font-semibold">Workflows</td><td>Lista con el filtro de Elements / Filter (búsqueda primero, tipos con ícono y cantidad) y los filtros aplicados en chips.</td></tr>
          <tr><td className="font-semibold">Progress</td><td>Pasos guardados del workflow elegido; tocar uno lo abre.</td></tr>
          <tr><td className="font-semibold">Treatment plans</td><td>Components / Clinical / Treatment plans card.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

/* Medidas y reglas. */
export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Specs">
        <Tabla encabezado={["Item", "Value"]} minimo={560}>
          <tr><td className="font-semibold">Right column</td><td>311px desde lg; abajo del workflow en pantallas angostas.</td></tr>
          <tr><td className="font-semibold">Workflows list</td><td>Hasta 300px de alto con scroll.</td></tr>
          <tr><td className="font-semibold">Opens on</td><td>El primer workflow sin completar, con su primer paso sin guardar abierto.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
