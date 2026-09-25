import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import { BrowserRouter, HashRouter } from 'react-router-dom'
import { PatientsProvider } from '@/data/patientsStore'
import { Toaster } from '@/components/ui/toaster'
import { HelpProvider } from '@/components/help/HelpProvider'
import { AppRoutes } from '@/AppRoutes'

/* El build de una sola página (artifact) no tiene servidor que resuelva rutas,
   así que ahí se usa HashRouter. En dev sigue siendo BrowserRouter. */
const Router = import.meta.env.VITE_HASH_ROUTER ? HashRouter : BrowserRouter

export default function App() {
  return (
    <PatientsProvider>
      <Toaster />
      <Router>
        <HelpProvider>
          <AppRoutes />
        </HelpProvider>
      </Router>
    </PatientsProvider>
  )
}
`})))()}var r;function i(){return(i=e((()=>{r=`import { Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import Login from '@/pages/Login'
import ForgotPassword from '@/pages/ForgotPassword'
import Dashboard from '@/pages/Dashboard'
import Patients from '@/pages/Patients'
import EditPatientPage from '@/pages/patients/EditPatient'
import Treatments from '@/pages/patients/Treatments'
import PatientDocuments from '@/pages/patients/Documents'
import Relationships from '@/pages/patients/Relationships'
import Insurance from '@/pages/patients/Insurance'
import Ledger from '@/pages/patients/Ledger'
import AddRelationship from '@/pages/patients/AddRelationship'
import PatientDetail from '@/pages/PatientDetail'
import ClinicalMode from '@/pages/ClinicalMode'
import NotFound from '@/pages/NotFound'
import Scheduling from '@/pages/Scheduling'
import Billing from '@/pages/Billing'
import UnderConstruction from '@/pages/UnderConstruction'
import { SettingsLayout, SettingsGeneral, SettingsPlaceholder } from '@/pages/Settings'
import { SettingsLocations } from '@/pages/settings/Locations'
import { SettingsLocationDetail } from '@/pages/settings/LocationDetail'
import { SettingsNewLocation } from '@/pages/settings/NewLocation'
import { SettingsEmployees, SettingsEmployeeDetail } from '@/pages/settings/Employees'
import { SettingsNewEmployee } from '@/pages/settings/NewEmployee'
import { SettingsAccounts } from '@/pages/settings/Accounts'
import { SettingsAccount } from '@/pages/settings/Account'
import { SettingsConsents } from '@/pages/settings/Consents'
import { SettingsLedgerOptions } from '@/pages/settings/LedgerOptions'
import Help from '@/pages/Help'

const SETTINGS_PLACEHOLDERS = [
  'roles', 'parameters',
  'finance', 'finance/fee-schedule', 'finance/carriers', 'finance/coverage-table',
  'libraries', 'patient-portal', 'security', 'preferences',
]

/* Las rutas de la app, separadas del router y los providers para que el design
   system pueda montar cada pantalla en un MemoryRouter. */
export function AppRoutes() {
  return (
    <Routes>
      {/* Auth, fuera del shell */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Clinical Mode es un takeover: no usa el app shell */}
      <Route path="/patients/:id/clinical-mode" element={<ClinicalMode />} />

      <Route element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="patients" element={<Patients />} />
        {/* Antes de patients/:id, si no "edit" se toma como un id. */}
        <Route path="patients/edit" element={<EditPatientPage />} />
        <Route path="patients/:id" element={<PatientDetail />} />
        <Route path="patients/:id/treatments" element={<Treatments />} />
        <Route path="patients/:id/documents" element={<PatientDocuments />} />
        <Route path="patients/:id/insurance" element={<Insurance />} />
        <Route path="patients/:id/ledger" element={<Ledger />} />
        <Route path="patients/:id/relationships" element={<Relationships />} />
        <Route path="patients/:id/relationships/new" element={<AddRelationship />} />
        <Route path="scheduling" element={<Scheduling />} />
        <Route path="billing" element={<Billing />} />

        {/* Las tres comparten el mismo placeholder en el original.
            /reports va al mismo sitio: en el original es un monitor de latencia
            interno ("API Monitor"), no una pantalla de producto. */}
        {['message', 'contacts', 'documents', 'reports'].map((p) => (
          <Route key={p} path={p} element={<UnderConstruction />} />
        ))}
        <Route path="help" element={<Help />} />

        <Route path="settings" element={<SettingsLayout />}>
          <Route index element={<Navigate to="/settings/general" replace />} />
          <Route path="general" element={<SettingsGeneral />} />
          <Route path="locations" element={<SettingsLocations />} />
          <Route path="locations/new" element={<SettingsNewLocation />} />
          <Route path="locations/:locId" element={<SettingsLocationDetail />} />
          <Route path="team" element={<SettingsEmployees />} />
          <Route path="team/new" element={<SettingsNewEmployee />} />
          <Route path="team/:employeeId" element={<SettingsEmployeeDetail />} />
          <Route path="accounts" element={<SettingsAccounts />} />
          <Route path="accounts/:accountId" element={<SettingsAccount />} />
          <Route path="account" element={<SettingsAccount />} />
          <Route path="consents" element={<SettingsConsents />} />
          <Route path="ledger" element={<SettingsLedgerOptions />} />
          {SETTINGS_PLACEHOLDERS.map((p) => (
            <Route key={p} path={p} element={<SettingsPlaceholder />} />
          ))}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
`})))()}var a;function o(){return(o=e((()=>{a=`import { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import {
  ModalShell, TextField, SelectField, TextArea, FieldLabel, FormFooter,
} from '@/components/patients/form'
import { DatePicker } from '@/components/ui/date-picker'
import { LedgerAllocationTable } from '@/components/patients/ledger/LedgerAllocationTable'
import { type Movimiento } from '@/data/ledger'
import {
  PACIENTES_BILLING, buscarPacientes, cargosAbiertos, TIPOS_AJUSTE_BILLING, type TipoAjusteBilling,
} from '@/data/billing'

/* Figma 4481:10480 "Post payment", modal sobre el Billing Overview. Ver
   design-reference/figma/modulos/billing.md. Reutiliza el mismo cuerpo que
   CreditAdjustmentPanel (fecha/monto/tipo/apply to + Notes + Ledger
   Transactions), sumando el buscador de paciente que acá hace falta porque
   no hay un paciente ya elegido de antes. */
export function PostPaymentDialog({
  tipoInicial, pacienteInicial, onClose, onGuardar,
}: {
  tipoInicial: TipoAjusteBilling
  pacienteInicial?: string
  onClose: () => void
  onGuardar: (m: Omit<Movimiento, 'id'>) => void
}) {
  const [busqueda, setBusqueda] = useState(pacienteInicial ?? '')
  const [buscando, setBuscando] = useState(false)
  const refBusqueda = useRef<HTMLDivElement>(null)
  const [fecha, setFecha] = useState<Date | null>(null)
  const [monto, setMonto] = useState('')
  const [tipo, setTipo] = useState<TipoAjusteBilling>(tipoInicial)
  const [aplicaA, setAplicaA] = useState(pacienteInicial ?? '')
  const [notas, setNotas] = useState('')
  const [intentado, setIntentado] = useState(false)

  useEffect(() => {
    if (!buscando) return
    const onDown = (e: MouseEvent) => {
      if (refBusqueda.current && !refBusqueda.current.contains(e.target as Node)) setBuscando(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [buscando])

  const elegirPaciente = (nombre: string) => {
    setAplicaA(nombre)
    setBusqueda(nombre)
    setBuscando(false)
  }

  const cargos = cargosAbiertos(aplicaA)
  const resultados = buscarPacientes(busqueda)

  const guardar = () => {
    setIntentado(true)
    if (!fecha || !monto.trim() || !aplicaA.trim()) return
    const valor = Number(monto) || 0
    onGuardar({
      fecha: fecha.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      paciente: aplicaA,
      codigo: '—',
      descripcion: tipo,
      provider: 'Front desk',
      tipo: tipo === 'Patient Payment' ? 'Payment' : 'Adjustment',
      monto: tipo === 'Charge Adjustment' ? valor : -valor,
      estado: 'Posted',
    })
  }

  return (
    <ModalShell title="Post payment" onClose={onClose} width="max-w-[900px]" footer={<FormFooter onCancel={onClose} onSave={guardar} />}>
      <div className="flex flex-col gap-4">
        <div ref={refBusqueda} className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
          <input
            value={busqueda}
            onChange={(e) => { setBusqueda(e.target.value); setBuscando(true) }}
            onFocus={() => setBuscando(true)}
            /* Typo tal cual el Figma: "guarantors,phone...." sin espacio.
               Ver billing.md, anomalía documentada. */
            placeholder="Search Patients, guarantors,phone...."
            className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
          />
          {buscando && resultados.length > 0 && (
            <div className="motion-safe:animate-[loc-in_120ms_ease-out] absolute top-[calc(100%+4px)] left-0 z-30 max-h-52 w-full overflow-y-auto rounded-md border border-line bg-white py-1 shadow-lg">
              {resultados.map((p) => (
                <button
                  key={p.nombre}
                  type="button"
                  onClick={() => elegirPaciente(p.nombre)}
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-[13px] hover:bg-surface-muted"
                >
                  {p.nombre}
                  <span className="text-ink-faint">{p.rol}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex w-full flex-col gap-2 sm:w-[180px]">
            <FieldLabel required>Transaction date</FieldLabel>
            <DatePicker value={fecha} onChange={setFecha} className="h-9 w-full" error={intentado && !fecha ? true : undefined} />
          </div>
          <TextField
            label="Amount" required placeholder="$ 0.00" value={monto} onChange={setMonto}
            error={intentado && !monto.trim() ? 'This field is required.' : undefined}
            className="w-full sm:w-[160px]"
          />
          <SelectField label="Type" required options={[...TIPOS_AJUSTE_BILLING]} value={tipo} onChange={(v) => setTipo(v as TipoAjusteBilling)} className="w-full sm:w-[200px]" />
          <SelectField
            label="Apply to" required options={PACIENTES_BILLING.map((p) => p.nombre)} value={aplicaA}
            onChange={(v) => { setAplicaA(v); setBusqueda(v) }}
            error={intentado && !aplicaA.trim() ? 'This field is required.' : undefined}
            className="w-full sm:w-[200px]"
          />
        </div>

        <TextArea label="Notes" placeholder="Placeholder" value={notas} onChange={setNotas} />

        <LedgerAllocationTable cargos={cargos} />
      </div>
    </ModalShell>
  )
}
`})))()}var s;function c(){return(c=e((()=>{s=`import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EXAMENES, REGISTROS, type Juego, type Pestana } from '@/data/clinical-mode'

/* Botonera de 4235:135661 y 4265:56662. El primer botón no es una pestaña más:
   es el que **cambia la botonera entera**. Con "Exams" salen los diez
   exámenes; con "Records", los siete registros —Treatment Plan, Lab Order,
   Prescription…—. El frame lo dibuja con chevron derecho cerrado y chevron
   abajo abierto, y eso es exactamente lo que hace acá. */
export function ClinicalToolbar({
  juego, onJuego, pestana, onPestana,
}: {
  juego: Juego
  onJuego: (j: Juego) => void
  pestana: Pestana
  onPestana: (p: Pestana) => void
}) {
  const [abierto, setAbierto] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fuera = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setAbierto(false)
    }
    document.addEventListener('mousedown', fuera)
    return () => document.removeEventListener('mousedown', fuera)
  }, [])

  const items: readonly string[] = juego === 'Exams' ? EXAMENES : REGISTROS

  return (
    /* El botón del desplegable vive FUERA del contenedor que scrollea: adentro,
       el \`overflow-x-auto\` recortaba el menú y quedaba escondido detrás de la
       pantalla. Sólo scrollean las pestañas. */
    <div className="flex items-center gap-[10.64px]">
      <div ref={ref} className="relative z-20 shrink-0">
        <button
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          className="flex h-9 items-center gap-1.5 rounded-lg border border-line bg-white px-3.5 text-[13px] font-medium whitespace-nowrap shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] hover:bg-surface-subtle"
        >
          {/* El rótulo es siempre "Exams", como en los dos frames: es el nombre
              del menú, no el del juego activo. Cuál está puesto se ve marcado
              adentro del desplegable. */}
          Exams
          {abierto ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
        </button>

        {abierto && (
          <div className="absolute top-full left-0 z-50 mt-1 w-[180px] rounded-lg border border-line bg-white p-1 shadow-[0_12px_32px_rgb(0_0_0/0.18)]">
            {(['Exams', 'Records'] as const).map((j) => (
              <button
                key={j}
                onClick={() => {
                  onJuego(j)
                  onPestana((j === 'Exams' ? EXAMENES[2] : REGISTROS[3]) as Pestana)
                  setAbierto(false)
                }}
                className={cn(
                  'block w-full rounded px-3 py-2 text-left text-[13px] hover:bg-surface-muted',
                  juego === j && 'bg-dash-count-bg text-dash-blue-hover font-medium',
                )}
              >
                {j}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fill container: en desktop las pestañas se reparten el ancho en
          partes iguales, como en el frame. En angosto vuelven a su tamaño y
          scrollean. */}
      <div className="-mx-1 min-w-0 flex-1 overflow-x-auto px-1 pb-1">
        {/* El hueco entre pestañas queda fijo en 10.64, el del export. El
            sobrante lo absorben las **pestañas**, no los huecos: \`grow\` con
            base automática reparte el extra en partes iguales, así cada una
            crece lo mismo y conserva su diferencia de ancho. Con
            \`justify-between\` el sobrante caía en los huecos y quedaban de 47;
            con \`basis-0\` todas terminaban del mismo ancho. */}
        <div className="flex w-max items-center gap-[10.64px] lg:w-full">
          {items.map((p) => {
            const on = p === pestana
            return (
              <button
                key={p}
                onClick={() => onPestana(p as Pestana)}
                aria-current={on ? 'page' : undefined}
                className={cn(
                  /* Del export de la Tab Bar: alto 33.96, padding 21.27, radio
                     5.32, label 11.52/600. Cada pestaña mide lo que dice: el
                     ancho de la fila lo da el padding de la pantalla, no un
                     estiramiento de los botones. */
                  'flex h-[33.96px] shrink-0 items-center justify-center rounded-[5.32px] px-[21.27px] text-[11.52px] font-semibold whitespace-nowrap transition-colors',
                  'lg:grow',
                  on
                    ? 'bg-dash-blue font-semibold text-white'
                    : 'border border-line bg-white font-medium text-ink shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] hover:bg-surface-subtle',
                )}
              >
                {p}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
`})))()}var l;function u(){return(u=e((()=>{l=`import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import {
  ChevronLeft, ChevronDown, PanelsTopLeft, Check, Link2, Activity, Users, Info,
  Play, Pause,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { CONSTANTES, CONTADORES, PANELES, type Contador, type ClavePanel } from '@/data/clinical-mode'
import { ClinicalPopover } from '@/components/patients/ClinicalPopover'
import { ClinicalItemModal } from '@/components/patients/ClinicalItemModal'
import { ITEMS_INICIALES, type Categoria, type ClinicalItem } from '@/data/clinicalItems'

const ICONO_CONTADOR = { link: Link2, signos: Activity, personas: Users, info: Info }

/* Barra de 4235:135661. Todo va en una fila pegada, con la misma separación
   entre piezas: nada se estira. Antes el grupo del medio crecía y dejaba un
   hueco enorme antes de Start Enconter.

   Exit y Overwiev (la caja con texto del frame) van sólo con el ícono, a
   pedido de Julián: al pasar el mouse el botón muestra su caja y se abre con
   el texto adentro. 36px en reposo: 8 de padding + 1 de borde + el ícono de
   18. Al abrirse empujan lo de al lado, no lo tapan. */
const BOTON = 'group/btn flex h-9 shrink-0 items-center justify-center rounded-lg border border-transparent px-2 text-[13px] font-medium text-ink transition-colors hover:border-line hover:bg-white hover:shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] focus-visible:border-line focus-visible:bg-white'

/* El texto está siempre en el DOM, sólo sin ancho: se abre con el hover o con
   el foco del teclado. */
const ETIQUETA = 'max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity,margin] duration-200 group-hover/btn:ml-2 group-hover/btn:max-w-[160px] group-hover/btn:opacity-100 group-focus-visible/btn:ml-2 group-focus-visible/btn:max-w-[160px] group-focus-visible/btn:opacity-100'

/* Todo lo que cuelga de la barra —los contadores y las pills CC/TR— usa el
   mismo desplegable flotante. Va en portal y con posición fija: la barra
   scrollea de costado y un absoluto adentro quedaría recortado. */
function Flotante({
  titulo, ancla, ancho = 220, onClose, children,
}: {
  titulo: string
  ancla: DOMRect
  ancho?: number
  onClose: () => void
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const left = Math.max(12, Math.min(ancla.left, window.innerWidth - ancho - 12))

  useEffect(() => {
    const fuera = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('mousedown', fuera)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', fuera)
      document.removeEventListener('keydown', esc)
    }
  }, [onClose])

  return createPortal(
    <div
      ref={ref}
      role="dialog"
      aria-label={titulo}
      style={{ left, top: ancla.bottom + 6, width: ancho }}
      className="motion-safe:animate-[loc-in_120ms_ease-out] fixed z-50 rounded-lg border border-line bg-white p-3 shadow-[0_12px_32px_rgb(0_0_0/0.18)]"
    >
      <p className="text-[13px] font-bold text-ink">{titulo}</p>
      {children}
    </div>,
    document.body,
  )
}

/* Referrals cuenta lo suyo; las clínicas cuentan lo que hay en la lista. */
function ListaContador({ c }: { c: Contador }) {
  if (c.items.length === 0) return <p className="mt-1.5 text-[12px] text-ink-muted">{c.vacio}</p>
  return (
    <ul className="mt-2 flex flex-col gap-1.5">
      {c.items.map((i) => (
        <li key={i} className="flex items-center gap-2 text-[12px] text-ink-medium">
          <span className="bg-dash-blue size-1 shrink-0 rounded-full" />
          <span className="min-w-0 truncate">{i}</span>
        </li>
      ))}
    </ul>
  )
}

type Flot =
  | { tipo: 'contador'; c: Contador; rect: DOMRect }
  | { tipo: 'pill'; k: ClavePanel; rect: DOMRect }

/* Tres de los cuatro contadores son categorías clínicas y ya tienen su
   componente en el dashboard del paciente: el popover con la lista y el modal
   de alta. Se reusa ese, no una lista de sólo lectura. Referrals no es una
   categoría clínica y sigue con su lista simple. */
const CATEGORIA_DE: Record<string, Categoria> = {
  medications: 'Medication',
  conditions: 'Medical Conditions',
  allergies: 'Allergies',
}

export function ClinicalTopBar({
  volverA, encuentro, onEncuentro, onOverview, enOverview,
}: {
  volverA: string
  encuentro: boolean
  onEncuentro: () => void
  onOverview: () => void
  enOverview: boolean
}) {
  const [abierto, setAbierto] = useState(false)
  const [flot, setFlot] = useState<Flot | null>(null)
  const [items, setItems] = useState(ITEMS_INICIALES)
  const [clinico, setClinico] = useState<{ cat: Categoria; item?: ClinicalItem } | null>(null)

  const cuenta = (c: Contador) =>
    CATEGORIA_DE[c.id] ? items[CATEGORIA_DE[c.id]].length : c.items.length

  const contadorBoton = (c: Contador) => {
    const Icono = ICONO_CONTADOR[c.icono]
    const on = flot?.tipo === 'contador' && flot.c.id === c.id
    return (
      <button
        key={c.id}
        title={c.titulo}
        aria-label={\`\${c.titulo}: \${cuenta(c)}\`}
        aria-expanded={on}
        onClick={(e) =>
          setFlot(on ? null : { tipo: 'contador', c, rect: e.currentTarget.getBoundingClientRect() })
        }
        className={cn(
          /* Cápsula más alta que en el export: con 18.17 el ícono queda en
             12px y no se distingue de qué es cada contador. */
          'flex h-[26px] shrink-0 items-center gap-[4px] rounded-full border border-[#E5E7EB] bg-[#F9FAFB] px-[6px] transition-colors hover:bg-[#f1f5ff]',
          on && 'border-dash-blue bg-dash-count-bg',
        )}
      >
        <Icono className="text-dash-blue size-[16px]" />
        {/* El cero va en gris: un contador vacío no es una novedad. */}
        {/* El export pinta el badge de azul también con 0: no se separa el
            caso vacío. */}
        <span className="bg-dash-blue flex size-[17px] items-center justify-center rounded-full text-[9px] leading-none text-white">
          {cuenta(c)}
        </span>
      </button>
    )
  }

  const guardarItem = (cat: Categoria) => (it: ClinicalItem) =>
    setItems((prev) => {
      const lista = prev[cat]
      const existe = lista.some((x) => x.id === it.id)
      return { ...prev, [cat]: existe ? lista.map((x) => (x.id === it.id ? it : x)) : [...lista, it] }
    })

  const borrarItem = (cat: Categoria) => (it: ClinicalItem) => {
    const indice = items[cat].findIndex((x) => x.id === it.id)
    setItems((prev) => ({ ...prev, [cat]: prev[cat].filter((x) => x.id !== it.id) }))
    aviso.warn(\`\${it.name} was removed.\`, {
      label: 'Undo',
      onClick: () => setItems((prev) => ({
        ...prev,
        [cat]: [...prev[cat].slice(0, indice), it, ...prev[cat].slice(indice)],
      })),
    })
  }

  /* CC y TR cuelgan un desplegable igual que los contadores: el texto es
     corto y abrir media pantalla para leer dos párrafos era demasiado. Se
     dibujan en dos lugares -según el ancho, uno se oculta con \`hidden\`- y
     comparten estos botones. */
  const pastillas = (['CC', 'TR'] as const).map((k) => {
    const on = flot?.tipo === 'pill' && flot.k === k
    return (
      <button
        key={k}
        onClick={(e) =>
          setFlot(on ? null : { tipo: 'pill', k, rect: e.currentTarget.getBoundingClientRect() })
        }
        aria-expanded={on}
        className={cn(
          /* Más grande que el export (22.81 de alto, texto 10.9, tilde 9.08):
             a ese tamaño el tilde casi no se distinguía. */
          'flex h-7 shrink-0 items-center gap-1.5 rounded-full bg-[#28C563] px-2.5 text-[13px] font-medium text-white',
          'transition-all outline-none [outline-style:solid] outline-[2px] outline-offset-[2px] outline-transparent',
          'hover:bg-[#1fae54]',
          on && 'outline-[#28C563]',
        )}
      >
        <Check className="size-3" /> {k}
      </button>
    )
  })

  return (
    /* Fila de 1124 con gap 21 entre los cinco grupos, tal cual el export.
       Ninguno crece: la suma de los grupos más los gaps da exactamente 1124,
       así que el sobrante de pantallas más anchas queda a la derecha. */
    <div className="relative flex flex-wrap items-center gap-[12px] lg:flex-nowrap lg:overflow-x-auto">
      {/* Grupo 0 del export: Exit + Overwiev + las dos pills, con gap 9.82 y
          11.25 respectivamente -las pills sólo hasta lg: en desktop se
          mudaron junto a la edad-. */}
      {/* En el teléfono el grupo envuelve: sus 370px no entran en 358 y la
          barra terminaba scrolleando de costado. En tablet ocupa la primera
          línea entera -Exit y Overwiev a la izquierda, CC y TR al final- y
          empuja los contadores y el paciente a la segunda. */}
      <span className="flex items-center gap-[9.82px] max-md:flex-wrap md:max-lg:w-full lg:shrink-0">
      {/* Exit y Overwiev: en reposo son dos íconos; al pasar el mouse el botón
          se abre hacia la derecha con su texto y empuja lo que tiene al lado.
          Antes se abría por encima y tapaba los contadores (Medications y
          compañía): Julián pidió que no se superpongan. */}
      <Link to={volverA} aria-label="Exit clinical Mode" className={cn(BOTON, 'hover:bg-surface-subtle')}>
        <ChevronLeft className="size-[18px] shrink-0" />
        <span className={ETIQUETA}>Exit clinical Mode</span>
      </Link>

      {/* Overwiev no es una pestaña: es el botón que vuelve al panel del
          paciente desde cualquier examen o registro. */}
      <button
        onClick={onOverview}
        aria-label="Overwiev"
        aria-current={enOverview ? 'page' : undefined}
        /* Seleccionado sigue siendo el azul sólido de la pestaña activa de la
           botonera aunque el resto esté escondido: es el estado de "acá
           estás", no decoración. Inactivo, el hover tira a azul. */
        className={cn(
          BOTON,
          'font-semibold',
          enOverview
            ? 'bg-dash-blue hover:bg-dash-blue-hover border-transparent text-white hover:border-transparent'
            : 'hover:border-dash-blue hover:bg-dash-count-bg hover:text-dash-blue-hover',
        )}
      >
        <PanelsTopLeft className="size-[18px] shrink-0" />
        <span className={ETIQUETA}>Overwiev</span>
      </button>

      {/* CC y TR hasta lg: en tablet al final de la primera línea, en el
          teléfono envueltas con el resto. Desde lg se muestran junto a la
          edad del paciente, más abajo. */}
      <span className="flex shrink-0 items-center gap-[11.25px] md:max-lg:ml-auto lg:hidden">
        {pastillas}
      </span>
      </span>

      {/* Grupo 1: los contadores, gap 6 -Medications incluido, en su lugar
          original-. */}
      <span className="flex items-center gap-[6px] max-md:flex-wrap md:shrink-0">
      {CONTADORES.map(contadorBoton)}
      </span>

      {/* Grupo 4: la info del paciente (edad/sexo/altura/peso + avatar y
          nombre) y Start Enconter, gap 9 -el botón de nota se sacó a pedido de
          Julián-. Julián pidió esto
          al revés de como había quedado: lo que se sacaba del racimo de
          contadores -por pesado, no por chico- era este bloque, no
          Medications. Es el único grupo que se corre: \`ml-auto\` manda el
          sobrante acá y deja los demás pegados con su hueco de 12. */}
      <span className="flex shrink-0 items-center gap-[9px] max-md:w-full max-md:flex-wrap md:ml-auto">

      {/* Subgrupo de info del paciente: detail-info-bar + user-info-bar
          envuelven juntos, como una sola unidad, separados de Start Enconter
          -si compartieran una sola fila sin wrap propio, el \`max-md:flex-1\`
          del pill de abajo lo aplastaría contra lo que sobre en esa línea en
          vez de mandarlo a la suya-. */}
      <span className="flex items-center gap-[9px] max-md:flex-wrap">
      {/* Desktop: CC y TR pegadas a la edad, a pedido de Julián. */}
      <span className="hidden shrink-0 items-center gap-[11.25px] lg:flex">
        {pastillas}
      </span>
      {/* "detail-info-bar": cuatro celdas de 15.71 de alto separadas por una
          regla a la derecha —la última no lleva—, texto de 11.79. */}
      <span className="flex h-[15.71px] items-center gap-[3.93px] max-md:flex-wrap md:shrink-0">
        {CONSTANTES.map((c, i) => (
          <span
            key={c.valor}
            className={cn(
              'flex h-full items-center justify-center px-[6px] text-[11.79px] leading-[16px] whitespace-nowrap text-black',
              i < CONSTANTES.length - 1 && 'border-r border-line',
            )}
          >
            {c.valor}
          </span>
        ))}
      </span>

      {/* "user-info-bar": avatar de 23.71 y el nombre en 11.95/600. */}
      <span className="flex shrink-0 items-center gap-[3.19px]">
        <span className="bg-dash-count-bg text-dash-blue-hover flex size-[23.71px] items-center justify-center rounded-full text-[10px] font-semibold">
          JP
        </span>
        <span className="text-[11.95px] leading-[14px] font-semibold whitespace-nowrap text-[#18181B]">
          Julio Perez
        </span>
      </span>
      </span>

      {/* Start Enconter: en su propia fila el pill puede volver a ocupar todo
          el ancho que sobre (\`max-md:flex-1\` adentro), en vez de repartirse
          contra la info del paciente. */}
      <span className="flex shrink-0 items-center gap-[9px] max-md:w-full">
      {/* Un solo pill verde con el chevron adentro: 31.79 de alto, radio
          completo, label en 10.8/600. */}
      <div className="flex h-[31.79px] shrink-0 items-center overflow-hidden rounded-full bg-[#28C563] max-md:flex-1">
        <button
          onClick={onEncuentro}
          className="flex h-full items-center justify-center gap-[7.86px] pr-[6px] pl-[12.77px] text-[10.8px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-[#1fae54] max-md:flex-1"
        >
          {encuentro ? <Pause className="size-[13.75px]" /> : <Play className="size-[13.75px]" />}
          {encuentro ? 'Pause Enconter' : 'Start Enconter'}
        </button>
        <button
          onClick={() => setAbierto((v) => !v)}
          aria-label="Encounter options"
          aria-expanded={abierto}
          className="flex h-full items-center pr-[12.77px] pl-[2px] text-white transition-colors hover:bg-[#1fae54]"
        >
          <ChevronDown className={cn('size-[15.71px] transition-transform', abierto && 'rotate-180')} />
        </button>
      </div>
      </span>
      </span>

      {abierto && (
        <div className="absolute top-full right-0 z-40 mt-1 w-[220px] rounded-lg border border-line bg-white p-1 shadow-[0_12px_32px_rgb(0_0_0/0.18)]">
          {['End encounter', 'Discard encounter', 'Encounter settings'].map((t) => (
            <button
              key={t}
              onClick={() => { setAbierto(false); aviso.info(\`\${t} is not available in this release.\`) }}
              className="block w-full rounded px-3 py-2 text-left text-[13px] hover:bg-surface-muted"
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {/* Categoría clínica: el popover del dashboard del paciente, con alta,
          edición y baja. Referrals: la lista simple. */}
      {flot?.tipo === 'contador' && CATEGORIA_DE[flot.c.id] && (
        <ClinicalPopover
          title={CATEGORIA_DE[flot.c.id]}
          anchor={flot.rect}
          items={items[CATEGORIA_DE[flot.c.id]]}
          onAdd={() => setClinico({ cat: CATEGORIA_DE[flot.c.id] })}
          onEdit={(it) => setClinico({ cat: CATEGORIA_DE[flot.c.id], item: it })}
          onDelete={borrarItem(CATEGORIA_DE[flot.c.id])}
          onClose={() => setFlot(null)}
        />
      )}
      {flot?.tipo === 'contador' && !CATEGORIA_DE[flot.c.id] && (
        <Flotante titulo={flot.c.titulo} ancla={flot.rect} onClose={() => setFlot(null)}>
          <ListaContador c={flot.c} />
        </Flotante>
      )}
      {clinico && (
        <ClinicalItemModal
          categoria={clinico.cat}
          item={clinico.item}
          onGuardar={guardarItem(clinico.cat)}
          onClose={() => setClinico(null)}
        />
      )}
      {flot?.tipo === 'pill' && (
        <Flotante titulo={PANELES[flot.k].titulo} ancla={flot.rect} ancho={300} onClose={() => setFlot(null)}>
          {PANELES[flot.k].parrafos.map((t) => (
            <p key={t} className="mt-2 text-[12px] leading-[1.55] text-ink-medium">{t}</p>
          ))}
          <p className="mt-3 border-t border-line-soft pt-2 text-[11px] text-ink-muted">
            {PANELES[flot.k].fecha} · {PANELES[flot.k].hora}
          </p>
        </Flotante>
      )}
    </div>
  )
}
`})))()}var d;function f(){return(f=e((()=>{d=`import { useState } from 'react'
import { Bookmark, CircleCheck, CircleAlert, History, MoreVertical, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { CONSENTIMIENTO, type Firma } from '@/data/treatment-plan'
import { ICONO_SUELTO } from '@/lib/estilos'

/* Figma 4122:250449, rediseñado.

   El frame lo pone al pie del caso: una fila ámbar con el título, la misma
   advertencia repetida dos veces —"Provider signature pending"— y dos botones
   de ícono sin rótulo. Para saber quién firmó había que abrir Consent history y
   recién ahí elegir el documento.

   Acá el documento es lo primero de la pantalla y el bloque responde las tres
   preguntas que importan sin abrir nada: **qué documento es, quién firmó y qué
   falta hacer**. El historial queda de vista secundaria, detrás de un botón.

   El ámbar se mantiene, pero como acento del estado pendiente, no como marco de
   toda la card: cuando las dos firmas están, el bloque pasa a verde solo. */

const TONO = {
  Pending: { bar: '#99660d', pill: 'border-warn-fg bg-warn-bg text-warn-fg', tile: 'bg-warn-bg text-warn-fg' },
  Signed: { bar: '#1a804d', pill: 'border-dash-ok-fg bg-dash-ok-bg text-dash-ok-fg', tile: 'bg-dash-ok-bg text-dash-ok-fg' },
  Expired: { bar: '#b22626', pill: 'border-dash-bad-fg bg-dash-bad-bg text-dash-bad-fg', tile: 'bg-dash-bad-bg text-dash-bad-fg' },
}

function FilaFirma({ f }: { f: Firma }) {
  const ok = f.estado === 'Signed'
  return (
    <div className="flex min-w-0 items-center gap-2">
      {ok
        ? <CircleCheck className="size-4 shrink-0 text-dash-ok-fg" />
        : <CircleAlert className="size-4 shrink-0 text-warn-fg" />}
      <span className="min-w-0 flex-1 truncate text-[13px] text-ink">
        <span className="font-semibold">{f.rol}</span>
        <span className="text-ink-muted"> · {f.nombre}</span>
      </span>
      <span className={cn('shrink-0 text-[12px] font-medium', ok ? 'text-dash-ok-fg' : 'text-warn-fg')}>
        {ok ? \`Signed \${f.fecha}\` : 'Signature pending'}
      </span>
    </div>
  )
}

function PanelHistorial({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30" onClick={onClose}>
      <aside
        role="dialog"
        aria-label="Consent history"
        onClick={(e) => e.stopPropagation()}
        className="motion-safe:animate-[panel-in_180ms_ease-out] flex h-full w-full max-w-[380px] flex-col bg-white"
      >
        <div className="flex items-start justify-between gap-3 p-5">
          <span className="min-w-0">
            <h2 className="text-[18px] font-bold text-ink">Consent history</h2>
            <p className="mt-0.5 truncate text-[12px] text-ink-muted">{CONSENTIMIENTO.titulo}</p>
          </span>
          <button onClick={onClose} aria-label="Close" className="shrink-0 text-ink hover:opacity-60">
            <X className="size-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5">
          <ol className="flex flex-col">
            {CONSENTIMIENTO.historial.map((h, i, todos) => (
              <li key={h.id} className="flex gap-3">
                <span className="flex flex-col items-center">
                  <span className={cn('mt-1 size-2 shrink-0 rounded-full', i === 0 ? 'bg-dash-blue' : 'bg-line-strong')} />
                  {i < todos.length - 1 && <span className="w-px flex-1 bg-line" />}
                </span>
                <span className="min-w-0 flex-1 pb-5">
                  <span className="block text-[13px] font-semibold text-ink">{h.evento}</span>
                  <span className="block text-[12px] text-ink-muted">
                    {h.version} · {h.fecha} · {h.autor}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </aside>
    </div>
  )
}

export function ConsentBlock() {
  const [firmas, setFirmas] = useState(CONSENTIMIENTO.firmas)
  const [historial, setHistorial] = useState(false)
  const [menu, setMenu] = useState(false)

  const pendientes = firmas.filter((f) => f.estado === 'Pending')
  const estado = pendientes.length === 0 ? 'Signed' : CONSENTIMIENTO.estado
  const t = TONO[estado]

  const firmar = (rol: Firma['rol']) => {
    setFirmas((fs) =>
      fs.map((f) => (f.rol === rol ? { ...f, estado: 'Signed' as const, fecha: '05/14/2026' } : f)),
    )
    aviso.ok(\`\${CONSENTIMIENTO.titulo} signed as \${rol.toLowerCase()}.\`)
  }

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-line bg-white"
      style={{ borderLeftWidth: 3, borderLeftColor: t.bar }}
    >
      <div className="flex flex-wrap items-start gap-3 p-4">
        <span className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg', t.tile)}>
          <Bookmark className="size-4" />
        </span>

        <span className="min-w-[200px] flex-1">
          <span className="block text-[15px] font-bold text-ink">{CONSENTIMIENTO.titulo}</span>
          <span className="block text-[12px] text-ink-muted">
            {pendientes.length === 0
              ? 'All signatures collected'
              : \`\${pendientes.length} of \${firmas.length} signatures pending\`}
          </span>
        </span>

        <span className={cn('shrink-0 rounded-full border px-2 py-[2px] text-[11px] font-semibold', t.pill)}>
          {estado}
        </span>

        {/* El historial es secundario: sólo el ícono, con su título. */}
        <button
          onClick={() => setHistorial(true)}
          title="Consent history"
          aria-label="Consent history"
          className={\`\${ICONO_SUELTO} size-9\`}
        >
          <History className="size-4" />
        </button>

        <div className="relative shrink-0">
          <button
            onClick={() => setMenu((v) => !v)}
            aria-label="Consent actions"
            aria-expanded={menu}
            className={\`\${ICONO_SUELTO} size-9\`}
          >
            <MoreVertical className="size-4" />
          </button>
          {menu && (
            <div className="absolute top-full right-0 z-30 mt-1 w-[200px] rounded-lg border border-line bg-white p-1 shadow-[0_12px_32px_rgb(0_0_0/0.18)]">
              {/* Sin fila de botones al pie, las acciones —incluida la firma
                  pendiente— viven acá. */}
              {pendientes.map((f) => (
                <button
                  key={f.rol}
                  onClick={() => { setMenu(false); firmar(f.rol) }}
                  className="text-dash-blue block w-full rounded px-3 py-2 text-left text-[13px] font-semibold hover:bg-surface-muted"
                >
                  Sign as {f.rol.toLowerCase()}
                </button>
              ))}
              {['Open document', 'Send to patient again', 'Replace document', 'Download PDF'].map((o) => (
                <button
                  key={o}
                  onClick={() => { setMenu(false); aviso.info(\`\${o} is not available in this release.\`) }}
                  className="block w-full rounded px-3 py-2 text-left text-[13px] hover:bg-surface-muted"
                >
                  {o}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quién firmó y qué falta, sin abrir nada. */}
      <div className="flex flex-col gap-2 border-t border-line-soft px-4 py-3">
        {firmas.map((f) => <FilaFirma key={f.rol} f={f} />)}
      </div>

      {historial && <PanelHistorial onClose={() => setHistorial(false)} />}
    </div>
  )
}
`})))()}var p;function m(){return(m=e((()=>{p=`import { useState } from 'react'
import { Plus, FilePlus, Table2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { ModalShell, SelectField, TextArea, FormFooter } from '@/components/patients/form'
import { OdontogramEmbed } from '@/components/clinical/OdontogramEmbed'
import { ExamPanelHeader } from './dental/ExamPanelHeader'
import { ReviewList, type ExamReview } from './dental/ReviewList'
import { ReviewExamDialog } from './dental/ReviewExamDialog'
import { FindingCard } from './dental/FindingCard'
import { FindingActionsMenu } from './dental/FindingActionsMenu'
import { NewProcedureModal, type ProcedureDraft } from './dental/NewProcedureModal'
import { EditProcedureModal } from './dental/EditProcedureModal'
import { ConfirmProcedureDialog } from './dental/ConfirmProcedureDialog'
import { useExamReviews } from './dental/useExamReviews'
import { ACTIONS, type FindingAction } from './dental/actions'
import { STATUS_STYLE, neighbours, quadrantTeeth, type Finding } from './dental/data'

/* DentAssmt — Figma (proyecto hermano, misma spec). Reusa nuestro
   \`Odontogram\` real en vez del PNG con hotspots del original: ya existe,
   opera de verdad y es lo que pide \`ClinicalMode.tsx\` desde el principio
   ("no una foto"). Acá el click en un diente abre su detalle en vez de
   pintar superficies -eso pasa dentro de "New Procedure"-. Ver
   design-reference/figma/modulos/clinical-mode.md. */

const HOY = 'May 14, 2026'

/* Mismo estilo que los botones de ClinicalToolbar.tsx: la fila que sigue
   debajo es una continuación de esa botonera, no un elemento nuevo. */
const BOTON_TOOLBAR = 'flex h-9 items-center gap-1.5 rounded-lg border border-line bg-white px-3.5 text-[13px] font-medium whitespace-nowrap shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] hover:bg-surface-subtle'

const INITIAL_FINDINGS: Finding[] = [
  { id: 'F-1', area: 'Tooth 3', condition: 'chronic enamel dental caries', descriptor: 'Deep', date: HOY, status: 'Discarded', tooth: 3, provider: 'Elena Martinez', surfaces: ['O', 'DB'], notes: '', linked: [], diagnoses: [] },
  { id: 'F-2', area: 'Soft Palate', condition: 'oral candidiasis', descriptor: 'Red', date: HOY, status: 'Discarded', tooth: null, provider: 'Elena Martinez', surfaces: [], notes: '', linked: [], diagnoses: [] },
  { id: 'F-3', area: 'Tooth 20', condition: 'localized periodontal pocketing', descriptor: 'Moderate', date: HOY, status: 'Active', tooth: 20, provider: 'Elena Martinez', surfaces: ['B', 'MB'], notes: '', linked: ['#10987231', '#10987232'], diagnoses: [] },
  { id: 'F-4', area: 'Tooth 30', condition: 'severe root surface decay', descriptor: 'Advanced', date: HOY, status: 'In Treatment', tooth: 30, provider: 'Emily Chen', surfaces: ['O'], notes: '', linked: ['#10987233'], diagnoses: [] },
  { id: 'F-5', area: 'Soft Palate', condition: 'oral candidiasis', descriptor: 'Red', date: HOY, status: 'Active', tooth: null, provider: 'Sarah Stone', surfaces: [], notes: '', linked: [], diagnoses: [] },
]

const DOCUMENT_TYPES = ['Clinical note', 'Consent form', 'Lab prescription', 'Referral letter']

const INITIAL_REVIEWS: ExamReview[] = [
  { id: 'R-1', date: 'January 12, 2026', provider: 'Daniel Anderson', note: 'Charting checked against the radiographs. Caries on tooth 3 confirmed, the rest of the arch is unremarkable. Cleared for treatment planning.' },
]



function NewDocumentDialog({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: (type: string) => void }) {
  const [type, setType] = useState(DOCUMENT_TYPES[0])
  const [note, setNote] = useState('')
  if (!open) return null
  return (
    <ModalShell title="New document" onClose={onClose} width="max-w-[380px]" footer={<FormFooter onCancel={onClose} onSave={() => { onSave(type); onClose() }} />}>
      <div className="flex flex-col gap-4">
        <SelectField label="Type" required value={type} onChange={setType} options={DOCUMENT_TYPES} />
        <TextArea label="Notes" value={note} onChange={setNote} placeholder="What should this document say?" />
      </div>
    </ModalShell>
  )
}

export function DentalAssessmentExam() {
  const [findings, setFindings] = useState<Finding[]>(INITIAL_FINDINGS)
  /* El chart sólo aparece una vez elegida la dentición. */
  const [procedureFor, setProcedureFor] = useState<number | null>(null)
  const [procedureOpen, setProcedureOpen] = useState(false)
  const [editing, setEditing] = useState<Finding | null>(null)
  const [confirming, setConfirming] = useState<{ action: Exclude<FindingAction, 'edit'>; finding: Finding } | null>(null)
  const [documentOpen, setDocumentOpen] = useState(false)
  const [view, setView] = useState<'chart' | 'table'>('chart')
  /* Los controles del odontograma salen en un flotante, no en columna. */
  const [controlesAbiertos, setControlesAbiertos] = useState(false)
  const reviewState = useExamReviews(INITIAL_REVIEWS, HOY)

  /* El "+" abre New Procedure y de una vez deja los controles del diente
     listos: al cerrar el modal (Cancel o Save) el panel ya está ahí,
     sin un botón aparte para "Tooth controls" -se sacó, quedaba
     redundante con esto-. */
  function openProcedure(tooth: number | null) {
    setProcedureFor(tooth)
    setProcedureOpen(true)
    setControlesAbiertos(true)
  }

  function saveProcedure(draft: ProcedureDraft) {
    const tooth = draft.tooth
    setFindings((f) => [
      {
        id: \`F-\${Date.now()}\`,
        area: tooth !== null ? \`Tooth \${tooth}\` : draft.area,
        condition: \`\${draft.procedure.code} - \${draft.procedure.label}\`,
        descriptor: draft.surfaces.join(', ') || draft.scope,
        date: HOY, status: 'Active', tooth, provider: 'Elena Martinez',
        surfaces: draft.surfaces, notes: '', linked: draft.linked, diagnoses: draft.diagnoses,
      },
      ...f,
    ])
    aviso.ok(\`\${draft.procedure.code} charted on \${tooth !== null ? \`tooth \${tooth}\` : draft.area.toLowerCase()}.\`)
  }

  function applyConfirm(treatedIds: string[]) {
    if (!confirming) return
    const { action, finding } = confirming
    const status = ACTIONS[action].status

    if (!status) {
      const indice = findings.findIndex((f) => f.id === finding.id)
      setFindings((all) => all.filter((f) => f.id !== finding.id))
      aviso.warn(\`\${finding.condition} deleted from the exam.\`, {
        label: 'Undo',
        onClick: () => setFindings((all) => [...all.slice(0, indice), finding, ...all.slice(indice)]),
      })
      setConfirming(null)
      return
    }

    setFindings((all) => all.map((f) => {
      if (f.id === finding.id) return { ...f, status }
      if (treatedIds.includes(f.id)) return { ...f, status: 'Treated' as const }
      return f
    }))
    aviso.ok(\`\${finding.condition} marked as \${status.toLowerCase()}.\`)
    setConfirming(null)
  }

  const linkedConditions = confirming
    ? findings.filter((f) => f.id !== confirming.finding.id && f.area === confirming.finding.area)
    : []


  return (
    <div className="flex w-full flex-col gap-4">
      {/* Antes eran 3 botones circulares flotando sobre el gráfico -tapaban
          el chart al abrirse el panel de controles-. Julián pidió sacarlos
          de ahí y ponerlos con nombre completo debajo de la botonera larga
          (ClinicalToolbar, en ClinicalMode.tsx): misma función, nueva
          posición. */}
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => openProcedure(null)} className={BOTON_TOOLBAR}>
          <Plus className="size-4" /> Add Procedure
        </button>
        <button type="button" onClick={() => setDocumentOpen(true)} className={BOTON_TOOLBAR}>
          <FilePlus className="size-4" /> Add Document
        </button>
        <button
          type="button"
          aria-pressed={view === 'table'}
          onClick={() => setView((v) => (v === 'table' ? 'chart' : 'table'))}
          className={cn(BOTON_TOOLBAR, view === 'table' && 'border-dash-blue bg-dash-count-bg text-dash-blue-hover')}
        >
          <Table2 className="size-4" /> {view === 'table' ? 'View Chart' : 'View Problem List'}
        </button>
      </div>

      <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-start">
      <div className="order-2 flex w-full shrink-0 flex-col gap-3 rounded-xl border border-line bg-white p-3 lg:order-1 lg:w-[300px]">
        <ExamPanelHeader tab={reviewState.tab} onTabChange={reviewState.setTab} onNewReview={reviewState.openDialog} />
        <div className="flex w-full flex-col gap-3 lg:max-h-[70vh] lg:overflow-y-auto">
          {reviewState.tab === 'Findings' ? (
            findings.map((f) => (
              <FindingCard
                key={f.id} finding={f}
                action={<FindingActionsMenu finding={f} onEdit={() => setEditing(f)} onAction={(action) => setConfirming({ action, finding: f })} />}
              />
            ))
          ) : (
            <ReviewList reviews={reviewState.reviews} />
          )}
        </div>
      </div>

      <div className="relative order-1 flex min-w-0 flex-1 flex-col items-center gap-3 overflow-x-auto rounded-xl border border-line p-4 lg:order-2" data-examen style={{ background: 'radial-gradient(#e4e4e7 1px, transparent 1px) 0 0 / 16px 16px, #fafbfe' }}>
        {view === 'table' ? (
          <div className="w-full overflow-x-auto rounded-lg border border-line bg-white">
            <div className="min-w-[720px]">
              <div className="flex h-12 items-center gap-3 border-b border-line-row bg-surface-alt px-4 text-xs font-semibold text-ink-muted">
                <span className="w-[90px] shrink-0">Date</span>
                <span className="w-[110px] shrink-0">Area</span>
                <span className="w-[90px] shrink-0">Surface</span>
                <span className="min-w-[180px] flex-1">Condition</span>
                <span className="w-[110px] shrink-0">Provider</span>
                <span className="w-[110px] shrink-0 text-center">Status</span>
              </div>
              {findings.map((f) => {
                const style = STATUS_STYLE[f.status]
                return (
                  <div key={f.id} className="flex items-center gap-3 border-b border-line-row px-4 py-3 text-[13px] text-ink-soft last:border-0">
                    <span className="w-[90px] shrink-0">{f.date}</span>
                    <span className="w-[110px] shrink-0 truncate">{f.area}</span>
                    <span className="w-[90px] shrink-0">{f.surfaces.join(', ') || '—'}</span>
                    <span className="text-dash-blue min-w-[180px] flex-1 truncate font-semibold">{f.condition}</span>
                    <span className="w-[110px] shrink-0 truncate">{f.provider}</span>
                    <span className="w-[110px] shrink-0 text-center">
                      <span className={\`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold \${style.badge}\`}>{f.status}</span>
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <OdontogramEmbed controlesAbiertos={controlesAbiertos} onCerrarControles={() => setControlesAbiertos(false)} />
        )}
      </div>
      </div>

      <NewProcedureModal
        open={procedureOpen}
        area={procedureFor !== null ? \`Tooth \${procedureFor}\` : 'Upper left'}
        teeth={procedureFor !== null ? neighbours(procedureFor) : quadrantTeeth(9)}
        onClose={() => setProcedureOpen(false)}
        onSave={saveProcedure}
      />

      <EditProcedureModal
        finding={editing}
        onClose={() => setEditing(null)}
        onSave={(patch) => setFindings((all) => all.map((f) => (f.id === editing?.id ? { ...f, ...patch } : f)))}
      />

      <ConfirmProcedureDialog
        action={confirming?.action ?? null}
        finding={confirming?.finding ?? null}
        linkedConditions={linkedConditions}
        onCancel={() => setConfirming(null)}
        onConfirm={applyConfirm}
      />

      <NewDocumentDialog open={documentOpen} onClose={() => setDocumentOpen(false)} onSave={(type) => aviso.ok(\`\${type} added to the patient's documents.\`)} />

      <ReviewExamDialog open={reviewState.dialogOpen} onCancel={reviewState.closeDialog} onConfirm={reviewState.confirm} />
    </div>
  )
}
`})))()}var h;function g(){return(g=e((()=>{h=`import { useMemo, useState } from 'react'
import { Filter, CirclePlus, FileText, MoreVertical, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { EmptyState } from '@/components/ui/empty-state'
import { ICONO_SUELTO } from '@/lib/estilos'
import { ORDENES, type EstadoOrden } from '@/data/clinical-mode'
import { Pill, type PillTone } from '@/components/ui/pill'

const ORDEN_TONO: Record<EstadoOrden, PillTone> = {
  Pending: 'warning', Canceled: 'danger', Rejected: 'danger',
  Delayed: 'warning', Requested: 'purple', Delivered: 'success',
}

/* Figma 4070:148911 "Lab Order — Section (List, Detail & New Laboratory
   Modal)". Acá está el listado, que es donde cae la pestaña. El detalle y el
   modal "New Laboratory" quedan pendientes.

   El pie del frame dice "Showing 9 active prescriptions" y el botón "New
   Prescription" en una pantalla de órdenes de laboratorio: es texto de la
   pantalla de Prescription que quedó pegado. Se replica tal cual. */

const COLUMNAS = ['Provider', 'Patient', 'Status', 'Updated', 'Created', 'Expiration Date', 'Actions']

function iniciales(nombre: string) {
  return nombre.replace(/^Dr\\.\\s*/, '').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
}

export function LabOrderPanel() {
  const [q, setQ] = useState('')

  const filas = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return ORDENES
    return ORDENES.filter((o) => \`\${o.proveedor} \${o.paciente} \${o.estado}\`.toLowerCase().includes(t))
  }, [q])

  return (
    <div className="rounded-xl border border-line bg-white">
      <div className="flex flex-wrap items-center justify-end gap-2 p-3">
        <div className="relative mr-auto w-full sm:w-[240px]">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search..."
            className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
          />
        </div>
        <button
          onClick={() => aviso.info('Filters are not available in this release.')}
          className="flex h-9 shrink-0 items-center gap-1.5 rounded-md border border-line px-3 text-[13px] font-medium hover:bg-surface-subtle"
        >
          <Filter className="size-3.5" /> Filter
        </button>
        <button
          onClick={() => aviso.info('New Prescription is not available in this release.')}
          className="text-dash-blue flex h-9 shrink-0 items-center gap-1.5 px-2 text-[13px] font-semibold hover:underline"
        >
          <CirclePlus className="size-4" /> New Prescription
        </button>
      </div>

      {filas.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No lab orders found"
          detail={\`Nothing matches "\${q}". Try another provider, patient or status.\`}
          className="py-10"
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] border-collapse">
            <thead>
              <tr className="border-y border-line-soft bg-surface-alt">
                {COLUMNAS.map((c) => (
                  <th key={c} className="h-10 px-3 text-left text-[11px] font-semibold whitespace-nowrap text-ink-muted">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filas.map((o) => (
                <tr key={o.id} className="border-b border-line-soft last:border-0">
                  <td className="h-14 px-3">
                    <span className="flex items-center gap-2 whitespace-nowrap">
                      <span className="bg-dash-count-bg text-dash-blue-hover flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold">
                        {iniciales(o.proveedor)}
                      </span>
                      <span className="text-[13px] text-ink">{o.proveedor}</span>
                    </span>
                  </td>
                  <td className="px-3">
                    <span className="flex items-center gap-2 whitespace-nowrap">
                      <span className="bg-dash-count-bg text-dash-blue-hover flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold">
                        {iniciales(o.paciente)}
                      </span>
                      <span className="text-[13px] text-ink">{o.paciente}</span>
                    </span>
                  </td>
                  <td className="px-3"><Pill tone={ORDEN_TONO[o.estado]}>{o.estado}</Pill></td>
                  <td className="px-3 text-[13px] whitespace-nowrap text-ink-soft">{o.actualizado}</td>
                  <td className="px-3 text-[13px] whitespace-nowrap text-ink-soft">{o.creado}</td>
                  {/* El frame pinta de rojo las que vencen pronto. */}
                  <td className={cn('px-3 text-[13px] whitespace-nowrap', o.urgente ? 'font-semibold text-dash-bad-fg' : 'text-ink-soft')}>
                    {o.vence}
                  </td>
                  <td className="px-3">
                    <span className="flex items-center gap-1">
                      <button
                        onClick={() => aviso.info('The lab order detail is not available in this release.')}
                        aria-label={\`Open order for \${o.paciente}\`}
                        className={ICONO_SUELTO}
                      >
                        <FileText className="size-4" />
                      </button>
                      <button
                        onClick={() => aviso.info('Actions are not available in this release.')}
                        aria-label={\`Actions for \${o.paciente}\`}
                        className={ICONO_SUELTO}
                      >
                        <MoreVertical className="size-4" />
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line-soft p-3">
        <span className="text-[12px] text-ink-muted">Showing {filas.length} active prescriptions</span>
        <button
          onClick={() => aviso.info('History is not available in this release.')}
          className="text-dash-blue flex items-center gap-0.5 text-[12px] font-medium hover:underline"
        >
          View History ›
        </button>
      </div>
    </div>
  )
}
`})))()}var _;function v(){return(v=e((()=>{_=`import { cn } from '@/lib/utils'
import {
  MAXILLARY, MANDIBULAR, TOOTH_ICONS,
  type OralExam, type Tooth,
} from '@/data/odontogram'
import { ToothGlyph, OcclusalView } from '@/components/clinical/dental/ToothGlyph'
import type { Finding } from '@/components/clinical/dental/data'

/* Odontograma: dos vistas por pieza -la anatómica y la oclusal-, como el
   odontograma de referencia que pasó Julián, pero dibujado con nuestros
   propios tonos. Ver design-reference/figma/modulos/clinical-mode.md. */

/* Un problema todavía sin resolver, no uno cerrado (Treated/Discarded/...). */
const PROBLEMA_ABIERTO: Finding['status'][] = ['Active', 'Monitoring', 'In Treatment']

function ToothCell({
  tooth, selected, onToggle, onSurface, problema, finding, flip,
}: {
  tooth: Tooth
  selected: boolean
  onToggle: () => void
  onSurface: (index: number) => void
  problema: boolean
  finding: boolean
  /* En la arcada inferior la corona va arriba y la banda lingual también. */
  flip: boolean
}) {
  const missing = tooth.element === 'missing'
  const tinte = problema ? '#fde3e3' : finding ? '#e4ecfa' : '#f1f1f4'

  const icons = (
    <div className="flex h-3 items-center justify-center gap-0.5">
      {tooth.icons.map((k) => {
        const icon = TOOTH_ICONS[k]
        return icon ? (
          <span key={k} title={icon.label} style={{ color: icon.color }} className="text-[8px] leading-none">
            {icon.glyph}
          </span>
        ) : null
      })}
    </div>
  )

  const label = (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'w-full rounded text-[11px] tabular-nums',
        selected
          ? 'bg-primary text-primary-foreground font-medium'
          : problema
            ? 'font-bold text-field-error'
            : finding
              ? 'text-dash-blue font-bold'
              : 'text-muted-foreground hover:bg-muted font-medium',
      )}
    >
      {tooth.number}
    </button>
  )

  /* La pieza entera abre su detalle; las superficies tienen su propio
     click adentro del SVG. */
  const anatomia = (
    <button type="button" onClick={onToggle} aria-label={\`Tooth \${tooth.number}\`} className="flex flex-col items-center">
      <ToothGlyph numero={tooth.number} tinte={tinte} ausente={missing} flip={flip} />
      {icons}
    </button>
  )

  const oclusal = (
    <OcclusalView
      numero={tooth.number}
      surfaces={tooth.surfaces}
      ausente={missing}
      seleccionado={selected}
      flip={flip}
      onSurface={onSurface}
    />
  )

  return (
    <div className="flex w-11 shrink-0 flex-col items-center gap-1">
      {flip ? <>{oclusal}{anatomia}{label}</> : <>{label}{anatomia}{oclusal}</>}
    </div>
  )
}

function Arch({
  exam, numbers, flip, selected, onToggle, onSurface, findings, left, center, right,
}: {
  exam: OralExam
  numbers: number[]
  flip: boolean
  selected: number[]
  onToggle: (n: number) => void
  onSurface: (n: number, i: number) => void
  findings: Finding[]
  left: string
  center: string
  right: string
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-9 shrink-0 rounded-md border bg-background px-1 py-1 text-center text-[13px] font-medium">
        {left}
      </span>
      <div className="flex flex-1 justify-center gap-0.5">
        {numbers.map((n, i) => {
          const delDiente = findings.filter((f) => f.tooth === n)
          return (
            <div key={n} className={cn(i === 8 && 'ml-4')}>
              <ToothCell
                tooth={exam.teeth[n - 1]}
                flip={flip}
                selected={selected.includes(n)}
                onToggle={() => onToggle(n)}
                onSurface={(idx) => onSurface(n, idx)}
                problema={delDiente.some((f) => PROBLEMA_ABIERTO.includes(f.status))}
                finding={delDiente.length > 0}
              />
            </div>
          )
        })}
      </div>
      <span className="w-9 shrink-0 rounded-md border bg-background px-1 py-1 text-center text-[13px] font-medium">
        {right}
      </span>
      <span className="sr-only">{center}</span>
    </div>
  )
}

export function Odontogram({
  exam, selected, onToggle, onSurface, findings = [],
}: {
  exam: OralExam
  selected: number[]
  onToggle: (n: number) => void
  onSurface: (n: number, i: number) => void
  /** Para el número en negrita/color: rojo si hay un problema sin resolver
      en esa pieza, azul si tiene algún finding cerrado. Opcional: las
      vistas sin panel de findings lo dejan afuera y el número queda gris. */
  findings?: Finding[]
}) {
  return (
    <div className="flex w-fit flex-col gap-3">
      <p className="text-center text-sm font-medium">Maxillary</p>
      <Arch
        exam={exam} numbers={MAXILLARY} flip={false} findings={findings}
        selected={selected} onToggle={onToggle} onSurface={onSurface}
        left="UR" center="Maxillary" right="UL"
      />
      <Arch
        exam={exam} numbers={MANDIBULAR} flip findings={findings}
        selected={selected} onToggle={onToggle} onSurface={onSurface}
        left="LR" center="Mandibular" right="LL"
      />
      <p className="text-center text-sm font-medium">Mandibular</p>
    </div>
  )
}
`})))()}var y;function b(){return(b=e((()=>{y=`import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, TriangleAlert, X } from 'lucide-react'
import { ModalShell } from '@/components/patients/form'
import { OdontogramShell, clearSelection, type OdontogramThemeConfig } from 'react-advanced-odontogram'
import { cn } from '@/lib/utils'
import { OdontogramPanel } from '@/components/clinical/dental/OdontogramPanel'
import { ToothInfoTrigger } from '@/components/clinical/dental/ToothInfoTrigger'
import { ToothInfoPanel } from '@/components/clinical/dental/ToothInfoPanel'
import { CarasLinguales } from '@/components/clinical/dental/CarasLinguales'
import { PeriodontalTabs } from '@/components/clinical/dental/PeriodontalTabs'
import { PerioPdArrastre } from '@/components/clinical/dental/PerioPdArrastre'
import '@/styles/odontogram-scoped.css'
import '@/styles/odontogram-theme.css'

/* El odontograma de react-advanced-odontogram (MIT, (c) Zoltán Dul —
   github.com/ZoliQua/React-Odontogram-Modul), que es el que pidió Julián,
   embebido con la paleta de este sistema.

   Dos cosas que hay que saber:
   - Su CSS es el de una app entera (trae \`*\`, \`body\`, \`.btn\`, \`.card\`), así
     que no se importa el del paquete sino la copia acotada a \`.odonto-embed\`
     que genera \`scripts/scope-odontogram-css.mjs\`.
   - La librería resuelve sus controles con \`document.getElementById\`, así
     que no puede haber dos instancias montadas a la vez.

   Ver design-reference/figma/modulos/clinical-mode.md. */

const COLORES = {
  background: '#ffffff',
  panel: '#ffffff',
  card: '#ffffff',
  text: '#09090b',
  muted: '#71717a',
  line: '#e4e4e7',
  accent: '#1d56bc',
  accent2: '#1a804d',
}

const TEMA: OdontogramThemeConfig = { colors: COLORES }

/* \`themeConfig\` sólo alcanza al nodo interno de la librería, pero el CSS
   acotado define \`--text: var(--odon-text, ...)\` en \`.odonto-embed\` -este
   wrapper-, que está más arriba: las variables no llegaban y quedaban los
   colores de fábrica. Se declaran también acá, que es donde se leen. */
const VARIABLES = {
  '--odon-bg': COLORES.background,
  '--odon-panel': COLORES.panel,
  '--odon-card': COLORES.card,
  '--odon-text': COLORES.text,
  '--odon-muted': COLORES.muted,
  '--odon-line': COLORES.line,
  '--odon-accent': COLORES.accent,
  '--odon-accent2': COLORES.accent2,
} as React.CSSProperties

type Paso = { titulo: string; nodo: HTMLElement }

/* El \`.card-title\` trae adentro los botones de la card (el "−" de plegar,
   el "Reset" de Tooth details): sin sacarlos el paso se llama
   "Statuses−" o "Tooth detailsReset". */
function tituloDe(nodo: HTMLElement, porDefecto: string) {
  const cabecera = nodo.querySelector('.card-title')
  if (!cabecera) return porDefecto
  const texto = [...cabecera.childNodes]
    .filter((n) => !(n instanceof HTMLElement && n.tagName === 'BUTTON'))
    .map((n) => n.textContent ?? '')
    .join('')
    .trim()
  return texto || porDefecto
}

/* Mete el panel de "Tooth information" arriba de los tabs Maxillary/
   Mandibular (\`ancla\`, \`.perio-tabs-cabecera\`) en vez de flotarlo o
   ponerlo al costado: así queda a la vista de una, entre la barra de
   "Periodontal Status" y la grilla, sin superponerse a nada. Mismo
   patrón que \`ToothInfoTrigger\` -mover el nodo real con
   \`useLayoutEffect\`, devolverlo antes de que React lo desmonte- porque
   \`.perio-tabs-cabecera\` es de \`PeriodontalTabs.tsx\`, que la rearma con
   cada cambio de vista. */
function PanelArribaDeTabs({ ancla, children }: { ancla: HTMLElement; children: React.ReactNode }) {
  const envoltorio = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = envoltorio.current
    const padre = ancla.parentElement
    if (!el || !padre) return
    const origen = el.parentElement
    padre.insertBefore(el, ancla)
    return () => {
      if (origen && el.parentElement !== origen) origen.appendChild(el)
    }
  }, [ancla])

  return <div ref={envoltorio}>{children}</div>
}

export function OdontogramEmbed({
  controlesAbiertos, onCerrarControles,
}: {
  /** Controls, Statuses, Tooth details, Orthodontics, Caries y Diagnoses
      viven en un panel flotante que abre el FAB del examen, y se recorren
      de a uno: así el gráfico queda entero a la vista y el panel no empuja
      nada. "Tooth information" va aparte, en \`ToothInfoTrigger\`. */
  controlesAbiertos: boolean
  onCerrarControles: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pasos, setPasos] = useState<Paso[]>([])
  const [infoNodo, setInfoNodo] = useState<HTMLElement | null>(null)
  const [barraNodo, setBarraNodo] = useState<HTMLElement | null>(null)
  const [perioNodo, setPerioNodo] = useState<HTMLElement | null>(null)
  const [tabsPerioNodo, setTabsPerioNodo] = useState<HTMLElement | null>(null)
  const [infoAbierto, setInfoAbierto] = useState(false)
  const [paso, setPaso] = useState(0)
  /* Minimizado deja sólo la barra: el gráfico se ve entero sin cerrar nada. */
  const [minimizado, setMinimizado] = useState(false)
  const [confirmandoCierre, setConfirmandoCierre] = useState(false)
  const [reinicio, setReinicio] = useState(0)
  /* Pasos en los que se cambió algo: el resto queda como pendiente. */
  const [tocados, setTocados] = useState<string[]>([])

  /* La cruz descarta: vuelve el odontograma al default. Para guardar lo
     hecho y sacar los controles de en medio está el minimizar. Se apoya en
     el "Reset mouth" de la librería, que es quien sabe cuál es el default,
     y en su \`clearSelection()\`, porque si no las piezas quedan elegidas. */
  const descartarYCerrar = () => {
    ref.current?.querySelector<HTMLButtonElement>('#btnResetAll')?.click()
    clearSelection()
    setPaso(0)
    setTocados([])
    /* Remonta el panel: así se olvida qué botón estaba marcado. */
    setReinicio((n) => n + 1)
    onCerrarControles()
  }

  /* Las secciones son las cards que dibuja la librería. "Tooth information"
     ya no es una más: se lee aparte (\`infoNodo\`) para el ícono propio
     (\`ToothInfoTrigger\`), que se porta adentro de \`.perio-launch-bar\` -la
     barra donde viven los tabs Odontogram/Periodontal Status-, en el lugar
     que dejó libre el botón "Diagnoses" (se saca por CSS, ver
     odontogram-theme.css). \`perioNodo\` (\`.perio-summary-card\`, con el
     Avg PD/CAL/BOP%/etc. de lo cargado en Periodontal Status) se agrega
     al mismo panel: es lo que Julián pidió mostrar ahí. Se releen porque
     la librería monta y desmonta cards según la pieza activa -Orthodontics,
     por ejemplo, sólo aparece en piezas elegibles- y porque esa barra (y
     el summary) se vuelven a armar al cambiar de vista. */
  const releer = useCallback(() => {
    const raiz = ref.current
    if (!raiz) return
    const cabecera = raiz.querySelector<HTMLElement>('.panel-header')
    const cards = [...raiz.querySelectorAll<HTMLElement>('.panel-body > .card, .panel-body > div > .card')]
    /* La cabecera -selección de piezas- es un paso más: dejarla siempre
       visible hacía el flotante el doble de alto. */
    const lista: Paso[] = cabecera ? [{ titulo: 'Controls', nodo: cabecera }] : []
    cards.forEach((nodo) => lista.push({ titulo: tituloDe(nodo, 'Details'), nodo }))
    setPasos((previos) =>
      previos.length === lista.length && previos.every((p, i) => p.nodo === lista[i].nodo) ? previos : lista,
    )
    const info = raiz.querySelector<HTMLElement>('.tooth-info')
    setInfoNodo((previo) => (previo === info ? previo : info))
    const barra = raiz.querySelector<HTMLElement>('.perio-launch-bar')
    setBarraNodo((previo) => (previo === barra ? previo : barra))
    /* Sólo existe mientras se ve Periodontal Status -la librería la saca
       del DOM por completo al volver a Odontogram-. */
    const perio = raiz.querySelector<HTMLElement>('.perio-summary-card')
    setPerioNodo((previo) => (previo === perio ? previo : perio))
    /* \`.perio-tabs-cabecera\` (Maxillary/Mandibular) es de \`PeriodontalTabs\`,
       no de la librería: ancla de \`PanelArribaDeTabs\`. */
    const tabs = raiz.querySelector<HTMLElement>('.perio-tabs-cabecera')
    setTabsPerioNodo((previo) => (previo === tabs ? previo : tabs))
  }, [])

  /* Varias filas de la librería quedan sin contenido según la pieza
     activa: siguen ocupando su celda de la grilla y dejaban la card llena
     de huecos. Se miden y se colapsan; primero se limpia la marca para que
     una fila que vuelve a tener contenido reaparezca. */
  const colapsarVacias = useCallback((nodo: HTMLElement) => {
    const hijos = [...nodo.children] as HTMLElement[]
    hijos.forEach((h) => h.classList.remove('odonto-vacio'))
    requestAnimationFrame(() => {
      hijos.forEach((h) => {
        if (h.clientHeight === 0 && getComputedStyle(h).display !== 'none') h.classList.add('odonto-vacio')
      })
    })
  }, [])

  useEffect(() => {
    const raiz = ref.current
    if (!raiz) return
    releer()
    const observer = new MutationObserver(() => {
      releer()
      const visible = [...raiz.querySelectorAll<HTMLElement>('.panel-body > .card, .panel-body > div > .card')]
        .find((c) => c.style.display !== 'none')
      if (visible) colapsarVacias(visible)
    })
    observer.observe(raiz, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [releer, colapsarVacias])

  /* Un solo paso a la vez: es lo que mantiene el panel chico. */
  useEffect(() => {
    pasos.forEach(({ nodo }, i) => {
      /* El activo se deja sin \`display\` inline: si no, el \`block\` pisa el
         \`grid\` con el que la card acomoda sus filas en varias columnas. */
      if (controlesAbiertos && !minimizado && i === paso) {
        nodo.style.removeProperty('display')
        colapsarVacias(nodo)
      } else {
        nodo.style.display = 'none'
      }
    })
  }, [pasos, paso, controlesAbiertos, minimizado, colapsarVacias])

  useEffect(() => {
    if (pasos.length > 0 && paso > pasos.length - 1) setPaso(0)
  }, [pasos, paso])

  const actual = pasos[paso]
  /* Lo que quedó sin tocar; el resumen se muestra al minimizar. */
  const pendientes = pasos.filter((pa) => !tocados.includes(pa.titulo)).map((pa) => pa.titulo)

  /* En Periodontal Status va arriba de los tabs Maxillary/Mandibular
     (\`PanelArribaDeTabs\`, ver más arriba): a la vista de una entre la
     barra de "Periodontal Status" y la grilla, sin taparla ni flotar
     encima. En Odontogram no hay esos tabs -\`tabsPerioNodo\` da \`null\`-,
     así que va inline debajo del "Dental chart", como antes. */
  const panelInfo = infoAbierto && (infoNodo || perioNodo) && (
    <div className="mb-3 w-full rounded-xl border border-line bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[13px] font-semibold text-ink">Tooth information</span>
        <button
          type="button"
          aria-label="Close tooth information"
          onClick={() => setInfoAbierto(false)}
          className="flex size-7 shrink-0 items-center justify-center rounded-md border border-line text-ink-muted hover:bg-surface-muted"
        >
          <X className="size-3.5" />
        </button>
      </div>
      <ToothInfoPanel nodo={infoNodo} perioNodo={perioNodo} />
    </div>
  )

  return (
    <div
      ref={ref}
      className={cn(
        'odonto-embed w-full',
        controlesAbiertos && !minimizado && 'controles-abiertos',
      )}
      style={VARIABLES}
    >
      <OdontogramShell themeConfig={TEMA} language="en" numberingSystem="UNIVERSAL" />
      <CarasLinguales raiz={ref.current} />
      <PeriodontalTabs raiz={ref.current} />
      <PerioPdArrastre raiz={ref.current} />
      {barraNodo && (infoNodo || perioNodo) && (
        <ToothInfoTrigger
          nodo={infoNodo}
          perioNodo={perioNodo}
          contenedor={barraNodo}
          abierto={infoAbierto}
          onToggle={() => setInfoAbierto((v) => !v)}
        />
      )}
      {panelInfo && (tabsPerioNodo
        ? <PanelArribaDeTabs ancla={tabsPerioNodo}>{panelInfo}</PanelArribaDeTabs>
        : panelInfo
      )}

      {confirmandoCierre && (
        <ModalShell
          title="Discard and close?"
          onClose={() => setConfirmandoCierre(false)}
          width="max-w-[440px]"
          footer={
            <>
              <button type="button" onClick={() => setConfirmandoCierre(false)} className="h-9 rounded-md border border-line bg-white px-5 text-[13px] font-medium hover:bg-surface-subtle">
                Cancel
              </button>
              <button
                type="button"
                onClick={() => { setConfirmandoCierre(false); descartarYCerrar() }}
                className="h-9 rounded-md bg-dash-bad-fg px-5 text-[13px] font-medium text-white hover:bg-[#961f1f]"
              >
                Discard and close
              </button>
            </>
          }
        >
          <p className="flex items-start gap-2 text-[13px] leading-relaxed text-ink-soft">
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-dash-bad-fg" />
            <span>
              This returns the whole chart to its default: every surface, condition
              and restoration you set is removed. It cannot be undone.
              <br />
              To put the controls away without losing anything, use the{' '}
              <strong className="font-semibold text-ink">minimize</strong> arrow instead.
            </span>
          </p>
        </ModalShell>
      )}

      {controlesAbiertos && !minimizado && actual && (
        <div className="mt-3 w-full rounded-t-xl border border-b-0 border-line bg-white p-4">
          <OdontogramPanel
            key={reinicio}
            card={actual.nodo}
            onTocar={() => setTocados((t) => (t.includes(actual.titulo) ? t : [...t, actual.titulo]))}
          />
        </div>
      )}

      {controlesAbiertos && pasos.length > 0 && (
        <div className={cn(
          'flex h-10 w-full items-center gap-2 border border-line bg-white px-2',
          minimizado ? 'mt-3 rounded-xl' : 'rounded-b-xl border-t-0',
        )}>
          {/* Los dos chevrones van juntos, como un paginador: separados a los
              extremos de la barra costaba saltar de paso. */}
          <span className="flex shrink-0 items-center">
            <button
              type="button"
              aria-label="Previous section"
              disabled={paso === 0}
              onClick={() => setPaso((p) => Math.max(0, p - 1))}
              className="flex size-7 shrink-0 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next section"
              disabled={paso === pasos.length - 1}
              onClick={() => setPaso((p) => Math.min(pasos.length - 1, p + 1))}
              className="flex size-7 shrink-0 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronRight className="size-4" />
            </button>
          </span>

          <span className="min-w-0 flex-1 text-center">
            <span className="block truncate text-[12px] font-semibold text-ink" title={minimizado ? tocados.join(' · ') : undefined}>
              {minimizado
                ? (tocados.length > 0 ? \`Set: \${tocados.slice(0, 3).join(' · ')}\${tocados.length > 3 ? \` +\${tocados.length - 3}\` : ''}\` : 'Nothing set yet')
                : actual?.titulo}
            </span>
            <span className="block truncate text-[10px] text-ink-faint" title={minimizado ? pendientes.join(' · ') : undefined}>
              {minimizado
                ? (pendientes.length > 0 ? \`\${pendientes.length} left: \${pendientes.slice(0, 2).join(' · ')}\${pendientes.length > 2 ? '…' : ''}\` : 'All sections visited')
                : \`\${paso + 1} of \${pasos.length}\`}
            </span>
          </span>

          <button
            type="button"
            aria-label={minimizado ? 'Expand controls' : 'Minimize controls'}
            aria-pressed={minimizado}
            onClick={() => setMinimizado((v) => !v)}
            className="flex size-7 shrink-0 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted"
          >
            {minimizado ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>

          <button
            type="button"
            aria-label="Close controls"
            onClick={() => setConfirmandoCierre(true)}
            className="flex size-7 shrink-0 items-center justify-center rounded-md border border-line text-ink-muted hover:bg-surface-muted"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}
`})))()}var x;function S(){return(S=e((()=>{x=`import { useMemo, useState } from 'react'
import { Search, Info, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { EmptyState } from '@/components/ui/empty-state'
import { ICONO_SUELTO } from '@/lib/estilos'
import { PROBLEMAS, type Problema } from '@/data/clinical-mode'
import { Pill, type PillTone } from '@/components/ui/pill'

const POR_PAGINA = 3

const ESTADO_TONO: Record<Problema['estado'], PillTone> = {
  Active: 'success', Resolved: 'neutral', Monitoring: 'warning',
}

/* En el frame los encabezados se parten en dos líneas —"Dat e", "Toot h",
   "Surf ace"— porque las columnas quedaron más angostas que las palabras. Es
   un error de layout, no contenido: acá no se parten. */
const COLUMNAS = ['Date', 'Surface', 'Condition', 'Exam', 'Provider', 'Note', 'Status', 'Actions']

export function ProblemList() {
  const [q, setQ] = useState('')
  const [pagina, setPagina] = useState(1)
  const [nota, setNota] = useState<Problema | null>(null)

  const filtrados = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return PROBLEMAS
    return PROBLEMAS.filter((p) =>
      \`\${p.fecha} \${p.pieza} \${p.superficie} \${p.condicion} \${p.examen} \${p.proveedor}\`.toLowerCase().includes(t),
    )
  }, [q])

  const paginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA))
  const actual = Math.min(pagina, paginas)
  const visibles = filtrados.slice((actual - 1) * POR_PAGINA, actual * POR_PAGINA)

  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[15px] font-bold text-ink">Problem list</p>
        <div className="relative w-full sm:w-[220px]">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setPagina(1) }}
            placeholder="Search..."
            className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
          />
        </div>
      </div>

      {filtrados.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No problems found"
          detail={\`Nothing matches "\${q}". Try another tooth, condition or provider.\`}
          className="py-8"
        />
      ) : (
        <>
          <div className="mt-3 -mx-4 overflow-x-auto px-4">
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr className="border-y border-line-soft bg-surface-alt">
                  {COLUMNAS.map((c) => (
                    <th
                      key={c}
                      className="h-10 px-3 text-left text-[11px] font-semibold whitespace-nowrap text-ink-muted"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibles.map((p) => (
                  <tr key={p.id} className="border-b border-line-soft last:border-0">
                    <td className="h-12 px-3 text-[13px] whitespace-nowrap text-ink">{p.fecha}</td>
                    <td className="px-3 text-[13px] text-ink">{p.superficie}</td>
                    <td className="px-3 text-[13px] whitespace-nowrap text-ink">{p.condicion}</td>
                    <td className="px-3 text-[13px] whitespace-nowrap text-ink-soft">{p.examen}</td>
                    <td className="px-3 text-[13px] whitespace-nowrap text-ink-soft">{p.proveedor}</td>
                    <td className="px-3">
                      <button
                        onClick={() => setNota(nota?.id === p.id ? null : p)}
                        aria-label={\`Note for tooth \${p.pieza}\`}
                        className={cn(
                          'flex size-7 items-center justify-center rounded-full bg-[#f3effe] text-purple-fg transition-colors hover:bg-[#e7ddfd]',
                          nota?.id === p.id && 'ring-2 ring-purple-fg ring-offset-1',
                        )}
                      >
                        <Info className="size-3.5" />
                      </button>
                    </td>
                    <td className="px-3"><Pill tone={ESTADO_TONO[p.estado]}>{p.estado}</Pill></td>
                    <td className="px-3">
                      <button
                        onClick={() => aviso.info('Editing a problem is not available in this release.')}
                        aria-label={\`Actions for tooth \${p.pieza}\`}
                        className={ICONO_SUELTO}
                      >
                        <MoreVertical className="size-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* La nota se lee acá abajo y no en un toast: es texto clínico, no
              un aviso de que algo pasó. */}
          {nota && (
            <div className="mt-3 flex items-start gap-2 rounded-md border-l-[3px] border-l-purple-fg bg-[#faf8ff] px-3 py-2">
              <Info className="mt-px size-3.5 shrink-0 text-purple-fg" />
              <span className="text-[12px] text-ink-medium">
                <span className="font-semibold text-ink">Tooth {nota.pieza} · {nota.condicion} — </span>
                {nota.nota}
              </span>
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-center gap-1">
            <button
              onClick={() => setPagina((n) => Math.max(1, n - 1))}
              disabled={actual === 1}
              className="flex h-8 items-center gap-1 rounded-md px-2 text-[13px] font-medium disabled:opacity-40"
            >
              <ChevronLeft className="size-4" /> Previous
            </button>
            {Array.from({ length: paginas }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPagina(n)}
                aria-current={n === actual ? 'page' : undefined}
                className={cn(
                  'flex size-8 items-center justify-center rounded-md text-[13px] tabular-nums',
                  n === actual ? 'border border-line font-semibold' : 'text-ink-medium hover:bg-surface-muted',
                )}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPagina((n) => Math.min(paginas, n + 1))}
              disabled={actual === paginas}
              className="flex h-8 items-center gap-1 rounded-md px-2 text-[13px] font-medium disabled:opacity-40"
            >
              Next <ChevronRight className="size-4" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
`})))()}var C;function w(){return(w=e((()=>{C=`import { useMemo, useState } from 'react'
import { Plus, Table2, Search, Maximize2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { EmptyState } from '@/components/ui/empty-state'
import { RADIOGRAFIAS, type Radiografia } from '@/data/clinical-mode'
import { RadiographyViewer, Placa } from '@/components/clinical/RadiographyViewer'
import { RadiographyUpload } from '@/components/clinical/RadiographyUpload'
import { BOTON_ICONO_REDONDO } from '@/lib/estilos'

/* Figma 4106:197453 "Radiography - Initial": grilla de cinco columnas de
   placas, cada una con su fecha sobre la imagen y el profesional abajo.

   Las placas son **dibujadas**, no fotos: un degradado que imita una panorámica
   en negativo. No corresponde meter radiografías reales de nadie en una
   réplica, y una foto de stock haría creer que es un estudio del paciente. */

function Card({ r, onAbrir }: { r: Radiografia; onAbrir: () => void }) {
  return (
    <div className="group rounded-xl border border-line bg-white p-2">
      <button
        onClick={onAbrir}
        aria-label={\`Open \${r.tipo} from \${r.fecha}\`}
        className="focus-visible:outline-dash-blue relative block aspect-[16/10] w-full overflow-hidden rounded-lg outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <Placa id={r.id} chica />
        <span className="absolute right-2 bottom-2 rounded bg-black/55 px-1.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
          {r.fecha}
        </span>
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/25 group-hover:opacity-100">
          <Maximize2 className="size-5 text-white" />
        </span>
      </button>
      <div className="mt-2 flex items-center gap-2 px-1 pb-1">
        <span className="bg-dash-count-bg text-dash-blue-hover flex size-6 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold">
          DT
        </span>
        <span className="min-w-0 flex-1 truncate text-[12px] text-ink-medium">{r.profesional}</span>
        <span className="shrink-0 text-[11px] text-ink-faint">{r.tipo}</span>
      </div>
    </div>
  )
}

export function RadiographyPanel() {
  const [q, setQ] = useState('')
  /* Tres pantallas, no tres modales: la grilla, el visor de una placa y la
     carga de archivos. El frame las dibuja como pantallas completas. */
  const [vista, setVista] = useState<'grilla' | 'visor' | 'subir'>('grilla')
  const [abierta, setAbierta] = useState<Radiografia | null>(null)

  const filas = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return RADIOGRAFIAS
    return RADIOGRAFIAS.filter((r) => \`\${r.tipo} \${r.fecha} \${r.profesional}\`.toLowerCase().includes(t))
  }, [q])

  if (vista === 'visor' && abierta) {
    return (
      <RadiographyViewer
        estudios={RADIOGRAFIAS}
        actual={abierta}
        onCambiar={setAbierta}
        onVolver={() => setVista('grilla')}
        onSubir={() => setVista('subir')}
      />
    )
  }

  if (vista === 'subir') {
    return <RadiographyUpload onCancel={() => setVista('grilla')} onSave={() => setVista('grilla')} />
  }

  return (
    <div className="relative xl:pr-14">
      <div className="mb-4 flex justify-end">
        <div className="relative w-full sm:w-[260px]">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search..."
            className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
          />
        </div>
      </div>

      {filas.length === 0 ? (
        <div className="rounded-xl border border-line bg-white">
          <EmptyState
            icon={Search}
            title="No images found"
            detail={\`Nothing matches "\${q}". Try another study type or date.\`}
            className="py-14"
          />
        </div>
      ) : (
        <div className={cn('grid gap-4', 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5')}>
          {filas.map((r) => (
            <Card key={r.id} r={r} onAbrir={() => { setAbierta(r); setVista('visor') }} />
          ))}
        </div>
      )}

      {/* Las dos acciones flotantes del frame, en azul sólido. */}
      <div className="pointer-events-none fixed right-3 bottom-6 z-30 hidden xl:block">
        <div className="pointer-events-auto flex flex-col gap-3">
          {[
            { icono: Plus, label: 'Add image', accion: () => setVista('subir') },
            { icono: Table2, label: 'Table view', accion: () => aviso.info('The table view is not available in this release.') },
          ].map(({ icono: Icono, label, accion }) => (
            <button
              key={label}
              onClick={accion}
              aria-label={label}
              title={label}
              /* Redondos, con el ícono en negro y borde gris: el estado por
                 defecto de un botón del sistema, no un azul permanente. */
              className={BOTON_ICONO_REDONDO}
            >
              <Icono className="size-4" />
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}
`})))()}var T;function E(){return(E=e((()=>{T=`import { useState } from 'react'
import { FileText, Trash2, LoaderCircle } from 'lucide-react'
import { aviso } from '@/components/ui/toaster'

/* Figma 4106:201810: zona de arrastre, carga por URL y la lista de archivos
   subiendo. En el frame los cuatro archivos están congelados en "55% · 37 sec
   left"; acá la barra avanza de verdad, porque un progreso que no se mueve no
   dice nada. */

type Archivo = { id: string; nombre: string; peso: string; progreso: number }

const INICIALES: Archivo[] = Array.from({ length: 4 }, (_, i) => ({
  id: \`f\${i + 1}\`,
  nombre: 'Report name_T1.pdf',
  peso: '23.5MB',
  progreso: 55 - i * 9,
}))

export function RadiographyUpload({ onCancel, onSave }: { onCancel: () => void; onSave: () => void }) {
  const [archivos, setArchivos] = useState<Archivo[]>(INICIALES)
  const [url, setUrl] = useState('')
  const [sobre, setSobre] = useState(false)

  const sumar = (nombre: string) =>
    setArchivos((a) => [...a, { id: \`f\${Date.now()}\`, nombre, peso: '23.5MB', progreso: 0 }])

  return (
    <div className="flex flex-col gap-4">
      <div
        onDragOver={(e) => { e.preventDefault(); setSobre(true) }}
        onDragLeave={() => setSobre(false)}
        onDrop={(e) => {
          e.preventDefault()
          setSobre(false)
          const n = e.dataTransfer.files[0]?.name
          if (n) { sumar(n); aviso.ok(\`\${n} added to the queue.\`) }
        }}
        className={\`flex flex-col items-center gap-3 rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors \${
          sobre ? 'border-dash-blue bg-dash-count-bg' : 'border-line-strong bg-white'
        }\`}
      >
        <FileText className="size-10 text-ink" strokeWidth={1.5} />
        <span>
          <span className="block text-[17px] font-bold text-ink">Drag and drop your files</span>
          {/* "PND" es el typo del frame. */}
          <span className="block text-[13px] text-ink-muted">
            JPEG, PND, PDF, and MP4 formats, up to 50MB
          </span>
        </span>
        <label className="h-9 cursor-pointer rounded-md border border-line bg-white px-4 text-[13px] leading-9 font-medium hover:bg-surface-subtle">
          Select File
          <input
            type="file"
            className="sr-only"
            onChange={(e) => {
              const n = e.target.files?.[0]?.name
              if (n) { sumar(n); aviso.ok(\`\${n} added to the queue.\`) }
            }}
          />
        </label>
      </div>

      <div>
        <span className="block text-xs font-medium text-ink">or upload from URL</span>
        <div className="mt-1.5 flex gap-2">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Add file URL"
            className="focus:border-dash-blue h-10 min-w-0 flex-1 rounded-md border border-line px-3 text-[13px] placeholder:text-ink-faint focus:outline-none"
          />
          <button
            disabled={!url.trim()}
            onClick={() => {
              sumar(url.split('/').pop() || 'file')
              setUrl('')
              aviso.ok('File added to the queue.')
            }}
            className="h-10 shrink-0 rounded-md border border-line px-5 text-[13px] font-medium hover:bg-surface-subtle disabled:opacity-50"
          >
            Upload
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {archivos.map((a) => (
          <div key={a.id} className="flex items-center gap-3 rounded-lg border border-line bg-white p-3">
            <FileText className="size-6 shrink-0 text-ink" strokeWidth={1.5} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-bold text-ink">{a.nombre}</span>
              <span className="flex flex-wrap items-center gap-x-2 text-[12px] text-ink-muted">
                {a.peso} <span className="text-line-strong">|</span> {a.progreso}%
                <span className="bg-dash-blue size-1.5 rounded-full" />
                <span className="text-dash-blue font-medium">37 sec left</span>
                <LoaderCircle className="size-3.5 animate-spin text-dash-ok-fg" />
                Uploading
              </span>
              <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-line-soft">
                <span className="bg-dash-blue block h-full rounded-full transition-all" style={{ width: \`\${a.progreso}%\` }} />
              </span>
            </span>
            <button
              onClick={() => {
                const indice = archivos.findIndex((f) => f.id === a.id)
                setArchivos((x) => x.filter((f) => f.id !== a.id))
                aviso.warn(\`\${a.nombre} was removed from the queue.\`, {
                  label: 'Undo',
                  onClick: () => setArchivos((x) => [...x.slice(0, indice), a, ...x.slice(indice)]),
                })
              }}
              aria-label={\`Remove \${a.nombre}\`}
              className="shrink-0 rounded p-1 text-ink hover:bg-dash-bad-bg hover:text-dash-bad-fg"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>

      {/* En el frame Cancel y Save ocupan media pantalla cada uno; se mantienen
          juntos y al pie, como en el resto del sistema. */}
      <div className="flex flex-nowrap items-center justify-end gap-3">
        <button
          onClick={onCancel}
          className="h-9 shrink-0 rounded-md border border-line px-4 text-[13px] font-medium whitespace-nowrap hover:bg-surface-subtle"
        >
          Cancel
        </button>
        <button
          onClick={() => { aviso.ok(\`\${archivos.length} file\${archivos.length === 1 ? '' : 's'} saved to the exam.\`); onSave() }}
          className="bg-dash-blue hover:bg-dash-blue-hover h-9 shrink-0 rounded-md px-4 text-[13px] font-semibold whitespace-nowrap text-white transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  )
}
`})))()}var D;function O(){return(O=e((()=>{D=`import { useState } from 'react'
import {
  Plus, ZoomIn, ZoomOut, ListFilter, Trash2, Pencil, ChevronDown,
  CirclePlus, X, ChevronLeft,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { PANORAMICA_GRANDE, PANORAMICA_CHICA } from '@/assets/panoramic'
import { BOTON_ICONO_REDONDO } from '@/lib/estilos'
import {
  HALLAZGOS, ZONAS, PROCEDIMIENTOS_CONDICION, type Hallazgo, type Radiografia,
} from '@/data/clinical-mode'

/* Figma 4106:202309 "Radiography — Panoramic Viewer (Default)" y
   4106:202622 (panel New Condition).

   La placa es la del propio Figma, exportada del nodo 4106:202592. Cada
   estudio la muestra con un filtro distinto derivado de su id: es una sola
   imagen de origen, no veinte, y así la grilla no parece un copy-paste. */

export function filtroDe(id: string) {
  const n = [...id].reduce((a, c) => a + c.charCodeAt(0), 0)
  return \`brightness(\${0.86 + (n % 5) * 0.07}) contrast(\${1 + (n % 4) * 0.08}) saturate(0)\`
}

export function Placa({ id, chica }: { id: string; chica?: boolean }) {
  return (
    <img
      src={chica ? PANORAMICA_CHICA : PANORAMICA_GRANDE}
      alt=""
      loading="lazy"
      draggable={false}
      style={{ filter: filtroDe(id) }}
      className="h-full w-full object-cover"
    />
  )
}

/* Design System 432:15211. La card va sobre gris #f9f9f9 con la barra de
   acento a la izquierda, la zona en versalitas y dos acciones —borrar y
   editar— en cajitas blancas. Los rojos y verdes salen muestreados del nodo. */
const PILL: Record<Hallazgo['estado'], string> = {
  Active: 'border-dash-ok-fg bg-dash-ok-bg text-dash-ok-fg',
  Discarded: 'border-dash-bad-fg bg-dash-bad-bg text-dash-bad-fg',
}
const ACENTO: Record<Hallazgo['estado'], string> = {
  Active: '#1e9850',
  Discarded: '#d20319',
}

function FichaHallazgo({ h, onBorrar }: { h: Hallazgo; onBorrar: () => void }) {
  return (
    <div
      /* shrink-0: la lista es flex con alto máximo, y sin esto las cards se
         achicaban hasta recortar Condition y Descriptors. */
      className="shrink-0 overflow-hidden rounded-md border-l-[4px] bg-surface-alt p-3"
      style={{ borderLeftColor: ACENTO[h.estado] }}
    >
      <div className="flex items-center gap-2">
        <span className={cn('shrink-0 rounded-full border px-2 py-[2px] text-[11px] font-semibold', PILL[h.estado])}>
          {h.estado}
        </span>
        <span className="min-w-0 truncate text-[12px] text-ink-muted">{h.fecha}</span>
        <span className="ml-auto flex shrink-0 items-center gap-1">
          <button
            onClick={onBorrar}
            aria-label={\`Delete finding on \${h.zona}\`}
            className="flex size-7 items-center justify-center rounded-md bg-white text-ink transition-colors hover:bg-dash-bad-bg hover:text-dash-bad-fg"
          >
            <Trash2 className="size-3.5" />
          </button>
          <button
            onClick={() => aviso.info('Editing a finding is not available in this release.')}
            aria-label={\`Edit finding on \${h.zona}\`}
            className="flex size-7 items-center justify-center rounded-md bg-white text-ink transition-colors hover:bg-line-soft"
          >
            <Pencil className="size-3.5" />
          </button>
        </span>
      </div>
      <p className="mt-2 text-[13px] font-bold text-ink uppercase">{h.zona}</p>
      <p className="mt-1 text-[13px] text-ink">
        Condition: <span className="text-ink-muted">{h.condicion}</span>
      </p>
      <p className="text-[13px] text-ink">
        Descriptors: <span className="text-ink-muted">{h.descriptores}</span>
      </p>
    </div>
  )
}

/* Panel New Condition: dos pasos, con el catálogo de procedimientos en el
   primero. En el frame entra por la derecha y tapa media pantalla. */
function NewCondition({ onClose }: { onClose: () => void }) {
  const [paso, setPaso] = useState(1)
  const [zona, setZona] = useState<string | null>(ZONAS[0])
  const [elegido, setElegido] = useState(0)
  const [q, setQ] = useState('')

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30" onClick={onClose}>
      <aside
        role="dialog"
        aria-label="New Condition"
        onClick={(e) => e.stopPropagation()}
        className="motion-safe:animate-[panel-in_180ms_ease-out] flex h-full w-full max-w-[420px] flex-col bg-white"
      >
        <div className="flex items-start justify-between gap-3 px-5 pt-5">
          <h2 className="text-[20px] font-bold text-ink">New Condition</h2>
          <button onClick={onClose} aria-label="Close" className="shrink-0 text-ink hover:opacity-60">
            <X className="size-5" />
          </button>
        </div>

        {/* Dos pasos, con la línea de progreso entre los dos números. */}
        <div className="flex items-center gap-3 px-5 pt-5">
          {[1, 2].map((n) => (
            <span key={n} className="flex flex-1 items-center gap-3 last:flex-none">
              <span className="flex flex-col items-center gap-1">
                <span className={cn('text-[11px]', paso >= n ? 'text-dash-blue font-medium' : 'text-ink-faint')}>
                  Step
                </span>
                <span
                  className={cn(
                    'flex size-5 items-center justify-center rounded-full text-[11px] font-semibold',
                    paso >= n ? 'bg-dash-blue text-white' : 'bg-line text-ink-muted',
                  )}
                >
                  {n}
                </span>
              </span>
              {n === 1 && (
                <span className="mt-4 h-px flex-1 bg-line">
                  <span className={cn('block h-px bg-dash-blue transition-all', paso > 1 ? 'w-full' : 'w-0')} />
                </span>
              )}
            </span>
          ))}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          <p className="text-[13px] font-semibold text-ink">Selected area</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {zona ? (
              <span className="bg-dash-count-bg text-dash-blue-hover flex items-center gap-1.5 rounded-md px-2 py-1 text-[12px] font-semibold">
                <button onClick={() => setZona(null)} aria-label={\`Remove \${zona}\`} className="hover:opacity-70">
                  <X className="size-3" />
                </button>
                {zona}
              </span>
            ) : (
              <span className="text-[12px] text-ink-muted">Pick an area on the image.</span>
            )}
          </div>

          <div className="my-4 h-px bg-line-soft" />

          {paso === 1 ? (
            <>
              <span className="block text-xs font-medium text-ink">
                Condition<span className="text-required">*</span>
              </span>
              <div className="mt-1.5 flex gap-2">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Select"
                  className="focus:border-dash-blue h-9 min-w-0 flex-1 rounded-md border border-line px-3 text-[13px] placeholder:text-ink-faint focus:outline-none"
                />
                <button
                  onClick={() => aviso.info('Filters are not available in this release.')}
                  className="flex h-9 shrink-0 items-center gap-1.5 rounded-md border border-line px-3 text-[13px] font-medium hover:bg-surface-subtle"
                >
                  <ListFilter className="size-3.5" /> Filter
                </button>
              </div>

              <button
                onClick={() => aviso.info('The full catalog is not available in this release.')}
                className="text-dash-blue mt-4 flex items-center gap-0.5 text-[13px] font-bold hover:underline"
              >
                All ›
              </button>

              <div className="mt-2 flex flex-col gap-2">
                {PROCEDIMIENTOS_CONDICION
                  .filter((p) => \`\${p.codigo} \${p.nombre}\`.toLowerCase().includes(q.trim().toLowerCase()))
                  .map((p, i) => (
                    <button
                      key={\`\${p.codigo}-\${i}\`}
                      disabled={p.deshabilitado}
                      onClick={() => setElegido(i)}
                      className={cn(
                        'flex items-center gap-2 rounded-lg border p-3 text-left transition-colors',
                        p.deshabilitado
                          ? 'cursor-not-allowed border-line bg-surface-muted text-ink-faint'
                          : elegido === i
                            ? 'border-dash-blue'
                            : 'border-line hover:bg-surface-subtle',
                      )}
                    >
                      <span className="min-w-0 flex-1 text-[13px]">
                        <span className={cn('font-semibold', !p.deshabilitado && elegido === i && 'text-dash-blue')}>
                          {p.codigo}
                        </span>{' '}
                        - {p.nombre}
                      </span>
                    </button>
                  ))}
              </div>
            </>
          ) : (
            <>
              <span className="block text-xs font-medium text-ink">Descriptors</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {['Red', 'White', 'Ulcerated', 'Swollen', 'Painful'].map((d) => (
                  <button
                    key={d}
                    onClick={() => aviso.info(\`\${d} added to the finding.\`)}
                    className="rounded-full border border-line px-3 py-1 text-[12px] font-medium hover:bg-surface-subtle"
                  >
                    {d}
                  </button>
                ))}
              </div>
              <span className="mt-4 block text-xs font-medium text-ink">Note</span>
              <textarea
                rows={4}
                placeholder="Add a note for this finding"
                className="focus:border-dash-blue mt-1.5 w-full resize-none rounded-md border border-line p-3 text-[13px] placeholder:text-ink-faint focus:outline-none"
              />
            </>
          )}
        </div>

        <div className="flex items-center gap-3 border-t border-line-soft p-5">
          <button
            onClick={() => (paso === 1 ? onClose() : setPaso(1))}
            className="h-10 flex-1 rounded-md border border-line text-[13px] font-medium hover:bg-surface-subtle"
          >
            {paso === 1 ? 'Cancel' : 'Back'}
          </button>
          <button
            onClick={() => {
              if (paso === 1) return setPaso(2)
              aviso.ok('Finding added to the exam.')
              onClose()
            }}
            className="bg-dash-blue hover:bg-dash-blue-hover h-10 flex-1 rounded-md text-[13px] font-semibold text-white transition-colors"
          >
            {paso === 1 ? 'Next Step' : 'Save'}
          </button>
        </div>
      </aside>
    </div>
  )
}

export function RadiographyViewer({
  estudios, actual, onCambiar, onVolver, onSubir,
}: {
  estudios: Radiografia[]
  actual: Radiografia
  onCambiar: (r: Radiografia) => void
  onVolver: () => void
  onSubir: () => void
}) {
  const [zoom, setZoom] = useState(1)
  const [condicion, setCondicion] = useState(false)
  const [hallazgos, setHallazgos] = useState(HALLAZGOS)

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="flex flex-col rounded-xl border border-line bg-white lg:w-[330px] lg:shrink-0">
        <div className="flex flex-wrap items-center gap-2 px-4 pt-4">
          <p className="min-w-0 flex-1 text-[17px] font-bold text-ink">Findings</p>
          {/* Los dos botones del componente: el azul apagado para revisar y el
              azul pleno para el alta. */}
          <button
            onClick={() => aviso.info('Review Exam is not available in this release.')}
            className="flex h-8 shrink-0 items-center gap-1 rounded-md bg-[#8eaadd] px-2.5 text-[12px] font-semibold text-white transition-colors hover:bg-[#7b9bd6]"
          >
            <Plus className="size-3.5" /> Review Exam
          </button>
          <button
            onClick={() => setCondicion(true)}
            className="bg-dash-blue hover:bg-dash-blue-hover flex h-8 shrink-0 items-center gap-1 rounded-md px-2.5 text-[12px] font-semibold text-white transition-colors"
          >
            <Plus className="size-3.5" /> No Finding
          </button>
        </div>
        <div className="flex max-h-[520px] flex-col gap-3 overflow-y-auto p-4">
          {hallazgos.map((h) => (
            <FichaHallazgo
              key={h.id}
              h={h}
              onBorrar={() => {
                const indice = hallazgos.findIndex((x) => x.id === h.id)
                setHallazgos((hs) => hs.filter((x) => x.id !== h.id))
                aviso.warn(\`Finding on \${h.zona} was deleted.\`, {
                  label: 'Undo',
                  onClick: () => setHallazgos((hs) => [...hs.slice(0, indice), h, ...hs.slice(indice)]),
                })
              }}
            />
          ))}
        </div>
        <button
          onClick={() => aviso.info('The full finding list is not available in this release.')}
          className="flex items-center gap-1 px-4 pb-4 text-[13px] font-medium text-[#8eaadd] hover:underline"
        >
          All result ({hallazgos.length}) <ChevronDown className="size-3.5" />
        </button>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <button
          onClick={onVolver}
          className="text-dash-blue flex w-fit items-center gap-1 text-[13px] font-medium hover:underline"
        >
          <ChevronLeft className="size-4" /> All images
        </button>

        {/* El tope de 819 va acá: puesto en el hijo junto a \`w-full\`, el
            contenedor con \`w-fit\` se medía contra un hijo que se medía contra
            él y los dos colapsaban a 0. */}
        <div className="relative w-full max-w-[819px] overflow-hidden rounded-xl bg-black">
          {/* 819x552, la medida del nodo del Figma. El tope va en el **ancho**:
              topando sólo el alto, en una columna más ancha el marco quedaba en
              874x552 y la proporción se iba a 1.58 en vez de 1.48. */}
          <div className="aspect-[819/552] w-full overflow-auto">
            <div style={{ width: \`\${zoom * 100}%\`, height: \`\${zoom * 100}%\` }}>
              <Placa id={actual.id} />
            </div>
          </div>

          {/* Redondos y abajo a la derecha, que es donde los pone el frame
              —no centrados en el alto de la placa—. */}
          <div className="absolute right-4 bottom-4 flex flex-col gap-3">
            <button
              onClick={() => setCondicion(true)}
              aria-label="Add condition"
              className={BOTON_ICONO_REDONDO}
            >
              <Plus className="size-5" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(1, Number((z - 0.25).toFixed(2))))}
              aria-label="Zoom out"
              className={BOTON_ICONO_REDONDO}
            >
              <ZoomOut className="size-4" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.min(3, Number((z + 0.25).toFixed(2))))}
              aria-label="Zoom in"
              className={BOTON_ICONO_REDONDO}
            >
              <ZoomIn className="size-4" />
            </button>
          </div>

          {zoom > 1 && (
            <span className="absolute bottom-3 left-3 rounded bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white">
              {Math.round(zoom * 100)}%
            </span>
          )}
        </div>

        {/* Tira de miniaturas, con el botón de sumar al final. */}
        <div className="flex gap-3 overflow-x-auto pb-1">
          {estudios.slice(0, 8).map((r) => (
            <button
              key={r.id}
              onClick={() => { onCambiar(r); setZoom(1) }}
              aria-label={\`Show \${r.tipo} from \${r.fecha}\`}
              aria-current={r.id === actual.id ? 'true' : undefined}
              className={cn(
                'h-[74px] w-[96px] shrink-0 overflow-hidden rounded-lg border-2 transition-colors',
                r.id === actual.id ? 'border-dash-blue' : 'border-transparent hover:border-line',
              )}
            >
              <Placa id={r.id} chica />
            </button>
          ))}
          <button
            onClick={onSubir}
            aria-label="Add image"
            className="bg-dash-blue hover:bg-dash-blue-hover flex h-[74px] w-[96px] shrink-0 items-center justify-center rounded-lg text-white transition-colors"
          >
            <CirclePlus className="size-6" />
          </button>
        </div>
      </div>

      {condicion && <NewCondition onClose={() => setCondicion(false)} />}
    </div>
  )
}
`})))()}var k;function A(){return(A=e((()=>{k=`import { FileText, Trash2, MoreVertical, ListFilter, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { RecordStatus } from '@/data/mock'

/* Lab Order, Prescription y Referral comparten esta fila en el original:
   borde azul a la izquierda, avatar + provider, un slot central variable,
   badge de estado, tres fechas y tres acciones. */

const STATUS: Record<RecordStatus, string> = {
  Pending: 'bg-amber-100 text-amber-700',
  Requested: 'bg-blue-100 text-blue-700',
  Delivered: 'bg-green-100 text-green-700',
  Active: 'bg-green-100 text-green-700',
  Completed: 'bg-green-100 text-green-700',
  Expired: 'bg-red-100 text-red-600',
  Cancelled: 'bg-red-100 text-red-600',
}

export function RecordRow({
  provider, providerRole, status, created, updated, expires, children,
}: {
  provider: string
  providerRole?: string
  status: RecordStatus
  created: string
  updated: string
  expires: string
  children?: React.ReactNode
}) {
  const initials = provider.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
  return (
    <div className="border-l-primary flex items-center gap-6 rounded-lg border border-l-4 bg-background px-4 py-3 shadow-sm">
      <div className="flex w-[190px] shrink-0 items-center gap-3">
        <span className="bg-primary text-primary-foreground flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-medium">
          {initials}
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block truncate text-sm font-medium">{provider}</span>
          {providerRole && <span className="text-muted-foreground block text-xs">{providerRole}</span>}
        </span>
      </div>

      <div className="w-[230px] shrink-0 border-l pl-6">{children}</div>

      <span className={cn('rounded-full px-3 py-1 text-xs font-medium', STATUS[status])}>
        {status}
      </span>

      <div className="ml-auto flex shrink-0 gap-6 text-center text-xs">
        <span><span className="text-muted-foreground block">Created</span><span className="text-primary font-medium">{created}</span></span>
        <span><span className="text-muted-foreground block">Last Updated</span><span className="text-primary font-medium">{updated}</span></span>
        <span><span className="text-muted-foreground block">Expiration date</span><span className="text-destructive font-medium">{expires}</span></span>
      </div>

      <div className="text-muted-foreground flex shrink-0 gap-2">
        <button aria-label="Document"><FileText className="size-4" /></button>
        <button aria-label="Delete"><Trash2 className="size-4" /></button>
        <button aria-label="More"><MoreVertical className="size-4" /></button>
      </div>
    </div>
  )
}

export function RecordToolbar({ newLabel }: { newLabel: string }) {
  return (
    <div className="mb-4 flex justify-end gap-3">
      <button className="flex h-9 items-center gap-2 rounded-md border bg-background px-4 text-sm font-medium shadow-sm">
        <ListFilter className="size-4" /> Filters
      </button>
      {/* En el original este botón viene deshabilitado */}
      <button
        disabled
        className="bg-primary-disabled text-primary-disabled-foreground flex h-9 cursor-not-allowed items-center gap-2 rounded-md px-4 text-sm font-medium"
      >
        <Plus className="size-4" /> {newLabel}
      </button>
    </div>
  )
}

export function RecordPagination({ total }: { total: number }) {
  return (
    <div className="mt-4 flex items-center gap-3 rounded-lg border bg-background px-5 py-4 text-sm shadow-sm">
      <span className="text-muted-foreground">Showing 1 to 7 of {total} results</span>
      {/* El original rotula este selector "Mostrar:". Corregido. */}
      <label className="flex items-center gap-2">Show:
        <select className="border-input h-9 rounded-md border px-2"><option>10</option><option>20</option></select>
      </label>
      <div className="text-muted-foreground ml-auto flex items-center gap-2">
        <button>Previous</button>
        <span className="bg-primary text-primary-foreground size-8 rounded-md text-center leading-8 font-medium">1</span>
        <button>2</button><span>…</span><button>Next</button>
      </div>
    </div>
  )
}
`})))()}var j;function M(){return(M=e((()=>{j=`import { Fragment } from 'react'
import { Check } from 'lucide-react'

/* Header de paso que comparten los drawers de varios pasos: una insignia
   numerada por paso, unidas por una regla que se completa al avanzar. */
function Insignia({ estado, numero }: { estado: 'active' | 'complete' | 'pending'; numero: number }) {
  const bg = estado === 'complete' ? 'bg-dash-ok-fg' : estado === 'active' ? 'bg-dash-blue' : 'bg-line-strong'
  const label = estado === 'complete' ? 'text-dash-ok-fg' : estado === 'active' ? 'text-dash-blue' : 'text-ink-faint'
  return (
    <div className="flex flex-col items-center gap-1">
      <span className={\`text-[10px] font-medium transition-colors duration-300 \${label}\`}>Step</span>
      <div className={\`flex size-6 items-center justify-center rounded-full transition-colors duration-300 \${bg}\`}>
        {estado === 'complete' ? <Check className="size-2.5 text-white" /> : <span className="text-xs font-semibold text-white">{numero}</span>}
      </div>
    </div>
  )
}

function Conector({ lleno }: { lleno: boolean }) {
  return (
    <div className="-mx-2 flex flex-1 flex-col items-center gap-1">
      <span className="invisible text-[10px] font-medium">Step</span>
      <div className="flex h-6 w-full items-center">
        <div className={\`w-full border-t-2 transition-colors duration-300 \${lleno ? 'border-dash-blue' : 'border-line-strong'}\`} />
      </div>
    </div>
  )
}

export function StepIndicator({ total, current, className = '' }: { total: number; current: number; className?: string }) {
  return (
    <div className={\`flex items-start gap-2 \${className}\`}>
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <Fragment key={n}>
          {n > 1 && <Conector lleno={n <= current} />}
          <Insignia estado={n < current ? 'complete' : n === current ? 'active' : 'pending'} numero={n} />
        </Fragment>
      ))}
    </div>
  )
}
`})))()}var N;function P(){return(P=e((()=>{N=`import { ChevronRight, CircleCheck } from 'lucide-react'
import { aviso } from '@/components/ui/toaster'
import { PLANES, type Plan } from '@/data/clinical-mode'

/* Card de 4235:135661: profesional arriba, una regla, el nombre del plan con
   la pill, los tres datos y el porcentaje grande con la barra. El orden de los
   datos es Created On / Total Procedures / Total Amount, distinto al del
   tablero viejo. El frame dibuja además un ícono de documento a la derecha del
   profesional: se sacó a pedido de Julián. */
/* La etiqueta va en una sola línea. Partida en dos —"Total / Procedures"—
   desalineaba las tres cajas entre sí y apretaba la card entera. */
function Dato({ label, valor, azul }: { label: string; valor: string; azul?: boolean }) {
  return (
    <div className="min-w-0 rounded-md border border-line px-2 py-2">
      <span className="block truncate text-[9px] leading-none whitespace-nowrap text-ink-muted">
        {label}
      </span>
      <span className={\`mt-1.5 block truncate text-[12px] font-semibold \${azul ? 'text-dash-blue' : 'text-ink'}\`}>
        {valor}
      </span>
    </div>
  )
}

function PlanCard({ p }: { p: Plan }) {
  return (
    <div className="rounded-lg border border-line bg-white p-3.5">
      <div className="flex items-start gap-2">
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-bold text-ink">{p.doctor}</span>
          <span className="block text-[12px] text-ink-muted">{p.rol}</span>
        </span>
      </div>

      <div className="my-3 h-px bg-line-soft" />

      <div className="flex items-center gap-2">
        <span className="min-w-0 flex-1 truncate text-[13px] text-ink">{p.nombre}</span>
        <span className="shrink-0 rounded-full border border-dash-ok-fg bg-dash-ok-bg px-2 py-[2px] text-[11px] font-semibold text-dash-ok-fg">
          {p.estado}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-1.5">
        <Dato label="Created On" valor={p.creado} azul />
        <Dato label="Total Procedures" valor={String(p.procedimientos)} />
        <Dato label="Total Amount" valor={p.total} />
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="text-dash-blue text-[17px] font-bold">{p.progreso}%</span>
        <span className="bg-dash-count-bg text-dash-blue-hover flex shrink-0 items-center gap-1 rounded-full px-2 py-[2px] text-[10px] font-medium">
          <CircleCheck className="size-3" /> {p.completados}
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e5e5e5]">
        <div className="bg-dash-blue h-full rounded-full" style={{ width: \`\${p.progreso}%\` }} />
      </div>
    </div>
  )
}

export function TreatmentPlanList() {
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[15px] font-bold text-ink">Treatment Plan</p>
        <button
          onClick={() => aviso.info('Full treatment plan list is not available in this release.')}
          className="text-dash-blue flex shrink-0 items-center gap-0.5 text-[12px] font-semibold hover:underline"
        >
          All treatment <ChevronRight className="size-3.5" />
        </button>
      </div>
      {/* Cuatro planes en el frame; la columna scrollea sola para no estirar
          la página hasta el doble del alto del odontograma. */}
      <div className="mt-3 flex max-h-[560px] flex-col gap-3 overflow-y-auto pr-1">
        {PLANES.map((p) => <PlanCard key={p.id} p={p} />)}
      </div>
    </div>
  )
}
`})))()}var F;function I(){return(I=e((()=>{F=`import { useState } from 'react'
import {
  Bookmark, Pencil, Plus, MoreVertical, CornerUpLeft, ChevronDown, SquareX,
  LoaderCircle, Check, FileText, Eye, Save, Link2, ClipboardList, Scan, X,
  CalendarDays,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { ConsentBlock } from '@/components/clinical/ConsentBlock'
import {
  CASOS, NO_ASIGNADOS, CATEGORIAS, DIALOGOS, OPCIONES_BORRAR_CASO, MOVER,
  NUEVO_GRUPO, COMPLETAR,
  type Caso, type Procedimiento, type ClaveDialogo,
} from '@/data/treatment-plan'
import { ICONO_SUELTO } from '@/lib/estilos'
import { SelectField } from '@/components/patients/form'
import { Pill, type PillTone } from '@/components/ui/pill'

/* Figma 4118:220403 "Treatment Plan — Section (Cases, Workflow & Dialogs)":
   el rail de estados, la tabla de no asignados, el caso con sus visitas y los
   diálogos. */

const COLUMNAS = ['Date', 'Surface', 'Tooth', 'Location', 'Procedure', 'Provider', 'Fee', 'Status', 'Actions']

const ESTADO_TONO: Record<Procedimiento['estado'], PillTone> = {
  Planned: 'success', Completed: 'info', Removed: 'neutral',
}

/* ── Diálogos ─────────────────────────────────────────────────────── */

function Dialogo({
  titulo, bajada, texto, children, onConfirm, onClose, confirmar = 'Confirm',
}: {
  titulo: string
  /** Bajada del título. Va en su columna, no a lo ancho: suelta se metía
      debajo de la X. */
  bajada?: readonly string[]
  texto?: readonly string[]
  children?: React.ReactNode
  onConfirm: () => void
  onClose: () => void
  confirmar?: string
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-label={titulo}
        onClick={(e) => e.stopPropagation()}
        className="motion-safe:animate-[loc-in_160ms_ease-out] w-full max-w-[440px] rounded-xl bg-white p-5 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="min-w-0">
            <h2 className="text-[18px] leading-tight font-bold text-ink">{titulo}</h2>
            {bajada?.map((t) => (
              <p key={t} className="mt-1.5 text-[12px] leading-[1.5] text-ink-muted">{t}</p>
            ))}
          </span>
          <button onClick={onClose} aria-label="Close" className="shrink-0 text-ink hover:opacity-60">
            <X className="size-4" />
          </button>
        </div>
        {texto?.map((t) => (
          <p key={t} className="mt-2 text-[13px] text-ink-muted">{t}</p>
        ))}
        {children}
        <div className="mt-5 flex flex-nowrap items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="h-9 shrink-0 rounded-md border border-line px-4 text-[13px] font-medium whitespace-nowrap hover:bg-surface-subtle"
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose() }}
            className="bg-dash-blue hover:bg-dash-blue-hover h-9 shrink-0 rounded-md px-4 text-[13px] font-semibold whitespace-nowrap text-white transition-colors"
          >
            {confirmar}
          </button>
        </div>
      </div>
    </div>
  )
}

/* Tarjeta con radio: la usan Delete Case y Move Procedure. */
function OpcionRadio({
  on, titulo, detalle, onClick,
}: { on: boolean; titulo: string; detalle: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex gap-3 rounded-lg border px-3.5 py-3 text-left transition-colors',
        on ? 'border-dash-blue' : 'border-line hover:bg-surface-subtle',
      )}
    >
      <span
        className={cn(
          'mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border-2',
          on ? 'border-dash-blue' : 'border-ink-faint',
        )}
      >
        {on && <span className="bg-dash-blue size-2 rounded-full" />}
      </span>
      <span className="min-w-0">
        <span className="block text-[13px] font-semibold text-ink">{titulo}</span>
        <span className="mt-1 block text-[12px] leading-[1.5] text-ink-muted">{detalle}</span>
      </span>
    </button>
  )
}

/* Figma 4122:246942. El mismo modal sale de New Alternative Case y de Move to. */
function DialogoMover({ onClose }: { onClose: () => void }) {
  const [caso, setCaso] = useState('')
  const [op, setOp] = useState(MOVER.opciones[0].id)
  const [intentado, setIntentado] = useState(false)

  return (
    <Dialogo
      titulo={MOVER.titulo}
      bajada={[MOVER.bajada]}
      onClose={onClose}
      confirmar="Save"
      onConfirm={() => {
        setIntentado(true)
        if (!caso) return
        aviso.ok(
          op === 'mover'
            ? \`Procedure moved to \${caso}.\`
            : \`Procedure added to \${caso} and kept in the original plan.\`,
        )
      }}
    >
      <div className="mt-5">
        <SelectField
          label="Case Name"
          value={caso}
          onChange={setCaso}
          options={CASOS.map((c) => c.nombre)}
          error={intentado && !caso ? 'This field is required.' : undefined}
        />
      </div>
      <p className="mt-5 text-xs font-medium text-ink">Select destination case</p>
      <div className="mt-2.5 flex flex-col gap-2.5">
        {MOVER.opciones.map((o) => (
          <OpcionRadio key={o.id} on={op === o.id} titulo={o.titulo} detalle={o.detalle} onClick={() => setOp(o.id)} />
        ))}
      </div>
    </Dialogo>
  )
}

/* Figma 4122:246100. Un solo campo. */
function DialogoNuevoGrupo({ onClose }: { onClose: () => void }) {
  const [nombre, setNombre] = useState('')
  const [intentado, setIntentado] = useState(false)
  return (
    <Dialogo
      titulo={NUEVO_GRUPO.titulo}
      onClose={onClose}
      confirmar="Save"
      onConfirm={() => {
        setIntentado(true)
        if (!nombre) return
        aviso.ok(\`\${nombre} case group created.\`)
      }}
    >
      <div className="mt-4">
        <SelectField
          label={NUEVO_GRUPO.campo}
          value={nombre}
          onChange={setNombre}
          options={CASOS.map((c) => c.nombre)}
          error={intentado && !nombre ? 'This field is required.' : undefined}
        />
      </div>
    </Dialogo>
  )
}

/* Figma 4122:250957. Las tarjetas llevan casilla: el texto pide seleccionar
   las condiciones y en el frame no había con qué. */
function DialogoCompletar({ onClose }: { onClose: () => void }) {
  const [marcadas, setMarcadas] = useState<string[]>([])
  return (
    <Dialogo
      titulo={COMPLETAR.titulo}
      bajada={COMPLETAR.texto}
      onClose={onClose}
      onConfirm={() =>
        aviso.ok(
          marcadas.length === 0
            ? 'Procedure completed.'
            : \`Procedure completed and \${marcadas.length} condition\${marcadas.length > 1 ? 's' : ''} marked as treated.\`,
        )
      }
    >
      <div className="mt-4 flex max-h-[340px] flex-col gap-3 overflow-y-auto">
        {COMPLETAR.condiciones.map((c) => {
          const on = marcadas.includes(c.id)
          return (
            <div
              key={c.id}
              className={cn(
                'rounded-r-md border border-l-[3px] border-line-soft border-l-dash-ok-fg p-3 transition-colors',
                on && 'border-dash-blue border-l-dash-ok-fg bg-dash-count-bg',
              )}
            >
              <div className="flex items-center gap-2">
                <Casilla
                  on={on}
                  label={\`Mark \${c.zona} as treated\`}
                  onChange={(v) => setMarcadas((m) => (v ? [...m, c.id] : m.filter((x) => x !== c.id)))}
                />
                <span className="rounded-full border border-dash-ok-fg bg-dash-ok-bg px-2 py-[2px] text-[11px] font-semibold text-dash-ok-fg">
                  {c.estado}
                </span>
                <span className="text-dash-blue flex items-center gap-1 text-[12px] font-medium">
                  <CalendarDays className="size-3" /> {c.fecha}
                </span>
                <button
                  onClick={() => aviso.info('Condition actions are not available in this release.')}
                  aria-label={\`Actions for \${c.zona}\`}
                  className={\`\${ICONO_SUELTO} ml-auto\`}
                >
                  <MoreVertical className="size-4" />
                </button>
              </div>
              <p className="mt-2 text-[13px] font-bold text-ink">{c.zona}</p>
              <p className="text-[12px] text-ink-medium">
                Condition: <span className="text-ink-muted">{c.condicion}</span>
              </p>
              <p className="text-[12px] text-ink-medium">
                Descriptors: <span className="text-ink-muted">{c.descriptores}</span>
              </p>
              <button
                onClick={() => aviso.info('The procedure detail is not available in this release.')}
                className="text-dash-blue mt-1 ml-auto block text-[12px] font-medium hover:underline"
              >
                Go to procedure ›
              </button>
            </div>
          )
        })}
      </div>
    </Dialogo>
  )
}

function DialogoBorrarCaso({ onConfirm, onClose }: { onConfirm: (op: string) => void; onClose: () => void }) {
  const [op, setOp] = useState(OPCIONES_BORRAR_CASO[0].id)
  return (
    <Dialogo
      titulo="Delete Case"
      texto={['Are you sure you want to delete this case?']}
      onConfirm={() => onConfirm(op)}
      onClose={onClose}
    >
      {/* "Select destination case" es el rótulo del frame, aunque lo que se
          elige acá sea el alcance del borrado. Se replica. */}
      <p className="mt-4 text-[13px] font-semibold text-ink">Select destination case</p>
      <div className="mt-2 flex flex-col gap-2">
        {OPCIONES_BORRAR_CASO.map((o) => (
          <OpcionRadio key={o.id} on={op === o.id} titulo={o.titulo} detalle={o.detalle} onClick={() => setOp(o.id)} />
        ))}
      </div>
    </Dialogo>
  )
}

/* ── Rail de estados ──────────────────────────────────────────────── */

function Rail({
  vista, casoId, favoritos, onFavorito, onUnassigned, onCaso,
}: {
  vista: 'unassigned' | 'caso'
  casoId: string
  favoritos: string[]
  onFavorito: (id: string) => void
  onUnassigned: () => void
  onCaso: (id: string) => void
}) {
  const [abierto, setAbierto] = useState(true)

  /* Medido: "Periodontists Recommended" pide 179px de texto; con el ícono y el
     padding la columna necesita 240. Con 190 se cortaba. */
  return (
    <nav className="shrink-0 lg:w-[240px]">
      <button
        onClick={onUnassigned}
        className={cn(
          'flex w-full items-center gap-2 rounded-md px-2 py-2 text-[13px] transition-colors',
          vista === 'unassigned' ? 'bg-dash-blue font-medium text-white' : 'text-ink-medium hover:bg-surface-muted',
        )}
      >
        <SquareX className="size-4 shrink-0" /> Unassigned
      </button>

      <button
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        className="mt-1 flex w-full items-center gap-2 rounded-md px-2 py-2 text-[13px] text-ink-medium transition-colors hover:bg-surface-muted"
      >
        <LoaderCircle className="size-4 shrink-0" />
        <span className="min-w-0 flex-1 text-left">Pending Decision</span>
        <ChevronDown className={cn('size-4 shrink-0 transition-transform', !abierto && '-rotate-90')} />
      </button>

      {abierto && (
        <div className="mt-1 flex flex-col gap-1 pl-3">
          {CASOS.map((c) => {
            const on = vista === 'caso' && c.id === casoId
            return (
              <span
                key={c.id}
                className={cn(
                  'flex items-center gap-2 rounded-md pr-1 transition-colors',
                  on ? 'bg-dash-blue text-white' : 'text-ink-medium hover:bg-surface-muted',
                )}
              >
                {/* El bookmark marca favorito; el resto de la fila navega. */}
                <button
                  onClick={() => onFavorito(c.id)}
                  aria-label={\`\${favoritos.includes(c.id) ? 'Unmark' : 'Mark'} \${c.nombre} as favourite\`}
                  aria-pressed={favoritos.includes(c.id)}
                  className="shrink-0 py-2 pl-2 hover:opacity-70"
                >
                  <Bookmark
                    className="size-4"
                    fill={favoritos.includes(c.id) ? 'currentColor' : 'none'}
                  />
                </button>
                <button
                  onClick={() => onCaso(c.id)}
                  aria-current={on ? 'page' : undefined}
                  className={cn('min-w-0 flex-1 truncate py-2 text-left text-[13px]', on && 'font-medium')}
                >
                  {c.nombre}
                </button>
              </span>
            )
          })}
        </div>
      )}

      {/* "Acepted" y "Discarted" son los typos del frame. */}
      {[
        { label: 'Acepted', icono: Check },
        { label: 'Discarted', icono: FileText },
      ].map(({ label, icono: Icono }) => (
        <button
          key={label}
          onClick={() => aviso.info(\`\${label} cases are not available in this release.\`)}
          className="mt-1 flex w-full items-center gap-2 rounded-md px-2 py-2 text-[13px] text-ink-medium transition-colors hover:bg-surface-muted"
        >
          <Icono className="size-4 shrink-0" /> {label}
        </button>
      ))}
    </nav>
  )
}

/* ── Tablas ───────────────────────────────────────────────────────── */

/* Casilla del sistema: cuadrada, azul cuando está marcada. */
function Casilla({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={cn(
        'flex size-4 shrink-0 items-center justify-center rounded border transition-colors',
        on ? 'border-dash-blue bg-dash-blue text-white' : 'border-line-strong bg-white hover:border-ink-faint',
      )}
    >
      {on && <Check className="size-3" strokeWidth={3} />}
    </button>
  )
}

function TablaProcedimientos({
  filas, acciones, seleccion, onSeleccion, onAccion, onCompletar,
}: {
  filas: Procedimiento[]
  acciones?: boolean
  /** Con selección, la tabla suma la columna de casillas. */
  seleccion?: string[]
  onSeleccion?: (ids: string[]) => void
  onAccion: (p: Procedimiento) => void
  onCompletar?: () => void
}) {
  const conCasillas = !!seleccion && !!onSeleccion
  const todas = conCasillas && filas.length > 0 && filas.every((f) => seleccion.includes(f.id))

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[860px] border-collapse">
        <thead>
          <tr className="border-y border-line-soft bg-surface-alt">
            {conCasillas && (
              <th className="w-10 px-3">
                <Casilla
                  on={todas}
                  label="Select all procedures"
                  onChange={(v) => onSeleccion(v ? filas.map((f) => f.id) : [])}
                />
              </th>
            )}
            {COLUMNAS.map((c) => (
              <th key={c} className="h-10 px-3 text-left text-[11px] font-semibold whitespace-nowrap text-ink-muted">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((p) => (
            <tr
              key={p.id}
              className={cn(
                'border-b border-line-soft last:border-0',
                conCasillas && seleccion.includes(p.id) && 'bg-dash-count-bg',
              )}
            >
              {conCasillas && (
                <td className="px-3">
                  <Casilla
                    on={seleccion.includes(p.id)}
                    label={\`Select \${p.codigo} from \${p.fecha}\`}
                    onChange={(v) =>
                      onSeleccion(v ? [...seleccion, p.id] : seleccion.filter((x) => x !== p.id))
                    }
                  />
                </td>
              )}
              <td className="h-12 px-3 text-[13px] whitespace-nowrap text-ink">{p.fecha}</td>
              <td className="px-3 text-[13px] text-ink">{p.superficie}</td>
              <td className="px-3 text-[13px] text-ink">{p.pieza}</td>
              <td className="px-3 text-[13px] text-ink">{p.ubicacion}</td>
              <td className="px-3 text-[13px] whitespace-nowrap text-ink">
                {p.codigo} {p.nombre}
              </td>
              <td className="px-3 text-[13px] whitespace-nowrap text-ink-soft">{p.proveedor}</td>
              <td className="px-3 text-[13px] whitespace-nowrap text-ink-soft tabular-nums">{p.fee}</td>
              <td className="px-3"><Pill tone={ESTADO_TONO[p.estado]}>{p.estado}</Pill></td>
              <td className="px-3">
                <span className="flex items-center gap-1">
                  <button
                    onClick={() => onAccion(p)}
                    aria-label={\`Actions for \${p.codigo}\`}
                    className={ICONO_SUELTO}
                  >
                    <MoreVertical className="size-4" />
                  </button>
                  {acciones && (
                    <>
                      <button
                        onClick={() => onCompletar?.()}
                        aria-label={\`Complete \${p.codigo}\`}
                        className={ICONO_SUELTO}
                      >
                        <ClipboardList className="size-4" />
                      </button>
                      <button
                        onClick={() => aviso.info('Imaging is not available in this release.')}
                        aria-label={\`Imaging for \${p.codigo}\`}
                        className={ICONO_SUELTO}
                      >
                        <Scan className="size-4" />
                      </button>
                      <button
                        onClick={() => aviso.info('Linking is not available in this release.')}
                        aria-label={\`Link \${p.codigo}\`}
                        className={ICONO_SUELTO}
                      >
                        <Link2 className="size-4" />
                      </button>
                    </>
                  )}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ── Caso ─────────────────────────────────────────────────────────── */

function VistaCaso({
  caso, favorito, onFavorito, onDialogo, onMover, onGrupo, onCompletar,
}: {
  caso: Caso
  favorito: boolean
  onFavorito: () => void
  onDialogo: (d: ClaveDialogo | 'delete') => void
  onMover: () => void
  onGrupo: () => void
  onCompletar: () => void
}) {
  const [categoria, setCategoria] = useState('')
  const [notas, setNotas] = useState('')
  const [menu, setMenu] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-line bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onFavorito}
            aria-label={\`\${favorito ? 'Unmark' : 'Mark'} \${caso.nombre} as favourite\`}
            aria-pressed={favorito}
            className={cn(
              'flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors',
              favorito ? 'bg-dash-blue text-white' : 'border border-line bg-white text-ink hover:bg-surface-subtle',
            )}
          >
            <Bookmark className="size-4" fill={favorito ? 'currentColor' : 'none'} />
          </button>
          <span className="min-w-0 flex-1 text-[17px] font-bold text-ink">{caso.nombre}</span>
          <button
            onClick={() => aviso.info('Renaming a case is not available in this release.')}
            aria-label="Rename case"
            className="shrink-0 text-ink-medium hover:opacity-70"
          >
            <Pencil className="size-4" />
          </button>
          <button
            onClick={onMover}
            className="text-dash-blue ml-auto flex shrink-0 items-center gap-1 text-[13px] font-semibold hover:underline"
          >
            Move to <CornerUpLeft className="size-3.5" />
          </button>
          <div className="relative shrink-0">
            <button
              onClick={() => setMenu((v) => !v)}
              aria-label="Case actions"
              aria-expanded={menu}
              className={\`\${ICONO_SUELTO} size-9\`}
            >
              <MoreVertical className="size-4" />
            </button>
            {menu && (
              <div className="absolute top-full right-0 z-30 mt-1 w-[190px] rounded-lg border border-line bg-white p-1 shadow-[0_12px_32px_rgb(0_0_0/0.18)]">
                {([
                  ['Present Case', 'present'],
                  ['Accept Case', 'accept'],
                  ['Discard Case', 'discard'],
                  ['Delete Case', 'delete'],
                ] as const).map(([label, clave]) => (
                  <button
                    key={clave}
                    onClick={() => { setMenu(false); onDialogo(clave) }}
                    className="block w-full rounded px-3 py-2 text-left text-[13px] hover:bg-surface-muted"
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-end gap-2">
          {['New Case Group', 'New Alternative Case'].map((t) => (
            <button
              key={t}
              onClick={t === 'New Alternative Case' ? onMover : onGrupo}
              className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 items-center gap-1.5 rounded-md px-4 text-[13px] font-semibold text-white transition-colors"
            >
              <Plus className="size-3.5" /> {t}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-2">
          <span className="text-[13px] text-ink">
            Create on: <span className="text-dash-blue font-medium">{caso.creado}</span>
          </span>
          <span className="text-[13px] text-ink">
            Create by: <span className="text-dash-blue font-medium">{caso.creadoPor}</span>
          </span>
          <span className="ml-auto flex items-center gap-2 text-[13px] text-ink">
            Status:
            <span className="rounded-full border border-warn-fg bg-warn-bg px-2 py-[2px] text-[11px] font-semibold text-warn-fg">
              {caso.estado}
            </span>
          </span>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div>
            <span className="block text-xs font-medium text-ink">
              Treatment Case Category<span className="text-required">*</span>
            </span>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="focus:border-dash-blue mt-1.5 h-10 w-full rounded-md border border-line bg-white px-3 text-[13px] focus:outline-none"
            >
              <option value="">Select</option>
              {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
            </select>
            <button
              onClick={() => aviso.info('The case preview is not available in this release.')}
              className="text-dash-blue mt-2 flex items-center gap-1.5 text-[13px] font-semibold hover:underline"
            >
              Preview <Eye className="size-3.5" />
            </button>
          </div>
          <div>
            <span className="block text-xs font-medium text-ink">
              Additional Discussion Notes<span className="text-required">*</span>
            </span>
            <div className="relative mt-1.5">
              <textarea
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                rows={3}
                placeholder="Include patient history, previous treatments, and specific questions for the specialist..."
                className="focus:border-dash-blue w-full resize-none rounded-md border border-line p-3 pr-10 text-[13px] placeholder:text-ink-faint focus:outline-none"
              />
              <button
                onClick={() => aviso.ok('Discussion notes saved.')}
                aria-label="Save notes"
                className="absolute right-2 bottom-2 text-ink-medium hover:opacity-70"
              >
                <Save className="size-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-dash-count-bg mt-4 w-fit rounded-md px-3 py-2 text-[13px] font-semibold text-ink">
          Total Amount: <span className="text-dash-blue">{caso.total}</span>
        </div>
      </div>

      {caso.visitas.map((v) => (
        <div key={v.id} className="overflow-hidden rounded-xl border border-line bg-white">
          <div className="bg-dash-blue px-4 py-2 text-[13px] font-semibold text-white">
            {v.nombre} - {v.total}
          </div>
          <TablaProcedimientos
            filas={v.procedimientos}
            acciones
            onAccion={() => onDialogo('removeProcedure')}
            onCompletar={onCompletar}
          />
        </div>
      ))}
    </div>
  )
}

/* ── Sección ──────────────────────────────────────────────────────── */

export function TreatmentPlanSection() {
  /* Se entra por Unassigned, como el frame por defecto (4118:220406). */
  const [vista, setVista] = useState<'unassigned' | 'caso'>('unassigned')
  const [casoId, setCasoId] = useState(CASOS[0].id)
  const [dialogo, setDialogo] = useState<ClaveDialogo | 'delete' | null>(null)
  const [mover, setMover] = useState(false)
  const [grupo, setGrupo] = useState(false)
  const [completar, setCompletar] = useState(false)
  const [favoritos, setFavoritos] = useState<string[]>([])
  const [seleccion, setSeleccion] = useState<string[]>([])
  const caso = CASOS.find((c) => c.id === casoId) ?? CASOS[0]

  const alternarFavorito = (id: string) =>
    setFavoritos((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <Rail
        vista={vista}
        casoId={casoId}
        favoritos={favoritos}
        onFavorito={alternarFavorito}
        onUnassigned={() => setVista('unassigned')}
        onCaso={(id) => { setCasoId(id); setVista('caso') }}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        {vista === 'caso' && <ConsentBlock />}

        {vista === 'unassigned' ? (
          <div className="rounded-xl border border-line bg-white p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-3">
              <p className="min-w-0 flex-1 text-[17px] font-bold text-ink">Unassigned</p>
              {['New Case Group', 'New Alternative Case'].map((t) => (
                <button
                  key={t}
                  onClick={t === 'New Alternative Case' ? () => setMover(true) : () => setGrupo(true)}
                  className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 shrink-0 items-center gap-1.5 rounded-md px-4 text-[13px] font-semibold text-white transition-colors"
                >
                  <Plus className="size-3.5" /> {t}
                </button>
              ))}
              <button
                onClick={() => setMover(true)}
                className="text-dash-blue flex shrink-0 items-center gap-1 text-[13px] font-semibold hover:underline"
              >
                Move to <CornerUpLeft className="size-3.5" />
              </button>
            </div>
            {/* Con filas marcadas, la barra dice cuántas y ofrece qué hacer
                con ellas: seleccionar sin acción no sirve de nada. */}
            {seleccion.length > 0 && (
              <div className="bg-dash-count-bg mt-3 flex flex-wrap items-center gap-3 rounded-md px-3 py-2">
                <span className="text-dash-blue-hover text-[13px] font-semibold">
                  {seleccion.length} selected
                </span>
                <button
                  onClick={() => setMover(true)}
                  className="text-dash-blue text-[13px] font-semibold hover:underline"
                >
                  Move to
                </button>
                <button
                  onClick={() => setDialogo('removeProcedure')}
                  className="text-[13px] font-semibold text-dash-bad-fg hover:underline"
                >
                  Remove
                </button>
                <button
                  onClick={() => setSeleccion([])}
                  className="ml-auto text-[13px] font-medium text-ink-muted hover:underline"
                >
                  Clear
                </button>
              </div>
            )}
            <div className="mt-4 -mx-4 sm:-mx-5">
              <TablaProcedimientos
                filas={NO_ASIGNADOS}
                seleccion={seleccion}
                onSeleccion={setSeleccion}
                onAccion={() => setDialogo('removeProcedure')}
              />
            </div>
            {/* El pie del frame dice "insurances" en una tabla de
                procedimientos. Se replica. */}
            <p className="mt-3 text-[12px] text-ink-muted">
              Showing {NO_ASIGNADOS.length} of {NO_ASIGNADOS.length} insurances
            </p>
          </div>
        ) : (
          <VistaCaso
            caso={caso}
            favorito={favoritos.includes(caso.id)}
            onFavorito={() => alternarFavorito(caso.id)}
            onDialogo={setDialogo}
            onMover={() => setMover(true)}
            onGrupo={() => setGrupo(true)}
            onCompletar={() => setCompletar(true)}
          />
        )}
      </div>

      {mover && <DialogoMover onClose={() => setMover(false)} />}
      {grupo && <DialogoNuevoGrupo onClose={() => setGrupo(false)} />}
      {completar && <DialogoCompletar onClose={() => setCompletar(false)} />}
      {dialogo === 'delete' && (
        <DialogoBorrarCaso
          onClose={() => setDialogo(null)}
          onConfirm={(op) =>
            aviso.ok(op === 'solo-caso' ? 'Case deleted.' : 'Case and procedures deleted.')
          }
        />
      )}
      {dialogo && dialogo !== 'delete' && (
        <Dialogo
          titulo={DIALOGOS[dialogo].titulo}
          texto={DIALOGOS[dialogo].texto}
          onClose={() => setDialogo(null)}
          onConfirm={() => aviso.ok(\`\${DIALOGOS[dialogo].titulo} confirmed.\`)}
        />
      )}
    </div>
  )
}
`})))()}var L;function R(){return(R=e((()=>{L=`import { useRef, useState } from 'react'
import { Minus, Plus, Paperclip, Mic, FilePlus2, Table2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { BOTON_ICONO_REDONDO } from '@/lib/estilos'
import {
  VITALES, VITAL_COLOR, AVISO_PRESION, type Vital, type EstadoVital,
} from '@/data/clinical-mode'

/* Figma 4106:205304 "Vitals — Section (Entry Form)", con sus cuatro estados:
   vacío, cargado, con indicadores de estado y con el aviso azul.

   El medidor es un semicírculo: pista celeste, arco del valor y una perilla
   redonda en la punta. El color del arco lo decide el estado del valor
   —Normal / Elevated / Dangerously low—, que es lo que el frame muestra en su
   tercer tablero. Cuando el valor está dentro de rango va en azul. */

/* El medidor del frame: semicírculo grueso, pista celeste, arco del valor y
   una perilla blanca con el punto de color. Es más grande que el resto de la
   card a propósito —es el dato de la tarjeta—.

   **Se arrastra.** La perilla se agarra y el valor sigue al ángulo; también
   responde a las flechas del teclado, porque un control que sólo funciona con
   el mouse deja afuera a quien carga signos con el teclado. */
const R = 82
const GROSOR = 20
/* La perilla sobresale del trazo: su radio es GROSOR/2+4. Sin ese margen en el
   viewBox el arco quedaba recortado en las dos puntas y abajo. */
const PERILLA = GROSOR / 2 + 4
const PAD = PERILLA + 2
const ANCHO = (R + PAD) * 2
const CX = ANCHO / 2
const CY = R + PAD
const ALTO = CY + PAD
const LARGO = Math.PI * R

function Medidor({
  pct, color, etiqueta, min, max, valor, onValor, children,
}: {
  pct: number
  color: string
  etiqueta: string
  min: number
  max: number
  valor: number
  onValor: (v: number) => void
  children: React.ReactNode
}) {
  const ref = useRef<SVGSVGElement>(null)
  const d = \`M \${CX - R} \${CY} A \${R} \${R} 0 0 1 \${CX + R} \${CY}\`
  const ang = Math.PI - Math.PI * pct
  const kx = CX + R * Math.cos(ang)
  const ky = CY - R * Math.sin(ang)

  const desdePuntero = (e: React.PointerEvent) => {
    const svg = ref.current
    if (!svg) return
    const caja = svg.getBoundingClientRect()
    const cx = caja.left + (CX / ANCHO) * caja.width
    const cy = caja.top + (CY / ALTO) * caja.height
    /* atan2 sobre la mitad de arriba: 0 a la derecha, π a la izquierda. */
    const a = Math.atan2(cy - e.clientY, e.clientX - cx)
    const acotado = Math.min(Math.PI, Math.max(0, a))
    const p = 1 - acotado / Math.PI
    onValor(min + p * (max - min))
  }

  const teclado = (e: React.KeyboardEvent) => {
    const paso = (max - min) / 100
    const salto = (max - min) / 10
    const mapa: Record<string, number> = {
      ArrowRight: paso, ArrowUp: paso, ArrowLeft: -paso, ArrowDown: -paso,
      PageUp: salto, PageDown: -salto,
    }
    if (e.key === 'Home') { e.preventDefault(); onValor(min); return }
    if (e.key === 'End') { e.preventDefault(); onValor(max); return }
    const delta = mapa[e.key]
    if (delta === undefined) return
    e.preventDefault()
    onValor(valor + delta)
  }

  return (
    <div className="relative mx-auto w-fit">
      <svg
        ref={ref}
        width={ANCHO}
        height={ALTO}
        viewBox={\`0 0 \${ANCHO} \${ALTO}\`}
        role="slider"
        tabIndex={0}
        aria-label={etiqueta}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={valor}
        onPointerDown={(e) => {
          (e.currentTarget as Element).setPointerCapture(e.pointerId)
          desdePuntero(e)
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1) desdePuntero(e)
        }}
        onKeyDown={teclado}
        className="focus-visible:outline-dash-blue cursor-pointer touch-none rounded-lg outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <path d={d} fill="none" stroke="#dbeafe" strokeWidth={GROSOR} strokeLinecap="round" />
        <path
          d={d} fill="none" stroke={color} strokeWidth={GROSOR} strokeLinecap="round"
          strokeDasharray={LARGO} strokeDashoffset={LARGO * (1 - pct)}
        />
        <circle cx={kx} cy={ky} r={GROSOR / 2 + 4} fill="#fff" />
        <circle cx={kx} cy={ky} r={GROSOR / 2 - 3} fill={color} />
      </svg>
      {/* El valor se apoya en la base del semicírculo, que es donde el arco
          deja aire. */}
      <div
        className="pointer-events-none absolute inset-x-0 flex flex-col items-center"
        style={{ bottom: PAD + 6 }}
      >
        {children}
      </div>
    </div>
  )
}

function CampoNumero({
  label, valor, min, max, paso, onChange,
}: {
  label?: string
  valor: number
  min: number
  max: number
  paso: number
  onChange: (v: number) => void
}) {
  const acotar = (v: number) => Math.min(max, Math.max(min, Number(v.toFixed(1))))
  return (
    <div className="min-w-0 flex-1">
      {label && <span className="mb-1 block text-center text-[12px] text-ink-medium">{label}</span>}
      <div className="flex items-center justify-center gap-1.5">
        <button
          onClick={() => onChange(acotar(valor - paso))}
          aria-label={\`Decrease \${label ?? 'value'}\`}
          className="bg-dash-blue hover:bg-dash-blue-hover flex size-7 shrink-0 items-center justify-center rounded-full text-white transition-colors"
        >
          <Minus className="size-3.5" />
        </button>
        <input
          value={valor}
          onChange={(e) => {
            const n = Number(e.target.value)
            if (!Number.isNaN(n)) onChange(acotar(n))
          }}
          inputMode="decimal"
          aria-label={label ?? 'Value'}
          className="focus:border-dash-blue h-8 w-full min-w-0 rounded-md border border-line text-center text-[13px] font-medium tabular-nums focus:outline-none"
        />
        <button
          onClick={() => onChange(acotar(valor + paso))}
          aria-label={\`Increase \${label ?? 'value'}\`}
          className="bg-dash-blue hover:bg-dash-blue-hover flex size-7 shrink-0 items-center justify-center rounded-full text-white transition-colors"
        >
          <Plus className="size-3.5" />
        </button>
      </div>
    </div>
  )
}

/* El estado sale del valor y su rango: los extremos son los que el frame
   pinta en rojo y ámbar. Así el color no es decorativo, dice algo. */
function estadoDe(v: number, min: number, max: number): EstadoVital {
  const p = (v - min) / (max - min)
  if (p < 0.12) return 'Dangerously low'
  if (p > 0.75) return 'Elevated'
  return 'Normal'
}

function TarjetaVital({ v, aviso: conAviso }: { v: Vital; aviso?: boolean }) {
  const [valores, setValores] = useState(v.campos.map((c) => c.valor))
  const [grupo, setGrupo] = useState(v.alternador?.grupo[0] ?? '')
  const [unidad, setUnidad] = useState(v.alternador?.unidades[0] ?? v.unidad)

  const principal = v.campos[0]
  const pct = Math.min(1, Math.max(0, (valores[0] - principal.min) / (principal.max - principal.min)))
  const estado = estadoDe(valores[0], principal.min, principal.max)
  const color = estado === 'Normal' ? '#1d56bc' : VITAL_COLOR[estado].arco
  const texto = v.campos.length > 1 ? \`\${valores[0]}/\${valores[1]}\` : String(valores[0])

  return (
    <div className="flex flex-col rounded-xl border border-line bg-white p-4">
      <div className="flex items-start justify-between gap-2">
        <span className="min-w-0">
          <span className="block text-[17px] font-bold text-ink">{v.titulo}</span>
          <span className="block text-[12px] text-ink-medium">{v.subtitulo}</span>
        </span>
        <span className={cn('shrink-0 rounded-full border px-2 py-[2px] text-[11px] font-semibold', VITAL_COLOR[estado].pill)}>
          {estado}
        </span>
      </div>

      {/* El aviso no está por defecto: aparece cuando el valor se va del rango
          normal. Fijo, era una advertencia que nunca advertía de nada. */}
      {conAviso && estado !== 'Normal' && (
        <div className="border-l-dash-blue bg-dash-count-bg mt-3 rounded-r-md border-l-[3px] px-3 py-2">
          <p className="text-dash-blue-hover text-[12px] font-bold">{AVISO_PRESION.titulo}</p>
          <p className="text-dash-blue-hover text-[12px] font-semibold">{AVISO_PRESION.texto}</p>
        </div>
      )}

      {v.alternador && (
        <div className="mt-3 flex w-fit gap-1 rounded-lg bg-surface-muted p-1">
          {v.alternador.grupo.map((g) => (
            <button
              key={g}
              onClick={() => setGrupo(g)}
              className={cn(
                'rounded-md px-3 py-1 text-[12px] font-medium transition-colors',
                grupo === g ? 'bg-dash-blue text-white' : 'text-ink-medium hover:bg-white',
              )}
            >
              {g}
            </button>
          ))}
        </div>
      )}

      {/* Alto fijo para el medidor: sin esto las seis tarjetas tenían el
          bloque de campos a distinta altura según el largo del título o del
          aviso, y la grilla se veía desordenada. */}
      <div className="mt-4 flex flex-1 items-end justify-center">
        <Medidor
          pct={pct}
          color={color}
          etiqueta={v.campos.length > 1 ? \`\${v.titulo} systolic\` : v.titulo}
          min={principal.min}
          max={principal.max}
          valor={valores[0]}
          onValor={(n) => setValores((vs) => vs.map((x, j) => (j === 0 ? Number(n.toFixed(1)) : x)))}
        >
          <span className="text-[27px] leading-none font-bold tracking-tight text-ink tabular-nums">
            {texto}
            <span className="ml-0.5 align-baseline text-[12px] font-bold">{v.unidad}</span>
          </span>
        </Medidor>
      </div>

      {v.alternador && (
        <div className="mx-auto mt-3 flex w-fit gap-1 rounded-lg bg-surface-muted p-1">
          {v.alternador.unidades.map((u) => (
            <button
              key={u}
              onClick={() => setUnidad(u)}
              className={cn(
                'rounded-md px-3 py-1 text-[12px] font-medium transition-colors',
                unidad === u ? 'bg-dash-blue text-white' : 'text-ink-medium hover:bg-white',
              )}
            >
              {u}
            </button>
          ))}
        </div>
      )}

      <div className="mt-3 flex items-end gap-2">
        {v.campos.map((c, i) => (
          <CampoNumero
            key={c.label ?? i}
            label={c.label}
            valor={valores[i]}
            min={c.min}
            max={c.max}
            paso={c.paso}
            onChange={(n) => setValores((vs) => vs.map((x, j) => (j === i ? n : x)))}
          />
        ))}
      </div>

      <p className="mt-3 text-[11px] text-ink-muted">{v.rango}</p>
    </div>
  )
}

export function VitalsPanel() {
  const [nota, setNota] = useState('')

  return (
    /* En xl el contenido deja lugar a la derecha para las tres acciones
       flotantes; sin ese margen les pasaba por debajo. */
    <div className="relative xl:pr-14">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {VITALES.map((v) => (
          <TarjetaVital key={v.id} v={v} aviso={v.id === 'blood-pressure'} />
        ))}
      </div>

      {/* Composer de notas: el frame lo pone abajo, ocupando la columna izquierda. */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-xl border border-line bg-white p-3">
          <textarea
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            placeholder="Add notes"
            rows={2}
            className="w-full resize-none text-[13px] placeholder:text-ink-faint focus:outline-none"
          />
          <div className="mt-2 flex items-center gap-3">
            <button
              onClick={() => aviso.info('Attachments are not available in this release.')}
              aria-label="Attach file"
              className="text-ink-medium hover:opacity-70"
            >
              <Paperclip className="size-4" />
            </button>
            <button
              onClick={() => aviso.info('Voice notes are not available in this release.')}
              aria-label="Record voice note"
              className="text-ink-medium hover:opacity-70"
            >
              <Mic className="size-4" />
            </button>
            {/* Deshabilitado sin texto: en el frame el botón está apagado. */}
            <button
              disabled={!nota.trim()}
              onClick={() => { aviso.ok('Note added to the encounter.'); setNota('') }}
              className="bg-dash-blue hover:bg-dash-blue-hover ml-auto h-8 rounded-md px-4 text-[13px] font-semibold text-white transition-colors disabled:bg-surface-muted disabled:text-ink-faint"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Las tres acciones flotantes del borde derecho. Van fijas a la ventana
          —como el FAB de Scheduling— y no colgadas del contenedor: colgadas
          quedaban fuera del documento y lo hacían scrollear de costado. */}
      <div className="pointer-events-none fixed top-1/2 right-3 z-30 hidden -translate-y-1/2 xl:block">
        <div className="pointer-events-auto flex flex-col gap-3">
          {[
            { icono: Plus, label: 'Add vital', msg: 'Adding a vital is not available in this release.' },
            { icono: FilePlus2, label: 'New document', msg: 'Documents are not available in this release.' },
            { icono: Table2, label: 'Table view', msg: 'The table view is not available in this release.' },
          ].map(({ icono: Icono, label, msg }) => (
            <button
              key={label}
              onClick={() => aviso.info(msg)}
              aria-label={label}
              title={label}
              className={BOTON_ICONO_REDONDO}
            >
              <Icono className="size-4" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
`})))()}var z;function B(){return(B=e((()=>{z=`import { useCallback, useEffect } from 'react'
import { onStateChange } from 'react-advanced-odontogram'

/* Las caras lingual/palatina de los anteriores, en los 12 cuadrados que la
   grilla dejaba vacíos.

   La fila oclusal no dibuja los seis anteriores de cada arcada -no tienen
   cara oclusal-, así que quedaban 12 celdas \`.placeholder\` en blanco. Ahí va
   la otra cara del diente: la **misma pieza dibujada arriba**, en chico, y
   clickeable para poder cargarle condiciones como a cualquier otra.

   Es una copia del SVG que ya dibuja la librería, no un dibujo aparte: así
   no se despega del original ni hay dos versiones del mismo diente que
   mantener. Se vuelve a copiar cuando la librería avisa que cambió algo.
   Ver design-reference/figma/modulos/clinical-mode.md. */

const MARCA = 'data-cara-de'

export function CarasLinguales({ raiz }: { raiz: HTMLElement | null }) {
  const sincronizar = useCallback(() => {
    const grid = raiz?.querySelector<HTMLElement>('#toothGrid')
    if (!grid) return

    const oclusales = [...grid.querySelectorAll<HTMLElement>('.tooth-tile.occl-view')]
    const laterales = [...grid.querySelectorAll<HTMLElement>('.tooth-tile.side-view')]
    if (oclusales.length !== laterales.length) return

    oclusales.forEach((celda, i) => {
      if (!celda.classList.contains('placeholder')) return
      const modelo = laterales[i]
      const original = modelo?.querySelector('svg')
      const numero = modelo?.getAttribute('data-tooth')
      if (!original || !numero) return

      const copia = original.cloneNode(true) as SVGElement
      /* Sin ids: duplicarlos rompería los \`getElementById\` de la librería.
         Antes de sacarlos, las caries/subcaries quedan marcadas con una
         clase propia -el rojo de \`odontogram-theme.css\` apunta a \`id\`, que
         acá ya no existe-. */
      copia.removeAttribute('id')
      copia.querySelectorAll('[id]').forEach((n) => {
        if (/^(caries|subcaries)-/.test(n.id)) n.classList.add('caries-clon')
        n.removeAttribute('id')
      })

      celda.replaceChildren(copia)
      celda.classList.add('cara-lingual')
      celda.setAttribute(MARCA, numero)
      /* Se le pone la clase \`active\` de la librería, no una propia: así
         estas celdas se marcan exactamente igual que cualquier otra cuando
         la pieza está seleccionada, sin duplicar estilos. */
      celda.classList.toggle('active', modelo.classList.contains('active'))

      if (!celda.dataset.caraLista) {
        celda.dataset.caraLista = 'si'
        /* Clickearla selecciona la pieza, así se le cargan condiciones desde
           el panel igual que tocándola arriba. */
        celda.addEventListener('click', () => modelo.click())
      }
    })
  }, [raiz])

  useEffect(() => {
    if (!raiz) return
    sincronizar()

    /* Redibujar con los avisos de la propia librería. */
    const baja = onStateChange(() => sincronizar())

    /* La selección no pasa por \`onStateChange\`: es una clase en la celda.
       Se mira sólo \`class\` y se difiere con un frame, porque el observer
       también ve los cambios que hacemos nosotros. */
    let pedido = 0
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(pedido)
      pedido = requestAnimationFrame(() => sincronizar())
    })
    observer.observe(raiz, { subtree: true, attributes: true, attributeFilter: ['class'] })

    return () => {
      baja?.()
      cancelAnimationFrame(pedido)
      observer.disconnect()
      raiz.querySelectorAll<HTMLElement>(\`[\${MARCA}]\`).forEach((celda) => {
        celda.replaceChildren()
        celda.classList.remove('cara-lingual', 'active')
        celda.removeAttribute(MARCA)
        delete celda.dataset.caraLista
      })
    }
  }, [raiz, sincronizar])

  return null
}
`})))()}var V;function H(){return(H=e((()=>{V=`import { useEffect, useState } from 'react'
import { Check, X } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { FindingCard } from './FindingCard'
import { ACTIONS, type FindingAction } from './actions'
import type { Finding } from './data'

/* Confirmación antes de cambiar el estado de un finding. Cuando el área
   tiene otras condiciones cargadas, la lista permite marcarlas Treated
   al mismo tiempo. */
export function ConfirmProcedureDialog({
  action, finding, linkedConditions, onCancel, onConfirm,
}: {
  action: Exclude<FindingAction, 'edit'> | null
  finding: Finding | null
  linkedConditions: Finding[]
  onCancel: () => void
  onConfirm: (treatedIds: string[]) => void
}) {
  const [treated, setTreated] = useState<string[]>([])

  useEffect(() => {
    setTreated(linkedConditions.map((c) => c.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, finding?.id])

  if (!action || !finding) return null
  const copy = ACTIONS[action]
  const hasList = linkedConditions.length > 0 && action !== 'delete'

  return (
    <Dialog open onOpenChange={(v) => !v && onCancel()}>
      <DialogContent showCloseButton={false} className={\`gap-3 p-5 \${hasList ? 'sm:max-w-[400px]' : 'sm:max-w-[360px]'}\`}>
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-base leading-none font-bold text-ink">{copy.title}</h2>
          <button type="button" aria-label="Close" onClick={onCancel} className="flex size-7 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted">
            <X className="size-4" />
          </button>
        </div>

        {hasList ? (
          <p className="text-xs leading-relaxed text-ink-muted">
            You are about to {copy.verb}.<br />Select any linked conditions you want to mark as Treated.
          </p>
        ) : (
          <p className="text-xs leading-relaxed text-ink-muted">{copy.question}</p>
        )}

        {hasList && (
          <div className="flex max-h-[46vh] flex-col gap-2.5 overflow-y-auto">
            {linkedConditions.map((c) => {
              const on = treated.includes(c.id)
              return (
                <button
                  key={c.id} type="button" aria-pressed={on}
                  onClick={() => setTreated((t) => (on ? t.filter((x) => x !== c.id) : [...t, c.id]))}
                  className={\`rounded-md text-left transition-shadow outline-none \${on ? 'ring-dash-blue ring-2' : 'ring-1 ring-transparent hover:ring-line'}\`}
                >
                  <FindingCard
                    finding={c}
                    action={
                      <span aria-hidden className={\`flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors \${on ? 'bg-dash-blue border-dash-blue text-white' : 'border-line-strong bg-white'}\`}>
                        {on && <Check className="size-2.5" strokeWidth={3} />}
                      </span>
                    }
                  />
                </button>
              )
            })}
          </div>
        )}

        <div className="flex items-center justify-end gap-2">
          <button type="button" onClick={onCancel} className="flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-[13px] font-medium hover:bg-surface-subtle">
            <X className="size-3" /> Cancel
          </button>
          <button
            type="button" onClick={() => onConfirm(treated)}
            className={\`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-semibold text-white \${copy.destructive ? 'bg-field-error hover:bg-[#b91c1c]' : 'bg-dash-blue hover:bg-dash-blue-hover'}\`}
          >
            <Check className="size-3" /> Confirm
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
`})))()}var U;function W(){return(W=e((()=>{U=`import { useEffect, useState } from 'react'
import { ModalShell, SelectField, TextArea, FormFooter } from '@/components/patients/form'
import { SurfaceWheel, type Surface } from './SurfaceWheel'
import { PROVIDERS, type Finding } from './data'

/* Modal, no drawer -mismo criterio que NewProcedureModal-. Versión acotada
   del drawer de edición del proyecto hermano: ahí es un wizard de 2 pasos
   con estimados en dólares y un segundo paso para re-vincular
   findings/diagnósticos. Acá no hay ningún otro lado de la app que modele
   "estimado de costo" por finding, así que se deja afuera en vez de
   inventar un campo sin dato real detrás; re-vincular se hace desde "New
   Procedure", no hace falta duplicarlo acá. Edit cubre lo que sí es propio
   de esta pantalla: proveedor, superficies y notas. */
export function EditProcedureModal({
  finding, onClose, onSave,
}: {
  finding: Finding | null
  onClose: () => void
  onSave: (patch: Partial<Finding>) => void
}) {
  const [provider, setProvider] = useState('')
  const [surfaces, setSurfaces] = useState<Surface[]>([])
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (!finding) return
    setProvider(finding.provider)
    setSurfaces(finding.surfaces as Surface[])
    setNotes(finding.notes)
  }, [finding])

  if (!finding) return null

  return (
    <ModalShell
      title="Edit Finding"
      onClose={onClose}
      width="max-w-[480px]"
      footer={<FormFooter onCancel={onClose} onSave={() => { onSave({ provider, surfaces, notes }); onClose() }} />}
    >
      <div className="flex flex-col gap-5">
        <div className="rounded-md border border-line bg-surface-subtle px-3 py-2.5">
          <p className="text-xs font-extrabold text-ink">{finding.area}</p>
          <p className="text-xs text-ink-muted">{finding.condition}</p>
        </div>

        <SelectField label="Provider" required options={PROVIDERS} value={provider} onChange={setProvider} />

        {finding.tooth !== null && (
          <div className="flex w-full flex-col items-center gap-2">
            <span className="w-full text-xs font-semibold text-ink-muted">Surface</span>
            <SurfaceWheel value={surfaces} onChange={setSurfaces} size={180} />
          </div>
        )}

        <TextArea label="Notes" placeholder="Document questions, answers, clarifications, or additional notes" value={notes} onChange={setNotes} />
      </div>
    </ModalShell>
  )
}
`})))()}var G;function K(){return(K=e((()=>{G=`import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export const EXAM_PANEL_TABS = ['Findings', 'Review exam'] as const
export type ExamPanelTab = (typeof EXAM_PANEL_TABS)[number]

/* Header que comparten los tres exams: las dos mitades del panel como
   segmented control, más la acción de la mitad activa. */
export function ExamPanelHeader({
  tab, onTabChange, onNewReview,
}: {
  tab: ExamPanelTab
  onTabChange: (t: ExamPanelTab) => void
  onNewReview: () => void
}) {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-1 rounded-lg bg-surface-slate p-1">
        {EXAM_PANEL_TABS.map((t) => (
          <button
            key={t} type="button" onClick={() => onTabChange(t)}
            className={cn(
              'h-8 rounded-md px-3 text-xs font-medium whitespace-nowrap transition-colors',
              tab === t ? 'bg-dash-blue text-white' : 'text-ink-slate hover:text-ink-soft',
            )}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === 'Findings' ? (
        <button type="button" disabled title="Available once the exam has been charted" className="flex h-7 items-center gap-1.5 rounded-md bg-surface-muted px-2.5 text-[11px] font-semibold text-ink-faint">
          <Plus className="size-3" /> No Finding
        </button>
      ) : (
        <button type="button" onClick={onNewReview} className="bg-dash-blue hover:bg-dash-blue-hover flex h-7 items-center gap-1.5 rounded-md px-2.5 text-[11px] font-semibold text-white">
          <Plus className="size-3" /> Review Exam
        </button>
      )}
    </div>
  )
}
`})))()}var q;function J(){return(J=e((()=>{q=`import {
  Activity, ArchiveX, CheckCheck, CircleOff, MoreVertical, Pencil, Play, ShieldX, Trash2, UserRoundX,
} from 'lucide-react'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ACTIONS, type FindingAction } from './actions'
import type { Finding } from './data'

type Fila = { action: Exclude<FindingAction, 'edit'>; Icon: typeof Activity }

const FILAS: Fila[] = [
  { action: 'monitor', Icon: Activity },
  { action: 'treat', Icon: Play },
  { action: 'treated', Icon: CheckCheck },
  { action: 'externally-treated', Icon: CheckCheck },
  { action: 'no-treatment', Icon: CircleOff },
  { action: 'patient-declined', Icon: UserRoundX },
  { action: 'clinic-declined', Icon: ShieldX },
  { action: 'discard', Icon: ArchiveX },
]

export function FindingActionsMenu({
  finding, onEdit, onAction,
}: {
  finding: Finding
  onEdit: () => void
  onAction: (action: Exclude<FindingAction, 'edit'>) => void
}) {
  /* El tratamiento sólo puede arrancar sobre algo todavía abierto. */
  const puedeTratar = finding.status === 'Active' || finding.status === 'Monitoring'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" aria-label={\`Actions for \${finding.area}\`} className="flex size-7 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted">
          <MoreVertical className="size-3.5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[248px]">
        <p className="px-2 py-1.5 text-sm font-bold text-ink">Actions</p>
        <DropdownMenuItem onSelect={onEdit}>
          <Pencil className="size-4" /> Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {FILAS.map(({ action, Icon }) => {
          const copy = ACTIONS[action]
          const disabled = action === 'treat' && !puedeTratar
          return (
            <DropdownMenuItem
              key={action} disabled={disabled}
              className={copy.destructive ? 'text-field-error focus:bg-[#fef2f2] focus:text-field-error' : undefined}
              onSelect={() => onAction(action)}
            >
              <Icon className="size-4" /> {copy.label}
            </DropdownMenuItem>
          )
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-field-error focus:bg-[#fef2f2] focus:text-field-error" onSelect={() => onAction('delete')}>
          <Trash2 className="size-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
`})))()}var Y;function X(){return(X=e((()=>{Y=`import type { ReactNode } from 'react'
import { Calendar, Check, X } from 'lucide-react'
import { STATUS_STYLE, type Finding } from './data'

/* Card de finding, compartida por el panel del exam y las confirmaciones.
   \`action\` llena la esquina superior derecha -el menú en el panel, un tilde
   de selección en los diálogos-. */
export function FindingCard({
  finding, action, className = '',
}: {
  finding: Finding
  action?: ReactNode
  className?: string
}) {
  const style = STATUS_STYLE[finding.status]
  return (
    <div className={\`flex flex-col gap-2.5 rounded-md border-l-[3px] bg-white px-2.5 py-3 shadow-sm \${style.rail} \${className}\`}>
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className={\`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold \${style.badge}\`}>
            {style.good ? <Check className="size-2.5" strokeWidth={3} /> : <X className="size-2.5" />}
            {finding.status}
          </span>
          <span className="text-dash-blue flex items-center gap-1 text-[10px] font-semibold">
            <Calendar className="size-2.5" /> {finding.date}
          </span>
        </div>
        {action}
      </div>
      <div className="flex flex-col gap-0.5 pl-1">
        <p className="text-xs font-extrabold text-ink">{finding.area}</p>
        <p className="text-xs text-ink">Condition: <span className="text-ink-muted">{finding.condition}</span></p>
        <p className="text-xs text-ink">Descriptors: <span className="text-ink-muted">{finding.descriptor}</span></p>
      </div>
    </div>
  )
}
`})))()}var Z;function Q(){return(Q=e((()=>{Z=`import { Calendar, Link2, Link2Off } from 'lucide-react'
import { STATUS_STYLE, type LinkedFinding } from './data'

/* Card compacta que listan los drawers de procedimiento: estado y fecha en
   una línea, id y diente debajo, link/unlink a la derecha. */
export function LinkedFindingCard({
  finding, linked, onToggle,
}: {
  finding: LinkedFinding
  linked: boolean
  onToggle: (linked: boolean) => void
}) {
  const style = STATUS_STYLE[finding.status]
  return (
    <div className={\`flex items-center gap-2 rounded-md border-l-[3px] bg-white px-3 py-2.5 shadow-sm \${style.rail}\`}>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className={\`flex items-center gap-1 text-[11px] font-semibold \${style.good ? 'text-dash-ok-fg' : 'text-field-error'}\`}>
            <span className={\`size-1.5 rounded-full \${style.dot}\`} />
            {finding.status}
          </span>
          <span className="text-dash-blue flex items-center gap-1 text-[10px] font-semibold">
            <Calendar className="size-2.5" /> {finding.date}
          </span>
        </div>
        <p className="mt-0.5 text-[13px] leading-tight font-bold text-ink">{finding.id}</p>
        <p className="text-[13px] leading-tight font-bold text-ink">TOOTH: {finding.tooth}</p>
      </div>
      <div className="flex shrink-0 items-center">
        <button
          type="button" aria-label={\`Link \${finding.id}\`} aria-pressed={linked} onClick={() => onToggle(true)}
          className={\`flex size-7 items-center justify-center rounded-md hover:bg-surface-muted \${linked ? 'text-dash-blue' : 'text-ink-faint'}\`}
        >
          <Link2 className="size-4" />
        </button>
        <button
          type="button" aria-label={\`Unlink \${finding.id}\`} aria-pressed={!linked} onClick={() => onToggle(false)}
          className={\`flex size-7 items-center justify-center rounded-md hover:bg-surface-muted \${linked ? 'text-ink-faint' : 'text-dash-blue'}\`}
        >
          <Link2Off className="size-4" />
        </button>
      </div>
    </div>
  )
}
`})))()}var $;function ee(){return(ee=e((()=>{$=`import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, ChevronRight, ChevronsLeft, ChevronsRight, ListFilter, Search, X } from 'lucide-react'
import { ModalShell } from '@/components/patients/form'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { StepIndicator } from '@/components/clinical/StepIndicator'
import { SurfaceWheel, type Surface } from './SurfaceWheel'
import { LinkedFindingCard } from './LinkedFindingCard'
import { ScopeIcon } from './ScopeIcons'
import { ToothChip } from './ToothIcon'
import {
  DIAGNOSES, LINKED_FINDINGS, PROCEDURES, PROCEDURE_GROUPS, SCOPES,
  type ProcedureFilter, type ProcedureOption, type ProcedureScope,
} from './data'

export type ProcedureDraft = {
  procedure: ProcedureOption
  scope: ProcedureScope
  area: string
  tooth: number | null
  surfaces: Surface[]
  linked: string[]
  diagnoses: string[]
}

/* Julián pidió sacar el tab "Diagnostics" (la lista de condiciones/
   diagnósticos, ej. "Chronic enamel dental caries") del paso 3 por ahora.
   El markup y el estado (\`diagnoses\`, \`DIAGNOSES\`) se dejan tal cual, sólo se
   deja de dibujar el botón que lleva ahí -con eso alcanza, \`tab\` nunca pasa
   a 'Diagnostics' si no hay cómo clickearlo-. Volver a mostrarlo es poner
   esto en \`true\`. */
const CONDICIONES = false

/* Modal, no drawer: en red-clone un formulario complejo se resuelve con
   \`ModalShell\` (ver NewAppointmentModal de Scheduling), nunca con un panel
   deslizante -eso no es un patrón que use este proyecto. Ver
   design-reference/figma/modulos/clinical-mode.md. */
export function NewProcedureModal({
  open, area, teeth, onClose, onSave,
}: {
  open: boolean
  /** Rótulo del área donde se clickeó, ej "Tooth 21" o "Upper left". */
  area: string
  /** Dientes contra los que se puede cargar el procedimiento; el del medio arranca elegido. */
  teeth: number[]
  onClose: () => void
  onSave: (draft: ProcedureDraft) => void
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [keepArea, setKeepArea] = useState(true)
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState<ProcedureFilter>('All')
  const [code, setCode] = useState<string | null>(null)
  const [scope, setScope] = useState<ProcedureScope>('Tooth')
  const [tooth, setTooth] = useState<number | null>(null)
  const [surfaces, setSurfaces] = useState<Record<number, Surface[]>>({})
  const [tab, setTab] = useState<'Findings' | 'Diagnostics'>('Findings')
  const [findingQuery, setFindingQuery] = useState('')
  const [linked, setLinked] = useState<string[]>([])
  const [diagnoses, setDiagnoses] = useState<string[]>([])

  useEffect(() => {
    if (!open) return
    setStep(1); setKeepArea(true); setQuery(''); setGroup('All'); setCode(null); setScope('Tooth')
    setTooth(teeth[Math.floor(teeth.length / 2)] ?? null); setSurfaces({}); setTab('Findings')
    setFindingQuery(''); setLinked([]); setDiagnoses([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (!open) return null

  const procedure = PROCEDURES.find((p) => p.code === code) ?? null
  const q = query.trim().toLowerCase()
  const list = PROCEDURES.filter((p) =>
    (group === 'All' || p.group === group) &&
    (!q || p.code.toLowerCase().includes(q) || p.label.toLowerCase().includes(q)))

  const current = tooth ?? teeth[0] ?? null
  const currentSurfaces = current !== null ? (surfaces[current] ?? []) : []
  const fq = findingQuery.trim().toLowerCase()
  const findings = LINKED_FINDINGS.filter((f) => !fq || f.id.includes(fq) || String(f.tooth).includes(fq))
  const diagnosisList = DIAGNOSES.filter((d) => !fq || d.toLowerCase().includes(fq))

  function step2Move(delta: number) {
    if (current === null) return
    const i = teeth.indexOf(current)
    setTooth(teeth[Math.min(Math.max(i + delta, 0), teeth.length - 1)])
  }

  /** Copia la selección actual a cada diente del rango que no tenga ninguna. */
  function applyToUnset() {
    if (!currentSurfaces.length) return
    setSurfaces((prev) => {
      const next = { ...prev }
      for (const t of teeth) if (!next[t]?.length) next[t] = [...currentSurfaces]
      return next
    })
  }

  function save() {
    if (!procedure) return
    onSave({ procedure, scope, area: keepArea ? area : 'Full mouth', tooth: current, surfaces: currentSurfaces, linked, diagnoses })
    onClose()
  }

  const footer = step === 1 ? (
    <>
      <button type="button" onClick={onClose} className="flex h-9 items-center gap-1.5 rounded-md border border-line bg-white px-6 text-[13px] font-medium whitespace-nowrap shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] hover:bg-surface-subtle">
        <X className="size-3" /> Cancel
      </button>
      <button type="button" disabled={!procedure} onClick={() => setStep(2)} className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 items-center gap-1.5 rounded-md px-6 text-[13px] font-medium whitespace-nowrap text-white disabled:opacity-40">
        Next Step <ArrowRight className="size-3" />
      </button>
    </>
  ) : (
    <>
      <button type="button" onClick={() => setStep(step === 3 ? 2 : 1)} className="flex h-9 items-center gap-1.5 rounded-md border border-line bg-white px-6 text-[13px] font-medium whitespace-nowrap shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] hover:bg-surface-subtle">
        <ArrowLeft className="size-3" /> Return
      </button>
      {step === 2 ? (
        <button type="button" onClick={() => setStep(3)} className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 items-center gap-1.5 rounded-md px-6 text-[13px] font-medium whitespace-nowrap text-white">
          Next Step <ArrowRight className="size-3" />
        </button>
      ) : (
        <button type="button" onClick={save} className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 items-center gap-1.5 rounded-md px-6 text-[13px] font-medium whitespace-nowrap text-white">
          <Check className="size-3" /> Save
        </button>
      )}
    </>
  )

  return (
    <ModalShell title="New Procedure" onClose={onClose} width="max-w-[560px]" footer={footer}>
      <StepIndicator total={3} current={step} />

      <div className="mt-5">
        {step === 1 && (
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full flex-col items-start gap-2 border-b border-line pb-4">
              <span className="text-xs font-semibold text-ink-muted">Selected area</span>
              {keepArea ? (
                <button type="button" onClick={() => setKeepArea(false)} aria-label={\`Remove \${area}\`} className="bg-dash-count-bg text-dash-blue inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold">
                  <X className="size-3" /> {area}
                </button>
              ) : (
                <span className="text-xs font-medium text-ink-faint">Full mouth</span>
              )}
            </div>

            <div className="flex w-full flex-col items-start gap-1.5">
              <span className="text-xs font-semibold text-ink-muted">Procedure<span className="text-field-error">*</span></span>
              <div className="flex w-full items-center gap-2">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
                  <input
                    value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..."
                    className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] placeholder:text-ink-faint focus:outline-none"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button type="button" className="flex h-9 items-center gap-1.5 rounded-md border border-line px-3 text-[13px] font-medium hover:bg-surface-subtle">
                      <ListFilter className="size-3.5" /> Filter
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[180px]">
                    {PROCEDURE_GROUPS.map((g) => (
                      <DropdownMenuItem key={g} onSelect={() => setGroup(g)}>
                        {g === group && <Check className="text-dash-blue size-3.5" />}
                        <span className={g === group ? 'font-semibold' : 'ml-5'}>{g}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <button type="button" onClick={() => setGroup('All')} className="text-dash-blue flex items-center gap-0.5 text-xs font-bold hover:underline">
              {group} <ChevronRight className="size-3.5" />
            </button>

            <div className="flex max-h-[320px] w-full flex-col items-start gap-2 overflow-y-auto">
              {list.map((p) => {
                const on = p.code === code
                return (
                  <div key={p.code} className={\`flex w-full items-center gap-2 rounded-md border px-3 py-2 transition-colors \${on ? 'border-dash-blue' : 'border-line hover:border-line-strong'}\`}>
                    <button type="button" onClick={() => setCode(p.code)} className="min-w-0 flex-1 text-left text-xs outline-none">
                      <span className="text-dash-blue font-bold">{p.code}</span>
                      <span className="font-medium text-ink"> - {p.label}</span>
                    </button>
                    <span className="flex shrink-0 items-center gap-1">
                      {SCOPES.map((s) => (
                        <button
                          key={s} type="button" title={\`Chart on \${s.toLowerCase()}\`} aria-label={\`\${p.code} on \${s.toLowerCase()}\`}
                          aria-pressed={on && scope === s} onClick={() => { setCode(p.code); setScope(s) }}
                          className={\`bg-dash-blue hover:bg-dash-blue-hover flex size-6 items-center justify-center rounded-md text-white transition-all \${on && scope === s ? 'ring-dash-blue ring-2 ring-offset-1' : ''}\`}
                        >
                          <ScopeIcon scope={s} className="size-3.5" />
                        </button>
                      ))}
                    </span>
                  </div>
                )
              })}
              {!list.length && <p className="w-full py-6 text-center text-xs text-ink-faint">No procedure matches that search.</p>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex w-full flex-col items-start gap-5">
            <div className="flex w-full flex-col items-start gap-1.5">
              <span className="text-xs font-semibold text-ink-muted">Procedure<span className="text-field-error">*</span></span>
              <div className="border-dash-blue flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2">
                <span className="min-w-0 text-xs font-semibold text-ink">{procedure?.code} - {procedure?.label}</span>
                <ToothChip />
              </div>
            </div>

            <div className="flex w-full flex-col items-center gap-3">
              <span className="w-full text-xs font-semibold text-ink-muted">Surface</span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {teeth.map((t) => (
                  <button
                    key={t} type="button" onClick={() => setTooth(t)} aria-pressed={t === current}
                    className={\`min-w-8 rounded-md px-2 py-1 text-sm font-bold transition-colors \${t === current ? 'bg-dash-blue text-white' : 'text-ink hover:bg-surface-muted'}\`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <SurfaceWheel value={currentSurfaces} onChange={(next) => current !== null && setSurfaces((prev) => ({ ...prev, [current]: next }))} />
              <div className="flex items-center gap-3">
                <button
                  type="button" aria-label="Previous tooth" disabled={current === teeth[0]} onClick={() => step2Move(-1)}
                  className="bg-dash-blue hover:bg-dash-blue-hover flex size-10 items-center justify-center rounded-full text-white disabled:opacity-40"
                >
                  <ChevronsLeft className="size-4" />
                </button>
                <button
                  type="button" disabled={!currentSurfaces.length} onClick={applyToUnset}
                  className="flex h-10 items-center rounded-md border border-line px-4 text-[13px] font-medium hover:bg-surface-subtle disabled:opacity-40"
                >
                  Apply to unset
                </button>
                <button
                  type="button" aria-label="Next tooth" disabled={current === teeth[teeth.length - 1]} onClick={() => step2Move(1)}
                  className="bg-dash-blue hover:bg-dash-blue-hover flex size-10 items-center justify-center rounded-full text-white disabled:opacity-40"
                >
                  <ChevronsRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex w-full flex-col items-start gap-4">
            {CONDICIONES && (
              <div className="flex items-center gap-1 rounded-lg bg-surface-slate p-1">
                {(['Findings', 'Diagnostics'] as const).map((t) => (
                  <button
                    key={t} type="button" onClick={() => setTab(t)}
                    className={\`h-8 rounded-md px-3 text-xs font-medium \${tab === t ? 'bg-dash-blue text-white' : 'text-ink-slate hover:text-ink-soft'}\`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}

            <div className="flex w-full flex-col gap-1">
              <p className="text-sm font-bold text-ink">{tab === 'Findings' ? 'Link Findings' : 'Add Diagnostic'}</p>
              <p className="text-[11px] leading-relaxed text-ink-faint">
                You can link clinical findings that may be resolved by this procedure.
              </p>
            </div>

            <div className="relative w-full">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
              <input
                value={findingQuery} onChange={(e) => setFindingQuery(e.target.value)} placeholder="Search"
                className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] placeholder:text-ink-faint focus:outline-none"
              />
            </div>

            <div className="max-h-[280px] w-full overflow-y-auto">
              {tab === 'Findings' ? (
                <div className="flex w-full flex-col gap-2.5">
                  {findings.map((f) => (
                    <LinkedFindingCard
                      key={f.id} finding={f} linked={linked.includes(f.id)}
                      onToggle={(on) => setLinked((prev) => (on ? [...new Set([...prev, f.id])] : prev.filter((x) => x !== f.id)))}
                    />
                  ))}
                  {!findings.length && <p className="w-full py-6 text-center text-xs text-ink-faint">No finding matches that search.</p>}
                </div>
              ) : (
                <div className="flex w-full flex-col gap-2">
                  {diagnosisList.map((d) => {
                    const on = diagnoses.includes(d)
                    return (
                      <button
                        key={d} type="button" aria-pressed={on}
                        onClick={() => setDiagnoses((prev) => (on ? prev.filter((x) => x !== d) : [...prev, d]))}
                        className={\`flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2 text-left transition-colors \${on ? 'border-dash-blue' : 'border-line hover:border-line-strong'}\`}
                      >
                        <span className="min-w-0 text-xs font-medium text-ink">{d}</span>
                        <ToothChip />
                      </button>
                    )
                  })}
                  {!diagnosisList.length && <p className="w-full py-6 text-center text-xs text-ink-faint">No diagnosis matches that search.</p>}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ModalShell>
  )
}
`})))()}var te;function ne(){return(ne=e((()=>{te=`import { useCallback, useEffect, useState } from 'react'
import { Check, ChevronDown, TriangleAlert } from 'lucide-react'
import { ModalShell } from '@/components/patients/form'
import { cn } from '@/lib/utils'

/* Panel de controles del odontograma, dibujado con los componentes de esta
   app en vez de estilar el markup de la librería.

   Cómo funciona: la librería sigue montada y con toda su lógica, pero su
   panel queda fuera de pantalla (ver \`.controles-abiertos .panel\` en
   odontogram-theme.css). Acá se leen sus controles reales -selects,
   checkboxes y botones- y se dibujan de nuevo con nuestro diseño; cada
   interacción escribe sobre el control original y dispara su evento, así
   que la librería reacciona igual que si la hubieran tocado a ella.
   Ver design-reference/figma/modulos/clinical-mode.md. */

type Celda = { pos: string; letra: string; nombre: string; activo: boolean; el: HTMLInputElement }

type Control =
  | { tipo: 'cruz'; clave: string; celdas: Celda[] }
  | { tipo: 'select'; clave: string; label: string; valor: string; opciones: { v: string; t: string }[]; off: boolean; el: HTMLSelectElement }
  | { tipo: 'check'; clave: string; label: string; activo: boolean; off: boolean; el: HTMLInputElement }
  | { tipo: 'accion'; clave: string; label: string; off: boolean; el: HTMLButtonElement }

const visible = (el: HTMLElement) => el.offsetParent !== null || el.getClientRects().length > 0

/** El texto propio del contenedor, salteando el control -y cualquier nodo
    que lo contenga-: si no, el label se come el texto de las \`<option>\`. */
function etiquetaDe(contenedor: Element | null, control: Element, porDefecto: string) {
  if (!contenedor) return porDefecto
  const texto = [...contenedor.childNodes]
    .filter((n) => {
      if (n === control || n.contains(control)) return false
      return n.nodeType === Node.TEXT_NODE || (n instanceof HTMLElement && ['SPAN', 'LABEL', 'STRONG', 'B'].includes(n.tagName))
    })
    .map((n) => n.textContent ?? '')
    .join(' ')
    .replace(/\\s+/g, ' ')
    .trim()
  return texto || porDefecto
}

function leerControles(card: HTMLElement): Control[] {
  const lista: Control[] = []

  /* El selector de superficies es una cruz de 5 celdas, no cinco checkboxes
     sueltos: se lee aparte para poder dibujarlo como corresponde. */
  ;[...card.querySelectorAll<HTMLElement>('.surface-cross')].forEach((cruz, i) => {
    const celdas = [...cruz.querySelectorAll<HTMLLabelElement>('.surface-cell')]
      .map((celda) => {
        const input = celda.querySelector<HTMLInputElement>('input[type="checkbox"]')
        if (!input) return null
        const pos = [...celda.classList].find((c) => c.startsWith('pos-'))?.slice(4) ?? ''
        return {
          pos,
          letra: celda.querySelector('.surf-letter')?.textContent?.trim() || pos.charAt(0).toUpperCase(),
          nombre: celda.querySelector('.surf-name')?.textContent?.trim() || pos,
          activo: input.checked,
          el: input,
        }
      })
      .filter((c): c is Celda => c !== null)
    if (celdas.length) lista.push({ tipo: 'cruz', clave: cruz.id || \`cruz-\${i}\`, celdas })
  })

  card.querySelectorAll<HTMLSelectElement>('select').forEach((el, i) => {
    if (!visible(el)) return
    lista.push({
      tipo: 'select',
      off: el.disabled,
      clave: el.id || \`sel-\${i}\`,
      label: etiquetaDe(el.closest('.row') ?? el.parentElement, el, 'Option'),
      valor: el.value,
      opciones: [...el.options].map((o) => ({ v: o.value, t: o.textContent ?? o.value })),
      el,
    })
  })

  card.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach((el, i) => {
    if (!visible(el) || el.closest('.surface-cross')) return
    lista.push({
      tipo: 'check',
      off: el.disabled,
      clave: el.id || \`chk-\${i}\`,
      label: etiquetaDe(el.closest('label') ?? el.parentElement, el, 'Option'),
      activo: el.checked,
      el,
    })
  })

  card.querySelectorAll<HTMLButtonElement>('button').forEach((el, i) => {
    if (!visible(el)) return
    const texto = (el.textContent ?? '').trim()
    /* El botón de plegar la card no viene: el panel ya se pliega solo. */
    if (!texto || texto === '−' || texto === '-') return
    lista.push({ tipo: 'accion', clave: el.id || \`btn-\${i}\`, label: texto, off: el.disabled, el })
  })

  return lista
}

/* Los controles reales se accionan **como lo haría una persona**, no
   escribiéndoles el valor a mano: poner \`.checked\` o \`.value\` y disparar un
   \`change\` sintético cambia el DOM pero no siempre entra en el estado de la
   librería, y al re-renderizar volvía todo al default. */
function tocarCheckbox(el: HTMLInputElement) {
  el.click()
}

function elegirEnSelect(el: HTMLSelectElement, valor: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value')?.set
  if (setter) setter.call(el, valor)
  else el.value = valor
  el.dispatchEvent(new Event('input', { bubbles: true }))
  el.dispatchEvent(new Event('change', { bubbles: true }))
}

/* Las cinco superficies en cruz -vestibular arriba, lingual/palatina abajo,
   mesial y distal a los costados y la oclusal al medio-, que es como se
   lee un odontograma. Cada celda escribe sobre su checkbox real. */
const LUGAR: Record<string, string> = {
  buccal: 'col-start-2 row-start-1',
  mesial: 'col-start-1 row-start-2',
  occlusal: 'col-start-2 row-start-2',
  distal: 'col-start-3 row-start-2',
  lingual: 'col-start-2 row-start-3',
}

function CruzSuperficies({ celdas, onCambio, bloqueo }: { celdas: Celda[]; onCambio: () => void; bloqueo?: string }) {
  return (
    <div className="flex flex-col gap-2">
      {bloqueo && (
        <p className="bg-dash-count-bg text-dash-blue rounded-md px-3 py-2 text-[12px] font-medium">{bloqueo}</p>
      )}
      <div className="flex items-center gap-4">
      <div className={cn('grid size-[132px] shrink-0 grid-cols-3 grid-rows-3 gap-1', bloqueo && 'pointer-events-none opacity-40')}>
        {celdas.map((c) => (
          <button
            key={c.pos}
            type="button"
            role="checkbox"
            aria-checked={c.activo}
            aria-label={c.nombre}
            title={c.nombre}
            onClick={() => { tocarCheckbox(c.el); onCambio() }}
            className={cn(
              'flex items-center justify-center rounded-md border text-[13px] font-semibold transition-colors',
              LUGAR[c.pos] ?? '',
              c.activo
                ? 'border-dash-blue bg-dash-blue text-white'
                : 'border-line bg-white text-ink-muted hover:border-dash-blue hover:text-dash-blue',
            )}
          >
            {c.letra}
          </button>
        ))}
      </div>
      <ul className={cn('flex flex-col gap-1 text-[11px] text-ink-muted', bloqueo && 'opacity-40')}>
        {celdas.map((c) => (
          <li key={c.pos} className={cn(c.activo && 'text-dash-blue font-medium')}>
            <span className="inline-block w-4 font-semibold">{c.letra}</span> {c.nombre}
          </li>
        ))}
      </ul>
      </div>
    </div>
  )
}

export function OdontogramPanel({ card, vacio, onTocar }: {
  card: HTMLElement | null
  vacio?: React.ReactNode
  /** Avisa que en este paso se cambió algo, para el resumen de pendientes. */
  onTocar?: () => void
}) {
  const [controles, setControles] = useState<Control[]>([])
  /* La librería no marca sus botones de selección rápida -probado: no tocan
     ni clase ni aria-pressed-, así que el "cuál aprieté" lo lleva el panel.
     Se guarda **por sección**: al volver a un paso tiene que seguir marcado
     lo que se había dejado elegido. */
  const [accionPorPaso, setAccionPorPaso] = useState<Record<string, string | null>>({})
  /* Reset y Clear sí borran lo cargado: se confirman antes. */
  const [confirmando, setConfirmando] = useState<Extract<Control, { tipo: 'accion' }> | null>(null)

  const releer = useCallback(() => {
    setControles(card ? leerControles(card) : [])
  }, [card])

  useEffect(() => {
    if (!card) { setControles([]); return }
    releer()
    /* La librería reescribe la card al cambiar de pieza o de estado. */
    const observer = new MutationObserver(releer)
    observer.observe(card, { childList: true, subtree: true, attributes: true })
    return () => observer.disconnect()
  }, [card, releer])

  const clavePaso = card?.id || card?.querySelector('.card-title')?.textContent?.trim() || 'paso'
  const accionActiva = accionPorPaso[clavePaso] ?? null
  const marcarAccion = (clave: string | null) => setAccionPorPaso((p) => ({ ...p, [clavePaso]: clave }))

  const cruces = controles.filter((c): c is Extract<Control, { tipo: 'cruz' }> => c.tipo === 'cruz')
  const selects = controles.filter((c): c is Extract<Control, { tipo: 'select' }> => c.tipo === 'select')
  const checks = controles.filter((c): c is Extract<Control, { tipo: 'check' }> => c.tipo === 'check')
  const acciones = controles.filter((c): c is Extract<Control, { tipo: 'accion' }> => c.tipo === 'accion')

  if (controles.length === 0) {
    return <div className="px-1 py-6 text-center text-[13px] text-ink-faint">{vacio ?? 'Nothing to set for this tooth.'}</div>
  }

  /* Sin pieza elegida la librería deshabilita todo. Sin un aviso parecía que
     el panel no andaba: se tocaba una superficie y no pasaba nada. */
  const sinPieza = selects.length > 0 && selects.every((c) => c.off)
  const material = card?.querySelector<HTMLSelectElement>('#fillingSelect')
  const sinMaterial = !!material && material.value === 'none'

  return (
    <div className="flex flex-col gap-4">
      {sinPieza && (
        <p className="bg-dash-count-bg text-dash-blue rounded-md px-3 py-2 text-[12px] font-medium">
          Pick a tooth on the chart to edit it — these fields stay off until then.
        </p>
      )}

      <div className="flex flex-wrap items-start gap-6">
      {selects.length > 0 && (
        <div className="grid min-w-0 flex-1 grid-cols-[repeat(auto-fill,minmax(200px,280px))] gap-x-6 gap-y-4">
          {selects.map((c) => (
            <label key={c.clave} className="flex min-w-0 flex-col gap-1.5">
              <span className="truncate text-[11px] font-medium text-ink-muted">{c.label}</span>
              <span className="relative block">
              <select
                value={c.valor}
                disabled={c.off}
                onChange={(e) => { elegirEnSelect(c.el, e.target.value); releer(); onTocar?.() }}
                className={cn(
                  'h-9 w-full min-w-0 appearance-none rounded-md border pr-8 pl-2.5 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] transition-colors',
                  'focus:border-dash-blue focus:ring-2 focus:ring-dash-blue/20 focus:outline-none',
                  c.off ? 'border-line bg-surface-subtle text-ink-faint' : 'border-line bg-white text-ink hover:border-line-strong',
                )}
              >
                {c.opciones.map((o) => <option key={o.v} value={o.v}>{o.t}</option>)}
              </select>
              <ChevronDown className={cn('pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2', c.off ? 'text-line-strong' : 'text-black')} />
              </span>
            </label>
          ))}
        </div>
      )}

      {cruces.map((c) => (
        <CruzSuperficies
          key={c.clave}
          celdas={c.celdas}
          onCambio={() => { releer(); onTocar?.() }}
          /* En Fillings marcar la superficie con el tipo en "No filling" no
             hace nada, y elegir el tipo después tampoco lo recupera: hay que
             elegir el material primero. Comprobado contra el resumen. */
          bloqueo={sinMaterial ? 'Choose a filling type first — marking a surface before that has no effect.' : undefined}
        />
      ))}
      </div>

      {checks.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {checks.map((c) => (
            <button
              key={c.clave}
              type="button"
              role="checkbox"
              aria-checked={c.activo}
              disabled={c.off}
              onClick={() => { tocarCheckbox(c.el); releer(); onTocar?.() }}
              className={cn(
                'flex h-8 items-center gap-2 rounded-md border px-2.5 text-[12px] transition-colors disabled:opacity-50',
                c.activo ? 'border-dash-blue bg-dash-count-bg text-dash-blue font-medium' : 'border-line bg-white text-ink-soft hover:bg-surface-subtle',
              )}
            >
              <span className={cn('flex size-3.5 shrink-0 items-center justify-center rounded-[3px] border', c.activo ? 'bg-dash-blue border-dash-blue' : 'border-ink-faint')}>
                {c.activo && <Check className="size-2.5 text-white" strokeWidth={3} />}
              </span>
              <span className="truncate">{c.label}</span>
            </button>
          ))}
        </div>
      )}

      {confirmando && (
        <ModalShell
          title={confirmando.label}
          onClose={() => setConfirmando(null)}
          width="max-w-[420px]"
          footer={
            <>
              <button type="button" onClick={() => setConfirmando(null)} className="h-9 rounded-md border border-line bg-white px-5 text-[13px] font-medium hover:bg-surface-subtle">
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  confirmando.el.click()
                  marcarAccion(/clear/i.test(confirmando.label) ? null : confirmando.clave)
                  setConfirmando(null)
                }}
                className="h-9 rounded-md bg-dash-bad-fg px-5 text-[13px] font-medium text-white hover:bg-[#961f1f]"
              >
                {confirmando.label}
              </button>
            </>
          }
        >
          <p className="flex items-start gap-2 text-[13px] leading-relaxed text-ink-soft">
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-warn-fg" />
            This clears everything charted for the current selection — surfaces, conditions and restorations. It cannot be undone.
          </p>
        </ModalShell>
      )}

      {acciones.length > 0 && (
        <div className="flex flex-wrap gap-2 border-t border-line-soft pt-3">
          {acciones.map((c) => (
            <button
              key={c.clave}
              type="button"
              disabled={c.off}
              aria-pressed={accionActiva === c.clave}
              onClick={() => {
                if (/reset|clear|edentulous/i.test(c.label)) { setConfirmando(c); return }
                c.el.click()
                marcarAccion(c.clave)
                onTocar?.()
              }}
              className={cn(
                'h-8 rounded-md border px-3 text-[12px] font-medium transition-colors disabled:opacity-50',
                accionActiva === c.clave
                  ? 'border-dash-blue bg-dash-blue text-white'
                  : 'border-line bg-white text-ink-soft hover:bg-surface-subtle',
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
`})))()}var re;function ie(){return(ie=e((()=>{re=`import { useEffect } from 'react'

/* Arrastrar sobre el gráfico de la arcada carga "Buccal PD" -o "Palatal
   PD"/"Lingual PD" en el gráfico de abajo, misma mecánica- de un trazo, en
   vez de tipear cada sitio: al apretar y mover el mouse por el dibujo, la
   altura del cursor pasa a ser la profundidad (1-15mm) del sitio que tiene
   debajo, y la curva se redibuja sola porque la librería la arma a partir
   de esos mismos inputs. Pedido por Julián con un video de referencia.
   Ver design-reference/figma/modulos/clinical-mode.md.

   Cada diente tiene 3 sitios por cara (MB/B/DB o ML/L/DL): el arrastre no
   distingue diente de sitio, sólo recorre los 48 inputs de la fila en el
   orden en que están en el DOM -que es el orden en que se ven-, así que
   cada sitio es un punto propio de la curva, igual que en el video de
   referencia.

   Los dos gráficos de una arcada (\`.perio-tooth-arch-buccal\` y
   \`.perio-tooth-arch-palatal\`) se activan igual: el aspecto ("buccal" /
   "palatal") sale del propio nombre de clase del SVG, y con eso se arma el
   selector de los inputs de esa fila -son el mismo valor que ya usa la
   librería en \`data-perio-aspect\`, así que no hay mapeo propio que
   mantener-. */

const MINIMO = 1
const MAXIMO = 15

function fijarValor(input: HTMLInputElement, valor: number) {
  if (Number(input.value) === valor) return
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, String(valor))
  input.dispatchEvent(new Event('input', { bubbles: true }))
  input.dispatchEvent(new Event('change', { bubbles: true }))
}

/* Dos puntos del propio eje mm (los números "5"/"10"/"15" que dibuja la
   librería) alcanzan para la escala real en pantalla: no hace falta saber
   nada del viewBox interno, y se ajusta solo si el gráfico cambia de alto. */
function calibrarEscala(svg: SVGSVGElement) {
  const puntos = [...svg.querySelectorAll<SVGTextElement>('.perio-mm-grid text')]
    .map((t) => {
      const r = t.getBoundingClientRect()
      return { mm: Number(t.textContent), y: r.top + r.height / 2 }
    })
    .filter((p) => Number.isFinite(p.mm))
  if (puntos.length < 2) return null
  const a = puntos[0]
  const b = puntos[puntos.length - 1]
  if (a.y === b.y) return null
  const pxPorMm = (b.y - a.y) / (b.mm - a.mm)
  return (clientY: number) => {
    const mm = a.mm + (clientY - a.y) / pxPorMm
    return Math.min(MAXIMO, Math.max(MINIMO, Math.round(mm)))
  }
}

function activar(celdaGrafico: HTMLElement) {
  if (celdaGrafico.dataset.arrastreListo) return
  celdaGrafico.dataset.arrastreListo = 'si'

  const arco = celdaGrafico.closest<HTMLElement>('.perio-fullgrid-arch')
  if (!arco) return

  let entradas: HTMLInputElement[] = []
  let aValor: ((y: number) => number) | null = null
  let indicePrevio = -1

  const indiceDesdeX = (x: number) => {
    let mejor = 0
    let distMejor = Infinity
    entradas.forEach((el, i) => {
      const r = el.getBoundingClientRect()
      const dist = Math.abs(x - (r.left + r.width / 2))
      if (dist < distMejor) { distMejor = dist; mejor = i }
    })
    return mejor
  }

  /* Si el mouse saltea sitios entre dos eventos (arrastre rápido), se
     interpola el valor entre el sitio anterior y el actual: si no, la
     curva quedaba con escalones en vez de una línea continua. */
  const trazarHasta = (indice: number, valor: number) => {
    if (indicePrevio === -1) {
      fijarValor(entradas[indice], valor)
    } else {
      const desde = indicePrevio
      const valorDesde = Number(entradas[desde].value) || valor
      const paso = indice >= desde ? 1 : -1
      for (let i = desde; ; i += paso) {
        const t = indice === desde ? 1 : (i - desde) / (indice - desde)
        fijarValor(entradas[i], Math.round(valorDesde + (valor - valorDesde) * t))
        if (i === indice) break
      }
    }
    indicePrevio = indice
  }

  const mover = (e: PointerEvent) => {
    if (!aValor || entradas.length === 0) return
    trazarHasta(indiceDesdeX(e.clientX), aValor(e.clientY))
  }

  const terminar = () => {
    indicePrevio = -1
    window.removeEventListener('pointermove', mover)
    window.removeEventListener('pointerup', terminar)
  }

  celdaGrafico.addEventListener('pointerdown', (e) => {
    const svg = celdaGrafico.querySelector<SVGSVGElement>('svg')
    const aspecto = svg?.getAttribute('class')?.match(/perio-tooth-arch-(\\w+)/)?.[1]
    entradas = aspecto
      ? [...arco.querySelectorAll<HTMLInputElement>(
        \`.perio-fullgrid-cell[data-perio-aspect="\${aspecto}"][data-perio-field="pd"] input\`,
      )]
      : []
    aValor = svg ? calibrarEscala(svg) : null
    if (entradas.length === 0 || !aValor) return
    e.preventDefault()
    indicePrevio = -1
    window.addEventListener('pointermove', mover)
    window.addEventListener('pointerup', terminar)
    mover(e)
  })
}

export function PerioPdArrastre({ raiz }: { raiz: HTMLElement | null }) {
  useEffect(() => {
    if (!raiz) return
    const revisar = () => {
      raiz.querySelectorAll<HTMLElement>('.perio-fullgrid-graphic-cell').forEach((celda) => {
        if (celda.querySelector('.perio-tooth-arch')) activar(celda)
      })
    }
    revisar()
    const observer = new MutationObserver(revisar)
    observer.observe(raiz, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [raiz])

  return null
}
`})))()}var ae;function oe(){return(oe=e((()=>{ae=`import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'

/* El tab "Periodontal Status" trae las dos arcadas (1-16 y 32-17) puestas
   una abajo de la otra dentro de un mismo scroll: para ver la inferior hay
   que bajar más de 1000px. Primero se probó con dos desplegables, pero
   Julián pidió tabs -Maxillary/Mandibular- para no tener que scrollear ni
   para cambiar de arcada ni dentro de ella.

   La grilla (\`.perio-fullgrid-arch\`) la arma la librería con DOM plano, no
   JSX (ver PerioChart.tsx del paquete): no hay prop para partirla, así que
   se sacan sus dos hijos del \`.perio-fullgrid-scroll\` y se reinsertan cada
   uno adentro de su propio panel de tab. Es la pieza real que se muda, no
   una copia: son ~330 celdas interactivas por arcada y clonarlas perdería
   sus listeners.

   Ver design-reference/figma/modulos/clinical-mode.md. */

const TITULOS = ['Maxillary', 'Mandibular']

/* Ancho de la columna de rótulos ("Miller Class", "Buccal BOP"…) y ancho de
   las columnas de dientes: van inline en el \`gridTemplateColumns\` de la
   arcada, que la librería recalcula sola (\`ROW_LABEL_WIDTH = 220\` en su
   código) pero SIN reaccionar a cambios de tamaño del contenedor -se
   probó angostar el \`.perio-fullgrid-scroll\` y no vuelve a correr el
   ajuste, ni con \`max-width\` ni con un resize real de ventana-, así que
   hay que pisarlo.

   Las columnas de dientes pasan a \`fr\` en vez de un px fijo: así rellenan
   TODO el ancho disponible del panel -el \`max-width\` de
   \`.perio-tabs-cuerpo\`, en el CSS- en vez de quedarse en un tamaño fijo
   que en una pantalla más ancha deja un hueco vacío a la derecha, o en una
   más angosta obliga a scrollear. Angostar el panel de paso es lo que
   también achica el gráfico de dientes+curva sin deformarlo: esa fila
   comparte la MISMA grilla, y su SVG mide \`width:100%; height:auto\` -el
   alto sale solo de un ancho más chico, manteniendo la proporción real del
   diente-. */
const ANCHO_ROTULO = 130

function ajustarColumnas(arco: HTMLElement) {
  const aplicar = () => {
    const actual = arco.style.gridTemplateColumns
    if (!actual) return
    if (actual === arco.dataset.columnasPropias) return
    const partes = actual.split(' ')
    /* \`minmax(0, Nfr)\`, no \`Nfr\` a secas: un track \`fr\` sin mínimo explícito
       vale \`minmax(auto, Nfr)\` -su "auto" es el min-content del contenido
       más ancho de esa columna en CUALQUIER fila-, así que con checkboxes o
       números que no quieren achicarse más de cierto punto la grilla
       "explota" mucho más ancha que el contenedor en vez de repartir el
       espacio de verdad. Con el mínimo en 0 el reparto es proporcional
       siempre, sin ese piso. */
    const nuevas = [
      \`\${ANCHO_ROTULO}px\`,
      ...partes.slice(1).map((p) => \`minmax(0, \${parseFloat(p).toFixed(2)}fr)\`),
    ].join(' ')
    arco.style.gridTemplateColumns = nuevas
    arco.dataset.columnasPropias = nuevas
  }
  aplicar()
  /* Se reaplica ante cualquier mutación de estilo -por si la librería
     alguna vez vuelve a escribir el suyo-, pero no hace falta debounce:
     \`aplicar\` no reescribe si el valor ya es el propio, así que la mutación
     que dispara se apaga sola. */
  if (!arco.dataset.columnasObservadas) {
    arco.dataset.columnasObservadas = 'si'
    new MutationObserver(aplicar).observe(arco, { attributes: true, attributeFilter: ['style'] })
  }
}

export function PeriodontalTabs({ raiz }: { raiz: HTMLElement | null }) {
  const [scroller, setScroller] = useState<HTMLElement | null>(null)
  const [arcos, setArcos] = useState<HTMLElement[]>([])
  const [activa, setActiva] = useState(0)
  const cuerpos = useRef<(HTMLDivElement | null)[]>([])

  /* El tab se desmonta entero al cambiar a Odontogram/Diagnoses -no es un
     \`display:none\`-, así que cada vez que se vuelve a abrir aparece un
     \`.perio-fullgrid-scroll\` nuevo con sus arcadas de vuelta enteras.
     Se lo detecta por mutaciones en \`raiz\` y se reparte una única vez por
     montaje (marcado con \`data-tabs\`). */
  useEffect(() => {
    if (!raiz) return
    let pedido = 0
    const revisar = () => {
      const encontrado = raiz.querySelector<HTMLElement>('.perio-fullgrid-scroll')
      if (!encontrado) {
        setScroller(null)
        setArcos([])
        return
      }
      if (encontrado.dataset.tabs) return
      const hijos = [...encontrado.querySelectorAll<HTMLElement>(':scope > .perio-fullgrid-arch')]
      if (hijos.length !== 2) return
      encontrado.dataset.tabs = 'si'
      encontrado.classList.add('perio-tabs-raiz')
      hijos.forEach((h) => encontrado.removeChild(h))
      setScroller(encontrado)
      setArcos(hijos)
      setActiva(0)
    }
    revisar()
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(pedido)
      pedido = requestAnimationFrame(revisar)
    })
    observer.observe(raiz, { childList: true, subtree: true })
    return () => {
      cancelAnimationFrame(pedido)
      observer.disconnect()
    }
  }, [raiz])

  /* Recién acá los arcos ya tienen dónde ir: React montó los \`div\` de cada
     panel en el mismo render en que se guardaron. */
  useEffect(() => {
    arcos.forEach((arco, i) => {
      const cuerpo = cuerpos.current[i]
      if (cuerpo && arco.parentElement !== cuerpo) cuerpo.appendChild(arco)
      ajustarColumnas(arco)
    })
  }, [arcos])

  if (!scroller || arcos.length === 0) return null

  return createPortal(
    <>
      <div className="perio-tabs-cabecera">
        {arcos.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-selected={activa === i}
            onClick={() => setActiva(i)}
            className={cn(
              'perio-tabs-boton',
              activa === i ? 'perio-tabs-boton-activo' : 'perio-tabs-boton-inactivo',
            )}
          >
            {TITULOS[i] ?? \`Arch \${i + 1}\`}
          </button>
        ))}
      </div>
      {arcos.map((_, i) => (
        <div
          key={i}
          ref={(el) => { cuerpos.current[i] = el }}
          className={cn('perio-tabs-cuerpo', activa !== i && 'hidden')}
        />
      ))}
    </>,
    scroller,
  )
}
`})))()}var se;function ce(){return(ce=e((()=>{se=`import { useEffect, useState } from 'react'
import { Check, CircleAlert, X } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { TextArea } from '@/components/patients/form'

/* Firmar el exam: hace falta una nota antes de poder confirmar. */
export function ReviewExamDialog({
  open, onCancel, onConfirm,
}: {
  open: boolean
  onCancel: () => void
  onConfirm: (note: string) => void
}) {
  const [nota, setNota] = useState('')

  useEffect(() => { if (open) setNota('') }, [open])

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <DialogContent showCloseButton={false} className="gap-3 p-5 sm:max-w-[400px]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-line text-ink">
              <CircleAlert className="size-4" />
            </span>
            <h2 className="text-base leading-none font-bold text-ink">Review Exam</h2>
          </div>
          <button type="button" aria-label="Close" onClick={onCancel} className="flex size-7 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted">
            <X className="size-4" />
          </button>
        </div>

        <p className="text-xs leading-relaxed text-ink-muted">Are you sure you want to review this exam?</p>

        <TextArea label="Review" required placeholder="Add review" value={nota} onChange={setNota} />

        <div className="flex items-center justify-end gap-2">
          <button type="button" onClick={onCancel} className="flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-[13px] font-medium hover:bg-surface-subtle">
            <X className="size-3" /> Cancel
          </button>
          <button
            type="button" disabled={!nota.trim()} onClick={() => onConfirm(nota.trim())}
            className="bg-dash-blue hover:bg-dash-blue-hover flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-semibold text-white disabled:opacity-40"
          >
            <Check className="size-3" /> Confirm
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
`})))()}var le;function ue(){return(ue=e((()=>{le=`import { useState } from 'react'
import { NotebookText, X } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export type ExamReview = { id: string; date: string; provider: string; note: string }

const iniciales = (nombre: string) => nombre.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()

/* Quién revisó el exam y cuándo, más reciente primero. */
export function ReviewList({ reviews }: { reviews: ExamReview[] }) {
  const [leyendo, setLeyendo] = useState<ExamReview | null>(null)

  if (!reviews.length) {
    return (
      <div className="bg-dash-count-bg flex flex-1 flex-col items-center justify-center gap-1 rounded-xl px-4 py-10 text-center">
        <p className="text-dash-blue text-xs font-medium">This exam hasn't been reviewed yet.</p>
        <p className="text-dash-blue text-xs font-medium">Use Review Exam to sign it off.</p>
      </div>
    )
  }

  return (
    <>
      <div className="flex w-full flex-col gap-3">
        {reviews.map((r) => (
          <div key={r.id} className="flex w-full flex-col gap-2.5 rounded-xl border border-line bg-white p-3">
            <div className="flex w-full items-start justify-between gap-2">
              <span className="flex flex-col rounded-lg bg-surface-subtle px-2.5 py-1.5">
                <span className="text-[11px] text-ink-muted">Last Reviewed</span>
                <span className="text-sm font-bold text-ink">{r.date}</span>
              </span>
              <button
                type="button" aria-label={\`Read the review from \${r.date}\`} onClick={() => setLeyendo(r)}
                className="flex size-8 items-center justify-center rounded-md border border-line text-ink-muted hover:bg-surface-subtle"
              >
                <NotebookText className="size-3.5" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarFallback className="bg-dash-count-bg text-dash-blue text-[11px] font-bold">{iniciales(r.provider)}</AvatarFallback>
              </Avatar>
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-ink">{r.provider}</span>
                <span className="block text-xs text-ink-faint">Provider</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={leyendo !== null} onOpenChange={(v) => !v && setLeyendo(null)}>
        <DialogContent showCloseButton={false} className="gap-3 p-5 sm:max-w-[420px]">
          <div className="flex items-start justify-between gap-4">
            <span className="flex flex-col">
              <span className="text-base leading-none font-bold text-ink">Exam review</span>
              <span className="mt-1 text-xs text-ink-faint">{leyendo?.provider} · {leyendo?.date}</span>
            </span>
            <button type="button" aria-label="Close" onClick={() => setLeyendo(null)} className="flex size-7 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted">
              <X className="size-4" />
            </button>
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-wrap text-ink">{leyendo?.note}</p>
        </DialogContent>
      </Dialog>
    </>
  )
}
`})))()}var de;function fe(){return(fe=e((()=>{de=`import { Grid2x2, LayoutGrid } from 'lucide-react'
import { ToothIcon } from './ToothIcon'
import type { ProcedureScope } from './data'

function ArchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" aria-hidden className={className}>
      <path d="M4 19V12a8 8 0 0 1 16 0v7" />
    </svg>
  )
}

export function ScopeIcon({ scope, className }: { scope: ProcedureScope; className?: string }) {
  if (scope === 'Tooth') return <ToothIcon className={className} />
  if (scope === 'Surface') return <Grid2x2 className={className} />
  if (scope === 'Quadrant') return <LayoutGrid className={className} />
  return <ArchIcon className={className} />
}
`})))()}var pe;function me(){return(me=e((()=>{pe=`import { SURFACE_LABELS } from '@/data/odontogram'

export type Surface = (typeof SURFACE_LABELS)[number]

export const SURFACE_NAMES: Record<Surface, string> = {
  MB: 'Mesio-buccal', B: 'Buccal', DB: 'Disto-buccal', O: 'Occlusal',
  ML: 'Mesio-lingual', L: 'Lingual', DL: 'Disto-lingual',
}

/* Rueda de superficies, geometría propia -no la del proyecto hermano: usa
   otro vocabulario (BC/B/O/P/PC/D/M)-. Acá van las 7 superficies que ya
   modela \`odontogram.ts\` (MB/B/DB/O/ML/L/DL), en el mismo orden, como 6
   sectores iguales alrededor del círculo oclusal central. Ver
   design-reference/figma/modulos/clinical-mode.md. */
const C = 120
const R = 110
const R1 = 44
const ORDER: Exclude<Surface, 'O'>[] = ['MB', 'B', 'DB', 'DL', 'L', 'ML']

const rad = (deg: number) => (deg * Math.PI) / 180
const pt = (r: number, deg: number) => [C + r * Math.cos(rad(deg)), C + r * Math.sin(rad(deg))] as const

function sector(a1: number, a2: number) {
  const [x1, y1] = pt(R1, a1)
  const [x2, y2] = pt(R, a1)
  const [x3, y3] = pt(R, a2)
  const [x4, y4] = pt(R1, a2)
  return \`M\${x1} \${y1} L\${x2} \${y2} A\${R} \${R} 0 0 1 \${x3} \${y3} L\${x4} \${y4} A\${R1} \${R1} 0 0 0 \${x1} \${y1} Z\`
}

const ZONES: { id: Surface; d?: string; label: [number, number] }[] = ORDER.map((id, i) => {
  const a1 = -90 + i * 60
  const a2 = a1 + 60
  const mid = a1 + 30
  const [lx, ly] = pt((R1 + R) / 2, mid)
  return { id, d: sector(a1, a2), label: [lx, ly] }
})
ZONES.push({ id: 'O', label: [C, C] })

export function SurfaceWheel({
  value, onChange, size = 220,
}: {
  value: Surface[]
  onChange: (next: Surface[]) => void
  size?: number
}) {
  function toggle(s: Surface) {
    onChange(value.includes(s) ? value.filter((x) => x !== s) : [...value, s])
  }

  return (
    <svg viewBox="0 0 240 240" width={size} height={size} className="max-w-full shrink-0" role="group" aria-label="Tooth surfaces">
      {ZONES.map((z) => {
        const on = value.includes(z.id)
        return (
          <g
            key={z.id} role="checkbox" aria-checked={on} aria-label={SURFACE_NAMES[z.id]} tabIndex={0}
            onClick={() => toggle(z.id)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(z.id) } }}
            className="cursor-pointer outline-none [&:focus-visible>*:first-child]:stroke-dash-blue [&:focus-visible>*:first-child]:stroke-[3]"
          >
            {z.d ? (
              <path d={z.d} fill={on ? '#dbe7fa' : '#ffffff'} stroke="#000000" strokeWidth={1.5} />
            ) : (
              <circle cx={C} cy={C} r={R1} fill={on ? '#dbe7fa' : '#ffffff'} stroke="#000000" strokeWidth={1.5} />
            )}
            <text
              x={z.label[0]} y={z.label[1]} textAnchor="middle" dominantBaseline="central"
              className="pointer-events-none select-none" fontSize={16} fontWeight={700} fill="#000000"
            >
              {z.id}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
`})))()}var he;function ge(){return(ge=e((()=>{he=`import { cn } from '@/lib/utils'
import { SURFACE_LABELS } from '@/data/odontogram'

/* Los dos dibujos de cada pieza del odontograma: la vista anatómica
   -corona, raíces, encía y conductos- y la vista oclusal con las 7
   superficies. Ver design-reference/figma/modulos/clinical-mode.md. */

type TipoDiente = 'molar' | 'premolar' | 'canino' | 'incisivo'

/* Numeración universal: la posición dentro de la arcada define la forma.
   1-3 y 14-16 molares · 4-5 y 12-13 premolares · 6 y 11 caninos · 7-10
   incisivos. Vale igual para las dos arcadas. */
function tipoDiente(numero: number): TipoDiente {
  const pos = ((numero - 1) % 16) + 1
  if (pos <= 3 || pos >= 14) return 'molar'
  if (pos <= 5 || pos >= 12) return 'premolar'
  if (pos === 6 || pos === 11) return 'canino'
  return 'incisivo'
}

/* Dibujado con la corona abajo y las raíces arriba, que es la orientación
   del maxilar; la mandíbula usa el mismo dibujo espejado. */
const CORONA: Record<TipoDiente, string> = {
  molar: 'M8 35 C8 50 12 61.5 17 62.4 C19.2 62.8 20.6 61 22 61 C23.4 61 24.8 62.8 27 62.4 C32 61.5 36 50 36 35 Z',
  premolar: 'M11.8 35 C11.8 50 15.2 61 22 62.4 C28.8 61 32.2 50 32.2 35 Z',
  canino: 'M12.8 35 C12.8 46 16.8 58 22 62.6 C27.2 58 31.2 46 31.2 35 Z',
  incisivo: 'M13.8 35 L13.8 56.5 Q13.8 62 22 62 Q30.2 62 30.2 56.5 L30.2 35 Z',
}

const RAICES: Record<TipoDiente, string[]> = {
  molar: [
    'M12.3 36 C12 29 12.6 22.5 14.1 18.4 C14.8 16 18.1 16.4 18.4 19.6 C19 23 20.4 25.5 22 27 C23.6 25.5 25 23 25.6 19.6 C25.9 16.4 29.2 16 29.9 18.4 C31.4 22.5 32 29 31.7 36 Z',
  ],
  premolar: ['M17.4 36 C16.6 27 16.1 16 19.8 10.5 Q22 8 24.2 10.5 C27.9 16 27.4 27 26.6 36 Z'],
  canino: ['M17.6 36 C16.7 25 16.1 10 19.7 5 Q22 2.6 24.3 5 C27.9 10 27.3 25 26.4 36 Z'],
  incisivo: ['M18 36 C17.3 27 16.8 17 19.9 11.5 Q22 9.2 24.1 11.5 C27.2 17 26.7 27 26 36 Z'],
}

const CANALES: Record<TipoDiente, string[]> = {
  molar: ['M15.8 33 C15.4 27 15.6 23 16.3 20', 'M28.2 33 C28.6 27 28.4 23 27.7 20'],
  premolar: ['M22 34 L22 13'],
  canino: ['M22 34 L22 7.5'],
  incisivo: ['M22 34 L22 14'],
}

const ENCIA = 'M4.5 41 C4.5 32.5 11.5 29 22 29 C32.5 29 39.5 32.5 39.5 41 Z'

export function ToothGlyph({
  numero, tinte, ausente, flip,
}: {
  numero: number
  /** Tinte del esmalte: rojo si hay un problema abierto, azul si hay un finding cerrado. */
  tinte: string
  ausente: boolean
  flip: boolean
}) {
  const tipo = tipoDiente(numero)

  if (ausente) {
    return (
      <svg viewBox="0 0 44 64" className="h-[58px] w-11" aria-hidden>
        <rect x="10" y="34" width="24" height="24" rx="8" className="fill-none stroke-line-strong" strokeWidth="1.6" strokeDasharray="3 2.5" />
        <path d="M16 40 L28 52 M28 40 L16 52" className="stroke-ink-faint" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 44 64" className={cn('h-[58px] w-11', flip && '-scale-y-100')} aria-hidden>
      {RAICES[tipo].map((d) => (
        <path key={d} d={d} fill="#fcfcfd" stroke="#d2d2d9" strokeWidth="1.1" strokeLinejoin="round" />
      ))}
      {CANALES[tipo].map((d) => (
        <path key={d} d={d} fill="none" stroke="#e8949d" strokeWidth="1.1" strokeLinecap="round" />
      ))}
      <path d={ENCIA} fill="#f4bfc6" />
      <path d={CORONA[tipo]} fill={tinte} stroke="#c9c9d1" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}

/* Vista oclusal: banda vestibular arriba partida en MB · B · DB, la mesa
   oclusal al medio y la banda lingual abajo en ML · L · DL. Las esquinas
   en diagonal son las del odontograma clásico; el corte en tres de cada
   banda es el que pide nuestro modelo de 7 superficies, no el de 5. */
const W = 40
const H = 36
const I = 11
const A = 13
const B = 27

const SEGMENTOS: { idx: number; d: string }[] = [
  { idx: 0, d: \`M0 0 H\${A} V\${I} H\${I} Z\` },
  { idx: 1, d: \`M\${A} 0 H\${B} V\${I} H\${A} Z\` },
  { idx: 2, d: \`M\${B} 0 H\${W} L\${W - I} \${I} H\${B} Z\` },
  { idx: 3, d: \`M0 \${I} H\${W} V\${H - I} H0 Z\` },
  { idx: 4, d: \`M\${I} \${H - I} H\${A} V\${H} H0 Z\` },
  { idx: 5, d: \`M\${A} \${H - I} H\${B} V\${H} H\${A} Z\` },
  { idx: 6, d: \`M\${B} \${H - I} H\${W - I} L\${W} \${H} H\${B} Z\` },
]

export function OcclusalView({
  numero, surfaces, ausente, seleccionado, flip, onSurface,
}: {
  numero: number
  surfaces: (string | null)[]
  ausente: boolean
  seleccionado: boolean
  flip: boolean
  onSurface: (index: number) => void
}) {
  return (
    <svg
      viewBox={\`0 0 \${W} \${H}\`}
      className={cn(
        'h-[34px] w-10 rounded-[5px] border bg-white transition-colors',
        seleccionado ? 'border-primary ring-primary/40 ring-2' : 'border-line-strong',
        ausente && 'opacity-40',
      )}
    >
      <g transform={flip ? \`translate(0 \${H}) scale(1 -1)\` : undefined}>
        {SEGMENTOS.map(({ idx, d }) => (
          <path
            key={idx}
            d={d}
            role={ausente ? undefined : 'button'}
            tabIndex={ausente ? undefined : 0}
            aria-label={\`\${numero} · \${SURFACE_LABELS[idx]}\`}
            onClick={ausente ? undefined : () => onSurface(idx)}
            onKeyDown={(e) => {
              if (ausente) return
              if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSurface(idx) }
            }}
            fill={surfaces[idx] || '#ffffff'}
            stroke="#d4d4d8"
            strokeWidth="0.8"
            className={cn('outline-none', !ausente && 'cursor-pointer hover:brightness-95')}
          >
            <title>{\`\${numero} · \${SURFACE_LABELS[idx]}\`}</title>
          </path>
        ))}
      </g>
    </svg>
  )
}
`})))()}var _e;function ve(){return(ve=e((()=>{_e=`export function ToothIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M7.6 2C4.9 2 3 4.1 3 7.1c0 1.8.4 3 .9 4.6.4 1.4.6 2.7.8 4.4.2 2 .5 4.6 2 4.6 1.4 0 1.8-1.8 2.2-4.1.3-1.8.6-3.2 1.4-3.2h1.4c.8 0 1.1 1.4 1.4 3.2.4 2.3.8 4.1 2.2 4.1 1.5 0 1.8-2.6 2-4.6.2-1.7.4-3 .8-4.4.5-1.6.9-2.8.9-4.6C21 4.1 19.1 2 16.4 2c-1.6 0-2.7.6-4.4.6S9.2 2 7.6 2Z" />
    </svg>
  )
}

export function ToothChip({ className }: { className?: string }) {
  return (
    <span aria-hidden className={\`bg-dash-blue flex size-7 shrink-0 items-center justify-center rounded-md text-white \${className ?? ''}\`}>
      <ToothIcon className="size-4" />
    </span>
  )
}
`})))()}var ye;function be(){return(be=e((()=>{ye=`import { useCallback, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

/* El resumen "Tooth information", redibujado con el diseño de la app. La
   librería lo genera como un bloque de párrafos y una tabla; acá se lee ese
   nodo -que sigue siendo la fuente- y se muestra como una ficha.
   Ver design-reference/figma/modulos/clinical-mode.md. */

type Arcada = { arcada: string; piezas: string }
type Linea = { rotulo: string; valor: string; vacio: boolean }
export type Resumen = { titular: string; columna: string; arcadas: Arcada[]; lineas: Linea[] }
export type LineaPerio = { rotulo: string; valor: string; vacio: boolean }

/* La librería escribe los renglones sin dato con un texto que arranca en
   "No"/"no" ("No carious teeth.", "no recorded wear"): sirve para
   apagarlos visualmente en vez de darles el mismo peso que a un hallazgo. */
const sinDato = (valor: string) => /^no\\b/i.test(valor.trim())

/* "Periodontal status" es la excepción: sano se lee "the periodontium is
   healthy", no "no ...", así que \`sinDato\` lo cuenta como si tuviera
   hallazgo. Lo usa \`hayHallazgo\` (el punto rojo del ícono) para no avisar
   de un examen sano. */
const saludable = (valor: string) => /\\bhealthy\\b/i.test(valor)

/** Hay algo para ver -y ameritar el punto rojo del ícono- si algún
    renglón tiene dato real Y, si es el de periodontal, ese dato no es
    "sano"; o si ya se cargó algún sitio en el sondaje periodontal. */
export function hayHallazgo(resumen: Resumen | null, perio: LineaPerio[] | null = null) {
  const enResumen = (resumen?.lineas ?? []).some((l) => {
    if (l.vacio) return false
    if (l.rotulo === 'Periodontal status') return !saludable(l.valor)
    return true
  })
  const enPerio = (perio ?? []).some((l) => l.rotulo === 'Charted sites' && !l.vacio)
  return enResumen || enPerio
}

/* El sondaje sin cargar se lee "–" (promedios/máximos) o "0"/"0%"
   (conteos y porcentajes): mismo criterio de "sin dato" que el resto del
   panel, para no resaltar un renglón en cero como si fuera un hallazgo. */
const sinDatoPerio = (valor: string) => valor === '–' || valor === '0' || valor === '0%'

function leerResumenPerio(nodo: HTMLElement): LineaPerio[] {
  return [...nodo.querySelectorAll('.perio-fullgrid-summary-item')].map((item) => {
    const rotulo = item.querySelector('.perio-fullgrid-summary-label')?.textContent?.trim() ?? ''
    const valor = item.querySelector('.perio-fullgrid-summary-value')?.textContent?.trim() ?? ''
    return { rotulo, valor, vacio: sinDatoPerio(valor) }
  })
}

function leerResumen(nodo: HTMLElement): Resumen {
  const tabla = nodo.querySelector('table')
  return {
    titular: nodo.querySelector('.tooth-info-overview')?.textContent?.trim() ?? '',
    columna: [...(tabla?.querySelectorAll('thead th') ?? [])].map((e) => e.textContent?.trim() ?? '').filter(Boolean)[0] ?? '',
    arcadas: [...(tabla?.querySelectorAll('tbody tr') ?? [])].map((tr) => {
      const celdas = [...tr.children].map((td) => td.textContent?.trim() ?? '')
      return { arcada: celdas[0] ?? '', piezas: celdas[1] ?? '' }
    }),
    lineas: [...nodo.querySelectorAll('.tooth-info-line')].map((p) => {
      const texto = p.textContent?.trim() ?? ''
      const corte = texto.indexOf(':')
      const rotulo = corte > 0 ? texto.slice(0, corte).trim() : texto
      const valor = corte > 0 ? texto.slice(corte + 1).trim() : ''
      return { rotulo, valor, vacio: sinDato(valor) }
    }),
  }
}

/* La usan tanto el panel como el ícono -para el punto rojo de "hay algo
   nuevo para ver"-, así que leen el mismo resumen en vez de cada uno
   observar \`nodo\` por su cuenta. \`nodo\` llega en \`null\` en Periodontal
   Status: ahí \`.tooth-info\` no existe, sólo \`.perio-summary-card\`. */
export function useResumenDental(nodo: HTMLElement | null) {
  const [resumen, setResumen] = useState<Resumen | null>(null)

  const releer = useCallback(() => setResumen(nodo ? leerResumen(nodo) : null), [nodo])

  useEffect(() => {
    releer()
    if (!nodo) return
    /* La librería reescribe el resumen con cada cambio del chart. */
    const observer = new MutationObserver(releer)
    observer.observe(nodo, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [nodo, releer])

  return resumen
}

/* \`.perio-summary-card\` sólo existe en el DOM mientras se ve Periodontal
   Status -la librería la saca por completo al volver a Odontogram, no la
   deja oculta-, así que \`perioNodo\` llega en \`null\` la mayor parte del
   tiempo y el bloque de abajo no se dibuja. */
export function usePerioResumen(perioNodo: HTMLElement | null) {
  const [perio, setPerio] = useState<LineaPerio[] | null>(null)

  const releer = useCallback(() => setPerio(perioNodo ? leerResumenPerio(perioNodo) : null), [perioNodo])

  useEffect(() => {
    releer()
    if (!perioNodo) return
    const observer = new MutationObserver(releer)
    observer.observe(perioNodo, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [perioNodo, releer])

  return perio
}

export function ToothInfoPanel({ nodo, perioNodo }: { nodo: HTMLElement | null; perioNodo?: HTMLElement | null }) {
  const resumen = useResumenDental(nodo)
  const perio = usePerioResumen(perioNodo ?? null)
  if (!resumen && !(perio && perio.length > 0)) return null

  return (
    <div className="flex flex-col gap-4">
      {resumen?.titular && (
        <p className="text-[13px] font-semibold text-ink">{resumen.titular}</p>
      )}

      {perio && perio.length > 0 && (
        <div className="rounded-lg border border-line-row bg-surface-alt p-3">
          <p className="mb-2 text-[11px] font-semibold text-ink-muted">Periodontal summary</p>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-2">
            {perio.map((l) => (
              <div key={l.rotulo} className="flex items-center justify-between gap-2">
                <dt className="text-[12px] text-ink-soft">{l.rotulo}</dt>
                <dd className={cn('text-[12px] tabular-nums', l.vacio ? 'text-ink-faint' : 'font-semibold text-ink')}>
                  {l.valor}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {resumen && resumen.arcadas.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-line-row">
          <div className="bg-surface-alt px-3 py-2 text-[11px] font-semibold text-ink-muted">
            {resumen.columna}
          </div>
          {resumen.arcadas.map((a) => (
            <div key={a.arcada} className="flex items-start gap-3 border-t border-line-row px-3 py-2">
              <span className="w-[84px] shrink-0 text-[12px] font-medium text-ink">{a.arcada}</span>
              <span className="min-w-0 flex-1 text-[12px] leading-relaxed text-ink-soft tabular-nums">{a.piezas}</span>
            </div>
          ))}
        </div>
      )}

      {resumen && resumen.lineas.length > 0 && (
        <dl className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-6 gap-y-3">
          {resumen.lineas.map((l) => (
            <div key={l.rotulo} className="min-w-0">
              <dt className="text-[11px] font-medium text-ink-muted">{l.rotulo}</dt>
              <dd className={cn('text-[12px] leading-snug', l.vacio ? 'text-ink-faint' : 'font-medium text-ink')}>
                {l.valor || '—'}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}
`})))()}var xe;function Se(){return(Se=e((()=>{xe=`import { useLayoutEffect, useRef } from 'react'
import { Info } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { ToothInfoPanel, useResumenDental, usePerioResumen, hayHallazgo } from '@/components/clinical/dental/ToothInfoPanel'
import { BOTON_ICONO_REDONDO } from '@/lib/estilos'
import { cn } from '@/lib/utils'

/* "Tooth information" deja de ser un paso más del panel flotante: ahora es
   un ícono propio, redondo (mismo estilo que "Add condition",
   \`BOTON_ICONO_REDONDO\`). Julián lo quiere en la barra de tabs
   Odontogram/Periodontal Status, donde antes estaba "Diagnoses" -ese botón
   se saca por CSS (ver odontogram-theme.css)-, no en la fila de íconos del
   gráfico (vista oclusal, cordales, hueso, pulpa, limpiar selección).

   No se arma con \`createPortal\` -se probó primero así, y React tira
   "Target container is not a DOM element" cada vez que se cambia de tab:
   la librería rearma \`.perio-launch-bar\` en ese momento, y el
   \`MutationObserver\` que lo nota (en \`OdontogramEmbed\`) corre un paso
   después, así que el portal llega a intentar reconciliar contra un
   contenedor que ya no está. En cambio, React renderiza este \`<span>\` en
   SU propio árbol -como un hijo más de \`OdontogramEmbed\`- y un efecto lo
   MUEVE ahí con \`appendChild\` directo.

   Ese mismo efecto tiene que devolverlo a su lugar de origen al limpiar:
   React borra sus nodos buscándolos en el padre donde ÉL los montó, no en
   el padre real que tengan en ese momento -mover el nodo sin devolverlo
   tira "NotFoundError: the node to be removed is not a child of this
   node" apenas se desmonta-. Tiene que ser \`useLayoutEffect\`, no
   \`useEffect\`: la limpieza de un \`useEffect\` normal (pasivo) corre DESPUÉS
   de que React ya sacó sus nodos del DOM durante el commit, así que
   devolver el nodo ahí llega tarde -se probó, y sigue tirando el mismo
   error-. La de \`useLayoutEffect\` corre en el mismo commit, a tiempo.

   Al pasar el mouse adelanta el resumen en un hover card; al clickear lo
   despliega inline -en Periodontal Status, arriba de los tabs Maxillary/
   Mandibular; en Odontogram, debajo del "Dental chart"- y eso lo dibuja
   \`OdontogramEmbed\` (\`PanelArribaDeTabs\`), no este componente: acá sólo
   vive el botón. El puntito rojo avisa que hay algo para ver: \`hayHallazgo\` (en
   \`ToothInfoPanel.tsx\`) descarta los renglones "no recorded X" y el caso
   especial de "Periodontal status" sano, y también prende si ya hay
   sitios cargados en el sondaje (\`perioNodo\`, ver abajo).

   \`perioNodo\` es \`.perio-summary-card\` -Avg PD/CAL/BOP%/etc.-, que
   Julián pidió mostrar acá: sólo existe en el DOM mientras se ve
   Periodontal Status, así que llega en \`null\` en Odontogram y el bloque
   correspondiente del panel no se dibuja.
   Ver design-reference/figma/modulos/clinical-mode.md. */

export function ToothInfoTrigger({
  nodo, perioNodo, contenedor, abierto, onToggle,
}: {
  nodo: HTMLElement | null
  perioNodo: HTMLElement | null
  contenedor: HTMLElement
  abierto: boolean
  onToggle: () => void
}) {
  const envoltorio = useRef<HTMLSpanElement>(null)
  const resumen = useResumenDental(nodo)
  const perio = usePerioResumen(perioNodo)
  const hayNotificacion = hayHallazgo(resumen, perio)

  useLayoutEffect(() => {
    const el = envoltorio.current
    if (!el) return
    const origen = el.parentElement
    contenedor.appendChild(el)
    return () => {
      if (origen && el.parentElement !== origen) origen.appendChild(el)
    }
  }, [contenedor])

  return (
    <span ref={envoltorio} style={{ display: 'contents' }}>
      <HoverCard openDelay={150}>
        <HoverCardTrigger asChild>
          <button
            type="button"
            aria-label={hayNotificacion ? 'Tooth information (new finding)' : 'Tooth information'}
            aria-pressed={abierto}
            onClick={onToggle}
            className={cn(
              BOTON_ICONO_REDONDO,
              'relative ml-2',
              abierto && 'border-dash-blue bg-info-bg text-dash-blue hover:bg-info-bg',
            )}
          >
            <Info className="size-4" />
            {hayNotificacion && (
              <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-field-error ring-2 ring-white" />
            )}
          </button>
        </HoverCardTrigger>
        <HoverCardContent side="bottom" align="end" className="w-96 max-h-[70vh] overflow-y-auto">
          <ToothInfoPanel nodo={nodo} perioNodo={perioNodo} />
        </HoverCardContent>
      </HoverCard>
    </span>
  )
}
`})))()}var Ce;function we(){return(we=e((()=>{Ce=`import { useState } from 'react'
import {
  Search, User, Calendar, LayoutGrid, ChevronDown, ChevronRight,
  MoreVertical, CircleAlert, Check, X, Eye, Inbox, MapPin, Square,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { RecordRow, RecordToolbar, RecordPagination } from './RecordRow'
import {
  LAB_ORDERS, PRESCRIPTIONS, REFERRALS,
  PLAN_CASES, PLAN_PROCEDURES, TREATMENT_HISTORY,
} from '@/data/mock'

/* ── Treatment Plan ──────────────────────────────────────────────── */

export function TreatmentPlanPanel() {
  const [openCase, setOpenCase] = useState(0)

  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <div className="bg-background w-full rounded-xl border p-0 shadow-sm lg:w-[300px] lg:shrink-0">
        <div className="bg-primary text-primary-foreground flex items-center gap-2 rounded-t-xl px-4 py-3 text-sm font-medium">
          <Inbox className="size-4" /> Unassigned Items
        </div>
        <div className="p-4">
          {PLAN_CASES.map((c, i) => (
            <div key={i} className="border-b py-3 last:border-0">
              <button
                onClick={() => setOpenCase((o) => (o === i ? -1 : i))}
                className="flex w-full items-center gap-2 text-left"
              >
                <span className="text-sm font-medium">{c.date}</span>
                <span
                  className={cn(
                    'ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide',
                    c.status === 'PLANNING'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-muted text-muted-foreground',
                  )}
                >
                  {c.status}
                </span>
                {c.status === 'PLANNING'
                  ? <ChevronDown className="text-muted-foreground size-4 shrink-0" />
                  : <ChevronRight className="text-muted-foreground size-4 shrink-0" />}
              </button>
              {openCase === i && c.items.map((it) => (
                <div key={it.name} className="mt-3 flex items-center gap-2 pl-4">
                  <span className="flex size-6 items-center justify-center rounded bg-orange-500 text-white">
                    <Square className="size-3 fill-current" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-medium">{it.name}</span>
                    <span className="text-muted-foreground block text-xs">Update: {it.updated}</span>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="min-w-0 flex-1 rounded-xl border bg-background shadow-sm">
        <div className="flex flex-wrap items-center gap-3 p-5">
          <h2 className="text-lg font-semibold">Unassigned</h2>
          <div className="flex w-full flex-wrap gap-3 sm:ml-auto sm:w-auto">
            {['New Treatment Group', 'New Alternative Case', 'Move to'].map((l) => (
              <button key={l} disabled
                className="bg-primary-disabled text-primary-disabled-foreground h-9 cursor-not-allowed rounded-md px-4 text-sm font-medium">
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 border-b px-5 pb-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            { icon: Search, label: 'Search Procedure', ph: 'Code or Description...' },
            { icon: User, label: 'Providers', ph: 'Select providers...' },
            { icon: Calendar, label: 'Creation Date', ph: 'Pick a date range' },
            { icon: LayoutGrid, label: 'Anatomical Areas', ph: 'Select areas...' },
          ].map(({ icon: Icon, label, ph }) => (
            <div key={label}>
              <p className="text-muted-foreground mb-1 flex items-center gap-2 text-sm">
                <Icon className="size-4" /> {label}
              </p>
              <input placeholder={ph} className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-sm" />
            </div>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="text-muted-foreground border-b">
                <th className="px-4 py-3"><input type="checkbox" aria-label="Select all" /></th>
                {['Date', 'Location', 'Tooth', 'Surface', 'Procedure', 'Provider', 'Amount', 'Status', ''].map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PLAN_PROCEDURES.map((p, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="px-4 py-4"><input type="checkbox" aria-label={\`Select row \${i + 1}\`} /></td>
                  <td className="px-4 py-4 whitespace-nowrap">{p.date}</td>
                  <td className="px-4 py-4">{p.location || ''}</td>
                  <td className="px-4 py-4">
                    <span className="bg-muted inline-block min-w-9 rounded px-2 py-1 text-center text-xs font-medium">{p.tooth}</span>
                  </td>
                  <td className="px-4 py-4">{p.surface}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{p.code} - {p.procedure}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{p.provider}</td>
                  <td className="px-4 py-4">{p.amount}</td>
                  <td className="px-4 py-4">
                    <span className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-medium">{p.status}</span>
                  </td>
                  <td className="px-4 py-4"><MoreVertical className="text-muted-foreground size-4" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ── Treatment (gate) ────────────────────────────────────────────── */

export function TreatmentPanel() {
  return (
    <div className="relative min-h-[560px] overflow-hidden rounded-xl border bg-background shadow-sm">
      {/* Layout de fondo, difuminado igual que en el original */}
      <div className="pointer-events-none grid select-none gap-5 p-6 opacity-30 blur-[3px] xl:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <div className="bg-muted h-6 w-64 rounded" />
          <div className="bg-muted h-4 w-full rounded" />
          <div className="bg-muted/60 h-64 rounded-lg" />
        </div>
        <div className="space-y-4">
          {['Procedures', 'Diagnosis', 'Clinical notes'].map((s) => (
            <div key={s} className="rounded-lg border p-4">
              <div className="bg-muted mb-3 h-4 w-32 rounded" />
              <div className="bg-muted/60 h-12 rounded" />
              <div className="bg-muted/60 mt-2 h-12 rounded" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[410px] rounded-xl border bg-background p-8 text-center shadow-lg">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-50">
            <CircleAlert className="text-destructive size-6" />
          </span>
          <h3 className="mt-4 text-lg font-semibold">No Active Encounter Found</h3>
          <p className="text-muted-foreground mt-2 text-sm">
            You cannot proceed without an active encounter. Please ensure the patient has an
            open encounter and try again.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── Patient Summary (ruta: /treatment-history) ──────────────────── */

export function PatientSummaryPanel() {
  const flagCols = ['Exams', 'Ref', 'Lab', 'Prescription']
  return (
    <div>
      <div className="mb-4 flex justify-end gap-3">
        <button className="flex h-9 items-center gap-2 rounded-md border bg-background px-4 text-sm font-medium shadow-sm">
          <Calendar className="size-4" /> Filter by date range
        </button>
        <button disabled className="bg-primary-disabled text-primary-disabled-foreground h-9 cursor-not-allowed rounded-md px-4 text-sm font-medium">
          Download
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-background shadow-sm">
        <table className="w-full min-w-[820px] text-sm">
          <thead>
            <tr className="text-muted-foreground border-b">
              <th className="px-4 py-3"><input type="checkbox" aria-label="Select all" /></th>
              {['Date', 'Status', 'Clinic Note', 'Reason for appt', 'Provider', 'Procedures', ...flagCols, 'Actions'].map((h, i) => (
                <th key={i} className="px-4 py-3 text-left font-medium whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TREATMENT_HISTORY.map((r, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="px-4 py-4"><input type="checkbox" aria-label={\`Select \${r.date}\`} /></td>
                <td className="px-4 py-4">
                  <span className="flex items-center gap-2 font-semibold whitespace-nowrap">
                    <Calendar className="text-muted-foreground size-4" /> {r.date}
                    {r.latest && <span className="bg-accent text-primary rounded px-1.5 py-0.5 text-[10px] font-medium">Latest</span>}
                  </span>
                  <span className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
                    <MapPin className="size-3" /> {r.tz}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={cn('rounded-full px-3 py-1 text-xs font-medium',
                    r.status === 'Cancelled' ? 'bg-destructive text-white' : 'bg-blue-100 text-blue-700')}>
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-500">{r.note}</span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">{r.reason}</td>
                <td className="px-4 py-4 whitespace-nowrap">{r.provider}</td>
                <td className="text-muted-foreground px-4 py-4 whitespace-nowrap">
                  {r.procedures ? (
                    <span className="text-foreground inline-flex items-center gap-1">{r.procedures} <ChevronDown className="size-3" /></span>
                  ) : 'No procedures'}
                </td>
                {r.flags.map((ok, j) => (
                  <td key={j} className="px-4 py-4">
                    <span className={cn('flex size-5 items-center justify-center rounded-full text-white',
                      ok ? 'bg-green-500' : 'bg-red-500')}>
                      {ok ? <Check className="size-3" /> : <X className="size-3" />}
                    </span>
                  </td>
                ))}
                <td className="px-4 py-4"><Eye className="text-muted-foreground size-4" /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-muted-foreground flex items-center gap-3 px-5 py-4 text-sm">
          Showing 1 to 7 of 64 results
          {/* El original rotula este selector "Mostrar:". Corregido. */}
          <label className="flex items-center gap-2">Show:
            <select className="border-input h-9 rounded-md border px-2"><option>10</option><option>20</option></select>
          </label>
        </div>
      </div>
    </div>
  )
}

/* ── Lab Order · Prescription · Referral ─────────────────────────── */

export function LabOrderPanel() {
  return (
    <div>
      <RecordToolbar newLabel="New Lab Order" />
      <div className="space-y-3">
        {LAB_ORDERS.map((o, i) => (
          <RecordRow key={i} provider={o.provider} status={o.status}
            created={o.created} updated={o.updated} expires={o.expires}>
            <span className="text-sm font-medium">{o.subject}</span>
          </RecordRow>
        ))}
      </div>
      <RecordPagination total={14} />
    </div>
  )
}

export function PrescriptionPanel() {
  return (
    <div>
      <RecordToolbar newLabel="New Prescription" />
      <div className="space-y-3">
        {PRESCRIPTIONS.map((p, i) => (
          <RecordRow key={i} provider={p.provider} status={p.status}
            created={p.created} updated={p.updated} expires={p.expires}>
            <span className="bg-accent text-primary rounded-full px-3 py-1 text-sm font-medium">{p.drug}</span>
          </RecordRow>
        ))}
      </div>
      <RecordPagination total={20} />
    </div>
  )
}

export function ReferralPanel() {
  return (
    <div>
      <RecordToolbar newLabel="New Referral" />
      <div className="space-y-3">
        {REFERRALS.map((r, i) => (
          <RecordRow key={i} provider={r.provider} providerRole="Referring Provider" status={r.status}
            created={r.created} updated={r.updated} expires={r.expires}>
            <span className="leading-tight">
              <span className="block text-sm">
                <span className="font-semibold">{r.referred}</span>
                <span className="text-muted-foreground"> | {r.specialty}</span>
              </span>
              <span className="text-muted-foreground block text-xs">Referred Provider</span>
            </span>
          </RecordRow>
        ))}
      </div>
      <RecordPagination total={14} />
    </div>
  )
}
`})))()}var Te;function Ee(){return(Ee=e((()=>{Te=`import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Check, X, EllipsisVertical, Pencil, User, DoorClosed, Clock, ArrowRight,
} from 'lucide-react'
import { InnerCard, StatusPill } from './primitives'
import { cn } from '@/lib/utils'
import { ICONO_SUELTO } from '@/lib/estilos'
import { aviso } from '@/components/ui/toaster'

export type Appointment = {
  name: string
  initials: string
  provider: string
  operatory: string
  time: string
  /* Botón del pie. En el frame casi todas dicen "Check Out" y una "Cancel". */
  accion?: 'Check Out' | 'Cancel'
}

/* Figma 4430:57451. El card se rediseñó: sin borde, con la foto y el badge
   "Check In" a la izquierda, los chips TR/CC y el kebab a la derecha, los dos
   campos grises con la caja de hora al costado, y el botón de acción a lo
   ancho del pie. */
export function AppointmentCard({
  appt,
  id,
  activa,
  onSelect,
  onEdit,
  compact,
}: {
  appt: Appointment
  /** Identifica la card entre los dos paneles. */
  id?: string
  /** Con el popup abierto: la card queda marcada con el anillo azul. */
  activa?: boolean
  onSelect?: (appt: Appointment, el: HTMLElement, id?: string) => void
  onEdit?: (appt: Appointment) => void
  /** Versión chica para una lista angosta -el costado de Patients-: una fila
      con nombre + hora/provider, sin los chips TR/CC, sin el "Check In" y
      sin el botón de Check Out. Es otro layout, no el mismo con partes
      escondidas -por eso vive en su propio componente más abajo. */
  compact?: boolean
}) {
  if (compact) return <AppointmentCardCompacta appt={appt} />

  const accion = appt.accion ?? 'Check Out'

  return (
    <InnerCard
      aria-expanded={onSelect ? !!activa : undefined}
      className={cn(
        'flex flex-col gap-2.5 p-3',
        onSelect && 'cursor-pointer transition-colors hover:bg-[#fafbfe]',
        /* Mismo anillo que el FAB de Scheduling: outline + offset, con el
           hueco transparente para que se vea el fondo del panel. */
        '[outline-style:solid] outline-[3px] outline-offset-[3px] outline-transparent transition-[outline-color]',
        activa && 'outline-[var(--color-dash-ring)]',
      )}
      onClick={(e) => onSelect?.(appt, e.currentTarget, id)}
    >
      {/* Fila 1: paciente + acciones */}
      {/* Todo en un renglón, también en angosto: Julián prefiere que el nombre
          se recorte antes que mandar los chips a una segunda línea. */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <span className="bg-dash-blue flex size-11 shrink-0 items-center justify-center rounded-xl text-sm font-semibold text-white">
            {appt.initials}
          </span>
          <span className="flex min-w-0 flex-col gap-1">
            <span className="text-dash-name truncate text-[15px] leading-none font-bold">
              {appt.name}
            </span>
            <StatusPill tone="ok" className="self-start">Check In</StatusPill>
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <span className="flex h-8 items-center gap-1 rounded-lg bg-green-soft px-2 text-[13px] text-ink">
            TR <Check className="text-dash-ok-fg size-4" strokeWidth={2.5} />
          </span>
          <span className="flex h-8 items-center gap-1 rounded-lg bg-dash-bad-chip px-2 text-[13px] text-ink">
            CC <X className="size-4 text-field-error" strokeWidth={2.5} />
          </span>
          <MenuCard nombre={appt.name} onEdit={onEdit && (() => onEdit(appt))} />
        </div>
      </div>

      {/* Fila 2: los dos campos y, al costado, la caja de hora con el alto
          de los dos apilados. */}
      <div className="flex items-stretch gap-2">
        <div className="flex min-w-px flex-1 flex-col gap-2">
          <Field icon={<User className="size-4 shrink-0" />} text={appt.provider} />
          <Field icon={<DoorClosed className="size-4 shrink-0" />} text={appt.operatory} />
        </div>
        <div className="bg-dash-field flex w-[68px] shrink-0 flex-col items-center justify-center gap-1 rounded-lg">
          <Clock className="size-4 text-ink-medium" />
          <span className="text-[13px] font-medium text-ink">{appt.time}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          accion === 'Cancel'
            ? aviso.warn(\`Appointment for \${appt.name} was cancelled.\`)
            : aviso.ok(\`\${appt.name} checked out.\`)
        }}
        className="bg-dash-blue hover:bg-dash-blue-hover flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold text-white transition-colors"
      >
        {accion} <ArrowRight className="size-4" />
      </button>
    </InnerCard>
  )
}

/* Una fila, no una card de dos pisos: avatar, nombre y hora/provider abajo
   en gris, y una flecha a Scheduling en vez del menú -acá no hay nada para
   editar in situ. Mismo tamaño de trigger que el kebab de las tablas
   (\`ICONO_SUELTO\`), para que quede a la par de PatientCard al lado -misma
   sombra que esa card también: la \`shadow-inner-card\` de acá abajo es de
   \`InnerCard\`, pensada para las cards grandes del Dashboard, y sin borde en
   una fila chica se veía como una línea cortada en vez de una sombra. */
function AppointmentCardCompacta({ appt }: { appt: Appointment }) {
  return (
    <InnerCard className="flex items-center gap-2.5 border border-line p-2.5 shadow-[0_1px_3px_rgb(0_0_0/0.08)]">
      <span className="bg-dash-blue flex size-8 shrink-0 items-center justify-center rounded-lg text-[12px] font-semibold text-white">
        {appt.initials}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-[13px] font-semibold text-ink">{appt.name}</span>
        <span className="flex items-center gap-1 text-[11px] text-ink-muted">
          <Clock className="size-3 shrink-0" />
          <span className="truncate">{appt.time} · {appt.provider}</span>
        </span>
      </span>
      <Link to="/scheduling" aria-label={\`View \${appt.name}'s appointment\`} className={ICONO_SUELTO}>
        <ArrowRight className="size-4" />
      </Link>
    </InnerCard>
  )
}

function Field({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="bg-dash-field flex h-10 items-center gap-2 rounded-lg px-3 text-[13px] text-ink-medium">
      {icon}
      <span className="truncate">{text}</span>
    </span>
  )
}


/* El kebab del frame está dibujado sin menú. Despliega "Edit appointment",
   que abre el mismo modal de alta con los datos de la card ya cargados. */
function MenuCard({ nombre, onEdit }: { nombre: string; onEdit?: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        aria-label={\`Actions for \${nombre}\`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-ink shadow-sm hover:bg-surface-muted',
          open && 'bg-surface-muted',
        )}
      >
        <EllipsisVertical className="size-4" />
      </button>
      {open && onEdit && (
        <div className="motion-safe:animate-[loc-in_120ms_ease-out] absolute top-full right-0 z-30 mt-1 w-44 overflow-hidden rounded-md border border-line bg-white py-1 shadow-lg">
          <button
            type="button"
            onClick={() => { setOpen(false); onEdit() }}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] hover:bg-surface-muted"
          >
            <Pencil className="size-3.5" /> Edit appointment
          </button>
        </div>
      )}
    </div>
  )
}
`})))()}var De;function Oe(){return(Oe=e((()=>{De=`import { ListFilter } from 'lucide-react'
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

/* El embudo del Figma está dibujado pero no tiene menú. Acá despliega la lista
   de categorías y filtra de verdad; sin nada tildado se muestra todo.
   Mismo componente shadcn que el selector de columnas de Ledger -antes cada
   uno tenía su propio dropdown hand-rolled, con checkbox dibujado distinto. */
export function FilterMenu({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  /** Vacío = sin filtro. */
  value: string[]
  onChange: (v: string[]) => void
}) {
  const alternar = (o: string) =>
    onChange(value.includes(o) ? value.filter((x) => x !== o) : [...value, o])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={label}
          data-tour="dash-filter"
          className="relative rounded-md p-1.5 text-ink transition-colors hover:bg-surface-muted"
        >
          <ListFilter className="size-4" />
          {value.length > 0 && (
            <span className="bg-dash-blue absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full text-[9px] font-semibold text-white">
              {value.length}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[190px]">
        {options.map((o) => (
          <DropdownMenuCheckboxItem
            key={o}
            checked={value.includes(o)}
            onCheckedChange={() => alternar(o)}
            onSelect={(e) => e.preventDefault()}
          >
            {o}
          </DropdownMenuCheckboxItem>
        ))}
        {value.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <button
              type="button"
              onClick={() => onChange([])}
              className="text-dash-blue w-full rounded-md px-1.5 py-1 text-left text-sm font-semibold hover:bg-surface-muted"
            >
              Clear filter
            </button>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
`})))()}var ke;function Ae(){return(Ae=e((()=>{ke=`import { Calendar, User } from 'lucide-react'
import { InnerCard, StatusPill } from './primitives'

export type OperatoryStatus = 'Available' | 'Busy' | 'Unavailable'

export type Operatory = {
  name: string
  status: OperatoryStatus
  patientsToday: number
  provider: string
}

const TONE = {
  Available: 'ok',
  Busy: 'busy',
  Unavailable: 'bad',
} as const

/* Figma I3636:58505;7350:4654 — este panel NO venía escalado: sus
   valores ya eran limpios (px-13 py-10 gap-5, radius 5, icons 10px,
   textos 11/9/8). Se sube ~1.3× para acompañar al resto. */
export function OperatoryCard({ room }: { room: Operatory }) {
  return (
    <InnerCard className="flex w-full flex-col gap-1.5 px-3.5 py-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-dash-name truncate text-sm leading-none font-semibold">
          {room.name}
        </p>
        <StatusPill tone={TONE[room.status]}>{room.status}</StatusPill>
      </div>

      <div className="text-dash-muted flex items-center gap-1 text-xs">
        <Calendar className="size-3.5 shrink-0" />
        <span>Patients today:</span>
        <span className="bg-dash-count-bg text-dash-blue-hover rounded-full px-2 py-[3px] text-[11px] leading-none font-medium">
          {room.patientsToday}
        </span>
      </div>

      <div className="text-dash-muted flex items-center gap-1.5 text-xs">
        <User className="size-3.5 shrink-0" />
        <span className="truncate">{room.provider}</span>
      </div>
    </InnerCard>
  )
}
`})))()}var je;function Me(){return(Me=e((()=>{je=`import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import {
  X, ChevronDown, Play, AArrowUp, ClipboardList, Smartphone, Eye, FileCheck2,
  Stethoscope, IdCard,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useAnclaje } from '@/lib/anclaje'
import { ICONO_SUELTO } from '@/lib/estilos'

/* Figma 4430:57474 — rediseño del popup del paciente (357×488).
   Ya no es la tarjeta con barra azul y avatar montado: ahora es una card
   clara con el avatar y el botón verde "Start Enconter" arriba, el plan de
   tratamiento en un panel celeste y las filas de datos abajo.

   Sigue sin ser un modal centrado: se ancla a la card que lo abrió, con
   volteo automático si no entra a la derecha.

   Textos tal cual el Figma, incluidos "Start Enconter" sin la u, "Height"
   repetido y la fecha en español. La única excepción es el bloque del motivo
   de la visita, que Julián pidió mejorar: ahí "Rsn" se escribe completo. */

type Fila = { icon: LucideIcon; label: string; value: string }

const FILAS_DOBLES: Fila[] = [
  { icon: AArrowUp, label: 'Height', value: '5 ft 8 in' },
  { icon: AArrowUp, label: 'Height', value: '5 ft 8 in' },
]
const FILAS: Fila[] = [
  { icon: Smartphone, label: 'Mobile Number', value: '+1 (555) 123-4567' },
  { icon: Eye, label: 'Last Visit Date', value: '17 Marzo, 2024' },
  { icon: FileCheck2, label: 'Primary Insurance Plan', value: 'Osde' },
]

/* Los ocho del plan. La tabla los muestra todos, con scroll: no hay "+N". */
const PROCEDIMIENTOS = [
  'D0274 – Bitewings – four radiographic images',
  'D0120 – Periodic oral evaluation',
  'D1110 – Prophylaxis – adult',
  'D0210 – Intraoral complete series',
  'D2740 – Crown – porcelain/ceramic',
  'D6010 – Surgical placement of implant body',
  'D4341 – Periodontal scaling and root planing',
  'D9310 – Consultation',
]

function FilaDato({
  icon: Icon, label, value, className, wrap,
}: Fila & { className?: string; wrap?: boolean }) {
  return (
    <div className={cn('flex items-center gap-2 bg-white px-3 py-3', className)}>
      <Icon className={cn('size-4 shrink-0 text-ink', wrap && 'mt-0.5')} strokeWidth={1.8} />
      <span className="shrink-0 text-[13px] font-semibold text-ink">{label}</span>
      <span
        className={cn(
          'ml-auto text-[13px] text-ink-muted',
          wrap ? 'min-w-0 text-right leading-[1.4]' : 'shrink-0 truncate',
        )}
      >
        {value}
      </span>
    </div>
  )
}

const W_MAX = 360

export function PatientDetailsPopover({
  name,
  initials,
  anchor,
  onClose,
}: {
  name: string
  initials: string
  /** Rect de la card que lo abrió, en coordenadas de viewport. */
  anchor: DOMRect
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
    }
  }, [onClose])

  /* El panel se corre hacia arriba lo justo para entrar entero: antes, con la
     card abajo de todo, había que scrollear para leerlo. */
  const { left, top, ancho } = useAnclaje(ref, anchor, W_MAX)

  return createPortal(
    <div
      ref={ref}
      role="dialog"
      aria-label={\`Details for \${name}\`}
      style={{ left, top, width: ancho }}
      className="motion-safe:animate-[loc-in_160ms_ease-out] absolute z-50 overflow-hidden rounded-2xl bg-[#fafbfe] p-4 shadow-[0_8px_28px_rgb(0_0_0/0.22)]"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-3 right-3 rounded-full p-1.5 text-ink transition-colors hover:bg-black/5"
      >
        <X className="size-5" />
      </button>

      <div className="flex items-center gap-3 pr-9">
        <span className="bg-dash-blue-hover flex size-[72px] shrink-0 items-center justify-center rounded-full border-4 border-white text-xl font-semibold text-white">
          {initials}
        </span>
        {/* Verde y radio de 4430:57478 (#1e9850, radio 8), el mismo botón que
            la ficha. El alto va en el escalón md del sistema (36) y no en los
            32 del nodo, que quedaban chicos al lado del avatar.
            "Enconter" es del Figma, sin la u. */}
        <button
          type="button"
          className="flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-green px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#18763e]"
        >
          <Play className="size-3.5 shrink-0" /> Start Enconter
          <ChevronDown className="size-3.5 shrink-0" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="truncate text-xl font-bold text-ink">{name}</p>
        <span className="shrink-0 rounded-full border border-dash-ok-fg bg-dash-ok-bg px-3 py-1 text-xs font-semibold text-dash-ok-fg">
          Planned
        </span>
      </div>

      {/* Los dos lugares a los que se va desde acá: la ficha del paciente y
          Clinical Mode. Antes el popup mostraba el turno y no llevaba a
          ninguno de los dos. */}
      <div className="mt-3 flex items-center gap-2">
        <Link
          to="/patients/john-smith"
          onClick={onClose}
          title="Open patient file"
          aria-label={\`Open \${name}'s file\`}
          className={\`\${ICONO_SUELTO} size-9 bg-white\`}
        >
          <IdCard className="size-4" />
        </Link>
        <Link
          to="/patients/john-smith/clinical-mode"
          onClick={onClose}
          title="Open Clinical Mode"
          aria-label={\`Open Clinical Mode for \${name}\`}
          className={\`\${ICONO_SUELTO} size-9 bg-white\`}
        >
          <Stethoscope className="size-4" />
        </Link>
      </div>

      {/* El frame se actualizó (4430:57474, 2026-08-28) y quedó muy cerca de la
          propuesta aplanada: se fue el panel celeste y el plan pasó a una card
          blanca con barra de acento azul de 3px. Dos cambios más: el motivo de
          la visita ahora vive **adentro** de esa card, como primera fila y
          separado por un hairline, y los procedimientos dejaron de ser chips
          para ser una tabla CODE / PROCEDURE con el total abajo a la derecha.

          Se mantiene "Reason for Visit" escrito completo y el icono de
          historia clínica, que Julián pidió al mejorar este bloque; el frame
          sigue diciendo "Rsn for Visit" con el icono de tamaño de texto. */}
      <div className="border-l-dash-blue mt-3 overflow-hidden rounded-lg border border-line border-l-[3px] bg-white">
        {/* El motivo envuelve en vez de cortarse: con "Reason" escrito completo
            no entra en una línea, y truncarlo era justo lo que había que
            arreglar acá. */}
        <div className="flex items-start gap-2 border-b border-[#f2f2f2] px-3 py-2.5">
          <ClipboardList className="mt-px size-4 shrink-0 text-ink" strokeWidth={1.8} />
          <span className="shrink-0 text-[13px] font-semibold text-ink">Reason for Visit</span>
          <span className="ml-auto min-w-0 text-right text-[11px] leading-[1.4] text-ink-faint">
            Routine dental check-up appointment
          </span>
        </div>

        <div className="px-3 py-2.5">
          {/* El conteo dejó de ser pill: una pill marca un estado, y acá el
              número sólo cuenta filas de la tabla que está justo abajo. La
              negrita pasa al nombre de la visita, que es el dato. */}
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[13px] font-bold text-ink">Visit 1</span>
            <span className="shrink-0 text-[11px] text-ink-muted">
              {PROCEDIMIENTOS.length} Procedures
            </span>
          </div>
          <p className="mt-0.5 text-[13px] text-ink">Comprehensive Implant Therapy</p>

          {/* Misma tabla que Insurance y Documents: cabecera #f9f9f9 y filas
              finas. Con scroll, así no hay ningún "+N" que no lleve a nada. */}
          <div className="mt-2 overflow-hidden rounded-lg border border-line-row">
            <div className="flex h-7 items-center gap-3 border-b border-line-row bg-surface-alt px-2.5 text-[10px] font-semibold tracking-wide text-ink-muted uppercase">
              <span className="w-[46px] shrink-0">Code</span>
              <span className="min-w-0 flex-1">Procedure</span>
            </div>
            <div className="max-h-[132px] overflow-y-auto">
              {PROCEDIMIENTOS.map((p) => {
                const [code, ...resto] = p.split(' – ')
                return (
                  <div
                    key={p}
                    className="flex h-8 items-center gap-3 border-b border-line-soft px-2.5 text-[11px] last:border-0"
                  >
                    <span className="text-dash-blue w-[46px] shrink-0 font-medium">{code}</span>
                    <span className="min-w-0 flex-1 truncate text-ink-medium">{resto.join(' – ')}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <p className="mt-2 text-right text-[13px] font-semibold text-ink">
            Total: 1,270.00
          </p>
        </div>
      </div>

      {/* Height aparece dos veces, una en cada media fila. Es del Figma. */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        {FILAS_DOBLES.map((f, i) => (
          <FilaDato key={i} {...f} className="rounded-lg" />
        ))}
      </div>
      <div className="mt-2 flex flex-col gap-2">
        {FILAS.map((f) => (
          <FilaDato key={f.label} {...f} className="rounded-lg" />
        ))}
      </div>
    </div>,
    document.body,
  )
}
`})))()}var Ne;function Pe(){return(Pe=e((()=>{Ne=`import { FileText, TriangleAlert, ArrowRight } from 'lucide-react'
import { InnerCard } from './primitives'
import { aviso } from '@/components/ui/toaster'

export type PendingTask = {
  kind: string
  state: string
  person: string
  initials: string
  register: string
  expiration: string
}

export function PendingTaskCard({ task }: { task: PendingTask }) {
  return (
    <InnerCard className="flex flex-col gap-2.5 px-3 py-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-dash-name text-sm leading-none font-bold">{task.kind}</p>
        <span className="text-dash-blue flex items-center gap-1.5 text-xs">
          <span className="bg-dash-blue size-1.5 rounded-full" />
          {task.state}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="bg-dash-count-bg text-dash-blue-hover flex size-7 shrink-0 items-center justify-center rounded-md text-[11px] font-semibold">
          {task.initials}
        </span>
        <p className="text-dash-name min-w-0 flex-1 truncate text-[13px] font-semibold">
          {task.person}
        </p>
        <button
          type="button"
          aria-label="Open document"
          className="bg-dash-bad-chip border-dash-bad-fg flex size-7 shrink-0 items-center justify-center rounded-md border"
        >
          <FileText className="text-dash-bad-fg size-3.5" />
        </button>
        <span className="flex shrink-0 items-center gap-1 rounded-md border border-amber-400 bg-amber-50 px-2 py-1.5 text-[11px] font-medium text-amber-700">
          <TriangleAlert className="size-3" /> Expired date
        </span>
      </div>

      <div className="flex items-end justify-between gap-2 text-[11px]">
        <span className="flex flex-col gap-0.5">
          <span className="text-dash-delta">Register</span>
          <span className="text-dash-blue font-medium">{task.register}</span>
        </span>
        <span className="flex flex-col gap-0.5 text-right">
          <span className="text-dash-delta">Expiration date</span>
          <span className="text-dash-bad-fg font-medium">{task.expiration}</span>
        </span>
      </div>

      <button
        type="button"
        onClick={() => aviso.ok(\`\${task.kind} for \${task.person} marked as complete.\`)}
        className="bg-dash-blue hover:bg-dash-blue-hover flex w-full items-center justify-center gap-1.5 rounded-lg py-2.5 text-[13px] font-medium text-white transition-colors"
      >
        Complete this Task <ArrowRight className="size-3.5" />
      </button>
    </InnerCard>
  )
}
`})))()}var Fe;function Ie(){return(Ie=e((()=>{Fe=`import type { LucideIcon } from 'lucide-react'

/* Figma 3605:64575 — p-24, radius 8, shadow 0 4px 4px rgba(0,0,0,.05),
   gap 8. Header: título 15px Medium + icon slot 28px con glifo 18px.
   Valor 26px Bold, delta 13px #b8b8b8, gap 2. */
export function StatCard({
  title,
  value,
  delta,
  icon: Icon,
}: {
  title: string
  value: string
  delta: string
  icon: LucideIcon
}) {
  return (
    <div className="shadow-stat flex flex-col gap-2 overflow-hidden rounded-lg bg-white p-6">
      <div className="flex items-center gap-4">
        <p className="min-w-px flex-1 text-[15px] leading-[1.4] font-medium text-black">
          {title}
        </p>
        <span className="flex size-7 shrink-0 items-center justify-center rounded-md">
          <Icon className="text-dash-blue size-[18px]" strokeWidth={2} />
        </span>
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-[26px] leading-none font-bold text-black">{value}</p>
        <p className="text-dash-delta text-[13px] leading-[1.5]">{delta}</p>
      </div>
    </div>
  )
}
`})))()}var Le;function Re(){return(Re=e((()=>{Le=`import { CalendarDays, Clock, Activity, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Figma 4430:57451 — los tres stat cards sueltos del dashboard anterior
   pasaron a una sola tira compacta arriba a la derecha, separada por
   divisores verticales. */

export type Stat = {
  label: string
  value: string
  nota: string
  icon: LucideIcon
}

/* Las tres métricas comparten el celeste y el azul de Appointments. El frame
   les daba un color distinto a cada una —naranja y violeta—, y eso leía como
   si el color dijera algo: acá las tres son el mismo tipo de dato del mismo
   día, así que el color no las distingue, sólo las agrupa. */
export const STATS: Stat[] = [
  { label: 'Appointments', value: '6', nota: '2 completed', icon: CalendarDays },
  { label: 'Waiting', value: '3', nota: '1 new', icon: Clock },
  { label: 'Open encounters', value: '2', nota: '18 min avg.', icon: Activity },
]

/* Variante para Ledger: título arriba, monto abajo y detalle al final, en
   columnas iguales que reparten el ancho disponible. La fila compacta de
   arriba (rótulo y monto en una línea, \`shrink-0\`) no entraba con el menú y
   el panel del paciente abiertos y empujaba la cuarta métrica fuera de la
   pantalla. Acá el ancho lo decide el contenedor -no el viewport, que no
   sabe si los menús están abiertos-: de 2×2 a cuatro columnas desde 672px. */
function StatStripApilada({ stats }: { stats: Stat[] }) {
  return (
    <div className="@container w-full">
      <div className={cn(
        'shadow-stat grid w-full rounded-xl bg-white',
        stats.length === 4 ? 'grid-cols-2 @2xl:grid-cols-4' : 'grid-cols-3',
      )}>
        {stats.map(({ label, value, nota, icon: Icon }, i) => (
          <div
            key={label}
            className={cn(
              'flex min-w-0 items-center gap-3 px-4 py-3.5',
              i % 2 === 1 && 'border-l border-line-hair',
              i >= 2 && 'border-t border-line-hair',
              i > 0 && '@2xl:border-l @2xl:border-line-hair',
              '@2xl:border-t-0',
            )}
          >
            <span className="text-dash-blue hidden size-9 shrink-0 items-center justify-center rounded-lg bg-[#eef2ff] @md:flex">
              <Icon className="size-[18px]" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[10px] font-semibold tracking-wide text-dash-muted uppercase">{label}</span>
              <span className="mt-1 block text-[17px] leading-none font-bold text-ink tabular-nums">{value}</span>
              <span className="mt-1 block truncate text-[11px] text-ink-muted">{nota}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function StatStrip({ stats = STATS, apilada = false }: { stats?: Stat[]; apilada?: boolean }) {
  if (apilada) return <StatStripApilada stats={stats} />
  return (
    /* En angosto la tira ocupa todo el ancho y reparte las métricas en
       columnas: el sentido del componente es verlas de un vistazo, y con
       scroll horizontal había que arrastrar para enterarse de que existían.
       Desde lg vuelve a la fila compacta del Figma, alineada a la derecha.
       Ledger suma una cuarta (Unapplied credits) -grid-cols-3 la partía
       3+1 en dos filas desparejas-, así que el mobile grid se adapta a
       cuántas hay en vez de asumir siempre tres. */
    <div className={cn(
      'shadow-stat grid w-full rounded-xl bg-white lg:flex lg:w-fit lg:max-w-full lg:items-center lg:px-2',
      stats.length === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3',
    )}>
      {stats.map(({ label, value, nota, icon: Icon }, i) => (
        <div
          key={label}
          className={cn(
            'flex min-w-0 flex-col items-start gap-1.5 px-3 py-3',
            'lg:shrink-0 lg:flex-row lg:items-center lg:gap-3 lg:px-4 lg:py-4',
            i > 0 && 'border-l border-line-hair',
          )}
        >
          <span className="text-dash-blue flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#eef2ff] lg:size-10">
            <Icon className="size-4 lg:size-5" />
          </span>
          {/* Rótulo y número en la misma línea, y el detalle abajo. El número
              apenas por encima del rótulo —14/15 contra 10/11—: con 18 el salto
              era tal que parecían dos jerarquías distintas en vez de un dato y
              su nombre. */}
          <span className="min-w-0 leading-tight">
            <span className="flex items-baseline gap-1.5">
              <span className="truncate text-[10px] font-semibold tracking-wide text-dash-muted uppercase lg:text-[11px]">
                {label}
              </span>
              <span className="text-[14px] leading-none font-bold text-ink lg:text-[15px]">
                {value}
              </span>
            </span>
            <span className="mt-1 block text-[11px] text-ink-muted lg:text-[12px] lg:whitespace-nowrap">
              {nota}
            </span>
          </span>
        </div>
      ))}
    </div>
  )
}
`})))()}var ze;function Be(){return(Be=e((()=>{ze=`import { cn } from '@/lib/utils'

export type DashboardView = 'Recepcionista' | 'Provider'

/* Figma 3636:60667 — medido por píxel sobre el frame:
   contenedor 200×35, pill activo 79×29 con 3px de inset.
   Los segmentos NO son mitad y mitad: cada uno se ajusta a su texto
   ("Recepcionista" 115px, "Provider" 79px). */
export function ViewToggle({
  value,
  onChange,
}: {
  value: DashboardView
  onChange: (v: DashboardView) => void
}) {
  const options: DashboardView[] = ['Recepcionista', 'Provider']
  return (
    <div className="inline-flex h-[35px] items-center gap-0 rounded-lg bg-[#f1f3f9] p-[3px]">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          aria-pressed={value === o}
          className={cn(
            'h-[29px] rounded-md px-3 text-xs font-medium whitespace-nowrap transition-colors',
            value === o
              ? 'bg-dash-blue text-white'
              : 'text-[#a3a9b8] hover:text-dash-muted',
          )}
        >
          {o}
        </button>
      ))}
    </div>
  )
}
`})))()}var Ve;function He(){return(He=e((()=>{Ve=`import { cn } from '@/lib/utils'

/* ── Escala tipográfica ──────────────────────────────────────────────
   El Figma usa 15/26/13px en el chrome exterior, pero adentro de los
   appointment cards se derrumba a 11/9/8 y hasta 5.87px (un componente
   pegado y escalado ~0.75×). Acá se respetan las proporciones pero se
   sube la escala interna ~1.3× y se pone un piso de 11px para lo que
   quedaba por debajo del umbral de legibilidad.
   Ver design-reference/figma/README.md, punto 8.          */

export function Panel({
  title,
  controls,
  className,
  bodyClassName,
  children,
}: {
  /** String en casi todos los paneles; algunos -Today Appointments,
      Recent Patients en Patients.tsx- le agregan un globo con el total. */
  title: React.ReactNode
  controls?: React.ReactNode
  className?: string
  bodyClassName?: string
  children?: React.ReactNode
}) {
  return (
    <section
      className={cn('shadow-panel flex flex-col overflow-hidden rounded-lg bg-white', className)}
    >
      <header className="flex h-[52px] shrink-0 items-center justify-between gap-2 px-5 py-3">
        {/* Figma: 13.5px. Subido a 15 para igualar el título del stat card. */}
        <h2 className="flex min-w-0 items-center gap-2 text-[15px] leading-none font-bold text-black">{title}</h2>
        {controls}
      </header>
      <div className={cn('flex min-h-px flex-1 flex-col gap-3 p-4', bodyClassName)}>
        {children}
      </div>
    </section>
  )
}

/* Card interior compartido por Appointment y Operatory: mismo radio,
   misma sombra y mismo fondo en el Figma. */
export function InnerCard({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('shadow-inner-card rounded-lg bg-white', className)} {...props}>
      {children}
    </div>
  )
}

const PILL = {
  ok: 'bg-dash-ok-bg border-dash-ok-fg text-dash-ok-fg',
  busy: 'bg-dash-busy-bg border-dash-busy-fg text-dash-busy-fg',
  bad: 'bg-dash-bad-bg border-dash-bad-fg text-dash-bad-fg',
} as const

export function StatusPill({
  tone,
  children,
  className,
}: {
  tone: keyof typeof PILL
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full border px-2 py-[3px] whitespace-nowrap',
        'text-[11px] leading-none font-semibold',
        PILL[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
`})))()}var Ue;function We(){return(We=e((()=>{Ue=`import { useEffect, useLayoutEffect, useState } from 'react'
import { X, ArrowRight, ArrowLeft, ChevronDown, BookOpen } from 'lucide-react'
import type { Topic } from './topics'

/* Explica un tema encima de la pantalla real. Ver
   design-reference/figma/modulos/help.md. */
export type Coaching = Topic & { index: number; total: number }

type Caja = { top: number; left: number; width: number; height: number }

function Spotlight({ anchor, topicId }: { anchor: string; topicId: string }) {
  const [caja, setCaja] = useState<Caja | null>(null)

  useLayoutEffect(() => {
    let frame = 0
    let intentos = 0
    function medir() {
      const el = document.querySelector<HTMLElement>(\`[data-tour="\${anchor}"]\`)
      if (!el) {
        if (intentos++ < 40) frame = requestAnimationFrame(medir)
        return
      }
      el.scrollIntoView({ block: 'center', behavior: 'smooth' })
      const r = el.getBoundingClientRect()
      setCaja({ top: r.top, left: r.left, width: r.width, height: r.height })
    }
    setCaja(null)
    frame = requestAnimationFrame(medir)
    return () => cancelAnimationFrame(frame)
  }, [anchor, topicId])

  useEffect(() => {
    if (!caja) return
    function seguir() {
      const el = document.querySelector<HTMLElement>(\`[data-tour="\${anchor}"]\`)
      if (!el) return
      const r = el.getBoundingClientRect()
      setCaja({ top: r.top, left: r.left, width: r.width, height: r.height })
    }
    window.addEventListener('scroll', seguir, true)
    window.addEventListener('resize', seguir)
    return () => {
      window.removeEventListener('scroll', seguir, true)
      window.removeEventListener('resize', seguir)
    }
  }, [anchor, caja])

  if (!caja) return null
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-30 rounded-lg motion-safe:[animation:coach-spotlight_1.6s_ease-out_1]"
      style={{ top: caja.top - 6, left: caja.left - 6, width: caja.width + 12, height: caja.height + 12 }}
    />
  )
}

export function CoachMark({
  coaching, onPrev, onNext, onClose, onBackToHelp,
}: {
  coaching: Coaching
  onPrev?: () => void
  onNext?: () => void
  onClose: () => void
  onBackToHelp: () => void
}) {
  const [plegado, setPlegado] = useState(false)
  const Demo = coaching.Demo
  const modulo = coaching.module

  return (
    <>
      {coaching.anchor && <Spotlight anchor={coaching.anchor} topicId={coaching.id} />}

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center p-3 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:justify-end sm:p-0">
        <div className="pointer-events-auto motion-safe:animate-[loc-in_180ms_ease-out] flex w-full max-w-[380px] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_8px_28px_rgb(0_0_0/0.18)]">
          <div className="flex items-center gap-2 px-4 pt-3.5">
            <span className="text-dash-blue text-[10px] font-semibold tracking-wide uppercase">{modulo}</span>
            <span className="text-[10px] text-ink-faint">{coaching.index + 1}/{coaching.total}</span>
            <span className="ml-auto flex items-center gap-0.5">
              <button
                type="button" aria-label={plegado ? 'Expand the explanation' : 'Collapse the explanation'}
                aria-expanded={!plegado} onClick={() => setPlegado((v) => !v)}
                className="flex size-6 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted"
              >
                <ChevronDown className={\`size-3.5 transition-transform \${plegado ? '' : 'rotate-180'}\`} />
              </button>
              <button
                type="button" aria-label="Close the explanation" onClick={onClose}
                className="flex size-6 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted"
              >
                <X className="size-3.5" />
              </button>
            </span>
          </div>

          <p className="px-4 pt-1 text-[13px] font-bold text-ink">{coaching.title}</p>

          {!plegado && (
            <>
              <div className="px-4 pt-3"><Demo /></div>
              <p className="px-4 pt-3 text-xs leading-relaxed text-ink-muted">{coaching.body}</p>
            </>
          )}

          <div className="flex flex-wrap items-center gap-2 px-4 py-3">
            <button
              type="button" onClick={onBackToHelp}
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12px] font-medium text-ink-muted hover:bg-surface-muted"
            >
              <BookOpen className="size-3" /> Back to Help
            </button>
            <span className="ml-auto flex items-center gap-2">
              {onPrev && (
                <button
                  type="button" onClick={onPrev}
                  className="flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 text-[12px] font-medium text-ink hover:bg-surface-subtle"
                >
                  <ArrowLeft className="size-3" /> Back
                </button>
              )}
              {onNext ? (
                <button
                  type="button" onClick={onNext}
                  className="bg-dash-blue hover:bg-dash-blue-hover flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12px] font-semibold text-white"
                >
                  Next <ArrowRight className="size-3" />
                </button>
              ) : (
                <button
                  type="button" onClick={onClose}
                  className="bg-dash-blue hover:bg-dash-blue-hover rounded-md px-2.5 py-1.5 text-[12px] font-semibold text-white"
                >
                  Done
                </button>
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
`})))()}var Ge;function Ke(){return(Ke=e((()=>{Ge=`import { useEffect, useRef, useState } from 'react'
import { Bot, X, ArrowUp, Sparkles, ChevronRight } from 'lucide-react'
import { TOPICS, MODULES, puntuarTema } from './topics'

/* Sin IA real: sólo búsqueda por palabras clave sobre TOPICS -decisión de
   Julián, para no pedirle consentimiento ni cobrarle a quien abra el
   artifact. Ver design-reference/figma/modulos/help.md. */
type Mensaje = { de: 'bot'; texto: string; temas?: string[] } | { de: 'user'; texto: string }

const SALUDO = 'Hi — I\\'m Confibot. Ask me how something works and I\\'ll take you to the screen it lives on and explain it there.'

const SUGERENCIAS = [
  'How do I add a patient?',
  'How do I book an appointment?',
  'Where do I see a patient\\'s balance?',
  'How do I add another location?',
  'What does Clinical Mode do?',
  'Where do I manage my team?',
]

const CLAVE_HISTORIAL = 'confidentally.confibot-history'

function cargarHistorial(): Mensaje[] {
  try {
    const raw = localStorage.getItem(CLAVE_HISTORIAL)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function buscarRespuesta(consulta: string): Mensaje {
  const hits = TOPICS.map((t) => ({ t, puntaje: puntuarTema(t, consulta) }))
    .filter((r) => r.puntaje > 0)
    .sort((a, b) => b.puntaje - a.puntaje)
    .slice(0, 3)
  return hits.length
    ? {
        de: 'bot',
        texto: hits.length === 1 ? 'This is the one — open it and I\\'ll point it out on screen.' : 'Here\\'s what I found. Pick one and I\\'ll show you where it is.',
        temas: hits.map((h) => h.t.id),
      }
    : { de: 'bot', texto: 'I couldn\\'t find that one. I know about the dashboard, scheduling, patients, clinical mode and settings — try naming one of those.' }
}

export function Confibot({
  abierto, onClose, onShowOnScreen,
}: {
  abierto: boolean
  onClose: () => void
  onShowOnScreen: (topicId: string) => void
}) {
  const [borrador, setBorrador] = useState('')
  const [historial, setHistorial] = useState<Mensaje[]>(() => cargarHistorial())
  const listaRef = useRef<HTMLDivElement>(null)
  const ultimaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    localStorage.setItem(CLAVE_HISTORIAL, JSON.stringify(historial))
  }, [historial])

  useEffect(() => {
    if (!abierto) return
    ultimaRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }, [historial, abierto])

  function preguntar(pregunta: string) {
    const q = pregunta.trim()
    if (!q) return
    setBorrador('')
    setHistorial((h) => [...h, { de: 'user', texto: q }, buscarRespuesta(q)])
  }

  /* El disparador ya no flota sobre la pantalla -tapaba otros botones
     flotantes, como el de Appointment requests en Scheduling-: ahora vive en
     el menú (Sidebar.tsx) y acá sólo queda la hoja de chat, montada nada más
     mientras está abierta. */
  if (!abierto) return null

  const preguntas = historial.filter((m) => m.de === 'user').length

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center sm:inset-x-auto sm:right-6 sm:bottom-6">
      <div className="motion-safe:[animation:sheet-in_220ms_ease-out] flex h-[min(560px,82svh)] w-full flex-col overflow-hidden rounded-t-2xl border border-line bg-white shadow-[0_8px_28px_rgb(0_0_0/0.18)] sm:max-w-[400px] sm:rounded-2xl">
        <span aria-hidden className="mx-auto mt-2 h-1 w-9 shrink-0 rounded-full bg-line sm:hidden" />

        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="bg-dash-count-bg text-dash-blue flex size-8 shrink-0 items-center justify-center rounded-full">
            <Bot className="size-4" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-bold text-ink">Confibot</span>
            <span className="block text-[11px] text-ink-faint">Here to explain the app</span>
          </span>
          <button
            type="button" aria-label="Close Confibot" onClick={onClose}
            className="ml-auto flex size-7 shrink-0 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted"
          >
            <X className="size-4" />
          </button>
        </div>

        <div ref={listaRef} className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4">
          <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-surface-slate px-3 py-2 text-[13px] leading-relaxed text-ink">
            {SALUDO}
          </div>

          {preguntas > 0 && (
            <span className="flex items-center gap-2 pt-1 text-[10px] font-semibold tracking-wide text-line-strong uppercase">
              <span className="h-px flex-1 bg-line" /> Your questions <span className="h-px flex-1 bg-line" />
            </span>
          )}

          {historial.map((m, i) =>
            m.de === 'bot' ? (
              <div key={i} ref={i === historial.length - 1 ? ultimaRef : undefined} className="flex flex-col gap-2">
                <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-surface-slate px-3 py-2 text-[13px] leading-relaxed text-ink">
                  {m.texto}
                </div>
                {m.temas?.map((id) => {
                  const t = TOPICS.find((x) => x.id === id)
                  if (!t) return null
                  const mod = MODULES.find((x) => x.id === t.module)
                  return (
                    <button
                      key={id} type="button"
                      onClick={() => { onShowOnScreen(t.id); onClose() }}
                      className="group flex w-full items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-left hover:border-dash-blue"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="text-dash-blue block text-[10px] font-semibold tracking-wide uppercase">{mod?.label}</span>
                        <span className="block truncate text-[13px] font-semibold text-ink">{t.title}</span>
                      </span>
                      <ChevronRight className="group-hover:text-dash-blue size-3.5 shrink-0 text-ink-faint" />
                    </button>
                  )
                })}
              </div>
            ) : (
              <div
                key={i} ref={i === historial.length - 1 ? ultimaRef : undefined}
                className="bg-dash-blue ml-auto max-w-[90%] rounded-2xl rounded-tr-sm px-3 py-2 text-[13px] leading-relaxed text-white"
              >
                {m.texto}
              </div>
            ),
          )}

          <div className="flex flex-col gap-1.5 pt-1">
            <span className="text-dash-blue flex items-center gap-1.5 text-[11px] font-semibold">
              <Sparkles className="size-3" /> {preguntas === 0 ? 'Try one of these' : 'Or pick another'}
            </span>
            {SUGERENCIAS.map((s) => (
              <button
                key={s} type="button" onClick={() => preguntar(s)}
                className="hover:border-dash-blue w-full rounded-lg border border-line bg-white px-3 py-2 text-left text-[13px] text-ink-muted hover:text-ink"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); preguntar(borrador) }}
          className="flex items-center gap-2 border-t border-line p-3"
        >
          <input
            value={borrador} onChange={(e) => setBorrador(e.target.value)}
            placeholder="Ask me anything about the app" aria-label="Ask Confibot"
            className="focus:border-dash-blue h-9 min-w-0 flex-1 rounded-lg border border-line bg-white px-3 text-[13px] text-ink placeholder:text-ink-faint focus:outline-none"
          />
          <button
            type="submit" aria-label="Send" disabled={!borrador.trim()}
            className="bg-dash-blue hover:bg-dash-blue-hover flex size-9 shrink-0 items-center justify-center rounded-md text-white disabled:opacity-40"
          >
            <ArrowUp className="size-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
`})))()}var qe;function Je(){return(Je=e((()=>{qe=`import { createContext, useContext, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { TOPICS, MODULE_PAGE } from './topics'
import { CoachMark } from './CoachMark'

/* Vive en la raíz de la app -no adentro de AppShell- porque algunos temas
   (Clinical Mode) navegan a una ruta que vive fuera del shell, y el
   CoachMark tiene que sobrevivir ese salto. Ver
   design-reference/figma/modulos/help.md. */
const HelpContext = createContext<{
  showOnScreen: (topicId: string) => void
  confibotAbierto: boolean
  toggleConfibot: () => void
  closeConfibot: () => void
} | null>(null)

export function useHelp() {
  const ctx = useContext(HelpContext)
  if (!ctx) throw new Error('useHelp must be used inside HelpProvider')
  return ctx
}

export function HelpProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [coachingId, setCoachingId] = useState<string | null>(null)
  const coaching = coachingId ? (TOPICS.find((t) => t.id === coachingId) ?? null) : null
  const hermanos = coaching ? TOPICS.filter((t) => t.module === coaching.module) : []
  const indice = coaching ? hermanos.findIndex((t) => t.id === coaching.id) : -1
  /* El Confibot ya no flota solo sobre la pantalla -tapaba otros botones
     flotantes, como el de Appointment requests en Scheduling-: el disparador
     vive en el menú (ver Sidebar.tsx) y este estado es lo único que los
     conecta. */
  const [confibotAbierto, setConfibotAbierto] = useState(false)

  function showOnScreen(topicId: string) {
    const tema = TOPICS.find((t) => t.id === topicId)
    if (!tema) return
    navigate(tema.page ?? MODULE_PAGE[tema.module])
    setCoachingId(topicId)
  }

  return (
    <HelpContext.Provider
      value={{
        showOnScreen,
        confibotAbierto,
        toggleConfibot: () => setConfibotAbierto((v) => !v),
        closeConfibot: () => setConfibotAbierto(false),
      }}
    >
      {children}
      {coaching && (
        <CoachMark
          coaching={{ ...coaching, index: indice, total: hermanos.length }}
          onPrev={indice > 0 ? () => setCoachingId(hermanos[indice - 1].id) : undefined}
          onNext={indice < hermanos.length - 1 ? () => setCoachingId(hermanos[indice + 1].id) : undefined}
          onClose={() => setCoachingId(null)}
          onBackToHelp={() => { setCoachingId(null); navigate('/help') }}
        />
      )}
    </HelpContext.Provider>
  )
}
`})))()}var Ye;function Xe(){return(Xe=e((()=>{Ye=`import { Plus, Search, ListFilter, ChevronDown, Link2, LayoutGrid, ClipboardList, FileCheck2 } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

/* Demos de Help: piezas chicas y esquemáticas -un puntero, algunos bloques,
   un panel- para reconocer la interacción sin redibujar la pantalla entera.
   Todas en loop de 4s, ver design-reference/figma/modulos/help.md. */

function Stage({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={\`relative h-[150px] w-full overflow-hidden rounded-xl border border-line bg-[#fafbfe] \${className}\`}>
      {children}
    </div>
  )
}

function Panel({ title, children, className = '' }: { title?: string; children?: React.ReactNode; className?: string }) {
  return (
    <div className={\`rounded-lg border border-line bg-white p-2.5 shadow-sm \${className}\`}>
      {title && <p className="text-[10px] font-bold text-ink">{title}</p>}
      {children}
    </div>
  )
}

function Pointer({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 12 16" className="absolute z-20 size-4 drop-shadow-sm" style={style}>
      <path d="M1 1l9.5 8.2-4.2.5 2.4 4.6-1.9 1-2.4-4.6-2.6 3z" fill="#18181b" stroke="#fff" strokeWidth="1" />
    </svg>
  )
}

export function DateDrivesPanelsDemo() {
  const filas = [{ n: 'Elena Ruiz', i: 'ER' }, { n: 'Maria Viola', i: 'MV' }]
  return (
    <Stage className="p-3">
      <span
        className="flex w-fit items-center gap-1.5 rounded-lg border border-line bg-white px-2 py-1 text-[10px] font-semibold text-ink shadow-sm"
        style={{ animation: 'tour-pulse 4s ease-in-out infinite' }}
      >
        28-02-2026 <ChevronDown className="size-2.5" />
      </span>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <Panel title="Appointments">
          <div className="mt-1.5 space-y-1.5">
            {filas.map((f, i) => (
              <div key={f.n} className="flex items-center gap-1.5" style={{ animation: \`tour-card-in 4s \${0.3 + i * 0.2}s ease-out infinite\` }}>
                <Avatar className="size-4"><AvatarFallback className="bg-dash-count-bg text-dash-blue-hover text-[7px]">{f.i}</AvatarFallback></Avatar>
                <span className="truncate text-[9px] font-semibold text-ink">{f.n}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Waiting Room">
          <div className="mt-1.5 space-y-1.5">
            {filas.map((f, i) => (
              <div key={f.n} className="flex items-center gap-1.5" style={{ animation: \`tour-card-in 4s \${0.45 + i * 0.2}s ease-out infinite\` }}>
                <Badge variant="active" className="h-4 px-1.5 text-[8px]">Check In</Badge>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </Stage>
  )
}

export function RoomFilterDemo() {
  const filas = [{ n: 'Operatory 1', estado: 'Busy', tono: 'bg-warn-bg text-warn-fg' }, { n: 'Operatory 2', estado: 'Available', tono: 'bg-dash-ok-bg text-dash-ok-fg' }]
  return (
    <Stage className="p-3">
      <Panel>
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold text-ink">Rooms</p>
          <span className="flex size-5 items-center justify-center rounded-md text-ink-muted" style={{ animation: 'tour-pulse 3s ease-in-out infinite' }}>
            <ListFilter className="size-3" />
          </span>
        </div>
        <div className="mt-2 space-y-1.5">
          {filas.map((r, i) => (
            <div key={r.n} className="flex items-center justify-between rounded-md border border-line px-2 py-1" style={{ animation: \`tour-card-in 4s \${i * 0.25}s ease-out infinite\` }}>
              <span className="text-[9px] font-semibold text-ink">{r.n}</span>
              <span className={\`rounded-full px-1.5 py-0.5 text-[8px] font-semibold \${r.tono}\`}>{r.estado}</span>
            </div>
          ))}
        </div>
      </Panel>
    </Stage>
  )
}

export function ReschedulePopoverDemo() {
  return (
    <Stage className="p-3">
      <Panel title="10:00 AM · Noah Smith" className="w-[150px]" />
      <div
        className="absolute top-[70px] left-6 w-[160px] rounded-lg border border-line bg-white p-2 shadow-md"
        style={{ animation: 'tour-card-in 4s .6s ease-out infinite' }}
      >
        <p className="text-[9px] font-semibold text-ink">Reschedule</p>
        <p className="mt-1 text-[8px] text-ink-muted">Pick a new date and time without leaving the dashboard.</p>
      </div>
    </Stage>
  )
}

export function AddPatientDemo() {
  return (
    <Stage className="flex flex-col items-center justify-center gap-2 p-3">
      <span
        className="bg-dash-blue flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[10px] font-medium text-white"
        style={{ animation: 'tour-pulse 4s ease-in-out infinite' }}
      >
        <Plus className="size-3" /> New Patient
      </span>
      <div className="w-[150px] space-y-1.5 overflow-hidden" style={{ animation: 'tour-expand 4s ease-in-out infinite' }}>
        <div className="h-5 rounded-md border border-line bg-white px-1.5 text-[8px] leading-5 text-ink-faint">First name</div>
        <div className="h-5 rounded-md border border-line bg-white px-1.5 text-[8px] leading-5 text-ink-faint">Last name</div>
      </div>
    </Stage>
  )
}

export function PatientSearchDemo() {
  const filas = ['Noah Smith', 'Maria Viola']
  return (
    <Stage className="p-3">
      <div className="relative flex h-7 items-center rounded-md border border-line bg-white px-2 text-[10px] text-ink" style={{ animation: 'tour-pulse 4s ease-in-out infinite' }}>
        <Search className="mr-1.5 size-3 text-ink-faint" /> Noa
      </div>
      <div className="mt-2 space-y-1.5">
        {filas.map((f, i) => (
          <div key={f} className="rounded-md border border-line bg-white px-2 py-1 text-[9px] font-medium text-ink" style={{ animation: \`tour-card-in 4s \${0.4 + i * 0.2}s ease-out infinite\` }}>
            {f}
          </div>
        ))}
      </div>
    </Stage>
  )
}

const TABS = ['Treatments', 'Documents', 'Insurance', 'Ledger', 'Relationships']
export function PatientTabsDemo({ activa = 'Treatments' }: { activa?: string }) {
  return (
    <Stage className="p-3">
      <div className="flex flex-wrap gap-1">
        {TABS.map((t) => (
          <span
            key={t}
            className={\`rounded-md px-1.5 py-1 text-[8px] font-medium whitespace-nowrap \${t === activa ? 'bg-dash-blue text-white' : 'bg-surface-slate text-ink-slate'}\`}
            style={t === activa ? { animation: 'tour-pulse 4s ease-in-out infinite' } : undefined}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-2 space-y-1.5 overflow-hidden" style={{ animation: 'tour-card-in 4s .3s ease-out infinite' }}>
        <div className="h-2 w-full rounded-full bg-line" />
        <div className="h-2 w-3/4 rounded-full bg-line" />
      </div>
    </Stage>
  )
}

export function AddRelationshipDemo() {
  return (
    <Stage className="flex items-center justify-center gap-3 p-3">
      <Avatar className="size-9"><AvatarFallback className="bg-dash-count-bg text-dash-blue-hover text-[11px]">JS</AvatarFallback></Avatar>
      <Link2 className="size-4 shrink-0 text-ink-faint" style={{ animation: 'tour-pulse 4s ease-in-out infinite' }} />
      <Avatar className="size-9" style={{ animation: 'tour-block-appear 4s ease-out infinite' }}>
        <AvatarFallback className="bg-dash-count-bg text-dash-blue-hover text-[11px]">EV</AvatarFallback>
      </Avatar>
    </Stage>
  )
}

export function CalendarOverviewDemo() {
  return (
    <Stage>
      <div className="absolute inset-0 flex bg-white">
        <div className="w-8 shrink-0 pt-1">
          {['08', '09', '10', '11'].map((h) => <div key={h} className="h-9 pr-1.5 text-right text-[8px] text-ink-faint">{h}</div>)}
        </div>
        {[0, 1, 2].map((c) => (
          <div key={c} className="relative flex-1 border-l border-line">
            {[0, 1, 2, 3].map((i) => <div key={i} className="h-9 border-b border-line" />)}
            {c === 1 && (
              <div className="absolute inset-x-1 top-[9px] rounded-r-[3px] border-l-[3px] border-l-dash-blue bg-brand-tint px-1 py-0.5" style={{ animation: 'tour-card-in 4s .3s ease-out infinite' }}>
                <span className="block text-[8px] font-medium text-dash-blue">09:00 AM</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </Stage>
  )
}

export function NewApptButtonDemo() {
  return (
    <Stage className="p-3">
      <span
        className="bg-dash-blue flex w-fit items-center gap-1.5 rounded-md px-3 py-1.5 text-[10px] font-medium text-white"
        style={{ animation: 'tour-pulse 4s ease-in-out infinite' }}
      >
        <Plus className="size-3" /> New appointment
      </span>
      <div className="mt-3 h-9 w-[130px] overflow-hidden rounded-r-[3px] border-l-[3px] border-l-dash-blue bg-brand-tint px-1.5 py-1 origin-top" style={{ animation: 'tour-block-appear 4s ease-out infinite' }}>
        <span className="block text-[9px] font-medium text-dash-blue">10:00 AM</span>
        <span className="block truncate text-[9px] text-ink">Sofia Marin</span>
      </div>
    </Stage>
  )
}

export function ClinicalTakeoverDemo() {
  return (
    <Stage>
      <div className="absolute inset-0 flex">
        <div className="shrink-0 space-y-1.5 overflow-hidden bg-[#0b1220] p-2" style={{ animation: 'tour-rail-collapse 4s ease-in-out infinite' }}>
          {[0, 1, 2].map((i) => <div key={i} className="h-2 w-24 rounded-full bg-white/15" />)}
        </div>
        <div className="flex flex-1 items-center justify-center bg-white">
          <LayoutGrid className="size-6 text-ink-faint" style={{ animation: 'tour-card-in 4s .5s ease-out infinite' }} />
        </div>
      </div>
    </Stage>
  )
}

export function ClinicalSectionsDemo() {
  return (
    <Stage className="flex flex-col justify-center gap-2 p-3">
      <div className="flex items-center gap-2 rounded-lg border border-line bg-white p-2" style={{ animation: 'tour-card-in 4s .2s ease-out infinite' }}>
        <ClipboardList className="size-3.5 shrink-0 text-dash-blue" />
        <span className="text-[10px] font-semibold text-ink">Treatment Plan</span>
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-line bg-white p-2" style={{ animation: 'tour-card-in 4s .4s ease-out infinite' }}>
        <FileCheck2 className="size-3.5 shrink-0 text-dash-blue" />
        <span className="text-[10px] font-semibold text-ink">Consent</span>
      </div>
    </Stage>
  )
}

export function NewLocationDemo() {
  return (
    <Stage className="flex flex-col items-center justify-center gap-2 p-3">
      <span className="bg-dash-blue flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[10px] font-medium text-white" style={{ animation: 'tour-pulse 4s ease-in-out infinite' }}>
        <Plus className="size-3" /> New Location
      </span>
      <div className="flex w-[170px] items-center justify-between rounded-md border border-line bg-white px-2 py-1.5" style={{ animation: 'tour-card-in 4s .5s ease-out infinite' }}>
        <span className="text-[9px] font-semibold text-dash-blue">Downtown Clinic</span>
        <span className="text-[8px] text-ink-muted">0 staff</span>
      </div>
    </Stage>
  )
}

export function TeamListDemo() {
  const filas = [{ n: 'Elena Martinez', c: 'EM' }, { n: 'Emily Chen', c: 'EC' }]
  return (
    <Stage className="p-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold text-ink">Employees</p>
        <span className="bg-dash-blue flex items-center gap-1 rounded-md px-2 py-1 text-[8px] font-medium text-white" style={{ animation: 'tour-pulse 4s ease-in-out infinite' }}>
          <Plus className="size-2.5" /> New
        </span>
      </div>
      <div className="mt-2 space-y-1.5">
        {filas.map((f, i) => (
          <div key={f.n} className="flex items-center gap-1.5" style={{ animation: \`tour-card-in 4s \${0.4 + i * 0.2}s ease-out infinite\` }}>
            <Avatar className="size-5"><AvatarFallback className="bg-dash-count-bg text-dash-blue-hover text-[8px]">{f.c}</AvatarFallback></Avatar>
            <span className="text-[9px] font-medium text-ink">{f.n}</span>
          </div>
        ))}
      </div>
    </Stage>
  )
}

export function SettingsMenuDemo({ resaltarComingSoon = false }: { resaltarComingSoon?: boolean }) {
  const items = ['General', 'Locations', 'Employees', 'Finance']
  return (
    <Stage className="p-2.5">
      <div className="w-[140px] rounded-lg border border-line bg-white p-1">
        {items.map((it, i) => (
          <div
            key={it}
            className="flex items-center justify-between rounded-md px-2 py-1.5 text-[9px] font-medium text-ink"
            style={i === 3 && resaltarComingSoon ? { animation: 'tour-pulse 4s ease-in-out infinite' } : undefined}
          >
            {it}
            {i === 3 && resaltarComingSoon && (
              <span className="rounded-full bg-surface-muted px-1.5 py-px text-[7px] font-semibold text-ink-muted">Coming soon</span>
            )}
          </div>
        ))}
      </div>
      <Pointer style={{ animation: 'tour-tap-move 4s ease-in-out infinite', left: 4, top: 4 }} />
    </Stage>
  )
}
`})))()}var Ze;function Qe(){return(Qe=e((()=>{Ze=`import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { NotificationBanner } from './NotificationBanner'
import { Confibot } from '@/components/help/Confibot'
import { useHelp } from '@/components/help/HelpProvider'
import { NOTIFICACIONES } from '@/data/notificaciones'
import { aviso } from '@/components/ui/toaster'
import { PatientInSessionPopup } from '@/components/patients/PatientInSessionPopup'

export function AppShell() {
  const [expanded, setExpanded] = useState(false)
  const { pathname } = useLocation()
  const { showOnScreen, confibotAbierto, closeConfibot } = useHelp()

  /* Las notificaciones viven acá y no en cada pantalla: son tareas del
     usuario, tienen que sobrevivir a la navegación y las comparten el
     banner y la campana.

     La X del banner **no borra**: sólo la saca del banner. La tarea sigue
     pendiente y sigue en la campana, que es donde vive; desde ahí se la
     puede volver a poner en el banner. Borrarla de verdad implicaría dar
     por hecha una tarea que nadie completó. */
  const [ocultasDelBanner, setOcultas] = useState<string[]>([])
  const [cursor, setCursor] = useState(0)

  const enBanner = NOTIFICACIONES.filter((n) => !ocultasDelBanner.includes(n.id))

  const ocultarDelBanner = (id: string) => {
    setOcultas((p) => [...p, id])
    /* Recorta el cursor para que nunca apunte a una que ya no se muestra. */
    setCursor((c) => Math.min(c, Math.max(0, enBanner.length - 2)))
    aviso.info('Moved to notifications.')
  }

  const volverAlBanner = (id: string) => {
    setOcultas((p) => p.filter((x) => x !== id))
    setCursor(0)
  }

  /* En mobile el sidebar es un panel encima del contenido: al navegar se
     cierra solo, si no queda tapando la pantalla a la que acabás de entrar. */
  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) setExpanded(false)
  }, [pathname])

  return (
    <div className="flex min-h-svh">
      <Sidebar expanded={expanded} onClose={() => setExpanded(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          expanded={expanded}
          onToggleSidebar={() => setExpanded((v) => !v)}
          notificaciones={NOTIFICACIONES}
          ocultasDelBanner={ocultasDelBanner}
          onVolverAlBanner={volverAlBanner}
        />
        <NotificationBanner
          items={enBanner}
          cursor={Math.min(cursor, Math.max(0, enBanner.length - 1))}
          onCursor={setCursor}
          onOcultar={ocultarDelBanner}
        />
        {/* \`clip\`, no \`hidden\`: hidden vuelve a <main> contenedor de scroll y deja sin efecto todo sticky de adentro. */}
        <main className="bg-page-background flex-1 overflow-x-clip">
          <Outlet />
        </main>
      </div>
      {/* Activo en toda la app, no sólo en Patients -Julián lo pidió así: quiere
          saber quién está en el sillón esté donde esté navegando-. ClinicalMode
          queda afuera igual porque ese layout no pasa por AppShell. */}
      <PatientInSessionPopup />
      <Confibot abierto={confibotAbierto} onClose={closeConfibot} onShowOnScreen={showOnScreen} />
    </div>
  )
}
`})))()}var $e;function et(){return(et=e((()=>{$e=`import { useEffect, useMemo, useRef, useState } from 'react'
import { MapPin, ChevronDown, Search, Check, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'

/* Figma 3605:56446 → "Select Location Modal" (I3605:56446;7805:3715).

   Rediseño propio del panel, pedido por Julián. Qué cambió y por qué:

   - **El contador dice cuántas hay de verdad.** El frame rotula "40
     locations" con dos en la lista; con el buscador andando el número tiene
     que seguir a lo que se ve.
   - **Los favoritos se marcan y desmarcan**, y **suben al tope de la lista**
     en su propio grupo. En el frame la estrella es decorativa, y una lista de
     40 sin forma de fijar las de siempre no sirve.
   - **Cada fila pasó a una sola línea de identidad**: inicial en cuadrito,
     nombre y ciudad juntos, y la zona horaria y los roles debajo. Antes el
     nombre competía con la zona horaria en la misma línea y los roles
     colgaban sueltos.
   - **La elegida se marca con la barra de acento azul** del sistema, no sólo
     con un borde: se distingue de un vistazo entre muchas. */

type Location = {
  name: string
  ciudad: string
  timezone: string
  roles: string[]
}

const LOCATIONS: Location[] = [
  { name: 'Abril', ciudad: 'Los Angeles', timezone: 'Europe/Berlin', roles: ['Administrator', 'Dentist', '+1'] },
  { name: 'Alaska Medical', ciudad: 'Anchorage', timezone: 'Europe/Berlin', roles: ['Administrator'] },
  { name: 'Bayside Dental', ciudad: 'Miami', timezone: 'America/New_York', roles: ['Dentist'] },
  { name: 'Northgate Clinic', ciudad: 'Seattle', timezone: 'America/Los_Angeles', roles: ['Administrator', 'Hygienist'] },
  { name: 'Riverside Care', ciudad: 'Austin', timezone: 'America/Chicago', roles: ['Hygienist'] },
]

const iniciales = (n: string) =>
  n.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()

function Fila({
  loc, actual, favorita, onElegir, onFavorita,
}: {
  loc: Location
  actual: boolean
  favorita: boolean
  onElegir: () => void
  onFavorita: () => void
}) {
  return (
    <div
      className={cn(
        'flex items-start gap-2.5 rounded-[10px] border border-l-[3px] p-2.5 transition-colors',
        actual ? 'border-dash-blue bg-[#f8faff]' : 'border-transparent hover:bg-surface-subtle',
      )}
    >
      <button type="button" onClick={onElegir} className="flex min-w-0 flex-1 items-start gap-2.5 text-left">
        <span className="bg-dash-count-bg text-dash-blue-hover flex size-8 shrink-0 items-center justify-center rounded-md text-[11px] font-semibold">
          {iniciales(loc.name)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5">
            <span className="truncate text-[13px] leading-none font-semibold text-ink">
              {loc.name}
            </span>
            <span className="truncate text-[13px] leading-none text-ink-muted">· {loc.ciudad}</span>
            {actual && <Check className="text-dash-blue size-3.5 shrink-0" />}
          </span>
          {/* Los roles y la zona horaria en un solo renglón de texto: tres
              pastillas por fila multiplicadas por 40 locaciones eran una
              alfombra de color que competía con el nombre. */}
          <span className="mt-1 block truncate text-[11px] leading-relaxed text-ink-faint">
            {loc.timezone} · {loc.roles.join(' · ')}
          </span>
        </span>
      </button>

      <button
        type="button"
        onClick={onFavorita}
        aria-label={favorita ? \`Remove \${loc.name} from favorites\` : \`Add \${loc.name} to favorites\`}
        aria-pressed={favorita}
        className="shrink-0 rounded p-1 transition-colors hover:bg-black/5"
      >
        <Star className={cn('size-4', favorita ? 'fill-amber-400 text-amber-400' : 'text-ink-faint')} />
      </button>
    </div>
  )
}

export function LocationSelector() {
  const [open, setOpen] = useState(false)
  const [actual, setActual] = useState(LOCATIONS[0].name)
  const [favoritas, setFavoritas] = useState<string[]>([LOCATIONS[0].name])
  const [q, setQ] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const elegida = LOCATIONS.find((l) => l.name === actual) ?? LOCATIONS[0]

  /* Estado explícito en vez de :focus — un click en un button no siempre
     mueve document.activeElement ni dispara :focus-visible. */
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const { favs, resto } = useMemo(() => {
    const visibles = LOCATIONS.filter((l) =>
      \`\${l.name} \${l.ciudad} \${l.timezone}\`.toLowerCase().includes(q.trim().toLowerCase()),
    )
    return {
      favs: visibles.filter((l) => favoritas.includes(l.name)),
      resto: visibles.filter((l) => !favoritas.includes(l.name)),
    }
  }, [q, favoritas])

  const elegir = (loc: Location) => {
    setOpen(false)
    setQ('')
    if (loc.name === actual) return
    setActual(loc.name)
    aviso.ok(\`Switched to \${loc.name} - \${loc.ciudad}.\`)
  }

  const alternarFavorita = (loc: Location) =>
    setFavoritas((prev) =>
      prev.includes(loc.name) ? prev.filter((n) => n !== loc.name) : [...prev, loc.name],
    )

  const total = favs.length + resto.length

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={cn(
          'flex h-8 items-center gap-3 rounded-md border bg-white py-1 pr-[11px] pl-[7px] transition-colors',
          /* Abierto, el selector toma borde azul (Figma: border-dash-blue). */
          open ? 'border-dash-blue' : 'border-line',
        )}
      >
        <MapPin className="text-dash-blue size-4 shrink-0" />
        <span className="text-sm leading-none whitespace-nowrap">
          <span className="text-dash-blue">{elegida.name}</span>{' '}
          <span className="font-medium text-black">- {elegida.ciudad}</span>
        </span>
        <ChevronDown
          className={cn(
            'size-4 shrink-0 text-[#0f172a] transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Select location"
          className={cn(
            'absolute top-[calc(100%+5px)] left-0 z-50 w-[320px] max-w-[calc(100vw-24px)] rounded-xl border border-line bg-white p-4',
            'flex flex-col gap-3 shadow-[0_8px_28px_rgb(0_0_0/0.18)]',
            'motion-safe:animate-[loc-in_140ms_ease-out]',
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-base leading-[1.3] font-semibold text-ink">Select location</p>
            {/* Contador en texto plano: es un dato de contexto, no un estado
                que merezca una pastilla de color. Y sigue a la lista — el
                frame decía 40 con dos. */}
            <span className="shrink-0 text-[11px] text-ink-faint">
              {total} {total === 1 ? 'location' : 'locations'}
            </span>
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search..."
              className="focus:border-dash-blue h-8 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] font-medium shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
            />
          </div>

          <div className="flex max-h-[416px] flex-col gap-1 overflow-y-auto">
            {total === 0 && (
              <p className="px-1 py-6 text-center text-xs text-ink-faint">No locations match “{q}”.</p>
            )}

            {favs.length > 0 && (
              <>
                <p className="px-1 pt-1 text-[10px] font-semibold tracking-wide text-ink-faint uppercase">
                  Favorites
                </p>
                {favs.map((loc) => (
                  <Fila
                    key={loc.name} loc={loc} actual={loc.name === actual} favorita
                    onElegir={() => elegir(loc)} onFavorita={() => alternarFavorita(loc)}
                  />
                ))}
              </>
            )}

            {resto.length > 0 && (
              <>
                {favs.length > 0 && (
                  <p className="px-1 pt-2 text-[10px] font-semibold tracking-wide text-ink-faint uppercase">
                    All locations
                  </p>
                )}
                {resto.map((loc) => (
                  <Fila
                    key={loc.name} loc={loc} actual={loc.name === actual} favorita={false}
                    onElegir={() => elegir(loc)} onFavorita={() => alternarFavorita(loc)}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
`})))()}var tt;function nt(){return(nt=e((()=>{tt=`import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ANCHO_PAGINA } from '@/lib/estilos'
import type { Notificacion } from '@/data/notificaciones'

/* Banner de tareas pendientes, arriba de todo. Muestra una por vez con
   flechas ‹ › y el contador al medio; queda hasta que se descarta.
   Ver design-reference/figma/modulos/header-sidebar.md. */
export function NotificationBanner({
  items, cursor, onCursor, onOcultar,
}: {
  items: Notificacion[]
  cursor: number
  onCursor: (i: number) => void
  /** Saca la tarea del banner; sigue pendiente y sigue en la campana. */
  onOcultar: (id: string) => void
}) {
  if (items.length === 0) return null
  const actual = items[cursor]
  const Icono = actual.icon
  const mover = (paso: number) => onCursor((cursor + paso + items.length) % items.length)

  return (
    /* Ámbar, no azul: es el par de "atención" que ya usan GuarantorBanner y
       NewHoursModal (\`#fffbeb\` con \`#b45309\`), el mismo que el badge
       \`warning\`. El azul lo dejaba leer como información, no como algo
       pendiente de hacer. */
    <div className="border-b border-[#fde68a] bg-[#fffbeb]">
      <div className={cn(ANCHO_PAGINA, 'flex items-center gap-3 px-4 py-2.5 sm:px-6')}>
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-attn-fg">
        <Icono className="size-3.5" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-semibold text-attn-fg">{actual.titulo}</span>
        <span className="hidden truncate text-[12px] text-[#92400e] sm:block">{actual.detalle}</span>
      </span>

      <Link
        to={actual.to}
        className="hidden shrink-0 text-[12px] font-semibold text-attn-fg hover:underline sm:inline"
      >
        {actual.accion}
      </Link>

      {/* Las flechas sólo tienen sentido con más de una. */}
      {items.length > 1 && (
        <span className="flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            onClick={() => mover(-1)}
            aria-label="Previous notification"
            className="flex size-6 items-center justify-center rounded-md text-attn-fg hover:bg-white"
          >
            <ChevronLeft className="size-4" />
          </button>
          <span className="text-[11px] font-semibold whitespace-nowrap text-[#92400e] tabular-nums">
            {cursor + 1} of {items.length}
          </span>
          <button
            type="button"
            onClick={() => mover(1)}
            aria-label="Next notification"
            className="flex size-6 items-center justify-center rounded-md text-attn-fg hover:bg-white"
          >
            <ChevronRight className="size-4" />
          </button>
        </span>
      )}

      <button
        type="button"
        onClick={() => onOcultar(actual.id)}
        aria-label={\`Hide from banner: \${actual.titulo}\`}
        title="Hide from banner — stays in notifications"
        className={cn('flex size-6 shrink-0 items-center justify-center rounded-md text-attn-fg/70 hover:bg-white hover:text-attn-fg')}
      >
        <X className="size-4" />
      </button>
      </div>
    </div>
  )
}
`})))()}var rt;function it(){return(it=e((()=>{rt=`import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  GalleryVerticalEnd, House, Users, CalendarRange, CreditCard,
  MessageSquare, Phone, Files, ChartPie, CircleHelp, Settings, Bot,
  ChevronRight, ChevronDown, type LucideIcon,
} from 'lucide-react'
import { SETTINGS_NAV } from '@/data/settings-nav'
import { useHelp } from '@/components/help/HelpProvider'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

type NavItem = { to: string; label: string; icon: LucideIcon; end?: boolean }

/* Con el rail colapsado los ítems son sólo un ícono: el nombre sale en un
   tooltip al costado. Expandido no hace falta -el label ya se ve-. Reemplaza
   al \`title\` nativo, que tardaba en aparecer y se veía distinto al resto de la
   app. Settings queda afuera a propósito: al pasar el mouse ya abre su menú
   flotante en ese mismo lugar. */
function ConTooltip({
  label, mostrar, children,
}: {
  label: string
  mostrar: boolean
  children: React.ReactElement
}) {
  if (!mostrar) return children
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="right" sideOffset={10} className="bg-ink text-white">{label}</TooltipContent>
    </Tooltip>
  )
}

/* Figma 3605:56447 "Sidebar Rail (Collapsed Icons)".
   Rail 58px sobre #fafafa, bloque de logo 64px en #1a4da9 (un azul más
   oscuro que el primario #1d56bc, que es el del ítem activo).
   Los ítems van 32×32 con pitch de 50px → gap de 18. */
const NAV: NavItem[] = [
  { to: '/', label: 'Dashboard', icon: House, end: true },
  { to: '/patients', label: 'Patients', icon: Users },
  { to: '/scheduling', label: 'Scheduling', icon: CalendarRange },
  { to: '/billing', label: 'Billing', icon: CreditCard },
  { to: '/message', label: 'Message', icon: MessageSquare },
  { to: '/contacts', label: 'Contacts', icon: Phone },
  { to: '/documents', label: 'Documents', icon: Files },
  { to: '/reports', label: 'Reports', icon: ChartPie },
  { to: '/help', label: 'Help', icon: CircleHelp },
]

export function Sidebar({
  expanded,
  onClose,
}: {
  expanded: boolean
  onClose?: () => void
}) {
  const { confibotAbierto, toggleConfibot } = useHelp()
  const { pathname } = useLocation()

  /* Mismo criterio que el \`isActive\` de NavLink. Se calcula acá y no con la
     función de \`className\` de NavLink porque el tooltip envuelve al link con
     \`asChild\`, y Radix Slot no sabe combinar una \`className\` que es función:
     la pasa como texto y el link perdía todos sus estilos. */
  const activa = (to: string, end?: boolean) =>
    pathname === to || (!end && pathname.startsWith(to) && pathname.charAt(to.length) === '/')

  /* En mobile el panel siempre está abierto de ancho completo, así que los
     ítems van con label; el modo icono es sólo para el rail de escritorio. */
  const item = (active: boolean) =>
    cn(
      'flex items-center rounded-md text-sm font-medium transition-colors',
      'mx-3 gap-3 px-3 py-2',
      expanded ? '' : 'md:mx-0 md:size-8 md:justify-center md:px-0 md:py-0',
      active ? 'bg-dash-blue text-white' : 'text-dash-muted hover:bg-black/5',
    )

  return (
    <TooltipProvider delayDuration={100}>
      {/* Fondo del panel en mobile. Arriba de md el rail es parte del layout. */}
      {expanded && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          aria-hidden
        />
      )}

      <aside
        className={cn(
          /* El scroll va sólo en mobile: en desktop un overflow acá recorta el
             menú flotante de Settings, que se sale del ancho del rail. */
          'flex h-svh flex-col bg-surface-subtle transition-[width,transform] duration-200',
          'max-md:overflow-y-auto md:overflow-visible',
          /* Mobile: panel fijo que entra desde la izquierda. */
          'fixed top-0 left-0 z-50 w-[234px]',
          expanded ? 'translate-x-0' : '-translate-x-full',
          /* Desde md vuelve a ser una columna del layout. El z-index explicito
             no es decorativo: \`position: sticky\` arma su propio contexto de
             apilamiento, asi que el z-50 del menu flotante de Settings solo
             compite adentro del rail. Con \`z-auto\` el rail entero se pintaba
             en orden de documento —antes que <main>— y cualquier caja del
             contenido le pasaba por encima. Con z-40 el rail sube completo;
             los modales y popovers del contenido usan z-50 y lo siguen
             tapando. */
          'md:sticky md:z-40 md:shrink-0 md:translate-x-0',
          expanded ? 'md:w-[234px]' : 'md:w-[58px]',
        )}
      >
      {/* Bloque del logo: ocupa exactamente el alto del header */}
      <div
        className={cn(
          'bg-dash-blue-hover flex h-16 shrink-0 items-center gap-3 px-5 text-white',
          expanded ? '' : 'md:justify-center md:px-0',
        )}
      >
        <GalleryVerticalEnd className="size-4 shrink-0" />
        <span className={cn('text-sm font-semibold', expanded ? '' : 'md:hidden')}>
          Confidentally
        </span>
      </div>

      <nav
        className={cn(
          'flex flex-col gap-1 pt-6',
          expanded ? '' : 'md:items-center md:gap-[18px]',
        )}
      >
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <ConTooltip key={to} label={label} mostrar={!expanded}>
            <NavLink to={to} end={end} aria-label={label} className={item(activa(to, end))}>
              <Icon className="size-4 shrink-0" />
              <span className={cn(expanded ? '' : 'md:hidden')}>{label}</span>
            </NavLink>
          </ConTooltip>
        ))}
        {/* No es una ruta: abre la hoja de chat de Confibot, que antes vivía
            flotando solo sobre la pantalla y tapaba otros botones flotantes
            -el de Appointment requests en Scheduling, por ejemplo-. */}
        <ConTooltip label="Confibot" mostrar={!expanded}>
          <button
            type="button"
            aria-label="Confibot"
            aria-pressed={confibotAbierto}
            onClick={toggleConfibot}
            className={item(confibotAbierto)}
          >
            <Bot className="size-4 shrink-0" />
            <span className={cn(expanded ? '' : 'md:hidden')}>Confibot</span>
          </button>
        </ConTooltip>
      </nav>

      {/* Settings va al pie del rail, en el mismo lugar colapsado y expandido:
          Julián pidió que no cambie de sitio al abrir o cerrar el menú. El
          ítem colapsado mide 32 y el expandido 36, así que se le suman 2px de
          padding abajo para que el ícono caiga exactamente en la misma altura. */}
      <div className={cn('mt-auto flex flex-col pb-6', expanded ? '' : 'md:items-center md:pb-[26px]')}>
          <SettingsItem clase={item} mostrarLabel={expanded} />
        </div>
      </aside>
    </TooltipProvider>
  )
}


/* Settings ya no abre un sidebar propio adentro de la sección: sus pantallas
   cuelgan de un menú flotante que sale al costado del ítem, como en el
   ejemplo que pasó Julián. Se abre con hover en escritorio y con clic en el
   chevron, para que también funcione con dedo. */
function SettingsItem({
  clase,
  mostrarLabel,
}: {
  clase: (active: boolean) => string
  mostrarLabel: boolean
}) {
  const [abierto, setAbierto] = useState(false)
  /* Billing es el único con sub-items: se despliega con su chevron en vez de
     mostrarlos siempre. */
  const [grupo, setGrupo] = useState<string | null>(null)
  const cierre = useRef<number | null>(null)
  const { pathname } = useLocation()
  const activo = pathname.startsWith('/settings')

  /* Un respiro antes de cerrar: si no, el menú desaparece al cruzar el hueco
     entre el ítem y el panel. */
  const abrir = () => {
    if (cierre.current) window.clearTimeout(cierre.current)
    setAbierto(true)
  }
  const cerrarConDelay = () => {
    cierre.current = window.setTimeout(() => setAbierto(false), 140)
  }

  useEffect(() => setAbierto(false), [pathname])
  useEffect(() => {
    const dentro = SETTINGS_NAV.find((s) => s.children && pathname.startsWith(s.to))
    if (dentro) setGrupo(dentro.to)
  }, [pathname])
  useEffect(() => () => { if (cierre.current) window.clearTimeout(cierre.current) }, [])

  return (
    <div
      className="relative"
      onMouseEnter={abrir}
      onMouseLeave={cerrarConDelay}
    >
      {/* El chevron es un botón aparte y no un icono adentro del link: dentro,
          cancelar la navegación dependía de que el preventDefault ganara la
          carrera contra el Link, y en touch terminaba navegando igual. */}
      <div className={cn(clase(activo), 'w-full')} data-tour="settings-menu">
        <NavLink
          to="/settings"
          title="Settings"
          /* Colapsado el ícono va centrado en su caja de 32: sin esto quedaba
             corrido 8px a la izquierda del resto de la columna. */
          className={cn('flex min-w-0 flex-1 items-center gap-3', !mostrarLabel && 'md:justify-center')}
        >
          <Settings className="size-4 shrink-0" />
          <span className={cn(mostrarLabel ? '' : 'md:hidden')}>Settings</span>
        </NavLink>
        <button
          type="button"
          aria-label="Settings menu"
          aria-expanded={abierto}
          onClick={() => setAbierto((v) => !v)}
          className={cn('shrink-0 opacity-60 hover:opacity-100', mostrarLabel ? '' : 'md:hidden')}
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {abierto && (
        /* Anclado abajo: el ítem vive al pie del rail y hacia arriba es el
           único lado donde el panel entra completo. */
        <div
          /* En el panel mobile no hay lugar al costado: ahí se despliega en
             el mismo lugar, debajo del ítem. */
          className="motion-safe:animate-[loc-in_120ms_ease-out] z-50 rounded-2xl border border-line bg-white p-2 max-md:mt-2 max-md:max-h-[45svh] max-md:overflow-y-auto md:absolute md:bottom-0 md:left-full md:ml-2 md:w-[236px] md:shadow-[0_12px_32px_rgb(0_0_0/0.18)]"
          /* En mobile el ítem vive al pie del panel, así que los once destinos
             nacen abajo del pliegue. Se los trae a la vista al abrir; en
             desktop no hace falta porque el flotante sale al costado. */
          ref={(el) => {
            if (el && window.matchMedia('(max-width: 767px)').matches) {
              el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
            }
          }}
          onMouseEnter={abrir}
          onMouseLeave={cerrarConDelay}
        >
          {SETTINGS_NAV.map((s) => (
            <div key={s.to}>
              <span
                className={cn(
                  'flex items-center rounded-lg pr-1 transition-colors',
                  pathname.startsWith(s.to) ? 'bg-dash-count-bg' : 'hover:bg-surface-muted',
                )}
              >
                <NavLink
                  to={s.to}
                  className={({ isActive }) =>
                    cn(
                      'block flex-1 px-3 py-2 text-sm',
                      isActive ? 'text-dash-blue-hover font-medium' : 'text-ink',
                    )
                  }
                >
                  {s.label}
                </NavLink>
                {s.children && (
                  <button
                    type="button"
                    aria-label={\`\${s.label} options\`}
                    aria-expanded={grupo === s.to}
                    onClick={() => setGrupo((g) => (g === s.to ? null : s.to))}
                    className="rounded p-1 text-ink-muted hover:text-black"
                  >
                    <ChevronDown className={cn('size-4 transition-transform', grupo === s.to && 'rotate-180')} />
                  </button>
                )}
              </span>
              {grupo === s.to && s.children?.map((c) => (
                <NavLink
                  key={c.to}
                  to={c.to}
                  className={({ isActive }) =>
                    cn(
                      'block rounded-lg py-1.5 pr-3 pl-7 text-[13px] transition-colors',
                      isActive ? 'text-dash-blue font-medium' : 'text-ink-muted hover:bg-surface-muted',
                    )
                  }
                >
                  {c.label}
                </NavLink>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
`})))()}var at;function ot(){return(ot=e((()=>{at=`import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  PanelLeftOpen, PanelLeftClose, Search, BellDot, ChevronDown,
  CircleUserRound, CreditCard, CircleHelp, Info, LogOut, EyeOff,
} from 'lucide-react'
import { LocationSelector } from './LocationSelector'
import type { Notificacion } from '@/data/notificaciones'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { aviso } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import { ANCHO_PAGINA } from '@/lib/estilos'

/* Figma 3636:57489 (Secretary) y 3605:56446 (Provider). Alto 64, fondo blanco.
   El glifo ⌘ del buscador aparece solo en el frame Provider — en recepcionista
   no está. Se replica esa diferencia tal cual. */
/* Índice ficticio para que el buscador global devuelva resultados reales. */
const INDICE = [
  { label: 'Mara Otero', hint: 'Patient', to: '/patients/mara-otero' },
  { label: 'Elias Aguirre', hint: 'Patient', to: '/patients/elias-aguirre' },
  { label: 'Nadia Duarte', hint: 'Patient', to: '/patients/nadia-duarte' },
  { label: 'Dashboard', hint: 'Page', to: '/' },
  { label: 'Patients', hint: 'Page', to: '/patients' },
  { label: 'Scheduling', hint: 'Page', to: '/scheduling' },
  { label: 'Settings', hint: 'Page', to: '/settings' },
]

export function Topbar({
  expanded,
  onToggleSidebar,
  showCommandHint = true,
  notificaciones = [],
  ocultasDelBanner = [],
  onVolverAlBanner,
}: {
  expanded: boolean
  onToggleSidebar: () => void
  showCommandHint?: boolean
  notificaciones?: Notificacion[]
  ocultasDelBanner?: string[]
  onVolverAlBanner?: (id: string) => void
}) {
  const ToggleIcon = expanded ? PanelLeftClose : PanelLeftOpen

  return (
    <header className="h-16 shrink-0 bg-white">
      <div className={cn(ANCHO_PAGINA, 'flex h-full items-center gap-2 pr-3 pl-[13px] sm:gap-3 sm:pr-4')}>
      {/* Left Section del Figma: greeting a la izquierda, grupo de controles
          empujado contra su borde derecho (justify-between).
          A medida que baja el ancho van cayendo, de menos a más importante:
          el saludo, la locación, el nombre del perfil y por último el ancho
          fijo del buscador. */}
      <div className="flex min-w-0 flex-1 items-center justify-between gap-3 xl:gap-6">
      <div className="flex min-w-0 shrink-0 items-center gap-2">
        {/* Botón con borde, no un icono suelto. La flecha invierte su
            dirección según el estado, con un pulso corto al presionar. */}
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
          aria-expanded={expanded}
          className={cn(
            'flex size-8 items-center justify-center rounded-md border border-line bg-white',
            'text-ink-soft transition-all duration-150 hover:bg-surface-subtle',
            'active:scale-90 motion-reduce:transition-none motion-reduce:active:scale-100',
          )}
        >
          <ToggleIcon className="size-[18px] transition-transform duration-200" />
        </button>

        <p className="hidden items-center gap-1.5 text-[19px] whitespace-nowrap text-black lg:flex">
          <span aria-hidden>👋</span> Hi! Dentist Sarah
        </p>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-4 xl:gap-6">
        <span className="hidden shrink-0 md:block">
          <LocationSelector />
        </span>

        {/* Search */}
        <GlobalSearch showCommandHint={showCommandHint} />


        <Campana items={notificaciones} ocultas={ocultasDelBanner} onVolverAlBanner={onVolverAlBanner} />
      </div>

      </div>

      {/* Perfil. El borde izquierdo es el divisor que separa del resto. */}
      <div className="flex h-[42px] shrink-0 items-center border-l border-line pl-3 sm:pl-[18px]">
        <MenuCuenta />
      </div>
      </div>
    </header>
  )
}


/* La flecha del perfil abría nada. Ahora despliega el menú de cuenta que
   pasó Julián: Profile · Suscription · Support, separador, Help center ·
   Log out. "Suscription" va con esa ortografía a propósito -así está en el
   diseño, y acá el contenido se replica tal cual-. */
const CUENTA = [
  { label: 'Profile', icon: CircleUserRound, to: '/settings/account' },
  { label: 'Suscription', icon: CreditCard, to: '/billing' },
  { label: 'Support', icon: CircleHelp, to: '/help' },
]

function MenuCuenta() {
  const navigate = useNavigate()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-md px-1 py-1 transition-colors hover:bg-surface-muted">
        <span className="bg-dash-count-bg text-dash-blue-hover flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold">
          SS
        </span>
        {/* Los dos frames del Figma difieren acá: Provider usa nombre negro
            medium + rol gris semibold; Secretary pone ambos en gris semibold.
            Se toma la versión del Provider, que da jerarquía real. */}
        <span className="hidden flex-col items-start text-[12px] leading-[1.35] sm:flex">
          <span className="font-medium text-ink">Sarah Stone</span>
          <span className="font-semibold text-ink-muted">Dentist</span>
        </span>
        <ChevronDown className="hidden size-4 shrink-0 text-ink-muted sm:block" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[248px]">
        <DropdownMenuLabel className="text-[15px] font-bold text-ink">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {CUENTA.map(({ label, icon: Icon, to }) => (
          <DropdownMenuItem key={label} onSelect={() => navigate(to)} className="gap-2.5 py-2 text-[13px]">
            <Icon className="size-4 shrink-0" /> {label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => navigate('/help')} className="gap-2.5 py-2 text-[13px]">
          <Info className="size-4 shrink-0" /> Help center
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => { aviso.ok('Signed out.'); navigate('/login') }}
          className="gap-2.5 py-2 text-[13px]"
        >
          <LogOut className="size-4 shrink-0" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* La campana es donde viven las tareas: acá están todas, incluidas las que
   se sacaron del banner. Nada se borra desde acá -siguen pendientes hasta
   que se completen-; lo que sí se puede es volver a ponerlas en el banner. */
function Campana({
  items, ocultas, onVolverAlBanner,
}: {
  items: Notificacion[]
  ocultas: string[]
  onVolverAlBanner?: (id: string) => void
}) {
  const navigate = useNavigate()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={items.length ? \`Notifications (\${items.length})\` : 'Notifications'}
        className="relative shrink-0 rounded-md p-1 text-ink-soft transition-colors hover:bg-surface-muted hover:text-black"
      >
        <BellDot className="size-5" />
        {items.length > 0 && (
          <span className="bg-dash-blue absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full text-[9px] font-semibold text-white">
            {items.length}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[320px]">
        <DropdownMenuLabel className="text-[13px] font-bold text-ink">
          Notifications {items.length > 0 && <span className="font-normal text-ink-muted">({items.length})</span>}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.length === 0 ? (
          <p className="px-2 py-6 text-center text-[13px] text-ink-faint">You&apos;re all caught up.</p>
        ) : (
          items.map((n) => (
            /* Abrirla desde acá la devuelve al banner además de llevarte a
               la tarea: vuelve al estado de siempre, sin nada escondido. */
            <DropdownMenuItem
              key={n.id}
              onSelect={() => { onVolverAlBanner?.(n.id); navigate(n.to) }}
              className="items-start gap-2.5 py-2.5"
            >
              <n.icon className="mt-0.5 size-4 shrink-0 text-attn-fg" />
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-semibold text-ink">{n.titulo}</span>
                <span className="block text-[12px] leading-snug text-ink-muted">{n.detalle}</span>
                {ocultas.includes(n.id) && (
                  <span className="mt-1 flex items-center gap-1 text-[11px] font-medium text-ink-faint">
                    <EyeOff className="size-3" /> Hidden from banner
                  </span>
                )}
              </span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function GlobalSearch({ showCommandHint }: { showCommandHint: boolean }) {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const resultados = useMemo(
    () => (q.trim() ? INDICE.filter((i) => i.label.toLowerCase().includes(q.toLowerCase())) : []),
    [q],
  )

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div ref={ref} className="relative w-full min-w-0 max-w-[304px]">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
      <input
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        placeholder="Search..."
        className={cn(
          'h-8 w-full rounded-md border border-line bg-white pl-9 text-[13px] font-medium',
          'shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint',
          'focus:border-dash-blue focus:outline-none',
          showCommandHint ? 'pr-9' : 'pr-3',
        )}
      />
      {showCommandHint && (
        <span aria-hidden className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-ink-muted">
          ⌘
        </span>
      )}
      {open && q.trim() && (
        <div className="motion-safe:animate-[loc-in_120ms_ease-out] absolute top-[calc(100%+4px)] left-0 z-50 w-full overflow-hidden rounded-md border border-line bg-white py-1 shadow-lg">
          {resultados.length === 0 ? (
            <p className="px-3 py-2 text-[13px] text-ink-faint">No results for “{q}”</p>
          ) : (
            resultados.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                onClick={() => { setOpen(false); setQ('') }}
                className="flex items-center justify-between px-3 py-2 text-[13px] hover:bg-surface-muted"
              >
                <span className="text-ink">{r.label}</span>
                <span className="text-[11px] text-ink-faint">{r.hint}</span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  )
}
`})))()}var st;function ct(){return(ct=e((()=>{st=`import { useState } from 'react'
import {
  ModalShell, FormFooter, SearchField, SelectField, TextField, DateTextField, TextArea,
} from '@/components/patients/form'
import {
  CONFIG, aItem,
  type Campo, type Categoria, type ClinicalItem,
} from '@/data/clinicalItems'
import { aviso } from '@/components/ui/toaster'

/* Figma 3648:59976 (Medical Condition), 3648:60265 (Allergy),
   3648:61266 (Past Surgery) y 3648:62265 (Medication).
   Los cuatro comparten cuerpo: 555 de ancho, campos en dos columnas y
   Cancel/Save abajo a la derecha. Cambia sólo la lista de campos, que sale
   de CONFIG en src/data/clinicalItems.ts.

   El Figma no diseña la variante de edición: la agrega el prototipo, con el
   mismo formulario precargado y el título "Edit …". */
export function ClinicalItemModal({
  categoria,
  item,
  onGuardar,
  onClose,
}: {
  categoria: Categoria
  /** Si viene, el modal edita ese ítem en vez de crear uno. */
  item?: ClinicalItem
  onGuardar: (it: ClinicalItem) => void
  onClose: () => void
}) {
  const cfg = CONFIG[categoria]
  const [v, setV] = useState<Record<string, string>>(item?.campos ?? {})
  const [intentado, setIntentado] = useState(false)
  const set = (k: string) => (valor: string) => setV((p) => ({ ...p, [k]: valor }))

  const obligatorios = cfg.campos.filter((c) => 'req' in c && c.req).map((c) => (c as { key: string }).key)
  const req = (k: string) => (intentado && !(v[k] ?? '').trim() ? 'This field is required.' : undefined)

  const guardar = () => {
    setIntentado(true)
    /* Sin toast cuando falta algo: el aviso va en el campo. */
    if (obligatorios.some((k) => !(v[k] ?? '').trim())) return
    const guardado = aItem(categoria, v, item?.id)
    onGuardar(guardado)
    aviso.ok(
      item
        ? \`\${guardado.name} was updated.\`
        : \`\${guardado.name} was added to \${categoria}.\`,
    )
    onClose()
  }

  const render = (c: Campo, i: number) => {
    switch (c.tipo) {
      case 'titulo':
        return (
          <h3 key={i} className="mt-2 text-sm font-bold text-ink sm:col-span-2">
            {c.label}
          </h3>
        )
      case 'buscador':
        return (
          <SearchField
            key={c.key} className="sm:col-span-2" label={c.label} required={c.req}
            options={c.opciones} value={v[c.key] ?? ''} onChange={set(c.key)} error={req(c.key)}
          />
        )
      case 'select':
        return (
          <SelectField
            key={c.key} label={c.label} required={c.req} options={c.opciones}
            className={c.ancho === 'full' ? 'sm:col-span-2' : undefined}
            value={v[c.key] ?? ''} onChange={set(c.key)} error={req(c.key)}
          />
        )
      /* La unidad de Strenght y de Dose no lleva label propio en el Figma:
         se apoya en el label del campo de al lado. */
      case 'unidad':
        return (
          <SelectField
            key={c.key} label={'\\u00A0'} options={c.opciones}
            value={v[c.key] ?? ''} onChange={set(c.key)}
          />
        )
      case 'texto':
        return (
          <TextField
            key={c.key} label={c.label} required={c.req} placeholder={c.ph}
            value={v[c.key] ?? ''} onChange={set(c.key)} error={req(c.key)}
          />
        )
      case 'fecha':
        return (
          <DateTextField
            key={c.key} label={c.label} required={c.req}
            className={c.ancho === 'full' ? 'sm:col-span-2' : undefined}
            value={v[c.key] ?? ''} onChange={set(c.key)} error={req(c.key)}
          />
        )
      case 'notas':
        return (
          <TextArea
            key={c.key} className="sm:col-span-2" label={c.label} required={c.req} placeholder={c.ph}
            value={v[c.key] ?? ''} onChange={set(c.key)} error={req(c.key)}
          />
        )
    }
  }

  return (
    <ModalShell
      title={item ? \`Edit \${cfg.singular}\` : cfg.titulo}
      onClose={onClose}
      width="max-w-[555px]"
      footer={<FormFooter onCancel={onClose} onSave={guardar} />}
    >
      <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
        {cfg.campos.map(render)}
      </div>
    </ModalShell>
  )
}
`})))()}var lt;function ut(){return(ut=e((()=>{lt=`import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EmptyState } from '@/components/ui/empty-state'
import type { ClinicalItem } from '@/data/clinicalItems'

/* Figma 3646:59881 — al abrir una card clínica, la card se pinta de azul y
   cuelga un popup debajo con la lista de ítems. */

const BADGE = {
  Prescribed: 'border-dash-blue bg-[#eff6ff] text-dash-blue',
  Completed: 'border-dash-ok-fg bg-dash-ok-bg text-dash-ok-fg',
}

export function ClinicalPopover({
  title,
  anchor,
  items,
  onAdd,
  onEdit,
  onDelete,
  onClose,
}: {
  title: string
  anchor: DOMRect
  items: ClinicalItem[]
  onAdd: () => void
  onEdit: (it: ClinicalItem) => void
  onDelete: (it: ClinicalItem) => void
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const onDown = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (ref.current && !ref.current.contains(t) && !t.closest?.('[data-clinical-card]')) onClose()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
    }
  }, [onClose])

  /* Cuelga debajo del ancla y alineado a su borde izquierdo. Si no entra
     hacia abajo, se corre para arriba en vez de obligar a scrollear.

     Toma el ancho del ancla, pero nunca menos de 300: colgado de una card del
     dashboard eso es el ancho de la card, y colgado de un contador de la barra
     clínica —46px— el panel quedaba en una tira ilegible. */
  const ancho = Math.min(Math.max(anchor.width, 360), window.innerWidth - 16)
  const left = Math.max(8, Math.min(anchor.left, window.innerWidth - ancho - 8)) + window.scrollX
  const [top, setTop] = useState(anchor.bottom + 6 + window.scrollY)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const alto = el.offsetHeight
    const cabeAbajo = anchor.bottom + 6 + alto <= window.innerHeight - 12
    const y = cabeAbajo
      ? anchor.bottom + 6
      : Math.max(12, Math.min(anchor.top - 6 - alto, window.innerHeight - alto - 12))
    setTop(y + window.scrollY)
  }, [anchor.bottom, anchor.top])

  return createPortal(
    <div
      ref={ref}
      role="dialog"
      aria-label={title}
      style={{ left, top, width: ancho }}
      className="motion-safe:animate-[fab-panel-in_160ms_cubic-bezier(0.16,1,0.3,1)] absolute z-40 origin-top rounded-lg border border-line bg-[#fafcff] p-2 shadow-[0_8px_24px_rgb(0_0_0/0.12)]"
    >
      <div className="flex flex-col gap-1.5">
        {items.length === 0 && (
          <EmptyState title="Nothing recorded" detail={\`No \${title.toLowerCase()} for this patient yet.\`} className="py-6" />
        )}

        {/* El azul es hover, no selección: en el Figma el primer ítem aparece
            pintado porque el frame quedó capturado con el mouse encima. */}
        {items.map((it) => (
          <div
            key={it.id}
            className="group rounded-md border border-transparent bg-white px-3 py-2 transition-colors hover:border-dash-blue hover:bg-[#eff6ff]"
          >
            {/* El nombre va en su propia línea. Compartiendo fila con la pill,
                el "Since" y los dos íconos, en un panel angosto se truncaba
                hasta desaparecer: colgado del contador de la barra clínica no
                se leía qué medicación era. */}
            <div className="flex items-start gap-2">
              <span className="group-hover:text-dash-blue min-w-0 flex-1 text-[13px] font-semibold break-words text-ink transition-colors">
                {it.name}
              </span>
              <span className={cn('shrink-0 rounded-full border px-2 py-[1px] text-[10px] font-semibold', BADGE[it.status])}>
                {it.status}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span className="min-w-0 flex-1 truncate text-[10px] tracking-wide text-ink-faint">
                {it.detail}
              </span>
              <span className="shrink-0 text-[11px] text-ink-muted">Since: {it.since}</span>
              <button
                type="button"
                aria-label={\`Edit \${it.name}\`}
                onClick={() => onEdit(it)}
                className="shrink-0 text-ink hover:opacity-60"
              >
                <Pencil className="size-3.5" />
              </button>
              <button
                type="button"
                aria-label={\`Delete \${it.name}\`}
                onClick={() => onDelete(it)}
                className="shrink-0 text-ink hover:text-field-error"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          </div>
        ))}

        {/* Alta desde el propio listado; el botón + de la card hace lo mismo. */}
        <button
          type="button"
          onClick={onAdd}
          className="text-dash-blue hover:bg-dash-count-bg flex items-center justify-center gap-1.5 rounded-md border border-dashed border-[#c3d0ee] px-3 py-2 text-xs font-medium transition-colors"
        >
          <Plus className="size-3.5" /> Add {title}
        </button>
      </div>
    </div>,
    document.body,
  )
}
`})))()}var dt;function ft(){return(ft=e((()=>{dt=`import { useState } from 'react'
import {
  ModalShell, SelectField, FieldLabel, OptionCheckbox, FormFooter,
} from '@/components/patients/form'
import { PersonaSeleccionada, type PersonaDirectorio } from '@/pages/patients/AddRelationship'
import { aviso } from '@/components/ui/toaster'

/* Figma 3716:81940. A diferencia de "Add Relationship", esta sí es modal y
   se abre encima de la pantalla anterior. No trae Direction: el propio
   diseño aclara que esa parte no se puede editar. */
export function EditRelationshipModal({
  persona,
  onClose,
}: {
  persona: PersonaDirectorio
  onClose: () => void
}) {
  const [rel, setRel] = useState('')
  const [intentado, setIntentado] = useState(false)

  const guardar = () => {
    setIntentado(true)
    if (!rel.trim()) return
    aviso.ok(\`Relationship with \${persona.name} updated to \${rel}.\`)
    onClose()
  }

  return (
    <ModalShell
      title="Edit Relationship"
      onClose={onClose}
      width="max-w-[780px]"
      footer={<FormFooter onCancel={onClose} onSave={guardar} />}
    >
      <section className="rounded-lg border border-line bg-white p-5">
        <h3 className="text-sm font-semibold text-ink">Person</h3>
        <div className="mt-3">
          <PersonaSeleccionada p={persona} />
        </div>
      </section>

      <section className="mt-5 rounded-lg border border-line bg-white p-5">
        <h3 className="text-sm font-semibold text-ink">Relationship</h3>
        <p className="mt-1.5 max-w-[520px] text-xs leading-[1.5] text-ink-muted">
          The direction of this relationship cannot be changed. To update this, delete the
          relationship and create a new one.
        </p>

        <div className="mt-4 flex flex-col gap-2">
          <FieldLabel required>Role</FieldLabel>
          <div className="grid gap-x-5 gap-y-4 lg:grid-cols-2">
            <OptionCheckbox label="Guardian" />
            <OptionCheckbox label="Guarantor" />
          </div>
        </div>

        <SelectField
          className="mt-4"
          label="Relationship to Patient"
          required
          options={['Parent', 'Guardian', 'Sibling', 'Spouse', 'Child', 'Other']}
          value={rel}
          onChange={setRel}
          error={intentado && !rel.trim() ? 'This field is required.' : undefined}
        />
      </section>
    </ModalShell>
  )
}
`})))()}var pt;function mt(){return(mt=e((()=>{pt=`/* Banner de garante del frame 3768:794930.
   NO se usa en Documents: pertenece a otro flujo (paciente menor sin garante
   asignado). Queda acá para engancharlo cuando ese flujo se implemente. */
export function GuarantorBanner() {
  return (
    <div className="rounded-r-md border-l-[3px] border-attn-fg bg-[#fffbeb] px-4 py-2.5">
      <p className="text-[13px] font-bold text-attn-fg">Guarantor not assigned</p>
      <p className="text-xs text-attn-fg">
        This patient is a minor and does not have a guarantor assigned yet.
      </p>
    </div>
  )
}
`})))()}var ht;function gt(){return(gt=e((()=>{ht=`import { Link } from 'react-router-dom'
import { Mail, Pencil } from 'lucide-react'
import { Pill } from '@/components/ui/pill'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { STATUS_TONO, type PatientRow } from '@/components/patients/PatientsTable'

/* Card chica para el costado de Patients.tsx -ver Patients.tsx-: una fila,
   no la card de dos pisos de antes. Mismo avatar, nombre-link, pill y menú
   que ya tiene cada fila de la tabla; el cumpleaños queda afuera -ya está en
   la tabla de al lado- para que la card entre en un renglón.
   La sombra es la misma que usa \`SolicitudCard\` en Scheduling para sus cards
   chicas -la \`shadow-inner-card\` del Dashboard se pensó para cards grandes y
   acá, sin borde, se veía como una línea cortada en vez de una sombra. */

export function PatientCard({
  row, onEdit,
}: {
  row: PatientRow
  onEdit: (row: PatientRow) => void
}) {
  return (
    <article className="flex items-center gap-2.5 rounded-lg border border-line bg-white p-2.5 shadow-[0_1px_3px_rgb(0_0_0/0.08)]">
      <span className="bg-dash-blue-hover flex size-8 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-surface-subtle">
        {row.initials}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="flex items-center gap-1.5">
          <Link
            to={\`/patients/\${row.id}\`}
            className="text-dash-blue min-w-0 truncate text-[13px] font-semibold hover:underline"
          >
            {row.name}
          </Link>
          <Pill tone={STATUS_TONO[row.status]} size="sm" className="shrink-0">{row.status}</Pill>
        </span>
        <span className="flex items-center gap-1 text-[11px] text-ink-muted">
          <Mail className="size-3 shrink-0" />
          <span className="truncate">{row.email}</span>
        </span>
      </span>
      <RowActionsMenu label={row.name} className="shrink-0">
        <DropdownMenuItem onSelect={() => onEdit(row)}>
          <Pencil className="size-4 shrink-0" /> Edit
        </DropdownMenuItem>
      </RowActionsMenu>
    </article>
  )
}
`})))()}var _t;function vt(){return(vt=e((()=>{_t=`import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, LogOut, Radio, UserRound } from 'lucide-react'
import { cn } from '@/lib/utils'
import { HOY_DEMO, datosDelDia } from '@/components/dashboard/dashboard-data'

/* Mismo slug que usa patientsStore para armar el id de un paciente nuevo:
   acá no hay un id real detrás del turno -sólo \`name\`-, así que se
   reconstruye igual para que "View chart" caiga en la misma ruta. */
const slug = (s: string) => s.toLowerCase().trim().replace(/\\s+/g, '-')

/* Indicador de "quién está en el sillón ahora", activo en toda la app (ver
   AppShell.tsx) -Julián lo quiere visible esté donde esté navegando, no sólo
   en Patients-. Usa los mismos turnos de hoy que el panel "Today
   Appointments" de Patients.tsx -mismo \`datosDelDia(HOY_DEMO)\`-, así que no
   es un dato inventado aparte: un turno de hoy que todavía no está
   completado.

   Historial de esta pieza, todo por comentarios de Julián:
   1. Al principio mostraba un paciente a la vez con un cronómetro de "en el
      sillón hace", y "Check out" pasaba al siguiente. Julián lo corrigió: un
      provider puede tener varios pacientes en curso a la vez, cada uno en su
      room -no son una cola de a uno-, así que ahora lista TODOS los turnos
      de \`enCurso\`, uno abajo del otro. El cronómetro se cae con el cambio
      -no tiene sentido un solo reloj para varios pacientes en paralelo-; en
      su lugar cada fila muestra la hora del turno, que ya es un dato real.
      "Check out" ahora es por fila y lo saca de la lista (estado local
      \`ocultos\`, por índice: son datos de demo, no hay id detrás).
   1b. Primera versión de la lista: filas apretadas -8px de alto entre ellas,
      sin línea divisoria- y el punto verde animado repetido en cada avatar.
      Julián marcó las dos cosas: sin jerarquía (todo el texto pesaba igual,
      la room -el dato que justifica la lista- se perdía en una línea gris
      junto al provider) y el \`animate-ping\` de cada fila, repetido varias
      veces a la vez, mareaba en vez de comunicar "en vivo". Ahora: nombre en
      negro/negrita arriba, la room como chip de color abajo -es el dato que
      distingue una fila de otra-, provider en gris al lado del chip, hora y
      Check out a la derecha; filas separadas por una línea, no por gap. El
      ping se saca de cada fila -"en vivo" ya lo dice el label verde de
      arriba- y se deja sólo en el avatar de la pestaña cerrada, donde es un
      único aviso con sentido ("hay algo pasando"), no un parpadeo por fila.
   1c. Segunda vuelta: con jerarquía pero el botón del avatar seguía
      estirado a lo alto por \`items-stretch\` -un ícono chico centrado en un
      montón de blanco-. Julián pidió dos cosas más: un ícono de colapsar
      arriba en vez de dejar ese hueco, y sacar el punto verde también de la
      pestaña cerrada -"esa animación del círculo" pasa al stroke de toda la
      caja, tipo indicador "vivo" de un panel de IA (glow suave en el
      borde, \`session-live\` en index.css) en vez de un punto que titila.
      \`items-start\` en la fila hace que el botón ya no se estire; abierto,
      ese mismo botón cambia el avatar por un chevron de colapsar (con
      \`items-start\` queda del tamaño justo, no ocupa la fila entera). El
      glow sólo corre si \`visibles.length\` > 0 -nadie en curso, nada que
      avisar-. Y la pestaña ya no desaparece en 0: capaz entra un paciente
      más, así que el ícono queda con un ícono neutro y la lista muestra un
      estado vacío en vez de desmontar todo el componente.
   2. Era una card fija abajo a la derecha que tapaba filas de la tabla o de
      Recent Patients, y cerrarla con la X la perdía hasta recargar.
   3. Moverla debajo de la campana (arriba a la derecha) no alcanzaba: ahí
      arriba empieza el panel "Today Appointments", así que una card fija de
      este tamaño terminaba tapándole el encabezado igual -no hay hueco
      vacío ahí, sólo se corre el problema unos px-, y además competía con el
      botón "+ New Patient", que vive en esa misma esquina.
   Por eso el disparador vive como una pestaña angosta pegada al borde
   derecho, centrada verticalmente -lejos del header y de cualquier botón,
   estática: no se mueve ni de acá ni con el scroll-, sólo el avatar y el
   punto en vivo, nada de texto.

   4. Julián no quiso el detalle como popover: con \`DropdownMenu\` (Radix) el
      panel es un elemento aparte que aparece flotando al lado -entra con su
      propia animación, desconectado de la pestaña que lo abrió-. Ahora es
      una sola caja anclada al borde derecho que cambia de ancho: la pestaña
      angosta (sólo el avatar) y la card abierta (avatar + detalle) son el
      mismo elemento, y lo que se ve es esa caja desplegándose en el lugar
      donde ya estaba, no una segunda pieza independiente entrando desde
      otro lado. Cierra con click afuera o Escape, a mano -ya no lo maneja
      Radix-. */
export function PatientInSessionPopup() {
  const enCurso = useMemo(
    () => datosDelDia(HOY_DEMO).appointments.filter((a) => !a.completado),
    [],
  )
  const [ocultos, setOcultos] = useState<Set<number>>(() => new Set())
  const [abierto, setAbierto] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!abierto) return
    const fuera = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setAbierto(false)
    }
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setAbierto(false)
    document.addEventListener('mousedown', fuera)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', fuera)
      document.removeEventListener('keydown', esc)
    }
  }, [abierto])

  const visibles = enCurso.filter((_, i) => !ocultos.has(i))
  const hayEnCurso = visibles.length > 0
  const primero = visibles[0]

  return (
    <div ref={ref} className="fixed top-1/2 right-0 z-30 -translate-y-1/2">
      {/* El ancho es lo único que anima: crece desde la pestaña (54px) hasta
          la card completa (336px), siempre pegada al mismo borde derecho
          -por eso el ancla es \`right-0\` y no \`left\`, así el lado del avatar
          no se mueve, sólo se abre hacia la izquierda-.

          \`items-start\` en vez de \`items-stretch\`: con stretch, el botón del
          avatar se estiraba a lo alto de toda la card abierta -un ícono
          chico centrado en un montón de blanco de más-. Con start, el botón
          se queda en su tamaño natural sin importar cuánto mida el
          contenido de al lado.

          El glow (\`session-live\`, en index.css) reemplaza el punto verde
          animado: un aviso en el borde de toda la caja en vez de un punto
          que titila, y sólo corre si hay alguien en curso -si \`visibles\`
          queda en 0 la caja se queda quieta, sin apagarse del todo. */}
      <div
        className={cn(
          'flex items-start overflow-hidden rounded-l-xl border border-r-0 border-line bg-white shadow-[0_8px_24px_rgb(0_0_0/0.16)] transition-[width] duration-300 ease-out',
          abierto ? 'w-[336px]' : 'w-[54px]',
          hayEnCurso && 'motion-safe:animate-[session-live_2.6s_ease-in-out_infinite]',
        )}
      >
        {/* Mismo botón siempre, pero lo que muestra depende del estado: el
            avatar (o un ícono neutro si no hay nadie en curso) cerrado, un
            chevron de "colapsar" abierto -así hay algo útil arriba en vez de
            repetir un avatar que ya está abajo, en cada fila de la lista-. */}
        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-label={
            abierto
              ? 'Collapse'
              : hayEnCurso
                ? visibles.length > 1
                  ? \`Currently being seen: \${visibles.length} patients\`
                  : \`Currently being seen: \${primero.name}\`
                : 'Currently being seen: no patients'
          }
          className="flex shrink-0 items-center py-3 pr-2.5 pl-3 hover:bg-surface-subtle"
        >
          {abierto ? (
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full text-ink-muted">
              <ChevronRight className="size-4" />
            </span>
          ) : hayEnCurso ? (
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-green-tint text-[10px] font-bold text-green-deep">
              {primero.initials}
            </span>
          ) : (
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-muted text-ink-faint">
              <UserRound className="size-4" />
            </span>
          )}
        </button>

        {/* min-w mayor al hueco que deja la pestaña cerrada a propósito: así
            el contenido queda recortado por el \`overflow-hidden\` de arriba
            en vez de forzar a la caja a ser más ancha. La opacidad entra un
            toque después que el ancho -\`delay-100\`- para que no se vea el
            texto aplastándose mientras todavía no hay lugar.

            \`max-h\` (con su propio overflow-hidden) es lo que evita que este
            bloque, siempre presente en el DOM, cuente para el alto de la
            fila aunque esté cerrado y en ancho 0: cerrado cuenta como 0 de
            alto. La lista interna tiene su propio scroll -el ancho de la
            caja no cambia con la cantidad de pacientes-. */}
        <div
          className={cn(
            'flex min-w-[280px] flex-col gap-2 overflow-hidden py-3 pr-3 transition-[opacity,max-height] duration-200',
            abierto ? 'max-h-[320px] opacity-100 delay-100' : 'pointer-events-none max-h-0 opacity-0',
          )}
        >
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-green uppercase">
              <Radio className="size-3" /> Currently being seen
            </div>
            {hayEnCurso && <span className="text-[10px] font-semibold text-ink-faint">{visibles.length}</span>}
          </div>

          {hayEnCurso ? (
            <div className="flex flex-col divide-y divide-line-soft overflow-y-auto">
              {visibles.map((p) => {
                const i = enCurso.indexOf(p)
                return (
                  <div key={i} className="group flex items-center gap-2.5 py-2.5 first:pt-0.5 last:pb-0.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-green-tint text-[10px] font-bold text-green-deep">
                      {p.initials}
                    </span>
                    <Link to={\`/patients/\${slug(p.name)}\`} className="min-w-0 flex-1">
                      <p className="truncate text-[12.5px] font-bold text-ink group-hover:underline">{p.name}</p>
                      <div className="mt-1 flex min-w-0 items-center gap-1.5">
                        <span className="bg-dash-count-bg text-dash-blue-hover shrink-0 rounded-full px-1.5 py-[1px] text-[10px] font-semibold whitespace-nowrap">
                          {p.operatory}
                        </span>
                        <span className="truncate text-[10.5px] text-ink-muted">{p.provider}</span>
                      </div>
                    </Link>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <span className="text-[10px] whitespace-nowrap text-ink-faint">{p.time}</span>
                      <button
                        type="button"
                        aria-label={\`Check out \${p.name}\`}
                        onClick={() => setOcultos((prev) => new Set(prev).add(i))}
                        className="flex size-6 items-center justify-center rounded-md text-ink-faint hover:bg-[#eef1f5] hover:text-ink"
                      >
                        <LogOut className="size-3.5" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="px-1 py-3 text-[11.5px] text-ink-faint">No patients currently being seen.</p>
          )}
        </div>
      </div>
    </div>
  )
}
`})))()}var yt;function bt(){return(bt=e((()=>{yt=`import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ChevronDown, Eye, Pencil, PanelTop, FileText, Archive, Shield, BookOpen, ClipboardList, Ban, PersonStanding, Calendar, Languages, Phone, Mail, MapPin, type LucideIcon, Play, Pause, PanelLeftClose, PanelLeftOpen, IdCard,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { aviso } from '@/components/ui/toaster'
import { EditContactModal } from '@/pages/patients/EditContactModal'
import { EditableAvatar } from '@/components/ui/editable-avatar'
import { usePhoto } from '@/lib/usePhoto'

/* Figma 3646:58836 — panel izquierdo del dashboard del paciente. */

/* Todos los ítems navegan: sin \`to\` el ítem quedaba muerto en las pantallas
   que no manejan estado local, que era lo que pasaba con Ledger. */
const NAV: { key: string; icon: LucideIcon; to?: string }[] = [
  { key: 'Overview', icon: PanelTop, to: '' },
  { key: 'Treatments', icon: Archive, to: '/treatments' },
  { key: 'Insurance', icon: Shield, to: '/insurance' },
  { key: 'Ledger', icon: BookOpen, to: '/ledger' },
  { key: 'Documents', icon: ClipboardList, to: '/documents' },
  { key: 'Relationships & Billing', icon: Ban, to: '/relationships' },
]

const GENERAL = [
  { icon: PersonStanding, label: 'Gender', value: 'Male' },
  { icon: Calendar, label: 'DOB', value: '28/01/1999' },
  { icon: Languages, label: 'Language', value: 'Spanish' },
]

const CONTACT = [
  { icon: Phone, label: 'Phone', value: '(555) 234-5678' },
  { icon: Mail, label: 'Email', value: 'Johnsmith@gmail.com' },
  { icon: MapPin, label: 'Address', value: '123 Biscayne Blvd' },
]

/* Mismo mecanismo que \`useEstadoEncuentro\` de más abajo y por el mismo
   motivo: el panel se remonta en cada pantalla del paciente. */
let colapsadoGlobal = false
const oyentesColapso = new Set<() => void>()

function useColapso() {
  const [, redibujar] = useState(0)
  useEffect(() => {
    const f = () => redibujar((n) => n + 1)
    oyentesColapso.add(f)
    return () => { oyentesColapso.delete(f) }
  }, [])
  const set = (v: boolean | ((p: boolean) => boolean)) => {
    colapsadoGlobal = typeof v === 'function' ? v(colapsadoGlobal) : v
    oyentesColapso.forEach((f) => f())
  }
  return [colapsadoGlobal, set] as const
}

function InfoBlock({
  title,
  items,
  onEdit,
  className,
}: {
  title: string
  items: { icon: LucideIcon; label: string; value: string }[]
  onEdit: () => void
  className?: string
}) {
  return (
    <div className={cn('mt-5', className)}>
      <div className="flex items-center justify-between border-b border-line pb-1.5">
        <span className="text-[13px] font-semibold text-ink">{title}</span>
        <button
          type="button"
          onClick={onEdit}
          aria-label={\`Edit \${title}\`}
          className="text-ink-muted transition-colors hover:text-black"
        >
          <Pencil className="size-3.5" />
        </button>
      </div>
      <dl className="mt-3 flex flex-col gap-3">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label}>
            <dt className="flex items-center gap-2 text-xs font-medium text-ink">
              <Icon className="size-3.5 shrink-0" /> {label}
            </dt>
            <dd className="mt-0.5 text-[11px] text-ink-muted">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function PatientSidePanel({
  name,
  initials,
  section,
  basePath,
  onSection,
  onEditGeneral,
  onEditContact,
}: {
  name: string
  initials: string
  section: string
  basePath: string
  onSection?: (s: string) => void
  /* Sin handler, el panel resuelve la edición por su cuenta: antes los
     lápices quedaban muertos en Treatments, Insurance, Documents y
     Relationships, que pasaban funciones vacías. */
  onEditGeneral?: () => void
  onEditContact?: () => void
}) {
  const navigate = useNavigate()
  const [contacto, setContacto] = useState(false)
  const [foto, setFoto] = usePhoto(\`patient-photo:\${basePath}\`)
  /* Sólo colapsa en desktop -en angosto el panel ya es compacto por su
     cuenta-, para liberar ancho cuando el contenido lo necesita (p.ej. las
     tablas del Ledger). El estado vive fuera de React, igual que el del
     botón de encuentro: el panel se vuelve a montar en cada pantalla del
     paciente, así que con \`useState\` volvía a abrirse al cambiar de ítem. */
  const [colapsado, setColapsado] = useColapso()
  const [info, setInfo] = useState(false)
  const cierre = useRef<number | null>(null)
  const abrirInfo = () => {
    if (cierre.current) window.clearTimeout(cierre.current)
    setInfo(true)
  }
  const cerrarInfo = () => {
    if (cierre.current) window.clearTimeout(cierre.current)
    cierre.current = window.setTimeout(() => setInfo(false), 160)
  }

  /* Envuelve en tooltip sólo cuando el rail está colapsado: expandido el
     ítem ya dice qué es y un tooltip encima sería ruido. */
  const conTooltip = (texto: string, hijo: React.ReactNode) =>
    colapsado ? (
      <Tooltip>
        <TooltipTrigger asChild>{hijo}</TooltipTrigger>
        <TooltipContent side="right" className="bg-ink text-white">
          {texto}
        </TooltipContent>
      </Tooltip>
    ) : (
      hijo
    )

  return (
    <TooltipProvider delayDuration={150}>
    <aside className={cn('w-full rounded-lg border border-line bg-white p-4 lg:shrink-0', colapsado ? 'lg:w-[60px] lg:p-2' : 'lg:w-[218px]')}>
      <button
        type="button"
        onClick={() => setColapsado((v) => !v)}
        aria-label={colapsado ? 'Expand patient menu' : 'Collapse patient menu'}
        className={cn(
          'hidden rounded-md text-ink-muted hover:bg-surface-muted hover:text-black lg:mb-2 lg:flex lg:size-9 lg:items-center lg:justify-center',
          colapsado ? 'lg:mx-auto' : 'lg:ml-auto',
        )}
      >
        {colapsado ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
      </button>

      <div className={cn('flex items-center gap-3 lg:flex-col lg:gap-1.5', colapsado && 'lg:gap-0')}>
        {/* Colapsado el pill "Active" no entra, pero el estado del paciente
            no es un dato que se pueda perder: pasa a un punto verde sobre el
            avatar, con el nombre y la edad en el tooltip. */}
        <div className="relative">
          <EditableAvatar
            foto={foto}
            iniciales={initials}
            onChange={setFoto}
            label={name}
            avatarClassName={cn(
              'bg-dash-blue-hover rounded-full text-white size-[62px] text-lg',
              colapsado && 'lg:size-9 lg:text-[11px]',
            )}
          />
          {colapsado && conTooltip(\`\${name} · Active · 50 years\`, (
            <span
              tabIndex={0}
              aria-label={\`\${name}, Active, 50 years\`}
              className="absolute right-0 bottom-0 hidden size-3 rounded-full border-2 border-white bg-green lg:block"
            />
          ))}
        </div>
        <div className={cn('flex min-w-0 flex-col items-start gap-1.5 lg:items-center', colapsado && 'lg:hidden')}>
          <p className="truncate text-lg font-bold text-ink">{name}</p>
          <span className="rounded-full border border-dash-ok-fg bg-dash-ok-bg px-2 py-[2px] text-[10px] font-semibold text-dash-ok-fg">
            Active
          </span>
          <p className="text-[11px] text-ink-muted">50 years</p>
        </div>
      </div>

      <div className={cn('mt-3 flex flex-col gap-2 sm:flex-row lg:flex-col', colapsado && 'lg:hidden')}>
        <EncounterButton />
        <Link
          to="/patients/john-smith/clinical-mode"
          data-tour="pat-clinical-mode"
          className="text-dash-blue flex w-full items-center justify-center gap-2 rounded-md bg-[#eef5ff] py-2 text-[13px] font-medium"
        >
          <Eye className="size-3.5" /> Clinical Mode
        </Link>
      </div>

      {/* Colapsado, Clinical Mode y los datos del paciente siguen
          disponibles como íconos: son contenido del panel, no adorno que se
          pueda esconder. General/Contact se leen desde un popover. */}
      {colapsado && (
        <div className="mt-2 hidden flex-col items-center gap-1 lg:flex">
          {conTooltip('Clinical Mode', (
            <Link
              to="/patients/john-smith/clinical-mode"
              aria-label="Clinical Mode"
              className="text-dash-blue flex size-9 items-center justify-center rounded-md bg-[#eef5ff]"
            >
              <Eye className="size-4" />
            </Link>
          ))}
          {/* Abre con el mouse encima además de con click: es información de
              consulta, no una acción, y a esa altura del rail el usuario
              está apenas paseando. El cierre va con retardo para poder
              cruzar el hueco entre el botón y el panel sin que se escape. */}
          <Popover open={info} onOpenChange={setInfo}>
            {/* Sin tooltip: abriendo con el mouse encima, el panel ya dice
                qué es y el tooltip se le encimaba. */}
            <PopoverTrigger
              aria-label="Patient information"
              onMouseEnter={abrirInfo}
              onMouseLeave={cerrarInfo}
              onFocus={abrirInfo}
              className="flex size-9 items-center justify-center rounded-md text-ink hover:bg-surface-muted"
            >
              <IdCard className="size-4" />
            </PopoverTrigger>
            <PopoverContent
              side="right"
              align="start"
              onOpenAutoFocus={(e) => e.preventDefault()}
              onMouseEnter={abrirInfo}
              onMouseLeave={cerrarInfo}
              className="w-64 p-4"
            >
              <InfoBlock className="mt-0" title="General" items={GENERAL} onEdit={onEditGeneral ?? (() => navigate('/patients/edit'))} />
              <InfoBlock title="Contact" items={CONTACT} onEdit={onEditContact ?? (() => setContacto(true))} />
            </PopoverContent>
          </Popover>
        </div>
      )}

      {/* Apilado el panel ocupa toda la pantalla antes del contenido. En
          angosto la nav pasa a una tira horizontal —con altura de toque real
          y un degradado a la derecha que avisa que sigue— y los bloques de
          datos van a dos columnas. */}
      <div className="relative mt-3 lg:mt-0">
      <nav data-tour="pat-tabs" className={cn(
        '-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 lg:mx-0 lg:mt-3 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0 lg:pb-0',
        colapsado && 'lg:mt-2 lg:items-center lg:gap-1',
      )}>
        {NAV.map(({ key, icon: Icon, to }) => {
          const clase = cn(
            'flex h-10 shrink-0 items-center gap-2 rounded-lg border px-3 text-left text-[13px] font-medium whitespace-nowrap',
            'lg:h-auto lg:shrink lg:gap-2.5 lg:rounded-md lg:border-0 lg:px-2.5 lg:py-2 lg:text-xs',
            colapsado && 'lg:size-9 lg:justify-center lg:gap-0 lg:p-0',
            section === key
              ? 'bg-dash-blue border-dash-blue text-white'
              : 'border-line bg-white text-ink hover:bg-surface-muted lg:bg-transparent',
          )
          const contenido = (
            <>
              <Icon className={cn('size-4 shrink-0 lg:size-3.5', colapsado && 'lg:size-4')} />
              <span className={cn(colapsado && 'lg:hidden')}>{key}</span>
            </>
          )
          /* Colapsado el label va oculto por CSS, así que sin aria-label el
             ítem queda sin nombre accesible: el tooltip es sólo visual. */
          const item = to !== undefined ? (
            <Link to={\`\${basePath}\${to}\`} aria-label={colapsado ? key : undefined} className={clase}>{contenido}</Link>
          ) : (
            <button type="button" aria-label={colapsado ? key : undefined} onClick={() => onSection?.(key)} className={clase}>{contenido}</button>
          )
          return <div key={key} className="contents">{conTooltip(key, item)}</div>
        })}
      </nav>
      {/* Degradado que avisa que la tira sigue. */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white to-transparent lg:hidden"
      />
      </div>

      <div className={cn('grid gap-x-6 sm:grid-cols-2 lg:grid-cols-1', colapsado && 'lg:hidden')}>
        <InfoBlock title="General" items={GENERAL} onEdit={onEditGeneral ?? (() => navigate('/patients/edit'))} />
        <InfoBlock title="Contact" items={CONTACT} onEdit={onEditContact ?? (() => setContacto(true))} />
      </div>

      {contacto && <EditContactModal onClose={() => setContacto(false)} />}
    </aside>
    </TooltipProvider>
  )
}

export { FileText }


/* Figma (Design System) 7740:12244: el botón tiene dos estados, "Start
   Enconter" en verde con play y "Pending Encounter" en ámbar con pausa. El
   chevron alterna entre ellos.

   El verde queda en #1e9850, el de la plataforma, y no en el #28c563 del
   design system: es el mismo botón que el popup del paciente, que Julián pidió
   alinear. El ámbar sí es el #ffb82c del sistema, pero con texto oscuro: el
   frame lo pone en blanco y sobre ese fondo no se lee. */
type EstadoEncuentro = 'start' | 'pending'

/* El estado vivía en el componente y el panel se vuelve a montar en cada
   pantalla del paciente, así que al ir de Treatments a Insurance volvía a
   "Start". Ahora vive fuera de React y todas las instancias lo comparten. */
let estadoGlobal: EstadoEncuentro = 'start'
const oyentes = new Set<() => void>()

function useEstadoEncuentro() {
  const [, redibujar] = useState(0)
  useEffect(() => {
    const f = () => redibujar((n) => n + 1)
    oyentes.add(f)
    return () => { oyentes.delete(f) }
  }, [])
  const set = (v: EstadoEncuentro) => {
    estadoGlobal = v
    oyentes.forEach((f) => f())
  }
  return [estadoGlobal, set] as const
}

const ENCUENTRO = {
  start: {
    label: 'Start Enconter',
    clase: 'bg-green text-white hover:bg-[#18763e]',
    icono: <Play className="size-3.5 shrink-0" />,
  },
  pending: {
    label: 'Pending Encounter',
    clase: 'bg-amber text-[#7a4a00] hover:bg-[#f0a913]',
    icono: <Pause className="size-3.5 shrink-0" />,
  },
} as const

function EncounterButton() {
  const [estado, setEstado] = useEstadoEncuentro()
  const [abierto, setAbierto] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const actual = ENCUENTRO[estado]

  useEffect(() => {
    if (!abierto) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setAbierto(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [abierto])

  return (
    <div ref={ref} className="relative w-full">
      <span className={cn('flex w-full items-center rounded-lg text-[13px] font-semibold', actual.clase)}>
        <button
          type="button"
          onClick={() =>
            estado === 'start'
              ? aviso.ok('Encounter started.')
              : aviso.warn('Encounter is on hold.')
          }
          className="flex flex-1 items-center justify-center gap-2 py-2"
        >
          {actual.icono} {actual.label}
        </button>
        <button
          type="button"
          aria-label="Encounter options"
          aria-expanded={abierto}
          onClick={() => setAbierto((v) => !v)}
          className="px-2 py-2 opacity-80 hover:opacity-100"
        >
          <ChevronDown className={cn('size-3.5 transition-transform', abierto && 'rotate-180')} />
        </button>
      </span>

      {abierto && (
        <div className="motion-safe:animate-[loc-in_120ms_ease-out] absolute top-[calc(100%+4px)] left-0 z-30 w-full overflow-hidden rounded-lg border border-line bg-white py-1 shadow-lg">
          {(Object.keys(ENCUENTRO) as EstadoEncuentro[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => { setEstado(k); setAbierto(false); aviso.ok(\`Encounter set to \${ENCUENTRO[k].label}.\`) }}
              className={cn(
                'flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] hover:bg-surface-muted',
                estado === k && 'text-dash-blue font-medium',
              )}
            >
              {ENCUENTRO[k].icono} {ENCUENTRO[k].label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
`})))()}var xt;function St(){return(St=e((()=>{xt=`import { useState } from 'react'
import { Pencil } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Pill, type PillTone } from '@/components/ui/pill'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { Pagination } from '@/components/patients/ledger/Pagination'

/* Figma 3638:61352 — la capa se llama \`table/referral-table\`: es el componente
   de referrals reusado para pacientes, y de ahí venía un pie que decía
   "Showing 6 of 18 referrals" con 11 filas a la vista y flechas que no
   hacían nada. Confidentally 2.0 ya no arrastra esa etiqueta en esta
   pantalla, y Accounts acá mismo cuenta de verdad: el pie ahora dice lo que
   hay y el pager funciona, con el mismo componente que usan Ledger y
   Accounts. */
const POR_PAGINA = 10

/* Pedido explícito de Julián: reemplazar el status de tratamiento
   (Completed/Proposed/In Progress) por si el paciente está activo o no. */
export type PatientStatus = 'Active' | 'Inactive'

export type PatientRow = {
  id: string
  name: string
  initials: string
  birthday: string
  email: string
  status: PatientStatus
}

export const STATUS_TONO: Record<PatientStatus, PillTone> = {
  Active: 'success',
  Inactive: 'neutral',
}

/* Anchos fijos por celda; el sobrante se reparte con justify-between,
   igual que en el Figma (200+180+260+160+72 = 872 sobre 1056 útiles). */
const COLS = {
  name: 'w-[200px]',
  birthday: 'w-[180px]',
  email: 'w-[260px]',
  status: 'w-[160px]',
  actions: 'w-[72px]',
}

function HeadCell({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('flex h-full items-center', className)}>
      <span className="text-[11px] font-semibold text-ink-muted">{children}</span>
    </div>
  )
}

function Cell({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('flex h-full items-center', className)}>
      <span className="truncate text-[13px] text-ink-soft">{children}</span>
    </div>
  )
}

export function PatientsTable({
  rows,
  onRowAction,
}: {
  rows: PatientRow[]
  onRowAction?: (row: PatientRow) => void
}) {
  const [pagina, setPagina] = useState(1)
  const paginas = Math.max(1, Math.ceil(rows.length / POR_PAGINA))
  const actual = Math.min(pagina, paginas)
  const visibles = rows.slice((actual - 1) * POR_PAGINA, actual * POR_PAGINA)
  const desde = rows.length === 0 ? 0 : (actual - 1) * POR_PAGINA + 1

  return (
    /* Las columnas suman 872: en pantallas angostas la tabla scrollea sola en
       vez de recortarse contra el borde. */
    <div className="overflow-x-auto rounded-lg border border-line-row bg-white">
    <div className="min-w-[880px]">
      <div className="flex h-11 w-full items-center justify-between border-b border-line-row bg-surface-alt px-4">
        <HeadCell className={COLS.name}>Full name</HeadCell>
        <HeadCell className={COLS.birthday}>Birthday</HeadCell>
        <HeadCell className={COLS.email}>Email</HeadCell>
        <HeadCell className={COLS.status}>Status</HeadCell>
        <HeadCell className={COLS.actions}>Actions</HeadCell>
      </div>

      {visibles.map((r, i) => (
        <div
          key={\`\${r.email}-\${i}\`}
          className={cn(
            'flex h-14 w-full items-center justify-between bg-white px-4',
            i < rows.length - 1 && 'border-b border-line-row',
          )}
        >
          <div className={cn('flex h-full items-center gap-2.5', COLS.name)}>
            <span className="bg-dash-blue-hover flex size-8 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-surface-subtle">
              {r.initials}
            </span>
            {/* El nombre es el acceso al dashboard del paciente. */}
            <Link
              to={\`/patients/\${r.id}\`}
              onClick={(e) => e.stopPropagation()}
              className="text-dash-blue truncate text-[13px] font-semibold hover:underline"
            >
              {r.name}
            </Link>
          </div>
          <Cell className={COLS.birthday}>{r.birthday}</Cell>
          <Cell className={COLS.email}>{r.email}</Cell>
          <div className={cn('flex h-full items-center', COLS.status)}>
            <Pill tone={STATUS_TONO[r.status]}>{r.status}</Pill>
          </div>
          <div className={cn('flex h-full items-center justify-center', COLS.actions)}>
            <RowActionsMenu label={r.name}>
              <DropdownMenuItem onSelect={() => onRowAction?.(r)}>
                <Pencil className="size-4 shrink-0" /> Edit
              </DropdownMenuItem>
            </RowActionsMenu>
          </div>
        </div>
      ))}

      <div className="flex h-[52px] w-full items-center justify-between border-t border-line-row bg-white px-4">
        <p className="text-xs font-semibold text-ink-muted">
          Showing {desde} to {desde === 0 ? 0 : desde + visibles.length - 1} of {rows.length} patients
        </p>
        <Pagination pagina={actual} paginas={paginas} onChange={setPagina} />
      </div>
    </div>
    </div>
  )
}
`})))()}var Ct;function wt(){return(wt=e((()=>{Ct=`import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Calendar, Check, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DatePicker, formatDMY } from '@/components/ui/date-picker'

/* Primitivos de los formularios de Patients (Figma 3640:73356 y hermanos).
   Campo = label 12px + control de 36px, alto total 56 con gap.
   Escala unificada con el resto de la app: label 12, control 13. */

export function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <span className="block text-xs font-medium text-ink">
      {children}
      {required && <span className="text-required">*</span>}
    </span>
  )
}

/* El mensaje de validación vive pegado al campo. Los toasts quedan
   reservados para el resultado de la acción (guardar, borrar, descargar). */
export function FieldError({ children }: { children?: string }) {
  if (!children) return null
  return <span className="-mt-1 block text-[11px] leading-[1.35] text-field-error">{children}</span>
}

export function TextField({
  label, placeholder, required, className, value, onChange, error,
}: {
  label: string
  placeholder?: string
  required?: boolean
  className?: string
  value?: string
  onChange?: (v: string) => void
  /** Mensaje de validación. Pinta el borde en rojo y se muestra debajo. */
  error?: string
}) {
  return (
    <label className={cn('flex flex-col gap-2', className)}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <input
        aria-invalid={!!error || undefined}
        placeholder={placeholder}
        {...(onChange ? { value: value ?? '', onChange: (e) => onChange(e.target.value) } : {})}
        className={cn(
          'h-9 w-full rounded-md border bg-white px-3 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)]',
          'placeholder:text-ink-faint focus:outline-none',
          error ? 'border-field-error focus:border-field-error' : 'focus:border-dash-blue border-line',
        )}
      />
      <FieldError>{error}</FieldError>
    </label>
  )
}

/* Opciones ficticias por campo, para que los selects funcionen de verdad.
   Si un label no está acá, cae en OPCIONES_GENERICAS. */
const OPCIONES: Record<string, string[]> = {
  Gender: ['Female', 'Male', 'Other', 'Prefer not to say'],
  Race: ['White', 'Black or African American', 'Asian', 'Native American', 'Other'],
  Ethnicity: ['Hispanic or Latino', 'Not Hispanic or Latino'],
  Profession: ['Teacher', 'Engineer', 'Nurse', 'Retired', 'Student'],
  Nationality: ['Argentina', 'United States', 'Spain', 'Brazil', 'Mexico'],
  Language: ['English', 'Spanish', 'Portuguese', 'French'],
  Religion: ['Catholic', 'Protestant', 'Jewish', 'Muslim', 'None'],
  Country: ['United States', 'Argentina', 'Spain', 'Mexico'],
  State: ['California', 'New York', 'Texas', 'Florida'],
  Relationship: ['Parent', 'Legal guardian', 'Sibling', 'Spouse'],
  Guardian: ['Mara Otero', 'Elias Aguirre', 'Nadia Duarte'],
  Requestor: ['Front desk', 'Provider', 'Patient', 'Referral'],
  'Reason for Visit': ['Consultation', 'Routine cleaning', 'Emergency', 'Follow-up'],
  Operatory: ['Operatory 1', 'Operatory 2', 'Operatory 3'],
  Status: ['Proposed', 'Check-in', 'Booked', 'In progress', 'Fulfilled'],
  'Start Time': ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'],
  'End Time': ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM'],
}
const OPCIONES_GENERICAS = ['Option A', 'Option B', 'Option C']

export function SelectField({
  label, placeholder = 'Select', required, className, options,
  value: valueProp, onChange, error,
}: {
  label: string
  placeholder?: string
  required?: boolean
  className?: string
  options?: string[]
  value?: string
  onChange?: (v: string) => void
  error?: string
}) {
  const items = options ?? OPCIONES[label] ?? OPCIONES_GENERICAS
  const [interno, setInterno] = useState<string | null>(null)
  const controlado = onChange !== undefined
  /* '' cuenta como vacío: si no, el botón se queda sin placeholder. */
  const value = controlado ? (valueProp || null) : interno
  const setValue = (v: string) => (controlado ? onChange!(v) : setInterno(v))
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-invalid={!!error || undefined}
          className={cn(
            'flex h-9 w-full items-center justify-between rounded-md border bg-white px-3 text-[13px]',
            'shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] transition-colors focus:outline-none',
            error ? 'border-field-error' : open ? 'border-dash-blue' : 'border-line',
            value ? 'text-ink' : 'text-ink-faint',
          )}
        >
          {value ?? placeholder}
          <ChevronDown className={cn('size-4 shrink-0 text-black transition-transform', open && 'rotate-180')} />
        </button>
        {open && (
          <div className="motion-safe:animate-[loc-in_120ms_ease-out] absolute top-[calc(100%+4px)] left-0 z-30 max-h-56 w-full overflow-y-auto rounded-md border border-line bg-white py-1 shadow-lg">
            {items.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => { setValue(o); setOpen(false) }}
                className={cn(
                  'flex w-full items-center justify-between px-3 py-2 text-left text-[13px] hover:bg-surface-muted',
                  value === o && 'text-dash-blue font-medium',
                )}
              >
                {o}
                {value === o && <Check className="size-3.5" />}
              </button>
            ))}
          </div>
        )}
      </div>
      <FieldError>{error}</FieldError>
    </div>
  )
}

export function DateField({
  label, required, className, onChange, error, placeholder = 'Pick a date',
}: {
  label: string
  required?: boolean
  className?: string
  onChange?: (texto: string) => void
  error?: string
  placeholder?: string
}) {
  const [value, setValueRaw] = useState<Date | null>(null)
  const setValue = (d: Date | null) => {
    setValueRaw(d)
    if (d && onChange) onChange(d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }))
  }
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <FieldLabel required={required}>{label}</FieldLabel>
      {value ? (
        <DatePicker value={value} onChange={setValue} />
      ) : (
        <div className="relative">
          <button
            type="button"
            /* Sólo se usa para Birthdate: el calendario abre en un año de
               nacimiento plausible y no en el mes actual, que dejaría a todo
               paciente nuevo como recién nacido. Los saltos de año del picker
               llevan al año que haga falta. */
            onClick={() => setValue(new Date(1990, 0, 1))}
            aria-invalid={!!error || undefined}
            className={cn(
              'flex h-9 w-full items-center gap-2 rounded-md border bg-white px-3 text-[13px] text-ink-faint',
              'shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] focus:outline-none',
              error ? 'border-field-error' : 'focus:border-dash-blue border-line',
            )}
          >
            <Calendar className="size-4 shrink-0" />
            {placeholder}
          </button>
        </div>
      )}
      <FieldError>{error}</FieldError>
      <span className="sr-only">{value ? formatDMY(value) : 'sin fecha'}</span>
    </div>
  )
}

/* Este bloque aparece 3 veces en el mismo formulario del Figma, en posiciones
   que no se relacionan entre sí. Se replica tal cual. */
export function OptionCheckbox({
  label,
  checked,
  defaultChecked = true,
  onChange,
}: {
  label: React.ReactNode
  /** Sólo para controlarlo desde afuera; sin esto se maneja solo. */
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (v: boolean) => void
}) {
  /* Antes recibía \`checked\` con default true y sin \`onChange\` quedaba
     congelado: se veía tildado y no había forma de destildarlo. Ahora, si
     nadie lo controla, lleva su propio estado. */
  const [interno, setInterno] = useState(defaultChecked)
  const controlado = checked !== undefined
  const on = controlado ? checked : interno

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={on}
      onClick={() => {
        if (!controlado) setInterno(!on)
        onChange?.(!on)
      }}
      className={cn(
        'flex w-full items-start gap-2.5 rounded-lg border bg-white p-3 text-left transition-colors',
        on ? 'border-dash-blue' : 'border-line hover:bg-surface-subtle',
      )}
    >
      <span
        className={cn(
          'mt-px flex size-4 shrink-0 items-center justify-center rounded-[3px] border transition-colors',
          on ? 'bg-dash-blue border-dash-blue' : 'border-ink-faint bg-white',
        )}
      >
        {on && <Check className="size-3 text-white" strokeWidth={3} />}
      </span>
      <span className="text-xs leading-[1.45] text-ink">{label}</span>
    </button>
  )
}

/* El texto largo se repite en New Patient, Add/Edit Relationship y en el drawer
   de planes de tratamiento: en los tres el Figma lo escribe así, aunque en
   varias posiciones no venga a cuento (anomalía 43). */
export function LinkPersonCheckbox(props: Omit<React.ComponentProps<typeof OptionCheckbox>, 'label'>) {
  return (
    <OptionCheckbox
      {...props}
      label="Use this option only to link a person that already exists in the system (e.g employee, subscriber, contact, etc)"
    />
  )
}

/* Input con lupa y sugerencias, el patrón de los modales clínicos del Figma
   (3648:59976 y hermanos): el campo principal siempre es una búsqueda. */
export function SearchField({
  label, required, className, options = [], value = '', onChange, error,
  placeholder = 'Search...',
}: {
  label: string
  required?: boolean
  className?: string
  options?: string[]
  value?: string
  onChange?: (v: string) => void
  error?: string
  placeholder?: string
}) {
  const [abierto, setAbierto] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const sugerencias = value.trim()
    ? options.filter((o) => o.toLowerCase().includes(value.trim().toLowerCase()) && o !== value)
    : options

  useEffect(() => {
    if (!abierto) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setAbierto(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [abierto])

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <div ref={ref} className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
        <input
          value={value}
          placeholder={placeholder}
          aria-invalid={!!error || undefined}
          onChange={(e) => { onChange?.(e.target.value); setAbierto(true) }}
          onFocus={() => setAbierto(true)}
          className={cn(
            'h-9 w-full rounded-md border bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)]',
            'placeholder:text-ink-faint focus:outline-none',
            error ? 'border-field-error focus:border-field-error' : 'focus:border-dash-blue border-line',
          )}
        />
        {abierto && sugerencias.length > 0 && (
          <div className="motion-safe:animate-[loc-in_120ms_ease-out] absolute top-[calc(100%+4px)] left-0 z-30 max-h-52 w-full overflow-y-auto rounded-md border border-line bg-white py-1 shadow-lg">
            {sugerencias.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => { onChange?.(o); setAbierto(false) }}
                className="block w-full px-3 py-2 text-left text-[13px] hover:bg-surface-muted"
              >
                {o}
              </button>
            ))}
          </div>
        )}
      </div>
      <FieldError>{error}</FieldError>
    </div>
  )
}

/* El Figma pide una fecha tipeada con placeholder "DD / MM / YY", no el
   calendario. Se formatea sola a medida que se escribe. */
export function DateTextField({
  label, required, className, value = '', onChange, error,
}: {
  label: string
  required?: boolean
  className?: string
  value?: string
  onChange?: (v: string) => void
  error?: string
}) {
  const formatear = (bruto: string) => {
    const d = bruto.replace(/\\D/g, '').slice(0, 6)
    return [d.slice(0, 2), d.slice(2, 4), d.slice(4, 6)].filter(Boolean).join(' / ')
  }
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <input
        inputMode="numeric"
        value={value}
        placeholder="DD / MM / YY"
        aria-invalid={!!error || undefined}
        onChange={(e) => onChange?.(formatear(e.target.value))}
        className={cn(
          'h-9 w-full rounded-md border bg-white px-3 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)]',
          'placeholder:text-ink-faint focus:outline-none',
          error ? 'border-field-error focus:border-field-error' : 'focus:border-dash-blue border-line',
        )}
      />
      <FieldError>{error}</FieldError>
    </div>
  )
}

export function TextArea({
  label, required, className, placeholder, value = '', onChange, error,
}: {
  label: string
  required?: boolean
  className?: string
  placeholder?: string
  value?: string
  onChange?: (v: string) => void
  error?: string
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <FieldLabel required={required}>{label}</FieldLabel>
      <textarea
        rows={4}
        value={value}
        placeholder={placeholder}
        aria-invalid={!!error || undefined}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          'w-full resize-none rounded-md border bg-white px-3 py-2 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)]',
          'placeholder:text-ink-faint focus:outline-none',
          error ? 'border-field-error focus:border-field-error' : 'focus:border-dash-blue border-line',
        )}
      />
      <FieldError>{error}</FieldError>
    </div>
  )
}

export function SectionCard({
  title, className, children,
}: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <section className={cn('rounded-lg border border-line bg-white p-4 sm:p-5', className)}>
      <h2 className="text-sm font-semibold text-ink">{title}</h2>
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </section>
  )
}

export function ModalShell({
  title, onClose, children, footer, aside, width = 'max-w-[860px]',
}: {
  title: string
  onClose: () => void
  children: React.ReactNode
  footer?: React.ReactNode
  /** Panel que acompaña al modal por fuera de la card, a su derecha. */
  aside?: React.ReactNode
  width?: string
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-3 sm:p-6" onClick={onClose}>
      {/* items-stretch: el panel lateral toma la altura del modal, como en el
          Figma, donde los dos frames miden 813 y arrancan en la misma y. */}
      <div className={cn('my-auto flex w-full items-stretch justify-center', aside && 'lg:w-auto')}>
      <div
        role="dialog"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'motion-safe:animate-[loc-in_160ms_ease-out] w-full rounded-xl bg-white p-5 shadow-2xl sm:p-9',
          /* Con panel al lado, los dos bordes que se tocan van rectos para que
             modal y columna lean como una sola pieza. */
          aside && 'lg:rounded-r-none',
          width,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg leading-none font-bold text-ink sm:text-[22px]">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="text-ink hover:opacity-60">
            <X className="size-5" />
          </button>
        </div>
        <div className="mt-6">{children}</div>
        {/* En angosto el panel lateral no entra al costado: entra al pie del
            propio modal, para no perder la función. */}
        {aside && <div className="mt-6 lg:hidden">{aside}</div>}
        {footer && <div className="mt-8 flex justify-end gap-3">{footer}</div>}
      </div>
      {aside && (
        /* Pegado al modal, sin separación ni solape: en 4430:61940 el
           formulario (757) y el panel (190) son hermanos de un frame de 947. */
        <div className="hidden shrink-0 lg:block" onClick={(e) => e.stopPropagation()}>
          {aside}
        </div>
      )}
      </div>
    </div>
  )
}

/* Cancel y Save van SIEMPRE en la misma fila, uno al lado del otro. El par
   trae su propio contenedor en vez de depender del flex de quien lo use: así
   no hay contenedor angosto, columna ni wrap que los separe. */
export function FormFooter({
  onCancel, onSave, cancelLabel = 'Cancel', saveLabel = 'Save',
}: {
  onCancel: () => void
  onSave?: () => void
  cancelLabel?: string
  saveLabel?: string
}) {
  return (
    <div className="flex shrink-0 flex-nowrap items-center justify-end gap-3">
      <button
        type="button"
        onClick={onCancel}
        className="h-9 shrink-0 rounded-md border border-line bg-white px-6 text-[13px] font-medium whitespace-nowrap shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] hover:bg-surface-subtle"
      >
        {cancelLabel}
      </button>
      <button
        type="button"
        onClick={onSave}
        className="bg-dash-blue hover:bg-dash-blue-hover h-9 shrink-0 rounded-md px-6 text-[13px] font-medium whitespace-nowrap text-white transition-colors"
      >
        {saveLabel}
      </button>
    </div>
  )
}
`})))()}var Tt;function Et(){return(Et=e((()=>{Tt=`import { useState } from 'react'
import { CirclePlus, Pencil, ShieldHalf, Hospital, AArrowUp } from 'lucide-react'
import {
  ModalShell, SectionCard, SearchField, SelectField, TextField,
  DateTextField, TextArea, OptionCheckbox, FormFooter,
} from '@/components/patients/form'
import { PersonaSeleccionada, DIRECTORIO } from '@/pages/patients/AddRelationship'
import { CARRIERS, PLANES_NOMBRE, ORDENES, SUSCRIPCION } from '@/data/insurance'
import { aviso } from '@/components/ui/toaster'

/* Modales de Insurance (Figma 3817:865128).
   Todos los textos se replican tal cual, incluidos "Suscription", "Depender",
   "Dependers", "Subcriber ID" y el placeholder "Loremp" — ver
   modulos/insurance.md, anomalías 60 a 66. */

/* ── New Subscription (3847:61696 / 69663 / 78489) ───────────────────── */

type Modo = 'actual' | 'existente' | 'nuevo'

const OPCIONES: { id: Modo; label: string }[] = [
  { id: 'actual', label: 'Use current patient details' },
  { id: 'existente', label: 'Use a person that already exists in the system (e.g patient, employee, contact, etc)' },
  { id: 'nuevo', label: 'Add a new subscriber' },
]

export function NewSubscriptionModal({ onClose }: { onClose: () => void }) {
  const [modo, setModo] = useState<Modo>('actual')
  const [d, setD] = useState({ subId: '', carrier: '', plan: '', inicio: '', fin: '', notas: '', nombre: '', medio: '', apellido: '', email: '', cumple: '', persona: '' })
  const [intentado, setIntentado] = useState(false)
  const set = (k: keyof typeof d) => (v: string) => setD((p) => ({ ...p, [k]: v }))
  const req = (k: keyof typeof d) => (intentado && !d[k].trim() ? 'This field is required.' : undefined)

  const guardar = () => {
    setIntentado(true)
    if (!d.carrier.trim() || !d.inicio.trim()) return
    if (modo === 'nuevo' && (!d.nombre.trim() || !d.apellido.trim() || !d.cumple.trim())) return
    aviso.ok(\`Subscription with \${d.carrier} created.\`)
    onClose()
  }

  return (
    <ModalShell title="New Subscription" onClose={onClose} footer={<FormFooter onCancel={onClose} onSave={guardar} />}>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <SectionCard title="Subscriber">
            <p className="-mt-2 text-[11px] text-ink-muted">Choose how you want to add the subscriber</p>
            {OPCIONES.map((o) => (
              <OptionCheckbox
                key={o.id}
                label={o.label}
                checked={modo === o.id}
                onChange={() => setModo(o.id)}
              />
            ))}
          </SectionCard>

          {modo === 'existente' && (
            <SectionCard title="Select Subscriber">
              <SearchField
                label="Plan name"
                options={DIRECTORIO.map((p) => p.name)}
                value={d.persona}
                onChange={set('persona')}
              />
              <PersonaSeleccionada
                p={DIRECTORIO.find((p) => p.name === d.persona) ?? DIRECTORIO[0]}
              />
            </SectionCard>
          )}

          {modo === 'nuevo' && (
            <SectionCard title="New Subscriber">
              <div className="grid gap-4 sm:grid-cols-3">
                {/* "Loremp" es el placeholder del Figma. */}
                <TextField label="Name" required placeholder="Loremp" value={d.nombre} onChange={set('nombre')} error={req('nombre')} />
                <TextField label="Middle Name" placeholder="Loremp" value={d.medio} onChange={set('medio')} />
                <TextField label="Last Name" required placeholder="Loremp" value={d.apellido} onChange={set('apellido')} error={req('apellido')} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Email" placeholder="abril@gmai.com" value={d.email} onChange={set('email')} />
                <DateTextField label="Birthday" required value={d.cumple} onChange={set('cumple')} error={req('cumple')} />
              </div>
            </SectionCard>
          )}
        </div>

        <SectionCard title="Subscription Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <SearchField label="Subcriber ID" options={[SUSCRIPCION.subscriberId]} value={d.subId} onChange={set('subId')} />
            <SearchField label="Carrier name" required options={CARRIERS} value={d.carrier} onChange={set('carrier')} error={req('carrier')} />
          </div>
          <SearchField label="Plan name" options={PLANES_NOMBRE} value={d.plan} onChange={set('plan')} />
          <div className="grid gap-4 sm:grid-cols-2">
            <DateTextField label="Approx Start Date" required value={d.inicio} onChange={set('inicio')} error={req('inicio')} />
            <DateTextField label="Approx End Date" value={d.fin} onChange={set('fin')} />
          </div>
          <TextArea label="Notes" placeholder="Add notes" value={d.notas} onChange={set('notas')} />
        </SectionCard>
      </div>
    </ModalShell>
  )
}

/* ── Manage Suscription (3847:82831) ─────────────────────────────────── */

function FilaLectura({ icon: Icon, label, value }: { icon: typeof ShieldHalf; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="size-4 shrink-0 text-ink-muted" strokeWidth={1.8} />
      <span className="leading-tight">
        <span className="block text-[11px] text-ink-faint">{label}</span>
        <span className="block text-[13px] text-ink">{value}</span>
      </span>
    </div>
  )
}

export function ManageSubscriptionModal({
  onNuevoDependiente,
  onClose,
}: {
  onNuevoDependiente: () => void
  onClose: () => void
}) {
  const [subId, setSubId] = useState('DTX-45839217')
  const [fin, setFin] = useState('03/01/2025')
  const [notas, setNotas] = useState('')
  const [intentado, setIntentado] = useState(false)

  const guardar = () => {
    setIntentado(true)
    if (!subId.trim()) return
    aviso.ok('Subscription updated.')
    onClose()
  }

  return (
    /* "Suscription" sin la b es del Figma. */
    <ModalShell title="Manage Suscription" onClose={onClose} footer={<FormFooter onCancel={onClose} onSave={guardar} />}>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <SectionCard title="Subscriber">
            <div className="relative">
              <PersonaSeleccionada p={DIRECTORIO[0]} />
              <button
                type="button"
                aria-label="Edit subscriber"
                onClick={() => aviso.info('Subscriber editing is not available in this release.')}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-ink-muted hover:text-black"
              >
                <Pencil className="size-4" />
              </button>
            </div>
          </SectionCard>

          {/* "Dependers" es del Figma. */}
          <SectionCard title="Dependers">
            <PersonaSeleccionada p={DIRECTORIO[0]} />
            <button
              type="button"
              onClick={onNuevoDependiente}
              className="text-dash-blue flex items-center gap-1.5 self-end text-[13px] font-semibold hover:underline"
            >
              <CirclePlus className="size-4" /> Add New
            </button>
          </SectionCard>
        </div>

        <SectionCard title="Subscription Information">
          <FilaLectura icon={ShieldHalf} label="Carrier" value={SUSCRIPCION.carrier} />
          <FilaLectura icon={Hospital} label="Plan" value={SUSCRIPCION.plan} />
          <FilaLectura icon={AArrowUp} label="Coverage Period" value={SUSCRIPCION.cobertura} />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Subcriber ID" required value={subId} onChange={setSubId}
              error={intentado && !subId.trim() ? 'This field is required.' : undefined}
            />
            <TextField label="Coverage End" value={fin} onChange={setFin} />
          </div>
          <TextArea label="Notes" placeholder="Add notes" value={notas} onChange={setNotas} />
        </SectionCard>
      </div>
    </ModalShell>
  )
}

/* ── New Depender (3847:95515) ───────────────────────────────────────── */

export function NewDependerModal({ onClose }: { onClose: () => void }) {
  const [d, setD] = useState({ paciente: '', subId: '', carrier: '', orden: '', inicio: '', fin: '', elegibilidad: '', verificacion: '' })
  const [intentado, setIntentado] = useState(false)
  const set = (k: keyof typeof d) => (v: string) => setD((p) => ({ ...p, [k]: v }))
  const req = (k: keyof typeof d) => (intentado && !d[k].trim() ? 'This field is required.' : undefined)

  const guardar = () => {
    setIntentado(true)
    if (!d.carrier.trim() || !d.orden.trim()) return
    aviso.ok(\`\${d.paciente || 'Dependent'} added to the subscription.\`)
    onClose()
  }

  return (
    /* "Depender" es del Figma; también es el único lugar donde "Coordination"
       está bien escrito. */
    <ModalShell title="New Depender" onClose={onClose} width="max-w-[420px]" footer={<FormFooter onCancel={onClose} onSave={guardar} />}>
      <div className="flex flex-col gap-4">
        <SearchField
          label="Dependent Patient" options={DIRECTORIO.map((p) => p.name)}
          value={d.paciente} onChange={set('paciente')}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <SearchField label="Subcriber ID" options={[SUSCRIPCION.subscriberId]} value={d.subId} onChange={set('subId')} />
          <SearchField label="Carrier name" required options={CARRIERS} value={d.carrier} onChange={set('carrier')} error={req('carrier')} />
        </div>
        <SelectField label="Coordination Order" required options={ORDENES} value={d.orden} onChange={set('orden')} error={req('orden')} />
        <div className="grid gap-4 sm:grid-cols-2">
          <DateTextField label="Coverage Start" value={d.inicio} onChange={set('inicio')} />
          <DateTextField label="Coverage End" value={d.fin} onChange={set('fin')} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <DateTextField label="Eligibility" value={d.elegibilidad} onChange={set('elegibilidad')} />
          <DateTextField label="Verification Date" value={d.verificacion} onChange={set('verificacion')} />
        </div>
      </div>
    </ModalShell>
  )
}
`})))()}var Dt;function Ot(){return(Ot=e((()=>{Dt=`import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ModalShell } from '@/components/patients/form'
import { moneda, type Movimiento } from '@/data/ledger'

/* Modal de "Apply credit" (referencia de Julián, no viene del Figma).
   Es de sólo lectura arriba -el origen del crédito y sus propios datos no
   se tocan acá, ya quedaron cargados cuando se creó el Payment/Adjustment-
   y editable sólo en la tabla de abajo, donde se elige a qué cargos
   abiertos mandar lo que todavía no se aplicó. Por eso el encabezado usa
   el mismo patrón dt/dd de sólo-lectura de \`LedgerRowModal\` (Campos) en vez
   de inputs deshabilitados: son datos, no un formulario a medio llenar.

   Segunda vuelta: la selección pasó de "escribir un número" a un checkbox
   por fila -tildarlo carga el máximo que entra, el input queda para
   ajustarlo a mano-, y todo el azul/violeta original se corrigió a azul:
   Julián marcó que el violeta no es un color que use el resto de la app. */

function fuenteDeCredito(m: Movimiento) {
  const sufijo = m.descripcion.match(/····\\d+/)?.[0]
  const etiqueta = m.tipo === 'Payment' ? 'Pt Payment' : 'Credit Adj'
  return sufijo ? \`\${etiqueta} \${sufijo}\` : m.descripcion
}

export function AplicarCreditoModal({
  m, cargos, onClose, onAplicar,
}: {
  m: Movimiento
  /** Cargos abiertos del mismo paciente -mismo filtro que usan Patient
      Payment y Credit Adjustment para su propia tabla de aplicación. */
  cargos: Movimiento[]
  onClose: () => void
  onAplicar: (montoAplicado: number) => void
}) {
  const disponible = m.creditoDisponible ?? 0
  const [aplicado, setAplicado] = useState<Record<string, string>>({})
  const [seleccionados, setSeleccionados] = useState<Set<string>>(() => new Set())

  const totalAplicado = cargos.reduce((a, c) => a + (Number(aplicado[c.id]) || 0), 0)
  const restante = Math.max(disponible - totalAplicado, 0)

  /* Tope doble: ni más que el propio saldo del cargo, ni más que lo que
     queda del crédito una vez descontado lo que ya se cargó en las otras
     filas -el mismo patrón de LedgerAllocationTable, con un segundo tope
     porque acá el total compite por una misma bolsa de dinero. */
  const cambiar = (id: string, texto: string, saldoCargo: number) => {
    const limpio = texto.replace(/[^0-9.]/g, '')
    const numero = Number(limpio)
    if (!Number.isFinite(numero)) { setAplicado((p) => ({ ...p, [id]: limpio })); return }
    const otrasFilas = totalAplicado - (Number(aplicado[id]) || 0)
    const maximo = Math.min(saldoCargo, Math.max(disponible - otrasFilas, 0))
    setAplicado((p) => ({ ...p, [id]: numero > maximo ? String(maximo) : limpio }))
  }

  /* El checkbox es la forma de elegir qué cargos nuevos entran en esta
     aplicación -no el input solo-: tildarlo carga de una el máximo que
     entra (mismo tope de \`cambiar\`), destildarlo lo vacía. El input sigue
     ahí para bajar el número a mano, pero sólo con la fila tildada. */
  const alternarSeleccion = (c: Movimiento) => {
    const yaEstaba = seleccionados.has(c.id)
    setSeleccionados((prev) => {
      const siguiente = new Set(prev)
      if (yaEstaba) siguiente.delete(c.id); else siguiente.add(c.id)
      return siguiente
    })
    if (yaEstaba) setAplicado((p) => ({ ...p, [c.id]: '' }))
    else cambiar(c.id, String(c.monto), c.monto)
  }

  const aplicar = () => {
    if (totalAplicado <= 0) return
    onAplicar(totalAplicado)
  }

  return (
    <ModalShell
      title="Apply unapplied credit"
      onClose={onClose}
      width="max-w-[820px]"
      footer={(
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="h-9 shrink-0 rounded-md border border-line bg-white px-6 text-[13px] font-medium hover:bg-surface-subtle">
            Cancel
          </button>
          <button
            type="button"
            onClick={aplicar}
            disabled={totalAplicado <= 0}
            className="bg-dash-blue hover:bg-dash-blue-hover h-9 shrink-0 rounded-md px-6 text-[13px] font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            Apply credit
          </button>
        </div>
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4 rounded-lg border border-[#c7d9fb] bg-info-bg px-4 py-3">
          <div className="min-w-0">
            <p className="text-[11px] text-ink-muted">Credit source</p>
            <p className="text-dash-blue truncate text-[15px] font-bold">{fuenteDeCredito(m)}</p>
            <p className="mt-0.5 text-[11px] text-ink-muted">Scope: Patient · {m.paciente}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[11px] text-ink-muted">Available credit</p>
            <p className="text-dash-blue text-[17px] font-bold">{moneda(disponible)}</p>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
          <div>
            <dt className="text-[11px] font-medium text-ink-muted">Transaction date</dt>
            <dd className="mt-0.5 text-[13px] text-ink">{m.fecha}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-medium text-ink-muted">Apply to</dt>
            <dd className="mt-0.5 text-[13px] text-ink">{m.paciente}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-medium text-ink-muted">Credit source</dt>
            <dd className="mt-0.5 text-[13px] text-ink">{m.tipo === 'Payment' ? 'Patient payment' : 'Credit adjustment'}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-medium text-ink-muted">Available amount</dt>
            <dd className="mt-0.5 text-[13px] font-semibold text-ink">{moneda(disponible)}</dd>
          </div>
        </dl>

        <div className="overflow-hidden rounded-lg border border-line">
          <div className="flex items-center justify-between bg-surface-alt px-3 py-2.5">
            <span className="text-[13px] font-bold text-ink">Open charges</span>
          </div>

          {cargos.length === 0 ? (
            <p className="px-3 py-6 text-center text-[12px] text-ink-muted">No open charges to apply this credit against.</p>
          ) : (
            /* overflow-x-auto propio: en mobile los seis anchos fijos no
               entran en 375px, y a diferencia de la tabla del Ledger esto
               vive adentro de un modal, sin el ancho de página completo. */
            <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="flex h-9 items-center gap-3 border-t border-line-row bg-surface-alt px-3 text-[10px] font-semibold tracking-wide text-ink-muted uppercase">
                <span className="w-[18px] shrink-0" />
                <span className="w-[92px] shrink-0">Date</span>
                <span className="w-[56px] shrink-0">Code</span>
                <span className="min-w-0 flex-1">Description</span>
                <span className="w-[96px] shrink-0 text-right">Charge balance</span>
                <span className="w-[92px] shrink-0 text-right">Applied</span>
                <span className="w-[96px] shrink-0 text-right">Balance after</span>
              </div>
              <div className="max-h-[240px] overflow-y-auto">
                {cargos.map((c) => {
                  const marcado = seleccionados.has(c.id)
                  const valor = Number(aplicado[c.id]) || 0
                  const despues = Math.max(c.monto - valor, 0)
                  return (
                    <div key={c.id} className={cn('flex items-center gap-3 border-t border-line-soft px-3 py-2 text-[12.5px] text-ink-soft', marcado && 'bg-[#f7faff]')}>
                      <span className="w-[18px] shrink-0">
                        <input
                          type="checkbox"
                          checked={marcado}
                          onChange={() => alternarSeleccion(c)}
                          aria-label={\`Select \${c.descripcion}\`}
                          className="accent-dash-blue size-[15px]"
                        />
                      </span>
                      <span className="w-[92px] shrink-0">{c.fecha}</span>
                      <span className="text-dash-blue w-[56px] shrink-0 font-medium">{c.codigo}</span>
                      <span className="min-w-0 flex-1 truncate">{c.descripcion}</span>
                      <span className="w-[96px] shrink-0 text-right tabular-nums">{moneda(c.monto)}</span>
                      <span className="w-[92px] shrink-0">
                        <input
                          value={aplicado[c.id] ?? ''}
                          onChange={(e) => cambiar(c.id, e.target.value, c.monto)}
                          disabled={!marcado}
                          inputMode="decimal"
                          placeholder="0.00"
                          aria-label={\`Applied to \${c.descripcion}\`}
                          className="focus:border-dash-blue h-7 w-full rounded-md border border-line bg-white px-2 text-right text-[12px] tabular-nums placeholder:text-ink-faint focus:outline-none disabled:bg-surface-muted disabled:text-ink-faint"
                        />
                      </span>
                      <span className="w-[96px] shrink-0 text-right font-medium tabular-nums">{moneda(despues)}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-1 border-t border-line-row bg-surface-alt px-3 py-2.5 text-[12.5px]">
            <span className="text-ink-muted">Available: <strong className="font-semibold text-ink">{moneda(disponible)}</strong></span>
            <span className="text-ink-muted">Applied: <strong className="font-semibold text-ink">{moneda(totalAplicado)}</strong></span>
            <span className="text-ink-muted">Remaining: <strong className="font-semibold text-ink">{moneda(restante)}</strong></span>
          </div>
        </div>
      </div>
    </ModalShell>
  )
}
`})))()}var kt;function At(){return(At=e((()=>{kt=`import { useState } from 'react'
import { CreditCard } from 'lucide-react'
import {
  TextField, SelectField, TextArea, FieldLabel, FormFooter,
} from '@/components/patients/form'
import { DatePicker } from '@/components/ui/date-picker'
import { GUARANTOR, DEPENDIENTES, type Movimiento } from '@/data/ledger'

/* Figma 4582:25840. Título "New Credit (+) Adjustment" a propósito, ver
   design-reference/figma/modulos/ledger.md. */

const TIPOS_AJUSTE = ['Charge Adjustment', 'Credit Adjustment']
const PROVIDERS = ['Dr. Elena Martinez', 'Dr. Emily Chen', 'Dr. Salgado']

export function ChargeAdjustmentPanel({
  cargosVisita, onCancelar, onGuardar,
}: {
  /** Cargos existentes para armar las opciones de "Visit date". */
  cargosVisita: Movimiento[]
  onCancelar: () => void
  onGuardar: (m: Omit<Movimiento, 'id'>) => void
}) {
  const personas = [GUARANTOR, ...DEPENDIENTES]
  const visitas = cargosVisita.map((m) => \`\${m.fecha}, \${m.paciente}, \${m.codigo !== '—' ? m.codigo : m.descripcion}, $\${m.monto.toFixed(2)}\`)

  const [fecha, setFecha] = useState<Date | null>(null)
  const [monto, setMonto] = useState('')
  const [tipo, setTipo] = useState(TIPOS_AJUSTE[0])
  const [provider, setProvider] = useState(PROVIDERS[0])
  const [aplicaA, setAplicaA] = useState(personas[0])
  const [visita, setVisita] = useState('')
  const [notas, setNotas] = useState('')
  const [intentado, setIntentado] = useState(false)

  const guardar = () => {
    setIntentado(true)
    if (!fecha || !monto.trim() || !aplicaA.trim()) return
    const valor = Number(monto) || 0
    onGuardar({
      fecha: fecha.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      paciente: aplicaA,
      codigo: '—',
      descripcion: tipo,
      provider,
      tipo: tipo === 'Charge Adjustment' ? 'Charge' : 'Adjustment',
      monto: tipo === 'Charge Adjustment' ? valor : -valor,
      estado: 'Posted',
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-line bg-white p-4 sm:p-5">
        <h2 className="flex items-center gap-2 text-sm font-bold text-ink">
          <CreditCard className="size-4" /> Adjustment Information
        </h2>

        <div className="mt-4 flex flex-wrap gap-4">
          <div className="flex w-full flex-col gap-2 sm:w-[200px]">
            <FieldLabel required>Transaction date</FieldLabel>
            <DatePicker value={fecha} onChange={setFecha} className="h-9 w-full" error={intentado && !fecha ? true : undefined} />
          </div>
          <TextField
            label="Amount" required placeholder="$ 0.00" value={monto} onChange={setMonto}
            error={intentado && !monto.trim() ? 'This field is required.' : undefined}
            className="w-full sm:w-[160px]"
          />
          <SelectField label="Type" required options={TIPOS_AJUSTE} value={tipo} onChange={setTipo} className="w-full sm:w-[200px]" />
          <SelectField label="Provider" options={PROVIDERS} value={provider} onChange={setProvider} className="w-full sm:w-[200px]" />
          <SelectField
            label="Apply to" required options={personas} value={aplicaA} onChange={setAplicaA}
            error={intentado && !aplicaA.trim() ? 'This field is required.' : undefined}
            className="w-full sm:w-[200px]"
          />
          <SelectField label="Visit date" options={visitas} value={visita} onChange={setVisita} className="w-full sm:w-[320px]" />
        </div>
        <TextArea className="mt-4" label="Notes" placeholder="Placeholder" value={notas} onChange={setNotas} />
      </div>

      <div className="flex justify-end gap-3">
        <FormFooter onCancel={onCancelar} onSave={guardar} />
      </div>
    </div>
  )
}
`})))()}var jt;function Mt(){return(Mt=e((()=>{jt=`import { Columns3 } from 'lucide-react'
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

/* Elegir qué columnas se ven. Lo tenía sólo la tabla de asignación; la de
   Transactions quedó sin control hasta que Julián pidió emparejarlas con
   Confidentally 2.0, donde las dos lo traen. Ver
   design-reference/figma/modulos/ledger.md. */
export function ColumnPicker<T extends string>({
  columnas, ocultas, onToggle, onReset,
}: {
  columnas: { id: T; label: string; bloqueada?: boolean }[]
  ocultas: T[]
  onToggle: (id: T) => void
  onReset: () => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 text-[12px] font-medium text-ink-muted hover:bg-surface-muted">
        <Columns3 className="size-3.5" /> Columns
        {ocultas.length > 0 && (
          <span className="text-dash-blue rounded-full bg-[#eef5ff] px-1.5 text-[10px] font-bold">
            {columnas.length - ocultas.length}/{columnas.length}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel className="text-[11px] tracking-wide text-ink-muted uppercase">
          Show columns
        </DropdownMenuLabel>
        {columnas.map((c) => (
          <DropdownMenuCheckboxItem
            key={c.id}
            checked={!ocultas.includes(c.id)}
            disabled={c.bloqueada}
            onCheckedChange={() => onToggle(c.id)}
            onSelect={(e) => e.preventDefault()}
          >
            {c.label}
          </DropdownMenuCheckboxItem>
        ))}
        {ocultas.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <button
              type="button"
              onClick={onReset}
              className="text-dash-blue w-full rounded-md px-1.5 py-1 text-left text-sm font-semibold hover:bg-surface-muted"
            >
              Show all columns
            </button>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

`})))()}var Nt;function Pt(){return(Pt=e((()=>{Nt=`import { useMemo, useState } from 'react'
import { CreditCard } from 'lucide-react'
import {
  TextField, SelectField, TextArea, FieldLabel, FormFooter,
} from '@/components/patients/form'
import { DatePicker } from '@/components/ui/date-picker'
import { LedgerAllocationTable } from '@/components/patients/ledger/LedgerAllocationTable'
import { GUARANTOR, DEPENDIENTES, type Movimiento } from '@/data/ledger'

/* Figma 4582:30209. "Amount" es texto libre por elección, ver
   design-reference/figma/modulos/ledger.md. */

const TIPOS_AJUSTE = ['Credit Adjustment', 'Charge Adjustment']

export function CreditAdjustmentPanel({
  cargos, onCancelar, onGuardar,
}: {
  /** Todos los cargos de la cuenta, para armar la tabla de aplicación. */
  cargos: Movimiento[]
  onCancelar: () => void
  onGuardar: (m: Omit<Movimiento, 'id'>) => void
}) {
  const personas = [GUARANTOR, ...DEPENDIENTES]
  const [fecha, setFecha] = useState<Date | null>(null)
  const [monto, setMonto] = useState('')
  const [tipo, setTipo] = useState(TIPOS_AJUSTE[0])
  const [aplicaA, setAplicaA] = useState(personas[0])
  const [notas, setNotas] = useState('')
  const [intentado, setIntentado] = useState(false)

  const cargosAplicables = useMemo(
    () => cargos.filter((m) => m.tipo === 'Charge' && m.paciente === aplicaA),
    [cargos, aplicaA],
  )

  const guardar = () => {
    setIntentado(true)
    if (!fecha || !monto.trim() || !aplicaA.trim()) return
    const valor = Number(monto) || 0
    onGuardar({
      fecha: fecha.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      paciente: aplicaA,
      codigo: '—',
      descripcion: tipo,
      provider: 'Front desk',
      tipo: tipo === 'Charge Adjustment' ? 'Charge' : 'Adjustment',
      monto: tipo === 'Charge Adjustment' ? valor : -valor,
      estado: 'Posted',
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-line bg-white p-4 sm:p-5">
        <h2 className="flex items-center gap-2 text-sm font-bold text-ink">
          <CreditCard className="size-4" /> Credit Information
        </h2>

        <div className="mt-4 flex flex-wrap gap-4">
          <div className="flex w-full flex-col gap-2 sm:w-[200px]">
            <FieldLabel required>Transaction date</FieldLabel>
            <DatePicker value={fecha} onChange={setFecha} className="h-9 w-full" error={intentado && !fecha ? true : undefined} />
          </div>
          <TextField
            label="Amount" required placeholder="$ 0.00" value={monto} onChange={setMonto}
            error={intentado && !monto.trim() ? 'This field is required.' : undefined}
            className="w-full sm:w-[160px]"
          />
          <SelectField label="Type" required options={TIPOS_AJUSTE} value={tipo} onChange={setTipo} className="w-full sm:w-[200px]" />
          <SelectField
            label="Apply to" required options={personas} value={aplicaA} onChange={setAplicaA}
            error={intentado && !aplicaA.trim() ? 'This field is required.' : undefined}
            className="w-full sm:w-[200px]"
          />
        </div>
      </div>

      <LedgerAllocationTable cargos={cargosAplicables} />

      <div className="rounded-lg border border-line bg-white p-4 sm:p-5">
        <TextArea label="Notes" placeholder="Placeholder" value={notas} onChange={setNotas} />
      </div>

      <div className="flex justify-end gap-3">
        <FormFooter onCancel={onCancelar} onSave={guardar} />
      </div>
    </div>
  )
}
`})))()}var Ft;function It(){return(It=e((()=>{Ft=`import { useState } from 'react'
import { CreditCard, MoveHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ColumnPicker } from './ColumnPicker'
import { moneda, fechaCorta, type Movimiento } from '@/data/ledger'
import { Pagination } from '@/components/patients/ledger/Pagination'
import { useAnchoColumnas, useAnchoVisible, ManijaResize } from '@/components/patients/ledger/useAnchoColumnas'
import { LedgerRowDetail, LedgerRowModal, BotonExpandirTodo, FilaConTooltip } from '@/components/patients/ledger/LedgerRowDetail'
import { TooltipProvider } from '@/components/ui/tooltip'

/* Figma 4582:29618 / 4582:30251. Ver design-reference/figma/modulos/ledger.md. */
function coberturaSeguro(codigo: string) {
  const categoria = codigo.charAt(1)
  return categoria === '0' || categoria === '1' ? 1 : 0.5
}

type ColId =
  | 'fecha' | 'paciente' | 'provider' | 'diente' | 'superficie' | 'codigo'
  | 'desc' | 'charge' | 'otroCredito' | 'guarEstimado' | 'applied' | 'balance'


type Columna = {
  id: ColId; label: string; px: number
  /** Crece con la tabla mientras no se la arrastre a mano. */
  elastica?: boolean
  derecha?: boolean
  claseCelda?: string; bloqueada?: boolean
  titulo?: (m: Movimiento) => string
  celda: (m: Movimiento, ap: number) => React.ReactNode
}

const TAM_PAGINA = 5
/* gap-1.5 entre columnas y px-3 a los costados, como el diseño de
   referencia: con esos números las 12 columnas entran sin scroll. */
const GAP = 6
const PADDING_FILA = 24

const ANCHO_BASE: Record<ColId, number> = {
  fecha: 76, paciente: 76, provider: 72, diente: 40, superficie: 48, codigo: 52,
  desc: 88, charge: 64, otroCredito: 68, guarEstimado: 76, applied: 72, balance: 64,
}

/* Piso de cada columna, para que las 12 entren aun con el menú lateral y el
   panel del paciente abiertos. Medidos contra el contenido real a 12px:
   "03/17/2025" 66, "MODBL" 44, "$9,850.00" 60. */
const ANCHO_MINIMO: Record<ColId, number> = {
  fecha: 66, paciente: 56, provider: 52, diente: 32, superficie: 45, codigo: 40,
  desc: 72, charge: 61, otroCredito: 61, guarEstimado: 61, applied: 58, balance: 61,
}

/** Techo de Description: pasado eso, el lugar que sobra va a las demás. */
const MAX_ELASTICA = 240

export function LedgerAllocationTable({ cargos }: { cargos: Movimiento[] }) {
  const [aplicado, setAplicado] = useState<Record<string, string>>({})
  /* Arrancan todas visibles: con los anchos del diseño de referencia las 12
     entran en la card sin pedir scroll. "Columns" queda para achicar, no
     para arreglar un default que no entraba. */
  const [ocultas, setOcultas] = useState<ColId[]>([])
  const alternarCol = (id: ColId) => setOcultas((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  const [pagina, setPagina] = useState(1)
  const [expandidas, setExpandidas] = useState<string[]>([])
  const [enModal, setEnModal] = useState<Movimiento | null>(null)
  const anchos = useAnchoColumnas<ColId>(ANCHO_BASE)
  const refVisible = useAnchoVisible<HTMLDivElement>()

  const alternarFila = (id: string) =>
    setExpandidas((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))

  const paginas = Math.max(1, Math.ceil(cargos.length / TAM_PAGINA))
  const paginaActual = Math.min(pagina, paginas)
  const cargosPagina = cargos.slice((paginaActual - 1) * TAM_PAGINA, paginaActual * TAM_PAGINA)

  /* "todas" es sobre lo que se ve en pantalla, no sobre la cuenta entera:
     abrir 26 filas de golpe en una tabla paginada no le sirve a nadie. */
  const todasAbiertas = cargosPagina.length > 0 && cargosPagina.every((m) => expandidas.includes(m.id))
  const hayAlgunaAbierta = cargosPagina.some((m) => expandidas.includes(m.id))
  const expandirTodo = () =>
    setExpandidas((p) => [...new Set([...p, ...cargosPagina.map((m) => m.id)])])
  const colapsarTodo = () =>
    setExpandidas((p) => p.filter((id) => !cargosPagina.some((m) => m.id === id)))

  const totalCargos = cargos.reduce((a, m) => a + m.monto, 0)
  const totalAplicado = cargos.reduce((a, m) => a + (Number(aplicado[m.id]) || 0), 0)

  const columnas: Columna[] = [
    { id: 'fecha', label: 'Date', px: 76, bloqueada: true, claseCelda: 'text-ink-soft', celda: (m) => fechaCorta(m.fecha) },
    { id: 'paciente', label: 'Patient', px: 76, claseCelda: 'truncate text-ink', titulo: (m) => m.paciente, celda: (m) => m.paciente },
    { id: 'provider', label: 'Provider', px: 72, claseCelda: 'truncate', titulo: (m) => m.provider, celda: (m) => m.provider },
    { id: 'diente', label: 'Tooth', px: 40, celda: (m) => m.diente ?? '—' },
    { id: 'superficie', label: 'Surface', px: 48, celda: (m) => m.superficie ?? '—' },
    { id: 'codigo', label: 'Code', px: 52, claseCelda: 'text-dash-blue font-medium', celda: (m) => m.codigo },
    { id: 'desc', label: 'Description', px: 88, elastica: true, claseCelda: 'truncate text-ink', titulo: (m) => m.descripcion, celda: (m) => m.descripcion },
    { id: 'charge', label: 'Charge', px: 64, derecha: true, claseCelda: 'font-medium tabular-nums text-ink', celda: (m) => moneda(m.monto) },
    { id: 'otroCredito', label: 'Other Credit', px: 68, derecha: true, claseCelda: 'tabular-nums', celda: (m) => moneda(m.monto * coberturaSeguro(m.codigo)) },
    { id: 'guarEstimado', label: 'Guar Estimate', px: 76, derecha: true, claseCelda: 'tabular-nums', celda: (m) => moneda(m.monto * (1 - coberturaSeguro(m.codigo))) },
    {
      id: 'applied', label: 'Applied', px: 72, bloqueada: true,
      celda: (m) => (
        <input
          value={aplicado[m.id] ?? ''}
          onChange={(e) => {
            const limpio = e.target.value.replace(/[^0-9.]/g, '')
            const numero = Number(limpio)
            const final = Number.isFinite(numero) && numero > m.monto ? String(m.monto) : limpio
            setAplicado((p) => ({ ...p, [m.id]: final }))
          }}
          inputMode="decimal"
          placeholder="0.00"
          aria-label={\`Applied to \${m.descripcion}\`}
          className="focus:border-dash-blue h-7 w-full rounded-md border border-line bg-white px-2 text-right text-[12px] tabular-nums placeholder:text-ink-faint focus:outline-none"
        />
      ),
    },
    { id: 'balance', label: 'Balance', px: 64, derecha: true, claseCelda: 'font-semibold tabular-nums text-ink', bloqueada: true, celda: (m, ap) => moneda(Math.max(m.monto - ap, 0)) },
  ]
  const columnasVisibles = columnas.filter((c) => !ocultas.includes(c.id))
  const anchoMinimo = columnasVisibles.reduce(
    (a, c) => a + (anchos.manual(c.id) ?? ANCHO_MINIMO[c.id]), 0,
  ) + (columnasVisibles.length - 1) * GAP + PADDING_FILA

  /* Una columna movida a mano se queda donde la dejaron: no encoge ni
     crece. El resto cede hasta su piso para que las 12 entren enteras.
     Al sobrar lugar -sobre todo cuando se ocultan columnas- Description se
     lo queda primero (peso alto) hasta su techo, y recién ahí el excedente
     se reparte entre las demás: sin el techo, esconder cuatro columnas la
     estiraba a 350px y dejaba al resto igual de apretado. */
  const estilo = (c: Columna) => {
    const fijada = anchos.manual(c.id) !== undefined
    if (fijada) {
      return { width: anchos.ancho(c.id), minWidth: anchos.ancho(c.id), flexGrow: 0, flexShrink: 0 }
    }
    return {
      width: anchos.ancho(c.id),
      minWidth: ANCHO_MINIMO[c.id],
      maxWidth: c.elastica ? MAX_ELASTICA : undefined,
      flexGrow: c.elastica ? 1000 : 1,
      flexShrink: 1,
    }
  }

  return (
    <div className="rounded-lg border border-line bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-sm font-bold text-ink">
          <CreditCard className="size-4" /> Ledger Transactions
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          {cargos.length > 0 && (
            <BotonExpandirTodo todasAbiertas={todasAbiertas} hayAlgunaAbierta={hayAlgunaAbierta}
                  onExpandirTodo={expandirTodo} onColapsarTodo={colapsarTodo} />
          )}
          <ColumnPicker columnas={columnas} ocultas={ocultas} onToggle={alternarCol} onReset={() => setOcultas([])} />
        </div>
      </div>

      {cargos.length === 0 ? (
        <p className="mt-3 text-[13px] text-ink-muted">No open charges to apply this against.</p>
      ) : (
        <>
          {/* \`skipDelayDuration={0}\`: sin esto Radix deja una ventana de gracia
                  y al barrer la tabla el tooltip de la fila siguiente abre al
                  instante -y alcanza a mostrar el contenido de la anterior-, que
                  es el parpadeo que hacía imposible leerlo. */}
              <TooltipProvider delayDuration={500} skipDelayDuration={0}>
          <div ref={refVisible} data-tabla-scroll className="mt-3 w-full overflow-x-auto rounded-md border border-line-row">
            <div style={{ minWidth: anchoMinimo }}>
              <div data-tabla-header className="group/fila flex items-center gap-1.5 bg-surface-alt px-3 py-2.5 text-[11px] font-semibold text-ink-muted">
                {columnasVisibles.map((c, i) => (
                  <span
                    key={c.id}
                    data-elastica={c.elastica || undefined}
                    style={estilo(c)}
                    className={cn('relative flex items-center', c.derecha && 'justify-end')}
                  >
                    <span className="truncate">{c.label}</span>
                    <ManijaResize id={c.id} label={c.label} estado={anchos} indice={i} />
                  </span>
                ))}
              </div>
              {cargosPagina.map((m) => {
                const ap = Number(aplicado[m.id]) || 0
                const abierta = expandidas.includes(m.id)
                return (
                  <div key={m.id} className="border-t border-line-row">
                    {/* La fila entera abre el detalle, salvo cuando el click
                        cae en el input de "Applied" o en una manija. */}
                    <FilaConTooltip m={m} abierta={abierta}>
                    <div
                      role="button"
                      tabIndex={0}
                      aria-expanded={abierta}
                      aria-label={\`Toggle details for \${m.descripcion}\`}
                      onClick={(e) => {
                        if ((e.target as HTMLElement).closest('input, [role="separator"]')) return
                        alternarFila(m.id)
                      }}
                      onKeyDown={(e) => {
                        if (e.target !== e.currentTarget) return
                        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); alternarFila(m.id) }
                      }}
                      className={cn(
                        'group/fila flex cursor-pointer items-center gap-1.5 px-3 py-2.5 text-[12px] text-ink-soft hover:bg-surface-subtle',
                        abierta && 'bg-surface-subtle',
                      )}
                    >
                      {columnasVisibles.map((c) => (
                        <span
                          key={c.id}
                          style={estilo(c)}
                          className={cn('relative', c.derecha && 'text-right', c.claseCelda)}
                        >
                          {c.celda(m, ap)}
                        </span>
                      ))}
                    </div>
                    </FilaConTooltip>
                    {abierta && <LedgerRowDetail m={m} onVerTodo={() => setEnModal(m)} />}
                  </div>
                )
              })}

              {/* El resumen cierra la tabla: adentro del mismo borde y
                  arriba del paginado, no suelto afuera de la card. */}
              <div className="flex justify-end border-t border-line-row px-3 py-3">
                <dl className="w-fit overflow-hidden rounded-md border border-line text-[13px]">
                  <div className="flex items-center">
                    <dt className="w-36 bg-surface-alt px-3 py-2 text-right font-medium text-ink-soft">Amount not applied</dt>
                    <dd className="w-24 px-3 py-2 text-right font-semibold tabular-nums text-ink">{moneda(Math.max(totalCargos - totalAplicado, 0))}</dd>
                  </div>
                  <div className="flex items-center border-t border-line">
                    <dt className="w-36 bg-surface-alt px-3 py-2 text-right font-medium text-ink-soft">Amount applied</dt>
                    <dd className="text-dash-blue w-24 px-3 py-2 text-right font-semibold tabular-nums">{moneda(totalAplicado)}</dd>
                  </div>
                </dl>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-row px-3 py-3">
                <span className="flex items-center gap-3 text-xs font-semibold text-ink-muted">
                  Showing {cargosPagina.length} of {cargos.length} transactions
                  {anchos.avisando && (
                    <span className="motion-safe:animate-[col-hint_2.4s_ease-in-out_both] hidden items-center gap-1.5 font-medium text-ink-faint lg:flex">
                      <MoveHorizontal className="size-3.5" /> Drag column edges to resize · double-click to reset
                    </span>
                  )}
                  {anchos.hayCambios && (
                    <button type="button" onClick={anchos.resetear} className="text-dash-blue hidden hover:underline lg:inline">
                      Reset column widths
                    </button>
                  )}
                </span>
                <Pagination pagina={paginaActual} paginas={paginas} onChange={setPagina} />
              </div>
            </div>
          </div>
          </TooltipProvider>
        </>
      )}

      {enModal && <LedgerRowModal m={enModal} onClose={() => setEnModal(null)} />}
    </div>
  )
}
`})))()}var Lt;function Rt(){return(Rt=e((()=>{Lt=`import { Maximize2, ChevronsDownUp, ChevronsUpDown, HandCoins } from 'lucide-react'
import { ModalShell } from '@/components/patients/form'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { moneda, tieneCredito, type Movimiento } from '@/data/ledger'

/* Resumen de la fila al pasar el mouse, para leerla completa sin abrirla.
   Reemplaza a los \`title\` que tenían las celdas que truncan: con los dos
   puestos aparecían dos tooltips distintos sobre la misma celda. */
export function FilaConTooltip({
  m, abierta, children,
}: {
  m: Movimiento & { saldo?: number }
  /** Con la fila desplegada el detalle ya está a la vista: sobra el tooltip. */
  abierta?: boolean
  children: React.ReactNode
}) {
  const pieza = [m.diente && \`Tooth \${m.diente}\`, m.superficie].filter(Boolean).join(' · ')
  if (abierta) return <>{children}</>
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      {/* Al costado, no arriba ni abajo: la fila ocupa todo el ancho de la
          tabla, así que un tooltip vertical le tapa sí o sí los datos de la
          fila vecina. \`side="right"\` no tiene lugar y Radix lo voltea al
          margen izquierdo, fuera de la tabla. */}
      <TooltipContent side="right" align="center" sideOffset={8} collisionPadding={12} className="max-w-sm bg-ink text-white">
        <span className="flex flex-col gap-0.5">
          <span className="font-semibold">{m.descripcion}</span>
          <span className="text-white/70">
            {m.paciente} · {m.provider}
            {m.codigo !== '—' && \` · \${m.codigo}\`}
            {pieza && \` · \${pieza}\`}
          </span>
          <span className="tabular-nums text-white/70">
            {moneda(m.monto)} · {m.estado}
            {m.saldo !== undefined && \` · balance \${moneda(m.saldo)}\`}
          </span>
        </span>
      </TooltipContent>
    </Tooltip>
  )
}

/* Abrir/cerrar de una todas las filas que hay en pantalla. Va al lado del
   título de cada tabla del Ledger, y sólo desde que hay algo abierto: con
   todo cerrado no hay nada que colapsar y el botón era ruido. */
export function BotonExpandirTodo({
  todasAbiertas, hayAlgunaAbierta, onExpandirTodo, onColapsarTodo,
}: {
  todasAbiertas: boolean
  hayAlgunaAbierta: boolean
  onExpandirTodo: () => void
  onColapsarTodo: () => void
}) {
  if (!hayAlgunaAbierta) return null
  const clase = 'flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 text-[12px] font-medium text-ink-muted hover:bg-surface-muted'
  return (
    <span className="flex items-center gap-2">
      {/* Colapsar está desde la primera fila abierta: obligar a expandir
          todo para poder cerrar una sola no tiene sentido. "Expand all"
          acompaña mientras queden filas por abrir. */}
      <button type="button" onClick={onColapsarTodo} className={clase}>
        <ChevronsDownUp className="size-3.5" /> Collapse all
      </button>
      {!todasAbiertas && (
        <button type="button" onClick={onExpandirTodo} className={clase}>
          <ChevronsUpDown className="size-3.5" /> Expand all
        </button>
      )}
    </span>
  )
}

/* Con las filas cargadas de datos, la celda truncada no alcanza: la fila se
   despliega y muestra todo. Ver design-reference/figma/modulos/ledger.md. */

function campos(m: Movimiento & { saldo?: number }) {
  return [
    { label: 'Transaction date', valor: m.fecha },
    { label: 'Patient', valor: m.paciente },
    { label: 'Type', valor: m.tipo },
    { label: 'Code', valor: m.codigo },
    { label: 'Provider', valor: m.provider },
    { label: 'Status', valor: m.estado },
    { label: 'Tooth', valor: m.diente ?? '—' },
    { label: 'Surface', valor: m.superficie ?? '—' },
    { label: 'Amount', valor: moneda(m.monto) },
    ...(m.saldo !== undefined ? [{ label: 'Balance', valor: moneda(m.saldo) }] : []),
    ...(tieneCredito(m) ? [{ label: 'Credit available', valor: moneda(m.creditoDisponible ?? 0) }] : []),
  ]
}

function Campos({ m }: { m: Movimiento & { saldo?: number } }) {
  return (
    <>
      <div>
        <dt className="text-[11px] font-medium text-ink-muted">Description</dt>
        <dd className="mt-0.5 text-[13px] text-ink">{m.descripcion}</dd>
      </div>
      <dl className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-3">
        {campos(m).map(({ label, valor }) => (
          <div key={label}>
            <dt className="text-[11px] font-medium text-ink-muted">{label}</dt>
            <dd className="mt-0.5 text-[13px] break-words text-ink">{valor}</dd>
          </div>
        ))}
      </dl>
    </>
  )
}

export function LedgerRowDetail({
  m, onVerTodo, onAplicarCredito,
}: {
  m: Movimiento & { saldo?: number }
  onVerTodo: () => void
  /** Sólo viene si la fila tiene crédito sin aplicar -ver \`tieneCredito\` en
      Ledger.tsx-, así que alcanza con chequear que exista. */
  onAplicarCredito?: () => void
}) {
  return (
    <div className="border-t border-line-row bg-surface-subtle px-3 py-3">
      {/* La fila vive dentro del ancho mínimo de la tabla, que en pantallas
          chicas es más ancho que la vista. Sin esto el detalle nacía de 864px
          y había que scrollear para leerlo -lo contrario de para qué está-.
          \`sticky left-0\` lo deja fijo en la parte visible mientras la tabla
          se mueve, y el ancho sale de \`--tabla-visible\` (lo publica el
          contenedor); cuando la tabla entra entera, ese valor ya es el 100%. */}
      <div className="sticky left-0 w-[var(--tabla-visible,100%)]">
        <Campos m={m} />
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onVerTodo}
            className="text-dash-blue inline-flex items-center gap-1.5 text-[12px] font-semibold hover:underline"
          >
            <Maximize2 className="size-3.5" /> View full record
          </button>
          {onAplicarCredito && (
            <button
              type="button"
              onClick={onAplicarCredito}
              className="text-dash-blue inline-flex items-center gap-1.5 rounded-md border border-[#c7d9fb] bg-info-bg px-2.5 py-1 text-[12px] font-medium hover:bg-[#e3edff]"
            >
              <HandCoins className="size-3.5" /> Apply credit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export function LedgerRowModal({
  m, onClose,
}: {
  m: Movimiento & { saldo?: number }
  onClose: () => void
}) {
  return (
    <ModalShell
      title={m.descripcion}
      onClose={onClose}
      width="max-w-[620px]"
      /* Sólo lectura: un Close, no el par Cancel/Save que implicaría que
         hay algo para guardar. */
      footer={(
        <button
          type="button"
          onClick={onClose}
          className="h-9 shrink-0 rounded-md border border-line bg-white px-6 text-[13px] font-medium hover:bg-surface-subtle"
        >
          Close
        </button>
      )}
    >
      <Campos m={m} />
    </ModalShell>
  )
}
`})))()}var zt;function Bt(){return(Bt=e((()=>{zt=`import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Pagination({
  pagina, paginas, onChange,
}: {
  pagina: number
  paginas: number
  onChange: (p: number) => void
}) {
  if (paginas < 2) return null
  const mover = (delta: number) => onChange(Math.min(paginas, Math.max(1, pagina + delta)))

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        aria-label="Previous page"
        disabled={pagina === 1}
        onClick={() => mover(-1)}
        className="flex size-7 items-center justify-center rounded-md text-ink-faint transition-colors hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft className="size-4" />
      </button>
      {Array.from({ length: paginas }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          aria-current={p === pagina ? 'page' : undefined}
          onClick={() => onChange(p)}
          className={
            'flex size-7 items-center justify-center rounded-md text-xs font-semibold transition-colors '
            + (p === pagina ? 'bg-dash-blue text-white' : 'text-ink-muted hover:bg-surface-muted')
          }
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        aria-label="Next page"
        disabled={pagina === paginas}
        onClick={() => mover(1)}
        className="flex size-7 items-center justify-center rounded-md text-ink-faint transition-colors hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  )
}
`})))()}var Vt;function Ht(){return(Ht=e((()=>{Vt=`import { useMemo, useState } from 'react'
import { CreditCard, Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  TextField, SelectField, TextArea, FieldLabel, FormFooter,
} from '@/components/patients/form'
import { DatePicker } from '@/components/ui/date-picker'
import { LedgerAllocationTable } from '@/components/patients/ledger/LedgerAllocationTable'
import { GUARANTOR, DEPENDIENTES, type Movimiento } from '@/data/ledger'

/* Figma 4582:29545 / 4582:29862. Ver design-reference/figma/modulos/ledger.md. */

const METODOS = ['Check payment', 'Card payment', 'Cash payment', 'Electronic payment']

type Metodo = { id: number; monto: string; metodo: string; cheque: string; banco: string }
const filaVacia = (id: number): Metodo => ({ id, monto: '', metodo: METODOS[0], cheque: '', banco: '' })

export function PatientPaymentPanel({
  cargos, onCancelar, onGuardar,
}: {
  cargos: Movimiento[]
  onCancelar: () => void
  onGuardar: (m: Omit<Movimiento, 'id'>) => void
}) {
  const personas = [GUARANTOR, ...DEPENDIENTES]
  const [fecha, setFecha] = useState<Date | null>(null)
  const [aplicaA, setAplicaA] = useState(personas[0])
  const [metodos, setMetodos] = useState<Metodo[]>([filaVacia(0)])
  const [notas, setNotas] = useState('')
  const [intentado, setIntentado] = useState(false)

  const cargosAplicables = useMemo(
    () => cargos.filter((m) => m.tipo === 'Charge' && m.paciente === aplicaA),
    [cargos, aplicaA],
  )

  const setFila = (id: number, cambios: Partial<Metodo>) =>
    setMetodos((p) => p.map((f) => (f.id === id ? { ...f, ...cambios } : f)))

  const guardar = () => {
    setIntentado(true)
    const faltaAlgo = !fecha || !aplicaA.trim()
      || metodos.some((f) => !f.monto.trim() || (f.metodo === 'Check payment' && (!f.cheque.trim() || !f.banco.trim())))
    if (faltaAlgo) return

    const fechaTxt = fecha.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    metodos.forEach((f) => {
      const valor = Number(f.monto) || 0
      onGuardar({
        fecha: fechaTxt,
        paciente: aplicaA,
        codigo: '—',
        descripcion: f.metodo === 'Check payment' ? \`Check Payment #\${f.cheque}\` : f.metodo.replace('payment', 'Payment'),
        provider: 'Front desk',
        tipo: 'Payment',
        monto: -valor,
        estado: 'Posted',
      })
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-line bg-white p-4 sm:p-5">
        <h2 className="flex items-center gap-2 text-sm font-bold text-ink">
          <CreditCard className="size-4" /> Payment Information
        </h2>

        <div className="mt-4 flex flex-wrap gap-4">
          <div className="flex w-full flex-col gap-2 sm:w-[200px]">
            <FieldLabel required>Transaction date</FieldLabel>
            <DatePicker value={fecha} onChange={setFecha} className="h-9 w-full" error={intentado && !fecha ? true : undefined} />
          </div>
          <SelectField
            label="Apply to" required options={personas} value={aplicaA} onChange={setAplicaA}
            error={intentado && !aplicaA.trim() ? 'This field is required.' : undefined}
            className="w-full sm:w-[200px]"
          />
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {metodos.map((f, i) => (
            <div key={f.id} className="flex items-start gap-2">
              <div className={cn(f.metodo === 'Check payment' ? 'sm:grid-cols-4' : 'sm:grid-cols-2', 'grid flex-1 grid-cols-1 gap-4')}>
                <TextField
                  label="Amount" required placeholder="$ 0.00" value={f.monto} onChange={(v) => setFila(f.id, { monto: v })}
                  error={intentado && !f.monto.trim() ? 'Required.' : undefined}
                />
                <SelectField label="Payment method" required options={METODOS} value={f.metodo} onChange={(v) => setFila(f.id, { metodo: v })} />
                {f.metodo === 'Check payment' && (
                  <>
                    <TextField
                      label="Check" required placeholder="1234" value={f.cheque} onChange={(v) => setFila(f.id, { cheque: v })}
                      error={intentado && !f.cheque.trim() ? 'Required.' : undefined}
                    />
                    <TextField
                      label="Bank/Branch" required placeholder="AE9323AMB" value={f.banco} onChange={(v) => setFila(f.id, { banco: v })}
                      error={intentado && !f.banco.trim() ? 'Required.' : undefined}
                    />
                  </>
                )}
              </div>
              {i === metodos.length - 1 ? (
                <button
                  type="button"
                  aria-label="Add another payment method"
                  onClick={() => setMetodos((p) => [...p, filaVacia(Math.max(0, ...p.map((x) => x.id)) + 1)])}
                  className="mt-7 flex size-9 shrink-0 items-center justify-center rounded-md border border-line text-ink-muted hover:bg-surface-muted"
                >
                  <Plus className="size-4" />
                </button>
              ) : (
                <button
                  type="button"
                  aria-label="Remove this payment method"
                  onClick={() => setMetodos((p) => p.filter((x) => x.id !== f.id))}
                  className="mt-7 flex size-9 shrink-0 items-center justify-center rounded-md border border-line text-ink-muted hover:bg-dash-bad-bg hover:text-dash-bad-fg"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          ))}
        </div>

      </div>

      <LedgerAllocationTable cargos={cargosAplicables} />

      <div className="rounded-lg border border-line bg-white p-4 sm:p-5">
        <TextArea label="Notes" placeholder="Placeholder" value={notas} onChange={setNotas} />
      </div>

      <div className="flex justify-end gap-3">
        <FormFooter onCancel={onCancelar} onSave={guardar} />
      </div>
    </div>
  )
}
`})))()}var Ut;function Wt(){return(Wt=e((()=>{Ut=`import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const MINIMO = 40
/* El aviso de "esto se puede ajustar" corre una sola vez por sesión: la
   primera tabla que se monta lo muestra, el resto ya no. */
let avisoMostrado = false

/* Ancho por columna arrastrable a mano. Las dos tablas del Ledger lo usan:
   arrancan con el ancho del diseño y el usuario puede ensanchar la columna
   que necesite leer entera. Ver design-reference/figma/modulos/ledger.md. */
export function useAnchoColumnas<T extends string>(base: Record<T, number>) {
  const [anchos, setAnchos] = useState<Partial<Record<T, number>>>({})
  const [arrastrando, setArrastrando] = useState<T | null>(null)
  /* Abajo de \`lg\` no hay manijas, así que el aviso no se gasta ahí: si no,
     entrar una vez desde el celular dejaba sin aviso al escritorio. */
  const [avisando, setAvisando] = useState(
    () => !avisoMostrado && window.matchMedia('(min-width: 1024px)').matches,
  )
  const ref = useRef<{ id: T; x0: number; w0: number; max: number } | null>(null)

  useEffect(() => {
    if (!avisando) return
    avisoMostrado = true
    const t = setTimeout(() => setAvisando(false), 2600)
    return () => clearTimeout(t)
    // Sólo al montar: es un aviso de una vez, no reacciona a cambios.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* Techo del arrastre: ensanchar una columna no puede empujar a las
     últimas fuera de la tabla -si Balance se esconde, encontrarlo cuesta
     más que lo que se ganó-. Se mide sobre el DOM en el momento de agarrar,
     así las columnas ocultas no entran en la cuenta. La holgura sale del
     espacio libre del contenedor más lo que la columna elástica pueda ceder. */
  const techo = (celda: HTMLElement, w0: number) => {
    const header = celda.closest('[data-tabla-header]') as HTMLElement | null
    const scroll = header?.closest('[data-tabla-scroll]') as HTMLElement | null
    if (!header || !scroll) return Infinity
    const libre = scroll.clientWidth - header.getBoundingClientRect().width
    const elastica = header.querySelector('[data-elastica]') as HTMLElement | null
    if (!elastica || elastica === celda) return w0 + libre
    const cede = Math.max(0, elastica.getBoundingClientRect().width - (parseFloat(getComputedStyle(elastica).minWidth) || 0))
    return w0 + libre + cede
  }

  /* La columna elástica (Description) no tiene ancho fijo hasta que se la
     toca: hasta entonces crece con la tabla. Por eso el ancho inicial del
     arrastre se lee del DOM y no de \`base\`. */
  const empezar = (id: T, e: React.PointerEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const celda = e.currentTarget.parentElement
    const w0 = celda ? celda.getBoundingClientRect().width : base[id]
    ref.current = { id, x0: e.clientX, w0, max: celda ? techo(celda, w0) : Infinity }
    setArrastrando(id)
    setAvisando(false)
    /* Mientras se arrastra, el cursor y la selección son del documento
       entero: si no, el cursor parpadea al salirse de la manija y el
       arrastre selecciona texto de la tabla. */
    document.body.classList.add('cursor-col-resize', 'select-none')

    const mover = (ev: PointerEvent) => {
      const a = ref.current
      if (!a) return
      const bruto = a.w0 + ev.clientX - a.x0
      setAnchos((p) => ({ ...p, [a.id]: Math.round(Math.min(a.max, Math.max(MINIMO, bruto))) }))
    }
    const soltar = () => {
      ref.current = null
      setArrastrando(null)
      document.body.classList.remove('cursor-col-resize', 'select-none')
      window.removeEventListener('pointermove', mover)
      window.removeEventListener('pointerup', soltar)
    }
    window.addEventListener('pointermove', mover)
    window.addEventListener('pointerup', soltar)
  }

  /* Con teclado: flechas mueven de a 16px, para no dejar la función sólo
     al alcance del mouse. */
  const porTeclado = (id: T, e: React.KeyboardEvent<HTMLElement>) => {
    const celda = e.currentTarget.parentElement
    if (e.key === 'Enter' || e.key === 'Backspace') {
      e.preventDefault()
      soltarUna(id)
      return
    }
    const paso = e.key === 'ArrowLeft' ? -16 : e.key === 'ArrowRight' ? 16 : 0
    if (!paso) return
    e.preventDefault()
    const actual = anchos[id] ?? (celda ? celda.getBoundingClientRect().width : base[id])
    const max = celda ? techo(celda, actual) : Infinity
    setAnchos((p) => ({ ...p, [id]: Math.round(Math.min(max, Math.max(MINIMO, actual + paso))) }))
  }

  /** Devuelve una sola columna a su ancho de diseño (doble click). */
  const soltarUna = (id: T) =>
    setAnchos((p) => {
      const n = { ...p }
      delete n[id]
      return n
    })

  return {
    /** Ancho fijado a mano, o \`undefined\` si sigue con el del diseño. */
    manual: (id: T) => anchos[id],
    ancho: (id: T) => anchos[id] ?? base[id],
    hayCambios: Object.keys(anchos).length > 0,
    resetear: () => setAnchos({}),
    soltarUna,
    arrastrando,
    avisando,
    empezar,
    porTeclado,
  }
}

/* Publica el ancho visible de la tabla como \`--tabla-visible\`, para que lo
   que va adentro del contenedor scrolleado -el detalle de fila- pueda
   anclarse a la parte que se ve en vez de al ancho total de la tabla.
   Un \`100vw\` no alcanza: en tablet el contenedor mide bastante menos que
   la ventana. */
export function useAnchoVisible<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const medir = () => el.style.setProperty('--tabla-visible', \`\${el.clientWidth}px\`)
    medir()
    /* \`ResizeObserver\` cubre los cambios que no vienen de la ventana -por
       ejemplo colapsar el panel del paciente-, y el \`resize\` cubre el caso
       de la ventana aunque el observer venga demorado (sus callbacks van
       atadas al ciclo de render y no corren con la pestaña sin pintar). */
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    window.addEventListener('resize', medir)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', medir)
    }
  }, [])
  return ref
}

export function ManijaResize<T extends string>({
  id, label, estado, indice = 0,
}: {
  id: T
  label: string
  estado: ReturnType<typeof useAnchoColumnas<T>>
  /** Posición de la columna, para escalonar el aviso inicial. */
  indice?: number
}) {
  const activa = estado.arrastrando === id
  const tocada = estado.manual(id) !== undefined

  return (
    <span
      role="separator"
      aria-orientation="vertical"
      aria-label={\`Resize \${label} column\`}
      title={\`Drag to resize \${label}\${tocada ? ' · Double-click to reset' : ''}\`}
      tabIndex={0}
      onPointerDown={(e) => estado.empezar(id, e)}
      onDoubleClick={(e) => { e.stopPropagation(); estado.soltarUna(id) }}
      onKeyDown={(e) => estado.porTeclado(id, e)}
      onClick={(e) => e.stopPropagation()}
      /* Sin \`fill\`: con \`both\` la animación deja fijada la opacidad final
         (0) y pisa al \`group-hover\`, dejando la manija invisible para
         siempre después del aviso. */
      style={estado.avisando ? { animation: \`col-hint 2.4s ease-in-out \${indice * 60}ms 1\` } : undefined}
      /* -right-[5px] lo deja en el gap entre columnas, y 10px de ancho por
         28 de alto le dan un área de agarre real. Ojo: la celda que lo
         contiene no puede llevar \`truncate\` -su overflow:hidden recorta la
         manija y la vuelve inclickeable-. */
      /* Sólo de \`lg\` para arriba: abajo la tabla ya se lee scrolleando, no
         hay hover que revele la manija, y su \`touch-none\` se comía el
         gesto de scroll horizontal si el dedo caía encima. */
      className={cn(
        'group/manija absolute top-1/2 -right-[5px] z-10 hidden h-[28px] w-[10px] -translate-y-1/2 lg:flex',
        'cursor-col-resize touch-none items-center justify-center rounded-full',
        'transition-opacity duration-150 group-hover/fila:opacity-100',
        'focus-visible:opacity-100 focus-visible:outline-none',
        activa || tocada ? 'opacity-100' : 'opacity-0',
      )}
    >
      {/* Guía que baja por toda la tabla mientras se arrastra: el recorte
          del contenedor con overflow la corta justo al pie. */}
      {activa && (
        <span className="bg-dash-blue/25 pointer-events-none absolute -top-[120px] left-1/2 h-[1200px] w-[2px] -translate-x-1/2" />
      )}
      <span
        className={cn(
          'relative w-[3px] rounded-full transition-[height,background-color] duration-150',
          'motion-safe:animate-[col-grip-in_150ms_ease-out]',
          activa
            ? 'bg-dash-blue h-[26px]'
            : cn(
              'group-hover/manija:bg-dash-blue h-[16px] group-hover/manija:h-[22px]',
              tocada ? 'bg-dash-blue/50' : 'bg-line-strong',
            ),
        )}
      />
    </span>
  )
}
`})))()}var Gt;function Kt(){return(Kt=e((()=>{Gt=`import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import {
  X, TriangleAlert, ChevronDown, Clock, User, DoorOpen, ClipboardList, Activity,
} from 'lucide-react'
import { BLOCK_STYLE, type ApptState } from './calendar-data'
import { useAnclaje } from '@/lib/anclaje'
import { useEsChico } from '@/lib/media'
import { aviso } from '@/components/ui/toaster'

/* Figma 3856:214039 "Appointment Details Drawer".

   Quinta propuesta. Las cuatro anteriores compartían el mismo vicio: pares
   etiqueta/valor con micro-título en mayúsculas, o sea el volcado del
   formulario. Se lee lento y se parece a cualquier ficha.

   Acá el contenido manda sobre la forma:

   - **Un solo horario.** Mostrar inicio y fin hacía leer dos veces para
     entender un dato que es uno: cuándo empieza. La duración va al lado, en
     texto chico, y no compite. La hora y la fecha salen del turno que se
     clickeó —el mismo rótulo que muestra el bloque en la grilla—, no de un
     texto fijo.
   - **Filas con ícono en vez de etiqueta.** Un consultorio, un profesional y
     un motivo se reconocen por el ícono; el rótulo en mayúsculas sobraba.
   - **La card sigue siendo el bloque del calendario**: mismo acento arriba y
     mismo tinte de estado, así se ve de dónde salió.

   Abajo de \`sm\` deja de ser popover y pasa a ser hoja inferior a todo el
   ancho: a 390px la versión apaisada dejaba columnas de 103px y cortaba
   "Reaseon for the visit" en "Consult...". */

const W = 336

/* El detalle es de lectura: el turno se cambia desde "Edit appointment", no
   con lápices sueltos por fila. */
function Fila({ icono: Icono, children }: { icono: typeof User; children: string }) {
  return (
    <span className="flex items-center gap-2.5">
      <Icono className="size-4 shrink-0 text-ink-faint" />
      <span className="min-w-0 flex-1 truncate text-[13px] text-ink">{children}</span>
    </span>
  )
}

/* 2.4 h -> "2 hr 24 min". Las duraciones salen de la altura del bloque en el
   Figma, así que caen en fracciones raras; se muestran como son. */
function duracionLegible(horas: number) {
  const total = Math.round(horas * 60)
  const h = Math.floor(total / 60)
  const m = total % 60
  if (!h) return \`\${m} min\`
  return m ? \`\${h} hr \${m} min\` : \`\${h} hr\`
}

export function AppointmentDetailsDrawer({
  patient,
  estado = 'Booked',
  hora,
  duracion,
  fecha,
  provider,
  room,
  reason,
  anchor,
  onClose,
}: {
  patient: string
  estado?: ApptState
  /** El rótulo del bloque, tal como se lee en la grilla. */
  hora: string
  duracion: number
  fecha: Date
  provider: string
  room: string
  reason: string
  anchor: DOMRect
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const chico = useEsChico()
  const { left, top, ancho } = useAnclaje(ref, anchor, W)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    /* La posición se calcula una vez contra el bloque que la abrió. Si la
       ventana cambia de ancho —rotar el teléfono, mover el borde— esas
       coordenadas ya no valen y la card queda flotando en cualquier lado:
       se cierra. Sólo el ancho, porque en mobile la barra del navegador
       dispara \`resize\` con cada scroll y cerraría sola. */
    let ancho = window.innerWidth
    const onResize = () => {
      if (window.innerWidth !== ancho) {
        ancho = window.innerWidth
        onClose()
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('resize', onResize)
    }
  }, [onClose])

  const initials = patient.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
  const s = BLOCK_STYLE[estado] ?? BLOCK_STYLE.Booked

  const cuerpo = (
    <div
      ref={ref}
      role="dialog"
      aria-label={\`Appointment details for \${patient}\`}
      /* El borde de arriba lleva el color del estado en las dos formas; las
         coordenadas sólo existen cuando está anclada a su bloque. */
      style={chico ? { borderTopColor: s.bar } : { left, top, width: ancho, borderTopColor: s.bar }}
      className={
        chico
          ? 'motion-safe:animate-[sheet-in_180ms_ease-out] fixed inset-x-0 bottom-0 z-50 overflow-hidden rounded-t-2xl border-t-[3px] bg-white shadow-[0_-8px_28px_rgb(0_0_0/0.22)]'
          : 'motion-safe:animate-[loc-in_150ms_ease-out] absolute z-50 overflow-hidden rounded-xl border-t-[3px] bg-white shadow-[0_8px_28px_rgb(0_0_0/0.22)]'
      }
    >
      {chico && (
        <span className="mx-auto mt-2 block h-1 w-9 rounded-full bg-line" aria-hidden />
      )}

      {/* Cabecera en blanco. El estado ya lo canta el acento de arriba; con el
          fondo tintado además, la pill quedaba color sobre color y perdía
          contraste. Ahora la pill lleva el tinte y el fondo se retira. */}
      <div className="flex items-start gap-2.5 px-4 pt-3.5 pb-3">
        <span className="bg-dash-count-bg text-dash-blue-hover flex size-9 shrink-0 items-center justify-center rounded-lg text-[13px] font-semibold">
          {initials}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] leading-tight font-bold text-ink">
            {patient}
          </span>
          <span className="block text-[11px] text-ink-medium">33 yrs · ID 4471</span>
        </span>
        {/* Pill igual a las del resto del sistema —Insurance, Treatment
            plans—: borde y texto del mismo color, fondo tintado, 11px. Antes
            iba sin borde y a 10px, y no pegaba con ninguna otra. */}
        <span
          className="shrink-0 rounded-full border px-2 py-[2px] text-[11px] font-semibold"
          style={{ backgroundColor: s.bg, borderColor: s.fg, color: s.fg }}
        >
          {estado}
        </span>
        <button onClick={onClose} aria-label="Close" className="shrink-0 text-ink hover:opacity-60">
          <X className="size-4" />
        </button>
      </div>

      <div className="flex flex-col gap-3 p-4">
        {/* Un solo horario: el de inicio, que es el que ubica el turno. La
            duración va al lado y en chico. Va sobre una caja gris para que se
            despegue de las filas de abajo sin necesidad de una regla. */}
        <div className="flex items-center gap-2.5 rounded-md bg-surface-muted px-3 py-2">
          <Clock className="size-4 shrink-0 text-ink" />
          <span className="text-[15px] leading-none font-bold text-ink">{hora}</span>
          <span className="text-[11px] text-ink-muted">
            {duracionLegible(duracion)} ·{' '}
            {fecha.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          <Fila icono={User}>{provider}</Fila>
          <Fila icono={DoorOpen}>{room}</Fila>
          <Fila icono={ClipboardList}>{reason}</Fila>
          <Fila icono={Activity}>Encounter open</Fila>
        </div>

        <div className="flex items-center gap-2 rounded-r-md border-l-[3px] border-l-warn-fg bg-warn-bg px-2.5 py-1.5">
          <TriangleAlert className="size-3.5 shrink-0 text-warn-fg" />
          <span className="text-[11px] font-semibold text-warn-fg">Guarantor not assigned</span>
        </div>

        <button
          onClick={() => aviso.ok(\`\${patient} has been checked in.\`)}
          className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 w-full items-center justify-center gap-2 rounded-md text-[13px] font-semibold text-white transition-colors"
        >
          Check In <ChevronDown className="size-4" />
        </button>
      </div>
    </div>
  )

  return createPortal(
    <>
      {/* En hoja inferior hace falta el velo: la card ya no está pegada a su
          bloque, así que el usuario necesita ver qué queda atrás y poder salir
          tocando afuera. */}
      {chico && <div className="fixed inset-0 z-40 bg-black/30" aria-hidden onClick={onClose} />}
      {cuerpo}
    </>,
    document.body,
  )
}
`})))()}var qt;function Jt(){return(Jt=e((()=>{qt=`import { useState } from 'react'
import { AlarmClock, GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Figma 3862:224820 "appointment-item-2" — la columna de 190px que acompaña al
   modal de New Appointment. No es parte del modal: en el frame arranca en
   x=879 cuando el modal termina en 887, o sea que va pegada y hasta se monta
   8px encima. Los dos miden 813 de alto y empiezan en la misma y.

   Las horas van 08 AM … 12 PM y siguen con 13 PM, 14 PM…: es el mismo error
   del calendario grande, anomalía 27. Se replica. */

/* 4430:61940 llega hasta las 19 y repite "19 PM" en las dos últimas filas.
   La etiqueta duplicada no se replica: en un selector real serían dos franjas
   con el mismo nombre. Queda anotada como anomalía 56. */
export const HORAS = [
  '08 AM', '09 AM', '10 AM', '11 AM', '12 PM', '13 PM',
  '14 PM', '15 PM', '16 PM', '17 PM', '18 PM', '19 PM',
]

/* Bloque rojo del frame: 09 AM ocupado. */
const OCUPADA = '09 AM'

export function AppointmentSlotPicker({
  provider = 'Sarah Stone',
  especialidad = 'General Dentistry',
  fecha = 'Sábado, 19 de febrero de 2022',
  paciente,
  seleccion,
  onPick,
  className,
}: {
  provider?: string
  especialidad?: string
  fecha?: string
  /** Nombre a mostrar en la card que se arrastra. */
  paciente?: string
  /** Hora elegida, en el mismo formato que HORAS. */
  seleccion?: string
  onPick: (hora: string) => void
  className?: string
}) {
  const [sobre, setSobre] = useState<string | null>(null)

  return (
    /* El alto y el ancho los pone quien lo usa: al costado del modal va
       pegado y a toda la altura; adentro, a lo ancho y con scroll. */
    <aside
      className={cn(
        'motion-safe:animate-[loc-in_180ms_ease-out] flex flex-col overflow-hidden rounded-xl border border-line bg-white',
        className,
      )}
    >
      <header className="shrink-0 border-b border-line px-3 py-3">
        <div className="flex items-center gap-2">
          <span className="bg-dash-count-bg text-dash-blue-hover flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold">
            {provider.split(' ').map((w) => w[0]).slice(0, 2).join('')}
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[13px] font-bold text-ink">{provider}</span>
            <span className="block truncate text-[13px] font-bold text-ink">{especialidad}</span>
          </span>
        </div>
        <p className="mt-2 text-[10px] text-ink-muted">{fecha}</p>
        <p className="text-[10px] text-ink-faint">
          {seleccion ? 'Drag the card to move it' : 'Click on available time to schedule'}
        </p>
      </header>

      {/* Las franjas se reparten el alto del panel, como en el frame:
          813 - 85 de cabecera / 11 filas da ~70 cada una. */}
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {HORAS.map((h) => {
          const ocupada = h === OCUPADA
          const elegida = seleccion === h
          return (
            <div key={h} className="flex min-h-[54px] flex-1 border-b border-line-soft last:border-0">
              <span className="flex w-[50px] shrink-0 items-center pl-2 text-[11px] text-ink-muted">
                {h}
              </span>
              <button
                type="button"
                onClick={() => !ocupada && onPick(h)}
                disabled={ocupada}
                aria-label={ocupada ? \`\${h} unavailable\` : \`Schedule at \${h}\`}
                onDragOver={(e) => { if (!ocupada) { e.preventDefault(); setSobre(h) } }}
                onDragLeave={() => setSobre((s) => (s === h ? null : s))}
                onDrop={(e) => {
                  e.preventDefault()
                  setSobre(null)
                  if (!ocupada) onPick(h)
                }}
                className={cn(
                  'relative flex-1 border-l border-line-soft p-1 text-left transition-colors',
                  ocupada
                    ? 'cursor-not-allowed bg-[#fdf3f3]'
                    : sobre === h
                      ? 'bg-[#dbeafe]'
                      : elegida
                        ? 'bg-[#eff6ff]'
                        : 'bg-[#fbfbfc] hover:bg-[#eff6ff]',
                )}
              >
                {/* Media hora, para que la fila no quede como un bloque plano. */}
                <span className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-line-soft" />

                {ocupada && (
                  <span className="absolute inset-y-1 left-1 flex items-center rounded-r-md border-l-[3px] border-l-field-error bg-[#fde8e8] pr-2 pl-1.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-field-error text-white">
                      <AlarmClock className="size-3" />
                    </span>
                  </span>
                )}

                {/* La franja elegida se arrastra a otra hora. */}
                {elegida && !ocupada && (
                  <span
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.effectAllowed = 'move'
                      e.dataTransfer.setData('text/plain', h)
                    }}
                    className="border-l-dash-blue relative flex h-full cursor-grab items-center gap-1 rounded-r-[3px] border-l-[3px] bg-brand-tint px-1.5 active:cursor-grabbing"
                  >
                    <GripVertical className="text-dash-blue size-3 shrink-0" />
                    <span className="min-w-0 leading-tight">
                      <span className="text-dash-blue block truncate text-[10px] font-semibold">{h}</span>
                      <span className="block truncate text-[10px] text-[#18181b]">
                        {paciente?.trim() || 'New appointment'}
                      </span>
                    </span>
                  </span>
                )}
              </button>
            </div>
          )
        })}
      </div>
    </aside>
  )
}
`})))()}var Yt;function Xt(){return(Xt=e((()=>{Yt=`import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  BLOCK_STYLE, BLOCKED, DIAS_CORTOS, START_HOUR, END_HOUR, HOUR_PX,
  inicioDeSemana, sumarDias, mismoDia, type EventoConFecha,
} from './calendar-data'

/* Las tres vistas de Scheduling sobre la misma agenda, como Google Calendar:
   Day es una columna, Week son siete y Month es la grilla del mes.
   El frame sólo dibuja la semanal; Day y Month son extensión propia y usan el
   mismo lenguaje visual (mismos colores de estado, misma barra de acento). */

export type Vista = 'Day' | 'Week' | 'Month'

const HORAS = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i)
const fmtHora = (h: number) =>
  \`\${String(h > 12 ? h - 12 : h).padStart(2, '0')} \${h < 12 ? 'AM' : 'PM'}\`
export const fmtExacta = (h: number) => {
  const hh = Math.floor(h)
  const mm = Math.round((h - hh) * 60)
  return \`\${String(hh > 12 ? hh - 12 : hh).padStart(2, '0')}:\${String(mm).padStart(2, '0')} \${hh < 12 ? 'AM' : 'PM'}\`
}
/* Los turnos se sueltan en franjas de 15 minutos. */
const PASO = 0.25

type Props = {
  eventos: EventoConFecha[]
  fecha: Date
  onMover: (i: number, fecha: Date, start?: number) => void
  onAbrir: (e: EventoConFecha, el: HTMLElement) => void
}

/* ── Rejilla de horas, compartida por Day y Week ─────────────────────── */

function ColumnaHoras() {
  return (
    <div className="w-[46px] shrink-0">
      {HORAS.map((h) => (
        <div key={h} style={{ height: HOUR_PX }} className="relative">
          <span className="absolute -top-2 right-2 text-[11px] text-ink-muted">{fmtHora(h)}</span>
        </div>
      ))}
    </div>
  )
}

function ColumnaDia({
  fecha, eventos, onMover, onAbrir, arrastrado, resaltada, onResaltar,
}: {
  fecha: Date
  eventos: EventoConFecha[]
  onMover: Props['onMover']
  onAbrir: Props['onAbrir']
  arrastrado: React.RefObject<number | null>
  resaltada: boolean
  onResaltar: (v: boolean) => void
}) {
  const huboArrastre = useRef(false)
  const propios = eventos
    .map((e, i) => ({ e, i }))
    .filter(({ e }) => mismoDia(e.fecha, fecha))

  return (
    <div
      onDragOver={(ev) => { ev.preventDefault(); onResaltar(true) }}
      onDragLeave={() => onResaltar(false)}
      onDrop={(ev) => {
        ev.preventDefault()
        onResaltar(false)
        const i = arrastrado.current
        if (i === null) return
        const caja = ev.currentTarget.getBoundingClientRect()
        const bruto = START_HOUR + (ev.clientY - caja.top) / HOUR_PX
        onMover(i, fecha, Math.round(bruto / PASO) * PASO)
        arrastrado.current = null
      }}
      className={cn(
        'relative min-w-0 flex-1 border-l border-line-hair transition-colors',
        resaltada && 'bg-[#f5f8ff]',
      )}
    >
      {HORAS.map((h) => (
        <div key={h} style={{ height: HOUR_PX }} className="border-b border-line-hair" />
      ))}

      {BLOCKED.filter((b) => b.day === fecha.getDay()).map((b, i) => (
        <div
          key={i}
          className="absolute inset-x-0 bg-[#e8e8e8]"
          style={{ top: (b.start - START_HOUR) * HOUR_PX, height: b.duration * HOUR_PX }}
        />
      ))}

      {propios.map(({ e, i }) => {
        const s = BLOCK_STYLE[e.state]
        return (
          <button
            key={i}
            draggable
            onDragStart={(ev) => {
              arrastrado.current = i
              huboArrastre.current = true
              ev.dataTransfer.effectAllowed = 'move'
              ev.dataTransfer.setData('text/plain', e.patient)
            }}
            onDragEnd={() => { setTimeout(() => { huboArrastre.current = false }, 0) }}
            onClick={(ev) => {
              if (huboArrastre.current) return
              onAbrir(e, ev.currentTarget)
            }}
            className="absolute right-1 left-1 cursor-grab overflow-hidden rounded-r-[3px] border-l-[3px] px-1.5 py-1 text-left transition-shadow hover:shadow-md active:cursor-grabbing"
            style={{
              top: (e.start - START_HOUR) * HOUR_PX,
              height: e.duration * HOUR_PX,
              backgroundColor: s.bg,
              borderLeftColor: s.bar,
            }}
          >
            <span className="block text-[10px] font-medium" style={{ color: s.fg }}>{fmtExacta(e.start)}</span>
            <span className="block truncate text-[11px] text-[#18181b]">{e.patient}</span>
          </button>
        )
      })}
    </div>
  )
}

function Cabecera({ dias, hoy }: { dias: Date[]; hoy: Date }) {
  return (
    <div className="flex border-b border-line-hair">
      <div className="w-[46px] shrink-0" />
      {dias.map((d, i) => (
        <div key={i} className="flex min-w-0 flex-1 flex-col gap-1 border-l border-line-hair px-3 py-3">
          <span className="text-[11px] font-semibold tracking-wide text-ink-muted">
            {DIAS_CORTOS[d.getDay()]}
          </span>
          <span
            className={cn(
              'flex size-8 items-center justify-center rounded-full text-lg font-semibold',
              mismoDia(d, hoy) ? 'bg-dash-blue text-white' : 'text-dash-blue',
            )}
          >
            {String(d.getDate()).padStart(2, '0')}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ── Day y Week ──────────────────────────────────────────────────────── */

function VistaHoras({ dias, ...props }: Props & { dias: Date[] }) {
  const arrastrado = useRef<number | null>(null)
  const [destino, setDestino] = useState<number | null>(null)

  return (
    /* Una sola columna entra en cualquier pantalla; siete necesitan un ancho
       mínimo y scroll propio. */
    <div className="mt-4 overflow-x-auto rounded-lg border border-line bg-white">
      <div className={dias.length > 1 ? 'min-w-[760px]' : 'min-w-0'}>
        <Cabecera dias={dias} hoy={props.fecha} />
        <div className="relative flex">
          <ColumnaHoras />
          {dias.map((d, i) => (
            <ColumnaDia
              key={i}
              fecha={d}
              eventos={props.eventos}
              onMover={props.onMover}
              onAbrir={props.onAbrir}
              arrastrado={arrastrado}
              resaltada={destino === i}
              onResaltar={(v) => setDestino(v ? i : null)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function VistaDia(props: Props) {
  return <VistaHoras {...props} dias={[props.fecha]} />
}

export function VistaSemana(props: Props) {
  const inicio = inicioDeSemana(props.fecha)
  return <VistaHoras {...props} dias={Array.from({ length: 7 }, (_, i) => sumarDias(inicio, i))} />
}

/* ── Month ───────────────────────────────────────────────────────────── */

export function VistaMes({ eventos, fecha, onMover, onAbrir }: Props) {
  const arrastrado = useRef<number | null>(null)
  const [destino, setDestino] = useState<string | null>(null)
  /* En celular la celda sólo muestra puntos; tocar el día abre su lista
     debajo de la grilla, que es donde se leen los turnos. */
  const [diaAbierto, setDiaAbierto] = useState<Date | null>(null)
  const delDia = diaAbierto
    ? eventos.map((e, j) => ({ e, j })).filter(({ e }) => mismoDia(e.fecha, diaAbierto))
    : []
  const primero = new Date(fecha.getFullYear(), fecha.getMonth(), 1)
  const inicio = inicioDeSemana(primero)
  const celdas = Array.from({ length: 42 }, (_, i) => sumarDias(inicio, i))
  const hoy = new Date()

  return (
    <div className="mt-4 overflow-x-auto rounded-lg border border-line bg-white">
      {/* En celular el mes entra completo: las celdas muestran un punto por
          turno en vez del chip con nombre, como hace Google Calendar. */}
      <div className="md:min-w-[700px]">
        <div className="grid grid-cols-7 border-b border-line-hair">
          {DIAS_CORTOS.map((d) => (
            <span key={d} className="px-1.5 py-2 text-center text-[10px] font-semibold tracking-wide text-ink-muted md:px-3 md:text-left md:text-[11px]">
              {d}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {celdas.map((d, i) => {
            const fuera = d.getMonth() !== fecha.getMonth()
            const clave = d.toDateString()
            const propios = eventos.map((e, j) => ({ e, j })).filter(({ e }) => mismoDia(e.fecha, d))
            return (
              <div
                key={i}
                onDragOver={(ev) => { ev.preventDefault(); setDestino(clave) }}
                onDragLeave={() => setDestino((x) => (x === clave ? null : x))}
                onDrop={(ev) => {
                  ev.preventDefault()
                  setDestino(null)
                  if (arrastrado.current === null) return
                  /* En mes se cambia el día y se respeta la hora. */
                  onMover(arrastrado.current, d)
                  arrastrado.current = null
                }}
                onClick={() => setDiaAbierto((x) => (x && mismoDia(x, d) ? null : d))}
                className={cn(
                  'flex min-h-[68px] flex-col gap-1 border-r border-b border-line-hair p-1 transition-colors md:min-h-[104px] md:p-1.5',
                  i % 7 === 6 && 'border-r-0',
                  fuera && 'bg-surface-subtle',
                  destino === clave && 'bg-[#f5f8ff]',
                  diaAbierto && mismoDia(diaAbierto, d) && 'bg-[#eff6ff] md:bg-transparent',
                  propios.length > 0 && 'cursor-pointer md:cursor-default',
                )}
              >
                <span
                  className={cn(
                    'flex size-6 shrink-0 items-center justify-center self-start rounded-full text-[11px] font-semibold md:text-[12px]',
                    mismoDia(d, hoy) ? 'bg-dash-blue text-white' : fuera ? 'text-[#c4c4c8]' : 'text-ink',
                  )}
                >
                  {d.getDate()}
                </span>

                {/* Puntos en celular; el detalle va en la lista de abajo. */}
                {propios.length > 0 && (
                  <span className="flex flex-wrap gap-1 px-0.5 md:hidden">
                    {propios.map(({ e, j }) => (
                      <span
                        key={j}
                        title={\`\${fmtExacta(e.start)} · \${e.patient}\`}
                        className="size-1.5 rounded-full"
                        style={{ backgroundColor: BLOCK_STYLE[e.state].bar }}
                      />
                    ))}
                  </span>
                )}

                <span className="hidden flex-col gap-1 md:flex">
                {propios.map(({ e, j }) => {
                  const s = BLOCK_STYLE[e.state]
                  return (
                    <button
                      key={j}
                      draggable
                      onDragStart={(ev) => {
                        arrastrado.current = j
                        ev.dataTransfer.effectAllowed = 'move'
                        ev.dataTransfer.setData('text/plain', e.patient)
                      }}
                      onClick={(ev) => onAbrir(e, ev.currentTarget)}
                      className="flex cursor-grab items-center gap-1.5 overflow-hidden rounded-r-[3px] border-l-[3px] px-1.5 py-1 text-left active:cursor-grabbing"
                      style={{ backgroundColor: s.bg, borderLeftColor: s.bar }}
                    >
                      <span className="shrink-0 text-[10px] font-medium" style={{ color: s.fg }}>
                        {fmtExacta(e.start).slice(0, 5)}
                      </span>
                      <span className="truncate text-[10px] text-[#18181b]">{e.patient}</span>
                    </button>
                  )
                })}
                </span>
              </div>
            )
          })}
        </div>

        {/* Lista del día elegido: sólo en celular, que es donde la celda
            muestra puntos en vez de los turnos. */}
        {diaAbierto && (
          <div className="border-t border-line-hair p-3 md:hidden">
            <p className="text-[13px] font-bold text-ink">
              {DIAS_CORTOS[diaAbierto.getDay()]} {diaAbierto.getDate()}
            </p>
            {delDia.length === 0 ? (
              <p className="mt-2 text-xs text-ink-faint">No appointments on this day.</p>
            ) : (
              <div className="mt-2 flex flex-col gap-2">
                {delDia.map(({ e, j }) => {
                  const s = BLOCK_STYLE[e.state]
                  return (
                    <button
                      key={j}
                      onClick={(ev) => { ev.stopPropagation(); onAbrir(e, ev.currentTarget) }}
                      className="flex items-center gap-2 rounded-r-[3px] border-l-[3px] px-2.5 py-2 text-left"
                      style={{ backgroundColor: s.bg, borderLeftColor: s.bar }}
                    >
                      <span className="shrink-0 text-[11px] font-semibold" style={{ color: s.fg }}>
                        {fmtExacta(e.start)}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[13px] text-[#18181b]">
                        {e.patient}
                      </span>
                      <span className="shrink-0 text-[11px]" style={{ color: s.fg }}>{e.state}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
`})))()}var Zt;function Qt(){return(Qt=e((()=>{Zt=`import { useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { OptionCheckbox } from '@/components/patients/form'

/* Figma 3862:230569 "Link Treatment Plan Modal": es un drawer anclado a la
   derecha, a toda la altura, no un modal centrado. */

const PLANS = [
  { id: 'p1', date: '21 August 2025', doctor: 'Dr. Emily Chen', therapy: 'Comprehensive Implant Therapy' },
  { id: 'p2', date: '21 August 2025', doctor: 'Dr. Emily Chen', therapy: 'Comprehensive Implant Therapy' },
]
const VISITS = [
  { id: 'v1', name: 'Plan 1', total: '$1,270.00' },
  { id: 'v2', name: 'Plan 1', total: '$1,270.00' },
]
const PROCEDURES = Array(4).fill('D0120 - Periodic oral evaluation')

export function LinkTreatmentPlanDrawer({ onClose }: { onClose: () => void }) {
  const [plan, setPlan] = useState('p1')
  const [visit, setVisit] = useState('v1')

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30" onClick={onClose}>
      <div
        role="dialog"
        aria-label="Link to treatment plan visit"
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-[480px] max-w-full flex-col overflow-y-auto bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-xl font-bold text-ink">Link to treatment plan visit</h2>
          <button onClick={onClose} aria-label="Close" className="text-ink hover:opacity-60">
            <X className="size-5" />
          </button>
        </div>

        <p className="mt-5 text-[13px] font-semibold text-ink">Treatment plan</p>
        <div className="mt-2 flex flex-col gap-3">
          {PLANS.map((p) => {
            const on = plan === p.id
            return (
              <button
                key={p.id}
                onClick={() => setPlan(p.id)}
                className={cn(
                  'rounded-lg border p-3 text-left transition-colors',
                  on ? 'border-dash-blue' : 'border-transparent hover:bg-surface-subtle',
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-dash-ok-fg bg-white px-2 py-[2px] text-[10px] font-semibold text-dash-ok-fg">
                    Check In
                  </span>
                  <span className="text-[13px] font-bold text-ink">{p.date}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className={cn('flex size-4 shrink-0 items-center justify-center rounded-full border-2',
                    on ? 'border-dash-blue' : 'border-ink-faint')}>
                    {on && <span className="bg-dash-blue size-2 rounded-full" />}
                  </span>
                  <span className="text-[13px] font-bold text-ink">{p.doctor}</span>
                  <span className="text-line">|</span>
                  <span className="text-[12px] text-ink-muted">{p.therapy}</span>
                </div>
                <p className="text-dash-blue mt-1.5 text-[12px] font-medium">2 Visits • 3 Procedures</p>
              </button>
            )
          })}
        </div>

        <p className="mt-6 text-[13px] font-semibold text-ink">Visit</p>
        <div className="mt-2 flex flex-col gap-3">
          {VISITS.map((v) => {
            const on = visit === v.id
            return (
              <button
                key={v.id}
                onClick={() => setVisit(v.id)}
                className={cn(
                  'rounded-lg border p-3 text-left transition-colors',
                  on ? 'border-dash-blue' : 'border-transparent hover:bg-surface-subtle',
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13px] font-bold text-ink">{v.name}</span>
                  <span className="text-[12px] font-semibold text-ink-muted">
                    Total : <span className={on ? 'text-dash-blue' : 'text-ink-faint'}>{v.total}</span>
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {PROCEDURES.map((p, i) => (
                    <span
                      key={i}
                      className={cn(
                        'rounded-full border px-2 py-[3px] text-[10px]',
                        on ? 'border-dash-blue text-dash-blue' : 'border-line text-ink-faint',
                      )}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </button>
            )
          })}
        </div>

        <p className="mt-6 text-[13px] font-semibold text-ink-muted">Additional</p>
        <div className="mt-2 flex flex-col gap-3">
          <OptionCheckbox label="ASAP" />
          <OptionCheckbox label="Follow-up" />
          <OptionCheckbox label="Premedicate" />
        </div>

        <div className="mt-6 flex justify-end gap-3 pb-2">
          <button
            onClick={onClose}
            className="h-9 rounded-md border border-line bg-white px-6 text-[13px] font-medium hover:bg-surface-subtle"
          >
            Cancel
          </button>
          <button
            onClick={() => { aviso.ok('Treatment plan visit linked.'); onClose() }}
            className="bg-dash-blue hover:bg-dash-blue-hover h-9 rounded-md px-6 text-[13px] font-medium text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
`})))()}var $t;function en(){return(en=e((()=>{$t=`import { useMemo, useState } from 'react'
import {
  ModalShell, SectionCard, SelectField, SearchField, TextArea,
  OptionCheckbox, FormFooter, FieldLabel, FieldError,
} from '@/components/patients/form'
import { DatePicker, formatDMY } from '@/components/ui/date-picker'
import { AppointmentSlotPicker, HORAS } from '@/components/scheduling/AppointmentSlotPicker'
import {
  PlanCard, VisitRow, type Plan, type Visita,
} from '@/components/scheduling/TreatmentPlanPicker'
import { aviso } from '@/components/ui/toaster'

/* Figma 4430:61940 "Scheduling — Calendar (New Appointment Modal)".

   Rediseño sobre 3862:220908: las cards "Patient and Scheduling", "Details" y
   "Providers" se fundieron en Patient + Scheduling, y Additional Provider
   perdió el asterisco.

   Julián pidió después separar el modal en dos pasos (no viene del Figma):
   paso 1 es Patient + Scheduling + Additional, paso 2 es el link al treatment
   plan -antes vivían los dos en la misma pantalla, apretados uno al lado del
   otro-. \`paso\` maneja cuál se ve; "Continue" valida los obligatorios del
   paso 1 antes de dejar pasar al 2.

   La columna de horarios sigue a la derecha del formulario, hermana suya
   dentro de un mismo frame (757 + 190 = 947), pegada y sin montarse. Sólo
   aparece en el paso 1, que es el único con campos de horario.

   La dispara **ASAP**: es el único checkbox tildado en el frame donde la
   columna aparece. Es una inferencia — ver README.md, Desviaciones. */

const PACIENTES = ['John Smith', 'Noah James Smith', 'Maria Abril Viola', 'Elias Aguirre']
const PROVIDERS = ['Dr. Elena Martinez', 'Dr. Emily Chen', 'Dr. Salgado', 'Sarah Stone']

const VISITAS: Visita[] = [
  {
    id: 'v1', name: 'Visit 1', total: '$1,270.00',
    procedimientos: [
      'D0120 – Periodic oral evaluation',
      'D1110 – Prophylaxis – adult',
      'D0274 – Bitewings – four radiographic images',
      'D0210 – Intraoral complete series',
      'D2740 – Crown – porcelain/ceramic',
      'D6010 – Surgical placement of implant body',
      'D4341 – Periodontal scaling and root planing',
      'D9310 – Consultation',
    ],
  },
  {
    id: 'v2', name: 'Visit 2', total: '$860.00',
    procedimientos: ['D0120 – Periodic oral evaluation', 'D1110 – Prophylaxis – adult'],
  },
  /* Las tres siguientes siguen el hilo de la Comprehensive Implant Therapy:
     cirugía, pilar y corona. */
  {
    id: 'v3', name: 'Visit 3', total: '$2,480.00',
    procedimientos: [
      'D6010 – Surgical placement of implant body',
      'D6104 – Bone graft at time of implant placement',
      'D0220 – Intraoral periapical – first image',
    ],
  },
  {
    id: 'v4', name: 'Visit 4', total: '$1,340.00',
    procedimientos: [
      'D6056 – Prefabricated abutment',
      'D0140 – Limited oral evaluation – problem focused',
      'D0220 – Intraoral periapical – first image',
    ],
  },
  {
    id: 'v5', name: 'Visit 5', total: '$1,950.00',
    procedimientos: [
      'D6058 – Abutment supported porcelain/ceramic crown',
      'D0220 – Intraoral periapical – first image',
      'D6080 – Implant maintenance procedures',
    ],
  },
]

/* Los conteos de la card del plan salen de la lista de visitas: con números
   escritos a mano, agregar una visita dejaba el plan diciendo "2 Visits". */
const TOTAL_PROCEDIMIENTOS = VISITAS.reduce((a, v) => a + v.procedimientos.length, 0)

const PLANES: Plan[] = [
  { id: 'p1', estado: 'Accepted', date: '27, August 2025', doctor: 'Dr. Emily Chen', therapy: 'Comprehensive Implant Therapy', visitas: VISITAS.length, procedimientos: TOTAL_PROCEDIMIENTOS },
  { id: 'p2', estado: 'Inprogress', date: '27, August 2025', doctor: 'Dr. Emily Chen', therapy: 'Comprehensive Implant Therapy', visitas: VISITAS.length, procedimientos: TOTAL_PROCEDIMIENTOS },
]

const VACIO = {
  patient: '', primary: '', additional: '', requestor: '', reason: '',
  date: '', start: '', end: '', operatory: '', status: '', notes: '',
}

export type DatosTurno = Partial<typeof VACIO>

export function NewAppointmentModal({
  titulo = 'New Appointment',
  inicial,
  onGuardar,
  onClose,
}: {
  titulo?: string
  /** Con datos, el modal edita el turno en vez de crear uno. */
  inicial?: DatosTurno
  /** Recibe los valores al guardar. Si devuelve true, ya mostró su propio
      toast y el modal no muestra el suyo. */
  onGuardar?: (d: typeof VACIO) => boolean | void
  onClose: () => void
}) {
  const editando = !!inicial
  const [d, setD] = useState({ ...VACIO, ...inicial })
  /* La fecha va con el calendario, no con un select de tres opciones fijas:
     sin eso no se puede reprogramar a un día cualquiera. */
  const fecha = useMemo(() => {
    if (!d.date) return null
    const [dd, mm, yyyy] = d.date.split('-').map(Number)
    return Number.isNaN(dd) ? null : new Date(yyyy, mm - 1, dd)
  }, [d.date])
  const [asap, setAsap] = useState(true)
  const [plan, setPlan] = useState('p1')
  const [visita, setVisita] = useState('v1')
  const [intentado, setIntentado] = useState(false)
  /* Antes el panel de franjas horarias sólo salía con ASAP tildado -un
     disparador raro para algo que sólo tiene que ver con "mostrame dónde cae
     el turno"-. Ahora sale al tocar cualquier campo de Scheduling (el
     \`onFocus\` de React burbujea, así que uno solo alcanza para todo el
     grupo), y ASAP lo sigue mostrando también, no lo reemplaza. Sólo aplica
     en el paso 1 -en el 2 no hay campos de horario que lo disparen-. */
  const [tocoHorario, setTocoHorario] = useState(false)
  /* Julián pidió separar el modal en dos pasos: primero paciente/proveedor/
     horario, recién después el link al treatment plan -antes iba todo junto
     en una sola pantalla larga-. */
  const [paso, setPaso] = useState<1 | 2>(1)
  const mostrarPanel = paso === 1 && (asap || tocoHorario)
  const set = (k: keyof typeof VACIO) => (v: string) => setD((p) => ({ ...p, [k]: v }))
  const req = (k: keyof typeof VACIO) =>
    intentado && !d[k].trim() ? 'This field is required.' : undefined

  /* Elegir una franja completa la fecha y las dos horas de una. La hora de fin
     sale de la lista, no de sumar 1: así 11 AM cae en 12 PM y no en "12 AM". */
  const elegirFranja = (hora: string) => {
    const i = HORAS.indexOf(hora)
    setD((p) => ({ ...p, date: '12-03-2025', start: hora, end: HORAS[i + 1] ?? hora }))
  }

  /* Additional Provider dejó de ser obligatorio en este frame. */
  const obligatorios: (keyof typeof VACIO)[] =
    ['patient', 'primary', 'date', 'start', 'end', 'operatory', 'status']

  const continuar = () => {
    setIntentado(true)
    if (obligatorios.some((k) => !d[k].trim())) return
    setPaso(2)
  }

  const guardar = () => {
    setIntentado(true)
    if (obligatorios.some((k) => !d[k].trim())) return
    const manejado = onGuardar?.(d)
    if (!manejado) {
      aviso.ok(
        editando
          ? \`Appointment for \${d.patient} updated.\`
          : \`Appointment for \${d.patient} booked at \${d.start}.\`,
      )
    }
    onClose()
  }

  return (
    <ModalShell
      title={titulo}
      onClose={onClose}
      footer={
        paso === 1 ? (
          <FormFooter onCancel={onClose} onSave={continuar} saveLabel="Continue" />
        ) : (
          <FormFooter onCancel={() => setPaso(1)} onSave={guardar} cancelLabel="Back" />
        )
      }
      aside={
        mostrarPanel ? (
          <AppointmentSlotPicker
            seleccion={d.start}
            paciente={d.patient}
            onPick={elegirFranja}
            className="h-full w-[190px] rounded-l-none border-l-0 shadow-[0_4px_14px_0_rgb(100_100_100/0.25)] lg:h-full max-lg:max-h-[340px] max-lg:w-full max-lg:rounded-xl max-lg:border-l"
          />
        ) : undefined
      }
    >
      <p className="-mt-2 mb-4 text-[10px] font-semibold tracking-wide text-ink-muted uppercase">
        Step {paso} of 2 — {paso === 1 ? 'Patient & Scheduling' : 'Treatment Plan'}
      </p>

      {paso === 1 ? (
        /* Julián pidió Patient y Scheduling lado a lado -eran la columna
           izquierda entera, apiladas- y Additional abajo de las dos, ocupando
           todo el ancho: así entra toda la info del paso de un vistazo, sin
           tener que bajar por una columna angosta. */
        <div className="flex flex-col gap-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <SectionCard title="Patient">
              <p className="-mt-2 text-[11px] text-ink-muted">
                Complete the details below to schedule the appointment.
              </p>
              <SearchField
                label="Patient" required placeholder="Search by Name" options={PACIENTES}
                value={d.patient} onChange={set('patient')} error={req('patient')}
              />
              <SearchField
                label="Primary Provider" required placeholder="Search by Name" options={PROVIDERS}
                value={d.primary} onChange={set('primary')} error={req('primary')}
              />
              <SearchField
                label="Additional Provider" placeholder="Search by Name" options={PROVIDERS}
                value={d.additional} onChange={set('additional')}
              />
              <SelectField
                label="Requestor" placeholder="Who is requesting?"
                value={d.requestor} onChange={set('requestor')}
              />
              <SelectField label="Reason for Visit" value={d.reason} onChange={set('reason')} />
            </SectionCard>

            {/* onFocus -no onClick- porque el primer campo suele ser el
                DatePicker, que abre un popover en vez de "clickearse" él
                mismo; onFocus de React burbujea, así que uno solo alcanza para
                todo el grupo. Una vez que aparece, se queda -no tiene sentido
                que el panel entre y salga cada vez que el foco se mueve dentro
                del mismo grupo de campos-. */}
            <div onFocus={() => setTocoHorario(true)}>
            <SectionCard title="Scheduling">
              {/* El Figma dibuja Date como un select con la fecha 12-03-2025 de
                  placeholder; acá es el calendario, que es lo que hace falta para
                  reprogramar. Los dos campos de hora sí conservan ese placeholder
                  raro del frame. */}
              <div className="flex flex-col gap-2">
                <FieldLabel required>Date</FieldLabel>
                <DatePicker
                  value={fecha}
                  onChange={(nueva) => set('date')(formatDMY(nueva))}
                  placeholder="12-03-2025"
                  error={!!req('date')}
                  className="h-9 w-full"
                />
                <FieldError>{req('date')}</FieldError>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <SelectField
                  label="Start Time" required placeholder="12-03-2025" options={HORAS.slice(0, -1)}
                  value={d.start} onChange={set('start')} error={req('start')}
                />
                <SelectField
                  label="End Time" required placeholder="12-03-2025" options={HORAS.slice(1)}
                  value={d.end} onChange={set('end')} error={req('end')}
                />
              </div>
              <SelectField
                label="Operatory" required value={d.operatory}
                onChange={set('operatory')} error={req('operatory')}
              />
              <SelectField
                label="Status" required value={d.status}
                onChange={set('status')} error={req('status')}
              />
            </SectionCard>
            </div>
          </div>

          <SectionCard title="Additional">
            {/* Los tres iban uno debajo del otro -SectionCard los apila por
                default- y hacían bastante scroll para algo que es sólo tres
                casilleros cortos. Van en fila; cada uno en flex-1 para que
                \`OptionCheckbox\` (que ya es w-full) reparta el ancho parejo. */}
            <div className="flex flex-wrap gap-3">
              <div className="min-w-[160px] flex-1"><OptionCheckbox label="ASAP" checked={asap} onChange={setAsap} /></div>
              <div className="min-w-[160px] flex-1"><OptionCheckbox label="Follow-up" defaultChecked={false} /></div>
              <div className="min-w-[160px] flex-1"><OptionCheckbox label="Premedicate" defaultChecked={false} /></div>
            </div>
            <TextArea label="Notes" placeholder="Add notes" value={d.notes} onChange={set('notes')} />
          </SectionCard>
        </div>
      ) : (
        /* El link a un plan de tratamiento pasó a ser su propio paso -antes
           vivía apretado al lado de Patient/Scheduling-. Llegar acá ya
           implica que el paciente está elegido (es obligatorio en el paso 1),
           así que no hace falta re-chequear d.patient.

           Treatment plans y Visit iban los dos adentro de una sola card, uno
           debajo del otro. Primero se separaron en dos filas, pero Julián
           las quería lado a lado -Treatment a la izquierda, Visit a la
           derecha-, igual que Patient/Scheduling en el paso 1. */
        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard title="Treatment plans">
            {PLANES.map((p) => (
              <PlanCard key={p.id} plan={p} on={plan === p.id} onClick={() => setPlan(p.id)} />
            ))}
          </SectionCard>

          <SectionCard title="Visit">
            {VISITAS.map((v) => (
              <VisitRow key={v.id} visita={v} on={visita === v.id} onClick={() => setVisita(v.id)} />
            ))}
          </SectionCard>
        </div>
      )}
    </ModalShell>
  )
}
`})))()}var tn;function nn(){return(nn=e((()=>{tn=`import { useEffect, useRef, useState } from 'react'
import { Palette, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LEGEND, BLOCK_STYLE } from './calendar-data'

/* El frame pone los siete estados en una barra a lo ancho. En pantalla chica
   había que arrastrarla de costado para leerla, y en grande ocupa una franja
   entera para algo que se consulta una vez.
   Acá es un botón que despliega la lista, con la misma muestra de color del
   bloque del calendario —barra de acento y fondo— en vez del punto suelto,
   que era lo que de verdad hacía falta reconocer. */
export function StatusLegend() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          'flex h-8 items-center gap-1.5 rounded-md border border-line bg-white px-3 text-xs font-medium text-ink-soft transition-colors',
          open ? 'border-dash-blue' : 'hover:bg-surface-subtle',
        )}
      >
        <Palette className="size-3.5" /> Status legend
        <ChevronDown className={cn('size-3.5 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="motion-safe:animate-[loc-in_120ms_ease-out] absolute top-[calc(100%+6px)] left-0 z-40 w-[228px] rounded-lg border border-line bg-white p-2 shadow-lg">
          {LEGEND.map(({ state, dot }) => {
            const s = BLOCK_STYLE[state]
            return (
              <div key={state} className="flex items-center gap-2.5 rounded-md px-2 py-1.5">
                <span
                  className="h-5 w-8 shrink-0 rounded-r-[3px] border-l-[3px]"
                  style={{ backgroundColor: s?.bg ?? 'var(--color-surface-muted)', borderLeftColor: s?.bar ?? 'var(--color-ink-faint)' }}
                />
                <span className="text-[13px] text-ink">{state}</span>
                {/* En el Figma "No-show" es el único sin punto (anomalía 24). */}
                {dot === null && (
                  <span className="ml-auto text-[10px] text-ink-faint">sin punto</span>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
`})))()}var rn;function an(){return(an=e((()=>{rn=`import { cn } from '@/lib/utils'

/* Diseño propio de las cards de "Link to treatment plan visit"
   (Figma 4430:61940). No replica el frame: está armado con piezas que ya
   existen en el sistema.

   Reusado: barra de acento de 3px (bloques del calendario, card ASAP), pills
   outline + fondo tintado (Relationships, Insurance, leyenda de Scheduling),
   chips de conteo \`bg-dash-count-bg\` ("Patients today") y la tabla con
   cabecera \`#f9f9f9\` de Insurance y Documents.

   Se propusieron dos variantes y Julián eligió una de cada listado:
   **el plan como card** y **la visita como fila con la tabla desplegada**.
   Las dos descartadas están descritas en
   design-reference/figma/modulos/scheduling.md. */

export type Plan = {
  id: string
  estado: 'Accepted' | 'Inprogress'
  date: string
  doctor: string
  therapy: string
  visitas: number
  procedimientos: number
}

export type Visita = {
  id: string
  name: string
  procedimientos: string[]
  total: string
}

const ESTADO = {
  Accepted: { pill: 'border-dash-ok-fg bg-dash-ok-bg text-dash-ok-fg', barra: '#1a804d' },
  Inprogress: { pill: 'border-dash-busy-fg bg-dash-busy-bg text-dash-busy-fg', barra: '#1d56bc' },
}

function Radio({ on, className }: { on: boolean; className?: string }) {
  return (
    <span
      className={cn(
        'flex size-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-colors',
        on ? 'border-dash-blue' : 'border-[#c4c4c8]',
        className,
      )}
    >
      {on && <span className="bg-dash-blue size-2.5 rounded-full" />}
    </span>
  )
}

/* Contenedor seleccionable. Es un div con role=radio y no un <button> para
   poder anidar adentro el botón que despliega los procedimientos. */
function Seleccionable({
  on,
  onClick,
  barra,
  className,
  children,
}: {
  on: boolean
  onClick: () => void
  barra?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      role="radio"
      tabIndex={0}
      aria-checked={on}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      style={barra ? { borderLeftColor: barra } : undefined}
      className={cn(
        'flex w-full cursor-pointer gap-3 rounded-lg border text-left transition-colors',
        barra && 'border-l-[3px]',
        on ? 'border-dash-blue bg-[#f8faff]' : 'border-line bg-white hover:bg-surface-subtle',
        className,
      )}
    >
      {children}
    </div>
  )
}

/* ── Plan: card ──────────────────────────────────────────────────────── */

export function PlanCard({ plan, on, onClick }: { plan: Plan; on: boolean; onClick: () => void }) {
  const e = ESTADO[plan.estado]
  return (
    <Seleccionable on={on} onClick={onClick} barra={e.barra} className="p-3">
      <Radio on={on} className="mt-0.5" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[13px] font-bold text-ink">{plan.doctor}</span>
          <span className={cn('shrink-0 rounded-full border px-2 py-[2px] text-[11px] font-semibold', e.pill)}>
            {plan.estado}
          </span>
        </div>
        <p className="mt-0.5 truncate text-xs text-ink-muted">{plan.therapy}</p>
        {/* Conteos en texto, no en pill. Una pill marca un estado —Accepted,
            Inprogress— y ésa ya está arriba a la derecha; pintar también los
            números ponía tres cápsulas de colores compitiendo en una card de
            cuatro líneas. */}
        <div className="mt-2 flex items-center gap-1.5">
          <span className="text-[11px] text-ink-muted">
            {plan.visitas} Visits · {plan.procedimientos} Procedures
          </span>
          <span className="ml-auto shrink-0 text-[11px] whitespace-nowrap text-ink-faint">
            {plan.date}
          </span>
        </div>
      </div>
    </Seleccionable>
  )
}

/* ── Visita: fila con la tabla de procedimientos ─────────────────────── */

export function VisitRow({ visita, on, onClick }: { visita: Visita; on: boolean; onClick: () => void }) {
  return (
    <Seleccionable on={on} onClick={onClick} className="flex-col gap-0 p-0">
      <div className="flex w-full items-center gap-3 px-3 py-2.5">
        <Radio on={on} />
        <span className="text-[13px] font-bold text-ink">{visita.name}</span>
        <span className="text-[11px] text-ink-muted">
          {visita.procedimientos.length} Procedures
        </span>
        <span className="ml-auto shrink-0 text-right">
          <span className="text-[10px] tracking-wide text-ink-faint uppercase">Total </span>
          <span className="text-dash-blue text-[15px] font-bold">{visita.total}</span>
        </span>
      </div>

      {/* La visita elegida abre la tabla completa, con la cabecera gris que
          usan Insurance y Documents. */}
      {on && (
        <div className="w-full px-3 pb-3">
          <div className="overflow-hidden rounded-lg border border-line-row bg-white">
            <div className="flex h-8 items-center gap-3 border-b border-line-row bg-surface-alt px-3 text-[10px] font-semibold tracking-wide text-ink-muted uppercase">
              <span className="w-[52px] shrink-0">Code</span>
              <span className="min-w-0 flex-1">Procedure</span>
            </div>
            <div className="max-h-[168px] overflow-y-auto">
              {visita.procedimientos.map((p) => {
                const [code, ...resto] = p.split(' – ')
                return (
                  <div
                    key={p}
                    className="flex h-8 items-center gap-3 border-b border-line-soft px-3 text-[11px] last:border-0"
                  >
                    <span className="text-dash-blue w-[52px] shrink-0 font-medium">{code}</span>
                    <span className="min-w-0 flex-1 truncate text-ink-medium">{resto.join(' – ')}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </Seleccionable>
  )
}
`})))()}var on;function sn(){return(sn=e((()=>{on=`import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'

/* Figma 3856:208346 "View Filters Panel". */

type Row = { id: string; label: string; sub?: string; kind?: 'avatar' | 'room' }

const STATUS: Row[] = [
  { id: 'all-status', label: 'Select all Status' },
  { id: 'proposed', label: 'Proposed' },
  { id: 'checkin', label: 'Check In' },
  { id: 'cancelled', label: 'Cancelled' },
]
const PROVIDERS: Row[] = [
  { id: 'all-prov', label: 'Select all Providers' },
  { id: 'martinez', label: "Dr. Martinez's", sub: 'General Dentist', kind: 'avatar' },
  { id: 'okonkwo', label: 'Dr. Emily Okonkwo', sub: 'Pediatric Specialist', kind: 'avatar' },
  { id: 'torres', label: 'Dr. Michael Torres', sub: 'Oral Surgeon', kind: 'avatar' },
]
/* Los subtítulos de las salas repiten las especialidades de los providers.
   Es del Figma y se deja tal cual. */
const ROOMS: Row[] = [
  { id: 'all-rooms', label: 'Select all Rooms' },
  { id: 'op1', label: 'Operatory 1', sub: 'General Dentist', kind: 'room' },
  { id: 'op2', label: 'Operatory 2', sub: 'Pediatric Specialist', kind: 'room' },
  { id: 'op3', label: 'Operatory 3', sub: 'Oral Surgeon', kind: 'room' },
]

function Group({
  rows,
  value,
  onChange,
}: {
  rows: Row[]
  value: string
  onChange: (id: string) => void
}) {
  return (
    <div className="flex flex-col gap-1">
      {rows.map((r) => {
        const on = value === r.id
        return (
          <button
            key={r.id}
            type="button"
            onClick={() => onChange(r.id)}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-left transition-colors',
              on ? 'bg-[#eef2ff]' : 'hover:bg-surface-subtle',
            )}
          >
            <span
              className={cn(
                'flex size-4 shrink-0 items-center justify-center rounded-full border-2',
                on ? 'border-dash-blue' : 'border-ink-faint',
              )}
            >
              {on && <span className="bg-dash-blue size-2 rounded-full" />}
            </span>
            {r.kind === 'avatar' && (
              <span className="bg-dash-count-bg text-dash-blue-hover flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold">
                {r.label.replace('Dr. ', '').split(' ').map((w) => w[0]).slice(0, 2).join('')}
              </span>
            )}
            {r.kind === 'room' && <span className="bg-dash-blue size-7 shrink-0 rounded-full" />}
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-semibold text-ink">{r.label}</span>
              {r.sub && <span className="block truncate text-[11px] text-ink-faint">{r.sub}</span>}
            </span>
          </button>
        )
      })}
    </div>
  )
}

/* Se despliega debajo del botón View, no como modal centrado. */
export function ViewFiltersPanel({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState('proposed')
  const [prov, setProv] = useState('martinez')
  const [room, setRoom] = useState('op1')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node
      if (ref.current && !ref.current.contains(t) && !(t as HTMLElement).closest?.('[data-view-trigger]')) {
        onClose()
      }
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
      <div
        ref={ref}
        role="dialog"
        aria-label="View"
        /* En angosto los 360 fijos se salían de pantalla: ahí el panel se
           ancla a los bordes del viewport en vez de al botón. */
        className={cn(
          'motion-safe:animate-[loc-in_150ms_ease-out] z-50 overflow-y-auto rounded-xl border border-line bg-white p-5 shadow-[0_8px_28px_rgb(0_0_0/0.18)] sm:p-6',
          'fixed inset-x-3 top-[76px] max-h-[calc(100svh-96px)]',
          'sm:absolute sm:inset-x-auto sm:top-[calc(100%+6px)] sm:right-0 sm:max-h-[70vh] sm:w-[360px]',
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-[22px] leading-none font-bold text-ink">View</h2>
            <p className="mt-1 text-[11px] text-ink-faint">Customize the schedule you want to see</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-ink hover:opacity-60">
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-5">
          <Group rows={STATUS} value={status} onChange={setStatus} />
          <Group rows={PROVIDERS} value={prov} onChange={setProv} />
          <Group rows={ROOMS} value={room} onChange={setRoom} />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="h-9 rounded-md border border-line bg-white px-6 text-[13px] font-medium hover:bg-surface-subtle"
          >
            Cancel
          </button>
          <button
            onClick={() => { aviso.ok('Calendar view updated.'); onClose() }}
            className="bg-dash-blue hover:bg-dash-blue-hover h-9 rounded-md px-6 text-[13px] font-medium text-white"
          >
            Save
          </button>
        </div>
      </div>
  )
}
`})))()}var cn;function ln(){return(ln=e((()=>{cn=`import {
  MapPin, Send, User, Stethoscope, CalendarDays, ClipboardList, X, type LucideIcon,
} from 'lucide-react'

/* Preview del consentimiento como lo recibe el paciente: una hoja de papel
   sobre el escritorio gris del panel, no una tarjeta más de la UI. Tipografía
   de la app (Inter), la misma que tenía el preview antes de ser hoja. Detalle en
   design-reference/figma/modulos/consents.md. */

/* "Patient acknowledgment" es el mismo texto en todos los consentimientos:
   no se edita por template, sólo se muestra acá. */
const RECONOCIMIENTOS_PACIENTE = [
  'I have read and understand the information provided.',
  'I had the opportunity to ask questions.',
  'I voluntarily consent to the proposed treatment.',
]

/* Fechas de ejemplo -no vienen del template, son del envío y de la cita del
   paciente-. */
const CONSENT_ENVIADO = 'September 23, 2026 — 10:30 AM'
const [FECHA_CITA, HORA_CITA] = 'October 15, 2026 — 9:00 AM'.split(' — ')

const ETIQUETA = 'text-[10px] font-semibold tracking-wide uppercase'

function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-3.5">
      <h4 className={\`\${ETIQUETA} border-b border-line pb-1 text-ink-muted\`}>{titulo}</h4>
      <div className="mt-2 text-ink-soft">{children}</div>
    </section>
  )
}

/* Casilla del recuadro de datos: rótulo con ícono arriba, valor abajo. */
function Campo({ icono: Icono, etiqueta, children }: { icono: LucideIcon; etiqueta: string; children: React.ReactNode }) {
  return (
    <div className="bg-white p-2.5">
      <p className={\`\${ETIQUETA} flex items-center gap-1 text-ink-muted\`}>
        <Icono className="text-dash-blue size-3 shrink-0" /> {etiqueta}
      </p>
      <div className="mt-1.5 text-[12px] leading-snug">{children}</div>
    </div>
  )
}

type Props = {
  titulo: string
  procedimiento?: string
  naturaleza: string
  riesgos: string
  vistaPaciente: boolean
}

export function ConsentDocument({ titulo, procedimiento, naturaleza, riesgos, vistaPaciente }: Props) {
  const lineasRiesgo = riesgos.split('\\n').filter(Boolean)
  const vacio = <p className="text-ink-faint">No content yet.</p>

  return (
    <article
      aria-label="Consent document preview"
      className="mx-auto flex aspect-[8.5/11] w-full max-w-[520px] flex-col bg-white px-6 pt-6 pb-3.5 text-[12px] leading-[1.5] text-ink-soft shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_2px_4px_rgb(0_0_0/0.06),0_14px_28px_-8px_rgb(0_0_0/0.22)]"
    >
      <header className="flex items-center gap-3 border-b-2 border-dash-blue pb-3">
        <span aria-hidden className="bg-dash-blue grid size-9 shrink-0 place-items-center rounded-md text-[12px] font-bold text-white">LA</span>
        <div className="flex min-w-0 flex-col gap-1 text-[11px] text-ink-muted">
          <p className="flex items-center gap-1 font-semibold text-ink"><MapPin className="size-3 shrink-0" /> Los Angeles, Dental Clinic</p>
          <p className="flex items-center gap-1"><Send className="size-3 shrink-0" /> Consent sent: {CONSENT_ENVIADO}</p>
        </div>
      </header>

      <div className="mt-4 text-center">
        <p className={\`\${ETIQUETA} text-dash-blue\`}>Informed Consent</p>
        <h3 className="mt-1 text-[17px] leading-tight font-bold text-ink">{titulo || 'Untitled Consent'}</h3>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-px border border-line-strong bg-line-strong">
        <Campo icono={User} etiqueta="Patient">
          <p className="font-bold text-ink">Sarah Stone</p>
          <p className="text-ink-muted">DOB: 04/02/1991</p>
          <p className="text-ink-muted">Patient ID: 12345432</p>
        </Campo>
        <Campo icono={Stethoscope} etiqueta="Provider">
          <p className="font-bold text-ink">John Lorem</p>
        </Campo>
        <Campo icono={CalendarDays} etiqueta="Appointment">
          <p className="font-bold text-ink">{FECHA_CITA}</p>
          <p className="text-ink-muted">{HORA_CITA}</p>
        </Campo>
        <Campo icono={ClipboardList} etiqueta="Procedure">
          <p className="font-bold text-ink">{procedimiento ?? '—'}</p>
        </Campo>
      </div>

      {!vistaPaciente && (
        <>
          <Seccion titulo="Diagnosis"><p>Non-restorable tooth with recurrent infection.</p></Seccion>
          <Seccion titulo="Clinical Findings"><p>Extensive decay affecting tooth structure and surrounding tissue.</p></Seccion>
        </>
      )}

      <Seccion titulo="Nature of procedure">{naturaleza ? <p>{naturaleza}</p> : vacio}</Seccion>

      <Seccion titulo="Risk and complications">
        {lineasRiesgo.length > 0 ? (
          <ul className="list-disc pl-4 marker:text-ink-faint">
            {lineasRiesgo.map((linea, i) => <li key={i}>{linea}</li>)}
          </ul>
        ) : vacio}
      </Seccion>

      <Seccion titulo="Patient acknowledgment">
        <ul className="flex flex-col gap-1.5">
          {RECONOCIMIENTOS_PACIENTE.map((r) => (
            <li key={r} className="flex gap-2">
              <span aria-hidden className="mt-[3px] size-3 shrink-0 rounded-[3px] border border-ink-muted" />
              {r}
            </li>
          ))}
        </ul>
      </Seccion>

      <div className="mt-auto grid grid-cols-[1fr_88px] gap-4 pt-7 text-[11px] text-ink-faint">
        <div className="relative border-t border-ink-medium pt-1">
          <X aria-hidden className="absolute -top-3.5 left-0 size-3 text-ink-faint" />
          Patient / Legal Guardian
        </div>
        <div className="border-t border-ink-medium pt-1">Date</div>
      </div>

      <footer className="mt-3 flex justify-between border-t border-line-soft pt-2 text-[10px] text-ink-faint">
        <span>Sarah Stone · Patient ID 12345432</span>
        <span>Page 1 of 1</span>
      </footer>
    </article>
  )
}
`})))()}var un;function dn(){return(dn=e((()=>{un=`import { useState } from 'react'
import { Search, Delete, X } from 'lucide-react'
import { LinkPersonCheckbox, FieldLabel } from '@/components/patients/form'
import { EMPLEADOS, type Empleado } from '@/data/employees'

/* Compartido por la ficha de empleado y "New Employee". Ver
   design-reference/figma/modulos/employees.md. */
export function LinkExistingPerson({
  vincular, onVincular, excluirId, vinculado, onSeleccionar,
}: {
  vincular: boolean
  onVincular: (v: boolean) => void
  excluirId?: string
  vinculado: Empleado | null
  onSeleccionar: (p: Empleado | null) => void
}) {
  const [busqueda, setBusqueda] = useState('')
  const candidatos = EMPLEADOS.filter((e) => e.esProvider && e.id !== excluirId)
  const resultados = busqueda.trim() && !vinculado
    ? candidatos.filter((p) => p.nombre.toLowerCase().includes(busqueda.trim().toLowerCase()))
    : []
  const limpiar = () => { setBusqueda(''); onSeleccionar(null) }

  return (
    <div className="flex flex-col gap-2">
      <LinkPersonCheckbox checked={vincular} onChange={(v) => { onVincular(v); if (!v) limpiar() }} />

      {vincular && (
        <div className="flex flex-col gap-2">
          <FieldLabel required>Person</FieldLabel>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
              <input
                value={busqueda}
                onChange={(e) => { setBusqueda(e.target.value); onSeleccionar(null) }}
                placeholder="Search providers..."
                className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-9 pl-9 text-[13px] placeholder:text-ink-faint focus:outline-none"
              />
              {busqueda && (
                <button
                  type="button" aria-label="Clear search" onClick={limpiar}
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-0.5 text-ink-faint hover:text-ink-muted"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
            <button
              type="button" aria-label="Reset selection" onClick={limpiar}
              className="bg-dash-blue hover:bg-dash-blue-hover flex size-9 shrink-0 items-center justify-center rounded-md text-white transition-colors"
            >
              <Delete className="size-4" />
            </button>
          </div>

          {resultados.map((p) => (
            <button
              key={p.id} type="button" onClick={() => { onSeleccionar(p); setBusqueda(p.nombre) }}
              className="flex items-center gap-3 rounded-lg border border-line bg-white p-3 text-left hover:bg-surface-subtle"
            >
              <span className="bg-dash-blue flex size-9 shrink-0 items-center justify-center rounded-md text-xs font-semibold text-white">
                {p.iniciales}
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block text-[13px] font-semibold text-ink">{p.nombre}</span>
                <span className="block text-[11px] text-ink-muted">DOB: {p.cumpleanos}</span>
              </span>
            </button>
          ))}

          {vinculado && (
            <div className="border-dash-blue flex items-center gap-3 rounded-lg border bg-[#eff6ff] p-3">
              <span className="bg-dash-blue flex size-9 shrink-0 items-center justify-center rounded-md text-xs font-semibold text-white">
                {vinculado.iniciales}
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block text-[13px] font-bold text-ink uppercase">{vinculado.nombre}</span>
                <span className="block text-[11px] text-ink-muted">
                  <span className="text-ink-faint">DOB:</span> {vinculado.cumpleanos}
                  <span className="text-ink-faint"> Email:</span> {vinculado.email}
                </span>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
`})))()}var fn;function pn(){return(pn=e((()=>{fn=`import { useState } from 'react'
import { CirclePlus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ModalShell, SelectField, FormFooter } from '@/components/patients/form'
import { aviso } from '@/components/ui/toaster'

/* Misma grilla de media hora que "New Exception": desplegable, no texto
   libre con máscara. */
const HORAS = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2)
  const m = i % 2 === 0 ? '00' : '30'
  return \`\${String(h).padStart(2, '0')}:\${m} hs\`
})

/* Figma 4620:115332 "Settings — Location (Information)": el modal que abre
   "Edit hours" en la pestaña Working Hours de una locación. Se llama **"New
   Availability"**, no "Edit Hours" —el rótulo del botón que lo abre y el
   título del modal no coinciden en el frame; se replica tal cual—.

   Es más chico que "New Hours" (3864:267207, el de la ficha de un empleado):
   sin el aviso ámbar y sin el selector de locación, porque acá ya se está
   adentro de una. Y el alcance tiene sólo dos opciones, no tres. */

const DIAS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const ALCANCES = ['Only this day', 'All linked days'] as const

export function LocationHoursModal({
  dia, onClose, onGuardar,
}: {
  /** Índice 0-6 (domingo a sábado) del día que se estaba editando, si vino de
      una fila puntual. Preselecciona ese día en "Repeat on days". */
  dia?: number
  onClose: () => void
  onGuardar?: (rango: { inicio: string; fin: string }) => void
}) {
  const [rangos, setRangos] = useState([{ inicio: '', fin: '' }])
  const [dias, setDias] = useState<number[]>(dia !== undefined ? [dia] : [1, 2, 3, 4, 5])
  const [alcance, setAlcance] = useState<(typeof ALCANCES)[number]>(ALCANCES[0])
  const [intentado, setIntentado] = useState(false)

  const guardar = () => {
    setIntentado(true)
    if (rangos.some((r) => !r.inicio.trim() || !r.fin.trim()) || dias.length === 0) return
    onGuardar?.(rangos[0])
    aviso.ok(\`Hours saved for \${dias.length} \${dias.length === 1 ? 'day' : 'days'}.\`)
    onClose()
  }

  return (
    <ModalShell
      title="New Availability"
      onClose={onClose}
      width="max-w-[420px]"
      footer={<FormFooter onCancel={onClose} onSave={guardar} />}
    >
      <div className="flex flex-col gap-4">
        {rangos.map((r, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="grid flex-1 grid-cols-2 gap-4">
              <SelectField
                label="Start Time" placeholder="00:00 hs" options={HORAS} value={r.inicio}
                onChange={(v) => setRangos((p) => p.map((x, j) => (j === i ? { ...x, inicio: v } : x)))}
                error={intentado && !r.inicio.trim() ? 'Required.' : undefined}
              />
              <SelectField
                label="End Time" placeholder="00:00 hs" options={HORAS} value={r.fin}
                onChange={(v) => setRangos((p) => p.map((x, j) => (j === i ? { ...x, fin: v } : x)))}
                error={intentado && !r.fin.trim() ? 'Required.' : undefined}
              />
            </div>
            {rangos.length > 1 && (
              <button
                type="button"
                aria-label="Remove time range"
                onClick={() => setRangos((p) => p.filter((_, j) => j !== i))}
                className="mt-7 shrink-0 rounded p-1 text-ink-muted hover:bg-surface-muted hover:text-dash-bad-fg"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => setRangos((p) => [...p, { inicio: '', fin: '' }])}
          className="text-dash-blue -mt-2 flex items-center gap-1.5 self-start text-[13px] font-semibold hover:underline"
        >
          <CirclePlus className="size-4" /> Add another time range
        </button>

        <div className="border-t border-line pt-4">
          <p className="text-sm font-bold text-ink">Repeat on days</p>
          <div className="mt-3 flex gap-2">
            {DIAS.map((d, i) => {
              const on = dias.includes(i)
              return (
                <button
                  key={i}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setDias((p) => (on ? p.filter((x) => x !== i) : [...p, i]))}
                  className={cn(
                    'flex size-8 items-center justify-center rounded-md border text-[13px] font-semibold transition-colors',
                    on
                      ? 'border-dash-blue text-dash-blue bg-white'
                      : 'border-transparent text-[#c4c4c8] hover:bg-surface-muted',
                  )}
                >
                  {d}
                </button>
              )
            })}
          </div>
        </div>

        <div className="border-t border-line pt-4">
          <p className="text-sm font-bold text-ink">Apply change to</p>
          <p className="mt-0.5 text-[11px] text-ink-muted">
            Choose how you want these hours to be applied.
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {ALCANCES.map((a) => {
              const on = alcance === a
              return (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAlcance(a)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-[13px]',
                    on ? 'border-dash-blue' : 'border-line hover:bg-surface-subtle',
                  )}
                >
                  <span className={cn('flex size-4 shrink-0 items-center justify-center rounded-full border-2', on ? 'border-dash-blue' : 'border-ink-faint')}>
                    {on && <span className="bg-dash-blue size-2 rounded-full" />}
                  </span>
                  {a}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </ModalShell>
  )
}
`})))()}var mn;function hn(){return(hn=e((()=>{mn=`import { useState } from 'react'
import { Trash2, Save } from 'lucide-react'
import {
  ModalShell, TextField, SelectField, FormFooter, FieldLabel, OptionCheckbox,
} from '@/components/patients/form'
import { DatePicker } from '@/components/ui/date-picker'
import { aviso } from '@/components/ui/toaster'
import type { Excepcion } from '@/data/location-detail'

/* Figma 3864:317345 "Settings — Location (Exceptions — New Exception
   Modal)". Name / Abreviattion (typo del frame) / Reason, y un recuadro
   propio para el rango con Start Time / Date / End Time y "All day
   exception". Los íconos de basura y guardar que trae el recuadro son
   redundantes con Cancel/Save del pie —así está en el frame— y se los deja
   con la misma acción: borrar vacía el rango, guardar dispara el submit.

   Fecha y horas son desplegables del sistema, no texto libre: el calendario
   es el \`DatePicker\` de shadcn que ya usa el resto de la app, y las horas
   son un \`SelectField\` con la grilla de media hora. Los campos no se apagan
   cuando "All day exception" está tildado —seguían pareciendo deshabilitados
   aunque se podía tipear igual—, sólo dejan de ser obligatorios. */

const RAZONES = ['Holiday', 'Staff Training', 'Maintenance', 'Private Event', 'Other']

const HORAS = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2)
  const m = i % 2 === 0 ? '00' : '30'
  return \`\${String(h).padStart(2, '0')}:\${m} hs\`
})

export function NewExceptionModal({
  inicial, onClose, onGuardar,
}: {
  inicial?: Excepcion
  onClose: () => void
  onGuardar: (e: Omit<Excepcion, 'id'>) => void
}) {
  const [nombre, setNombre] = useState(inicial?.nombre ?? '')
  const [abrev, setAbrev] = useState(inicial?.abreviatura ?? '')
  const [razon, setRazon] = useState(inicial?.razon ?? '')
  const [inicio, setInicio] = useState(inicial?.horaInicio ?? '')
  const [fecha, setFecha] = useState<Date | null>(inicial?.fecha ?? null)
  const [fin, setFin] = useState(inicial?.horaFin ?? '')
  const [todoElDia, setTodoElDia] = useState(inicial?.todoElDia ?? true)
  const [intentado, setIntentado] = useState(false)

  const guardar = () => {
    setIntentado(true)
    if (!nombre.trim() || !abrev.trim() || !fecha || (!todoElDia && (!inicio.trim() || !fin.trim()))) return
    onGuardar({
      nombre, abreviatura: abrev, razon, fecha, todoElDia,
      horaInicio: todoElDia ? '' : inicio, horaFin: todoElDia ? '' : fin,
      estado: 'Active',
    })
    onClose()
  }

  return (
    <ModalShell
      title="New Exception"
      onClose={onClose}
      width="max-w-[420px]"
      footer={<FormFooter onCancel={onClose} onSave={guardar} />}
    >
      <div className="flex flex-col gap-4">
        <TextField
          label="Name" required placeholder="Select" value={nombre} onChange={setNombre}
          error={intentado && !nombre.trim() ? 'This field is required.' : undefined}
        />
        <TextField
          label="Abreviattion" required placeholder="Placeholder" value={abrev} onChange={setAbrev}
          error={intentado && !abrev.trim() ? 'This field is required.' : undefined}
        />
        <SelectField label="Reason" options={RAZONES} value={razon} onChange={setRazon} />

        <div className="rounded-lg border border-line p-3">
          <div className="flex flex-col gap-4">
            <SelectField
              label="Start Time" required placeholder="00:00 hs" options={HORAS}
              value={inicio} onChange={setInicio}
              error={intentado && !todoElDia && !inicio.trim() ? 'Required.' : undefined}
            />
            <div className="flex flex-col gap-2">
              <FieldLabel required>Date</FieldLabel>
              <DatePicker
                value={fecha} onChange={setFecha} className="h-9 w-full"
                error={intentado && !fecha ? true : undefined}
              />
            </div>
            <SelectField
              label="End Time" required placeholder="00:00 hs" options={HORAS}
              value={fin} onChange={setFin}
              error={intentado && !todoElDia && !fin.trim() ? 'Required.' : undefined}
            />

            <OptionCheckbox label="All day exception" checked={todoElDia} onChange={setTodoElDia} />
          </div>

          <div className="mt-3 flex items-center gap-1">
            <button
              type="button"
              aria-label="Clear range"
              onClick={() => { setInicio(''); setFin(''); aviso.info('Time range cleared.') }}
              className="rounded-md p-1.5 text-ink-muted transition-colors hover:bg-dash-bad-bg hover:text-dash-bad-fg"
            >
              <Trash2 className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Save range"
              onClick={guardar}
              className="rounded-md p-1.5 text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink"
            >
              <Save className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  )
}
`})))()}var gn;function _n(){return(_n=e((()=>{gn=`import { useState } from 'react'
import { CirclePlus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ModalShell, SelectField, FormFooter } from '@/components/patients/form'
import { aviso } from '@/components/ui/toaster'

/* Figma 3864:267207 "New Hours". Aviso ámbar con barra de acento, locación,
   rangos horarios con su nota de zona horaria, los días de repetición y el
   alcance del cambio. Los textos van tal cual. */

const DIAS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const ZONA = 'Time zone in San Francisco, CA, USA (GMT-7)'
const ALCANCES = ['Only this day', 'All selected days', 'This and future weeks']

/* Misma grilla de media hora que "New Exception". */
const HORAS = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2)
  const m = i % 2 === 0 ? '00' : '30'
  return \`\${String(h).padStart(2, '0')}:\${m} hs\`
})

export function NewHoursModal({ onClose }: { onClose: () => void }) {
  const [rangos, setRangos] = useState([{ inicio: '', fin: '' }])
  const [dias, setDias] = useState<number[]>([1, 4, 5, 6])
  const [alcance, setAlcance] = useState(ALCANCES[0])
  const [locacion, setLocacion] = useState('')
  const [intentado, setIntentado] = useState(false)

  const guardar = () => {
    setIntentado(true)
    if (!locacion.trim() || rangos.some((r) => !r.inicio.trim() || !r.fin.trim())) return
    aviso.ok(\`Hours saved for \${dias.length} \${dias.length === 1 ? 'day' : 'days'}.\`)
    onClose()
  }

  return (
    <ModalShell
      title="New Hours"
      onClose={onClose}
      width="max-w-[420px]"
      footer={<FormFooter onCancel={onClose} onSave={guardar} />}
    >
      <div className="flex flex-col gap-4">
        <div className="rounded-r-md border-l-[3px] border-l-attn-fg bg-[#fffbeb] px-3 py-2.5">
          <p className="text-[11px] font-bold text-attn-fg">Attention needed</p>
          <p className="mt-1 text-[11px] leading-[1.5] font-medium text-attn-fg">
            Select the location assigned to the provider, then set the start and end times in the
            location&apos;s local time zone. The system will automatically convert and store the
            shift in Coordinated Universal Time (UTC) for consistency across all locations.
          </p>
        </div>

        <div>
          <SelectField
            label="Location"
            options={['Abril', 'Alaska Medical', 'Bayside Dental']}
            value={locacion}
            onChange={setLocacion}
            error={intentado && !locacion.trim() ? 'This field is required.' : undefined}
          />
          <p className="mt-1.5 text-[11px] text-ink-muted">{ZONA}</p>
        </div>

        {rangos.map((r, i) => (
          <div key={i}>
            <div className="grid grid-cols-2 gap-4">
              <SelectField
                label="Start Time" placeholder="00:00 hs" options={HORAS} value={r.inicio}
                onChange={(v) => setRangos((p) => p.map((x, j) => (j === i ? { ...x, inicio: v } : x)))}
                error={intentado && !r.inicio.trim() ? 'Required.' : undefined}
              />
              <SelectField
                label="End Time" placeholder="00:00 hs" options={HORAS} value={r.fin}
                onChange={(v) => setRangos((p) => p.map((x, j) => (j === i ? { ...x, fin: v } : x)))}
                error={intentado && !r.fin.trim() ? 'Required.' : undefined}
              />
            </div>
            <p className="mt-1.5 text-[11px] text-ink-muted">{ZONA}</p>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setRangos((p) => [...p, { inicio: '', fin: '' }])}
          className="text-dash-blue flex items-center gap-1.5 self-start text-[13px] font-semibold hover:underline"
        >
          <CirclePlus className="size-4" /> Add another time range
        </button>

        <div className="border-t border-line pt-4">
          <p className="text-sm font-bold text-ink">Repeat on days</p>
          <p className="mt-0.5 text-[11px] text-ink-muted">Set your regular hours for each day.</p>
          <div className="mt-3 flex gap-2">
            {DIAS.map((d, i) => {
              const on = dias.includes(i)
              return (
                <button
                  key={i}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setDias((p) => (on ? p.filter((x) => x !== i) : [...p, i]))}
                  className={cn(
                    'flex size-8 items-center justify-center rounded-md border text-[13px] font-semibold transition-colors',
                    on
                      ? 'border-dash-blue text-dash-blue bg-white'
                      : 'border-transparent text-[#c4c4c8] hover:bg-surface-muted',
                  )}
                >
                  {d}
                </button>
              )
            })}
          </div>
        </div>

        <div className="border-t border-line pt-4">
          <p className="text-sm font-bold text-ink">Apply change to</p>
          <p className="mt-0.5 text-[11px] text-ink-muted">
            Choose how you want these hours to be applied.
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {ALCANCES.map((a) => {
              const on = alcance === a
              return (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAlcance(a)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-[13px]',
                    on ? 'border-dash-blue' : 'border-line hover:bg-surface-subtle',
                  )}
                >
                  <span className={cn('flex size-4 shrink-0 items-center justify-center rounded-full border-2', on ? 'border-dash-blue' : 'border-ink-faint')}>
                    {on && <span className="bg-dash-blue size-2 rounded-full" />}
                  </span>
                  {a}
                </button>
              )
            })}
          </div>
        </div>

        <div className="rounded-r-md border-l-[3px] border-l-dash-blue bg-[#eff4ff] px-3 py-2.5">
          <p className="text-dash-blue text-[11px] leading-[1.5] font-semibold">
            This will update the hours for all selected days with the time ranges you&apos;ve set above.
          </p>
        </div>
      </div>
    </ModalShell>
  )
}
`})))()}var vn;function yn(){return(yn=e((()=>{vn=`import { useState } from 'react'
import { ModalShell, TextField, SelectField, FormFooter } from '@/components/patients/form'
import type { Sala } from '@/data/location-detail'

/* Figma 3864:306314 "Settings — Location (Rooms — New Room Modal)". Tres
   campos: Name, Abreviattion (typo del frame) y Type. Mismo modal para
   crear y para editar —con \`inicial\` precarga y el título cambia a "Edit
   Room", que no viene del frame pero es la convención del resto del
   sistema para este mismo patrón (Assign Role, New Exception). */

const TIPOS = ['Operatory', 'Consultation', 'X-Ray', 'Sterilization', 'Reception']

export function NewRoomModal({
  inicial, onClose, onGuardar,
}: {
  inicial?: Sala
  onClose: () => void
  onGuardar: (nombre: string, abrev: string, tipo: string) => void
}) {
  const [nombre, setNombre] = useState(inicial?.nombre ?? '')
  const [abrev, setAbrev] = useState(inicial?.abreviatura ?? '')
  const [tipo, setTipo] = useState(inicial?.tipo ?? '')
  const [intentado, setIntentado] = useState(false)

  const guardar = () => {
    setIntentado(true)
    if (!nombre.trim() || !abrev.trim()) return
    onGuardar(nombre, abrev, tipo)
    onClose()
  }

  return (
    <ModalShell
      title={inicial ? 'Edit Room' : 'New Room'}
      onClose={onClose}
      width="max-w-[420px]"
      footer={<FormFooter onCancel={onClose} onSave={guardar} />}
    >
      <div className="flex flex-col gap-4">
        <TextField
          label="Name" required placeholder="Select" value={nombre} onChange={setNombre}
          error={intentado && !nombre.trim() ? 'This field is required.' : undefined}
        />
        <TextField
          label="Abreviattion" required placeholder="Placeholder" value={abrev} onChange={setAbrev}
          error={intentado && !abrev.trim() ? 'This field is required.' : undefined}
        />
        <SelectField label="Type" options={TIPOS} value={tipo} onChange={setTipo} />
      </div>
    </ModalShell>
  )
}
`})))()}var bn;function xn(){return(xn=e((()=>{bn=`import { useState } from 'react'
import { Trash2, CirclePlus, ChevronDown, ChevronUp, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { EmptyState } from '@/components/ui/empty-state'
import { ModalShell, SectionCard, SelectField, FormFooter, FieldLabel } from '@/components/patients/form'

/* Figma 3864:270946 "Settings — Employee (Roles & Location)" y el modal
   "Assign Role".

   Las locaciones son las del frame, tal cual —incluido "Naples Detal"—.

   Regla del sistema: **sin ninguna locación tildada, el rol vale para todas**.
   Por eso el rótulo del rol dice "All locations" cuando no hay ninguna, en vez
   de "0 / 4": cero seleccionadas no significa que el rol no aplique en ningún
   lado, significa lo contrario. */

export const SEDES = ['Buenos Aires Medical 1', 'Naples Detal', 'Sede Olivos', 'Sede Pruebas 1']

export const ROLES_DISPONIBLES = [
  'Practice Administrator', 'Administrator', 'Dentist', 'Hygienist', 'Receptionist', 'Assistant',
]

export type RolAsignado = { id: string; nombre: string; sedes: string[] }

function Switch({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={cn(
        'flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors',
        on ? 'bg-dash-blue' : 'bg-line-strong',
      )}
    >
      <span className={cn('size-4 rounded-full bg-white transition-transform', on && 'translate-x-4')} />
    </button>
  )
}

function FilaRol({
  rol, abierto, onAbrir, onCambiar, onBorrar,
}: {
  rol: RolAsignado
  abierto: boolean
  onAbrir: () => void
  onCambiar: (sedes: string[]) => void
  onBorrar: () => void
}) {
  const todas = rol.sedes.length === 0 || rol.sedes.length === SEDES.length

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border transition-colors',
        abierto ? 'border-dash-blue' : 'border-line',
      )}
    >
      <div className={cn('flex items-center gap-3 px-4 py-3.5', abierto ? 'bg-dash-count-bg' : 'bg-white')}>
        <span className="min-w-0 flex-1">
          <span className="text-[15px] font-bold text-ink">{rol.nombre}</span>
          <span className="ml-2 text-[13px] text-ink-muted">
            {rol.sedes.length === 0
              ? 'Global access'
              : \`\${rol.sedes.length} / \${SEDES.length} locations\`}
          </span>
        </span>

        {/* "Global access" y no "All locations": es el nombre que usa el aviso
            del modal para la misma regla, y nombrar dos veces distinto la
            misma cosa es lo que hace dudar. */}
        <span className="hidden text-[13px] text-ink-muted sm:inline">Global access</span>
        <Switch
          on={todas}
          label={\`Global access for \${rol.nombre}\`}
          onChange={(v) => onCambiar(v ? [] : [SEDES[0]])}
        />
        <span className="h-5 w-px bg-line" />
        <button
          type="button"
          aria-label={\`Remove \${rol.nombre}\`}
          onClick={onBorrar}
          className="rounded p-1 text-ink hover:bg-dash-bad-bg hover:text-dash-bad-fg"
        >
          <Trash2 className="size-4" />
        </button>
        <button
          type="button"
          aria-label={abierto ? \`Collapse \${rol.nombre}\` : \`Expand \${rol.nombre}\`}
          aria-expanded={abierto}
          onClick={onAbrir}
          className="rounded p-1 text-ink hover:bg-black/5"
        >
          {abierto ? <ChevronDown className="size-4" /> : <ChevronUp className="size-4" />}
        </button>
      </div>

      {abierto && (
        <div className="grid gap-3 border-t border-line bg-white p-4 sm:grid-cols-2 xl:grid-cols-4">
          {SEDES.map((s) => {
            const on = rol.sedes.includes(s)
            return (
              <div
                key={s}
                className={cn(
                  'flex items-center gap-2 rounded-lg border px-3 py-2.5 transition-colors',
                  on ? 'border-dash-blue' : 'border-line',
                )}
              >
                <span className="min-w-0 flex-1 truncate text-[13px] text-ink">{s}</span>
                <Switch
                  on={on}
                  label={s}
                  onChange={(v) => onCambiar(v ? [...rol.sedes, s] : rol.sedes.filter((x) => x !== s))}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function AssignRoleModal({
  onGuardar, onClose,
}: {
  onGuardar: (rol: string, sedes: string[]) => void
  onClose: () => void
}) {
  const [rol, setRol] = useState('')
  const [sedes, setSedes] = useState<string[]>([])
  const [intentado, setIntentado] = useState(false)

  const guardar = () => {
    setIntentado(true)
    if (!rol) return
    onGuardar(rol, sedes)
    onClose()
  }

  return (
    /* Mismo modal que el resto de la app: título solo, sin ícono ni bajada, y
       las secciones en SectionCard con la misma jerarquía de títulos que New
       Patient o New Appointment. */
    <ModalShell
      title="Assign Role"
      width="max-w-[780px]"
      onClose={onClose}
      footer={<FormFooter onCancel={onClose} onSave={guardar} />}
    >
      <div className="flex flex-col gap-5">
        <SelectField
          label="Role"
          required
          value={rol}
          onChange={setRol}
          options={ROLES_DISPONIBLES}
          error={intentado && !rol ? 'This field is required.' : undefined}
        />

        <SectionCard title="Locations">
          <div className="border-l-dash-blue bg-dash-count-bg flex gap-2 rounded-r-md border-l-[3px] px-3 py-2.5">
            <Info className="text-dash-blue mt-px size-4 shrink-0" />
            <span className="text-xs">
              <span className="text-dash-blue-hover block font-semibold">Global access</span>
              <span className="text-dash-blue-hover">
                No locations selected means this role applies to all locations in the account.
              </span>
            </span>
          </div>

          {/* Tres columnas como el frame; a 780 el nombre más largo
              —"Buenos Aires Medical 1"— entra sin cortarse. */}
          <div className="grid gap-x-5 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {SEDES.map((s) => (
              <div key={s} className="flex items-center gap-3">
                <span className="min-w-0 flex-1 truncate">
                  <FieldLabel>{s}</FieldLabel>
                </span>
                <Switch
                  on={sedes.includes(s)}
                  label={s}
                  onChange={(v) => setSedes(v ? [...sedes, s] : sedes.filter((x) => x !== s))}
                />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </ModalShell>
  )
}

export function RolesLocation() {
  const [roles, setRoles] = useState<RolAsignado[]>([
    { id: 'r1', nombre: 'Administrator', sedes: [SEDES[0]] },
    { id: 'r2', nombre: 'Dentist', sedes: [SEDES[3]] },
    { id: 'r3', nombre: 'Receptionist', sedes: [SEDES[1]] },
  ])
  const [abierto, setAbierto] = useState<string | null>('r2')
  const [modal, setModal] = useState(false)

  const cambiar = (id: string, sedes: string[]) =>
    setRoles((rs) => rs.map((r) => (r.id === id ? { ...r, sedes } : r)))

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setModal(true)}
          className="text-dash-blue flex items-center gap-1.5 text-[13px] font-semibold hover:underline"
        >
          <CirclePlus className="size-4" /> Add Role
        </button>
      </div>

      {roles.length === 0 ? (
        <EmptyState
          icon={CirclePlus}
          title="No roles assigned"
          detail="Assign a role and choose the locations so this employee can work in the practice."
          accion={{ label: 'Add Role', onClick: () => setModal(true) }}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {roles.map((r) => (
            <FilaRol
              key={r.id}
              rol={r}
              abierto={abierto === r.id}
              onAbrir={() => setAbierto(abierto === r.id ? null : r.id)}
              onCambiar={(s) => cambiar(r.id, s)}
              onBorrar={() => {
                const indice = roles.findIndex((x) => x.id === r.id)
                setRoles((rs) => rs.filter((x) => x.id !== r.id))
                aviso.warn(\`\${r.nombre} was removed.\`, {
                  label: 'Undo',
                  onClick: () => setRoles((rs) => [...rs.slice(0, indice), r, ...rs.slice(indice)]),
                })
              }}
            />
          ))}
        </div>
      )}

      {/* Cancel y Save los pone la pantalla, una sola vez al pie. */}

      {modal && (
        <AssignRoleModal
          onClose={() => setModal(false)}
          onGuardar={(nombre, sedes) => {
            const id = \`r\${Date.now()}\`
            setRoles((rs) => [...rs, { id, nombre, sedes }])
            setAbierto(id)
            aviso.ok(
              sedes.length === 0
                ? \`\${nombre} assigned to all locations.\`
                : \`\${nombre} assigned to \${sedes.length} location\${sedes.length > 1 ? 's' : ''}.\`,
            )
          }}
        />
      )}
    </div>
  )
}
`})))()}var Sn;function Cn(){return(Cn=e((()=>{Sn=`/* Encabezado común de las pantallas de Settings. Antes cada una lo armaba
   por su cuenta y el botón principal caía en la fila del buscador, corrido
   del título; acá va alineado con el título y el buscador queda en su
   propia fila. Ver design-reference/figma/modulos/settings-accounts.md. */
export function SettingsPageHeader({
  titulo, bajada, accion, children,
}: {
  titulo: string
  bajada: string
  /** Acción principal, alineada con el título. */
  accion?: React.ReactNode
  /** Buscador y filtros, en la fila de abajo. */
  children?: React.ReactNode
}) {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-ink">{titulo}</h1>
          <p className="mt-1 text-sm text-ink-muted">{bajada}</p>
        </div>
        {accion}
      </div>
      {children && <div className="mt-5 flex flex-wrap items-center gap-3">{children}</div>}
    </>
  )
}
`})))()}var wn;function Tn(){return(Tn=e((()=>{wn=`import { cn } from '@/lib/utils'

/* Compartidos entre la ficha de empleado y la de locación: la misma card con
   título opcional, y el mismo switch Yes/No. */
export function Card({ title, children, className }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn('rounded-xl border border-line bg-white p-4 sm:p-5', className)}>
      {title && <h2 className="text-sm font-bold text-ink">{title}</h2>}
      <div className={title ? 'mt-4' : ''}>{children}</div>
    </section>
  )
}

export function Toggle({ label, on, onChange }: { label?: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-xs font-medium text-ink">{label}</span>}
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => onChange(!on)}
        className="flex items-center gap-2 text-[13px] text-ink"
      >
        <span className={cn('flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors', on ? 'bg-dash-blue' : 'bg-line-strong')}>
          <span className={cn('size-4 rounded-full bg-white transition-transform', on && 'translate-x-4')} />
        </span>
        {on ? 'Yes' : 'No'}
      </button>
    </div>
  )
}
`})))()}var En;function Dn(){return(Dn=e((()=>{En=`import * as React from 'react'
import { cn } from '@/lib/utils'

export function Avatar({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export function AvatarFallback({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'bg-primary text-primary-foreground flex h-full w-full items-center justify-center rounded-full font-medium',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
`})))()}var On;function kn(){return(kn=e((()=>{On=`import * as React from 'react'
import { cn } from '@/lib/utils'

const variants = {
  active: 'bg-green-50 text-green-700 border-green-200',
  inactive: 'bg-red-50 text-red-600 border-red-200',
  neutral: 'bg-muted text-muted-foreground border-border',
  self: 'bg-muted text-foreground border-border',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
} as const

export function Badge({
  className,
  variant = 'neutral',
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: keyof typeof variants }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
`})))()}var An;function jn(){return(jn=e((()=>{An=`import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export type Miga = { label: string; to?: string }

/* Rastro de navegación. El último tramo es la pantalla actual y por eso no es
   link: llevaría al mismo lugar. */
export function Breadcrumb({ items }: { items: Miga[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-[13px]">
      {items.map((m, i) => (
        <Fragment key={\`\${m.label}-\${i}\`}>
          {i > 0 && <ChevronRight className="size-3.5 shrink-0 text-ink-faint" />}
          {m.to ? (
            <Link to={m.to} className="text-dash-blue hover:underline">
              {m.label}
            </Link>
          ) : (
            <span className="text-ink-muted">{m.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  )
}
`})))()}var Mn;function Nn(){return(Nn=e((()=>{Mn=`import * as React from 'react'
import { cn } from '@/lib/utils'

/* Variantes calcadas del original: cada intent tiene su cuarteta
   base / hover / active / disabled con foreground propio. */
const variants = {
  default:
    'bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover hover:text-primary-hover-foreground active:bg-primary-active active:text-primary-active-foreground disabled:bg-primary-disabled disabled:text-primary-disabled-foreground',
  secondary:
    'bg-secondary text-secondary-foreground border border-secondary-border shadow-sm hover:bg-secondary-hover hover:text-secondary-hover-foreground active:bg-secondary-active active:text-secondary-active-foreground disabled:bg-secondary-disabled disabled:text-secondary-disabled-foreground',
  destructive:
    'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive-hover hover:text-destructive-hover-foreground active:bg-destructive-active active:text-destructive-active-foreground disabled:bg-destructive-disabled disabled:text-destructive-disabled-foreground',
  success:
    'bg-success text-success-foreground shadow-sm hover:bg-success-hover active:bg-success-active disabled:bg-success-disabled',
  outline:
    'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
} as const

const sizes = {
  default: 'h-9 px-4 py-2',
  sm: 'h-8 rounded-md px-3 text-xs',
  lg: 'h-10 rounded-md px-8',
  icon: 'h-9 w-9',
} as const

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors',
        'focus-visible:ring-ring focus-visible:ring-1 focus-visible:outline-none',
        'disabled:pointer-events-none disabled:cursor-not-allowed!',
        '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      <span className="inline-flex items-center gap-x-2">{children}</span>
    </button>
  ),
)
Button.displayName = 'Button'
`})))()}var Pn;function Fn(){return(Fn=e((()=>{Pn=`import * as React from 'react'
import { cn } from '@/lib/utils'

export const Card = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('bg-card rounded-xl border shadow-sm', className)} {...p} />
)
export const CardHeader = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...p} />
)
export const CardTitle = ({ className, ...p }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('leading-none font-semibold tracking-tight', className)} {...p} />
)
export const CardDescription = ({ className, ...p }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-muted-foreground text-sm', className)} {...p} />
)
export const CardContent = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-6 pt-0', className)} {...p} />
)
`})))()}var In;function Ln(){return(Ln=e((()=>{In=`import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Casilla del sistema: cuadrada, azul cuando está marcada. La misma que usa
   la tabla de Unassigned en Treatment Plan. */
export function Checkbox({
  on, onChange, label, className,
}: {
  on: boolean
  onChange: (v: boolean) => void
  label: string
  className?: string
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={cn(
        'flex size-4 shrink-0 items-center justify-center rounded border transition-colors',
        on ? 'border-dash-blue bg-dash-blue text-white' : 'border-line-strong bg-white hover:border-ink-faint',
        className,
      )}
    >
      {on && <Check className="size-3" strokeWidth={3} />}
    </button>
  )
}
`})))()}var Rn;function zn(){return(zn=e((()=>{Rn=`import { useEffect, useMemo, useRef, useState } from 'react'
import { Calendar, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Trigger: mismo tratamiento que el resto de los inputs de la app
   (h-8, radio 6, borde #e4e4e7, sombra sutil, 13px). El Figma lo trae con
   borde azul permanente, pero acá el azul se reserva para el estado activo,
   como en el search y el selector de locación.
   El popover es el \`Calendar\` de shadcn: celdas de 36, tipografía normal,
   navegación en botones fantasma al 50% de opacidad, el día de hoy con
   \`bg-accent\` y el elegido con \`bg-primary\`. Todo con los tokens de la app
   (\`--accent\`, \`--primary\`, \`--muted-foreground\`, \`--popover\`). */

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export const formatDMY = (d: Date) =>
  \`\${String(d.getDate()).padStart(2, '0')}-\${String(d.getMonth() + 1).padStart(2, '0')}-\${d.getFullYear()}\`

export const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

export function DatePicker({
  value,
  onChange,
  /** Días con contenido: se marcan con un punto. */
  marked = [],
  placeholder = 'Pick a date',
  className,
  error,
}: {
  value: Date | null
  onChange: (d: Date) => void
  marked?: Date[]
  placeholder?: string
  /** Para usarlo como campo de formulario: h-9, ancho completo. */
  className?: string
  error?: boolean
}) {
  const [open, setOpen] = useState(false)
  const base = value ?? new Date()
  const [month, setMonth] = useState(() => new Date(base.getFullYear(), base.getMonth(), 1))
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  /* Grilla de 6 semanas arrancando en domingo, con relleno del mes vecino. */
  const cells = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1)
    const start = new Date(first)
    start.setDate(first.getDate() - first.getDay())
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(start)
      d.setDate(start.getDate() + i)
      return d
    })
  }, [month])

  const shift = (n: number) =>
    setMonth((m) => new Date(m.getFullYear(), m.getMonth() + n, 1))

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-invalid={error || undefined}
        className={cn(
          'flex h-8 items-center gap-2 rounded-md border bg-white px-3 text-[13px]',
          'shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] transition-colors',
          value ? 'text-[#0f172a]' : 'text-ink-faint',
          error
            ? 'border-field-error'
            : open ? 'border-dash-blue' : 'border-line hover:border-line-strong',
          className,
        )}
      >
        <Calendar className="size-4 shrink-0" />
        {value ? formatDMY(value) : placeholder}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Select date"
          /* Alineado al borde izquierdo del disparador. Con \`right-0\` se abría
             hacia la izquierda, y desde que el filtro de fecha vive arriba a la
             izquierda del dashboard eso lo dejaba en x=-136, fuera de pantalla. */
          className="motion-safe:animate-[loc-in_140ms_ease-out] bg-popover text-popover-foreground absolute top-[calc(100%+6px)] left-0 z-40 w-max max-w-[calc(100vw-24px)] rounded-md border p-3 shadow-md"
        >
          {/* Cabecera del Calendar de shadcn: mes centrado y navegación en los
              extremos. Los saltos de año son agregado propio — sin ellos una
              fecha de nacimiento queda a cientos de clics. */}
          <div className="relative flex h-7 items-center justify-center">
            <div className="absolute left-0 flex gap-1">
              <NavBtn onClick={() => shift(-12)} label="Previous year"><ChevronsLeft className="size-4" /></NavBtn>
              <NavBtn onClick={() => shift(-1)} label="Previous month"><ChevronLeft className="size-4" /></NavBtn>
            </div>
            <span className="text-sm font-medium">
              {MONTHS[month.getMonth()]} {month.getFullYear()}
            </span>
            <div className="absolute right-0 flex gap-1">
              <NavBtn onClick={() => shift(1)} label="Next month"><ChevronRight className="size-4" /></NavBtn>
              <NavBtn onClick={() => shift(12)} label="Next year"><ChevronsRight className="size-4" /></NavBtn>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-[repeat(7,36px)]">
            {DAYS.map((d) => (
              <span
                key={d}
                className="text-muted-foreground flex size-9 items-center justify-center text-[0.8rem] font-normal"
              >
                {d}
              </span>
            ))}
            {cells.map((d, i) => {
              const outside = d.getMonth() !== month.getMonth()
              const selected = !!value && sameDay(d, value)
              const esHoy = sameDay(d, new Date())
              const hasItems = marked.some((m) => sameDay(m, d))
              return (
                <button
                  key={i}
                  type="button"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(d)
                    setOpen(false)
                  }}
                  className={cn(
                    'relative flex size-9 items-center justify-center rounded-md text-sm font-normal tabular-nums transition-colors',
                    'hover:bg-accent hover:text-accent-foreground',
                    selected && 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
                    !selected && esHoy && 'bg-accent text-accent-foreground',
                    !selected && outside && 'text-muted-foreground opacity-50',
                  )}
                >
                  {d.getDate()}
                  {hasItems && !selected && (
                    <span className="bg-primary absolute bottom-1 size-1 rounded-full" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}


/* Botón de navegación del Calendar de shadcn: fantasma con borde, medio
   apagado hasta el hover. */
function NavBtn({
  onClick, label, children,
}: {
  onClick: () => void
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="border-input hover:bg-accent hover:text-accent-foreground inline-flex size-7 items-center justify-center rounded-md border bg-transparent p-0 opacity-50 transition-opacity hover:opacity-100"
    >
      {children}
    </button>
  )
}
`})))()}var Bn;function Vn(){return(Vn=e((()=>{Bn=`import * as React from "react"
import { cn } from "@/lib/utils"
import { Dialog as DialogPrimitive } from "radix-ui"

import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="dialog-close" asChild>
            <Button
              variant="ghost"
              className="absolute top-2 right-2"
              size="icon"
            >
              <XIcon
              />
              <span className="sr-only">Close</span>
            </Button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-heading text-base leading-none font-medium",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
`})))()}var Hn;function Un(){return(Un=e((()=>{Hn=`import * as React from "react"
import { cn } from "@/lib/utils"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"
import { CheckIcon, ChevronRightIcon } from "lucide-react"

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  align = "start",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        align={align}
        className={cn("z-50 max-h-(--radix-dropdown-menu-content-available-height) w-(--radix-dropdown-menu-trigger-width) min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:overflow-hidden data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon
          />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon
          />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn("z-50 min-w-[96px] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-lg bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
`})))()}var Wn;function Gn(){return(Gn=e((()=>{Wn=`import { useRef } from 'react'
import { Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Avatar de iniciales con foto opcional: en vez de un cuadrado/círculo fijo,
   un botón de lápiz abre el selector de archivos del sistema y la imagen
   elegida reemplaza las iniciales. \`avatarClassName\` trae tamaño, forma y
   colores -distintos entre Employees (cuadrado, fondo celeste) y el panel
   del paciente (círculo, fondo azul sólido)-, así el componente no le impone
   una forma a quien lo usa; el botón toma el mismo tamaño y forma para
   superponerse exacto.

   El botón sólo aparece con hover/foco -antes era una insignia fija en la
   esquina, y con la foto ya puesta tapaba una parte de la cara todo el
   tiempo-. En reposo la foto se ve entera; al pasar el mouse, un velo oscuro
   con el lápiz cubre el avatar completo, no sólo una esquina. */
export function EditableAvatar({
  foto,
  iniciales,
  onChange,
  avatarClassName,
  label,
}: {
  foto: string | null
  iniciales: string
  onChange: (dataUrl: string) => void
  avatarClassName: string
  label: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const elegirArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0]
    e.target.value = ''
    if (!archivo) return
    const lector = new FileReader()
    lector.onload = () => onChange(String(lector.result))
    lector.readAsDataURL(archivo)
  }

  return (
    <span className="relative inline-flex shrink-0">
      {foto ? (
        <img src={foto} alt="" className={cn(avatarClassName, 'object-cover')} />
      ) : (
        <span className={cn(avatarClassName, 'flex items-center justify-center font-semibold')}>
          {iniciales}
        </span>
      )}
      <button
        type="button"
        aria-label={\`Change photo for \${label}\`}
        onClick={() => inputRef.current?.click()}
        className={cn(
          avatarClassName,
          'absolute inset-0 flex items-center justify-center bg-black/0 text-transparent opacity-0 transition-all hover:bg-black/45 hover:text-white hover:opacity-100 focus-visible:bg-black/45 focus-visible:text-white focus-visible:opacity-100 focus-visible:outline-none',
        )}
      >
        <Pencil className="size-4" />
      </button>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={elegirArchivo} />
    </span>
  )
}
`})))()}var Kn;function qn(){return(qn=e((()=>{Kn=`import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Figma (Design System) 7476:11618. Estado vacío del sistema: cuadrito
   \`#e8eef8\` con el icono en \`#1d56bc\`, título, bajada de dos líneas y, según
   el caso, un botón primario o la pastilla gris de "planeado".
   Reemplaza los vacíos sueltos que cada pantalla se había inventado. */
export function EmptyState({
  icon: Icon,
  title,
  detail,
  accion,
  pill,
  className,
}: {
  icon?: LucideIcon
  title: string
  detail?: string
  accion?: { label: string; onClick: () => void }
  /* Para lo que todavía no existe: "PLANNED", "COMING SOON". */
  pill?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-1 flex-col items-center justify-center gap-2 px-6 py-10 text-center',
        className,
      )}
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-brand-tint">
        {Icon ? <Icon className="text-dash-blue size-4" /> : <span className="bg-dash-blue size-2.5 rounded-full" />}
      </span>
      <p className="text-sm font-bold text-ink">{title}</p>
      {detail && (
        <p className="max-w-[260px] text-xs leading-[1.5] text-ink-faint">{detail}</p>
      )}
      {accion && (
        <button
          type="button"
          onClick={accion.onClick}
          className="bg-dash-blue hover:bg-dash-blue-hover mt-1 h-9 rounded-md px-4 text-[13px] font-medium text-white transition-colors"
        >
          {accion.label}
        </button>
      )}
      {pill && (
        <span className="mt-1 rounded-md bg-[#f2f5f7] px-2 py-1 text-[10px] font-semibold tracking-wide text-dash-delta uppercase">
          {pill}
        </span>
      )}
    </div>
  )
}
`})))()}var Jn;function Yn(){return(Yn=e((()=>{Jn=`import * as React from 'react'
import { cn } from '@/lib/utils'
import { Input } from './input'
import { Label } from './label'

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  /** Elemento pegado al borde derecho del input (ej. el ojo de password). */
  adornment?: React.ReactNode
  colSpan?: string
}

/* Replica del grupo label+input del original: alto total 60px
   (label 17 + gap 7 + input 36), sin space-y en el wrapper. */
export function Field({
  label,
  adornment,
  colSpan = 'col-span-12',
  className,
  id,
  ...props
}: FieldProps) {
  return (
    <div className={cn('w-full space-y-0', colSpan)}>
      {/* El label es inline a propósito. No lleva margin: los 24px que lo
          separan del input salen del strut de la línea (line-height 24px
          heredado del contenedor), exactamente como en el original. */}
      <Label htmlFor={id}>{label}</Label>
      <div className="relative mt-0 w-full">
        <Input id={id} className={cn(adornment && 'pr-9', className)} {...props} />
        {adornment}
      </div>
    </div>
  )
}
`})))()}var Xn;function Zn(){return(Zn=e((()=>{Xn=`import * as React from "react"
import { cn } from "@/lib/utils"
import { HoverCard as HoverCardPrimitive } from "radix-ui"

function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  )
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
`})))()}var Qn;function $n(){return($n=e((()=>{Qn=`import * as React from 'react'
import { cn } from '@/lib/utils'

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors',
      'placeholder:text-muted-foreground',
      'focus:border-black focus:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none',
      'active:outline-none active:ring-0',
      'disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      className,
    )}
    {...props}
  />
))
Input.displayName = 'Input'
`})))()}var er;function tr(){return(tr=e((()=>{er=`import * as React from 'react'
import { cn } from '@/lib/utils'

export const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      'text-sm leading-none font-medium',
      'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className,
    )}
    {...props}
  />
))
Label.displayName = 'Label'
`})))()}var nr;function rr(){return(rr=e((()=>{nr=`import { cn } from '@/lib/utils'

/* Escala tipográfica unificada de la app (Figma "Platform Design").
   El título de página es 20px SemiBold #09090b en casi todas las pantallas:
   medido sobre los frames, "Dashboard" y "Patients" tenían la misma altura
   de tinta (15px), o sea el mismo tamaño de fuente.

   El dashboard rediseñado (4430:57451) es la excepción: ahí el título mide
   18px de tinta y 90px de ancho, que da 24px Bold. */
export function PageTitle({
  children,
  size = 'md',
}: {
  children: React.ReactNode
  size?: 'md' | 'lg'
}) {
  return (
    <h1
      className={cn(
        'leading-[1.3] text-ink',
        size === 'lg' ? 'text-2xl font-bold' : 'text-xl font-semibold',
      )}
    >
      {children}
    </h1>
  )
}
`})))()}var ir;function ar(){return(ar=e((()=>{ir=`import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/* Pill de estado, reusada en toda tabla del sistema (Accounts, Employees,
   Locations, Patients, Relationships, Insurance, Documents, Ledger): mismo
   radio, tipografía y los seis tonos que ya circulaban repetidos —y a veces
   ligeramente distintos— en cada pantalla. */

export type PillTone = 'success' | 'info' | 'warning' | 'danger' | 'neutral' | 'purple'

const TONO: Record<PillTone, string> = {
  success: 'border-dash-ok-fg bg-dash-ok-bg text-dash-ok-fg',
  info: 'border-dash-busy-fg bg-info-bg text-dash-busy-fg',
  warning: 'border-warn-fg bg-warn-bg text-warn-fg',
  danger: 'border-dash-bad-fg bg-dash-bad-bg text-dash-bad-fg',
  neutral: 'border-ink-faint bg-[#f5f5f5] text-[#595959]',
  purple: 'border-purple-fg bg-purple-bg text-purple-fg',
}

const TAMANO = {
  md: 'px-2.5 py-[3px] text-[11px]',
  sm: 'px-2 py-[1px] text-[10px]',
}

export function Pill({
  tone, size = 'md', className, children,
}: { tone: PillTone; size?: keyof typeof TAMANO; className?: string; children: ReactNode }) {
  return (
    <span className={cn('inline-flex items-center rounded-full border font-semibold', TAMANO[size], TONO[tone], className)}>
      {children}
    </span>
  )
}
`})))()}var or;function sr(){return(sr=e((()=>{or=`import * as React from "react"
import { cn } from "@/lib/utils"
import { Popover as PopoverPrimitive } from "radix-ui"

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 flex w-72 origin-(--radix-popover-content-transform-origin) flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-0.5 text-sm", className)}
      {...props}
    />
  )
}

function PopoverTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <div
      data-slot="popover-title"
      className={cn("font-medium", className)}
      {...props}
    />
  )
}

function PopoverDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
`})))()}var cr;function lr(){return(lr=e((()=>{cr=`import type { ReactNode } from 'react'
import { MoreVertical } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ICONO_SUELTO } from '@/lib/estilos'
import { cn } from '@/lib/utils'

/* El kebab de acciones de fila, igual en toda tabla del sistema: mismo
   ícono, mismo botón sin caja (\`ICONO_SUELTO\`) y el mismo menú desplegable
   de Radix -antes cada tabla lo re-implementaba a mano, con su propio
   click-outside y su propio Escape. */

export function RowActionsMenu({
  label, className, children,
}: {
  label: string
  className?: string
  children: ReactNode
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label={\`Actions for \${label}\`} className={cn(ICONO_SUELTO, className)}>
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[190px]">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
`})))()}var ur;function dr(){return(dr=e((()=>{ur=`import { cn } from '@/lib/utils'

/* El filtrado ya corre mientras se tipea; este botón es el que trae el
   Figma al lado del campo. Julián lo había sacado por redundante y después
   pidió que volviera en toda tabla con buscador al inicio. */
export function SearchButton({
  onClick, className,
}: { onClick?: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'bg-dash-blue hover:bg-dash-blue-hover shrink-0 rounded-md px-4 text-[13px] font-medium text-white transition-colors',
        className,
      )}
    >
      Search
    </button>
  )
}
`})))()}var fr;function pr(){return(pr=e((()=>{fr=`import * as React from "react"
import { cn } from "@/lib/utils"
import { Switch as SwitchPrimitive } from "radix-ui"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none group-has-[:focus-visible]/field-label:border-transparent group-has-[:focus-visible]/field-label:ring-0 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
`})))()}var mr;function hr(){return(hr=e((()=>{mr=`import { cn } from '@/lib/utils'

/* Pill tabs del original: contenedor gris, tab activo blanco/azul. */
export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
  className,
  variant = 'muted',
}: {
  tabs: readonly T[]
  value: T
  onChange: (v: T) => void
  className?: string
  variant?: 'muted' | 'primary'
}) {
  return (
    <div className={cn('bg-muted inline-flex items-center rounded-lg p-1', className)}>
      {tabs.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onChange(t)}
          className={cn(
            'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
            value === t
              ? variant === 'primary'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {t}
        </button>
      ))}
    </div>
  )
}
`})))()}var gr;function _r(){return(_r=e((()=>{gr=`import { Toaster as Sonner, toast } from 'sonner'
import { Check, X, TriangleAlert, Info } from 'lucide-react'

/* Toast del sistema: pastilla blanca, icono circular a la izquierda, texto y
   una X para cerrar. Se usa para confirmar o rechazar cada acción. */

export function Toaster() {
  return (
    <Sonner
      position="bottom-left"
      duration={3200}
      /* unstyled y sin clases en el wrapper: cada toast se dibuja con
         toast.custom, así que si sonner también pinta queda doble fondo. */
      toastOptions={{ unstyled: true, classNames: { toast: 'w-[360px]' } }}
    />
  )
}

const ICONO = {
  ok: <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-dash-ok-fg"><Check className="size-3 text-white" strokeWidth={3} /></span>,
  error: <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-dash-bad-fg"><X className="size-3 text-white" strokeWidth={3} /></span>,
  warn: <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-warn-fg"><TriangleAlert className="size-3 text-white" strokeWidth={3} /></span>,
  info: <span className="bg-dash-blue flex size-5 shrink-0 items-center justify-center rounded-full"><Info className="size-3 text-white" strokeWidth={3} /></span>,
}

/* Acción opcional: cuando el resultado deja algo por ver en otra pantalla,
   el toast ofrece ir, en vez de llevar al usuario sin preguntarle. */
export type AccionToast = { label: string; onClick: () => void }

function mostrar(tipo: keyof typeof ICONO, mensaje: string, accion?: AccionToast) {
  toast.custom(
    (t) => (
      <div className="flex w-[360px] items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 shadow-[0_8px_24px_rgb(0_0_0/0.12)]">
        {ICONO[tipo]}
        <span className="min-w-0 flex-1 text-[13px] text-ink">{mensaje}</span>
        {accion && (
          <button
            onClick={() => { accion.onClick(); toast.dismiss(t) }}
            className="text-dash-blue shrink-0 text-[13px] font-semibold whitespace-nowrap hover:underline"
          >
            {accion.label}
          </button>
        )}
        <button
          onClick={() => toast.dismiss(t)}
          aria-label="Close"
          className="shrink-0 text-ink-muted hover:text-black"
        >
          <X className="size-4" />
        </button>
      </div>
    ),
    /* Con acción dura más: hay que darle tiempo al usuario a decidir. */
    accion ? { duration: 9000 } : undefined,
  )
}

export const aviso = {
  ok: (m: string, a?: AccionToast) => mostrar('ok', m, a),
  error: (m: string, a?: AccionToast) => mostrar('error', m, a),
  warn: (m: string, a?: AccionToast) => mostrar('warn', m, a),
  info: (m: string, a?: AccionToast) => mostrar('info', m, a),
}
`})))()}var vr;function yr(){return(yr=e((()=>{vr=`import * as React from "react"
import { cn } from "@/lib/utils"
import { Tooltip as TooltipPrimitive } from "radix-ui"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "z-50 inline-flex w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
`})))()}var br;function xr(){return(xr=e((()=>{br=`import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`})))()}var Sr;function Cr(){return(Cr=e((()=>{Sr=`import { useMemo, useState } from 'react'
import {
  CreditCard, Search, X, Download, Wallet, MinusCircle, PlusCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { PageTitle } from '@/components/ui/page-title'
import { EmptyState } from '@/components/ui/empty-state'
import { aviso } from '@/components/ui/toaster'
import { moneda, type Movimiento } from '@/data/ledger'
import {
  PACIENTES_BILLING, buscarPacientes, ACTIVIDAD_RECIENTE,
  STATS_BILLING, STATS_HOY, FILTROS_ACTIVIDAD, type FiltroActividad, type TipoAjusteBilling,
} from '@/data/billing'
import { PostPaymentDialog } from '@/components/billing/PostPaymentDialog'
import { Pill, type PillTone } from '@/components/ui/pill'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'

/* Figma 4481:9881 "Billing". Ver design-reference/figma/modulos/billing.md.
   Las 4 pantallas del frame son estados de una sola vista: vacía, poblada,
   con el modal "Post payment" encima y con un paciente elegido -acá son
   \`filas.length === 0\`, el modal y \`seleccionado\`, no rutas separadas. */

function detalleTipo(m: Movimiento): { texto: string; tono: PillTone } {
  if (m.tipo === 'Charge') return { texto: m.codigo, tono: 'neutral' }
  if (m.tipo === 'Insurance') return { texto: 'Ins Payment', tono: 'purple' }
  if (m.tipo === 'Payment') return { texto: 'Pt Payment', tono: 'info' }
  return m.monto < 0
    ? { texto: 'Credit Adj', tono: 'neutral' }
    : { texto: 'Charge Adj', tono: 'danger' }
}

function Stat({ label, value, caption }: { label: string; value: string; caption: string }) {
  return (
    <div className="min-w-0 rounded-lg border border-line bg-white p-4">
      <p className="truncate text-xs text-ink-muted" title={label}>{label}</p>
      <p className="text-dash-blue mt-1 text-xl font-bold">{value}</p>
      <p className="mt-0.5 truncate text-[11px] text-ink-faint">{caption}</p>
    </div>
  )
}

function coincideFiltro(m: Movimiento, f: FiltroActividad) {
  if (f === 'All') return true
  if (f === 'Pt Payment') return m.tipo === 'Payment'
  if (f === 'Charge Adj') return m.tipo === 'Adjustment' && m.monto > 0
  return m.tipo === 'Adjustment' && m.monto < 0
}

const initials = (nombre: string) => nombre.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()

export default function Billing() {
  const [actividad, setActividad] = useState(ACTIVIDAD_RECIENTE)
  const [filtro, setFiltro] = useState<FiltroActividad>('All')
  const [busqueda, setBusqueda] = useState('')
  const [seleccionado, setSeleccionado] = useState<string | null>(null)
  const [modal, setModal] = useState<TipoAjusteBilling | null>(null)

  const filas = useMemo(() => actividad.filter((m) => coincideFiltro(m, filtro)), [actividad, filtro])
  const resultados = buscarPacientes(busqueda)
  const pacienteSeleccionado = seleccionado ? PACIENTES_BILLING.find((p) => p.nombre === seleccionado) : undefined

  /* \`saldoDe\` (de data/billing.ts) lee el mock estático: acá hace falta el
     saldo con lo que ya se posteó en esta sesión, así que se calcula sobre
     \`actividad\` -si no, la card de "Open Balance" se queda vieja apenas se
     postea un primer pago. */
  const saldoActual = (paciente: string) => actividad.find((m) => m.paciente === paciente)?.saldo ?? 0

  const registrarPago = (m: Omit<Movimiento, 'id'>) => {
    setActividad((p) => [{ ...m, id: \`act-\${Date.now()}\`, saldo: saldoActual(m.paciente) + m.monto }, ...p])
    aviso.ok(\`\${m.descripcion} of \${moneda(Math.abs(m.monto))} posted for \${m.paciente}.\`)
    setModal(null)
  }

  return (
    <div className={CONTENEDOR_PAGINA}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PageTitle>Billing</PageTitle>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setModal('Patient Payment')}
            className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 items-center gap-1.5 rounded-md px-3.5 text-[13px] font-medium text-white transition-colors"
          >
            <Wallet className="size-3.5" /> Patient Payment (-)
          </button>
          <button
            type="button"
            onClick={() => setModal('Credit Adjustment')}
            className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 items-center gap-1.5 rounded-md px-3.5 text-[13px] font-medium text-white transition-colors"
          >
            <MinusCircle className="size-3.5" /> Credit Adjustment (-)
          </button>
          <button
            type="button"
            onClick={() => setModal('Charge Adjustment')}
            className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 items-center gap-1.5 rounded-md px-3.5 text-[13px] font-medium text-white transition-colors"
          >
            <PlusCircle className="size-3.5" /> Charge Adjustment (+)
          </button>
          <button
            type="button"
            aria-label="Export statement"
            onClick={() => aviso.ok('Statement exported.')}
            className="flex size-9 items-center justify-center rounded-md border border-line bg-white text-ink-muted hover:bg-surface-subtle"
          >
            <Download className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {STATS_BILLING.map((s) => <Stat key={s.label} {...s} />)}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0 rounded-lg border border-line bg-white p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-sm font-bold text-ink">
              <CreditCard className="size-4" /> Recent Billing Activity
            </h2>
            <div className="flex w-fit shrink-0 items-center gap-1 rounded-lg bg-surface-slate p-1">
              {FILTROS_ACTIVIDAD.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFiltro(f)}
                  className={cn(
                    'h-7 shrink-0 rounded-md px-2.5 text-xs font-medium whitespace-nowrap transition-colors',
                    filtro === f ? 'bg-dash-blue text-white' : 'text-ink-slate hover:text-ink-soft',
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {pacienteSeleccionado && (
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[13px] text-ink">
                  Selected patient: <span className="font-semibold">{pacienteSeleccionado.nombre}</span>
                  {' · '}
                  <span className="text-dash-blue font-medium">{pacienteSeleccionado.rol}</span>
                </p>
                <button
                  type="button"
                  aria-label="Clear selected patient"
                  onClick={() => setSeleccionado(null)}
                  className="flex size-6 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted"
                >
                  <X className="size-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Stat label="Guarantor Unapplied Credits" value={moneda(pacienteSeleccionado.creditosNoAplicados)} caption="Available to apply" />
                <Stat label="Guarantor Open Balance" value={moneda(saldoActual(pacienteSeleccionado.nombre))} caption="Total outstanding" />
              </div>
            </div>
          )}

          {actividad.length === 0 ? (
            <EmptyState icon={CreditCard} title="No financial transaction has been posted yet." className="mt-3" />
          ) : filas.length === 0 ? (
            <EmptyState icon={CreditCard} title="No entries" detail="Nothing matches the current filter." className="mt-3" />
          ) : (
            <div className="mt-4 w-full overflow-x-auto rounded-md border border-line-row">
              <div className="min-w-[760px]">
                <div className="flex items-center gap-3 bg-surface-alt px-3 py-2.5 text-[11px] font-semibold text-ink-muted">
                  <span className="w-[104px] shrink-0">Date</span>
                  <span className="w-[124px] shrink-0">Patient</span>
                  <span className="w-[92px] shrink-0">Type</span>
                  <span className="min-w-[160px] flex-1">Description</span>
                  <span className="w-[124px] shrink-0">Provider</span>
                  <span className="w-[88px] shrink-0 text-right">Amount</span>
                  <span className="w-[92px] shrink-0 text-right">Balance</span>
                </div>
                {filas.slice(0, 10).map((m) => {
                  const t = detalleTipo(m)
                  return (
                    <div
                      key={m.id}
                      role="button"
                      tabIndex={0}
                      aria-label={\`Select \${m.paciente}\`}
                      onClick={() => setSeleccionado(m.paciente)}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSeleccionado(m.paciente)}
                      className="flex cursor-pointer items-center gap-3 border-t border-line-row px-3 py-2.5 text-[13px] text-ink-soft hover:bg-surface-subtle"
                    >
                      <span className="w-[104px] shrink-0">{m.fecha}</span>
                      <span className="w-[124px] shrink-0 truncate text-ink" title={m.paciente}>{m.paciente}</span>
                      <span className="w-[92px] shrink-0">{m.tipo === 'Charge' ? t.texto : <Pill tone={t.tono}>{t.texto}</Pill>}</span>
                      <span className="min-w-[160px] flex-1 truncate" title={m.descripcion}>{m.descripcion}</span>
                      <span className="w-[124px] shrink-0 truncate" title={m.provider}>{m.provider}</span>
                      <span className={cn('w-[88px] shrink-0 text-right font-medium tabular-nums', m.monto < 0 ? 'text-dash-ok-fg' : 'text-ink')}>{moneda(m.monto)}</span>
                      <span className="w-[92px] shrink-0 text-right font-semibold tabular-nums text-ink">{moneda(m.saldo)}</span>
                    </div>
                  )
                })}
                <div className="flex items-center justify-between border-t border-line-row px-3 py-2.5 text-xs font-semibold text-ink-muted">
                  <span>Showing {Math.min(10, filas.length)} of {filas.length}</span>
                  {filas.length > 10 && <button type="button" className="text-dash-blue hover:underline">View More →</button>}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-line bg-white p-4">
            <h2 className="flex items-center gap-2 text-sm font-bold text-ink">
              <Search className="size-4" /> Find Patient
            </h2>
            <div className="relative mt-3">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
              <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Search by Name, Last Name or Email"
                className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-8 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
              />
              {busqueda && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setBusqueda('')}
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 text-ink-faint hover:text-ink-muted"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {resultados.length === 0 ? (
              <EmptyState title="No recent patients/guarantors to show yet." className="py-6" />
            ) : (
              <div className="mt-3 flex flex-col gap-1">
                {resultados.map((p) => (
                  <button
                    key={p.nombre}
                    type="button"
                    onClick={() => setSeleccionado(p.nombre)}
                    className="flex items-center gap-2.5 rounded-md p-2 text-left hover:bg-surface-muted"
                  >
                    <span className="bg-dash-blue flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white">
                      {initials(p.nombre)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-medium text-ink">{p.nombre}</span>
                      {/* Typo tal cual el Figma: "Las payment" en vez de
                          "Last payment". Ver billing.md. */}
                      <span className="block text-[11px] text-ink-faint">Las payment {p.ultimoPago}</span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block text-[10px] text-ink-faint">Balance</span>
                      <span className="text-dash-blue block text-[12px] font-semibold">{moneda(saldoActual(p.nombre))}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-lg border border-line bg-white p-4">
            <h2 className="flex items-center gap-2 text-sm font-bold text-ink">
              <CreditCard className="size-4" /> Today
            </h2>
            <div className="mt-3 flex flex-col gap-3">
              {STATS_HOY.map((s) => <Stat key={s.label} {...s} />)}
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <PostPaymentDialog
          tipoInicial={modal}
          pacienteInicial={seleccionado ?? undefined}
          onClose={() => setModal(null)}
          onGuardar={registrarPago}
        />
      )}
    </div>
  )
}
`})))()}var wr;function Tr(){return(Tr=e((()=>{wr=`import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Maximize2, Minimize2, TriangleAlert, Stethoscope } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { EmptyState } from '@/components/ui/empty-state'
import { Odontogram } from '@/components/clinical/Odontogram'
import { makeMockExam } from '@/data/odontogram'
import { ClinicalTopBar } from '@/components/clinical/ClinicalTopBar'
import { ClinicalToolbar } from '@/components/clinical/ClinicalToolbar'
import { DentalAssessmentExam } from '@/components/clinical/DentalAssessmentExam'
import { TreatmentPlanList } from '@/components/clinical/TreatmentPlanList'
import { ProblemList } from '@/components/clinical/ProblemList'
import { VitalsPanel } from '@/components/clinical/VitalsPanel'
import { LabOrderPanel } from '@/components/clinical/LabOrderPanel'
import { RadiographyPanel } from '@/components/clinical/RadiographyPanel'
import { TreatmentPlanSection } from '@/components/clinical/TreatmentPlanSection'
import { ULTIMA_CONDICION, type Pestana, type Juego } from '@/data/clinical-mode'
import { PATIENTS } from '@/data/mock'

/* Clinical Mode — Figma 4235:135661 (barra, botonera y overview),
   4265:56662 (botonera de registros), 4106:205304 (Vitals),
   4070:148911 (Lab Order).

   Es un takeover: no usa el shell de la app —ni rail ni header—, porque la
   pantalla se ocupa entera con el paciente que se está atendiendo. La única
   salida es "Exit clinical Mode".

   Desviación anotada: el frame pone en el centro un **render 3D** de la boca,
   que es una imagen. Acá va el odontograma que ya tiene el sistema —32 piezas
   por 7 superficies—: dice lo mismo, se puede operar y es un componente
   nuestro, no una foto. Ver modulos/clinical-mode.md. */

export default function ClinicalMode() {
  const { id } = useParams()
  const patient = PATIENTS.find((p) => p.id === id) ?? PATIENTS[0]
  /* Overwiev no es una pestaña más: es el estado inicial y el botón de la
     barra vuelve acá desde cualquier examen o registro. */
  const [enOverview, setEnOverview] = useState(true)
  const [juego, setJuego] = useState<Juego>('Exams')
  const [pestana, setPestana] = useState<Pestana>('Vitals')
  const [encuentro, setEncuentro] = useState(false)
  const [ampliado, setAmpliado] = useState(false)

  const [exam, setExam] = useState(makeMockExam)
  const [seleccion, setSeleccion] = useState<number[]>([ULTIMA_CONDICION.pieza])

  const alternarPieza = (n: number) =>
    setSeleccion((s) => (s.includes(n) ? s.filter((x) => x !== n) : [...s, n]))

  const pintarSuperficie = (n: number, i: number) =>
    setExam((e) => ({
      ...e,
      teeth: e.teeth.map((t) =>
        t.number === n
          ? { ...t, surfaces: t.surfaces.map((c, j) => (j === i ? (c ? '' : '#fe0000') : c)) }
          : t,
      ),
    }))

  const irA = (p: Pestana) => { setPestana(p); setEnOverview(false) }

  const modelo = (
    <div className="relative overflow-hidden rounded-xl border border-line bg-white">
      {/* Fondo punteado: es el del frame y da la sensación de mesa de trabajo. */}
      <div
        className="overflow-x-auto p-4 pb-16"
        style={{ background: 'radial-gradient(#e4e4e7 1px, transparent 1px) 0 0 / 16px 16px, #fafbfe' }}
      >
        <div className={cn('mx-auto', ampliado ? 'min-w-[900px]' : 'min-w-[720px] max-w-[900px]')}>
          <Odontogram exam={exam} selected={seleccion} onToggle={alternarPieza} onSurface={pintarSuperficie} />
        </div>
      </div>

      <button
        onClick={() => setAmpliado((v) => !v)}
        aria-label={ampliado ? 'Collapse chart' : 'Expand chart'}
        aria-pressed={ampliado}
        className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-lg border border-line bg-white shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] hover:bg-surface-subtle"
      >
        {ampliado ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
      </button>

      <div className="absolute right-3 bottom-3 left-3 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border border-line bg-white/95 px-3 py-2 shadow-[0_4px_14px_rgb(0_0_0/0.1)] backdrop-blur-sm sm:left-auto">
        <span className="flex min-w-0 items-center gap-2">
          <TriangleAlert className="size-4 shrink-0 text-warn-fg" />
          <span className="truncate text-[13px] font-semibold text-ink">
            Last Condition: {ULTIMA_CONDICION.condicion}
          </span>
        </span>
        <span className="text-[11px] text-ink-muted">Last Update: {ULTIMA_CONDICION.actualizado}</span>
        <button
          onClick={() => {
            setSeleccion([ULTIMA_CONDICION.pieza])
            aviso.info(\`Tooth \${ULTIMA_CONDICION.pieza} selected on the chart.\`)
          }}
          className="bg-dash-blue hover:bg-dash-blue-hover ml-auto shrink-0 rounded-md px-2.5 py-1 text-[11px] font-semibold text-white transition-colors"
        >
          Show details
        </button>
      </div>
    </div>
  )

  const overview = (
    <div className="flex flex-col gap-4 lg:flex-row">
      {/* 360 y no 300: con 300 las tres cajas de datos del plan no entraban en
          una línea y "Total Procedures" se partía en dos. Medido: la etiqueta
          más larga pide 72px y con 360 la caja da 80. */}
      {!ampliado && (
        <div className="shrink-0 lg:w-[360px]">
          <TreatmentPlanList />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        {modelo}
        {!ampliado && <ProblemList />}
      </div>
    </div>
  )

  const contenido = enOverview
    ? overview
    : pestana === 'Vitals'
      ? <VitalsPanel />
      : pestana === 'Lab Order'
        ? <LabOrderPanel />
        : pestana === 'Radiography'
          ? <RadiographyPanel />
          : pestana === 'Treatment Plan'
            ? <TreatmentPlanSection />
            : pestana === 'DentAssmt'
              ? <DentalAssessmentExam />
              : (
          <div className="rounded-xl border border-line bg-white">
            <EmptyState
              icon={Stethoscope}
              title={pestana}
              detail={\`This \${juego === 'Exams' ? 'exam' : 'section'} is part of Clinical Mode and is being built from its own Figma board.\`}
              pill="Planned"
              className="py-16"
            />
          </div>
        )

  return (
        /* Sin tope de ancho: en pantallas grandes el contenido —las tablas, el
       odontograma— usa todo lo que hay. El padding lateral sube a 48 en
       desktop: con 85 sobraba aire y con 30 quedaba pegado al borde.

       Las dos barras llegan al borde derecho repartiendo el sobrante en sus
       huecos: ningún botón cambia de tamaño y la estructura aguanta a cualquier
       ancho. El tope de 1440 existe por eso mismo: sin él, a 1920 los huecos de
       la botonera se van a 90px y la fila se desarma.

       El fondo había quedado en blanco por un pedido anterior de Julián;
       ahora pidió volver al #fafbfe del resto de las pantallas -mismo token
       \`bg-page-background\` que usa AppShell, definido en :root así que
       funciona igual en este take-over sin shell-. */
    <div className="bg-page-background min-h-svh p-4 sm:p-[30px] lg:px-12">
      <div className="mx-auto w-full max-w-[1440px]">
      <ClinicalTopBar
        volverA={\`/patients/\${patient.id}\`}
        encuentro={encuentro}
        onEncuentro={() => {
          setEncuentro((v) => !v)
          aviso.ok(encuentro ? 'Encounter paused.' : 'Encounter started.')
        }}
        onOverview={() => setEnOverview(true)}
        enOverview={enOverview}
      />

      <div className="mt-4">
        <ClinicalToolbar
          juego={juego}
          onJuego={setJuego}
          pestana={enOverview ? ('' as Pestana) : pestana}
          onPestana={irA}
        />
      </div>

      <div className="mt-4 flex gap-4">
        <div className="min-w-0 flex-1">{contenido}</div>
      </div>
      </div>
    </div>
  )
}
`})))()}var Er;function Dr(){return(Dr=e((()=>{Er=`import { useMemo, useState } from 'react'
import { CalendarDays, Clock, Activity, CalendarClock } from 'lucide-react'
import { Panel } from '@/components/dashboard/primitives'
import { EmptyState } from '@/components/ui/empty-state'
import { FilterMenu } from '@/components/dashboard/FilterMenu'
import { PageTitle } from '@/components/ui/page-title'
import { StatStrip, type Stat } from '@/components/dashboard/StatStrip'
import { AppointmentCard, type Appointment } from '@/components/dashboard/AppointmentCard'
import { PatientDetailsPopover } from '@/components/dashboard/PatientDetailsPopover'
import { DatePicker, sameDay } from '@/components/ui/date-picker'
import { OperatoryCard } from '@/components/dashboard/OperatoryCard'
import { PendingTaskCard } from '@/components/dashboard/PendingTaskCard'
import {
  DIAS, DIA_VACIO, HOY_DEMO, TASK_KINDS, claveFecha, fechaDesdeClave, reprogramar,
  type DiaDashboard, type Origen,
} from '@/components/dashboard/dashboard-data'
import {
  NewAppointmentModal, type DatosTurno,
} from '@/components/scheduling/NewAppointmentModal'
import { HORAS } from '@/components/scheduling/AppointmentSlotPicker'
import { formatDMY } from '@/components/ui/date-picker'
import { aviso } from '@/components/ui/toaster'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'

/* Figma 4430:57451 — rediseño del dashboard.
   Cambios respecto de la versión anterior (3605:56445 / 3636:57488):
   - El frame lo rotula "Patients"; es un error del archivo (anomalía 54) y
     Julián confirmó que va "Dashboard".
   - Los tres stat cards se juntaron en una sola tira arriba a la derecha.
   - Las columnas son Appointments · Waiting Room · Rooms, fijas: el toggle
     Provider / Recepcionista ya no está en el diseño.
   - Pending Task bajó a una franja a lo ancho, con las tareas en tres
     columnas. Los tabs se sacaron: hacían lo mismo que el embudo.
   - Desapareció el cuarto panel "Rooms" vacío del pie.

   **Toda la pantalla cuelga del filtro de fecha** del panel de Appointments:
   encabezado, tira de stats, sala de espera, salas y tareas. Los datos por
   día están en dashboard-data.ts. */

const DEFAULT_DATE = HOY_DEMO

function BotonFiltro({
  label, options, value, onChange,
}: {
  label: string
  options: string[]
  value: string[]
  onChange: (v: string[]) => void
}) {
  return <FilterMenu label={label} options={options} value={value} onChange={onChange} />
}

export default function Dashboard() {
  const [date, setDate] = useState(DEFAULT_DATE)
  const [salas, setSalas] = useState<string[]>([])
  const [tipos, setTipos] = useState<string[]>([])
  const [selected, setSelected] =
    useState<{ appt: Appointment; rect: DOMRect; id?: string } | null>(null)
  const [editando, setEditando] = useState<{ datos: DatosTurno; origen: Origen } | null>(null)
  /* Los días viven en estado: reprogramar un turno tiene que moverlo de fecha
     y verse en el día nuevo. */
  const [dias, setDias] = useState(DIAS)

  const dia: DiaDashboard = useMemo(
    () => dias[claveFecha(date)] ?? DIA_VACIO,
    [dias, date],
  )
  const diasConDatos = useMemo(
    () => Object.entries(dias)
      .filter(([, d]) => d.appointments.length > 0 || d.waiting.length > 0)
      .map(([k]) => fechaDesdeClave(k)),
    [dias],
  )

  const pick = (appt: Appointment, el: HTMLElement, id?: string) =>
    setSelected({ appt, rect: el.getBoundingClientRect(), id })

  /* "10:00" -> "10 AM", la franja con la que trabaja el modal. */
  const franja = (t: string) => {
    const h = Number(t.slice(0, 2))
    return HORAS.find((x) => Number(x.slice(0, 2)) === h) ?? ''
  }

  /* El kebab abre el mismo modal de alta, con lo que la card ya sabe. */
  const editar = (a: Appointment, origen: Origen) => {
    setSelected(null)
    setEditando({
      origen,
      datos: {
        patient: a.name,
        primary: a.provider,
        operatory: a.operatory,
        date: formatDMY(date),
        start: franja(a.time),
        end: HORAS[HORAS.indexOf(franja(a.time)) + 1] ?? '',
        status: 'Check-in',
      },
    })
  }

  /* Guardar la edición: si cambió la fecha, el turno se muda de día. */
  const guardarEdicion = (d: Record<string, string>) => {
    if (!editando) return
    const { origen } = editando
    const destino = d.date || origen.clave
    const turnoNuevo = {
      name: d.patient,
      initials: d.patient.split(' ').map((x) => x[0]).slice(0, 2).join('').toUpperCase(),
      provider: d.primary,
      operatory: d.operatory,
      time: d.start.replace(/ (AM|PM)$/, ':00'),
    }
    setDias((prev) => reprogramar(prev, origen, destino, turnoNuevo))
    if (destino !== origen.clave) {
      /* No se salta de día solo: eso hace perder de vista el día en curso.
         El toast ofrece ir, y decide el usuario. */
      const nueva = fechaDesdeClave(destino)
      const corta = nueva.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      aviso.ok(\`\${d.patient} rescheduled to \${destino}.\`, {
        label: \`Go to \${corta}\`,
        onClick: () => setDate(nueva),
      })
      return true
    }
  }

  /* Los números salen de las listas del día, no de un mock aparte. */
  const stats: Stat[] = useMemo(() => {
    const completados = dia.appointments.filter((a) => a.completado).length
    const nuevos = dia.waiting.filter((w) => w.nuevo).length
    return [
      {
        label: 'Appointments', value: String(dia.appointments.length),
        nota: \`\${completados} completed\`, icon: CalendarDays,
      },
      {
        label: 'Waiting', value: String(dia.waiting.length),
        nota: \`\${nuevos} new\`, icon: Clock,
      },
      {
        label: 'Open encounters', value: String(dia.encuentros.abiertos),
        nota: dia.encuentros.promedio, icon: Activity,
      },
    ]
  }, [dia])

  const operatorios = useMemo(
    () => [...new Set(dia.appointments.map((a) => a.operatory))].sort(),
    [dia],
  )
  const turnos = dia.appointments.filter(
    (a) => salas.length === 0 || salas.includes(a.operatory),
  )
  const tareas = dia.tasks.filter((t) => tipos.length === 0 || tipos.includes(t.kind))

  /* "Today" sólo si la fecha elegida es de verdad hoy; si no, el día que sea. */
  const hoy = sameDay(date, new Date())
  const encabezado = date.toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
  const diaSemana = date.toLocaleDateString('en-US', { weekday: 'long' })

  return (
    <div className={CONTENEDOR_PAGINA}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-dash-blue text-sm">
            {hoy ? 'Today' : diaSemana} • {encabezado}
          </p>
          <PageTitle size="lg">Dashboard</PageTitle>
        </div>
        <div data-tour="dash-stats">
          <StatStrip stats={stats} />
        </div>
      </div>

      {/* La fecha manda sobre las tres columnas, así que vive acá arriba y no
          adentro de Appointments: metida en una de las tres, parecía filtrar
          sólo esa. */}
      <div className="mt-4 flex flex-wrap items-center gap-2" data-tour="dash-date">
        <DatePicker value={date} onChange={setDate} marked={diasConDatos} />
        {/* Volver a hoy sin tener que abrir el calendario y buscar el día.
            Desaparece cuando ya estás en hoy: no tendría nada que hacer. */}
        {!hoy && (
          <button
            onClick={() => setDate(new Date())}
            title="Go to today"
            className="flex h-9 items-center gap-1.5 rounded-md border border-line bg-white px-3 text-[13px] font-medium shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] transition-colors hover:bg-surface-subtle"
          >
            <CalendarClock className="size-4" /> Today
          </button>
        )}
        <span className="text-[12px] text-ink-muted">
          Appointments, waiting room and tasks follow this date.
        </span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Panel
          title="Appointments"
          controls={
            <BotonFiltro
              label="Filter appointments" options={operatorios}
              value={salas} onChange={setSalas}
            />
          }
        >
          {turnos.length === 0 ? (
            <EmptyState
              icon={CalendarDays}
              title="No appointments today"
              detail={
                salas.length > 0
                  ? 'No appointments match the selected operatories.'
                  : 'Your schedule is clear. Add an appointment or check pending requests.'
              }
              accion={{ label: 'New appointment', onClick: () => aviso.info('Use Scheduling to create an appointment.') }}
            />
          ) : (
            turnos.map((a, i) => (
              <AppointmentCard
                key={i} appt={a} id={\`appt-\${i}\`} activa={selected?.id === \`appt-\${i}\`}
                onSelect={pick}
                onEdit={(x) => editar(x, {
                  clave: claveFecha(date), panel: 'appointments',
                  index: dia.appointments.indexOf(a),
                })}
              />
            ))
          )}
        </Panel>

        <Panel title="Waiting Room">
          {dia.waiting.length === 0 ? (
            <EmptyState
              icon={Clock}
              title="Waiting room is empty"
              detail="No patients have checked in for this day yet."
            />
          ) : (
            dia.waiting.map((a, i) => (
              <AppointmentCard
                key={i} appt={a} id={\`wait-\${i}\`} activa={selected?.id === \`wait-\${i}\`}
                onSelect={pick}
                onEdit={(x) => editar(x, { clave: claveFecha(date), panel: 'waiting', index: i })}
              />
            ))
          )}
        </Panel>

        <Panel title="Rooms">
          {dia.rooms.map((r, i) => <OperatoryCard key={i} room={r} />)}
        </Panel>
      </div>

      <div className="mt-4">
        <Panel
          title="Pending Task"
          controls={
            <BotonFiltro
              label="Filter tasks" options={TASK_KINDS} value={tipos} onChange={setTipos}
            />
          }
        >
          {tareas.length === 0 ? (
            <EmptyState
              icon={Activity}
              title="Nothing pending"
              detail={
                dia.tasks.length === 0
                  ? 'There are no tasks waiting on this day.'
                  : 'No pending tasks match the selected types.'
              }
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tareas.map((t, i) => <PendingTaskCard key={i} task={t} />)}
            </div>
          )}
        </Panel>
      </div>

      {editando && (
        <NewAppointmentModal
          titulo="Edit Appointment"
          inicial={editando.datos}
          onGuardar={guardarEdicion}
          onClose={() => setEditando(null)}
        />
      )}

      {selected && (
        <PatientDetailsPopover
          name={selected.appt.name}
          initials={selected.appt.initials}
          anchor={selected.rect}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}

`})))()}var Or;function kr(){return(kr=e((()=>{Or=`import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen">
      <div className="relative w-2/5 overflow-hidden">
        <div className="auth-mesh absolute inset-0" />
      </div>

      <div className="bg-background flex flex-1 flex-col items-center justify-center px-8 py-12 lg:w-3/5 xl:w-2/3">
        <div className="w-full max-w-md">
          <div className="space-y-2">
            <div className="mb-3">
              <Avatar className="h-[60px] w-[60px]">
                <AvatarFallback>RD</AvatarFallback>
              </Avatar>
            </div>
            <h1 className="text-card-foreground text-3xl font-bold">Forgot your password?</h1>
            <p className="text-muted-foreground text-small">
              Enter your email and we&apos;ll send you a reset link
            </p>
          </div>

          <form
            className="mt-6 grid w-full grid-cols-1 items-center gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-12 gap-2">
              <Field id="email" label="Email" type="email" placeholder="Enter your email" />
            </div>
            <Button type="submit">Send reset link</Button>
          </form>

          <Link
            to="/login"
            className="text-muted-foreground hover:text-foreground mt-6 inline-flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="size-4" /> Back to login
          </Link>

          <div className="mt-12 text-center">
            <p className="text-xs text-gray-400">© 2025 ALL RIGHTS RESERVED | CONFIDENTALLY</p>
          </div>
        </div>
      </div>
    </div>
  )
}
`})))()}var Ar;function jr(){return(jr=e((()=>{Ar=`import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { MODULES, TOPICS, type ModuleId, type Topic } from '@/components/help/topics'
import { useHelp } from '@/components/help/HelpProvider'

function TopicCard({ topic, onOpen }: { topic: Topic; onOpen: () => void }) {
  return (
    <button
      type="button" onClick={onOpen}
      className="group flex w-full items-center gap-2 rounded-lg border border-line bg-white px-3 py-2.5 text-left hover:border-dash-blue"
    >
      <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-ink">{topic.title}</span>
      <ChevronRight className="group-hover:text-dash-blue size-3.5 shrink-0 text-ink-faint" />
    </button>
  )
}

export default function Help() {
  const { showOnScreen } = useHelp()
  const [abiertos, setAbiertos] = useState<ModuleId[]>(['dashboard'])
  const alternar = (id: ModuleId) => setAbiertos((p) => (p.includes(id) ? p.filter((m) => m !== id) : [...p, id]))

  return (
    <div className="px-4 py-6 sm:px-8">
      <h1 className="text-2xl font-bold text-ink">What can we help you with?</h1>
      <p className="mt-1 text-sm text-ink-muted">Pick a topic and we'll take you to the screen it lives on, and explain it there.</p>

      <div className="mt-5 flex flex-col gap-3">
        {MODULES.map((m) => {
          const temas = TOPICS.filter((t) => t.module === m.id)
          if (!temas.length) return null
          const Icon = m.icon
          const abierto = abiertos.includes(m.id)
          return (
            <div key={m.id} className="overflow-hidden rounded-xl border border-line bg-white">
              <button
                type="button" onClick={() => alternar(m.id)} aria-expanded={abierto}
                className="flex w-full items-center gap-2 px-4 py-3 text-left hover:bg-surface-subtle"
              >
                <span className="bg-dash-count-bg text-dash-blue flex size-7 shrink-0 items-center justify-center rounded-lg">
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-ink">{m.label}</span>
                  <span className="block truncate text-[11px] text-ink-faint">{m.blurb}</span>
                </span>
                <span className="ml-auto flex shrink-0 items-center gap-2">
                  <span className="text-[11px] text-ink-faint">{temas.length} {temas.length === 1 ? 'topic' : 'topics'}</span>
                  <ChevronDown className={\`size-3.5 text-ink-faint transition-transform \${abierto ? 'rotate-180' : ''}\`} />
                </span>
              </button>
              {abierto && (
                <div className="grid grid-cols-1 gap-2 border-t border-line p-3 sm:grid-cols-2 xl:grid-cols-3">
                  {temas.map((t) => (
                    <TopicCard key={t.id} topic={t} onOpen={() => showOnScreen(t.id)} />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
`})))()}var Mr;function Nr(){return(Nr=e((()=>{Mr=`import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, GalleryVerticalEnd, CalendarRange, Wallet, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Pill, type PillTone } from '@/components/ui/pill'
import { Panel } from '@/components/dashboard/primitives'
import { EVENTS, type ApptState } from '@/components/scheduling/calendar-data'
import { MOVIMIENTOS, conSaldo, moneda, GUARANTOR } from '@/data/ledger'
import { MANDIBULAR } from '@/data/odontogram'

/* Figma 3749:72258. Ver design-reference/figma/modulos/login.md.
   El panel de la izquierda lo pinta azul liso; acá lleva widgets propios con
   datos reales de la app (misma fuente que Scheduling/Ledger/Dental
   Assessment) en vez de una captura de pantalla -eso se probó y no convenció:
   se veía como una foto recortada, no como parte del producto-.

   Julián pidió volver a este camino (componentes armados a mano, no capturas)
   pero con "otro estilo": la primera versión tenía texto a 7-12px, ilegible.
   Acá los mismos datos van más grandes, con el componente Pill real de la
   app para los estados en vez de badges de un solo uso. */
const PITCH = [
  {
    lead: 'Your whole day,', acento: 'at a glance.',
    nota: 'Appointments, rooms and the waiting list together from the first coffee.',
    icon: CalendarRange,
  },
  {
    lead: 'Every charge,', acento: 'accounted for.',
    nota: 'Charges, insurance and payments running on one balance you can trust.',
    icon: Wallet,
  },
  {
    lead: 'Chart a tooth', acento: 'in one click.',
    nota: 'Findings land on the piece you are already looking at.',
    icon: Check,
  },
]

/* Fila compartida por Agenda y Ledger -mismo recorte: avatar/ícono + texto +
   etiqueta- para que las tres tarjetas se sientan una sola familia visual. */
function Fila({
  avatar, titulo, subtitulo, delay, children,
}: {
  avatar: React.ReactNode
  titulo: string
  subtitulo: string
  delay: number
  children?: React.ReactNode
}) {
  return (
    <div
      style={{ animationDelay: \`\${delay}ms\` }}
      className="motion-safe:animate-[login-fila_5.2s_ease-out_infinite] flex items-center gap-3 rounded-xl border border-line-soft px-3.5 py-3"
    >
      {avatar}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-bold text-ink">{titulo}</span>
        <span className="block truncate text-[11px] text-ink-faint">{subtitulo}</span>
      </span>
      {children}
    </div>
  )
}

const ESTADO_TONO: Record<ApptState, PillTone> = {
  Proposed: 'warning',
  'Check-in': 'success',
  Booked: 'info',
  'In progress': 'purple',
  Fulfilled: 'success',
  'No-show': 'neutral',
  Cancelled: 'neutral',
}

/** Turnos del día, salidos del mismo \`EVENTS\` que dibuja el calendario. Mismo
    \`Panel\` que usa el resto del sistema -no una tarjeta propia-, así el
    encabezado, el radio y la sombra son un componente y no una imitación. */
function PanelAgenda() {
  const filas = EVENTS.slice(0, 3)
  return (
    <Panel
      title="Today's Appointments"
      controls={<span className="text-dash-blue shrink-0 text-[12px] font-semibold">{EVENTS.length} today</span>}
      bodyClassName="gap-2"
    >
      {filas.map((e, i) => (
        <Fila
          key={e.patient}
          delay={i * 320}
          avatar={
            <span className="bg-dash-blue/10 text-dash-blue flex size-9 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold">
              {e.patient.split(' ').slice(0, 2).map((p) => p[0]).join('')}
            </span>
          }
          titulo={e.patient}
          subtitulo={\`\${e.room} · \${e.reason}\`}
        >
          <Pill tone={ESTADO_TONO[e.state]} size="sm" className="shrink-0">{e.state}</Pill>
        </Fila>
      ))}
    </Panel>
  )
}

/** Las últimas líneas del ledger, con el saldo que corre de verdad. */
function PanelLedger() {
  const filas = conSaldo(MOVIMIENTOS).slice(-3)
  const saldo = MOVIMIENTOS.reduce((a, m) => a + m.monto, 0)
  return (
    <Panel
      title="Ledger"
      controls={<span className="text-dash-blue shrink-0 truncate text-[12px] font-semibold">{GUARANTOR}</span>}
      bodyClassName="gap-2"
    >
      {filas.map((m, i) => (
        <Fila
          key={m.id}
          delay={i * 320}
          avatar={
            <span className="text-dash-blue flex size-9 shrink-0 items-center justify-center rounded-lg bg-info-bg text-[9px] font-bold">
              {m.codigo === '—' ? m.tipo.slice(0, 3).toUpperCase() : m.codigo}
            </span>
          }
          titulo={m.descripcion}
          subtitulo={m.provider}
        >
          <span className={cn('shrink-0 text-[12px] font-semibold tabular-nums', m.monto < 0 ? 'text-dash-ok-fg' : 'text-ink')}>
            {moneda(m.monto)}
          </span>
        </Fila>
      ))}
      <div className="mt-1 flex items-center justify-between rounded-xl bg-[#f6f8fc] px-3.5 py-3">
        <span className="text-[11px] text-ink-muted">Balance due</span>
        <span className="text-dash-blue text-[16px] leading-none font-extrabold tabular-nums">{moneda(saldo)}</span>
      </div>
    </Panel>
  )
}

/* Las piezas que el panel marca como cargadas. Fijas a propósito: es una
   vitrina, no el odontograma real. */
const CARGADAS = new Set([19, 30, 32])

/** La arcada inferior, llenándose diente por diente. */
function PanelOdontograma() {
  return (
    <Panel title="Dental Assessment" controls={<span className="text-dash-blue shrink-0 text-[12px] font-semibold">Mandibular</span>} bodyClassName="gap-3">
      <div className="flex justify-between gap-1">
        {MANDIBULAR.map((n, i) => (
          <span
            key={n}
            style={{ animationDelay: \`\${i * 90}ms\` }}
            className={cn(
              'motion-safe:animate-[login-diente_5.2s_ease-out_infinite] flex h-9 flex-1 items-end justify-center rounded-[6px] pb-1 text-[8px] font-bold',
              CARGADAS.has(n) ? 'bg-dash-blue text-white' : 'bg-surface-slate text-ink-faint',
            )}
          >
            {n}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {[
          { code: 'D2740', label: 'Crown – porcelain/ceramic', pieza: 'Tooth 19 · ML' },
          { code: 'D7240', label: 'Removal of impacted tooth', pieza: 'Tooth 32 · DL' },
        ].map((f, i) => (
          <Fila
            key={f.code}
            delay={1400 + i * 320}
            avatar={
              <span className="text-dash-blue flex size-9 shrink-0 items-center justify-center rounded-lg bg-info-bg text-[9px] font-bold">
                {f.code}
              </span>
            }
            titulo={f.label}
            subtitulo={f.pieza}
          />
        ))}
      </div>
    </Panel>
  )
}

const WIDGETS = [PanelAgenda, PanelLedger, PanelOdontograma]

export default function Login() {
  const navigate = useNavigate()
  const [verClave, setVerClave] = useState(false)
  const [email, setEmail] = useState('')
  const [clave, setClave] = useState('')
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % PITCH.length), 5200)
    return () => clearInterval(id)
  }, [])

  const activo = PITCH[slide]
  const Widget = WIDGETS[slide]

  return (
    <div className="flex min-h-svh bg-white">
      {/* Panel del Figma: azul de punta a punta. */}
      <div className="relative hidden w-[46%] shrink-0 flex-col items-center overflow-hidden bg-[linear-gradient(150deg,#1d56bc_0%,#2f74f5_45%,#0043c7_100%)] px-10 py-12 lg:flex">
        <span aria-hidden className="pointer-events-none absolute -top-24 -left-24 size-[420px] rounded-full bg-white/10 blur-3xl" />
        <span aria-hidden className="pointer-events-none absolute -right-32 -bottom-32 size-[420px] rounded-full bg-white/10 blur-3xl" />

        {/* 150px, no 120: a dos líneas de título (32px) más dos de bajada
            (13px) llegan a ~128px -con 120 el texto largo desbordaba el
            cuadro un poco distinto en cada slide, y por eso se veía
            "desalineado" al pasar de uno a otro. Con \`absolute inset-0\` los
            tres arrancan del mismo borde superior; lo único que cambiaba
            era cuánto se salían por abajo. */}
        <div className="relative h-[150px] w-full max-w-[420px] shrink-0 text-center">
          {PITCH.map((p, i) => (
            <div
              key={p.lead}
              className={cn(
                'absolute inset-0 transition-[opacity,transform] duration-700 ease-out',
                i === slide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
              )}
            >
              <p className="text-[32px] leading-[1.15] font-bold text-white">
                {p.lead}
                <br />
                <span className="text-white/70">{p.acento}</span>
              </p>
              <p className="mx-auto mt-3 max-w-[340px] text-[13px] leading-relaxed text-white/70">{p.nota}</p>
            </div>
          ))}
        </div>

        {/* flex-1 + items-center centra este bloque en el alto que sobra,
            que cambia según el widget (el odontograma es más alto que el
            ledger). La insignia va en un wrapper propio -relative, sin
            flex-1- que se ajusta al tamaño real del widget: antes colgaba
            directo de este contenedor externo, así que quedaba anclada a SU
            esquina -no a la de la tarjeta-, y con espacio de sobra arriba
            terminaba flotando cerca del título de arriba en vez de pegada
            a la tarjeta. */}
        <div className="flex w-full max-w-[360px] min-h-0 flex-1 items-center justify-center">
          <div key={slide} className="relative w-full motion-safe:animate-[login-fila_600ms_ease-out]">
            <Widget />
            <span className="text-dash-blue absolute -top-3 -left-3 flex size-9 items-center justify-center rounded-full bg-white shadow-[0_10px_24px_rgb(9_20_54/0.25)]">
              <activo.icon className="size-4" />
            </span>
          </div>
        </div>

        <div className="relative mt-4 flex shrink-0 items-center gap-1.5">
          {PITCH.map((p, i) => (
            <button
              key={p.lead}
              type="button"
              onClick={() => setSlide(i)}
              aria-label={\`Show \${p.acento}\`}
              className={cn('h-1 rounded-full transition-all duration-500', i === slide ? 'w-8 bg-white' : 'w-5 bg-white/35')}
            />
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-center overflow-y-auto px-6 py-10">
        <form
          onSubmit={(e) => { e.preventDefault(); navigate('/') }}
          className="flex w-full max-w-[392px] flex-col"
        >
          <span className="bg-dash-blue flex size-14 items-center justify-center rounded-full text-white shadow-[0_12px_28px_rgb(29_86_188/0.28)]">
            <GalleryVerticalEnd className="size-7" />
          </span>

          <h1 className="mt-5 text-[26px] leading-tight font-bold text-ink">Welcome! Red Dental Studio</h1>
          <p className="mt-1 text-[13px] text-ink-muted">Enter your credentials to access your account</p>

          <label className="mt-7 flex flex-col gap-2">
            <span className="text-xs font-medium text-ink">Email<span className="text-required">*</span></span>
            <span className="focus-within:border-dash-blue flex h-10 items-center gap-2.5 rounded-md border border-line bg-white px-3 shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] transition-colors">
              <Mail className="size-4 shrink-0 text-ink-faint" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="example@example.com"
                className="min-w-0 flex-1 bg-transparent text-[13px] placeholder:text-ink-faint focus:outline-none"
              />
            </span>
          </label>

          <label className="mt-5 flex flex-col gap-2">
            {/* El Figma pone "Forgot your password?" al lado del label y otra
                vez como link debajo del campo. Va una sola vez: dos accesos
                al mismo lugar, pegados, no son dos cosas distintas. */}
            <span className="flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-ink">Password<span className="text-required">*</span></span>
              <Link to="/forgot-password" className="text-dash-blue text-xs font-medium hover:underline">
                Forgot your password?
              </Link>
            </span>
            <span className="focus-within:border-dash-blue flex h-10 items-center gap-2.5 rounded-md border border-line bg-white px-3 shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] transition-colors">
              <Lock className="size-4 shrink-0 text-ink-faint" />
              <input
                type={verClave ? 'text' : 'password'}
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••"
                className="min-w-0 flex-1 bg-transparent text-[13px] placeholder:text-ink-faint focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setVerClave((v) => !v)}
                aria-label={verClave ? 'Hide password' : 'Show password'}
                className="shrink-0 text-ink-faint transition-colors hover:text-ink"
              >
                {verClave ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </span>
          </label>

          <button
            type="submit"
            className="bg-dash-blue hover:bg-dash-blue-hover mt-6 h-10 rounded-md text-[13px] font-semibold text-white transition-colors"
          >
            Login
          </button>

          <p className="mt-6 text-center text-[13px] text-ink-soft">
            Don&apos;t have an account?{' '}
            <Link to="/forgot-password" className="text-dash-blue font-semibold hover:underline">Sign up</Link>
          </p>

          <p className="mt-12 text-center text-[11px] tracking-wide text-ink-faint uppercase">
            © 2025 All rights reserved | Confidentally
          </p>
        </form>
      </div>
    </div>
  )
}
`})))()}var Pr;function Fr(){return(Fr=e((()=>{Pr=`import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="bg-page-background flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="text-[110px] leading-none font-bold text-slate-400">404</p>
      <h1 className="mt-2 text-2xl font-semibold text-slate-600">Oops! Page not found</h1>
      <p className="text-muted-foreground mt-3">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
      >
        Go to Homepage
      </Link>
    </div>
  )
}
`})))()}var Ir;function Lr(){return(Lr=e((()=>{Ir=`import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, ChevronDown, PersonStanding, Clipboard, Pill as PillIcon, ClipboardList, MapPin, Clock, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PatientSidePanel } from '@/components/patients/PatientSidePanel'
import { ClinicalPopover } from '@/components/patients/ClinicalPopover'
import { ClinicalItemModal } from '@/components/patients/ClinicalItemModal'
import { ITEMS_INICIALES, type Categoria, type ClinicalItem } from '@/data/clinicalItems'
import { aviso } from '@/components/ui/toaster'
import { PendingTaskCard, type PendingTask } from '@/components/dashboard/PendingTaskCard'
import { NewPatientModal } from '@/pages/patients/NewPatientModal'
import { EditContactModal } from '@/pages/patients/EditContactModal'
import { Pill, type PillTone } from '@/components/ui/pill'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'

/* Figma 3646:58836 "Patient Dashboard". */

const CLINICAL: { label: Categoria; icon: LucideIcon }[] = [
  { label: 'Allergies', icon: PersonStanding },
  { label: 'Medical Conditions', icon: Clipboard },
  { label: 'Medication', icon: PillIcon },
  { label: 'Past Surgery and Hospitalization', icon: ClipboardList },
]

const INSURANCE = [
  { order: 'Primary', carrier: 'AETNA', plan: 'Dental PPO', subscriber: 'Janet Johnson', relation: 'Child', period: 'Annual' },
  { order: 'Secondary', carrier: 'AETNA', plan: 'Dental PPO', subscriber: 'Janet Johnson', relation: 'Child', period: 'Annual' },
]

/* Mismos tonos que la tabla completa de Insurance (src/pages/patients/Insurance.tsx):
   el orden siempre en azul, la relación varía. */
const RELACION_TONO: Record<string, PillTone> = { Child: 'success', Self: 'info', Spouse: 'neutral' }

const TASKS: PendingTask[] = Array.from({ length: 6 }, () => ({
  kind: 'Referrals', state: 'Requested', person: 'Elena Marquez', initials: 'EM',
  register: 'March 17, 2025', expiration: 'March 15, 2025',
}))

type ApptStatus = 'Booked' | 'Cancelled' | 'Fulfilled' | 'No Show'
const APPT_STATUS: Record<ApptStatus, string> = {
  Booked: 'border-dash-busy-fg text-dash-busy-fg bg-dash-busy-bg',
  Cancelled: 'border-dash-bad-fg text-dash-bad-fg bg-dash-bad-bg',
  Fulfilled: 'border-dash-ok-fg text-dash-ok-fg bg-dash-ok-bg',
  'No Show': 'border-warn-fg text-warn-fg bg-warn-bg',
}
const APPTS: { status: ApptStatus; cancel?: boolean }[] = [
  { status: 'Booked', cancel: true }, { status: 'Cancelled' }, { status: 'Fulfilled' },
  { status: 'No Show' }, { status: 'No Show' }, { status: 'No Show' }, { status: 'No Show' },
]

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('rounded-lg border border-line bg-white', className)}>{children}</div>
}

export default function PatientDetail() {
  const { id = 'john-smith' } = useParams()
  const navigate = useNavigate()
  const [section, setSection] = useState('Overview')
  const [open, setOpen] = useState<{ label: Categoria; rect: DOMRect } | null>(null)
  /* Los cuatro bloques clínicos viven en estado local: alta, edición y
     borrado se ven al instante en el listado y en el contador de la card. */
  const [items, setItems] = useState(ITEMS_INICIALES)
  const [clinico, setClinico] = useState<{ cat: Categoria; item?: ClinicalItem } | null>(null)

  const guardarItem = (cat: Categoria) => (it: ClinicalItem) =>
    setItems((prev) => {
      const lista = prev[cat]
      const i = lista.findIndex((x) => x.id === it.id)
      return { ...prev, [cat]: i < 0 ? [...lista, it] : lista.map((x) => (x.id === it.id ? it : x)) }
    })

  const borrarItem = (cat: Categoria) => (it: ClinicalItem) => {
    const indice = items[cat].findIndex((x) => x.id === it.id)
    setItems((prev) => ({ ...prev, [cat]: prev[cat].filter((x) => x.id !== it.id) }))
    aviso.ok(\`\${it.name} was removed from \${cat}.\`, {
      label: 'Undo',
      onClick: () => setItems((prev) => ({
        ...prev,
        [cat]: [...prev[cat].slice(0, indice), it, ...prev[cat].slice(indice)],
      })),
    })
  }
  const [modal, setModal] = useState<'contact' | 'edit' | null>(null)
  const [taskTab, setTaskTab] = useState<'Pending Task' | 'Activity'>('Pending Task')
  const [apptTab, setApptTab] = useState<'Next' | 'Next Appointments'>('Next')

  return (
    <div className={CONTENEDOR_PAGINA}>

      {/* Único rastro de navegación que queda arriba: la vuelta a la tabla.
          El breadcrumb completo repetía lo que ya dice el panel lateral. */}
      <Link
        to="/patients"
        className="text-dash-blue mb-3 inline-flex items-center gap-1 text-sm hover:underline"
      >
        <ChevronLeft className="size-4" /> Patients
      </Link>
      <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-start">
        <PatientSidePanel
          name="John Smith"
          initials="JS"
          section={section}
          basePath={\`/patients/\${id}\`}
          onSection={setSection}
          /* El lápiz de General va a la página completa de edición
             (Figma 3640:72713, "Edit Patient (Full Page)"), no a un modal. */
          onEditGeneral={() => navigate('/patients/edit')}
          onEditContact={() => setModal('contact')}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <div className="grid gap-4 lg:grid-cols-2">
            {CLINICAL.map(({ label, icon: Icon }) => {
              const activa = open?.label === label
              return (
                <Card key={label} className={cn(activa && 'border-dash-blue bg-dash-blue')}>
                  <button
                    data-clinical-card
                    onClick={(e) => {
                      /* El rect se toma acá, no dentro del updater: para cuando
                         el updater corre, React ya anuló e.currentTarget. */
                      const rect = (e.currentTarget.closest('div') as HTMLElement).getBoundingClientRect()
                      setOpen((o) => (o?.label === label ? null : { label, rect }))
                    }}
                    aria-expanded={activa}
                    className="flex w-full items-center gap-2.5 px-4 py-3"
                  >
                    <Icon className={cn('size-4 shrink-0', activa ? 'text-white' : 'text-ink')} />
                    <span className={cn('truncate text-[13px] font-semibold', activa ? 'text-white' : 'text-ink')}>
                      {label}
                    </span>
                    <span
                      className={cn(
                        'flex size-5 shrink-0 items-center justify-center rounded text-[11px] font-medium',
                        activa ? 'text-dash-blue bg-[#eff6ff]' : 'bg-dash-count-bg text-dash-blue-hover',
                      )}
                    >
                      {items[label].length}
                    </span>
                    <ChevronDown
                      className={cn(
                        'ml-auto size-4 shrink-0 transition-transform',
                        activa ? 'rotate-180 text-white' : 'text-ink-muted',
                      )}
                    />
                  </button>
                </Card>
              )
            })}
          </div>

          <Card className="p-5">
            <h2 className="text-[15px] font-bold text-ink">Insurance</h2>
            <div className="mt-4 overflow-x-auto rounded-lg border border-line">
              <table className="w-full min-w-[720px] text-xs">
                <thead>
                  <tr className="border-b border-line bg-surface-alt text-[11px] text-ink-muted">
                    {['Order', 'Carrier', 'Plan', 'Subscriber', 'Relation', 'Coverage Period', 'Actions'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {INSURANCE.map((r) => (
                    <tr key={r.order} className="border-b border-line text-[13px] last:border-0">
                      <td className="px-4 py-4"><Pill tone="info">{r.order}</Pill></td>
                      <td className="px-4 py-4 text-ink-soft">{r.carrier}</td>
                      <td className="px-4 py-4 text-ink-soft">{r.plan}</td>
                      <td className="px-4 py-4 text-ink-soft">{r.subscriber}</td>
                      <td className="px-4 py-4"><Pill tone={RELACION_TONO[r.relation] ?? 'neutral'}>{r.relation}</Pill></td>
                      <td className="px-4 py-4 text-ink-soft">{r.period}</td>
                      <td className="px-4 py-4">
                        <RowActionsMenu label={\`\${r.order} insurance plan\`}>
                          <DropdownMenuItem asChild>
                            <Link to={\`/patients/\${id}/insurance\`}>View plan</Link>
                          </DropdownMenuItem>
                        </RowActionsMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-xs text-ink-muted">Showing 2 of 5 insurances</span>
                <div className="flex items-center gap-1">
                  {['‹', '1', '2', '3', '›'].map((p) => (
                    <span key={p} className={cn('flex size-7 items-center justify-center rounded-md text-xs font-semibold',
                      p === '1' ? 'bg-dash-blue text-white' : 'text-ink-muted')}>{p}</span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
            <Card className="p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[15px] font-bold text-ink">Pending Task</h2>
                <div className="flex rounded-md bg-surface-slate p-1">
                  {(['Pending Task', 'Activity'] as const).map((t) => (
                    <button key={t} onClick={() => setTaskTab(t)}
                      className={cn('rounded px-3 py-1 text-xs font-medium',
                        taskTab === t ? 'bg-dash-blue text-white' : 'text-ink-slate')}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4 grid gap-4 xl:grid-cols-2">
                {TASKS.map((t, i) => <PendingTaskCard key={i} task={t} />)}
              </div>
            </Card>

            <Card className="p-4">
              <h2 className="text-[15px] font-bold text-ink">Appointments</h2>
              <div className="mt-3 flex rounded-md bg-surface-slate p-1">
                {(['Next', 'Next Appointments'] as const).map((t) => (
                  <button key={t} onClick={() => setApptTab(t)}
                    className={cn('flex-1 truncate rounded px-1 py-1 text-xs font-medium',
                      apptTab === t ? 'bg-dash-blue text-white' : 'text-ink-slate')}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex flex-col gap-2">
                {APPTS.map((a, i) => (
                  <div key={i} className="border-dash-blue rounded-md border-l-[3px] bg-white p-2.5 shadow-[0_1px_2px_rgb(0_0_0/0.06)]">
                    <div className="flex items-start gap-2">
                      <span className="bg-dash-blue-hover flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white">av</span>
                      <span className="min-w-0 flex-1 truncate text-xs font-semibold text-ink">Maria Abril Viola</span>
                      <span className={cn('shrink-0 rounded-full border px-2 py-[2px] text-[11px] font-semibold', APPT_STATUS[a.status])}>{a.status}</span>
                    </div>
                    <p className="mt-1 truncate text-[11px] text-ink-muted">Routine cleaning appointment</p>
                    <p className="mt-1 flex items-center gap-1.5 text-[11px] text-ink-muted">
                      <Clock className="size-3 shrink-0" /> 12 Mar 2025 · 10:00 - 11:00 AM
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 truncate text-[11px] text-ink-muted">
                      <MapPin className="size-3 shrink-0" /> Los Angeles - 789 N Sunrise Street
                    </p>
                    {a.cancel && (
                      <button className="mt-2 ml-auto block rounded-md border border-line px-2.5 py-1 text-[11px] font-medium hover:bg-surface-subtle">
                        Cancel
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {open && (
        <ClinicalPopover
          title={open.label}
          anchor={open.rect}
          items={items[open.label]}
          onAdd={() => setClinico({ cat: open.label })}
          onEdit={(it) => setClinico({ cat: open.label, item: it })}
          onDelete={borrarItem(open.label)}
          onClose={() => setOpen(null)}
        />
      )}
      {clinico && (
        <ClinicalItemModal
          categoria={clinico.cat}
          item={clinico.item}
          onGuardar={guardarItem(clinico.cat)}
          onClose={() => setClinico(null)}
        />
      )}

      {modal === 'contact' && <EditContactModal onClose={() => setModal(null)} />}
      {modal === 'edit' && (
        <NewPatientModal title="Edit Patient" forceGuardian onClose={() => setModal(null)} />
      )}
    </div>
  )
}
`})))()}var Rr;function zr(){return(zr=e((()=>{Rr=`import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronRight, Search, Plus, CalendarDays, Users } from 'lucide-react'
import { PatientsTable, type PatientRow } from '@/components/patients/PatientsTable'
import { PatientCard } from '@/components/patients/PatientCard'
import { usePatients } from '@/data/patientsStore'
import { PageTitle } from '@/components/ui/page-title'
import { SearchButton } from '@/components/ui/search-button'
import { EmptyState } from '@/components/ui/empty-state'
import { NewPatientModal } from '@/pages/patients/NewPatientModal'
import { Panel } from '@/components/dashboard/primitives'
import { AppointmentCard } from '@/components/dashboard/AppointmentCard'
import { HOY_DEMO, datosDelDia } from '@/components/dashboard/dashboard-data'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'
import { cn } from '@/lib/utils'

/* Barra lateral junto a la tabla, no arriba: reemplaza al estante de
   "Active"/"Recent Patients" en grilla de la vuelta anterior. Mismos paneles
   que el Dashboard -Panel + AppointmentCard- para Today Appointments, así la
   card de turno es una sola en todo el sistema y no una versión propia acá,
   en su variante \`compact\` (sin los chips TR/CC ni Check Out).
   La altura de la barra la fija la tabla, no el contenido: se mide con
   ResizeObserver -mismo patrón que \`useAnchoVisible\` en ledger- y se publica
   como variable CSS; cada panel es \`flex-1\` con scroll propio adentro de esa
   altura, así ninguno de los tres bloques queda más alto que los otros. */
const CANTIDAD_TURNOS = 4
const CANTIDAD_PACIENTES = 4

/* Globo con el total -no el filtrado ni el visible- al lado del título del
   panel, mismo color que el de notificaciones de la campana. */
function Globo({ n }: { n: number }) {
  return (
    <span className="bg-dash-blue flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold text-white">
      {n}
    </span>
  )
}

/* "View all" en el header del panel, mismo lugar y estilo que "All treatment"
   en TreatmentPlanList. Se esconde solo si no hay nada de más para mostrar. */
function BotonVerTodos({
  total, cantidad, mostrando, onToggle,
}: {
  total: number
  cantidad: number
  mostrando: boolean
  onToggle: () => void
}) {
  if (total <= cantidad) return null
  return (
    <button
      type="button"
      onClick={onToggle}
      className="text-dash-blue flex shrink-0 items-center gap-0.5 text-[12px] font-semibold hover:underline"
    >
      {mostrando ? 'Show less' : 'View all'}
      <ChevronRight className={cn('size-3.5 transition-transform', mostrando && 'rotate-90')} />
    </button>
  )
}

/* Figma 3638:59529 "Patients — List".
   Los formatos de fecha mezclados ("April 2" / "Jan 15" / "June 2" / "Jun 3")
   y las iniciales en minúscula son del original y se dejan tal cual. */

export default function Patients() {
  const { patients } = usePatients()
  const [query, setQuery] = useState('')
  const [modal, setModal] = useState<'new' | null>(null)
  const [editando, setEditando] = useState<PatientRow | null>(null)
  const [buscarTurno, setBuscarTurno] = useState('')
  const [verTodosTurnos, setVerTodosTurnos] = useState(false)
  const [verTodosPacientes, setVerTodosPacientes] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const contenidoRef = useRef<HTMLDivElement>(null)

  /* La barra lateral no tiene alto propio: toma el de este bloque -búsqueda
     + tabla-, que es su hermano en la fila. La variable se publica en el
     padre común porque un hijo no ve el CSS custom property de su hermano. */
  useEffect(() => {
    const el = contenidoRef.current
    if (!el) return
    const medir = () => el.parentElement?.style.setProperty('--patients-alto', \`\${el.getBoundingClientRect().height}px\`)
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    window.addEventListener('resize', medir)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', medir)
    }
  }, [])

  const rows = useMemo(
    () => patients.filter((r) => r.name.toLowerCase().includes(query.toLowerCase())),
    [patients, query],
  )

  /* La barra lateral muestra siempre el mismo pulso de la cuenta: no se
     filtra por la búsqueda de la tabla, igual que las cards de resumen de
     Billing. "View all" saca el tope de a uno; buscar en Today Appointments
     también lo saca -no tendría sentido recortar un resultado que se buscó
     a propósito-. */
  const recientesVisibles = useMemo(
    () => (verTodosPacientes ? patients : patients.slice(0, CANTIDAD_PACIENTES)),
    [patients, verTodosPacientes],
  )
  const turnosHoyTodos = useMemo(() => datosDelDia(HOY_DEMO).appointments, [])
  const turnosFiltrados = useMemo(
    () => turnosHoyTodos.filter((a) => a.name.toLowerCase().includes(buscarTurno.toLowerCase())),
    [turnosHoyTodos, buscarTurno],
  )
  const buscandoTurno = buscarTurno.length > 0
  const turnosVisibles = buscandoTurno || verTodosTurnos
    ? turnosFiltrados
    : turnosFiltrados.slice(0, CANTIDAD_TURNOS)

  return (
    <div className={CONTENEDOR_PAGINA}>
      {/* Era un <button> sin acción. Ahora es el mismo link que en el
          resto de las pantallas del módulo. */}
      <Link to="/patients" className="flex items-center gap-1 self-start text-sm text-[#0056ef]">
        Patients <ChevronDown className="size-[15px]" />
      </Link>

      {/* Misma disposición que el resto de las listas: el botón principal va
          en la fila del título -antes quedaba abajo, al lado del buscador- y
          la búsqueda pasa a su propia fila. */}
      <div className="mt-[15px] flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-[9px]">
          <PageTitle>Patients</PageTitle>
          {/* Copy de locación en una pantalla de pacientes: es del Figma. */}
          <p className="text-xs leading-[17px] text-[#a3a3a3]">
            Set your location name. Add the location you need.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModal('new')}
          data-tour="pat-new"
          className="bg-dash-blue hover:bg-dash-blue-hover flex h-[33px] shrink-0 items-center justify-center gap-2 rounded-md px-5 text-[13px] font-medium text-white transition-colors"
        >
          <Plus className="size-3.5" /> New Patient
        </button>
      </div>

      <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-start">
        <div ref={contenidoRef} className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-[320px]" data-tour="pat-search">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by Name or Last Name"
                className="focus:border-dash-blue h-8 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] font-medium shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
              />
            </div>
            <SearchButton onClick={() => inputRef.current?.focus()} className="h-8" />
          </div>

          <div className="mt-4">
            {/* El nombre navega al dashboard del paciente; el kebab abre Edit. */}
            <PatientsTable rows={rows} onRowAction={setEditando} />
          </div>
        </div>

        {/* Al costado de la tabla, no arriba: mismo Panel que usa el Dashboard,
            para que la card de turno sea la misma en las dos pantallas. La
            altura tope sale de --patients-alto (ver el effect de arriba) y
            cada panel es flex-1 con scroll propio, así ninguno de los tres
            bloques le gana altura a los otros. Sin tope en mobile: ahí la
            barra va debajo de la tabla y puede ser tan alta como haga falta. */}
        <div className="flex w-full flex-col gap-4 lg:w-[336px] lg:shrink-0 lg:max-h-[var(--patients-alto,none)] lg:overflow-hidden">
          <Panel
            title={<>Today Appointments <Globo n={turnosHoyTodos.length} /></>}
            className="flex-1"
            bodyClassName="min-h-0 gap-2"
            controls={
              <BotonVerTodos
                total={turnosHoyTodos.length} cantidad={CANTIDAD_TURNOS}
                mostrando={verTodosTurnos} onToggle={() => setVerTodosTurnos((v) => !v)}
              />
            }
          >
            <div className="relative shrink-0">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-ink-faint" />
              <input
                value={buscarTurno}
                onChange={(e) => setBuscarTurno(e.target.value)}
                placeholder="Search today's appointments"
                className="focus:border-dash-blue h-8 w-full rounded-md border border-line bg-white pr-2 pl-8 text-[12px] placeholder:text-ink-faint focus:outline-none"
              />
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
              {turnosVisibles.length === 0 ? (
                <EmptyState
                  icon={CalendarDays}
                  title={buscandoTurno ? 'No matching appointments' : 'No appointments today'}
                  detail={buscandoTurno ? 'Try a different name.' : 'Your schedule is clear for today.'}
                  className="py-6"
                />
              ) : (
                turnosVisibles.map((a, i) => <AppointmentCard key={i} appt={a} compact />)
              )}
            </div>
          </Panel>

          <Panel
            title={<>Recent Patients <Globo n={patients.length} /></>}
            className="flex-1"
            bodyClassName="min-h-0 gap-3 overflow-y-auto"
            controls={
              <BotonVerTodos
                total={patients.length} cantidad={CANTIDAD_PACIENTES}
                mostrando={verTodosPacientes} onToggle={() => setVerTodosPacientes((v) => !v)}
              />
            }
          >
            {recientesVisibles.length === 0 ? (
              <EmptyState
                icon={Users}
                title="No patients yet"
                detail="New patients will show up here."
                className="py-6"
              />
            ) : (
              recientesVisibles.map((r) => <PatientCard key={r.id} row={r} onEdit={setEditando} />)
            )}
          </Panel>
        </div>
      </div>

      {modal === 'new' && <NewPatientModal onClose={() => setModal(null)} />}
      {/* Mismo formulario que New Patient (variante con guardián), otro título.
          Se le pasa la fila para que guarde sobre ese paciente. */}
      {editando && (
        <NewPatientModal
          title="Edit Patient"
          forceGuardian
          editId={editando.id}
          inicial={{
            first: editando.name.split(' ')[0] ?? '',
            last: editando.name.split(' ').slice(1).join(' '),
            email: editando.email,
            birthday: editando.birthday,
          }}
          onClose={() => setEditando(null)}
        />
      )}
    </div>
  )
}
`})))()}var Br;function Vr(){return(Vr=e((()=>{Br=`import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronLeft, ChevronRight, Plus, CalendarCheck, Inbox, MapPin, Clock } from 'lucide-react'
import { AppointmentDetailsDrawer } from '@/components/scheduling/AppointmentDetailsDrawer'
import { ViewFiltersPanel } from '@/components/scheduling/ViewFiltersPanel'
import { NewAppointmentModal } from '@/components/scheduling/NewAppointmentModal'
import {
  SOLICITUDES, datosDeSolicitud, fechaLegible, type Solicitud,
} from '@/components/scheduling/requests-data'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { PageTitle } from '@/components/ui/page-title'
import {
  EVENTOS_INICIALES, FECHA_ANCLA, MESES, BLOCK_STYLE,
  inicioDeSemana, sumarDias, type EventoConFecha, type ApptState,
} from '@/components/scheduling/calendar-data'
import { HORAS } from '@/components/scheduling/AppointmentSlotPicker'
import {
  VistaDia, VistaSemana, VistaMes, fmtExacta, type Vista,
} from '@/components/scheduling/CalendarViews'
import { StatusLegend } from '@/components/scheduling/StatusLegend'
import { EmptyState } from '@/components/ui/empty-state'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'


/* Interruptor de lo que está en el tablero pero todavía no se usa. En false
   el markup existe y no se renderiza; se prende cuando se defina el alcance. */
const PENDIENTES = false

export default function Scheduling() {
  /* En celular la vista semanal obliga a scrollear de costado para ver un
     día: arranca en Day, como Google Calendar. */
  const [view, setView] = useState<Vista>(
    () => (typeof window !== 'undefined' && window.innerWidth < 768 ? 'Day' : 'Week'),
  )
  const [fecha, setFecha] = useState(FECHA_ANCLA)
  const [reqTab, setReqTab] = useState<'ASAP' | 'Waiting List'>('ASAP')
  /* Arranca cerrado: el panel de solicitudes es el estado desplegado del FAB
     y aparecía solo al entrar a Scheduling. */
  const [reqOpen, setReqOpen] = useState(false)
  /* El detalle se queda con el turno entero: la hora y la fecha que muestra
     tienen que ser las del bloque que se clickeó, no un texto fijo. */
  const [detail, setDetail] = useState<{ ev: EventoConFecha; rect: DOMRect } | null>(null)
  const abrirDetalle = (e: EventoConFecha, el: HTMLElement) =>
    setDetail({ ev: e, rect: el.getBoundingClientRect() })
  const [panel, setPanel] = useState<'view' | 'new' | null>(null)
  /* Las solicitudes son estado: se agendan o se caen, y en los dos casos
     desaparecen de la lista. */
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>(SOLICITUDES)
  const [agendando, setAgendando] = useState<Solicitud | null>(null)

  /* Los turnos se pueden arrastrar a otro día y hora. El Figma no lo muestra
     —es un frame estático— pero es lo que se espera de un calendario. */
  const [eventos, setEventos] = useState<EventoConFecha[]>(EVENTOS_INICIALES)

  const mover = (i: number, nueva: Date, start?: number) => {
    setEventos((prev) =>
      prev.map((ev, j) => {
        if (j !== i) return ev
        const tope = 18 - ev.duration
        const hora = start === undefined ? ev.start : Math.min(Math.max(start, 8), tope)
        aviso.ok(
          \`\${ev.patient} moved to \${nueva.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, \${fmtExacta(hora)}.\`,
        )
        return { ...ev, fecha: nueva, start: hora }
      }),
    )
  }

  const visibles = solicitudes.filter((s) => s.tipo === reqTab)

  const cancelarSolicitud = (s: Solicitud) => {
    const indice = solicitudes.findIndex((x) => x.id === s.id)
    setSolicitudes((prev) => prev.filter((x) => x.id !== s.id))
    aviso.warn(\`Request for \${s.patient} was cancelled.\`, {
      label: 'Undo',
      onClick: () => setSolicitudes((prev) => [...prev.slice(0, indice), s, ...prev.slice(indice)]),
    })
  }

  /* Datos crudos del modal -> turno de la grilla. Compartido por "agendar una
     solicitud" y por "New appointment" suelto: los dos arman el mismo tipo de
     evento, sólo cambia qué pasa con la solicitud de origen (si hay una). */
  type DatosGuardado = { patient: string; date: string; start: string; end: string; status: string; primary?: string; operatory?: string; reason?: string }
  const construirEvento = (d: DatosGuardado): EventoConFecha => {
    const [dd, mm, yyyy] = d.date.split('-').map(Number)
    const dia = new Date(yyyy, mm - 1, dd)
    const desde = HORAS.indexOf(d.start)
    const hasta = HORAS.indexOf(d.end)
    const inicio = desde >= 0 ? Number(d.start.slice(0, 2)) : 9
    const duracion = desde >= 0 && hasta > desde ? hasta - desde : 1
    const estado = (d.status in BLOCK_STYLE ? d.status : 'Booked') as ApptState
    return {
      start: inicio, duration: duracion, patient: d.patient, state: estado, fecha: dia,
      provider: d.primary || 'Unassigned', room: d.operatory || 'Unassigned', reason: d.reason || 'Appointment',
    }
  }

  /* Agendar una solicitud la saca de la lista y la pone en la grilla. El turno
     puede caer en otro día que el que se está mirando: el sistema no cambia de
     pantalla solo, lo ofrece en el toast. */
  const agendarSolicitud = (s: Solicitud, d: DatosGuardado) => {
    const nuevo = construirEvento(d)
    setEventos((prev) => [...prev, nuevo])
    setSolicitudes((prev) => prev.filter((x) => x.id !== s.id))
    const rotulo = nuevo.fecha.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    aviso.ok(\`\${d.patient} scheduled for \${rotulo} at \${d.start}.\`, {
      label: \`Go to \${rotulo}\`,
      onClick: () => { setFecha(nuevo.fecha); setView('Day') },
    })
    return true
  }

  /* "New appointment" suelto -sin solicitud de origen-: mismo armado de
     evento, sin nada que sacar de la lista de espera. Antes no pasaba
     \`onGuardar\` acá y el modal sólo mostraba un toast sin tocar la grilla. */
  const crearTurno = (d: DatosGuardado) => {
    setEventos((prev) => [...prev, construirEvento(d)])
    return false
  }

  /* Las flechas y el rótulo siguen la vista, igual que en Google Calendar. */
  const paso = (n: number) => {
    setFecha((f) => {
      if (view === 'Day') return sumarDias(f, n)
      if (view === 'Week') return sumarDias(f, n * 7)
      return new Date(f.getFullYear(), f.getMonth() + n, 1)
    })
  }

  const rotulo = (() => {
    if (view === 'Day') {
      return fecha.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    }
    if (view === 'Week') {
      const a = inicioDeSemana(fecha)
      const b = sumarDias(a, 6)
      const mismoMes = a.getMonth() === b.getMonth()
      return \`\${MESES[a.getMonth()].slice(0, 3)} \${a.getDate()} – \${mismoMes ? '' : MESES[b.getMonth()].slice(0, 3) + ' '}\${b.getDate()}, \${b.getFullYear()}\`
    }
    return \`\${MESES[fecha.getMonth()]} \${fecha.getFullYear()}\`
  })()

  return (
    <div className={CONTENEDOR_PAGINA}>
      <Link to="/scheduling" className="flex items-center gap-1 text-sm text-[#0056ef]">
        Scheduling <ChevronDown className="size-[15px]" />
      </Link>
      <div className="mt-3">
        <PageTitle>Scheduling</PageTitle>
      </div>

      {/* Toolbar */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <button onClick={() => paso(-1)} className="rounded-md border border-line bg-white p-1.5" aria-label="Previous">
            <ChevronLeft className="size-4" />
          </button>
          <span className="text-[13px] font-semibold whitespace-nowrap text-ink">{rotulo}</span>
          <button onClick={() => setFecha(FECHA_ANCLA)} className="flex items-center gap-1 text-[13px] text-ink-muted">
            Today <ChevronDown className="size-3.5" />
          </button>
          <button onClick={() => paso(1)} className="rounded-md border border-line bg-white p-1.5" aria-label="Next">
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          {/* El Figma marca "Month" activo aunque la vista sea semanal. */}
          <div className="flex items-center gap-1">
            {(['Day', 'Week', 'Month'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  'h-8 rounded-md px-4 text-xs font-medium transition-colors',
                  view === v ? 'bg-dash-blue text-white' : 'text-ink-slate hover:text-ink-soft',
                )}
              >
                {v}
              </button>
            ))}
          </div>
          <div className="relative">
            <button
              data-view-trigger
              onClick={() => setPanel((p) => (p === 'view' ? null : 'view'))}
              aria-expanded={panel === 'view'}
              className="bg-dash-blue hover:bg-dash-blue-hover flex h-8 items-center gap-1.5 rounded-md px-4 text-xs font-medium text-white transition-colors"
            >
              View
              <ChevronDown className={cn('size-3.5 transition-transform', panel === 'view' && 'rotate-180')} />
            </button>
            {panel === 'view' && <ViewFiltersPanel onClose={() => setPanel(null)} />}
          </div>
          {/* Event y Register appointment quedan fuera de la barra hasta que se
              defina qué hacen. No se borran: el markup sigue acá detrás de
              PENDIENTES, así volver a mostrarlos es cambiar una constante y no
              rehacer los botones. Event nunca tuvo destino en el Figma;
              Register appointment abría el mismo modal que New appointment. */}
          {PENDIENTES && (
            <>
              <button
                onClick={() => aviso.info('Event scheduling is not available in this release.')}
                className="bg-dash-blue hover:bg-dash-blue-hover h-8 rounded-md px-4 text-xs font-medium text-white transition-colors"
              >
                Event
              </button>
              <button
                onClick={() => setPanel('new')}
                className="bg-dash-blue hover:bg-dash-blue-hover flex h-8 items-center gap-1.5 rounded-md px-4 text-xs font-medium text-white transition-colors"
              >
                <Plus className="size-3.5" /> Register appointment
              </button>
            </>
          )}
          <button
            onClick={() => setPanel('new')}
            data-tour="sched-new"
            className="bg-dash-blue hover:bg-dash-blue-hover flex h-8 items-center gap-1.5 rounded-md px-4 text-xs font-medium text-white transition-colors"
          >
            <Plus className="size-3.5" /> New appointment
          </button>
        </div>
      </div>

      {/* Leyenda: botón desplegable en vez de la franja a lo ancho. */}
      <div className="mt-4">
        <StatusLegend />
      </div>

      {/* Grilla: la misma agenda en tres vistas. */}
      {view === 'Day' && (
        <VistaDia eventos={eventos} fecha={fecha} onMover={mover} onAbrir={abrirDetalle} />
      )}
      {view === 'Week' && (
        <VistaSemana eventos={eventos} fecha={fecha} onMover={mover} onAbrir={abrirDetalle} />
      )}
      {view === 'Month' && (
        <VistaMes eventos={eventos} fecha={fecha} onMover={mover} onAbrir={abrirDetalle} />
      )}

      {/* Panel flotante de solicitudes + FAB */}
      {reqOpen && (
        <div className="motion-safe:animate-[fab-panel-in_180ms_cubic-bezier(0.16,1,0.3,1)] fixed right-[100px] bottom-8 z-30 flex max-h-[70svh] w-[260px] origin-bottom-right flex-col rounded-lg border border-line bg-white p-4 shadow-[0_4px_14px_0_rgb(100_100_100/0.25)]">
          <p className="text-[13px] font-bold text-ink">Appointment requests</p>
          <div className="mt-3 flex shrink-0 rounded-md bg-surface-slate p-1">
            {(['ASAP', 'Waiting List'] as const).map((t) => {
              const n = solicitudes.filter((s) => s.tipo === t).length
              return (
                <button
                  key={t}
                  onClick={() => setReqTab(t)}
                  className={cn(
                    'flex-1 rounded px-2 py-1 text-xs font-medium',
                    reqTab === t ? 'bg-dash-blue text-white' : 'text-ink-slate',
                  )}
                >
                  {t}{n > 0 && \` (\${n})\`}
                </button>
              )
            })}
          </div>

          {/* La lista scrollea sola: el panel está anclado al FAB y no puede
              crecer hasta tapar el calendario. */}
          <div className="-mr-1 mt-3 flex min-h-0 flex-col gap-2 overflow-y-auto pr-1">
            {visibles.length === 0 ? (
              <EmptyState
                icon={Inbox}
                title="No requests"
                detail={
                  reqTab === 'ASAP'
                    ? 'No one is waiting for the first available slot.'
                    : 'Nothing on the waiting list right now.'
                }
                className="py-6"
              />
            ) : (
              visibles.map((s) => (
                <SolicitudCard
                  key={s.id}
                  s={s}
                  onCancel={() => cancelarSolicitud(s)}
                  onSchedule={() => setAgendando(s)}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* Anillo del design system: 3px de stroke a 3px del botón. Se usa
          outline + outline-offset en vez de box-shadow para que el hueco sea
          transparente y deje ver el fondo, en lugar de pintarse de blanco. */}
      <button
        onClick={() => setReqOpen((v) => !v)}
        aria-label="Appointment requests"
        aria-pressed={reqOpen}
        className={cn(
          'bg-dash-blue fixed right-8 bottom-8 z-30 flex size-[60px] items-center justify-center',
          'rounded-full text-white transition-all outline-none',
          'hover:bg-dash-ring',
          'shadow-lg [outline-style:solid] outline-[3px] outline-offset-[3px] outline-transparent',
          'focus-visible:outline-[var(--color-dash-ring)]',
          reqOpen && 'outline-[var(--color-dash-ring)]',
        )}
      >
        <CalendarCheck className="size-6" />
      </button>

      {detail && (
        <AppointmentDetailsDrawer
          patient={detail.ev.patient}
          estado={detail.ev.state}
          hora={fmtExacta(detail.ev.start)}
          duracion={detail.ev.duration}
          fecha={detail.ev.fecha}
          provider={detail.ev.provider}
          room={detail.ev.room}
          reason={detail.ev.reason}
          anchor={detail.rect}
          onClose={() => setDetail(null)}
        />
      )}
      {panel === 'new' && <NewAppointmentModal onGuardar={crearTurno} onClose={() => setPanel(null)} />}
      {/* Agendar una solicitud es crear un turno, no editarlo: el modal es el
          mismo pero llega con lo que el paciente ya había pedido. */}
      {agendando && (
        <NewAppointmentModal
          inicial={datosDeSolicitud(agendando)}
          onGuardar={(d) => agendarSolicitud(agendando, d)}
          onClose={() => setAgendando(null)}
        />
      )}
    </div>
  )
}

/* Una solicitud tiene dos salidas y las dos están en la card. El acento rojo
   es sólo para ASAP: en la lista de espera nada es urgente por definición. */
function SolicitudCard({
  s, onCancel, onSchedule,
}: {
  s: Solicitud
  onCancel: () => void
  onSchedule: () => void
}) {
  const urgente = s.tipo === 'ASAP'
  const acento = urgente ? '#dc2626' : '#1d56bc'
  return (
    <div
      className="rounded-md border-l-[3px] bg-white p-2.5 shadow-[0_1px_3px_rgb(0_0_0/0.08)]"
      style={{ borderLeftColor: acento }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="flex min-w-0 items-center gap-1.5">
          <span className="size-1.5 shrink-0 rounded-full" style={{ backgroundColor: acento }} />
          <span className="truncate text-xs font-bold text-ink">{s.patient}</span>
        </span>
        {/* Misma pill que el resto del sistema: 11px y con aire vertical. El
            frame la dibujaba a 10px y sin padding, y quedaba aplastada al lado
            de las de Insurance o Treatment plans. */}
        <span
          className="shrink-0 rounded-full border px-2 py-[2px] text-[11px] font-semibold"
          style={{ borderColor: acento, color: acento }}
        >
          {urgente ? 'ASAP' : s.espera}
        </span>
      </div>
      <p className="mt-1 text-[11px] text-ink-muted">{s.reason}</p>
      <p className="mt-1 flex items-center gap-1.5 text-[11px] text-ink-muted">
        <Clock className="size-3 shrink-0" /> {fechaLegible(s.date)} · {s.start} - {s.end}
      </p>
      <p className="mt-0.5 flex items-center gap-1.5 truncate text-[11px] text-ink-muted">
        <MapPin className="size-3 shrink-0" /> {s.location}
      </p>
      {/* Cancel y la acción principal, uno al lado del otro. */}
      <div className="mt-2 flex items-center justify-end gap-2">
        <button
          onClick={onCancel}
          className="rounded-md border border-line px-2.5 py-1 text-[11px] font-medium hover:bg-surface-subtle"
        >
          Cancel
        </button>
        <button
          onClick={onSchedule}
          className="bg-dash-blue hover:bg-dash-blue-hover rounded-md px-2.5 py-1 text-[11px] font-semibold text-white transition-colors"
        >
          Schedule
        </button>
      </div>
    </div>
  )
}
`})))()}var Hr;function Ur(){return(Ur=e((()=>{Hr=`import { Outlet, useLocation, Link } from 'react-router-dom'
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
import { LOCACIONES } from '@/pages/settings/Locations'
import { EMPLEADOS } from '@/data/employees'
import { CUENTAS } from '@/pages/settings/Accounts'

const ICONS: Record<string, LucideIcon> = {
  'user-cog': UserCog, building: Building2, users: Users, 'shield-check': ShieldCheck,
  sliders: SlidersHorizontal, 'credit-card': CreditCard, library: Library,
  'circle-user': CircleUser, lock: Lock, 'file-signature': FileSignature,
}


/* El rastro se arma de la ruta, no lo escribe cada pantalla: así hay uno solo
   —el problema anterior eran dos— y siempre incluye la vuelta a General, que
   de otro modo obliga a abrir el menú flotante del rail. */
function migasDe(pathname: string): Miga[] {
  if (pathname === '/settings/general') return []
  const migas: Miga[] = [{ label: 'Settings', to: '/settings/general' }]

  const item = SETTINGS_NAV.find(
    (n) => pathname === n.to || pathname.startsWith(\`\${n.to}/\`),
  )
  if (item) {
    const hoja = pathname === item.to
    migas.push({ label: item.label, to: hoja ? undefined : item.to })
    const hijo = item.children?.find((c) => pathname.startsWith(c.to))
    if (hijo) migas.push({ label: hijo.label })
  }

  /* El detalle de una locación o de un empleado no está en el menú: su
     nombre es el último tramo y sale del id de la ruta. "new" no es un id de
     locación real -por eso va antes, si no el fallback de abajo mostraría
     "new" como si fuera el nombre de una locación inexistente-. */
  if (pathname === '/settings/locations/new') {
    migas.push({ label: 'New Location' })
  } else {
    const detalleLoc = pathname.match(/^\\/settings\\/locations\\/([^/]+)$/)
    if (detalleLoc) {
      const loc = LOCACIONES.find((l) => l.id === detalleLoc[1])
      migas.push({ label: loc?.nombre ?? detalleLoc[1] })
    }
  }
  if (pathname === '/settings/team/new') {
    migas.push({ label: 'New Employee' })
  } else {
    const detalleEmpleado = pathname.match(/^\\/settings\\/team\\/([^/]+)$/)
    if (detalleEmpleado) {
      const emp = EMPLEADOS.find((e) => e.id === detalleEmpleado[1])
      migas.push({ label: emp?.nombre ?? detalleEmpleado[1] })
    }
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
  const migas = migasDe(pathname)
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
      <h1 className="text-4xl font-bold">Settings</h1>
      <p className="text-muted-foreground mt-2">Configure and manage your workspace preferences.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {SETTINGS_SECTIONS.map((s) => {
          const Icon = ICONS[s.icon] ?? SlidersHorizontal
          return (
            <Link key={s.to} to={s.to}>
              <Card className="hover:border-primary/40 h-full p-6 transition-colors">
                <span className="bg-accent text-primary flex size-11 items-center justify-center rounded-lg">
                  <Icon className="size-5" />
                </span>
                <h2 className="mt-4 text-lg font-bold">{s.title}</h2>
                <p className="text-muted-foreground mt-1 text-sm">{s.desc}</p>
              </Card>
            </Link>
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
      <h1 className="text-2xl font-bold text-ink">{label}</h1>
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
`})))()}var Wr;function Gr(){return(Gr=e((()=>{Wr=`import { Link } from 'react-router-dom'

/* Compartida por /billing, /message, /contacts y /documents. */
export default function UnderConstruction() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center px-6 py-20 text-center">
      <svg viewBox="0 0 460 165" className="w-[450px] max-w-full" role="img" aria-label="Teeth with braces">
        <defs>
          <linearGradient id="gum" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(214 95% 93%)" />
            <stop offset="55%" stopColor="hsl(218 73% 62%)" />
            <stop offset="100%" stopColor="hsl(218 73% 45%)" />
          </linearGradient>
        </defs>

        {/* encía: va detrás, las raíces se ven blancas encima */}
        <path
          d="M0 86 Q29 66 58 86 Q87 106 116 86 Q145 66 174 86 Q203 106 232 86 Q261 66 290 86 Q319 106 348 86 Q377 66 406 86 Q435 106 460 88 L460 165 L0 165 Z"
          fill="url(#gum)"
        />

        <g key="0">
          {/* corona */}
          <path d="M6 30 C6 11 24 3 50 3 C76 3 94 11 94 30 L94 74 L6 74 Z" fill="#fff" />
          {/* raíces */}
          <path d="M12 72 L28 124 Q33 133 38 124 L48 72 Z" fill="#fff" />
          <path d="M52 72 L62 124 Q67 133 72 124 L88 72 Z" fill="#fff" />
          {/* bracket */}
          <rect x="37" y="36" width="26" height="15" rx="5" fill="hsl(0 0% 80%)" />
        </g>
        <g key="1">
          {/* corona */}
          <path d="M96 30 C96 11 114 3 140 3 C166 3 184 11 184 30 L184 74 L96 74 Z" fill="#fff" />
          {/* raíces */}
          <path d="M102 72 L118 124 Q123 133 128 124 L138 72 Z" fill="#fff" />
          <path d="M142 72 L152 124 Q157 133 162 124 L178 72 Z" fill="#fff" />
          {/* bracket */}
          <rect x="127" y="36" width="26" height="15" rx="5" fill="hsl(0 0% 80%)" />
        </g>
        <g key="2">
          {/* corona */}
          <path d="M186 30 C186 11 204 3 230 3 C256 3 274 11 274 30 L274 74 L186 74 Z" fill="#fff" />
          {/* raíces */}
          <path d="M192 72 L208 124 Q213 133 218 124 L228 72 Z" fill="#fff" />
          <path d="M232 72 L242 124 Q247 133 252 124 L268 72 Z" fill="#fff" />
          {/* bracket */}
          <rect x="217" y="36" width="26" height="15" rx="5" fill="hsl(0 0% 80%)" />
        </g>
        <g key="3">
          {/* corona */}
          <path d="M276 30 C276 11 294 3 320 3 C346 3 364 11 364 30 L364 74 L276 74 Z" fill="#fff" />
          {/* raíces */}
          <path d="M282 72 L298 124 Q303 133 308 124 L318 72 Z" fill="#fff" />
          <path d="M322 72 L332 124 Q337 133 342 124 L358 72 Z" fill="#fff" />
          {/* bracket */}
          <rect x="307" y="36" width="26" height="15" rx="5" fill="hsl(0 0% 80%)" />
        </g>
        <g key="4">
          {/* corona */}
          <path d="M366 30 C366 11 384 3 410 3 C436 3 454 11 454 30 L454 74 L366 74 Z" fill="#fff" />
          {/* raíces */}
          <path d="M372 72 L388 124 Q393 133 398 124 L408 72 Z" fill="#fff" />
          <path d="M412 72 L422 124 Q427 133 432 124 L448 72 Z" fill="#fff" />
          {/* bracket */}
          <rect x="397" y="36" width="26" height="15" rx="5" fill="hsl(0 0% 80%)" />
        </g>

        {/* arco del aparato */}
        <line x1="10" y1="43" x2="450" y2="43" stroke="hsl(0 0% 80%)" strokeWidth="3.5" />
      </svg>

      <h1 className="text-primary mt-10 text-2xl font-bold">Page under construction</h1>
      <p className="text-muted-foreground mt-4 max-w-sm">
        We apologize and are working to resolve the problem. Please try again later.
      </p>
      <Link
        to="/"
        className="bg-primary text-primary-foreground hover:bg-primary-hover mt-6 rounded-full px-6 py-2.5 text-sm font-medium"
      >
        Go to Homepage
      </Link>
    </div>
  )
}
`})))()}var Kr;function qr(){return(qr=e((()=>{Kr=`import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PageTitle } from '@/components/ui/page-title'
import { PatientSidePanel } from '@/components/patients/PatientSidePanel'
import {
  TextField, SelectField, FieldLabel, FieldError, OptionCheckbox, FormFooter,
} from '@/components/patients/form'
import { aviso } from '@/components/ui/toaster'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'

/* Figma 3716:61372 (buscar), 3716:62815 (persona existente elegida) y
   3716:63601 (persona nueva). No son tres pantallas distintas: son estados
   del mismo formulario, que reemplaza el contenido de la página — no es un
   modal. Cancel/Save van fuera de la card.

   Los textos se replican tal cual, incluido "Adress". Ver
   modulos/relationships.md, anomalías 37 a 41. */

export type PersonaDirectorio = {
  name: string
  initials: string
  dob: string
  email: string
}

export const DIRECTORIO: PersonaDirectorio[] = [
  { name: 'Michael Miller', initials: 'MM', dob: 'May 14, 1982', email: 'mm.thompson@yahoo.com' },
  { name: 'Jessica Miller', initials: 'JM', dob: 'May 14, 1982', email: 'jessica.miller@gmail.com' },
  { name: 'Robert Miller', initials: 'RM', dob: 'March 2, 1979', email: 'rob.miller@outlook.com' },
]

/* Card de persona del Figma: borde azul, avatar cuadrado y tres líneas. */
export function PersonaSeleccionada({ p }: { p: PersonaDirectorio }) {
  return (
    <div className="border-dash-blue flex items-center gap-3 rounded-lg border bg-white p-3">
      <span className="bg-dash-blue flex size-9 shrink-0 items-center justify-center rounded-md text-xs font-semibold text-white">
        {p.initials}
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block text-[13px] font-semibold text-ink">{p.name}</span>
        <span className="block text-[11px] text-ink-muted">
          <span className="text-ink-faint">DOB:</span> {p.dob}
        </span>
        <span className="block text-[11px] text-ink-muted">
          <span className="text-ink-faint">Email:</span> {p.email}
        </span>
      </span>
    </div>
  )
}

const VACIO = {
  country: '', number: '', email: '',
  linea1: '', linea2: '', paisDir: '', region: '', ciudad: '', postal: '',
  rel: '',
}

export default function AddRelationship() {
  const { id = 'john-smith' } = useParams()
  const navigate = useNavigate()
  const volver = () => navigate(\`/patients/\${id}/relationships\`)

  const [q, setQ] = useState('')
  const [persona, setPersona] = useState<PersonaDirectorio | null>(null)
  const [nueva, setNueva] = useState(false)
  const [direccion, setDireccion] = useState(0)
  const [d, setD] = useState(VACIO)
  const [intentado, setIntentado] = useState(false)
  const set = (k: keyof typeof VACIO) => (v: string) => setD((p) => ({ ...p, [k]: v }))

  const resultados = useMemo(
    () => (q.trim() && !persona
      ? DIRECTORIO.filter((p) => p.name.toLowerCase().includes(q.trim().toLowerCase()))
      : []),
    [q, persona],
  )

  /* El formulario largo aparece con una persona elegida o al crear una nueva:
     es lo que separa el estado 3716:61372 de los otros dos. */
  const formulario = !!persona || nueva
  const req = (v: string) => (intentado && !v.trim() ? 'This field is required.' : undefined)
  const sinPersona = intentado && !formulario

  const obligatorios: (keyof typeof VACIO)[] = formulario
    ? ['country', 'number', 'email', 'linea1', 'linea2', 'paisDir', 'region', 'ciudad', 'postal', 'rel']
    : ['rel']

  const guardar = () => {
    setIntentado(true)
    if (!formulario || obligatorios.some((k) => !d[k].trim())) return
    aviso.ok(
      persona
        ? \`\${persona.name} was added as \${d.rel}.\`
        : \`New contact added as \${d.rel}.\`,
    )
    volver()
  }

  return (
    <div className={CONTENEDOR_PAGINA}>

      {/* Único rastro de navegación que queda arriba: la vuelta a la tabla.
          El breadcrumb completo repetía lo que ya dice el panel lateral. */}
      <Link
        to="/patients"
        className="text-dash-blue mb-3 inline-flex items-center gap-1 text-sm hover:underline"
      >
        <ChevronLeft className="size-4" /> Patients
      </Link>
      <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-start">
        <PatientSidePanel
          name="John Smith" initials="JS" section="Relationships & Billing"
          basePath={\`/patients/\${id}\`} 
        />

        <div className="min-w-0 flex-1">
          <PageTitle>Add Relationship</PageTitle>

          <div className="mt-4 rounded-lg border border-line bg-white p-6">
            <h2 className="text-sm font-bold text-ink">Find or create person</h2>

            <div className="mt-4 grid items-start gap-x-5 gap-y-4 lg:grid-cols-2">
              <div className="flex flex-col gap-2">
                <FieldLabel>Select Person</FieldLabel>
                <div className="relative">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
                  <input
                    value={q}
                    onChange={(e) => { setQ(e.target.value); setPersona(null) }}
                    placeholder="Search..."
                    aria-invalid={sinPersona || undefined}
                    className={cn(
                      'h-9 w-full rounded-md border bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)]',
                      'placeholder:text-ink-faint focus:outline-none',
                      sinPersona ? 'border-field-error' : 'focus:border-dash-blue border-line',
                    )}
                  />
                </div>
                <FieldError>
                  {sinPersona ? 'Select a person or tick the option to create a new one.' : undefined}
                </FieldError>

                {resultados.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => { setPersona(p); setQ(p.name); setNueva(false) }}
                    className="flex items-center gap-3 rounded-lg border border-line bg-white p-3 text-left hover:bg-surface-subtle"
                  >
                    <span className="bg-dash-blue flex size-9 shrink-0 items-center justify-center rounded-md text-xs font-semibold text-white">
                      {p.initials}
                    </span>
                    <span className="min-w-0 leading-tight">
                      <span className="block text-[13px] font-semibold text-ink">{p.name}</span>
                      <span className="block text-[11px] text-ink-muted">DOB: {p.dob}</span>
                    </span>
                  </button>
                ))}
                {persona && <PersonaSeleccionada p={persona} />}
              </div>

              {/* La card de la derecha arranca a la altura del input, no del label. */}
              <div className="flex flex-col gap-2">
                <span aria-hidden className="hidden h-[18px] lg:block" />
                <OptionCheckbox
                  label="Add New Person"
                  checked={nueva}
                  onChange={(v) => { setNueva(v); if (v) { setPersona(null); setQ('') } }}
                />
              </div>
            </div>

            {formulario && (
              <>
                <h3 className="mt-6 text-sm font-bold text-ink">General Information</h3>
                <div className="mt-4 grid gap-x-5 gap-y-4 lg:grid-cols-2">
                  <SelectField label="Country" required value={d.country} onChange={set('country')} error={req(d.country)} />
                  <TextField label="Number" required placeholder="408-XXX-XXXX" value={d.number} onChange={set('number')} error={req(d.number)} />
                </div>
                <TextField
                  className="mt-4" label="Email" required placeholder="Placeholder@gmail.com"
                  value={d.email} onChange={set('email')} error={req(d.email)}
                />

                {/* "Adress" sin doble D y las dos líneas como select: los dos
                    salen del Figma. Anomalías 37 y 38. */}
                <h3 className="mt-6 text-sm font-bold text-ink">Adress Information</h3>
                <div className="mt-4 grid gap-x-5 gap-y-4 lg:grid-cols-2">
                  <SelectField label="Adress line 1" required options={['123 Maple Street', '456 Oak Avenue', '789 Pine Road']} value={d.linea1} onChange={set('linea1')} error={req(d.linea1)} />
                  <SelectField label="Adress line 2" required options={['Apt 2B', 'Suite 300', 'Floor 4']} value={d.linea2} onChange={set('linea2')} error={req(d.linea2)} />
                  <SelectField label="Country" required value={d.paisDir} onChange={set('paisDir')} error={req(d.paisDir)} />
                  <SelectField label="Region" required options={['Arizona', 'California', 'Florida', 'New York']} value={d.region} onChange={set('region')} error={req(d.region)} />
                  <SelectField label="City" required options={['Phoenix', 'Los Angeles', 'Miami', 'New York']} value={d.ciudad} onChange={set('ciudad')} error={req(d.ciudad)} />
                  <TextField label="Postal Code" required placeholder="5678" value={d.postal} onChange={set('postal')} error={req(d.postal)} />
                </div>
              </>
            )}

            <h3 className="mt-6 text-sm font-bold text-ink">Assign relationship role</h3>
            <div className="mt-4 flex flex-col gap-2">
              <FieldLabel required>Role</FieldLabel>
              <div className="grid gap-x-5 gap-y-4 lg:grid-cols-2">
                <OptionCheckbox label="Guardian" />
                <OptionCheckbox label="Guarantor" />
              </div>
            </div>

            {formulario && (
              <div className="mt-4 flex flex-col gap-2">
                <FieldLabel required>Direction</FieldLabel>
                <div className="grid gap-x-5 gap-y-4 lg:grid-cols-2">
                  {[
                    \`\${persona?.name ?? 'Michael Miller'} is Guardian for John Smith.\`,
                    \`John Smith is Guardian of \${persona?.name ?? 'Michael Miller'}.\`,
                  ].map((txt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setDireccion(i)}
                      className={cn(
                        'flex h-11 items-center gap-3 rounded-lg border bg-white px-3 text-left text-[13px] text-ink',
                        direccion === i ? 'border-dash-blue' : 'border-line hover:bg-surface-subtle',
                      )}
                    >
                      <span
                        className={cn(
                          'flex size-4 shrink-0 items-center justify-center rounded-full border-2',
                          direccion === i ? 'border-dash-blue' : 'border-ink-faint',
                        )}
                      >
                        {direccion === i && <span className="bg-dash-blue size-[7px] rounded-full" />}
                      </span>
                      {txt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 grid gap-x-5 lg:grid-cols-2">
              <SelectField
                label="Relationship to Patient" required
                options={['Parent', 'Guardian', 'Sibling', 'Spouse', 'Child', 'Other']}
                value={d.rel} onChange={set('rel')} error={req(d.rel)}
              />
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <FormFooter onCancel={volver} onSave={guardar} />
          </div>
        </div>
      </div>
    </div>
  )
}
`})))()}var Jr;function Yr(){return(Yr=e((()=>{Jr=`import { useMemo, useState } from 'react'
import { Pagination } from '@/components/patients/ledger/Pagination'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, Search, Download, FileText } from 'lucide-react'
import { aviso } from '@/components/ui/toaster'
import { PageTitle } from '@/components/ui/page-title'
import { PatientSidePanel } from '@/components/patients/PatientSidePanel'
import { Pill, type PillTone } from '@/components/ui/pill'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'

/* Figma 3753:80195 "Patient Profile — Documents". */

type Doc = { name: string; firma: 'Signed' | 'Pending Signature'; fecha: string }

const DOCS: Doc[] = [
  ...Array.from({ length: 9 }, () => ({ name: 'Isacc Cihtepin.doc', firma: 'Signed' as const, fecha: 'Aug 5, 2026' })),
  { name: 'Isacc Cihtepin.doc', firma: 'Pending Signature', fecha: 'Jul 28, 2026' },
  { name: 'Isacc Cihtepin.doc', firma: 'Pending Signature', fecha: 'Jul 28, 2026' },
  { name: 'Isacc Cihtepin.doc', firma: 'Signed', fecha: 'Aug 1, 2026' },
]

const FIRMA_TONO: Record<Doc['firma'], PillTone> = {
  Signed: 'success',
  'Pending Signature': 'warning',
}

export default function Documents() {
  const { id = 'john-smith' } = useParams()
  const [q, setQ] = useState('')
  const [sel, setSel] = useState<number[]>([])

  const [pagina, setPagina] = useState(1)
  const filas = useMemo(
    () => DOCS.filter((d) => d.name.toLowerCase().includes(q.toLowerCase())),
    [q],
  )
  const TAM_PAGINA = 8
  const paginas = Math.max(1, Math.ceil(filas.length / TAM_PAGINA))
  const paginaActual = Math.min(pagina, paginas)
  const filasPagina = filas.slice((paginaActual - 1) * TAM_PAGINA, paginaActual * TAM_PAGINA)
  const todas = sel.length === filas.length && filas.length > 0

  return (
    <div className={CONTENEDOR_PAGINA}>

      {/* Único rastro de navegación que queda arriba: la vuelta a la tabla.
          El breadcrumb completo repetía lo que ya dice el panel lateral. */}
      <Link
        to="/patients"
        className="text-dash-blue mb-3 inline-flex items-center gap-1 text-sm hover:underline"
      >
        <ChevronLeft className="size-4" /> Patients
      </Link>
      <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-start">
        <PatientSidePanel
          name="John Smith"
          initials="JS"
          section="Documents"
          basePath={\`/patients/\${id}\`}
        />

        <div className="min-w-0 flex-1">
          <PageTitle>Documents Manager</PageTitle>

          <div className="mt-4 flex items-center gap-3">
            <div className="relative w-[265px]">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search documents"
                className="focus:border-dash-blue h-8 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
              />
            </div>
            <button
              onClick={() =>
                sel.length
                  ? aviso.ok(\`\${sel.length} document\${sel.length > 1 ? 's' : ''} downloaded.\`)
                  : aviso.warn('Select at least one document to download.')
              }
              aria-label="Download selected"
              className="ml-auto flex size-8 items-center justify-center rounded-md border border-line bg-white shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] hover:bg-surface-subtle"
            >
              <Download className="size-4" />
            </button>
          </div>

          <div className="mt-3 w-full overflow-x-auto rounded-lg border border-line-row bg-white">
            <div className="min-w-[620px]">
            <div className="flex items-center bg-surface-alt px-3 py-3 text-[11px] font-semibold text-ink-muted">
              <span className="w-10">
                <input
                  type="checkbox"
                  aria-label="Select all"
                  checked={todas}
                  onChange={() => setSel(todas ? [] : filas.map((_, i) => i))}
                />
              </span>
              <span className="flex-1">Name</span>
              <span className="w-[200px]">Signature</span>
              <span className="w-[140px] text-right">Last Update</span>
            </div>

            {filasPagina.map((d, i) => (
              <div key={i} className="flex items-center border-t border-line-row px-3 py-3 text-[13px] text-ink-soft">
                <span className="w-10">
                  <input
                    type="checkbox"
                    aria-label={\`Select \${d.name}\`}
                    checked={sel.includes(i)}
                    onChange={() =>
                      setSel((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]))
                    }
                  />
                </span>
                <span className="flex flex-1 items-center gap-3">
                  <span className="bg-dash-blue flex size-7 shrink-0 items-center justify-center rounded text-white">
                    <FileText className="size-4" />
                  </span>
                  <span className="truncate text-ink-medium">{d.name}</span>
                </span>
                <span className="w-[200px]">
                  <Pill tone={FIRMA_TONO[d.firma]}>{d.firma}</Pill>
                </span>
                <span className="w-[140px] text-right text-ink-medium">{d.fecha}</span>
              </div>
            ))}

            {/* El Figma dice "Showing 3 of 15 referrals" en una tabla de
                documentos -reusa el componente de referrals-. El contador
                ahora cuenta documentos de verdad y el paginado funciona: los
                botones dibujados no tenían onClick. */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-row px-3 py-3">
              <span className="text-xs font-semibold text-ink-muted">
                Showing {filasPagina.length} of {filas.length} documents
              </span>
              <Pagination pagina={paginaActual} paginas={paginas} onChange={setPagina} />
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
`})))()}var Xr;function Zr(){return(Zr=e((()=>{Xr=`import { ModalShell, SectionCard, TextField, SelectField, FormFooter } from '@/components/patients/form'
import { aviso } from '@/components/ui/toaster'

/* Figma 3640:74270 → form 3640:75931 (860×521). */
export function EditContactModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell title="Edit Contact" onClose={onClose} footer={<FormFooter onCancel={onClose} onSave={() => { aviso.ok('Contact information saved.'); onClose() }} />}>
      <div className="grid gap-7 lg:grid-cols-2">
        <SectionCard title="Contact Information">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Area Code" placeholder="+1" />
            <TextField label="Phone Number" placeholder="(555) 123-4567" />
          </div>
          <TextField label="Email" placeholder="john.smith@hotmail.com" />
        </SectionCard>

        <SectionCard title="Address Information">
          <TextField label="Address Line 1" placeholder="Street and number" />
          <TextField label="Address Line 2" placeholder="Apartment, suite, etc." />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField label="Country" required />
            <SelectField label="State" required />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="City" required placeholder="City" />
            <TextField label="ZIP Code" placeholder="00000" />
          </div>
        </SectionCard>
      </div>
    </ModalShell>
  )
}
`})))()}var Qr;function $r(){return($r=e((()=>{Qr=`import { PageTitle } from '@/components/ui/page-title'
import { TextField, SelectField, OptionCheckbox, FormFooter, ModalShell } from '@/components/patients/form'
import { aviso } from '@/components/ui/toaster'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'

/* Figma 3640:72713 "Patients — Edit Patient (Full Page)".
   Tres secciones a 1088 de ancho: General (2×2 + 1 full), Demography
   (7 full-width + un checkbox) y Address (3 filas de 2). */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-line bg-white p-6">
      <h2 className="text-sm font-semibold text-ink">{title}</h2>
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </section>
  )
}

/* El cuerpo es el mismo en la página y en el modal que abre el lápiz de
   "General" en el dashboard del paciente. */
export function EditPatientForm() {
  return (
    <div className="flex flex-col gap-6">
        <Section title="General Information">
          <div className="grid gap-6 md:grid-cols-2">
            <TextField label="First Name" required placeholder="John" />
            <TextField label="Middle Name" placeholder="Lorem" />
            <TextField label="Last Name" required placeholder="Smith" />
            <TextField label="Preferred Name" placeholder="Johnny" />
          </div>
          <TextField label="Email" placeholder="john.smith@hotmail.com" />
        </Section>

        <Section title="Demography Information">
          <SelectField label="Gender" required />
          <SelectField label="Race" />
          <SelectField label="Ethnicity" />
          <SelectField label="Profession" />
          <SelectField label="Nationality" />
          <SelectField label="Language" />
          <SelectField label="Religion" />
          <OptionCheckbox label="Interpreter Required" />
        </Section>

        <Section title="Address Information">
          <div className="grid gap-6 md:grid-cols-2">
            <TextField label="Address Line 1" placeholder="Street and number" />
            <TextField label="Address Line 2" placeholder="Apartment, suite, etc." />
            <SelectField label="Country" required />
            <SelectField label="State" required />
            <TextField label="City" required placeholder="City" />
            <TextField label="ZIP Code" placeholder="00000" />
          </div>
        </Section>

    </div>
  )
}

export function EditPatientModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell
      title="Edit Patient"
      onClose={onClose}
      width="max-w-[1100px]"
      footer={<FormFooter onCancel={onClose} onSave={() => { aviso.ok('Patient details saved.'); onClose() }} />}
    >
      <EditPatientForm />
    </ModalShell>
  )
}

export default function EditPatientPage() {
  return (
    <div className={CONTENEDOR_PAGINA}>
      <div className="flex flex-col gap-[15px]">
        <PageTitle>Edit Patient</PageTitle>
      </div>
      <div className="mt-6">
        <EditPatientForm />
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <FormFooter onCancel={() => history.back()} onSave={() => aviso.ok('Patient details saved.')} />
      </div>
    </div>
  )
}
`})))()}var ei;function ti(){return(ti=e((()=>{ei=`import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, GripVertical, CirclePlus, Search, CreditCard, PersonStanding, ShieldHalf, Hospital, AArrowUp, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EmptyState } from '@/components/ui/empty-state'
import { Pagination } from '@/components/patients/ledger/Pagination'
import { PatientSidePanel } from '@/components/patients/PatientSidePanel'
import { Pill, type PillTone } from '@/components/ui/pill'
import { SelectField, DateTextField, TextArea, OptionCheckbox, FormFooter } from '@/components/patients/form'
import {
  NewSubscriptionModal, ManageSubscriptionModal, NewDependerModal,
} from '@/components/patients/insurance/modals'
import { PLANES, PLANES_HISTORICOS, SUSCRIPCION, RELACIONES, ORDENES, ELEGIBILIDAD, type PlanPaciente } from '@/data/insurance'
import { aviso } from '@/components/ui/toaster'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'

/* Figma 3817:865128 "Insurance", frames 3817:865704 y 3831:897436.

   El breadcrumb del frame termina en "Documents" en azul aunque la pantalla
   sea Insurance, y el título dice "Patients Plans". Se replican tal cual —
   ver modulos/insurance.md, anomalías 60 a 66. */

/* Pills con fondo tintado, como el resto del sistema. Muestreados del frame:
   Primary y Self usan el azul, Child el verde, Spouse el neutro, Active el
   verde e Inactive el rojo — los mismos seis tonos de \`Pill\`. */
const ORDEN_TONO: PillTone = 'info'
const RELACION_TONO: Record<PlanPaciente['relacion'], PillTone> = {
  Child: 'success',
  Self: 'info',
  Spouse: 'neutral',
}
const ESTADO_TONO: Record<PlanPaciente['estado'], PillTone> = {
  Active: 'success',
  Inactive: 'danger',
}

const COLS = {
  handle: 'w-8',
  order: 'w-[92px]',
  carrier: 'w-[92px]',
  plan: 'w-[124px]',
  subscriber: 'w-[128px]',
  relation: 'w-[92px]',
  coverage: 'w-[148px]',
  priority: 'w-[150px]',
  status: 'w-[92px]',
}

function Switch({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="flex items-center gap-2 text-[13px] text-ink"
    >
      <span className={cn('flex h-4 w-7 shrink-0 items-center rounded-full p-0.5 transition-colors', on ? 'bg-dash-blue' : 'bg-line-strong')}>
        <span className={cn('size-3 rounded-full bg-white transition-transform', on && 'translate-x-3')} />
      </span>
      {label}
    </button>
  )
}

/* Fila de dato de la card de suscripción: icono, etiqueta chica y valor. */
function FilaDato({ icon: Icon, label, value }: { icon: typeof ShieldHalf; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="size-4 shrink-0 text-ink-muted" strokeWidth={1.8} />
      <span className="min-w-0 leading-tight">
        <span className="block text-[11px] text-ink-faint">{label}</span>
        <span className="block truncate text-[13px] text-ink">{value}</span>
      </span>
    </div>
  )
}

export default function Insurance() {
  const { id = 'john-smith' } = useParams()
  const [historial, setHistorial] = useState(false)
  const [planes, setPlanes] = useState(PLANES)
  const [modal, setModal] = useState<'nueva' | 'gestionar' | 'dependiente' | null>(null)
  const [d, setD] = useState({ relacion: '', orden: '', inicio: '', fin: '', elegibilidad: '', verificacion: '', notas: '' })
  const [intentado, setIntentado] = useState(false)
  const set = (k: keyof typeof d) => (v: string) => setD((p) => ({ ...p, [k]: v }))
  const req = (k: keyof typeof d) => (intentado && !d[k].trim() ? 'This field is required.' : undefined)

  /* Las filas llevan grip: se reordenan arrastrando. */
  const arrastrada = useRef<number | null>(null)
  const soltar = (destino: number) => {
    const origen = arrastrada.current
    arrastrada.current = null
    if (origen === null || origen === destino) return
    setPlanes((prev) => {
      const copia = [...prev]
      const [fila] = copia.splice(origen, 1)
      copia.splice(destino, 0, fila)
      return copia
    })
    aviso.ok('Plan order updated.')
  }

  /* El switch suma los planes vencidos; no esconde los inactivos vigentes,
     que el frame muestra con el switch apagado. */
  const visibles = historial ? [...planes, ...PLANES_HISTORICOS] : planes

  const guardar = () => {
    setIntentado(true)
    if (!d.relacion.trim() || !d.orden.trim() || !d.inicio.trim() || !d.elegibilidad.trim()) return
    aviso.ok('Insurance information saved.')
  }

  return (
    <div className={CONTENEDOR_PAGINA}>
      {/* El último tramo del breadcrumb dice "Documents" en una pantalla de
          Insurance. Es del Figma. */}

      {/* Único rastro de navegación que queda arriba: la vuelta a la tabla.
          El breadcrumb completo repetía lo que ya dice el panel lateral. */}
      <Link
        to="/patients"
        className="text-dash-blue mb-3 inline-flex items-center gap-1 text-sm hover:underline"
      >
        <ChevronLeft className="size-4" /> Patients
      </Link>
      <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-start">
        <PatientSidePanel
          name="John Smith" initials="JS" section="Insurance"
          basePath={\`/patients/\${id}\`} 
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-xl leading-[1.3] font-semibold text-ink">Patients Plans</h1>
            <Switch on={historial} onChange={setHistorial} label="Show plan history" />
          </div>

          {/* Tabla de planes */}
          <div className="mt-4 overflow-x-auto rounded-lg border border-line-row bg-white">
            <div className="min-w-[960px]">
              <div className="flex items-center gap-3 bg-surface-alt px-3 py-3 text-[11px] font-semibold text-ink-muted">
                <span className={COLS.handle} />
                <span className={COLS.order}>Order</span>
                <span className={COLS.carrier}>Carrier</span>
                <span className={COLS.plan}>Plan</span>
                <span className={COLS.subscriber}>Subscriber</span>
                <span className={COLS.relation}>Relation</span>
                <span className={COLS.coverage}>Coverage Period</span>
                <span className={COLS.priority}>Priority Period</span>
                <span className={COLS.status}>Status</span>
              </div>

              {visibles.length === 0 ? (
                <EmptyState icon={CreditCard} title="No plans yet" detail="Add a subscription to start tracking this patient's coverage." />
              ) : (
                visibles.map((p, i) => (
                  <div
                    key={p.id}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => soltar(i)}
                    className="flex items-center gap-3 border-t border-line-row px-3 py-3 text-[13px] text-ink-soft"
                  >
                    <span
                      draggable
                      onDragStart={() => { arrastrada.current = i }}
                      aria-label={\`Reorder \${p.plan}\`}
                      className={cn(COLS.handle, 'cursor-grab text-ink-faint active:cursor-grabbing')}
                    >
                      <GripVertical className="size-4" />
                    </span>
                    <span className={COLS.order}><Pill tone={ORDEN_TONO}>{p.orden}</Pill></span>
                    <span className={COLS.carrier}>{p.carrier}</span>
                    <span className={COLS.plan}>{p.plan}</span>
                    <span className={COLS.subscriber}>{p.subscriber}</span>
                    <span className={COLS.relation}><Pill tone={RELACION_TONO[p.relacion]}>{p.relacion}</Pill></span>
                    <span className={COLS.coverage}>{p.cobertura}</span>
                    <span className={cn(COLS.priority, 'flex flex-col gap-0.5 leading-tight')}>
                      {p.prioridad.map((t) => <span key={t}>{t}</span>)}
                    </span>
                    <span className={COLS.status}><Pill tone={ESTADO_TONO[p.estado]}>{p.estado}</Pill></span>
                  </div>
                ))
              )}

              {/* El Figma dice "8 of 8" con cuatro filas a la vista; el
                  contador ahora cuenta las que hay. La paginación dibujada
                  no tenía onClick: se usa el componente compartido. */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-row px-3 py-3">
                <span className="text-xs font-semibold text-ink-muted">
                  Showing {visibles.length} of {visibles.length} insurances
                </span>
                <Pagination pagina={1} paginas={1} onChange={() => {}} />
              </div>
            </div>
          </div>

          {/* Suscripción + datos del paciente */}
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <section className="flex flex-col rounded-lg border border-line bg-white p-4 sm:p-5">
              <h2 className="text-sm font-semibold text-ink">Subscription Information</h2>
              <p className="mt-0.5 text-[11px] text-ink-muted">
                Select an existing subscription or create new one.
              </p>

              <span className="mt-4 block text-xs font-medium text-ink">
                Search for an existing subscription<span className="text-required">*</span>
              </span>
              <div className="relative mt-2">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
                {/* Borde gris como todos los buscadores del sistema; el azul
                    queda para el foco. El frame lo dibuja siempre azul porque
                    lo capturó enfocado. */}
                <input
                  placeholder="Search result"
                  className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => setModal('nueva')}
                className="text-dash-blue mt-2 flex items-center gap-1.5 self-end text-[13px] font-semibold hover:underline"
              >
                <CirclePlus className="size-4" /> Add New Subscription
              </button>

              <p className="mt-4 text-sm font-semibold text-ink">Select a subscription</p>
              <div className="mt-3 flex flex-col gap-3">
                <FilaDato icon={PersonStanding} label="Subscriber" value={SUSCRIPCION.subscriber} />
                <FilaDato icon={PersonStanding} label="Subscriber ID" value={SUSCRIPCION.subscriberId} />
                <FilaDato icon={ShieldHalf} label="Carrier" value={SUSCRIPCION.carrier} />
                <FilaDato icon={Hospital} label="Plan" value={SUSCRIPCION.plan} />
                <FilaDato icon={AArrowUp} label="Coverage Period" value={SUSCRIPCION.cobertura} />
                <FilaDato icon={Eye} label="Dependents" value={SUSCRIPCION.dependientes} />
              </div>

              <button
                type="button"
                onClick={() => setModal('gestionar')}
                className="bg-dash-blue hover:bg-dash-blue-hover mt-5 h-9 self-end rounded-md px-5 text-[13px] font-medium text-white transition-colors"
              >
                Manage Subscription
              </button>
            </section>

            <section className="flex flex-col rounded-lg border border-line bg-white p-4 sm:p-5">
              <h2 className="text-sm font-semibold text-ink">Patient Information</h2>

              <SelectField
                className="mt-4" label="Relationship to Subscriber" required options={RELACIONES}
                value={d.relacion} onChange={set('relacion')} error={req('relacion')}
              />

              {/* Caja de sólo lectura con el mismo rótulo que el select de
                  abajo, y con "Cordination" mal escrito. Es del Figma. */}
              <div className="mt-4 flex items-center gap-2.5 rounded-md bg-[#eff4ff] px-3 py-2">
                <CreditCard className="size-4 shrink-0 text-ink-muted" strokeWidth={1.8} />
                <span className="leading-tight">
                  <span className="block text-[11px] text-ink-faint">Cordination Order</span>
                  <span className="block text-[13px] text-ink">Primary</span>
                </span>
              </div>

              <SelectField
                className="mt-4" label="Cordination Order" required options={ORDENES}
                value={d.orden} onChange={set('orden')} error={req('orden')}
              />

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <OptionCheckbox label="Assignment of Benefits" />
                <OptionCheckbox label="Release of Information" />
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <DateTextField label="Coverage Start" required value={d.inicio} onChange={set('inicio')} error={req('inicio')} />
                <DateTextField label="Coverage End" value={d.fin} onChange={set('fin')} />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <SelectField label="Eligibility" required options={ELEGIBILIDAD} value={d.elegibilidad} onChange={set('elegibilidad')} error={req('elegibilidad')} />
                <DateTextField label="Verification Date" value={d.verificacion} onChange={set('verificacion')} />
              </div>
              <TextArea className="mt-4" label="Notes" placeholder="Add notes" value={d.notas} onChange={set('notas')} />

              <div className="mt-5 flex justify-end gap-3">
                <FormFooter onCancel={() => setD({ relacion: '', orden: '', inicio: '', fin: '', elegibilidad: '', verificacion: '', notas: '' })} onSave={guardar} />
              </div>
            </section>
          </div>
        </div>
      </div>

      {modal === 'nueva' && <NewSubscriptionModal onClose={() => setModal(null)} />}
      {modal === 'gestionar' && (
        <ManageSubscriptionModal
          onNuevoDependiente={() => setModal('dependiente')}
          onClose={() => setModal(null)}
        />
      )}
      {modal === 'dependiente' && <NewDependerModal onClose={() => setModal('gestionar')} />}
    </div>
  )
}
`})))()}var ni;function ri(){return(ri=e((()=>{ni=`import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ChevronLeft, Search, Receipt, CreditCard, Wallet, HandCoins, Download, MoveHorizontal,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { EmptyState } from '@/components/ui/empty-state'
import { SearchButton } from '@/components/ui/search-button'
import { PatientSidePanel } from '@/components/patients/PatientSidePanel'
import { FilterMenu } from '@/components/dashboard/FilterMenu'
import { TooltipProvider } from '@/components/ui/tooltip'
import { StatStrip, type Stat } from '@/components/dashboard/StatStrip'
import {
  MOVIMIENTOS, TIPOS, GUARANTOR, conSaldo, moneda, tieneCredito,
  type Movimiento,
} from '@/data/ledger'
import { aviso } from '@/components/ui/toaster'
import { Pill, type PillTone } from '@/components/ui/pill'
import { Pagination } from '@/components/patients/ledger/Pagination'
import { ColumnPicker } from '@/components/patients/ledger/ColumnPicker'
import { useAnchoColumnas, useAnchoVisible, ManijaResize } from '@/components/patients/ledger/useAnchoColumnas'
import { LedgerRowDetail, LedgerRowModal, BotonExpandirTodo, FilaConTooltip } from '@/components/patients/ledger/LedgerRowDetail'
import { PatientPaymentPanel } from '@/components/patients/ledger/PatientPaymentPanel'
import { CreditAdjustmentPanel } from '@/components/patients/ledger/CreditAdjustmentPanel'
import { ChargeAdjustmentPanel } from '@/components/patients/ledger/ChargeAdjustmentPanel'
import { AplicarCreditoModal } from '@/components/patients/ledger/AplicarCreditoModal'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'

/* Figma 4582:28487 / 4588:84886. Ver design-reference/figma/modulos/ledger.md. */

/* El Figma agrupa Payment/Adjustment en un solo tipo cada uno, pero el
   diseño de referencia de Confidentally 2.0 distingue paciente/seguro y
   cargo/crédito en la propia celda -mismo dato (\`tipo\`+signo de \`monto\`),
   sólo más específico al mostrarlo-. Charge muestra el código en vez de
   una etiqueta genérica, igual que esa referencia. */
function detalleTipo(m: Movimiento): { texto: string; tono: PillTone } {
  if (m.tipo === 'Charge') return { texto: m.codigo, tono: 'neutral' }
  if (m.tipo === 'Insurance') return { texto: 'Ins Payment', tono: 'purple' }
  if (m.tipo === 'Payment') return { texto: 'Pt Payment', tono: 'info' }
  return m.monto < 0
    ? { texto: 'Credit Adj', tono: 'neutral' }
    : { texto: 'Charge Adj', tono: 'danger' }
}

/* No es un \`tipo\` real -es una condición sobre \`creditoDisponible\`-, así que
   se agrega como una opción más al lado de Charge/Payment/Adjustment/
   Insurance en el mismo filtro, no como un filtro aparte. */
const FILTRO_CREDITO = 'Unapplied Credits'
const OPCIONES_FILTRO = [...TIPOS, FILTRO_CREDITO]

/* Anchos del diseño de referencia (Confidentally 2.0): 112/112/96 · desc
   elástica · 112/80/96, gap-3 y px-3. Suman 864 con los gaps y el padding. */
type ColLedger = 'fecha' | 'paciente' | 'tipo' | 'desc' | 'provider' | 'monto' | 'credito' | 'saldo'

const ANCHO_BASE: Record<ColLedger, number> = {
  fecha: 112, paciente: 112, tipo: 96, desc: 160, provider: 112, monto: 80, credito: 136, saldo: 96,
}

/* Piso de cada columna: hasta acá pueden encoger para que la tabla entre
   entera cuando el menú lateral y el panel del paciente están abiertos, en
   vez de desbordar y pedir scroll. Medidos contra el contenido real:
   "March 17, 2025" 93px, la pastilla "Ins Payment" 86, "-$9,850.00" 71.
   Patient/Description/Provider truncan y ya tienen tooltip. */
const ANCHO_MINIMO: Record<ColLedger, number> = {
  fecha: 96, paciente: 72, tipo: 88, desc: 120, provider: 80, monto: 76, credito: 128, saldo: 76,
}

/* Techo de Description: pasado eso, lo que sobra se reparte entre las
   demás. 280 deja intacto el ancho de escritorio -a 934px la columna llega
   a 230- y sólo entra en juego cuando se ocultan columnas. */
const MAX_ELASTICA = 280

type ColumnaLedger = {
  id: ColLedger; label: string
  elastica?: boolean; derecha?: boolean; bloqueada?: boolean
  claseCelda?: string
  titulo?: (m: Fila) => string
  celda: (m: Fila) => React.ReactNode
}
type Fila = Movimiento & { saldo: number }

const COLUMNAS: ColumnaLedger[] = [
  { id: 'fecha', label: 'Date', bloqueada: true, celda: (m) => m.fecha },
  { id: 'paciente', label: 'Patient', claseCelda: 'truncate text-ink', titulo: (m) => m.paciente, celda: (m) => m.paciente },
  {
    id: 'tipo', label: 'Type',
    celda: (m) => { const t = detalleTipo(m); return <Pill tone={t.tono}>{t.texto}</Pill> },
  },
  { id: 'desc', label: 'Description', elastica: true, claseCelda: 'truncate text-ink', titulo: (m) => m.descripcion, celda: (m) => m.descripcion },
  { id: 'provider', label: 'Provider', claseCelda: 'truncate', titulo: (m) => m.provider, celda: (m) => m.provider },
  /* Los negativos bajan la cuenta: van en verde. */
  {
    id: 'monto', label: 'Amount', derecha: true, claseCelda: 'font-medium tabular-nums',
    celda: (m) => <span className={m.monto < 0 ? 'text-dash-ok-fg' : 'text-ink'}>{moneda(m.monto)}</span>,
  },
  {
    /* Quinta vuelta: columna propia "Credit available" al lado de Amount, con
       el botón siempre a la vista -el mismo que antes aparecía recién al
       hacer hover-. Bloqueada: es la única forma de llegar a "Apply credit"
       desde la tabla. */
    id: 'credito', label: 'Credit available', derecha: true, bloqueada: true,
    celda: (m) => {
      if (!tieneCredito(m)) return null
      return (
        <button
          type="button"
          data-apply-credit
          aria-label={\`Apply \${moneda(m.creditoDisponible ?? 0)} credit from \${m.descripcion}\`}
          className="text-dash-blue inline-flex items-center gap-1.5 rounded-md border border-[#c7d9fb] bg-info-bg px-1.5 py-1 text-[12px] font-medium whitespace-nowrap tabular-nums hover:bg-[#e3edff]"
        >
          <HandCoins className="size-3.5 shrink-0" />
          {moneda(m.creditoDisponible ?? 0)} · Apply
        </button>
      )
    },
  },
  { id: 'saldo', label: 'Balance', derecha: true, bloqueada: true, claseCelda: 'font-semibold tabular-nums text-ink', celda: (m) => moneda(m.saldo) },
]

const VISTAS = ['Patient View', 'Guarantor View'] as const
type Vista = (typeof VISTAS)[number]

const TABS = [
  { id: 'transacciones', label: 'Transactions', titulo: 'Ledger' },
  { id: 'pago', label: 'Patient Payment (-)', titulo: 'New Patient Payment (-)' },
  { id: 'credito', label: 'Credit Adjustment (-)', titulo: 'New Credit (-) Adjustment' },
  { id: 'cargo', label: 'Charge Adjustment (+)', titulo: 'New Credit (+) Adjustment' },
] as const
type Tab = (typeof TABS)[number]['id']

export default function Ledger() {
  const { id = 'john-smith' } = useParams()
  const [movs, setMovs] = useState(MOVIMIENTOS)
  const [vista, setVista] = useState<Vista>('Patient View')
  const [q, setQ] = useState('')
  const [tipos, setTipos] = useState<string[]>([])
  const [tab, setTab] = useState<Tab>('transacciones')
  const [pagina, setPagina] = useState(1)
  const [expandidas, setExpandidas] = useState<string[]>([])
  const [ocultas, setOcultas] = useState<ColLedger[]>([])
  const alternarCol = (id: ColLedger) =>
    setOcultas((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  const [enModal, setEnModal] = useState<Fila | null>(null)
  const [enCredito, setEnCredito] = useState<Fila | null>(null)
  const anchos = useAnchoColumnas<ColLedger>(ANCHO_BASE)
  const refVisible = useAnchoVisible<HTMLDivElement>()

  const alternarFila = (id: string) =>
    setExpandidas((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))

  /* Aplicar crédito no genera un movimiento nuevo -esa plata ya está
     contada en el saldo desde que el Payment/Adjustment se registró-, sólo
     descuenta lo aplicado del remanente de la transacción de origen. */
  const aplicarCredito = (id: string, monto: number) => {
    setMovs((prev) => prev.map((mv) =>
      mv.id === id ? { ...mv, creditoDisponible: Math.max((mv.creditoDisponible ?? 0) - monto, 0) } : mv,
    ))
    aviso.ok(\`\${moneda(monto)} of credit applied.\`)
    setEnCredito(null)
  }

  /* Una columna movida a mano se queda donde la dejaron: no encoge ni
     crece. El resto cede hasta su piso para que la tabla entre entera, y al
     sobrar lugar Description se lo queda primero (peso alto) hasta su
     techo; recién ahí el excedente se reparte entre las demás. */
  const estilo = (c: ColumnaLedger) => {
    const fijada = anchos.manual(c.id) !== undefined
    if (fijada) {
      return { width: anchos.ancho(c.id), minWidth: anchos.ancho(c.id), flexGrow: 0, flexShrink: 0 }
    }
    return {
      width: anchos.ancho(c.id),
      minWidth: ANCHO_MINIMO[c.id],
      maxWidth: c.elastica ? MAX_ELASTICA : undefined,
      flexGrow: c.elastica ? 1000 : 1,
      flexShrink: 1,
    }
  }
  const columnasVisibles = COLUMNAS.filter((c) => !ocultas.includes(c.id))

  const anchoMinimo = columnasVisibles.reduce(
    (a, c) => a + (anchos.manual(c.id) ?? ANCHO_MINIMO[c.id]), 0,
  ) + (columnasVisibles.length - 1) * 12 + 24

  const conSaldoTotal = useMemo(() => conSaldo(movs), [movs])
  const delaVista = useMemo(
    () => (vista === 'Guarantor View' ? conSaldoTotal : conSaldoTotal.filter((m) => m.paciente === GUARANTOR)),
    [conSaldoTotal, vista],
  )

  const filas = useMemo(
    () => delaVista.filter(
      (m) =>
        (tipos.length === 0 || tipos.includes(m.tipo) || (tipos.includes(FILTRO_CREDITO) && tieneCredito(m))) &&
        \`\${m.codigo} \${m.descripcion} \${m.provider} \${m.paciente}\`.toLowerCase().includes(q.trim().toLowerCase()),
    ),
    [delaVista, q, tipos],
  )
  const TAM_PAGINA = 8
  const paginas = Math.max(1, Math.ceil(filas.length / TAM_PAGINA))
  const paginaActual = Math.min(pagina, paginas)
  const filasPagina = filas.slice((paginaActual - 1) * TAM_PAGINA, paginaActual * TAM_PAGINA)

  /* "todas" es sobre lo que se ve en pantalla, no sobre la cuenta entera:
     abrir 26 filas de golpe en una tabla paginada no le sirve a nadie. */
  const todasAbiertas = filasPagina.length > 0 && filasPagina.every((m) => expandidas.includes(m.id))
  const hayAlgunaAbierta = filasPagina.some((m) => expandidas.includes(m.id))
  const expandirTodo = () =>
    setExpandidas((p) => [...new Set([...p, ...filasPagina.map((m) => m.id)])])
  const colapsarTodo = () =>
    setExpandidas((p) => p.filter((id) => !filasPagina.some((m) => m.id === id)))

  const stats: Stat[] = useMemo(() => {
    const cargos = delaVista.filter((m) => m.tipo === 'Charge').reduce((a, m) => a + m.monto, 0)
    const seguro = delaVista.filter((m) => m.tipo === 'Insurance' && m.estado === 'Posted')
      .reduce((a, m) => a + m.monto, 0)
    const saldo = delaVista.reduce((a, m) => a + m.monto, 0)
    const denegados = delaVista.filter((m) => m.estado === 'Denied').length
    const credito = delaVista.filter(tieneCredito).reduce((a, m) => a + (m.creditoDisponible ?? 0), 0)
    return [
      { label: 'Total charges', value: moneda(cargos), nota: \`\${delaVista.filter((m) => m.tipo === 'Charge').length} procedures\`, icon: Receipt, bg: '#eef2ff', fg: '#1d56bc' },
      { label: 'Insurance paid', value: moneda(-seguro), nota: denegados ? \`\${denegados} denied\` : 'all posted', icon: CreditCard, bg: '#f5f3ff', fg: '#8b5cf6' },
      { label: 'Patient balance', value: moneda(saldo), nota: 'due on next visit', icon: Wallet, bg: '#fff7ed', fg: '#f97316' },
      /* bg/fg: StatStrip los ignora a propósito -las cuatro comparten el
         mismo azul del ícono, ver su propio comentario-, quedan sólo por
         las dudas de que algún día se lean. */
      { label: 'Unapplied credits', value: moneda(credito), nota: 'Available to apply', icon: HandCoins, bg: '#eef2ff', fg: '#1d56bc' },
    ]
  }, [delaVista])

  const agregar = (m: Omit<Movimiento, 'id'>) => {
    setMovs((p) => [...p, { ...m, id: \`m\${p.length + 1}-\${Date.now()}\` }])
  }

  const cargosDeLaCuenta = movs.filter((m) => m.tipo === 'Charge')
  const volver = () => setTab('transacciones')
  const tituloActivo = TABS.find((t) => t.id === tab)?.titulo ?? 'Ledger'

  return (
    <div className={CONTENEDOR_PAGINA}>
      <Link
        to="/patients"
        className="text-dash-blue mb-3 inline-flex items-center gap-1 text-sm hover:underline"
      >
        <ChevronLeft className="size-4" /> Patients
      </Link>

      <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-start">
        <PatientSidePanel
          name="John Smith" initials="JS" section="Ledger"
          basePath={\`/patients/\${id}\`}
        />

        <div className="min-w-0 flex-1">
          <h1 className="text-xl leading-[1.3] font-semibold text-ink">{tituloActivo}</h1>

          <div className="mt-4 flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-lg bg-surface-slate p-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  'h-8 shrink-0 rounded-md px-3 text-xs font-medium whitespace-nowrap transition-colors',
                  tab === t.id ? 'bg-dash-blue text-white' : 'text-ink-slate hover:text-ink-soft',
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'transacciones' && (
            <>
              <div className="mt-4">
                <StatStrip stats={stats} apilada />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="relative min-w-0 flex-1 sm:max-w-[320px]">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
                  <input
                    value={q}
                    onChange={(e) => { setQ(e.target.value); setPagina(1) }}
                    placeholder="Search by code, description or provider"
                    className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
                  />
                </div>
                <SearchButton onClick={() => setPagina(1)} className="h-9" />
                <FilterMenu label="Filter entries" options={OPCIONES_FILTRO} value={tipos} onChange={(v) => { setTipos(v); setPagina(1) }} />
                {filasPagina.length > 0 && (
                  <BotonExpandirTodo todasAbiertas={todasAbiertas} hayAlgunaAbierta={hayAlgunaAbierta}
                  onExpandirTodo={expandirTodo} onColapsarTodo={colapsarTodo} />
                )}

                <div className="ml-auto flex flex-wrap items-center gap-3">
                  <div className="flex w-fit shrink-0 items-center gap-1 rounded-lg bg-surface-slate p-1">
                    {VISTAS.map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => { setVista(v); setPagina(1) }}
                        className={cn(
                          'h-8 shrink-0 rounded-md px-3 text-xs font-medium whitespace-nowrap transition-colors',
                          vista === v ? 'bg-dash-blue text-white' : 'text-ink-slate hover:text-ink-soft',
                        )}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                  <ColumnPicker
                    columnas={COLUMNAS}
                    ocultas={ocultas}
                    onToggle={alternarCol}
                    onReset={() => setOcultas([])}
                  />
                  <button
                    type="button"
                    onClick={() => aviso.ok('Statement exported.')}
                    className="flex h-9 items-center gap-2 rounded-md border border-line bg-white px-4 text-[13px] font-medium hover:bg-surface-subtle"
                  >
                    <Download className="size-4" /> Export statement
                  </button>
                </div>
              </div>

              {/* \`skipDelayDuration={0}\`: sin esto Radix deja una ventana de gracia
                  y al barrer la tabla el tooltip de la fila siguiente abre al
                  instante -y alcanza a mostrar el contenido de la anterior-, que
                  es el parpadeo que hacía imposible leerlo. */}
              <TooltipProvider delayDuration={500} skipDelayDuration={0}>
              <div ref={refVisible} data-tabla-scroll className="mt-4 w-full overflow-x-auto rounded-lg border border-line-row bg-white">
                <div style={{ minWidth: anchoMinimo }}>
                  <div data-tabla-header className="group/fila flex items-center gap-3 bg-surface-alt px-3 py-3 text-[11px] font-semibold text-ink-muted">
                    {columnasVisibles.map((c, i) => (
                      <span
                        key={c.id}
                        data-elastica={c.elastica || undefined}
                        style={estilo(c)}
                        className={cn('relative flex items-center', c.derecha && 'justify-end')}
                      >
                        <span className="truncate">{c.label}</span>
                        <ManijaResize id={c.id} label={c.label} estado={anchos} indice={i} />
                      </span>
                    ))}
                  </div>

                  {filasPagina.length === 0 ? (
                    <EmptyState icon={Receipt} title="No entries" detail="Nothing matches the current search or filters." />
                  ) : (
                    filasPagina.map((m) => {
                      const abierta = expandidas.includes(m.id)
                      return (
                      <div
                        key={m.id}
                        className={cn(
                          'border-t border-line-row',
                          /* Barra azul de 4px al borde de las filas con crédito
                             sin aplicar; cubre también el detalle si se expande. */
                          tieneCredito(m) && 'relative before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-dash-blue',
                        )}
                      >
                        <FilaConTooltip m={m} abierta={abierta}>
                        <div
                          role="button"
                          tabIndex={0}
                          aria-expanded={abierta}
                          aria-label={\`Toggle details for \${m.descripcion}\`}
                          onClick={(e) => {
                            if ((e.target as HTMLElement).closest('[role="separator"]')) return
                            /* El botón "Apply credit" vive adentro de la celda de
                               Description -no tiene sentido un handler propio por
                               columna sólo para esto-, así que se intercepta acá
                               igual que el \`separator\` del resize de columnas. */
                            if ((e.target as HTMLElement).closest('[data-apply-credit]')) { setEnCredito(m); return }
                            alternarFila(m.id)
                          }}
                          onKeyDown={(e) => {
                            if (e.target !== e.currentTarget) return
                            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); alternarFila(m.id) }
                          }}
                          className={cn(
                            'group/fila flex cursor-pointer items-center gap-3 px-3 py-3 text-[13px] text-ink-soft hover:bg-surface-subtle',
                            abierta && 'bg-surface-subtle',
                          )}
                        >
                          {columnasVisibles.map((c) => (
                            <span
                              key={c.id}
                              style={estilo(c)}
                              className={cn('relative', c.derecha && 'text-right', c.claseCelda)}
                            >
                              {c.celda(m)}
                            </span>
                          ))}
                        </div>
                        </FilaConTooltip>
                        {abierta && (
                          <LedgerRowDetail
                            m={m}
                            onVerTodo={() => setEnModal(m)}
                            onAplicarCredito={tieneCredito(m) ? () => setEnCredito(m) : undefined}
                          />
                        )}
                      </div>
                      )
                    })
                  )}

                  {/* El resumen cierra la tabla: adentro del mismo borde y
                      arriba del paginado, no suelto afuera de la card. */}
                  <div className="flex justify-end border-t border-line-row px-3 py-3">
                    <dl className="w-fit overflow-hidden rounded-md border border-line text-[13px]">
                      <div className="flex items-center">
                        <dt className="w-36 bg-surface-alt px-3 py-2 text-right font-medium text-ink-soft">Balance due</dt>
                        <dd className="text-dash-blue w-24 px-3 py-2 text-right font-semibold tabular-nums">
                          {moneda(delaVista.reduce((a, m) => a + m.monto, 0))}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-row px-3 py-3">
                    <span className="flex items-center gap-3 text-xs font-semibold text-ink-muted">
                      Showing {filasPagina.length} of {filas.length} entries
                      {anchos.avisando && (
                        <span className="motion-safe:animate-[col-hint_2.4s_ease-in-out_both] hidden items-center gap-1.5 font-medium text-ink-faint lg:flex">
                          <MoveHorizontal className="size-3.5" /> Drag column edges to resize · double-click to reset
                        </span>
                      )}
                      {anchos.hayCambios && (
                        <button type="button" onClick={anchos.resetear} className="text-dash-blue hidden hover:underline lg:inline">
                          Reset column widths
                        </button>
                      )}
                    </span>
                    <Pagination pagina={paginaActual} paginas={paginas} onChange={setPagina} />
                  </div>
                </div>
              </div>
              </TooltipProvider>
            </>
          )}

          {tab === 'pago' && (
            <div className="mt-4">
              <PatientPaymentPanel
                cargos={cargosDeLaCuenta}
                onCancelar={volver}
                onGuardar={(m) => { agregar(m); aviso.ok(\`Payment of \${moneda(Math.abs(m.monto))} recorded for \${m.paciente}.\`); volver() }}
              />
            </div>
          )}
          {tab === 'credito' && (
            <div className="mt-4">
              <CreditAdjustmentPanel
                cargos={cargosDeLaCuenta}
                onCancelar={volver}
                onGuardar={(m) => { agregar(m); aviso.ok(\`\${m.descripcion} of \${moneda(Math.abs(m.monto))} applied to \${m.paciente}.\`); volver() }}
              />
            </div>
          )}
          {tab === 'cargo' && (
            <div className="mt-4">
              <ChargeAdjustmentPanel
                cargosVisita={cargosDeLaCuenta}
                onCancelar={volver}
                onGuardar={(m) => { agregar(m); aviso.ok(\`\${m.descripcion} of \${moneda(Math.abs(m.monto))} added for \${m.paciente}.\`); volver() }}
              />
            </div>
          )}
        </div>
      </div>

      {enModal && <LedgerRowModal m={enModal} onClose={() => setEnModal(null)} />}
      {enCredito && (
        <AplicarCreditoModal
          m={enCredito}
          cargos={cargosDeLaCuenta.filter((c) => c.paciente === enCredito.paciente)}
          onClose={() => setEnCredito(null)}
          onAplicar={(monto) => aplicarCredito(enCredito.id, monto)}
        />
      )}
    </div>
  )
}
`})))()}var ii;function ai(){return(ai=e((()=>{ii=`import { useState } from 'react'
import {
  ModalShell, SectionCard, TextField, SelectField, DateField, SearchField,
  LinkPersonCheckbox, OptionCheckbox, FormFooter,
} from '@/components/patients/form'
import { usePatients, type NuevoPaciente } from '@/data/patientsStore'
import { aviso } from '@/components/ui/toaster'

/* Figma 3639:55808 (base) y 3640:56478 (con guardián).
   La variante con guardián sólo agrega una tercera sección debajo de la
   columna izquierda; el resto es idéntico.

   El Figma muestra las dos variantes como frames sueltos y NO indica qué las
   alterna: los dos checkboxes de General Information tienen texto propio y
   ninguno habla de guardianes. Acá la sección aparece cuando la fecha de
   nacimiento da **menor de 18**, que es la regla real detrás del guardián y no
   obliga a inventar un control. Ver README.md, Desviaciones. */
const MAYORIA = 18

function esMenor(texto: string) {
  const f = new Date(texto)
  if (Number.isNaN(f.getTime())) return false
  const hoy = new Date()
  let edad = hoy.getFullYear() - f.getFullYear()
  const m = hoy.getMonth() - f.getMonth()
  if (m < 0 || (m === 0 && hoy.getDate() < f.getDate())) edad--
  return edad < MAYORIA
}
const VACIO: NuevoPaciente = { first: '', middle: '', last: '', email: '', birthday: '', gender: '' }

export function NewPatientModal({
  title = 'New Patient',
  forceGuardian = false,
  editId,
  inicial,
  onClose,
}: {
  title?: string
  forceGuardian?: boolean
  /** Si viene, guarda sobre ese paciente en vez de crear uno nuevo. */
  editId?: string
  inicial?: Partial<NuevoPaciente>
  onClose: () => void
}) {
  const { addPatient, updatePatient } = usePatients()
  const [d, setD] = useState<NuevoPaciente>({ ...VACIO, ...inicial })
  const withGuardian = forceGuardian || esMenor(d.birthday)
  const [intentado, setIntentado] = useState(false)
  const set = (k: keyof NuevoPaciente) => (v: string) => setD((p) => ({ ...p, [k]: v }))
  /* Los campos obligatorios se marcan en rojo recién después del primer
     intento de guardar, para no señalar errores antes de tiempo. El aviso
     va debajo del campo; el toast se reserva para el final de la acción. */
  const falta = (v: string) => (intentado && !v.trim() ? 'This field is required.' : undefined)

  const guardar = () => {
    /* Los campos marcados con * son los que el Figma exige. */
    setIntentado(true)
    if (!d.first.trim() || !d.last.trim() || !d.birthday.trim() || !d.gender.trim()) return
    const nombre = [d.first, d.last].filter(Boolean).join(' ')
    if (editId) {
      updatePatient(editId, d)
      aviso.ok(\`\${nombre} has been updated.\`)
    } else {
      addPatient(d)
      aviso.ok(\`\${nombre} has been added to the patient list.\`)
    }
    onClose()
  }

  return (
    <ModalShell
      title={title}
      onClose={onClose}
      footer={<FormFooter onCancel={onClose} onSave={guardar} />}
    >
      <div className="grid gap-7 lg:grid-cols-2">
        <div className="flex flex-col gap-7">
          <SectionCard title="General Information">
            <LinkPersonCheckbox />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <TextField label="First Name" required placeholder="John" value={d.first} onChange={set('first')} error={falta(d.first)} />
              <TextField label="Middle Name" placeholder="Lorem" value={d.middle} onChange={set('middle')} />
              <TextField label="Last Name" required placeholder="Smith" value={d.last} onChange={set('last')} error={falta(d.last)} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField label="Email" placeholder="john.smith@hotmail.c..." value={d.email} onChange={set('email')} />
              <DateField label="Birthdate" required onChange={set('birthday')} error={falta(d.birthday)} />
            </div>
            <OptionCheckbox label="Create a new user account with this email address" />
          </SectionCard>

          {withGuardian && (
            <SectionCard title="Guardian Information">
              <SearchField label="Select Person" options={['Jessica Miller', 'Michael Miller', 'Robert Miller']} />
              <OptionCheckbox label="Add new person" defaultChecked={false} />
              <OptionCheckbox label="This person is also the guarantor" defaultChecked={false} />
              <SelectField
                label="Relationship to Patient"
                required
                options={['Parent', 'Guardian', 'Sibling', 'Spouse', 'Other']}
              />
            </SectionCard>
          )}
        </div>

        <SectionCard title="Demographic Information">
          <SelectField label="Gender" required value={d.gender} onChange={set('gender')} error={falta(d.gender)} />
          <SelectField label="Race" />
          <SelectField label="Ethnicity" />
          <SelectField label="Profession" />
          <SelectField label="Nationality" />
          <SelectField label="Language" />
          <OptionCheckbox label="Interpreter Required" />
          <SelectField label="Religion" />
        </SectionCard>
      </div>
    </ModalShell>
  )
}
`})))()}var oi;function si(){return(si=e((()=>{oi=`import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, Pencil, Plus, Trash2, Calendar, Phone, Mail, MapPin, Users, type LucideIcon } from 'lucide-react'
import { PageTitle } from '@/components/ui/page-title'
import { PatientSidePanel } from '@/components/patients/PatientSidePanel'
import { EmptyState } from '@/components/ui/empty-state'
import { EditRelationshipModal } from '@/components/patients/EditRelationshipModal'
import { DIRECTORIO } from '@/pages/patients/AddRelationship'
import { aviso } from '@/components/ui/toaster'
import { Pill, type PillTone } from '@/components/ui/pill'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'

/* Figma 3712:60564 (poblado) y 3712:59142 (vacío). */

type Badge = 'Legal contact' | 'Financial contact' | 'Household'
/* Household usaba #f0f2ff -dos unidades distinto del resto de las pills
   azules del sistema (#f0f5ff)-: inconsistencia menor del propio Figma que
   la pill compartida ya no reproduce. */
const BADGE_TONO: Record<Badge, PillTone> = {
  'Legal contact': 'info',
  'Financial contact': 'success',
  Household: 'info',
}

/* El Figma dibuja el elipsis pero nunca muestra su menú. Lleva las dos
   acciones que el propio diseño da por existentes: editar (3716:81940) y
   borrar, que el texto de ese modal menciona sin llegar a dibujar.
   Ver modulos/relationships.md, anomalía 42. */
function MenuAcciones({
  nombre, onEdit, onDelete,
}: {
  nombre: string
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <RowActionsMenu label={nombre} className="ml-auto">
      <DropdownMenuItem onSelect={onEdit}>
        <Pencil className="size-4 shrink-0" /> Edit relationship
      </DropdownMenuItem>
      <DropdownMenuItem variant="destructive" onSelect={onDelete}>
        <Trash2 className="size-4 shrink-0" /> Delete relationship
      </DropdownMenuItem>
    </RowActionsMenu>
  )
}

type Campo = { icon: LucideIcon; label: string; value: string }

type Persona = {
  id?: string
  name: string
  initials: string
  rol: string
  badges: Badge[]
  campos: Campo[]
}

const CONTACTO: Campo[] = [
  { icon: Calendar, label: 'Date of Birth', value: 'May 14, 1982' },
  { icon: Phone, label: 'Phone', value: '(555) 123-4567' },
  { icon: Mail, label: 'Email', value: 'abrilviola@gmail.com' },
  { icon: MapPin, label: 'Contact Address', value: '123 Maple Street, Phoenix, AZ 85016' },
]
const HOGAR: Campo[] = [
  { icon: Calendar, label: 'Date of Birth', value: 'May 14, 1982' },
  { icon: Mail, label: 'Email', value: 'abrilviola@gmail.com' },
]

/* Dos cards con la misma persona: es lo que muestra el frame. Se les agrega
   un id para poder borrarlas por separado. */
const RELACIONES: Persona[] = [
  { id: 'r1', name: 'Jessica Miller', initials: 'JM', rol: 'Mother', badges: ['Legal contact', 'Financial contact'], campos: CONTACTO },
  { id: 'r2', name: 'Jessica Miller', initials: 'JM', rol: 'Mother', badges: ['Legal contact', 'Financial contact'], campos: CONTACTO },
]
const HOUSEHOLD: Persona[] = [
  { id: 'h1', name: 'Jessica Miller', initials: 'JM', rol: 'Child', badges: ['Household'], campos: HOGAR },
  { id: 'h2', name: 'Jessica Miller', initials: 'JM', rol: 'Child', badges: ['Household'], campos: HOGAR },
]

function PersonaCard({
  p, onEdit, onDelete,
}: {
  p: Persona
  onEdit?: () => void
  onDelete?: () => void
}) {
  return (
    <article className="rounded-lg border border-line bg-white px-5 py-4">
      <header className="flex flex-wrap items-center gap-3">
        <span className="bg-dash-blue flex size-10 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-white">
          {p.initials}
        </span>
        <span className="leading-tight">
          <span className="block text-[15px] font-bold text-ink">{p.name}</span>
          <span className="block text-xs text-ink-muted">{p.rol}</span>
        </span>
        <span className="flex flex-wrap items-center gap-2">
          {p.badges.map((b) => <Pill key={b} tone={BADGE_TONO[b]}>{b}</Pill>)}
        </span>
        {onEdit && onDelete && <MenuAcciones nombre={p.name} onEdit={onEdit} onDelete={onDelete} />}
      </header>

      <div className="mt-4 border-t border-line pt-3">
        <dl className="flex flex-wrap gap-x-10 gap-y-3">
          {p.campos.map(({ icon: Icon, label, value }) => (
            <div key={label} className="min-w-0">
              <dt className="flex items-center gap-1.5 text-[11px] text-ink-muted">
                <Icon className="size-3.5 shrink-0" /> {label}
              </dt>
              <dd className="mt-0.5 text-[13px] text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  )
}

export default function Relationships() {
  const { id = 'john-smith' } = useParams()
  const navigate = useNavigate()
  const [vacio, setVacio] = useState(false)
  const [editando, setEditando] = useState<string | null>(null)
  const [relaciones, setRelaciones] = useState(RELACIONES)

  const borrar = (p: Persona) => {
    const indice = relaciones.findIndex((x) => x.id === p.id)
    setRelaciones((prev) => prev.filter((x) => x.id !== p.id))
    aviso.ok(\`Relationship with \${p.name} was deleted.\`, {
      label: 'Undo',
      onClick: () => setRelaciones((prev) => [...prev.slice(0, indice), p, ...prev.slice(indice)]),
    })
  }

  return (
    <div className={CONTENEDOR_PAGINA}>

      {/* Único rastro de navegación que queda arriba: la vuelta a la tabla.
          El breadcrumb completo repetía lo que ya dice el panel lateral. */}
      <Link
        to="/patients"
        className="text-dash-blue mb-3 inline-flex items-center gap-1 text-sm hover:underline"
      >
        <ChevronLeft className="size-4" /> Patients
      </Link>
      <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-start">
        <PatientSidePanel
          name="John Smith"
          initials="JS"
          section="Relationships & Billing"
          basePath={\`/patients/\${id}\`}
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <PageTitle>Relationships &amp; Billing</PageTitle>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setVacio((v) => !v)}
                className="rounded-md border border-line bg-white px-3 py-1.5 text-[11px] font-medium text-ink-muted hover:bg-surface-subtle"
              >
                {vacio ? 'Ver poblado' : 'Ver estado vacío'}
              </button>
              {/* El Figma diseña "Add Relationship" pero no dibuja de dónde se
                  entra. Este botón es una decisión propia — anomalía 42. */}
              <Link
                to={\`/patients/\${id}/relationships/new\`}
                data-tour="pat-add-relationship"
                className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 items-center gap-1.5 rounded-md px-4 text-[13px] font-medium text-white transition-colors"
              >
                <Plus className="size-4" /> Add Relationship
              </Link>
            </div>
          </div>

          {vacio ? (
            <div className="mt-4 flex min-h-[460px] rounded-lg border border-line bg-white">
              <EmptyState
                icon={Users}
                title="No relationships yet"
                detail="This patient doesn't have any related contacts or household members yet."
                accion={{ label: 'Add Relationship', onClick: () => navigate(\`/patients/\${id}/relationships/new\`) }}
              />
            </div>
          ) : (
            <>
              <div className="mt-4 flex flex-col gap-4">
                {relaciones.length === 0 ? (
                  <div className="rounded-lg border border-line bg-white">
                    <EmptyState icon={Users} title="No related contacts" detail="Every relationship was removed." />
                  </div>
                ) : (
                  relaciones.map((p) => (
                    <PersonaCard
                      key={p.id}
                      p={p}
                      onEdit={() => setEditando(p.name)}
                      onDelete={() => borrar(p)}
                    />
                  ))
                )}
              </div>

              <h2 className="mt-8 text-xl leading-none font-bold text-ink">
                Household/Same Guarantor Patients
              </h2>
              <div className="mt-4 flex flex-col gap-4">
                {HOUSEHOLD.map((p) => <PersonaCard key={p.id} p={p} />)}
              </div>
            </>
          )}
        </div>
      </div>

      {editando && (
        <EditRelationshipModal
          persona={DIRECTORIO.find((x) => x.name === editando) ?? DIRECTORIO[1]}
          onClose={() => setEditando(null)}
        />
      )}
    </div>
  )
}
`})))()}var ci;function li(){return(li=e((()=>{ci=`import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, Calendar, DollarSign, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PageTitle } from '@/components/ui/page-title'
import { PatientSidePanel } from '@/components/patients/PatientSidePanel'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'

/* Figma 3768:803852 (poblado) y 3769:808875 (vacío).
   Sección "Patient Profile — Treatment Plan & Documents". */

type Estado = 'Completed' | 'Expired'

type Plan = {
  patient: string
  initials: string
  code: string
  name: string
  progress: number
  note: string
  estado: Estado
  createdOn: string
  total: string
}

const BADGE: Record<Estado, string> = {
  Completed: 'border-dash-ok-fg bg-dash-ok-bg text-dash-ok-fg',
  Expired: 'border-dash-bad-fg bg-dash-bad-bg text-dash-bad-fg',
}

const base = {
  patient: 'Sarah Mitchell', initials: 'SM',
  code: 'TO01 - Acute / Emergency', name: 'Root Canal Treatment',
  createdOn: 'Jun 3, 2026', total: '$1,850.00',
}
const PLANS: Plan[] = [
  { ...base, progress: 100, note: 'Overall completion: 100%', estado: 'Completed' },
  { ...base, progress: 100, note: 'Overall completion: 100%', estado: 'Completed' },
  { ...base, progress: 100, note: 'Overall completion: 100%', estado: 'Completed' },
  { ...base, progress: 100, note: 'Overall completion: 100%', estado: 'Completed' },
  /* El badge dice "Expired" pero la nota dice "Cancelled". Es del Figma. */
  { ...base, progress: 100, note: 'Cancelled', estado: 'Expired' },
  { ...base, progress: 100, note: 'Overall completion: 100%', estado: 'Completed' },
  { ...base, progress: 100, note: 'Overall completion: 100%', estado: 'Completed' },
  { ...base, progress: 100, note: 'Overall completion: 100%', estado: 'Completed' },
]

function TreatmentCard({ plan }: { plan: Plan }) {
  const rojo = plan.estado === 'Expired'
  return (
    <article className="overflow-hidden rounded-lg border border-line bg-white">
      <header className="flex items-center gap-3 px-4 py-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#eff4ff] text-xs font-semibold text-[#0056ef]">
          {plan.initials}
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-[13px] font-bold text-ink">{plan.patient}</span>
          <span className="block text-[11px] text-ink-muted">Patient</span>
        </span>
        <span className={cn('shrink-0 rounded-full border px-2.5 py-[2px] text-[11px] font-semibold', BADGE[plan.estado])}>
          {plan.estado}
        </span>
      </header>

      <div className="bg-surface-subtle px-4 py-3">
        <p className="text-[11px] font-medium text-ink-muted">{plan.code}</p>
        <button className="mt-1 text-[13px] font-bold text-[#0056ef] hover:underline">
          {plan.name}
        </button>
        <div className="mt-2.5 h-[3px] w-full rounded-full bg-line">
          <div
            className="h-full rounded-full"
            style={{ width: \`\${plan.progress}%\`, backgroundColor: rojo ? '#ef4444' : '#28c563' }}
          />
        </div>
        <p className="mt-1.5 text-[11px] text-ink-faint">{plan.note}</p>
      </div>

      <footer className="flex items-center gap-8 px-4 py-3">
        <span className="leading-tight">
          <span className="block text-[11px] text-ink-muted">Created On</span>
          <span className="mt-0.5 flex items-center gap-1.5 text-[13px] font-semibold text-ink">
            <Calendar className="size-3.5 text-[#0056ef]" /> {plan.createdOn}
          </span>
        </span>
        <span className="leading-tight">
          <span className="block text-[11px] text-ink-muted">Total Amount</span>
          <span className="mt-0.5 flex items-center gap-1.5 text-[13px] font-semibold text-ink">
            <DollarSign className="size-3.5 text-[#0056ef]" /> {plan.total}
          </span>
        </span>
      </footer>
    </article>
  )
}

export default function Treatments() {
  const { id = 'john-smith' } = useParams()
  const [vacio, setVacio] = useState(false)

  return (
    <div className={CONTENEDOR_PAGINA}>

      {/* Único rastro de navegación que queda arriba: la vuelta a la tabla.
          El breadcrumb completo repetía lo que ya dice el panel lateral. */}
      <Link
        to="/patients"
        className="text-dash-blue mb-3 inline-flex items-center gap-1 text-sm hover:underline"
      >
        <ChevronLeft className="size-4" /> Patients
      </Link>
      <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-start">
        <PatientSidePanel
          name="John Smith"
          initials="JS"
          section="Treatments"
          basePath={\`/patients/\${id}\`}
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            {/* El título dice "Treatments plan" y el breadcrumb "Treatment plan". */}
            <PageTitle>Treatments plan</PageTitle>
            <button
              onClick={() => setVacio((v) => !v)}
              className="rounded-md border border-line bg-white px-3 py-1.5 text-[11px] font-medium text-ink-muted hover:bg-surface-subtle"
            >
              {vacio ? 'Ver poblado' : 'Ver estado vacío'}
            </button>
          </div>

          {vacio ? (
            <div className="mt-4 flex min-h-[560px] flex-col items-center justify-center rounded-lg border border-line bg-white">
              <span className="flex size-11 items-center justify-center rounded-lg bg-[#eff4ff]">
                <Circle className="size-4 fill-dash-blue text-dash-blue" />
              </span>
              <p className="mt-3 text-[15px] font-bold text-ink">No accepted treatment plans</p>
              <p className="mt-1 max-w-[280px] text-center text-xs text-ink-faint">
                This patient doesn&apos;t have any accepted treatment plans yet.
              </p>
            </div>
          ) : (
            <div className="mt-4 grid gap-5 lg:grid-cols-2">
              {PLANS.map((p, i) => <TreatmentCard key={i} plan={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
`})))()}var ui;function di(){return(di=e((()=>{ui=`import { useState } from 'react'
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
     esa cuenta puntual. Sólo \`nombre\` y los campos de Subscription/Owner
     existen en \`CUENTAS\`; el resto son placeholders vacíos, mismo criterio
     de "no inventar" que ya sigue Accounts.tsx. */

const TABS = ['Information', 'Subscription', 'Owner'] as const
type Tab = (typeof TABS)[number]

type EstadoSuscripcion = 'Active' | 'Cancelled'
const ESTADO_TONO: Record<EstadoSuscripcion, PillTone> = { Active: 'success', Cancelled: 'danger' }

const HISTORIAL_PROPIO: { plan: string; estado: EstadoSuscripcion; vence: string; licencias: string; creado: string }[] = [
  { plan: 'Prueba Red', estado: 'Active', vence: '31/12/2026', licencias: '3 Used / 167 Total', creado: '06/08/2026' },
  { plan: 'Confidentally Individual User', estado: 'Cancelled', vence: '17/07/2027', licencias: '3 Used / 167 Total', creado: '17/07/2026' },
]

const iniciales = (nombre: string) => nombre.trim().split(/\\s+/).slice(0, 2).map((p) => p[0]).join('').toUpperCase()

/* TextField/SelectField sólo quedan controlados -y muestran el \`value\` que
   se les pasa- cuando también reciben \`onChange\`; sin eso lo ignoran del
   todo y arrancan vacíos (mismo comportamiento en Employees.tsx). */
export function SettingsAccount() {
  const { accountId } = useParams()
  const cuenta = accountId ? CUENTAS.find((c) => c.id === accountId) : undefined

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
    <div className="px-4 py-6 sm:px-8">
      <h1 className="text-2xl font-bold text-ink">Edit Account</h1>
      <p className="mt-1 text-sm text-ink-muted">Manage your dental clinic general settings, upload custom graphics, and specify billing parameters.</p>

      <div className="mt-4 flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-lg bg-surface-slate p-1">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              'h-8 shrink-0 rounded-md px-3 text-xs font-medium whitespace-nowrap transition-colors',
              tab === t ? 'bg-dash-blue text-white' : 'text-ink-slate hover:text-ink-soft',
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
              <h2 className="text-base font-bold text-ink">Subscription Summary</h2>
              <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-line bg-white p-4">
                  <span className="flex items-center gap-1.5 text-[13px] text-ink-muted">
                    <CreditCard className="size-3.5" /> Current Plan
                  </span>
                  <span className="mt-2 block text-[19px] font-bold text-ink">
                    {cuenta ? (cuenta.plan === '—' ? '—' : cuenta.plan) : 'Prueba Red'}
                  </span>
                  <span className="mt-1 block text-[12px] text-ink-faint">Plan currently assigned to the account</span>
                </div>
                <div className="rounded-lg border border-line bg-white p-4">
                  <span className="text-[13px] text-ink-muted">Licenses</span>
                  <span className="mt-2 block text-[19px] font-bold text-ink tabular-nums">
                    {cuenta ? (cuenta.licencias === '—' ? '—' : cuenta.licencias) : '3 Used / 170 Total'}
                  </span>
                  <span className="mt-1 block text-[12px] text-ink-faint">167 available licenses based on active and suspended employees.</span>
                </div>
                <div className="rounded-lg border border-line bg-white p-4">
                  <span className="text-[13px] text-ink-muted">Expired on</span>
                  <span className="mt-2 block text-[19px] font-bold text-ink tabular-nums">
                    {cuenta ? (cuenta.vence || '—') : '31/12/2026'}
                  </span>
                  <span className="mt-1 block text-[12px] text-ink-faint">Subscription end date</span>
                </div>
                <div className="rounded-lg border border-line bg-white p-4">
                  <span className="text-[13px] text-ink-muted">Status</span>
                  <span className="mt-2 block">
                    {cuenta ? (
                      cuenta.estado in ESTADO_TONO_CUENTA ? (
                        <span className="text-[19px] font-bold text-ink">{cuenta.estado}</span>
                      ) : <span className="text-[19px] font-bold text-ink-faint">—</span>
                    ) : (
                      <span className="text-[19px] font-bold text-ink">Active</span>
                    )}
                  </span>
                  <span className="mt-1 block text-[12px] text-ink-faint">Current subscription status</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-base font-bold text-ink">Subscription History</h2>
              <div className="mt-3 overflow-x-auto rounded-lg border border-line-row bg-white">
                {cuenta ? (
                  <EmptyState icon={CreditCard} title="No billing history" detail="This account doesn't have a subscription history yet." className="border-0" />
                ) : (
                  <div className="min-w-[620px]">
                    <div className="flex items-center gap-3 bg-surface-alt px-3 py-2.5 text-[11px] font-semibold text-ink-muted uppercase">
                      <span className="min-w-0 flex-1">Plan</span>
                      <span className="w-[90px] shrink-0">Status</span>
                      <span className="w-[100px] shrink-0">Expired on</span>
                      <span className="w-[140px] shrink-0">License</span>
                      <span className="w-[100px] shrink-0">Created at</span>
                    </div>
                    {HISTORIAL_PROPIO.map((h, i) => (
                      <div key={i} className="flex items-center gap-3 border-t border-line-row px-3 py-2.5 text-[13px] text-ink-soft">
                        <span className="min-w-0 flex-1 truncate font-medium text-ink">{h.plan}</span>
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
                      <span className="inline-flex items-center gap-1 rounded-full border border-purple-fg bg-purple-bg px-2 py-[2px] text-[11px] font-semibold text-purple-fg">
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
                  <label className="mb-4 flex items-center gap-2 text-[13px] text-ink-soft">
                    <input
                      type="checkbox"
                      checked={copiarContacto}
                      onChange={(e) => setCopiarContacto(e.target.checked)}
                      className="accent-dash-blue size-4 rounded border-line"
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
                      label="ZIP Code" required options={['33101', '90001']}
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

      <div className="mt-5 flex justify-end gap-3">
        <FormFooter
          onCancel={() => aviso.info('Changes discarded.')}
          onSave={() => aviso.ok('Account information saved.')}
        />
      </div>
    </div>
  )
}
`})))()}var fi;function pi(){return(pi=e((()=>{fi=`import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EmptyState } from '@/components/ui/empty-state'
import { SearchButton } from '@/components/ui/search-button'
import { aviso } from '@/components/ui/toaster'
import { Pagination } from '@/components/patients/ledger/Pagination'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { Pill, type PillTone } from '@/components/ui/pill'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'

/* Settings → Accounts. Ver design-reference/figma/modulos/settings-accounts.md.

   \`Cuenta\`, \`CUENTAS\` y el tono de \`estado\` se exportan: Julián marcó que en
   el sitio real (red.dev.confidentally.com/settings/account) entrar a una
   cuenta de esta lista lleva a SU configuración -las mismas tres pestañas
   Information/Subscription/Owner que ve el usuario logueado para la propia,
   en pages/settings/Account.tsx-, no a un placeholder. */
export type EstadoCuenta = 'Active' | 'Draft' | 'Pending'

export const ESTADO_TONO: Record<EstadoCuenta, PillTone> = {
  Active: 'success',
  Draft: 'neutral',
  Pending: 'warning',
}

export type Cuenta = {
  id: string
  nombre: string
  plan: string
  suscripcion: string
  vence: string
  estadoSuscripcion: string
  locaciones: number
  empleados: number
  licencias: string
  duenos: string
  estado: EstadoCuenta
}

/* El guion largo es el vacío del diseño: hay cuentas sin plan, sin dueño y
   sin licencias, y se replican así en vez de inventarles un valor. */
export const CUENTAS: Cuenta[] = [
  { id: 'c1', nombre: 'aasdasda', plan: 'testing betsy', suscripcion: 'BET', vence: '09/30/2026', estadoSuscripcion: 'ACTIVE', locaciones: 0, empleados: 0, licencias: '5', duenos: '—', estado: 'Active' },
  { id: 'c2', nombre: 'alo com dieam', plan: '—', suscripcion: '—', vence: '', estadoSuscripcion: '', locaciones: 0, empleados: 0, licencias: '—', duenos: 'jojojo jojojo', estado: 'Draft' },
  { id: 'c3', nombre: 'Betsy account', plan: 'Prueba Red', suscripcion: 'PBR', vence: '11/30/2026', estadoSuscripcion: 'ACTIVE', locaciones: 1, empleados: 2, licencias: '170', duenos: 'Betsy Owner owww', estado: 'Active' },
  { id: 'c4', nombre: 'betsy test owner', plan: '—', suscripcion: '—', vence: '', estadoSuscripcion: '', locaciones: 0, empleados: 0, licencias: '—', duenos: 'bridge youandl', estado: 'Draft' },
  { id: 'c5', nombre: 'bla bla bla', plan: '—', suscripcion: '—', vence: '', estadoSuscripcion: '', locaciones: 0, empleados: 0, licencias: '—', duenos: '—', estado: 'Draft' },
  { id: 'c6', nombre: 'caba', plan: 'testing betsy', suscripcion: 'BET', vence: '07/31/2026', estadoSuscripcion: 'CANCELLED', locaciones: 0, empleados: 0, licencias: '5', duenos: '—', estado: 'Active' },
  { id: 'c7', nombre: 'clinic 002', plan: 'Confidentally Basic Pack', suscripcion: 'CBP', vence: '11/28/2026', estadoSuscripcion: 'ACTIVE', locaciones: 0, empleados: 0, licencias: '3', duenos: '—', estado: 'Pending' },
  { id: 'c8', nombre: 'clinic 003', plan: 'Confidentally Basic Pack', suscripcion: 'CBP', vence: '07/24/2027', estadoSuscripcion: 'ACTIVE', locaciones: 0, empleados: 0, licencias: '3', duenos: 'jonatan ale', estado: 'Pending' },
  { id: 'c9', nombre: 'clinic007', plan: 'Prueba Red', suscripcion: 'PBR', vence: '01/31/2027', estadoSuscripcion: 'ACTIVE', locaciones: 1, empleados: 1, licencias: '170', duenos: 'juan quintero', estado: 'Active' },
  { id: 'c10', nombre: 'Clinica de Abril', plan: 'Confidentally Premium Abril', suscripcion: 'ABR', vence: '08/07/2026', estadoSuscripcion: 'EXPIRED', locaciones: 0, empleados: 0, licencias: '12', duenos: 'Maria Viola', estado: 'Pending' },
  { id: 'c11', nombre: 'Clinica Norte', plan: 'Prueba Red', suscripcion: 'PBR', vence: '02/28/2027', estadoSuscripcion: 'ACTIVE', locaciones: 2, empleados: 6, licencias: '40', duenos: 'Nadia Duarte', estado: 'Active' },
  { id: 'c12', nombre: 'Consultorio Sur', plan: 'Confidentally Basic Pack', suscripcion: 'CBP', vence: '05/12/2027', estadoSuscripcion: 'ACTIVE', locaciones: 1, empleados: 3, licencias: '8', duenos: 'Elias Aguirre', estado: 'Pending' },
]

const FILTROS = ['All', 'Active', 'Draft', 'Pending'] as const

const COLS = {
  nombre: 'w-[120px] shrink-0',
  plan: 'w-[130px] shrink-0',
  suscripcion: 'w-[90px] shrink-0',
  vence: 'w-[95px] shrink-0',
  estadoSub: 'w-[110px] shrink-0',
  locaciones: 'w-[80px] shrink-0',
  empleados: 'w-[85px] shrink-0',
  licencias: 'w-[75px] shrink-0',
  duenos: 'min-w-[110px] flex-1',
  estado: 'w-[85px] shrink-0',
  acciones: 'w-[60px] shrink-0 text-right',
}

export function SettingsAccounts() {
  const [q, setQ] = useState('')
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]>('All')
  const [porPagina, setPorPagina] = useState(10)
  const [pagina, setPagina] = useState(1)

  const filtradas = useMemo(
    () => CUENTAS.filter(
      (c) =>
        (filtro === 'All' || c.estado === filtro) &&
        \`\${c.nombre} \${c.plan} \${c.duenos}\`.toLowerCase().includes(q.trim().toLowerCase()),
    ),
    [q, filtro],
  )
  const paginas = Math.max(1, Math.ceil(filtradas.length / porPagina))
  const actual = Math.min(pagina, paginas)
  const visibles = filtradas.slice((actual - 1) * porPagina, actual * porPagina)
  const desde = filtradas.length === 0 ? 0 : (actual - 1) * porPagina + 1

  return (
    <div className="px-4 py-6 sm:px-8">
      <SettingsPageHeader
        titulo="Accounts overview"
        bajada="View and manage all accounts across the platform."
        accion={(
          <button
            type="button"
            onClick={() => aviso.info('New account — coming soon.')}
            className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 shrink-0 items-center gap-2 rounded-md px-4 text-[13px] font-medium text-white transition-colors"
          >
            <Plus className="size-4" /> New Account
          </button>
        )}
      >
        <div className="relative min-w-0 flex-1 sm:max-w-[300px]">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setPagina(1) }}
            placeholder="Search..."
            className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
          />
        </div>
        <SearchButton onClick={() => setPagina(1)} className="h-9" />
        <select
          value={filtro}
          onChange={(e) => { setFiltro(e.target.value as typeof filtro); setPagina(1) }}
          aria-label="Filter by status"
          className="focus:border-dash-blue h-9 shrink-0 rounded-md border border-line bg-white px-3 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] focus:outline-none"
        >
          {FILTROS.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      </SettingsPageHeader>

      <div className="mt-4 w-full overflow-x-auto rounded-lg border border-line-row bg-white">
        <div className="min-w-[1080px]">
          <div className="flex items-center gap-3 bg-surface-alt px-3 py-3 text-[11px] font-semibold text-ink-muted">
            <span className={COLS.nombre}>Name</span>
            <span className={COLS.plan}>Plan</span>
            <span className={COLS.suscripcion}>Subscription</span>
            <span className={COLS.vence}>Expires on</span>
            <span className={COLS.estadoSub}>Subscription Status</span>
            <span className={COLS.locaciones}>Locations</span>
            <span className={COLS.empleados}>Employees</span>
            <span className={COLS.licencias}>Licenses</span>
            <span className={COLS.duenos}>Owners</span>
            <span className={COLS.estado}>Status</span>
            <span className={COLS.acciones}>Actions</span>
          </div>

          {visibles.length === 0 ? (
            <EmptyState icon={Building2} title="No accounts" detail="Nothing matches the current search or filter." />
          ) : (
            visibles.map((c) => (
              <div key={c.id} className="flex items-center gap-3 border-t border-line-row px-3 py-3 text-[13px] text-ink-soft">
                <Link to={\`/settings/accounts/\${c.id}\`} className={cn(COLS.nombre, 'text-dash-blue truncate font-medium hover:underline')} title={c.nombre}>
                  {c.nombre}
                </Link>
                <span className={cn(COLS.plan, 'truncate font-medium text-ink')} title={c.plan}>{c.plan}</span>
                <span className={COLS.suscripcion}>{c.suscripcion}</span>
                <span className={COLS.vence}>{c.vence}</span>
                <span className={COLS.estadoSub}>{c.estadoSuscripcion}</span>
                <span className={COLS.locaciones}>{c.locaciones}</span>
                <span className={COLS.empleados}>{c.empleados}</span>
                <span className={COLS.licencias}>{c.licencias}</span>
                <span className={cn(COLS.duenos, 'truncate')} title={c.duenos}>{c.duenos}</span>
                <span className={COLS.estado}>
                  <Pill tone={ESTADO_TONO[c.estado]}>{c.estado}</Pill>
                </span>
                <span className={cn(COLS.acciones, 'flex justify-end')}>
                  <RowActionsMenu label={c.nombre}>
                    <DropdownMenuItem onSelect={() => aviso.info(\`Editing \${c.nombre}.\`)}>Edit account</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => aviso.info(\`Licenses for \${c.nombre}.\`)}>Manage licenses</DropdownMenuItem>
                    <DropdownMenuItem variant="destructive" onSelect={() => aviso.warn(\`\${c.nombre} suspended.\`)}>Suspend</DropdownMenuItem>
                  </RowActionsMenu>
                </span>
              </div>
            ))
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-row px-3 py-3">
            <span className="flex items-center gap-3 text-xs font-semibold text-ink-muted">
              Showing {desde} to {desde === 0 ? 0 : desde + visibles.length - 1} of {filtradas.length} results
              {/* "Mostrar" en castellano en una pantalla en inglés: así viene
                  en el diseño y el contenido se replica tal cual. */}
              <span className="flex items-center gap-2 font-normal">
                Mostrar:
                <select
                  value={porPagina}
                  onChange={(e) => { setPorPagina(Number(e.target.value)); setPagina(1) }}
                  aria-label="Rows per page"
                  className="focus:border-dash-blue h-7 rounded-md border border-line bg-white px-2 text-[12px] focus:outline-none"
                >
                  {[10, 25, 50].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </span>
            </span>
            <Pagination pagina={actual} paginas={paginas} onChange={setPagina} />
          </div>
        </div>
      </div>
    </div>
  )
}
`})))()}var mi;function hi(){return(hi=e((()=>{mi=`import { useState } from 'react'
import {
  Search, Plus, Bold, Italic, Underline, Heading1, Heading2,
  Pilcrow, List, ListOrdered, X, Eye, Power, PowerOff,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Pill } from '@/components/ui/pill'
import { Switch } from '@/components/ui/switch'
import { SelectField } from '@/components/patients/form'
import { EmptyState } from '@/components/ui/empty-state'
import { aviso } from '@/components/ui/toaster'
import { ConsentDocument } from '@/components/settings/ConsentDocument'

/* Settings → Consents. Figma 4106:170620 ("New Consent Template"): lista de
   templates a la izquierda, editor del texto en el medio, preview en vivo a
   la derecha -las tres variantes del frame son el mismo estado con y sin el
   error de validación, no pantallas distintas; layout replicado, contenido
   simplificado donde hacía falta-.

   Opción 1 de las tres que planteó Julián para el flujo de consentimientos
   -la única con diseño de Figma-. Reusa piezas del sistema: Pill para los
   estados, el mismo anillo azul de fila seleccionada que usa \`Seleccionable\`
   en TreatmentPlanPicker.tsx, y SelectField para "Current Title" -mismo
   quirk que "First Name" en Employees.tsx: acá los campos son choices, no
   texto libre-.

   El Figma muestra "Consent text" como un solo bloque de texto enriquecido
   con encabezados inline (Nature of procedure, Risk and complications). Sin
   un editor de texto enriquecido real en este prototipo, se separaron en dos
   campos estructurados con su propio label -mismo contenido, modelo de datos
   más simple-, bajo un solo toolbar decorativo (ver comentario en
   ToolbarFormato). El heading de la pantalla queda fijo en "New Consent
   Template" aunque haya un template cargado, tal cual las tres variantes del
   frame. */

type Procedimiento = { codigo: string; nombre: string }
const PROCEDIMIENTOS_DISPONIBLES: Procedimiento[] = [
  { codigo: 'D7240', nombre: 'Removal of impacted tooth' },
  { codigo: 'D3948', nombre: 'Extraction, angled tooth' },
  { codigo: 'D3310', nombre: 'Root canal therapy, anterior' },
  { codigo: 'D3320', nombre: 'Root canal therapy, premolar' },
  { codigo: 'D2740', nombre: 'Crown – porcelain/ceramic' },
]
const procedimiento = (codigo: string) => PROCEDIMIENTOS_DISPONIBLES.find((p) => p.codigo === codigo)

/* \`activo\` y \`sistema\` son independientes: "System" dice de dónde viene el
   template (viene con el producto), "activo" si hoy se ofrece o no. Un
   template de sistema también se puede desactivar. */
type ConsentTemplate = {
  id: string
  titulo: string
  activo: boolean
  sistema: boolean
  procedimientos: string[]
  naturaleza: string
  riesgos: string
}

const TEMPLATES_INICIALES: ConsentTemplate[] = [
  {
    id: 't1',
    titulo: 'Extraction Informed Consent',
    activo: true,
    sistema: false,
    procedimientos: ['D7240', 'D3948'],
    naturaleza: 'The proposed treatment has been explained to me in a way that I understood, including what will be done and why it is recommended.',
    riesgos: 'Pain, swelling, bleeding, or bruising.\\nInfection or delayed healing.\\nReaction to medications or anesthesia.\\nNeed for additional treatment if complications occur.',
  },
  {
    id: 't2',
    titulo: 'Root Canal Consent',
    activo: true,
    sistema: false,
    procedimientos: ['D3310'],
    naturaleza: 'The proposed treatment has been explained to me in a way that I understood, including what will be done and why it is recommended.',
    riesgos: 'Alternatives to the proposed treatment, including the option of no treatment, have been discussed with me.\\nPossible instrument separation or need for retreatment.\\nPersistent pain or swelling after treatment.',
  },
  {
    id: 't3',
    titulo: 'Root Canal Consent – Molar',
    activo: true,
    sistema: true,
    procedimientos: ['D3320'],
    naturaleza: 'The proposed treatment has been explained to me in a way that I understood, including what will be done and why it is recommended.',
    riesgos: 'Alternatives to the proposed treatment, including the option of no treatment, have been discussed with me.\\nPossible instrument separation or need for retreatment.',
  },
]

const TITULOS_SUGERIDOS = [
  'Extraction Informed Consent', 'Root Canal Consent', 'Root Canal Consent – Molar',
  'Crown & Bridge Consent', 'Implant Consent', 'HIPAA Acknowledgment',
]

const FILTROS = ['Active', 'Inactive', 'System', 'All'] as const
type Filtro = (typeof FILTROS)[number]

const coincideFiltro = (t: ConsentTemplate, f: Filtro) =>
  f === 'All' || (f === 'Active' && t.activo) || (f === 'Inactive' && !t.activo) || (f === 'System' && t.sistema)

type Borrador = {
  titulo: string
  procedimientos: string[]
  naturaleza: string
  riesgos: string
}

const BORRADOR_VACIO: Borrador = { titulo: '', procedimientos: [], naturaleza: '', riesgos: '' }
const aBorrador = (t: ConsentTemplate): Borrador => ({
  titulo: t.titulo, procedimientos: t.procedimientos, naturaleza: t.naturaleza, riesgos: t.riesgos,
})

/* Toolbar decorativo: mismo trato que el botón "Select File" de Documents en
   Employees.tsx -avisa que no está disponible en vez de fingir que hace
   algo-. No hay editor de texto enriquecido real en este prototipo. */
function ToolbarFormato() {
  const iconos = [Bold, Italic, Underline, Heading1, Heading2, Pilcrow, List, ListOrdered]
  return (
    <div className="flex items-center gap-0.5 rounded-t-md border border-b-0 border-line bg-surface-subtle px-2 py-1.5">
      {iconos.map((Icono, i) => (
        <button
          key={i}
          type="button"
          onClick={() => aviso.info('Rich text formatting is not available in this release.')}
          className="rounded p-1.5 text-ink-medium hover:bg-black/5"
        >
          <Icono className="size-3.5" />
        </button>
      ))}
      <span className="ml-auto pr-1 text-[11px] text-ink-faint max-sm:hidden">Basic formatting only</span>
    </div>
  )
}

export function SettingsConsents() {
  const [templates, setTemplates] = useState(TEMPLATES_INICIALES)
  const [q, setQ] = useState('')
  const [filtro, setFiltro] = useState<Filtro>('Active')
  /* Templates recién activados/desactivados: se quedan en la lista aunque ya
     no cumplan el filtro, para que se vea el interruptor cambiar en vez de
     que la tarjeta desaparezca de golpe. Se limpia al cambiar de filtro o
     de búsqueda. */
  const [fijados, setFijados] = useState<string[]>([])
  const [actualId, setActualId] = useState<string | null>('t1')
  const [borrador, setBorrador] = useState<Borrador>(aBorrador(TEMPLATES_INICIALES[0]))
  const [intentado, setIntentado] = useState(false)
  const [buscarProcedimiento, setBuscarProcedimiento] = useState('')
  const [vistaPaciente, setVistaPaciente] = useState(false)

  const visibles = templates.filter(
    (t) => (coincideFiltro(t, filtro) || fijados.includes(t.id)) && t.titulo.toLowerCase().includes(q.trim().toLowerCase()),
  )
  const actual = templates.find((t) => t.id === actualId)

  const alternarActivo = (id: string) => {
    const t = templates.find((x) => x.id === id)
    if (!t) return
    setTemplates((ts) => ts.map((x) => (x.id === id ? { ...x, activo: !x.activo } : x)))
    setFijados((f) => (f.includes(id) ? f : [...f, id]))
    aviso.ok(\`Consent template \${t.activo ? 'deactivated' : 'activated'}.\`)
  }

  const elegir = (t: ConsentTemplate) => {
    setActualId(t.id)
    setBorrador(aBorrador(t))
    setIntentado(false)
  }

  const nuevoTemplate = () => {
    setActualId(null)
    setBorrador(BORRADOR_VACIO)
    setIntentado(false)
  }

  const cancelar = () => {
    setBorrador(actual ? aBorrador(actual) : BORRADOR_VACIO)
    setIntentado(false)
    aviso.info('Changes discarded.')
  }

  const guardar = () => {
    setIntentado(true)
    if (!borrador.titulo || borrador.procedimientos.length === 0) return

    if (actualId) {
      setTemplates((ts) => ts.map((t) => (t.id === actualId ? { ...t, ...borrador } : t)))
      aviso.ok('Consent template updated.')
    } else {
      const id = \`t\${Date.now()}\`
      setTemplates((ts) => [...ts, { id, activo: true, sistema: false, ...borrador }])
      setActualId(id)
      aviso.ok('Consent template created.')
    }
    setIntentado(false)
  }

  const opcionesProcedimiento = PROCEDIMIENTOS_DISPONIBLES.filter(
    (p) => !borrador.procedimientos.includes(p.codigo)
      && \`\${p.codigo} \${p.nombre}\`.toLowerCase().includes(buscarProcedimiento.trim().toLowerCase()),
  )

  return (
    <div className="@container px-4 py-6 sm:px-8">
      <h1 className="text-2xl font-bold text-ink">Consent Templates</h1>
      <p className="mt-1 text-sm text-ink-muted">Create a standard consent document and assign it to one or more procedures.</p>

      <div className="mt-4 grid grid-cols-1 gap-4 @3xl:grid-cols-[240px_minmax(0,1fr)] @5xl:grid-cols-[260px_minmax(0,1fr)_minmax(0,1.15fr)]">
        {/* ── Lista ─────────────────────────────────────────────────── */}
        <section className="flex flex-col gap-3 self-start rounded-xl border border-line bg-white p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-bold text-ink">Templates</h2>
            <button
              type="button"
              onClick={nuevoTemplate}
              aria-label="New Template"
              className="bg-dash-blue hover:bg-dash-blue-hover flex h-7 items-center gap-1 rounded-md px-2.5 text-[12px] font-medium text-white transition-colors"
            >
              <Plus className="size-3.5" /> New template
            </button>
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
            <input
              value={q}
              onChange={(e) => { setQ(e.target.value); setFijados([]) }}
              placeholder="Search templates..."
              className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1 rounded-lg bg-surface-slate p-1">
            {FILTROS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => { setFiltro(f); setFijados([]) }}
                className={cn(
                  'h-7 flex-1 rounded-md text-xs font-medium transition-colors',
                  filtro === f ? 'bg-dash-blue text-white' : 'text-ink-slate hover:text-ink-soft',
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex max-h-[520px] flex-col gap-2 overflow-y-auto">
            {visibles.length === 0 ? (
              <EmptyState icon={Search} title="No templates" detail="Nothing matches this search or filter." className="py-6" />
            ) : (
              visibles.map((t) => (
                <div
                  key={t.id}
                  className={cn(
                    'flex items-start gap-2 rounded-lg border px-3 py-2.5 transition-colors',
                    actualId === t.id ? 'border-dash-blue bg-[#f8faff]' : 'border-line bg-white hover:bg-surface-subtle',
                  )}
                >
                  <button
                    type="button"
                    onClick={() => elegir(t)}
                    className="flex min-w-0 flex-1 flex-col items-start gap-1 text-left"
                  >
                    <span className={cn('line-clamp-2 w-full text-[13px] font-bold', t.activo ? 'text-ink' : 'text-ink-faint')}>
                      {t.titulo}
                    </span>
                    <span className="flex flex-wrap items-center gap-1.5">
                      <Pill tone={t.activo ? 'success' : 'neutral'} size="sm">{t.activo ? 'Active' : 'Inactive'}</Pill>
                      {t.sistema && <Pill tone="info" size="sm">System</Pill>}
                      <span className="text-[11px] text-ink-muted">
                        {t.procedimientos.length} procedure{t.procedimientos.length === 1 ? '' : 's'}
                      </span>
                    </span>
                  </button>
                  <Switch
                    checked={t.activo}
                    onCheckedChange={() => alternarActivo(t.id)}
                    aria-label={\`\${t.activo ? 'Deactivate' : 'Activate'} \${t.titulo}\`}
                    className="mt-0.5"
                  />
                </div>
              ))
            )}
          </div>
        </section>

        {/* ── Editor ────────────────────────────────────────────────── */}
        <section className="flex flex-col gap-4 self-start rounded-xl border border-line bg-white p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-[200px] flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-ink">{actual ? 'Edit Template' : 'New Consent Template'}</h2>
                {actual && <Pill tone={actual.activo ? 'success' : 'neutral'} size="sm">{actual.activo ? 'Active' : 'Inactive'}</Pill>}
                {actual?.sistema && <Pill tone="info" size="sm">System</Pill>}
              </div>
              <p className="mt-0.5 text-xs text-ink-muted">
                {actual
                  ? 'Changes show in the preview as you type. Save to keep them.'
                  : 'Fill in the details and the text, then save to add it to the list.'}
              </p>
            </div>
            {actual && (
              <button
                type="button"
                onClick={() => alternarActivo(actual.id)}
                className={cn(
                  'flex h-9 shrink-0 items-center gap-1.5 rounded-md px-3 text-[13px] font-medium transition-colors',
                  actual.activo
                    ? 'border border-line bg-white shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] hover:bg-surface-subtle'
                    : 'bg-dash-blue hover:bg-dash-blue-hover text-white',
                )}
              >
                {actual.activo ? <PowerOff className="size-4" /> : <Power className="size-4" />}
                {actual.activo ? 'Deactivate template' : 'Activate template'}
              </button>
            )}
          </div>

          {intentado && (!borrador.titulo || borrador.procedimientos.length === 0) && (
            <div className="rounded-md border border-[#f3b6b6] bg-dash-bad-bg px-3 py-2.5 text-[12px] font-medium text-dash-bad-fg">
              All required fields marked with (*) must be completed before proceeding.
            </div>
          )}

          <SelectField
            label="Current Title"
            required
            options={TITULOS_SUGERIDOS}
            value={borrador.titulo}
            onChange={(v) => setBorrador((b) => ({ ...b, titulo: v }))}
            error={intentado && !borrador.titulo ? 'This field is required.' : undefined}
          />

          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-ink">
              Search Procedure<span className="text-required">*</span>
            </span>
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
              <input
                value={buscarProcedimiento}
                onChange={(e) => setBuscarProcedimiento(e.target.value)}
                placeholder="Search..."
                className={cn(
                  'h-9 w-full rounded-md border bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)]',
                  'placeholder:text-ink-faint focus:outline-none',
                  intentado && borrador.procedimientos.length === 0 ? 'border-field-error' : 'focus:border-dash-blue border-line',
                )}
              />
              {buscarProcedimiento && opcionesProcedimiento.length > 0 && (
                <div className="motion-safe:animate-[loc-in_120ms_ease-out] absolute top-[calc(100%+4px)] left-0 z-30 max-h-52 w-full overflow-y-auto rounded-md border border-line bg-white py-1 shadow-lg">
                  {opcionesProcedimiento.map((p) => (
                    <button
                      key={p.codigo}
                      type="button"
                      onClick={() => {
                        setBorrador((b) => ({ ...b, procedimientos: [...b.procedimientos, p.codigo] }))
                        setBuscarProcedimiento('')
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] hover:bg-surface-muted"
                    >
                      <span className="text-dash-blue font-semibold">{p.codigo}</span>
                      <span className="truncate text-ink-soft">{p.nombre}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {intentado && borrador.procedimientos.length === 0 ? (
              <span className="text-[11px] leading-[1.35] text-field-error">At least one procedure must be listed.</span>
            ) : (
              borrador.procedimientos.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {borrador.procedimientos.map((codigo) => (
                    <span key={codigo} className="text-dash-blue flex items-center gap-1.5 rounded-full bg-info-bg py-1 pr-1.5 pl-2.5 text-[12px] font-medium">
                      {codigo} - {procedimiento(codigo)?.nombre}
                      <button
                        type="button"
                        aria-label={\`Remove \${codigo}\`}
                        onClick={() => setBorrador((b) => ({ ...b, procedimientos: b.procedimientos.filter((c) => c !== codigo) }))}
                        className="rounded-full p-0.5 hover:bg-[#dbe6ff]"
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )
            )}
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-ink">Consent text</span>
            <ToolbarFormato />
            <div className="-mt-2 flex flex-col gap-3 rounded-b-md border border-t-0 border-line p-3">
              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold tracking-wide text-ink-muted uppercase">Nature of procedure</span>
                <textarea
                  rows={3}
                  value={borrador.naturaleza}
                  onChange={(e) => setBorrador((b) => ({ ...b, naturaleza: e.target.value }))}
                  placeholder="Describe the procedure in plain language..."
                  className="focus:border-dash-blue w-full resize-none rounded-md border border-line bg-white px-3 py-2 text-[13px] placeholder:text-ink-faint focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold tracking-wide text-ink-muted uppercase">Risk and complications</span>
                <textarea
                  rows={4}
                  value={borrador.riesgos}
                  onChange={(e) => setBorrador((b) => ({ ...b, riesgos: e.target.value }))}
                  placeholder={'One risk per line...'}
                  className="focus:border-dash-blue w-full resize-none rounded-md border border-line bg-white px-3 py-2 text-[13px] placeholder:text-ink-faint focus:outline-none"
                />
              </label>
            </div>
          </div>

          <div className="sticky bottom-0 z-10 -mx-4 -mb-4 flex justify-end gap-3 rounded-b-xl border-t border-line bg-white px-4 py-3 sm:-mx-5 sm:-mb-5 sm:px-5">
            <button type="button" onClick={cancelar} className="h-9 rounded-md border border-line bg-white px-6 text-[13px] font-medium shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] hover:bg-surface-subtle">
              Cancel
            </button>
            <button type="button" onClick={guardar} className="bg-dash-blue hover:bg-dash-blue-hover h-9 rounded-md px-6 text-[13px] font-medium text-white transition-colors">
              Save
            </button>
          </div>
        </section>

        {/* ── Preview ───────────────────────────────────────────────── */}
        <section className="self-start rounded-xl border border-line bg-[#f5f6f8] p-3 @3xl:col-start-2 @5xl:sticky @5xl:top-4 @5xl:col-start-3 @5xl:max-h-[calc(100vh-2rem)] @5xl:overflow-y-auto">
          <div className="flex items-center justify-between gap-2 px-1">
            <div>
              <h2 className="text-sm font-bold text-ink">Preview</h2>
              <p className="text-[11px] text-ink-muted">What the patient receives</p>
            </div>
            <button
              type="button"
              onClick={() => setVistaPaciente((v) => !v)}
              aria-pressed={vistaPaciente}
              className={cn(
                'flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors',
                vistaPaciente ? 'border-dash-blue bg-dash-blue text-white' : 'border-line bg-white text-ink-slate hover:text-ink-soft',
              )}
            >
              <Eye className="size-3.5" /> Patient View
            </button>
          </div>

          <div className="mt-3">
            <ConsentDocument
              titulo={borrador.titulo}
              procedimiento={borrador.procedimientos.length > 0 ? procedimiento(borrador.procedimientos[0])?.nombre : undefined}
              naturaleza={borrador.naturaleza}
              riesgos={borrador.riesgos}
              vistaPaciente={vistaPaciente}
            />
          </div>
        </section>
      </div>
    </div>
  )
}
`})))()}var gi;function _i(){return(_i=e((()=>{gi=`import { useMemo, useRef, useState } from 'react'
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
    () => filas.filter((e) => \`\${e.nombre} \${e.email} \${e.cargo}\`.toLowerCase().includes(q.trim().toLowerCase())),
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
    aviso.ok(\`\${e.nombre} was removed.\`, {
      label: 'Undo',
      onClick: () => setFilas((p) => [...p.slice(0, indice), e, ...p.slice(indice)]),
    })
  }

  /* "Remove Provider Role" no borra a la persona, sólo el rol: si hiciera lo
     mismo que Delete, dos ítems del mismo menú harían la misma acción. */
  const quitarRolProvider = (e: Empleado) => {
    setFilas((p) => p.map((x) => (x.id === e.id ? { ...x, esProvider: false } : x)))
    aviso.ok(\`\${e.nombre} is no longer a provider.\`)
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
                    <Checkbox on={marcada} onChange={(v) => alternarUna(e.id, v)} label={\`Select \${e.nombre}\`} />
                  </span>
                  <span className={cn('flex items-center gap-2.5', COLS.nombre)}>
                    <span className="bg-dash-count-bg text-dash-blue-hover flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold">
                      {e.iniciales}
                    </span>
                    {/* El nombre es el acceso a la ficha, como en la tabla de pacientes. */}
                    <Link to={\`/settings/team/\${e.id}\`} className="text-dash-blue truncate font-semibold hover:underline">
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
                        <Link to={\`/settings/team/\${e.id}\`}>
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
                          onSelect={() => aviso.info(\`\${accion} is not available in this release.\`)}
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
  const [foto, setFoto] = usePhoto(\`employee-photo:\${empleado.id}\`)
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
                 sistema -misma curva que \`fab-panel-in\`-, para que quede
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
                            onClick={() => aviso.info(\`\${b.sala}, \${b.horas}\`)}
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
`})))()}var vi;function yi(){return(yi=e((()=>{vi=`import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EmptyState } from '@/components/ui/empty-state'
import { SearchButton } from '@/components/ui/search-button'
import { Pagination } from '@/components/patients/ledger/Pagination'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'

/* Settings → Ledger. Figma 4293:57917.
   Ver design-reference/figma/modulos/settings-ledger.md. */

function Switch({ on, onChange, label }: { on: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onChange}
      className={cn(
        'relative h-5 w-9 shrink-0 rounded-full transition-colors',
        on ? 'bg-dash-blue' : 'bg-line-strong',
      )}
    >
      <span className={cn('absolute top-0.5 size-4 rounded-full bg-white transition-all', on ? 'left-[18px]' : 'left-0.5')} />
    </button>
  )
}

type Ajuste = {
  id: string
  tipo: string
  descripcion: string
  categoria: 'Insurance' | 'Patient'
  direccion: 'Credit' | 'Charge'
  impacto: 'Production' | 'Collections'
}

const AJUSTES: Ajuste[] = [
  { id: 'a1', tipo: 'Insurance Adjustment', descripcion: 'Credit returned to the patient after', categoria: 'Insurance', direccion: 'Credit', impacto: 'Production' },
  { id: 'a2', tipo: 'Insurance Write-off', descripcion: 'Balance the carrier will not pay', categoria: 'Insurance', direccion: 'Credit', impacto: 'Production' },
  { id: 'a3', tipo: 'Courtesy Discount', descripcion: 'Goodwill discount applied at the desk', categoria: 'Patient', direccion: 'Credit', impacto: 'Collections' },
  { id: 'a4', tipo: 'Family Discount', descripcion: 'Discount for a second family member', categoria: 'Patient', direccion: 'Credit', impacto: 'Collections' },
  { id: 'a5', tipo: 'Late Cancellation Fee', descripcion: 'Charge for a visit cancelled same day', categoria: 'Patient', direccion: 'Charge', impacto: 'Production' },
  { id: 'a6', tipo: 'Missed Appointment Fee', descripcion: 'Charge for a patient who did not attend', categoria: 'Patient', direccion: 'Charge', impacto: 'Production' },
  { id: 'a7', tipo: 'Insurance Overpayment', descripcion: 'Refund owed back to the carrier', categoria: 'Insurance', direccion: 'Charge', impacto: 'Collections' },
  { id: 'a8', tipo: 'Bad Debt Write-off', descripcion: 'Balance sent to collections and cleared', categoria: 'Patient', direccion: 'Credit', impacto: 'Collections' },
]

type Metodo = {
  id: string
  nombre: string
  tipo: 'Patient' | 'Insurance'
}

const METODOS: Metodo[] = [
  { id: 'm1', nombre: 'Insurance Adjustment', tipo: 'Patient' },
  { id: 'm2', nombre: 'Check Payment', tipo: 'Patient' },
  { id: 'm3', nombre: 'Insurance Payment - Check', tipo: 'Insurance' },
  { id: 'm4', nombre: 'Card Payment', tipo: 'Patient' },
  { id: 'm5', nombre: 'Cash Payment', tipo: 'Patient' },
  { id: 'm6', nombre: 'Electronic Payment', tipo: 'Patient' },
  { id: 'm7', nombre: 'Insurance Payment - EFT', tipo: 'Insurance' },
]

const TABS = ['Adjustments Types', 'Payment Method'] as const
type Tab = (typeof TABS)[number]

const FILTROS_AJUSTE = ['All', 'Charge', 'Credit', 'Production', 'Collections'] as const
const FILTROS_METODO = ['All', 'Patient', 'Insurance'] as const

const TAM_PAGINA = 6

export function SettingsLedgerOptions() {
  const [tab, setTab] = useState<Tab>('Adjustments Types')
  const [q, setQ] = useState('')
  const [filtro, setFiltro] = useState<string>('All')
  const [pagina, setPagina] = useState(1)
  const [apagados, setApagados] = useState<string[]>([])

  const alternar = (id: string) =>
    setApagados((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))

  const cambiarTab = (t: Tab) => { setTab(t); setFiltro('All'); setQ(''); setPagina(1) }

  const filtros = tab === 'Adjustments Types' ? FILTROS_AJUSTE : FILTROS_METODO

  const filas = useMemo(() => {
    const texto = q.trim().toLowerCase()
    if (tab === 'Adjustments Types') {
      return AJUSTES.filter(
        (a) =>
          (filtro === 'All' || a.direccion === filtro || a.impacto === filtro) &&
          \`\${a.tipo} \${a.descripcion}\`.toLowerCase().includes(texto),
      )
    }
    return METODOS.filter(
      (m) => (filtro === 'All' || m.tipo === filtro) && m.nombre.toLowerCase().includes(texto),
    )
  }, [tab, q, filtro])

  const paginas = Math.max(1, Math.ceil(filas.length / TAM_PAGINA))
  const actual = Math.min(pagina, paginas)
  const visibles = filas.slice((actual - 1) * TAM_PAGINA, actual * TAM_PAGINA)

  return (
    <div className="px-4 py-6 sm:px-8">
      <SettingsPageHeader
        titulo="Ledger Options"
        /* La bajada del frame es la de Locations, copiada tal cual. Se
           replica: el contenido va como está. */
        bajada="Set your location name. Add the location you need."
      >
        <div className="relative min-w-0 flex-1 sm:max-w-[320px]">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setPagina(1) }}
            /* El frame dice "Search patients" en las dos pestañas, donde no
               hay pacientes. Se replica. */
            placeholder="Search patients"
            className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
          />
        </div>
        <SearchButton onClick={() => setPagina(1)} className="h-9" />
        <select
          value={tab}
          onChange={(e) => cambiarTab(e.target.value as Tab)}
          aria-label="View"
          className="focus:border-dash-blue h-9 shrink-0 rounded-md border border-line bg-white px-3 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] focus:outline-none"
        >
          {TABS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </SettingsPageHeader>

      <div className="mt-4 flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-lg bg-surface-slate p-1">
        {filtros.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => { setFiltro(f); setPagina(1) }}
            className={cn(
              'h-8 shrink-0 rounded-md px-3 text-xs font-medium whitespace-nowrap transition-colors',
              filtro === f ? 'bg-dash-blue text-white' : 'text-ink-slate hover:text-ink-soft',
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-4 w-full overflow-x-auto rounded-lg border border-line-row bg-white">
        <div className={tab === 'Adjustments Types' ? 'min-w-[820px]' : 'min-w-[620px]'}>
          {tab === 'Adjustments Types' ? (
            <div className="flex items-center gap-3 bg-surface-alt px-3 py-3 text-[11px] font-semibold text-ink-muted">
              <span className="w-[160px] shrink-0">Adjustment Type</span>
              <span className="min-w-[180px] flex-1">Description</span>
              <span className="w-[100px] shrink-0">Category</span>
              <span className="w-[90px] shrink-0">Direction</span>
              <span className="w-[100px] shrink-0">Impact</span>
              <span className="w-[70px] shrink-0 text-right">Actions</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-surface-alt px-3 py-3 text-[11px] font-semibold text-ink-muted">
              <span className="min-w-[200px] flex-1">Name</span>
              <span className="w-[110px] shrink-0">Method Type</span>
              <span className="w-[90px] shrink-0">Status</span>
              {/* El frame rotula esta columna "Status" otra vez; se usa
                  "Actions", que es como la llama la otra pestaña para la
                  misma columna de toggle. */}
              <span className="w-[70px] shrink-0 text-right">Actions</span>
            </div>
          )}

          {visibles.length === 0 ? (
            <EmptyState icon={SlidersHorizontal} title="Nothing here" detail="Nothing matches the current search or filter." />
          ) : tab === 'Adjustments Types' ? (
            (visibles as Ajuste[]).map((a) => (
              <div key={a.id} className="flex items-center gap-3 border-t border-line-row px-3 py-3 text-[13px] text-ink-soft">
                <span className="w-[160px] shrink-0 truncate text-ink" title={a.tipo}>{a.tipo}</span>
                <span className="min-w-[180px] flex-1 truncate" title={a.descripcion}>{a.descripcion}</span>
                <span className="w-[100px] shrink-0 truncate">{a.categoria}</span>
                <span className="w-[90px] shrink-0 truncate">{a.direccion}</span>
                <span className="w-[100px] shrink-0 truncate">{a.impacto}</span>
                <span className="flex w-[70px] shrink-0 justify-end">
                  <Switch on={!apagados.includes(a.id)} onChange={() => alternar(a.id)} label={\`Enable \${a.tipo}\`} />
                </span>
              </div>
            ))
          ) : (
            (visibles as Metodo[]).map((m) => (
              <div key={m.id} className="flex items-center gap-3 border-t border-line-row px-3 py-3 text-[13px] text-ink-soft">
                <span className="min-w-[200px] flex-1 truncate text-ink" title={m.nombre}>{m.nombre}</span>
                <span className="w-[110px] shrink-0 truncate">{m.tipo}</span>
                <span className="w-[90px] shrink-0 truncate">Active</span>
                <span className="flex w-[70px] shrink-0 justify-end">
                  <Switch on={!apagados.includes(m.id)} onChange={() => alternar(m.id)} label={\`Enable \${m.nombre}\`} />
                </span>
              </div>
            ))
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-row px-3 py-3">
            <span className="text-xs font-semibold text-ink-muted">
              Showing {visibles.length} of {filas.length} {tab === 'Adjustments Types' ? 'adjustment types' : 'payment methods'}
            </span>
            <Pagination pagina={actual} paginas={paginas} onChange={setPagina} />
          </div>
        </div>
      </div>
    </div>
  )
}
`})))()}var bi;function xi(){return(xi=e((()=>{bi=`import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Pencil, DoorOpen, Plus, CalendarDays, ChevronRight, Trash2, X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { EmptyState } from '@/components/ui/empty-state'
import { ICONO_SUELTO } from '@/lib/estilos'
import { aviso } from '@/components/ui/toaster'
import { Card } from '@/components/settings/primitives'
import {
  SelectField, TextField, FormFooter,
} from '@/components/patients/form'
import {
  PAISES, CODIGOS, ESTADOS, ZONAS, FEES,
} from '@/data/location-options'
import { LocationHoursModal } from '@/components/settings/LocationHoursModal'
import { NewRoomModal } from '@/components/settings/NewRoomModal'
import { NewExceptionModal } from '@/components/settings/NewExceptionModal'
import { LOCACIONES } from '@/pages/settings/Locations'
import {
  HORARIO_SEMANAL, SALAS_INICIALES, EXCEPCIONES_INICIALES,
  type Sala, type Excepcion,
} from '@/data/location-detail'

/* Figma 3864:277885 "Settings — Location": Information / Working Hours /
   Rooms / Exceptions. Reemplaza lo que había antes en esta ruta —la ficha de
   un empleado, que no correspondía acá y se mudó a Settings → Employees. */

const TABS = ['Information', 'Working Hours', 'Rooms', 'Exceptions'] as const
type Tab = (typeof TABS)[number]

const DIAS: [string, string][] = [
  ['Sunday', 'Sunday'], ['Monday', 'Monday'], ['Tuesday', 'Tuesday'],
  ['Wednesday', 'Wednesday'], ['Thursday', 'Thursday'], ['Friday', 'Friday'], ['Saturday', 'Saturday'],
]

function SwitchOpenClose({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="flex items-center gap-2 text-[13px]"
    >
      <span className={cn('flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors', on ? 'bg-dash-blue' : 'bg-line-strong')}>
        <span className={cn('size-4 rounded-full bg-white transition-transform', on && 'translate-x-4')} />
      </span>
      {/* Azul, no verde: el switch ya es azul cuando está en Open, y el
          texto va del mismo color en vez de meter un segundo significado
          -verde- que el resto del sistema reserva para "Active"/"Completado". */}
      <span className={cn('font-medium', on ? 'text-dash-blue' : 'text-ink-muted')}>{on ? 'Open' : 'Close'}</span>
    </button>
  )
}

function InformationTab({ nombreLocacion }: { nombreLocacion: string }) {
  const [d, setD] = useState({
    nombre: nombreLocacion, abrev: '', fee: '',
    codigo: CODIGOS[0], numero: '', email: '',
    linea1: '', linea2: '', ciudad: '', estado: '', zip: '', pais: '', zona: '',
  })
  const set = (k: keyof typeof d) => (v: string) => setD((p) => ({ ...p, [k]: v }))

  return (
    <div className="flex flex-col gap-4">
      <Card title="General Information">
        <TextField label="Location Name" required value={d.nombre} onChange={set('nombre')} />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <TextField label="Abreviattion" required placeholder="Placeholder" value={d.abrev} onChange={set('abrev')} />
          <SelectField label="Preferred Location Fee Schedule" options={FEES} value={d.fee} onChange={set('fee')} />
        </div>
      </Card>

      <Card title="Contact Information">
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField label="Country Code" required options={CODIGOS} value={d.codigo} onChange={set('codigo')} />
          <TextField label="Number" required placeholder="Placeholder" value={d.numero} onChange={set('numero')} />
        </div>
        <TextField className="mt-4 sm:w-1/2 sm:pr-2" label="Email" placeholder="Placeholder" value={d.email} onChange={set('email')} />
      </Card>

      {/* "Adress Information" es del Figma. */}
      <Card title="Adress Information">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Address line 1" required placeholder="Select" value={d.linea1} onChange={set('linea1')} />
          <TextField label="Address line 2" required placeholder="Select" value={d.linea2} onChange={set('linea2')} />
          <SelectField label="City" required options={['Los Angeles', 'Miami', 'Seattle']} value={d.ciudad} onChange={set('ciudad')} />
          <SelectField label="State" required options={ESTADOS} value={d.estado} onChange={set('estado')} />
          <TextField label="Zip Code" required placeholder="Select" value={d.zip} onChange={set('zip')} />
          <SelectField label="Country" required options={PAISES} value={d.pais} onChange={set('pais')} />
        </div>
        <SelectField className="mt-4 sm:w-1/2 sm:pr-2" label="Time Zone" required options={ZONAS} value={d.zona} onChange={set('zona')} />
      </Card>

      <div className="flex justify-end gap-3">
        <FormFooter onCancel={() => aviso.info('Changes discarded.')} onSave={() => aviso.ok('Location information saved.')} />
      </div>
    </div>
  )
}

function WorkingHoursTab() {
  const [horario, setHorario] = useState(HORARIO_SEMANAL)
  const [expandido, setExpandido] = useState<string | null>(null)
  const [modal, setModal] = useState<string | null>(null)

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white">
      <div className="grid grid-cols-[140px_140px_1fr] gap-3 border-b border-line bg-surface-alt px-4 py-3 text-xs font-semibold text-ink-muted">
        <span>Day</span>
        <span>Status</span>
        <span>Hours</span>
      </div>
      {DIAS.map(([key, label]) => {
        const dia = horario[key]
        const sinHoras = dia.abierto && dia.rangos.length === 0
        return (
          <div
            key={key}
            className={cn(
              'grid grid-cols-[140px_140px_1fr] items-center gap-3 border-b border-line-soft px-4 py-3 last:border-0',
              !dia.abierto && 'bg-surface-subtle',
            )}
          >
            <span className="text-[13px] font-semibold text-ink">{label}</span>
            <SwitchOpenClose
              on={dia.abierto}
              onChange={(v) => {
                setHorario((p) => ({ ...p, [key]: { ...p[key], abierto: v } }))
                /* Abrir un día sin franjas cargadas siempre termina en "Add
                   New Hour" igual: te ahorra ese segundo click y te lleva
                   directo al popup para cargarlas. */
                if (v && dia.rangos.length === 0) setModal(key)
              }}
            />
            {dia.abierto ? (
              <div className="flex flex-wrap items-center gap-2">
                {/* Todo "+N" se despliega: regla del sistema. Colapsado
                    muestra sólo las dos primeras franjas y un chip "+N" con
                    las que faltan; al tocarlo aparecen todas. */}
                {(expandido === key ? dia.rangos : dia.rangos.slice(0, 2)).map((r, i) => (
                  <span key={i} className="bg-dash-count-bg text-dash-blue-hover flex items-center gap-1 rounded-full py-[3px] pr-2 pl-1.5 text-[11px] font-semibold">
                    <button
                      type="button"
                      aria-label={\`Remove \${r} on \${label}\`}
                      onClick={() =>
                        setHorario((p) => {
                          const rangos = p[key].rangos.filter((_, j) => j !== i)
                          return { ...p, [key]: { abierto: rangos.length > 0, rangos } }
                        })
                      }
                      className="hover:opacity-60"
                    >
                      <X className="size-3" strokeWidth={2.5} />
                    </button>
                    {r}
                  </span>
                ))}
                {expandido !== key && dia.rangos.length > 2 && (
                  <button
                    type="button"
                    onClick={() => setExpandido(key)}
                    className="bg-dash-count-bg text-dash-blue-hover rounded-full px-2 py-[3px] text-[11px] font-semibold hover:underline"
                  >
                    +{dia.rangos.length - 2}
                  </button>
                )}
                {sinHoras && (
                  <button
                    type="button"
                    onClick={() => setModal(key)}
                    className="text-dash-blue flex items-center gap-1 text-[12px] font-semibold hover:underline"
                  >
                    <Plus className="size-3.5" /> Add New Hour
                  </button>
                )}
                {!sinHoras && (
                  <button
                    type="button"
                    onClick={() => setModal(key)}
                    className="text-dash-blue flex shrink-0 items-center gap-1 text-[12px] font-semibold hover:underline"
                  >
                    <Pencil className="size-3" /> Edit hours
                  </button>
                )}
              </div>
            ) : (
              <span className="text-[12px] text-ink-faint">Closed all day.</span>
            )}
          </div>
        )
      })}

      {modal && (
        <LocationHoursModal
          dia={DIAS.findIndex(([key]) => key === modal)}
          onClose={() => setModal(null)}
          onGuardar={(rango) =>
            setHorario((p) => ({
              ...p,
              [modal]: { abierto: true, rangos: [\`\${rango.inicio} - \${rango.fin}\`] },
            }))
          }
        />
      )}
    </div>
  )
}

function RoomsTab() {
  const [salas, setSalas] = useState<Sala[]>(SALAS_INICIALES)
  const [modal, setModal] = useState<'nueva' | Sala | false>(false)

  return (
    <div className="rounded-xl border border-line bg-white p-4 sm:p-5">
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => setModal('nueva')}
          className="text-dash-blue flex items-center gap-1.5 text-[13px] font-semibold hover:underline"
        >
          <Plus className="size-4" /> Add Room
        </button>
      </div>

      {salas.length === 0 ? (
        <EmptyState title="No Rooms" className="border-0 py-16" />
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {salas.map((s) => (
            <div key={s.id} className="rounded-lg border-l-[3px] border-l-dash-blue bg-surface-subtle p-3">
              <div className="flex items-start justify-between gap-2">
                <span className="flex min-w-0 items-center gap-2 text-[13px] font-bold text-ink">
                  <DoorOpen className="text-dash-blue size-4 shrink-0" /> <span className="truncate">{s.nombre}</span>
                </span>
                <span className="flex shrink-0 items-center gap-0.5">
                  <button
                    type="button"
                    aria-label={\`Edit \${s.nombre}\`}
                    onClick={() => setModal(s)}
                    className={ICONO_SUELTO}
                  >
                    <Pencil className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label={\`Delete \${s.nombre}\`}
                    onClick={() => {
                      const indice = salas.findIndex((x) => x.id === s.id)
                      setSalas((p) => p.filter((x) => x.id !== s.id))
                      aviso.ok(\`\${s.nombre} was removed from Rooms.\`, {
                        label: 'Undo',
                        onClick: () => setSalas((p) => [...p.slice(0, indice), s, ...p.slice(indice)]),
                      })
                    }}
                    className={ICONO_SUELTO}
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </span>
              </div>
              <p className="mt-1.5 text-[12px] text-ink-muted">Type: {s.tipo || '-'}</p>
              <p className="text-[12px] text-ink-muted">Abbreviation: {s.abreviatura || '-'}</p>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <NewRoomModal
          inicial={modal === 'nueva' ? undefined : modal}
          onClose={() => setModal(false)}
          onGuardar={(nombre, abrev, tipo) => {
            if (modal !== 'nueva') {
              setSalas((p) => p.map((x) => (x.id === modal.id ? { ...x, nombre, abreviatura: abrev, tipo } : x)))
              aviso.ok(\`\${nombre} was updated.\`)
            } else {
              setSalas((p) => [...p, { id: \`sala-\${Date.now()}\`, nombre, abreviatura: abrev, tipo }])
              aviso.ok(\`\${nombre} was added to Rooms.\`)
            }
          }}
        />
      )}
    </div>
  )
}

function ExceptionsTab() {
  const [excepciones, setExcepciones] = useState<Excepcion[]>(EXCEPCIONES_INICIALES)
  const [modal, setModal] = useState<'nueva' | Excepcion | null>(null)

  return (
    <div className="rounded-xl border border-line bg-white p-4 sm:p-5">
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => setModal('nueva')}
          className="text-dash-blue flex items-center gap-1.5 text-[13px] font-semibold hover:underline"
        >
          <Plus className="size-4" /> Add Exception
        </button>
      </div>

      {excepciones.length === 0 ? (
        <EmptyState title="No Exceptions" detail="Add a day that breaks from the regular schedule." className="border-0 py-16" />
      ) : (
        <div className="mt-4 flex flex-col gap-2">
          {excepciones.map((e) => (
            <div key={e.id} className="flex items-center gap-3 rounded-lg border border-line px-3 py-2.5">
              <span className={cn('size-2 shrink-0 rounded-full', e.estado === 'Active' ? 'bg-green' : 'bg-ink-faint')} />
              <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">{e.nombre}</span>
              <span className="flex shrink-0 items-center gap-1.5 text-[12px] text-ink-muted">
                <CalendarDays className="size-3.5" />
                {e.fecha.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <button
                type="button"
                aria-label={\`Edit \${e.nombre}\`}
                onClick={() => setModal(e)}
                className={ICONO_SUELTO}
              >
                <ChevronRight className="size-4" />
              </button>
              <button
                type="button"
                aria-label={\`Delete \${e.nombre}\`}
                onClick={() => {
                  const indice = excepciones.findIndex((x) => x.id === e.id)
                  setExcepciones((p) => p.filter((x) => x.id !== e.id))
                  aviso.ok(\`\${e.nombre} was removed.\`, {
                    label: 'Undo',
                    onClick: () => setExcepciones((p) => [...p.slice(0, indice), e, ...p.slice(indice)]),
                  })
                }}
                className={ICONO_SUELTO}
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <NewExceptionModal
          inicial={modal === 'nueva' ? undefined : modal}
          onClose={() => setModal(null)}
          onGuardar={(datos) => {
            if (modal !== 'nueva') {
              setExcepciones((p) => p.map((x) => (x.id === modal.id ? { ...x, ...datos } : x)))
              aviso.ok(\`\${datos.nombre} was updated.\`)
            } else {
              setExcepciones((p) => [...p, { ...datos, id: \`exc-\${Date.now()}\` }])
              aviso.ok(\`\${datos.nombre} was added to Exceptions.\`)
            }
          }}
        />
      )}
    </div>
  )
}

export function SettingsLocationDetail() {
  const { locId = 'abril' } = useParams()
  const loc = LOCACIONES.find((l) => l.id === locId) ?? LOCACIONES[0]
  const [tab, setTab] = useState<Tab>('Information')

  return (
    <div className="px-4 py-6 sm:px-8">
      <h1 className="text-2xl font-bold text-ink">{tab === 'Information' ? loc.nombre : tab}</h1>
      <p className="mt-1 text-sm text-ink-muted">Set your location name. Add the location you need.</p>

      <div className="mt-4 flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-lg bg-surface-slate p-1">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              'h-8 shrink-0 rounded-md px-3 text-xs font-medium whitespace-nowrap transition-colors',
              tab === t ? 'bg-dash-blue text-white' : 'text-ink-slate hover:text-ink-soft',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tab === 'Information' && <InformationTab nombreLocacion={loc.nombre} />}
        {tab === 'Working Hours' && <WorkingHoursTab />}
        {tab === 'Rooms' && <RoomsTab />}
        {tab === 'Exceptions' && <ExceptionsTab />}
      </div>
    </div>
  )
}
`})))()}var Si;function Ci(){return(Ci=e((()=>{Si=`import { useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Pencil, Trash2, Plus, MapPin } from 'lucide-react'
import { EmptyState } from '@/components/ui/empty-state'
import { SearchButton } from '@/components/ui/search-button'
import { aviso } from '@/components/ui/toaster'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'

/* Settings → Locations. La tabla de entrada: nombre, empleados, salas e
   información de contacto. El detalle de cada fila —Information / Working
   Hours / Rooms / Exceptions— vive en LocationDetail.tsx. */

type Locacion = { id: string; nombre: string; empleados: number; salas: number; info: string }

export const LOCACIONES: Locacion[] = [
  { id: 'abril', nombre: 'Abril', empleados: 12, salas: 4, info: '789 N Sunrise Street, Los Angeles' },
  { id: 'alaska', nombre: 'Alaska Medical', empleados: 7, salas: 3, info: '1220 W 5th Ave, Anchorage' },
  { id: 'bayside', nombre: 'Bayside Dental', empleados: 9, salas: 5, info: '450 Biscayne Blvd, Miami' },
  { id: 'northgate', nombre: 'Northgate Clinic', empleados: 5, salas: 2, info: '9800 Aurora Ave N, Seattle' },
  { id: 'riverside', nombre: 'Riverside Care', empleados: 4, salas: 2, info: '310 Congress Ave, Austin' },
]

export function SettingsLocations() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [filas, setFilas] = useState(LOCACIONES)
  const inputRef = useRef<HTMLInputElement>(null)

  const visibles = useMemo(
    () => filas.filter((l) => \`\${l.nombre} \${l.info}\`.toLowerCase().includes(q.trim().toLowerCase())),
    [filas, q],
  )

  const borrar = (l: Locacion) => {
    const indice = filas.findIndex((x) => x.id === l.id)
    setFilas((prev) => prev.filter((x) => x.id !== l.id))
    aviso.ok(\`\${l.nombre} was removed.\`, {
      label: 'Undo',
      onClick: () => setFilas((prev) => [...prev.slice(0, indice), l, ...prev.slice(indice)]),
    })
  }

  return (
    <div className="px-4 py-6 sm:px-8">
      <SettingsPageHeader
        titulo="Locations"
        bajada="Set your location name. Add the location you need."
        accion={(
          <Link
            to="/settings/locations/new"
            data-tour="set-locations"
            className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 shrink-0 items-center gap-2 rounded-md px-4 text-[13px] font-medium text-white transition-colors"
          >
            <Plus className="size-4" /> New location
          </Link>
        )}
      >
        <div className="relative min-w-0 flex-1 sm:max-w-[320px]">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search locations"
            className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
          />
        </div>
        <SearchButton onClick={() => inputRef.current?.focus()} className="h-9" />
      </SettingsPageHeader>

      <div className="mt-4 overflow-x-auto rounded-lg border border-line-row bg-white">
        <div className="min-w-[760px]">
          <div className="flex items-center gap-3 bg-surface-alt px-3 py-3 text-[11px] font-semibold text-ink-muted">
            <span className="w-[180px]">Location name</span>
            <span className="w-[100px]">Employees</span>
            <span className="w-[80px]">Room</span>
            <span className="min-w-0 flex-1">Information</span>
            <span className="w-[60px] text-right">Actions</span>
          </div>

          {visibles.length === 0 ? (
            <EmptyState
              icon={MapPin}
              title={filas.length === 0 ? 'No locations yet' : 'No locations found'}
              detail={
                filas.length === 0
                  ? 'Add your first location to start assigning employees and rooms.'
                  : 'Try a different name or address.'
              }
              className="border-0"
            />
          ) : (
            visibles.map((l) => (
              <div
                key={l.id}
                className="flex items-center gap-3 border-t border-line-row px-3 py-3 text-[13px] text-ink-soft"
              >
                {/* El nombre es el acceso, como en la tabla de pacientes. */}
                <Link
                  to={\`/settings/locations/\${l.id}\`}
                  className="text-dash-blue w-[180px] truncate font-semibold hover:underline"
                >
                  {l.nombre}
                </Link>
                <span className="w-[100px]">{l.empleados}</span>
                <span className="w-[80px]">{l.salas}</span>
                <span className="min-w-0 flex-1 truncate">{l.info}</span>
                <span className="flex w-[60px] justify-end">
                  <RowActionsMenu label={l.nombre}>
                    <DropdownMenuItem onSelect={() => navigate(\`/settings/locations/\${l.id}\`)}>
                      <Pencil className="size-4 shrink-0" /> Edit location
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive" onSelect={() => borrar(l)}>
                      <Trash2 className="size-4 shrink-0" /> Delete location
                    </DropdownMenuItem>
                  </RowActionsMenu>
                </span>
              </div>
            ))
          )}

          {visibles.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-row px-3 py-3">
              <span className="text-xs font-semibold text-ink-muted">
                Showing {visibles.length} of {filas.length} locations
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
`})))()}var wi;function Ti(){return(Ti=e((()=>{wi=`import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  SectionCard, TextField, SelectField, DateField, FormFooter,
} from '@/components/patients/form'
import { LinkExistingPerson } from '@/components/settings/LinkExistingPerson'
import { CODIGOS, PAISES, ESTADOS } from '@/data/location-options'
import { type Empleado } from '@/data/employees'
import { aviso } from '@/components/ui/toaster'

/* Antes era un modal (\`NewEmployeeModal.tsx\`); misma lógica que "New
   Location": pasa a su propia pantalla -/settings/team/new-, con el
   breadcrumb de \`SettingsLayout\` como único camino de vuelta a la lista, sin
   tope de ancho -mismo criterio que "New Location" y que la ficha de un
   empleado-. El contenido no cambió: mismas tres cards, mismos catálogos. */

const VACIO = {
  first: '', middle: '', last: '', email: '', birthday: '',
  codigo: CODIGOS[0], area: '', numero: '', ext: '',
  linea1: '', linea2: '', pais: PAISES[0], estado: '', ciudad: '', zip: '',
}

export function SettingsNewEmployee() {
  const navigate = useNavigate()
  const [d, setD] = useState(VACIO)
  const [intentado, setIntentado] = useState(false)
  const [vincular, setVincular] = useState(false)
  const [vinculado, setVinculado] = useState<Empleado | null>(null)
  const set = (k: keyof typeof VACIO) => (v: string) => setD((p) => ({ ...p, [k]: v }))
  const req = (k: keyof typeof VACIO) => (intentado && !vincular && !d[k].trim() ? 'This field is required.' : undefined)

  const obligatorios: (keyof typeof VACIO)[] = vincular
    ? ['codigo', 'area', 'numero', 'linea1', 'pais', 'estado', 'ciudad', 'zip']
    : ['first', 'last', 'email', 'birthday', 'codigo', 'area', 'numero', 'linea1', 'pais', 'estado', 'ciudad', 'zip']

  const volver = () => navigate('/settings/team')

  const guardar = () => {
    setIntentado(true)
    if (vincular && !vinculado) return
    if (obligatorios.some((k) => !d[k].trim())) return
    const nombre = vincular && vinculado ? vinculado.nombre : \`\${d.first} \${d.last}\`
    aviso.ok(\`\${nombre} was added to your employees.\`)
    volver()
  }

  return (
    <div className="px-4 py-6 sm:px-8">
      <h1 className="text-2xl font-bold text-ink">New Employee</h1>
      <p className="mt-1 text-sm text-ink-muted">Everyone with access to the practice, across every location.</p>

      <div className="mt-5 flex flex-col gap-6">
        <SectionCard title="General Information">
          <LinkExistingPerson
            vincular={vincular}
            onVincular={setVincular}
            vinculado={vinculado}
            onSeleccionar={setVinculado}
          />
          {!vincular && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <TextField
                  label="First name" required placeholder="First name"
                  value={d.first} onChange={set('first')} error={req('first')}
                />
                <TextField
                  label="Middle name" placeholder="Middle name"
                  value={d.middle} onChange={set('middle')}
                />
                <TextField
                  label="Last name" required placeholder="Last name"
                  value={d.last} onChange={set('last')} error={req('last')}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField
                  label="Email" required placeholder="Email"
                  value={d.email} onChange={set('email')} error={req('email')}
                />
                <DateField
                  label="Birthdate" required placeholder="Birthdate"
                  onChange={set('birthday')} error={req('birthday')}
                />
              </div>
            </>
          )}
        </SectionCard>

        <SectionCard title="Contact Information">
          <div className="grid gap-4 sm:grid-cols-3">
            <SelectField
              label="Country Code" required options={CODIGOS}
              value={d.codigo} onChange={set('codigo')} error={req('codigo')}
            />
            <TextField
              label="Area Code (3 digits)" required placeholder="555"
              value={d.area} onChange={set('area')} error={req('area')}
            />
            <TextField
              label="Number (7 digits)" required placeholder="000-0000"
              value={d.numero} onChange={set('numero')} error={req('numero')}
            />
          </div>
          <TextField
            className="sm:w-1/2 sm:pr-2" label="Extension" placeholder="Extension"
            value={d.ext} onChange={set('ext')}
          />
        </SectionCard>

        <SectionCard title="Address Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Address Line 1" required placeholder="Street name and number"
              value={d.linea1} onChange={set('linea1')} error={req('linea1')}
            />
            <TextField
              label="Address Line 2" placeholder="Additional info"
              value={d.linea2} onChange={set('linea2')}
            />
            <SelectField
              label="Country" required options={PAISES}
              value={d.pais} onChange={set('pais')} error={req('pais')}
            />
            <SelectField
              label="State" required placeholder="Select your region" options={ESTADOS}
              value={d.estado} onChange={set('estado')} error={req('estado')}
            />
            <TextField
              label="City" required placeholder="Your city"
              value={d.ciudad} onChange={set('ciudad')} error={req('ciudad')}
            />
            <TextField
              label="ZIP Code" required placeholder="Postal code (only numbers)"
              value={d.zip} onChange={set('zip')} error={req('zip')}
            />
          </div>
        </SectionCard>

        <FormFooter onCancel={volver} onSave={guardar} />
      </div>
    </div>
  )
}
`})))()}var Ei;function Di(){return(Di=e((()=>{Ei=`import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  SectionCard, SelectField, TextField, FormFooter,
} from '@/components/patients/form'
import { aviso } from '@/components/ui/toaster'
import { PAISES, CODIGOS, ESTADOS, ZONAS, FEES } from '@/data/location-options'

/* Antes era un modal; el mismo formulario ahora vive en su propia pantalla
   -/settings/locations/new-, con el breadcrumb de \`SettingsLayout\` como
   único camino de vuelta a la lista. Campos y catálogos, sin cambios. */

const VACIO = {
  nombre: '', abreviatura: '', fee: '',
  codigo: CODIGOS[0], area: '', numero: '', email: '',
  linea1: '', linea2: '', pais: PAISES[0], estado: '', ciudad: '', zip: '', zona: '',
}

export function SettingsNewLocation() {
  const navigate = useNavigate()
  const [d, setD] = useState(VACIO)
  const [intentado, setIntentado] = useState(false)
  const set = (k: keyof typeof VACIO) => (v: string) => setD((p) => ({ ...p, [k]: v }))
  const req = (k: keyof typeof VACIO) => (intentado && !d[k].trim() ? 'This field is required.' : undefined)

  const obligatorios: (keyof typeof VACIO)[] =
    ['nombre', 'fee', 'codigo', 'area', 'numero', 'email', 'linea1', 'pais', 'estado', 'ciudad', 'zip', 'zona']

  const volver = () => navigate('/settings/locations')

  const guardar = () => {
    setIntentado(true)
    if (obligatorios.some((k) => !d[k].trim())) return
    aviso.ok(\`\${d.nombre} was added to your locations.\`)
    volver()
  }

  return (
    <div className="px-4 py-6 sm:px-8">
      <h1 className="text-2xl font-bold text-ink">New Location</h1>
      <p className="mt-1 text-sm text-ink-muted">Set your location name. Add the location you need.</p>

      <div className="mt-5 flex flex-col gap-6">
        <SectionCard title="General Information">
          <TextField
            label="Name" required placeholder="Introduce your location name"
            value={d.nombre} onChange={set('nombre')} error={req('nombre')}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Abbreviation" placeholder="Introduce abbreviation"
              value={d.abreviatura} onChange={set('abreviatura')}
            />
            <SelectField
              label="Default Fee Schedule" required placeholder="Select fee schedule"
              options={FEES} value={d.fee} onChange={set('fee')} error={req('fee')}
            />
          </div>
        </SectionCard>

        <SectionCard title="Contact Information">
          <div className="grid gap-4 sm:grid-cols-3">
            <SelectField
              label="Country Code" required options={CODIGOS}
              value={d.codigo} onChange={set('codigo')} error={req('codigo')}
            />
            <TextField
              label="Area Code (3 digits)" required placeholder="555"
              value={d.area} onChange={set('area')} error={req('area')}
            />
            <TextField
              label="Number (7 digits)" required placeholder="000-0000"
              value={d.numero} onChange={set('numero')} error={req('numero')}
            />
          </div>
          <TextField
            className="sm:w-1/2 sm:pr-2" label="Email" required placeholder="example@example.com"
            value={d.email} onChange={set('email')} error={req('email')}
          />
        </SectionCard>

        <SectionCard title="Address Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Address Line 1" required placeholder="Street name and number"
              value={d.linea1} onChange={set('linea1')} error={req('linea1')}
            />
            <TextField
              label="Address Line 2" placeholder="Additional info"
              value={d.linea2} onChange={set('linea2')}
            />
            <SelectField
              label="Country" required options={PAISES}
              value={d.pais} onChange={set('pais')} error={req('pais')}
            />
            <SelectField
              label="State" required placeholder="Select your region" options={ESTADOS}
              value={d.estado} onChange={set('estado')} error={req('estado')}
            />
            <TextField
              label="City" required placeholder="Your city"
              value={d.ciudad} onChange={set('ciudad')} error={req('ciudad')}
            />
            <TextField
              label="ZIP Code" required placeholder="Postal code (only numbers)"
              value={d.zip} onChange={set('zip')} error={req('zip')}
            />
          </div>
          <SelectField
            className="sm:w-1/2 sm:pr-2" label="Time Zone" required placeholder="Select your time zone"
            options={ZONAS} value={d.zona} onChange={set('zona')} error={req('zona')}
          />
        </SectionCard>

        <FormFooter onCancel={volver} onSave={guardar} />
      </div>
    </div>
  )
}
`})))()}export{Or as $,D as $i,Dt as $n,De as $r,On as $t,$r as A,Q as Ai,Qt as An,Qe as Ar,Qn as At,Ur as B,H as Bi,Ht as Bn,Ve as Br,Un as Bt,ii as C,r as Ca,re as Ci,rn as Cn,rt as Cr,ar as Ct,ei as D,$ as Di,$t as Dn,$e as Dr,tr as Dt,ri as E,n as Ea,ne as Ei,nn as En,nt as Er,nr as Et,Kr as F,G as Fi,Gt as Fn,Ge as Fr,Kn as Ft,Ir as G,F as Gi,Ft as Gn,Fe as Gr,In as Gt,Vr as H,B as Hi,Bt as Hn,Be as Hr,Vn as Ht,qr as I,K as Ii,Kt as In,Ke as Ir,qn as It,Fr as J,P as Ji,Pt as Jn,Pe as Jr,Fn as Jt,Lr as K,I as Ki,It as Kn,Ie as Kr,Ln as Kt,Wr as L,U as Li,Wt as Ln,Ue as Lr,Wn as Lt,Zr as M,X as Mi,Xt as Mn,Xe as Mr,Zn as Mt,Jr as N,q as Ni,qt as Nn,qe as Nr,Jn as Nt,ti as O,ee as Oi,en as On,et as Or,er as Ot,Yr as P,J as Pi,Jt as Pn,Je as Pr,Yn as Pt,jr as Q,A as Qi,At as Qn,Ae as Qr,jn as Qt,Gr as R,W as Ri,Ut as Rn,We as Rr,Gn as Rt,si as S,o as Sa,oe as Si,sn as Sn,ot as Sr,or as St,ni as T,t as Ta,te as Ti,tn as Tn,tt as Tr,rr as Tt,Rr as U,L as Ui,Lt as Un,Le as Ur,Rn as Ut,Br as V,z as Vi,zt as Vn,ze as Vr,Bn as Vt,zr as W,R as Wi,Rt as Wn,Re as Wr,zn as Wt,Nr as X,M as Xi,Mt as Xn,Me as Xr,Nn as Xt,Mr as Y,j as Yi,jt as Yn,je as Yr,Mn as Yt,Ar as Z,k as Zi,kt as Zn,ke as Zr,An as Zt,ui as _,l as _a,le as _i,un as _n,lt as _r,dr as _t,Si as a,x as aa,xe as ai,Sn as an,xt as ar,Sr as at,li as b,c as ba,ce as bi,ln as bn,ct as br,cr as bt,xi as c,b as ca,be as ci,xn as cn,bt as cr,br as ct,gi as d,h as da,he as di,gn as dn,ht as dr,_r as dt,O as ea,Oe as ei,kn as en,Ot as er,kr as et,_i as f,g as fa,ge as fi,_n as fn,gt as fr,gr as ft,pi as g,f as ga,fe as gi,pn as gn,ft as gr,fr as gt,fi as h,d as ha,de as hi,fn as hn,dt as hr,pr as ht,Ti as i,w as ia,Ce as ii,wn as in,wt as ir,Tr as it,Xr as j,Y as ji,Yt as jn,Ye as jr,Xn as jt,Qr as k,Z as ki,Zt as kn,Ze as kr,$n as kt,vi as l,_ as la,_e as li,vn as ln,_t as lr,yr as lt,hi as m,m as ma,me as mi,hn as mn,mt as mr,mr as mt,Di as n,E as na,Ee as ni,Dn as nn,Tt as nr,Dr as nt,Ci as o,S as oa,Se as oi,Cn as on,St as or,Cr as ot,mi as p,p as pa,pe as pi,mn as pn,pt as pr,hr as pt,Pr as q,N as qi,Nt as qn,Ne as qr,Pn as qt,wi as r,C as ra,we as ri,Tn as rn,Ct as rr,wr as rt,bi as s,y as sa,ye as si,bn as sn,yt as sr,xr as st,Ei as t,T as ta,Te as ti,En as tn,Et as tr,Er as tt,yi as u,v as ua,ve as ui,yn as un,vt as ur,vr as ut,di as v,u as va,ue as vi,dn as vn,ut as vr,ur as vt,ai as w,i as wa,ie as wi,an as wn,it as wr,ir as wt,oi as x,a as xa,ae as xi,on as xn,at as xr,sr as xt,ci as y,s as ya,se as yi,cn as yn,st as yr,lr as yt,Hr as z,V as zi,Vt as zn,He as zr,Hn as zt};