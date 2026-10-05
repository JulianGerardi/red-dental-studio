import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Treatment Plan desde el menú Exams: los planes por fecha y qué se puede hacer según el estado del caso. */

test('el menú Exams abre los registros', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', /^Exams/).tap()
  for (const r of ['Treatment Plan', 'Treatment', 'Patient Summary', 'Lab Order', 'Prescription', 'Referral']) {
    await expect(screen.getByRole('menuitem', r)).toBeVisible()
  }
  await screen.getByRole('menuitem', 'Treatment Plan').tap()
  await expect(screen.getByRole('button', 'Unassigned Items')).toBeVisible()
  // Con un registro abierto, las pestañas son los registros y "Exams" vuelve a los exámenes.
  await expect(screen.getByRole('button', 'Lab Order')).toBeVisible()
  await screen.getByRole('button', 'Exams').tap()
  await expect(screen.getByRole('button', 'DentAssmt')).toBeVisible()
})

test('en Planning se edita y desde Presented no', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', /^Exams/).tap()
  await screen.getByRole('menuitem', 'Treatment Plan').tap()
  const planes = screen.getByRole('navigation', 'Treatment plans')

  await planes.getByRole('button', /Periodontists Recommended, Planning/).tap()
  await expect(planes.getByRole('button', /Periodontist Alternative, Planning/)).toBeVisible()
  await expect(screen.getByRole('button', /New Alternative Case/)).toBeVisible()
  await expect(screen.getByRole('button', /Move to/)).toBeVisible()
  await expect(screen.getByRole('button', 'Rename case')).toBeVisible()
  await expect(screen.getByText('Drag procedure here to create new visit')).toBeVisible()

  await planes.getByRole('button', /^24\/08\/2026, Presented/).tap()
  await planes.getByRole('button', /Crown Option, Presented/).tap()
  await expect(screen.getByText('Crown Option').first()).toBeVisible()
  await expect(screen.getByRole('button', /Move to/)).toHaveCount(0)
  await expect(screen.getByRole('button', 'Preview case')).toHaveCount(0)
  await expect(screen.getByRole('button', 'Rename case')).toHaveCount(0)
  await expect(screen.getByText('Drag procedure here to create new visit')).toHaveCount(0)
})

test('las filas de las visitas se marcan y el menú cambia con el estado', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', /^Exams/).tap()
  await screen.getByRole('menuitem', 'Treatment Plan').tap()
  const planes = screen.getByRole('navigation', 'Treatment plans')
  await planes.getByRole('button', /Periodontists Recommended, Planning/).tap()

  await screen.getByRole('checkbox', 'Select all procedures').first().tap()
  await expect(screen.getByText('4 selected')).toBeVisible()
  await screen.getByRole('button', 'Clear').tap()

  await screen.getByRole('button', 'Case actions').tap()
  await expect(screen.getByRole('menuitem', /Delete/)).toBeVisible()
  await expect(screen.getByRole('menuitem', /Finish Planning/)).toBeVisible()
})
