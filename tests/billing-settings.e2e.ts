import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Settings → Billing: fee schedules, carriers con sus planes y coverage tables, conectados por el store de Billing. Ver
   design-reference/figma/modulos/settings-billing.md. */

test('un fee schedule nuevo copia el UCR con el ajuste y se edita en la celda', async ({ app, screen }) => {
  await app.open('/settings/finance/fee-schedule')
  await screen.getByRole('button', 'New fee schedule').tap()
  const drawer = screen.getByRole('dialog', 'New Fee Schedule')
  await drawer.getByLabel(/^Name/).fill('Cigna DPPO 2026')
  await drawer.getByRole('button', 'Select').tap()
  await drawer.getByRole('button', 'PPO').tap()
  await drawer.getByPlaceholder('DD / MM / YY').fill('010426')
  await drawer.getByRole('button', /Next Step/).tap()
  await drawer.getByRole('button', 'Select').tap()
  await drawer.getByRole('button', 'UCR - Red').tap()
  await drawer.getByLabel(/^Adjustment/).fill('-10')
  await drawer.getByRole('button', /^Save/).tap()

  await screen.getByRole('link', 'Cigna DPPO 2026').tap()
  await expect(screen.getByRole('heading', 'Cigna DPPO 2026')).toBeVisible()
  /* D1110 en el UCR es $115: con -10% y redondeo al dólar, $104. */
  await expect(screen.getByRole('button', 'Edit D1110 fee')).toHaveText(/\$104\.00/)
  await screen.getByRole('button', 'Edit D1110 fee').tap()
  await screen.getByLabel('D1110 fee').fill('99')
  await screen.getByLabel('D1110 fee').press('Enter')
  await expect(screen.getByRole('button', 'Edit D1110 fee')).toHaveText(/\$99\.00/)
})

test('un plan nuevo de un carrier aparece en su coverage table', async ({ app, screen }) => {
  await app.open('/settings/finance/carriers/cigna')
  await screen.getByRole('button', 'New plan').tap()
  const drawer = screen.getByRole('dialog', 'New Plan')
  await drawer.getByLabel(/^Plan Name/).fill('Cigna Total Care')
  await drawer.getByLabel(/^Group Number/).fill('CIG-88001')
  await drawer.getByRole('button', 'Select').tap()
  await drawer.getByRole('button', 'PPO').tap()
  await drawer.getByRole('button', /Next Step/).tap()
  await drawer.getByRole('button', 'Select a fee schedule').tap()
  await drawer.getByRole('button', 'In-house Membership').tap()
  await drawer.getByRole('button', 'Select a coverage table').tap()
  await drawer.getByRole('button', 'Basic 100/70/0').tap()
  await drawer.getByRole('button', /^Save/).tap()

  await expect(screen.getByRole('button', 'Cigna Total Care')).toBeVisible()
  await screen.getByRole('link', 'Basic 100/70/0').first().tap()
  await screen.getByRole('tab', /Plans/).tap()
  await expect(screen.getByText('Cigna Total Care')).toBeVisible()
})

test('tocar una categoría de una coverage table cambia lo que paga', async ({ app, screen }) => {
  await app.open('/settings/finance/coverage-table/ppo-standard')
  await screen.getByText('Implant services', { exact: true }).tap()
  const drawer = screen.getByRole('dialog', 'Implant services')
  await drawer.getByLabel(/^Plan Pays/).fill('60')
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText('Implant services now pays 60%.')).toBeVisible()
  await expect(screen.getByRole('meter', 'Covered at 60%')).toBeVisible()
})

test('un fee schedule en uso no se borra', async ({ app, screen }) => {
  await app.open('/settings/finance/fee-schedule')
  await screen.getByRole('button', 'Actions for PPO Premium Plan').tap()
  await screen.getByRole('menuitem', /Delete/).tap()
  await expect(screen.getByText(/PPO Premium Plan is used by 7 plans/)).toBeVisible()
  await expect(screen.getByRole('link', 'PPO Premium Plan')).toBeVisible()
})
