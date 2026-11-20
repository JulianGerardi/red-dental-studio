import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useState } from 'react'
import { Drawer, DrawerActions } from '@/components/ui/drawer'
import { Tabs } from '@/components/ui/tabs'
import { Chip } from '@/components/ui/chip'
import { Pill } from '@/components/ui/pill'
import { TextArea } from '@/components/patients/form'
import { DescriptorFields, textoDescriptores } from './DescriptorFields'
import { SURFACE_NAMES, SurfaceWheel, type Surface } from './SurfaceWheel'
import { TARJETA_INTERNA } from '@/lib/estilos'
import { FilaArea, FilaDato, FilaNombre, IconoExamen, IconoFecha, IconoProveedor, TONO_ESTADO, fechaCorta, mayuscula } from './DatosHallazgo'
import type { Finding } from './data'
import { PESTANAS_EDICION, type PestanaEdicion } from './EditFindingDrawer'

/* Edit Finding de una condition en un diente (Figma *Platform Design* 5301:149072, que lo titula "Edit Condition": una
   condition cargada siempre es un finding, Julián 2026-10-27). Arriba los datos del finding y, al final, el diente como
   cabecera de la card con su rueda de superficies y las elegidas; después las notas. El proveedor va como dato, sin
   editar, como en el Figma. La lógica
   es la que ya teníamos: las superficies y los descriptores de la condition se corrigen acá, independientes entre sí
   (CON-2770), así que los descriptores -que el Figma de esta pantalla no trae- van en su pestaña, con el diseño
   de Edit Finding. La rueda es la nuestra (MB/B/DB/O/ML/L/DL), no la del Figma (BC/B/D/M/P/PC/O): vocabulario distinto,
   a confirmar con Julián. Dos pestañas, General Information (datos, área y notas) y Descriptors, para que no quede tan
   largo; el orden de las filas es el del mockup de Julián (2026-10-27). Ver design-reference/figma/modulos/clinical-mode.md (2026-10-24 y 2026-10-27). */
export function EditConditionDrawer({
  finding, onClose, onSave,
}: {
  finding: Finding | null
  onClose: () => void
  onSave: (patch: Partial<Finding>) => void
}) {
  const [pestana, setPestana] = useState<PestanaEdicion>('General Information')
  const [surfaces, setSurfaces] = useState<Surface[]>([])
  const [notes, setNotes] = useState('')
  const [descriptors, setDescriptors] = useState<Record<string, string>>({})
  useEffect(() => {
    if (!finding) return
    setPestana('General Information')
    setSurfaces(finding.surfaces as Surface[])
    setNotes(finding.notes)
    setDescriptors(finding.descriptors ?? {})
  }, [finding])

  function guardar() {
    onSave({ surfaces, notes, descriptors, descriptor: textoDescriptores(descriptors) })
    onClose()
  }

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

            {/* El área (el diente) es la cabecera de la card de la rueda, como en el mockup. */}
            <section aria-label="Selected area" className={TARJETA_INTERNA}>
              <FilaArea area={{ tipo: 'Tooth', valor: \`\${finding.tooth} · Permanent\` }} />
              <div className="flex flex-col gap-4 p-4">
                <div className="flex justify-center">
                  <SurfaceWheel value={surfaces} onChange={setSurfaces} size={226} />
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-medium text-ink">Selected surface</p>
                  {surfaces.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {surfaces.map((s) => <Chip key={s}>{s} - {SURFACE_NAMES[s]}</Chip>)}
                    </div>
                  )}
                  <p className="text-[10px] leading-[1.3] text-ink-muted">Select a surface to update the finding</p>
                </div>
              </div>
            </section>
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
`})))()}export{n,i as r,r as t};