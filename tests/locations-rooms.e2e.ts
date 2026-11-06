import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Settings → Locations → Rooms (CON-404, CON-1520). Ver design-reference/figma/modulos/locations.md. */

test('New Room pide Name y Type, y no deja repetir el nombre', async ({ app, screen }) => {
  await app.open('/settings/locations/abril?type=rooms')
  await screen.getByRole('button', 'New Room').tap()
  const drawer = screen.getByRole('dialog', 'New Room')
  await drawer.getByRole('button', /^Save/).tap()
  await expect(drawer.getByText('This field is required.')).toHaveCount(2)

  await drawer.getByPlaceholder('Operatory 1').fill('operatory 2')
  await drawer.getByRole('button', 'Select a type').tap()
  await drawer.getByRole('button', 'Operatory').tap()
  await drawer.getByRole('button', /^Save/).tap()
  await expect(drawer.getByText('Name already exists.')).toBeVisible()

  await drawer.getByPlaceholder('Operatory 1').fill('Operatory 4')
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText('Operatory 4 was added to Rooms.')).toBeVisible()
  await expect(screen.getByRole('switch', 'Operatory 4 active')).toBeVisible()
})

test('Desactivar una sala con turnos los muestra y los pasa a la lista de espera', async ({ app, screen }) => {
  await app.open('/settings/locations/abril?type=rooms')
  await screen.getByRole('switch', 'Operatory 1 active').tap()
  const aviso = screen.getByRole('dialog', 'This room has scheduled appointments')
  await expect(aviso.getByText('Affected Appointments (3)')).toBeVisible()
  await aviso.getByRole('button', 'Confirm').tap()
  await expect(screen.getByText(/3 appointments moved to the waiting list/)).toBeVisible()

  /* Una sala sin turnos se desactiva directo. */
  await screen.getByRole('switch', 'Operatory 3 active').tap()
  await expect(screen.getByText('Operatory 3 is now inactive.')).toBeVisible()
})
