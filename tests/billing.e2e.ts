import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Billing: el paciente elegido queda marcado en Find Patient y en sus filas. Ver design-reference/figma/modulos/billing.md. */

test('Elegir un paciente lo deja en celeste en Find Patient y en sus filas, y la X lo suelta', async ({ app, screen }) => {
  await app.open('/billing')
  await expect(screen.getByRole('row', { selected: true })).toHaveCount(0)

  const maria = screen.getByRole('button', /Maria Abril Viola/)
  await maria.tap()
  await expect(maria).toHaveAttribute('aria-current', 'true')
  await expect(screen.getByText(/Selected patient:/)).toBeVisible()
  await expect(screen.getByRole('row', { selected: true })).toHaveCount(2)

  await screen.getByRole('row', /Brent Crosby/).first().tap()
  await expect(screen.getByRole('button', /Brent Crosby/)).toHaveAttribute('aria-current', 'true')
  await expect(maria).not.toHaveAttribute('aria-current')
  await expect(screen.getByRole('row', { selected: true })).toHaveCount(1)

  await screen.getByRole('button', 'Clear selected patient').tap()
  await expect(screen.getByRole('row', { selected: true })).toHaveCount(0)
  await expect(screen.getByText(/Selected patient:/)).toHaveCount(0)
})
