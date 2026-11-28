import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CircleCheck, ClipboardList, Download, Eye, Lock } from 'lucide-react'
import { ICONO_SUELTO } from '@/lib/estilos'
import { aviso } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { Chip, ChipMas } from '@/components/ui/chip'
import { DataTable, TextCell, type DataTableColumn } from '@/components/ui/data-table'
import { DateNav } from '@/components/ui/date-nav'
import { FilterMenu, type FilterGroup } from '@/components/ui/filter-menu'
import { Pill, type PillTone } from '@/components/ui/pill'
import { descargarDocumento } from '@/components/dashboard/documentoTarea'
import { PACIENTE } from '@/data/treatment-plan'
import type { EncuentroHistorial, EstadoHistorial } from '@/data/historial'
import { archivoNota, documentoEncuentro, tieneNota, useHistorial } from '@/lib/historial'
import { PatientSummaryNote } from './PatientSummaryNote'

/* Patient Summary de Clinical Mode (red.dev: /clinical-mode/treatment-history): los encuentros del paciente y su nota
   clínica. Mismas columnas y acciones que red.dev (el ojo, Download de lo elegido y el filtro por fecha), con la tabla,
   las pills, el pie y el bloque de fecha de la app (por mes, como Lab order); Filter suma Status y Provider (CON-2731).
   El ojo abre la nota en el visor de documentos sin salir de la pestaña: al volver, la página, los filtros y lo elegido
   siguen como estaban (CON-3773). Ver design-reference/figma/modulos/clinical-mode.md (2026-11-27, Patient Summary). */

/* Un tono por estado del encuentro, con los de los turnos de la app (Fulfilled verde, Cancelled rojo). */
export const TONO_ENCUENTRO: Record<EstadoHistorial, PillTone> = {
  'In progress': 'info', 'On hold': 'warning', Discharged: 'neutral', Completed: 'purple', Fulfilled: 'success', Cancelled: 'danger',
}
const ESTADOS = Object.keys(TONO_ENCUENTRO) as EstadoHistorial[]

const rotulo = (e: EncuentroHistorial) => \`encounter of \${e.fecha}, \${e.motivo}\`

/* La nota del encuentro, con los textos del historial de un procedimiento (CON-4158). */
function NotaCelda({ nota }: Pick<EncuentroHistorial, 'nota'>) {
  if (nota === 'None') return <span className="text-ink-muted">No clinical note</span>
  if (nota === 'Restricted') return <span className="flex items-center gap-1 text-ink-muted"><Lock aria-hidden className="size-3.5 shrink-0" /> Access restricted</span>
  return <Pill tone={nota === 'Signed' ? 'success' : 'warning'}>{nota}</Pill>
}

/* Los procedimientos que avanzaron o se completaron en el encuentro: el primer código y el resto detrás de "+N", como las
   medicaciones de una receta. El nombre y el estado, al pasar el mouse. Chip gris: el celeste se pierde en la fila elegida. */
function ProcedimientosCelda({ e }: { e: EncuentroHistorial }) {
  const [abierto, setAbierto] = useState(false)
  const todos = e.procedimientos
  if (!todos.length) return <span className="text-ink-muted">No procedures</span>
  const texto = (p: EncuentroHistorial['procedimientos'][number]) => \`\${p.codigo} · \${p.nombre}\${p.zona ? \` · \${p.zona}\` : ''} [\${p.estado}]\`
  const visibles = abierto ? todos : todos.slice(0, 1)
  return (
    <span className="flex min-w-0 flex-wrap items-center gap-1.5">
      {visibles.map((p) => <Chip key={\`\${p.codigo}-\${p.zona}\`} tone="neutral" title={texto(p)}>{p.codigo}</Chip>)}
      {todos.length > visibles.length && (
        <ChipMas
          n={todos.length - visibles.length} label={\`Show \${todos.length - visibles.length} more procedures: \${todos.slice(1).map(texto).join(', ')}\`}
          onClick={(ev) => { ev.stopPropagation(); setAbierto(true) }}
        />
      )}
    </span>
  )
}

/* Si en el encuentro hubo exámenes, derivaciones, órdenes o recetas: el tilde verde de red.dev (CON-3012, CON-3539); lo
   que no hubo, una raya, como cualquier celda sin dato. */
function Hecho({ si }: { si: boolean }) {
  return si
    ? <><CircleCheck aria-hidden className="size-4 text-dash-ok-fg" /><span className="sr-only">Yes</span></>
    : <><span aria-hidden className="text-ink-faint">—</span><span className="sr-only">No</span></>
}
const hecho = (key: string, header: string, width: number, de: (e: EncuentroHistorial) => unknown[]): DataTableColumn<EncuentroHistorial> =>
  ({ key, header, width, cell: (e) => <Hecho si={de(e).length > 0} /> })

export function PatientSummaryPanel({ paciente = PACIENTE }: { /** A nombre de quién salen las notas. */ paciente?: string }) {
  const encuentros = useHistorial()
  const [estados, setEstados] = useState<string[]>([])
  const [proveedores, setProveedores] = useState<string[]>([])
  /* El mes que filtra la tabla; sin mes, todas las fechas. */
  const [mes, setMes] = useState<Date | null>(null)
  const [elegidos, setElegidos] = useState<string[]>([])
  /* La nota abierta va en la URL (?note=), como la de red.dev: se puede compartir y el Atrás del navegador la cierra. */
  const [busqueda, setBusqueda] = useSearchParams()
  const abierta = encuentros.find((e) => e.id === busqueda.get('note') && tieneNota(e))
  const abrir = (id: string) => setBusqueda((p) => { p.set('tab', 'Patient summary'); p.set('note', id); return p })
  const cerrar = () => setBusqueda((p) => { p.delete('note'); return p }, { replace: true })

  const visibles = encuentros.filter((e) =>
    (!estados.length || estados.includes(e.estado))
    && (!proveedores.length || proveedores.includes(e.provider))
    && (!mes || (new Date(e.fecha).getFullYear() === mes.getFullYear() && new Date(e.fecha).getMonth() === mes.getMonth())))
  const contar = (de: (e: EncuentroHistorial) => string) => (v: string) => ({ value: v, count: encuentros.filter((e) => de(e) === v).length })
  const grupos: FilterGroup[] = [
    { title: 'Status', options: ESTADOS.map(contar((e) => e.estado)), value: estados, onChange: setEstados },
    { title: 'Provider', options: [...new Set(encuentros.map((e) => e.provider))].sort().map(contar((e) => e.provider)), value: proveedores, onChange: setProveedores },
  ]

  /* Download baja la nota de cada encuentro elegido, con sus addenda (CON-2731); avisa sólo si hay algo que bajar (CON-3023). */
  const bajar = () => {
    const notas = encuentros.filter((e) => elegidos.includes(e.id) && tieneNota(e))
    if (!notas.length) { aviso.warn('Select at least one clinical note to download.'); return }
    notas.forEach((e, i) => setTimeout(() => descargarDocumento(documentoEncuentro(e, paciente), archivoNota(e, paciente)), i * 300))
    aviso.ok('Download started')
  }

  const columnas: DataTableColumn<EncuentroHistorial>[] = [
    { key: 'fecha', header: 'Date', width: 172, locked: true, cell: (e) => (
      <span className="flex min-w-0 flex-col">
        <span className="flex items-center gap-2 tabular-nums">{e.fecha}{e.id === encuentros[0]?.id && <Pill tone="info" size="sm">Latest</Pill>}</span>
        <span title={e.zona} className="truncate text-[11px] text-ink-muted">{e.zona}</span>
      </span>
    ) },
    { key: 'estado', header: 'Status', width: 108, cell: (e) => <Pill tone={TONO_ENCUENTRO[e.estado]}>{e.estado}</Pill> },
    { key: 'nota', header: 'Clinical note', width: 136, cell: (e) => <NotaCelda nota={e.nota} /> },
    { key: 'motivo', header: 'Reason for appt', cell: (e) => <TextCell>{e.motivo}</TextCell> },
    { key: 'provider', header: 'Provider', width: 144, cell: (e) => <TextCell>{e.provider}</TextCell> },
    { key: 'procedimientos', header: 'Procedures', width: 132, cell: (e) => <ProcedimientosCelda e={e} /> },
    hecho('examenes', 'Exams', 52, (e) => e.examenes),
    hecho('derivaciones', 'Ref', 40, (e) => e.derivaciones),
    hecho('laboratorios', 'Lab', 40, (e) => e.laboratorios),
    hecho('recetas', 'Prescription', 84, (e) => e.recetas),
    { key: 'ver', header: 'Actions', width: 60, align: 'right', locked: true, cell: (e) => tieneNota(e) && (
      <button type="button" aria-label={\`View clinical note of the \${rotulo(e)}\`} title="View clinical note" onClick={(ev) => { ev.stopPropagation(); abrir(e.id) }} className={ICONO_SUELTO}>
        <Eye className="size-4" />
      </button>
    ) },
  ]

  return (
    <div>
      <DataTable
        columns={columnas}
        rows={visibles}
        rowKey={(e) => e.id}
        rowLabel={rotulo}
        onRowClick={(e) => abrir(e.id)}
        /* Sin nota (cancelado) o sin permiso para leerla: no hay nada que abrir ni que bajar. */
        isRowDisabled={(e) => !tieneNota(e)}
        selectable
        selected={elegidos}
        onSelectedChange={setElegidos}
        toolbarStart={(
          <>
            <FilterMenu label="Filter encounters" groups={grupos} align="start" />
            <DateNav value={mes} onChange={setMes} onClear={() => setMes(null)} periodo="month" vacio="All dates" marked={encuentros.map((e) => new Date(e.fecha))} label="Filter encounters by date" />
          </>
        )}
        actions={<Button variant="secondary" size="md" onClick={bajar}><Download /> Download{elegidos.length > 0 && \` (\${elegidos.length})\`}</Button>}
        pageSize={10}
        empty={encuentros.length === 0
          ? { icon: ClipboardList, title: 'No encounters yet', detail: "This patient's encounters and their clinical notes will show up here." }
          : { icon: ClipboardList, title: 'No encounters match the current filters', detail: 'Try a different status, provider or date.' }}
      />
      {abierta && <PatientSummaryNote key={abierta.id} encuentro={abierta} paciente={paciente} onBack={cerrar} />}
    </div>
  )
}
`})))()}export{n,i as r,r as t};