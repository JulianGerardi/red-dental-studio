import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import {
  CONTACTOS_INICIALES, DATOS_PROVIDER, PERFILES_INICIALES, PRIMARIOS_INICIALES, claveProvider,
  type ContactosTitular, type PerfilFacturacion,
} from '@/data/billingProfiles'
import {
  DEFAULTS_INICIALES, defaultsIniciales, normalizarDefaults, referenciasEnDefaults, type DefaultsSeguro, type Referencia,
} from '@/data/insuranceDefaults'
import { EMPLEADOS } from '@/data/employees'

/* Store en memoria de los Billing Profiles (Locations y providers) y de los Insurance Defaults de cada Location, como
   finanzasStore: vive en la ruta de Settings y no persiste. Ver figma/modulos/billing-profile.md e insurance-defaults.md. */

type Datos = {
  perfiles: Record<string, PerfilFacturacion>
  contactos: Record<string, ContactosTitular>
  primarios: Record<string, boolean>
  defaults: Record<string, DefaultsSeguro>
}

type Ctx = Datos & {
  /** Guarda el perfil entero; un contacto nuevo se suma a los del titular y el anterior se conserva. */
  guardarPerfil: (clave: string, perfil: PerfilFacturacion) => void
  /** Primary Provider y el perfil se guardan juntos (CON-4004, CON-4007). Devuelve qué pasó con el perfil; no se
   *  desactiva si está elegido en algún Insurance Defaults (CON-4031). */
  guardarPrimario: (empleadoId: string, nombre: string, primario: boolean) => 'creado' | 'reactivado' | 'deshabilitado' | 'sin cambios' | 'bloqueado'
  /** Los defaults guardados de la Location; si nunca se tocaron, los de la inicialización (CON-4029). */
  defaultsDe: (locId: string) => DefaultsSeguro
  /** Guarda todo junto, con las referencias que no aplican al modo en null. */
  guardarDefaults: (locId: string, d: DefaultsSeguro) => DefaultsSeguro
  /** Employee activo, Primary Provider y su Billing Profile activo (CON-3896 › Precondiciones). */
  providerElegible: (empleadoId: string) => boolean
  /** Perfil activo; si es de un provider, el provider también tiene que ser elegible (CON-3894 › Precondiciones). */
  perfilElegible: (clave: string) => boolean
  /** Dónde está elegido el perfil (y su provider) en los Insurance Defaults de todas las Locations (CON-4031, CON-4032). */
  referencias: (clave: string, empleadoId?: string) => Referencia[]
}

const SEMILLA: Datos = { perfiles: PERFILES_INICIALES, contactos: CONTACTOS_INICIALES, primarios: PRIMARIOS_INICIALES, defaults: DEFAULTS_INICIALES }

const sumar = (lista: string[] = [], v: string) => (lista.includes(v) ? lista : [...lista, v])

const BillingProfilesCtx = createContext<Ctx | null>(null)

export function BillingProfilesProvider({ children, inicial = SEMILLA }: { children: ReactNode; inicial?: Datos }) {
  const [datos, setDatos] = useState<Datos>(inicial)

  const guardarPerfil = useCallback((clave: string, perfil: PerfilFacturacion) => {
    setDatos((d) => {
      const c = d.contactos[clave] ?? { direcciones: [], telefonos: [] }
      return {
        ...d,
        perfiles: { ...d.perfiles, [clave]: perfil },
        contactos: { ...d.contactos, [clave]: { direcciones: sumar(c.direcciones, perfil.direccion), telefonos: sumar(c.telefonos, perfil.telefono) } },
      }
    })
  }, [])

  const referencias = useCallback(
    (clave: string, empleadoId?: string) => referenciasEnDefaults(datos.defaults, clave, empleadoId),
    [datos.defaults],
  )

  const guardarPrimario = useCallback((id: string, nombre: string, primario: boolean) => {
    const clave = claveProvider(id)
    const previo = datos.perfiles[clave]
    /* El guardado vuelve a mirar las referencias: no puede quedar un default apuntando a un perfil inactivo. */
    if (!primario && datos.primarios[id] && referencias(clave, id).length) return 'bloqueado' as const
    const resultado = primario === (datos.primarios[id] ?? false) && (!primario || previo?.activo)
      ? 'sin cambios' as const
      : !primario ? 'deshabilitado' as const : previo ? 'reactivado' as const : 'creado' as const
    setDatos((d) => {
      const actual = d.perfiles[clave]
      const base = DATOS_PROVIDER[id]
      /* Se reutiliza el perfil que exista; uno nuevo toma nombre, contactos y credenciales de la ficha. */
      const perfil: PerfilFacturacion | undefined = actual
        ? { ...actual, activo: primario }
        : primario && base ? { nombre, ...base, activo: true, contratos: {} } : undefined
      return {
        ...d,
        primarios: { ...d.primarios, [id]: primario },
        perfiles: perfil ? { ...d.perfiles, [clave]: perfil } : d.perfiles,
      }
    })
    return resultado
  }, [datos, referencias])

  const defaultsDe = useCallback((locId: string) => datos.defaults[locId] ?? defaultsIniciales(), [datos.defaults])

  const guardarDefaults = useCallback((locId: string, d: DefaultsSeguro) => {
    const guardado = { ...normalizarDefaults(d), updatedAt: new Date().toISOString() }
    setDatos((p) => ({ ...p, defaults: { ...p.defaults, [locId]: guardado } }))
    return guardado
  }, [])

  const providerElegible = useCallback((id: string) => {
    const e = EMPLEADOS.find((x) => x.id === id)
    return !!e && e.esProvider && e.estado === 'Active' && !!datos.primarios[id] && !!datos.perfiles[claveProvider(id)]?.activo
  }, [datos.perfiles, datos.primarios])

  const perfilElegible = useCallback((clave: string) => {
    if (!datos.perfiles[clave]?.activo) return false
    return clave.startsWith('emp:') ? providerElegible(clave.slice(4)) : true
  }, [datos.perfiles, providerElegible])

  const valor = useMemo(
    () => ({ ...datos, guardarPerfil, guardarPrimario, defaultsDe, guardarDefaults, providerElegible, perfilElegible, referencias }),
    [datos, guardarPerfil, guardarPrimario, defaultsDe, guardarDefaults, providerElegible, perfilElegible, referencias],
  )
  return <BillingProfilesCtx.Provider value={valor}>{children}</BillingProfilesCtx.Provider>
}

export function useBillingProfiles() {
  const ctx = useContext(BillingProfilesCtx)
  if (!ctx) throw new Error('useBillingProfiles va adentro de <BillingProfilesProvider>')
  return ctx
}
