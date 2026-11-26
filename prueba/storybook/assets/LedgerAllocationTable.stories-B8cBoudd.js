import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{g as r,o as i,t as a}from"./ledger-CZ3NwwJq.js";import{d as o,f as s,i as c,l,t as u,u as d}from"./kit-Di92TvVK.js";import{a as f,f as p,i as m,r as h,s as g}from"./ledgerAplicacion-FTMyHsui.js";import{n as _,t as v}from"./LedgerAllocationTable-Crem-87I.js";function y({cargos:e,ancho:t}){let n=C[e],[r,i]=(0,b.useState)(()=>f(h(n,300))),a=p(n,r,300,`The total applied amount cannot be greater than the payment amount.`);return(0,x.jsx)(`div`,{style:{width:w[t],maxWidth:`100%`},children:(0,x.jsx)(v,{cargos:n,aplicado:r,onAplicado:(e,t)=>i(n=>({...n,[e]:t})),aplicadoTotal:a.aplicadoTotal,noAplicado:a.noAplicado,error:a.error})})}var b,x,S,C,w,T,E,D,O,k,A,j;function M(){return(M=e((()=>{b=t(),r(),g(),s(),_(),x=n(),S=m(i,a,`John Smith`),C={open:S,few:S.slice(0,2),none:[]},w={panel:1100,narrow:360},T={title:`Components/Ledger/LedgerAllocationTable`,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:720},description:{component:[`**Ledger Transactions**: los cargos abiertos del paciente en *Patient Payment*, *Credit Adjustment* y *Post Payment*. En **Applied** se escribe cuánto del pago va a cada cargo; el pie suma lo aplicado y lo que falta.`,``,"**Cada fila se despliega** con el detalle del Ledger: la flecha al inicio (`RowChevron`, la misma de todas las tablas), clic en la fila menos en Applied, y *Collapse all / Expand all* desde que hay una abierta. Antes esta tabla se abría sin flecha; desde 2026-10-18 la lleva como las demás.",``,`**Probalo:** en *Playground* elegí cuántos cargos hay y el ancho desde *Controls*, y tocá una fila para desplegarla.`].join(`
`)}}},args:{cargos:`open`,ancho:`panel`},argTypes:{cargos:{name:`charges`,control:`inline-radio`,options:Object.keys(C),description:`open: todos los cargos (3 páginas) · few: dos · none: sin cargos abiertos.`},ancho:{name:`width`,control:`inline-radio`,options:Object.keys(w),description:`panel 1100 (el Ledger a 1440) · narrow 360 (teléfono: la tabla scrollea y el detalle queda en la parte visible).`}}},E={render:e=>(0,x.jsx)(y,{...e})},D={parameters:{controls:{disable:!0}},render:()=>(0,x.jsxs)(c,{className:`max-w-[1100px]`,children:[(0,x.jsx)(u,{titulo:`A row open`,nota:`D0120: el detalle del Ledger debajo de la fila, alineado con la primera columna.`,children:(0,x.jsx)(y,{cargos:`open`,ancho:`panel`})}),(0,x.jsx)(u,{titulo:`What each part is`,children:(0,x.jsx)(d,{partes:[[`Row chevron`,`Primera columna; gira al abrir. La misma flecha que DataTable, el Ledger y Treatment Plan.`,`RowChevron`],[`Row`,`Clic o Enter / Espacio la abre y la cierra; el clic en Applied o en el borde de una columna no.`,`LedgerAllocationTable`],[`Applied`,`Cuánto del pago va a ese cargo, hasta el monto del cargo.`,`LedgerAllocationTable`],[`Detail`,`El del Ledger según el tipo, fijo en la parte visible si la tabla scrollea.`,`LedgerRowDetail`],[`Collapse all / Expand all`,`Arriba de la tabla, desde que hay una fila abierta.`,`BotonExpandirTodo`],[`Columns`,`Oculta columnas; Date, Applied y Balance quedan siempre.`,`ColumnPicker`],[`Totals`,`Amount not applied y Amount applied, adentro de la tabla, arriba del paginado.`,`LedgerAllocationTable`]]})})]})},O={parameters:{controls:{disable:!0}},render:()=>(0,x.jsxs)(c,{className:`max-w-[1100px]`,children:[(0,x.jsx)(u,{titulo:`Closed`,nota:`Las filas con su flecha, ninguna abierta.`,children:(0,x.jsx)(y,{cargos:`few`,ancho:`panel`})}),(0,x.jsx)(u,{titulo:`Empty`,nota:`Sin cargos abiertos: no hay a qué aplicar el pago.`,children:(0,x.jsx)(y,{cargos:`none`,ancho:`panel`})}),(0,x.jsx)(u,{titulo:`Narrow`,nota:`Teléfono: la tabla scrollea de costado; la flecha queda primera.`,children:(0,x.jsx)(y,{cargos:`few`,ancho:`narrow`})})]})},k={name:`Row open`,render:e=>(0,x.jsx)(y,{...e})},A={parameters:{controls:{disable:!0}},render:()=>(0,x.jsxs)(c,{children:[(0,x.jsx)(u,{titulo:`Layout`,children:(0,x.jsxs)(l,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Row chevron`}),(0,x.jsxs)(`td`,{children:[`16px `,(0,x.jsx)(o,{nombre:`ink-faint`}),`, 6px hasta Date; gira 90° abierta.`]})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Row`}),(0,x.jsxs)(`td`,{children:[`12px `,(0,x.jsx)(o,{nombre:`ink-soft`}),`, padding 10px 12px, gap 6px entre columnas. Abierta, fondo `,(0,x.jsx)(o,{nombre:`surface-subtle`}),`.`]})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Detail`}),(0,x.jsxs)(`td`,{children:[`Fondo `,(0,x.jsx)(o,{nombre:`surface-subtle`}),`, 34px a la izquierda (12 + flecha 16 + gap 6): arranca donde arranca Date.`]})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Fit`}),(0,x.jsx)(`td`,{children:`Las 12 columnas entran sin scroll en el Ledger a 1440; más angosto, la tabla scrollea dentro de su caja.`})]})]})}),(0,x.jsx)(u,{titulo:`Rules`,children:(0,x.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,x.jsx)(`li`,{children:`A row that unfolds always shows the chevron, as in every other table (Elements / Tables → Rules).`}),(0,x.jsx)(`li`,{children:`Typing in Applied never opens or closes the row.`})]})})]})},j=[`Playground`,`Parts`,`States`,`RowOpen`,`Specs`],E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: a => <Ejemplo {...a} />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo className="max-w-[1100px]">
      <Bloque titulo="A row open" nota="D0120: el detalle del Ledger debajo de la fila, alineado con la primera columna.">
        <Ejemplo cargos="open" ancho="panel" />
      </Bloque>
      <Bloque titulo="What each part is">
        <TablaPartes partes={[['Row chevron', 'Primera columna; gira al abrir. La misma flecha que DataTable, el Ledger y Treatment Plan.', 'RowChevron'], ['Row', 'Clic o Enter / Espacio la abre y la cierra; el clic en Applied o en el borde de una columna no.', 'LedgerAllocationTable'], ['Applied', 'Cuánto del pago va a ese cargo, hasta el monto del cargo.', 'LedgerAllocationTable'], ['Detail', 'El del Ledger según el tipo, fijo en la parte visible si la tabla scrollea.', 'LedgerRowDetail'], ['Collapse all / Expand all', 'Arriba de la tabla, desde que hay una fila abierta.', 'BotonExpandirTodo'], ['Columns', 'Oculta columnas; Date, Applied y Balance quedan siempre.', 'ColumnPicker'], ['Totals', 'Amount not applied y Amount applied, adentro de la tabla, arriba del paginado.', 'LedgerAllocationTable']]} />
      </Bloque>
    </Lienzo>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo className="max-w-[1100px]">
      <Bloque titulo="Closed" nota="Las filas con su flecha, ninguna abierta.">
        <Ejemplo cargos="few" ancho="panel" />
      </Bloque>
      <Bloque titulo="Empty" nota="Sin cargos abiertos: no hay a qué aplicar el pago.">
        <Ejemplo cargos="none" ancho="panel" />
      </Bloque>
      <Bloque titulo="Narrow" nota="Teléfono: la tabla scrollea de costado; la flecha queda primera.">
        <Ejemplo cargos="few" ancho="narrow" />
      </Bloque>
    </Lienzo>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Row open',
  render: a => <Ejemplo {...a} />
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Layout">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Row chevron</td><td>16px <Token nombre="ink-faint" />, 6px hasta Date; gira 90° abierta.</td></tr>
          <tr><td className="font-semibold">Row</td><td>12px <Token nombre="ink-soft" />, padding 10px 12px, gap 6px entre columnas. Abierta, fondo <Token nombre="surface-subtle" />.</td></tr>
          <tr><td className="font-semibold">Detail</td><td>Fondo <Token nombre="surface-subtle" />, 34px a la izquierda (12 + flecha 16 + gap 6): arranca donde arranca Date.</td></tr>
          <tr><td className="font-semibold">Fit</td><td>Las 12 columnas entran sin scroll en el Ledger a 1440; más angosto, la tabla scrollea dentro de su caja.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>A row that unfolds always shows the chevron, as in every other table (Elements / Tables → Rules).</li>
          <li>Typing in Applied never opens or closes the row.</li>
        </ul>
      </Bloque>
    </Lienzo>
}`,...A.parameters?.docs?.source}}}})))()}M();export{D as Parts,E as Playground,k as RowOpen,A as Specs,O as States,j as __namedExportsOrder,T as default};