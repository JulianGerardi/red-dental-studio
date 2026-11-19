import { useEffect, useState } from 'react'

/* Estados del encuentro de CON-1612 que maneja la app: sin empezar (Planned), en curso (In progress) y en pausa (On
   hold). Lo comparten la ficha del paciente y Clinical Mode, fuera de React para que no se pierda al cambiar de pantalla
   (clinical-mode.md, 2026-11-13). */
export type EstadoEncuentro = 'sinEmpezar' | 'enCurso' | 'enPausa'

let estado: EstadoEncuentro = 'sinEmpezar'
const oyentes = new Set<() => void>()

/** Deja el encuentro en un estado (también desde Storybook). */
export function setEstadoEncuentro(v: EstadoEncuentro) {
  estado = v
  oyentes.forEach((f) => f())
}

export function useEstadoEncuentro() {
  const [, redibujar] = useState(0)
  useEffect(() => {
    const f = () => redibujar((n) => n + 1)
    oyentes.add(f)
    return () => { oyentes.delete(f) }
  }, [])
  return [estado, setEstadoEncuentro] as const
}
