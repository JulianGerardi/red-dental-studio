import { createContext, useContext, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { TOPICS, MODULE_PAGE } from './topics'
import { CoachMark } from './CoachMark'

/* Vive en la raíz de la app -no adentro de AppShell- porque algunos temas
   (Clinical Mode) navegan a una ruta que vive fuera del shell, y el
   CoachMark tiene que sobrevivir ese salto. Ver
   design-reference/figma/modulos/help.md. */
const HelpContext = createContext<{
  showOnScreen: (topicId: string) => void
  confibotAbierto: boolean
  toggleConfibot: () => void
  closeConfibot: () => void
} | null>(null)

export function useHelp() {
  const ctx = useContext(HelpContext)
  if (!ctx) throw new Error('useHelp must be used inside HelpProvider')
  return ctx
}

export function HelpProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [coachingId, setCoachingId] = useState<string | null>(null)
  const coaching = coachingId ? (TOPICS.find((t) => t.id === coachingId) ?? null) : null
  const hermanos = coaching ? TOPICS.filter((t) => t.module === coaching.module) : []
  const indice = coaching ? hermanos.findIndex((t) => t.id === coaching.id) : -1
  /* El Confibot ya no flota solo sobre la pantalla -tapaba otros botones
     flotantes, como el de Appointment requests en Scheduling-: el disparador
     vive en el menú (ver Sidebar.tsx) y este estado es lo único que los
     conecta. */
  const [confibotAbierto, setConfibotAbierto] = useState(false)

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
        confibotAbierto,
        toggleConfibot: () => setConfibotAbierto((v) => !v),
        closeConfibot: () => setConfibotAbierto(false),
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
