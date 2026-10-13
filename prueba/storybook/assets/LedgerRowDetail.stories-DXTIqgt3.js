import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,r}from"./toaster-B6mRBNx3.js";import{d as i,f as a,l as o,m as s,o as c,p as l}from"./data-table-BTRydb02.js";import{c as u,i as d,o as f,t as p,u as m}from"./ledger-88mvrIwW.js";import{c as h,d as g,i as _,t as v,u as y}from"./kit-CWUgB5-0.js";function b({movimiento:e,ancho:t}){let r=C(e);return(0,x.jsx)(`div`,{className:`overflow-hidden rounded-lg border border-line-row bg-white`,style:{width:T[t]},children:(0,x.jsx)(o,{m:r,onVerTodo:()=>n.info(`Opens the full record.`),onVerTransaccion:e=>n.info(`Opens ${e.descripcion}.`),onAbrirClinica:e=>n.info(e.caso?`Opens case ${e.caso} in Treatment Plan.`:`Opens procedure ${e.procedimiento} in Clinical Mode.`),onAplicarCredito:(r.creditoDisponible??0)>0?()=>n.info(`Opens Apply credit.`):void 0})})}var x,S,C,w,T,E,D,O,k,A,j,M;function N(){return(N=e((()=>{r(),g(),m(),s(),x=t(),S=u(d),C=e=>S.find(t=>t.id===e),w=Object.fromEntries(S.map(e=>[`${e.codigo===`—`?e.tipo:e.codigo} · ${e.descripcion.slice(0,32)}`,e.id])),T={table:900,phone:340},E={title:`Components/Ledger/LedgerRowDetail`,parameters:{layout:`padded`,docs:{description:{component:[`El detalle que se despliega al tocar una fila de **Transactions** en el Ledger, con la lista de *Components / UI / DetailList* (la misma del detalle de Clinical Mode).`,``,`**Un cargo** (procedimiento): *Treatment* (el caso de Treatment Plan del que sale y la visita), *Location*, *Financial details* (cargo original, lo pagado por el seguro, pagos y ajustes aplicados, y lo que falta: el saldo **de ese cargo**, no el de la cuenta) y *Applied transactions* (qué pago, ajuste o seguro se aplicó, cuándo y cuánto). Al pie *View procedure* abre el procedimiento en Clinical Mode.`,``,`**Un pago, ajuste o pago del seguro**: *Location*, *Financial details* (monto, aplicado a cargos, crédito sin aplicar) y *Applied to* (a qué cargos fue). Si queda crédito, *Apply credit*; lo que se aplica ahí aparece en las dos puntas.`,``,`**Probalo:** en *Playground* elegí la transacción y el ancho desde *Controls*, y tocá los links.`].join(`
`)}}},args:{movimiento:`m12`,ancho:`table`},argTypes:{movimiento:{name:`transaction`,control:`select`,options:Object.values(w),labels:Object.fromEntries(Object.entries(w).map(([e,t])=>[t,e])),description:`La fila desplegada.`},ancho:{name:`width`,control:`inline-radio`,options:Object.keys(T),description:`table 900 · phone 340.`}}},D={render:e=>(0,x.jsx)(b,{...e})},O={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,x.jsxs)(_,{children:[(0,x.jsx)(v,{titulo:`Charge`,nota:`D2392: Treatment, Location, Financial details y Applied transactions; al pie View procedure y View full record.`,children:(0,x.jsx)(b,{movimiento:`m12`,ancho:`table`})}),(0,x.jsx)(v,{titulo:`Payment`,nota:`Wire transfer: a qué cargos fue y cuánto.`,children:(0,x.jsx)(b,{movimiento:`m22`,ancho:`table`})}),(0,x.jsx)(v,{titulo:`Pieces`,children:(0,x.jsxs)(`div`,{className:`flex w-[760px] max-w-full flex-col gap-6`,children:[(0,x.jsxs)(`dl`,{className:`grid grid-cols-3 gap-6`,children:[(0,x.jsx)(i,{label:`Original charge`,valor:220}),(0,x.jsx)(i,{label:`Payments applied`,valor:120}),(0,x.jsx)(i,{label:`Outstanding balance`,valor:80,destacado:!0})]}),(0,x.jsx)(l,{m:C(`m12`),onAbrir:()=>n.info(`Opens the case.`)}),(0,x.jsx)(a,{filas:f(`m12`,p).map(e=>({a:e,otra:C(e.origen)})),columnaRef:`Reference / description`,onVer:e=>n.info(`Opens ${e.descripcion}.`)})]})}),(0,x.jsx)(v,{titulo:`What each part is`,children:(0,x.jsxs)(h,{encabezado:[`Part`,`What it does`,`Component`],minimo:720,arriba:!0,children:[(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Treatment`}),(0,x.jsx)(`td`,{children:`El caso del procedimiento que se cobra (estado como en Treatment Plan) y la visita; el link abre el caso en Clinical Mode.`}),(0,x.jsx)(`td`,{children:`TratamientoDelCargo`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Financial details`}),(0,x.jsx)(`td`,{children:`Números del cargo o del pago; el último, destacado, es lo que falta o lo que queda sin aplicar.`}),(0,x.jsx)(`td`,{children:`Metrica`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Applied transactions / Applied to`}),(0,x.jsx)(`td`,{children:`Fecha, tipo, la otra transacción (abre su registro) y lo aplicado. En el cargo, la nota aclara que es sólo lo aplicado a ese cargo.`}),(0,x.jsx)(`td`,{children:`TablaAplicaciones`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`List, rows, links, footer`}),(0,x.jsx)(`td`,{children:`Las piezas comunes.`}),(0,x.jsx)(`td`,{children:`Components / UI / DetailList`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Expand all / Collapse all`}),(0,x.jsx)(`td`,{children:`Arriba de la tabla, desde que hay una fila abierta.`}),(0,x.jsx)(`td`,{children:`BotonExpandirTodo`})]})]})})]})},k={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,x.jsxs)(_,{children:[(0,x.jsx)(v,{titulo:`Charge, partly paid`,nota:`D2392: $220 con pago, ajuste y transferencia aplicados; faltan $80.`,children:(0,x.jsx)(b,{movimiento:`m12`,ancho:`table`})}),(0,x.jsx)(v,{titulo:`Charge, paid by insurance`,nota:`D0120: lo cubrió el seguro entero; Outstanding en $0. Sin caso: No treatment plan linked.`,children:(0,x.jsx)(b,{movimiento:`m1`,ancho:`table`})}),(0,x.jsx)(v,{titulo:`Empty: charge with nothing applied`,nota:`D2740: nada aplicado todavía; la fila queda y lo dice.`,children:(0,x.jsx)(b,{movimiento:`m6`,ancho:`table`})}),(0,x.jsx)(v,{titulo:`Payment with unapplied credit`,nota:`Check payment: $50 aplicados y $150 sin aplicar; al pie, Apply credit.`,children:(0,x.jsx)(b,{movimiento:`m27`,ancho:`table`})}),(0,x.jsx)(v,{titulo:`Denied insurance`,nota:`BCBS denegado: nada aplicado y la nota lo dice.`,children:(0,x.jsx)(b,{movimiento:`m7`,ancho:`table`})}),(0,x.jsx)(v,{titulo:`Narrow`,nota:`Teléfono: el título de cada fila arriba y los números de a dos.`,children:(0,x.jsx)(b,{movimiento:`m12`,ancho:`phone`})})]})},A={parameters:{controls:{disable:!0}},render:()=>(0,x.jsxs)(`div`,{className:`flex gap-3`,children:[(0,x.jsx)(c,{todasAbiertas:!1,hayAlgunaAbierta:!0,onExpandirTodo:()=>{},onColapsarTodo:()=>{}}),(0,x.jsx)(c,{todasAbiertas:!0,hayAlgunaAbierta:!0,onExpandirTodo:()=>{},onColapsarTodo:()=>{}})]})},j={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,x.jsxs)(_,{children:[(0,x.jsx)(v,{titulo:`Financial details`,children:(0,x.jsxs)(h,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Grid`}),(0,x.jsx)(`td`,{children:`Cargo: 5 columnas desde 576px de detalle, 2 abajo. Pago: 3 columnas, 2 abajo.`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Label`}),(0,x.jsxs)(`td`,{children:[`11px `,(0,x.jsx)(y,{nombre:`ink-muted`})]})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Value`}),(0,x.jsxs)(`td`,{children:[`15px Medium `,(0,x.jsx)(y,{nombre:`ink`}),`; el destacado Semibold `,(0,x.jsx)(y,{nombre:`dash-blue`})]})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Outstanding balance`}),(0,x.jsx)(`td`,{children:`Monto del cargo menos lo aplicado; nunca el saldo corrido de la cuenta (eso es la columna Balance).`})]})]})}),(0,x.jsx)(v,{titulo:`Applied transactions`,children:(0,x.jsxs)(h,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Table`}),(0,x.jsxs)(`td`,{children:[`Encabezado 11px `,(0,x.jsx)(y,{nombre:`ink-muted`}),`, filas 12px con línea `,(0,x.jsx)(y,{nombre:`line-soft`}),`; fecha y monto sin partir.`]})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Date`}),(0,x.jsx)(`td`,{children:`MM/DD/YYYY, como la tabla de asignación.`})]}),(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Reference`}),(0,x.jsx)(`td`,{children:`Link a la otra transacción: abre su registro completo.`})]})]})}),(0,x.jsx)(v,{titulo:`In the table`,children:(0,x.jsx)(h,{encabezado:[`Item`,`Value`],minimo:560,children:(0,x.jsxs)(`tr`,{children:[(0,x.jsx)(`td`,{className:`font-semibold`,children:`Container`}),(0,x.jsxs)(`td`,{children:[`Fondo `,(0,x.jsx)(y,{nombre:`surface-subtle`}),`, padding 12px. Si la tabla scrollea de costado, el detalle queda en la parte visible (ancho visible menos el padding).`]})]})})})]})},M=[`Playground`,`Parts`,`States`,`ExpandAll`,`Specs`],D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: a => <EnTabla {...a} />
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
      <Bloque titulo="Charge" nota="D2392: Treatment, Location, Financial details y Applied transactions; al pie View procedure y View full record.">
        <EnTabla movimiento="m12" ancho="table" />
      </Bloque>
      <Bloque titulo="Payment" nota="Wire transfer: a qué cargos fue y cuánto.">
        <EnTabla movimiento="m22" ancho="table" />
      </Bloque>
      <Bloque titulo="Pieces">
        <div className="flex w-[760px] max-w-full flex-col gap-6">
          <dl className="grid grid-cols-3 gap-6">
            <Metrica label="Original charge" valor={220} />
            <Metrica label="Payments applied" valor={120} />
            <Metrica label="Outstanding balance" valor={80} destacado />
          </dl>
          <TratamientoDelCargo m={fila('m12')} onAbrir={() => aviso.info('Opens the case.')} />
          <TablaAplicaciones filas={aplicadoA('m12', APLICACIONES).map(a => ({
          a,
          otra: fila(a.origen)
        }))} columnaRef="Reference / description" onVer={x => aviso.info(\`Opens \${x.descripcion}.\`)} />
        </div>
      </Bloque>
      <Bloque titulo="What each part is">
        <Tabla encabezado={['Part', 'What it does', 'Component']} minimo={720} arriba>
          <tr><td className="font-semibold">Treatment</td><td>El caso del procedimiento que se cobra (estado como en Treatment Plan) y la visita; el link abre el caso en Clinical Mode.</td><td>TratamientoDelCargo</td></tr>
          <tr><td className="font-semibold">Financial details</td><td>Números del cargo o del pago; el último, destacado, es lo que falta o lo que queda sin aplicar.</td><td>Metrica</td></tr>
          <tr><td className="font-semibold">Applied transactions / Applied to</td><td>Fecha, tipo, la otra transacción (abre su registro) y lo aplicado. En el cargo, la nota aclara que es sólo lo aplicado a ese cargo.</td><td>TablaAplicaciones</td></tr>
          <tr><td className="font-semibold">List, rows, links, footer</td><td>Las piezas comunes.</td><td>Components / UI / DetailList</td></tr>
          <tr><td className="font-semibold">Expand all / Collapse all</td><td>Arriba de la tabla, desde que hay una fila abierta.</td><td>BotonExpandirTodo</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
      <Bloque titulo="Charge, partly paid" nota="D2392: $220 con pago, ajuste y transferencia aplicados; faltan $80.">
        <EnTabla movimiento="m12" ancho="table" />
      </Bloque>
      <Bloque titulo="Charge, paid by insurance" nota="D0120: lo cubrió el seguro entero; Outstanding en $0. Sin caso: No treatment plan linked.">
        <EnTabla movimiento="m1" ancho="table" />
      </Bloque>
      <Bloque titulo="Empty: charge with nothing applied" nota="D2740: nada aplicado todavía; la fila queda y lo dice.">
        <EnTabla movimiento="m6" ancho="table" />
      </Bloque>
      <Bloque titulo="Payment with unapplied credit" nota="Check payment: $50 aplicados y $150 sin aplicar; al pie, Apply credit.">
        <EnTabla movimiento="m27" ancho="table" />
      </Bloque>
      <Bloque titulo="Denied insurance" nota="BCBS denegado: nada aplicado y la nota lo dice.">
        <EnTabla movimiento="m7" ancho="table" />
      </Bloque>
      <Bloque titulo="Narrow" nota="Teléfono: el título de cada fila arriba y los números de a dos.">
        <EnTabla movimiento="m12" ancho="phone" />
      </Bloque>
    </Lienzo>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <div className="flex gap-3">
      <BotonExpandirTodo todasAbiertas={false} hayAlgunaAbierta onExpandirTodo={() => {}} onColapsarTodo={() => {}} />
      <BotonExpandirTodo todasAbiertas hayAlgunaAbierta onExpandirTodo={() => {}} onColapsarTodo={() => {}} />
    </div>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
      <Bloque titulo="Financial details">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Grid</td><td>Cargo: 5 columnas desde 576px de detalle, 2 abajo. Pago: 3 columnas, 2 abajo.</td></tr>
          <tr><td className="font-semibold">Label</td><td>11px <Token nombre="ink-muted" /></td></tr>
          <tr><td className="font-semibold">Value</td><td>15px Medium <Token nombre="ink" />; el destacado Semibold <Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Outstanding balance</td><td>Monto del cargo menos lo aplicado; nunca el saldo corrido de la cuenta (eso es la columna Balance).</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Applied transactions">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Table</td><td>Encabezado 11px <Token nombre="ink-muted" />, filas 12px con línea <Token nombre="line-soft" />; fecha y monto sin partir.</td></tr>
          <tr><td className="font-semibold">Date</td><td>MM/DD/YYYY, como la tabla de asignación.</td></tr>
          <tr><td className="font-semibold">Reference</td><td>Link a la otra transacción: abre su registro completo.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="In the table">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Container</td><td>Fondo <Token nombre="surface-subtle" />, padding 12px. Si la tabla scrollea de costado, el detalle queda en la parte visible (ancho visible menos el padding).</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...j.parameters?.docs?.source}}}})))()}N();export{A as ExpandAll,O as Parts,D as Playground,j as Specs,k as States,M as __namedExportsOrder,E as default};