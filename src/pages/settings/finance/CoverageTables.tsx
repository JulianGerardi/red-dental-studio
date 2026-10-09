import { useMemo, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ListChecks, Plus, ShieldAlert, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { SelectField, TextField } from '@/components/patients/form'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { aviso } from '@/components/ui/toaster'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { MasterList, type ItemMaestro } from '@/components/finance/MasterList'
import { RangesTable, rangoCompleto, rangoVacio } from '@/components/finance/RangesTable'
import { ExceptionsDrawer } from '@/components/finance/ExceptionsDrawer'
import { TARJETA_PANEL } from '@/lib/estilos'
import { useFinanzas } from '@/data/finanzasStore'
import { TIPOS_COBERTURA, cantidad, idNuevo, type TablaCobertura, type TipoCobertura } from '@/data/finanzas'

/* Settings → Billing → Coverage Table como en red.dev: plantillas de cobertura (rangos de códigos con su categoría, tipo de
   deducible y lo que paga) que cada plan copia con Copy from template, y sus excepciones. Ver settings-billing.md. */

export const LISTA_COBERTURAS = '/settings/finance/coverage-table'
export const rutaCobertura = (id: string) => `${LISTA_COBERTURAS}/${id}/edit`

/* El editor de la derecha (y, sin `tabla`, la página de alta). Type se elige al crear y después queda fijo. */
export function CoverageTableEditor({ tabla, abrirExcepciones = false }: { tabla?: TablaCobertura; abrirExcepciones?: boolean }) {
  const navigate = useNavigate()
  const { coberturas, guardar } = useFinanzas()
  const [nombre, setNombre] = useState(tabla?.nombre ?? '')
  const [tipo, setTipo] = useState<TipoCobertura>(tabla?.tipo ?? 'Percentage')
  const [rangos, setRangos] = useState(tabla?.rangos ?? [])
  const [intentado, setIntentado] = useState(false)
  const [excepciones, setExcepciones] = useState(abrirExcepciones)
  const [nuevo, setNuevo] = useState<string>()
  const agregarRango = () => {
    const r = rangoVacio()
    setRangos([...rangos, r])
    setNuevo(r.id)
    aviso.info('A new range was added at the end. Complete it and Save.')
  }
  const cambiado = !tabla || nombre.trim() !== tabla.nombre || JSON.stringify(rangos) !== JSON.stringify(tabla.rangos)
  const repetido = !!nombre.trim() && coberturas.some((c) => c.id !== tabla?.id && c.nombre.toLowerCase() === nombre.trim().toLowerCase())

  const guardarTabla = () => {
    if (!nombre.trim() || repetido || !rangos.every(rangoCompleto)) { setIntentado(true); return }
    setIntentado(false)
    const nueva: TablaCobertura = tabla
      ? { ...tabla, nombre: nombre.trim(), rangos }
      : { id: idNuevo(nombre, coberturas.map((c) => c.id)), nombre: nombre.trim(), tipo, rangos, excepciones: [] }
    guardar('coberturas', nueva)
    aviso.ok(`${nueva.nombre} was saved.`)
    if (!tabla) navigate(rutaCobertura(nueva.id))
  }

  return (
    <div className="flex flex-col gap-4">
      {intentado && (!nombre.trim() || !rangos.every(rangoCompleto)) && (
        <Alert tone="danger" title="Uncompleted fields">All required fields marked with (*) must be completed before proceeding</Alert>
      )}
      <div className="flex flex-wrap justify-end gap-2">
        {tabla && (
          <Button variant="secondary" onClick={() => setExcepciones(true)}>
            <ShieldAlert /> Manage Exceptions{tabla.excepciones.length ? ` (${tabla.excepciones.length})` : ''}
          </Button>
        )}
        <Button onClick={agregarRango}><Plus /> Add Range</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:max-w-[560px]">
        <TextField
          label="Name" required placeholder="Insert name" value={nombre} onChange={setNombre}
          error={intentado && !nombre.trim() ? 'This field is required.' : repetido ? 'Another coverage table has this name.' : undefined}
        />
        <SelectField
          label="Type" options={[...TIPOS_COBERTURA]} value={tipo} onChange={(v) => setTipo(v as TipoCobertura)} disabled={!!tabla}
          hint={tabla ? 'Set when the table is created.' : undefined}
        />
      </div>
      <RangesTable tipo={tipo} rangos={rangos} onChange={setRangos} excepciones={tabla?.excepciones} intentado={intentado} nuevo={nuevo} />
      <div className="flex justify-between gap-3">
        <Button variant="secondary" onClick={() => navigate(LISTA_COBERTURAS)}>Cancel</Button>
        <Button disabled={!cambiado} onClick={guardarTabla}>Save</Button>
      </div>

      {excepciones && tabla && (
        <ExceptionsDrawer
          excepciones={tabla.excepciones} tabla={tabla.nombre}
          onClose={() => setExcepciones(false)}
          onGuardar={(lista, cambio) => {
            guardar('coberturas', { ...tabla, excepciones: lista })
            if (cambio === 'added') aviso.ok('The exception was added.')
            else aviso.ok('The exception was removed.', { label: 'Undo', onClick: () => guardar('coberturas', tabla) })
          }}
        />
      )}
    </div>
  )
}

export function SettingsCoverageTables() {
  const { tableId } = useParams()
  const navigate = useNavigate()
  const { coberturas, borrar } = useFinanzas()
  const [q, setQ] = useState('')
  const [tipo, setTipo] = useState<TipoCobertura>('Percentage')
  const elegida = coberturas.find((c) => c.id === tableId)

  const items: ItemMaestro[] = useMemo(() => coberturas
    .filter((c) => (c.tipo === tipo || c.id === tableId) && c.nombre.toLowerCase().includes(q.trim().toLowerCase()))
    .map((c) => ({
      id: c.id, nombre: c.nombre, to: rutaCobertura(c.id),
      acciones: (
        <DropdownMenuItem
          variant="destructive"
          onSelect={() => {
            const deshacer = borrar('coberturas', c.id)
            if (c.id === tableId) navigate(LISTA_COBERTURAS)
            aviso.ok(`${c.nombre} was deleted.`, { label: 'Undo', onClick: deshacer })
          }}
        >
          <Trash2 className="size-4 shrink-0" /> Delete
        </DropdownMenuItem>
      ),
    })), [coberturas, tipo, q, tableId, borrar, navigate])

  if (tableId && !elegida) return <Navigate to={LISTA_COBERTURAS} replace />

  return (
    <div className="px-4 py-6 sm:px-8">
      <SettingsPageHeader
        titulo="Search Coverage Table"
        bajada={elegida ? `${elegida.nombre} · ${elegida.tipo} · ${cantidad(elegida.rangos.length, 'range')}` : 'Coverage templates that each insurance plan copies with Copy from template.'}
        accion={<Button onClick={() => navigate(`${LISTA_COBERTURAS}/new`)}><Plus /> New Coverage Table</Button>}
      />
      <div className={cn(TARJETA_PANEL, 'mt-5 grid gap-6 p-4 sm:p-5 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start')}>
        <MasterList
          items={items} elegido={tableId} q={q} onQ={setQ} placeholder="Search a Coverage Table Here..."
          vacio={`No ${tipo.toLowerCase()} coverage tables match.`}
          filtro={<SelectField hideLabel label="Type" options={[...TIPOS_COBERTURA]} value={tipo} onChange={(v) => setTipo(v as TipoCobertura)} />}
        />
        <div className="min-w-0">
          {elegida
            ? <CoverageTableEditor key={elegida.id} tabla={elegida} />
            : <EmptyState icon={ListChecks} title="No Coverage Table Found" detail="Select an existing Coverage Table from the list on the left or create a new one by clicking the Create New button" className="py-16" />}
        </div>
      </div>
    </div>
  )
}

export function SettingsNewCoverageTable() {
  return (
    <div className="px-4 py-6 sm:px-8">
      <SettingsPageHeader titulo="Coverage Table" bajada="Add the code ranges and what the plan pays for each one." />
      <div className={cn(TARJETA_PANEL, 'mt-5 p-4 sm:p-5')}>
        <CoverageTableEditor />
      </div>
    </div>
  )
}
