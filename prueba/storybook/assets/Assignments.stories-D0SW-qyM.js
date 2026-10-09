import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,i,n as a,o,r as s,t as c}from"./Assignments-D6nJ6Sv9.js";import{a as l,c as u,d,i as f,l as p,o as m,t as h,u as g}from"./kit-4bQS7S9u.js";import{R as _,h as v,n as y,t as b}from"./finanzas-Cd24vV6l.js";function x({nombre:e}){let[t,n]=(0,S.useState)(!1);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(c,{asignaciones:E(e),onVer:()=>n(!0)}),t&&(0,C.jsx)(a,{arancel:T(e),asignaciones:E(e),onClose:()=>n(!1)})]})}var S,C,w,T,E,D,O,k,A,j,M;function N(){return(N=e((()=>{S=t(),r(),d(),_(),C=n(),w={title:`Components/Finance/Assignments`,parameters:{layout:`padded`,docs:{decisionsFrom:`components/finance/Assignments.tsx`,description:{component:[`La columna **Assignments** de la tabla de Fee Schedules (pedido de Julián; no está en red.dev): a cuántas entidades está linkeado directamente un fee schedule.`,``,`- **AssignmentsCount**: el total. Al pasar el mouse o al tocarlo se abre el desglose (Patients, Carriers, Providers, Locations) con *View assignments*. Con 0 queda en gris y no abre nada.`,`- **AssignmentsDrawer** (*View assignments*, también desde el menú de la fila): la lista de cada tipo con link a su ficha. Para cambiar una asignación se edita esa ficha.`,``,`Los carriers salen de los planes que usan el fee schedule como *Max Allowable Amount Fee Schedule* o en *Fee Schedule By Location*; el resto son asignaciones directas.`,``,`**Probalo:** en *Playground* pasá el mouse por el número o elegí otro fee schedule.`].join(`
`)}}},args:{feeSchedule:`PPO Premium Plan`,vista:`Count`},argTypes:{feeSchedule:{control:`select`,options:b.map(e=>e.nombre),description:`De qué fee schedule.`},vista:{control:`inline-radio`,options:[`Count`,`Drawer`],description:`El número o el drawer.`}}},T=e=>b.find(t=>t.nombre===e)??b[0],E=e=>i(T(e),v,y),D={render:({feeSchedule:e,vista:t})=>t===`Count`?(0,C.jsx)(`div`,{className:`p-6`,children:(0,C.jsx)(x,{nombre:e},e)}):(0,C.jsx)(a,{arancel:T(e),asignaciones:E(e),onClose:()=>{}})},O={parameters:{controls:{disable:!0}},render:()=>(0,C.jsx)(f,{children:(0,C.jsx)(h,{titulo:`Parts`,children:(0,C.jsx)(p,{partes:[[`Número`,`El total, azul con subrayado punteado: se puede consultar.`,`button`],[`Desglose`,`${s.join(`, `)} con su ícono y cantidad; abre con hover o clic, cierra al salir, con Escape o clic afuera.`,`Popover`],[`View assignments`,`Abre el drawer.`,`button`],[`Drawer`,`Una sección por tipo; cada uno con link a su ficha y un detalle (el plan, el cargo, la dirección).`,`ModalShell + DrawerSection`]]})})})},k={parameters:{controls:{disable:!0}},render:()=>(0,C.jsx)(f,{children:(0,C.jsx)(h,{titulo:`States`,children:(0,C.jsx)(m,{children:[`PPO Premium Plan`,`UCR - Red`,`Aetna 2026`,`Cigna DPPO 2027`].map(e=>(0,C.jsx)(l,{titulo:o(E(e))?`${e} · ${o(E(e))}`:`${e} · Empty`,nota:o(E(e))?`Hover o clic: desglose.`:`Sin asignaciones: 0 en gris, sin desglose.`,children:(0,C.jsx)(x,{nombre:e})},e))})})})},A={parameters:{layout:`fullscreen`,controls:{disable:!0},docs:{story:{inline:!1,iframeHeight:640}}},render:()=>(0,C.jsx)(a,{arancel:T(`PPO Premium Plan`),asignaciones:E(`PPO Premium Plan`),onClose:()=>{}})},j={parameters:{controls:{disable:!0}},render:()=>(0,C.jsxs)(f,{children:[(0,C.jsx)(h,{titulo:`Measures`,children:(0,C.jsxs)(u,{encabezado:[`Piece`,`Value`],children:[(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Número`}),(0,C.jsx)(`td`,{className:`tabular-nums`,children:`13px Semibold tabular, 6px a los lados`})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Desglose`}),(0,C.jsx)(`td`,{className:`tabular-nums`,children:`240px, se abre 4px debajo; se cierra 150ms después de salir`})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Drawer`}),(0,C.jsx)(`td`,{className:`tabular-nums`,children:`sm · 480px, pie con Close`})]})]})}),(0,C.jsx)(h,{titulo:`Colors`,children:(0,C.jsxs)(u,{encabezado:[`Piece`,`Token`],children:[(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Número, links`}),(0,C.jsx)(`td`,{children:(0,C.jsx)(g,{nombre:`dash-blue`})})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Hover del número`}),(0,C.jsx)(`td`,{children:(0,C.jsx)(g,{nombre:`info-bg`})})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`0 y tipos vacíos`}),(0,C.jsx)(`td`,{children:(0,C.jsx)(g,{nombre:`ink-faint`})})]})]})})]})},M=[`Playground`,`Parts`,`States`,`Drawer`,`Specs`],D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: ({
    feeSchedule,
    vista
  }) => vista === 'Count' ? <div className="p-6"><Contador key={feeSchedule} nombre={feeSchedule} /></div> : <AssignmentsDrawer arancel={de(feeSchedule)} asignaciones={grupos(feeSchedule)} onClose={() => {}} />
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[['Número', 'El total, azul con subrayado punteado: se puede consultar.', 'button'], ['Desglose', \`\${TIPOS_ASIGNACION.join(', ')} con su ícono y cantidad; abre con hover o clic, cierra al salir, con Escape o clic afuera.\`, 'Popover'], ['View assignments', 'Abre el drawer.', 'button'], ['Drawer', 'Una sección por tipo; cada uno con link a su ficha y un detalle (el plan, el cargo, la dirección).', 'ModalShell + DrawerSection']]} />
      </Bloque>
    </Lienzo>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="States">
        <Muestras>
          {['PPO Premium Plan', 'UCR - Red', 'Aetna 2026', 'Cigna DPPO 2027'].map(n => <Muestra key={n} titulo={totalAsignaciones(grupos(n)) ? \`\${n} · \${totalAsignaciones(grupos(n))}\` : \`\${n} · Empty\`} nota={totalAsignaciones(grupos(n)) ? 'Hover o clic: desglose.' : 'Sin asignaciones: 0 en gris, sin desglose.'}>
              <Contador nombre={n} />
            </Muestra>)}
        </Muestras>
      </Bloque>
    </Lienzo>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen',
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: false,
        iframeHeight: 640
      }
    }
  },
  render: () => <AssignmentsDrawer arancel={de('PPO Premium Plan')} asignaciones={grupos('PPO Premium Plan')} onClose={() => {}} />
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Measures">
        <Tabla encabezado={['Piece', 'Value']}>
          <tr><td className="font-semibold">Número</td><td className="tabular-nums">13px Semibold tabular, 6px a los lados</td></tr>
          <tr><td className="font-semibold">Desglose</td><td className="tabular-nums">240px, se abre 4px debajo; se cierra 150ms después de salir</td></tr>
          <tr><td className="font-semibold">Drawer</td><td className="tabular-nums">sm · 480px, pie con Close</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Piece', 'Token']}>
          <tr><td className="font-semibold">Número, links</td><td><Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Hover del número</td><td><Token nombre="info-bg" /></td></tr>
          <tr><td className="font-semibold">0 y tipos vacíos</td><td><Token nombre="ink-faint" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...j.parameters?.docs?.source}}}})))()}N();export{A as Drawer,O as Parts,D as Playground,j as Specs,k as States,M as __namedExportsOrder,w as default};