import { useContext, useEffect, useState } from 'react'
import {
  Controls, Description, DocsContext, Primary, Source, Stories, Subtitle, Title,
} from '@storybook/addon-docs/blocks'
import { comentarioDe } from './catalog'

/* Página de docs de cada componente: la de Storybook más lo que faltaba, que
   es ver el código. Lee el archivo del componente y el de sus stories con
   `?raw`, así que siempre muestra lo que hay en el repo. */
const archivos = import.meta.glob('/src/**/*.{ts,tsx}', { query: '?raw', import: 'default' }) as Record<
  string,
  () => Promise<string>
>

function useArchivo(ruta: string | null) {
  const [codigo, setCodigo] = useState<string | null>(null)
  useEffect(() => {
    setCodigo(null)
    if (ruta && archivos[ruta]) archivos[ruta]().then(setCodigo)
  }, [ruta])
  return codigo
}

export function DocsPage() {
  const contexto = useContext(DocsContext)
  const historia = contexto.componentStories()[0]
  const archivoStories = (historia?.parameters?.fileName as string | undefined)?.replace(/^\.\//, '')
  const rutaStories = archivoStories ? `/${archivoStories}` : null
  const rutaComponente = rutaStories ? rutaStories.replace(/(\.[a-z]+)*\.stories\.tsx$/, '.tsx') : null

  const componente = useArchivo(rutaComponente)
  const stories = useArchivo(rutaStories)
  /* Si la página ya trae su descripción (Elements), la nota del código la
     repetiría. */
  const tieneDescripcion = !!(historia?.parameters?.docs as { description?: { component?: string } } | undefined)?.description?.component
  const nota = componente && !tieneDescripcion ? comentarioDe(componente) : ''

  return (
    <>
      <Title />
      <Subtitle />
      <Description />
      {nota && (
        <>
          <h3>Design note</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{nota}</p>
        </>
      )}
      <Primary />
      <Controls />
      <Stories includePrimary={false} />
      {componente && rutaComponente && (
        <>
          <h2>Source</h2>
          <p><code>{rutaComponente.slice(1)}</code></p>
          <Source code={componente} language="tsx" />
        </>
      )}
      {stories && rutaStories && (
        <>
          <h2>Stories source</h2>
          <p><code>{rutaStories.slice(1)}</code></p>
          <Source code={stories} language="tsx" />
        </>
      )}
    </>
  )
}
