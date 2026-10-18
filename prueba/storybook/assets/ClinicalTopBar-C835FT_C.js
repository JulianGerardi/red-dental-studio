import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import {
  ChevronLeft, ChevronDown, PanelsTopLeft, Link2, Activity, Users, Info,
  Play, Pause, FileText,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BOTON_EXPANDIBLE, ETIQUETA_EXPANDIBLE } from '@/lib/estilos'
import { aviso } from '@/components/ui/toaster'
import { CONSTANTES, CONTADORES, type Contador } from '@/data/clinical-mode'
import { ClinicalBadge, type TipoBadge } from '@/components/clinical/ClinicalBadge'
import { useWorkflows } from '@/components/clinical/WorkflowsContext'
import { WORKFLOWS, WORKFLOW_DEL_BADGE, contestada, preguntasVisibles, textoRespuesta, type ProgresoWorkflow } from '@/data/workflows'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { ClinicalPopover } from '@/components/patients/ClinicalPopover'
import { ClinicalItemModal } from '@/components/patients/ClinicalItemModal'
import { ITEMS_INICIALES, type Categoria, type ClinicalItem } from '@/data/clinicalItems'

const ICONO_CONTADOR = { link: Link2, signos: Activity, personas: Users, info: Info }

/* Barra de 4235:135661. Todo va en una fila pegada, con la misma separación
   entre piezas: nada se estira. Antes el grupo del medio crecía y dejaba un
   hueco enorme antes de Start Enconter.

   Exit y Overwiev (la caja con texto del frame) van sólo con el ícono, a
   pedido de Julián: al pasar el mouse el botón muestra su caja y se abre con
   el texto adentro. 36px en reposo: 8 de padding + 1 de borde + el ícono de
   18. Al abrirse empujan lo de al lado, no lo tapan. */
const BOTON = BOTON_EXPANDIBLE
const ETIQUETA = ETIQUETA_EXPANDIBLE

/* Todo lo que cuelga de la barra —los contadores y las pills CC/TR— usa el
   mismo desplegable flotante. Va en portal y con posición fija: la barra
   scrollea de costado y un absoluto adentro quedaría recortado. */
export function Flotante({
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
      className="motion-safe:animate-[loc-in_120ms_ease-out] fixed z-50 rounded-lg border border-line bg-white p-3 shadow-floating"
    >
      <p className="text-[13px] font-bold text-ink">{titulo}</p>
      {children}
    </div>,
    document.body,
  )
}

/* Referrals cuenta lo suyo; las clínicas cuentan lo que hay en la lista. */
export function ListaContador({ c }: { c: Contador }) {
  if (c.items.length === 0) return <p className="mt-1.5 text-[12px] text-ink-muted">{c.vacio}</p>
  return (
    <ul className="mt-2 flex flex-col gap-1.5">
      {c.items.map((i) => (
        <li key={i} className="flex items-center gap-2 text-[12px] text-ink-medium">
          <span className="bg-dash-blue size-1 shrink-0 rounded-full" />
          <span className="min-w-0 truncate">{i}</span>
        </li>
      ))}
    </ul>
  )
}

/* Lo que se ve al abrir CC o TR: las respuestas del workflow, o el aviso de que el paciente todavía no lo contestó (como
   en red.dev) con el atajo a Treatment. */
export function ResumenWorkflow({ k, progreso, onAbrir }: { k: TipoBadge; progreso?: ProgresoWorkflow; onAbrir: () => void }) {
  const wf = WORKFLOWS.find((w) => w.id === WORKFLOW_DEL_BADGE[k])!
  if (!progreso?.completado) {
    return (
      <div className="mt-3 flex flex-col items-center gap-2 rounded-lg border border-line-soft px-3 py-4 text-center">
        <span className="bg-info-bg text-dash-blue flex size-8 items-center justify-center rounded-lg"><FileText className="size-4" aria-hidden /></span>
        <p className="text-[12px] text-ink-muted">The patient has not answered the {wf.nombre.toLowerCase()} questions yet.</p>
        <Button size="sm" onClick={onAbrir}>Answer in Treatment</Button>
      </div>
    )
  }
  const r = progreso.respuestas
  return (
    <>
      <div className="mt-2 flex max-h-[320px] flex-col gap-3 overflow-y-auto">
        {wf.pasos.map((paso) => (
          <div key={paso.id}>
            <p className="text-[10px] font-semibold tracking-wide text-ink-muted uppercase">{paso.nombre}</p>
            <dl className="mt-1 flex flex-col gap-1.5">
              {preguntasVisibles(paso.preguntas, r).filter((p) => contestada(r[p.id])).map((p) => (
                <div key={p.id}>
                  <dt className="text-[11px] text-ink-muted">{p.texto}</dt>
                  <dd className="text-[12px] text-ink">{textoRespuesta(r[p.id])}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between gap-2 border-t border-line-soft pt-2">
        <span className="text-[11px] text-ink-muted">Completed {progreso.completado}</span>
        <Button variant="link" size="sm" onClick={onAbrir}>Open in Treatment</Button>
      </div>
    </>
  )
}

/* Figma 4540:27072: al cerrar el encuentro se ofrece firmar la Clinical Note ahora o más tarde. */
export function ClinicalNoteDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent showCloseButton={false} className="gap-0 p-6 sm:max-w-[440px]">
        <DialogTitle className="text-[18px] font-semibold text-ink">Clinical Note</DialogTitle>
        <DialogDescription className="mt-3 text-[13px] leading-relaxed text-ink-muted">
          The clinical encounter has been completed.<br />
          You can sign the Clinical Note now or defer the signature and complete it later.
        </DialogDescription>
        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <Button variant="secondary" onClick={() => { onClose(); aviso.info('We will remind you to sign the Clinical Note.') }}>Remind me later</Button>
          <Button onClick={() => { onClose(); aviso.ok('Clinical Note signed.') }}>Review and sign</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

type Flot =
  | { tipo: 'contador'; c: Contador; rect: DOMRect }
  | { tipo: 'pill'; k: TipoBadge; rect: DOMRect }

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
  const [nota, setNota] = useState(false)

  const cuenta = (c: Contador) =>
    CATEGORIA_DE[c.id] ? items[CATEGORIA_DE[c.id]].length : c.items.length

  const contadorBoton = (c: Contador) => {
    const Icono = ICONO_CONTADOR[c.icono]
    const on = flot?.tipo === 'contador' && flot.c.id === c.id
    return (
      <button
        key={c.id}
        title={c.titulo}
        aria-label={\`\${c.titulo}: \${cuenta(c)}\`}
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
    aviso.warn(\`\${it.name} was removed.\`, {
      label: 'Undo',
      onClick: () => setItems((prev) => ({
        ...prev,
        [cat]: [...prev[cat].slice(0, indice), it, ...prev[cat].slice(indice)],
      })),
    })
  }

  /* CC y TR cuelgan un desplegable igual que los contadores. Cada uno dice si su workflow (Chief Complaint, Triage) está
     completo en Treatment: verde con tilde, o rojo suave con cruz como en red.dev. Se dibujan en dos lugares -según el
     ancho, uno se oculta con \`hidden\`- y comparten estos botones. */
  const { progreso, abrir } = useWorkflows()
  const listo = (k: TipoBadge) => !!progreso[WORKFLOW_DEL_BADGE[k]]?.completado
  const pastillas = (['CC', 'TR'] as const).map((k) => {
    const on = flot?.tipo === 'pill' && flot.k === k
    const nombre = WORKFLOWS.find((w) => w.id === WORKFLOW_DEL_BADGE[k])!.nombre
    return (
      <button
        key={k}
        onClick={(e) =>
          setFlot(on ? null : { tipo: 'pill', k, rect: e.currentTarget.getBoundingClientRect() })
        }
        aria-expanded={on}
        aria-label={\`\${nombre}: \${listo(k) ? 'completed' : 'not completed'}\`}
        title={\`\${nombre} · \${listo(k) ? 'Completed' : 'Not completed'}\`}
        className={cn(
          'shrink-0 rounded-full transition-all outline-none [outline-style:solid] outline-[2px] outline-offset-[2px] outline-transparent enabled:hover:opacity-90',
          on && (listo(k) ? 'outline-status-ok' : 'outline-required'),
        )}
      >
        {/* El badge del design system 2.0 en tamaño md: al del export (22 de alto) el tilde casi no se distinguía. */}
        <ClinicalBadge tipo={k} resultado={listo(k) ? 'ok' : 'no'} estado={listo(k) ? 'active' : 'inactive'} size="md" />
      </button>
    )
  })

  return (
    /* Fila de 1124 con gap 21 entre los cinco grupos, tal cual el export.
       Ninguno crece: la suma de los grupos más los gaps da exactamente 1124,
       así que el sobrante de pantallas más anchas queda a la derecha. */
    <div className="relative flex flex-wrap items-center gap-[12px] lg:flex-nowrap lg:overflow-x-auto">
      {/* Grupo 0 del export: Exit + Overwiev + las dos pills, con gap 9.82 y
          11.25 respectivamente -las pills sólo hasta lg: en desktop se
          mudaron junto a la edad-. */}
      {/* En el teléfono el grupo envuelve: sus 370px no entran en 358 y la
          barra terminaba scrolleando de costado. En tablet ocupa la primera
          línea entera -Exit y Overwiev a la izquierda, CC y TR al final- y
          empuja los contadores y el paciente a la segunda. */}
      <span className="flex items-center gap-[9.82px] max-md:flex-wrap md:max-lg:w-full lg:shrink-0">
      {/* Exit y Overwiev: en reposo son dos íconos; al pasar el mouse el botón
          se abre hacia la derecha con su texto y empuja lo que tiene al lado.
          Antes se abría por encima y tapaba los contadores (Medications y
          compañía): Julián pidió que no se superpongan. */}
      <Link to={volverA} aria-label="Exit clinical Mode" className={cn(BOTON, 'hover:bg-surface-subtle')}>
        <ChevronLeft className="size-[18px] shrink-0" />
        <span className={ETIQUETA}>Exit clinical Mode</span>
      </Link>

      {/* Overwiev no es una pestaña: es el botón que vuelve al panel del
          paciente desde cualquier examen o registro. */}
      <button
        onClick={onOverview}
        aria-label="Overwiev"
        aria-current={enOverview ? 'page' : undefined}
        /* Seleccionado sigue siendo el azul sólido de la pestaña activa de la
           botonera aunque el resto esté escondido: es el estado de "acá
           estás", no decoración. Inactivo, el hover tira a azul. */
        className={cn(
          BOTON,
          'font-semibold',
          enOverview
            ? 'bg-dash-blue hover:bg-dash-blue-hover border-transparent text-white hover:border-transparent'
            : 'hover:border-dash-blue hover:bg-dash-count-bg hover:text-dash-blue-hover',
        )}
      >
        <PanelsTopLeft className="size-[18px] shrink-0" />
        <span className={ETIQUETA}>Overwiev</span>
      </button>

      {/* CC y TR hasta lg: en tablet al final de la primera línea, en el
          teléfono envueltas con el resto. Desde lg se muestran junto a la
          edad del paciente, más abajo. */}
      <span className="flex shrink-0 items-center gap-[11.25px] md:max-lg:ml-auto lg:hidden">
        {pastillas}
      </span>
      </span>

      {/* Grupo 1: los contadores, gap 6 -Medications incluido, en su lugar
          original-. */}
      <span className="flex items-center gap-[6px] max-md:flex-wrap md:shrink-0">
      {CONTADORES.map(contadorBoton)}
      </span>

      {/* Grupo 4: la info del paciente (edad/sexo/altura/peso + avatar y
          nombre) y Start Enconter, gap 9 -el botón de nota se sacó a pedido de
          Julián-. Julián pidió esto
          al revés de como había quedado: lo que se sacaba del racimo de
          contadores -por pesado, no por chico- era este bloque, no
          Medications. Es el único grupo que se corre: \`ml-auto\` manda el
          sobrante acá y deja los demás pegados con su hueco de 12. */}
      <span className="flex shrink-0 items-center gap-[9px] max-md:w-full max-md:flex-wrap md:ml-auto">

      {/* Subgrupo de info del paciente: detail-info-bar + user-info-bar
          envuelven juntos, como una sola unidad, separados de Start Enconter
          -si compartieran una sola fila sin wrap propio, el \`max-md:flex-1\`
          del pill de abajo lo aplastaría contra lo que sobre en esa línea en
          vez de mandarlo a la suya-. */}
      <span className="flex items-center gap-[9px] max-md:flex-wrap">
      {/* Desktop: CC y TR pegadas a la edad, a pedido de Julián. */}
      <span className="hidden shrink-0 items-center gap-[11.25px] lg:flex">
        {pastillas}
      </span>
      {/* "detail-info-bar": cuatro celdas de 15.71 de alto separadas por una
          regla a la derecha —la última no lleva—, texto de 11.79. */}
      <span className="flex h-[15.71px] items-center gap-[3.93px] max-md:flex-wrap md:shrink-0">
        {CONSTANTES.map((c, i) => (
          <span
            key={c.valor}
            className={cn(
              'flex h-full items-center justify-center px-[6px] text-[11.79px] leading-[16px] whitespace-nowrap text-black',
              i < CONSTANTES.length - 1 && 'border-r border-line',
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

      {/* Start Enconter: en su propia fila el pill puede volver a ocupar todo
          el ancho que sobre (\`max-md:flex-1\` adentro), en vez de repartirse
          contra la info del paciente. */}
      <span className="flex shrink-0 items-center gap-[9px] max-md:w-full">
      {/* Un solo pill verde con el chevron adentro: 31.79 de alto, radio
          completo, label en 10.8/600. */}
      <div className="flex h-[31.79px] shrink-0 items-center overflow-hidden rounded-full bg-status-ok max-md:flex-1">
        <button
          onClick={onEncuentro}
          className="flex h-full items-center justify-center gap-[7.86px] pr-[6px] pl-[12.77px] text-[10.8px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-[#1fae54] max-md:flex-1"
        >
          {encuentro ? <Pause className="size-[13.75px]" /> : <Play className="size-[13.75px]" />}
          {encuentro ? 'Pause Enconter' : 'Start Enconter'}
        </button>
        <button
          onClick={() => setAbierto((v) => !v)}
          aria-label="Encounter options"
          aria-expanded={abierto}
          className="flex h-full items-center pr-[12.77px] pl-[2px] text-white transition-colors hover:bg-[#1fae54]"
        >
          <ChevronDown className={cn('size-[15.71px] transition-transform', abierto && 'rotate-180')} />
        </button>
      </div>
      </span>
      </span>

      {abierto && (
        <div className="absolute top-full right-0 z-40 mt-1 w-[220px] rounded-lg border border-line bg-white p-1 shadow-floating">
          {['End encounter', 'Discard encounter', 'Encounter settings'].map((t) => (
            <button
              key={t}
              onClick={() => {
                setAbierto(false)
                if (t === 'End encounter') setNota(true)
                else aviso.info(\`\${t} is not available in this release.\`)
              }}
              className="block w-full rounded px-3 py-2 text-left text-[13px] hover:bg-surface-muted"
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
        <Flotante titulo={WORKFLOWS.find((w) => w.id === WORKFLOW_DEL_BADGE[flot.k])!.nombre} ancla={flot.rect} ancho={300} onClose={() => setFlot(null)}>
          <ResumenWorkflow
            k={flot.k}
            progreso={progreso[WORKFLOW_DEL_BADGE[flot.k]]}
            onAbrir={() => { setFlot(null); abrir(WORKFLOW_DEL_BADGE[flot.k]) }}
          />
        </Flotante>
      )}
      <ClinicalNoteDialog open={nota} onClose={() => setNota(false)} />
    </div>
  )
}
`})))()}export{n,i as r,r as t};