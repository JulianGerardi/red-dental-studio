import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Settings → Locations → Working hours (CON-1546). Ver design-reference/figma/modulos/locations.md (2026-11-06). */

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
  await expect(panel.getByText('This field is required.')).toHaveCount(2)

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
  /* Por el botón de quitar: la copia invisible que mide el ancho de las franjas no cuenta. */
  await expect(screen.getByRole('button', /^Remove 10:00 AM - 02:00 PM on/)).toHaveCount(2)
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

test('Turnos fuera de las horas nuevas: se resuelven antes y Confirm pasa el resto a Waiting list', async ({ app, screen }) => {
  await app.open('/settings/locations/abril?type=working-hours')
  const panel = await sundayDe9a14(screen)
  await panel.getByRole('button', 'Monday').tap()
  await panel.getByRole('button', 'Tuesday').tap()
  await panel.getByRole('button', /^Save/).tap()
  await screen.getByRole('dialog', 'Replace working hours?').getByRole('button', 'Confirm').tap()

  const aviso = screen.getByRole('dialog', 'Affected appointments')
  await expect(aviso.getByText('Appointments (2)', { exact: true })).toBeVisible()
  await screen.getByRole('button', 'Actions for appointment for John Smith').tap()
  await screen.getByRole('menuitem', 'Mark as no show').tap()
  /* La cita resuelta sale de la lista y el contador baja (CON-4167). */
  await expect(aviso.getByText('Appointments (1)', { exact: true })).toBeVisible()
  await expect(aviso.getByText('John Smith')).toHaveCount(0)
  await aviso.getByRole('button', 'Confirm').tap()

  await expect(screen.getByText('Hours saved for 3 days. 1 appointment was moved to the waiting list.')).toBeVisible()
  await expect(screen.getByRole('button', /^Remove 09:00 AM - 02:00 PM on/)).toHaveCount(3)
})

test('Si las franjas entran en la fila, no hay "+N"', async ({ app, screen }) => {
  await app.open('/settings/locations/abril?type=working-hours')
  await expect(screen.getByRole('button', /^Remove 08:15 PM - 09:00 PM on Monday/)).toBeVisible()
  await expect(screen.getByRole('button', /more hours on Monday/)).toHaveCount(0)
})

/* CON-4166: borrar una franja con la ✕ pregunta antes y sólo toca ese día. */
test('Borrar una franja pregunta, Cancel no borra y no toca la misma franja de otro día', async ({ app, screen }) => {
  await app.open('/settings/locations/abril?type=working-hours')
  await screen.getByRole('button', /^Remove 02:00 PM - 06:00 PM on Tuesday/).tap()
  const pregunta = screen.getByRole('dialog', 'Delete working hours?')
  await expect(pregunta.getByText('This will delete the working hours from 02:00 PM to 06:00 PM on Tuesday. Do you want to continue?')).toBeVisible()
  await pregunta.getByRole('button', 'Cancel').tap()
  await expect(screen.getByRole('button', /^Remove 02:00 PM - 06:00 PM on Tuesday/)).toBeVisible()

  await screen.getByRole('button', /^Remove 02:00 PM - 06:00 PM on Tuesday/).tap()
  await screen.getByRole('dialog', 'Delete working hours?').getByRole('button', 'Confirm').tap()
  await expect(screen.getByText('Working hours deleted from Tuesday.')).toBeVisible()
  await expect(screen.getByRole('button', /^Remove 02:00 PM - 06:00 PM on Tuesday/)).toHaveCount(0)
  await expect(screen.getByRole('button', /^Remove 02:00 PM - 06:00 PM on Monday/)).toBeVisible()
})

test('Borrar la última franja avisa que el día se cierra y pasa por las citas afectadas', async ({ app, screen }) => {
  await app.open('/settings/locations/abril?type=working-hours')
  await screen.getByRole('button', /^Remove 02:00 PM - 06:00 PM on Tuesday/).tap()
  await screen.getByRole('dialog', 'Delete working hours?').getByRole('button', 'Confirm').tap()
  await screen.getByRole('button', /^Remove 08:00 AM - 01:00 PM on Tuesday/).tap()
  const pregunta = screen.getByRole('dialog', 'Delete working hours?')
  await expect(pregunta.getByText(/Tuesday will be closed/)).toBeVisible()
  await pregunta.getByRole('button', 'Confirm').tap()

  const aviso = screen.getByRole('dialog', 'Affected appointments')
  await expect(aviso.getByText('Appointments (2)', { exact: true })).toBeVisible()
  await aviso.getByRole('button', 'Confirm').tap()
  await expect(screen.getByText('Working hours deleted from Tuesday. Tuesday is now closed. 2 appointments were moved to the waiting list.')).toBeVisible()
  await expect(screen.getByRole('switch', 'Tuesday open')).toHaveAttribute('aria-checked', 'false')
})

/* CON-4165: cerrar un día pregunta, conserva sus franjas y reabrirlo las trae al panel. */
test('Cerrar un día pregunta, conserva sus franjas y reabrirlo las recupera', async ({ app, screen }) => {
  await app.open('/settings/locations/abril?type=working-hours')
  await screen.getByRole('switch', 'Thursday open').tap()
  const pregunta = screen.getByRole('dialog', 'Close working hours?')
  await expect(pregunta.getByText('This will close the location every Thursday. Do you want to continue?')).toBeVisible()
  await pregunta.getByRole('button', 'Cancel').tap()
  await expect(screen.getByRole('switch', 'Thursday open')).toHaveAttribute('aria-checked', 'true')

  await screen.getByRole('switch', 'Thursday open').tap()
  await screen.getByRole('dialog', 'Close working hours?').getByRole('button', 'Confirm').tap()
  await expect(screen.getByText('Thursday is now closed.')).toBeVisible()
  await expect(screen.getByRole('switch', 'Thursday open')).toHaveAttribute('aria-checked', 'false')
  await expect(screen.getByRole('switch', 'Friday open')).toHaveAttribute('aria-checked', 'true')

  await screen.getByRole('switch', 'Thursday open').tap()
  const panel = screen.getByRole('dialog', 'Set working hours')
  await expect(panel.getByRole('button', '20:15 hs')).toBeVisible()
})

/* CON-4167: una cita afectada en Check in frena todo el cambio. */
test('Una cita en Check in bloquea el cambio y no se borra nada', async ({ app, screen }) => {
  await app.open('/settings/locations/abril?type=working-hours')
  await screen.getByRole('button', /^Remove 08:00 AM - 01:00 PM on Monday/).tap()
  await screen.getByRole('dialog', 'Delete working hours?').getByRole('button', 'Confirm').tap()
  const bloqueo = screen.getByRole('dialog', 'Unable to change working hours')
  await expect(bloqueo.getByText(/Check in or In progress status/)).toBeVisible()
  await bloqueo.getByRole('button', 'Close').tap()
  await expect(screen.getByRole('button', /^Remove 08:00 AM - 01:00 PM on Monday/)).toBeVisible()
})
