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

/* Los tres botones de red.dev abren los drawers de Billing (ledger.md, 2026-11-19); lo de adentro del drawer se arma aparte. */
test('Patient Payment (-) abre su drawer y lo guardado entra a la tabla', async ({ app, screen }) => {
  await app.open('/patients/john-smith/ledger')
  await expect(screen.getByRole('tab', 'Transactions')).toHaveCount(0)
  await screen.getByRole('button', /^Patient Payment \(-\)/).tap()
  const drawer = screen.getByRole('dialog')
  await expect(drawer.getByRole('heading', 'New Patient Payment (-)')).toBeVisible()
  await drawer.getByRole('textbox', /^Amount/).fill('50')
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
  await drawer.getByRole('textbox', /^Amount/).fill('75')
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/Charge Adjustment of \$75\.00 posted for John Smith/)).toBeVisible()
})

/* La lógica de CON-3738, CON-3739 y CON-3735 (ledger.md, 2026-11-19). */
test('Patient Payment abre con el total abierto repartido del más viejo al más nuevo', async ({ app, screen }) => {
  await app.open('/patients/john-smith/ledger')
  await screen.getByRole('button', /^Patient Payment \(-\)/).tap()
  await expect(screen.getByRole('textbox', /^Amount/)).toHaveValue('6308.00')
  await expect(screen.getByRole('textbox', 'Applied to Bitewings – four radiographic images')).toHaveValue('35.00')
  await expect(screen.getByRole('textbox', 'Applied to Crown – porcelain/ceramic')).toHaveValue('635.00')

  /* Un importe menor se aplica al cargo más viejo y sigue con el siguiente hasta gastarlo. */
  await screen.getByRole('textbox', /^Amount/).fill('300')
  await expect(screen.getByRole('textbox', 'Applied to Bitewings – four radiographic images')).toHaveValue('35.00')
  await expect(screen.getByRole('textbox', 'Applied to Crown – porcelain/ceramic')).toHaveValue('265.00')
  await expect(screen.getByRole('textbox', 'Applied to Topical fluoride varnish')).toHaveValue('')

  /* Una línea que pasa el saldo del guarantor no se puede guardar. */
  await screen.getByRole('textbox', 'Applied to Crown – porcelain/ceramic').fill('900')
  await expect(screen.getByText('The applied amount cannot be greater than the charge’s remaining guarantor balance.')).toBeVisible()
})

test('Un pago de más queda como crédito sin aplicar y Apply to recarga los cargos', async ({ app, screen }) => {
  await app.open('/patients/john-smith/ledger')
  await screen.getByRole('button', /^Patient Payment \(-\)/).tap()
  await screen.getByRole('button', 'Apply to').tap()
  await expect(screen.getByRole('menuitem', /Emma Smith/)).toBeVisible()
  await screen.getByRole('menuitem', /Emma Smith/).tap()
  await expect(screen.getByText(/Showing 3 open transactions/)).toBeVisible()
  await screen.getByRole('button', 'Apply to').tap()
  await screen.getByRole('menuitem', /^John Smith Self/).tap()

  /* $692 de más: el pago cubre los $6,308 abiertos y el resto suma a Unapplied credits ($150 + $692). */
  await screen.getByRole('textbox', /^Amount/).fill('7000')
  await expect(screen.getByText('$692.00')).toBeVisible()
  await screen.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/Cash Payment of \$7,000\.00 posted for John Smith/)).toBeVisible()
  await expect(screen.getByText('$842.00')).toBeVisible()
})

test('Credit Adjustment (-) pide el monto, reparte y avisa', async ({ app, screen }) => {
  await app.open('/patients/john-smith/ledger')
  await screen.getByRole('button', /^Credit Adjustment \(-\)/).tap()
  const drawer = screen.getByRole('dialog')
  await drawer.getByRole('button', /Next Step/).tap()
  await expect(drawer.getByText('This field is required.')).toBeVisible()
  await drawer.getByRole('textbox', /^Amount/).fill('50')
  await drawer.getByRole('button', /Next Step/).tap()
  await expect(drawer.getByText('Ledger Transactions')).toBeVisible()
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/Credit Adjustment of \$50\.00 posted for John Smith/)).toBeVisible()
})
