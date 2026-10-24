import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,r}from"./tooltip-6ep9-x7U.js";import{n as i,r as a}from"./toaster-D2sSwnPH.js";import{_ as o,d as s,f as c,g as l,h as u,l as d,m as f,s as p}from"./data-table-BNvrvCzu.js";import{d as m,i as h,l as g,m as _}from"./ledger-2F-x73ca.js";import{f as v,n as y,t as b}from"./billing-CgHj2SPO.js";import{n as x,r as S}from"./play-Dr1R_I1D.js";import{c as C,d as w,i as T,t as E,u as D}from"./kit-CWUgB5-0.js";function O({transaccion:e,ancho:t}){let n=L(e),a=n.creditoDisponible??0;return(0,k.jsx)(r,{children:(0,k.jsx)(`div`,{className:`rounded-lg border border-line-row bg-white`,style:{width:z[t],maxWidth:`100%`,"--tabla-visible":`${z[t]}px`},children:(0,k.jsx)(c,{m:n,aplicaciones:P,movimientos:I,onVerTransaccion:e=>i.info(`Goes to ${_(e)} in the table and opens it.`),onAbrirClinica:e=>i.info(e.caso?`Opens the case in Treatment Plan.`:`Opens the procedure in Clinical Mode.`),onVerTodo:B(`Opens the full record.`),onAplicarCredito:o(n)&&a>0?B(`Opens Apply credit with this transaction as the source.`):void 0})})})}var k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q;function J(){return(J=e((()=>{a(),n(),w(),S(),m(),v(),l(),k=t(),{userEvent:A,within:j}=__STORYBOOK_MODULE_TEST__,M={paciente:`John Smith`,provider:`Front desk`,estado:`Posted`,codigo:`—`,sede:`Downtown`},N=g([{...M,id:`C1`,ref:`C1`,fecha:`October 10, 2026`,tipo:`Charge`,monto:200,codigo:`D3330`,descripcion:`Endodontic therapy, molar tooth`,provider:`Dr. Elena Martinez`,diente:`19`,procedimiento:`pr10`},{...M,id:`C2`,ref:`C2`,fecha:`October 11, 2026`,tipo:`Adjustment`,monto:50,descripcion:`Returned payment fee`,alcance:`guarantor`,nota:`Check returned by the bank.`},{...M,id:`P1`,ref:`P1`,fecha:`October 12, 2026`,tipo:`Payment`,monto:-150,descripcion:`Cash $50.00 + Card ····4218 $100.00`,alcance:`guarantor`,metodos:[{metodo:`Cash payment`,monto:50},{metodo:`Card payment`,ref:`····4218`,monto:100}],creditoDisponible:30},{...M,id:`A1`,ref:`A1`,fecha:`October 13, 2026`,tipo:`Adjustment`,monto:-50,descripcion:`Courtesy adjustment`,alcance:`guarantor`,creditoDisponible:20},{...M,id:`P2`,ref:`P2`,fecha:`October 14, 2026`,tipo:`Payment`,monto:-40,descripcion:`Cash payment`,creditoDisponible:40}]),P=[{id:`x1`,origen:`P1`,cargo:`C1`,fecha:`October 12, 2026`,monto:100},{id:`x2`,origen:`P1`,cargo:`C2`,fecha:`October 12, 2026`,monto:20},{id:`x3`,origen:`A1`,cargo:`C1`,fecha:`October 13, 2026`,monto:20},{id:`x4`,origen:`A1`,cargo:`C2`,fecha:`October 13, 2026`,monto:10}],F=[{...M,id:`C3`,ref:`C3`,fecha:`October 15, 2026`,tipo:`Charge`,monto:95,codigo:`D0274`,descripcion:`Bitewings – four radiographic images`,saldo:0},{...M,id:`A2`,ref:`A2`,fecha:`October 15, 2026`,tipo:`Adjustment`,monto:-25,descripcion:``,sede:``,saldo:0},{...g(h).find(e=>e.id===`m3`)}],I=[...N,...F],L=e=>I.find(t=>t.id===e),R={C1:`Procedure · C1 (treatment, paid and credited)`,C2:`Charge Adjustment · C2 (account fee)`,P1:`Patient Payment · P1 (cash + card, unapplied credit)`,A1:`Credit Adjustment · A1 (household credit)`,P2:`Patient Payment · P2 (not applied, no method details)`,C3:`Procedure · C3 (no treatment, nothing applied)`,A2:`Credit Adjustment · A2 (location and reason unavailable)`,m3:`Insurance Payment (out of scope: the fields as before)`},z={table:1094,phone:356},B=e=>()=>i.info(e),V={title:`Components/Ledger/LedgerRowDetail`,parameters:{layout:`padded`,docs:{description:{component:[`Lo que se despliega debajo de una fila del **Ledger** (y de **Billing** con un paciente elegido): el contexto de la transacción, su detalle financiero y las transacciones relacionadas, en filas compactas (*Components / UI / DetailList*), sin abrir el registro completo. Historia de usuario y prototipo de Julián (2026-10-14). Sólo lectura.`,``,`**Arriba**, la descripción y al costado el identificador, el estado y la pieza. **Las filas, según el tipo:**`,``,`- **Procedure:** Treatment (el caso del procedimiento, por su vínculo; el aceptado primero y después los históricos, con la visita), Location, Financial details y *Payments & credits applied to this charge*. Pie: **View full record** (en un procedimiento abre Clinical Mode).`,`- **Charge Adjustment:** Location, Financial details y *Payments & credits applied to this charge*. Pie: **View full record**.`,`- **Patient Payment:** Scope, Location, Financial details y *Charges paid or credited by this transaction*. Pie: **View full record** y, con crédito disponible, **Apply credit**.`,`- **Credit Adjustment:** Scope, Location, Financial details y *Charges paid or credited by this transaction*. Pie: **View full record** y **Apply credit**.`,``,`Los montos aplicados van en positivo; un cargo muestra lo que recibió y un pago o crédito, a dónde fue. El link de una transacción lleva a su fila (y la despliega) si está en la tabla; si no, abre su registro. **Insurance Payment** queda fuera y muestra los datos de siempre. Sin notas explicativas: los números se leen solos, y el motivo de un ajuste ya es el título (Julián, 2026-10-19). Todos los pies usan el mismo botón que Procedures y los findings.`,``,`**Probalo:** en *Playground* elegí la transacción y el ancho desde *Controls*; tocá los links.`].join(`
`)}}},args:{transaccion:`C1`,ancho:`table`},argTypes:{transaccion:{name:`transaction`,control:`select`,options:Object.keys(R),labels:R,description:`Los cuatro tipos de la historia, sus vacíos y un pago del seguro (fuera de la historia).`},ancho:{name:`width`,control:`inline-radio`,options:Object.keys(z),description:`table 1094 (el Ledger a 1440) · phone 356 (la tabla scrollea y el detalle queda en la parte visible).`}}},H={render:e=>(0,k.jsx)(O,{...e})},U={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,k.jsx)(r,{children:(0,k.jsxs)(T,{children:[(0,k.jsx)(E,{titulo:`A charge`,nota:`Procedure C1: el caso con su visita, la sede, los números y lo que recibió.`,children:(0,k.jsx)(O,{transaccion:`C1`,ancho:`table`})}),(0,k.jsx)(E,{titulo:`In Billing`,nota:`El mismo contenido sin el marco (DetalleMovimiento): lo pone la tabla de la app. Card Payment de Maria Abril Viola, aplicado a D1110.`,children:(0,k.jsx)(`div`,{className:`@container w-[960px] max-w-full rounded-lg border border-line-row bg-surface-subtle px-4 py-3 pl-11`,children:(0,k.jsx)(d,{m:b.find(e=>e.id===`act-Maria Abril Viola-1`),aplicaciones:y,movimientos:b,onVerTodo:B(`Opens the full record.`)})})}),(0,k.jsx)(E,{titulo:`Pieces`,children:(0,k.jsxs)(`div`,{className:`flex flex-col gap-4`,children:[(0,k.jsx)(`div`,{className:`@container flex w-[880px] max-w-full flex-col`,children:(0,k.jsx)(s,{m:L(`A1`),aplicaciones:P,movimientos:I})}),(0,k.jsx)(`div`,{className:`w-[480px]`,children:(0,k.jsx)(u,{m:L(`C1`),onAbrir:B(`Opens the case.`)})}),(0,k.jsxs)(`dl`,{className:`grid w-[420px] grid-cols-2 gap-4`,children:[(0,k.jsx)(f,{label:`Original charge`,valor:200}),(0,k.jsx)(f,{label:`Outstanding transaction balance`,valor:80,destacado:!0})]}),(0,k.jsxs)(`div`,{className:`flex gap-3`,children:[(0,k.jsx)(p,{todasAbiertas:!1,hayAlgunaAbierta:!0,onExpandirTodo:()=>{},onColapsarTodo:()=>{}}),(0,k.jsx)(p,{todasAbiertas:!0,hayAlgunaAbierta:!0,onExpandirTodo:()=>{},onColapsarTodo:()=>{}})]})]})}),(0,k.jsx)(E,{titulo:`What each part is`,children:(0,k.jsxs)(C,{encabezado:[`Part`,`What it does`,`Component`],minimo:720,arriba:!0,children:[(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Header`}),(0,k.jsx)(`td`,{children:`La descripción (con el código en un procedimiento) y al costado el identificador, el estado, la pieza y la superficie.`}),(0,k.jsx)(`td`,{children:`ListaDetalle`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Treatment`}),(0,k.jsx)(`td`,{children:`Sólo Procedure: el caso del procedimiento (por su vínculo, nunca por código) con su estado y link; la visita debajo; los históricos después. Sin caso: No treatment linked. No repite consentimiento, hallazgos, derivaciones ni órdenes.`}),(0,k.jsx)(`td`,{children:`TratamientoDelCargo`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Scope`}),(0,k.jsx)(`td`,{children:`Pagos y créditos: patient · nombre, o guarantor · Household credit. No se deduce de los cargos.`}),(0,k.jsx)(`td`,{children:`FilasTransaccion`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Location`}),(0,k.jsx)(`td`,{children:`La sede de la transacción, nunca la de la pantalla. Sin dato: Location unavailable.`}),(0,k.jsx)(`td`,{children:`FilasTransaccion`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Financial details`}),(0,k.jsx)(`td`,{children:`Cargo: Original charge, Payments applied, Credit adjustments applied y Outstanding transaction balance (destacado). Pago o crédito: Original payment / credit, Applied to charges, Unapplied credit (destacado) y Transaction balance en $0.00.`}),(0,k.jsx)(`td`,{children:`Metrica`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Applications`}),(0,k.jsx)(`td`,{children:`Cargo: Payments & credits applied to this charge (de dónde vino). Pago o crédito: Charges paid or credited by this transaction (a dónde fue). Fecha de aplicación, la otra transacción con link, Patient / Account, referencia o motivo, y el monto aplicado en positivo. La cuenta es la cantidad de líneas.`}),(0,k.jsx)(`td`,{children:`FilasTransaccion`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Footer`}),(0,k.jsx)(`td`,{children:`View full record (el mismo de Procedures y los findings); Apply credit con crédito disponible; Read-only summary.`}),(0,k.jsx)(`td`,{children:`DetalleMovimiento`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Frame`}),(0,k.jsx)(`td`,{children:"En el Ledger, fondo gris y fijo en la parte visible de la tabla, arrancando en la primera columna, después de la flecha de la fila (`sangria`: 40px en el Ledger, 34 en Ledger Transactions); en Billing lo pone DataTable."}),(0,k.jsx)(`td`,{children:`LedgerRowDetail`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Collapse all / Expand all`}),(0,k.jsx)(`td`,{children:`En la barra de la tabla, desde que hay una fila abierta.`}),(0,k.jsx)(`td`,{children:`BotonExpandirTodo`})]})]})})]})})},W={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,k.jsx)(r,{children:(0,k.jsxs)(T,{children:[(0,k.jsx)(E,{titulo:`Procedure`,nota:`C1: Endodontic Treatment aceptado, Visit 2; $100 de un pago y $20 de un crédito; faltan $80.`,children:(0,k.jsx)(O,{transaccion:`C1`,ancho:`table`})}),(0,k.jsx)(E,{titulo:`Charge Adjustment`,nota:`C2: un cargo de la cuenta (Returned payment fee); sin tratamiento.`,children:(0,k.jsx)(O,{transaccion:`C2`,ancho:`table`})}),(0,k.jsx)(E,{titulo:`Patient Payment`,nota:`P1: de la cuenta; $120 aplicados a dos cargos y $30 para aplicar (Apply credit).`,children:(0,k.jsx)(O,{transaccion:`P1`,ancho:`table`})}),(0,k.jsx)(E,{titulo:`Credit Adjustment`,nota:`A1: crédito de la cuenta.`,children:(0,k.jsx)(O,{transaccion:`A1`,ancho:`table`})}),(0,k.jsx)(E,{titulo:`Payment not applied`,nota:`P2: todavía no se aplicó.`,children:(0,k.jsx)(O,{transaccion:`P2`,ancho:`table`})}),(0,k.jsx)(E,{titulo:`Procedure, nothing linked`,nota:`C3: sin caso y sin aplicaciones; las filas quedan y lo dicen. View full record abre el registro.`,children:(0,k.jsx)(O,{transaccion:`C3`,ancho:`table`})}),(0,k.jsx)(E,{titulo:`Unavailable`,nota:`A2: sin sede.`,children:(0,k.jsx)(O,{transaccion:`A2`,ancho:`table`})}),(0,k.jsx)(E,{titulo:`Insurance Payment`,nota:`Fuera de la historia: los datos de la transacción y View full record, como antes.`,children:(0,k.jsx)(O,{transaccion:`m3`,ancho:`table`})}),(0,k.jsx)(E,{titulo:`Narrow`,nota:`Teléfono: el título de cada fila arriba de sus datos; la tabla de aplicaciones scrollea de costado.`,children:(0,k.jsx)(O,{transaccion:`P1`,ancho:`phone`})})]})})},G={name:`Related record`,render:e=>(0,k.jsx)(O,{...e}),play:async e=>{await A.click(await j(e.canvasElement).findByRole(`button`,{name:/Patient Payment · P1/})),await x(/Goes to P1/)(e)}},K={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,k.jsxs)(T,{children:[(0,k.jsx)(E,{titulo:`Layout`,children:(0,k.jsxs)(C,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Frame (Ledger)`}),(0,k.jsx)(`td`,{children:`Padding 12px; fijo a la izquierda de la parte visible y del ancho visible menos el padding, así lo alineado a la derecha no se corta.`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Rows`}),(0,k.jsxs)(`td`,{children:[`Las de ui/detail-list: título de 11px en una columna de 150px desde 448px de ancho (arriba en angosto), línea de 1px `,(0,k.jsx)(D,{nombre:`line-soft`}),` entre filas.`]})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Financial details`}),(0,k.jsxs)(`td`,{children:[`Columnas de 112px como mínimo, tantas como entren. Monto 15px; el destacado Semibold `,(0,k.jsx)(D,{nombre:`dash-blue`}),`.`]})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Applications`}),(0,k.jsxs)(`td`,{children:[`Tabla de 12px (560px como mínimo, scrollea en angosto), encabezado 11px `,(0,k.jsx)(D,{nombre:`ink-muted`}),`, fecha MM/DD/YYYY, monto a la derecha. Una pista arriba (de dónde viene o a dónde va) y otra abajo (qué mide el monto).`]})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Case status`}),(0,k.jsx)(`td`,{children:`Pill sm en minúscula inicial, como en toda la app.`})]})]})}),(0,k.jsx)(E,{titulo:`Rules`,children:(0,k.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,k.jsx)(`li`,{children:`Read-only: it never creates, edits, reverses or voids a transaction. Apply credit opens the existing flow with this transaction as the source.`}),(0,k.jsx)(`li`,{children:`Charges show the payments and credits they received; payments and credits show the charges they went to. The same application can be seen from both sides but counts once.`}),(0,k.jsx)(`li`,{children:`Applied amounts are positive and dated when they were applied, not when the payment or charge was posted.`}),(0,k.jsx)(`li`,{children:`Balances are the transaction’s current ones, not the running account balance.`}),(0,k.jsx)(`li`,{children:`A related record in the table opens on its row (on its page, without touching filters); otherwise its record opens.`}),(0,k.jsx)(`li`,{children:`If an insurance payment covered part of a charge, Insurance applied joins the numbers so they add up (insurance payments themselves are out of scope).`})]})})]})},q=[`Playground`,`Parts`,`States`,`RelatedRecord`,`Specs`],H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: a => <Ejemplo {...a} />
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
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
            <tr><td className="font-semibold">Scope</td><td>Pagos y créditos: patient · nombre, o guarantor · Household credit. No se deduce de los cargos.</td><td>FilasTransaccion</td></tr>
            <tr><td className="font-semibold">Location</td><td>La sede de la transacción, nunca la de la pantalla. Sin dato: Location unavailable.</td><td>FilasTransaccion</td></tr>
            <tr><td className="font-semibold">Financial details</td><td>Cargo: Original charge, Payments applied, Credit adjustments applied y Outstanding transaction balance (destacado). Pago o crédito: Original payment / credit, Applied to charges, Unapplied credit (destacado) y Transaction balance en $0.00.</td><td>Metrica</td></tr>
            <tr><td className="font-semibold">Applications</td><td>Cargo: Payments &amp; credits applied to this charge (de dónde vino). Pago o crédito: Charges paid or credited by this transaction (a dónde fue). Fecha de aplicación, la otra transacción con link, Patient / Account, referencia o motivo, y el monto aplicado en positivo. La cuenta es la cantidad de líneas.</td><td>FilasTransaccion</td></tr>
            <tr><td className="font-semibold">Footer</td><td>View full record (el mismo de Procedures y los findings); Apply credit con crédito disponible; Read-only summary.</td><td>DetalleMovimiento</td></tr>
            <tr><td className="font-semibold">Frame</td><td>En el Ledger, fondo gris y fijo en la parte visible de la tabla, arrancando en la primera columna, después de la flecha de la fila (\`sangria\`: 40px en el Ledger, 34 en Ledger Transactions); en Billing lo pone DataTable.</td><td>LedgerRowDetail</td></tr>
            <tr><td className="font-semibold">Collapse all / Expand all</td><td>En la barra de la tabla, desde que hay una fila abierta.</td><td>BotonExpandirTodo</td></tr>
          </Tabla>
        </Bloque>
      </Lienzo>
    </TooltipProvider>
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
  render: () => <TooltipProvider>
      <Lienzo>
        <Bloque titulo="Procedure" nota="C1: Endodontic Treatment aceptado, Visit 2; $100 de un pago y $20 de un crédito; faltan $80.">
          <Ejemplo transaccion="C1" ancho="table" />
        </Bloque>
        <Bloque titulo="Charge Adjustment" nota="C2: un cargo de la cuenta (Returned payment fee); sin tratamiento.">
          <Ejemplo transaccion="C2" ancho="table" />
        </Bloque>
        <Bloque titulo="Patient Payment" nota="P1: de la cuenta; $120 aplicados a dos cargos y $30 para aplicar (Apply credit).">
          <Ejemplo transaccion="P1" ancho="table" />
        </Bloque>
        <Bloque titulo="Credit Adjustment" nota="A1: crédito de la cuenta.">
          <Ejemplo transaccion="A1" ancho="table" />
        </Bloque>
        <Bloque titulo="Payment not applied" nota="P2: todavía no se aplicó.">
          <Ejemplo transaccion="P2" ancho="table" />
        </Bloque>
        <Bloque titulo="Procedure, nothing linked" nota="C3: sin caso y sin aplicaciones; las filas quedan y lo dicen. View full record abre el registro.">
          <Ejemplo transaccion="C3" ancho="table" />
        </Bloque>
        <Bloque titulo="Unavailable" nota="A2: sin sede.">
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
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  name: 'Related record',
  render: a => <Ejemplo {...a} />,
  play: async c => {
    await userEvent.click(await within(c.canvasElement).findByRole('button', {
      name: /Patient Payment · P1/
    }));
    await esperar(/Goes to P1/)(c);
  }
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
}`,...K.parameters?.docs?.source}}}})))()}J();export{U as Parts,H as Playground,G as RelatedRecord,K as Specs,W as States,q as __namedExportsOrder,V as default};