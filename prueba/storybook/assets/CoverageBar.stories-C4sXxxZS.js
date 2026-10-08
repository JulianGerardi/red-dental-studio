import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,c as r,d as i,i as a,l as o,o as s,p as c,t as l,u}from"./kit-4bQS7S9u.js";import{n as d,t as f}from"./CoverageBar-BWwEyEEu.js";function p({size:e}){let{ref:t,m:n}=c(`[role=meter]`);return(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:e}),(0,m.jsx)(`td`,{children:(0,m.jsx)(`div`,{ref:t,children:(0,m.jsx)(f,{value:60,size:e})})}),(0,m.jsx)(`td`,{className:`tabular-nums`,children:n?.ancho}),(0,m.jsx)(`td`,{className:`tabular-nums`,children:n?.alto}),(0,m.jsx)(`td`,{className:`tabular-nums`,children:n?.radio})]})}var m,h,g,_,v,y,b,x;function S(){return(S=e((()=>{d(),i(),m=t(),h={title:`Components/Finance/CoverageBar`,component:f,parameters:{layout:`padded`,docs:{description:{component:["Lo que paga un plan en una categoría (`@/components/finance/CoverageBar`): una barra corta y el porcentaje. La usan la tabla de reglas de una coverage table y el drawer de una regla.",``,`**Cómo se lee:** verde es que cubre todo (100%), azul que cubre una parte y "Not covered" en gris que no paga nada. El número va siempre: la barra sola no alcanza para leer 70 contra 80.`,``,`**Probalo:** en *Playground* cambiá *value* y *size* desde *Controls*.`].join(`
`)}}},args:{value:80,size:`md`},argTypes:{value:{control:{type:`range`,min:0,max:100,step:5},description:`Porcentaje que paga el plan, de 0 a 100.`},size:{control:`inline-radio`,options:[`md`,`sm`],description:`md (64px) en tablas · sm (40px) en resúmenes.`},className:{table:{disable:!0}}}},g={controls:{disable:!0}},_={},v={parameters:g,render:()=>(0,m.jsxs)(a,{children:[(0,m.jsx)(l,{children:(0,m.jsx)(f,{value:80})}),(0,m.jsx)(o,{partes:[[`Track`,`El 100%, en gris. Da la escala.`,`span[role=meter]`],[`Fill`,`Lo que paga: verde si es 100, azul si es menos.`,`span`],[`Number`,`El porcentaje exacto, con cifras de ancho fijo para que las filas alineen.`,`span`],[`Not covered`,`Reemplaza barra y número cuando el plan no paga (0%).`,`span`]]})]})},y={parameters:g,render:()=>(0,m.jsx)(a,{children:(0,m.jsxs)(s,{children:[(0,m.jsx)(n,{titulo:`Full`,nota:`100%: cubre todo, en verde.`,children:(0,m.jsx)(f,{value:100})}),(0,m.jsx)(n,{titulo:`Partial`,nota:`De 1 a 99: azul.`,children:(0,m.jsx)(f,{value:80})}),(0,m.jsx)(n,{titulo:`Low`,nota:`Igual que partial: el color no juzga el porcentaje.`,children:(0,m.jsx)(f,{value:10})}),(0,m.jsx)(n,{titulo:`Not covered (empty)`,nota:`0%: sin barra, el texto en gris.`,children:(0,m.jsx)(f,{value:0})}),(0,m.jsx)(n,{titulo:`Small`,nota:`size sm, en resúmenes y drawers angostos.`,children:(0,m.jsx)(f,{value:50,size:`sm`})})]})})},b={parameters:g,render:()=>(0,m.jsxs)(a,{children:[(0,m.jsx)(l,{titulo:`Sizes`,nota:`Medidas leídas de la barra dibujada.`,children:(0,m.jsxs)(r,{encabezado:[`Size`,`Sample`,`Width`,`Height`,`Radius`],minimo:520,children:[(0,m.jsx)(p,{size:`md`}),(0,m.jsx)(p,{size:`sm`})]})}),(0,m.jsx)(l,{titulo:`Colors`,nota:`De CoverageBar.tsx y src/index.css.`,children:(0,m.jsxs)(r,{encabezado:[`Part`,`Token`],minimo:420,children:[(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Track`}),(0,m.jsx)(`td`,{children:(0,m.jsx)(u,{nombre:`surface-muted`})})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Fill · 100%`}),(0,m.jsx)(`td`,{children:(0,m.jsx)(u,{nombre:`dash-ok-fg`})})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Fill · partial`}),(0,m.jsx)(`td`,{children:(0,m.jsx)(u,{nombre:`dash-blue`})})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Number`}),(0,m.jsxs)(`td`,{children:[(0,m.jsx)(u,{nombre:`ink`}),` · 12px semibold`]})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Not covered`}),(0,m.jsxs)(`td`,{children:[(0,m.jsx)(u,{nombre:`ink-faint`}),` · 12px medium`]})]})]})}),(0,m.jsx)(l,{titulo:`Rules`,children:(0,m.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,m.jsx)(`li`,{children:`The value is clamped between 0 and 100.`}),(0,m.jsx)(`li`,{children:`The bar has role meter and reads “Covered at N%”.`})]})})]})},x=[`Playground`,`Parts`,`States`,`Specs`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque><CoverageBar value={80} /></Bloque>
      <TablaPartes partes={[['Track', 'El 100%, en gris. Da la escala.', 'span[role=meter]'], ['Fill', 'Lo que paga: verde si es 100, azul si es menos.', 'span'], ['Number', 'El porcentaje exacto, con cifras de ancho fijo para que las filas alineen.', 'span'], ['Not covered', 'Reemplaza barra y número cuando el plan no paga (0%).', 'span']]} />
    </Lienzo>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Muestras>
        <Muestra titulo="Full" nota="100%: cubre todo, en verde."><CoverageBar value={100} /></Muestra>
        <Muestra titulo="Partial" nota="De 1 a 99: azul."><CoverageBar value={80} /></Muestra>
        <Muestra titulo="Low" nota="Igual que partial: el color no juzga el porcentaje."><CoverageBar value={10} /></Muestra>
        <Muestra titulo="Not covered (empty)" nota="0%: sin barra, el texto en gris."><CoverageBar value={0} /></Muestra>
        <Muestra titulo="Small" nota="size sm, en resúmenes y drawers angostos."><CoverageBar value={50} size="sm" /></Muestra>
      </Muestras>
    </Lienzo>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Sizes" nota="Medidas leídas de la barra dibujada.">
        <Tabla encabezado={['Size', 'Sample', 'Width', 'Height', 'Radius']} minimo={520}>
          <Medida size="md" />
          <Medida size="sm" />
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors" nota="De CoverageBar.tsx y src/index.css.">
        <Tabla encabezado={['Part', 'Token']} minimo={420}>
          <tr><td className="font-semibold">Track</td><td><Token nombre="surface-muted" /></td></tr>
          <tr><td className="font-semibold">Fill · 100%</td><td><Token nombre="dash-ok-fg" /></td></tr>
          <tr><td className="font-semibold">Fill · partial</td><td><Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Number</td><td><Token nombre="ink" /> · 12px semibold</td></tr>
          <tr><td className="font-semibold">Not covered</td><td><Token nombre="ink-faint" /> · 12px medium</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>The value is clamped between 0 and 100.</li>
          <li>The bar has role meter and reads “Covered at N%”.</li>
        </ul>
      </Bloque>
    </Lienzo>
}`,...b.parameters?.docs?.source}}}})))()}S();export{v as Parts,_ as Playground,b as Specs,y as States,x as __namedExportsOrder,h as default};