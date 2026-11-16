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

/* Aplicar el horario a otros días (2026-11-16): el de origen no se saca, pisar otro día abierto se pregunta. */
const sundayDe9a14 = async (screen: any) => {
  await screen.getByRole('switch', 'Sunday open').tap()
  const panel = screen.getByRole('dialog', 'Set working hours')
  await panel.getByRole('button', '00:00 hs').first().tap()
  await panel.getByRole('button', '09:00 hs').tap()
  await panel.getByRole('button', '00:00 hs').tap()
  await panel.getByRole('button', '14:00 hs').tap()
  return panel
}

test('El día de origen no se puede deseleccionar', async ({ app, screen }) => {
  await app.open('/settings/locations/abril?type=working-hours')
  const panel = await sundayDe9a14(screen)
  const sunday = panel.getByRole('button', 'Sunday (day being edited)')
  await expect(sunday).toHaveAttribute('aria-disabled', 'true')
  await expect(sunday).toHaveAttribute('aria-pressed', 'true')
})

test('Pisar días abiertos con otro horario pregunta y Cancel no guarda nada', async ({ app, screen }) => {
  await app.open('/settings/locations/abril?type=working-hours')
  const panel = await sundayDe9a14(screen)
  await panel.getByRole('button', 'Monday').tap()
  await panel.getByRole('button', 'Tuesday').tap()
  await panel.getByRole('button', /^Save/).tap()
  const pregunta = screen.getByRole('dialog', 'Replace working hours?')
  await expect(pregunta.getByText('This will replace the existing working hours for Monday and Tuesday. Do you want to continue?')).toBeVisible()
  await pregunta.getByRole('button', 'Cancel').tap()
  await expect(panel.getByRole('button', 'Monday')).toHaveAttribute('aria-pressed', 'true')
  await panel.getByRole('button', 'Cancel').tap()
  await expect(screen.getByRole('switch', 'Sunday open')).toHaveAttribute('aria-checked', 'false')
})

test('Un día cerrado no entra en la pregunta', async ({ app, screen }) => {
  await app.open('/settings/locations/abril?type=working-hours')
  const panel = await sundayDe9a14(screen)
  await panel.getByRole('button', 'Saturday').tap()
  await panel.getByRole('button', 'Wednesday').tap()
  await panel.getByRole('button', /^Save/).tap()
  await expect(screen.getByText('This will replace the existing working hours for Wednesday. Do you want to continue?')).toBeVisible()
})

test('Turnos fuera de las horas nuevas: se resuelven antes y Confirm pasa el resto a Waiting List', async ({ app, screen }) => {
  await app.open('/settings/locations/abril?type=working-hours')
  const panel = await sundayDe9a14(screen)
  await panel.getByRole('button', 'Monday').tap()
  await panel.getByRole('button', 'Tuesday').tap()
  await panel.getByRole('button', /^Save/).tap()
  await screen.getByRole('dialog', 'Replace working hours?').getByRole('button', 'Confirm').tap()

  const aviso = screen.getByRole('dialog', 'These hours affect scheduled appointments')
  await expect(aviso.getByText('Affected Appointments (2)')).toBeVisible()
  await screen.getByRole('button', 'Actions for appointment for John Smith').tap()
  await screen.getByRole('menuitem', 'Mark as No Show').tap()
  await expect(aviso.getByText('1 appointment will move to the waiting list.')).toBeVisible()
  await aviso.getByRole('button', 'Confirm').tap()

  await expect(screen.getByText('Hours saved for 3 days. 1 appointment was moved to the waiting list.')).toBeVisible()
  await expect(screen.getByText('09:00 AM - 02:00 PM')).toHaveCount(3)
})
