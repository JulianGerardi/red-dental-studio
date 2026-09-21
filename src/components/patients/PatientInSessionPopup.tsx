import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, LogOut, Radio, X } from 'lucide-react'
import { HOY_DEMO, datosDelDia } from '@/components/dashboard/dashboard-data'

/* Mismo slug que usa patientsStore para armar el id de un paciente nuevo:
   acá no hay un id real detrás del turno -sólo `name`-, así que se
   reconstruye igual para que "View chart" caiga en la misma ruta. */
const slug = (s: string) => s.toLowerCase().trim().replace(/\s+/g, '-')

/* Popup flotante de "quién está en el sillón ahora", en la sección de
   Patients (ver AppShell.tsx). Usa los mismos turnos de hoy que el panel
   "Today Appointments" de Patients.tsx -mismo `datosDelDia(HOY_DEMO)`-, así
   que no es un dato inventado aparte: un turno de hoy que todavía no está
   completado.

   Primera versión rotaba sola cada 14s con un timer. Julián hizo notar que
   no tiene sentido: en la app real esto cambia cuando el provider hace el
   check-out del turno, no solo. Ahora el timer no mueve de paciente: sólo
   corre el reloj de "en el sillón hace". Pasar al siguiente es una acción
   -el botón "Check out" de acá abajo-, el mismo verbo que ya usa el botón de
   Dashboard para esto. Al llegar al final vuelve al primero: es una vitrina
   de demo, no una cola que se vacía.

   Julián también hizo notar que cerrarlo con la X lo perdía -no había forma
   de volver a abrirlo sin recargar-. Ahora "cerrar" es minimizar: queda una
   píldora angosta en la misma esquina, siempre visible mientras se está en
   Patients, que lo vuelve a abrir con un clic. */
export function PatientInSessionPopup() {
  const enCurso = useMemo(
    () => datosDelDia(HOY_DEMO).appointments.filter((a) => !a.completado),
    [],
  )
  const [indice, setIndice] = useState(0)
  const [segundos, setSegundos] = useState(0)
  const [abierto, setAbierto] = useState(true)

  useEffect(() => {
    setSegundos(0)
    const id = setInterval(() => setSegundos((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [indice])

  if (enCurso.length === 0) return null

  const actual = enCurso[indice]
  const mm = String(Math.floor(segundos / 60)).padStart(2, '0')
  const ss = String(segundos % 60).padStart(2, '0')

  const puntoVivo = (
    <span className="absolute -top-0.5 -right-0.5 flex size-3 items-center justify-center">
      <span className="absolute size-full animate-ping rounded-full bg-[#1e9850] opacity-75 motion-reduce:animate-none" />
      <span className="relative size-2 rounded-full bg-[#1e9850]" />
    </span>
  )

  if (!abierto) {
    return (
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className="fixed right-6 bottom-6 z-30 flex items-center gap-2 rounded-full border border-[#e4e4e7] bg-white py-2 pr-4 pl-2 shadow-[0_8px_24px_rgb(0_0_0/0.16)] transition-shadow hover:shadow-[0_10px_28px_rgb(0_0_0/0.22)]"
      >
        <span className="relative flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e9f5ee] text-[9px] font-bold text-[#17723c]">
          {actual.initials}
          {puntoVivo}
        </span>
        <span className="text-[12px] font-semibold text-[#09090b]">Currently being seen</span>
      </button>
    )
  }

  return (
    <div className="fixed right-6 bottom-6 z-30 flex w-[300px] flex-col gap-3 rounded-2xl border border-[#e4e4e7] bg-white p-4 shadow-[0_12px_32px_rgb(0_0_0/0.16)]">
      <div className="flex items-start gap-3">
        <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e9f5ee] text-[11px] font-bold text-[#17723c]">
          {actual.initials}
          {puntoVivo}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-[#1e9850] uppercase">
            <Radio className="size-3" /> Currently being seen
          </div>
          <p className="truncate text-[13px] font-bold text-[#09090b]">{actual.name}</p>
          <p className="truncate text-[11px] text-[#71717a]">{actual.operatory} · {actual.provider}</p>
        </div>
        <button
          type="button"
          onClick={() => setAbierto(false)}
          aria-label="Minimize"
          className="shrink-0 text-[#a1a1aa] hover:text-black"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="flex items-center justify-between rounded-lg bg-[#f6f8fc] px-3 py-2">
        <span className="text-[11px] text-[#71717a]">In chair for</span>
        <span className="text-dash-blue text-[13px] font-bold tabular-nums">{mm}:{ss}</span>
      </div>

      <div className="flex items-center gap-2">
        <Link
          to={`/patients/${slug(actual.name)}`}
          className="border-dash-blue text-dash-blue flex h-8 flex-1 items-center justify-center gap-1 rounded-md border text-[12px] font-semibold hover:bg-[#f0f5ff]"
        >
          View chart <ArrowRight className="size-3.5" />
        </Link>
        {enCurso.length > 1 && (
          <button
            type="button"
            onClick={() => setIndice((i) => (i + 1) % enCurso.length)}
            className="bg-dash-blue hover:bg-dash-blue-hover flex h-8 flex-1 items-center justify-center gap-1 rounded-md text-[12px] font-semibold text-white"
          >
            Check out <LogOut className="size-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}
