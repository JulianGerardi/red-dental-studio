import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, GalleryVerticalEnd, CalendarRange, Wallet, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import capturaDashboard from '@/assets/login/dashboard.png'
import capturaLedger from '@/assets/login/ledger.png'
import capturaDental from '@/assets/login/dental.png'

/* Figma 3749:72258. Ver design-reference/figma/modulos/login.md.
   El panel de la izquierda lo pinta azul liso; acá lleva ese mismo azul pero
   mostrando pantallas reales de la app -misma idea que el login del proyecto
   hermano, con nuestros datos y nuestros tokens-.

   Antes había una miniatura de cada pantalla armada a mano -filas, texto
   propio a 7-12px- que Julián vio "muy chico" y con el texto grande de
   arriba desalineado entre slides. Ahora son capturas reales (Dashboard,
   Ledger y Dental Assessment del propio dev server, PNG en src/assets/login),
   así el tamaño de letra es el mismo que en la app y no algo redibujado. */
const PITCH = [
  {
    lead: 'Your whole day,', acento: 'at a glance.',
    nota: 'Appointments, rooms and the waiting list together from the first coffee.',
    img: capturaDashboard, icon: CalendarRange,
  },
  {
    lead: 'Every charge,', acento: 'accounted for.',
    nota: 'Charges, insurance and payments running on one balance you can trust.',
    img: capturaLedger, icon: Wallet,
  },
  {
    lead: 'Chart a tooth', acento: 'in one click.',
    nota: 'Findings land on the piece you are already looking at.',
    img: capturaDental, icon: Check,
  },
]

export default function Login() {
  const navigate = useNavigate()
  const [verClave, setVerClave] = useState(false)
  const [email, setEmail] = useState('')
  const [clave, setClave] = useState('')
  const [slide, setSlide] = useState(0)
  /* Sube en cada cambio de slide -automático o manual- sólo para que la
     barra de progreso del activo se remonte y arranque de cero; el número
     en sí no significa nada. */
  const [tick, setTick] = useState(0)

  /* Depende de `slide` para reiniciar el timer cuando el usuario toca una
     barra a mano: si no, el próximo auto-avance podía llegar a mitad de
     camino y la barra de progreso quedaba desincronizada del cambio real. */
  useEffect(() => {
    const id = setTimeout(() => {
      setSlide((s) => (s + 1) % PITCH.length)
      setTick((t) => t + 1)
    }, 5200)
    return () => clearTimeout(id)
  }, [slide])

  const irA = (i: number) => {
    setSlide(i)
    setTick((t) => t + 1)
  }

  const activo = PITCH[slide]

  return (
    <div className="flex min-h-svh bg-white">
      {/* Panel del Figma: azul de punta a punta. Acá lleva las pantallas
          reales de la app en vez de un campo liso. */}
      <div className="relative hidden w-[46%] shrink-0 flex-col items-center overflow-hidden bg-[linear-gradient(150deg,#1d56bc_0%,#2f74f5_45%,#0043c7_100%)] px-10 py-12 lg:flex">
        <span aria-hidden className="pointer-events-none absolute -top-24 -left-24 size-[420px] rounded-full bg-white/10 blur-3xl" />
        <span aria-hidden className="pointer-events-none absolute -right-32 -bottom-32 size-[420px] rounded-full bg-white/10 blur-3xl" />

        {/* 150px, no 120: a dos líneas de título (32px) más dos de bajada
            (13px) llegan a ~128px -con 120 el texto largo desbordaba el
            cuadro un poco distinto en cada slide, y por eso se veía
            "desalineado" al pasar de uno a otro. Con `absolute inset-0` los
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

        {/* Captura real de la app (Dashboard/Ledger/Dental Assessment del
            propio dev server, ver src/assets/login) en vez de una miniatura
            redibujada a mano. Se remonta en cada slide para que la entrada
            arranque de cero y no quede congelada en el último cuadro. */}
        <div className="relative flex w-full max-w-[420px] min-h-0 flex-1 items-center justify-center">
          <div
            key={slide}
            className="motion-safe:animate-[login-fila_600ms_ease-out] w-full overflow-hidden rounded-2xl bg-white shadow-[0_18px_50px_rgb(9_20_54/0.22)]"
          >
            {/* El zoom lento va en la imagen y no en la tarjeta: la tarjeta
                sólo entra una vez, la imagen sigue "respirando" todo el
                tiempo que queda en pantalla. */}
            <img
              src={activo.img}
              alt=""
              className="motion-safe:animate-[login-zoom_5200ms_ease-out_forwards] aspect-[3/2] w-full object-cover object-top"
            />
          </div>
          <span
            key={`badge-${slide}`}
            className="text-dash-blue motion-safe:animate-[login-badge-in_450ms_cubic-bezier(0.34,1.56,0.64,1)_both] absolute -top-3 -left-6 flex size-9 items-center justify-center rounded-full bg-white shadow-[0_10px_24px_rgb(9_20_54/0.25)]"
          >
            <activo.icon className="size-4" />
          </span>
        </div>

        {/* Barras de progreso -como historias-, no puntos: cada una se llena
            a la par del auto-avance en vez de sólo prender/apagar, así el
            carrusel se ve activo aunque nadie lo toque. */}
        <div className="relative mt-4 flex w-full max-w-[420px] shrink-0 items-center gap-1.5">
          {PITCH.map((p, i) => (
            <button
              key={p.lead}
              type="button"
              onClick={() => irA(i)}
              aria-label={`Show ${p.acento}`}
              className="h-1 flex-1 overflow-hidden rounded-full bg-white/25"
            >
              {i === slide ? (
                <span
                  key={tick}
                  className="motion-safe:animate-[login-progress_5200ms_linear_forwards] block h-full rounded-full bg-white motion-reduce:w-full"
                />
              ) : (
                <span className={cn('block h-full rounded-full bg-white transition-[width]', i < slide ? 'w-full' : 'w-0')} />
              )}
            </button>
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
