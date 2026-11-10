import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Breadcrumbs (Julián, 2026-10-13): las pantallas del paciente llevan Patients › paciente › sección; las de primer nivel
   (Patients, Billing…) no llevan. Ver design-reference/figma/modulos/patient-dashboard.md. */

test('El rastro del paciente vuelve al Overview y a la lista; Patients y Billing no llevan', async ({ app, screen }) => {
  await app.open('/patients/john-smith/ledger')
  const migas = screen.getByRole('navigation', 'Breadcrumb')
  await expect(migas.getByRole('link', 'Patients')).toBeVisible()
  await expect(migas.getByText('Ledger')).toBeVisible()
  await expect(migas.getByRole('link', 'Ledger')).toHaveCount(0)

  await migas.getByRole('link', 'John Smith').tap()
  await expect(screen.getByRole('button', 'Allergies 4')).toBeVisible()
  await expect(migas.getByRole('link', 'John Smith')).toHaveCount(0)
  await expect(migas.getByText('John Smith')).toBeVisible()

  await migas.getByRole('link', 'Patients').tap()
  await expect(screen.getByRole('heading', 'Patients')).toBeVisible()
  await expect(screen.getByRole('navigation', 'Breadcrumb')).toHaveCount(0)

  await app.open('/billing')
  await expect(screen.getByRole('heading', 'Billing')).toBeVisible()
  await expect(screen.getByRole('navigation', 'Breadcrumb')).toHaveCount(0)
})

test('Edit Patient cuelga del paciente', async ({ app, screen }) => {
  await app.open('/patients/edit')
  const migas = screen.getByRole('navigation', 'Breadcrumb')
  await expect(migas.getByRole('link', 'John Smith')).toBeVisible()
  await expect(migas.getByText('Edit Patient')).toBeVisible()
})

/* Insurance llena el alto que deja el menú y scrollea adentro, como Treatments, Ledger y Documents (Julián,
   2026-10-30: había quedado desactualizada, el bloque entero empujaba la página y el menú scrolleaba con él). */
test('Insurance scrollea adentro, sin mover el menú del paciente', async ({ app, screen }) => {
  await app.open('/patients/john-smith/insurance')
  const region = screen.getByRole('region', 'Insurance')
  await expect(region).toBeVisible()
  await expect(screen.getByRole('link', 'Treatments')).toBeVisible()

  await region.swipe({ direction: 'up', momentum: 'fast' })
  await expect(screen.getByRole('link', 'Treatments')).toBeVisible()
  await expect(screen.getByText('Patient Information')).toBeVisible()
})

/* Pending Signature es un estado del botón de encuentro, en el lugar de Start Encounter (patient-dashboard.md,
   2026-11-10). */
test('El botón de encuentro pasa a Pending Signature desde sus opciones', async ({ app, screen }) => {
  await app.open('/patients/1')
  await screen.getByRole('button', 'Encounter options').tap()
  await screen.getByRole('button', /Pending Signature/).tap()
  await expect(screen.getByRole('button', /Pending Signature/)).toBeVisible()
  await expect(screen.getByRole('button', /Start Enconter/)).toHaveCount(0)
})
