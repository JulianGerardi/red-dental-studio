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

  const buscar = drawer.getByRole('textbox', 'Person')
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

/* Guardian (CON-2858; patients.md, 2026-11-04): un menor necesita guardián. Se busca a alguien del sistema o se tilda
   Add New Person; contacto y dirección van en desplegables que se abren solos si falta algo. */
async function altaDeMenor(app: { open: (r: string) => Promise<unknown> }, screen: any) {
  await app.open('/patients')
  await screen.getByRole('button', /New Patient/).first().tap()
  const drawer = screen.getByRole('dialog', 'New Patient')
  await drawer.getByRole('textbox', /First Name/).fill('Mia')
  await drawer.getByRole('textbox', /Last Name/).fill('Lopez')
  await drawer.getByRole('button', 'Pick a date').tap()
  await drawer.getByRole('button', /1990/).tap()
  for (let i = 0; i < 26; i++) await screen.getByRole('button', 'Next year').tap()
  await screen.getByRole('button', /January 15, 2016/).tap()
  await drawer.getByRole('button', /Next Step/).tap()
  await expect(drawer.getByText(/This patient is under 18/)).toBeVisible()
  return drawer
}

test('New Patient pide guardián para un menor y lo carga como persona nueva', async ({ app, screen }) => {
  const drawer = await altaDeMenor(app, screen)

  await drawer.getByRole('button', /Next Step/).tap()
  await expect(drawer.getByText('This patient is a minor and must have at least one guardian assigned.')).toBeVisible()

  await drawer.getByRole('checkbox', 'Add New Person').tap()
  await drawer.getByRole('textbox', /^First name/).fill('Ana')
  await drawer.getByRole('textbox', /^Last name/).fill('Lopez')
  await drawer.getByRole('textbox', /^Email/).fill('ana.lopez@mail.com')
  await drawer.getByRole('button', 'Birthdate').tap()

  /* Plegados: el contacto y la dirección no se ven hasta abrirlos o hasta que falte algo. */
  await expect(drawer.getByRole('textbox', /Area Code/)).toHaveCount(0)
  await drawer.getByRole('button', /Next Step/).tap()
  await expect(drawer.getByText('Complete the phone number.')).toBeVisible()

  await drawer.getByRole('textbox', /Area Code/).fill('324')
  await drawer.getByRole('textbox', /Number \(7 digits\)/).fill('359675')
  await drawer.getByRole('button', /Next Step/).tap()
  await expect(drawer.getByText('Number must be 7 digits.')).toBeVisible()
  await drawer.getByRole('textbox', /Number \(7 digits\)/).fill('3596750')

  await drawer.getByRole('textbox', /Address Line 1/).fill('36 Main Street')
  await drawer.getByRole('button', /Select country/).tap()
  await drawer.getByRole('button', 'United States').tap()
  await drawer.getByRole('button', /Select your region/).tap()
  await drawer.getByRole('button', 'Florida').tap()
  await drawer.getByRole('textbox', /^City/).fill('Miami')
  await drawer.getByRole('textbox', /ZIP Code/).fill('33131')
  await drawer.getByRole('button', /Select a relationship type/).tap()
  await drawer.getByRole('button', 'Parent').tap()

  /* Cerrado, el desplegable resume lo cargado. */
  await drawer.getByRole('button', /^Contact Information/).tap()
  await expect(drawer.getByText('+1 (324) 359-6750')).toBeVisible()

  await drawer.getByRole('button', /Next Step/).tap()
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText('Mia Lopez has been added to the patient list.')).toBeVisible()
})

test('New Patient toma un guardián del sistema sin volver a pedir su contacto', async ({ app, screen }) => {
  const drawer = await altaDeMenor(app, screen)

  await drawer.getByRole('textbox', 'Guardian').fill('Jessica')
  await drawer.getByRole('button', /^Jessica Miller/).tap()
  await expect(drawer.getByText('Contact and address are already on file for this person.')).toBeVisible()
  await expect(drawer.getByRole('button', /^Contact Information/)).toHaveCount(0)

  await drawer.getByRole('checkbox', 'This person is also a guarantor').tap()
  await drawer.getByRole('button', /Next Step/).tap()
  await expect(drawer.getByText('This field is required.')).toBeVisible()
  await drawer.getByRole('button', /Select a relationship type/).tap()
  await drawer.getByRole('button', 'Parent').tap()

  await drawer.getByRole('button', /Next Step/).tap()
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText('Mia Lopez has been added to the patient list.')).toBeVisible()
})
