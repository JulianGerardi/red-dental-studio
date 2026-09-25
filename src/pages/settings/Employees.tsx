import { useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Search, CirclePlus, Trash2, FileText, Pencil, Ban,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { EmptyState } from '@/components/ui/empty-state'
import { SearchButton } from '@/components/ui/search-button'
import { Checkbox } from '@/components/ui/checkbox'
import { EditableAvatar } from '@/components/ui/editable-avatar'
import { aviso } from '@/components/ui/toaster'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { usePhoto } from '@/lib/usePhoto'
import { EMPLEADOS, type Empleado } from '@/data/employees'
import { Card, Toggle } from '@/components/settings/primitives'
import {
  SelectField, TextField, DateField, DateTextField, FormFooter,
} from '@/components/patients/form'
import { RolesLocation } from '@/components/settings/RolesLocation'
import { LinkExistingPerson } from '@/components/settings/LinkExistingPerson'
import { NewHoursModal } from '@/components/settings/NewHoursModal'
import { Pill } from '@/components/ui/pill'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'

/* Settings → Employees. La lista es propia —el Figma de 3864:235190 sólo
   tiene la ficha de un empleado, no la tabla que lleva hasta ahí—, con las
   columnas que pasó Julián: casilla, nombre con avatar, fecha de nacimiento,
   email, "Is Provider" y estado.

   La ficha de cada persona —Employee / Roles & Location / Provider Info /
   Working Hours— vivía antes colgada de Locations: un empleado no es una
   locación, así que se mudó para acá. */

function EstadoPill({ estado }: { estado: Empleado['estado'] }) {
  return <Pill tone={estado === 'Active' ? 'success' : 'neutral'}>{estado}</Pill>
}

function ProviderPill({ si }: { si: boolean }) {
  return <Pill tone={si ? 'info' : 'neutral'}>{si ? 'Yes' : 'No'}</Pill>
}

const COLS = {
  check: 'w-9',
  nombre: 'w-[240px]',
  cumple: 'w-[120px]',
  email: 'w-[220px]',
  provider: 'w-[100px]',
  estado: 'w-[100px]',
  acciones: 'w-9',
}

export function SettingsEmployees() {
  const [q, setQ] = useState('')
  const [filas, setFilas] = useState(EMPLEADOS)
  const [seleccion, setSeleccion] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const visibles = useMemo(
    () => filas.filter((e) => `${e.nombre} ${e.email} ${e.cargo}`.toLowerCase().includes(q.trim().toLowerCase())),
    [filas, q],
  )
  const todasVisibles = visibles.length > 0 && visibles.every((e) => seleccion.includes(e.id))

  const alternarTodas = (v: boolean) =>
    setSeleccion(v ? [...new Set([...seleccion, ...visibles.map((e) => e.id)])] : seleccion.filter((id) => !visibles.some((e) => e.id === id)))
  const alternarUna = (id: string, v: boolean) =>
    setSeleccion((p) => (v ? [...p, id] : p.filter((x) => x !== id)))

  const borrar = (e: Empleado) => {
    const indice = filas.findIndex((x) => x.id === e.id)
    setFilas((p) => p.filter((x) => x.id !== e.id))
    setSeleccion((p) => p.filter((x) => x !== e.id))
    aviso.ok(`${e.nombre} was removed.`, {
      label: 'Undo',
      onClick: () => setFilas((p) => [...p.slice(0, indice), e, ...p.slice(indice)]),
    })
  }

  /* "Remove Provider Role" no borra a la persona, sólo el rol: si hiciera lo
     mismo que Delete, dos ítems del mismo menú harían la misma acción. */
  const quitarRolProvider = (e: Empleado) => {
    setFilas((p) => p.map((x) => (x.id === e.id ? { ...x, esProvider: false } : x)))
    aviso.ok(`${e.nombre} is no longer a provider.`)
  }

  return (
    <div className="px-4 py-6 sm:px-8">
      <SettingsPageHeader
        titulo="Employees"
        bajada="Everyone with access to the practice, across every location."
        accion={(
          <Link
            to="/settings/team/new"
            data-tour="set-team"
            className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 shrink-0 items-center gap-2 rounded-md px-4 text-[13px] font-medium text-white transition-colors"
          >
            <CirclePlus className="size-4" /> New Employee
          </Link>
        )}
      >
        <div className="relative min-w-0 flex-1 sm:max-w-[320px]">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search employees"
            className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
          />
        </div>
        <SearchButton onClick={() => inputRef.current?.focus()} className="h-9" />
        {seleccion.length > 0 && (
          <span className="bg-dash-count-bg text-dash-blue-hover flex h-9 items-center rounded-md px-3 text-[13px] font-semibold">
            {seleccion.length} selected
          </span>
        )}
      </SettingsPageHeader>

      <div className="mt-4 overflow-x-auto rounded-lg border border-line-row bg-white">
        <div className="min-w-[840px]">
          <div className="flex items-center gap-3 bg-surface-alt px-3 py-3 text-[11px] font-semibold text-ink-muted">
            <span className={COLS.check}>
              <Checkbox on={todasVisibles} onChange={alternarTodas} label="Select all employees" />
            </span>
            <span className={COLS.nombre}>Full Name</span>
            <span className={COLS.cumple}>Birthdate</span>
            <span className={cn(COLS.email, 'min-w-0 flex-1')}>Email</span>
            <span className={COLS.provider}>Is Provider</span>
            <span className={COLS.estado}>Status</span>
            <span className={COLS.acciones} />
          </div>

          {visibles.length === 0 ? (
            <EmptyState
              title={filas.length === 0 ? 'No employees yet' : 'No employees found'}
              detail={
                filas.length === 0
                  ? 'Add the people who work at your practice.'
                  : 'Try a different name or email.'
              }
              className="border-0"
            />
          ) : (
            visibles.map((e) => {
              const marcada = seleccion.includes(e.id)
              return (
                <div
                  key={e.id}
                  className={cn(
                    'flex items-center gap-3 border-t border-line-row px-3 py-3 text-[13px] text-ink-soft',
                    marcada && 'bg-dash-count-bg',
                  )}
                >
                  <span className={COLS.check}>
                    <Checkbox on={marcada} onChange={(v) => alternarUna(e.id, v)} label={`Select ${e.nombre}`} />
                  </span>
                  <span className={cn('flex items-center gap-2.5', COLS.nombre)}>
                    <span className="bg-dash-count-bg text-dash-blue-hover flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold">
                      {e.iniciales}
                    </span>
                    {/* El nombre es el acceso a la ficha, como en la tabla de pacientes. */}
                    <Link to={`/settings/team/${e.id}`} className="text-dash-blue truncate font-semibold hover:underline">
                      {e.nombre}
                    </Link>
                  </span>
                  <span className={cn('truncate', COLS.cumple)}>{e.cumpleanos}</span>
                  <span className={cn('min-w-0 flex-1 truncate', COLS.email)}>{e.email}</span>
                  <span className={COLS.provider}>
                    <ProviderPill si={e.esProvider} />
                  </span>
                  <span className={COLS.estado}>
                    <EstadoPill estado={e.estado} />
                  </span>
                  <span className={COLS.acciones}>
                    <RowActionsMenu label={e.nombre}>
                      <DropdownMenuItem asChild>
                        <Link to={`/settings/team/${e.id}`}>
                          <Pencil className="size-4 shrink-0" /> Edit Employee
                        </Link>
                      </DropdownMenuItem>
                      {/* "Delete Employee" borra la fila de verdad. Las
                          otras tres son del mismo peso en el frame —mismo
                          ícono de "prohibido"— pero necesitarían estados de
                          cuenta que el sistema todavía no tiene. */}
                      <DropdownMenuItem variant="destructive" onSelect={() => borrar(e)}>
                        <Ban className="size-4 shrink-0" /> Delete Employee
                      </DropdownMenuItem>
                      {(['Suspend Employee', 'Terminate Employee', 'Disable'] as const).map((accion) => (
                        <DropdownMenuItem
                          key={accion}
                          variant="destructive"
                          onSelect={() => aviso.info(`${accion} is not available in this release.`)}
                        >
                          <Ban className="size-4 shrink-0" /> {accion}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuItem variant="destructive" onSelect={() => quitarRolProvider(e)}>
                        <Trash2 className="size-4 shrink-0" /> Remove Provider Role
                      </DropdownMenuItem>
                    </RowActionsMenu>
                  </span>
                </div>
              )
            })
          )}

          {visibles.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-row px-3 py-3">
              <span className="text-xs font-semibold text-ink-muted">
                Showing {visibles.length} of {filas.length} employees
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Ficha de un empleado ─────────────────────────────────────────── */

/* "Is Provider" no es solo un dato mas: decide que tabs tiene sentido ver.
   Provider Info y Working Hours son de un provider tratante -especialidad,
   licencias, agenda-, no de alguien de mostrador. Antes las cuatro tabs
   estaban siempre, tuviera o no sentido. */
const TABS_BASE = ['Employee', 'Roles & Location'] as const
const TABS_PROVIDER = ['Provider Info', 'Working Hours'] as const
const TABS = [...TABS_BASE, ...TABS_PROVIDER] as const
type Tab = (typeof TABS)[number]
const esTabProvider = (t: Tab): boolean => (TABS_PROVIDER as readonly string[]).includes(t)

const DIAS = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT']
type Bloque = { dia: number; sala: string; horas: string; empresa: string; tono: 'rosa' | 'azul' }
const BLOQUES: Bloque[] = [
  { dia: 1, sala: 'Room 2', horas: '06:00 - 18:00', empresa: 'Dental LLC', tono: 'azul' },
  { dia: 1, sala: 'Room 1', horas: '06:00 - 18:00', empresa: 'Dental LLC', tono: 'rosa' },
  { dia: 2, sala: 'Room 1', horas: '06:00 - 18:00', empresa: 'Dental LLC', tono: 'rosa' },
  { dia: 3, sala: 'Room 1', horas: '06:00 - 18:00', empresa: 'Dental LLC', tono: 'rosa' },
  { dia: 4, sala: 'Room 1', horas: '06:00 - 18:00', empresa: 'Dental LLC', tono: 'rosa' },
  { dia: 5, sala: 'Room 1', horas: '06:00 - 18:00', empresa: 'Dental LLC', tono: 'rosa' },
  { dia: 5, sala: 'Room 2', horas: '06:00 - 18:00', empresa: 'Dental LLC', tono: 'azul' },
]
const TONO = {
  rosa: { bg: '#fdecef', bar: '#e5375a', fg: '#e5375a' },
  azul: { bg: '#eaf6fe', bar: '#2196f3', fg: '#1d7fd1' },
}

export function SettingsEmployeeDetail() {
  const { employeeId } = useParams()
  const empleado = EMPLEADOS.find((e) => e.id === employeeId) ?? EMPLEADOS[0]
  const [tab, setTab] = useState<Tab>('Employee')
  const [esProvider, setEsProvider] = useState(empleado.esProvider)
  const [toggles, setToggles] = useState({ primario: true, firma: true, locum: true })
  const [credenciales, setCredenciales] = useState([0, 1, 2])
  const [vincular, setVincular] = useState(false)
  const [vinculado, setVinculado] = useState<Empleado | null>(null)
  const [foto, setFoto] = usePhoto(`employee-photo:${empleado.id}`)
  const [nuevaHora, setNuevaHora] = useState(false)

  const tabsVisibles: readonly Tab[] = esProvider ? TABS : TABS_BASE
  const alternarProvider = (v: boolean) => {
    setEsProvider(v)
    if (v) aviso.ok('Provider Info and Working Hours are now available for this employee.')
    else if (esTabProvider(tab)) setTab('Employee')
  }

  return (
    <div className="px-4 py-6 sm:px-8">
      <h1 className="text-2xl font-bold text-ink">
        {tab === 'Employee' ? 'Employee Information' : tab}
      </h1>
      <p className="mt-1 text-sm text-ink-muted">Set your employee information. Update roles and hours.</p>

      <div className="mt-4 flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-lg bg-surface-slate p-1">
        {tabsVisibles.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              'h-8 shrink-0 rounded-md px-3 text-xs font-medium whitespace-nowrap transition-colors',
              /* Nacen con el mismo pop que el resto de los popovers del
                 sistema -misma curva que `fab-panel-in`-, para que quede
                 claro que "Is Provider" acaba de destrabar algo, no que la
                 pantalla se reordenó sola. */
              esTabProvider(t) && 'motion-safe:animate-[tab-in_180ms_cubic-bezier(0.16,1,0.3,1)]',
              tab === t ? 'bg-dash-blue text-white' : 'text-ink-slate hover:text-ink-soft',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {tab === 'Employee' && (
          <>
            <Card>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <EditableAvatar
                    foto={foto}
                    iniciales={empleado.iniciales}
                    onChange={setFoto}
                    label={empleado.nombre}
                    avatarClassName="bg-dash-count-bg text-dash-blue-hover size-14 rounded-lg text-base"
                  />
                  <span>
                    <span className="block text-xl font-bold text-ink">{empleado.nombre}</span>
                    <span className="mt-1 inline-block rounded-full border border-dash-ok-fg bg-dash-ok-bg px-2 py-[2px] text-[11px] font-semibold text-dash-ok-fg">
                      {empleado.estado}
                    </span>
                  </span>
                </div>
                <span className="flex items-center gap-2">
                  <Toggle on={esProvider} onChange={alternarProvider} />
                  <span className="text-[13px] text-ink">Is Provider</span>
                </span>
              </div>

              <h3 className="mt-5 text-sm font-bold text-ink">General Information</h3>
              <div className="mt-3 flex flex-col gap-3">
                <LinkExistingPerson
                  vincular={vincular}
                  onVincular={setVincular}
                  excluirId={empleado.id}
                  vinculado={vinculado}
                  onSeleccionar={setVinculado}
                />
              </div>

              {/* Con el checkbox tildado esta info sale del provider elegido
                  -ya se ve en la card de arriba-, así que estos cuatro
                  campos manuales sobran y se ocultan en vez de quedar
                  duplicados. */}
              {!vincular && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <SelectField label="First Name" required options={['Michael', 'Sarah', 'Elena']} value={empleado.nombre.split(' ')[0]} />
                  {/* "Lasr Name" es del Figma. */}
                  <SelectField label="Lasr Name" required options={['John', 'Stone', 'Martinez']} value={empleado.nombre.split(' ').slice(1).join(' ')} />
                  <TextField label="Email" required placeholder="Placeholder" value={empleado.email} />
                  <DateField label="Birthdate" required placeholder={empleado.cumpleanos} />
                </div>
              )}
            </Card>

            <Card title="Contact Information">
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField label="Area Code" required options={['+1', '+34', '+54']} />
                <TextField label="Number" required placeholder="Placeholder" />
              </div>
              <TextField className="mt-4" label="Extension" placeholder="Placeholder" />
            </Card>

            {/* "Adress Information" es del Figma, igual que en Relationships. */}
            <Card title="Adress Information">
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField label="Address line 1" required options={['123 Maple Street', '456 Oak Avenue']} />
                <SelectField label="Address line 2" required options={['Apt 2B', 'Suite 300']} />
                <SelectField label="Country" required />
                <SelectField label="Region" required options={['California', 'Florida']} />
                <SelectField label="City" required options={['Los Angeles', 'Miami']} />
                <SelectField label="Postal Code" required options={['90001', '33101']} />
              </div>
            </Card>
          </>
        )}

        {tab === 'Roles & Location' && <RolesLocation />}

        {tab === 'Provider Info' && (
          <>
            {/* "Provider Identify" y "Spciality" son del Figma. */}
            <Card title="Provider Identify">
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField label="Short Name" required options={['MJ', 'Dr. John']} value={empleado.iniciales} />
                <SelectField label="Time" required options={['Full time', 'Part time']} />
                <SelectField label="Provider Type" required options={['Dentist', 'Hygienist', 'Assistant']} value={empleado.cargo} />
                <SelectField label="Spciality" required options={['General', 'Orthodontics', 'Endodontics']} />
              </div>
            </Card>

            <Card title="Contact Information">
              <div className="grid gap-6 sm:grid-cols-3">
                <Toggle label="Is a Primary Provider*" on={toggles.primario} onChange={(v) => setToggles((p) => ({ ...p, primario: v }))} />
                <Toggle label="Signature on file" on={toggles.firma} onChange={(v) => setToggles((p) => ({ ...p, firma: v }))} />
                <Toggle label="Locum Tenens Treating Provider" on={toggles.locum} onChange={(v) => setToggles((p) => ({ ...p, locum: v }))} />
              </div>
            </Card>

            <Card title="Credentials">
              {credenciales.length === 0 ? (
                <EmptyState
                  icon={FileText}
                  title="No credentials loaded"
                  detail="Add the licenses and identifiers this provider works under."
                  accion={{ label: 'Add credential', onClick: () => setCredenciales([0]) }}
                  className="border-0"
                />
              ) : (
                <div className="flex flex-col gap-4">
                  {credenciales.map((c) => (
                    <div key={c} className="flex items-end gap-3">
                      <SelectField className="flex-1" label="Credential Number" required options={['CR-1029', 'CR-4471']} />
                      <SelectField className="flex-1" label="Credential Type" required options={['License', 'DEA', 'NPI']} />
                      <DateTextField className="flex-1" label="Expiration Date" />
                      <button
                        type="button"
                        aria-label="Remove credential"
                        onClick={() => setCredenciales((p) => p.filter((x) => x !== c))}
                        className="mb-1 rounded p-2 text-ink hover:bg-dash-bad-bg hover:text-field-error"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setCredenciales((p) => [...p, Math.max(0, ...p) + 1])}
                    className="text-dash-blue flex items-center gap-1.5 self-start text-[13px] font-semibold hover:underline"
                  >
                    <CirclePlus className="size-4" /> Add credential
                  </button>
                </div>
              )}
            </Card>

            <Card title="Documents">
              {/* "PND" en vez de PNG es del Figma. */}
              <button
                type="button"
                onClick={() => aviso.info('File upload is not available in this release.')}
                className="flex w-full flex-col items-center gap-2 rounded-lg border-2 border-dashed border-[#93c5fd] bg-[#fafcff] px-6 py-10 sm:w-[420px]"
              >
                <FileText className="text-dash-blue size-8" strokeWidth={1.5} />
                <span className="text-sm font-bold text-ink">Drag and drop your files</span>
                <span className="text-[11px] text-ink-faint">JPEG, PND, PDF, and MP4 formats, up to 50MB</span>
                <span className="bg-dash-blue mt-2 rounded-md px-4 py-2 text-[13px] font-medium text-white">
                  Select File
                </span>
              </button>
            </Card>
          </>
        )}

        {tab === 'Working Hours' && (
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-bold text-ink">Coordinated Universal Time (UTC)</h2>
              <button
                type="button"
                onClick={() => setNuevaHora(true)}
                className="text-dash-blue flex items-center gap-1.5 text-[13px] font-semibold hover:underline"
              >
                <CirclePlus className="size-4" /> Add new hour
              </button>
            </div>

            {/* Misma grilla que el calendario de Scheduling: cabecera con el
                día, columnas separadas y bloques con barra de acento. */}
            <div className="mt-4 overflow-x-auto rounded-lg border border-line">
              <div className="min-w-[760px]">
                <div className="flex border-b border-line-hair">
                  {DIAS.map((d) => (
                    <div key={d} className="flex-1 border-l border-line-hair px-3 py-3 first:border-l-0">
                      <span className="text-[11px] font-semibold tracking-wide text-ink-muted">{d}</span>
                    </div>
                  ))}
                </div>
                <div className="flex min-h-[300px]">
                  {DIAS.map((_, i) => (
                    <div key={i} className="flex flex-1 flex-col gap-2 border-l border-line-hair p-2 first:border-l-0">
                      {BLOQUES.filter((b) => b.dia === i).map((b, j) => {
                        const t = TONO[b.tono]
                        return (
                          <button
                            key={j}
                            type="button"
                            onClick={() => aviso.info(`${b.sala}, ${b.horas}`)}
                            className="rounded-r-[3px] border-l-[3px] px-2 py-2 text-left transition-shadow hover:shadow-md"
                            style={{ backgroundColor: t.bg, borderLeftColor: t.bar }}
                          >
                            <span className="block text-[10px] font-medium" style={{ color: t.fg }}>
                              {b.horas}
                            </span>
                            <span className="block text-[11px] text-[#18181b]">{b.sala}</span>
                            <span className="block text-[10px] text-ink-muted">{b.empresa}</span>
                          </button>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      <div className="mt-5 flex justify-end gap-3">
        <FormFooter onCancel={() => aviso.info('Changes discarded.')} onSave={() => aviso.ok('Employee information saved.')} />
      </div>

      {nuevaHora && <NewHoursModal onClose={() => setNuevaHora(false)} />}
    </div>
  )
}
