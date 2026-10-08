import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { DrawerActions, DrawerSection, DrawerStep } from '@/components/ui/drawer'
import { ModalShell, SelectField, TextField } from '@/components/patients/form'
import { InnerCard } from '@/components/dashboard/primitives'
import { CoverageSummary } from '@/components/finance/CoverageSummary'
import { useFormPasos } from '@/lib/useFormPasos'
import { useFinanzas } from '@/data/finanzasStore'
import { TIPOS_PLAN, idNuevo, type Estado, type PlanSeguro, type TipoPlan } from '@/data/finanzas'

/* New / Edit Plan: el plan de un carrier y los dos datos que lo hacen cobrable, su fee schedule y su coverage table.
   Pasos Plan y Billing. Desde el detalle de un carrier, el carrier viene fijo. Ver settings-billing.md. */

const PASOS = ['Plan', 'Billing'] as const

export function PlanDrawer({
  inicial, aseguradoraId, onClose, onGuardar,
}: {
  /** Con un plan, lo edita. */
  inicial?: PlanSeguro
  /** Carrier fijo (se abre desde su detalle). */
  aseguradoraId?: string
  onClose: () => void
  onGuardar: (p: PlanSeguro) => void
}) {
  const { aseguradoras, aranceles, coberturas, planes } = useFinanzas()
  const nombreDe = <T extends { id: string; nombre: string }>(lista: T[], id?: string) => lista.find((x) => x.id === id)?.nombre ?? ''
  const fijo = aseguradoraId ?? inicial?.aseguradoraId
  const { d, set, falta, paso, siguiente, atras, listo } = useFormPasos(
    {
      carrier: nombreDe(aseguradoras, fijo), nombre: inicial?.nombre ?? '', grupo: inicial?.grupo ?? '', empleador: inicial?.empleador ?? '',
      tipo: inicial?.tipo ?? '', estado: inicial?.estado ?? 'Active',
      arancel: nombreDe(aranceles, inicial?.arancelId), cobertura: nombreDe(coberturas, inicial?.coberturaId),
    },
    [['carrier', 'nombre', 'grupo', 'tipo'], ['arancel', 'cobertura']],
  )
  const arancel = aranceles.find((a) => a.nombre === d.arancel)
  const cobertura = coberturas.find((t) => t.nombre === d.cobertura)
  /* Sólo se ofrece lo activo; lo que el plan ya tenía se mantiene aunque esté inactivo. */
  const activos = <T extends { id: string; nombre: string; estado: Estado }>(lista: T[], actual?: string) =>
    lista.filter((x) => x.estado === 'Active' || x.id === actual).map((x) => x.nombre)

  const guardar = () => {
    if (!listo() || !arancel || !cobertura) return
    const carrier = aseguradoras.find((a) => a.nombre === d.carrier)!
    onGuardar({
      id: inicial?.id ?? idNuevo(\`p-\${d.nombre}\`, planes.map((p) => p.id)),
      aseguradoraId: carrier.id, nombre: d.nombre.trim(), grupo: d.grupo.trim().toUpperCase(), empleador: d.empleador.trim(),
      tipo: d.tipo as TipoPlan, arancelId: arancel.id, coberturaId: cobertura.id,
      suscriptores: inicial?.suscriptores ?? 0, estado: d.estado as Estado,
    })
    onClose()
  }

  return (
    <ModalShell
      title={inicial ? 'Edit Plan' : 'New Plan'}
      description={inicial ? inicial.nombre : 'A plan of the carrier and how it is billed.'}
      onClose={onClose}
      width="max-w-[560px]"
      steps={PASOS}
      step={paso}
      actions={<DrawerActions step={paso} total={PASOS.length} onNext={siguiente} onBack={atras} onCancel={onClose} onSave={guardar} />}
    >
      <DrawerStep index={0} step={paso}>
        <DrawerSection title="Plan Information">
          <SelectField
            label="Carrier" required placeholder="Select a carrier"
            options={activos(aseguradoras, fijo)} value={d.carrier} onChange={set('carrier')} error={falta('carrier')}
            disabled={!!fijo}
          />
          <TextField label="Plan Name" required placeholder="e.g. Dental PPO Plus" value={d.nombre} onChange={set('nombre')} error={falta('nombre')} />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Group Number" required placeholder="e.g. AET-100245" value={d.grupo} onChange={set('grupo')} error={falta('grupo')} />
            <TextField label="Employer" placeholder="Company or group" value={d.empleador} onChange={set('empleador')} />
            <SelectField label="Plan Type" required options={[...TIPOS_PLAN]} value={d.tipo} onChange={set('tipo')} error={falta('tipo')} />
            {inicial && <SelectField label="Status" required options={['Active', 'Inactive']} value={d.estado} onChange={set('estado')} />}
          </div>
        </DrawerSection>
      </DrawerStep>

      <DrawerStep index={1} step={paso}>
        <DrawerSection title="Fee Schedule" description="What your office charges patients of this plan.">
          <SelectField
            label="Fee Schedule" required placeholder="Select a fee schedule"
            options={activos(aranceles, inicial?.arancelId)} value={d.arancel} onChange={set('arancel')} error={falta('arancel')}
            hint={arancel ? \`\${arancel.tipo} · \${Object.keys(arancel.precios).length} procedures priced\` : undefined}
          />
        </DrawerSection>
        <DrawerSection title="Coverage Table" description="What the plan pays for each procedure category.">
          <SelectField
            label="Coverage Table" required placeholder="Select a coverage table"
            options={activos(coberturas, inicial?.coberturaId)} value={d.cobertura} onChange={set('cobertura')} error={falta('cobertura')}
          />
          {cobertura && (
            <InnerCard className="px-3 py-2.5">
              <CoverageSummary tabla={cobertura} limites />
            </InnerCard>
          )}
        </DrawerSection>
      </DrawerStep>
    </ModalShell>
  )
}
`})))()}export{n,i as r,r as t};