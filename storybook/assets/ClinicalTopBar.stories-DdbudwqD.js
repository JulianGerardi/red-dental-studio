import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
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
`})))()}export{n,i as r,r as t};