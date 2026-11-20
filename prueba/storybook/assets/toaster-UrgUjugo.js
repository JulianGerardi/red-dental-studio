import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { Toaster as Sonner, toast } from 'sonner'
import { Check, X, TriangleAlert, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Toast del sistema: pastilla blanca, icono circular a la izquierda, texto y
   una X para cerrar. Se usa para confirmar o rechazar cada acción. */

export function Toaster() {
  return (
    <Sonner
      position="bottom-left"
      duration={3200}
      /* unstyled y sin clases en el wrapper: cada toast se dibuja con
         toast.custom, así que si sonner también pinta queda doble fondo. */
      toastOptions={{ unstyled: true, classNames: { toast: 'w-[360px]' } }}
    />
  )
}

const ICONO = {
  ok: <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-dash-ok-fg"><Check className="size-3 text-white" strokeWidth={3} /></span>,
  error: <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-dash-bad-fg"><X className="size-3 text-white" strokeWidth={3} /></span>,
  warn: <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-warn-fg"><TriangleAlert className="size-3 text-white" strokeWidth={3} /></span>,
  info: <span className="bg-dash-blue flex size-5 shrink-0 items-center justify-center rounded-full"><Info className="size-3 text-white" strokeWidth={3} /></span>,
}

/* Acción opcional: cuando el resultado deja algo por ver en otra pantalla,
   el toast ofrece ir, en vez de llevar al usuario sin preguntarle. */
export type AccionToast = { label: string; onClick: () => void }

/* Con título, el texto explica la regla que frenó la acción y la acción baja debajo del texto
   ("Procedure cannot be updated", clinical-mode.md 2026-10-17). */
export type MensajeToast = string | { titulo: string; texto: string }

function mostrar(tipo: keyof typeof ICONO, mensaje: MensajeToast, accion?: AccionToast) {
  const conTitulo = typeof mensaje !== 'string'
  toast.custom(
    (t) => {
      const boton = accion && (
        <button
          onClick={() => { accion.onClick(); toast.dismiss(t) }}
          className={cn('text-dash-blue shrink-0 text-[13px] font-semibold whitespace-nowrap hover:underline', conTitulo && 'mt-1.5 self-start')}
        >
          {accion.label}
        </button>
      )
      return (
        <div className={cn('flex w-[360px] gap-3 rounded-xl border border-line bg-white px-4 py-3 shadow-[0_8px_24px_rgb(0_0_0/0.12)]', conTitulo ? 'items-start' : 'items-center')}>
          {ICONO[tipo]}
          {conTitulo ? (
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-[13px] font-semibold text-ink">{mensaje.titulo}</span>
              <span className="mt-0.5 text-[12.5px] leading-snug text-ink-soft">{mensaje.texto}</span>
              {boton}
            </span>
          ) : (
            <>
              <span className="min-w-0 flex-1 text-[13px] text-ink">{mensaje}</span>
              {boton}
            </>
          )}
          <button
            onClick={() => toast.dismiss(t)}
            aria-label="Close"
            className="shrink-0 text-ink-muted hover:text-black"
          >
            <X className="size-4" />
          </button>
        </div>
      )
    },
    /* Con acción dura más: hay que darle tiempo al usuario a decidir. */
    accion ? { duration: 9000 } : undefined,
  )
}

export const aviso = {
  ok: (m: MensajeToast, a?: AccionToast) => mostrar('ok', m, a),
  error: (m: MensajeToast, a?: AccionToast) => mostrar('error', m, a),
  warn: (m: MensajeToast, a?: AccionToast) => mostrar('warn', m, a),
  info: (m: MensajeToast, a?: AccionToast) => mostrar('info', m, a),
}
`})))()}export{r as n,n as r,i as t};