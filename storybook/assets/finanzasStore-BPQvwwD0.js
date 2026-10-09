import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import {
  ARANCELES, ASEGURADORAS, COBERTURAS, PLANES,
  type Arancel, type Aseguradora, type PlanSeguro, type TablaCobertura,
} from '@/data/finanzas'

/* Store en memoria de Settings → Billing: lo que se crea o edita en una pantalla (un fee schedule, un plan) aparece en las
   otras. Vive en la ruta de Settings; como patientsStore, no persiste. Los planes de un carrier borrado quedan sin mostrar
   y vuelven con Undo. */

type Datos = { aranceles: Arancel[]; aseguradoras: Aseguradora[]; planes: PlanSeguro[]; coberturas: TablaCobertura[] }
export type Coleccion = keyof Datos
type Item<K extends Coleccion> = Datos[K][number]

type Ctx = Datos & {
  /** Alta (va primera) o edición, por id. Un fee schedule que pasa a default se lo saca a los demás. */
  guardar: <K extends Coleccion>(k: K, item: Item<K>) => void
  /** Saca el ítem y devuelve con qué deshacerlo (lo vuelve a su lugar). */
  borrar: <K extends Coleccion>(k: K, id: string) => () => void
}

const SEMILLA: Datos = { aranceles: ARANCELES, aseguradoras: ASEGURADORAS, planes: PLANES, coberturas: COBERTURAS }

const FinanzasCtx = createContext<Ctx | null>(null)

export function FinanzasProvider({ children, inicial = SEMILLA }: { children: ReactNode; inicial?: Datos }) {
  const [datos, setDatos] = useState<Datos>(inicial)

  const guardar = useCallback(<K extends Coleccion>(k: K, item: Item<K>) => {
    setDatos((d) => {
      const lista = d[k] as Item<K>[]
      const existe = lista.some((x) => x.id === item.id)
      let nueva = existe ? lista.map((x) => (x.id === item.id ? item : x)) : [item, ...lista]
      if (k === 'aranceles' && (item as Arancel).porDefecto) {
        nueva = (nueva as Arancel[]).map((a) => (a.id === item.id ? a : { ...a, porDefecto: false })) as Item<K>[]
      }
      return { ...d, [k]: nueva }
    })
  }, [])

  const borrar = useCallback(<K extends Coleccion>(k: K, id: string) => {
    let quitado: { item: Item<K>; indice: number } | null = null
    setDatos((d) => {
      const lista = d[k] as Item<K>[]
      const indice = lista.findIndex((x) => x.id === id)
      if (indice < 0) return d
      quitado = { item: lista[indice], indice }
      return { ...d, [k]: lista.filter((x) => x.id !== id) }
    })
    return () => setDatos((d) => {
      if (!quitado) return d
      const lista = d[k] as Item<K>[]
      if (lista.some((x) => x.id === id)) return d
      return { ...d, [k]: [...lista.slice(0, quitado.indice), quitado.item, ...lista.slice(quitado.indice)] }
    })
  }, [])

  const valor = useMemo(() => ({ ...datos, guardar, borrar }), [datos, guardar, borrar])
  return <FinanzasCtx.Provider value={valor}>{children}</FinanzasCtx.Provider>
}

export function useFinanzas() {
  const ctx = useContext(FinanzasCtx)
  if (!ctx) throw new Error('useFinanzas va adentro de <FinanzasProvider>')
  return ctx
}
`})))()}export{n,i as r,r as t};