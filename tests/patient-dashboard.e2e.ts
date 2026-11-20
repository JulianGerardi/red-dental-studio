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

test('Edit patient cuelga de la tabla, no del dashboard del paciente', async ({ app, screen }) => {
  await app.open('/patients/john-smith/edit')
  const migas = screen.getByRole('navigation', 'Breadcrumb')
  await expect(migas.getByRole('link', 'Patients')).toBeVisible()
  await expect(migas.getByRole('link', 'John Smith')).toHaveCount(0)
  await expect(migas.getByText('Edit patient')).toBeVisible()
  await screen.getByRole('button', 'Cancel').tap()
  await expect(screen.getByRole('heading', 'Patients')).toBeVisible()
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
  await expect(screen.getByRole('heading', 'Patient information')).toBeVisible()
})

/* Pending signature: el encuentro terminó y la Clinical note quedó sin firmar. Ocupa el lugar del botón de encuentro,
   sin desplegable, y se va al firmar (patient-dashboard.md, 2026-11-10). */
test('Pending signature aparece al dejar la Clinical note sin firmar y se va al firmarla', async ({ app, screen }) => {
  await app.open('/patients/1')
  await expect(screen.getByRole('button', /Pending signature/)).toHaveCount(0)
  await screen.getByRole('link', 'Clinical Mode').tap()
  // Encuentro de CON-1612: se empieza y se completa (clinical-mode.md, 2026-11-13).
  await screen.getByRole('button', /Start encounter/).first().tap()
  await screen.getByRole('button', /Complete encounter/).first().tap()
  await screen.getByRole('button', 'Remind me later').tap()
  await screen.getByRole('link', 'Exit Clinical Mode').tap()

  await expect(screen.getByRole('button', /Pending signature/)).toBeVisible()
  await expect(screen.getByRole('button', /Start encounter/)).toHaveCount(0)
  await expect(screen.getByRole('button', 'Encounter options')).toHaveCount(0)

  await screen.getByRole('button', /Pending signature/).tap()
  await screen.getByRole('button', 'Review and sign').tap()
  await expect(screen.getByRole('button', /Pending signature/)).toHaveCount(0)
  await expect(screen.getByRole('button', /Start encounter/)).toBeVisible()
})

/* Algunos pacientes arrancan con la Clinical note sin firmar, para ver Pending signature sin hacer el flujo
   (patient-dashboard.md, 2026-11-10). */
test('Los pacientes con la nota sin firmar arrancan con Pending signature', async ({ app, screen }) => {
  await app.open('/patients/patient-0002')
  await expect(screen.getByRole('button', /Pending signature/)).toBeVisible()
  await expect(screen.getByRole('button', /Start encounter/)).toHaveCount(0)
})
