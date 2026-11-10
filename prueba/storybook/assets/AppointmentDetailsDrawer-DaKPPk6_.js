import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import {
  X, TriangleAlert, ChevronDown, Clock, User, DoorOpen, ClipboardList, Activity,
} from 'lucide-react'
import { BLOCK_STYLE, fmtExacta, type ApptState } from './calendar-data'
import { useAnclaje } from '@/lib/anclaje'
import { useEsChico } from '@/lib/media'
import { aviso } from '@/components/ui/toaster'
import { Avatar } from '@/components/ui/avatar'

/* Figma 3856:214039 "Appointment Details Drawer".

   Quinta propuesta. Las cuatro anteriores compartían el mismo vicio: pares
   etiqueta/valor con micro-título en mayúsculas, o sea el volcado del
   formulario. Se lee lento y se parece a cualquier ficha.

   Acá el contenido manda sobre la forma:

   - **Inicio y fin, al tamaño del resto.** La hora y la fecha salen del turno
     que se clickeó —el mismo rótulo que muestra el bloque en la grilla—, no
     de un texto fijo.
   - **Filas con ícono en vez de etiqueta.** Un consultorio, un profesional y
     un motivo se reconocen por el ícono; el rótulo en mayúsculas sobraba.
   - **La card sigue siendo el bloque del calendario**: mismo acento arriba y
     mismo tinte de estado, así se ve de dónde salió.

   Abajo de \`sm\` deja de ser popover y pasa a ser hoja inferior a todo el
   ancho: a 390px la versión apaisada dejaba columnas de 103px y cortaba
   "Reaseon for the visit" en "Consult...". */

const W = 336

/* El detalle es de lectura: el turno se cambia desde "Edit appointment", no
   con lápices sueltos por fila. */
export function Fila({ icono: Icono, children }: { icono: typeof User; children: string }) {
  return (
    <span className="flex items-center gap-2.5">
      <Icono className="size-4 shrink-0 text-ink-faint" />
      <span className="min-w-0 flex-1 truncate text-[13px] text-ink">{children}</span>
    </span>
  )
}

/* 2.4 h -> "2 hr 24 min". Las duraciones salen de la altura del bloque en el
   Figma, así que caen en fracciones raras; se muestran como son. */
function duracionLegible(horas: number) {
  const total = Math.round(horas * 60)
  const h = Math.floor(total / 60)
  const m = total % 60
  if (!h) return \`\${m} min\`
  return m ? \`\${h} hr \${m} min\` : \`\${h} hr\`
}

export function AppointmentDetailsDrawer({
  patient,
  estado = 'Booked',
  inicio,
  duracion,
  fecha,
  provider,
  room,
  reason,
  anchor,
  onClose,
}: {
  patient: string
  estado?: ApptState
  /** Hora decimal de inicio (8.25 = 08:15 AM); el fin sale de sumarle la duración. */
  inicio: number
  duracion: number
  fecha: Date
  provider: string
  room: string
  reason: string
  anchor: DOMRect
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const chico = useEsChico()
  const { left, top, ancho } = useAnclaje(ref, anchor, W)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    /* La posición se calcula una vez contra el bloque que la abrió. Si la
       ventana cambia de ancho —rotar el teléfono, mover el borde— esas
       coordenadas ya no valen y la card queda flotando en cualquier lado:
       se cierra. Sólo el ancho, porque en mobile la barra del navegador
       dispara \`resize\` con cada scroll y cerraría sola. */
    let ancho = window.innerWidth
    const onResize = () => {
      if (window.innerWidth !== ancho) {
        ancho = window.innerWidth
        onClose()
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('resize', onResize)
    }
  }, [onClose])

  const initials = patient.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
  const s = BLOCK_STYLE[estado] ?? BLOCK_STYLE.Booked
  const fin = Math.round((inicio + duracion) * 60) / 60

  const cuerpo = (
    <div
      ref={ref}
      role="dialog"
      aria-label={\`Appointment details for \${patient}\`}
      /* El borde de arriba lleva el color del estado en las dos formas; las
         coordenadas sólo existen cuando está anclada a su bloque. */
      style={chico ? { borderTopColor: s.bar } : { left, top, width: ancho, borderTopColor: s.bar }}
      className={
        chico
          ? 'motion-safe:animate-[sheet-in_180ms_ease-out] fixed inset-x-0 bottom-0 z-50 overflow-hidden rounded-t-2xl border-t-[3px] bg-white shadow-[0_-8px_28px_rgb(0_0_0/0.22)]'
          : 'motion-safe:animate-[loc-in_150ms_ease-out] absolute z-50 overflow-hidden rounded-xl border-t-[3px] bg-white shadow-floating'
      }
    >
      {chico && (
        <span className="mx-auto mt-2 block h-1 w-9 rounded-full bg-line" aria-hidden />
      )}

      {/* Cabecera en blanco. El estado ya lo canta el acento de arriba; con el
          fondo tintado además, la pill quedaba color sobre color y perdía
          contraste. Ahora la pill lleva el tinte y el fondo se retira. */}
      <div className="flex items-start gap-2.5 px-4 pt-3.5 pb-3">
        <Avatar initials={initials} size={36} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] leading-tight font-bold text-ink">
            {patient}
          </span>
          <span className="block text-[11px] text-ink-medium">33 yrs · ID 4471</span>
        </span>
        {/* Pill igual a las del resto del sistema —Insurance, Treatment
            plans—: borde y texto del mismo color, fondo tintado, 11px. Antes
            iba sin borde y a 10px, y no pegaba con ninguna otra. */}
        <span
          className="shrink-0 rounded-full border px-2 py-[2px] text-[11px] font-semibold"
          style={{ backgroundColor: s.bg, borderColor: s.fg, color: s.fg }}
        >
          {estado}
        </span>
        <button onClick={onClose} aria-label="Close" className="shrink-0 text-ink hover:opacity-60">
          <X className="size-4" />
        </button>
      </div>

      <div className="flex flex-col gap-3 p-4">
        {/* Inicio y fin al tamaño de las filas, con la duración al costado y la
            fecha abajo: ver "Detalle del turno: inicio y fin" en scheduling.md. */}
        <div className="flex items-start gap-2.5 rounded-md bg-surface-muted px-3 py-2">
          <Clock className="mt-px size-4 shrink-0 text-ink-medium" />
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-baseline justify-between gap-x-2">
              <span className="text-[13px] font-semibold whitespace-nowrap text-ink">
                <span className="sr-only">From </span>
                {fmtExacta(inicio)}
                <span aria-hidden> – </span>
                <span className="sr-only"> to </span>
                {fmtExacta(fin)}
              </span>
              <span className="text-[11px] whitespace-nowrap text-ink-medium">{duracionLegible(duracion)}</span>
            </span>
            <span className="mt-0.5 block text-[11px] text-ink-medium">
              {fecha.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          <Fila icono={User}>{provider}</Fila>
          <Fila icono={DoorOpen}>{room}</Fila>
          <Fila icono={ClipboardList}>{reason}</Fila>
          <Fila icono={Activity}>Encounter open</Fila>
        </div>

        <div className="flex items-center gap-2 rounded-r-md border-l-[3px] border-l-warn-fg bg-warn-bg px-2.5 py-1.5">
          <TriangleAlert className="size-3.5 shrink-0 text-warn-fg" />
          <span className="text-[11px] font-semibold text-warn-fg">Guarantor not assigned</span>
        </div>

        <button
          onClick={() => aviso.ok(\`\${patient} has been checked in.\`)}
          className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 w-full items-center justify-center gap-2 rounded-md text-[13px] font-semibold text-white transition-colors"
        >
          Check In <ChevronDown className="size-4" />
        </button>
      </div>
    </div>
  )

  return createPortal(
    <>
      {/* En hoja inferior hace falta el velo: la card ya no está pegada a su
          bloque, así que el usuario necesita ver qué queda atrás y poder salir
          tocando afuera. */}
      {chico && <div className="fixed inset-0 z-40 bg-black/30" aria-hidden onClick={onClose} />}
      {cuerpo}
    </>,
    document.body,
  )
}
`})))()}export{n,i as r,r as t};