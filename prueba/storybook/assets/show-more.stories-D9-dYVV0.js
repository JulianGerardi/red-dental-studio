import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./utils-D-bRdWGo.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";import{i,n as a,t as o}from"./Treatments-B2CQUf2D.js";import{h as s,m as c,p as l}from"./estilos-CE-FcrPI.js";import{$ as u,Q as d}from"./iframe-CcYDup-T.js";import{a as f,c as p,d as m,i as h,l as g,r as _,t as v}from"./kit-CWUgB5-0.js";import{o as y,t as b}from"./DashboardRows-BWY7wqW-.js";import{d as x,r as S}from"./dashboard-data-DDbp7mpx.js";import{n as C,r as w,t as T}from"./show-more-Czy6m3CT.js";var E,D,O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{w(),y(),u(),x(),i(),m(),s(),t(),E=r(),D=S.appointments,O=e=>(0,E.jsx)(`ul`,{className:`flex flex-col gap-3`,children:D.slice(0,e).map((e,t)=>(0,E.jsx)(`li`,{className:l,children:(0,E.jsx)(b,{appt:e})},t))}),k={title:`Elements/Show more`,parameters:{layout:`padded`,docs:{description:{component:['La regla de toda la app para **muchas cards o mucha información** (`@/components/ui/show-more`, Julián, 2026-10-12): se ven los primeros ítems y **"Show N more" abre el resto adentro de un scroll**, sin estirar la página; **"Show less"** vuelve. Así una lista de 35 turnos ocupa lo mismo que una de 5.',``,"**Dónde se usa:** Appointments, Waiting Room y Pending Task del Dashboard; Appointments, Pending Task y Pending documents del Patient Dashboard; Treatments; Today Appointments y Recent Patients de Patients. Con filas (turnos, tareas), va adentro de *List group*, que pone cada fila en su card; con otras cards (salas, turnos del paciente, planes), directo, con la grilla o la columna en `className`.",``,"**Cómo se comporta:** si el total no pasa el tope, no hay botón ni scroll. Abierta, la lista crece hasta `min(70vh, 640px)` (nunca menos que cerrada) y después scrollea; un degradé abajo avisa que hay más (en Mac la barra no se ve hasta scrollear) y se va al llegar al final. Si abierta entra entera, no hay degradé (2026-10-13). La zona con scroll se alcanza con Tab y se mueve con las flechas.",``,`**Probalo:** en *Playground* cambiá el total y el tope desde *Controls*; tocá "Show N more", scrolleá y volvé con "Show less".`].join(`
`)}}},args:{total:20,limit:5},argTypes:{total:{control:{type:`range`,min:0,max:35},description:`Cuántos ítems hay.`},limit:{control:{type:`range`,min:1,max:12},description:`Cuántos se ven cerrado. Si el total no lo pasa, no hay botón.`}}},A={controls:{disable:!0}},j={render:e=>(0,E.jsx)(`div`,{className:n(c,`max-w-[420px] p-4`),children:(0,E.jsx)(C,{total:e.total,limit:e.limit,label:`appointments`,children:O},`${e.total}-${e.limit}`)})},M={parameters:A,render:()=>(0,E.jsxs)(h,{children:[(0,E.jsx)(v,{nota:`Cerrada: los primeros ítems y el botón con cuántos faltan. Abierta: la misma lista con scroll, el degradé abajo y Show less.`,children:(0,E.jsxs)(`div`,{className:`grid gap-6 md:grid-cols-2`,children:[(0,E.jsx)(`div`,{className:n(c,`p-4`),children:(0,E.jsx)(C,{total:12,limit:3,label:`appointments`,children:O})}),(0,E.jsx)(_,{selector:`[data-show-more]`,estado:`click`,className:n(c,`p-4`),children:(0,E.jsx)(C,{total:12,limit:3,label:`appointments`,children:O})})]})}),(0,E.jsx)(g,{partes:[[`List`,"Los primeros `limit` ítems, dibujados por la función hija. La grilla o la columna van en className.",`children(cuantos) · className`],[`Show N more`,`Link azul de 12px con chevron: dice cuántos faltan. Abierto, Show less. Lleva aria-expanded.`,`button`],[`Scroll area`,`Abierta: alto máximo min(70vh, 640px), nunca menos que cerrada; role="region" con nombre y foco con Tab.`,`maxHeight · label`],[`Fade`,`Degradé de 32px abajo, del color del fondo (fade), que avisa que hay más; se va al llegar al final.`,`fade`]]})]})},N={parameters:A,render:()=>(0,E.jsxs)(h,{children:[(0,E.jsxs)(`div`,{className:`grid gap-6 md:grid-cols-2`,children:[(0,E.jsx)(f,{titulo:`Closed`,nota:`Cinco de veinte y el botón.`,children:(0,E.jsx)(`div`,{className:n(c,`p-4`),children:(0,E.jsx)(C,{total:20,limit:5,label:`appointments`,children:O})})}),(0,E.jsx)(f,{titulo:`Open, scrolling`,nota:`La lista abierta crece hasta el tope y scrollea; el degradé avisa que sigue.`,children:(0,E.jsx)(_,{selector:`[data-show-more]`,estado:`click`,className:n(c,`p-4`),children:(0,E.jsx)(C,{total:20,limit:5,label:`appointments`,children:O})})}),(0,E.jsx)(f,{titulo:`Fits: no button`,nota:`Si no pasa el tope, no hay botón ni scroll.`,children:(0,E.jsx)(`div`,{className:n(c,`p-4`),children:(0,E.jsx)(C,{total:3,limit:5,label:`appointments`,children:O})})}),(0,E.jsx)(f,{titulo:`Empty`,nota:`Sin ítems no dibuja nada: el panel muestra su EmptyState.`,children:(0,E.jsxs)(`div`,{className:n(c,`p-4 text-[12px] text-ink-muted`),children:[(0,E.jsx)(C,{total:0,limit:5,label:`appointments`,children:O}),`(nothing drawn)`]})}),(0,E.jsx)(f,{titulo:`Open, fits`,nota:`Si abierta entra entera (una o dos de más), no scrollea ni lleva degradé.`,children:(0,E.jsx)(_,{selector:`[data-show-more]`,estado:`click`,className:n(c,`p-4`),children:(0,E.jsx)(C,{total:4,limit:3,label:`rooms`,className:`flex flex-col gap-3`,children:e=>S.rooms.slice(0,e).map((e,t)=>(0,E.jsx)(d,{room:e},t))})})})]}),(0,E.jsx)(f,{titulo:`Cards in a grid, on the page`,nota:`Treatments (en la app, de a cuatro): los primeros planes y el resto con scroll; el degradé va del color de la página.`,children:(0,E.jsx)(`div`,{className:`bg-page-background rounded-lg p-4`,children:(0,E.jsx)(C,{total:o.length,limit:2,label:`treatment plans`,fade:`from-page-background`,className:`grid gap-5 lg:grid-cols-2`,children:e=>o.slice(0,e).map((e,t)=>(0,E.jsx)(a,{plan:e},t))})})})]})},P={parameters:A,render:()=>(0,E.jsxs)(h,{children:[(0,E.jsx)(v,{titulo:`Behavior`,nota:`De show-more.tsx.`,children:(0,E.jsxs)(p,{encabezado:[`Part`,`Value`],minimo:480,children:[(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{className:`font-semibold`,children:`Open height`}),(0,E.jsxs)(`td`,{className:`font-mono text-[12px]`,children:[`max(closed height, `,T,`)`]})]}),(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{className:`font-semibold`,children:`Fade`}),(0,E.jsx)(`td`,{children:`32px, from the background color (white in a card, page-background on the page) to transparent`})]}),(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{className:`font-semibold`,children:`Button`}),(0,E.jsx)(`td`,{children:`12px Medium, dash-blue, chevron 14px; underline on hover`})]}),(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{className:`font-semibold`,children:`Gap list → button`}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:`8px`})]})]})}),(0,E.jsx)(v,{titulo:`Limits in the app`,nota:`Cuántos se ven cerrado en cada lugar.`,children:(0,E.jsxs)(p,{encabezado:[`Screen`,`Block`,`Limit`],minimo:480,children:[(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{children:`Dashboard`}),(0,E.jsx)(`td`,{children:`Appointments · Waiting Room · Pending Task`}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:`5`})]}),(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{children:`Patient Dashboard`}),(0,E.jsx)(`td`,{children:`Pending Task · Appointments`}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:`3`})]}),(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{children:`Patient Dashboard`}),(0,E.jsx)(`td`,{children:`Pending documents`}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:`4`})]}),(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{children:`Treatments`}),(0,E.jsx)(`td`,{children:`Treatment plans`}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:`4`})]}),(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{children:`Patients`}),(0,E.jsx)(`td`,{children:`Today Appointments`}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:`4`})]}),(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{children:`Patients`}),(0,E.jsx)(`td`,{children:`Recent Patients`}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:`3`})]})]})})]})},F=[`Playground`,`Parts`,`States`,`Specs`],j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: a => <div className={cn(TARJETA_PANEL, 'max-w-[420px] p-4')}>
      <ShowMore key={\`\${a.total}-\${a.limit}\`} total={a.total} limit={a.limit} label="appointments">{filas}</ShowMore>
    </div>
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque nota="Cerrada: los primeros ítems y el botón con cuántos faltan. Abierta: la misma lista con scroll, el degradé abajo y Show less.">
        <div className="grid gap-6 md:grid-cols-2">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ShowMore total={12} limit={3} label="appointments">{filas}</ShowMore></div>
          <Forzar selector="[data-show-more]" estado="click" className={cn(TARJETA_PANEL, 'p-4')}>
            <ShowMore total={12} limit={3} label="appointments">{filas}</ShowMore>
          </Forzar>
        </div>
      </Bloque>
      <TablaPartes partes={[['List', 'Los primeros \`limit\` ítems, dibujados por la función hija. La grilla o la columna van en className.', 'children(cuantos) · className'], ['Show N more', 'Link azul de 12px con chevron: dice cuántos faltan. Abierto, Show less. Lleva aria-expanded.', 'button'], ['Scroll area', 'Abierta: alto máximo min(70vh, 640px), nunca menos que cerrada; role="region" con nombre y foco con Tab.', 'maxHeight · label'], ['Fade', 'Degradé de 32px abajo, del color del fondo (fade), que avisa que hay más; se va al llegar al final.', 'fade']]} />
    </Lienzo>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="Closed" nota="Cinco de veinte y el botón.">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ShowMore total={20} limit={5} label="appointments">{filas}</ShowMore></div>
        </Muestra>
        <Muestra titulo="Open, scrolling" nota="La lista abierta crece hasta el tope y scrollea; el degradé avisa que sigue.">
          <Forzar selector="[data-show-more]" estado="click" className={cn(TARJETA_PANEL, 'p-4')}>
            <ShowMore total={20} limit={5} label="appointments">{filas}</ShowMore>
          </Forzar>
        </Muestra>
        <Muestra titulo="Fits: no button" nota="Si no pasa el tope, no hay botón ni scroll.">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ShowMore total={3} limit={5} label="appointments">{filas}</ShowMore></div>
        </Muestra>
        <Muestra titulo="Empty" nota="Sin ítems no dibuja nada: el panel muestra su EmptyState.">
          <div className={cn(TARJETA_PANEL, 'p-4 text-[12px] text-ink-muted')}><ShowMore total={0} limit={5} label="appointments">{filas}</ShowMore>(nothing drawn)</div>
        </Muestra>
        <Muestra titulo="Open, fits" nota="Si abierta entra entera (una o dos de más), no scrollea ni lleva degradé.">
          <Forzar selector="[data-show-more]" estado="click" className={cn(TARJETA_PANEL, 'p-4')}>
            <ShowMore total={4} limit={3} label="rooms" className="flex flex-col gap-3">
              {n => DIA_CARGADO.rooms.slice(0, n).map((r, i) => <OperatoryCard key={i} room={r} />)}
            </ShowMore>
          </Forzar>
        </Muestra>
      </div>
      <Muestra titulo="Cards in a grid, on the page" nota="Treatments (en la app, de a cuatro): los primeros planes y el resto con scroll; el degradé va del color de la página.">
        <div className="bg-page-background rounded-lg p-4">
          <ShowMore total={PLANS.length} limit={2} label="treatment plans" fade="from-page-background" className="grid gap-5 lg:grid-cols-2">
            {n => PLANS.slice(0, n).map((p, i) => <TreatmentCard key={i} plan={p} />)}
          </ShowMore>
        </div>
      </Muestra>
    </Lienzo>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Behavior" nota="De show-more.tsx.">
        <Tabla encabezado={['Part', 'Value']} minimo={480}>
          <tr><td className="font-semibold">Open height</td><td className="font-mono text-[12px]">max(closed height, {SHOW_MORE_ALTO})</td></tr>
          <tr><td className="font-semibold">Fade</td><td>32px, from the background color (white in a card, page-background on the page) to transparent</td></tr>
          <tr><td className="font-semibold">Button</td><td>12px Medium, dash-blue, chevron 14px; underline on hover</td></tr>
          <tr><td className="font-semibold">Gap list → button</td><td className="tabular-nums">8px</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Limits in the app" nota="Cuántos se ven cerrado en cada lugar.">
        <Tabla encabezado={['Screen', 'Block', 'Limit']} minimo={480}>
          <tr><td>Dashboard</td><td>Appointments · Waiting Room · Pending Task</td><td className="tabular-nums">5</td></tr>
                    <tr><td>Patient Dashboard</td><td>Pending Task · Appointments</td><td className="tabular-nums">3</td></tr>
          <tr><td>Patient Dashboard</td><td>Pending documents</td><td className="tabular-nums">4</td></tr>
          <tr><td>Treatments</td><td>Treatment plans</td><td className="tabular-nums">4</td></tr>
          <tr><td>Patients</td><td>Today Appointments</td><td className="tabular-nums">4</td></tr>
          <tr><td>Patients</td><td>Recent Patients</td><td className="tabular-nums">3</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...P.parameters?.docs?.source}}}})))()}I();export{M as Parts,j as Playground,P as Specs,N as States,F as __namedExportsOrder,k as default};