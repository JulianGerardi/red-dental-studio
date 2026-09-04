import { useEffect, useState } from 'react'

/* Los popovers anclados no sobreviven a una pantalla de 390px: quedan 100px
   por columna y el texto se corta. Abajo de `sm` se vuelven hoja inferior, que
   es lo que espera cualquiera en un teléfono. La decisión es de layout, no de
   estilo, así que se resuelve en JS y no con clases. */
export function useMedia(query: string) {
  const [activo, setActivo] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const cambio = () => setActivo(mq.matches)
    mq.addEventListener('change', cambio)
    setActivo(mq.matches)
    return () => mq.removeEventListener('change', cambio)
  }, [query])
  return activo
}

/** Abajo del breakpoint `sm` de Tailwind (640px). */
export const useEsChico = () => useMedia('(max-width: 639px)')
