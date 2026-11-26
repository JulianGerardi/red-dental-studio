import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`/* Navegación de Settings. Vive acá porque la usan dos lugares: el menú
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
  { to: '/settings/general', label: 'Overview', icon: 'house' },
  /* Una clínica ve sólo su cuenta: Account abre Edit Account, como en la app real (video de Julián, 2026-11-20). La
     lista de cuentas (Accounts overview) se fue; /settings/accounts redirige acá. Ver settings-accounts.md. */
  { to: '/settings/account', label: 'Account', icon: 'user-cog' },
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
      { to: '/settings/finance/fee-schedule', label: 'Fee schedules' },
      { to: '/settings/finance/carriers', label: 'Carriers' },
      { to: '/settings/finance/coverage-table', label: 'Coverage tables' },
    ],
  },
  { to: '/settings/ledger', label: 'Ledger', icon: 'credit-card' },
  { to: '/settings/preferences', label: 'Preferences', icon: 'sliders' },
]
`})))()}export{r as n,n as r,i as t};