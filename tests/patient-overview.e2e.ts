import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Overview del paciente: Pending documents arriba de Pending Task a la izquierda (2026-10-19; antes al revés) y
   Appointments en la columna de la derecha, con 7 turnos a la vista. Ver design-reference/figma/modulos/patient-dashboard.md. */

test('Pending documents arriba de Pending Task y Appointments a la derecha', async ({ app, screen }) => {
  await app.open('/patients/1')
  const tareas = await screen.getByRole('heading', 'Pending Task').boundingBox()
  const docs = await screen.getByRole('heading', 'Pending documents').boundingBox()
  const turnos = await screen.getByRole('heading', 'Appointments').boundingBox()
  expect(tareas && docs && turnos).toBeTruthy()
  expect(tareas!.y).toBeGreaterThan(docs!.y)
  expect(Math.abs(docs!.x - tareas!.x)).toBeLessThan(2)
  expect(turnos!.x).toBeGreaterThan(docs!.x + 400)
  expect(Math.abs(turnos!.y - docs!.y)).toBeLessThan(20)
  await expect(screen.getByText('Routine cleaning appointment')).toHaveCount(7)
  /* Pending Task ya no lleva "Show N more" (va con scroll, ver el test de abajo); sólo Pending documents lo
     conserva (patient-dashboard.md, 2026-10-28). */
  await expect(screen.getByRole('button', /Show \d+ more/)).toHaveCount(1)
})

/* Pending Task filtra por tipo con el mismo embudo que el Dashboard, en vez de tabs (dashboard.md, 2026-08-28) y
   carga el resto al acercarse al final del scroll, sin botón (patient-dashboard.md, 2026-10-28). */
test('Pending Task: Filter tasks acota por tipo y el resto se ve scrolleando, sin botón', async ({ app, screen }) => {
  await app.open('/patients/1')
  await expect(screen.getByText('Complete this Task')).toHaveCount(9)

  const caja = screen.getByRole('region', 'All pending tasks')
  await expect(caja).toBeVisible()
  /* Dentro de esa caja no hay "Show more": a diferencia de Pending documents, que sí lo lleva. */
  await expect(caja.getByRole('button', /Show \d+ more/)).toHaveCount(0)

  await screen.getByRole('button', /Filter tasks/).tap()
  await screen.getByRole('menuitemcheckbox', 'Referrals').tap()
  await screen.getByRole('menuitemcheckbox', 'Referrals').press('Escape')
  await expect(screen.getByText('Complete this Task')).toHaveCount(2)
  await expect(screen.getByText('Referrals · 2')).toBeVisible()

  await screen.getByRole('button', /Filter tasks \(1 applied\)/).tap()
  await screen.getByRole('button', 'Clear all').tap()
  /* "Clear all" desaparece apenas se toca (ya no hay filtros aplicados): Escape por el menú, no por ese botón. */
  await screen.getByRole('menu', 'Filter tasks').press('Escape')
  await expect(screen.getByText('Complete this Task')).toHaveCount(9)

  await caja.swipe({ direction: 'up', momentum: 'fast' })
  await expect(screen.getByText('Complete this Task')).toHaveCount(9)
})
