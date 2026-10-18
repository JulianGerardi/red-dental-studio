import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{n,t as r}from"./utils-D-bRdWGo.js";import{t as i}from"./jsx-runtime-DeHZSEgm.js";import{h as a,m as o}from"./estilos-CE-FcrPI.js";import{$ as s,Q as c,Z as l}from"./iframe-DBzpbi-8.js";import{a as u,c as d,d as f,g as p,h as m,i as h,l as g,p as _,r as v,t as y,u as b}from"./kit-CWUgB5-0.js";function x(e){let[t,n]=(0,C.useState)(!1);return(0,w.jsx)(c,{room:{name:e.name,status:e.status,patientsToday:e.patientsToday,provider:e.provider},enPagina:e.surface===`On the page`,seleccionada:t,onClick:e.clickable?()=>n(e=>!e):void 0})}function S(){let e=_(`:scope > div > button`),t=_(`:scope > button > span > span`);return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(`div`,{ref:e.ref,className:`w-[260px]`,children:(0,w.jsx)(`div`,{ref:t.ref,children:(0,w.jsx)(c,{room:T,enPagina:!0,onClick:E})})}),(0,w.jsxs)(d,{encabezado:[`Part`,`Height`,`Padding`,`Radius`,`Border`,`Gap`,`Text`],minimo:620,children:[(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Card`}),(0,w.jsx)(`td`,{className:`tabular-nums`,children:e.m?.alto}),(0,w.jsx)(`td`,{className:`tabular-nums`,children:e.m?.padding}),(0,w.jsx)(`td`,{className:`tabular-nums`,children:e.m?.radio}),(0,w.jsx)(`td`,{className:`tabular-nums`,children:e.m?.borde}),(0,w.jsx)(`td`,{className:`tabular-nums`,children:e.m?.gap}),(0,w.jsx)(`td`,{children:`—`})]}),(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Name`}),(0,w.jsx)(`td`,{children:`—`}),(0,w.jsx)(`td`,{children:`—`}),(0,w.jsx)(`td`,{children:`—`}),(0,w.jsx)(`td`,{children:`—`}),(0,w.jsx)(`td`,{children:`—`}),(0,w.jsxs)(`td`,{className:`tabular-nums`,children:[t.m?.texto,` · `,t.m?.peso]})]})]})]})}var C,w,T,E,D,O,k,A,j,M,N,P;function F(){return(F=e((()=>{C=t(),s(),f(),a(),n(),m(),w=i(),T={name:`Operatory 2`,status:`Busy`,patientsToday:12,provider:`Daniel Anderson`},E=()=>{},D={title:`Components/Dashboard/OperatoryCard`,parameters:{layout:`padded`,docs:{description:{component:["Una sala del Dashboard (`@/components/dashboard/OperatoryCard`): el nombre, su estado (**Available**, **Busy**, **Unavailable**), cuántos pacientes tiene hoy y el profesional.",``,"**Dónde:** en la tira de salas de arriba del Dashboard, suelta sobre la página (`enPagina`). Ahí **toma el color de su estado**: borde y fondo, los mismos de su pill (verde, azul, rojo), para ver de un vistazo qué sala está libre (Julián, 2026-10-17). Adentro de un panel va como card interna, blanca.",``,"**Tocarla filtra la sala de espera** (con `onClick` es un botón con `aria-pressed`): la elegida lleva el anillo azul de selección y las demás se apagan hasta que se pasa el mouse; tocarla de nuevo la suelta.",``,`**Probalo:** en *Playground* cambiá el estado, los textos, la superficie y el ancho desde *Controls*; con *clickable*, tocala.`].join(`
`)}}},args:{status:`Busy`,name:`Operatory 2`,patientsToday:12,provider:`Daniel Anderson`,surface:`On the page`,clickable:!0,width:260},argTypes:{status:{control:`inline-radio`,options:[`Available`,`Busy`,`Unavailable`],description:`El estado: el color de la pill y, sobre la página, el de la card.`},name:{control:`text`,description:`Nombre de la sala, el mismo que dicen los turnos. Uno largo se corta con elipsis.`},patientsToday:{control:{type:`number`,min:0},description:`Pacientes de hoy, en el globo celeste.`},provider:{control:`text`,description:`Profesional de la sala.`},surface:{control:`inline-radio`,options:[`On the page`,`In a panel`],description:`Sobre el fondo gris (con el color del estado) o adentro de un panel (card interna, blanca).`},clickable:{control:`boolean`,description:`Con onClick: un botón que se elige y se suelta.`},width:{control:{type:`range`,min:200,max:400,step:4},description:`Ancho de la card. En la tira no baja de 232px.`}}},O={controls:{disable:!0}},k=({enPagina:e,children:t,className:n})=>(0,w.jsx)(`div`,{className:r(`rounded-lg p-4`,e?`bg-page-background`:r(o),n),children:t}),A={render:e=>(0,w.jsx)(k,{enPagina:e.surface===`On the page`,children:(0,w.jsx)(`div`,{style:{width:e.width,maxWidth:`100%`},children:(0,w.jsx)(x,{...e},`${e.clickable}`)})})},j={parameters:O,render:()=>(0,w.jsxs)(h,{children:[(0,w.jsx)(y,{nota:`Arriba el nombre y la pill de estado; abajo, los pacientes de hoy y el profesional. Sobre la página, borde y fondo del color del estado.`,children:(0,w.jsx)(k,{enPagina:!0,children:(0,w.jsx)(`div`,{className:`w-[260px]`,children:(0,w.jsx)(c,{room:T,enPagina:!0,onClick:E})})})}),(0,w.jsx)(g,{partes:[[`Name`,`El nombre de la sala, 14px Semibold, el mismo que dicen los turnos ("Operatory 2"); se corta con elipsis si no entra.`,`room.name`],[`Status`,`La pill del estado: verde Available, azul Busy, rojo Unavailable.`,`StatusPill`],[`Patients today`,`Ícono de calendario y el número en el globo celeste.`,`room.patientsToday`],[`Provider`,`Ícono de persona y el profesional.`,`room.provider`],[`Surface`,`Sobre la página, borde de 1px y fondo del color del estado; adentro de un panel, la card interna blanca.`,`enPagina · OPERATORY_SURFACES`],[`Selection`,`Con onClick es un botón (aria-pressed). Elegida: anillo azul de 2px a 2px; las demás al 60% hasta el hover o el foco.`,`seleccionada · atenuada · onClick`]]})]})},M={parameters:O,render:()=>(0,w.jsxs)(h,{children:[(0,w.jsx)(`div`,{className:`flex flex-wrap gap-6`,children:[`Available`,`Busy`,`Unavailable`].map((e,t)=>(0,w.jsx)(u,{titulo:e,ancho:264,children:(0,w.jsx)(k,{enPagina:!0,children:(0,w.jsx)(c,{room:{...T,name:`Operatory ${t+1}`,status:e},enPagina:!0,onClick:E})})},e))}),(0,w.jsxs)(`div`,{className:`grid gap-6 md:grid-cols-2`,children:[(0,w.jsx)(u,{titulo:`Selected`,nota:`La sala que filtra la sala de espera: anillo azul y sombra.`,children:(0,w.jsx)(k,{enPagina:!0,children:(0,w.jsx)(c,{room:T,enPagina:!0,seleccionada:!0,onClick:E})})}),(0,w.jsx)(u,{titulo:`Another one selected`,nota:`Se apaga al 60%; vuelve al pasar el mouse o con el foco.`,children:(0,w.jsx)(k,{enPagina:!0,children:(0,w.jsx)(c,{room:{...T,name:`Operatory 1`,status:`Available`},enPagina:!0,atenuada:!0,onClick:E})})}),(0,w.jsx)(u,{titulo:`Hover`,nota:`Suma la sombra de las cards.`,children:(0,w.jsx)(v,{selector:`button`,estado:`hover`,children:(0,w.jsx)(k,{enPagina:!0,children:(0,w.jsx)(c,{room:T,enPagina:!0,onClick:E})})})}),(0,w.jsx)(u,{titulo:`Keyboard focus`,nota:`El anillo de foco de la app; Enter o espacio la eligen.`,children:(0,w.jsx)(v,{selector:`button`,estado:`focus-visible`,children:(0,w.jsx)(k,{enPagina:!0,children:(0,w.jsx)(c,{room:T,enPagina:!0,onClick:E})})})}),(0,w.jsx)(u,{titulo:`In a panel`,nota:`Adentro de una card: card interna, blanca, con la línea fina.`,children:(0,w.jsx)(k,{children:(0,w.jsx)(c,{room:T})})}),(0,w.jsx)(u,{titulo:`Narrowest (232px), long name`,nota:`El ancho mínimo en la tira: el nombre se corta con elipsis y la pill no baja de renglón.`,children:(0,w.jsx)(k,{enPagina:!0,children:(0,w.jsx)(`div`,{className:`w-[232px]`,children:(0,w.jsx)(c,{room:{...T,name:`Operatory 12 · Surgery room`,status:`Unavailable`},enPagina:!0,onClick:E})})})})]})]})},N={parameters:O,render:()=>(0,w.jsxs)(h,{children:[(0,w.jsx)(y,{titulo:`Size`,nota:`Leído de la card dibujada, a 260px.`,children:(0,w.jsx)(S,{})}),(0,w.jsx)(y,{titulo:`Colors on the page`,nota:`De OPERATORY_SURFACES (OperatoryCard.tsx): el mismo par de tokens que la pill de cada estado.`,children:(0,w.jsx)(d,{encabezado:[`Status`,`Fill`,`Border`],minimo:480,children:Object.keys(l).map(e=>{let t=p(l[e]);return(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:e}),(0,w.jsx)(`td`,{children:(0,w.jsx)(b,{nombre:t.fondo})}),(0,w.jsx)(`td`,{children:(0,w.jsx)(b,{nombre:t.borde})})]},e)})})}),(0,w.jsx)(y,{titulo:`Selection and the rest`,children:(0,w.jsxs)(d,{encabezado:[`Part`,`Value`],minimo:480,children:[(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Selected ring`}),(0,w.jsxs)(`td`,{children:[(0,w.jsx)(b,{nombre:`dash-ring`}),` · 2px, 2px away`]})]}),(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Others, while one is selected`}),(0,w.jsx)(`td`,{children:`60% opacity, back to 100% on hover or focus`})]}),(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Patients today`}),(0,w.jsxs)(`td`,{children:[(0,w.jsx)(b,{nombre:`dash-count-bg`}),` · `,(0,w.jsx)(b,{nombre:`dash-blue-hover`})]})]}),(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`In a panel`}),(0,w.jsx)(`td`,{children:`white · shadow-inner-card (TARJETA_INTERNA)`})]})]})})]})},P=[`Playground`,`Parts`,`States`,`Specs`],A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: a => <Fondo enPagina={a.surface === 'On the page'}>
      <div style={{
      width: a.width,
      maxWidth: '100%'
    }}><Elegible key={\`\${a.clickable}\`} {...a} /></div>
    </Fondo>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque nota="Arriba el nombre y la pill de estado; abajo, los pacientes de hoy y el profesional. Sobre la página, borde y fondo del color del estado.">
        <Fondo enPagina><div className="w-[260px]"><OperatoryCard room={SALA} enPagina onClick={nada} /></div></Fondo>
      </Bloque>
      <TablaPartes partes={[['Name', 'El nombre de la sala, 14px Semibold, el mismo que dicen los turnos ("Operatory 2"); se corta con elipsis si no entra.', 'room.name'], ['Status', 'La pill del estado: verde Available, azul Busy, rojo Unavailable.', 'StatusPill'], ['Patients today', 'Ícono de calendario y el número en el globo celeste.', 'room.patientsToday'], ['Provider', 'Ícono de persona y el profesional.', 'room.provider'], ['Surface', 'Sobre la página, borde de 1px y fondo del color del estado; adentro de un panel, la card interna blanca.', 'enPagina · OPERATORY_SURFACES'], ['Selection', 'Con onClick es un botón (aria-pressed). Elegida: anillo azul de 2px a 2px; las demás al 60% hasta el hover o el foco.', 'seleccionada · atenuada · onClick']]} />
    </Lienzo>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <div className="flex flex-wrap gap-6">
        {(['Available', 'Busy', 'Unavailable'] as const).map((s, i) => <Muestra key={s} titulo={s} ancho={264}>
            <Fondo enPagina><OperatoryCard room={{
            ...SALA,
            name: \`Operatory \${i + 1}\`,
            status: s
          }} enPagina onClick={nada} /></Fondo>
          </Muestra>)}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="Selected" nota="La sala que filtra la sala de espera: anillo azul y sombra.">
          <Fondo enPagina><OperatoryCard room={SALA} enPagina seleccionada onClick={nada} /></Fondo>
        </Muestra>
        <Muestra titulo="Another one selected" nota="Se apaga al 60%; vuelve al pasar el mouse o con el foco.">
          <Fondo enPagina><OperatoryCard room={{
            ...SALA,
            name: 'Operatory 1',
            status: 'Available'
          }} enPagina atenuada onClick={nada} /></Fondo>
        </Muestra>
        <Muestra titulo="Hover" nota="Suma la sombra de las cards.">
          <Forzar selector="button" estado="hover"><Fondo enPagina><OperatoryCard room={SALA} enPagina onClick={nada} /></Fondo></Forzar>
        </Muestra>
        <Muestra titulo="Keyboard focus" nota="El anillo de foco de la app; Enter o espacio la eligen.">
          <Forzar selector="button" estado="focus-visible"><Fondo enPagina><OperatoryCard room={SALA} enPagina onClick={nada} /></Fondo></Forzar>
        </Muestra>
        <Muestra titulo="In a panel" nota="Adentro de una card: card interna, blanca, con la línea fina.">
          <Fondo><OperatoryCard room={SALA} /></Fondo>
        </Muestra>
        <Muestra titulo="Narrowest (232px), long name" nota="El ancho mínimo en la tira: el nombre se corta con elipsis y la pill no baja de renglón.">
          <Fondo enPagina><div className="w-[232px]"><OperatoryCard room={{
              ...SALA,
              name: 'Operatory 12 · Surgery room',
              status: 'Unavailable'
            }} enPagina onClick={nada} /></div></Fondo>
        </Muestra>
      </div>
    </Lienzo>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Size" nota="Leído de la card dibujada, a 260px.">
        <Medidas />
      </Bloque>
      <Bloque titulo="Colors on the page" nota="De OPERATORY_SURFACES (OperatoryCard.tsx): el mismo par de tokens que la pill de cada estado.">
        <Tabla encabezado={['Status', 'Fill', 'Border']} minimo={480}>
          {(Object.keys(OPERATORY_SURFACES) as OperatoryStatus[]).map(s => {
          const t = tokensDe(OPERATORY_SURFACES[s]);
          return <tr key={s}><td className="font-semibold">{s}</td><td><Token nombre={t.fondo} /></td><td><Token nombre={t.borde} /></td></tr>;
        })}
        </Tabla>
      </Bloque>
      <Bloque titulo="Selection and the rest">
        <Tabla encabezado={['Part', 'Value']} minimo={480}>
          <tr><td className="font-semibold">Selected ring</td><td><Token nombre="dash-ring" /> · 2px, 2px away</td></tr>
          <tr><td className="font-semibold">Others, while one is selected</td><td>60% opacity, back to 100% on hover or focus</td></tr>
          <tr><td className="font-semibold">Patients today</td><td><Token nombre="dash-count-bg" /> · <Token nombre="dash-blue-hover" /></td></tr>
          <tr><td className="font-semibold">In a panel</td><td>white · shadow-inner-card (TARJETA_INTERNA)</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...N.parameters?.docs?.source}}}})))()}F();export{j as Parts,A as Playground,N as Specs,M as States,P as __namedExportsOrder,D as default};