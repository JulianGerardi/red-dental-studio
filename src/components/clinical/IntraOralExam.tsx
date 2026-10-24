import { RegionExam } from './RegionExam'
import { IntraOralDiagram } from './dental/IntraOralDiagram'
import type { IntraOralRegion } from './dental/data'

/* Intraoral: el gráfico de la boca + el mismo Add Condition por región que Extraoral (RegionExam). Ver
   design-reference/figma/modulos/clinical-mode.md (2026-10-24). */
export function IntraOralExam() {
  return <RegionExam<IntraOralRegion> examen="Intraoral" diagrama={(p) => <IntraOralDiagram {...p} />} />
}
