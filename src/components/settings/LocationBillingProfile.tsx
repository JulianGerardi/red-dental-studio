import { useCallback, useEffect, useMemo, useState } from 'react'
import { KeyRound, Receipt } from 'lucide-react'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { EmptyState } from '@/components/ui/empty-state'
import { aviso } from '@/components/ui/toaster'
import { Card, Toggle } from '@/components/settings/primitives'
import { TextField } from '@/components/patients/form'
import {
  AccionesGuardado, CamposCredenciales, ContactoCard, ContractedWith, CredentialsDrawer, DatoPerfil, EstadoPerfilPill,
  ReplaceContactDrawer, validarCredenciales, type Credenciales, type ErroresCredenciales, type EstadoPerfil,
} from '@/components/settings/BillingProfile'
import { BloqueoDefaults } from '@/components/settings/LocationInsuranceDefaults'
import { useBillingProfiles } from '@/data/billingProfilesStore'
import type { Referencia } from '@/data/insuranceDefaults'
import { CONTACTOS_LOCACION, claveLocacion, fiscalOculto, type PerfilFacturacion } from '@/data/billingProfiles'

/* Location → Insurance / Billing Profile (CON-4021 habilitar, CON-4026 consultar y ajustar, CON-4027 Contracted With,
   CON-4028 deshabilitar). A diferencia del provider, la Location no trae NPI ni TIN: se cargan al configurarla. Ver
   figma/modulos/billing-profile.md. */

const INACTIVO = 'This billing profile is inactive and cannot be edited.'

type Borrador = { nombre: string; direccion: string; telefono: string } & Credenciales
type Errores = { nombre?: string; direccion?: string; telefono?: string } & ErroresCredenciales
type Reemplazo = { tipo: 'direccion' | 'telefono'; en: 'setup' | 'identidad' }

export function LocationBillingProfile({
  locId, nombreLocacion, onDirtyChange,
}: { locId: string; nombreLocacion: string; onDirtyChange?: (sucio: boolean) => void }) {
  const clave = claveLocacion(locId)
  const { perfiles, contactos, guardarPerfil, referencias } = useBillingProfiles()
  const perfil = perfiles[clave]
  const general = CONTACTOS_LOCACION[locId] ?? CONTACTOS_LOCACION.abril
  const guardadosTitular = contactos[clave]

  const inicialSetup = (): Borrador => perfil
    ? { nombre: perfil.nombre, direccion: perfil.direccion, telefono: perfil.telefono, npi: perfil.npi, tipoFiscal: perfil.tipoFiscal, fiscal: perfil.fiscal }
    : { nombre: nombreLocacion, direccion: general.direccion, telefono: general.telefono, npi: '', tipoFiscal: 'TIN', fiscal: '' }

  const [configurando, setConfigurando] = useState(false)
  const [setup, setSetup] = useState<Borrador>(inicialSetup)
  const [errores, setErrores] = useState<Errores>({})
  const [reemplazo, setReemplazo] = useState<Reemplazo | null>(null)
  const [preguntar, setPreguntar] = useState<'deshabilitar' | 'descartar' | null>(null)
  const [sucios, setSucios] = useState({ identidad: false, contratos: false })
  const [bloqueo, setBloqueo] = useState<Referencia[]>([])

  const setupSucio = configurando && JSON.stringify(setup) !== JSON.stringify(inicialSetup())
  const haySucios = sucios.identidad || sucios.contratos
  useEffect(() => { onDirtyChange?.(setupSucio || haySucios) }, [setupSucio, haySucios, onDirtyChange])
  const marcar = useCallback((k: keyof typeof sucios) => (v: boolean) => setSucios((p) => (p[k] === v ? p : { ...p, [k]: v })), [])
  const marcarIdentidad = useMemo(() => marcar('identidad'), [marcar])
  const marcarContratos = useMemo(() => marcar('contratos'), [marcar])

  const estado: EstadoPerfil = configurando ? 'Pending activation' : perfil?.activo ? 'Active' : perfil ? 'Inactive' : 'Not configured'
  const activo = configurando || !!perfil?.activo

  const alternar = (v: boolean) => {
    if (v && !perfil?.activo) {
      setSetup(inicialSetup())
      setErrores({})
      setConfigurando(true)
    } else if (!v && configurando) {
      if (setupSucio) setPreguntar('descartar')
      else setConfigurando(false)
    } else if (!v && perfil?.activo) {
      /* No se deshabilita mientras esté elegido en Insurance Defaults de alguna Location (CON-4032). */
      const r = referencias(clave)
      if (r.length) setBloqueo(r)
      else setPreguntar('deshabilitar')
    }
  }

  const guardarSetup = () => {
    const e: Errores = {
      nombre: setup.nombre.trim() ? undefined : 'A billing name is required.',
      direccion: setup.direccion.trim() ? undefined : 'A billing address is required.',
      telefono: setup.telefono.trim() ? undefined : 'A billing phone number is required.',
      ...validarCredenciales(setup),
    }
    setErrores(e)
    if (Object.values(e).some(Boolean)) return
    /* Reactivar reutiliza el mismo perfil y conserva sus contratos (CON-4028 › Reactivar). */
    guardarPerfil(clave, { ...setup, nombre: setup.nombre.trim(), activo: true, contratos: perfil?.contratos ?? {} })
    setConfigurando(false)
    aviso.ok(perfil ? 'Billing profile enabled again. Its carrier contracts were kept.' : 'Billing profile enabled.')
  }

  /* El guardado vuelve a mirar el estado: si alguien lo deshabilitó con la pantalla abierta, no se aplica nada. */
  const guardarSiActivo = (cambios: Partial<PerfilFacturacion>) => {
    const actual = perfiles[clave]
    if (!actual?.activo) { aviso.error(INACTIVO); return false }
    guardarPerfil(clave, { ...actual, ...cambios })
    return true
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0 max-w-[640px]">
            <h2 className="text-sm font-bold text-ink">Use this Location as a Billing Provider</h2>
            <p className="mt-1 text-xs leading-relaxed text-ink-muted">
              Set the billing identity, contacts and credentials this location uses on claims.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <EstadoPerfilPill estado={estado} />
            <Toggle on={activo} onChange={alternar} ariaLabel="Use this Location as a Billing Provider" />
          </div>
        </div>
        {configurando && (
          <Alert tone="warning" title="Complete the information and save to enable this billing profile." className="mt-4" />
        )}
      </Card>

      {!perfil && !configurando && (
        <Card>
          <EmptyState
            icon={Receipt}
            title="Set up this location's billing information"
            detail="Turn on “Use this Location as a Billing Provider” to start."
            className="py-12"
          />
        </Card>
      )}

      {configurando && (
        <Card>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-ink">Billing identity and contact information</h2>
              <p className="mt-1 text-xs text-ink-muted">We suggest this location's name and contacts. Review them and add the billing credentials.</p>
            </div>
          </div>

          {Object.values(errores).some(Boolean) && (
            <Alert tone="danger" title="Complete the required billing information before enabling this profile." className="mt-4" />
          )}

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <TextField
              label="Billing name" required value={setup.nombre} error={errores.nombre}
              hint="Only the billing profile uses this name. The location name doesn't change."
              onChange={(v) => setSetup((p) => ({ ...p, nombre: v }))}
            />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <ContactoCard
              titulo="Billing address" valor={setup.direccion}
              nuevo={!guardadosTitular?.direcciones.includes(setup.direccion)}
              opciones={guardadosTitular?.direcciones}
              onElegir={(v) => setSetup((p) => ({ ...p, direccion: v }))}
              onReemplazar={() => setReemplazo({ tipo: 'direccion', en: 'setup' })}
            />
            <ContactoCard
              titulo="Billing phone number" valor={setup.telefono}
              nuevo={!guardadosTitular?.telefonos.includes(setup.telefono)}
              opciones={guardadosTitular?.telefonos}
              onElegir={(v) => setSetup((p) => ({ ...p, telefono: v }))}
              onReemplazar={() => setReemplazo({ tipo: 'telefono', en: 'setup' })}
            />
          </div>

          <h3 className="mt-6 text-[13px] font-bold text-ink">Billing credentials</h3>
          <p className="mt-0.5 mb-4 text-[11px] text-ink-muted">They belong to this location, not to a provider.</p>
          <CamposCredenciales valor={setup} onChange={(c) => setSetup((p) => ({ ...p, ...c }))} errores={errores} />

          <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-line-row pt-4">
            <Button variant="secondary" onClick={() => (setupSucio ? setPreguntar('descartar') : setConfigurando(false))}>Cancel</Button>
            <Button onClick={guardarSetup}>Save and enable</Button>
          </div>
        </Card>
      )}

      {perfil && !configurando && (
        <>
          {!perfil.activo && (
            <Alert tone="info" title={INACTIVO} />
          )}
          <IdentidadLocacion
            /* Al deshabilitarse se rearma con lo guardado: lo que no se guardó se descarta. */
            key={`identidad-${perfil.activo}`}
            perfil={perfil}
            opciones={guardadosTitular}
            onReemplazar={(tipo) => setReemplazo({ tipo, en: 'identidad' })}
            reemplazo={reemplazo?.en === 'identidad' ? reemplazo.tipo : null}
            onCerrarReemplazo={() => setReemplazo(null)}
            onGuardar={guardarSiActivo}
            onDirtyChange={marcarIdentidad}
          />
          <ContractedWith
            key={`contratos-${perfil.activo}`}
            guardados={perfil.contratos}
            editable={perfil.activo}
            onDirtyChange={marcarContratos}
            onGuardar={(contratos) => {
              const ok = guardarSiActivo({ contratos })
              if (ok) aviso.ok('Carrier contracts saved.')
              return ok
            }}
          />
        </>
      )}

      {reemplazo?.en === 'setup' && (
        <ReplaceContactDrawer
          tipo={reemplazo.tipo}
          onClose={() => setReemplazo(null)}
          onUsar={(v) => setSetup((p) => ({ ...p, [reemplazo.tipo]: v }))}
        />
      )}

      {preguntar === 'deshabilitar' && (
        <ConfirmDialog
          title="Disable this billing profile?"
          confirmLabel="Disable profile"
          onCancel={() => setPreguntar(null)}
          onConfirm={() => {
            setPreguntar(null)
            if (!perfil) return
            /* El guardado vuelve a mirar: lo pudieron elegir en Insurance Defaults con la pregunta abierta. */
            const r = referencias(clave)
            if (r.length) { setBloqueo(r); return }
            guardarPerfil(clave, { ...perfil, activo: false })
            aviso.ok('Billing profile disabled.')
          }}
        >
          It can no longer be chosen as Billing Provider and becomes read-only. Its data and carrier contracts are
          kept.{haySucios && ' Unsaved changes will be discarded.'}
        </ConfirmDialog>
      )}

      {bloqueo.length > 0 && <BloqueoDefaults tipo="perfil" referencias={bloqueo} onClose={() => setBloqueo([])} />}

      {preguntar === 'descartar' && (
        <ConfirmDialog
          title="Discard this setup?"
          confirmLabel="Discard"
          cancelLabel="Keep editing"
          tone="danger"
          onCancel={() => setPreguntar(null)}
          onConfirm={() => { setPreguntar(null); setConfigurando(false); setErrores({}) }}
        >
          The billing profile won't be enabled and nothing you entered will be saved.
        </ConfirmDialog>
      )}
    </div>
  )
}

/* El perfil guardado: nombre editable, contactos reemplazables y credenciales en su propio drawer (CON-4026). */
function IdentidadLocacion({
  perfil, opciones, onReemplazar, reemplazo, onCerrarReemplazo, onGuardar, onDirtyChange,
}: {
  perfil: PerfilFacturacion
  opciones?: { direcciones: string[]; telefonos: string[] }
  onReemplazar: (tipo: 'direccion' | 'telefono') => void
  reemplazo: 'direccion' | 'telefono' | null
  onCerrarReemplazo: () => void
  onGuardar: (cambios: Partial<PerfilFacturacion>) => boolean
  onDirtyChange: (sucio: boolean) => void
}) {
  const [d, setD] = useState({ nombre: perfil.nombre, direccion: perfil.direccion, telefono: perfil.telefono })
  const [error, setError] = useState<string>()
  const [credenciales, setCredenciales] = useState(false)
  const editable = perfil.activo
  const sucio = d.nombre !== perfil.nombre || d.direccion !== perfil.direccion || d.telefono !== perfil.telefono
  useEffect(() => { onDirtyChange(sucio) }, [sucio, onDirtyChange])

  const guardar = () => {
    if (!d.nombre.trim()) { setError('A billing name is required.'); return }
    if (onGuardar({ ...d, nombre: d.nombre.trim() })) aviso.ok('Billing information saved.')
  }

  return (
    <Card>
      {/* El estado ya está en la card de arriba, junto al switch. */}
      <h2 className="text-sm font-bold text-ink">Billing identity and contact information</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <TextField
          label="Billing name" required value={d.nombre} disabled={!editable} error={error}
          hint="Only the billing profile uses this name. The location name doesn't change."
          onChange={(v) => { setError(undefined); setD((p) => ({ ...p, nombre: v })) }}
        />
      </div>

      <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DatoPerfil titulo="NPI">{perfil.npi}</DatoPerfil>
        <DatoPerfil titulo="TIN / SSN">{fiscalOculto(perfil.tipoFiscal, perfil.fiscal)}</DatoPerfil>
        {editable && (
          <div className="flex items-end">
            <Button variant="link" size="sm" className="px-0" onClick={() => setCredenciales(true)}>
              <KeyRound /> Manage billing credentials
            </Button>
          </div>
        )}
      </dl>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <ContactoCard
          titulo="Billing address" valor={d.direccion} disabled={!editable}
          nuevo={!opciones?.direcciones.includes(d.direccion)}
          opciones={opciones?.direcciones}
          onElegir={(v) => setD((p) => ({ ...p, direccion: v }))}
          onReemplazar={() => onReemplazar('direccion')}
        />
        <ContactoCard
          titulo="Billing phone number" valor={d.telefono} disabled={!editable}
          nuevo={!opciones?.telefonos.includes(d.telefono)}
          opciones={opciones?.telefonos}
          onElegir={(v) => setD((p) => ({ ...p, telefono: v }))}
          onReemplazar={() => onReemplazar('telefono')}
        />
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-ink-muted">
        These contacts are only for billing: the location's general address and phone don't change, and replaced contacts are kept.
      </p>

      {editable && (
        <AccionesGuardado
          sucio={sucio}
          aviso="Unsaved billing changes"
          onCancel={() => { setError(undefined); setD({ nombre: perfil.nombre, direccion: perfil.direccion, telefono: perfil.telefono }) }}
          onSave={guardar}
          saveLabel="Save billing information"
          siempre={false}
        />
      )}

      {reemplazo && (
        <ReplaceContactDrawer
          tipo={reemplazo}
          onClose={onCerrarReemplazo}
          onUsar={(v) => setD((p) => ({ ...p, [reemplazo]: v }))}
        />
      )}

      {credenciales && (
        <CredentialsDrawer
          inicial={{ npi: perfil.npi, tipoFiscal: perfil.tipoFiscal, fiscal: perfil.fiscal }}
          onClose={() => setCredenciales(false)}
          onGuardar={(c) => {
            const ok = onGuardar(c)
            if (ok) aviso.ok('Billing credentials updated.')
            return ok
          }}
        />
      )}
    </Card>
  )
}
