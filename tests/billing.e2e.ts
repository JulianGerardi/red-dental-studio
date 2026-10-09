import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Billing: resumen de la clínica y vista de un paciente. Ver design-reference/figma/modulos/billing.md. */

test('Elegir un paciente muestra sólo lo suyo, Patient / Guarantor View y los botones; la X vuelve al resumen', async ({ app, screen }) => {
  await app.open('/billing')
  await expect(screen.getByRole('button', /Patient Payment/)).toHaveCount(0)
  await expect(screen.getByText(/Showing 1 to 10 of 15 entries/)).toBeVisible()

  const maria = screen.getByRole('button', /Maria Abril Viola/)
  await maria.tap()
  await expect(maria).toHaveAttribute('aria-current', 'true')
  await expect(screen.getByRole('heading', 'Maria Abril Viola — Recent Billing Activity')).toBeVisible()
  await expect(screen.getByText(/Patient · Guarantor: John Hayes/)).toBeVisible()
  await expect(screen.getByRole('button', /Patient Payment/)).toBeVisible()
  await expect(screen.getByText(/Showing 1 to 2 of 2 entries/)).toBeVisible()

  await screen.getByRole('tab', 'Guarantor View').tap()
  await expect(screen.getByText(/Showing 1 to 8 of 8 entries/)).toBeVisible()

  await screen.getByRole('button', 'Clear selected patient').tap()
  await expect(screen.getByRole('heading', 'Recent Billing Activity')).toBeVisible()
  await expect(screen.getByRole('button', /Patient Payment/)).toHaveCount(0)
  await expect(screen.getByText(/Showing 1 to 10 of 15 entries/)).toBeVisible()
  await expect(maria).not.toHaveAttribute('aria-current')
})

test('En el resumen, una fila abre la vista de ese paciente en Patient View', async ({ app, screen }) => {
  await app.open('/billing')
  await screen.getByRole('row', /Brent Crosby/).first().tap()
  await expect(screen.getByRole('heading', 'Brent Crosby — Recent Billing Activity')).toBeVisible()
  await expect(screen.getByRole('tab', 'Patient View')).toHaveAttribute('aria-selected', 'true')
  await expect(screen.getByText(/Showing 1 to 3 of 3 entries/)).toBeVisible()
})
