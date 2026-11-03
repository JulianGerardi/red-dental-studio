import { useCallback, useEffect, useState } from 'react'
import { Alert } from '@/components/ui/alert'
import { aviso } from '@/components/ui/toaster'
import { Card } from '@/components/settings/primitives'
import {
  AccionesGuardado, ContactoCard, ContractedWith, DatoPerfil, EstadoPerfilPill, ReplaceContactDrawer,
} from '@/components/settings/BillingProfile'
import { useBillingProfiles } from '@/data/billingProfilesStore'
import { claveProvider, fiscalOculto, type PerfilFacturacion } from '@/data/billingProfiles'

/* Provider → Insurance / Billing Profile (CON-4005 consultar y ajustar, CON-4006 Contracted With). Nombre, NPI y TIN/SSN
   salen de la ficha del provider y acá son de lectura: sólo se reemplazan dirección y teléfono. El perfil se edita con
   Primary Provider en Yes y el perfil activo (CON-4007). Ver figma/modulos/billing-profile.md. */

const INACTIVO = 'This billing profile is inactive and cannot be edited.'

export function ProviderBillingProfile({
  empleadoId, onDirtyChange,
}: { empleadoId: string; onDirtyChange?: (sucio: boolean) => void }) {
  const clave = claveProvider(empleadoId)
  const { perfiles, primarios, guardarPerfil } = useBillingProfiles()
  const perfil = perfiles[clave]
  const [sucios, setSucios] = useState({ contactos: false, contratos: false })
  const marcarContactos = useCallback((v: boolean) => setSucios((p) => (p.contactos === v ? p : { ...p, contactos: v })), [])
  const marcarContratos = useCallback((v: boolean) => setSucios((p) => (p.contratos === v ? p : { ...p, contratos: v })), [])
  useEffect(() => { onDirtyChange?.(sucios.contactos || sucios.contratos) }, [sucios, onDirtyChange])

  if (!perfil) return null
  const editable = perfil.activo && !!primarios[empleadoId]

  /* Se vuelve a mirar el estado al guardar: si Primary Provider se apagó con la pantalla abierta, no se aplica nada. */
  const guardarSiActivo = (cambios: Partial<PerfilFacturacion>) => {
    const actual = perfiles[clave]
    if (!actual?.activo || !primarios[empleadoId]) { aviso.error(INACTIVO); return false }
    guardarPerfil(clave, { ...actual, ...cambios })
    return true
  }

  return (
    <div className="flex flex-col gap-4">
      {!editable && (
        <Alert tone="info" title={INACTIVO}>
          Turn on Is a Primary Provider in Provider Info and save to edit it again. Its data and carrier contracts are kept.
        </Alert>
      )}
      <ContactosProvider key={`contactos-${editable}`} perfil={perfil} editable={editable} onGuardar={guardarSiActivo} onDirtyChange={marcarContactos} />
      <ContractedWith
        key={`contratos-${editable}`}
        guardados={perfil.contratos}
        editable={editable}
        onDirtyChange={marcarContratos}
        onGuardar={(contratos) => {
          const ok = guardarSiActivo({ contratos })
          if (ok) aviso.ok('Carrier contracts saved.')
          return ok
        }}
      />
    </div>
  )
}

function ContactosProvider({
  perfil, editable, onGuardar, onDirtyChange,
}: {
  perfil: PerfilFacturacion
  editable: boolean
  onGuardar: (cambios: Partial<PerfilFacturacion>) => boolean
  onDirtyChange: (sucio: boolean) => void
}) {
  const [d, setD] = useState({ direccion: perfil.direccion, telefono: perfil.telefono })
  const [reemplazo, setReemplazo] = useState<'direccion' | 'telefono' | null>(null)
  const sucio = d.direccion !== perfil.direccion || d.telefono !== perfil.telefono
  useEffect(() => { onDirtyChange(sucio) }, [sucio, onDirtyChange])

  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-ink">Billing identity and contact information</h2>
          <p className="mt-1 text-xs text-ink-muted">The billing information of this provider.</p>
        </div>
        <EstadoPerfilPill estado={perfil.activo ? 'Active' : 'Inactive'} />
      </div>

      <dl className="mt-4 grid gap-4 sm:grid-cols-3">
        <DatoPerfil titulo="Billing name">{perfil.nombre}</DatoPerfil>
        <DatoPerfil titulo="NPI">{perfil.npi}</DatoPerfil>
        <DatoPerfil titulo="TIN / SSN">{fiscalOculto(perfil.tipoFiscal, perfil.fiscal)}</DatoPerfil>
      </dl>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <ContactoCard
          titulo="Billing address" valor={d.direccion} disabled={!editable}
          nuevo={d.direccion !== perfil.direccion}
          onReemplazar={() => setReemplazo('direccion')}
        />
        <ContactoCard
          titulo="Billing phone number" valor={d.telefono} disabled={!editable}
          nuevo={d.telefono !== perfil.telefono}
          onReemplazar={() => setReemplazo('telefono')}
        />
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-ink-muted">
        Name and credentials come from the provider's information. Replacing a contact keeps the previous one.
      </p>

      {editable && (
        <AccionesGuardado
          sucio={sucio}
          aviso="Unsaved contact changes"
          onCancel={() => setD({ direccion: perfil.direccion, telefono: perfil.telefono })}
          onSave={() => { if (onGuardar(d)) aviso.ok('Billing contact information saved.') }}
          saveLabel="Save contact information"
          siempre={false}
        />
      )}

      {reemplazo && (
        <ReplaceContactDrawer tipo={reemplazo} onClose={() => setReemplazo(null)} onUsar={(v) => setD((p) => ({ ...p, [reemplazo]: v }))} />
      )}
    </Card>
  )
}
