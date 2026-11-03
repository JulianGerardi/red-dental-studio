import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Building2, Plus, RefreshCw } from 'lucide-react'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Pill } from '@/components/ui/pill'
import { Checkbox } from '@/components/ui/checkbox'
import { EmptyState } from '@/components/ui/empty-state'
import { FilterMenu } from '@/components/ui/filter-menu'
import { ShowMore } from '@/components/ui/show-more'
import { DrawerActions, DrawerSection } from '@/components/ui/drawer'
import { InnerCard } from '@/components/dashboard/primitives'
import { SettingsSearch } from '@/components/settings/SettingsSearch'
import { ModalShell, SelectField, TextField } from '@/components/patients/form'
import { PhoneFields } from '@/components/finance/fields'
import { useFormPasos } from '@/lib/useFormPasos'
import { useFinanzas } from '@/data/finanzasStore'
import { PAISES, ESTADOS } from '@/data/location-options'
import { TELEFONO_VACIO, esNorteamerica, type Telefono } from '@/data/finanzas'
import {
  TIPOS_FISCALES, NPI_VALIDO, FISCAL_VALIDO, textoDireccion, textoTelefono, type TipoFiscal,
} from '@/data/billingProfiles'

/* Piezas compartidas del Insurance / Billing Profile de Location y de provider. Ver figma/modulos/billing-profile.md. */

export type EstadoPerfil = 'Not configured' | 'Pending activation' | 'Active' | 'Inactive'

export function EstadoPerfilPill({ estado }: { estado: EstadoPerfil }) {
  const tono = estado === 'Active' ? 'success' : estado === 'Pending activation' ? 'warning' : 'neutral'
  return <Pill tone={tono}>{estado}</Pill>
}

/* Un dato del perfil en modo lectura: rótulo gris y valor. */
export function DatoPerfil({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-medium text-ink-muted">{titulo}</dt>
      <dd className="mt-1 text-[13px] leading-relaxed break-words text-ink">{children}</dd>
    </div>
  )
}

/* Dirección o teléfono de billing: se conserva, se elige otro del mismo titular (sólo Location) o se registra uno nuevo.
   El anterior nunca se borra. Con contactos guardados, Replace abre un menú; si no, va directo al drawer. */
export function ContactoCard({
  titulo, valor, nuevo, opciones, onElegir, onReemplazar, disabled,
}: {
  titulo: string
  valor: string
  /** Se cargó en esta pantalla y todavía no se guardó. */
  nuevo?: boolean
  /** Los contactos que ya tiene el titular. */
  opciones?: string[]
  onElegir?: (v: string) => void
  onReemplazar: () => void
  disabled?: boolean
}) {
  const otros = (opciones ?? []).filter((o) => o !== valor)
  const esDireccion = titulo.includes('address')
  const boton = (
    <Button variant="secondary" size="sm" disabled={disabled} aria-label={`Replace ${titulo.toLowerCase()}`} onClick={otros.length && onElegir ? undefined : onReemplazar}>
      <RefreshCw /> Replace
    </Button>
  )
  return (
    <InnerCard className="flex flex-col gap-3 p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-ink-muted">{titulo}</span>
        {otros.length && onElegir ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>{boton}</DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[280px]">
              <DropdownMenuLabel>{esDireccion ? 'Saved addresses' : 'Saved phone numbers'}</DropdownMenuLabel>
              {otros.map((o) => (
                <DropdownMenuItem key={o} onSelect={() => onElegir(o)} className="whitespace-pre-line">{o}</DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={onReemplazar}>
                <Plus className="size-4 shrink-0" /> {esDireccion ? 'Add a new address' : 'Add a new phone number'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : boton}
      </div>
      <p className="text-[13px] leading-relaxed whitespace-pre-line text-ink">{valor}</p>
      {nuevo && <Pill tone="warning" size="sm" className="self-start">New · not saved</Pill>}
    </InnerCard>
  )
}

/* ── Drawer: registrar una dirección o un teléfono nuevo ─────────────── */

const DIRECCION_VACIA = { linea1: '', linea2: '', pais: PAISES[0], estado: '', ciudad: '', zip: '' }

export function ReplaceContactDrawer({
  tipo, onClose, onUsar,
}: {
  tipo: 'direccion' | 'telefono'
  onClose: () => void
  /** Devuelve el contacto ya formateado. */
  onUsar: (valor: string) => void
}) {
  const { d, set, falta, listo } = useFormPasos(DIRECCION_VACIA, [['linea1', 'pais', 'estado', 'ciudad', 'zip']])
  const [tel, setTel] = useState<Telefono>(TELEFONO_VACIO)
  const [intentado, setIntentado] = useState(false)
  const nanp = esNorteamerica(tel.codigo)
  const erroresTel = intentado ? {
    area: nanp && tel.area.length !== 3 ? 'Enter the 3-digit area code.' : undefined,
    numero: nanp ? (tel.numero.length !== 7 ? 'Enter the 7-digit number.' : undefined) : tel.numero.length < 6 ? 'Enter a valid phone number.' : undefined,
  } : undefined

  const usar = () => {
    if (tipo === 'direccion') {
      if (!listo()) return
      onUsar(textoDireccion({ ...d, pais: d.pais.replace(' of America (the)', '') }))
    } else {
      setIntentado(true)
      const ok = nanp ? tel.area.length === 3 && tel.numero.length === 7 : tel.numero.length >= 6
      if (!ok) return
      onUsar(textoTelefono(tel))
    }
    onClose()
  }

  const direccion = tipo === 'direccion'
  return (
    <ModalShell
      title={direccion ? 'Replace billing address' : 'Replace billing phone number'}
      description={`The current ${direccion ? 'address' : 'phone number'} is kept. The new one applies when you save the billing profile.`}
      onClose={onClose}
      width="max-w-[480px]"
      actions={<DrawerActions onCancel={onClose} onSave={usar} saveLabel={direccion ? 'Use new address' : 'Use new phone'} />}
    >
      {direccion ? (
        <DrawerSection title="Address Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Address Line 1" required placeholder="Street name and number" value={d.linea1} onChange={set('linea1')} error={falta('linea1')} />
            <TextField label="Address Line 2" placeholder="Suite, unit" value={d.linea2} onChange={set('linea2')} />
            <SelectField label="Country" required options={PAISES} value={d.pais} onChange={set('pais')} error={falta('pais')} />
            <SelectField label="State" required placeholder="Select your region" options={ESTADOS} value={d.estado} onChange={set('estado')} error={falta('estado')} />
            <TextField label="City" required placeholder="Your city" value={d.ciudad} onChange={set('ciudad')} error={falta('ciudad')} />
            <TextField label="ZIP Code" required placeholder="Postal code (only numbers)" value={d.zip} onChange={(v) => set('zip')(v.replace(/\D/g, '').slice(0, 10))} error={falta('zip')} />
          </div>
        </DrawerSection>
      ) : (
        <DrawerSection title="Contact Information">
          <PhoneFields required value={tel} onChange={setTel} errores={erroresTel} />
        </DrawerSection>
      )}
    </ModalShell>
  )
}

/* ── Credenciales de billing de una Location: NPI y TIN/SSN ───────────── */

export type Credenciales = { npi: string; tipoFiscal: TipoFiscal; fiscal: string }
export type ErroresCredenciales = { npi?: string; fiscal?: string }

export const validarCredenciales = (c: Credenciales): ErroresCredenciales => ({
  npi: NPI_VALIDO(c.npi) ? undefined : 'Enter the 10-digit NPI.',
  fiscal: FISCAL_VALIDO(c.fiscal) ? undefined : 'Enter the 9-digit tax identification number.',
})

export function CamposCredenciales({
  valor, onChange, errores,
}: { valor: Credenciales; onChange: (c: Credenciales) => void; errores?: ErroresCredenciales }) {
  const digitos = (k: 'npi' | 'fiscal', max: number) => (v: string) => onChange({ ...valor, [k]: v.replace(/\D/g, '').slice(0, max) })
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <TextField label="NPI" required placeholder="10 digits" value={valor.npi} onChange={digitos('npi', 10)} error={errores?.npi} />
      <SelectField label="Tax identification type" required options={TIPOS_FISCALES} value={valor.tipoFiscal} onChange={(v) => onChange({ ...valor, tipoFiscal: v as TipoFiscal })} />
      <TextField label="Tax identification number" required placeholder="9 digits" value={valor.fiscal} onChange={digitos('fiscal', 9)} error={errores?.fiscal} />
    </div>
  )
}

export function CredentialsDrawer({
  inicial, onClose, onGuardar,
}: { inicial: Credenciales; onClose: () => void; onGuardar: (c: Credenciales) => boolean }) {
  const [c, setC] = useState(inicial)
  const [errores, setErrores] = useState<ErroresCredenciales>({})
  const guardar = () => {
    const e = validarCredenciales(c)
    setErrores(e)
    if (e.npi || e.fiscal) return
    if (onGuardar(c)) onClose()
  }
  return (
    <ModalShell
      title="Billing credentials"
      description="The NPI and tax identification this location bills with. They're saved apart from the name and contacts."
      onClose={onClose}
      width="max-w-[480px]"
      actions={<DrawerActions onCancel={onClose} onSave={guardar} saveLabel="Save credentials" />}
    >
      <DrawerSection title="Credentials">
        <CamposCredenciales valor={c} onChange={setC} errores={errores} />
      </DrawerSection>
    </ModalShell>
  )
}

/* ── Contracted With ─────────────────────────────────────────────────── */

const ESTADOS_CONTRATO = ['All', 'Contracted', 'Not contracted'] as const
type EstadoContrato = (typeof ESTADOS_CONTRATO)[number]
const LETRAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

/* Los carriers de la account (los de Settings → Billing → Carriers) con su casilla de contratado. Buscar, filtrar o
   saltar por letra nunca pierde lo marcado sin guardar. Se guarda aparte del resto del perfil (CON-4006, CON-4027). */
export function ContractedWith({
  guardados, editable, onGuardar, onDirtyChange,
}: {
  guardados: Record<string, boolean>
  editable: boolean
  onGuardar: (contratos: Record<string, boolean>) => boolean
  onDirtyChange?: (sucio: boolean) => void
}) {
  const { aseguradoras } = useFinanzas()
  const [borrador, setBorrador] = useState(guardados)
  const [q, setQ] = useState('')
  const [estado, setEstado] = useState<EstadoContrato>('All')
  const [letra, setLetra] = useState('')

  const valor = (id: string) => borrador[id] ?? false
  const sucio = aseguradoras.some((a) => valor(a.id) !== (guardados[a.id] ?? false))
  useEffect(() => { onDirtyChange?.(sucio) }, [sucio, onDirtyChange])

  const ordenados = useMemo(() => [...aseguradoras].sort((a, b) => a.nombre.localeCompare(b.nombre)), [aseguradoras])
  const porEstado = (e: EstadoContrato) => (a: { id: string }) => e === 'All' || (e === 'Contracted') === valor(a.id)
  const buscados = ordenados.filter((a) => a.nombre.toLowerCase().includes(q.trim().toLowerCase()))
  const base = buscados.filter(porEstado(estado))
  const visibles = base.filter((a) => !letra || a.nombre[0].toUpperCase() === letra)
  const contratados = aseguradoras.filter((a) => valor(a.id)).length
  const filtrado = !!q.trim() || estado !== 'All' || !!letra
  const limpiar = () => { setQ(''); setEstado('All'); setLetra('') }

  const fila = (a: (typeof ordenados)[number], i: number, lista: typeof ordenados) => {
    const inicial = a.nombre[0].toUpperCase()
    const encabezado = i === 0 || lista[i - 1].nombre[0].toUpperCase() !== inicial
    const on = valor(a.id)
    const alternar = (v: boolean) => editable && setBorrador((p) => ({ ...p, [a.id]: v }))
    return (
      <div key={a.id}>
        {encabezado && (
          <p className="mt-3 rounded-md bg-surface-alt px-3 py-1.5 text-[11px] font-semibold text-ink-muted first:mt-0">{inicial}</p>
        )}
        <div className="flex items-center gap-3 border-b border-line-row px-3 py-3 last:border-0">
          <Checkbox on={on} onChange={alternar} label={`${a.nombre} contracted`} disabled={!editable} />
          <span
            onClick={() => alternar(!on)}
            className={cn('min-w-0 flex-1 text-[13px] text-ink', editable && 'cursor-pointer')}
          >
            <span className="block truncate">{a.nombre}</span>
            <span className="block text-[11px] text-ink-faint">Payer ID {a.payerId}</span>
          </span>
          <Pill tone={on ? 'success' : 'neutral'} size="sm" className="shrink-0">{on ? 'Contracted' : 'Not contracted'}</Pill>
        </div>
      </div>
    )
  }

  return (
    <section className="rounded-lg bg-white p-4 shadow-panel sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-ink">Contracted With</h2>
          <p className="mt-1 text-xs text-ink-muted">Mark the carriers this billing profile has a contract with.</p>
        </div>
        <Pill tone="info">{contratados} contracted</Pill>
      </div>

      {aseguradoras.length === 0 ? (
        <EmptyState icon={Building2} title="No carriers have been configured for this account." detail="Add carriers in Settings › Billing › Carriers." className="py-12" />
      ) : (
        <>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <SettingsSearch value={q} onChange={setQ} placeholder="Search carriers" />
            <FilterMenu
              label="Filter carriers"
              groups={[{
                title: 'Contracted status',
                type: 'single',
                options: ESTADOS_CONTRATO.map((e) => ({ value: e, count: buscados.filter(porEstado(e)).length })),
                value: estado,
                onChange: (v) => setEstado(v as EstadoContrato),
                defaultValue: 'All',
              }]}
              result={`${base.length} of ${aseguradoras.length} carriers`}
            />
          </div>

          {/* Saltar por letra: las que no tienen carriers con el filtro de arriba quedan apagadas. */}
          <div role="group" aria-label="Filter by first letter" className="mt-3 flex flex-wrap gap-1 border-t border-line-row pt-3">
            {['All', ...LETRAS].map((l) => {
              const activa = l === 'All' ? !letra : letra === l
              const vacia = l !== 'All' && !base.some((a) => a.nombre[0].toUpperCase() === l)
              return (
                <button
                  key={l}
                  type="button"
                  aria-pressed={activa}
                  disabled={vacia}
                  onClick={() => setLetra(l === 'All' ? '' : l)}
                  className={cn(
                    'focus-visible:outline-dash-blue flex h-7 min-w-7 items-center justify-center rounded-md px-1.5 text-[12px] font-medium transition-colors',
                    activa ? 'bg-dash-blue text-white' : 'text-dash-blue hover:bg-info-bg',
                    'disabled:pointer-events-none disabled:text-ink-faint/60',
                  )}
                >
                  {l}
                </button>
              )
            })}
          </div>

          <div className="mt-2 flex items-center justify-between gap-3 border-b border-line-row pb-2 text-xs text-ink-muted">
            <span aria-live="polite">{visibles.length} of {aseguradoras.length} carriers</span>
            {filtrado && <Button variant="link" size="sm" className="h-auto px-0" onClick={limpiar}>Clear filters</Button>}
          </div>

          {visibles.length === 0 ? (
            <EmptyState title="No carriers match your search or filters." className="py-10" />
          ) : (
            <ShowMore total={visibles.length} limit={8} label="carriers" className="mt-3">
              {(n) => visibles.slice(0, n).map((a, i, lista) => fila(a, i, lista))}
            </ShowMore>
          )}
        </>
      )}

      <p className="mt-4 text-[11px] leading-relaxed text-ink-muted">
        Not contracted means it isn't set as contracted in Confidentally. Participation with the carrier isn't verified automatically.
      </p>

      {editable && aseguradoras.length > 0 && (
        <AccionesGuardado
          sucio={sucio}
          aviso="Unsaved contract changes"
          onCancel={() => setBorrador(guardados)}
          onSave={() => { if (onGuardar(borrador)) setBorrador(borrador) }}
          saveLabel="Save carrier contracts"
        />
      )}
    </section>
  )
}

/* El pie de una card del perfil: aviso de cambios sin guardar, Cancel y Save. */
export function AccionesGuardado({
  sucio, aviso, onCancel, onSave, saveLabel, siempre = true,
}: {
  sucio: boolean
  aviso: string
  onCancel: () => void
  onSave: () => void
  saveLabel: string
  /** false: sólo aparece con cambios. */
  siempre?: boolean
}) {
  if (!siempre && !sucio) return null
  return (
    <div className="mt-4 flex flex-wrap items-center justify-end gap-3 border-t border-line-row pt-4">
      {sucio && <span className="mr-auto text-xs font-medium text-warn-fg">{aviso}</span>}
      <Button variant="secondary" onClick={onCancel} disabled={!sucio}>Cancel</Button>
      <Button onClick={onSave}>{saveLabel}</Button>
    </div>
  )
}
