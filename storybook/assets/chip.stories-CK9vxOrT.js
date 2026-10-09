import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{i as r,r as i}from"./pill-Qo___yxt.js";import{c as a,d as o,i as s,l as c,n as l,o as u,t as d,u as f}from"./kit-4bQS7S9u.js";import{n as p,t as m}from"./chip-DH9OMYsI.js";function h(){let[e,t]=(0,g.useState)([`D0140 - Limited oral evaluation – problem focused`,`D1110 - Prophylaxis – adult`,`D2740 - Crown – porcelain/ceramic`]);return(0,_.jsxs)(`div`,{className:`flex flex-wrap gap-2`,children:[e.map(n=>(0,_.jsx)(m,{removeLabel:`Remove ${n.split(` `)[0]}`,onRemove:()=>t(e.filter(e=>e!==n)),children:n},n)),e.length===0&&(0,_.jsx)(`span`,{className:`text-[13px] text-ink-faint`,children:`No procedures added.`})]})}var g,_,v,y,b,x,S,C;function w(){return(w=e((()=>{g=t(),p(),r(),o(),_=n(),v={title:`Elements/Chips`,component:m,parameters:{layout:`padded`,docs:{decisionsFrom:`components/ui/chip.tsx`,description:{component:["Algo **elegido que se puede sacar**: los códigos CDT de una excepción o de un consentimiento, un filtro aplicado. Celeste (`dash-count-bg`) con texto azul y la ✕ a la derecha.",``,`No es un estado (eso es *Pills*, con borde y color semántico) ni una cuenta (*Counts*). Reemplaza los chips que cada pantalla dibujaba a mano: Manage Exceptions, Consents, los filtros de Treatment, *Selected area* de New Procedure y de Radiography y las franjas de Working Hours.`,``,`**La ✕ siempre a la derecha:** se lee primero qué es y después la acción, es la convención de Gmail, Jira o Material, evita borrar sin querer al tocar el comienzo del chip y coincide con el cerrar de drawers y toasts.`,``,`**Probalo:** en *Playground* cambiá el texto, sacá la ✕ o deshabilitalo desde *Controls*.`].join(`
`)}}},args:{children:`D0140 - Limited oral evaluation – problem focused`,removeLabel:`Remove D0140`,disabled:!1},argTypes:{children:{control:`text`,description:`Lo elegido. Si no entra, termina en “…”.`},removeLabel:{control:`text`,description:`aria-label de la ✕.`},disabled:{control:`boolean`,description:`Se ve al 60% y la ✕ no responde.`},onRemove:{table:{disable:!0}},className:{table:{disable:!0}}}},y={render:e=>(0,_.jsx)(m,{...e,onRemove:()=>{}})},b={parameters:{controls:{disable:!0}},render:()=>(0,_.jsxs)(s,{children:[(0,_.jsx)(d,{titulo:`Parts`,children:(0,_.jsx)(c,{partes:[[`Texto`,`Lo elegido, 12px Medium azul; se corta con “…” si no entra.`,`span`],[`✕`,`Saca el chip; lleva su aria-label (Remove D0140). Sin onRemove no aparece.`,`button`],[`Fondo`,`Celeste, sin borde: lo distingue de una Pill de estado.`,`span`]]})}),(0,_.jsx)(d,{titulo:`Chip vs Pill`,children:(0,_.jsxs)(u,{children:[(0,_.jsx)(l,{rotulo:`Chip: elegido, se saca`,children:(0,_.jsx)(m,{onRemove:()=>{},removeLabel:`Remove D0140`,children:`D0140`})}),(0,_.jsx)(l,{rotulo:`Pill: estado`,children:(0,_.jsx)(i,{tone:`info`,children:`Age limitation`})})]})})]})},x={parameters:{controls:{disable:!0}},render:()=>(0,_.jsxs)(s,{children:[(0,_.jsx)(d,{titulo:`States`,children:(0,_.jsxs)(u,{children:[(0,_.jsx)(l,{rotulo:`Default`,children:(0,_.jsx)(m,{onRemove:()=>{},removeLabel:`Remove D1110`,children:`D1110 - Prophylaxis – adult`})}),(0,_.jsx)(l,{rotulo:`Read only (sin ✕)`,children:(0,_.jsx)(m,{children:`D1110`})}),(0,_.jsx)(l,{rotulo:`Disabled`,children:(0,_.jsx)(m,{disabled:!0,onRemove:()=>{},removeLabel:`Remove D1110`,children:`D1110 - Prophylaxis – adult`})}),(0,_.jsx)(l,{rotulo:`Long text`,children:(0,_.jsx)(`div`,{className:`w-56`,children:(0,_.jsx)(m,{onRemove:()=>{},removeLabel:`Remove D0150`,children:`D0150 - Comprehensive oral evaluation – new or established patient`})})})]})}),(0,_.jsx)(d,{titulo:`In a list`,nota:`Como en Manage Exceptions › Select Procedure: tocá la ✕ para sacar uno.`,children:(0,_.jsx)(h,{})})]})},S={parameters:{controls:{disable:!0}},render:()=>(0,_.jsxs)(s,{children:[(0,_.jsx)(d,{titulo:`Measures`,children:(0,_.jsxs)(a,{encabezado:[`Piece`,`Value`],children:[(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Alto`}),(0,_.jsx)(`td`,{className:`tabular-nums`,children:`24px (h-6), radio completo`})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Padding`}),(0,_.jsx)(`td`,{className:`tabular-nums`,children:`10px a la izquierda; 4px a la derecha con ✕, 10px sin ella`})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Texto`}),(0,_.jsx)(`td`,{className:`tabular-nums`,children:`12px Medium`})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`✕`}),(0,_.jsx)(`td`,{className:`tabular-nums`,children:`área 16px, ícono 12px; hover blanco`})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Entre chips`}),(0,_.jsx)(`td`,{className:`tabular-nums`,children:`gap 6–8px, flex-wrap`})]})]})}),(0,_.jsx)(d,{titulo:`Colors`,children:(0,_.jsxs)(a,{encabezado:[`Piece`,`Token`],children:[(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Fondo`}),(0,_.jsx)(`td`,{children:(0,_.jsx)(f,{nombre:`dash-count-bg`})})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Texto y ✕`}),(0,_.jsx)(`td`,{children:(0,_.jsx)(f,{nombre:`dash-blue`})})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Hover de la ✕`}),(0,_.jsx)(`td`,{children:(0,_.jsx)(f,{nombre:`white`})})]})]})})]})},C=[`Playground`,`Parts`,`States`,`Specs`],y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: args => <Chip {...args} onRemove={() => {}} />
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[['Texto', 'Lo elegido, 12px Medium azul; se corta con “…” si no entra.', 'span'], ['✕', 'Saca el chip; lleva su aria-label (Remove D0140). Sin onRemove no aparece.', 'button'], ['Fondo', 'Celeste, sin borde: lo distingue de una Pill de estado.', 'span']]} />
      </Bloque>
      <Bloque titulo="Chip vs Pill">
        <Muestras>
          <ConRotulo rotulo="Chip: elegido, se saca"><Chip onRemove={() => {}} removeLabel="Remove D0140">D0140</Chip></ConRotulo>
          <ConRotulo rotulo="Pill: estado"><Pill tone="info">Age limitation</Pill></ConRotulo>
        </Muestras>
      </Bloque>
    </Lienzo>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="States">
        <Muestras>
          <ConRotulo rotulo="Default"><Chip onRemove={() => {}} removeLabel="Remove D1110">D1110 - Prophylaxis – adult</Chip></ConRotulo>
          <ConRotulo rotulo="Read only (sin ✕)"><Chip>D1110</Chip></ConRotulo>
          <ConRotulo rotulo="Disabled"><Chip disabled onRemove={() => {}} removeLabel="Remove D1110">D1110 - Prophylaxis – adult</Chip></ConRotulo>
          <ConRotulo rotulo="Long text"><div className="w-56"><Chip onRemove={() => {}} removeLabel="Remove D0150">D0150 - Comprehensive oral evaluation – new or established patient</Chip></div></ConRotulo>
        </Muestras>
      </Bloque>
      <Bloque titulo="In a list" nota="Como en Manage Exceptions › Select Procedure: tocá la ✕ para sacar uno.">
        <Lista />
      </Bloque>
    </Lienzo>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Measures">
        <Tabla encabezado={['Piece', 'Value']}>
          <tr><td className="font-semibold">Alto</td><td className="tabular-nums">24px (h-6), radio completo</td></tr>
          <tr><td className="font-semibold">Padding</td><td className="tabular-nums">10px a la izquierda; 4px a la derecha con ✕, 10px sin ella</td></tr>
          <tr><td className="font-semibold">Texto</td><td className="tabular-nums">12px Medium</td></tr>
          <tr><td className="font-semibold">✕</td><td className="tabular-nums">área 16px, ícono 12px; hover blanco</td></tr>
          <tr><td className="font-semibold">Entre chips</td><td className="tabular-nums">gap 6–8px, flex-wrap</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Piece', 'Token']}>
          <tr><td className="font-semibold">Fondo</td><td><Token nombre="dash-count-bg" /></td></tr>
          <tr><td className="font-semibold">Texto y ✕</td><td><Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Hover de la ✕</td><td><Token nombre="white" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...S.parameters?.docs?.source}}}})))()}w();export{b as Parts,y as Playground,S as Specs,x as States,C as __namedExportsOrder,v as default};