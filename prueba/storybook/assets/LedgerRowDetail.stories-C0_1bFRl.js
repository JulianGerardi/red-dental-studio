import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,r}from"./tooltip-6ep9-x7U.js";import{n as i,r as a}from"./toaster-B6mRBNx3.js";import{_ as o,c as s,d as c,g as l,h as u,m as d,o as f,p,u as m,v as h}from"./data-table-Q0AwmSsV.js";import{d as g,i as _,l as v,m as y}from"./ledger-2F-x73ca.js";import{f as b,n as x,t as S}from"./billing-CgHj2SPO.js";import{n as C,r as w}from"./play-Dr1R_I1D.js";import{c as T,d as E,i as D,t as O,u as k}from"./kit-CWUgB5-0.js";function A({transaccion:e,ancho:t}){let n=z(e),a=n.creditoDisponible??0;return(0,j.jsx)(r,{children:(0,j.jsx)(`div`,{className:`rounded-lg border border-line-row bg-white`,style:{width:V[t],maxWidth:`100%`,"--tabla-visible":`${V[t]}px`},children:(0,j.jsx)(c,{m:n,aplicaciones:I,movimientos:R,onVerTransaccion:e=>i.info(`Goes to ${y(e)} in the table and opens it.`),onAbrirClinica:e=>i.info(e.caso?`Opens the case in Treatment Plan.`:`Opens the procedure in Clinical Mode.`),onVerTodo:H(`Opens the full record.`),onAplicarCredito:h(n)&&a>0?H(`Opens Apply credit with this transaction as the source.`):void 0})})})}var j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y;function X(){return(X=e((()=>{a(),n(),E(),w(),g(),b(),o(),j=t(),{userEvent:M,within:N}=__STORYBOOK_MODULE_TEST__,P={paciente:`John Smith`,provider:`Front desk`,estado:`Posted`,codigo:`—`,sede:`Downtown`},F=v([{...P,id:`C1`,ref:`C1`,fecha:`October 10, 2026`,tipo:`Charge`,monto:200,codigo:`D3330`,descripcion:`Endodontic therapy, molar tooth`,provider:`Dr. Elena Martinez`,diente:`19`,procedimiento:`pr10`},{...P,id:`C2`,ref:`C2`,fecha:`October 11, 2026`,tipo:`Adjustment`,monto:50,descripcion:`Returned payment fee`,alcance:`guarantor`,nota:`Check returned by the bank.`},{...P,id:`P1`,ref:`P1`,fecha:`October 12, 2026`,tipo:`Payment`,monto:-150,descripcion:`Cash $50.00 + Card ····4218 $100.00`,alcance:`guarantor`,metodos:[{metodo:`Cash payment`,monto:50},{metodo:`Card payment`,ref:`····4218`,monto:100}],creditoDisponible:30},{...P,id:`A1`,ref:`A1`,fecha:`October 13, 2026`,tipo:`Adjustment`,monto:-50,descripcion:`Courtesy adjustment`,alcance:`guarantor`,creditoDisponible:20},{...P,id:`P2`,ref:`P2`,fecha:`October 14, 2026`,tipo:`Payment`,monto:-40,descripcion:`Cash payment`,creditoDisponible:40}]),I=[{id:`x1`,origen:`P1`,cargo:`C1`,fecha:`October 12, 2026`,monto:100},{id:`x2`,origen:`P1`,cargo:`C2`,fecha:`October 12, 2026`,monto:20},{id:`x3`,origen:`A1`,cargo:`C1`,fecha:`October 13, 2026`,monto:20},{id:`x4`,origen:`A1`,cargo:`C2`,fecha:`October 13, 2026`,monto:10}],L=[{...P,id:`C3`,ref:`C3`,fecha:`October 15, 2026`,tipo:`Charge`,monto:95,codigo:`D0274`,descripcion:`Bitewings – four radiographic images`,saldo:0},{...P,id:`A2`,ref:`A2`,fecha:`October 15, 2026`,tipo:`Adjustment`,monto:-25,descripcion:``,sede:``,saldo:0},{...v(_).find(e=>e.id===`m3`)}],R=[...F,...L],z=e=>R.find(t=>t.id===e),B={C1:`Procedure · C1 (treatment, paid and credited)`,C2:`Charge Adjustment · C2 (account fee)`,P1:`Patient Payment · P1 (cash + card, unapplied credit)`,A1:`Credit Adjustment · A1 (household credit)`,P2:`Patient Payment · P2 (not applied, no method details)`,C3:`Procedure · C3 (no treatment, nothing applied)`,A2:`Credit Adjustment · A2 (location and reason unavailable)`,m3:`Insurance Payment (out of scope: the fields as before)`},V={table:1094,phone:356},H=e=>()=>i.info(e),U={title:`Components/Ledger/LedgerRowDetail`,parameters:{layout:`padded`,docs:{description:{component:[`Lo que se despliega debajo de una fila del **Ledger** (y de **Billing** con un paciente elegido): el contexto de la transacción, su detalle financiero y las transacciones relacionadas, en filas compactas (*Components / UI / DetailList*), sin abrir el registro completo. Historia de usuario y prototipo de Julián (2026-10-14). Sólo lectura.`,``,`**Arriba**, la descripción y al costado el identificador, el estado y la pieza. **Las filas, según el tipo:**`,``,`- **Procedure:** Treatment (el caso del procedimiento, por su vínculo; el aceptado primero y después los históricos, con la visita), Location, Financial details y *Payments & credits applied to this charge*. Pie: **View procedure** (Clinical Mode).`,`- **Charge Adjustment:** Adjustment reason, Location, Financial details y *Payments & credits applied to this charge*. Pie: **View adjustment**.`,`- **Patient Payment:** Scope, Payment methods, Location, Financial details y *Charges paid or credited by this transaction*. Pie: **View payment** y, con crédito disponible, **Apply credit**.`,`- **Credit Adjustment:** Scope, Adjustment reason, Location, Financial details y *Charges paid or credited by this transaction*. Pie: **View adjustment** y **Apply credit**.`,``,`Los montos aplicados van en positivo; un cargo muestra lo que recibió y un pago o crédito, a dónde fue. El link de una transacción lleva a su fila (y la despliega) si está en la tabla; si no, abre su registro. **Insurance Payment** queda fuera y muestra los datos de siempre.`,``,`**Probalo:** en *Playground* elegí la transacción y el ancho desde *Controls*; tocá los links.`].join(`
`)}}},args:{transaccion:`C1`,ancho:`table`},argTypes:{transaccion:{name:`transaction`,control:`select`,options:Object.keys(B),labels:B,description:`Los cuatro tipos de la historia, sus vacíos y un pago del seguro (fuera de la historia).`},ancho:{name:`width`,control:`inline-radio`,options:Object.keys(V),description:`table 1094 (el Ledger a 1440) · phone 356 (la tabla scrollea y el detalle queda en la parte visible).`}}},W={render:e=>(0,j.jsx)(A,{...e})},G={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,j.jsx)(r,{children:(0,j.jsxs)(D,{children:[(0,j.jsx)(O,{titulo:`A charge`,nota:`Procedure C1: el caso con su visita, la sede, los números y lo que recibió.`,children:(0,j.jsx)(A,{transaccion:`C1`,ancho:`table`})}),(0,j.jsx)(O,{titulo:`In Billing`,nota:`El mismo contenido sin el marco (DetalleMovimiento): lo pone la tabla de la app. Card Payment de Maria Abril Viola, aplicado a D1110.`,children:(0,j.jsx)(`div`,{className:`@container w-[960px] max-w-full rounded-lg border border-line-row bg-surface-subtle px-4 py-3 pl-11`,children:(0,j.jsx)(s,{m:S.find(e=>e.id===`act-Maria Abril Viola-1`),aplicaciones:x,movimientos:S,onVerTodo:H(`Opens the full record.`)})})}),(0,j.jsx)(O,{titulo:`Pieces`,children:(0,j.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,j.jsxs)(`div`,{className:`flex w-[480px] flex-col gap-2`,children:[(0,j.jsx)(p,{m:z(`P1`)}),(0,j.jsx)(p,{m:z(`P2`)}),(0,j.jsx)(u,{m:z(`C2`)}),(0,j.jsx)(u,{m:z(`A2`)})]}),(0,j.jsx)(`div`,{className:`@container flex w-[880px] max-w-full flex-col`,children:(0,j.jsx)(m,{m:z(`A1`),aplicaciones:I,movimientos:R})}),(0,j.jsx)(`div`,{className:`w-[480px]`,children:(0,j.jsx)(l,{m:z(`C1`),onAbrir:H(`Opens the case.`)})}),(0,j.jsxs)(`dl`,{className:`grid w-[420px] grid-cols-2 gap-4`,children:[(0,j.jsx)(d,{label:`Original charge`,valor:200}),(0,j.jsx)(d,{label:`Outstanding transaction balance`,valor:80,destacado:!0})]}),(0,j.jsxs)(`div`,{className:`flex gap-3`,children:[(0,j.jsx)(f,{todasAbiertas:!1,hayAlgunaAbierta:!0,onExpandirTodo:()=>{},onColapsarTodo:()=>{}}),(0,j.jsx)(f,{todasAbiertas:!0,hayAlgunaAbierta:!0,onExpandirTodo:()=>{},onColapsarTodo:()=>{}})]})]})}),(0,j.jsx)(O,{titulo:`What each part is`,children:(0,j.jsxs)(T,{encabezado:[`Part`,`What it does`,`Component`],minimo:720,arriba:!0,children:[(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Header`}),(0,j.jsx)(`td`,{children:`La descripción (con el código en un procedimiento) y al costado el identificador, el estado, la pieza y la superficie.`}),(0,j.jsx)(`td`,{children:`ListaDetalle`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Treatment`}),(0,j.jsx)(`td`,{children:`Sólo Procedure: el caso del procedimiento (por su vínculo, nunca por código) con su estado y link; la visita debajo; los históricos después. Sin caso: No treatment linked. No repite consentimiento, hallazgos, derivaciones ni órdenes.`}),(0,j.jsx)(`td`,{children:`TratamientoDelCargo`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Adjustment reason`}),(0,j.jsx)(`td`,{children:`Charge y Credit Adjustment: el tipo de ajuste y la nota. Sin dato: Adjustment reason unavailable.`}),(0,j.jsx)(`td`,{children:`FilasTransaccion`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Scope`}),(0,j.jsx)(`td`,{children:`Pagos y créditos: patient · nombre, o guarantor · Household credit. No se deduce de los cargos.`}),(0,j.jsx)(`td`,{children:`FilasTransaccion`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Payment methods`}),(0,j.jsx)(`td`,{children:`Sólo Patient Payment: cada componente con su referencia enmascarada y su monto. Sin dato: No payment method details available.`}),(0,j.jsx)(`td`,{children:`FilasTransaccion`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Location`}),(0,j.jsx)(`td`,{children:`La sede de la transacción, nunca la de la pantalla. Sin dato: Location unavailable.`}),(0,j.jsx)(`td`,{children:`FilasTransaccion`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Financial details`}),(0,j.jsx)(`td`,{children:`Cargo: Original charge, Payments applied, Credit adjustments applied y Outstanding transaction balance (destacado). Pago o crédito: Original payment / credit, Applied to charges, Unapplied credit (destacado) y Transaction balance en $0.00.`}),(0,j.jsx)(`td`,{children:`Metrica`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Applications`}),(0,j.jsx)(`td`,{children:`Cargo: Payments & credits applied to this charge (de dónde vino). Pago o crédito: Charges paid or credited by this transaction (a dónde fue). Fecha de aplicación, la otra transacción con link, Patient / Account, referencia o motivo, y el monto aplicado en positivo. La cuenta es la cantidad de líneas.`}),(0,j.jsx)(`td`,{children:`FilasTransaccion`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Footer`}),(0,j.jsx)(`td`,{children:`View procedure, View payment o View adjustment; Apply credit con crédito disponible; Read-only summary.`}),(0,j.jsx)(`td`,{children:`DetalleMovimiento`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Frame`}),(0,j.jsx)(`td`,{children:`En el Ledger, fondo gris y fijo en la parte visible de la tabla; en Billing lo pone DataTable.`}),(0,j.jsx)(`td`,{children:`LedgerRowDetail`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Collapse all / Expand all`}),(0,j.jsx)(`td`,{children:`En la barra de la tabla, desde que hay una fila abierta.`}),(0,j.jsx)(`td`,{children:`BotonExpandirTodo`})]})]})})]})})},K={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,j.jsx)(r,{children:(0,j.jsxs)(D,{children:[(0,j.jsx)(O,{titulo:`Procedure`,nota:`C1: Endodontic Treatment aceptado, Visit 2; $100 de un pago y $20 de un crédito; faltan $80.`,children:(0,j.jsx)(A,{transaccion:`C1`,ancho:`table`})}),(0,j.jsx)(O,{titulo:`Charge Adjustment`,nota:`C2: un cargo de la cuenta (Returned payment fee) con su nota; sin tratamiento.`,children:(0,j.jsx)(A,{transaccion:`C2`,ancho:`table`})}),(0,j.jsx)(O,{titulo:`Patient Payment`,nota:`P1: efectivo y tarjeta, de la cuenta; $120 aplicados a dos cargos y $30 para aplicar (Apply credit).`,children:(0,j.jsx)(A,{transaccion:`P1`,ancho:`table`})}),(0,j.jsx)(O,{titulo:`Credit Adjustment`,nota:`A1: crédito de la cuenta, sin Payment methods (no es dinero recibido).`,children:(0,j.jsx)(A,{transaccion:`A1`,ancho:`table`})}),(0,j.jsx)(O,{titulo:`Payment not applied`,nota:`P2: todavía no se aplicó y no hay detalle del método.`,children:(0,j.jsx)(A,{transaccion:`P2`,ancho:`table`})}),(0,j.jsx)(O,{titulo:`Procedure, nothing linked`,nota:`C3: sin caso y sin aplicaciones; las filas quedan y lo dicen. View procedure abre el registro.`,children:(0,j.jsx)(A,{transaccion:`C3`,ancho:`table`})}),(0,j.jsx)(O,{titulo:`Unavailable`,nota:`A2: sin sede ni motivo.`,children:(0,j.jsx)(A,{transaccion:`A2`,ancho:`table`})}),(0,j.jsx)(O,{titulo:`Insurance Payment`,nota:`Fuera de la historia: los datos de la transacción y View full record, como antes.`,children:(0,j.jsx)(A,{transaccion:`m3`,ancho:`table`})}),(0,j.jsx)(O,{titulo:`Narrow`,nota:`Teléfono: el título de cada fila arriba de sus datos; la tabla de aplicaciones scrollea de costado.`,children:(0,j.jsx)(A,{transaccion:`P1`,ancho:`phone`})})]})})},q={name:`Related record`,render:e=>(0,j.jsx)(A,{...e}),play:async e=>{await M.click(await N(e.canvasElement).findByRole(`button`,{name:/Patient Payment · P1/})),await C(/Goes to P1/)(e)}},J={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,j.jsxs)(D,{children:[(0,j.jsx)(O,{titulo:`Layout`,children:(0,j.jsxs)(T,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Frame (Ledger)`}),(0,j.jsx)(`td`,{children:`Padding 12px; fijo a la izquierda de la parte visible y del ancho visible menos el padding, así lo alineado a la derecha no se corta.`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Rows`}),(0,j.jsxs)(`td`,{children:[`Las de ui/detail-list: título de 11px en una columna de 150px desde 448px de ancho (arriba en angosto), línea de 1px `,(0,j.jsx)(k,{nombre:`line-soft`}),` entre filas.`]})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Financial details`}),(0,j.jsxs)(`td`,{children:[`Columnas de 112px como mínimo, tantas como entren. Monto 15px; el destacado Semibold `,(0,j.jsx)(k,{nombre:`dash-blue`}),`.`]})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Applications`}),(0,j.jsxs)(`td`,{children:[`Tabla de 12px (560px como mínimo, scrollea en angosto), encabezado 11px `,(0,j.jsx)(k,{nombre:`ink-muted`}),`, fecha MM/DD/YYYY, monto a la derecha. Una pista arriba (de dónde viene o a dónde va) y otra abajo (qué mide el monto).`]})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Case status`}),(0,j.jsx)(`td`,{children:`Pill sm en minúscula inicial, como en toda la app.`})]})]})}),(0,j.jsx)(O,{titulo:`Rules`,children:(0,j.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,j.jsx)(`li`,{children:`Read-only: it never creates, edits, reverses or voids a transaction. Apply credit opens the existing flow with this transaction as the source.`}),(0,j.jsx)(`li`,{children:`Charges show the payments and credits they received; payments and credits show the charges they went to. The same application can be seen from both sides but counts once.`}),(0,j.jsx)(`li`,{children:`Applied amounts are positive and dated when they were applied, not when the payment or charge was posted.`}),(0,j.jsx)(`li`,{children:`Balances are the transaction’s current ones, not the running account balance.`}),(0,j.jsx)(`li`,{children:`A related record in the table opens on its row (on its page, without touching filters); otherwise its record opens.`}),(0,j.jsx)(`li`,{children:`If an insurance payment covered part of a charge, Insurance applied joins the numbers so they add up (insurance payments themselves are out of scope).`})]})})]})},Y=[`Playground`,`Parts`,`States`,`RelatedRecord`,`Specs`],W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: a => <Ejemplo {...a} />
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
  render: () => <TooltipProvider>
      <Lienzo>
        <Bloque titulo="A charge" nota="Procedure C1: el caso con su visita, la sede, los números y lo que recibió.">
          <Ejemplo transaccion="C1" ancho="table" />
        </Bloque>
        <Bloque titulo="In Billing" nota="El mismo contenido sin el marco (DetalleMovimiento): lo pone la tabla de la app. Card Payment de Maria Abril Viola, aplicado a D1110.">
          <div className="@container w-[960px] max-w-full rounded-lg border border-line-row bg-surface-subtle px-4 py-3 pl-11">
            <DetalleMovimiento m={ACTIVIDAD_RECIENTE.find(m => m.id === 'act-Maria Abril Viola-1')!} aplicaciones={APLICACIONES_BILLING} movimientos={ACTIVIDAD_RECIENTE} onVerTodo={avisar('Opens the full record.')} />
          </div>
        </Bloque>
        <Bloque titulo="Pieces">
          <div className="flex flex-col gap-4">
            <div className="flex w-[480px] flex-col gap-2"><MetodosDePago m={por('P1')} /><MetodosDePago m={por('P2')} /><Motivo m={por('C2')} /><Motivo m={por('A2')} /></div>
            <div className="@container flex w-[880px] max-w-full flex-col"><FilasTransaccion m={por('A1')} aplicaciones={APLICACIONES} movimientos={TODAS} /></div>
            <div className="w-[480px]"><TratamientoDelCargo m={por('C1')} onAbrir={avisar('Opens the case.')} /></div>
            <dl className="grid w-[420px] grid-cols-2 gap-4"><Metrica label="Original charge" valor={200} /><Metrica label="Outstanding transaction balance" valor={80} destacado /></dl>
            <div className="flex gap-3">
              <BotonExpandirTodo todasAbiertas={false} hayAlgunaAbierta onExpandirTodo={() => {}} onColapsarTodo={() => {}} />
              <BotonExpandirTodo todasAbiertas hayAlgunaAbierta onExpandirTodo={() => {}} onColapsarTodo={() => {}} />
            </div>
          </div>
        </Bloque>
        <Bloque titulo="What each part is">
          <Tabla encabezado={['Part', 'What it does', 'Component']} minimo={720} arriba>
            <tr><td className="font-semibold">Header</td><td>La descripción (con el código en un procedimiento) y al costado el identificador, el estado, la pieza y la superficie.</td><td>ListaDetalle</td></tr>
            <tr><td className="font-semibold">Treatment</td><td>Sólo Procedure: el caso del procedimiento (por su vínculo, nunca por código) con su estado y link; la visita debajo; los históricos después. Sin caso: No treatment linked. No repite consentimiento, hallazgos, derivaciones ni órdenes.</td><td>TratamientoDelCargo</td></tr>
            <tr><td className="font-semibold">Adjustment reason</td><td>Charge y Credit Adjustment: el tipo de ajuste y la nota. Sin dato: Adjustment reason unavailable.</td><td>FilasTransaccion</td></tr>
            <tr><td className="font-semibold">Scope</td><td>Pagos y créditos: patient · nombre, o guarantor · Household credit. No se deduce de los cargos.</td><td>FilasTransaccion</td></tr>
            <tr><td className="font-semibold">Payment methods</td><td>Sólo Patient Payment: cada componente con su referencia enmascarada y su monto. Sin dato: No payment method details available.</td><td>FilasTransaccion</td></tr>
            <tr><td className="font-semibold">Location</td><td>La sede de la transacción, nunca la de la pantalla. Sin dato: Location unavailable.</td><td>FilasTransaccion</td></tr>
            <tr><td className="font-semibold">Financial details</td><td>Cargo: Original charge, Payments applied, Credit adjustments applied y Outstanding transaction balance (destacado). Pago o crédito: Original payment / credit, Applied to charges, Unapplied credit (destacado) y Transaction balance en $0.00.</td><td>Metrica</td></tr>
            <tr><td className="font-semibold">Applications</td><td>Cargo: Payments &amp; credits applied to this charge (de dónde vino). Pago o crédito: Charges paid or credited by this transaction (a dónde fue). Fecha de aplicación, la otra transacción con link, Patient / Account, referencia o motivo, y el monto aplicado en positivo. La cuenta es la cantidad de líneas.</td><td>FilasTransaccion</td></tr>
            <tr><td className="font-semibold">Footer</td><td>View procedure, View payment o View adjustment; Apply credit con crédito disponible; Read-only summary.</td><td>DetalleMovimiento</td></tr>
            <tr><td className="font-semibold">Frame</td><td>En el Ledger, fondo gris y fijo en la parte visible de la tabla; en Billing lo pone DataTable.</td><td>LedgerRowDetail</td></tr>
            <tr><td className="font-semibold">Collapse all / Expand all</td><td>En la barra de la tabla, desde que hay una fila abierta.</td><td>BotonExpandirTodo</td></tr>
          </Tabla>
        </Bloque>
      </Lienzo>
    </TooltipProvider>
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
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
        <Bloque titulo="Procedure" nota="C1: Endodontic Treatment aceptado, Visit 2; $100 de un pago y $20 de un crédito; faltan $80.">
          <Ejemplo transaccion="C1" ancho="table" />
        </Bloque>
        <Bloque titulo="Charge Adjustment" nota="C2: un cargo de la cuenta (Returned payment fee) con su nota; sin tratamiento.">
          <Ejemplo transaccion="C2" ancho="table" />
        </Bloque>
        <Bloque titulo="Patient Payment" nota="P1: efectivo y tarjeta, de la cuenta; $120 aplicados a dos cargos y $30 para aplicar (Apply credit).">
          <Ejemplo transaccion="P1" ancho="table" />
        </Bloque>
        <Bloque titulo="Credit Adjustment" nota="A1: crédito de la cuenta, sin Payment methods (no es dinero recibido).">
          <Ejemplo transaccion="A1" ancho="table" />
        </Bloque>
        <Bloque titulo="Payment not applied" nota="P2: todavía no se aplicó y no hay detalle del método.">
          <Ejemplo transaccion="P2" ancho="table" />
        </Bloque>
        <Bloque titulo="Procedure, nothing linked" nota="C3: sin caso y sin aplicaciones; las filas quedan y lo dicen. View procedure abre el registro.">
          <Ejemplo transaccion="C3" ancho="table" />
        </Bloque>
        <Bloque titulo="Unavailable" nota="A2: sin sede ni motivo.">
          <Ejemplo transaccion="A2" ancho="table" />
        </Bloque>
        <Bloque titulo="Insurance Payment" nota="Fuera de la historia: los datos de la transacción y View full record, como antes.">
          <Ejemplo transaccion="m3" ancho="table" />
        </Bloque>
        <Bloque titulo="Narrow" nota="Teléfono: el título de cada fila arriba de sus datos; la tabla de aplicaciones scrollea de costado.">
          <Ejemplo transaccion="P1" ancho="phone" />
        </Bloque>
      </Lienzo>
    </TooltipProvider>
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  name: 'Related record',
  render: a => <Ejemplo {...a} />,
  play: async c => {
    await userEvent.click(await within(c.canvasElement).findByRole('button', {
      name: /Patient Payment · P1/
    }));
    await esperar(/Goes to P1/)(c);
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
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
          <tr><td className="font-semibold">Rows</td><td>Las de ui/detail-list: título de 11px en una columna de 150px desde 448px de ancho (arriba en angosto), línea de 1px <Token nombre="line-soft" /> entre filas.</td></tr>
          <tr><td className="font-semibold">Financial details</td><td>Columnas de 112px como mínimo, tantas como entren. Monto 15px; el destacado Semibold <Token nombre="dash-blue" />.</td></tr>
          <tr><td className="font-semibold">Applications</td><td>Tabla de 12px (560px como mínimo, scrollea en angosto), encabezado 11px <Token nombre="ink-muted" />, fecha MM/DD/YYYY, monto a la derecha. Una pista arriba (de dónde viene o a dónde va) y otra abajo (qué mide el monto).</td></tr>
          <tr><td className="font-semibold">Case status</td><td>Pill sm en minúscula inicial, como en toda la app.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>Read-only: it never creates, edits, reverses or voids a transaction. Apply credit opens the existing flow with this transaction as the source.</li>
          <li>Charges show the payments and credits they received; payments and credits show the charges they went to. The same application can be seen from both sides but counts once.</li>
          <li>Applied amounts are positive and dated when they were applied, not when the payment or charge was posted.</li>
          <li>Balances are the transaction’s current ones, not the running account balance.</li>
          <li>A related record in the table opens on its row (on its page, without touching filters); otherwise its record opens.</li>
          <li>If an insurance payment covered part of a charge, Insurance applied joins the numbers so they add up (insurance payments themselves are out of scope).</li>
        </ul>
      </Bloque>
    </Lienzo>
}`,...J.parameters?.docs?.source}}}})))()}X();export{G as Parts,W as Playground,q as RelatedRecord,J as Specs,K as States,Y as __namedExportsOrder,U as default};