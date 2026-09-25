import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Fila, LOCATIONS } from './LocationSelector'

const meta = { title: 'Components/Layout/LocationSelector parts', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* Fila de la lista de sedes: la elegida lleva barra azul, y la estrella marca favorita. */
export const LocationRows: Story = {
  render: () => (
    <div className="flex w-[300px] flex-col gap-1">
      <Fila loc={LOCATIONS[0]} actual favorita onElegir={() => {}} onFavorita={() => {}} />
      <Fila loc={LOCATIONS[2]} actual={false} favorita={false} onElegir={() => {}} onFavorita={() => {}} />
      <Fila loc={LOCATIONS[3]} actual={false} favorita onElegir={() => {}} onFavorita={() => {}} />
    </div>
  ),
}
`})))()}export{n,i as r,r as t};