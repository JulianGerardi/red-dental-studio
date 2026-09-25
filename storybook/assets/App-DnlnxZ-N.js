import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { BrowserRouter, HashRouter } from 'react-router-dom'
import { PatientsProvider } from '@/data/patientsStore'
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
          <AppRoutes />
        </HelpProvider>
      </Router>
    </PatientsProvider>
  )
}
`})))()}export{n,i as r,r as t};