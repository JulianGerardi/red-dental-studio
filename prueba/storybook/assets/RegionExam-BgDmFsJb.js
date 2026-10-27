import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState, type ReactNode } from 'react'
import { aviso } from '@/components/ui/toaster'
import { ExamFindingsProvider, ExamLayout, useFindingsEstado } from './ExamLayout'
import { RegionConditionDrawer, type RegionConditionDraft } from './dental/RegionConditionDrawer'
import { textoDescriptores } from './dental/DescriptorFields'

const HOY = 'May 14, 2026'

/* Estados que cuentan como "la región tiene una condition activa" en el gráfico: lo mismo que marca una FindingCard
   en cualquier otro examen. */
const ACTIVOS = new Set(['Active', 'Monitoring', 'In Treatment'])

/* Extraoral e Intraoral: un gráfico de regiones reemplaza el odontograma. Clickear una región la agrega a "pending"
   -se puede elegir más de una antes de cargar la condition-; Add Condition abre el drawer propio (RegionConditionDrawer,
   por región, no por diente) con lo ya elegido. Sin región elegida se carga como "Not Localized" (CON-881/CON-882).
   Ver design-reference/figma/modulos/clinical-mode.md (2026-10-24).

   Necesita su propio ExamFindingsProvider (a diferencia de DentAssmt): se guarda directo con \`setFindings\`, así que
   hace falta el \`estado\` del contexto. Dentro de ClinicalMode ya hay un provider puesto (no se anida, es el mismo);
   en un story suelto, éste lo pone. */
export function RegionExam<R extends string>({ examen, diagrama }: {
  /** El nombre del examen como lo escribe la Problem List (Extraoral, Intraoral). */
  examen: string
  diagrama: (p: { pending: R[]; active: R[]; onToggle: (region: R) => void }) => ReactNode
}) {
  return useFindingsEstado()
    ? <RegionExamInterno examen={examen} diagrama={diagrama} />
    : <ExamFindingsProvider><RegionExamInterno examen={examen} diagrama={diagrama} /></ExamFindingsProvider>
}

function RegionExamInterno<R extends string>({ examen, diagrama }: { examen: string; diagrama: (p: { pending: R[]; active: R[]; onToggle: (region: R) => void }) => ReactNode }) {
  const [pending, setPending] = useState<R[]>([])
  const [open, setOpen] = useState(false)
  const estado = useFindingsEstado()!

  function alternar(region: R) {
    setPending((prev) => (prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]))
  }

  function cerrar() {
    setOpen(false)
    setPending([])
  }

  const activas = new Set(
    estado.findings
      .filter((f) => f.examen === examen && ACTIVOS.has(f.status))
      .flatMap((f) => f.area.split(', ')),
  )

  function guardar(draft: RegionConditionDraft) {
    const id = \`F-\${Date.now()}\`
    const descriptor = textoDescriptores(draft.descriptors)
    const area = draft.regions.length ? draft.regions.join(', ') : 'Not Localized'
    estado.setFindings((f) => [
      {
        id,
        area,
        condition: \`\${draft.condition.label} (\${draft.condition.group})\`,
        descriptor,
        date: HOY,
        status: 'Active',
        tooth: null,
        provider: 'Elena Martinez',
        surfaces: [],
        notes: '',
        linked: [],
        diagnoses: [],
        examen,
        treatmentArea: { tipo: examen === 'Extraoral' ? 'Extraoral' : 'Intraoral', valor: area },
        kind: 'condition',
        descriptors: draft.descriptors,
      },
      ...f,
    ])
    aviso.ok(\`\${draft.condition.label} charted on \${area}.\`)
    cerrar()
  }

  return (
    <ExamLayout examen={examen} onCondicion={() => setOpen(true)}>
      <div className="rounded-xl border border-line bg-white p-6" style={{ background: 'radial-gradient(#e4e4e7 1px, transparent 1px) 0 0 / 16px 16px, #fff' }}>
        {diagrama({ pending, active: [...activas] as R[], onToggle: alternar })}
      </div>

      <RegionConditionDrawer open={open} regions={pending} onRemoveRegion={(r) => alternar(r as R)} onClose={cerrar} onSave={guardar} />
    </ExamLayout>
  )
}
`})))()}export{n,i as r,r as t};