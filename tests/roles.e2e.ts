import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Settings → Roles (CON-3130, CON-3131, CON-3181, CON-4065): cards y la página de cada rol, como la de una Location
   (2026-11-26). Ver design-reference/figma/modulos/roles.md. */

test('New role pide nombre, descripción y al menos un permiso, y no deja repetir el nombre', async ({ app, screen }) => {
  await app.open('/settings/roles')
  await screen.getByRole('button', 'New role').tap()
  await expect(screen.getByRole('heading', 'New role')).toBeVisible()
  await screen.getByRole('button', /^Save/).tap()
  await expect(screen.getByText('This field is required.')).toHaveCount(2)

  await screen.getByPlaceholder('Enter role name').fill('test 001')
  await screen.getByPlaceholder('Enter role description').fill('Front desk')
  await screen.getByRole('button', /^Save/).tap()
  await expect(screen.getByText('This role name is already in use.')).toBeVisible()

  await screen.getByPlaceholder('Enter role name').fill('Front desk')
  await screen.getByRole('button', /^Save/).tap()
  /* Sin permisos, Save lleva a la pestaña Permissions y lo dice. */
  await expect(screen.getByText('Select at least one permission.')).toBeVisible()

  await screen.getByRole('switch', 'All Appointment permissions').tap()
  await screen.getByRole('button', /^Save/).tap()
  await expect(screen.getByText('Front desk was created.')).toBeVisible()
  await expect(screen.getByRole('link', 'Front desk')).toBeVisible()
})

test('Un rol del sistema se abre en sólo lectura, y uno con usuarios no se desactiva', async ({ app, screen }) => {
  await app.open('/settings/roles')
  await screen.getByPlaceholder('Search roles').fill('admin')
  await screen.getByRole('link', 'Administrator').tap()
  await expect(screen.getByRole('heading', 'Administrator')).toBeVisible()
  await expect(screen.getByRole('button', /Save/)).toHaveCount(0)
  await screen.getByRole('tab', /^Permissions/).tap()
  await expect(screen.getByRole('switch', 'All Account permissions')).toBeDisabled()

  await screen.getByRole('navigation', 'Breadcrumb').getByRole('link', 'Roles').tap()
  await screen.getByPlaceholder('Search roles').fill('Insurance permisions')
  await screen.getByRole('button', 'Actions for Insurance permisions').tap()
  await screen.getByRole('menuitem', 'Deactivate').tap()
  await expect(screen.getByText(/This role is assigned to active users/)).toBeVisible()
})

test('Editar un rol: Save changes guarda y, con cambios, salir pregunta antes', async ({ app, screen }) => {
  await app.open('/settings/roles/patient-role')
  await expect(screen.getByRole('button', 'Save changes')).toBeDisabled()
  await screen.getByPlaceholder('Enter role description').fill('Front desk patients')
  await screen.getByRole('button', 'Cancel').tap()
  await expect(screen.getByText('Are you sure you want to leave?')).toBeVisible()
  await screen.getByRole('button', 'Cancel').last().tap()
  await screen.getByRole('button', 'Save changes').tap()
  await expect(screen.getByText('patient role was updated.')).toBeVisible()
})
