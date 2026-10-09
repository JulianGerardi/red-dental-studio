import type { Meta, StoryObj } from '@storybook/react-vite'
import { PantallaReal } from './pantalla'

/* Cada pantalla de la app, montada con las mismas rutas y providers que en
   producción (src/AppRoutes.tsx). `npm run ds:coverage` avisa si una ruta
   nueva no aparece acá. */
const Pantalla = ({ ruta }: { ruta: string }) => <PantallaReal ruta={ruta} />

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
export const PatientTreatments = pantalla(`${P}/treatments`)
export const PatientDocuments = pantalla(`${P}/documents`)
export const PatientInsurance = pantalla(`${P}/insurance`)
export const PatientLedger = pantalla(`${P}/ledger`)
export const PatientRelationships = pantalla(`${P}/relationships`)
export const AddRelationship = pantalla(`${P}/relationships/new`)
export const EditPatient = pantalla('/patients/edit')
export const ClinicalMode = pantalla(`${P}/clinical-mode`)
export const Scheduling = pantalla('/scheduling')
export const Billing = pantalla('/billing')
export const Help = pantalla('/help')
export const Notifications = pantalla('/notifications')
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
export const SettingsBilling = pantalla('/settings/finance')
export const SettingsFeeSchedules = pantalla('/settings/finance/fee-schedule')
export const SettingsNewFeeSchedule = pantalla('/settings/finance/fee-schedule/new')
export const SettingsEditFeeSchedule = pantalla('/settings/finance/fee-schedule/ucr-red/edit')
export const SettingsFeeScheduleRedirect = pantalla('/settings/finance/fee-schedule/ppo-premium')
export const SettingsCarriers = pantalla('/settings/finance/carriers')
export const SettingsNewCarrier = pantalla('/settings/finance/carriers/new')
export const SettingsCarrierRedirect = pantalla('/settings/finance/carriers/aetna')
export const SettingsEditCarrier = pantalla('/settings/finance/carriers/aetna/edit')
export const SettingsCarrierPlans = pantalla('/settings/finance/carriers/aetna/edit/insurance-plans')
export const SettingsNewInsurancePlan = pantalla('/settings/finance/carriers/aetna/edit/insurance-plans/new')
export const SettingsEditInsurancePlan = pantalla('/settings/finance/carriers/aetna/edit/insurance-plans/acme-ppo/edit')
export const SettingsInsurancePlanCoverage = pantalla('/settings/finance/carriers/aetna/edit/insurance-plans/acme-ppo/edit?section=coverage-table')
export const SettingsCoverageTables = pantalla('/settings/finance/coverage-table')
export const SettingsNewCoverageTable = pantalla('/settings/finance/coverage-table/new')
export const SettingsEditCoverageTable = pantalla('/settings/finance/coverage-table/standard-ppo/edit')
export const SettingsCoverageTableRedirect = pantalla('/settings/finance/coverage-table/premium-ppo')
export const SettingsPlaceholder = pantalla('/settings/roles')
