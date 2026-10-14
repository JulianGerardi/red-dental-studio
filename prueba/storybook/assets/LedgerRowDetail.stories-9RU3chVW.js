import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,r}from"./tooltip-6ep9-x7U.js";import{n as i,r as a}from"./toaster-B6mRBNx3.js";import{a as o,c as s,l as c,o as l,r as u,t as d}from"./LedgerRowDetail-3Cy610qg.js";import{c as f,i as p,m,u as h}from"./ledger-Dof0Sq_G.js";import{f as g,n as _,t as v}from"./billing-Aye1hc6c.js";import{n as y,r as b}from"./play-Dr1R_I1D.js";import{c as x,d as S,i as C,t as w,u as T}from"./kit-CWUgB5-0.js";function E({caso:e,ancho:t}){let n=M(e);return(0,D.jsx)(r,{children:(0,D.jsx)(`div`,{className:`rounded-lg border border-line-row bg-white`,style:{width:N[t],maxWidth:`100%`,"--tabla-visible":`${N[t]}px`},children:(0,D.jsx)(l,{m:n,onVerTodo:()=>i.info(`Opens View full record.`),onVerTransaccion:P,onAplicarCredito:m(n)?()=>i.info(`Opens Apply credit.`):void 0})})})}var D,O,k,A,j,M,N,P,F,I,L,R,z,B,V;function H(){return(H=e((()=>{a(),n(),S(),b(),h(),g(),c(),D=t(),{userEvent:O,within:k}=__STORYBOOK_MODULE_TEST__,A={"charge-partly-paid":{titulo:`D4341 · charge, partly paid (Northgate Clinic)`,id:`m13`},"charge-paid":{titulo:`D0120 · charge paid by insurance`,id:`m1`},"charge-unpaid":{titulo:`D0220 · charge, nothing applied`,id:`m14`},"payment-several":{titulo:`Wire transfer · applied to four charges`,id:`m22`},"payment-credit":{titulo:`Check payment · with unapplied credit`,id:`m27`},"insurance-denied":{titulo:`BCBS claim · denied`,id:`m7`}},j=f(p),M=e=>j.find(t=>t.id===A[e].id),N={table:1094,phone:356},P=e=>i.info(`Opens ${e.descripcion} in its full record.`),F={title:`Components/Ledger/LedgerRowDetail`,parameters:{layout:`padded`,docs:{description:{component:["Lo que se despliega debajo de una fila del **Ledger** y de **Billing** con un paciente elegido (en Billing, adentro del `rowDetail` de la tabla de la app).",``,`**Qué muestra:** los datos de la transacción (Description, Transaction date, Patient, Type, Code, Provider, Status, Tooth, Surface, Amount, Balance) y, debajo de una línea, lo del cobro (prototipo *Expanded transaction detail*, Julián 2026-10-14), con las filas de *Components / UI / DetailList*:`,``,`- **Clinic location**: la sede donde se registró.`,`- **Financial details**: un cargo, Original charge, Insurance paid, Payments applied, Credit adjustments applied y **Outstanding balance** (lo que falta de ese cargo, no el saldo de la cuenta). Un pago o ajuste, lo recibido, lo aplicado a cargos y **Unapplied credit**.`,`- **Applied transactions**: fecha, tipo, la otra transacción (abre su registro de sólo lectura) y lo aplicado. En un cargo, los pagos y ajustes que lo cubren; en un pago, los cargos a los que fue.`,``,`Al pie, **View full record** (el mismo contenido en un drawer) y, si queda crédito sin aplicar, **Apply credit**, que suma sus aplicaciones al detalle. Lo del cobro no está en Clinical Mode.`,``,`**Probalo:** en *Playground* elegí la transacción y el ancho desde *Controls*; tocá una referencia de Applied transactions.`].join(`
`)}}},args:{caso:`charge-partly-paid`,ancho:`table`},argTypes:{caso:{name:`transaction`,control:`select`,options:Object.keys(A),labels:Object.fromEntries(Object.entries(A).map(([e,t])=>[e,t.titulo])),description:`Un cargo (pagado, en parte o nada), un pago aplicado a varios cargos, uno con crédito sin aplicar o un claim denegado.`},ancho:{name:`width`,control:`inline-radio`,options:Object.keys(N),description:`table 1094 (el Ledger a 1440) · phone 356 (la tabla scrollea y el detalle queda en la parte visible).`}}},I={render:e=>(0,D.jsx)(E,{...e})},L={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,D.jsx)(r,{children:(0,D.jsxs)(C,{children:[(0,D.jsx)(w,{titulo:`The detail`,nota:`Los datos de la transacción, la línea, lo del cobro y el pie.`,children:(0,D.jsx)(E,{caso:`charge-partly-paid`,ancho:`table`})}),(0,D.jsx)(w,{titulo:`Billing`,nota:`El mismo contenido sin el marco (DetalleMovimiento): lo pone la tabla de la app. Card Payment de Maria Abril Viola, aplicado a D1110.`,children:(0,D.jsx)(`div`,{className:`w-[960px] max-w-full rounded-lg border border-line-row bg-surface-subtle px-4 py-3 pl-11`,children:(0,D.jsx)(u,{m:v.find(e=>e.id===`act-Maria Abril Viola-1`),aplicaciones:_,movimientos:v,onVerTransaccion:P,onVerTodo:()=>i.info(`Opens View full record.`)})})}),(0,D.jsx)(w,{titulo:`Pieces`,children:(0,D.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,D.jsx)(`div`,{className:`@container flex w-[880px] max-w-full flex-col`,children:(0,D.jsx)(o,{m:M(`payment-several`),onVerTransaccion:P})}),(0,D.jsxs)(`dl`,{className:`grid w-[420px] grid-cols-2 gap-4`,children:[(0,D.jsx)(s,{label:`Original charge`,valor:310}),(0,D.jsx)(s,{label:`Outstanding balance`,valor:170,destacado:!0})]}),(0,D.jsxs)(`div`,{className:`flex gap-3`,children:[(0,D.jsx)(d,{todasAbiertas:!1,hayAlgunaAbierta:!0,onExpandirTodo:()=>{},onColapsarTodo:()=>{}}),(0,D.jsx)(d,{todasAbiertas:!0,hayAlgunaAbierta:!0,onExpandirTodo:()=>{},onColapsarTodo:()=>{}})]})]})}),(0,D.jsx)(w,{titulo:`What each part is`,children:(0,D.jsxs)(x,{encabezado:[`Part`,`What it does`,`Component`],minimo:720,arriba:!0,children:[(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Fields`}),(0,D.jsx)(`td`,{children:`Los datos de la transacción, de a tres columnas (una en el teléfono).`}),(0,D.jsx)(`td`,{children:`Campos`})]}),(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Clinic location`}),(0,D.jsx)(`td`,{children:`La sede donde se registró; sin dato, la principal.`}),(0,D.jsx)(`td`,{children:`FilasCobro`})]}),(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Financial details`}),(0,D.jsx)(`td`,{children:`Los números en columnas de 112px como mínimo, el monto abajo de su rótulo; el último destacado (lo que falta del cargo o el crédito sin aplicar). Una nota dice qué mide.`}),(0,D.jsx)(`td`,{children:`FilasCobro, Metrica`})]}),(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Applied transactions`}),(0,D.jsx)(`td`,{children:`Tabla chica: Date applied, Type, la referencia (link a su registro) y Applied amount. Sin aplicaciones, la fila queda y lo dice.`}),(0,D.jsx)(`td`,{children:`FilasCobro`})]}),(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Footer`}),(0,D.jsx)(`td`,{children:`View full record y, con crédito sin aplicar, Apply credit.`}),(0,D.jsx)(`td`,{children:`DetalleMovimiento`})]}),(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Frame`}),(0,D.jsx)(`td`,{children:`En el Ledger, fondo gris y fijo en la parte visible de la tabla; en Billing lo pone DataTable.`}),(0,D.jsx)(`td`,{children:`LedgerRowDetail`})]}),(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Collapse all / Expand all`}),(0,D.jsx)(`td`,{children:`Al lado de las herramientas de la tabla desde que hay una fila abierta.`}),(0,D.jsx)(`td`,{children:`BotonExpandirTodo`})]})]})})]})})},R={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,D.jsx)(r,{children:(0,D.jsxs)(C,{children:[(0,D.jsx)(w,{titulo:`Charge, partly paid`,nota:`D4341: $310 cobrados en Northgate Clinic; un pago, un ajuste y una transferencia aplicados; faltan $170.`,children:(0,D.jsx)(E,{caso:`charge-partly-paid`,ancho:`table`})}),(0,D.jsx)(w,{titulo:`Charge paid by insurance`,nota:`D0120: lo cubrió el seguro entero; Outstanding en $0.`,children:(0,D.jsx)(E,{caso:`charge-paid`,ancho:`table`})}),(0,D.jsx)(w,{titulo:`Charge, nothing applied`,nota:`Applied transactions queda y lo dice.`,children:(0,D.jsx)(E,{caso:`charge-unpaid`,ancho:`table`})}),(0,D.jsx)(w,{titulo:`Payment applied to several charges`,nota:`La transferencia: a qué cargos fue y cuánto a cada uno.`,children:(0,D.jsx)(E,{caso:`payment-several`,ancho:`table`})}),(0,D.jsx)(w,{titulo:`Unapplied credit`,nota:`Un pago con crédito sin aplicar: Unapplied credit destacado y Apply credit al pie.`,children:(0,D.jsx)(E,{caso:`payment-credit`,ancho:`table`})}),(0,D.jsx)(w,{titulo:`Denied claim`,nota:`No pagó nada: todo en $0 y la nota lo dice.`,children:(0,D.jsx)(E,{caso:`insurance-denied`,ancho:`table`})}),(0,D.jsx)(w,{titulo:`Narrow`,nota:`Teléfono: los datos en una columna y el título de cada fila del cobro arriba de sus datos.`,children:(0,D.jsx)(E,{caso:`charge-partly-paid`,ancho:`phone`})})]})})},z={name:`Reference open`,render:e=>(0,D.jsx)(E,{...e}),play:async e=>{await O.click(await k(e.canvasElement).findByRole(`button`,{name:/Check payment ····1234/})),await y(/Opens Check payment/)(e)}},B={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,D.jsxs)(C,{children:[(0,D.jsx)(w,{titulo:`Layout`,children:(0,D.jsxs)(x,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Frame (Ledger)`}),(0,D.jsx)(`td`,{children:`Padding 12px; fijo a la izquierda de la parte visible y del ancho visible menos el padding, así lo alineado a la derecha no se corta.`})]}),(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Cobro`}),(0,D.jsxs)(`td`,{children:[`16px debajo de los datos, con una línea `,(0,D.jsx)(T,{nombre:`line-row`}),` arriba y 12px de aire. Filas de ui/detail-list: título en una columna de 150px desde 448px de ancho.`]})]}),(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Financial details`}),(0,D.jsxs)(`td`,{children:[`Columnas de 112px como mínimo, tantas como entren (5 en el Ledger a 1440, 2 en el teléfono). Monto 15px; el destacado Semibold `,(0,D.jsx)(T,{nombre:`dash-blue`}),`.`]})]}),(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Applied transactions`}),(0,D.jsxs)(`td`,{children:[`Tabla de 12px, encabezado 11px `,(0,D.jsx)(T,{nombre:`ink-muted`}),`, fecha MM/DD/YYYY y monto sin partir, alineado a la derecha.`]})]})]})}),(0,D.jsx)(w,{titulo:`Rules`,children:(0,D.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,D.jsx)(`li`,{children:`Outstanding balance is the balance of that charge only, not the patient or guarantor balance; the note says so.`}),(0,D.jsx)(`li`,{children:`Every row stays even when empty, so the detail always has the same shape.`}),(0,D.jsx)(`li`,{children:`The same detail in the Ledger and in Billing: a transaction reads the same in both. Clinical Mode does not show billing.`})]})})]})},V=[`Playground`,`Parts`,`States`,`ReferenceOpen`,`Specs`],I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: a => <Ejemplo {...a} />
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
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
  render: () => <TooltipProvider>
      <Lienzo>
        <Bloque titulo="The detail" nota="Los datos de la transacción, la línea, lo del cobro y el pie.">
          <Ejemplo caso="charge-partly-paid" ancho="table" />
        </Bloque>
        <Bloque titulo="Billing" nota="El mismo contenido sin el marco (DetalleMovimiento): lo pone la tabla de la app. Card Payment de Maria Abril Viola, aplicado a D1110.">
          <div className="w-[960px] max-w-full rounded-lg border border-line-row bg-surface-subtle px-4 py-3 pl-11">
            <DetalleMovimiento m={ACTIVIDAD_RECIENTE.find(m => m.id === 'act-Maria Abril Viola-1')!} aplicaciones={APLICACIONES_BILLING} movimientos={ACTIVIDAD_RECIENTE} onVerTransaccion={ver} onVerTodo={() => aviso.info('Opens View full record.')} />
          </div>
        </Bloque>
        <Bloque titulo="Pieces">
          <div className="flex flex-col gap-4">
            <div className="@container flex w-[880px] max-w-full flex-col"><FilasCobro m={de('payment-several')} onVerTransaccion={ver} /></div>
            <dl className="grid w-[420px] grid-cols-2 gap-4"><Metrica label="Original charge" valor={310} /><Metrica label="Outstanding balance" valor={170} destacado /></dl>
            <div className="flex gap-3">
              <BotonExpandirTodo todasAbiertas={false} hayAlgunaAbierta onExpandirTodo={() => {}} onColapsarTodo={() => {}} />
              <BotonExpandirTodo todasAbiertas hayAlgunaAbierta onExpandirTodo={() => {}} onColapsarTodo={() => {}} />
            </div>
          </div>
        </Bloque>
        <Bloque titulo="What each part is">
          <Tabla encabezado={['Part', 'What it does', 'Component']} minimo={720} arriba>
            <tr><td className="font-semibold">Fields</td><td>Los datos de la transacción, de a tres columnas (una en el teléfono).</td><td>Campos</td></tr>
            <tr><td className="font-semibold">Clinic location</td><td>La sede donde se registró; sin dato, la principal.</td><td>FilasCobro</td></tr>
            <tr><td className="font-semibold">Financial details</td><td>Los números en columnas de 112px como mínimo, el monto abajo de su rótulo; el último destacado (lo que falta del cargo o el crédito sin aplicar). Una nota dice qué mide.</td><td>FilasCobro, Metrica</td></tr>
            <tr><td className="font-semibold">Applied transactions</td><td>Tabla chica: Date applied, Type, la referencia (link a su registro) y Applied amount. Sin aplicaciones, la fila queda y lo dice.</td><td>FilasCobro</td></tr>
            <tr><td className="font-semibold">Footer</td><td>View full record y, con crédito sin aplicar, Apply credit.</td><td>DetalleMovimiento</td></tr>
            <tr><td className="font-semibold">Frame</td><td>En el Ledger, fondo gris y fijo en la parte visible de la tabla; en Billing lo pone DataTable.</td><td>LedgerRowDetail</td></tr>
            <tr><td className="font-semibold">Collapse all / Expand all</td><td>Al lado de las herramientas de la tabla desde que hay una fila abierta.</td><td>BotonExpandirTodo</td></tr>
          </Tabla>
        </Bloque>
      </Lienzo>
    </TooltipProvider>
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
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
  render: () => <TooltipProvider>
      <Lienzo>
        <Bloque titulo="Charge, partly paid" nota="D4341: $310 cobrados en Northgate Clinic; un pago, un ajuste y una transferencia aplicados; faltan $170.">
          <Ejemplo caso="charge-partly-paid" ancho="table" />
        </Bloque>
        <Bloque titulo="Charge paid by insurance" nota="D0120: lo cubrió el seguro entero; Outstanding en $0.">
          <Ejemplo caso="charge-paid" ancho="table" />
        </Bloque>
        <Bloque titulo="Charge, nothing applied" nota="Applied transactions queda y lo dice.">
          <Ejemplo caso="charge-unpaid" ancho="table" />
        </Bloque>
        <Bloque titulo="Payment applied to several charges" nota="La transferencia: a qué cargos fue y cuánto a cada uno.">
          <Ejemplo caso="payment-several" ancho="table" />
        </Bloque>
        <Bloque titulo="Unapplied credit" nota="Un pago con crédito sin aplicar: Unapplied credit destacado y Apply credit al pie.">
          <Ejemplo caso="payment-credit" ancho="table" />
        </Bloque>
        <Bloque titulo="Denied claim" nota="No pagó nada: todo en $0 y la nota lo dice.">
          <Ejemplo caso="insurance-denied" ancho="table" />
        </Bloque>
        <Bloque titulo="Narrow" nota="Teléfono: los datos en una columna y el título de cada fila del cobro arriba de sus datos.">
          <Ejemplo caso="charge-partly-paid" ancho="phone" />
        </Bloque>
      </Lienzo>
    </TooltipProvider>
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: 'Reference open',
  render: a => <Ejemplo {...a} />,
  play: async c => {
    await userEvent.click(await within(c.canvasElement).findByRole('button', {
      name: /Check payment ····1234/
    }));
    await esperar(/Opens Check payment/)(c);
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
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
      <Bloque titulo="Layout">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Frame (Ledger)</td><td>Padding 12px; fijo a la izquierda de la parte visible y del ancho visible menos el padding, así lo alineado a la derecha no se corta.</td></tr>
          <tr><td className="font-semibold">Cobro</td><td>16px debajo de los datos, con una línea <Token nombre="line-row" /> arriba y 12px de aire. Filas de ui/detail-list: título en una columna de 150px desde 448px de ancho.</td></tr>
          <tr><td className="font-semibold">Financial details</td><td>Columnas de 112px como mínimo, tantas como entren (5 en el Ledger a 1440, 2 en el teléfono). Monto 15px; el destacado Semibold <Token nombre="dash-blue" />.</td></tr>
          <tr><td className="font-semibold">Applied transactions</td><td>Tabla de 12px, encabezado 11px <Token nombre="ink-muted" />, fecha MM/DD/YYYY y monto sin partir, alineado a la derecha.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>Outstanding balance is the balance of that charge only, not the patient or guarantor balance; the note says so.</li>
          <li>Every row stays even when empty, so the detail always has the same shape.</li>
          <li>The same detail in the Ledger and in Billing: a transaction reads the same in both. Clinical Mode does not show billing.</li>
        </ul>
      </Bloque>
    </Lienzo>
}`,...B.parameters?.docs?.source}}}})))()}H();export{L as Parts,I as Playground,z as ReferenceOpen,B as Specs,R as States,V as __namedExportsOrder,F as default};