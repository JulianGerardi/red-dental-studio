import { useEffect, useState } from 'react'
import { BadgeDollarSign, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Drawer, DrawerActions } from '@/components/ui/drawer'
import { Tabs } from '@/components/ui/tabs'
import { SelectField, TextArea, control } from '@/components/patients/form'
import { LinkedDiagnosisCard, LinkedFindingCard } from './LinkedFindingCard'
import { ScopeIcon } from './ScopeIcons'
import { FilaDato, FilaNombre, IconoFecha, TONO_ESTADO, fechaCorta, mayuscula } from './DatosHallazgo'
import { PROVIDERS, codigoDiagnostico, type Finding } from './data'

/* Edit Procedure (Figma *Platform Design* 5294:85084): tres pestañas -General Information, Findings y Diagnostic- en vez
   de pasos, porque es algo que ya existe (Edit Patient, 2026-10-22). General Information: los datos del procedimiento
   arriba, el proveedor y las notas. Findings y Diagnostic: lo que el procedimiento tiene vinculado, con el mismo
   buscador y las mismas cards que Link to finding / Link to diagnosis de New Procedure. Un solo Save guarda todo. El
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
  const [fq, setFq] = useState('')
  const [dq, setDq] = useState('')
  useEffect(() => {
    if (!finding) return
    setPestana('General Information'); setFq(''); setDq('')
    setProvider(finding.provider); setNotes(finding.notes); setLinked(finding.linked); setDiagnoses(finding.diagnoses)
  }, [finding])

  const f = fq.trim().toLowerCase()
  const vinculables = findings.filter((x) => x.id !== finding?.id && x.status !== 'Discarded' && (!f || `${x.condition} ${x.area} ${x.surfaces.join(' ')}`.toLowerCase().includes(f)))
  const d = dq.trim().toLowerCase()
  const diagnosticos = findings
    .filter((x) => x.id !== finding?.id && x.status !== 'Discarded')
    .map((x) => ({ id: x.id, code: codigoDiagnostico(x.condition), surfaces: x.surfaces }))
    .map((x) => ({ ...x, valor: x.surfaces.length ? `${x.code} · ${x.surfaces.join(', ')}` : x.code }))
    .filter((x) => !d || x.valor.toLowerCase().includes(d))

  function guardar() {
    onSave({ provider, notes, linked, diagnoses })
    onClose()
  }

  const buscador = (valor: string, cambiar: (v: string) => void, etiqueta: string) => (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
      <input
        value={valor} onChange={(e) => cambiar(e.target.value)} placeholder="Search by code or description" aria-label={etiqueta}
        className={cn(control(), 'h-9 pr-3 pl-9')}
      />
    </div>
  )

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
          {buscador(fq, setFq, 'Search findings')}
          <div className="flex w-full flex-col gap-2.5">
            {vinculables.map((x) => (
              <LinkedFindingCard
                key={x.id} finding={x} linked={linked.includes(x.id)}
                onToggle={(on) => setLinked((prev) => (on ? [...new Set([...prev, x.id])] : prev.filter((id) => id !== x.id)))}
              />
            ))}
            {!vinculables.length && <p className="w-full py-6 text-center text-xs text-ink-faint">No finding matches that search.</p>}
          </div>
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
          {buscador(dq, setDq, 'Search diagnoses')}
          <div className="flex w-full flex-col gap-2.5">
            {diagnosticos.map((x) => (
              <LinkedDiagnosisCard
                key={x.id} code={x.code} surfaces={x.surfaces} linked={diagnoses.includes(x.valor)}
                onToggle={(on) => setDiagnoses((prev) => (on ? [...new Set([...prev, x.valor])] : prev.filter((v) => v !== x.valor)))}
              />
            ))}
            {!diagnosticos.length && <p className="w-full py-6 text-center text-xs text-ink-faint">No diagnosis matches that search.</p>}
          </div>
        </div>
      )}
    </Drawer>
  )
}
