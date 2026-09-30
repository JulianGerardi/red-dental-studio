import { BrowserRouter, HashRouter } from 'react-router-dom'
import { PatientsProvider } from '@/data/patientsStore'
import { NotificacionesProvider } from '@/data/notificacionesStore'
import { Toaster } from '@/components/ui/toaster'
import { HelpProvider } from '@/components/help/HelpProvider'
import { AppRoutes } from '@/AppRoutes'

/* El build de una sola página (artifact) no tiene servidor que resuelva rutas,
   así que ahí se usa HashRouter. En dev sigue siendo BrowserRouter. */
const Router = import.meta.env.VITE_HASH_ROUTER ? HashRouter : BrowserRouter

export default function App() {
  return (
    <PatientsProvider>
      <Toaster />
      <Router>
        <HelpProvider>
          <NotificacionesProvider>
            <AppRoutes />
          </NotificacionesProvider>
        </HelpProvider>
      </Router>
    </PatientsProvider>
  )
}
