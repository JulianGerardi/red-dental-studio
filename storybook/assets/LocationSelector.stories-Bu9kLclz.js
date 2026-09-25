import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { LocationSelector } from './LocationSelector'

const meta = {
  title: 'Components/Layout/LocationSelector',
  component: LocationSelector,
  decorators: [(Story) => <div className="h-[420px] w-[340px]"><Story /></div>],
} satisfies Meta<typeof LocationSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* Abierto: el borde pasa a azul, aparece el buscador y la ubicación elegida
   queda marcada, con la estrella de favorita. */
export const Open: Story = {
  play: async (c) => {
    const { userEvent, within } = await import('storybook/test')
    await userEvent.click(await within(c.canvasElement).findByRole('button', { expanded: false }))
  },
}
`})))()}export{n,i as r,r as t};