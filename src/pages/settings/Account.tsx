import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CreditCard, Crown, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/settings/primitives'
import { SelectField, TextField, DateField, FormFooter } from '@/components/patients/form'
import { EditableAvatar } from '@/components/ui/editable-avatar'
import { usePhoto } from '@/lib/usePhoto'
import { Pill, type PillTone } from '@/components/ui/pill'
import { EmptyState } from '@/components/ui/empty-state'
import { aviso } from '@/components/ui/toaster'
import { CUENTAS, ESTADO_TONO as ESTADO_TONO_CUENTA } from '@/pages/settings/Accounts'

/* Settings → Account. Calcado de red.dev.confidentally.com/settings/account
   -la referencia de flujo real, no el Figma-, tab por tab, tras poder
   entrar por fin (la sesión anterior estaba bloqueada por el lock de una
   sola pestaña).

   Corrección importante sobre la versión anterior: esta pantalla es
   siempre sobre la CUENTA -la clínica-, nunca sobre "mi perfil personal".
   El título fijo del sitio real es "Edit Account" en las tres pestañas, no
   uno por tab; Information trae Name/Subdomain/Fee Schedule Name/Logo +
   Contact + Address de LA CLÍNICA (nada de First Name/Last Name ahí). La
   persona -nombre, apellido, fecha de nacimiento- vive en Owner, que es el
   dueño de la cuenta, no el usuario logueado.

   Dos entradas, un solo componente, como antes:
   - /settings/account -"Profile" en el menú de cuenta-: la cuenta propia.
     Nombre "Red Dental Studio" real -es el nombre de esta misma app-;
     Owner vacío con placeholders porque así está en el sitio real ahora
     mismo, no porque falte cargarlo.
   - /settings/accounts/:accountId -el nombre de una fila en Accounts.tsx-:
     esa cuenta puntual. Sólo `nombre` y los campos de Subscription/Owner
     existen en `CUENTAS`; el resto son placeholders vacíos, mismo criterio
     de "no inventar" que ya sigue Accounts.tsx. */

const TABS = ['Information', 'Subscription', 'Owner'] as const
type Tab = (typeof TABS)[number]

type EstadoSuscripcion = 'Active' | 'Cancelled'
const ESTADO_TONO: Record<EstadoSuscripcion, PillTone> = { Active: 'success', Cancelled: 'danger' }

const HISTORIAL_PROPIO: { plan: string; estado: EstadoSuscripcion; vence: string; licencias: string; creado: string }[] = [
  { plan: 'Prueba Red', estado: 'Active', vence: '31/12/2026', licencias: '3 Used / 167 Total', creado: '06/08/2026' },
  { plan: 'Confidentally Individual User', estado: 'Cancelled', vence: '17/07/2027', licencias: '3 Used / 167 Total', creado: '17/07/2026' },
]

const iniciales = (nombre: string) => nombre.trim().split(/\s+/).slice(0, 2).map((p) => p[0]).join('').toUpperCase()

/* TextField/SelectField sólo quedan controlados -y muestran el `value` que
   se les pasa- cuando también reciben `onChange`; sin eso lo ignoran del
   todo y arrancan vacíos (mismo comportamiento en Employees.tsx). */
export function SettingsAccount() {
  const { accountId } = useParams()
  const cuenta = accountId ? CUENTAS.find((c) => c.id === accountId) : undefined

  const [tab, setTab] = useState<Tab>('Information')
  const [logo, setLogo] = usePhoto(cuenta ? `account-logo:${cuenta.id}` : 'account-logo:me')

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
    <div className="px-4 py-6 sm:px-8">
      <h1 className="text-2xl font-bold text-[#09090b]">Edit Account</h1>
      <p className="mt-1 text-sm text-[#71717a]">Manage your dental clinic general settings, upload custom graphics, and specify billing parameters.</p>

      <div className="mt-4 flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-lg bg-[#f1f5f9] p-1">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              'h-8 shrink-0 rounded-md px-3 text-xs font-medium whitespace-nowrap transition-colors',
              tab === t ? 'bg-dash-blue text-white' : 'text-[#64748b] hover:text-[#3f3f46]',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {tab === 'Information' && (
          <>
            <Card title="General Information">
              {/* Mismo recorte que el avatar de Owner -cuadrado con esquinas
                  redondeadas, arriba de los campos, no metido adentro del
                  grid-: son dos identidades visuales (cuenta y dueño) y
                  tenían dos tratamientos distintos por error. */}
              <div className="mb-4 flex items-center gap-3">
                <EditableAvatar foto={logo} iniciales="" onChange={setLogo} label="Account logo" avatarClassName="bg-dash-count-bg size-11 rounded-lg" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Name" value={general.nombre} onChange={(v) => setGeneral((g) => ({ ...g, nombre: v }))} />
                <TextField label="Subdomain" placeholder="Placeholder" value={general.subdominio} onChange={(v) => setGeneral((g) => ({ ...g, subdominio: v }))} />
                <TextField label="Fee Schedule Name" placeholder="Placeholder" value={general.feeSchedule} onChange={(v) => setGeneral((g) => ({ ...g, feeSchedule: v }))} />
              </div>
            </Card>

            <Card title="Contact Information">
              <div className="grid gap-4 sm:grid-cols-3">
                <SelectField label="Country Code" required options={['+1', '+34', '+54']} value={contacto.codigo} onChange={(v) => setContacto((c) => ({ ...c, codigo: v }))} />
                <TextField label="Area Code (3 digits)" required placeholder="Placeholder" value={contacto.areaCode} onChange={(v) => setContacto((c) => ({ ...c, areaCode: v }))} />
                <TextField label="Number (7 digits)" required placeholder="Placeholder" value={contacto.numero} onChange={(v) => setContacto((c) => ({ ...c, numero: v }))} />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <TextField label="Email" placeholder="Placeholder" value={contacto.email} onChange={(v) => setContacto((c) => ({ ...c, email: v }))} />
                <TextField label="Website" placeholder="Placeholder" value={contacto.sitio} onChange={(v) => setContacto((c) => ({ ...c, sitio: v }))} />
              </div>
            </Card>

            <Card title="Address Information">
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField label="Address line 1" required options={['123 Biscayne Blvd', '456 Ocean Drive']} value={domicilio.linea1} onChange={(v) => setDomicilio((d) => ({ ...d, linea1: v }))} />
                <SelectField label="Address line 2" options={['Suite 300', 'Apt 2B']} value={domicilio.linea2} onChange={(v) => setDomicilio((d) => ({ ...d, linea2: v }))} />
                <SelectField label="Country" required options={['United States']} value={domicilio.pais} onChange={(v) => setDomicilio((d) => ({ ...d, pais: v }))} />
                <SelectField label="State" required options={['Florida', 'California']} value={domicilio.region} onChange={(v) => setDomicilio((d) => ({ ...d, region: v }))} />
                <SelectField label="City" required options={['Miami', 'Los Angeles']} value={domicilio.ciudad} onChange={(v) => setDomicilio((d) => ({ ...d, ciudad: v }))} />
                <SelectField label="ZIP Code" required options={['33101', '90001']} value={domicilio.cp} onChange={(v) => setDomicilio((d) => ({ ...d, cp: v }))} />
                <SelectField label="Time Zone" required options={['(-05:00) New York', '(-08:00) Los Angeles']} value={domicilio.zonaHoraria} onChange={(v) => setDomicilio((d) => ({ ...d, zonaHoraria: v }))} />
              </div>
            </Card>
          </>
        )}

        {tab === 'Subscription' && (
          <>
            <div>
              <h2 className="text-base font-bold text-[#09090b]">Subscription Summary</h2>
              <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-[#e4e4e7] bg-white p-4">
                  <span className="flex items-center gap-1.5 text-[13px] text-[#71717a]">
                    <CreditCard className="size-3.5" /> Current Plan
                  </span>
                  <span className="mt-2 block text-[19px] font-bold text-[#09090b]">
                    {cuenta ? (cuenta.plan === '—' ? '—' : cuenta.plan) : 'Prueba Red'}
                  </span>
                  <span className="mt-1 block text-[12px] text-[#a1a1aa]">Plan currently assigned to the account</span>
                </div>
                <div className="rounded-lg border border-[#e4e4e7] bg-white p-4">
                  <span className="text-[13px] text-[#71717a]">Licenses</span>
                  <span className="mt-2 block text-[19px] font-bold text-[#09090b] tabular-nums">
                    {cuenta ? (cuenta.licencias === '—' ? '—' : cuenta.licencias) : '3 Used / 170 Total'}
                  </span>
                  <span className="mt-1 block text-[12px] text-[#a1a1aa]">167 available licenses based on active and suspended employees.</span>
                </div>
                <div className="rounded-lg border border-[#e4e4e7] bg-white p-4">
                  <span className="text-[13px] text-[#71717a]">Expired on</span>
                  <span className="mt-2 block text-[19px] font-bold text-[#09090b] tabular-nums">
                    {cuenta ? (cuenta.vence || '—') : '31/12/2026'}
                  </span>
                  <span className="mt-1 block text-[12px] text-[#a1a1aa]">Subscription end date</span>
                </div>
                <div className="rounded-lg border border-[#e4e4e7] bg-white p-4">
                  <span className="text-[13px] text-[#71717a]">Status</span>
                  <span className="mt-2 block">
                    {cuenta ? (
                      cuenta.estado in ESTADO_TONO_CUENTA ? (
                        <span className="text-[19px] font-bold text-[#09090b]">{cuenta.estado}</span>
                      ) : <span className="text-[19px] font-bold text-[#a1a1aa]">—</span>
                    ) : (
                      <span className="text-[19px] font-bold text-[#09090b]">Active</span>
                    )}
                  </span>
                  <span className="mt-1 block text-[12px] text-[#a1a1aa]">Current subscription status</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-base font-bold text-[#09090b]">Subscription History</h2>
              <div className="mt-3 overflow-x-auto rounded-lg border border-[#e7e7e7] bg-white">
                {cuenta ? (
                  <EmptyState icon={CreditCard} title="No billing history" detail="This account doesn't have a subscription history yet." className="border-0" />
                ) : (
                  <div className="min-w-[620px]">
                    <div className="flex items-center gap-3 bg-[#f9f9f9] px-3 py-2.5 text-[11px] font-semibold text-[#71717a] uppercase">
                      <span className="min-w-0 flex-1">Plan</span>
                      <span className="w-[90px] shrink-0">Status</span>
                      <span className="w-[100px] shrink-0">Expired on</span>
                      <span className="w-[140px] shrink-0">License</span>
                      <span className="w-[100px] shrink-0">Created at</span>
                    </div>
                    {HISTORIAL_PROPIO.map((h, i) => (
                      <div key={i} className="flex items-center gap-3 border-t border-[#e7e7e7] px-3 py-2.5 text-[13px] text-[#3f3f46]">
                        <span className="min-w-0 flex-1 truncate font-medium text-[#09090b]">{h.plan}</span>
                        <span className="w-[90px] shrink-0">
                          <Pill tone={ESTADO_TONO[h.estado]} size="sm">{h.estado}</Pill>
                        </span>
                        <span className="w-[100px] shrink-0 tabular-nums">{h.vence}</span>
                        <span className="w-[140px] shrink-0 tabular-nums">{h.licencias}</span>
                        <span className="w-[100px] shrink-0 tabular-nums">{h.creado}</span>
                      </div>
                    ))}
                  </div>
                )}
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
                <Card title="Owner Information">
                  {cuenta && (
                    <div className="mb-4 flex items-center gap-3">
                      <span className="bg-dash-count-bg text-dash-blue-hover flex size-11 shrink-0 items-center justify-center rounded-lg text-sm font-semibold">
                        {iniciales(cuenta.duenos)}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#6633a6] bg-[#f5f0ff] px-2 py-[2px] text-[11px] font-semibold text-[#6633a6]">
                        <Crown className="size-3" /> Practice Owner
                      </span>
                    </div>
                  )}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextField label="First Name" required placeholder="Salomon" value={duenio.first} onChange={(v) => setDuenio((d) => ({ ...d, first: v }))} />
                    <TextField label="Middle Name" placeholder="Middle name" value={duenio.middle} onChange={(v) => setDuenio((d) => ({ ...d, middle: v }))} />
                    <TextField label="Last Name" required placeholder="Brujis" value={duenio.last} onChange={(v) => setDuenio((d) => ({ ...d, last: v }))} />
                    <DateField label="Birthdate" required placeholder="Select" />
                  </div>
                  <TextField className="mt-4" label="Email" required placeholder="sbrujis@confidentally.com" value={duenio.email} onChange={(v) => setDuenio((d) => ({ ...d, email: v }))} />
                </Card>

                <Card title="Contact Information">
                  <label className="mb-4 flex items-center gap-2 text-[13px] text-[#3f3f46]">
                    <input
                      type="checkbox"
                      checked={copiarContacto}
                      onChange={(e) => setCopiarContacto(e.target.checked)}
                      className="accent-dash-blue size-4 rounded border-[#e4e4e7]"
                    />
                    Copy contact information from account
                  </label>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <SelectField
                      label="Country Code" required options={['+1', '+34', '+54']}
                      value={copiarContacto ? contacto.codigo : duenioContacto.codigo}
                      onChange={(v) => !copiarContacto && setDuenioContacto((c) => ({ ...c, codigo: v }))}
                    />
                    <TextField
                      label="Area Code (3 digits)" required placeholder="Placeholder"
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

                <Card title="Address Information">
                  <label className="mb-4 flex items-center gap-2 text-[13px] text-[#3f3f46]">
                    <input
                      type="checkbox"
                      checked={copiarDomicilio}
                      onChange={(e) => setCopiarDomicilio(e.target.checked)}
                      className="accent-dash-blue size-4 rounded border-[#e4e4e7]"
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
                      label="ZIP Code" required options={['33101', '90001']}
                      value={copiarDomicilio ? domicilio.cp : duenioDomicilio.cp}
                      onChange={(v) => !copiarDomicilio && setDuenioDomicilio((d) => ({ ...d, cp: v }))}
                    />
                  </div>
                </Card>

                {cuenta && (
                  <p className="flex items-center gap-1.5 text-[12px] text-[#71717a]">
                    <Building2 className="size-3.5" /> {cuenta.nombre}
                  </p>
                )}
              </>
            )}
          </>
        )}
      </div>

      <div className="mt-5 flex justify-end gap-3">
        <FormFooter
          onCancel={() => aviso.info('Changes discarded.')}
          onSave={() => aviso.ok('Account information saved.')}
        />
      </div>
    </div>
  )
}
