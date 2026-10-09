import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FieldLabel, FormFooter, ModalShell, control } from '@/components/patients/form'
import { DrawerSection } from '@/components/ui/drawer'
import { Tabs } from '@/components/ui/tabs'
import { OpcionDireccion } from '@/components/patients/AddRelationshipDrawer'
import { useFinanzas } from '@/data/finanzasStore'
import { cantidad, type Rango, type TipoCobertura } from '@/data/finanzas'

/* Copy from (red.dev, Coverage Table del plan): copia los rangos de una plantilla o de otro plan. Reemplaza los del plan
   recién al guardar la pestaña. Ver settings-billing.md. */

const ORIGENES = ['Copy from template', 'Copy from insurance'] as const
type Origen = (typeof ORIGENES)[number]
type Opcion = { id: string; nombre: string; detalle: string; tipo: TipoCobertura; rangos: Rango[] }

export function CopyFromDrawer({ planId, onClose, onCopiar }: {
  /** El plan que se está editando: no aparece entre los de origen. */
  planId?: string
  onClose: () => void
  onCopiar: (o: { nombre: string; tipo: TipoCobertura; rangos: Rango[] }) => void
}) {
  const { coberturas, planes, aseguradoras } = useFinanzas()
  const [origen, setOrigen] = useState<Origen>('Copy from template')
  const [q, setQ] = useState('')
  const [elegida, setElegida] = useState<string | null>(null)

  const opciones: Opcion[] = useMemo(() => (origen === 'Copy from template'
    ? coberturas.map((c) => ({ id: c.id, nombre: c.nombre, detalle: `${c.tipo} · ${cantidad(c.rangos.length, 'range')}`, tipo: c.tipo, rangos: c.rangos }))
    : planes.filter((p) => p.id !== planId && p.cobertura.rangos.length).map((p) => ({
      id: p.id, nombre: p.nombre, detalle: `${aseguradoras.find((a) => a.id === p.aseguradoraId)?.nombre ?? ''} · ${cantidad(p.cobertura.rangos.length, 'range')}`,
      tipo: p.cobertura.tipo, rangos: p.cobertura.rangos,
    }))
  ).filter((o) => o.nombre.toLowerCase().includes(q.trim().toLowerCase())), [origen, coberturas, planes, aseguradoras, planId, q])

  const confirmar = () => {
    const o = opciones.find((x) => x.id === elegida)
    if (!o) return
    onCopiar({ nombre: o.nombre, tipo: o.tipo, rangos: o.rangos.map((r) => ({ ...r, id: `${r.id}-${Math.random().toString(36).slice(2, 6)}` })) })
    onClose()
  }

  return (
    <ModalShell
      title="Copy from"
      description="Copy the form to the coverage table"
      onClose={onClose}
      width="max-w-[560px]"
      footer={<FormFooter onCancel={onClose} onSave={confirmar} saveLabel="Confirm" />}
    >
      <div className="flex flex-col gap-6">
        <Tabs aria-label="Copy from" tabs={[...ORIGENES]} value={origen} onChange={(v) => { setOrigen(v); setElegida(null) }} fullWidth />
        <DrawerSection title={origen === 'Copy from template' ? 'Coverage tables' : 'Insurance plans'}>
          <label className="flex flex-col gap-2">
            <FieldLabel>Search</FieldLabel>
            <span className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for name" className={cn(control(), 'h-9 pr-3 pl-9')} />
            </span>
          </label>
          <div role="radiogroup" aria-label={origen === 'Copy from template' ? 'Coverage tables' : 'Insurance plans'} className="flex flex-col gap-2">
            {opciones.map((o) => (
              <OpcionDireccion key={o.id} texto={`${o.nombre} — ${o.detalle}`} elegida={elegida === o.id} onElegir={() => setElegida(o.id)} />
            ))}
            {opciones.length === 0 && <p className="py-6 text-center text-[13px] text-ink-muted">No results for “{q}”.</p>}
          </div>
        </DrawerSection>
      </div>
    </ModalShell>
  )
}
