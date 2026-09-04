import { useState } from 'react'

/* Guarda la foto en localStorage para que sobreviva a que el componente se
   vuelva a montar -pasa en cada tab del paciente y al ir y volver de la
   ficha de un empleado-, sin necesitar un store nuevo para un solo campo. */
export function usePhoto(key: string) {
  const [foto, setFotoRaw] = useState<string | null>(() => {
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  })

  const setFoto = (dataUrl: string) => {
    setFotoRaw(dataUrl)
    try {
      localStorage.setItem(key, dataUrl)
    } catch {
      /* Cuota llena o storage bloqueado: la foto igual se ve en esta sesión. */
    }
  }

  return [foto, setFoto] as const
}
