import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useState } from 'react'
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
`})))()}export{n,i as r,r as t};