import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Settings → Consents. Ver design-reference/figma/modulos/consents.md. */

/* CON-4094: el preview abre a pantalla completa, muestra lo que no se guardó y Back to editing vuelve sin perder nada. */
test('Preview a pantalla completa con los cambios sin guardar y Back to editing', async ({ app, screen }) => {
  await app.open('/settings/consents')
  await screen.getByRole('textbox', /Nature of procedure/).fill('Texto sin guardar para el preview.')
  await screen.getByRole('button', 'Preview').tap()
  const vista = screen.getByRole('dialog', 'Patient View - Extraction Informed Consent')
  await expect(vista.getByText('Preview includes your unsaved changes. Save the template to keep them.')).toBeVisible()
  await expect(vista.getByText('Texto sin guardar para el preview.')).toBeVisible()
  await vista.getByRole('button', 'Back to editing').tap()
  await expect(screen.getByRole('dialog')).toHaveCount(0)
  await expect(screen.getByRole('textbox', /Nature of procedure/)).toHaveValue('Texto sin guardar para el preview.')
})

/* Como red.dev: pestañas Active / System / All y el buscador de procedimientos abre la lista al hacer foco. */
test('pestañas de la lista y buscador de procedimientos', async ({ app, screen }) => {
  await app.open('/settings/consents')
  await screen.getByRole('tab', 'System').tap()
  await expect(screen.getByRole('button', /^Root Canal Consent – Molar/)).toBeVisible()
  await expect(screen.getByRole('button', /^Root Canal Consent Active/)).toHaveCount(0)
  await screen.getByRole('tab', 'Active').tap()

  await screen.getByPlaceholder('Search procedures').tap()
  await expect(screen.getByRole('option', /^D0120 - Periodic oral evaluation/)).toBeVisible()
  await screen.getByPlaceholder('Search procedures').fill('zzz')
  await expect(screen.getByText('No results found.')).toBeVisible()
  await screen.getByPlaceholder('Search procedures').fill('D1110')
  await screen.getByRole('option', /^D1110/).tap()
  await expect(screen.getByRole('button', 'Remove D1110')).toBeVisible()
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
