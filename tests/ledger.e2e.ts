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
  await expect(screen.getByText('$170.00')).toBeVisible()
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

test('View full record abre el procedimiento en Clinical Mode', async ({ app, screen }) => {
  await app.open('/patients/john-smith/ledger')
  await screen.getByPlaceholder(/Search by code/).fill('D4341')
  await screen.getByRole('button', /Toggle details/).first().tap()
  await screen.getByRole('button', /View full record/).tap()

  await expect(screen.getByRole('tab', 'Procedures')).toHaveAttribute('aria-selected', 'true')
  await expect(screen.getByText('D4341 · Periodontal scaling and root planing – four or more teeth per quadrant')).toBeVisible()
})
