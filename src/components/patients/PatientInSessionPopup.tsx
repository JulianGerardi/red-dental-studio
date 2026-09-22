import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { LogOut, Radio } from 'lucide-react'
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
   1. Al principio mostraba un paciente a la vez con un cronómetro de "en el
      sillón hace", y "Check out" pasaba al siguiente. Julián lo corrigió: un
      provider puede tener varios pacientes en curso a la vez, cada uno en su
      room -no son una cola de a uno-, así que ahora lista TODOS los turnos
      de `enCurso`, uno abajo del otro. El cronómetro se cae con el cambio
      -no tiene sentido un solo reloj para varios pacientes en paralelo-; en
      su lugar cada fila muestra la hora del turno, que ya es un dato real.
      "Check out" ahora es por fila y lo saca de la lista (estado local
      `ocultos`, por índice: son datos de demo, no hay id detrás).
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
  if (visibles.length === 0) return null

  const primero = visibles[0]

  return (
    <div ref={ref} className="fixed top-1/2 right-0 z-30 -translate-y-1/2">
      {/* El ancho es lo único que anima: crece desde la pestaña (54px, sólo
          el avatar del primero) hasta la card completa (320px), siempre
          pegada al mismo borde derecho -por eso el ancla es `right-0` y no
          `left`, así el lado del avatar no se mueve, sólo se abre hacia la
          izquierda-. */}
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
          aria-label={
            visibles.length > 1
              ? `Currently being seen: ${visibles.length} patients`
              : `Currently being seen: ${primero.name}`
          }
          className="flex shrink-0 items-center py-3 pr-2.5 pl-3 hover:bg-[#fafafa]"
        >
          <span className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e9f5ee] text-[10px] font-bold text-[#17723c]">
            {primero.initials}
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
            texto aplastándose mientras todavía no hay lugar.

            `max-h` (con su propio overflow-hidden) es lo que evita que este
            bloque, siempre presente en el DOM, estire la fila entera -y con
            ella el botón del avatar, por `items-stretch`- a su alto natural
            aunque esté cerrado y en ancho 0: cerrado cuenta como 0 de alto,
            así la pestaña vuelve a medir lo mismo que el botón solo. La
            lista interna tiene su propio scroll -el ancho de la caja no
            cambia con la cantidad de pacientes, así que si un provider tiene
            muchos no hay que seguir agrandando la card-. */}
        <div
          className={cn(
            'flex min-w-[266px] flex-col gap-2 overflow-hidden py-3 pr-3 transition-[opacity,max-height] duration-200',
            abierto ? 'max-h-[248px] opacity-100 delay-100' : 'pointer-events-none max-h-0 opacity-0',
          )}
        >
          <div className="flex items-center gap-1.5 px-1 text-[10px] font-semibold tracking-wide text-[#1e9850] uppercase">
            <Radio className="size-3" /> Currently being seen
          </div>

          <div className="flex flex-col gap-0.5 overflow-y-auto">
            {visibles.map((p) => {
              const i = enCurso.indexOf(p)
              return (
                <div key={i} className="group flex items-center gap-2 rounded-lg py-1 pr-1 pl-1 hover:bg-[#fafafa]">
                  <span className="relative flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e9f5ee] text-[9px] font-bold text-[#17723c]">
                    {p.initials}
                    <span className="absolute -top-0.5 -right-0.5 flex size-2.5 items-center justify-center">
                      <span className="absolute size-full animate-ping rounded-full bg-[#1e9850] opacity-75 motion-reduce:animate-none" />
                      <span className="relative size-1.5 rounded-full bg-[#1e9850]" />
                    </span>
                  </span>
                  <Link to={`/patients/${slug(p.name)}`} className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-bold text-[#09090b] group-hover:underline">{p.name}</p>
                    <p className="truncate text-[10.5px] text-[#71717a]">{p.operatory} · {p.provider}</p>
                  </Link>
                  <span className="shrink-0 text-[10.5px] whitespace-nowrap text-[#a1a1aa]">{p.time}</span>
                  <button
                    type="button"
                    aria-label={`Check out ${p.name}`}
                    onClick={() => setOcultos((prev) => new Set(prev).add(i))}
                    className="flex size-6 shrink-0 items-center justify-center rounded-md text-[#a1a1aa] hover:bg-[#eef1f5] hover:text-[#09090b]"
                  >
                    <LogOut className="size-3.5" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
