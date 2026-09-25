import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Fila } from './Login'

const meta = { title: 'Pages/Parts/Login row', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* Fila de los widgets del login: entra con un fundido escalonado por \`delay\`. */
export const WidgetRow: Story = {
  render: () => (
    <div className="flex w-[320px] flex-col gap-2">
      <Fila avatar={<span className="bg-dash-blue flex size-7 items-center justify-center rounded-full text-[10px] font-semibold text-white">SS</span>} titulo="Sarah Stone" subtitulo="10:00 AM · Cleaning" delay={0} />
      <Fila avatar={<span className="bg-dash-blue flex size-7 items-center justify-center rounded-full text-[10px] font-semibold text-white">JL</span>} titulo="John Lorem" subtitulo="11:30 AM · Filling" delay={120}><span className="text-[11px] text-ink-muted">Booked</span></Fila>
    </div>
  ),
}
`})))()}export{n,i as r,r as t};