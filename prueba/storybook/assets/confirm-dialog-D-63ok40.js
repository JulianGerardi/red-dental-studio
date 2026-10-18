import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { ReactNode } from 'react'
import { CircleAlert } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'

/* Confirmación de una sola pregunta ("Discard and close?"): lo único que no se abre como drawer, igual que en
   Confidentally 2.0. Es chica y centrada porque se contesta sin cargar nada. Ver Elements / ConfirmDialog.
   Con \`otherAction\` es una decisión de tres salidas antes de seguir (Consent required, clinical-mode.md 2026-10-17). */
export function ConfirmDialog({
  title, children, confirmLabel, onConfirm, onCancel, tone = 'primary', cancelLabel = 'Cancel', icon, otherAction, loading,
}: {
  title: string
  children: ReactNode
  confirmLabel: string
  onConfirm: () => void
  onCancel: () => void
  /** danger: borra o descarta algo que no se recupera. */
  tone?: 'primary' | 'danger'
  cancelLabel?: string
  /** warning: la acción pedida quedó frenada por algo que falta (Consent required). */
  icon?: 'warning'
  /** Una tercera salida, entre Cancel y la acción principal (Sign now). */
  otherAction?: { label: string; onClick: () => void }
  /** La acción principal está en curso: spinner en su botón y los otros quietos. */
  loading?: boolean
}) {
  return (
    <Dialog open onOpenChange={(v) => !v && !loading && onCancel()}>
      <DialogContent showCloseButton={false} className={cn('gap-3 p-5', otherAction ? 'sm:max-w-[480px]' : 'sm:max-w-[420px]')}>
        <div className="flex items-center gap-3">
          {icon === 'warning' && (
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-warn-bg text-warn-fg ring-1 ring-warn-fg/20">
              <CircleAlert className="size-[18px]" aria-hidden />
            </span>
          )}
          <DialogTitle className="text-base leading-snug font-bold text-ink">{title}</DialogTitle>
        </div>
        <DialogDescription asChild>
          <div className="text-[13px] leading-relaxed text-ink-soft">{children}</div>
        </DialogDescription>
        {/* Con tres salidas, en el celular los botones crecen y la principal baja sola a lo ancho. */}
        <div className={cn('mt-2 flex flex-wrap justify-end gap-2', otherAction && 'max-sm:[&>button]:flex-1')}>
          <Button variant="secondary" size="md" onClick={onCancel} disabled={loading}>{cancelLabel}</Button>
          {otherAction && <Button variant="secondary" size="md" onClick={otherAction.onClick} disabled={loading}>{otherAction.label}</Button>}
          <Button variant={tone === 'danger' ? 'destructive' : 'primary'} size="md" onClick={onConfirm} loading={loading}>{confirmLabel}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
`})))()}export{n,i as r,r as t};