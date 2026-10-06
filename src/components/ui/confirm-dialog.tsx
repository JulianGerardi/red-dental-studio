import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'

/* Confirmación de una sola pregunta ("Discard and close?"): lo único que no se abre como drawer, igual que en
   Confidentally 2.0. Es chica y centrada porque se contesta sí o no, sin cargar nada. Ver Elements / ConfirmDialog. */
export function ConfirmDialog({
  title, children, confirmLabel, onConfirm, onCancel, tone = 'primary', cancelLabel = 'Cancel',
}: {
  title: string
  children: ReactNode
  confirmLabel: string
  onConfirm: () => void
  onCancel: () => void
  /** danger: borra o descarta algo que no se recupera. */
  tone?: 'primary' | 'danger'
  cancelLabel?: string
}) {
  return (
    <Dialog open onOpenChange={(v) => !v && onCancel()}>
      <DialogContent showCloseButton={false} className="gap-3 p-5 sm:max-w-[420px]">
        <DialogTitle className="text-base leading-snug font-bold text-ink">{title}</DialogTitle>
        <DialogDescription asChild>
          <div className="text-[13px] leading-relaxed text-ink-soft">{children}</div>
        </DialogDescription>
        <div className="mt-2 flex flex-wrap justify-end gap-2">
          <Button variant="secondary" size="md" onClick={onCancel}>{cancelLabel}</Button>
          <Button variant={tone === 'danger' ? 'destructive' : 'primary'} size="md" onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
