import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Notifications: el filtro de fecha. Los datos son relativos a hoy, así que las fechas del test también. Ver
   design-reference/figma/modulos/notifications.md (2026-10-12). */

const haceDias = (n: number) => {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() - n)
}
const nombreDia = (d: Date) => d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
const meses = (a: Date, b: Date) => (b.getFullYear() - a.getFullYear()) * 12 + b.getMonth() - a.getMonth()

test('Un atajo acota la lista y las pestañas; la ✕ vuelve a todas las fechas', async ({ app, screen }) => {
  await app.open('/notifications')
  const fecha = screen.getByRole('button', /^Filter notifications by date:/)
  await expect(fecha).toHaveAttribute('aria-label', 'Filter notifications by date: All dates')
  await expect(screen.getByText(/^Weekly report is ready$/).first()).toBeVisible()

  await fecha.tap()
  await screen.getByRole('button', 'Last 7 days').tap()
  await expect(fecha).toHaveAttribute('aria-label', 'Filter notifications by date: Last 7 days')
  await expect(screen.getByText(/^Referral expires today/)).toBeVisible()
  await expect(screen.getByText(/^Weekly report is ready$/)).toHaveCount(0)

  await screen.getByRole('button', 'Clear dates').tap()
  await expect(fecha).toHaveAttribute('aria-label', 'Filter notifications by date: All dates')
  await expect(screen.getByText(/^Weekly report is ready$/).first()).toBeVisible()
})

test('Dos clics en el calendario arman un rango; sin nada en él, el vacío ofrece Clear dates', async ({ app, screen }) => {
  await app.open('/notifications')
  const desde = haceDias(21)
  const hasta = haceDias(14)
  await screen.getByRole('button', /^Filter notifications by date:/).tap()
  for (let i = 0; i < meses(desde, new Date()); i++) await screen.getByRole('button', 'Previous month').tap()
  await screen.getByRole('button', nombreDia(desde)).tap()
  await expect(screen.getByText('Now pick the end date.')).toBeVisible()
  if (meses(desde, hasta)) await screen.getByRole('button', 'Next month').tap()
  await screen.getByRole('button', nombreDia(hasta)).tap()

  await expect(screen.getByRole('button', /^Filter notifications by date: .+ – .+$/)).toBeVisible()
  await expect(screen.getByText(/^Insurance verified$/)).toBeVisible()
  await expect(screen.getByText(/^Referral expires today/)).toHaveCount(0)

  await screen.getByRole('tab', /Unread/).tap()
  await expect(screen.getByText('No unread notifications on these dates')).toBeVisible()
  await screen.getByRole('button', 'Clear dates').first().tap()
  await expect(screen.getByText(/^Referral expires today/)).toBeVisible()
})
