import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,t as i}from"./rotate-ccw-DFFaufhz.js";import{a,r as o}from"./button-DhtV2iTj.js";import{B as s,H as c,U as l,V as u,W as d}from"./iframe-CjFu_pIc.js";import{a as f,c as p,d as m,i as h,l as g,p as _,t as v,u as y}from"./kit-CWUgB5-0.js";function b(){let[e,t]=(0,S.useState)(0);return(0,C.jsxs)(`div`,{className:`flex flex-col items-start gap-3`,children:[(0,C.jsx)(D,{children:(0,C.jsx)(c,{fecha:w,animar:`siempre`},e)}),(0,C.jsxs)(o,{variant:`secondary`,size:`sm`,onClick:()=>t(e=>e+1),children:[(0,C.jsx)(i,{}),` Replay`]})]})}function x(){let{ref:e,m:t}=_(`p`);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(`div`,{ref:e,children:(0,C.jsx)(D,{children:(0,C.jsx)(c,{fecha:w,fase:`fecha`})})}),(0,C.jsx)(p,{encabezado:[`Part`,`Text`,`Gap`],minimo:420,children:(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Greeting`}),(0,C.jsxs)(`td`,{className:`tabular-nums`,children:[t?.texto,` · `,t?.peso]}),(0,C.jsx)(`td`,{className:`tabular-nums`,children:t?.gap})]})})]})}var S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R;function z(){return(z=e((()=>{S=t(),r(),d(),a(),m(),C=n(),w=new Date(2026,1,28),T={title:`Components/Layout/Greeting`,parameters:{layout:`padded`,docs:{description:{component:['El saludo del Topbar (`@/components/layout/Saludo`, Julián, 2026-10-13): **"Hi! Dentist Sarah" se escribe letra por letra**, se borra y en su lugar se escribe **la fecha del día** ("Saturday - February 28, 2026"), con el calendario en vez de la mano.',``,`**Cuándo se anima:** una vez por sesión del navegador; al recargar o volver a entrar en la misma pestaña va la fecha directo. Con *reducir movimiento* activado, también la fecha directo. El lector de pantalla lee saludo y fecha juntos, nunca letra por letra. Se ve desde 1024px, como el saludo de antes.`,``,`**Probalo:** en *Playground* elegí la animación o cada estado fijo desde *Controls*; "Replay" la vuelve a escribir.`].join(`
`)}}},args:{mode:`Animated`},argTypes:{mode:{control:`inline-radio`,options:[`Animated`,`Greeting`,`Date`],description:`La animación completa o un estado fijo.`}}},E={controls:{disable:!0}},D=({children:e})=>(0,C.jsx)(`div`,{className:`flex h-16 items-center rounded-lg bg-white px-4 shadow-panel`,children:e}),O={render:e=>e.mode===`Animated`?(0,C.jsx)(b,{}):(0,C.jsx)(D,{children:(0,C.jsx)(c,{fecha:w,fase:e.mode===`Greeting`?`saludo`:`fecha`})})},k={parameters:E,render:()=>(0,C.jsxs)(h,{children:[(0,C.jsx)(v,{nota:`Primero el saludo con la mano; después la fecha con el calendario.`,children:(0,C.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,C.jsx)(D,{children:(0,C.jsx)(c,{fecha:w,fase:`saludo`})}),(0,C.jsx)(D,{children:(0,C.jsx)(c,{fecha:w,fase:`fecha`})})]})}),(0,C.jsx)(g,{partes:[[`Icon`,`La mano 👋 con el saludo; el calendario 📅 con la fecha, que entra con un giro corto. Los dos son emoji (3D).`,`Saludo`],[`Text`,`16px Regular negro, en una línea. El saludo es el del Figma; la fecha, "Weekday - Month D, YYYY".`,`SALUDO · fechaDelDia`],[`Caret`,`Barra azul de 2px que titila mientras se escribe; se va al terminar.`,`saludo-cursor`],[`Reserved width`,`Una copia invisible del texto más largo: la barra de arriba no se corre mientras se escribe.`,`grid`],[`Screen reader text`,`Saludo y fecha en un texto oculto; la parte animada va con aria-hidden.`,`sr-only`]]})]})},A={parameters:E,render:()=>(0,C.jsxs)(h,{children:[(0,C.jsxs)(`div`,{className:`grid gap-6 md:grid-cols-2`,children:[(0,C.jsx)(f,{titulo:`Typing (first visit)`,nota:`La animación completa, la primera vez en la sesión.`,children:(0,C.jsx)(b,{})}),(0,C.jsx)(f,{titulo:`Greeting`,nota:`El saludo completo, antes de borrarse.`,children:(0,C.jsx)(D,{children:(0,C.jsx)(c,{fecha:w,fase:`saludo`})})}),(0,C.jsx)(f,{titulo:`Date (end)`,nota:`Así queda, y así se ve directo al volver en la misma sesión o con reducir movimiento.`,children:(0,C.jsx)(D,{children:(0,C.jsx)(c,{fecha:w,animar:`nunca`})})})]}),(0,C.jsx)(f,{titulo:`Longest date`,nota:`El día y el mes más largos (unos 300px): entra igual en una línea; el Topbar lo muestra desde 1024px.`,children:(0,C.jsx)(D,{children:(0,C.jsx)(c,{fecha:new Date(2026,8,30),animar:`nunca`})})})]})},{letra:j,pausa:M,borrar:N,antesDeLaFecha:P}=u,F=l(w),I=s.length*j+M+s.length*N+P+F.length*j,L={parameters:E,render:()=>(0,C.jsxs)(h,{children:[(0,C.jsx)(v,{titulo:`Size`,nota:`Leído del saludo dibujado.`,children:(0,C.jsx)(x,{})}),(0,C.jsx)(v,{titulo:`Timing`,nota:`De SALUDO_TIEMPOS (Saludo.tsx).`,children:(0,C.jsxs)(p,{encabezado:[`Step`,`Time`],minimo:420,children:[(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Each letter`}),(0,C.jsxs)(`td`,{className:`tabular-nums`,children:[j,`ms`]})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Full greeting on screen`}),(0,C.jsxs)(`td`,{className:`tabular-nums`,children:[M,`ms`]})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Each letter erased`}),(0,C.jsxs)(`td`,{className:`tabular-nums`,children:[N,`ms`]})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Before the date`}),(0,C.jsxs)(`td`,{className:`tabular-nums`,children:[P,`ms`]})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsxs)(`td`,{className:`font-semibold`,children:[`Whole animation (`,F,`)`]}),(0,C.jsxs)(`td`,{className:`tabular-nums`,children:[(I/1e3).toFixed(1),`s`]})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Caret blink`}),(0,C.jsx)(`td`,{className:`tabular-nums`,children:`1s`})]})]})}),(0,C.jsx)(v,{titulo:`Colors`,children:(0,C.jsxs)(p,{encabezado:[`Part`,`Token`],minimo:420,children:[(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Text`}),(0,C.jsx)(`td`,{children:`black`})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Calendar icon and caret`}),(0,C.jsx)(`td`,{children:(0,C.jsx)(y,{nombre:`dash-blue`})})]})]})})]})},R=[`Playground`,`Parts`,`States`,`Specs`],O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: a => a.mode === 'Animated' ? <Animado /> : <Barra><Saludo fecha={DIA} fase={a.mode === 'Greeting' ? 'saludo' : 'fecha'} /></Barra>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque nota="Primero el saludo con la mano; después la fecha con el calendario.">
        <div className="flex flex-col gap-3">
          <Barra><Saludo fecha={DIA} fase="saludo" /></Barra>
          <Barra><Saludo fecha={DIA} fase="fecha" /></Barra>
        </div>
      </Bloque>
      <TablaPartes partes={[['Icon', 'La mano 👋 con el saludo; el calendario 📅 con la fecha, que entra con un giro corto. Los dos son emoji (3D).', 'Saludo'], ['Text', '16px Regular negro, en una línea. El saludo es el del Figma; la fecha, "Weekday - Month D, YYYY".', 'SALUDO · fechaDelDia'], ['Caret', 'Barra azul de 2px que titila mientras se escribe; se va al terminar.', 'saludo-cursor'], ['Reserved width', 'Una copia invisible del texto más largo: la barra de arriba no se corre mientras se escribe.', 'grid'], ['Screen reader text', 'Saludo y fecha en un texto oculto; la parte animada va con aria-hidden.', 'sr-only']]} />
    </Lienzo>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="Typing (first visit)" nota="La animación completa, la primera vez en la sesión.">
          <Animado />
        </Muestra>
        <Muestra titulo="Greeting" nota="El saludo completo, antes de borrarse.">
          <Barra><Saludo fecha={DIA} fase="saludo" /></Barra>
        </Muestra>
        <Muestra titulo="Date (end)" nota="Así queda, y así se ve directo al volver en la misma sesión o con reducir movimiento.">
          <Barra><Saludo fecha={DIA} animar="nunca" /></Barra>
        </Muestra>
      </div>
      <Muestra titulo="Longest date" nota="El día y el mes más largos (unos 300px): entra igual en una línea; el Topbar lo muestra desde 1024px.">
        <Barra><Saludo fecha={new Date(2026, 8, 30)} animar="nunca" /></Barra>
      </Muestra>
    </Lienzo>
}`,...A.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Size" nota="Leído del saludo dibujado.">
        <MedidaTexto />
      </Bloque>
      <Bloque titulo="Timing" nota="De SALUDO_TIEMPOS (Saludo.tsx).">
        <Tabla encabezado={['Step', 'Time']} minimo={420}>
          <tr><td className="font-semibold">Each letter</td><td className="tabular-nums">{letra}ms</td></tr>
          <tr><td className="font-semibold">Full greeting on screen</td><td className="tabular-nums">{pausa}ms</td></tr>
          <tr><td className="font-semibold">Each letter erased</td><td className="tabular-nums">{borrar}ms</td></tr>
          <tr><td className="font-semibold">Before the date</td><td className="tabular-nums">{antesDeLaFecha}ms</td></tr>
          <tr><td className="font-semibold">Whole animation ({fechaEjemplo})</td><td className="tabular-nums">{(total / 1000).toFixed(1)}s</td></tr>
          <tr><td className="font-semibold">Caret blink</td><td className="tabular-nums">1s</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Part', 'Token']} minimo={420}>
          <tr><td className="font-semibold">Text</td><td>black</td></tr>
          <tr><td className="font-semibold">Calendar icon and caret</td><td><Token nombre="dash-blue" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...L.parameters?.docs?.source}}}})))()}z();export{k as Parts,O as Playground,L as Specs,A as States,R as __namedExportsOrder,T as default};