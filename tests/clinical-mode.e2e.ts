import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Clinical Mode, el flujo que más se tocó: cargar un procedimiento desde DentAssmt con el drawer de tres pasos. */

test('la app abre en el dashboard', async ({ app, screen }) => {
  await app.open('/')
  await expect(screen.getByRole('link', /patients/i).first()).toBeVisible()
})

test('Add Procedure carga un D0120 desde DentAssmt', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'DentAssmt').first().tap()
  await screen.getByRole('button', 'Add Procedure').tap()

  const drawer = screen.getByRole('dialog', 'New Procedure')
  await expect(drawer).toBeVisible()
  await drawer.getByRole('button', /^D0120\s*-/).first().tap()
  // Sin superficie: de Procedure pasa directo a Link to finding y después a Link to diagnosis, con los códigos.
  await drawer.getByRole('button', /Next Step/).tap()
  await expect(drawer.getByText('You can link clinical findings that may be resolved by this procedure.')).toBeVisible()
  await drawer.getByRole('button', /Next Step/).tap()
  await expect(drawer.getByText(/K05\.31/).first()).toBeVisible()
  await drawer.getByRole('button', /^Link K05\.31/).tap()
  await drawer.getByRole('button', /^Save/).tap()

  await expect(screen.getByText(/D0120 charted as planned/)).toBeVisible()
})

test('Surfaces aparece sólo con un procedimiento de diente + superficie', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'DentAssmt').first().tap()
  await screen.getByRole('button', 'Add Procedure').tap()

  const drawer = screen.getByRole('dialog', 'New Procedure')
  await drawer.getByRole('button', 'D2140 on surface').tap()
  await drawer.getByRole('button', /Next Step/).tap()
  await expect(drawer.getByText('Apply to unset')).toBeVisible()
  await expect(drawer.getByRole('button', /Next Step/)).toBeDisabled()
  await drawer.getByRole('checkbox', 'Occlusal').tap()
  await drawer.getByRole('button', /Next Step/).tap()
  await drawer.getByRole('button', /Next Step/).tap()
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/D2140 charted as planned/)).toBeVisible()
})

test('Existing no tiene Link to finding: sin superficie se guarda en un paso', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'DentAssmt').first().tap()
  await screen.getByRole('button', 'Add Condition').tap()

  const drawer = screen.getByRole('dialog', 'New Condition')
  await drawer.getByRole('button', 'D2740 on tooth').tap()
  await expect(drawer.getByRole('button', /Next Step/)).toHaveCount(0)
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/D2740 charted as existing/)).toBeVisible()
})

test('CC y TR siguen a los workflows de Treatment: completar Triage pone TR en verde', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await expect(screen.getByRole('button', 'Chief Complaint: completed').first()).toBeVisible()
  await screen.getByRole('button', 'Triage: not completed').first().tap()
  await screen.getByRole('button', 'Answer in Treatment').tap()

  await expect(screen.getByRole('button', 'Save Step')).toBeDisabled()
  for (const pregunta of [/traveled/, /first visit/, /unsafe/, /in any danger/, /alcohol/, /dental emergency/]) {
    await screen.getByRole('group', pregunta).getByRole('button', 'No').tap()
  }
  await screen.getByRole('button', 'Save Step').tap()
  await expect(screen.getByText('Triage completed.')).toBeVisible()
  await expect(screen.getByRole('button', 'Triage: completed').first()).toBeVisible()
})

test('la tabla del Overview tiene Problem List y Procedures', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await expect(screen.getByText('Generally unwell')).toBeVisible()
  await screen.getByRole('tab', 'Procedures').tap()
  await expect(screen.getByText(/D0220 - Intraoral/)).toBeVisible()
})

test('Generate Narrative arma el borrador con lo guardado de Chief Complaint', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'Chief Complaint: completed').first().tap()
  await screen.getByRole('button', 'Open in Treatment').tap()
  await screen.getByRole('button', 'Generate Narrative').tap()
  const editor = screen.getByRole('dialog', 'AI Narrative Editor')
  await expect(editor.getByText(/Original Clinical Draft/)).toBeVisible()
  await expect(editor.getByRole('button', /Apply Changes/)).toBeDisabled()
})

test('el detalle de un procedimiento lleva a su caso y a su hallazgo', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('tab', 'Procedures').tap()
  await screen.getByText(/D7286 - Incisional biopsy/).tap()
  await expect(screen.getByRole('button', /View full record/)).toBeVisible()
  await expect(screen.getByRole('button', 'Collapse all')).toBeVisible()
  // El hallazgo vinculado abre Problem List con esa fila desplegada.
  await screen.getByRole('button', /^Abscess \(morphologic abnormality\) · Soft Palate/).tap()
  await expect(screen.getByRole('tab', 'Problem List')).toHaveAttribute('aria-selected', 'true')
  await expect(screen.getByText('Source exam')).toBeVisible()

  await screen.getByRole('tab', 'Procedures').tap()
  await screen.getByText(/D7140 - Extraction/).tap()
  await screen.getByRole('button', /^Bridge Option/).tap()
  await expect(screen.getByRole('button', /Bridge Option, Accepted/)).toBeVisible()
})

/* Lab Order sobre la tabla estándar: Filter filtra por estado y Cancel order se deshace con Undo. */
test('Lab Order filtra por estado y cancela una orden con Undo', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', /^Exams/).tap()
  await screen.getByRole('menuitem', 'Lab Order').tap()
  await expect(screen.getByText(/Showing 1 to 9 of 9 active prescriptions/)).toBeVisible()

  await screen.getByRole('button', /Filter lab orders by status/).tap()
  await screen.getByRole('menuitemcheckbox', /Requested/).tap()
  await screen.getByRole('menuitemcheckbox', /Requested/).press('Escape')
  await expect(screen.getByText(/Showing 1 to 2 of 2 active prescriptions/)).toBeVisible()

  await screen.getByRole('button', 'Actions for Diego Garcia').tap()
  await screen.getByRole('menuitem', /Cancel order/).tap()
  await expect(screen.getByText('Lab order for Diego Garcia canceled.')).toBeVisible()
  await expect(screen.getByText(/Showing 1 to 1 of 1 active prescriptions/)).toBeVisible()
  await screen.getByRole('button', 'Undo').tap()
  await expect(screen.getByText(/Showing 1 to 2 of 2 active prescriptions/)).toBeVisible()
})
