import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { DrawerActions, DrawerSection } from '@/components/ui/drawer'
import { useState } from 'react'
import {
  ModalShell, SelectField, FieldLabel, OptionCheckbox,
} from '@/components/patients/form'
import { PersonaSeleccionada, type PersonaDirectorio } from '@/pages/patients/AddRelationship'
import { aviso } from '@/components/ui/toaster'

/* Figma 3716:81940. A diferencia de "Add Relationship", esta sí es modal y
   se abre encima de la pantalla anterior. No trae Direction: el propio
   diseño aclara que esa parte no se puede editar. */
export function EditRelationshipModal({
  persona,
  onClose,
}: {
  persona: PersonaDirectorio
  onClose: () => void
}) {
  const [rel, setRel] = useState('')
  const [intentado, setIntentado] = useState(false)

  const guardar = () => {
    setIntentado(true)
    if (!rel.trim()) return
    aviso.ok(\`Relationship with \${persona.name} updated to \${rel}.\`)
    onClose()
  }

  return (
    /* Como Edit Relationship de Confidentally 2.0: un paso, Person y Relationship sin caja. */
    <ModalShell
      title="Edit Relationship"
      description="Find or create person"
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
          description="The direction of this relationship cannot be changed. To update this, delete the relationship and create a new one."
        >
          <div className="flex flex-col gap-2">
            <FieldLabel required>Role</FieldLabel>
            <OptionCheckbox label="Guardian" />
            <OptionCheckbox label="Guarantor" />
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
    </ModalShell>
  )
}
`})))()}export{n,i as r,r as t};