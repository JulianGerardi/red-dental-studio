import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { createContext, useContext, useState, type ReactNode } from 'react'
import { Pencil, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { EnlaceRegistro, Entrada, FilaDetalle, ListaDetalle, MasItems, NotaDetalle, Vacio, VerRegistroCompleto } from '@/components/ui/detail-list'
import { LedgerRowModal } from '@/components/patients/ledger/LedgerRowDetail'
import {
  APLICACIONES, MOVIMIENTOS, SEDE_PRINCIPAL, aplicadoA, fechaCorta, moneda, pendienteDe, sedeDe, totalAplicado,
  type Aplicacion, type Movimiento,
} from '@/data/ledger'
import { Pill, type PillTone } from '@/components/ui/pill'
import { Drawer, DrawerSection } from '@/components/ui/drawer'
import { ORDEN_TONO } from '@/components/clinical/LabOrderPanel'
import { CitaVisita, EstadoConsentimiento, SIN_CONSENTIMIENTO_NI_TURNO, TONO_CASO, estadoGrupo } from '@/components/clinical/TreatmentPlanSection'
import { codigoDiagnostico, type Finding, type FindingStatus } from '@/components/clinical/dental/data'
import { CASOS, CONSENTIMIENTO, type Caso, type Procedimiento, type Visita } from '@/data/treatment-plan'
import {
  DERIVACIONES_PROBLEMA, PROBLEMAS, PROCEDIMIENTOS, VINCULOS_PROCEDIMIENTO,
  type Derivacion, type EstadoDerivacion, type EstadoProblema, type EstadoProcedimiento, type OrdenVinculada, type Pestana,
  type Problema, type ProcedimientoPaciente,
} from '@/data/clinical-mode'

/* El detalle que se despliega en cada fila de la tabla del Overview (Problem List y Procedures), con el mismo desplegable
   del Ledger (\`rowDetail\` de DataTable): lo que cuelga del registro -caso, visitas y turno, órdenes de laboratorio,
   derivaciones, hallazgos y diagnósticos, consentimiento, examen de origen- en una lista de filas, una debajo de la otra
   y sin cards, cada dato con su link a la pantalla donde se trabaja. Sólo lectura. Ver
   design-reference/figma/modulos/clinical-mode.md (2026-10-08). */

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
  return (d: DestinoClinico) => (ir ? ir(d) : aviso.info(\`Opens \${d.pestana}.\`))
}

/* El examen del problema, con el nombre de su pestaña. */
const PESTANA_EXAMEN: Record<string, Pestana> = {
  Intraoral: 'Intra Oral', Extraoral: 'Extra Oral', Physical: 'Physical', ROS: 'Ros', 'Dental Assessment': 'DentAssmt',
  Periodontal: 'Periodontal', Radiography: 'Radiography',
}

/** El nombre del examen como lo escribe la Problem List, desde su pestaña (DentAssmt → Dental Assessment). */
export const examenDePestana = (p: string) => Object.keys(PESTANA_EXAMEN).find((e) => PESTANA_EXAMEN[e] === p) ?? p

/* ── Datos de cada registro ───────────────────────────────────────── */

export type Tratamiento = { caso: Caso; grupo: Caso[]; visita?: Visita; procCaso?: Procedimiento }

export function tratamientoDe(pr: ProcedimientoPaciente): Tratamiento | undefined {
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
  [r.pieza ? \`Tooth \${r.pieza}\` : r.ubicacion && r.ubicacion !== '-' ? r.ubicacion : '', r.superficie !== '-' ? \`Surface \${r.superficie}\` : '']
    .filter(Boolean).join(' · ')

/* ── Piezas ───────────────────────────────────────────────────────── */

/* La lista (filas, entradas, links, "more") es ui/detail-list, la misma del detalle del Ledger. */
const pill = (tono: PillTone, texto: string, mayusculas?: boolean) => (
  <Pill tone={tono} size="sm" className={cn('whitespace-nowrap', mayusculas && 'tracking-wide uppercase')}>{texto}</Pill>
)

/* ── Contenido de cada fila (en la lista y en el drawer) ──────────── */

/** El caso de Treatment Plan: estado del grupo, el caso con su estado, las visitas con su turno y los casos históricos
    (las alternativas descartadas del grupo). Sin \`visitas\`, sólo el caso: es lo que muestra el detalle de un problema. */
export function ContenidoTratamiento({ t, visitas, completo }: { t?: Tratamiento; visitas?: boolean; completo?: boolean }) {
  const ir = useIr()
  if (!t) return <Vacio>No treatment linked.</Vacio>
  const { caso, grupo, visita } = t
  const abrir = (id: string) => ir({ pestana: 'Treatment Plan', caso: id })
  const historicos = grupo.filter((c) => c.id !== caso.id && c.estado === 'Discarded')
  /* Antes de aceptar no hay turno (la misma regla que la visita en Treatment Plan). */
  const conTurno = !SIN_CONSENTIMIENTO_NI_TURNO.includes(caso.estado)
  const filaVisita = (v: Visita, esta?: boolean) => (
    <Entrada key={v.id} estado={conTurno && <CitaVisita cita={v.cita} />}>
      <span className="text-[12px] text-ink">{v.nombre} · {v.total}{esta && <span className="text-ink-muted"> · this procedure</span>}</span>
    </Entrada>
  )
  const otras = caso.visitas.filter((v) => v.id !== visita?.id)
  const listaHistoricos = historicos.map((c) => (
    <Entrada key={c.id} estado={pill(TONO_CASO[c.estado], c.estado)} sub={\`Created \${c.creado}\`}>
      <EnlaceRegistro onClick={() => abrir(c.id)}>{c.nombre}</EnlaceRegistro>
    </Entrada>
  ))
  return (
    <div>
      <Entrada
        estado={pill(TONO_CASO[caso.estado], caso.estado)}
        sub={<>{caso.grupo} · Created {caso.creado} · Group status {pill(TONO_CASO[estadoGrupo(grupo)], estadoGrupo(grupo), true)}</>}
      >
        <EnlaceRegistro onClick={() => abrir(caso.id)}>{caso.nombre}</EnlaceRegistro>
      </Entrada>
      {visitas && visita && filaVisita(visita, true)}
      {visitas && otras.length > 0 && (completo
        ? otras.map((v) => filaVisita(v))
        : <MasItems label={\`\${otras.length} more visit\${otras.length > 1 ? 's' : ''}\`}>{otras.map((v) => filaVisita(v))}</MasItems>)}
      {historicos.length > 0 && (completo
        ? listaHistoricos
        : <MasItems label={\`Historical case\${historicos.length > 1 ? 's' : ''} · \${historicos.length}\`}>{listaHistoricos}</MasItems>)}
    </div>
  )
}

type OrdenConProc = OrdenVinculada & { proc?: ProcedimientoPaciente }
type DerivacionConProc = Derivacion & { proc?: ProcedimientoPaciente }
const relacionado = (p?: ProcedimientoPaciente) => (p ? \` · Related procedure: \${p.codigo} · \${p.nombre}\` : '')

export function ContenidoOrdenes({ ordenes }: { ordenes: OrdenConProc[] }) {
  const ir = useIr()
  if (ordenes.length === 0) return <Vacio>No lab orders linked.</Vacio>
  return ordenes.map((o) => (
    <Entrada key={o.id} estado={pill(ORDEN_TONO[o.estado], o.estado)} sub={\`Requested \${o.pedida}\${relacionado(o.proc)}\`}>
      <EnlaceRegistro onClick={() => ir({ pestana: 'Lab Order' })}>{o.laboratorio} · {o.trabajo}</EnlaceRegistro>
    </Entrada>
  ))
}

export function ContenidoDerivaciones({ derivaciones }: { derivaciones: DerivacionConProc[] }) {
  const ir = useIr()
  if (derivaciones.length === 0) return <Vacio>No referrals linked.</Vacio>
  return derivaciones.map((d) => (
    <Entrada key={d.id} estado={pill(TONO_DERIVACION[d.estado], d.estado)} sub={\`Requested \${d.pedida}\${relacionado(d.proc)}\`}>
      <EnlaceRegistro onClick={() => ir({ pestana: 'Referral' })}>{d.a} · {d.especialidad}</EnlaceRegistro>
    </Entrada>
  ))
}

/** Los hallazgos que resuelve el procedimiento y su diagnóstico (ICD-10 y superficie, como Link to diagnosis). En el
    resumen van los dos primeros y el resto se pliega. */
export function ContenidoHallazgos({ hallazgos, onAbrir, completo }: { hallazgos: Problema[]; onAbrir: (p: Problema) => void; completo?: boolean }) {
  if (hallazgos.length === 0) return <Vacio>No findings or diagnoses linked.</Vacio>
  const items = [
    ...hallazgos.map((h) => (
      <Entrada key={h.id} rotulo="Finding" estado={pill(TONO_PROBLEMA[h.estado], h.estado)} sub={\`\${h.examen} · \${h.fecha}\`}>
        <EnlaceRegistro onClick={() => onAbrir(h)}>{[h.condicion, pieza(h)].filter(Boolean).join(' · ')}</EnlaceRegistro>
      </Entrada>
    )),
    ...hallazgos.map((h) => (
      <Entrada key={\`dx-\${h.id}\`} rotulo="Diagnosis">
        <span className="text-[12px] text-ink">{codigoDiagnostico(h.condicion)} · {h.condicion}{h.superficie !== '-' && \` · \${h.superficie}\`}</span>
      </Entrada>
    )),
  ]
  if (completo || items.length <= 2) return items
  const resto = items.length - 2
  return <>{items.slice(0, 2)}<MasItems label={\`\${resto} more finding\${resto > 1 ? 's' : ''} / diagnos\${resto > 1 ? 'es' : 'is'}\`}>{items.slice(2)}</MasItems></>
}

/** El consentimiento del procedimiento: el documento del caso y el estado de este procedimiento. */
export function ContenidoConsentimiento({ t }: { t?: Tratamiento }) {
  const ir = useIr()
  if (!t?.procCaso?.consentimiento) return <Vacio>No consent document.</Vacio>
  if (SIN_CONSENTIMIENTO_NI_TURNO.includes(t.caso.estado)) return <Vacio>The consent is generated when the case is accepted.</Vacio>
  const estado = t.procCaso.consentimiento
  const enviado = CONSENTIMIENTO.historial.find((h) => h.evento === 'Sent to patient')?.fecha
  return (
    <Entrada estado={<EstadoConsentimiento estado={estado} />} sub={estado !== 'Not sent' && enviado && \`Sent \${enviado}\`}>
      <EnlaceRegistro onClick={() => ir({ pestana: 'Treatment Plan', caso: t.caso.id })}>{CONSENTIMIENTO.titulo}</EnlaceRegistro>
    </Entrada>
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
  if (!problema.examen) return <Vacio>No source exam recorded.</Vacio>
  const pestana = PESTANA_EXAMEN[problema.examen]
  return (
    <Entrada sub={\`Charted \${problema.fecha} · \${problema.proveedor}\`}>
      {pestana
        ? <EnlaceRegistro onClick={() => ir({ pestana })}>{problema.examen}</EnlaceRegistro>
        : <span className="text-[12px] text-ink">{problema.examen}</span>}
    </Entrada>
  )
}

/* ── Lo que se cobró (el cargo del Ledger) ─────────────────────────

   Julián (2026-10-13, prototipo "Expanded transaction detail"): el procedimiento también dice dónde se hizo, cuánto
   se cobró, cuánto se pagó y con qué. Sale del cargo del Ledger que lo cobra (\`procedimiento\` en data/ledger). */

export const cargoDe = (pr: ProcedimientoPaciente) => MOVIMIENTOS.find((m) => m.procedimiento === pr.id && m.monto > 0)

const aplicadasA = (cargo?: Movimiento) =>
  cargo ? aplicadoA(cargo.id, APLICACIONES)
    .map((a) => ({ a, otra: MOVIMIENTOS.find((m) => m.id === a.origen) }))
    .filter((f): f is { a: Aplicacion; otra: Movimiento } => !!f.otra) : []

const etiquetaTipo = (m: Movimiento) =>
  m.tipo === 'Insurance' ? 'Insurance Payment' : m.tipo === 'Payment' ? 'Patient Payment' : m.monto < 0 ? 'Credit Adjustment' : 'Charge Adjustment'

/** Un número de Financial details; el que falta pagar va destacado. El monto va abajo: si un rótulo se parte, los
    números siguen alineados. */
export function Metrica({ label, valor, destacado }: { label: string; valor: number; destacado?: boolean }) {
  return (
    <div className="flex min-w-0 flex-col">
      <dt className="text-[11px] text-ink-muted">{label}</dt>
      <dd className={cn('mt-auto pt-1 text-[15px] tabular-nums', destacado ? 'text-dash-blue font-semibold' : 'font-medium text-ink')}>{moneda(valor)}</dd>
    </div>
  )
}

export function ContenidoSede({ cargo }: { cargo?: Movimiento }) {
  return <Entrada><span className="text-[12px] text-ink">{cargo ? sedeDe(cargo) : SEDE_PRINCIPAL}</span></Entrada>
}

/** Cargo original, lo pagado por el seguro, pagos y ajustes aplicados y lo que falta: el saldo de este cargo. */
export function ContenidoFinanzas({ cargo }: { cargo?: Movimiento }) {
  if (!cargo) return <Vacio>Not charged yet.</Vacio>
  const filas = aplicadasA(cargo)
  const deTipo = (t: Movimiento['tipo']) => totalAplicado(filas.filter((f) => f.otra.tipo === t).map((f) => f.a))
  return (
    <>
      <dl className="grid grid-cols-[repeat(auto-fit,minmax(112px,1fr))] gap-x-6 gap-y-3 py-0.5">
        <Metrica label="Original charge" valor={cargo.monto} />
        <Metrica label="Insurance paid" valor={deTipo('Insurance')} />
        <Metrica label="Payments applied" valor={deTipo('Payment')} />
        <Metrica label="Credit adjustments applied" valor={deTipo('Adjustment')} />
        <Metrica label="Outstanding balance" valor={pendienteDe(cargo, APLICACIONES)} destacado />
      </dl>
      <NotaDetalle>Balance of this charge only, not the patient or guarantor balance.</NotaDetalle>
    </>
  )
}

/** Qué pago, ajuste o pago del seguro se aplicó al cargo, cuándo y cuánto. La referencia abre esa transacción (el mismo
    registro de sólo lectura del Ledger). */
export function ContenidoAplicadas({ cargo }: { cargo?: Movimiento }) {
  const [viendo, setViendo] = useState<Movimiento | null>(null)
  if (!cargo) return <Vacio>Not charged yet.</Vacio>
  const filas = aplicadasA(cargo)
  if (filas.length === 0) return <Vacio>Nothing applied to this charge yet.</Vacio>
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[12px]">
          <thead className="text-[11px] text-ink-muted">
            <tr>
              <th className="py-1.5 pr-3 font-medium">Date applied</th>
              <th className="py-1.5 pr-3 font-medium">Type</th>
              <th className="py-1.5 pr-3 font-medium">Reference / description</th>
              <th className="py-1.5 text-right font-medium">Applied amount</th>
            </tr>
          </thead>
          <tbody>
            {filas.map(({ a, otra }) => (
              <tr key={a.id} className="border-t border-line-soft">
                <td className="py-2 pr-3 whitespace-nowrap text-ink">{fechaCorta(a.fecha)}</td>
                <td className="py-2 pr-3 text-ink">{etiquetaTipo(otra)}</td>
                <td className="py-2 pr-3"><EnlaceRegistro onClick={() => setViendo(otra)}>{otra.descripcion}</EnlaceRegistro></td>
                <td className="py-2 text-right font-medium whitespace-nowrap text-ink tabular-nums">{moneda(a.monto)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NotaDetalle>Only the part applied to this charge, not the full amount of each transaction.</NotaDetalle>
      {viendo && <LedgerRowModal m={viendo} onClose={() => setViendo(null)} />}
    </>
  )
}

/* ── El detalle de la fila ────────────────────────────────────────── */

/* \`plan\`: el procedimiento se abre desde Treatment Plan, y su caso es el que se está viendo (sin caso, es suelto).
   \`descriptor\`: el hallazgo viene del panel de Findings de un examen, que lo lleva. */
type Plan = { t?: Tratamiento }
export type Registro =
  | { tipo: 'procedimiento'; r: ProcedimientoPaciente; plan?: Plan }
  | { tipo: 'problema'; r: Problema; descriptor?: string }

/* Lo que el detalle necesita de la tabla: las listas al día (un estado cambiado desde el menú se ve en el detalle) y
   cómo abrir un registro de la otra pestaña. */
export type ContextoDetalle = {
  problemas: Problema[]
  procedimientos: ProcedimientoPaciente[]
  onAbrirProblema: (p: Problema) => void
  onAbrirProcedimiento: (p: ProcedimientoPaciente) => void
}

function datosProcedimiento(r: ProcedimientoPaciente, c: ContextoDetalle, plan?: Plan) {
  const v = VINCULOS_PROCEDIMIENTO[r.id]
  return {
    t: plan ? plan.t : tratamientoDe(r),
    ordenes: v?.ordenes ?? [],
    derivaciones: v?.derivaciones ?? [],
    hallazgos: c.problemas.filter((p) => v?.problemas?.includes(p.id)),
    cargo: cargoDe(r),
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
const nombreDe = (x: Registro) => (x.tipo === 'procedimiento' ? \`\${x.r.codigo} · \${x.r.nombre}\` : x.r.condicion)

/** El detalle desplegado de una fila: título completo, la lista y el pie con View full record. */
export function DetalleRegistro({ registro, contexto }: { registro: Registro; contexto: ContextoDetalle }) {
  const [completo, setCompleto] = useState(false)
  const lugar = pieza(registro.r)
  return (
    <>
      <ListaDetalle titulo={nombreDe(registro)} lado={lugar} pie={<VerRegistroCompleto onClick={() => setCompleto(true)} />}>
        {registro.tipo === 'procedimiento' ? <FilasProcedimiento r={registro.r} c={contexto} plan={registro.plan} /> : <FilasProblema r={registro.r} c={contexto} />}
      </ListaDetalle>
      <RegistroCompletoDrawer registro={completo ? registro : null} contexto={contexto} onClose={() => setCompleto(false)} />
    </>
  )
}

/* El orden va por importancia (Julián, 2026-10-13): procedimiento Treatment, consentimiento, hallazgos, Referral y
   Lab order, y después lo del cobro (sede, plata y aplicaciones); problema Procedures, Treatment, Referral, Lab order y
   Source exam. Ver clinical-mode.md. */
export function FilasProcedimiento({ r, c, plan }: { r: ProcedimientoPaciente; c: ContextoDetalle; plan?: Plan }) {
  const d = datosProcedimiento(r, c, plan)
  return (
    <>
      <FilaDetalle titulo="Treatment"><ContenidoTratamiento t={d.t} visitas /></FilaDetalle>
      <FilaDetalle titulo="Procedure consent"><ContenidoConsentimiento t={d.t} /></FilaDetalle>
      <FilaDetalle titulo="Findings / diagnoses" cuenta={d.hallazgos.length * 2}>
        <ContenidoHallazgos hallazgos={d.hallazgos} onAbrir={c.onAbrirProblema} />
      </FilaDetalle>
      <FilaDetalle titulo="Referral" cuenta={d.derivaciones.length}><ContenidoDerivaciones derivaciones={d.derivaciones} /></FilaDetalle>
      <FilaDetalle titulo="Lab order" cuenta={d.ordenes.length}><ContenidoOrdenes ordenes={d.ordenes} /></FilaDetalle>
      <FilaDetalle titulo="Clinic location"><ContenidoSede cargo={d.cargo} /></FilaDetalle>
      <FilaDetalle titulo="Financial details"><ContenidoFinanzas cargo={d.cargo} /></FilaDetalle>
      <FilaDetalle titulo="Applied transactions" cuenta={aplicadasA(d.cargo).length}><ContenidoAplicadas cargo={d.cargo} /></FilaDetalle>
    </>
  )
}

export function FilasProblema({ r, c }: { r: Problema; c: ContextoDetalle }) {
  const d = datosProblema(r, c)
  return (
    <>
      <FilaDetalle titulo="Procedures" cuenta={d.procs.length}>
        <ContenidoProcedimientos procedimientos={d.procs} onAbrir={c.onAbrirProcedimiento} />
      </FilaDetalle>
      <FilaDetalle titulo="Treatment"><ContenidoTratamiento t={d.t} /></FilaDetalle>
      <FilaDetalle titulo="Referral" cuenta={d.derivaciones.length}><ContenidoDerivaciones derivaciones={d.derivaciones} /></FilaDetalle>
      <FilaDetalle titulo="Lab order" cuenta={d.ordenes.length}><ContenidoOrdenes ordenes={d.ordenes} /></FilaDetalle>
      <FilaDetalle titulo="Source exam"><ContenidoExamen problema={r} /></FilaDetalle>
    </>
  )
}

/* ── View full record ─────────────────────────────────────────────── */

/** El registro entero en un drawer de sólo lectura: los datos de la fila de a dos y cada fila de la lista como sección,
    sin nada plegado. Pie: Close y Edit (Edit avisa que no está en esta versión, como el menú de la fila). */
export function RegistroCompletoDrawer({ registro, contexto, onClose }: { registro: Registro | null; contexto: ContextoDetalle; onClose: () => void }) {
  const ir = useContext(NavegacionClinica)
  if (!registro) return null
  const { r } = registro
  const esProc = registro.tipo === 'procedimiento'
  const campos: [string, ReactNode][] = [
    ['Date', r.fecha], ['Location', guion(r.ubicacion)], ['Tooth', r.pieza ?? '—'], ['Surface', guion(r.superficie)],
    ['Provider', r.proveedor], ['Status', pill(esProc ? TONO_PROCEDIMIENTO[registro.r.estado] : TONO_PROBLEMA[registro.r.estado], r.estado, true)],
    ...(!esProc ? [['Exam', guion(registro.r.examen)] as [string, ReactNode]] : []),
    ...(!esProc && registro.descriptor ? [['Descriptors', registro.descriptor] as [string, ReactNode]] : []),
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
          {esProc ? <SeccionesProcedimiento r={registro.r} c={ctx} plan={registro.plan} /> : <SeccionesProblema r={registro.r} c={ctx} />}
        </div>
      </Drawer>
    </NavegacionClinica.Provider>
  )
}

export function SeccionesProcedimiento({ r, c, plan }: { r: ProcedimientoPaciente; c: ContextoDetalle; plan?: Plan }) {
  const d = datosProcedimiento(r, c, plan)
  return (
    <>
      <DrawerSection title="Treatment"><ContenidoTratamiento t={d.t} visitas completo /></DrawerSection>
      <DrawerSection title="Procedure consent"><ContenidoConsentimiento t={d.t} /></DrawerSection>
      <DrawerSection title="Findings / diagnoses"><div><ContenidoHallazgos hallazgos={d.hallazgos} onAbrir={c.onAbrirProblema} completo /></div></DrawerSection>
      <DrawerSection title="Referrals"><div><ContenidoDerivaciones derivaciones={d.derivaciones} /></div></DrawerSection>
      <DrawerSection title="Lab orders"><div><ContenidoOrdenes ordenes={d.ordenes} /></div></DrawerSection>
      <DrawerSection title="Clinic location"><ContenidoSede cargo={d.cargo} /></DrawerSection>
      <DrawerSection title="Financial details"><div><ContenidoFinanzas cargo={d.cargo} /></div></DrawerSection>
      <DrawerSection title="Applied transactions"><div><ContenidoAplicadas cargo={d.cargo} /></div></DrawerSection>
    </>
  )
}

export function SeccionesProblema({ r, c }: { r: Problema; c: ContextoDetalle }) {
  const d = datosProblema(r, c)
  return (
    <>
      <DrawerSection title="Procedures"><div><ContenidoProcedimientos procedimientos={d.procs} onAbrir={c.onAbrirProcedimiento} /></div></DrawerSection>
      <DrawerSection title="Treatment"><ContenidoTratamiento t={d.t} completo /></DrawerSection>
      <DrawerSection title="Referrals"><div><ContenidoDerivaciones derivaciones={d.derivaciones} /></div></DrawerSection>
      <DrawerSection title="Lab orders"><div><ContenidoOrdenes ordenes={d.ordenes} /></div></DrawerSection>
      <DrawerSection title="Source exam"><ContenidoExamen problema={r} /></DrawerSection>
    </>
  )
}

/* ── Desde otras pantallas ────────────────────────────────────────── */

/* Julián (2026-10-13): lo de la Problem List también se ve parado en un examen (el menú de cada finding) y en Treatment
   Plan (cada fila se despliega). Ver clinical-mode.md. */

const ESTADO_HALLAZGO: Record<FindingStatus, EstadoProblema> = {
  Active: 'Active', Monitoring: 'Monitoring', 'In Treatment': 'In treatment', Treated: 'Treated', 'Externally Treated': 'Externally treated',
  'No Treatment Needed': 'No treatment needed', 'Patient Declined': 'Patient declined', 'Clinic Declined': 'Clinic declined', Discarded: 'Discarded',
}

/** Un finding del panel de un examen como registro: sus datos y, si es una fila de la Problem List, lo vinculado a ella. */
export function registroDeHallazgo(f: Finding): Registro {
  return {
    tipo: 'problema',
    descriptor: f.descriptor,
    r: {
      id: f.problema ?? f.id, fecha: f.date, ubicacion: f.tooth === null ? f.area : '-', pieza: f.tooth ?? undefined,
      superficie: f.surfaces.join(', ') || '-', condicion: f.condition.charAt(0).toUpperCase() + f.condition.slice(1),
      examen: f.examen ?? '', proveedor: f.provider, nota: f.notes || undefined, estado: ESTADO_HALLAZGO[f.status],
    },
  }
}

/** Un procedimiento de Treatment Plan como registro: los datos de su fila, el caso donde está (\`grupo\`: sus alternativas)
    y lo vinculado al procedimiento del paciente que es (VINCULOS_PROCEDIMIENTO). Sin caso, es un procedimiento suelto. */
export function registroDePlan(p: Procedimiento, caso?: Caso, grupo: Caso[] = caso ? [caso] : []): Registro {
  const vinculado = PROCEDIMIENTOS.find((pr) => VINCULOS_PROCEDIMIENTO[pr.id]?.caso?.procedimiento === p.id)
  const visita = caso?.visitas.find((v) => v.procedimientos.some((x) => x.id === p.id))
  return {
    tipo: 'procedimiento',
    plan: { t: caso && { caso, grupo, visita, procCaso: p } },
    r: {
      id: vinculado?.id ?? p.id, fecha: p.fecha, ubicacion: p.ubicacion, pieza: Number(p.pieza) || undefined, superficie: p.superficie,
      codigo: p.codigo, nombre: p.nombre, proveedor: p.proveedor,
      /* Removed es quitarlo del plan: para el paciente queda descartado. */
      estado: p.estado === 'Removed' ? 'Discarded' : p.estado,
    },
  }
}

/** Fuera de la tabla del Overview el registro se abre en el drawer de View full record, y un link a otro registro
    cambia el drawer a ese: no se sale de la pantalla. Los links a otra pestaña siguen yendo a esa pestaña. */
export function useVerRegistro() {
  const [viendo, setViendo] = useState<Registro | null>(null)
  const contexto: ContextoDetalle = {
    problemas: PROBLEMAS,
    procedimientos: PROCEDIMIENTOS,
    onAbrirProblema: (r) => setViendo({ tipo: 'problema', r }),
    onAbrirProcedimiento: (r) => setViendo({ tipo: 'procedimiento', r }),
  }
  return { ver: setViendo, contexto, drawer: <RegistroCompletoDrawer registro={viendo} contexto={contexto} onClose={() => setViendo(null)} /> }
}
`})))()}export{n,i as r,r as t};