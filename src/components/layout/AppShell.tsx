import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { NotificationBanner } from './NotificationBanner'
import { Confibot } from '@/components/help/Confibot'
import { useHelp } from '@/components/help/HelpProvider'
import { NOTIFICACIONES } from '@/data/notificaciones'
import { aviso } from '@/components/ui/toaster'

export function AppShell() {
  const [expanded, setExpanded] = useState(false)
  const { pathname } = useLocation()
  const { showOnScreen, confibotAbierto, closeConfibot } = useHelp()

  /* Las notificaciones viven acá y no en cada pantalla: son tareas del
     usuario, tienen que sobrevivir a la navegación y las comparten el
     banner y la campana.

     La X del banner **no borra**: sólo la saca del banner. La tarea sigue
     pendiente y sigue en la campana, que es donde vive; desde ahí se la
     puede volver a poner en el banner. Borrarla de verdad implicaría dar
     por hecha una tarea que nadie completó. */
  const [ocultasDelBanner, setOcultas] = useState<string[]>([])
  const [cursor, setCursor] = useState(0)

  const enBanner = NOTIFICACIONES.filter((n) => !ocultasDelBanner.includes(n.id))

  const ocultarDelBanner = (id: string) => {
    setOcultas((p) => [...p, id])
    /* Recorta el cursor para que nunca apunte a una que ya no se muestra. */
    setCursor((c) => Math.min(c, Math.max(0, enBanner.length - 2)))
    aviso.info('Moved to notifications.')
  }

  const volverAlBanner = (id: string) => {
    setOcultas((p) => p.filter((x) => x !== id))
    setCursor(0)
  }

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
          notificaciones={NOTIFICACIONES}
          ocultasDelBanner={ocultasDelBanner}
          onVolverAlBanner={volverAlBanner}
        />
        <NotificationBanner
          items={enBanner}
          cursor={Math.min(cursor, Math.max(0, enBanner.length - 1))}
          onCursor={setCursor}
          onOcultar={ocultarDelBanner}
        />
        <main className="bg-page-background flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
      <Confibot abierto={confibotAbierto} onClose={closeConfibot} onShowOnScreen={showOnScreen} />
    </div>
  )
}
