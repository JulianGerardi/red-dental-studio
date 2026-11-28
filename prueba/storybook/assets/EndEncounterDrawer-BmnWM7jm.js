import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { ArrowLeft, CircleCheck, History, Lock, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { Drawer } from '@/components/ui/drawer'
import { Pill, type PillTone } from '@/components/ui/pill'
import { ListGroup } from '@/components/ui/list-group'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { DocumentViewer } from '@/components/ui/document-viewer'
import { EmptyState } from '@/components/ui/empty-state'
import { ResumenConsentimiento } from '@/components/clinical/ConsentRequiredDialog'
import { ACCION, DialogoCambioEstado, DialogoEditar, TONO_PROCEDIMIENTO } from '@/components/clinical/accionesProcedimiento'
import { VistaDocumento } from '@/pages/ClinicalNote'
import type { Documento } from '@/components/dashboard/documentoTarea'
import { TABLA_ENCABEZADO, TABLA_FILA, TABLA_MARCO, TABLA_LINK } from '@/lib/estilos'
import { PACIENTE } from '@/data/treatment-plan'
import { ENCUENTRO_ACTUAL, type EventoFase, type ProcedimientoCita } from '@/data/ejecucion'
import {
  accionPrincipal, cambiarEstadoCita, completarProcedimiento, encuentroDe, esAnticipado, esFinal, faseDeCierre,
  guardarNotaCita, registrarFase, registrosHoy, siguienteFase, useProcedimientosCita,
} from '@/lib/ejecucion'

/* CON-4157 (HU 4): antes de cerrar el encuentro, el drawer con los procedimientos del turno y la acción de cada uno.
   Cada acción se guarda en el momento (CON-4154 y CON-4155); Back o la X no cierran el encuentro ni deshacen nada; End
   Encounter lo cierra aunque queden fases sin registrar. Prototipo: end_encounter_sequential_phases (Julián, 2026-11-25).
   Ver clinical-mode.md (2026-11-25). */


/** Pieza y superficie, o el área: "Tooth #19 · O", "Upper arch". */
export const zona = (p: ProcedimientoCita) =>
  [p.pieza && \`Tooth #\${p.pieza}\`, p.superficie, p.ubicacion].filter(Boolean).join(' · ')

const resumen = (p: ProcedimientoCita) => ({ id: p.id, codigo: p.codigo, nombre: p.nombre, pieza: p.pieza })

type Dialogo =
  | { tipo: 'anticipado'; p: ProcedimientoCita }
  | { tipo: 'estado'; p: ProcedimientoCita; accion: 'refer' | 'discard' | 'discontinue' }
  | { tipo: 'editar'; p: ProcedimientoCita }
  | { tipo: 'historial'; p: ProcedimientoCita }

/** El botón de la fila y la primera opción del menú: registra la fase o completa. */
function ejecutar(p: ProcedimientoCita) {
  const a = accionPrincipal(p)
  if (!a) return
  if (a.tipo === 'completar') {
    completarProcedimiento(p.id)
    aviso.ok('Procedure completed.')
    return
  }
  registrarFase(p.id)
  aviso.ok(\`Phase \${a.fase} completed. Phase \${a.fase + 1} is now available.\`)
}

/** Lo que dice la fila de la ejecución: qué fase toca, o dónde terminó. */
function lineaFase(p: ProcedimientoCita) {
  if (p.fases === 1) return 'Single phase'
  const ultima = p.registros.at(-1)
  if (esFinal(p)) {
    if (!ultima) return \`\${p.fases} phases planned\`
    const temprano = p.estado === 'Completed' && ultima.fase < p.fases
    return \`Last completed: phase \${ultima.fase} of \${p.fases}\${temprano ? ' · Completed early' : ''}\`
  }
  return \`Next: phase \${Math.min(siguienteFase(p), p.fases)} of \${p.fases}\`
}

/** Las opciones del ⋮ por secciones (CON-4156): la fase, el procedimiento y las generales. Lo que no corresponde al
    estado no aparece; en un estado final quedan Edit y el historial. */
export function MenuProcedimientoCita({ p, onDialogo }: { p: ProcedimientoCita; onDialogo: (d: Dialogo) => void }) {
  const a = accionPrincipal(p)
  const abierto = !esFinal(p)
  const Etiqueta = ({ children }: { children: string }) => (
    <DropdownMenuLabel className="text-[11px] font-semibold tracking-wide text-ink-muted uppercase">{children}</DropdownMenuLabel>
  )
  return (
    <>
      {abierto && a && a.tipo !== 'completar' && (
        <>
          <Etiqueta>Phase</Etiqueta>
          <DropdownMenuItem className="gap-2 text-[13px]" onSelect={() => ejecutar(p)}>
            {a.tipo === 'start' ? <Play className="size-4 text-ink-muted" /> : <CircleCheck className="size-4 text-ink-muted" />} {a.label}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </>
      )}
      {abierto && (
        <>
          <Etiqueta>Procedure</Etiqueta>
          <DropdownMenuItem
            className="gap-2 text-[13px]"
            onSelect={() => (esAnticipado(p) ? onDialogo({ tipo: 'anticipado', p }) : ejecutar(p))}
          >
            <CircleCheck className="size-4 text-ink-muted" />
            {registrosHoy(p).length && p.fases > 1 ? \`Complete procedure at phase \${faseDeCierre(p)}\` : 'Complete procedure'}
          </DropdownMenuItem>
          {(p.estado === 'In progress' ? ['discontinue'] as const : ['refer', 'discard'] as const).map((accion) => {
            const { label, icono: Icono, peligro } = ACCION[accion]
            return (
              <DropdownMenuItem
                key={accion}
                className={cn('gap-2 text-[13px]', peligro && 'text-dash-bad-fg focus:text-dash-bad-fg')}
                onSelect={() => onDialogo({ tipo: 'estado', p, accion })}
              >
                <Icono className={cn('size-4', peligro ? 'text-dash-bad-fg' : 'text-ink-muted')} /> {label}
              </DropdownMenuItem>
            )
          })}
          <DropdownMenuSeparator />
        </>
      )}
      <Etiqueta>Actions</Etiqueta>
      <DropdownMenuItem className="gap-2 text-[13px]" onSelect={() => onDialogo({ tipo: 'editar', p })}>
        <ACCION.edit.icono className="size-4 text-ink-muted" /> Edit
      </DropdownMenuItem>
      <DropdownMenuItem className="gap-2 text-[13px]" onSelect={() => onDialogo({ tipo: 'historial', p })}>
        <History className="size-4 text-ink-muted" /> View execution history
      </DropdownMenuItem>
    </>
  )
}

/** Una fila compacta: el procedimiento, su fase, lo hecho hoy y la acción que toca (CON-4157). */
export function FilaProcedimientoCita({ p, onDialogo }: { p: ProcedimientoCita; onDialogo: (d: Dialogo) => void }) {
  const a = accionPrincipal(p)
  const hechas = registrosHoy(p)
  const ultimaHecha = hechas.find((r) => r.evento === 'Finished') ?? hechas.reduce<(typeof hechas)[number] | undefined>((m, r) => (!m || r.fase > m.fase ? r : m), undefined)
  return (
    <div className="flex flex-wrap items-start gap-x-3 gap-y-2 px-4 py-3">
      <div className="flex min-w-0 flex-1 basis-[240px] flex-col gap-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-[13px] leading-snug font-semibold text-ink">{p.codigo} · {p.nombre}</span>
          <Pill tone={TONO_PROCEDIMIENTO[p.estado]} size="sm">{p.estado}</Pill>
        </div>
        <p className="text-[12px] text-ink-muted">{[zona(p), lineaFase(p)].filter(Boolean).join(' · ')}</p>
        {/* Una sola línea con lo último hecho hoy: completado el procedimiento, ya no se listan sus fases (Julián, 2026-11-25). */}
        {ultimaHecha && (
          <p className="flex items-center gap-1 text-[12px] font-medium text-dash-ok-fg">
            <CircleCheck aria-hidden className="size-3.5" />
            {ultimaHecha.evento === 'Finished' ? 'Procedure completed' : \`Phase \${ultimaHecha.fase} completed\`}
          </p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-1 max-sm:w-full max-sm:justify-between">
        {a ? (
          <Button variant="secondary" size="sm" onClick={() => ejecutar(p)}>
            {a.tipo === 'start' ? <Play /> : <CircleCheck />} {a.label}
          </Button>
        ) : (
          /* Sin acción: completado (lo dice la línea verde de arriba) o en un estado final. */
          <span className="text-[12px] text-ink-muted">{p.estado === 'Completed' && !hechas.length ? 'Procedure completed' : ''}</span>
        )}
        <RowActionsMenu label={p.nombre}>
          <MenuProcedimientoCita p={p} onDialogo={onDialogo} />
        </RowActionsMenu>
      </div>
    </div>
  )
}

/** Los diálogos que abre el menú: completar antes de tiempo, Refer/Discard/Discontinue, Edit y el historial. */
export function DialogosProcedimientoCita({ dialogo, onClose }: { dialogo: Dialogo | null; onClose: () => void }) {
  if (!dialogo) return null
  const { p } = dialogo
  if (dialogo.tipo === 'anticipado') {
    const fase = faseDeCierre(p)
    return (
      <ConfirmDialog
        title="Complete procedure?"
        confirmLabel="Complete procedure"
        icon="warning"
        onCancel={onClose}
        onConfirm={() => { completarProcedimiento(p.id); onClose(); aviso.ok('Procedure completed.') }}
      >
        <p>This procedure has remaining planned phases. Completing it now will mark the procedure as completed. The treatment plan will remain unchanged.</p>
        <ResumenConsentimiento procedimientos={[resumen(p)]} />
        <p className="mt-3">It will finish at phase {fase} of {p.fases}. No phase after it will be recorded.</p>
      </ConfirmDialog>
    )
  }
  if (dialogo.tipo === 'estado') {
    return (
      <DialogoCambioEstado
        accion={dialogo.accion}
        procedimiento={resumen(p)}
        desde={p.estado}
        onCancel={onClose}
        onConfirm={() => { cambiarEstadoCita(p.id, ACCION[dialogo.accion].a!); onClose(); aviso.ok(\`Procedure \${ACCION[dialogo.accion].a!.toLowerCase()}.\`) }}
      />
    )
  }
  if (dialogo.tipo === 'editar') {
    return (
      <DialogoEditar
        procedimiento={resumen(p)}
        nota={p.nota}
        onClose={onClose}
        onGuardar={(nota) => { guardarNotaCita(p.id, nota); onClose(); aviso.ok('Procedure notes saved.') }}
      />
    )
  }
  return <ExecutionHistoryDrawer id={p.id} onClose={onClose} />
}

export function EndEncounterDrawer({ open, onClose, onEnd }: { open: boolean; onClose: () => void; onEnd: () => void }) {
  const procedimientos = useProcedimientosCita()
  const [dialogo, setDialogo] = useState<Dialogo | null>(null)
  /* El diálogo sigue al procedimiento: si cambia mientras está abierto, se ve el estado nuevo. */
  const actual = dialogo && { ...dialogo, p: procedimientos.find((x) => x.id === dialogo.p.id) ?? dialogo.p }
  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        title="End Encounter"
        description="Review the procedures scheduled for this appointment before ending the encounter."
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={onClose}><ArrowLeft /> Back</Button>
            <Button onClick={onEnd}>End Encounter</Button>
          </>
        }
      >
        <div className="flex flex-col gap-5">
          <ListGroup title="Appointment procedures">
            {procedimientos.map((p) => <FilaProcedimientoCita key={p.id} p={p} onDialogo={setDialogo} />)}
          </ListGroup>
        </div>
      </Drawer>
      <DialogosProcedimientoCita dialogo={actual} onClose={() => setDialogo(null)} />
    </>
  )
}

/* ── CON-4158 (HU 5): el historial de ejecución ─────────────────────── */

const TONO_EVENTO: Record<EventoFase, PillTone> = { Started: 'info', Continued: 'neutral', Finished: 'success' }

export function ExecutionHistoryDrawer({ id, onClose }: { id: string; onClose: () => void }) {
  const p = useProcedimientosCita().find((x) => x.id === id)
  const [nota, setNota] = useState<string | null>(null)
  if (!p) return null
  /* Sólo lo registrado, de la fase menor a la mayor; las fases planificadas sin hacer no aparecen. */
  const filas = [...p.registros].sort((a, b) => a.fase - b.fase)
  const columnas = 'sm:grid sm:grid-cols-[64px_minmax(124px,1fr)_minmax(96px,0.8fr)_minmax(140px,1.4fr)] sm:gap-3'
  return (
    <>
      <Drawer
        open
        onClose={onClose}
        title="Execution history"
        description={\`Phases recorded for \${p.codigo} · \${p.nombre}\`}
        size="lg"
        footer={<Button variant="secondary" onClick={onClose}>Close</Button>}
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[14px] leading-snug font-semibold text-ink">{p.codigo} · {p.nombre}</span>
              <Pill tone={TONO_PROCEDIMIENTO[p.estado]} size="sm">{p.estado}</Pill>
            </div>
            <p className="text-[12px] text-ink-muted">{[zona(p), \`\${p.fases} \${p.fases === 1 ? 'phase' : 'phases'} planned\`].filter(Boolean).join(' · ')}</p>
          </div>

          {filas.length === 0 ? (
            <EmptyState
              icon={History}
              title="No execution history available."
              detail={p.estado === 'Completed'
                ? 'This procedure is marked as completed, but no structured phase history is available.'
                : 'No phases have been recorded for this procedure.'}
              className={TABLA_MARCO}
            />
          ) : (
            <div role="table" aria-label="Recorded phases" className={TABLA_MARCO}>
              <div role="row" className={cn('hidden', columnas, TABLA_ENCABEZADO)}>
                <span role="columnheader">Phase</span>
                <span role="columnheader">Encounter date</span>
                <span role="columnheader">Procedure event</span>
                <span role="columnheader">Clinical note</span>
              </div>
              {filas.map((r) => {
                const e = encuentroDe(r.encuentro)
                return (
                  <div key={r.fase} role="row" className={cn('flex flex-wrap gap-x-3 gap-y-1 py-2.5 max-sm:[&:nth-child(2)]:border-t-0', columnas, TABLA_FILA)}>
                    <span role="cell" className="font-semibold text-ink">Phase {r.fase}</span>
                    <span role="cell" className="whitespace-nowrap">{e.fecha}{r.encuentro === ENCUENTRO_ACTUAL && <span className="text-ink-muted"> · Today</span>}</span>
                    <span role="cell" className="max-sm:basis-full"><Pill tone={TONO_EVENTO[r.evento]} size="sm">{r.evento}</Pill></span>
                    <span role="cell" className="flex flex-wrap items-center gap-2">
                      {e.nota === 'None' && <span className="text-ink-muted">No clinical note</span>}
                      {e.nota === 'Restricted' && <span className="flex items-center gap-1 text-ink-muted"><Lock aria-hidden className="size-3.5" /> Access restricted</span>}
                      {(e.nota === 'Signed' || e.nota === 'Unsigned') && (
                        <>
                          <button type="button" className={cn(TABLA_LINK, 'rounded focus-visible:outline-2 focus-visible:outline-dash-blue')} onClick={() => setNota(r.encuentro)}>
                            View clinical note
                          </button>
                          {e.nota === 'Unsigned' && <Pill tone="warning" size="sm">Unsigned</Pill>}
                        </>
                      )}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
          <p className="text-[12px] leading-relaxed text-ink-muted">
            Each row is a phase recorded in an encounter. Phases that are planned but not done don't appear here.
          </p>
        </div>
      </Drawer>
      {nota && <NotaEncuentro encuentro={nota} onBack={() => setNota(null)} />}
    </>
  )
}

/* La nota del encuentro completo (no de la fase), en el visor de documentos. Back vuelve al historial; abrirla no la
   firma ni la cambia. */
function NotaEncuentro({ encuentro, onBack }: { encuentro: string; onBack: () => void }) {
  const procedimientos = useProcedimientosCita()
  const e = encuentroDe(encuentro)
  const hechos = procedimientos.flatMap((p) =>
    p.registros.filter((r) => r.encuentro === encuentro).map((r) => \`\${p.codigo} · \${p.nombre}\${p.pieza ? \` · Tooth #\${p.pieza}\` : ''} — Phase \${r.fase} of \${p.fases} · \${r.evento}\`),
  )
  const doc: Documento = {
    titulo: 'Dental Clinical Note',
    paciente: PACIENTE,
    provider: e.provider,
    firmado: e.nota === 'Signed' ? e.fecha : undefined,
    secciones: [
      { titulo: 'Dental Clinical Note', campos: [['Patient name', PACIENTE], ['Date of visit', e.fecha], ['Attending dentist', e.provider], ['Status', e.nota === 'Signed' ? 'Signed' : 'Unsigned']] },
      { titulo: 'Procedures', listas: [['Recorded in this encounter:', hechos.length ? hechos : ['No procedure execution recorded.']]] },
    ],
  }
  return (
    <DocumentViewer
      title={\`Clinical note - \${PACIENTE}\`}
      subtitle={e.fecha}
      backLabel="Back to history"
      onBack={onBack}
      status={<Pill tone={e.nota === 'Signed' ? 'success' : 'warning'} size="sm">{e.nota === 'Signed' ? 'Signed' : 'Unsigned'}</Pill>}
      notice={e.nota === 'Unsigned' ? 'This clinical note is not signed yet. Opening it does not sign or change it.' : undefined}
      noticeTone="neutral"
    >
      <VistaDocumento doc={doc} />
    </DocumentViewer>
  )
}
`})))()}export{n,i as r,r as t};