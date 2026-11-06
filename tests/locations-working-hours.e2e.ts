import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Settings → Locations → Working Hours (CON-1546). Ver design-reference/figma/modulos/locations.md (2026-11-06). */

test('Activar un día cerrado abre el panel y Cancel lo deja Closed', async ({ app, screen }) => {
  await app.open('/settings/locations/abril?type=working-hours')
  await screen.getByRole('switch', 'Sunday open').tap()
  const panel = screen.getByRole('dialog', 'Set working hours')
  await expect(panel.getByText('Apply change to')).toHaveCount(0)
  await panel.getByRole('button', 'Cancel').tap()
  await expect(screen.getByRole('switch', 'Sunday open')).toHaveAttribute('aria-checked', 'false')
})

test('Open se guarda sólo con horas válidas y en todos los días elegidos', async ({ app, screen }) => {
  await app.open('/settings/locations/abril?type=working-hours')
  await screen.getByRole('switch', 'Sunday open').tap()
  const panel = screen.getByRole('dialog', 'Set working hours')
  await panel.getByRole('button', /^Save/).tap()
  await expect(panel.getByText('Required.')).toHaveCount(2)

  await panel.getByRole('button', '00:00 hs').first().tap()
  await panel.getByRole('button', '10:00 hs').tap()
  await panel.getByRole('button', '00:00 hs').tap()
  await panel.getByRole('button', '09:00 hs').tap()
  await expect(panel.getByText('Start time must be earlier than end time.')).toBeVisible()

  await panel.getByRole('button', '09:00 hs').tap()
  await panel.getByRole('button', '14:00 hs').tap()
  await panel.getByRole('button', 'Saturday').tap()
  await panel.getByRole('button', /^Save/).tap()
  await expect(screen.getByText('Hours saved for 2 days.')).toBeVisible()
  await expect(screen.getByRole('switch', 'Sunday open')).toHaveAttribute('aria-checked', 'true')
  await expect(screen.getByRole('switch', 'Saturday open')).toHaveAttribute('aria-checked', 'true')
  await expect(screen.getByText('10:00 AM - 02:00 PM')).toHaveCount(2)
})
