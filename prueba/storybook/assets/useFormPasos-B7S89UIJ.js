import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'

/* Formularios de drawer con pasos, como en Confidentally 2.0: Next sólo avanza con lo obligatorio del paso completo y
   marca en rojo lo que falta; Save revisa todos los pasos y vuelve al primero incompleto. */
export function useFormPasos<T extends Record<string, string>>(vacio: T, obligatorios: (keyof T)[][]) {
  const [d, setD] = useState(vacio)
  const [paso, setPaso] = useState(0)
  const [intentado, setIntentado] = useState(false)
  const set = (k: keyof T) => (v: string) => setD((p) => ({ ...p, [k]: v }))
  /* Sólo se marca lo del paso a la vista: los otros pasos siguen montados, ocultos. */
  const falta = (k: keyof T) => (intentado && (obligatorios[paso] ?? []).includes(k) && !d[k].trim() ? 'This field is required.' : undefined)
  const completo = (i: number) => (obligatorios[i] ?? []).every((k) => d[k].trim())
  const siguiente = () => {
    if (!completo(paso)) { setIntentado(true); return }
    setIntentado(false)
    setPaso((n) => Math.min(n + 1, obligatorios.length - 1))
  }
  const atras = () => { setIntentado(false); setPaso((n) => Math.max(n - 1, 0)) }
  /* true con todo completo; si no, abre el primer paso incompleto. */
  const listo = () => {
    const i = obligatorios.findIndex((_, n) => !completo(n))
    if (i === -1) return true
    setIntentado(true)
    setPaso(i)
    return false
  }
  return { d, set, falta, paso, siguiente, atras, listo }
}
`})))()}export{r as n,n as r,i as t};