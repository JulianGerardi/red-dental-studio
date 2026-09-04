import { Toaster as Sonner, toast } from 'sonner'
import { Check, X, TriangleAlert, Info } from 'lucide-react'

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
  ok: <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#1a804d]"><Check className="size-3 text-white" strokeWidth={3} /></span>,
  error: <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#b22626]"><X className="size-3 text-white" strokeWidth={3} /></span>,
  warn: <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#99660d]"><TriangleAlert className="size-3 text-white" strokeWidth={3} /></span>,
  info: <span className="bg-dash-blue flex size-5 shrink-0 items-center justify-center rounded-full"><Info className="size-3 text-white" strokeWidth={3} /></span>,
}

/* Acción opcional: cuando el resultado deja algo por ver en otra pantalla,
   el toast ofrece ir, en vez de llevar al usuario sin preguntarle. */
export type AccionToast = { label: string; onClick: () => void }

function mostrar(tipo: keyof typeof ICONO, mensaje: string, accion?: AccionToast) {
  toast.custom(
    (t) => (
      <div className="flex w-[360px] items-center gap-3 rounded-xl border border-[#e4e4e7] bg-white px-4 py-3 shadow-[0_8px_24px_rgb(0_0_0/0.12)]">
        {ICONO[tipo]}
        <span className="min-w-0 flex-1 text-[13px] text-[#09090b]">{mensaje}</span>
        {accion && (
          <button
            onClick={() => { accion.onClick(); toast.dismiss(t) }}
            className="text-dash-blue shrink-0 text-[13px] font-semibold whitespace-nowrap hover:underline"
          >
            {accion.label}
          </button>
        )}
        <button
          onClick={() => toast.dismiss(t)}
          aria-label="Close"
          className="shrink-0 text-[#71717a] hover:text-black"
        >
          <X className="size-4" />
        </button>
      </div>
    ),
    /* Con acción dura más: hay que darle tiempo al usuario a decidir. */
    accion ? { duration: 9000 } : undefined,
  )
}

export const aviso = {
  ok: (m: string, a?: AccionToast) => mostrar('ok', m, a),
  error: (m: string, a?: AccionToast) => mostrar('error', m, a),
  warn: (m: string, a?: AccionToast) => mostrar('warn', m, a),
  info: (m: string, a?: AccionToast) => mostrar('info', m, a),
}
