import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./utils-D-bRdWGo.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";import{h as i,m as a}from"./estilos-CE-FcrPI.js";import{et as o,tt as s}from"./iframe-CgumjuRf.js";import{a as c,c as l,d as u,i as d,l as f,p,t as m,u as h}from"./kit-CWUgB5-0.js";function g(){let e=p(`:scope > div > div`),t=p(`p`);return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(`div`,{ref:e.ref,className:`w-[260px]`,children:(0,_.jsx)(`div`,{ref:t.ref,children:(0,_.jsx)(o,{room:v,enPagina:!0})})}),(0,_.jsxs)(l,{encabezado:[`Part`,`Height`,`Padding`,`Radius`,`Gap`,`Text`],minimo:560,children:[(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Card`}),(0,_.jsx)(`td`,{className:`tabular-nums`,children:e.m?.alto}),(0,_.jsx)(`td`,{className:`tabular-nums`,children:e.m?.padding}),(0,_.jsx)(`td`,{className:`tabular-nums`,children:e.m?.radio}),(0,_.jsx)(`td`,{className:`tabular-nums`,children:e.m?.gap}),(0,_.jsx)(`td`,{children:`—`})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Name`}),(0,_.jsx)(`td`,{children:`—`}),(0,_.jsx)(`td`,{children:`—`}),(0,_.jsx)(`td`,{children:`—`}),(0,_.jsx)(`td`,{children:`—`}),(0,_.jsxs)(`td`,{className:`tabular-nums`,children:[t.m?.texto,` · `,t.m?.peso]})]})]})]})}var _,v,y,b,x,S,C,w,T,E;function D(){return(D=e((()=>{s(),u(),i(),t(),_=r(),v={name:`Operatory name`,status:`Available`,patientsToday:12,provider:`Daniel Anderson`},y={title:`Components/Dashboard/OperatoryCard`,parameters:{layout:`padded`,docs:{description:{component:["Una sala del Dashboard (`@/components/dashboard/OperatoryCard`): el nombre, su estado (**Available**, **Busy**, **Unavailable**), cuántos pacientes tiene hoy y el profesional.",``,"**Dónde:** en la tira de salas de arriba del Dashboard, suelta sobre la página (`enPagina`: la card de página, sombra y sin borde, 2026-10-13). Adentro de un panel va como card interna (línea fina y sombra suave).",``,`**Probalo:** en *Playground* cambiá el estado, los textos, la superficie y el ancho desde *Controls*.`].join(`
`)}}},args:{status:`Available`,name:`Operatory name`,patientsToday:12,provider:`Daniel Anderson`,surface:`On the page`,width:260},argTypes:{status:{control:`inline-radio`,options:[`Available`,`Busy`,`Unavailable`],description:`El estado: el color de la pill.`},name:{control:`text`,description:`Nombre de la sala. Uno largo se corta con elipsis.`},patientsToday:{control:{type:`number`,min:0},description:`Pacientes de hoy, en el globo celeste.`},provider:{control:`text`,description:`Profesional de la sala.`},surface:{control:`inline-radio`,options:[`On the page`,`In a panel`],description:`Sobre el fondo gris (card de página) o adentro de un panel (card interna).`},width:{control:{type:`range`,min:200,max:400,step:4},description:`Ancho de la card. En la tira no baja de 232px.`}}},b={controls:{disable:!0}},x=({enPagina:e,children:t})=>(0,_.jsx)(`div`,{className:n(`rounded-lg p-4`,e?`bg-page-background`:n(a)),children:t}),S={render:e=>(0,_.jsx)(x,{enPagina:e.surface===`On the page`,children:(0,_.jsx)(`div`,{style:{width:e.width,maxWidth:`100%`},children:(0,_.jsx)(o,{room:{name:e.name,status:e.status,patientsToday:e.patientsToday,provider:e.provider},enPagina:e.surface===`On the page`})})})},C={parameters:b,render:()=>(0,_.jsxs)(d,{children:[(0,_.jsx)(m,{nota:`Arriba el nombre y la pill de estado; abajo, los pacientes de hoy y el profesional.`,children:(0,_.jsx)(x,{enPagina:!0,children:(0,_.jsx)(`div`,{className:`w-[260px]`,children:(0,_.jsx)(o,{room:v,enPagina:!0})})})}),(0,_.jsx)(f,{partes:[[`Name`,`El nombre de la sala, 14px Semibold; se corta con elipsis si no entra.`,`room.name`],[`Status`,`La pill del estado: verde Available, azul Busy, rojo Unavailable.`,`StatusPill`],[`Patients today`,`Ícono de calendario y el número en el globo celeste.`,`room.patientsToday`],[`Provider`,`Ícono de persona y el profesional.`,`room.provider`],[`Surface`,`Sobre la página, la card de página (sombra, sin borde); adentro de un panel, la card interna.`,`enPagina`]]})]})},w={parameters:b,render:()=>(0,_.jsxs)(d,{children:[(0,_.jsx)(`div`,{className:`grid gap-6 md:grid-cols-3`,children:[`Available`,`Busy`,`Unavailable`].map(e=>(0,_.jsx)(c,{titulo:e,children:(0,_.jsx)(x,{enPagina:!0,children:(0,_.jsx)(o,{room:{...v,status:e},enPagina:!0})})},e))}),(0,_.jsxs)(`div`,{className:`grid gap-6 md:grid-cols-2`,children:[(0,_.jsx)(c,{titulo:`On the page`,nota:`La tira de salas del Dashboard: card de página.`,children:(0,_.jsx)(x,{enPagina:!0,children:(0,_.jsx)(o,{room:v,enPagina:!0})})}),(0,_.jsx)(c,{titulo:`In a panel`,nota:`Adentro de una card: card interna, con la línea fina.`,children:(0,_.jsx)(x,{children:(0,_.jsx)(o,{room:v})})}),(0,_.jsx)(c,{titulo:`Narrowest (232px)`,nota:`El ancho mínimo en la tira: entra el nombre con la pill más larga.`,children:(0,_.jsx)(x,{enPagina:!0,children:(0,_.jsx)(`div`,{className:`w-[232px]`,children:(0,_.jsx)(o,{room:{...v,status:`Unavailable`},enPagina:!0})})})}),(0,_.jsx)(c,{titulo:`Long name`,nota:`Se corta con elipsis; la pill no baja de renglón.`,children:(0,_.jsx)(x,{enPagina:!0,children:(0,_.jsx)(`div`,{className:`w-[232px]`,children:(0,_.jsx)(o,{room:{...v,name:`Operatory 12 · Surgery room`},enPagina:!0})})})})]})]})},T={parameters:b,render:()=>(0,_.jsxs)(d,{children:[(0,_.jsx)(m,{titulo:`Size`,nota:`Leído de la card dibujada, a 260px.`,children:(0,_.jsx)(g,{})}),(0,_.jsx)(m,{titulo:`Colors`,nota:`Los tokens de cada estado (src/index.css) y de cada superficie (lib/estilos).`,children:(0,_.jsxs)(l,{encabezado:[`Part`,`Fill`,`Text / line`],minimo:560,children:[(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Available`}),(0,_.jsx)(`td`,{children:(0,_.jsx)(h,{nombre:`dash-ok-bg`})}),(0,_.jsx)(`td`,{children:(0,_.jsx)(h,{nombre:`dash-ok-fg`})})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Busy`}),(0,_.jsx)(`td`,{children:(0,_.jsx)(h,{nombre:`dash-busy-bg`})}),(0,_.jsx)(`td`,{children:(0,_.jsx)(h,{nombre:`dash-busy-fg`})})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Unavailable`}),(0,_.jsx)(`td`,{children:(0,_.jsx)(h,{nombre:`dash-bad-bg`})}),(0,_.jsx)(`td`,{children:(0,_.jsx)(h,{nombre:`dash-bad-fg`})})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Patients today`}),(0,_.jsx)(`td`,{children:(0,_.jsx)(h,{nombre:`dash-count-bg`})}),(0,_.jsx)(`td`,{children:(0,_.jsx)(h,{nombre:`dash-blue-hover`})})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`On the page`}),(0,_.jsx)(`td`,{children:`white · shadow-panel (TARJETA_PANEL)`}),(0,_.jsx)(`td`,{children:`—`})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`In a panel`}),(0,_.jsx)(`td`,{children:`white · shadow-inner-card (TARJETA_INTERNA)`}),(0,_.jsx)(`td`,{children:`—`})]})]})})]})},E=[`Playground`,`Parts`,`States`,`Specs`],S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: a => <Fondo enPagina={a.surface === 'On the page'}>
      <div style={{
      width: a.width,
      maxWidth: '100%'
    }}>
        <OperatoryCard room={{
        name: a.name,
        status: a.status,
        patientsToday: a.patientsToday,
        provider: a.provider
      }} enPagina={a.surface === 'On the page'} />
      </div>
    </Fondo>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque nota="Arriba el nombre y la pill de estado; abajo, los pacientes de hoy y el profesional.">
        <Fondo enPagina><div className="w-[260px]"><OperatoryCard room={SALA} enPagina /></div></Fondo>
      </Bloque>
      <TablaPartes partes={[['Name', 'El nombre de la sala, 14px Semibold; se corta con elipsis si no entra.', 'room.name'], ['Status', 'La pill del estado: verde Available, azul Busy, rojo Unavailable.', 'StatusPill'], ['Patients today', 'Ícono de calendario y el número en el globo celeste.', 'room.patientsToday'], ['Provider', 'Ícono de persona y el profesional.', 'room.provider'], ['Surface', 'Sobre la página, la card de página (sombra, sin borde); adentro de un panel, la card interna.', 'enPagina']]} />
    </Lienzo>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <div className="grid gap-6 md:grid-cols-3">
        {(['Available', 'Busy', 'Unavailable'] as const).map(s => <Muestra key={s} titulo={s}>
            <Fondo enPagina><OperatoryCard room={{
            ...SALA,
            status: s
          }} enPagina /></Fondo>
          </Muestra>)}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="On the page" nota="La tira de salas del Dashboard: card de página.">
          <Fondo enPagina><OperatoryCard room={SALA} enPagina /></Fondo>
        </Muestra>
        <Muestra titulo="In a panel" nota="Adentro de una card: card interna, con la línea fina.">
          <Fondo><OperatoryCard room={SALA} /></Fondo>
        </Muestra>
        <Muestra titulo="Narrowest (232px)" nota="El ancho mínimo en la tira: entra el nombre con la pill más larga.">
          <Fondo enPagina><div className="w-[232px]"><OperatoryCard room={{
              ...SALA,
              status: 'Unavailable'
            }} enPagina /></div></Fondo>
        </Muestra>
        <Muestra titulo="Long name" nota="Se corta con elipsis; la pill no baja de renglón.">
          <Fondo enPagina><div className="w-[232px]"><OperatoryCard room={{
              ...SALA,
              name: 'Operatory 12 · Surgery room'
            }} enPagina /></div></Fondo>
        </Muestra>
      </div>
    </Lienzo>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Size" nota="Leído de la card dibujada, a 260px.">
        <Medidas />
      </Bloque>
      <Bloque titulo="Colors" nota="Los tokens de cada estado (src/index.css) y de cada superficie (lib/estilos).">
        <Tabla encabezado={['Part', 'Fill', 'Text / line']} minimo={560}>
          <tr><td className="font-semibold">Available</td><td><Token nombre="dash-ok-bg" /></td><td><Token nombre="dash-ok-fg" /></td></tr>
          <tr><td className="font-semibold">Busy</td><td><Token nombre="dash-busy-bg" /></td><td><Token nombre="dash-busy-fg" /></td></tr>
          <tr><td className="font-semibold">Unavailable</td><td><Token nombre="dash-bad-bg" /></td><td><Token nombre="dash-bad-fg" /></td></tr>
          <tr><td className="font-semibold">Patients today</td><td><Token nombre="dash-count-bg" /></td><td><Token nombre="dash-blue-hover" /></td></tr>
          <tr><td className="font-semibold">On the page</td><td>white · shadow-panel (TARJETA_PANEL)</td><td>—</td></tr>
          <tr><td className="font-semibold">In a panel</td><td>white · shadow-inner-card (TARJETA_INTERNA)</td><td>—</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...T.parameters?.docs?.source}}}})))()}D();export{C as Parts,S as Playground,T as Specs,w as States,E as __namedExportsOrder,y as default};