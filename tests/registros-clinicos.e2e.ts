import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* El flujo completo de Lab order, Prescription y Referral en Clinical Mode: la misma tabla, la misma ficha (New, Edit y
   sólo lectura) y la máquina de estados de cada uno, con las preguntas de red.dev y los avisos de Jira (CON-2214,
   CON-2212, CON-2321). Ver design-reference/figma/modulos/clinical-mode.md (2026-11-27). */

/* 2026-11-28: sólo Filter en la barra, Edit apagado fuera de Pending, tacho en la fila y Cancel / Confirm en azul. */
/* Sin Start encounter: en Clinical Mode estos registros no piden un encuentro abierto. */
const abrir = async (app: { open: (u: string) => Promise<unknown> }, _screen: unknown, tab: string) => {
  await app.open(`/patients/john-smith/clinical-mode?tab=${encodeURIComponent(tab)}`)
}

test('Sin encuentro abierto se crea y se edita; lo que ya no está en Pending se abre en sólo lectura', async ({ app, screen }) => {
  await app.open('/patients/john-smith/clinical-mode?tab=Prescription')
  /* En Clinical Mode nada pide un encuentro abierto: New y la ficha de una Pending se cargan igual. */
  await screen.getByRole('button', /New prescription/).tap()
  await expect(screen.getByText('Read-only mode')).toHaveCount(0)
  await expect(screen.getByRole('button', 'Save')).toBeEnabled()
  await screen.getByRole('button', 'Cancel').tap()
  /* "+N" despliega el resto de las medicaciones en la fila, sin abrir la ficha. */
  await expect(screen.getByText('Ibuprofen 400 mg')).toHaveCount(0)
  await screen.getByRole('button', /^Show 1 more medications/).first().tap()
  await expect(screen.getByText('Ibuprofen 400 mg').first()).toBeVisible()
  await expect(screen.getByRole('button', /New prescription/)).toBeVisible()
  await screen.getByText('Chlorhexidine gluconate 0.12%').first().tap()
  await expect(screen.getByText('Read-only mode')).toHaveCount(0)
  await expect(screen.getByRole('button', 'Save')).toBeEnabled()
  await screen.getByRole('button', 'Back to prescriptions').tap()
  /* Una receta Active no se edita, con o sin encuentro: en el ⋮, Edit está apagado (como red.dev) y la fila la abre en
     sólo lectura. */
  await screen.getByRole('button', /^Actions for prescription of Ibuprofen 600 mg, Active/).tap()
  await expect(screen.getByRole('menuitem', 'Edit')).toHaveAttribute('aria-disabled', 'true')
  await screen.getByRole('menu').press('Escape')
  await screen.getByText('Ibuprofen 600 mg').first().tap()
  await expect(screen.getByText('This prescription cannot be edited because it is not in an editable state.')).toBeVisible()
  await expect(screen.getByRole('button', 'Save')).toBeDisabled()
})

/* Como red.dev, la barra de la tabla trae sólo Filter (a la izquierda) y New: sin buscador ni filtro de fecha. */
test('La tabla sólo trae Filter: sin buscador ni filtro de fecha', async ({ app, screen }) => {
  for (const [tab, plural] of [['Lab order', 'lab orders'], ['Prescription', 'prescriptions'], ['Referral', 'referrals']] as const) {
    await abrir(app, screen, tab)
    await expect(screen.getByRole('button', `Filter ${plural}`)).toBeVisible()
    await expect(screen.getByRole('searchbox')).toHaveCount(0)
    await expect(screen.getByRole('button', 'Today')).toHaveCount(0)
  }
  await screen.getByRole('button', 'Filter referrals').tap()
  await screen.getByRole('menuitemcheckbox', /^Requested/).tap()
  await screen.getByRole('menuitemcheckbox', /^Requested/).press('Escape')
  await expect(screen.getByText(/Showing 1 to 2 of 2 results/)).toBeVisible()
})

test('Prescription: New valida, crea en Pending, se edita, se activa y se cancela (CON-2230, CON-2354, CON-2355)', async ({ app, screen }) => {
  await abrir(app, screen, 'Prescription')
  await expect(screen.getByText(/Showing 1 to 7 of 7 results/)).toBeVisible()
  await screen.getByRole('button', /New prescription/).tap()
  await screen.getByRole('button', 'Save').tap()
  await expect(screen.getByText('Uncompleted fields')).toBeVisible()

  await screen.getByRole('button', /^Expiration date/).tap()
  await screen.getByRole('button', 'Next month').tap()
  await screen.getByRole('button', / 15, \d{4}$/).tap()
  await screen.getByPlaceholder('Search by drug name or brand name').fill('ibu')
  await screen.getByRole('button', 'Ibuprofen').tap()
  await screen.getByRole('textbox', /^Strength/).fill('400')
  await screen.getByRole('button', 'Select strength unit').tap()
  await screen.getByRole('button', 'mg').tap()
  await screen.getByRole('button', 'Select dosage form').tap()
  await screen.getByRole('button', 'Oral tablet').tap()
  await screen.getByRole('textbox', /^Quantity to dispense/).fill('20')
  await screen.getByRole('textbox', /^Dose/).fill('1')
  await screen.getByRole('button', 'Select dose unit').tap()
  await screen.getByRole('button', 'Tablets').tap()
  await screen.getByRole('button', 'Select route').tap()
  await screen.getByRole('button', 'Oral').tap()
  await screen.getByRole('button', 'Select frequency').tap()
  await screen.getByRole('button', 'Three times daily').tap()
  await screen.getByRole('textbox', /^Duration/).fill('5')
  await expect(screen.getByText('Take 1 tablet orally three times daily for 5 days').first()).toBeVisible()

  /* Una segunda medicación vacía frena el guardado y la pestaña la marca; se saca y guarda. */
  await screen.getByRole('button', /New medication/).tap()
  await screen.getByRole('button', 'Save').tap()
  await expect(screen.getByText('Uncompleted fields')).toBeVisible()
  await screen.getByRole('button', /Remove medication/).tap()
  /* CON-2846: el paciente ya tiene Ibuprofen activo; con Update patient medications, Save pregunta si se reutiliza. */
  await screen.getByRole('switch', 'Update patient medications').tap()
  await screen.getByRole('button', 'Save').tap()
  await screen.getByRole('dialog', 'Medication already active').getByRole('button', 'Confirm').tap()
  await expect(screen.getByText('The prescription has been successfully created.')).toBeVisible()
  await expect(screen.getByText(/Showing 1 to 8 of 8 results/)).toBeVisible()

  /* Edit desde el ⋮: lo guardado está en la ficha; se cambia y vuelve a la tabla. */
  await screen.getByRole('button', /^Actions for prescription of Ibuprofen 400 mg, Pending/).tap()
  await screen.getByRole('menuitem', 'Edit').tap()
  await expect(screen.getByRole('textbox', /^Strength/)).toHaveValue('400')
  await screen.getByRole('textbox', /^Strength/).fill('600')
  await screen.getByRole('button', 'Save').tap()
  await screen.getByRole('dialog', 'Medication already active').getByRole('button', 'Confirm').tap()
  await expect(screen.getByText('The prescription has been successfully updated.')).toBeVisible()

  /* Activate pregunta; ya Active no se edita, tiene PDF y sólo se cancela. */
  await screen.getByRole('button', /^Actions for prescription of Ibuprofen 600 mg, Pending/).tap()
  await screen.getByRole('menuitem', 'Activate').tap()
  await screen.getByRole('dialog', 'Activate prescription').getByRole('button', 'Confirm').tap()
  await expect(screen.getByText('The prescription has been successfully marked as Active.')).toBeVisible()
  /* El documento existe desde que está Active: el botón de la fila se prende. */
  await expect(screen.getByRole('button', /^View PDF of the prescription of Ibuprofen 600 mg, Active, created (?!10\/30)/)).toBeEnabled()
  await screen.getByRole('button', /^Actions for prescription of Ibuprofen 600 mg, Active, created (?!10\/30)/).tap()
  await expect(screen.getByRole('menuitem', 'Edit')).toHaveAttribute('aria-disabled', 'true')
  await expect(screen.getByRole('menuitem', 'Expire')).toBeVisible()
  await screen.getByRole('menuitem', 'Cancel').tap()
  /* Toda pregunta se contesta con Cancel / Confirm, en azul (red.dev). */
  await screen.getByRole('dialog', 'Cancel prescription').getByRole('button', 'Confirm').tap()
  await expect(screen.getByText('The prescription has been successfully marked as Canceled.')).toBeVisible()
})

test('Prescription: Filter por estado y provider, Expire en una Active y Delete sólo en Pending (CON-2286, CON-2356)', async ({ app, screen }) => {
  await abrir(app, screen, 'Prescription')
  /* Los filtros: Status y Provider. */
  await screen.getByRole('button', 'Filter prescriptions').tap()
  await screen.getByRole('menuitemcheckbox', /^Active/).tap()
  await screen.getByRole('menuitemcheckbox', /Dr\. Daniel Anderson/).tap()
  await screen.getByRole('menuitemcheckbox', /^Active/).press('Escape')
  await expect(screen.getByText(/Showing 1 to 1 of 1 results/)).toBeVisible()
  await screen.getByRole('button', /^Actions for prescription of Ibuprofen 600 mg, Active/).tap()
  await screen.getByRole('menuitem', 'Expire').tap()
  await screen.getByRole('dialog', 'Expire prescription').getByRole('button', 'Confirm').tap()
  await expect(screen.getByText('The prescription has been successfully marked as Expired.')).toBeVisible()
  await screen.getByRole('button', /^Filter prescriptions(?! by)/).tap()
  await screen.getByRole('button', 'Clear all').tap()
  await screen.getByRole('menuitemcheckbox', /^Active/).press('Escape')
  /* Delete es el tacho de la fila (como red.dev), no una opción del ⋮: Pending trae Edit, Activate y Cancel. */
  await screen.getByRole('button', /^Actions for prescription of Clonazepam 1 mg, Pending/).tap()
  await expect(screen.getByRole('menuitem', 'Delete')).toHaveCount(0)
  await screen.getByRole('menuitem', 'Activate').press('Escape')
  await screen.getByRole('button', /^Delete the prescription of Clonazepam 1 mg, Pending/).tap()
  await screen.getByRole('dialog', 'Delete prescription').getByRole('button', 'Confirm').tap()
  await expect(screen.getByText('The prescription has been successfully deleted.')).toBeVisible()
  await expect(screen.getByText(/Showing 1 to 6 of 6 results/)).toBeVisible()
  /* Fuera de Pending el tacho está apagado y el ⋮ sólo trae Edit, apagado. */
  await expect(screen.getByRole('button', /^Delete the prescription of .*Expired/).first()).toBeDisabled()
  await screen.getByRole('button', /^Actions for prescription of .*Expired/).first().tap()
  await expect(screen.getByRole('menuitem')).toHaveCount(1)
  await expect(screen.getByRole('menuitem', 'Edit')).toHaveAttribute('aria-disabled', 'true')
})

test('Lab order: New crea en Pending; Request, Delay y Deliver siguen la máquina de estados (CON-2215, CON-2221, CON-2226)', async ({ app, screen }) => {
  await abrir(app, screen, 'Lab order')
  await screen.getByRole('button', /New lab order/).tap()
  await screen.getByRole('button', 'Save').tap()
  await expect(screen.getByText('Uncompleted fields')).toBeVisible()

  await screen.getByPlaceholder('Search laboratory').fill('Smile')
  await screen.getByRole('button', 'Smile Lab Studio').tap()
  await screen.getByRole('button', /^Delivery expiration date/).tap()
  await screen.getByRole('button', 'Next month').tap()
  await screen.getByRole('button', / 15, \d{4}$/).tap()
  /* CON-2215: vincular un procedimiento con diente lo trae marcado en Teeth & surface. */
  await screen.getByLabel('Search procedures').fill('D2750')
  await screen.getByRole('button', /D2750/).tap()
  await expect(screen.getByRole('button', 'Edit surfaces of tooth 19')).toBeVisible()
  await screen.getByLabel(/Dental work requested/).fill('Zirconia crown, shade A2.')
  await screen.getByRole('button', 'Save').tap()
  await expect(screen.getByText('The lab order has been successfully created.')).toBeVisible()
  await expect(screen.getByText(/Showing 1 to 10 of 10 results/)).toBeVisible()

  const fila = (estado: string) => screen.getByRole('button', new RegExp(`^Actions for lab order for Smile Lab Studio, ${estado}`)).first()
  await fila('Pending').tap()
  await screen.getByRole('menuitem', 'Request').tap()
  await screen.getByRole('dialog', 'Request lab order').getByRole('button', 'Confirm').tap()
  await expect(screen.getByText('The lab order has been successfully marked as Requested.')).toBeVisible()

  await fila('Requested').tap()
  await expect(screen.getByRole('menuitem', 'Edit')).toHaveAttribute('aria-disabled', 'true')
  await screen.getByRole('menuitem', 'Delay').tap()
  await screen.getByRole('dialog', 'Delay lab order').getByRole('button', 'Confirm').tap()
  await expect(screen.getByText('The lab order has been successfully marked as Delayed.')).toBeVisible()

  /* La ficha de una orden que ya no se edita: sólo lectura, con lo cargado y su ⋮. */
  await screen.getByText(/^Delayed$/).first().tap()
  await expect(screen.getByText('This lab order cannot be edited because it is not in an editable state.')).toBeVisible()
  await expect(screen.getByLabel(/Dental work requested/)).toHaveValue('Zirconia crown, shade A2.')
  await screen.getByRole('button', /^Actions for Lab order/).tap()
  await screen.getByRole('menuitem', 'Deliver').tap()
  await screen.getByRole('dialog', 'Deliver lab order').getByRole('button', 'Confirm').tap()
  await expect(screen.getByText('The lab order has been successfully marked as Delivered.')).toBeVisible()
  await expect(screen.getByRole('button', /^Actions for Lab order/)).toHaveCount(0)
  await screen.getByRole('button', 'Back to lab orders').tap()
  await expect(screen.getByText(/Showing 1 to 10 of 10 results/)).toBeVisible()
})

test('Referral: New crea en Pending, se pide y se rechaza (CON-2322, CON-2394, CON-2392)', async ({ app, screen }) => {
  await abrir(app, screen, 'Referral')
  await expect(screen.getByText(/Showing 1 to 7 of 7 results/)).toBeVisible()
  await screen.getByRole('button', /New referral/).tap()
  await screen.getByRole('button', 'Save').tap()
  await expect(screen.getByText('Uncompleted fields')).toBeVisible()

  await screen.getByPlaceholder('Search by name or surname').fill('Priya')
  await screen.getByRole('button', /^Dr\. Priya Shah/).tap()
  await screen.getByLabel('Search procedures').fill('D7210')
  await screen.getByRole('button', /D7210/).tap()
  await screen.getByRole('textbox', /^Referral note/).fill('Please evaluate for periodontal surgery.')
  await screen.getByRole('button', 'Save').tap()
  await expect(screen.getByText('The referral has been successfully created.')).toBeVisible()
  await expect(screen.getByText(/Showing 1 to 8 of 8 results/)).toBeVisible()

  /* La fila abre la ficha; desde su ⋮ se pide y después se rechaza. */
  await screen.getByText('Dr. Priya Shah').first().tap()
  await expect(screen.getByRole('textbox', /^Referral note/)).toHaveValue('Please evaluate for periodontal surgery.')
  await screen.getByRole('button', /^Actions for Referral/).tap()
  await screen.getByRole('menuitem', 'Request').tap()
  await screen.getByRole('dialog', 'Request referral').getByRole('button', 'Confirm').tap()
  await expect(screen.getByText('The referral has been successfully marked as Requested.')).toBeVisible()
  await expect(screen.getByText('This referral cannot be edited because it is not in an editable state.')).toBeVisible()
  await expect(screen.getByRole('button', 'PDF')).toBeVisible()
  await screen.getByRole('button', /^Actions for Referral/).tap()
  await screen.getByRole('menuitem', 'Reject').tap()
  await screen.getByRole('dialog', 'Reject referral').getByRole('button', 'Confirm').tap()
  await expect(screen.getByText('The referral has been successfully rejected.')).toBeVisible()
  await expect(screen.getByRole('button', 'PDF')).toHaveCount(0)
})

test('Pending Task → Prescription: Complete this task abre la receta y Activate la saca de las pendientes (CON-2643)', async ({ app, screen }) => {
  await app.open('/')
  await screen.getByRole('tab', /^Prescriptions/).tap()
  /* Henry Richardson está en el sillón: su encuentro está abierto. */
  await screen.getByRole('button', 'Actions for Prescription for Henry Richardson').tap()
  await screen.getByRole('menuitem', 'Edit').tap()
  await expect(screen.getByRole('heading', 'Prescription')).toBeVisible()
  await expect(screen.getByText('Directions for use')).toBeVisible()
  await screen.getByRole('button', /^Actions for Prescription/).tap()
  await screen.getByRole('menuitem', 'Activate').tap()
  await screen.getByRole('dialog', 'Activate prescription').getByRole('button', 'Confirm').tap()
  await expect(screen.getByText('The prescription has been successfully marked as Active.')).toBeVisible()
  await expect(screen.getByRole('button', 'PDF')).toBeVisible()
})

/* Regresión: New después de entrar por una tarea crea un registro nuevo, en Pending, y no pisa el de la tarea. */
test('New después de Complete this task suma un registro y deja el de la tarea como estaba', async ({ app, screen }) => {
  await app.open('/patients/john-smith/clinical-mode?tab=Referral&task=paciente-referrals-1')
  await expect(screen.getByRole('heading', 'Referral')).toBeVisible()
  await screen.getByRole('button', 'Back to referrals').tap()
  await expect(screen.getByText(/Showing 1 to 8 of 8 results/)).toBeVisible()
  await screen.getByRole('button', /New referral/).tap()
  await expect(screen.getByRole('heading', 'New referral')).toBeVisible()
  await screen.getByPlaceholder('Search by name or surname').fill('Omar')
  await screen.getByRole('button', /^Dr\. Omar Haddad/).tap()
  await screen.getByRole('textbox', /^Referral note/).fill('Please evaluate for surgical extraction.')
  await screen.getByRole('button', 'Save').tap()
  await expect(screen.getByText('The referral has been successfully created.')).toBeVisible()
  await expect(screen.getByText(/Showing 1 to 9 of 9 results/)).toBeVisible()
})
