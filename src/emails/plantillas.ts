/* Los mails de la app, tomados de "Email Propuesta" (tabla unificada) y del Figma 📧 Email (138:4). `origen` dice de
   dónde sale el texto: 'doc' tal cual el documento, 'propuesta' lo completamos nosotros y espera el ok. Detalle y
   anomalías en design-reference/figma/modulos/emails.md. */
import { armarMail, variablesDe, type Bloque, type Remitente } from './marco.ts'

export type Categoria =
  | 'Onboarding' | 'Scheduling' | 'Treatment Plan' | 'Consent/Document' | 'Patient' | 'Employee' | 'Subscription' | 'Guardian'

export type Origen = 'doc' | 'propuesta'

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
  /** Qué partes se completaron porque el documento no las trae. */
  completado?: string[]
  jira: string[]
  bloques: Bloque[]
}

/* Piezas que se repiten igual en varios mails: si cambian, cambian en todos. */
const PACIENTE = { tipo: 'saludo', texto: 'Dear {{patient_first_name}},' } as const
const DUDAS = { tipo: 'nota', texto: 'If you have any questions, please contact your office.' } as const
const FIRMA_CLINICA: Bloque = { tipo: 'firma', despedida: 'Best regards,', lineas: ['{{practice_name}}', '{{practice_phone}} | {{practice_email}}'] }
const FIRMA_PLATAFORMA: Bloque = { tipo: 'firma', despedida: 'Best regards,', lineas: ['The Confidentally Team', '{{support_email}}'] }
const TURNO: Bloque = {
  tipo: 'detalles',
  titulo: 'Appointment details',
  filas: [
    ['Date', '{{appointment_date}}'],
    ['Time', '{{appointment_time}}'],
    ['Provider', '{{provider_name}}'],
    ['Location', '{{location_name}}'],
    ['Address', '{{location_address}}'],
  ],
}
const ACCESO: Bloque = {
  tipo: 'detalles',
  titulo: 'Login details',
  filas: [['Username', '{{username}}'], ['Temporary password', '{{temporary_password}}']],
}
const VER_TURNO: Bloque[] = [
  { tipo: 'parrafo', texto: 'You can access your appointment using the button below:' },
  { tipo: 'boton', texto: 'Review Appointment', enlace: '{{portal_link}}' },
]
const VENCE_24: Bloque = {
  tipo: 'aviso',
  tono: 'warning',
  titulo: 'This request expires in 24 hours',
  texto: 'If you don’t confirm within 24 hours, this appointment request will expire and the time slot may no longer be available.',
}

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
    origen: 'doc',
    completado: ['Preheader'],
    jira: ['CON-3325', 'CON-3451'],
    bloques: [
      { tipo: 'saludo', texto: 'Hello {{account_owner_first_name}},' },
      { tipo: 'parrafo', texto: 'Your clinic account has been created and is ready for setup.' },
      { tipo: 'parrafo', texto: 'Please complete the required setup steps to activate your account.' },
      { tipo: 'boton', texto: 'Set up your clinic', enlace: '{{setup_link}}' },
      { tipo: 'nota', texto: 'If you did not request this account, you can safely ignore this email.' },
      { tipo: 'nota', texto: 'If you have questions or need help, please contact our support team at {{support_email}}.' },
      { tipo: 'firma', despedida: 'Best regards,', lineas: ['{{practice_name}}', '{{support_contact}}'] },
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
    origen: 'doc',
    completado: ['Preheader'],
    jira: [],
    bloques: [
      PACIENTE,
      { tipo: 'parrafo', texto: 'We have created an appointment request for you in your patient portal. Please review the appointment details and confirm your visit.' },
      VENCE_24,
      TURNO,
      ...VER_TURNO,
      DUDAS,
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
    origen: 'doc',
    completado: ['Subject', 'Preheader'],
    jira: [],
    bloques: [
      PACIENTE,
      { tipo: 'parrafo', texto: 'An appointment has been scheduled for you by your office.' },
      TURNO,
      ...VER_TURNO,
      DUDAS,
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
    origen: 'doc',
    completado: ['Subject', 'Preheader'],
    jira: [],
    bloques: [
      PACIENTE,
      { tipo: 'parrafo', texto: 'The appointment has been successfully confirmed.' },
      TURNO,
      ...VER_TURNO,
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
    completado: ['Subject', 'Preheader', 'Body after the first line'],
    jira: ['CON-478'],
    bloques: [
      PACIENTE,
      { tipo: 'parrafo', texto: 'Your appointment has been rescheduled. These are the new details:' },
      TURNO,
      ...VER_TURNO,
      DUDAS,
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
    origen: 'propuesta',
    completado: ['Subject', 'Preheader', 'Body after the first line'],
    jira: ['CON-478'],
    bloques: [
      PACIENTE,
      { tipo: 'parrafo', texto: 'Your appointment has been rescheduled. Please review the new date and time and confirm your visit.' },
      VENCE_24,
      TURNO,
      ...VER_TURNO,
      DUDAS,
      FIRMA_CLINICA,
    ],
  },
  {
    id: 'appointment-cancelled',
    categoria: 'Scheduling',
    nombre: 'Appointment cancelled',
    disparador: 'Cancelación de appointment desde el portal por el paciente o por secretaria',
    destinatario: 'Patient',
    asunto: 'Your appointment has been cancelled',
    preheader: 'This appointment is no longer on your schedule.',
    remitente: 'clinica',
    origen: 'doc',
    completado: ['Subject', 'Preheader'],
    jira: [],
    bloques: [
      PACIENTE,
      { tipo: 'parrafo', texto: 'Your appointment has been cancelled.' },
      TURNO,
      DUDAS,
      FIRMA_CLINICA,
    ],
  },
  {
    id: 'treatment-plan-ready',
    categoria: 'Treatment Plan',
    nombre: 'Treatment plan ready',
    disparador: 'Treatment plan ready',
    destinatario: 'Patient',
    asunto: 'Your treatment plan is ready to review',
    preheader: 'Review your treatment plan and sign the consent form.',
    remitente: 'clinica',
    origen: 'doc',
    completado: ['Preheader'],
    jira: ['CON-3189'],
    bloques: [
      PACIENTE,
      { tipo: 'parrafo', texto: 'We have prepared your treatment plan. Please review the document and sign to provide your consent.' },
      { tipo: 'boton', texto: 'Review Consent Form', enlace: '{{portal_link}}' },
      DUDAS,
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
    origen: 'doc',
    jira: ['CON-2908', 'CON-2909'],
    bloques: [
      PACIENTE,
      { tipo: 'parrafo', texto: 'A document requiring your signature is now available in your patient portal. Please review the document and sign to provide your consent.' },
      { tipo: 'parrafo', texto: 'You can access the document using the button below:' },
      { tipo: 'boton', texto: 'Sign Document', enlace: '{{portal_link}}' },
      DUDAS,
      FIRMA_CLINICA,
    ],
  },
  {
    id: 'patient-welcome',
    categoria: 'Patient',
    nombre: 'Patient portal ready',
    disparador: 'Creación de un nuevo paciente',
    destinatario: 'Patient',
    asunto: 'New message from your dental office',
    preheader: 'Your patient portal account is now ready.',
    remitente: 'clinica',
    origen: 'doc',
    completado: ['Preheader', 'Button and notes (from the Figma "Welcome")'],
    jira: ['CON-2895'],
    bloques: [
      PACIENTE,
      { tipo: 'parrafo', texto: 'Welcome to {{practice_name}}. We are pleased to let you know that your patient portal account is now ready.' },
      { tipo: 'parrafo', texto: 'You can use the portal to view upcoming appointments, access treatment information, and manage your account details.' },
      ACCESO,
      { tipo: 'boton', texto: 'Login', enlace: '{{login_link}}' },
      { tipo: 'nota', texto: 'Once you log in, we recommend updating your password.' },
      { tipo: 'nota', texto: 'If you need any assistance accessing your account, please contact our office.' },
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
    preheader: 'Your employee portal account is now ready.',
    remitente: 'clinica',
    origen: 'doc',
    completado: ['Preheader', 'Button and notes (same as Patient portal ready)'],
    jira: ['CON-4061'],
    bloques: [
      { tipo: 'saludo', texto: 'Dear {{employee_first_name}},' },
      { tipo: 'parrafo', texto: 'Welcome to {{practice_name}}. We are pleased to let you know that your employee portal account is now ready.' },
      ACCESO,
      { tipo: 'boton', texto: 'Login', enlace: '{{login_link}}' },
      { tipo: 'nota', texto: 'Once you log in, we recommend updating your password.' },
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
    origen: 'propuesta',
    completado: ['Subject', 'Preheader', 'Body'],
    jira: ['CON-3268'],
    bloques: [
      { tipo: 'saludo', texto: 'Hello {{account_owner_first_name}},' },
      { tipo: 'parrafo', texto: 'The subscription of {{practice_name}} has been suspended.' },
      { tipo: 'aviso', tono: 'warning', titulo: 'Your account is in read-only mode', texto: 'Your team can still view and export information, but cannot create, edit or delete records until full access is restored.' },
      { tipo: 'nota', texto: 'To restore full access, please contact our support team at {{support_email}}.' },
      FIRMA_PLATAFORMA,
    ],
  },
  {
    id: 'subscription-cancelled',
    categoria: 'Subscription',
    nombre: 'Subscription cancelled',
    disparador: 'Se cancela la suscripción de la cuenta',
    destinatario: 'Account owner',
    asunto: 'Your subscription has been cancelled',
    preheader: 'The subscription of your clinic account has been cancelled.',
    remitente: 'plataforma',
    origen: 'propuesta',
    completado: ['Subject', 'Preheader', 'Body'],
    jira: ['CON-3501'],
    bloques: [
      { tipo: 'saludo', texto: 'Hello {{account_owner_first_name}},' },
      { tipo: 'parrafo', texto: 'The subscription of {{practice_name}} was cancelled on {{subscription_end_date}}.' },
      { tipo: 'nota', texto: 'If you think this is a mistake or want to subscribe again, please contact our support team at {{support_email}}.' },
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
    origen: 'propuesta',
    completado: ['Subject', 'Preheader', 'Body'],
    jira: ['CON-3499'],
    bloques: [
      { tipo: 'saludo', texto: 'Hello {{account_owner_first_name}},' },
      { tipo: 'parrafo', texto: 'The subscription of {{practice_name}} expired on {{subscription_end_date}}.' },
      { tipo: 'parrafo', texto: 'To keep using Confidentally, please contact our support team to renew it.' },
      { tipo: 'nota', texto: 'You can reach us at {{support_email}}.' },
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
    origen: 'propuesta',
    completado: ['Subject', 'Preheader', 'Body'],
    jira: ['CON-3162', 'CON-3998'],
    bloques: [
      { tipo: 'saludo', texto: 'Dear {{guardian_first_name}},' },
      { tipo: 'parrafo', texto: '{{practice_name}} has added you as the guardian of {{patient_full_name}}, and your patient portal account is now ready.' },
      { tipo: 'parrafo', texto: 'You can use the portal to view their upcoming appointments and access their treatment information.' },
      ACCESO,
      { tipo: 'boton', texto: 'Login', enlace: '{{login_link}}' },
      { tipo: 'nota', texto: 'Once you log in, we recommend updating your password.' },
      DUDAS,
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
    origen: 'propuesta',
    completado: ['Subject', 'Preheader', 'Body'],
    jira: ['CON-3162', 'CON-3998'],
    bloques: [
      { tipo: 'saludo', texto: 'Dear {{guardian_first_name}},' },
      { tipo: 'parrafo', texto: '{{practice_name}} has added you as the guardian of {{patient_full_name}}.' },
      { tipo: 'parrafo', texto: 'You can access their information in the patient portal with your existing account.' },
      { tipo: 'boton', texto: 'Login', enlace: '{{login_link}}' },
      { tipo: 'nota', texto: 'If you think this is a mistake, please contact your office.' },
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
  practice_phone: '(305) 555-0142',
  practice_email: 'hello@reddentalstudio.com',
  patient_first_name: 'Emma',
  patient_full_name: 'Emma Johnson',
  guardian_first_name: 'Laura',
  employee_first_name: 'Daniel',
  account_owner_first_name: 'Michael',
  appointment_date: 'Thursday, November 26, 2026',
  appointment_time: '10:30 AM – 11:15 AM',
  provider_name: 'Dr. Sarah Miller',
  location_name: 'Red Dental Studio – Downtown',
  location_address: '245 Brickell Ave, Miami, FL 33131',
  portal_link: 'https://red-dental-studio.confidentally.com/portal',
  login_link: 'https://red-dental-studio.confidentally.com/portal/login',
  setup_link: 'https://red-dental-studio.confidentally.com/setup',
  username: 'emma.johnson@outlook.com',
  temporary_password: 'P-Z1?0-LJAa8Y',
  support_email: 'support@confidentally.com',
  support_contact: 'support@confidentally.com | (800) 555-0100',
  subscription_end_date: 'November 18, 2026',
  website_url: 'https://confidentally.com',
  terms_url: 'https://confidentally.com/terms',
  privacy_url: 'https://confidentally.com/privacy',
  company_address: '123 Main Street, Suite 100, City, State 12345',
  year: '2026',
  assets_url: 'https://juliangerardi.github.io/red-dental-studio/emails',
  practice_logo_url: 'https://juliangerardi.github.io/red-dental-studio/emails/sample-practice-logo.png',
}
