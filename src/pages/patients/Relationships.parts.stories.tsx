import type { Meta, StoryObj } from '@storybook/react-vite'
import { DeleteRelationshipDialog, RemoveGuardianDialog } from '@/components/patients/RelationshipDialogs'
import { Forzar } from '@/design-system/kit'
import { HOUSEHOLD, MenuAcciones, PersonaCard, RELACIONES } from './Relationships'

/* Las partes de Relationships & Billing: la card, su menú y los pop ups de borrar y de quitar el acceso de guardián
   (CON-3999; modulos/relationships.md, 2026-11-03). */
const meta = { title: 'Pages/Parts/Relationships', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const salir = () => {}
const emergente = { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 420 } } } as const

export const RelationCard: Story = { render: () => <div className="w-[640px]"><PersonaCard p={RELACIONES[0]} onEdit={salir} onDelete={salir} /></div> }
export const HouseholdCard: Story = { render: () => <div className="w-[640px]"><PersonaCard p={HOUSEHOLD[0]} /></div> }
export const RowMenu: Story = { render: () => <div className="h-40"><MenuAcciones nombre="Jessica Miller" onEdit={salir} onDelete={salir} /></div> }
export const RowMenuOpen: Story = {
  name: 'Row menu — open',
  render: () => <Forzar selector="button" estado="click" className="h-40"><MenuAcciones nombre="Jessica Miller" onEdit={salir} onDelete={salir} /></Forzar>,
}
export const DeleteDialog: Story = {
  name: 'Delete relationship',
  parameters: emergente,
  render: () => <DeleteRelationshipDialog onConfirm={salir} onCancel={salir} />,
}
export const RemoveGuardian: Story = {
  name: 'Remove Guardian access',
  parameters: emergente,
  render: () => <RemoveGuardianDialog persona="Michael Miller" paciente="John Smith" ultimaDeGuardian onConfirm={salir} onCancel={salir} />,
}
