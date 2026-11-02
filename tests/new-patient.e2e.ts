import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* New Patient: "link a person that already exists in the system" cambia los datos por el buscador de personas
   (empleados, contactos, suscriptores) y guarda al paciente con los datos de la elegida. Ver
   design-reference/figma/modulos/patients.md, 2026-11-02. */

test('New Patient vincula a una persona que ya existe en el sistema', async ({ app, screen }) => {
  await app.open('/patients')
  await screen.getByRole('button', /New Patient/).first().tap()
  const drawer = screen.getByRole('dialog', 'New Patient')

  await drawer.getByRole('checkbox', /link a person that already exists/).tap()
  await expect(drawer.getByRole('textbox', /First Name/)).toHaveCount(0)

  /* Sin elegir a nadie no avanza. */
  await drawer.getByRole('button', /Next Step/).tap()
  await expect(drawer.getByText('Select a person or untick the option to enter the details.')).toBeVisible()

  const buscar = drawer.getByPlaceholder('Search by Name or Last Name')
  await buscar.fill('zzz')
  await expect(drawer.getByText(/No one in the system matches this name/)).toBeVisible()

  /* Quien ya es paciente no aparece: Abril Viola está en la tabla. */
  await buscar.fill('Abril')
  await expect(drawer.getByRole('button', /^Abril Viola/)).toHaveCount(0)

  await buscar.fill('Miller')
  await drawer.getByRole('button', /^Michael Miller/).tap()
  await expect(drawer.getByText("The patient record will use this person's name, birthdate and email.")).toBeVisible()

  await drawer.getByRole('button', /Next Step/).tap()
  await drawer.getByRole('button', /Next Step/).tap()
  await drawer.getByRole('button', /^Save/).tap()

  await expect(screen.getByText('Michael Miller has been added to the patient list.')).toBeVisible()
  await expect(screen.getByRole('row', /Michael Miller .*May 14, 1982 .*mm\.thompson@yahoo\.com/)).toBeVisible()
})
