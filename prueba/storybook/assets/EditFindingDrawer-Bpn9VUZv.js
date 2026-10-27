import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useState } from 'react'
import { Drawer, DrawerActions } from '@/components/ui/drawer'
import { MapPin } from 'lucide-react'
import { Pill } from '@/components/ui/pill'
import { TextArea } from '@/components/patients/form'
import { DescriptorFields, textoDescriptores } from './DescriptorFields'
import { EditConditionDrawer } from './EditConditionDrawer'
import { EditProcedureDrawer } from './EditProcedureDrawer'
import { FilaDato, FilaNombre, IconoExamen, IconoFecha, TONO_ESTADO, fechaCorta, mayuscula } from './DatosHallazgo'
import type { Finding } from './data'

/* Editar un finding desde el menú de su card. Cada tipo tiene su drawer, con el diseño del Figma *Platform Design* y la
   lógica que ya teníamos (Julián, 2026-10-24):
   - un procedimiento -> Edit Procedure (5294:85084): proveedor, notas y lo que vincula;
   - una condition en un diente -> Edit Condition (5301:149072): superficies, descriptores y notas;
   - el resto de las conditions (Extraoral, Intraoral) -> Edit Finding (5294:107675): los descriptores y las notas.
   Qué se ve y qué se edita sale de CON-2770 (Edit Finding): fecha, estado, condition, examen y área de tratamiento de
   sólo lectura; superficie (si corresponde), notas y descriptores editables.
   Ver design-reference/figma/modulos/clinical-mode.md. */
export function EditFindingDrawer({
  finding, findings = [], onClose, onSave,
}: {
  finding: Finding | null
  /** Todos los findings del examen: Edit Procedure los ofrece para vincular. */
  findings?: Finding[]
  onClose: () => void
  onSave: (patch: Partial<Finding>) => void
}) {
  const esCondicion = finding?.kind === 'condition'
  const enDiente = finding?.tooth != null
  const props = { onClose, onSave }
  return (
    <>
      <EditProcedureDrawer finding={finding && !esCondicion ? finding : null} findings={findings} {...props} />
      <EditConditionDrawer finding={finding && esCondicion && enDiente ? finding : null} {...props} />
      <EditFindingView finding={finding && esCondicion && !enDiente ? finding : null} {...props} />
    </>
  )
}

function EditFindingView({
  finding, onClose, onSave,
}: {
  finding: Finding | null
  onClose: () => void
  onSave: (patch: Partial<Finding>) => void
}) {
  const [descriptors, setDescriptors] = useState<Record<string, string>>({})
  const [notes, setNotes] = useState('')
  useEffect(() => {
    if (!finding) return
    setDescriptors(finding.descriptors ?? {})
    setNotes(finding.notes)
  }, [finding])

  function guardar() {
    onSave({ descriptors, descriptor: textoDescriptores(descriptors), notes })
    onClose()
  }

  return (
    <Drawer open={!!finding} onClose={onClose} title="Edit Finding" footer={<DrawerActions onCancel={onClose} onSave={guardar} />}>
      {finding && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <FilaDato icono={<IconoFecha />} rotulo="Creation date">{fechaCorta(finding.date)}</FilaDato>
            <FilaDato icono={<IconoExamen />} rotulo="Exams">
              <Pill tone="success" size="sm">{finding.examen ?? 'Dental Assessment'}</Pill>
            </FilaDato>
            <FilaDato icono={<span className="flex size-[22px] shrink-0 items-center justify-center rounded-[4px] bg-white text-ink"><MapPin className="size-[13px]" /></span>} rotulo="Treatment Area">
              {finding.area}
            </FilaDato>
            <FilaNombre nombre={mayuscula(finding.condition)} estado={finding.status} tono={TONO_ESTADO[finding.status]} />
          </div>
          <section className="flex flex-col gap-3.5">
            <p className="text-xs font-medium text-ink">Selected Descriptors</p>
            <DescriptorFields value={descriptors} onChange={setDescriptors} />
          </section>
          <TextArea label="Notes" placeholder="Document questions, answers, clarifications, or additional notes" value={notes} onChange={setNotes} />
        </div>
      )}
    </Drawer>
  )
}
`})))()}export{n,i as r,r as t};