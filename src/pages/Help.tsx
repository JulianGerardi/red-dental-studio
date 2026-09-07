import { useState } from 'react'
import {
  LayoutDashboard, Users, CalendarRange, Stethoscope, Settings2, ChevronDown, type LucideIcon,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Pregunta = { q: string; a: string }
type Categoria = { id: string; label: string; icon: LucideIcon; items: Pregunta[] }

/* Preguntas frecuentes agrupadas por área de la app: sirven de mapa para que
   el usuario descubra funcionalidad que quizás no notó en el sidebar (por
   ejemplo Clinical Mode, o el menú flotante de Settings). Las áreas todavía
   "under construction" (Billing, Message, Contacts, Documents, Reports) no
   tienen sección propia acá para no prometer algo que la pantalla no cumple. */
const CATEGORIAS: Categoria[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    items: [
      {
        q: 'How do I see appointments for a different day?',
        a: 'Use the date picker above the Appointments panel. Every section on the dashboard — the stat strip, waiting room, rooms and pending tasks — updates to match the day you pick.',
      },
      {
        q: 'What do the stat cards at the top mean?',
        a: 'They summarize the selected day at a glance: totals like scheduled appointments, checked-in patients and pending tasks, so you don\'t have to scroll to know how busy the day is.',
      },
      {
        q: 'Can I filter appointments by room or type?',
        a: 'Yes. The filter menus next to the date picker let you narrow the Appointments panel down to specific rooms or appointment types.',
      },
      {
        q: 'How do I reschedule an appointment from the dashboard?',
        a: 'Open an appointment card to see patient details, then use the reschedule action in that popover to move it to a new date or time slot without leaving the dashboard.',
      },
    ],
  },
  {
    id: 'patients',
    label: 'Patients',
    icon: Users,
    items: [
      {
        q: 'Where do I add a new patient?',
        a: 'Go to Patients and use the "New Patient" action at the top of the list. It opens a form for the patient\'s basic and contact information.',
      },
      {
        q: 'How do I find a specific patient quickly?',
        a: 'Use the search bar on the Patients list to filter by name; you can also sort or filter the table by the columns shown.',
      },
      {
        q: 'What can I do from a patient\'s profile?',
        a: 'Opening a patient takes you to their detail page, from which you can jump into Treatments, Documents, Insurance, Ledger and Relationships — everything related to that patient lives behind those tabs.',
      },
      {
        q: 'How do I record a family or guarantor relationship?',
        a: 'From a patient\'s Relationships tab, use "Add Relationship" to link them to another patient in the system (for example a parent, spouse or guarantor).',
      },
      {
        q: 'Where do I see a patient\'s balance and payment history?',
        a: 'That lives on the Ledger tab inside the patient\'s profile, showing charges, payments and running balance.',
      },
      {
        q: 'How do I upload or review a patient\'s documents?',
        a: 'Open the patient and go to the Documents tab; it lists everything on file for them and lets you add new files.',
      },
    ],
  },
  {
    id: 'scheduling',
    label: 'Scheduling',
    icon: CalendarRange,
    items: [
      {
        q: 'How is Scheduling different from the Dashboard?',
        a: 'The Dashboard gives you a same-day operational view; Scheduling is the full calendar where you book, move and manage appointments across days and providers.',
      },
      {
        q: 'How do I book a new appointment?',
        a: 'Pick an open slot on the calendar to launch the New Appointment flow, where you choose the patient, provider, room and appointment type.',
      },
    ],
  },
  {
    id: 'clinical',
    label: 'Clinical Mode',
    icon: Stethoscope,
    items: [
      {
        q: 'What is Clinical Mode?',
        a: 'It\'s a focused, full-screen view for chairside work — charting, treatment plans and consent — separate from the rest of the app so a provider isn\'t distracted by the sidebar and navigation.',
      },
      {
        q: 'How do I open Clinical Mode for a patient?',
        a: 'From a patient\'s profile, look for the Clinical Mode entry point; it takes over the screen and returns you to the patient record when you exit.',
      },
      {
        q: 'Where do treatment plans and consent forms live?',
        a: 'Inside Clinical Mode you\'ll find the treatment plan section and consent blocks for the current patient, so clinical decisions and sign-offs happen in the same place as the exam.',
      },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings2,
    items: [
      {
        q: 'How do I add another office location?',
        a: 'Go to Settings > Locations and use "New Location" to register the address and details of an additional office.',
      },
      {
        q: 'How do I invite or manage team members?',
        a: 'Settings > Team lists everyone with access; use "New Employee" to add someone, or open an existing row to edit their details.',
      },
      {
        q: 'I don\'t see a Settings option in the sidebar — where did it go?',
        a: 'Settings lives at the bottom of the sidebar rail. Hover it (or tap its chevron on touch) to open the floating menu with every section, including areas still marked "Coming soon".',
      },
      {
        q: 'What does "Coming soon" mean on some Settings pages?',
        a: 'Those sections (like Finance or the Patient Portal) are reserved space for a future release and aren\'t part of this version yet.',
      },
    ],
  },
]

function FaqItem({ item, abierto, onToggle }: { item: Pregunta; abierto: boolean; onToggle: () => void }) {
  return (
    <div className="border-b last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={abierto}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-[#09090b] hover:bg-[#fafafa]"
      >
        {item.q}
        <ChevronDown
          className={cn('text-muted-foreground size-4 shrink-0 transition-transform', abierto && 'rotate-180')}
        />
      </button>
      {abierto && (
        <p className="text-muted-foreground px-5 pb-4 text-sm leading-[1.6]">
          {item.a}
        </p>
      )}
    </div>
  )
}

export default function Help() {
  const [activa, setActiva] = useState(CATEGORIAS[0].id)
  const [abierta, setAbierta] = useState<string | null>(`${CATEGORIAS[0].id}-0`)

  const categoria = CATEGORIAS.find((c) => c.id === activa) ?? CATEGORIAS[0]

  return (
    <div className="px-4 py-6 sm:px-8">
      <h1 className="text-2xl font-bold text-[#09090b]">Help</h1>
      <p className="text-muted-foreground mt-2">
        Answers to common questions, organized by area of the app.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {CATEGORIAS.map((c) => {
          const Icon = c.icon
          const activo = c.id === activa
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setActiva(c.id)
                setAbierta(`${c.id}-0`)
              }}
              className={cn(
                'flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                activo
                  ? 'bg-dash-blue border-dash-blue text-white'
                  : 'text-muted-foreground hover:bg-[#fafafa]',
              )}
            >
              <Icon className="size-4" />
              {c.label}
            </button>
          )
        })}
      </div>

      <Card className="mt-6">
        {categoria.items.map((item, i) => {
          const id = `${categoria.id}-${i}`
          return (
            <FaqItem
              key={id}
              item={item}
              abierto={abierta === id}
              onToggle={() => setAbierta((cur) => (cur === id ? null : id))}
            />
          )
        })}
      </Card>
    </div>
  )
}
