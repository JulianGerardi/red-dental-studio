import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { DrawerActions, DrawerSection } from '@/components/ui/drawer'
import { useState } from 'react'
import {
  ModalShell, SelectField, FieldLabel, FieldError, OptionCheckbox,
} from '@/components/patients/form'
import { PersonaSeleccionada, type PersonaDirectorio } from '@/components/patients/AddRelationshipDrawer'
import { RemoveGuardianDialog } from '@/components/patients/RelationshipDialogs'
import { aviso } from '@/components/ui/toaster'

/* Figma 3716:81940. A diferencia de "Add Relationship", esta sí es modal y
   se abre encima de la pantalla anterior. No trae Direction: el propio
   diseño aclara que esa parte no se puede editar.

   Abre con lo que la relación ya tiene (roles y vínculo). Si se destilda Guardian y se guarda, antes de revocar el acceso
   se pregunta con "Remove Guardian access" (CON-3958, 2026-10-22; modulos/relationships.md). */
export type CambiosRelacion = { guardian: boolean; guarantor: boolean; rel: string }

export function EditRelationshipModal({
  persona,
  paciente = 'John Smith',
  inicial = { guardian: false, guarantor: false, rel: '' },
  ultimaDeGuardian = false,
  onGuardar,
  onClose,
}: {
  persona: PersonaDirectorio
  paciente?: string
  /** Lo que la relación tiene hoy. */
  inicial?: CambiosRelacion
  /** Su único vínculo de guardián activo: quitar Guardian le desactiva el usuario. */
  ultimaDeGuardian?: boolean
  onGuardar?: (c: CambiosRelacion) => void
  onClose: () => void
}) {
  const [guardian, setGuardian] = useState(inicial.guardian)
  const [guarantor, setGuarantor] = useState(inicial.guarantor)
  const [rel, setRel] = useState(inicial.rel)
  const [intentado, setIntentado] = useState(false)
  const [confirmando, setConfirmando] = useState(false)

  const sinRol = intentado && !guardian && !guarantor
  const terminar = () => {
    onGuardar?.({ guardian, guarantor, rel })
    aviso.ok(\`Relationship with \${persona.name} updated to \${rel}.\`)
    onClose()
  }
  const guardar = () => {
    setIntentado(true)
    if (!rel.trim() || (!guardian && !guarantor)) return
    /* Pierde el rol Guardian que tenía: se avisa antes de revocar el acceso. */
    if (inicial.guardian && !guardian) { setConfirmando(true); return }
    terminar()
  }

  return (
    /* Como Edit Relationship de Confidentally 2.0: un paso, Person y Relationship sin caja. */
    <ModalShell
      title="Edit Relationship"
      description="Update how this person is related to the patient."
      onClose={onClose}
      width="max-w-[480px]"
      actions={<DrawerActions onCancel={onClose} onSave={guardar} />}
    >
      <div className="flex flex-col gap-6">
        <DrawerSection title="Person">
          <PersonaSeleccionada p={persona} />
        </DrawerSection>

        <DrawerSection
          title="Relationship"
          description="The direction of this relationship cannot be changed. To update this, archive the relationship and create a new one."
        >
          <div className="flex flex-col gap-2">
            <FieldLabel required>Role</FieldLabel>
            <OptionCheckbox label="Guardian" checked={guardian} onChange={setGuardian} />
            <OptionCheckbox label="Guarantor" checked={guarantor} onChange={setGuarantor} />
            <FieldError>{sinRol ? 'Choose at least one role.' : undefined}</FieldError>
          </div>
          <SelectField
            label="Relationship to Patient"
            required
            options={['Parent', 'Guardian', 'Sibling', 'Spouse', 'Child', 'Other']}
            value={rel}
            onChange={setRel}
            error={intentado && !rel.trim() ? 'This field is required.' : undefined}
          />
        </DrawerSection>
      </div>
      {confirmando && (
        <RemoveGuardianDialog
          persona={persona.name} paciente={paciente} ultimaDeGuardian={ultimaDeGuardian}
          onConfirm={() => { setConfirmando(false); terminar() }} onCancel={() => setConfirmando(false)}
        />
      )}
    </ModalShell>
  )
}
`})))()}export{n,i as r,r as t};