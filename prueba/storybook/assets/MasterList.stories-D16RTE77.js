import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,g as i}from"./dropdown-menu-Cp_CIA51.js";import{f as a,g as o}from"./form-D500Mvlk.js";import{i as s,r as c}from"./pill-Qo___yxt.js";import{a as l,c as u,d,i as f,l as p,o as m,t as h,u as g}from"./kit-4bQS7S9u.js";import{R as _,T as v,t as y}from"./finanzas-Cd24vV6l.js";import{n as b,t as x}from"./MasterList-CfIWP9gB.js";function S({elegido:e,conFiltro:t=!0,inicial:n=``,abierto:r,lista:i=E}){let[o,s]=(0,C.useState)(n),c=i.filter(e=>e.nombre.toLowerCase().includes(o.trim().toLowerCase()));return(0,w.jsx)(x,{items:c,elegido:e,q:o,onQ:s,placeholder:`Search a Fee Schedule Here...`,abierto:r,vacio:`No fee schedules match the search or filters.`,filtro:t?(0,w.jsx)(a,{hideLabel:!0,label:`Type`,options:[`Percentage`,`Copayment`],value:`Percentage`,onChange:()=>{}}):void 0})}var C,w,T,E,D,O,k,A,j;function M(){return(M=e((()=>{C=t(),b(),d(),s(),i(),o(),_(),w=n(),T={title:`Components/Finance/MasterList`,parameters:{layout:`padded`,docs:{decisionsFrom:`components/finance/MasterList.tsx`,description:{component:[`La lista de la izquierda de *Edit Fee Schedule* y de *Coverage Table*, como en red.dev: buscador, un filtro y un ítem por fee schedule o plantilla. El elegido se abre a la derecha y queda resaltado.`,``,`Cada ítem lleva su nombre (link a la edición), una etiqueta opcional (*Default*), el estado como punto de color (con su nombre en el title y en texto oculto) y el menú ⋮.`,``,`**Probalo:** en *Playground* buscá, elegí otro ítem o sacá el filtro.`].join(`
`)}}},args:{elegido:`aetna-2026`,conFiltro:!0,ancho:260},argTypes:{elegido:{control:`select`,options:y.map(e=>e.id),description:`El ítem abierto a la derecha.`},conFiltro:{control:`boolean`,description:`Muestra el filtro de arriba.`},ancho:{control:{type:`range`,min:220,max:360,step:10},description:`Ancho de la columna.`}}},E=y.slice(0,7).map(e=>({id:e.id,nombre:e.nombre,to:`#`,etiqueta:e.porDefecto?(0,w.jsx)(c,{tone:`info`,size:`sm`,children:`Default`}):void 0,estado:{nombre:e.estado,tono:v[e.estado]},acciones:(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(r,{children:`Inactive`}),(0,w.jsx)(r,{variant:`destructive`,children:`Archive`})]})})),D={render:({elegido:e,conFiltro:t,ancho:n})=>(0,w.jsx)(`div`,{style:{width:n},children:(0,w.jsx)(S,{elegido:e,conFiltro:t})})},O={parameters:{controls:{disable:!0}},render:()=>(0,w.jsx)(f,{children:(0,w.jsx)(h,{titulo:`Parts`,children:(0,w.jsx)(p,{partes:[[`Buscador`,`Search a Fee Schedule Here... (también en Coverage Table, tal cual red.dev) + Search.`,`SettingsSearch`],[`Filtro`,`Filters con States en Fee Schedules; el Type en Coverage Table.`,`FilterMenu / SelectField`],[`Ítem`,`Link a la edición; el elegido en azul sobre info-bg.`,`Link`],[`Etiqueta`,`La pill Default del fee schedule por defecto.`,`Pill`],[`Estado`,`Punto del color de la pill del estado; nombre en title y sr-only.`,`span`],[`Menú ⋮`,`Inactive / Archive en Fee Schedules; Delete en Coverage Table.`,`RowActionsMenu`]]})})})},k={parameters:{controls:{disable:!0}},render:()=>(0,w.jsx)(f,{children:(0,w.jsx)(h,{titulo:`States`,children:(0,w.jsxs)(m,{children:[(0,w.jsx)(l,{titulo:`Selected`,nota:`El ítem abierto a la derecha.`,ancho:260,children:(0,w.jsx)(S,{elegido:`ucr-red`})}),(0,w.jsx)(l,{titulo:`Empty`,nota:`La búsqueda o el filtro no dejan nada.`,ancho:260,children:(0,w.jsx)(S,{inicial:`zzz`})}),(0,w.jsx)(l,{titulo:`Menu open`,ancho:260,children:(0,w.jsx)(S,{elegido:`aetna-2026`,abierto:`aetna-2026`,lista:E.slice(0,3)})})]})})})},A={parameters:{controls:{disable:!0}},render:()=>(0,w.jsxs)(f,{children:[(0,w.jsx)(h,{titulo:`Measures`,children:(0,w.jsxs)(u,{encabezado:[`Piece`,`Value`],children:[(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Columna`}),(0,w.jsx)(`td`,{className:`tabular-nums`,children:`260px en escritorio; a lo ancho debajo de lg`})]}),(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Lista`}),(0,w.jsx)(`td`,{className:`tabular-nums`,children:`alto máximo 560px con scroll propio, 4px de padding`})]}),(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Ítem`}),(0,w.jsx)(`td`,{className:`tabular-nums`,children:`13px, 8px arriba y abajo, punto de 8px`})]})]})}),(0,w.jsx)(h,{titulo:`Colors`,children:(0,w.jsxs)(u,{encabezado:[`Piece`,`Token`],children:[(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Elegido`}),(0,w.jsxs)(`td`,{children:[(0,w.jsx)(g,{nombre:`info-bg`}),` · `,(0,w.jsx)(g,{nombre:`dash-blue`})]})]}),(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Hover`}),(0,w.jsx)(`td`,{children:(0,w.jsx)(g,{nombre:`surface-subtle`})})]}),(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Punto Active / Inactive / Archived`}),(0,w.jsxs)(`td`,{children:[(0,w.jsx)(g,{nombre:`dash-ok-fg`}),` · `,(0,w.jsx)(g,{nombre:`dash-bad-fg`}),` · `,(0,w.jsx)(g,{nombre:`ink-faint`})]})]})]})})]})},j=[`Playground`,`Parts`,`States`,`Specs`],D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: ({
    elegido,
    conFiltro,
    ancho
  }) => <div style={{
    width: ancho
  }}><Lista elegido={elegido} conFiltro={conFiltro} /></div>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[['Buscador', 'Search a Fee Schedule Here... (también en Coverage Table, tal cual red.dev) + Search.', 'SettingsSearch'], ['Filtro', 'Filters con States en Fee Schedules; el Type en Coverage Table.', 'FilterMenu / SelectField'], ['Ítem', 'Link a la edición; el elegido en azul sobre info-bg.', 'Link'], ['Etiqueta', 'La pill Default del fee schedule por defecto.', 'Pill'], ['Estado', 'Punto del color de la pill del estado; nombre en title y sr-only.', 'span'], ['Menú ⋮', 'Inactive / Archive en Fee Schedules; Delete en Coverage Table.', 'RowActionsMenu']]} />
      </Bloque>
    </Lienzo>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="States">
        <Muestras>
          <Muestra titulo="Selected" nota="El ítem abierto a la derecha." ancho={260}><Lista elegido="ucr-red" /></Muestra>
          <Muestra titulo="Empty" nota="La búsqueda o el filtro no dejan nada." ancho={260}><Lista inicial="zzz" /></Muestra>
          <Muestra titulo="Menu open" ancho={260}><Lista elegido="aetna-2026" abierto="aetna-2026" lista={items.slice(0, 3)} /></Muestra>
        </Muestras>
      </Bloque>
    </Lienzo>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Measures">
        <Tabla encabezado={['Piece', 'Value']}>
          <tr><td className="font-semibold">Columna</td><td className="tabular-nums">260px en escritorio; a lo ancho debajo de lg</td></tr>
          <tr><td className="font-semibold">Lista</td><td className="tabular-nums">alto máximo 560px con scroll propio, 4px de padding</td></tr>
          <tr><td className="font-semibold">Ítem</td><td className="tabular-nums">13px, 8px arriba y abajo, punto de 8px</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Piece', 'Token']}>
          <tr><td className="font-semibold">Elegido</td><td><Token nombre="info-bg" /> · <Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Hover</td><td><Token nombre="surface-subtle" /></td></tr>
          <tr><td className="font-semibold">Punto Active / Inactive / Archived</td><td><Token nombre="dash-ok-fg" /> · <Token nombre="dash-bad-fg" /> · <Token nombre="ink-faint" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...A.parameters?.docs?.source}}}})))()}M();export{O as Parts,D as Playground,A as Specs,k as States,j as __namedExportsOrder,T as default};