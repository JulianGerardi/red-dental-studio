import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Insurance: buscar, borrar y crear suscripciones como en red.dev (CON-3282, CON-3284). Ver
   design-reference/figma/modulos/insurance.md, 2026-11-06. */

test('Sin suscripción elegida, la card va con guiones y Manage queda deshabilitado', async ({ app, screen }) => {
  await app.open('/patients/john-smith/insurance')
  await expect(screen.getByText('Select a subscription')).toBeVisible()
  await expect(screen.getByRole('button', 'Manage Subscription')).toBeDisabled()
  await expect(screen.getByRole('button', 'Delete subscription')).toHaveCount(0)

  /* Busca también por carrier: "aetna" encuentra la de Lucas Johnson. */
  await screen.getByPlaceholder('Search by name or ID').fill('aetna')
  await screen.getByRole('option', /^Lucas Johnson.*AET-234254/).tap()
  await expect(screen.getByText('Plan 234254534', { exact: true }).first()).toBeVisible()
  await expect(screen.getByRole('button', 'Manage Subscription')).toBeEnabled()
})

test('Una suscripción en uso no se borra; una libre, sí, después de confirmar', async ({ app, screen }) => {
  await app.open('/patients/john-smith/insurance')
  const buscador = screen.getByPlaceholder('Search by name or ID')
  await buscador.fill('john')
  await screen.getByRole('option', /^John Smith.*JASDASD11243/).tap()
  await screen.getByRole('button', 'Delete subscription').tap()
  await expect(screen.getByText(/has dependent patient insurance records/)).toBeVisible()
  await expect(screen.getByRole('dialog')).toHaveCount(0)

  await screen.getByRole('button', 'Remove Search for an existing subscription').tap()
  await buscador.fill('maria')
  await screen.getByRole('option', /^Maria Smith.*CIG-118273/).tap()
  await screen.getByRole('button', 'Delete subscription').tap()
  await expect(screen.getByRole('heading', 'Are you sure you want to delete this subscription?')).toBeVisible()
  await screen.getByRole('button', 'Confirm').tap()
  await expect(screen.getByText('The subscription has been deleted.')).toBeVisible()
  await buscador.fill('maria')
  await expect(screen.getByText('Subscription not found.')).toBeVisible()
})

test('New Subscription pide carrier y plan, no deja duplicar y la nueva queda elegida', async ({ app, screen }) => {
  await app.open('/patients/john-smith/insurance')
  await screen.getByRole('button', 'Add New Subscription').tap()
  const drawer = screen.getByRole('dialog', 'New Subscription')
  await drawer.getByRole('button', 'Next Step').tap()
  await drawer.getByRole('button', 'Save').tap()
  await expect(drawer.getByText('Uncompleted fields')).toBeVisible()
  await expect(drawer.getByPlaceholder('Select plan')).toBeDisabled()

  await drawer.getByPlaceholder('Select carrier').fill('zz')
  await expect(drawer.getByText('Carrier not found.')).toBeVisible()
  await drawer.getByPlaceholder('Select carrier').fill('Dental')
  await drawer.getByRole('button', 'Dental Dental Of California').tap()
  await drawer.getByPlaceholder('Select plan').tap()
  await drawer.getByRole('button', 'PPO Premiun Plan').tap()
  await drawer.getByPlaceholder('123456').fill('ABC-1')
  await drawer.getByPlaceholder('MM / DD / YY').first().fill('010326')
  await drawer.getByRole('button', 'Save').tap()
  await expect(drawer.getByText('Duplicate subscription')).toBeVisible()

  await drawer.getByRole('button', 'Clear Plan Name').tap()
  await drawer.getByPlaceholder('Select plan').tap()
  await drawer.getByRole('button', 'HMO Basic').tap()
  await drawer.getByRole('button', 'Save').tap()
  await expect(screen.getByText('The subscription has been successfully created.')).toBeVisible()
  /* La elegida reemplaza al buscador (2026-11-11). */
  await expect(screen.getByPlaceholder('Search by name or ID')).toHaveCount(0)
  await expect(screen.getByText('· ABC-1')).toBeVisible()
})
