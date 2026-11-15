import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { IntraOralDiagram } from './IntraOralDiagram'
import { INTRAORAL_REGIONS, type IntraOralRegion } from './data'

type Args = { pending: IntraOralRegion[]; active: IntraOralRegion[] }

const meta = {
  title: 'Components/Clinical/Dental/IntraOralDiagram',
  parameters: {
    layout: 'padded',
    docs: {
      jira: ['CON-882'],
      description: {
        component: 'El gráfico de Intraoral (CON-882): la boca abierta del Figma con las regiones clickeables encima. Una región **pending** (elegida, todavía sin condition) va en ámbar; una **active** (ya tiene un finding) va en verde. Usa [RegionDiagram](/docs/components-clinical-dental-regiondiagram--docs).\n\n**Probalo:** tocá las regiones en *Playground*, o marcá cuáles están pending y active desde *Controls*.',
      },
    },
  },
  args: { pending: [], active: [] },
  argTypes: {
    pending: { control: 'check', options: INTRAORAL_REGIONS, description: 'Elegidas para cargar una condition (ámbar).' },
    active: { control: 'check', options: INTRAORAL_REGIONS, description: 'Con un finding cargado (verde).' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

function Demo({ pending, active }: Args) {
  const [p, setP] = useState(pending)
  return <IntraOralDiagram pending={p} active={active} onToggle={(r) => setP((x) => (x.includes(r) ? x.filter((y) => y !== r) : [...x, r]))} />
}

export const Playground: Story = { render: (args) => <Demo key={JSON.stringify(args)} {...args} /> }
/* Sin nada marcado (estado vacío del gráfico). */
export const Empty: Story = { parameters: { controls: { disable: true } }, render: () => <Demo pending={[]} active={[]} /> }
/* Una región elegida (selected) y otra con finding. */
export const PendingAndActive: Story = { parameters: { controls: { disable: true } }, render: () => <Demo pending={['Soft Palate']} active={['Right Hard Palate']} /> }
