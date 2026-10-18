import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import {
  Ban, Check, CheckCheck, CircleSlash, Eye, Info, Pencil, Play, RotateCcw, Search, Send, Trash2, UserX, XCircle, type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { Tabs } from '@/components/ui/tabs'
import { FilterMenu } from '@/components/ui/filter-menu'
import { Pill, type PillTone } from '@/components/ui/pill'
import { DataTable, type DataTableColumn } from '@/components/ui/data-table'
import { TooltipProvider } from '@/components/ui/tooltip'
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { ConAyuda } from '@/components/clinical/dental/ProcedureRow'
import { DetalleRegistro, TONO_PROBLEMA, TONO_PROCEDIMIENTO, tratamientoDe, useIr, type ContextoDetalle } from '@/components/clinical/RecordDetail'
import { CASO_LISTO, ConsentRequiredDialog, avisarCasoNoListo, consentimientoRequerido, type TipoConsentimiento } from '@/components/clinical/ConsentRequiredDialog'
import type { ConsentProcedimiento } from '@/data/treatment-plan'
import {
  ESTADOS_PROBLEMA, ESTADOS_PROCEDIMIENTO, PROBLEMAS, PROCEDIMIENTOS,
  type EstadoProblema, type EstadoProcedimiento, type Problema, type ProcedimientoPaciente,
} from '@/data/clinical-mode'

/* La tabla del Overview, como en red.dev: Problem List y Procedures en dos pestañas, cada una con su filtro de estado
   (Active y All por defecto), buscador, nota en tooltip y el menú de acciones según el estado. Cada fila se despliega
   como en el Ledger con lo que cuelga del registro (RecordDetail). Ver design-reference/figma/modulos/clinical-mode.md. */

type Pestana = 'Problem List' | 'Procedures'

/* \`realiza\`: hacer el procedimiento (Start); antes se chequean el caso y el consentimiento (clinical-mode.md, 2026-10-17). */
type Accion<E extends string> = { label: string; icono: LucideIcon; a?: E; peligro?: boolean; borrar?: boolean; realiza?: boolean }

const EDITAR = { label: 'Edit', icono: Pencil } as const
const ROLLBACK = { label: 'Rollback', icono: RotateCcw } as const
const BORRAR = { label: 'Delete', icono: Trash2, peligro: true, borrar: true } as const

/* Las de Active son las de red.dev; las demás, inferidas: lo abierto ofrece los pasos que faltan y lo cerrado, Rollback. */
const ABIERTO_PROBLEMA: Accion<EstadoProblema>[] = [
  { label: 'Start Monitoring', icono: Eye, a: 'Monitoring' },
  { label: 'Start Treatment', icono: Play, a: 'In treatment' },
  { label: 'Mark As Treated', icono: Check, a: 'Treated' },
  { label: 'Mark As Externally Treated', icono: CheckCheck, a: 'Externally treated' },
  { label: 'Mark As No Treat. Needed', icono: CircleSlash, a: 'No treatment needed', peligro: true },
  { label: 'Mark As Patient Declined', icono: UserX, a: 'Patient declined', peligro: true },
  { label: 'Mark As Clinic Declined', icono: Ban, a: 'Clinic declined', peligro: true },
  { label: 'Discard', icono: XCircle, a: 'Discarded', peligro: true },
]
export function accionesProblema(e: EstadoProblema): Accion<EstadoProblema>[][] {
  if (e === 'Active' || e === 'Monitoring' || e === 'In treatment') {
    const ya = e === 'Monitoring' ? ['Monitoring'] : e === 'In treatment' ? ['Monitoring', 'In treatment'] : []
    return [[EDITAR], ABIERTO_PROBLEMA.filter((x) => !ya.includes(x.a!)), [BORRAR]]
  }
  return [[EDITAR], [{ ...ROLLBACK, a: 'Active' }], [BORRAR]]
}
export function accionesProcedimiento(e: EstadoProcedimiento): Accion<EstadoProcedimiento>[][] {
  if (e === 'In progress') return [[EDITAR], [{ label: 'Discontinue', icono: CircleSlash, a: 'Discontinued' }, { ...ROLLBACK, a: 'Planned' }], [BORRAR]]
  if (e === 'Planned') return [[EDITAR], [{ label: 'Start', icono: Play, a: 'In progress', realiza: true }, { label: 'Refer', icono: Send, a: 'Referred' }, { label: 'Discard', icono: XCircle, a: 'Discarded', peligro: true }], [BORRAR]]
  return [[EDITAR], [{ ...ROLLBACK, a: e === 'Completed' ? 'In progress' : 'Planned' }], [BORRAR]]
}

/* La nota de la fila: el ícono violeta con el texto en tooltip, o un guion si no hay. */
export function NoteCell({ nota }: { nota?: string }) {
  if (!nota) return <span aria-label="No note" className="text-[13px] text-ink-faint">—</span>
  return (
    <ConAyuda texto={nota}>
      <button type="button" aria-label={\`Note: \${nota}\`} className="bg-purple-bg text-purple-fg flex size-6 items-center justify-center rounded-full">
        <Info className="size-3.5" />
      </button>
    </ConAyuda>
  )
}

/* La pieza en su cajita gris; vacía si el registro no es de un diente. */
export function ToothCell({ pieza }: { pieza?: number }) {
  return <span className="flex h-6 w-9 items-center justify-center rounded bg-surface-muted text-[12px] text-ink tabular-nums">{pieza ?? ''}</span>
}

const cuenta = <E extends string>(filas: { estado: E }[], e: E) => filas.filter((f) => f.estado === e).length
const texto = (t: string) => <span className="truncate">{t || '-'}</span>
/* En minúscula inicial, como las pills de toda la app (Julián, 2026-10-14). */
const estadoPill = (tono: PillTone, e: string) => <Pill tone={tono} size="sm" className="whitespace-nowrap">{e}</Pill>

export function ProblemList({ procedimientoInicial }: {
  /** Abre en Procedures con esa fila desplegada (View procedure del detalle del Ledger). */
  procedimientoInicial?: string
} = {}) {
  const [pestana, setPestana] = useState<Pestana>(procedimientoInicial ? 'Procedures' : 'Problem List')
  const [problemas, setProblemas] = useState(PROBLEMAS)
  const [procedimientos, setProcedimientos] = useState(PROCEDIMIENTOS)
  const [filtroProblema, setFiltroProblema] = useState<EstadoProblema>('Active')
  const [filtroProcedimiento, setFiltroProcedimiento] = useState<EstadoProcedimiento | 'All'>('All')
  const [q, setQ] = useState('')
  /* La fila que se abre al llegar desde el detalle de la otra pestaña. */
  const [enfoque, setEnfoque] = useState<string | undefined>(procedimientoInicial)
  /* Start con una firma pendiente: Consent required encima; lo mandado desde acá, por procedimiento del caso. */
  const [pedido, setPedido] = useState<{ tipo: TipoConsentimiento; fila: ProcedimientoPaciente; ac: Accion<EstadoProcedimiento>; caso: string; procCaso: string } | null>(null)
  const [consentimientos, setConsentimientos] = useState<Record<string, ConsentProcedimiento>>({})
  const ir = useIr()

  const t = q.trim().toLowerCase()
  const filasProblema = problemas.filter((p) => p.estado === filtroProblema && (!t || \`\${p.fecha} \${p.ubicacion} \${p.pieza ?? ''} \${p.condicion} \${p.examen} \${p.proveedor}\`.toLowerCase().includes(t)))
  const filasProcedimiento = procedimientos.filter((p) => (filtroProcedimiento === 'All' || p.estado === filtroProcedimiento) && (!t || \`\${p.fecha} \${p.ubicacion} \${p.pieza ?? ''} \${p.codigo} \${p.nombre} \${p.proveedor}\`.toLowerCase().includes(t)))

  /* Cambiar el estado desde el menú: con aviso y Deshacer. Borrar saca la fila. \`nota\` se suma al aviso. */
  function aplicar<T extends { id: string; estado: string }>(set: (xs: T[]) => void, antes: T[], fila: T, nombre: string, ac: Accion<string>, nota = '') {
    if (!ac.a && !ac.borrar) return aviso.info('Editing is not available in this release.')
    set(ac.borrar ? antes.filter((x) => x.id !== fila.id) : antes.map((x) => (x.id === fila.id ? { ...x, estado: ac.a! } : x)))
    aviso.ok(ac.borrar ? \`\${nombre} deleted.\` : \`\${nombre} moved to \${ac.a}.\${nota}\`, { label: 'Undo', onClick: () => set(antes) })
  }

  /* Start de un procedimiento de un caso: sin caso aceptado no cambia y el aviso lleva al caso; con la firma pendiente
     decide Consent required. Los procedimientos sueltos no llevan consentimiento. */
  function elegirProcedimiento(fila: ProcedimientoPaciente, ac: Accion<EstadoProcedimiento>) {
    const tr = ac.realiza ? tratamientoDe(fila, consentimientos) : undefined
    if (!tr?.procCaso) return aplicar(setProcedimientos, procedimientos, fila, fila.codigo, ac)
    if (!CASO_LISTO.includes(tr.caso.estado)) return avisarCasoNoListo(() => ir({ pestana: 'Treatment Plan', caso: tr.caso.id }))
    const tipo = consentimientoRequerido([tr.procCaso.consentimiento])
    if (!tipo) return aplicar(setProcedimientos, procedimientos, fila, fila.codigo, ac)
    setPedido({ tipo, fila, ac, caso: tr.caso.nombre, procCaso: tr.procCaso.id })
  }

  function menu<E extends string>(grupos: Accion<E>[][], elegir: (a: Accion<E>) => void) {
    return (
      <>
        <DropdownMenuLabel className="text-[12px] font-semibold text-ink">Actions</DropdownMenuLabel>
        {grupos.map((g, i) => (
          <div key={i}>
            {i > 0 && <DropdownMenuSeparator />}
            {g.map((a) => (
              <DropdownMenuItem key={a.label} onSelect={() => elegir(a)} className={cn('gap-2 text-[13px]', a.peligro && 'text-dash-bad-fg focus:text-dash-bad-fg')}>
                <a.icono className={cn('size-4', a.peligro ? 'text-dash-bad-fg' : 'text-ink-muted')} /> {a.label}
              </DropdownMenuItem>
            ))}
          </div>
        ))}
      </>
    )
  }

  /* Un link del detalle a un registro de la otra pestaña: cambia de pestaña, deja el filtro donde se ve y lo abre. */
  const contexto: ContextoDetalle = {
    problemas, procedimientos, consentimientos,
    onAbrirProblema: (p) => { setQ(''); setFiltroProblema(p.estado); setEnfoque(p.id); setPestana('Problem List') },
    onAbrirProcedimiento: (p) => { setQ(''); setFiltroProcedimiento('All'); setEnfoque(p.id); setPestana('Procedures') },
  }

  const comunes = <T extends { fecha: string; ubicacion: string; pieza?: number; superficie: string }>(): DataTableColumn<T>[] => [
    { key: 'fecha', header: 'Date', width: 80, cell: (r) => texto(r.fecha) },
    { key: 'ubicacion', header: 'Location', width: 80, cell: (r) => texto(r.ubicacion) },
    { key: 'pieza', header: 'Tooth', width: 44, cell: (r) => <ToothCell pieza={r.pieza} /> },
    { key: 'superficie', header: 'Surface', width: 48, cell: (r) => texto(r.superficie) },
  ]
  const colsProblema: DataTableColumn<Problema>[] = [
    ...comunes<Problema>(),
    { key: 'condicion', header: 'Condition', cell: (r) => texto(r.condicion) },
    { key: 'examen', header: 'Exam', width: 76, cell: (r) => texto(r.examen) },
    { key: 'proveedor', header: 'Provider', width: 96, cell: (r) => texto(r.proveedor) },
    { key: 'nota', header: 'Note', width: 36, align: 'center', cell: (r) => <NoteCell nota={r.nota} /> },
    { key: 'estado', header: 'Status', width: 104, cell: (r) => estadoPill(TONO_PROBLEMA[r.estado], r.estado) },
  ]
  const colsProcedimiento: DataTableColumn<ProcedimientoPaciente>[] = [
    ...comunes<ProcedimientoPaciente>(),
    { key: 'procedimiento', header: 'Procedure', cell: (r) => texto(\`\${r.codigo} - \${r.nombre}\`) },
    { key: 'proveedor', header: 'Provider', width: 96, cell: (r) => texto(r.proveedor) },
    { key: 'nota', header: 'Note', width: 36, align: 'center', cell: (r) => <NoteCell nota={r.nota} /> },
    { key: 'estado', header: 'Status', width: 104, cell: (r) => estadoPill(TONO_PROCEDIMIENTO[r.estado], r.estado) },
  ]

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex flex-col gap-3 rounded-lg bg-white shadow-panel p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Tabs tabs={['Problem List', 'Procedures'] as const} value={pestana} onChange={(v) => { setEnfoque(undefined); setPestana(v) }} aria-label="Clinical records" />
          <div className="ml-auto flex flex-wrap items-center gap-2">
            {/* El buscador va siempre primero y después el filtro (Julián, 2026-10-06). */}
            <div className="relative w-[200px] max-w-full">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
              <input
                value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." aria-label="Search"
                className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
              />
            </div>
            {pestana === 'Problem List' ? (
              <FilterMenu
                label="Filter problems by status"
                groups={[{
                  type: 'single', title: 'Status', defaultValue: 'Active', value: filtroProblema, onChange: (v) => setFiltroProblema(v as EstadoProblema),
                  options: ESTADOS_PROBLEMA.map((e) => ({ value: e, count: cuenta(problemas, e), tone: TONO_PROBLEMA[e] })),
                }]}
              />
            ) : (
              <FilterMenu
                label="Filter procedures by status"
                groups={[{
                  type: 'single', title: 'Status', defaultValue: 'All', value: filtroProcedimiento, onChange: (v) => setFiltroProcedimiento(v as EstadoProcedimiento | 'All'),
                  options: [{ value: 'All', count: procedimientos.length }, ...ESTADOS_PROCEDIMIENTO.map((e) => ({ value: e, count: cuenta(procedimientos, e), tone: TONO_PROCEDIMIENTO[e] }))],
                }]}
              />
            )}
          </div>
        </div>

        {pestana === 'Problem List' ? (
          <DataTable
            key="problemas"
            columns={colsProblema} rows={filasProblema} rowKey={(r) => r.id} rowLabel={(r) => r.condicion}
            rowActions={(r) => menu(accionesProblema(r.estado), (a) => aplicar(setProblemas, problemas, r, r.condicion, a))}
            rowDetail={(r) => <DetalleRegistro registro={{ tipo: 'problema', r }} contexto={contexto} />}
            defaultExpanded={enfoque ? [enfoque] : undefined}
            pageSize={5} pageSizeOptions={[5, 10, 20]} pageSizeLabel="Show:" density="compact"
            empty={{ icon: Search, title: 'No problems found', detail: t ? \`Nothing matches "\${q}".\` : \`There are no \${filtroProblema.toLowerCase()} problems.\` }}
          />
        ) : (
          <DataTable
            key="procedimientos"
            columns={colsProcedimiento} rows={filasProcedimiento} rowKey={(r) => r.id} rowLabel={(r) => \`\${r.codigo} \${r.nombre}\`}
            rowActions={(r) => menu(accionesProcedimiento(r.estado), (a) => elegirProcedimiento(r, a))}
            rowDetail={(r) => <DetalleRegistro registro={{ tipo: 'procedimiento', r }} contexto={contexto} />}
            defaultExpanded={enfoque ? [enfoque] : undefined}
            pageSize={5} pageSizeOptions={[5, 10, 20]} pageSizeLabel="Show:" density="compact"
            empty={{ icon: Search, title: 'No procedures found', detail: t ? \`Nothing matches "\${q}".\` : \`There are no \${filtroProcedimiento.toLowerCase()} procedures.\` }}
          />
        )}
      </div>
      {pedido && (
        <ConsentRequiredDialog
          tipo={pedido.tipo}
          procedimientos={[pedido.fila]}
          caso={pedido.caso}
          onCancel={() => setPedido(null)}
          onSignNow={() => {
            setPedido(null)
            aviso.info('The signature workflow is not available in this release.')
          }}
          onContinue={() => {
            const { tipo, fila, ac, procCaso } = pedido
            if (tipo === 'sin-enviar') setConsentimientos((c) => ({ ...c, [procCaso]: 'Pending' }))
            aplicar(setProcedimientos, procedimientos, fila, fila.codigo, ac, tipo === 'sin-enviar' ? ' Consent sent to the patient.' : ' Consent signature pending.')
            setPedido(null)
          }}
        />
      )}
    </TooltipProvider>
  )
}
`})))()}export{n,i as r,r as t};