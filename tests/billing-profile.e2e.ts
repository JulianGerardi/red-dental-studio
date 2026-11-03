import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Insurance / Billing Profile de Location y de provider (CON-4004…4007, CON-4021…4028). Ver
   design-reference/figma/modulos/billing-profile.md. */

test('Location: se habilita sólo al guardar datos válidos, y deshabilitarla la deja de lectura', async ({ app, screen }) => {
  await app.open('/settings/locations/abril')
  await screen.getByRole('tab', 'Insurance / Billing Profile').tap()
  await expect(screen.getByText(/Set up this location's billing information/)).toBeVisible()

  await screen.getByRole('switch', 'Use this Location as a Billing Provider').tap()
  await screen.getByRole('button', 'Save and enable').tap()
  await expect(screen.getByText('Enter the 10-digit NPI.')).toBeVisible()

  await screen.getByPlaceholder('10 digits').fill('1234567890')
  await screen.getByPlaceholder('9 digits').fill('123456789')
  await screen.getByRole('button', 'Save and enable').tap()
  await expect(screen.getByText('Billing profile enabled.')).toBeVisible()
  await expect(screen.getByRole('heading', 'Contracted With')).toBeVisible()

  await screen.getByRole('checkbox', 'Aetna Dental Plans contracted').tap()
  await screen.getByRole('button', 'Save carrier contracts').tap()
  await expect(screen.getByText('1 contracted')).toBeVisible()

  await screen.getByRole('switch', 'Use this Location as a Billing Provider').tap()
  await screen.getByRole('button', 'Disable profile').tap()
  await expect(screen.getByText(/This billing profile is inactive and cannot be edited/)).toBeVisible()
  await expect(screen.getByRole('checkbox', 'Aetna Dental Plans contracted')).toBeDisabled()
  await expect(screen.getByText('1 contracted')).toBeVisible()
})

test('Provider: guardar Primary Provider prepara el perfil y suma la pestaña', async ({ app, screen }) => {
  await app.open('/settings/team/emily-chen')
  await expect(screen.getByRole('tab', 'Insurance / Billing Profile')).toHaveCount(0)
  await screen.getByRole('tab', 'Provider Info').tap()
  await screen.getByRole('switch').first().tap()
  await screen.getByRole('button', 'Save').tap()
  await screen.getByRole('tab', 'Insurance / Billing Profile').tap()
  await expect(screen.getByText('1588734420')).toBeVisible()
  await expect(screen.getByText('0 contracted')).toBeVisible()

  /* Salir con un contrato marcado sin guardar lo pregunta. */
  await screen.getByRole('checkbox', 'Cigna Dental contracted').tap()
  await screen.getByRole('tab', 'Employee').tap()
  await expect(screen.getByRole('dialog', 'Discard unsaved changes?')).toBeVisible()
  await screen.getByRole('button', 'Keep editing').tap()
  await screen.getByRole('button', 'Save carrier contracts').tap()
  await expect(screen.getByText('1 contracted')).toBeVisible()
})
