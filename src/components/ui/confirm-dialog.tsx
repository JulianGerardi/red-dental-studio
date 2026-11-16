import { useRef, type ReactNode } from 'react'
import { CircleAlert, Info, Trash2, TriangleAlert } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'

/* Confirmación de una sola pregunta ("Discard and close?"): lo único que no se abre como drawer, igual que en
   Confidentally 2.0. Es chica y centrada porque se contesta sin cargar nada. Ver Elements / ConfirmDialog.
   Con `otherAction` es una decisión de tres salidas antes de seguir (Consent required, clinical-mode.md 2026-10-17).
   El tono lleva un ícono de 16 px junto al título, sin círculo (propuesta A, figma/README.md 2026-11-16). */
export function ConfirmDialog({
  title, children, confirmLabel, onConfirm, onCancel, tone = 'primary', cancelLabel = 'Cancel', icon, otherAction, loading, hideCancel,
}: {
  title: string
  children: ReactNode
  confirmLabel: string
  onConfirm: () => void
  onCancel: () => void
  /** danger: borra o descarta algo que no se recupera. */
  tone?: 'primary' | 'danger'
  cancelLabel?: string
  /** warning: hay algo que revisar antes de seguir (Consent required, turnos afectados). delete: borra algo (tacho).
      Sin esto, el ícono sale del tono: info azul o alerta roja. */
  icon?: 'warning' | 'delete'
  /** Una tercera salida, entre Cancel y la acción principal (Sign now). */
  otherAction?: { label: string; onClick: () => void }
  /** La acción principal está en curso: spinner en su botón y los otros quietos. */
  loading?: boolean
  /** Un aviso que frena la acción y no deja nada para elegir (Unable to deactivate…): sólo el botón principal. */
  hideCancel?: boolean
}) {
  const Icono = icon === 'delete' ? Trash2 : icon === 'warning' ? CircleAlert : tone === 'danger' ? TriangleAlert : Info
  /* Radix devuelve el foco a un Trigger que acá no hay: al cerrar vuelve al botón que abrió la pregunta (Save, Delete…). */
  const previo = useRef<HTMLElement | null>(document.activeElement as HTMLElement | null)
  return (
    <Dialog open onOpenChange={(v) => !v && !loading && onCancel()}>
      <DialogContent
        showCloseButton={false}
        className={cn('gap-3 p-5', otherAction ? 'sm:max-w-[480px]' : 'sm:max-w-[420px]')}
        onCloseAutoFocus={(e) => { e.preventDefault(); if (previo.current?.isConnected) previo.current.focus() }}
      >
        <div className="flex items-start gap-2">
          <Icono
            aria-hidden
            className={cn(
              'mt-[3px] size-4 shrink-0',
              tone === 'danger' ? 'text-dash-bad-fg' : icon === 'warning' ? 'text-warn-fg' : 'text-dash-blue',
            )}
          />
          <DialogTitle className="text-base leading-snug font-bold text-ink">{title}</DialogTitle>
        </div>
        <DialogDescription asChild>
          <div className="text-[13px] leading-relaxed text-ink-soft">{children}</div>
        </DialogDescription>
        {/* Con tres salidas, en el celular los botones crecen y la principal baja sola a lo ancho. */}
        <div className={cn('mt-2 flex flex-wrap justify-end gap-2', otherAction && 'max-sm:[&>button]:flex-1')}>
          {!hideCancel && <Button variant="secondary" size="md" onClick={onCancel} disabled={loading}>{cancelLabel}</Button>}
          {otherAction && <Button variant="secondary" size="md" onClick={otherAction.onClick} disabled={loading}>{otherAction.label}</Button>}
          <Button variant={tone === 'danger' ? 'destructive' : 'primary'} size="md" onClick={onConfirm} loading={loading}>{confirmLabel}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
