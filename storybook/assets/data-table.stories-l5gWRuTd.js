import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,g as i}from"./dropdown-menu-2J7FXUYb.js";import{n as a,t as o}from"./pencil-MjfcJKGT.js";import{n as s,t as c}from"./plus-Cbf0BrW0.js";import{a as l,i as u,n as d,r as f,t as p}from"./data-table-C9HxY9zN.js";import{n as m,t as h}from"./trash-2-DEp31W5F.js";import{n as g,t as _}from"./users-DciDZrSY.js";import{a as v,r as y}from"./button-Cb-S0EUF.js";import{i as b,r as x}from"./pill-Qo___yxt.js";import{c as S,o as C,r as w,s as T,t as E}from"./kit-DxbGnops.js";function D({p:e}){return(0,A.jsx)(`dl`,{className:`grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4`,children:[[`Email`,e.email],[`Birthday`,e.nacimiento],[`Provider`,e.provider],[`Last visit`,e.visita]].map(([e,t])=>(0,A.jsxs)(`div`,{children:[(0,A.jsx)(`dt`,{className:`text-[11px] font-semibold text-ink-muted`,children:e}),(0,A.jsx)(`dd`,{className:`text-ink`,children:t})]},e))})}function O({columns:e,rows:t,search:n,filter:i,columnPicker:a,resizable:s,expandable:l,selectable:u,rowActions:f,primaryAction:p,clickableRows:m,density:g,pageSize:v,itemLabel:b}){let[x,S]=(0,k.useState)(null),C=L.filter(t=>e.includes(t)).map(e=>I[e]);return(0,A.jsxs)(`div`,{className:`flex flex-col gap-3`,children:[(0,A.jsx)(d,{columns:C.length?C:[I.Name],rows:F.slice(0,t),rowKey:e=>e.id,rowLabel:e=>e.nombre,search:n?B:void 0,filter:i?z:void 0,columnPicker:a,resizable:s,rowDetail:l?e=>(0,A.jsx)(D,{p:e}):void 0,selectable:u,rowActions:f?()=>(0,A.jsxs)(A.Fragment,{children:[(0,A.jsxs)(r,{children:[(0,A.jsx)(o,{className:`size-4 shrink-0`}),` Edit`]}),(0,A.jsxs)(r,{variant:`destructive`,children:[(0,A.jsx)(h,{className:`size-4 shrink-0`}),` Delete`]})]}):void 0,onRowClick:m?e=>S(e.nombre):void 0,density:g,pageSize:v,itemLabel:b,empty:t===0?{icon:_,title:`No patients yet`,detail:`Add your first patient to see them here.`}:void 0,actions:p?(0,A.jsxs)(y,{size:`md`,children:[(0,A.jsx)(c,{}),`New patient`]}):void 0},`${v}-${t}-${C.map(e=>e.key).join()}`),x&&(0,A.jsxs)(`p`,{className:`text-[12px] text-ink-muted`,children:[`Row clicked: `,(0,A.jsx)(`b`,{className:`text-ink`,children:x}),` (in the app this opens the detail).`]})]})}var k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J;function Y(){return(Y=e((()=>{k=t(),a(),s(),m(),g(),l(),v(),i(),b(),S(),A=n(),j=[`Sarah Stone`,`John Lorem`,`Maria Abril Viola`,`Elias Aguirre`,`Nadia Duarte`,`Mara Otero`,`Tomás Rivas`,`Lucía Paz`,`Diego Luna`,`Ana Beltrán`,`Pablo Ortiz`,`Julia Vega`],M=[`Dr. Emily Chen`,`Dr. John Lorem`,`Dr. Ana Ruiz`],N=[`Active`,`Active`,`Inactive`,`Pending`],P={Active:`success`,Inactive:`neutral`,Pending:`warning`},F=Array.from({length:40},(e,t)=>{let n=j[t%j.length];return{id:`p-${t+1}`,nombre:n,iniciales:n.split(` `).map(e=>e[0]).slice(0,2).join(``),email:`${n.toLowerCase().split(` `)[0]}.${t+1}@mail.com`,nacimiento:`${String(t%28+1).padStart(2,`0`)}/${String(t%12+1).padStart(2,`0`)}/19${60+t%40}`,provider:M[t%M.length],estado:N[t%N.length],saldo:t*137%900-120,visita:`Sep ${t%28+1}, 2026`}}),I={Name:{key:`name`,header:`Full name`,width:220,locked:!0,cell:e=>(0,A.jsx)(f,{name:e.nombre,initials:e.iniciales})},Email:{key:`email`,header:`Email`,cell:e=>(0,A.jsx)(u,{children:e.email})},Birthday:{key:`birthday`,header:`Birthday`,width:120,cell:e=>e.nacimiento},Provider:{key:`provider`,header:`Provider`,width:150,cell:e=>(0,A.jsx)(u,{children:e.provider})},Status:{key:`status`,header:`Status`,width:110,cell:e=>(0,A.jsx)(x,{tone:P[e.estado],children:e.estado})},"Last visit":{key:`visit`,header:`Last visit`,width:120,cell:e=>e.visita},Balance:{key:`balance`,header:`Balance`,width:110,align:`right`,cell:e=>(0,A.jsx)(p,{value:e.saldo})}},L=Object.keys(I),R={title:`Elements/Tables`,parameters:{layout:`padded`,docs:{description:{component:["La tabla estándar de la app (`@/components/ui/data-table`). Tiene la misma anatomía que las tablas de Patients, Team, Accounts y Documents: **barra de arriba → encabezado → filas → pie**.",``,`**Cómo se arma:** le pasás las *columnas* (encabezado, ancho y qué dibujar en cada celda) y las *filas*. Selección, menú de fila, paginación y estado vacío se prenden con props.`,``,`**Reducir, achicar y filtrar** (las funciones del Ledger): buscador, filtro por estado, *Columns* para ocultar columnas, bordes de columna que se arrastran para achicar o ensanchar, y filas que se despliegan para ver el detalle.`,``,`**Armá tu tabla:** en *Playground* elegí columnas, cantidad de filas y funciones desde *Controls*. El código de la tabla que armaste aparece en *Show code*.`].join(`
`)}}},args:{columns:[`Name`,`Email`,`Status`,`Balance`],rows:24,search:!0,filter:!0,columnPicker:!0,resizable:!0,expandable:!1,selectable:!0,rowActions:!0,primaryAction:!0,clickableRows:!1,density:`regular`,pageSize:10,itemLabel:`patients`},argTypes:{columns:{control:`check`,options:L,description:`Qué columnas mostrar, en ese orden.`},rows:{control:{type:`range`,min:0,max:40,step:1},description:`Cantidad de filas. 0 muestra el estado vacío.`},search:{control:`boolean`,description:`Buscador por nombre o email.`,table:{category:`Reduce, resize and filter`}},filter:{control:`boolean`,description:`Embudo para filtrar por estado.`,table:{category:`Reduce, resize and filter`}},columnPicker:{control:`boolean`,description:`Botón Columns para ocultar columnas. Full name no se puede ocultar.`,table:{category:`Reduce, resize and filter`}},resizable:{control:`boolean`,description:`Arrastrá el borde de una columna para achicarla o ensancharla. Doble clic la devuelve a su ancho.`,table:{category:`Reduce, resize and filter`}},expandable:{control:`boolean`,description:`Clic en la fila despliega el detalle, con Expand / Collapse all.`,table:{category:`Reduce, resize and filter`}},selectable:{control:`boolean`,description:`Casilla por fila y "seleccionar todo".`},rowActions:{control:`boolean`,description:`Menú ⋮ con Edit y Delete en cada fila.`},primaryAction:{control:`boolean`,description:`Botón New patient a la derecha de la barra.`},clickableRows:{control:`boolean`,description:`La fila entera abre el detalle (sin expandir).`},density:{control:`inline-radio`,options:[`regular`,`compact`],description:`regular 56px por fila · compact 44px.`},pageSize:{control:`inline-radio`,options:[5,10,20],description:`Filas por página.`},itemLabel:{control:`text`,description:`Qué se cuenta en el pie.`}}},z={label:`Filter by status`,options:[`Active`,`Inactive`,`Pending`],match:(e,t)=>t.includes(e.estado)},B={placeholder:`Search patients`,match:(e,t)=>`${e.nombre} ${e.email}`.toLowerCase().includes(t.toLowerCase())},V={columns:[`Name`,`Email`,`Status`],rows:6,search:!1,filter:!1,columnPicker:!1,resizable:!1,expandable:!1,selectable:!1,rowActions:!1,primaryAction:!1,clickableRows:!1,density:`regular`,pageSize:10,itemLabel:`patients`},H={render:e=>(0,A.jsx)(O,{...e})},U={name:`Reduce, resize and filter`,parameters:{controls:{include:[`search`,`filter`,`columnPicker`,`resizable`,`expandable`]}},args:{columns:[`Name`,`Email`,`Birthday`,`Provider`,`Status`,`Last visit`,`Balance`],search:!0,filter:!0,columnPicker:!0,resizable:!0,expandable:!0},render:e=>(0,A.jsxs)(w,{className:`max-w-none`,children:[(0,A.jsxs)(`ul`,{className:`flex flex-col gap-1 text-[13px] text-ink-medium`,children:[(0,A.jsxs)(`li`,{children:[(0,A.jsx)(`b`,{className:`text-ink`,children:`Reduce:`}),` `,(0,A.jsx)(`i`,{children:`Columns`}),` oculta las columnas que no hacen falta; el buscador y el embudo reducen las filas. El pie dice cuántas quedan de cuántas.`]}),(0,A.jsxs)(`li`,{children:[(0,A.jsx)(`b`,{className:`text-ink`,children:`Resize:`}),` pasá el mouse por el encabezado y arrastrá el borde de una columna. Doble clic la devuelve a su ancho; `,(0,A.jsx)(`i`,{children:`Reset column widths`}),` las devuelve todas.`]}),(0,A.jsxs)(`li`,{children:[(0,A.jsx)(`b`,{className:`text-ink`,children:`Expand:`}),` clic en una fila despliega su detalle; `,(0,A.jsx)(`i`,{children:`Collapse all`}),` y `,(0,A.jsx)(`i`,{children:`Expand all`}),` aparecen apenas abrís una.`]})]}),(0,A.jsx)(O,{...e})]})},W=[{titulo:`Define the columns`,texto:`Una columna por dato: el encabezado, un ancho fijo en px (o ninguno, para la que se estira) y qué dibujar en la celda. Los montos van a la derecha.`,codigo:`const columns: DataTableColumn<Patient>[] = [
  { key: 'name', header: 'Full name', width: 220, cell: (p) => <PersonCell name={p.name} initials={p.initials} /> },
  { key: 'email', header: 'Email', cell: (p) => <TextCell>{p.email}</TextCell> },
  { key: 'status', header: 'Status', width: 110, cell: (p) => <Pill tone="success">{p.status}</Pill> },
  { key: 'balance', header: 'Balance', width: 110, align: 'right', cell: (p) => <AmountCell value={p.balance} /> },
]`},{titulo:`Pass the rows`,texto:`Las filas y cómo identificar cada una. Con eso ya hay tabla, con pie y paginación de 10.`,codigo:`<DataTable columns={columns} rows={patients} rowKey={(p) => p.id} itemLabel="patients" />`},{titulo:`Turn on what it needs`,texto:`Selección, menú de fila, acción principal y estado vacío, sólo si la pantalla los usa.`,codigo:`<DataTable
  columns={columns} rows={patients} rowKey={(p) => p.id} itemLabel="patients"
  selectable
  rowActions={(p) => <DropdownMenuItem onSelect={() => edit(p)}>Edit</DropdownMenuItem>}
  actions={<Button size="md"><Plus />New patient</Button>}
  empty={{ title: 'No patients yet', detail: 'Add your first patient.' }}
/>`},{titulo:`Let people reduce, resize and filter`,texto:`Las funciones del Ledger, cuando la tabla tiene muchas columnas o muchas filas: buscar, filtrar, ocultar columnas, arrastrar anchos y desplegar el detalle de una fila.`,codigo:`<DataTable
  columns={columns} rows={patients} rowKey={(p) => p.id}
  search={{ placeholder: 'Search patients', match: (p, q) => p.name.toLowerCase().includes(q.toLowerCase()) }}
  filter={{ label: 'Filter by status', options: ['Active', 'Inactive'], match: (p, sel) => sel.includes(p.status) }}
  columnPicker
  resizable
  rowDetail={(p) => <PatientSummary patient={p} />}
/>`}],G={name:`How to build a table`,parameters:{controls:{disable:!0}},render:()=>(0,A.jsxs)(w,{children:[(0,A.jsx)(`ol`,{className:`flex flex-col gap-6`,children:W.map((e,t)=>(0,A.jsxs)(`li`,{className:`grid grid-cols-1 gap-3 md:grid-cols-[260px_1fr]`,children:[(0,A.jsxs)(`div`,{children:[(0,A.jsxs)(`p`,{className:`text-[13px] font-semibold`,children:[(0,A.jsxs)(`span`,{className:`text-dash-blue`,children:[t+1,`.`]}),` `,e.titulo]}),(0,A.jsx)(`p`,{className:`mt-1 text-[12.5px] leading-relaxed text-ink-muted`,children:e.texto})]}),(0,A.jsx)(`pre`,{className:`overflow-x-auto rounded-lg bg-ink px-4 py-3 font-mono text-[11.5px] leading-relaxed text-white`,children:e.codigo})]},e.titulo))}),(0,A.jsx)(E,{titulo:`Result`,children:(0,A.jsx)(O,{...V,columns:[`Name`,`Email`,`Status`,`Balance`],rows:12,search:!0,filter:!0,columnPicker:!0,resizable:!0,selectable:!0,rowActions:!0,primaryAction:!0,pageSize:5})})]})},K={parameters:{controls:{disable:!0}},render:()=>(0,A.jsxs)(w,{children:[(0,A.jsx)(E,{titulo:`Empty`,nota:`Sin filas: el estado vacío dice por qué y qué hacer. No hay pie.`,children:(0,A.jsx)(O,{...V,rows:0})}),(0,A.jsx)(E,{titulo:`Selected rows`,nota:`La fila elegida toma el fondo azul claro y el pie cuenta cuántas hay.`,children:(0,A.jsx)(O,{...V,rows:4,selectable:!0})}),(0,A.jsx)(E,{titulo:`Compact`,nota:`44px por fila, para listas largas dentro de un panel.`,children:(0,A.jsx)(O,{...V,rows:4,density:`compact`})})]})},q={parameters:{controls:{disable:!0}},render:()=>(0,A.jsxs)(w,{children:[(0,A.jsx)(E,{titulo:`Parts`,nota:`Cada parte con su alto y sus colores, tomados de data-table.tsx y src/index.css.`,children:(0,A.jsxs)(C,{encabezado:[`Part`,`Height`,`Fill`,`Text`,`Divider`],minimo:760,children:[(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Container`}),(0,A.jsx)(`td`,{children:`—`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(T,{nombre:`white`})}),(0,A.jsx)(`td`,{children:`—`}),(0,A.jsxs)(`td`,{children:[(0,A.jsx)(T,{nombre:`line-row`}),` · radius 8px`]})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Header row`}),(0,A.jsx)(`td`,{className:`tabular-nums`,children:`44px`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(T,{nombre:`surface-alt`})}),(0,A.jsxs)(`td`,{children:[(0,A.jsx)(T,{nombre:`ink-muted`}),` 11px Semibold`]}),(0,A.jsx)(`td`,{children:`—`})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Row`}),(0,A.jsx)(`td`,{className:`tabular-nums`,children:`56px · 44px compact`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(T,{nombre:`white`})}),(0,A.jsxs)(`td`,{children:[(0,A.jsx)(T,{nombre:`ink-soft`}),` 13px`]}),(0,A.jsx)(`td`,{children:(0,A.jsx)(T,{nombre:`line-row`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Selected row`}),(0,A.jsx)(`td`,{children:`—`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(T,{nombre:`dash-count-bg`})}),(0,A.jsx)(`td`,{children:`—`}),(0,A.jsx)(`td`,{children:`—`})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Footer`}),(0,A.jsx)(`td`,{className:`tabular-nums`,children:`52px`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(T,{nombre:`white`})}),(0,A.jsxs)(`td`,{children:[(0,A.jsx)(T,{nombre:`ink-muted`}),` 12px Semibold`]}),(0,A.jsx)(`td`,{children:(0,A.jsx)(T,{nombre:`line-row`})})]})]})}),(0,A.jsx)(E,{titulo:`Rules`,children:(0,A.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,A.jsx)(`li`,{children:`One column stretches (the one without a width); the rest have a fixed width so header and rows line up.`}),(0,A.jsx)(`li`,{children:`Amounts align right with tabular numbers; text that does not fit ends in “…” and shows in full on hover.`}),(0,A.jsx)(`li`,{children:`If the columns do not fit, the table scrolls inside its box: the page never scrolls sideways.`}),(0,A.jsx)(`li`,{children:`Above the table, never inside it: search and filter on the left; Columns and the main action on the right.`}),(0,A.jsx)(`li`,{children:`Turn on Columns and resizable columns when the table has more columns than fit; search and filter when it has more rows than one page.`})]})})]})},J=[`Playground`,`ReduceResizeAndFilter`,`HowToBuild`,`States`,`Specs`],H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: args => <Armada {...args} />
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  name: 'Reduce, resize and filter',
  parameters: {
    controls: {
      include: ['search', 'filter', 'columnPicker', 'resizable', 'expandable']
    }
  },
  args: {
    columns: ['Name', 'Email', 'Birthday', 'Provider', 'Status', 'Last visit', 'Balance'],
    search: true,
    filter: true,
    columnPicker: true,
    resizable: true,
    expandable: true
  },
  render: args => <Lienzo className="max-w-none">
      <ul className="flex flex-col gap-1 text-[13px] text-ink-medium">
        <li><b className="text-ink">Reduce:</b> <i>Columns</i> oculta las columnas que no hacen falta; el buscador y el embudo reducen las filas. El pie dice cuántas quedan de cuántas.</li>
        <li><b className="text-ink">Resize:</b> pasá el mouse por el encabezado y arrastrá el borde de una columna. Doble clic la devuelve a su ancho; <i>Reset column widths</i> las devuelve todas.</li>
        <li><b className="text-ink">Expand:</b> clic en una fila despliega su detalle; <i>Collapse all</i> y <i>Expand all</i> aparecen apenas abrís una.</li>
      </ul>
      <Armada {...args} />
    </Lienzo>
}`,...U.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  name: 'How to build a table',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <ol className="flex flex-col gap-6">
        {PASOS.map((p, i) => <li key={p.titulo} className="grid grid-cols-1 gap-3 md:grid-cols-[260px_1fr]">
            <div>
              <p className="text-[13px] font-semibold"><span className="text-dash-blue">{i + 1}.</span> {p.titulo}</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-ink-muted">{p.texto}</p>
            </div>
            <pre className="overflow-x-auto rounded-lg bg-ink px-4 py-3 font-mono text-[11.5px] leading-relaxed text-white">{p.codigo}</pre>
          </li>)}
      </ol>
      <Bloque titulo="Result">
        <Armada {...BASE} columns={['Name', 'Email', 'Status', 'Balance']} rows={12} search filter columnPicker resizable selectable rowActions primaryAction pageSize={5} />
      </Bloque>
    </Lienzo>
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Empty" nota="Sin filas: el estado vacío dice por qué y qué hacer. No hay pie.">
        <Armada {...BASE} rows={0} />
      </Bloque>
      <Bloque titulo="Selected rows" nota="La fila elegida toma el fondo azul claro y el pie cuenta cuántas hay.">
        <Armada {...BASE} rows={4} selectable />
      </Bloque>
      <Bloque titulo="Compact" nota="44px por fila, para listas largas dentro de un panel.">
        <Armada {...BASE} rows={4} density="compact" />
      </Bloque>
    </Lienzo>
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Parts" nota="Cada parte con su alto y sus colores, tomados de data-table.tsx y src/index.css.">
        <Tabla encabezado={['Part', 'Height', 'Fill', 'Text', 'Divider']} minimo={760}>
          <tr><td className="font-semibold">Container</td><td>—</td><td><Token nombre="white" /></td><td>—</td><td><Token nombre="line-row" /> · radius 8px</td></tr>
          <tr><td className="font-semibold">Header row</td><td className="tabular-nums">44px</td><td><Token nombre="surface-alt" /></td><td><Token nombre="ink-muted" /> 11px Semibold</td><td>—</td></tr>
          <tr><td className="font-semibold">Row</td><td className="tabular-nums">56px · 44px compact</td><td><Token nombre="white" /></td><td><Token nombre="ink-soft" /> 13px</td><td><Token nombre="line-row" /></td></tr>
          <tr><td className="font-semibold">Selected row</td><td>—</td><td><Token nombre="dash-count-bg" /></td><td>—</td><td>—</td></tr>
          <tr><td className="font-semibold">Footer</td><td className="tabular-nums">52px</td><td><Token nombre="white" /></td><td><Token nombre="ink-muted" /> 12px Semibold</td><td><Token nombre="line-row" /></td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>One column stretches (the one without a width); the rest have a fixed width so header and rows line up.</li>
          <li>Amounts align right with tabular numbers; text that does not fit ends in “…” and shows in full on hover.</li>
          <li>If the columns do not fit, the table scrolls inside its box: the page never scrolls sideways.</li>
          <li>Above the table, never inside it: search and filter on the left; Columns and the main action on the right.</li>
          <li>Turn on Columns and resizable columns when the table has more columns than fit; search and filter when it has more rows than one page.</li>
        </ul>
      </Bloque>
    </Lienzo>
}`,...q.parameters?.docs?.source}}}})))()}Y();export{G as HowToBuild,H as Playground,U as ReduceResizeAndFilter,q as Specs,K as States,J as __namedExportsOrder,R as default};