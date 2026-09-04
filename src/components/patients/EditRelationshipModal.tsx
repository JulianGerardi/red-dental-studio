import { useState } from 'react'
import {
  ModalShell, SelectField, FieldLabel, OptionCheckbox, FormFooter,
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
    aviso.ok(`Relationship with ${persona.name} updated to ${rel}.`)
    onClose()
  }

  return (
    <ModalShell
      title="Edit Relationship"
      onClose={onClose}
      width="max-w-[780px]"
      footer={<FormFooter onCancel={onClose} onSave={guardar} />}
    >
      <section className="rounded-lg border border-[#e4e4e7] bg-white p-5">
        <h3 className="text-sm font-semibold text-[#09090b]">Person</h3>
        <div className="mt-3">
          <PersonaSeleccionada p={persona} />
        </div>
      </section>

      <section className="mt-5 rounded-lg border border-[#e4e4e7] bg-white p-5">
        <h3 className="text-sm font-semibold text-[#09090b]">Relationship</h3>
        <p className="mt-1.5 max-w-[520px] text-xs leading-[1.5] text-[#71717a]">
          The direction of this relationship cannot be changed. To update this, delete the
          relationship and create a new one.
        </p>

        <div className="mt-4 flex flex-col gap-2">
          <FieldLabel required>Role</FieldLabel>
          <div className="grid gap-x-5 gap-y-4 lg:grid-cols-2">
            <OptionCheckbox label="Guardian" />
            <OptionCheckbox label="Guarantor" />
          </div>
        </div>

        <SelectField
          className="mt-4"
          label="Relationship to Patient"
          required
          options={['Parent', 'Guardian', 'Sibling', 'Spouse', 'Child', 'Other']}
          value={rel}
          onChange={setRel}
          error={intentado && !rel.trim() ? 'This field is required.' : undefined}
        />
      </section>
    </ModalShell>
  )
}
