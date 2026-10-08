import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { DrawerActions, DrawerSection, DrawerStep } from '@/components/ui/drawer'
import { DateTextField, ModalShell, OptionCheckbox, SelectField, TextArea, TextField } from '@/components/patients/form'
import { InnerCard } from '@/components/dashboard/primitives'
import { useFormPasos } from '@/lib/useFormPasos'
import { useFinanzas } from '@/data/finanzasStore'
import {
  PROCEDIMIENTOS, TIPOS_ARANCEL, ajustar, dinero, fechaCorta, fechaLarga, idNuevo, numero,
  type Arancel, type TipoArancel,
} from '@/data/finanzas'

/* New / Edit Fee Schedule. Nuevo: General y Fees (de qué fee schedule copia los precios y con qué ajuste); editar sólo
   cambia General: los precios se tocan en la tabla o con Adjust fees. Ver settings-billing.md. */

const SIN_BASE = 'Empty schedule'

const AYUDA_TIPO: Record<TipoArancel, string> = {
  UCR: 'Your full office fees.',
  PPO: 'Fees contracted with a carrier.',
  Medicaid: 'Fees set by the state program.',
  'Discount plan': 'Fees for your in-house membership or discount plan.',
}

export function FeeScheduleDrawer({
  inicial, onClose, onGuardar,
}: {
  /** Con un fee schedule, edita sus datos generales. */
  inicial?: Arancel
  onClose: () => void
  onGuardar: (a: Arancel) => void
}) {
  const { aranceles } = useFinanzas()
  const editando = !!inicial
  const pasos = editando ? ['General'] : ['General', 'Fees']
  const { d, set, falta, paso, siguiente, atras, listo } = useFormPasos(
    {
      nombre: inicial?.nombre ?? '', tipo: inicial?.tipo ?? '', vigencia: inicial ? fechaCorta(inicial.vigencia) : '',
      descripcion: inicial?.descripcion ?? '', base: '', ajuste: '',
    },
    editando ? [['nombre', 'tipo', 'vigencia']] : [['nombre', 'tipo', 'vigencia'], ['base']],
  )
  const [porDefecto, setPorDefecto] = useState(inicial?.porDefecto ?? false)

  const repetido = aranceles.some((a) => a.id !== inicial?.id && a.nombre.toLowerCase() === d.nombre.trim().toLowerCase())
  const errorNombre = falta('nombre') ?? (repetido ? 'A fee schedule with this name already exists.' : undefined)
  const errorFecha = falta('vigencia') ?? (d.vigencia.trim() && !fechaLarga(d.vigencia) ? 'Enter a valid date.' : undefined)
  const ajuste = numero(d.ajuste)
  const errorAjuste = d.ajuste.trim() && (ajuste === null || ajuste < -90 || ajuste > 200) ? 'Enter a number between -90 and 200.' : undefined
  const base = aranceles.find((a) => a.nombre === d.base)
  const muestra = base ? PROCEDIMIENTOS.filter((p) => base.precios[p.code] !== undefined).slice(0, 4) : []

  const avanzar = () => { if (!repetido && !(d.vigencia.trim() && !fechaLarga(d.vigencia))) siguiente() }
  const guardar = () => {
    if (!listo() || repetido || errorAjuste || !fechaLarga(d.vigencia)) return
    const precios = inicial?.precios ?? (base ? Object.fromEntries(Object.entries(base.precios).map(([c, v]) => [c, ajustar(v, ajuste ?? 0)])) : {})
    onGuardar({
      id: inicial?.id ?? idNuevo(d.nombre, aranceles.map((a) => a.id)),
      nombre: d.nombre.trim(), tipo: d.tipo as TipoArancel, descripcion: d.descripcion.trim(), vigencia: fechaLarga(d.vigencia),
      porDefecto, estado: porDefecto ? 'Active' : (inicial?.estado ?? 'Active'), precios,
    })
    onClose()
  }

  return (
    <ModalShell
      title={editando ? 'Edit Fee Schedule' : 'New Fee Schedule'}
      description={editando ? 'Name, type and effective date. Fees are edited in the table.' : 'What your office charges for each procedure.'}
      onClose={onClose}
      width="max-w-[560px]"
      steps={pasos}
      step={paso}
      actions={<DrawerActions step={paso} total={pasos.length} onNext={avanzar} onBack={atras} onCancel={onClose} onSave={guardar} />}
    >
      <DrawerStep index={0} step={paso}>
        <DrawerSection title="General Information">
          <TextField label="Name" required placeholder="e.g. PPO Fees 2026" value={d.nombre} onChange={set('nombre')} error={errorNombre} />
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField label="Type" required options={[...TIPOS_ARANCEL]} value={d.tipo} onChange={set('tipo')} error={falta('tipo')} hint={d.tipo ? AYUDA_TIPO[d.tipo as TipoArancel] : undefined} />
            <DateTextField label="Effective Date" required value={d.vigencia} onChange={set('vigencia')} error={errorFecha} />
          </div>
          <TextArea label="Description" rows={3} placeholder="Who uses these fees" value={d.descripcion} onChange={set('descripcion')} />
          <OptionCheckbox
            label="Use as the default fee schedule. Patients without insurance are charged these fees."
            checked={porDefecto}
            onChange={setPorDefecto}
            disabled={inicial?.porDefecto}
          />
        </DrawerSection>
      </DrawerStep>

      {!editando && (
        <DrawerStep index={1} step={paso}>
          <DrawerSection title="Fees" description="Copy the fees of another schedule and adjust them all at once. You can edit each fee later.">
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField label="Start From" required options={[...aranceles.map((a) => a.nombre), SIN_BASE]} value={d.base} onChange={set('base')} error={falta('base')} />
              <TextField
                label="Adjustment (%)"
                placeholder="0"
                value={d.ajuste}
                onChange={set('ajuste')}
                error={errorAjuste}
                hint="Use a negative number for a discount, e.g. -10."
                disabled={!base}
              />
            </div>
          </DrawerSection>
          {base && (
            <DrawerSection title="Preview" description={`${Object.keys(base.precios).length} fees copied from ${base.nombre}${ajuste ? `, ${ajuste > 0 ? 'up' : 'down'} ${Math.abs(ajuste)}%` : ''}.`}>
              <InnerCard className="divide-y divide-line-row">
                {muestra.map((p) => (
                  <div key={p.code} className="flex items-center gap-3 px-3 py-2.5 text-[12.5px]">
                    <span className="w-12 shrink-0 font-semibold text-ink">{p.code}</span>
                    <span className="min-w-0 flex-1 truncate text-ink-muted" title={p.label}>{p.label}</span>
                    <span className="shrink-0 text-ink-faint tabular-nums">{dinero(base.precios[p.code], true)}</span>
                    <ArrowRight aria-hidden className="size-3.5 shrink-0 text-ink-faint" />
                    <span className="w-20 shrink-0 text-right font-semibold text-ink tabular-nums">{dinero(ajustar(base.precios[p.code], errorAjuste ? 0 : (ajuste ?? 0)), true)}</span>
                  </div>
                ))}
              </InnerCard>
            </DrawerSection>
          )}
          {d.base === SIN_BASE && (
            <p className="text-[12px] leading-relaxed text-ink-muted">The schedule starts with no fees. Add them one by one in the fees table.</p>
          )}
        </DrawerStep>
      )}
    </ModalShell>
  )
}
