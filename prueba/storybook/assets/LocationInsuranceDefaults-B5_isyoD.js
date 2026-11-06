import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Check, ChevronDown, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { aviso } from '@/components/ui/toaster'
import { Card, Toggle } from '@/components/settings/primitives'
import { OpcionDireccion } from '@/components/patients/AddRelationshipDrawer'
import { FieldError, FieldLabel, FormFooter, SelectField, control } from '@/components/patients/form'
import { useBillingProfiles } from '@/data/billingProfilesStore'
import { EMPLEADOS } from '@/data/employees'
import { LOCACIONES } from '@/pages/settings/Locations'
import {
  PLACES, ROTULO_REFERENCIA, normalizarDefaults, textoLugar, type DefaultsSeguro, type Referencia,
} from '@/data/insuranceDefaults'

/* Location → Insurance Defaults (epic CON-1173): Billing Provider (CON-3894), Rendering Provider (CON-3896), PPO
   Write-offs (CON-4030), Place of Service (CON-3898) y autorización de nuevos subscribers (CON-3899). Todo se guarda
   junto con un solo Save, como en el prototipo. Los tres selectores de referencia se despliegan debajo del campo. Ver figma/modulos/insurance-defaults.md. */

type Campo = 'billing' | 'rendering' | 'place'
type Errores = Partial<Record<Campo, string>>

const NO_DISPONIBLE = {
  billing: 'The selected billing profile is no longer available. Select another billing profile.',
  rendering: 'The selected rendering provider is no longer available. Select another provider.',
}

const nombreLocacion = (id: string) => LOCACIONES.find((l) => l.id === id)?.nombre ?? id
const nombreEmpleado = (id: string) => EMPLEADOS.find((e) => e.id === id)?.nombre ?? id

export function LocationInsuranceDefaults({ locId, onDirtyChange }: { locId: string; onDirtyChange?: (sucio: boolean) => void }) {
  const { defaultsDe, guardarDefaults, providerElegible, perfilElegible } = useBillingProfiles()
  const guardado = defaultsDe(locId)
  const [d, setD] = useState<DefaultsSeguro>(guardado)
  const [errores, setErrores] = useState<Errores>({})
  const set = <K extends keyof DefaultsSeguro>(k: K, v: DefaultsSeguro[K]) => setD((p) => ({ ...p, [k]: v }))

  /* Cambiar de modo y volver no pierde lo elegido: lo que no aplica al modo recién se limpia al guardar (CON-3894 › 3.4). */
  const sucio = JSON.stringify(normalizarDefaults(d)) !== JSON.stringify(normalizarDefaults(guardado))
  useEffect(() => { onDirtyChange?.(sucio) }, [sucio, onDirtyChange])

  const especificoBilling = d.billingMode === 'PROFILE'
  const campoBilling = especificoBilling ? 'billingProfileId' : 'alternateBillingId'
  const perfilElegido = d[campoBilling]
  const especificoRendering = d.renderingMode === 'PROVIDER'
  const campoRendering = especificoRendering ? 'renderingId' : 'alternateRenderingId'
  const providerElegido = d[campoRendering]

  const providers = useMemo(() => EMPLEADOS.filter((e) => providerElegible(e.id)), [providerElegible])
  const lugar = PLACES.find((p) => p.id === d.placeId)

  /* Las referencias se vuelven a validar al guardar (CON-3894 › 4, CON-3896 › 4.2, CON-3898 › 4). */
  const validar = (n: DefaultsSeguro): Errores => {
    const e: Errores = {}
    const bid = n.billingProfileId ?? n.alternateBillingId
    if (n.billingMode === 'PROFILE' && !n.billingProfileId) e.billing = 'Select a billing profile before saving.'
    else if (bid && !perfilElegible(bid)) e.billing = NO_DISPONIBLE.billing
    const rid = n.renderingId ?? n.alternateRenderingId
    if (n.renderingMode === 'PROVIDER' && !n.renderingId) e.rendering = 'Select a rendering provider before saving.'
    else if (rid && !providerElegible(rid)) e.rendering = NO_DISPONIBLE.rendering
    if (!n.placeId) e.place = 'Select a default Place of Service before saving.'
    else if (!PLACES.some((p) => p.id === n.placeId && p.active)) e.place = 'Select an active Place of Service.'
    return e
  }

  const guardar = () => {
    const n = normalizarDefaults(d)
    const e = validar(n)
    setErrores(e)
    const primero = (['billing', 'rendering', 'place'] as const).find((k) => e[k])
    /* El foco va al primer control con error (en Rendering y Place, el botón de adentro de SelectField). */
    if (primero) { document.querySelector<HTMLElement>(\`#defaults-\${primero}, #defaults-\${primero}-campo button\`)?.focus(); return }
    if (!sucio) { aviso.info('There are no changes to save.'); return }
    setD(guardarDefaults(locId, n))
    aviso.ok('Insurance defaults saved.')
  }

  const cancelar = () => { setD(guardado); setErrores({}) }
  const limpiarError = (k: Campo) => setErrores((p) => (p[k] ? { ...p, [k]: undefined } : p))

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <Encabezado titulo="Billing Provider" bajada="Select the provider or entity to identify as the billing provider on claims." />
        <Opciones
          etiqueta="Billing Provider"
          valor={d.billingMode}
          opciones={[['PROCEDURES', 'Provider of Procedures'], ['PROFILE', 'Specific Billing Profile']]}
          onChange={(v) => { set('billingMode', v); limpiarError('billing') }}
        />
        <Referencia
          rotulo={especificoBilling ? 'Billing Profile' : 'Alternate Billing Profile'}
          requerido={especificoBilling}
          onLimpiar={!especificoBilling && perfilElegido ? () => set('alternateBillingId', null) : undefined}
        >
          <SelectorPerfil
            rotulo={especificoBilling ? 'Billing Profile' : 'Alternate Billing Profile'}
            elegido={perfilElegido}
            error={!!errores.billing}
            onElegir={(clave) => { set(campoBilling, clave); limpiarError('billing') }}
          />
          <FieldError>{errores.billing ?? (perfilElegido && !perfilElegible(perfilElegido) ? NO_DISPONIBLE.billing : undefined)}</FieldError>
        </Referencia>
      </Card>

      <Card>
        <Encabezado titulo="Rendering Provider" bajada="Select the provider to identify as the treating provider on claims." />
        <Opciones
          etiqueta="Rendering Provider"
          valor={d.renderingMode}
          opciones={[['PROCEDURES', 'Provider of Procedures'], ['PROVIDER', 'Specific Provider']]}
          onChange={(v) => { set('renderingMode', v); limpiarError('rendering') }}
        />
        {!especificoRendering && (
          <Casilla on={d.usePatientPrimary} onChange={(v) => set('usePatientPrimary', v)} className="mt-4">
            Use the patient's Primary Provider
          </Casilla>
        )}
        <Referencia
          rotulo={especificoRendering ? 'Rendering Provider' : 'Alternate Rendering Provider'}
          requerido={especificoRendering}
          onLimpiar={!especificoRendering && providerElegido ? () => set('alternateRenderingId', null) : undefined}
        >
          <div id="defaults-rendering-campo">
            <SelectField
              label={especificoRendering ? 'Rendering Provider' : 'Alternate Rendering Provider'}
              hideLabel
              placeholder="Select a provider"
              buscable
              buscarPlaceholder="Search by name"
              options={providers.map((p) => p.nombre)}
              value={providerElegido ? nombreEmpleado(providerElegido) : ''}
              onChange={(v) => { set(campoRendering, EMPLEADOS.find((e) => e.nombre === v)?.id ?? null); limpiarError('rendering') }}
              error={errores.rendering ?? (providerElegido && !providerElegible(providerElegido) ? NO_DISPONIBLE.rendering : undefined)}
            />
          </div>
        </Referencia>
      </Card>

      <Card>
        <Encabezado titulo="PPO Write-offs or Contracted Amounts" bajada="Choose whose carrier contracts are used to calculate PPO write-offs or contracted amounts." />
        <Opciones
          etiqueta="Contract reference"
          valor={d.contractCalculation}
          opciones={[['BILLING', 'Billing Provider'], ['RENDERING', 'Rendering Provider']]}
          onChange={(v) => set('contractCalculation', v)}
        />
        <div className="mt-5 flex flex-wrap items-start justify-between gap-4 border-t border-line-row pt-4">
          <div className="min-w-0 max-w-[640px]">
            <p className="text-[13px] font-semibold text-ink">Warn when the selected provider is not contracted</p>
            {/* Una sola referencia para el cálculo y para el aviso (CON-4030 › CA-11). */}
            <p className="mt-1 text-xs leading-relaxed text-ink-muted" aria-live="polite">
              Show a warning when the {d.contractCalculation === 'BILLING' ? 'Billing' : 'Rendering'} Provider used for PPO
              write-offs or contracted amounts is not contracted with the patient's insurance carrier.
            </p>
          </div>
          <Toggle on={d.warnUncontracted} onChange={(v) => set('warnUncontracted', v)} ariaLabel="Warn when the selected provider is not contracted" />
        </div>
      </Card>

      <Card>
        <Encabezado titulo="Place of Service" bajada="Select the type of setting where services were rendered." />
        <div id="defaults-place-campo" className="mt-4 sm:w-1/2 sm:pr-2">
          <SelectField
            label="Default Place of Service"
            required
            buscable
            buscarPlaceholder="Search by name or code"
            options={PLACES.filter((p) => p.active).map(textoLugar)}
            value={lugar ? textoLugar(lugar) : ''}
            onChange={(v) => { set('placeId', PLACES.find((p) => textoLugar(p) === v)?.id ?? null); limpiarError('place') }}
            error={errores.place}
          />
        </div>
      </Card>

      <Card>
        <Encabezado titulo="Default Authorization for New Subscribers" bajada="Choose which authorization options are selected by default for new subscribers." />
        <div className="mt-4 flex flex-col gap-3">
          <Casilla on={d.defaultReleaseInfo} onChange={(v) => set('defaultReleaseInfo', v)}>Release of Information</Casilla>
          <Casilla on={d.defaultAssignBenefits} onChange={(v) => set('defaultAssignBenefits', v)}>Assignment of Benefits</Casilla>
        </div>
      </Card>

      {/* Un solo guardado para toda la pestaña, al final, como Information. */}
      <div className="flex flex-wrap items-center justify-end gap-3">
        {sucio && <span className="mr-auto text-xs font-medium text-warn-fg">Unsaved changes</span>}
        <FormFooter onCancel={cancelar} onSave={guardar} saveLabel="Save changes" />
      </div>
    </div>
  )
}

function Encabezado({ titulo, bajada }: { titulo: string; bajada: string }) {
  return (
    <div className="max-w-[640px]">
      <h2 className="text-sm font-bold text-ink">{titulo}</h2>
      <p className="mt-1 text-xs leading-relaxed text-ink-muted">{bajada}</p>
    </div>
  )
}

function Opciones<T extends string>({ etiqueta, valor, opciones, onChange }: {
  etiqueta: string
  valor: T
  opciones: [T, string][]
  onChange: (v: T) => void
}) {
  return (
    <div role="radiogroup" aria-label={etiqueta} className="mt-4 grid gap-3 sm:grid-cols-2">
      {opciones.map(([v, texto]) => (
        <OpcionDireccion key={v} texto={texto} elegida={valor === v} onElegir={() => onChange(v)} />
      ))}
    </div>
  )
}

/* Casilla con su texto al lado: el label hace clickeable todo el renglón. */
function Casilla({ on, onChange, children, className }: { on: boolean; onChange: (v: boolean) => void; children: string; className?: string }) {
  return (
    <label className={cn('flex w-fit cursor-pointer items-center gap-2.5 text-[13px] text-ink', className)}>
      <Checkbox on={on} onChange={onChange} label={children} />
      {children}
    </label>
  )
}

/* El rótulo de un selector de referencia, con "Clear" cuando es opcional y hay algo elegido (CON-3894 › 3.2 Quitar). */
function Referencia({ rotulo, requerido, onLimpiar, children }: {
  rotulo: string
  requerido: boolean
  onLimpiar?: () => void
  children: ReactNode
}) {
  return (
    <div className="mt-4 flex flex-col gap-2 sm:max-w-[560px]">
      <div className="flex items-center justify-between gap-3">
        <FieldLabel required={requerido}>
          {rotulo}{!requerido && <span className="font-normal text-ink-muted"> (optional)</span>}
        </FieldLabel>
        {onLimpiar && (
          <Button variant="link" size="sm" onClick={onLimpiar} aria-label={\`Clear \${rotulo}\`}>Clear</Button>
        )}
      </div>
      {children}
    </div>
  )
}

/* Nombre de facturación, dirección y, sólo si difiere del nombre, la organización titular (CON-3894 › 3.3, CA-08). */
function ResumenPerfil({ clave }: { clave: string }) {
  const { perfiles } = useBillingProfiles()
  const p = perfiles[clave]
  const org = clave.startsWith('loc:') ? nombreLocacion(clave.slice(4)) : ''
  return (
    <span className="flex min-w-0 flex-col gap-0.5">
      <span className="text-[13px] font-medium text-ink">{p.nombre}</span>
      <span className="text-xs leading-relaxed whitespace-pre-line text-ink-muted">{p.direccion}</span>
      {org && org !== p.nombre && <span className="text-xs text-ink-muted">{org}</span>}
    </span>
  )
}

/* Billing Profile: un desplegable debajo del campo, como SelectField, pero cada opción lleva nombre, dirección y
   organización (hace falta para distinguir perfiles) y van agrupadas por titular. Sólo los elegibles de la account. */
function SelectorPerfil({ rotulo, elegido, error, onElegir }: {
  rotulo: string
  elegido: string | null
  error: boolean
  onElegir: (clave: string) => void
}) {
  const { perfiles, perfilElegible } = useBillingProfiles()
  const [abierto, setAbierto] = useState(false)
  const [q, setQ] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const boton = useRef<HTMLButtonElement>(null)
  const buscados = Object.keys(perfiles).filter(perfilElegible).filter((c) => {
    const org = c.startsWith('loc:') ? nombreLocacion(c.slice(4)) : ''
    return \`\${perfiles[c].nombre} \${org}\`.toLowerCase().includes(q.trim().toLowerCase())
  })
  const grupos: [string, string[]][] = [
    ['Locations', buscados.filter((c) => c.startsWith('loc:'))],
    ['Providers', buscados.filter((c) => c.startsWith('emp:'))],
  ]

  useEffect(() => {
    if (!abierto) { setQ(''); return }
    const onDown = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setAbierto(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setAbierto(false); boton.current?.focus() } }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
  }, [abierto])

  const elegir = (c: string) => { onElegir(c); setAbierto(false); boton.current?.focus() }

  return (
    <div ref={ref} className="relative">
      <button
        ref={boton}
        id="defaults-billing"
        type="button"
        aria-label={rotulo}
        aria-expanded={abierto}
        aria-invalid={error || undefined}
        onClick={() => setAbierto((v) => !v)}
        className={cn(control(error ? 'error' : undefined), 'flex min-h-9 items-center justify-between gap-3 px-3 py-2 text-left transition-colors', abierto && !error && 'border-dash-blue')}
      >
        {elegido && perfiles[elegido] ? <ResumenPerfil clave={elegido} /> : <span className="text-[13px] text-ink-faint">Select a billing profile</span>}
        <ChevronDown className={cn('size-4 shrink-0 text-black transition-transform', abierto && 'rotate-180')} />
      </button>
      {abierto && (
        <div className="motion-safe:animate-[loc-in_120ms_ease-out] absolute top-[calc(100%+4px)] left-0 z-30 flex w-full flex-col overflow-hidden rounded-md border border-line bg-white shadow-lg">
          <div className="border-b border-line p-1.5">
            <div className="relative">
              <Search aria-hidden className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-ink-faint" />
              <input
                autoFocus
                aria-label={\`Search \${rotulo}\`}
                placeholder="Search by name"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && buscados[0]) { e.preventDefault(); elegir(buscados[0]) } }}
                className="h-8 w-full rounded-md border border-line bg-white pr-2 pl-8 text-[13px] placeholder:text-ink-faint focus:border-dash-blue focus:outline-none"
              />
            </div>
          </div>
          <div className="max-h-72 overflow-y-auto py-1">
            {!buscados.length && <p className="px-3 py-4 text-center text-xs text-ink-muted">No matches.</p>}
            {grupos.filter(([, cs]) => cs.length).map(([titulo, cs]) => (
              <div key={titulo} role="group" aria-label={titulo}>
                <p className="px-3 pt-2 pb-1 text-[11px] font-semibold tracking-wide text-ink-faint uppercase">{titulo}</p>
                {cs.map((c) => (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={c === elegido}
                    onClick={() => elegir(c)}
                    className={cn('flex w-full items-start justify-between gap-3 px-3 py-2 text-left hover:bg-surface-muted', c === elegido && 'bg-info-bg')}
                  >
                    <ResumenPerfil clave={c} />
                    {c === elegido && <Check className="text-dash-blue mt-0.5 size-3.5 shrink-0" aria-hidden />}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* El aviso que frena la desactivación de un perfil o de Primary Provider mientras esté elegido en Insurance Defaults
   (CON-4031, CON-4032). Cada referencia lleva a los defaults de esa Location para cambiarla. */
export function BloqueoDefaults({ tipo, referencias, onClose }: { tipo: 'perfil' | 'provider'; referencias: Referencia[]; onClose: () => void }) {
  return (
    <ConfirmDialog
      title={tipo === 'perfil' ? 'Unable to disable billing profile' : 'Unable to deactivate Primary Provider'}
      icon="warning"
      confirmLabel="Close"
      hideCancel
      onConfirm={onClose}
      onCancel={onClose}
    >
      <p>
        {tipo === 'perfil'
          ? 'This billing profile cannot be disabled because it is selected in Insurance Defaults.'
          : 'Primary provider cannot be disabled because it is selected in Insurance Defaults.'}
      </p>
      <p className="mt-2">Update the following settings before trying again:</p>
      <ul className="mt-2 flex flex-col gap-1.5">
        {referencias.map((r) => (
          <li key={\`\${r.locId}-\${r.campo}\`}>
            <Link
              to={\`/settings/locations/\${r.locId}?tab=insurance-defaults\`}
              onClick={onClose}
              className="text-dash-blue block rounded-md bg-surface-subtle px-3 py-2 font-medium hover:underline"
            >
              {nombreLocacion(r.locId)} — {ROTULO_REFERENCIA[r.campo]}
            </Link>
          </li>
        ))}
      </ul>
    </ConfirmDialog>
  )
}
`})))()}export{n,i as r,r as t};