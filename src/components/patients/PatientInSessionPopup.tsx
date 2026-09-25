import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, LogOut, Radio, UserRound } from 'lucide-react'
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
   1b. Primera versión de la lista: filas apretadas -8px de alto entre ellas,
      sin línea divisoria- y el punto verde animado repetido en cada avatar.
      Julián marcó las dos cosas: sin jerarquía (todo el texto pesaba igual,
      la room -el dato que justifica la lista- se perdía en una línea gris
      junto al provider) y el `animate-ping` de cada fila, repetido varias
      veces a la vez, mareaba en vez de comunicar "en vivo". Ahora: nombre en
      negro/negrita arriba, la room como chip de color abajo -es el dato que
      distingue una fila de otra-, provider en gris al lado del chip, hora y
      Check out a la derecha; filas separadas por una línea, no por gap. El
      ping se saca de cada fila -"en vivo" ya lo dice el label verde de
      arriba- y se deja sólo en el avatar de la pestaña cerrada, donde es un
      único aviso con sentido ("hay algo pasando"), no un parpadeo por fila.
   1c. Segunda vuelta: con jerarquía pero el botón del avatar seguía
      estirado a lo alto por `items-stretch` -un ícono chico centrado en un
      montón de blanco-. Julián pidió dos cosas más: un ícono de colapsar
      arriba en vez de dejar ese hueco, y sacar el punto verde también de la
      pestaña cerrada -"esa animación del círculo" pasa al stroke de toda la
      caja, tipo indicador "vivo" de un panel de IA (glow suave en el
      borde, `session-live` en index.css) en vez de un punto que titila.
      `items-start` en la fila hace que el botón ya no se estire; abierto,
      ese mismo botón cambia el avatar por un chevron de colapsar (con
      `items-start` queda del tamaño justo, no ocupa la fila entera). El
      glow sólo corre si `visibles.length` > 0 -nadie en curso, nada que
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
  const hayEnCurso = visibles.length > 0
  const primero = visibles[0]

  return (
    <div ref={ref} className="fixed top-1/2 right-0 z-30 -translate-y-1/2">
      {/* El ancho es lo único que anima: crece desde la pestaña (54px) hasta
          la card completa (336px), siempre pegada al mismo borde derecho
          -por eso el ancla es `right-0` y no `left`, así el lado del avatar
          no se mueve, sólo se abre hacia la izquierda-.

          `items-start` en vez de `items-stretch`: con stretch, el botón del
          avatar se estiraba a lo alto de toda la card abierta -un ícono
          chico centrado en un montón de blanco de más-. Con start, el botón
          se queda en su tamaño natural sin importar cuánto mida el
          contenido de al lado.

          El glow (`session-live`, en index.css) reemplaza el punto verde
          animado: un aviso en el borde de toda la caja en vez de un punto
          que titila, y sólo corre si hay alguien en curso -si `visibles`
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
                  ? `Currently being seen: ${visibles.length} patients`
                  : `Currently being seen: ${primero.name}`
                : 'Currently being seen: no patients'
          }
          className="flex shrink-0 items-center py-3 pr-2.5 pl-3 hover:bg-surface-subtle"
        >
          {abierto ? (
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full text-ink-muted">
              <ChevronRight className="size-4" />
            </span>
          ) : hayEnCurso ? (
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e9f5ee] text-[10px] font-bold text-[#17723c]">
              {primero.initials}
            </span>
          ) : (
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-muted text-ink-faint">
              <UserRound className="size-4" />
            </span>
          )}
        </button>

        {/* min-w mayor al hueco que deja la pestaña cerrada a propósito: así
            el contenido queda recortado por el `overflow-hidden` de arriba
            en vez de forzar a la caja a ser más ancha. La opacidad entra un
            toque después que el ancho -`delay-100`- para que no se vea el
            texto aplastándose mientras todavía no hay lugar.

            `max-h` (con su propio overflow-hidden) es lo que evita que este
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
            <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-[#1e9850] uppercase">
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
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e9f5ee] text-[10px] font-bold text-[#17723c]">
                      {p.initials}
                    </span>
                    <Link to={`/patients/${slug(p.name)}`} className="min-w-0 flex-1">
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
                        aria-label={`Check out ${p.name}`}
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
