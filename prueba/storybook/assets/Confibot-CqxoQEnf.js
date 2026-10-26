import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useCallback, useEffect, useRef, useState } from 'react'
import { Bot, X, ArrowUp, Sparkles, ChevronRight, ChevronDown, ChevronLeft } from 'lucide-react'
import { TOPICS, MODULES, puntuarTema } from './topics'
import { cn } from '@/lib/utils'
import { useArrastrable, type Posicion } from '@/lib/useArrastrable'

/* Tamaño del botón cerrado (círculo): con esto alcanza para clampear el arrastre. */
const ANCHO_CERRADO = 44
const ALTO_CERRADO = 44

/* Sin IA real: sólo búsqueda por palabras clave sobre TOPICS -decisión de
   Julián, para no pedirle consentimiento ni cobrarle a quien abra el
   artifact. Ver design-reference/figma/modulos/help.md. */
export type Mensaje = { de: 'bot'; texto: string; temas?: string[] } | { de: 'user'; texto: string }

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
const CLAVE_RECOGIDO = 'confidentally.confibot-tucked'

function cargarHistorial(): Mensaje[] {
  try {
    const raw = localStorage.getItem(CLAVE_HISTORIAL)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function buscarRespuesta(consulta: string): Mensaje {
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

/* Recogido o no se recuerda entre visitas: quien lo esconde porque le
   estorba no tiene que volver a hacerlo cada vez que abre la app. */
export function useConfibotRecogido() {
  const [recogido, setRecogido] = useState(() => {
    try { return localStorage.getItem(CLAVE_RECOGIDO) === '1' } catch { return false }
  })
  useEffect(() => {
    try { localStorage.setItem(CLAVE_RECOGIDO, recogido ? '1' : '0') } catch { /* sin storage: sólo dura la visita */ }
  }, [recogido])
  return [recogido, setRecogido] as const
}

const DEGRADE = 'bg-[linear-gradient(110deg,var(--color-dash-blue),var(--color-dash-blue-glow),var(--color-dash-ring),var(--color-dash-blue))] bg-[length:200%_100%]'

/* El disparador flotante, en reposo la misma pestaña blanca que PatientInSessionPopup -mismo lado, misma estética,
   las dos un poco más chicas (Julián, 2026-10-26)-. Círculo entero (\`rounded-full\`), como el botón original (antes
   degradé azul) y como el video de referencia que mandó Julián de otra app -un paso intermedio había probado
   \`rounded-xl\` (cuadrado con esquinas redondeadas), que resultó ser para el estado recogido, no para el de reposo-.

   Arrastrable a cualquier parte (Julián, 2026-10-26, junto con PatientInSessionPopup: mismo hook,
   \`useArrastrable\`, misma razón -ver el punto 6 de PatientInSessionPopup.tsx-). Por default arranca abajo a la
   derecha (donde ya estaba, corrido si hay un FAB de página), pero eso es sólo el arranque: una vez que se
   arrastra, la posición se guarda y no vuelve sola.

   Sin el texto "Confibot" que aparecía al hover (Julián, 2026-10-26, mismo video de referencia: ahí el círculo es
   sólo el ícono, siempre). Con eso se cae la lógica de "hacia qué lado crece": el botón ya no cambia de ancho, un
   círculo de 44px siempre, así que ancla directo con \`left\`/\`top\` -ya no hace falta elegir \`right\` cerca del borde
   derecho real como si tuviera algo que desbordar-. La hoja de chat (\`Confibot\`, más abajo) sigue abriendo siempre
   en su lugar de siempre -abajo a la derecha-, no seguís el botón: moverlo no corre a dónde abre el chat.

   La pestaña recogida (\`recogido\`) pasa de pegarse al **borde de abajo** a pegarse al **costado derecho** (Julián,
   2026-10-26): no es arrastrable -es un estado ya escondido a propósito, no hace falta moverla-, pero sí toma el
   mismo \`pos.y\` de dónde estaba el botón antes de esconderse, para que quede ahí mismo, sólo contra el borde. Sigue
   con el degradé, a propósito -es la señal para volver a traerlo, no un estado de reposo-.

   La pestaña recogida ya no lleva el nombre siempre visible (Julián, 2026-10-26): el ícono del bot queda al lado del
   chevron -mismo cambio en PatientInSessionPopup, con su propio ícono-, y el nombre aparece recién al pasar el mouse
   (\`group-hover\`, ancho de 0 a 70px). Al traerlo de vuelta (clic en la pestaña), el botón de reposo entra con
   \`panel-in\` -la misma animación de deslizarse desde el borde derecho que usa el drawer (\`ui/drawer.tsx\`)-, no
   crece desde un círculo. Ver design-reference/figma/modulos/help.md. */
export function ConfibotLanzador({
  recogido, sobreFab = false, onAbrir, onRecoger, onTraer,
}: {
  recogido: boolean
  sobreFab?: boolean
  onAbrir: () => void
  onRecoger: () => void
  onTraer: () => void
}) {
  const defecto = useCallback((): Posicion => ({
    x: window.innerWidth - ANCHO_CERRADO,
    y: window.innerHeight - (sobreFab ? 100 : window.innerWidth >= 640 ? 24 : 16) - ALTO_CERRADO,
  }), [sobreFab])
  const { pos, handlers } = useArrastrable({
    clave: 'confidentally.confibot-pos',
    ancho: ANCHO_CERRADO, alto: ALTO_CERRADO,
    defecto,
    onTap: onAbrir,
  })

  if (recogido) {
    return (
      <button
        type="button" onClick={onTraer} aria-label="Bring Confibot back"
        style={{ top: pos.y }}
        className={cn(
          DEGRADE,
          'group fixed right-0 z-40 flex h-8 items-center gap-1.5 rounded-l-xl py-0 pr-3 pl-2.5 text-white shadow-lg hover:motion-safe:[animation:confibot-sheen_2.4s_linear_infinite] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-ring',
        )}
      >
        <ChevronLeft className="size-4 shrink-0" />
        <Bot className="size-3.5 shrink-0" />
        <span className="max-w-0 overflow-hidden text-[13px] font-semibold whitespace-nowrap transition-[max-width] duration-200 group-hover:max-w-[70px]">
          Confibot
        </span>
      </button>
    )
  }

  return (
    <div
      className="fixed z-40 flex flex-col items-end gap-1 motion-safe:animate-[panel-in_180ms_ease-out]"
      style={{ top: pos.y, left: pos.x }}
    >
      {/* 24px a la vista, 40px de área de toque. */}
      <button
        type="button" onClick={onRecoger} aria-label="Tuck Confibot away"
        className="relative flex size-6 items-center justify-center rounded-full border border-line bg-white text-ink-muted shadow-sm before:absolute before:-inset-2 before:content-[''] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-ring"
      >
        <ChevronDown className="size-3.5" />
      </button>
      {/* Sólo el ícono, sin el texto "Confibot" que aparecía al hover (Julián, 2026-10-26: así es en el video de
          referencia). Ancho fijo -ya no hay nada que crezca-, así que no hace falta elegir de qué lado anclar. */}
      <button
        type="button" {...handlers} aria-label="Open Confibot. Drag to move."
        className="flex size-11 shrink-0 cursor-grab items-center justify-center rounded-full border border-line bg-white text-ink shadow-floating outline-none active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-ring"
      >
        <span className="bg-dash-count-bg text-dash-blue flex size-7 shrink-0 items-center justify-center rounded-full">
          <Bot className="size-3.5" />
        </span>
      </button>
    </div>
  )
}

export function Confibot({
  abierto, onClose, onShowOnScreen, historialInicial,
}: {
  abierto: boolean
  onClose: () => void
  onShowOnScreen: (topicId: string) => void
  /** Sólo para mostrar estados en Storybook: arranca con esta conversación en vez de la guardada. */
  historialInicial?: Mensaje[]
}) {
  const [borrador, setBorrador] = useState('')
  const [historial, setHistorial] = useState<Mensaje[]>(() => historialInicial ?? cargarHistorial())
  const listaRef = useRef<HTMLDivElement>(null)
  const ultimaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!historialInicial) localStorage.setItem(CLAVE_HISTORIAL, JSON.stringify(historial))
  }, [historial, historialInicial])

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

  /* La hoja ocupa el lugar del botón flotante: montada nada más mientras está abierta. */
  if (!abierto) return null

  const preguntas = historial.filter((m) => m.de === 'user').length

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center sm:inset-x-auto sm:right-6 sm:bottom-6">
      <div className="motion-safe:[animation:sheet-in_220ms_ease-out] flex h-[min(560px,82svh)] w-full flex-col overflow-hidden rounded-t-2xl border border-line bg-white shadow-floating sm:max-w-[400px] sm:rounded-2xl">
        <span aria-hidden className="mx-auto mt-2 h-1 w-9 shrink-0 rounded-full bg-line sm:hidden" />

        <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
          <span className="bg-dash-count-bg text-dash-blue flex size-9 shrink-0 items-center justify-center rounded-full">
            <Bot className="size-4" />
          </span>
          <span className="min-w-0">
            <span className="block text-[18px] leading-tight font-bold text-ink">Confibot</span>
            <span className="mt-0.5 block text-[12px] text-ink-muted">Here to explain the app</span>
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
            <span className="flex items-center gap-2 pt-1 text-[11px] font-semibold tracking-wide text-ink-faint uppercase">
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
                        <span className="text-dash-blue block text-[11px] font-semibold tracking-wide uppercase">{mod?.label}</span>
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
            <span className="text-dash-blue flex items-center gap-1.5 text-[12px] font-semibold">
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
`})))()}export{n,i as r,r as t};