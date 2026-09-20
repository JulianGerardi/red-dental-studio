import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Radio, X } from 'lucide-react'
import { HOY_DEMO, datosDelDia } from '@/components/dashboard/dashboard-data'

/* Mismo slug que usa patientsStore para armar el id de un paciente nuevo:
   acá no hay un id real detrás del turno -sólo `name`-, así que se
   reconstruye igual para que "View chart" caiga en la misma ruta. */
const slug = (s: string) => s.toLowerCase().trim().replace(/\s+/g, '-')

/* Cada cuánto pasa al siguiente turno no completado de hoy. No hay reloj
   real detrás -es una demo-, pero rota para que el popup se sienta vivo y no
   una etiqueta fija todo el rato. */
const ROTACION_MS = 14000

/* Popup flotante de "quién está en el sillón ahora", en la sección de
   Patients (ver AppShell.tsx). Usa los mismos turnos de hoy que el panel
   "Today Appointments" de Patients.tsx -mismo `datosDelDia(HOY_DEMO)`-, así
   que no es un dato inventado aparte: un turno de hoy que todavía no está
   completado. El tiempo "en el sillón" es el del propio popup -cuánto hace
   que se lo está mirando-, no una hora de agenda vieja. */
export function PatientInSessionPopup() {
  const enCurso = useMemo(
    () => datosDelDia(HOY_DEMO).appointments.filter((a) => !a.completado),
    [],
  )
  const [indice, setIndice] = useState(0)
  const [segundos, setSegundos] = useState(0)
  const [cerrado, setCerrado] = useState(false)

  useEffect(() => {
    if (enCurso.length <= 1) return
    const id = setInterval(() => setIndice((i) => (i + 1) % enCurso.length), ROTACION_MS)
    return () => clearInterval(id)
  }, [enCurso.length])

  useEffect(() => {
    setSegundos(0)
    const id = setInterval(() => setSegundos((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [indice])

  if (cerrado || enCurso.length === 0) return null

  const actual = enCurso[indice]
  const mm = String(Math.floor(segundos / 60)).padStart(2, '0')
  const ss = String(segundos % 60).padStart(2, '0')

  return (
    <div className="fixed right-6 bottom-6 z-30 flex w-[300px] flex-col gap-3 rounded-2xl border border-[#e4e4e7] bg-white p-4 shadow-[0_12px_32px_rgb(0_0_0/0.16)]">
      <div className="flex items-start gap-3">
        <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e9f5ee] text-[11px] font-bold text-[#17723c]">
          {actual.initials}
          <span className="absolute -top-0.5 -right-0.5 flex size-3 items-center justify-center">
            <span className="absolute size-full animate-ping rounded-full bg-[#1e9850] opacity-75 motion-reduce:animate-none" />
            <span className="relative size-2 rounded-full bg-[#1e9850]" />
          </span>
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
          onClick={() => setCerrado(true)}
          aria-label="Dismiss"
          className="shrink-0 text-[#a1a1aa] hover:text-black"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="flex items-center justify-between rounded-lg bg-[#f6f8fc] px-3 py-2">
        <span className="text-[11px] text-[#71717a]">In chair for</span>
        <span className="text-dash-blue text-[13px] font-bold tabular-nums">{mm}:{ss}</span>
      </div>

      <Link
        to={`/patients/${slug(actual.name)}`}
        className="text-dash-blue flex items-center justify-center gap-1 text-[12px] font-semibold hover:underline"
      >
        View chart <ArrowRight className="size-3.5" />
      </Link>
    </div>
  )
}
