import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { conPacientes } from '@/design-system/decorators'
import { ClinicalTopBar } from './ClinicalTopBar'

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
`})))()}n();export{t as default};