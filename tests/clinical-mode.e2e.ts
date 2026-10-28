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
  // Sin superficie, Procedure ya es el último paso antes de guardar: el botón dice Save.
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/D0120 charted as planned/)).toBeVisible()
  // Al guardar el procedimiento aparecen los pasos para vincularlo.
  await expect(drawer.getByText('You can link clinical findings that may be resolved by this procedure.')).toBeVisible()
  await drawer.getByRole('button', /Next Step/).tap()
  // El buscador no muestra nada hasta escribir; lo elegido queda debajo con su ✕.
  await drawer.getByPlaceholder('Search by code or surface').fill('K05')
  await drawer.getByRole('button', /^K05\.31/).first().tap()
  await expect(drawer.getByRole('button', /^Remove K05\.31/).first()).toBeVisible()
  await drawer.getByRole('button', /^Save/).tap()
})

test('Surfaces aparece sólo con un procedimiento de diente + superficie', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'DentAssmt').first().tap()
  await screen.getByRole('button', 'Add Procedure').tap()

  const drawer = screen.getByRole('dialog', 'New Procedure')
  await drawer.getByRole('button', 'D2140 on surface').tap()
  await drawer.getByRole('button', /Next Step/).tap()
  await expect(drawer.getByText('Apply to unset')).toBeVisible()
  // Surfaces es el último paso antes de guardar: el botón ya dice Save.
  await expect(drawer.getByRole('button', /^Save/)).toBeDisabled()
  await drawer.getByRole('checkbox', 'Occlusal').tap()
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/D2140 charted as planned/)).toBeVisible()
  // Al guardar el procedimiento aparecen los pasos para vincularlo.
  await drawer.getByRole('button', /Next Step/).tap()
  await drawer.getByRole('button', /^Save/).tap()
})

test('Existing no tiene Link to finding: Descriptors es el único paso antes de guardar', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'DentAssmt').first().tap()
  await screen.getByRole('button', 'Add Condition').tap()

  const drawer = screen.getByRole('dialog', 'New Condition')
  await drawer.getByRole('button', 'D2740 on tooth').tap()
  // Sin superficie, Descriptors es el paso que sigue a Procedure; no hay Link to finding/diagnosis en una condition.
  await drawer.getByRole('button', /Next Step/).tap()
  await expect(drawer.getByText(/tap a pill again to clear it/i)).toBeVisible()
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/D2740 charted as existing/)).toBeVisible()
})

/* La guía visual de descriptores (Figma Platform Design, 5294:107675): se elige al crear la condition y se puede
   corregir después desde Edit, sin perder lo que no se tocó. */
test('Add Condition con descriptores: se eligen al crear y se corrigen desde Edit', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'DentAssmt').first().tap()
  await screen.getByRole('button', 'Add Condition').tap()

  const drawer = screen.getByRole('dialog', 'New Condition')
  await drawer.getByRole('button', 'D2740 on tooth').tap()
  await drawer.getByRole('button', /Next Step/).tap()
  await drawer.getByRole('button', 'Painful').tap()
  await drawer.getByRole('button', 'Round').tap()
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/D2740 charted as existing/)).toBeVisible()
  await expect(screen.getByText('Descriptors: Painful, Round')).toBeVisible()

  await screen.getByRole('button', /^Actions for Tooth 13$/).tap()
  await screen.getByRole('menuitem', 'Edit').tap()
  // Una condition cargada siempre es un finding: el drawer se titula Edit Finding; el diente encabeza la rueda.
  const editar = screen.getByRole('dialog', 'Edit Finding')
  await expect(editar.getByText('13 · Permanent')).toBeVisible()
  // General Information y Descriptors van en dos pestañas.
  await editar.getByRole('tab', 'Descriptors').tap()
  await editar.getByRole('button', 'Painless').tap()
  await editar.getByRole('button', /^Save/).tap()
  await expect(screen.getByText('Descriptors: Painless, Round')).toBeVisible()
})

test('Overview: el chart de DentAssmt muestra la última condición y sigue a Add Condition', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await expect(screen.getByText(/Last Condition: Caries/)).toBeVisible()
  await expect(screen.getByText('Last Update: 20/06/2025')).toBeVisible()

  // Show details lleva a DentAssmt, donde se carga otra con Add Condition.
  await screen.getByRole('button', 'Show details').tap()
  await screen.getByRole('button', 'Add Condition').tap()
  const drawer = screen.getByRole('dialog', 'New Condition')
  await drawer.getByRole('button', 'D2740 on tooth').tap()
  await drawer.getByRole('button', /Next Step/).tap()
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/D2740 charted as existing/)).toBeVisible()

  await screen.getByRole('button', /Overwiev/).first().tap()
  await expect(screen.getByText(/Last Condition: Crown/)).toBeVisible()
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
  await expect(screen.getByRole('button', /View full record/)).toHaveCount(0)
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

/* Cambiar el estado de un procedimiento (Start en Procedures): sin caso aceptado avisa, y con la firma pendiente o sin
   mandar abre Consent required (CON-3927, CON-3946, CON-3950). Ver clinical-mode.md, 2026-10-17. */
test('Start de un procedimiento cuyo caso no está aceptado avisa y lleva al caso', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('tab', 'Procedures').tap()
  await screen.getByPlaceholder('Search...').fill('D2740')
  await screen.getByRole('button', /Actions for D2740/).tap()
  await screen.getByRole('menuitem', /Start/).tap()
  await expect(screen.getByText('Procedure cannot be updated')).toBeVisible()
  await expect(screen.getByText(/must be Accepted and its treatment plan must be Accepted or In Progress/)).toBeVisible()
  await expect(screen.getByRole('cell', 'Planned')).toBeVisible()
  await screen.getByRole('button', 'View case').tap()
  await expect(screen.getByRole('navigation', 'Treatment plans')).toBeVisible()
  await expect(screen.getByText('Crown Option').first()).toBeVisible()
  await expect(screen.getByRole('button', /Complete D0120/)).toHaveCount(0)
})

test('Start con la firma pendiente: Cancel no cambia nada y Continue sigue sin firmar', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('tab', 'Procedures').tap()
  await screen.getByPlaceholder('Search...').fill('D2391')
  await screen.getByRole('button', /Actions for D2391/).tap()
  await screen.getByRole('menuitem', /Start/).tap()
  const dialogo = screen.getByRole('dialog', 'Consent required')
  await expect(dialogo.getByText(/A consent document already exists/)).toBeVisible()
  await expect(dialogo.getByRole('button', /View consent/)).toBeVisible()
  await dialogo.getByRole('button', 'Cancel').tap()
  await expect(screen.getByRole('dialog')).toHaveCount(0)
  await expect(screen.getByRole('cell', 'Planned')).toBeVisible()

  await screen.getByRole('button', /Actions for D2391/).tap()
  await screen.getByRole('menuitem', /Start/).tap()
  await screen.getByRole('button', 'Continue without signed consent').tap()
  await expect(screen.getByText(/D2391 moved to In progress\. Consent signature pending\./)).toBeVisible()
  await expect(screen.getByRole('cell', 'In progress')).toBeVisible()
})

test('Start sin consentimiento enviado: se manda y se sigue, sin pedir otra confirmación', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('tab', 'Procedures').tap()
  await screen.getByPlaceholder('Search...').fill('D2392')
  await screen.getByRole('button', /Actions for D2392/).tap()
  await screen.getByRole('menuitem', /Start/).tap()
  const dialogo = screen.getByRole('dialog', 'Consent required')
  await expect(dialogo.getByText(/This procedure requires a consent document/)).toBeVisible()
  await expect(dialogo.getByRole('button', /View consent/)).toHaveCount(0)
  await dialogo.getByRole('button', 'Send consent and sign later').tap()
  await expect(screen.getByRole('dialog')).toHaveCount(0)
  await expect(screen.getByText(/D2392 moved to In progress\. Consent sent to the patient\./)).toBeVisible()
})

/* Parado en un examen, el menú de un finding abre lo mismo que la Problem List; un link cambia el drawer al registro. */
test('el menú de un finding del examen abre su registro', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'DentAssmt').tap()
  await screen.getByRole('button', /^Actions for Tooth 3$/).tap()
  await screen.getByRole('menuitem', 'View full record').tap()

  const drawer = screen.getByRole('dialog', /Chronic enamel dental caries/)
  await expect(drawer.getByText('Source exam')).toBeVisible()
  await drawer.getByRole('button', /^D2391 · Resin-based composite/).tap()
  await expect(screen.getByRole('dialog', /D2391 · Resin-based composite/)).toBeVisible()
})

/* Extraoral: el gráfico de regiones reemplaza el odontograma. Add Condition abre el drawer propio (por región, no por
   diente), con lo ya elegido en el gráfico. */
test('Extraoral: elegir regiones en el gráfico y cargar una condition', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'Extra Oral').tap()

  await screen.getByRole('button', /^Scalp$/).tap()
  await screen.getByRole('button', /^Right Forehead$/).first().tap()
  await screen.getByRole('button', 'Add Condition').tap()

  const drawer = screen.getByRole('dialog', 'New Condition')
  await expect(drawer.getByText('Scalp')).toBeVisible()
  await expect(drawer.getByText('Right Forehead')).toBeVisible()
  await drawer.getByPlaceholder('Search a Condition Here...').fill('Atro')
  await drawer.getByRole('button', /^Atrophy/).tap()
  await drawer.getByRole('button', /select descriptors/i).tap()
  await drawer.getByRole('button', 'Painful').tap()
  await drawer.getByRole('button', /^Save/).tap()

  await expect(screen.getByText(/Atrophy charted on Scalp, Right Forehead/)).toBeVisible()
  await expect(screen.getByText('Condition: Atrophy (morphologic abnormality)')).toBeVisible()
  await expect(screen.getByText('Descriptors: Painful')).toBeVisible()
})

/* Intraoral: el mismo Add Condition por región que Extraoral. Sin región elegida, Add Condition y Add Procedure no
   abren: avisan que hay que elegir una (red.dev, 2026-10-28). */
test('Intraoral: sin región elegida no deja cargar; con una, la condition va a esa región', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'Intra Oral').tap()

  await screen.getByRole('button', 'Add Condition').tap()
  await expect(screen.getByText('Select at least one area on the chart to add a condition.')).toBeVisible()
  await expect(screen.getByRole('dialog', 'New Condition')).toHaveCount(0)
  await screen.getByRole('button', 'Add Procedure').tap()
  await expect(screen.getByText('Select at least one area on the chart to add a procedure.')).toBeVisible()
  await expect(screen.getByRole('dialog', 'New Procedure')).toHaveCount(0)

  await screen.getByRole('button', /^Left Hard Palate$/).tap()
  await screen.getByRole('button', 'Add Condition').tap()
  const drawer = screen.getByRole('dialog', 'New Condition')
  await expect(drawer.getByText('Left Hard Palate')).toBeVisible()
  await drawer.getByPlaceholder('Search a Condition Here...').fill('Absc')
  await drawer.getByRole('button', /^Abscess/).tap()
  await drawer.getByRole('button', /select descriptors/i).tap()
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/Abscess charted on Left Hard Palate/)).toBeVisible()

  // Edit Finding: el área con el tipo con que se guardó (CON-3700) y los descriptores en su pestaña.
  await screen.getByRole('button', /^Actions for Left Hard Palate$/).tap()
  await screen.getByRole('menuitem', 'Edit').tap()
  const editar = screen.getByRole('dialog', 'Edit Finding')
  await expect(editar.getByText('Intra Oral')).toBeVisible()
  await editar.getByRole('tab', 'Descriptors').tap()
  await expect(editar.getByText('Selected Descriptors')).toBeVisible()
})

/* Extraoral: Add Procedure se carga sobre las regiones elegidas, no sobre un diente (red.dev, 2026-10-28). */
test('Extraoral: Add Procedure va a la región elegida en el gráfico', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'Extra Oral').tap()
  await screen.getByRole('button', /^Scalp$/).tap()
  await screen.getByRole('button', 'Add Procedure').tap()

  const nuevo = screen.getByRole('dialog', 'New Procedure')
  await expect(nuevo.getByRole('button', 'Remove Scalp')).toBeVisible()
  await nuevo.getByRole('button', /^D0120\s*-/).first().tap()
  await nuevo.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/D0120 charted as planned on Scalp/)).toBeVisible()
  await nuevo.getByRole('button', 'Close').tap()

  await screen.getByRole('button', /^Actions for Scalp$/).first().tap()
  await screen.getByRole('menuitem', 'Edit').tap()
  const editar = screen.getByRole('dialog', 'Edit Procedure')
  await expect(editar.getByText('Extra Oral')).toBeVisible()
})

/* Edit Procedure (Figma 5294:85084): tres pestañas; Findings y Diagnostic traen lo vinculable y un solo Save guarda todo. */
test('Edit Procedure: pestañas General Information, Findings y Diagnostic', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'DentAssmt').first().tap()
  await screen.getByRole('button', 'Add Procedure').tap()
  const nuevo = screen.getByRole('dialog', 'New Procedure')
  await nuevo.getByRole('button', /^D0120\s*-/).first().tap()
  await nuevo.getByRole('button', /^Save/).tap()
  await nuevo.getByRole('button', 'Close').tap()

  await screen.getByRole('button', /^Actions for Tooth 13$/).tap()
  await screen.getByRole('menuitem', 'Edit').tap()
  const editar = screen.getByRole('dialog', 'Edit Procedure')
  await expect(editar.getByText('Creation date')).toBeVisible()
  await expect(editar.getByText('Fee')).toBeVisible()
  // El área de tratamiento con que se guardó (CON-3700): D0120 sobre el diente 13.
  await expect(editar.getByText(/^Tooth$/)).toBeVisible()
  await editar.getByRole('tab', 'Findings').tap()
  await expect(editar.getByText('Link Findings')).toBeVisible()
  await editar.getByRole('tab', 'Diagnostic').tap()
  await expect(editar.getByText('Link Diagnosis')).toBeVisible()
  await editar.getByRole('button', /^Save/).tap()
})

/* New Procedure: el buscador es independiente de la lista (red.dev): busca en todo el catálogo y elegir un resultado lo
   marca en la lista, sin filtrarla. */
test('New Procedure: el buscador independiente elige un procedimiento de la lista', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'DentAssmt').first().tap()
  await screen.getByRole('button', 'Add Procedure').tap()
  const drawer = screen.getByRole('dialog', 'New Procedure')
  await drawer.getByPlaceholder('Search by code or description').fill('crown')
  await drawer.getByRole('button', /^D2740 - Crown.*Quadrant/).tap()
  await expect(drawer.getByRole('button', /^D0120\s*-/).first()).toBeVisible()
  await drawer.getByRole('button', 'D2740 on tooth').tap()
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/D2740 charted as planned/)).toBeVisible()
})
