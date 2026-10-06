import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { createContext } from 'react'

/* Estados del menú lateral que en la app dependen del mouse o del botón de la
   barra (expandido, tooltip, menú de Settings). Sólo Storybook los fija, para
   mostrarlos sobre las pantallas reales; en la app este contexto está vacío. */
export type NavigationPreviewState = {
  /** El menú arranca expandido. */
  expanded?: boolean
  /** Nombre del ítem cuyo tooltip queda abierto (rail colapsado). */
  tooltip?: string
  /** Menú flotante de Settings abierto. */
  settingsMenu?: boolean
  /** Menú flotante de Billing abierto. */
  billingMenu?: boolean
}

export const NavigationPreview = createContext<NavigationPreviewState>({})
`})))()}export{r as n,n as r,i as t};