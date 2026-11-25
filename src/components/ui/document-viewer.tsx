import type { ReactNode } from 'react'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { ArrowLeft, FileText, Info, LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

/* El visor de documentos de la app (consentimientos, clinical notes, previews): siempre a pantalla completa, nunca en un
   drawer. Arriba volver (con el destino en el texto), qué documento es, su estado y View PDF; debajo un solo aviso si
   hace falta; la hoja sobre el escritorio gris; y la barra de acción abajo sólo si hay algo para hacer (firmar). Escape
   vuelve. Propuesta A de Julián (2026-11-24): ver design-reference/figma/README.md › Visor de documentos. */

const AVISO = {
  info: 'bg-info-bg text-dash-blue',
  neutral: 'border border-line bg-surface-subtle text-ink-muted',
} as const

export function DocumentViewer({
  title, subtitle, status, backLabel = 'Back', onBack, onPdf, pdfDisabled, notice, noticeTone = 'info', loading, footer, children,
}: {
  /** Qué documento es: el título de la barra (y del diálogo, para el lector de pantalla). */
  title: string
  /** Arriba del título, chico: de quién o qué tipo de documento. */
  subtitle?: string
  /** El estado al lado del título (una Pill). */
  status?: ReactNode
  /** El destino en el texto: "Back to history", "Back to editing". */
  backLabel?: string
  onBack: () => void
  /** Con esto aparece View PDF a la derecha (en el celular, sólo el ícono). */
  onPdf?: () => void
  pdfDisabled?: boolean
  /** Una línea debajo de la barra: qué falta o en qué modo está (cambios sin guardar, firma pendiente, ya no se firma). */
  notice?: ReactNode
  noticeTone?: keyof typeof AVISO
  /** "Preparing document..." en lugar de la hoja; View PDF espera. */
  loading?: boolean
  /** La barra de abajo: sólo cuando hay algo para hacer. */
  footer?: ReactNode
  children: ReactNode
}) {
  return (
    <DialogPrimitive.Root open onOpenChange={(o) => { if (!o) onBack() }}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-50 flex flex-col bg-white outline-none motion-safe:animate-[loc-in_150ms_ease-out]"
        >
          <header className="flex flex-col gap-3 border-b border-line px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="shrink-0" onClick={onBack}><ArrowLeft /> {backLabel}</Button>
              <span aria-hidden className="h-5 w-px shrink-0 bg-line max-sm:hidden" />
              <div className="flex min-w-0 flex-1 flex-col">
                {subtitle && <span className="truncate text-[11px] font-medium text-ink-muted">{subtitle}</span>}
                <DialogPrimitive.Title className="truncate text-[14px] leading-snug font-semibold text-ink">{title}</DialogPrimitive.Title>
              </div>
              {status && <span className="shrink-0 max-sm:hidden">{status}</span>}
              {onPdf && (
                <Button variant="secondary" size="sm" className="shrink-0" disabled={pdfDisabled || loading} onClick={onPdf} aria-label="View PDF">
                  <FileText /> <span className="max-sm:hidden">View PDF</span>
                </Button>
              )}
            </div>
            {status && <span className="sm:hidden">{status}</span>}
            {notice && (
              <p role="note" className={cn('flex items-start gap-2 rounded-md px-3 py-2 text-[13px] leading-snug', AVISO[noticeTone])}>
                <Info className="mt-px size-4 shrink-0" aria-hidden /> <span>{notice}</span>
              </p>
            )}
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto bg-surface-muted px-3 py-5 sm:px-6 sm:py-8">
            <div className="mx-auto w-full max-w-[900px]">
              {loading ? (
                <p role="status" className="flex min-h-[360px] flex-col items-center justify-center gap-2 text-[13px] text-ink-muted">
                  <LoaderCircle className="size-6 animate-spin text-dash-blue" aria-hidden /> Preparing document...
                </p>
              ) : children}
            </div>
          </div>

          {footer && !loading && (
            <footer className="flex flex-wrap items-center gap-3 border-t border-line bg-white px-4 py-3 sm:px-6">{footer}</footer>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
