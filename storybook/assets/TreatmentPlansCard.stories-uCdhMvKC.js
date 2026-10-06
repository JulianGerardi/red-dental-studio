import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,r,s as i,u as a}from"./TreatmentPanel-LZ04w82u.js";import{a as o,i as s,n as c,r as l}from"./play-CDw6varG.js";import{a as u,c as d,i as f,l as p,n as m,s as h,t as g}from"./kit-VhBMbBcY.js";import{t as _,u as v}from"./treatment-plan-C_EmF93Q.js";var y,b,x,S,C,w,T,E,D,O,k;function A(){return(A=e((()=>{a(),v(),p(),l(),y=t(),b=_.filter(e=>e.estado!==`Discarded`).slice(0,3),x=[[`tarjetas`,`A · Cards`,`La publicada. Planes plegables; cada procedimiento en una tarjeta chica con borde verde, pill de estado, código, nombre, pieza, superficie y proveedor.`],[`progreso`,`B · Progress per plan`,`Misma lógica que A. Cada plan en su caja con estado, barra de avance, hechos/total y monto; los procedimientos encabezados por la pieza.`],[`recorrido`,`C · Timeline by visit`,`Un plan a la vez con flechas. Avance en tramos (uno por procedimiento) y los procedimientos en línea de tiempo por visita, con la fecha del turno.`]],S={title:`Components/Clinical/Treatment plans card`,component:i,parameters:{layout:`padded`,docs:{decisionsFrom:`components/clinical/TreatmentPanel.tsx`,description:{component:[`La card *Treatment plans* de la columna derecha de Treatment, en Clinical Mode: los planes del paciente (los tres primeros sin descartar) con el detalle de cada procedimiento.`,``,`**Opciones:** A es la que está publicada; B y C son las propuestas nuevas, con el mismo detalle por procedimiento (estado, código, nombre, pieza, superficie, proveedor y menú). Julián elige.`,``,`**Probalo:** en *Playground* cambiá la opción desde *Controls*; abrí y cerrá planes o pasá de plan con las flechas.`].join(`
`)}}},args:{variante:`tarjetas`},argTypes:{variante:{control:`inline-radio`,options:[`tarjetas`,`progreso`,`recorrido`],description:`tarjetas (A, la publicada) · progreso (B) · recorrido (C).`}}},C={render:({variante:e})=>(0,y.jsx)(`div`,{className:`w-[311px]`,children:(0,y.jsx)(i,{variante:e},e)})},w={parameters:{controls:{disable:!0}},render:()=>(0,y.jsx)(f,{className:`max-w-none`,children:(0,y.jsx)(`div`,{className:`flex flex-wrap items-start gap-6`,children:x.map(([e,t,n])=>(0,y.jsxs)(`div`,{className:`flex w-[311px] flex-col gap-2`,children:[(0,y.jsx)(`p`,{className:`text-[13px] font-semibold text-ink`,children:t}),(0,y.jsx)(`p`,{className:`min-h-[54px] text-[12px] leading-snug text-ink-muted`,children:n}),(0,y.jsx)(i,{variante:e})]},e))})})},T={parameters:{controls:{disable:!0}},render:()=>(0,y.jsx)(f,{children:(0,y.jsx)(g,{titulo:`What every option shows`,nota:`Lo mismo en A, B y C: cambia cómo se ordena, no qué se ve.`,children:(0,y.jsxs)(h,{encabezado:[`Part`,`A`,`B`,`C`],minimo:760,children:[(0,y.jsxs)(`tr`,{children:[(0,y.jsx)(`td`,{className:`font-semibold`,children:`Plan`}),(0,y.jsx)(`td`,{children:`Nombre, plegable`}),(0,y.jsx)(`td`,{children:`Caja con nombre y estado del caso, plegable`}),(0,y.jsx)(`td`,{children:`Nombre con flechas y "Plan 1 of 3"`})]}),(0,y.jsxs)(`tr`,{children:[(0,y.jsx)(`td`,{className:`font-semibold`,children:`Progress`}),(0,y.jsx)(`td`,{children:`—`}),(0,y.jsx)(`td`,{children:`Barra, hechos/total y monto`}),(0,y.jsx)(`td`,{children:`Tramos por procedimiento, "x of y completed" y monto`})]}),(0,y.jsxs)(`tr`,{children:[(0,y.jsx)(`td`,{className:`font-semibold`,children:`Procedure`}),(0,y.jsx)(`td`,{children:`Pill de estado, código: nombre`}),(0,y.jsx)(`td`,{children:`Pieza destacada, código: nombre, punto de estado`}),(0,y.jsx)(`td`,{children:`Punto en la línea, código: nombre, pill de estado`})]}),(0,y.jsxs)(`tr`,{children:[(0,y.jsx)(`td`,{className:`font-semibold`,children:`Details`}),(0,y.jsx)(`td`,{colSpan:3,children:`Tooth, Surface y Provider en todas.`})]}),(0,y.jsxs)(`tr`,{children:[(0,y.jsx)(`td`,{className:`font-semibold`,children:`Menu`}),(0,y.jsx)(`td`,{colSpan:3,children:`⋮ con Open in Treatment Plan.`})]}),(0,y.jsxs)(`tr`,{children:[(0,y.jsx)(`td`,{className:`font-semibold`,children:`More`}),(0,y.jsx)(`td`,{children:`Los 3 primeros`}),(0,y.jsx)(`td`,{children:`Los 3 primeros y "See all N procedures"`}),(0,y.jsx)(`td`,{children:`Los 4 primeros por visita y "See all N procedures"`})]})]})})})},E={parameters:{controls:{disable:!0}},render:()=>(0,y.jsxs)(f,{className:`max-w-none`,children:[(0,y.jsx)(g,{titulo:`B · Expanded and collapsed`,nota:`El primer plan abre expandido; los demás plegados muestran igual estado, avance y monto.`,children:(0,y.jsx)(`div`,{className:`w-[279px]`,children:(0,y.jsx)(r,{casos:b})})}),(0,y.jsx)(g,{titulo:`C · First and last plan`,nota:`En el primero la flecha de atrás queda disabled; en el último, la de adelante.`,children:(0,y.jsxs)(u,{children:[(0,y.jsx)(m,{rotulo:`First plan`,children:(0,y.jsx)(`div`,{className:`w-[279px]`,children:(0,y.jsx)(n,{casos:b,tope:2})})}),(0,y.jsx)(m,{rotulo:`Last plan`,children:(0,y.jsx)(`div`,{className:`w-[279px]`,children:(0,y.jsx)(n,{casos:b.slice(-1),tope:2})})})]})})]})},D={args:{variante:`recorrido`},render:({variante:e})=>(0,y.jsx)(`div`,{className:`w-[311px]`,children:(0,y.jsx)(i,{variante:e})}),play:o(s(/^next plan$/i),c(/plan 2 of 3/i))},O={parameters:{controls:{disable:!0}},render:()=>(0,y.jsxs)(f,{children:[(0,y.jsx)(g,{titulo:`Measures`,children:(0,y.jsxs)(h,{encabezado:[`Piece`,`Value`],children:[(0,y.jsxs)(`tr`,{children:[(0,y.jsx)(`td`,{className:`font-semibold`,children:`Card`}),(0,y.jsx)(`td`,{className:`tabular-nums`,children:`311px (la columna derecha de Treatment), padding 16px, radio 12px`})]}),(0,y.jsxs)(`tr`,{children:[(0,y.jsx)(`td`,{className:`font-semibold`,children:`Title`}),(0,y.jsx)(`td`,{className:`tabular-nums`,children:`15px Bold`})]}),(0,y.jsxs)(`tr`,{children:[(0,y.jsx)(`td`,{className:`font-semibold`,children:`Procedure name`}),(0,y.jsx)(`td`,{className:`tabular-nums`,children:`12px, código en Semibold`})]}),(0,y.jsxs)(`tr`,{children:[(0,y.jsx)(`td`,{className:`font-semibold`,children:`Details`}),(0,y.jsx)(`td`,{className:`tabular-nums`,children:`10px, rótulo en Semibold`})]}),(0,y.jsxs)(`tr`,{children:[(0,y.jsx)(`td`,{className:`font-semibold`,children:`B · Tooth badge`}),(0,y.jsx)(`td`,{className:`tabular-nums`,children:`36 × 36px, "TOOTH" 8px y número 13px Bold`})]}),(0,y.jsxs)(`tr`,{children:[(0,y.jsx)(`td`,{className:`font-semibold`,children:`Progress bar`}),(0,y.jsx)(`td`,{className:`tabular-nums`,children:`6px de alto`})]})]})}),(0,y.jsx)(g,{titulo:`Status colors`,nota:`Los del punto y la barra; la pill usa los tonos de Elements / Pills.`,children:(0,y.jsxs)(h,{encabezado:[`Procedure status`,`Dot`,`Progress`],children:[(0,y.jsxs)(`tr`,{children:[(0,y.jsx)(`td`,{className:`font-semibold`,children:`Planned`}),(0,y.jsx)(`td`,{children:(0,y.jsx)(d,{nombre:`status-ok`})}),(0,y.jsx)(`td`,{children:(0,y.jsx)(d,{nombre:`line`})})]}),(0,y.jsxs)(`tr`,{children:[(0,y.jsx)(`td`,{className:`font-semibold`,children:`Completed`}),(0,y.jsx)(`td`,{children:(0,y.jsx)(d,{nombre:`dash-busy-fg`})}),(0,y.jsx)(`td`,{children:(0,y.jsx)(d,{nombre:`dash-busy-fg`})})]}),(0,y.jsxs)(`tr`,{children:[(0,y.jsx)(`td`,{className:`font-semibold`,children:`Removed`}),(0,y.jsx)(`td`,{children:(0,y.jsx)(d,{nombre:`ink-faint`})}),(0,y.jsx)(`td`,{children:(0,y.jsx)(d,{nombre:`line-soft`})})]})]})})]})},k=[`Playground`,`Options`,`Parts`,`States`,`TimelineNextPlan`,`Specs`],C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: ({
    variante
  }) => <div className="w-[311px]"><TreatmentPlansCard key={variante} variante={variante} /></div>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo className="max-w-none">
      <div className="flex flex-wrap items-start gap-6">
        {OPCIONES.map(([v, rotulo, nota]) => <div key={v} className="flex w-[311px] flex-col gap-2">
            <p className="text-[13px] font-semibold text-ink">{rotulo}</p>
            <p className="min-h-[54px] text-[12px] leading-snug text-ink-muted">{nota}</p>
            <TreatmentPlansCard variante={v} />
          </div>)}
      </div>
    </Lienzo>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="What every option shows" nota="Lo mismo en A, B y C: cambia cómo se ordena, no qué se ve.">
        <Tabla encabezado={['Part', 'A', 'B', 'C']} minimo={760}>
          <tr><td className="font-semibold">Plan</td><td>Nombre, plegable</td><td>Caja con nombre y estado del caso, plegable</td><td>Nombre con flechas y "Plan 1 of 3"</td></tr>
          <tr><td className="font-semibold">Progress</td><td>—</td><td>Barra, hechos/total y monto</td><td>Tramos por procedimiento, "x of y completed" y monto</td></tr>
          <tr><td className="font-semibold">Procedure</td><td>Pill de estado, código: nombre</td><td>Pieza destacada, código: nombre, punto de estado</td><td>Punto en la línea, código: nombre, pill de estado</td></tr>
          <tr><td className="font-semibold">Details</td><td colSpan={3}>Tooth, Surface y Provider en todas.</td></tr>
          <tr><td className="font-semibold">Menu</td><td colSpan={3}>⋮ con Open in Treatment Plan.</td></tr>
          <tr><td className="font-semibold">More</td><td>Los 3 primeros</td><td>Los 3 primeros y "See all N procedures"</td><td>Los 4 primeros por visita y "See all N procedures"</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo className="max-w-none">
      <Bloque titulo="B · Expanded and collapsed" nota="El primer plan abre expandido; los demás plegados muestran igual estado, avance y monto.">
        <div className="w-[279px]"><PlanProgressList casos={PLANES} /></div>
      </Bloque>
      <Bloque titulo="C · First and last plan" nota="En el primero la flecha de atrás queda disabled; en el último, la de adelante.">
        <Muestras>
          <ConRotulo rotulo="First plan"><div className="w-[279px]"><PlanTimeline casos={PLANES} tope={2} /></div></ConRotulo>
          <ConRotulo rotulo="Last plan"><div className="w-[279px]"><PlanTimeline casos={PLANES.slice(-1)} tope={2} /></div></ConRotulo>
        </Muestras>
      </Bloque>
    </Lienzo>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    variante: 'recorrido'
  },
  render: ({
    variante
  }) => <div className="w-[311px]"><TreatmentPlansCard variante={variante} /></div>,
  play: secuencia(pulsar(/^next plan$/i), esperar(/plan 2 of 3/i))
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Measures">
        <Tabla encabezado={['Piece', 'Value']}>
          <tr><td className="font-semibold">Card</td><td className="tabular-nums">311px (la columna derecha de Treatment), padding 16px, radio 12px</td></tr>
          <tr><td className="font-semibold">Title</td><td className="tabular-nums">15px Bold</td></tr>
          <tr><td className="font-semibold">Procedure name</td><td className="tabular-nums">12px, código en Semibold</td></tr>
          <tr><td className="font-semibold">Details</td><td className="tabular-nums">10px, rótulo en Semibold</td></tr>
          <tr><td className="font-semibold">B · Tooth badge</td><td className="tabular-nums">36 × 36px, "TOOTH" 8px y número 13px Bold</td></tr>
          <tr><td className="font-semibold">Progress bar</td><td className="tabular-nums">6px de alto</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Status colors" nota="Los del punto y la barra; la pill usa los tonos de Elements / Pills.">
        <Tabla encabezado={['Procedure status', 'Dot', 'Progress']}>
          <tr><td className="font-semibold">Planned</td><td><Token nombre="status-ok" /></td><td><Token nombre="line" /></td></tr>
          <tr><td className="font-semibold">Completed</td><td><Token nombre="dash-busy-fg" /></td><td><Token nombre="dash-busy-fg" /></td></tr>
          <tr><td className="font-semibold">Removed</td><td><Token nombre="ink-faint" /></td><td><Token nombre="line-soft" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...O.parameters?.docs?.source}}}})))()}A();export{w as Options,T as Parts,C as Playground,O as Specs,E as States,D as TimelineNextPlan,k as __namedExportsOrder,S as default};