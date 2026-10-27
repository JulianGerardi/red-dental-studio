import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{i as r,r as i,t as a}from"./Dashboard-C9wfPgZp.js";import{a as o,n as s}from"./button-DhtV2iTj.js";import{c,d as l,f as u,g as d,h as f,i as p,n as m,o as h,r as g,t as _,u as v}from"./kit-CWUgB5-0.js";import{a as y,d as b,n as x}from"./dashboard-data-CcyXyNkI.js";function S({inicial:e=y,marcados:t=!0}){let[n,r]=(0,T.useState)(e);return(0,E.jsx)(i,{value:n,onChange:r,marked:t?x:[]})}function C({inicial:e}){let[t,n]=(0,T.useState)(e);return(0,E.jsx)(a,{label:`Provider`,options:[`Dr. Elena Martinez`,`Dr. Emily Chen`],value:t,onChange:n})}function w(){let e=(0,T.useRef)(null),[t,n]=(0,T.useState)([]);return(0,T.useLayoutEffect)(()=>{n(P.map(([,t])=>{let n=e.current?.querySelector(t);return n?u(n):null}))},[]),(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(`div`,{ref:e,children:(0,E.jsx)(S,{marcados:!1})}),(0,E.jsx)(c,{encabezado:[`Part`,`Height`,`Width`,`Padding`,`Text`,`Radius`,`Border`,`Icon`],minimo:820,children:P.map(([e],n)=>(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{className:`font-semibold`,children:e}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:t[n]?.alto}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:t[n]?.ancho}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:t[n]?.padding}),(0,E.jsxs)(`td`,{className:`tabular-nums`,children:[t[n]?.texto,` · `,t[n]?.peso]}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:t[n]?.radio}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:t[n]?.borde}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:t[n]?.icono})]},e))})]})}var T,E,D,O,k,A,j,M,N,P,F,I;function L(){return(L=e((()=>{T=t(),r(),b(),o(),l(),f(),E=n(),D={title:`Pages/Parts/Dashboard`,parameters:{layout:`padded`,docs:{decisionsFrom:`pages/Dashboard.tsx`,description:{component:["Las partes propias del dashboard (`@/pages/Dashboard`): la **fila de fecha** de arriba, que manda sobre toda la pantalla, con el atajo a las **preguntas frecuentes**, y el **botón de filtro** de cada panel. La pantalla completa está en *Pages*.",``,'**Cómo se usa:** el selector elige el día; *Today* vuelve a hoy sin abrir el calendario y sólo aparece cuando el día elegido no es hoy; el escudo con el signo de pregunta lleva a las preguntas frecuentes (*Help*, con el Dashboard abierto; Julián, 2026-10-13). Los tres miden 32px de alto, como el resto de los inputs de la app. El selector es el `DatePicker` en su look *toolbar* ("Feb 28, 2026"): el mismo campo y calendario que el filtro de fecha de Notifications.',``,`**Probalo:** en *Playground* elegí el día y los días marcados desde *Controls*; tocá *Today* y el botón se va.`].join(`
`)}}},args:{day:`Another day`,markedDays:!0},argTypes:{day:{control:`inline-radio`,options:[`Another day`,`Today`],description:`El día con el que arranca. En hoy, el botón Today no aparece.`},markedDays:{control:`boolean`,description:`El punto azul en los días con turnos, dentro del calendario.`}}},O={controls:{disable:!0}},k=`button[title="Go to today"]`,A=`a[aria-label="Frequently asked questions"]`,j={render:e=>(0,E.jsx)(`div`,{className:`h-[400px] bg-page-background p-4`,children:(0,E.jsx)(S,{inicial:e.day===`Today`?new Date:y,marcados:e.markedDays},`${e.day}-${e.markedDays}`)})},M={parameters:O,render:()=>(0,E.jsxs)(p,{children:[(0,E.jsxs)(_,{titulo:`Date row`,nota:`Arriba de las salas y de los paneles: si viviera adentro de Appointments parecería filtrar sólo esa.`,children:[(0,E.jsx)(h,{children:(0,E.jsx)(m,{rotulo:`Date picker · Today · FAQ`,children:(0,E.jsx)(S,{marcados:!1})})}),(0,E.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,E.jsxs)(`li`,{children:[(0,E.jsx)(`strong`,{children:`Date picker:`}),` el día de toda la pantalla, como "Feb 28, 2026" (`,(0,E.jsx)(`code`,{children:`DatePicker variant="toolbar"`}),`).`]}),(0,E.jsxs)(`li`,{children:[(0,E.jsx)(`strong`,{children:`Today:`}),` `,(0,E.jsx)(`code`,{children:`Button`}),` secondary md con el ícono CalendarClock. Sólo cuando el día no es hoy.`]}),(0,E.jsxs)(`li`,{children:[(0,E.jsx)(`strong`,{children:`FAQ:`}),` link con el look de `,(0,E.jsx)(`code`,{children:`Button`}),` secondary md de sólo ícono (ShieldQuestionMark): lleva a Help, donde arranca abierto el Dashboard. Siempre visible.`]})]})]}),(0,E.jsx)(_,{titulo:`Panel filter button`,nota:`El embudo de Appointments y de Pending Task: FilterMenu en sm.`,children:(0,E.jsx)(`div`,{className:`h-48`,children:(0,E.jsx)(C,{inicial:[]})})})]})},N={parameters:O,render:()=>(0,E.jsxs)(p,{children:[(0,E.jsx)(_,{titulo:`Date row`,children:(0,E.jsxs)(`div`,{className:`flex flex-col gap-6`,children:[(0,E.jsx)(m,{rotulo:`Another day: Today shows up`,children:(0,E.jsx)(S,{})}),(0,E.jsx)(m,{rotulo:`Today: the button goes away`,children:(0,E.jsx)(S,{inicial:new Date})}),(0,E.jsx)(m,{rotulo:`Today, hover`,children:(0,E.jsx)(g,{selector:k,estado:`hover`,children:(0,E.jsx)(S,{})})}),(0,E.jsx)(m,{rotulo:`FAQ, hover`,children:(0,E.jsx)(g,{selector:A,estado:`hover`,children:(0,E.jsx)(S,{})})}),(0,E.jsx)(m,{rotulo:`FAQ, keyboard focus`,children:(0,E.jsx)(g,{selector:A,estado:`focus-visible`,children:(0,E.jsx)(S,{})})}),(0,E.jsx)(m,{rotulo:`Calendar open`,children:(0,E.jsx)(g,{selector:`button[aria-haspopup]`,estado:`click`,className:`h-[380px]`,children:(0,E.jsx)(S,{})})})]})}),(0,E.jsx)(_,{titulo:`Panel filter button`,children:(0,E.jsxs)(h,{className:`h-48 items-start`,children:[(0,E.jsx)(m,{rotulo:`No filter`,children:(0,E.jsx)(C,{inicial:[]})}),(0,E.jsx)(m,{rotulo:`One chosen`,children:(0,E.jsx)(C,{inicial:[`Dr. Emily Chen`]})})]})})]})},P=[[`Date picker`,`button[aria-haspopup]`],[`Today`,k],[`FAQ`,A]],F={parameters:O,render:()=>{let e=d(s.secondary);return(0,E.jsxs)(p,{children:[(0,E.jsx)(_,{titulo:`Date row`,nota:`Leído de la fila ya dibujada. El selector y Today miden lo mismo de alto: si uno cambia, el otro tiene que acompañar.`,children:(0,E.jsx)(w,{})}),(0,E.jsx)(_,{titulo:`Today and FAQ colors`,nota:`Los de Button secondary (button.tsx y src/index.css).`,children:(0,E.jsx)(c,{encabezado:[`Fill`,`Text`,`Border`,`Hover fill`],minimo:560,children:(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{children:(0,E.jsx)(v,{nombre:e.fondo})}),(0,E.jsx)(`td`,{children:(0,E.jsx)(v,{nombre:e.texto})}),(0,E.jsx)(`td`,{children:(0,E.jsx)(v,{nombre:e.borde})}),(0,E.jsx)(`td`,{children:(0,E.jsx)(v,{nombre:e.fondoHover})})]})})}),(0,E.jsx)(_,{titulo:`Rules`,children:(0,E.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,E.jsxs)(`li`,{children:[`Today is `,(0,E.jsx)(`code`,{children:`Button variant="secondary" size="md"`}),`: 32px, the date picker height. Never a hand-made button.`]}),(0,E.jsxs)(`li`,{children:[`FAQ is a link (it navigates) with `,(0,E.jsx)(`code`,{children:`buttonClasses`}),` secondary md icon-only: 32×32, with an aria-label and the same text as a tooltip.`]}),(0,E.jsx)(`li`,{children:`Both carry the same faint shadow (0 1px 2px, 5%), so they read as a pair.`}),(0,E.jsx)(`li`,{children:`8px between parts. Today only when the chosen day is not today; FAQ always.`}),(0,E.jsxs)(`li`,{children:[`The date picker is `,(0,E.jsx)(`code`,{children:`variant="toolbar"`}),`: "Feb 28, 2026", medium, the same field and calendar as the Notifications date filter.`]})]})})]})}},I=[`Playground`,`Parts`,`States`,`Specs`],j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: args => <div className="h-[400px] bg-page-background p-4">
      <Fecha key={\`\${args.day}-\${args.markedDays}\`} inicial={args.day === 'Today' ? new Date() : HOY_DEMO} marcados={args.markedDays} />
    </div>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Date row" nota="Arriba de las salas y de los paneles: si viviera adentro de Appointments parecería filtrar sólo esa.">
        <Muestras>
          <ConRotulo rotulo="Date picker · Today · FAQ"><Fecha marcados={false} /></ConRotulo>
        </Muestras>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li><strong>Date picker:</strong> el día de toda la pantalla, como "Feb 28, 2026" (<code>DatePicker variant="toolbar"</code>).</li>
          <li><strong>Today:</strong> <code>Button</code> secondary md con el ícono CalendarClock. Sólo cuando el día no es hoy.</li>
          <li><strong>FAQ:</strong> link con el look de <code>Button</code> secondary md de sólo ícono (ShieldQuestionMark): lleva a Help, donde arranca abierto el Dashboard. Siempre visible.</li>
        </ul>
      </Bloque>
      <Bloque titulo="Panel filter button" nota="El embudo de Appointments y de Pending Task: FilterMenu en sm.">
        <div className="h-48"><Filtro inicial={[]} /></div>
      </Bloque>
    </Lienzo>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Date row">
        <div className="flex flex-col gap-6">
          <ConRotulo rotulo="Another day: Today shows up"><Fecha /></ConRotulo>
          <ConRotulo rotulo="Today: the button goes away"><Fecha inicial={new Date()} /></ConRotulo>
          <ConRotulo rotulo="Today, hover"><Forzar selector={HOY_SEL} estado="hover"><Fecha /></Forzar></ConRotulo>
          <ConRotulo rotulo="FAQ, hover"><Forzar selector={FAQ_SEL} estado="hover"><Fecha /></Forzar></ConRotulo>
          <ConRotulo rotulo="FAQ, keyboard focus"><Forzar selector={FAQ_SEL} estado="focus-visible"><Fecha /></Forzar></ConRotulo>
          <ConRotulo rotulo="Calendar open">
            <Forzar selector="button[aria-haspopup]" estado="click" className="h-[380px]"><Fecha /></Forzar>
          </ConRotulo>
        </div>
      </Bloque>
      <Bloque titulo="Panel filter button">
        <Muestras className="h-48 items-start">
          <ConRotulo rotulo="No filter"><Filtro inicial={[]} /></ConRotulo>
          <ConRotulo rotulo="One chosen"><Filtro inicial={['Dr. Emily Chen']} /></ConRotulo>
        </Muestras>
      </Bloque>
    </Lienzo>
}`,...N.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => {
    const t = tokensDe(BUTTON_VARIANTS.secondary);
    return <Lienzo>
        <Bloque titulo="Date row" nota="Leído de la fila ya dibujada. El selector y Today miden lo mismo de alto: si uno cambia, el otro tiene que acompañar.">
          <MedidasFila />
        </Bloque>
        <Bloque titulo="Today and FAQ colors" nota="Los de Button secondary (button.tsx y src/index.css).">
          <Tabla encabezado={['Fill', 'Text', 'Border', 'Hover fill']} minimo={560}>
            <tr>
              <td><Token nombre={t.fondo} /></td>
              <td><Token nombre={t.texto} /></td>
              <td><Token nombre={t.borde} /></td>
              <td><Token nombre={t.fondoHover} /></td>
            </tr>
          </Tabla>
        </Bloque>
        <Bloque titulo="Rules">
          <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
            <li>Today is <code>Button variant="secondary" size="md"</code>: 32px, the date picker height. Never a hand-made button.</li>
            <li>FAQ is a link (it navigates) with <code>buttonClasses</code> secondary md icon-only: 32×32, with an aria-label and the same text as a tooltip.</li>
            <li>Both carry the same faint shadow (0 1px 2px, 5%), so they read as a pair.</li>
            <li>8px between parts. Today only when the chosen day is not today; FAQ always.</li>
            <li>The date picker is <code>variant="toolbar"</code>: "Feb 28, 2026", medium, the same field and calendar as the Notifications date filter.</li>
          </ul>
        </Bloque>
      </Lienzo>;
  }
}`,...F.parameters?.docs?.source}}}})))()}L();export{M as Parts,j as Playground,F as Specs,N as States,I as __namedExportsOrder,D as default};