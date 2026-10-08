import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { Bloque, Lienzo, Tabla } from '@/design-system/kit'

/* Piezas para documentar un drawer de formulario con la estructura de Elements / Buttons: sus pasos (Parts), sus
   estados y sus medidas (Specs). El drawer vivo va en el Playground; acá van las tablas. */

export type PasoDoc = { nombre: string; secciones: string; obligatorios: string }

export function PasosDelDrawer({ pasos, nota }: { pasos: PasoDoc[]; nota?: string }) {
  return (
    <Lienzo>
      <Bloque titulo="Steps" nota={nota ?? 'Cada paso es un DrawerStep: los que no se ven no se desmontan y lo escrito se conserva.'}>
        <Tabla encabezado={['Step', 'Sections', 'Required to go on']} minimo={560}>
          {pasos.map((p, i) => (
            <tr key={p.nombre}>
              <td className="font-semibold whitespace-nowrap">{i + 1} · {p.nombre}</td>
              <td>{p.secciones}</td>
              <td className="text-ink-medium">{p.obligatorios}</td>
            </tr>
          ))}
        </Tabla>
      </Bloque>
      <Bloque titulo="Footer">
        <Tabla encabezado={['Where', 'Left', 'Right']} minimo={560}>
          <tr><td className="font-semibold">First step</td><td>Cancel</td><td>Next Step</td></tr>
          <tr><td className="font-semibold">Middle steps</td><td>Return</td><td>Next Step</td></tr>
          <tr><td className="font-semibold">Last step</td><td>Return</td><td>Save</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  )
}

export type EstadoDoc = { estado: string; cuando: string; story?: string }

export function EstadosDelDrawer({ estados }: { estados: EstadoDoc[] }) {
  return (
    <Lienzo>
      <Bloque titulo="States" nota="Cada uno tiene su story en esta página para verlo en vivo.">
        <Tabla encabezado={['State', 'When', 'Story']} minimo={560}>
          {estados.map((e) => (
            <tr key={e.estado}>
              <td className="font-semibold">{e.estado}</td>
              <td>{e.cuando}</td>
              <td className="text-ink-muted">{e.story ?? '—'}</td>
            </tr>
          ))}
        </Tabla>
      </Bloque>
    </Lienzo>
  )
}

export function SpecsDelDrawer({ filas, titulo = 'Specs' }: { filas: [string, string][]; titulo?: string }) {
  return (
    <Lienzo>
      <Bloque titulo={titulo} nota={titulo === 'Specs' ? 'Lo común a todos los drawers (márgenes, título, secciones sin caja, pie) está en Components / UI / Drawer.' : undefined}>
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          {filas.map(([k, v]) => (
            <tr key={k}>
              <td className="font-semibold whitespace-nowrap">{k}</td>
              <td>{v}</td>
            </tr>
          ))}
        </Tabla>
      </Bloque>
    </Lienzo>
  )
}
`})))()}export{r as n,n as r,i as t};