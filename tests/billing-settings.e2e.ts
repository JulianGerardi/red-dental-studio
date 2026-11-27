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

  await expect(screen.getByRole('heading', 'Globex Corp', { level: 1 })).toBeVisible()
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

/* Versiones según la guía y el prototipo de Fee Schedules (2026-11-27): la activa no se edita; Create new version pasa a
   editar, y Publish… muestra el resumen y crea la versión (CON-1151). */
test('Create new version, Bulk edit sube los fees y Publish… crea la versión', async ({ app, screen }) => {
  await app.open('/settings/finance/fee-schedule/aetna-2026/edit')
  await expect(screen.getByLabel('D0120 new fee')).toHaveCount(0)
  await screen.getByRole('button', 'Create new version').tap()
  await expect(screen.getByText('You’re creating a new version.')).toBeVisible()
  await screen.getByRole('button', 'Bulk edit').tap()
  const drawer = screen.getByRole('dialog', 'Increase all')
  await drawer.getByLabel(/^Increase all fees by/).fill('10')
  await drawer.getByRole('button', '$').tap()
  await drawer.getByRole('button', '%').tap()
  await drawer.getByRole('button', 'Confirm').tap()
  await screen.getByRole('button', 'Publish…').tap()
  const resumen = screen.getByRole('dialog', 'Publish fee schedule?')
  await expect(resumen.getByText('Once published, previous versions stay locked and can’t be modified.')).toBeVisible()
  await resumen.getByRole('button', 'Publish').tap()

  await expect(screen.getByText(/A new version has been created, effective from/)).toBeVisible()
  /* D1110 en Aetna 2026 es $92 (el 80% de $115): con +10%, la versión nueva lo tiene en $101.20. */
  await expect(screen.getByText('$101.20')).toBeVisible()
})

test('irse con una versión a medio armar pregunta antes, y buscar sin resultados lo dice', async ({ app, screen }) => {
  await app.open('/settings/finance/fee-schedule/ucr-red/edit')
  await screen.getByRole('button', 'Create new version').tap()
  await screen.getByLabel('D0120 new fee').fill('70')
  await screen.getByRole('link', /^Aetna 2026/).tap()
  const aviso = screen.getByRole('dialog', 'Are you sure you want to leave?')
  await aviso.getByRole('button', 'Cancel').tap()
  await expect(screen.getByText('UCR - Red').first()).toBeVisible()

  await screen.getByRole('link', /^Aetna 2026/).tap()
  await screen.getByRole('button', 'Leave without saving').tap()
  await screen.getByLabel('Search procedure').fill('zzzz')
  await expect(screen.getByText('No results found for the selected filter.')).toBeVisible()
})

/* Con una Scheduled no se crea otra versión: se edita esa, en el lugar (CON-1375). Una expirada es sólo lectura (CON-1369). */
test('la versión Scheduled se edita en el lugar y la Expired es sólo lectura', async ({ app, screen }) => {
  await app.open('/settings/finance/fee-schedule/delta-ppo/edit')
  await expect(screen.getByText('A newer version is scheduled for 01/01/2027. Edit that one instead.')).toBeVisible()
  await expect(screen.getByRole('button', 'Create new version')).toBeDisabled()
  await screen.getByRole('button', 'Version 01/01/2026 Active').tap()
  await screen.getByRole('menuitem', /01\/01\/2027/).tap()
  await screen.getByLabel('D0120 new fee').fill('60')
  await screen.getByRole('button', 'Save changes').tap()
  await expect(screen.getByText('Changes saved.')).toBeVisible()

  await screen.getByRole('button', 'Version 01/01/2027 Scheduled').tap()
  await screen.getByRole('menuitem', /07\/01\/2025/).tap()
  await expect(screen.getByText('Expired on 01/01/2026. View only.')).toBeVisible()
  await expect(screen.getByLabel('D0120 new fee')).toHaveCount(0)
})

/* Save draft no pide fecha; con un borrador guardado no se crea otra versión, y Publish… sí pide la fecha. */
test('Save draft guarda el borrador y bloquea Create new version', async ({ app, screen }) => {
  await app.open('/settings/finance/fee-schedule/medicaid/edit')
  await screen.getByRole('button', 'Create new version').tap()
  await screen.getByLabel('D0120 new fee').fill('40')
  await screen.getByRole('button', 'Save draft').tap()
  await expect(screen.getByText('New version saved as a draft.')).toBeVisible()
  await expect(screen.getByText('This is a draft.')).toBeVisible()

  await screen.getByRole('button', 'Version No date yet Draft').tap()
  await screen.getByRole('menuitem', /07\/01\/2025/).tap()
  await expect(screen.getByText('A draft version already exists. Open it from Version history.')).toBeVisible()
  await expect(screen.getByRole('button', 'Create new version')).toBeDisabled()
})

test('New fee schedule: Save as draft lo deja Inactive y sin asignaciones hasta publicar', async ({ app, screen }) => {
  await app.open('/settings/finance/fee-schedule/new')
  await screen.getByRole('button', 'Create and publish…').tap()
  await expect(screen.getByText('Please review the highlighted fields.')).toBeVisible()
  await expect(screen.getByText('This field is required.')).toHaveCount(3)

  await screen.getByPlaceholder('Enter a fee schedule name').fill('Prueba 2')
  await screen.getByRole('button', 'Select a type').tap()
  await screen.getByRole('button', 'PPO').tap()
  await screen.getByRole('button', 'Save as draft').tap()
  await expect(screen.getByText('Draft saved. Publish it when you’re ready.')).toBeVisible()
  await expect(screen.getByRole('link', /^Prueba 2 Inactive/)).toBeVisible()
  await screen.getByRole('tab', /^Assignments/).tap()
  await expect(screen.getByText('Assignments become available once this fee schedule is published.')).toBeVisible()
})

/* CON-496 / CON-1276: con asociaciones no se archiva; se quitan en la pestaña Assignments. CON-1108: Restore confirma y
   lo deja Active. Los archivados sólo se ven con el filtro (CON-497). */
test('con asociaciones no se archiva; Assignments las quita, y Restore deja Active', async ({ app, screen }) => {
  await app.open('/settings/finance/fee-schedule/ppo-premium/edit')
  await screen.getByRole('button', 'Actions for PPO Premium Plan').tap()
  await screen.getByRole('menuitem', 'Archive').tap()
  await expect(screen.getByText(/cannot be deactivated when there are active associations/)).toBeVisible()

  await screen.getByRole('tab', 'Assignments (8)').tap()
  await screen.getByRole('tab', 'Insurance plans (3)').tap()
  await expect(screen.getByText('Plan: BeneCare Family')).toBeVisible()
  await screen.getByRole('button', 'Remove BeneCare Dental Plan (Plan: BeneCare Family)').tap()
  await screen.getByRole('dialog', 'Remove assignment?').getByRole('button', 'Remove').tap()
  await expect(screen.getByText('Assignment removed.')).toBeVisible()
  await expect(screen.getByRole('tab', 'Assignments (7)')).toBeVisible()

  await expect(screen.getByRole('link', /^Standard 2025/)).toHaveCount(0)
  await screen.getByRole('button', /^Filter/).tap()
  await screen.getByRole('menuitemradio', /^Archived/).tap()
  await screen.getByRole('menuitemradio', /^Archived/).press('Escape')
  await screen.getByRole('button', 'Actions for Standard 2025').tap()
  await screen.getByRole('menuitem', 'Restore').tap()
  await screen.getByRole('dialog', 'Restore fee schedule?').getByRole('button', 'Restore').tap()
  await expect(screen.getByText('Fee Schedule restored.')).toBeVisible()
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

/* Sin la tabla (2026-11-26): al entrar se ve lo creado. Compare fees sale del ⋮ de cada ítem. */
test('al entrar se ve lo creado, sin ninguno elegido', async ({ app, screen }) => {
  await app.open('/settings/finance/fee-schedule')
  await expect(screen.getByText('No fee schedule selected')).toBeVisible()
  await expect(screen.getByRole('link', /^UCR - Red Active Default/)).toBeVisible()
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

test('Add range avisa y el breadcrumb sigue la regla de Settings', async ({ app, screen }) => {
  await app.open('/settings/finance/carriers/aetna/edit/insurance-plans/acme-ppo/edit')
  const migas = screen.getByRole('navigation', 'Breadcrumb')
  /* Billing es una pantalla con pestañas (2026-11-26): el link vuelve a la pestaña de donde se vino. */
  await expect(migas.getByRole('link', 'Billing')).toHaveAttribute('href', /carriers$/)
  await expect(migas.getByRole('link', 'Aetna Dental Plans')).toBeVisible()
  await expect(migas.getByRole('link', 'Acme Corp')).toHaveCount(0)

  /* Lista y editor en una pantalla: el rastro termina en Billing, como el título, aunque haya una tabla elegida. */
  await app.open('/settings/finance/coverage-table/medicaid-adults/edit')
  await expect(migas.getByText('Billing')).toBeVisible()
  await expect(migas.getByText('Medicaid Adults')).toHaveCount(0)
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

/* Acceso rápido (2026-11-26): desde Overview se entra directo a cada sección de Billing con el ⋮ de su card, y en Billing
   se pasa de una a otra con las pestañas, sin abrir el menú. */
test('Billing: atajos desde Overview y pestañas entre secciones', async ({ app, screen }) => {
  await app.open('/settings/general')
  await expect(screen.getByRole('heading', 'Overview')).toBeVisible()
  await screen.getByRole('button', 'Actions for Billing sections').tap()
  await screen.getByRole('menuitem', 'Carriers').tap()
  await expect(screen.getByRole('link', 'Aetna Dental Plans')).toBeVisible()

  const secciones = screen.getByRole('navigation', 'Billing sections')
  await secciones.getByRole('link', 'Coverage tables').tap()
  await expect(screen.getByRole('tab', 'Copayment')).toBeVisible()
  await secciones.getByRole('link', 'Fee schedules').tap()
  await expect(screen.getByText('No fee schedule selected')).toBeVisible()
})
