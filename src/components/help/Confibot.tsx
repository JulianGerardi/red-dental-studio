import { useEffect, useRef, useState } from 'react'
import { Bot, X, ArrowUp, Sparkles, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react'
import { TOPICS, MODULES, puntuarTema } from './topics'

/* Sin IA real: sólo búsqueda por palabras clave sobre TOPICS -decisión de
   Julián, para no pedirle consentimiento ni cobrarle a quien abra el
   artifact. Ver design-reference/figma/modulos/help.md. */
type Mensaje = { de: 'bot'; texto: string; temas?: string[] } | { de: 'user'; texto: string }

const SALUDO = 'Hi — I\'m Confibot. Ask me how something works and I\'ll take you to the screen it lives on and explain it there.'

const SUGERENCIAS = [
  'How do I add a patient?',
  'How do I book an appointment?',
  'Where do I see a patient\'s balance?',
  'How do I add another location?',
  'What does Clinical Mode do?',
  'Where do I manage my team?',
]

const CLAVE_HISTORIAL = 'confidentally.confibot-history'

function cargarHistorial(): Mensaje[] {
  try {
    const raw = localStorage.getItem(CLAVE_HISTORIAL)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function buscarRespuesta(consulta: string): Mensaje {
  const hits = TOPICS.map((t) => ({ t, puntaje: puntuarTema(t, consulta) }))
    .filter((r) => r.puntaje > 0)
    .sort((a, b) => b.puntaje - a.puntaje)
    .slice(0, 3)
  return hits.length
    ? {
        de: 'bot',
        texto: hits.length === 1 ? 'This is the one — open it and I\'ll point it out on screen.' : 'Here\'s what I found. Pick one and I\'ll show you where it is.',
        temas: hits.map((h) => h.t.id),
      }
    : { de: 'bot', texto: 'I couldn\'t find that one. I know about the dashboard, scheduling, patients, clinical mode and settings — try naming one of those.' }
}

export function Confibot({ onShowOnScreen }: { onShowOnScreen: (topicId: string) => void }) {
  const [abierto, setAbierto] = useState(false)
  const [recogido, setRecogido] = useState(false)
  const [borrador, setBorrador] = useState('')
  const [historial, setHistorial] = useState<Mensaje[]>(() => cargarHistorial())
  const listaRef = useRef<HTMLDivElement>(null)
  const ultimaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    localStorage.setItem(CLAVE_HISTORIAL, JSON.stringify(historial))
  }, [historial])

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

  if (!abierto) {
    if (recogido) {
      return (
        <button
          type="button" onClick={() => setRecogido(false)} aria-label="Bring Confibot back"
          className="fixed right-4 bottom-0 z-40 flex h-8 items-center gap-1.5 rounded-t-xl bg-[linear-gradient(110deg,#1d56bc,#4d8bff,#0043c7,#1d56bc)] bg-[length:200%_100%] px-3 text-white shadow-lg hover:motion-safe:[animation:confibot-sheen_2.4s_linear_infinite] sm:right-6"
        >
          <ChevronUp className="size-4 shrink-0" />
          <span className="text-[13px] font-semibold">Confibot</span>
        </button>
      )
    }
    return (
      <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-1 sm:right-6 sm:bottom-6">
        <button
          type="button" onClick={() => setRecogido(true)} aria-label="Tuck Confibot away"
          className="flex size-6 items-center justify-center rounded-full border border-[#e4e4e7] bg-white text-[#71717a] shadow-sm hover:text-[#09090b]"
        >
          <ChevronDown className="size-3.5" />
        </button>
        <div className="group relative">
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-[5px] rounded-full bg-[linear-gradient(110deg,#1d56bc,#2f74f5,#0049d1,#1d56bc)] bg-[length:200%_100%] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:motion-safe:[animation:confibot-sheen_2.4s_linear_infinite] group-focus-within:opacity-100"
          />
          <button
            type="button" onClick={() => setAbierto(true)} aria-label="Open Confibot"
            className="relative flex h-12 items-center rounded-full bg-[linear-gradient(110deg,#1d56bc,#2f74f5,#0049d1,#1d56bc)] bg-[length:200%_100%] px-3.5 text-white shadow-lg ring-white transition-[padding,box-shadow] duration-300 group-hover:pr-5 group-hover:ring-2 group-focus-within:pr-5 group-focus-within:ring-2"
          >
            <Bot className="size-5 shrink-0" />
            <span className="max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[90px] group-hover:opacity-100 group-focus-within:ml-2 group-focus-within:max-w-[90px] group-focus-within:opacity-100">
              Confibot
            </span>
          </button>
        </div>
      </div>
    )
  }

  const preguntas = historial.filter((m) => m.de === 'user').length

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center sm:inset-x-auto sm:right-6 sm:bottom-6">
      <div className="motion-safe:[animation:sheet-in_220ms_ease-out] flex h-[min(560px,82svh)] w-full flex-col overflow-hidden rounded-t-2xl border border-[#e4e4e7] bg-white shadow-[0_8px_28px_rgb(0_0_0/0.18)] sm:max-w-[400px] sm:rounded-2xl">
        <span aria-hidden className="mx-auto mt-2 h-1 w-9 shrink-0 rounded-full bg-[#e4e4e7] sm:hidden" />

        <div className="flex items-center gap-2 border-b border-[#e4e4e7] px-4 py-3">
          <span className="bg-dash-count-bg text-dash-blue flex size-8 shrink-0 items-center justify-center rounded-full">
            <Bot className="size-4" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-bold text-[#09090b]">Confibot</span>
            <span className="block text-[11px] text-[#a1a1aa]">Here to explain the app</span>
          </span>
          <button
            type="button" aria-label="Close Confibot" onClick={() => setAbierto(false)}
            className="ml-auto flex size-7 shrink-0 items-center justify-center rounded-md text-[#71717a] hover:bg-[#f4f4f5]"
          >
            <X className="size-4" />
          </button>
        </div>

        <div ref={listaRef} className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4">
          <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-[#f1f5f9] px-3 py-2 text-[13px] leading-relaxed text-[#09090b]">
            {SALUDO}
          </div>

          {preguntas > 0 && (
            <span className="flex items-center gap-2 pt-1 text-[10px] font-semibold tracking-wide text-[#d4d4d8] uppercase">
              <span className="h-px flex-1 bg-[#e4e4e7]" /> Your questions <span className="h-px flex-1 bg-[#e4e4e7]" />
            </span>
          )}

          {historial.map((m, i) =>
            m.de === 'bot' ? (
              <div key={i} ref={i === historial.length - 1 ? ultimaRef : undefined} className="flex flex-col gap-2">
                <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-[#f1f5f9] px-3 py-2 text-[13px] leading-relaxed text-[#09090b]">
                  {m.texto}
                </div>
                {m.temas?.map((id) => {
                  const t = TOPICS.find((x) => x.id === id)
                  if (!t) return null
                  const mod = MODULES.find((x) => x.id === t.module)
                  return (
                    <button
                      key={id} type="button"
                      onClick={() => { onShowOnScreen(t.id); setAbierto(false) }}
                      className="group flex w-full items-center gap-2 rounded-lg border border-[#e4e4e7] bg-white px-3 py-2 text-left hover:border-[#1d56bc]"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="text-dash-blue block text-[10px] font-semibold tracking-wide uppercase">{mod?.label}</span>
                        <span className="block truncate text-[13px] font-semibold text-[#09090b]">{t.title}</span>
                      </span>
                      <ChevronRight className="group-hover:text-dash-blue size-3.5 shrink-0 text-[#a1a1aa]" />
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
            <span className="text-dash-blue flex items-center gap-1.5 text-[11px] font-semibold">
              <Sparkles className="size-3" /> {preguntas === 0 ? 'Try one of these' : 'Or pick another'}
            </span>
            {SUGERENCIAS.map((s) => (
              <button
                key={s} type="button" onClick={() => preguntar(s)}
                className="hover:border-dash-blue w-full rounded-lg border border-[#e4e4e7] bg-white px-3 py-2 text-left text-[13px] text-[#71717a] hover:text-[#09090b]"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); preguntar(borrador) }}
          className="flex items-center gap-2 border-t border-[#e4e4e7] p-3"
        >
          <input
            value={borrador} onChange={(e) => setBorrador(e.target.value)}
            placeholder="Ask me anything about the app" aria-label="Ask Confibot"
            className="focus:border-dash-blue h-9 min-w-0 flex-1 rounded-lg border border-[#e4e4e7] bg-white px-3 text-[13px] text-[#09090b] placeholder:text-[#a1a1aa] focus:outline-none"
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
