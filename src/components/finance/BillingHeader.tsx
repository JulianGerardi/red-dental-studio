import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { TabLinks } from '@/components/ui/tabs'
import { SETTINGS_NAV } from '@/data/settings-nav'

/* Las tres secciones de Billing, las mismas del menú de Settings. */
export const SECCIONES_BILLING = SETTINGS_NAV.find((n) => n.to === '/settings/finance')?.children ?? []

/* Encabezado de Billing: título, la acción de la sección y debajo Fee schedules · Carriers · Coverage tables, para pasar
   de una a otra sin abrir el menú (como Ledger options). Ver settings-billing.md, 2026-11-26. */
export function BillingHeader({ accion, children }: {
  accion?: ReactNode
  /** Buscador y filtros de la sección, en la fila de abajo. */
  children?: ReactNode
}) {
  const { pathname } = useLocation()
  const actual = SECCIONES_BILLING.find((s) => pathname === s.to || pathname.startsWith(`${s.to}/`))?.to
  return (
    <>
      <SettingsPageHeader titulo="Billing" accion={accion} />
      <TabLinks className="mt-5" aria-label="Billing sections" items={SECCIONES_BILLING} actual={actual} />
      {children && <div className="mt-4 flex flex-wrap items-center gap-3">{children}</div>}
    </>
  )
}
