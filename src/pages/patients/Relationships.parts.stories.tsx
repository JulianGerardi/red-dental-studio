import type { Meta, StoryObj } from '@storybook/react-vite'
import { HOUSEHOLD, MenuAcciones, PersonaCard, RELACIONES } from './Relationships'

const meta = { title: 'Pages/Parts/Relationships', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const RelationCard: Story = { render: () => <div className="w-[640px]"><PersonaCard p={RELACIONES[0]} onEdit={() => {}} onDelete={() => {}} /></div> }
export const HouseholdCard: Story = { render: () => <div className="w-[640px]"><PersonaCard p={HOUSEHOLD[0]} /></div> }
export const RowMenu: Story = { render: () => <div className="h-40"><MenuAcciones nombre="Jessica Miller" onEdit={() => {}} onDelete={() => {}} /></div> }
