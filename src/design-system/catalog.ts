import exentos from './exentos.json'

/* Inventario de todos los componentes de src/components, armado leyendo el
   código: qué exporta cada archivo, el comentario de diseño con el que está
   documentado, dónde se usa y si ya tiene su story. Es el "scraping" que
   mantiene la documentación completa aunque falte escribir un story. */
const fuentes = import.meta.glob(['/src/components/**/*.tsx', '!/src/**/*.stories.tsx'], {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const otros = import.meta.glob(['/src/pages/**/*.tsx', '/src/*.tsx', '!/src/**/*.stories.tsx'], {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const historias = new Set(Object.keys(import.meta.glob('/src/components/**/*.stories.tsx')))

export type Componente = {
  archivo: string
  carpeta: string
  nombre: string
  exports: string[]
  comentario: string
  usadoEn: number
  tieneStory: boolean
  /** Documentado en el story de otro componente, con el motivo. */
  exento?: string
}

function exportsDe(texto: string): string[] {
  const nombres = new Set<string>()
  for (const m of texto.matchAll(/^export (?:default )?(?:async )?(?:function|const|class) (\w+)/gm)) nombres.add(m[1])
  for (const m of texto.matchAll(/^export \{([^}]+)\}/gm)) {
    for (const n of m[1].split(',')) {
      const limpio = n.trim().split(/\s+as\s+/).pop()
      if (limpio) nombres.add(limpio)
    }
  }
  return [...nombres].filter((n) => /^[A-Z]/.test(n))
}

/* El primer comentario de bloque del archivo: es donde cada componente
   explica por qué se ve como se ve. */
function comentarioDe(texto: string): string {
  const sinImports = texto.replace(/^(?:import[^;]*?from\s+['"][^'"]+['"];?\s*|\s*\n)+/m, '')
  const m = sinImports.match(/\/\*+([\s\S]*?)\*\//)
  if (!m) return ''
  return m[1].split('\n').map((l) => l.replace(/^\s*\*?\s?/, '')).join('\n').trim()
}

const sinStories = (m: Record<string, string>) => Object.fromEntries(Object.entries(m).filter(([f]) => !f.endsWith('.stories.tsx')))
const todo = { ...sinStories(fuentes), ...sinStories(otros) }

export const componentes: Componente[] = Object.entries(sinStories(fuentes))
  .map(([archivo, texto]) => {
    const ruta = archivo.replace('/src/', '')
    const base = ruta.replace(/\.tsx$/, '').replace(/^components\//, '')
    const alias = `@/${ruta.replace(/\.tsx$/, '')}`
    const usadoEn = Object.entries(todo).filter(([otro, t]) => otro !== archivo && (t.includes(`'${alias}'`) || t.includes(`"${alias}"`) || t.includes(`from './${base.split('/').pop()}'`) && otro.startsWith(archivo.slice(0, archivo.lastIndexOf('/'))))).length
    const carpeta = base.includes('/') ? base.split('/')[0] : 'root'
    return {
      archivo: ruta,
      carpeta,
      nombre: base.split('/').pop() as string,
      exports: exportsDe(texto),
      comentario: comentarioDe(texto),
      usadoEn,
      tieneStory: historias.has(archivo.replace(/\.tsx$/, '.stories.tsx')),
      exento: (exentos as Record<string, string>)[ruta],
    }
  })
  .sort((a, b) => a.archivo.localeCompare(b.archivo))
