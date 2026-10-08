import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,r}from"./tooltip-6ep9-x7U.js";import{n as i,r as a}from"./toaster-B6mRBNx3.js";import{n as o,r as s}from"./play-CDw6varG.js";import{c,i as l,l as u,s as d,t as f}from"./kit-VhBMbBcY.js";import{d as p,f as m,x as h}from"./clinical-mode-B1jDrqqr.js";import{C as g,S as ee,_ as te,a as ne,c as _,d as v,f as y,g as b,i as x,l as S,m as C,n as re,o as ie,p as w,r as T,s as E,t as D,u as O,v as k,y as A}from"./RecordDetail-Xmal2Xof.js";function j({tipo:e,procedure:t,problem:n,ancho:i}){let a=e===`procedure`?{tipo:`procedimiento`,r:m.find(e=>e.id===t)??m[0]}:{tipo:`problema`,r:p.find(e=>e.id===n)??p[0]};return(0,M.jsx)(r,{children:(0,M.jsx)(`div`,{className:`rounded-lg border border-line-row bg-surface-subtle px-4 py-3 pl-11 text-[13px] text-ink-soft`,style:{width:I[i]},children:(0,M.jsx)(v,{registro:a,contexto:F},a.r.id)})})}var M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{a(),n(),u(),s(),h(),g(),M=t(),{userEvent:N,within:P}=__STORYBOOK_MODULE_TEST__,F={problemas:p,procedimientos:m,onAbrirProblema:e=>i.info(`Opens ${e.condicion} in Problem List.`),onAbrirProcedimiento:e=>i.info(`Opens ${e.codigo} in Procedures.`)},I={wide:880,overlay:790,narrow:320},L=Object.fromEntries(m.map(e=>[`${e.codigo} · ${e.nombre.slice(0,28)}`,e.id])),R=Object.fromEntries(p.map(e=>[`${e.condicion} (${e.estado})`,e.id])),z={title:`Components/Clinical/RecordDetail`,parameters:{layout:`padded`,docs:{description:{component:["El detalle que se despliega en cada fila de la tabla del Overview de Clinical Mode (**Problem List** y **Procedures**), con el mismo desplegable del Ledger: el chevron, clic en la fila, y *Expand all / Collapse all* desde que hay una abierta (`rowDetail` de Elements / Tables).",``,`**Qué muestra:** lo que cuelga del registro, en bloques chicos (card adentro de un panel). Un procedimiento: *Treatment* (estado del grupo, el caso, la visita con su turno, las otras visitas y los casos históricos), *Lab order* y *Referral*, *Findings / diagnoses* y *Procedure consent*. Un problema: *Procedures*, *Treatment*, *Lab order* y *Referral* (con el procedimiento relacionado) y *Source exam*. Lo que no entra en el resumen se pliega detrás de "N more…".`,``,"**Reusa** lo que ya hay: el turno de la visita de Treatment Plan (`CitaVisita`), el estado de consentimiento de sus tablas, las pills de caso, de Lab Order y de la tabla, y el drawer para *View full record*. Cada link lleva a la pantalla donde se trabaja (Treatment Plan con el caso abierto, Lab Order, Referral, el examen) o abre el registro en la otra pestaña. Sólo lectura.",``,`**Probalo:** en *Playground* elegí un procedimiento o un problema y el ancho (la tabla del Overview, el flotante de un examen o un teléfono) desde *Controls*; abrí los "more" y tocá un link.`].join(`
`)}}},args:{tipo:`procedure`,procedure:`pr10`,problem:`p9`,ancho:`wide`},argTypes:{tipo:{name:`record`,control:`inline-radio`,options:[`procedure`,`problem`],description:`Qué pestaña de la tabla.`},procedure:{control:`select`,options:Object.values(L),labels:Object.fromEntries(Object.entries(L).map(([e,t])=>[t,e])),description:`El procedimiento de la fila.`,if:{arg:`tipo`,eq:`procedure`}},problem:{control:`select`,options:Object.values(R),labels:Object.fromEntries(Object.entries(R).map(([e,t])=>[t,e])),description:`El problema de la fila.`,if:{arg:`tipo`,eq:`problem`}},ancho:{name:`width`,control:`inline-radio`,options:Object.keys(I),description:`wide 880 (Overview, 3 columnas) · overlay 790 (View Problem List de un examen, 3) · narrow 320 (teléfono, 1).`}}},B={render:e=>(0,M.jsx)(j,{...e})},V=m.find(e=>e.id===`pr10`),H=p.find(e=>e.id===`p9`),U={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,M.jsx)(r,{children:(0,M.jsxs)(l,{children:[(0,M.jsx)(f,{titulo:`The detail, procedure`,nota:`Título completo y pieza arriba; los bloques; al pie View full record y Read-only summary.`,children:(0,M.jsx)(j,{tipo:`procedure`,procedure:`pr10`,problem:`p9`,ancho:`wide`})}),(0,M.jsx)(f,{titulo:`Blocks of a procedure`,nota:`BloquesProcedimiento: Treatment, Lab order + Referral, Findings / diagnoses y el consentimiento a lo ancho.`,children:(0,M.jsx)(`div`,{className:`@container w-[880px] max-w-full`,children:(0,M.jsx)(`div`,{className:`grid gap-2.5 @md:grid-cols-2 @2xl:grid-cols-3`,children:(0,M.jsx)(T,{r:V,c:F})})})}),(0,M.jsx)(f,{titulo:`Blocks of a problem`,nota:`BloquesProblema: Procedures, Treatment (sin visitas), Lab order + Referral con el procedimiento relacionado y Source exam a lo ancho.`,children:(0,M.jsx)(`div`,{className:`@container w-[880px] max-w-full`,children:(0,M.jsx)(`div`,{className:`grid gap-2.5 @md:grid-cols-2 @2xl:grid-cols-3`,children:(0,M.jsx)(re,{r:H,c:F})})})}),(0,M.jsx)(f,{titulo:`Pieces`,children:(0,M.jsxs)(`div`,{className:`grid w-[880px] max-w-full gap-3 md:grid-cols-3`,children:[(0,M.jsxs)(D,{titulo:`Block`,cuenta:2,children:[(0,M.jsx)(w,{estado:(0,M.jsx)(`span`,{className:`text-[11px] text-ink-muted`,children:`status`}),sub:`Context line`,children:(0,M.jsx)(y,{onClick:()=>i.info(`Opens the record.`),children:`Link to the record`})}),(0,M.jsx)(w,{rotulo:`Label`,children:(0,M.jsx)(`span`,{className:`text-[12px] text-ink`,children:`Plain value`})}),(0,M.jsx)(A,{titulo:`Second list`,cuenta:0}),(0,M.jsx)(ee,{children:`Nothing linked.`})]}),(0,M.jsxs)(D,{titulo:`Folded`,children:[(0,M.jsx)(`span`,{className:`text-[12px] text-ink`,children:`First item`}),(0,M.jsxs)(C,{label:`2 more items`,children:[(0,M.jsx)(`p`,{className:`text-[12px] text-ink`,children:`Second item`}),(0,M.jsx)(`p`,{className:`text-[12px] text-ink`,children:`Third item`})]})]}),(0,M.jsx)(`div`,{className:`@container md:col-span-3`,children:(0,M.jsx)(`div`,{className:`grid @md:grid-cols-2 @2xl:grid-cols-3`,children:(0,M.jsx)(D,{titulo:`Wide block`,ancho:!0,children:(0,M.jsx)(`span`,{className:`text-[12px] text-ink`,children:`One value across the row`})})})})]})}),(0,M.jsx)(f,{titulo:`What each part is`,children:(0,M.jsxs)(d,{encabezado:[`Part`,`What it does`,`Component`],minimo:720,arriba:!0,children:[(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Block`}),(0,M.jsx)(`td`,{children:`Card adentro del detalle (InnerCard): título de 11px y la cuenta de lo que lista.`}),(0,M.jsx)(`td`,{children:`BloqueDetalle`})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Wide block`}),(0,M.jsx)(`td`,{children:`Un solo dato: ocupa la fila con el título al costado (consentimiento, examen de origen).`}),(0,M.jsx)(`td`,{children:`BloqueDetalle ancho`})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Entry`}),(0,M.jsx)(`td`,{children:`Link o texto, el estado a la derecha y una línea de contexto. Rótulo opcional (Finding, Diagnosis).`}),(0,M.jsx)(`td`,{children:`Entrada`})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Link`}),(0,M.jsx)(`td`,{children:`Lleva a donde vive el registro; la flecha dice que sale de la tabla.`}),(0,M.jsx)(`td`,{children:`EnlaceRegistro`})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`N more…`}),(0,M.jsx)(`td`,{children:`Lo que no entra en el resumen, plegado: visitas, casos históricos, hallazgos y diagnósticos.`}),(0,M.jsx)(`td`,{children:`MasItems`})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Second list`}),(0,M.jsx)(`td`,{children:`Referral dentro del bloque de Lab order.`}),(0,M.jsx)(`td`,{children:`SubtituloBloque`})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Nothing linked`}),(0,M.jsx)(`td`,{children:`El bloque queda y dice qué falta: así se sabe que no hay, no que no cargó.`}),(0,M.jsx)(`td`,{children:`Vacio`})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Contents`}),(0,M.jsx)(`td`,{children:`Lo mismo en el bloque y en el drawer: el drawer lo muestra todo, sin plegar.`}),(0,M.jsx)(`td`,{children:`ContenidoTratamiento, ContenidoOrdenes, ContenidoDerivaciones, ContenidoHallazgos, ContenidoConsentimiento, ContenidoProcedimientos, ContenidoExamen`})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Full record`}),(0,M.jsx)(`td`,{children:`Drawer de sólo lectura: los datos de la fila de a dos y una sección por bloque. Close y Edit.`}),(0,M.jsx)(`td`,{children:`RegistroCompletoDrawer, SeccionesProcedimiento, SeccionesProblema`})]})]})})]})})},W=e=>m.find(t=>t.id===e),G=e=>p.find(t=>t.id===e),K={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,M.jsx)(r,{children:(0,M.jsxs)(l,{children:[(0,M.jsx)(f,{titulo:`Procedure, everything linked`,nota:`Caso aceptado: la visita del procedimiento con su turno (No appointment avisa, como en Treatment Plan), una visita más plegada, la derivación y el consentimiento firmado.`,children:(0,M.jsx)(j,{tipo:`procedure`,procedure:`pr10`,problem:`p9`,ancho:`wide`})}),(0,M.jsx)(f,{titulo:`Historical case and lab order`,nota:`El caso elegido de un grupo y la alternativa descartada, plegada en Historical case.`,children:(0,M.jsx)(j,{tipo:`procedure`,procedure:`pr4`,problem:`p9`,ancho:`wide`})}),(0,M.jsx)(f,{titulo:`Before the case is accepted`,nota:`Planning, Pending o Presented: la visita sin turno y el consentimiento todavía no existe (la misma regla que Treatment Plan).`,children:(0,M.jsx)(j,{tipo:`procedure`,procedure:`pr11`,problem:`p9`,ancho:`wide`})}),(0,M.jsx)(f,{titulo:`Empty`,nota:`Nada vinculado: cada bloque queda y dice qué no hay (No treatment linked, No lab orders linked…).`,children:(0,M.jsx)(j,{tipo:`procedure`,procedure:`pr1`,problem:`p9`,ancho:`wide`})}),(0,M.jsx)(f,{titulo:`Problem with procedures`,nota:`El procedimiento que lo resuelve, su caso, y la derivación con el procedimiento relacionado.`,children:(0,M.jsx)(j,{tipo:`problem`,procedure:`pr10`,problem:`p9`,ancho:`wide`})}),(0,M.jsx)(f,{titulo:`Problem with its own referral`,nota:`Un problema derivado sin procedimiento: la derivación es del problema.`,children:(0,M.jsx)(j,{tipo:`problem`,procedure:`pr10`,problem:`p11`,ancho:`wide`})}),(0,M.jsx)(f,{titulo:`Overlay width`,nota:`790px, el flotante de View Problem List: siguen las tres columnas.`,children:(0,M.jsx)(j,{tipo:`procedure`,procedure:`pr6`,problem:`p9`,ancho:`overlay`})}),(0,M.jsx)(f,{titulo:`Narrow`,nota:`Teléfono: una columna. En la tabla, el detalle queda en la parte visible aunque la tabla scrollee de costado.`,children:(0,M.jsx)(j,{tipo:`procedure`,procedure:`pr10`,problem:`p9`,ancho:`narrow`})})]})})},q={name:`More open`,args:{tipo:`procedure`,procedure:`pr10`,ancho:`wide`},render:e=>(0,M.jsx)(j,{...e}),play:async e=>{let t=P(e.canvasElement);await N.click(await t.findByRole(`button`,{name:/1 more visit/})),await N.click(await t.findByRole(`button`,{name:/more finding/})),await o(/May 4, 2026/)(e),await o(/K08\.9/)(e)}},J={name:`Full record`,parameters:{controls:{disable:!0},docs:{story:{inline:!1,iframeHeight:720}}},render:()=>(0,M.jsx)(r,{children:(0,M.jsx)(b,{registro:{tipo:`procedimiento`,r:W(`pr10`)},contexto:F,onClose:()=>{}})})},Y={name:`Full record · problem`,parameters:{controls:{disable:!0},docs:{story:{inline:!1,iframeHeight:720}}},render:()=>(0,M.jsx)(r,{children:(0,M.jsx)(b,{registro:{tipo:`problema`,r:G(`p5`)},contexto:F,onClose:()=>{}})})},X={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,M.jsx)(r,{children:(0,M.jsxs)(l,{children:[(0,M.jsx)(f,{titulo:`Drawer sections`,children:(0,M.jsxs)(`div`,{className:`grid w-[880px] max-w-full gap-8 md:grid-cols-2`,children:[(0,M.jsx)(`div`,{className:`flex flex-col gap-6`,children:(0,M.jsx)(k,{r:W(`pr4`),c:F})}),(0,M.jsx)(`div`,{className:`flex flex-col gap-6`,children:(0,M.jsx)(te,{r:G(`p1`),c:F})})]})}),(0,M.jsx)(f,{titulo:`Contents`,children:(0,M.jsxs)(`div`,{className:`grid w-[880px] max-w-full gap-6 md:grid-cols-3 [&>div]:flex [&>div]:flex-col [&>div]:gap-2`,children:[(0,M.jsx)(`div`,{children:(0,M.jsx)(O,{t:void 0})}),(0,M.jsxs)(`div`,{children:[(0,M.jsx)(_,{ordenes:[]}),(0,M.jsx)(ne,{derivaciones:[]})]}),(0,M.jsx)(`div`,{children:(0,M.jsx)(E,{hallazgos:[G(`p5`)],onAbrir:F.onAbrirProblema,completo:!0})}),(0,M.jsx)(`div`,{children:(0,M.jsx)(S,{procedimientos:[W(`pr6`)],onAbrir:F.onAbrirProcedimiento})}),(0,M.jsx)(`div`,{children:(0,M.jsx)(x,{t:void 0})}),(0,M.jsx)(`div`,{children:(0,M.jsx)(ie,{problema:G(`p7`)})})]})})]})})},Z={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,M.jsxs)(l,{children:[(0,M.jsx)(f,{titulo:`Layout`,children:(0,M.jsxs)(d,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Columns`}),(0,M.jsx)(`td`,{children:`3 desde 672px de detalle · 2 desde 448 · 1 abajo (container query: depende del ancho de la tabla, no de la pantalla).`})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Gap`}),(0,M.jsx)(`td`,{children:`10px entre bloques · 12px entre el título, los bloques y el pie.`})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Block`}),(0,M.jsxs)(`td`,{children:[`Padding 12px, radio 8px, sombra `,(0,M.jsx)(`code`,{children:`shadow-inner-card`}),` (card adentro de un panel, sin borde real).`]})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Wide block`}),(0,M.jsx)(`td`,{children:`Toda la fila; título de 120px al costado y el contenido baja abajo si no le quedan 220px.`})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`In the table`}),(0,M.jsxs)(`td`,{children:[`Debajo de la fila, con la sangría del chevron (44px) y fondo `,(0,M.jsx)(`code`,{children:`surface-subtle`}),`. Si la tabla scrollea de costado, el detalle queda fijo en la parte visible.`]})]})]})}),(0,M.jsx)(f,{titulo:`Type and color`,children:(0,M.jsxs)(d,{encabezado:[`Item`,`Size`,`Color`],minimo:560,children:[(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Record title`}),(0,M.jsx)(`td`,{children:`13px Semibold`}),(0,M.jsx)(`td`,{children:(0,M.jsx)(c,{nombre:`ink`})})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Block title`}),(0,M.jsx)(`td`,{children:`11px Semibold`}),(0,M.jsx)(`td`,{children:(0,M.jsx)(c,{nombre:`ink-muted`})})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Link`}),(0,M.jsx)(`td`,{children:`12px Medium, flecha 12px`}),(0,M.jsx)(`td`,{children:(0,M.jsx)(c,{nombre:`dash-blue`})})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Context line`}),(0,M.jsx)(`td`,{children:`11px`}),(0,M.jsx)(`td`,{children:(0,M.jsx)(c,{nombre:`ink-muted`})})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Nothing linked`}),(0,M.jsx)(`td`,{children:`12px`}),(0,M.jsx)(`td`,{children:(0,M.jsx)(c,{nombre:`ink-faint`})})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Divider between entries`}),(0,M.jsx)(`td`,{children:`1px`}),(0,M.jsx)(`td`,{children:(0,M.jsx)(c,{nombre:`line-soft`})})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`td`,{className:`font-semibold`,children:`Count`}),(0,M.jsx)(`td`,{children:`Count (Elements)`}),(0,M.jsx)(`td`,{children:(0,M.jsx)(c,{nombre:`dash-count-bg`})})]})]})}),(0,M.jsx)(f,{titulo:`Rules`,children:(0,M.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,M.jsx)(`li`,{children:`Read-only: changing a status stays in the row menu. Edit in the full record says it is not in this release.`}),(0,M.jsx)(`li`,{children:`Every block stays even when it is empty, so the detail always has the same shape.`}),(0,M.jsx)(`li`,{children:`Show one item per list in the summary; the rest goes behind “N more…”. The full record shows everything.`}),(0,M.jsx)(`li`,{children:`Statuses use the pills of their own screen: cases as in Treatment Plan, lab orders as in Lab Order, consent as in the visit table.`}),(0,M.jsx)(`li`,{children:`No appointment and no consent before the case is accepted (Planning, Pending, Presented), as in Treatment Plan.`})]})})]})},Q=[`Playground`,`Parts`,`States`,`MoreOpen`,`FullRecord`,`FullRecordProblem`,`Contents`,`Specs`],B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
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
        <Bloque titulo="The detail, procedure" nota="Título completo y pieza arriba; los bloques; al pie View full record y Read-only summary.">
          <EnFila tipo="procedure" procedure="pr10" problem="p9" ancho="wide" />
        </Bloque>
        <Bloque titulo="Blocks of a procedure" nota="BloquesProcedimiento: Treatment, Lab order + Referral, Findings / diagnoses y el consentimiento a lo ancho.">
          <div className="@container w-[880px] max-w-full"><div className="grid gap-2.5 @md:grid-cols-2 @2xl:grid-cols-3"><BloquesProcedimiento r={r10} c={CONTEXTO} /></div></div>
        </Bloque>
        <Bloque titulo="Blocks of a problem" nota="BloquesProblema: Procedures, Treatment (sin visitas), Lab order + Referral con el procedimiento relacionado y Source exam a lo ancho.">
          <div className="@container w-[880px] max-w-full"><div className="grid gap-2.5 @md:grid-cols-2 @2xl:grid-cols-3"><BloquesProblema r={p9} c={CONTEXTO} /></div></div>
        </Bloque>
        <Bloque titulo="Pieces">
          <div className="grid w-[880px] max-w-full gap-3 md:grid-cols-3">
            <BloqueDetalle titulo="Block" cuenta={2}>
              <Entrada estado={<span className="text-[11px] text-ink-muted">status</span>} sub="Context line">
                <EnlaceRegistro onClick={() => aviso.info('Opens the record.')}>Link to the record</EnlaceRegistro>
              </Entrada>
              <Entrada rotulo="Label"><span className="text-[12px] text-ink">Plain value</span></Entrada>
              <SubtituloBloque titulo="Second list" cuenta={0} />
              <Vacio>Nothing linked.</Vacio>
            </BloqueDetalle>
            <BloqueDetalle titulo="Folded">
              <span className="text-[12px] text-ink">First item</span>
              <MasItems label="2 more items"><p className="text-[12px] text-ink">Second item</p><p className="text-[12px] text-ink">Third item</p></MasItems>
            </BloqueDetalle>
            <div className="@container md:col-span-3"><div className="grid @md:grid-cols-2 @2xl:grid-cols-3">
              <BloqueDetalle titulo="Wide block" ancho><span className="text-[12px] text-ink">One value across the row</span></BloqueDetalle>
            </div></div>
          </div>
        </Bloque>
        <Bloque titulo="What each part is">
          <Tabla encabezado={['Part', 'What it does', 'Component']} minimo={720} arriba>
            <tr><td className="font-semibold">Block</td><td>Card adentro del detalle (InnerCard): título de 11px y la cuenta de lo que lista.</td><td>BloqueDetalle</td></tr>
            <tr><td className="font-semibold">Wide block</td><td>Un solo dato: ocupa la fila con el título al costado (consentimiento, examen de origen).</td><td>BloqueDetalle ancho</td></tr>
            <tr><td className="font-semibold">Entry</td><td>Link o texto, el estado a la derecha y una línea de contexto. Rótulo opcional (Finding, Diagnosis).</td><td>Entrada</td></tr>
            <tr><td className="font-semibold">Link</td><td>Lleva a donde vive el registro; la flecha dice que sale de la tabla.</td><td>EnlaceRegistro</td></tr>
            <tr><td className="font-semibold">N more…</td><td>Lo que no entra en el resumen, plegado: visitas, casos históricos, hallazgos y diagnósticos.</td><td>MasItems</td></tr>
            <tr><td className="font-semibold">Second list</td><td>Referral dentro del bloque de Lab order.</td><td>SubtituloBloque</td></tr>
            <tr><td className="font-semibold">Nothing linked</td><td>El bloque queda y dice qué falta: así se sabe que no hay, no que no cargó.</td><td>Vacio</td></tr>
            <tr><td className="font-semibold">Contents</td><td>Lo mismo en el bloque y en el drawer: el drawer lo muestra todo, sin plegar.</td><td>ContenidoTratamiento, ContenidoOrdenes, ContenidoDerivaciones, ContenidoHallazgos, ContenidoConsentimiento, ContenidoProcedimientos, ContenidoExamen</td></tr>
            <tr><td className="font-semibold">Full record</td><td>Drawer de sólo lectura: los datos de la fila de a dos y una sección por bloque. Close y Edit.</td><td>RegistroCompletoDrawer, SeccionesProcedimiento, SeccionesProblema</td></tr>
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
        <Bloque titulo="Empty" nota="Nada vinculado: cada bloque queda y dice qué no hay (No treatment linked, No lab orders linked…).">
          <EnFila tipo="procedure" procedure="pr1" problem="p9" ancho="wide" />
        </Bloque>
        <Bloque titulo="Problem with procedures" nota="El procedimiento que lo resuelve, su caso, y la derivación con el procedimiento relacionado.">
          <EnFila tipo="problem" procedure="pr10" problem="p9" ancho="wide" />
        </Bloque>
        <Bloque titulo="Problem with its own referral" nota="Un problema derivado sin procedimiento: la derivación es del problema.">
          <EnFila tipo="problem" procedure="pr10" problem="p11" ancho="wide" />
        </Bloque>
        <Bloque titulo="Overlay width" nota="790px, el flotante de View Problem List: siguen las tres columnas.">
          <EnFila tipo="procedure" procedure="pr6" problem="p9" ancho="overlay" />
        </Bloque>
        <Bloque titulo="Narrow" nota="Teléfono: una columna. En la tabla, el detalle queda en la parte visible aunque la tabla scrollee de costado.">
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
    await userEvent.click(await canvas.findByRole('button', {
      name: /more finding/
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
          <tr><td className="font-semibold">Columns</td><td>3 desde 672px de detalle · 2 desde 448 · 1 abajo (container query: depende del ancho de la tabla, no de la pantalla).</td></tr>
          <tr><td className="font-semibold">Gap</td><td>10px entre bloques · 12px entre el título, los bloques y el pie.</td></tr>
          <tr><td className="font-semibold">Block</td><td>Padding 12px, radio 8px, sombra <code>shadow-inner-card</code> (card adentro de un panel, sin borde real).</td></tr>
          <tr><td className="font-semibold">Wide block</td><td>Toda la fila; título de 120px al costado y el contenido baja abajo si no le quedan 220px.</td></tr>
          <tr><td className="font-semibold">In the table</td><td>Debajo de la fila, con la sangría del chevron (44px) y fondo <code>surface-subtle</code>. Si la tabla scrollea de costado, el detalle queda fijo en la parte visible.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Type and color">
        <Tabla encabezado={['Item', 'Size', 'Color']} minimo={560}>
          <tr><td className="font-semibold">Record title</td><td>13px Semibold</td><td><Token nombre="ink" /></td></tr>
          <tr><td className="font-semibold">Block title</td><td>11px Semibold</td><td><Token nombre="ink-muted" /></td></tr>
          <tr><td className="font-semibold">Link</td><td>12px Medium, flecha 12px</td><td><Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Context line</td><td>11px</td><td><Token nombre="ink-muted" /></td></tr>
          <tr><td className="font-semibold">Nothing linked</td><td>12px</td><td><Token nombre="ink-faint" /></td></tr>
          <tr><td className="font-semibold">Divider between entries</td><td>1px</td><td><Token nombre="line-soft" /></td></tr>
          <tr><td className="font-semibold">Count</td><td>Count (Elements)</td><td><Token nombre="dash-count-bg" /></td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>Read-only: changing a status stays in the row menu. Edit in the full record says it is not in this release.</li>
          <li>Every block stays even when it is empty, so the detail always has the same shape.</li>
          <li>Show one item per list in the summary; the rest goes behind “N more…”. The full record shows everything.</li>
          <li>Statuses use the pills of their own screen: cases as in Treatment Plan, lab orders as in Lab Order, consent as in the visit table.</li>
          <li>No appointment and no consent before the case is accepted (Planning, Pending, Presented), as in Treatment Plan.</li>
        </ul>
      </Bloque>
    </Lienzo>
}`,...Z.parameters?.docs?.source}}}})))()}$();export{X as Contents,J as FullRecord,Y as FullRecordProblem,q as MoreOpen,U as Parts,B as Playground,Z as Specs,K as States,Q as __namedExportsOrder,z as default};