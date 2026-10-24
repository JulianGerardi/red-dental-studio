import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
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
import PatientDetail from '@/pages/PatientDetail'
import ClinicalMode from '@/pages/ClinicalMode'
import NotFound from '@/pages/NotFound'
import Scheduling from '@/pages/Scheduling'
import Billing from '@/pages/Billing'
import UnderConstruction from '@/pages/UnderConstruction'
import { SettingsLayout, SettingsGeneral, SettingsPlaceholder } from '@/pages/Settings'
import { SettingsLocations } from '@/pages/settings/Locations'
import { SettingsLocationDetail } from '@/pages/settings/LocationDetail'
import { SettingsEmployees, SettingsEmployeeDetail } from '@/pages/settings/Employees'
import { SettingsAccounts } from '@/pages/settings/Accounts'
import { SettingsAccount } from '@/pages/settings/Account'
import { SettingsConsents } from '@/pages/settings/Consents'
import { SettingsLedgerOptions } from '@/pages/settings/LedgerOptions'
import { SettingsFeeSchedules, SettingsFeeScheduleEdit, SettingsNewFeeSchedule } from '@/pages/settings/finance/FeeSchedules'
import { SettingsCarriers, SettingsCarrierEdit } from '@/pages/settings/finance/Carriers'
import { SettingsInsurancePlan } from '@/pages/settings/finance/InsurancePlan'
import { SettingsCoverageTables, SettingsNewCoverageTable } from '@/pages/settings/finance/CoverageTables'
import { FinanzasProvider } from '@/data/finanzasStore'
import Help from '@/pages/Help'
import Notifications from '@/pages/Notifications'

const SETTINGS_PLACEHOLDERS = [
  'roles', 'parameters', 'libraries', 'patient-portal', 'security', 'preferences',
]

/* Las rutas de la app, separadas del router y los providers para que el design
   system pueda montar cada pantalla en un MemoryRouter. */
export function AppRoutes() {
  return (
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
        <Route path="patients/:id/relationships/new" element={<Relationships nuevo />} />
        <Route path="scheduling" element={<Scheduling />} />
        <Route path="billing" element={<Billing />} />

        {/* Las tres comparten el mismo placeholder en el original.
            /reports va al mismo sitio: en el original es un monitor de latencia
            interno ("API Monitor"), no una pantalla de producto. */}
        {['message', 'contacts', 'documents', 'reports'].map((p) => (
          <Route key={p} path={p} element={<UnderConstruction />} />
        ))}
        <Route path="help" element={<Help />} />
        <Route path="notifications" element={<Notifications />} />

        {/* El store de Billing envuelve todo Settings: el breadcrumb lee de ahí el nombre de un carrier o un fee schedule. */}
        <Route path="settings" element={<FinanzasProvider><SettingsLayout /></FinanzasProvider>}>
          <Route index element={<Navigate to="/settings/general" replace />} />
          <Route path="general" element={<SettingsGeneral />} />
          <Route path="locations" element={<SettingsLocations />} />
          <Route path="locations/new" element={<SettingsLocations nuevo />} />
          <Route path="locations/:locId" element={<SettingsLocationDetail />} />
          <Route path="team" element={<SettingsEmployees />} />
          <Route path="team/new" element={<SettingsEmployees nuevo />} />
          <Route path="team/:employeeId" element={<SettingsEmployeeDetail />} />
          <Route path="accounts" element={<SettingsAccounts />} />
          <Route path="accounts/:accountId" element={<SettingsAccount />} />
          <Route path="account" element={<SettingsAccount />} />
          <Route path="consents" element={<SettingsConsents />} />
          <Route path="ledger" element={<SettingsLedgerOptions />} />
          {/* Settings → Billing, con las rutas de red.dev. Ver figma/modulos/settings-billing.md. */}
          <Route path="finance" element={<Navigate to="/settings/finance/fee-schedule" replace />} />
          <Route path="finance/fee-schedule" element={<SettingsFeeSchedules />} />
          <Route path="finance/fee-schedule/new" element={<SettingsNewFeeSchedule />} />
          <Route path="finance/fee-schedule/:feeId/edit" element={<SettingsFeeScheduleEdit />} />
          <Route path="finance/fee-schedule/:feeId" element={<RedirigirAEdit />} />
          <Route path="finance/carriers" element={<SettingsCarriers />} />
          <Route path="finance/carriers/new" element={<SettingsCarriers nuevo />} />
          <Route path="finance/carriers/:carrierId" element={<RedirigirAEdit />} />
          <Route path="finance/carriers/:carrierId/edit" element={<SettingsCarrierEdit tab="carrier" />} />
          <Route path="finance/carriers/:carrierId/edit/insurance-plans" element={<SettingsCarrierEdit tab="plans" />} />
          <Route path="finance/carriers/:carrierId/edit/insurance-plans/new" element={<SettingsCarrierEdit tab="plans" nuevoPlan />} />
          <Route path="finance/carriers/:carrierId/edit/insurance-plans/:planId/edit" element={<SettingsInsurancePlan />} />
          <Route path="finance/coverage-table" element={<SettingsCoverageTables />} />
          <Route path="finance/coverage-table/new" element={<SettingsNewCoverageTable />} />
          <Route path="finance/coverage-table/:tableId/edit" element={<SettingsCoverageTables />} />
          <Route path="finance/coverage-table/:tableId" element={<RedirigirAEdit />} />
          {SETTINGS_PLACEHOLDERS.map((p) => (
            <Route key={p} path={p} element={<SettingsPlaceholder />} />
          ))}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

/* Las rutas de detalle de antes (sin /edit) van a la de red.dev. */
function RedirigirAEdit() {
  const { pathname } = useLocation()
  return <Navigate to={`${pathname.replace(/\/$/, '')}/edit`} replace />
}
