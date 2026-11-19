import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Edit Patient con el formato de la ficha de un empleado: una sola pantalla, sin pestañas, con General, Contact,
   Address y Demographic, sin Guardian ni el buscador de personas (CON-1329; patients.md, 2026-11-18). */

test('desde la tabla abre la pantalla, guarda y vuelve', async ({ app, screen }) => {
  await app.open('/patients')
  await screen.getByRole('button', /actions|more/i).first().tap()
  await screen.getByRole('menuitem', /Edit/).first().tap()

  await expect(screen.getByRole('heading', 'Edit Patient')).toBeVisible()
  await expect(screen.getByRole('dialog')).toHaveCount(0)
  await expect(screen.getByRole('tab')).toHaveCount(0)
  await expect(screen.getByText('Contact Information')).toBeVisible()
  await expect(screen.getByText('Address Information')).toBeVisible()
  await expect(screen.getByText('Demographic Information')).toBeVisible()
  await expect(screen.getByText(/link a person that already exists/)).toHaveCount(0)
  await expect(screen.getByText('Guardian Information')).toHaveCount(0)
  await screen.getByRole('button', 'Save Changes').tap()
  await expect(screen.getByText(/has been updated/)).toBeVisible()
  await expect(screen.getByRole('heading', 'Patients')).toBeVisible()
})

test('un obligatorio vacío no guarda y lo marca', async ({ app, screen }) => {
  await app.open('/patients/abril-viola/edit')
  await screen.getByRole('textbox', /First Name/).fill('')
  await screen.getByRole('button', 'Save Changes').tap()
  await expect(screen.getByText('This field is required.')).toBeVisible()
  await expect(screen.getByRole('heading', 'Edit Patient')).toBeVisible()
})

test('pide el teléfono y la dirección que faltan', async ({ app, screen }) => {
  await app.open('/patients/marco-rivera/edit')
  await screen.getByRole('button', 'Save Changes').tap()
  await expect(screen.getByText('This field is required.')).toHaveCount(8)
  await screen.getByRole('textbox', /Area Code/).fill('55')
  await screen.getByRole('button', 'Save Changes').tap()
  await expect(screen.getByText('Area code must be 3 digits.')).toBeVisible()
})
