import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { CirclePlus, Pencil, ShieldHalf, Hospital, AArrowUp } from 'lucide-react'
import {
  ModalShell, SectionCard, SearchField, SelectField, TextField,
  DateTextField, TextArea, OptionCheckbox, FormFooter,
} from '@/components/patients/form'
import { PersonaSeleccionada, DIRECTORIO } from '@/pages/patients/AddRelationship'
import { CARRIERS, PLANES_NOMBRE, ORDENES, SUSCRIPCION } from '@/data/insurance'
import { aviso } from '@/components/ui/toaster'

/* Modales de Insurance (Figma 3817:865128).
   Todos los textos se replican tal cual, incluidos "Suscription", "Depender",
   "Dependers", "Subcriber ID" y el placeholder "Loremp" — ver
   modulos/insurance.md, anomalías 60 a 66. */

/* ── New Subscription (3847:61696 / 69663 / 78489) ───────────────────── */

type Modo = 'actual' | 'existente' | 'nuevo'

const OPCIONES: { id: Modo; label: string }[] = [
  { id: 'actual', label: 'Use current patient details' },
  { id: 'existente', label: 'Use a person that already exists in the system (e.g patient, employee, contact, etc)' },
  { id: 'nuevo', label: 'Add a new subscriber' },
]

export function NewSubscriptionModal({ onClose }: { onClose: () => void }) {
  const [modo, setModo] = useState<Modo>('actual')
  const [d, setD] = useState({ subId: '', carrier: '', plan: '', inicio: '', fin: '', notas: '', nombre: '', medio: '', apellido: '', email: '', cumple: '', persona: '' })
  const [intentado, setIntentado] = useState(false)
  const set = (k: keyof typeof d) => (v: string) => setD((p) => ({ ...p, [k]: v }))
  const req = (k: keyof typeof d) => (intentado && !d[k].trim() ? 'This field is required.' : undefined)

  const guardar = () => {
    setIntentado(true)
    if (!d.carrier.trim() || !d.inicio.trim()) return
    if (modo === 'nuevo' && (!d.nombre.trim() || !d.apellido.trim() || !d.cumple.trim())) return
    aviso.ok(\`Subscription with \${d.carrier} created.\`)
    onClose()
  }

  return (
    <ModalShell title="New Subscription" onClose={onClose} footer={<FormFooter onCancel={onClose} onSave={guardar} />}>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <SectionCard title="Subscriber">
            <p className="-mt-2 text-[11px] text-ink-muted">Choose how you want to add the subscriber</p>
            {OPCIONES.map((o) => (
              <OptionCheckbox
                key={o.id}
                label={o.label}
                checked={modo === o.id}
                onChange={() => setModo(o.id)}
              />
            ))}
          </SectionCard>

          {modo === 'existente' && (
            <SectionCard title="Select Subscriber">
              <SearchField
                label="Plan name"
                options={DIRECTORIO.map((p) => p.name)}
                value={d.persona}
                onChange={set('persona')}
              />
              <PersonaSeleccionada
                p={DIRECTORIO.find((p) => p.name === d.persona) ?? DIRECTORIO[0]}
              />
            </SectionCard>
          )}

          {modo === 'nuevo' && (
            <SectionCard title="New Subscriber">
              <div className="grid gap-4 sm:grid-cols-3">
                {/* "Loremp" es el placeholder del Figma. */}
                <TextField label="Name" required placeholder="Loremp" value={d.nombre} onChange={set('nombre')} error={req('nombre')} />
                <TextField label="Middle Name" placeholder="Loremp" value={d.medio} onChange={set('medio')} />
                <TextField label="Last Name" required placeholder="Loremp" value={d.apellido} onChange={set('apellido')} error={req('apellido')} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Email" placeholder="abril@gmai.com" value={d.email} onChange={set('email')} />
                <DateTextField label="Birthday" required value={d.cumple} onChange={set('cumple')} error={req('cumple')} />
              </div>
            </SectionCard>
          )}
        </div>

        <SectionCard title="Subscription Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <SearchField label="Subcriber ID" options={[SUSCRIPCION.subscriberId]} value={d.subId} onChange={set('subId')} />
            <SearchField label="Carrier name" required options={CARRIERS} value={d.carrier} onChange={set('carrier')} error={req('carrier')} />
          </div>
          <SearchField label="Plan name" options={PLANES_NOMBRE} value={d.plan} onChange={set('plan')} />
          <div className="grid gap-4 sm:grid-cols-2">
            <DateTextField label="Approx Start Date" required value={d.inicio} onChange={set('inicio')} error={req('inicio')} />
            <DateTextField label="Approx End Date" value={d.fin} onChange={set('fin')} />
          </div>
          <TextArea label="Notes" placeholder="Add notes" value={d.notas} onChange={set('notas')} />
        </SectionCard>
      </div>
    </ModalShell>
  )
}

/* ── Manage Suscription (3847:82831) ─────────────────────────────────── */

function FilaLectura({ icon: Icon, label, value }: { icon: typeof ShieldHalf; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="size-4 shrink-0 text-ink-muted" strokeWidth={1.8} />
      <span className="leading-tight">
        <span className="block text-[11px] text-ink-faint">{label}</span>
        <span className="block text-[13px] text-ink">{value}</span>
      </span>
    </div>
  )
}

export function ManageSubscriptionModal({
  onNuevoDependiente,
  onClose,
}: {
  onNuevoDependiente: () => void
  onClose: () => void
}) {
  const [subId, setSubId] = useState('DTX-45839217')
  const [fin, setFin] = useState('03/01/2025')
  const [notas, setNotas] = useState('')
  const [intentado, setIntentado] = useState(false)

  const guardar = () => {
    setIntentado(true)
    if (!subId.trim()) return
    aviso.ok('Subscription updated.')
    onClose()
  }

  return (
    /* "Suscription" sin la b es del Figma. */
    <ModalShell title="Manage Suscription" onClose={onClose} footer={<FormFooter onCancel={onClose} onSave={guardar} />}>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <SectionCard title="Subscriber">
            <div className="relative">
              <PersonaSeleccionada p={DIRECTORIO[0]} />
              <button
                type="button"
                aria-label="Edit subscriber"
                onClick={() => aviso.info('Subscriber editing is not available in this release.')}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-ink-muted hover:text-black"
              >
                <Pencil className="size-4" />
              </button>
            </div>
          </SectionCard>

          {/* "Dependers" es del Figma. */}
          <SectionCard title="Dependers">
            <PersonaSeleccionada p={DIRECTORIO[0]} />
            <button
              type="button"
              onClick={onNuevoDependiente}
              className="text-dash-blue flex items-center gap-1.5 self-end text-[13px] font-semibold hover:underline"
            >
              <CirclePlus className="size-4" /> Add New
            </button>
          </SectionCard>
        </div>

        <SectionCard title="Subscription Information">
          <FilaLectura icon={ShieldHalf} label="Carrier" value={SUSCRIPCION.carrier} />
          <FilaLectura icon={Hospital} label="Plan" value={SUSCRIPCION.plan} />
          <FilaLectura icon={AArrowUp} label="Coverage Period" value={SUSCRIPCION.cobertura} />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Subcriber ID" required value={subId} onChange={setSubId}
              error={intentado && !subId.trim() ? 'This field is required.' : undefined}
            />
            <TextField label="Coverage End" value={fin} onChange={setFin} />
          </div>
          <TextArea label="Notes" placeholder="Add notes" value={notas} onChange={setNotas} />
        </SectionCard>
      </div>
    </ModalShell>
  )
}

/* ── New Depender (3847:95515) ───────────────────────────────────────── */

export function NewDependerModal({ onClose }: { onClose: () => void }) {
  const [d, setD] = useState({ paciente: '', subId: '', carrier: '', orden: '', inicio: '', fin: '', elegibilidad: '', verificacion: '' })
  const [intentado, setIntentado] = useState(false)
  const set = (k: keyof typeof d) => (v: string) => setD((p) => ({ ...p, [k]: v }))
  const req = (k: keyof typeof d) => (intentado && !d[k].trim() ? 'This field is required.' : undefined)

  const guardar = () => {
    setIntentado(true)
    if (!d.carrier.trim() || !d.orden.trim()) return
    aviso.ok(\`\${d.paciente || 'Dependent'} added to the subscription.\`)
    onClose()
  }

  return (
    /* "Depender" es del Figma; también es el único lugar donde "Coordination"
       está bien escrito. */
    <ModalShell title="New Depender" onClose={onClose} width="max-w-[420px]" footer={<FormFooter onCancel={onClose} onSave={guardar} />}>
      <div className="flex flex-col gap-4">
        <SearchField
          label="Dependent Patient" options={DIRECTORIO.map((p) => p.name)}
          value={d.paciente} onChange={set('paciente')}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <SearchField label="Subcriber ID" options={[SUSCRIPCION.subscriberId]} value={d.subId} onChange={set('subId')} />
          <SearchField label="Carrier name" required options={CARRIERS} value={d.carrier} onChange={set('carrier')} error={req('carrier')} />
        </div>
        <SelectField label="Coordination Order" required options={ORDENES} value={d.orden} onChange={set('orden')} error={req('orden')} />
        <div className="grid gap-4 sm:grid-cols-2">
          <DateTextField label="Coverage Start" value={d.inicio} onChange={set('inicio')} />
          <DateTextField label="Coverage End" value={d.fin} onChange={set('fin')} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <DateTextField label="Eligibility" value={d.elegibilidad} onChange={set('elegibilidad')} />
          <DateTextField label="Verification Date" value={d.verificacion} onChange={set('verificacion')} />
        </div>
      </div>
    </ModalShell>
  )
}
`})))()}export{r as n,n as r,i as t};