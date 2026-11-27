import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ListChecks, Plus, ShieldAlert } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { BillingHeader } from '@/components/finance/BillingHeader'
import { SelectField, TextField } from '@/components/patients/form'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { aviso } from '@/components/ui/toaster'
import { Tabs } from '@/components/ui/tabs'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { EncabezadoEditor, GRILLA_LISTA_EDITOR, ItemLista, PanelLista, PieEditor, TARJETA_EDITOR } from '@/components/settings/ListaEditor'
import { RangesTable, rangoCompleto, rangoVacio } from '@/components/finance/RangesTable'
import { ExceptionsDrawer } from '@/components/finance/ExceptionsDrawer'
import { PADDING_PAGINA } from '@/lib/estilos'
import { useFinanzas } from '@/data/finanzasStore'
import { TIPOS_COBERTURA, idNuevo, type TablaCobertura, type TipoCobertura } from '@/data/finanzas'
import { OBLIGATORIO } from '@/lib/validacion'

/* Settings → Billing → Coverage Table como en red.dev: plantillas de cobertura (rangos de códigos con su categoría, tipo de
   deducible y lo que paga) que cada plan copia con Copy from template, y sus excepciones. Ver settings-billing.md. */

export const LISTA_COBERTURAS = '/settings/finance/coverage-table'
export const rutaCobertura = (id: string) => `${LISTA_COBERTURAS}/${id}/edit`
/* Las pestañas de la lista: Percentage primero, como el selector que reemplazan. */
const PESTANAS_TIPO: readonly TipoCobertura[] = ['Percentage', 'Copayment']

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
    <section aria-label={tabla ? 'Edit coverage table' : 'New coverage table'} className={TARJETA_EDITOR}>
      {tabla && <EncabezadoEditor titulo={tabla.nombre} activo={tabla.activo !== false} />}
      {intentado && (!nombre.trim() || !rangos.every(rangoCompleto)) && (
        <Alert tone="danger" title="Uncompleted fields">All required fields marked with (*) must be completed before proceeding</Alert>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:max-w-[560px]">
        <TextField
          label="Name" required placeholder="Insert name" value={nombre} onChange={setNombre}
          error={intentado && !nombre.trim() ? OBLIGATORIO : repetido ? 'Another coverage table has this name.' : undefined}
        />
        <SelectField
          label="Type" options={[...TIPOS_COBERTURA]} value={tipo} onChange={(v) => setTipo(v as TipoCobertura)} disabled={!!tabla}
          hint={tabla ? 'Set when the table is created.' : undefined}
        />
      </div>
      {/* Las acciones de la tabla, justo encima y a la derecha (settings-billing.md, 2026-11-24). */}
      <div className="-mb-2 flex flex-wrap justify-end gap-2">
        {tabla && (
          <Button variant="secondary" onClick={() => setExcepciones(true)}>
            <ShieldAlert /> Manage exceptions{tabla.excepciones.length ? ` (${tabla.excepciones.length})` : ''}
          </Button>
        )}
        <Button onClick={agregarRango}><Plus /> Add range</Button>
      </div>
      <RangesTable tipo={tipo} rangos={rangos} onChange={setRangos} excepciones={tabla?.excepciones} intentado={intentado} nuevo={nuevo} />
      <PieEditor onCancelar={() => navigate(LISTA_COBERTURAS)} onGuardar={guardarTabla} guardarDeshabilitado={!cambiado} />

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
    </section>
  )
}

export function SettingsCoverageTables() {
  const { tableId } = useParams()
  const navigate = useNavigate()
  const { coberturas, guardar, borrar } = useFinanzas()
  const [q, setQ] = useState('')
  const elegida = coberturas.find((c) => c.id === tableId)
  const [tipo, setTipo] = useState<TipoCobertura>(elegida?.tipo ?? 'Percentage')
  const [aBorrar, setABorrar] = useState<TablaCobertura>()

  /* Se entra a una tabla del otro tipo (un link desde un plan): la pestaña la sigue. */
  useEffect(() => { if (elegida) setTipo(elegida.tipo) }, [elegida?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  /* Búsqueda y pestaña juntas: sólo se busca en el tipo elegido. */
  const visibles = coberturas.filter((c) => c.tipo === tipo && c.nombre.toLowerCase().includes(q.trim().toLowerCase()))

  /* Cambiar de pestaña abre la primera tabla de ese tipo, como al entrar a una lista. */
  const cambiarTipo = (t: TipoCobertura) => {
    setTipo(t)
    const primera = coberturas.find((c) => c.tipo === t)
    navigate(primera ? rutaCobertura(primera.id) : LISTA_COBERTURAS)
  }

  const alternar = (c: TablaCobertura) => {
    const activa = c.activo !== false
    guardar('coberturas', { ...c, activo: !activa })
    aviso.ok(`${c.nombre} was ${activa ? 'deactivated' : 'activated'}.`)
  }

  const confirmarBorrado = (c: TablaCobertura) => {
    setABorrar(undefined)
    /* Si era la abierta, la guarda de abajo pasa a la primera que queda en la pestaña, como en Consents. */
    const deshacer = borrar('coberturas', c.id)
    aviso.ok(`${c.nombre} was deleted.`, { label: 'Undo', onClick: deshacer })
  }

  /* Una tabla que ya no está (recién borrada o un link viejo): la primera de la pestaña o, sin ninguna, la lista. */
  if (tableId && !elegida) {
    const primera = coberturas.find((c) => c.tipo === tipo)
    return <Navigate to={primera ? rutaCobertura(primera.id) : LISTA_COBERTURAS} replace />
  }

  return (
    <div className={cn('@container', PADDING_PAGINA)}>
      <BillingHeader accion={<Button size="md" onClick={() => navigate(`${LISTA_COBERTURAS}/new`)}><Plus /> New coverage table</Button>} />
      <div className={GRILLA_LISTA_EDITOR}>
        <PanelLista
          titulo="Coverage tables" q={q} onQ={setQ} placeholder="Search coverage tables" vacio={visibles.length === 0}
          pestanas={<Tabs aria-label="Coverage table type" size="sm" fullWidth tabs={PESTANAS_TIPO} value={tipo} onChange={cambiarTipo} />}
        >
          {visibles.map((c) => (
            <ItemLista
              key={c.id} nombre={c.nombre} activo={c.activo !== false} elegido={c.id === tableId} to={rutaCobertura(c.id)}
              onAlternar={() => alternar(c)} onBorrar={() => setABorrar(c)}
            />
          ))}
        </PanelLista>
        {elegida
          ? <CoverageTableEditor key={elegida.id} tabla={elegida} />
          : (
            <div className={TARJETA_EDITOR}>
              <EmptyState icon={ListChecks} title="No coverage table found" detail="Select a coverage table from the list on the left or create one with New coverage table." className="py-16" />
            </div>
          )}
      </div>
      {aBorrar && (
        <ConfirmDialog
          title="Delete coverage table?" tone="danger" icon="delete" confirmLabel="Delete"
          onCancel={() => setABorrar(undefined)} onConfirm={() => confirmarBorrado(aBorrar)}
        >
          “{aBorrar.nombre}” will be removed from the list.
        </ConfirmDialog>
      )}
    </div>
  )
}

export function SettingsNewCoverageTable() {
  return (
    <div className={PADDING_PAGINA}>
      <SettingsPageHeader titulo="New coverage table" />
      <div className="mt-5"><CoverageTableEditor /></div>
    </div>
  )
}
