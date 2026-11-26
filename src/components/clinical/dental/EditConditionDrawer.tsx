import { useEffect, useState } from 'react'
import { Drawer, DrawerActions } from '@/components/ui/drawer'
import { Chip } from '@/components/ui/chip'
import { Pill } from '@/components/ui/pill'
import { TextArea } from '@/components/patients/form'
import { SURFACE_NAMES, SurfaceWheel, type Surface } from './SurfaceWheel'
import { TARJETA_INTERNA } from '@/lib/estilos'
import { FilaArea, FilaDato, FilaNombre, IconoExamen, IconoFecha, IconoProveedor, TONO_ESTADO, fechaCorta, mayuscula } from './DatosHallazgo'
import type { Finding } from './data'

/* Edit Finding de una condition en un diente (Figma *Platform Design* 5301:149072, que lo titula "Edit Condition": una
   condition cargada siempre es un finding, Julián 2026-10-27). Arriba los datos del finding y, al final, el diente como
   cabecera de la card con su rueda de superficies y las elegidas; después las notas. El proveedor va como dato, sin
   editar, como en el Figma. Se corrigen las superficies y las notas (CON-2770). La rueda es la nuestra
   (MB/B/DB/O/ML/L/DL), no la del Figma (BC/B/D/M/P/PC/O): vocabulario distinto, a confirmar con Julián. El orden de
   las filas es el del mockup de Julián (2026-10-27). Con un diente no van descriptores: sólo General Information,
   sin pestañas (Julián, 2026-11-25). Ver design-reference/figma/modulos/clinical-mode.md
   (2026-10-24, 2026-10-27 y 2026-11-25). */
/* La Problem List guarda también M, D, I y F, que la rueda no tiene: se nombran igual (clinical-mode.md, 2026-11-25). */
const OTRAS_SUPERFICIES: Record<string, string> = { M: 'Mesial', D: 'Distal', I: 'Incisal', F: 'Facial' }

export function EditConditionDrawer({
  finding, onClose, onSave,
}: {
  finding: Finding | null
  onClose: () => void
  onSave: (patch: Partial<Finding>) => void
}) {
  const [surfaces, setSurfaces] = useState<Surface[]>([])
  const [notes, setNotes] = useState('')
  useEffect(() => {
    if (!finding) return
    setSurfaces(finding.surfaces as Surface[])
    setNotes(finding.notes)
  }, [finding])

  function guardar() {
    onSave({ surfaces, notes })
    onClose()
  }

  return (
    <Drawer
      open={!!finding} onClose={onClose} title="Edit finding" footer={<DrawerActions onCancel={onClose} onSave={guardar} />}
    >
      {finding && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <FilaNombre nombre={mayuscula(finding.condition)} estado={finding.status} tono={TONO_ESTADO[finding.status]} />
            <FilaDato icono={<IconoFecha />} rotulo="Creation date">{fechaCorta(finding.date)}</FilaDato>
            <FilaDato icono={<IconoExamen />} rotulo="Exams">
              <Pill tone="success" size="sm">{finding.examen ?? 'Dental assessment'}</Pill>
            </FilaDato>
            <FilaDato icono={<IconoProveedor />} rotulo="Provider">{finding.provider}</FilaDato>

            {/* El área (el diente) es la cabecera de la card de la rueda, como en el mockup. */}
            <section aria-label="Selected area" className={TARJETA_INTERNA}>
              <FilaArea area={{ tipo: 'Tooth', valor: `${finding.tooth} · Permanent` }} />
              <div className="flex flex-col gap-4 p-4">
                <div className="flex justify-center">
                  <SurfaceWheel value={surfaces} onChange={setSurfaces} size={226} />
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-medium text-ink">Selected surface</p>
                  {surfaces.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {surfaces.map((s) => <Chip key={s}>{s} - {SURFACE_NAMES[s] ?? OTRAS_SUPERFICIES[s] ?? s}</Chip>)}
                    </div>
                  )}
                  <p className="text-[11px] leading-[1.3] text-ink-muted">Select a surface to update the finding</p>
                </div>
              </div>
            </section>
          </div>

          <TextArea label="Notes" placeholder="Document questions, answers, clarifications, or additional notes" value={notes} onChange={setNotes} />
        </div>
      )}
    </Drawer>
  )
}
