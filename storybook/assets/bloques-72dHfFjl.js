import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState, type ReactNode } from 'react'
import {
  CalendarClock, CalendarDays, Download, FileText, Heading, Inbox, Minus, MousePointerClick, PanelsTopLeft, Pencil,
  Plus, Save, Search, Send, Settings, Table, Tag, TextCursorInput, ToggleRight, Trash2, Type, Users, type LucideIcon,
} from 'lucide-react'
import { Button, type ButtonSize, type ButtonVariant } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Panel } from '@/components/dashboard/primitives'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { Tabs } from '@/components/ui/tabs'
import { DateTextField, SearchField, SelectField, TextArea, TextField } from '@/components/patients/form'
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
   real de la app (\`Ver\`) y escribir su código (\`codigo\`), uno al lado del
   otro: lo que se ve en el lienzo y lo que se copia son siempre lo mismo. */

/* ── Modelo ─────────────────────────────────────────────────────────── */

/* Llave con la que una página le pasa al constructor qué bloque sumar. */
export const AGREGAR = 'confidentally-ui-builder-add'

export const ICONOS = { none: null, Plus, Save, Download, Pencil, Trash2, Search, Send, CalendarDays, Users, FileText, Settings } as const
export type NombreIcono = keyof typeof ICONOS

export type Boton = { label: string; variant: ButtonVariant; size: ButtonSize; icono: NombreIcono }
export type ClaseCampo = 'text' | 'select' | 'date' | 'textarea' | 'search'
export type Campo = { id: string; clase: ClaseCampo; label: string; placeholder: string; opciones: string; hint: string; error: string; required: boolean; disabled: boolean }
export type ColumnaTabla = 'patient' | 'status' | 'next' | 'provider' | 'balance'

export type Bloque = { id: string } & (
  | { tipo: 'encabezado'; titulo: string; bajada: string; accion: string; icono: NombreIcono }
  | { tipo: 'texto'; texto: string; tono: 'normal' | 'suave' }
  | { tipo: 'botones'; alinear: 'inicio' | 'fin' | 'extremos'; botones: Boton[] }
  | { tipo: 'pestanas'; tabs: string; size: 'sm' | 'md'; fullWidth: boolean }
  | { tipo: 'campos'; columnas: 1 | 2; campos: Campo[] }
  | { tipo: 'pills'; items: { label: string; tone: PillTone }[] }
  | { tipo: 'tabla'; columnas: ColumnaTabla[]; filas: number; buscador: boolean; seleccion: boolean; acciones: boolean; compacta: boolean; porPagina: number }
  | { tipo: 'vacio'; icono: NombreIcono; titulo: string; detalle: string; accion: string }
  | { tipo: 'opciones'; control: 'switch' | 'checkbox'; items: { label: string; on: boolean }[] }
  | { tipo: 'turnos'; cantidad: number }
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
export const nuevoId = () => \`b\${Date.now().toString(36)}\${(n++).toString(36)}\`

export const campo = (c: Partial<Campo> = {}): Campo => ({
  id: nuevoId(), clase: 'text', label: 'Label', placeholder: '', opciones: '', hint: '', error: '', required: false, disabled: false, ...c,
})

/* Los tipos de bloque, con lo que trae cada uno al agregarlo. */
export const TIPOS: { tipo: TipoBloque; nombre: string; que: string; icono: LucideIcon; nuevo: () => Bloque }[] = [
  { tipo: 'encabezado', nombre: 'Heading', que: 'Título, bajada y acción principal', icono: Heading, nuevo: () => ({ id: nuevoId(), tipo: 'encabezado', titulo: 'Title', bajada: 'A short line that says what this is for.', accion: '', icono: 'none' }) },
  { tipo: 'texto', nombre: 'Text', que: 'Un párrafo', icono: Type, nuevo: () => ({ id: nuevoId(), tipo: 'texto', texto: 'Write something useful for the person using this screen.', tono: 'suave' }) },
  { tipo: 'botones', nombre: 'Buttons', que: 'Acciones: primaria, secundaria…', icono: MousePointerClick, nuevo: () => ({ id: nuevoId(), tipo: 'botones', alinear: 'fin', botones: [{ label: 'Cancel', variant: 'secondary', size: 'lg', icono: 'none' }, { label: 'Save', variant: 'primary', size: 'lg', icono: 'none' }] }) },
  { tipo: 'pestanas', nombre: 'Tabs', que: 'Cambiar de vista', icono: PanelsTopLeft, nuevo: () => ({ id: nuevoId(), tipo: 'pestanas', tabs: 'All, Active, Inactive', size: 'md', fullWidth: false }) },
  { tipo: 'campos', nombre: 'Fields', que: 'Un formulario', icono: TextCursorInput, nuevo: () => ({ id: nuevoId(), tipo: 'campos', columnas: 2, campos: [campo({ label: 'First name', placeholder: 'Maria' }), campo({ label: 'Last name', placeholder: 'Viola' })] }) },
  { tipo: 'pills', nombre: 'Pills', que: 'Estados', icono: Tag, nuevo: () => ({ id: nuevoId(), tipo: 'pills', items: [{ label: 'Active', tone: 'success' }, { label: 'Pending', tone: 'warning' }] }) },
  { tipo: 'tabla', nombre: 'Table', que: 'Una lista de pacientes', icono: Table, nuevo: () => ({ id: nuevoId(), tipo: 'tabla', columnas: ['patient', 'status', 'next', 'balance'], filas: 6, buscador: true, seleccion: false, acciones: true, compacta: false, porPagina: 5 }) },
  { tipo: 'vacio', nombre: 'Empty state', que: 'Cuando todavía no hay nada', icono: Inbox, nuevo: () => ({ id: nuevoId(), tipo: 'vacio', icono: 'CalendarDays', titulo: 'Nothing here yet', detalle: 'When there is something to show, it will appear here.', accion: '' }) },
  { tipo: 'opciones', nombre: 'Switches', que: 'Prender o apagar opciones', icono: ToggleRight, nuevo: () => ({ id: nuevoId(), tipo: 'opciones', control: 'switch', items: [{ label: 'Email reminders', on: true }, { label: 'SMS confirmations', on: false }] }) },
  { tipo: 'turnos', nombre: 'Appointments', que: 'Turnos del día', icono: CalendarClock, nuevo: () => ({ id: nuevoId(), tipo: 'turnos', cantidad: 3 }) },
  { tipo: 'divisor', nombre: 'Divider', que: 'Una línea para separar', icono: Minus, nuevo: () => ({ id: nuevoId(), tipo: 'divisor' }) },
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

const COLUMNAS: Record<ColumnaTabla, { header: string; col: DataTableColumn<Paciente>; codigo: string }> = {
  patient: { header: 'Patient', col: { key: 'patient', header: 'Patient', cell: (p) => <PersonCell name={p.name} initials={p.initials} /> }, codigo: \`{ key: 'patient', header: 'Patient', cell: (p) => <PersonCell name={p.name} initials={p.initials} /> }\` },
  status: { header: 'Status', col: { key: 'status', header: 'Status', width: 120, cell: (p) => <Pill tone={p.status === 'Active' ? 'success' : 'neutral'}>{p.status}</Pill> }, codigo: \`{ key: 'status', header: 'Status', width: 120, cell: (p) => <Pill tone={p.status === 'Active' ? 'success' : 'neutral'}>{p.status}</Pill> }\` },
  next: { header: 'Next appointment', col: { key: 'next', header: 'Next appointment', width: 180, cell: (p) => <TextCell>{p.next}</TextCell> }, codigo: \`{ key: 'next', header: 'Next appointment', width: 180, cell: (p) => <TextCell>{p.next}</TextCell> }\` },
  provider: { header: 'Provider', col: { key: 'provider', header: 'Provider', width: 170, cell: (p) => <TextCell>{p.provider}</TextCell> }, codigo: \`{ key: 'provider', header: 'Provider', width: 170, cell: (p) => <TextCell>{p.provider}</TextCell> }\` },
  balance: { header: 'Balance', col: { key: 'balance', header: 'Balance', width: 110, align: 'right', cell: (p) => <AmountCell value={p.balance} /> }, codigo: \`{ key: 'balance', header: 'Balance', width: 110, align: 'right', cell: (p) => <AmountCell value={p.balance} /> }\` },
}
export const NOMBRE_COLUMNA = Object.fromEntries(Object.entries(COLUMNAS).map(([k, v]) => [k, v.header])) as Record<ColumnaTabla, string>

/* ── Cómo se ve ─────────────────────────────────────────────────────── */

const ALINEAR = { inicio: 'justify-start', fin: 'justify-end', extremos: 'justify-between' } as const
const lista = (s: string) => s.split(',').map((x) => x.trim()).filter(Boolean)

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
    case 'campos':
      return (
        <div className={cn('grid gap-4', b.columnas === 2 && 'sm:grid-cols-2')}>
          {b.campos.map((c) => <VerCampo key={c.id} c={c} ancho={b.columnas === 2 && c.clase === 'textarea' ? 'sm:col-span-2' : undefined} />)}
        </div>
      )
    case 'pills':
      return <div className="flex flex-wrap gap-1.5">{b.items.map((x, i) => <Pill key={i} tone={x.tone}>{x.label}</Pill>)}</div>
    case 'tabla':
      return (
        <DataTable
          key={\`\${b.porPagina}-\${b.filas}\`}
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
      const I = ICONOS[b.icono] ?? undefined
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

type Codigo = { imports: Map<string, Set<string>>; estado: string[]; datos: string[] }

const valorAttr = (s: string) => (/["{}<>\\\\]/.test(s) ? \`{\${comillas(s)}}\` : \`"\${s}"\`)
/* Un texto como literal de JS con comillas simples, como el resto del código. */
const comillas = (s: string) => \`'\${s.replace(/\\\\/g, '\\\\\\\\').replace(/'/g, "\\\\'")}'\`
const arreglo = (xs: string[]) => \`[\${xs.map(comillas).join(', ')}]\`
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

function codigoCampo(c: Codigo, f: Campo, extra?: string): string {
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

function codigoBloque(c: Codigo, b: Bloque, contenedor: TipoContenedor, orden: number): string[] {
  switch (b.tipo) {
    case 'encabezado': {
      if (b.accion) importar(c, '@/components/ui/button', 'Button')
      const accion = b.accion ? \`<Button size="md">\${conIcono(c, b.icono, b.accion)}</Button>\` : ''
      if (contenedor === 'page') {
        importar(c, '@/components/settings/SettingsPageHeader', 'SettingsPageHeader')
        return [
          \`<SettingsPageHeader\`,
          \`  titulo=\${valorAttr(b.titulo)}\`,
          \`  bajada=\${valorAttr(b.bajada)}\`,
          ...(accion ? [\`  accion={\${accion}}\`] : []),
          \`/>\`,
        ]
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
      importar(c, 'react', 'useState')
      const v = orden ? \`pestana\${orden + 1}\` : 'pestana'
      const set = \`set\${v[0]!.toUpperCase()}\${v.slice(1)}\`
      c.estado.push(\`const [\${v}, \${set}] = useState(\${comillas(tabs[0] ?? '')})\`)
      const props = [b.size === 'sm' && 'size="sm"', b.fullWidth && 'fullWidth'].filter(Boolean).join(' ')
      return [\`<Tabs tabs={\${arreglo(tabs)}} value={\${v}} onChange={\${set}}\${props ? \` \${props}\` : ''} />\`]
    }
    case 'campos':
      return [
        \`<div className="grid gap-4\${b.columnas === 2 ? ' sm:grid-cols-2' : ''}">\`,
        ...b.campos.map((f) => \`  \${codigoCampo(c, f, b.columnas === 2 && f.clase === 'textarea' ? 'sm:col-span-2' : undefined)}\`),
        \`</div>\`,
      ]
    case 'pills':
      importar(c, '@/components/ui/pill', 'Pill')
      return [\`<div className="flex flex-wrap gap-1.5">\`, ...b.items.map((x) => \`  <Pill tone="\${x.tone}">\${texto(x.label)}</Pill>\`), \`</div>\`]
    case 'tabla': {
      importar(c, '@/components/ui/data-table', 'DataTable', ...(b.columnas.includes('patient') ? ['PersonCell'] : []), ...(b.columnas.some((x) => x === 'next' || x === 'provider') ? ['TextCell'] : []), ...(b.columnas.includes('balance') ? ['AmountCell'] : []))
      if (b.columnas.includes('status')) importar(c, '@/components/ui/pill', 'Pill')
      if (!c.datos.some((d) => d.startsWith('const pacientes'))) {
        c.datos.push([
          \`const pacientes = [\`,
          ...PACIENTES.slice(0, b.filas).map((p) => \`  \${JSON.stringify(p).replace(/"(\\w+)":/g, '$1: ').replace(/,(?=\\w+:)/g, ', ').replace(/^\\{/, '{ ').replace(/\\}$/, ' }').replace(/"/g, "'")},\`),
          \`]\`,
        ].join('\\n'))
      }
      const lineas = [
        \`<DataTable\`,
        \`  rows={pacientes}\`,
        \`  rowKey={(p) => p.id}\`,
        \`  rowLabel={(p) => p.name}\`,
        \`  columns={[\`,
        ...b.columnas.map((x) => \`    \${COLUMNAS[x].codigo},\`),
        \`  ]}\`,
      ]
      if (b.buscador) lineas.push(\`  search={{ placeholder: 'Search patients', match: (p, q) => p.name.toLowerCase().includes(q.toLowerCase()) }}\`)
      if (b.seleccion) lineas.push(\`  selectable\`)
      if (b.acciones) {
        importar(c, '@/components/ui/dropdown-menu', 'DropdownMenuItem')
        importar(c, 'lucide-react', 'Pencil', 'Trash2')
        lineas.push(
          \`  rowActions={() => (\`,
          \`    <>\`,
          \`      <DropdownMenuItem><Pencil className="size-4 shrink-0" /> Edit patient</DropdownMenuItem>\`,
          \`      <DropdownMenuItem variant="destructive"><Trash2 className="size-4 shrink-0" /> Delete patient</DropdownMenuItem>\`,
          \`    </>\`,
          \`  )}\`,
        )
      }
      if (b.compacta) lineas.push(\`  density="compact"\`)
      if (b.porPagina !== 10) lineas.push(\`  pageSize={\${b.porPagina}}\`)
      lineas.push(\`  itemLabel="patients"\`, \`/>\`)
      return lineas
    }
    case 'vacio': {
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
    }
    case 'opciones':
      if (b.control === 'checkbox') {
        importar(c, '@/components/ui/checkbox', 'Checkbox')
        importar(c, 'react', 'useState')
        const v = orden ? \`marcados\${orden + 1}\` : 'marcados'
        const set = \`set\${v[0]!.toUpperCase()}\${v.slice(1)}\`
        c.estado.push(\`const [\${v}, \${set}] = useState<string[]>(\${arreglo(b.items.filter((i) => i.on).map((i) => i.label))})\`)
        return [
          \`<div className="flex flex-col gap-3">\`,
          ...b.items.map((i) => {
            const l = comillas(i.label)
            return \`  <label className="flex items-center gap-2.5 text-[13px] text-ink">\\n    <Checkbox label=\${valorAttr(i.label)} on={\${v}.includes(\${l})} onChange={(on) => \${set}((m) => (on ? [...m, \${l}] : m.filter((x) => x !== \${l})))} />\\n    \${texto(i.label)}\\n  </label>\`
          }),
          \`</div>\`,
        ]
      }
      importar(c, '@/components/ui/switch', 'Switch')
      return [
        \`<div className="flex flex-col gap-3">\`,
        ...b.items.map((i) => \`  <label className="flex items-center justify-between gap-4 text-[13px] text-ink">\\n    \${texto(i.label)}\\n    <Switch\${i.on ? ' defaultChecked' : ''} aria-label=\${valorAttr(i.label)} />\\n  </label>\`),
        \`</div>\`,
      ]
    case 'turnos':
      importar(c, '@/components/dashboard/AppointmentCard', 'AppointmentCard')
      if (!c.datos.some((d) => d.startsWith('const turnos'))) {
        c.datos.push([\`const turnos = [\`, ...TURNOS.slice(0, b.cantidad).map((a) => \`  { name: '\${a.name}', initials: '\${a.initials}', provider: '\${a.provider}', operatory: '\${a.operatory}', time: '\${a.time}' },\`), \`]\`].join('\\n'))
      }
      return [\`<div className="flex flex-col gap-2">\`, \`  {turnos.map((t) => <AppointmentCard key={t.name} appt={t} compact />)}\`, \`</div>\`]
    case 'divisor':
      return [\`<hr className="border-line-row" />\`]
  }
}

export const nombreComponente = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9 ]/g, ' ').split(/\\s+/).filter(Boolean).map((w) => w[0]!.toUpperCase() + w.slice(1)).join('') || 'MyComponent'

const ORDEN_IMPORTS = (a: string) => (a === 'react' ? 0 : a === 'lucide-react' ? 1 : 2)

export function generarCodigo(d: Diseno): string {
  const c: Codigo = { imports: new Map(), estado: [], datos: [] }
  /* Cada bloque con estado propio (pestañas, casillas) lleva su número:
     pestana, pestana2… */
  const porTipo: Record<string, number> = {}
  const cuerpo = d.bloques.flatMap((b) => {
    const clave = b.tipo === 'opciones' ? \`\${b.tipo}-\${b.control}\` : b.tipo
    const orden = porTipo[clave] ?? 0
    porTipo[clave] = orden + 1
    return codigoBloque(c, b, d.contenedor, orden)
  })
  let abre: string
  let cierra: string
  if (d.contenedor === 'panel') {
    importar(c, '@/components/dashboard/primitives', 'Panel')
    abre = \`<Panel title=\${valorAttr(d.tituloPanel || 'Panel')}>\`
    cierra = \`</Panel>\`
  } else if (d.contenedor === 'page') {
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
    .map(([desde, nombres]) => \`import { \${[...nombres].sort((a, b) => a.localeCompare(b)).join(', ')} } from '\${desde}'\`)
  const jsx = cuerpo.length ? cuerpo.join('\\n').split('\\n') : ['{/* Sumá bloques desde el constructor. */}']
  return [
    ...imports,
    '',
    ...(c.datos.length ? [...c.datos.flatMap((x) => [x, ''])] : []),
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

export const PLANTILLAS: { nombre: string; que: string; crear: () => Diseno }[] = [
  {
    nombre: 'Settings form', que: 'Una card con un formulario y sus botones',
    crear: () => ({
      nombre: 'Clinic details card', contenedor: 'card', tituloPanel: '', ancho: 'medio',
      bloques: [
        { id: nuevoId(), tipo: 'encabezado', titulo: 'Clinic details', bajada: 'Name and contact shown to patients.', accion: '', icono: 'none' },
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
    nombre: 'Patient list', que: 'Una pantalla con encabezado, pestañas y tabla',
    crear: () => ({
      nombre: 'Patients screen', contenedor: 'page', tituloPanel: '', ancho: 'completo',
      bloques: [
        { id: nuevoId(), tipo: 'encabezado', titulo: 'Patients', bajada: 'Everyone registered in this location.', accion: 'New patient', icono: 'Plus' },
        { id: nuevoId(), tipo: 'pestanas', tabs: 'All, Active, Inactive', size: 'md', fullWidth: false },
        { id: nuevoId(), tipo: 'tabla', columnas: ['patient', 'status', 'next', 'provider', 'balance'], filas: 8, buscador: true, seleccion: true, acciones: true, compacta: false, porPagina: 5 },
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
        { id: nuevoId(), tipo: 'encabezado', titulo: 'Notifications', bajada: 'What patients receive before a visit.', accion: '', icono: 'none' },
        { id: nuevoId(), tipo: 'opciones', control: 'switch', items: [{ label: 'Email reminders', on: true }, { label: 'SMS confirmations', on: true }, { label: 'Online booking', on: false }] },
        { id: nuevoId(), tipo: 'divisor' },
        { id: nuevoId(), tipo: 'botones', alinear: 'fin', botones: [{ label: 'Save', variant: 'primary', size: 'md', icono: 'none' }] },
      ],
    }),
  },
  {
    nombre: 'Today', que: 'Los turnos del día en un panel',
    crear: () => ({
      nombre: 'Today appointments', contenedor: 'panel', tituloPanel: 'Today Appointments', ancho: 'angosto',
      bloques: [
        { id: nuevoId(), tipo: 'pills', items: [{ label: '3 checked in', tone: 'success' }, { label: '1 no show', tone: 'warning' }] },
        { id: nuevoId(), tipo: 'turnos', cantidad: 4 },
        { id: nuevoId(), tipo: 'botones', alinear: 'inicio', botones: [{ label: 'View schedule', variant: 'link', size: 'md', icono: 'none' }] },
      ],
    }),
  },
  {
    nombre: 'Blank', que: 'Empezar de cero',
    crear: () => ({ nombre: 'My component', contenedor: 'card', tituloPanel: '', ancho: 'medio', bloques: [] }),
  },
]
`})))()}export{n,i as r,r as t};