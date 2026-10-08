import { createContext, useContext, useState, type ReactNode } from 'react'
import { ArrowUpRight, ChevronRight, Maximize2, Pencil, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { Count } from '@/components/ui/count'
import { Pill, type PillTone } from '@/components/ui/pill'
import { Drawer, DrawerSection } from '@/components/ui/drawer'
import { TARJETA_INTERNA } from '@/lib/estilos'
import { ORDEN_TONO } from '@/components/clinical/LabOrderPanel'
import { CitaVisita, EstadoConsentimiento, SIN_CONSENTIMIENTO_NI_TURNO, TONO_CASO, estadoGrupo } from '@/components/clinical/TreatmentPlanSection'
import { codigoDiagnostico } from '@/components/clinical/dental/data'
import { CASOS, CONSENTIMIENTO, type Caso, type Procedimiento, type Visita } from '@/data/treatment-plan'
import {
  DERIVACIONES_PROBLEMA, VINCULOS_PROCEDIMIENTO,
  type Derivacion, type EstadoDerivacion, type EstadoProblema, type EstadoProcedimiento, type OrdenVinculada, type Pestana,
  type Problema, type ProcedimientoPaciente,
} from '@/data/clinical-mode'

/* El detalle que se despliega en cada fila de la tabla del Overview (Problem List y Procedures), con el mismo desplegable
   del Ledger (`rowDetail` de DataTable): lo que cuelga del registro -caso, visitas y turno, órdenes de laboratorio,
   derivaciones, hallazgos y diagnósticos, consentimiento, examen de origen- en bloques chicos, cada uno con su link a la
   pantalla donde se trabaja. Sólo lectura. Ver design-reference/figma/modulos/clinical-mode.md (2026-10-08). */

export const TONO_PROBLEMA: Record<EstadoProblema, PillTone> = {
  Active: 'success', 'In treatment': 'info', Monitoring: 'warning', Treated: 'neutral', 'Externally treated': 'neutral', Referred: 'purple',
  'No treatment needed': 'neutral', 'Patient declined': 'danger', 'Clinic declined': 'danger', Discarded: 'danger',
}
export const TONO_PROCEDIMIENTO: Record<EstadoProcedimiento, PillTone> = {
  'In progress': 'info', Planned: 'success', Completed: 'neutral', Discontinued: 'warning', Discarded: 'danger', Referred: 'purple',
}
export const TONO_DERIVACION: Record<EstadoDerivacion, PillTone> = {
  Requested: 'purple', Accepted: 'success', Scheduled: 'info', Completed: 'neutral', Declined: 'danger',
}

/* ── Navegación ───────────────────────────────────────────────────── */

/* Adónde lleva un link del detalle: una pestaña de Clinical Mode y, para Treatment Plan, el caso. ClinicalMode lo
   provee; sin provider (Storybook) el link avisa adónde iría. */
export type DestinoClinico = { pestana: Pestana; caso?: string }
export const NavegacionClinica = createContext<((d: DestinoClinico) => void) | null>(null)

function useIr() {
  const ir = useContext(NavegacionClinica)
  return (d: DestinoClinico) => (ir ? ir(d) : aviso.info(`Opens ${d.pestana}.`))
}

/* El examen del problema, con el nombre de su pestaña. */
const PESTANA_EXAMEN: Record<string, Pestana> = {
  Intraoral: 'Intra Oral', Extraoral: 'Extra Oral', Physical: 'Physical', ROS: 'Ros', 'Dental Assessment': 'DentAssmt',
  Periodontal: 'Periodontal', Radiography: 'Radiography',
}

/* ── Datos de cada registro ───────────────────────────────────────── */

type Tratamiento = { caso: Caso; grupo: Caso[]; visita?: Visita; procCaso?: Procedimiento }

function tratamientoDe(pr: ProcedimientoPaciente): Tratamiento | undefined {
  const v = VINCULOS_PROCEDIMIENTO[pr.id]?.caso
  const caso = v && CASOS.find((c) => c.id === v.id)
  if (!caso) return undefined
  /* Las alternativas son los casos del mismo grupo y la misma fecha, como en el rail de Treatment Plan. */
  const grupo = CASOS.filter((c) => c.grupo === caso.grupo && c.creado === caso.creado)
  const visita = caso.visitas.find((vi) => vi.procedimientos.some((p) => p.id === v.procedimiento))
  return { caso, grupo, visita, procCaso: visita?.procedimientos.find((p) => p.id === v.procedimiento) }
}

const vinculadosA = (problema: string, procedimientos: ProcedimientoPaciente[]) =>
  procedimientos.filter((p) => VINCULOS_PROCEDIMIENTO[p.id]?.problemas?.includes(problema))

const pieza = (r: { pieza?: number; superficie: string; ubicacion: string }) =>
  [r.pieza ? `Tooth ${r.pieza}` : r.ubicacion && r.ubicacion !== '-' ? r.ubicacion : '', r.superficie !== '-' ? `Surface ${r.superficie}` : '']
    .filter(Boolean).join(' · ')

/* ── Piezas ───────────────────────────────────────────────────────── */

/** Link a la pantalla donde vive el registro, con la flecha de "sale de acá". */
export function EnlaceRegistro({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="group/link text-dash-blue min-w-0 text-left text-[12px] leading-[1.45] font-medium break-words hover:underline">
      {children}
      <ArrowUpRight aria-hidden className="ml-0.5 inline size-3 align-[-1px] transition-transform group-hover/link:translate-x-px group-hover/link:-translate-y-px" />
    </button>
  )
}

/** Lo que no entra en el resumen: plegado detrás de "N more…", como el "más" de las listas del Figma. */
export function MasItems({ label, children, abierto: inicial = false }: { label: string; children: ReactNode; abierto?: boolean }) {
  const [abierto, setAbierto] = useState(inicial)
  return (
    <div className="mt-1">
      <button
        type="button" aria-expanded={abierto} onClick={() => setAbierto((v) => !v)}
        className="text-dash-blue flex items-center gap-1 py-1 text-[11px] font-semibold hover:underline"
      >
        <ChevronRight aria-hidden className={cn('size-3.5 transition-transform', abierto && 'rotate-90')} /> {label}
      </button>
      {abierto && <div className="pl-[18px]">{children}</div>}
    </div>
  )
}

/** Un dato del bloque: el link (o el texto) con su estado a la derecha y una línea de contexto abajo. */
export function Entrada({ children, estado, sub, rotulo }: { children: ReactNode; estado?: ReactNode; sub?: ReactNode; rotulo?: string }) {
  return (
    <div className="border-t border-line-soft py-2 first:border-t-0 first:pt-0 last:pb-0">
      {rotulo && <p className="mb-0.5 text-[10px] font-medium text-ink-muted">{rotulo}</p>}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">{children}</div>
        {estado && <span className="shrink-0">{estado}</span>}
      </div>
      {sub && <p className="mt-0.5 text-[11px] leading-[1.45] text-ink-muted">{sub}</p>}
    </div>
  )
}

export const Vacio = ({ children }: { children: ReactNode }) => <p className="text-[12px] text-ink-faint">{children}</p>

/** Un bloque del detalle: card adentro de la tabla (InnerCard), con el título y la cuenta. `ancho` lo estira a toda la
    fila con el título al costado: para los bloques de un solo dato (consentimiento, examen de origen). */
export function BloqueDetalle({ titulo, cuenta, ancho, children }: { titulo: string; cuenta?: number; ancho?: boolean; children: ReactNode }) {
  const encabezado = (
    <header className={cn('flex shrink-0 items-center gap-2', !ancho && 'mb-2 justify-between')}>
      <h4 className="text-[11px] font-semibold text-ink-muted">{titulo}</h4>
      {cuenta !== undefined && <Count>{cuenta}</Count>}
    </header>
  )
  return (
    <section className={cn(TARJETA_INTERNA, 'min-w-0 p-3', ancho && 'flex flex-wrap items-center gap-x-4 gap-y-2 @md:col-span-2 @2xl:col-span-3')}>
      {ancho ? <><div className="w-[120px] shrink-0">{encabezado}</div><div className="min-w-0 flex-1 basis-[220px]">{children}</div></> : <>{encabezado}{children}</>}
    </section>
  )
}

/** Subtítulo dentro de un bloque: la segunda lista del bloque Lab order (Referral). */
export function SubtituloBloque({ titulo, cuenta }: { titulo: string; cuenta?: number }) {
  return (
    <header className="mt-3 mb-2 flex items-center justify-between gap-2 border-t border-line-soft pt-3">
      <h4 className="text-[11px] font-semibold text-ink-muted">{titulo}</h4>
      {cuenta !== undefined && <Count>{cuenta}</Count>}
    </header>
  )
}

const pill = (tono: PillTone, texto: string, mayusculas?: boolean) => (
  <Pill tone={tono} size="sm" className={cn('whitespace-nowrap', mayusculas && 'tracking-wide uppercase')}>{texto}</Pill>
)

/* ── Contenido de cada bloque (inline y en el drawer) ─────────────── */

/** El caso de Treatment Plan: estado del grupo, el caso con su estado, las visitas con su turno y los casos históricos
    (las alternativas descartadas del grupo). Sin `visitas`, sólo el caso: es lo que muestra el detalle de un problema. */
export function ContenidoTratamiento({ t, visitas, completo }: { t?: Tratamiento; visitas?: boolean; completo?: boolean }) {
  const ir = useIr()
  if (!t) return <Vacio>No treatment linked.</Vacio>
  const { caso, grupo, visita } = t
  const abrir = (id: string) => ir({ pestana: 'Treatment Plan', caso: id })
  const historicos = grupo.filter((c) => c.id !== caso.id && c.estado === 'Discarded')
  /* Antes de aceptar no hay turno (la misma regla que la visita en Treatment Plan). */
  const conTurno = !SIN_CONSENTIMIENTO_NI_TURNO.includes(caso.estado)
  const filaVisita = (v: Visita, esta?: boolean) => (
    <div key={v.id} className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 py-1">
      <span className="text-[12px] text-ink">
        {v.nombre} · {v.total}{esta && <span className="text-ink-muted"> · this procedure</span>}
      </span>
      {conTurno && <CitaVisita cita={v.cita} />}
    </div>
  )
  const otras = caso.visitas.filter((v) => v.id !== visita?.id)
  const listaHistoricos = historicos.map((c) => (
    <Entrada key={c.id} estado={pill(TONO_CASO[c.estado], c.estado)} sub={`Created ${c.creado}`}>
      <EnlaceRegistro onClick={() => abrir(c.id)}>{c.nombre}</EnlaceRegistro>
    </Entrada>
  ))
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-[11px] text-ink-muted">Group status</span>
        {pill(TONO_CASO[estadoGrupo(grupo)], estadoGrupo(grupo), true)}
      </div>
      <Entrada estado={pill(TONO_CASO[caso.estado], caso.estado)} sub={`${caso.grupo} · Created ${caso.creado}`}>
        <EnlaceRegistro onClick={() => abrir(caso.id)}>{caso.nombre}</EnlaceRegistro>
      </Entrada>
      {visitas && visita && (
        <div className="mt-2 rounded-md bg-surface-subtle px-2.5 py-1.5">
          {filaVisita(visita, true)}
          {otras.length > 0 && (completo
            ? otras.map((v) => filaVisita(v))
            : <MasItems label={`${otras.length} more visit${otras.length > 1 ? 's' : ''}`}>{otras.map((v) => filaVisita(v))}</MasItems>)}
        </div>
      )}
      {historicos.length > 0 && (completo
        ? <div className="mt-2">{listaHistoricos}</div>
        : <MasItems label={`Historical case${historicos.length > 1 ? 's' : ''} · ${historicos.length}`}>{listaHistoricos}</MasItems>)}
    </div>
  )
}

type OrdenConProc = OrdenVinculada & { proc?: ProcedimientoPaciente }
type DerivacionConProc = Derivacion & { proc?: ProcedimientoPaciente }
const relacionado = (p?: ProcedimientoPaciente) => (p ? ` · Related procedure: ${p.codigo} · ${p.nombre}` : '')

export function ContenidoOrdenes({ ordenes }: { ordenes: OrdenConProc[] }) {
  const ir = useIr()
  if (ordenes.length === 0) return <Vacio>No lab orders linked.</Vacio>
  return ordenes.map((o) => (
    <Entrada key={o.id} estado={pill(ORDEN_TONO[o.estado], o.estado)} sub={`Requested ${o.pedida}${relacionado(o.proc)}`}>
      <EnlaceRegistro onClick={() => ir({ pestana: 'Lab Order' })}>{o.laboratorio} · {o.trabajo}</EnlaceRegistro>
    </Entrada>
  ))
}

export function ContenidoDerivaciones({ derivaciones }: { derivaciones: DerivacionConProc[] }) {
  const ir = useIr()
  if (derivaciones.length === 0) return <Vacio>No referrals linked.</Vacio>
  return derivaciones.map((d) => (
    <Entrada key={d.id} estado={pill(TONO_DERIVACION[d.estado], d.estado)} sub={`Requested ${d.pedida}${relacionado(d.proc)}`}>
      <EnlaceRegistro onClick={() => ir({ pestana: 'Referral' })}>{d.a} · {d.especialidad}</EnlaceRegistro>
    </Entrada>
  ))
}

/** Los hallazgos que resuelve el procedimiento y su diagnóstico (ICD-10 y superficie, como Link to diagnosis). En el
    resumen va el primero y el resto se pliega. */
export function ContenidoHallazgos({ hallazgos, onAbrir, completo }: { hallazgos: Problema[]; onAbrir: (p: Problema) => void; completo?: boolean }) {
  if (hallazgos.length === 0) return <Vacio>No findings or diagnoses linked.</Vacio>
  const items = [
    ...hallazgos.map((h) => (
      <Entrada key={h.id} rotulo="Finding" estado={pill(TONO_PROBLEMA[h.estado], h.estado)} sub={`${h.examen} · ${h.fecha}`}>
        <EnlaceRegistro onClick={() => onAbrir(h)}>{[h.condicion, pieza(h)].filter(Boolean).join(' · ')}</EnlaceRegistro>
      </Entrada>
    )),
    ...hallazgos.map((h) => (
      <Entrada key={`dx-${h.id}`} rotulo="Diagnosis">
        <span className="text-[12px] text-ink">{codigoDiagnostico(h.condicion)} · {h.condicion}{h.superficie !== '-' && ` · ${h.superficie}`}</span>
      </Entrada>
    )),
  ]
  if (completo || items.length === 1) return items
  const resto = items.length - 1
  return <>{items[0]}<MasItems label={`${resto} more finding${resto > 1 ? 's' : ''} / diagnos${resto > 1 ? 'es' : 'is'}`}>{items.slice(1)}</MasItems></>
}

/** El consentimiento del procedimiento: el documento del caso y el estado de este procedimiento. */
export function ContenidoConsentimiento({ t }: { t?: Tratamiento }) {
  const ir = useIr()
  if (!t?.procCaso?.consentimiento) return <Vacio>No consent document.</Vacio>
  if (SIN_CONSENTIMIENTO_NI_TURNO.includes(t.caso.estado)) return <Vacio>The consent is generated when the case is accepted.</Vacio>
  const estado = t.procCaso.consentimiento
  const enviado = CONSENTIMIENTO.historial.find((h) => h.evento === 'Sent to patient')?.fecha
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
      <span className="min-w-0">
        <EnlaceRegistro onClick={() => ir({ pestana: 'Treatment Plan', caso: t.caso.id })}>{CONSENTIMIENTO.titulo}</EnlaceRegistro>
        {estado !== 'Not sent' && enviado && <span className="text-[11px] text-ink-muted"> · Sent {enviado}</span>}
      </span>
      <EstadoConsentimiento estado={estado} />
    </div>
  )
}

export function ContenidoProcedimientos({ procedimientos, onAbrir }: { procedimientos: ProcedimientoPaciente[]; onAbrir: (p: ProcedimientoPaciente) => void }) {
  if (procedimientos.length === 0) return <Vacio>No procedures linked.</Vacio>
  return procedimientos.map((p) => (
    <Entrada key={p.id} estado={pill(TONO_PROCEDIMIENTO[p.estado], p.estado)} sub={[pieza(p), p.fecha].filter(Boolean).join(' · ')}>
      <EnlaceRegistro onClick={() => onAbrir(p)}>{p.codigo} · {p.nombre}</EnlaceRegistro>
    </Entrada>
  ))
}

export function ContenidoExamen({ problema }: { problema: Problema }) {
  const ir = useIr()
  const pestana = PESTANA_EXAMEN[problema.examen]
  return (
    <span className="flex flex-wrap items-baseline gap-x-2">
      {pestana
        ? <EnlaceRegistro onClick={() => ir({ pestana })}>{problema.examen}</EnlaceRegistro>
        : <span className="text-[12px] text-ink">{problema.examen}</span>}
      <span className="text-[11px] text-ink-muted">Charted {problema.fecha} · {problema.proveedor}</span>
    </span>
  )
}

/* ── El detalle de la fila ────────────────────────────────────────── */

type Registro =
  | { tipo: 'procedimiento'; r: ProcedimientoPaciente }
  | { tipo: 'problema'; r: Problema }

/* Lo que el detalle necesita de la tabla: las listas al día (un estado cambiado desde el menú se ve en el detalle) y
   cómo abrir un registro de la otra pestaña. */
export type ContextoDetalle = {
  problemas: Problema[]
  procedimientos: ProcedimientoPaciente[]
  onAbrirProblema: (p: Problema) => void
  onAbrirProcedimiento: (p: ProcedimientoPaciente) => void
}

function datosProcedimiento(r: ProcedimientoPaciente, c: ContextoDetalle) {
  const v = VINCULOS_PROCEDIMIENTO[r.id]
  return {
    t: tratamientoDe(r),
    ordenes: v?.ordenes ?? [],
    derivaciones: v?.derivaciones ?? [],
    hallazgos: c.problemas.filter((p) => v?.problemas?.includes(p.id)),
  }
}

function datosProblema(r: Problema, c: ContextoDetalle) {
  const procs = vinculadosA(r.id, c.procedimientos)
  return {
    procs,
    t: procs.map(tratamientoDe).find(Boolean),
    ordenes: procs.flatMap((p) => (VINCULOS_PROCEDIMIENTO[p.id]?.ordenes ?? []).map((o) => ({ ...o, proc: p }))),
    derivaciones: [
      ...(DERIVACIONES_PROBLEMA[r.id] ?? []),
      ...procs.flatMap((p) => (VINCULOS_PROCEDIMIENTO[p.id]?.derivaciones ?? []).map((d) => ({ ...d, proc: p }))),
    ],
  }
}

const guion = (t: string) => (!t || t === '-' ? '—' : t)
const nombreDe = (x: Registro) => (x.tipo === 'procedimiento' ? `${x.r.codigo} · ${x.r.nombre}` : x.r.condicion)

/** El detalle desplegado de una fila: título completo, los bloques y el pie con View full record. */
export function DetalleRegistro({ registro, contexto }: { registro: Registro; contexto: ContextoDetalle }) {
  const [completo, setCompleto] = useState(false)
  const lugar = pieza(registro.r)
  return (
    <div className="@container">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
        <h3 className="text-[13px] font-semibold text-ink">{nombreDe(registro)}</h3>
        {lugar && <span className="text-[11px] text-ink-muted">{lugar}</span>}
      </div>
      <div className="grid gap-2.5 @md:grid-cols-2 @2xl:grid-cols-3">
        {registro.tipo === 'procedimiento' ? <BloquesProcedimiento r={registro.r} c={contexto} /> : <BloquesProblema r={registro.r} c={contexto} />}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <button type="button" onClick={() => setCompleto(true)} className="text-dash-blue inline-flex items-center gap-1.5 text-[12px] font-semibold hover:underline">
          <Maximize2 className="size-3.5" /> View full record
        </button>
        <span className="text-[11px] text-ink-faint">Read-only summary</span>
      </div>
      <RegistroCompletoDrawer registro={completo ? registro : null} contexto={contexto} onClose={() => setCompleto(false)} />
    </div>
  )
}

export function BloquesProcedimiento({ r, c }: { r: ProcedimientoPaciente; c: ContextoDetalle }) {
  const d = datosProcedimiento(r, c)
  return (
    <>
      <BloqueDetalle titulo="Treatment"><ContenidoTratamiento t={d.t} visitas /></BloqueDetalle>
      <BloqueDetalle titulo="Lab order" cuenta={d.ordenes.length}>
        <ContenidoOrdenes ordenes={d.ordenes} />
        <SubtituloBloque titulo="Referral" cuenta={d.derivaciones.length} />
        <ContenidoDerivaciones derivaciones={d.derivaciones} />
      </BloqueDetalle>
      <BloqueDetalle titulo="Findings / diagnoses" cuenta={d.hallazgos.length * 2}>
        <ContenidoHallazgos hallazgos={d.hallazgos} onAbrir={c.onAbrirProblema} />
      </BloqueDetalle>
      <BloqueDetalle titulo="Procedure consent" ancho><ContenidoConsentimiento t={d.t} /></BloqueDetalle>
    </>
  )
}

export function BloquesProblema({ r, c }: { r: Problema; c: ContextoDetalle }) {
  const d = datosProblema(r, c)
  return (
    <>
      <BloqueDetalle titulo="Procedures" cuenta={d.procs.length}>
        <ContenidoProcedimientos procedimientos={d.procs} onAbrir={c.onAbrirProcedimiento} />
      </BloqueDetalle>
      <BloqueDetalle titulo="Treatment"><ContenidoTratamiento t={d.t} /></BloqueDetalle>
      <BloqueDetalle titulo="Lab order" cuenta={d.ordenes.length}>
        <ContenidoOrdenes ordenes={d.ordenes} />
        <SubtituloBloque titulo="Referral" cuenta={d.derivaciones.length} />
        <ContenidoDerivaciones derivaciones={d.derivaciones} />
      </BloqueDetalle>
      <BloqueDetalle titulo="Source exam" ancho><ContenidoExamen problema={r} /></BloqueDetalle>
    </>
  )
}

/* ── View full record ─────────────────────────────────────────────── */

/** El registro entero en un drawer de sólo lectura: los datos de la fila de a dos y cada bloque como sección, sin
    nada plegado. Pie: Close y Edit (Edit avisa que no está en esta versión, como el menú de la fila). */
export function RegistroCompletoDrawer({ registro, contexto, onClose }: { registro: Registro | null; contexto: ContextoDetalle; onClose: () => void }) {
  const ir = useContext(NavegacionClinica)
  if (!registro) return null
  const { r } = registro
  const esProc = registro.tipo === 'procedimiento'
  const campos: [string, ReactNode][] = [
    ['Date', r.fecha], ['Location', guion(r.ubicacion)], ['Tooth', r.pieza ?? '—'], ['Surface', guion(r.superficie)],
    ['Provider', r.proveedor], ['Status', pill(esProc ? TONO_PROCEDIMIENTO[registro.r.estado] : TONO_PROBLEMA[registro.r.estado], r.estado, true)],
    ...(!esProc ? [['Exam', registro.r.examen] as [string, ReactNode]] : []),
  ]
  /* Al abrir otro registro o ir a otra pantalla, el drawer se cierra. */
  const cerrarY = <T,>(f: (x: T) => void) => (x: T) => { onClose(); f(x) }
  const ctx = { ...contexto, onAbrirProblema: cerrarY(contexto.onAbrirProblema), onAbrirProcedimiento: cerrarY(contexto.onAbrirProcedimiento) }
  return (
    <NavegacionClinica.Provider value={ir ? cerrarY(ir) : null}>
      <Drawer
        open onClose={onClose} size="lg" title={nombreDe(registro)} description={esProc ? 'Procedure · Read-only summary' : 'Problem · Read-only summary'}
        footer={<>
          <Button variant="secondary" onClick={onClose}><X /> Close</Button>
          <Button onClick={() => aviso.info('Editing is not available in this release.')}><Pencil /> Edit</Button>
        </>}
      >
        <div className="flex flex-col gap-6">
          <DrawerSection title="Record">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
              {campos.map(([label, valor]) => (
                <div key={label}>
                  <dt className="text-[11px] font-medium text-ink-muted">{label}</dt>
                  <dd className="mt-0.5 text-[13px] break-words text-ink">{valor}</dd>
                </div>
              ))}
              <div className="col-span-2">
                <dt className="text-[11px] font-medium text-ink-muted">Note</dt>
                <dd className="mt-0.5 text-[13px] text-ink">{r.nota ?? '—'}</dd>
              </div>
            </dl>
          </DrawerSection>
          {esProc ? <SeccionesProcedimiento r={registro.r} c={ctx} /> : <SeccionesProblema r={registro.r} c={ctx} />}
        </div>
      </Drawer>
    </NavegacionClinica.Provider>
  )
}

export function SeccionesProcedimiento({ r, c }: { r: ProcedimientoPaciente; c: ContextoDetalle }) {
  const d = datosProcedimiento(r, c)
  return (
    <>
      <DrawerSection title="Treatment"><ContenidoTratamiento t={d.t} visitas completo /></DrawerSection>
      <DrawerSection title="Lab orders"><div><ContenidoOrdenes ordenes={d.ordenes} /></div></DrawerSection>
      <DrawerSection title="Referrals"><div><ContenidoDerivaciones derivaciones={d.derivaciones} /></div></DrawerSection>
      <DrawerSection title="Findings / diagnoses"><div><ContenidoHallazgos hallazgos={d.hallazgos} onAbrir={c.onAbrirProblema} completo /></div></DrawerSection>
      <DrawerSection title="Procedure consent"><ContenidoConsentimiento t={d.t} /></DrawerSection>
    </>
  )
}

export function SeccionesProblema({ r, c }: { r: Problema; c: ContextoDetalle }) {
  const d = datosProblema(r, c)
  return (
    <>
      <DrawerSection title="Source exam"><ContenidoExamen problema={r} /></DrawerSection>
      <DrawerSection title="Procedures"><div><ContenidoProcedimientos procedimientos={d.procs} onAbrir={c.onAbrirProcedimiento} /></div></DrawerSection>
      <DrawerSection title="Treatment"><ContenidoTratamiento t={d.t} completo /></DrawerSection>
      <DrawerSection title="Lab orders"><div><ContenidoOrdenes ordenes={d.ordenes} /></div></DrawerSection>
      <DrawerSection title="Referrals"><div><ContenidoDerivaciones derivaciones={d.derivaciones} /></div></DrawerSection>
    </>
  )
}
