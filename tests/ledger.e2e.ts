import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Ledger: el detalle de cada fila según el tipo (historia y prototipo de Julián, ledger.md 2026-10-14). */

test('el detalle de un procedimiento muestra su caso, la plata y lo que recibió', async ({ app, screen }) => {
  await app.open('/patients/john-smith/ledger')
  await screen.getByRole('button', /Toggle details for Periodontal scaling/).tap()

  await expect(screen.getByRole('button', /^Periodontists Recommended/)).toBeVisible()
  await expect(screen.getByText('Northgate Clinic')).toBeVisible()
  await expect(screen.getByText('Outstanding transaction balance')).toBeVisible()
  // El saldo del cargo: en la columna Trans. Bal. y en el detalle, el mismo número.
  await expect(screen.getByText('$170.00')).toHaveCount(2)
  // El pago está en otra página de la tabla: el link va a su fila y la despliega.
  await screen.getByRole('button', /^Patient Payment · TX-1027/).tap()
  await expect(screen.getByText('Charges paid or credited by this transaction')).toBeVisible()
})

test('el detalle de un pago dice a qué cargos fue y ofrece Apply credit', async ({ app, screen }) => {
  await app.open('/patients/john-smith/ledger')
  await screen.getByRole('button', 'Next page').tap()
  await screen.getByRole('button', /Toggle details for Check payment/).tap()

  await expect(screen.getByText('patient · John Smith')).toBeVisible()
  await expect(screen.getByText('Charges paid or credited by this transaction')).toBeVisible()
  await expect(screen.getByRole('button', /^Apply credit$/)).toBeVisible()
})

/* El detalle de la fila ya tiene todo: sin View full record (ledger.md, 2026-10-25). */
test('el detalle de una fila del Ledger no tiene View full record', async ({ app, screen }) => {
  await app.open('/patients/john-smith/ledger')
  await screen.getByRole('button', /Toggle details for Periodontal scaling/).tap()
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
  await screen.getByRole('button', /^Actions for Periodontal scaling/).tap()
  await screen.getByRole('menuitem', /Periodontists Recommended/).tap()
  await expect(screen.getByText(/Treatment Plan/).first()).toBeVisible()
})

/* Los tres botones de red.dev abren los drawers de Billing; el pago arranca con el saldo abierto repartido (ledger.md, 2026-11-19). */
test('Patient Payment (-) abre su drawer con el saldo abierto y lo guardado entra a la tabla', async ({ app, screen }) => {
  await app.open('/patients/john-smith/ledger')
  await expect(screen.getByRole('tab', 'Transactions')).toHaveCount(0)
  await screen.getByRole('button', /^Patient Payment \(-\)/).tap()
  const drawer = screen.getByRole('dialog')
  await expect(drawer.getByRole('heading', 'New Patient Payment (-)')).toBeVisible()
  // "John Smith (Guarantor)": los cargos abiertos de todo el hogar (CON-4071).
  await expect(drawer.getByRole('button', /John Smith \(Guarantor\)/)).toBeVisible()
  await expect(drawer.getByRole('textbox', /Amount/)).toHaveValue('13713.00')
  await drawer.getByRole('textbox', /Amount/).fill('50')
  // Applied se reparte solo, del cargo más viejo al más nuevo, sin pasos.
  await expect(drawer.getByRole('textbox', /Applied to Bitewings/)).toHaveValue('35.00')
  await expect(drawer.getByText('Showing 12 open transactions')).toBeVisible()
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/Cash Payment of \$50\.00 posted for John Smith/)).toBeVisible()
  await expect(screen.getByText('Cash Payment').first()).toBeVisible()
})

test('Charge Adjustment (+) abre su drawer y pide el monto', async ({ app, screen }) => {
  await app.open('/patients/john-smith/ledger')
  await screen.getByRole('button', /^Charge Adjustment \(\+\)/).tap()
  const drawer = screen.getByRole('dialog')
  await expect(drawer.getByRole('heading', 'Enter Charge (+) Adjustment')).toBeVisible()
  await drawer.getByRole('button', /^Save/).tap()
  await expect(drawer.getByText(/This field is required/)).toBeVisible()
})

/* Sin transacciones abiertas no hay a qué aplicar: sin métodos de pago y Save apagado, como red.dev (ledger.md, 2026-11-19). */
test('quien ya no tiene cargos abiertos no muestra métodos de pago y Save queda apagado', async ({ app, screen }) => {
  await app.open('/patients/john-smith/ledger')
  await screen.getByRole('button', /^Patient Payment \(-\)/).tap()
  let drawer = screen.getByRole('dialog')
  await drawer.getByRole('button', /John Smith \(Guarantor\)/).tap()
  await drawer.getByRole('button', /^Maximiliano Fernández-Ugarte$/).tap()
  await expect(drawer.getByText('Showing 1 open transactions')).toBeVisible()
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/posted for Maximiliano Fernández-Ugarte/)).toBeVisible()

  await screen.getByRole('button', /^Patient Payment \(-\)/).tap()
  drawer = screen.getByRole('dialog')
  await drawer.getByRole('button', /John Smith \(Guarantor\)/).tap()
  await drawer.getByRole('button', /^Maximiliano Fernández-Ugarte$/).tap()
  await expect(drawer.getByText('Showing 0 open transactions')).toBeVisible()
  await expect(drawer.getByRole('textbox', /^Amount/)).toHaveCount(0)
  await expect(drawer.getByRole('button', /^Save/)).toBeDisabled()
})
