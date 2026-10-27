import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./utils-D-bRdWGo.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";import{i,n as a,t as o}from"./Treatments-vh_nTHNT.js";import{h as s,m as c,p as l}from"./estilos-CE-FcrPI.js";import{$ as u,et as d}from"./iframe-DHCzxx8X.js";import{a as f,c as p,d as m,i as h,l as g,r as _,t as v}from"./kit-CWUgB5-0.js";import{a as y,t as b}from"./DashboardRows-CmoVxgJQ.js";import{d as x,r as S}from"./dashboard-data-CcyXyNkI.js";import{n as C,r as w,t as T}from"./show-more-Di8jU_wW.js";var E,D,O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{w(),y(),d(),x(),i(),m(),s(),t(),E=r(),D=S.appointments,O=e=>(0,E.jsx)(`ul`,{className:`flex flex-col gap-3`,children:D.slice(0,e).map((e,t)=>(0,E.jsx)(`li`,{className:l,children:(0,E.jsx)(b,{appt:e})},t))}),k={title:`Elements/Show more`,parameters:{layout:`padded`,docs:{description:{component:['La regla de toda la app para **muchas cards o mucha información** (`@/components/ui/show-more`, Julián, 2026-10-12): se ven los primeros ítems y **"Show N more" abre el resto adentro de un scroll**, sin estirar la página; **"Show less"** vuelve. Así una lista de 35 turnos ocupa lo mismo que una de 5.',``,"**Dónde se usa:** Appointments, Waiting Room y Pending Task del Dashboard; Appointments, Pending Task y Pending documents del Patient Dashboard; Treatments; Today Appointments y Recent Patients de Patients; Find Patient de Billing. Con filas (turnos, tareas), va adentro de *List group*, que pone cada fila en su card; con otras cards (salas, turnos del paciente, planes, pacientes), directo, con la grilla o la columna en `className`.",``,"**Cómo se comporta:** si el total no pasa el tope, no hay botón ni scroll. Abierta, la lista crece hasta `min(70vh, 640px)` (nunca menos que cerrada) y después scrollea; con `enCaja` no crece: mide lo mismo que cerrada y scrollea adentro, para que el panel no se salga de la grilla (Today Appointments y Recent Patients de Patients, Julián, 2026-10-19); un degradé abajo avisa que hay más (en Mac la barra no se ve hasta scrollear) y se va al llegar al final. Si abierta entra entera, no hay degradé (2026-10-13). La zona con scroll se alcanza con Tab y se mueve con las flechas.",``,"**`llenarAlto`** (2026-10-19): sólo junto con `enCaja`, y sólo en el panel que de verdad tiene `flex-1` en una columna ya estirada a la altura de otra cosa (el último de la barra al lado de una tabla: Recent Patients de Patients, Find Patient de Billing). En vez de un `limit` fijo -que se corría cada vez que cambiaba el contenido de al lado-, mide cuántas filas enteras entran en el alto que le toca. Los demás `enCaja` sin esto (Today Appointments, `shrink-0`) siguen con `limit` fijo: no tienen un alto propio del que tirar, y con `llenarAlto` ahí el panel se achica a nada. Ver *States → Fills the height*.",``,`**Probalo:** en *Playground* cambiá el total y el tope desde *Controls*; tocá "Show N more", scrolleá y volvé con "Show less".`].join(`
`)}}},args:{total:20,limit:5,enCaja:!1},argTypes:{total:{control:{type:`range`,min:0,max:35},description:`Cuántos ítems hay.`},limit:{control:{type:`range`,min:1,max:12},description:`Cuántos se ven cerrado. Si el total no lo pasa, no hay botón.`},enCaja:{control:`boolean`,description:`Abierta mide lo mismo que cerrada y scrollea adentro (el panel no crece).`}}},A={controls:{disable:!0}},j={render:e=>(0,E.jsx)(`div`,{className:n(c,`max-w-[420px] p-4`),children:(0,E.jsx)(C,{total:e.total,limit:e.limit,enCaja:e.enCaja,label:`appointments`,children:O},`${e.total}-${e.limit}-${e.enCaja}`)})},M={parameters:A,render:()=>(0,E.jsxs)(h,{children:[(0,E.jsx)(v,{nota:`Cerrada: los primeros ítems y el botón con cuántos faltan. Abierta: la misma lista con scroll, el degradé abajo y Show less.`,children:(0,E.jsxs)(`div`,{className:`grid gap-6 md:grid-cols-2`,children:[(0,E.jsx)(`div`,{className:n(c,`p-4`),children:(0,E.jsx)(C,{total:12,limit:3,label:`appointments`,children:O})}),(0,E.jsx)(_,{selector:`[data-show-more]`,estado:`click`,className:n(c,`p-4`),children:(0,E.jsx)(C,{total:12,limit:3,label:`appointments`,children:O})})]})}),(0,E.jsx)(g,{partes:[[`List`,"Los primeros `limit` ítems, dibujados por la función hija. La grilla o la columna van en className.",`children(cuantos) · className`],[`Show N more`,`Link azul de 12px con chevron: dice cuántos faltan. Abierto, Show less. Lleva aria-expanded.`,`button`],[`Scroll area`,`Abierta: alto máximo min(70vh, 640px), nunca menos que cerrada; role="region" con nombre y foco con Tab.`,`maxHeight · label`],[`Fade`,`Degradé de 32px abajo, del color del fondo (fade), que avisa que hay más; se va al llegar al final.`,`fade`]]})]})},N={parameters:A,render:()=>(0,E.jsxs)(h,{children:[(0,E.jsxs)(`div`,{className:`grid gap-6 md:grid-cols-2`,children:[(0,E.jsx)(f,{titulo:`Closed`,nota:`Cinco de veinte y el botón.`,children:(0,E.jsx)(`div`,{className:n(c,`p-4`),children:(0,E.jsx)(C,{total:20,limit:5,label:`appointments`,children:O})})}),(0,E.jsx)(f,{titulo:`Open, scrolling`,nota:`La lista abierta crece hasta el tope y scrollea; el degradé avisa que sigue.`,children:(0,E.jsx)(_,{selector:`[data-show-more]`,estado:`click`,className:n(c,`p-4`),children:(0,E.jsx)(C,{total:20,limit:5,label:`appointments`,children:O})})}),(0,E.jsx)(f,{titulo:`Open, in a box`,nota:`enCaja: abierta mide lo mismo que cerrada y scrollea adentro; el panel no crece.`,children:(0,E.jsx)(_,{selector:`[data-show-more]`,estado:`click`,className:n(c,`p-4`),children:(0,E.jsx)(C,{total:20,limit:5,enCaja:!0,label:`appointments`,children:O})})}),(0,E.jsx)(f,{titulo:`Fits: no button`,nota:`Si no pasa el tope, no hay botón ni scroll.`,children:(0,E.jsx)(`div`,{className:n(c,`p-4`),children:(0,E.jsx)(C,{total:3,limit:5,label:`appointments`,children:O})})}),(0,E.jsx)(f,{titulo:`Empty`,nota:`Sin ítems no dibuja nada: el panel muestra su EmptyState.`,children:(0,E.jsxs)(`div`,{className:n(c,`p-4 text-[12px] text-ink-muted`),children:[(0,E.jsx)(C,{total:0,limit:5,label:`appointments`,children:O}),`(nothing drawn)`]})}),(0,E.jsx)(f,{titulo:`Open, fits`,nota:`Si abierta entra entera (una o dos de más), no scrollea ni lleva degradé.`,children:(0,E.jsx)(_,{selector:`[data-show-more]`,estado:`click`,className:n(c,`p-4`),children:(0,E.jsx)(C,{total:4,limit:3,label:`rooms`,className:`flex flex-col gap-3`,children:e=>S.rooms.slice(0,e).map((e,t)=>(0,E.jsx)(u,{room:e},t))})})})]}),(0,E.jsx)(f,{titulo:`Fills the height (llenarAlto)`,nota:`La columna de la derecha toma el alto de la de la izquierda (como la tabla de Patients); adentro, la card de arriba es shrink-0 y ShowMore (llenarAlto) se queda con el resto, midiendo cuántas filas enteras entran -nunca un número fijo. Achicá la ventana del navegador para verlo recalcular.`,children:(0,E.jsxs)(`div`,{className:`flex items-start gap-4`,children:[(0,E.jsx)(`div`,{className:n(c,`flex h-[420px] w-[260px] items-center justify-center p-4 text-[12px] text-ink-muted`),children:`la tabla (420px)`}),(0,E.jsxs)(`div`,{className:`flex h-[420px] w-[260px] flex-col gap-3`,children:[(0,E.jsx)(`div`,{className:n(c,`shrink-0 p-3 text-[12px] text-ink-muted`),children:`otro panel, shrink-0`}),(0,E.jsx)(`div`,{className:n(c,`flex min-h-0 flex-1 flex-col p-3`),children:(0,E.jsx)(C,{total:20,limit:3,enCaja:!0,llenarAlto:!0,label:`appointments`,className:`flex flex-col gap-3`,children:e=>D.slice(0,e).map((e,t)=>(0,E.jsx)(`div`,{className:l,children:(0,E.jsx)(b,{appt:e})},t))})})]})]})}),(0,E.jsx)(f,{titulo:`Cards in a grid, on the page`,nota:`Treatments (en la app, de a cuatro): los primeros planes y el resto con scroll; el degradé va del color de la página.`,children:(0,E.jsx)(`div`,{className:`bg-page-background rounded-lg p-4`,children:(0,E.jsx)(C,{total:o.length,limit:2,label:`treatment plans`,fade:`from-page-background`,className:`grid gap-5 lg:grid-cols-2`,children:e=>o.slice(0,e).map((e,t)=>(0,E.jsx)(a,{plan:e},t))})})})]})},P={parameters:A,render:()=>(0,E.jsxs)(h,{children:[(0,E.jsx)(v,{titulo:`Behavior`,nota:`De show-more.tsx.`,children:(0,E.jsxs)(p,{encabezado:[`Part`,`Value`],minimo:480,children:[(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{className:`font-semibold`,children:`Open height`}),(0,E.jsxs)(`td`,{className:`font-mono text-[12px]`,children:[`max(closed height, `,T,`)`]})]}),(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{className:`font-semibold`,children:`Open height, enCaja`}),(0,E.jsx)(`td`,{className:`font-mono text-[12px]`,children:`closed height (no growth)`})]}),(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{className:`font-semibold`,children:`Closed height, llenarAlto`}),(0,E.jsx)(`td`,{className:`font-mono text-[12px]`,children:"floor((caja + gap) / (fila + gap)) filas, no `limit`"})]}),(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{className:`font-semibold`,children:`Fade`}),(0,E.jsx)(`td`,{children:`32px, from the background color (white in a card, page-background on the page) to transparent`})]}),(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{className:`font-semibold`,children:`Button`}),(0,E.jsx)(`td`,{children:`12px Medium, dash-blue, chevron 14px; underline on hover`})]}),(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{className:`font-semibold`,children:`Gap list → button`}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:`8px`})]})]})}),(0,E.jsx)(v,{titulo:`Limits in the app`,nota:`Cuántos se ven cerrado en cada lugar. Con llenarAlto el número no es fijo -medido-; se anota el de la tabla de ejemplo del día de la demo.`,children:(0,E.jsxs)(p,{encabezado:[`Screen`,`Block`,`Limit`],minimo:480,children:[(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{children:`Dashboard`}),(0,E.jsx)(`td`,{children:`Appointments · Waiting Room · Pending Task`}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:`5`})]}),(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{children:`Patient Dashboard`}),(0,E.jsx)(`td`,{children:`Pending Task · Appointments`}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:`3`})]}),(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{children:`Patient Dashboard`}),(0,E.jsx)(`td`,{children:`Pending documents`}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:`4`})]}),(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{children:`Treatments`}),(0,E.jsx)(`td`,{children:`Treatment plans`}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:`4`})]}),(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{children:`Patients`}),(0,E.jsx)(`td`,{children:`Today Appointments`}),(0,E.jsx)(`td`,{className:`tabular-nums`,children:`4`})]}),(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{children:`Patients`}),(0,E.jsx)(`td`,{children:`Recent Patients`}),(0,E.jsx)(`td`,{children:`medido (llenarAlto), ~4 a 1440px`})]}),(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{children:`Billing`}),(0,E.jsx)(`td`,{children:`Find Patient`}),(0,E.jsx)(`td`,{children:`medido (llenarAlto), ~4 a 1440px`})]})]})})]})},F=[`Playground`,`Parts`,`States`,`Specs`],j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: a => <div className={cn(TARJETA_PANEL, 'max-w-[420px] p-4')}>
      <ShowMore key={\`\${a.total}-\${a.limit}-\${a.enCaja}\`} total={a.total} limit={a.limit} enCaja={a.enCaja} label="appointments">{filas}</ShowMore>
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
        <Muestra titulo="Open, in a box" nota="enCaja: abierta mide lo mismo que cerrada y scrollea adentro; el panel no crece.">
          <Forzar selector="[data-show-more]" estado="click" className={cn(TARJETA_PANEL, 'p-4')}>
            <ShowMore total={20} limit={5} enCaja label="appointments">{filas}</ShowMore>
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
      <Muestra titulo="Fills the height (llenarAlto)" nota="La columna de la derecha toma el alto de la de la izquierda (como la tabla de Patients); adentro, la card de arriba es shrink-0 y ShowMore (llenarAlto) se queda con el resto, midiendo cuántas filas enteras entran -nunca un número fijo. Achicá la ventana del navegador para verlo recalcular.">
        <div className="flex items-start gap-4">
          <div className={cn(TARJETA_PANEL, 'flex h-[420px] w-[260px] items-center justify-center p-4 text-[12px] text-ink-muted')}>
            la tabla (420px)
          </div>
          <div className="flex h-[420px] w-[260px] flex-col gap-3">
            <div className={cn(TARJETA_PANEL, 'shrink-0 p-3 text-[12px] text-ink-muted')}>otro panel, shrink-0</div>
            {/* flex flex-col: como el body de Panel -un panel de verdad adentro de una columna estirada-, para que el
                flex-1 de ShowMore (llenarAlto) tenga de dónde tirar. */}
            <div className={cn(TARJETA_PANEL, 'flex min-h-0 flex-1 flex-col p-3')}>
              {/* Sin el <ul> de \`filas\`: llenarAlto mide el primer hijo del div de contenido -tiene que ser una fila,
                  no una lista entera- así que acá el array de filas va directo, como en Recent Patients y Find
                  Patient (PatientCard, ResultadoPaciente), sin envolverlas en un <ul>. */}
              <ShowMore total={20} limit={3} enCaja llenarAlto label="appointments" className="flex flex-col gap-3">
                {n => TURNOS.slice(0, n).map((a, i) => <div key={i} className={TARJETA_INTERNA}><AppointmentRow appt={a} /></div>)}
              </ShowMore>
            </div>
          </div>
        </div>
      </Muestra>
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
          <tr><td className="font-semibold">Open height, enCaja</td><td className="font-mono text-[12px]">closed height (no growth)</td></tr>
          <tr><td className="font-semibold">Closed height, llenarAlto</td><td className="font-mono text-[12px]">floor((caja + gap) / (fila + gap)) filas, no \`limit\`</td></tr>
          <tr><td className="font-semibold">Fade</td><td>32px, from the background color (white in a card, page-background on the page) to transparent</td></tr>
          <tr><td className="font-semibold">Button</td><td>12px Medium, dash-blue, chevron 14px; underline on hover</td></tr>
          <tr><td className="font-semibold">Gap list → button</td><td className="tabular-nums">8px</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Limits in the app" nota="Cuántos se ven cerrado en cada lugar. Con llenarAlto el número no es fijo -medido-; se anota el de la tabla de ejemplo del día de la demo.">
        <Tabla encabezado={['Screen', 'Block', 'Limit']} minimo={480}>
          <tr><td>Dashboard</td><td>Appointments · Waiting Room · Pending Task</td><td className="tabular-nums">5</td></tr>
                    <tr><td>Patient Dashboard</td><td>Pending Task · Appointments</td><td className="tabular-nums">3</td></tr>
          <tr><td>Patient Dashboard</td><td>Pending documents</td><td className="tabular-nums">4</td></tr>
          <tr><td>Treatments</td><td>Treatment plans</td><td className="tabular-nums">4</td></tr>
          <tr><td>Patients</td><td>Today Appointments</td><td className="tabular-nums">4</td></tr>
          <tr><td>Patients</td><td>Recent Patients</td><td>medido (llenarAlto), ~4 a 1440px</td></tr>
          <tr><td>Billing</td><td>Find Patient</td><td>medido (llenarAlto), ~4 a 1440px</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...P.parameters?.docs?.source}}}})))()}I();export{M as Parts,j as Playground,P as Specs,N as States,F as __namedExportsOrder,k as default};