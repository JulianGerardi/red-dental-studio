import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Confibot y "currently being seen" viven recogidos en una columna pegada al borde derecho: las dos pestañas, una
   abajo de la otra, y al abrir una su hoja/card se despliega en la columna y empuja a la otra. Ver
   design-reference/figma/modulos/help.md (2026-10-27). */

test('La pestaña de Confibot abre el chat, y la pestaña se queda y lo cierra', async ({ app, screen }) => {
  await app.open('/')
  const pestana = screen.getByRole('button', 'Open Confibot')
  await expect(pestana).toBeVisible()

  await pestana.tap()
  await expect(screen.getByText('Here to explain the app')).toBeVisible()
  await screen.getByRole('button', 'Hide Confibot chat').tap()
  await expect(screen.getByText('Here to explain the app')).toHaveCount(0)
  await expect(pestana).toBeVisible()

  await pestana.tap()
  await screen.getByRole('button', 'Close Confibot').tap()
  await expect(screen.getByText('Here to explain the app')).toHaveCount(0)

  await app.open('/patients')
  await expect(screen.getByRole('button', 'Open Confibot')).toBeVisible()
})

test('Por default las dos pestañas van una abajo de la otra, y al abrir Confibot la de Patients sigue a la vista', async ({ app, screen }) => {
  await app.open('/')
  const pacientes = await screen.getByRole('button', 'Open currently being seen').boundingBox()
  const confibot = await screen.getByRole('button', 'Open Confibot').boundingBox()
  expect(pacientes && confibot).toBeTruthy()
  expect(pacientes!.y + pacientes!.height).toBeLessThanOrEqual(confibot!.y)
  expect(confibot!.y - (pacientes!.y + pacientes!.height)).toBeLessThan(8)

  await screen.getByRole('button', 'Open Confibot').tap()
  await expect(screen.getByText('Here to explain the app')).toBeVisible()
  /* La columna se despliega y sube con una animación de ~260ms: se mide cuando ya se asentó. */
  await new Promise((r) => setTimeout(r, 700))
  const pacientesAbierto = await screen.getByRole('button', 'Open currently being seen').boundingBox()
  const hoja = await screen.getByText('Here to explain the app').boundingBox()
  const pestanaConfibot = await screen.getByRole('button', 'Hide Confibot chat').boundingBox()
  /* Patients arriba, la pestaña de Confibot pegada abajo de ella (el botón de cerrar no se aleja) y la hoja abajo de la
     pestaña: nada se pisa. */
  expect(pacientesAbierto!.y + pacientesAbierto!.height).toBeLessThanOrEqual(pestanaConfibot!.y)
  expect(pestanaConfibot!.y - (pacientesAbierto!.y + pacientesAbierto!.height)).toBeLessThan(8)
  expect(pestanaConfibot!.y + pestanaConfibot!.height).toBeLessThanOrEqual(hoja!.y)
})

test('En Scheduling la pestaña de Confibot no tapa el botón de Appointment requests', async ({ app, screen }) => {
  await app.open('/scheduling')
  const confibot = await screen.getByRole('button', 'Open Confibot').boundingBox()
  const solicitudes = await screen.getByRole('button', 'Appointment requests').boundingBox()
  expect(confibot && solicitudes).toBeTruthy()
  const seCruzan = confibot!.x < solicitudes!.x + solicitudes!.width && confibot!.x + confibot!.width > solicitudes!.x
    && confibot!.y < solicitudes!.y + solicitudes!.height && confibot!.y + confibot!.height > solicitudes!.y
  expect(seCruzan).toBe(false)
})
