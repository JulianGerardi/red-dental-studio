import { useState, type ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import {
  CalendarDays, CalendarRange, ChevronRight, CreditCard, House, Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Pill } from '@/components/ui/pill'
import { Tabs } from '@/components/ui/tabs'
import { DataTable, PersonCell, AmountCell } from '@/components/ui/data-table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { DatePicker } from '@/components/ui/date-picker'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { EmptyState } from '@/components/ui/empty-state'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { TextField } from '@/components/patients/form'
import { PatientSidePanel } from '@/components/patients/PatientSidePanel'
import { PatientMenuPreview } from '@/components/patients/patient-menu-preview'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { AppointmentCard } from '@/components/dashboard/AppointmentCard'
import { TurnoCalendario } from '@/components/scheduling/TurnoCalendario'
import { cn } from '@/lib/utils'
import type { Pagina, Seccion } from './buscar'
import { Enlace } from './navegar'

/* Las piezas de la vitrina: cada una es el componente real de la app,
   dibujado chico, y abre su página. Las usan la portada y las portadas de
   Foundations y Elements. */

export type Pieza = { titulo: string; seccion: Seccion; que: string; ancho?: 2; arriba?: boolean; muestra: ReactNode }

const FILAS = [
  { id: '1', nombre: 'Maria Abril Viola', ini: 'MV', estado: 'Active', saldo: 120 },
  { id: '2', nombre: 'Noah James Smith', ini: 'NS', estado: 'Active', saldo: 0 },
  { id: '3', nombre: 'Elias Aguirre', ini: 'EA', estado: 'Inactive', saldo: 48.5 },
]

const RIEL = [House, Users, CalendarRange, CreditCard]

export const PIEZAS: Pieza[] = [
  {
    titulo: 'Buttons', seccion: 'Elements', que: 'Cinco variantes y tres tamaños para toda acción.',
    muestra: (
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button>Save</Button>
        <Button variant="secondary">Cancel</Button>
        <Button variant="destructive">Delete</Button>
      </div>
    ),
  },
  {
    titulo: 'Fields', seccion: 'Elements', que: 'Texto, selección, fecha y búsqueda, con error y ayuda.',
    muestra: <TextField label="Patient name" value="Maria Abril Viola" onChange={() => {}} className="w-[230px]" />,
  },
  {
    titulo: 'Tables', seccion: 'Elements', que: 'Buscar, filtrar, ordenar y achicar columnas, como en el Ledger.', ancho: 2, arriba: true,
    muestra: (
      <div className="w-[460px] max-w-full">
        <DataTable
          rows={FILAS}
          rowKey={(f) => f.id}
          pageSize={3}
          columns={[
            { key: 'p', header: 'Patient', cell: (f) => <PersonCell name={f.nombre} initials={f.ini} /> },
            { key: 'e', header: 'Status', width: 110, cell: (f) => <Pill tone={f.estado === 'Active' ? 'success' : 'neutral'} size="sm">{f.estado}</Pill> },
            { key: 's', header: 'Balance', width: 100, align: 'right', cell: (f) => <AmountCell value={f.saldo} /> },
          ]}
        />
      </div>
    ),
  },
  {
    titulo: 'Tabs', seccion: 'Elements', que: 'Cambiar de vista dentro de un mismo bloque.',
    muestra: <Tabs tabs={['Findings', 'Diagnostics']} value="Findings" onChange={() => {}} aria-label="Example" />,
  },
  {
    titulo: 'Pills', seccion: 'Elements', que: 'El estado de algo, con seis tonos para toda la app.',
    muestra: (
      <div className="flex max-w-[220px] flex-wrap justify-center gap-1.5">
        <Pill tone="success">Active</Pill>
        <Pill tone="info">Booked</Pill>
        <Pill tone="warning">No Show</Pill>
        <Pill tone="danger">Overdue</Pill>
        <Pill tone="purple">In progress</Pill>
      </div>
    ),
  },
  {
    titulo: 'Appointment cards', seccion: 'Elements', que: 'Un turno en el Dashboard, Patients, el paciente y la agenda.',
    muestra: (
      <div className="flex w-[240px] flex-col gap-2">
        <AppointmentCard appt={{ name: 'Noah James', initials: 'NJ', provider: 'Dr. Elena Martinez', operatory: 'Operatory 2', time: '10:00' }} compact />
        <TurnoCalendario evento={{ start: 10.5, patient: 'Maria Abril Viola', state: 'Check-in' }} forma="chip" />
      </div>
    ),
  },
  {
    titulo: 'Patient menu', seccion: 'Elements', que: 'El panel de la ficha del paciente: secciones, encuentro y datos.', arriba: true,
    muestra: (
      <div className="w-[218px] origin-top scale-[0.62]">
        <PatientMenuPreview.Provider value={{ collapsed: false, encounter: 'start' }}>
          <PatientSidePanel name="John Smith" initials="JS" section="Overview" basePath="/patients/john-smith" />
        </PatientMenuPreview.Provider>
      </div>
    ),
  },
  {
    titulo: 'Colors', seccion: 'Foundations', que: 'Los tokens de color, leídos de index.css.',
    muestra: (
      <div className="grid grid-cols-4 gap-2">
        {['bg-dash-blue', 'bg-ink', 'bg-green', 'bg-amber', 'bg-dash-bad-fg', 'bg-purple-fg', 'bg-brand-tint', 'bg-surface-slate'].map((c) => (
          <span key={c} className={cn('size-9 rounded-lg ring-1 ring-black/5', c)} />
        ))}
      </div>
    ),
  },
  {
    titulo: 'Page header', seccion: 'Elements', que: 'Rastro, título, bajada y la acción principal de cada pantalla.',
    muestra: (
      <div className="flex w-[300px] flex-col gap-3">
        <Breadcrumb items={[{ label: 'Settings', to: '/settings' }, { label: 'Accounts' }]} />
        <SettingsPageHeader titulo="Accounts" bajada="Who can use Confidentally." accion={<Button size="sm">Add</Button>} />
      </div>
    ),
  },
  {
    titulo: 'Cards', seccion: 'Elements', que: 'La caja que agrupa un bloque de información.',
    muestra: (
      <Card className="w-[240px]">
        <CardHeader>
          <div>
            <CardTitle>Clinic hours</CardTitle>
            <CardDescription>When patients can book.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="text-[13px] text-ink-medium">Mon – Fri · 8:00 – 18:00</CardContent>
      </Card>
    ),
  },
  {
    titulo: 'Navigation', seccion: 'Elements', que: 'El menú lateral de la app: colapsado, expandido y su tooltip.',
    muestra: (
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center gap-1 rounded-xl border border-line bg-surface-subtle p-1.5">
          {RIEL.map((Icono, i) => (
            <span key={i} className={cn('flex size-7 items-center justify-center rounded-md', i === 2 ? 'bg-dash-blue text-white' : 'text-ink-medium')}>
              <Icono className="size-4" />
            </span>
          ))}
        </div>
        <span className="rounded-md bg-ink px-2 py-1 text-[12px] font-medium text-white">Scheduling</span>
      </div>
    ),
  },
  {
    titulo: 'Typography', seccion: 'Foundations', que: 'La escala de texto de la app, en Inter.',
    muestra: (
      <div className="flex flex-col gap-1">
        <span className="text-[34px] leading-none font-bold text-ink">Aa</span>
        <span className="text-2xl font-bold text-ink">Heading 24</span>
        <span className="text-sm text-ink">Body 14 · Regular</span>
        <span className="text-xs text-ink-muted">Caption 12</span>
      </div>
    ),
  },
  {
    titulo: 'Radius and shadows', seccion: 'Foundations', que: 'Las esquinas y sombras de cards, paneles y menús.',
    muestra: (
      <div className="flex items-end gap-3">
        <span className="size-14 rounded-md border border-line bg-white" />
        <span className="shadow-inner-card size-14 rounded-lg bg-white" />
        <span className="shadow-panel size-14 rounded-xl bg-white" />
      </div>
    ),
  },
  {
    titulo: 'Switch', seccion: 'Components', que: 'Prender o apagar una opción, con efecto inmediato.',
    muestra: (
      <div className="flex flex-col gap-3 text-[13px] text-ink">
        <span className="flex items-center gap-3"><Switch defaultChecked aria-label="Reminders" /> Send reminders</span>
        <span className="flex items-center gap-3"><Switch aria-label="Online booking" /> Online booking</span>
      </div>
    ),
  },
  {
    titulo: 'Checkbox', seccion: 'Components', que: 'Elegir una o varias opciones de una lista.',
    muestra: (
      <div className="flex flex-col gap-2.5 text-[13px] text-ink">
        <span className="flex items-center gap-2.5"><Checkbox on onChange={() => {}} label="Allergies" /> Allergies</span>
        <span className="flex items-center gap-2.5"><Checkbox on={false} onChange={() => {}} label="Diabetes" /> Diabetes</span>
        <span className="flex items-center gap-2.5"><Checkbox on onChange={() => {}} label="Smoker" /> Smoker</span>
      </div>
    ),
  },
  {
    titulo: 'DatePicker', seccion: 'Components', que: 'Elegir una fecha con el calendario.',
    muestra: <DatePicker value={new Date(2025, 2, 12)} onChange={() => {}} />,
  },
  {
    titulo: 'Avatar', seccion: 'Components', que: 'La foto o las iniciales de un paciente o del equipo.',
    muestra: (
      <div className="flex -space-x-2">
        {[['MV', 'bg-dash-blue'], ['NS', 'bg-dash-blue-hover'], ['EA', 'bg-green'], ['JS', 'bg-ink']].map(([t, c]) => (
          <Avatar key={t} className="size-11 ring-2 ring-white"><AvatarFallback className={cn('text-[13px] font-semibold text-white', c)}>{t}</AvatarFallback></Avatar>
        ))}
      </div>
    ),
  },
  {
    titulo: 'EmptyState', seccion: 'Components', que: 'Lo que se ve cuando todavía no hay nada.',
    muestra: <div className="w-[260px] origin-center scale-90"><EmptyState icon={CalendarDays} title="No appointments today" detail="Your schedule is clear." /></div>,
  },
]

/* Una pieza, como las tarjetas de componentes de Primer: la muestra arriba,
   sobre gris, y debajo el nombre, qué es y "Learn more". */
export function TarjetaPieza({ pieza, id }: { pieza: Pieza; id?: string }) {
  const contenido = (
    <>
      <div
        inert
        className={cn(
          'ds-muestra pointer-events-none relative flex h-[180px] justify-center overflow-hidden rounded-lg bg-surface-subtle p-4',
          pieza.arriba ? 'items-start after:absolute after:inset-x-0 after:bottom-0 after:h-12 after:bg-gradient-to-t after:from-surface-subtle after:to-transparent' : 'items-center',
        )}
      >
        {pieza.muestra}
      </div>
      <span className="mt-4 text-[20px] leading-tight font-semibold text-ink">{pieza.titulo}</span>
      <span className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-muted">{pieza.que}</span>
      <span className="mt-4 inline-flex items-center gap-0.5 text-[14px] font-medium text-dash-blue">
        Learn more <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </>
  )
  const clase = cn(
    'group flex min-w-0 flex-col rounded-xl border border-line bg-white p-4 no-underline transition-colors hover:border-ink-faint',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue',
    pieza.ancho === 2 && 'sm:col-span-2',
  )
  return id ? <Enlace id={id} className={clase}>{contenido}</Enlace> : <div className={clase}>{contenido}</div>
}

/* La grilla con "View more": primero `inicial` piezas, después todas. */
export function Vitrina({ indice, piezas = PIEZAS, inicial = 7 }: { indice: Pagina[] | null; piezas?: Pieza[]; inicial?: number }) {
  const [todas, setTodas] = useState(false)
  const idDe = (p: Pieza) => indice?.find((x) => x.titulo === p.titulo && x.seccion === p.seccion)?.id
  const visibles = todas ? piezas : piezas.slice(0, inicial)
  return (
    <MemoryRouter>
      <div className="flex flex-col items-center gap-6">
        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibles.map((p) => <TarjetaPieza key={p.titulo} pieza={p} id={idDe(p)} />)}
        </div>
        {piezas.length > inicial && (
          <button
            type="button"
            onClick={() => setTodas((v) => !v)}
            aria-expanded={todas}
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-line bg-white px-4 text-[14px] font-medium text-ink transition-colors hover:bg-surface-muted"
          >
            {todas ? 'View less' : `View more (${piezas.length - inicial})`}
            <ChevronRight className={cn('size-4 transition-transform', todas ? '-rotate-90' : 'rotate-90')} aria-hidden />
          </button>
        )}
      </div>
    </MemoryRouter>
  )
}
