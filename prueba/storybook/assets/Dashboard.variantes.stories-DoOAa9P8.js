import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,t as i}from"./pantalla-qu4f6QEc.js";import{a,c as o,d as s,i as c,l,t as u}from"./kit-CWUgB5-0.js";import{a as d,i as f,l as p,n as m,p as h}from"./dashboard-data-DGHlVgi5.js";import{a as g,c as _,l as v,o as y,s as b}from"./Dashboard-DCtv1QCV.js";function x({variante:e,inicial:t,salas:n=[]}){let[r,i]=(0,C.useState)({hoy:t}),[a,o]=(0,C.useState)(n),[s,c]=(0,C.useState)([]),l=r.hoy,u={dia:l,operatorios:[...new Set(l.appointments.map(e=>e.operatory))].sort(),salas:a,onSalas:o,tipos:s,onTipos:c,onSelect:()=>{},onEdit:()=>{},onAvanzar:(e,t)=>i(n=>p(n,`hoy`,e,t)),onCompletar:e=>i(t=>({hoy:{...t.hoy,tasks:t.hoy.tasks.filter(t=>t!==e)}}))};return(0,w.jsx)(`div`,{className:`bg-page-background rounded-lg p-4 [&>div]:mt-0`,children:e===`a`?(0,w.jsx)(b,{...u}):(0,w.jsx)(y,{...u})})}function S(){let[e,t]=(0,C.useState)(`a`),[n,r]=(0,C.useState)(!0);return(0,w.jsx)(g,{variante:e,cargado:n,onVariante:t,onCargado:r})}var C,w,T,E,D,O,k,A,j,M;function N(){return(N=e((()=>{C=t(),v(),h(),s(),r(),w=n(),T={title:`Proposals/Dashboard with volume`,parameters:{layout:`padded`,docs:{description:{component:[`**Propuesta, no está publicada.** Con un día real de una clínica de cinco sillones (40 pacientes, 28 tareas) el Dashboard actual mide **10.600px** de alto en escritorio y **16.300px** en el celular, Pending Task arranca a los 8.600px y hay **68 botones azules** a la vista: cada turno y cada tarea es una card de 190px con su botón principal a lo ancho, y las listas crecen sin tope.`,``,`Dos variantes, con las mismas piezas nuevas (*Elements / List group* y *Components / Dashboard / Dashboard rows*) y la misma regla: **filas en lugar de cards, agrupadas por lo que está pasando, una sola acción azul (el próximo paciente) y la barra de color del estado de Scheduling**.`,``,`- **A · Board (todo a la vista):** las tres listas una al lado de la otra, cada una del alto de la pantalla y con su scroll: *Appointments* (el próximo, los que siguen y los terminados plegados), *In the clinic* (los que esperan, el que más espera primero, y los que están en el sillón) y *Pending Task* (Overdue · Due today · Later). Arriba, las salas en una tira. Pensada para recepción, que mira todo a la vez.`,`- **B · Focus (lo próximo primero):** arriba *Right now*: el próximo paciente, quién está en el sillón y los tres que más esperan. Abajo, una sola lista a lo ancho con tabs (Schedule · Waiting room · Pending tasks), en columnas como una tabla y con tope por grupo. Pensada para quien atiende, y escala a cualquier volumen.`,``,`**Probalo:** en *Playground* elegí la variante y el día desde *Controls* (o en la app, con el selector de arriba del Dashboard). Tocá Check In, Seat y Check Out: el paciente pasa de una lista a la otra y los números se actualizan.`].join(`
`)}}},args:{layout:`a`,busyDay:!0},argTypes:{layout:{control:`inline-radio`,options:Object.keys(_),description:`Current, A · Board o B · Focus.`},busyDay:{control:`boolean`,description:`Día real (40 pacientes, 28 tareas) o el día de la demo (6 turnos).`}}},E={controls:{disable:!0}},D={parameters:{layout:`fullscreen`,router:!1},render:({layout:e,busyDay:t})=>{let n=new URLSearchParams({...e!==`current`&&{variant:e},...t&&{day:`busy`}}).toString();return(0,w.jsx)(i,{ruta:`/${n?`?${n}`:``}`},n)}},O={parameters:{...E,layout:`fullscreen`},render:()=>(0,w.jsxs)(c,{className:`max-w-none p-6`,children:[(0,w.jsx)(u,{titulo:`Proposal bar`,nota:`Arriba del Dashboard, sólo mientras se elige: cambia la variante (?variant=a|b) y el día (?day=busy). Se va con la elección.`,children:(0,w.jsx)(S,{})}),(0,w.jsxs)(u,{titulo:`A · Board`,nota:`Tres columnas desde 1200px, cada panel con alto máximo (el de la pantalla menos el encabezado, mínimo 520px) y su scroll; los rótulos de grupo quedan pegados arriba. Más angosto, una lista por vez con tabs.`,children:[(0,w.jsx)(x,{variante:`a`,inicial:f}),(0,w.jsx)(l,{partes:[[`Room strip`,`Las salas en una fila: cuáles están ocupadas y por quién.`,`RoomStrip`],[`Appointments`,`El próximo en foco (botón azul), Up next en filas y Completed plegado. Al pie, Open Scheduling.`,`Panel · NextAppointment · ListGroup · AppointmentRow`],[`In the clinic`,`Waiting (el que más espera primero, con los minutos en color) e In chair. Juntos dicen el flujo y la columna no queda medio vacía.`,`Panel · ListGroup · AppointmentRow`],[`Pending Task`,`Overdue · Due today · Later, con el vencimiento en palabras y Complete.`,`Panel · ListGroup · TaskRow`]]})]}),(0,w.jsxs)(u,{titulo:`B · Focus`,nota:`Right now en tres columnas desde 1024px (apiladas en el celular), la tira de salas y la lista del día a lo ancho, con tope de 8 por grupo.`,children:[(0,w.jsx)(x,{variante:`b`,inicial:f}),(0,w.jsx)(l,{partes:[[`Right now`,`Next patient (y los dos que siguen), In chair y los tres que más esperan, con See all.`,`NextAppointment · ListGroup · AppointmentRow`],[`Room strip`,`Igual que en A.`,`RoomStrip`],[`Full day`,`Una lista con tabs y conteos. Las filas pasan a columnas desde 768px de ancho de lista.`,`Panel · Tabs · ListGroup · AppointmentRow · TaskRow`]]})]})]})},k={parameters:{...E,layout:`fullscreen`},render:()=>(0,w.jsxs)(c,{className:`max-w-none p-6`,children:[(0,w.jsx)(a,{titulo:`A · Demo day (little volume)`,nota:`Con pocos turnos los paneles abrazan su contenido: el alto es un máximo, no un fijo.`,children:(0,w.jsx)(x,{variante:`a`,inicial:m[`28-02-2026`]})}),(0,w.jsx)(a,{titulo:`B · Demo day (little volume)`,children:(0,w.jsx)(x,{variante:`b`,inicial:m[`28-02-2026`]})}),(0,w.jsx)(a,{titulo:`A · Empty day`,nota:`Un día sin turnos ni tareas: el vacío de cada panel.`,children:(0,w.jsx)(x,{variante:`a`,inicial:d})}),(0,w.jsx)(a,{titulo:`B · Empty day`,nota:`Sin próximo paciente, nadie en el sillón ni esperando.`,children:(0,w.jsx)(x,{variante:`b`,inicial:d})}),(0,w.jsx)(a,{titulo:`A · Filter with no match`,nota:`El filtro de operatorios no encuentra turnos: el vacío lo dice.`,children:(0,w.jsx)(x,{variante:`a`,inicial:f,salas:[`Operatory 9`]})})]})},A=[[`Current`,`10,614px`,`8,630px`,`68`,`4`,`16,286px`],[`A · Board`,`1,052px`,`524px (on screen)`,`1`,`9`,`2,060px`],[`B · Focus`,`1,687px`,`868px (one tab away)`,`1`,`11`,`2,658px`]],j={parameters:E,render:()=>(0,w.jsxs)(c,{children:[(0,w.jsx)(u,{titulo:`With a busy day`,nota:`La pantalla completa a 1440×900 y a 390×844 con el día cargado (40 pacientes, 28 tareas), medida con Playwright el 2026-10-12. Turnos en la primera pantalla: cuántos se ven sin scrollear.`,children:(0,w.jsx)(o,{encabezado:[`Layout`,`Height 1440`,`Pending tasks start`,`Blue buttons`,`Appointments on first screen`,`Height 390`],minimo:820,children:A.map(e=>(0,w.jsx)(`tr`,{children:e.map((e,t)=>(0,w.jsx)(`td`,{className:t===0?`font-semibold`:`tabular-nums`,children:e},t))},e[0]))})}),(0,w.jsx)(u,{titulo:`Breakpoints`,nota:`A pasa a tres columnas desde 1200px (con menos, el nombre del paciente no entra en la fila). B pone Right now en tres columnas desde 1024px. Las filas cambian según el ancho de su lista, no de la pantalla.`,children:(0,w.jsxs)(o,{encabezado:[`Piece`,`Under`,`From`],minimo:560,children:[(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`A · columns`}),(0,w.jsx)(`td`,{children:`Tabs, one list at a time`}),(0,w.jsx)(`td`,{className:`tabular-nums`,children:`1200px: three columns`})]}),(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`B · Right now`}),(0,w.jsx)(`td`,{children:`Stacked`}),(0,w.jsx)(`td`,{className:`tabular-nums`,children:`1024px: three columns`})]}),(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Rows`}),(0,w.jsx)(`td`,{className:`tabular-nums`,children:`384px: minutes on the second line`}),(0,w.jsx)(`td`,{className:`tabular-nums`,children:`768px: columns`})]})]})})]})},M=[`Playground`,`Parts`,`States`,`Specs`],D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen',
    router: false
  },
  render: ({
    layout,
    busyDay
  }) => {
    const q = new URLSearchParams({
      ...(layout !== 'current' && {
        variant: layout
      }),
      ...(busyDay && {
        day: 'busy'
      })
    }).toString();
    return <PantallaReal key={q} ruta={\`/\${q ? \`?\${q}\` : ''}\`} />;
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: {
    ...sinControles,
    layout: 'fullscreen'
  },
  render: () => <Lienzo className="max-w-none p-6">
      <Bloque titulo="Proposal bar" nota="Arriba del Dashboard, sólo mientras se elige: cambia la variante (?variant=a|b) y el día (?day=busy). Se va con la elección.">
        <Barra />
      </Bloque>
      <Bloque titulo="A · Board" nota="Tres columnas desde 1200px, cada panel con alto máximo (el de la pantalla menos el encabezado, mínimo 520px) y su scroll; los rótulos de grupo quedan pegados arriba. Más angosto, una lista por vez con tabs.">
        <ConDia variante="a" inicial={DIA_CARGADO} />
        <TablaPartes partes={[['Room strip', 'Las salas en una fila: cuáles están ocupadas y por quién.', 'RoomStrip'], ['Appointments', 'El próximo en foco (botón azul), Up next en filas y Completed plegado. Al pie, Open Scheduling.', 'Panel · NextAppointment · ListGroup · AppointmentRow'], ['In the clinic', 'Waiting (el que más espera primero, con los minutos en color) e In chair. Juntos dicen el flujo y la columna no queda medio vacía.', 'Panel · ListGroup · AppointmentRow'], ['Pending Task', 'Overdue · Due today · Later, con el vencimiento en palabras y Complete.', 'Panel · ListGroup · TaskRow']]} />
      </Bloque>
      <Bloque titulo="B · Focus" nota="Right now en tres columnas desde 1024px (apiladas en el celular), la tira de salas y la lista del día a lo ancho, con tope de 8 por grupo.">
        <ConDia variante="b" inicial={DIA_CARGADO} />
        <TablaPartes partes={[['Right now', 'Next patient (y los dos que siguen), In chair y los tres que más esperan, con See all.', 'NextAppointment · ListGroup · AppointmentRow'], ['Room strip', 'Igual que en A.', 'RoomStrip'], ['Full day', 'Una lista con tabs y conteos. Las filas pasan a columnas desde 768px de ancho de lista.', 'Panel · Tabs · ListGroup · AppointmentRow · TaskRow']]} />
      </Bloque>
    </Lienzo>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: {
    ...sinControles,
    layout: 'fullscreen'
  },
  render: () => <Lienzo className="max-w-none p-6">
      <Muestra titulo="A · Demo day (little volume)" nota="Con pocos turnos los paneles abrazan su contenido: el alto es un máximo, no un fijo.">
        <ConDia variante="a" inicial={DIAS['28-02-2026']!} />
      </Muestra>
      <Muestra titulo="B · Demo day (little volume)">
        <ConDia variante="b" inicial={DIAS['28-02-2026']!} />
      </Muestra>
      <Muestra titulo="A · Empty day" nota="Un día sin turnos ni tareas: el vacío de cada panel.">
        <ConDia variante="a" inicial={DIA_VACIO} />
      </Muestra>
      <Muestra titulo="B · Empty day" nota="Sin próximo paciente, nadie en el sillón ni esperando.">
        <ConDia variante="b" inicial={DIA_VACIO} />
      </Muestra>
      <Muestra titulo="A · Filter with no match" nota="El filtro de operatorios no encuentra turnos: el vacío lo dice.">
        <ConDia variante="a" inicial={DIA_CARGADO} salas={['Operatory 9']} />
      </Muestra>
    </Lienzo>
}`,...k.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="With a busy day" nota="La pantalla completa a 1440×900 y a 390×844 con el día cargado (40 pacientes, 28 tareas), medida con Playwright el 2026-10-12. Turnos en la primera pantalla: cuántos se ven sin scrollear.">
        <Tabla encabezado={['Layout', 'Height 1440', 'Pending tasks start', 'Blue buttons', 'Appointments on first screen', 'Height 390']} minimo={820}>
          {MEDIDAS.map(f => <tr key={f[0]}>{f.map((c, i) => <td key={i} className={i === 0 ? 'font-semibold' : 'tabular-nums'}>{c}</td>)}</tr>)}
        </Tabla>
      </Bloque>
      <Bloque titulo="Breakpoints" nota="A pasa a tres columnas desde 1200px (con menos, el nombre del paciente no entra en la fila). B pone Right now en tres columnas desde 1024px. Las filas cambian según el ancho de su lista, no de la pantalla.">
        <Tabla encabezado={['Piece', 'Under', 'From']} minimo={560}>
          <tr><td className="font-semibold">A · columns</td><td>Tabs, one list at a time</td><td className="tabular-nums">1200px: three columns</td></tr>
          <tr><td className="font-semibold">B · Right now</td><td>Stacked</td><td className="tabular-nums">1024px: three columns</td></tr>
          <tr><td className="font-semibold">Rows</td><td className="tabular-nums">384px: minutes on the second line</td><td className="tabular-nums">768px: columns</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...j.parameters?.docs?.source}}}})))()}N();export{O as Parts,D as Playground,j as Specs,k as States,M as __namedExportsOrder,T as default};