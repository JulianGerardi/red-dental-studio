import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{ct as n,lt as r,st as i}from"./data-table-BVRbGVoU.js";import{n as a,t as o}from"./circle-plus-B8TyoxsG.js";import{a as s,r as c}from"./button-B6KF1ajn.js";import{n as l,t as u}from"./rotate-ccw-clock-D1myesp3.js";import{i as d,r as f}from"./pill-BGZIiHee.js";import{C as p,l as m}from"./clinical-mode-C-Zys8pS.js";import{a as h,r as g}from"./filter-menu-NsfuR-F1.js";import{d as _,f as v,i as y,l as b,n as x,o as S,t as C}from"./kit-Di92TvVK.js";import{i as w,n as T,o as E,r as D,t as O}from"./play-Dr1R_I1D.js";function k({orders:e,width:t}){return(0,A.jsx)(`div`,{className:`max-w-full`,style:{width:N[t]},children:(0,A.jsx)(i,{ordenes:m.slice(0,e)},`${e}-${t}`)})}var A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K;function q(){return(q=e((()=>{a(),l(),s(),h(),d(),v(),D(),p(),r(),A=t(),{userEvent:j,within:M}=__STORYBOOK_MODULE_TEST__,N={desktop:1280,tablet:768,phone:390},P={title:`Components/Clinical/LabOrderPanel`,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:760},description:{component:[`La pestaña **Lab Order** de Clinical Mode (Figma 4070:148911, el listado). Desde el 2026-10-08 usa la estética del resto de la app: la card de la página (sombra, sin borde) con la **tabla estándar** (Elements / Tables) adentro, igual que la Problem List del Overview.`,``,"**Barra:** el buscador primero y después **Filter** (Elements / Filter) con los estados de la orden, su cantidad y el punto del color de su pill; a la derecha *View History* (secundario) y *New Prescription* (la acción principal), los dos con `ui/button`. **Tabla:** Provider y Patient con las iniciales del equipo, la pill de estado, las fechas (la de vencimiento en rojo si vence pronto) y el kebab de fila (*View order*, *Edit order* y, si sigue abierta, *Cancel order* con Undo). **Pie:** el de la tabla estándar, con *Show* 5 / 10 / 20 y la paginación.",``,`"active prescriptions" y "New prescription" son texto de Prescription que quedó en el frame (anomalía 85): se copian tal cual. El detalle de la orden y el modal *New Laboratory* quedan pendientes.`,``,`**Probalo:** en *Playground* buscá, filtrá por estado, abrí el menú de una fila y cancelá una orden; desde *Controls* cambiá cuántas órdenes hay (0 muestra el vacío) y el ancho.`].join(`
`)}}},args:{orders:m.length,width:`desktop`},argTypes:{orders:{control:{type:`range`,min:0,max:m.length,step:1},description:`Cuántas órdenes trae el panel. Con 0, el estado vacío; con más de 5 y Show en 5, la paginación.`},width:{control:`inline-radio`,options:Object.keys(N),description:`desktop 1280 · tablet 768 (la tabla scrollea adentro de su caja) · phone 390.`}}},F={render:e=>(0,A.jsx)(k,{...e})},I={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,A.jsxs)(y,{children:[(0,A.jsx)(C,{titulo:`Toolbar`,nota:`El buscador y Filter a la izquierda; las acciones a la derecha. Todo de 36px de alto.`,children:(0,A.jsxs)(S,{children:[(0,A.jsx)(x,{rotulo:`Filter (sin aplicar / con 2 estados)`,children:(0,A.jsxs)(`span`,{className:`flex gap-2`,children:[(0,A.jsx)(g,{}),(0,A.jsx)(g,{count:2})]})}),(0,A.jsx)(x,{rotulo:`View History · secondary lg`,children:(0,A.jsxs)(c,{variant:`secondary`,children:[(0,A.jsx)(u,{}),` View history`]})}),(0,A.jsx)(x,{rotulo:`New Prescription · primary lg`,children:(0,A.jsxs)(c,{children:[(0,A.jsx)(o,{}),` New prescription`]})})]})}),(0,A.jsx)(C,{titulo:`Status pills`,nota:`ORDEN_TONO: el mismo tono en la tabla, en el punto del filtro y en el detalle de la Problem List (RecordDetail).`,children:(0,A.jsx)(S,{children:Object.entries(n).map(([e,t])=>(0,A.jsx)(x,{rotulo:t,children:(0,A.jsx)(f,{tone:t,children:e})},e))})}),(0,A.jsx)(C,{titulo:`What each part does`,children:(0,A.jsxs)(b,{encabezado:[`Part`,`What it does`,`Component`],minimo:720,children:[(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Card`}),(0,A.jsx)(`td`,{children:`La card de la página: blanca, sombra, sin borde, 16px de aire.`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`code`,{children:`TARJETA_PANEL`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Search`}),(0,A.jsx)(`td`,{children:`Filtra mientras se tipea por provider, paciente o estado.`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`code`,{children:`DataTable search`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Filter`}),(0,A.jsx)(`td`,{children:`Estados de la orden, de a varios, con cantidad y color; sin nada tildado se ve todo. Se borra con Clear all.`}),(0,A.jsxs)(`td`,{children:[(0,A.jsx)(`code`,{children:`DataTable filter`}),` → FilterMenu`]})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`View history`}),(0,A.jsx)(`td`,{children:`Acción secundaria. Avisa que no está en esta versión.`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`code`,{children:`Button secondary`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`New prescription`}),(0,A.jsx)(`td`,{children:`La acción principal. Avisa que no está en esta versión.`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`code`,{children:`Button`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Provider · Patient`}),(0,A.jsx)(`td`,{children:`El Avatar y el nombre, sin link.`}),(0,A.jsxs)(`td`,{children:[`como `,(0,A.jsx)(`code`,{children:`PersonCell`})]})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Status`}),(0,A.jsx)(`td`,{children:`La pill del estado.`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`code`,{children:`Pill`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Expiration date`}),(0,A.jsxs)(`td`,{children:[`En rojo y semibold si vence pronto (`,(0,A.jsx)(`code`,{children:`urgente`}),`).`]}),(0,A.jsx)(`td`,{children:`—`})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Row menu`}),(0,A.jsx)(`td`,{children:`View order, Edit order y, en Requested / Pending / Delayed, Cancel order (rojo) con Undo.`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`code`,{children:`RowActionsMenu`})})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Footer`}),(0,A.jsx)(`td`,{children:`"Showing X to Y of N active prescriptions", Show 5 / 10 / 20 y las páginas.`}),(0,A.jsx)(`td`,{children:(0,A.jsx)(`code`,{children:`DataTable`})})]})]})})]})},L={name:`Filter open`,render:e=>(0,A.jsx)(k,{...e}),play:E(w(/filter lab orders by status/i),T(/^Filters$/))},R={render:e=>(0,A.jsx)(k,{...e}),play:async e=>{await w(/filter lab orders by status/i)(e),await j.click(await M(e.canvasElement.ownerDocument.body).findByRole(`menuitemcheckbox`,{name:/Requested/})),await T(/filtered from 9/)(e)}},z={name:`Row menu`,render:e=>(0,A.jsx)(k,{...e}),play:E(w(/actions for james cartes/i),T(/cancel order/i))},B={render:e=>(0,A.jsx)(k,{...e}),play:async e=>{await w(/actions for james cartes/i)(e),await j.click(await M(e.canvasElement.ownerDocument.body).findByRole(`menuitem`,{name:/cancel order/i})),await T(/lab order for james cartes canceled/i)(e)}},V={name:`No results`,render:e=>(0,A.jsx)(k,{...e}),play:E(O(/search/i,`zzzz`),T(/nothing matches/i))},H={args:{orders:0},render:e=>(0,A.jsx)(k,{...e}),play:T(/no lab orders yet/i)},U={args:{width:`phone`},render:e=>(0,A.jsx)(k,{...e})},W={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,A.jsx)(y,{children:(0,A.jsx)(C,{titulo:`States`,children:(0,A.jsxs)(b,{encabezado:[`State`,`When`,`Story`],minimo:620,children:[(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Default`}),(0,A.jsx)(`td`,{children:`Las 9 órdenes del frame, sin filtro.`}),(0,A.jsx)(`td`,{children:`Playground`})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Filter open`}),(0,A.jsx)(`td`,{children:`Los seis estados con cantidad y color, en el orden del pedido.`}),(0,A.jsx)(`td`,{children:`Filter Open`})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Filtered`}),(0,A.jsx)(`td`,{children:`Filter azul con la cuenta; el pie dice "(filtered from 9)".`}),(0,A.jsx)(`td`,{children:`Filtered`})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Row menu`}),(0,A.jsx)(`td`,{children:`View order, Edit order y Cancel order si la orden sigue abierta.`}),(0,A.jsx)(`td`,{children:`Row Menu`})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Canceled`}),(0,A.jsx)(`td`,{children:`La orden pasa a Canceled; Undo la devuelve.`}),(0,A.jsx)(`td`,{children:`Canceled`})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`No results`}),(0,A.jsx)(`td`,{children:`La búsqueda o el filtro no encuentran nada: "No results".`}),(0,A.jsx)(`td`,{children:`No Results`})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Empty`}),(0,A.jsx)(`td`,{children:`El paciente no tiene órdenes: "No lab orders yet".`}),(0,A.jsx)(`td`,{children:`Empty`})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Phone`}),(0,A.jsx)(`td`,{children:`La barra baja en filas; la tabla scrollea adentro de su caja.`}),(0,A.jsx)(`td`,{children:`Phone`})]})]})})})},G={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,A.jsx)(y,{children:(0,A.jsx)(C,{titulo:`Specs`,children:(0,A.jsxs)(b,{encabezado:[`Item`,`Value`],minimo:620,children:[(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Card`}),(0,A.jsxs)(`td`,{children:[`Radio 8 · padding 16 · `,(0,A.jsx)(_,{nombre:`white`}),` · shadow-panel, sin borde`]})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Toolbar`}),(0,A.jsx)(`td`,{children:`Alto 36 · search 260 · Filter md · botones lg · 8 entre piezas · 12 hasta la tabla`})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Table`}),(0,A.jsxs)(`td`,{children:[`La estándar: encabezado 44 en `,(0,A.jsx)(_,{nombre:`surface-alt`}),`, filas 56, texto 13px `,(0,A.jsx)(_,{nombre:`ink-soft`}),`, divisor `,(0,A.jsx)(_,{nombre:`line-row`})]})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Columns`}),(0,A.jsx)(`td`,{children:`Provider y Patient se estiran (mín. 160) · Status 110 · Updated 110 · Created 110 · Expiration Date 120 · Actions 40`})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`People`}),(0,A.jsxs)(`td`,{children:[`Avatar de 32 (Elements / Avatars); nombre 13px medium `,(0,A.jsx)(_,{nombre:`ink`})]})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Expiring soon`}),(0,A.jsxs)(`td`,{children:[`Semibold `,(0,A.jsx)(_,{nombre:`dash-bad-fg`})]})]}),(0,A.jsxs)(`tr`,{children:[(0,A.jsx)(`td`,{className:`font-semibold`,children:`Rows per page`}),(0,A.jsx)(`td`,{children:`10 (entran las 9 del frame), con Show 5 / 10 / 20`})]})]})})})},K=[`Playground`,`Parts`,`FilterOpen`,`Filtered`,`RowMenu`,`Canceled`,`NoResults`,`Empty`,`Phone`,`States`,`Specs`],F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: args => <Panel {...args} />
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Toolbar" nota="El buscador y Filter a la izquierda; las acciones a la derecha. Todo de 36px de alto.">
        <Muestras>
          <ConRotulo rotulo="Filter (sin aplicar / con 2 estados)"><span className="flex gap-2"><FilterTrigger /><FilterTrigger count={2} /></span></ConRotulo>
          <ConRotulo rotulo="View History · secondary lg"><Button variant="secondary"><History /> View history</Button></ConRotulo>
          <ConRotulo rotulo="New Prescription · primary lg"><Button><CirclePlus /> New prescription</Button></ConRotulo>
        </Muestras>
      </Bloque>
      <Bloque titulo="Status pills" nota="ORDEN_TONO: el mismo tono en la tabla, en el punto del filtro y en el detalle de la Problem List (RecordDetail).">
        <Muestras>
          {Object.entries(ORDEN_TONO).map(([e, tono]) => <ConRotulo key={e} rotulo={tono}><Pill tone={tono}>{e}</Pill></ConRotulo>)}
        </Muestras>
      </Bloque>
      <Bloque titulo="What each part does">
        <Tabla encabezado={['Part', 'What it does', 'Component']} minimo={720}>
          <tr><td className="font-semibold">Card</td><td>La card de la página: blanca, sombra, sin borde, 16px de aire.</td><td><code>TARJETA_PANEL</code></td></tr>
          <tr><td className="font-semibold">Search</td><td>Filtra mientras se tipea por provider, paciente o estado.</td><td><code>DataTable search</code></td></tr>
          <tr><td className="font-semibold">Filter</td><td>Estados de la orden, de a varios, con cantidad y color; sin nada tildado se ve todo. Se borra con Clear all.</td><td><code>DataTable filter</code> → FilterMenu</td></tr>
          <tr><td className="font-semibold">View history</td><td>Acción secundaria. Avisa que no está en esta versión.</td><td><code>Button secondary</code></td></tr>
          <tr><td className="font-semibold">New prescription</td><td>La acción principal. Avisa que no está en esta versión.</td><td><code>Button</code></td></tr>
          <tr><td className="font-semibold">Provider · Patient</td><td>El Avatar y el nombre, sin link.</td><td>como <code>PersonCell</code></td></tr>
          <tr><td className="font-semibold">Status</td><td>La pill del estado.</td><td><code>Pill</code></td></tr>
          <tr><td className="font-semibold">Expiration date</td><td>En rojo y semibold si vence pronto (<code>urgente</code>).</td><td>—</td></tr>
          <tr><td className="font-semibold">Row menu</td><td>View order, Edit order y, en Requested / Pending / Delayed, Cancel order (rojo) con Undo.</td><td><code>RowActionsMenu</code></td></tr>
          <tr><td className="font-semibold">Footer</td><td>"Showing X to Y of N active prescriptions", Show 5 / 10 / 20 y las páginas.</td><td><code>DataTable</code></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  name: 'Filter open',
  render: args => <Panel {...args} />,
  play: secuencia(pulsar(/filter lab orders by status/i), esperar(/^Filters$/))
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: args => <Panel {...args} />,
  play: async c => {
    await pulsar(/filter lab orders by status/i)(c);
    await userEvent.click(await within(c.canvasElement.ownerDocument.body).findByRole('menuitemcheckbox', {
      name: /Requested/
    }));
    await esperar(/filtered from 9/)(c);
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: 'Row menu',
  render: args => <Panel {...args} />,
  play: secuencia(pulsar(/actions for james cartes/i), esperar(/cancel order/i))
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: args => <Panel {...args} />,
  play: async c => {
    await pulsar(/actions for james cartes/i)(c);
    await userEvent.click(await within(c.canvasElement.ownerDocument.body).findByRole('menuitem', {
      name: /cancel order/i
    }));
    await esperar(/lab order for james cartes canceled/i)(c);
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  name: 'No results',
  render: args => <Panel {...args} />,
  play: secuencia(escribir(/search/i, 'zzzz'), esperar(/nothing matches/i))
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    orders: 0
  },
  render: args => <Panel {...args} />,
  play: esperar(/no lab orders yet/i)
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    width: 'phone'
  },
  render: args => <Panel {...args} />
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="States">
        <Tabla encabezado={['State', 'When', 'Story']} minimo={620}>
          <tr><td className="font-semibold">Default</td><td>Las 9 órdenes del frame, sin filtro.</td><td>Playground</td></tr>
          <tr><td className="font-semibold">Filter open</td><td>Los seis estados con cantidad y color, en el orden del pedido.</td><td>Filter Open</td></tr>
          <tr><td className="font-semibold">Filtered</td><td>Filter azul con la cuenta; el pie dice "(filtered from 9)".</td><td>Filtered</td></tr>
          <tr><td className="font-semibold">Row menu</td><td>View order, Edit order y Cancel order si la orden sigue abierta.</td><td>Row Menu</td></tr>
          <tr><td className="font-semibold">Canceled</td><td>La orden pasa a Canceled; Undo la devuelve.</td><td>Canceled</td></tr>
          <tr><td className="font-semibold">No results</td><td>La búsqueda o el filtro no encuentran nada: "No results".</td><td>No Results</td></tr>
          <tr><td className="font-semibold">Empty</td><td>El paciente no tiene órdenes: "No lab orders yet".</td><td>Empty</td></tr>
          <tr><td className="font-semibold">Phone</td><td>La barra baja en filas; la tabla scrollea adentro de su caja.</td><td>Phone</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Specs">
        <Tabla encabezado={['Item', 'Value']} minimo={620}>
          <tr><td className="font-semibold">Card</td><td>Radio 8 · padding 16 · <Token nombre="white" /> · shadow-panel, sin borde</td></tr>
          <tr><td className="font-semibold">Toolbar</td><td>Alto 36 · search 260 · Filter md · botones lg · 8 entre piezas · 12 hasta la tabla</td></tr>
          <tr><td className="font-semibold">Table</td><td>La estándar: encabezado 44 en <Token nombre="surface-alt" />, filas 56, texto 13px <Token nombre="ink-soft" />, divisor <Token nombre="line-row" /></td></tr>
          <tr><td className="font-semibold">Columns</td><td>Provider y Patient se estiran (mín. 160) · Status 110 · Updated 110 · Created 110 · Expiration Date 120 · Actions 40</td></tr>
          <tr><td className="font-semibold">People</td><td>Avatar de 32 (Elements / Avatars); nombre 13px medium <Token nombre="ink" /></td></tr>
          <tr><td className="font-semibold">Expiring soon</td><td>Semibold <Token nombre="dash-bad-fg" /></td></tr>
          <tr><td className="font-semibold">Rows per page</td><td>10 (entran las 9 del frame), con Show 5 / 10 / 20</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...G.parameters?.docs?.source}}}})))()}q();export{B as Canceled,H as Empty,L as FilterOpen,R as Filtered,V as NoResults,I as Parts,U as Phone,F as Playground,z as RowMenu,G as Specs,W as States,K as __namedExportsOrder,P as default};