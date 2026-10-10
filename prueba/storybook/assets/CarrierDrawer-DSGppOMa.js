import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { DrawerActions, DrawerSection, DrawerStep } from '@/components/ui/drawer'
import { ModalShell, OptionCheckbox, SearchField, SelectField, TextField } from '@/components/patients/form'
import { PhoneFields, UnitField } from '@/components/finance/fields'
import { useFormPasos } from '@/lib/useFormPasos'
import { useFinanzas } from '@/data/finanzasStore'
import { FORMATOS_RECLAMO, PAGADORES, TELEFONO_VACIO, esNorteamerica, idNuevo, opcionPagador, type Aseguradora } from '@/data/finanzas'

/* New Carrier: la página de red.dev como drawer con dos pasos, General y Contact. Carrier Name busca el payer y completa su
   Payer ID; Location Number se carga después, en Edit Carrier. Ver settings-billing.md. */

const VACIO = { nombre: '', payerId: '', formato: '', dias: '', email: '', sitio: '', area: '', numero: '' }
const PASOS = ['General', 'Contact'] as const

export function CarrierDrawer({ onClose, onGuardar }: { onClose: () => void; onGuardar: (c: Aseguradora) => void }) {
  const { aseguradoras } = useFinanzas()
  const [codigo, setCodigo] = useState(TELEFONO_VACIO.codigo)
  const { d, set, falta, paso, siguiente, atras, listo } = useFormPasos(VACIO, [
    ['nombre', 'payerId', 'formato', 'dias'],
    esNorteamerica(codigo) ? ['email', 'area', 'numero'] : ['email', 'numero'],
  ])
  const [sinDiagnosticos, setSinDiagnosticos] = useState(false)
  const [noFacturar, setNoFacturar] = useState(false)

  const repetido = !!d.nombre.trim() && aseguradoras.some((a) => a.nombre.toLowerCase() === d.nombre.trim().toLowerCase())

  /* El buscador sugiere "Aetna Dental Plans - 60054": al elegirlo, se separan el nombre y el Payer ID. */
  const elegirNombre = (v: string) => {
    const p = PAGADORES.find((x) => opcionPagador(x) === v)
    set('nombre')(p ? p.nombre : v)
    if (p) set('payerId')(p.payerId)
  }

  const guardar = () => {
    if (!listo() || repetido) return
    onGuardar({
      id: idNuevo(d.nombre, aseguradoras.map((a) => a.id)),
      nombre: d.nombre.trim(), payerId: d.payerId.trim(), formato: d.formato, diasResolucion: Number(d.dias),
      sinDiagnosticos, noFacturar, email: d.email.trim(), sitio: d.sitio.trim(),
      telefono: { codigo, area: esNorteamerica(codigo) ? d.area : '', numero: d.numero }, numerosLocacion: {},
    })
    onClose()
  }

  return (
    <ModalShell
      title="New Carrier"
      description="The insurance company you send claims to. Add its insurance plans next."
      onClose={onClose}
      width="max-w-[560px]"
      steps={PASOS}
      step={paso}
      actions={<DrawerActions step={paso} total={PASOS.length} onNext={() => !repetido && siguiente()} onBack={atras} onCancel={onClose} onSave={guardar} />}
    >
      <DrawerStep index={0} step={paso}>
        <DrawerSection title="General Information">
          <SearchField
            label="Carrier Name" required placeholder="Select carrier" options={PAGADORES.map(opcionPagador)}
            value={d.nombre} onChange={elegirNombre}
            error={falta('nombre') ?? (repetido ? 'This carrier is already in your list.' : undefined)}
            hint="Search the payer list, or type the name of a new one."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Payer ID" required placeholder="00000" value={d.payerId} onChange={set('payerId')} error={falta('payerId')} />
            <SelectField label="Printed Claim Format" required placeholder="Select a printed claim format" options={FORMATOS_RECLAMO} value={d.formato} onChange={set('formato')} error={falta('formato')} />
          </div>
          <UnitField
            label="Expected Period of Insurance Claim Resolution" required unit="days" value={Number(d.dias) || 0}
            onChange={(n) => set('dias')(n > 0 ? String(n) : '')} error={falta('dias')}
          />
          <div className="grid gap-2 sm:grid-cols-2">
            <OptionCheckbox label="Do not include Dental Diagnostic Codes" checked={sinDiagnosticos} onChange={setSinDiagnosticos} />
            <OptionCheckbox label="Do not bill Insurance" checked={noFacturar} onChange={setNoFacturar} />
          </div>
        </DrawerSection>
      </DrawerStep>

      <DrawerStep index={1} step={paso}>
        <DrawerSection title="Contact Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Email" required placeholder="example@example.com" value={d.email} onChange={set('email')} error={falta('email')} />
            <TextField label="Website" placeholder="Introduce your website link" value={d.sitio} onChange={set('sitio')} />
          </div>
          <PhoneFields
            required value={{ codigo, area: d.area, numero: d.numero }}
            onChange={(t) => { setCodigo(t.codigo); set('area')(t.area); set('numero')(t.numero) }}
            errores={{ area: falta('area'), numero: falta('numero') }}
          />
        </DrawerSection>
      </DrawerStep>
    </ModalShell>
  )
}
`})))()}export{n,i as r,r as t};