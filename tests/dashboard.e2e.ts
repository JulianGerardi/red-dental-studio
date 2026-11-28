import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Dashboard: la fecha es el bloque ‹ Today › + calendario (ui/date-nav, el mismo de Scheduling); el campo dice
   "Feb 28, 2026". Ver design-reference/figma/modulos/dashboard.md (2026-11-24). */

test('La fecha se lee "Feb 28, 2026"; elegir un día lo cambia y Today vuelve a hoy', async ({ app, screen }) => {
  await app.open('/')
  const fecha = screen.getByRole('button', 'Feb 28, 2026')
  await expect(fecha).toBeVisible()

  await fecha.tap()
  await expect(screen.getByRole('dialog', 'Select date')).toBeVisible()
  await screen.getByRole('button', 'Friday, February 27, 2026').tap()
  await expect(screen.getByRole('dialog')).toHaveCount(0)
  await expect(screen.getByRole('button', 'Feb 27, 2026')).toBeVisible()

  // Las flechas mueven un día; Today vuelve al hoy de la demo y queda activo (ui/date-nav, dashboard.md 2026-11-26).
  await expect(screen.getByRole('button', 'Today')).toHaveAttribute('aria-pressed', 'false')
  await screen.getByRole('button', 'Next day').tap()
  await screen.getByRole('button', 'Next day').tap()
  await expect(screen.getByRole('button', 'Mar 1, 2026')).toBeVisible()
  await screen.getByRole('button', 'Today').tap()
  await expect(screen.getByRole('button', 'Feb 28, 2026')).toBeVisible()
  await expect(screen.getByRole('button', 'Today')).toHaveAttribute('aria-pressed', 'true')
})

/* Cada columna muestra unos pocos y "Show N more" abre el resto; el total va en el título (comparativa del 2026-11-19,
   dashboard.md). Con ?day=busy quedan 12 turnos por llegar y 8 en la sala de espera. */
test('Con muchos turnos cada columna lleva su total y Show more', async ({ app, screen }) => {
  await app.open('/?day=busy')
  await expect(screen.getByRole('heading', 'Appointments 12 appointments to check in')).toBeVisible()
  await expect(screen.getByRole('button', /^Check in/)).toHaveCount(6)
  await expect(screen.getByRole('button', /Show \d+ more/)).toHaveCount(3)

  await screen.getByRole('button', 'Show 6 more').tap()
  await expect(screen.getByRole('button', /^Check in/)).toHaveCount(12)
})

/* Check in saca la cita de Appointments y la deja en Checked in de la Waiting room; Check out la saca de la sala
   (comparativa del 2026-11-19, CON-1670). */
test('Check in pasa la cita a la Waiting room y Check out la saca', async ({ app, screen }) => {
  await app.open('/')
  await expect(screen.getByRole('heading', 'Appointments 9 appointments to check in')).toBeVisible()
  await expect(screen.getByText('Checked in · 1')).toBeVisible()
  await expect(screen.getByText('On hold · 2')).toBeVisible()
  await expect(screen.getByText('Ready to check out · 5')).toBeVisible()
  /* La fila dibuja su versión angosta y la ancha; se ve una. */
  await expect(screen.getByText(/^Waiting · 12 min$/).first()).toBeVisible()

  await screen.getByRole('button', /^Check in/).first().tap()
  await expect(screen.getByRole('heading', 'Appointments 8 appointments to check in')).toBeVisible()
  await expect(screen.getByRole('heading', 'Waiting room 9 patients in the waiting room')).toBeVisible()
  await expect(screen.getByText('Checked in · 2')).toBeVisible()

  await screen.getByRole('button', /^Check out/).first().tap()
  await expect(screen.getByRole('heading', 'Waiting room 8 patients in the waiting room')).toBeVisible()
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

/* Pending task filtra por tipo con tabs, no con el embudo (Julián, 2026-10-29; antes el Filter que había reemplazado
   esas mismas tabs, dashboard.md 2026-08-28). Mismo control que el Pending task del Patient Dashboard; acá sigue con
   "Show N more" (sin cargarAlScroll, que es sólo del Patient Dashboard). */
test('Pending task: tabs por tipo acotan la lista', async ({ app, screen }) => {
  await app.open('/')
  await expect(screen.getByRole('tab', 'All (8)')).toBeVisible()
  /* Appointments y Waiting room también llevan el suyo: tres en total. */
  await expect(screen.getByRole('button', /Show \d+ more/)).toHaveCount(3)

  await screen.getByRole('tab', /^Referrals/).tap()
  await expect(screen.getByText('Complete this task')).toHaveCount(2)
  await expect(screen.getByText('Referrals · 2')).toBeVisible()
  /* Las dos entran sin pasar el tope: Pending task se queda sin botón. */
  await expect(screen.getByRole('button', /Show \d+ more/)).toHaveCount(2)

  await screen.getByRole('tab', /^All/).tap()
  await expect(screen.getByRole('button', /Show \d+ more/)).toHaveCount(3)
})

/* Cada acción del turno avisa lo suyo y el escudo de al lado de Today lleva a las preguntas frecuentes (dashboard.md,
   2026-10-13). */
test('Check in avisa; FAQ lleva a Help', async ({ app, screen }) => {
  await app.open('/')
  await screen.getByRole('button', /^Check in/).first().tap()
  await expect(screen.getByText('Noah James checked in.')).toBeVisible()

  await screen.getByRole('link', 'Frequently asked questions').tap()
  await expect(screen.getByRole('heading', 'What can we help you with?')).toBeVisible()
})

/* Las salas son acordeones: tocar una despliega su línea del día y no filtra la Waiting room, que tiene su propio Filter
   (dashboard.md, 2026-10-19). */
test('Tocar una sala despliega su día sin filtrar la Waiting room', async ({ app, screen }) => {
  await app.open('/')
  const salas = screen.getByRole('group', 'Rooms')
  await expect(screen.getByRole('list', 'Operatory 1 today')).toHaveCount(0)

  await salas.getByRole('button', /^Operatory 1/).tap()
  await expect(screen.getByRole('list', 'Operatory 1 today')).toBeVisible()
  await expect(screen.getByText('Complete')).toBeVisible()
  await expect(screen.getByRole('button', /^Check out/)).toHaveCount(2)

  await salas.getByRole('button', /^Operatory 1/).tap()
  await expect(screen.getByRole('list', 'Operatory 1 today')).toHaveCount(0)
})

/* La Waiting room se filtra por etapa visible; la cuenta del título sigue al filtro (dashboard.md, 2026-11-19). */
test('La Waiting room se filtra por Visit stage', async ({ app, screen }) => {
  await app.open('/')
  await screen.getByRole('button', /Filter waiting room/).tap()
  await screen.getByRole('menuitemcheckbox', /Ready to check out/).tap()
  await screen.getByRole('menuitemcheckbox', /Ready to check out/).press('Escape')
  await expect(screen.getByRole('heading', 'Waiting room 5 patients in the waiting room')).toBeVisible()
  await expect(screen.getByText('On hold · 2')).toHaveCount(0)
  await expect(screen.getByRole('button', /^Check out/)).toHaveCount(5)
})

/* Provider y Room se combinan; la cuenta del título es la de las citas que quedan (dashboard.md, 2026-11-19). */
test('Appointments se filtra por Provider y Room combinados', async ({ app, screen }) => {
  await app.open('/')
  await screen.getByRole('button', /Filter appointments/).tap()
  await screen.getByRole('menuitemcheckbox', /Dr\. Elena Martinez/).tap()
  await screen.getByRole('menuitemcheckbox', /Operatory 2/).tap()
  await screen.getByRole('menuitemcheckbox', /Operatory 2/).press('Escape')
  await expect(screen.getByRole('heading', 'Appointments 2 appointments to check in')).toBeVisible()
  await expect(screen.getByRole('button', /^Check in/)).toHaveCount(2)
})

/* El kebab de una cita Booked: Mark as no-show sólo si ya pasó la hora (CON-1828); Cancel pide motivo (CON-1827). */
test('Booked: No show sólo con la hora pasada y Cancel con motivo', async ({ app, screen }) => {
  await app.open('/')
  await screen.getByRole('button', 'Actions for Sophia Collins').first().tap()
  await expect(screen.getByRole('menuitem', /Mark as no-show/)).toHaveCount(0)
  await screen.getByRole('menuitem', /Cancel appointment/).tap()
  await expect(screen.getByRole('button', 'Cancel appointment')).toBeDisabled()
  await screen.getByText('Select a reason').tap()
  await screen.getByText('Patient illness').tap()
  await screen.getByRole('button', 'Cancel appointment').tap()
  await expect(screen.getByText(/updated to Canceled/)).toBeVisible()
  await expect(screen.getByRole('heading', 'Appointments 8 appointments to check in')).toBeVisible()

  await screen.getByRole('button', 'Actions for Noah James').first().tap()
  await screen.getByRole('menuitem', /Mark as no-show/).tap()
  await screen.getByRole('button', 'Mark as no show').tap()
  await expect(screen.getByText('The appointment status has been updated to No show.')).toBeVisible()
  await expect(screen.getByRole('heading', 'Appointments 7 appointments to check in')).toBeVisible()
})

/* En la Waiting room el menú depende de la etapa: Cancel sólo en Checked in; On hold sólo deja cambiar la sala. */
test('Waiting room: el menú y Edit appointment según la etapa', async ({ app, screen }) => {
  await app.open('/')
  await screen.getByRole('button', 'Actions for Zoe Phillips').first().tap()
  await expect(screen.getByRole('menuitem', /Cancel appointment/)).toBeVisible()
  await screen.getByRole('menuitem', /Cancel appointment/).press('Escape')

  await screen.getByRole('button', 'Actions for Henry Richardson').first().tap()
  await expect(screen.getByRole('menuitem', /Cancel appointment/)).toHaveCount(0)
  await screen.getByRole('menuitem', /Edit appointment/).tap()
  await expect(screen.getByText('This visit is on hold')).toBeVisible()
  await expect(screen.getByRole('tab', 'Schedule')).toHaveAttribute('aria-selected', 'true')
})

/* Tocar el turno abre la ficha flotante del paciente; el botón de acción no (dashboard.md, 2026-10-19). */
test('Tocar un turno abre la ficha flotante y Check in no', async ({ app, screen }) => {
  await app.open('/')
  await screen.getByRole('button', /^Check in/).first().tap()
  await expect(screen.getByRole('dialog', /Details for/)).toHaveCount(0)

  /* Noah James ya pasó a la Waiting room: el primero de Appointments es Sophia Collins. */
  await screen.getByText(/Dr\. Elena Martinez/).first().tap()
  await expect(screen.getByRole('dialog', 'Details for Sophia Collins')).toBeVisible()
  /* Una cita Booked todavía no tiene encounter: sin Start encounter (CON-4179). */
  await expect(screen.getByText('Start encounter')).toHaveCount(0)
  await expect(screen.getByText('Reason for visit')).toBeVisible()
})

/* Start encounter sólo con el encounter Planned (Checked in); Waiting cuenta desde el check-in (CON-4178, CON-4179). */
test('Checked in: Start encounter en la ficha y Waiting desde el check-in', async ({ app, screen }) => {
  await app.open('/')
  await expect(screen.getByText(/^Waiting · 12 min$/).first()).toBeVisible()
  await screen.getByText(/Dr\. Daniel Anderson · Operatory 1/).first().tap()
  await expect(screen.getByRole('dialog', 'Details for Zoe Phillips')).toBeVisible()
  await expect(screen.getByText('Start encounter')).toBeVisible()
  await expect(screen.getByText('Planned')).toBeVisible()
})

/* Con citas en el día pero ninguna que coincida, el vacío lo dice (CON-4176, CON-4178); el menú no lleva Edit patient. */
test('Filtros sin resultados y menú de Booked sin Edit patient', async ({ app, screen }) => {
  await app.open('/')
  await screen.getByRole('button', 'Actions for Noah James').first().tap()
  await expect(screen.getByRole('menuitem', /Edit patient/)).toHaveCount(0)
  await screen.getByRole('menuitem', /Edit appointment/).press('Escape')

  await screen.getByRole('button', /Filter appointments/).tap()
  await screen.getByRole('menuitemcheckbox', /Dr\. Emily Chen/).tap()
  await screen.getByRole('menuitemcheckbox', /Operatory 1/).tap()
  await screen.getByRole('menuitemcheckbox', /Operatory 1/).press('Escape')
  await expect(screen.getByText('No results match your filters')).toBeVisible()
  // En cero el globo no se muestra (dashboard.md, 2026-11-28).
  await expect(screen.getByRole('heading', 'Appointments', { exact: true })).toBeVisible()
})
