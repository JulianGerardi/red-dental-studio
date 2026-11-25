import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Lo que hacen los botones de Pending Task (videos de red.dev de Julián, 2026-11-20; CON-2641 y CON-2643). Ver
   design-reference/figma/modulos/dashboard.md. */

const SIN_ENCUENTRO = /no open encounter for the selected patient/

test('Sin encuentro abierto las opciones del ⋮ quedan deshabilitadas y un tooltip dice por qué', async ({ app, screen }) => {
  await app.open('/')
  await screen.getByRole('tab', /^Lab orders/).tap()
  await screen.getByRole('button', 'Actions for Lab order for James Foster').tap()
  await expect(screen.getByRole('menuitem', 'Cancel')).toHaveAttribute('aria-disabled', 'true')
  /* El tooltip abre también con el foco del teclado. */
  await screen.getByRole('menuitem', 'Cancel').focus()
  await expect(screen.getByRole('tooltip')).toContainText(SIN_ENCUENTRO)
})

test('Request pasa la orden a Requested y Cancel la saca de la lista', async ({ app, screen }) => {
  await app.open('/')
  await screen.getByRole('tab', /^Lab orders/).tap()
  /* Olivia Brooks está en el sillón: su encuentro está abierto. */
  await screen.getByRole('button', 'Actions for Lab order for Olivia Brooks').tap()
  await screen.getByRole('menuitem', 'Request').tap()
  await expect(screen.getByText('Lab order for Olivia Brooks requested.')).toBeVisible()
  await expect(screen.getByRole('button', 'Open PDF of the lab order for Olivia Brooks')).toBeVisible()

  await screen.getByRole('button', 'Actions for Lab order for Olivia Brooks').tap()
  await screen.getByRole('menuitem', 'Cancel').tap()
  await screen.getByRole('dialog', 'Cancel this lab order?').getByRole('button', 'Cancel lab order').tap()
  await expect(screen.getByRole('tab', 'Lab orders (1)')).toBeVisible()
})

test('Complete this Task abre el detalle de la orden, en sólo lectura sin encuentro', async ({ app, screen }) => {
  await app.open('/')
  await screen.getByRole('tab', /^Lab orders/).tap()
  /* Por vencimiento, la de James Foster (todavía no llegó) va primero. */
  await screen.getByRole('button', /Complete this task/).first().tap()
  await expect(screen.getByText('Read-only mode')).toBeVisible()
  await expect(screen.getByRole('button', 'Save')).toBeDisabled()
  await screen.getByRole('button', 'Cancel').tap()
  await expect(screen.getByRole('button', 'View history')).toBeVisible()
})

test('Edit abre la orden editable: New laboratory crea el laboratorio y lo elige, y Save pide el trabajo (CON-2218, CON-2285)', async ({ app, screen }) => {
  await app.open('/')
  await screen.getByRole('tab', /^Lab orders/).tap()
  await screen.getByRole('button', 'Actions for Lab order for Olivia Brooks').tap()
  await screen.getByRole('menuitem', 'Edit').tap()
  await expect(screen.getByText('Read-only mode')).toHaveCount(0)

  await screen.getByRole('button', 'New laboratory').tap()
  const drawer = screen.getByRole('dialog', 'New laboratory')
  await drawer.getByPlaceholder('Laboratory').fill('Bay Dental Lab')
  await drawer.getByPlaceholder('laboratory@example.com').fill('bay-dental')
  await drawer.getByRole('button', /Next step/).tap()
  await expect(drawer.getByText('Enter a valid email.')).toBeVisible()
  await drawer.getByPlaceholder('laboratory@example.com').fill('orders@baydental.com')
  await drawer.getByRole('button', /Next step/).tap()
  await drawer.getByPlaceholder('555').fill('305')
  await drawer.getByPlaceholder('000-0000').fill('5550123')
  await drawer.getByRole('button', /Next step/).tap()
  await drawer.getByPlaceholder('Street name and number').fill('200 Bay St')
  await drawer.getByRole('button', 'Select your region').tap()
  await drawer.getByRole('button', 'Florida').tap()
  await drawer.getByPlaceholder('Your city').fill('Miami')
  await drawer.getByPlaceholder('Postal code (only numbers)').fill('33101')
  await drawer.getByRole('button', /Next step/).tap()
  await expect(drawer.getByText('No credentials added yet.')).toBeVisible()
  await drawer.getByRole('button', /Save/).tap()
  await expect(screen.getByText('The laboratory has been successfully created.')).toBeVisible()
  await expect(screen.getByPlaceholder('Search laboratory')).toHaveValue('Bay Dental Lab')

  await screen.getByRole('button', 'Save').tap()
  await expect(screen.getByText('Describe the dental work requested.')).toBeVisible()
  await screen.getByLabel(/Dental work requested/).fill('Porcelain crown')
  await screen.getByRole('button', 'Save').tap()
  await expect(screen.getByText('The lab order has been successfully updated.')).toBeVisible()
})

test('Complete this Task abre la Clinical Note; se firma con el login y Back to History va a Patient Summary', async ({ app, screen }) => {
  await app.open('/patients/1')
  await screen.getByRole('tab', /^Clinical note/).tap()
  await screen.getByRole('button', /Complete this task/).first().tap()
  await expect(screen.getByRole('heading', 'Clinical note - John Smith')).toBeVisible()
  await expect(screen.getByText('Dental Clinical Note').first()).toBeVisible()

  await screen.getByRole('button', 'Sign clinical note').tap()
  const login = screen.getByRole('dialog', 'Login to sign document')
  await expect(login.getByRole('button', 'Sign')).toBeDisabled()
  await login.getByPlaceholder('example@example.com').fill('sarah@example.com')
  await login.getByPlaceholder('Enter password').fill('secret')
  await login.getByRole('button', 'Sign').tap()
  await expect(screen.getByText('Clinical note signed.')).toBeVisible()
  await expect(screen.getByRole('button', 'Sign clinical note')).toHaveCount(0)

  await screen.getByRole('button', 'Back to history').tap()
  await expect(screen.getByRole('button', 'Patient summary')).toBeVisible()
})

/* Referral (video de red.dev de Julián, 2026-11-25; CON-2322, CON-2323, CON-2394). Ver clinical-mode.md. */
test('Complete this task abre el detalle de la Referral, en sólo lectura sin encuentro', async ({ app, screen }) => {
  await app.open('/')
  await screen.getByRole('tab', /^Referrals/).tap()
  /* Sophia Collins todavía no llegó: su derivación (Requested) se ve en sólo lectura. */
  await screen.getByRole('button', /Complete this task/).first().tap()
  await expect(screen.getByRole('heading', 'Referral')).toBeVisible()
  await expect(screen.getByText('Read-only mode')).toBeVisible()
  await expect(screen.getByRole('button', 'Save')).toBeDisabled()
  await expect(screen.getByRole('button', 'New provider')).toBeDisabled()
})

test('Una Referral Pending con encuentro abierto se edita, valida y se pide desde su ⋮', async ({ app, screen }) => {
  await app.open('/')
  await screen.getByRole('tab', /^Referrals/).tap()
  /* Olivia Brooks está en el sillón: su encuentro está abierto. */
  await screen.getByRole('button', /Complete this task/).last().tap()
  await expect(screen.getByText('Read-only mode')).toHaveCount(0)

  await screen.getByRole('textbox', /^Referral note/).fill('')
  await screen.getByRole('button', 'Save').tap()
  await expect(screen.getByText('This field is required.')).toBeVisible()

  await screen.getByRole('button', 'Actions for Referral for Olivia Brooks').tap()
  await screen.getByRole('menuitem', 'Request').tap()
  await screen.getByRole('dialog', 'Mark this referral as requested?').getByRole('button', 'Mark as requested').tap()
  await expect(screen.getByText('Referral for Olivia Brooks requested.')).toBeVisible()
  await expect(screen.getByText("This referral can't be edited")).toBeVisible()
})
