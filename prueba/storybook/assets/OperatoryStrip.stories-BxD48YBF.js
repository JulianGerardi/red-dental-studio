import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,c as i,d as a,i as o,l as s,r as c,t as l}from"./kit-CWUgB5-0.js";import{n as u,t as d}from"./OperatoryStrip-qzClkFlu.js";function f({ancho:e,children:t}){let n=(0,p.useRef)(null),r=(0,p.useRef)(null),[i,a]=(0,p.useState)({escala:1,alto:0}),o=e+32;return(0,p.useLayoutEffect)(()=>{let e=()=>{let e=Math.min(1,(n.current?.clientWidth??o)/o);a({escala:e,alto:(r.current?.offsetHeight??0)*e})};e();let t=new ResizeObserver(e);return n.current&&t.observe(n.current),r.current&&t.observe(r.current),()=>t.disconnect()},[o]),(0,m.jsx)(`div`,{ref:n,className:`w-full overflow-hidden`,style:{height:i.alto||void 0},children:(0,m.jsx)(`div`,{ref:r,className:`rounded-lg bg-page-background p-4`,style:{width:o,transform:`scale(${i.escala})`,transformOrigin:`top left`},children:t})})}var p,m,h,g,_,v,y,b,x,S,C,w;function T(){return(T=e((()=>{p=t(),u(),a(),m=n(),h=[`Available`,`Busy`,`Busy`,`Busy`,`Unavailable`,`Busy`],g=e=>Array.from({length:e},(e,t)=>({name:`Operatory name`,status:h[t%h.length],patientsToday:12,provider:`Daniel Anderson`})),_=e=>Math.max(1,Math.floor((e+16)/248)),v={title:`Components/Dashboard/Operatory strip`,parameters:{layout:`padded`,docs:{description:{component:["Las salas del Dashboard en **una tira arriba de los turnos** (`@/components/dashboard/OperatoryStrip`, Julián, 2026-10-13): antes ocupaban una columna entera al lado de Appointments y Waiting Room; arriba no le roban ancho a los turnos.",``,`**Cómo se comporta:** una fila de *OperatoryCard* sobre la página que **llena el ancho**. Cuántas entran sale del ancho (cada card mide al menos 232px, lo justo para el nombre con la pill más larga); las que no entran van a **"Show N more"**, la regla de listas largas (*Elements / Show more*). Con menos salas que lugares, las que hay se reparten el ancho. Sin salas no se dibuja.`,``,`**Probalo:** en *Playground* cambiá la cantidad de salas y el ancho desde *Controls*; tocá "Show N more".`].join(`
`)}}},args:{rooms:6,width:1352},argTypes:{rooms:{control:{type:`range`,min:0,max:14},description:`Cuántas salas tiene la clínica.`},width:{control:{type:`range`,min:340,max:1800,step:10},description:`Ancho de la tira. 1352 es el del Dashboard a 1440px.`}}},y={controls:{disable:!0}},b={render:e=>(0,m.jsx)(f,{ancho:e.width,children:(0,m.jsx)(d,{rooms:g(e.rooms)})})},x={parameters:y,render:()=>(0,m.jsxs)(o,{className:`max-w-[1400px]`,children:[(0,m.jsx)(l,{nota:`A 1440px (tira de 1352px, acá a escala) entran cinco: la sexta queda en Show 1 more.`,children:(0,m.jsx)(f,{ancho:1352,children:(0,m.jsx)(d,{rooms:g(6)})})}),(0,m.jsx)(s,{partes:[[`Row`,`Una fila que llena el ancho: tantas columnas como entran de 232px, nunca más que las salas.`,`OperatoryStrip`],[`Card`,`La sala, como card de página (sombra, sin borde).`,`OperatoryCard enPagina`],[`Show N more`,`Las que no entran; abre el resto en filas, con scroll si hace falta.`,`ShowMore`]]})]})},S={parameters:y,render:()=>(0,m.jsxs)(o,{className:`max-w-[1400px]`,children:[(0,m.jsx)(r,{titulo:`All fit`,nota:`Cuatro salas a 1352px: se reparten el ancho, sin hueco a la derecha y sin botón.`,children:(0,m.jsx)(f,{ancho:1352,children:(0,m.jsx)(d,{rooms:g(4)})})}),(0,m.jsx)(r,{titulo:`More than fit`,nota:`Doce salas: una fila y Show N more.`,children:(0,m.jsx)(f,{ancho:1352,children:(0,m.jsx)(d,{rooms:g(12)})})}),(0,m.jsx)(r,{titulo:`Open`,nota:`Todas, en filas; con muchas, scroll adentro.`,children:(0,m.jsx)(c,{selector:`[data-show-more]`,estado:`click`,children:(0,m.jsx)(f,{ancho:1352,children:(0,m.jsx)(d,{rooms:g(12)})})})}),(0,m.jsx)(r,{titulo:`Tablet (662px)`,nota:`Dos por fila.`,children:(0,m.jsx)(f,{ancho:662,children:(0,m.jsx)(d,{rooms:g(6)})})}),(0,m.jsx)(`div`,{className:`grid gap-6 md:grid-cols-2`,children:(0,m.jsx)(r,{titulo:`Phone (358px)`,nota:`Una sola y el resto en Show N more: los turnos quedan cerca.`,children:(0,m.jsx)(f,{ancho:358,children:(0,m.jsx)(d,{rooms:g(6)})})})}),(0,m.jsx)(r,{titulo:`Empty`,nota:`Sin salas no se dibuja nada.`,children:(0,m.jsxs)(f,{ancho:600,children:[(0,m.jsx)(d,{rooms:[]}),(0,m.jsx)(`p`,{className:`text-[12px] text-ink-muted`,children:`(nothing drawn)`})]})})]})},C={parameters:y,render:()=>(0,m.jsxs)(o,{children:[(0,m.jsx)(l,{titulo:`Behavior`,nota:`De OperatoryStrip.tsx.`,children:(0,m.jsxs)(i,{encabezado:[`Part`,`Value`],minimo:480,children:[(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Card min width`}),(0,m.jsxs)(`td`,{className:`tabular-nums`,children:[232,`px`]})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Gap`}),(0,m.jsx)(`td`,{className:`tabular-nums`,children:`16px, the same as between panels`})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Columns`}),(0,m.jsxs)(`td`,{className:`font-mono text-[12px]`,children:[`min(floor((width + 16) / `,248,`), rooms)`]})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Fade when open`}),(0,m.jsx)(`td`,{children:`from page-background`})]})]})}),(0,m.jsx)(l,{titulo:`Per screen`,nota:`Cuántas salas se ven en una fila en el Dashboard, con la barra lateral cerrada.`,children:(0,m.jsx)(i,{encabezado:[`Screen`,`Strip width`,`Rooms in a row`],minimo:480,children:[[1920,1752],[1440,1352],[1280,1174],[1024,918],[768,662],[390,358]].map(([e,t])=>(0,m.jsxs)(`tr`,{children:[(0,m.jsxs)(`td`,{className:`tabular-nums`,children:[e,`px`]}),(0,m.jsxs)(`td`,{className:`tabular-nums`,children:[t,`px`]}),(0,m.jsx)(`td`,{className:`tabular-nums`,children:_(t)})]},e))})})]})},w=[`Playground`,`Parts`,`States`,`Specs`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: a => <Pagina ancho={a.width}><OperatoryStrip rooms={salas(a.rooms)} /></Pagina>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo className="max-w-[1400px]">
      <Bloque nota="A 1440px (tira de 1352px, acá a escala) entran cinco: la sexta queda en Show 1 more.">
        <Pagina ancho={1352}><OperatoryStrip rooms={salas(6)} /></Pagina>
      </Bloque>
      <TablaPartes partes={[['Row', 'Una fila que llena el ancho: tantas columnas como entran de 232px, nunca más que las salas.', 'OperatoryStrip'], ['Card', 'La sala, como card de página (sombra, sin borde).', 'OperatoryCard enPagina'], ['Show N more', 'Las que no entran; abre el resto en filas, con scroll si hace falta.', 'ShowMore']]} />
    </Lienzo>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo className="max-w-[1400px]">
      <Muestra titulo="All fit" nota="Cuatro salas a 1352px: se reparten el ancho, sin hueco a la derecha y sin botón.">
        <Pagina ancho={1352}><OperatoryStrip rooms={salas(4)} /></Pagina>
      </Muestra>
      <Muestra titulo="More than fit" nota="Doce salas: una fila y Show N more.">
        <Pagina ancho={1352}><OperatoryStrip rooms={salas(12)} /></Pagina>
      </Muestra>
      <Muestra titulo="Open" nota="Todas, en filas; con muchas, scroll adentro.">
        <Forzar selector="[data-show-more]" estado="click">
          <Pagina ancho={1352}><OperatoryStrip rooms={salas(12)} /></Pagina>
        </Forzar>
      </Muestra>
      <Muestra titulo="Tablet (662px)" nota="Dos por fila.">
        <Pagina ancho={662}><OperatoryStrip rooms={salas(6)} /></Pagina>
      </Muestra>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="Phone (358px)" nota="Una sola y el resto en Show N more: los turnos quedan cerca.">
          <Pagina ancho={358}><OperatoryStrip rooms={salas(6)} /></Pagina>
        </Muestra>
      </div>
      <Muestra titulo="Empty" nota="Sin salas no se dibuja nada.">
        <Pagina ancho={600}><OperatoryStrip rooms={[]} /><p className="text-[12px] text-ink-muted">(nothing drawn)</p></Pagina>
      </Muestra>
    </Lienzo>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Behavior" nota="De OperatoryStrip.tsx.">
        <Tabla encabezado={['Part', 'Value']} minimo={480}>
          <tr><td className="font-semibold">Card min width</td><td className="tabular-nums">{OPERATORY_MIN}px</td></tr>
          <tr><td className="font-semibold">Gap</td><td className="tabular-nums">16px, the same as between panels</td></tr>
          <tr><td className="font-semibold">Columns</td><td className="font-mono text-[12px]">min(floor((width + 16) / {OPERATORY_MIN + 16}), rooms)</td></tr>
          <tr><td className="font-semibold">Fade when open</td><td>from page-background</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Per screen" nota="Cuántas salas se ven en una fila en el Dashboard, con la barra lateral cerrada.">
        <Tabla encabezado={['Screen', 'Strip width', 'Rooms in a row']} minimo={480}>
          {[[1920, 1752], [1440, 1352], [1280, 1174], [1024, 918], [768, 662], [390, 358]].map(([pantalla, ancho]) => <tr key={pantalla}><td className="tabular-nums">{pantalla}px</td><td className="tabular-nums">{ancho}px</td><td className="tabular-nums">{entran(ancho!)}</td></tr>)}
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...C.parameters?.docs?.source}}}})))()}T();export{x as Parts,b as Playground,C as Specs,S as States,w as __namedExportsOrder,v as default};