import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, LogOut, PanelRightClose, Radio, UserRound } from 'lucide-react'
import { cn } from '@/lib/utils'
import { HOY_DEMO, datosDelDia } from '@/components/dashboard/dashboard-data'
import { Avatar } from '@/components/ui/avatar'
import { useArrastrable, type Posicion, type RectFlotante } from '@/lib/useArrastrable'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { PanelDock } from '@/components/layout/DockFlotantes'

/* Tamaño de la pestaña cerrada: con esto alcanza para clampear el arrastre (ver 6. abajo). */
const ANCHO_CERRADO = 46
const ALTO_CERRADO = 48

const CLAVE_RECOGIDA = 'confidentally.patient-popup-tucked'

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
      Radix-.

   5. Pestaña cerrada un poco más chica (Julián, 2026-10-26, junto con el
      ícono de Confibot: la misma estética -pestaña blanca pegada al borde,
      sin texto cerrada- pasa a ser también la del disparador de Confibot,
      ver Confibot.tsx). Avatar de 32 a 28px (\`size={28}\`), padding del
      botón más justo; la pestaña cerrada queda en 46px (antes 54). La card
      abierta no cambia: lo que ocupa lugar todo el tiempo es la pestaña, no
      la lista, que sólo se ve al tocarla.

   6. Arrastrable a cualquier parte (Julián, 2026-10-26, junto con Confibot:
      \`useArrastrable\` en lib/, compartido entre los dos). Deja de estar
      anclada siempre al borde derecho -ahora es \`left\`/\`top\` en px, con la
      posición guardada en localStorage (sobrevive a recargar)-. Por eso dos
      cosas más cambian:
      - **Sin la media estética de "pestaña pegada al borde"**: antes tenía
        un borde menos y esquinas redondeadas sólo de un lado porque siempre
        tocaba el borde físico de la ventana. Suelta en cualquier parte de la
        pantalla eso se veía roto, así que pasa a tener las cuatro esquinas y
        el borde completo: círculo cerrada (\`rounded-full\`), rectángulo con
        esquinas redondeadas abierta (\`rounded-xl\`) -Julián mandó un video de
        referencia (otra app) con el ícono en reposo como círculo completo,
        2026-10-26; un paso intermedio había probado \`rounded-xl\` también
        cerrada, que no era lo que pedía-.
      - **La card abierta crece para el lado con más lugar**, no siempre a la
        izquierda: si se arrastra cerca del borde izquierdo, abre hacia la
        derecha. Mismo cálculo para el alto si se arrastra cerca del borde de
        abajo (abre hacia arriba). Un clic corto abre o colapsa como siempre;
        uno largo la mueve -no hace falta un modo "arrastre" aparte-.

   7. Misma funcionalidad de esconder que Confibot (Julián, 2026-10-26):
      flechita chica arriba del avatar (igual estética que la de Confibot)
      que la manda a una pestaña angosta pegada al costado derecho -mismo
      patrón que \`recogido\` en Confibot.tsx, no comparten
      código porque cada una coordina estados propios (acá no hay nada
      externo que avisar; Confibot sí, por la hoja de chat aparte)-. Se
      recuerda entre visitas (\`confidentally.patient-popup-tucked\` en
      localStorage). La pestaña recogida toma el mismo \`pos.y\` de dónde
      estaba antes de esconderse, no es arrastrable -ya es un estado
      escondido a propósito-, y el texto dice "Patients" en vez de
      "Confibot": blanca, no el degradé azul -ese color es la señal propia
      de Confibot, no corresponde acá-.

   8. La pestaña recogida ya no lleva "Patients" siempre visible (Julián,
      2026-10-26, mismo cambio en Confibot.tsx): el ícono (\`UserRound\`)
      queda al lado del chevron, y el nombre aparece recién al pasar el
      mouse (\`group-hover\`, ancho de 0 a 70px). Al traerla de vuelta (clic
      en la pestaña), la pestaña de reposo entra con \`panel-in\` -la misma
      animación de deslizarse desde el borde derecho que usa el drawer
      (\`ui/drawer.tsx\`)-, no crece desde un círculo.
   9. Ese clic trae la pestaña Y la abre de una (Julián, 2026-10-26: no
      tenía que hacer falta un segundo clic sobre el avatar para recién ahí
      ver el popup). \`setAbierto(true)\` junto con \`setRecogido(false)\` en el
      mismo handler.
   10. El botón de esconder cambia de \`ChevronDown\` a \`PanelRightClose\`
      (Julián, 2026-10-27: una flecha sola no decía que esto manda el
      widget a un costado, no lo cierra) -mismo ícono que ya usa la app
      para "colapsar un panel lateral" (Topbar, PatientSidePanel)-, con un
      tooltip ("Hide") por la misma razón. Mismo cambio en Confibot.tsx.
   11. \`z-[41]\` en vez de \`z-30\` (Julián, 2026-10-27): la hoja de chat de
      Confibot ahora abre anclada a su propio botón (Confibot.tsx), que por
      default cae cerca del borde derecho -el mismo costado donde vive esta
      pestaña-, así que la hoja puede terminar pasando justo por donde está.
      Con z-30 quedaba tapada del todo. Por arriba del z-40 de Confibot (el
      botón y la hoja) pero por debajo del z-50 de los drawers/diálogos, que
      tienen que seguir ganándole a cualquier flotante.
   12. Con la pestaña recogida -el estado por default desde 2026-10-27- la
      pestaña y la card viven en la columna del borde derecho
      (\`DockFlotantes\`, con Confibot): la pestaña arriba, la card
      desplegándose abajo de ella con \`PanelDock\` y empujando a la pestaña de
      Confibot (Julián, tres capturas). \`recogido\` no cambia al abrir. El
      círculo arrastrable sigue existiendo para quien lo tenga guardado, pero
      desde la pestaña no hay un clic para volver a él. */
export function PatientInSessionPopup({ onRect }: {
  /** El lugar que ocupa ahora (pestaña o círculo), para que la hoja de Confibot no lo tape al abrir. */
  onRect?: (r: RectFlotante) => void
}) {
  const enCurso = useMemo(
    () => datosDelDia(HOY_DEMO).appointments.filter((a) => !a.completado),
    [],
  )
  const [ocultos, setOcultos] = useState<Set<number>>(() => new Set())
  const [abierto, setAbierto] = useState(false)
  const [recogido, setRecogido] = useState(() => {
    try { return localStorage.getItem(CLAVE_RECOGIDA) !== '0' } catch { return true }
  })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try { localStorage.setItem(CLAVE_RECOGIDA, recogido ? '1' : '0') } catch { /* sin storage: sólo dura la visita */ }
  }, [recogido])

  const defecto = useCallback((): Posicion => ({
    x: window.innerWidth - ANCHO_CERRADO,
    y: window.innerHeight / 2 - ALTO_CERRADO / 2,
  }), [])
  const { pos, handlers } = useArrastrable({
    clave: 'confidentally.patient-popup-pos',
    ancho: ANCHO_CERRADO, alto: ALTO_CERRADO,
    defecto,
    onTap: () => setAbierto((v) => !v),
  })

  useLayoutEffect(() => {
    if (!onRect) return
    const avisar = () => onRect(recogido
      ? { x1: window.innerWidth - 130, x2: window.innerWidth, y1: pos.y, y2: pos.y + 32, tab: true }
      : { x1: pos.x, x2: pos.x + ANCHO_CERRADO, y1: pos.y, y2: pos.y + 28 + ALTO_CERRADO })
    avisar()
    window.addEventListener('resize', avisar)
    return () => window.removeEventListener('resize', avisar)
  }, [pos, recogido, onRect])

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

  /* La lista de "Currently being seen", la misma en la card que crece desde el círculo y en la acoplada a la pestaña
     recogida (punto 12 arriba). */
  const detalle = (
    <>
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
                <Avatar initials={p.initials} />
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
    </>
  )

  if (recogido) {
    /* En la columna del borde derecho (DockFlotantes, 2026-10-27, tres capturas de Julián): la pestaña arriba y la card
       desplegándose abajo de ella, empujando a la pestaña de Confibot. Otro clic en la pestaña, Escape o un clic afuera
       la cierran. \`ref\` en un \`contents\`: cubre la pestaña y la card, que son dos hijos separados de la columna. */
    const maxAlto = Math.min(360, window.innerHeight - 16 - 70)
    return (
      <div ref={ref} className="contents">
        <button
          type="button" onClick={() => setAbierto((v) => !v)} aria-expanded={abierto}
          aria-label={abierto ? 'Hide currently being seen list' : 'Open currently being seen'}
          className="pointer-events-auto group flex h-8 shrink-0 items-center gap-1.5 rounded-l-xl border border-r-0 border-line bg-white py-0 pr-3 pl-2.5 text-ink-muted shadow-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-ring"
        >
          <ChevronLeft className={cn('size-4 shrink-0 transition-transform duration-200', abierto && 'rotate-180')} />
          <UserRound className="size-3.5 shrink-0" />
          <span className={cn(
            'overflow-hidden text-[13px] font-semibold whitespace-nowrap transition-[max-width] duration-200',
            abierto ? 'max-w-[70px]' : 'max-w-0 group-hover:max-w-[70px]',
          )}>
            Patients
          </span>
        </button>
        <PanelDock abierto={abierto}>
          <div
            style={{ maxHeight: maxAlto }}
            className="flex w-[336px] max-w-full flex-col gap-2 overflow-hidden rounded-l-xl border border-r-0 border-line bg-white p-3 shadow-floating"
          >
            {detalle}
          </div>
        </PanelDock>
      </div>
    )
  }

  /* De qué lado hay más lugar: el cierre abre para ahí en vez de siempre hacia la izquierda, ahora que la pestaña
     puede estar en cualquier parte de la pantalla (arrastrable, punto 6 arriba). */
  const haciaIzquierda = pos.x + ANCHO_CERRADO / 2 > window.innerWidth / 2
  const haciaArriba = pos.y + ALTO_CERRADO / 2 > window.innerHeight / 2

  return (
    <div
      ref={ref}
      className="fixed z-[41] flex flex-col items-end gap-1 motion-safe:animate-[panel-in_180ms_ease-out]"
      style={{
        ...(haciaIzquierda ? { right: window.innerWidth - pos.x - ANCHO_CERRADO } : { left: pos.x }),
        ...(abierto && haciaArriba ? { bottom: window.innerHeight - pos.y - ALTO_CERRADO } : { top: pos.y }),
      }}
    >
      {/* 24px a la vista, 40px de área de toque -mismo patrón que el botón de esconder de Confibot-. */}
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button" onClick={() => setRecogido(true)} aria-label="Hide currently being seen"
              className="relative flex size-6 items-center justify-center rounded-full border border-line bg-white text-ink-muted shadow-sm before:absolute before:-inset-2 before:content-[''] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-ring"
            >
              <PanelRightClose className="size-3.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-ink text-white">Hide</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {/* El ancho (y, si hace falta, el alto) son lo único que anima: crece desde la pestaña (46px) hasta la card
          completa (336px), hacia el lado con más lugar -no siempre a la izquierda, desde que es arrastrable-.

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
          'flex items-start overflow-hidden border border-line bg-white shadow-floating transition-[width,border-radius] duration-300 ease-out',
          abierto ? 'w-[336px] rounded-xl' : 'w-[46px] rounded-full',
          hayEnCurso && 'motion-safe:animate-[session-live_2.6s_ease-in-out_infinite]',
        )}
      >
        {/* Mismo botón siempre: agarra y arrastra (useArrastrable), y lo que muestra depende del estado -el avatar
            (o un ícono neutro si no hay nadie en curso) cerrado, un chevron de "colapsar" abierto, así hay algo útil
            arriba en vez de repetir un avatar que ya está abajo, en cada fila de la lista-. Un clic corto llama a
            onTap (abre/colapsa); uno largo mueve la pestaña y el clic no se dispara. */}
        <button
          type="button"
          {...handlers}
          aria-expanded={abierto}
          aria-label={
            abierto
              ? 'Collapse'
              : hayEnCurso
                ? visibles.length > 1
                  ? \`Currently being seen: \${visibles.length} patients. Drag to move.\`
                  : \`Currently being seen: \${primero.name}. Drag to move.\`
                : 'Currently being seen: no patients. Drag to move.'
          }
          className="flex shrink-0 cursor-grab items-center py-2.5 pr-2 pl-2.5 active:cursor-grabbing hover:bg-surface-subtle"
        >
          {abierto ? (
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full text-ink-muted">
              <ChevronRight className="size-3.5" />
            </span>
          ) : hayEnCurso ? (
            <Avatar initials={primero.initials} size={28} />
          ) : (
            <span className="flex size-7 shrink-0 items-center justify-center rounded-avatar bg-surface-muted text-ink-faint">
              <UserRound className="size-3.5" />
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
          {detalle}
        </div>
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};