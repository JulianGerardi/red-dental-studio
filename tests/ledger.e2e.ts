import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Ledger: el detalle de cada fila según el tipo (historia y prototipo de Julián, ledger.md 2026-10-14). */

test('el detalle de un procedimiento muestra su caso, la plata y lo que recibió', async ({ app, screen }) => {
  await app.open('/patients/john-smith/ledger')
  await screen.getByPlaceholder(/Search by code/).fill('D4341')
  await screen.getByRole('button', /Toggle details/).first().tap()

  await expect(screen.getByRole('button', /^Periodontists Recommended/)).toBeVisible()
  await expect(screen.getByText('Northgate Clinic')).toBeVisible()
  await expect(screen.getByText('Outstanding transaction balance')).toBeVisible()
  // El saldo del cargo: en la columna Trans. Bal. y en el detalle, el mismo número.
  await expect(screen.getByText('$170.00')).toHaveCount(2)
  // Con la búsqueda, el pago no está en la tabla: el link abre su registro, sin tocar los filtros.
  await screen.getByRole('button', /^Patient Payment · TX-1027/).tap()
  await expect(screen.getByRole('dialog', /Check payment/)).toBeVisible()
})

test('el detalle de un pago dice a qué cargos fue y ofrece Apply credit', async ({ app, screen }) => {
  await app.open('/patients/john-smith/ledger')
  await screen.getByPlaceholder(/Search by code/).fill('Check payment')
  await screen.getByRole('button', /Toggle details/).first().tap()

  await expect(screen.getByText('patient · John Smith')).toBeVisible()
  await expect(screen.getByText('Charges paid or credited by this transaction')).toBeVisible()
  await expect(screen.getByRole('button', /^Apply credit$/)).toBeVisible()
})

/* El detalle de la fila ya tiene todo: sin View full record (ledger.md, 2026-10-25). */
test('el detalle de una fila del Ledger no tiene View full record', async ({ app, screen }) => {
  await app.open('/patients/john-smith/ledger')
  await screen.getByPlaceholder(/Search by code/).fill('D4341')
  await screen.getByRole('button', /Toggle details/).first().tap()
  await expect(screen.getByText('Financial details')).toBeVisible()
  await expect(screen.getByRole('button', /View full record/)).toHaveCount(0)
})

/* Métricas, columnas y ⋮ de CON-3753 / CON-3755 (ledger.md, 2026-11-12). */
test('las métricas cambian con la vista y Guarantor View muestra el Household', async ({ app, screen }) => {
  await app.open('/patients/john-smith/ledger')
  await expect(screen.getByText('Patient responsibility')).toBeVisible()
  await expect(screen.getByText('Open charges')).toBeVisible()
  await expect(screen.getByText('Trans. Bal.')).toBeVisible()
  await screen.getByRole('tab', 'Guarantor View').tap()
  await expect(screen.getByText('Guarantor balance')).toBeVisible()
  await expect(screen.getByRole('heading', 'Household')).toBeVisible()
})

test('el ⋮ de un procedimiento lleva a su estimación en Clinical Mode', async ({ app, screen }) => {
  await app.open('/patients/john-smith/ledger')
  await screen.getByPlaceholder(/Search by code/).fill('D4341')
  await screen.getByRole('button', /^Actions for Periodontal scaling/).tap()
  await screen.getByRole('menuitem', /Periodontists Recommended/).tap()
  await expect(screen.getByText(/Treatment Plan/).first()).toBeVisible()
})
