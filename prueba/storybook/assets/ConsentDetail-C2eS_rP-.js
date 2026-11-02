import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useRef, useState, type ReactNode } from 'react'
import { ArrowLeft, CircleAlert, CircleCheck, Download, File, FileCheck2, FileClock, FileMinus2, FileText, PenLine, Send, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TARJETA_INTERNA, TARJETA_PANEL } from '@/lib/estilos'
import { aviso } from '@/components/ui/toaster'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Drawer, DrawerActions, DrawerSection } from '@/components/ui/drawer'
import { Pill, type PillTone } from '@/components/ui/pill'
import { Tabs } from '@/components/ui/tabs'
import { SelectField, TextField } from '@/components/patients/form'
import { AVISO_RECONOCIMIENTOS, ConsentDocument, RECONOCIMIENTOS_PACIENTE } from '@/components/settings/ConsentDocument'
import {
  AVISO_CONSENTIMIENTO, DOCUMENTO_CONSENTIMIENTO, PACIENTE,
  type Caso, type ConsentProcedimiento, type FirmasConsentimiento, type Procedimiento, type Rubrica, type Visita,
} from '@/data/treatment-plan'

/* El consentimiento de un procedimiento: se abre desde la columna Consent de las tablas y ahí se firma. La hoja es la
   misma del preview de Settings → Consent Templates; al lado, quién firmó y qué falta. Ver clinical-mode.md (2026-11-02). */

export type Firmante = keyof FirmasConsentimiento

/* Estado del consentimiento de un procedimiento: ícono y palabra, en el color del estado. Con \`onAbrir\` es un botón que
   lleva al detalle del consentimiento. */
const CONSENT: Record<ConsentProcedimiento, { icono: LucideIcon; clase: string; tono: PillTone }> = {
  'Not generated': { icono: File, clase: 'text-ink-muted', tono: 'neutral' },
  'Not sent': { icono: FileText, clase: 'text-dash-blue', tono: 'info' },
  Pending: { icono: FileClock, clase: 'text-warn-fg', tono: 'warning' },
  Signed: { icono: FileCheck2, clase: 'text-dash-ok-fg', tono: 'success' },
  'Not required': { icono: FileMinus2, clase: 'text-ink-faint', tono: 'neutral' },
}

/** Hay documento (generado, mandado o firmado): la columna lo abre. Sin documento, avisa qué pasa. */
export const tieneDocumento = (c?: ConsentProcedimiento) => c === 'Not sent' || c === 'Pending' || c === 'Signed'

export function EstadoConsentimiento({ estado, onAbrir, de }: {
  estado: ConsentProcedimiento
  onAbrir?: () => void
  /** De qué procedimiento es, para el nombre del botón ("Open consent for D2391"). */
  de?: string
}) {
  const { icono: Icono, clase } = CONSENT[estado]
  const contenido = <><Icono className="size-4 shrink-0" aria-hidden /> {estado}</>
  if (!onAbrir) return <span className={cn('flex items-center gap-1.5 text-[12px] font-medium whitespace-nowrap', clase)}>{contenido}</span>
  return (
    <button
      type="button"
      /* No despliega la fila de la tabla (DataTable abre la fila con un clic en cualquier lado). */
      onClick={(e) => { e.stopPropagation(); onAbrir() }}
      aria-label={\`Open consent\${de ? \` for \${de}\` : ''}: \${estado}\`}
      className={cn(
        '-mx-1.5 flex h-7 items-center gap-1.5 rounded-md px-1.5 text-[12px] font-medium whitespace-nowrap underline-offset-2 transition-colors hover:bg-surface-muted hover:underline',
        'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-dash-blue',
        clase,
      )}
    >
      {contenido}
    </button>
  )
}

/** Las firmas para estampar en la hoja: fecha, nombre y el trazo o lo escrito. */
export function firmasHoja(p: Pick<Procedimiento, 'firmas' | 'rubricas' | 'proveedor'>) {
  const de = (rol: Firmante, nombre: string) => {
    const fecha = p.firmas?.[rol]
    return fecha ? { fecha, nombre, ...p.rubricas?.[rol] } : undefined
  }
  return { paciente: de('Patient', PACIENTE), proveedor: de('Provider', p.proveedor) }
}

/** La fecha de hoy como la muestran las firmas (MM/DD/YYYY). */
export const hoy = () => new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })

/** El estado después de una firma: con las dos, Signed; con una, Pending (si no se había mandado, ya está en curso). */
export function estadoTrasFirma(firmas: FirmasConsentimiento): ConsentProcedimiento {
  return firmas.Patient && firmas.Provider ? 'Signed' : 'Pending'
}

/* Una línea de firma del panel: quién, si firmó y, si falta, el botón para firmar. */
function FilaFirmante({ rol, nombre, fecha, puedeFirmar, onFirmar }: { rol: Firmante; nombre: string; fecha?: string; puedeFirmar: boolean; onFirmar: () => void }) {
  return (
    <li className={cn(TARJETA_INTERNA, 'flex items-center gap-3 px-3 py-3')}>
      {fecha
        ? <CircleCheck className="size-5 shrink-0 text-dash-ok-fg" aria-hidden />
        : <CircleAlert className="size-5 shrink-0 text-warn-fg" aria-hidden />}
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-semibold text-ink">{rol}</span>
        <span className="block truncate text-[12px] text-ink-muted">{nombre}</span>
        <span className={cn('block text-[12px] font-medium', fecha ? 'text-dash-ok-fg' : 'text-warn-fg')}>
          {fecha ? \`Signed \${fecha}\` : 'Signature pending'}
        </span>
      </span>
      {!fecha && puedeFirmar && (
        <Button size="sm" onClick={onFirmar}><PenLine /> Sign</Button>
      )}
    </li>
  )
}

export function ConsentDetail({ procedimiento: p, caso, visita, onVolver, onFirmar, onEnviar }: {
  procedimiento: Procedimiento
  caso: Caso
  visita?: Visita
  onVolver: () => void
  onFirmar: (rol: Firmante, rubrica: Rubrica) => void
  /** Manda el documento: el primero u otra vez. */
  onEnviar: () => void
}) {
  const [firmando, setFirmando] = useState<Firmante | null>(null)
  const estado = p.consentimiento ?? 'Not sent'
  const firmas = p.firmas ?? {}
  const firmantes: { rol: Firmante; nombre: string }[] = [
    { rol: 'Patient', nombre: PACIENTE },
    { rol: 'Provider', nombre: p.proveedor },
  ]
  const juntas = firmantes.filter((f) => firmas[f.rol]).length
  const aviso_ = estado === 'Not sent' || estado === 'Signed' ? AVISO_CONSENTIMIENTO[estado] : null
  const titulo = \`\${DOCUMENTO_CONSENTIMIENTO.titulo} – \${p.nombre}\`
  const donde = [p.pieza && p.pieza !== '-' ? \`Tooth \${p.pieza}\` : '', p.superficie && p.superficie !== '-' ? \`Surface \${p.superficie}\` : '', visita?.nombre, \`Patient \${PACIENTE}\`]
    .filter(Boolean).join(' · ')

  return (
    <div className="flex flex-col gap-4">
      <div className={cn(TARJETA_PANEL, 'p-4 sm:p-6')}>
        <Button variant="secondary" size="md" onClick={onVolver}>
          <ArrowLeft /> Back to Case
        </Button>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold tracking-wide text-ink-muted">Informed consent · {caso.nombre}</p>
            <h2 className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[20px] leading-tight font-bold text-ink">
              {p.codigo} · {p.nombre}
              <Pill tone={CONSENT[estado].tono}>{estado}</Pill>
            </h2>
            <p className="mt-1 text-[13px] text-ink-muted">{donde}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Button variant="secondary" size="md" onClick={() => aviso.info('Download PDF is not available in this release.')}>
              <Download /> Download PDF
            </Button>
            {estado === 'Not sent' && <Button size="md" onClick={onEnviar}><Send /> Send to patient</Button>}
            {estado === 'Pending' && <Button variant="secondary" size="md" onClick={onEnviar}><Send /> Send again</Button>}
          </div>
        </div>

        {aviso_ && (
          <Alert tone={estado === 'Signed' ? 'success' : 'info'} title={aviso_.titulo} className="mt-4">
            {aviso_.texto}
          </Alert>
        )}

        {/* Quién firmó y qué falta, arriba de la hoja: es lo que se viene a hacer. */}
        <section aria-label="Signatures" className="mt-5">
          <div className="flex items-baseline gap-2">
            <h3 className="text-[15px] font-bold text-ink">Signatures</h3>
            <p className="text-[12px] text-ink-muted">{juntas} of {firmantes.length} collected</p>
          </div>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {firmantes.map((f) => (
              <FilaFirmante key={f.rol} rol={f.rol} nombre={f.nombre} fecha={firmas[f.rol]} puedeFirmar onFirmar={() => setFirmando(f.rol)} />
            ))}
          </ul>
        </section>
      </div>

      {/* La hoja a todo el ancho, sobre el escritorio gris como el preview de Consent Templates. Las firmas quedan
          estampadas al pie, como en el PDF. */}
      <div className="rounded-lg bg-surface-muted p-3 sm:p-6">
        <ConsentDocument
          titulo={titulo}
          procedimiento={\`\${p.codigo} · \${p.nombre}\`}
          naturaleza={DOCUMENTO_CONSENTIMIENTO.naturaleza}
          riesgos={DOCUMENTO_CONSENTIMIENTO.riesgos}
          vistaPaciente={false}
          paciente={PACIENTE}
          proveedor={p.proveedor}
          firmas={firmasHoja(p)}
          ancho="completo"
        />
      </div>

      {firmando && (
        <FirmarConsentimiento
          rol={firmando}
          nombre={firmantes.find((f) => f.rol === firmando)!.nombre}
          titulo={\`Sign as \${firmando.toLowerCase()}\`}
          descripcion={titulo}
          onClose={() => setFirmando(null)}
          onFirmar={(r) => { onFirmar(firmando, r); setFirmando(null) }}
        />
      )}
    </div>
  )
}

/* La firma: el paciente marca las cinco afirmaciones del documento y firma; el provider sólo firma. Se dibuja con el
   mouse, el dedo o un lápiz, o se escribe el nombre (para quien no puede dibujar o usa teclado). */
export function FirmarConsentimiento({ rol, nombre, titulo, descripcion, resumen, cancelar = 'Cancel', guardar = 'Sign consent', onClose, onFirmar }: {
  rol: Firmante
  nombre: string
  titulo: string
  descripcion?: string
  /** Qué se firma, arriba de todo (Sign now: el procedimiento, el paciente y el caso). */
  resumen?: ReactNode
  cancelar?: string
  guardar?: string
  onClose: () => void
  onFirmar: (rubrica: Rubrica) => void
}) {
  const paciente = rol === 'Patient'
  const [marcadas, setMarcadas] = useState<string[]>([])
  const [modo, setModo] = useState<'Draw' | 'Type'>('Draw')
  const [dibujada, setDibujada] = useState<string | null>(null)
  const [escrita, setEscrita] = useState('')
  const reconocido = !paciente || marcadas.length === RECONOCIMIENTOS_PACIENTE.length
  const firmada = modo === 'Draw' ? !!dibujada : escrita.trim().length > 1
  const falta = !reconocido ? 'Check every statement to continue.' : !firmada ? (modo === 'Draw' ? 'Draw the signature to continue.' : 'Type the full name to continue.') : ''

  return (
    <Drawer
      open
      onClose={onClose}
      title={titulo}
      description={descripcion}
      footer={<DrawerActions onCancel={onClose} onSave={() => onFirmar(modo === 'Draw' ? { imagen: dibujada ?? undefined } : { texto: escrita.trim() })} cancelLabel={cancelar} saveLabel={guardar} saveDisabled={!!falta} />}
    >
      <div className="flex flex-col gap-6">
        {resumen}
        {paciente && (
          <DrawerSection title="Acknowledgment" description={AVISO_RECONOCIMIENTOS}>
            <ul className="flex flex-col gap-3">
              {RECONOCIMIENTOS_PACIENTE.map((r) => {
                const on = marcadas.includes(r)
                const cambiar = (v: boolean) => setMarcadas((m) => (v ? [...m, r] : m.filter((x) => x !== r)))
                return (
                  <li key={r} className="flex items-start gap-2.5">
                    <Checkbox on={on} onChange={cambiar} label={r} className="mt-0.5" />
                    <span onClick={() => cambiar(!on)} className="cursor-pointer text-[13px] leading-snug text-ink">{r}</span>
                  </li>
                )
              })}
            </ul>
          </DrawerSection>
        )}

        <DrawerSection title="Signature" description={\`\${nombre} signs as \${rol.toLowerCase()}.\`}>
          <Tabs tabs={['Draw', 'Type'] as const} value={modo} onChange={setModo} size="sm" aria-label="Signature method" className="self-start" />
          {modo === 'Draw' ? (
            <PadFirma onCambio={setDibujada} />
          ) : (
            <div className="flex flex-col gap-3">
              <TextField label="Full name" value={escrita} onChange={setEscrita} placeholder={nombre} />
              <p aria-hidden className={cn(TARJETA_INTERNA, 'flex h-16 items-center px-4 text-[22px] text-ink italic', !escrita && 'text-ink-faint')}>
                {escrita || nombre}
              </p>
            </div>
          )}
        </DrawerSection>

        {falta && <p role="status" className="text-[12px] text-ink-muted">{falta}</p>}
      </div>
    </Drawer>
  )
}

/* El lugar para dibujar la firma. El canvas toma su tamaño real en el primer trazo: dentro del drawer todavía se está
   animando cuando se monta. */
export function PadFirma({ onCambio }: { onCambio: (imagen: string | null) => void }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const dibujando = useRef(false)
  const [hay, setHay] = useState(false)

  const contexto = () => {
    const c = ref.current
    if (!c) return null
    const r = c.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    if (!hay && c.width !== Math.round(r.width * dpr)) {
      c.width = Math.round(r.width * dpr)
      c.height = Math.round(r.height * dpr)
    }
    const ctx = c.getContext('2d')
    if (!ctx) return null
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = getComputedStyle(c).color
    return { ctx, r }
  }
  const empezar = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const x = contexto()
    if (!x) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dibujando.current = true
    x.ctx.beginPath()
    x.ctx.moveTo(e.clientX - x.r.left, e.clientY - x.r.top)
  }
  const seguir = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dibujando.current) return
    const x = contexto()
    if (!x) return
    x.ctx.lineTo(e.clientX - x.r.left, e.clientY - x.r.top)
    x.ctx.stroke()
    if (!hay) setHay(true)
  }
  /* Al soltar, la firma como imagen: es la que queda estampada en la hoja. */
  const terminar = () => {
    if (!dibujando.current) return
    dibujando.current = false
    if (hay && ref.current) onCambio(ref.current.toDataURL('image/png'))
  }
  const limpiar = () => {
    const c = ref.current
    c?.getContext('2d')?.clearRect(0, 0, c.width, c.height)
    setHay(false)
    onCambio(null)
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className={cn(TARJETA_INTERNA, 'relative')}>
        <canvas
          ref={ref}
          role="img"
          aria-label={hay ? 'Signature drawn' : 'Signature pad: draw the signature with a mouse, finger or stylus'}
          onPointerDown={empezar}
          onPointerMove={seguir}
          onPointerUp={terminar}
          onPointerCancel={terminar}
          className="block h-[160px] w-full cursor-crosshair touch-none rounded-lg text-ink"
        />
        {/* La línea y el "Sign here" son guía: no capturan el puntero. */}
        <span aria-hidden className="pointer-events-none absolute right-6 bottom-9 left-6 border-b border-dashed border-line-strong" />
        {!hay && <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-[12px] text-ink-faint">Sign here</span>}
      </div>
      <Button variant="link" size="sm" onClick={limpiar} disabled={!hay} className="self-end">Clear</Button>
    </div>
  )
}

/* View consent desde Consent required: el documento que ya existe, en un drawer; Back vuelve al diálogo sin perder el
   pedido (prototipo de CON-4052). Es el consentimiento del procedimiento, no el del caso. */
export function VistaConsentimiento({ procedimiento: p, onClose, cerrar = 'Close' }: {
  procedimiento: Pick<Procedimiento, 'codigo' | 'nombre'> & Partial<Pick<Procedimiento, 'proveedor' | 'consentimiento' | 'firmas' | 'rubricas'>>
  onClose: () => void
  cerrar?: string
}) {
  const proveedor = p.proveedor ?? 'Perez Martinez'
  const firmas = p.firmas ?? {}
  return (
    <Drawer
      open
      onClose={onClose}
      size="xl"
      title="Procedure consent"
      description="Specific consent for this procedure — not the treatment case consent."
      footer={<Button variant="secondary" onClick={onClose}>{cerrar === 'Back' && <ArrowLeft />} {cerrar}</Button>}
    >
      <div className="flex flex-col gap-4">
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[13px]">
          <dt className="text-ink-muted">Status</dt>
          <dd>{p.consentimiento ? <EstadoConsentimiento estado={p.consentimiento} /> : '—'}</dd>
          <dt className="text-ink-muted">Patient</dt>
          <dd className="text-ink">{firmas.Patient ? \`Signed \${firmas.Patient}\` : 'Not signed'}</dd>
          <dt className="text-ink-muted">Provider</dt>
          <dd className="text-ink">{firmas.Provider ? \`Signed \${firmas.Provider}\` : 'Not signed'}</dd>
        </dl>
        <div className="rounded-lg bg-surface-muted p-3">
          <ConsentDocument
            titulo={\`\${DOCUMENTO_CONSENTIMIENTO.titulo} – \${p.nombre}\`}
            procedimiento={\`\${p.codigo} · \${p.nombre}\`}
            naturaleza={DOCUMENTO_CONSENTIMIENTO.naturaleza}
            riesgos={DOCUMENTO_CONSENTIMIENTO.riesgos}
            vistaPaciente={false}
            paciente={PACIENTE}
            proveedor={proveedor}
            firmas={firmasHoja({ firmas, rubricas: p.rubricas, proveedor })}
            ancho="completo"
          />
        </div>
      </div>
    </Drawer>
  )
}

/* Los controles del prototipo de Julián (CON-4052), como los de Estimate details: el consentimiento de un procedimiento
   y la falla al mandarlo. Es una herramienta de demo, no parte del producto. */
export const FIXTURES_CONSENTIMIENTO: ConsentProcedimiento[] = ['Not generated', 'Not sent', 'Pending', 'Signed', 'Not required']

export function ControlesConsentimiento({ procedimientos, onFijar, fallaEnvio, onFallaEnvio }: {
  procedimientos: Pick<Procedimiento, 'id' | 'codigo' | 'nombre' | 'consentimiento'>[]
  onFijar: (id: string, c: ConsentProcedimiento) => void
  fallaEnvio: boolean
  onFallaEnvio: (v: boolean) => void
}) {
  const etiqueta = (p: (typeof procedimientos)[number]) => \`\${p.codigo} · \${p.nombre}\`
  const [elegido, setElegido] = useState<string | undefined>(procedimientos[0]?.id)
  const p = procedimientos.find((x) => x.id === elegido) ?? procedimientos[0]
  if (!p) return null
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 rounded-lg border border-dashed border-line-strong bg-white/60 px-4 py-3">
      <span className="text-[11px] font-semibold tracking-wide text-ink-muted uppercase">Prototype controls</span>
      <SelectField
        label="Procedure"
        hideLabel
        value={etiqueta(p)}
        onChange={(v) => setElegido(procedimientos.find((x) => etiqueta(x) === v)?.id)}
        options={procedimientos.map(etiqueta)}
        className="w-[260px] max-w-full"
      />
      <SelectField
        label="Specific procedure consent"
        hideLabel
        value={p.consentimiento ?? ''}
        onChange={(v) => onFijar(p.id, v as ConsentProcedimiento)}
        options={FIXTURES_CONSENTIMIENTO}
        className="w-[170px]"
      />
      <span className="flex items-center gap-2 text-[13px] text-ink">
        <Checkbox on={fallaEnvio} onChange={onFallaEnvio} label="Simulate sending failure" />
        <span aria-hidden>Simulate sending failure</span>
      </span>
      <span className="ml-auto text-[11px] text-ink-faint">Demo only · Not part of the product</span>
    </div>
  )
}
`})))()}export{n,i as r,r as t};