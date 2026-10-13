import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,r}from"./tooltip-6ep9-x7U.js";import{n as i,r as a}from"./toaster-B6mRBNx3.js";import{C as o,D as s,E as c,O as l,S as u,_ as d,b as f,g as p,h as m,j as h,v as g,w as _,x as v,y}from"./data-table-BTRydb02.js";import{d as b,f as x,x as S}from"./clinical-mode-B1jDrqqr.js";import{n as C,r as w}from"./play-Dr1R_I1D.js";import{c as T,d as E,i as D,t as O,u as k}from"./kit-CWUgB5-0.js";function A({tipo:e,procedure:t,problem:n,ancho:i}){let a=e===`procedure`?{tipo:`procedimiento`,r:x.find(e=>e.id===t)??x[0]}:{tipo:`problema`,r:b.find(e=>e.id===n)??b[0]};return(0,j.jsx)(r,{children:(0,j.jsx)(`div`,{className:`rounded-lg border border-line-row bg-surface-subtle px-4 py-3 pl-11 text-[13px] text-ink-soft`,style:{width:F[i]},children:(0,j.jsx)(u,{registro:a,contexto:P},a.r.id)})})}var j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z;function Q(){return(Q=e((()=>{a(),n(),E(),w(),S(),h(),j=t(),{userEvent:M,within:N}=__STORYBOOK_MODULE_TEST__,P={problemas:b,procedimientos:x,onAbrirProblema:e=>i.info(`Opens ${e.condicion} in Problem List.`),onAbrirProcedimiento:e=>i.info(`Opens ${e.codigo} in Procedures.`)},F={wide:880,overlay:790,narrow:320},I=Object.fromEntries(x.map(e=>[`${e.codigo} · ${e.nombre.slice(0,28)}`,e.id])),L=Object.fromEntries(b.map(e=>[`${e.condicion} (${e.estado})`,e.id])),R={title:`Components/Clinical/RecordDetail`,parameters:{layout:`padded`,docs:{description:{component:["El detalle que se despliega en cada fila de la tabla del Overview de Clinical Mode (**Problem List** y **Procedures**), con el mismo desplegable del Ledger: el chevron, clic en la fila, y *Expand all / Collapse all* desde que hay una abierta (`rowDetail` de Elements / Tables).",``,`**Qué muestra:** lo que cuelga del registro, en una **lista sin cards**: una fila debajo de la otra, el título a la izquierda y los datos a la derecha, cada dato en una línea. Van por importancia (Julián, 2026-10-13). Un procedimiento: *Treatment* (el caso, su grupo, la visita con su turno, las otras visitas y los casos históricos), *Procedure consent*, *Findings / diagnoses*, *Referral* y *Lab order*. Un problema: *Procedures*, *Treatment*, *Referral*, *Lab order* (con el procedimiento relacionado) y *Source exam*. Lo que no entra en el resumen se pliega detrás de "N more…". Las piezas de la lista son *Components / UI / DetailList*, las mismas del detalle del Ledger.`,``,"**Reusa** lo que ya hay: el turno de la visita de Treatment Plan (`CitaVisita`), el estado de consentimiento de sus tablas, las pills de caso, de Lab Order y de la tabla, y el drawer para *View full record*. Cada link lleva a la pantalla donde se trabaja (Treatment Plan con el caso abierto, Lab Order, Referral, el examen) o abre el registro en la otra pestaña. Sólo lectura.",``,`**Probalo:** en *Playground* elegí un procedimiento o un problema y el ancho (la tabla del Overview, el flotante de un examen o un teléfono) desde *Controls*; abrí los "more" y tocá un link.`].join(`
`)}}},args:{tipo:`procedure`,procedure:`pr10`,problem:`p9`,ancho:`wide`},argTypes:{tipo:{name:`record`,control:`inline-radio`,options:[`procedure`,`problem`],description:`Qué pestaña de la tabla.`},procedure:{control:`select`,options:Object.values(I),labels:Object.fromEntries(Object.entries(I).map(([e,t])=>[t,e])),description:`El procedimiento de la fila.`,if:{arg:`tipo`,eq:`procedure`}},problem:{control:`select`,options:Object.values(L),labels:Object.fromEntries(Object.entries(L).map(([e,t])=>[t,e])),description:`El problema de la fila.`,if:{arg:`tipo`,eq:`problem`}},ancho:{name:`width`,control:`inline-radio`,options:Object.keys(F),description:`wide 880 (Overview) · overlay 790 (View Problem List de un examen) · narrow 320 (teléfono: el título de cada fila va arriba).`}}},z={render:e=>(0,j.jsx)(A,{...e})},B=x.find(e=>e.id===`pr10`),V=b.find(e=>e.id===`p9`),H={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,j.jsx)(r,{children:(0,j.jsxs)(D,{children:[(0,j.jsx)(O,{titulo:`The detail, procedure`,nota:`Título completo y pieza arriba; la lista; al pie View full record y Read-only summary.`,children:(0,j.jsx)(A,{tipo:`procedure`,procedure:`pr10`,problem:`p9`,ancho:`wide`})}),(0,j.jsx)(O,{titulo:`Rows of a procedure`,nota:`FilasProcedimiento, por importancia: Treatment, Procedure consent, Findings / diagnoses, Referral y Lab order.`,children:(0,j.jsx)(`div`,{className:`@container flex w-[880px] max-w-full flex-col`,children:(0,j.jsx)(_,{r:B,c:P})})}),(0,j.jsx)(O,{titulo:`Rows of a problem`,nota:`FilasProblema, por importancia: Procedures, Treatment (sin visitas), Referral y Lab order con el procedimiento relacionado, y Source exam.`,children:(0,j.jsx)(`div`,{className:`@container flex w-[880px] max-w-full flex-col`,children:(0,j.jsx)(o,{r:V,c:P})})}),(0,j.jsx)(O,{titulo:`What each part is`,children:(0,j.jsxs)(T,{encabezado:[`Part`,`What it does`,`Component`],minimo:720,arriba:!0,children:[(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Row`}),(0,j.jsx)(`td`,{children:`Una fila de la lista, sin card: título de 11px y la cuenta a la izquierda (arriba en angosto), los datos a la derecha. Una línea fina separa las filas.`}),(0,j.jsx)(`td`,{children:`FilaDetalle (UI / DetailList)`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Entry`}),(0,j.jsx)(`td`,{children:`Un dato en una línea: rótulo opcional (Finding, Diagnosis), link o texto, su estado y el contexto.`}),(0,j.jsx)(`td`,{children:`Entrada (UI / DetailList)`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Link`}),(0,j.jsx)(`td`,{children:`Lleva a donde vive el registro; la flecha dice que sale de la tabla.`}),(0,j.jsx)(`td`,{children:`EnlaceRegistro (UI / DetailList)`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`N more…`}),(0,j.jsx)(`td`,{children:`Lo que no entra en el resumen, plegado: visitas, casos históricos, hallazgos y diagnósticos.`}),(0,j.jsx)(`td`,{children:`MasItems (UI / DetailList)`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Nothing linked`}),(0,j.jsx)(`td`,{children:`La fila queda y dice qué falta: así se sabe que no hay, no que no cargó.`}),(0,j.jsx)(`td`,{children:`Vacio (UI / DetailList)`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Contents`}),(0,j.jsx)(`td`,{children:`Lo mismo en la fila y en el drawer: el drawer lo muestra todo, sin plegar.`}),(0,j.jsx)(`td`,{children:`ContenidoTratamiento, ContenidoOrdenes, ContenidoDerivaciones, ContenidoHallazgos, ContenidoConsentimiento, ContenidoProcedimientos, ContenidoExamen`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Full record`}),(0,j.jsx)(`td`,{children:`Drawer de sólo lectura: los datos de la fila de a dos y una sección por fila de la lista. Close y Edit.`}),(0,j.jsx)(`td`,{children:`RegistroCompletoDrawer, SeccionesProcedimiento, SeccionesProblema`})]})]})})]})})},U=e=>x.find(t=>t.id===e),W=e=>b.find(t=>t.id===e),G={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,j.jsx)(r,{children:(0,j.jsxs)(D,{children:[(0,j.jsx)(O,{titulo:`Procedure, everything linked`,nota:`Caso aceptado: la visita del procedimiento con su turno (No appointment avisa, como en Treatment Plan), una visita más plegada, la derivación y el consentimiento firmado.`,children:(0,j.jsx)(A,{tipo:`procedure`,procedure:`pr10`,problem:`p9`,ancho:`wide`})}),(0,j.jsx)(O,{titulo:`Historical case and lab order`,nota:`El caso elegido de un grupo y la alternativa descartada, plegada en Historical case.`,children:(0,j.jsx)(A,{tipo:`procedure`,procedure:`pr4`,problem:`p9`,ancho:`wide`})}),(0,j.jsx)(O,{titulo:`Before the case is accepted`,nota:`Planning, Pending o Presented: la visita sin turno y el consentimiento todavía no existe (la misma regla que Treatment Plan).`,children:(0,j.jsx)(A,{tipo:`procedure`,procedure:`pr11`,problem:`p9`,ancho:`wide`})}),(0,j.jsx)(O,{titulo:`Empty`,nota:`Nada vinculado: cada fila queda y dice qué no hay (No treatment linked, No lab orders linked…).`,children:(0,j.jsx)(A,{tipo:`procedure`,procedure:`pr1`,problem:`p9`,ancho:`wide`})}),(0,j.jsx)(O,{titulo:`Problem with procedures`,nota:`El procedimiento que lo resuelve, su caso, y la derivación con el procedimiento relacionado.`,children:(0,j.jsx)(A,{tipo:`problem`,procedure:`pr10`,problem:`p9`,ancho:`wide`})}),(0,j.jsx)(O,{titulo:`Problem with its own referral`,nota:`Un problema derivado sin procedimiento: la derivación es del problema.`,children:(0,j.jsx)(A,{tipo:`problem`,procedure:`pr10`,problem:`p11`,ancho:`wide`})}),(0,j.jsx)(O,{titulo:`Overlay width`,nota:`790px, el flotante de View Problem List: la misma lista, con el título a la izquierda.`,children:(0,j.jsx)(A,{tipo:`procedure`,procedure:`pr6`,problem:`p9`,ancho:`overlay`})}),(0,j.jsx)(O,{titulo:`Narrow`,nota:`Teléfono: el título de cada fila va arriba de sus datos. En la tabla, el detalle queda en la parte visible aunque la tabla scrollee de costado.`,children:(0,j.jsx)(A,{tipo:`procedure`,procedure:`pr10`,problem:`p9`,ancho:`narrow`})})]})})},K={name:`More open`,args:{tipo:`procedure`,procedure:`pr10`,ancho:`wide`},render:e=>(0,j.jsx)(A,{...e}),play:async e=>{let t=N(e.canvasElement);await M.click(await t.findByRole(`button`,{name:/1 more visit/})),await C(/May 4, 2026/)(e),await C(/K08\.9/)(e)}},q={name:`Full record`,parameters:{controls:{disable:!0},docs:{story:{inline:!1,iframeHeight:720}}},render:()=>(0,j.jsx)(r,{children:(0,j.jsx)(c,{registro:{tipo:`procedimiento`,r:U(`pr10`)},contexto:P,onClose:()=>{}})})},J={name:`Full record · problem`,parameters:{controls:{disable:!0},docs:{story:{inline:!1,iframeHeight:720}}},render:()=>(0,j.jsx)(r,{children:(0,j.jsx)(c,{registro:{tipo:`problema`,r:W(`p5`)},contexto:P,onClose:()=>{}})})},Y={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,j.jsx)(r,{children:(0,j.jsxs)(D,{children:[(0,j.jsx)(O,{titulo:`Drawer sections`,children:(0,j.jsxs)(`div`,{className:`grid w-[880px] max-w-full gap-8 md:grid-cols-2`,children:[(0,j.jsx)(`div`,{className:`flex flex-col gap-6`,children:(0,j.jsx)(l,{r:U(`pr4`),c:P})}),(0,j.jsx)(`div`,{className:`flex flex-col gap-6`,children:(0,j.jsx)(s,{r:W(`p1`),c:P})})]})}),(0,j.jsx)(O,{titulo:`Contents`,children:(0,j.jsxs)(`div`,{className:`grid w-[880px] max-w-full gap-6 md:grid-cols-3 [&>div]:flex [&>div]:flex-col [&>div]:gap-2`,children:[(0,j.jsx)(`div`,{children:(0,j.jsx)(v,{t:void 0})}),(0,j.jsxs)(`div`,{children:[(0,j.jsx)(y,{ordenes:[]}),(0,j.jsx)(p,{derivaciones:[]})]}),(0,j.jsx)(`div`,{children:(0,j.jsx)(g,{hallazgos:[W(`p5`)],onAbrir:P.onAbrirProblema,completo:!0})}),(0,j.jsx)(`div`,{children:(0,j.jsx)(f,{procedimientos:[U(`pr6`)],onAbrir:P.onAbrirProcedimiento})}),(0,j.jsx)(`div`,{children:(0,j.jsx)(m,{t:void 0})}),(0,j.jsx)(`div`,{children:(0,j.jsx)(d,{problema:W(`p7`)})})]})})]})})},X={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,j.jsxs)(D,{children:[(0,j.jsx)(O,{titulo:`Layout`,children:(0,j.jsxs)(T,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`List`}),(0,j.jsx)(`td`,{children:`Sin cards: una fila debajo de la otra, separadas por una línea de 1px. Padding vertical de 8px por fila.`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Row title`}),(0,j.jsx)(`td`,{children:`Columna de 150px a la izquierda desde 448px de detalle; abajo de eso, arriba de los datos (container query: depende del ancho de la tabla, no de la pantalla).`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Entry`}),(0,j.jsx)(`td`,{children:`Una línea de 24px como mínimo (el alto del botón de turno); si no entra, sigue en la siguiente.`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Gap`}),(0,j.jsx)(`td`,{children:`12px entre el título del registro, la lista y el pie.`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`In the table`}),(0,j.jsxs)(`td`,{children:[`Debajo de la fila, con la sangría del chevron (44px) y fondo `,(0,j.jsx)(`code`,{children:`surface-subtle`}),`. Si la tabla scrollea de costado, el detalle queda fijo en la parte visible.`]})]})]})}),(0,j.jsx)(O,{titulo:`Type and color`,children:(0,j.jsxs)(T,{encabezado:[`Item`,`Size`,`Color`],minimo:560,children:[(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Record title`}),(0,j.jsx)(`td`,{children:`13px Semibold`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(k,{nombre:`ink`})})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Row title`}),(0,j.jsx)(`td`,{children:`11px Semibold`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(k,{nombre:`ink-muted`})})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Link`}),(0,j.jsx)(`td`,{children:`12px Medium, flecha 12px`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(k,{nombre:`dash-blue`})})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Context line`}),(0,j.jsx)(`td`,{children:`11px`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(k,{nombre:`ink-muted`})})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Nothing linked`}),(0,j.jsx)(`td`,{children:`12px`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(k,{nombre:`ink-faint`})})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Divider between rows`}),(0,j.jsx)(`td`,{children:`1px`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(k,{nombre:`line-soft`})})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Count`}),(0,j.jsx)(`td`,{children:`Count (Elements)`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(k,{nombre:`dash-count-bg`})})]})]})}),(0,j.jsx)(O,{titulo:`Rules`,children:(0,j.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,j.jsx)(`li`,{children:`Read-only: changing a status stays in the row menu. Edit in the full record says it is not in this release.`}),(0,j.jsx)(`li`,{children:`A list, not cards: the detail should not take more room than the data it shows.`}),(0,j.jsx)(`li`,{children:`Every row stays even when it is empty, so the detail always has the same shape and order.`}),(0,j.jsx)(`li`,{children:`Show the first items in the summary (the visit of the procedure, the finding and its diagnosis); the rest goes behind “N more…”. The full record shows everything.`}),(0,j.jsx)(`li`,{children:`Statuses use the pills of their own screen: cases as in Treatment Plan, lab orders as in Lab Order, consent as in the visit table.`}),(0,j.jsx)(`li`,{children:`No appointment and no consent before the case is accepted (Planning, Pending, Presented), as in Treatment Plan.`})]})})]})},Z=[`Playground`,`Parts`,`States`,`MoreOpen`,`FullRecord`,`FullRecordProblem`,`Contents`,`Specs`],z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: args => <EnFila {...args} />
}`,...z.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
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
        <Bloque titulo="Rows of a procedure" nota="FilasProcedimiento, por importancia: Treatment, Procedure consent, Findings / diagnoses, Referral y Lab order.">
          <div className="@container flex w-[880px] max-w-full flex-col"><FilasProcedimiento r={r10} c={CONTEXTO} /></div>
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
            <tr><td className="font-semibold">Full record</td><td>Drawer de sólo lectura: los datos de la fila de a dos y una sección por fila de la lista. Close y Edit.</td><td>RegistroCompletoDrawer, SeccionesProcedimiento, SeccionesProblema</td></tr>
          </Tabla>
        </Bloque>
      </Lienzo>
    </TooltipProvider>
}`,...H.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
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
}`,...X.parameters?.docs?.source}}}})))()}Q();export{Y as Contents,q as FullRecord,J as FullRecordProblem,K as MoreOpen,H as Parts,z as Playground,X as Specs,G as States,Z as __namedExportsOrder,R as default};