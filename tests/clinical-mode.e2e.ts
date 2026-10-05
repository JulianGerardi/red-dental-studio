import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Clinical Mode, el flujo que más se tocó: cargar un procedimiento desde DentAssmt con el drawer de tres pasos. */

test('la app abre en el dashboard', async ({ app, screen }) => {
  await app.open('/')
  await expect(screen.getByRole('link', /patients/i).first()).toBeVisible()
})

test('Add Procedure carga un D0120 desde DentAssmt', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'DentAssmt').first().tap()
  await screen.getByRole('button', 'Add Procedure').tap()

  const drawer = screen.getByRole('dialog', 'New Procedure')
  await expect(drawer).toBeVisible()
  await drawer.getByRole('button', /^D0120\s*-/).first().tap()
  // Sin superficie: de Procedure pasa directo a Link to finding.
  await drawer.getByRole('button', /Next Step/).tap()
  await expect(drawer.getByText('Link to finding').first()).toBeVisible()
  await drawer.getByRole('button', /^Save/).tap()

  await expect(screen.getByText(/D0120 charted as planned/)).toBeVisible()
})

test('Surfaces aparece sólo con un procedimiento de diente + superficie', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'DentAssmt').first().tap()
  await screen.getByRole('button', 'Add Procedure').tap()

  const drawer = screen.getByRole('dialog', 'New Procedure')
  await drawer.getByRole('button', 'D2140 on surface').tap()
  await drawer.getByRole('button', /Next Step/).tap()
  await expect(drawer.getByText('Apply to unset')).toBeVisible()
  await expect(drawer.getByRole('button', /Next Step/)).toBeDisabled()
  await drawer.getByRole('checkbox', 'Occlusal').tap()
  await drawer.getByRole('button', /Next Step/).tap()
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/D2140 charted as planned/)).toBeVisible()
})

test('Existing no tiene Link to finding: sin superficie se guarda en un paso', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'DentAssmt').first().tap()
  await screen.getByRole('button', 'Add Condition').tap()

  const drawer = screen.getByRole('dialog', 'New Condition')
  await drawer.getByRole('button', 'D2740 on tooth').tap()
  await expect(drawer.getByRole('button', /Next Step/)).toHaveCount(0)
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/D2740 charted as existing/)).toBeVisible()
})
