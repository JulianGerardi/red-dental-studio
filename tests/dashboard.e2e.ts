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

/* Cada columna muestra unos pocos y "Show N more" abre el resto; el total va en el título (comparativa del 2026-11-19,
   dashboard.md). Con ?day=busy quedan 12 turnos por llegar y 8 en la sala de espera. */
test('Con muchos turnos cada columna lleva su total y Show more', async ({ app, screen }) => {
  await app.open('/?day=busy')
  await expect(screen.getByRole('heading', 'Appointments 12')).toBeVisible()
  await expect(screen.getByRole('button', /^Check In/)).toHaveCount(6)
  await expect(screen.getByRole('button', /Show \d+ more/)).toHaveCount(3)

  await screen.getByRole('button', 'Show 6 more').tap()
  await expect(screen.getByRole('button', /^Check In/)).toHaveCount(12)
})

/* Check In saca la cita de Appointments y la deja en Checked in de la Waiting Room; Check Out la saca de la sala
   (comparativa del 2026-11-19, CON-1670). */
test('Check In pasa la cita a la Waiting Room y Check Out la saca', async ({ app, screen }) => {
  await app.open('/')
  await expect(screen.getByRole('heading', 'Appointments 9')).toBeVisible()
  await expect(screen.getByText('Checked in · 1')).toBeVisible()
  await expect(screen.getByText('On hold · 2')).toBeVisible()
  await expect(screen.getByText('Ready to check out · 5')).toBeVisible()
  /* La fila dibuja su versión angosta y la ancha; se ve una. */
  await expect(screen.getByText(/^Waiting · 12 min$/).first()).toBeVisible()

  await screen.getByRole('button', /^Check In/).first().tap()
  await expect(screen.getByRole('heading', 'Appointments 8')).toBeVisible()
  await expect(screen.getByRole('heading', 'Waiting Room 9')).toBeVisible()
  await expect(screen.getByText('Checked in · 2')).toBeVisible()

  await screen.getByRole('button', /^Check Out/).first().tap()
  await expect(screen.getByRole('heading', 'Waiting Room 8')).toBeVisible()
  await expect(screen.getByText('Ready to check out · 4')).toBeVisible()
})

/* Las salas cerradas dicen quién está ahora y quién sigue; sin turnos, No bookings y no Unavailable. */
test('Rooms: Now y Next en la sala cerrada y No bookings sin turnos', async ({ app, screen }) => {
  await app.open('/')
  const salas = screen.getByRole('group', 'Rooms')
  await expect(salas.getByRole('button', /^Emergency.*No bookings/)).toBeVisible()
  await expect(salas.getByText('Now: Olivia Brooks · Dr. Elena Martinez')).toBeVisible()
  await expect(salas.getByText('Next: 10:30 · Zoe Phillips · Dr. Daniel Anderson')).toBeVisible()
  await expect(salas.getByText('Unavailable')).toHaveCount(0)
})

/* Pending Task filtra por tipo con tabs, no con el embudo (Julián, 2026-10-29; antes el Filter que había reemplazado
   esas mismas tabs, dashboard.md 2026-08-28). Mismo control que el Pending Task del Patient Dashboard; acá sigue con
   "Show N more" (sin cargarAlScroll, que es sólo del Patient Dashboard). */
test('Pending Task: tabs por tipo acotan la lista', async ({ app, screen }) => {
  await app.open('/')
  await expect(screen.getByRole('tab', 'All (8)')).toBeVisible()
  /* Appointments y Waiting Room también llevan el suyo: tres en total. */
  await expect(screen.getByRole('button', /Show \d+ more/)).toHaveCount(3)

  await screen.getByRole('tab', /^Referrals/).tap()
  await expect(screen.getByText('Complete this Task')).toHaveCount(2)
  await expect(screen.getByText('Referrals · 2')).toBeVisible()
  /* Las dos entran sin pasar el tope: Pending Task se queda sin botón. */
  await expect(screen.getByRole('button', /Show \d+ more/)).toHaveCount(2)

  await screen.getByRole('tab', /^All/).tap()
  await expect(screen.getByRole('button', /Show \d+ more/)).toHaveCount(3)
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
  await expect(screen.getByRole('button', /^Check Out/)).toHaveCount(2)

  await salas.getByRole('button', /^Operatory 1/).tap()
  await expect(screen.getByRole('list', 'Operatory 1 today')).toHaveCount(0)
})

test('La Waiting Room se filtra con su propio Filter', async ({ app, screen }) => {
  await app.open('/')
  await expect(screen.getByRole('button', /^Check Out/)).toHaveCount(2)
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

  /* Noah James ya pasó a la Waiting Room: el primero de Appointments es Sophia Collins. */
  await screen.getByText(/Dr\. Elena Martinez/).first().tap()
  await expect(screen.getByRole('dialog', 'Details for Sophia Collins')).toBeVisible()
  await expect(screen.getByText('Reason for Visit')).toBeVisible()
})
