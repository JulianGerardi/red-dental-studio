import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { onStateChange } from 'react-advanced-odontogram'
import { LingualTooth } from '@/components/clinical/dental/LingualTooth'

/* Las dos filas de cara lingual/palatina, insertadas **en el medio** de la
   grilla de la librería: vestibular · oclusal · lingual — lingual · oclusal ·
   vestibular. La librería sólo dibuja vestibular y oclusal, así que lo que se
   carga en la cara lingual no se veía en ninguna parte del gráfico.

   Se inyectan celdas propias en `#toothGrid` y se dibuja adentro con
   portales. Se puede hacer porque la librería arma la grilla **una sola vez**
   (`buildGrid` en su init) y después actualiza las celdas en su lugar; si
   alguna vez la rehiciera, el observer vuelve a insertarlas.
   Ver design-reference/figma/modulos/clinical-mode.md. */

type Celda = { clave: string; numero: number | null; host: HTMLElement; flip: boolean }

const MARCA = 'data-lingual'

/* Qué hay cargado en la cara lingual de una pieza. Se lee de la **celda
   oclusal** de la librería, que es la única que dibuja esa cara: ahí viven
   `#caries-lingual` y los `#filling-…-lingual`, y se prenden/apagan con
   `display`. El resumen por diente (`getToothStateSummary`) no distingue
   superficie, así que no sirve para esto. */
function estadoLingual(raiz: HTMLElement | null, numero: number) {
  const occl = raiz?.querySelector<HTMLElement>(`.tooth-tile.occl-view[data-tooth="${numero}"]`)
  const encendido = (nodo: Element | null) => !!nodo && getComputedStyle(nodo).display !== 'none'
  const restauracion = [...(occl?.querySelectorAll('[id*="lingual"]') ?? [])]
    .some((n) => /^filling/.test(n.id) && encendido(n))
  return {
    caries: encendido(occl?.querySelector('#caries-lingual') ?? null),
    restauracion,
    /* La librería no marca la pieza ausente con una clase propia; si alguna
       vez lo hiciera, se engancha acá. */
    ausente: false,
  }
}

export function FilasLinguales({ raiz }: { raiz: HTMLElement | null }) {
  const [celdas, setCeldas] = useState<Celda[]>([])
  /* Un contador para releer el estado: los portales se redibujan solos. */
  const [version, setVersion] = useState(0)

  const insertar = useCallback(() => {
    const grid = raiz?.querySelector<HTMLElement>('#toothGrid')
    if (!grid) return
    if (grid.querySelector(`[${MARCA}]`)) return

    /* El modelo es la fila **vestibular**, no la oclusal: la oclusal deja
       celdas de relleno en los anteriores -no tienen cara oclusal- y así los
       incisivos y caninos se quedaban sin cara lingual, que sí tienen. */
    const lados = [...grid.querySelectorAll<HTMLElement>('.tooth-tile.side-view')]
    const oclusales = [...grid.querySelectorAll<HTMLElement>('.tooth-tile.occl-view')]
    if (lados.length === 0 || oclusales.length === 0) return

    const mitad = lados.length / 2
    const superiores = lados.slice(0, mitad)
    const inferiores = lados.slice(mitad)
    const finOclusalSuperior = oclusales[oclusales.length / 2 - 1]
    const inicioOclusalInferior = oclusales[oclusales.length / 2]
    if (!finOclusalSuperior || !inicioOclusalInferior) return

    const nuevas: Celda[] = []
    /* Las celdas de relleno de la librería no llevan `data-tooth`; igual hay
       que crearles una celda para no correr las columnas de la grilla. */
    const crear = (modelo: HTMLElement, flip: boolean, clave: string) => {
      const attr = modelo.getAttribute('data-tooth')
      const numero = attr ? Number(attr) : null
      const host = document.createElement('div')
      host.className = 'tooth-tile lingual-view'
      host.setAttribute(MARCA, '')
      if (numero !== null) {
        host.setAttribute('data-tooth', String(numero))
        /* Clickear la cara lingual selecciona la pieza, como cualquier celda. */
        host.addEventListener('click', () => modelo.click())
      }
      nuevas.push({ clave, numero, host, flip })
      return host
    }

    /* Arriba: después de la fila oclusal superior. Abajo: antes de la inferior. */
    /* `after` sobre un ancla fijo inserta al revés, así que la fila de
       arriba se recorre invertida; `before` respeta el orden, así que la de
       abajo va derecha. Recorrer las dos igual dejaba la inferior espejada
       respecto de sus columnas. */
    ;[...superiores].reverse().forEach((t, i) => finOclusalSuperior.after(crear(t, false, `sup-${i}`)))
    inferiores.forEach((t, i) => inicioOclusalInferior.before(crear(t, true, `inf-${i}`)))

    setCeldas(nuevas)
  }, [raiz])

  /* Insertar las celdas, y volver a hacerlo sólo si la grilla se rehace.
     El observer mira **únicamente** los hijos directos de la grilla: con
     `subtree`+`attributes` se disparaba con nuestros propios portales y
     entraba en un bucle que colgaba la página. */
  useEffect(() => {
    if (!raiz) return
    insertar()
    const grid = raiz.querySelector<HTMLElement>('#toothGrid')
    if (!grid) return
    const observer = new MutationObserver(() => insertar())
    observer.observe(grid, { childList: true })
    return () => {
      observer.disconnect()
      grid.querySelectorAll(`[${MARCA}]`).forEach((n) => n.remove())
    }
  }, [raiz, insertar])

  /* Redibujar cuando cambia el estado del odontograma: lo avisa la propia
     librería, en vez de espiar el DOM. */
  useEffect(() => {
    const baja = onStateChange(() => setVersion((v) => v + 1))
    return () => { baja?.() }
  }, [])

  /* La selección no pasa por `onStateChange`: es una clase en la celda. */
  useEffect(() => {
    if (!raiz) return
    let pedido = 0
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(pedido)
      pedido = requestAnimationFrame(() => setVersion((v) => v + 1))
    })
    observer.observe(raiz, { subtree: true, attributes: true, attributeFilter: ['class'] })
    return () => { cancelAnimationFrame(pedido); observer.disconnect() }
  }, [raiz])

  return (
    <>
      {celdas.map(({ clave, numero, host, flip }) => {
        if (numero === null) return null
        const estado = estadoLingual(raiz, numero)
        const modelo = raiz?.querySelector<HTMLElement>(`.tooth-tile.side-view[data-tooth="${numero}"]`)
        return createPortal(
          <LingualTooth
            key={`${numero}-${version}`}
            numero={numero}
            flip={flip}
            ausente={estado.ausente}
            seleccionado={!!modelo?.classList.contains('active')}
            caries={estado.caries}
            restauracion={estado.restauracion}
          />,
          host,
          clave,
        )
      })}
    </>
  )
}
