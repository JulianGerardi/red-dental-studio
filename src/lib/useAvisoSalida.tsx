import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

/* Salir de una pantalla con cambios sin guardar pregunta antes, como el Edit Fee Schedule de red.dev: cualquier link de
   la app (lista, breadcrumb, menú) y los botones que llamen a `ir`. Recargar o cerrar la pestaña usa el aviso del
   navegador. Ver settings-billing.md, 2026-11-25. */
export function useAvisoSalida(sucio: boolean) {
  const navigate = useNavigate()
  const [destino, setDestino] = useState<string | null>(null)
  const sucioRef = useRef(sucio)
  useEffect(() => { sucioRef.current = sucio })

  useEffect(() => {
    const alClic = (e: MouseEvent) => {
      if (!sucioRef.current || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as HTMLElement).closest('a[href]')
      if (!a || a.getAttribute('target') === '_blank') return
      const href = a.getAttribute('href') ?? ''
      /* HashRouter dibuja "#/ruta"; BrowserRouter, "/ruta". Lo de afuera de la app no se frena. */
      const ruta = href.startsWith('#/') ? href.slice(1) : href.startsWith('/') ? href : null
      if (!ruta) return
      e.preventDefault()
      e.stopPropagation()
      setDestino(ruta)
    }
    const alSalir = (e: BeforeUnloadEvent) => { if (sucioRef.current) e.preventDefault() }
    document.addEventListener('click', alClic, true)
    window.addEventListener('beforeunload', alSalir)
    return () => {
      document.removeEventListener('click', alClic, true)
      window.removeEventListener('beforeunload', alSalir)
    }
  }, [])

  const ir = (ruta: string) => (sucio ? setDestino(ruta) : navigate(ruta))

  const dialogo = destino && (
    <ConfirmDialog
      tone="danger"
      icon="warning"
      title="Are you sure you want to leave?"
      confirmLabel="Leave without saving"
      onCancel={() => setDestino(null)}
      onConfirm={() => { sucioRef.current = false; const r = destino; setDestino(null); navigate(r) }}
    >
      You have unsaved changes. Are you sure you want to leave this page without saving them?
    </ConfirmDialog>
  )

  return { ir, dialogo }
}
