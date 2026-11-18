import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Edit Patient es una pantalla con pestañas, como la ficha de una Location (design-reference/figma/modulos/patients.md,
   2026-11-17). */

test('desde la tabla abre la pantalla, guarda y vuelve', async ({ app, screen }) => {
  await app.open('/patients')
  await screen.getByRole('button', /actions|more/i).first().tap()
  await screen.getByRole('menuitem', /Edit/).first().tap()

  await expect(screen.getByRole('heading', 'Edit Patient')).toBeVisible()
  await expect(screen.getByRole('dialog')).toHaveCount(0)
  await expect(screen.getByRole('tab', 'General')).toHaveAttribute('aria-selected', 'true')
  await screen.getByRole('tab', 'Demography').tap()
  await expect(screen.getByText('Demographic Information')).toBeVisible()
  await screen.getByRole('button', 'Save Changes').tap()
  await expect(screen.getByText(/has been updated/)).toBeVisible()
  await expect(screen.getByRole('heading', 'Patients')).toBeVisible()
})

test('un obligatorio vacío lleva a su pestaña y no guarda', async ({ app, screen }) => {
  await app.open('/patients/abril-viola/edit')
  await screen.getByRole('textbox', /First Name/).fill('')
  await screen.getByRole('tab', 'Demography').tap()
  await screen.getByRole('button', 'Save Changes').tap()
  await expect(screen.getByRole('tab', /General/)).toHaveAttribute('aria-selected', 'true')
  await expect(screen.getByText('This field is required.')).toBeVisible()
})
