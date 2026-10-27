import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Confibot flota abajo a la derecha: abre el chat, se recoge en una pestaña que se recuerda y, en Scheduling, se apila
   arriba del botón de Appointment requests en vez de taparlo. Ver design-reference/figma/modulos/help.md (2026-10-13). */

test('El botón flotante abre el chat, se recoge y sigue recogido al volver', async ({ app, screen }) => {
  await app.open('/')
  const boton = screen.getByRole('button', 'Open Confibot. Drag to move.')
  await expect(boton).toBeVisible()

  await boton.tap()
  await expect(screen.getByText('Here to explain the app')).toBeVisible()
  await expect(boton).toHaveCount(0)
  await screen.getByRole('button', 'Close Confibot').tap()
  await expect(boton).toBeVisible()

  await screen.getByRole('button', 'Tuck Confibot away').tap()
  await expect(boton).toHaveCount(0)
  await expect(screen.getByRole('button', 'Open Confibot')).toBeVisible()

  await app.open('/patients')
  await expect(screen.getByRole('button', 'Open Confibot')).toBeVisible()
  /* Un solo clic en la pestaña abre el chat, y la pestaña se queda (con el chat abierto dice Hide Confibot chat). */
  await screen.getByRole('button', 'Open Confibot').tap()
  await expect(screen.getByText('Here to explain the app')).toBeVisible()
  await screen.getByRole('button', 'Hide Confibot chat').tap()
  await expect(screen.getByText('Here to explain the app')).toHaveCount(0)
  await expect(screen.getByRole('button', 'Open Confibot')).toBeVisible()
})

test('En Scheduling queda arriba del botón de Appointment requests, sin taparlo', async ({ app, screen }) => {
  await app.open('/scheduling')
  const confibot = await screen.getByRole('button', 'Open Confibot. Drag to move.').boundingBox()
  const solicitudes = await screen.getByRole('button', 'Appointment requests').boundingBox()
  expect(confibot && solicitudes).toBeTruthy()
  expect(confibot!.y + confibot!.height).toBeLessThan(solicitudes!.y)
  expect(Math.abs(confibot!.x + confibot!.width / 2 - (solicitudes!.x + solicitudes!.width / 2))).toBeLessThan(1)
})
