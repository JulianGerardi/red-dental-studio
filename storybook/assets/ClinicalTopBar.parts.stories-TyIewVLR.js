import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { CONTADORES } from '@/data/clinical-mode'
import { Flotante, ListaContador } from './ClinicalTopBar'

const meta = {
  title: 'Components/Clinical/ClinicalTopBar parts',
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 360 } } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* El popover flotante que abren los contadores de la barra. */
export const FloatingPopover: Story = {
  render: () => (
    <Flotante titulo="Medications" ancla={new DOMRect(80, 20, 60, 32)} onClose={() => {}}>
      <ListaContador c={CONTADORES[1]} />
    </Flotante>
  ),
}

/* La lista del contador: con elementos y vacía. */
export const CounterListFilled: Story = { render: () => <div className="w-[220px] p-4"><ListaContador c={CONTADORES[1]} /></div> }
export const CounterListEmpty: Story = { render: () => <div className="w-[220px] p-4"><ListaContador c={CONTADORES[0]} /></div> }
`})))()}export{n,i as r,r as t};