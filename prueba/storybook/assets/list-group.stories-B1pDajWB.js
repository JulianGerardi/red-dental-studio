import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./utils-D-bRdWGo.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";import{c as i,l as a,t as o}from"./DashboardRows-yN_DDvpq.js";import{h as s,m as c}from"./estilos-CE-FcrPI.js";import{a as l,c as u,d,g as f,h as p,i as m,l as h,p as g,t as _,u as v}from"./kit-4bQS7S9u.js";import{i as y,p as b}from"./dashboard-data-DGHlVgi5.js";import{n as x,r as S,t as C}from"./list-group-BL_V4jPg.js";function w(){let{ref:e,m:t}=g(`p`);return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(`div`,{ref:e,className:`max-w-[360px]`,children:(0,T.jsx)(x,{title:`Overdue`,tone:`danger`,children:D(1)})}),(0,T.jsx)(u,{encabezado:[`Part`,`Text`,`Height`],minimo:420,children:(0,T.jsxs)(`tr`,{children:[(0,T.jsx)(`td`,{className:`font-semibold`,children:`Label`}),(0,T.jsxs)(`td`,{className:`tabular-nums`,children:[t?.texto,` · `,t?.peso]}),(0,T.jsx)(`td`,{className:`tabular-nums`,children:t?.alto})]})})]})}var T,E,D,O,k,A,j,M,N,P,F,I;function L(){return(L=e((()=>{S(),a(),b(),d(),p(),s(),t(),T=r(),E=y.tasks,D=e=>E.slice(0,e).map((e,t)=>(0,T.jsx)(i,{task:e},t)),O=e=>E.filter(e=>(e.vence??0)>0).slice(0,e).map((e,t)=>(0,T.jsx)(i,{task:e},t)),k=e=>y.appointments.filter(e=>e.completado).slice(0,e).map((e,t)=>(0,T.jsx)(o,{appt:e,etapa:`done`},t)),A={title:`Elements/List group`,parameters:{layout:`padded`,docs:{description:{component:['Un grupo de una lista larga adentro de una card (`@/components/ui/list-group`): rótulo en versalitas con la cuenta, las filas en una caja de línea fina y, si hace falta, **plegable** y con **tope** ("Show 12 more"). Es lo que ordena un panel con mucho: en lugar de cuarenta cards iguales, grupos por lo que importa ahora (Overdue · Due today · Later; Up next · In chair · Completed).',``,`**Cuándo usarlo:** una lista de más de ~6 ítems adentro de un panel. El color del rótulo dice la urgencia del grupo, no decora: rojo para lo vencido, ámbar para hoy, azul para lo que sigue, gris para el resto. Generaliza el agrupado de *Pending documents* (Patient Dashboard).`,``,`**Probalo:** en *Playground* cambiá la cantidad de filas, el tope y el tono desde *Controls*; tocá el rótulo si es plegable y "Show N more".`].join(`
`)}}},args:{title:`Overdue`,tone:`danger`,items:8,collapsible:!1,limit:5,note:``,empty:`Nothing overdue.`},argTypes:{title:{control:`text`,description:`El nombre del grupo. Va en versalitas con la cuenta.`},tone:{control:`inline-radio`,options:Object.keys(C),description:`Color del rótulo: la urgencia del grupo.`},items:{control:{type:`range`,min:0,max:20},description:`Cuántas filas tiene el grupo. Con 0 se ve el texto de vacío.`},collapsible:{control:`boolean`,description:`El rótulo pliega y despliega el grupo.`},limit:{control:{type:`range`,min:0,max:12},description:`Cuántas filas se ven antes de "Show N more". 0 = sin tope.`},note:{control:`text`,description:`Dato a la derecha del rótulo ("longest 27 min").`},empty:{control:`text`,description:`Texto cuando el grupo está vacío. Sin texto, el grupo vacío no se dibuja.`}}},j={controls:{disable:!0}},M={render:e=>(0,T.jsx)(`div`,{className:n(c,`max-w-[420px] p-4`),children:(0,T.jsx)(x,{title:e.title,tone:e.tone,collapsible:e.collapsible,limit:e.limit||void 0,note:e.note||void 0,empty:e.empty||void 0,children:D(e.items)},`${e.collapsible}-${e.limit}`)})},N={parameters:j,render:()=>(0,T.jsxs)(m,{children:[(0,T.jsx)(_,{nota:`Rótulo arriba, filas en una caja de línea fina (shadow-hairline) separadas por una línea más tenue, y el pie con el tope.`,children:(0,T.jsx)(`div`,{className:n(c,`max-w-[420px] p-4`),children:(0,T.jsx)(x,{title:`Due today`,tone:`warning`,note:`6 of 28`,limit:3,children:D(6)})})}),(0,T.jsx)(h,{partes:[[`Label`,`Nombre del grupo y su cuenta en 11px Semibold versalitas, en el color del tono. Plegable: lleva un chevron y es un botón con aria-expanded.`,`ListGroup title · tone · collapsible`],[`Note`,`Un dato del grupo a la derecha del rótulo, en 11px gris.`,`note`],[`Rows`,`Cada hijo es una fila (un <li>). La caja es blanca con línea de medio pixel; entre filas, line-soft.`,`children`],[`Show more`,`Con tope, el resto queda detrás de "Show N more"; abierto, "Show less".`,`limit`],[`Empty`,`Sin filas, una línea de texto en la misma caja. Sin texto, el grupo no se dibuja.`,`empty`]]})]})},P={parameters:j,render:()=>(0,T.jsx)(m,{children:(0,T.jsxs)(`div`,{className:`grid gap-6 md:grid-cols-2`,children:[(0,T.jsx)(l,{titulo:`With limit`,nota:`Las primeras 3 y el resto detrás de Show N more.`,children:(0,T.jsx)(`div`,{className:n(c,`p-4`),children:(0,T.jsx)(x,{title:`Later`,limit:3,children:O(7)})})}),(0,T.jsx)(l,{titulo:`Collapsed`,nota:`Completed arranca plegado: ya pasó, se consulta poco.`,children:(0,T.jsx)(`div`,{className:n(c,`p-4`),children:(0,T.jsx)(x,{title:`Completed`,collapsible:!0,defaultOpen:!1,children:k(4)})})}),(0,T.jsx)(l,{titulo:`Collapsible, open`,children:(0,T.jsx)(`div`,{className:n(c,`p-4`),children:(0,T.jsx)(x,{title:`Completed`,collapsible:!0,children:k(2)})})}),(0,T.jsx)(l,{titulo:`Empty`,nota:`Con texto de vacío: el grupo se ve y dice que no hay nada.`,children:(0,T.jsx)(`div`,{className:n(c,`p-4`),children:(0,T.jsx)(x,{title:`In chair`,empty:`Nobody is in chair right now.`})})}),(0,T.jsx)(l,{titulo:`Sticky label in a scrolling panel`,nota:`Scrolleá: el rótulo de cada grupo queda pegado arriba mientras pasan sus filas.`,children:(0,T.jsx)(`div`,{className:n(c,`h-[260px] overflow-y-auto p-4`),children:(0,T.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,T.jsx)(x,{title:`Overdue`,tone:`danger`,sticky:!0,children:D(4)}),(0,T.jsx)(x,{title:`Due today`,tone:`warning`,sticky:!0,children:E.slice(6,10).map((e,t)=>(0,T.jsx)(i,{task:e},t))})]})})}),(0,T.jsx)(l,{titulo:`Tones`,nota:`El color del rótulo es la urgencia.`,children:(0,T.jsx)(`div`,{className:n(c,`flex flex-col gap-3 p-4`),children:Object.keys(C).map(e=>(0,T.jsx)(x,{title:e,tone:e,collapsible:!0,defaultOpen:!1,children:D(1)},e))})})]})})},F={parameters:j,render:()=>(0,T.jsxs)(m,{children:[(0,T.jsx)(_,{titulo:`Size`,nota:`Leído del rótulo dibujado. Entre el rótulo y la caja, 6px; entre grupos, el gap del panel (16px).`,children:(0,T.jsx)(w,{})}),(0,T.jsx)(_,{titulo:`Tones`,nota:`De LIST_GROUP_TONES (list-group.tsx) y src/index.css.`,children:(0,T.jsx)(u,{encabezado:[`Tone`,`Use`,`Text`],minimo:560,children:Object.keys(C).map(e=>(0,T.jsxs)(`tr`,{children:[(0,T.jsx)(`td`,{className:`font-semibold`,children:e}),(0,T.jsx)(`td`,{className:`text-ink-medium`,children:{default:`Later, Completed, In chair`,danger:`Overdue`,warning:`Due today, Waiting`,info:`Up next`,success:`Done, when it is good news`}[e]}),(0,T.jsx)(`td`,{children:(0,T.jsx)(v,{nombre:f(C[e]).texto})})]},e))})})]})},I=[`Playground`,`Parts`,`States`,`Specs`],M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: a => <div className={cn(TARJETA_PANEL, 'max-w-[420px] p-4')}>
      <ListGroup key={\`\${a.collapsible}-\${a.limit}\`} title={a.title} tone={a.tone} collapsible={a.collapsible} limit={a.limit || undefined} note={a.note || undefined} empty={a.empty || undefined}>
        {filas(a.items)}
      </ListGroup>
    </div>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque nota="Rótulo arriba, filas en una caja de línea fina (shadow-hairline) separadas por una línea más tenue, y el pie con el tope.">
        <div className={cn(TARJETA_PANEL, 'max-w-[420px] p-4')}>
          <ListGroup title="Due today" tone="warning" note="6 of 28" limit={3}>{filas(6)}</ListGroup>
        </div>
      </Bloque>
      <TablaPartes partes={[['Label', 'Nombre del grupo y su cuenta en 11px Semibold versalitas, en el color del tono. Plegable: lleva un chevron y es un botón con aria-expanded.', 'ListGroup title · tone · collapsible'], ['Note', 'Un dato del grupo a la derecha del rótulo, en 11px gris.', 'note'], ['Rows', 'Cada hijo es una fila (un <li>). La caja es blanca con línea de medio pixel; entre filas, line-soft.', 'children'], ['Show more', 'Con tope, el resto queda detrás de "Show N more"; abierto, "Show less".', 'limit'], ['Empty', 'Sin filas, una línea de texto en la misma caja. Sin texto, el grupo no se dibuja.', 'empty']]} />
    </Lienzo>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="With limit" nota="Las primeras 3 y el resto detrás de Show N more.">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ListGroup title="Later" limit={3}>{despues(7)}</ListGroup></div>
        </Muestra>
        <Muestra titulo="Collapsed" nota="Completed arranca plegado: ya pasó, se consulta poco.">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ListGroup title="Completed" collapsible defaultOpen={false}>{hechos(4)}</ListGroup></div>
        </Muestra>
        <Muestra titulo="Collapsible, open">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ListGroup title="Completed" collapsible>{hechos(2)}</ListGroup></div>
        </Muestra>
        <Muestra titulo="Empty" nota="Con texto de vacío: el grupo se ve y dice que no hay nada.">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ListGroup title="In chair" empty="Nobody is in chair right now." /></div>
        </Muestra>
        <Muestra titulo="Sticky label in a scrolling panel" nota="Scrolleá: el rótulo de cada grupo queda pegado arriba mientras pasan sus filas.">
          <div className={cn(TARJETA_PANEL, 'h-[260px] overflow-y-auto p-4')}>
            <div className="flex flex-col gap-4">
              <ListGroup title="Overdue" tone="danger" sticky>{filas(4)}</ListGroup>
              <ListGroup title="Due today" tone="warning" sticky>{TAREAS.slice(6, 10).map((t, i) => <TaskRow key={i} task={t} />)}</ListGroup>
            </div>
          </div>
        </Muestra>
        <Muestra titulo="Tones" nota="El color del rótulo es la urgencia.">
          <div className={cn(TARJETA_PANEL, 'flex flex-col gap-3 p-4')}>
            {(Object.keys(LIST_GROUP_TONES) as ListGroupTone[]).map(t => <ListGroup key={t} title={t} tone={t} collapsible defaultOpen={false}>{filas(1)}</ListGroup>)}
          </div>
        </Muestra>
      </div>
    </Lienzo>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
              default: 'Later, Completed, In chair',
              danger: 'Overdue',
              warning: 'Due today, Waiting',
              info: 'Up next',
              success: 'Done, when it is good news'
            }[t]}</td>
              <td><Token nombre={tokensDe(LIST_GROUP_TONES[t]).texto} /></td>
            </tr>)}
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...F.parameters?.docs?.source}}}})))()}L();export{N as Parts,M as Playground,F as Specs,P as States,I as __namedExportsOrder,A as default};