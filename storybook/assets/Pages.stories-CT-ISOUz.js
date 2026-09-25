import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from '@/AppRoutes'
import { PatientsProvider } from '@/data/patientsStore'
import { HelpProvider } from '@/components/help/HelpProvider'
import { Toaster } from '@/components/ui/toaster'

/* Cada pantalla de la app, montada con las mismas rutas y providers que en
   producción (src/AppRoutes.tsx). \`npm run ds:coverage\` avisa si una ruta
   nueva no aparece acá. */
function Pantalla({ ruta }: { ruta: string }) {
  return (
    <PatientsProvider>
      <Toaster />
      <MemoryRouter initialEntries={[ruta]}>
        <HelpProvider>
          <AppRoutes />
        </HelpProvider>
      </MemoryRouter>
    </PatientsProvider>
  )
}

const meta = {
  title: 'Pages',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', router: false, options: { showPanel: false } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const pantalla = (ruta: string): Story => ({ render: () => <Pantalla ruta={ruta} /> })

const P = '/patients/patient-0001'

export const Login = pantalla('/login')
export const ForgotPassword = pantalla('/forgot-password')
export const Dashboard = pantalla('/')
export const Patients = pantalla('/patients')
export const PatientOverview = pantalla(P)
export const PatientTreatments = pantalla(\`\${P}/treatments\`)
export const PatientDocuments = pantalla(\`\${P}/documents\`)
export const PatientInsurance = pantalla(\`\${P}/insurance\`)
export const PatientLedger = pantalla(\`\${P}/ledger\`)
export const PatientRelationships = pantalla(\`\${P}/relationships\`)
export const AddRelationship = pantalla(\`\${P}/relationships/new\`)
export const EditPatient = pantalla('/patients/edit')
export const ClinicalMode = pantalla(\`\${P}/clinical-mode\`)
export const Scheduling = pantalla('/scheduling')
export const Billing = pantalla('/billing')
export const Help = pantalla('/help')
export const UnderConstruction = pantalla('/message')
export const NotFound = pantalla('/nope')
export const SettingsGeneral = pantalla('/settings/general')
export const SettingsLocations = pantalla('/settings/locations')
export const SettingsNewLocation = pantalla('/settings/locations/new')
export const SettingsLocationDetail = pantalla('/settings/locations/abril')
export const SettingsTeam = pantalla('/settings/team')
export const SettingsNewEmployee = pantalla('/settings/team/new')
export const SettingsEmployeeDetail = pantalla('/settings/team/elena-martinez')
export const SettingsAccounts = pantalla('/settings/accounts')
export const SettingsAccountDetail = pantalla('/settings/accounts/c3')
export const SettingsMyAccount = pantalla('/settings/account')
export const SettingsConsents = pantalla('/settings/consents')
export const SettingsLedgerOptions = pantalla('/settings/ledger')
export const SettingsPlaceholder = pantalla('/settings/roles')
`})))()}export{n,i as r,r as t};