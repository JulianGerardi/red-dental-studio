/* Datos ficticios propios. Nada copiado del entorno original. */

export type Patient = {
  id: string
  first: string
  last: string
  birthdate: string
  email: string
  status: 'Active' | 'Inactive'
}

const FIRST = ['Mara', 'Elias', 'Nadia', 'Tomas', 'Ines', 'Bruno', 'Alma', 'Ciro', 'Lucia', 'Ruben']
const LAST = ['Otero', 'Vidal', 'Serrano', 'Aguirre', 'Bermudez', 'Calvo', 'Duarte', 'Esquivel']

export const PATIENTS: Patient[] = Array.from({ length: 271 }, (_, i) => {
  const first = FIRST[i % FIRST.length]
  const last = LAST[(i * 3) % LAST.length]
  const day = String((i % 28) + 1).padStart(2, '0')
  const month = String((i % 12) + 1).padStart(2, '0')
  return {
    id: `patient-${String(i + 1).padStart(4, '0')}`,
    first,
    last,
    birthdate: `${day}/${month}/${1955 + (i % 55)}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
    status: i % 3 === 0 ? 'Active' : 'Inactive',
  }
})

export const initials = (p: Patient) => (p.first[0] + p.last[0]).toUpperCase()
export const fullName = (p: Patient) => `${p.first} ${p.last}`

export const CLINICAL_SECTIONS = [
  { key: 'allergies', label: 'Allergies', count: 2, icon: 'accessibility' },
  { key: 'conditions', label: 'Medical Conditions', count: 1, icon: 'clipboard' },
  { key: 'medication', label: 'Medication', count: 13, icon: 'pill' },
  { key: 'surgery', label: 'Past Surgery and Hospitalization', count: 3, icon: 'clipboard-list' },
] as const

export const INSURANCE = [
  { order: 'Primary', carrier: 'Northwind Dental Plan', plan: 'Base plan A', subscriber: 'Mara Otero', relation: 'SELF', period: '31/03/2026 | present', status: 'ACTIVE' },
  { order: 'Secondary', carrier: 'Lakeside Dental', plan: 'Extended 001', subscriber: 'Mara Otero', relation: 'SELF', period: '21/07/2026 | present', status: 'ACTIVE' },
]

export const PENDING_TASKS = [
  { type: 'Lab Order', state: 'Requested', patient: 'Mara Otero', flag: 'Expired Date', provider: 'Dr. Salgado', register: '28/01/2026', expiration: '29/01/2026' },
  { type: 'Lab Order', state: 'Requested', patient: 'Mara Otero', flag: 'Expired Date', provider: 'Dr. Salgado', register: '07/04/2026', expiration: '07/04/2026' },
]

export const APPOINTMENTS = [
  { patient: 'Mara Otero', reason: 'Emergency (toothache)', date: '06/03/2027', time: '12:30 - 01:00 PM', location: 'Abril — Aroser Allee 97, Berlin' },
]

export const ROOMS = [
  { name: 'Room A', today: 0, provider: '-', status: 'Available' },
  { name: 'R3', today: 0, provider: '-', status: 'Available' },
  { name: 'RM2', today: 0, provider: '-', status: 'Available' },
]

export const SETTINGS_SECTIONS = [
  { to: '/settings/account', title: 'Accounts', desc: 'Manage your account and their access.', icon: 'user-cog' },
  { to: '/settings/locations', title: 'Locations', desc: 'Configure and manage your practice locations.', icon: 'building' },
  { to: '/settings/team', title: 'Employees', desc: 'Manage your team members and their access.', icon: 'users' },
  { to: '/settings/roles', title: 'Roles', desc: 'Define and assign permissions and roles.', icon: 'shield-check' },
  { to: '/settings/parameters', title: 'Parameters', desc: 'Configure system parameters and settings.', icon: 'sliders' },
  { to: '/settings/finance', title: 'Billing', desc: 'Manage fee schedules, carriers, and coverage tables.', icon: 'credit-card' },
  { to: '/settings/libraries', title: 'Libraries', desc: 'Manage clinical and administrative libraries.', icon: 'library' },
  { to: '/settings/patient-portal', title: 'Patient Portal', desc: 'Configure settings for the patient portal.', icon: 'circle-user' },
  { to: '/settings/security', title: 'Security', desc: 'Manage security settings and access controls.', icon: 'lock' },
  { to: '/settings/preferences', title: 'Preferences', desc: 'Manage user preferences.', icon: 'sliders' },
]

/* ── Clinical Mode ─────────────────────────────────────────────── */

export type RecordStatus =
  | 'Pending' | 'Requested' | 'Delivered'
  | 'Active' | 'Expired' | 'Cancelled' | 'Completed'

export const LAB_ORDERS = [
  { provider: 'Tomy Gi', subject: 'Olivos Laboratory', status: 'Pending' as RecordStatus, created: '30/09/2026', updated: '30/09/2026', expires: '30/09/2026' },
  { provider: 'Tomy Gi', subject: 'Olivos Laboratory', status: 'Requested' as RecordStatus, created: '30/09/2026', updated: '30/09/2026', expires: '30/09/2026' },
  { provider: 'Tomy Gi', subject: 'Northgate Lab', status: 'Pending' as RecordStatus, created: '05/06/2026', updated: '05/06/2026', expires: '05/06/2026' },
  { provider: 'Tomy Gi', subject: 'Northgate Lab', status: 'Pending' as RecordStatus, created: '06/06/2026', updated: '06/06/2026', expires: '06/06/2026' },
  { provider: 'Tomy Gi', subject: 'Olivos Laboratory', status: 'Pending' as RecordStatus, created: '29/05/2026', updated: '29/05/2026', expires: '29/05/2026' },
  { provider: 'Tomy Gi', subject: 'Mark Anthony Lab', status: 'Requested' as RecordStatus, created: '13/05/2026', updated: '13/05/2026', expires: '13/05/2026' },
  { provider: 'Rene Favaloro', subject: 'Northgate Lab', status: 'Delivered' as RecordStatus, created: '05/05/2026', updated: '05/05/2026', expires: '05/05/2026' },
]

export const PRESCRIPTIONS = [
  { provider: 'Tomy Gi', drug: 'Clonazepam 1 G', status: 'Active' as RecordStatus, created: '31/08/2026', updated: '31/08/2026', expires: '31/08/2026' },
  { provider: 'Tomy Gi', drug: 'Ibuprofeno 1 G', status: 'Active' as RecordStatus, created: '31/08/2026', updated: '31/08/2026', expires: '31/08/2026' },
  { provider: 'Tomy Gi', drug: 'Ibuprofeno 1 G', status: 'Active' as RecordStatus, created: '28/08/2026', updated: '28/08/2026', expires: '28/08/2026' },
  { provider: 'Tomy Gi', drug: 'Ibuprofeno 1 G', status: 'Expired' as RecordStatus, created: '31/07/2026', updated: '31/07/2026', expires: '31/07/2026' },
  { provider: 'Tomy Gi', drug: 'Clonazepam 2 G', status: 'Cancelled' as RecordStatus, created: '30/06/2026', updated: '30/06/2026', expires: '30/06/2026' },
  { provider: 'Tomy Gi', drug: 'Clonazepam 2 G', status: 'Expired' as RecordStatus, created: '30/06/2026', updated: '30/06/2026', expires: '30/06/2026' },
  { provider: 'Tomy Gi', drug: 'Clonazepam 2 G', status: 'Pending' as RecordStatus, created: '30/06/2026', updated: '30/06/2026', expires: '30/06/2026' },
]

export const REFERRALS = [
  { provider: 'Tomy Gi', referred: 'Test Ref', specialty: 'Orthodontics', status: 'Pending' as RecordStatus, created: '20/08/2026', updated: '20/08/2026', expires: '20/08/2026' },
  { provider: 'Tomy Gi', referred: 'Prov test', specialty: 'Orthodontics', status: 'Pending' as RecordStatus, created: '08/07/2026', updated: '08/07/2026', expires: '08/07/2026' },
  { provider: 'Luis Leloir', referred: 'Prov test', specialty: 'Orthodontics', status: 'Pending' as RecordStatus, created: '18/06/2026', updated: '18/06/2026', expires: '18/06/2026' },
  { provider: 'Tomy Gi', referred: 'Betsy Moreno', specialty: 'Orthodontics', status: 'Completed' as RecordStatus, created: '27/04/2026', updated: '27/04/2026', expires: '27/04/2026' },
  { provider: 'Tomy Gi', referred: 'Betsy Moreno', specialty: 'Orthodontics', status: 'Cancelled' as RecordStatus, created: '27/04/2026', updated: '27/04/2026', expires: '27/04/2026' },
  { provider: 'Tomy Gi', referred: 'Betsy Moreno', specialty: 'Orthodontics', status: 'Completed' as RecordStatus, created: '27/04/2026', updated: '27/04/2026', expires: '27/04/2026' },
  { provider: 'Tomy Gi', referred: 'Betsy Moreno', specialty: 'Orthodontics', status: 'Completed' as RecordStatus, created: '20/04/2026', updated: '20/04/2026', expires: '20/04/2026' },
]

/* Códigos ADA reales del catálogo público; las descripciones son las estándar. */
export const PLAN_PROCEDURES = Array.from({ length: 9 }, (_, i) => ({
  date: i === 0 ? '20/08/2026' : '01/12/2025',
  location: '',
  tooth: i === 0 ? 7 : 29 - i,
  surface: '-',
  code: i === 0 ? 'D0220' : 'D2140',
  procedure: i === 0
    ? 'Intraoral – periapical first radiographic image'
    : 'Amalgam – one surface, primary or permanent',
  provider: i === 0 ? 'Luis Leloir' : 'Rene Favaloro',
  amount: i === 0 ? '$0.00' : '$17.00',
  status: 'PLANNED',
}))

export const PLAN_CASES = [
  { date: '12/08/2026', status: 'PLANNING', items: [{ name: 'Upper arch', updated: '12/08/2026' }] },
  { date: '14/07/2026', status: 'WAITING FOR CONSENT', items: [] },
  { date: '14/06/2026', status: 'WAITING FOR CONSENT', items: [] },
  { date: '21/05/2026', status: 'WAITING FOR CONSENT', items: [] },
  { date: '15/05/2026', status: 'WAITING FOR CONSENT', items: [] },
  { date: '15/05/2026', status: 'WAITING FOR CONSENT', items: [] },
  { date: '08/05/2026', status: 'WAITING FOR CONSENT', items: [] },
  { date: '07/05/2026', status: 'WAITING FOR CONSENT', items: [] },
]

export const TREATMENT_HISTORY = [
  { date: '24/08/2026', latest: true, tz: 'America/Argentina/Buenos_Aires', status: 'Cancelled', note: 'Unsigned', reason: 'Crown prep', provider: 'Rene Favaloro', procedures: null, flags: [false, false, false, false] },
  { date: '21/08/2026', latest: false, tz: 'Europe/Berlin', status: 'Fulfilled', note: 'Unsigned', reason: 'Filling', provider: 'Tomy Gi', procedures: null, flags: [false, false, false, false] },
  { date: '20/08/2026', latest: false, tz: 'America/Argentina/Buenos_Aires', status: 'Fulfilled', note: 'Unsigned', reason: 'Crown prep', provider: 'Luis Leloir', procedures: 'D2140', flags: [true, true, true, true] },
  { date: '17/08/2026', latest: false, tz: 'America/Argentina/Buenos_Aires', status: 'Fulfilled', note: 'Unsigned', reason: 'Crown prep', provider: 'Luis Leloir', procedures: null, flags: [false, false, false, false] },
  { date: '14/08/2026', latest: false, tz: 'America/Argentina/Buenos_Aires', status: 'Fulfilled', note: 'Unsigned', reason: 'Crown prep', provider: 'Luis Leloir', procedures: null, flags: [false, false, false, false] },
  { date: '12/08/2026', latest: false, tz: 'America/Argentina/Buenos_Aires', status: 'Fulfilled', note: 'Unsigned', reason: 'Extraction', provider: 'Andy Davis', procedures: null, flags: [false, false, false, false] },
  { date: '11/08/2026', latest: false, tz: 'America/Argentina/Buenos_Aires', status: 'Fulfilled', note: 'Unsigned', reason: 'Crown prep', provider: 'Luis Leloir', procedures: null, flags: [false, false, false, true] },
]
