import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { ConfirmDialog } from '@/components/ui/confirm-dialog'

/* Lo que se le pregunta al usuario al borrar una relación y al quitar el acceso de guardián. Archivar y reactivar se
   retiraron (CON-4000); decisiones en design-reference/figma/modulos/relationships.md, 2026-10-22 y 2026-11-03. */

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

/* Delete Relationship: borrado físico, sin vuelta atrás. Textos de CON-3999. */
export function DeleteRelationshipDialog({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <ConfirmDialog title="Delete Relationship" confirmLabel="Delete" tone="danger" onConfirm={onConfirm} onCancel={onCancel}>
      Are you sure you want to remove this relationship? This action cannot be undone.
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
`})))()}export{n,i as r,r as t};