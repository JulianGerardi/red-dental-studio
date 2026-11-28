import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useState } from 'react'
import { BadgeDollarSign } from 'lucide-react'
import { Drawer, DrawerActions } from '@/components/ui/drawer'
import { Tabs } from '@/components/ui/tabs'
import { SelectField, TextArea } from '@/components/patients/form'
import { SearchPicker } from '@/components/ui/search-picker'
import { OpcionDiagnostico, OpcionFinding, candidatosDiagnostico } from './OpcionesVinculo'
import type { PillTone } from '@/components/ui/pill'
import { FilaArea, FilaDato, FilaNombre, IconoFecha, TONO_ESTADO, fechaCorta, mayuscula } from './DatosHallazgo'
import { ProcedureEstimate, errorEstimado, estimadoInicial } from './ProcedureEstimate'
import { PROVIDERS, areaDeTratamiento, type Finding } from './data'
import type { EstimadoProcedimiento } from '@/data/estimaciones'

/* Edit Procedure (Figma *Platform Design* 5294:85084): tres pestañas -General Information, Findings y Diagnostic- en vez
   de pasos, porque es algo que ya existe (Edit Patient, 2026-10-22). General Information: los datos del procedimiento
   arriba, el proveedor y las notas. Findings y Diagnostic: lo que el procedimiento tiene vinculado, con un buscador que
   no muestra nada hasta escribir (Julián, 2026-10-24), igual que Link to finding / Link to diagnosis de New Procedure.
   Un solo Save guarda todo. El
   Fee sólo aparece si el procedimiento lo trae. Arriba: el procedimiento, la fecha, el precio y el área de
   tratamiento con el ícono de su tipo (CON-3700; mockup de Julián, 2026-10-27). La cuarta pestaña, Estimate, es el
   estimado del seguro del procedimiento (CON-4211). Se abre igual desde el examen, la tabla de Procedures y el ⋮ de
   Treatment Plan. End Encounter lo muestra dentro de su propio drawer, sin apilar otro (\`useEdicionProcedimiento\`).
   Ver design-reference/figma/modulos/clinical-mode.md (2026-10-24, 2026-11-25 y 2026-11-27). */
type Pestana = 'General information' | 'Findings' | 'Diagnostic' | 'Estimate'
const PESTANAS = ['General information', 'Findings', 'Diagnostic', 'Estimate'] as const

/** El código CDT del procedimiento: lo que va antes del guion ("D2740 - Crown…"). */
export const codigoDe = (f: Finding) => f.condition.split(' - ')[0].trim()

type Props = {
  finding: Finding | null
  findings: Finding[]
  onClose: () => void
  onSave: (patch: Partial<Finding>) => void
  /** El estado del procedimiento como lo muestra su tabla (Planned, In progress…), si no es el del finding. */
  estado?: { texto: string; tono: PillTone }
  /** Por qué el estimado no se puede editar (el caso ya salió de Planning). */
  bloqueoEstimado?: string
}

export function EditProcedureDrawer(props: Props) {
  return <Drawer open={!!props.finding} onClose={props.onClose} {...useEdicionProcedimiento(props)} />
}

/** Edit procedure como partes de un Drawer (título, pestañas, pie y contenido), para mostrarlo en uno que ya está abierto. */
export function useEdicionProcedimiento({ finding, findings, onClose, onSave, estado, bloqueoEstimado }: Props) {
  const [pestana, setPestana] = useState<Pestana>('General information')
  const [provider, setProvider] = useState('')
  const [notes, setNotes] = useState('')
  const [linked, setLinked] = useState<string[]>([])
  const [diagnoses, setDiagnoses] = useState<string[]>([])
  const [estimado, setEstimado] = useState<EstimadoProcedimiento | null>(null)
  useEffect(() => {
    if (!finding) return
    setPestana('General information')
    /* Por defecto, uno de cada: el finding del mismo diente (o el primero) y su diagnóstico; lo ya vinculado manda. */
    const candidatos = findings.filter((x) => x.id !== finding.id && x.status !== 'Discarded')
    const sugerido = candidatos.find((x) => finding.tooth !== null && x.tooth === finding.tooth) ?? candidatos[0]
    setProvider(finding.provider); setNotes(finding.notes)
    setLinked(finding.linked.length || !sugerido ? finding.linked : [sugerido.id])
    setDiagnoses(finding.diagnoses.length || !sugerido ? finding.diagnoses : candidatosDiagnostico([sugerido]).map((d) => d.valor))
    setEstimado(estimadoInicial(codigoDe(finding), finding.fee ?? 0, finding.estimado))
  }, [finding])

  const vinculables = findings.filter((x) => x.id !== finding?.id && x.status !== 'Discarded')
  const diagnosticos = candidatosDiagnostico(vinculables)

  const area = finding && areaDeTratamiento(finding)

  function guardar() {
    if (!finding) return
    /* Con el estimado mal cargado no se guarda: se vuelve a su pestaña, donde está el error. */
    if (finding.fee && estimado && errorEstimado(codigoDe(finding), finding.fee, estimado)) return setPestana('Estimate')
    /* Sin tocar nada, el estimado sigue siendo el automático: no se guarda una copia. */
    const tocado = estimado && (finding.estimado || !estimado.automatico)
    onSave({ provider, notes, linked, diagnoses, ...(tocado ? { estimado: estimado! } : {}) })
    onClose()
  }

  return {
    title: 'Edit procedure',
    footer: <DrawerActions onCancel={onClose} onSave={guardar} />,
    tabs: <Tabs tabs={PESTANAS} value={pestana} onChange={setPestana} fullWidth size="sm" aria-label="Edit procedure sections" />,
    children: (
    <>
      {finding && pestana === 'General information' && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <FilaNombre nombre={mayuscula(finding.condition)} estado={estado?.texto ?? finding.status} tono={estado?.tono ?? TONO_ESTADO[finding.status]} />
            <FilaDato icono={<IconoFecha />} rotulo="Creation date">{fechaCorta(finding.date)}</FilaDato>
            {finding.fee !== undefined && (
              <FilaDato
                icono={<span className="flex size-[22px] shrink-0 items-center justify-center rounded-[4px] bg-surface text-ink"><BadgeDollarSign className="size-[14px]" /></span>}
                rotulo="Fee"
              >
                $ {finding.fee.toFixed(2)}
              </FilaDato>
            )}
            {area && <FilaArea area={area} />}
          </div>
          <SelectField label="Provider" required options={[...new Set([...PROVIDERS, finding.provider])]} value={provider} onChange={setProvider} />
          <TextArea label="Notes" placeholder="Document questions, answers, clarifications, or additional notes" value={notes} onChange={setNotes} />
        </div>
      )}

      {finding && pestana === 'Findings' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold text-ink">Link findings</p>
          </div>
          <SearchPicker
            multiple items={vinculables} getId={(x) => x.id} getText={(x) => \`\${x.condition} \${x.area} \${x.surfaces.join(' ')}\`}
            renderOption={(x) => <OpcionFinding finding={x} />}
            selected={vinculables.filter((x) => linked.includes(x.id))}
            onSelect={(x) => setLinked((prev) => [...new Set([...prev, x.id])])}
            onRemove={(x) => setLinked((prev) => prev.filter((id) => id !== x.id))}
            placeholder="Search by code or description" ariaLabel="Search findings" emptyText="No finding matches that search." accion="vincular" tituloElegidos="Linked findings"
          />
        </div>
      )}

      {finding && pestana === 'Diagnostic' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold text-ink">Link diagnosis</p>
          </div>
          <SearchPicker
            multiple items={diagnosticos} getId={(x) => x.valor} getText={(x) => \`\${x.valor} \${x.descripcion}\`}
            renderOption={(x) => <OpcionDiagnostico code={x.code} descripcion={x.descripcion} detalle={x.detalle} />}
            selected={diagnosticos.filter((x) => diagnoses.includes(x.valor))}
            onSelect={(x) => setDiagnoses((prev) => [...new Set([...prev, x.valor])])}
            onRemove={(x) => setDiagnoses((prev) => prev.filter((v) => v !== x.valor))}
            placeholder="Search by code or description" ariaLabel="Search diagnoses" emptyText="No diagnosis matches that search." accion="vincular" tituloElegidos="Linked diagnoses"
          />
        </div>
      )}

      {finding && estimado && pestana === 'Estimate' && (
        <ProcedureEstimate codigo={codigoDe(finding)} cobrado={finding.fee} value={estimado} onChange={setEstimado} bloqueo={bloqueoEstimado} />
      )}
    </>
    ),
  }
}
`})))()}export{n,i as r,r as t};