import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Patient Summary de Clinical Mode (red.dev: /clinical-mode/treatment-history): la lista de encuentros, lo que abre el
   ojo según el encuentro y la nota, la firma, el addendum y Download (CON-2731, CON-2727, CON-2728, CON-2730, CON-3508,
   CON-3773). Ver design-reference/figma/modulos/clinical-mode.md (2026-11-27, Patient Summary). */

const LISTA = '/patients/john-smith/clinical-mode?tab=Patient%20summary'
const ojo = (fecha: string) => new RegExp(`^View clinical note of the encounter of ${fecha}`)
const firmar = async (screen: { getByRole: (r: string, n?: string | RegExp) => any }) => {
  const login = screen.getByRole('dialog', 'Login to sign document')
  await expect(login.getByRole('button', 'Sign')).toBeDisabled()
  await login.getByPlaceholder('example@example.com').fill('sarah@example.com')
  await login.getByPlaceholder('Enter password').fill('secret')
  await login.getByRole('button', 'Sign').tap()
}

test('La lista pagina de a 10 y filtra por estado; un encuentro cancelado abre el error de red.dev', async ({ app, screen }) => {
  await app.open(LISTA)
  await expect(screen.getByText(/Showing 1 to 10 of 23 results/)).toBeVisible()
  /* Una nota ajena sin permiso no se abre ni se elige. */
  await expect(screen.getByText('Access restricted')).toBeVisible()
  await expect(screen.getByRole('button', ojo('09/22/2026'))).toHaveCount(0)
  /* Cancelado: el ojo abre el error de red.dev, con View PDF apagado y Return. */
  await screen.getByRole('button', ojo('10/20/2026')).tap()
  await expect(screen.getByText('Clinical note can only be rendered for an active or finished encounter')).toBeVisible()
  await expect(screen.getByRole('button', 'View PDF')).toBeDisabled()
  await screen.getByRole('button', 'Return').tap()
  /* "+N" despliega el resto de los procedimientos en la fila, sin abrir la nota. */
  await screen.getByRole('button', /^Show 2 more procedures/).tap()
  await expect(screen.getByText('D0220').first()).toBeVisible()
  await expect(screen.getByRole('button', 'Back to history')).toHaveCount(0)

  await screen.getByRole('button', 'Filter encounters').tap()
  await screen.getByRole('menuitemcheckbox', /Cancelled/).tap()
  await expect(screen.getByText(/Showing 1 to 2 of 2 results/)).toBeVisible()
})

test('El ojo abre la nota; al volver, la página y lo elegido siguen como estaban', async ({ app, screen }) => {
  await app.open(LISTA)
  await screen.getByRole('checkbox', 'Select encounter of 11/20/2026, Root canal follow-up').tap()
  await screen.getByRole('button', 'Next page').tap()
  await expect(screen.getByText(/Showing 11 to 20 of 23 results/)).toBeVisible()
  await screen.getByRole('button', ojo('08/05/2026')).tap()
  await expect(screen.getByRole('heading', 'Clinical note - Julio Perez')).toBeVisible()
  /* Firmada: sin Sign, con View PDF y Add addendum. */
  await expect(screen.getByRole('button', 'View PDF')).toBeVisible()
  await expect(screen.getByRole('button', 'Add addendum')).toBeVisible()
  await expect(screen.getByRole('button', 'Sign clinical note')).toHaveCount(0)
  await screen.getByRole('button', 'Back to history').tap()
  await expect(screen.getByText(/1 selected · Showing 11 to 20 of 23 results/)).toBeVisible()
})

test('Una nota sin firmar de un encuentro Completed se firma con el login y el encuentro pasa a Fulfilled', async ({ app, screen }) => {
  await app.open(LISTA)
  await screen.getByRole('button', ojo('11/20/2026')).tap()
  await screen.getByRole('button', 'Sign clinical note').tap()
  await firmar(screen)
  await expect(screen.getByText('Clinical note signed.')).toBeVisible()
  await expect(screen.getByRole('button', 'Sign clinical note')).toHaveCount(0)

  /* Ya firmada, Add addendum: el texto y el login en el mismo pop up, como red.dev. */
  await screen.getByRole('button', 'Add addendum').tap()
  const adenda = screen.getByRole('dialog', 'Add clinical note addendum')
  await expect(adenda.getByRole('button', 'Save addendum')).toBeDisabled()
  await adenda.getByPlaceholder('Type your addendum here...').fill('Patient called the next day: no pain.')
  await adenda.getByPlaceholder('example@example.com').fill('sarah@example.com')
  await adenda.getByPlaceholder('Enter password').fill('secret')
  await adenda.getByRole('button', 'Save addendum').tap()
  await expect(screen.getByText('Addendum added.')).toBeVisible()

  /* La lista lo muestra sin recargar (CON-3166). */
  await screen.getByRole('button', 'Back to history').tap()
  const fila = screen.getByRole('row', /11\/20\/2026/)
  await expect(fila).toContainText('Fulfilled')
  await expect(fila).toContainText('Signed')
})

test('Con el encuentro en curso la nota se ve pero todavía no se firma; cerrado, se firma aunque sea de otro provider', async ({ app, screen }) => {
  await app.open(LISTA)
  /* El encuentro de hoy entra a la lista cuando empieza. */
  await screen.getByRole('button', 'Start encounter').tap()
  await expect(screen.getByText(/Showing 1 to 10 of 24 results/)).toBeVisible()
  await expect(screen.getByRole('row', /11\/27\/2026/)).toContainText('In progress')
  await screen.getByRole('button', ojo('11/27/2026')).tap()
  await expect(screen.getByRole('button', 'Sign clinical note')).toHaveCount(0)
  await screen.getByRole('button', 'Back to history').tap()

  /* Cerrado solo a las 48 h: la nota quedó generada y se puede firmar. */
  await screen.getByRole('button', ojo('11/03/2026')).tap()
  await expect(screen.getByRole('button', 'Sign clinical note')).toBeVisible()
  await screen.getByRole('button', 'Back to history').tap()

  /* Como red.dev: la de otro provider también ofrece firmar; el login dice quién firma (CON-3648). */
  await screen.getByRole('button', ojo('10/27/2026')).tap()
  await expect(screen.getByRole('button', 'Sign clinical note')).toBeVisible()
})

test('Download se habilita al elegir una nota y avisa cuando empieza', async ({ app, screen }) => {
  await app.open(LISTA)
  await expect(screen.getByRole('button', 'Download')).toBeDisabled()
  await screen.getByRole('checkbox', 'Select encounter of 10/06/2026, Crown prep').tap()
  await screen.getByRole('button', 'Download (1)').tap()
  await expect(screen.getByText('Download started')).toBeVisible()
})
