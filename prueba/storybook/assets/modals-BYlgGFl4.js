import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { DrawerActions, DrawerStep } from '@/components/ui/drawer'
import { useState } from 'react'
import { CirclePlus, Pencil, ShieldHalf, Hospital, AArrowUp } from 'lucide-react'
import {
  ModalShell, SectionCard, SearchField, PersonSearchField, SelectField, TextField,
  DateTextField, TextArea, OptionCheckbox,
} from '@/components/patients/form'
import { PersonaSeleccionada, DIRECTORIO } from '@/components/patients/AddRelationshipDrawer'

/* DOB y email de quien está en el directorio (mismo diseño que Add Relationship → Select person: Julián, 2026-10-20). */
const personaLineas = (nombre: string) => {
  const p = DIRECTORIO.find((x) => x.name === nombre)
  return p && [\`DOB: \${p.dob}\`, \`Email: \${p.email}\`]
}
import { CARRIERS, PLANES_POR_CARRIER, ORDENES, SUSCRIPCION, type Suscripcion } from '@/data/insurance'
import { Alert } from '@/components/ui/alert'
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

/* "DD / MM / YY" → fecha, o null si está incompleta. */
const aFecha = (v: string) => {
  const m = v.match(/^(\\d{2}) \\/ (\\d{2}) \\/ (\\d{2})$/)
  return m ? new Date(2000 + Number(m[3]), Number(m[2]) - 1, Number(m[1])) : null
}
const aTexto = (v: string) => v.replace(/ \\/ (\\d{2})$/, ' / 20$1').replaceAll(' / ', '/')

const VACIO = { subId: '', carrier: '', plan: '', inicio: '', fin: '', nombre: '', medio: '', apellido: '', email: '', cumple: '', persona: '' }

/* Crear la suscripción (CON-3284): quién es el suscriptor y la póliza. Las reglas y los textos, en
   modulos/insurance.md (2026-11-06). */
export function NewSubscriptionModal({
  paciente = 'John Smith', existentes = [], onCreada, onClose,
}: {
  /** El paciente de la ficha: "Use current patient details" lo usa de suscriptor. */
  paciente?: string
  /** Para no crear otra igual (mismo suscriptor y mismo plan). */
  existentes?: Suscripcion[]
  onCreada?: (s: Suscripcion) => void
  onClose: () => void
}) {
  const [modo, setModo] = useState<Modo>('actual')
  const [d, setD] = useState(VACIO)
  const [intentado, setIntentado] = useState(false)
  const [paso, setPaso] = useState(0)
  const set = (k: keyof typeof d) => (v: string) => setD((p) => ({ ...p, [k]: v }))
  const req = (k: keyof typeof d) => (intentado && !d[k].trim() ? 'This field is required.' : undefined)

  const obligatoriosSuscriptor: (keyof typeof d)[] = modo === 'nuevo' ? ['nombre', 'apellido', 'cumple'] : modo === 'existente' ? ['persona'] : []
  const faltaSuscriptor = obligatoriosSuscriptor.some((k) => !d[k].trim()) || (modo === 'existente' && !DIRECTORIO.some((p) => p.name === d.persona))
  const suscriptor = modo === 'actual' ? paciente : modo === 'existente' ? d.persona : [d.nombre, d.medio, d.apellido].filter((x) => x.trim()).join(' ')

  /* Plan Name depende del carrier: hasta elegir uno de la lista queda deshabilitado. */
  const carrierValido = CARRIERS.includes(d.carrier)
  const planes = carrierValido ? PLANES_POR_CARRIER[d.carrier] : []
  const cambiarCarrier = (v: string) => setD((p) => ({ ...p, carrier: v, plan: v === p.carrier ? p.plan : '' }))

  /* Fechas (CON-3284): el inicio no puede ser futuro y el fin no puede quedar antes del inicio. */
  const hoy = new Date()
  const inicio = aFecha(d.inicio)
  const fin = aFecha(d.fin)
  const errorInicio = req('inicio') ?? (intentado && d.inicio && !inicio ? 'Enter a full date.' : intentado && inicio && inicio > hoy ? "Coverage start can't be a future date." : undefined)
  const errorFin = intentado && d.fin && !fin ? 'Enter a full date.' : intentado && inicio && fin && fin < inicio ? "Coverage end can't be before coverage start." : undefined
  const errorCarrier = req('carrier') ?? (intentado && !carrierValido ? 'Select a carrier from the list.' : undefined)
  const errorPlan = req('plan') ?? (intentado && d.plan && !planes.includes(d.plan) ? 'Select a plan from the list.' : undefined)
  const faltaSuscripcion = !!(req('subId') || errorInicio || errorFin || errorCarrier || errorPlan) || !d.subId.trim() || !inicio || !carrierValido || !planes.includes(d.plan) || inicio > hoy || (!!d.fin && (!fin || fin < inicio))
  const duplicada = existentes.some((s) => s.subscriber === suscriptor && s.carrier === d.carrier && s.plan === d.plan)

  const siguiente = () => {
    if (faltaSuscriptor) { setIntentado(true); return }
    setIntentado(false)
    setPaso(1)
  }
  const guardar = () => {
    setIntentado(true)
    if (faltaSuscriptor) { setPaso(0); return }
    if (faltaSuscripcion || duplicada) return
    onCreada?.({
      id: \`s-\${Date.now()}\`, subscriber: suscriptor, subscriberId: d.subId.trim(), carrier: d.carrier, plan: d.plan,
      cobertura: \`\${aTexto(d.inicio)} - \${d.fin ? aTexto(d.fin) : 'Present'}\`,
      dependientes: 0, estado: fin && fin < hoy ? 'Inactive' : 'Active', enUso: false,
    })
    aviso.ok('The subscription has been successfully created.')
    onClose()
  }

  /* El aviso de arriba sale sólo en el paso donde falta algo, como en red.dev. */
  const avisoFaltan = intentado && (paso === 0 ? faltaSuscriptor : faltaSuscripcion)

  return (
    <ModalShell
      title="New Subscription" description="Subscriber and coverage" onClose={onClose} width="max-w-[560px]" steps={['Subscriber', 'Subscription']} step={paso}
      actions={<DrawerActions step={paso} total={2} onNext={siguiente} onBack={() => { setIntentado(false); setPaso(0) }} onCancel={onClose} onSave={guardar} />}
    >
      <div className="flex flex-col gap-6">
        {avisoFaltan && (
          <Alert tone="danger" title="Uncompleted fields">All required fields marked with (*) must be completed before proceeding.</Alert>
        )}
        {intentado && paso === 1 && !faltaSuscripcion && duplicada && (
          <Alert tone="danger" title="Duplicate subscription">A subscription already exists for this subscriber and insurance plan. Duplicate subscriptions are not allowed.</Alert>
        )}

        <DrawerStep index={0} step={paso} className="flex flex-col gap-6">
          <SectionCard title="Subscriber">
            <p className="-mt-2 text-[11px] text-ink-muted">Choose how you want to add the subscriber</p>
            {OPCIONES.map((o) => (
              <OptionCheckbox
                key={o.id}
                label={o.label}
                checked={modo === o.id}
                onChange={() => { setModo(o.id); setIntentado(false) }}
              />
            ))}
          </SectionCard>

          {modo === 'existente' && (
            <SectionCard title="Select Subscriber">
              <PersonSearchField
                label="Select person" required placeholder="Search by Name or Last Name"
                personas={DIRECTORIO.map((p) => p.name)}
                value={d.persona}
                onChange={set('persona')}
                lineas={personaLineas}
                emptyText="No person found."
                error={intentado && !DIRECTORIO.some((p) => p.name === d.persona) ? (d.persona.trim() ? 'Select a person from the list.' : 'This field is required.') : undefined}
              />
            </SectionCard>
          )}

          {modo === 'nuevo' && (
            <SectionCard title="New Subscriber">
              {/* De a dos, como New Patient: nunca tres por fila (Components / UI / Drawer → Specs → Fields). */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* "Loremp" es el placeholder del Figma. */}
                <TextField label="Name" required placeholder="Loremp" value={d.nombre} onChange={set('nombre')} error={req('nombre')} />
                <TextField label="Middle Name" placeholder="Loremp" value={d.medio} onChange={set('medio')} />
                <TextField label="Last Name" required placeholder="Loremp" value={d.apellido} onChange={set('apellido')} error={req('apellido')} />
                <DateTextField label="Birthday" required value={d.cumple} onChange={set('cumple')} error={req('cumple')} />
                <TextField label="Email" placeholder="abril@gmai.com" value={d.email} onChange={set('email')} />
              </div>
            </SectionCard>
          )}
        </DrawerStep>

        <DrawerStep index={1} step={paso}>
          {/* Los campos de CON-3284, todos obligatorios menos Coverage End. */}
          <SectionCard title="Subscription Information">
            <div className="grid gap-4 sm:grid-cols-2">
              <SearchField label="Carrier Name" required placeholder="Select carrier" options={CARRIERS} value={d.carrier} onChange={cambiarCarrier} error={errorCarrier} emptyText="Carrier not found." clearable />
              <SearchField
                label="Plan Name" required placeholder="Select plan" options={planes} value={d.plan} onChange={set('plan')} error={errorPlan}
                disabled={!carrierValido} emptyText="Plan not found." clearable hint={carrierValido ? undefined : 'Select a carrier first.'}
              />
              <TextField label="Subscriber ID" required placeholder="123456" value={d.subId} onChange={set('subId')} error={req('subId')} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <DateTextField label="Coverage Start" required value={d.inicio} onChange={set('inicio')} error={errorInicio} />
              <DateTextField label="Coverage End" value={d.fin} onChange={set('fin')} error={errorFin} />
            </div>
          </SectionCard>
        </DrawerStep>
      </div>
    </ModalShell>
  )
}

/* ── Manage Suscription (3847:82831) ─────────────────────────────────── */

export function FilaLectura({ icon: Icon, label, value }: { icon: typeof ShieldHalf; label: string; value: string }) {
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
  suscripcion,
  onNuevoDependiente,
  onClose,
}: {
  /** La elegida en Insurance; sin esto, la del frame. */
  suscripcion?: Suscripcion
  onNuevoDependiente: () => void
  onClose: () => void
}) {
  const s = suscripcion ?? SUSCRIPCION
  const [subId, setSubId] = useState(suscripcion?.subscriberId ?? 'DTX-45839217')
  const [fin, setFin] = useState('03/01/2025')
  const [notas, setNotas] = useState('')
  const [intentado, setIntentado] = useState(false)
  const [paso, setPaso] = useState(0)

  const guardar = () => {
    setIntentado(true)
    if (!subId.trim()) return
    aviso.ok('Subscription updated.')
    onClose()
  }

  return (
    /* "Suscription" sin la b es del Figma. Dos pasos: quiénes (suscriptor y dependientes) y la cobertura. */
    <ModalShell
      title="Manage Suscription" description="Subscriber, dependers and coverage" onClose={onClose} width="max-w-[560px]" steps={['Subscriber', 'Subscription']} step={paso}
      actions={<DrawerActions step={paso} total={2} onNext={() => setPaso(1)} onBack={() => setPaso(0)} onCancel={onClose} onSave={guardar} />}
    >
      <div className="flex flex-col gap-6">
        <DrawerStep index={0} step={paso} className="flex flex-col gap-6">
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
        </DrawerStep>

        <DrawerStep index={1} step={paso}>
        <SectionCard title="Subscription Information">
          <FilaLectura icon={ShieldHalf} label="Carrier" value={s.carrier} />
          <FilaLectura icon={Hospital} label="Plan" value={s.plan} />
          <FilaLectura icon={AArrowUp} label="Coverage Period" value={s.cobertura} />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Subcriber ID" required value={subId} onChange={setSubId}
              error={intentado && !subId.trim() ? 'This field is required.' : undefined}
            />
            <TextField label="Coverage End" value={fin} onChange={setFin} />
          </div>
          <TextArea label="Notes" placeholder="Add notes" value={notas} onChange={setNotas} />
        </SectionCard>
        </DrawerStep>
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
    <ModalShell title="New Depender" onClose={onClose} width="max-w-[420px]" actions={<DrawerActions onCancel={onClose} onSave={guardar} />}>
      <div className="flex flex-col gap-4">
        <PersonSearchField
          label="Dependent Patient" placeholder="Search by Name or Last Name" personas={DIRECTORIO.map((p) => p.name)}
          value={d.paciente} onChange={set('paciente')} lineas={personaLineas}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <SearchField label="Subcriber ID" options={[SUSCRIPCION.subscriberId]} value={d.subId} onChange={set('subId')} />
          <SearchField label="Carrier name" required options={CARRIERS} value={d.carrier} onChange={set('carrier')} error={req('carrier')} />
          <SelectField label="Coordination Order" required options={ORDENES} value={d.orden} onChange={set('orden')} error={req('orden')} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <DateTextField label="Coverage Start" value={d.inicio} onChange={set('inicio')} />
          <DateTextField label="Coverage End" value={d.fin} onChange={set('fin')} />
          <DateTextField label="Eligibility" value={d.elegibilidad} onChange={set('elegibilidad')} />
          <DateTextField label="Verification Date" value={d.verificacion} onChange={set('verificacion')} />
        </div>
      </div>
    </ModalShell>
  )
}
`})))()}export{r as n,n as r,i as t};