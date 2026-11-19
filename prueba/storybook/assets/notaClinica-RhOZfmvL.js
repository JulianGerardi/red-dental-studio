import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useSyncExternalStore } from 'react'

/* La Clinical Note que quedó sin firmar al cerrar el encuentro (Remind me later). Vive fuera de React: la deja Clinical
   Mode y la lee el panel del paciente, que muestra Pending Signature (patient-dashboard.md, 2026-11-10). */
let pendiente = false
const oyentes = new Set<() => void>()

export function setNotaPendiente(v: boolean) {
  pendiente = v
  oyentes.forEach((f) => f())
}

export function useNotaPendiente() {
  return useSyncExternalStore((f) => { oyentes.add(f); return () => { oyentes.delete(f) } }, () => pendiente)
}
`})))()}export{r as n,n as r,i as t};