import { useState } from 'react'
import { Ban, CalendarX, CircleCheck, Eye, FileDown, Pencil, Pill as PillIcon, Plus, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { DataTable, TextCell, type DataTableColumn } from '@/components/ui/data-table'
import { DateFilter, inRange, type DateRange, type DatePreset } from '@/components/ui/date-filter'
import { formatMDY } from '@/components/ui/date-picker'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { FilterMenu } from '@/components/ui/filter-menu'
import { Pill } from '@/components/ui/pill'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { SettingsSearch } from '@/components/settings/SettingsSearch'
import type { PendingTask } from '@/components/dashboard/PendingTaskCard'
import { aplicarAccion } from '@/components/dashboard/tareas'
import { abrirDocumento, type Documento } from '@/components/dashboard/documentoTarea'
import {
  PRESCRIPTOR, RECETAS, TONO_RECETA, nombreMedicacion, recetaDeTarea, type EstadoReceta, type Receta,
} from '@/data/prescripciones'
import { PrescriptionForm } from './PrescriptionForm'

/* La pestaña Prescription de Clinical Mode: la tabla estándar (como Lab order) y la ficha New / Edit prescription.
   Contenido del video de red.dev de Julián (lista con Filters, ⋮ → Edit, New Prescription con varias medicaciones); reglas
   de CON-2230, CON-2354, CON-2355, CON-2356, CON-2358, CON-2337, CON-2846, CON-2286 y CON-2287. Ver
   design-reference/figma/modulos/clinical-mode.md (2026-11-27). */

const ESTADOS = Object.keys(TONO_RECETA) as EstadoReceta[]

const deMDY = (s: string) => { const [m, d, a] = s.split('/').map(Number); return new Date(a!, (m ?? 1) - 1, d) }
const enDias = (n: number) => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n) }
/* Atajos de vencimiento: hacia adelante (lo que vence pronto) y hacia atrás (lo que ya venció). */
const ATAJOS: DatePreset[] = [
  { label: 'Next 7 days', range: () => ({ from: enDias(0), to: enDias(6) }) },
  { label: 'Next 30 days', range: () => ({ from: enDias(0), to: enDias(29) }) },
  { label: 'Last 30 days', range: () => ({ from: enDias(-29), to: enDias(0) }) },
  { label: 'Last 90 days', range: () => ({ from: enDias(-89), to: enDias(0) }) },
]

/* La medicación de la fila: la primera y cuántas más lleva la receta. */
const Medicaciones = ({ r }: { r: Receta }) => (
  <span className="flex min-w-0 items-baseline gap-1.5">
    <span className="truncate text-[13px] font-medium text-ink">{nombreMedicacion(r.medicaciones[0]!)}</span>
    {r.medicaciones.length > 1 && <span className="shrink-0 text-xs text-ink-muted">+{r.medicaciones.length - 1} more</span>}
  </span>
)

const COLUMNAS: DataTableColumn<Receta>[] = [
  { key: 'medicacion', header: 'Medication', cell: (r) => <Medicaciones r={r} /> },
  { key: 'proveedor', header: 'Provider', cell: (r) => <TextCell>{r.proveedor}</TextCell> },
  { key: 'estado', header: 'Status', width: 110, cell: (r) => <Pill tone={TONO_RECETA[r.estado]}>{r.estado}</Pill> },
  { key: 'creado', header: 'Created date', width: 120, cell: (r) => r.creado },
  { key: 'actualizado', header: 'Last update', width: 120, cell: (r) => r.actualizado },
  /* En rojo sólo la que ya venció: el color dice algo (el video pinta todas). */
  { key: 'vence', header: 'Expiration date', width: 130, cell: (r) => <span className={cn(r.estado === 'Expired' && 'font-semibold text-dash-bad-fg')}>{r.vence}</span> },
]

/* El PDF de una receta Active (CON-2287), con los campos de New Prescription. */
function documento(r: Receta, paciente: string): Documento {
  const si = (v: boolean) => (v ? 'Yes' : 'No')
  return {
    titulo: 'Prescription',
    paciente,
    provider: r.proveedor,
    secciones: [
      { titulo: 'Prescription', campos: [['Patient', paciente], ['Prescriber', r.proveedor], ['Prescription ID', r.id.toUpperCase()], ['Created date', r.creado], ['Expiration date', r.vence]] },
      ...r.medicaciones.map((m) => ({ titulo: `${nombreMedicacion(m)} · ${m.forma}`, campos: [
        ['Directions', `${m.dosis} ${m.dosisUnidad}, ${m.via}, ${m.frecuencia.toLowerCase()}, for ${m.duracion} ${m.duracionUnidad.toLowerCase()}`],
        ['Quantity to dispense', m.cantidad], ['Refills', m.recargas || '0'],
        ['Generic substitution', si(m.generico)], ['Controlled substance', si(m.controlada)],
      ] as [string, string][] })),
      { titulo: 'Additional indications', parrafos: [r.indicaciones || 'No additional indications.'] },
    ],
  }
}

type Pregunta = { r: Receta; accion: 'Cancel' | 'Delete' | 'Activate' | 'Expire' }

export function PrescriptionPanel({ paciente, recetas: inicio = RECETAS, tarea }: {
  /** El paciente de Clinical Mode: va en el PDF. */
  paciente: string
  /** Las recetas con las que abre; por defecto, las del mock. */
  recetas?: Receta[]
  /** La receta de Pending Task que abrió Complete this task: entra directo a su ficha. */
  tarea?: PendingTask
}) {
  const [recetas, setRecetas] = useState<Receta[]>(() =>
    tarea?.id && !inicio.some((r) => r.id === tarea.id)
      ? [recetaDeTarea({ id: tarea.id, proveedor: tarea.provider ?? PRESCRIPTOR, creado: tarea.register, vence: tarea.expiration }), ...inicio]
      : inicio)
  /* undefined: la lista · 'nueva': New prescription · id: la ficha de esa receta. */
  const [ficha, setFicha] = useState<string | undefined>(tarea?.id)
  const [q, setQ] = useState('')
  const [estados, setEstados] = useState<string[]>([])
  const [proveedores, setProveedores] = useState<string[]>([])
  const [rango, setRango] = useState<DateRange | null>(null)
  const [pregunta, setPregunta] = useState<Pregunta | null>(null)

  const deTarea = (r: Receta) => (tarea && r.id === tarea.id ? tarea : undefined)
  const hoy = formatMDY(new Date())
  const reemplazar = (id: string, patch: Partial<Receta>) => setRecetas((xs) => xs.map((x) => (x.id === id ? { ...x, ...patch } : x)))

  const pdf = (r: Receta) => abrirDocumento(documento(r, paciente), () => aviso.error("We couldn't open the PDF. Allow pop-ups for this site and try again."))

  /* Los textos de red.dev (relevado el 2026-11-27): cada cambio de estado pregunta antes. */
  const activar = (r: Receta) => {
    const antes = recetas
    reemplazar(r.id, { estado: 'Active', actualizado: hoy })
    const t = deTarea(r)
    if (t) aplicarAccion(t, 'Activate', { sinAviso: true })
    aviso.ok('The prescription has been successfully marked as Active.', t ? undefined : { label: 'Undo', onClick: () => setRecetas(antes) })
  }

  const confirmar = ({ r, accion }: Pregunta) => {
    setPregunta(null)
    const t = deTarea(r)
    if (accion === 'Activate') { activar(r); return }
    if (accion === 'Expire') {
      reemplazar(r.id, { estado: 'Expired', actualizado: hoy })
      aviso.ok('The prescription has been successfully marked as Expired.')
      return
    }
    if (accion === 'Cancel') {
      reemplazar(r.id, { estado: 'Canceled', actualizado: hoy })
      aviso.ok('The prescription has been successfully marked as Canceled.')
    } else {
      setRecetas((xs) => xs.filter((x) => x.id !== r.id))
      aviso.ok('The prescription has been successfully deleted.')
    }
    if (t) aplicarAccion(t, accion, { sinAviso: true })
    if (ficha === r.id) setFicha(undefined)
  }

  /* Las acciones según el estado, como red.dev: Edit, Activate y Delete sólo en Pending (CON-2354, CON-2356); Cancel en
     Pending o Active (CON-2355); Expire y el PDF sólo en una Active (CON-2287). Las demás se abren para consultar (CON-2286). */
  const items = (r: Receta, enFicha = false) => (
    <>
      {!enFicha && (r.estado === 'Pending'
        ? <DropdownMenuItem onSelect={() => setFicha(r.id)}><Pencil className="size-4 shrink-0" /> Edit prescription</DropdownMenuItem>
        : <DropdownMenuItem onSelect={() => setFicha(r.id)}><Eye className="size-4 shrink-0" /> View prescription</DropdownMenuItem>)}
      {r.estado === 'Active' && !enFicha && <DropdownMenuItem onSelect={() => pdf(r)}><FileDown className="size-4 shrink-0" /> Download PDF</DropdownMenuItem>}
      {r.estado === 'Pending' && <DropdownMenuItem onSelect={() => setPregunta({ r, accion: 'Activate' })}><CircleCheck className="size-4 shrink-0" /> Activate</DropdownMenuItem>}
      {r.estado === 'Active' && <DropdownMenuItem onSelect={() => setPregunta({ r, accion: 'Expire' })}><CalendarX className="size-4 shrink-0" /> Expire</DropdownMenuItem>}
      {(r.estado === 'Pending' || r.estado === 'Active') && (
        <DropdownMenuItem variant="destructive" onSelect={() => setPregunta({ r, accion: 'Cancel' })}><Ban className="size-4 shrink-0" /> Cancel prescription</DropdownMenuItem>
      )}
      {r.estado === 'Pending' && (
        <DropdownMenuItem variant="destructive" onSelect={() => setPregunta({ r, accion: 'Delete' })}><Trash2 className="size-4 shrink-0" /> Delete prescription</DropdownMenuItem>
      )}
    </>
  )

  /* Título, texto y botón de cada pregunta (red.dev; Delete, CON-2356). */
  const PREGUNTAS = {
    Activate: { title: 'Activate prescription', confirm: 'Activate', texto: 'Are you sure you want to mark this prescription as Active? Once marked as Active, you will no longer be able to edit this prescription.' },
    Cancel: { title: 'Cancel prescription', confirm: 'Cancel prescription', texto: 'Are you sure you want to mark this prescription as Canceled?' },
    Expire: { title: 'Expire prescription', confirm: 'Expire', texto: 'Are you sure you want to mark this prescription as Expired?' },
    Delete: { title: 'Delete prescription', confirm: 'Delete', texto: 'Are you sure you want to delete this prescription? This action cannot be undone.' },
  }
  const dialogo = pregunta && (
    <ConfirmDialog
      title={PREGUNTAS[pregunta.accion].title} confirmLabel={PREGUNTAS[pregunta.accion].confirm}
      cancelLabel={pregunta.accion === 'Cancel' ? 'Keep it' : 'Cancel'}
      tone={pregunta.accion === 'Activate' ? undefined : 'danger'} icon={pregunta.accion === 'Delete' ? 'delete' : undefined}
      onCancel={() => setPregunta(null)} onConfirm={() => confirmar(pregunta)}
    >
      <p>{PREGUNTAS[pregunta.accion].texto}</p>
    </ConfirmDialog>
  )

  if (ficha) {
    const r = recetas.find((x) => x.id === ficha)
    return (
      <>
        <PrescriptionForm
          key={`${ficha}-${r?.estado}`}
          receta={r}
          onVolver={() => setFicha(undefined)}
          onGuardar={(datos) => {
            if (r) {
              reemplazar(r.id, { ...datos, actualizado: hoy })
              aviso.ok('The prescription has been successfully updated.')
            } else {
              const id = `rx-${Date.now().toString(36)}`
              setRecetas((xs) => [{ id, proveedor: PRESCRIPTOR, estado: 'Pending', creado: hoy, actualizado: hoy, ...datos }, ...xs])
              aviso.ok('The prescription has been successfully created.')
            }
            setFicha(undefined)
          }}
          acciones={r && (
            <>
              {r.estado === 'Active' && <Button variant="secondary" onClick={() => pdf(r)}><FileDown /> PDF</Button>}
              {(r.estado === 'Pending' || r.estado === 'Active') && <RowActionsMenu label="Prescription actions">{items(r, true)}</RowActionsMenu>}
            </>
          )}
        />
        {dialogo}
      </>
    )
  }

  const texto = q.trim().toLowerCase()
  const visibles = recetas.filter((r) =>
    (!texto || `${r.proveedor} ${r.medicaciones.map(nombreMedicacion).join(' ')}`.toLowerCase().includes(texto))
    && (!estados.length || estados.includes(r.estado))
    && (!proveedores.length || proveedores.includes(r.proveedor))
    && (!rango || inRange(deMDY(r.vence), rango)))
  const nombres = [...new Set(recetas.map((r) => r.proveedor))].sort()
  const filtrando = !!(texto || estados.length || proveedores.length || rango)

  return (
    <div>
      <DataTable
        columns={COLUMNAS}
        rows={visibles}
        rowKey={(r) => r.id}
        rowLabel={(r) => nombreMedicacion(r.medicaciones[0]!)}
        onRowClick={(r) => setFicha(r.id)}
        toolbarStart={(
          <>
            <SettingsSearch value={q} onChange={setQ} placeholder="Search prescriptions" />
            <FilterMenu
              label="Filter prescriptions"
              groups={[
                { title: 'Status', options: ESTADOS.map((e) => ({ value: e, count: recetas.filter((r) => r.estado === e).length })), value: estados, onChange: setEstados },
                { title: 'Provider', options: nombres.map((n) => ({ value: n, count: recetas.filter((r) => r.proveedor === n).length })), value: proveedores, onChange: setProveedores },
              ]}
            />
            <DateFilter
              value={rango} onChange={setRango} presets={ATAJOS} max={enDias(365)}
              label="Filter prescriptions by expiration date" emptyLabel="Any expiration date"
            />
          </>
        )}
        actions={<Button size="md" onClick={() => setFicha('nueva')}><Plus /> New prescription</Button>}
        rowActions={(r) => items(r)}
        pageSize={10}
        empty={!filtrando
          ? { icon: PillIcon, title: 'No prescriptions', detail: "This patient doesn't have any prescriptions yet." }
          : { icon: PillIcon, title: 'No prescriptions match the current filters', detail: 'Try a different medication, provider, status or date.' }}
      />
      {dialogo}
    </div>
  )
}
