import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import {
  LayoutDashboard, Users, CalendarRange, Stethoscope, Settings2, type LucideIcon,
} from 'lucide-react'
import {
  DateDrivesPanelsDemo, RoomFilterDemo, ReschedulePopoverDemo, AddPatientDemo, PatientSearchDemo,
  PatientTabsDemo, AddRelationshipDemo, CalendarOverviewDemo, NewApptButtonDemo, ClinicalTakeoverDemo,
  ClinicalSectionsDemo, NewLocationDemo, TeamListDemo, SettingsMenuDemo,
} from './demos'

/* Contenido migrado de la vieja pantalla de FAQ (Help.tsx): mismas preguntas
   y respuestas, ya verificadas contra el comportamiento real de la app -sólo
   cambia el formato, de acordeón estático a tema que te lleva a la pantalla y
   la explica ahí encima. Ver design-reference/figma/modulos/help.md. */

export type ModuleId = 'dashboard' | 'patients' | 'scheduling' | 'clinical' | 'settings'

export type Topic = {
  id: string
  module: ModuleId
  title: string
  body: string
  keywords: string
  Demo: () => React.ReactElement
  /** Ruta real a la que navega. Si falta, usa la de MODULE_PAGE. */
  page?: string
  /** data-tour del elemento real a señalar en esa pantalla. */
  anchor?: string
}

export const MODULE_PAGE: Record<ModuleId, string> = {
  dashboard: '/',
  patients: '/patients',
  scheduling: '/scheduling',
  clinical: '/patients/1/clinical-mode',
  settings: '/settings/general',
}

export const MODULES: { id: ModuleId; label: string; icon: LucideIcon; blurb: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, blurb: 'Your day at a glance' },
  { id: 'patients', label: 'Patients', icon: Users, blurb: 'The list and the patient profile' },
  { id: 'scheduling', label: 'Scheduling', icon: CalendarRange, blurb: 'Calendar and appointments' },
  { id: 'clinical', label: 'Clinical Mode', icon: Stethoscope, blurb: 'Exams, charting and consent' },
  { id: 'settings', label: 'Settings', icon: Settings2, blurb: 'Locations, staff and billing' },
]

export const TOPICS: Topic[] = [
  {
    id: 'dash-date', module: 'dashboard', anchor: 'dash-date',
    title: 'The date drives every panel',
    body: 'Every section on the dashboard - the stat strip, appointments, waiting room, rooms and pending tasks - updates to match the day you pick with the date picker at the top.',
    keywords: 'date day picker home cards appointments waiting room operatories tasks',
    Demo: DateDrivesPanelsDemo,
  },
  {
    id: 'dash-stats', module: 'dashboard', anchor: 'dash-stats',
    title: 'What the three counters mean',
    body: 'Appointments is everything booked for the day, Waiting is who has checked in and is still waiting, and Open Encounters is visits started but not closed yet.',
    keywords: 'counters stats appointments waiting open encounters metrics numbers stat strip',
    Demo: DateDrivesPanelsDemo,
  },
  {
    id: 'dash-filter', module: 'dashboard', anchor: 'dash-filter',
    title: 'Each card filters its own list',
    body: 'The filter icon in a card\\'s top right narrows only that list - for example the Rooms card down to a specific status - without touching the rest of the board.',
    keywords: 'filter card list waiting room status sort narrow rooms',
    Demo: RoomFilterDemo,
  },
  {
    id: 'dash-reschedule', module: 'dashboard',
    title: 'Reschedule from the dashboard',
    body: 'Open an appointment card to see the patient\\'s details, then use the reschedule action in that popover to move it without leaving the dashboard.',
    keywords: 'reschedule move appointment card popover dashboard',
    Demo: ReschedulePopoverDemo,
  },

  {
    id: 'pat-new', module: 'patients', anchor: 'pat-new',
    title: 'Where do I add a new patient?',
    body: 'Go to Patients and use "New Patient" at the top of the list. It opens a form for the patient\\'s basic and contact information.',
    keywords: 'new patient add create register form',
    Demo: AddPatientDemo,
  },
  {
    id: 'pat-search', module: 'patients', anchor: 'pat-search',
    title: 'Find a specific patient quickly',
    body: 'The search bar filters the list by name as you type, and the pager at the bottom walks through the rest.',
    keywords: 'search patient list filter name pagination page find',
    Demo: PatientSearchDemo,
  },
  {
    id: 'pat-profile', module: 'patients', page: '/patients/1', anchor: 'pat-tabs',
    title: 'What can I do from a patient\\'s profile?',
    body: 'Opening a patient takes you to their detail page, from which you can jump into Treatments, Documents, Insurance, Ledger and Relationships.',
    keywords: 'patient profile detail tabs treatments documents insurance ledger relationships',
    Demo: () => PatientTabsDemo({}),
  },
  {
    id: 'pat-relationship', module: 'patients', page: '/patients/1/relationships', anchor: 'pat-add-relationship',
    title: 'Record a family or guarantor relationship',
    body: 'From a patient\\'s Relationships tab, use "Add Relationship" to link them to another patient in the system - a parent, spouse or guarantor.',
    keywords: 'family guarantor relationship link add relative',
    Demo: AddRelationshipDemo,
  },
  {
    id: 'pat-ledger', module: 'patients', page: '/patients/1', anchor: 'pat-tabs',
    title: 'See a patient\\'s balance and payment history',
    body: 'That lives on the Ledger tab inside the patient\\'s profile - charges, payments and the running balance.',
    keywords: 'balance payment history ledger charges account',
    Demo: () => PatientTabsDemo({ activa: 'Ledger' }),
  },
  {
    id: 'pat-documents', module: 'patients', page: '/patients/1', anchor: 'pat-tabs',
    title: 'Upload or review a patient\\'s documents',
    body: 'Open the patient and go to the Documents tab - it lists everything on file for them and lets you add new files.',
    keywords: 'upload documents files review patient',
    Demo: () => PatientTabsDemo({ activa: 'Documents' }),
  },

  {
    id: 'sched-vs-dash', module: 'scheduling',
    title: 'How is Scheduling different from the Dashboard?',
    body: 'The Dashboard gives you a same-day operational view; Scheduling is the full calendar where you book, move and manage appointments across days and providers.',
    keywords: 'scheduling dashboard difference calendar overview',
    Demo: CalendarOverviewDemo,
  },
  {
    id: 'sched-book', module: 'scheduling', anchor: 'sched-new',
    title: 'How do I book a new appointment?',
    body: 'Use the "New appointment" button. It opens a form for the patient, provider, room and time - or start from an incoming request and it arrives pre-filled.',
    keywords: 'book new appointment create schedule form',
    Demo: NewApptButtonDemo,
  },

  {
    id: 'clinical-what', module: 'clinical',
    title: 'What is Clinical Mode?',
    body: 'A focused, full-screen view for chairside work - charting, treatment plans and consent - separate from the rest of the app so a provider isn\\'t distracted by the sidebar and navigation.',
    keywords: 'clinical mode what is full screen focused chairside',
    Demo: ClinicalTakeoverDemo,
  },
  {
    id: 'clinical-open', module: 'patients', page: '/patients/1', anchor: 'pat-clinical-mode',
    title: 'How do I open Clinical Mode for a patient?',
    body: 'From a patient\\'s profile, use the Clinical Mode entry point. It takes over the screen and returns you to the patient record when you exit.',
    keywords: 'open clinical mode patient entry point start',
    Demo: ClinicalTakeoverDemo,
  },
  {
    id: 'clinical-treatment', module: 'clinical',
    title: 'Where do treatment plans and consent forms live?',
    body: 'Inside Clinical Mode you\\'ll find the treatment plan section and consent blocks for the current patient - clinical decisions and sign-offs happen in the same place as the exam.',
    keywords: 'treatment plan consent forms location clinical',
    Demo: ClinicalSectionsDemo,
  },

  {
    id: 'set-location-new', module: 'settings', page: '/settings/locations', anchor: 'set-locations',
    title: 'How do I add another office location?',
    body: 'Go to Settings > Locations and use "New Location" to register the address and details of an additional office.',
    keywords: 'add office location branch new site',
    Demo: NewLocationDemo,
  },
  {
    id: 'set-team', module: 'settings', page: '/settings/team', anchor: 'set-team',
    title: 'How do I invite or manage team members?',
    body: 'Settings > Team lists everyone with access; use "New Employee" to add someone, or open an existing row to edit their details.',
    keywords: 'invite manage team members employees staff add',
    Demo: TeamListDemo,
  },
  {
    id: 'set-sidebar', module: 'dashboard', anchor: 'settings-menu',
    title: 'I don\\'t see a Settings option in the sidebar',
    body: 'Settings lives at the bottom of the sidebar rail. Hover it (or tap its chevron on touch) to open the floating menu with every section, including areas still marked "Coming soon".',
    keywords: 'settings sidebar missing menu floating rail',
    Demo: () => SettingsMenuDemo({}),
  },
  {
    id: 'set-coming-soon', module: 'settings',
    title: 'What does "Coming soon" mean on some Settings pages?',
    body: 'Those sections - like Finance or the Patient Portal - are reserved space for a future release and aren\\'t part of this version yet.',
    keywords: 'coming soon placeholder future not available',
    Demo: () => SettingsMenuDemo({ resaltarComingSoon: true }),
  },
]

function normalizar(texto: string) {
  return texto.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '')
}

/** Coincidencia por palabras, para que una pregunta llana caiga en el tema correcto. */
export function puntuarTema(tema: Topic, consulta: string) {
  const palabras = normalizar(consulta).split(/[^a-z0-9]+/).filter((w) => w.length > 2)
  if (!palabras.length) return 0
  const titulo = normalizar(tema.title)
  const pajar = normalizar(\`\${tema.title} \${tema.body} \${tema.keywords} \${tema.module}\`)
  let puntaje = 0
  for (const p of palabras) {
    if (pajar.includes(p)) puntaje += titulo.includes(p) ? 3 : 1
  }
  return puntaje
}
`})))()}export{r as n,n as r,i as t};