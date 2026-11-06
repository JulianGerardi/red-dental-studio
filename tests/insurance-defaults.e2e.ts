import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Location → Insurance Defaults (epic CON-1173) y los bloqueos de CON-4031 / CON-4032. Ver
   design-reference/figma/modulos/insurance-defaults.md. */

test('Insurance Defaults: valores iniciales, perfil específico obligatorio y guardado', async ({ app, screen }) => {
  await app.open('/settings/locations/abril')
  await screen.getByRole('tab', 'Insurance Defaults').tap()
  await expect(screen.getByRole('radio', 'Provider of Procedures').first()).toHaveAttribute('aria-checked', 'true')
  await expect(screen.getByText('Office — 11')).toBeVisible()

  await screen.getByRole('radio', 'Specific Billing Profile').tap()
  await screen.getByRole('button', 'Save changes').tap()
  await expect(screen.getByText('Select a billing profile before saving.')).toBeVisible()

  await screen.getByText('Select a billing profile').first().tap()
  await screen.getByRole('radio', /Bayside Dental Group/).tap()
  await screen.getByRole('button', 'Select profile').tap()
  await screen.getByRole('button', 'Save changes').tap()
  await expect(screen.getByText('Insurance defaults saved.')).toBeVisible()
  await expect(screen.getByText('Unsaved changes')).toHaveCount(0)
})

test('Primary Provider elegido en Insurance Defaults no se desactiva', async ({ app, screen }) => {
  await app.open('/settings/team/sarah-stone')
  await screen.getByRole('tab', 'Provider Info').tap()
  await screen.getByRole('switch').first().tap()
  await screen.getByRole('button', 'Save').tap()
  await expect(screen.getByRole('dialog', 'Unable to deactivate Primary Provider')).toBeVisible()
  await expect(screen.getByText('Bayside Dental — Alternate Rendering Provider')).toBeVisible()
})

test('Billing Profile elegido en Insurance Defaults no se deshabilita y lleva a los defaults', async ({ app, screen }) => {
  await app.open('/settings/locations/bayside')
  await screen.getByRole('tab', 'Insurance / Billing Profile').tap()
  await screen.getByRole('switch', 'Use this Location as a Billing Provider').tap()
  await expect(screen.getByRole('dialog', 'Unable to disable billing profile')).toBeVisible()
  await screen.getByText('Bayside Dental — Specific Billing Profile').tap()
  await expect(screen.getByRole('heading', 'Insurance Defaults')).toBeVisible()
  await expect(screen.getByText('Bayside Dental Group')).toBeVisible()
})
