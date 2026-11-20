import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Edit appointment desde el detalle del turno (CON-3249): drawer en pestañas, sin pasos, con el turno cargado y Save changes
   (design-reference/figma/modulos/scheduling.md, 2026-11-17). */

test('un turno se edita desde su detalle, sin pasos', async ({ app, screen }) => {
  await app.open('/scheduling')
  await screen.getByRole('button', /Noah James Smith/).first().tap()
  await screen.getByRole('dialog', /Appointment details for Noah James Smith/).getByRole('button', 'Edit appointment').tap()

  const drawer = screen.getByRole('dialog', 'Edit appointment')
  await expect(drawer.getByRole('button', /Next step/)).toHaveCount(0)
  await expect(drawer.getByRole('tab', 'General')).toHaveAttribute('aria-selected', 'true')
  await drawer.getByRole('tab', 'Schedule').tap()
  await drawer.getByRole('button', 'Operatory 3').tap()
  await drawer.getByRole('button', 'Operatory 1').tap()
  await drawer.getByRole('button', /Save changes/).tap()
  await expect(screen.getByText(/Appointment for Noah James Smith updated/)).toBeVisible()

  await screen.getByRole('button', /Noah James Smith/).first().tap()
  await expect(screen.getByRole('dialog', /Appointment details for Noah James Smith/).getByText('Operatory 1')).toBeVisible()
})

test('un turno cerrado no se edita', async ({ app, screen }) => {
  await app.open('/scheduling')
  await screen.getByRole('button', /Elias Aguirre/).first().tap()
  const detalle = screen.getByRole('dialog', /Appointment details for Elias Aguirre/)
  await expect(detalle.getByRole('button', 'Edit appointment')).toHaveAttribute('aria-disabled', 'true')
})

test('al guardar con un obligatorio vacío, lleva a su pestaña y la marca', async ({ app, screen }) => {
  await app.open('/scheduling')
  await screen.getByRole('button', /Noah James Smith/).first().tap()
  await screen.getByRole('dialog', /Appointment details for Noah James Smith/).getByRole('button', 'Edit appointment').tap()
  const drawer = screen.getByRole('dialog', 'Edit appointment')
  await drawer.getByRole('button', 'Remove Primary provider').tap()
  await drawer.getByRole('tab', 'Additional').tap()
  await drawer.getByRole('button', /Save changes/).tap()
  await expect(drawer.getByRole('tab', /General/)).toHaveAttribute('aria-selected', 'true')
  await expect(drawer.getByText('This field is required.')).toBeVisible()
})

/* El nombre del paciente en el detalle del turno lleva a su ficha, como red.dev (scheduling.md, 2026-11-19). */
test('el nombre del paciente en el detalle del turno abre su ficha', async ({ app, screen }) => {
  await app.open('/scheduling')
  await screen.getByRole('button', /Noah James Smith/).first().tap()
  await screen.getByRole('dialog', /Appointment details for Noah James Smith/).getByRole('link', 'Noah James Smith').tap()
  await expect(screen.getByRole('link', 'Patients').first()).toBeVisible()
})
