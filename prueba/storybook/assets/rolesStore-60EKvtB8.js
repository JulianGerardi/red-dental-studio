import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { ROLES_INICIALES, type Rol } from '@/data/roles'

/* Store en memoria de Settings → Roles: la lista de cards y la página de un rol (/settings/roles/:id) leen y escriben los
   mismos roles. Vive en la ruta de Settings, como finanzasStore; no persiste. Ver roles.md, 2026-11-26. */

export const hoyMDA = () => new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
const idDe = (nombre: string) => \`\${nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-\${Date.now().toString(36)}\`

export type DatosRol = { nombre: string; descripcion: string; permisos: string[] }

type Ctx = {
  roles: Rol[]
  /** Alta: va primero, activo y sin empleados. Devuelve el rol creado. */
  crear: (d: DatosRol) => Rol
  /** Cambia un rol y le pone la fecha de hoy en Updated. */
  cambiar: (id: string, patch: Partial<Rol>) => void
  /** Lo saca y devuelve con qué deshacerlo (lo vuelve a su lugar). */
  borrar: (id: string) => () => void
}

const RolesCtx = createContext<Ctx | null>(null)

export function RolesProvider({ children, inicial = ROLES_INICIALES }: { children: ReactNode; inicial?: Rol[] }) {
  const [roles, setRoles] = useState(inicial)

  const crear = useCallback((d: DatosRol) => {
    const nuevo: Rol = { id: idDe(d.nombre), ...d, activo: true, sistema: false, actualizado: hoyMDA(), usuarios: 0 }
    setRoles((p) => [nuevo, ...p])
    return nuevo
  }, [])
  const cambiar = useCallback((id: string, patch: Partial<Rol>) => {
    setRoles((p) => p.map((r) => (r.id === id ? { ...r, ...patch, actualizado: hoyMDA() } : r)))
  }, [])
  const borrar = useCallback((id: string) => {
    let quitado: { rol: Rol; i: number } | undefined
    setRoles((p) => {
      const i = p.findIndex((r) => r.id === id)
      if (i >= 0) quitado = { rol: p[i]!, i }
      return p.filter((r) => r.id !== id)
    })
    return () => { if (quitado) { const q = quitado; setRoles((p) => [...p.slice(0, q.i), q.rol, ...p.slice(q.i)]) } }
  }, [])

  const valor = useMemo(() => ({ roles, crear, cambiar, borrar }), [roles, crear, cambiar, borrar])
  return <RolesCtx.Provider value={valor}>{children}</RolesCtx.Provider>
}

export function useRoles() {
  const c = useContext(RolesCtx)
  if (!c) throw new Error('useRoles va dentro de <RolesProvider>')
  return c
}
`})))()}export{r as n,n as r,i as t};