import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Settings → Consents: el preview se abre en un drawer desde el pie del editor. Ver design-reference/figma/modulos/consents.md. */

test('Preview abre la hoja en un drawer y Patient View saca lo de la clínica', async ({ app, screen }) => {
  await app.open('/settings/consents')
  await expect(screen.getByRole('article', 'Consent document preview')).toHaveCount(0)
  await screen.getByRole('button', 'Preview').tap()
  const drawer = screen.getByRole('dialog', 'Preview')
  await expect(drawer.getByRole('article', 'Consent document preview')).toBeVisible()
  await expect(drawer.getByText(/^Diagnosis$/)).toBeVisible()
  await drawer.getByRole('button', 'Patient View').tap()
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
