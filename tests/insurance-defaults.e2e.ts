import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Location → Insurance defaults (epic CON-1173) y los bloqueos de CON-4031 / CON-4032. Ver
   design-reference/figma/modulos/insurance-defaults.md. */

test('Insurance defaults: valores iniciales, perfil específico obligatorio y guardado', async ({ app, screen }) => {
  await app.open('/settings/locations/abril')
  await screen.getByRole('tab', 'Insurance defaults').tap()
  await expect(screen.getByRole('radio', 'Provider of procedures').first()).toHaveAttribute('aria-checked', 'true')
  await expect(screen.getByText('Office — 11')).toBeVisible()

  await screen.getByRole('radio', 'Specific billing profile').tap()
  await screen.getByRole('button', 'Save changes').tap()
  await expect(screen.getByText('Select a billing profile before saving.')).toBeVisible()

  await screen.getByRole('button', 'Select Billing profile').tap()
  await screen.getByRole('radio', /Bayside Dental Group/).tap()
  await screen.getByRole('button', 'Select profile').tap()
  await expect(screen.getByRole('button', 'Change Billing profile')).toBeVisible()

  await screen.getByRole('radio', 'Specific provider').tap()
  await screen.getByRole('button', 'Select Rendering provider').tap()
  await screen.getByRole('radio', /Elena Martinez/).tap()
  await screen.getByRole('button', 'Select provider').tap()
  await screen.getByRole('button', 'Save changes').tap()
  await expect(screen.getByText('Insurance defaults saved.')).toBeVisible()
  await expect(screen.getByText('Unsaved changes')).toHaveCount(0)
})

test('Primary provider elegido en Insurance defaults no se desactiva', async ({ app, screen }) => {
  await app.open('/settings/team/sarah-stone')
  await screen.getByRole('tab', 'Provider info').tap()
  await screen.getByRole('switch').first().tap()
  await screen.getByRole('button', 'Save').tap()
  await expect(screen.getByRole('dialog', 'Unable to deactivate primary provider')).toBeVisible()
  await expect(screen.getByText('Bayside Dental — Alternate rendering provider')).toBeVisible()
})

test('Billing profile elegido en Insurance defaults no se deshabilita y lleva a los defaults', async ({ app, screen }) => {
  await app.open('/settings/locations/bayside')
  await screen.getByRole('tab', 'Insurance / billing profile').tap()
  await screen.getByRole('switch', 'Use this location as a billing provider').tap()
  await expect(screen.getByRole('dialog', 'Unable to disable billing profile')).toBeVisible()
  await screen.getByText('Bayside Dental — Specific billing profile').tap()
  await expect(screen.getByRole('tab', 'Insurance defaults', { selected: true })).toBeVisible()
  await expect(screen.getByText('Bayside Dental Group')).toBeVisible()
})
