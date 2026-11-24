import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Settings → Consents: el preview se abre en un drawer desde el pie del editor. Ver design-reference/figma/modulos/consents.md. */

test('Preview abre la hoja en un drawer y Patient view saca lo de la clínica', async ({ app, screen }) => {
  await app.open('/settings/consents')
  await expect(screen.getByRole('article', 'Consent document preview')).toHaveCount(0)
  await screen.getByRole('button', 'Preview').tap()
  const drawer = screen.getByRole('dialog', 'Preview')
  await expect(drawer.getByRole('article', 'Consent document preview')).toBeVisible()
  await expect(drawer.getByText(/^Diagnosis$/)).toBeVisible()
  await drawer.getByRole('button', 'Patient view').tap()
  await expect(drawer.getByText(/^Diagnosis$/)).toHaveCount(0)
  await drawer.getByRole('button', 'Back to editor').tap()
  await expect(screen.getByRole('dialog')).toHaveCount(0)
})

test('Save desde el preview lo cierra y deja los faltantes a la vista en el editor', async ({ app, screen }) => {
  await app.open('/settings/consents')
  await screen.getByRole('button', 'New template').tap()
  await screen.getByRole('button', 'Preview').tap()
  await screen.getByRole('dialog', 'Preview').getByRole('button', 'Save').tap()
  await expect(screen.getByRole('dialog')).toHaveCount(0)
  await expect(screen.getByText(/All required fields marked/)).toBeVisible()
})

/* Estandarización con Coverage tables (2026-11-24): Activate / Deactivate y Delete en el ⋮ de la lista. */
test('el ⋮ de un template lo desactiva y Delete pide confirmación', async ({ app, screen }) => {
  await app.open('/settings/consents')
  await screen.getByRole('button', 'Actions for Root Canal Consent').tap()
  await screen.getByRole('menuitem', 'Deactivate').tap()
  const confirmar = screen.getByRole('dialog', 'Deactivate consent template?')
  await expect(confirmar.getByText('D3310 - Root canal therapy, anterior')).toBeVisible()
  await confirmar.getByRole('button', 'Deactivate').tap()
  await expect(screen.getByText('The consent template has been successfully deactivated.')).toBeVisible()

  await screen.getByRole('button', 'Actions for Extraction Informed Consent').tap()
  await screen.getByRole('menuitem', 'Delete').tap()
  await screen.getByRole('dialog', 'Delete template?').getByRole('button', 'Delete').tap()
  await expect(screen.getByText('Extraction Informed Consent was deleted.')).toBeVisible()
  await expect(screen.getByRole('heading', 'Edit template')).toBeVisible()
})
