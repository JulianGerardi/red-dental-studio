import { useState } from 'react'
import { CircleCheck, CircleAlert, FileSignature, History, MoreVertical, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { CONSENTIMIENTO, type Firma } from '@/data/treatment-plan'
import { ICONO_SUELTO } from '@/lib/estilos'

/* Figma 4122:250449, rediseñado: una sola fila con el documento, su estado y las dos firmas. Ver clinical-mode.md. */

const TONO = {
  Pending: { bar: '#99660d', pill: 'border-warn-fg bg-warn-bg text-warn-fg', icono: 'text-warn-fg' },
  Signed: { bar: '#1a804d', pill: 'border-dash-ok-fg bg-dash-ok-bg text-dash-ok-fg', icono: 'text-dash-ok-fg' },
  Expired: { bar: '#b22626', pill: 'border-dash-bad-fg bg-dash-bad-bg text-dash-bad-fg', icono: 'text-dash-bad-fg' },
}

export function FilaFirma({ f }: { f: Firma }) {
  const ok = f.estado === 'Signed'
  return (
    <span className="flex min-w-0 items-center gap-1.5 text-[12.5px] whitespace-nowrap">
      {ok
        ? <CircleCheck className="size-4 shrink-0 text-dash-ok-fg" aria-hidden />
        : <CircleAlert className="size-4 shrink-0 text-warn-fg" aria-hidden />}
      <span className="font-semibold text-ink">{f.rol}</span>
      {/* Con la card angosta el nombre se esconde para que la fila no se parta; el rol y el estado quedan. */}
      <span className="sr-only text-ink-muted @5xl:not-sr-only">{f.nombre}</span>
      <span className={cn('font-medium', ok ? 'text-dash-ok-fg' : 'text-warn-fg')}>
        · {ok ? `Signed ${f.fecha}` : 'Pending'}
      </span>
    </span>
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
      className="@container relative flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-line bg-white py-2 pr-2 pl-4"
      style={{ borderLeftWidth: 3, borderLeftColor: t.bar }}
    >
      <span className="flex min-w-0 items-center gap-2">
        <FileSignature className={cn('size-4 shrink-0', t.icono)} aria-hidden />
        <span className="text-[14px] font-bold text-ink">{CONSENTIMIENTO.titulo}</span>
        <span className={cn('shrink-0 rounded-full border px-2 py-[1px] text-[11px] font-semibold', t.pill)}>
          {estado}
        </span>
        <span className="sr-only">
          {pendientes.length === 0
            ? 'All signatures collected'
            : `${pendientes.length} of ${firmas.length} signatures pending`}
        </span>
      </span>

      {/* Quién firmó y qué falta, en la misma línea. */}
      <span className="ml-auto flex flex-wrap items-center gap-x-4 gap-y-1">
        {firmas.map((f) => <FilaFirma key={f.rol} f={f} />)}
      </span>

      <span className="flex shrink-0 items-center">
        {/* El historial es secundario: sólo el ícono, con su título. */}
        <button
          onClick={() => setHistorial(true)}
          title="Consent history"
          aria-label="Consent history"
          className={`${ICONO_SUELTO} size-8`}
        >
          <History className="size-4" />
        </button>

        <div className="relative shrink-0">
          <button
            onClick={() => setMenu((v) => !v)}
            aria-label="Consent actions"
            aria-expanded={menu}
            className={`${ICONO_SUELTO} size-8`}
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
      </span>

      {historial && <PanelHistorial onClose={() => setHistorial(false)} />}
    </div>
  )
}
