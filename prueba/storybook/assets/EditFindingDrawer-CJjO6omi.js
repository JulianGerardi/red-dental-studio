import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useState } from 'react'
import { Check, X } from 'lucide-react'
import { Drawer } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { SelectField, TextArea } from '@/components/patients/form'
import { FindingCard } from './FindingCard'
import { SurfaceWheel, type Surface } from './SurfaceWheel'
import { PROVIDERS, type Finding } from './data'

/* Editar un finding, en el drawer de la derecha como New Procedure (Julián, 2026-10-03): el finding entero arriba, con su
   estado, fecha, zona, condición y descriptores, y debajo lo que se edita (proveedor, superficies y notas) y lo que tiene
   vinculado. Las acciones fijas al pie. Ver design-reference/figma/modulos/clinical-mode.md. */
export function EditFindingDrawer({
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

  return (
    <Drawer
      open={!!finding}
      onClose={onClose}
      title="Edit Finding"
      description={finding ? \`\${finding.area} · \${finding.condition}\` : undefined}
      footer={
        <>
          <Button className="w-full" onClick={() => { onSave({ provider, surfaces, notes }); onClose() }}><Check /> Save</Button>
          <Button variant="secondary" className="w-full" onClick={onClose}><X /> Cancel</Button>
        </>
      }
    >
      {finding && (
        <div className="flex flex-col gap-5">
          <FindingCard finding={finding} className="border border-line shadow-none" />

          <SelectField label="Provider" required options={PROVIDERS} value={provider} onChange={setProvider} />

          {finding.tooth !== null && (
            <div className="flex w-full flex-col items-center gap-2">
              <span className="flex w-full flex-col gap-0.5">
                <span className="text-xs font-semibold text-ink-muted">Surfaces</span>
                <span className="text-[11px] text-ink-faint">Tooth {finding.tooth}: tap a surface to add or remove it.</span>
              </span>
              <SurfaceWheel value={surfaces} onChange={setSurfaces} size={180} />
            </div>
          )}

          <TextArea label="Notes" placeholder="Document questions, answers, clarifications, or additional notes" value={notes} onChange={setNotes} />

          {finding.linked.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-ink-muted">Linked procedures</span>
              <div className="flex flex-wrap gap-1.5">
                {finding.linked.map((id) => (
                  <span key={id} className="bg-dash-count-bg text-dash-blue rounded-full px-2 py-0.5 text-[11px] font-semibold">{id}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Drawer>
  )
}
`})))()}export{n,i as r,r as t};