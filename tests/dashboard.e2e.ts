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
   (ui/show-more, dashboard.md 2026-10-12). Con ?day=busy hay 35 turnos, 7 por sala. */
test('Con muchos turnos en la sala se ven cinco y Show more abre el resto con scroll', async ({ app, screen }) => {
  await app.open('/?day=busy')
  await expect(screen.getByRole('button', 'Show 2 more')).toBeVisible()
  await expect(screen.getByRole('region', 'All appointments')).toHaveCount(0)

  await screen.getByRole('button', 'Show 2 more').tap()
  await expect(screen.getByRole('region', 'All appointments')).toBeVisible()
  await expect(screen.getByRole('button', 'Show less')).toBeVisible()

  await screen.getByRole('button', 'Show less').tap()
  await expect(screen.getByRole('region', 'All appointments')).toHaveCount(0)
  await expect(screen.getByRole('button', 'Show 2 more')).toBeVisible()
})

/* La organización del 2026-10-13 (dashboard.md): las salas en una tira con scroll horizontal, el aviso de Check In
   y el escudo de al lado de Today que lleva a las preguntas frecuentes. */
test('Las salas van arriba; Check In avisa; FAQ lleva a Help', async ({ app, screen }) => {
  await app.open('/')
  await expect(screen.getByRole('region', 'Rooms')).toBeVisible()

  await screen.getByRole('button', /^Check In/).first().tap()
  await expect(screen.getByText('Mara Otero checked in.')).toBeVisible()

  await screen.getByRole('link', 'Frequently asked questions').tap()
  await expect(screen.getByRole('heading', 'What can we help you with?')).toBeVisible()
})

/* Siempre hay una sala elegida (la primera) y Appointments y Waiting Room muestran sólo a los suyos; el número
   "Patients today" es la cantidad de turnos de esa sala (dashboard.md, 2026-10-19). */
test('La sala elegida filtra Appointments y Waiting Room, y su número coincide', async ({ app, screen }) => {
  await app.open('/')
  const salas = screen.getByRole('region', 'Rooms')
  await expect(salas.getByRole('button', /^Operatory 1/)).toHaveAttribute('aria-pressed', 'true')
  await expect(salas.getByRole('button', /^Operatory 1/)).toContainText('Patients today: 2')
  await expect(screen.getByRole('heading', /^Appointments/)).toContainText('Operatory 1')
  await expect(screen.getByRole('button', /^Check In/)).toHaveCount(2)

  await salas.getByRole('button', /^Operatory 2/).tap()
  await expect(salas.getByRole('button', /^Operatory 2/)).toHaveAttribute('aria-pressed', 'true')
  await expect(salas.getByRole('button', /^Operatory 1/)).toHaveAttribute('aria-pressed', 'false')
  await expect(salas.getByRole('button', /^Operatory 2/)).toContainText('Patients today: 3')
  await expect(screen.getByRole('button', /^Check In/)).toHaveCount(3)

  await salas.getByRole('button', /^Operatory 5/).tap()
  await expect(screen.getByText('No appointments in Operatory 5')).toBeVisible()
  await expect(screen.getByText('No one is waiting for Operatory 5')).toBeVisible()
})
