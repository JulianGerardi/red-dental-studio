import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { LabOrderPanel } from './LabOrderPanel'
import { escribir, esperar, secuencia } from '@/design-system/play'

const meta = {
  title: 'Components/Clinical/LabOrderPanel',
  component: LabOrderPanel,
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 720 } } },
} satisfies Meta<typeof LabOrderPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* Búsqueda sin resultados: estado vacío "No lab orders found". */
export const NoResults: Story = { play: secuencia(escribir(/search/i, 'zzzz'), esperar(/no .* found|nothing matches/i)) }
`})))()}export{n,i as r,r as t};