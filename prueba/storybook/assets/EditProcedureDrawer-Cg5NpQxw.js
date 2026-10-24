import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useState } from 'react'
import { BadgeDollarSign } from 'lucide-react'
import { Drawer, DrawerActions } from '@/components/ui/drawer'
import { Tabs } from '@/components/ui/tabs'
import { SelectField, TextArea } from '@/components/patients/form'
import { SearchPicker } from '@/components/ui/search-picker'
import { OpcionDiagnostico, OpcionFinding, candidatosDiagnostico } from './OpcionesVinculo'
import { ScopeIcon } from './ScopeIcons'
import { FilaDato, FilaNombre, IconoFecha, TONO_ESTADO, fechaCorta, mayuscula } from './DatosHallazgo'
import { PROVIDERS, type Finding } from './data'

/* Edit Procedure (Figma *Platform Design* 5294:85084): tres pestañas -General Information, Findings y Diagnostic- en vez
   de pasos, porque es algo que ya existe (Edit Patient, 2026-10-22). General Information: los datos del procedimiento
   arriba, el proveedor y las notas. Findings y Diagnostic: lo que el procedimiento tiene vinculado, con un buscador que
   no muestra nada hasta escribir (Julián, 2026-10-24), igual que Link to finding / Link to diagnosis de New Procedure.
   Un solo Save guarda todo. El
   Fee sólo aparece si el procedimiento lo trae. Ver design-reference/figma/modulos/clinical-mode.md (2026-10-24). */
type Pestana = 'General Information' | 'Findings' | 'Diagnostic'
const PESTANAS = ['General Information', 'Findings', 'Diagnostic'] as const

export function EditProcedureDrawer({
  finding, findings, onClose, onSave,
}: {
  finding: Finding | null
  findings: Finding[]
  onClose: () => void
  onSave: (patch: Partial<Finding>) => void
}) {
  const [pestana, setPestana] = useState<Pestana>('General Information')
  const [provider, setProvider] = useState('')
  const [notes, setNotes] = useState('')
  const [linked, setLinked] = useState<string[]>([])
  const [diagnoses, setDiagnoses] = useState<string[]>([])
  useEffect(() => {
    if (!finding) return
    setPestana('General Information')
    setProvider(finding.provider); setNotes(finding.notes); setLinked(finding.linked); setDiagnoses(finding.diagnoses)
  }, [finding])

  const vinculables = findings.filter((x) => x.id !== finding?.id && x.status !== 'Discarded')
  const diagnosticos = candidatosDiagnostico(vinculables)

  function guardar() {
    onSave({ provider, notes, linked, diagnoses })
    onClose()
  }

  return (
    <Drawer
      open={!!finding} onClose={onClose} title="Edit Procedure" footer={<DrawerActions onCancel={onClose} onSave={guardar} />}
      tabs={<Tabs tabs={PESTANAS} value={pestana} onChange={setPestana} fullWidth size="sm" aria-label="Edit Procedure sections" />}
    >
      {finding && pestana === 'General Information' && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <FilaDato icono={<IconoFecha />} rotulo="Creation date">{fechaCorta(finding.date)}</FilaDato>
            {finding.fee !== undefined && (
              <FilaDato
                icono={<span className="flex size-[22px] shrink-0 items-center justify-center rounded-[4px] bg-white text-ink"><BadgeDollarSign className="size-[14px]" /></span>}
                rotulo="Fee"
              >
                $ {finding.fee.toFixed(2)}
              </FilaDato>
            )}
            {finding.tooth !== null && (
              <FilaDato
                icono={<span className="flex size-[22px] shrink-0 items-center justify-center rounded-[4px] bg-dash-blue"><ScopeIcon scope="Tooth" /></span>}
                rotulo="Tooth"
              >
                {finding.tooth}
              </FilaDato>
            )}
            <FilaNombre nombre={mayuscula(finding.condition)} estado={finding.tooth !== null ? 'Tooth' : finding.area} tono={TONO_ESTADO[finding.status]} />
          </div>
          <SelectField label="Provider" required options={PROVIDERS} value={provider} onChange={setProvider} />
          <TextArea label="Notes" placeholder="Document questions, answers, clarifications, or additional notes" value={notes} onChange={setNotes} />
        </div>
      )}

      {finding && pestana === 'Findings' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold text-ink">Link Findings</p>
            <p className="text-[11px] leading-relaxed text-ink-faint">
              You can link clinical findings that may be resolved by this procedure. The system will suggest relevant findings based on the anatomical location and active conditions.
            </p>
          </div>
          <SearchPicker
            multiple items={vinculables} getId={(x) => x.id} getText={(x) => \`\${x.condition} \${x.area} \${x.surfaces.join(' ')}\`}
            renderOption={(x) => <OpcionFinding finding={x} />}
            selected={vinculables.filter((x) => linked.includes(x.id))}
            onSelect={(x) => setLinked((prev) => [...new Set([...prev, x.id])])}
            onRemove={(x) => setLinked((prev) => prev.filter((id) => id !== x.id))}
            placeholder="Search by code or description" ariaLabel="Search findings" emptyText="No finding matches that search."
          />
        </div>
      )}

      {finding && pestana === 'Diagnostic' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold text-ink">Link Diagnosis</p>
            <p className="text-[11px] leading-relaxed text-ink-faint">
              You can link diagnoses that may be resolved by this procedure. The system will suggest relevant diagnoses based on the anatomical location and active conditions.
            </p>
          </div>
          <SearchPicker
            multiple items={diagnosticos} getId={(x) => x.valor} getText={(x) => x.valor}
            renderOption={(x) => <OpcionDiagnostico code={x.code} surfaces={x.surfaces} />}
            selected={diagnosticos.filter((x) => diagnoses.includes(x.valor))}
            onSelect={(x) => setDiagnoses((prev) => [...new Set([...prev, x.valor])])}
            onRemove={(x) => setDiagnoses((prev) => prev.filter((v) => v !== x.valor))}
            placeholder="Search by code or description" ariaLabel="Search diagnoses" emptyText="No diagnosis matches that search."
          />
        </div>
      )}
    </Drawer>
  )
}
`})))()}export{n,i as r,r as t};