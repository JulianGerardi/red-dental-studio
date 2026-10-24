import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { RegionExam } from './RegionExam'
import { ExtraOralDiagram } from './dental/ExtraOralDiagram'
import type { ExtraOralRegion } from './dental/data'

/* Extraoral: el gráfico de cuatro vistas de la cabeza + el Add Condition por región (RegionExam). Ver
   design-reference/figma/modulos/clinical-mode.md (2026-10-24). */
export function ExtraOralExam() {
  return <RegionExam<ExtraOralRegion> examen="Extraoral" diagrama={(p) => <ExtraOralDiagram {...p} />} />
}
`})))()}export{n,i as r,r as t};