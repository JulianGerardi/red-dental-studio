import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Billing: resumen de la clínica y vista de un paciente. Ver design-reference/figma/modulos/billing.md. */

test('Elegir un paciente muestra sólo lo suyo, Patient / Guarantor view y los botones; la X vuelve al resumen', async ({ app, screen }) => {
  await app.open('/billing')
  await expect(screen.getByRole('button', /Patient payment/)).toHaveCount(0)
  await expect(screen.getByText(/Showing 1 to 8 of 21 results/)).toBeVisible()

  const maria = screen.getByRole('button', /Maria Abril Viola/)
  await maria.tap()
  await expect(maria).toHaveAttribute('aria-current', 'true')
  await expect(screen.getByRole('heading', 'Maria Abril Viola — Recent billing activity')).toBeVisible()
  await expect(screen.getByText(/Patient · Guarantor: John Hayes/)).toBeVisible()
  await expect(screen.getByRole('button', /Patient payment/)).toBeVisible()
  await expect(screen.getByText(/Showing 1 to 2 of 2 results/)).toBeVisible()

  await screen.getByRole('tab', 'Guarantor view').tap()
  await expect(screen.getByText(/Showing 1 to 8 of 8 results/)).toBeVisible()

  await screen.getByRole('button', 'Clear selected patient').tap()
  await expect(screen.getByRole('heading', 'Recent billing activity')).toBeVisible()
  await expect(screen.getByRole('button', /Patient payment/)).toHaveCount(0)
  await expect(screen.getByText(/Showing 1 to 8 of 21 results/)).toBeVisible()
  await expect(maria).not.toHaveAttribute('aria-current')
})

test('En el resumen, una fila abre la vista de ese paciente en Patient view', async ({ app, screen }) => {
  await app.open('/billing')
  await screen.getByRole('row', /Lucía Paz/).first().tap()
  await expect(screen.getByRole('heading', 'Lucía Paz — Recent billing activity')).toBeVisible()
  await expect(screen.getByRole('tab', 'Patient view')).toHaveAttribute('aria-selected', 'true')
  await expect(screen.getByText(/Showing 1 to 2 of 2 results/)).toBeVisible()
})

test('El círculo de info de un número explica qué cuenta', async ({ app, screen }) => {
  await app.open('/billing')
  await expect(screen.getByText(/Open charge balances older than 30 days/)).toHaveCount(0)
  await screen.getByRole('button', /^Overdue balance:/).hover()
  await expect(screen.getByText(/^Open charge balances older than 30 days\.$/)).toBeVisible()
})

/* Con un paciente elegido, cada fila se despliega con el detalle del Ledger: lo del cobro y la referencia que abre la
   transacción (billing.md, 2026-10-14). */
test('Con un paciente, la fila de un pago dice a qué cargo fue', async ({ app, screen }) => {
  await app.open('/billing')
  await screen.getByRole('button', /Maria Abril Viola/).tap()
  await screen.getByText(/^Card Payment ····5521$/).tap()

  await expect(screen.getByText('Applied to charges')).toBeVisible()
  await expect(screen.getByText('Payment methods')).toHaveCount(0)
  await screen.getByRole('button', /^Procedure · TX-2010/).tap()
  await expect(screen.getByRole('dialog', /Prophylaxis – adult/)).toBeVisible()
})

test('Billing en el menú lateral va directo a su pantalla; sus tablas están sólo en Settings', async ({ app, screen }) => {
  await app.open('/')
  await expect(screen.getByRole('button', 'Billing menu')).toHaveCount(0)
  await screen.getByRole('link', 'Billing').first().hover()
  await expect(screen.getByRole('link', 'Fee schedules')).toHaveCount(0)
  await screen.getByRole('link', 'Billing').first().tap()
  await expect(screen.getByRole('heading', 'Billing')).toBeVisible()

  await screen.getByRole('link', 'Settings').hover()
  await screen.getByRole('button', 'Billing options').tap()
  await screen.getByRole('link', 'Carriers').tap()
  await expect(screen.getByRole('heading', 'Carriers')).toBeVisible()
})

/* Find patient mide cuántas filas enteras entran en el alto de Recent billing activity (llenarAlto, no un número
   fijo: billing.md, 2026-10-19) y "Show N more" abre el resto con scroll adentro. */
test('Find patient muestra algunos pacientes y Show more abre el resto', async ({ app, screen }) => {
  await app.open('/billing')
  const filas = screen.getByRole('button', /Las payment/)
  const antes = await filas.count()
  expect(antes).toBeGreaterThan(0)
  await screen.getByRole('button', /^Show \d+ more/).tap()
  await expect(screen.getByRole('region', 'All patients')).toBeVisible()
  const despues = await filas.count()
  expect(despues).toBeGreaterThan(antes)
})

test('Filtros, Columns y Export CSV como red.dev', async ({ app, screen }) => {
  await app.open('/billing')
  /* El tipo se elige en el Filter de la app (billing.md, 2026-11-20). */
  const filtrar = async (tipo: string) => {
    await screen.getByRole('button', /Filter activity/).tap()
    await screen.getByRole('menuitemradio', new RegExp(`^${tipo}`)).tap()
  }
  await filtrar('Payments')
  await expect(screen.getByText(/Showing 1 to 8 of 9 results/)).toBeVisible()
  await filtrar('Adjustments')
  await expect(screen.getByText(/Showing 1 to 4 of 4 results/)).toBeVisible()
  await filtrar('Today')
  await expect(screen.getByText(/Showing 1 to 2 of 2 results/)).toBeVisible()
  await expect(screen.getByText(/Credit available · \$100\.00/)).toBeVisible()

  await expect(screen.getByRole('columnheader', 'Status')).toBeVisible()
  await screen.getByRole('button', /Columns/).tap()
  await screen.getByRole('menuitemcheckbox', 'Status').tap()
  await screen.getByRole('menuitemcheckbox', 'Status').press('Escape')
  await expect(screen.getByRole('columnheader', 'Status')).toHaveCount(0)

  await expect(screen.getByRole('button', /Export CSV/)).toBeEnabled()
  await screen.getByRole('button', /John Hayes/).first().tap()
  await expect(screen.getByRole('button', /Export CSV/)).toBeDisabled()
})

test('Cada botón abre su drawer, como red.dev, y lo posteado aparece en la tabla', async ({ app, screen }) => {
  await app.open('/billing')
  await screen.getByRole('button', /Maria Abril Viola/).first().tap()

  await screen.getByRole('button', /Charge adjustment \(\+\)/).tap()
  let drawer = screen.getByRole('dialog')
  await expect(drawer.getByRole('heading', 'Enter charge (+) adjustment')).toBeVisible()
  await drawer.getByRole('button', /^Save/).tap()
  await expect(drawer.getByText(/This field is required/)).toBeVisible()
  await drawer.getByRole('textbox', /Amount/).fill('25')
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/Charge Adjustment of \$25\.00 posted for Maria Abril Viola/)).toBeVisible()

  await screen.getByRole('button', /Patient payment \(-\)/).tap()
  drawer = screen.getByRole('dialog')
  await expect(drawer.getByRole('heading', 'New patient payment (-)')).toBeVisible()
  await drawer.getByRole('button', 'Add another payment method').tap()
  /* Con dos métodos, los dos llevan − (como red.dev). */
  await expect(drawer.getByRole('button', 'Remove this payment method')).toHaveCount(2)
  await drawer.getByRole('button', 'Remove this payment method').last().tap()
  await drawer.getByRole('textbox', /Amount/).fill('40')
  /* Patient Payment es un solo paso: el reparto se ve junto al importe (ledger.md, 2026-11-19). */
  await expect(drawer.getByText('Ledger transactions')).toBeVisible()
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/Cash Payment of \$40\.00 posted for Maria Abril Viola/)).toBeVisible()
  await expect(screen.getByText(/Showing 1 to 4 of 4 results/)).toBeVisible()
})
