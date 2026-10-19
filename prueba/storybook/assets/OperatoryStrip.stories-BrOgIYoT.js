import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,c as i,d as a,i as o,l as s,t as c}from"./kit-CWUgB5-0.js";import{n as l,t as u}from"./OperatoryStrip-Aw15hxXB.js";function d({rooms:e,inicial:t}){let[n,r]=(0,f.useState)(t??null);return(0,p.jsx)(u,{rooms:e,elegida:n,onElegir:r})}var f,p,m,h,g,_,v,y,b,x,S,C;function w(){return(w=e((()=>{f=t(),l(),a(),p=n(),m=[`Available`,`Busy`,`Busy`,`Busy`,`Unavailable`,`Available`],h=e=>Array.from({length:e},(e,t)=>({name:`Operatory ${t+1}`,status:m[t%m.length],patientsToday:t*2%5,provider:`Daniel Anderson`})),g={title:`Components/Dashboard/Operatory strip`,parameters:{layout:`padded`,docs:{description:{component:["Las salas del Dashboard en **una tira arriba de los turnos** (`@/components/dashboard/OperatoryStrip`, Julián, 2026-10-13): antes ocupaban una columna entera al lado de Appointments y Waiting Room; arriba no le roban ancho a los turnos.",``,`**Scroll horizontal** (2026-10-19): una sola fila, sin importar cuántas salas haya. Cada card mide al menos 232px y se desliza; la que asoma por el borde avisa que hay más. Con pocas salas se reparten el ancho. Sin salas no se dibuja.`,``,`**Elegir una sala es opcional:** tocarla filtra la Waiting Room del Dashboard (lleva el anillo azul y las demás se apagan); tocarla de nuevo la suelta. Appointments siempre muestra todas las salas y se filtra con su propio botón Filter. Cada sala toma el color de su estado.`,``,`**Probalo:** en *Playground* cambiá la cantidad de salas y el ancho desde *Controls*; tocá una sala y deslizá la tira.`].join(`
`)}}},args:{rooms:8,width:1e3},argTypes:{rooms:{control:{type:`range`,min:0,max:14},description:`Cuántas salas tiene la clínica.`},width:{control:{type:`range`,min:340,max:1800,step:10},description:`Ancho de la tira. 1352 es el del Dashboard a 1440px.`}}},_={controls:{disable:!0}},v=({ancho:e,children:t})=>(0,p.jsx)(`div`,{className:`max-w-full rounded-lg bg-page-background p-4`,style:{width:e+32},children:t}),y={render:e=>(0,p.jsx)(v,{ancho:e.width,children:(0,p.jsx)(d,{rooms:h(e.rooms)},e.rooms)})},b={parameters:_,render:()=>(0,p.jsxs)(o,{className:`max-w-[1400px]`,children:[(0,p.jsx)(c,{nota:`A 1000px entran cuatro y la quinta asoma: se desliza para ver el resto.`,children:(0,p.jsx)(v,{ancho:1e3,children:(0,p.jsx)(d,{rooms:h(8)})})}),(0,p.jsx)(s,{partes:[[`Row`,`Una sola fila con scroll horizontal; cada card mide al menos 232px y, con pocas salas, se reparten el ancho.`,`OperatoryStrip`],[`Card`,`La sala, con el color de su estado.`,`OperatoryCard enPagina`],[`Selection`,`Opcional: la elegida lleva el anillo azul y las demás van al 60%. Tocar una filtra la Waiting Room; tocarla de nuevo la suelta.`,`elegida · onElegir`],[`Snap`,`Al soltar el deslizamiento, la tira se acomoda en el borde de una card, sin dejarla cortada a la mitad.`,`snap-x`]]})]})},x={parameters:_,render:()=>(0,p.jsxs)(o,{className:`max-w-[1400px]`,children:[(0,p.jsx)(r,{titulo:`All fit`,nota:`Cuatro salas a 1352px: se reparten el ancho, sin scroll.`,children:(0,p.jsx)(v,{ancho:1352,children:(0,p.jsx)(d,{rooms:h(4)})})}),(0,p.jsx)(r,{titulo:`Scrolling`,nota:`Ocho salas a 1000px: entran cuatro y la quinta asoma por el borde.`,children:(0,p.jsx)(v,{ancho:1e3,children:(0,p.jsx)(d,{rooms:h(8)})})}),(0,p.jsx)(r,{titulo:`Another one selected`,nota:`Operatory 3 elegida: anillo azul; las demás al 60% hasta el hover.`,children:(0,p.jsx)(v,{ancho:1352,children:(0,p.jsx)(d,{rooms:h(5),inicial:`Operatory 3`})})}),(0,p.jsxs)(`div`,{className:`grid gap-6 md:grid-cols-2`,children:[(0,p.jsx)(r,{titulo:`Tablet (662px)`,nota:`Dos y media a la vista.`,children:(0,p.jsx)(v,{ancho:662,children:(0,p.jsx)(d,{rooms:h(6)})})}),(0,p.jsx)(r,{titulo:`Phone (358px)`,nota:`Una y un pedazo de la siguiente: el gesto de deslizar se entiende solo.`,children:(0,p.jsx)(v,{ancho:358,children:(0,p.jsx)(d,{rooms:h(6)})})})]}),(0,p.jsx)(r,{titulo:`Empty`,nota:`Sin salas no se dibuja nada.`,children:(0,p.jsxs)(v,{ancho:600,children:[(0,p.jsx)(u,{rooms:[]}),(0,p.jsx)(`p`,{className:`text-[12px] text-ink-muted`,children:`(nothing drawn)`})]})})]})},S={parameters:_,render:()=>(0,p.jsxs)(o,{children:[(0,p.jsx)(c,{titulo:`Behavior`,nota:`De OperatoryStrip.tsx.`,children:(0,p.jsxs)(i,{encabezado:[`Part`,`Value`],minimo:480,children:[(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Card min width`}),(0,p.jsxs)(`td`,{className:`tabular-nums`,children:[232,`px (1fr cuando sobra lugar)`]})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Gap`}),(0,p.jsx)(`td`,{className:`tabular-nums`,children:`16px, el mismo que entre paneles`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Scroll`}),(0,p.jsx)(`td`,{children:`Horizontal, con snap al borde de la card; no contagia al scroll de la página`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Room selected`}),(0,p.jsx)(`td`,{children:`Ninguna por defecto; tocar la elegida la suelta`})]})]})}),(0,p.jsx)(c,{titulo:`Per screen`,nota:`Cuántas salas se ven completas en el Dashboard, con la barra lateral cerrada.`,children:(0,p.jsx)(i,{encabezado:[`Screen`,`Strip width`,`Rooms in view`],minimo:480,children:[[1920,1752],[1440,1352],[1280,1174],[1024,918],[768,662],[390,358]].map(([e,t])=>(0,p.jsxs)(`tr`,{children:[(0,p.jsxs)(`td`,{className:`tabular-nums`,children:[e,`px`]}),(0,p.jsxs)(`td`,{className:`tabular-nums`,children:[t,`px`]}),(0,p.jsx)(`td`,{className:`tabular-nums`,children:Math.max(1,Math.floor((t+16)/248))})]},e))})})]})},C=[`Playground`,`Parts`,`States`,`Specs`],y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: a => <Pagina ancho={a.width}><Elegible key={a.rooms} rooms={salas(a.rooms)} /></Pagina>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo className="max-w-[1400px]">
      <Bloque nota="A 1000px entran cuatro y la quinta asoma: se desliza para ver el resto.">
        <Pagina ancho={1000}><Elegible rooms={salas(8)} /></Pagina>
      </Bloque>
      <TablaPartes partes={[['Row', 'Una sola fila con scroll horizontal; cada card mide al menos 232px y, con pocas salas, se reparten el ancho.', 'OperatoryStrip'], ['Card', 'La sala, con el color de su estado.', 'OperatoryCard enPagina'], ['Selection', 'Opcional: la elegida lleva el anillo azul y las demás van al 60%. Tocar una filtra la Waiting Room; tocarla de nuevo la suelta.', 'elegida · onElegir'], ['Snap', 'Al soltar el deslizamiento, la tira se acomoda en el borde de una card, sin dejarla cortada a la mitad.', 'snap-x']]} />
    </Lienzo>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo className="max-w-[1400px]">
      <Muestra titulo="All fit" nota="Cuatro salas a 1352px: se reparten el ancho, sin scroll.">
        <Pagina ancho={1352}><Elegible rooms={salas(4)} /></Pagina>
      </Muestra>
      <Muestra titulo="Scrolling" nota="Ocho salas a 1000px: entran cuatro y la quinta asoma por el borde.">
        <Pagina ancho={1000}><Elegible rooms={salas(8)} /></Pagina>
      </Muestra>
      <Muestra titulo="Another one selected" nota="Operatory 3 elegida: anillo azul; las demás al 60% hasta el hover.">
        <Pagina ancho={1352}><Elegible rooms={salas(5)} inicial="Operatory 3" /></Pagina>
      </Muestra>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="Tablet (662px)" nota="Dos y media a la vista.">
          <Pagina ancho={662}><Elegible rooms={salas(6)} /></Pagina>
        </Muestra>
        <Muestra titulo="Phone (358px)" nota="Una y un pedazo de la siguiente: el gesto de deslizar se entiende solo.">
          <Pagina ancho={358}><Elegible rooms={salas(6)} /></Pagina>
        </Muestra>
      </div>
      <Muestra titulo="Empty" nota="Sin salas no se dibuja nada.">
        <Pagina ancho={600}><OperatoryStrip rooms={[]} /><p className="text-[12px] text-ink-muted">(nothing drawn)</p></Pagina>
      </Muestra>
    </Lienzo>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Behavior" nota="De OperatoryStrip.tsx.">
        <Tabla encabezado={['Part', 'Value']} minimo={480}>
          <tr><td className="font-semibold">Card min width</td><td className="tabular-nums">{OPERATORY_MIN}px (1fr cuando sobra lugar)</td></tr>
          <tr><td className="font-semibold">Gap</td><td className="tabular-nums">16px, el mismo que entre paneles</td></tr>
          <tr><td className="font-semibold">Scroll</td><td>Horizontal, con snap al borde de la card; no contagia al scroll de la página</td></tr>
          <tr><td className="font-semibold">Room selected</td><td>Ninguna por defecto; tocar la elegida la suelta</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Per screen" nota="Cuántas salas se ven completas en el Dashboard, con la barra lateral cerrada.">
        <Tabla encabezado={['Screen', 'Strip width', 'Rooms in view']} minimo={480}>
          {[[1920, 1752], [1440, 1352], [1280, 1174], [1024, 918], [768, 662], [390, 358]].map(([pantalla, ancho]) => <tr key={pantalla}><td className="tabular-nums">{pantalla}px</td><td className="tabular-nums">{ancho}px</td><td className="tabular-nums">{Math.max(1, Math.floor((ancho! + 16) / (OPERATORY_MIN + 16)))}</td></tr>)}
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...S.parameters?.docs?.source}}}})))()}w();export{b as Parts,y as Playground,S as Specs,x as States,C as __namedExportsOrder,g as default};