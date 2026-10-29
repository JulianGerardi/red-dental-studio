import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,o as i}from"./notificaciones-Dyrm9lFl.js";import{n as a,t as o}from"./calendar-x-2-D6D4jrfU.js";import{n as s,t as c}from"./eye-CsJuf43x.js";import{n as l,t as u}from"./empty-state-yo-tjb-R.js";import{Dd as d,Ed as f}from"./iframe-jCqneDGk.js";import{c as p,d as m,f as h,i as g,n as _,o as v,r as y,t as b,u as x}from"./kit-CWUgB5-0.js";import{a as S,i as C,n as w,o as T,t as E}from"./Notifications-yFzVeIOy.js";function D({inicial:e,forzar:t}){let[n,r]=(0,A.useState)(e),i=(0,j.jsx)(I,{children:(0,j.jsx)(w,{n,onAbrir:()=>r(e=>({...e,estado:`read`})),onMarcar:(e,t)=>r(e=>({...e,estado:t}))})});return t===`hover`?(0,j.jsx)(y,{selector:`li`,estado:`hover`,children:i}):t===`focus-visible`?(0,j.jsx)(y,{selector:`li`,estado:`focus-within`,children:(0,j.jsx)(y,{selector:`li > span:last-child button`,estado:`focus-visible`,children:i})}):i}function O({titulo:e,nota:t,children:n}){return(0,j.jsxs)(`figure`,{className:`m-0 flex flex-col gap-2`,children:[(0,j.jsxs)(`figcaption`,{className:`flex flex-col gap-0.5`,children:[(0,j.jsx)(`span`,{className:`text-[12.5px] font-semibold text-ink`,children:e}),(0,j.jsx)(`span`,{className:`text-[11.5px] leading-snug text-ink-muted`,children:t})]}),n]})}function k(){let e=(0,A.useRef)(null),[t,n]=(0,A.useState)([]);return(0,A.useLayoutEffect)(()=>{n(J.map(([,t])=>{let n=e.current?.querySelector(t);return n?h(n):null}))},[]),(0,j.jsxs)(g,{children:[(0,j.jsx)(`div`,{ref:e,children:(0,j.jsx)(D,{inicial:P(`n1`),forzar:`hover`})}),(0,j.jsx)(b,{titulo:`Sizes`,nota:`Medidas leídas de la fila de arriba, ya dibujada.`,children:(0,j.jsx)(p,{encabezado:[`Part`,`Width`,`Height`,`Padding`,`Text`,`Radius`],minimo:620,children:J.map(([e],n)=>{let r=t[n];return(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:e}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?.ancho??`—`}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?.alto??`—`}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?.padding??`—`}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?`${r.texto} · ${r.peso}`:`—`}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?.radio??`—`})]},e)})})}),(0,j.jsx)(b,{titulo:`Colors`,nota:`Los tokens de cada parte. Salen de Notifications.tsx y su valor de src/index.css.`,children:(0,j.jsxs)(p,{encabezado:[`Part`,`Token`],minimo:480,children:[(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Unread row`}),(0,j.jsxs)(`td`,{children:[(0,j.jsx)(x,{nombre:`info-bg`}),` at 50% · dot `,(0,j.jsx)(x,{nombre:`dash-blue`})]})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Hover`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(x,{nombre:`surface-subtle`})})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Icon`}),(0,j.jsxs)(`td`,{children:[(0,j.jsx)(x,{nombre:`surface-slate`}),` · icon `,(0,j.jsx)(x,{nombre:`ink-slate`})]})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Action link`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(x,{nombre:`dash-blue`})})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Divider`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(x,{nombre:`line-row`})})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Tooltip`}),(0,j.jsxs)(`td`,{children:[(0,j.jsx)(x,{nombre:`ink`}),` · text `,(0,j.jsx)(x,{nombre:`white`})]})]})]})}),(0,j.jsx)(b,{titulo:`Shared rules`,children:(0,j.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,j.jsx)(`li`,{children:`Two states only: unread and read. No Pending, no Archived.`}),(0,j.jsx)(`li`,{children:`Opening a notification marks it read and goes where it happened.`}),(0,j.jsx)(`li`,{children:`The row action is the eye: Mark as read (eye) or Mark as unread (eye off). It shows on hover or keyboard focus, with its tooltip; on small screens it is always visible.`}),(0,j.jsx)(`li`,{children:`Mark all as read comes with Undo.`}),(0,j.jsx)(`li`,{children:`Tasks go to the banner while they are unread.`}),(0,j.jsx)(`li`,{children:`The icon is gray for every notification.`}),(0,j.jsx)(`li`,{children:`The date filter narrows the tab counts, the list and Mark all as read to the chosen dates.`}),(0,j.jsx)(`li`,{children:`Groups: Today, Yesterday, This week (calendar days), then one per month.`})]})})]})}var A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X;function Z(){return(Z=e((()=>{A=t(),a(),s(),d(),i(),m(),l(),T(),j=n(),M={title:`Pages/Parts/Notifications`,parameters:{layout:`padded`,docs:{decisionsFrom:`pages/Notifications.tsx`,description:{component:["Una notificación de la pantalla *Notifications* (`@/pages/Notifications`), con la lógica del Inbox de Notion. La pantalla completa, con sus pestañas *Inbox* y *Unread*, está en *Pages*.",``,`**Estados:** *Unread* (punto azul, fondo apenas azul, título en negrita) · *Read* (texto más apagado). Abrirla la marca leída. *Pending* y *Archived* se sacaron (Julián, 2026-10-13).`,``,`**La acción:** el ojo. *Mark as read* (ojo abierto) en las sin leer, *Mark as unread* (ojo tachado) en las leídas.`,``,`**Ícono:** gris en todas.`,``,`**Tipos:** *Task* (firmar, confirmar, verificar; va al banner mientras esté sin leer) · *Notice* (un pago, una mención). Se ven igual: lo que cambia es si va al banner.`,``,`**En el celular** no hay hover: el ojo queda siempre a la vista (ver *Guidelines › On each device*).`,``,`**Con muchas notificaciones:** el filtro de fecha (*Elements / Date filter*) en la fila de las pestañas acota los números, la lista y *Mark all as read*; lo de más de una semana se agrupa por mes (*Earlier this month*, *September*…), no en un solo *Older*.`,``,`**Probalo:** en *Playground* cambiá estado, tipo, texto y hace cuánto llegó desde *Controls*; pasá el mouse por la fila y tocá el ojo.`].join(`
`)}}},args:{title:`Document awaiting your signature`,detail:`Consent form for Mara Otero — sent 2 days ago.`,state:`unread`,type:`task`,minutesAgo:25,author:``,actions:`on hover`},argTypes:{title:{control:`text`,description:`Qué pasó, en una línea.`},detail:{control:`text`,description:`El detalle: a quién y cuándo.`},state:{control:`inline-radio`,options:[`unread`,`read`],description:`Sin leer o leída.`},type:{control:`inline-radio`,options:[`task`,`notice`],description:`Task: va al banner mientras esté sin leer. Notice: no. El ícono es gris en los dos.`},minutesAgo:{control:{type:`number`,min:0},description:`Minutos desde que llegó: 25m ago, 3h ago, Yesterday, 4d ago…`},author:{control:`text`,description:`Quién la generó, si fue una persona.`},actions:{control:`inline-radio`,options:[`on hover`,`shown`],description:`Deja el ojo a la vista, como al pasar el mouse.`,table:{category:`Preview`}}}},N=()=>{},P=(e,t={})=>({...r.find(t=>t.id===e),...t}),F=({children:e})=>(0,j.jsx)(`div`,{className:`bg-page-background p-4 sm:p-6`,children:e}),I=({children:e})=>(0,j.jsx)(`ul`,{className:`m-0 w-full max-w-[820px] list-none overflow-hidden rounded-lg border border-line bg-white p-0`,children:e}),L={render:e=>{let t=P(`n1`,{titulo:e.title,detalle:e.detail,estado:e.state,tarea:e.type===`task`,icon:P(e.type===`task`?`n1`:`n7`).icon,hace:e.minutesAgo,autor:e.author||void 0});return(0,j.jsx)(F,{children:(0,j.jsx)(D,{inicial:t,forzar:e.actions===`shown`?`hover`:void 0},JSON.stringify(e))})}},R=[[`Dot`,`Azul si no se leyó. Leída, no hay punto. Va centrado con el ícono.`],[`Icon`,`Qué tipo de aviso es. Gris en todas.`],[`Title`,`Qué pasó, en una línea. En negrita mientras esté sin leer; centrado con el ícono y el punto.`],[`Background`,`Apenas azul si está sin leer, blanco si está leída.`],[`Detail`,`A quién y cuándo. Más apagado cuando está leída.`],[`Time · author · action`,`Hace cuánto llegó, quién la generó y a dónde lleva (el mismo texto que el banner). Tocar la fila la abre y la marca leída.`],[`Row action`,`El ojo: Mark as read (abierto) o Mark as unread (tachado), con tooltip. Aparece al pasar el mouse o al llegar con Tab; en pantallas chicas queda a la vista.`]],z={parameters:{controls:{disable:!0}},render:()=>(0,j.jsx)(F,{children:(0,j.jsxs)(g,{children:[(0,j.jsx)(D,{inicial:P(`n4`),forzar:`hover`}),(0,j.jsx)(p,{encabezado:[`Part`,`What it does`],minimo:560,arriba:!0,children:R.map(([e,t])=>(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:e}),(0,j.jsx)(`td`,{className:`text-ink-medium`,children:t})]},e))})]})})},B={parameters:{controls:{disable:!0}},render:()=>(0,j.jsx)(F,{children:(0,j.jsxs)(g,{children:[(0,j.jsx)(O,{titulo:`Unread`,nota:`Punto azul, fondo apenas azul y título en negrita. Cuenta en el número de la campana.`,children:(0,j.jsx)(D,{inicial:P(`n3`)})}),(0,j.jsx)(O,{titulo:`Read`,nota:`Sin punto y con el detalle más apagado. Abrir una sin leer la deja así.`,children:(0,j.jsx)(D,{inicial:P(`n9`)})}),(0,j.jsx)(O,{titulo:`Hover · read`,nota:`Fondo gris, la acción subrayada y el ojo tachado (Mark as unread) a la vista.`,children:(0,j.jsx)(D,{inicial:P(`n6`),forzar:`hover`})}),(0,j.jsx)(O,{titulo:`Hover · unread`,nota:`El fondo pasa a gris como en las leídas; el punto azul y la negrita quedan, y aparece el ojo (Mark as read).`,children:(0,j.jsx)(D,{inicial:P(`n3`),forzar:`hover`})}),(0,j.jsx)(O,{titulo:`Keyboard focus · action`,nota:`Al llegar con Tab a un ícono aparecen las acciones y el ícono lleva el anillo azul.`,children:(0,j.jsx)(D,{inicial:P(`n6`),forzar:`focus-visible`})}),(0,j.jsx)(O,{titulo:`Keyboard focus · row`,nota:`Con Tab sobre el contenido: anillo azul alrededor del texto; Enter la abre y la marca leída.`,children:(0,j.jsx)(y,{selector:`li`,estado:`focus-within`,children:(0,j.jsx)(y,{selector:`li > button`,estado:`focus-visible`,children:(0,j.jsx)(D,{inicial:P(`n3`)})})})})]})})},V={parameters:{controls:{disable:!0}},render:()=>(0,j.jsx)(F,{children:(0,j.jsxs)(g,{children:[(0,j.jsx)(O,{titulo:`Task`,nota:`Algo para hacer: firmar, confirmar un turno, verificar un seguro. Va al banner de arriba mientras esté sin leer. Ícono gris, como todas.`,children:(0,j.jsx)(D,{inicial:P(`n2`)})}),(0,j.jsx)(O,{titulo:`Notice`,nota:`Algo que pasó: un pago, un resultado, un plan aceptado. No va al banner.`,children:(0,j.jsx)(D,{inicial:P(`n7`,{estado:`unread`})})}),(0,j.jsx)(O,{titulo:`Mention`,nota:`Un aviso con autor: “hace cuánto · quién · acción”.`,children:(0,j.jsx)(D,{inicial:P(`n5`)})})]})})},H=[[`Unread · task`,`Punto y fondo azul, ícono gris.`,P(`n1`)],[`Unread · notice`,`Igual que la tarea: el tipo no cambia cómo se ve.`,P(`n3`)],[`Read · task`,`Sin punto ni fondo, texto apagado. Ya no va al banner.`,P(`n2`,{estado:`read`})],[`Read · notice`,`Sin punto ni fondo, texto apagado.`,P(`n7`)]],U={parameters:{controls:{disable:!0}},render:()=>(0,j.jsx)(F,{children:(0,j.jsx)(g,{children:H.map(([e,t,n])=>(0,j.jsx)(O,{titulo:e,nota:t,children:(0,j.jsx)(D,{inicial:n})},e))})})},W={parameters:{controls:{disable:!0}},render:()=>(0,j.jsx)(F,{children:(0,j.jsxs)(g,{children:[(0,j.jsx)(O,{titulo:`Long text`,nota:`Título y detalle largos bajan de línea; el punto, el ícono y el ojo quedan arriba, centrados con la primera línea.`,children:(0,j.jsx)(D,{inicial:P(`n2`,{titulo:`Referral to Dr. Alvarez for periodontal evaluation expires today and still needs your approval`,detalle:`Mara Otero · Periodontics referral sent on September 12 — the patient is waiting for a call from the specialist’s office to schedule the first visit.`})})}),(0,j.jsx)(O,{titulo:`With author`,nota:`Cuando la generó una persona: “hace cuánto · quién · acción”.`,children:(0,j.jsx)(D,{inicial:P(`n5`)})}),(0,j.jsx)(O,{titulo:`Without author`,nota:`Cuando la genera el sistema: “hace cuánto · acción”.`,children:(0,j.jsx)(D,{inicial:P(`n3`)})}),(0,j.jsx)(b,{titulo:`Time`,nota:`Cómo se escribe hace cuánto llegó, según los minutos.`,children:(0,j.jsx)(I,{children:[[`Just now`,0],[`Minutes`,25],[`Hours`,180],[`Yesterday`,1560],[`Days`,5760],[`Older than a week`,17280]].map(([e,t])=>(0,j.jsx)(w,{n:P(`n7`,{titulo:e,hace:t}),onAbrir:N,onMarcar:N},e))})})]})})},G={parameters:{controls:{disable:!0}},render:()=>(0,j.jsx)(F,{children:(0,j.jsxs)(g,{children:[Object.keys(C).map(e=>(0,j.jsx)(O,{titulo:e,nota:C[e].detail,children:(0,j.jsx)(`div`,{className:`max-w-[820px] rounded-lg border border-line bg-white`,children:(0,j.jsx)(u,{className:`py-10`,...C[e]})})},e)),Object.keys(S).map(e=>(0,j.jsx)(O,{titulo:`${e} · with dates`,nota:`Nada en las fechas elegidas: lo dice y Clear dates vuelve a All dates.`,children:(0,j.jsx)(`div`,{className:`max-w-[820px] rounded-lg border border-line bg-white`,children:(0,j.jsx)(u,{className:`py-10`,icon:o,title:S[e],detail:`Pick other dates, or clear them to see everything.`,accion:{label:`Clear dates`,onClick:N}})})},`fechas-${e}`))]})})},K=[[`Mark as read`,c],[`Mark as unread`,f]],q={parameters:{controls:{disable:!0}},render:()=>(0,j.jsx)(F,{children:(0,j.jsx)(v,{children:K.map(([e,t])=>(0,j.jsx)(_,{rotulo:e,children:(0,j.jsx)(E,{label:e,icon:t,onClick:N})},e))})})},J=[[`Row`,`li`],[`Dot`,`li > span:first-child`],[`Icon`,`li > span:nth-child(2)`],[`Title`,`li > button > span:first-child > span:first-child`],[`Detail`,`li > button > span:nth-child(2)`],[`Time · author · action`,`li > button > span:nth-child(3)`],[`Row action`,`li > span:last-child button`]],Y={parameters:{controls:{disable:!0}},render:()=>(0,j.jsx)(F,{children:(0,j.jsx)(k,{})})},X=[`Playground`,`Parts`,`States`,`Types`,`Variants`,`Content`,`EmptyStates`,`RowActions`,`Specs`],L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: a => {
    const n = base('n1', {
      titulo: a.title,
      detalle: a.detail,
      estado: a.state,
      tarea: a.type === 'task',
      icon: base(a.type === 'task' ? 'n1' : 'n7').icon,
      hace: a.minutesAgo,
      autor: a.author || undefined
    });
    return <Fondo>
        <FilaViva key={JSON.stringify(a)} inicial={n} forzar={a.actions === 'shown' ? 'hover' : undefined} />
      </Fondo>;
  }
}`,...L.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Fondo>
      <Lienzo>
        <FilaViva inicial={base('n4')} forzar="hover" />
        <Tabla encabezado={['Part', 'What it does']} minimo={560} arriba>
          {PARTES.map(([parte, que]) => <tr key={parte}>
              <td className="font-semibold whitespace-nowrap">{parte}</td>
              <td className="text-ink-medium">{que}</td>
            </tr>)}
        </Tabla>
      </Lienzo>
    </Fondo>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Fondo>
      <Lienzo>
        <Estado titulo="Unread" nota="Punto azul, fondo apenas azul y título en negrita. Cuenta en el número de la campana.">
          <FilaViva inicial={base('n3')} />
        </Estado>
        <Estado titulo="Read" nota="Sin punto y con el detalle más apagado. Abrir una sin leer la deja así.">
          <FilaViva inicial={base('n9')} />
        </Estado>
        <Estado titulo="Hover · read" nota="Fondo gris, la acción subrayada y el ojo tachado (Mark as unread) a la vista.">
          <FilaViva inicial={base('n6')} forzar="hover" />
        </Estado>
        <Estado titulo="Hover · unread" nota="El fondo pasa a gris como en las leídas; el punto azul y la negrita quedan, y aparece el ojo (Mark as read).">
          <FilaViva inicial={base('n3')} forzar="hover" />
        </Estado>
        <Estado titulo="Keyboard focus · action" nota="Al llegar con Tab a un ícono aparecen las acciones y el ícono lleva el anillo azul.">
          <FilaViva inicial={base('n6')} forzar="focus-visible" />
        </Estado>
        <Estado titulo="Keyboard focus · row" nota="Con Tab sobre el contenido: anillo azul alrededor del texto; Enter la abre y la marca leída.">
          <Forzar selector="li" estado="focus-within"><Forzar selector="li > button" estado="focus-visible"><FilaViva inicial={base('n3')} /></Forzar></Forzar>
        </Estado>
      </Lienzo>
    </Fondo>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Fondo>
      <Lienzo>
        <Estado titulo="Task" nota="Algo para hacer: firmar, confirmar un turno, verificar un seguro. Va al banner de arriba mientras esté sin leer. Ícono gris, como todas.">
          <FilaViva inicial={base('n2')} />
        </Estado>
        <Estado titulo="Notice" nota="Algo que pasó: un pago, un resultado, un plan aceptado. No va al banner.">
          <FilaViva inicial={base('n7', {
          estado: 'unread'
        })} />
        </Estado>
        <Estado titulo="Mention" nota="Un aviso con autor: “hace cuánto · quién · acción”.">
          <FilaViva inicial={base('n5')} />
        </Estado>
      </Lienzo>
    </Fondo>
}`,...V.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Fondo>
      <Lienzo>
        {VARIANTES.map(([titulo, nota, n]) => <Estado key={titulo} titulo={titulo} nota={nota}><FilaViva inicial={n} /></Estado>)}
      </Lienzo>
    </Fondo>
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Fondo>
      <Lienzo>
        <Estado titulo="Long text" nota="Título y detalle largos bajan de línea; el punto, el ícono y el ojo quedan arriba, centrados con la primera línea.">
          <FilaViva inicial={base('n2', {
          titulo: 'Referral to Dr. Alvarez for periodontal evaluation expires today and still needs your approval',
          detalle: 'Mara Otero · Periodontics referral sent on September 12 — the patient is waiting for a call from the specialist’s office to schedule the first visit.'
        })} />
        </Estado>
        <Estado titulo="With author" nota="Cuando la generó una persona: “hace cuánto · quién · acción”.">
          <FilaViva inicial={base('n5')} />
        </Estado>
        <Estado titulo="Without author" nota="Cuando la genera el sistema: “hace cuánto · acción”.">
          <FilaViva inicial={base('n3')} />
        </Estado>
        <Bloque titulo="Time" nota="Cómo se escribe hace cuánto llegó, según los minutos.">
          <Lista>
            {([['Just now', 0], ['Minutes', 25], ['Hours', 3 * 60], ['Yesterday', 26 * 60], ['Days', 4 * 24 * 60], ['Older than a week', 12 * 24 * 60]] as const).map(([titulo, hace]) => <FilaNotificacion key={titulo} n={base('n7', {
            titulo,
            hace
          })} onAbrir={nada} onMarcar={nada} />)}
          </Lista>
        </Bloque>
      </Lienzo>
    </Fondo>
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Fondo>
      <Lienzo>
        {(Object.keys(VACIO) as Vista[]).map(v => <Estado key={v} titulo={v} nota={VACIO[v].detail}>
            <div className="max-w-[820px] rounded-lg border border-line bg-white"><EmptyState className="py-10" {...VACIO[v]} /></div>
          </Estado>)}
        {(Object.keys(VACIO_FECHAS) as Vista[]).map(v => <Estado key={\`fechas-\${v}\`} titulo={\`\${v} · with dates\`} nota="Nada en las fechas elegidas: lo dice y Clear dates vuelve a All dates.">
            <div className="max-w-[820px] rounded-lg border border-line bg-white">
              <EmptyState className="py-10" icon={CalendarX2} title={VACIO_FECHAS[v]} detail="Pick other dates, or clear them to see everything." accion={{
            label: 'Clear dates',
            onClick: nada
          }} />
            </div>
          </Estado>)}
      </Lienzo>
    </Fondo>
}`,...G.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Fondo>
      <Muestras>
        {ACCIONES.map(([label, icon]) => <ConRotulo key={label} rotulo={label}><Accion label={label} icon={icon} onClick={nada} /></ConRotulo>)}
      </Muestras>
    </Fondo>
}`,...q.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Fondo><Medir /></Fondo>
}`,...Y.parameters?.docs?.source}}}})))()}Z();export{W as Content,G as EmptyStates,z as Parts,L as Playground,q as RowActions,Y as Specs,B as States,V as Types,U as Variants,X as __namedExportsOrder,M as default};