import { useSyncExternalStore } from 'react'

/* Pacientes con la Clinical Note sin firmar al cerrar el encuentro (Remind me later): su ficha muestra Pending Signature.
   Vive fuera de React, por paciente; algunos arrancan así para verlo sin hacer el flujo (patient-dashboard.md,
   2026-11-10). */
export const NOTA_PENDIENTE_INICIAL = ['patient-0002', 'patient-0003', 'patient-0005']

let pendientes = new Set(NOTA_PENDIENTE_INICIAL)
const oyentes = new Set<() => void>()

export function setNotaPendiente(paciente: string, v: boolean) {
  pendientes = new Set(pendientes)
  if (v) pendientes.add(paciente)
  else pendientes.delete(paciente)
  oyentes.forEach((f) => f())
}

export function useNotaPendiente(paciente: string) {
  return useSyncExternalStore(
    (f) => { oyentes.add(f); return () => { oyentes.delete(f) } },
    () => pendientes.has(paciente),
  )
}
