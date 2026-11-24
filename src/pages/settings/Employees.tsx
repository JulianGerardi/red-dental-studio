import { SettingsSearch } from '@/components/settings/SettingsSearch'
import { PADDING_PAGINA } from '@/lib/estilos'
import { useCallback, useMemo, useState } from 'react'
import { PageTitle } from '@/components/ui/page-title'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Trash2, FileText, Pencil, Ban, UserMinus, Plus, TriangleAlert } from 'lucide-react'
import { EmptyState } from '@/components/ui/empty-state'
import { EditableAvatar } from '@/components/ui/editable-avatar'
import { aviso } from '@/components/ui/toaster'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { usePhoto } from '@/lib/usePhoto'
import { EMPLEADOS, type Empleado } from '@/data/employees'
import { Card, Toggle } from '@/components/settings/primitives'
import {
  CountryCodeField, SelectField, TextField, DateField, DateTextField, FormFooter,
} from '@/components/patients/form'
import { RolesLocation } from '@/components/settings/RolesLocation'
import { NewHoursModal } from '@/components/settings/NewHoursModal'
import { Pill } from '@/components/ui/pill'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Button, buttonClasses } from '@/components/ui/button'
import { NewEmployeeDrawer } from '@/components/settings/NewEmployeeDrawer'
import { DataTable, PersonCell, TextCell } from '@/components/ui/data-table'
import { Tabs } from '@/components/ui/tabs'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { ProviderBillingProfile } from '@/components/settings/ProviderBillingProfile'
import { useBillingProfiles } from '@/data/billingProfilesStore'
import { claveProvider } from '@/data/billingProfiles'
import { BloqueoDefaults } from '@/components/settings/LocationInsuranceDefaults'
import type { Referencia } from '@/data/insuranceDefaults'

/* Settings → Employees. La lista es propia —el Figma de 3864:235190 sólo
   tiene la ficha de un empleado, no la tabla que lleva hasta ahí—, con las
   columnas que pasó Julián: casilla, nombre con avatar, fecha de nacimiento,
   email, "Is provider" y estado.

   La ficha de cada persona —Employee / Roles & Location / Provider Info /
   Working Hours— vivía antes colgada de Locations: un empleado no es una
   locación, así que se mudó para acá. */

export function EstadoPill({ estado }: { estado: Empleado['estado'] }) {
  return <Pill tone={estado === 'Active' ? 'success' : 'neutral'}>{estado}</Pill>
}

export function ProviderPill({ si, vencidas }: { si: boolean; /** Credenciales requeridas vencidas (CON-4085). */ vencidas?: boolean }) {
  const pill = <Pill tone={si ? 'info' : 'neutral'}>{si ? 'Yes' : 'No'}</Pill>
  if (!si || !vencidas) return pill
  /* Debajo del Yes, el aviso de CON-4085: no se lo puede asignar a turnos hasta renovarlas (employees.md, 2026-11-20). */
  return (
    <span className="flex flex-col items-start gap-1">
      {pill}
      <span className="flex items-center gap-1 text-[11px] font-medium text-warn-fg">
        <TriangleAlert className="size-3.5 shrink-0" aria-hidden /> Credentials expired
      </span>
    </span>
  )
}

/* `nuevo`: la ruta /settings/team/new abre la lista con el drawer de New Employee ya abierto. */
export function SettingsEmployees({ nuevo = false }: { nuevo?: boolean }) {
  const navigate = useNavigate()
  const [creando, setCreando] = useState(nuevo)
  const cerrar = () => { setCreando(false); if (nuevo) navigate('/settings/team', { replace: true }) }
  const [q, setQ] = useState('')
  const [filas, setFilas] = useState(EMPLEADOS)

  const visibles = useMemo(
    () => filas.filter((e) => `${e.nombre} ${e.email} ${e.cargo}`.toLowerCase().includes(q.trim().toLowerCase())),
    [filas, q],
  )

  const borrar = (e: Empleado) => {
    const indice = filas.findIndex((x) => x.id === e.id)
    setFilas((p) => p.filter((x) => x.id !== e.id))
    aviso.ok(`${e.nombre} was removed.`, {
      label: 'Undo',
      onClick: () => setFilas((p) => [...p.slice(0, indice), e, ...p.slice(indice)]),
    })
  }

  /* Deshabilita el perfil clínico, no borra a la persona ni sus roles (CON-3542). */
  const quitarRolProvider = (e: Empleado) => {
    setFilas((p) => p.map((x) => (x.id === e.id ? { ...x, esProvider: false } : x)))
    aviso.ok(`${e.nombre} is no longer a clinical practitioner.`)
  }

  return (
    <div className={PADDING_PAGINA}>
      <SettingsPageHeader
        titulo="Employees"
        accion={(
          <Button size="md" data-tour="set-team" onClick={() => setCreando(true)}>
            <Plus /> New employee
          </Button>
        )}
      >
        <SettingsSearch value={q} onChange={setQ} placeholder="Search employees" />
      </SettingsPageHeader>

      <div className="mt-4">
        <DataTable
          columns={[
            /* El nombre lleva a la ficha, como en Patients; el ⋮ → Edit también (tablas estandarizadas v2, 2026-11-24). */
            { key: 'nombre', header: 'Name', width: 240, cell: (e) => <PersonCell name={e.nombre} initials={e.iniciales} to={`/settings/team/${e.id}`} /> },
            { key: 'cumple', header: 'Date of birth', width: 120, cell: (e) => <TextCell>{e.cumpleanos}</TextCell> },
            { key: 'email', header: 'Email', cell: (e) => <TextCell>{e.email}</TextCell> },
            /* "Clinical practitioner", como CON-4085 y CON-3542 (employees.md, 2026-11-20). */
            { key: 'provider', header: 'Clinical practitioner', width: 160, cell: (e) => <ProviderPill si={e.esProvider} vencidas={e.credencialesVencidas} /> },
            { key: 'estado', header: 'Status', width: 100, cell: (e) => <EstadoPill estado={e.estado} /> },
          ]}
          rows={visibles}
          rowKey={(e) => e.id}
          rowLabel={(e) => e.nombre}
          empty={filas.length === 0
            ? { title: 'No employees yet', detail: 'Add the people who work at your practice.' }
            : { title: 'No employees found', detail: 'Try a different name or email.' }}
          rowActions={(e) => (
            <>
              <DropdownMenuItem asChild>
                <Link to={`/settings/team/${e.id}`}>
                  <Pencil className="size-4 shrink-0" /> Edit
                </Link>
              </DropdownMenuItem>
              {/* "Delete Employee" borra la fila de verdad. Las otras tres son
                  del mismo peso en el frame —mismo ícono de "prohibido"— pero
                  necesitarían estados de cuenta que el sistema todavía no tiene. */}
              <DropdownMenuItem variant="destructive" onSelect={() => borrar(e)}>
                <Trash2 className="size-4 shrink-0" /> Delete
              </DropdownMenuItem>
              {(['Suspend', 'Terminate', 'Disable'] as const).map((accion) => (
                <DropdownMenuItem
                  key={accion}
                  variant="destructive"
                  onSelect={() => aviso.info(`${accion} is not available in this release.`)}
                >
                  <Ban className="size-4 shrink-0" /> {accion}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem variant="destructive" onSelect={() => quitarRolProvider(e)}>
                <UserMinus className="size-4 shrink-0" /> Disable clinical practitioner
              </DropdownMenuItem>
            </>
          )}
        />
      </div>

      {creando && (
        <NewEmployeeDrawer
          onClose={cerrar}
          onGuardar={(e) => {
            setFilas((p) => (p.some((x) => x.id === e.id) ? p : [e, ...p]))
            aviso.ok(`${e.nombre} was added to your employees.`)
          }}
        />
      )}
    </div>
  )
}

/* ── Ficha de un empleado ─────────────────────────────────────────── */

/* "Is provider" no es solo un dato mas: decide que tabs tiene sentido ver.
   Provider Info y Working Hours son de un provider tratante -especialidad,
   licencias, agenda-, no de alguien de mostrador. Antes las cuatro tabs
   estaban siempre, tuviera o no sentido. */
const TABS_BASE = ['Employee', 'Roles & location'] as const
const TABS_PROVIDER = ['Provider info', 'Working hours'] as const
/* Aparece cuando el provider tiene Billing Profile (lo prepara guardar Primary Provider en Yes, CON-4004) y queda aunque
   se deshabilite, en modo lectura (CON-4007). Ver figma/modulos/billing-profile.md. */
const TAB_BILLING = 'Insurance / billing profile' as const
const TABS = [...TABS_BASE, ...TABS_PROVIDER, TAB_BILLING] as const
type Tab = (typeof TABS)[number]
const esTabProvider = (t: Tab): boolean => (TABS_PROVIDER as readonly string[]).includes(t) || t === TAB_BILLING

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
  const { perfiles, primarios, guardarPrimario, referencias } = useBillingProfiles()
  const [bloqueo, setBloqueo] = useState<Referencia[]>([])
  const primarioGuardado = primarios[empleado.id] ?? false
  const tienePerfil = !!perfiles[claveProvider(empleado.id)]
  const [toggles, setToggles] = useState({ primario: primarioGuardado, firma: true, locum: true })
  const primarioSucio = toggles.primario !== primarioGuardado
  const [apagarPrimario, setApagarPrimario] = useState(false)
  /* La pestaña de billing guarda cada card por separado: salir con algo sin guardar lo pregunta. */
  const [billingSucio, setBillingSucio] = useState(false)
  const [pendiente, setPendiente] = useState<Tab | null>(null)
  const marcarBilling = useCallback((v: boolean) => setBillingSucio(v), [])
  const [credenciales, setCredenciales] = useState([0, 1, 2])
  const [foto, setFoto] = usePhoto(`employee-photo:${empleado.id}`)
  const [nuevaHora, setNuevaHora] = useState(false)

  const tabsVisibles: readonly Tab[] = esProvider ? (tienePerfil ? TABS : [...TABS_BASE, ...TABS_PROVIDER]) : TABS_BASE
  const cambiarTab = (t: Tab) => (billingSucio && tab === TAB_BILLING && t !== tab ? setPendiente(t) : setTab(t))

  /* Primary Provider es un dato más de la ficha: se aplica con Save, junto con su Billing Profile (CON-4004, CON-4007).
     Guardarlo apagado pregunta antes. Ver billing-profile.md, 2026-11-04. */
  const guardarFicha = () => {
    if (!primarioSucio) { aviso.ok('Employee information saved.'); return }
    const r = guardarPrimario(empleado.id, empleado.nombre, toggles.primario)
    if (r === 'bloqueado') { setBloqueo(referencias(claveProvider(empleado.id), empleado.id)); return }
    aviso.ok(r === 'creado' ? 'Primary provider enabled. Insurance / billing profile is now available.'
      : r === 'reactivado' ? 'Primary provider enabled. The billing profile is active again.'
      : 'Primary provider deactivated. The billing profile is now read-only.')
  }
  /* Si el provider o su perfil están elegidos en Insurance Defaults, no se pregunta: se frena y se dice dónde (CON-4031). */
  const guardar = () => {
    if (!(primarioSucio && !toggles.primario)) { guardarFicha(); return }
    const r = referencias(claveProvider(empleado.id), empleado.id)
    if (r.length) setBloqueo(r)
    else setApagarPrimario(true)
  }
  const cancelar = () => {
    setToggles((p) => ({ ...p, primario: primarioGuardado }))
    aviso.info('Changes discarded.')
  }
  const alternarProvider = (v: boolean) => {
    setEsProvider(v)
    if (v) aviso.ok('Provider info and Working hours are now available for this employee.')
    else if (esTabProvider(tab)) setTab('Employee')
  }

  return (
    <div className={PADDING_PAGINA}>
      <PageTitle>{tab === 'Employee' ? 'Employee information' : tab}</PageTitle>

      <Tabs size="sm"
        className="mt-4"
        aria-label="Employee sections"
        /* Las pestañas de provider nacen con el mismo pop que el resto de los
           popovers del sistema -misma curva que `fab-panel-in`-, para que quede
           claro que "Is provider" acaba de destrabar algo, no que la pantalla
           se reordenó sola. */
        tabs={tabsVisibles.map((t) => ({ value: t, className: esTabProvider(t) ? 'motion-safe:animate-[tab-in_180ms_cubic-bezier(0.16,1,0.3,1)]' : undefined }))}
        value={tab}
        onChange={cambiarTab}
      />

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
                    size={56}
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
                  <span className="text-[13px] text-ink">Is clinical practitioner</span>
                </span>
              </div>

              {/* La ficha edita a alguien que ya existe: no vincula a otra persona (employees.md, 2026-11-18). */}
              <h2 className="mt-5 text-sm font-bold text-ink">General information</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <SelectField label="First name" required options={['Michael', 'Sarah', 'Elena']} value={empleado.nombre.split(' ')[0]} />
                {/* "Last name" es del Figma. */}
                <SelectField label="Last name" required options={['John', 'Stone', 'Martinez']} value={empleado.nombre.split(' ').slice(1).join(' ')} />
                <TextField label="Email" required placeholder="Placeholder" value={empleado.email} />
                <DateField label="Birthdate" required placeholder={empleado.cumpleanos} />
              </div>
            </Card>

            <Card title="Contact information">
              <div className="grid gap-4 sm:grid-cols-2">
                <CountryCodeField label="Area code" required />
                <TextField label="Number" required placeholder="Placeholder" />
                <TextField label="Extension" placeholder="Placeholder" />
              </div>
            </Card>

            {/* "Address information" es del Figma, igual que en Relationships. */}
            <Card title="Address information">
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField label="Address line 1" required options={['123 Maple Street', '456 Oak Avenue']} />
                <SelectField label="Address line 2" required options={['Apt 2B', 'Suite 300']} />
                <SelectField label="Country" required />
                <SelectField label="Region" required options={['California', 'Florida']} />
                <SelectField label="City" required options={['Los Angeles', 'Miami']} />
                <SelectField label="Postal code" required options={['90001', '33101']} />
              </div>
            </Card>
          </>
        )}

        {tab === 'Roles & location' && <RolesLocation />}

        {tab === 'Provider info' && (
          <>
            {/* "Provider identify" y "Spciality" son del Figma. */}
            <Card title="Provider identify">
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField label="Short name" required options={['MJ', 'Dr. John']} value={empleado.iniciales} />
                <SelectField label="Time" required options={['Full time', 'Part time']} />
                <SelectField label="Provider type" required options={['Dentist', 'Hygienist', 'Assistant']} value={empleado.cargo} />
                <SelectField label="Spciality" required options={['General', 'Orthodontics', 'Endodontics']} />
              </div>
            </Card>

            <Card title="Contact information">
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="flex flex-col gap-1.5">
                  <Toggle label="Is a primary provider*" on={toggles.primario} onChange={(v) => setToggles((p) => ({ ...p, primario: v }))} />
                  {primarioSucio && (
                    <span className="text-[11px] font-medium text-warn-fg">
                      {toggles.primario ? 'Save to set up its insurance / billing profile.' : 'Save to deactivate it.'}
                    </span>
                  )}
                </div>
                <Toggle label="Signature on file" on={toggles.firma} onChange={(v) => setToggles((p) => ({ ...p, firma: v }))} />
                <Toggle label="Locum tenens treating provider" on={toggles.locum} onChange={(v) => setToggles((p) => ({ ...p, locum: v }))} />
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
                      <SelectField className="flex-1" label="Credential number" required options={['CR-1029', 'CR-4471']} />
                      <SelectField className="flex-1" label="Credential type" required options={['License', 'DEA', 'NPI']} />
                      <DateTextField className="flex-1" label="Expiration date" />
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
                  <Button variant="secondary" className="self-start" onClick={() => setCredenciales((p) => [...p, Math.max(0, ...p) + 1])}>
                    <Plus /> Add credential
                  </Button>
                </div>
              )}
            </Card>

            <Card title="Documents">
              {/* "PND" en vez de PNG es del Figma. */}
              <button
                type="button"
                onClick={() => aviso.info('File upload is not available in this release.')}
                className="flex w-full flex-col items-center gap-2 rounded-lg border-2 border-dashed border-info-line-strong bg-info-subtle px-6 py-10 sm:w-[420px]"
              >
                <FileText className="text-dash-blue size-8" strokeWidth={1.5} />
                <span className="text-sm font-bold text-ink">Drag and drop your files</span>
                <span className="text-[11px] text-ink-faint">JPEG, PND, PDF, and MP4 formats, up to 50MB</span>
                <span className={buttonClasses({ size: 'md', className: 'mt-2' })}>
                  Select file
                </span>
              </button>
            </Card>
          </>
        )}

        {tab === 'Working hours' && (
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-bold text-ink">Coordinated Universal Time (UTC)</h2>
              {/* Botón de la app, no link (employees.md, 2026-11-20). */}
              <Button onClick={() => setNuevaHora(true)}><Plus /> Add new hour</Button>
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
                            <span className="block text-[11px] font-medium" style={{ color: t.fg }}>
                              {b.horas}
                            </span>
                            <span className="block text-[11px] text-ink">{b.sala}</span>
                            <span className="block text-[11px] text-ink-muted">{b.empresa}</span>
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

        {tab === TAB_BILLING && <ProviderBillingProfile empleadoId={empleado.id} onDirtyChange={marcarBilling} />}
      </div>

      {/* Billing guarda cada card con su propio botón: el pie de la ficha no aplica ahí. */}
      {tab !== TAB_BILLING && (
        <div className="mt-5 flex justify-end gap-3">
          <FormFooter onCancel={cancelar} onSave={guardar} />
        </div>
      )}

      {pendiente && (
        <ConfirmDialog
          title="Discard unsaved changes?"
          confirmLabel="Discard changes"
          cancelLabel="Keep editing"
          tone="danger"
          onCancel={() => setPendiente(null)}
          onConfirm={() => { setBillingSucio(false); setTab(pendiente); setPendiente(null) }}
        >
          Your billing profile changes haven't been saved.
        </ConfirmDialog>
      )}

      {apagarPrimario && (
        <ConfirmDialog
          title="Deactivate primary provider?"
          confirmLabel="Deactivate"
          onCancel={() => setApagarPrimario(false)}
          onConfirm={() => { setApagarPrimario(false); guardarFicha() }}
        >
          {empleado.nombre} will no longer be available for selection as a rendering or billing provider.
        </ConfirmDialog>
      )}

      {bloqueo.length > 0 && <BloqueoDefaults tipo="provider" referencias={bloqueo} onClose={() => setBloqueo([])} />}

      {nuevaHora && <NewHoursModal onClose={() => setNuevaHora(false)} />}
    </div>
  )
}
