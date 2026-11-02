import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,r as i}from"./toaster-D2sSwnPH.js";import{$ as a,B as o,L as s,P as c,T as l,Z as u,nt as d}from"./data-table-DCKWaWL0.js";import{c as f,d as p,f as m}from"./accionesProcedimiento-B_J5dVtW.js";import{h,t as g,u as _}from"./treatment-plan-woPIx0JN.js";import{n as v,r as y}from"./play-Dr1R_I1D.js";import{c as b,d as x,i as S,t as C,u as w}from"./kit-CWUgB5-0.js";function T({filas:e,detalle:t,seleccion:n,abierta:i,ancho:c}){let{filas:d,caso:m}=A[e],h=g.find(e=>e.id===m),{contexto:_,drawer:v}=o(),[y,b]=(0,E.useState)(i?[d[0].id]:[]),[x,S]=(0,E.useState)([]),C=h?.estado===`Planning`;return(0,D.jsxs)(`div`,{className:`overflow-hidden rounded-xl border border-line bg-white`,style:{width:j[c],maxWidth:`100%`},children:[h&&(0,D.jsx)(`div`,{className:`bg-dash-blue px-4 py-2 text-[13px] font-semibold text-white`,children:h.nombre}),(0,D.jsx)(a,{filas:[...d],iconos:!!h,consentimiento:!!h&&!u.includes(h.estado),arrastrable:C,seleccion:n?x:void 0,onSeleccion:n?S:void 0,acciones:e=>f(e.estado,p(h?.estado)),onAccion:(e,t)=>r.info(`${t} ${e.codigo}`),onConsentimiento:e=>r.info(`Opens the consent of ${e.codigo}.`),detalle:t?e=>(0,D.jsx)(l,{registro:s(e,h),contexto:_}):void 0,abiertas:y,onAlternar:e=>b(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])},`${e}-${i}`),v]})}var E,D,O,k,A,j,M,N,P,F,I,L,R;function z(){return(z=e((()=>{E=t(),i(),x(),y(),h(),c(),d(),m(),D=n(),{userEvent:O,within:k}=__STORYBOOK_MODULE_TEST__,A={unassigned:{titulo:`Unassigned`,caso:void 0,filas:_.slice(0,4)},planning:{titulo:`Periodontists Recommended · Visit 2 (Planning)`,caso:`c1`,filas:g[0].visitas[1].procedimientos},waiting:{titulo:`Restorative Plan · Visit 1 (Waiting for consent)`,caso:`c3`,filas:g.find(e=>e.id===`c3`).visitas[0].procedimientos},accepted:{titulo:`Bridge Option · Visit 1 (Accepted)`,caso:`c7`,filas:g.find(e=>e.id===`c7`).visitas[0].procedimientos}},j={case:1026,narrow:360},M={title:`Components/Clinical/TreatmentPlanSection table`,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:640},description:{component:["La tabla de procedimientos de Treatment Plan (`TablaProcedimientos`), la de **Unassigned** y la de cada visita de un caso.",``,`**Cada fila se despliega** con el detalle de la Problem List (Julián, 2026-10-13): chevron al inicio, clic en cualquier lado de la fila menos en sus controles, y *Collapse all / Expand all* desde que hay una abierta. El detalle es el de *Components / Clinical / RecordDetail*: el caso que se está viendo con la visita y su turno, **Procedure consent** (el estado del consentimiento de ese procedimiento), los hallazgos, derivaciones y órdenes del procedimiento del paciente que es. Lo del cobro está en el Ledger y en Billing. Un procedimiento suelto no tiene caso ni consentimiento: esas filas quedan y lo dicen. Un hallazgo vinculado se abre en el drawer, sin salir de Treatment Plan.`,``,`La columna **Procedure** corta los nombres largos (tooltip con el nombre entero, y el detalle lo muestra completo) para que la tabla no se estire: a 1440 entra entera, Consent y Actions incluidas.`,``,`**Probalo:** en *Playground* elegí las filas (sueltas, Planning, Waiting for consent o Accepted), la selección y el ancho desde *Controls*, y abrí una fila.`].join(`
`)}}},args:{filas:`waiting`,detalle:!0,seleccion:!0,abierta:!0,ancho:`case`},argTypes:{filas:{name:`rows`,control:`inline-radio`,options:Object.keys(A),labels:Object.fromEntries(Object.entries(A).map(([e,t])=>[e,t.titulo])),description:`Las sueltas (Unassigned) o una visita de un caso en Planning, Waiting for consent o Accepted.`},detalle:{name:`row detail`,control:`boolean`,description:"Con `detalle`: chevron y la fila se despliega."},seleccion:{name:`selection`,control:`boolean`,description:`La columna de casillas.`},abierta:{name:`first row open`,control:`boolean`,description:`Arranca con la primera fila desplegada.`},ancho:{name:`width`,control:`inline-radio`,options:Object.keys(j),description:`case 1026 (el caso a 1440) · narrow 360 (teléfono: la tabla scrollea y el detalle queda en la parte visible).`}}},N={render:e=>(0,D.jsx)(T,{...e})},P={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,D.jsxs)(S,{children:[(0,D.jsx)(C,{titulo:`A row open`,nota:`Restorative Plan, Waiting for consent: la visita con su turno, el consentimiento Pending y el hallazgo con su diagnóstico.`,children:(0,D.jsx)(T,{filas:`waiting`,detalle:!0,seleccion:!0,abierta:!0,ancho:`case`})}),(0,D.jsx)(C,{titulo:`What each part is`,children:(0,D.jsxs)(b,{encabezado:[`Part`,`What it does`,`Component`],minimo:720,arriba:!0,children:[(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Chevron`}),(0,D.jsx)(`td`,{children:`Columna de 28px al inicio (después del arrastre en Planning); gira al abrir. La misma flecha de todas las tablas.`}),(0,D.jsx)(`td`,{children:`RowChevron (DataTable)`})]}),(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Row`}),(0,D.jsx)(`td`,{children:`Clic o Enter / Espacio la abre y la cierra; los clics en la casilla, el menú y los íconos no. Abierta, fondo gris claro; marcada, celeste.`}),(0,D.jsx)(`td`,{children:`TablaProcedimientos`})]}),(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Detail`}),(0,D.jsx)(`td`,{children:`Debajo de la fila, a lo ancho de la parte visible de la tabla, con la sangría del chevron.`}),(0,D.jsx)(`td`,{children:`DetalleRegistro + registroDePlan (RecordDetail)`})]}),(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Collapse all / Expand all`}),(0,D.jsx)(`td`,{children:`Arriba de las visitas del caso (uno para todas) o arriba de Unassigned, desde que hay una fila abierta.`}),(0,D.jsx)(`td`,{children:`BotonExpandirTodo (Ledger)`})]}),(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Procedure`}),(0,D.jsx)(`td`,{children:`Corta el nombre con "…"; el tooltip y el título del detalle lo muestran entero.`}),(0,D.jsx)(`td`,{children:`—`})]}),(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Linked record`}),(0,D.jsx)(`td`,{children:`Un hallazgo o procedimiento vinculado se abre en el drawer de View full record; el caso, en Treatment Plan mismo.`}),(0,D.jsx)(`td`,{children:`useVerRegistro (RecordDetail)`})]})]})})]})},F={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,D.jsxs)(S,{children:[(0,D.jsx)(C,{titulo:`Closed`,nota:`Las filas con su chevron, ninguna abierta.`,children:(0,D.jsx)(T,{filas:`waiting`,detalle:!0,seleccion:!0,abierta:!1,ancho:`case`})}),(0,D.jsx)(C,{titulo:`Unassigned, open`,nota:`Un procedimiento suelto: sin caso ni consentimiento; las filas quedan y dicen qué no hay.`,children:(0,D.jsx)(T,{filas:`unassigned`,detalle:!0,seleccion:!0,abierta:!0,ancho:`case`})}),(0,D.jsx)(C,{titulo:`Before the case is accepted`,nota:`Planning: sin turno y el consentimiento se genera al aceptar; se arrastra a otra visita.`,children:(0,D.jsx)(T,{filas:`planning`,detalle:!0,seleccion:!0,abierta:!0,ancho:`case`})}),(0,D.jsx)(C,{titulo:`Accepted, consent signed`,nota:`Bridge Option: consentimiento Signed y el caso histórico del grupo plegado.`,children:(0,D.jsx)(T,{filas:`accepted`,detalle:!0,seleccion:!0,abierta:!0,ancho:`case`})}),(0,D.jsx)(C,{titulo:`Without detail`,nota:"Sin `detalle`, la tabla de antes: sin chevron y la fila no se abre.",children:(0,D.jsx)(T,{filas:`unassigned`,detalle:!1,seleccion:!1,abierta:!1,ancho:`case`})}),(0,D.jsx)(C,{titulo:`Narrow`,nota:`Teléfono: la tabla scrollea de costado y el detalle queda en la parte visible.`,children:(0,D.jsx)(T,{filas:`waiting`,detalle:!0,seleccion:!1,abierta:!0,ancho:`narrow`})})]})},I={name:`Linked finding open`,parameters:{docs:{story:{inline:!1,iframeHeight:720}}},args:{filas:`waiting`,detalle:!0,seleccion:!0,abierta:!0,ancho:`case`},render:e=>(0,D.jsx)(T,{...e}),play:async e=>{await O.click(await k(e.canvasElement).findByRole(`button`,{name:/^Chronic enamel dental caries · Tooth 3/})),await v(/Source exam/)(e)}},L={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,D.jsxs)(S,{children:[(0,D.jsx)(C,{titulo:`Layout`,children:(0,D.jsxs)(b,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Chevron column`}),(0,D.jsxs)(`td`,{children:[`28px; ícono de 16px `,(0,D.jsx)(w,{nombre:`ink-faint`}),`, gira 90° abierta.`]})]}),(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Open row`}),(0,D.jsxs)(`td`,{children:[`Fondo `,(0,D.jsx)(w,{nombre:`surface-subtle`}),`, igual que el detalle; marcada gana el celeste `,(0,D.jsx)(w,{nombre:`dash-count-bg`}),`.`]})]}),(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Detail`}),(0,D.jsx)(`td`,{children:`Padding 12px 16px y 44px a la izquierda (la sangría del chevron, como DataTable). Fijo en la parte visible si la tabla scrollea.`})]}),(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Procedure`}),(0,D.jsx)(`td`,{children:`Ocupa lo que sobra, 160px como mínimo; corta con "…" en una línea.`})]}),(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Location`}),(0,D.jsx)(`td`,{children:`Sin partir (Upper Arch en una línea).`})]}),(0,D.jsxs)(`tr`,{children:[(0,D.jsx)(`td`,{className:`font-semibold`,children:`Fit`}),(0,D.jsx)(`td`,{children:`A 1440 la visita de un caso aceptado entra entera (1026px); más angosto, la tabla scrollea de costado como antes.`})]})]})}),(0,D.jsx)(C,{titulo:`Rules`,children:(0,D.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,D.jsx)(`li`,{children:`The same detail as the Problem List, so a procedure reads the same wherever it is opened.`}),(0,D.jsx)(`li`,{children:`Opening a row never selects it: the checkbox and the row menu keep their own clicks.`}),(0,D.jsx)(`li`,{children:`No consent and no appointment before the case is accepted; a loose procedure has neither.`})]})})]})},R=[`Playground`,`Parts`,`States`,`LinkedFindingOpen`,`Specs`],N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: a => <Ejemplo {...a} />
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
      <Bloque titulo="A row open" nota="Restorative Plan, Waiting for consent: la visita con su turno, el consentimiento Pending y el hallazgo con su diagnóstico.">
        <Ejemplo filas="waiting" detalle seleccion abierta ancho="case" />
      </Bloque>
      <Bloque titulo="What each part is">
        <Tabla encabezado={['Part', 'What it does', 'Component']} minimo={720} arriba>
          <tr><td className="font-semibold">Chevron</td><td>Columna de 28px al inicio (después del arrastre en Planning); gira al abrir. La misma flecha de todas las tablas.</td><td>RowChevron (DataTable)</td></tr>
          <tr><td className="font-semibold">Row</td><td>Clic o Enter / Espacio la abre y la cierra; los clics en la casilla, el menú y los íconos no. Abierta, fondo gris claro; marcada, celeste.</td><td>TablaProcedimientos</td></tr>
          <tr><td className="font-semibold">Detail</td><td>Debajo de la fila, a lo ancho de la parte visible de la tabla, con la sangría del chevron.</td><td>DetalleRegistro + registroDePlan (RecordDetail)</td></tr>
          <tr><td className="font-semibold">Collapse all / Expand all</td><td>Arriba de las visitas del caso (uno para todas) o arriba de Unassigned, desde que hay una fila abierta.</td><td>BotonExpandirTodo (Ledger)</td></tr>
          <tr><td className="font-semibold">Procedure</td><td>Corta el nombre con "…"; el tooltip y el título del detalle lo muestran entero.</td><td>—</td></tr>
          <tr><td className="font-semibold">Linked record</td><td>Un hallazgo o procedimiento vinculado se abre en el drawer de View full record; el caso, en Treatment Plan mismo.</td><td>useVerRegistro (RecordDetail)</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
      <Bloque titulo="Closed" nota="Las filas con su chevron, ninguna abierta.">
        <Ejemplo filas="waiting" detalle seleccion abierta={false} ancho="case" />
      </Bloque>
      <Bloque titulo="Unassigned, open" nota="Un procedimiento suelto: sin caso ni consentimiento; las filas quedan y dicen qué no hay.">
        <Ejemplo filas="unassigned" detalle seleccion abierta ancho="case" />
      </Bloque>
      <Bloque titulo="Before the case is accepted" nota="Planning: sin turno y el consentimiento se genera al aceptar; se arrastra a otra visita.">
        <Ejemplo filas="planning" detalle seleccion abierta ancho="case" />
      </Bloque>
      <Bloque titulo="Accepted, consent signed" nota="Bridge Option: consentimiento Signed y el caso histórico del grupo plegado.">
        <Ejemplo filas="accepted" detalle seleccion abierta ancho="case" />
      </Bloque>
      <Bloque titulo="Without detail" nota="Sin \`detalle\`, la tabla de antes: sin chevron y la fila no se abre.">
        <Ejemplo filas="unassigned" detalle={false} seleccion={false} abierta={false} ancho="case" />
      </Bloque>
      <Bloque titulo="Narrow" nota="Teléfono: la tabla scrollea de costado y el detalle queda en la parte visible.">
        <Ejemplo filas="waiting" detalle seleccion={false} abierta ancho="narrow" />
      </Bloque>
    </Lienzo>
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: 'Linked finding open',
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 720
      }
    }
  },
  args: {
    filas: 'waiting',
    detalle: true,
    seleccion: true,
    abierta: true,
    ancho: 'case'
  },
  render: a => <Ejemplo {...a} />,
  play: async c => {
    await userEvent.click(await within(c.canvasElement).findByRole('button', {
      name: /^Chronic enamel dental caries · Tooth 3/
    }));
    await esperar(/Source exam/)(c);
  }
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
  render: () => <Lienzo>
      <Bloque titulo="Layout">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Chevron column</td><td>28px; ícono de 16px <Token nombre="ink-faint" />, gira 90° abierta.</td></tr>
          <tr><td className="font-semibold">Open row</td><td>Fondo <Token nombre="surface-subtle" />, igual que el detalle; marcada gana el celeste <Token nombre="dash-count-bg" />.</td></tr>
          <tr><td className="font-semibold">Detail</td><td>Padding 12px 16px y 44px a la izquierda (la sangría del chevron, como DataTable). Fijo en la parte visible si la tabla scrollea.</td></tr>
          <tr><td className="font-semibold">Procedure</td><td>Ocupa lo que sobra, 160px como mínimo; corta con "…" en una línea.</td></tr>
          <tr><td className="font-semibold">Location</td><td>Sin partir (Upper Arch en una línea).</td></tr>
          <tr><td className="font-semibold">Fit</td><td>A 1440 la visita de un caso aceptado entra entera (1026px); más angosto, la tabla scrollea de costado como antes.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>The same detail as the Problem List, so a procedure reads the same wherever it is opened.</li>
          <li>Opening a row never selects it: the checkbox and the row menu keep their own clicks.</li>
          <li>No consent and no appointment before the case is accepted; a loose procedure has neither.</li>
        </ul>
      </Bloque>
    </Lienzo>
}`,...L.parameters?.docs?.source}}}})))()}z();export{I as LinkedFindingOpen,P as Parts,N as Playground,L as Specs,F as States,R as __namedExportsOrder,M as default};