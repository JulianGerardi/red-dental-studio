import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useContext, useEffect, useState } from 'react'
import {
  Controls, Description, DocsContext, Primary, Source, Stories, Subtitle, Title,
} from '@storybook/addon-docs/blocks'
import { comentarioDe, componentes } from './catalog'
import { Decisiones } from './decisiones'
import { Dispositivos } from './Dispositivos'

/* Página de docs de cada componente: la de Storybook más lo que faltaba, que
   es ver el código. Lee el archivo del componente y el de sus stories con
   \`?raw\`, así que siempre muestra lo que hay en el repo. */
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
  const archivoStories = (historia?.parameters?.fileName as string | undefined)?.replace(/^\\.\\//, '')
  const rutaStories = archivoStories ? \`/\${archivoStories}\` : null
  const rutaComponente = rutaStories ? rutaStories.replace(/(\\.[a-z]+)*\\.stories\\.tsx$/, '.tsx') : null

  const componente = useArchivo(rutaComponente)
  /* Páginas que documentan un componente de otro archivo (Elements / Patient
     menu → PatientSidePanel.tsx) lo indican con \`docs.decisionsFrom\`. */
  /* Puede ser más de uno: Elements / Appointment cards documenta las cuatro
     cards de turno, cada una en su archivo. */
  const decisionesDe = historia?.parameters?.docs?.decisionsFrom as string | string[] | undefined
  const archivosDeDecision = decisionesDe ? [decisionesDe].flat() : rutaComponente && componente ? [rutaComponente] : []
  const archivosDeUso = (decisionesDe ? [decisionesDe].flat() : rutaComponente ? [rutaComponente.slice(1)] : []).map((a) => a.replace(/^\\/?(src\\/)?/, ''))
  const encontrados = componentes.filter((c) => archivosDeUso.includes(c.archivo))
  const usos = encontrados.length ? [...new Set(encontrados.flatMap((c) => c.usadoPor))].sort() : undefined
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
      {historia && !historia.parameters?.docs?.devices?.disable && (
        <>
          <h2>On each device</h2>
          <p>La historia principal en el ancho real de un celular, una tablet y una computadora. Se puede usar adentro.</p>
          <Dispositivos storyId={historia.id} alto={historia.parameters?.docs?.devices?.height} />
        </>
      )}
      {usos && (
        <>
          <h2>Where it is used</h2>
          {usos.length ? (
            <>
              <p>{usos.length} {usos.length === 1 ? 'file of the app uses it' : 'files of the app use it'}, read from the code:</p>
              <ul>{usos.map((u) => <li key={u}><code>{u}</code></li>)}</ul>
            </>
          ) : (
            <p>No screen of the app uses it yet: it is only documented here.</p>
          )}
        </>
      )}
      {archivosDeDecision.length > 0 && (
        <>
          <h2>Design decisions</h2>
          <p>Por qué el componente es como es, leído de los comentarios de su código{decisionesDe && archivosDeDecision.length === 1 ? \` (\${archivosDeDecision[0]})\` : ''}: cada decisión con la línea a la que se refiere.</p>
          {archivosDeDecision.length === 1 ? (
            <Decisiones archivo={archivosDeDecision[0]!} />
          ) : (
            archivosDeDecision.map((a) => (
              <div key={a}>
                <h3><code>{a}</code></h3>
                <Decisiones archivo={a} />
              </div>
            ))
          )}
        </>
      )}
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
`})))()}export{n,i as r,r as t};