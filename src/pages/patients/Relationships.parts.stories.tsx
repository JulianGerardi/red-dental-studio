import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArchiveRelationshipDialog, ReactivateRelationshipDrawer, RemoveGuardianDialog } from '@/components/patients/RelationshipDialogs'
import { DIRECTORIO } from '@/components/patients/AddRelationshipDrawer'
import { Forzar } from '@/design-system/kit'
import { HOUSEHOLD, MenuAcciones, PersonaCard, RELACIONES } from './Relationships'

/* Las partes de Relationships & Billing: la card, su menú (activa y archivada) y los pop ups de archivar, quitar acceso de
   guardián y reactivar (CON-3958; modulos/relationships.md, 2026-10-22). */
const meta = { title: 'Pages/Parts/Relationships', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const salir = () => {}
const emergente = { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 420 } } } as const

export const RelationCard: Story = { render: () => <div className="w-[640px]"><PersonaCard p={RELACIONES[0]} onEdit={salir} onArchive={salir} /></div> }
/* Archivada: lleva la pill Archived y la fecha, y sólo se puede reactivar. */
export const ArchivedCard: Story = { render: () => <div className="w-[640px]"><PersonaCard p={RELACIONES[2]} onReactivate={salir} /></div> }
export const HouseholdCard: Story = { render: () => <div className="w-[640px]"><PersonaCard p={HOUSEHOLD[0]} /></div> }
export const RowMenu: Story = { render: () => <div className="h-40"><MenuAcciones nombre="Jessica Miller" onEdit={salir} onArchive={salir} /></div> }
export const RowMenuOpen: Story = {
  name: 'Row menu — open',
  render: () => <Forzar selector="button" estado="click" className="h-40"><MenuAcciones nombre="Jessica Miller" onEdit={salir} onArchive={salir} /></Forzar>,
}
export const RowMenuArchived: Story = {
  name: 'Row menu — archived',
  render: () => <Forzar selector="button" estado="click" className="h-32"><MenuAcciones nombre="Michael Miller" archivada onReactivate={salir} /></Forzar>,
}

/* Archivar: con el rol Guardian suma que pierde el acceso, y si era su último vínculo de guardián, que se le da de baja el usuario. */
export const ArchiveDialog: Story = {
  name: 'Archive — guardian',
  parameters: emergente,
  render: () => <ArchiveRelationshipDialog persona="Jessica Miller" paciente="John Smith" esGuardian ultimaDeGuardian={false} onConfirm={salir} onCancel={salir} />,
}
export const ArchiveDialogLastGuardian: Story = {
  name: 'Archive — last guardian relationship',
  parameters: emergente,
  render: () => <ArchiveRelationshipDialog persona="Jessica Miller" paciente="John Smith" esGuardian ultimaDeGuardian onConfirm={salir} onCancel={salir} />,
}
export const ArchiveDialogGuarantorOnly: Story = {
  name: 'Archive — guarantor only',
  parameters: emergente,
  render: () => <ArchiveRelationshipDialog persona="Robert Miller" paciente="John Smith" esGuardian={false} ultimaDeGuardian={false} onConfirm={salir} onCancel={salir} />,
}
export const RemoveGuardian: Story = {
  name: 'Remove Guardian access',
  parameters: emergente,
  render: () => <RemoveGuardianDialog persona="Michael Miller" paciente="John Smith" ultimaDeGuardian onConfirm={salir} onCancel={salir} />,
}
export const Reactivate: Story = {
  name: 'Reactivate relationship',
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 640 } } },
  render: () => (
    <ReactivateRelationshipDrawer
      relacion={{ persona: DIRECTORIO[0]!, roles: ['Legal contact'], vinculo: 'Father', archivadaEl: 'Sep 30, 2026', esGuardian: true, sinOtraGuardian: true }}
      paciente="John Smith" onConfirm={salir} onClose={salir}
    />
  ),
}
