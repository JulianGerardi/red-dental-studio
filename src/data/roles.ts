/* Settings → Roles: el catálogo de permisos por categoría y los roles de ejemplo. Nombres, descripciones y categorías
   salen de red.dev (video de Julián, 2026-11-25); lo que el video no llegó a mostrar sale de las historias de
   Configuración de permisos (CON-3506). Ver design-reference/figma/modulos/roles.md. */

export type Permiso = { id: string; nombre: string; detalle: string }
export type CategoriaPermisos = { nombre: string; permisos: Permiso[] }

const p = (nombre: string, detalle: string): Permiso => ({
  id: nombre.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  nombre,
  detalle,
})

export const CATEGORIAS_PERMISOS: CategoriaPermisos[] = [
  { nombre: 'Account', permisos: [
    p('Update Account', 'Allows the user to update account details.'),
    p('Read Account', 'Allows the user to read account details.'),
  ] },
  { nombre: 'Appointment', permisos: [
    p('Book Appointment', 'Allows the user to book appointments.'),
    p('Cancel Appointment', 'Allows the user to cancel appointments.'),
    p('Create Appointment', 'Allows the user to create appointments.'),
    p('List Appointment', 'Allows the user to list appointments and view summarized scheduling information.'),
    p('Read Appointment', 'Allows the user to read appointments details.'),
    p('Update Appointment', 'Allows the user to update appointment details and statuses.'),
  ] },
  { nombre: 'Insurance & Coverage', permisos: [
    p('Create Patient Insurance & Subscriptions', 'Allows the user to create patient insurance and subscriptions.'),
    p('Delete Patient Insurance & Subscriptions', 'Allows the user to delete patient insurance and subscriptions.'),
    p('List Patient Insurance & Subscriptions', 'Allows the user to list patient insurance and subscriptions using summarized information.'),
    p('Read Patient Insurance & Subscriptions', 'Allows the user to read patient insurance and subscription details.'),
    p('Update Patient Insurance & Subscriptions', 'Allows the user to update patient insurance and subscriptions.'),
    p('Read Patient Deductible & Benefits', "Allows the user to view a patient's deductible and benefit usage details."),
    p('Update Patient Deductible & Benefits', "Allows the user to update a patient's deductible and benefit usage details."),
    p('Create Carrier & Insurance Plan', 'Allows the user to create carriers and insurance plans.'),
    p('Delete Carrier & Insurance Plan', 'Allows the user to delete carriers and insurance plans.'),
    p('List Carrier & Insurance Plan', 'Allows the user to list carriers and insurance plans using summarized information.'),
    p('Read Carrier & Insurance Plan', 'Allows the user to read carrier and insurance plan details.'),
    p('Update Carrier & Insurance Plan', 'Allows the user to update carriers and insurance plans.'),
  ] },
  { nombre: 'Encounter', permisos: [
    p('Read Clinic Note', 'Allows the user to read clinical notes.'),
    p('List Encounter', 'Allows the user to list encounters and view summarized encounter information.'),
    p('Manage Encounter', 'Allows the user to be assigned to and manage encounters.'),
    p('Read Encounter', 'Allows the user to read encounter.'),
  ] },
  { nombre: 'Document', permisos: [
    p('Discard Consent', 'Allows the user to discard consents.'),
    p('Expire Consent', 'Allows the user to expire consents.'),
    p('List Consent', 'Allows the user to list consents and view summarized consent information.'),
    p('Read Consent', 'Allows the user to read consents.'),
    p('Regenerate Consent', 'Allows the user to generate a new version of a consent.'),
    p('Sign Consent', 'Allows the user to sign consents, including consents they are not directly associated with.'),
    p('Export documents', 'Allows the user to export documents.'),
    p('List Documents', 'Allows the user to list documents using summarized information.'),
    p('Create Template', 'Allows the user to create templates in the clinic.'),
    p('Delete Template', 'Allows the user to delete clinic templates.'),
    p('Update Template', 'Allows the user to edit existing clinic templates.'),
  ] },
  { nombre: 'Contact', permisos: [
    p('Create Contact', 'Allows the user to create contacts, including providers, laboratories, pharmacies, and other external healthcare-related contacts.'),
    p('Read Contact', 'Allows the user to read contact details for providers, laboratories, pharmacies, and other external healthcare-related entities.'),
    p('Update Contact', 'Allows the user to update contact details for providers, laboratories, pharmacies, and other external healthcare-related entities.'),
  ] },
  { nombre: 'Employee', permisos: [
    p('Reactivate Employee', 'Allows the user to reactivate employees.'),
    p('Create Employee', 'Allows the user to create employees.'),
    p('Delete Employee', 'Allows the user to delete employees.'),
    p('List Employee', 'Allows the user to list employees using summarized employee information.'),
    p('Read Employee', 'Allows the user to read employee details.'),
    p('Suspend Employee', 'Allows the user to suspend employees.'),
    p('Terminate Employee', 'Allows the user to terminate employees.'),
    p('Update Employee', 'Allows the user to update employee details.'),
  ] },
  { nombre: 'People & Organizations', permisos: [
    p('Create Entities', 'Allows the user to create entities, including subscribers, guardians, guarantors, and other parties associated with a patient.'),
    p('Delete Entities', 'Allows the user to delete entities, including subscribers, guardians, guarantors, and other parties associated with a patient.'),
    p('Read Entities', 'Allows the user to view entity details for subscribers, guardians, guarantors, and other parties associated with a patient.'),
    p('Update Entities', 'Allows the user to update entities, including subscribers, guardians, guarantors, and other parties associated with a patient.'),
  ] },
  /* El encabezado de esta categoría no se ve en el video: "Billing" junta Fee Schedule, Ledger y Export Billing. */
  { nombre: 'Billing', permisos: [
    p('Activate Fee Schedule', 'Allows the user to activate fee schedules.'),
    p('Archived Fee Schedule', 'Allows the user to archived fee schedules.'),
    p('Create Fee Schedule', 'Allows the user to create fee schedules.'),
    p('Deactivate Fee Schedule', 'Allows the user to deactivate fee schedules.'),
    p('List Fee Schedule', 'Allows the user to list fee schedules and summarized fee information.'),
    p('Read Fee Schedule', 'Allows the user to read fee schedule details and fees.'),
    p('Update Fee Schedule', 'Allows the user to update fee schedule details and fees.'),
    p('Read Ledger', 'Allows the user to read ledger summary and balances.'),
    p('Activate Ledger Adjustment Type', 'Allows the user to activate ledger adjustment type.'),
    p('Deactviate Ledger Adjustment Type', 'Allows the user to deactivate ledger adjustment type.'),
    p('List Ledger Adjustment Types', 'Allows the user to list ledger adjustment types.'),
    p('Activate Ledger Payment Method', 'Allows the user to activate ledger payment method.'),
    p('Deactviate Ledger Payment Method', 'Allows the user to deactivate ledger payment method.'),
    p('List Ledger Payment Methods', 'Allows the user to list ledger payment methods.'),
    p('Create Ledger Transactions', 'Allows the user to create ledger transaction records and transaction details.'),
    p('List Ledger Transactions', 'Allows the user to list ledger transactions and summarized transaction information.'),
    p('Read Ledger Transactions', 'Allows the user to read ledger transaction records and transaction details.'),
    p('Update Ledger Transactions', 'Allows the user to update ledger transaction records and transaction details.'),
    p('Export Billing', 'Allows the user to export the Billing tables and metrics to a CSV file.'),
  ] },
  { nombre: 'Exam', permisos: [
    p('Create Finding', 'Allows the user to create findings during patient exams.'),
    p('Delete Finding', 'Allows the user to delete findings.'),
    p('List Finding', 'Allows the user to list findings using summarized information.'),
    p('Read Finding', 'Allows the user to read finding details.'),
    p('Update Finding', 'Allows the user to update finding details and statuses.'),
    p('Create Periodontal Exam', 'Allows the user to create periodontal exams and record periodontal measurements.'),
    p('List Patient Exam', 'Allows the user to list patient exams using summarized information.'),
    p('Manage Radiographic Exam', 'Allows the user to create and manage radiographic exams, including their images.'),
    p('Read Exams', 'Allows the user to view patient exams, including their measurements, images, and reviews.'),
    p('Create Patient Exam Review', 'Allows the user to create patients exam review.'),
    p('Create Patient Vital', 'Allows the user to create patient vital exams.'),
    p('List Patient Vital', 'Allows the user to list patient vital sessions and their measurements.'),
  ] },
  { nombre: 'Clinical Order', permisos: [
    p('Cancel Lab Order', 'Allows the user to cancel lab orders.'),
    p('Create Lab Order', 'Allows the user to create lab orders.'),
    p('Delay Lab Order', 'Allows the user to delay lab ordesrs.'),
    p('Delete Lab Order', 'Allows the user to delete lab orders.'),
    p('Deliver Lab Order', 'Allows the user to deliver lab orders.'),
    p('List Lab Order', 'Allows the user to list lab orders and view summarized order information.'),
    p('Read Lab Order', 'Allows the user to read lab order details.'),
    p('Reject Lab Order', 'Allows the user to reject lab orders.'),
    p('Request Lab Order', 'Allows the user to request lab orders.'),
    p('Create Prescription', 'Allows the user to create prescriptions.'),
    p('Delete Prescription', 'Allows the user to delete prescriptions.'),
    p('List Prescription', 'Allows the user to list prescriptions using summarized information.'),
    p('Read Prescription', 'Allows the user to read prescription details.'),
    p('Update Prescription', 'Allows the user to update prescriptions.'),
    p('Create Referral', 'Allows the user to create referral.'),
    p('Delete Referral', 'Allows the user to delete referral.'),
    p('List Referral', 'Allows the user to list referrals using summarized information.'),
    p('Read Referral', 'Allows the user to read referral details.'),
    p('Reject Referral', 'Allows the user to reject referral.'),
    p('Request Referral', 'Allows the user to request referral.'),
    p('Update Referral', 'Allows the user to update referral.'),
  ] },
  { nombre: 'Location', permisos: [
    p('Create Location', 'Allows the user to create locations.'),
    p('Edit Insurance Defaults', 'Allows the user to edit the billing provider, rendering provider, contract reference, place of service, and authorization defaults of a location.'),
    p('List Location', 'Allows the user to list locations and view summarized location information.'),
    p('Read Location', 'Allows the user to read location details.'),
    p('Update Location', 'Allows the user to update location details.'),
  ] },
  /* Tampoco se ve el encabezado: Patient junta pacientes y relaciones (CON-3467, CON-3527). */
  { nombre: 'Patient', permisos: [
    p('Create Patient', 'Allows the user to create patients.'),
    p('List Patient', 'Allows the user to list and search patients using summarized patient information.'),
    p('Read Patient', 'Allows the user to read patient details.'),
    p('Update Patient', 'Allows the user to update patient details.'),
    p('Create Patient Relationship', 'Allows the user to create patient relationships, including guarantors and guardians.'),
    p('Delete Patient Relationship', 'Allows the user to delete patient relationships, including guarantors and guardians.'),
    p('List Patient Relationship', 'Allows the user to list patient relationships, including guardians and guarantors.'),
    p('Read Patient Relationship', 'Allows the user to view patient relationship details, including guarantors and guardians.'),
    p('Update Patient Relationship', 'Allows the user to update patient relationships, including guarantors and guardians.'),
  ] },
  { nombre: 'Medical History', permisos: [
    p('Create Patient Condition', 'Allows the user to create patient medical conditions, allergies, and past surgeries.'),
    p('Delete Patient Condition', 'Allows the user to delete patient medical conditions, allergies, and past surgeries.'),
    p('List Patient Condition', 'Allows the user to list patient conditions, allergies, and past surgeries using summarized information.'),
    p('Read Patient Condition', 'Allows the user to view patient medical conditions, allergies, and past surgery details.'),
    p('Update Patient Condition', 'Allows the user to update patient medical conditions, allergies, and past surgery details.'),
    p('Create Patient Medication', 'Allows the user to create patient medications.'),
    p('Delete Patient Medication', 'Allows the user to delete patient medications.'),
    p('List Patient Medication', 'Allows the user to list patient medications using summarized information.'),
    p('Read Patient Medication', 'Allows the user to read patient medication details.'),
    p('Update Patient Medication', 'Allows the user to update patient medication details.'),
  ] },
  { nombre: 'Patient Procedure', permisos: [
    p('Create Patient Procedure', 'Allows the user to create patient procedures.'),
    p('Delete Patient Procedure', 'Allows the user to delete patient procedure.'),
    p('List Patient Procedure', 'Allows the user to list patient procedures using summarized information.'),
    p('Read Patient Procedure', 'Allows the user to read patient procedure details.'),
    p('Update Patient Procedure', 'Allows the user to update patient procedure details and statuses.'),
  ] },
  { nombre: 'Role', permisos: [
    p('Activate Role', 'Allows the user to activate role.'),
    p('Create Role', 'Allows the user to create user roles.'),
    p('Deactivate Role', 'Allows the user to deactivate role.'),
    p('Delete Role', 'Allows the user to delete role.'),
    p('Read Role', 'Allows the user to read user roles and details.'),
    p('Update Role', 'Allows the user to update role.'),
  ] },
  { nombre: 'Treatment Plan', permisos: [
    p('Delete Treatment', 'Allows the user to delete treatment plans and their associated treatment cases.'),
    p('List Treatment Plan', 'Allows the user to list treatment plans and treatment cases using summarized information.'),
    p('Read Treatment', 'Allows the user to view treatment plan and treatment case details.'),
    p('Update Treatment', 'Allows the user to update treatment plan and treatment case details and statuses.'),
    p('Accept Treatment Case', 'Allows the user to accept treatment cases.'),
    p('Create Treatment', 'Allows the user to create treatment plans and treatment cases.'),
    p('Discard Treatment Case', 'Allows the user to discard treatment cases.'),
  ] },
  { nombre: 'Workflow', permisos: [
    p('List Workflow Submission', 'Allows the user to list workflow submissions using summarized information.'),
    p('Manage Workflow Submission', 'Allows the user to manage workflow submission.'),
  ] },
]

export const TODOS_LOS_PERMISOS = CATEGORIAS_PERMISOS.flatMap((c) => c.permisos.map((x) => x.id))

const deCategoria = (nombre: string) => CATEGORIAS_PERMISOS.find((c) => c.nombre === nombre)?.permisos.map((x) => x.id) ?? []
/* Los "List …" de todas las categorías: el piso de lectura que red.dev muestra tildado en casi todos los roles. */
const LISTAS = TODOS_LOS_PERMISOS.filter((id) => id.startsWith('list-'))

export type Rol = {
  id: string
  nombre: string
  descripcion: string
  activo: boolean
  /** Rol del sistema (`system = true`): no se edita, no se desactiva ni se borra; sólo se consulta y se duplica. */
  sistema: boolean
  actualizado: string
  permisos: string[]
  /** Empleados activos con este rol: con alguno, no se puede desactivar ni borrar (CON-3181, CON-3132). */
  usuarios: number
}

const rol = (id: string, nombre: string, descripcion: string, activo: boolean, actualizado: string, permisos: string[], usuarios = 0, sistema = false): Rol =>
  ({ id, nombre, descripcion, activo, sistema, actualizado, permisos: [...new Set(permisos)], usuarios })

/* Los de red.dev, en su orden y con sus textos (también los de prueba: es contenido, no diseño). */
export const ROLES_INICIALES: Rol[] = [
  rol('insurance-permisions', 'Insurance permisions', 'permisions for insurance', true, '08/31/2026', [...LISTAS, ...deCategoria('Insurance & Coverage')], 2),
  rol('sadsad', 'sadsad', 'asdasdsadasd', false, '08/27/2026', ['list-appointment']),
  rol('patient-role', 'patient role', 'test', true, '08/24/2026', ['list-patient', 'read-patient']),
  rol('patient-all-permitions', 'Patient All permitions', 'creating patients', true, '08/20/2026', deCategoria('Patient'), 1),
  rol('provider-test', 'Provider test', 'test', true, '08/07/2026', [...LISTAS, ...deCategoria('Exam')], 3),
  rol('provioder-test', 'provioder-test', 'provider test description', true, '08/07/2026', LISTAS),
  rol('director-general', 'Director General', 'Director general', false, '08/04/2026', LISTAS),
  rol('test', 'Test', 'Test descriptio', false, '08/04/2026', ['list-appointment', 'read-appointment']),
  rol('administrador-de-seguros', 'Administrador de Seguros', 'Administrador de Seguros', true, '07/29/2026', [...deCategoria('Insurance & Coverage'), ...deCategoria('Billing')], 1),
  rol('test-001', 'test 001', 'Es el ayudante del dentista principal', true, '07/29/2026', LISTAS),
  rol('auxiliar-dental-i', 'Auxiliar Dental I', 'Es el ayudante del dentista principal', false, '07/24/2026', LISTAS),
  rol('patient-services-coordinator', 'Patient Services Coordinator', 'Manages appointments and insurance verification.', true, '05/29/2025', [...deCategoria('Appointment'), ...deCategoria('Insurance & Coverage')], 2),
  rol('patient', 'Patient', 'Provides a self-Accesses the patient portal to view appointments, treatment plans, documents, messages, and self-service actions.', true, '05/29/2025', ['read-appointment', 'list-appointment', 'list-documents', 'sign-consent', 'read-treatment'], 0, true),
  rol('clinical-manager', 'Clinical Manager', 'Oversees clinical operations, coordinates providers and clinical staff, and ensures care delivery, quality, and workflow efficiency.', true, '05/29/2025', [...LISTAS, ...deCategoria('Exam'), ...deCategoria('Treatment Plan'), ...deCategoria('Encounter')], 2, true),
  rol('receptionist', 'Receptionist', 'Handles patient check-in, appointment scheduling, front-desk communication, calls, and daily reception workflow.', true, '05/29/2025', [...LISTAS, ...deCategoria('Appointment'), ...deCategoria('Patient')], 4, true),
  rol('dentist', 'Dentist', 'Provides clinical dental care, evaluates patients, performs procedures, and participates in diagnosis and treatment planning.', true, '05/29/2025', [...LISTAS, ...deCategoria('Exam'), ...deCategoria('Patient Procedure'), ...deCategoria('Treatment Plan'), ...deCategoria('Encounter')], 6, true),
  rol('practice-administrator', 'Practice Administrator', 'Oversees daily practice operations, manages scheduling, billing, insurance, patient records, staff coordination, and administrative workflows.', true, '05/29/2025', TODOS_LOS_PERMISOS.filter((id) => !deCategoria('Role').includes(id)), 1, true),
  rol('administrator', 'Administrator', 'Has unlimited access to all management features.', true, '05/29/2025', TODOS_LOS_PERMISOS, 1, true),
  rol('guardian', 'Guardian', "Represents the parent, legal guardian, or responsible adult who can manage a minor patient's access, consent, and related account responsibilities.", true, '05/29/2025', ['read-appointment', 'list-appointment', 'sign-consent', 'list-documents'], 0, true),
]
