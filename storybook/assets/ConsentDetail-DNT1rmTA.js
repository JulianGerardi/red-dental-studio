import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowLeft, CircleCheck, Eye, EyeOff, File, FileCheck2, FileClock, FileMinus2, FileText, LoaderCircle, Lock, PenLine, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TARJETA_PANEL } from '@/lib/estilos'
import { aviso } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Drawer } from '@/components/ui/drawer'
import { Pill, type PillTone } from '@/components/ui/pill'
import { Tabs } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { FieldLabel, TextField, control } from '@/components/patients/form'
import { ConAyuda } from '@/components/clinical/dental/ProcedureRow'
import { ConsentDocument, RECONOCIMIENTOS_PACIENTE } from '@/components/settings/ConsentDocument'
import {
  DOCUMENTO_CONSENTIMIENTO, PACIENTE, SIN_DOCUMENTO,
  type ConsentProcedimiento, type FirmasConsentimiento, type Procedimiento, type Rubrica,
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

export function EstadoConsentimiento({ estado, onAbrir, de, nombre }: {
  estado: ConsentProcedimiento
  onAbrir?: () => void
  /** De qué procedimiento es, para el nombre del botón ("Open consent for D2391"). */
  de?: string
  /** El procedimiento entero (código y nombre), para el tooltip. */
  nombre?: string
}) {
  const { icono: Icono, clase } = CONSENT[estado]
  const contenido = <><Icono className="size-4 shrink-0" aria-hidden /> {estado}</>
  if (!onAbrir) return <span className={cn('flex items-center gap-1.5 text-[12px] font-medium whitespace-nowrap', clase)}>{contenido}</span>
  /* Como en red.dev: el tooltip dice de qué consentimiento se trata y qué pasa al tocarlo. */
  const ayuda = tieneDocumento(estado) ? 'Open to present it to the patient for signature' : SIN_DOCUMENTO[estado]
  return (
    <Tooltip>
      <TooltipTrigger asChild>
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
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[320px] flex-col items-start gap-0.5 bg-ink leading-snug text-white">
        {nombre && <span className="block font-semibold">Procedure Consent - {nombre}</span>}
        {ayuda}
      </TooltipContent>
    </Tooltip>
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

/* El consentimiento de un procedimiento, como en red.dev: arriba Back, el título y View PDF; el documento a todo el ancho
   (con las afirmaciones que marca el paciente y las firmas estampadas al pie); abajo, Patient Signature y Provider
   Signature. Ver clinical-mode.md (2026-11-02). */
export function ConsentDetail({ procedimiento: p, pendiente, onVolver, onFirmar }: {
  procedimiento: Procedimiento
  /** Llegó desde Consent required (Sign now): con las firmas se confirma el Start o Complete que se pidió. */
  pendiente?: { verbo: 'Start' | 'Complete'; restantes: number }
  onVolver: () => void
  onFirmar: (rol: Firmante, rubrica: Rubrica) => void
}) {
  const [firmando, setFirmando] = useState<Firmante | null>(null)
  const [preparando, setPreparando] = useState(true)
  const firmas = p.firmas ?? {}
  /* Las afirmaciones del documento: el paciente las marca antes de firmar; firmado, quedan marcadas. */
  const [marcadas, setMarcadas] = useState<string[]>(firmas.Patient ? RECONOCIMIENTOS_PACIENTE : [])
  const reconocido = marcadas.length === RECONOCIMIENTOS_PACIENTE.length
  const estado = p.consentimiento ?? 'Not sent'
  useEffect(() => {
    const t = window.setTimeout(() => setPreparando(false), 450)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <TooltipProvider delayDuration={200}>
    <div className="flex flex-col gap-4">
      <div className={cn(TARJETA_PANEL, 'flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3')}>
        <Button variant="ghost" size="md" onClick={onVolver}><ArrowLeft /> Back</Button>
        <span aria-hidden className="hidden h-6 w-px bg-line sm:block" />
        <h2 className="min-w-0 flex-1 text-[15px] leading-snug font-bold text-ink">
          Procedure Consent - {p.codigo} {p.nombre}
        </h2>
        <Pill tone={CONSENT[estado].tono}>{estado}</Pill>
        <Button variant="secondary" size="md" onClick={() => aviso.info('View PDF is not available in this release.')}>
          <FileText /> View PDF
        </Button>
      </div>

      {pendiente && (
        <Alert tone="info" title={\`Sign to \${pendiente.verbo.toLowerCase()} this procedure\`}>
          Collect both signatures below, then confirm the {pendiente.verbo}. Back leaves the procedure as it was.
          {pendiente.restantes > 0 && \` \${pendiente.restantes} more consent\${pendiente.restantes > 1 ? 's' : ''} to sign after this one.\`}
        </Alert>
      )}

      {/* La hoja a todo el ancho, sobre el escritorio gris como el preview de Consent Templates. */}
      <div className="rounded-lg bg-surface-muted p-3 sm:p-6">
        {preparando ? (
          <div role="status" className="flex min-h-[360px] flex-col items-center justify-center gap-2 bg-white text-[13px] text-ink-muted">
            <LoaderCircle className="size-6 animate-spin text-dash-blue" aria-hidden /> Preparing document...
          </div>
        ) : (
          <ConsentDocument
            titulo={\`\${DOCUMENTO_CONSENTIMIENTO.titulo} – \${p.nombre}\`}
            procedimiento={\`\${p.codigo} · \${p.nombre}\`}
            naturaleza={DOCUMENTO_CONSENTIMIENTO.naturaleza}
            riesgos={DOCUMENTO_CONSENTIMIENTO.riesgos}
            vistaPaciente={false}
            paciente={PACIENTE}
            proveedor={p.proveedor}
            firmas={firmasHoja(p)}
            reconocidos={marcadas}
            onReconocer={firmas.Patient ? undefined : (r, v) => setMarcadas((m) => (v ? [...m, r] : m.filter((x) => x !== r)))}
            ancho="completo"
          />
        )}
      </div>

      {/* Las dos firmas al pie, fijas mientras se lee: la del paciente a la izquierda y la del provider a la derecha. */}
      <div className={cn(TARJETA_PANEL, 'sticky bottom-0 z-10 flex flex-wrap items-center gap-3 px-4 py-3')}>
        {firmas.Patient ? (
          <Firmado rol="Patient" fecha={firmas.Patient} />
        ) : (
          <ConAyuda texto={reconocido ? 'Present the consent to the patient for signature' : 'The patient checks every acknowledgment in the document first.'}>
            <span>
              <Button variant="secondary" size="md" disabled={!reconocido} onClick={() => setFirmando('Patient')}>
                <PenLine /> Patient Signature
              </Button>
            </span>
          </ConAyuda>
        )}
        {!firmas.Patient && !reconocido && (
          <span className="text-[12px] text-ink-muted">Check every acknowledgment in the document to enable it.</span>
        )}
        <span className="ml-auto">
          {firmas.Provider ? (
            <Firmado rol="Provider" fecha={firmas.Provider} />
          ) : (
            <Button size="md" onClick={() => setFirmando('Provider')}><PenLine /> Provider Signature</Button>
          )}
        </span>
      </div>

      {firmando === 'Patient' && (
        <FirmaPaciente nombre={PACIENTE} descripcion={\`Procedure Consent - \${p.codigo} \${p.nombre}\`} onClose={() => setFirmando(null)} onFirmar={(r) => { onFirmar('Patient', r); setFirmando(null) }} />
      )}
      {firmando === 'Provider' && (
        <FirmaProveedor nombre={p.proveedor} onClose={() => setFirmando(null)} onFirmar={(r) => { onFirmar('Provider', r); setFirmando(null) }} />
      )}
    </div>
    </TooltipProvider>
  )
}

/* La firma ya juntada, en el lugar del botón. */
function Firmado({ rol, fecha }: { rol: Firmante; fecha: string }) {
  return (
    <span className="flex h-8 items-center gap-1.5 text-[13px] font-medium text-dash-ok-fg">
      <CircleCheck className="size-4" aria-hidden /> {rol} signed {fecha}
    </span>
  )
}

const iniciales = (nombre: string) => nombre.split(/\\s+/).filter(Boolean).map((x) => x[0]!.toUpperCase()).join('').slice(0, 3)
const LEGAL = 'By selecting Adopt and Sign, I agree that the signature and initials are the electronic representation of my signature and initials for all purposes when I (or my agent) use them in documents, including legally binding contracts.'

/* Las firmas se hacen en un pop up: en red.dev el botón lleva a un portal para firmar, acá es una ventana encima del
   consentimiento (no un drawer). Ver clinical-mode.md (2026-11-02). */
function VentanaFirma({ titulo, descripcion, cancelar = 'Cancel', guardar, guardarDeshabilitado, onClose, onGuardar, children }: {
  titulo: string
  descripcion?: string
  cancelar?: string
  guardar: string
  guardarDeshabilitado?: boolean
  onClose: () => void
  onGuardar: () => void
  children: ReactNode
}) {
  return (
    <Dialog open onOpenChange={(o) => { if (!o) onClose() }}>
      <DialogContent showCloseButton={false} className="flex max-h-[92vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-[600px]">
        <div className="flex items-center gap-1.5 border-b border-line bg-surface-muted px-5 py-2 text-[11.5px] font-medium text-ink-muted">
          <Lock className="size-3.5" aria-hidden /> Secure signing portal
        </div>
        <DialogHeader className="gap-1 px-5 pt-4">
          <DialogTitle className="text-[16px] leading-snug font-bold text-ink">{titulo}</DialogTitle>
          {descripcion && <DialogDescription className="text-[13px] text-ink-muted">{descripcion}</DialogDescription>}
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
        <div className="flex gap-3 border-t border-line px-5 py-3">
          <Button variant="secondary" size="lg" className="flex-1" onClick={onClose}>{cancelar}</Button>
          <Button size="lg" className="flex-1" disabled={guardarDeshabilitado} onClick={onGuardar}>{guardar}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

/* Patient Signature, como en red.dev: nombre impreso e iniciales, la firma adoptada (el nombre en letra de firma) o
   dibujada, la vista previa y el texto legal. */
export function FirmaPaciente({ nombre, descripcion, onClose, onFirmar }: {
  nombre: string
  /** Qué se firma. */
  descripcion?: string
  onClose: () => void
  onFirmar: (rubrica: Rubrica) => void
}) {
  const [impreso, setImpreso] = useState(nombre)
  const [ini, setIni] = useState(iniciales(nombre))
  const [iniTocadas, setIniTocadas] = useState(false)
  const [modo, setModo] = useState<'Adopt Signature' | 'Draw'>('Adopt Signature')
  const [dibujada, setDibujada] = useState<string | null>(null)
  const [pad, setPad] = useState(0)
  const firmada = modo === 'Draw' ? !!dibujada : impreso.trim().length > 1
  const falta = !impreso.trim() ? 'Type the printed name to continue.' : !firmada ? 'Draw the signature to continue.' : ''
  const borrar = () => {
    if (modo === 'Draw') { setDibujada(null); setPad((n) => n + 1) }
    else { setImpreso(''); setIni(''); setIniTocadas(false) }
  }

  return (
    <VentanaFirma
      titulo="Patient Signature"
      descripcion={descripcion}
      guardar="Adopt and Sign"
      guardarDeshabilitado={!!falta}
      onClose={onClose}
      onGuardar={() => onFirmar({ ...(modo === 'Draw' ? { imagen: dibujada ?? undefined } : { texto: impreso.trim() }), iniciales: ini.trim() || undefined })}
    >
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <TextField label="Printed Name" value={impreso} onChange={(v) => { setImpreso(v); if (!iniTocadas) setIni(iniciales(v)) }} />
          <TextField label="Initials" value={ini} onChange={(v) => { setIni(v.toUpperCase().slice(0, 4)); setIniTocadas(true) }} />
        </div>
        <Tabs tabs={['Adopt Signature', 'Draw'] as const} value={modo} onChange={setModo} size="sm" aria-label="Signature method" className="self-start" />
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-ink">Preview</span>
            <Button variant="link" size="sm" onClick={borrar}>Delete</Button>
          </div>
          {modo === 'Draw' ? (
            <PadFirma key={pad} onCambio={setDibujada} />
          ) : (
            <div className="flex h-[160px] flex-col items-center justify-center rounded-lg border border-dashed border-line-strong bg-white px-4 text-center">
              {impreso.trim() ? (
                <>
                  <span className="font-serif text-[30px] leading-tight text-dash-blue italic">{impreso}</span>
                  {ini && <span className="font-serif text-[16px] text-dash-blue/80 italic">({ini})</span>}
                </>
              ) : <span className="text-[13px] text-ink-faint">Type the printed name to adopt a signature.</span>}
              <span className="mt-3 text-[11px] text-ink-faint">Electronic signature representation</span>
            </div>
          )}
        </div>
        <p className="text-[12px] leading-relaxed text-ink-muted">{LEGAL}</p>
        {falta && <p role="status" className="text-[12px] text-ink-muted">{falta}</p>}
      </div>
    </VentanaFirma>
  )
}

/* Provider Signature, como en red.dev: por seguridad se vuelven a pedir las credenciales para firmar. */
export function FirmaProveedor({ nombre, onClose, onFirmar }: { nombre: string; onClose: () => void; onFirmar: (rubrica: Rubrica) => void }) {
  const [email, setEmail] = useState('')
  const [clave, setClave] = useState('')
  const [ver, setVer] = useState(false)
  const listo = /\\S+@\\S+\\.\\S+/.test(email) && clave.length > 0
  return (
    <VentanaFirma
      titulo="Provider Signature"
      descripcion="For security and legal purposes, please re-enter your credentials to sign this document electronically."
      guardar="Sign"
      guardarDeshabilitado={!listo}
      onClose={onClose}
      onGuardar={() => onFirmar({ texto: nombre })}
    >
      <div className="grid grid-cols-2 gap-4">
        <TextField label="Email" value={email} onChange={setEmail} placeholder="example@example.com" />
        <label className="flex flex-col gap-2">
          <FieldLabel>Password</FieldLabel>
          <span className="relative">
            <input
              type={ver ? 'text' : 'password'}
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
              className={cn(control(), 'h-9 px-3 pr-10')}
            />
            <button
              type="button"
              onClick={() => setVer((v) => !v)}
              aria-label={ver ? 'Hide password' : 'Show password'}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 text-ink-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-dash-blue"
            >
              {ver ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </span>
        </label>
      </div>
    </VentanaFirma>
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

  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative rounded-lg border border-dashed border-line-strong bg-white">
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
        <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-[11px] text-ink-faint">{hay ? 'Electronic signature representation' : 'Signature preview area'}</span>
      </div>
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
`})))()}export{n,i as r,r as t};