import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Overview del paciente: Pending Task arriba de Pending documents a la izquierda y Appointments en la columna de la
   derecha, con 7 turnos a la vista. Ver design-reference/figma/modulos/patient-dashboard.md (2026-10-17). */

test('Pending Task arriba de Pending documents y Appointments a la derecha', async ({ app, screen }) => {
  await app.open('/patients/1')
  const tareas = await screen.getByRole('heading', 'Pending Task').boundingBox()
  const docs = await screen.getByRole('heading', 'Pending documents').boundingBox()
  const turnos = await screen.getByRole('heading', 'Appointments').boundingBox()
  expect(tareas && docs && turnos).toBeTruthy()
  expect(docs!.y).toBeGreaterThan(tareas!.y)
  expect(Math.abs(docs!.x - tareas!.x)).toBeLessThan(2)
  expect(turnos!.x).toBeGreaterThan(tareas!.x + 400)
  expect(Math.abs(turnos!.y - tareas!.y)).toBeLessThan(20)
  await expect(screen.getByText('Routine cleaning appointment')).toHaveCount(7)
  await expect(screen.getByRole('button', /Show \d+ more/)).toHaveCount(2)
})
