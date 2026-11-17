import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Edit appointment desde el detalle del turno (CON-3249): drawer sin pasos, con el turno cargado y Save Changes
   (design-reference/figma/modulos/scheduling.md, 2026-11-17). */

test('un turno se edita desde su detalle, sin pasos', async ({ app, screen }) => {
  await app.open('/scheduling')
  await screen.getByRole('button', /Noah James Smith/).first().tap()
  await screen.getByRole('dialog', /Appointment details for Noah James Smith/).getByRole('button', 'Edit appointment').tap()

  const drawer = screen.getByRole('dialog', 'Edit Appointment')
  await expect(drawer.getByText('Link to treatment plan visit')).toBeVisible()
  await expect(drawer.getByRole('button', /Next Step/)).toHaveCount(0)
  await drawer.getByRole('button', 'Operatory 3').tap()
  await drawer.getByRole('button', 'Operatory 1').tap()
  await drawer.getByRole('button', /Save Changes/).tap()
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
