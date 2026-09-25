import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  BLOCK_STYLE, BLOCKED, DIAS_CORTOS, START_HOUR, END_HOUR, HOUR_PX,
  inicioDeSemana, sumarDias, mismoDia, type EventoConFecha,
} from './calendar-data'

/* Las tres vistas de Scheduling sobre la misma agenda, como Google Calendar:
   Day es una columna, Week son siete y Month es la grilla del mes.
   El frame sólo dibuja la semanal; Day y Month son extensión propia y usan el
   mismo lenguaje visual (mismos colores de estado, misma barra de acento). */

export type Vista = 'Day' | 'Week' | 'Month'

const HORAS = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i)
const fmtHora = (h: number) =>
  \`\${String(h > 12 ? h - 12 : h).padStart(2, '0')} \${h < 12 ? 'AM' : 'PM'}\`
export const fmtExacta = (h: number) => {
  const hh = Math.floor(h)
  const mm = Math.round((h - hh) * 60)
  return \`\${String(hh > 12 ? hh - 12 : hh).padStart(2, '0')}:\${String(mm).padStart(2, '0')} \${hh < 12 ? 'AM' : 'PM'}\`
}
/* Los turnos se sueltan en franjas de 15 minutos. */
const PASO = 0.25

type Props = {
  eventos: EventoConFecha[]
  fecha: Date
  onMover: (i: number, fecha: Date, start?: number) => void
  onAbrir: (e: EventoConFecha, el: HTMLElement) => void
}

/* ── Rejilla de horas, compartida por Day y Week ─────────────────────── */

export function ColumnaHoras() {
  return (
    <div className="w-[46px] shrink-0">
      {HORAS.map((h) => (
        <div key={h} style={{ height: HOUR_PX }} className="relative">
          <span className="absolute -top-2 right-2 text-[11px] text-ink-muted">{fmtHora(h)}</span>
        </div>
      ))}
    </div>
  )
}

export function ColumnaDia({
  fecha, eventos, onMover, onAbrir, arrastrado, resaltada, onResaltar,
}: {
  fecha: Date
  eventos: EventoConFecha[]
  onMover: Props['onMover']
  onAbrir: Props['onAbrir']
  arrastrado: React.RefObject<number | null>
  resaltada: boolean
  onResaltar: (v: boolean) => void
}) {
  const huboArrastre = useRef(false)
  const propios = eventos
    .map((e, i) => ({ e, i }))
    .filter(({ e }) => mismoDia(e.fecha, fecha))

  return (
    <div
      onDragOver={(ev) => { ev.preventDefault(); onResaltar(true) }}
      onDragLeave={() => onResaltar(false)}
      onDrop={(ev) => {
        ev.preventDefault()
        onResaltar(false)
        const i = arrastrado.current
        if (i === null) return
        const caja = ev.currentTarget.getBoundingClientRect()
        const bruto = START_HOUR + (ev.clientY - caja.top) / HOUR_PX
        onMover(i, fecha, Math.round(bruto / PASO) * PASO)
        arrastrado.current = null
      }}
      className={cn(
        'relative min-w-0 flex-1 border-l border-line-hair transition-colors',
        resaltada && 'bg-[#f5f8ff]',
      )}
    >
      {HORAS.map((h) => (
        <div key={h} style={{ height: HOUR_PX }} className="border-b border-line-hair" />
      ))}

      {BLOCKED.filter((b) => b.day === fecha.getDay()).map((b, i) => (
        <div
          key={i}
          className="absolute inset-x-0 bg-[#e8e8e8]"
          style={{ top: (b.start - START_HOUR) * HOUR_PX, height: b.duration * HOUR_PX }}
        />
      ))}

      {propios.map(({ e, i }) => {
        const s = BLOCK_STYLE[e.state]
        return (
          <button
            key={i}
            draggable
            onDragStart={(ev) => {
              arrastrado.current = i
              huboArrastre.current = true
              ev.dataTransfer.effectAllowed = 'move'
              ev.dataTransfer.setData('text/plain', e.patient)
            }}
            onDragEnd={() => { setTimeout(() => { huboArrastre.current = false }, 0) }}
            onClick={(ev) => {
              if (huboArrastre.current) return
              onAbrir(e, ev.currentTarget)
            }}
            className="absolute right-1 left-1 cursor-grab overflow-hidden rounded-r-[3px] border-l-[3px] px-1.5 py-1 text-left transition-shadow hover:shadow-md active:cursor-grabbing"
            style={{
              top: (e.start - START_HOUR) * HOUR_PX,
              height: e.duration * HOUR_PX,
              backgroundColor: s.bg,
              borderLeftColor: s.bar,
            }}
          >
            <span className="block text-[10px] font-medium" style={{ color: s.fg }}>{fmtExacta(e.start)}</span>
            <span className="block truncate text-[11px] text-[#18181b]">{e.patient}</span>
          </button>
        )
      })}
    </div>
  )
}

export function Cabecera({ dias, hoy }: { dias: Date[]; hoy: Date }) {
  return (
    <div className="flex border-b border-line-hair">
      <div className="w-[46px] shrink-0" />
      {dias.map((d, i) => (
        <div key={i} className="flex min-w-0 flex-1 flex-col gap-1 border-l border-line-hair px-3 py-3">
          <span className="text-[11px] font-semibold tracking-wide text-ink-muted">
            {DIAS_CORTOS[d.getDay()]}
          </span>
          <span
            className={cn(
              'flex size-8 items-center justify-center rounded-full text-lg font-semibold',
              mismoDia(d, hoy) ? 'bg-dash-blue text-white' : 'text-dash-blue',
            )}
          >
            {String(d.getDate()).padStart(2, '0')}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ── Day y Week ──────────────────────────────────────────────────────── */

export function VistaHoras({ dias, ...props }: Props & { dias: Date[] }) {
  const arrastrado = useRef<number | null>(null)
  const [destino, setDestino] = useState<number | null>(null)

  return (
    /* Una sola columna entra en cualquier pantalla; siete necesitan un ancho
       mínimo y scroll propio. */
    <div className="mt-4 overflow-x-auto rounded-lg border border-line bg-white">
      <div className={dias.length > 1 ? 'min-w-[760px]' : 'min-w-0'}>
        <Cabecera dias={dias} hoy={props.fecha} />
        <div className="relative flex">
          <ColumnaHoras />
          {dias.map((d, i) => (
            <ColumnaDia
              key={i}
              fecha={d}
              eventos={props.eventos}
              onMover={props.onMover}
              onAbrir={props.onAbrir}
              arrastrado={arrastrado}
              resaltada={destino === i}
              onResaltar={(v) => setDestino(v ? i : null)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function VistaDia(props: Props) {
  return <VistaHoras {...props} dias={[props.fecha]} />
}

export function VistaSemana(props: Props) {
  const inicio = inicioDeSemana(props.fecha)
  return <VistaHoras {...props} dias={Array.from({ length: 7 }, (_, i) => sumarDias(inicio, i))} />
}

/* ── Month ───────────────────────────────────────────────────────────── */

export function VistaMes({ eventos, fecha, onMover, onAbrir }: Props) {
  const arrastrado = useRef<number | null>(null)
  const [destino, setDestino] = useState<string | null>(null)
  /* En celular la celda sólo muestra puntos; tocar el día abre su lista
     debajo de la grilla, que es donde se leen los turnos. */
  const [diaAbierto, setDiaAbierto] = useState<Date | null>(null)
  const delDia = diaAbierto
    ? eventos.map((e, j) => ({ e, j })).filter(({ e }) => mismoDia(e.fecha, diaAbierto))
    : []
  const primero = new Date(fecha.getFullYear(), fecha.getMonth(), 1)
  const inicio = inicioDeSemana(primero)
  const celdas = Array.from({ length: 42 }, (_, i) => sumarDias(inicio, i))
  const hoy = new Date()

  return (
    <div className="mt-4 overflow-x-auto rounded-lg border border-line bg-white">
      {/* En celular el mes entra completo: las celdas muestran un punto por
          turno en vez del chip con nombre, como hace Google Calendar. */}
      <div className="md:min-w-[700px]">
        <div className="grid grid-cols-7 border-b border-line-hair">
          {DIAS_CORTOS.map((d) => (
            <span key={d} className="px-1.5 py-2 text-center text-[10px] font-semibold tracking-wide text-ink-muted md:px-3 md:text-left md:text-[11px]">
              {d}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {celdas.map((d, i) => {
            const fuera = d.getMonth() !== fecha.getMonth()
            const clave = d.toDateString()
            const propios = eventos.map((e, j) => ({ e, j })).filter(({ e }) => mismoDia(e.fecha, d))
            return (
              <div
                key={i}
                onDragOver={(ev) => { ev.preventDefault(); setDestino(clave) }}
                onDragLeave={() => setDestino((x) => (x === clave ? null : x))}
                onDrop={(ev) => {
                  ev.preventDefault()
                  setDestino(null)
                  if (arrastrado.current === null) return
                  /* En mes se cambia el día y se respeta la hora. */
                  onMover(arrastrado.current, d)
                  arrastrado.current = null
                }}
                onClick={() => setDiaAbierto((x) => (x && mismoDia(x, d) ? null : d))}
                className={cn(
                  'flex min-h-[68px] flex-col gap-1 border-r border-b border-line-hair p-1 transition-colors md:min-h-[104px] md:p-1.5',
                  i % 7 === 6 && 'border-r-0',
                  fuera && 'bg-surface-subtle',
                  destino === clave && 'bg-[#f5f8ff]',
                  diaAbierto && mismoDia(diaAbierto, d) && 'bg-[#eff6ff] md:bg-transparent',
                  propios.length > 0 && 'cursor-pointer md:cursor-default',
                )}
              >
                <span
                  className={cn(
                    'flex size-6 shrink-0 items-center justify-center self-start rounded-full text-[11px] font-semibold md:text-[12px]',
                    mismoDia(d, hoy) ? 'bg-dash-blue text-white' : fuera ? 'text-[#c4c4c8]' : 'text-ink',
                  )}
                >
                  {d.getDate()}
                </span>

                {/* Puntos en celular; el detalle va en la lista de abajo. */}
                {propios.length > 0 && (
                  <span className="flex flex-wrap gap-1 px-0.5 md:hidden">
                    {propios.map(({ e, j }) => (
                      <span
                        key={j}
                        title={\`\${fmtExacta(e.start)} · \${e.patient}\`}
                        className="size-1.5 rounded-full"
                        style={{ backgroundColor: BLOCK_STYLE[e.state].bar }}
                      />
                    ))}
                  </span>
                )}

                <span className="hidden flex-col gap-1 md:flex">
                {propios.map(({ e, j }) => {
                  const s = BLOCK_STYLE[e.state]
                  return (
                    <button
                      key={j}
                      draggable
                      onDragStart={(ev) => {
                        arrastrado.current = j
                        ev.dataTransfer.effectAllowed = 'move'
                        ev.dataTransfer.setData('text/plain', e.patient)
                      }}
                      onClick={(ev) => onAbrir(e, ev.currentTarget)}
                      className="flex cursor-grab items-center gap-1.5 overflow-hidden rounded-r-[3px] border-l-[3px] px-1.5 py-1 text-left active:cursor-grabbing"
                      style={{ backgroundColor: s.bg, borderLeftColor: s.bar }}
                    >
                      <span className="shrink-0 text-[10px] font-medium" style={{ color: s.fg }}>
                        {fmtExacta(e.start).slice(0, 5)}
                      </span>
                      <span className="truncate text-[10px] text-[#18181b]">{e.patient}</span>
                    </button>
                  )
                })}
                </span>
              </div>
            )
          })}
        </div>

        {/* Lista del día elegido: sólo en celular, que es donde la celda
            muestra puntos en vez de los turnos. */}
        {diaAbierto && (
          <div className="border-t border-line-hair p-3 md:hidden">
            <p className="text-[13px] font-bold text-ink">
              {DIAS_CORTOS[diaAbierto.getDay()]} {diaAbierto.getDate()}
            </p>
            {delDia.length === 0 ? (
              <p className="mt-2 text-xs text-ink-faint">No appointments on this day.</p>
            ) : (
              <div className="mt-2 flex flex-col gap-2">
                {delDia.map(({ e, j }) => {
                  const s = BLOCK_STYLE[e.state]
                  return (
                    <button
                      key={j}
                      onClick={(ev) => { ev.stopPropagation(); onAbrir(e, ev.currentTarget) }}
                      className="flex items-center gap-2 rounded-r-[3px] border-l-[3px] px-2.5 py-2 text-left"
                      style={{ backgroundColor: s.bg, borderLeftColor: s.bar }}
                    >
                      <span className="shrink-0 text-[11px] font-semibold" style={{ color: s.fg }}>
                        {fmtExacta(e.start)}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[13px] text-[#18181b]">
                        {e.patient}
                      </span>
                      <span className="shrink-0 text-[11px]" style={{ color: s.fg }}>{e.state}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};