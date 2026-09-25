import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { ViewFiltersPanel } from './ViewFiltersPanel'
import { pulsar } from '@/design-system/play'

const meta = {
  title: 'Components/Scheduling/ViewFiltersPanel',
  component: ViewFiltersPanel,
  args: { onClose: () => {} },
  decorators: [(Story) => <div className="relative h-[560px] w-[460px]"><Story /></div>],
} satisfies Meta<typeof ViewFiltersPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* Otra opción elegida: la fila toma fondo lila y el radio se llena. */
export const OtherOptionSelected: Story = {
  play: pulsar(/check in/i),
}
`})))()}export{n,i as r,r as t};