import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Page } from './Page'
import { PaginaDeRecetas, recetas, type Receta } from './Recipes'

const meta = {
  title: 'Patterns/Pills and badges',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', options: { showPanel: false } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const familia = (r: Receta) => {
  const f = r.clases
  if (/dash-ok/.test(f)) return 'Success'
  if (/dash-bad|field-error/.test(f)) return 'Danger'
  if (/dash-busy|dash-blue|info-bg/.test(f)) return 'Info'
  if (/warn|attn/.test(f)) return 'Warning'
  if (/purple/.test(f)) return 'Purple'
  return 'Neutral or state-driven'
}

export const Pastillas: Story = {
  name: 'Pills and badges',
  render: () => {
    const pastillas = recetas.filter((r) => r.tipo === 'pill')
    return (
      <Page
        titulo="Pills and badges"
        bajada={\`Las pastillas de estado que el código escribe a mano (\${pastillas.length} looks). La pastilla del sistema es Components / UI / Pill, con seis tonos; acá aparecen las que no la usan y su color se decide por estado.\`}
      >
        <PaginaDeRecetas tipo="pill" familiaDe={familia} orden={['Success', 'Danger', 'Info', 'Warning', 'Purple', 'Neutral or state-driven']} estados={false} />
      </Page>
    )
  },
}
`})))()}export{n,i as r,r as t};