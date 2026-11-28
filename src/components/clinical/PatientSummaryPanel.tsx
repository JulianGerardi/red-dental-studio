import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CircleCheck, CircleX, ClipboardList, Download, Eye, Lock } from 'lucide-react'
import { ICONO_SUELTO } from '@/lib/estilos'
import { aviso } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { Chip, ChipMas } from '@/components/ui/chip'
import { DataTable, TextCell, type DataTableColumn } from '@/components/ui/data-table'
import { DateNav } from '@/components/ui/date-nav'
import { FilterMenu, type FilterGroup } from '@/components/ui/filter-menu'
import { Pill, type PillTone } from '@/components/ui/pill'
import { abrirHoja } from '@/components/dashboard/documentoTarea'
import { PACIENTE } from '@/data/treatment-plan'
import type { EncuentroHistorial, EstadoHistorial } from '@/data/historial'
import { hojaNota, hojasJuntas, huboExamenes, tieneNota, useHistorial } from '@/lib/historial'
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

const rotulo = (e: EncuentroHistorial) => `encounter of ${e.fecha}, ${e.motivo}`
/* Todo encuentro se abre, también el cancelado (muestra el error de red.dev), salvo la nota ajena sin permiso. */
const seAbre = (e: EncuentroHistorial) => e.nota === 'Signed' || e.nota === 'Unsigned'

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
  const texto = (p: (typeof todos)[number]) => `${p.code} · ${p.description}${p.location ? ` · ${p.location}` : ''} [${p.status}]`
  const visibles = abierto ? todos : todos.slice(0, 1)
  return (
    <span className="flex min-w-0 flex-wrap items-center gap-1.5">
      {visibles.map((p) => <Chip key={`${p.code}-${p.location}`} tone="neutral" title={texto(p)}>{p.code}</Chip>)}
      {todos.length > visibles.length && (
        <ChipMas
          n={todos.length - visibles.length} label={`Show ${todos.length - visibles.length} more procedures: ${todos.slice(1).map(texto).join(', ')}`}
          onClick={(ev) => { ev.stopPropagation(); setAbierto(true) }}
        />
      )}
    </span>
  )
}

/* Si en el encuentro hubo exámenes, derivaciones, órdenes o recetas, como red.dev: tilde verde si hubo (CON-3012,
   CON-3539) y cruz roja si no. */
function Hecho({ si }: { si: boolean }) {
  return si
    ? <><CircleCheck aria-hidden className="size-4 text-dash-ok-fg" /><span className="sr-only">Yes</span></>
    : <><CircleX aria-hidden className="size-4 text-dash-bad-fg" /><span className="sr-only">No</span></>
}
const hecho = (key: string, header: string, width: number, si: (e: EncuentroHistorial) => boolean): DataTableColumn<EncuentroHistorial> =>
  ({ key, header, width, cell: (e) => <Hecho si={si(e)} /> })

export function PatientSummaryPanel({ paciente = PACIENTE }: { /** A nombre de quién salen las notas. */ paciente?: string }) {
  const encuentros = useHistorial()
  const [estados, setEstados] = useState<string[]>([])
  const [proveedores, setProveedores] = useState<string[]>([])
  /* El mes que filtra la tabla; sin mes, todas las fechas. */
  const [mes, setMes] = useState<Date | null>(null)
  const [elegidos, setElegidos] = useState<string[]>([])
  /* La nota abierta va en la URL (?note=), como la de red.dev: se puede compartir y el Atrás del navegador la cierra. */
  const [busqueda, setBusqueda] = useSearchParams()
  const abierta = encuentros.find((e) => e.id === busqueda.get('note') && seAbre(e))
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

  /* Download junta las notas elegidas, con sus addenda (CON-2731), y avisa sólo si hay algo que bajar (CON-3023). El
     archivo lo arma el backend con la plantilla; acá se abren en una pestaña con ese diseño, una por página. */
  const bajar = () => {
    const notas = encuentros.filter((e) => elegidos.includes(e.id) && tieneNota(e))
    if (!notas.length) { aviso.warn('The selected encounters have no clinical note to download.'); return }
    let abrio = true
    abrirHoja(hojasJuntas(notas.map((e) => hojaNota(e, paciente))), () => { abrio = false; aviso.error("We couldn't open the clinical notes. Allow pop-ups for this site and try again.") })
    if (abrio) aviso.ok('Download started')
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
    hecho('examenes', 'Exams', 52, huboExamenes),
    hecho('derivaciones', 'Ref', 40, (e) => e.eventos.referrals.length > 0),
    hecho('laboratorios', 'Lab', 40, (e) => e.eventos.lab_orders.length > 0),
    hecho('recetas', 'Prescription', 84, (e) => e.eventos.prescriptions.length > 0),
    { key: 'ver', header: 'Actions', width: 60, align: 'right', locked: true, cell: (e) => seAbre(e) && (
      <button type="button" aria-label={`View clinical note of the ${rotulo(e)}`} title="View clinical note" onClick={(ev) => { ev.stopPropagation(); abrir(e.id) }} className={ICONO_SUELTO}>
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
        /* Sin permiso para leer la nota: no hay nada que abrir ni que bajar. */
        isRowDisabled={(e) => !seAbre(e)}
        selectable
        selected={elegidos}
        onSelectedChange={setElegidos}
        toolbarStart={(
          <>
            <FilterMenu label="Filter encounters" groups={grupos} align="start" />
            <DateNav value={mes} onChange={setMes} onClear={() => setMes(null)} periodo="month" vacio="All dates" marked={encuentros.map((e) => new Date(e.fecha))} label="Filter encounters by date" />
          </>
        )}
        /* Como red.dev: apagado hasta elegir alguna nota; el pie dice cuántas van elegidas. */
        actions={<Button variant="secondary" size="md" disabled={!elegidos.length} onClick={bajar}><Download /> Download{elegidos.length > 0 && ` (${elegidos.length})`}</Button>}
        pageSize={10}
        empty={encuentros.length === 0
          ? { icon: ClipboardList, title: 'No encounters yet', detail: "This patient's encounters and their clinical notes will show up here." }
          : { icon: ClipboardList, title: 'No encounters match the current filters', detail: 'Try a different status, provider or date.' }}
      />
      {abierta && <PatientSummaryNote key={abierta.id} encuentro={abierta} paciente={paciente} onBack={cerrar} />}
    </div>
  )
}
