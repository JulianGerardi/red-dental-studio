import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import {
  CONTACTOS_INICIALES, DATOS_PROVIDER, PERFILES_INICIALES, PRIMARIOS_INICIALES, claveProvider,
  type ContactosTitular, type PerfilFacturacion,
} from '@/data/billingProfiles'

/* Store en memoria de los Billing Profiles (Locations y providers), como finanzasStore: vive en la ruta de Settings y no
   persiste. Ver figma/modulos/billing-profile.md. */

type Datos = {
  perfiles: Record<string, PerfilFacturacion>
  contactos: Record<string, ContactosTitular>
  primarios: Record<string, boolean>
}

type Ctx = Datos & {
  /** Guarda el perfil entero; un contacto nuevo se suma a los del titular y el anterior se conserva. */
  guardarPerfil: (clave: string, perfil: PerfilFacturacion) => void
  /** Primary Provider y el perfil se guardan juntos (CON-4004, CON-4007). Devuelve qué pasó con el perfil. */
  guardarPrimario: (empleadoId: string, nombre: string, primario: boolean) => 'creado' | 'reactivado' | 'deshabilitado' | 'sin cambios'
}

const SEMILLA: Datos = { perfiles: PERFILES_INICIALES, contactos: CONTACTOS_INICIALES, primarios: PRIMARIOS_INICIALES }

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

  const guardarPrimario = useCallback((id: string, nombre: string, primario: boolean) => {
    const clave = claveProvider(id)
    const previo = datos.perfiles[clave]
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
  }, [datos])

  const valor = useMemo(() => ({ ...datos, guardarPerfil, guardarPrimario }), [datos, guardarPerfil, guardarPrimario])
  return <BillingProfilesCtx.Provider value={valor}>{children}</BillingProfilesCtx.Provider>
}

export function useBillingProfiles() {
  const ctx = useContext(BillingProfilesCtx)
  if (!ctx) throw new Error('useBillingProfiles va adentro de <BillingProfilesProvider>')
  return ctx
}
`})))()}export{n,i as r,r as t};