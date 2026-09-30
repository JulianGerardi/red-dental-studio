import { createContext } from 'react'

/* Estados del menú del paciente que en la app se abren con el mouse (tooltip,
   tarjeta de datos, opciones de encuentro). Sólo Storybook los fija, para
   mostrarlos sobre las pantallas reales; en la app este contexto está vacío. */
export type PatientMenuPreviewState = {
  /** Fija colapsado o expandido en esta instancia (varios menús lado a lado). */
  collapsed?: boolean
  /** Fija el estado del botón de encuentro en esta instancia. */
  encounter?: 'start' | 'pending'
  /** Texto del tooltip que queda abierto (rail colapsado). */
  tooltip?: string
  /** Tarjeta de General y Contact abierta (rail colapsado). */
  infoCard?: boolean
  /** Opciones del botón de encuentro abiertas. */
  encounterOptions?: boolean
}

export const PatientMenuPreview = createContext<PatientMenuPreviewState>({})
