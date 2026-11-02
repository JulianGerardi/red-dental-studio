import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { Drawer, DrawerSection } from '@/components/ui/drawer'
import { EstadoConsentimiento, tieneDocumento } from '@/components/clinical/ConsentDetail'
import { useState } from 'react'
import { CircleCheck, CircleAlert, Download, FileSignature, FileText, History, MoreVertical, PenLine, RefreshCw, Send, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { CONSENTIMIENTO, SIN_DOCUMENTO, type Firma, type Procedimiento } from '@/data/treatment-plan'
import { ICONO_SUELTO, TARJETA_INTERNA } from '@/lib/estilos'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

/* Figma 4122:250449, rediseñado: una sola fila con el documento, su estado y las dos firmas. Ver clinical-mode.md. */

const TONO = {
  Pending: { bar: '#99660d', pill: 'border-warn-fg bg-warn-bg text-warn-fg', icono: 'text-warn-fg' },
  Signed: { bar: '#1a804d', pill: 'border-dash-ok-fg bg-dash-ok-bg text-dash-ok-fg', icono: 'text-dash-ok-fg' },
  Expired: { bar: '#b22626', pill: 'border-dash-bad-fg bg-dash-bad-bg text-dash-bad-fg', icono: 'text-dash-bad-fg' },
}

export function FilaFirma({ f }: { f: Firma }) {
  const ok = f.estado === 'Signed'
  return (
    <span className="flex min-w-0 items-center gap-1.5 text-[12.5px] whitespace-nowrap">
      {ok
        ? <CircleCheck className="size-4 shrink-0 text-dash-ok-fg" aria-hidden />
        : <CircleAlert className="size-4 shrink-0 text-warn-fg" aria-hidden />}
      <span className="font-semibold text-ink">{f.rol}</span>
      {/* Con la card angosta el nombre se esconde para que la fila no se parta; el rol y el estado quedan. */}
      <span className="sr-only text-ink-muted @5xl:not-sr-only">{f.nombre}</span>
      <span className={cn('font-medium', ok ? 'text-dash-ok-fg' : 'text-warn-fg')}>
        · {ok ? \`Signed \${f.fecha}\` : 'Pending'}
      </span>
    </span>
  )
}

/* El historial (el reloj del bloque): todos los consentimientos del caso juntos, no uno abajo del otro en la pantalla.
   Primero los de cada procedimiento, que se abren para firmarlos; después las versiones del consentimiento del caso.
   Ver clinical-mode.md (2026-11-02). */
export function PanelHistorial({ onClose, procedimientos = [], onAbrirProcedimiento }: {
  onClose: () => void
  procedimientos?: Pick<Procedimiento, 'id' | 'codigo' | 'nombre' | 'consentimiento' | 'firmas'>[]
  onAbrirProcedimiento?: (id: string) => void
}) {
  const conConsentimiento = procedimientos.filter((p) => p.consentimiento)
  return (
    <Drawer open onClose={onClose} title="Consent history" description={CONSENTIMIENTO.titulo}>
      {conConsentimiento.length > 0 && (
        <DrawerSection title="Procedure consents" description="The specific consent of each procedure in this case." className="mb-6">
          <ul className="flex flex-col gap-2">
            {conConsentimiento.map((p) => {
              const abrir = tieneDocumento(p.consentimiento) && onAbrirProcedimiento ? () => onAbrirProcedimiento(p.id) : undefined
              return (
                <li key={p.id} className={cn(TARJETA_INTERNA, 'flex items-center gap-3 px-3 py-2.5')}>
                  <span className="min-w-0 flex-1">
                    {abrir ? (
                      <button type="button" onClick={abrir} className="text-dash-blue block text-left text-[13px] font-semibold hover:underline">
                        Procedure Consent - {p.codigo} {p.nombre}
                      </button>
                    ) : <span className="block text-[13px] font-semibold text-ink">Procedure Consent - {p.codigo} {p.nombre}</span>}
                    <span className="block text-[12px] text-ink-muted">
                      {[p.firmas?.Patient && \`Patient signed \${p.firmas.Patient}\`, p.firmas?.Provider && \`Provider signed \${p.firmas.Provider}\`].filter(Boolean).join(' · ')
                        || (p.consentimiento && SIN_DOCUMENTO[p.consentimiento]) || 'No signatures yet'}
                    </span>
                  </span>
                  <EstadoConsentimiento estado={p.consentimiento!} />
                </li>
              )
            })}
          </ul>
        </DrawerSection>
      )}
      <h3 className="text-[13px] font-bold text-ink">Case consent</h3>
      <ol className="flex flex-col pt-3">
        {CONSENTIMIENTO.historial.map((h, i, todos) => (
          <li key={h.id} className="flex gap-3">
            <span className="flex flex-col items-center">
              <span className={cn('mt-1 size-2 shrink-0 rounded-full', i === 0 ? 'bg-dash-blue' : 'bg-line-strong')} />
              {i < todos.length - 1 && <span className="w-px flex-1 bg-line" />}
            </span>
            <span className="min-w-0 flex-1 pb-5">
              <span className="block text-[13px] font-semibold text-ink">{h.evento}</span>
              <span className="block text-[12px] text-ink-muted">
                {h.version} · {h.fecha} · {h.autor}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </Drawer>
  )
}

/* Las acciones del documento; el menú tiene el mismo diseño que el del caso (secciones con título, ícono en cada ítem). */
const ACCIONES_DOCUMENTO: { label: string; icono: LucideIcon }[] = [
  { label: 'Open document', icono: FileText },
  { label: 'Send to patient again', icono: Send },
  { label: 'Replace document', icono: RefreshCw },
  { label: 'Download PDF', icono: Download },
]

/* El consentimiento del caso, no el de cada procedimiento. \`firmado\`: el caso ya pasó Waiting for consent, las dos
   firmas están. Al juntar las dos avisa (\`onFirmado\`): el caso que esperaba el consentimiento pasa a Accepted (CON-2980). */
export function ConsentBlock({ firmado = false, onFirmado, procedimientos, onAbrirProcedimiento }: {
  firmado?: boolean
  onFirmado?: () => void
  /** Los procedimientos del caso: sus consentimientos van en el historial. */
  procedimientos?: Procedimiento[]
  onAbrirProcedimiento?: (id: string) => void
} = {}) {
  const [firmas, setFirmas] = useState(() => (firmado
    ? CONSENTIMIENTO.firmas.map((f) => ({ ...f, estado: 'Signed' as const, fecha: f.fecha ?? '05/14/2026' }))
    : CONSENTIMIENTO.firmas))
  const [historial, setHistorial] = useState(false)

  const pendientes = firmas.filter((f) => f.estado === 'Pending')
  const estado = pendientes.length === 0 ? 'Signed' : CONSENTIMIENTO.estado
  const t = TONO[estado]

  const firmar = (rol: Firma['rol']) => {
    const nuevas = firmas.map((f) => (f.rol === rol ? { ...f, estado: 'Signed' as const, fecha: '05/14/2026' } : f))
    setFirmas(nuevas)
    if (nuevas.every((f) => f.estado === 'Signed') && onFirmado) onFirmado()
    else aviso.ok(\`\${CONSENTIMIENTO.titulo} signed as \${rol.toLowerCase()}.\`)
  }

  return (
    <div
      className="@container relative flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg bg-white shadow-panel py-2 pr-2 pl-4"
      style={{ borderLeftWidth: 3, borderLeftColor: t.bar }}
    >
      <span className="flex min-w-0 items-center gap-2">
        <FileSignature className={cn('size-4 shrink-0', t.icono)} aria-hidden />
        <span className="text-[14px] font-bold text-ink">{CONSENTIMIENTO.titulo}</span>
        <span className={cn('shrink-0 rounded-full border px-2 py-[1px] text-[11px] font-semibold', t.pill)}>
          {estado}
        </span>
        <span className="sr-only">
          {pendientes.length === 0
            ? 'All signatures collected'
            : \`\${pendientes.length} of \${firmas.length} signatures pending\`}
        </span>
      </span>

      {/* Quién firmó y qué falta, en la misma línea. */}
      <span className="ml-auto flex flex-wrap items-center gap-x-4 gap-y-1">
        {firmas.map((f) => <FilaFirma key={f.rol} f={f} />)}
      </span>

      <span className="flex shrink-0 items-center">
        {/* El historial es secundario: sólo el ícono, con su título. */}
        <button
          onClick={() => setHistorial(true)}
          title="Consent history"
          aria-label="Consent history"
          className={\`\${ICONO_SUELTO} size-8\`}
        >
          <History className="size-4" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button aria-label="Consent actions" className={\`\${ICONO_SUELTO} size-8 shrink-0\`}>
              <MoreVertical className="size-4" />
            </button>
          </DropdownMenuTrigger>
          {/* Sin fila de botones al pie, las acciones —incluida la firma pendiente— viven acá. */}
          <DropdownMenuContent align="end" className="w-[210px]">
            <DropdownMenuLabel className="text-[12px] font-semibold text-ink">Signatures</DropdownMenuLabel>
            {pendientes.length ? pendientes.map((f) => (
              <DropdownMenuItem key={f.rol} onSelect={() => firmar(f.rol)} className="gap-2 text-[13px]">
                <PenLine className="size-4 text-ink-muted" /> Sign as {f.rol.toLowerCase()}
              </DropdownMenuItem>
            )) : <p className="px-2 pb-1.5 text-[12px] text-ink-muted italic">All signatures collected</p>}
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-[12px] font-semibold text-ink">Document</DropdownMenuLabel>
            {ACCIONES_DOCUMENTO.map(({ label, icono: Icono }) => (
              <DropdownMenuItem key={label} onSelect={() => aviso.info(\`\${label} is not available in this release.\`)} className="gap-2 text-[13px]">
                <Icono className="size-4 text-ink-muted" /> {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </span>

      {historial && (
        <PanelHistorial
          onClose={() => setHistorial(false)}
          procedimientos={procedimientos}
          onAbrirProcedimiento={onAbrirProcedimiento && ((id) => { setHistorial(false); onAbrirProcedimiento(id) })}
        />
      )}
    </div>
  )
}
`})))()}export{n,i as r,r as t};