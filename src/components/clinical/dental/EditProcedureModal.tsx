import { useEffect, useState } from 'react'
import { ModalShell, SelectField, TextArea, FormFooter } from '@/components/patients/form'
import { SurfaceWheel, type Surface } from './SurfaceWheel'
import { PROVIDERS, type Finding } from './data'

/* Modal, no drawer -mismo criterio que NewProcedureModal-. Versión acotada
   del drawer de edición del proyecto hermano: ahí es un wizard de 2 pasos
   con estimados en dólares y un segundo paso para re-vincular
   findings/diagnósticos. Acá no hay ningún otro lado de la app que modele
   "estimado de costo" por finding, así que se deja afuera en vez de
   inventar un campo sin dato real detrás; re-vincular se hace desde "New
   Procedure", no hace falta duplicarlo acá. Edit cubre lo que sí es propio
   de esta pantalla: proveedor, superficies y notas. */
export function EditProcedureModal({
  finding, onClose, onSave,
}: {
  finding: Finding | null
  onClose: () => void
  onSave: (patch: Partial<Finding>) => void
}) {
  const [provider, setProvider] = useState('')
  const [surfaces, setSurfaces] = useState<Surface[]>([])
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (!finding) return
    setProvider(finding.provider)
    setSurfaces(finding.surfaces as Surface[])
    setNotes(finding.notes)
  }, [finding])

  if (!finding) return null

  return (
    <ModalShell
      title="Edit Finding"
      onClose={onClose}
      width="max-w-[480px]"
      footer={<FormFooter onCancel={onClose} onSave={() => { onSave({ provider, surfaces, notes }); onClose() }} />}
    >
      <div className="flex flex-col gap-5">
        <div className="rounded-md border border-[#e4e4e7] bg-[#fafafa] px-3 py-2.5">
          <p className="text-xs font-extrabold text-[#09090b]">{finding.area}</p>
          <p className="text-xs text-[#71717a]">{finding.condition}</p>
        </div>

        <SelectField label="Provider" required options={PROVIDERS} value={provider} onChange={setProvider} />

        {finding.tooth !== null && (
          <div className="flex w-full flex-col items-center gap-2">
            <span className="w-full text-xs font-semibold text-[#71717a]">Surface</span>
            <SurfaceWheel value={surfaces} onChange={setSurfaces} size={180} />
          </div>
        )}

        <TextArea label="Notes" placeholder="Document questions, answers, clarifications, or additional notes" value={notes} onChange={setNotes} />
      </div>
    </ModalShell>
  )
}
