import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{d as n,i as r}from"./ledger-2F-x73ca.js";import{n as i,t as a}from"./LedgerAllocationTable-Co-IR1_c.js";import{i as o,n as s,o as c,r as l}from"./play-Dr1R_I1D.js";import{c as u,d,i as f,l as p,t as m,u as h}from"./kit-CWUgB5-0.js";function g({cargos:e,ancho:t}){return(0,_.jsx)(`div`,{style:{width:b[t],maxWidth:`100%`},children:(0,_.jsx)(a,{cargos:y[e]})})}var _,v,y,b,x,S,C,w,T,E,D,O;function k(){return(k=e((()=>{n(),d(),l(),i(),_=t(),v=r.filter(e=>e.tipo===`Charge`),y={open:v,few:v.slice(0,2),none:[]},b={panel:1100,narrow:360},x=c(o(/Toggle details for Periodic oral evaluation/),s(/Original charge/)),S={title:`Components/Ledger/LedgerAllocationTable`,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:720},description:{component:[`**Ledger Transactions**: los cargos abiertos del paciente en *Patient Payment*, *Credit Adjustment* y *Post Payment*. En **Applied** se escribe cuánto del pago va a cada cargo; el pie suma lo aplicado y lo que falta.`,``,"**Cada fila se despliega** con el detalle del Ledger: la flecha al inicio (`RowChevron`, la misma de todas las tablas), clic en la fila menos en Applied, y *Collapse all / Expand all* desde que hay una abierta. Antes esta tabla se abría sin flecha; desde 2026-10-18 la lleva como las demás.",``,`**Probalo:** en *Playground* elegí cuántos cargos hay y el ancho desde *Controls*, y tocá una fila para desplegarla.`].join(`
`)}}},args:{cargos:`open`,ancho:`panel`},argTypes:{cargos:{name:`charges`,control:`inline-radio`,options:Object.keys(y),description:`open: todos los cargos (3 páginas) · few: dos · none: sin cargos abiertos.`},ancho:{name:`width`,control:`inline-radio`,options:Object.keys(b),description:`panel 1100 (el Ledger a 1440) · narrow 360 (teléfono: la tabla scrollea y el detalle queda en la parte visible).`}}},C={render:e=>(0,_.jsx)(g,{...e})},w={parameters:{controls:{disable:!0}},render:()=>(0,_.jsxs)(f,{className:`max-w-[1100px]`,children:[(0,_.jsx)(m,{titulo:`A row open`,nota:`D0120: el detalle del Ledger debajo de la fila, alineado con la primera columna.`,children:(0,_.jsx)(g,{cargos:`open`,ancho:`panel`})}),(0,_.jsx)(m,{titulo:`What each part is`,children:(0,_.jsx)(p,{partes:[[`Row chevron`,`Primera columna; gira al abrir. La misma flecha que DataTable, el Ledger y Treatment Plan.`,`RowChevron`],[`Row`,`Clic o Enter / Espacio la abre y la cierra; el clic en Applied o en el borde de una columna no.`,`LedgerAllocationTable`],[`Applied`,`Cuánto del pago va a ese cargo, hasta el monto del cargo.`,`LedgerAllocationTable`],[`Detail`,`El del Ledger según el tipo, fijo en la parte visible si la tabla scrollea.`,`LedgerRowDetail`],[`Collapse all / Expand all`,`Arriba de la tabla, desde que hay una fila abierta.`,`BotonExpandirTodo`],[`Columns`,`Oculta columnas; Date, Applied y Balance quedan siempre.`,`ColumnPicker`],[`Totals`,`Amount not applied y Amount applied, adentro de la tabla, arriba del paginado.`,`LedgerAllocationTable`]]})})]}),play:x},T={parameters:{controls:{disable:!0}},render:()=>(0,_.jsxs)(f,{className:`max-w-[1100px]`,children:[(0,_.jsx)(m,{titulo:`Closed`,nota:`Las filas con su flecha, ninguna abierta.`,children:(0,_.jsx)(g,{cargos:`few`,ancho:`panel`})}),(0,_.jsx)(m,{titulo:`Empty`,nota:`Sin cargos abiertos: no hay a qué aplicar el pago.`,children:(0,_.jsx)(g,{cargos:`none`,ancho:`panel`})}),(0,_.jsx)(m,{titulo:`Narrow`,nota:`Teléfono: la tabla scrollea de costado; la flecha queda primera.`,children:(0,_.jsx)(g,{cargos:`few`,ancho:`narrow`})})]})},E={name:`Row open`,render:e=>(0,_.jsx)(g,{...e}),play:x},D={parameters:{controls:{disable:!0}},render:()=>(0,_.jsxs)(f,{children:[(0,_.jsx)(m,{titulo:`Layout`,children:(0,_.jsxs)(u,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Row chevron`}),(0,_.jsxs)(`td`,{children:[`16px `,(0,_.jsx)(h,{nombre:`ink-faint`}),`, 6px hasta Date; gira 90° abierta.`]})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Row`}),(0,_.jsxs)(`td`,{children:[`12px `,(0,_.jsx)(h,{nombre:`ink-soft`}),`, padding 10px 12px, gap 6px entre columnas. Abierta, fondo `,(0,_.jsx)(h,{nombre:`surface-subtle`}),`.`]})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Detail`}),(0,_.jsxs)(`td`,{children:[`Fondo `,(0,_.jsx)(h,{nombre:`surface-subtle`}),`, 34px a la izquierda (12 + flecha 16 + gap 6): arranca donde arranca Date.`]})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Fit`}),(0,_.jsx)(`td`,{children:`Las 12 columnas entran sin scroll en el Ledger a 1440; más angosto, la tabla scrollea dentro de su caja.`})]})]})}),(0,_.jsx)(m,{titulo:`Rules`,children:(0,_.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,_.jsx)(`li`,{children:`A row that unfolds always shows the chevron, as in every other table (Elements / Tables → Rules).`}),(0,_.jsx)(`li`,{children:`Typing in Applied never opens or closes the row.`})]})})]})},O=[`Playground`,`Parts`,`States`,`RowOpen`,`Specs`],C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: a => <Ejemplo {...a} />
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
    </Lienzo>,
  play: abrirPrimera
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Row open',
  render: a => <Ejemplo {...a} />,
  play: abrirPrimera
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}}})))()}k();export{w as Parts,C as Playground,E as RowOpen,D as Specs,T as States,O as __namedExportsOrder,S as default};