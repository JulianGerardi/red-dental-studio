import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import * as React from 'react'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Drawer: un panel que entra desde la derecha, de alto completo, para cargar
   algo sin perder de vista la pantalla de atrás (el chart del examen mientras
   se carga un procedimiento). Ver Components / UI / Drawer.

   Por qué así:
   - Sólo cuando lo de atrás sirve de referencia mientras se completa el
     formulario. Para confirmar algo, Dialog; para un formulario suelto,
     ModalShell.
   - Título arriba con su X, contenido con scroll propio y las acciones fijas
     al pie: con un formulario de varios pasos los botones no se van de vista.
   - Radix Dialog por dentro: el foco queda adentro, Escape y la capa lo
     cierran. La capa es clara para que el chart se siga leyendo. */
export function Drawer({
  open, onClose, title, description, footer, children, className,
}: {
  open: boolean
  onClose: () => void
  title: string
  /** Bajada del título; si no hay, el título también la describe para el lector de pantalla. */
  description?: string
  /** Las acciones del pie, una debajo de la otra. */
  footer?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/20 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPrimitive.Content
          className={cn(
            'fixed inset-y-0 right-0 z-50 flex w-full max-w-[440px] flex-col bg-white shadow-[-12px_0_32px_rgb(0_0_0/0.14)] outline-none motion-safe:animate-[panel-in_180ms_ease-out]',
            className,
          )}
        >
          <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3">
            <div className="min-w-0">
              <DialogPrimitive.Title className="text-[18px] leading-tight font-bold text-ink">{title}</DialogPrimitive.Title>
              <DialogPrimitive.Description className={description ? 'mt-1 text-[12px] text-ink-muted' : 'sr-only'}>
                {description ?? title}
              </DialogPrimitive.Description>
            </div>
            <DialogPrimitive.Close aria-label="Close" className="shrink-0 rounded-md p-1 text-ink hover:bg-surface-muted">
              <XIcon className="size-5" />
            </DialogPrimitive.Close>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5">{children}</div>
          {footer && <div className="flex flex-col gap-2 border-t border-line px-5 py-4">{footer}</div>}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
`})))()}export{n,i as r,r as t};