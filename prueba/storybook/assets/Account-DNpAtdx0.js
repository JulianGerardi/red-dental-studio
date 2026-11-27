import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { PADDING_PAGINA } from '@/lib/estilos'
import { useState } from 'react'
import { PageTitle } from '@/components/ui/page-title'
import { useParams } from 'react-router-dom'
import { CreditCard, Crown, Building2, Lock, CalendarDays, CircleCheck } from 'lucide-react'
import { Card } from '@/components/settings/primitives'
import { CountryCodeField, SelectField, TextField, DateField, FormFooter } from '@/components/patients/form'
import { EditableAvatar } from '@/components/ui/editable-avatar'
import { usePhoto } from '@/lib/usePhoto'
import { Pill, type PillTone } from '@/components/ui/pill'
import { EmptyState } from '@/components/ui/empty-state'
import { DataTable, TextCell, type DataTableColumn } from '@/components/ui/data-table'
import { aviso } from '@/components/ui/toaster'
import { CUENTAS, ESTADO_TONO as ESTADO_TONO_CUENTA } from '@/pages/settings/Accounts'
import { Tabs } from '@/components/ui/tabs'
import { Avatar } from '@/components/ui/avatar'
import { StatCard } from '@/components/ui/stat-card'

/* Settings → Account. Calcado de red.dev.confidentally.com/settings/account
   -la referencia de flujo real, no el Figma-, tab por tab, tras poder
   entrar por fin (la sesión anterior estaba bloqueada por el lock de una
   sola pestaña).

   Corrección importante sobre la versión anterior: esta pantalla es
   siempre sobre la CUENTA -la clínica-, nunca sobre "mi perfil personal".
   El título es fijo en las tres pestañas, no uno por tab (el sitio real dice "Edit account"; acá
   "Account", como el breadcrumb); Information trae Name/Subdomain/Fee Schedule Name/Logo +
   Contact + Address de LA CLÍNICA (nada de First Name/Last Name ahí). La
   persona -nombre, apellido, fecha de nacimiento- vive en Owner, que es el
   dueño de la cuenta, no el usuario logueado.

   Dos entradas, un solo componente, como antes:
   - /settings/account -"Profile" en el menú de cuenta-: la cuenta propia.
     Nombre "Red Dental Studio" real -es el nombre de esta misma app-;
     Owner vacío con placeholders porque así está en el sitio real ahora
     mismo, no porque falte cargarlo.
   - /settings/accounts/:accountId -el nombre de una fila en Accounts.tsx-:
     esa cuenta puntual. Sólo \`nombre\` y los campos de Subscription/Owner
     existen en \`CUENTAS\`; el resto son placeholders vacíos, mismo criterio
     de "no inventar" que ya sigue Accounts.tsx. */

const TABS = ['Information', 'Subscription', 'Owner'] as const
type Tab = (typeof TABS)[number]

type EstadoSuscripcion = 'Active' | 'Cancelled'
const ESTADO_TONO: Record<EstadoSuscripcion, PillTone> = { Active: 'success', Cancelled: 'danger' }

const HISTORIAL_PROPIO: { plan: string; estado: EstadoSuscripcion; vence: string; licencias: string; creado: string }[] = [
  { plan: 'Prueba Red', estado: 'Active', vence: '12/31/2026', licencias: '3 Used / 167 Total', creado: '08/06/2026' },
  { plan: 'Confidentally Individual User', estado: 'Cancelled', vence: '07/17/2027', licencias: '3 Used / 167 Total', creado: '07/17/2026' },
]

type FilaHistorial = (typeof HISTORIAL_PROPIO)[number]
const COLUMNAS_HISTORIAL: DataTableColumn<FilaHistorial>[] = [
  { key: 'plan', header: 'Plan', cell: (h) => <TextCell strong>{h.plan}</TextCell> },
  { key: 'estado', header: 'Status', cell: (h) => <Pill tone={ESTADO_TONO[h.estado]} size="sm">{h.estado}</Pill> },
  { key: 'vence', header: 'Expired on', cell: (h) => <span className="tabular-nums">{h.vence}</span> },
  { key: 'licencias', header: 'License', cell: (h) => <span className="tabular-nums">{h.licencias}</span> },
  { key: 'creado', header: 'Created at', cell: (h) => <span className="tabular-nums">{h.creado}</span> },
]

const iniciales = (nombre: string) => nombre.trim().split(/\\s+/).slice(0, 2).map((p) => p[0]).join('').toUpperCase()

/* TextField/SelectField sólo quedan controlados -y muestran el \`value\` que
   se les pasa- cuando también reciben \`onChange\`; sin eso lo ignoran del
   todo y arrancan vacíos (mismo comportamiento en Employees.tsx). */
export function SettingsAccount() {
  const { accountId } = useParams()
  const cuenta = accountId ? CUENTAS.find((c) => c.id === accountId) : undefined
  /* Licenses: en uso (empleados activos y suspendidos) sobre el total; una cuenta sin plan no tiene licencias. */
  const total = cuenta ? Number(cuenta.licencias) : 170
  const enUso = cuenta ? cuenta.empleados : 3
  const licencias = Number.isNaN(total)
    ? { usadas: '—', info: 'The account has no plan, so it has no licenses yet.' }
    : { usadas: \`\${enUso} / \${total} used\`, info: \`\${total - enUso} licenses available. Usage includes active and suspended employees.\` }

  const [tab, setTab] = useState<Tab>('Information')
  const [logo, setLogo] = usePhoto(cuenta ? \`account-logo:\${cuenta.id}\` : 'account-logo:me')

  const [general, setGeneral] = useState({
    nombre: cuenta ? cuenta.nombre : 'Red Dental Studio',
    subdominio: cuenta ? '' : 'red',
    feeSchedule: cuenta ? '' : 'Ucr - red',
  })
  const [contacto, setContacto] = useState({
    codigo: '+1', areaCode: cuenta ? '' : '234', numero: cuenta ? '' : '9796365',
    email: cuenta ? '' : 'tomasgilamoedo@gmail.com', sitio: cuenta ? '' : 'https://reddentalstudio.com',
  })
  const [domicilio, setDomicilio] = useState({
    linea1: '', linea2: '', pais: 'United States', region: '', ciudad: '', cp: '', zonaHoraria: '',
  })

  const [duenio, setDuenio] = useState(() => {
    const [first, ...resto] = cuenta && cuenta.duenos !== '—' ? cuenta.duenos.split(' ') : ['']
    return { first, middle: '', last: resto.join(' '), nacimiento: '', email: '' }
  })
  const [copiarContacto, setCopiarContacto] = useState(false)
  const [copiarDomicilio, setCopiarDomicilio] = useState(false)
  const [duenioContacto, setDuenioContacto] = useState({ codigo: '+1', areaCode: '', numero: '' })
  const [duenioDomicilio, setDuenioDomicilio] = useState({ linea1: '', linea2: '', pais: '', region: '', ciudad: '', cp: '' })

  const sinDuenio = !!cuenta && cuenta.duenos === '—'

  return (
    <div className={PADDING_PAGINA}>
      {/* Account, como el menú y el breadcrumb; el sitio real dice "Edit account" (README, 2026-11-27). */}
      <PageTitle>Account</PageTitle>

      <Tabs size="sm" className="mt-4" aria-label="Account sections" tabs={TABS} value={tab} onChange={setTab} />

      <div className="mt-4 flex flex-col gap-4">
        {tab === 'Information' && (
          <>
            <Card title="General information">
              {/* Mismo recorte que el avatar de Owner -cuadrado con esquinas
                  redondeadas, arriba de los campos, no metido adentro del
                  grid-: son dos identidades visuales (cuenta y dueño) y
                  tenían dos tratamientos distintos por error. */}
              <div className="mb-4 flex items-center gap-3">
                <EditableAvatar foto={logo} iniciales="" onChange={setLogo} label="Account logo" size={44} className="bg-dash-count-bg" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Name" value={general.nombre} onChange={(v) => setGeneral((g) => ({ ...g, nombre: v }))} />
                <TextField label="Subdomain" placeholder="Placeholder" value={general.subdominio} onChange={(v) => setGeneral((g) => ({ ...g, subdominio: v }))} />
                <TextField label="Fee schedule name" placeholder="Placeholder" value={general.feeSchedule} onChange={(v) => setGeneral((g) => ({ ...g, feeSchedule: v }))} />
              </div>
            </Card>

            <Card title="Contact information">
              <div className="grid gap-4 sm:grid-cols-2">
                <CountryCodeField required value={contacto.codigo} onChange={(v) => setContacto((c) => ({ ...c, codigo: v }))} />
                <TextField label="Area code (3 digits)" required placeholder="Placeholder" value={contacto.areaCode} onChange={(v) => setContacto((c) => ({ ...c, areaCode: v }))} />
                <TextField label="Number (7 digits)" required placeholder="Placeholder" value={contacto.numero} onChange={(v) => setContacto((c) => ({ ...c, numero: v }))} />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <TextField label="Email" placeholder="Placeholder" value={contacto.email} onChange={(v) => setContacto((c) => ({ ...c, email: v }))} />
                <TextField label="Website" placeholder="Placeholder" value={contacto.sitio} onChange={(v) => setContacto((c) => ({ ...c, sitio: v }))} />
              </div>
            </Card>

            <Card title="Address information">
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField label="Address line 1" required options={['123 Biscayne Blvd', '456 Ocean Drive']} value={domicilio.linea1} onChange={(v) => setDomicilio((d) => ({ ...d, linea1: v }))} />
                <SelectField label="Address line 2" options={['Suite 300', 'Apt 2B']} value={domicilio.linea2} onChange={(v) => setDomicilio((d) => ({ ...d, linea2: v }))} />
                <SelectField label="Country" required options={['United States']} value={domicilio.pais} onChange={(v) => setDomicilio((d) => ({ ...d, pais: v }))} />
                <SelectField label="State" required options={['Florida', 'California']} value={domicilio.region} onChange={(v) => setDomicilio((d) => ({ ...d, region: v }))} />
                <SelectField label="City" required options={['Miami', 'Los Angeles']} value={domicilio.ciudad} onChange={(v) => setDomicilio((d) => ({ ...d, ciudad: v }))} />
                <SelectField label="ZIP code" required options={['33101', '90001']} value={domicilio.cp} onChange={(v) => setDomicilio((d) => ({ ...d, cp: v }))} />
                <SelectField label="Time zone" required options={['(-05:00) New York', '(-08:00) Los Angeles']} value={domicilio.zonaHoraria} onChange={(v) => setDomicilio((d) => ({ ...d, zonaHoraria: v }))} />
              </div>
            </Card>
          </>
        )}

        {tab === 'Subscription' && (
          <>
            <div>
              <h2 className="text-[15px] font-bold text-ink">Subscription summary</h2>
              {/* Las métricas con la card de la app (\`ui/stat-card\`): sin bajada, lo que dice cada una va en el ⓘ. "Expired
                  on" pasa a "Expires on" y Licenses a "3 / 170 used" (settings-accounts.md, 2026-11-24). */}
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard enFila icon={CreditCard} label="Current plan" value={cuenta ? cuenta.plan : 'Prueba Red'} info="Plan currently assigned to the account." />
                <StatCard enFila icon={Lock} label="Licenses" value={licencias.usadas} info={licencias.info} />
                <StatCard enFila icon={CalendarDays} label="Expires on" value={cuenta ? (cuenta.vence || '—') : '12/31/2026'} info="Subscription end date." />
                <StatCard enFila icon={CircleCheck} label="Status" value={cuenta ? (cuenta.estado in ESTADO_TONO_CUENTA ? cuenta.estado : '—') : 'Active'} info="Current subscription status." />
              </div>
            </div>

            <div>
              <h2 className="text-[15px] font-bold text-ink">Subscription history</h2>
              {/* Con \`DataTable\` las cinco columnas se reparten el ancho: Plan ya no se queda con todo el espacio
                  (settings-accounts.md, 2026-11-25). */}
              <div className="mt-3">
                <DataTable
                  columns={COLUMNAS_HISTORIAL}
                  rows={cuenta ? [] : HISTORIAL_PROPIO}
                  rowKey={(h) => \`\${h.plan}-\${h.creado}\`}
                  rowLabel={(h) => h.plan}
                  empty={{ icon: CreditCard, title: 'No billing history', detail: "This account doesn't have a subscription history yet." }}
                />
              </div>
            </div>
          </>
        )}

        {tab === 'Owner' && (
          <>
            {sinDuenio ? (
              <Card>
                <EmptyState icon={Crown} title="No owner on file" detail="This account doesn't have a practice owner assigned yet." className="border-0" />
              </Card>
            ) : (
              <>
                <Card title="Owner information">
                  {cuenta && (
                    <div className="mb-4 flex items-center gap-3">
                      <Avatar initials={iniciales(cuenta.duenos)} size={44} />
                      <span className="inline-flex items-center gap-1 rounded-full border border-purple-fg bg-purple-bg px-2 py-[2px] text-[11px] font-semibold text-purple-fg">
                        <Crown className="size-3" /> Practice owner
                      </span>
                    </div>
                  )}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextField label="First name" required placeholder="Salomon" value={duenio.first} onChange={(v) => setDuenio((d) => ({ ...d, first: v }))} />
                    <TextField label="Middle name" placeholder="Middle name" value={duenio.middle} onChange={(v) => setDuenio((d) => ({ ...d, middle: v }))} />
                    <TextField label="Last name" required placeholder="Brujis" value={duenio.last} onChange={(v) => setDuenio((d) => ({ ...d, last: v }))} />
                    <DateField label="Birthdate" required placeholder="Select" />
                  </div>
                  <TextField className="mt-4" label="Email" required placeholder="sbrujis@confidentally.com" value={duenio.email} onChange={(v) => setDuenio((d) => ({ ...d, email: v }))} />
                </Card>

                <Card title="Contact information">
                  <label className="mb-4 flex items-center gap-2 text-[13px] text-ink-soft">
                    <input
                      type="checkbox"
                      checked={copiarContacto}
                      onChange={(e) => setCopiarContacto(e.target.checked)}
                      className="accent-dash-blue size-4 rounded border-line"
                    />
                    Copy contact information from account
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <CountryCodeField
                      required
                      value={copiarContacto ? contacto.codigo : duenioContacto.codigo}
                      onChange={(v) => !copiarContacto && setDuenioContacto((c) => ({ ...c, codigo: v }))}
                    />
                    <TextField
                      label="Area code (3 digits)" required placeholder="Placeholder"
                      value={copiarContacto ? contacto.areaCode : duenioContacto.areaCode}
                      onChange={(v) => !copiarContacto && setDuenioContacto((c) => ({ ...c, areaCode: v }))}
                    />
                    <TextField
                      label="Number (7 digits)" required placeholder="Placeholder"
                      value={copiarContacto ? contacto.numero : duenioContacto.numero}
                      onChange={(v) => !copiarContacto && setDuenioContacto((c) => ({ ...c, numero: v }))}
                    />
                  </div>
                </Card>

                <Card title="Address information">
                  <label className="mb-4 flex items-center gap-2 text-[13px] text-ink-soft">
                    <input
                      type="checkbox"
                      checked={copiarDomicilio}
                      onChange={(e) => setCopiarDomicilio(e.target.checked)}
                      className="accent-dash-blue size-4 rounded border-line"
                    />
                    Copy address information from account
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <SelectField
                      label="Address line 1" required options={['123 Biscayne Blvd', '456 Ocean Drive']}
                      value={copiarDomicilio ? domicilio.linea1 : duenioDomicilio.linea1}
                      onChange={(v) => !copiarDomicilio && setDuenioDomicilio((d) => ({ ...d, linea1: v }))}
                    />
                    <SelectField
                      label="Address line 2" options={['Suite 300', 'Apt 2B']}
                      value={copiarDomicilio ? domicilio.linea2 : duenioDomicilio.linea2}
                      onChange={(v) => !copiarDomicilio && setDuenioDomicilio((d) => ({ ...d, linea2: v }))}
                    />
                    <SelectField
                      label="Country" required options={['United States']}
                      value={copiarDomicilio ? domicilio.pais : duenioDomicilio.pais}
                      onChange={(v) => !copiarDomicilio && setDuenioDomicilio((d) => ({ ...d, pais: v }))}
                    />
                    <SelectField
                      label="State" required options={['Florida', 'California']}
                      value={copiarDomicilio ? domicilio.region : duenioDomicilio.region}
                      onChange={(v) => !copiarDomicilio && setDuenioDomicilio((d) => ({ ...d, region: v }))}
                    />
                    <SelectField
                      label="City" required options={['Miami', 'Los Angeles']}
                      value={copiarDomicilio ? domicilio.ciudad : duenioDomicilio.ciudad}
                      onChange={(v) => !copiarDomicilio && setDuenioDomicilio((d) => ({ ...d, ciudad: v }))}
                    />
                    <SelectField
                      label="ZIP code" required options={['33101', '90001']}
                      value={copiarDomicilio ? domicilio.cp : duenioDomicilio.cp}
                      onChange={(v) => !copiarDomicilio && setDuenioDomicilio((d) => ({ ...d, cp: v }))}
                    />
                  </div>
                </Card>

                {cuenta && (
                  <p className="flex items-center gap-1.5 text-[12px] text-ink-muted">
                    <Building2 className="size-3.5" /> {cuenta.nombre}
                  </p>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* Subscription es de lectura: sin Cancel / Save debajo de la tabla, como Billing en Employee (settings-accounts.md, 2026-11-25). */}
      {tab !== 'Subscription' && (
        <div className="mt-5 flex justify-end gap-3">
          <FormFooter
            onCancel={() => aviso.info('Changes discarded.')}
            onSave={() => aviso.ok('Account information saved.')}
          />
        </div>
      )}
    </div>
  )
}
`})))()}export{n,i as r,r as t};