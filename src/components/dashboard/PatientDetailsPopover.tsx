import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import {
  X, ChevronDown, Play, AArrowUp, ClipboardList, Smartphone, Eye, FileCheck2,
  Stethoscope, IdCard,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useAnclaje } from '@/lib/anclaje'
import { ICONO_SUELTO } from '@/lib/estilos'

/* Figma 4430:57474 — rediseño del popup del paciente (357×488).
   Ya no es la tarjeta con barra azul y avatar montado: ahora es una card
   clara con el avatar y el botón verde "Start Enconter" arriba, el plan de
   tratamiento en un panel celeste y las filas de datos abajo.

   Sigue sin ser un modal centrado: se ancla a la card que lo abrió, con
   volteo automático si no entra a la derecha.

   Textos tal cual el Figma, incluidos "Start Enconter" sin la u, "Height"
   repetido y la fecha en español. La única excepción es el bloque del motivo
   de la visita, que Julián pidió mejorar: ahí "Rsn" se escribe completo. */

type Fila = { icon: LucideIcon; label: string; value: string }

const FILAS_DOBLES: Fila[] = [
  { icon: AArrowUp, label: 'Height', value: '5 ft 8 in' },
  { icon: AArrowUp, label: 'Height', value: '5 ft 8 in' },
]
const FILAS: Fila[] = [
  { icon: Smartphone, label: 'Mobile Number', value: '+1 (555) 123-4567' },
  { icon: Eye, label: 'Last Visit Date', value: '17 Marzo, 2024' },
  { icon: FileCheck2, label: 'Primary Insurance Plan', value: 'Osde' },
]

/* Los ocho del plan. La tabla los muestra todos, con scroll: no hay "+N". */
const PROCEDIMIENTOS = [
  'D0274 – Bitewings – four radiographic images',
  'D0120 – Periodic oral evaluation',
  'D1110 – Prophylaxis – adult',
  'D0210 – Intraoral complete series',
  'D2740 – Crown – porcelain/ceramic',
  'D6010 – Surgical placement of implant body',
  'D4341 – Periodontal scaling and root planing',
  'D9310 – Consultation',
]

function FilaDato({
  icon: Icon, label, value, className, wrap,
}: Fila & { className?: string; wrap?: boolean }) {
  return (
    <div className={cn('flex items-center gap-2 bg-white px-3 py-3', className)}>
      <Icon className={cn('size-4 shrink-0 text-ink', wrap && 'mt-0.5')} strokeWidth={1.8} />
      <span className="shrink-0 text-[13px] font-semibold text-ink">{label}</span>
      <span
        className={cn(
          'ml-auto text-[13px] text-ink-muted',
          wrap ? 'min-w-0 text-right leading-[1.4]' : 'shrink-0 truncate',
        )}
      >
        {value}
      </span>
    </div>
  )
}

const W_MAX = 360

export function PatientDetailsPopover({
  name,
  initials,
  anchor,
  onClose,
}: {
  name: string
  initials: string
  /** Rect de la card que lo abrió, en coordenadas de viewport. */
  anchor: DOMRect
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
    }
  }, [onClose])

  /* El panel se corre hacia arriba lo justo para entrar entero: antes, con la
     card abajo de todo, había que scrollear para leerlo. */
  const { left, top, ancho } = useAnclaje(ref, anchor, W_MAX)

  return createPortal(
    <div
      ref={ref}
      role="dialog"
      aria-label={`Details for ${name}`}
      style={{ left, top, width: ancho }}
      className="motion-safe:animate-[loc-in_160ms_ease-out] absolute z-50 overflow-hidden rounded-2xl bg-[#fafbfe] p-4 shadow-[0_8px_28px_rgb(0_0_0/0.22)]"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-3 right-3 rounded-full p-1.5 text-ink transition-colors hover:bg-black/5"
      >
        <X className="size-5" />
      </button>

      <div className="flex items-center gap-3 pr-9">
        <span className="bg-dash-blue-hover flex size-[72px] shrink-0 items-center justify-center rounded-full border-4 border-white text-xl font-semibold text-white">
          {initials}
        </span>
        {/* Verde y radio de 4430:57478 (#1e9850, radio 8), el mismo botón que
            la ficha. El alto va en el escalón md del sistema (36) y no en los
            32 del nodo, que quedaban chicos al lado del avatar.
            "Enconter" es del Figma, sin la u. */}
        <button
          type="button"
          className="flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#1e9850] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#18763e]"
        >
          <Play className="size-3.5 shrink-0" /> Start Enconter
          <ChevronDown className="size-3.5 shrink-0" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="truncate text-xl font-bold text-ink">{name}</p>
        <span className="shrink-0 rounded-full border border-dash-ok-fg bg-dash-ok-bg px-3 py-1 text-xs font-semibold text-dash-ok-fg">
          Planned
        </span>
      </div>

      {/* Los dos lugares a los que se va desde acá: la ficha del paciente y
          Clinical Mode. Antes el popup mostraba el turno y no llevaba a
          ninguno de los dos. */}
      <div className="mt-3 flex items-center gap-2">
        <Link
          to="/patients/john-smith"
          onClick={onClose}
          title="Open patient file"
          aria-label={`Open ${name}'s file`}
          className={`${ICONO_SUELTO} size-9 bg-white`}
        >
          <IdCard className="size-4" />
        </Link>
        <Link
          to="/patients/john-smith/clinical-mode"
          onClick={onClose}
          title="Open Clinical Mode"
          aria-label={`Open Clinical Mode for ${name}`}
          className={`${ICONO_SUELTO} size-9 bg-white`}
        >
          <Stethoscope className="size-4" />
        </Link>
      </div>

      {/* El frame se actualizó (4430:57474, 2026-08-28) y quedó muy cerca de la
          propuesta aplanada: se fue el panel celeste y el plan pasó a una card
          blanca con barra de acento azul de 3px. Dos cambios más: el motivo de
          la visita ahora vive **adentro** de esa card, como primera fila y
          separado por un hairline, y los procedimientos dejaron de ser chips
          para ser una tabla CODE / PROCEDURE con el total abajo a la derecha.

          Se mantiene "Reason for Visit" escrito completo y el icono de
          historia clínica, que Julián pidió al mejorar este bloque; el frame
          sigue diciendo "Rsn for Visit" con el icono de tamaño de texto. */}
      <div className="border-l-dash-blue mt-3 overflow-hidden rounded-lg border border-line border-l-[3px] bg-white">
        {/* El motivo envuelve en vez de cortarse: con "Reason" escrito completo
            no entra en una línea, y truncarlo era justo lo que había que
            arreglar acá. */}
        <div className="flex items-start gap-2 border-b border-[#f2f2f2] px-3 py-2.5">
          <ClipboardList className="mt-px size-4 shrink-0 text-ink" strokeWidth={1.8} />
          <span className="shrink-0 text-[13px] font-semibold text-ink">Reason for Visit</span>
          <span className="ml-auto min-w-0 text-right text-[11px] leading-[1.4] text-ink-faint">
            Routine dental check-up appointment
          </span>
        </div>

        <div className="px-3 py-2.5">
          {/* El conteo dejó de ser pill: una pill marca un estado, y acá el
              número sólo cuenta filas de la tabla que está justo abajo. La
              negrita pasa al nombre de la visita, que es el dato. */}
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[13px] font-bold text-ink">Visit 1</span>
            <span className="shrink-0 text-[11px] text-ink-muted">
              {PROCEDIMIENTOS.length} Procedures
            </span>
          </div>
          <p className="mt-0.5 text-[13px] text-ink">Comprehensive Implant Therapy</p>

          {/* Misma tabla que Insurance y Documents: cabecera #f9f9f9 y filas
              finas. Con scroll, así no hay ningún "+N" que no lleve a nada. */}
          <div className="mt-2 overflow-hidden rounded-lg border border-line-row">
            <div className="flex h-7 items-center gap-3 border-b border-line-row bg-surface-alt px-2.5 text-[10px] font-semibold tracking-wide text-ink-muted uppercase">
              <span className="w-[46px] shrink-0">Code</span>
              <span className="min-w-0 flex-1">Procedure</span>
            </div>
            <div className="max-h-[132px] overflow-y-auto">
              {PROCEDIMIENTOS.map((p) => {
                const [code, ...resto] = p.split(' – ')
                return (
                  <div
                    key={p}
                    className="flex h-8 items-center gap-3 border-b border-line-soft px-2.5 text-[11px] last:border-0"
                  >
                    <span className="text-dash-blue w-[46px] shrink-0 font-medium">{code}</span>
                    <span className="min-w-0 flex-1 truncate text-ink-medium">{resto.join(' – ')}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <p className="mt-2 text-right text-[13px] font-semibold text-ink">
            Total: 1,270.00
          </p>
        </div>
      </div>

      {/* Height aparece dos veces, una en cada media fila. Es del Figma. */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        {FILAS_DOBLES.map((f, i) => (
          <FilaDato key={i} {...f} className="rounded-lg" />
        ))}
      </div>
      <div className="mt-2 flex flex-col gap-2">
        {FILAS.map((f) => (
          <FilaDato key={f.label} {...f} className="rounded-lg" />
        ))}
      </div>
    </div>,
    document.body,
  )
}
