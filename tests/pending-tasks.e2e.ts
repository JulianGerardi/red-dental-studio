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

test('Request y Cancel preguntan antes; la orden queda en la lista con su estado nuevo', async ({ app, screen }) => {
  await app.open('/')
  await screen.getByRole('tab', /^Lab orders/).tap()
  /* Olivia Brooks está en el sillón: su encuentro está abierto. */
  await screen.getByRole('button', 'Actions for Lab order for Olivia Brooks').tap()
  await screen.getByRole('menuitem', 'Request').tap()
  await screen.getByRole('dialog', 'Request lab order').getByRole('button', 'Confirm').tap()
  await expect(screen.getByText('Lab order requested')).toBeVisible()
  await expect(screen.getByRole('button', 'Open PDF of the lab order for Olivia Brooks')).toBeVisible()

  /* Requested: Edit queda apagado (sólo se edita en Pending) y aparecen Reject, Deliver y Delay. */
  await screen.getByRole('button', 'Actions for Lab order for Olivia Brooks').tap()
  await expect(screen.getByRole('menuitem', 'Edit')).toHaveAttribute('aria-disabled', 'true')
  await expect(screen.getByRole('menuitem', 'Delay')).toBeVisible()
  await screen.getByRole('menuitem', 'Cancel').tap()
  await screen.getByRole('dialog', 'Cancel lab order').getByRole('button', 'Confirm').tap()
  await expect(screen.getByText('Lab order cancelled')).toBeVisible()
  await expect(screen.getByRole('tab', 'Lab orders (2)')).toBeVisible()
  await expect(screen.getByText('Cancelled')).toBeVisible()
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
