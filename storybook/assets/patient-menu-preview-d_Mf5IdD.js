import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { createContext } from 'react'

/* Estados del menú del paciente que en la app se abren con el mouse (tooltip,
   tarjeta de datos, opciones de encuentro). Sólo Storybook los fija, para
   mostrarlos sobre las pantallas reales; en la app este contexto está vacío. */
export type PatientMenuPreviewState = {
  /** Texto del tooltip que queda abierto (rail colapsado). */
  tooltip?: string
  /** Tarjeta de General y Contact abierta (rail colapsado). */
  infoCard?: boolean
  /** Opciones del botón de encuentro abiertas. */
  encounterOptions?: boolean
}

export const PatientMenuPreview = createContext<PatientMenuPreviewState>({})
`})))()}export{r as n,n as r,i as t};