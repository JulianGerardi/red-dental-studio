import { useState } from 'react'
import { DrawerActions, DrawerSection, DrawerStep } from '@/components/ui/drawer'
import { ModalShell } from '@/components/patients/form'
import {
  PLAN_VACIO, PlanAddressFields, PlanConfigurationFields, PlanContactFields, PlanGeneralFields, obligatoriosPlan, planDeForm,
} from '@/components/finance/PlanFields'
import { useFormPasos } from '@/lib/useFormPasos'
import { useFinanzas } from '@/data/finanzasStore'
import { TELEFONO_VACIO, idNuevo, planVacio, type PlanSeguro } from '@/data/finanzas'

/* New Insurance Plan: en red.dev es la ficha del plan con sólo Detail habilitada hasta guardar. Acá Detail es un drawer con
   un paso por grupo; al guardar se abre la ficha para seguir con Coverage Table y lo demás. Ver settings-billing.md. */

const PASOS = ['General', 'Contact', 'Address', 'Configurations'] as const

export function PlanDrawer({ aseguradoraId, onClose, onGuardar }: {
  aseguradoraId: string
  onClose: () => void
  onGuardar: (p: PlanSeguro) => void
}) {
  const { planes, aranceles } = useFinanzas()
  const [codigo, setCodigo] = useState(TELEFONO_VACIO.codigo)
  const { d, set, falta, paso, siguiente, atras, listo } = useFormPasos(PLAN_VACIO, obligatoriosPlan(codigo))

  const guardar = () => {
    if (!listo()) return
    const base = { ...planVacio(aseguradoraId), id: idNuevo(d.nombre, planes.map((p) => p.id)) }
    onGuardar(planDeForm(d, codigo, base, aranceles))
    onClose()
  }

  return (
    <ModalShell
      title="New Insurance Plan"
      description="The plan or employer group. Its coverage, deductibles and benefits are set up next."
      onClose={onClose}
      width="max-w-[560px]"
      steps={PASOS}
      step={paso}
      actions={<DrawerActions step={paso} total={PASOS.length} onNext={siguiente} onBack={atras} onCancel={onClose} onSave={guardar} />}
    >
      <DrawerStep index={0} step={paso}>
        <DrawerSection title="General description"><PlanGeneralFields d={d} set={set} falta={falta} /></DrawerSection>
      </DrawerStep>
      <DrawerStep index={1} step={paso}>
        <DrawerSection title="Contact Information"><PlanContactFields d={d} set={set} falta={falta} codigo={codigo} onCodigo={setCodigo} /></DrawerSection>
      </DrawerStep>
      <DrawerStep index={2} step={paso}>
        <DrawerSection title="Address Information"><PlanAddressFields d={d} set={set} falta={falta} /></DrawerSection>
      </DrawerStep>
      <DrawerStep index={3} step={paso}>
        <DrawerSection title="Configurations"><PlanConfigurationFields d={d} set={set} falta={falta} aranceles={aranceles} /></DrawerSection>
      </DrawerStep>
    </ModalShell>
  )
}
