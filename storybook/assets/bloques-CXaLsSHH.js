import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { Component as ComponenteReact, createContext, useContext, useEffect, useLayoutEffect, useRef, useState, type ComponentType, type ReactNode } from 'react'
import { composeStory } from '@storybook/react-vite'
import { UNSAFE_LocationContext } from 'react-router-dom'
import {
  Activity, AppWindow, BarChart3, ChevronsRight, CircleAlert, CircleCheck, CircleUser, Columns3, Component, Contact, DoorOpen, Ellipsis, Info, ListOrdered, TriangleAlert, Upload, CalendarClock, CalendarDays, CalendarRange, Clock, CreditCard, Wallet, X, Download, FileText, Heading, IdCard, Inbox, ListChecks,
  Mail, MapPin, Minus, MousePointerClick, PanelsTopLeft, Pencil, Phone, Plus, Save, Search, Send, Settings, Shield, SquareStack,
  Pill as PillIcon, Smile, Table, Tag, TextCursorInput, ToggleRight, Trash2, Type, Users, type LucideIcon,
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
import { DataTable } from '@/components/ui/data-table'
import { Odontogram } from '@/components/clinical/Odontogram'
import { makeMockExam, type OralExam } from '@/data/odontogram'
import { COMPONENTE_CELDA, TONO_ESTADO, celda, codigoCelda, conjunto, type CampoDato, type IdConjunto } from './datos'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { EmptyState } from '@/components/ui/empty-state'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { AppointmentCard, type Appointment } from '@/components/dashboard/AppointmentCard'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'
import { Sidebar } from '@/components/layout/Sidebar'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { StepIndicator } from '@/components/clinical/StepIndicator'
import { Pagination } from '@/components/patients/ledger/Pagination'
import { SearchButton } from '@/components/ui/search-button'
import { FilterMenu } from '@/components/dashboard/FilterMenu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { StatStrip } from '@/components/dashboard/StatStrip'
import { OperatoryCard, type Operatory } from '@/components/dashboard/OperatoryCard'
import { PatientCard } from '@/components/patients/PatientCard'
import type { PatientRow } from '@/components/patients/PatientsTable'
import { Topbar } from '@/components/layout/Topbar'
import { HelpProvider } from '@/components/help/HelpProvider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

/* Los bloques del constructor. Cada uno sabe dibujarse con el componente
   real de la app (\`VerBloque\`) y escribir su código (\`codigoBloque\`), uno al
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
/** Una columna de tabla: un campo del conjunto de datos, con su título y ancho. */
export type ColumnaTabla = { id: string; campo: string; header: string; ancho: number | null }
/* Los colores con que se marca una superficie en el odontograma. */
export const MARCAS = { Caries: '#fe0000', Restoration: '#2563eb', Planned: '#f59e0b' } as const
export type Marca = keyof typeof MARCAS
export type Pestana = { id: string; label: string; bloques: Bloque[] }
export type Columna = { id: string; bloques: Bloque[] }
export type Tono = 'info' | 'success' | 'warning' | 'danger'
/* Cuánto ocupa cada columna, de izquierda a derecha. */
export const PROPORCIONES = { '1-1': '1fr 1fr', '1-2': '1fr 2fr', '2-1': '2fr 1fr', '1-3': '1fr 3fr', '3-1': '3fr 1fr', '1-1-1': '1fr 1fr 1fr', '1-1-1-1': '1fr 1fr 1fr 1fr' } as const
export type Proporcion = keyof typeof PROPORCIONES
export const columnasDe = (p: Proporcion) => p.split('-').length

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
  | { tipo: 'tabla'; datos: IdConjunto; columnas: ColumnaTabla[]; filas: number; buscador: boolean; seleccion: boolean; acciones: boolean; compacta: boolean; porPagina: number }
  | { tipo: 'odontograma'; ejemplo: boolean; marca: Marca }
  | { tipo: 'receta'; titulo: string; medicamentos: string; repeticiones: boolean; sustitucion: boolean; indicaciones: boolean }
  | { tipo: 'vacio'; icono: NombreIcono; titulo: string; detalle: string; accion: string }
  | { tipo: 'opciones'; control: 'switch' | 'checkbox'; items: { label: string; on: boolean }[] }
  | { tipo: 'turnos'; cantidad: number }
  | { tipo: 'tareas'; cantidad: number }
  | { tipo: 'pago'; titulo: string; fecha: boolean; aplicarA: string; metodos: string; varios: boolean; notas: boolean; total: boolean }
  | { tipo: 'calendario'; vista: Vista; selector: boolean; leyenda: boolean }
  | { tipo: 'horarios'; provider: string; especialidad: string; fecha: string }
  | { tipo: 'divisor' }
  | { tipo: 'columnas'; proporcion: Proporcion; columnas: Columna[] }
  | { tipo: 'migas'; items: string }
  | { tipo: 'pasos'; total: number; actual: number; etiquetas: string }
  | { tipo: 'paginacion'; paginas: number }
  | { tipo: 'busqueda'; placeholder: string; filtro: string; opcionesFiltro: string; accion: string }
  | { tipo: 'aviso'; tono: Tono; titulo: string; texto: string }
  | { tipo: 'persona'; nombre: string; detalle: string; estado: '' | 'Active' | 'Inactive'; grande: boolean }
  | { tipo: 'metricas'; apilada: boolean; items: { titulo: string; valor: string; nota: string; icono: IconoReal }[] }
  | { tipo: 'operatorios'; cantidad: number }
  | { tipo: 'pacientes'; cantidad: number }
  | { tipo: 'subir'; titulo: string; detalle: string; accion: string }
  /** Una pieza que ya existe en Confidentally UI (pantalla o componente), dibujada con su historia real. */
  | { tipo: 'pieza'; storyId: string; componente: string; ejemplo: string; lugar: string; archivo: string; pantalla: boolean; jsx?: string
      /** El archivo de historias: con él la pieza se dibuja sola en el lienzo. \`marco\`: va en un iframe (abre un diálogo o menú de Radix). */
      historia?: string; marco?: boolean }
)
export type TipoBloque = Bloque['tipo']
export type BloqueDe<T extends TipoBloque> = Extract<Bloque, { tipo: T }>

export type TipoContenedor = 'card' | 'panel' | 'page' | 'libre' | 'app'
export type Diseno = {
  nombre: string
  contenedor: TipoContenedor
  /** Título del Panel (el de los paneles del Dashboard). */
  tituloPanel: string
  ancho: 'angosto' | 'medio' | 'completo'
  bloques: Bloque[]
}

let n = 0
export const nuevoId = () => \`b\${Date.now().toString(36)}\${(n++).toString(36)}\`

export const campo = (c: Partial<Campo> = {}): Campo => ({
  id: nuevoId(), clase: 'text', label: 'Label', placeholder: '', opciones: '', hint: '', error: '', required: false, disabled: false, ...c,
})
export const pestana = (label: string, bloques: Bloque[] = []): Pestana => ({ id: nuevoId(), label, bloques })

/* Los bloques que tienen otros adentro, y cuáles. */
export function hijosDe(b: Bloque): Bloque[][] {
  if (b.tipo === 'modal' || b.tipo === 'seccion') return [b.bloques]
  if (b.tipo === 'pestanasContenido') return b.pestanas.map((p) => p.bloques)
  if (b.tipo === 'columnas') return b.columnas.map((c) => c.bloques)
  return []
}
export const contiene = (bloques: Bloque[], id: string): boolean =>
  bloques.some((b) => b.id === id || hijosDe(b).some((h) => contiene(h, id)))

/* Qué se puede poner adentro de qué: un modal no va adentro de otro bloque,
   y unas pestañas con contenido no van adentro de otras. */
export function permitidos(padre?: TipoBloque): TipoBloque[] {
  const todos: TipoBloque[] = [...TIPOS.map((t) => t.tipo), 'pieza']
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
    if (x.tipo === 'columnas') x.columnas = x.columnas.map((c) => ({ id: nuevoId(), bloques: c.bloques.map(recorrer) }))
    return x
  }
  return recorrer(JSON.parse(JSON.stringify(b)) as Bloque)
}

export type Grupo = 'Layout' | 'Forms' | 'Content' | 'Data' | 'Clinical'

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
  { tipo: 'columnas', grupo: 'Layout', nombre: 'Columns', que: 'Piezas una al lado de la otra, en 2 a 4 columnas', icono: Columns3, nuevo: () => ({ id: nuevoId(), tipo: 'columnas', proporcion: '1-1', columnas: [{ id: nuevoId(), bloques: [] }, { id: nuevoId(), bloques: [] }] }) },
  { tipo: 'seccion', grupo: 'Layout', nombre: 'Section', que: 'Un grupo con título, como en los formularios', icono: SquareStack, nuevo: () => ({ id: nuevoId(), tipo: 'seccion', titulo: 'Section', bloques: [{ id: nuevoId(), tipo: 'campos', columnas: 2, campos: [campo({ label: 'Field one' }), campo({ label: 'Field two' })] }] }) },
  { tipo: 'pestanas', grupo: 'Layout', nombre: 'Tabs', que: 'Sólo la fila de pestañas', icono: PanelsTopLeft, nuevo: () => ({ id: nuevoId(), tipo: 'pestanas', tabs: 'All, Active, Inactive', size: 'md', fullWidth: false }) },
  { tipo: 'tabla', grupo: 'Data', nombre: 'Table', que: 'Pacientes, movimientos, recetas o turnos, con las columnas que quieras', icono: Table, nuevo: () => tablaDe('pacientes') },
  { tipo: 'calendario', grupo: 'Data', nombre: 'Calendar', que: 'La agenda de Scheduling: día, semana o mes', icono: CalendarRange, nuevo: () => ({ id: nuevoId(), tipo: 'calendario', vista: 'Week', selector: true, leyenda: true }) },
  { tipo: 'stats', grupo: 'Data', nombre: 'Stats', que: 'Números clave en tarjetas', icono: BarChart3, nuevo: () => ({ id: nuevoId(), tipo: 'stats', items: [{ titulo: 'Patients today', valor: '24', delta: '+12% from last week', icono: 'Users' }, { titulo: 'Revenue', valor: '$8,420', delta: '+4.2% from last week', icono: 'CreditCard' }, { titulo: 'No shows', valor: '2', delta: '−1 from yesterday', icono: 'CalendarDays' }] }) },
  { tipo: 'detalles', grupo: 'Data', nombre: 'Details', que: 'Datos con ícono y lápiz para editar', icono: IdCard, nuevo: () => ({ id: nuevoId(), tipo: 'detalles', titulo: 'Contact', items: [{ icono: 'Phone', label: 'Phone', valor: '(555) 234-5678' }, { icono: 'Mail', label: 'Email', valor: 'maria.viola@mail.com' }, { icono: 'MapPin', label: 'Address', valor: '123 Biscayne Blvd' }] }) },
  { tipo: 'turnos', grupo: 'Data', nombre: 'Appointments', que: 'Turnos del día', icono: CalendarClock, nuevo: () => ({ id: nuevoId(), tipo: 'turnos', cantidad: 3 }) },
  { tipo: 'tareas', grupo: 'Data', nombre: 'Tasks', que: 'Tareas pendientes', icono: ListChecks, nuevo: () => ({ id: nuevoId(), tipo: 'tareas', cantidad: 2 }) },
  { tipo: 'migas', grupo: 'Layout', nombre: 'Breadcrumb', que: 'Dónde está la pantalla: Patients › Maria', icono: ChevronsRight, nuevo: () => ({ id: nuevoId(), tipo: 'migas', items: 'Patients, Maria Abril Viola' }) },
  { tipo: 'pasos', grupo: 'Layout', nombre: 'Steps', que: 'Los pasos de un proceso y en cuál va', icono: ListOrdered, nuevo: () => ({ id: nuevoId(), tipo: 'pasos', total: 3, actual: 2, etiquetas: 'Patient, Scheduling, Confirm' }) },
  { tipo: 'busqueda', grupo: 'Forms', nombre: 'Search bar', que: 'Buscador, filtro y acción principal', icono: Search, nuevo: () => ({ id: nuevoId(), tipo: 'busqueda', placeholder: 'Search by Name or Last Name', filtro: 'Status', opcionesFiltro: 'Active, Inactive', accion: 'New Patient' }) },
  { tipo: 'subir', grupo: 'Forms', nombre: 'Upload', que: 'Soltar o elegir archivos', icono: Upload, nuevo: () => ({ id: nuevoId(), tipo: 'subir', titulo: 'Drop files here', detalle: 'PDF, JPG or PNG, up to 10 MB', accion: 'Choose file' }) },
  { tipo: 'aviso', grupo: 'Content', nombre: 'Alert', que: 'Un aviso: info, éxito, atención o error', icono: Info, nuevo: () => ({ id: nuevoId(), tipo: 'aviso', tono: 'info', titulo: 'Insurance verification pending', texto: 'We will let you know when the carrier confirms the coverage.' }) },
  { tipo: 'persona', grupo: 'Content', nombre: 'Person', que: 'Avatar, nombre, detalle y estado', icono: CircleUser, nuevo: () => ({ id: nuevoId(), tipo: 'persona', nombre: 'Maria Abril Viola', detalle: '33 yrs · ID 4471', estado: 'Active', grande: false }) },
  { tipo: 'metricas', grupo: 'Data', nombre: 'Stat strip', que: 'Números del día en una franja, como en el Dashboard', icono: Activity, nuevo: () => ({ id: nuevoId(), tipo: 'metricas', apilada: false, items: [{ titulo: 'Appointments', valor: '6', nota: '2 completed', icono: 'CalendarDays' }, { titulo: 'Waiting', valor: '3', nota: '1 new', icono: 'Clock' }, { titulo: 'Patients', valor: '24', nota: '+12% this week', icono: 'Users' }] }) },
  { tipo: 'pacientes', grupo: 'Data', nombre: 'Patient cards', que: 'Pacientes en tarjetas de una fila', icono: Contact, nuevo: () => ({ id: nuevoId(), tipo: 'pacientes', cantidad: 3 }) },
  { tipo: 'operatorios', grupo: 'Data', nombre: 'Operatories', que: 'Salas con su estado y quién atiende', icono: DoorOpen, nuevo: () => ({ id: nuevoId(), tipo: 'operatorios', cantidad: 4 }) },
  { tipo: 'paginacion', grupo: 'Data', nombre: 'Pagination', que: 'Anterior y siguiente página', icono: Ellipsis, nuevo: () => ({ id: nuevoId(), tipo: 'paginacion', paginas: 5 }) },
  { tipo: 'odontograma', grupo: 'Clinical', nombre: 'Odontogram', que: 'Las 32 piezas: se seleccionan y se marcan superficies', icono: Smile, nuevo: () => ({ id: nuevoId(), tipo: 'odontograma', ejemplo: true, marca: 'Caries' }) },
  { tipo: 'receta', grupo: 'Clinical', nombre: 'Prescription', que: 'Una receta: medicamento, dosis e indicaciones', icono: PillIcon, nuevo: () => ({ id: nuevoId(), tipo: 'receta', titulo: 'New prescription', medicamentos: 'Amoxicillin, Ibuprofen, Paracetamol, Clindamycin, Chlorhexidine 0.12%', repeticiones: true, sustitucion: true, indicaciones: true }) },
]
export const infoDe = (t: TipoBloque) => TIPOS.find((x) => x.tipo === t)!
/* Nombre e ícono de un bloque; una pieza real se llama como su componente. */
export const nombreDe = (b: Bloque) => (b.tipo === 'pieza' ? b.componente : infoDe(b.tipo).nombre)
export const iconoDe = (b: Bloque): LucideIcon => (b.tipo === 'pieza' ? Component : infoDe(b.tipo).icono)

/* ── Datos de ejemplo ───────────────────────────────────────────────── */

/* Una columna nueva, con el título y el ancho del campo. */
export function columna(datos: IdConjunto, campo: string): ColumnaTabla {
  const f = (conjunto(datos).campos as Record<string, CampoDato>)[campo]
  return { id: nuevoId(), campo, header: f?.header ?? campo, ancho: f?.ancho ?? null }
}

type OpcionesTabla = Partial<Omit<BloqueDe<'tabla'>, 'id' | 'tipo' | 'datos' | 'columnas'>> & { campos?: string[] }
export function tablaDe(datos: IdConjunto, { campos, ...resto }: OpcionesTabla = {}): Bloque {
  return {
    id: nuevoId(), tipo: 'tabla', datos, columnas: (campos ?? conjunto(datos).inicial).map((x) => columna(datos, x)),
    filas: 6, buscador: true, seleccion: false, acciones: true, compacta: false, porPagina: 5, ...resto,
  }
}

/* Los diseños guardados antes de que las tablas tuvieran columnas libres
   (una lista de claves de pacientes) se pasan al modelo nuevo. */
const CLAVES_VIEJAS: Record<string, string> = { patient: 'name', status: 'status', next: 'next', provider: 'provider', balance: 'balance' }
export function migrarDiseno(d: Diseno): Diseno {
  const migrar = (b: Bloque): Bloque => {
    if (b.tipo === 'tabla') {
      const viejo = b as unknown as { datos?: IdConjunto; columnas: (string | ColumnaTabla)[] }
      if (!viejo.datos || typeof viejo.columnas[0] === 'string') {
        return { ...b, datos: 'pacientes', columnas: viejo.columnas.map((k) => (typeof k === 'string' ? columna('pacientes', CLAVES_VIEJAS[k] ?? 'name') : k)) }
      }
    }
    if (b.tipo === 'modal' || b.tipo === 'seccion') return { ...b, bloques: b.bloques.map(migrar) }
    if (b.tipo === 'pestanasContenido') return { ...b, pestanas: b.pestanas.map((p) => ({ ...p, bloques: p.bloques.map(migrar) })) }
    if (b.tipo === 'columnas') return { ...b, columnas: b.columnas.map((c) => ({ ...c, bloques: c.bloques.map(migrar) })) }
    return b
  }
  return { ...d, bloques: d.bloques.map(migrar) }
}

const TURNOS: Appointment[] = [
  { name: 'Noah James', initials: 'NJ', provider: 'Dr. Elena Martinez', operatory: 'Operatory 2', time: '10:00' },
  { name: 'Maria Abril Viola', initials: 'MV', provider: 'Dr. Emily Chen', operatory: 'Operatory 1', time: '11:30' },
  { name: 'Elias Aguirre', initials: 'EA', provider: 'Sarah Stone', operatory: 'Operatory 3', time: '13:00' },
  { name: 'John Smith', initials: 'JS', provider: 'Dr. Salgado', operatory: 'Operatory 2', time: '15:30' },
  { name: 'Sofía Romero', initials: 'SR', provider: 'Dr. Emily Chen', operatory: 'Operatory 1', time: '17:00' },
]

const SALAS: Operatory[] = [
  { name: 'Operatory 1', status: 'Busy', patientsToday: 6, provider: 'Dr. Emily Chen' },
  { name: 'Operatory 2', status: 'Available', patientsToday: 4, provider: 'Dr. Elena Martinez' },
  { name: 'Operatory 3', status: 'Available', patientsToday: 3, provider: 'Sarah Stone' },
  { name: 'Operatory 4', status: 'Unavailable', patientsToday: 0, provider: '-' },
]

const FILAS: PatientRow[] = [
  { id: 'p1', name: 'Maria Abril Viola', initials: 'MV', birthday: '23/11/1978', email: 'maria.viola@mail.com', status: 'Active' },
  { id: 'p2', name: 'Noah James Smith', initials: 'NS', birthday: '04/02/1991', email: 'noah.smith@mail.com', status: 'Active' },
  { id: 'p3', name: 'Elias Aguirre', initials: 'EA', birthday: '12/09/1985', email: 'elias.aguirre@mail.com', status: 'Inactive' },
  { id: 'p4', name: 'Sofía Romero', initials: 'SR', birthday: '30/03/1979', email: 'sofia.romero@mail.com', status: 'Active' },
  { id: 'p5', name: 'John Smith', initials: 'JS', birthday: '21/01/1983', email: 'john.smith@mail.com', status: 'Inactive' },
]

/* El aviso en los colores de los estados de la app (los mismos que Pill). */
export const ALERTAS: Record<Tono, { caja: string; color: string; icono: LucideIcon; nombre: string }> = {
  info: { caja: 'border-dash-busy-fg/25 bg-info-bg', color: 'text-dash-busy-fg', icono: Info, nombre: 'Info' },
  success: { caja: 'border-dash-ok-fg/25 bg-dash-ok-bg', color: 'text-dash-ok-fg', icono: CircleCheck, nombre: 'CircleCheck' },
  warning: { caja: 'border-warn-fg/25 bg-warn-bg', color: 'text-warn-fg', icono: TriangleAlert, nombre: 'TriangleAlert' },
  danger: { caja: 'border-dash-bad-fg/25 bg-dash-bad-bg', color: 'text-dash-bad-fg', icono: CircleAlert, nombre: 'CircleAlert' },
}
const iniciales = (nombre: string) => nombre.split(/\\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join('')
const CLASE_BUSCADOR = 'focus:border-dash-blue h-8 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] font-medium shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none'

const TAREAS: PendingTask[] = [
  { kind: 'Referrals', state: 'Requested', person: 'Elena Marquez', initials: 'EM', register: 'March 17, 2025', expiration: 'March 31, 2025' },
  { kind: 'Lab order', state: 'In progress', person: 'Noah James Smith', initials: 'NS', register: 'March 18, 2025', expiration: 'March 25, 2025' },
  { kind: 'Insurance claim', state: 'Requested', person: 'Maria Abril Viola', initials: 'MV', register: 'March 19, 2025', expiration: 'April 2, 2025' },
  { kind: 'Prescription', state: 'Requested', person: 'John Smith', initials: 'JS', register: 'March 20, 2025', expiration: 'March 27, 2025' },
]


/* ── Cómo se ve ─────────────────────────────────────────────────────── */

/* Lo que el lienzo necesita saber del constructor: qué bloque se está
   editando (para abrir su modal o su pestaña) y qué modal está abierto. */
export const VistaPrevia = createContext<{ editando: string | null; abierto: string | null; setAbierto: (id: string | null) => void; elegir?: (id: string | null) => void }>({
  editando: null, abierto: null, setAbierto: () => {},
})

/* En el Builder cada lista de bloques del lienzo acepta lo que se arrastra y cada bloque se elige y se mueve (ver lienzo.tsx).
   \`lista\` es 'raiz', el id de un modal o sección, o \`id:pestaña\`. */
export type ListaProps = { lista: string; bloques: Bloque[]; contenedor: TipoContenedor; className?: string }
export const Armado = createContext<{ Lista: ComponentType<ListaProps> } | null>(null)

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

function Hijos({ lista, bloques, gap = 'gap-4' }: { lista: string; bloques: Bloque[]; gap?: string }) {
  const armado = useContext(Armado)
  if (armado) return <armado.Lista lista={lista} bloques={bloques} contenedor="card" className={cn('flex flex-col', gap)} />
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
      {abierta && <Hijos lista={\`\${b.id}:\${abierta.id}\`} bloques={abierta.bloques} />}
    </div>
  )
}

function VerModal({ b }: { b: BloqueDe<'modal'> }) {
  const { editando, abierto, setAbierto, elegir } = useContext(VistaPrevia)
  /* Mientras se edita el modal o algo de adentro, queda abierto. */
  const visible = abierto === b.id || (!!editando && (editando === b.id || contiene(b.bloques, editando)))
  const cerrar = () => {
    setAbierto(null)
    if (visible && editando) elegir?.(null)
  }
  useEffect(() => {
    if (visible) document.querySelector(\`[role="dialog"][aria-label="\${CSS.escape(b.titulo)}"]\`)?.scrollIntoView({ block: 'center', behavior: 'smooth' })
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
          <Hijos lista={b.id} bloques={b.bloques} gap="gap-5" />
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

function VerTabla({ b }: { b: BloqueDe<'tabla'> }) {
  const cj = conjunto(b.datos)
  const campos = cj.campos as Record<string, CampoDato>
  return (
    <DataTable
      key={\`\${b.datos}-\${b.porPagina}-\${b.filas}\`}
      rows={cj.filas.slice(0, b.filas)}
      rowKey={(r) => String(r.id)}
      rowLabel={(r) => String(r[cj.etiqueta])}
      columns={b.columnas.filter((col) => campos[col.campo]).map((col) => {
        const f = campos[col.campo]!
        return { key: col.id, header: col.header, width: col.ancho ?? undefined, align: f.tipo === 'monto' ? ('right' as const) : undefined, cell: (r: (typeof cj.filas)[number]) => celda(f.tipo, r, col.campo) }
      })}
      search={b.buscador ? { placeholder: \`Search \${cj.plural}\`, match: (r, q) => String(r[cj.etiqueta]).toLowerCase().includes(q.toLowerCase()) } : undefined}
      selectable={b.seleccion}
      rowActions={b.acciones ? () => (
        <>
          <DropdownMenuItem><Pencil className="size-4 shrink-0" /> Edit {cj.singular}</DropdownMenuItem>
          <DropdownMenuItem variant="destructive"><Trash2 className="size-4 shrink-0" /> Delete {cj.singular}</DropdownMenuItem>
        </>
      ) : undefined}
      density={b.compacta ? 'compact' : 'regular'}
      pageSize={b.porPagina}
      itemLabel={cj.plural}
    />
  )
}

/* Un examen sin nada marcado: las 32 piezas permanentes, limpias. */
const examenLimpio = (): OralExam => {
  const e = makeMockExam()
  return { ...e, teeth: e.teeth.map((t) => ({ ...t, element: 'permanent' as const, surfaces: t.surfaces.map(() => null), icons: [], root: null, color: null, findings: [] })) }
}

/* El odontograma de Clinical: el número selecciona la pieza, una superficie
   se marca (o se desmarca) con el color elegido. */
function OdontogramaVivo({ b }: { b: BloqueDe<'odontograma'> }) {
  const [examen, setExamen] = useState<OralExam>(() => (b.ejemplo ? makeMockExam() : examenLimpio()))
  const [dientes, setDientes] = useState<number[]>([])
  const color = MARCAS[b.marca]
  return (
    <div className="overflow-x-auto">
      <Odontogram
        exam={examen}
        selected={dientes}
        onToggle={(n) => setDientes((s) => (s.includes(n) ? s.filter((x) => x !== n) : [...s, n]))}
        onSurface={(n, i) => setExamen((e) => ({ ...e, teeth: e.teeth.map((t) => (t.number === n ? { ...t, surfaces: t.surfaces.map((s, k) => (k === i ? (s ? null : color) : s)) } : t)) }))}
      />
    </div>
  )
}

const FORMAS_DOSIS = ['Tablet', 'Capsule', 'Syrup', 'Mouthwash', 'Injection']
const FRECUENCIAS = ['Once daily', 'Every 12 hours', 'Every 8 hours', 'Every 6 hours', 'As needed']

/* La receta: qué, cuánto y cómo tomarlo, como el formulario de Medication de
   la ficha clínica. */
function VerReceta({ b }: { b: BloqueDe<'receta'> }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 items-center justify-center rounded-lg bg-info-bg text-[13px] font-bold text-dash-blue">Rx</span>
        <h3 className="text-sm font-bold text-ink">{b.titulo}</h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <SearchField label="Medication" required placeholder="Search a medication" options={lista(b.medicamentos)} className="sm:col-span-2" />
        <TextField label="Strength" required placeholder="500 mg" />
        <SelectField label="Dosage form" required placeholder="Select form" options={FORMAS_DOSIS} />
      </div>
      <p className="text-[13px] font-semibold text-ink">Directions for use</p>
      <div className="grid gap-4 sm:grid-cols-3">
        <TextField label="Dose" required placeholder="1 tablet" />
        <SelectField label="Frequency" required placeholder="Select frequency" options={FRECUENCIAS} />
        <TextField label="Duration" placeholder="7 days" />
      </div>
      {(b.repeticiones || b.sustitucion) && (
        <div className="grid items-end gap-4 sm:grid-cols-2">
          {b.repeticiones && <SelectField label="Refills" placeholder="0" options={['0', '1', '2', '3']} />}
          {b.sustitucion && (
            <label className="flex h-9 items-center justify-between gap-4 text-[13px] text-ink">
              Allow generic substitution
              <Switch defaultChecked aria-label="Allow generic substitution" />
            </label>
          )}
        </div>
      )}
      {b.indicaciones && <TextArea label="Instructions for the patient" placeholder="Take after meals. Do not drive if you feel drowsy." />}
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

function PaginacionViva({ b }: { b: BloqueDe<'paginacion'> }) {
  const [pagina, setPagina] = useState(1)
  return <Pagination pagina={Math.min(pagina, b.paginas)} paginas={b.paginas} onChange={setPagina} />
}

/* El buscador de las pantallas con tabla (como en Patients): campo, botón Search, filtro y la acción principal. */
function BusquedaViva({ b }: { b: BloqueDe<'busqueda'> }) {
  const [q, setQ] = useState('')
  const [filtro, setFiltro] = useState<string[]>([])
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative w-full sm:w-[320px]">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={b.placeholder} aria-label={b.placeholder || 'Search'} className={CLASE_BUSCADOR} />
      </div>
      <SearchButton className="h-8" />
      {b.filtro && <FilterMenu label={b.filtro} options={lista(b.opcionesFiltro)} value={filtro} onChange={setFiltro} />}
      {b.accion && <Button size="md" className="ml-auto"><Plus /> {b.accion}</Button>}
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
      if (contenedor === 'page' || contenedor === 'app') return <div><SettingsPageHeader titulo={b.titulo} bajada={b.bajada} accion={accion} /></div>
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
          <Hijos lista={b.id} bloques={b.bloques} />
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
      return <VerTabla b={b} />
    case 'odontograma':
      return <OdontogramaVivo key={String(b.ejemplo)} b={b} />
    case 'receta':
      return <VerReceta b={b} />
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
      return <PagoVivo key={\`\${b.metodos}-\${b.varios}\`} b={b} />
    case 'calendario':
      return <CalendarioVivo key={b.vista} b={b} />
    case 'horarios':
      return <HorariosVivos b={b} />
    case 'tareas':
      return <div className="grid gap-3 sm:grid-cols-2">{TAREAS.slice(0, b.cantidad).map((t) => <PendingTaskCard key={t.kind} task={t} />)}</div>
    case 'divisor':
      return <hr className="border-line-row" />
    case 'pieza':
      return <PiezaViva b={b} />
    case 'migas': {
      const items = lista(b.items)
      return <Breadcrumb items={items.map((label, i) => ({ label, to: i < items.length - 1 ? '/' : undefined }))} />
    }
    case 'pasos': {
      const etiquetas = lista(b.etiquetas)
      return (
        <div className="flex flex-col gap-2">
          <StepIndicator total={b.total} current={b.actual} />
          {etiquetas[b.actual - 1] && <p className="text-[12px] font-semibold tracking-[0.04em] text-ink-muted uppercase">Step {b.actual} of {b.total} — {etiquetas[b.actual - 1]}</p>}
        </div>
      )
    }
    case 'paginacion':
      return <div className="flex justify-end"><PaginacionViva key={b.paginas} b={b} /></div>
    case 'busqueda':
      return <BusquedaViva b={b} />
    case 'aviso': {
      const a = ALERTAS[b.tono]
      return (
        <div role="status" className={cn('flex items-start gap-3 rounded-lg border px-4 py-3', a.caja)}>
          <a.icono className={cn('mt-0.5 size-4 shrink-0', a.color)} />
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className={cn('text-[13px] font-semibold', a.color)}>{b.titulo}</p>
            {b.texto && <p className="text-[13px] leading-relaxed text-ink">{b.texto}</p>}
          </div>
        </div>
      )
    }
    case 'persona':
      return (
        <div className="flex items-center gap-3">
          <Avatar className={b.grande ? 'size-[62px]' : 'size-10'}>
            <AvatarFallback className={cn('bg-dash-blue-hover text-surface-subtle', b.grande ? 'text-xl' : 'text-[13px]')}>{iniciales(b.nombre)}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="flex items-center gap-2">
              <span className={cn('truncate font-semibold text-ink', b.grande ? 'text-lg' : 'text-[15px]')}>{b.nombre}</span>
              {b.estado && <Pill tone={b.estado === 'Active' ? 'success' : 'neutral'} size="sm">{b.estado}</Pill>}
            </span>
            {b.detalle && <span className="text-[13px] text-ink-muted">{b.detalle}</span>}
          </div>
        </div>
      )
    case 'metricas':
      return <StatStrip apilada={b.apilada} stats={b.items.map((x) => ({ label: x.titulo, value: x.valor, nota: x.nota, icon: ICONOS[x.icono] }))} />
    case 'operatorios':
      return <div className="grid gap-3 sm:grid-cols-2">{SALAS.slice(0, b.cantidad).map((r) => <OperatoryCard key={r.name} room={r} />)}</div>
    case 'pacientes':
      return <div className="flex flex-col gap-2">{FILAS.slice(0, b.cantidad).map((r) => <PatientCard key={r.id} row={r} onEdit={() => {}} />)}</div>
    case 'subir':
      return (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-line bg-surface-subtle px-6 py-8 text-center">
          <span className="flex size-10 items-center justify-center rounded-full bg-info-bg text-dash-blue"><Upload className="size-5" /></span>
          <p className="text-sm font-semibold text-ink">{b.titulo}</p>
          {b.detalle && <p className="text-[13px] text-ink-muted">{b.detalle}</p>}
          {b.accion && <Button variant="secondary" size="md">{b.accion}</Button>}
        </div>
      )
    case 'columnas':
      return (
        <div className="grid items-start gap-5" style={{ gridTemplateColumns: PROPORCIONES[b.proporcion] }}>
          {b.columnas.map((c) => <div key={c.id} className="min-w-0"><Hijos lista={\`\${b.id}:\${c.id}\`} bloques={c.bloques} /></div>)}
        </div>
      )
  }
}

/* Las historias de todo el sitio, para dibujar una pieza sola (sin su página ni su iframe). */
const HISTORIAS = import.meta.glob('/src/**/*.stories.tsx') as Record<string, () => Promise<Record<string, unknown>>>

class Aguanta extends ComponenteReact<{ children: ReactNode; caida: ReactNode }, { roto: boolean }> {
  state = { roto: false }
  static getDerivedStateFromError() {
    return { roto: true }
  }
  render() {
    return this.state.roto ? this.props.caida : this.props.children
  }
}

/* La pieza real, dibujada con su historia (sus args y decoradores) en el lienzo mismo: lo que en la app es fijo (el fondo de un
   modal, un panel lateral) queda en el lugar de la pieza (\`.pieza-aislada\` en docs.css). */
function PiezaAislada({ b, historia }: { b: BloqueDe<'pieza'>; historia: string }) {
  const [Pieza, setPieza] = useState<(ComponentType & { parameters?: { router?: boolean } }) | null>(null)
  const [roto, setRoto] = useState(false)
  /* Si al abrir dibuja algo fuera de su lugar (un diálogo de Radix que bloquea la página, un popover en <body>), va en un iframe. */
  const [afuera, setAfuera] = useState(false)
  const caja = useRef<HTMLDivElement>(null)
  const recien = useRef(true)
  useEffect(() => {
    let vivo = true
    const clave = b.storyId.split('--')[1]!.replace(/-/g, '')
    const cargar = HISTORIAS[historia.replace(/^\\./, '')]
    ;(cargar ? cargar() : Promise.reject(new Error(historia)))
      .then((m) => {
        const exp = Object.keys(m).find((k) => k !== 'default' && k.toLowerCase() === clave)
        if (!exp) throw new Error(b.storyId)
        const C = composeStory(m[exp] as Parameters<typeof composeStory>[0], m.default as Parameters<typeof composeStory>[1])
        if (vivo) setPieza(() => C as ComponentType & { parameters?: { router?: boolean } })
      })
      .catch(() => vivo && setRoto(true))
    return () => {
      vivo = false
    }
  }, [b.storyId, historia])
  /* Lo que se dibuja en un portal avisa por el árbol de React: un focus de afuera de la caja es suyo. Recién montada se le
     pregunta a cada cosa suelta en <body>; después, un menú que se abre con un clic ya es uso normal. */
  useEffect(() => {
    if (!Pieza) return
    const t1 = window.setTimeout(() => {
      for (const el of document.body.children) if (el instanceof HTMLElement && !el.contains(caja.current) && el.tagName !== 'SCRIPT') el.dispatchEvent(new FocusEvent('focusin', { bubbles: true }))
    }, 300)
    const t2 = window.setTimeout(() => { recien.current = false }, 1200)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [Pieza])
  if (afuera) return <PiezaEnMarco b={b} />
  const caida = <p className="rounded-lg border border-dashed border-line p-4 text-[13px] text-ink-muted">No se pudo dibujar {b.componente}{b.ejemplo ? \` · \${b.ejemplo}\` : ''}.</p>
  if (roto) return caida
  if (!Pieza) return <div className="h-16 animate-pulse rounded-lg bg-surface-muted" />
  /* Las que traen su propio router (\`parameters.router: false\`, como en preview.tsx) no van adentro del del lienzo. */
  const pieza = (
    <div ref={caja} className="pieza-aislada" onFocus={(e) => { if (recien.current && !caja.current?.contains(e.target as Node)) setAfuera(true) }}>
      <Pieza />
    </div>
  )
  return (
    <Aguanta caida={caida}>
      <TooltipProvider>
        {Pieza.parameters?.router === false ? <UNSAFE_LocationContext.Provider value={null as never}>{pieza}</UNSAFE_LocationContext.Provider> : pieza}
      </TooltipProvider>
    </Aguanta>
  )
}

function PiezaViva({ b }: { b: BloqueDe<'pieza'> }) {
  return b.historia && !b.marco && !b.pantalla ? <PiezaAislada b={b} historia={b.historia} /> : <PiezaEnMarco b={b} />
}

/* La historia en un iframe: una pantalla a 1440 px escalada al ancho libre; un componente a lo ancho, con el alto de lo que dibuja. */
function PiezaEnMarco({ b }: { b: BloqueDe<'pieza'> }) {
  const caja = useRef<HTMLDivElement>(null)
  const [ancho, setAncho] = useState(0)
  const [alto, setAlto] = useState(b.pantalla ? 900 : 260)
  useLayoutEffect(() => {
    const el = caja.current
    if (!el) return
    const ro = new ResizeObserver(() => setAncho(el.clientWidth))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const medir = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
    const doc = e.currentTarget.contentDocument
    /* La barra "‹ Componente / Ejemplo" del sitio no es parte de la pieza; sin el alto de pantalla mide lo que dibuja, y sin fondos
       (el oscuro de un diálogo, el blanco de la página) se ve sola sobre el lienzo. */
    const sola = '.ds-foco, body, #storybook-root { background: transparent !important } .ds-foco > div { padding: 0 !important; justify-content: flex-start !important; align-items: flex-start !important }'
      + ' [data-slot$="overlay"], .fixed.inset-0 { background: transparent !important }'
    if (doc) doc.head.appendChild(Object.assign(doc.createElement('style'), { textContent: \`.ds-foco > header { display: none !important } .ds-foco { min-height: 0 !important } \${b.pantalla ? '' : sola}\` }))
    if (b.pantalla) return
    const raiz = doc?.querySelector<HTMLElement>('#storybook-root')
    if (!doc || !raiz) return
    const tomar = () => {
      const fondos = [...doc.querySelectorAll<HTMLElement>('[role=dialog], [role=alertdialog], body > :not(script):not(#storybook-root)')].map((x) => x.getBoundingClientRect().bottom + 16)
      setAlto(Math.min(900, Math.max(48, raiz.getBoundingClientRect().height + 16, ...fondos)))
    }
    tomar()
    const ro = new ResizeObserver(tomar)
    ro.observe(raiz)
    window.setTimeout(tomar, 600)
  }
  const escala = b.pantalla && ancho ? Math.min(1, ancho / 1440) : 1
  return (
    <div ref={caja} className={cn('w-full overflow-hidden', b.pantalla && 'rounded-xl border border-line bg-page-background')} style={{ height: alto * escala }}>
      <iframe
        key={b.storyId}
        data-pieza
        title={b.ejemplo ? \`\${b.componente} · \${b.ejemplo}\` : b.componente}
        src={\`iframe.html?id=\${b.storyId}&viewMode=story\`}
        onLoad={medir}
        style={{ width: b.pantalla ? 1440 : '100%', height: alto, border: 0, transform: b.pantalla ? \`scale(\${escala})\` : undefined, transformOrigin: 'top left' }}
      />
    </div>
  )
}

export const ANCHOS = { angosto: 420, medio: 680, completo: null } as const

const GAP = { card: 'gap-5', panel: 'gap-3', page: 'gap-6', libre: 'gap-6', app: 'gap-6' } as const

/* La pantalla de la app vacía, con el menú lateral y la barra de arriba reales: lo de adentro es el contenido de la ruta. */
function MarcoApp({ children }: { children: ReactNode }) {
  const [abierto, setAbierto] = useState(false)
  return (
    <HelpProvider>
      <TooltipProvider>
        <div className="flex min-h-[720px] overflow-hidden rounded-xl border border-line bg-white">
          <Sidebar expanded={abierto} onClose={() => setAbierto(false)} />
          <div className="flex min-w-0 flex-1 flex-col">
            <Topbar expanded={abierto} onToggleSidebar={() => setAbierto((v) => !v)} />
            <main className="flex-1 bg-page-background"><div className={CONTENEDOR_PAGINA}>{children}</div></main>
          </div>
        </div>
      </TooltipProvider>
    </HelpProvider>
  )
}

export function VerDiseno({ d }: { d: Diseno }) {
  const armado = useContext(Armado)
  const hijos = armado
    ? <armado.Lista lista="raiz" bloques={d.bloques} contenedor={d.contenedor} className={cn('flex flex-col', GAP[d.contenedor])} />
    : d.bloques.map((b) => <VerBloque key={b.id} b={b} contenedor={d.contenedor} />)
  if (d.contenedor === 'panel') return <Panel title={d.tituloPanel || 'Panel'}>{hijos}</Panel>
  if (d.contenedor === 'page') return <div className={cn(CONTENEDOR_PAGINA, 'flex flex-col gap-6')}>{hijos}</div>
  if (d.contenedor === 'libre') return <div className="flex flex-col gap-6">{hijos}</div>
  if (d.contenedor === 'app') return <MarcoApp>{armado ? hijos : <div className="flex flex-col gap-6">{hijos}</div>}</MarcoApp>
  return <Card className="flex flex-col gap-5 p-5">{hijos}</Card>
}

/* ── Cómo se escribe ────────────────────────────────────────────────── */

type Codigo = { imports: Map<string, Set<string>>; estado: string[]; datos: string[]; cuenta: Record<string, number> }

/* Un texto como literal de JS con comillas simples, como el resto del código. */
const comillas = (s: string) => \`'\${s.replace(/\\\\/g, '\\\\\\\\').replace(/'/g, "\\\\'")}'\`
const arreglo = (xs: string[]) => \`[\${xs.map(comillas).join(', ')}]\`
const valorAttr = (s: string) => (/["{}<>\\\\]/.test(s) ? \`{\${comillas(s)}}\` : \`"\${s}"\`)
const texto = (s: string) => (/[{}<>]/.test(s) ? \`{\${comillas(s)}}\` : s)
const importar = (c: Codigo, desde: string, ...nombres: string[]) => {
  const s = c.imports.get(desde) ?? new Set<string>()
  nombres.forEach((x) => s.add(x))
  c.imports.set(desde, s)
}
const conIcono = (c: Codigo, icono: NombreIcono, label: string) => {
  if (icono === 'none') return texto(label)
  importar(c, 'lucide-react', icono)
  return \`<\${icono} /> \${texto(label)}\`
}
const sangrar = (lineas: string[], n: number) => lineas.map((l) => (l ? ' '.repeat(n) + l : l))

/* Un estado propio por bloque que lo necesita: pestana, pestana2… */
function estado(c: Codigo, base: string, inicial: string) {
  const k = c.cuenta[base] ?? 0
  c.cuenta[base] = k + 1
  const v = k ? \`\${base}\${k + 1}\` : base
  const set = \`set\${v[0]!.toUpperCase()}\${v.slice(1)}\`
  importar(c, 'react', 'useState')
  c.estado.push(\`const [\${v}, \${set}] = useState\${inicial}\`)
  return [v, set] as const
}

function codigoCampo(c: Codigo, f: Campo, extra?: string): string {
  if (f.clase === 'calendar') {
    importar(c, '@/components/patients/form', 'FieldLabel')
    importar(c, '@/components/ui/date-picker', 'DatePicker')
    const [v, set] = estado(c, 'fecha', '<Date | null>(null)')
    return \`<div className="flex flex-col gap-2"><FieldLabel\${f.required ? ' required' : ''}>\${texto(f.label)}</FieldLabel><DatePicker value={\${v}} onChange={\${set}} className="h-9 w-full" /></div>\`
  }
  const comp = { text: 'TextField', select: 'SelectField', date: 'DateTextField', textarea: 'TextArea', search: 'SearchField' }[f.clase]
  importar(c, '@/components/patients/form', comp)
  let s = \`<\${comp} label=\${valorAttr(f.label)}\`
  if (f.placeholder && f.clase !== 'date') s += \` placeholder=\${valorAttr(f.placeholder)}\`
  if ((f.clase === 'select' || f.clase === 'search') && lista(f.opciones).length) s += \` options={\${arreglo(lista(f.opciones))}}\`
  if (f.required) s += ' required'
  if (f.disabled) s += ' disabled'
  if (f.hint) s += \` hint=\${valorAttr(f.hint)}\`
  if (f.error) s += \` error=\${valorAttr(f.error)}\`
  if (extra) s += \` className="\${extra}"\`
  return \`\${s} />\`
}

/* Los bloques de adentro de un contenedor, en una columna. */
function codigoHijos(c: Codigo, bloques: Bloque[], gap = 'gap-4'): string[] {
  if (!bloques.length) return [\`<p className="text-[13px] text-ink-muted">\${SIN_CONTENIDO}</p>\`]
  return [\`<div className="flex flex-col \${gap}">\`, ...sangrar(bloques.flatMap((x) => codigoBloque(c, x, 'card')), 2), \`</div>\`]
}

function codigoBloque(c: Codigo, b: Bloque, contenedor: TipoContenedor): string[] {
  switch (b.tipo) {
    case 'columnas':
      return [
        \`<div className="grid grid-cols-[\${PROPORCIONES[b.proporcion].replace(/ /g, '_')}] items-start gap-5">\`,
        ...sangrar(b.columnas.flatMap((col) => codigoHijos(c, col.bloques)), 2),
        \`</div>\`,
      ]
    case 'pieza': {
      if (b.pantalla) return [\`{/* \${b.componente}: la pantalla ya existe en la app (src/AppRoutes.tsx). Ver \${b.lugar} › \${b.componente} en Confidentally UI. */}\`]
      const jsx = b.jsx ?? b.componente
      if (b.archivo && /^[A-Z][A-Za-z0-9]*$/.test(jsx)) {
        importar(c, b.archivo, jsx)
        return [\`<\${jsx} /* props: ver el ejemplo “\${b.ejemplo || b.componente}” en Confidentally UI */ />\`]
      }
      return [\`{/* \${b.componente}\${b.ejemplo ? \` · \${b.ejemplo}\` : ''}: ver \${b.lugar} en Confidentally UI. */}\`]
    }
    case 'encabezado': {
      if (b.accion) importar(c, '@/components/ui/button', 'Button')
      const accion = b.accion ? \`<Button size="md">\${conIcono(c, b.icono, b.accion)}</Button>\` : ''
      if (contenedor === 'page' || contenedor === 'app') {
        importar(c, '@/components/settings/SettingsPageHeader', 'SettingsPageHeader')
        return [\`<SettingsPageHeader\`, \`  titulo=\${valorAttr(b.titulo)}\`, \`  bajada=\${valorAttr(b.bajada)}\`, ...(accion ? [\`  accion={\${accion}}\`] : []), \`/>\`]
      }
      importar(c, '@/components/ui/card', 'CardTitle', ...(b.bajada ? ['CardDescription'] : []))
      return [
        \`<div className="flex items-start justify-between gap-3">\`,
        \`  <div>\`,
        \`    <CardTitle>\${texto(b.titulo)}</CardTitle>\`,
        ...(b.bajada ? [\`    <CardDescription>\${texto(b.bajada)}</CardDescription>\`] : []),
        \`  </div>\`,
        ...(accion ? [\`  \${accion}\`] : []),
        \`</div>\`,
      ]
    }
    case 'texto':
      return [\`<p className="\${b.tono === 'suave' ? 'text-[13px] text-ink-muted' : 'text-sm text-ink'}">\${texto(b.texto)}</p>\`]
    case 'botones':
      importar(c, '@/components/ui/button', 'Button')
      return [
        \`<div className="flex flex-wrap items-center gap-2 \${ALINEAR[b.alinear]}">\`,
        ...b.botones.map((x) => {
          const props = [x.variant !== 'primary' && \`variant="\${x.variant}"\`, x.size !== 'lg' && \`size="\${x.size}"\`].filter(Boolean).join(' ')
          return \`  <Button\${props ? \` \${props}\` : ''}>\${conIcono(c, x.icono, x.label)}</Button>\`
        }),
        \`</div>\`,
      ]
    case 'pestanas': {
      const tabs = lista(b.tabs)
      importar(c, '@/components/ui/tabs', 'Tabs')
      const [v, set] = estado(c, 'pestana', \`(\${comillas(tabs[0] ?? '')})\`)
      const props = [b.size === 'sm' && 'size="sm"', b.fullWidth && 'fullWidth'].filter(Boolean).join(' ')
      return [\`<Tabs tabs={\${arreglo(tabs)}} value={\${v}} onChange={\${set}}\${props ? \` \${props}\` : ''} />\`]
    }
    case 'pestanasContenido': {
      if (!b.pestanas.length) return []
      importar(c, '@/components/ui/tabs', 'Tabs')
      const labels = b.pestanas.map((p) => p.label)
      const [v, set] = estado(c, 'pestana', \`(\${comillas(labels[0] ?? '')})\`)
      const props = [b.size === 'sm' && 'size="sm"', b.fullWidth && 'fullWidth'].filter(Boolean).join(' ')
      return [
        \`<div className="flex flex-col gap-4">\`,
        \`  <Tabs tabs={\${arreglo(labels)}} value={\${v}} onChange={\${set}}\${props ? \` \${props}\` : ''} />\`,
        ...b.pestanas.flatMap((p) => [\`  {\${v} === \${comillas(p.label)} && (\`, ...sangrar(codigoHijos(c, p.bloques), 4), \`  )}\`]),
        \`</div>\`,
      ]
    }
    case 'modal': {
      importar(c, '@/components/ui/button', 'Button')
      importar(c, '@/components/patients/form', 'ModalShell')
      const [v, set] = estado(c, 'abierto', '(false)')
      const cerrar = \`() => \${set}(false)\`
      let pie: string
      if (b.peligro) {
        pie = \`<><Button variant="secondary" onClick={\${cerrar}}>\${texto(b.cancelar)}</Button><Button variant="destructive" onClick={\${cerrar}}>\${texto(b.confirmar)}</Button></>\`
      } else {
        importar(c, '@/components/patients/form', 'FormFooter')
        pie = \`<FormFooter onCancel={\${cerrar}} onSave={\${cerrar}}\${b.cancelar !== 'Cancel' ? \` cancelLabel=\${valorAttr(b.cancelar)}\` : ''}\${b.confirmar !== 'Save' ? \` saveLabel=\${valorAttr(b.confirmar)}\` : ''} />\`
      }
      return [
        \`<div>\`,
        \`  <Button\${b.peligro ? ' variant="destructive"' : ''} onClick={() => \${set}(true)}>\${texto(b.disparador)}</Button>\`,
        \`</div>\`,
        \`{\${v} && (\`,
        \`  <ModalShell\`,
        \`    title=\${valorAttr(b.titulo)}\`,
        ...(ANCHO_MODAL[b.ancho] ? [\`    width="\${ANCHO_MODAL[b.ancho]}"\`] : []),
        \`    onClose={\${cerrar}}\`,
        \`    footer={\${pie}}\`,
        \`  >\`,
        ...sangrar(codigoHijos(c, b.bloques, 'gap-5'), 4),
        \`  </ModalShell>\`,
        \`)}\`,
      ]
    }
    case 'seccion':
      importar(c, '@/components/patients/form', 'SectionCard')
      return [
        \`<SectionCard title=\${valorAttr(b.titulo)}>\`,
        ...sangrar(b.bloques.length ? b.bloques.flatMap((x) => codigoBloque(c, x, 'card')) : [\`<p className="text-[13px] text-ink-muted">\${SIN_CONTENIDO}</p>\`], 2),
        \`</SectionCard>\`,
      ]
    case 'campos':
      return [
        \`<div className="grid gap-4\${b.columnas === 2 ? ' sm:grid-cols-2' : ''}">\`,
        ...b.campos.map((f) => \`  \${codigoCampo(c, f, b.columnas === 2 && f.clase === 'textarea' ? 'sm:col-span-2' : undefined)}\`),
        \`</div>\`,
      ]
    case 'pills':
      importar(c, '@/components/ui/pill', 'Pill')
      return [\`<div className="flex flex-wrap gap-1.5">\`, ...b.items.map((x) => \`  <Pill tone="\${x.tone}">\${texto(x.label)}</Pill>\`), \`</div>\`]
    case 'stats':
      importar(c, '@/components/dashboard/StatCard', 'StatCard')
      b.items.forEach((x) => importar(c, 'lucide-react', x.icono))
      return [
        \`<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">\`,
        ...b.items.map((x) => \`  <StatCard title=\${valorAttr(x.titulo)} value=\${valorAttr(x.valor)} delta=\${valorAttr(x.delta)} icon={\${x.icono}} />\`),
        \`</div>\`,
      ]
    case 'detalles':
      importar(c, '@/components/patients/PatientSidePanel', 'InfoBlock')
      b.items.forEach((x) => importar(c, 'lucide-react', x.icono))
      return [
        \`<InfoBlock\`,
        \`  className="mt-0"\`,
        \`  title=\${valorAttr(b.titulo)}\`,
        \`  items={[\`,
        ...b.items.map((x) => \`    { icon: \${x.icono}, label: \${comillas(x.label)}, value: \${comillas(x.valor)} },\`),
        \`  ]}\`,
        \`  onEdit={() => {}}\`,
        \`/>\`,
      ]
    case 'tabla': {
      const cj = conjunto(b.datos)
      const campos = cj.campos as Record<string, CampoDato>
      const cols = b.columnas.filter((col) => campos[col.campo])
      importar(c, '@/components/ui/data-table', 'DataTable', ...cols.map((col) => COMPONENTE_CELDA[campos[col.campo]!.tipo]).filter((x) => x !== 'Pill'))
      if (cols.some((col) => campos[col.campo]!.tipo === 'estado')) {
        importar(c, '@/components/ui/pill', 'Pill', 'type PillTone')
        if (!c.datos.some((d) => d.startsWith('const TONO_ESTADO'))) {
          const clave = (k: string) => (/^[A-Za-z]\\w*$/.test(k) ? k : comillas(k))
          c.datos.push([\`const TONO_ESTADO: Record<string, PillTone> = {\`, ...Object.entries(TONO_ESTADO).map(([k, v]) => \`  \${clave(k)}: '\${v}',\`), \`}\`].join('\\n'))
        }
      }
      if (!c.datos.some((d) => d.startsWith(\`const \${cj.variable} =\`))) {
        const valor = (v: string | number) => (typeof v === 'number' ? String(v) : comillas(v))
        c.datos.push([\`const \${cj.variable} = [\`, ...cj.filas.map((f) => \`  { \${Object.entries(f).map(([k, v]) => \`\${k}: \${valor(v)}\`).join(', ')} },\`), \`]\`].join('\\n'))
      }
      const claves: Record<string, number> = {}
      const lineas = [
        \`<DataTable\`,
        \`  rows={\${cj.variable}\${b.filas < cj.filas.length ? \`.slice(0, \${b.filas})\` : ''}}\`,
        \`  rowKey={(r) => r.id}\`,
        \`  rowLabel={(r) => r.\${cj.etiqueta}}\`,
        \`  columns={[\`,
        ...cols.map((col) => {
          const f = campos[col.campo]!
          const n = (claves[col.campo] = (claves[col.campo] ?? 0) + 1)
          const key = n > 1 ? \`\${col.campo}\${n}\` : col.campo
          return \`    { key: '\${key}', header: \${comillas(col.header)}\${col.ancho ? \`, width: \${col.ancho}\` : ''}\${f.tipo === 'monto' ? \`, align: 'right'\` : ''}, cell: (r) => \${codigoCelda(f.tipo, col.campo)} },\`
        }),
        \`  ]}\`,
      ]
      if (b.buscador) lineas.push(\`  search={{ placeholder: 'Search \${cj.plural}', match: (r, q) => r.\${cj.etiqueta}.toLowerCase().includes(q.toLowerCase()) }}\`)
      if (b.seleccion) lineas.push(\`  selectable\`)
      if (b.acciones) {
        importar(c, '@/components/ui/dropdown-menu', 'DropdownMenuItem')
        importar(c, 'lucide-react', 'Pencil', 'Trash2')
        lineas.push(
          \`  rowActions={() => (\`,
          \`    <>\`,
          \`      <DropdownMenuItem><Pencil className="size-4 shrink-0" /> Edit \${cj.singular}</DropdownMenuItem>\`,
          \`      <DropdownMenuItem variant="destructive"><Trash2 className="size-4 shrink-0" /> Delete \${cj.singular}</DropdownMenuItem>\`,
          \`    </>\`,
          \`  )}\`,
        )
      }
      if (b.compacta) lineas.push(\`  density="compact"\`)
      if (b.porPagina !== 10) lineas.push(\`  pageSize={\${b.porPagina}}\`)
      lineas.push(\`  itemLabel="\${cj.plural}"\`, \`/>\`)
      return lineas
    }
    case 'odontograma': {
      importar(c, '@/components/clinical/Odontogram', 'Odontogram')
      importar(c, '@/data/odontogram', 'makeMockExam', 'type OralExam')
      const inicial = b.ejemplo
        ? '<OralExam>(makeMockExam)'
        : \`<OralExam>(() => { const e = makeMockExam(); return { ...e, teeth: e.teeth.map((t) => ({ ...t, element: 'permanent' as const, surfaces: t.surfaces.map(() => null), icons: [], root: null, color: null, findings: [] })) } })\`
      const [v, set] = estado(c, 'examen', inicial)
      const [d, setD] = estado(c, 'dientes', '<number[]>([])')
      return [
        \`<div className="overflow-x-auto">\`,
        \`  <Odontogram\`,
        \`    exam={\${v}}\`,
        \`    selected={\${d}}\`,
        \`    onToggle={(n) => \${setD}((s) => (s.includes(n) ? s.filter((x) => x !== n) : [...s, n]))}\`,
        \`    onSurface={(n, i) => \${set}((e) => ({ ...e, teeth: e.teeth.map((t) => (t.number === n ? { ...t, surfaces: t.surfaces.map((s, k) => (k === i ? (s ? null : '\${MARCAS[b.marca]}') : s)) } : t)) }))}\`,
        \`  />\`,
        \`</div>\`,
      ]
    }
    case 'receta': {
      importar(c, '@/components/patients/form', 'SearchField', 'SelectField', 'TextField')
      const lineas = [
        \`<div className="flex flex-col gap-4">\`,
        \`  <div className="flex items-center gap-2.5">\`,
        \`    <span className="flex size-8 items-center justify-center rounded-lg bg-info-bg text-[13px] font-bold text-dash-blue">Rx</span>\`,
        \`    <h3 className="text-sm font-bold text-ink">\${texto(b.titulo)}</h3>\`,
        \`  </div>\`,
        \`  <div className="grid gap-4 sm:grid-cols-2">\`,
        \`    <SearchField label="Medication" required placeholder="Search a medication" options={\${arreglo(lista(b.medicamentos))}} className="sm:col-span-2" />\`,
        \`    <TextField label="Strength" required placeholder="500 mg" />\`,
        \`    <SelectField label="Dosage form" required placeholder="Select form" options={\${arreglo(FORMAS_DOSIS)}} />\`,
        \`  </div>\`,
        \`  <p className="text-[13px] font-semibold text-ink">Directions for use</p>\`,
        \`  <div className="grid gap-4 sm:grid-cols-3">\`,
        \`    <TextField label="Dose" required placeholder="1 tablet" />\`,
        \`    <SelectField label="Frequency" required placeholder="Select frequency" options={\${arreglo(FRECUENCIAS)}} />\`,
        \`    <TextField label="Duration" placeholder="7 days" />\`,
        \`  </div>\`,
      ]
      if (b.repeticiones || b.sustitucion) {
        lineas.push(\`  <div className="grid items-end gap-4 sm:grid-cols-2">\`)
        if (b.repeticiones) lineas.push(\`    <SelectField label="Refills" placeholder="0" options={['0', '1', '2', '3']} />\`)
        if (b.sustitucion) {
          importar(c, '@/components/ui/switch', 'Switch')
          lineas.push(\`    <label className="flex h-9 items-center justify-between gap-4 text-[13px] text-ink">\`, \`      Allow generic substitution\`, \`      <Switch defaultChecked aria-label="Allow generic substitution" />\`, \`    </label>\`)
        }
        lineas.push(\`  </div>\`)
      }
      if (b.indicaciones) {
        importar(c, '@/components/patients/form', 'TextArea')
        lineas.push(\`  <TextArea label="Instructions for the patient" placeholder="Take after meals. Do not drive if you feel drowsy." />\`)
      }
      lineas.push(\`</div>\`)
      return lineas
    }
    case 'vacio':
      importar(c, '@/components/ui/empty-state', 'EmptyState')
      if (b.icono !== 'none') importar(c, 'lucide-react', b.icono)
      return [
        \`<EmptyState\`,
        ...(b.icono !== 'none' ? [\`  icon={\${b.icono}}\`] : []),
        \`  title=\${valorAttr(b.titulo)}\`,
        ...(b.detalle ? [\`  detail=\${valorAttr(b.detalle)}\`] : []),
        ...(b.accion ? [\`  accion={{ label: \${comillas(b.accion)}, onClick: () => {} }}\`] : []),
        \`/>\`,
      ]
    case 'opciones':
      if (b.control === 'checkbox') {
        importar(c, '@/components/ui/checkbox', 'Checkbox')
        const [v, set] = estado(c, 'marcados', \`<string[]>(\${arreglo(b.items.filter((i) => i.on).map((i) => i.label))})\`)
        return [
          \`<div className="flex flex-col gap-3">\`,
          ...b.items.flatMap((i) => {
            const l = comillas(i.label)
            return [
              \`  <label className="flex items-center gap-2.5 text-[13px] text-ink">\`,
              \`    <Checkbox label=\${valorAttr(i.label)} on={\${v}.includes(\${l})} onChange={(on) => \${set}((m) => (on ? [...m, \${l}] : m.filter((x) => x !== \${l})))} />\`,
              \`    \${texto(i.label)}\`,
              \`  </label>\`,
            ]
          }),
          \`</div>\`,
        ]
      }
      importar(c, '@/components/ui/switch', 'Switch')
      return [
        \`<div className="flex flex-col gap-3">\`,
        ...b.items.flatMap((i) => [
          \`  <label className="flex items-center justify-between gap-4 text-[13px] text-ink">\`,
          \`    \${texto(i.label)}\`,
          \`    <Switch\${i.on ? ' defaultChecked' : ''} aria-label=\${valorAttr(i.label)} />\`,
          \`  </label>\`,
        ]),
        \`</div>\`,
      ]
    case 'turnos':
      importar(c, '@/components/dashboard/AppointmentCard', 'AppointmentCard')
      if (!c.datos.some((d) => d.startsWith('const turnos'))) {
        c.datos.push([\`const turnos = [\`, ...TURNOS.slice(0, b.cantidad).map((a) => \`  { name: \${comillas(a.name)}, initials: \${comillas(a.initials)}, provider: \${comillas(a.provider)}, operatory: \${comillas(a.operatory)}, time: \${comillas(a.time)} },\`), \`]\`].join('\\n'))
      }
      return [\`<div className="flex flex-col gap-2">\`, \`  {turnos.map((t) => <AppointmentCard key={t.name} appt={t} compact />)}\`, \`</div>\`]
    case 'pago': {
      const metodos = lista(b.metodos)
      const aplicar = lista(b.aplicarA)
      importar(c, 'lucide-react', 'CreditCard')
      importar(c, '@/components/patients/form', 'SelectField', 'TextField')
      const [v, set] = estado(c, 'pagos', \`([{ id: 0, monto: '', metodo: \${comillas(metodos[0] ?? '')}, detalle: '', banco: '' }])\`)
      const cambiar = \`cambiar\${v[0]!.toUpperCase()}\${v.slice(1)}\`
      c.estado.push(\`const \${cambiar} = (id: number, cambio: Partial<(typeof \${v})[number]>) => \${set}((ps) => ps.map((x) => (x.id === id ? { ...x, ...cambio } : x)))\`)
      if (b.total) c.estado.push(\`const \${v}Total = \${v}.reduce((t, x) => t + (Number(x.monto.replace(/[^0-9.]/g, '')) || 0), 0)\`)
      const lineas = [\`<div className="flex flex-col gap-4">\`, \`  <h3 className="flex items-center gap-2 text-sm font-bold text-ink"><CreditCard className="size-4" /> \${texto(b.titulo)}</h3>\`]
      if (b.fecha || aplicar.length) {
        lineas.push(\`  <div className="grid gap-4 sm:grid-cols-2">\`)
        if (b.fecha) {
          importar(c, '@/components/patients/form', 'FieldLabel')
          importar(c, '@/components/ui/date-picker', 'DatePicker')
          const [f, setF] = estado(c, 'fecha', '<Date | null>(null)')
          lineas.push(\`    <div className="flex flex-col gap-2">\`, \`      <FieldLabel required>Transaction date</FieldLabel>\`, \`      <DatePicker value={\${f}} onChange={\${setF}} className="h-9 w-full" />\`, \`    </div>\`)
        }
        if (aplicar.length) lineas.push(\`    <SelectField label="Apply to" required options={\${arreglo(aplicar)}} />\`)
        lineas.push(\`  </div>\`)
      }
      const campo = (label: string, clave: string, extra: string) => \`<TextField label="\${label}"\${extra} value={p.\${clave}} onChange={(v) => \${cambiar}(p.id, { \${clave}: v })} />\`
      lineas.push(
        \`  {\${v}.map((p\${b.varios ? ', i' : ''}) => (\`,
        \`    <div key={p.id} className="flex items-start gap-2">\`,
        \`      <div className="grid flex-1 gap-4 sm:grid-cols-2">\`,
        \`        \${campo('Amount', 'monto', ' required placeholder="$ 0.00"')}\`,
        \`        <SelectField label="Payment method" required options={\${arreglo(metodos)}} value={p.metodo} onChange={(v) => \${cambiar}(p.id, { metodo: v })} />\`,
      )
      if (metodos.includes('Check payment')) lineas.push(\`        {p.metodo === 'Check payment' && (\`, \`          <>\`, \`            \${campo('Check number', 'detalle', ' required placeholder="1234"')}\`, \`            \${campo('Bank/Branch', 'banco', ' required placeholder="AE9323AMB"')}\`, \`          </>\`, \`        )}\`)
      if (metodos.includes('Card payment')) lineas.push(\`        {p.metodo === 'Card payment' && \${campo('Card last 4 digits', 'detalle', ' placeholder="4242"')}}\`)
      if (metodos.includes('Electronic payment')) lineas.push(\`        {p.metodo === 'Electronic payment' && \${campo('Reference', 'detalle', ' placeholder="TRX-20250312"')}}\`)
      lineas.push(\`      </div>\`)
      if (b.varios) {
        importar(c, '@/components/ui/button', 'Button')
        importar(c, 'lucide-react', 'Plus', 'X')
        lineas.push(
          \`      {i === \${v}.length - 1 ? (\`,
          \`        <Button variant="secondary" iconOnly aria-label="Add another payment method" className="mt-7" onClick={() => \${set}((ps) => [...ps, { id: Math.max(...ps.map((x) => x.id)) + 1, monto: '', metodo: \${comillas(metodos[0] ?? '')}, detalle: '', banco: '' }])}>\`,
          \`          <Plus />\`,
          \`        </Button>\`,
          \`      ) : (\`,
          \`        <Button variant="secondary" iconOnly aria-label="Remove this payment method" className="mt-7" onClick={() => \${set}((ps) => ps.filter((x) => x.id !== p.id))}>\`,
          \`          <X />\`,
          \`        </Button>\`,
          \`      )}\`,
        )
      }
      lineas.push(\`    </div>\`, \`  ))}\`)
      if (b.notas) {
        importar(c, '@/components/patients/form', 'TextArea')
        lineas.push(\`  <TextArea label="Notes" placeholder="Anything the front desk should know" />\`)
      }
      if (b.total) lineas.push(
        \`  <div className="flex items-center justify-between rounded-lg bg-surface-subtle px-4 py-3">\`,
        \`    <span className="text-[13px] text-ink-muted">Total payment</span>\`,
        \`    <span className="text-[15px] font-semibold text-ink tabular-nums">{\${v}Total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>\`,
        \`  </div>\`,
      )
      lineas.push(\`</div>\`)
      return lineas
    }
    case 'calendario': {
      importar(c, '@/components/scheduling/calendar-data', 'EVENTOS_INICIALES', 'FECHA_ANCLA')
      const vistas = b.selector ? (['Day', 'Week', 'Month'] as const) : [b.vista]
      const COMP = { Day: 'VistaDia', Week: 'VistaSemana', Month: 'VistaMes' } as const
      importar(c, '@/components/scheduling/CalendarViews', ...vistas.map((x) => COMP[x]), ...(b.selector ? ['type Vista'] : []))
      const [ev, setEv] = estado(c, 'eventos', '(EVENTOS_INICIALES)')
      const mover = \`mover\${ev[0]!.toUpperCase()}\${ev.slice(1)}\`
      c.estado.push(\`const \${mover} = (i: number, fecha: Date, start?: number) => \${setEv}((es) => es.map((e, k) => (k === i ? { ...e, fecha, start: start ?? e.start } : e)))\`)
      const props = \`eventos={\${ev}} fecha={FECHA_ANCLA} onMover={\${mover}} onAbrir={() => {}}\`
      const lineas = [\`<div className="flex min-w-0 flex-col gap-3">\`]
      let vista = ''
      if (b.selector || b.leyenda) {
        lineas.push(\`  <div className="flex flex-wrap items-center justify-between gap-3">\`)
        if (b.selector) {
          importar(c, '@/components/ui/tabs', 'Tabs')
          const [v, set] = estado(c, 'vista', \`<Vista>(\${comillas(b.vista)})\`)
          vista = v
          lineas.push(\`    <Tabs tabs={['Day', 'Week', 'Month'] as const} value={\${v}} onChange={\${set}} />\`)
        }
        if (b.leyenda) {
          importar(c, '@/components/scheduling/StatusLegend', 'StatusLegend')
          lineas.push(\`    <StatusLegend />\`)
        }
        lineas.push(\`  </div>\`)
      }
      if (vista) vistas.forEach((x) => lineas.push(\`  {\${vista} === '\${x}' && <\${COMP[x]} \${props} />}\`))
      else lineas.push(\`  <\${COMP[b.vista]} \${props} />\`)
      lineas.push(\`</div>\`)
      return lineas
    }
    case 'horarios': {
      importar(c, '@/components/scheduling/AppointmentSlotPicker', 'AppointmentSlotPicker')
      const [v, set] = estado(c, 'hora', '<string | undefined>()')
      return [
        \`<AppointmentSlotPicker\`,
        \`  provider=\${valorAttr(b.provider)}\`,
        \`  especialidad=\${valorAttr(b.especialidad)}\`,
        \`  fecha=\${valorAttr(b.fecha)}\`,
        \`  seleccion={\${v}}\`,
        \`  onPick={\${set}}\`,
        \`  className="h-[440px]"\`,
        \`/>\`,
      ]
    }
    case 'tareas':
      importar(c, '@/components/dashboard/PendingTaskCard', 'PendingTaskCard')
      if (!c.datos.some((d) => d.startsWith('const tareas'))) {
        c.datos.push([\`const tareas = [\`, ...TAREAS.slice(0, b.cantidad).map((t) => \`  { kind: \${comillas(t.kind)}, state: \${comillas(t.state)}, person: \${comillas(t.person)}, initials: \${comillas(t.initials)}, register: \${comillas(t.register)}, expiration: \${comillas(t.expiration)} },\`), \`]\`].join('\\n'))
      }
      return [\`<div className="grid gap-3 sm:grid-cols-2">\`, \`  {tareas.map((t) => <PendingTaskCard key={t.kind} task={t} />)}\`, \`</div>\`]
    case 'divisor':
      return [\`<hr className="border-line-row" />\`]
    case 'migas': {
      importar(c, '@/components/ui/breadcrumb', 'Breadcrumb')
      const items = lista(b.items)
      return [\`<Breadcrumb items={[\${items.map((l, i) => \`{ label: \${comillas(l)}\${i < items.length - 1 ? ", to: '/'" : ''} }\`).join(', ')}]} />\`]
    }
    case 'pasos': {
      importar(c, '@/components/clinical/StepIndicator', 'StepIndicator')
      const etiqueta = lista(b.etiquetas)[b.actual - 1]
      return [
        \`<div className="flex flex-col gap-2">\`,
        \`  <StepIndicator total={\${b.total}} current={\${b.actual}} />\`,
        ...(etiqueta ? [\`  <p className="text-[12px] font-semibold tracking-[0.04em] text-ink-muted uppercase">Step \${b.actual} of \${b.total} — \${texto(etiqueta)}</p>\`] : []),
        \`</div>\`,
      ]
    }
    case 'paginacion': {
      importar(c, '@/components/patients/ledger/Pagination', 'Pagination')
      const [v, set] = estado(c, 'pagina', '(1)')
      return [\`<div className="flex justify-end">\`, \`  <Pagination pagina={\${v}} paginas={\${b.paginas}} onChange={\${set}} />\`, \`</div>\`]
    }
    case 'busqueda': {
      importar(c, 'lucide-react', 'Search')
      importar(c, '@/components/ui/search-button', 'SearchButton')
      const [v, set] = estado(c, 'busqueda', "('')")
      const lineas = [
        \`<div className="flex flex-wrap items-center gap-3">\`,
        \`  <div className="relative w-full sm:w-[320px]">\`,
        \`    <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />\`,
        \`    <input value={\${v}} onChange={(e) => \${set}(e.target.value)} placeholder=\${valorAttr(b.placeholder)} className="\${CLASE_BUSCADOR}" />\`,
        \`  </div>\`,
        \`  <SearchButton className="h-8" />\`,
      ]
      if (b.filtro) {
        importar(c, '@/components/dashboard/FilterMenu', 'FilterMenu')
        const [f, setF] = estado(c, 'filtro', '<string[]>([])')
        lineas.push(\`  <FilterMenu label=\${valorAttr(b.filtro)} options={\${arreglo(lista(b.opcionesFiltro))}} value={\${f}} onChange={\${setF}} />\`)
      }
      if (b.accion) {
        importar(c, '@/components/ui/button', 'Button')
        importar(c, 'lucide-react', 'Plus')
        lineas.push(\`  <Button size="md" className="ml-auto"><Plus /> \${texto(b.accion)}</Button>\`)
      }
      return [...lineas, \`</div>\`]
    }
    case 'aviso': {
      const a = ALERTAS[b.tono]
      importar(c, 'lucide-react', a.nombre)
      return [
        \`<div role="status" className="flex items-start gap-3 rounded-lg border px-4 py-3 \${a.caja}">\`,
        \`  <\${a.nombre} className="mt-0.5 size-4 shrink-0 \${a.color}" />\`,
        \`  <div className="flex min-w-0 flex-col gap-0.5">\`,
        \`    <p className="text-[13px] font-semibold \${a.color}">\${texto(b.titulo)}</p>\`,
        ...(b.texto ? [\`    <p className="text-[13px] leading-relaxed text-ink">\${texto(b.texto)}</p>\`] : []),
        \`  </div>\`,
        \`</div>\`,
      ]
    }
    case 'persona': {
      importar(c, '@/components/ui/avatar', 'Avatar', 'AvatarFallback')
      if (b.estado) importar(c, '@/components/ui/pill', 'Pill')
      return [
        \`<div className="flex items-center gap-3">\`,
        \`  <Avatar className="\${b.grande ? 'size-[62px]' : 'size-10'}">\`,
        \`    <AvatarFallback className="bg-dash-blue-hover text-surface-subtle \${b.grande ? 'text-xl' : 'text-[13px]'}">\${iniciales(b.nombre)}</AvatarFallback>\`,
        \`  </Avatar>\`,
        \`  <div className="flex min-w-0 flex-col gap-0.5">\`,
        \`    <span className="flex items-center gap-2">\`,
        \`      <span className="truncate font-semibold text-ink \${b.grande ? 'text-lg' : 'text-[15px]'}">\${texto(b.nombre)}</span>\`,
        ...(b.estado ? [\`      <Pill tone="\${b.estado === 'Active' ? 'success' : 'neutral'}" size="sm">\${b.estado}</Pill>\`] : []),
        \`    </span>\`,
        ...(b.detalle ? [\`    <span className="text-[13px] text-ink-muted">\${texto(b.detalle)}</span>\`] : []),
        \`  </div>\`,
        \`</div>\`,
      ]
    }
    case 'metricas':
      importar(c, '@/components/dashboard/StatStrip', 'StatStrip')
      b.items.forEach((x) => importar(c, 'lucide-react', x.icono))
      return [
        \`<StatStrip\${b.apilada ? ' apilada' : ''} stats={[\`,
        ...b.items.map((x) => \`  { label: \${comillas(x.titulo)}, value: \${comillas(x.valor)}, nota: \${comillas(x.nota)}, icon: \${x.icono} },\`),
        \`]} />\`,
      ]
    case 'operatorios':
      importar(c, '@/components/dashboard/OperatoryCard', 'OperatoryCard', 'type Operatory')
      if (!c.datos.some((d) => d.startsWith('const salas'))) {
        c.datos.push([\`const salas: Operatory[] = [\`, ...SALAS.slice(0, b.cantidad).map((r) => \`  { name: \${comillas(r.name)}, status: \${comillas(r.status)}, patientsToday: \${r.patientsToday}, provider: \${comillas(r.provider)} },\`), \`]\`].join('\\n'))
      }
      return [\`<div className="grid gap-3 sm:grid-cols-2">\`, \`  {salas.map((r) => <OperatoryCard key={r.name} room={r} />)}\`, \`</div>\`]
    case 'pacientes':
      importar(c, '@/components/patients/PatientCard', 'PatientCard')
      importar(c, '@/components/patients/PatientsTable', 'type PatientRow')
      if (!c.datos.some((d) => d.startsWith('const filas'))) {
        c.datos.push([\`const filas: PatientRow[] = [\`, ...FILAS.slice(0, b.cantidad).map((r) => \`  { id: \${comillas(r.id)}, name: \${comillas(r.name)}, initials: \${comillas(r.initials)}, birthday: \${comillas(r.birthday)}, email: \${comillas(r.email)}, status: \${comillas(r.status)} },\`), \`]\`].join('\\n'))
      }
      return [\`<div className="flex flex-col gap-2">\`, \`  {filas.map((r) => <PatientCard key={r.id} row={r} onEdit={() => {}} />)}\`, \`</div>\`]
    case 'subir':
      importar(c, 'lucide-react', 'Upload')
      if (b.accion) importar(c, '@/components/ui/button', 'Button')
      return [
        \`<div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-line bg-surface-subtle px-6 py-8 text-center">\`,
        \`  <span className="flex size-10 items-center justify-center rounded-full bg-info-bg text-dash-blue"><Upload className="size-5" /></span>\`,
        \`  <p className="text-sm font-semibold text-ink">\${texto(b.titulo)}</p>\`,
        ...(b.detalle ? [\`  <p className="text-[13px] text-ink-muted">\${texto(b.detalle)}</p>\`] : []),
        ...(b.accion ? [\`  <Button variant="secondary" size="md">\${texto(b.accion)}</Button>\`] : []),
        \`</div>\`,
      ]
  }
}

export const nombreComponente = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9 ]/g, ' ').split(/\\s+/).filter(Boolean).map((w) => w[0]!.toUpperCase() + w.slice(1)).join('') || 'MyComponent'

const ORDEN_IMPORTS = (a: string) => (a === 'react' ? 0 : a === 'lucide-react' ? 1 : 2)

export function generarCodigo(d: Diseno): string {
  const c: Codigo = { imports: new Map(), estado: [], datos: [], cuenta: {} }
  const cuerpo = d.bloques.flatMap((b) => codigoBloque(c, b, d.contenedor))
  let abre: string
  let cierra: string
  if (d.contenedor === 'panel') {
    importar(c, '@/components/dashboard/primitives', 'Panel')
    abre = \`<Panel title=\${valorAttr(d.tituloPanel || 'Panel')}>\`
    cierra = \`</Panel>\`
  } else if (d.contenedor === 'libre') {
    abre = \`<>\`
    cierra = \`</>\`
  } else if (d.contenedor === 'page' || d.contenedor === 'app') {
    importar(c, '@/lib/estilos', 'CONTENEDOR_PAGINA')
    importar(c, '@/lib/utils', 'cn')
    abre = \`<div className={cn(CONTENEDOR_PAGINA, 'flex flex-col gap-6')}>\`
    cierra = \`</div>\`
  } else {
    importar(c, '@/components/ui/card', 'Card')
    abre = \`<Card className="flex flex-col gap-5 p-5">\`
    cierra = \`</Card>\`
  }
  const imports = [...c.imports]
    .sort(([a], [b]) => ORDEN_IMPORTS(a) - ORDEN_IMPORTS(b) || a.localeCompare(b))
    .map(([desde, nombres]) => \`import { \${[...nombres].sort((a, b) => a.replace(/^type /, '').localeCompare(b.replace(/^type /, ''))).join(', ')} } from '\${desde}'\`)
  const jsx = cuerpo.length ? cuerpo : ['{/* Sumá bloques desde el constructor. */}']
  /* Una pantalla de la app se dibuja adentro de AppShell, que pone el menú lateral y la barra: acá va sólo su contenido. */
  if (d.contenedor === 'app') jsx.unshift('{/* Pantalla: sumala como ruta adentro de AppShell en src/AppRoutes.tsx. */}')
  return [
    ...imports,
    '',
    ...c.datos.flatMap((x) => [x, '']),
    \`export function \${nombreComponente(d.nombre)}() {\`,
    ...c.estado.map((l) => \`  \${l}\`),
    ...(c.estado.length ? [''] : []),
    \`  return (\`,
    \`    \${abre}\`,
    ...sangrar(jsx, 6),
    \`    \${cierra}\`,
    \`  )\`,
    \`}\`,
    '',
  ].join('\\n')
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
        tablaDe('pacientes', { campos: ['name', 'status', 'next', 'provider', 'insurance', 'lastVisit', 'balance'], filas: 8, seleccion: true }),
      ],
    }),
  },
  {
    nombre: 'Ledger', que: 'Todos los movimientos, con muchas columnas',
    crear: () => ({
      nombre: 'Ledger screen', contenedor: 'page', tituloPanel: '', ancho: 'completo',
      bloques: [
        encabezado('Ledger', 'Charges, payments and adjustments for this location.', 'Post payment', 'Plus'),
        { id: nuevoId(), tipo: 'pestanas', tabs: 'All, Charges, Payments, Adjustments', size: 'md', fullWidth: false },
        tablaDe('movimientos', { campos: ['date', 'patient', 'code', 'description', 'provider', 'type', 'amount', 'status'], filas: 8, compacta: true, porPagina: 10, seleccion: true }),
      ],
    }),
  },
  {
    nombre: 'Prescriptions', que: 'Las recetas del paciente y un modal para hacer una nueva',
    crear: () => ({
      nombre: 'Prescriptions card', contenedor: 'card', tituloPanel: '', ancho: 'completo',
      bloques: [
        encabezado('Prescriptions', 'Medication prescribed at this clinic.'),
        { id: nuevoId(), tipo: 'modal', titulo: 'New prescription', disparador: 'New prescription', ancho: 'md', confirmar: 'Sign and send', cancelar: 'Cancel', peligro: false, bloques: [infoDe('receta').nuevo()] },
        tablaDe('recetas', { filas: 6, buscador: false, compacta: true }),
      ],
    }),
  },
  {
    nombre: 'Dental chart', que: 'El odontograma con su leyenda',
    crear: () => ({
      nombre: 'Dental chart card', contenedor: 'card', tituloPanel: '', ancho: 'completo',
      bloques: [
        encabezado('Dental chart', 'Click a tooth number to select it and a surface to mark it.'),
        { id: nuevoId(), tipo: 'pills', items: [{ label: 'Caries', tone: 'danger' }, { label: 'Restoration', tone: 'info' }, { label: 'Planned', tone: 'warning' }] },
        infoDe('odontograma').nuevo(),
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
`})))()}export{n,i as r,r as t};