import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { RegionExam } from './RegionExam'
import { IntraOralDiagram } from './dental/IntraOralDiagram'
import type { IntraOralRegion } from './dental/data'

/* Intraoral: el gráfico de la boca + el mismo Add Condition por región que Extraoral (RegionExam). Ver
   design-reference/figma/modulos/clinical-mode.md (2026-10-24). */
export function IntraOralExam() {
  return <RegionExam<IntraOralRegion> examen="Intraoral" diagrama={(p) => <IntraOralDiagram {...p} />} />
}
`})))()}export{n,i as r,r as t};