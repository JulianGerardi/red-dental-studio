import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./utils-D-bRdWGo.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";import{h as i,m as a}from"./estilos-CE-FcrPI.js";import{a as o,c as s,d as c,i as l,l as u,t as d}from"./kit-CWUgB5-0.js";import{n as f,t as p}from"./OperatoryList-BNimqr9T.js";var m,h,g,_,v,y,b,x,S,C,w,T,E;function D(){return(D=e((()=>{f(),c(),i(),t(),m=r(),h=[`Available`,`Busy`,`Busy`,`Busy`,`Unavailable`,`Available`],g=[`Check-up`,`Cleaning`,`Consultation`],_=e=>Array.from({length:e},(e,t)=>({name:`Operatory ${t+1}`,status:h[t%h.length],patientsToday:0,provider:`Daniel Anderson`})),v=e=>Array.from({length:e*2},(t,n)=>({name:[`Noah James`,`Mara Otero`,`Ines Bermudez`,`Sofia Chen`,`Elias Aguirre`,`Lena Park`][n%6],initials:[`NJ`,`MO`,`IB`,`SC`,`EA`,`LP`][n%6],provider:`Dr. Elena Martinez`,operatory:`Operatory ${n%e+1}`,time:`${String(8+Math.floor(n/e)*2+n%e).padStart(2,`0`)}:00`,motivo:g[n%3],completado:n<e})),y={title:`Components/Dashboard/Operatory list`,parameters:{layout:`padded`,docs:{description:{component:["Las salas del Dashboard como **lista de acordeones** (`@/components/dashboard/OperatoryList`, diseño del artifact de Julián, 2026-10-19): es el panel *Rooms*, la tercera de las cuatro columnas. Antes eran una tira horizontal arriba que filtraba la Waiting Room.",``,`**Cada sala se despliega sola** y puede haber varias abiertas (arrancan cerradas): al tocarla muestra la línea del día de esa sala. **No filtra la Waiting Room**: esa es independiente y tiene su propio *Filter*. El número "Patients today" de cada card es la cantidad de turnos de la sala, así que coincide con su línea.`,``,`**Probalo:** en *Playground* cambiá la cantidad de salas y el ancho desde *Controls*; desplegá una o dos salas.`].join(`
`)}}},args:{rooms:6,width:340},argTypes:{rooms:{control:{type:`range`,min:0,max:10},description:`Cuántas salas tiene la clínica.`},width:{control:{type:`range`,min:250,max:480,step:4},description:`Ancho de la lista. En el Dashboard, 250px a 1280 y 430px a 1920.`}}},b={controls:{disable:!0}},x=({ancho:e,children:t})=>(0,m.jsx)(`div`,{className:n(a,`max-w-full p-4`),style:{width:e+32},children:t}),S={render:e=>(0,m.jsx)(x,{ancho:e.width,children:(0,m.jsx)(p,{rooms:_(e.rooms),turnos:v(Math.max(1,e.rooms)),onSelect:()=>{}},e.rooms)})},C={parameters:b,render:()=>(0,m.jsxs)(l,{children:[(0,m.jsx)(d,{nota:`Seis salas cerradas: se ve el estado, los turnos y el profesional de todas de un vistazo; tocá una para ver su día.`,children:(0,m.jsx)(x,{ancho:340,children:(0,m.jsx)(p,{rooms:_(6),turnos:v(6),onSelect:()=>{}})})}),(0,m.jsx)(u,{partes:[[`List`,`Una columna de OperatoryCard con 10px entre una y otra; role group "Rooms".`,`OperatoryList`],[`Card`,`Cada sala es un acordeón independiente; puede haber varias abiertas.`,`OperatoryCard onToggle`],[`Patients today`,`Los turnos del día de esa sala, calculados de la lista del día.`,`turnos filtrados por sala`]]})]})},w={parameters:b,render:()=>(0,m.jsx)(l,{children:(0,m.jsxs)(`div`,{className:`grid gap-6 md:grid-cols-2`,children:[(0,m.jsx)(o,{titulo:`Few rooms`,nota:`Tres salas.`,children:(0,m.jsx)(x,{ancho:340,children:(0,m.jsx)(p,{rooms:_(3),turnos:v(3),onSelect:()=>{}})})}),(0,m.jsx)(o,{titulo:`Many rooms`,nota:`Diez: el panel del Dashboard scrollea adentro; la página no.`,children:(0,m.jsx)(x,{ancho:340,children:(0,m.jsx)(p,{rooms:_(10),turnos:v(10),onSelect:()=>{}})})}),(0,m.jsx)(o,{titulo:`Narrow (250px)`,nota:`El ancho de la columna a 1280px.`,children:(0,m.jsx)(x,{ancho:250,children:(0,m.jsx)(p,{rooms:_(3),turnos:v(3),onSelect:()=>{}})})}),(0,m.jsx)(o,{titulo:`Empty`,nota:`Sin salas no se dibuja nada.`,children:(0,m.jsxs)(x,{ancho:340,children:[(0,m.jsx)(p,{rooms:[],turnos:[]}),(0,m.jsx)(`p`,{className:`text-[12px] text-ink-muted`,children:`(nothing drawn)`})]})})]})})},T={parameters:b,render:()=>(0,m.jsx)(l,{children:(0,m.jsx)(d,{titulo:`Behavior`,nota:`De OperatoryList.tsx.`,children:(0,m.jsxs)(s,{encabezado:[`Part`,`Value`],minimo:480,children:[(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Gap`}),(0,m.jsx)(`td`,{className:`tabular-nums`,children:`10px`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Open at start`}),(0,m.jsx)(`td`,{children:`Ninguna`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Several open`}),(0,m.jsx)(`td`,{children:`Sí, cada una por su cuenta`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Effect on other panels`}),(0,m.jsx)(`td`,{children:`Ninguno: la Waiting Room es independiente`})]})]})})})},E=[`Playground`,`Parts`,`States`,`Specs`],S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: a => <Panel ancho={a.width}><OperatoryList key={a.rooms} rooms={salas(a.rooms)} turnos={turnos(Math.max(1, a.rooms))} onSelect={() => {}} /></Panel>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque nota="Seis salas cerradas: se ve el estado, los turnos y el profesional de todas de un vistazo; tocá una para ver su día.">
        <Panel ancho={340}><OperatoryList rooms={salas(6)} turnos={turnos(6)} onSelect={() => {}} /></Panel>
      </Bloque>
      <TablaPartes partes={[['List', 'Una columna de OperatoryCard con 10px entre una y otra; role group "Rooms".', 'OperatoryList'], ['Card', 'Cada sala es un acordeón independiente; puede haber varias abiertas.', 'OperatoryCard onToggle'], ['Patients today', 'Los turnos del día de esa sala, calculados de la lista del día.', 'turnos filtrados por sala']]} />
    </Lienzo>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="Few rooms" nota="Tres salas.">
          <Panel ancho={340}><OperatoryList rooms={salas(3)} turnos={turnos(3)} onSelect={() => {}} /></Panel>
        </Muestra>
        <Muestra titulo="Many rooms" nota="Diez: el panel del Dashboard scrollea adentro; la página no.">
          <Panel ancho={340}><OperatoryList rooms={salas(10)} turnos={turnos(10)} onSelect={() => {}} /></Panel>
        </Muestra>
        <Muestra titulo="Narrow (250px)" nota="El ancho de la columna a 1280px.">
          <Panel ancho={250}><OperatoryList rooms={salas(3)} turnos={turnos(3)} onSelect={() => {}} /></Panel>
        </Muestra>
        <Muestra titulo="Empty" nota="Sin salas no se dibuja nada.">
          <Panel ancho={340}><OperatoryList rooms={[]} turnos={[]} /><p className="text-[12px] text-ink-muted">(nothing drawn)</p></Panel>
        </Muestra>
      </div>
    </Lienzo>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Behavior" nota="De OperatoryList.tsx.">
        <Tabla encabezado={['Part', 'Value']} minimo={480}>
          <tr><td className="font-semibold">Gap</td><td className="tabular-nums">10px</td></tr>
          <tr><td className="font-semibold">Open at start</td><td>Ninguna</td></tr>
          <tr><td className="font-semibold">Several open</td><td>Sí, cada una por su cuenta</td></tr>
          <tr><td className="font-semibold">Effect on other panels</td><td>Ninguno: la Waiting Room es independiente</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...T.parameters?.docs?.source}}}})))()}D();export{C as Parts,S as Playground,T as Specs,w as States,E as __namedExportsOrder,y as default};