import type { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from '@/AppRoutes'
import { PatientsProvider } from '@/data/patientsStore'
import { NotificacionesProvider } from '@/data/notificacionesStore'
import { HelpProvider } from '@/components/help/HelpProvider'
import { Toaster } from '@/components/ui/toaster'

/* Una pantalla de la app, montada con las mismas rutas y providers que en
   producción (src/AppRoutes.tsx). `despues` se dibuja después de la pantalla,
   adentro del router: sirve para sincronizar estado una vez que la pantalla
   ya está escuchando. */
export function PantallaReal({ ruta, despues }: { ruta: string; despues?: ReactNode }) {
  return (
    <PatientsProvider>
      <Toaster />
      <MemoryRouter initialEntries={[ruta]}>
        <HelpProvider>
          <NotificacionesProvider>
            <AppRoutes />
            {despues}
          </NotificacionesProvider>
        </HelpProvider>
      </MemoryRouter>
    </PatientsProvider>
  )
}
