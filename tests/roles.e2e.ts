import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Settings → Roles (CON-3130, CON-3131, CON-3181, CON-4065). Ver design-reference/figma/modulos/roles.md. */

test('New role pide nombre, descripción y al menos un permiso, y no deja repetir el nombre', async ({ app, screen }) => {
  await app.open('/settings/roles')
  await screen.getByRole('button', 'New role').tap()
  const drawer = screen.getByRole('dialog', 'New role')
  await drawer.getByRole('button', /Next step/).tap()
  await expect(drawer.getByText('This field is required.')).toHaveCount(2)

  await drawer.getByPlaceholder('Enter role name').fill('test 001')
  await drawer.getByPlaceholder('Enter role description').fill('Front desk')
  await drawer.getByRole('button', /Next step/).tap()
  await expect(drawer.getByText('This role name is already in use.')).toBeVisible()

  await drawer.getByPlaceholder('Enter role name').fill('Front desk')
  await drawer.getByRole('button', /Next step/).tap()
  await drawer.getByRole('button', /^Save/).tap()
  await expect(drawer.getByText('Select at least one permission.')).toBeVisible()

  await drawer.getByRole('switch', 'All Appointment permissions').tap()
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText('Front desk was created.')).toBeVisible()
})

test('Un rol del sistema se abre en sólo lectura, y uno con usuarios no se desactiva', async ({ app, screen }) => {
  await app.open('/settings/roles')
  await screen.getByPlaceholder('Search roles').fill('admin')
  await screen.getByRole('button', 'Administrator').tap()
  const drawer = screen.getByRole('dialog', 'View role')
  await expect(drawer.getByRole('button', /Save/)).toHaveCount(0)
  await drawer.getByRole('tab', 'Permissions').tap()
  await expect(drawer.getByRole('switch', 'All Account permissions')).toBeDisabled()
  await drawer.getByRole('button', /Close/).first().tap()

  await screen.getByPlaceholder('Search roles').fill('Insurance permisions')
  await screen.getByRole('button', 'Actions for Insurance permisions').tap()
  await screen.getByRole('menuitem', 'Deactivate').tap()
  await expect(screen.getByText(/This role is assigned to active users/)).toBeVisible()
})
