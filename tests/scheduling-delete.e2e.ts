import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Delete en el detalle del turno (CON-2990): sólo se borra un turno Proposed y antes se pregunta
   (design-reference/figma/modulos/scheduling.md, 2026-11-10). */

test('un turno Proposed se borra desde su detalle, con confirmación', async ({ app, screen }) => {
  await app.open('/scheduling')
  await screen.getByRole('button', /Sofia Chen/).first().tap()
  const detalle = screen.getByRole('dialog', /Appointment details for Sofia Chen/)
  await detalle.getByRole('button', 'Delete').tap()

  // Cancel deja el turno y el detalle como estaban.
  const pregunta = screen.getByRole('dialog', 'Delete Appointment')
  await expect(pregunta.getByText(/Sofia Chen's appointment on Wednesday, June 1, 2022, 11:00 AM – 12:00 PM/)).toBeVisible()
  await pregunta.getByRole('button', 'Cancel').tap()
  await expect(detalle).toBeVisible()

  await detalle.getByRole('button', 'Delete').tap()
  await screen.getByRole('dialog', 'Delete Appointment').getByRole('button', 'Delete').tap()
  await expect(screen.getByText("Sofia Chen's appointment was deleted.")).toBeVisible()
  await expect(screen.getByRole('button', /Sofia Chen/)).toHaveCount(0)
})

test('un turno que no está Proposed muestra Delete apagado', async ({ app, screen }) => {
  await app.open('/scheduling')
  await screen.getByRole('button', /Maria Abril Viola/).first().tap()
  const detalle = screen.getByRole('dialog', /Appointment details for Maria Abril Viola/)
  await expect(detalle.getByRole('button', 'Delete')).toHaveAttribute('aria-disabled', 'true')
  await expect(detalle.getByText('Only Proposed or Waiting List appointments can be deleted.')).toHaveCount(1)
})
