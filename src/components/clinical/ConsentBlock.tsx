import { useState } from 'react'
import { Bookmark, CircleCheck, CircleAlert, History, MoreVertical, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { CONSENTIMIENTO, type Firma } from '@/data/treatment-plan'
import { ICONO_SUELTO } from '@/lib/estilos'

/* Figma 4122:250449, rediseñado.

   El frame lo pone al pie del caso: una fila ámbar con el título, la misma
   advertencia repetida dos veces —"Provider signature pending"— y dos botones
   de ícono sin rótulo. Para saber quién firmó había que abrir Consent history y
   recién ahí elegir el documento.

   Acá el documento es lo primero de la pantalla y el bloque responde las tres
   preguntas que importan sin abrir nada: **qué documento es, quién firmó y qué
   falta hacer**. El historial queda de vista secundaria, detrás de un botón.

   El ámbar se mantiene, pero como acento del estado pendiente, no como marco de
   toda la card: cuando las dos firmas están, el bloque pasa a verde solo. */

const TONO = {
  Pending: { bar: '#99660d', pill: 'border-warn-fg bg-warn-bg text-warn-fg', tile: 'bg-warn-bg text-warn-fg' },
  Signed: { bar: '#1a804d', pill: 'border-dash-ok-fg bg-dash-ok-bg text-dash-ok-fg', tile: 'bg-dash-ok-bg text-dash-ok-fg' },
  Expired: { bar: '#b22626', pill: 'border-dash-bad-fg bg-dash-bad-bg text-dash-bad-fg', tile: 'bg-dash-bad-bg text-dash-bad-fg' },
}

export function FilaFirma({ f }: { f: Firma }) {
  const ok = f.estado === 'Signed'
  return (
    <div className="flex min-w-0 items-center gap-2">
      {ok
        ? <CircleCheck className="size-4 shrink-0 text-dash-ok-fg" />
        : <CircleAlert className="size-4 shrink-0 text-warn-fg" />}
      <span className="min-w-0 flex-1 truncate text-[13px] text-ink">
        <span className="font-semibold">{f.rol}</span>
        <span className="text-ink-muted"> · {f.nombre}</span>
      </span>
      <span className={cn('shrink-0 text-[12px] font-medium', ok ? 'text-dash-ok-fg' : 'text-warn-fg')}>
        {ok ? `Signed ${f.fecha}` : 'Signature pending'}
      </span>
    </div>
  )
}

export function PanelHistorial({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30" onClick={onClose}>
      <aside
        role="dialog"
        aria-label="Consent history"
        onClick={(e) => e.stopPropagation()}
        className="motion-safe:animate-[panel-in_180ms_ease-out] flex h-full w-full max-w-[380px] flex-col bg-white"
      >
        <div className="flex items-start justify-between gap-3 p-5">
          <span className="min-w-0">
            <h2 className="text-[18px] font-bold text-ink">Consent history</h2>
            <p className="mt-0.5 truncate text-[12px] text-ink-muted">{CONSENTIMIENTO.titulo}</p>
          </span>
          <button onClick={onClose} aria-label="Close" className="shrink-0 text-ink hover:opacity-60">
            <X className="size-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5">
          <ol className="flex flex-col">
            {CONSENTIMIENTO.historial.map((h, i, todos) => (
              <li key={h.id} className="flex gap-3">
                <span className="flex flex-col items-center">
                  <span className={cn('mt-1 size-2 shrink-0 rounded-full', i === 0 ? 'bg-dash-blue' : 'bg-line-strong')} />
                  {i < todos.length - 1 && <span className="w-px flex-1 bg-line" />}
                </span>
                <span className="min-w-0 flex-1 pb-5">
                  <span className="block text-[13px] font-semibold text-ink">{h.evento}</span>
                  <span className="block text-[12px] text-ink-muted">
                    {h.version} · {h.fecha} · {h.autor}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </aside>
    </div>
  )
}

export function ConsentBlock() {
  const [firmas, setFirmas] = useState(CONSENTIMIENTO.firmas)
  const [historial, setHistorial] = useState(false)
  const [menu, setMenu] = useState(false)

  const pendientes = firmas.filter((f) => f.estado === 'Pending')
  const estado = pendientes.length === 0 ? 'Signed' : CONSENTIMIENTO.estado
  const t = TONO[estado]

  const firmar = (rol: Firma['rol']) => {
    setFirmas((fs) =>
      fs.map((f) => (f.rol === rol ? { ...f, estado: 'Signed' as const, fecha: '05/14/2026' } : f)),
    )
    aviso.ok(`${CONSENTIMIENTO.titulo} signed as ${rol.toLowerCase()}.`)
  }

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-line bg-white"
      style={{ borderLeftWidth: 3, borderLeftColor: t.bar }}
    >
      <div className="flex flex-wrap items-start gap-3 p-4">
        <span className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg', t.tile)}>
          <Bookmark className="size-4" />
        </span>

        <span className="min-w-[200px] flex-1">
          <span className="block text-[15px] font-bold text-ink">{CONSENTIMIENTO.titulo}</span>
          <span className="block text-[12px] text-ink-muted">
            {pendientes.length === 0
              ? 'All signatures collected'
              : `${pendientes.length} of ${firmas.length} signatures pending`}
          </span>
        </span>

        <span className={cn('shrink-0 rounded-full border px-2 py-[2px] text-[11px] font-semibold', t.pill)}>
          {estado}
        </span>

        {/* El historial es secundario: sólo el ícono, con su título. */}
        <button
          onClick={() => setHistorial(true)}
          title="Consent history"
          aria-label="Consent history"
          className={`${ICONO_SUELTO} size-9`}
        >
          <History className="size-4" />
        </button>

        <div className="relative shrink-0">
          <button
            onClick={() => setMenu((v) => !v)}
            aria-label="Consent actions"
            aria-expanded={menu}
            className={`${ICONO_SUELTO} size-9`}
          >
            <MoreVertical className="size-4" />
          </button>
          {menu && (
            <div className="absolute top-full right-0 z-30 mt-1 w-[200px] rounded-lg border border-line bg-white p-1 shadow-[0_12px_32px_rgb(0_0_0/0.18)]">
              {/* Sin fila de botones al pie, las acciones —incluida la firma
                  pendiente— viven acá. */}
              {pendientes.map((f) => (
                <button
                  key={f.rol}
                  onClick={() => { setMenu(false); firmar(f.rol) }}
                  className="text-dash-blue block w-full rounded px-3 py-2 text-left text-[13px] font-semibold hover:bg-surface-muted"
                >
                  Sign as {f.rol.toLowerCase()}
                </button>
              ))}
              {['Open document', 'Send to patient again', 'Replace document', 'Download PDF'].map((o) => (
                <button
                  key={o}
                  onClick={() => { setMenu(false); aviso.info(`${o} is not available in this release.`) }}
                  className="block w-full rounded px-3 py-2 text-left text-[13px] hover:bg-surface-muted"
                >
                  {o}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quién firmó y qué falta, sin abrir nada. */}
      <div className="flex flex-col gap-2 border-t border-line-soft px-4 py-3">
        {firmas.map((f) => <FilaFirma key={f.rol} f={f} />)}
      </div>

      {historial && <PanelHistorial onClose={() => setHistorial(false)} />}
    </div>
  )
}
