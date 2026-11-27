import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Breadcrumb y título van de la mano: en toda pantalla con rastro, el H1 dice lo mismo que el último tramo, en todas
   sus pestañas. Ver design-reference/figma/README.md, "Breadcrumb y título" (2026-11-27). */
const PANTALLAS: [ruta: string, titulo: string][] = [
  ['/patients/john-smith', 'John Smith'],
  ['/patients/john-smith/edit', 'Edit patient'],
  ['/patients/john-smith/treatments', 'Treatments'],
  ['/patients/john-smith/documents', 'Documents'],
  ['/patients/john-smith/insurance', 'Insurance'],
  ['/patients/john-smith/ledger', 'Ledger'],
  ['/patients/john-smith/relationships', 'Relationships & billing'],
  ['/settings/account', 'Account'],
  ['/settings/locations', 'Locations'],
  ['/settings/locations/abril', 'Abril'],
  ['/settings/team', 'Employees'],
  ['/settings/team/elena-martinez', 'Elena Martinez'],
  ['/settings/roles', 'Roles'],
  ['/settings/roles/new', 'New role'],
  ['/settings/consents', 'Consents'],
  ['/settings/preferences', 'Preferences'],
  ['/settings/ledger', 'Ledger'],
  ['/settings/finance/fee-schedule/ucr-red/edit', 'Billing'],
  ['/settings/finance/fee-schedule/new', 'New fee schedule'],
  ['/settings/finance/carriers', 'Billing'],
  ['/settings/finance/carriers/aetna/edit', 'Aetna Dental Plans'],
  ['/settings/finance/coverage-table/standard-ppo/edit', 'Billing'],
  ['/settings/finance/coverage-table/new', 'New coverage table'],
]

const escapar = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

test('el título de cada pantalla con breadcrumb es su último tramo', async ({ app, screen }) => {
  for (const [ruta, titulo] of PANTALLAS) {
    await app.open(ruta)
    await expect(screen.getByRole('navigation', 'Breadcrumb')).toHaveText(new RegExp(`(^|/)\\s*${escapar(titulo)}$`))
    await expect(screen.getByRole('heading', titulo, { level: 1 })).toHaveCount(1)
  }
})

test('en la ficha de una locación y de un empleado el título no cambia con la pestaña', async ({ app, screen }) => {
  await app.open('/settings/locations/abril')
  await screen.getByRole('tab', 'Working hours').tap()
  await expect(screen.getByRole('heading', 'Abril', { level: 1 })).toHaveCount(1)
  await app.open('/settings/team/elena-martinez')
  await screen.getByRole('tab', 'Roles & location').tap()
  await expect(screen.getByRole('heading', 'Elena Martinez', { level: 1 })).toHaveCount(1)
})

test('el editor de una lista con editor se titula con el ítem elegido', async ({ app, screen }) => {
  await app.open('/settings/consents')
  await expect(screen.getByRole('heading', 'Extraction Informed Consent', { level: 2 }).first()).toBeVisible()
  await app.open('/settings/finance/fee-schedule/ucr-red/edit')
  await expect(screen.getByRole('heading', 'UCR - Red', { level: 2 })).toBeVisible()
})
