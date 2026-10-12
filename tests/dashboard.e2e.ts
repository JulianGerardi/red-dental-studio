import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Dashboard: el selector de fecha es el DatePicker en su look toolbar ("Feb 28, 2026"), el mismo campo y calendario
   que el filtro de Notifications. Ver design-reference/figma/modulos/dashboard.md (2026-10-12). */

const largo = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

test('La fecha se lee "Feb 28, 2026"; elegir un día lo cambia y Today vuelve a hoy', async ({ app, screen }) => {
  await app.open('/')
  const fecha = screen.getByRole('button', 'Feb 28, 2026')
  await expect(fecha).toBeVisible()

  await fecha.tap()
  await expect(screen.getByRole('dialog', 'Select date')).toBeVisible()
  await screen.getByRole('button', 'Friday, February 27, 2026').tap()
  await expect(screen.getByRole('dialog')).toHaveCount(0)
  await expect(screen.getByRole('button', 'Feb 27, 2026')).toBeVisible()

  await screen.getByRole('button', /Today/).tap()
  await expect(screen.getByRole('button', largo(new Date()))).toBeVisible()
  await expect(screen.getByRole('button', /Today/)).toHaveCount(0)
})

/* Listas largas: se ven unos pocos y "Show N more" abre el resto con scroll adentro; "Show less" vuelve
   (ui/show-more, dashboard.md 2026-10-12). Con ?day=busy hay 35 turnos. */
test('Con muchos turnos se ven cinco y Show more abre el resto con scroll', async ({ app, screen }) => {
  await app.open('/?day=busy')
  await expect(screen.getByRole('button', 'Show 30 more')).toBeVisible()
  await expect(screen.getByRole('region', 'All appointments')).toHaveCount(0)

  await screen.getByRole('button', 'Show 30 more').tap()
  await expect(screen.getByRole('region', 'All appointments')).toBeVisible()
  await expect(screen.getByRole('button', 'Show less')).toBeVisible()

  await screen.getByRole('button', 'Show less').tap()
  await expect(screen.getByRole('region', 'All appointments')).toHaveCount(0)
  await expect(screen.getByRole('button', 'Show 30 more')).toBeVisible()
})
