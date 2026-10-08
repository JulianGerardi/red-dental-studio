import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect } from 'react'

/* Arrastrar sobre el gráfico de la arcada carga "Buccal PD" -o "Palatal
   PD"/"Lingual PD" en el gráfico de abajo, misma mecánica- de un trazo, en
   vez de tipear cada sitio: al apretar y mover el mouse por el dibujo, la
   altura del cursor pasa a ser la profundidad (1-15mm) del sitio que tiene
   debajo, y la curva se redibuja sola porque la librería la arma a partir
   de esos mismos inputs. Pedido por Julián con un video de referencia.
   Ver design-reference/figma/modulos/clinical-mode.md.

   Cada diente tiene 3 sitios por cara (MB/B/DB o ML/L/DL): el arrastre no
   distingue diente de sitio, sólo recorre los 48 inputs de la fila en el
   orden en que están en el DOM -que es el orden en que se ven-, así que
   cada sitio es un punto propio de la curva, igual que en el video de
   referencia.

   Los dos gráficos de una arcada (\`.perio-tooth-arch-buccal\` y
   \`.perio-tooth-arch-palatal\`) se activan igual: el aspecto ("buccal" /
   "palatal") sale del propio nombre de clase del SVG, y con eso se arma el
   selector de los inputs de esa fila -son el mismo valor que ya usa la
   librería en \`data-perio-aspect\`, así que no hay mapeo propio que
   mantener-. */

const MINIMO = 1
const MAXIMO = 15

function fijarValor(input: HTMLInputElement, valor: number) {
  if (Number(input.value) === valor) return
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, String(valor))
  input.dispatchEvent(new Event('input', { bubbles: true }))
  input.dispatchEvent(new Event('change', { bubbles: true }))
}

/* Dos puntos del propio eje mm (los números "5"/"10"/"15" que dibuja la
   librería) alcanzan para la escala real en pantalla: no hace falta saber
   nada del viewBox interno, y se ajusta solo si el gráfico cambia de alto. */
function calibrarEscala(svg: SVGSVGElement) {
  const puntos = [...svg.querySelectorAll<SVGTextElement>('.perio-mm-grid text')]
    .map((t) => {
      const r = t.getBoundingClientRect()
      return { mm: Number(t.textContent), y: r.top + r.height / 2 }
    })
    .filter((p) => Number.isFinite(p.mm))
  if (puntos.length < 2) return null
  const a = puntos[0]
  const b = puntos[puntos.length - 1]
  if (a.y === b.y) return null
  const pxPorMm = (b.y - a.y) / (b.mm - a.mm)
  return (clientY: number) => {
    const mm = a.mm + (clientY - a.y) / pxPorMm
    return Math.min(MAXIMO, Math.max(MINIMO, Math.round(mm)))
  }
}

function activar(celdaGrafico: HTMLElement) {
  if (celdaGrafico.dataset.arrastreListo) return
  celdaGrafico.dataset.arrastreListo = 'si'

  const arco = celdaGrafico.closest<HTMLElement>('.perio-fullgrid-arch')
  if (!arco) return

  let entradas: HTMLInputElement[] = []
  let aValor: ((y: number) => number) | null = null
  let indicePrevio = -1

  const indiceDesdeX = (x: number) => {
    let mejor = 0
    let distMejor = Infinity
    entradas.forEach((el, i) => {
      const r = el.getBoundingClientRect()
      const dist = Math.abs(x - (r.left + r.width / 2))
      if (dist < distMejor) { distMejor = dist; mejor = i }
    })
    return mejor
  }

  /* Si el mouse saltea sitios entre dos eventos (arrastre rápido), se
     interpola el valor entre el sitio anterior y el actual: si no, la
     curva quedaba con escalones en vez de una línea continua. */
  const trazarHasta = (indice: number, valor: number) => {
    if (indicePrevio === -1) {
      fijarValor(entradas[indice], valor)
    } else {
      const desde = indicePrevio
      const valorDesde = Number(entradas[desde].value) || valor
      const paso = indice >= desde ? 1 : -1
      for (let i = desde; ; i += paso) {
        const t = indice === desde ? 1 : (i - desde) / (indice - desde)
        fijarValor(entradas[i], Math.round(valorDesde + (valor - valorDesde) * t))
        if (i === indice) break
      }
    }
    indicePrevio = indice
  }

  const mover = (e: PointerEvent) => {
    if (!aValor || entradas.length === 0) return
    trazarHasta(indiceDesdeX(e.clientX), aValor(e.clientY))
  }

  const terminar = () => {
    indicePrevio = -1
    window.removeEventListener('pointermove', mover)
    window.removeEventListener('pointerup', terminar)
  }

  celdaGrafico.addEventListener('pointerdown', (e) => {
    const svg = celdaGrafico.querySelector<SVGSVGElement>('svg')
    const aspecto = svg?.getAttribute('class')?.match(/perio-tooth-arch-(\\w+)/)?.[1]
    entradas = aspecto
      ? [...arco.querySelectorAll<HTMLInputElement>(
        \`.perio-fullgrid-cell[data-perio-aspect="\${aspecto}"][data-perio-field="pd"] input\`,
      )]
      : []
    aValor = svg ? calibrarEscala(svg) : null
    if (entradas.length === 0 || !aValor) return
    e.preventDefault()
    indicePrevio = -1
    window.addEventListener('pointermove', mover)
    window.addEventListener('pointerup', terminar)
    mover(e)
  })
}

export function PerioPdArrastre({ raiz }: { raiz: HTMLElement | null }) {
  useEffect(() => {
    if (!raiz) return
    const revisar = () => {
      raiz.querySelectorAll<HTMLElement>('.perio-fullgrid-graphic-cell').forEach((celda) => {
        if (celda.querySelector('.perio-tooth-arch')) activar(celda)
      })
    }
    revisar()
    const observer = new MutationObserver(revisar)
    observer.observe(raiz, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [raiz])

  return null
}
`})))()}export{n,i as r,r as t};