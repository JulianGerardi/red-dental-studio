import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { BotonFiltro } from './Dashboard'

const meta = { title: 'Pages/Parts/Dashboard', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function Demo({ inicial }: { inicial: string[] }) {
  const [v, setV] = useState(inicial)
  return <div className="h-64"><BotonFiltro label="Provider" options={['Dr. Elena Martinez', 'Dr. Emily Chen']} value={v} onChange={setV} /></div>
}

/* El botón de filtro de un panel: sin filtro y con uno elegido. */
export const PanelFilterButton: Story = { render: () => <Demo inicial={[]} /> }
export const PanelFilterActive: Story = { render: () => <Demo inicial={['Dr. Emily Chen']} /> }
`})))()}export{n,i as r,r as t};