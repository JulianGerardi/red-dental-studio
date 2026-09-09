/* Navegación de Settings. Vive acá porque la usan dos lugares: el menú
   flotante del sidebar principal y el layout de la sección. */
export type SettingsNavItem = {
  to: string
  label: string
  /** Nombre del icono en el mapa de Settings.tsx. */
  icon: string
  children?: { to: string; label: string }[]
}

export const SETTINGS_NAV: SettingsNavItem[] = [
  { to: '/settings/general', label: 'General', icon: 'house' },
  { to: '/settings/account', label: 'Account', icon: 'user-cog' },
  { to: '/settings/accounts', label: 'Accounts', icon: 'user-cog' },
  { to: '/settings/locations', label: 'Locations', icon: 'building' },
  { to: '/settings/team', label: 'Employees', icon: 'users' },
  { to: '/settings/roles', label: 'Roles', icon: 'shield-check' },
  { to: '/settings/parameters', label: 'Parameters', icon: 'sliders' },
  {
    to: '/settings/finance', label: 'Billing', icon: 'credit-card',
    children: [
      { to: '/settings/finance/fee-schedule', label: 'Fee Schedules' },
      { to: '/settings/finance/carriers', label: 'Carriers' },
      { to: '/settings/finance/coverage-table', label: 'Coverage Table' },
    ],
  },
  { to: '/settings/ledger', label: 'Ledger', icon: 'credit-card' },
  { to: '/settings/libraries', label: 'Libraries', icon: 'library' },
  { to: '/settings/patient-portal', label: 'Patient Portal', icon: 'circle-user' },
  { to: '/settings/security', label: 'Security', icon: 'lock' },
  { to: '/settings/preferences', label: 'Preferences', icon: 'sliders' },
]
