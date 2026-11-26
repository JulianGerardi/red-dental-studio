import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Clinical Mode, el flujo que más se tocó: cargar un procedimiento desde DentAssmt con el drawer de tres pasos. */

test('la app abre en el dashboard', async ({ app, screen }) => {
  await app.open('/')
  await expect(screen.getByRole('link', /patients/i).first()).toBeVisible()
})

test('Add procedure carga un D0120 desde DentAssmt', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'Dental assessment').first().tap()
  await screen.getByRole('button', 'Add procedure').tap()

  const drawer = screen.getByRole('dialog', 'New procedure')
  await expect(drawer).toBeVisible()
  await drawer.getByRole('button', /^D0120\s*-/).first().tap()
  // Sin superficie, Procedure ya es el último paso antes de guardar: el botón dice Save.
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/D0120 charted as planned/)).toBeVisible()
  // Al guardar el procedimiento aparecen los pasos para vincularlo.
  await expect(drawer.getByText('You can link clinical findings that may be resolved by this procedure.')).toBeVisible()
  await drawer.getByRole('button', /Next step/).tap()
  // El buscador no muestra nada hasta escribir; lo elegido queda debajo con su ✕.
  await drawer.getByPlaceholder('Search by code or surface').fill('K05')
  await drawer.getByRole('button', /^K05\.31/).first().tap()
  await expect(drawer.getByRole('button', /^Remove K05\.31/).first()).toBeVisible()
  await drawer.getByRole('button', /^Save/).tap()
})

test('Surfaces aparece sólo con un procedimiento de diente + superficie', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'Dental assessment').first().tap()
  await screen.getByRole('button', 'Add procedure').tap()

  const drawer = screen.getByRole('dialog', 'New procedure')
  await drawer.getByRole('button', 'D2140 on surface').tap()
  await drawer.getByRole('button', /Next step/).tap()
  await expect(drawer.getByText('Apply to unset')).toBeVisible()
  // Surfaces es el último paso antes de guardar: el botón ya dice Save.
  await expect(drawer.getByRole('button', /^Save/)).toBeDisabled()
  await drawer.getByRole('checkbox', 'Occlusal').tap()
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/D2140 charted as planned/)).toBeVisible()
  // Al guardar el procedimiento aparecen los pasos para vincularlo.
  await drawer.getByRole('button', /Next step/).tap()
  await drawer.getByRole('button', /^Save/).tap()
})

test('Existing no tiene Link to finding: Descriptors es el único paso antes de guardar', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'Dental assessment').first().tap()
  await screen.getByRole('button', 'Add condition').tap()

  const drawer = screen.getByRole('dialog', 'New condition')
  await drawer.getByRole('button', 'D2740 on tooth').tap()
  // Sin superficie, Descriptors es el paso que sigue a Procedure; no hay Link to finding/diagnosis en una condition.
  await drawer.getByRole('button', /Next step/).tap()
  await expect(drawer.getByText(/tap a pill again to clear it/i)).toBeVisible()
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/D2740 charted as existing/)).toBeVisible()
})

/* La guía visual de descriptores (Figma Platform Design, 5294:107675): se elige al crear la condition y se puede
   corregir después desde Edit, sin perder lo que no se tocó. */
test('Add condition con descriptores: se eligen al crear y se corrigen desde Edit', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'Dental assessment').first().tap()
  await screen.getByRole('button', 'Add condition').tap()

  const drawer = screen.getByRole('dialog', 'New condition')
  await drawer.getByRole('button', 'D2740 on tooth').tap()
  await drawer.getByRole('button', /Next step/).tap()
  await drawer.getByRole('button', 'Painful').tap()
  await drawer.getByRole('button', 'Round').tap()
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/D2740 charted as existing/)).toBeVisible()
  await expect(screen.getByText('Descriptors: Painful, Round')).toBeVisible()

  await screen.getByRole('button', /^Actions for Tooth 13$/).tap()
  await screen.getByRole('menuitem', 'Edit').tap()
  // Una condition cargada siempre es un finding: el drawer se titula Edit finding; el diente encabeza la rueda.
  const editar = screen.getByRole('dialog', 'Edit finding')
  await expect(editar.getByText('13 · Permanent')).toBeVisible()
  // Con un diente no van descriptores: sólo General information, sin pestañas (2026-11-25).
  await expect(editar.getByRole('tab', 'Descriptors')).toHaveCount(0)
  await editar.getByLabel('Notes').fill('Check again at next visit.')
  await editar.getByRole('button', /^Save/).tap()
  await expect(screen.getByText('Descriptors: Painful, Round')).toBeVisible()
})

test('Overview: el chart de DentAssmt muestra la última condición y sigue a Add condition', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await expect(screen.getByText(/Last Condition: Caries/)).toBeVisible()
  await expect(screen.getByText('Last update: 06/20/2025')).toBeVisible()

  // Show details lleva a DentAssmt, donde se carga otra con Add condition.
  await screen.getByRole('button', 'Show details').tap()
  await screen.getByRole('button', 'Add condition').tap()
  const drawer = screen.getByRole('dialog', 'New condition')
  await drawer.getByRole('button', 'D2740 on tooth').tap()
  await drawer.getByRole('button', /Next step/).tap()
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/D2740 charted as existing/)).toBeVisible()

  await screen.getByRole('button', /Overview/).first().tap()
  await expect(screen.getByText(/Last Condition: Crown/)).toBeVisible()
})

test('CC y TR siguen a los workflows de Treatment: completar Triage pone TR en verde', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await expect(screen.getByRole('button', 'Chief Complaint: completed').first()).toBeVisible()
  await screen.getByRole('button', 'Triage: not completed').first().tap()
  await screen.getByRole('button', 'Answer in treatment').tap()

  await expect(screen.getByRole('button', 'Save step')).toBeDisabled()
  for (const pregunta of [/traveled/, /first visit/, /unsafe/, /in any danger/, /alcohol/, /dental emergency/]) {
    await screen.getByRole('group', pregunta).getByRole('button', 'No').tap()
  }
  await screen.getByRole('button', 'Save step').tap()
  await expect(screen.getByText('Triage completed.')).toBeVisible()
  await expect(screen.getByRole('button', 'Triage: completed').first()).toBeVisible()
})

/* La tabla ya no va abajo del chart: el Overview entra en la pantalla y la tabla flota desde View problem list
   (clinical-mode.md, 2026-10-29). */
test('la tabla del Overview flota desde View problem list y tiene Problem list y Procedures', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await expect(screen.getByText('Generally unwell')).toHaveCount(0)
  await screen.getByRole('button', 'View problem list').tap()
  await expect(screen.getByText('Generally unwell')).toBeVisible()
  await screen.getByRole('tab', 'Procedures').tap()
  await expect(screen.getByText(/D0220 - Intraoral/)).toBeVisible()
})

test('Generate narrative arma el borrador con lo guardado de Chief Complaint', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'Chief Complaint: completed').first().tap()
  await screen.getByRole('button', 'Open in treatment').tap()
  await screen.getByRole('button', 'Generate narrative').tap()
  const editor = screen.getByRole('dialog', 'AI narrative editor')
  await expect(editor.getByText(/Original clinical draft/)).toBeVisible()
  await expect(editor.getByRole('button', /Apply changes/)).toBeDisabled()
})

test('el detalle de un procedimiento lleva a su caso y a su hallazgo', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'View problem list').tap()
  await screen.getByRole('tab', 'Procedures').tap()
  await screen.getByText(/D7286 - Incisional biopsy/).tap()
  await expect(screen.getByRole('button', /View full record/)).toHaveCount(0)
  await expect(screen.getByRole('button', 'Collapse all')).toBeVisible()
  // El hallazgo vinculado abre Problem list con esa fila desplegada.
  await screen.getByRole('button', /^Abscess \(morphologic abnormality\) · Soft palate/).tap()
  await expect(screen.getByRole('tab', 'Problem list')).toHaveAttribute('aria-selected', 'true')
  await expect(screen.getByText('Source exam')).toBeVisible()

  await screen.getByRole('tab', 'Procedures').tap()
  await screen.getByText(/D7140 - Extraction/).tap()
  await screen.getByRole('button', /^Bridge Option/).tap()
  await expect(screen.getByRole('button', /Bridge Option, Accepted/)).toBeVisible()
})

/* Lab order sobre la tabla estándar: Filter filtra por estado y Cancel order se deshace con Undo. */
test('Lab order filtra por estado y cancela una orden con Undo', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', /^Exams/).tap()
  await screen.getByRole('menuitem', 'Lab order').tap()
  await expect(screen.getByText(/Showing 1 to 9 of 9 results/)).toBeVisible()

  await screen.getByRole('button', /Filter lab orders by status/).tap()
  await screen.getByRole('menuitemcheckbox', /Requested/).tap()
  await screen.getByRole('menuitemcheckbox', /Requested/).press('Escape')
  await expect(screen.getByText(/Showing 1 to 2 of 2 results/)).toBeVisible()

  await screen.getByRole('button', 'Actions for Diego Garcia').tap()
  await screen.getByRole('menuitem', /Cancel order/).tap()
  await expect(screen.getByText('Lab order for Diego Garcia canceled.')).toBeVisible()
  await expect(screen.getByText(/Showing 1 to 1 of 1 results/)).toBeVisible()
  await screen.getByRole('button', 'Undo').tap()
  await expect(screen.getByText(/Showing 1 to 2 of 2 results/)).toBeVisible()
})

/* Procedures del Overview con el menú de CON-4052 y el consentimiento del procedimiento (prototipo de Julián). */
test('Procedures: Start bloqueado mientras el caso no está aceptado o espera el consentimiento', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'View problem list').tap()
  await screen.getByRole('tab', 'Procedures').tap()
  // Su caso está en Presented: Planned no tiene Start y Complete está bloqueado.
  await screen.getByPlaceholder('Search problem list').fill('D2740')
  await screen.getByRole('button', /Actions for D2740/).tap()
  await expect(screen.getByRole('menuitem', /Start/)).toHaveCount(0)
  await expect(screen.getByRole('menuitem', /Complete/)).toHaveAttribute('aria-disabled', 'true')
  await screen.getByRole('menuitem', /Edit/).press('Escape')
  // Waiting for consent: Start bloqueado.
  await screen.getByPlaceholder('Search problem list').fill('D2391')
  await screen.getByRole('button', /Actions for D2391/).tap()
  await expect(screen.getByRole('menuitem', /Start/)).toHaveAttribute('aria-disabled', 'true')
})

test('Procedures: Start con la firma pendiente, Cancel no cambia nada y Continue sigue sin firmar', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'View problem list').tap()
  await screen.getByRole('tab', 'Procedures').tap()
  await screen.getByPlaceholder('Search problem list').fill('D2950')
  await screen.getByRole('button', /Actions for D2950/).tap()
  await screen.getByRole('menuitem', /Start/).tap()
  const dialogo = screen.getByRole('dialog', 'Consent required')
  await expect(dialogo.getByText(/A consent document already exists/)).toBeVisible()
  await expect(dialogo.getByRole('button', /View consent/)).toBeVisible()
  await dialogo.getByRole('button', 'Cancel').tap()
  await expect(screen.getByRole('dialog', 'Consent required')).toHaveCount(0)

  await screen.getByRole('button', /Actions for D2950/).tap()
  await screen.getByRole('menuitem', /Start/).tap()
  await screen.getByRole('button', 'Continue without signed consent').tap()
  await expect(screen.getByText(/D2950 moved to In progress\. Consent signature pending\./)).toBeVisible()
  await expect(screen.getByRole('cell', 'In progress')).toBeVisible()
})

test('Procedures: Edit abre Edit procedure, guarda la nota y Refer pide confirmar', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'View problem list').tap()
  await screen.getByRole('tab', 'Procedures').tap()
  await screen.getByPlaceholder('Search problem list').fill('D2954')
  await screen.getByRole('button', /Actions for D2954/).tap()
  await screen.getByRole('menuitem', /Edit/).tap()
  // El mismo Edit procedure del examen, con el estimado en su pestaña (2026-11-25).
  const editar = screen.getByRole('dialog', 'Edit procedure')
  await editar.getByLabel('Notes').fill('Wait for the core buildup to set.')
  await editar.getByRole('button', /^Save/).tap()
  await expect(screen.getByRole('button', /Note: Wait for the core buildup to set\./)).toBeVisible()

  await screen.getByRole('button', /Actions for D2954/).tap()
  await screen.getByRole('menuitem', /Refer/).tap()
  const dialogo = screen.getByRole('dialog', 'Refer procedure')
  await expect(dialogo.getByText(/from Pending to Referred/)).toBeVisible()
  await dialogo.getByRole('button', 'Refer').tap()
  await expect(screen.getByText(/D2954 moved to Referred\./)).toBeVisible()
})

/* Parado en un examen, el menú de un finding abre lo mismo que la Problem list; un link cambia el drawer al registro. */
test('el menú de un finding del examen abre su registro', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'Dental assessment').tap()
  await screen.getByRole('button', /^Actions for Tooth 3$/).tap()
  await screen.getByRole('menuitem', 'View full record').tap()

  const drawer = screen.getByRole('dialog', /Chronic enamel dental caries/)
  await expect(drawer.getByText('Source exam')).toBeVisible()
  await drawer.getByRole('button', /^D2391 · Resin-based composite/).tap()
  await expect(screen.getByRole('dialog', /D2391 · Resin-based composite/)).toBeVisible()
})

/* Extraoral: el gráfico de regiones reemplaza el odontograma. Add condition abre el drawer propio (por región, no por
   diente), con lo ya elegido en el gráfico. */
test('Extraoral: elegir regiones en el gráfico y cargar una condition', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'Extraoral').tap()

  await screen.getByRole('button', /^Scalp$/).tap()
  await screen.getByRole('button', /^Right forehead$/).first().tap()
  await screen.getByRole('button', 'Add condition').tap()

  const drawer = screen.getByRole('dialog', 'New condition')
  await expect(drawer.getByText('Scalp')).toBeVisible()
  await expect(drawer.getByText('Right forehead')).toBeVisible()
  await drawer.getByPlaceholder('Search conditions').fill('Atro')
  await drawer.getByRole('button', /^Atrophy/).tap()
  await drawer.getByRole('button', /select descriptors/i).tap()
  await drawer.getByRole('button', 'Painful').tap()
  await drawer.getByRole('button', /^Save/).tap()

  await expect(screen.getByText(/Atrophy charted on Scalp, Right forehead/)).toBeVisible()
  await expect(screen.getByText('Condition: Atrophy (morphologic abnormality)')).toBeVisible()
  await expect(screen.getByText('Descriptors: Painful')).toBeVisible()
})

/* Intraoral: el mismo Add condition por región que Extraoral. Sin región elegida, Add condition y Add procedure no
   abren: avisan que hay que elegir una (red.dev, 2026-10-28). */
test('Intraoral: sin región elegida no deja cargar; con una, la condition va a esa región', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'Intraoral').tap()

  await screen.getByRole('button', 'Add condition').tap()
  await expect(screen.getByText('Select at least one area on the chart to add a condition.')).toBeVisible()
  await expect(screen.getByRole('dialog', 'New condition')).toHaveCount(0)
  await screen.getByRole('button', 'Add procedure').tap()
  await expect(screen.getByText('Select at least one area on the chart to add a procedure.')).toBeVisible()
  await expect(screen.getByRole('dialog', 'New procedure')).toHaveCount(0)

  await screen.getByRole('button', /^Left hard palate$/).tap()
  await screen.getByRole('button', 'Add condition').tap()
  const drawer = screen.getByRole('dialog', 'New condition')
  await expect(drawer.getByText('Left hard palate')).toBeVisible()
  await drawer.getByPlaceholder('Search conditions').fill('Absc')
  await drawer.getByRole('button', /^Abscess/).tap()
  await drawer.getByRole('button', /select descriptors/i).tap()
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/Abscess charted on Left hard palate/)).toBeVisible()

  // Edit finding: el área con el tipo con que se guardó (CON-3700) y los descriptores en su pestaña.
  await screen.getByRole('button', /^Actions for Left hard palate$/).tap()
  await screen.getByRole('menuitem', 'Edit').tap()
  const editar = screen.getByRole('dialog', 'Edit finding')
  await expect(editar.getByText('Intraoral').first()).toBeVisible()
  await editar.getByRole('tab', 'Descriptors').tap()
  await expect(editar.getByText('Selected descriptors')).toBeVisible()
})

/* Extraoral: Add procedure se carga sobre las regiones elegidas, no sobre un diente (red.dev, 2026-10-28). */
test('Extraoral: Add procedure va a la región elegida en el gráfico', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'Extraoral').tap()
  await screen.getByRole('button', /^Scalp$/).tap()
  await screen.getByRole('button', 'Add procedure').tap()

  const nuevo = screen.getByRole('dialog', 'New procedure')
  await expect(nuevo.getByRole('button', 'Remove Scalp')).toBeVisible()
  await nuevo.getByRole('button', /^D0120\s*-/).first().tap()
  await nuevo.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/D0120 charted as planned on Scalp/)).toBeVisible()
  await nuevo.getByRole('button', 'Close').tap()

  await screen.getByRole('button', /^Actions for Scalp$/).first().tap()
  await screen.getByRole('menuitem', 'Edit').tap()
  const editar = screen.getByRole('dialog', 'Edit procedure')
  await expect(editar.getByText('Extraoral').first()).toBeVisible()
})

/* Edit procedure (Figma 5294:85084): tres pestañas; Findings y Diagnostic traen lo vinculable y un solo Save guarda todo. */
test('Edit procedure: pestañas General information, Findings y Diagnostic', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'Dental assessment').first().tap()
  await screen.getByRole('button', 'Add procedure').tap()
  const nuevo = screen.getByRole('dialog', 'New procedure')
  await nuevo.getByRole('button', /^D0120\s*-/).first().tap()
  await nuevo.getByRole('button', /^Save/).tap()
  await nuevo.getByRole('button', 'Close').tap()

  await screen.getByRole('button', /^Actions for Tooth 13$/).tap()
  await screen.getByRole('menuitem', 'Edit').tap()
  const editar = screen.getByRole('dialog', 'Edit procedure')
  await expect(editar.getByText('Creation date')).toBeVisible()
  await expect(editar.getByText('Fee')).toBeVisible()
  // El área de tratamiento con que se guardó (CON-3700): D0120 sobre el diente 13.
  await expect(editar.getByText(/^Tooth$/)).toBeVisible()
  await editar.getByRole('tab', 'Findings').tap()
  await expect(editar.getByText('Link findings')).toBeVisible()
  await editar.getByRole('tab', 'Diagnostic').tap()
  await expect(editar.getByText('Link diagnosis')).toBeVisible()
  // Link findings y Link diagnosis arrancan con uno cargado y sin bajada.
  await editar.getByRole('tab', 'Findings').tap()
  await expect(editar.getByText('Linked findings')).toBeVisible()
  await editar.getByRole('tab', 'Diagnostic').tap()
  await expect(editar.getByText('Linked diagnoses')).toBeVisible()
  // Estimate (CON-4211): un monto del seguro que supera el cargo no deja guardar.
  await editar.getByRole('tab', 'Estimate').tap()
  await expect(editar.getByText('Outstanding insurance estimates')).toBeVisible()
  await editar.getByRole('checkbox', 'Calculate insurance estimates automatically').tap()
  await editar.getByLabel('Primary insurance portion').fill('99999')
  await editar.getByLabel('Primary insurance portion').press('Tab')
  await editar.getByRole('button', /^Save/).tap()
  await expect(editar.getByText(/can't add up to more than the amount charged/)).toBeVisible()
  await editar.getByLabel('Primary insurance portion').fill('10')
  await editar.getByLabel('Primary insurance portion').press('Tab')
  await editar.getByRole('button', /^Save/).tap()
  await expect(screen.getByRole('dialog', 'Edit procedure')).toHaveCount(0)
})

/* Problem List: Edit del ⋮ abre el mismo Edit finding del examen (2026-11-25). */
test('Problem list: Edit abre Edit finding y guarda la nota', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'View problem list').tap()
  await screen.getByPlaceholder('Search problem list').fill('calculus')
  await screen.getByRole('button', /Actions for Dental calculus/).tap()
  await screen.getByRole('menuitem', /Edit/).tap()
  const editar = screen.getByRole('dialog', 'Edit finding')
  await expect(editar.getByText('22 · Permanent')).toBeVisible()
  await editar.getByLabel('Notes').fill('Scaling done on the lingual side.')
  await editar.getByRole('button', /^Save/).tap()
  await expect(screen.getByRole('button', /Note: Scaling done on the lingual side\./)).toBeVisible()
})

/* New procedure: el buscador es independiente de la lista (red.dev): busca en todo el catálogo y elegir un resultado lo
   marca en la lista, sin filtrarla. */
test('New procedure: el buscador independiente elige un procedimiento de la lista', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', 'Dental assessment').first().tap()
  await screen.getByRole('button', 'Add procedure').tap()
  const drawer = screen.getByRole('dialog', 'New procedure')
  await drawer.getByPlaceholder('Search by code or description').fill('crown')
  await drawer.getByRole('button', /^D2740 - Crown.*Quadrant/).tap()
  await expect(drawer.getByRole('button', /^D0120\s*-/).first()).toBeVisible()
  await drawer.getByRole('button', 'D2740 on tooth').tap()
  await drawer.getByRole('button', /^Save/).tap()
  await expect(screen.getByText(/D2740 charted as planned/)).toBeVisible()
})

/* El encuentro como en CON-1612 y red.dev: en curso se completa, se pausa o se da el alta (clinical-mode.md, 2026-11-13). */
test('el encuentro empieza, se pausa, se retoma y se da el alta desde su menú', async ({ app, screen }) => {
  await app.open('/patients/john-smith/clinical-mode')
  await expect(screen.getByRole('button', 'Encounter options')).toHaveCount(0)
  await screen.getByRole('button', /Start encounter/).first().tap()
  await expect(screen.getByRole('button', /Complete encounter/).first()).toBeVisible()
  await screen.getByRole('button', 'Encounter options').tap()
  await screen.getByRole('menuitem', /Pause encounter/).tap()
  await expect(screen.getByRole('button', /Pending encounter/).first()).toBeVisible()
  await screen.getByRole('button', 'Encounter options').tap()
  await screen.getByRole('menuitem', /Discharge patient/).tap()
  await expect(screen.getByText('Patient discharged.')).toBeVisible()
  await expect(screen.getByRole('button', /Start encounter/).first()).toBeVisible()
})

/* CON-4153: Complete encounter abre End Encounter con los procedimientos del turno. Las fases van en orden en el mismo
   encuentro, completar antes de tiempo pide confirmación y el historial muestra lo registrado (clinical-mode.md, 2026-11-25). */
test('End Encounter registra fases en orden, completa antes de tiempo y cierra el encuentro', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', /Start encounter/).first().tap()
  await screen.getByRole('button', /Complete encounter/).first().tap()
  const drawer = screen.getByRole('dialog', 'End Encounter')
  await expect(drawer.getByText('Appointment procedures · 5')).toBeVisible()

  // El implante, de tres fases: Start procedure, y en el mismo encuentro la fase 2 y el cierre.
  await drawer.getByRole('button', 'Start procedure').tap()
  await expect(screen.getByText(/Phase 1 completed\. Phase 2 is now available/)).toBeVisible()
  await expect(drawer.getByRole('button', 'Complete phase 2')).toHaveCount(2)

  // La endodoncia termina en la fase 2 de 4: Cancel no cambia nada; confirmar la deja Completed.
  await drawer.getByRole('button', 'Actions for Endodontic therapy, molar tooth').tap()
  await screen.getByRole('menuitem', /^Complete procedure$/).tap()
  const confirmar = screen.getByRole('dialog', 'Complete procedure?')
  await expect(confirmar.getByText(/It will finish at phase 2 of 4/)).toBeVisible()
  await confirmar.getByRole('button', 'Cancel').tap()
  await expect(drawer.getByRole('button', 'Complete phase 2')).toHaveCount(2)
  await drawer.getByRole('button', 'Actions for Endodontic therapy, molar tooth').tap()
  await screen.getByRole('menuitem', /^Complete procedure$/).tap()
  await screen.getByRole('dialog', 'Complete procedure?').getByRole('button', 'Complete procedure').tap()
  await expect(drawer.getByText(/Last completed: phase 2 of 4 · Completed early/)).toBeVisible()

  // El historial: sólo lo registrado, con la nota de cada encuentro.
  await drawer.getByRole('button', 'Actions for Endodontic therapy, molar tooth').tap()
  await screen.getByRole('menuitem', /View execution history/).tap()
  const historial = screen.getByRole('dialog', 'Execution history')
  await expect(historial.getByRole('row')).toHaveCount(3)
  await expect(historial.getByText('Finished')).toBeVisible()
  await historial.getByRole('button', 'Close').last().tap()

  await drawer.getByRole('button', 'End Encounter').tap()
  await expect(screen.getByText('Encounter completed.')).toBeVisible()
  await expect(screen.getByRole('dialog', 'Clinical note')).toBeVisible()
})
