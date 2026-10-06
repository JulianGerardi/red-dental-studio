import type { Meta, StoryObj } from '@storybook/react-vite'
import { conPacientes } from '@/design-system/decorators'
import { ClinicalTopBar } from './ClinicalTopBar'
import { esperar, pulsar, secuencia } from '@/design-system/play'

const meta = {
  title: 'Components/Clinical/ClinicalTopBar',
  component: ClinicalTopBar,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  decorators: [conPacientes],
  args: { volverA: '/patients/patient-0001', encuentro: false, onEncuentro: () => {}, onOverview: () => {}, enOverview: false },
} satisfies Meta<typeof ClinicalTopBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const EncounterStarted: Story = { args: { encuentro: true } }

/* Contador abierto: la lista de lo que tiene el paciente en un popover. */
export const CounterOpen: Story = { play: secuencia(pulsar(/^medications/i), esperar(/ibuprofeno/i)) }

/* Contador sin elementos: el popover dice que no hay nada cargado. */
export const EmptyCounterOpen: Story = { play: secuencia(pulsar(/^referrals/i), esperar(/no referrals/i)) }

/* TR sin completar: el desplegable dice que el paciente no contestó Triage y lleva a Treatment. */
export const TriagePending: Story = { play: secuencia(pulsar(/^triage: not completed/i), esperar(/has not answered the triage/i)) }

/* CC completo: las respuestas de Chief Complaint. */
export const ChiefComplaintCompleted: Story = { play: secuencia(pulsar(/^chief complaint: completed/i), esperar(/reason for visit/i)) }
