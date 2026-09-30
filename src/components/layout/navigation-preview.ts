import { createContext } from 'react'

/* Estados del menú lateral que en la app dependen del mouse o del botón de la
   barra (expandido, tooltip, menú de Settings). Sólo Storybook los fija, para
   mostrarlos sobre las pantallas reales; en la app este contexto está vacío. */
export type NavigationPreviewState = {
  /** El menú arranca expandido. */
  expanded?: boolean
  /** Nombre del ítem cuyo tooltip queda abierto (rail colapsado). */
  tooltip?: string
  /** Menú flotante de Settings abierto. */
  settingsMenu?: boolean
}

export const NavigationPreview = createContext<NavigationPreviewState>({})
