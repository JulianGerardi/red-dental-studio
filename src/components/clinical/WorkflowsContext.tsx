import { createContext, useContext, useState, type ReactNode } from 'react'
import { aviso } from '@/components/ui/toaster'
import { PROGRESO_INICIAL, WORKFLOWS, type Narrativa, type ProgresoWorkflow, type Valor } from '@/data/workflows'

/* El progreso de los workflows del paciente, compartido entre Treatment (donde se contestan) y el header (CC y TR muestran
   si Chief Complaint y Triage están completos). Ver design-reference/figma/modulos/clinical-mode.md. */

type Workflows = {
  progreso: Record<string, ProgresoWorkflow>
  elegido: string
  elegir: (id: string) => void
  responder: (wf: string, pregunta: string, v: Valor) => void
  guardarPaso: (wf: string, paso: string) => void
  guardarNarrativa: (wf: string, n: Omit<Narrativa, 'fecha'>) => void
  /** Lleva a Treatment con ese workflow abierto. */
  abrir: (id: string) => void
}

const vacio = (): ProgresoWorkflow => ({ respuestas: {}, guardados: [] })
const ahora = () => new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', hour: 'numeric', minute: '2-digit' })
const primeroPendiente = (p: Record<string, ProgresoWorkflow>) => (WORKFLOWS.find((w) => !p[w.id]?.completado) ?? WORKFLOWS[0]).id

const Contexto = createContext<Workflows | null>(null)

/* Sin provider (stories sueltos del header) se lee el arranque del mock y nada cambia. */
const RESPALDO: Workflows = {
  progreso: PROGRESO_INICIAL, elegido: primeroPendiente(PROGRESO_INICIAL),
  elegir: () => {}, responder: () => {}, guardarPaso: () => {}, guardarNarrativa: () => {}, abrir: () => {},
}

export function useWorkflows() {
  return useContext(Contexto) ?? RESPALDO
}

export function WorkflowsProvider({
  children, inicial = PROGRESO_INICIAL, onAbrir,
}: {
  children: ReactNode
  inicial?: Record<string, ProgresoWorkflow>
  onAbrir?: (id: string) => void
}) {
  const [progreso, setProgreso] = useState(inicial)
  const [elegido, elegir] = useState(() => primeroPendiente(inicial))

  const responder = (wf: string, pregunta: string, v: Valor) =>
    setProgreso((p) => {
      const w = p[wf] ?? vacio()
      return { ...p, [wf]: { ...w, respuestas: { ...w.respuestas, [pregunta]: v } } }
    })

  const guardarPaso = (wf: string, paso: string) => {
    const flujo = WORKFLOWS.find((w) => w.id === wf)
    if (!flujo) return
    const w = progreso[wf] ?? vacio()
    const guardados = [...new Set([...w.guardados, paso])]
    const completo = flujo.pasos.every((p) => guardados.includes(p.id))
    setProgreso((p) => ({ ...p, [wf]: { ...(p[wf] ?? vacio()), guardados, completado: completo ? (w.completado ?? ahora()) : undefined } }))
    if (completo && !w.completado) aviso.ok(`${flujo.nombre} completed.`)
    else aviso.ok(`${flujo.pasos.find((p) => p.id === paso)?.nombre ?? 'Step'} saved.`)
  }

  const guardarNarrativa = (wf: string, n: Omit<Narrativa, 'fecha'>) =>
    setProgreso((p) => ({ ...p, [wf]: { ...(p[wf] ?? vacio()), narrativa: { ...n, fecha: ahora() } } }))

  const abrir = (id: string) => { elegir(id); onAbrir?.(id) }

  return <Contexto.Provider value={{ progreso, elegido, elegir, responder, guardarPaso, guardarNarrativa, abrir }}>{children}</Contexto.Provider>
}
