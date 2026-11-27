import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Emails: la página aparte con los mails del backend (/emails/, fuera de la app). Ver design-reference/figma/modulos/emails.md (2026-11-18). */

test('Elegir un mail muestra su asunto, de dónde sale el texto y sus variables', async ({ app, screen }) => {
  await app.open('/emails/')
  await expect(screen.getByRole('heading', /Your clinic account is ready$/)).toBeVisible()

  await screen.getByRole('link', 'Appointment canceled').tap()
  await expect(screen.getByRole('heading', /Your appointment has been canceled$/)).toBeVisible()
  await expect(screen.getByText(/^From the Figma$/)).toBeVisible()
  await expect(screen.getByText(/^\{\{appointment_date\}\}$/)).toBeVisible()

  await screen.getByRole('link', /^Treatment plan ready/).tap()
  await expect(screen.getByText(/^Proposal · pending approval$/)).toBeVisible()
  await expect(screen.getByText(/^\{\{portal_link\}\}$/)).toBeVisible()
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

test('En los mails de la clínica se prueba el logo de ejemplo en otros colores', async ({ app, screen }) => {
  await app.open('/emails/#appointment-request')
  const azul = screen.getByRole('button', 'Blue logo')
  await azul.tap()
  await expect(azul).toHaveAttribute('aria-pressed', 'true')
  await screen.getByRole('link', 'Clinic account ready').tap()
  await expect(screen.getByRole('button', 'Blue logo')).not.toBeVisible()
})

test('Download PDF arma el PDF del mail sin errores', async ({ app, screen }) => {
  await app.open('/emails/#appointment-request')
  const pdf = screen.getByRole('button', 'Download PDF')
  await pdf.tap()
  await expect(screen.getByRole('button', 'Download PDF')).toBeEnabled()
  await expect(screen.getByText(/Couldn’t create the PDF/)).not.toBeVisible()
})
