import { useEffect, useState } from 'react'
import { Check, X } from 'lucide-react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { SelectField, TextArea } from '@/components/patients/form'
import { SurfaceWheel, type Surface } from './SurfaceWheel'
import { PROVIDERS, type Finding } from './data'

/* Versión acotada del drawer de edición del proyecto hermano: ahí es un
   wizard de 2 pasos con estimados en dólares y un segundo paso para
   re-vincular findings/diagnósticos. Acá no hay ningún otro lado de la app
   que modele "estimado de costo" por finding, así que se deja afuera en vez
   de inventar un campo sin dato real detrás; re-vincular se hace desde
   "New Procedure", no hace falta duplicarlo acá. Edit cubre lo que sí es
   propio de esta pantalla: proveedor, superficies y notas. */
export function EditProcedureDrawer({
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
    <Sheet open onOpenChange={(v) => !v && onClose()}>
      <SheetContent className="w-full gap-0 overflow-y-auto p-0 sm:max-w-[480px]">
        <div className="flex items-start justify-between gap-4 p-6 pb-0">
          <h2 className="text-xl leading-none font-bold text-[#09090b]">Edit Finding</h2>
        </div>

        <div className="flex flex-1 flex-col gap-5 px-6 py-5">
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

        <div className="flex items-center gap-3 p-6 pt-0">
          <button type="button" onClick={onClose} className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-[#e4e4e7] py-2 text-[13px] font-medium hover:bg-[#fafafa]">
            <X className="size-3" /> Cancel
          </button>
          <button
            type="button"
            onClick={() => { onSave({ provider, surfaces, notes }); onClose() }}
            className="bg-dash-blue hover:bg-dash-blue-hover flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-[13px] font-semibold text-white"
          >
            <Check className="size-3" /> Save
          </button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
