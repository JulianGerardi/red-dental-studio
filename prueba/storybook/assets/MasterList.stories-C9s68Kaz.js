import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{l as n,t as r}from"./chunk-62JRHF6Z-QSPpyyt6.js";import{n as i,t as a}from"./utils-D-bRdWGo.js";import{t as o}from"./jsx-runtime-DeHZSEgm.js";import{a as s,g as c}from"./dropdown-menu-Cp_CIA51.js";import{g as l,x as u}from"./form-C6p-ttqr.js";import{i as d,r as f}from"./pill-CiKKQM4h.js";import{n as p,t as m}from"./row-actions-menu-Ndt8j29J.js";import{n as h,t as g}from"./SettingsSearch-VSZsULiC.js";import{R as _,T as v,t as y}from"./finanzas-BhVpLIPd.js";import{a as b,d as x,f as S,i as C,l as w,o as T,t as E,u as D}from"./kit-Di92TvVK.js";function O({items:e,elegido:t,q:n,onQ:i,placeholder:o,filtro:s,vacio:c=`No results.`,abierto:l}){return(0,k.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,k.jsx)(`div`,{className:`flex gap-2`,children:(0,k.jsx)(g,{value:n,onChange:i,placeholder:o,className:`sm:max-w-none`})}),s&&(0,k.jsx)(`div`,{className:`flex`,children:s}),(0,k.jsxs)(`ul`,{"aria-label":`List`,className:`flex max-h-[560px] flex-col gap-0.5 overflow-y-auto rounded-lg p-1 shadow-hairline`,children:[e.length===0&&(0,k.jsx)(`li`,{className:`px-3 py-6 text-center text-[13px] text-ink-muted`,children:c}),e.map(e=>(0,k.jsxs)(`li`,{className:a(`group flex items-center gap-2 rounded-md pr-1 transition-colors`,e.id===t?`bg-info-bg`:`hover:bg-surface-subtle`),children:[(0,k.jsxs)(r,{to:e.to,"aria-current":e.id===t?`page`:void 0,className:a(`flex min-w-0 flex-1 items-center gap-2 py-2 pl-3 text-[13px]`,e.id===t?`font-medium text-dash-blue`:`text-ink`),children:[(0,k.jsx)(`span`,{className:`truncate`,children:e.nombre}),e.etiqueta]}),e.estado&&(0,k.jsx)(`span`,{title:e.estado.nombre,className:a(`size-2 shrink-0 rounded-full`,A[e.estado.tono]),children:(0,k.jsx)(`span`,{className:`sr-only`,children:e.estado.nombre})}),e.acciones&&(0,k.jsx)(m,{label:e.nombre,abierto:l===e.id,children:e.acciones})]},e.id))]})]})}var k,A;function j(){return(j=e((()=>{n(),i(),h(),p(),k=o(),A={success:`bg-dash-ok-fg`,info:`bg-dash-busy-fg`,warning:`bg-warn-fg`,danger:`bg-dash-bad-fg`,neutral:`bg-ink-faint`,purple:`bg-purple-fg`},O.__docgenInfo={description:``,methods:[],displayName:`MasterList`,props:{items:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  id: string
  nombre: string
  to: string
  /** Al lado del nombre: la pill "Default". */
  etiqueta?: ReactNode
  estado?: { nombre: string; tono: PillTone }
  /** Los ítems del menú ⋮. */
  acciones?: ReactNode
}`,signature:{properties:[{key:`id`,value:{name:`string`,required:!0}},{key:`nombre`,value:{name:`string`,required:!0}},{key:`to`,value:{name:`string`,required:!0}},{key:`etiqueta`,value:{name:`ReactNode`,required:!1},description:`Al lado del nombre: la pill "Default".`},{key:`estado`,value:{name:`signature`,type:`object`,raw:`{ nombre: string; tono: PillTone }`,signature:{properties:[{key:`nombre`,value:{name:`string`,required:!0}},{key:`tono`,value:{name:`PillTone`,required:!0}}]},required:!1}},{key:`acciones`,value:{name:`ReactNode`,required:!1},description:`Los ítems del menú ⋮.`}]}}],raw:`ItemMaestro[]`},description:``},elegido:{required:!1,tsType:{name:`string`},description:``},q:{required:!0,tsType:{name:`string`},description:``},onQ:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(v: string) => void`,signature:{arguments:[{type:{name:`string`},name:`v`}],return:{name:`void`}}},description:``},placeholder:{required:!0,tsType:{name:`string`},description:``},filtro:{required:!1,tsType:{name:`ReactNode`},description:`El filtro de arriba: estados en Fee Schedules, tipo en Coverage Table.`},vacio:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'No results.'`,computed:!1}},abierto:{required:!1,tsType:{name:`string`},description:`Sólo para las stories: deja abierto el menú de ese ítem.`}}}})))()}function M({elegido:e,conFiltro:t=!0,inicial:n=``,abierto:r,lista:i=I}){let[a,o]=(0,N.useState)(n),s=i.filter(e=>e.nombre.toLowerCase().includes(a.trim().toLowerCase()));return(0,P.jsx)(O,{items:s,elegido:e,q:a,onQ:o,placeholder:`Search fee schedules`,abierto:r,vacio:`No fee schedules match the search or filters.`,filtro:t?(0,P.jsx)(l,{hideLabel:!0,label:`Type`,options:[`Percentage`,`Copayment`],value:`Percentage`,onChange:()=>{}}):void 0})}var N,P,F,I,L,R,z,B,V;function H(){return(H=e((()=>{N=t(),j(),S(),d(),c(),u(),_(),P=o(),F={title:`Components/Finance/MasterList`,parameters:{layout:`padded`,docs:{decisionsFrom:`components/finance/MasterList.tsx`,description:{component:[`La lista de la izquierda de *Edit Fee Schedule* y de *Coverage Table*, como en red.dev: buscador, un filtro y un ítem por fee schedule o plantilla. El elegido se abre a la derecha y queda resaltado.`,``,`Cada ítem lleva su nombre (link a la edición), una etiqueta opcional (*Default*), el estado como punto de color (con su nombre en el title y en texto oculto) y el menú ⋮.`,``,`**Probalo:** en *Playground* buscá, elegí otro ítem o sacá el filtro.`].join(`
`)}}},args:{elegido:`aetna-2026`,conFiltro:!0,ancho:260},argTypes:{elegido:{control:`select`,options:y.map(e=>e.id),description:`El ítem abierto a la derecha.`},conFiltro:{control:`boolean`,description:`Muestra el filtro de arriba.`},ancho:{control:{type:`range`,min:220,max:360,step:10},description:`Ancho de la columna.`}}},I=y.slice(0,7).map(e=>({id:e.id,nombre:e.nombre,to:`#`,etiqueta:e.porDefecto?(0,P.jsx)(f,{tone:`info`,size:`sm`,children:`Default`}):void 0,estado:{nombre:e.estado,tono:v[e.estado]},acciones:(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(s,{children:`Inactive`}),(0,P.jsx)(s,{variant:`destructive`,children:`Archive`})]})})),L={render:({elegido:e,conFiltro:t,ancho:n})=>(0,P.jsx)(`div`,{style:{width:n},children:(0,P.jsx)(M,{elegido:e,conFiltro:t})})},R={parameters:{controls:{disable:!0}},render:()=>(0,P.jsx)(C,{children:(0,P.jsx)(E,{titulo:`Parts`,children:(0,P.jsx)(D,{partes:[[`Buscador`,`Search a Fee Schedule Here... (también en Coverage Table, tal cual red.dev) + Search.`,`SettingsSearch`],[`Filtro`,`Filters con States en Fee Schedules; el Type en Coverage Table.`,`FilterMenu / SelectField`],[`Ítem`,`Link a la edición; el elegido en azul sobre info-bg.`,`Link`],[`Etiqueta`,`La pill Default del fee schedule por defecto.`,`Pill`],[`Estado`,`Punto del color de la pill del estado; nombre en title y sr-only.`,`span`],[`Menú ⋮`,`Inactive / Archive en Fee Schedules; Delete en Coverage Table.`,`RowActionsMenu`]]})})})},z={parameters:{controls:{disable:!0}},render:()=>(0,P.jsx)(C,{children:(0,P.jsx)(E,{titulo:`States`,children:(0,P.jsxs)(T,{children:[(0,P.jsx)(b,{titulo:`Selected`,nota:`El ítem abierto a la derecha.`,ancho:260,children:(0,P.jsx)(M,{elegido:`ucr-red`})}),(0,P.jsx)(b,{titulo:`Empty`,nota:`La búsqueda o el filtro no dejan nada.`,ancho:260,children:(0,P.jsx)(M,{inicial:`zzz`})}),(0,P.jsx)(b,{titulo:`Menu open`,ancho:260,children:(0,P.jsx)(M,{elegido:`aetna-2026`,abierto:`aetna-2026`,lista:I.slice(0,3)})})]})})})},B={parameters:{controls:{disable:!0}},render:()=>(0,P.jsxs)(C,{children:[(0,P.jsx)(E,{titulo:`Measures`,children:(0,P.jsxs)(w,{encabezado:[`Piece`,`Value`],children:[(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{className:`font-semibold`,children:`Columna`}),(0,P.jsx)(`td`,{className:`tabular-nums`,children:`260px en escritorio; a lo ancho debajo de lg`})]}),(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{className:`font-semibold`,children:`Lista`}),(0,P.jsx)(`td`,{className:`tabular-nums`,children:`alto máximo 560px con scroll propio, 4px de padding`})]}),(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{className:`font-semibold`,children:`Ítem`}),(0,P.jsx)(`td`,{className:`tabular-nums`,children:`13px, 8px arriba y abajo, punto de 8px`})]})]})}),(0,P.jsx)(E,{titulo:`Colors`,children:(0,P.jsxs)(w,{encabezado:[`Piece`,`Token`],children:[(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{className:`font-semibold`,children:`Elegido`}),(0,P.jsxs)(`td`,{children:[(0,P.jsx)(x,{nombre:`info-bg`}),` · `,(0,P.jsx)(x,{nombre:`dash-blue`})]})]}),(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{className:`font-semibold`,children:`Hover`}),(0,P.jsx)(`td`,{children:(0,P.jsx)(x,{nombre:`surface-subtle`})})]}),(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{className:`font-semibold`,children:`Punto Active / Inactive / Archived`}),(0,P.jsxs)(`td`,{children:[(0,P.jsx)(x,{nombre:`dash-ok-fg`}),` · `,(0,P.jsx)(x,{nombre:`dash-bad-fg`}),` · `,(0,P.jsx)(x,{nombre:`ink-faint`})]})]})]})})]})},V=[`Playground`,`Parts`,`States`,`Specs`],L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: ({
    elegido,
    conFiltro,
    ancho
  }) => <div style={{
    width: ancho
  }}><Lista elegido={elegido} conFiltro={conFiltro} /></div>
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
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
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
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
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
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
}`,...B.parameters?.docs?.source}}}})))()}H();export{R as Parts,L as Playground,B as Specs,z as States,V as __namedExportsOrder,F as default};