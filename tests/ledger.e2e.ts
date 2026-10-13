import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Ledger → Transactions: el detalle de la fila dice de qué tratamiento sale un cargo, cuánto se pagó y con qué, y lleva
   al procedimiento en Clinical Mode. */

test('el detalle de un cargo muestra lo aplicado y lo que falta, y abre el procedimiento', async ({ app, screen }) => {
  await app.open('/patients/john-smith/ledger')
  await screen.getByPlaceholder('Search by code, description or provider').fill('D2392')
  await screen.getByRole('button', /Toggle details for Resin composite/).tap()

  await expect(screen.getByText('Restorative Plan')).toBeVisible()
  await expect(screen.getByText('Outstanding balance')).toBeVisible()
  await expect(screen.getByText('$80.00').first()).toBeVisible()
  await expect(screen.getByRole('button', /Check payment ····1234/)).toBeVisible()

  await screen.getByRole('button', /^View procedure/).tap()
  await expect(screen.getByRole('tab', 'Procedures')).toHaveAttribute('aria-selected', 'true')
  await expect(screen.getByText(/D2392 · Resin-based composite/).first()).toBeVisible()
})

test('un pago dice a qué cargos fue y cuánto queda sin aplicar', async ({ app, screen }) => {
  await app.open('/patients/john-smith/ledger')
  await screen.getByPlaceholder('Search by code, description or provider').fill('Check payment')
  await screen.getByRole('button', /Toggle details for Check payment/).tap()

  await expect(screen.getByText('Unapplied credit')).toBeVisible()
  await expect(screen.getByRole('button', /D2392 · Resin composite/)).toBeVisible()
  await expect(screen.getByRole('button', /Apply credit/).first()).toBeVisible()
})
