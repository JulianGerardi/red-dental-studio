/* Navegación de Settings. Vive acá porque la usan dos lugares: el menú
   flotante del sidebar principal y el layout de la sección. */
export type SettingsNavItem = {
  to: string
  label: string
  /** Nombre del icono en el mapa de Settings.tsx. */
  icon: string
  children?: { to: string; label: string }[]
}

/* Las mismas secciones que el overview de Settings: sin Parameters, Libraries, Patient Portal ni Security
   (settings-accounts.md, 2026-11-19). */
export const SETTINGS_NAV: SettingsNavItem[] = [
  { to: '/settings/general', label: 'General', icon: 'house' },
  /* Un solo ítem acá: el Figma lo llama "Accounts" y antes había además un
     "Account" en singular que era un placeholder vacío. Dos entradas casi
     iguales en el mismo menú sólo hacen entrar a la que no es.
     "Account" (singular) ahora sí existe -/settings/account, la cuenta
     propia, con tabs Information/Subscription/Owner- pero a propósito no
     vive en esta lista: se llega por "Profile" en el menú de la cuenta
     (Topbar.tsx), no por acá, así que la ambigüedad no vuelve. */
  { to: '/settings/accounts', label: 'Accounts', icon: 'user-cog' },
  { to: '/settings/locations', label: 'Locations', icon: 'building' },
  { to: '/settings/team', label: 'Employees', icon: 'users' },
  { to: '/settings/roles', label: 'Roles', icon: 'shield-check' },
  /* Julián la pidió como "Settings → Templates → Consent Procedure", pero el
     breadcrumb del propio Figma (4106:170620) dice "Settings → Consents": se
     replica esa etiqueta, no la descripción verbal. */
  { to: '/settings/consents', label: 'Consents', icon: 'file-signature' },
  {
    to: '/settings/finance', label: 'Billing', icon: 'credit-card',
    children: [
      { to: '/settings/finance/fee-schedule', label: 'Fee Schedules' },
      { to: '/settings/finance/carriers', label: 'Carriers' },
      { to: '/settings/finance/coverage-table', label: 'Coverage Table' },
    ],
  },
  { to: '/settings/ledger', label: 'Ledger', icon: 'credit-card' },
  { to: '/settings/preferences', label: 'Preferences', icon: 'sliders' },
]
