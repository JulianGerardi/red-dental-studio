import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Lo que hacen los botones de Pending Task (videos de red.dev de Julián, 2026-11-20; CON-2641 y CON-2643). Ver
   design-reference/figma/modulos/dashboard.md. */

const SIN_ENCUENTRO = /no open encounter for the selected patient/

test('Sin encuentro abierto el ⋮ explica por qué y no deja hacer nada', async ({ app, screen }) => {
  await app.open('/')
  await screen.getByRole('tab', /^Lab Orders/).tap()
  await screen.getByRole('button', 'Actions for Lab order for James Foster').tap()
  await expect(screen.getByText(SIN_ENCUENTRO)).toBeVisible()
  await expect(screen.getByRole('menuitem', 'Cancel')).toBeDisabled()
})

test('Request pasa la orden a Requested y Cancel la saca de la lista', async ({ app, screen }) => {
  await app.open('/')
  await screen.getByRole('tab', /^Lab Orders/).tap()
  /* Olivia Brooks está en el sillón: su encuentro está abierto. */
  await screen.getByRole('button', 'Actions for Lab order for Olivia Brooks').tap()
  await screen.getByRole('menuitem', 'Request').tap()
  await expect(screen.getByText('Lab order for Olivia Brooks requested.')).toBeVisible()
  await expect(screen.getByRole('button', 'Open PDF of the lab order for Olivia Brooks')).toBeVisible()

  await screen.getByRole('button', 'Actions for Lab order for Olivia Brooks').tap()
  await screen.getByRole('menuitem', 'Cancel').tap()
  await screen.getByRole('dialog', 'Cancel this lab order?').getByRole('button', 'Cancel lab order').tap()
  await expect(screen.getByRole('tab', 'Lab Orders (1)')).toBeVisible()
})

test('Complete this Task abre el detalle de la orden, en sólo lectura sin encuentro', async ({ app, screen }) => {
  await app.open('/')
  await screen.getByRole('tab', /^Lab Orders/).tap()
  /* Por vencimiento, la de James Foster (todavía no llegó) va primero. */
  await screen.getByRole('button', /Complete this Task/).first().tap()
  await expect(screen.getByText('Read-only mode')).toBeVisible()
  await expect(screen.getByRole('button', 'Save')).toBeDisabled()
  await screen.getByRole('button', 'Cancel').tap()
  await expect(screen.getByRole('button', 'View History')).toBeVisible()
})

test('La Clinical Note se firma desde Complete this Task y sale de la lista', async ({ app, screen }) => {
  await app.open('/patients/1')
  await screen.getByRole('tab', /^Clinical Note/).tap()
  await screen.getByRole('button', /Complete this Task/).first().tap()
  await screen.getByRole('button', 'Review and sign').tap()
  await expect(screen.getByRole('tab', 'Clinical Note (1)')).toBeVisible()
})
