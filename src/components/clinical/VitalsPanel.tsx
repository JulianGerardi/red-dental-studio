import { useRef, useState } from 'react'
import { Minus, Plus, Paperclip, Mic, FilePlus2, Table2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { BOTON_ICONO_REDONDO } from '@/lib/estilos'
import {
  VITALES, VITAL_COLOR, AVISO_PRESION, type Vital, type EstadoVital,
} from '@/data/clinical-mode'

/* Figma 4106:205304 "Vitals — Section (Entry Form)", con sus cuatro estados:
   vacío, cargado, con indicadores de estado y con el aviso azul.

   El medidor es un semicírculo: pista celeste, arco del valor y una perilla
   redonda en la punta. El color del arco lo decide el estado del valor
   —Normal / Elevated / Dangerously low—, que es lo que el frame muestra en su
   tercer tablero. Cuando el valor está dentro de rango va en azul. */

/* El medidor del frame: semicírculo grueso, pista celeste, arco del valor y
   una perilla blanca con el punto de color. Es más grande que el resto de la
   card a propósito —es el dato de la tarjeta—.

   **Se arrastra.** La perilla se agarra y el valor sigue al ángulo; también
   responde a las flechas del teclado, porque un control que sólo funciona con
   el mouse deja afuera a quien carga signos con el teclado. */
const R = 82
const GROSOR = 20
/* La perilla sobresale del trazo: su radio es GROSOR/2+4. Sin ese margen en el
   viewBox el arco quedaba recortado en las dos puntas y abajo. */
const PERILLA = GROSOR / 2 + 4
const PAD = PERILLA + 2
const ANCHO = (R + PAD) * 2
const CX = ANCHO / 2
const CY = R + PAD
const ALTO = CY + PAD
const LARGO = Math.PI * R

function Medidor({
  pct, color, etiqueta, min, max, valor, onValor, children,
}: {
  pct: number
  color: string
  etiqueta: string
  min: number
  max: number
  valor: number
  onValor: (v: number) => void
  children: React.ReactNode
}) {
  const ref = useRef<SVGSVGElement>(null)
  const d = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`
  const ang = Math.PI - Math.PI * pct
  const kx = CX + R * Math.cos(ang)
  const ky = CY - R * Math.sin(ang)

  const desdePuntero = (e: React.PointerEvent) => {
    const svg = ref.current
    if (!svg) return
    const caja = svg.getBoundingClientRect()
    const cx = caja.left + (CX / ANCHO) * caja.width
    const cy = caja.top + (CY / ALTO) * caja.height
    /* atan2 sobre la mitad de arriba: 0 a la derecha, π a la izquierda. */
    const a = Math.atan2(cy - e.clientY, e.clientX - cx)
    const acotado = Math.min(Math.PI, Math.max(0, a))
    const p = 1 - acotado / Math.PI
    onValor(min + p * (max - min))
  }

  const teclado = (e: React.KeyboardEvent) => {
    const paso = (max - min) / 100
    const salto = (max - min) / 10
    const mapa: Record<string, number> = {
      ArrowRight: paso, ArrowUp: paso, ArrowLeft: -paso, ArrowDown: -paso,
      PageUp: salto, PageDown: -salto,
    }
    if (e.key === 'Home') { e.preventDefault(); onValor(min); return }
    if (e.key === 'End') { e.preventDefault(); onValor(max); return }
    const delta = mapa[e.key]
    if (delta === undefined) return
    e.preventDefault()
    onValor(valor + delta)
  }

  return (
    <div className="relative mx-auto w-fit">
      <svg
        ref={ref}
        width={ANCHO}
        height={ALTO}
        viewBox={`0 0 ${ANCHO} ${ALTO}`}
        role="slider"
        tabIndex={0}
        aria-label={etiqueta}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={valor}
        onPointerDown={(e) => {
          (e.currentTarget as Element).setPointerCapture(e.pointerId)
          desdePuntero(e)
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1) desdePuntero(e)
        }}
        onKeyDown={teclado}
        className="focus-visible:outline-dash-blue cursor-pointer touch-none rounded-lg outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <path d={d} fill="none" stroke="#dbeafe" strokeWidth={GROSOR} strokeLinecap="round" />
        <path
          d={d} fill="none" stroke={color} strokeWidth={GROSOR} strokeLinecap="round"
          strokeDasharray={LARGO} strokeDashoffset={LARGO * (1 - pct)}
        />
        <circle cx={kx} cy={ky} r={GROSOR / 2 + 4} fill="#fff" />
        <circle cx={kx} cy={ky} r={GROSOR / 2 - 3} fill={color} />
      </svg>
      {/* El valor se apoya en la base del semicírculo, que es donde el arco
          deja aire. */}
      <div
        className="pointer-events-none absolute inset-x-0 flex flex-col items-center"
        style={{ bottom: PAD + 6 }}
      >
        {children}
      </div>
    </div>
  )
}

function CampoNumero({
  label, valor, min, max, paso, onChange,
}: {
  label?: string
  valor: number
  min: number
  max: number
  paso: number
  onChange: (v: number) => void
}) {
  const acotar = (v: number) => Math.min(max, Math.max(min, Number(v.toFixed(1))))
  return (
    <div className="min-w-0 flex-1">
      {label && <span className="mb-1 block text-center text-[12px] text-ink-medium">{label}</span>}
      <div className="flex items-center justify-center gap-1.5">
        <button
          onClick={() => onChange(acotar(valor - paso))}
          aria-label={`Decrease ${label ?? 'value'}`}
          className="bg-dash-blue hover:bg-dash-blue-hover flex size-7 shrink-0 items-center justify-center rounded-full text-white transition-colors"
        >
          <Minus className="size-3.5" />
        </button>
        <input
          value={valor}
          onChange={(e) => {
            const n = Number(e.target.value)
            if (!Number.isNaN(n)) onChange(acotar(n))
          }}
          inputMode="decimal"
          aria-label={label ?? 'Value'}
          className="focus:border-dash-blue h-8 w-full min-w-0 rounded-md border border-line text-center text-[13px] font-medium tabular-nums focus:outline-none"
        />
        <button
          onClick={() => onChange(acotar(valor + paso))}
          aria-label={`Increase ${label ?? 'value'}`}
          className="bg-dash-blue hover:bg-dash-blue-hover flex size-7 shrink-0 items-center justify-center rounded-full text-white transition-colors"
        >
          <Plus className="size-3.5" />
        </button>
      </div>
    </div>
  )
}

/* El estado sale del valor y su rango: los extremos son los que el frame
   pinta en rojo y ámbar. Así el color no es decorativo, dice algo. */
function estadoDe(v: number, min: number, max: number): EstadoVital {
  const p = (v - min) / (max - min)
  if (p < 0.12) return 'Dangerously low'
  if (p > 0.75) return 'Elevated'
  return 'Normal'
}

function TarjetaVital({ v, aviso: conAviso }: { v: Vital; aviso?: boolean }) {
  const [valores, setValores] = useState(v.campos.map((c) => c.valor))
  const [grupo, setGrupo] = useState(v.alternador?.grupo[0] ?? '')
  const [unidad, setUnidad] = useState(v.alternador?.unidades[0] ?? v.unidad)

  const principal = v.campos[0]
  const pct = Math.min(1, Math.max(0, (valores[0] - principal.min) / (principal.max - principal.min)))
  const estado = estadoDe(valores[0], principal.min, principal.max)
  const color = estado === 'Normal' ? '#1d56bc' : VITAL_COLOR[estado].arco
  const texto = v.campos.length > 1 ? `${valores[0]}/${valores[1]}` : String(valores[0])

  return (
    <div className="flex flex-col rounded-xl border border-line bg-white p-4">
      <div className="flex items-start justify-between gap-2">
        <span className="min-w-0">
          <span className="block text-[17px] font-bold text-ink">{v.titulo}</span>
          <span className="block text-[12px] text-ink-medium">{v.subtitulo}</span>
        </span>
        <span className={cn('shrink-0 rounded-full border px-2 py-[2px] text-[11px] font-semibold', VITAL_COLOR[estado].pill)}>
          {estado}
        </span>
      </div>

      {/* El aviso no está por defecto: aparece cuando el valor se va del rango
          normal. Fijo, era una advertencia que nunca advertía de nada. */}
      {conAviso && estado !== 'Normal' && (
        <div className="border-l-dash-blue bg-dash-count-bg mt-3 rounded-r-md border-l-[3px] px-3 py-2">
          <p className="text-dash-blue-hover text-[12px] font-bold">{AVISO_PRESION.titulo}</p>
          <p className="text-dash-blue-hover text-[12px] font-semibold">{AVISO_PRESION.texto}</p>
        </div>
      )}

      {v.alternador && (
        <div className="mt-3 flex w-fit gap-1 rounded-lg bg-surface-muted p-1">
          {v.alternador.grupo.map((g) => (
            <button
              key={g}
              onClick={() => setGrupo(g)}
              className={cn(
                'rounded-md px-3 py-1 text-[12px] font-medium transition-colors',
                grupo === g ? 'bg-dash-blue text-white' : 'text-ink-medium hover:bg-white',
              )}
            >
              {g}
            </button>
          ))}
        </div>
      )}

      {/* Alto fijo para el medidor: sin esto las seis tarjetas tenían el
          bloque de campos a distinta altura según el largo del título o del
          aviso, y la grilla se veía desordenada. */}
      <div className="mt-4 flex flex-1 items-end justify-center">
        <Medidor
          pct={pct}
          color={color}
          etiqueta={v.campos.length > 1 ? `${v.titulo} systolic` : v.titulo}
          min={principal.min}
          max={principal.max}
          valor={valores[0]}
          onValor={(n) => setValores((vs) => vs.map((x, j) => (j === 0 ? Number(n.toFixed(1)) : x)))}
        >
          <span className="text-[27px] leading-none font-bold tracking-tight text-ink tabular-nums">
            {texto}
            <span className="ml-0.5 align-baseline text-[12px] font-bold">{v.unidad}</span>
          </span>
        </Medidor>
      </div>

      {v.alternador && (
        <div className="mx-auto mt-3 flex w-fit gap-1 rounded-lg bg-surface-muted p-1">
          {v.alternador.unidades.map((u) => (
            <button
              key={u}
              onClick={() => setUnidad(u)}
              className={cn(
                'rounded-md px-3 py-1 text-[12px] font-medium transition-colors',
                unidad === u ? 'bg-dash-blue text-white' : 'text-ink-medium hover:bg-white',
              )}
            >
              {u}
            </button>
          ))}
        </div>
      )}

      <div className="mt-3 flex items-end gap-2">
        {v.campos.map((c, i) => (
          <CampoNumero
            key={c.label ?? i}
            label={c.label}
            valor={valores[i]}
            min={c.min}
            max={c.max}
            paso={c.paso}
            onChange={(n) => setValores((vs) => vs.map((x, j) => (j === i ? n : x)))}
          />
        ))}
      </div>

      <p className="mt-3 text-[11px] text-ink-muted">{v.rango}</p>
    </div>
  )
}

export function VitalsPanel() {
  const [nota, setNota] = useState('')

  return (
    /* En xl el contenido deja lugar a la derecha para las tres acciones
       flotantes; sin ese margen les pasaba por debajo. */
    <div className="relative xl:pr-14">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {VITALES.map((v) => (
          <TarjetaVital key={v.id} v={v} aviso={v.id === 'blood-pressure'} />
        ))}
      </div>

      {/* Composer de notas: el frame lo pone abajo, ocupando la columna izquierda. */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-xl border border-line bg-white p-3">
          <textarea
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            placeholder="Add notes"
            rows={2}
            className="w-full resize-none text-[13px] placeholder:text-ink-faint focus:outline-none"
          />
          <div className="mt-2 flex items-center gap-3">
            <button
              onClick={() => aviso.info('Attachments are not available in this release.')}
              aria-label="Attach file"
              className="text-ink-medium hover:opacity-70"
            >
              <Paperclip className="size-4" />
            </button>
            <button
              onClick={() => aviso.info('Voice notes are not available in this release.')}
              aria-label="Record voice note"
              className="text-ink-medium hover:opacity-70"
            >
              <Mic className="size-4" />
            </button>
            {/* Deshabilitado sin texto: en el frame el botón está apagado. */}
            <button
              disabled={!nota.trim()}
              onClick={() => { aviso.ok('Note added to the encounter.'); setNota('') }}
              className="bg-dash-blue hover:bg-dash-blue-hover ml-auto h-8 rounded-md px-4 text-[13px] font-semibold text-white transition-colors disabled:bg-surface-muted disabled:text-ink-faint"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Las tres acciones flotantes del borde derecho. Van fijas a la ventana
          —como el FAB de Scheduling— y no colgadas del contenedor: colgadas
          quedaban fuera del documento y lo hacían scrollear de costado. */}
      <div className="pointer-events-none fixed top-1/2 right-3 z-30 hidden -translate-y-1/2 xl:block">
        <div className="pointer-events-auto flex flex-col gap-3">
          {[
            { icono: Plus, label: 'Add vital', msg: 'Adding a vital is not available in this release.' },
            { icono: FilePlus2, label: 'New document', msg: 'Documents are not available in this release.' },
            { icono: Table2, label: 'Table view', msg: 'The table view is not available in this release.' },
          ].map(({ icono: Icono, label, msg }) => (
            <button
              key={label}
              onClick={() => aviso.info(msg)}
              aria-label={label}
              title={label}
              className={BOTON_ICONO_REDONDO}
            >
              <Icono className="size-4" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
