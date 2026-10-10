import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,c as i,d as a,i as o,l as s,p as c,r as l,t as u,u as d}from"./kit-4bQS7S9u.js";import{n as f,t as p}from"./SettingsSearch-B-5mtpIh.js";function m({inicial:e=``,...t}){let[n,r]=(0,g.useState)(e);return(0,_.jsx)(`div`,{className:`flex w-[460px] max-w-full flex-wrap items-center gap-3`,children:(0,_.jsx)(p,{...t,value:n,onChange:r})})}function h({sel:e,parte:t}){let{ref:n,m:r}=c(e);return(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:t}),(0,_.jsx)(`td`,{children:(0,_.jsx)(`div`,{ref:n,className:`flex items-center gap-3`,children:(0,_.jsx)(p,{value:``,onChange:()=>{}})})}),(0,_.jsx)(`td`,{className:`tabular-nums`,children:r?.ancho}),(0,_.jsx)(`td`,{className:`tabular-nums`,children:r?.alto}),(0,_.jsx)(`td`,{className:`tabular-nums`,children:r?.texto}),(0,_.jsx)(`td`,{className:`tabular-nums`,children:r?.radio})]})}var g,_,v,y,b,x,S,C,w;function T(){return(T=e((()=>{g=t(),f(),a(),_=n(),v={title:`Components/Settings/SettingsSearch`,component:p,parameters:{layout:`padded`,docs:{description:{component:["El buscador de las listas de Settings (`@/components/settings/SettingsSearch`): campo con lupa y el botón *Search* al lado, en la fila de abajo de *SettingsPageHeader*. Lo usan Fee Schedules, Carriers y Coverage Tables.",``,`**Cómo funciona:** filtra mientras se escribe; *Search* lleva el foco al campo (el botón es del diseño original y Julián pidió que esté en toda tabla con buscador).`,``,`**Probalo:** en *Playground* escribí, y desde *Controls* cambiá *placeholder* y *disabled*.`].join(`
`)}}},args:{value:``,placeholder:`Search carriers or payer ID`,disabled:!1,onChange:()=>{}},argTypes:{value:{control:`text`,description:`Lo escrito.`},placeholder:{control:`text`,description:`Qué se busca; también es el nombre del campo para el lector de pantalla.`},disabled:{control:`boolean`,description:`Sin datos que buscar.`},onChange:{table:{disable:!0}},className:{table:{disable:!0}}},decorators:[e=>(0,_.jsx)(`div`,{className:`flex flex-wrap items-center gap-3`,children:(0,_.jsx)(e,{})})]},y={controls:{disable:!0}},b={render:e=>(0,_.jsx)(m,{inicial:e.value,placeholder:e.placeholder,disabled:e.disabled},e.value)},x={parameters:y,render:()=>(0,_.jsxs)(o,{children:[(0,_.jsx)(m,{placeholder:`Search fee schedules`}),(0,_.jsx)(s,{partes:[[`Field`,`Lupa a la izquierda, hasta 320px de ancho; se achica en angosto.`,`input`],[`Search`,`Botón azul: lleva el foco al campo. El filtrado ya corre al escribir.`,`SearchButton`]]})]})},S={parameters:y,render:()=>(0,_.jsxs)(o,{children:[(0,_.jsx)(r,{titulo:`Empty`,nota:`Con el placeholder de lo que se busca.`,children:(0,_.jsx)(m,{placeholder:`Search carriers or payer ID`})}),(0,_.jsx)(r,{titulo:`Typed`,nota:`La lista ya está filtrada.`,children:(0,_.jsx)(m,{inicial:`delta`})}),(0,_.jsx)(r,{titulo:`Focus`,nota:`Borde azul.`,children:(0,_.jsx)(l,{selector:`input`,estado:`focus-visible`,children:(0,_.jsx)(m,{placeholder:`Search coverage tables`})})}),(0,_.jsx)(r,{titulo:`Disabled`,nota:`Fondo gris; no se puede escribir.`,children:(0,_.jsx)(m,{placeholder:`Search`,disabled:!0})})]})},C={parameters:y,render:()=>(0,_.jsxs)(o,{children:[(0,_.jsx)(u,{titulo:`Sizes`,nota:`Medidas leídas de la pieza dibujada.`,children:(0,_.jsxs)(i,{encabezado:[`Part`,`Sample`,`Width`,`Height`,`Text`,`Radius`],minimo:700,children:[(0,_.jsx)(h,{sel:`input`,parte:`Field`}),(0,_.jsx)(h,{sel:`button`,parte:`Search`})]})}),(0,_.jsx)(u,{titulo:`Colors`,children:(0,_.jsxs)(i,{encabezado:[`Part`,`Token`],minimo:420,children:[(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Field border`}),(0,_.jsxs)(`td`,{children:[(0,_.jsx)(d,{nombre:`line`}),` · focus `,(0,_.jsx)(d,{nombre:`dash-blue`})]})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Placeholder · icon`}),(0,_.jsx)(`td`,{children:(0,_.jsx)(d,{nombre:`ink-faint`})})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Search`}),(0,_.jsxs)(`td`,{children:[(0,_.jsx)(d,{nombre:`dash-blue`}),` · hover `,(0,_.jsx)(d,{nombre:`dash-blue-hover`})]})]})]})})]})},w=[`Playground`,`Parts`,`States`,`Specs`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: a => <Vivo key={a.value} inicial={a.value} placeholder={a.placeholder} disabled={a.disabled} />
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Vivo placeholder="Search fee schedules" />
      <TablaPartes partes={[['Field', 'Lupa a la izquierda, hasta 320px de ancho; se achica en angosto.', 'input'], ['Search', 'Botón azul: lleva el foco al campo. El filtrado ya corre al escribir.', 'SearchButton']]} />
    </Lienzo>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Muestra titulo="Empty" nota="Con el placeholder de lo que se busca."><Vivo placeholder="Search carriers or payer ID" /></Muestra>
      <Muestra titulo="Typed" nota="La lista ya está filtrada."><Vivo inicial="delta" /></Muestra>
      <Muestra titulo="Focus" nota="Borde azul."><Forzar selector="input" estado="focus-visible"><Vivo placeholder="Search coverage tables" /></Forzar></Muestra>
      <Muestra titulo="Disabled" nota="Fondo gris; no se puede escribir."><Vivo placeholder="Search" disabled /></Muestra>
    </Lienzo>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Sizes" nota="Medidas leídas de la pieza dibujada.">
        <Tabla encabezado={['Part', 'Sample', 'Width', 'Height', 'Text', 'Radius']} minimo={700}>
          <Medida sel="input" parte="Field" />
          <Medida sel="button" parte="Search" />
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Part', 'Token']} minimo={420}>
          <tr><td className="font-semibold">Field border</td><td><Token nombre="line" /> · focus <Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Placeholder · icon</td><td><Token nombre="ink-faint" /></td></tr>
          <tr><td className="font-semibold">Search</td><td><Token nombre="dash-blue" /> · hover <Token nombre="dash-blue-hover" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...C.parameters?.docs?.source}}}})))()}T();export{x as Parts,b as Playground,C as Specs,S as States,w as __namedExportsOrder,v as default};