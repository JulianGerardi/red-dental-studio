import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,c as r,d as i,i as a,l as o,o as s,t as c,u as l}from"./kit-4bQS7S9u.js";import{a as u,w as d}from"./finanzas-D49FH9Xj.js";import{n as f,t as p}from"./CoverageSummary-B6vCXPOe.js";var m,h,g,_,v,y,b,x,S;function C(){return(C=e((()=>{f(),i(),d(),m=t(),h={title:`Components/Finance/CoverageSummary`,parameters:{layout:`padded`,docs:{decisionsFrom:`components/finance/CoverageSummary.tsx`,description:{component:["Una coverage table en una línea (`@/components/finance/CoverageSummary`): cuánto paga por clase -Preventive, Basic, Major y Ortho- y, si se pide, sus límites debajo. La usan la lista de *Coverage Tables* y el paso Billing de *New Plan*.",``,`**Cómo se lee:** si todas las categorías de una clase pagan lo mismo se ve un número ("80%"); si no, el rango ("60–70%"). El detalle por categoría está en la tabla de la coverage table.`,``,`**Probalo:** en *Playground* elegí la tabla y prendé *limites* desde *Controls*.`].join(`
`)}}},args:{tabla:u[0].nombre,limites:!0},argTypes:{tabla:{control:`select`,options:u.map(e=>e.nombre),description:`La coverage table de los datos de ejemplo.`},limites:{control:`boolean`,description:`Suma la línea de máximo anual, deducible y máximo de ortodoncia.`}}},g={controls:{disable:!0}},_=e=>u.find(t=>t.nombre===e)??u[0],v={render:e=>(0,m.jsx)(`div`,{className:`max-w-[420px]`,children:(0,m.jsx)(p,{tabla:_(e.tabla),limites:e.limites})})},y={parameters:g,render:()=>(0,m.jsxs)(a,{children:[(0,m.jsx)(c,{children:(0,m.jsx)(p,{tabla:u[0],limites:!0})}),(0,m.jsx)(o,{partes:[[`Class`,`Nombre de la clase en gris y su porcentaje en negro. Other (cosmética) no se muestra: casi nunca se cubre.`,`span`],[`Range`,`Si las categorías de una clase pagan distinto, el mínimo y el máximo ("60–70%").`,`porcentajeDeClase()`],[`Limits`,`Máximo anual ("No limit" si es 0), deducible individual y máximo de ortodoncia ("not covered" si es 0).`,`limites`]]})]})},b={parameters:g,render:()=>(0,m.jsx)(a,{children:(0,m.jsxs)(s,{children:[(0,m.jsx)(n,{titulo:`Uniform`,nota:`Cada clase paga lo mismo en todas sus categorías.`,ancho:360,children:(0,m.jsx)(p,{tabla:_(`PPO Standard 100/80/50`)})}),(0,m.jsx)(n,{titulo:`Range`,nota:`Endodontics paga 60 y el resto de Basic 70.`,ancho:360,children:(0,m.jsx)(p,{tabla:_(`DHMO Network`)})}),(0,m.jsx)(n,{titulo:`Not covered`,nota:`Major y Ortho en 0%: la clase existe pero no paga.`,ancho:360,children:(0,m.jsx)(p,{tabla:_(`Basic 100/70/0`)})}),(0,m.jsx)(n,{titulo:`With limits`,nota:`La segunda línea, como en el drawer de plan.`,ancho:360,children:(0,m.jsx)(p,{tabla:_(`PPO Plus 100/90/60`),limites:!0})}),(0,m.jsx)(n,{titulo:`No maximum`,nota:`Máximo en 0: “No limit”, no “$0”.`,ancho:360,children:(0,m.jsx)(p,{tabla:_(`DHMO Network`),limites:!0})})]})})},x={parameters:g,render:()=>(0,m.jsxs)(a,{children:[(0,m.jsx)(c,{titulo:`Type and colors`,nota:`De CoverageSummary.tsx y src/index.css.`,children:(0,m.jsxs)(r,{encabezado:[`Part`,`Text`,`Token`],minimo:480,children:[(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Class name`}),(0,m.jsx)(`td`,{children:`12px regular`}),(0,m.jsx)(`td`,{children:(0,m.jsx)(l,{nombre:`ink-muted`})})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Percentage`}),(0,m.jsx)(`td`,{children:`12px semibold · tabular`}),(0,m.jsx)(`td`,{children:(0,m.jsx)(l,{nombre:`ink`})})]}),(0,m.jsxs)(`tr`,{children:[(0,m.jsx)(`td`,{className:`font-semibold`,children:`Limits`}),(0,m.jsx)(`td`,{children:`11.5px regular · tabular`}),(0,m.jsx)(`td`,{children:(0,m.jsx)(l,{nombre:`ink-muted`})})]})]})}),(0,m.jsx)(c,{titulo:`Rules`,children:(0,m.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,m.jsx)(`li`,{children:`Classes wrap to a second line when the column is narrow; a class never breaks in two.`}),(0,m.jsx)(`li`,{children:`Gap 10px between classes, 4px between the two lines.`})]})})]})},S=[`Playground`,`Parts`,`States`,`Specs`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: a => <div className="max-w-[420px]"><CoverageSummary tabla={tabla(a.tabla)} limites={a.limites} /></div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque><CoverageSummary tabla={COBERTURAS[0]} limites /></Bloque>
      <TablaPartes partes={[['Class', 'Nombre de la clase en gris y su porcentaje en negro. Other (cosmética) no se muestra: casi nunca se cubre.', 'span'], ['Range', 'Si las categorías de una clase pagan distinto, el mínimo y el máximo ("60–70%").', 'porcentajeDeClase()'], ['Limits', 'Máximo anual ("No limit" si es 0), deducible individual y máximo de ortodoncia ("not covered" si es 0).', 'limites']]} />
    </Lienzo>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Muestras>
        <Muestra titulo="Uniform" nota="Cada clase paga lo mismo en todas sus categorías." ancho={360}><CoverageSummary tabla={tabla('PPO Standard 100/80/50')} /></Muestra>
        <Muestra titulo="Range" nota="Endodontics paga 60 y el resto de Basic 70." ancho={360}><CoverageSummary tabla={tabla('DHMO Network')} /></Muestra>
        <Muestra titulo="Not covered" nota="Major y Ortho en 0%: la clase existe pero no paga." ancho={360}><CoverageSummary tabla={tabla('Basic 100/70/0')} /></Muestra>
        <Muestra titulo="With limits" nota="La segunda línea, como en el drawer de plan." ancho={360}><CoverageSummary tabla={tabla('PPO Plus 100/90/60')} limites /></Muestra>
        <Muestra titulo="No maximum" nota="Máximo en 0: “No limit”, no “$0”." ancho={360}><CoverageSummary tabla={tabla('DHMO Network')} limites /></Muestra>
      </Muestras>
    </Lienzo>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Type and colors" nota="De CoverageSummary.tsx y src/index.css.">
        <Tabla encabezado={['Part', 'Text', 'Token']} minimo={480}>
          <tr><td className="font-semibold">Class name</td><td>12px regular</td><td><Token nombre="ink-muted" /></td></tr>
          <tr><td className="font-semibold">Percentage</td><td>12px semibold · tabular</td><td><Token nombre="ink" /></td></tr>
          <tr><td className="font-semibold">Limits</td><td>11.5px regular · tabular</td><td><Token nombre="ink-muted" /></td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>Classes wrap to a second line when the column is narrow; a class never breaks in two.</li>
          <li>Gap 10px between classes, 4px between the two lines.</li>
        </ul>
      </Bloque>
    </Lienzo>
}`,...x.parameters?.docs?.source}}}})))()}C();export{y as Parts,v as Playground,x as Specs,b as States,S as __namedExportsOrder,h as default};