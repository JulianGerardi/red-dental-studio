import type { Decorator } from '@storybook/react-vite'
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
