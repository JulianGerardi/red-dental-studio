import { useEffect, useLayoutEffect, useState } from 'react'
import { X, ArrowRight, ArrowLeft, ChevronDown, BookOpen } from 'lucide-react'
import type { Topic } from './topics'

/* Explica un tema encima de la pantalla real. Ver
   design-reference/figma/modulos/help.md. */
export type Coaching = Topic & { index: number; total: number }

type Caja = { top: number; left: number; width: number; height: number }

export function Spotlight({ anchor, topicId }: { anchor: string; topicId: string }) {
  const [caja, setCaja] = useState<Caja | null>(null)

  useLayoutEffect(() => {
    let frame = 0
    let intentos = 0
    function medir() {
      const el = document.querySelector<HTMLElement>(`[data-tour="${anchor}"]`)
      if (!el) {
        if (intentos++ < 40) frame = requestAnimationFrame(medir)
        return
      }
      el.scrollIntoView({ block: 'center', behavior: 'smooth' })
      const r = el.getBoundingClientRect()
      setCaja({ top: r.top, left: r.left, width: r.width, height: r.height })
    }
    setCaja(null)
    frame = requestAnimationFrame(medir)
    return () => cancelAnimationFrame(frame)
  }, [anchor, topicId])

  useEffect(() => {
    if (!caja) return
    function seguir() {
      const el = document.querySelector<HTMLElement>(`[data-tour="${anchor}"]`)
      if (!el) return
      const r = el.getBoundingClientRect()
      setCaja({ top: r.top, left: r.left, width: r.width, height: r.height })
    }
    window.addEventListener('scroll', seguir, true)
    window.addEventListener('resize', seguir)
    return () => {
      window.removeEventListener('scroll', seguir, true)
      window.removeEventListener('resize', seguir)
    }
  }, [anchor, caja])

  if (!caja) return null
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-30 rounded-lg motion-safe:[animation:coach-spotlight_1.6s_ease-out_1]"
      style={{ top: caja.top - 6, left: caja.left - 6, width: caja.width + 12, height: caja.height + 12 }}
    />
  )
}

export function CoachMark({
  coaching, onPrev, onNext, onClose, onBackToHelp,
}: {
  coaching: Coaching
  onPrev?: () => void
  onNext?: () => void
  onClose: () => void
  onBackToHelp: () => void
}) {
  const [plegado, setPlegado] = useState(false)
  const Demo = coaching.Demo
  const modulo = coaching.module

  return (
    <>
      {coaching.anchor && <Spotlight anchor={coaching.anchor} topicId={coaching.id} />}

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center p-3 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:justify-end sm:p-0">
        <div className="pointer-events-auto motion-safe:animate-[loc-in_180ms_ease-out] flex w-full max-w-[380px] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_8px_28px_rgb(0_0_0/0.18)]">
          <div className="flex items-center gap-2 px-4 pt-3.5">
            <span className="text-dash-blue text-[10px] font-semibold tracking-wide uppercase">{modulo}</span>
            <span className="text-[10px] text-ink-faint">{coaching.index + 1}/{coaching.total}</span>
            <span className="ml-auto flex items-center gap-0.5">
              <button
                type="button" aria-label={plegado ? 'Expand the explanation' : 'Collapse the explanation'}
                aria-expanded={!plegado} onClick={() => setPlegado((v) => !v)}
                className="flex size-6 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted"
              >
                <ChevronDown className={`size-3.5 transition-transform ${plegado ? '' : 'rotate-180'}`} />
              </button>
              <button
                type="button" aria-label="Close the explanation" onClick={onClose}
                className="flex size-6 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted"
              >
                <X className="size-3.5" />
              </button>
            </span>
          </div>

          <p className="px-4 pt-1 text-[13px] font-bold text-ink">{coaching.title}</p>

          {!plegado && (
            <>
              <div className="px-4 pt-3"><Demo /></div>
              <p className="px-4 pt-3 text-xs leading-relaxed text-ink-muted">{coaching.body}</p>
            </>
          )}

          <div className="flex flex-wrap items-center gap-2 px-4 py-3">
            <button
              type="button" onClick={onBackToHelp}
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12px] font-medium text-ink-muted hover:bg-surface-muted"
            >
              <BookOpen className="size-3" /> Back to Help
            </button>
            <span className="ml-auto flex items-center gap-2">
              {onPrev && (
                <button
                  type="button" onClick={onPrev}
                  className="flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 text-[12px] font-medium text-ink hover:bg-surface-subtle"
                >
                  <ArrowLeft className="size-3" /> Back
                </button>
              )}
              {onNext ? (
                <button
                  type="button" onClick={onNext}
                  className="bg-dash-blue hover:bg-dash-blue-hover flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12px] font-semibold text-white"
                >
                  Next <ArrowRight className="size-3" />
                </button>
              ) : (
                <button
                  type="button" onClick={onClose}
                  className="bg-dash-blue hover:bg-dash-blue-hover rounded-md px-2.5 py-1.5 text-[12px] font-semibold text-white"
                >
                  Done
                </button>
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
