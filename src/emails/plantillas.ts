/* Los mails de la app. El texto sale del Figma 📧 Email (138:4), donde Julián los reescribió el 2026-11-25 sobre el
   documento "Email Propuesta". `origen` dice de dónde sale: 'figma' tal cual el Figma, 'propuesta' lo completamos
   nosotros porque el Figma quedó a medio cambiar, y espera el ok. Detalle y anomalías en
   design-reference/figma/modulos/emails.md. */
import { armarMail, enlace, variablesDe, type Bloque, type Remitente } from './marco.ts'

export type Categoria =
  | 'Onboarding' | 'Scheduling' | 'Treatment plan' | 'Consent/Document' | 'Patient' | 'Employee' | 'Subscription' | 'Guardian'

export type Origen = 'figma' | 'propuesta'

export interface Mail {
  id: string
  categoria: Categoria
  /** Nombre corto para la lista. */
  nombre: string
  /** Acción que dispara el envío, como la escribe el documento. */
  disparador: string
  destinatario: string
  asunto: string
  preheader: string
  remitente: Remitente
  origen: Origen
  /** Qué partes se completaron porque el Figma no las trae. */
  completado?: string[]
  jira: string[]
  bloques: Bloque[]
}

/* Piezas que se repiten igual en varios mails: si cambian, cambian en todos. */
const hola = (v: string): Bloque => ({ tipo: 'parrafo', texto: `Hello {{${v}}},` })
const DUDAS_CLINICA: Bloque = { tipo: 'nota', texto: `Questions? Contact {{practice_name}} at ${enlace('mailto:{{practice_email}}', '{{practice_email}}')}.` }
const DUDAS_PLATAFORMA: Bloque = { tipo: 'nota', texto: `Questions? Contact ${enlace('mailto:{{support_email}}', '{{support_email}}')}.` }
const FIRMA_CLINICA: Bloque = { tipo: 'firma', despedida: 'Best regards,', equipo: 'The {{practice_name}} team' }
const FIRMA_PLATAFORMA: Bloque = { tipo: 'firma', despedida: 'Best regards,', equipo: 'The Confidentally team' }
const TURNO: Bloque = {
  tipo: 'detalles',
  titulo: 'Appointment details',
  filas: [
    ['Date', '{{appointment_date}}'],
    ['Time', '{{appointment_time}}'],
    ['Provider', '{{provider_name}}'],
    ['Location', '{{location_name}}<br>{{location_address}}'],
  ],
}
/* Acceso con contraseña temporal, como lo volvió a pedir el Figma (emails.md, 2026-11-25). */
const ACCESO: Bloque[] = [
  { tipo: 'detalles', titulo: 'Your sign-in details', filas: [['Username', '{{username}}'], ['Temporary password', '{{temporary_password}}']] },
  { tipo: 'parrafo', texto: 'To sign in, use the temporary password above.' },
  { tipo: 'boton', texto: 'Sign in', enlace: '{{login_link}}' },
]
const SOLO_LECTURA: Bloque = {
  tipo: 'aviso',
  tono: 'warning',
  titulo: 'Your account is in read-only mode',
  texto: 'Your team can still view and export information, but cannot create, edit or delete records until full access is restored.',
}
const ANTERIOR: Bloque = { tipo: 'parrafo', texto: 'Your previous appointment on <strong>{{previous_appointment_date}}</strong> has been rescheduled.' }

export const MAILS: Mail[] = [
  {
    id: 'clinic-account-ready',
    categoria: 'Onboarding',
    nombre: 'Clinic account ready',
    disparador: 'Creación de una nueva cuenta',
    destinatario: 'Account owner',
    asunto: 'Your clinic account is ready',
    preheader: 'Complete the setup steps to activate your clinic account.',
    remitente: 'plataforma',
    origen: 'figma',
    jira: ['CON-3325', 'CON-3451'],
    bloques: [
      { tipo: 'titulo', texto: 'Account ready for setup' },
      hola('account_owner_name'),
      { tipo: 'parrafo', texto: 'Your Confidentally account for {{practice_name}} has been created.<br>To activate it, complete the setup.' },
      { tipo: 'boton', texto: 'Set up your clinic', enlace: '{{setup_link}}' },
      DUDAS_PLATAFORMA,
      FIRMA_PLATAFORMA,
    ],
  },
  {
    id: 'appointment-request',
    categoria: 'Scheduling',
    nombre: 'Appointment request',
    disparador: 'Appointment propuesto por secretaria',
    destinatario: 'Patient',
    asunto: 'Please review your appointment request',
    preheader: 'Confirm your visit within 24 hours to keep the time slot.',
    remitente: 'clinica',
    origen: 'figma',
    jira: [],
    bloques: [
      { tipo: 'titulo', texto: 'Appointment awaiting confirmation' },
      hola('patient_name'),
      { tipo: 'parrafo', texto: 'Your appointment at {{practice_name}} has been proposed.' },
      TURNO,
      { tipo: 'parrafo', texto: 'To keep the time, confirm it within 24 hours. After that, the request expires and the time slot may no longer be available.' },
      { tipo: 'boton', texto: 'Confirm appointment', enlace: '{{portal_link}}' },
      DUDAS_CLINICA,
      FIRMA_CLINICA,
    ],
  },
  {
    id: 'appointment-booked',
    categoria: 'Scheduling',
    nombre: 'Appointment booked',
    disparador: 'Appointment booked por secretaria',
    destinatario: 'Patient',
    asunto: 'Your appointment has been scheduled',
    preheader: 'Your office has scheduled an appointment for you.',
    remitente: 'clinica',
    origen: 'figma',
    jira: [],
    bloques: [
      { tipo: 'titulo', texto: 'Appointment scheduled' },
      hola('patient_name'),
      { tipo: 'parrafo', texto: 'Your appointment at {{practice_name}} has been scheduled.' },
      TURNO,
      DUDAS_CLINICA,
      FIRMA_CLINICA,
    ],
  },
  {
    id: 'appointment-confirmed',
    categoria: 'Scheduling',
    nombre: 'Appointment confirmed',
    disparador: 'Aceptación de propuesta desde el portal por el paciente',
    destinatario: 'Patient',
    asunto: 'Your appointment is confirmed',
    preheader: 'Your appointment has been successfully confirmed.',
    remitente: 'clinica',
    origen: 'figma',
    jira: [],
    bloques: [
      { tipo: 'titulo', texto: 'Appointment confirmed' },
      hola('patient_name'),
      { tipo: 'parrafo', texto: 'Your appointment at {{practice_name}} has been confirmed.' },
      TURNO,
      DUDAS_CLINICA,
      FIRMA_CLINICA,
    ],
  },
  {
    id: 'appointment-rescheduled',
    categoria: 'Scheduling',
    nombre: 'Rescheduled (booked)',
    disparador: 'Reprogramación de appointment por secretaria (booked)',
    destinatario: 'Patient',
    asunto: 'Your appointment has been rescheduled',
    preheader: 'Your appointment has a new date and time.',
    remitente: 'clinica',
    origen: 'propuesta',
    completado: ['Title and first line (the Figma says "Appointment scheduled" and "has been canceled")'],
    jira: ['CON-478'],
    bloques: [
      { tipo: 'titulo', texto: 'Appointment rescheduled' },
      hola('patient_name'),
      { tipo: 'parrafo', texto: 'Your appointment at {{practice_name}} has been rescheduled.' },
      ANTERIOR,
      TURNO,
      DUDAS_CLINICA,
      FIRMA_CLINICA,
    ],
  },
  {
    id: 'appointment-rescheduled-request',
    categoria: 'Scheduling',
    nombre: 'Rescheduled (proposed)',
    disparador: 'Reprogramación de appointment por secretaria (proposed)',
    destinatario: 'Patient',
    asunto: 'Please confirm your rescheduled appointment',
    preheader: 'Confirm the new date within 24 hours to keep the time slot.',
    remitente: 'clinica',
    origen: 'figma',
    jira: ['CON-478'],
    bloques: [
      { tipo: 'titulo', texto: 'Appointment awaiting confirmation' },
      hola('patient_name'),
      { tipo: 'parrafo', texto: 'Your appointment at {{practice_name}} has been proposed.' },
      ANTERIOR,
      TURNO,
      { tipo: 'parrafo', texto: 'To keep the new time, confirm it within 24 hours. After that, the request expires and the time slot may no longer be available.' },
      { tipo: 'boton', texto: 'Confirm appointment', enlace: '{{portal_link}}' },
      DUDAS_CLINICA,
      FIRMA_CLINICA,
    ],
  },
  {
    id: 'appointment-cancelled',
    categoria: 'Scheduling',
    nombre: 'Appointment canceled',
    disparador: 'Cancelación de appointment desde el portal por el paciente o por secretaria',
    destinatario: 'Patient',
    asunto: 'Your appointment has been canceled',
    preheader: 'This appointment is no longer on your schedule.',
    remitente: 'clinica',
    origen: 'figma',
    jira: [],
    bloques: [
      { tipo: 'titulo', texto: 'Appointment canceled' },
      hola('patient_name'),
      { tipo: 'parrafo', texto: 'Your appointment at {{practice_name}} has been canceled.' },
      TURNO,
      DUDAS_CLINICA,
      FIRMA_CLINICA,
    ],
  },
  {
    id: 'treatment-plan-ready',
    categoria: 'Treatment plan',
    nombre: 'Treatment plan ready',
    disparador: 'Treatment plan ready',
    destinatario: 'Patient',
    asunto: 'Your treatment plan is ready to review',
    preheader: 'Review your treatment plan in the patient portal.',
    remitente: 'clinica',
    origen: 'propuesta',
    completado: ['Last line and button (the Figma repeats the sign-in ones)'],
    jira: ['CON-3189'],
    bloques: [
      { tipo: 'titulo', texto: 'Treatment plan ready' },
      hola('patient_name'),
      { tipo: 'parrafo', texto: 'Your treatment plan at {{practice_name}} has been prepared.' },
      { tipo: 'parrafo', texto: 'To review it, open the treatment plan.' },
      { tipo: 'boton', texto: 'Review treatment plan', enlace: '{{portal_link}}' },
      DUDAS_CLINICA,
      FIRMA_CLINICA,
    ],
  },
  {
    id: 'document-signature',
    categoria: 'Consent/Document',
    nombre: 'Document to sign',
    disparador: 'Envío de documentos que requieren firma al paciente/provider',
    destinatario: 'Patient or provider',
    asunto: 'Review and sign your document',
    preheader: 'Please review and sign your document in the patient portal.',
    remitente: 'clinica',
    origen: 'figma',
    jira: ['CON-2908', 'CON-2909'],
    bloques: [
      { tipo: 'titulo', texto: 'Consent form ready to sign' },
      hola('patient_name'),
      { tipo: 'parrafo', texto: 'Your consent form from {{practice_name}} has been prepared.' },
      { tipo: 'parrafo', texto: 'To sign it, open the consent.' },
      { tipo: 'boton', texto: 'Sign consent', enlace: '{{document_link}}' },
      DUDAS_CLINICA,
      FIRMA_CLINICA,
    ],
  },
  {
    id: 'patient-welcome',
    categoria: 'Patient',
    nombre: 'Patient portal ready',
    disparador: 'Creación de un nuevo paciente',
    destinatario: 'Patient',
    asunto: 'Your patient portal account is ready',
    preheader: 'Your patient portal account is now ready.',
    remitente: 'clinica',
    origen: 'figma',
    jira: ['CON-2895'],
    bloques: [
      { tipo: 'titulo', texto: 'Patient account created' },
      hola('patient_name'),
      { tipo: 'parrafo', texto: 'Your patient account at {{practice_name}} has been created.' },
      { tipo: 'parrafo', texto: 'With your account, you can view your appointments, review your treatment information, and manage your account details.' },
      ...ACCESO,
      DUDAS_CLINICA,
      FIRMA_CLINICA,
    ],
  },
  {
    id: 'employee-welcome',
    categoria: 'Employee',
    nombre: 'Employee account ready',
    disparador: 'Creación de un nuevo empleado',
    destinatario: 'Employee',
    asunto: 'Your account is ready',
    preheader: 'Your employee account is now ready.',
    remitente: 'clinica',
    origen: 'propuesta',
    completado: ['Title and body (the Figma still shows the patient ones)'],
    jira: ['CON-4061'],
    bloques: [
      { tipo: 'titulo', texto: 'Employee account created' },
      hola('employee_name'),
      { tipo: 'parrafo', texto: 'Your employee account at {{practice_name}} has been created.' },
      { tipo: 'parrafo', texto: 'With your account, you can access {{practice_name}} on Confidentally.' },
      ...ACCESO,
      DUDAS_CLINICA,
      FIRMA_CLINICA,
    ],
  },
  {
    id: 'subscription-suspended',
    categoria: 'Subscription',
    nombre: 'Subscription suspended',
    disparador: 'Se suspende la suscripción de la cuenta',
    destinatario: 'Account owner',
    asunto: 'Your clinic account is in read-only mode',
    preheader: 'Your subscription has been suspended.',
    remitente: 'plataforma',
    origen: 'figma',
    jira: ['CON-3268'],
    bloques: [
      { tipo: 'titulo', texto: 'Subscription suspended' },
      hola('account_owner_name'),
      { tipo: 'parrafo', texto: 'Your Confidentally subscription for {{practice_name}} has been suspended.' },
      SOLO_LECTURA,
      { tipo: 'parrafo', texto: 'To restore full access, contact our support team.' },
      DUDAS_PLATAFORMA,
      FIRMA_PLATAFORMA,
    ],
  },
  {
    id: 'subscription-cancelled',
    categoria: 'Subscription',
    nombre: 'Subscription canceled',
    disparador: 'Se cancela la suscripción de la cuenta',
    destinatario: 'Account owner',
    asunto: 'Your subscription has been canceled',
    preheader: 'The subscription of your clinic account has been canceled.',
    remitente: 'plataforma',
    origen: 'propuesta',
    completado: ['Title and body (the Figma still shows the suspended ones)'],
    jira: ['CON-3501'],
    bloques: [
      { tipo: 'titulo', texto: 'Subscription canceled' },
      hola('account_owner_name'),
      { tipo: 'parrafo', texto: 'Your Confidentally subscription for {{practice_name}} has been canceled.' },
      { tipo: 'detalles', titulo: 'Subscription details', filas: [['Canceled on', '{{subscription_end_date}}']] },
      { tipo: 'parrafo', texto: 'To subscribe again, contact our support team.' },
      DUDAS_PLATAFORMA,
      FIRMA_PLATAFORMA,
    ],
  },
  {
    id: 'subscription-expired',
    categoria: 'Subscription',
    nombre: 'Subscription expired',
    disparador: 'Se expira la suscripción de la cuenta',
    destinatario: 'Account owner',
    asunto: 'Your subscription has expired',
    preheader: 'Renew your subscription to keep using Confidentally.',
    remitente: 'plataforma',
    origen: 'figma',
    jira: ['CON-3499'],
    bloques: [
      { tipo: 'titulo', texto: 'Subscription expired' },
      hola('account_owner_name'),
      { tipo: 'parrafo', texto: 'Your Confidentally subscription for {{practice_name}} has expired.' },
      { tipo: 'detalles', titulo: 'Subscription details', filas: [['Expired on', '{{subscription_end_date}}']] },
      SOLO_LECTURA,
      { tipo: 'parrafo', texto: 'To renew it, contact our support team.' },
      DUDAS_PLATAFORMA,
      FIRMA_PLATAFORMA,
    ],
  },
  {
    id: 'guardian-invitation',
    categoria: 'Guardian',
    nombre: 'Guardian invitation',
    disparador: 'Se asigna un paciente a un guardian que no tiene usuario',
    destinatario: 'Guardian',
    asunto: 'You have been invited to the patient portal',
    preheader: 'You can now access the patient portal as a guardian.',
    remitente: 'clinica',
    origen: 'figma',
    jira: ['CON-3162', 'CON-3998'],
    bloques: [
      { tipo: 'titulo', texto: 'Guardian account created' },
      hola('guardian_name'),
      { tipo: 'parrafo', texto: 'Your guardian access to {{patient_name}} at {{practice_name}} has been created.' },
      { tipo: 'parrafo', texto: 'With your account, you can view {{patient_name}}’s appointments, review treatment information, and manage account details on their behalf.' },
      ...ACCESO,
      DUDAS_CLINICA,
      FIRMA_CLINICA,
    ],
  },
  {
    id: 'guardian-access-added',
    categoria: 'Guardian',
    nombre: 'Guardian access added',
    disparador: 'Se asigna un paciente a un guardian que ya tiene usuario',
    destinatario: 'Guardian',
    asunto: 'You have been added as a guardian',
    preheader: 'Use your existing account to access their information.',
    remitente: 'clinica',
    origen: 'figma',
    jira: ['CON-3162', 'CON-3998'],
    bloques: [
      { tipo: 'titulo', texto: 'Guardian access granted' },
      hola('guardian_name'),
      { tipo: 'parrafo', texto: 'Your guardian access to {{patient_name}} at {{practice_name}} has been granted.' },
      { tipo: 'parrafo', texto: 'With your existing account, you can now also view {{patient_name}}’s appointments, review treatment information, and manage account details on their behalf.' },
      { tipo: 'parrafo', texto: 'To sign in, use your existing credentials.' },
      { tipo: 'boton', texto: 'Sign in', enlace: '{{login_link}}' },
      DUDAS_CLINICA,
      FIRMA_CLINICA,
    ],
  },
]

export const htmlDe = (m: Mail) => armarMail({ asunto: m.asunto, preheader: m.preheader, remitente: m.remitente, bloques: m.bloques })

/** Las variables del mail: las del asunto y las del cuerpo. */
export const variablesDeMail = (m: Mail) => variablesDe(`${m.asunto} ${htmlDe(m)}`)

/** Datos de ejemplo para la vista previa (los de Red Dental Studio del Figma). */
export const EJEMPLO: Record<string, string> = {
  practice_name: 'Red Dental Studio',
  practice_phone: '(212) 555-0187',
  practice_email: 'red_dental@gmail.com',
  practice_address: '2550 Maple Grove Drive, Austin, Texas 12345',
  patient_name: 'Lily Evans',
  guardian_name: 'John Doe',
  employee_name: 'John Doe',
  account_owner_name: 'Alexander Scott',
  appointment_date: 'Thursday, November 26, 2026',
  previous_appointment_date: 'Thursday, November 19, 2026',
  appointment_time: '10:00 – 10:45 AM',
  provider_name: 'Sarah Miller',
  location_name: 'Downtown Clinic',
  location_address: '123 Main Street, Suite 100, Springfield, IL 62701',
  portal_link: 'https://red-dental-studio.confidentally.com/portal',
  login_link: 'https://red-dental-studio.confidentally.com/portal/login',
  document_link: 'https://red-dental-studio.confidentally.com/document',
  setup_link: 'https://red-dental-studio.confidentally.com/setup',
  username: 'lily.evans@outlook.com',
  temporary_password: 'x7B9-mQ2pW5nL8v-Q2p',
  support_email: 'support@confidentally.com',
  subscription_end_date: 'November 18, 2026',
  terms_url: 'https://confidentally.com/terms',
  privacy_url: 'https://confidentally.com/privacy',
  company_address: '123 Main Street, Suite 100, City, State 12345',
  year: '2026',
  assets_url: 'https://juliangerardi.github.io/red-dental-studio/emails',
  practice_logo_url: 'https://juliangerardi.github.io/red-dental-studio/emails/sample-practice-logo.png',
}
