import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,r}from"./tooltip-6ep9-x7U.js";import{n as i,r as a}from"./toaster-B6mRBNx3.js";import{C as o,T as s,_ as ee,a as c,c as l,d as u,f as te,g as d,i as f,l as ne,m as p,n as re,o as m,p as ie,r as ae,s as oe,t as h,u as se,v as ce,w as g,x as _}from"./RecordDetail-CG33q9Jb.js";import{n as v,r as le}from"./play-Dr1R_I1D.js";import{c as y,d as b,i as x,t as S,u as C}from"./kit-CWUgB5-0.js";import{s as w,t as ue,u as de}from"./treatment-plan-D7Jui5pR.js";import{d as T,f as E,x as fe}from"./clinical-mode-dnbdY9HQ.js";function D({tipo:e,procedure:t,problem:n,ancho:i}){let a=e===`procedure`?{tipo:`procedimiento`,r:E.find(e=>e.id===t)??E[0]}:{tipo:`problema`,r:T.find(e=>e.id===n)??T[0]};return(0,k.jsx)(r,{children:(0,k.jsx)(`div`,{className:`rounded-lg border border-line-row bg-surface-subtle px-4 py-3 pl-11 text-[13px] text-ink-soft`,style:{width:N[i]},children:(0,k.jsx)(u,{registro:a,contexto:M},a.r.id)})})}function O({registro:e}){return(0,k.jsx)(r,{children:(0,k.jsx)(`div`,{className:`rounded-lg border border-line-row bg-surface-subtle px-4 py-3 pl-11 text-[13px] text-ink-soft`,style:{width:N.wide},children:(0,k.jsx)(u,{registro:e,contexto:M})})})}var k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{a(),n(),b(),le(),fe(),de(),o(),k=t(),{userEvent:A,within:j}=__STORYBOOK_MODULE_TEST__,M={problemas:T,procedimientos:E,onAbrirProblema:e=>i.info(`Opens ${e.condicion} in Problem List.`),onAbrirProcedimiento:e=>i.info(`Opens ${e.codigo} in Procedures.`)},N={wide:880,overlay:790,narrow:320},P=Object.fromEntries(E.map(e=>[`${e.codigo} · ${e.nombre.slice(0,28)}`,e.id])),F=Object.fromEntries(T.map(e=>[`${e.condicion} (${e.estado})`,e.id])),I={title:`Components/Clinical/RecordDetail`,parameters:{layout:`padded`,docs:{description:{component:["El detalle que se despliega en cada fila de la tabla del Overview de Clinical Mode (**Problem List** y **Procedures**), con el mismo desplegable del Ledger: el chevron, clic en la fila, y *Expand all / Collapse all* desde que hay una abierta (`rowDetail` de Elements / Tables).",``,`**Qué muestra:** lo que cuelga del registro, en una **lista sin cards**: una fila debajo de la otra, el título a la izquierda y los datos a la derecha, cada dato en una línea. Van por importancia (Julián, 2026-10-13). Un procedimiento: *Treatment* (el caso, su grupo, la visita con su turno, las otras visitas y los casos históricos), *Procedure consent*, *Findings / diagnoses*, *Referral* y *Lab order*, y después lo del cobro (prototipo *Expanded transaction detail*): *Clinic location*, *Financial details* (cargo, seguro, pagos y ajustes aplicados, y lo que falta de ese cargo) y *Applied transactions* (qué se aplicó, cuándo y cuánto; la referencia abre la transacción). Un problema: *Procedures*, *Treatment*, *Referral*, *Lab order* (con el procedimiento relacionado) y *Source exam*. Lo que no entra en el resumen se pliega detrás de "N more…". Las piezas de la lista son *Components / UI / DetailList*, las mismas del detalle del Ledger.`,``,"**También fuera de la tabla** (2026-10-13): en cada fila de **Treatment Plan** (Unassigned y las visitas de un caso; `registroDePlan`: el caso que se está viendo y lo del procedimiento del paciente que es) y en el menú de cada finding de un **examen** (*View full record*; `registroDeHallazgo`: los datos del finding y lo de su fila de la Problem List). Ahí un hallazgo o procedimiento vinculado se abre en el mismo drawer (`useVerRegistro`), sin salir de la pantalla.",``,"**Reusa** lo que ya hay: el turno de la visita de Treatment Plan (`CitaVisita`), el estado de consentimiento de sus tablas, las pills de caso, de Lab Order y de la tabla, y el drawer para *View full record*. Cada link lleva a la pantalla donde se trabaja (Treatment Plan con el caso abierto, Lab Order, Referral, el examen) o abre el registro en la otra pestaña. Sólo lectura.",``,`**Probalo:** en *Playground* elegí un procedimiento o un problema y el ancho (la tabla del Overview, el flotante de un examen o un teléfono) desde *Controls*; abrí los "more" y tocá un link.`].join(`
`)}}},args:{tipo:`procedure`,procedure:`pr10`,problem:`p9`,ancho:`wide`},argTypes:{tipo:{name:`record`,control:`inline-radio`,options:[`procedure`,`problem`],description:`Qué pestaña de la tabla.`},procedure:{control:`select`,options:Object.values(P),labels:Object.fromEntries(Object.entries(P).map(([e,t])=>[t,e])),description:`El procedimiento de la fila.`,if:{arg:`tipo`,eq:`procedure`}},problem:{control:`select`,options:Object.values(F),labels:Object.fromEntries(Object.entries(F).map(([e,t])=>[t,e])),description:`El problema de la fila.`,if:{arg:`tipo`,eq:`problem`}},ancho:{name:`width`,control:`inline-radio`,options:Object.keys(N),description:`wide 880 (Overview) · overlay 790 (View Problem List de un examen) · narrow 320 (teléfono: el título de cada fila va arriba).`}}},L={render:e=>(0,k.jsx)(D,{...e})},R=E.find(e=>e.id===`pr11`),z=T.find(e=>e.id===`p9`),B={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,k.jsx)(r,{children:(0,k.jsxs)(x,{children:[(0,k.jsx)(S,{titulo:`The detail, procedure`,nota:`Título completo y pieza arriba; la lista; al pie View full record y Read-only summary.`,children:(0,k.jsx)(D,{tipo:`procedure`,procedure:`pr10`,problem:`p9`,ancho:`wide`})}),(0,k.jsx)(S,{titulo:`Rows of a procedure`,nota:`FilasProcedimiento, por importancia: Treatment, Procedure consent, Findings / diagnoses, Referral y Lab order, y después Clinic location, Financial details y Applied transactions (del cargo del Ledger).`,children:(0,k.jsx)(`div`,{className:`@container flex w-[880px] max-w-full flex-col`,children:(0,k.jsx)(ie,{r:R,c:M})})}),(0,k.jsx)(S,{titulo:`Rows of a problem`,nota:`FilasProblema, por importancia: Procedures, Treatment (sin visitas), Referral y Lab order con el procedimiento relacionado, y Source exam.`,children:(0,k.jsx)(`div`,{className:`@container flex w-[880px] max-w-full flex-col`,children:(0,k.jsx)(te,{r:z,c:M})})}),(0,k.jsx)(S,{titulo:`What each part is`,children:(0,k.jsxs)(y,{encabezado:[`Part`,`What it does`,`Component`],minimo:720,arriba:!0,children:[(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Row`}),(0,k.jsx)(`td`,{children:`Una fila de la lista, sin card: título de 11px y la cuenta a la izquierda (arriba en angosto), los datos a la derecha. Una línea fina separa las filas.`}),(0,k.jsx)(`td`,{children:`FilaDetalle (UI / DetailList)`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Entry`}),(0,k.jsx)(`td`,{children:`Un dato en una línea: rótulo opcional (Finding, Diagnosis), link o texto, su estado y el contexto.`}),(0,k.jsx)(`td`,{children:`Entrada (UI / DetailList)`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Link`}),(0,k.jsx)(`td`,{children:`Lleva a donde vive el registro; la flecha dice que sale de la tabla.`}),(0,k.jsx)(`td`,{children:`EnlaceRegistro (UI / DetailList)`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`N more…`}),(0,k.jsx)(`td`,{children:`Lo que no entra en el resumen, plegado: visitas, casos históricos, hallazgos y diagnósticos.`}),(0,k.jsx)(`td`,{children:`MasItems (UI / DetailList)`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Nothing linked`}),(0,k.jsx)(`td`,{children:`La fila queda y dice qué falta: así se sabe que no hay, no que no cargó.`}),(0,k.jsx)(`td`,{children:`Vacio (UI / DetailList)`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Contents`}),(0,k.jsx)(`td`,{children:`Lo mismo en la fila y en el drawer: el drawer lo muestra todo, sin plegar.`}),(0,k.jsx)(`td`,{children:`ContenidoTratamiento, ContenidoOrdenes, ContenidoDerivaciones, ContenidoHallazgos, ContenidoConsentimiento, ContenidoProcedimientos, ContenidoExamen`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Financial details`}),(0,k.jsx)(`td`,{children:`El cargo del Ledger que cobra el procedimiento: cargo original, seguro, pagos, ajustes y Outstanding balance (destacado: el saldo de ese cargo, no el de la cuenta). Sin cargo: Not charged yet.`}),(0,k.jsx)(`td`,{children:`ContenidoFinanzas, Metrica`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Applied transactions`}),(0,k.jsx)(`td`,{children:`Fecha, tipo, la transacción (abre su registro de sólo lectura, el mismo del Ledger) y lo aplicado a este cargo.`}),(0,k.jsx)(`td`,{children:`ContenidoAplicadas`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Clinic location`}),(0,k.jsx)(`td`,{children:`La sede donde se hizo (la del cargo). Se llama así para no confundirla con la columna Location de la tabla, que es la zona de la boca.`}),(0,k.jsx)(`td`,{children:`ContenidoSede`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Full record`}),(0,k.jsx)(`td`,{children:`Drawer de sólo lectura: los datos de la fila de a dos y una sección por fila de la lista. Close y Edit.`}),(0,k.jsx)(`td`,{children:`RegistroCompletoDrawer, SeccionesProcedimiento, SeccionesProblema`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`From Treatment Plan`}),(0,k.jsx)(`td`,{children:`La fila de un caso o suelta como registro: sus datos, el caso que se está viendo (Treatment y Procedure consent) y lo vinculado al procedimiento del paciente que es.`}),(0,k.jsx)(`td`,{children:`registroDePlan`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`From an exam`}),(0,k.jsx)(`td`,{children:`Un finding del panel de un examen como registro: sus datos (con Descriptors) y lo de su fila de la Problem List, si la tiene.`}),(0,k.jsx)(`td`,{children:`registroDeHallazgo`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Outside the table`}),(0,k.jsx)(`td`,{children:`El drawer y los links de un examen o de Treatment Plan: un registro vinculado cambia el drawer a ese.`}),(0,k.jsx)(`td`,{children:`useVerRegistro`})]})]})})]})})},V=e=>E.find(t=>t.id===e),H=e=>T.find(t=>t.id===e),U=ue.find(e=>e.id===`c3`),W={id:`F-1`,area:`Tooth 3`,condition:`chronic enamel dental caries`,descriptor:`Deep`,date:`May 14, 2026`,status:`Discarded`,tooth:3,provider:`Elena Martinez`,surfaces:[`O`,`DB`],notes:``,linked:[],diagnoses:[],examen:`Dental Assessment`,problema:`p5`},G={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,k.jsx)(r,{children:(0,k.jsxs)(x,{children:[(0,k.jsx)(S,{titulo:`Procedure, everything linked`,nota:`Caso aceptado: la visita del procedimiento con su turno (No appointment avisa, como en Treatment Plan), una visita más plegada, la derivación y el consentimiento firmado.`,children:(0,k.jsx)(D,{tipo:`procedure`,procedure:`pr10`,problem:`p9`,ancho:`wide`})}),(0,k.jsx)(S,{titulo:`Historical case and lab order`,nota:`El caso elegido de un grupo y la alternativa descartada, plegada en Historical case.`,children:(0,k.jsx)(D,{tipo:`procedure`,procedure:`pr4`,problem:`p9`,ancho:`wide`})}),(0,k.jsx)(S,{titulo:`Before the case is accepted`,nota:`Planning, Pending o Presented: la visita sin turno y el consentimiento todavía no existe (la misma regla que Treatment Plan).`,children:(0,k.jsx)(D,{tipo:`procedure`,procedure:`pr11`,problem:`p9`,ancho:`wide`})}),(0,k.jsx)(S,{titulo:`Charged and partly paid`,nota:`D4341: $310 cobrados, con pago, ajuste y transferencia aplicados; faltan $170.`,children:(0,k.jsx)(D,{tipo:`procedure`,procedure:`pr11`,problem:`p9`,ancho:`wide`})}),(0,k.jsx)(S,{titulo:`Paid by insurance`,nota:`D0120: lo cubrió el seguro entero; Outstanding en $0.`,children:(0,k.jsx)(D,{tipo:`procedure`,procedure:`pr9`,problem:`p9`,ancho:`wide`})}),(0,k.jsx)(S,{titulo:`Empty`,nota:`Nada vinculado: cada fila queda y dice qué no hay (No treatment linked, No lab orders linked…).`,children:(0,k.jsx)(D,{tipo:`procedure`,procedure:`pr1`,problem:`p9`,ancho:`wide`})}),(0,k.jsx)(S,{titulo:`Problem with procedures`,nota:`El procedimiento que lo resuelve, su caso, y la derivación con el procedimiento relacionado.`,children:(0,k.jsx)(D,{tipo:`problem`,procedure:`pr10`,problem:`p9`,ancho:`wide`})}),(0,k.jsx)(S,{titulo:`Problem with its own referral`,nota:`Un problema derivado sin procedimiento: la derivación es del problema.`,children:(0,k.jsx)(D,{tipo:`problem`,procedure:`pr10`,problem:`p11`,ancho:`wide`})}),(0,k.jsx)(S,{titulo:`From Treatment Plan`,nota:`La fila D2391 de Restorative Plan: el caso que se está viendo, el consentimiento Pending de ese procedimiento y el hallazgo que resuelve.`,children:(0,k.jsx)(O,{registro:s(U.visitas[0].procedimientos[0],U)})}),(0,k.jsx)(S,{titulo:`Unassigned procedure`,nota:`Una fila suelta de Treatment Plan: sin caso ni consentimiento.`,children:(0,k.jsx)(O,{registro:s(w[0])})}),(0,k.jsx)(S,{titulo:`Overlay width`,nota:`790px, el flotante de View Problem List: la misma lista, con el título a la izquierda.`,children:(0,k.jsx)(D,{tipo:`procedure`,procedure:`pr6`,problem:`p9`,ancho:`overlay`})}),(0,k.jsx)(S,{titulo:`Narrow`,nota:`Teléfono: el título de cada fila va arriba de sus datos. En la tabla, el detalle queda en la parte visible aunque la tabla scrollee de costado.`,children:(0,k.jsx)(D,{tipo:`procedure`,procedure:`pr10`,problem:`p9`,ancho:`narrow`})})]})})},K={name:`More open`,args:{tipo:`procedure`,procedure:`pr10`,ancho:`wide`},render:e=>(0,k.jsx)(D,{...e}),play:async e=>{let t=j(e.canvasElement);await A.click(await t.findByRole(`button`,{name:/1 more visit/})),await v(/May 4, 2026/)(e),await v(/K08\.9/)(e)}},q={name:`Full record`,parameters:{controls:{disable:!0},docs:{story:{inline:!1,iframeHeight:720}}},render:()=>(0,k.jsx)(r,{children:(0,k.jsx)(d,{registro:{tipo:`procedimiento`,r:V(`pr10`)},contexto:M,onClose:()=>{}})})},J={name:`Full record · problem`,parameters:{controls:{disable:!0},docs:{story:{inline:!1,iframeHeight:720}}},render:()=>(0,k.jsx)(r,{children:(0,k.jsx)(d,{registro:{tipo:`problema`,r:H(`p5`)},contexto:M,onClose:()=>{}})})},Y={name:`Full record · exam finding`,parameters:{controls:{disable:!0},docs:{story:{inline:!1,iframeHeight:720}}},render:()=>(0,k.jsx)(r,{children:(0,k.jsx)(d,{registro:g(W),contexto:M,onClose:()=>{}})})},X={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,k.jsx)(r,{children:(0,k.jsxs)(x,{children:[(0,k.jsx)(S,{titulo:`Drawer sections`,children:(0,k.jsxs)(`div`,{className:`grid w-[880px] max-w-full gap-8 md:grid-cols-2`,children:[(0,k.jsx)(`div`,{className:`flex flex-col gap-6`,children:(0,k.jsx)(ce,{r:V(`pr4`),c:M})}),(0,k.jsx)(`div`,{className:`flex flex-col gap-6`,children:(0,k.jsx)(ee,{r:H(`p1`),c:M})})]})}),(0,k.jsx)(S,{titulo:`Contents`,children:(0,k.jsxs)(`div`,{className:`grid w-[880px] max-w-full gap-6 md:grid-cols-3 [&>div]:flex [&>div]:flex-col [&>div]:gap-2`,children:[(0,k.jsx)(`div`,{children:(0,k.jsx)(se,{t:void 0})}),(0,k.jsxs)(`div`,{children:[(0,k.jsx)(oe,{ordenes:[]}),(0,k.jsx)(ae,{derivaciones:[]})]}),(0,k.jsx)(`div`,{children:(0,k.jsx)(m,{hallazgos:[H(`p5`)],onAbrir:M.onAbrirProblema,completo:!0})}),(0,k.jsx)(`div`,{children:(0,k.jsx)(l,{procedimientos:[V(`pr6`)],onAbrir:M.onAbrirProcedimiento})}),(0,k.jsx)(`div`,{children:(0,k.jsx)(re,{t:void 0})}),(0,k.jsxs)(`div`,{children:[(0,k.jsx)(f,{problema:H(`p7`)}),(0,k.jsx)(f,{problema:{...H(`p7`),examen:``}})]}),(0,k.jsx)(`div`,{children:(0,k.jsx)(ne,{cargo:_(V(`pr11`))})}),(0,k.jsx)(`div`,{className:`md:col-span-2`,children:(0,k.jsx)(c,{cargo:_(V(`pr11`))})}),(0,k.jsx)(`div`,{className:`md:col-span-3`,children:(0,k.jsx)(h,{cargo:_(V(`pr11`))})}),(0,k.jsxs)(`div`,{children:[(0,k.jsx)(c,{cargo:void 0}),(0,k.jsx)(h,{cargo:void 0})]}),(0,k.jsx)(`div`,{children:(0,k.jsxs)(`dl`,{className:`grid grid-cols-2 gap-4`,children:[(0,k.jsx)(p,{label:`Original charge`,valor:310}),(0,k.jsx)(p,{label:`Outstanding balance`,valor:170,destacado:!0})]})})]})})]})})},Z={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,k.jsxs)(x,{children:[(0,k.jsx)(S,{titulo:`Layout`,children:(0,k.jsxs)(y,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`List`}),(0,k.jsx)(`td`,{children:`Sin cards: una fila debajo de la otra, separadas por una línea de 1px. Padding vertical de 8px por fila.`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Row title`}),(0,k.jsx)(`td`,{children:`Columna de 150px a la izquierda desde 448px de detalle; abajo de eso, arriba de los datos (container query: depende del ancho de la tabla, no de la pantalla).`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Entry`}),(0,k.jsx)(`td`,{children:`Una línea de 24px como mínimo (el alto del botón de turno); si no entra, sigue en la siguiente.`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Gap`}),(0,k.jsx)(`td`,{children:`12px entre el título del registro, la lista y el pie.`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`In the table`}),(0,k.jsxs)(`td`,{children:[`Debajo de la fila, con la sangría del chevron (44px) y fondo `,(0,k.jsx)(`code`,{children:`surface-subtle`}),`. Si la tabla scrollea de costado, el detalle queda fijo en la parte visible.`]})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Financial details`}),(0,k.jsxs)(`td`,{children:[`Números en columnas de 112px como mínimo, tantas como entren (5 en el Overview, 2 en el teléfono); el monto abajo de su rótulo, 15px; el que falta pagar en Semibold `,(0,k.jsx)(C,{nombre:`dash-blue`}),`.`]})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Applied transactions`}),(0,k.jsxs)(`td`,{children:[`Tabla de 12px con encabezado de 11px `,(0,k.jsx)(C,{nombre:`ink-muted`}),`; fecha MM/DD/YYYY y monto sin partir.`]})]})]})}),(0,k.jsx)(S,{titulo:`Type and color`,children:(0,k.jsxs)(y,{encabezado:[`Item`,`Size`,`Color`],minimo:560,children:[(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Record title`}),(0,k.jsx)(`td`,{children:`13px Semibold`}),(0,k.jsx)(`td`,{children:(0,k.jsx)(C,{nombre:`ink`})})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Row title`}),(0,k.jsx)(`td`,{children:`11px Semibold`}),(0,k.jsx)(`td`,{children:(0,k.jsx)(C,{nombre:`ink-muted`})})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Link`}),(0,k.jsx)(`td`,{children:`12px Medium, flecha 12px`}),(0,k.jsx)(`td`,{children:(0,k.jsx)(C,{nombre:`dash-blue`})})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Context line`}),(0,k.jsx)(`td`,{children:`11px`}),(0,k.jsx)(`td`,{children:(0,k.jsx)(C,{nombre:`ink-muted`})})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Nothing linked`}),(0,k.jsx)(`td`,{children:`12px`}),(0,k.jsx)(`td`,{children:(0,k.jsx)(C,{nombre:`ink-faint`})})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Divider between rows`}),(0,k.jsx)(`td`,{children:`1px`}),(0,k.jsx)(`td`,{children:(0,k.jsx)(C,{nombre:`line-soft`})})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Count`}),(0,k.jsx)(`td`,{children:`Count (Elements)`}),(0,k.jsx)(`td`,{children:(0,k.jsx)(C,{nombre:`dash-count-bg`})})]})]})}),(0,k.jsx)(S,{titulo:`Rules`,children:(0,k.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,k.jsx)(`li`,{children:`Read-only: changing a status stays in the row menu. Edit in the full record says it is not in this release.`}),(0,k.jsx)(`li`,{children:`A list, not cards: the detail should not take more room than the data it shows.`}),(0,k.jsx)(`li`,{children:`Every row stays even when it is empty, so the detail always has the same shape and order.`}),(0,k.jsx)(`li`,{children:`Show the first items in the summary (the visit of the procedure, the finding and its diagnosis); the rest goes behind “N more…”. The full record shows everything.`}),(0,k.jsx)(`li`,{children:`Statuses use the pills of their own screen: cases as in Treatment Plan, lab orders as in Lab Order, consent as in the visit table.`}),(0,k.jsx)(`li`,{children:`No appointment and no consent before the case is accepted (Planning, Pending, Presented), as in Treatment Plan.`}),(0,k.jsx)(`li`,{children:`The same detail wherever the record is opened: the Overview table, View Problem List, a Treatment Plan row or an exam finding.`})]})})]})},Q=[`Playground`,`Parts`,`States`,`MoreOpen`,`FullRecord`,`FullRecordProblem`,`FullRecordFinding`,`Contents`,`Specs`],L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: args => <EnFila {...args} />
}`,...L.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
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
        <Bloque titulo="The detail, procedure" nota="Título completo y pieza arriba; la lista; al pie View full record y Read-only summary.">
          <EnFila tipo="procedure" procedure="pr10" problem="p9" ancho="wide" />
        </Bloque>
        <Bloque titulo="Rows of a procedure" nota="FilasProcedimiento, por importancia: Treatment, Procedure consent, Findings / diagnoses, Referral y Lab order, y después Clinic location, Financial details y Applied transactions (del cargo del Ledger).">
          <div className="@container flex w-[880px] max-w-full flex-col"><FilasProcedimiento r={rProc} c={CONTEXTO} /></div>
        </Bloque>
        <Bloque titulo="Rows of a problem" nota="FilasProblema, por importancia: Procedures, Treatment (sin visitas), Referral y Lab order con el procedimiento relacionado, y Source exam.">
          <div className="@container flex w-[880px] max-w-full flex-col"><FilasProblema r={p9} c={CONTEXTO} /></div>
        </Bloque>
        <Bloque titulo="What each part is">
          <Tabla encabezado={['Part', 'What it does', 'Component']} minimo={720} arriba>
            <tr><td className="font-semibold">Row</td><td>Una fila de la lista, sin card: título de 11px y la cuenta a la izquierda (arriba en angosto), los datos a la derecha. Una línea fina separa las filas.</td><td>FilaDetalle (UI / DetailList)</td></tr>
            <tr><td className="font-semibold">Entry</td><td>Un dato en una línea: rótulo opcional (Finding, Diagnosis), link o texto, su estado y el contexto.</td><td>Entrada (UI / DetailList)</td></tr>
            <tr><td className="font-semibold">Link</td><td>Lleva a donde vive el registro; la flecha dice que sale de la tabla.</td><td>EnlaceRegistro (UI / DetailList)</td></tr>
            <tr><td className="font-semibold">N more…</td><td>Lo que no entra en el resumen, plegado: visitas, casos históricos, hallazgos y diagnósticos.</td><td>MasItems (UI / DetailList)</td></tr>
            <tr><td className="font-semibold">Nothing linked</td><td>La fila queda y dice qué falta: así se sabe que no hay, no que no cargó.</td><td>Vacio (UI / DetailList)</td></tr>
            <tr><td className="font-semibold">Contents</td><td>Lo mismo en la fila y en el drawer: el drawer lo muestra todo, sin plegar.</td><td>ContenidoTratamiento, ContenidoOrdenes, ContenidoDerivaciones, ContenidoHallazgos, ContenidoConsentimiento, ContenidoProcedimientos, ContenidoExamen</td></tr>
            <tr><td className="font-semibold">Financial details</td><td>El cargo del Ledger que cobra el procedimiento: cargo original, seguro, pagos, ajustes y Outstanding balance (destacado: el saldo de ese cargo, no el de la cuenta). Sin cargo: Not charged yet.</td><td>ContenidoFinanzas, Metrica</td></tr>
            <tr><td className="font-semibold">Applied transactions</td><td>Fecha, tipo, la transacción (abre su registro de sólo lectura, el mismo del Ledger) y lo aplicado a este cargo.</td><td>ContenidoAplicadas</td></tr>
            <tr><td className="font-semibold">Clinic location</td><td>La sede donde se hizo (la del cargo). Se llama así para no confundirla con la columna Location de la tabla, que es la zona de la boca.</td><td>ContenidoSede</td></tr>
            <tr><td className="font-semibold">Full record</td><td>Drawer de sólo lectura: los datos de la fila de a dos y una sección por fila de la lista. Close y Edit.</td><td>RegistroCompletoDrawer, SeccionesProcedimiento, SeccionesProblema</td></tr>
            <tr><td className="font-semibold">From Treatment Plan</td><td>La fila de un caso o suelta como registro: sus datos, el caso que se está viendo (Treatment y Procedure consent) y lo vinculado al procedimiento del paciente que es.</td><td>registroDePlan</td></tr>
            <tr><td className="font-semibold">From an exam</td><td>Un finding del panel de un examen como registro: sus datos (con Descriptors) y lo de su fila de la Problem List, si la tiene.</td><td>registroDeHallazgo</td></tr>
            <tr><td className="font-semibold">Outside the table</td><td>El drawer y los links de un examen o de Treatment Plan: un registro vinculado cambia el drawer a ese.</td><td>useVerRegistro</td></tr>
          </Tabla>
        </Bloque>
      </Lienzo>
    </TooltipProvider>
}`,...B.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
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
        <Bloque titulo="Procedure, everything linked" nota="Caso aceptado: la visita del procedimiento con su turno (No appointment avisa, como en Treatment Plan), una visita más plegada, la derivación y el consentimiento firmado.">
          <EnFila tipo="procedure" procedure="pr10" problem="p9" ancho="wide" />
        </Bloque>
        <Bloque titulo="Historical case and lab order" nota="El caso elegido de un grupo y la alternativa descartada, plegada en Historical case.">
          <EnFila tipo="procedure" procedure="pr4" problem="p9" ancho="wide" />
        </Bloque>
        <Bloque titulo="Before the case is accepted" nota="Planning, Pending o Presented: la visita sin turno y el consentimiento todavía no existe (la misma regla que Treatment Plan).">
          <EnFila tipo="procedure" procedure="pr11" problem="p9" ancho="wide" />
        </Bloque>
        <Bloque titulo="Charged and partly paid" nota="D4341: $310 cobrados, con pago, ajuste y transferencia aplicados; faltan $170.">
          <EnFila tipo="procedure" procedure="pr11" problem="p9" ancho="wide" />
        </Bloque>
        <Bloque titulo="Paid by insurance" nota="D0120: lo cubrió el seguro entero; Outstanding en $0.">
          <EnFila tipo="procedure" procedure="pr9" problem="p9" ancho="wide" />
        </Bloque>
        <Bloque titulo="Empty" nota="Nada vinculado: cada fila queda y dice qué no hay (No treatment linked, No lab orders linked…).">
          <EnFila tipo="procedure" procedure="pr1" problem="p9" ancho="wide" />
        </Bloque>
        <Bloque titulo="Problem with procedures" nota="El procedimiento que lo resuelve, su caso, y la derivación con el procedimiento relacionado.">
          <EnFila tipo="problem" procedure="pr10" problem="p9" ancho="wide" />
        </Bloque>
        <Bloque titulo="Problem with its own referral" nota="Un problema derivado sin procedimiento: la derivación es del problema.">
          <EnFila tipo="problem" procedure="pr10" problem="p11" ancho="wide" />
        </Bloque>
        <Bloque titulo="From Treatment Plan" nota="La fila D2391 de Restorative Plan: el caso que se está viendo, el consentimiento Pending de ese procedimiento y el hallazgo que resuelve.">
          <EnRegistro registro={registroDePlan(c3.visitas[0]!.procedimientos[0]!, c3)} />
        </Bloque>
        <Bloque titulo="Unassigned procedure" nota="Una fila suelta de Treatment Plan: sin caso ni consentimiento.">
          <EnRegistro registro={registroDePlan(NO_ASIGNADOS[0]!)} />
        </Bloque>
        <Bloque titulo="Overlay width" nota="790px, el flotante de View Problem List: la misma lista, con el título a la izquierda.">
          <EnFila tipo="procedure" procedure="pr6" problem="p9" ancho="overlay" />
        </Bloque>
        <Bloque titulo="Narrow" nota="Teléfono: el título de cada fila va arriba de sus datos. En la tabla, el detalle queda en la parte visible aunque la tabla scrollee de costado.">
          <EnFila tipo="procedure" procedure="pr10" problem="p9" ancho="narrow" />
        </Bloque>
      </Lienzo>
    </TooltipProvider>
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: 'More open',
  args: {
    tipo: 'procedure',
    procedure: 'pr10',
    ancho: 'wide'
  },
  render: args => <EnFila {...args} />,
  play: async c => {
    const canvas = within(c.canvasElement);
    await userEvent.click(await canvas.findByRole('button', {
      name: /1 more visit/
    }));
    await esperar(/May 4, 2026/)(c);
    await esperar(/K08\\.9/)(c);
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  name: 'Full record',
  parameters: {
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: false,
        iframeHeight: 720
      }
    }
  },
  render: () => <TooltipProvider>
      <RegistroCompletoDrawer registro={{
      tipo: 'procedimiento',
      r: procDe('pr10')
    }} contexto={CONTEXTO} onClose={() => {}} />
    </TooltipProvider>
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  name: 'Full record · problem',
  parameters: {
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: false,
        iframeHeight: 720
      }
    }
  },
  render: () => <TooltipProvider>
      <RegistroCompletoDrawer registro={{
      tipo: 'problema',
      r: probDe('p5')
    }} contexto={CONTEXTO} onClose={() => {}} />
    </TooltipProvider>
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: 'Full record · exam finding',
  parameters: {
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: false,
        iframeHeight: 720
      }
    }
  },
  render: () => <TooltipProvider>
      <RegistroCompletoDrawer registro={registroDeHallazgo(HALLAZGO)} contexto={CONTEXTO} onClose={() => {}} />
    </TooltipProvider>
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
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
        <Bloque titulo="Drawer sections">
          <div className="grid w-[880px] max-w-full gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-6"><SeccionesProcedimiento r={procDe('pr4')} c={CONTEXTO} /></div>
            <div className="flex flex-col gap-6"><SeccionesProblema r={probDe('p1')} c={CONTEXTO} /></div>
          </div>
        </Bloque>
        <Bloque titulo="Contents">
          <div className="grid w-[880px] max-w-full gap-6 md:grid-cols-3 [&>div]:flex [&>div]:flex-col [&>div]:gap-2">
            <div><ContenidoTratamiento t={undefined} /></div>
            <div><ContenidoOrdenes ordenes={[]} /><ContenidoDerivaciones derivaciones={[]} /></div>
            <div><ContenidoHallazgos hallazgos={[probDe('p5')]} onAbrir={CONTEXTO.onAbrirProblema} completo /></div>
            <div><ContenidoProcedimientos procedimientos={[procDe('pr6')]} onAbrir={CONTEXTO.onAbrirProcedimiento} /></div>
            <div><ContenidoConsentimiento t={undefined} /></div>
            <div><ContenidoExamen problema={probDe('p7')} /><ContenidoExamen problema={{
              ...probDe('p7'),
              examen: ''
            }} /></div>
            <div><ContenidoSede cargo={cargoDe(procDe('pr11'))} /></div>
            <div className="md:col-span-2"><ContenidoFinanzas cargo={cargoDe(procDe('pr11'))} /></div>
            <div className="md:col-span-3"><ContenidoAplicadas cargo={cargoDe(procDe('pr11'))} /></div>
            <div><ContenidoFinanzas cargo={undefined} /><ContenidoAplicadas cargo={undefined} /></div>
            <div><dl className="grid grid-cols-2 gap-4"><Metrica label="Original charge" valor={310} /><Metrica label="Outstanding balance" valor={170} destacado /></dl></div>
          </div>
        </Bloque>
      </Lienzo>
    </TooltipProvider>
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
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
          <tr><td className="font-semibold">List</td><td>Sin cards: una fila debajo de la otra, separadas por una línea de 1px. Padding vertical de 8px por fila.</td></tr>
          <tr><td className="font-semibold">Row title</td><td>Columna de 150px a la izquierda desde 448px de detalle; abajo de eso, arriba de los datos (container query: depende del ancho de la tabla, no de la pantalla).</td></tr>
          <tr><td className="font-semibold">Entry</td><td>Una línea de 24px como mínimo (el alto del botón de turno); si no entra, sigue en la siguiente.</td></tr>
          <tr><td className="font-semibold">Gap</td><td>12px entre el título del registro, la lista y el pie.</td></tr>
          <tr><td className="font-semibold">In the table</td><td>Debajo de la fila, con la sangría del chevron (44px) y fondo <code>surface-subtle</code>. Si la tabla scrollea de costado, el detalle queda fijo en la parte visible.</td></tr>
          <tr><td className="font-semibold">Financial details</td><td>Números en columnas de 112px como mínimo, tantas como entren (5 en el Overview, 2 en el teléfono); el monto abajo de su rótulo, 15px; el que falta pagar en Semibold <Token nombre="dash-blue" />.</td></tr>
          <tr><td className="font-semibold">Applied transactions</td><td>Tabla de 12px con encabezado de 11px <Token nombre="ink-muted" />; fecha MM/DD/YYYY y monto sin partir.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Type and color">
        <Tabla encabezado={['Item', 'Size', 'Color']} minimo={560}>
          <tr><td className="font-semibold">Record title</td><td>13px Semibold</td><td><Token nombre="ink" /></td></tr>
          <tr><td className="font-semibold">Row title</td><td>11px Semibold</td><td><Token nombre="ink-muted" /></td></tr>
          <tr><td className="font-semibold">Link</td><td>12px Medium, flecha 12px</td><td><Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Context line</td><td>11px</td><td><Token nombre="ink-muted" /></td></tr>
          <tr><td className="font-semibold">Nothing linked</td><td>12px</td><td><Token nombre="ink-faint" /></td></tr>
          <tr><td className="font-semibold">Divider between rows</td><td>1px</td><td><Token nombre="line-soft" /></td></tr>
          <tr><td className="font-semibold">Count</td><td>Count (Elements)</td><td><Token nombre="dash-count-bg" /></td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>Read-only: changing a status stays in the row menu. Edit in the full record says it is not in this release.</li>
          <li>A list, not cards: the detail should not take more room than the data it shows.</li>
          <li>Every row stays even when it is empty, so the detail always has the same shape and order.</li>
          <li>Show the first items in the summary (the visit of the procedure, the finding and its diagnosis); the rest goes behind “N more…”. The full record shows everything.</li>
          <li>Statuses use the pills of their own screen: cases as in Treatment Plan, lab orders as in Lab Order, consent as in the visit table.</li>
          <li>No appointment and no consent before the case is accepted (Planning, Pending, Presented), as in Treatment Plan.</li>
          <li>The same detail wherever the record is opened: the Overview table, View Problem List, a Treatment Plan row or an exam finding.</li>
        </ul>
      </Bloque>
    </Lienzo>
}`,...Z.parameters?.docs?.source}}}})))()}$();export{X as Contents,q as FullRecord,Y as FullRecordFinding,J as FullRecordProblem,K as MoreOpen,B as Parts,L as Playground,Z as Specs,G as States,Q as __namedExportsOrder,I as default};