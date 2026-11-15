import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { RegionDiagram, type Forma } from './RegionDiagram'

/* El gráfico genérico de regiones: una imagen y las formas clickeables en sus coordenadas. Lo usan ExtraOralDiagram e
   IntraOralDiagram. Ver design-reference/figma/modulos/clinical-mode.md (2026-10-24). */

type Zona = 'Left' | 'Center' | 'Right'
const FORMAS: Forma<Zona>[] = [
  { region: 'Left', d: 'M20 20H200V180H20Z' },
  { region: 'Center', d: 'M220 20H400V180H220Z' },
  { region: 'Right', d: 'M420 20H600V180H420Z' },
]
/* Una imagen de ejemplo, del tamaño de las coordenadas de las formas. */
const IMAGEN = `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="620" height="200"><rect width="620" height="200" fill="#f4f4f5"/><g fill="#e4e4e7"><rect x="20" y="20" width="180" height="160" rx="12"/><rect x="220" y="20" width="180" height="160" rx="12"/><rect x="420" y="20" width="180" height="160" rx="12"/></g></svg>')}`

type Args = { pending: Zona[]; active: Zona[] }

const meta = {
  title: 'Components/Clinical/Dental/RegionDiagram',
  parameters: {
    layout: 'padded',
    docs: {
      jira: ['CON-881', 'CON-882'],
      description: {
        component: 'La pieza que arma un gráfico de regiones: recibe la imagen, su tamaño original y las **formas** (un `path` por región, en las coordenadas de la imagen) y las dibuja clickeables encima. Cada región es un botón con su nombre: se llega con teclado y el lector la anuncia. *Pending* va en ámbar y *active* en verde. Extraoral (CON-881) e Intraoral (CON-882) sólo le pasan su imagen y sus formas.\n\n**Probalo:** tocá las zonas en *Playground* o marcalas desde *Controls*. El ejemplo usa una imagen de prueba con tres zonas.',
      },
    },
  },
  args: { pending: [], active: [] },
  argTypes: {
    pending: { control: 'check', options: ['Left', 'Center', 'Right'], description: 'Elegidas (ámbar).' },
    active: { control: 'check', options: ['Left', 'Center', 'Right'], description: 'Con un finding (verde).' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

function Demo({ pending, active }: Args) {
  const [p, setP] = useState(pending)
  return (
    <RegionDiagram<Zona>
      titulo="Sample diagram" imagen={IMAGEN} ancho={620} alto={200} viewBox="0 0 620 200" className="max-w-[620px]"
      formas={FORMAS} pending={p} active={active} onToggle={(r) => setP((x) => (x.includes(r) ? x.filter((y) => y !== r) : [...x, r]))}
    />
  )
}

export const Playground: Story = { render: (args) => <Demo key={JSON.stringify(args)} {...args} /> }
/* Una zona elegida (selected) y otra con finding. */
export const PendingAndActive: Story = { parameters: { controls: { disable: true } }, render: () => <Demo pending={['Center']} active={['Left']} /> }
