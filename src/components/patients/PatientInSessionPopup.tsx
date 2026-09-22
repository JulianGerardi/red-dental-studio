import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, LogOut, Radio } from 'lucide-react'
import { cn } from '@/lib/utils'
import { HOY_DEMO, datosDelDia } from '@/components/dashboard/dashboard-data'

/* Mismo slug que usa patientsStore para armar el id de un paciente nuevo:
   acá no hay un id real detrás del turno -sólo `name`-, así que se
   reconstruye igual para que "View chart" caiga en la misma ruta. */
const slug = (s: string) => s.toLowerCase().trim().replace(/\s+/g, '-')

/* Indicador de "quién está en el sillón ahora", activo en toda la app (ver
   AppShell.tsx) -Julián lo quiere visible esté donde esté navegando, no sólo
   en Patients-. Usa los mismos turnos de hoy que el panel "Today
   Appointments" de Patients.tsx -mismo `datosDelDia(HOY_DEMO)`-, así que no
   es un dato inventado aparte: un turno de hoy que todavía no está
   completado.

   Historial de esta pieza, todo por comentarios de Julián:
   1. Rotaba sola cada 14s con un timer. No tiene sentido: en la app real
      esto cambia cuando el provider hace el check-out del turno, no solo.
      Ahora el reloj sólo cuenta "en el sillón hace"; pasar al siguiente es
      la acción del botón "Check out" de abajo -mismo verbo que ya usa el
      botón del Dashboard-. Al llegar al final vuelve al primero: es una
      vitrina de demo, no una cola que se vacía.
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

   4. Julián no quiso el detalle como popover: con `DropdownMenu` (Radix) el
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
  const [indice, setIndice] = useState(0)
  const [segundos, setSegundos] = useState(0)
  const [abierto, setAbierto] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSegundos(0)
    const id = setInterval(() => setSegundos((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [indice])

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

  if (enCurso.length === 0) return null

  const actual = enCurso[indice]
  const mm = String(Math.floor(segundos / 60)).padStart(2, '0')
  const ss = String(segundos % 60).padStart(2, '0')

  return (
    <div ref={ref} className="fixed top-1/2 right-0 z-30 -translate-y-1/2">
      {/* El ancho es lo único que anima: crece desde la pestaña (54px, sólo
          el avatar) hasta la card completa (320px), siempre pegada al mismo
          borde derecho -por eso el ancla es `right-0` y no `left`, así el
          lado del avatar no se mueve, sólo se abre hacia la izquierda-. */}
      <div
        className={cn(
          'flex items-stretch overflow-hidden rounded-l-xl border border-r-0 border-[#e4e4e7] bg-white shadow-[0_8px_24px_rgb(0_0_0/0.16)] transition-[width] duration-300 ease-out',
          abierto ? 'w-[320px]' : 'w-[54px]',
        )}
      >
        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-label={`Currently being seen: ${actual.name}`}
          className="flex shrink-0 items-center py-3 pr-2.5 pl-3 hover:bg-[#fafafa]"
        >
          <span className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e9f5ee] text-[10px] font-bold text-[#17723c]">
            {actual.initials}
            <span className="absolute -top-0.5 -right-0.5 flex size-3 items-center justify-center">
              <span className="absolute size-full animate-ping rounded-full bg-[#1e9850] opacity-75 motion-reduce:animate-none" />
              <span className="relative size-2 rounded-full bg-[#1e9850]" />
            </span>
          </span>
        </button>

        {/* min-w mayor al hueco que deja la pestaña cerrada a propósito: así
            el contenido queda recortado por el `overflow-hidden` de arriba
            en vez de forzar a la caja a ser más ancha. La opacidad entra un
            toque después que el ancho -`delay-100`- para que no se vea el
            texto aplastándose mientras todavía no hay lugar. */}
        <div
          className={cn(
            'flex min-w-[266px] flex-col justify-center gap-3 py-3 pr-4 transition-opacity duration-200',
            abierto ? 'opacity-100 delay-100' : 'pointer-events-none opacity-0',
          )}
        >
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-[#1e9850] uppercase">
              <Radio className="size-3" /> Currently being seen
            </div>
            <p className="truncate text-[13px] font-bold text-[#09090b]">{actual.name}</p>
            <p className="truncate text-[11px] text-[#71717a]">{actual.operatory} · {actual.provider}</p>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-[#f6f8fc] px-3 py-2">
            <span className="text-[11px] text-[#71717a]">In chair for</span>
            <span className="text-dash-blue text-[13px] font-bold tabular-nums">{mm}:{ss}</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/patients/${slug(actual.name)}`}
              className="border-dash-blue text-dash-blue flex h-8 flex-1 items-center justify-center gap-1 rounded-md border text-[12px] font-semibold whitespace-nowrap hover:bg-[#f0f5ff]"
            >
              View chart <ArrowRight className="size-3.5" />
            </Link>
            {enCurso.length > 1 && (
              <button
                type="button"
                onClick={() => setIndice((i) => (i + 1) % enCurso.length)}
                className="bg-dash-blue hover:bg-dash-blue-hover flex h-8 flex-1 items-center justify-center gap-1 rounded-md text-[12px] font-semibold whitespace-nowrap text-white"
              >
                Check out <LogOut className="size-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
