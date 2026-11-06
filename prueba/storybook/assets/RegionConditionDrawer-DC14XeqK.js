import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useState } from 'react'
import { Chip } from '@/components/ui/chip'
import { SearchPicker } from '@/components/ui/search-picker'
import { Drawer, DrawerActions, DrawerStep } from '@/components/ui/drawer'
import { FieldLabel } from '@/components/patients/form'
import { DescriptorFields } from './DescriptorFields'
import { OpcionCondicion } from './OpcionesVinculo'
import { REGION_CONDITIONS } from './data'

export type RegionConditionDraft = {
  condition: { code: string; label: string; group: string }
  regions: string[]
  descriptors: Record<string, string>
}

/* New Condition de Extraoral/Intraoral (el mismo drawer para los dos): dos pasos, los dos titulados "New Condition" como en la app real (sin
   indicador de pasos -ahí no lo tiene-, pero acá sí lo mostramos: es la convención de todos los drawers de la app,
   StepIndicator con nombre de paso, y no hay motivo para sacarlo sólo en éste). Paso 1: las regiones elegidas en el
   gráfico (afuera, como chips removibles) y el catálogo de condición, propio -no el de procedimientos-, con buscador.
   Paso 2: la guía visual de descriptores (DescriptorFields), igual que Add/Edit Condition del resto de la app.
   El botón del paso 1 dice "Select descriptors" en vez de "Next Step" -así lo dice la app real-. Sólo abre con al
   menos una región elegida (RegionExam); si se sacan todas acá, no deja avanzar (clinical-mode.md, 2026-10-28). Ver
   design-reference/figma/modulos/clinical-mode.md (2026-10-24). */
export function RegionConditionDrawer({
  open, regions, onRemoveRegion, onClose, onSave,
}: {
  open: boolean
  /** Las regiones elegidas en el gráfico, afuera de este drawer. */
  regions: string[]
  onRemoveRegion: (region: string) => void
  onClose: () => void
  onSave: (draft: RegionConditionDraft) => void
}) {
  const [paso, setPaso] = useState(0)
  const [code, setCode] = useState<string | null>(null)
  const [descriptors, setDescriptors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!open) return
    setPaso(0); setCode(null); setDescriptors({})
  }, [open])

  const condition = REGION_CONDITIONS.find((c) => c.code === code) ?? null
  const pasos = ['Condition', 'Descriptors']

  const listo = !!condition && regions.length > 0
  function guardar() {
    if (!condition || !regions.length) return
    onSave({ condition, regions, descriptors })
  }

  const footer = (
    <DrawerActions
      step={paso} total={pasos.length} onNext={() => setPaso(1)} onBack={() => setPaso(0)} onCancel={onClose}
      onSave={guardar} nextDisabled={!listo} saveDisabled={!listo}
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
                  : <span className="text-xs font-medium text-ink-faint">Select at least one area on the chart.</span>}
              </div>
            </div>

            <div className="flex w-full flex-col items-start gap-1.5">
              <FieldLabel required>Condition</FieldLabel>
              <SearchPicker
                items={REGION_CONDITIONS} getId={(c) => c.code} getText={(c) => \`\${c.label} \${c.group}\`}
                renderOption={(c) => <OpcionCondicion nombre={c.label} grupo={c.group} />}
                selected={condition ? [condition] : []} onSelect={(c) => setCode(c.code)} onRemove={() => setCode(null)}
                placeholder="Search a Condition Here..." emptyText="No condition matches that search."
              />
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