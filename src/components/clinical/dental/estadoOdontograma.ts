import { getStatusChart, importStatus, onStateChange } from 'react-advanced-odontogram'
import { ULTIMA_CONDICION } from '@/data/clinical-mode'

/* El odontograma del paciente es uno solo para DentAssmt y el Overview. La librería guarda su estado en el módulo y lo
   borra al desmontarse, así que se copia acá con cada cambio y se vuelve a cargar al montar. Arranca con la última
   condición del frame: la caries oclusal de la pieza 3 (Problem List p5). Ver clinical-mode.md (2026-10-18). */

/* Las piezas en orden Universal, 1 a 32, con su número FDI: la librería numera en FDI y la pantalla en Universal. */
export const UNIVERSAL_A_FDI = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 38, 37, 36, 35, 34, 33, 32, 31, 41, 42, 43, 44, 45, 46, 47, 48]
export const fdiDe = (universal: number) => UNIVERSAL_A_FDI[universal - 1] ?? 0

let guardado: unknown = { teeth: { [fdiDe(ULTIMA_CONDICION.pieza ?? 0)]: { caries: ['caries-occlusal'] } } }
let aElegir: number | null = null

/** "Show details" del Overview: DentAssmt abre con esta pieza elegida. */
export const elegirAlAbrir = (pieza: number) => { aElegir = pieza }

/** Carga lo guardado en cuanto la librería termina de armarse; si es editable, guarda cada cambio. Devuelve la limpieza. */
export function sincronizarOdontograma({ editable }: { editable: boolean }) {
  let listo = false
  return onStateChange(() => {
    if (!listo) {
      listo = true
      importStatus(guardado)
      if (editable && aElegir) {
        const fdi = fdiDe(aElegir)
        aElegir = null
        /* Fuera de la notificación: elegir la pieza vuelve a notificar. */
        setTimeout(() => document.querySelector<HTMLElement>(`.odonto-embed .tooth-tile.side-view[data-tooth="${fdi}"]`)?.click())
      }
      return
    }
    if (editable) guardado = getStatusChart()
  })
}
