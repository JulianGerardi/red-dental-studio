import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Settings → Billing como en red.dev: carriers con sus planes, fee schedules con versiones y coverage tables con
   excepciones. Ver design-reference/figma/modulos/settings-billing.md. */

test('New carrier pide lo obligatorio y completa el Payer ID desde el buscador', async ({ app, screen }) => {
  await app.open('/settings/finance/carriers')
  await screen.getByRole('button', 'New carrier').tap()
  const drawer = screen.getByRole('dialog', 'New carrier')
  await drawer.getByRole('button', /Next step/).tap()
  await expect(drawer.getByText('This field is required.').first()).toBeVisible()

  await drawer.getByPlaceholder('Select carrier').fill('Humana')
  await drawer.getByRole('button', 'Humana Dental - 73288').tap()
  await drawer.getByRole('button', 'Select a printed claim format').tap()
  await drawer.getByRole('button', 'ADA 2024').tap()
  await drawer.getByRole('button', 'Increase Expected period of insurance claim resolution').tap()
  await drawer.getByRole('button', /Next step/).tap()
  await drawer.getByPlaceholder('example@example.com').fill('claims@humana.example')
  await drawer.getByPlaceholder('555').fill('800')
  await drawer.getByPlaceholder('000-0000').fill('4483303')
  await drawer.getByRole('button', /^Save/).tap()

  await expect(screen.getByText(/Humana Dental was added/)).toBeVisible()
  await expect(screen.getByText('73288')).toBeVisible()
})

test('un plan nuevo se arma en cuatro pasos y sigue en su Coverage table', async ({ app, screen }) => {
  await app.open('/settings/finance/carriers/cigna/edit/insurance-plans')
  await screen.getByRole('button', 'New insurance plan').tap()
  const drawer = screen.getByRole('dialog', 'New insurance plan')
  await drawer.getByPlaceholder('Plan or employer name').fill('Globex Corp')
  await drawer.getByPlaceholder('Group number').fill('CIG-7781')
  await drawer.getByRole('button', /Next step/).tap()
  await drawer.getByPlaceholder('555').fill('312')
  await drawer.getByPlaceholder('000-0000').fill('5550199')
  await drawer.getByRole('button', /Next step/).tap()
  await drawer.getByPlaceholder('Street name and number').fill('400 N Michigan Ave')
  await drawer.getByRole('button', 'Select your region').tap()
  await drawer.getByRole('button', 'Illinois').tap()
  await drawer.getByPlaceholder('Your city').fill('Chicago')
  await drawer.getByPlaceholder('Postal code (only numbers)').fill('60611')
  await drawer.getByRole('button', /Next step/).tap()
  await drawer.getByRole('button', 'Select benefit renewal month').tap()
  await drawer.getByRole('button', 'January').tap()
  await drawer.getByRole('button', 'Select source of payment').tap()
  await drawer.getByRole('button', 'Commercial Insurance (PPO)').tap()
  await drawer.getByRole('button', 'Select type').tap()
  await drawer.getByRole('button', 'Dental').tap()
  await drawer.getByRole('button', 'Increase Waiting period').tap()
  await drawer.getByRole('button', 'Increase Dependent max age').tap()
  await drawer.getByRole('button', 'Select missing tooth clause').tap()
  await drawer.getByRole('button', 'No').tap()
  await drawer.getByRole('button', /^Save/).tap()

  await expect(screen.getByRole('heading', 'Edit insurance plan')).toBeVisible()
  await expect(screen.getByText('No procedure ranges found')).toBeVisible()
  await screen.getByRole('button', 'Copy from').tap()
  const copiar = screen.getByRole('dialog', 'Copy from')
  await copiar.getByRole('radio', /Premium PPO 100\/90\/60/).tap()
  await copiar.getByRole('button', 'Confirm').tap()
  await screen.getByRole('button', 'Save').tap()
  await expect(screen.getByText('Coverage table was saved.')).toBeVisible()
})

test('cambiar de pestaña con cambios sin guardar pide confirmación', async ({ app, screen }) => {
  await app.open('/settings/finance/carriers/aetna/edit/insurance-plans/acme-ppo/edit?section=deductibles-and-benefits')
  await screen.getByLabel('Preventive Annual individual').fill('25')
  await screen.getByRole('tab', 'Payment table').tap()
  await expect(screen.getByText('Discard your changes?')).toBeVisible()
  await screen.getByRole('button', 'Discard changes').tap()
  await expect(screen.getByText('Add a new procedure to the payment table')).toBeVisible()
})

test('Bulk edit sube los New fee y Save crea una versión nueva', async ({ app, screen }) => {
  await app.open('/settings/finance/fee-schedule/aetna-2026/edit')
  await screen.getByRole('button', 'Bulk edit').tap()
  const drawer = screen.getByRole('dialog', 'Increase all')
  await drawer.getByLabel(/^Increase all fees by/).fill('10')
  await drawer.getByRole('button', '$').tap()
  await drawer.getByRole('button', '%').tap()
  await drawer.getByRole('button', 'Confirm').tap()
  await screen.getByRole('button', 'Save').tap()

  await expect(screen.getByText(/Aetna 2026 was saved\. The new fees apply from/)).toBeVisible()
  /* D1110 en Aetna 2026 es $92 (el 80% de $115): con +10%, $101.20 pasa a ser el Current fee de la versión nueva. */
  await expect(screen.getByText('$101.20')).toBeVisible()
})

test('irse de un fee schedule con cambios sin guardar pregunta antes, y buscar sin resultados lo dice', async ({ app, screen }) => {
  await app.open('/settings/finance/fee-schedule/ucr-red/edit')
  await screen.getByLabel('D0120 new fee').fill('70')
  await screen.getByRole('link', 'Aetna 2026').tap()
  const aviso = screen.getByRole('dialog', 'Are you sure you want to leave?')
  await aviso.getByRole('button', 'Cancel').tap()
  await expect(screen.getByText('UCR - Red').first()).toBeVisible()

  await screen.getByRole('link', 'Aetna 2026').tap()
  await screen.getByRole('button', 'Leave without saving').tap()
  await screen.getByLabel('Search procedure').fill('zzzz')
  await expect(screen.getByText('No procedures available')).toBeVisible()
})

test('una excepción nueva se arma en cuatro pasos y se suma a la plantilla', async ({ app, screen }) => {
  await app.open('/settings/finance/coverage-table/premium-ppo/edit')
  await screen.getByRole('button', 'Manage exceptions (3)').tap()
  const drawer = screen.getByRole('dialog', 'Manage exceptions')
  await drawer.getByRole('button', 'Add new exception').tap()
  await drawer.getByRole('button', /Next step/).tap()
  await drawer.getByRole('button', /Next step/).tap()
  await expect(drawer.getByText('This field is required.')).toBeVisible()
  await drawer.getByPlaceholder('Search for CDT code o description').fill('D2140')
  await drawer.getByRole('button', /^D2140 - Amalgam/).tap()
  await drawer.getByRole('button', /Next step/).tap()
  await drawer.getByRole('button', /Next step/).tap()
  await drawer.getByPlaceholder('Enter a reason for the exception').fill('Amalgam is not covered by this plan.')
  await drawer.getByRole('button', /^Save/).tap()

  await expect(drawer.getByText('Amalgam is not covered by this plan.')).toBeVisible()
  await drawer.getByRole('button', 'Cancel').tap()
  await expect(screen.getByRole('button', 'Manage exceptions (4)')).toBeVisible()
})

test('Assignments muestra el desglose y abre la lista de asignaciones', async ({ app, screen }) => {
  await app.open('/settings/finance/fee-schedule')
  await screen.getByRole('button', '7 assignments').tap()
  const desglose = screen.getByRole('dialog', 'Assignments')
  await expect(desglose.getByText('Providers')).toBeVisible()
  await desglose.getByRole('button', 'View assignments').tap()
  const drawer = screen.getByRole('dialog', 'Assignments')
  await expect(drawer.getByText('Patients (3)')).toBeVisible()
  await expect(drawer.getByText('Carriers (2)')).toBeVisible()
  await expect(drawer.getByText('Through BeneCare Family, BeneCare Senior')).toBeVisible()
})

test('Compare fees compara por procedimiento contra el Default', async ({ app, screen }) => {
  await app.open('/settings/finance/fee-schedule')
  await screen.getByRole('button', 'Actions for Aetna 2026').tap()
  await screen.getByRole('menuitem', 'Compare fees').tap()
  const drawer = screen.getByRole('dialog', 'Compare fees')
  await expect(drawer.getByRole('columnheader', 'UCR - Red')).toBeVisible()
  /* D1110: $92 en Aetna 2026 contra $115 en UCR - Red. */
  await expect(drawer.getByText(/−\$23\.00/)).toBeVisible()
})

test('Bulk edit con filas tildadas cambia sólo esas', async ({ app, screen }) => {
  await app.open('/settings/finance/fee-schedule/aetna-2026/edit')
  await expect(screen.getByText('26 / 26')).toBeVisible()
  await screen.getByRole('checkbox', 'Select D0120').tap()
  await screen.getByRole('button', 'Bulk edit').tap()
  const drawer = screen.getByRole('dialog', 'Increase selected')
  await drawer.getByLabel(/^Increase selected fees by/).fill('10')
  await drawer.getByRole('button', 'Confirm').tap()
  await screen.getByRole('button', 'Save').tap()
  /* +$10: D0120 pasa de $52 a $62 (el Current fee de la versión nueva); D0140 sigue en $68. */
  await expect(screen.getByRole('row', /^Select D0120 .* \$62\.00 \$62\.00$/)).toBeVisible()
  await expect(screen.getByRole('row', /^Select D0140 .* \$68\.00 \$68\.00$/)).toBeVisible()
})

test('Add range avisa y el breadcrumb sigue la regla de Settings', async ({ app, screen }) => {
  await app.open('/settings/finance/carriers/aetna/edit/insurance-plans/acme-ppo/edit')
  const migas = screen.getByRole('navigation', 'Breadcrumb')
  await expect(migas.getByRole('link', 'Billing')).toBeVisible()
  await expect(migas.getByRole('link', 'Aetna Dental Plans')).toBeVisible()
  await expect(migas.getByRole('link', 'Acme Corp')).toHaveCount(0)

  await app.open('/settings/finance/coverage-table/medicaid-adults/edit')
  await screen.getByRole('button', 'Add range').tap()
  await expect(screen.getByText('A new range was added at the end. Complete it and Save.')).toBeVisible()
  await expect(screen.getByPlaceholder('R. min').last()).toBeVisible()
})

test('el select de una celda se abre por encima de la tabla', async ({ app, screen }) => {
  await app.open('/settings/finance/carriers/aetna/edit/insurance-plans/acme-ppo/edit?section=fee-schedule-by-location')
  await screen.getByRole('button', /Riverside Care/).tap()
  await screen.getByRole('button', 'UCR - Red').tap()
  await screen.getByRole('button', 'Save').tap()
  await expect(screen.getByText('Fee schedule by location was saved.')).toBeVisible()
})

/* Estandarización con Consents (2026-11-24): pestañas por tipo, estado en la lista y en el editor, y el ⋮ con Deactivate y
   Delete (con confirmación). */
test('Coverage tables: pestañas por tipo y el menú desactiva y borra', async ({ app, screen }) => {
  await app.open('/settings/finance/coverage-table/standard-ppo/edit')
  await screen.getByRole('tab', 'Copayment').tap()
  await expect(screen.getByRole('link', /^DHMO Copay/)).toBeVisible()
  await expect(screen.getByRole('link', /^Premium PPO/)).toHaveCount(0)
  await screen.getByRole('tab', 'Percentage').tap()

  await screen.getByRole('button', 'Actions for Premium PPO 100/90/60').tap()
  await screen.getByRole('menuitem', 'Deactivate').tap()
  await expect(screen.getByText('Premium PPO 100/90/60 was deactivated.')).toBeVisible()
  await expect(screen.getByRole('link', /^Premium PPO 100\/90\/60 Inactive/)).toBeVisible()

  await screen.getByRole('button', 'Actions for Standard PPO 100/80/50').tap()
  await screen.getByRole('menuitem', 'Delete').tap()
  const dialogo = screen.getByRole('dialog', 'Delete coverage table?')
  await expect(dialogo.getByText(/Standard PPO 100\/80\/50/)).toBeVisible()
  await dialogo.getByRole('button', 'Delete').tap()
  await expect(screen.getByText('Standard PPO 100/80/50 was deleted.')).toBeVisible()
  await expect(screen.getByRole('link', /^Standard PPO/)).toHaveCount(0)
})
