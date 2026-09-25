import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Decorator } from '@storybook/react-vite'
import { PatientsProvider } from '@/data/patientsStore'
import { HelpProvider } from '@/components/help/HelpProvider'

/* Providers que algunos componentes esperan en la raíz de la app. */
export const conHelp: Decorator = (Story) => (
  <HelpProvider>
    <Story />
  </HelpProvider>
)

export const conPacientes: Decorator = (Story) => (
  <PatientsProvider>
    <Story />
  </PatientsProvider>
)
`})))()}export{n,i as r,r as t};