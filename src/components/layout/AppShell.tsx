import { useContext, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { NotificationBanner } from './NotificationBanner'
import { Confibot } from '@/components/help/Confibot'
import { useHelp } from '@/components/help/HelpProvider'
import { delBanner, useNotificaciones } from '@/data/notificacionesStore'
import { aviso } from '@/components/ui/toaster'
import { PatientInSessionPopup } from '@/components/patients/PatientInSessionPopup'
import { NavigationPreview } from './navigation-preview'

export function AppShell() {
  const [expanded, setExpanded] = useState(useContext(NavigationPreview).expanded ?? false)
  const { pathname } = useLocation()
  const { showOnScreen, confibotAbierto, closeConfibot } = useHelp()

  /* Las notificaciones viven en su store (data/notificacionesStore): tienen
     que sobrevivir a la navegación y las comparten el banner, la campana y
     la pantalla Notifications.

     La X del banner **no borra**: sólo la saca del banner. La tarea sigue
     pendiente y sigue en la campana, que es donde vive; desde ahí se la
     puede volver a poner en el banner. Borrarla de verdad implicaría dar
     por hecha una tarea que nadie completó. */
  const notis = useNotificaciones()
  const [cursor, setCursor] = useState(0)

  const enBanner = delBanner(notis.items, notis.ocultas)

  const ocultarDelBanner = (id: string) => {
    notis.ocultarDelBanner(id)
    /* Recorta el cursor para que nunca apunte a una que ya no se muestra. */
    setCursor((c) => Math.min(c, Math.max(0, enBanner.length - 2)))
    aviso.info('Moved to notifications.')
  }

  const volverAlBanner = (id: string) => {
    notis.volverAlBanner(id)
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
          notificaciones={notis.items.filter((n) => !n.archivada)}
          ocultasDelBanner={notis.ocultas}
          onVolverAlBanner={volverAlBanner}
          onAbrirNotificacion={notis.abrir}
          onMarcarTodasLeidas={() => notis.marcar(notis.items.filter((n) => n.estado === 'unread').map((n) => n.id), 'read')}
        />
        <NotificationBanner
          items={enBanner}
          cursor={Math.min(cursor, Math.max(0, enBanner.length - 1))}
          onCursor={setCursor}
          onOcultar={ocultarDelBanner}
        />
        {/* `clip`, no `hidden`: hidden vuelve a <main> contenedor de scroll y deja sin efecto todo sticky de adentro. */}
        <main className="bg-page-background flex-1 overflow-x-clip">
          <Outlet />
        </main>
      </div>
      {/* Activo en toda la app, no sólo en Patients -Julián lo pidió así: quiere
          saber quién está en el sillón esté donde esté navegando-. ClinicalMode
          queda afuera igual porque ese layout no pasa por AppShell. */}
      <PatientInSessionPopup />
      <Confibot abierto={confibotAbierto} onClose={closeConfibot} onShowOnScreen={showOnScreen} />
    </div>
  )
}
