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

/* Desde 1280px las cuatro columnas toman el alto de la ventana y scrollean adentro: no hay "Show N more" y están todas
   las filas (dashboard.md, 2026-10-19). Con ?day=busy hay 35 turnos. */
test('Con muchos turnos las columnas scrollean adentro, sin Show more', async ({ app, screen }) => {
  await app.open('/?day=busy')
  await expect(screen.getByRole('button', /Show \d+ more/)).toHaveCount(0)
  await expect(screen.getByRole('button', /^Check In/)).toHaveCount(35)
})

/* Cada acción del turno avisa lo suyo y el escudo de al lado de Today lleva a las preguntas frecuentes (dashboard.md,
   2026-10-13). */
test('Check In avisa; FAQ lleva a Help', async ({ app, screen }) => {
  await app.open('/')
  await screen.getByRole('button', /^Check In/).first().tap()
  await expect(screen.getByText('Noah James checked in.')).toBeVisible()

  await screen.getByRole('link', 'Frequently asked questions').tap()
  await expect(screen.getByRole('heading', 'What can we help you with?')).toBeVisible()
})

/* Las salas son acordeones: tocar una despliega su línea del día y no filtra la Waiting Room, que tiene su propio Filter
   (dashboard.md, 2026-10-19). */
test('Tocar una sala despliega su día sin filtrar la Waiting Room', async ({ app, screen }) => {
  await app.open('/')
  const salas = screen.getByRole('group', 'Rooms')
  await expect(screen.getByRole('list', 'Operatory 1 today')).toHaveCount(0)

  await salas.getByRole('button', /^Operatory 1/).tap()
  await expect(screen.getByRole('list', 'Operatory 1 today')).toBeVisible()
  await expect(screen.getByText('Complete')).toBeVisible()
  await expect(screen.getByRole('button', /^Check Out/)).toHaveCount(6)

  await salas.getByRole('button', /^Operatory 1/).tap()
  await expect(screen.getByRole('list', 'Operatory 1 today')).toHaveCount(0)
})

test('La Waiting Room se filtra con su propio Filter', async ({ app, screen }) => {
  await app.open('/')
  await expect(screen.getByRole('button', /^Check Out/)).toHaveCount(6)
  await screen.getByRole('button', /Filter waiting room/).tap()
  await screen.getByRole('menuitemcheckbox', /Operatory 4/).tap()
  await screen.getByRole('menuitemcheckbox', /Operatory 4/).press('Escape')
  await expect(screen.getByRole('button', /^Check Out/)).toHaveCount(1)
})

/* Tocar el turno abre la ficha flotante del paciente; el botón de acción no (dashboard.md, 2026-10-19). */
test('Tocar un turno abre la ficha flotante y Check In no', async ({ app, screen }) => {
  await app.open('/')
  await screen.getByRole('button', /^Check In/).first().tap()
  await expect(screen.getByRole('dialog', /Details for/)).toHaveCount(0)

  await screen.getByText(/Dr\. Elena Martinez/).first().tap()
  await expect(screen.getByRole('dialog', 'Details for Noah James')).toBeVisible()
  await expect(screen.getByText('Reason for Visit')).toBeVisible()
})
