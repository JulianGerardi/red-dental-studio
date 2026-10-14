import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Ledger: el detalle de la fila suma lo del cobro (prototipo "Expanded transaction detail"). Ver
   design-reference/figma/modulos/ledger.md (2026-10-14). */

test('el detalle de un cargo muestra la sede, la plata y lo aplicado', async ({ app, screen }) => {
  await app.open('/patients/john-smith/ledger')
  await screen.getByPlaceholder(/Search by code/).fill('D4341')
  await screen.getByRole('button', /Toggle details/).first().tap()

  await expect(screen.getByText('Northgate Clinic')).toBeVisible()
  await expect(screen.getByText('Outstanding balance')).toBeVisible()
  await expect(screen.getByText('$170.00')).toBeVisible()
  // La referencia de un pago abre esa transacción en el registro de sólo lectura.
  await screen.getByRole('button', /Check payment ····1234/).tap()
  await expect(screen.getByRole('dialog', /Check payment/)).toBeVisible()
})
