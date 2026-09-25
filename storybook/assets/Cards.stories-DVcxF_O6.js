import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Page } from './Page'
import { PaginaDeRecetas, recetas, type Receta } from './Recipes'

const meta = {
  title: 'Patterns/Cards',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', options: { showPanel: false } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const familia = (r: Receta) => {
  const c = r.clases
  if (/shadow-(lg|xl|2xl)|shadow-\\[0_(8|12|14|16|20)/.test(c)) return 'Floating surface (popover, dialog, menu)'
  if (/shadow/.test(c)) return 'Elevated card'
  if (/rounded-xl/.test(c)) return 'Card, rounded-xl'
  if (/rounded-lg/.test(c)) return 'Card, rounded-lg'
  return 'Card, rounded-md'
}

export const Tarjetas: Story = {
  name: 'Cards',
  render: () => {
    const tarjetas = recetas.filter((r) => r.tipo === 'card')
    const usos = tarjetas.reduce((n, r) => n + r.cantidad, 0)
    return (
      <Page
        titulo="Cards and surfaces"
        bajada={\`Los \${usos} contenedores blancos con borde de la app (bg-white + border + radio): \${tarjetas.length} recetas. Los componentes con nombre -Card, SectionCard, StatCard, PatientCard, OperatoryCard, PendingTaskCard y otros- están en Components; acá está lo que el código arma a mano. Las tarjetas de una misma familia deberían verse igual: los cuadros de consistencia marcan lo que no.\`}
      >
        <PaginaDeRecetas
          tipo="card"
          familiaDe={familia}
          orden={['Card, rounded-xl', 'Card, rounded-lg', 'Card, rounded-md', 'Elevated card', 'Floating surface (popover, dialog, menu)']}
          estados={false}
        />
      </Page>
    )
  },
}
`})))()}export{n,i as r,r as t};