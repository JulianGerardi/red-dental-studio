import { BrowserRouter, HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import Login from '@/pages/Login'
import ForgotPassword from '@/pages/ForgotPassword'
import Dashboard from '@/pages/Dashboard'
import Patients from '@/pages/Patients'
import EditPatientPage from '@/pages/patients/EditPatient'
import Treatments from '@/pages/patients/Treatments'
import PatientDocuments from '@/pages/patients/Documents'
import Relationships from '@/pages/patients/Relationships'
import Insurance from '@/pages/patients/Insurance'
import Ledger from '@/pages/patients/Ledger'
import AddRelationship from '@/pages/patients/AddRelationship'
import PatientDetail from '@/pages/PatientDetail'
import ClinicalMode from '@/pages/ClinicalMode'
import NotFound from '@/pages/NotFound'
import { PatientsProvider } from '@/data/patientsStore'
import { Toaster } from '@/components/ui/toaster'
import Scheduling from '@/pages/Scheduling'
import Billing from '@/pages/Billing'
import UnderConstruction from '@/pages/UnderConstruction'
import { SettingsLayout, SettingsGeneral, SettingsPlaceholder } from '@/pages/Settings'
import { SettingsLocations } from '@/pages/settings/Locations'
import { SettingsLocationDetail } from '@/pages/settings/LocationDetail'
import { SettingsNewLocation } from '@/pages/settings/NewLocation'
import { SettingsEmployees, SettingsEmployeeDetail } from '@/pages/settings/Employees'
import { SettingsNewEmployee } from '@/pages/settings/NewEmployee'
import { SettingsAccounts } from '@/pages/settings/Accounts'
import { SettingsLedgerOptions } from '@/pages/settings/LedgerOptions'
import Help from '@/pages/Help'
import { HelpProvider } from '@/components/help/HelpProvider'

const SETTINGS_PLACEHOLDERS = [
  'roles', 'parameters',
  'finance', 'finance/fee-schedule', 'finance/carriers', 'finance/coverage-table',
  'libraries', 'patient-portal', 'security', 'preferences',
]

/* El build de una sola página (artifact) no tiene servidor que resuelva rutas,
   así que ahí se usa HashRouter. En dev sigue siendo BrowserRouter. */
const Router = import.meta.env.VITE_HASH_ROUTER ? HashRouter : BrowserRouter

export default function App() {
  return (
    <PatientsProvider>
    <Toaster />
    <Router>
      <HelpProvider>
      <Routes>
        {/* Auth, fuera del shell */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Clinical Mode es un takeover: no usa el app shell */}
        <Route path="/patients/:id/clinical-mode" element={<ClinicalMode />} />

        <Route element={<AppShell />}>
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          {/* Antes de patients/:id, si no "edit" se toma como un id. */}
          <Route path="patients/edit" element={<EditPatientPage />} />
          <Route path="patients/:id" element={<PatientDetail />} />
          <Route path="patients/:id/treatments" element={<Treatments />} />
          <Route path="patients/:id/documents" element={<PatientDocuments />} />
          <Route path="patients/:id/insurance" element={<Insurance />} />
          <Route path="patients/:id/ledger" element={<Ledger />} />
          <Route path="patients/:id/relationships" element={<Relationships />} />
          <Route path="patients/:id/relationships/new" element={<AddRelationship />} />
          <Route path="scheduling" element={<Scheduling />} />
          <Route path="billing" element={<Billing />} />

          {/* Las tres comparten el mismo placeholder en el original.
              /reports va al mismo sitio: en el original es un monitor de latencia
              interno ("API Monitor"), no una pantalla de producto. */}
          {['message', 'contacts', 'documents', 'reports'].map((p) => (
            <Route key={p} path={p} element={<UnderConstruction />} />
          ))}
          <Route path="help" element={<Help />} />

          <Route path="settings" element={<SettingsLayout />}>
            <Route index element={<Navigate to="/settings/general" replace />} />
            <Route path="general" element={<SettingsGeneral />} />
            <Route path="locations" element={<SettingsLocations />} />
            <Route path="locations/new" element={<SettingsNewLocation />} />
            <Route path="locations/:locId" element={<SettingsLocationDetail />} />
            <Route path="team" element={<SettingsEmployees />} />
            <Route path="team/new" element={<SettingsNewEmployee />} />
            <Route path="team/:employeeId" element={<SettingsEmployeeDetail />} />
            <Route path="accounts" element={<SettingsAccounts />} />
            <Route path="ledger" element={<SettingsLedgerOptions />} />
            {SETTINGS_PLACEHOLDERS.map((p) => (
              <Route key={p} path={p} element={<SettingsPlaceholder />} />
            ))}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      </HelpProvider>
    </Router>
    </PatientsProvider>
  )
}
