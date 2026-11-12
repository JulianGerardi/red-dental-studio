import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Documents Manager: nombres reales, Rows per page y búsqueda (treatments.md, 2026-11-12). */

test('Documents busca por nombre y avisa cuando no hay nada', async ({ app, screen }) => {
  await app.open('/patients/john-smith/documents')
  await expect(screen.getByText(/Showing 1 to 10 of 12 documents/)).toBeVisible()
  await screen.getByPlaceholder('Search documents').fill('Refusal')
  await expect(screen.getByText('Informed Refusal of Dental Treatment – Implant Option')).toBeVisible()
  await screen.getByPlaceholder('Search documents').fill('zzz')
  await expect(screen.getByText('No documents found')).toBeVisible()
})

test('Rows per page muestra los 12 documentos en una página', async ({ app, screen }) => {
  await app.open('/patients/john-smith/documents')
  await screen.getByRole('combobox', 'Rows per page').selectOption('20')
  await expect(screen.getByText(/Showing 1 to 12 of 12 documents/)).toBeVisible()
})
