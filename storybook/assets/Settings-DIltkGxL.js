import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { Outlet, useLocation } from 'react-router-dom'
import { PageTitle } from '@/components/ui/page-title'
import { cn } from '@/lib/utils'
import { ANCHO_PAGINA } from '@/lib/estilos'
import {
  UserCog, Building2, Users, ShieldCheck, SlidersHorizontal, CreditCard, Library, CircleUser, Lock,
  FileSignature, type LucideIcon,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import { SETTINGS_SECTIONS } from '@/data/mock'
import { SETTINGS_NAV } from '@/data/settings-nav'
import { Breadcrumb, type Miga } from '@/components/ui/breadcrumb'
import { SettingsSectionCard } from '@/components/settings/SettingsSectionCard'
import { LOCACIONES } from '@/pages/settings/Locations'
import { EMPLEADOS } from '@/data/employees'
import { CUENTAS } from '@/pages/settings/Accounts'
import { useFinanzas } from '@/data/finanzasStore'

export const SETTINGS_ICONS: Record<string, LucideIcon> = {
  'user-cog': UserCog, building: Building2, users: Users, 'shield-check': ShieldCheck,
  sliders: SlidersHorizontal, 'credit-card': CreditCard, library: Library,
  'circle-user': CircleUser, lock: Lock, 'file-signature': FileSignature,
}


/* El rastro se arma de la ruta, no lo escribe cada pantalla: así hay uno solo
   —el problema anterior eran dos— y siempre incluye la vuelta a General, que
   de otro modo obliga a abrir el menú flotante del rail. */
/* Settings → Billing lleva el breadcrumb de red.dev: Settings › Finance › Carriers › Aetna Dental Plans › Edit ›
   Insurance plans › Acme Corp › Edit. Un /new que abre un drawer sobre la lista termina en la lista. */
const TITULOS_FINANZAS: Record<string, string> = { 'fee-schedule': 'Fee Schedules', carriers: 'Carriers', 'coverage-table': 'Coverage Table' }
const NUEVO_FINANZAS: Record<string, string> = { 'fee-schedule': 'New Fee Schedule', 'coverage-table': 'New Coverage Table' }

/* Billing sigue la regla del resto de Settings (Julián, 2026-10-09): Settings › Billing › sección › ítem, con el nombre del
   menú y sin un tramo "Edit"; el último no es link. El plan cuelga de su carrier. Ver settings-billing.md. */
function migasFinanzas(pathname: string, nombre: (seccion: string, id: string) => string | undefined): Miga[] | null {
  const m = pathname.match(/^\\/settings\\/finance\\/(fee-schedule|carriers|coverage-table)(?:\\/(.*))?$/)
  if (!m) return null
  const [, seccion, resto = ''] = m
  const partes = resto.split('/').filter(Boolean)
  const lista = \`/settings/finance/\${seccion}\`
  const migas: Miga[] = [
    { label: 'Settings', to: '/settings/general' },
    { label: 'Billing', to: '/settings/finance' },
    { label: TITULOS_FINANZAS[seccion], to: lista },
  ]
  if (partes[0] === 'new') {
    if (NUEVO_FINANZAS[seccion]) migas.push({ label: NUEVO_FINANZAS[seccion] })
  } else if (partes[0]) {
    migas.push({ label: nombre(seccion, partes[0]) ?? partes[0], to: \`\${lista}/\${partes[0]}/edit/insurance-plans\` })
    if (partes[2] === 'insurance-plans' && partes[3] && partes[3] !== 'new') migas.push({ label: nombre('planes', partes[3]) ?? partes[3] })
  }
  migas[migas.length - 1] = { label: migas[migas.length - 1].label }
  return migas
}

function migasDe(pathname: string, nombreFinanzas: (seccion: string, id: string) => string | undefined): Miga[] {
  if (pathname === '/settings/general') return []
  const finanzas = migasFinanzas(pathname, nombreFinanzas)
  if (finanzas) return finanzas
  const migas: Miga[] = [{ label: 'Settings', to: '/settings/general' }]

  const item = SETTINGS_NAV.find(
    (n) => pathname === n.to || pathname.startsWith(\`\${n.to}/\`),
  )
  if (item) {
    /* .../new es la lista con el drawer de alta abierto. */
    const hoja = pathname === item.to || pathname === \`\${item.to}/new\`
    migas.push({ label: item.label, to: hoja ? undefined : item.to })
    const hijo = item.children?.find((c) => pathname === c.to || pathname.startsWith(\`\${c.to}/\`))
    if (hijo) migas.push({ label: hijo.label })
  }

  /* El detalle de una locación o de un empleado no está en el menú: su
     nombre es el último tramo y sale del id de la ruta. "new" no es un id:
     es la lista con el drawer de alta abierto. */
  const detalleLoc = pathname.match(/^\\/settings\\/locations\\/([^/]+)$/)
  if (detalleLoc && detalleLoc[1] !== 'new') {
    const loc = LOCACIONES.find((l) => l.id === detalleLoc[1])
    migas.push({ label: loc?.nombre ?? detalleLoc[1] })
  }
  const detalleEmpleado = pathname.match(/^\\/settings\\/team\\/([^/]+)$/)
  if (detalleEmpleado && detalleEmpleado[1] !== 'new') {
    const emp = EMPLEADOS.find((e) => e.id === detalleEmpleado[1])
    migas.push({ label: emp?.nombre ?? detalleEmpleado[1] })
  }
  const detalleCuenta = pathname.match(/^\\/settings\\/accounts\\/([^/]+)$/)
  if (detalleCuenta) {
    const cuenta = CUENTAS.find((c) => c.id === detalleCuenta[1])
    migas.push({ label: cuenta?.nombre ?? detalleCuenta[1] })
  }
  return migas
}

export function SettingsLayout() {
  const { pathname } = useLocation()
  const { aranceles, aseguradoras, coberturas, planes } = useFinanzas()
  const listas: Record<string, { id: string; nombre: string }[]> = { 'fee-schedule': aranceles, carriers: aseguradoras, 'coverage-table': coberturas, planes }
  const migas = migasDe(pathname, (seccion, id) => listas[seccion]?.find((x) => x.id === id)?.nombre)
  return (
    /* El sidebar propio de Settings se fue —sus pantallas cuelgan del menú
       flotante del rail—. El breadcrumb vive acá y en ningún otro lado: cuando
       además lo dibujaba cada pantalla, quedaban dos. */
    /* Settings era la única sección sin tope de ancho: en un monitor grande
       sus cards se estiraban hasta 800px mientras el resto de la app cortaba
       a 1400/1800. Ahora comparte el ancho, y la barra de arriba se alinea
       con todas las pantallas por igual. */
    <div className={cn(ANCHO_PAGINA, 'min-h-full')}>
      {migas.length > 0 && (
        <div className="px-4 pt-5 sm:px-8">
          <Breadcrumb items={migas} />
        </div>
      )}
      <Outlet />
    </div>
  )
}

export function SettingsGeneral() {
  return (
    <div className="px-4 py-6 sm:px-8">
      <PageTitle>Settings</PageTitle>
      <p className="mt-[9px] text-xs leading-[17px] text-ink-faint">Configure and manage your workspace preferences.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {SETTINGS_SECTIONS.map((s) => {
          const Icon = SETTINGS_ICONS[s.icon] ?? SlidersHorizontal
          return (
            <SettingsSectionCard key={s.to} to={s.to} icon={Icon} title={s.title} description={s.desc} />
          )
        })}
      </div>
    </div>
  )
}

export function SettingsPlaceholder() {
  const { pathname } = useLocation()
  const label = [...SETTINGS_NAV].reverse().find((n) => pathname.startsWith(n.to))?.label ?? 'Settings'
  return (
    <div className="px-4 py-6 sm:px-8">
      <PageTitle>{label}</PageTitle>
      <Card className="mt-6 flex">
        <EmptyState
          title="Coming soon"
          detail="This space is reserved for an upcoming section. Not part of this release."
          pill="Planned"
        />
      </Card>
    </div>
  )
}
`})))()}export{n,i as r,r as t};