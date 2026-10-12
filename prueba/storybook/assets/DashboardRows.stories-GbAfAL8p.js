import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./utils-D-bRdWGo.js";import{t as r}from"./jsx-runtime-DeHZSEgm.js";import{a as i,c as a,d as o,f as s,i as c,l,n as u,o as d,r as f,s as p,t as m,u as h}from"./DashboardRows-yN_DDvpq.js";import{h as g,m as _}from"./estilos-CE-FcrPI.js";import{d as v,n as y}from"./calendar-data-DcMkX9Kf.js";import{a as b,c as x,d as S,i as C,l as w,p as T,t as E,u as D}from"./kit-4bQS7S9u.js";import{i as O,p as k}from"./dashboard-data-DGHlVgi5.js";function A(){let e=T(`[data-appt-row]`),t=T(`[data-appt-row] button span span`);return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(`div`,{ref:e.ref,children:(0,j.jsx)(`div`,{ref:t.ref,children:(0,j.jsx)(L,{ancho:400,children:(0,j.jsx)(`li`,{children:(0,j.jsx)(m,{appt:N.waiting,etapa:`waiting`,onSelect:()=>{}})})})})}),(0,j.jsxs)(x,{encabezado:[`Part`,`Height`,`Padding`,`Text`,`Gap`],minimo:560,children:[(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Row`}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:e.m?.alto}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:e.m?.padding}),(0,j.jsx)(`td`,{children:`—`}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:e.m?.gap})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Name`}),(0,j.jsx)(`td`,{children:`—`}),(0,j.jsx)(`td`,{children:`—`}),(0,j.jsxs)(`td`,{className:`tabular-nums`,children:[t.m?.texto,` · `,t.m?.peso]}),(0,j.jsx)(`td`,{children:`—`})]})]})]})}var j,M,N,P,F,I,L,R,z,B,V,H,U,W,G;function K(){return(K=e((()=>{l(),k(),v(),S(),g(),t(),j=r(),M={name:`Emily Clark`,initials:`EC`,provider:`Dr. Emily Chen`,operatory:`Operatory 3`,time:`10:45`},N={upcoming:M,waiting:{...M,espera:27},"in-chair":{...M,time:`09:30`,enSillon:`09:31`},done:{...M,time:`08:15`,completado:!0}},P=O.tasks[0],F=[{name:`Operatory 1`,status:`Busy`,patientsToday:8,provider:`Dr. Elena Martinez`,paciente:`Lucia Vidal`},{name:`Operatory 6`,status:`Available`,patientsToday:0,provider:`Hygiene`},{name:`Operatory 7`,status:`Unavailable`,patientsToday:0,provider:`Maintenance`}],I=Object.keys(u),L=({ancho:e,children:t})=>(0,j.jsx)(`div`,{className:n(_,`max-w-full p-3`),style:e?{width:e}:void 0,children:(0,j.jsx)(`ul`,{className:`flex flex-col divide-y divide-line-soft rounded-lg bg-white shadow-hairline`,children:t})}),R={title:`Components/Dashboard/Dashboard rows`,parameters:{layout:`padded`,docs:{description:{component:["Las filas del Dashboard con volumen (`@/components/dashboard/DashboardRows`), de la propuesta del 2026-10-12: una fila por turno o tarea en lugar de una card de 190px. Cada fila lleva **la barra del color de su estado en Scheduling** (Booked azul, Check-in verde, In progress violeta, Fulfilled verde claro) y **una sola acción, la que sigue**: Check In → Seat → Check Out. El próximo paciente es la única pieza con el botón azul (`NextAppointment`).",``,"**Se adaptan al ancho de su lista**, no al de la pantalla (`@container`): angosta en dos renglones; por debajo de 384px los minutos bajan al segundo renglón; desde 768px en columnas, como una tabla. Las salas van en una tira (`RoomStrip`).",``,`**Probalo:** en *Playground* cambiá la pieza, la etapa y el ancho desde *Controls*; tocá el nombre (abre la ficha rápida en la app) y el kebab.`].join(`
`)}}},args:{piece:`Appointment row`,stage:`waiting`,width:400,waitMinutes:27,dueInDays:-3,newPatient:!1,selected:!1},argTypes:{piece:{control:`inline-radio`,options:[`Appointment row`,`Next appointment`,`Task row`],description:`Qué pieza se ve.`},stage:{control:`inline-radio`,options:I,description:`Etapa del turno: color de la barra y acción.`},width:{control:{type:`range`,min:300,max:1100,step:10},description:`Ancho de la lista. Menos de 384: minutos abajo. Desde 768: columnas.`},waitMinutes:{control:{type:`range`,min:0,max:45},description:`Minutos en la sala de espera: ámbar desde 15, rojo desde 25.`},dueInDays:{control:{type:`range`,min:-7,max:14},description:`Días al vencimiento de la tarea; negativo, vencida.`},newPatient:{control:`boolean`,description:`Paciente nuevo: pill violeta "New".`},selected:{control:`boolean`,description:`Con la ficha rápida abierta desde esta fila.`}}},z={controls:{disable:!0}},B={render:e=>{let t={...N[e.stage],nuevo:e.newPatient,...e.stage===`waiting`?{espera:e.waitMinutes}:{}};return e.piece===`Next appointment`?(0,j.jsx)(`div`,{className:n(_,`p-3`),style:{width:e.width},children:(0,j.jsx)(c,{appt:M,activa:e.selected})}):e.piece===`Task row`?(0,j.jsx)(L,{ancho:e.width,children:(0,j.jsx)(`li`,{children:(0,j.jsx)(a,{task:{...P,vence:e.dueInDays}})})}):(0,j.jsx)(L,{ancho:e.width,children:(0,j.jsx)(`li`,{children:(0,j.jsx)(m,{appt:t,etapa:e.stage,activa:e.selected})})})}},V={parameters:z,render:()=>(0,j.jsxs)(C,{children:[(0,j.jsxs)(E,{titulo:`Appointment row`,nota:`Angosta (en una columna del tablero) y ancha (la lista a lo ancho de la variante B).`,children:[(0,j.jsx)(L,{ancho:400,children:(0,j.jsx)(`li`,{children:(0,j.jsx)(m,{appt:{...N.waiting,nuevo:!0},etapa:`waiting`})})}),(0,j.jsx)(L,{ancho:900,children:(0,j.jsx)(`li`,{children:(0,j.jsx)(m,{appt:N.waiting,etapa:`waiting`})})}),(0,j.jsx)(w,{partes:[[`State bar`,`Barra de 3px del color del estado del turno en Scheduling: se reconoce el mismo turno en el calendario y en el dashboard.`,`BLOCK_STYLE[estado].bar`],[`Time`,`13px Semibold con números tabulares: es la columna por la que se lee una agenda.`,`appt.time`],[`Name`,`Botón: abre la ficha rápida anclada a la fila. "New" en violeta si es paciente nuevo.`,`NombreTurno`],[`Sub line`,`Provider y operatorio en 11px. Ancha: pasan a sus columnas. Muy angosta: los minutos van acá.`,`—`],[`Minutes`,`En la sala de espera o en el sillón. La espera cambia de color con el umbral.`,`minutosEnEtapa · tonoEspera`],[`Action`,`La que sigue, en secondary sm: Check In, Seat o Check Out. Terminado: un check.`,`Button`],[`Menu`,`Kebab de las tablas: Edit appointment y Go to appointment.`,`MenuTurno · RowActionsMenu`]]}),(0,j.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,j.jsx)(`span`,{className:`text-[13px]`,children:(0,j.jsx)(i,{appt:M,children:`Name as a button`})}),(0,j.jsx)(f,{nombre:M.name})]})]}),(0,j.jsx)(E,{titulo:`Next appointment`,nota:`El turno en foco: el único con la acción en azul y a lo ancho.`,children:(0,j.jsx)(`div`,{className:n(_,`w-[400px] p-3`),children:(0,j.jsx)(c,{appt:M})})}),(0,j.jsx)(E,{titulo:`Task row`,nota:`Ícono del tipo en el color de su urgencia, tipo y paciente, vencimiento en palabras y Complete.`,children:(0,j.jsx)(L,{ancho:400,children:(0,j.jsx)(`li`,{children:(0,j.jsx)(a,{task:P})})})}),(0,j.jsx)(E,{titulo:`Room strip`,nota:`Las salas en una fila: punto y estado en color, y quién está (o el provider). Con muchas, se desliza de costado.`,children:(0,j.jsx)(d,{rooms:O.rooms})})]})},H={parameters:z,render:()=>(0,j.jsxs)(C,{children:[(0,j.jsxs)(E,{titulo:`Appointment row · stages`,children:[(0,j.jsx)(L,{ancho:400,children:I.map(e=>(0,j.jsx)(`li`,{children:(0,j.jsx)(m,{appt:N[e],etapa:e})},e))}),(0,j.jsx)(L,{ancho:900,children:I.map(e=>(0,j.jsx)(`li`,{children:(0,j.jsx)(m,{appt:N[e],etapa:e})},e))})]}),(0,j.jsxs)(`div`,{className:`grid gap-6 md:grid-cols-2`,children:[(0,j.jsx)(b,{titulo:`Waiting time`,nota:`Gris hasta 14 min, ámbar desde 15, rojo desde 25 (umbral a validar con recepción).`,children:(0,j.jsx)(L,{children:[6,18,27].map(e=>(0,j.jsx)(`li`,{children:(0,j.jsx)(m,{appt:{...N.waiting,espera:e},etapa:`waiting`})},e))})}),(0,j.jsx)(b,{titulo:`Narrow (under 384px)`,nota:`Los minutos bajan al segundo renglón para no cortar el nombre.`,children:(0,j.jsx)(L,{ancho:340,children:[`waiting`,`in-chair`].map(e=>(0,j.jsx)(`li`,{children:(0,j.jsx)(m,{appt:N[e],etapa:e})},e))})}),(0,j.jsx)(b,{titulo:`Selected`,nota:`Con la ficha rápida abierta desde la fila: fondo celeste.`,children:(0,j.jsx)(L,{children:(0,j.jsx)(`li`,{children:(0,j.jsx)(m,{appt:N.upcoming,etapa:`upcoming`,activa:!0})})})}),(0,j.jsx)(b,{titulo:`Next appointment, selected`,children:(0,j.jsx)(`div`,{className:n(_,`p-3`),children:(0,j.jsx)(c,{appt:M,activa:!0})})}),(0,j.jsx)(b,{titulo:`Task row · due`,nota:`Vencida en rojo, hoy en ámbar, después en gris.`,children:(0,j.jsx)(L,{children:[-3,0,4].map(e=>(0,j.jsx)(`li`,{children:(0,j.jsx)(a,{task:{...P,vence:e}})},e))})}),(0,j.jsx)(b,{titulo:`Room tile · status`,children:(0,j.jsx)(`div`,{className:`flex flex-wrap gap-2`,children:F.map(e=>(0,j.jsx)(`div`,{className:`w-[160px]`,children:(0,j.jsx)(p,{room:e})},e.name))})})]})]})},U=e=>y[e].bar.match(/--color-([\w-]+)/)?.[1]??null,W={parameters:z,render:()=>(0,j.jsxs)(C,{children:[(0,j.jsx)(E,{titulo:`Size`,nota:`Leído de la fila dibujada. La acción es Button sm (28px); el kebab, el de las tablas (28px).`,children:(0,j.jsx)(A,{})}),(0,j.jsx)(E,{titulo:`Stage colors`,nota:`La barra usa los tokens de estado de Scheduling (--color-appt-*-bar en src/index.css).`,children:(0,j.jsx)(x,{encabezado:[`Stage`,`Scheduling state`,`Bar`,`Action`],minimo:620,children:I.map(e=>(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:u[e].rotulo}),(0,j.jsx)(`td`,{children:u[e].estado}),(0,j.jsx)(`td`,{children:(0,j.jsx)(D,{nombre:U(u[e].estado)})}),(0,j.jsx)(`td`,{children:u[e].accion??`—`})]},e))})}),(0,j.jsx)(E,{titulo:`Urgency colors`,nota:`Espera (tonoEspera) y vencimiento de tareas (tonoVence).`,children:(0,j.jsxs)(x,{encabezado:[`Case`,`Text`,`Sample`],minimo:560,children:[[6,18,27].map(e=>(0,j.jsxs)(`tr`,{children:[(0,j.jsxs)(`td`,{className:`font-semibold`,children:[`Waiting `,e,` min`]}),(0,j.jsx)(`td`,{children:(0,j.jsx)(D,{nombre:h(e).replace(`text-`,``)})}),(0,j.jsxs)(`td`,{className:n(`font-semibold`,h(e)),children:[e,` min`]})]},e)),[-3,0,4].map(e=>(0,j.jsxs)(`tr`,{children:[(0,j.jsxs)(`td`,{className:`font-semibold`,children:[`Task due `,e]}),(0,j.jsx)(`td`,{children:(0,j.jsx)(D,{nombre:o(e).texto.replace(`text-`,``)})}),(0,j.jsx)(`td`,{className:n(`font-semibold`,o(e).texto),children:s({...P,vence:e})})]},e))]})})]})},G=[`Playground`,`Parts`,`States`,`Specs`],B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: a => {
    const appt = {
      ...EN[a.stage],
      nuevo: a.newPatient,
      ...(a.stage === 'waiting' ? {
        espera: a.waitMinutes
      } : {})
    };
    if (a.piece === 'Next appointment') return <div className={cn(TARJETA_PANEL, 'p-3')} style={{
      width: a.width
    }}><NextAppointment appt={TURNO} activa={a.selected} /></div>;
    if (a.piece === 'Task row') return <Caja ancho={a.width}><li><TaskRow task={{
          ...TAREA,
          vence: a.dueInDays
        }} /></li></Caja>;
    return <Caja ancho={a.width}><li><AppointmentRow appt={appt} etapa={a.stage} activa={a.selected} /></li></Caja>;
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Appointment row" nota="Angosta (en una columna del tablero) y ancha (la lista a lo ancho de la variante B).">
        <Caja ancho={400}><li><AppointmentRow appt={{
            ...EN.waiting,
            nuevo: true
          }} etapa="waiting" /></li></Caja>
        <Caja ancho={900}><li><AppointmentRow appt={EN.waiting} etapa="waiting" /></li></Caja>
        <TablaPartes partes={[['State bar', 'Barra de 3px del color del estado del turno en Scheduling: se reconoce el mismo turno en el calendario y en el dashboard.', 'BLOCK_STYLE[estado].bar'], ['Time', '13px Semibold con números tabulares: es la columna por la que se lee una agenda.', 'appt.time'], ['Name', 'Botón: abre la ficha rápida anclada a la fila. "New" en violeta si es paciente nuevo.', 'NombreTurno'], ['Sub line', 'Provider y operatorio en 11px. Ancha: pasan a sus columnas. Muy angosta: los minutos van acá.', '—'], ['Minutes', 'En la sala de espera o en el sillón. La espera cambia de color con el umbral.', 'minutosEnEtapa · tonoEspera'], ['Action', 'La que sigue, en secondary sm: Check In, Seat o Check Out. Terminado: un check.', 'Button'], ['Menu', 'Kebab de las tablas: Edit appointment y Go to appointment.', 'MenuTurno · RowActionsMenu']]} />
        <div className="flex items-center gap-4">
          <span className="text-[13px]"><NombreTurno appt={TURNO}>Name as a button</NombreTurno></span>
          <MenuTurno nombre={TURNO.name} />
        </div>
      </Bloque>
      <Bloque titulo="Next appointment" nota="El turno en foco: el único con la acción en azul y a lo ancho.">
        <div className={cn(TARJETA_PANEL, 'w-[400px] p-3')}><NextAppointment appt={TURNO} /></div>
      </Bloque>
      <Bloque titulo="Task row" nota="Ícono del tipo en el color de su urgencia, tipo y paciente, vencimiento en palabras y Complete.">
        <Caja ancho={400}><li><TaskRow task={TAREA} /></li></Caja>
      </Bloque>
      <Bloque titulo="Room strip" nota="Las salas en una fila: punto y estado en color, y quién está (o el provider). Con muchas, se desliza de costado.">
        <RoomStrip rooms={DIA_CARGADO.rooms} />
      </Bloque>
    </Lienzo>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Appointment row · stages">
        <Caja ancho={400}>{ETAPAS_LISTA.map(e => <li key={e}><AppointmentRow appt={EN[e]} etapa={e} /></li>)}</Caja>
        <Caja ancho={900}>{ETAPAS_LISTA.map(e => <li key={e}><AppointmentRow appt={EN[e]} etapa={e} /></li>)}</Caja>
      </Bloque>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="Waiting time" nota="Gris hasta 14 min, ámbar desde 15, rojo desde 25 (umbral a validar con recepción).">
          <Caja>{[6, 18, 27].map(m => <li key={m}><AppointmentRow appt={{
              ...EN.waiting,
              espera: m
            }} etapa="waiting" /></li>)}</Caja>
        </Muestra>
        <Muestra titulo="Narrow (under 384px)" nota="Los minutos bajan al segundo renglón para no cortar el nombre.">
          <Caja ancho={340}>{(['waiting', 'in-chair'] as const).map(e => <li key={e}><AppointmentRow appt={EN[e]} etapa={e} /></li>)}</Caja>
        </Muestra>
        <Muestra titulo="Selected" nota="Con la ficha rápida abierta desde la fila: fondo celeste.">
          <Caja><li><AppointmentRow appt={EN.upcoming} etapa="upcoming" activa /></li></Caja>
        </Muestra>
        <Muestra titulo="Next appointment, selected">
          <div className={cn(TARJETA_PANEL, 'p-3')}><NextAppointment appt={TURNO} activa /></div>
        </Muestra>
        <Muestra titulo="Task row · due" nota="Vencida en rojo, hoy en ámbar, después en gris.">
          <Caja>{[-3, 0, 4].map(v => <li key={v}><TaskRow task={{
              ...TAREA,
              vence: v
            }} /></li>)}</Caja>
        </Muestra>
        <Muestra titulo="Room tile · status">
          <div className="flex flex-wrap gap-2">{SALAS.map(r => <div key={r.name} className="w-[160px]"><RoomTile room={r} /></div>)}</div>
        </Muestra>
      </div>
    </Lienzo>
}`,...H.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Size" nota="Leído de la fila dibujada. La acción es Button sm (28px); el kebab, el de las tablas (28px).">
        <MedidasFila />
      </Bloque>
      <Bloque titulo="Stage colors" nota="La barra usa los tokens de estado de Scheduling (--color-appt-*-bar en src/index.css).">
        <Tabla encabezado={['Stage', 'Scheduling state', 'Bar', 'Action']} minimo={620}>
          {ETAPAS_LISTA.map(e => <tr key={e}>
              <td className="font-semibold">{ETAPAS[e].rotulo}</td>
              <td>{ETAPAS[e].estado}</td>
              <td><Token nombre={tokenDeBarra(ETAPAS[e].estado)} /></td>
              <td>{ETAPAS[e].accion ?? '—'}</td>
            </tr>)}
        </Tabla>
      </Bloque>
      <Bloque titulo="Urgency colors" nota="Espera (tonoEspera) y vencimiento de tareas (tonoVence).">
        <Tabla encabezado={['Case', 'Text', 'Sample']} minimo={560}>
          {[6, 18, 27].map(m => <tr key={m}><td className="font-semibold">Waiting {m} min</td><td><Token nombre={tonoEspera(m).replace('text-', '')} /></td><td className={cn('font-semibold', tonoEspera(m))}>{m} min</td></tr>)}
          {[-3, 0, 4].map(v => <tr key={v}><td className="font-semibold">Task due {v}</td><td><Token nombre={tonoVence(v).texto.replace('text-', '')} /></td><td className={cn('font-semibold', tonoVence(v).texto)}>{venceTexto({
              ...TAREA,
              vence: v
            })}</td></tr>)}
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...W.parameters?.docs?.source}}}})))()}K();export{V as Parts,B as Playground,W as Specs,H as States,G as __namedExportsOrder,R as default};