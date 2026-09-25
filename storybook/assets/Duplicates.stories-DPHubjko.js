import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ShieldHalf } from 'lucide-react'
import { Card as CardUi, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch as SwitchUi } from '@/components/ui/switch'
import { Card as CardSettings, Toggle } from '@/components/settings/primitives'
import { Switch as SwitchRoles } from '@/components/settings/RolesLocation'
import { Switch as SwitchInsurance, FilaDato as FilaDatoInsurance } from '@/pages/patients/Insurance'
import { Switch as SwitchLedger } from '@/pages/settings/LedgerOptions'
import { SwitchOpenClose } from '@/pages/settings/LocationDetail'
import { Card as CardPatient } from '@/pages/PatientDetail'
import { Section as SectionEdit } from '@/pages/patients/EditPatient'
import { SectionCard, OptionCheckbox } from '@/components/patients/form'
import { InnerCard } from '@/components/dashboard/primitives'
import { Casilla, OpcionRadio } from '@/components/clinical/TreatmentPlanSection'
import { Radio } from '@/components/scheduling/TreatmentPlanPicker'
import { FilaDato as FilaDatoDashboard } from '@/components/dashboard/PatientDetailsPopover'
import { FilaLectura } from '@/components/patients/insurance/modals'
import { Fila as FilaDetalle } from '@/components/scheduling/AppointmentDetailsDrawer'
import { Field as CampoTarjeta } from '@/components/dashboard/AppointmentCard'
import { Field as CampoUi } from '@/components/ui/field'
import { Codigo, Page, Seccion } from './Page'

/* Piezas que hacen lo mismo y están escritas más de una vez. Cada variante se
   dibuja con su código real y se mide en pantalla (tamaño, radio, borde,
   fondo), así las diferencias salen del DOM y no de una descripción. */
const meta = {
  title: 'Patterns/Duplicates and inconsistencies',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', options: { showPanel: false } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function Medido({ archivo, nombre, children }: { archivo: string; nombre: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [medida, setMedida] = useState('')
  useEffect(() => {
    const raiz = ref.current?.querySelector('[data-medir]')
    if (!raiz) return
    /* Se mide el control mismo: el rol si lo tiene y, si es un botón con la
       pista adentro (interruptores), la pista redondeada. */
    let el: Element | null = raiz.querySelector('[role=switch],[role=checkbox],input') ?? raiz.firstElementChild ?? raiz
    if (el && parseFloat(getComputedStyle(el).borderTopLeftRadius) < 100) {
      const pista = [...el.querySelectorAll('*')].find((h) => parseFloat(getComputedStyle(h).borderTopLeftRadius) >= 100 && h.getBoundingClientRect().width >= 16)
      if (pista) el = pista
    }
    const r = el.getBoundingClientRect()
    const c = getComputedStyle(el)
    const radio = parseFloat(c.borderTopLeftRadius) >= 100 ? 'pill' : c.borderTopLeftRadius
    const borde = c.borderTopWidth !== '0px' ? \` · borde \${c.borderTopWidth} \${c.borderTopColor}\` : ''
    setMedida(\`\${Math.round(r.width)}×\${Math.round(r.height)} · radio \${radio} · fondo \${c.backgroundColor}\${borde} · texto \${c.fontSize}\`)
  }, [])
  return (
    <div ref={ref} className="flex flex-col gap-2 rounded-lg border border-line bg-white p-3">
      <div data-medir className="flex min-h-14 items-center">{children}</div>
      <p className="text-[12px] font-semibold">{nombre}</p>
      <p className="font-mono text-[10.5px] break-words text-ink-muted">{medida || '…'}</p>
      <p className="text-[11px] text-ink-faint"><Codigo>{archivo}</Codigo></p>
    </div>
  )
}

const Grilla = ({ children }: { children: ReactNode }) => <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">{children}</div>

export const Duplicados: Story = {
  name: 'Duplicates and inconsistencies',
  render: () => (
    <Page
      titulo="Duplicates and inconsistencies"
      bajada="Lo que la app resuelve más de una vez. Es lo primero a unificar antes de que un dev lo implemente: hoy hay que elegir cuál de las variantes es la correcta."
    >
      <Seccion titulo="Switch · 6 implementations" nota="Seis interruptores distintos. Comparan tamaño y colores del encendido: no coinciden.">
        <Grilla>
          <Medido nombre="ui/Switch (shadcn)" archivo="components/ui/switch.tsx"><SwitchUi defaultChecked aria-label="ui" /></Medido>
          <Medido nombre="settings Toggle" archivo="components/settings/primitives.tsx"><Toggle on onChange={() => {}} /></Medido>
          <Medido nombre="Roles Switch" archivo="components/settings/RolesLocation.tsx"><SwitchRoles on onChange={() => {}} label="roles" /></Medido>
          <Medido nombre="Insurance Switch" archivo="pages/patients/Insurance.tsx"><SwitchInsurance on onChange={() => {}} label="insurance" /></Medido>
          <Medido nombre="Ledger options Switch" archivo="pages/settings/LedgerOptions.tsx"><SwitchLedger on onChange={() => {}} label="ledger" /></Medido>
          <Medido nombre="Open / Closed switch" archivo="pages/settings/LocationDetail.tsx"><SwitchOpenClose on onChange={() => {}} /></Medido>
        </Grilla>
      </Seccion>

      <Seccion titulo="Card and section containers · 7 implementations" nota="Contenedores blancos con borde: radios, rellenos y sombras distintos.">
        <Grilla>
          <Medido nombre="ui/Card" archivo="components/ui/card.tsx"><CardUi className="w-full"><CardHeader><CardTitle>Title</CardTitle></CardHeader><CardContent>Body</CardContent></CardUi></Medido>
          <Medido nombre="settings Card" archivo="components/settings/primitives.tsx"><CardSettings title="Title" className="w-full">Body</CardSettings></Medido>
          <Medido nombre="patient dashboard Card" archivo="pages/PatientDetail.tsx"><CardPatient className="w-full p-4">Body</CardPatient></Medido>
          <Medido nombre="SectionCard (forms)" archivo="components/patients/form.tsx"><SectionCard title="Title" className="w-full">Body</SectionCard></Medido>
          <Medido nombre="EditPatient Section" archivo="pages/patients/EditPatient.tsx"><SectionEdit title="Title">Body</SectionEdit></Medido>
          <Medido nombre="dashboard InnerCard" archivo="components/dashboard/primitives.tsx"><InnerCard className="w-full p-4">Body</InnerCard></Medido>
        </Grilla>
      </Seccion>

      <Seccion titulo="Checkbox · 3 implementations">
        <Grilla>
          <Medido nombre="ui/Checkbox" archivo="components/ui/checkbox.tsx"><Checkbox on onChange={() => {}} label="ui" /></Medido>
          <Medido nombre="Treatment plan Casilla" archivo="components/clinical/TreatmentPlanSection.tsx"><Casilla on onChange={() => {}} label="casilla" /></Medido>
          <Medido nombre="Form OptionCheckbox" archivo="components/patients/form.tsx"><OptionCheckbox label="Option" defaultChecked /></Medido>
        </Grilla>
      </Seccion>

      <Seccion titulo="Radio · 3 implementations">
        <Grilla>
          <Medido nombre="Plan picker Radio" archivo="components/scheduling/TreatmentPlanPicker.tsx"><Radio on /></Medido>
          <Medido nombre="Dialog OpcionRadio" archivo="components/clinical/TreatmentPlanSection.tsx"><div className="w-full"><OpcionRadio on titulo="Option" detalle="Detail" onClick={() => {}} /></div></Medido>
        </Grilla>
      </Seccion>

      <Seccion titulo="Data row with icon · 4 implementations">
        <Grilla>
          <Medido nombre="Dashboard popover FilaDato" archivo="components/dashboard/PatientDetailsPopover.tsx"><FilaDatoDashboard icon={ShieldHalf} label="Carrier" value="Delta Dental" /></Medido>
          <Medido nombre="Insurance FilaDato" archivo="pages/patients/Insurance.tsx"><FilaDatoInsurance icon={ShieldHalf} label="Carrier" value="Delta Dental" /></Medido>
          <Medido nombre="Insurance modal FilaLectura" archivo="components/patients/insurance/modals.tsx"><FilaLectura icon={ShieldHalf} label="Carrier" value="Delta Dental" /></Medido>
          <Medido nombre="Appointment details Fila" archivo="components/scheduling/AppointmentDetailsDrawer.tsx"><FilaDetalle icono={ShieldHalf}>Delta Dental</FilaDetalle></Medido>
        </Grilla>
      </Seccion>

      <Seccion titulo="Text field · 2 implementations">
        <Grilla>
          <Medido nombre="ui/Field" archivo="components/ui/field.tsx"><div className="grid w-full grid-cols-12"><CampoUi id="dup" label="Name" placeholder="Name" /></div></Medido>
          <Medido nombre="Appointment card Field" archivo="components/dashboard/AppointmentCard.tsx"><CampoTarjeta icon={<ShieldHalf className="size-4" />} text="Operatory 2" /></Medido>
        </Grilla>
      </Seccion>
    </Page>
  ),
}
`})))()}export{n,i as r,r as t};