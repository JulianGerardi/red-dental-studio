import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from './label'

const meta = {
  title: 'Components/UI/Label',
  component: Label,
  args: { children: 'First name' },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* Deshabilitado: la etiqueta se atenúa cuando el campo que la acompaña
   (con la clase \`peer\`, antes de ella) está deshabilitado. */
export const WithDisabledField: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <input id="lbl-off" disabled defaultValue="Read only" className="peer h-9 w-56 rounded-md border border-input px-3 text-sm disabled:opacity-50" />
      <Label htmlFor="lbl-off">First name</Label>
    </div>
  ),
}
`})))()}export{r as n,n as r,i as t};