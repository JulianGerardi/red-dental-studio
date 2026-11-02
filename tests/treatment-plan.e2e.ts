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

/* CON-4052: el menú ⋮ según el estado del procedimiento y del plan. Antes de aceptar, Complete está pero bloqueado; en
   Waiting for consent, Start y Complete también; con el plan aceptado, Complete pasa por el consentimiento. */
test('Complete bloqueado mientras se planea o espera el consentimiento; aceptado pide Consent required', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', /^Exams/).tap()
  await screen.getByRole('menuitem', 'Treatment Plan').tap()
  const planes = screen.getByRole('navigation', 'Treatment plans')

  // Planning: Complete deshabilitado, sin Start, con Delete; sin columna Consent.
  await planes.getByRole('button', /Periodontists Recommended, Planning/).tap()
  await expect(screen.getByRole('columnheader', 'Consent')).toHaveCount(0)
  await screen.getByRole('button', /Actions for D0120/).first().tap()
  await expect(screen.getByRole('menuitem', /Complete/)).toHaveAttribute('aria-disabled', 'true')
  await expect(screen.getByRole('menuitem', /Start/)).toHaveCount(0)
  await screen.getByRole('menuitem', /Delete/).press('Escape')

  // Presented: igual que Planning.
  await planes.getByRole('button', /^24\/08\/2026/).tap()
  await planes.getByRole('button', /Crown Option, Presented/).tap()
  await expect(screen.getByRole('columnheader', 'Consent')).toHaveCount(0)
  await screen.getByRole('button', /Actions for D0120/).first().tap()
  await expect(screen.getByRole('menuitem', /Complete/)).toHaveAttribute('aria-disabled', 'true')
  await expect(screen.getByRole('menuitem', /Start/)).toHaveCount(0)
  await screen.getByRole('menuitem', /Delete/).press('Escape')

  // Waiting for consent: Start y Complete deshabilitados, sin Delete.
  await planes.getByRole('button', /^26\/08\/2026/).tap()
  await planes.getByRole('button', /Restorative Plan, Waiting for consent/).tap()
  await screen.getByRole('button', /Actions for D2392/).tap()
  await expect(screen.getByRole('menuitem', /Start/)).toHaveAttribute('aria-disabled', 'true')
  await expect(screen.getByRole('menuitem', /Complete/)).toHaveAttribute('aria-disabled', 'true')
  await expect(screen.getByRole('menuitem', /Delete/)).toHaveCount(0)
  await screen.getByRole('menuitem', /Edit/).press('Escape')

  // Aceptado: Complete con el consentimiento sin generar (D2954) lo manda y sigue.
  await planes.getByRole('button', /^27\/04\/2026/).tap()
  await planes.getByRole('button', /Endodontic Treatment, Accepted/).tap()
  await screen.getByRole('button', /Complete D2954/).tap()
  const dialogo = screen.getByRole('dialog', 'Consent required')
  await expect(dialogo.getByText(/This procedure requires a consent document/)).toBeVisible()
  await expect(dialogo.getByText(/Case: Endodontic Treatment/)).toBeVisible()
  await dialogo.getByRole('button', 'Send consent and sign later').tap()
  await expect(screen.getByText(/Procedure completed\. Consent sent to the patient\./)).toBeVisible()
  await expect(screen.getByRole('button', /Open consent for D2954: Pending/)).toBeVisible()
})

/* Sign now lleva al consentimiento (no abre un drawer); ahí se firma en el pop up del portal y, con las dos firmas, se
   confirma el Start; el plan aceptado pasa a In progress. */
test('Start con Sign now lleva al consentimiento, se firma ahí y deja el plan In progress', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode?case=c5')
  await screen.getByRole('button', /Actions for D2950/).tap()
  await screen.getByRole('menuitem', /Start/).tap()
  await screen.getByRole('button', 'Sign now').tap()
  await expect(screen.getByRole('heading', /Procedure Consent - D2950/)).toBeVisible()
  await expect(screen.getByText('Sign to start this procedure')).toBeVisible()
  // El paciente ya firmó: falta el provider, en el pop up del portal.
  await screen.getByRole('button', /Provider Signature/).tap()
  const provider = screen.getByRole('dialog', 'Provider Signature')
  await expect(provider.getByText('Secure signing portal')).toBeVisible()
  await provider.getByLabel('Email').fill('perez@clinic.com')
  await provider.getByPlaceholder('Enter password').fill('secret')
  await provider.getByRole('button', /^Sign$/).tap()
  const firmado = screen.getByRole('dialog', 'Consent signed')
  await firmado.getByRole('button', 'Confirm Start').tap()
  await expect(screen.getByText(/Procedure started\. Consent signed\./)).toBeVisible()
  await expect(screen.getByRole('button', /Open consent for D2950: Signed/)).toBeVisible()
  await expect(screen.getByText('In progress').first()).toBeVisible()
})

/* Back del consentimiento que vino de Sign now: el procedimiento queda como estaba. */
test('Sign now y Back deja el procedimiento sin cambios', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode?case=c5')
  await screen.getByRole('button', /Actions for D2750/).tap()
  await screen.getByRole('menuitem', /Start/).tap()
  await screen.getByRole('button', 'Sign now').tap()
  await expect(screen.getByRole('heading', /Procedure Consent - D2750/)).toBeVisible()
  await screen.getByRole('button', 'Back').tap()
  await expect(screen.getByText(/The procedure has not changed/).first()).toBeVisible()
  await expect(screen.getByRole('button', /Open consent for D2750: Not sent/)).toBeVisible()
})

/* La columna Consent: sin documento avisa; con documento abre el consentimiento, donde firman paciente y provider. */
test('la columna Consent abre el consentimiento y ahí firman paciente y provider', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode?case=c5')
  await screen.getByRole('button', /Open consent for D2954: Not generated/).tap()
  await expect(screen.getByText(/No document yet\. Start or Complete initiates consent management/).first()).toBeVisible()

  await screen.getByRole('button', /Open consent for D2750: Not sent/).tap()
  await expect(screen.getByRole('heading', /Procedure Consent - D2750/)).toBeVisible()
  // El paciente marca las afirmaciones en el documento antes de firmar.
  await expect(screen.getByRole('button', /Patient Signature/)).toBeDisabled()
  for (let i = 0; i < 5; i++) await screen.getByRole('checkbox').nth(i).tap()
  await screen.getByRole('button', /Patient Signature/).tap()
  const paciente = screen.getByRole('dialog', 'Patient Signature')
  await expect(paciente.getByLabel('Initials')).toHaveValue('JP')
  await paciente.getByRole('button', /Adopt and Sign/).tap()
  await expect(screen.getByText(/Patient signed/)).toBeVisible()

  await screen.getByRole('button', /Provider Signature/).tap()
  const provider = screen.getByRole('dialog', 'Provider Signature')
  await expect(provider.getByRole('button', /^Sign$/)).toBeDisabled()
  await provider.getByLabel('Email').fill('perez@clinic.com')
  await provider.getByPlaceholder('Enter password').fill('secret')
  await provider.getByRole('button', /^Sign$/).tap()
  await expect(screen.getByText(/Provider signed/)).toBeVisible()
  await expect(screen.getByText('Signed').first()).toBeVisible()
})

/* El historial (el reloj) es una sola línea de tiempo: el consentimiento del caso y los de cada procedimiento. */
test('el historial del caso lista los consentimientos de cada procedimiento', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode?case=c5')
  await screen.getByRole('button', 'Consent history').tap()
  const historial = screen.getByRole('dialog', 'Consent history')
  await expect(historial.getByText(/Case consent v3/).first()).toBeVisible()
  await historial.getByRole('button', /Procedure Consent - D2950/).first().tap()
  await expect(screen.getByRole('heading', /Procedure Consent - D2950/)).toBeVisible()
})

/* El menú ⋮ en un caso: Delete pregunta el alcance; Delete from Tx lo pasa a Unassigned. */
test('Delete en un caso: Delete from Tx lo deja en Unassigned', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode?case=c1')
  await screen.getByRole('button', /Actions for D4341/).tap()
  await screen.getByRole('menuitem', /Delete/).tap()
  const dialogo = screen.getByRole('dialog', 'Delete procedure')
  await dialogo.getByRole('button', 'Delete from Tx').tap()
  await expect(screen.getByText(/D4341 removed from the case and moved to Unassigned\./)).toBeVisible()
  await screen.getByRole('button', 'Unassigned Items').tap()
  await expect(screen.getByText(/^D4341 Periodontal scaling/)).toBeVisible()
})

/* Cada fila se despliega con el detalle de la Problem List: en un caso, con el estado de su consentimiento. */
test('las filas del caso y las sueltas se despliegan con su detalle', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', /^Exams/).tap()
  await screen.getByRole('menuitem', 'Treatment Plan').tap()
  await screen.getByText(/^D0120 Periodic oral evaluation$/).first().tap()
  await expect(screen.getByText('No treatment linked.')).toBeVisible()
  await expect(screen.getByRole('button', 'Collapse all')).toBeVisible()

  const planes = screen.getByRole('navigation', 'Treatment plans')
  await planes.getByRole('button', /^26\/08\/2026, Waiting for consent/).tap()
  await planes.getByRole('button', /Restorative Plan, Waiting for consent/).tap()
  await screen.getByText(/^D2391 Resin-based composite/).tap()
  await expect(screen.getByText('Procedure consent')).toBeVisible()
  await expect(screen.getByRole('button', /^Procedure Consent - D2391/)).toBeVisible()
  // El hallazgo vinculado se abre en el drawer, sin salir de Treatment Plan.
  await screen.getByRole('button', /^Chronic enamel dental caries · Tooth 3/).tap()
  await expect(screen.getByRole('dialog', /Chronic enamel dental caries/)).toBeVisible()
})

/* Estimate details (CON-3710, CON-2529): el Total Amount abre el desglose; si el plan cambió, se actualiza desde ahí o
   desde el aviso del caso. */
test('el Total amount de la card abre Estimate details y se actualiza', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', /Total amount .* View estimate details/).first().tap()
  await expect(screen.getByRole('heading', 'Estimate details')).toBeVisible()
  await expect(screen.getByText('Update needed').first()).toBeVisible()
  await screen.getByRole('button', /Update estimates/).tap()
  await expect(screen.getByRole('button', /Recalculate/)).toBeVisible()
  await screen.getByRole('button', 'Back to Case').tap()
  await expect(screen.getByRole('button', /Ins\. est\. update available/)).toHaveCount(0)
})

test('el aviso del caso pide confirmar y desde Presented la estimación queda bloqueada', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', /^Exams/).tap()
  await screen.getByRole('menuitem', 'Treatment Plan').tap()
  const planes = screen.getByRole('navigation', 'Treatment plans')
  await planes.getByRole('button', /Periodontists Recommended, Planning/).tap()

  await screen.getByRole('button', /Ins\. est\. update available/).tap()
  await expect(screen.getByText('Insurance Estimate Update Available')).toBeVisible()
  await screen.getByRole('button', 'Update').tap()
  await screen.getByRole('button', /Total Amount .* View estimate details/).last().tap()
  await expect(screen.getByRole('button', /Recalculate/)).toBeVisible()

  await screen.getByRole('button', 'Back to Case').tap()
  await planes.getByRole('button', /^24\/08\/2026, Presented/).tap()
  await planes.getByRole('button', /Crown Option, Presented/).tap()
  await screen.getByRole('button', /Total Amount .* View estimate details/).last().tap()
  await expect(screen.getByText('Locked at presentation')).toBeVisible()
  await expect(screen.getByRole('button', /Update estimates|Recalculate/)).toHaveCount(0)
})

test('Prototype controls: el cálculo que falla deja el anterior y el escenario bloqueado no se edita', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', /Total amount .* View estimate details/).first().tap()
  await screen.getByRole('checkbox', 'Fail next calculation').tap()
  await screen.getByRole('button', /Update estimates/).tap()
  await expect(screen.getByText('Estimates couldn’t be updated')).toBeVisible()
  await screen.getByRole('button', /Retry update/).tap()
  await expect(screen.getByRole('button', /Recalculate/)).toBeVisible()

  await screen.getByRole('button', /Simulate plan change/).tap()
  await expect(screen.getByRole('button', /Update estimates/)).toBeVisible()
  await screen.getByRole('button', /Estimate scenario/).tap()
  await screen.getByRole('button', 'Presented / Locked').tap()
  await expect(screen.getByText('Locked at presentation')).toBeVisible()
  await expect(screen.getByRole('button', /Update estimates|Recalculate/)).toHaveCount(0)
})

/* Prototipo de CON-4052: un suelto también pasa por su consentimiento; si el envío falla, el procedimiento no cambia. */
test('Unassigned: Complete pide el consentimiento del procedimiento suelto', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode')
  await screen.getByRole('button', /^Exams/).tap()
  await screen.getByRole('menuitem', 'Treatment Plan').tap()
  await screen.getByRole('button', /Actions for D2330/).tap()
  await screen.getByRole('menuitem', /Complete/).tap()
  const dialogo = screen.getByRole('dialog', 'Consent required')
  await expect(dialogo.getByText(/This procedure requires a consent document/)).toBeVisible()
  await expect(dialogo.getByText(/Case:/)).toHaveCount(0)
  await dialogo.getByRole('button', 'Send consent and sign later').tap()
  await expect(screen.getByText(/Procedure completed\. Consent sent to the patient\./)).toBeVisible()
})

test('si el consentimiento no se puede mandar, el procedimiento no cambia', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode?case=c9')
  await screen.getByRole('button', /Actions for D1110/).tap()
  await screen.getByRole('menuitem', /Start/).tap()
  const dialogo = screen.getByRole('dialog', 'Consent required')
  await dialogo.getByRole('button', 'Send consent and sign later').tap()
  await expect(dialogo.getByText(/The consent could not be sent\. The procedure has not changed\./)).toBeVisible()
  await dialogo.getByRole('button', 'Cancel').tap()
  await expect(screen.getByRole('button', /Open consent for D1110: Not sent/)).toBeVisible()
})

/* Una sola card de Informed Consent por caso: al cambiar de caso no se apila otra debajo (antes la key repetida del bloque
   y de la vista del caso las duplicaba). */
test('al cambiar de caso queda una sola card de Informed Consent', async ({ app, screen }) => {
  await app.open('/patients/patient-0001/clinical-mode?case=c5')
  await screen.getByRole('button', /17\/04\/2026/).tap()
  await screen.getByRole('button', /Implant Option/).tap()
  await screen.getByRole('button', /Bridge Option/).tap()
  await expect(screen.getByText('Informed Consent for Dental Treatment – Prueba 1')).toBeVisible()
})
