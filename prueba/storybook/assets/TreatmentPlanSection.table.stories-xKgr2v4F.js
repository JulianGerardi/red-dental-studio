import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,r as i}from"./toaster-B6mRBNx3.js";import{$ as a,E as o,I as s,R as c,Z as l,nt as u,z as d}from"./data-table-D6RYK28d.js";import{s as f,t as p,u as m}from"./treatment-plan-D7Jui5pR.js";import{n as h,r as g}from"./play-Dr1R_I1D.js";import{c as _,d as v,i as y,t as b,u as x}from"./kit-CWUgB5-0.js";function S({filas:e,detalle:t,seleccion:n,abierta:i,ancho:s}){let{filas:u,caso:f}=D[e],m=p.find(e=>e.id===f),{contexto:h,drawer:g}=d(),[_,v]=(0,C.useState)(i?[u[0].id]:[]),[y,b]=(0,C.useState)([]),x=m?.estado===`Planning`;return(0,w.jsxs)(`div`,{className:`overflow-hidden rounded-xl border border-line bg-white`,style:{width:O[s],maxWidth:`100%`},children:[m&&(0,w.jsx)(`div`,{className:`bg-dash-blue px-4 py-2 text-[13px] font-semibold text-white`,children:m.nombre}),(0,w.jsx)(a,{filas:[...u],acciones:!!m,consentimiento:!!m&&!l.includes(m.estado),arrastrable:x,sinMenu:!!m&&!x,seleccion:n?y:void 0,onSeleccion:n?b:void 0,onAccion:e=>r.info(`Remove ${e.codigo}?`),onCompletar:()=>r.info(`Opens Complete.`),detalle:t?e=>(0,w.jsx)(o,{registro:c(e,m),contexto:h}):void 0,abiertas:_,onAlternar:e=>v(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])},`${e}-${i}`),g]})}var C,w,T,E,D,O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{C=t(),i(),v(),g(),m(),s(),u(),w=n(),{userEvent:T,within:E}=__STORYBOOK_MODULE_TEST__,D={unassigned:{titulo:`Unassigned`,caso:void 0,filas:f.slice(0,4)},planning:{titulo:`Periodontists Recommended · Visit 2 (Planning)`,caso:`c1`,filas:p[0].visitas[1].procedimientos},waiting:{titulo:`Restorative Plan · Visit 1 (Waiting for consent)`,caso:`c3`,filas:p.find(e=>e.id===`c3`).visitas[0].procedimientos},accepted:{titulo:`Bridge Option · Visit 1 (Accepted)`,caso:`c7`,filas:p.find(e=>e.id===`c7`).visitas[0].procedimientos}},O={case:1026,narrow:360},k={title:`Components/Clinical/TreatmentPlanSection table`,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:640},description:{component:["La tabla de procedimientos de Treatment Plan (`TablaProcedimientos`), la de **Unassigned** y la de cada visita de un caso.",``,`**Cada fila se despliega** con el detalle de la Problem List (Julián, 2026-10-13): chevron al inicio, clic en cualquier lado de la fila menos en sus controles, y *Collapse all / Expand all* desde que hay una abierta. El detalle es el de *Components / Clinical / RecordDetail*: el caso que se está viendo con la visita y su turno, **Procedure consent** (el estado del consentimiento de ese procedimiento), los hallazgos, derivaciones y órdenes del procedimiento del paciente que es. Lo del cobro está en el Ledger y en Billing. Un procedimiento suelto no tiene caso ni consentimiento: esas filas quedan y lo dicen. Un hallazgo vinculado se abre en el drawer, sin salir de Treatment Plan.`,``,`La columna **Procedure** corta los nombres largos (tooltip con el nombre entero, y el detalle lo muestra completo) para que la tabla no se estire: a 1440 entra entera, Consent y Actions incluidas.`,``,`**Probalo:** en *Playground* elegí las filas (sueltas, Planning, Waiting for consent o Accepted), la selección y el ancho desde *Controls*, y abrí una fila.`].join(`
`)}}},args:{filas:`waiting`,detalle:!0,seleccion:!0,abierta:!0,ancho:`case`},argTypes:{filas:{name:`rows`,control:`inline-radio`,options:Object.keys(D),labels:Object.fromEntries(Object.entries(D).map(([e,t])=>[e,t.titulo])),description:`Las sueltas (Unassigned) o una visita de un caso en Planning, Waiting for consent o Accepted.`},detalle:{name:`row detail`,control:`boolean`,description:"Con `detalle`: chevron y la fila se despliega."},seleccion:{name:`selection`,control:`boolean`,description:`La columna de casillas.`},abierta:{name:`first row open`,control:`boolean`,description:`Arranca con la primera fila desplegada.`},ancho:{name:`width`,control:`inline-radio`,options:Object.keys(O),description:`case 1026 (el caso a 1440) · narrow 360 (teléfono: la tabla scrollea y el detalle queda en la parte visible).`}}},A={render:e=>(0,w.jsx)(S,{...e})},j={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,w.jsxs)(y,{children:[(0,w.jsx)(b,{titulo:`A row open`,nota:`Restorative Plan, Waiting for consent: la visita con su turno, el consentimiento Pending y el hallazgo con su diagnóstico.`,children:(0,w.jsx)(S,{filas:`waiting`,detalle:!0,seleccion:!0,abierta:!0,ancho:`case`})}),(0,w.jsx)(b,{titulo:`What each part is`,children:(0,w.jsxs)(_,{encabezado:[`Part`,`What it does`,`Component`],minimo:720,arriba:!0,children:[(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Chevron`}),(0,w.jsx)(`td`,{children:`Columna de 28px al inicio (después del arrastre en Planning); gira al abrir.`}),(0,w.jsx)(`td`,{children:"TablaProcedimientos (`detalle`)"})]}),(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Row`}),(0,w.jsx)(`td`,{children:`Clic o Enter / Espacio la abre y la cierra; los clics en la casilla, el menú y los íconos no. Abierta, fondo gris claro; marcada, celeste.`}),(0,w.jsx)(`td`,{children:`TablaProcedimientos`})]}),(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Detail`}),(0,w.jsx)(`td`,{children:`Debajo de la fila, a lo ancho de la parte visible de la tabla, con la sangría del chevron.`}),(0,w.jsx)(`td`,{children:`DetalleRegistro + registroDePlan (RecordDetail)`})]}),(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Collapse all / Expand all`}),(0,w.jsx)(`td`,{children:`Arriba de las visitas del caso (uno para todas) o arriba de Unassigned, desde que hay una fila abierta.`}),(0,w.jsx)(`td`,{children:`BotonExpandirTodo (Ledger)`})]}),(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Procedure`}),(0,w.jsx)(`td`,{children:`Corta el nombre con "…"; el tooltip y el título del detalle lo muestran entero.`}),(0,w.jsx)(`td`,{children:`—`})]}),(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Linked record`}),(0,w.jsx)(`td`,{children:`Un hallazgo o procedimiento vinculado se abre en el drawer de View full record; el caso, en Treatment Plan mismo.`}),(0,w.jsx)(`td`,{children:`useVerRegistro (RecordDetail)`})]})]})})]})},M={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,w.jsxs)(y,{children:[(0,w.jsx)(b,{titulo:`Closed`,nota:`Las filas con su chevron, ninguna abierta.`,children:(0,w.jsx)(S,{filas:`waiting`,detalle:!0,seleccion:!0,abierta:!1,ancho:`case`})}),(0,w.jsx)(b,{titulo:`Unassigned, open`,nota:`Un procedimiento suelto: sin caso ni consentimiento; las filas quedan y dicen qué no hay.`,children:(0,w.jsx)(S,{filas:`unassigned`,detalle:!0,seleccion:!0,abierta:!0,ancho:`case`})}),(0,w.jsx)(b,{titulo:`Before the case is accepted`,nota:`Planning: sin turno y el consentimiento se genera al aceptar; se arrastra a otra visita.`,children:(0,w.jsx)(S,{filas:`planning`,detalle:!0,seleccion:!0,abierta:!0,ancho:`case`})}),(0,w.jsx)(b,{titulo:`Accepted, consent signed`,nota:`Bridge Option: consentimiento Signed y el caso histórico del grupo plegado.`,children:(0,w.jsx)(S,{filas:`accepted`,detalle:!0,seleccion:!0,abierta:!0,ancho:`case`})}),(0,w.jsx)(b,{titulo:`Without detail`,nota:"Sin `detalle`, la tabla de antes: sin chevron y la fila no se abre.",children:(0,w.jsx)(S,{filas:`unassigned`,detalle:!1,seleccion:!1,abierta:!1,ancho:`case`})}),(0,w.jsx)(b,{titulo:`Narrow`,nota:`Teléfono: la tabla scrollea de costado y el detalle queda en la parte visible.`,children:(0,w.jsx)(S,{filas:`waiting`,detalle:!0,seleccion:!1,abierta:!0,ancho:`narrow`})})]})},N={name:`Linked finding open`,parameters:{docs:{story:{inline:!1,iframeHeight:720}}},args:{filas:`waiting`,detalle:!0,seleccion:!0,abierta:!0,ancho:`case`},render:e=>(0,w.jsx)(S,{...e}),play:async e=>{await T.click(await E(e.canvasElement).findByRole(`button`,{name:/^Chronic enamel dental caries · Tooth 3/})),await h(/Source exam/)(e)}},P={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,w.jsxs)(y,{children:[(0,w.jsx)(b,{titulo:`Layout`,children:(0,w.jsxs)(_,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Chevron column`}),(0,w.jsxs)(`td`,{children:[`28px; ícono de 16px `,(0,w.jsx)(x,{nombre:`ink-faint`}),`, gira 90° abierta.`]})]}),(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Open row`}),(0,w.jsxs)(`td`,{children:[`Fondo `,(0,w.jsx)(x,{nombre:`surface-subtle`}),`, igual que el detalle; marcada gana el celeste `,(0,w.jsx)(x,{nombre:`dash-count-bg`}),`.`]})]}),(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Detail`}),(0,w.jsx)(`td`,{children:`Padding 12px 16px y 44px a la izquierda (la sangría del chevron, como DataTable). Fijo en la parte visible si la tabla scrollea.`})]}),(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Procedure`}),(0,w.jsx)(`td`,{children:`Ocupa lo que sobra, 160px como mínimo; corta con "…" en una línea.`})]}),(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Location`}),(0,w.jsx)(`td`,{children:`Sin partir (Upper Arch en una línea).`})]}),(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Fit`}),(0,w.jsx)(`td`,{children:`A 1440 la visita de un caso aceptado entra entera (1026px); más angosto, la tabla scrollea de costado como antes.`})]})]})}),(0,w.jsx)(b,{titulo:`Rules`,children:(0,w.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,w.jsx)(`li`,{children:`The same detail as the Problem List, so a procedure reads the same wherever it is opened.`}),(0,w.jsx)(`li`,{children:`Opening a row never selects it: the checkbox and the row menu keep their own clicks.`}),(0,w.jsx)(`li`,{children:`No consent and no appointment before the case is accepted; a loose procedure has neither.`})]})})]})},F=[`Playground`,`Parts`,`States`,`LinkedFindingOpen`,`Specs`],A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: a => <Ejemplo {...a} />
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
      <Bloque titulo="A row open" nota="Restorative Plan, Waiting for consent: la visita con su turno, el consentimiento Pending y el hallazgo con su diagnóstico.">
        <Ejemplo filas="waiting" detalle seleccion abierta ancho="case" />
      </Bloque>
      <Bloque titulo="What each part is">
        <Tabla encabezado={['Part', 'What it does', 'Component']} minimo={720} arriba>
          <tr><td className="font-semibold">Chevron</td><td>Columna de 28px al inicio (después del arrastre en Planning); gira al abrir.</td><td>TablaProcedimientos (\`detalle\`)</td></tr>
          <tr><td className="font-semibold">Row</td><td>Clic o Enter / Espacio la abre y la cierra; los clics en la casilla, el menú y los íconos no. Abierta, fondo gris claro; marcada, celeste.</td><td>TablaProcedimientos</td></tr>
          <tr><td className="font-semibold">Detail</td><td>Debajo de la fila, a lo ancho de la parte visible de la tabla, con la sangría del chevron.</td><td>DetalleRegistro + registroDePlan (RecordDetail)</td></tr>
          <tr><td className="font-semibold">Collapse all / Expand all</td><td>Arriba de las visitas del caso (uno para todas) o arriba de Unassigned, desde que hay una fila abierta.</td><td>BotonExpandirTodo (Ledger)</td></tr>
          <tr><td className="font-semibold">Procedure</td><td>Corta el nombre con "…"; el tooltip y el título del detalle lo muestran entero.</td><td>—</td></tr>
          <tr><td className="font-semibold">Linked record</td><td>Un hallazgo o procedimiento vinculado se abre en el drawer de View full record; el caso, en Treatment Plan mismo.</td><td>useVerRegistro (RecordDetail)</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
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
}`,...P.parameters?.docs?.source}}}})))()}I();export{N as LinkedFindingOpen,j as Parts,A as Playground,P as Specs,M as States,F as __namedExportsOrder,k as default};