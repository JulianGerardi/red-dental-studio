import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{n,t as r}from"./utils-D-bRdWGo.js";import{t as i}from"./jsx-runtime-DeHZSEgm.js";import{i as a,n as o,r as s,t as c}from"./primitives-DgkYwkES.js";import{n as l,t as u}from"./empty-state-yo-tjb-R.js";import{Jl as d,Qt as f,Yl as p,Zt as m}from"./iframe-C_MDRs1G.js";import{c as h,d as g,i as _,l as v,s as y,t as b}from"./kit-VhBMbBcY.js";function x({tipo:e}){let[t,n]=(0,E.useState)(`All`);return e===`tabs`?(0,D.jsx)(m,{size:`sm`,"aria-label":`Filter activity`,tabs:k,value:t,onChange:n}):e===`link`?(0,D.jsx)(`button`,{type:`button`,className:`text-dash-blue shrink-0 text-[12px] font-semibold hover:underline`,children:`View all`}):null}function S({title:e,controls:t,cards:n}){return(0,D.jsx)(o,{title:e,controls:(0,D.jsx)(x,{tipo:t}),className:`max-w-full`,bodyClassName:`min-h-[120px]`,children:n===0?(0,D.jsx)(u,{icon:d,title:`Nothing here yet`,detail:`The panel says why it is empty and what to do.`,className:`py-6`}):Array.from({length:n},(e,t)=>(0,D.jsxs)(c,{className:`p-3 text-[13px] text-ink-muted`,children:[`InnerCard `,t+1]},t))})}function C({nombre:e,children:t,className:n,izquierda:i}){return(0,D.jsxs)(`div`,{className:r(`relative outline outline-1 outline-dashed outline-dash-blue/50 -outline-offset-1`,n),children:[(0,D.jsx)(`span`,{className:r(`bg-dash-blue absolute -top-2 z-10 rounded px-1.5 text-[10px] leading-4 font-semibold text-white`,i?`left-2`:`right-2`),children:e}),t]})}function w({titulo:e,nota:t,ancho:n,children:r}){return(0,D.jsxs)(`figure`,{className:`m-0 flex max-w-full flex-col gap-2`,style:{width:n},children:[(0,D.jsxs)(`figcaption`,{className:`flex flex-col gap-0.5`,children:[(0,D.jsx)(`span`,{className:`text-[12.5px] font-semibold text-ink`,children:e}),(0,D.jsx)(`span`,{className:`text-[11.5px] leading-snug text-ink-muted`,children:t})]}),r]})}function T({nombre:e,selector:t,children:n}){let{ref:r,m:i}=g(t);return(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:e}),(0,D.jsx)(`td`,{children:(0,D.jsx)(`div`,{ref:r,className:`w-[340px]`,children:n})}),(0,D.jsx)(`td`,{className:`tabular-nums`,children:i?.alto}),(0,D.jsx)(`td`,{className:`tabular-nums`,children:i?.padding}),(0,D.jsx)(`td`,{className:`tabular-nums`,children:i?`${i.texto} · ${i.peso}`:``})]})}var E,D,O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{E=t(),p(),a(),f(),l(),v(),n(),D=i(),O={title:`Components/Dashboard/Panel and StatusPill`,parameters:{layout:`padded`,docs:{description:{component:["El **panel** (`Panel` de `@/components/dashboard/primitives`) es la card de página con título: Appointments, Waiting Room, Rooms y Pending Task del Dashboard, Today Appointments de Patients y Recent Billing Activity, Find Patient y Today de Billing. Adentro van `InnerCard`, una tabla o un estado vacío.",``,`**Partes:** encabezado (título de 15px Bold, **sin ícono**, y a la derecha sus controles: un filtro, Tabs o *View all*) y cuerpo con 16px de aire y 12px entre piezas.`,``,`**El encabezado mide 52px** aunque los controles sean unas Tabs de 36px; si no entran al lado del título (en el celular), bajan a una segunda línea y el encabezado crece.`,``,`**Probalo:** en *Playground* cambiá título, controles, cantidad de cards y ancho desde *Controls*: con Tabs y menos de ~420px se ve el wrap.`].join(`
`)}}},args:{title:`Recent Billing Activity`,controls:`tabs`,cards:2,width:560},argTypes:{title:{control:`text`,description:`Título del panel. Sin ícono.`},controls:{control:`inline-radio`,options:[`none`,`tabs`,`link`],description:`A la derecha del título: nada, Tabs sm (Billing) o View all (Patients).`},cards:{control:{type:`range`,min:0,max:5,step:1},description:`InnerCards en el cuerpo. 0 muestra el estado vacío.`},width:{control:{type:`range`,min:300,max:760,step:20},description:`Ancho en px.`}},decorators:[e=>(0,D.jsx)(`div`,{className:`bg-page-background rounded-xl p-6`,children:(0,D.jsx)(e,{})})]},k=[`All`,`Pt Payment`,`Charge Adj`,`Credit Adj`],A={render:e=>(0,D.jsx)(`div`,{style:{width:e.width,maxWidth:`100%`},children:(0,D.jsx)(S,{...e})})},j=[[`Header`,`Mínimo 52px. Título a la izquierda y controles a la derecha; si no entran, los controles bajan a otra línea.`],[`Title`,`15px Bold, negro, sin ícono. Puede llevar un globo con el total (Today Appointments).`],[`Controls`,`Lo que cambia el contenido del panel: un filtro (Dashboard), Tabs sm (Billing) o View all (Patients).`],[`Body`,`16px de aire, 12px entre piezas. InnerCards, una tabla o un EmptyState.`]],M={parameters:{controls:{disable:!0}},render:()=>(0,D.jsxs)(`div`,{className:`flex flex-col gap-6`,children:[(0,D.jsx)(C,{nombre:`Panel`,izquierda:!0,className:`w-[560px] max-w-full rounded-lg`,children:(0,D.jsx)(o,{title:(0,D.jsx)(C,{nombre:`Title`,className:`inline-block`,children:`Recent Billing Activity`}),controls:(0,D.jsx)(C,{nombre:`Controls`,children:(0,D.jsx)(x,{tipo:`tabs`})}),children:(0,D.jsx)(C,{nombre:`Body`,children:(0,D.jsx)(c,{className:`p-3 text-[13px] text-ink-muted`,children:`InnerCard`})})})}),(0,D.jsx)(y,{encabezado:[`Part`,`What it does`],minimo:560,arriba:!0,children:j.map(([e,t])=>(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:e}),(0,D.jsx)(`td`,{className:`text-ink-medium`,children:t})]},e))})]})},N={parameters:{controls:{disable:!0}},render:()=>(0,D.jsxs)(`div`,{className:`flex flex-wrap items-start gap-x-6 gap-y-8`,children:[(0,D.jsx)(w,{titulo:`Title only`,nota:`Sin controles: el encabezado mide 52px igual.`,ancho:320,children:(0,D.jsx)(S,{title:`Today`,controls:`none`,cards:2})}),(0,D.jsx)(w,{titulo:`With tabs`,nota:`Tabs sm (36px) al lado del título: el encabezado sigue en 52px.`,ancho:560,children:(0,D.jsx)(S,{title:`Recent Billing Activity`,controls:`tabs`,cards:2})}),(0,D.jsx)(w,{titulo:`Narrow · tabs wrap`,nota:`En el celular (343px) las Tabs no entran al lado del título y bajan a una segunda línea. Si ni solas entran, se deslizan de costado.`,ancho:343,children:(0,D.jsx)(S,{title:`Recent Billing Activity`,controls:`tabs`,cards:1})}),(0,D.jsx)(w,{titulo:`With View all`,nota:`Un link chico a la derecha, como Today Appointments en Patients.`,ancho:320,children:(0,D.jsx)(S,{title:`Today Appointments`,controls:`link`,cards:2})}),(0,D.jsx)(w,{titulo:`Empty`,nota:`Sin contenido: el EmptyState dice por qué y qué hacer.`,ancho:320,children:(0,D.jsx)(S,{title:`Waiting Room`,controls:`none`,cards:0})}),(0,D.jsx)(w,{titulo:`StatusPill`,nota:`La pastilla de estado de Rooms y las cards del Dashboard.`,ancho:320,children:(0,D.jsxs)(`div`,{className:`flex gap-2`,children:[(0,D.jsx)(s,{tone:`ok`,children:`Available`}),(0,D.jsx)(s,{tone:`busy`,children:`Busy`}),(0,D.jsx)(s,{tone:`bad`,children:`Unavailable`})]})})]})},P={parameters:{controls:{disable:!0}},render:()=>(0,D.jsxs)(_,{children:[(0,D.jsx)(b,{titulo:`Sizes`,nota:`Medidas leídas de los paneles dibujados.`,children:(0,D.jsxs)(y,{encabezado:[`Part`,`Sample`,`Height`,`Padding`,`Text`],minimo:760,children:[(0,D.jsx)(T,{nombre:`Header`,selector:`header`,children:(0,D.jsx)(S,{title:`Today`,controls:`none`,cards:1})}),(0,D.jsx)(T,{nombre:`Header · narrow tabs`,selector:`header`,children:(0,D.jsx)(S,{title:`Recent Billing Activity`,controls:`tabs`,cards:1})}),(0,D.jsx)(T,{nombre:`Title`,selector:`h2`,children:(0,D.jsx)(S,{title:`Today`,controls:`none`,cards:1})}),(0,D.jsx)(T,{nombre:`Body`,selector:`section > div`,children:(0,D.jsx)(S,{title:`Today`,controls:`none`,cards:1})})]})}),(0,D.jsx)(b,{titulo:`Colors`,children:(0,D.jsxs)(y,{encabezado:[`Part`,`Token`],minimo:480,children:[(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Panel`}),(0,D.jsxs)(`td`,{children:[(0,D.jsx)(h,{nombre:`white`}),` · `,(0,D.jsx)(`code`,{children:`shadow-panel`}),`, no border`]})]}),(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Title`}),(0,D.jsxs)(`td`,{children:[(0,D.jsx)(h,{nombre:`black`}),` 15px Bold`]})]}),(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Inner card`}),(0,D.jsxs)(`td`,{children:[(0,D.jsx)(h,{nombre:`white`}),` · `,(0,D.jsx)(`code`,{children:`shadow-inner-card`})]})]})]})}),(0,D.jsx)(b,{titulo:`Rules`,children:(0,D.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,D.jsx)(`li`,{children:`The title has no icon.`}),(0,D.jsx)(`li`,{children:`The header is at least 52px, with 8px top and bottom and 20px on the sides; controls up to 36px (Tabs sm) fit without growing it.`}),(0,D.jsx)(`li`,{children:`If the controls do not fit next to the title, they wrap below it; they never squeeze or cut the title.`}),(0,D.jsx)(`li`,{children:`Everything inside the panel is an InnerCard, a table or an EmptyState, 12px apart.`})]})})]})},F=[`Playground`,`Parts`,`States`,`Specs`],A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: a => <div style={{
    width: a.width,
    maxWidth: '100%'
  }}><Armado {...a} /></div>
}`,...A.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div className="flex flex-col gap-6">
      <Parte nombre="Panel" izquierda className="w-[560px] max-w-full rounded-lg">
        <Panel title={<Parte nombre="Title" className="inline-block">Recent Billing Activity</Parte>} controls={<Parte nombre="Controls"><Controles tipo="tabs" /></Parte>}>
          <Parte nombre="Body"><InnerCard className="p-3 text-[13px] text-ink-muted">InnerCard</InnerCard></Parte>
        </Panel>
      </Parte>
      <Tabla encabezado={['Part', 'What it does']} minimo={560} arriba>
        {PARTES.map(([parte, que]) => <tr key={parte}><td className="font-semibold whitespace-nowrap">{parte}</td><td className="text-ink-medium">{que}</td></tr>)}
      </Tabla>
    </div>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
      <Estado titulo="Title only" nota="Sin controles: el encabezado mide 52px igual." ancho={320}><Armado title="Today" controls="none" cards={2} /></Estado>
      <Estado titulo="With tabs" nota="Tabs sm (36px) al lado del título: el encabezado sigue en 52px." ancho={560}><Armado title="Recent Billing Activity" controls="tabs" cards={2} /></Estado>
      <Estado titulo="Narrow · tabs wrap" nota="En el celular (343px) las Tabs no entran al lado del título y bajan a una segunda línea. Si ni solas entran, se deslizan de costado." ancho={343}><Armado title="Recent Billing Activity" controls="tabs" cards={1} /></Estado>
      <Estado titulo="With View all" nota="Un link chico a la derecha, como Today Appointments en Patients." ancho={320}><Armado title="Today Appointments" controls="link" cards={2} /></Estado>
      <Estado titulo="Empty" nota="Sin contenido: el EmptyState dice por qué y qué hacer." ancho={320}><Armado title="Waiting Room" controls="none" cards={0} /></Estado>
      <Estado titulo="StatusPill" nota="La pastilla de estado de Rooms y las cards del Dashboard." ancho={320}>
        <div className="flex gap-2">
          <StatusPill tone="ok">Available</StatusPill>
          <StatusPill tone="busy">Busy</StatusPill>
          <StatusPill tone="bad">Unavailable</StatusPill>
        </div>
      </Estado>
    </div>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Sizes" nota="Medidas leídas de los paneles dibujados.">
        <Tabla encabezado={['Part', 'Sample', 'Height', 'Padding', 'Text']} minimo={760}>
          <Medida nombre="Header" selector="header"><Armado title="Today" controls="none" cards={1} /></Medida>
          <Medida nombre="Header · narrow tabs" selector="header"><Armado title="Recent Billing Activity" controls="tabs" cards={1} /></Medida>
          <Medida nombre="Title" selector="h2"><Armado title="Today" controls="none" cards={1} /></Medida>
          <Medida nombre="Body" selector="section > div"><Armado title="Today" controls="none" cards={1} /></Medida>
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Part', 'Token']} minimo={480}>
          <tr><td className="font-semibold">Panel</td><td><Token nombre="white" /> · <code>shadow-panel</code>, no border</td></tr>
          <tr><td className="font-semibold">Title</td><td><Token nombre="black" /> 15px Bold</td></tr>
          <tr><td className="font-semibold">Inner card</td><td><Token nombre="white" /> · <code>shadow-inner-card</code></td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>The title has no icon.</li>
          <li>The header is at least 52px, with 8px top and bottom and 20px on the sides; controls up to 36px (Tabs sm) fit without growing it.</li>
          <li>If the controls do not fit next to the title, they wrap below it; they never squeeze or cut the title.</li>
          <li>Everything inside the panel is an InnerCard, a table or an EmptyState, 12px apart.</li>
        </ul>
      </Bloque>
    </Lienzo>
}`,...P.parameters?.docs?.source}}}})))()}I();export{M as Parts,A as Playground,P as Specs,N as States,F as __namedExportsOrder,O as default};