import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{i as r,n as i}from"./button-R5lrVQ2-.js";import{c as a,d as o,f as s,g as c,h as l,i as u,n as d,o as f,r as p,t as m,u as h}from"./kit-4bQS7S9u.js";import{i as g,n as _,u as v}from"./dashboard-data-7AI3s00y.js";import{i as y,r as b,t as x}from"./Dashboard-DwUaSb9s.js";function S({inicial:e=g,marcados:t=!0}){let[n,r]=(0,T.useState)(e);return(0,E.jsx)(b,{value:n,onChange:r,marked:t?_:[]})}function C({inicial:e}){let[t,n]=(0,T.useState)(e);return(0,E.jsx)(x,{label:`Provider`,options:[`Dr. Elena Martinez`,`Dr. Emily Chen`],value:t,onChange:n})}function w(){let e=(0,T.useRef)(null),[t,n]=(0,T.useState)([]);return(0,T.useLayoutEffect)(()=>{n(N.map(([,t])=>{let n=e.current?.querySelector(t);return n?s(n):null}))},[]),(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(`div`,{ref:e,children:(0,E.jsx)(S,{marcados:!1})}),(0,E.jsx)(a,{encabezado:[`Part`,`Height`,`Width`,`Padding`,`Text`,`Radius`,`Border`,`Icon`],minimo:820,children:N.map(([e],n)=>(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{className:`font-semibold`,children:e}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:t[n]?.alto}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:t[n]?.ancho}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:t[n]?.padding}),(0,E.jsxs)(`td`,{className:`tabular-nums`,children:[t[n]?.texto,` · `,t[n]?.peso]}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:t[n]?.radio}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:t[n]?.borde}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:t[n]?.icono})]},e))})]})}var T,E,D,O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{T=t(),y(),v(),r(),o(),l(),E=n(),D={title:`Pages/Parts/Dashboard`,parameters:{layout:`padded`,docs:{decisionsFrom:`pages/Dashboard.tsx`,description:{component:["Las partes propias del dashboard (`@/pages/Dashboard`): la **fila de fecha** de arriba, que manda sobre toda la pantalla, y el **botón de filtro** de cada panel. La pantalla completa está en *Pages*.",``,`**Cómo se usa:** el selector elige el día; *Today* vuelve a hoy sin abrir el calendario y sólo aparece cuando el día elegido no es hoy. Los dos miden 32px de alto, como el resto de los inputs de la app.`,``,`**Probalo:** en *Playground* elegí el día y los días marcados desde *Controls*; tocá *Today* y el botón se va.`].join(`
`)}}},args:{day:`Another day`,markedDays:!0},argTypes:{day:{control:`inline-radio`,options:[`Another day`,`Today`],description:`El día con el que arranca. En hoy, el botón Today no aparece.`},markedDays:{control:`boolean`,description:`El punto azul en los días con turnos, dentro del calendario.`}}},O={controls:{disable:!0}},k=`button[title="Go to today"]`,A={render:e=>(0,E.jsx)(`div`,{className:`h-[400px] bg-page-background p-4`,children:(0,E.jsx)(S,{inicial:e.day===`Today`?new Date:g,marcados:e.markedDays},`${e.day}-${e.markedDays}`)})},j={parameters:O,render:()=>(0,E.jsxs)(u,{children:[(0,E.jsxs)(m,{titulo:`Date row`,nota:`Arriba de las tres columnas: si viviera adentro de Appointments parecería filtrar sólo esa.`,children:[(0,E.jsx)(f,{children:(0,E.jsx)(d,{rotulo:`Date picker · Today · scope line`,children:(0,E.jsx)(S,{marcados:!1})})}),(0,E.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,E.jsxs)(`li`,{children:[(0,E.jsx)(`strong`,{children:`Date picker:`}),` el día de toda la pantalla, en dd-mm-aaaa.`]}),(0,E.jsxs)(`li`,{children:[(0,E.jsx)(`strong`,{children:`Today:`}),` `,(0,E.jsx)(`code`,{children:`Button`}),` secondary md con el ícono CalendarClock. Sólo cuando el día no es hoy.`]}),(0,E.jsxs)(`li`,{children:[(0,E.jsx)(`strong`,{children:`Scope line:`}),` dice a qué afecta la fecha, 12px en `,(0,E.jsx)(`code`,{children:`ink-muted`}),`.`]})]})]}),(0,E.jsx)(m,{titulo:`Panel filter button`,nota:`El embudo de Appointments y de Pending Task: FilterMenu en sm.`,children:(0,E.jsx)(`div`,{className:`h-48`,children:(0,E.jsx)(C,{inicial:[]})})})]})},M={parameters:O,render:()=>(0,E.jsxs)(u,{children:[(0,E.jsx)(m,{titulo:`Date row`,children:(0,E.jsxs)(`div`,{className:`flex flex-col gap-6`,children:[(0,E.jsx)(d,{rotulo:`Another day: Today shows up`,children:(0,E.jsx)(S,{})}),(0,E.jsx)(d,{rotulo:`Today: the button goes away`,children:(0,E.jsx)(S,{inicial:new Date})}),(0,E.jsx)(d,{rotulo:`Today, hover`,children:(0,E.jsx)(p,{selector:k,estado:`hover`,children:(0,E.jsx)(S,{})})}),(0,E.jsx)(d,{rotulo:`Calendar open`,children:(0,E.jsx)(p,{selector:`button[aria-haspopup]`,estado:`click`,className:`h-[380px]`,children:(0,E.jsx)(S,{})})})]})}),(0,E.jsx)(m,{titulo:`Panel filter button`,children:(0,E.jsxs)(f,{className:`h-48 items-start`,children:[(0,E.jsx)(d,{rotulo:`No filter`,children:(0,E.jsx)(C,{inicial:[]})}),(0,E.jsx)(d,{rotulo:`One chosen`,children:(0,E.jsx)(C,{inicial:[`Dr. Emily Chen`]})})]})})]})},N=[[`Date picker`,`button[aria-haspopup]`],[`Today`,k]],P={parameters:O,render:()=>{let e=c(i.secondary);return(0,E.jsxs)(u,{children:[(0,E.jsx)(m,{titulo:`Date row`,nota:`Leído de la fila ya dibujada. El selector y Today miden lo mismo de alto: si uno cambia, el otro tiene que acompañar.`,children:(0,E.jsx)(w,{})}),(0,E.jsx)(m,{titulo:`Today colors`,nota:`Los de Button secondary (button.tsx y src/index.css).`,children:(0,E.jsx)(a,{encabezado:[`Fill`,`Text`,`Border`,`Hover fill`],minimo:560,children:(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{children:(0,E.jsx)(h,{nombre:e.fondo})}),(0,E.jsx)(`td`,{children:(0,E.jsx)(h,{nombre:e.texto})}),(0,E.jsx)(`td`,{children:(0,E.jsx)(h,{nombre:e.borde})}),(0,E.jsx)(`td`,{children:(0,E.jsx)(h,{nombre:e.fondoHover})})]})})}),(0,E.jsx)(m,{titulo:`Rules`,children:(0,E.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,E.jsxs)(`li`,{children:[`Today is `,(0,E.jsx)(`code`,{children:`Button variant="secondary" size="md"`}),`: 32px, the date picker height. Never a hand-made button.`]}),(0,E.jsx)(`li`,{children:`Both carry the same faint shadow (0 1px 2px, 5%), so they read as a pair.`}),(0,E.jsx)(`li`,{children:`8px between parts. Today only when the chosen day is not today.`})]})})]})}},F=[`Playground`,`Parts`,`States`,`Specs`],A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: args => <div className="h-[400px] bg-page-background p-4">
      <Fecha key={\`\${args.day}-\${args.markedDays}\`} inicial={args.day === 'Today' ? new Date() : HOY_DEMO} marcados={args.markedDays} />
    </div>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Date row" nota="Arriba de las tres columnas: si viviera adentro de Appointments parecería filtrar sólo esa.">
        <Muestras>
          <ConRotulo rotulo="Date picker · Today · scope line"><Fecha marcados={false} /></ConRotulo>
        </Muestras>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li><strong>Date picker:</strong> el día de toda la pantalla, en dd-mm-aaaa.</li>
          <li><strong>Today:</strong> <code>Button</code> secondary md con el ícono CalendarClock. Sólo cuando el día no es hoy.</li>
          <li><strong>Scope line:</strong> dice a qué afecta la fecha, 12px en <code>ink-muted</code>.</li>
        </ul>
      </Bloque>
      <Bloque titulo="Panel filter button" nota="El embudo de Appointments y de Pending Task: FilterMenu en sm.">
        <div className="h-48"><Filtro inicial={[]} /></div>
      </Bloque>
    </Lienzo>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Date row">
        <div className="flex flex-col gap-6">
          <ConRotulo rotulo="Another day: Today shows up"><Fecha /></ConRotulo>
          <ConRotulo rotulo="Today: the button goes away"><Fecha inicial={new Date()} /></ConRotulo>
          <ConRotulo rotulo="Today, hover"><Forzar selector={HOY_SEL} estado="hover"><Fecha /></Forzar></ConRotulo>
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
}`,...M.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => {
    const t = tokensDe(BUTTON_VARIANTS.secondary);
    return <Lienzo>
        <Bloque titulo="Date row" nota="Leído de la fila ya dibujada. El selector y Today miden lo mismo de alto: si uno cambia, el otro tiene que acompañar.">
          <MedidasFila />
        </Bloque>
        <Bloque titulo="Today colors" nota="Los de Button secondary (button.tsx y src/index.css).">
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
            <li>Both carry the same faint shadow (0 1px 2px, 5%), so they read as a pair.</li>
            <li>8px between parts. Today only when the chosen day is not today.</li>
          </ul>
        </Bloque>
      </Lienzo>;
  }
}`,...P.parameters?.docs?.source}}}})))()}I();export{j as Parts,A as Playground,P as Specs,M as States,F as __namedExportsOrder,D as default};