import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,t as i}from"./archive-restore-gh50slrQ.js";import{n as a,t as o}from"./archive-B4t4KjDq.js";import{i as s,t as c}from"./notificaciones-BMp9k9Ka.js";import{n as ee,t as l}from"./clock-CvSd1j8k.js";import{a as u,i as d,n as f,o as p,s as m,t as h}from"./Notifications-jf-9LhAv.js";import{n as g,t as _}from"./mail-CHKec-0i.js";import{n as v,t as y}from"./empty-state-yo-tjb-R.js";import{c as b,d as x,f as S,i as C,n as w,o as T,r as E,t as D,u as O}from"./kit-4bQS7S9u.js";function k({inicial:e,forzar:t}){let[n,r]=(0,M.useState)(e),i=(0,N.jsx)(R,{children:(0,N.jsx)(f,{n,onAbrir:()=>r(e=>({...e,estado:e.estado===`unread`?`read`:e.estado})),onMarcar:(e,t)=>r(e=>({...e,estado:t})),onArchivar:(e,t)=>r(e=>({...e,archivada:t}))})});return t===`hover`?(0,N.jsx)(E,{selector:`li`,estado:`hover`,children:i}):t===`focus-visible`?(0,N.jsx)(E,{selector:`li`,estado:`focus-within`,children:(0,N.jsx)(E,{selector:`li > span:last-child button`,estado:`focus-visible`,children:i})}):i}function A({titulo:e,nota:t,children:n}){return(0,N.jsxs)(`figure`,{className:`m-0 flex flex-col gap-2`,children:[(0,N.jsxs)(`figcaption`,{className:`flex flex-col gap-0.5`,children:[(0,N.jsx)(`span`,{className:`text-[12.5px] font-semibold text-ink`,children:e}),(0,N.jsx)(`span`,{className:`text-[11.5px] leading-snug text-ink-muted`,children:t})]}),n]})}function j(){let e=(0,M.useRef)(null),[t,n]=(0,M.useState)([]);return(0,M.useLayoutEffect)(()=>{n(X.map(([,t])=>{let n=e.current?.querySelector(t);return n?S(n):null}))},[]),(0,N.jsxs)(C,{children:[(0,N.jsx)(`div`,{ref:e,children:(0,N.jsx)(k,{inicial:I(`n1`),forzar:`hover`})}),(0,N.jsx)(D,{titulo:`Sizes`,nota:`Medidas leídas de la fila de arriba, ya dibujada.`,children:(0,N.jsx)(b,{encabezado:[`Part`,`Width`,`Height`,`Padding`,`Text`,`Radius`],minimo:620,children:X.map(([e],n)=>{let r=t[n];return(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:e}),(0,N.jsx)(`td`,{className:`tabular-nums`,children:r?.ancho??`—`}),(0,N.jsx)(`td`,{className:`tabular-nums`,children:r?.alto??`—`}),(0,N.jsx)(`td`,{className:`tabular-nums`,children:r?.padding??`—`}),(0,N.jsx)(`td`,{className:`tabular-nums`,children:r?`${r.texto} · ${r.peso}`:`—`}),(0,N.jsx)(`td`,{className:`tabular-nums`,children:r?.radio??`—`})]},e)})})}),(0,N.jsx)(D,{titulo:`Colors`,nota:`Los tokens de cada parte. Salen de Notifications.tsx y su valor de src/index.css.`,children:(0,N.jsxs)(b,{encabezado:[`Part`,`Token`],minimo:480,children:[(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`td`,{className:`font-semibold`,children:`Unread row`}),(0,N.jsxs)(`td`,{children:[(0,N.jsx)(O,{nombre:`info-bg`}),` at 50% · dot `,(0,N.jsx)(O,{nombre:`dash-blue`})]})]}),(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`td`,{className:`font-semibold`,children:`Hover`}),(0,N.jsx)(`td`,{children:(0,N.jsx)(O,{nombre:`surface-subtle`})})]}),(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`td`,{className:`font-semibold`,children:`Icon`}),(0,N.jsxs)(`td`,{children:[(0,N.jsx)(O,{nombre:`surface-slate`}),` · icon `,(0,N.jsx)(O,{nombre:`ink-slate`})]})]}),(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`td`,{className:`font-semibold`,children:`Pending icon`}),(0,N.jsxs)(`td`,{children:[(0,N.jsx)(O,{nombre:`amber`}),` at 15% · icon `,(0,N.jsx)(O,{nombre:`attn-fg`})]})]}),(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`td`,{className:`font-semibold`,children:`Pending row`}),(0,N.jsxs)(`td`,{children:[(0,N.jsx)(O,{nombre:`warn-bg`}),` · dot `,(0,N.jsx)(O,{nombre:`amber`}),` · clock `,(0,N.jsx)(O,{nombre:`warn-fg`})]})]}),(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`td`,{className:`font-semibold`,children:`Action link`}),(0,N.jsx)(`td`,{children:(0,N.jsx)(O,{nombre:`dash-blue`})})]}),(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`td`,{className:`font-semibold`,children:`Divider`}),(0,N.jsx)(`td`,{children:(0,N.jsx)(O,{nombre:`line-row`})})]}),(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`td`,{className:`font-semibold`,children:`Tooltip`}),(0,N.jsxs)(`td`,{children:[(0,N.jsx)(O,{nombre:`ink`}),` · text `,(0,N.jsx)(O,{nombre:`white`})]})]})]})}),(0,N.jsx)(D,{titulo:`Shared rules`,children:(0,N.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,N.jsx)(`li`,{children:`Opening a notification marks it read and goes where it happened; a pending one stays pending.`}),(0,N.jsx)(`li`,{children:`Archiving, Archive read, Archive all and Mark all as read always come with Undo.`}),(0,N.jsx)(`li`,{children:`Row actions show on hover or keyboard focus, each with its tooltip; on small screens they are always visible.`}),(0,N.jsx)(`li`,{children:`Tasks go to the banner while they are unread or pending and not archived.`}),(0,N.jsx)(`li`,{children:`The icon is gray for every notification; it only turns amber when the notification is pending.`})]})})]})}var M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{M=t(),a(),r(),ee(),g(),m(),s(),x(),v(),u(),N=n(),P={title:`Pages/Parts/Notifications`,parameters:{layout:`padded`,docs:{decisionsFrom:`pages/Notifications.tsx`,description:{component:["Una notificación de la pantalla *Notifications* (`@/pages/Notifications`), con la lógica del Inbox de Notion. La pantalla completa, con sus pestañas y acciones en lote, está en *Pages*.",``,"**Estados:** *Unread* (punto azul, fondo apenas azul, título en negrita) · *Read* (texto más apagado) · *Pending* (lo mismo que sin leer pero en amarillo: punto `amber`, fondo amarillo tenue e ícono ámbar; quedó para hacer). Abrirla la marca leída; una pendiente sigue pendiente. Archivada sale del Inbox y vuelve con *Move to inbox*.",``,`**Ícono:** gris en todas; el color sólo cambia cuando está pendiente.`,``,`**Tipos:** *Task* (firmar, confirmar, verificar; va al banner mientras no esté leída) · *Notice* (un pago, una mención). Se ven igual: lo que cambia es si va al banner.`,``,`**En el celular** no hay hover: las acciones quedan siempre a la vista (ver *Guidelines › On each device*).`,``,`**Probalo:** en *Playground* cambiá estado, tipo, texto y hace cuánto llegó desde *Controls*; pasá el mouse por la fila para ver las acciones, cada una con su tooltip.`].join(`
`)}}},args:{title:`Document awaiting your signature`,detail:`Consent form for Mara Otero — sent 2 days ago.`,state:`unread`,type:`task`,archived:!1,minutesAgo:25,author:``,actions:`on hover`},argTypes:{title:{control:`text`,description:`Qué pasó, en una línea.`},detail:{control:`text`,description:`El detalle: a quién y cuándo.`},state:{control:`inline-radio`,options:[`unread`,`read`,`pending`],description:`Sin leer, leída o pendiente.`},type:{control:`inline-radio`,options:[`task`,`notice`],description:`Task: va al banner mientras no esté leída. Notice: no. El ícono es gris en los dos.`},archived:{control:`boolean`,description:`Archivada: la acción pasa a Move to inbox.`},minutesAgo:{control:{type:`number`,min:0},description:`Minutos desde que llegó: 25m ago, 3h ago, Yesterday, 4d ago…`},author:{control:`text`,description:`Quién la generó, si fue una persona.`},actions:{control:`inline-radio`,options:[`on hover`,`shown`],description:`Deja las acciones a la vista, como al pasar el mouse.`,table:{category:`Preview`}}}},F=()=>{},I=(e,t={})=>({...c.find(t=>t.id===e),archivada:!1,...t}),L=({children:e})=>(0,N.jsx)(`div`,{className:`bg-page-background p-4 sm:p-6`,children:e}),R=({children:e})=>(0,N.jsx)(`ul`,{className:`m-0 w-full max-w-[820px] list-none overflow-hidden rounded-lg border border-line bg-white p-0`,children:e}),z={render:e=>{let t=I(`n1`,{titulo:e.title,detalle:e.detail,estado:e.state,tarea:e.type===`task`,icon:I(e.type===`task`?`n1`:`n7`).icon,archivada:e.archived,hace:e.minutesAgo,autor:e.author||void 0});return(0,N.jsx)(L,{children:(0,N.jsx)(k,{inicial:t,forzar:e.actions===`shown`?`hover`:void 0},JSON.stringify(e))})}},B=[[`Dot`,`Azul si no se leyó, amarillo si está pendiente. Leída, no hay punto. Va centrado con el ícono.`],[`Icon`,`Qué tipo de aviso es. Gris en todas; ámbar sólo cuando está pendiente.`],[`Title`,`Qué pasó, en una línea. En negrita mientras esté sin leer o pendiente; centrado con el ícono y el punto.`],[`Background`,`Apenas azul si está sin leer, amarillo tenue si está pendiente, blanco si está leída.`],[`Detail`,`A quién y cuándo. Más apagado cuando está leída.`],[`Time · author · action`,`Hace cuánto llegó, quién la generó y a dónde lleva (el mismo texto que el banner). Tocar la fila la abre y la marca leída.`],[`Row actions`,`Leída/no leída, pendiente y archivar, con tooltip. Aparecen al pasar el mouse o al llegar con Tab; en pantallas chicas quedan a la vista.`]],V={parameters:{controls:{disable:!0}},render:()=>(0,N.jsx)(L,{children:(0,N.jsxs)(C,{children:[(0,N.jsx)(k,{inicial:I(`n4`),forzar:`hover`}),(0,N.jsx)(b,{encabezado:[`Part`,`What it does`],minimo:560,arriba:!0,children:B.map(([e,t])=>(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:e}),(0,N.jsx)(`td`,{className:`text-ink-medium`,children:t})]},e))})]})})},H={parameters:{controls:{disable:!0}},render:()=>(0,N.jsx)(L,{children:(0,N.jsxs)(C,{children:[(0,N.jsx)(A,{titulo:`Unread`,nota:`Punto azul, fondo apenas azul y título en negrita. Cuenta en el número de la campana.`,children:(0,N.jsx)(k,{inicial:I(`n3`)})}),(0,N.jsx)(A,{titulo:`Read`,nota:`Sin punto y con el detalle más apagado. Abrir una sin leer la deja así.`,children:(0,N.jsx)(k,{inicial:I(`n9`)})}),(0,N.jsx)(A,{titulo:`Pending`,nota:`Quedó para hacer: como sin leer, pero en amarillo (punto, fondo e ícono), y el reloj activo. Abrirla no le saca el pendiente.`,children:(0,N.jsx)(k,{inicial:I(`n4`)})}),(0,N.jsx)(A,{titulo:`Archived`,nota:`Fuera del Inbox, en la pestaña Archived. La acción pasa a Move to inbox.`,children:(0,N.jsx)(k,{inicial:I(`n10`,{archivada:!0})})}),(0,N.jsx)(A,{titulo:`Hover · read`,nota:`Fondo gris, la acción subrayada y los tres íconos a la vista.`,children:(0,N.jsx)(k,{inicial:I(`n6`),forzar:`hover`})}),(0,N.jsx)(A,{titulo:`Hover · unread`,nota:`El fondo pasa a gris como en las leídas; el punto azul y la negrita quedan.`,children:(0,N.jsx)(k,{inicial:I(`n3`),forzar:`hover`})}),(0,N.jsx)(A,{titulo:`Hover · pending`,nota:`Igual: fondo gris; el punto, el ícono ámbar y el reloj activo quedan.`,children:(0,N.jsx)(k,{inicial:I(`n4`),forzar:`hover`})}),(0,N.jsx)(A,{titulo:`Keyboard focus · action`,nota:`Al llegar con Tab a un ícono aparecen las acciones y el ícono lleva el anillo azul.`,children:(0,N.jsx)(k,{inicial:I(`n6`),forzar:`focus-visible`})}),(0,N.jsx)(A,{titulo:`Keyboard focus · row`,nota:`Con Tab sobre el contenido: anillo azul alrededor del texto; Enter la abre y la marca leída.`,children:(0,N.jsx)(E,{selector:`li`,estado:`focus-within`,children:(0,N.jsx)(E,{selector:`li > button`,estado:`focus-visible`,children:(0,N.jsx)(k,{inicial:I(`n3`)})})})})]})})},U={parameters:{controls:{disable:!0}},render:()=>(0,N.jsx)(L,{children:(0,N.jsxs)(C,{children:[(0,N.jsx)(A,{titulo:`Task`,nota:`Algo para hacer: firmar, confirmar un turno, verificar un seguro. Va al banner de arriba mientras no esté leída ni archivada. Ícono gris, como todas.`,children:(0,N.jsx)(k,{inicial:I(`n2`)})}),(0,N.jsx)(A,{titulo:`Notice`,nota:`Algo que pasó: un pago, un resultado, un plan aceptado. No va al banner.`,children:(0,N.jsx)(k,{inicial:I(`n7`,{estado:`unread`})})}),(0,N.jsx)(A,{titulo:`Mention`,nota:`Un aviso con autor: “hace cuánto · quién · acción”.`,children:(0,N.jsx)(k,{inicial:I(`n5`)})})]})})},W=[[`Unread · task`,`Punto y fondo azul, ícono gris.`,I(`n1`)],[`Unread · notice`,`Igual que la tarea: el tipo no cambia cómo se ve.`,I(`n3`)],[`Read · task`,`Sin punto ni fondo, texto apagado. Ya no va al banner.`,I(`n2`,{estado:`read`})],[`Read · notice`,`Sin punto ni fondo, texto apagado.`,I(`n7`)],[`Pending · task`,`Punto, fondo e ícono en amarillo; reloj activo. Sigue en el banner.`,I(`n4`)],[`Pending · notice`,`Lo mismo: pendiente se ve igual en los dos tipos.`,I(`n3`,{estado:`pending`})],[`Archived · read`,`En Archived, con Move to inbox.`,I(`n10`,{archivada:!0})],[`Archived · unread`,`Archivada sin leer: conserva el punto azul.`,I(`n5`,{archivada:!0})],[`Archived · pending`,`Archivada pendiente: conserva el amarillo; sale del banner.`,I(`n8`,{archivada:!0})]],G={parameters:{controls:{disable:!0}},render:()=>(0,N.jsx)(L,{children:(0,N.jsx)(C,{children:W.map(([e,t,n])=>(0,N.jsx)(A,{titulo:e,nota:t,children:(0,N.jsx)(k,{inicial:n})},e))})})},K={parameters:{controls:{disable:!0}},render:()=>(0,N.jsx)(L,{children:(0,N.jsxs)(C,{children:[(0,N.jsx)(A,{titulo:`Long text`,nota:`Título y detalle largos bajan de línea; el punto, el ícono y las acciones quedan arriba, centrados con la primera línea.`,children:(0,N.jsx)(k,{inicial:I(`n2`,{titulo:`Referral to Dr. Alvarez for periodontal evaluation expires today and still needs your approval`,detalle:`Mara Otero · Periodontics referral sent on September 12 — the patient is waiting for a call from the specialist’s office to schedule the first visit.`})})}),(0,N.jsx)(A,{titulo:`With author`,nota:`Cuando la generó una persona: “hace cuánto · quién · acción”.`,children:(0,N.jsx)(k,{inicial:I(`n5`)})}),(0,N.jsx)(A,{titulo:`Without author`,nota:`Cuando la genera el sistema: “hace cuánto · acción”.`,children:(0,N.jsx)(k,{inicial:I(`n3`)})}),(0,N.jsx)(D,{titulo:`Time`,nota:`Cómo se escribe hace cuánto llegó, según los minutos.`,children:(0,N.jsx)(R,{children:[[`Just now`,0],[`Minutes`,25],[`Hours`,180],[`Yesterday`,1560],[`Days`,5760],[`Older than a week`,17280]].map(([e,t])=>(0,N.jsx)(f,{n:I(`n7`,{titulo:e,hace:t}),onAbrir:F,onMarcar:F,onArchivar:F},e))})})]})})},q={parameters:{controls:{disable:!0}},render:()=>(0,N.jsx)(L,{children:(0,N.jsx)(C,{children:Object.keys(d).map(e=>(0,N.jsx)(A,{titulo:e,nota:d[e].detail,children:(0,N.jsx)(`div`,{className:`max-w-[820px] rounded-lg border border-line bg-white`,children:(0,N.jsx)(y,{className:`py-10`,...d[e]})})},e))})})},J=[[`Mark as read`,p,!1],[`Mark as unread`,_,!1],[`Mark as pending`,l,!1],[`Remove from pending`,l,!0],[`Archive`,o,!1],[`Move to inbox`,i,!1]],Y={parameters:{controls:{disable:!0}},render:()=>(0,N.jsx)(L,{children:(0,N.jsx)(T,{children:J.map(([e,t,n])=>(0,N.jsx)(w,{rotulo:e,children:(0,N.jsx)(h,{label:e,icon:t,activo:n,onClick:F})},e))})})},X=[[`Row`,`li`],[`Dot`,`li > span:first-child`],[`Icon`,`li > span:nth-child(2)`],[`Title`,`li > button > span:first-child > span:first-child`],[`Detail`,`li > button > span:nth-child(2)`],[`Time · author · action`,`li > button > span:nth-child(3)`],[`Row action`,`li > span:last-child button`]],Z={parameters:{controls:{disable:!0}},render:()=>(0,N.jsx)(L,{children:(0,N.jsx)(j,{})})},Q=[`Playground`,`Parts`,`States`,`Types`,`Variants`,`Content`,`EmptyStates`,`RowActions`,`Specs`],z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: a => {
    const n = base('n1', {
      titulo: a.title,
      detalle: a.detail,
      estado: a.state,
      tarea: a.type === 'task',
      icon: base(a.type === 'task' ? 'n1' : 'n7').icon,
      archivada: a.archived,
      hace: a.minutesAgo,
      autor: a.author || undefined
    });
    return <Fondo>
        <FilaViva key={JSON.stringify(a)} inicial={n} forzar={a.actions === 'shown' ? 'hover' : undefined} />
      </Fondo>;
  }
}`,...z.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
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
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
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
        <Estado titulo="Pending" nota="Quedó para hacer: como sin leer, pero en amarillo (punto, fondo e ícono), y el reloj activo. Abrirla no le saca el pendiente.">
          <FilaViva inicial={base('n4')} />
        </Estado>
        <Estado titulo="Archived" nota="Fuera del Inbox, en la pestaña Archived. La acción pasa a Move to inbox.">
          <FilaViva inicial={base('n10', {
          archivada: true
        })} />
        </Estado>
        <Estado titulo="Hover · read" nota="Fondo gris, la acción subrayada y los tres íconos a la vista.">
          <FilaViva inicial={base('n6')} forzar="hover" />
        </Estado>
        <Estado titulo="Hover · unread" nota="El fondo pasa a gris como en las leídas; el punto azul y la negrita quedan.">
          <FilaViva inicial={base('n3')} forzar="hover" />
        </Estado>
        <Estado titulo="Hover · pending" nota="Igual: fondo gris; el punto, el ícono ámbar y el reloj activo quedan.">
          <FilaViva inicial={base('n4')} forzar="hover" />
        </Estado>
        <Estado titulo="Keyboard focus · action" nota="Al llegar con Tab a un ícono aparecen las acciones y el ícono lleva el anillo azul.">
          <FilaViva inicial={base('n6')} forzar="focus-visible" />
        </Estado>
        <Estado titulo="Keyboard focus · row" nota="Con Tab sobre el contenido: anillo azul alrededor del texto; Enter la abre y la marca leída.">
          <Forzar selector="li" estado="focus-within"><Forzar selector="li > button" estado="focus-visible"><FilaViva inicial={base('n3')} /></Forzar></Forzar>
        </Estado>
      </Lienzo>
    </Fondo>
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Fondo>
      <Lienzo>
        <Estado titulo="Task" nota="Algo para hacer: firmar, confirmar un turno, verificar un seguro. Va al banner de arriba mientras no esté leída ni archivada. Ícono gris, como todas.">
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
}`,...U.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
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
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Fondo>
      <Lienzo>
        <Estado titulo="Long text" nota="Título y detalle largos bajan de línea; el punto, el ícono y las acciones quedan arriba, centrados con la primera línea.">
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
          })} onAbrir={nada} onMarcar={nada} onArchivar={nada} />)}
          </Lista>
        </Bloque>
      </Lienzo>
    </Fondo>
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
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
      </Lienzo>
    </Fondo>
}`,...q.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Fondo>
      <Muestras>
        {ACCIONES.map(([label, icon, activo]) => <ConRotulo key={label} rotulo={label}><Accion label={label} icon={icon} activo={activo} onClick={nada} /></ConRotulo>)}
      </Muestras>
    </Fondo>
}`,...Y.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Fondo><Medir /></Fondo>
}`,...Z.parameters?.docs?.source}}}})))()}$();export{K as Content,q as EmptyStates,V as Parts,z as Playground,Y as RowActions,Z as Specs,H as States,U as Types,G as Variants,Q as __namedExportsOrder,P as default};