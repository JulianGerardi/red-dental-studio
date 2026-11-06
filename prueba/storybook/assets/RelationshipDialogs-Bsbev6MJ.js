import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { Alert } from '@/components/ui/alert'
import { Pill } from '@/components/ui/pill'
import { DrawerActions, DrawerSection } from '@/components/ui/drawer'
import { ModalShell } from '@/components/patients/form'
import { PersonaSeleccionada, type PersonaDirectorio } from '@/components/patients/AddRelationshipDrawer'

/* Lo que se le pregunta al usuario al archivar una relación, al quitar el acceso de guardián y al reactivar una archivada.
   Textos de las historias de CON-3958 (Jira); decisiones en design-reference/figma/modulos/relationships.md, 2026-10-22. */

/* Mock: el género de cada persona del directorio, para "his/her". Sin dato, el aviso va en plural neutro. */
const GENERO: Record<string, 'F' | 'M'> = { 'Jessica Miller': 'F', 'Michael Miller': 'M', 'Robert Miller': 'M' }

export function pronombresDe(nombre: string) {
  const g = GENERO[nombre]
  return g === 'F' ? { pos: 'Her', suj: 'she', tiene: 'has' } : g === 'M' ? { pos: 'His', suj: 'he', tiene: 'has' } : { pos: 'Their', suj: 'they', tiene: 'have' }
}

/* Si era su último vínculo de guardián, también se le da de baja el usuario de este consultorio y sus sesiones. */
export function AvisoCuentaDesactivada({ nombre }: { nombre: string }) {
  const p = pronombresDe(nombre)
  return <p>{p.pos} user account for this practice will be deactivated because {p.suj} {p.tiene} no other active guardian relationships.</p>
}

/* "Archive relationship" reemplaza a "Delete relationship": la relación sale de la lista vigente y queda en Archived, de
   donde se puede reactivar. Sin guardián (sólo Guarantor) no hay acceso que quitar. */
export function ArchiveRelationshipDialog({
  persona, paciente, esGuardian, ultimaDeGuardian, onConfirm, onCancel,
}: {
  persona: string
  paciente: string
  /** La relación incluye el rol Guardian. */
  esGuardian: boolean
  /** Es su único vínculo de guardián activo: archivarlo desactiva su usuario. */
  ultimaDeGuardian: boolean
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <ConfirmDialog title="Archive relationship" confirmLabel="Archive relationship" onConfirm={onConfirm} onCancel={onCancel}>
      <div className="flex flex-col gap-3">
        <p>Are you sure you want to archive the relationship between {persona} and {paciente}?</p>
        {esGuardian && <p>{persona} will no longer have guardian access to {paciente}&rsquo;s profile.</p>}
        {esGuardian && ultimaDeGuardian && <AvisoCuentaDesactivada nombre={persona} />}
      </div>
    </ConfirmDialog>
  )
}

/* Edit Relationship: al destildar Guardian y guardar, se avisa qué deja de poder hacer la persona antes de revocarlo. */
export function RemoveGuardianDialog({
  persona, paciente, ultimaDeGuardian, onConfirm, onCancel,
}: {
  persona: string
  paciente: string
  ultimaDeGuardian: boolean
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <ConfirmDialog title="Remove Guardian access" confirmLabel="Remove Guardian" onConfirm={onConfirm} onCancel={onCancel}>
      <div className="flex flex-col gap-3">
        <p>{persona} will no longer have guardian access to {paciente}.</p>
        {ultimaDeGuardian && <AvisoCuentaDesactivada nombre={persona} />}
      </div>
    </ConfirmDialog>
  )
}

export type RelacionArchivada = {
  persona: PersonaDirectorio
  /** Guardian, Guarantor… tal como se ve en la card ("Legal contact", "Financial contact"). */
  roles: string[]
  vinculo: string
  archivadaEl: string
  esGuardian: boolean
  /** No le queda otro vínculo de guardián activo: al reactivar se le devuelve el usuario. */
  sinOtraGuardian: boolean
}

/* Reactivar una relación archivada: un drawer para revisarla antes de activarla (quién, qué roles, qué vínculo, cuándo se
   archivó) y qué recupera la persona. */
export function ReactivateRelationshipDrawer({
  relacion, paciente, onConfirm, onClose,
}: {
  relacion: RelacionArchivada
  paciente: string
  onConfirm: () => void
  onClose: () => void
}) {
  const { persona, roles, vinculo, archivadaEl, esGuardian, sinOtraGuardian } = relacion
  const p = pronombresDe(persona.name)
  return (
    <ModalShell
      title="Reactivate Relationship"
      description="Review the relationship before activating it again."
      onClose={onClose}
      width="max-w-[480px]"
      actions={<DrawerActions onCancel={onClose} onSave={onConfirm} saveLabel="Reactivate relationship" />}
    >
      <div className="flex flex-col gap-6">
        <DrawerSection title="Person"><PersonaSeleccionada p={persona} /></DrawerSection>
        <DrawerSection title="Relationship">
          <dl className="flex flex-col gap-3 text-[13px]">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-ink-muted">Role</dt>
              <dd className="flex flex-wrap justify-end gap-1.5">{roles.map((r) => <Pill key={r} tone={r === 'Financial contact' ? 'success' : 'info'}>{r}</Pill>)}</dd>
            </div>
            <div className="flex items-center justify-between gap-3"><dt className="text-ink-muted">Relationship to Patient</dt><dd className="text-ink">{vinculo}</dd></div>
            <div className="flex items-center justify-between gap-3"><dt className="text-ink-muted">Archived on</dt><dd className="text-ink">{archivadaEl}</dd></div>
          </dl>
        </DrawerSection>
        {esGuardian && (
          <Alert tone="info" title="Guardian access">
            {persona.name} will have guardian access to {paciente}&rsquo;s profile again.
            {sinOtraGuardian && <> {p.pos} user account for this practice will be reactivated.</>}
          </Alert>
        )}
      </div>
    </ModalShell>
  )
}
`})))()}export{n,i as r,r as t};