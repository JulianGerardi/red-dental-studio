import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Chip } from '@/components/ui/chip'
import { Drawer, DrawerActions, DrawerStep } from '@/components/ui/drawer'
import { FieldLabel, control } from '@/components/patients/form'
import { DescriptorFields } from './DescriptorFields'
import { REGION_CONDITIONS, type ExtraOralRegion } from './data'

export type RegionConditionDraft = {
  condition: { code: string; label: string; group: string }
  regions: ExtraOralRegion[]
  descriptors: Record<string, string>
}

/* New Condition de Extraoral/Intraoral: dos pasos, los dos titulados "New Condition" como en la app real (sin
   indicador de pasos -ahí no lo tiene-, pero acá sí lo mostramos: es la convención de todos los drawers de la app,
   StepIndicator con nombre de paso, y no hay motivo para sacarlo sólo en éste). Paso 1: las regiones elegidas en el
   gráfico (afuera, como chips removibles) y el catálogo de condición, propio -no el de procedimientos-, con buscador.
   Paso 2: la guía visual de descriptores (DescriptorFields), igual que Add/Edit Condition del resto de la app.
   El botón del paso 1 dice "Select descriptors" en vez de "Next Step" -así lo dice la app real-. Ver
   design-reference/figma/modulos/clinical-mode.md (2026-10-24). */
export function RegionConditionDrawer({
  open, regions, onRemoveRegion, onClose, onSave,
}: {
  open: boolean
  /** Las regiones elegidas en el gráfico, afuera de este drawer. */
  regions: ExtraOralRegion[]
  onRemoveRegion: (region: ExtraOralRegion) => void
  onClose: () => void
  onSave: (draft: RegionConditionDraft) => void
}) {
  const [paso, setPaso] = useState(0)
  const [query, setQuery] = useState('')
  const [code, setCode] = useState<string | null>(null)
  const [descriptors, setDescriptors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!open) return
    setPaso(0); setQuery(''); setCode(null); setDescriptors({})
  }, [open])

  const condition = REGION_CONDITIONS.find((c) => c.code === code) ?? null
  const q = query.trim().toLowerCase()
  const lista = REGION_CONDITIONS.filter((c) => !q || c.label.toLowerCase().includes(q))
  const pasos = ['Condition', 'Descriptors']

  function guardar() {
    if (!condition) return
    onSave({ condition, regions, descriptors })
  }

  const footer = (
    <DrawerActions
      step={paso} total={pasos.length} onNext={() => setPaso(1)} onBack={() => setPaso(0)} onCancel={onClose}
      onSave={guardar} nextDisabled={!condition} saveDisabled={!condition}
      nextLabel="Select descriptors"
    />
  )

  return (
    <Drawer open={open} onClose={onClose} title="New Condition" steps={pasos} step={paso} footer={footer}>
      <DrawerStep key={paso === 0 ? 'Condition' : 'Descriptors'} index={paso} step={paso}>
        {paso === 0 ? (
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full flex-col items-start gap-2 border-b border-line pb-4">
              <FieldLabel required>Selected area</FieldLabel>
              <div className="flex w-full flex-wrap gap-2">
                {regions.length
                  ? regions.map((r) => <Chip key={r} removeLabel={\`Remove \${r}\`} onRemove={() => onRemoveRegion(r)}>{r}</Chip>)
                  : <span className="text-xs font-medium text-ink-faint">Click a region on the diagram.</span>}
              </div>
            </div>

            <div className="flex w-full flex-col items-start gap-1.5">
              <FieldLabel required>Condition</FieldLabel>
              <div className="relative w-full">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
                <input
                  value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search a Condition Here..."
                  aria-label="Search a Condition Here..."
                  className={cn(control(), 'h-9 pr-3 pl-9')}
                />
              </div>
            </div>

            <div className="flex max-h-[360px] w-full flex-col items-start gap-2 overflow-y-auto">
              {lista.map((c) => {
                const on = c.code === code
                return (
                  <button
                    key={c.code} type="button" onClick={() => setCode(c.code)} aria-pressed={on}
                    className={cn(
                      'w-full rounded-md border px-3 py-2.5 text-left text-xs font-semibold transition-colors',
                      on ? 'border-dash-blue text-dash-blue' : 'border-line text-ink hover:bg-surface-subtle',
                    )}
                  >
                    {c.label} <span className="font-medium text-ink-faint">({c.group})</span>
                  </button>
                )
              })}
              {!lista.length && <p className="w-full py-6 text-center text-xs text-ink-faint">No condition matches that search.</p>}
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full flex-col gap-1">
              <p className="text-sm font-bold text-ink">Descriptors</p>
              <p className="text-[11px] leading-relaxed text-ink-faint">
                Optional: describe what the condition looks like. Tap a pill again to clear it.
              </p>
            </div>
            <DescriptorFields value={descriptors} onChange={setDescriptors} />
          </div>
        )}
      </DrawerStep>
    </Drawer>
  )
}
`})))()}export{n,i as r,r as t};