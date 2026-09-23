import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import {
  ChevronLeft, ChevronDown, PanelsTopLeft, Check, Link2, Activity, Users, Info,
  FileText, Play, Pause,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { CONSTANTES, CONTADORES, PANELES, type Contador, type ClavePanel } from '@/data/clinical-mode'
import { ClinicalPopover } from '@/components/patients/ClinicalPopover'
import { ClinicalItemModal } from '@/components/patients/ClinicalItemModal'
import { ITEMS_INICIALES, type Categoria, type ClinicalItem } from '@/data/clinicalItems'

const ICONO_CONTADOR = { link: Link2, signos: Activity, personas: Users, info: Info }

/* Barra de 4235:135661. Sólo Exit y Overwiev llevan caja; lo demás va suelto
   sobre el fondo. Todo va en una fila pegada, con la misma separación entre
   piezas: nada se estira. Antes el grupo del medio crecía y dejaba un hueco
   enorme antes de Start Enconter. */
const CAJA = 'flex h-9 shrink-0 items-center gap-2 rounded-lg border border-[#e4e4e7] bg-white px-2.5 text-[13px] font-medium text-[#09090b] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)]'

/* Todo lo que cuelga de la barra —los contadores y las pills CC/TR— usa el
   mismo desplegable flotante. Va en portal y con posición fija: la barra
   scrollea de costado y un absoluto adentro quedaría recortado. */
function Flotante({
  titulo, ancla, ancho = 220, onClose, children,
}: {
  titulo: string
  ancla: DOMRect
  ancho?: number
  onClose: () => void
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const left = Math.max(12, Math.min(ancla.left, window.innerWidth - ancho - 12))

  useEffect(() => {
    const fuera = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('mousedown', fuera)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', fuera)
      document.removeEventListener('keydown', esc)
    }
  }, [onClose])

  return createPortal(
    <div
      ref={ref}
      role="dialog"
      aria-label={titulo}
      style={{ left, top: ancla.bottom + 6, width: ancho }}
      className="motion-safe:animate-[loc-in_120ms_ease-out] fixed z-50 rounded-lg border border-[#e4e4e7] bg-white p-3 shadow-[0_12px_32px_rgb(0_0_0/0.18)]"
    >
      <p className="text-[13px] font-bold text-[#09090b]">{titulo}</p>
      {children}
    </div>,
    document.body,
  )
}

/* Referrals cuenta lo suyo; las clínicas cuentan lo que hay en la lista. */
function ListaContador({ c }: { c: Contador }) {
  if (c.items.length === 0) return <p className="mt-1.5 text-[12px] text-[#71717a]">{c.vacio}</p>
  return (
    <ul className="mt-2 flex flex-col gap-1.5">
      {c.items.map((i) => (
        <li key={i} className="flex items-center gap-2 text-[12px] text-[#52525b]">
          <span className="bg-dash-blue size-1 shrink-0 rounded-full" />
          <span className="min-w-0 truncate">{i}</span>
        </li>
      ))}
    </ul>
  )
}

type Flot =
  | { tipo: 'contador'; c: Contador; rect: DOMRect }
  | { tipo: 'pill'; k: ClavePanel; rect: DOMRect }

/* Tres de los cuatro contadores son categorías clínicas y ya tienen su
   componente en el dashboard del paciente: el popover con la lista y el modal
   de alta. Se reusa ese, no una lista de sólo lectura. Referrals no es una
   categoría clínica y sigue con su lista simple. */
const CATEGORIA_DE: Record<string, Categoria> = {
  medications: 'Medication',
  conditions: 'Medical Conditions',
  allergies: 'Allergies',
}

export function ClinicalTopBar({
  volverA, encuentro, onEncuentro, onOverview, enOverview,
}: {
  volverA: string
  encuentro: boolean
  onEncuentro: () => void
  onOverview: () => void
  enOverview: boolean
}) {
  const [abierto, setAbierto] = useState(false)
  const [flot, setFlot] = useState<Flot | null>(null)
  const [items, setItems] = useState(ITEMS_INICIALES)
  const [clinico, setClinico] = useState<{ cat: Categoria; item?: ClinicalItem } | null>(null)

  const cuenta = (c: Contador) =>
    CATEGORIA_DE[c.id] ? items[CATEGORIA_DE[c.id]].length : c.items.length

  const contadorBoton = (c: Contador) => {
    const Icono = ICONO_CONTADOR[c.icono]
    const on = flot?.tipo === 'contador' && flot.c.id === c.id
    return (
      <button
        key={c.id}
        title={c.titulo}
        aria-label={`${c.titulo}: ${cuenta(c)}`}
        aria-expanded={on}
        onClick={(e) =>
          setFlot(on ? null : { tipo: 'contador', c, rect: e.currentTarget.getBoundingClientRect() })
        }
        className={cn(
          /* Cápsula más alta que en el export: con 18.17 el ícono queda en
             12px y no se distingue de qué es cada contador. */
          'flex h-[26px] shrink-0 items-center gap-[4px] rounded-full border border-[#E5E7EB] bg-[#F9FAFB] px-[6px] transition-colors hover:bg-[#f1f5ff]',
          on && 'border-dash-blue bg-dash-count-bg',
        )}
      >
        <Icono className="text-dash-blue size-[16px]" />
        {/* El cero va en gris: un contador vacío no es una novedad. */}
        {/* El export pinta el badge de azul también con 0: no se separa el
            caso vacío. */}
        <span className="bg-dash-blue flex size-[17px] items-center justify-center rounded-full text-[9px] leading-none text-white">
          {cuenta(c)}
        </span>
      </button>
    )
  }

  const guardarItem = (cat: Categoria) => (it: ClinicalItem) =>
    setItems((prev) => {
      const lista = prev[cat]
      const existe = lista.some((x) => x.id === it.id)
      return { ...prev, [cat]: existe ? lista.map((x) => (x.id === it.id ? it : x)) : [...lista, it] }
    })

  const borrarItem = (cat: Categoria) => (it: ClinicalItem) => {
    const indice = items[cat].findIndex((x) => x.id === it.id)
    setItems((prev) => ({ ...prev, [cat]: prev[cat].filter((x) => x.id !== it.id) }))
    aviso.warn(`${it.name} was removed.`, {
      label: 'Undo',
      onClick: () => setItems((prev) => ({
        ...prev,
        [cat]: [...prev[cat].slice(0, indice), it, ...prev[cat].slice(indice)],
      })),
    })
  }

  return (
    /* Fila de 1124 con gap 21 entre los cinco grupos, tal cual el export.
       Ninguno crece: la suma de los grupos más los gaps da exactamente 1124,
       así que el sobrante de pantallas más anchas queda a la derecha. */
    <div className="relative flex flex-wrap items-center gap-[12px] md:max-lg:gap-x-2 lg:flex-nowrap lg:overflow-x-auto">
      {/* Grupo 0 del export: Exit + Overwiev + las dos pills, con gap 9.82 y
          11.25 respectivamente. */}
      {/* En el teléfono el grupo envuelve: sus 370px no entran en 358 y la
          barra terminaba scrolleando de costado. En tablet ocupa la primera
          línea entera -Exit y Overwiev a la izquierda, CC y TR al final- y
          empuja los contadores y el paciente a la segunda. */}
      <span className="flex items-center gap-[9.82px] max-md:flex-wrap md:max-lg:w-full lg:shrink-0">
      <Link to={volverA} className={cn(CAJA, 'hover:bg-[#fafafa]')}>
        <ChevronLeft className="size-[15.71px]" /> Exit clinical Mode
      </Link>

      {/* Overwiev no es una pestaña: es el botón que vuelve al panel del
          paciente desde cualquier examen o registro. */}
      <button
        onClick={onOverview}
        aria-current={enOverview ? 'page' : undefined}
        /* Seleccionado usa el mismo azul que la pestaña activa de la
           botonera, y el hover también tira a azul: es el estado de "acá
           estás" del sistema, no un borde negro suelto. */
        className={cn(
          CAJA,
          'font-semibold',
          enOverview
            ? 'bg-dash-blue hover:bg-dash-blue-hover border-transparent text-white'
            : 'hover:border-dash-blue hover:bg-dash-count-bg hover:text-dash-blue-hover',
        )}
      >
        <PanelsTopLeft className="size-[15.71px]" /> Overwiev
      </button>

      <span className="flex shrink-0 items-center gap-[11.25px] md:max-lg:ml-auto">

      {/* CC y TR cuelgan un desplegable igual que los contadores: el texto es
          corto y abrir media pantalla para leer dos párrafos era demasiado. */}
      {(['CC', 'TR'] as const).map((k) => {
        const on = flot?.tipo === 'pill' && flot.k === k
        return (
          <button
            key={k}
            onClick={(e) =>
              setFlot(on ? null : { tipo: 'pill', k, rect: e.currentTarget.getBoundingClientRect() })
            }
            aria-expanded={on}
            className={cn(
              'flex h-[22.81px] shrink-0 items-center gap-[4.54px] rounded-full bg-[#28C563] px-[5.68px] text-[10.9px] text-white',
              'transition-all outline-none [outline-style:solid] outline-[2px] outline-offset-[2px] outline-transparent',
              'hover:bg-[#1fae54]',
              on && 'outline-[#28C563]',
            )}
          >
            <Check className="size-[9.08px]" /> {k}
          </button>
        )
      })}
      </span>
      </span>

      {/* Grupo 1: los contadores, gap 6 -Medications incluido, en su lugar
          original-. */}
      <span className="flex items-center gap-[6px] max-md:flex-wrap md:shrink-0">
      {CONTADORES.map(contadorBoton)}
      </span>

      {/* Grupo 4: la info del paciente (edad/sexo/altura/peso + avatar y
          nombre), el botón de nota y Start Enconter, gap 9. Julián pidió esto
          al revés de como había quedado: lo que se sacaba del racimo de
          contadores -por pesado, no por chico- era este bloque, no
          Medications. Es el único grupo que se corre: `ml-auto` manda el
          sobrante acá y deja los demás pegados con su hueco de 12. */}
      <span className="flex shrink-0 items-center gap-[9px] max-md:w-full max-md:flex-wrap md:ml-auto">

      {/* Subgrupo de info del paciente: detail-info-bar + user-info-bar
          envuelven juntos, como una sola unidad, separados del botón de nota
          y Start Enconter -si compartieran una sola fila sin wrap propio, el
          `max-lg:flex-1` del pill de abajo lo aplastaría contra lo que sobre
          en esa línea en vez de mandarlo a la suya-. */}
      <span className="flex items-center gap-[9px] max-md:flex-wrap">
      {/* "detail-info-bar": cuatro celdas de 15.71 de alto separadas por una
          regla a la derecha —la última no lleva—, texto de 11.79. */}
      <span className="flex h-[15.71px] items-center gap-[3.93px] max-md:flex-wrap md:shrink-0">
        {CONSTANTES.map((c, i) => (
          <span
            key={c.valor}
            className={cn(
              'flex h-full items-center justify-center px-[6px] md:max-lg:px-1 text-[11.79px] leading-[16px] whitespace-nowrap text-black',
              i < CONSTANTES.length - 1 && 'border-r border-[#E4E4E7]',
            )}
          >
            {c.valor}
          </span>
        ))}
      </span>

      {/* "user-info-bar": avatar de 23.71 y el nombre en 11.95/600. */}
      <span className="flex shrink-0 items-center gap-[3.19px]">
        <span className="bg-dash-count-bg text-dash-blue-hover flex size-[23.71px] items-center justify-center rounded-full text-[10px] font-semibold">
          JP
        </span>
        <span className="text-[11.95px] leading-[14px] font-semibold whitespace-nowrap text-[#18181B]">
          Julio Perez
        </span>
      </span>
      </span>

      {/* Subgrupo del botón de nota + Start Enconter: en su propia fila el
          pill puede volver a ocupar todo el ancho que sobre (`max-lg:flex-1`
          adentro), en vez de repartirse contra la info del paciente. */}
      <span className="flex shrink-0 items-center gap-[9px] max-md:w-full">
      <button
        onClick={() => aviso.info('Clinical note is not available in this release.')}
        aria-label="Clinical note"
        /* Redondo, como en el frame: es un ícono suelto, no un control con
           etiqueta como Exit u Overwiev. */
        className="flex size-[31.43px] shrink-0 items-center justify-center rounded-full border border-[#E4E4E7] bg-white text-black transition-colors hover:bg-[#fafafa]"
      >
        <FileText className="size-[15.71px]" />
      </button>

      {/* Un solo pill verde con el chevron adentro: 31.79 de alto, radio
          completo, label en 10.8/600. */}
      <div className="flex h-[31.79px] shrink-0 items-center overflow-hidden rounded-full bg-[#28C563] max-md:flex-1">
        <button
          onClick={onEncuentro}
          className="flex h-full items-center justify-center gap-[7.86px] pr-[6px] pl-[12.77px] md:max-lg:pl-2.5 text-[10.8px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-[#1fae54] max-md:flex-1"
        >
          {encuentro ? <Pause className="size-[13.75px]" /> : <Play className="size-[13.75px]" />}
          {encuentro ? 'Pause Enconter' : 'Start Enconter'}
        </button>
        <button
          onClick={() => setAbierto((v) => !v)}
          aria-label="Encounter options"
          aria-expanded={abierto}
          className="flex h-full items-center pr-[12.77px] pl-[2px] md:max-lg:pr-[9px] text-white transition-colors hover:bg-[#1fae54]"
        >
          <ChevronDown className={cn('size-[15.71px] transition-transform', abierto && 'rotate-180')} />
        </button>
      </div>
      </span>
      </span>

      {abierto && (
        <div className="absolute top-full right-0 z-40 mt-1 w-[220px] rounded-lg border border-[#e4e4e7] bg-white p-1 shadow-[0_12px_32px_rgb(0_0_0/0.18)]">
          {['End encounter', 'Discard encounter', 'Encounter settings'].map((t) => (
            <button
              key={t}
              onClick={() => { setAbierto(false); aviso.info(`${t} is not available in this release.`) }}
              className="block w-full rounded px-3 py-2 text-left text-[13px] hover:bg-[#f4f4f5]"
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {/* Categoría clínica: el popover del dashboard del paciente, con alta,
          edición y baja. Referrals: la lista simple. */}
      {flot?.tipo === 'contador' && CATEGORIA_DE[flot.c.id] && (
        <ClinicalPopover
          title={CATEGORIA_DE[flot.c.id]}
          anchor={flot.rect}
          items={items[CATEGORIA_DE[flot.c.id]]}
          onAdd={() => setClinico({ cat: CATEGORIA_DE[flot.c.id] })}
          onEdit={(it) => setClinico({ cat: CATEGORIA_DE[flot.c.id], item: it })}
          onDelete={borrarItem(CATEGORIA_DE[flot.c.id])}
          onClose={() => setFlot(null)}
        />
      )}
      {flot?.tipo === 'contador' && !CATEGORIA_DE[flot.c.id] && (
        <Flotante titulo={flot.c.titulo} ancla={flot.rect} onClose={() => setFlot(null)}>
          <ListaContador c={flot.c} />
        </Flotante>
      )}
      {clinico && (
        <ClinicalItemModal
          categoria={clinico.cat}
          item={clinico.item}
          onGuardar={guardarItem(clinico.cat)}
          onClose={() => setClinico(null)}
        />
      )}
      {flot?.tipo === 'pill' && (
        <Flotante titulo={PANELES[flot.k].titulo} ancla={flot.rect} ancho={300} onClose={() => setFlot(null)}>
          {PANELES[flot.k].parrafos.map((t) => (
            <p key={t} className="mt-2 text-[12px] leading-[1.55] text-[#52525b]">{t}</p>
          ))}
          <p className="mt-3 border-t border-[#f1f1f4] pt-2 text-[11px] text-[#71717a]">
            {PANELES[flot.k].fecha} · {PANELES[flot.k].hora}
          </p>
        </Flotante>
      )}
    </div>
  )
}
