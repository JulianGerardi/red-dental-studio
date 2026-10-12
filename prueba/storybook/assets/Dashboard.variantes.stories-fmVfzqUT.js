import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,t as i}from"./pantalla-G9w79Vee.js";import{a,c as o,d as s,i as c,l,t as u}from"./kit-CWUgB5-0.js";import{d,i as f,r as p,t as m}from"./dashboard-data-DbinSGmv.js";import{a as h,c as g,l as _,o as v,s as y}from"./Dashboard-BF1Rbdwb.js";function b({variante:e,dia:t,salas:n=[]}){let[r,i]=(0,S.useState)(n),[a,o]=(0,S.useState)([]),s={dia:t,operatorios:[...new Set(t.appointments.map(e=>e.operatory))].sort(),salas:r,onSalas:i,tipos:a,onTipos:o,onSelect:()=>{},onEdit:()=>{}};return(0,C.jsx)(`div`,{className:`bg-page-background rounded-lg p-4 [&>div]:mt-0`,children:e===`a`?(0,C.jsx)(y,{...s}):(0,C.jsx)(v,{...s})})}function x(){let[e,t]=(0,S.useState)(`a`),[n,r]=(0,S.useState)(!0);return(0,C.jsx)(h,{variante:e,cargado:n,onVariante:t,onCargado:r})}var S,C,w,T,E,D,O,k,A,j;function M(){return(M=e((()=>{S=t(),_(),d(),s(),r(),C=n(),w={title:`Proposals/Dashboard with volume`,parameters:{layout:`padded`,docs:{description:{component:[`**Propuesta, no está publicada.** Con un día real de una clínica de cinco sillones (35 turnos, 8 en la sala de espera, 28 tareas) el Dashboard actual mide **10.614px** de alto en escritorio y **16.882px** en el celular, y Pending Task arranca a los 8.630px: cada turno y cada tarea es una card de 190px y las listas crecen sin tope.`,``,`Dos variantes, con **el mismo contenido de cada card** —turno: hora, iniciales, nombre, Check In, provider, operatorio, TR, CC, Check Out o Cancel y Edit appointment; tarea: paciente, Requested, documento, Expired date, Register, Expiration date y Complete this Task; sala: la card de operatorio—. Cambia sólo cómo se acomoda: **filas en lugar de cards** (*Components / Dashboard / Dashboard rows*) y **grupos con lo que ya dicen los datos** (*Elements / List group*): Scheduled y Completed (plegado); las tareas por tipo.`,``,`- **A · Board (todo a la vista):** Appointments, Waiting Room y Pending Task a la par, cada una del alto de la pantalla y con su scroll; las salas, abajo. Pensada para recepción, que mira todo a la vez.`,`- **B · Focus (la clínica primero):** arriba Waiting Room y Rooms; abajo, Appointments y Pending Task en una sola lista a lo ancho con tabs, en columnas como una tabla y con tope por grupo.`,``,`**Probalo:** en *Playground* elegí la variante y el día desde *Controls* (o en la app, con el selector de arriba del Dashboard). Las acciones hacen lo mismo que en las cards.`].join(`
`)}}},args:{layout:`a`,busyDay:!0},argTypes:{layout:{control:`inline-radio`,options:Object.keys(g),description:`Current, A · Board o B · Focus.`},busyDay:{control:`boolean`,description:`Día real (35 turnos, 8 en espera, 28 tareas) o el día de la demo (6 turnos).`}}},T={controls:{disable:!0}},E={parameters:{layout:`fullscreen`,router:!1},render:({layout:e,busyDay:t})=>{let n=new URLSearchParams({...e!==`current`&&{variant:e},...t&&{day:`busy`}}).toString();return(0,C.jsx)(i,{ruta:`/${n?`?${n}`:``}`},n)}},D={parameters:{...T,layout:`fullscreen`},render:()=>(0,C.jsxs)(c,{className:`max-w-none p-6`,children:[(0,C.jsx)(u,{titulo:`Proposal bar`,nota:`Arriba del Dashboard, sólo mientras se elige: cambia la variante (?variant=a|b) y el día (?day=busy). Se va con la elección.`,children:(0,C.jsx)(x,{})}),(0,C.jsxs)(u,{titulo:`A · Board`,nota:`Tres columnas desde 1200px, cada panel con alto máximo (la pantalla menos el encabezado, mínimo 520px) y su scroll; los rótulos de grupo quedan pegados arriba. Más angosto, una lista por vez con tabs.`,children:[(0,C.jsx)(b,{variante:`a`,dia:p}),(0,C.jsx)(l,{partes:[[`Appointments`,`Scheduled por hora y Completed plegado, en filas con todo lo de la card.`,`Panel · ListGroup · AppointmentRow`],[`Waiting Room`,`Las mismas filas, en el orden de siempre, sin rótulo de grupo.`,`Panel · ListGroup · AppointmentRow`],[`Pending Task`,`Agrupadas por tipo (las categorías del filtro).`,`Panel · ListGroup · TaskRow`],[`Rooms`,`La card de operatorio, en grilla, abajo de las listas.`,`RoomStrip · OperatoryCard`]]})]}),(0,C.jsxs)(u,{titulo:`B · Focus`,nota:`Waiting Room (con tope de 5) y Rooms arriba; abajo, la lista a lo ancho con tabs y tope de 8 turnos y 4 tareas por grupo.`,children:[(0,C.jsx)(b,{variante:`b`,dia:p}),(0,C.jsx)(l,{partes:[[`Waiting Room`,`Las filas de la sala de espera, con Show N more.`,`Panel · ListGroup · AppointmentRow`],[`Rooms`,`Las cards de operatorio en dos columnas.`,`Panel · OperatoryCard`],[`Appointments · Pending Task`,`Una lista con tabs y conteos. Las filas pasan a columnas desde 768px de ancho de lista.`,`Tabs · ListGroup · AppointmentRow · TaskRow`]]})]})]})},O={parameters:{...T,layout:`fullscreen`},render:()=>(0,C.jsxs)(c,{className:`max-w-none p-6`,children:[(0,C.jsx)(a,{titulo:`A · Demo day (little volume)`,nota:`Con pocos turnos los paneles abrazan su contenido: el alto es un máximo, no un fijo.`,children:(0,C.jsx)(b,{variante:`a`,dia:m[`28-02-2026`]})}),(0,C.jsx)(a,{titulo:`B · Demo day (little volume)`,children:(0,C.jsx)(b,{variante:`b`,dia:m[`28-02-2026`]})}),(0,C.jsx)(a,{titulo:`A · Empty day`,nota:`Un día sin turnos ni tareas: los mismos vacíos que la versión actual.`,children:(0,C.jsx)(b,{variante:`a`,dia:f})}),(0,C.jsx)(a,{titulo:`B · Empty day`,children:(0,C.jsx)(b,{variante:`b`,dia:f})}),(0,C.jsx)(a,{titulo:`A · Filter with no match`,nota:`El filtro de operatorios no encuentra turnos: el vacío lo dice.`,children:(0,C.jsx)(b,{variante:`a`,dia:p,salas:[`Operatory 9`]})})]})},k=[[`Current`,`10,614px`,`8,630px`,`4`,`16,882px`],[`A · Board`,`1,214px`,`420px (on screen)`,`8`,`3,971px`],[`B · Focus`,`1,517px`,`944px (one tab away)`,`5`,`3,026px`]],A={parameters:T,render:()=>(0,C.jsxs)(c,{children:[(0,C.jsx)(u,{titulo:`With a busy day`,nota:`La pantalla completa a 1440×900 y a 390×844 con el día cargado (35 turnos, 8 en espera, 28 tareas), medida con Playwright el 2026-10-12. Turnos en la primera pantalla: cuántos se ven sin scrollear.`,children:(0,C.jsx)(o,{encabezado:[`Layout`,`Height 1440`,`Pending Task starts`,`Appointments on first screen`,`Height 390`],minimo:760,children:k.map(e=>(0,C.jsx)(`tr`,{children:e.map((e,t)=>(0,C.jsx)(`td`,{className:t===0?`font-semibold`:`tabular-nums`,children:e},t))},e[0]))})}),(0,C.jsx)(u,{titulo:`Breakpoints`,nota:`A pasa a tres columnas desde 1200px (con menos, la fila no entra). B pone Waiting Room y Rooms a la par desde 1024px. Las filas cambian según el ancho de su lista, no de la pantalla.`,children:(0,C.jsxs)(o,{encabezado:[`Piece`,`Under`,`From`],minimo:560,children:[(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`A · columns`}),(0,C.jsx)(`td`,{children:`Tabs, one list at a time`}),(0,C.jsx)(`td`,{className:`tabular-nums`,children:`1200px: three columns`})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Rooms grid`}),(0,C.jsx)(`td`,{children:`One, two or three per row`}),(0,C.jsx)(`td`,{className:`tabular-nums`,children:`1536px: six per row`})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`B · top`}),(0,C.jsx)(`td`,{children:`Stacked`}),(0,C.jsx)(`td`,{className:`tabular-nums`,children:`1024px: side by side`})]}),(0,C.jsxs)(`tr`,{children:[(0,C.jsx)(`td`,{className:`font-semibold`,children:`Rows`}),(0,C.jsx)(`td`,{children:`Lines; the button drops to its own line if it does not fit`}),(0,C.jsx)(`td`,{className:`tabular-nums`,children:`768px: columns`})]})]})})]})},j=[`Playground`,`Parts`,`States`,`Specs`],E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    ...sinControles,
    layout: 'fullscreen'
  },
  render: () => <Lienzo className="max-w-none p-6">
      <Bloque titulo="Proposal bar" nota="Arriba del Dashboard, sólo mientras se elige: cambia la variante (?variant=a|b) y el día (?day=busy). Se va con la elección.">
        <Barra />
      </Bloque>
      <Bloque titulo="A · Board" nota="Tres columnas desde 1200px, cada panel con alto máximo (la pantalla menos el encabezado, mínimo 520px) y su scroll; los rótulos de grupo quedan pegados arriba. Más angosto, una lista por vez con tabs.">
        <ConDia variante="a" dia={DIA_CARGADO} />
        <TablaPartes partes={[['Appointments', 'Scheduled por hora y Completed plegado, en filas con todo lo de la card.', 'Panel · ListGroup · AppointmentRow'], ['Waiting Room', 'Las mismas filas, en el orden de siempre, sin rótulo de grupo.', 'Panel · ListGroup · AppointmentRow'], ['Pending Task', 'Agrupadas por tipo (las categorías del filtro).', 'Panel · ListGroup · TaskRow'], ['Rooms', 'La card de operatorio, en grilla, abajo de las listas.', 'RoomStrip · OperatoryCard']]} />
      </Bloque>
      <Bloque titulo="B · Focus" nota="Waiting Room (con tope de 5) y Rooms arriba; abajo, la lista a lo ancho con tabs y tope de 8 turnos y 4 tareas por grupo.">
        <ConDia variante="b" dia={DIA_CARGADO} />
        <TablaPartes partes={[['Waiting Room', 'Las filas de la sala de espera, con Show N more.', 'Panel · ListGroup · AppointmentRow'], ['Rooms', 'Las cards de operatorio en dos columnas.', 'Panel · OperatoryCard'], ['Appointments · Pending Task', 'Una lista con tabs y conteos. Las filas pasan a columnas desde 768px de ancho de lista.', 'Tabs · ListGroup · AppointmentRow · TaskRow']]} />
      </Bloque>
    </Lienzo>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: {
    ...sinControles,
    layout: 'fullscreen'
  },
  render: () => <Lienzo className="max-w-none p-6">
      <Muestra titulo="A · Demo day (little volume)" nota="Con pocos turnos los paneles abrazan su contenido: el alto es un máximo, no un fijo.">
        <ConDia variante="a" dia={DIAS['28-02-2026']!} />
      </Muestra>
      <Muestra titulo="B · Demo day (little volume)">
        <ConDia variante="b" dia={DIAS['28-02-2026']!} />
      </Muestra>
      <Muestra titulo="A · Empty day" nota="Un día sin turnos ni tareas: los mismos vacíos que la versión actual.">
        <ConDia variante="a" dia={DIA_VACIO} />
      </Muestra>
      <Muestra titulo="B · Empty day">
        <ConDia variante="b" dia={DIA_VACIO} />
      </Muestra>
      <Muestra titulo="A · Filter with no match" nota="El filtro de operatorios no encuentra turnos: el vacío lo dice.">
        <ConDia variante="a" dia={DIA_CARGADO} salas={['Operatory 9']} />
      </Muestra>
    </Lienzo>
}`,...O.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="With a busy day" nota="La pantalla completa a 1440×900 y a 390×844 con el día cargado (35 turnos, 8 en espera, 28 tareas), medida con Playwright el 2026-10-12. Turnos en la primera pantalla: cuántos se ven sin scrollear.">
        <Tabla encabezado={['Layout', 'Height 1440', 'Pending Task starts', 'Appointments on first screen', 'Height 390']} minimo={760}>
          {MEDIDAS.map(f => <tr key={f[0]}>{f.map((c, i) => <td key={i} className={i === 0 ? 'font-semibold' : 'tabular-nums'}>{c}</td>)}</tr>)}
        </Tabla>
      </Bloque>
      <Bloque titulo="Breakpoints" nota="A pasa a tres columnas desde 1200px (con menos, la fila no entra). B pone Waiting Room y Rooms a la par desde 1024px. Las filas cambian según el ancho de su lista, no de la pantalla.">
        <Tabla encabezado={['Piece', 'Under', 'From']} minimo={560}>
          <tr><td className="font-semibold">A · columns</td><td>Tabs, one list at a time</td><td className="tabular-nums">1200px: three columns</td></tr>
          <tr><td className="font-semibold">Rooms grid</td><td>One, two or three per row</td><td className="tabular-nums">1536px: six per row</td></tr>
          <tr><td className="font-semibold">B · top</td><td>Stacked</td><td className="tabular-nums">1024px: side by side</td></tr>
          <tr><td className="font-semibold">Rows</td><td>Lines; the button drops to its own line if it does not fit</td><td className="tabular-nums">768px: columns</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...A.parameters?.docs?.source}}}})))()}M();export{D as Parts,E as Playground,A as Specs,O as States,j as __namedExportsOrder,w as default};