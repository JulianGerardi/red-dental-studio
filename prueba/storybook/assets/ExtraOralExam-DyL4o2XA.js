import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { aviso } from '@/components/ui/toaster'
import { ExamFindingsProvider, ExamLayout, useFindingsEstado } from './ExamLayout'
import { ExtraOralDiagram } from './dental/ExtraOralDiagram'
import { RegionConditionDrawer, type RegionConditionDraft } from './dental/RegionConditionDrawer'
import { textoDescriptores } from './dental/DescriptorFields'
import type { ExtraOralRegion } from './dental/data'

const HOY = 'May 14, 2026'

/* Estados que cuentan como "la región tiene una condition activa" en el gráfico: lo mismo que marca verde una
   FindingCard en cualquier otro examen. */
const ACTIVOS = new Set(['Active', 'Monitoring', 'In Treatment'])

/* Extraoral: el gráfico de regiones (ExtraOralDiagram) reemplaza el odontograma. Clickear una región la agrega a
   "pending" -se puede elegir más de una antes de cargar la condition-; Add Condition abre el drawer propio
   (RegionConditionDrawer, por región, no por diente) con lo ya elegido. Ver
   design-reference/figma/modulos/clinical-mode.md (2026-10-24).

   Necesita su propio ExamFindingsProvider (a diferencia de DentAssmt): a ExamLayout le alcanza su fallback interno
   porque sólo guarda a través de NewProcedureDrawer, pero acá se guarda directo con \`setFindings\`, así que hace falta
   el \`estado\` del contexto. Dentro de ClinicalMode ya hay un provider puesto (no se anida, es el mismo); en un story
   suelto, éste lo pone. */
export function ExtraOralExam() {
  return useFindingsEstado() ? <ExtraOralExamInterno /> : <ExamFindingsProvider><ExtraOralExamInterno /></ExamFindingsProvider>
}

function ExtraOralExamInterno() {
  const [pending, setPending] = useState<ExtraOralRegion[]>([])
  const [open, setOpen] = useState(false)
  const estado = useFindingsEstado()!

  function alternar(region: ExtraOralRegion) {
    setPending((prev) => (prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]))
  }

  function cerrar() {
    setOpen(false)
    setPending([])
  }

  const activas = new Set(
    estado.findings
      .filter((f) => f.examen === 'Extraoral' && ACTIVOS.has(f.status))
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
        examen: 'Extraoral',
        kind: 'condition',
        descriptors: draft.descriptors,
      },
      ...f,
    ])
    aviso.ok(\`\${draft.condition.label} charted on \${area}.\`)
    cerrar()
  }

  return (
    <ExamLayout examen="Extraoral" onCondicion={() => setOpen(true)}>
      <div className="rounded-xl border border-line bg-white p-6" style={{ background: 'radial-gradient(#e4e4e7 1px, transparent 1px) 0 0 / 16px 16px, #fff' }}>
        <ExtraOralDiagram pending={pending} active={[...activas] as ExtraOralRegion[]} onToggle={alternar} />
      </div>

      <RegionConditionDrawer
        open={open}
        regions={pending}
        onRemoveRegion={alternar}
        onClose={cerrar}
        onSave={guardar}
      />
    </ExamLayout>
  )
}
`})))()}export{n,i as r,r as t};