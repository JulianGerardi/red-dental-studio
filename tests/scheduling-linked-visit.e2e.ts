import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* New Appointment con una visita linkeada a otro turno: se ve en la fila y Save pregunta si se mueve
   (design-reference/figma/modulos/scheduling.md, 2026-10-17). */

async function hastaElPlan(app: any, screen: any) {
  await app.open('/scheduling')
  await screen.getByRole('button', 'New appointment').first().tap()
  const drawer = screen.getByRole('dialog', 'New Appointment')
  await drawer.getByRole('combobox', 'Patient').fill('John')
  await drawer.getByRole('option', /^John Smith/).tap()
  await drawer.getByRole('combobox', 'Primary Provider').fill('Emily')
  await drawer.getByRole('option', /^Dr. Emily Chen/).tap()
  // Con "Select": Status, Reason for Visit, Start Time, End Time y Operatory (orden de CON-4090).
  // Tocar Start Time despliega el calendario del día: elegir una franja completa la fecha y las dos horas.
  await drawer.getByRole('button', /^Select$/).nth(2).tap()
  await screen.getByRole('button', 'Schedule at 10 AM').tap()
  // Quedan Status, Reason for Visit y Operatory.
  await drawer.getByRole('button', /^Select$/).nth(2).tap()
  await drawer.getByRole('button', 'Operatory 1').tap()
  await drawer.getByRole('button', /^Select$/).nth(0).tap()
  await drawer.getByRole('button', 'Booked').tap()
  await drawer.getByRole('button', /Next Step/).tap()
  return drawer
}

test('una visita linkeada muestra su otro turno y Cancel deja todo como estaba', async ({ app, screen }) => {
  const drawer = await hastaElPlan(app, screen)
  await expect(drawer.getByText('Linked appointment')).toBeVisible()
  await drawer.getByRole('radio', /^Visit 2/).tap()
  await drawer.getByRole('button', /^Save/).tap()

  const pregunta = screen.getByRole('dialog', 'Move treatment visit?')
  await expect(pregunta.getByText(/Visit 2 is linked to the appointment on 09\/28\/2026 at 1:15 PM/)).toBeVisible()
  await pregunta.getByRole('button', 'Cancel').tap()
  // Sigue el drawer, con la visita elegida.
  await expect(drawer).toBeVisible()
  await expect(drawer.getByRole('radio', /^Visit 2/)).toHaveAttribute('aria-checked', 'true')
})

test('Move visit guarda el turno y avisa que la visita se movió', async ({ app, screen }) => {
  const drawer = await hastaElPlan(app, screen)
  await drawer.getByRole('radio', /^Visit 2/).tap()
  await drawer.getByRole('button', /^Save/).tap()
  await screen.getByRole('dialog', 'Move treatment visit?').getByRole('button', 'Move visit').tap()

  await expect(screen.getByText(/Visit 2 moved from the 09\/28\/2026 appointment/)).toBeVisible()
  await expect(screen.getByText(/Appointment for John Smith booked at 10 AM/)).toBeVisible()
})

test('una visita sin otro turno se guarda sin preguntar', async ({ app, screen }) => {
  const drawer = await hastaElPlan(app, screen)
  await drawer.getByRole('radio', /^Visit 3/).tap()
  await drawer.getByRole('button', /^Save/).tap()

  await expect(screen.getByText(/Appointment for John Smith booked at 10 AM/)).toBeVisible()
  await expect(screen.getByRole('dialog', 'Move treatment visit?')).toHaveCount(0)
})
