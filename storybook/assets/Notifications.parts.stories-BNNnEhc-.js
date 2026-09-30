import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,c as i,i as a,n as o,o as s,s as c,t as l}from"./Notifications-5iw-1cUW.js";import{n as u,t as d}from"./archive-B4t4KjDq.js";import{i as f,t as p}from"./notificaciones-DWle3tPr.js";import{n as m,t as h}from"./clock-CvSd1j8k.js";import{n as g,t as _}from"./mail-CHKec-0i.js";import{a as v,c as y,i as b,l as x,n as S,r as C,s as w,t as T,u as E}from"./kit-VhBMbBcY.js";function D({inicial:e,forzar:t}){let[n,r]=(0,A.useState)(e),i=(0,j.jsx)(I,{children:(0,j.jsx)(o,{n,onAbrir:()=>r(e=>({...e,estado:e.estado===`unread`?`read`:e.estado})),onMarcar:(e,t)=>r(e=>({...e,estado:t})),onArchivar:(e,t)=>r(e=>({...e,archivada:t}))})});return t===`hover`?(0,j.jsx)(C,{selector:`li`,estado:`hover`,children:i}):t===`focus-visible`?(0,j.jsx)(C,{selector:`li`,estado:`focus-within`,children:(0,j.jsx)(C,{selector:`li > span:last-child button`,estado:`focus-visible`,children:i})}):i}function O({titulo:e,nota:t,children:n}){return(0,j.jsxs)(`figure`,{className:`m-0 flex flex-col gap-2`,children:[(0,j.jsxs)(`figcaption`,{className:`flex flex-col gap-0.5`,children:[(0,j.jsx)(`span`,{className:`text-[12.5px] font-semibold text-ink`,children:e}),(0,j.jsx)(`span`,{className:`text-[11.5px] leading-snug text-ink-muted`,children:t})]}),n]})}function k(){let e=(0,A.useRef)(null),[t,n]=(0,A.useState)([]);return(0,A.useLayoutEffect)(()=>{n(W.map(([,t])=>{let n=e.current?.querySelector(t);return n?E(n):null}))},[]),(0,j.jsxs)(b,{children:[(0,j.jsx)(`div`,{ref:e,children:(0,j.jsx)(D,{inicial:P(`n1`),forzar:`hover`})}),(0,j.jsx)(T,{titulo:`Sizes`,nota:`Medidas leídas de la fila de arriba, ya dibujada.`,children:(0,j.jsx)(w,{encabezado:[`Part`,`Width`,`Height`,`Padding`,`Text`,`Radius`],minimo:620,children:W.map(([e],n)=>{let r=t[n];return(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:e}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?.ancho??`—`}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?.alto??`—`}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?.padding??`—`}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?`${r.texto} · ${r.peso}`:`—`}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?.radio??`—`})]},e)})})}),(0,j.jsx)(T,{titulo:`Colors`,nota:`Los tokens de cada parte. Salen de Notifications.tsx y su valor de src/index.css.`,children:(0,j.jsxs)(w,{encabezado:[`Part`,`Token`],minimo:480,children:[(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Unread row`}),(0,j.jsxs)(`td`,{children:[(0,j.jsx)(y,{nombre:`info-bg`}),` at 50% · dot `,(0,j.jsx)(y,{nombre:`dash-blue`})]})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Hover`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(y,{nombre:`surface-subtle`})})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Task icon`}),(0,j.jsxs)(`td`,{children:[(0,j.jsx)(y,{nombre:`amber`}),` at 15% · icon `,(0,j.jsx)(y,{nombre:`attn-fg`})]})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Notice icon`}),(0,j.jsxs)(`td`,{children:[(0,j.jsx)(y,{nombre:`surface-slate`}),` · icon `,(0,j.jsx)(y,{nombre:`ink-slate`})]})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Pending row`}),(0,j.jsxs)(`td`,{children:[(0,j.jsx)(y,{nombre:`warn-bg`}),` · dot `,(0,j.jsx)(y,{nombre:`amber`}),` · clock `,(0,j.jsx)(y,{nombre:`warn-fg`})]})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Action link`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(y,{nombre:`dash-blue`})})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Divider`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(y,{nombre:`line-row`})})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Tooltip`}),(0,j.jsxs)(`td`,{children:[(0,j.jsx)(y,{nombre:`ink`}),` · text `,(0,j.jsx)(y,{nombre:`white`})]})]})]})}),(0,j.jsx)(T,{titulo:`Shared rules`,children:(0,j.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,j.jsx)(`li`,{children:`Opening a notification marks it read and goes where it happened; a pending one stays pending.`}),(0,j.jsx)(`li`,{children:`Archiving, Archive read, Archive all and Mark all as read always come with Undo.`}),(0,j.jsx)(`li`,{children:`Row actions show on hover or keyboard focus, each with its tooltip; on small screens they are always visible.`}),(0,j.jsx)(`li`,{children:`Tasks go to the banner while they are unread or pending and not archived.`})]})})]})}var A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K;function q(){return(q=e((()=>{A=t(),u(),i(),m(),g(),s(),f(),x(),a(),j=n(),M={title:`Pages/Parts/Notifications`,parameters:{layout:`padded`,docs:{decisionsFrom:`pages/Notifications.tsx`,description:{component:["Una notificación de la pantalla *Notifications* (`@/pages/Notifications`), con la lógica del Inbox de Notion. La pantalla completa, con sus pestañas y acciones en lote, está en *Pages*.",``,"**Estados:** *Unread* (punto azul, fondo apenas azul, título en negrita) · *Read* (texto más apagado) · *Pending* (lo mismo que sin leer pero en amarillo: punto `amber` y fondo amarillo tenue; quedó para hacer). Abrirla la marca leída; una pendiente sigue pendiente. Archivada sale del Inbox y vuelve con *Move to inbox*.",``,`**Tipos:** *Task* (ícono ámbar: firmar, confirmar, verificar; va al banner mientras no esté leída) · *Notice* (ícono gris: un pago, una mención).`,``,`**Probalo:** en *Playground* cambiá estado, tipo, texto y hace cuánto llegó desde *Controls*; pasá el mouse por la fila para ver las acciones, cada una con su tooltip.`].join(`
`)}}},args:{title:`Document awaiting your signature`,detail:`Consent form for Mara Otero — sent 2 days ago.`,state:`unread`,type:`task`,archived:!1,minutesAgo:25,author:``,actions:`on hover`},argTypes:{title:{control:`text`,description:`Qué pasó, en una línea.`},detail:{control:`text`,description:`El detalle: a quién y cuándo.`},state:{control:`inline-radio`,options:[`unread`,`read`,`pending`],description:`Sin leer, leída o pendiente.`},type:{control:`inline-radio`,options:[`task`,`notice`],description:`Task: ícono ámbar y va al banner. Notice: ícono gris.`},archived:{control:`boolean`,description:`Archivada: la acción pasa a Move to inbox.`},minutesAgo:{control:{type:`number`,min:0},description:`Minutos desde que llegó: 25m ago, 3h ago, Yesterday, 4d ago…`},author:{control:`text`,description:`Quién la generó, si fue una persona.`},actions:{control:`inline-radio`,options:[`on hover`,`shown`],description:`Deja las acciones a la vista, como al pasar el mouse.`,table:{category:`Preview`}}}},N=()=>{},P=(e,t={})=>({...p.find(t=>t.id===e),archivada:!1,...t}),F=({children:e})=>(0,j.jsx)(`div`,{className:`bg-page-background p-4 sm:p-6`,children:e}),I=({children:e})=>(0,j.jsx)(`ul`,{className:`m-0 w-full max-w-[820px] list-none overflow-hidden rounded-lg border border-line bg-white p-0`,children:e}),L={render:e=>{let t=P(`n1`,{titulo:e.title,detalle:e.detail,estado:e.state,tarea:e.type===`task`,icon:P(e.type===`task`?`n1`:`n7`).icon,archivada:e.archived,hace:e.minutesAgo,autor:e.author||void 0});return(0,j.jsx)(F,{children:(0,j.jsx)(D,{inicial:t,forzar:e.actions===`shown`?`hover`:void 0},JSON.stringify(e))})}},R=[[`Dot`,`Azul si no se leyó, amarillo si está pendiente. Leída, no hay punto. Va centrado con el ícono.`],[`Icon`,`Qué tipo de aviso es. Ámbar si es una tarea (firmar, confirmar, verificar), gris si es un aviso.`],[`Title`,`Qué pasó, en una línea. En negrita mientras esté sin leer o pendiente; centrado con el ícono y el punto.`],[`Background`,`Apenas azul si está sin leer, amarillo tenue si está pendiente, blanco si está leída.`],[`Detail`,`A quién y cuándo. Más apagado cuando está leída.`],[`Time · author · action`,`Hace cuánto llegó, quién la generó y a dónde lleva (el mismo texto que el banner). Tocar la fila la abre y la marca leída.`],[`Row actions`,`Leída/no leída, pendiente y archivar, con tooltip. Aparecen al pasar el mouse o al llegar con Tab; en pantallas chicas quedan a la vista.`]],z={parameters:{controls:{disable:!0}},render:()=>(0,j.jsx)(F,{children:(0,j.jsxs)(b,{children:[(0,j.jsx)(D,{inicial:P(`n4`),forzar:`hover`}),(0,j.jsx)(w,{encabezado:[`Part`,`What it does`],minimo:560,arriba:!0,children:R.map(([e,t])=>(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:e}),(0,j.jsx)(`td`,{className:`text-ink-medium`,children:t})]},e))})]})})},B={parameters:{controls:{disable:!0}},render:()=>(0,j.jsx)(F,{children:(0,j.jsxs)(b,{children:[(0,j.jsx)(O,{titulo:`Unread`,nota:`Punto azul, fondo apenas azul y título en negrita. Cuenta en el número de la campana.`,children:(0,j.jsx)(D,{inicial:P(`n3`)})}),(0,j.jsx)(O,{titulo:`Read`,nota:`Sin punto y con el detalle más apagado. Abrir una sin leer la deja así.`,children:(0,j.jsx)(D,{inicial:P(`n9`)})}),(0,j.jsx)(O,{titulo:`Pending`,nota:`Quedó para hacer: como sin leer, pero en amarillo (punto y fondo), y el reloj activo. Abrirla no le saca el pendiente.`,children:(0,j.jsx)(D,{inicial:P(`n4`)})}),(0,j.jsx)(O,{titulo:`Archived`,nota:`Fuera del Inbox, en la pestaña Archived. La acción pasa a Move to inbox.`,children:(0,j.jsx)(D,{inicial:P(`n10`,{archivada:!0})})}),(0,j.jsx)(O,{titulo:`Hover`,nota:`Fondo gris, la acción subrayada y los tres íconos a la vista.`,children:(0,j.jsx)(D,{inicial:P(`n6`),forzar:`hover`})}),(0,j.jsx)(O,{titulo:`Keyboard focus`,nota:`Al llegar con Tab a un ícono aparecen las acciones y el ícono lleva el anillo azul.`,children:(0,j.jsx)(D,{inicial:P(`n6`),forzar:`focus-visible`})})]})})},V={parameters:{controls:{disable:!0}},render:()=>(0,j.jsx)(F,{children:(0,j.jsxs)(b,{children:[(0,j.jsx)(O,{titulo:`Task`,nota:`Algo para hacer: firmar, confirmar un turno, verificar un seguro. Ícono ámbar; va al banner de arriba mientras no esté leída ni archivada.`,children:(0,j.jsx)(D,{inicial:P(`n2`)})}),(0,j.jsx)(O,{titulo:`Notice`,nota:`Algo que pasó: un pago, un resultado, un plan aceptado. Ícono gris; no va al banner.`,children:(0,j.jsx)(D,{inicial:P(`n7`,{estado:`unread`})})}),(0,j.jsx)(O,{titulo:`Mention`,nota:`Un aviso con autor: “hace cuánto · quién · acción”.`,children:(0,j.jsx)(D,{inicial:P(`n5`)})})]})})},H=[[`Mark as read`,r,!1],[`Mark as unread`,_,!1],[`Mark as pending`,h,!1],[`Remove from pending`,h,!0],[`Archive`,d,!1],[`Move to inbox`,c,!1]],U={parameters:{controls:{disable:!0}},render:()=>(0,j.jsx)(F,{children:(0,j.jsx)(v,{children:H.map(([e,t,n])=>(0,j.jsx)(S,{rotulo:e,children:(0,j.jsx)(l,{label:e,icon:t,activo:n,onClick:N})},e))})})},W=[[`Row`,`li`],[`Dot`,`li > span:first-child`],[`Icon`,`li > span:nth-child(2)`],[`Title`,`li > button > span:first-child > span:first-child`],[`Detail`,`li > button > span:nth-child(2)`],[`Time · author · action`,`li > button > span:nth-child(3)`],[`Row action`,`li > span:last-child button`]],G={parameters:{controls:{disable:!0}},render:()=>(0,j.jsx)(F,{children:(0,j.jsx)(k,{})})},K=[`Playground`,`Parts`,`States`,`Types`,`RowActions`,`Specs`],L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
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
        <Estado titulo="Pending" nota="Quedó para hacer: como sin leer, pero en amarillo (punto y fondo), y el reloj activo. Abrirla no le saca el pendiente.">
          <FilaViva inicial={base('n4')} />
        </Estado>
        <Estado titulo="Archived" nota="Fuera del Inbox, en la pestaña Archived. La acción pasa a Move to inbox.">
          <FilaViva inicial={base('n10', {
          archivada: true
        })} />
        </Estado>
        <Estado titulo="Hover" nota="Fondo gris, la acción subrayada y los tres íconos a la vista.">
          <FilaViva inicial={base('n6')} forzar="hover" />
        </Estado>
        <Estado titulo="Keyboard focus" nota="Al llegar con Tab a un ícono aparecen las acciones y el ícono lleva el anillo azul.">
          <FilaViva inicial={base('n6')} forzar="focus-visible" />
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
        <Estado titulo="Task" nota="Algo para hacer: firmar, confirmar un turno, verificar un seguro. Ícono ámbar; va al banner de arriba mientras no esté leída ni archivada.">
          <FilaViva inicial={base('n2')} />
        </Estado>
        <Estado titulo="Notice" nota="Algo que pasó: un pago, un resultado, un plan aceptado. Ícono gris; no va al banner.">
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
      <Muestras>
        {ACCIONES.map(([label, icon, activo]) => <ConRotulo key={label} rotulo={label}><Accion label={label} icon={icon} activo={activo} onClick={nada} /></ConRotulo>)}
      </Muestras>
    </Fondo>
}`,...U.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Fondo><Medir /></Fondo>
}`,...G.parameters?.docs?.source}}}})))()}q();export{z as Parts,L as Playground,U as RowActions,G as Specs,B as States,V as Types,K as __namedExportsOrder,M as default};