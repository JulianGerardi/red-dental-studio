import { useState } from 'react'
import { CreditCard, Crown, ReceiptText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/settings/primitives'
import { SelectField, TextField, DateField, FormFooter } from '@/components/patients/form'
import { EditableAvatar } from '@/components/ui/editable-avatar'
import { usePhoto } from '@/lib/usePhoto'
import { Pill, type PillTone } from '@/components/ui/pill'
import { aviso } from '@/components/ui/toaster'

/* Settings → Account. Ver red.dev.confidentally.com/settings/account
   (?tab=subscription, ?tab=owner) -la referencia de flujo, no el Figma-.

   Antes "Profile" en el menú de cuenta (Topbar.tsx) apuntaba a
   /settings/accounts (plural): la tabla de TODAS las cuentas de la
   plataforma, pensada para un admin. Acá es la cuenta propia -mismas tres
   pestañas que el sitio real-, así que el link del perfil ahora trae a esta
   pantalla en vez de a esa tabla.

   Mismo patrón de tabs que Employees.tsx (la ficha de un empleado, la
   pantalla que Julián señaló como "el estilo de roles" -"Roles & Location"
   es una de esas pestañas-): título + bajada, tira de pestañas en
   `bg-[#f1f5f9]`, contenido en Card, un solo Cancel/Save al pie de toda la
   pantalla.

   La pestaña Information reusa el mismo trío General/Contact/Adress
   Information -mismos componentes, mismo texto "Adress" del Figma- que ya
   existe en Employees.tsx y Relationships. Subscription y Owner no tienen
   ese precedente en este código: el sitio real está atrás de un lock de una
   sola pestaña que no pude destrabar en esta sesión, así que estos dos
   tabs son la mejor reconstrucción con el vocabulario que ya usa
   Settings → Accounts (plan, código de suscripción, vencimiento, estado,
   licencias) -a confirmar contra el sitio real apenas se pueda entrar. */

const TABS = ['Information', 'Subscription', 'Owner'] as const
type Tab = (typeof TABS)[number]

const TITULO: Record<Tab, string> = {
  Information: 'Account Information',
  Subscription: 'Subscription',
  Owner: 'Owner',
}

const BAJADA: Record<Tab, string> = {
  Information: 'Manage your personal, contact and address information.',
  Subscription: 'Review your current plan, licenses and billing history.',
  Owner: 'View the practice owner on file for this account.',
}

type EstadoSuscripcion = 'ACTIVE' | 'CANCELLED' | 'EXPIRED'
const ESTADO_TONO: Record<EstadoSuscripcion, PillTone> = {
  ACTIVE: 'success',
  CANCELLED: 'neutral',
  EXPIRED: 'danger',
}

const HISTORIAL: { fecha: string; plan: string; monto: string; estado: EstadoSuscripcion }[] = [
  { fecha: 'Sep 30, 2026', plan: 'Confidentally Premium', monto: '$249.00', estado: 'ACTIVE' },
  { fecha: 'Sep 30, 2025', plan: 'Confidentally Premium', monto: '$249.00', estado: 'EXPIRED' },
  { fecha: 'Sep 30, 2024', plan: 'Confidentally Basic Pack', monto: '$129.00', estado: 'EXPIRED' },
]

/* TextField/SelectField sólo quedan controlados -y muestran el `value` que
   se les pasa- cuando también reciben `onChange`; sin eso lo ignoran del
   todo y arrancan vacíos (mismo comportamiento en Employees.tsx). Acá sí
   importa que se vea la información propia precargada, así que cada campo
   tiene su estado en vez de un `value` suelto. */
export function SettingsAccount() {
  const [tab, setTab] = useState<Tab>('Information')
  const [foto, setFoto] = usePhoto('account-photo:me')

  const [general, setGeneral] = useState({ first: 'Sarah', last: 'Stone', email: 'sarah.stone@reddentalstudio.com' })
  const [contacto, setContacto] = useState({ codigo: '+1', numero: '(555) 234-5678', extension: '' })
  const [domicilio, setDomicilio] = useState({
    linea1: '123 Biscayne Blvd', linea2: '', pais: 'United States', region: 'Florida', ciudad: 'Miami', cp: '33101',
  })
  const [duenio, setDuenio] = useState({ nombre: 'Julian Gerardi', email: 'julian.gerardi@reddentalstudio.com', codigo: '+1', numero: '(555) 987-6543' })

  return (
    <div className="px-4 py-6 sm:px-8">
      <h1 className="text-2xl font-bold text-[#09090b]">{TITULO[tab]}</h1>
      <p className="mt-1 text-sm text-[#71717a]">{BAJADA[tab]}</p>

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
            <Card>
              <div className="flex flex-wrap items-center gap-3">
                <EditableAvatar
                  foto={foto}
                  iniciales="SS"
                  onChange={setFoto}
                  label="Sarah Stone"
                  avatarClassName="bg-dash-count-bg text-dash-blue-hover size-14 rounded-lg text-base"
                />
                <span>
                  <span className="block text-xl font-bold text-[#09090b]">Sarah Stone</span>
                  <span className="mt-1 inline-block rounded-full border border-[#1a804d] bg-[#f0fcf5] px-2 py-[2px] text-[11px] font-semibold text-[#1a804d]">
                    Dentist
                  </span>
                </span>
              </div>

              <h3 className="mt-5 text-sm font-bold text-[#09090b]">General Information</h3>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <TextField label="First Name" required value={general.first} onChange={(v) => setGeneral((g) => ({ ...g, first: v }))} />
                <TextField label="Last Name" required value={general.last} onChange={(v) => setGeneral((g) => ({ ...g, last: v }))} />
                <TextField label="Email" required value={general.email} onChange={(v) => setGeneral((g) => ({ ...g, email: v }))} />
                <DateField label="Birthdate" required placeholder="March 4, 1988" />
              </div>
            </Card>

            <Card title="Contact Information">
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField label="Area Code" required options={['+1', '+34', '+54']} value={contacto.codigo} onChange={(v) => setContacto((c) => ({ ...c, codigo: v }))} />
                <TextField label="Number" required value={contacto.numero} onChange={(v) => setContacto((c) => ({ ...c, numero: v }))} />
              </div>
              <TextField className="mt-4" label="Extension" placeholder="Placeholder" value={contacto.extension} onChange={(v) => setContacto((c) => ({ ...c, extension: v }))} />
            </Card>

            {/* "Adress Information" es del Figma, igual que en Employees y
                Relationships: se replica tal cual. */}
            <Card title="Adress Information">
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField label="Address line 1" required options={['123 Biscayne Blvd', '456 Ocean Drive']} value={domicilio.linea1} onChange={(v) => setDomicilio((d) => ({ ...d, linea1: v }))} />
                <SelectField label="Address line 2" options={['Suite 300', 'Apt 2B']} value={domicilio.linea2} onChange={(v) => setDomicilio((d) => ({ ...d, linea2: v }))} />
                <SelectField label="Country" required options={['United States']} value={domicilio.pais} onChange={(v) => setDomicilio((d) => ({ ...d, pais: v }))} />
                <SelectField label="Region" required options={['Florida', 'California']} value={domicilio.region} onChange={(v) => setDomicilio((d) => ({ ...d, region: v }))} />
                <SelectField label="City" required options={['Miami', 'Los Angeles']} value={domicilio.ciudad} onChange={(v) => setDomicilio((d) => ({ ...d, ciudad: v }))} />
                <SelectField label="Postal Code" required options={['33101', '90001']} value={domicilio.cp} onChange={(v) => setDomicilio((d) => ({ ...d, cp: v }))} />
              </div>
            </Card>
          </>
        )}

        {tab === 'Subscription' && (
          <>
            <Card title="Subscription Summary">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-[#e4e4e7] p-3.5">
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-[#71717a] uppercase">
                    <CreditCard className="size-3.5" /> Plan
                  </span>
                  <span className="mt-1.5 block text-[15px] font-bold text-[#09090b]">Confidentally Premium</span>
                </div>
                <div className="rounded-lg border border-[#e4e4e7] p-3.5">
                  <span className="text-[11px] font-semibold tracking-wide text-[#71717a] uppercase">Status</span>
                  <span className="mt-1.5 block">
                    <Pill tone={ESTADO_TONO.ACTIVE}>ACTIVE</Pill>
                  </span>
                </div>
                <div className="rounded-lg border border-[#e4e4e7] p-3.5">
                  <span className="text-[11px] font-semibold tracking-wide text-[#71717a] uppercase">Renews on</span>
                  <span className="mt-1.5 block text-[15px] font-bold text-[#09090b] tabular-nums">Sep 30, 2027</span>
                </div>
                <div className="rounded-lg border border-[#e4e4e7] p-3.5">
                  <span className="text-[11px] font-semibold tracking-wide text-[#71717a] uppercase">Licenses</span>
                  <span className="mt-1.5 block text-[15px] font-bold text-[#09090b] tabular-nums">12 / 15 used</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => aviso.info('Plan management is not available in this release.')}
                className="border-dash-blue text-dash-blue mt-4 flex h-9 w-fit items-center gap-2 rounded-md border px-4 text-[13px] font-semibold hover:bg-[#f0f5ff]"
              >
                <ReceiptText className="size-4" /> Manage plan
              </button>
            </Card>

            <Card title="Subscription History">
              <div className="overflow-x-auto rounded-lg border border-[#e7e7e7]">
                <div className="min-w-[520px]">
                  <div className="flex items-center gap-3 bg-[#f9f9f9] px-3 py-2.5 text-[11px] font-semibold text-[#71717a]">
                    <span className="w-[110px] shrink-0">Date</span>
                    <span className="min-w-0 flex-1">Plan</span>
                    <span className="w-[90px] shrink-0">Amount</span>
                    <span className="w-[90px] shrink-0">Status</span>
                  </div>
                  {HISTORIAL.map((h, i) => (
                    <div key={i} className="flex items-center gap-3 border-t border-[#e7e7e7] px-3 py-2.5 text-[13px] text-[#3f3f46]">
                      <span className="w-[110px] shrink-0 tabular-nums">{h.fecha}</span>
                      <span className="min-w-0 flex-1 truncate font-medium text-[#09090b]">{h.plan}</span>
                      <span className="w-[90px] shrink-0 tabular-nums">{h.monto}</span>
                      <span className="w-[90px] shrink-0">
                        <Pill tone={ESTADO_TONO[h.estado]} size="sm">{h.estado}</Pill>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </>
        )}

        {tab === 'Owner' && (
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="bg-dash-count-bg text-dash-blue-hover flex size-14 shrink-0 items-center justify-center rounded-lg text-base font-semibold">
                  JG
                </span>
                <span>
                  <span className="block text-xl font-bold text-[#09090b]">Julian Gerardi</span>
                  <span className="mt-1 inline-flex items-center gap-1 rounded-full border border-[#6633a6] bg-[#f5f0ff] px-2 py-[2px] text-[11px] font-semibold text-[#6633a6]">
                    <Crown className="size-3" /> Practice Owner
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <TextField label="Owner Name" value={duenio.nombre} onChange={(v) => setDuenio((d) => ({ ...d, nombre: v }))} />
              <TextField label="Email" value={duenio.email} onChange={(v) => setDuenio((d) => ({ ...d, email: v }))} />
              <SelectField label="Area Code" options={['+1', '+34', '+54']} value={duenio.codigo} onChange={(v) => setDuenio((d) => ({ ...d, codigo: v }))} />
              <TextField label="Number" value={duenio.numero} onChange={(v) => setDuenio((d) => ({ ...d, numero: v }))} />
            </div>
          </Card>
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
