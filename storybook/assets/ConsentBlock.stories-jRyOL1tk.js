import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConsentBlock } from './ConsentBlock'
import { esperar, pulsar, secuencia } from '@/design-system/play'

const meta = {
  title: 'Components/Clinical/ConsentBlock',
  component: ConsentBlock,
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 720 } } },
} satisfies Meta<typeof ConsentBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* Con las dos firmas juntadas el consentimiento pasa a "Signed" y desaparece
   la acción de firmar. */
export const AllSigned: Story = {
  play: secuencia(
    pulsar(/consent actions/i), pulsar(/sign as patient/i),
    pulsar(/consent actions/i), pulsar(/sign as provider/i),
    esperar(/all signatures collected/i),
  ),
}
`})))()}export{n,i as r,r as t};