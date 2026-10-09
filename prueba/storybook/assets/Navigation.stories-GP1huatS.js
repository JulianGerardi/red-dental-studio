import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{l as n,r}from"./chunk-62JRHF6Z-QSPpyyt6.js";import{t as i}from"./jsx-runtime-DeHZSEgm.js";import{n as a,t as o}from"./pantalla-CO_7H21I.js";import{ct as s,dt as c,ft as l,lt as u,pt as d,ut as f}from"./iframe-D9Dq2Fpg.js";import{c as p,d as m,f as h,r as g,t as _,u as v}from"./kit-4bQS7S9u.js";function y(e){switch(e){case`item tooltip`:return{tooltip:`Scheduling`};case`billing menu`:return{billingMenu:!0};case`settings menu`:return{settingsMenu:!0};default:return{}}}function b({ruta:e=`/`,expanded:t=!0,preview:n={},alto:i=640}){return(0,w.jsx)(r,{initialEntries:[e],children:(0,w.jsx)(l,{children:(0,w.jsx)(f.Provider,{value:n,children:(0,w.jsx)(`div`,{className:`flex [&_aside]:z-0 [&_aside]:h-(--alto)`,style:{"--alto":`${i}px`},children:(0,w.jsx)(s,{expanded:t})})})})})}function x({titulo:e,nota:t,ancho:n,children:r}){return(0,w.jsxs)(`figure`,{className:`m-0 flex flex-col gap-2`,style:{width:n},children:[(0,w.jsxs)(`figcaption`,{className:`flex flex-col gap-0.5`,children:[(0,w.jsx)(`span`,{className:`text-[12.5px] font-semibold text-ink`,children:e}),(0,w.jsx)(`span`,{className:`text-[11.5px] leading-snug text-ink-muted`,children:t})]}),r]})}function S(){let e=(0,C.useRef)(null),t=(0,C.useRef)(null),[n,r]=(0,C.useState)([]);return(0,C.useLayoutEffect)(()=>{r(M.map(([,n,r])=>{let i=(n===`exp`?e:t).current?.querySelector(r);return i?h(i):null}))},[]),(0,w.jsxs)(`div`,{className:`flex flex-col gap-6 lg:flex-row lg:items-start`,children:[(0,w.jsxs)(`div`,{className:`flex shrink-0 items-start gap-4`,children:[(0,w.jsx)(`div`,{ref:e,children:(0,w.jsx)(b,{ruta:`/scheduling`})}),(0,w.jsx)(`div`,{ref:t,children:(0,w.jsx)(b,{ruta:`/scheduling`,expanded:!1})})]}),(0,w.jsxs)(`div`,{className:`flex min-w-0 flex-1 flex-col gap-8`,children:[(0,w.jsxs)(_,{titulo:`Sizes`,nota:`Medidas leídas de los dos rails de al lado, en computadora. En el celular el panel mide 234px: tapa el contenido en vez de correrlo.`,children:[(0,w.jsx)(p,{encabezado:[`Part`,`Width`,`Height`,`Padding`,`Text`,`Radius`,`Icon`],minimo:600,children:M.map(([e,,,t],r)=>{let i=n[r],a=i&&!t?i:null;return(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:e}),(0,w.jsx)(`td`,{className:`tabular-nums`,children:i?.ancho??`—`}),(0,w.jsx)(`td`,{className:`tabular-nums`,children:i?.alto??`—`}),(0,w.jsx)(`td`,{className:`tabular-nums`,children:i?.padding??`—`}),(0,w.jsx)(`td`,{className:`tabular-nums`,children:a?`${a.texto} · ${a.peso}`:`—`}),(0,w.jsx)(`td`,{className:`tabular-nums`,children:a?.radio??`—`}),(0,w.jsx)(`td`,{className:`tabular-nums`,children:a?.icono??`—`})]},e)})}),(0,w.jsx)(`p`,{className:`m-0 max-w-[72ch] text-[12.5px] text-ink-muted`,children:`Expandido, los ítems van a 12px de cada borde y a 4px uno de otro. Colapsado, cada ítem cae cada 50px (32 del ítem y 18 de espacio).`})]}),(0,w.jsx)(N,{})]})]})}var C,w,T,E,D,O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{C=t(),n(),c(),u(),d(),m(),a(),w=i(),T={Dashboard:`/`,Patients:`/patients`,Scheduling:`/scheduling`,Billing:`/billing`,Help:`/help`,"Settings / Accounts":`/settings/accounts`},E={title:`Elements/Navigation`,parameters:{layout:`fullscreen`,router:!1,docs:{decisionsFrom:`components/layout/Sidebar.tsx`,description:{component:["**Menú lateral (rail)** (`Sidebar`, dentro de `AppShell`). Colapsado mide 58px y muestra sólo íconos; expandido mide 176px con los nombres. Se abre y se cierra con el botón de la barra de arriba, a la izquierda del saludo.",``,`- **Colapsado:** al pasar el mouse por un ícono aparece su nombre en un tooltip a la derecha.`,`- **Expandido:** no hay tooltips, el nombre ya se ve.`,`- **Ítem activo:** azul con texto blanco, según la pantalla en la que estás.`,`- **Settings:** queda abajo, en el mismo lugar colapsado y expandido. Al pasar el mouse abre un menú flotante con sus secciones.`,`- **Billing:** al pasar el mouse (o con su flecha) abre al costado un menú con Billing, Fee Schedules, Carriers y Coverage Tables. Queda activo en Billing y en esas tres tablas.`,`- **En el celular:** el menú es un panel de 234px que tapa el contenido y se cierra solo al elegir una pantalla (ver *On each device*).`,``,`El menú del paciente está en *Elements / Patient menu*.`,``,`**Probalo:** en *Playground* elegí la pantalla y usá el botón de la barra de arriba; pasá el mouse por los íconos, por Billing y por Settings. Con *open* dejás abierto un tooltip o un menú.`].join(`
`)}}},args:{screen:`Dashboard`,expanded:!1,open:`nothing`},argTypes:{screen:{control:`select`,options:Object.keys(T),description:`Pantalla abierta: define el ítem activo.`},expanded:{control:`boolean`,description:`Cómo arranca el menú: 176px con nombres o 58px con íconos. En la app se cambia con el botón de la barra de arriba.`},open:{control:`select`,options:[`nothing`,`item tooltip`,`billing menu`,`settings menu`],description:`Deja abierto lo que en la app se abre con el mouse. El tooltip sólo existe colapsado: al elegirlo, el menú se colapsa.`,table:{category:`Preview`}}}},D={parameters:{docs:{story:{inline:!1,iframeHeight:720}}},render:({screen:e,expanded:t,open:n})=>{let r=n!==`item tooltip`&&t;return(0,w.jsx)(f.Provider,{value:{...y(n),expanded:r},children:(0,w.jsx)(o,{ruta:T[e]},`${e}-${r}`)})}},O=({children:e})=>(0,w.jsx)(`div`,{className:`bg-page-background p-4 sm:p-6`,children:e}),k=[[`Logo`,`Bloque azul oscuro con el nombre. Mide lo mismo que la barra de arriba (64px) para que las dos queden alineadas.`,`Sólo el ícono.`],[`Items`,`Dashboard, Patients, Scheduling, Message, Contacts, Documents, Reports y Help: cada uno abre su pantalla. El de la pantalla actual va en azul.`,`Sólo íconos de 32×32, con el nombre en un tooltip.`],[`Billing`,`Abre Billing. Al pasar el mouse (o con su flecha) muestra al costado Billing, Fee Schedules, Carriers y Coverage Tables.`,`El ícono; el menú sale igual al pasar el mouse.`],[`Confibot`,`No es una pantalla: abre y cierra la hoja de chat de ayuda. Queda en azul mientras está abierta.`,`Ícono con tooltip.`],[`Settings`,`Al pie, en el mismo lugar abierto o cerrado. Al pasar el mouse muestra sus secciones; Billing despliega sus tablas con su flecha.`,`El ícono, sin tooltip: el menú ya sale ahí mismo.`],[`Toggle`,`Está en la barra de arriba, a la izquierda del saludo: expande a 176px o colapsa a 58px.`,`Cambia el ícono.`]],A={parameters:{controls:{disable:!0}},render:()=>(0,w.jsx)(O,{children:(0,w.jsxs)(`div`,{className:`flex flex-col gap-6 lg:flex-row lg:items-start`,children:[(0,w.jsx)(b,{ruta:`/scheduling`}),(0,w.jsx)(`div`,{className:`min-w-0 flex-1`,children:(0,w.jsx)(p,{encabezado:[`Part`,`What it does`,`When collapsed`],minimo:560,arriba:!0,children:k.map(([e,t,n])=>(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:e}),(0,w.jsx)(`td`,{className:`text-ink-medium`,children:t}),(0,w.jsx)(`td`,{className:`text-ink-medium`,children:n})]},e))})})]})})},j={parameters:{controls:{disable:!0}},render:()=>(0,w.jsx)(O,{children:(0,w.jsxs)(`div`,{className:`flex flex-col gap-10`,children:[(0,w.jsx)(_,{titulo:`Expanded · 176px`,children:(0,w.jsxs)(`div`,{className:`flex flex-wrap items-start gap-x-6 gap-y-8`,children:[(0,w.jsx)(x,{titulo:`Default`,nota:`La pantalla actual en azul.`,ancho:176,children:(0,w.jsx)(b,{})}),(0,w.jsx)(x,{titulo:`Hover on an item`,nota:`Fondo gris: se puede elegir.`,ancho:176,children:(0,w.jsx)(g,{selector:`a[href="/patients"]`,estado:`hover`,children:(0,w.jsx)(b,{})})}),(0,w.jsx)(x,{titulo:`Billing menu`,nota:`Al pasar el mouse por Billing, o con su flecha.`,ancho:430,children:(0,w.jsx)(b,{ruta:`/billing`,preview:{billingMenu:!0}})}),(0,w.jsx)(x,{titulo:`Settings menu`,nota:`Sale hacia arriba: Settings vive al pie.`,ancho:430,children:(0,w.jsx)(b,{ruta:`/settings/accounts`,preview:{settingsMenu:!0}})})]})}),(0,w.jsx)(_,{titulo:`Collapsed · 58px`,children:(0,w.jsxs)(`div`,{className:`flex flex-wrap items-start gap-x-6 gap-y-8`,children:[(0,w.jsx)(x,{titulo:`Collapsed`,nota:`Sólo íconos; la pantalla actual en azul.`,ancho:120,children:(0,w.jsx)(b,{expanded:!1})}),(0,w.jsx)(x,{titulo:`Tooltip on an item`,nota:`El nombre aparece a la derecha al pasar el mouse.`,ancho:200,children:(0,w.jsx)(b,{expanded:!1,preview:{tooltip:`Scheduling`}})}),(0,w.jsx)(x,{titulo:`Settings menu`,nota:`El mismo menú, desde el ícono.`,ancho:320,children:(0,w.jsx)(b,{expanded:!1,ruta:`/settings/accounts`,preview:{settingsMenu:!0}})})]})})]})})},M=[[`Rail · expanded`,`exp`,`aside`,`caja`],[`Rail · collapsed`,`col`,`aside`,`caja`],[`Logo`,`exp`,`aside > div`,`caja`],[`Item · expanded`,`exp`,`nav > a`],[`Item · collapsed`,`col`,`nav > a`],[`Settings · expanded`,`exp`,`[data-tour=settings-menu]`]],N=()=>(0,w.jsx)(_,{titulo:`Colors`,children:(0,w.jsxs)(p,{encabezado:[`Part`,`Token`],minimo:480,children:[(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Rail`}),(0,w.jsx)(`td`,{children:(0,w.jsx)(v,{nombre:`surface-subtle`})})]}),(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Logo`}),(0,w.jsxs)(`td`,{children:[(0,w.jsx)(v,{nombre:`dash-blue-hover`}),` · text `,(0,w.jsx)(v,{nombre:`white`})]})]}),(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Item`}),(0,w.jsxs)(`td`,{children:[`text `,(0,w.jsx)(v,{nombre:`dash-muted`}),` · hover black 5%`]})]}),(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Active item`}),(0,w.jsxs)(`td`,{children:[(0,w.jsx)(v,{nombre:`dash-blue`}),` · text `,(0,w.jsx)(v,{nombre:`white`})]})]}),(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Tooltip`}),(0,w.jsxs)(`td`,{children:[(0,w.jsx)(v,{nombre:`ink`}),` · text `,(0,w.jsx)(v,{nombre:`white`})]})]}),(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Floating menu`}),(0,w.jsxs)(`td`,{children:[(0,w.jsx)(v,{nombre:`white`}),` · border `,(0,w.jsx)(v,{nombre:`line`}),` · hover `,(0,w.jsx)(v,{nombre:`surface-muted`})]})]}),(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{className:`font-semibold`,children:`Floating menu · current`}),(0,w.jsxs)(`td`,{children:[(0,w.jsx)(v,{nombre:`dash-count-bg`}),` · text `,(0,w.jsx)(v,{nombre:`dash-blue-hover`})]})]})]})}),P={parameters:{controls:{disable:!0}},render:()=>(0,w.jsx)(O,{children:(0,w.jsx)(S,{})})},F=[`Playground`,`Parts`,`States`,`Specs`],D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 720
      }
    }
  },
  render: ({
    screen,
    expanded,
    open
  }) => {
    const expandido = open === 'item tooltip' ? false : expanded;
    return <NavigationPreview.Provider value={{
      ...previewDe(open),
      expanded: expandido
    }}>
        <PantallaReal key={\`\${screen}-\${expandido}\`} ruta={RUTAS[screen]} />
      </NavigationPreview.Provider>;
  }
}`,...D.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Fondo>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <Rail ruta="/scheduling" />
        <div className="min-w-0 flex-1">
          <Tabla encabezado={['Part', 'What it does', 'When collapsed']} minimo={560} arriba>
            {PARTES.map(([parte, que, colapsado]) => <tr key={parte}>
                <td className="font-semibold whitespace-nowrap">{parte}</td>
                <td className="text-ink-medium">{que}</td>
                <td className="text-ink-medium">{colapsado}</td>
              </tr>)}
          </Tabla>
        </div>
      </div>
    </Fondo>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Fondo>
      <div className="flex flex-col gap-10">
        <Bloque titulo="Expanded · 176px">
          <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
            <Estado titulo="Default" nota="La pantalla actual en azul." ancho={176}>
              <Rail />
            </Estado>
            <Estado titulo="Hover on an item" nota="Fondo gris: se puede elegir." ancho={176}>
              <Forzar selector='a[href="/patients"]' estado="hover"><Rail /></Forzar>
            </Estado>
            <Estado titulo="Billing menu" nota="Al pasar el mouse por Billing, o con su flecha." ancho={430}>
              <Rail ruta="/billing" preview={{
              billingMenu: true
            }} />
            </Estado>
            <Estado titulo="Settings menu" nota="Sale hacia arriba: Settings vive al pie." ancho={430}>
              <Rail ruta="/settings/accounts" preview={{
              settingsMenu: true
            }} />
            </Estado>
          </div>
        </Bloque>
        <Bloque titulo="Collapsed · 58px">
          <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
            <Estado titulo="Collapsed" nota="Sólo íconos; la pantalla actual en azul." ancho={120}>
              <Rail expanded={false} />
            </Estado>
            <Estado titulo="Tooltip on an item" nota="El nombre aparece a la derecha al pasar el mouse." ancho={200}>
              <Rail expanded={false} preview={{
              tooltip: 'Scheduling'
            }} />
            </Estado>
            <Estado titulo="Settings menu" nota="El mismo menú, desde el ícono." ancho={320}>
              <Rail expanded={false} ruta="/settings/accounts" preview={{
              settingsMenu: true
            }} />
            </Estado>
          </div>
        </Bloque>
      </div>
    </Fondo>
}`,...j.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Fondo>
      <Medidas />
    </Fondo>
}`,...P.parameters?.docs?.source}}}})))()}I();export{A as Parts,D as Playground,P as Specs,j as States,F as __namedExportsOrder,E as default};