import type { Meta, StoryObj } from '@storybook/react-vite'
import { TreatmentPanel } from './TreatmentPanel'
import { WorkflowsProvider } from './WorkflowsContext'
import { escribir, esperar, pulsar, secuencia } from '@/design-system/play'

const meta = {
  title: 'Components/Clinical/TreatmentPanel',
  component: TreatmentPanel,
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 900 } } },
  decorators: [(Story) => <WorkflowsProvider><Story /></WorkflowsProvider>],
} satisfies Meta<typeof TreatmentPanel>

export default meta
type Story = StoryObj<typeof meta>

/* Abre en el primer workflow sin completar (Triage), con su paso abierto. Save Step queda disabled hasta contestar lo obligatorio. */
export const Default: Story = {}

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
