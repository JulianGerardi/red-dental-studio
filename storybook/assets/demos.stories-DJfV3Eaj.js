import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import * as demos from './demos'

/* Las mini-demos animadas que acompañan cada tema de Help. Se listan todas las
   exportadas: si se agrega una, aparece sola. */
const meta = {
  title: 'Components/Help/Demos',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const All: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(demos)
        .filter(([nombre]) => nombre.endsWith('Demo'))
        .map(([nombre, Demo]) => {
          const Componente = Demo as () => React.ReactElement
          return (
            <figure key={nombre} className="flex flex-col gap-2">
              <div className="w-[260px] overflow-hidden rounded-xl border border-line"><Componente /></div>
              <figcaption className="text-[12px] text-ink-muted">{nombre}</figcaption>
            </figure>
          )
        })}
    </div>
  ),
}

/* Pestaña elegida en la demo de pestañas del paciente. */
export const PatientTabsSelected: Story = {
  render: () => <div className="w-[300px] overflow-hidden rounded-xl border border-line"><demos.PatientTabsDemo activa="Ledger" /></div>,
}
`})))()}export{n,i as r,r as t};