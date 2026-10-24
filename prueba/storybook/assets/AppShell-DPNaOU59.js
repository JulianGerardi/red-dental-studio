import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useContext, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { NotificationBanner } from './NotificationBanner'
import { Confibot, ConfibotLanzador, useConfibotRecogido } from '@/components/help/Confibot'
import { useHelp } from '@/components/help/HelpProvider'
import { delBanner, useNotificaciones } from '@/data/notificacionesStore'
import { aviso } from '@/components/ui/toaster'
import { PatientInSessionPopup } from '@/components/patients/PatientInSessionPopup'
import { NavigationPreview } from './navigation-preview'

export function AppShell() {
  const [expanded, setExpanded] = useState(useContext(NavigationPreview).expanded ?? false)
  const { pathname } = useLocation()
  const { showOnScreen, explicando, confibotAbierto, openConfibot, closeConfibot, fabDePagina } = useHelp()
  const [confibotRecogido, setConfibotRecogido] = useConfibotRecogido()

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
          notificaciones={notis.items}
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
        {/* \`clip\`, no \`hidden\`: hidden vuelve a <main> contenedor de scroll y deja sin efecto todo sticky de adentro.
            El pb reserva el alto del botón flotante de Confibot: lo que cae al pie de una página (Cancel/Save,
            paginación) se puede scrollear por encima de él. El pr (desde sm) reserva el ancho de la pestaña
            "Currently being seen" (PatientInSessionPopup, 54px, fija al borde derecho): de 640 a ~1500px el
            contenido llegaba hasta ese borde y la pestaña quedaba encima de kebabs y filas reales. Primero eran 64px
            (sm:pr-16), después 40px (sm:pr-10): los dos de más, porque CONTENEDOR_PAGINA/ANCHO_PAGINA ya ponen
            24-32px propios de margen (px-6/px-8) entre el contenido real y ese borde, y el extra se sumaba arriba en
            vez de contarlo -quedaba una franja vacía más ancha que cualquier otro margen de la app (Julián,
            2026-10-22 y 2026-10-24, con un mockup en Figma de cómo tiene que verse: el mismo padding que el resto de
            la página, sin hueco raro). Bajado a 24px (sm:pr-6) -el mismo que ya pone CONTENEDOR_PAGINA/ANCHO_PAGINA
            del otro lado-: sumado a esos 24-32px existentes alcanza para que los 54px de la pestaña no lleguen a
            tocar ningún kebab ni fila real -reverificado sin superposición en los mismos anchos de la auditoría de
            tablet y de escritorio-, y ya no se nota como un padding aparte. Ver figma/README.md › Responsive. */}
        <main className="bg-page-background flex-1 overflow-x-clip pb-24 sm:pr-6 sm:pb-28">
          <Outlet />
        </main>
      </div>
      {/* Activo en toda la app, no sólo en Patients -Julián lo pidió así: quiere
          saber quién está en el sillón esté donde esté navegando-. ClinicalMode
          queda afuera igual porque ese layout no pasa por AppShell. */}
      <PatientInSessionPopup />
      {/* Mientras habla la hoja de chat o un CoachMark, que ocupan su esquina, el botón no se dibuja. */}
      {!confibotAbierto && !explicando && (
        <ConfibotLanzador
          recogido={confibotRecogido}
          sobreFab={fabDePagina}
          onAbrir={openConfibot}
          onRecoger={() => setConfibotRecogido(true)}
          onTraer={() => setConfibotRecogido(false)}
        />
      )}
      <Confibot abierto={confibotAbierto} onClose={closeConfibot} onShowOnScreen={showOnScreen} />
    </div>
  )
}
`})))()}export{n,i as r,r as t};