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

/* Aplicar los horarios a otros días: reemplazo y citas afectadas (figma/modulos/locations.md, 2026-11-16). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cargarDomingo = async (panel: any) => {
  await panel.getByRole('button', '00:00 hs').first().tap()
  await panel.getByRole('button', '10:00 hs').tap()
  await panel.getByRole('button', '00:00 hs').tap()
  await panel.getByRole('button', '14:00 hs').tap()
}

test('El día de origen no se puede sacar y el reemplazo nombra los días Open con otro horario', async ({ app, screen }) => {
  await app.open('/settings/locations/abril?type=working-hours')
  await screen.getByRole('switch', 'Sunday open').tap()
  const panel = screen.getByRole('dialog', 'Set working hours')
  await cargarDomingo(panel)
  /* El día de origen queda elegido y no se puede sacar. */
  await expect(panel.getByRole('button', 'Sunday')).toHaveAttribute('aria-pressed', 'true')
  await expect(panel.getByRole('button', 'Sunday')).toHaveAttribute('aria-disabled', 'true')
  await panel.getByRole('button', 'Monday').tap()
  await panel.getByRole('button', 'Tuesday').tap()
  await panel.getByRole('button', /^Save/).tap()

  const aviso = screen.getByRole('dialog', 'Replace working hours?')
  await expect(aviso.getByText(/replace the existing working hours for Monday and Tuesday\./)).toBeVisible()
  /* Cancel vuelve al panel con lo cargado y no guarda nada. */
  await aviso.getByRole('button', 'Cancel').tap()
  await expect(panel.getByRole('button', '10:00 hs')).toBeVisible()
  await expect(screen.getByText(/Hours saved/)).toHaveCount(0)
})

test('Un día Closed no entra en el reemplazo', async ({ app, screen }) => {
  await app.open('/settings/locations/abril?type=working-hours')
  await screen.getByRole('switch', 'Tuesday open').tap()
  await screen.getByRole('switch', 'Sunday open').tap()
  const panel = screen.getByRole('dialog', 'Set working hours')
  await cargarDomingo(panel)
  await panel.getByRole('button', 'Monday').tap()
  await panel.getByRole('button', 'Tuesday').tap()
  await panel.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/working hours for Monday\./)).toBeVisible()
})

test('Las citas Proposed / Booked fuera del horario se resuelven antes de guardar', async ({ app, screen }) => {
  await app.open('/settings/locations/abril?type=working-hours')
  await screen.getByRole('switch', 'Sunday open').tap()
  const panel = screen.getByRole('dialog', 'Set working hours')
  await cargarDomingo(panel)
  await panel.getByRole('button', 'Monday').tap()
  await panel.getByRole('button', 'Tuesday').tap()
  await panel.getByRole('button', /^Save/).tap()
  await screen.getByRole('dialog', 'Replace working hours?').getByRole('button', 'Confirm').tap()

  await expect(screen.getByText(/scheduled appointments assigned to this location/)).toBeVisible()
  await expect(screen.getByText('Affected Appointments (4)')).toBeVisible()
  /* Una se resuelve a mano: ya no va a la lista de espera. */
  await screen.getByRole('button', 'Change status for John Smith').tap()
  await screen.getByRole('button', 'Cancelled').tap()
  await expect(screen.getByText('3 appointments will move to the waiting list when you confirm.')).toBeVisible()
  await screen.getByRole('button', /^Confirm/).tap()
  await expect(screen.getByText(/Hours saved for 3 days\. 3 appointments moved to the waiting list\./)).toBeVisible()
  await expect(screen.getByRole('switch', 'Sunday open')).toHaveAttribute('aria-checked', 'true')
})

test('Cancel en la resolución de citas vuelve al panel sin guardar', async ({ app, screen }) => {
  await app.open('/settings/locations/abril?type=working-hours')
  await screen.getByRole('switch', 'Sunday open').tap()
  const panel = screen.getByRole('dialog', 'Set working hours')
  await cargarDomingo(panel)
  await panel.getByRole('button', 'Monday').tap()
  await panel.getByRole('button', /^Save/).tap()
  await screen.getByRole('dialog', 'Replace working hours?').getByRole('button', 'Confirm').tap()
  await screen.getByRole('button', 'Cancel').tap()
  await expect(screen.getByRole('dialog', 'Set working hours').getByRole('button', '10:00 hs')).toBeVisible()
  await expect(screen.getByText(/Hours saved/)).toHaveCount(0)
})
