import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2, MapPin, Stethoscope, Trash2, UserRound, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ICONO_SUELTO } from '@/lib/estilos'
import { ModalShell } from '@/components/patients/form'
import { Button } from '@/components/ui/button'
import { DrawerSection } from '@/components/ui/drawer'
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { EmptyState } from '@/components/ui/empty-state'
import { SearchInput } from '@/components/ui/search-input'
import { Tabs } from '@/components/ui/tabs'
import { aviso } from '@/components/ui/toaster'
import { useFinanzas } from '@/data/finanzasStore'
import { PATIENTS } from '@/data/mock'
import { EMPLEADOS } from '@/data/employees'
import { LOCACIONES } from '@/pages/settings/Locations'
import { rutaPlanes } from '@/pages/settings/finance/Carriers'
import type { Arancel, Aseguradora, PlanSeguro } from '@/data/finanzas'

/* Assignments de un fee schedule (pedido de Julián, no está en red.dev): a quién está linkeado directamente. Los
   carriers salen de los planes que lo usan como Max Allowable o por locación. Ver settings-billing.md. */

export const TIPOS_ASIGNACION = ['Patients', 'Carriers', 'Providers', 'Locations'] as const
export type TipoAsignacion = (typeof TIPOS_ASIGNACION)[number]
export type Asignado = { id: string; nombre: string; detalle?: string; to?: string }
export type Asignaciones = Record<TipoAsignacion, Asignado[]>

const ICONO: Record<TipoAsignacion, LucideIcon> = { Patients: UserRound, Carriers: Building2, Providers: Stethoscope, Locations: MapPin }

export function asignacionesDe(a: Arancel, planes: PlanSeguro[], aseguradoras: Aseguradora[]): Asignaciones {
  const suyos = planes.filter((p) => p.arancelMaximoId === a.id || Object.values(p.arancelPorLocacion).includes(a.id))
  return {
    Patients: a.asignados.pacientes.flatMap((id) => {
      const p = PATIENTS.find((x) => x.id === id)
      return p ? [{ id, nombre: \`\${p.first} \${p.last}\`, to: \`/patients/\${id}\` }] : []
    }),
    Carriers: aseguradoras.filter((c) => suyos.some((p) => p.aseguradoraId === c.id)).map((c) => ({
      id: c.id, nombre: c.nombre, to: rutaPlanes(c.id),
      detalle: \`Through \${suyos.filter((p) => p.aseguradoraId === c.id).map((p) => p.nombre).join(', ')}\`,
    })),
    Providers: a.asignados.proveedores.flatMap((id) => {
      const e = EMPLEADOS.find((x) => x.id === id)
      return e ? [{ id, nombre: e.nombre, detalle: e.cargo }] : []
    }),
    Locations: a.asignados.locaciones.flatMap((id) => {
      const l = LOCACIONES.find((x) => x.id === id)
      return l ? [{ id, nombre: l.nombre, detalle: l.info, to: \`/settings/locations/\${id}\` }] : []
    }),
  }
}

export const totalAsignaciones = (g: Asignaciones) => TIPOS_ASIGNACION.reduce((n, t) => n + g[t].length, 0)

/* El número de la columna Assignments: al pasar el mouse o al tocarlo muestra el desglose por tipo. */
export function AssignmentsCount({ asignaciones, onVer }: { asignaciones: Asignaciones; onVer: () => void }) {
  const [abierto, setAbierto] = useState(false)
  const porMouse = useRef(false)
  const espera = useRef<number | undefined>(undefined)
  const total = totalAsignaciones(asignaciones)
  if (total === 0) return <span className="text-ink-faint tabular-nums" aria-label="No assignments">0</span>

  const entrar = () => { window.clearTimeout(espera.current); if (!abierto) porMouse.current = true; setAbierto(true) }
  const salir = () => { window.clearTimeout(espera.current); if (porMouse.current) espera.current = window.setTimeout(() => setAbierto(false), 150) }

  return (
    <Popover open={abierto} onOpenChange={setAbierto}>
      <PopoverAnchor asChild>
        <button
          type="button" aria-haspopup="dialog" aria-expanded={abierto} aria-label={\`\${total} assignments\`}
          onMouseEnter={entrar} onMouseLeave={salir}
          onClick={() => { porMouse.current = false; setAbierto(true) }}
          className={cn(
            /* -mx: el fondo del hover sale del número sin correrlo; queda a ras del encabezado, como el 0. */
            '-mx-1.5 rounded px-1.5 py-0.5 font-semibold text-dash-blue tabular-nums underline decoration-dotted underline-offset-4 hover:bg-info-bg',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue',
          )}
        >
          {total}
        </button>
      </PopoverAnchor>
      <PopoverContent
        align="start" className="w-60 gap-2" aria-label="Assignments"
        onMouseEnter={entrar} onMouseLeave={salir}
        onOpenAutoFocus={(e) => { if (porMouse.current) e.preventDefault() }}
      >
        <p className="text-xs font-semibold text-ink">Assignments</p>
        <dl className="flex flex-col gap-1 text-[13px]">
          {TIPOS_ASIGNACION.map((t) => {
            const Icono = ICONO[t]
            return (
              <div key={t} className="flex items-center gap-2">
                <Icono className="size-3.5 shrink-0 text-ink-faint" />
                <dt className="flex-1 text-ink-muted">{t}</dt>
                <dd className={cn('tabular-nums', asignaciones[t].length ? 'font-semibold text-ink' : 'text-ink-faint')}>{asignaciones[t].length}</dd>
              </div>
            )
          })}
        </dl>
        <button type="button" onClick={() => { setAbierto(false); onVer() }} className="self-start text-xs font-medium text-dash-blue hover:underline">
          View assignments
        </button>
      </PopoverContent>
    </Popover>
  )
}

/* View assignments: la lista de cada tipo, con link a la ficha cuando la hay. Para cambiarlas se edita esa ficha. */
export function AssignmentsDrawer({ arancel, asignaciones, onClose }: { arancel: Arancel; asignaciones: Asignaciones; onClose: () => void }) {
  return (
    <ModalShell
      title="Assignments"
      description={\`Who uses \${arancel.nombre} directly. To change it, edit the patient, insurance plan, provider or location.\`}
      onClose={onClose}
      width="max-w-[480px]"
      footer={<Button variant="secondary" onClick={onClose}>Close</Button>}
    >
      <div className="flex flex-col gap-6">
        {TIPOS_ASIGNACION.map((t) => {
          const Icono = ICONO[t]
          return (
            <DrawerSection key={t} title={\`\${t} (\${asignaciones[t].length})\`}>
              {asignaciones[t].length === 0
                ? <p className="text-[13px] text-ink-faint">No {t.toLowerCase()} use this fee schedule.</p>
                : (
                  <ul className="flex flex-col gap-2">
                    {asignaciones[t].map((x) => (
                      <li key={x.id} className="flex items-start gap-2.5">
                        <Icono className="mt-0.5 size-4 shrink-0 text-ink-faint" />
                        <span className="flex min-w-0 flex-col">
                          {x.to
                            ? <Link to={x.to} onClick={onClose} className="truncate text-[13px] font-medium text-dash-blue hover:underline">{x.nombre}</Link>
                            : <span className="truncate text-[13px] font-medium text-ink">{x.nombre}</span>}
                          {x.detalle && <span className="text-xs text-ink-muted">{x.detalle}</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
            </DrawerSection>
          )
        })}
      </div>
    </ModalShell>
  )
}

/* La pestaña Assignments del editor de un fee schedule (prototipo de Julián, 2026-11-27): quién lo usa, por tipo, con
   buscador y Remove. Hay que quitarlas todas antes de desactivar o archivar (CON-496, CON-1276). Los planes van uno por
   fila, con su carrier. Ver settings-billing.md. */
export const GRUPOS_ASIGNACION = ['Locations', 'Insurance plans', 'Providers', 'Patients'] as const
export type GrupoAsignacion = (typeof GRUPOS_ASIGNACION)[number]
type FilaAsignacion = { id: string; nombre: string; detalle?: string }

export function gruposDe(a: Arancel, planes: PlanSeguro[], aseguradoras: Aseguradora[]): Record<GrupoAsignacion, FilaAsignacion[]> {
  const directas = asignacionesDe(a, planes, aseguradoras)
  return {
    Locations: directas.Locations.map(({ id, nombre }) => ({ id, nombre })),
    'Insurance plans': planes
      .filter((p) => p.arancelMaximoId === a.id || Object.values(p.arancelPorLocacion).includes(a.id))
      .map((p) => ({ id: p.id, nombre: aseguradoras.find((c) => c.id === p.aseguradoraId)?.nombre ?? p.nombre, detalle: \`Plan: \${p.nombre}\` })),
    Providers: directas.Providers.map(({ id, nombre }) => ({ id, nombre })),
    Patients: directas.Patients.map(({ id, nombre }) => ({ id, nombre })),
  }
}
export const cuantasAsignaciones = (a: Arancel, planes: PlanSeguro[], aseguradoras: Aseguradora[]) =>
  Object.values(gruposDe(a, planes, aseguradoras)).reduce((n, g) => n + g.length, 0)

const CLAVE: Record<Exclude<GrupoAsignacion, 'Insurance plans'>, keyof Arancel['asignados']> = { Locations: 'locaciones', Providers: 'proveedores', Patients: 'pacientes' }

export function AssignmentsTab({ arancel }: { arancel: Arancel }) {
  const { planes, aseguradoras, guardar } = useFinanzas()
  const [grupo, setGrupo] = useState<GrupoAsignacion>('Locations')
  const [q, setQ] = useState('')
  const [aQuitar, setAQuitar] = useState<FilaAsignacion | null>(null)

  if (arancel.versiones.length === 0) {
    return <EmptyState icon={Building2} title="Assignments become available once this fee schedule is published." className="py-16" />
  }

  const grupos = gruposDe(arancel, planes, aseguradoras)
  const todas = grupos[grupo]
  const filas = todas
    .filter((x) => \`\${x.nombre} \${x.detalle ?? ''}\`.toLowerCase().includes(q.trim().toLowerCase()))
    .sort((x, y) => \`\${x.nombre}\${x.detalle ?? ''}\`.localeCompare(\`\${y.nombre}\${y.detalle ?? ''}\`))

  const quitar = (x: FilaAsignacion) => {
    setAQuitar(null)
    if (grupo === 'Insurance plans') {
      const p = planes.find((y) => y.id === x.id)
      if (p) guardar('planes', {
        ...p, arancelMaximoId: p.arancelMaximoId === arancel.id ? '' : p.arancelMaximoId,
        arancelPorLocacion: Object.fromEntries(Object.entries(p.arancelPorLocacion).filter(([, v]) => v !== arancel.id)),
      })
    } else {
      const k = CLAVE[grupo]
      guardar('aranceles', { ...arancel, asignados: { ...arancel.asignados, [k]: arancel.asignados[k].filter((id) => id !== x.id) } })
    }
    aviso.ok('Assignment removed.')
  }

  return (
    <div className="flex flex-col gap-3.5">
      <Tabs
        size="sm" aria-label="Assignment type" value={grupo} onChange={(g) => { setGrupo(g); setQ('') }}
        tabs={GRUPOS_ASIGNACION.map((g) => ({ value: g, label: \`\${g} (\${grupos[g].length})\` }))}
      />
      <SearchInput size="sm" value={q} onChange={setQ} placeholder={\`Search \${grupo.toLowerCase()} by name\`} aria-label={\`Search \${grupo.toLowerCase()}\`} clearable className="sm:max-w-[340px]" />
      {todas.length === 0 ? <p className="py-8 text-center text-[13px] text-ink-muted">No {grupo.toLowerCase()} assigned.</p>
        : filas.length === 0 ? <p className="py-8 text-center text-[13px] text-ink-muted">No matching results</p>
        : (
          <ul aria-label={grupo} className="flex flex-col gap-1.5">
            {filas.map((x) => (
              <li key={x.id} className="flex items-center justify-between gap-3 rounded-lg border border-line px-3.5 py-2.5">
                <span className="min-w-0">
                  <span className="block truncate text-[13px] text-ink">{x.nombre}</span>
                  {x.detalle && <span className="block text-[11px] text-ink-muted">{x.detalle}</span>}
                </span>
                {/* El tacho de una fila, como en los rangos y las excepciones: sólo ícono, en rojo (settings-billing.md, 2026-11-27). */}
                <button type="button" aria-label={\`Remove \${x.nombre}\${x.detalle ? \` (\${x.detalle})\` : ''}\`} onClick={() => setAQuitar(x)} className={cn(ICONO_SUELTO, 'text-dash-bad-fg')}>
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      {aQuitar && (
        <ConfirmDialog title="Remove assignment?" tone="danger" icon="delete" confirmLabel="Remove" onCancel={() => setAQuitar(null)} onConfirm={() => quitar(aQuitar)}>
          {aQuitar.nombre}{grupo === 'Insurance plans' && aQuitar.detalle ? \` (\${aQuitar.detalle.replace('Plan: ', '')})\` : ''} will stop using {arancel.nombre}.
        </ConfirmDialog>
      )}
    </div>
  )
}
`})))()}export{n,i as r,r as t};