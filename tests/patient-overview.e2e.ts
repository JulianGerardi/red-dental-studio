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
  /* Ni Pending Task ni Pending documents llevan "Show N more": las dos cargan solas al scrollear, con la misma
     funcionalidad (patient-dashboard.md, 2026-10-28). Sólo Appointments, a la derecha, conserva el botón. */
  await expect(screen.getByRole('button', /Show \d+ more/)).toHaveCount(0)
})

/* Pending Task filtra por tipo con tabs, no con el Filter (Julián, 2026-10-29; antes era el embudo del Dashboard,
   dashboard.md 2026-08-28) y carga el resto al acercarse al final del scroll, sin botón (patient-dashboard.md,
   2026-10-28). */
test('Pending Task: tabs por tipo acotan la lista y el resto se ve scrolleando, sin botón', async ({ app, screen }) => {
  await app.open('/patients/1')
  await expect(screen.getByText('Complete this Task')).toHaveCount(9)
  await expect(screen.getByRole('tab', 'All (9)')).toBeVisible()

  const caja = screen.getByRole('region', 'All pending tasks')
  await expect(caja).toBeVisible()
  /* Dentro de esa caja no hay "Show more": a diferencia de Pending documents, que sí lo lleva. */
  await expect(caja.getByRole('button', /Show \d+ more/)).toHaveCount(0)

  await screen.getByRole('tab', /^Referrals/).tap()
  await expect(screen.getByText('Complete this Task')).toHaveCount(2)
  await expect(screen.getByText('Referrals · 2')).toBeVisible()

  await screen.getByRole('tab', /^All/).tap()
  await expect(screen.getByText('Complete this Task')).toHaveCount(9)

  await caja.swipe({ direction: 'up', momentum: 'fast' })
  await expect(screen.getByText('Complete this Task')).toHaveCount(9)
})

/* Pending documents carga igual que Pending Task (sin botón, misma caja scrolleable) y ahora filtra con las mismas
   tres categorías de urgencia que ya agrupaban la lista, como tabs (Julián, 2026-10-29; antes era All/Patient/Office). */
test('Pending documents: tabs por urgencia, la misma caja scrolleable que Pending Task, sin botón', async ({ app, screen }) => {
  await app.open('/patients/1')
  const caja = screen.getByRole('region', 'All pending documents')
  await expect(caja).toBeVisible()
  await expect(caja.getByRole('button', /Show \d+ more/)).toHaveCount(0)

  /* Arranca en Overdue (el primer grupo): sólo esos dos documentos. */
  await expect(screen.getByRole('tab', 'Overdue (2)')).toBeVisible()
  await expect(screen.getByText('Informed Consent – Periodontal treatment')).toBeVisible()
  await expect(screen.getByText('Notice of privacy practices (HIPAA)')).toHaveCount(0)

  await screen.getByRole('tab', /^Later/).tap()
  await expect(screen.getByText('Notice of privacy practices (HIPAA)')).toBeVisible()
  await expect(screen.getByText('Informed Consent – Periodontal treatment')).toHaveCount(0)

  await caja.swipe({ direction: 'up', momentum: 'fast' })
  await expect(screen.getByText('Panoramic X-ray from previous dentist')).toBeVisible()
})
