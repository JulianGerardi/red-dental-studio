import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, GalleryVerticalEnd, CalendarRange, Wallet, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EVENTS } from '@/components/scheduling/calendar-data'
import { MOVIMIENTOS, conSaldo, moneda } from '@/data/ledger'
import { MANDIBULAR } from '@/data/odontogram'

/* Figma 3749:72258. Ver design-reference/figma/modulos/login.md.
   El panel de la izquierda lo pinta azul liso; acá lleva ese mismo azul pero
   mostrando pantallas reales de la app -misma idea que el login del proyecto
   hermano, con nuestros datos y nuestros tokens-. */

const PITCH = [
  { lead: 'Your whole day,', acento: 'at a glance.', nota: 'Appointments, rooms and the waiting list together from the first coffee.' },
  { lead: 'Every charge,', acento: 'accounted for.', nota: 'Charges, insurance and payments running on one balance you can trust.' },
  { lead: 'Chart a tooth', acento: 'in one click.', nota: 'Findings land on the piece you are already looking at.' },
]

function Tarjeta({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow-[0_18px_50px_rgb(9_20_54/0.22)]">
      {children}
    </div>
  )
}

function Rotulo({ children, nota }: { children: React.ReactNode; nota: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-semibold tracking-wide text-[#a1a1aa] uppercase">{children}</span>
      <span className="text-dash-blue text-[11px] font-semibold">{nota}</span>
    </div>
  )
}

/** Turnos del día, salidos del mismo `EVENTS` que dibuja el calendario. */
function PanelAgenda() {
  const filas = EVENTS.slice(0, 3)
  return (
    <Tarjeta>
      <Rotulo nota={`${EVENTS.length} today`}>Today&apos;s appointments</Rotulo>
      <div className="mt-2.5 flex flex-col gap-2">
        {filas.map((e, i) => (
          <div
            key={e.patient}
            style={{ animationDelay: `${i * 320}ms` }}
            className="motion-safe:animate-[login-fila_5.2s_ease-out_infinite] flex items-center gap-2.5 rounded-xl border border-[#f1f1f4] px-3 py-2.5"
          >
            <span className="bg-dash-blue/10 text-dash-blue flex size-7 shrink-0 items-center justify-center rounded-md text-[9px] font-bold">
              {e.patient.split(' ').slice(0, 2).map((p) => p[0]).join('')}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12px] font-bold text-[#09090b]">{e.patient}</span>
              <span className="block truncate text-[10px] text-[#a1a1aa]">{e.room} · {e.reason}</span>
            </span>
            <span className="shrink-0 rounded-full bg-[#f0f5ff] px-2 py-0.5 text-[9px] font-semibold text-[#174596]">
              {e.state}
            </span>
          </div>
        ))}
      </div>
    </Tarjeta>
  )
}

/** Las últimas líneas del ledger, con el saldo que corre de verdad. */
function PanelLedger() {
  const filas = conSaldo(MOVIMIENTOS).slice(-3)
  const saldo = MOVIMIENTOS.reduce((a, m) => a + m.monto, 0)
  return (
    <Tarjeta>
      <Rotulo nota="Guarantor">Ledger</Rotulo>
      <div className="mt-2.5 flex flex-col gap-2">
        {filas.map((m, i) => (
          <div
            key={m.id}
            style={{ animationDelay: `${i * 320}ms` }}
            className="motion-safe:animate-[login-fila_5.2s_ease-out_infinite] flex items-center gap-2.5 rounded-xl border border-[#f1f1f4] px-3 py-2.5"
          >
            <span className="text-dash-blue shrink-0 rounded-md bg-[#f0f5ff] px-1.5 py-0.5 text-[9px] font-bold">
              {m.codigo}
            </span>
            <span className="min-w-0 flex-1 truncate text-[12px] font-bold text-[#09090b]">{m.descripcion}</span>
            <span className={cn('shrink-0 text-[11px] font-semibold tabular-nums', m.monto < 0 ? 'text-[#1a804d]' : 'text-[#09090b]')}>
              {moneda(m.monto)}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl bg-[#f6f8fc] px-3 py-2.5">
        <span className="text-[10px] text-[#71717a]">Balance due</span>
        <span className="text-dash-blue text-[15px] leading-none font-extrabold tabular-nums">{moneda(saldo)}</span>
      </div>
    </Tarjeta>
  )
}

/* Las piezas que el panel marca como cargadas. Fijas a propósito: es una
   vitrina, no el odontograma real. */
const CARGADAS = new Set([19, 30, 32])

/** La arcada inferior, llenándose diente por diente. */
function PanelOdontograma() {
  return (
    <Tarjeta>
      <Rotulo nota="Mandibular">Dental assessment</Rotulo>
      <div className="mt-3 flex justify-between gap-[3px]">
        {MANDIBULAR.map((n, i) => (
          <span
            key={n}
            style={{ animationDelay: `${i * 90}ms` }}
            className={cn(
              'motion-safe:animate-[login-diente_5.2s_ease-out_infinite] flex h-8 flex-1 items-end justify-center rounded-[5px] pb-1 text-[7px] font-bold',
              CARGADAS.has(n) ? 'bg-dash-blue text-white' : 'bg-[#f1f5f9] text-[#a1a1aa]',
            )}
          >
            {n}
          </span>
        ))}
      </div>
      <div className="mt-3 flex flex-col gap-2">
        {[
          { code: 'D2740', label: 'Crown – porcelain/ceramic', pieza: 'Tooth 19 · ML' },
          { code: 'D7240', label: 'Removal of impacted tooth', pieza: 'Tooth 32 · DL' },
        ].map((f, i) => (
          <div
            key={f.code}
            style={{ animationDelay: `${1400 + i * 320}ms` }}
            className="motion-safe:animate-[login-fila_5.2s_ease-out_infinite] flex items-center gap-2.5 rounded-xl border border-[#f1f1f4] px-3 py-2.5"
          >
            <span className="text-dash-blue shrink-0 rounded-md bg-[#f0f5ff] px-1.5 py-0.5 text-[9px] font-bold">{f.code}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12px] font-bold text-[#09090b]">{f.label}</span>
              <span className="block text-[10px] text-[#a1a1aa]">{f.pieza}</span>
            </span>
          </div>
        ))}
      </div>
    </Tarjeta>
  )
}

const PANELES = [PanelAgenda, PanelLedger, PanelOdontograma]
const ICONOS = [CalendarRange, Wallet, Check]

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

  const Panel = PANELES[slide]
  const Icono = ICONOS[slide]

  return (
    <div className="flex min-h-svh bg-white">
      {/* Panel del Figma: azul de punta a punta. Acá lleva las pantallas
          reales de la app en vez de un campo liso. */}
      <div className="relative hidden w-[46%] shrink-0 flex-col items-center overflow-hidden bg-[linear-gradient(150deg,#1d56bc_0%,#2f74f5_45%,#0043c7_100%)] px-10 py-12 lg:flex">
        <span aria-hidden className="pointer-events-none absolute -top-24 -left-24 size-[420px] rounded-full bg-white/10 blur-3xl" />
        <span aria-hidden className="pointer-events-none absolute -right-32 -bottom-32 size-[420px] rounded-full bg-white/10 blur-3xl" />

        <div className="relative h-[120px] w-full max-w-[420px] shrink-0 text-center">
          {PITCH.map((p, i) => (
            <div
              key={p.lead}
              className={cn('absolute inset-0 transition-opacity duration-700', i === slide ? 'opacity-100' : 'opacity-0')}
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

        {/* Se remonta en cada slide para que la animación arranque de cero y
            el panel no quede congelado en el último cuadro. */}
        <div className="relative flex w-full max-w-[320px] min-h-0 flex-1 items-center justify-center">
          <Panel key={slide} />
          <span className="text-dash-blue absolute -top-3 -left-6 flex size-9 items-center justify-center rounded-full bg-white shadow-[0_10px_24px_rgb(9_20_54/0.25)]">
            <Icono className="size-4" />
          </span>
        </div>

        <div className="relative mt-4 flex shrink-0 items-center gap-1.5">
          {PITCH.map((p, i) => (
            <button
              key={p.lead}
              type="button"
              onClick={() => setSlide(i)}
              aria-label={`Show ${p.acento}`}
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

          <h1 className="mt-5 text-[26px] leading-tight font-bold text-[#09090b]">Welcome! Red Dental Studio</h1>
          <p className="mt-1 text-[13px] text-[#71717a]">Enter your credentials to access your account</p>

          <label className="mt-7 flex flex-col gap-2">
            <span className="text-xs font-medium text-[#09090b]">Email<span className="text-[#ff0608]">*</span></span>
            <span className="focus-within:border-dash-blue flex h-10 items-center gap-2.5 rounded-md border border-[#e4e4e7] bg-white px-3 shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] transition-colors">
              <Mail className="size-4 shrink-0 text-[#a1a1aa]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="example@example.com"
                className="min-w-0 flex-1 bg-transparent text-[13px] placeholder:text-[#a1a1aa] focus:outline-none"
              />
            </span>
          </label>

          <label className="mt-5 flex flex-col gap-2">
            {/* El Figma pone "Forgot your password?" al lado del label y otra
                vez como link debajo del campo. Va una sola vez: dos accesos
                al mismo lugar, pegados, no son dos cosas distintas. */}
            <span className="flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-[#09090b]">Password<span className="text-[#ff0608]">*</span></span>
              <Link to="/forgot-password" className="text-dash-blue text-xs font-medium hover:underline">
                Forgot your password?
              </Link>
            </span>
            <span className="focus-within:border-dash-blue flex h-10 items-center gap-2.5 rounded-md border border-[#e4e4e7] bg-white px-3 shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] transition-colors">
              <Lock className="size-4 shrink-0 text-[#a1a1aa]" />
              <input
                type={verClave ? 'text' : 'password'}
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••"
                className="min-w-0 flex-1 bg-transparent text-[13px] placeholder:text-[#a1a1aa] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setVerClave((v) => !v)}
                aria-label={verClave ? 'Hide password' : 'Show password'}
                className="shrink-0 text-[#a1a1aa] transition-colors hover:text-[#09090b]"
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

          <p className="mt-6 text-center text-[13px] text-[#3f3f46]">
            Don&apos;t have an account?{' '}
            <Link to="/forgot-password" className="text-dash-blue font-semibold hover:underline">Sign up</Link>
          </p>

          <p className="mt-12 text-center text-[11px] tracking-wide text-[#a1a1aa] uppercase">
            © 2025 All rights reserved | Confidentally
          </p>
        </form>
      </div>
    </div>
  )
}
