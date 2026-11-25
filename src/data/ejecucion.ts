import type { EstadoProcedimiento } from '@/data/clinical-mode'

/* CON-4153: los procedimientos previstos para el turno del encuentro en curso y las fases que ya se registraron. Los
   cinco casos del prototipo de Julián (end_encounter_sequential_phases): una sola fase, el inicio de uno de tres, una
   fase intermedia, una ya registrada desde el Treatment Plan y la última. Ver clinical-mode.md (2026-11-25). */

/** El hito que deja una fase en el encuentro donde se hizo (encounter_procedure_phases.status). */
export type EventoFase = 'Started' | 'Continued' | 'Finished'

/** La nota clínica del encuentro, para el historial: firmada, sin firmar, sin nota o sin permiso para verla (CON-4158). */
export type EstadoNota = 'Signed' | 'Unsigned' | 'None' | 'Restricted'

export type Encuentro = { id: string; fecha: string; provider: string; nota: EstadoNota }

export type RegistroFase = { fase: number; evento: EventoFase; encuentro: string }

export type ProcedimientoCita = {
  id: string
  codigo: string
  nombre: string
  pieza?: string
  superficie?: string
  ubicacion?: string
  /** Fases planificadas (CON-3942): cuántas visitas del caso lo tienen. */
  fases: number
  estado: EstadoProcedimiento
  registros: RegistroFase[]
  nota?: string
}

/** El encuentro en curso; los anteriores quedan con su fecha y su nota. */
export const ENCUENTRO_ACTUAL = 'enc-actual'

export const ENCUENTROS_PREVIOS: Encuentro[] = [
  { id: 'enc-0901', fecha: '09/01/2026', provider: 'Perez Martinez', nota: 'Signed' },
  { id: 'enc-0922', fecha: '09/22/2026', provider: 'Perez Martinez', nota: 'Restricted' },
  { id: 'enc-1013', fecha: '10/13/2026', provider: 'Perez Martinez', nota: 'None' },
  { id: 'enc-1103', fecha: '11/03/2026', provider: 'Perez Martinez', nota: 'Unsigned' },
]

export const CITA_ENCUENTRO = { hora: '10:00 AM', provider: 'Perez Martinez' }

export const PROCEDIMIENTOS_CITA: ProcedimientoCita[] = [
  /* A: una sola fase. Complete procedure la deja Finished sin pasar por In progress. */
  { id: 'pc1', codigo: 'D2391', nombre: 'Resin-based composite – one surface, posterior', pieza: '3', superficie: 'O', fases: 1, estado: 'Pending', registros: [] },
  /* B: la fase 1 se hizo en un encuentro anterior; hoy toca la 2 (intermedia). */
  { id: 'pc2', codigo: 'D3330', nombre: 'Endodontic therapy, molar tooth', pieza: '19', fases: 4, estado: 'In progress', registros: [
    { fase: 1, evento: 'Started', encuentro: 'enc-1103' },
  ] },
  /* C: la fase 3 ya se registró hoy desde el Treatment Plan: aparece confirmada y ofrece la 4. */
  { id: 'pc3', codigo: 'D2750', nombre: 'Crown – porcelain fused to high noble metal', pieza: '14', fases: 4, estado: 'In progress', registros: [
    { fase: 1, evento: 'Started', encuentro: 'enc-0922' },
    { fase: 2, evento: 'Continued', encuentro: 'enc-1013' },
    { fase: 3, evento: 'Continued', encuentro: ENCUENTRO_ACTUAL },
  ] },
  /* D: hoy toca la última fase: la acción es Complete procedure, no Complete phase 4. */
  { id: 'pc4', codigo: 'D5110', nombre: 'Complete denture – maxillary', ubicacion: 'Upper arch', fases: 4, estado: 'In progress', registros: [
    { fase: 1, evento: 'Started', encuentro: 'enc-0901' },
    { fase: 2, evento: 'Continued', encuentro: 'enc-0922' },
    { fase: 3, evento: 'Continued', encuentro: 'enc-1103' },
  ] },
  /* E: tres fases sin empezar: Start procedure, después Complete phase 2 y Complete procedure, todo en este encuentro. */
  { id: 'pc5', codigo: 'D6010', nombre: 'Surgical placement of implant body: endosteal implant', pieza: '30', fases: 3, estado: 'Pending', registros: [] },
]
