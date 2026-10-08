import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { Link } from 'react-router-dom'
import { Pencil, ShieldCheck, Trash2 } from 'lucide-react'
import { DataTable, TextCell, type DataTableColumn } from '@/components/ui/data-table'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Pill } from '@/components/ui/pill'
import { useFinanzas } from '@/data/finanzasStore'
import { TONO_ESTADO, type PlanSeguro } from '@/data/finanzas'

/* Los planes de seguro, con el carrier, el fee schedule y la coverage table de cada uno como links: es lo que une las tres
   secciones de Billing. La usan el detalle de un carrier, de un fee schedule y de una coverage table; cada uno oculta la
   columna que ya es él mismo. Ver settings-billing.md. */

export type ColumnaPlan = 'carrier' | 'feeSchedule' | 'coverageTable'

const enlace = 'text-dash-blue truncate hover:underline'

export function PlansTable({
  planes, ocultar = [], onEditar, onBorrar, loading, vacio,
}: {
  planes: PlanSeguro[]
  /** Columnas que no hacen falta (la del propio carrier en su detalle). */
  ocultar?: ColumnaPlan[]
  onEditar?: (p: PlanSeguro) => void
  onBorrar?: (p: PlanSeguro) => void
  loading?: boolean
  /** Texto del estado vacío. */
  vacio?: { title: string; detail?: string }
}) {
  const { aseguradoras, aranceles, coberturas } = useFinanzas()
  const nombre = <T extends { id: string; nombre: string }>(lista: T[], id: string) => lista.find((x) => x.id === id)?.nombre ?? '—'

  const columnas: DataTableColumn<PlanSeguro>[] = [
    {
      key: 'plan', header: 'Plan', width: 190, locked: true,
      cell: (p) => onEditar
        ? <button type="button" onClick={() => onEditar(p)} className="truncate text-left font-semibold text-ink hover:underline">{p.nombre}</button>
        : <TextCell strong>{p.nombre}</TextCell>,
    },
    ...(ocultar.includes('carrier') ? [] : [{
      key: 'carrier', header: 'Carrier', width: 170,
      cell: (p: PlanSeguro) => <Link to={\`/settings/finance/carriers/\${p.aseguradoraId}\`} className={enlace}>{nombre(aseguradoras, p.aseguradoraId)}</Link>,
    }]),
    { key: 'grupo', header: 'Group number', width: 110, cell: (p) => <span className="tabular-nums">{p.grupo}</span> },
    { key: 'empleador', header: 'Employer', cell: (p) => <TextCell>{p.empleador || '—'}</TextCell> },
    { key: 'tipo', header: 'Type', width: 80, cell: (p) => p.tipo },
    ...(ocultar.includes('feeSchedule') ? [] : [{
      key: 'fee', header: 'Fee schedule', width: 160,
      cell: (p: PlanSeguro) => <Link to={\`/settings/finance/fee-schedule/\${p.arancelId}\`} className={enlace}>{nombre(aranceles, p.arancelId)}</Link>,
    }]),
    ...(ocultar.includes('coverageTable') ? [] : [{
      key: 'cobertura', header: 'Coverage table', width: 170,
      cell: (p: PlanSeguro) => <Link to={\`/settings/finance/coverage-table/\${p.coberturaId}\`} className={enlace}>{nombre(coberturas, p.coberturaId)}</Link>,
    }]),
    { key: 'suscriptores', header: 'Subscribers', width: 90, align: 'right', cell: (p) => <span className="tabular-nums">{p.suscriptores}</span> },
    { key: 'estado', header: 'Status', width: 80, cell: (p) => <Pill tone={TONO_ESTADO[p.estado]}>{p.estado}</Pill> },
  ]

  return (
    <DataTable
      columns={columnas}
      rows={planes}
      rowKey={(p) => p.id}
      rowLabel={(p) => p.nombre}
      itemLabel="plans"
      loading={loading}
      empty={{ icon: ShieldCheck, title: vacio?.title ?? 'No plans yet', detail: vacio?.detail }}
      rowActions={onEditar || onBorrar ? (p) => (
        <>
          {onEditar && <DropdownMenuItem onSelect={() => onEditar(p)}><Pencil className="size-4 shrink-0" /> Edit plan</DropdownMenuItem>}
          {onBorrar && <DropdownMenuItem variant="destructive" onSelect={() => onBorrar(p)}><Trash2 className="size-4 shrink-0" /> Delete plan</DropdownMenuItem>}
        </>
      ) : undefined}
    />
  )
}
`})))()}export{n,i as r,r as t};