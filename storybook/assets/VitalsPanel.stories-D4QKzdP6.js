import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { VitalsPanel } from './VitalsPanel'
import { escribir } from '@/design-system/play'

const meta = {
  title: 'Components/Clinical/VitalsPanel',
  component: VitalsPanel,
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 720 } } },
} satisfies Meta<typeof VitalsPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* "Save" queda deshabilitado hasta que se escribe una nota. */
export const SaveDisabledUntilNote: Story = {}

/* Con una nota escrita, Save se habilita. */
export const WithNote: Story = { play: escribir(/note/i, 'Patient reports mild dizziness.') }
`})))()}export{n,i as r,r as t};