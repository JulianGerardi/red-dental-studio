import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { NotificationBanner } from './NotificationBanner'
import { Confibot } from '@/components/help/Confibot'
import { useHelp } from '@/components/help/HelpProvider'
import { NOTIFICACIONES } from '@/data/notificaciones'

export function AppShell() {
  const [expanded, setExpanded] = useState(false)
  const { pathname } = useLocation()
  const { showOnScreen } = useHelp()

  /* Las notificaciones viven acá y no en cada pantalla: son tareas del
     usuario, tienen que sobrevivir a la navegación y las comparten el
     banner y la campana. */
  const [pendientes, setPendientes] = useState(NOTIFICACIONES)
  const [cursor, setCursor] = useState(0)

  const descartar = (id: string) =>
    setPendientes((p) => {
      const quedan = p.filter((n) => n.id !== id)
      /* Recorta el cursor para que nunca apunte a una que ya no está. */
      setCursor((c) => Math.min(c, Math.max(0, quedan.length - 1)))
      return quedan
    })

  /* En mobile el sidebar es un panel encima del contenido: al navegar se
     cierra solo, si no queda tapando la pantalla a la que acabás de entrar. */
  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) setExpanded(false)
  }, [pathname])

  return (
    <div className="flex min-h-svh">
      <Sidebar expanded={expanded} onClose={() => setExpanded(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          expanded={expanded}
          onToggleSidebar={() => setExpanded((v) => !v)}
          notificaciones={pendientes}
          onDescartarNotificacion={descartar}
        />
        <NotificationBanner
          items={pendientes}
          cursor={Math.min(cursor, Math.max(0, pendientes.length - 1))}
          onCursor={setCursor}
          onDescartar={descartar}
        />
        {/* El Confibot vive fijo en la esquina inferior derecha, justo donde
            caen los Cancel/Save de los formularios. Se reserva su alto acá
            -una sola vez, en el shell- para que ningún control quede debajo. */}
        <main className="bg-page-background flex-1 overflow-x-hidden pb-24 sm:pb-28">
          <Outlet />
        </main>
      </div>
      <Confibot onShowOnScreen={showOnScreen} />
    </div>
  )
}
