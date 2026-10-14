import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { TOPICS, MODULE_PAGE } from './topics'
import { CoachMark } from './CoachMark'

/* Vive en la raíz de la app -no adentro de AppShell- porque algunos temas
   (Clinical Mode) navegan a una ruta que vive fuera del shell, y el
   CoachMark tiene que sobrevivir ese salto. Ver
   design-reference/figma/modulos/help.md. */
const HelpContext = createContext<{
  showOnScreen: (topicId: string) => void
  explicando: boolean
  confibotAbierto: boolean
  openConfibot: () => void
  toggleConfibot: () => void
  closeConfibot: () => void
  fabDePagina: boolean
  setFabsDePagina: (cambio: (n: number) => number) => void
} | null>(null)

export function useHelp() {
  const ctx = useContext(HelpContext)
  if (!ctx) throw new Error('useHelp must be used inside HelpProvider')
  return ctx
}

/* Una pantalla con su propio botón flotante abajo a la derecha (Appointment
   requests en Scheduling) lo avisa, y Confibot se apila arriba en vez de
   taparlo. Sin HelpProvider (una story suelta) no hace nada. Ver help.md. */
export function useFabDePagina() {
  const set = useContext(HelpContext)?.setFabsDePagina
  useEffect(() => {
    if (!set) return
    set((n) => n + 1)
    return () => set((n) => n - 1)
  }, [set])
}

export function HelpProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [coachingId, setCoachingId] = useState<string | null>(null)
  const coaching = coachingId ? (TOPICS.find((t) => t.id === coachingId) ?? null) : null
  const hermanos = coaching ? TOPICS.filter((t) => t.module === coaching.module) : []
  const indice = coaching ? hermanos.findIndex((t) => t.id === coaching.id) : -1
  /* Dos disparadores abren la misma hoja: el botón flotante (AppShell) y el
     ítem del menú (Sidebar.tsx). Este estado es lo que los conecta. */
  const [confibotAbierto, setConfibotAbierto] = useState(false)
  const [fabsDePagina, setFabsDePagina] = useState(0)

  function showOnScreen(topicId: string) {
    const tema = TOPICS.find((t) => t.id === topicId)
    if (!tema) return
    navigate(tema.page ?? MODULE_PAGE[tema.module])
    setCoachingId(topicId)
  }

  return (
    <HelpContext.Provider
      value={{
        showOnScreen,
        explicando: coaching !== null,
        confibotAbierto,
        openConfibot: () => setConfibotAbierto(true),
        toggleConfibot: () => setConfibotAbierto((v) => !v),
        closeConfibot: () => setConfibotAbierto(false),
        fabDePagina: fabsDePagina > 0,
        setFabsDePagina,
      }}
    >
      {children}
      {coaching && (
        <CoachMark
          coaching={{ ...coaching, index: indice, total: hermanos.length }}
          onPrev={indice > 0 ? () => setCoachingId(hermanos[indice - 1].id) : undefined}
          onNext={indice < hermanos.length - 1 ? () => setCoachingId(hermanos[indice + 1].id) : undefined}
          onClose={() => setCoachingId(null)}
          onBackToHelp={() => { setCoachingId(null); navigate('/help') }}
        />
      )}
    </HelpContext.Provider>
  )
}
`})))()}export{n,i as r,r as t};