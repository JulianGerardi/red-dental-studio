import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./utils-D-bRdWGo.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";import{h as i,m as a}from"./estilos-CE-FcrPI.js";import{a as o,c as s,d as c,g as l,h as u,i as d,l as f,p,r as m,t as h,u as g}from"./kit-CWUgB5-0.js";import{a as _,i as v,t as y}from"./DashboardRows-Cywouly_.js";import{d as b,r as x}from"./dashboard-data-CcyXyNkI.js";import{n as S,r as C,t as w}from"./list-group-DAN8ErZT.js";function T(){let{ref:e,m:t}=p(`p`);return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(`div`,{ref:e,className:`max-w-[400px]`,children:(0,E.jsx)(S,{title:`Appointments`,children:D(1)})}),(0,E.jsx)(s,{encabezado:[`Part`,`Text`,`Height`],minimo:420,children:(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{className:`font-semibold`,children:`Label`}),(0,E.jsxs)(`td`,{className:`tabular-nums`,children:[t?.texto,` · `,t?.peso]}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:t?.alto})]})})]})}var E,D,O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{C(),_(),b(),c(),u(),i(),t(),E=r(),D=e=>x.appointments.slice(0,e).map((e,t)=>(0,E.jsx)(y,{appt:e},t)),O=e=>x.tasks.slice(0,e).map((e,t)=>(0,E.jsx)(v,{task:e},t)),k={title:`Elements/List group`,parameters:{layout:`padded`,docs:{description:{component:['Filas adentro de una card (`@/components/ui/list-group`), **cada una en su card interna** (línea fina y sombra suave, `TARJETA_INTERNA`) y separadas, con rótulo opcional y el tope de *Show more*: se ven las primeras y **"Show N more" abre el resto con scroll**, sin estirar la página. Es lo que usan los turnos, la sala de espera y las tareas del Dashboard y las tareas del Patient Dashboard. Cards y no una caja con divisores: así siguen el lenguaje de las demás cards (las salas, los turnos del paciente).',``,`**Cuándo usarlo:** una lista de filas (no de cards sueltas) que puede crecer. Sin título es sólo la lista, debajo del título del panel. Para cards en grilla o en columna, *Show more* directo.`,``,`**Probalo:** en *Playground* cambiá la cantidad de filas, el tope y el tono desde *Controls*; tocá "Show N more" y scrolleá.`].join(`
`)}}},args:{title:``,tone:`default`,items:12,collapsible:!1,limit:5},argTypes:{title:{control:`text`,description:`Nombre del grupo, en versalitas con la cuenta. Vacío, es sólo la lista.`},tone:{control:`inline-radio`,options:Object.keys(w),description:`Color del rótulo.`},items:{control:{type:`range`,min:0,max:30},description:`Cuántas filas tiene. Con 0 no se dibuja.`},collapsible:{control:`boolean`,description:`El rótulo pliega y despliega el grupo (con título).`},limit:{control:{type:`range`,min:0,max:12},description:`Cuántas filas se ven antes de "Show N more". 0 = sin tope.`}}},A={controls:{disable:!0}},j={render:e=>(0,E.jsx)(`div`,{className:n(a,`max-w-[420px] p-4`),children:(0,E.jsx)(S,{title:e.title||void 0,tone:e.tone,collapsible:e.collapsible,limit:e.limit||void 0,label:`appointments`,children:D(e.items)},`${e.collapsible}-${e.limit}-${e.items}`)})},M={parameters:A,render:()=>(0,E.jsxs)(d,{children:[(0,E.jsx)(h,{nota:`Rótulo (opcional), cada fila en su card interna con 12px entre una y otra, y Show N more.`,children:(0,E.jsx)(`div`,{className:n(a,`max-w-[420px] p-4`),children:(0,E.jsx)(S,{title:`Appointments`,limit:3,label:`appointments`,children:D(8)})})}),(0,E.jsx)(f,{partes:[[`Label`,`Opcional. Nombre y cuenta en 11px Semibold versalitas, en el color del tono; plegable con chevron y aria-expanded.`,`title · tone · collapsible`],[`Rows`,`Cada hijo es una fila (un <li>) en su card interna: blanca, línea de medio pixel y sombra suave (shadow-inner-card), radio 8px; 12px entre cards.`,`children · TARJETA_INTERNA`],[`Show more`,`El tope y el scroll de Elements / Show more.`,`limit · maxHeight · label`]]})]})},N={parameters:A,render:()=>(0,E.jsx)(d,{children:(0,E.jsxs)(`div`,{className:`grid gap-6 md:grid-cols-2`,children:[(0,E.jsx)(o,{titulo:`With limit, closed`,nota:`Las primeras 5 y el botón con cuántas faltan.`,children:(0,E.jsx)(`div`,{className:n(a,`p-4`),children:(0,E.jsx)(S,{limit:5,label:`appointments`,children:D(12)})})}),(0,E.jsx)(o,{titulo:`With limit, open`,nota:`Todas, con scroll adentro.`,children:(0,E.jsx)(m,{selector:`[data-show-more]`,estado:`click`,className:n(a,`p-4`),children:(0,E.jsx)(S,{limit:5,label:`appointments`,children:D(12)})})}),(0,E.jsx)(o,{titulo:`Task rows`,nota:`Pending Task del Dashboard y del Patient Dashboard.`,children:(0,E.jsx)(`div`,{className:n(a,`p-4`),children:(0,E.jsx)(S,{limit:3,label:`pending tasks`,children:O(6)})})}),(0,E.jsx)(o,{titulo:`With title, collapsed`,children:(0,E.jsx)(`div`,{className:n(a,`p-4`),children:(0,E.jsx)(S,{title:`Appointments`,collapsible:!0,defaultOpen:!1,children:D(4)})})}),(0,E.jsx)(o,{titulo:`Empty`,nota:`Sin filas no se dibuja; el panel muestra su EmptyState.`,children:(0,E.jsxs)(`div`,{className:n(a,`p-4 text-[12px] text-ink-muted`),children:[(0,E.jsx)(S,{title:`Appointments`}),`(nothing drawn)`]})})]})})},P={parameters:A,render:()=>(0,E.jsxs)(d,{children:[(0,E.jsx)(h,{titulo:`Size`,nota:`Leído del rótulo dibujado. Entre el rótulo y la primera card, 6px; entre cards, 12px.`,children:(0,E.jsx)(T,{})}),(0,E.jsx)(h,{titulo:`Tones`,nota:`De LIST_GROUP_TONES (list-group.tsx) y src/index.css.`,children:(0,E.jsx)(s,{encabezado:[`Tone`,`Text`],minimo:420,children:Object.keys(w).map(e=>(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{className:`font-semibold`,children:e}),(0,E.jsx)(`td`,{children:(0,E.jsx)(g,{nombre:l(w[e]).texto})})]},e))})})]})},F=[`Playground`,`Parts`,`States`,`Specs`],j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: a => <div className={cn(TARJETA_PANEL, 'max-w-[420px] p-4')}>
      <ListGroup key={\`\${a.collapsible}-\${a.limit}-\${a.items}\`} title={a.title || undefined} tone={a.tone} collapsible={a.collapsible} limit={a.limit || undefined} label="appointments">
        {turnos(a.items)}
      </ListGroup>
    </div>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque nota="Rótulo (opcional), cada fila en su card interna con 12px entre una y otra, y Show N more.">
        <div className={cn(TARJETA_PANEL, 'max-w-[420px] p-4')}>
          <ListGroup title="Appointments" limit={3} label="appointments">{turnos(8)}</ListGroup>
        </div>
      </Bloque>
      <TablaPartes partes={[['Label', 'Opcional. Nombre y cuenta en 11px Semibold versalitas, en el color del tono; plegable con chevron y aria-expanded.', 'title · tone · collapsible'], ['Rows', 'Cada hijo es una fila (un <li>) en su card interna: blanca, línea de medio pixel y sombra suave (shadow-inner-card), radio 8px; 12px entre cards.', 'children · TARJETA_INTERNA'], ['Show more', 'El tope y el scroll de Elements / Show more.', 'limit · maxHeight · label']]} />
    </Lienzo>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="With limit, closed" nota="Las primeras 5 y el botón con cuántas faltan.">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ListGroup limit={5} label="appointments">{turnos(12)}</ListGroup></div>
        </Muestra>
        <Muestra titulo="With limit, open" nota="Todas, con scroll adentro.">
          <Forzar selector="[data-show-more]" estado="click" className={cn(TARJETA_PANEL, 'p-4')}>
            <ListGroup limit={5} label="appointments">{turnos(12)}</ListGroup>
          </Forzar>
        </Muestra>
        <Muestra titulo="Task rows" nota="Pending Task del Dashboard y del Patient Dashboard.">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ListGroup limit={3} label="pending tasks">{tareas(6)}</ListGroup></div>
        </Muestra>
        <Muestra titulo="With title, collapsed">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ListGroup title="Appointments" collapsible defaultOpen={false}>{turnos(4)}</ListGroup></div>
        </Muestra>
        <Muestra titulo="Empty" nota="Sin filas no se dibuja; el panel muestra su EmptyState.">
          <div className={cn(TARJETA_PANEL, 'p-4 text-[12px] text-ink-muted')}><ListGroup title="Appointments" />(nothing drawn)</div>
        </Muestra>
      </div>
    </Lienzo>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Size" nota="Leído del rótulo dibujado. Entre el rótulo y la primera card, 6px; entre cards, 12px.">
        <MedidaRotulo />
      </Bloque>
      <Bloque titulo="Tones" nota="De LIST_GROUP_TONES (list-group.tsx) y src/index.css.">
        <Tabla encabezado={['Tone', 'Text']} minimo={420}>
          {(Object.keys(LIST_GROUP_TONES) as ListGroupTone[]).map(t => <tr key={t}><td className="font-semibold">{t}</td><td><Token nombre={tokensDe(LIST_GROUP_TONES[t]).texto} /></td></tr>)}
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...P.parameters?.docs?.source}}}})))()}I();export{M as Parts,j as Playground,P as Specs,N as States,F as __namedExportsOrder,k as default};