import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./utils-D-bRdWGo.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";import{h as i,m as a}from"./estilos-CE-FcrPI.js";import{a as o,c as s,d as c,g as l,h as u,i as d,l as f,p,t as m,u as h}from"./kit-CWUgB5-0.js";import{o as g,s as _,t as v}from"./DashboardRows-DSrehd30.js";import{d as y,r as b}from"./dashboard-data-DbinSGmv.js";import{n as x,r as S,t as C}from"./list-group-DiRjaUGU.js";function w(){let{ref:e,m:t}=p(`p`);return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(`div`,{ref:e,className:`max-w-[400px]`,children:(0,T.jsx)(x,{title:`Scheduled`,tone:`info`,children:E(1)})}),(0,T.jsx)(s,{encabezado:[`Part`,`Text`,`Height`],minimo:420,children:(0,T.jsxs)(`tr`,{children:[(0,T.jsx)(`td`,{className:`font-semibold`,children:`Label`}),(0,T.jsxs)(`td`,{className:`tabular-nums`,children:[t?.texto,` · `,t?.peso]}),(0,T.jsx)(`td`,{className:`tabular-nums`,children:t?.alto})]})})]})}var T,E,D,O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{S(),_(),y(),c(),u(),i(),t(),T=r(),E=e=>b.appointments.filter(e=>!e.completado).slice(0,e).map((e,t)=>(0,T.jsx)(v,{appt:e},t)),D=e=>b.appointments.filter(e=>e.completado).slice(0,e).map((e,t)=>(0,T.jsx)(v,{appt:e},t)),O=e=>b.tasks.slice(0,e).map((e,t)=>(0,T.jsx)(g,{task:e},t)),k={title:`Elements/List group`,parameters:{layout:`padded`,docs:{description:{component:['Una lista larga adentro de una card, en grupos (`@/components/ui/list-group`): rótulo en versalitas con la cuenta, las filas en una caja de línea fina y, si hace falta, **plegable** y con **tope** ("Show 12 more"). Es lo que ordena un panel con mucho: en lugar de cuarenta cards una debajo de la otra, grupos con lo que ya dicen los datos (Scheduled y Completed; el tipo de tarea).',``,`**Cuándo usarlo:** una lista de más de ~6 ítems adentro de un panel. Sin título es sólo la lista (la Waiting Room). Generaliza el agrupado de *Pending documents* (Patient Dashboard).`,``,`**Probalo:** en *Playground* cambiá la cantidad de filas, el tope y el tono desde *Controls*; tocá el rótulo si es plegable y "Show N more".`].join(`
`)}}},args:{title:`Scheduled`,tone:`info`,items:8,collapsible:!1,limit:5},argTypes:{title:{control:`text`,description:`El nombre del grupo, en versalitas con la cuenta. Vacío, es sólo la lista.`},tone:{control:`inline-radio`,options:Object.keys(C),description:`Color del rótulo: azul para lo que sigue, gris para el resto.`},items:{control:{type:`range`,min:0,max:20},description:`Cuántas filas tiene. Con 0 el grupo no se dibuja.`},collapsible:{control:`boolean`,description:`El rótulo pliega y despliega el grupo.`},limit:{control:{type:`range`,min:0,max:12},description:`Cuántas filas se ven antes de "Show N more". 0 = sin tope.`}}},A={controls:{disable:!0}},j={render:e=>(0,T.jsx)(`div`,{className:n(a,`max-w-[420px] p-4`),children:(0,T.jsx)(x,{title:e.title||void 0,tone:e.tone,collapsible:e.collapsible,limit:e.limit||void 0,children:E(e.items)},`${e.collapsible}-${e.limit}`)})},M={parameters:A,render:()=>(0,T.jsxs)(d,{children:[(0,T.jsx)(m,{nota:`Rótulo arriba, filas en una caja de línea fina (shadow-hairline) separadas por una línea más tenue, y el pie con el tope.`,children:(0,T.jsx)(`div`,{className:n(a,`max-w-[420px] p-4`),children:(0,T.jsx)(x,{title:`Scheduled`,tone:`info`,limit:3,children:E(6)})})}),(0,T.jsx)(f,{partes:[[`Label`,`Nombre del grupo y su cuenta, 11px Semibold en versalitas, en el color del tono. Plegable: lleva un chevron y es un botón con aria-expanded. Sin título, no hay rótulo.`,`ListGroup title · tone · collapsible`],[`Rows`,`Cada hijo es una fila (un <li>). La caja es blanca con línea de medio pixel; entre filas, line-soft.`,`children`],[`Show more`,`Con tope, el resto queda detrás de "Show N more"; abierto, "Show less".`,`limit`]]})]})},N={parameters:A,render:()=>(0,T.jsx)(d,{children:(0,T.jsxs)(`div`,{className:`grid gap-6 md:grid-cols-2`,children:[(0,T.jsx)(o,{titulo:`With limit`,nota:`Las primeras 3 y el resto detrás de Show N more.`,children:(0,T.jsx)(`div`,{className:n(a,`p-4`),children:(0,T.jsx)(x,{title:`Scheduled`,tone:`info`,limit:3,children:E(7)})})}),(0,T.jsx)(o,{titulo:`Collapsed`,nota:`Completed arranca plegado: ya pasó, se consulta poco.`,children:(0,T.jsx)(`div`,{className:n(a,`p-4`),children:(0,T.jsx)(x,{title:`Completed`,collapsible:!0,defaultOpen:!1,children:D(4)})})}),(0,T.jsx)(o,{titulo:`Collapsible, open`,children:(0,T.jsx)(`div`,{className:n(a,`p-4`),children:(0,T.jsx)(x,{title:`Completed`,collapsible:!0,children:D(2)})})}),(0,T.jsx)(o,{titulo:`No title`,nota:`Sólo la lista: la Waiting Room, que ya tiene el título del panel.`,children:(0,T.jsx)(`div`,{className:n(a,`p-4`),children:(0,T.jsx)(x,{children:E(2)})})}),(0,T.jsx)(o,{titulo:`Sticky label in a scrolling panel`,nota:`Scrolleá: el rótulo de cada grupo queda pegado arriba mientras pasan sus filas.`,children:(0,T.jsx)(`div`,{className:n(a,`h-[300px] overflow-y-auto p-4`),children:(0,T.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,T.jsx)(x,{title:`Clinical Note`,sticky:!0,children:O(3)}),(0,T.jsx)(x,{title:`Lab Orders`,sticky:!0,children:b.tasks.slice(7,10).map((e,t)=>(0,T.jsx)(g,{task:e},t))})]})})}),(0,T.jsx)(o,{titulo:`Empty`,nota:`Un grupo sin filas no se dibuja; el panel muestra su EmptyState.`,children:(0,T.jsxs)(`div`,{className:n(a,`p-4 text-[12px] text-ink-muted`),children:[(0,T.jsx)(x,{title:`Completed`}),`(nothing drawn)`]})})]})})},P={parameters:A,render:()=>(0,T.jsxs)(d,{children:[(0,T.jsx)(m,{titulo:`Size`,nota:`Leído del rótulo dibujado. Entre el rótulo y la caja, 6px; entre grupos, el gap del panel (16px).`,children:(0,T.jsx)(w,{})}),(0,T.jsx)(m,{titulo:`Tones`,nota:`De LIST_GROUP_TONES (list-group.tsx) y src/index.css.`,children:(0,T.jsx)(s,{encabezado:[`Tone`,`Use`,`Text`],minimo:560,children:Object.keys(C).map(e=>(0,T.jsxs)(`tr`,{children:[(0,T.jsx)(`td`,{className:`font-semibold`,children:e}),(0,T.jsx)(`td`,{className:`text-ink-medium`,children:{default:`Completed, task types`,info:`Scheduled`}[e]}),(0,T.jsx)(`td`,{children:(0,T.jsx)(h,{nombre:l(C[e]).texto})})]},e))})})]})},F=[`Playground`,`Parts`,`States`,`Specs`],j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: a => <div className={cn(TARJETA_PANEL, 'max-w-[420px] p-4')}>
      <ListGroup key={\`\${a.collapsible}-\${a.limit}\`} title={a.title || undefined} tone={a.tone} collapsible={a.collapsible} limit={a.limit || undefined}>
        {turnos(a.items)}
      </ListGroup>
    </div>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque nota="Rótulo arriba, filas en una caja de línea fina (shadow-hairline) separadas por una línea más tenue, y el pie con el tope.">
        <div className={cn(TARJETA_PANEL, 'max-w-[420px] p-4')}>
          <ListGroup title="Scheduled" tone="info" limit={3}>{turnos(6)}</ListGroup>
        </div>
      </Bloque>
      <TablaPartes partes={[['Label', 'Nombre del grupo y su cuenta, 11px Semibold en versalitas, en el color del tono. Plegable: lleva un chevron y es un botón con aria-expanded. Sin título, no hay rótulo.', 'ListGroup title · tone · collapsible'], ['Rows', 'Cada hijo es una fila (un <li>). La caja es blanca con línea de medio pixel; entre filas, line-soft.', 'children'], ['Show more', 'Con tope, el resto queda detrás de "Show N more"; abierto, "Show less".', 'limit']]} />
    </Lienzo>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="With limit" nota="Las primeras 3 y el resto detrás de Show N more.">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ListGroup title="Scheduled" tone="info" limit={3}>{turnos(7)}</ListGroup></div>
        </Muestra>
        <Muestra titulo="Collapsed" nota="Completed arranca plegado: ya pasó, se consulta poco.">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ListGroup title="Completed" collapsible defaultOpen={false}>{hechos(4)}</ListGroup></div>
        </Muestra>
        <Muestra titulo="Collapsible, open">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ListGroup title="Completed" collapsible>{hechos(2)}</ListGroup></div>
        </Muestra>
        <Muestra titulo="No title" nota="Sólo la lista: la Waiting Room, que ya tiene el título del panel.">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ListGroup>{turnos(2)}</ListGroup></div>
        </Muestra>
        <Muestra titulo="Sticky label in a scrolling panel" nota="Scrolleá: el rótulo de cada grupo queda pegado arriba mientras pasan sus filas.">
          <div className={cn(TARJETA_PANEL, 'h-[300px] overflow-y-auto p-4')}>
            <div className="flex flex-col gap-4">
              <ListGroup title="Clinical Note" sticky>{tareas(3)}</ListGroup>
              <ListGroup title="Lab Orders" sticky>{DIA_CARGADO.tasks.slice(7, 10).map((t, i) => <TaskRow key={i} task={t} />)}</ListGroup>
            </div>
          </div>
        </Muestra>
        <Muestra titulo="Empty" nota="Un grupo sin filas no se dibuja; el panel muestra su EmptyState.">
          <div className={cn(TARJETA_PANEL, 'p-4 text-[12px] text-ink-muted')}>
            <ListGroup title="Completed" />
            (nothing drawn)
          </div>
        </Muestra>
      </div>
    </Lienzo>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Size" nota="Leído del rótulo dibujado. Entre el rótulo y la caja, 6px; entre grupos, el gap del panel (16px).">
        <MedidaRotulo />
      </Bloque>
      <Bloque titulo="Tones" nota="De LIST_GROUP_TONES (list-group.tsx) y src/index.css.">
        <Tabla encabezado={['Tone', 'Use', 'Text']} minimo={560}>
          {(Object.keys(LIST_GROUP_TONES) as ListGroupTone[]).map(t => <tr key={t}>
              <td className="font-semibold">{t}</td>
              <td className="text-ink-medium">{{
              default: 'Completed, task types',
              info: 'Scheduled'
            }[t]}</td>
              <td><Token nombre={tokensDe(LIST_GROUP_TONES[t]).texto} /></td>
            </tr>)}
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...P.parameters?.docs?.source}}}})))()}I();export{M as Parts,j as Playground,P as Specs,N as States,F as __namedExportsOrder,k as default};