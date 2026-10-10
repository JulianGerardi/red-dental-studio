import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,r}from"./tooltip-6ep9-x7U.js";import{n as i,r as a}from"./toaster-B6mRBNx3.js";import{n as o,r as s}from"./play-Dr1R_I1D.js";import{c,d as ee,i as l,t as u,u as d}from"./kit-4bQS7S9u.js";import{d as f,f as p,x as m}from"./clinical-mode-B1jDrqqr.js";import{S as h,_ as te,a as ne,c as g,d as _,f as v,g as y,i as b,l as x,m as re,n as S,o as C,p as w,r as T,s as E,t as D,u as O,v as k,x as A}from"./RecordDetail-C2GCFBbj.js";function j({tipo:e,procedure:t,problem:n,ancho:i}){let a=e===`procedure`?{tipo:`procedimiento`,r:p.find(e=>e.id===t)??p[0]}:{tipo:`problema`,r:f.find(e=>e.id===n)??f[0]};return(0,M.jsx)(r,{children:(0,M.jsx)(`div`,{className:`rounded-lg border border-line-row bg-surface-subtle px-4 py-3 pl-11 text-[13px] text-ink-soft`,style:{width:I[i]},children:(0,M.jsx)(g,{registro:a,contexto:F},a.r.id)})})}var M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{a(),n(),ee(),s(),m(),h(),M=t(),{userEvent:N,within:P}=__STORYBOOK_MODULE_TEST__,F={problemas:f,procedimientos:p,onAbrirProblema:e=>i.info(`Opens ${e.condicion} in Problem List.`),onAbrirProcedimiento:e=>i.info(`Opens ${e.codigo} in Procedures.`)},I={wide:880,overlay:790,narrow:320},L=Object.fromEntries(p.map(e=>[`${e.codigo} · ${e.nombre.slice(0,28)}`,e.id])),R=Object.fromEntries(f.map(e=>[`${e.condicion} (${e.estado})`,e.id])),z={title:`Components/Clinical/RecordDetail`,parameters:{layout:`padded`,docs:{description:{component:["El detalle que se despliega en cada fila de la tabla del Overview de Clinical Mode (**Problem List** y **Procedures**), con el mismo desplegable del Ledger: el chevron, clic en la fila, y *Expand all / Collapse all* desde que hay una abierta (`rowDetail` de Elements / Tables).",``,`**Qué muestra:** lo que cuelga del registro, en una **lista sin cards**: una fila debajo de la otra, el título a la izquierda y los datos a la derecha, cada dato en una línea. Un procedimiento: *Treatment* (el caso, su grupo, la visita con su turno, las otras visitas y los casos históricos), *Lab order*, *Referral*, *Findings / diagnoses* y *Procedure consent*. Un problema, en el mismo orden: *Treatment*, *Lab order*, *Referral* (con el procedimiento relacionado), *Procedures* y *Source exam*. Lo que no entra en el resumen se pliega detrás de "N more…".`,``,"**Reusa** lo que ya hay: el turno de la visita de Treatment Plan (`CitaVisita`), el estado de consentimiento de sus tablas, las pills de caso, de Lab Order y de la tabla, y el drawer para *View full record*. Cada link lleva a la pantalla donde se trabaja (Treatment Plan con el caso abierto, Lab Order, Referral, el examen) o abre el registro en la otra pestaña. Sólo lectura.",``,`**Probalo:** en *Playground* elegí un procedimiento o un problema y el ancho (la tabla del Overview, el flotante de un examen o un teléfono) desde *Controls*; abrí los "more" y tocá un link.`].join(`
`)}}},args:{tipo:`procedure`,procedure:`pr10`,problem:`p9`,ancho:`wide`},argTypes:{tipo:{name:`record`,control:`inline-radio`,options:[`procedure`,`problem`],description:`Qué pestaña de la tabla.`},procedure:{control:`select`,options:Object.values(L),labels:Object.fromEntries(Object.entries(L).map(([e,t])=>[t,e])),description:`El procedimiento de la fila.`,if:{arg:`tipo`,eq:`procedure`}},problem:{control:`select`,options:Object.values(R),labels:Object.fromEntries(Object.entries(R).map(([e,t])=>[t,e])),description:`El problema de la fila.`,if:{arg:`tipo`,eq:`problem`}},ancho:{name:`width`,control:`inline-radio`,options:Object.keys(I),description:`wide 880 (Overview) · overlay 790 (View Problem List de un examen) · narrow 320 (teléfono: el título de cada fila va arriba).`}}},B={render:e=>(0,M.jsx)(j,{...e})},V=p.find(e=>e.id===`pr10`),H=f.find(e=>e.id===`p9`),U={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,M.jsx)(r,{children:(0,M.jsxs)(l,{children:[(0,M.jsx)(u,{titulo:`The detail, procedure`,nota:`Título completo y pieza arriba; la lista; al pie View full record y Read-only summary.`,children:(0,M.jsx)(j,{tipo:`procedure`,procedure:`pr10`,problem:`p9`,ancho:`wide`})}),(0,M.jsx)(u,{titulo:`Rows of a procedure`,nota:`FilasProcedimiento, en el orden que pidió Julián: Treatment, Lab order, Referral, Findings / diagnoses y Procedure consent.`,children:(0,M.jsx)(`div`,{className:`@container flex w-[880px] max-w-full flex-col`,children:(0,M.jsx)(w,{r:V,c:F})})}),(0,M.jsx)(u,{titulo:`Rows of a problem`,nota:`FilasProblema, en el mismo orden: Treatment (sin visitas), Lab order y Referral con el procedimiento relacionado, Procedures y Source exam.`,children:(0,M.jsx)(`div`,{className:`@container flex w-[880px] max-w-full flex-col`,children:(0,M.jsx)(v,{r:H,c:F})})}),(0,M.jsx)(u,{titulo:`Pieces`,children:(0,M.jsxs)(`div`,{className:`@container flex w-[880px] max-w-full flex-col`,children:[(0,M.jsxs)(_,{titulo:`Row`,cuenta:2,children:[(0,M.jsx)(O,{estado:(0,M.jsx)(`span`,{className:`text-[11px] text-ink-muted`,children:`status`}),sub:`Context`,children:(0,M.jsx)(x,{onClick:()=>i.info(`Opens the record.`),children:`Link to the record`})}),(0,M.jsx)(O,{rotulo:`Label`,children:(0,M.jsx)(`span`,{className:`text-[12px] text-ink`,children:`Plain value`})})]}),(0,M.jsxs)(_,{titulo:`Folded`,children:[(0,M.jsx)(O,{children:(0,M.jsx)(`span`,{className:`text-[12px] text-ink`,children:`First item`})}),(0,M.jsxs)(re,{label:`2 more items`,children:[(0,M.jsx)(O,{children:(0,M.jsx)(`span`,{className:`text-[12px] text-ink`,children:`Second item`})}),(0,M.jsx)(O,{children:(0,M.jsx)(`span`,{className:`text-[12px] text-ink`,children:`Third item`})})]})]}),(0,M.jsx)(_,{titulo:`Nothing linked`,cuenta:0,children:(0,M.jsx)(A,{children:`Nothing linked.`})})]})}),(0,M.jsx)(u,{titulo:`What each part is`,children:(0,M.jsxs)(c,{encabezado:[`Part`,`What it does`,`Component`],minimo:720,arriba:!0,children:[(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Row`}),(0,M.jsx)(`td`,{children:`Una fila de la lista, sin card: título de 11px y la cuenta a la izquierda (arriba en angosto), los datos a la derecha. Una línea fina separa las filas.`}),(0,M.jsx)(`td`,{children:`FilaDetalle`})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Entry`}),(0,M.jsx)(`td`,{children:`Un dato en una línea: rótulo opcional (Finding, Diagnosis), link o texto, su estado y el contexto.`}),(0,M.jsx)(`td`,{children:`Entrada`})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Link`}),(0,M.jsx)(`td`,{children:`Lleva a donde vive el registro; la flecha dice que sale de la tabla.`}),(0,M.jsx)(`td`,{children:`EnlaceRegistro`})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`N more…`}),(0,M.jsx)(`td`,{children:`Lo que no entra en el resumen, plegado: visitas, casos históricos, hallazgos y diagnósticos.`}),(0,M.jsx)(`td`,{children:`MasItems`})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Nothing linked`}),(0,M.jsx)(`td`,{children:`La fila queda y dice qué falta: así se sabe que no hay, no que no cargó.`}),(0,M.jsx)(`td`,{children:`Vacio`})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Contents`}),(0,M.jsx)(`td`,{children:`Lo mismo en la fila y en el drawer: el drawer lo muestra todo, sin plegar.`}),(0,M.jsx)(`td`,{children:`ContenidoTratamiento, ContenidoOrdenes, ContenidoDerivaciones, ContenidoHallazgos, ContenidoConsentimiento, ContenidoProcedimientos, ContenidoExamen`})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Full record`}),(0,M.jsx)(`td`,{children:`Drawer de sólo lectura: los datos de la fila de a dos y una sección por fila de la lista. Close y Edit.`}),(0,M.jsx)(`td`,{children:`RegistroCompletoDrawer, SeccionesProcedimiento, SeccionesProblema`})]})]})})]})})},W=e=>p.find(t=>t.id===e),G=e=>f.find(t=>t.id===e),K={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,M.jsx)(r,{children:(0,M.jsxs)(l,{children:[(0,M.jsx)(u,{titulo:`Procedure, everything linked`,nota:`Caso aceptado: la visita del procedimiento con su turno (No appointment avisa, como en Treatment Plan), una visita más plegada, la derivación y el consentimiento firmado.`,children:(0,M.jsx)(j,{tipo:`procedure`,procedure:`pr10`,problem:`p9`,ancho:`wide`})}),(0,M.jsx)(u,{titulo:`Historical case and lab order`,nota:`El caso elegido de un grupo y la alternativa descartada, plegada en Historical case.`,children:(0,M.jsx)(j,{tipo:`procedure`,procedure:`pr4`,problem:`p9`,ancho:`wide`})}),(0,M.jsx)(u,{titulo:`Before the case is accepted`,nota:`Planning, Pending o Presented: la visita sin turno y el consentimiento todavía no existe (la misma regla que Treatment Plan).`,children:(0,M.jsx)(j,{tipo:`procedure`,procedure:`pr11`,problem:`p9`,ancho:`wide`})}),(0,M.jsx)(u,{titulo:`Empty`,nota:`Nada vinculado: cada fila queda y dice qué no hay (No treatment linked, No lab orders linked…).`,children:(0,M.jsx)(j,{tipo:`procedure`,procedure:`pr1`,problem:`p9`,ancho:`wide`})}),(0,M.jsx)(u,{titulo:`Problem with procedures`,nota:`El procedimiento que lo resuelve, su caso, y la derivación con el procedimiento relacionado.`,children:(0,M.jsx)(j,{tipo:`problem`,procedure:`pr10`,problem:`p9`,ancho:`wide`})}),(0,M.jsx)(u,{titulo:`Problem with its own referral`,nota:`Un problema derivado sin procedimiento: la derivación es del problema.`,children:(0,M.jsx)(j,{tipo:`problem`,procedure:`pr10`,problem:`p11`,ancho:`wide`})}),(0,M.jsx)(u,{titulo:`Overlay width`,nota:`790px, el flotante de View Problem List: la misma lista, con el título a la izquierda.`,children:(0,M.jsx)(j,{tipo:`procedure`,procedure:`pr6`,problem:`p9`,ancho:`overlay`})}),(0,M.jsx)(u,{titulo:`Narrow`,nota:`Teléfono: el título de cada fila va arriba de sus datos. En la tabla, el detalle queda en la parte visible aunque la tabla scrollee de costado.`,children:(0,M.jsx)(j,{tipo:`procedure`,procedure:`pr10`,problem:`p9`,ancho:`narrow`})})]})})},q={name:`More open`,args:{tipo:`procedure`,procedure:`pr10`,ancho:`wide`},render:e=>(0,M.jsx)(j,{...e}),play:async e=>{let t=P(e.canvasElement);await N.click(await t.findByRole(`button`,{name:/1 more visit/})),await o(/May 4, 2026/)(e),await o(/K08\.9/)(e)}},J={name:`Full record`,parameters:{controls:{disable:!0},docs:{story:{inline:!1,iframeHeight:720}}},render:()=>(0,M.jsx)(r,{children:(0,M.jsx)(y,{registro:{tipo:`procedimiento`,r:W(`pr10`)},contexto:F,onClose:()=>{}})})},Y={name:`Full record · problem`,parameters:{controls:{disable:!0},docs:{story:{inline:!1,iframeHeight:720}}},render:()=>(0,M.jsx)(r,{children:(0,M.jsx)(y,{registro:{tipo:`problema`,r:G(`p5`)},contexto:F,onClose:()=>{}})})},X={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,M.jsx)(r,{children:(0,M.jsxs)(l,{children:[(0,M.jsx)(u,{titulo:`Drawer sections`,children:(0,M.jsxs)(`div`,{className:`grid w-[880px] max-w-full gap-8 md:grid-cols-2`,children:[(0,M.jsx)(`div`,{className:`flex flex-col gap-6`,children:(0,M.jsx)(k,{r:W(`pr4`),c:F})}),(0,M.jsx)(`div`,{className:`flex flex-col gap-6`,children:(0,M.jsx)(te,{r:G(`p1`),c:F})})]})}),(0,M.jsx)(u,{titulo:`Contents`,children:(0,M.jsxs)(`div`,{className:`grid w-[880px] max-w-full gap-6 md:grid-cols-3 [&>div]:flex [&>div]:flex-col [&>div]:gap-2`,children:[(0,M.jsx)(`div`,{children:(0,M.jsx)(E,{t:void 0})}),(0,M.jsxs)(`div`,{children:[(0,M.jsx)(ne,{ordenes:[]}),(0,M.jsx)(S,{derivaciones:[]})]}),(0,M.jsx)(`div`,{children:(0,M.jsx)(b,{hallazgos:[G(`p5`)],onAbrir:F.onAbrirProblema,completo:!0})}),(0,M.jsx)(`div`,{children:(0,M.jsx)(C,{procedimientos:[W(`pr6`)],onAbrir:F.onAbrirProcedimiento})}),(0,M.jsx)(`div`,{children:(0,M.jsx)(D,{t:void 0})}),(0,M.jsx)(`div`,{children:(0,M.jsx)(T,{problema:G(`p7`)})})]})})]})})},Z={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,M.jsxs)(l,{children:[(0,M.jsx)(u,{titulo:`Layout`,children:(0,M.jsxs)(c,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`List`}),(0,M.jsx)(`td`,{children:`Sin cards: una fila debajo de la otra, separadas por una línea de 1px. Padding vertical de 8px por fila.`})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Row title`}),(0,M.jsx)(`td`,{children:`Columna de 150px a la izquierda desde 448px de detalle; abajo de eso, arriba de los datos (container query: depende del ancho de la tabla, no de la pantalla).`})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Entry`}),(0,M.jsx)(`td`,{children:`Una línea de 24px como mínimo (el alto del botón de turno); si no entra, sigue en la siguiente.`})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Gap`}),(0,M.jsx)(`td`,{children:`12px entre el título del registro, la lista y el pie.`})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`In the table`}),(0,M.jsxs)(`td`,{children:[`Debajo de la fila, con la sangría del chevron (44px) y fondo `,(0,M.jsx)(`code`,{children:`surface-subtle`}),`. Si la tabla scrollea de costado, el detalle queda fijo en la parte visible.`]})]})]})}),(0,M.jsx)(u,{titulo:`Type and color`,children:(0,M.jsxs)(c,{encabezado:[`Item`,`Size`,`Color`],minimo:560,children:[(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Record title`}),(0,M.jsx)(`td`,{children:`13px Semibold`}),(0,M.jsx)(`td`,{children:(0,M.jsx)(d,{nombre:`ink`})})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Row title`}),(0,M.jsx)(`td`,{children:`11px Semibold`}),(0,M.jsx)(`td`,{children:(0,M.jsx)(d,{nombre:`ink-muted`})})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Link`}),(0,M.jsx)(`td`,{children:`12px Medium, flecha 12px`}),(0,M.jsx)(`td`,{children:(0,M.jsx)(d,{nombre:`dash-blue`})})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Context line`}),(0,M.jsx)(`td`,{children:`11px`}),(0,M.jsx)(`td`,{children:(0,M.jsx)(d,{nombre:`ink-muted`})})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Nothing linked`}),(0,M.jsx)(`td`,{children:`12px`}),(0,M.jsx)(`td`,{children:(0,M.jsx)(d,{nombre:`ink-faint`})})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Divider between rows`}),(0,M.jsx)(`td`,{children:`1px`}),(0,M.jsx)(`td`,{children:(0,M.jsx)(d,{nombre:`line-soft`})})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Count`}),(0,M.jsx)(`td`,{children:`Count (Elements)`}),(0,M.jsx)(`td`,{children:(0,M.jsx)(d,{nombre:`dash-count-bg`})})]})]})}),(0,M.jsx)(u,{titulo:`Rules`,children:(0,M.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,M.jsx)(`li`,{children:`Read-only: changing a status stays in the row menu. Edit in the full record says it is not in this release.`}),(0,M.jsx)(`li`,{children:`A list, not cards: the detail should not take more room than the data it shows.`}),(0,M.jsx)(`li`,{children:`Every row stays even when it is empty, so the detail always has the same shape and order.`}),(0,M.jsx)(`li`,{children:`Show the first items in the summary (the visit of the procedure, the finding and its diagnosis); the rest goes behind “N more…”. The full record shows everything.`}),(0,M.jsx)(`li`,{children:`Statuses use the pills of their own screen: cases as in Treatment Plan, lab orders as in Lab Order, consent as in the visit table.`}),(0,M.jsx)(`li`,{children:`No appointment and no consent before the case is accepted (Planning, Pending, Presented), as in Treatment Plan.`})]})})]})},Q=[`Playground`,`Parts`,`States`,`MoreOpen`,`FullRecord`,`FullRecordProblem`,`Contents`,`Specs`],B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: args => <EnFila {...args} />
}`,...B.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
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
        <Bloque titulo="Rows of a procedure" nota="FilasProcedimiento, en el orden que pidió Julián: Treatment, Lab order, Referral, Findings / diagnoses y Procedure consent.">
          <div className="@container flex w-[880px] max-w-full flex-col"><FilasProcedimiento r={r10} c={CONTEXTO} /></div>
        </Bloque>
        <Bloque titulo="Rows of a problem" nota="FilasProblema, en el mismo orden: Treatment (sin visitas), Lab order y Referral con el procedimiento relacionado, Procedures y Source exam.">
          <div className="@container flex w-[880px] max-w-full flex-col"><FilasProblema r={p9} c={CONTEXTO} /></div>
        </Bloque>
        <Bloque titulo="Pieces">
          <div className="@container flex w-[880px] max-w-full flex-col">
            <FilaDetalle titulo="Row" cuenta={2}>
              <Entrada estado={<span className="text-[11px] text-ink-muted">status</span>} sub="Context">
                <EnlaceRegistro onClick={() => aviso.info('Opens the record.')}>Link to the record</EnlaceRegistro>
              </Entrada>
              <Entrada rotulo="Label"><span className="text-[12px] text-ink">Plain value</span></Entrada>
            </FilaDetalle>
            <FilaDetalle titulo="Folded">
              <Entrada><span className="text-[12px] text-ink">First item</span></Entrada>
              <MasItems label="2 more items"><Entrada><span className="text-[12px] text-ink">Second item</span></Entrada><Entrada><span className="text-[12px] text-ink">Third item</span></Entrada></MasItems>
            </FilaDetalle>
            <FilaDetalle titulo="Nothing linked" cuenta={0}><Vacio>Nothing linked.</Vacio></FilaDetalle>
          </div>
        </Bloque>
        <Bloque titulo="What each part is">
          <Tabla encabezado={['Part', 'What it does', 'Component']} minimo={720} arriba>
            <tr><td className="font-semibold">Row</td><td>Una fila de la lista, sin card: título de 11px y la cuenta a la izquierda (arriba en angosto), los datos a la derecha. Una línea fina separa las filas.</td><td>FilaDetalle</td></tr>
            <tr><td className="font-semibold">Entry</td><td>Un dato en una línea: rótulo opcional (Finding, Diagnosis), link o texto, su estado y el contexto.</td><td>Entrada</td></tr>
            <tr><td className="font-semibold">Link</td><td>Lleva a donde vive el registro; la flecha dice que sale de la tabla.</td><td>EnlaceRegistro</td></tr>
            <tr><td className="font-semibold">N more…</td><td>Lo que no entra en el resumen, plegado: visitas, casos históricos, hallazgos y diagnósticos.</td><td>MasItems</td></tr>
            <tr><td className="font-semibold">Nothing linked</td><td>La fila queda y dice qué falta: así se sabe que no hay, no que no cargó.</td><td>Vacio</td></tr>
            <tr><td className="font-semibold">Contents</td><td>Lo mismo en la fila y en el drawer: el drawer lo muestra todo, sin plegar.</td><td>ContenidoTratamiento, ContenidoOrdenes, ContenidoDerivaciones, ContenidoHallazgos, ContenidoConsentimiento, ContenidoProcedimientos, ContenidoExamen</td></tr>
            <tr><td className="font-semibold">Full record</td><td>Drawer de sólo lectura: los datos de la fila de a dos y una sección por fila de la lista. Close y Edit.</td><td>RegistroCompletoDrawer, SeccionesProcedimiento, SeccionesProblema</td></tr>
          </Tabla>
        </Bloque>
      </Lienzo>
    </TooltipProvider>
}`,...U.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
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
        <Bloque titulo="Empty" nota="Nada vinculado: cada fila queda y dice qué no hay (No treatment linked, No lab orders linked…).">
          <EnFila tipo="procedure" procedure="pr1" problem="p9" ancho="wide" />
        </Bloque>
        <Bloque titulo="Problem with procedures" nota="El procedimiento que lo resuelve, su caso, y la derivación con el procedimiento relacionado.">
          <EnFila tipo="problem" procedure="pr10" problem="p9" ancho="wide" />
        </Bloque>
        <Bloque titulo="Problem with its own referral" nota="Un problema derivado sin procedimiento: la derivación es del problema.">
          <EnFila tipo="problem" procedure="pr10" problem="p11" ancho="wide" />
        </Bloque>
        <Bloque titulo="Overlay width" nota="790px, el flotante de View Problem List: la misma lista, con el título a la izquierda.">
          <EnFila tipo="procedure" procedure="pr6" problem="p9" ancho="overlay" />
        </Bloque>
        <Bloque titulo="Narrow" nota="Teléfono: el título de cada fila va arriba de sus datos. En la tabla, el detalle queda en la parte visible aunque la tabla scrollee de costado.">
          <EnFila tipo="procedure" procedure="pr10" problem="p9" ancho="narrow" />
        </Bloque>
      </Lienzo>
    </TooltipProvider>
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
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
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
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
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
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
            <div><ContenidoExamen problema={probDe('p7')} /></div>
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
        </ul>
      </Bloque>
    </Lienzo>
}`,...Z.parameters?.docs?.source}}}})))()}$();export{X as Contents,J as FullRecord,Y as FullRecordProblem,q as MoreOpen,U as Parts,B as Playground,Z as Specs,K as States,Q as __namedExportsOrder,z as default};