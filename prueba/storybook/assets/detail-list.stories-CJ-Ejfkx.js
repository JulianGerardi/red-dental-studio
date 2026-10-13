import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,r}from"./toaster-B6mRBNx3.js";import{a as i,c as a,i as o,l as s,n as c,o as l,r as u,s as d,t as f}from"./detail-list-D5Qnhigd.js";import{i as p,r as m}from"./pill-Qo___yxt.js";import{n as h,r as g}from"./play-Dr1R_I1D.js";import{c as _,d as v,i as y,t as b,u as x}from"./kit-CWUgB5-0.js";function S({filas:e,vacia:t,mas:n,ancho:r}){let s=[(0,C.jsx)(u,{titulo:`Treatment`,children:(0,C.jsx)(c,{estado:(0,C.jsx)(m,{tone:`success`,size:`sm`,children:`Accepted`}),sub:`Visit 1 · this procedure`,children:(0,C.jsx)(f,{onClick:D(`the case`),children:`Restorative treatment`})})},`t`),(0,C.jsx)(u,{titulo:`Location`,children:(0,C.jsx)(c,{children:(0,C.jsx)(`span`,{className:`text-[12px] text-ink`,children:`Bayside Dental`})})},`l`),(0,C.jsx)(u,{titulo:`Referral`,cuenta:t?0:2,children:t?(0,C.jsx)(d,{children:`No referrals linked.`}):(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(c,{estado:(0,C.jsx)(m,{tone:`success`,size:`sm`,children:`Accepted`}),sub:`Requested Mar 03, 2026`,children:(0,C.jsx)(f,{onClick:D(`the referral`),children:`Dr. Laura Chen · Endodontics`})}),n&&(0,C.jsx)(i,{label:`1 more referral`,children:(0,C.jsx)(c,{estado:(0,C.jsx)(m,{tone:`danger`,size:`sm`,children:`Declined`}),sub:`Requested May 15, 2026`,children:(0,C.jsx)(f,{onClick:D(`the referral`),children:`Dr. Omar Haddad · Oral Surgery`})})})]})},`r`),(0,C.jsxs)(u,{titulo:`Balance`,children:[(0,C.jsx)(c,{children:(0,C.jsx)(`span`,{className:`text-[12px] font-semibold text-ink tabular-nums`,children:`$80.00`})}),(0,C.jsx)(l,{children:`Balance of this charge only, not the patient or guarantor balance.`})]},`n`)];return(0,C.jsx)(`div`,{className:`rounded-lg border border-line-row bg-surface-subtle px-4 py-3 pl-11`,style:{width:E[r]},children:(0,C.jsx)(o,{titulo:`D2392 · Resin-based composite – two surfaces`,lado:`Tooth 14 · Surface OD`,pie:(0,C.jsx)(a,{onClick:D(`the full record`)}),children:s.slice(0,e)})})}var C,w,T,E,D,O,k,A,j,M,N,P;function F(){return(F=e((()=>{r(),p(),v(),g(),s(),C=t(),{userEvent:w,within:T}=__STORYBOOK_MODULE_TEST__,E={table:880,overlay:700,phone:320},D=e=>()=>n.info(`Opens ${e}.`),O={title:`Components/UI/DetailList`,parameters:{layout:`padded`,docs:{description:{component:["La **lista de detalle**: lo que se despliega debajo de una fila de tabla (Elements / Tables, `rowDetail`). La usan el detalle de Problem List y Procedures en Clinical Mode y el de Transactions en el Ledger, así los dos se leen igual.",``,`**Cómo es:** el título del registro y un dato al costado (pieza, superficie); una fila por tema, una debajo de la otra y **sin cards**, con el título a la izquierda (arriba en angosto) y los datos a la derecha; cada dato en una línea con su link, su estado y el contexto; al pie *View full record* y *Read-only summary*. Lo que no entra se pliega en "N more…"; una fila sin datos queda y dice qué falta.`,``,`**Probalo:** en *Playground* cambiá cuántas filas, si una está vacía, el "more" y el ancho desde *Controls*.`].join(`
`)}}},args:{filas:4,vacia:!1,mas:!0,ancho:`table`},argTypes:{filas:{control:{type:`range`,min:1,max:4,step:1},description:`Cuántas filas.`},vacia:{control:`boolean`,description:`La fila Referral sin datos: Vacio.`},mas:{control:`boolean`,description:`Un dato plegado en "1 more referral".`},ancho:{control:`inline-radio`,options:Object.keys(E),description:`table 880 · overlay 700 · phone 320 (el título de cada fila pasa arriba).`}}},k={render:e=>(0,C.jsx)(S,{...e})},A={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,C.jsxs)(y,{children:[(0,C.jsx)(b,{titulo:`The list`,nota:`ListaDetalle: título, dato del costado, las filas y el pie.`,children:(0,C.jsx)(S,{filas:4,vacia:!1,mas:!0,ancho:`table`})}),(0,C.jsx)(b,{titulo:`Pieces`,children:(0,C.jsxs)(`div`,{className:`@container flex w-[700px] max-w-full flex-col`,children:[(0,C.jsxs)(u,{titulo:`Row`,cuenta:2,children:[(0,C.jsx)(c,{estado:(0,C.jsx)(m,{tone:`info`,size:`sm`,children:`Status`}),sub:`Context`,children:(0,C.jsx)(f,{onClick:D(`the record`),children:`Link to the record`})}),(0,C.jsx)(c,{rotulo:`Label`,children:(0,C.jsx)(`span`,{className:`text-[12px] text-ink`,children:`Plain value`})})]}),(0,C.jsxs)(u,{titulo:`Folded`,children:[(0,C.jsx)(c,{children:(0,C.jsx)(`span`,{className:`text-[12px] text-ink`,children:`First item`})}),(0,C.jsxs)(i,{label:`2 more items`,children:[(0,C.jsx)(c,{children:(0,C.jsx)(`span`,{className:`text-[12px] text-ink`,children:`Second item`})}),(0,C.jsx)(c,{children:(0,C.jsx)(`span`,{className:`text-[12px] text-ink`,children:`Third item`})})]})]}),(0,C.jsx)(u,{titulo:`Empty`,cuenta:0,children:(0,C.jsx)(d,{children:`Nothing linked.`})}),(0,C.jsxs)(u,{titulo:`With a note`,children:[(0,C.jsx)(c,{children:(0,C.jsx)(`span`,{className:`text-[12px] text-ink`,children:`$80.00`})}),(0,C.jsx)(l,{children:`What this number measures.`})]})]})}),(0,C.jsx)(b,{titulo:`What each part is`,children:(0,C.jsxs)(_,{encabezado:[`Part`,`What it does`,`Component`],minimo:720,arriba:!0,children:[(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`List`}),(0,C.jsx)(`td`,{children:`El detalle entero: título del registro, dato al costado, filas y pie con Read-only summary.`}),(0,C.jsx)(`td`,{children:`ListaDetalle`})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Row`}),(0,C.jsx)(`td`,{children:`Un tema: título de 11px y cuenta a la izquierda (150px; arriba en angosto), datos a la derecha. Una línea fina separa las filas.`}),(0,C.jsx)(`td`,{children:`FilaDetalle`})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Entry`}),(0,C.jsx)(`td`,{children:`Un dato en una línea: rótulo opcional, link o texto, estado y contexto.`}),(0,C.jsx)(`td`,{children:`Entrada`})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Link`}),(0,C.jsx)(`td`,{children:`Lleva a la pantalla donde se trabaja el registro; la flecha dice que sale de la tabla.`}),(0,C.jsx)(`td`,{children:`EnlaceRegistro`})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`N more…`}),(0,C.jsx)(`td`,{children:`Lo que no entra en el resumen, plegado.`}),(0,C.jsx)(`td`,{children:`MasItems`})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Nothing linked`}),(0,C.jsx)(`td`,{children:`La fila queda y dice qué falta.`}),(0,C.jsx)(`td`,{children:`Vacio`})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Note`}),(0,C.jsx)(`td`,{children:`Aclara qué mide un dato (por ejemplo, saldo de la transacción y no de la cuenta).`}),(0,C.jsx)(`td`,{children:`NotaDetalle`})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`View full record`}),(0,C.jsx)(`td`,{children:`Abre el registro completo (drawer o modal de sólo lectura).`}),(0,C.jsx)(`td`,{children:`VerRegistroCompleto`})]})]})})]})},j={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,C.jsxs)(y,{children:[(0,C.jsx)(b,{titulo:`Default`,nota:`Todas las filas con datos.`,children:(0,C.jsx)(S,{filas:4,vacia:!1,mas:!1,ancho:`table`})}),(0,C.jsx)(b,{titulo:`Empty row`,nota:`Una fila sin datos queda en su lugar y lo dice: el detalle tiene siempre la misma forma.`,children:(0,C.jsx)(S,{filas:4,vacia:!0,mas:!1,ancho:`table`})}),(0,C.jsx)(b,{titulo:`Narrow`,nota:`Teléfono: el título de cada fila va arriba de sus datos.`,children:(0,C.jsx)(S,{filas:4,vacia:!1,mas:!0,ancho:`phone`})})]})},M={name:`More open`,render:e=>(0,C.jsx)(S,{...e}),play:async e=>{await w.click(await T(e.canvasElement).findByRole(`button`,{name:/1 more referral/})),await h(/Dr. Omar Haddad/)(e)}},N={parameters:{controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,C.jsxs)(y,{children:[(0,C.jsx)(b,{titulo:`Layout`,children:(0,C.jsxs)(_,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Row`}),(0,C.jsx)(`td`,{children:`Padding vertical 8px; línea de 1px entre filas.`})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Row title`}),(0,C.jsx)(`td`,{children:`Columna de 150px desde 448px de ancho del detalle (container query); abajo de eso, arriba de los datos.`})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Entry`}),(0,C.jsx)(`td`,{children:`Alto mínimo 24px (el del botón de turno); si no entra en una línea, sigue en la siguiente.`})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Gaps`}),(0,C.jsx)(`td`,{children:`12px entre el título, las filas y el pie.`})]})]})}),(0,C.jsx)(b,{titulo:`Type and color`,children:(0,C.jsxs)(_,{encabezado:[`Item`,`Size`,`Color`],minimo:560,children:[(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Record title`}),(0,C.jsx)(`td`,{children:`13px Semibold`}),(0,C.jsx)(`td`,{children:(0,C.jsx)(x,{nombre:`ink`})})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Row title`}),(0,C.jsx)(`td`,{children:`11px Semibold`}),(0,C.jsx)(`td`,{children:(0,C.jsx)(x,{nombre:`ink-muted`})})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Link`}),(0,C.jsx)(`td`,{children:`12px Medium, flecha 12px`}),(0,C.jsx)(`td`,{children:(0,C.jsx)(x,{nombre:`dash-blue`})})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Context and note`}),(0,C.jsx)(`td`,{children:`11px`}),(0,C.jsx)(`td`,{children:(0,C.jsx)(x,{nombre:`ink-muted`})})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Nothing linked`}),(0,C.jsx)(`td`,{children:`12px`}),(0,C.jsx)(`td`,{children:(0,C.jsx)(x,{nombre:`ink-faint`})})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Divider`}),(0,C.jsx)(`td`,{children:`1px`}),(0,C.jsx)(`td`,{children:(0,C.jsx)(x,{nombre:`line-soft`})})]})]})}),(0,C.jsx)(b,{titulo:`Rules`,children:(0,C.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,C.jsx)(`li`,{children:`A list, not cards: the detail should not take more room than the data it shows.`}),(0,C.jsx)(`li`,{children:`Rows in order of importance for whoever opens the row; every row stays even when empty.`}),(0,C.jsx)(`li`,{children:`Read-only: actions stay in the row menu; links go to the screen where the record is worked on.`})]})})]})},P=[`Playground`,`Parts`,`States`,`MoreOpen`,`Specs`],k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: a => <Ejemplo {...a} />
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
      <Bloque titulo="The list" nota="ListaDetalle: título, dato del costado, las filas y el pie.">
        <Ejemplo filas={4} vacia={false} mas ancho="table" />
      </Bloque>
      <Bloque titulo="Pieces">
        <div className="@container flex w-[700px] max-w-full flex-col">
          <FilaDetalle titulo="Row" cuenta={2}>
            <Entrada estado={<Pill tone="info" size="sm">Status</Pill>} sub="Context">
              <EnlaceRegistro onClick={abrir('the record')}>Link to the record</EnlaceRegistro>
            </Entrada>
            <Entrada rotulo="Label"><span className="text-[12px] text-ink">Plain value</span></Entrada>
          </FilaDetalle>
          <FilaDetalle titulo="Folded">
            <Entrada><span className="text-[12px] text-ink">First item</span></Entrada>
            <MasItems label="2 more items"><Entrada><span className="text-[12px] text-ink">Second item</span></Entrada><Entrada><span className="text-[12px] text-ink">Third item</span></Entrada></MasItems>
          </FilaDetalle>
          <FilaDetalle titulo="Empty" cuenta={0}><Vacio>Nothing linked.</Vacio></FilaDetalle>
          <FilaDetalle titulo="With a note"><Entrada><span className="text-[12px] text-ink">$80.00</span></Entrada><NotaDetalle>What this number measures.</NotaDetalle></FilaDetalle>
        </div>
      </Bloque>
      <Bloque titulo="What each part is">
        <Tabla encabezado={['Part', 'What it does', 'Component']} minimo={720} arriba>
          <tr><td className="font-semibold">List</td><td>El detalle entero: título del registro, dato al costado, filas y pie con Read-only summary.</td><td>ListaDetalle</td></tr>
          <tr><td className="font-semibold">Row</td><td>Un tema: título de 11px y cuenta a la izquierda (150px; arriba en angosto), datos a la derecha. Una línea fina separa las filas.</td><td>FilaDetalle</td></tr>
          <tr><td className="font-semibold">Entry</td><td>Un dato en una línea: rótulo opcional, link o texto, estado y contexto.</td><td>Entrada</td></tr>
          <tr><td className="font-semibold">Link</td><td>Lleva a la pantalla donde se trabaja el registro; la flecha dice que sale de la tabla.</td><td>EnlaceRegistro</td></tr>
          <tr><td className="font-semibold">N more…</td><td>Lo que no entra en el resumen, plegado.</td><td>MasItems</td></tr>
          <tr><td className="font-semibold">Nothing linked</td><td>La fila queda y dice qué falta.</td><td>Vacio</td></tr>
          <tr><td className="font-semibold">Note</td><td>Aclara qué mide un dato (por ejemplo, saldo de la transacción y no de la cuenta).</td><td>NotaDetalle</td></tr>
          <tr><td className="font-semibold">View full record</td><td>Abre el registro completo (drawer o modal de sólo lectura).</td><td>VerRegistroCompleto</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
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
      <Bloque titulo="Default" nota="Todas las filas con datos.">
        <Ejemplo filas={4} vacia={false} mas={false} ancho="table" />
      </Bloque>
      <Bloque titulo="Empty row" nota="Una fila sin datos queda en su lugar y lo dice: el detalle tiene siempre la misma forma.">
        <Ejemplo filas={4} vacia mas={false} ancho="table" />
      </Bloque>
      <Bloque titulo="Narrow" nota="Teléfono: el título de cada fila va arriba de sus datos.">
        <Ejemplo filas={4} vacia={false} mas ancho="phone" />
      </Bloque>
    </Lienzo>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  name: 'More open',
  render: a => <Ejemplo {...a} />,
  play: async c => {
    await userEvent.click(await within(c.canvasElement).findByRole('button', {
      name: /1 more referral/
    }));
    await esperar(/Dr. Omar Haddad/)(c);
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
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
          <tr><td className="font-semibold">Row</td><td>Padding vertical 8px; línea de 1px entre filas.</td></tr>
          <tr><td className="font-semibold">Row title</td><td>Columna de 150px desde 448px de ancho del detalle (container query); abajo de eso, arriba de los datos.</td></tr>
          <tr><td className="font-semibold">Entry</td><td>Alto mínimo 24px (el del botón de turno); si no entra en una línea, sigue en la siguiente.</td></tr>
          <tr><td className="font-semibold">Gaps</td><td>12px entre el título, las filas y el pie.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Type and color">
        <Tabla encabezado={['Item', 'Size', 'Color']} minimo={560}>
          <tr><td className="font-semibold">Record title</td><td>13px Semibold</td><td><Token nombre="ink" /></td></tr>
          <tr><td className="font-semibold">Row title</td><td>11px Semibold</td><td><Token nombre="ink-muted" /></td></tr>
          <tr><td className="font-semibold">Link</td><td>12px Medium, flecha 12px</td><td><Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Context and note</td><td>11px</td><td><Token nombre="ink-muted" /></td></tr>
          <tr><td className="font-semibold">Nothing linked</td><td>12px</td><td><Token nombre="ink-faint" /></td></tr>
          <tr><td className="font-semibold">Divider</td><td>1px</td><td><Token nombre="line-soft" /></td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>A list, not cards: the detail should not take more room than the data it shows.</li>
          <li>Rows in order of importance for whoever opens the row; every row stays even when empty.</li>
          <li>Read-only: actions stay in the row menu; links go to the screen where the record is worked on.</li>
        </ul>
      </Bloque>
    </Lienzo>
}`,...N.parameters?.docs?.source}}}})))()}F();export{M as MoreOpen,A as Parts,k as Playground,N as Specs,j as States,P as __namedExportsOrder,O as default};