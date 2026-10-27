import { useEffect, useState } from 'react'
import { Drawer, DrawerActions } from '@/components/ui/drawer'
import { Tabs } from '@/components/ui/tabs'
import { Pill } from '@/components/ui/pill'
import { TextArea } from '@/components/patients/form'
import { DescriptorFields, textoDescriptores } from './DescriptorFields'
import { EditConditionDrawer } from './EditConditionDrawer'
import { EditProcedureDrawer } from './EditProcedureDrawer'
import { FilaArea, FilaDato, FilaNombre, IconoExamen, IconoFecha, IconoProveedor, TONO_ESTADO, fechaCorta, mayuscula } from './DatosHallazgo'
import { areaDeTratamiento, type Finding } from './data'

/* Editar un finding desde el menú de su card. Cada tipo tiene su drawer, con el diseño del Figma *Platform Design* y la
   lógica que ya teníamos (Julián, 2026-10-24):
   - un procedimiento -> Edit Procedure (5294:85084): proveedor, notas y lo que vincula;
   - una condition en un diente -> EditConditionDrawer (5301:149072): superficies, descriptores y notas;
   - el resto de las conditions (Extraoral, Intraoral) -> EditFindingView (5294:107675): los descriptores y las notas.
   Las dos se titulan "Edit Finding": una condition cargada siempre es un finding (Julián, 2026-10-27).
   Qué se ve y qué se edita sale de CON-2770 (Edit Finding): fecha, estado, condition, examen y área de tratamiento de
   sólo lectura; superficie (si corresponde), notas y descriptores editables. Arriba: nombre, fecha, (precio), examen,
   proveedor y el área al final, como el mockup de Julián (2026-10-27); General Information y Descriptors van en dos
   pestañas, para que no queden tan largos.
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

export type PestanaEdicion = 'General Information' | 'Descriptors'
export const PESTANAS_EDICION = ['General Information', 'Descriptors'] as const

function EditFindingView({
  finding, onClose, onSave,
}: {
  finding: Finding | null
  onClose: () => void
  onSave: (patch: Partial<Finding>) => void
}) {
  const [pestana, setPestana] = useState<PestanaEdicion>('General Information')
  const [descriptors, setDescriptors] = useState<Record<string, string>>({})
  const [notes, setNotes] = useState('')
  useEffect(() => {
    if (!finding) return
    setPestana('General Information')
    setDescriptors(finding.descriptors ?? {})
    setNotes(finding.notes)
  }, [finding])

  function guardar() {
    onSave({ descriptors, descriptor: textoDescriptores(descriptors), notes })
    onClose()
  }

  const area = finding && areaDeTratamiento(finding)
  return (
    <Drawer
      open={!!finding} onClose={onClose} title="Edit Finding" footer={<DrawerActions onCancel={onClose} onSave={guardar} />}
      tabs={<Tabs tabs={PESTANAS_EDICION} value={pestana} onChange={setPestana} fullWidth size="sm" aria-label="Edit Finding sections" />}
    >
      {finding && pestana === 'General Information' && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <FilaNombre nombre={mayuscula(finding.condition)} estado={finding.status} tono={TONO_ESTADO[finding.status]} />
            <FilaDato icono={<IconoFecha />} rotulo="Creation date">{fechaCorta(finding.date)}</FilaDato>
            <FilaDato icono={<IconoExamen />} rotulo="Exams">
              <Pill tone="success" size="sm">{finding.examen ?? 'Dental Assessment'}</Pill>
            </FilaDato>
            <FilaDato icono={<IconoProveedor />} rotulo="Provider">{finding.provider}</FilaDato>
            {area && <FilaArea area={area} />}
          </div>
          <TextArea label="Notes" placeholder="Document questions, answers, clarifications, or additional notes" value={notes} onChange={setNotes} />
        </div>
      )}
      {finding && pestana === 'Descriptors' && (
        <section className="flex flex-col gap-3.5">
          <p className="text-xs font-medium text-ink">Selected Descriptors</p>
          <DescriptorFields value={descriptors} onChange={setDescriptors} />
        </section>
      )}
    </Drawer>
  )
}
