import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Emails: la página aparte con los mails del backend (/emails/, fuera de la app). Ver design-reference/figma/modulos/emails.md (2026-11-18). */

test('Elegir un mail muestra su asunto, de dónde sale el texto y sus variables', async ({ app, screen }) => {
  await app.open('/emails/')
  await expect(screen.getByRole('heading', /Your clinic account is ready$/)).toBeVisible()

  await screen.getByRole('link', 'Appointment cancelled').tap()
  await expect(screen.getByRole('heading', /Your appointment has been cancelled$/)).toBeVisible()
  await expect(screen.getByText(/^From the document$/)).toBeVisible()
  await expect(screen.getByText(/^\{\{appointment_date\}\}$/)).toBeVisible()

  await screen.getByRole('link', /^Subscription expired/).tap()
  await expect(screen.getByText(/^Proposal · pending approval$/)).toBeVisible()
  await expect(screen.getByText(/^\{\{subscription_end_date\}\}$/)).toBeVisible()
})

test('La vista previa cambia entre escritorio y celular, y entre datos de ejemplo y variables', async ({ app, screen }) => {
  await app.open('/emails/#patient-welcome')
  const celular = screen.getByRole('tab', 'Mobile')
  await celular.tap()
  await expect(celular).toHaveAttribute('aria-selected', 'true')
  const variables = screen.getByRole('tab', 'Variables')
  await variables.tap()
  await expect(variables).toHaveAttribute('aria-selected', 'true')
  await expect(screen.getByRole('button', 'Download HTML')).toBeVisible()
})
