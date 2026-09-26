import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useState } from 'react'

/* Las decisiones de diseño de un componente, leídas de los comentarios de su
   archivo. En este proyecto cada decisión se explica en el código, al lado de
   lo que decide: acá se juntan todas, cada una con la línea de código a la que
   se refiere. Si alguien cambia el comentario o el código, cambia acá. */

const archivos = import.meta.glob('/src/**/*.{ts,tsx}', { query: '?raw', import: 'default' }) as Record<string, () => Promise<string>>

export type Decision = { texto: string; linea: number; codigo: string }

const RUIDO = /^(eslint|@ts-|prettier|TODO:?\\s*$|biome-ignore)/i

/* Junta los comentarios del archivo (bloques /* *\\/, {/* *\\/} y // seguidos) y
   los asocia a la primera línea de código que viene después. */
export function decisionesDe(texto: string): Decision[] {
  const lineas = texto.split('\\n')
  const salida: Decision[] = []
  let i = 0
  while (i < lineas.length) {
    const l = lineas[i]!.trim()
    let partes: string[] = []
    const inicio = i
    if (/^\\{?\\/\\*/.test(l)) {
      /* Bloque: hasta la línea que lo cierra. */
      let j = i
      while (j < lineas.length && !lineas[j]!.includes('*/')) j++
      partes = lineas.slice(i, j + 1).map((x) => x.trim().replace(/^\\{?\\/\\*+\\s?/, '').replace(/\\s?\\*+\\/\\}?.*$/, '').replace(/^\\*\\s?/, ''))
      i = j + 1
    } else if (/^\\/\\/(?!\\/)/.test(l)) {
      let j = i
      for (; j < lineas.length && /^\\/\\//.test(lineas[j]!.trim()); j++) partes.push(lineas[j]!.trim().replace(/^\\/\\/\\s?/, ''))
      i = j
    } else {
      i++
      continue
    }
    const textoLimpio = partes.join(' ').replace(/\\s+/g, ' ').trim()
    if (!textoLimpio || textoLimpio.length < 25 || RUIDO.test(textoLimpio)) continue
    /* Primera línea de código después del comentario. */
    let k = i
    while (k < lineas.length && (!lineas[k]!.trim() || /^(\\{?\\/\\*|\\*|\\/\\/)/.test(lineas[k]!.trim()))) k++
    salida.push({ texto: textoLimpio, linea: inicio + 1, codigo: (lineas[k] ?? '').trim().slice(0, 140) })
  }
  return salida
}

export function useDecisiones(ruta: string | null) {
  const [d, setD] = useState<Decision[] | null>(null)
  useEffect(() => {
    let vivo = true
    const clave = ruta && (ruta.startsWith('/') ? ruta : \`/src/\${ruta}\`)
    if (clave && archivos[clave]) archivos[clave]().then((t) => vivo && setD(decisionesDe(t)))
    else setD([])
    return () => {
      vivo = false
    }
  }, [ruta])
  return d
}

/* Lista de decisiones de un archivo. */
export function Decisiones({ archivo, max }: { archivo: string; max?: number }) {
  const d = useDecisiones(archivo)
  if (!d) return <p style={{ color: '#71717a', fontSize: 13 }}>Loading…</p>
  if (!d.length) return <p style={{ color: '#71717a', fontSize: 13 }}>Este archivo no tiene decisiones escritas en comentarios.</p>
  const lista = max ? d.slice(0, max) : d
  return (
    <ol className="m-0 flex list-none flex-col gap-2 p-0 font-sans">
      {lista.map((x, i) => (
        <li key={\`\${x.linea}-\${i}\`} className="rounded-lg border border-line-row bg-white px-4 py-3">
          <p className="m-0 text-[13px] leading-relaxed text-ink">{x.texto}</p>
          {x.codigo && (
            <p className="m-0 mt-1.5 truncate font-mono text-[11px] text-ink-muted" title={x.codigo}>
              <span className="text-ink-faint">line {x.linea} · </span>{x.codigo}
            </p>
          )}
        </li>
      ))}
      {max && d.length > max && <li className="text-[12px] text-ink-muted">+ {d.length - max} more in the file.</li>}
    </ol>
  )
}
`})))()}export{n,i as r,r as t};