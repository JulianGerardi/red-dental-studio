import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import {
  AppWindow, BarChart3, CalendarClock, CalendarDays, CalendarRange, Clock, CreditCard, Wallet, X, Download, FileText, Heading, IdCard, Inbox, ListChecks,
  Mail, MapPin, Minus, MousePointerClick, PanelsTopLeft, Pencil, Phone, Plus, Save, Search, Send, Settings, Shield, SquareStack,
  Table, Tag, TextCursorInput, ToggleRight, Trash2, Type, Users, type LucideIcon,
} from 'lucide-react'
import { Button, type ButtonSize, type ButtonVariant } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Panel } from '@/components/dashboard/primitives'
import { StatCard } from '@/components/dashboard/StatCard'
import { PendingTaskCard, type PendingTask } from '@/components/dashboard/PendingTaskCard'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { Tabs } from '@/components/ui/tabs'
import { DateTextField, FieldLabel, FormFooter, ModalShell, SearchField, SectionCard, SelectField, TextArea, TextField } from '@/components/patients/form'
import { DatePicker } from '@/components/ui/date-picker'
import { VistaDia, VistaMes, VistaSemana, type Vista } from '@/components/scheduling/CalendarViews'
import { EVENTOS_INICIALES, FECHA_ANCLA } from '@/components/scheduling/calendar-data'
import { StatusLegend } from '@/components/scheduling/StatusLegend'
import { AppointmentSlotPicker } from '@/components/scheduling/AppointmentSlotPicker'
import { InfoBlock } from '@/components/patients/PatientSidePanel'
import { Pill, type PillTone } from '@/components/ui/pill'
import { AmountCell, DataTable, PersonCell, TextCell, type DataTableColumn } from '@/components/ui/data-table'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { EmptyState } from '@/components/ui/empty-state'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { AppointmentCard, type Appointment } from '@/components/dashboard/AppointmentCard'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'
import { cn } from '@/lib/utils'

/* Los bloques del constructor. Cada uno sabe dibujarse con el componente
   real de la app (`VerBloque`) y escribir su código (`codigoBloque`), uno al
   lado del otro: lo que se ve en el lienzo y lo que se copia son siempre lo
   mismo. Algunos contienen otros bloques (Modal, Tabs with content,
   Section): el modelo y los dos lados son recursivos. */

/* ── Modelo ─────────────────────────────────────────────────────────── */

/* Llave con la que una página le pasa al constructor qué bloque sumar. */
export const AGREGAR = 'confidentally-ui-builder-add'

export const ICONOS = {
  none: null, Plus, Save, Download, Pencil, Trash2, Search, Send, CalendarDays, Clock, Users, FileText, Settings,
  Phone, Mail, MapPin, CreditCard, Shield,
} as const
export type NombreIcono = keyof typeof ICONOS
export type IconoReal = Exclude<NombreIcono, 'none'>

export type Boton = { label: string; variant: ButtonVariant; size: ButtonSize; icono: NombreIcono }
export type ClaseCampo = 'text' | 'select' | 'date' | 'calendar' | 'textarea' | 'search'
export type Campo = { id: string; clase: ClaseCampo; label: string; placeholder: string; opciones: string; hint: string; error: string; required: boolean; disabled: boolean }
export type ColumnaTabla = 'patient' | 'status' | 'next' | 'provider' | 'balance'
export type Pestana = { id: string; label: string; bloques: Bloque[] }

export type Bloque = { id: string } & (
  | { tipo: 'encabezado'; titulo: string; bajada: string; accion: string; icono: NombreIcono }
  | { tipo: 'texto'; texto: string; tono: 'normal' | 'suave' }
  | { tipo: 'botones'; alinear: 'inicio' | 'fin' | 'extremos'; botones: Boton[] }
  | { tipo: 'pestanas'; tabs: string; size: 'sm' | 'md'; fullWidth: boolean }
  | { tipo: 'pestanasContenido'; size: 'sm' | 'md'; fullWidth: boolean; pestanas: Pestana[] }
  | { tipo: 'modal'; titulo: string; disparador: string; ancho: 'sm' | 'md' | 'lg'; confirmar: string; cancelar: string; peligro: boolean; bloques: Bloque[] }
  | { tipo: 'seccion'; titulo: string; bloques: Bloque[] }
  | { tipo: 'campos'; columnas: 1 | 2; campos: Campo[] }
  | { tipo: 'pills'; items: { label: string; tone: PillTone }[] }
  | { tipo: 'stats'; items: { titulo: string; valor: string; delta: string; icono: IconoReal }[] }
  | { tipo: 'detalles'; titulo: string; items: { icono: IconoReal; label: string; valor: string }[] }
  | { tipo: 'tabla'; columnas: ColumnaTabla[]; filas: number; buscador: boolean; seleccion: boolean; acciones: boolean; compacta: boolean; porPagina: number }
  | { tipo: 'vacio'; icono: NombreIcono; titulo: string; detalle: string; accion: string }
  | { tipo: 'opciones'; control: 'switch' | 'checkbox'; items: { label: string; on: boolean }[] }
  | { tipo: 'turnos'; cantidad: number }
  | { tipo: 'tareas'; cantidad: number }
  | { tipo: 'pago'; titulo: string; fecha: boolean; aplicarA: string; metodos: string; varios: boolean; notas: boolean; total: boolean }
  | { tipo: 'calendario'; vista: Vista; selector: boolean; leyenda: boolean }
  | { tipo: 'horarios'; provider: string; especialidad: string; fecha: string }
  | { tipo: 'divisor' }
)
export type TipoBloque = Bloque['tipo']
export type BloqueDe<T extends TipoBloque> = Extract<Bloque, { tipo: T }>

export type TipoContenedor = 'card' | 'panel' | 'page'
export type Diseno = {
  nombre: string
  contenedor: TipoContenedor
  /** Título del Panel (el de los paneles del Dashboard). */
  tituloPanel: string
  ancho: 'angosto' | 'medio' | 'completo'
  bloques: Bloque[]
}

let n = 0
export const nuevoId = () => `b${Date.now().toString(36)}${(n++).toString(36)}`

export const campo = (c: Partial<Campo> = {}): Campo => ({
  id: nuevoId(), clase: 'text', label: 'Label', placeholder: '', opciones: '', hint: '', error: '', required: false, disabled: false, ...c,
})
export const pestana = (label: string, bloques: Bloque[] = []): Pestana => ({ id: nuevoId(), label, bloques })

/* Los bloques que tienen otros adentro, y cuáles. */
export function hijosDe(b: Bloque): Bloque[][] {
  if (b.tipo === 'modal' || b.tipo === 'seccion') return [b.bloques]
  if (b.tipo === 'pestanasContenido') return b.pestanas.map((p) => p.bloques)
  return []
}
export const contiene = (bloques: Bloque[], id: string): boolean =>
  bloques.some((b) => b.id === id || hijosDe(b).some((h) => contiene(h, id)))

/* Qué se puede poner adentro de qué: un modal no va adentro de otro bloque,
   y unas pestañas con contenido no van adentro de otras. */
export function permitidos(padre?: TipoBloque): TipoBloque[] {
  const todos = TIPOS.map((t) => t.tipo)
  if (!padre) return todos
  if (padre === 'pestanasContenido') return todos.filter((t) => t !== 'modal' && t !== 'pestanasContenido')
  return todos.filter((t) => t !== 'modal')
}

/* Una copia con ids nuevos, también adentro. */
export function reIdentificar(b: Bloque): Bloque {
  const recorrer = (x: Bloque): Bloque => {
    x.id = nuevoId()
    if (x.tipo === 'campos') x.campos = x.campos.map((f) => ({ ...f, id: nuevoId() }))
    if (x.tipo === 'modal' || x.tipo === 'seccion') x.bloques = x.bloques.map(recorrer)
    if (x.tipo === 'pestanasContenido') x.pestanas = x.pestanas.map((p) => ({ ...p, id: nuevoId(), bloques: p.bloques.map(recorrer) }))
    return x
  }
  return recorrer(JSON.parse(JSON.stringify(b)) as Bloque)
}

export type Grupo = 'Layout' | 'Forms' | 'Content' | 'Data'

/* Los tipos de bloque, con lo que trae cada uno al agregarlo. */
export const TIPOS: { tipo: TipoBloque; nombre: string; que: string; icono: LucideIcon; grupo: Grupo; nuevo: () => Bloque }[] = [
  { tipo: 'encabezado', grupo: 'Content', nombre: 'Heading', que: 'Título, bajada y acción principal', icono: Heading, nuevo: () => ({ id: nuevoId(), tipo: 'encabezado', titulo: 'Title', bajada: 'A short line that says what this is for.', accion: '', icono: 'none' }) },
  { tipo: 'texto', grupo: 'Content', nombre: 'Text', que: 'Un párrafo', icono: Type, nuevo: () => ({ id: nuevoId(), tipo: 'texto', texto: 'Write something useful for the person using this screen.', tono: 'suave' }) },
  { tipo: 'botones', grupo: 'Content', nombre: 'Buttons', que: 'Acciones: primaria, secundaria…', icono: MousePointerClick, nuevo: () => ({ id: nuevoId(), tipo: 'botones', alinear: 'fin', botones: [{ label: 'Cancel', variant: 'secondary', size: 'lg', icono: 'none' }, { label: 'Save', variant: 'primary', size: 'lg', icono: 'none' }] }) },
  { tipo: 'campos', grupo: 'Forms', nombre: 'Fields', que: 'Un formulario', icono: TextCursorInput, nuevo: () => ({ id: nuevoId(), tipo: 'campos', columnas: 2, campos: [campo({ label: 'First name', placeholder: 'Maria' }), campo({ label: 'Last name', placeholder: 'Viola' })] }) },
  { tipo: 'opciones', grupo: 'Forms', nombre: 'Switches', que: 'Prender o apagar opciones', icono: ToggleRight, nuevo: () => ({ id: nuevoId(), tipo: 'opciones', control: 'switch', items: [{ label: 'Email reminders', on: true }, { label: 'SMS confirmations', on: false }] }) },
  { tipo: 'pago', grupo: 'Forms', nombre: 'Payment', que: 'Registrar un pago: monto, método, fecha', icono: Wallet, nuevo: () => ({ id: nuevoId(), tipo: 'pago', titulo: 'Payment information', fecha: true, aplicarA: 'Maria Abril Viola, Noah James Smith', metodos: 'Card payment, Cash payment, Check payment, Electronic payment', varios: true, notas: true, total: true }) },
  { tipo: 'horarios', grupo: 'Forms', nombre: 'Time slots', que: 'Elegir la hora de un turno', icono: Clock, nuevo: () => ({ id: nuevoId(), tipo: 'horarios', provider: 'Sarah Stone', especialidad: 'General Dentistry', fecha: 'Saturday, February 19, 2022' }) },
  { tipo: 'pills', grupo: 'Content', nombre: 'Pills', que: 'Estados', icono: Tag, nuevo: () => ({ id: nuevoId(), tipo: 'pills', items: [{ label: 'Active', tone: 'success' }, { label: 'Pending', tone: 'warning' }] }) },
  { tipo: 'vacio', grupo: 'Content', nombre: 'Empty state', que: 'Cuando todavía no hay nada', icono: Inbox, nuevo: () => ({ id: nuevoId(), tipo: 'vacio', icono: 'CalendarDays', titulo: 'Nothing here yet', detalle: 'When there is something to show, it will appear here.', accion: '' }) },
  { tipo: 'divisor', grupo: 'Content', nombre: 'Divider', que: 'Una línea para separar', icono: Minus, nuevo: () => ({ id: nuevoId(), tipo: 'divisor' }) },
  { tipo: 'modal', grupo: 'Layout', nombre: 'Modal', que: 'Un botón que abre un modal con bloques adentro', icono: AppWindow, nuevo: () => ({ id: nuevoId(), tipo: 'modal', titulo: 'New item', disparador: 'Add item', ancho: 'md', confirmar: 'Save', cancelar: 'Cancel', peligro: false, bloques: [{ id: nuevoId(), tipo: 'campos', columnas: 1, campos: [campo({ label: 'Name', placeholder: 'Write a name' })] }] }) },
  { tipo: 'pestanasContenido', grupo: 'Layout', nombre: 'Tabs with content', que: 'Pestañas, cada una con sus bloques', icono: PanelsTopLeft, nuevo: () => ({ id: nuevoId(), tipo: 'pestanasContenido', size: 'md', fullWidth: false, pestanas: [pestana('Details', [{ id: nuevoId(), tipo: 'texto', texto: 'What goes in the first tab.', tono: 'suave' }]), pestana('History', [{ id: nuevoId(), tipo: 'vacio', icono: 'Clock', titulo: 'No history yet', detalle: '', accion: '' }])] }) },
  { tipo: 'seccion', grupo: 'Layout', nombre: 'Section', que: 'Un grupo con título, como en los formularios', icono: SquareStack, nuevo: () => ({ id: nuevoId(), tipo: 'seccion', titulo: 'Section', bloques: [{ id: nuevoId(), tipo: 'campos', columnas: 2, campos: [campo({ label: 'Field one' }), campo({ label: 'Field two' })] }] }) },
  { tipo: 'pestanas', grupo: 'Layout', nombre: 'Tabs', que: 'Sólo la fila de pestañas', icono: PanelsTopLeft, nuevo: () => ({ id: nuevoId(), tipo: 'pestanas', tabs: 'All, Active, Inactive', size: 'md', fullWidth: false }) },
  { tipo: 'tabla', grupo: 'Data', nombre: 'Table', que: 'Una lista de pacientes', icono: Table, nuevo: () => ({ id: nuevoId(), tipo: 'tabla', columnas: ['patient', 'status', 'next', 'balance'], filas: 6, buscador: true, seleccion: false, acciones: true, compacta: false, porPagina: 5 }) },
  { tipo: 'calendario', grupo: 'Data', nombre: 'Calendar', que: 'La agenda de Scheduling: día, semana o mes', icono: CalendarRange, nuevo: () => ({ id: nuevoId(), tipo: 'calendario', vista: 'Week', selector: true, leyenda: true }) },
  { tipo: 'stats', grupo: 'Data', nombre: 'Stats', que: 'Números clave en tarjetas', icono: BarChart3, nuevo: () => ({ id: nuevoId(), tipo: 'stats', items: [{ titulo: 'Patients today', valor: '24', delta: '+12% from last week', icono: 'Users' }, { titulo: 'Revenue', valor: '$8,420', delta: '+4.2% from last week', icono: 'CreditCard' }, { titulo: 'No shows', valor: '2', delta: '−1 from yesterday', icono: 'CalendarDays' }] }) },
  { tipo: 'detalles', grupo: 'Data', nombre: 'Details', que: 'Datos con ícono y lápiz para editar', icono: IdCard, nuevo: () => ({ id: nuevoId(), tipo: 'detalles', titulo: 'Contact', items: [{ icono: 'Phone', label: 'Phone', valor: '(555) 234-5678' }, { icono: 'Mail', label: 'Email', valor: 'maria.viola@mail.com' }, { icono: 'MapPin', label: 'Address', valor: '123 Biscayne Blvd' }] }) },
  { tipo: 'turnos', grupo: 'Data', nombre: 'Appointments', que: 'Turnos del día', icono: CalendarClock, nuevo: () => ({ id: nuevoId(), tipo: 'turnos', cantidad: 3 }) },
  { tipo: 'tareas', grupo: 'Data', nombre: 'Tasks', que: 'Tareas pendientes', icono: ListChecks, nuevo: () => ({ id: nuevoId(), tipo: 'tareas', cantidad: 2 }) },
]
export const infoDe = (t: TipoBloque) => TIPOS.find((x) => x.tipo === t)!

/* ── Datos de ejemplo ───────────────────────────────────────────────── */

export const PACIENTES = [
  { id: '1', name: 'Maria Abril Viola', initials: 'MV', status: 'Active', next: '12 Mar 2025 · 10:00', provider: 'Dr. Elena Martinez', balance: 120 },
  { id: '2', name: 'Noah James Smith', initials: 'NS', status: 'Active', next: '14 Mar 2025 · 09:30', provider: 'Dr. Emily Chen', balance: 0 },
  { id: '3', name: 'Elias Aguirre', initials: 'EA', status: 'Inactive', next: '—', provider: 'Sarah Stone', balance: 48.5 },
  { id: '4', name: 'John Smith', initials: 'JS', status: 'Active', next: '18 Mar 2025 · 11:00', provider: 'Dr. Salgado', balance: 250 },
  { id: '5', name: 'Elena Marquez', initials: 'EM', status: 'Active', next: '19 Mar 2025 · 15:30', provider: 'Dr. Elena Martinez', balance: 0 },
  { id: '6', name: 'Sarah Stone', initials: 'SS', status: 'Inactive', next: '—', provider: 'Dr. Emily Chen', balance: 32 },
  { id: '7', name: 'Lucas Fernández', initials: 'LF', status: 'Active', next: '21 Mar 2025 · 08:45', provider: 'Dr. Salgado', balance: 90 },
  { id: '8', name: 'Sofía Romero', initials: 'SR', status: 'Active', next: '24 Mar 2025 · 12:00', provider: 'Sarah Stone', balance: 0 },
  { id: '9', name: 'Martín Díaz', initials: 'MD', status: 'Active', next: '25 Mar 2025 · 16:15', provider: 'Dr. Emily Chen', balance: 15 },
  { id: '10', name: 'Valentina Ruiz', initials: 'VR', status: 'Inactive', next: '—', provider: 'Dr. Elena Martinez', balance: 60 },
]
type Paciente = (typeof PACIENTES)[number]

const TURNOS: Appointment[] = [
  { name: 'Noah James', initials: 'NJ', provider: 'Dr. Elena Martinez', operatory: 'Operatory 2', time: '10:00' },
  { name: 'Maria Abril Viola', initials: 'MV', provider: 'Dr. Emily Chen', operatory: 'Operatory 1', time: '11:30' },
  { name: 'Elias Aguirre', initials: 'EA', provider: 'Sarah Stone', operatory: 'Operatory 3', time: '13:00' },
  { name: 'John Smith', initials: 'JS', provider: 'Dr. Salgado', operatory: 'Operatory 2', time: '15:30' },
  { name: 'Sofía Romero', initials: 'SR', provider: 'Dr. Emily Chen', operatory: 'Operatory 1', time: '17:00' },
]

const TAREAS: PendingTask[] = [
  { kind: 'Referrals', state: 'Requested', person: 'Elena Marquez', initials: 'EM', register: 'March 17, 2025', expiration: 'March 31, 2025' },
  { kind: 'Lab order', state: 'In progress', person: 'Noah James Smith', initials: 'NS', register: 'March 18, 2025', expiration: 'March 25, 2025' },
  { kind: 'Insurance claim', state: 'Requested', person: 'Maria Abril Viola', initials: 'MV', register: 'March 19, 2025', expiration: 'April 2, 2025' },
  { kind: 'Prescription', state: 'Requested', person: 'John Smith', initials: 'JS', register: 'March 20, 2025', expiration: 'March 27, 2025' },
]

const COLUMNAS: Record<ColumnaTabla, { header: string; col: DataTableColumn<Paciente>; codigo: string }> = {
  patient: { header: 'Patient', col: { key: 'patient', header: 'Patient', cell: (p) => <PersonCell name={p.name} initials={p.initials} /> }, codigo: `{ key: 'patient', header: 'Patient', cell: (p) => <PersonCell name={p.name} initials={p.initials} /> }` },
  status: { header: 'Status', col: { key: 'status', header: 'Status', width: 120, cell: (p) => <Pill tone={p.status === 'Active' ? 'success' : 'neutral'}>{p.status}</Pill> }, codigo: `{ key: 'status', header: 'Status', width: 120, cell: (p) => <Pill tone={p.status === 'Active' ? 'success' : 'neutral'}>{p.status}</Pill> }` },
  next: { header: 'Next appointment', col: { key: 'next', header: 'Next appointment', width: 180, cell: (p) => <TextCell>{p.next}</TextCell> }, codigo: `{ key: 'next', header: 'Next appointment', width: 180, cell: (p) => <TextCell>{p.next}</TextCell> }` },
  provider: { header: 'Provider', col: { key: 'provider', header: 'Provider', width: 170, cell: (p) => <TextCell>{p.provider}</TextCell> }, codigo: `{ key: 'provider', header: 'Provider', width: 170, cell: (p) => <TextCell>{p.provider}</TextCell> }` },
  balance: { header: 'Balance', col: { key: 'balance', header: 'Balance', width: 110, align: 'right', cell: (p) => <AmountCell value={p.balance} /> }, codigo: `{ key: 'balance', header: 'Balance', width: 110, align: 'right', cell: (p) => <AmountCell value={p.balance} /> }` },
}
export const NOMBRE_COLUMNA = Object.fromEntries(Object.entries(COLUMNAS).map(([k, v]) => [k, v.header])) as Record<ColumnaTabla, string>

/* ── Cómo se ve ─────────────────────────────────────────────────────── */

/* Lo que el lienzo necesita saber del constructor: qué bloque se está
   editando (para abrir su modal o su pestaña) y qué modal está abierto. */
export const VistaPrevia = createContext<{ editando: string | null; abierto: string | null; setAbierto: (id: string | null) => void }>({
  editando: null, abierto: null, setAbierto: () => {},
})

const ALINEAR = { inicio: 'justify-start', fin: 'justify-end', extremos: 'justify-between' } as const
const ANCHO_MODAL = { sm: 'max-w-[480px]', md: 'max-w-[640px]', lg: undefined } as const
const lista = (s: string) => s.split(',').map((x) => x.trim()).filter(Boolean)
const SIN_CONTENIDO = 'Nothing here yet.'

function ConIcono({ icono, children }: { icono: NombreIcono; children: ReactNode }) {
  const I = ICONOS[icono]
  return <>{I && <I />}{children}</>
}

function PestanasVivas({ b }: { b: BloqueDe<'pestanas'> }) {
  const tabs = lista(b.tabs)
  const [valor, setValor] = useState(tabs[0] ?? '')
  const actual = tabs.includes(valor) ? valor : (tabs[0] ?? '')
  return tabs.length ? <Tabs tabs={tabs} value={actual} onChange={setValor} size={b.size} fullWidth={b.fullWidth} /> : null
}

function Hijos({ bloques, gap = 'gap-4' }: { bloques: Bloque[]; gap?: string }) {
  if (!bloques.length) return <p className="text-[13px] text-ink-muted">{SIN_CONTENIDO}</p>
  return <div className={cn('flex flex-col', gap)}>{bloques.map((x) => <VerBloque key={x.id} b={x} contenedor="card" />)}</div>
}

function PestanasConContenido({ b }: { b: BloqueDe<'pestanasContenido'> }) {
  const { editando } = useContext(VistaPrevia)
  const [valor, setValor] = useState(b.pestanas[0]?.label ?? '')
  /* Mientras se edita un bloque de una pestaña, esa pestaña queda a la vista. */
  const forzada = editando ? b.pestanas.find((p) => contiene(p.bloques, editando))?.label : undefined
  const labels = b.pestanas.map((p) => p.label)
  const actual = forzada ?? (labels.includes(valor) ? valor : (labels[0] ?? ''))
  const abierta = b.pestanas.find((p) => p.label === actual)
  if (!b.pestanas.length) return null
  return (
    <div className="flex flex-col gap-4">
      <Tabs tabs={labels} value={actual} onChange={setValor} size={b.size} fullWidth={b.fullWidth} />
      {abierta && <Hijos bloques={abierta.bloques} />}
    </div>
  )
}

function VerModal({ b }: { b: BloqueDe<'modal'> }) {
  const { editando, abierto, setAbierto } = useContext(VistaPrevia)
  /* Mientras se edita el modal o algo de adentro, queda abierto. */
  const visible = abierto === b.id || (!!editando && (editando === b.id || contiene(b.bloques, editando)))
  const cerrar = () => setAbierto(null)
  useEffect(() => {
    if (visible) document.querySelector(`[role="dialog"][aria-label="${CSS.escape(b.titulo)}"]`)?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [visible, b.titulo])
  const pie = b.peligro ? (
    <>
      <Button variant="secondary" onClick={cerrar}>{b.cancelar}</Button>
      <Button variant="destructive" onClick={cerrar}>{b.confirmar}</Button>
    </>
  ) : (
    <FormFooter onCancel={cerrar} onSave={cerrar} cancelLabel={b.cancelar} saveLabel={b.confirmar} />
  )
  return (
    <>
      <div>
        <Button variant={b.peligro ? 'destructive' : 'primary'} onClick={() => setAbierto(b.id)}>{b.disparador}</Button>
      </div>
      {visible && (
        <ModalShell title={b.titulo} width={ANCHO_MODAL[b.ancho]} onClose={cerrar} footer={pie}>
          <Hijos bloques={b.bloques} gap="gap-5" />
        </ModalShell>
      )}
    </>
  )
}

const dinero = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
const montoDe = (s: string) => Number(s.replace(/[^0-9.]/g, '')) || 0
type FilaPago = { id: number; monto: string; metodo: string; detalle: string; banco: string }

/* El pago como en el Ledger (PatientPaymentPanel): fecha, a quién se aplica y
   uno o varios métodos; el cheque pide número y banco, la tarjeta sus
   últimos 4 números, el pago electrónico una referencia. */
function PagoVivo({ b }: { b: BloqueDe<'pago'> }) {
  const metodos = lista(b.metodos)
  const aplicar = lista(b.aplicarA)
  const [fecha, setFecha] = useState<Date | null>(null)
  const [pagos, setPagos] = useState<FilaPago[]>([{ id: 0, monto: '', metodo: metodos[0] ?? '', detalle: '', banco: '' }])
  const poner = (id: number, x: Partial<FilaPago>) => setPagos((ps) => ps.map((p) => (p.id === id ? { ...p, ...x } : p)))
  const total = pagos.reduce((t, p) => t + montoDe(p.monto), 0)
  return (
    <div className="flex flex-col gap-4">
      <h3 className="flex items-center gap-2 text-sm font-bold text-ink"><CreditCard className="size-4" /> {b.titulo}</h3>
      {(b.fecha || aplicar.length > 0) && (
        <div className="grid gap-4 sm:grid-cols-2">
          {b.fecha && (
            <div className="flex flex-col gap-2">
              <FieldLabel required>Transaction date</FieldLabel>
              <DatePicker value={fecha} onChange={setFecha} className="h-9 w-full" />
            </div>
          )}
          {aplicar.length > 0 && <SelectField label="Apply to" required options={aplicar} />}
        </div>
      )}
      {pagos.map((p, i) => (
        <div key={p.id} className="flex items-start gap-2">
          <div className="grid flex-1 gap-4 sm:grid-cols-2">
            <TextField label="Amount" required placeholder="$ 0.00" value={p.monto} onChange={(v) => poner(p.id, { monto: v })} />
            <SelectField label="Payment method" required options={metodos} value={p.metodo} onChange={(v) => poner(p.id, { metodo: v })} />
            {p.metodo === 'Check payment' && (
              <>
                <TextField label="Check number" required placeholder="1234" value={p.detalle} onChange={(v) => poner(p.id, { detalle: v })} />
                <TextField label="Bank/Branch" required placeholder="AE9323AMB" value={p.banco} onChange={(v) => poner(p.id, { banco: v })} />
              </>
            )}
            {p.metodo === 'Card payment' && <TextField label="Card last 4 digits" placeholder="4242" value={p.detalle} onChange={(v) => poner(p.id, { detalle: v })} />}
            {p.metodo === 'Electronic payment' && <TextField label="Reference" placeholder="TRX-20250312" value={p.detalle} onChange={(v) => poner(p.id, { detalle: v })} />}
          </div>
          {b.varios && (i === pagos.length - 1 ? (
            <Button variant="secondary" iconOnly aria-label="Add another payment method" className="mt-7" onClick={() => setPagos((ps) => [...ps, { id: Math.max(...ps.map((x) => x.id)) + 1, monto: '', metodo: metodos[0] ?? '', detalle: '', banco: '' }])}><Plus /></Button>
          ) : (
            <Button variant="secondary" iconOnly aria-label="Remove this payment method" className="mt-7" onClick={() => setPagos((ps) => ps.filter((x) => x.id !== p.id))}><X /></Button>
          ))}
        </div>
      ))}
      {b.notas && <TextArea label="Notes" placeholder="Anything the front desk should know" />}
      {b.total && (
        <div className="flex items-center justify-between rounded-lg bg-surface-subtle px-4 py-3">
          <span className="text-[13px] text-ink-muted">Total payment</span>
          <span className="text-[15px] font-semibold text-ink tabular-nums">{dinero(total)}</span>
        </div>
      )}
    </div>
  )
}

/* La agenda de Scheduling con sus turnos de ejemplo: se pueden arrastrar. */
function CalendarioVivo({ b }: { b: BloqueDe<'calendario'> }) {
  const [vista, setVista] = useState<Vista>(b.vista)
  const [eventos, setEventos] = useState(EVENTOS_INICIALES)
  const mover = (i: number, fecha: Date, start?: number) => setEventos((es) => es.map((e, k) => (k === i ? { ...e, fecha, start: start ?? e.start } : e)))
  const props = { eventos, fecha: FECHA_ANCLA, onMover: mover, onAbrir: () => {} }
  return (
    <div className="flex min-w-0 flex-col gap-3">
      {(b.selector || b.leyenda) && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          {b.selector && <Tabs tabs={['Day', 'Week', 'Month'] as const} value={vista} onChange={setVista} />}
          {b.leyenda && <StatusLegend />}
        </div>
      )}
      {vista === 'Day' && <VistaDia {...props} />}
      {vista === 'Week' && <VistaSemana {...props} />}
      {vista === 'Month' && <VistaMes {...props} />}
    </div>
  )
}

function HorariosVivos({ b }: { b: BloqueDe<'horarios'> }) {
  const [hora, setHora] = useState<string | undefined>()
  return <AppointmentSlotPicker provider={b.provider} especialidad={b.especialidad} fecha={b.fecha} seleccion={hora} onPick={setHora} className="h-[440px]" />
}

function FechaViva({ c }: { c: Campo }) {
  const [fecha, setFecha] = useState<Date | null>(null)
  return (
    <div className="flex flex-col gap-2">
      <FieldLabel required={c.required}>{c.label}</FieldLabel>
      <DatePicker value={fecha} onChange={setFecha} className="h-9 w-full" />
    </div>
  )
}

function CasillasVivas({ b }: { b: BloqueDe<'opciones'> }) {
  const [marcados, setMarcados] = useState(() => b.items.filter((i) => i.on).map((i) => i.label))
  return (
    <div className="flex flex-col gap-3">
      {b.items.map((i) => (
        <label key={i.label} className="flex items-center gap-2.5 text-[13px] text-ink">
          <Checkbox label={i.label} on={marcados.includes(i.label)} onChange={(v) => setMarcados((m) => (v ? [...m, i.label] : m.filter((x) => x !== i.label)))} />
          {i.label}
        </label>
      ))}
    </div>
  )
}

function VerCampo({ c, ancho }: { c: Campo; ancho?: string }) {
  const comun = { label: c.label, required: c.required, disabled: c.disabled, hint: c.hint || undefined, error: c.error || undefined, className: ancho }
  if (c.clase === 'select') return <SelectField {...comun} placeholder={c.placeholder || undefined} options={lista(c.opciones)} />
  if (c.clase === 'date') return <DateTextField {...comun} />
  if (c.clase === 'calendar') return <FechaViva c={c} />
  if (c.clase === 'textarea') return <TextArea {...comun} placeholder={c.placeholder || undefined} />
  if (c.clase === 'search') return <SearchField {...comun} placeholder={c.placeholder || undefined} options={lista(c.opciones)} />
  return <TextField {...comun} placeholder={c.placeholder || undefined} />
}

export function VerBloque({ b, contenedor }: { b: Bloque; contenedor: TipoContenedor }) {
  switch (b.tipo) {
    case 'encabezado': {
      const accion = b.accion ? <Button size="md"><ConIcono icono={b.icono}>{b.accion}</ConIcono></Button> : undefined
      if (contenedor === 'page') return <div><SettingsPageHeader titulo={b.titulo} bajada={b.bajada} accion={accion} /></div>
      return (
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>{b.titulo}</CardTitle>
            {b.bajada && <CardDescription>{b.bajada}</CardDescription>}
          </div>
          {accion}
        </div>
      )
    }
    case 'texto':
      return <p className={b.tono === 'suave' ? 'text-[13px] text-ink-muted' : 'text-sm text-ink'}>{b.texto}</p>
    case 'botones':
      return (
        <div className={cn('flex flex-wrap items-center gap-2', ALINEAR[b.alinear])}>
          {b.botones.map((x, i) => <Button key={i} variant={x.variant} size={x.size}><ConIcono icono={x.icono}>{x.label}</ConIcono></Button>)}
        </div>
      )
    case 'pestanas':
      return <PestanasVivas key={b.tabs} b={b} />
    case 'pestanasContenido':
      return <PestanasConContenido b={b} />
    case 'modal':
      return <VerModal b={b} />
    case 'seccion':
      return (
        <SectionCard title={b.titulo}>
          {b.bloques.length ? b.bloques.map((x) => <VerBloque key={x.id} b={x} contenedor="card" />) : <p className="text-[13px] text-ink-muted">{SIN_CONTENIDO}</p>}
        </SectionCard>
      )
    case 'campos':
      return (
        <div className={cn('grid gap-4', b.columnas === 2 && 'sm:grid-cols-2')}>
          {b.campos.map((c) => <VerCampo key={c.id} c={c} ancho={b.columnas === 2 && c.clase === 'textarea' ? 'sm:col-span-2' : undefined} />)}
        </div>
      )
    case 'pills':
      return <div className="flex flex-wrap gap-1.5">{b.items.map((x, i) => <Pill key={i} tone={x.tone}>{x.label}</Pill>)}</div>
    case 'stats':
      return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {b.items.map((x, i) => <StatCard key={i} title={x.titulo} value={x.valor} delta={x.delta} icon={ICONOS[x.icono]} />)}
        </div>
      )
    case 'detalles':
      return <InfoBlock className="mt-0" title={b.titulo} items={b.items.map((x) => ({ icon: ICONOS[x.icono], label: x.label, value: x.valor }))} onEdit={() => {}} />
    case 'tabla':
      return (
        <DataTable
          key={`${b.porPagina}-${b.filas}`}
          rows={PACIENTES.slice(0, b.filas)}
          rowKey={(p) => p.id}
          rowLabel={(p) => p.name}
          columns={b.columnas.map((c) => COLUMNAS[c].col)}
          search={b.buscador ? { placeholder: 'Search patients', match: (p, q) => p.name.toLowerCase().includes(q.toLowerCase()) } : undefined}
          selectable={b.seleccion}
          rowActions={b.acciones ? () => (
            <>
              <DropdownMenuItem><Pencil className="size-4 shrink-0" /> Edit patient</DropdownMenuItem>
              <DropdownMenuItem variant="destructive"><Trash2 className="size-4 shrink-0" /> Delete patient</DropdownMenuItem>
            </>
          ) : undefined}
          density={b.compacta ? 'compact' : 'regular'}
          pageSize={b.porPagina}
          itemLabel="patients"
        />
      )
    case 'vacio': {
      const I = ICONOS[b.icono]
      return <EmptyState icon={I ?? undefined} title={b.titulo} detail={b.detalle || undefined} accion={b.accion ? { label: b.accion, onClick: () => {} } : undefined} />
    }
    case 'opciones':
      if (b.control === 'checkbox') return <CasillasVivas key={b.items.map((i) => i.label).join()} b={b} />
      return (
        <div className="flex flex-col gap-3">
          {b.items.map((i) => (
            <label key={i.label} className="flex items-center justify-between gap-4 text-[13px] text-ink">
              {i.label}
              <Switch key={String(i.on)} defaultChecked={i.on} aria-label={i.label} />
            </label>
          ))}
        </div>
      )
    case 'turnos':
      return <div className="flex flex-col gap-2">{TURNOS.slice(0, b.cantidad).map((a) => <AppointmentCard key={a.name} appt={a} compact />)}</div>
    case 'pago':
      return <PagoVivo key={`${b.metodos}-${b.varios}`} b={b} />
    case 'calendario':
      return <CalendarioVivo key={b.vista} b={b} />
    case 'horarios':
      return <HorariosVivos b={b} />
    case 'tareas':
      return <div className="grid gap-3 sm:grid-cols-2">{TAREAS.slice(0, b.cantidad).map((t) => <PendingTaskCard key={t.kind} task={t} />)}</div>
    case 'divisor':
      return <hr className="border-line-row" />
  }
}

export const ANCHOS = { angosto: 420, medio: 680, completo: null } as const

export function VerDiseno({ d }: { d: Diseno }) {
  const hijos = d.bloques.map((b) => <VerBloque key={b.id} b={b} contenedor={d.contenedor} />)
  if (d.contenedor === 'panel') return <Panel title={d.tituloPanel || 'Panel'}>{hijos}</Panel>
  if (d.contenedor === 'page') return <div className={cn(CONTENEDOR_PAGINA, 'flex flex-col gap-6')}>{hijos}</div>
  return <Card className="flex flex-col gap-5 p-5">{hijos}</Card>
}

/* ── Cómo se escribe ────────────────────────────────────────────────── */

type Codigo = { imports: Map<string, Set<string>>; estado: string[]; datos: string[]; cuenta: Record<string, number> }

/* Un texto como literal de JS con comillas simples, como el resto del código. */
const comillas = (s: string) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
const arreglo = (xs: string[]) => `[${xs.map(comillas).join(', ')}]`
const valorAttr = (s: string) => (/["{}<>\\]/.test(s) ? `{${comillas(s)}}` : `"${s}"`)
const texto = (s: string) => (/[{}<>]/.test(s) ? `{${comillas(s)}}` : s)
const importar = (c: Codigo, desde: string, ...nombres: string[]) => {
  const s = c.imports.get(desde) ?? new Set<string>()
  nombres.forEach((x) => s.add(x))
  c.imports.set(desde, s)
}
const conIcono = (c: Codigo, icono: NombreIcono, label: string) => {
  if (icono === 'none') return texto(label)
  importar(c, 'lucide-react', icono)
  return `<${icono} /> ${texto(label)}`
}
const sangrar = (lineas: string[], n: number) => lineas.map((l) => (l ? ' '.repeat(n) + l : l))

/* Un estado propio por bloque que lo necesita: pestana, pestana2… */
function estado(c: Codigo, base: string, inicial: string) {
  const k = c.cuenta[base] ?? 0
  c.cuenta[base] = k + 1
  const v = k ? `${base}${k + 1}` : base
  const set = `set${v[0]!.toUpperCase()}${v.slice(1)}`
  importar(c, 'react', 'useState')
  c.estado.push(`const [${v}, ${set}] = useState${inicial}`)
  return [v, set] as const
}

function codigoCampo(c: Codigo, f: Campo, extra?: string): string {
  if (f.clase === 'calendar') {
    importar(c, '@/components/patients/form', 'FieldLabel')
    importar(c, '@/components/ui/date-picker', 'DatePicker')
    const [v, set] = estado(c, 'fecha', '<Date | null>(null)')
    return `<div className="flex flex-col gap-2"><FieldLabel${f.required ? ' required' : ''}>${texto(f.label)}</FieldLabel><DatePicker value={${v}} onChange={${set}} className="h-9 w-full" /></div>`
  }
  const comp = { text: 'TextField', select: 'SelectField', date: 'DateTextField', textarea: 'TextArea', search: 'SearchField' }[f.clase]
  importar(c, '@/components/patients/form', comp)
  let s = `<${comp} label=${valorAttr(f.label)}`
  if (f.placeholder && f.clase !== 'date') s += ` placeholder=${valorAttr(f.placeholder)}`
  if ((f.clase === 'select' || f.clase === 'search') && lista(f.opciones).length) s += ` options={${arreglo(lista(f.opciones))}}`
  if (f.required) s += ' required'
  if (f.disabled) s += ' disabled'
  if (f.hint) s += ` hint=${valorAttr(f.hint)}`
  if (f.error) s += ` error=${valorAttr(f.error)}`
  if (extra) s += ` className="${extra}"`
  return `${s} />`
}

/* Los bloques de adentro de un contenedor, en una columna. */
function codigoHijos(c: Codigo, bloques: Bloque[], gap = 'gap-4'): string[] {
  if (!bloques.length) return [`<p className="text-[13px] text-ink-muted">${SIN_CONTENIDO}</p>`]
  return [`<div className="flex flex-col ${gap}">`, ...sangrar(bloques.flatMap((x) => codigoBloque(c, x, 'card')), 2), `</div>`]
}

function codigoBloque(c: Codigo, b: Bloque, contenedor: TipoContenedor): string[] {
  switch (b.tipo) {
    case 'encabezado': {
      if (b.accion) importar(c, '@/components/ui/button', 'Button')
      const accion = b.accion ? `<Button size="md">${conIcono(c, b.icono, b.accion)}</Button>` : ''
      if (contenedor === 'page') {
        importar(c, '@/components/settings/SettingsPageHeader', 'SettingsPageHeader')
        return [`<SettingsPageHeader`, `  titulo=${valorAttr(b.titulo)}`, `  bajada=${valorAttr(b.bajada)}`, ...(accion ? [`  accion={${accion}}`] : []), `/>`]
      }
      importar(c, '@/components/ui/card', 'CardTitle', ...(b.bajada ? ['CardDescription'] : []))
      return [
        `<div className="flex items-start justify-between gap-3">`,
        `  <div>`,
        `    <CardTitle>${texto(b.titulo)}</CardTitle>`,
        ...(b.bajada ? [`    <CardDescription>${texto(b.bajada)}</CardDescription>`] : []),
        `  </div>`,
        ...(accion ? [`  ${accion}`] : []),
        `</div>`,
      ]
    }
    case 'texto':
      return [`<p className="${b.tono === 'suave' ? 'text-[13px] text-ink-muted' : 'text-sm text-ink'}">${texto(b.texto)}</p>`]
    case 'botones':
      importar(c, '@/components/ui/button', 'Button')
      return [
        `<div className="flex flex-wrap items-center gap-2 ${ALINEAR[b.alinear]}">`,
        ...b.botones.map((x) => {
          const props = [x.variant !== 'primary' && `variant="${x.variant}"`, x.size !== 'lg' && `size="${x.size}"`].filter(Boolean).join(' ')
          return `  <Button${props ? ` ${props}` : ''}>${conIcono(c, x.icono, x.label)}</Button>`
        }),
        `</div>`,
      ]
    case 'pestanas': {
      const tabs = lista(b.tabs)
      importar(c, '@/components/ui/tabs', 'Tabs')
      const [v, set] = estado(c, 'pestana', `(${comillas(tabs[0] ?? '')})`)
      const props = [b.size === 'sm' && 'size="sm"', b.fullWidth && 'fullWidth'].filter(Boolean).join(' ')
      return [`<Tabs tabs={${arreglo(tabs)}} value={${v}} onChange={${set}}${props ? ` ${props}` : ''} />`]
    }
    case 'pestanasContenido': {
      if (!b.pestanas.length) return []
      importar(c, '@/components/ui/tabs', 'Tabs')
      const labels = b.pestanas.map((p) => p.label)
      const [v, set] = estado(c, 'pestana', `(${comillas(labels[0] ?? '')})`)
      const props = [b.size === 'sm' && 'size="sm"', b.fullWidth && 'fullWidth'].filter(Boolean).join(' ')
      return [
        `<div className="flex flex-col gap-4">`,
        `  <Tabs tabs={${arreglo(labels)}} value={${v}} onChange={${set}}${props ? ` ${props}` : ''} />`,
        ...b.pestanas.flatMap((p) => [`  {${v} === ${comillas(p.label)} && (`, ...sangrar(codigoHijos(c, p.bloques), 4), `  )}`]),
        `</div>`,
      ]
    }
    case 'modal': {
      importar(c, '@/components/ui/button', 'Button')
      importar(c, '@/components/patients/form', 'ModalShell')
      const [v, set] = estado(c, 'abierto', '(false)')
      const cerrar = `() => ${set}(false)`
      let pie: string
      if (b.peligro) {
        pie = `<><Button variant="secondary" onClick={${cerrar}}>${texto(b.cancelar)}</Button><Button variant="destructive" onClick={${cerrar}}>${texto(b.confirmar)}</Button></>`
      } else {
        importar(c, '@/components/patients/form', 'FormFooter')
        pie = `<FormFooter onCancel={${cerrar}} onSave={${cerrar}}${b.cancelar !== 'Cancel' ? ` cancelLabel=${valorAttr(b.cancelar)}` : ''}${b.confirmar !== 'Save' ? ` saveLabel=${valorAttr(b.confirmar)}` : ''} />`
      }
      return [
        `<div>`,
        `  <Button${b.peligro ? ' variant="destructive"' : ''} onClick={() => ${set}(true)}>${texto(b.disparador)}</Button>`,
        `</div>`,
        `{${v} && (`,
        `  <ModalShell`,
        `    title=${valorAttr(b.titulo)}`,
        ...(ANCHO_MODAL[b.ancho] ? [`    width="${ANCHO_MODAL[b.ancho]}"`] : []),
        `    onClose={${cerrar}}`,
        `    footer={${pie}}`,
        `  >`,
        ...sangrar(codigoHijos(c, b.bloques, 'gap-5'), 4),
        `  </ModalShell>`,
        `)}`,
      ]
    }
    case 'seccion':
      importar(c, '@/components/patients/form', 'SectionCard')
      return [
        `<SectionCard title=${valorAttr(b.titulo)}>`,
        ...sangrar(b.bloques.length ? b.bloques.flatMap((x) => codigoBloque(c, x, 'card')) : [`<p className="text-[13px] text-ink-muted">${SIN_CONTENIDO}</p>`], 2),
        `</SectionCard>`,
      ]
    case 'campos':
      return [
        `<div className="grid gap-4${b.columnas === 2 ? ' sm:grid-cols-2' : ''}">`,
        ...b.campos.map((f) => `  ${codigoCampo(c, f, b.columnas === 2 && f.clase === 'textarea' ? 'sm:col-span-2' : undefined)}`),
        `</div>`,
      ]
    case 'pills':
      importar(c, '@/components/ui/pill', 'Pill')
      return [`<div className="flex flex-wrap gap-1.5">`, ...b.items.map((x) => `  <Pill tone="${x.tone}">${texto(x.label)}</Pill>`), `</div>`]
    case 'stats':
      importar(c, '@/components/dashboard/StatCard', 'StatCard')
      b.items.forEach((x) => importar(c, 'lucide-react', x.icono))
      return [
        `<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">`,
        ...b.items.map((x) => `  <StatCard title=${valorAttr(x.titulo)} value=${valorAttr(x.valor)} delta=${valorAttr(x.delta)} icon={${x.icono}} />`),
        `</div>`,
      ]
    case 'detalles':
      importar(c, '@/components/patients/PatientSidePanel', 'InfoBlock')
      b.items.forEach((x) => importar(c, 'lucide-react', x.icono))
      return [
        `<InfoBlock`,
        `  className="mt-0"`,
        `  title=${valorAttr(b.titulo)}`,
        `  items={[`,
        ...b.items.map((x) => `    { icon: ${x.icono}, label: ${comillas(x.label)}, value: ${comillas(x.valor)} },`),
        `  ]}`,
        `  onEdit={() => {}}`,
        `/>`,
      ]
    case 'tabla': {
      importar(c, '@/components/ui/data-table', 'DataTable', ...(b.columnas.includes('patient') ? ['PersonCell'] : []), ...(b.columnas.some((x) => x === 'next' || x === 'provider') ? ['TextCell'] : []), ...(b.columnas.includes('balance') ? ['AmountCell'] : []))
      if (b.columnas.includes('status')) importar(c, '@/components/ui/pill', 'Pill')
      if (!c.datos.some((d) => d.startsWith('const pacientes'))) {
        c.datos.push([
          `const pacientes = [`,
          ...PACIENTES.slice(0, b.filas).map((p) => `  { id: ${comillas(p.id)}, name: ${comillas(p.name)}, initials: ${comillas(p.initials)}, status: ${comillas(p.status)}, next: ${comillas(p.next)}, provider: ${comillas(p.provider)}, balance: ${p.balance} },`),
          `]`,
        ].join('\n'))
      }
      const lineas = [`<DataTable`, `  rows={pacientes}`, `  rowKey={(p) => p.id}`, `  rowLabel={(p) => p.name}`, `  columns={[`, ...b.columnas.map((x) => `    ${COLUMNAS[x].codigo},`), `  ]}`]
      if (b.buscador) lineas.push(`  search={{ placeholder: 'Search patients', match: (p, q) => p.name.toLowerCase().includes(q.toLowerCase()) }}`)
      if (b.seleccion) lineas.push(`  selectable`)
      if (b.acciones) {
        importar(c, '@/components/ui/dropdown-menu', 'DropdownMenuItem')
        importar(c, 'lucide-react', 'Pencil', 'Trash2')
        lineas.push(
          `  rowActions={() => (`,
          `    <>`,
          `      <DropdownMenuItem><Pencil className="size-4 shrink-0" /> Edit patient</DropdownMenuItem>`,
          `      <DropdownMenuItem variant="destructive"><Trash2 className="size-4 shrink-0" /> Delete patient</DropdownMenuItem>`,
          `    </>`,
          `  )}`,
        )
      }
      if (b.compacta) lineas.push(`  density="compact"`)
      if (b.porPagina !== 10) lineas.push(`  pageSize={${b.porPagina}}`)
      lineas.push(`  itemLabel="patients"`, `/>`)
      return lineas
    }
    case 'vacio':
      importar(c, '@/components/ui/empty-state', 'EmptyState')
      if (b.icono !== 'none') importar(c, 'lucide-react', b.icono)
      return [
        `<EmptyState`,
        ...(b.icono !== 'none' ? [`  icon={${b.icono}}`] : []),
        `  title=${valorAttr(b.titulo)}`,
        ...(b.detalle ? [`  detail=${valorAttr(b.detalle)}`] : []),
        ...(b.accion ? [`  accion={{ label: ${comillas(b.accion)}, onClick: () => {} }}`] : []),
        `/>`,
      ]
    case 'opciones':
      if (b.control === 'checkbox') {
        importar(c, '@/components/ui/checkbox', 'Checkbox')
        const [v, set] = estado(c, 'marcados', `<string[]>(${arreglo(b.items.filter((i) => i.on).map((i) => i.label))})`)
        return [
          `<div className="flex flex-col gap-3">`,
          ...b.items.flatMap((i) => {
            const l = comillas(i.label)
            return [
              `  <label className="flex items-center gap-2.5 text-[13px] text-ink">`,
              `    <Checkbox label=${valorAttr(i.label)} on={${v}.includes(${l})} onChange={(on) => ${set}((m) => (on ? [...m, ${l}] : m.filter((x) => x !== ${l})))} />`,
              `    ${texto(i.label)}`,
              `  </label>`,
            ]
          }),
          `</div>`,
        ]
      }
      importar(c, '@/components/ui/switch', 'Switch')
      return [
        `<div className="flex flex-col gap-3">`,
        ...b.items.flatMap((i) => [
          `  <label className="flex items-center justify-between gap-4 text-[13px] text-ink">`,
          `    ${texto(i.label)}`,
          `    <Switch${i.on ? ' defaultChecked' : ''} aria-label=${valorAttr(i.label)} />`,
          `  </label>`,
        ]),
        `</div>`,
      ]
    case 'turnos':
      importar(c, '@/components/dashboard/AppointmentCard', 'AppointmentCard')
      if (!c.datos.some((d) => d.startsWith('const turnos'))) {
        c.datos.push([`const turnos = [`, ...TURNOS.slice(0, b.cantidad).map((a) => `  { name: ${comillas(a.name)}, initials: ${comillas(a.initials)}, provider: ${comillas(a.provider)}, operatory: ${comillas(a.operatory)}, time: ${comillas(a.time)} },`), `]`].join('\n'))
      }
      return [`<div className="flex flex-col gap-2">`, `  {turnos.map((t) => <AppointmentCard key={t.name} appt={t} compact />)}`, `</div>`]
    case 'pago': {
      const metodos = lista(b.metodos)
      const aplicar = lista(b.aplicarA)
      importar(c, 'lucide-react', 'CreditCard')
      importar(c, '@/components/patients/form', 'SelectField', 'TextField')
      const [v, set] = estado(c, 'pagos', `([{ id: 0, monto: '', metodo: ${comillas(metodos[0] ?? '')}, detalle: '', banco: '' }])`)
      const cambiar = `cambiar${v[0]!.toUpperCase()}${v.slice(1)}`
      c.estado.push(`const ${cambiar} = (id: number, cambio: Partial<(typeof ${v})[number]>) => ${set}((ps) => ps.map((x) => (x.id === id ? { ...x, ...cambio } : x)))`)
      if (b.total) c.estado.push(`const ${v}Total = ${v}.reduce((t, x) => t + (Number(x.monto.replace(/[^0-9.]/g, '')) || 0), 0)`)
      const lineas = [`<div className="flex flex-col gap-4">`, `  <h3 className="flex items-center gap-2 text-sm font-bold text-ink"><CreditCard className="size-4" /> ${texto(b.titulo)}</h3>`]
      if (b.fecha || aplicar.length) {
        lineas.push(`  <div className="grid gap-4 sm:grid-cols-2">`)
        if (b.fecha) {
          importar(c, '@/components/patients/form', 'FieldLabel')
          importar(c, '@/components/ui/date-picker', 'DatePicker')
          const [f, setF] = estado(c, 'fecha', '<Date | null>(null)')
          lineas.push(`    <div className="flex flex-col gap-2">`, `      <FieldLabel required>Transaction date</FieldLabel>`, `      <DatePicker value={${f}} onChange={${setF}} className="h-9 w-full" />`, `    </div>`)
        }
        if (aplicar.length) lineas.push(`    <SelectField label="Apply to" required options={${arreglo(aplicar)}} />`)
        lineas.push(`  </div>`)
      }
      const campo = (label: string, clave: string, extra: string) => `<TextField label="${label}"${extra} value={p.${clave}} onChange={(v) => ${cambiar}(p.id, { ${clave}: v })} />`
      lineas.push(
        `  {${v}.map((p${b.varios ? ', i' : ''}) => (`,
        `    <div key={p.id} className="flex items-start gap-2">`,
        `      <div className="grid flex-1 gap-4 sm:grid-cols-2">`,
        `        ${campo('Amount', 'monto', ' required placeholder="$ 0.00"')}`,
        `        <SelectField label="Payment method" required options={${arreglo(metodos)}} value={p.metodo} onChange={(v) => ${cambiar}(p.id, { metodo: v })} />`,
      )
      if (metodos.includes('Check payment')) lineas.push(`        {p.metodo === 'Check payment' && (`, `          <>`, `            ${campo('Check number', 'detalle', ' required placeholder="1234"')}`, `            ${campo('Bank/Branch', 'banco', ' required placeholder="AE9323AMB"')}`, `          </>`, `        )}`)
      if (metodos.includes('Card payment')) lineas.push(`        {p.metodo === 'Card payment' && ${campo('Card last 4 digits', 'detalle', ' placeholder="4242"')}}`)
      if (metodos.includes('Electronic payment')) lineas.push(`        {p.metodo === 'Electronic payment' && ${campo('Reference', 'detalle', ' placeholder="TRX-20250312"')}}`)
      lineas.push(`      </div>`)
      if (b.varios) {
        importar(c, '@/components/ui/button', 'Button')
        importar(c, 'lucide-react', 'Plus', 'X')
        lineas.push(
          `      {i === ${v}.length - 1 ? (`,
          `        <Button variant="secondary" iconOnly aria-label="Add another payment method" className="mt-7" onClick={() => ${set}((ps) => [...ps, { id: Math.max(...ps.map((x) => x.id)) + 1, monto: '', metodo: ${comillas(metodos[0] ?? '')}, detalle: '', banco: '' }])}>`,
          `          <Plus />`,
          `        </Button>`,
          `      ) : (`,
          `        <Button variant="secondary" iconOnly aria-label="Remove this payment method" className="mt-7" onClick={() => ${set}((ps) => ps.filter((x) => x.id !== p.id))}>`,
          `          <X />`,
          `        </Button>`,
          `      )}`,
        )
      }
      lineas.push(`    </div>`, `  ))}`)
      if (b.notas) {
        importar(c, '@/components/patients/form', 'TextArea')
        lineas.push(`  <TextArea label="Notes" placeholder="Anything the front desk should know" />`)
      }
      if (b.total) lineas.push(
        `  <div className="flex items-center justify-between rounded-lg bg-surface-subtle px-4 py-3">`,
        `    <span className="text-[13px] text-ink-muted">Total payment</span>`,
        `    <span className="text-[15px] font-semibold text-ink tabular-nums">{${v}Total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>`,
        `  </div>`,
      )
      lineas.push(`</div>`)
      return lineas
    }
    case 'calendario': {
      importar(c, '@/components/scheduling/calendar-data', 'EVENTOS_INICIALES', 'FECHA_ANCLA')
      const vistas = b.selector ? (['Day', 'Week', 'Month'] as const) : [b.vista]
      const COMP = { Day: 'VistaDia', Week: 'VistaSemana', Month: 'VistaMes' } as const
      importar(c, '@/components/scheduling/CalendarViews', ...vistas.map((x) => COMP[x]), ...(b.selector ? ['type Vista'] : []))
      const [ev, setEv] = estado(c, 'eventos', '(EVENTOS_INICIALES)')
      const mover = `mover${ev[0]!.toUpperCase()}${ev.slice(1)}`
      c.estado.push(`const ${mover} = (i: number, fecha: Date, start?: number) => ${setEv}((es) => es.map((e, k) => (k === i ? { ...e, fecha, start: start ?? e.start } : e)))`)
      const props = `eventos={${ev}} fecha={FECHA_ANCLA} onMover={${mover}} onAbrir={() => {}}`
      const lineas = [`<div className="flex min-w-0 flex-col gap-3">`]
      let vista = ''
      if (b.selector || b.leyenda) {
        lineas.push(`  <div className="flex flex-wrap items-center justify-between gap-3">`)
        if (b.selector) {
          importar(c, '@/components/ui/tabs', 'Tabs')
          const [v, set] = estado(c, 'vista', `<Vista>(${comillas(b.vista)})`)
          vista = v
          lineas.push(`    <Tabs tabs={['Day', 'Week', 'Month'] as const} value={${v}} onChange={${set}} />`)
        }
        if (b.leyenda) {
          importar(c, '@/components/scheduling/StatusLegend', 'StatusLegend')
          lineas.push(`    <StatusLegend />`)
        }
        lineas.push(`  </div>`)
      }
      if (vista) vistas.forEach((x) => lineas.push(`  {${vista} === '${x}' && <${COMP[x]} ${props} />}`))
      else lineas.push(`  <${COMP[b.vista]} ${props} />`)
      lineas.push(`</div>`)
      return lineas
    }
    case 'horarios': {
      importar(c, '@/components/scheduling/AppointmentSlotPicker', 'AppointmentSlotPicker')
      const [v, set] = estado(c, 'hora', '<string | undefined>()')
      return [
        `<AppointmentSlotPicker`,
        `  provider=${valorAttr(b.provider)}`,
        `  especialidad=${valorAttr(b.especialidad)}`,
        `  fecha=${valorAttr(b.fecha)}`,
        `  seleccion={${v}}`,
        `  onPick={${set}}`,
        `  className="h-[440px]"`,
        `/>`,
      ]
    }
    case 'tareas':
      importar(c, '@/components/dashboard/PendingTaskCard', 'PendingTaskCard')
      if (!c.datos.some((d) => d.startsWith('const tareas'))) {
        c.datos.push([`const tareas = [`, ...TAREAS.slice(0, b.cantidad).map((t) => `  { kind: ${comillas(t.kind)}, state: ${comillas(t.state)}, person: ${comillas(t.person)}, initials: ${comillas(t.initials)}, register: ${comillas(t.register)}, expiration: ${comillas(t.expiration)} },`), `]`].join('\n'))
      }
      return [`<div className="grid gap-3 sm:grid-cols-2">`, `  {tareas.map((t) => <PendingTaskCard key={t.kind} task={t} />)}`, `</div>`]
    case 'divisor':
      return [`<hr className="border-line-row" />`]
  }
}

export const nombreComponente = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9 ]/g, ' ').split(/\s+/).filter(Boolean).map((w) => w[0]!.toUpperCase() + w.slice(1)).join('') || 'MyComponent'

const ORDEN_IMPORTS = (a: string) => (a === 'react' ? 0 : a === 'lucide-react' ? 1 : 2)

export function generarCodigo(d: Diseno): string {
  const c: Codigo = { imports: new Map(), estado: [], datos: [], cuenta: {} }
  const cuerpo = d.bloques.flatMap((b) => codigoBloque(c, b, d.contenedor))
  let abre: string
  let cierra: string
  if (d.contenedor === 'panel') {
    importar(c, '@/components/dashboard/primitives', 'Panel')
    abre = `<Panel title=${valorAttr(d.tituloPanel || 'Panel')}>`
    cierra = `</Panel>`
  } else if (d.contenedor === 'page') {
    importar(c, '@/lib/estilos', 'CONTENEDOR_PAGINA')
    importar(c, '@/lib/utils', 'cn')
    abre = `<div className={cn(CONTENEDOR_PAGINA, 'flex flex-col gap-6')}>`
    cierra = `</div>`
  } else {
    importar(c, '@/components/ui/card', 'Card')
    abre = `<Card className="flex flex-col gap-5 p-5">`
    cierra = `</Card>`
  }
  const imports = [...c.imports]
    .sort(([a], [b]) => ORDEN_IMPORTS(a) - ORDEN_IMPORTS(b) || a.localeCompare(b))
    .map(([desde, nombres]) => `import { ${[...nombres].sort((a, b) => a.replace(/^type /, '').localeCompare(b.replace(/^type /, ''))).join(', ')} } from '${desde}'`)
  const jsx = cuerpo.length ? cuerpo : ['{/* Sumá bloques desde el constructor. */}']
  return [
    ...imports,
    '',
    ...c.datos.flatMap((x) => [x, '']),
    `export function ${nombreComponente(d.nombre)}() {`,
    ...c.estado.map((l) => `  ${l}`),
    ...(c.estado.length ? [''] : []),
    `  return (`,
    `    ${abre}`,
    ...sangrar(jsx, 6),
    `    ${cierra}`,
    `  )`,
    `}`,
    '',
  ].join('\n')
}

/* ── Puntos de partida ──────────────────────────────────────────────── */

const encabezado = (titulo: string, bajada: string, accion = '', icono: NombreIcono = 'none'): Bloque => ({ id: nuevoId(), tipo: 'encabezado', titulo, bajada, accion, icono })

export const PLANTILLAS: { nombre: string; que: string; crear: () => Diseno }[] = [
  {
    nombre: 'Settings form', que: 'Una card con un formulario y sus botones',
    crear: () => ({
      nombre: 'Clinic details card', contenedor: 'card', tituloPanel: '', ancho: 'medio',
      bloques: [
        encabezado('Clinic details', 'Name and contact shown to patients.'),
        { id: nuevoId(), tipo: 'campos', columnas: 2, campos: [
          campo({ label: 'Clinic name', placeholder: 'Red Dental Studio', required: true }),
          campo({ label: 'Phone', placeholder: '(555) 234-5678' }),
          campo({ clase: 'select', label: 'Timezone', placeholder: 'Select timezone', opciones: 'UTC-3 Buenos Aires, UTC-5 New York, UTC-8 Los Angeles' }),
          campo({ clase: 'date', label: 'Opening date' }),
          campo({ clase: 'textarea', label: 'Address', placeholder: '123 Biscayne Blvd, Miami', hint: 'Patients see it in their reminders.' }),
        ] },
        { id: nuevoId(), tipo: 'botones', alinear: 'fin', botones: [{ label: 'Cancel', variant: 'secondary', size: 'lg', icono: 'none' }, { label: 'Save changes', variant: 'primary', size: 'lg', icono: 'Save' }] },
      ],
    }),
  },
  {
    nombre: 'Modal form', que: 'Un botón que abre un modal con un formulario',
    crear: () => ({
      nombre: 'Rooms card', contenedor: 'card', tituloPanel: '', ancho: 'medio',
      bloques: [
        encabezado('Rooms', 'Where appointments happen in this location.'),
        { id: nuevoId(), tipo: 'pills', items: [{ label: '3 available', tone: 'success' }, { label: '1 in maintenance', tone: 'warning' }] },
        { id: nuevoId(), tipo: 'modal', titulo: 'New room', disparador: 'Add room', ancho: 'md', confirmar: 'Save room', cancelar: 'Cancel', peligro: false, bloques: [
          { id: nuevoId(), tipo: 'campos', columnas: 2, campos: [
            campo({ label: 'Room name', placeholder: 'Operatory 4', required: true }),
            campo({ clase: 'select', label: 'Type', placeholder: 'Select type', opciones: 'Operatory, Consultation, X-ray' }),
          ] },
          { id: nuevoId(), tipo: 'opciones', control: 'switch', items: [{ label: 'Available for online booking', on: true }] },
        ] },
      ],
    }),
  },
  {
    nombre: 'Patient tabs', que: 'Pestañas, cada una con su contenido',
    crear: () => ({
      nombre: 'Patient overview card', contenedor: 'card', tituloPanel: '', ancho: 'medio',
      bloques: [
        encabezado('Maria Abril Viola', 'Patient since March 2021.', 'Edit', 'Pencil'),
        { id: nuevoId(), tipo: 'pestanasContenido', size: 'md', fullWidth: false, pestanas: [
          pestana('Details', [{ id: nuevoId(), tipo: 'detalles', titulo: 'Contact', items: [{ icono: 'Phone', label: 'Phone', valor: '(555) 234-5678' }, { icono: 'Mail', label: 'Email', valor: 'maria.viola@mail.com' }, { icono: 'MapPin', label: 'Address', valor: '123 Biscayne Blvd' }] }]),
          pestana('Appointments', [{ id: nuevoId(), tipo: 'turnos', cantidad: 3 }]),
          pestana('Tasks', [{ id: nuevoId(), tipo: 'tareas', cantidad: 2 }]),
        ] },
      ],
    }),
  },
  {
    nombre: 'Delete confirm', que: 'Un modal que confirma algo que no se puede deshacer',
    crear: () => ({
      nombre: 'Delete patient', contenedor: 'card', tituloPanel: '', ancho: 'angosto',
      bloques: [
        encabezado('Danger zone', 'Deleting a patient removes their records from this location.'),
        { id: nuevoId(), tipo: 'modal', titulo: 'Delete Maria Abril Viola?', disparador: 'Delete patient', ancho: 'sm', confirmar: 'Delete patient', cancelar: 'Cancel', peligro: true, bloques: [
          { id: nuevoId(), tipo: 'texto', texto: 'Their appointments, ledger and documents will be removed. This cannot be undone.', tono: 'normal' },
        ] },
      ],
    }),
  },
  {
    nombre: 'Patient payment', que: 'Registrar un pago con uno o varios métodos',
    crear: () => ({
      nombre: 'New payment card', contenedor: 'card', tituloPanel: '', ancho: 'medio',
      bloques: [
        encabezado('New payment', 'Record what the patient paid today.'),
        infoDe('pago').nuevo(),
        { id: nuevoId(), tipo: 'botones', alinear: 'fin', botones: [{ label: 'Cancel', variant: 'secondary', size: 'lg', icono: 'none' }, { label: 'Save payment', variant: 'primary', size: 'lg', icono: 'none' }] },
      ],
    }),
  },
  {
    nombre: 'Schedule', que: 'La agenda con día, semana y mes',
    crear: () => ({
      nombre: 'Schedule screen', contenedor: 'page', tituloPanel: '', ancho: 'completo',
      bloques: [
        encabezado('Scheduling', 'Drag an appointment to move it to another time or day.', 'New appointment', 'Plus'),
        infoDe('calendario').nuevo(),
      ],
    }),
  },
  {
    nombre: 'Book appointment', que: 'Un modal con los datos del turno y la hora',
    crear: () => ({
      nombre: 'Book appointment card', contenedor: 'card', tituloPanel: '', ancho: 'angosto',
      bloques: [
        encabezado('Appointments', 'Book a visit for this patient.'),
        { id: nuevoId(), tipo: 'modal', titulo: 'New appointment', disparador: 'New appointment', ancho: 'lg', confirmar: 'Book appointment', cancelar: 'Cancel', peligro: false, bloques: [
          { id: nuevoId(), tipo: 'campos', columnas: 2, campos: [
            campo({ clase: 'search', label: 'Patient', placeholder: 'Search a patient', opciones: 'Maria Abril Viola, Noah James Smith, Elias Aguirre', required: true }),
            campo({ clase: 'select', label: 'Provider', placeholder: 'Select provider', opciones: 'Sarah Stone, Dr. Elena Martinez, Dr. Emily Chen', required: true }),
            campo({ clase: 'calendar', label: 'Visit date', required: true }),
            campo({ clase: 'select', label: 'Operatory', placeholder: 'Select operatory', opciones: 'Operatory 1, Operatory 2, Operatory 3' }),
          ] },
          infoDe('horarios').nuevo(),
        ] },
      ],
    }),
  },
  {
    nombre: 'Patient list', que: 'Una pantalla con encabezado, pestañas y tabla',
    crear: () => ({
      nombre: 'Patients screen', contenedor: 'page', tituloPanel: '', ancho: 'completo',
      bloques: [
        encabezado('Patients', 'Everyone registered in this location.', 'New patient', 'Plus'),
        { id: nuevoId(), tipo: 'pestanas', tabs: 'All, Active, Inactive', size: 'md', fullWidth: false },
        { id: nuevoId(), tipo: 'tabla', columnas: ['patient', 'status', 'next', 'provider', 'balance'], filas: 8, buscador: true, seleccion: true, acciones: true, compacta: false, porPagina: 5 },
      ],
    }),
  },
  {
    nombre: 'Dashboard', que: 'Números clave y las tareas del día',
    crear: () => ({
      nombre: 'Clinic overview', contenedor: 'page', tituloPanel: '', ancho: 'completo',
      bloques: [
        encabezado('Good morning, Julian', 'Here is what is happening today.'),
        infoDe('stats').nuevo(),
        { id: nuevoId(), tipo: 'seccion', titulo: 'Pending tasks', bloques: [{ id: nuevoId(), tipo: 'tareas', cantidad: 4 }] },
      ],
    }),
  },
  {
    nombre: 'Empty panel', que: 'Un panel del Dashboard sin nada todavía',
    crear: () => ({
      nombre: 'Appointments panel', contenedor: 'panel', tituloPanel: 'Appointments', ancho: 'angosto',
      bloques: [{ id: nuevoId(), tipo: 'vacio', icono: 'CalendarDays', titulo: 'No appointments today', detalle: 'Your schedule is clear. Add an appointment or check pending requests.', accion: 'New appointment' }],
    }),
  },
  {
    nombre: 'Preferences', que: 'Opciones que se prenden y apagan',
    crear: () => ({
      nombre: 'Notification settings', contenedor: 'card', tituloPanel: '', ancho: 'angosto',
      bloques: [
        encabezado('Notifications', 'What patients receive before a visit.'),
        { id: nuevoId(), tipo: 'opciones', control: 'switch', items: [{ label: 'Email reminders', on: true }, { label: 'SMS confirmations', on: true }, { label: 'Online booking', on: false }] },
        { id: nuevoId(), tipo: 'divisor' },
        { id: nuevoId(), tipo: 'botones', alinear: 'fin', botones: [{ label: 'Save', variant: 'primary', size: 'md', icono: 'none' }] },
      ],
    }),
  },
  {
    nombre: 'Blank', que: 'Empezar de cero',
    crear: () => ({ nombre: 'My component', contenedor: 'card', tituloPanel: '', ancho: 'medio', bloques: [] }),
  },
]
