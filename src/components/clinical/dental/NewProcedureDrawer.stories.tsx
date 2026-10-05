import type { Meta, StoryObj } from '@storybook/react-vite'
import { NewProcedureDrawer } from './NewProcedureDrawer'
import { esperar, pulsar, secuencia } from '@/design-system/play'
import type { Finding } from './data'

const HALLAZGOS: Finding[] = [
  { id: 'F-1', area: 'Tooth 3', condition: 'chronic enamel dental caries', descriptor: 'Deep', date: 'May 14, 2026', status: 'Active', tooth: 3, provider: 'Elena Martinez', surfaces: ['O', 'DB'], notes: '', linked: [], diagnoses: [] },
  { id: 'F-3', area: 'Tooth 20', condition: 'localized periodontal pocketing', descriptor: 'Moderate', date: 'May 14, 2026', status: 'Active', tooth: 20, provider: 'Elena Martinez', surfaces: ['B', 'MB'], notes: '', linked: [], diagnoses: [] },
  { id: 'F-5', area: 'Soft Palate', condition: 'oral candidiasis', descriptor: 'Red', date: 'May 14, 2026', status: 'Active', tooth: null, provider: 'Sarah Stone', surfaces: [], notes: '', linked: [], diagnoses: [] },
]

const meta = {
  title: 'Components/Clinical/Dental/NewProcedureDrawer',
  component: NewProcedureDrawer,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 720 } } },
  args: { open: true, mode: 'procedure', area: 'Tooth 21', teeth: [20, 21, 22], findings: HALLAZGOS, onClose: () => {}, onSave: () => {} },
  argTypes: { mode: { control: 'inline-radio', options: ['procedure', 'condition'], description: 'Add Procedure arranca en Planned; Add Condition, en Existing.' } },
} satisfies Meta<typeof NewProcedureDrawer>

export default meta
type Story = StoryObj<typeof meta>

/* Paso 1, Procedure: búsqueda con las pestañas Existing y Planned. "Next Step" se habilita al elegir uno. */
export const Default: Story = {}

/* Desde Add Condition: arranca en Existing, lo que el paciente ya tiene hecho. */
export const FromAddCondition: Story = { args: { mode: 'condition' } }

/* Paso 2, Surfaces: sólo con un procedimiento de diente + superficie cargado en superficie. Sin superficies marcadas
   "Next Step" y "Apply to unset" quedan deshabilitados. */
export const SurfacesStep: Story = {
  play: secuencia(pulsar(/^D2140 on surface$/i), pulsar(/next step/i), esperar(/apply to unset/i)),
}

/* Link to finding: cada hallazgo con su nombre y, si tiene, sus superficies. Un procedimiento sin superficie llega
   directo desde Procedure: el drawer tiene dos pasos. */
export const LinkToFindingStep: Story = {
  play: secuencia(pulsar(/^D0120\s*-/), pulsar(/^D0120 on tooth$/i), pulsar(/next step/i), esperar(/localized periodontal pocketing/i)),
}
