import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,t as i}from"./calendar-check-9hsaj56T.js";import{r as a,t as o}from"./play-Dr1R_I1D.js";import{a as s,c,d as l,i as u,l as d,r as f,t as p,u as m}from"./kit-CWUgB5-0.js";import{i as h,n as g,r as _,t as v}from"./Confibot-3VJKIDjH.js";function y({alto:e=220,fab:t=!1,children:n}){return(0,S.jsxs)(`div`,{className:`bg-page-background relative w-full overflow-hidden rounded-lg border border-line [transform:translateZ(0)]`,style:{height:e},children:[t&&(0,S.jsx)(`span`,{"aria-hidden":!0,className:`bg-dash-blue fixed right-8 bottom-8 flex size-[60px] items-center justify-center rounded-full text-white shadow-lg`,children:(0,S.jsx)(i,{className:`size-6`})}),n]})}function b({vista:e,overPageFab:t}){let[n,r]=(0,x.useState)(e===`chat`),[i,a]=(0,x.useState)(e===`tucked`);return(0,S.jsxs)(y,{alto:640,fab:t,children:[!n&&(0,S.jsx)(g,{recogido:i,sobreFab:t,onAbrir:()=>r(!0),onRecoger:()=>a(!0),onTraer:()=>a(!1)}),(0,S.jsx)(v,{abierto:n,onClose:()=>r(!1),onShowOnScreen:w,historialInicial:[]})]})}var x,S,C,w,T,E,D,O,k,A,j,M;function N(){return(N=e((()=>{x=t(),r(),h(),l(),a(),S=n(),C=e=>[{de:`user`,texto:e},_(e)],w=()=>{},T={title:`Components/Help/Confibot`,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:640},description:{component:[`El asistente que explica la app. **Flota abajo a la derecha** en todas las pantallas del shell (no en Login ni en Clinical Mode): un botón redondo con el degradé azul que, con el mouse o el foco encima, se estira y dice *Confibot*. Abre una hoja de chat que contesta llevando a la pantalla donde vive lo que se pregunta. También se abre desde *Confibot* en el menú lateral.`,``,`**Convive con otros flotantes:** si la pantalla tiene su propio botón en esa esquina (Appointment requests en Scheduling), Confibot se apila 12px arriba en vez de taparlo. Se puede **recoger** con la flechita: queda una pestaña al pie que lo trae de vuelta, y se recuerda entre visitas.`,``,`**Tipografía de la hoja:** la de los drawers. Título 18px Bold y bajada 12px; mensajes y sugerencias 13px; rótulos 11px en mayúsculas.`,``,`**Probalo:** en *Playground* abrí el chat desde el botón, recogelo con la flechita y traelo con la pestaña; en *Controls* cambiá la vista de arranque y prendé *overPageFab* para verlo sobre el botón de Scheduling.`].join(`
`)}}},args:{vista:`button`,overPageFab:!1},argTypes:{vista:{control:`inline-radio`,options:[`button`,`tucked`,`chat`],description:`Cómo arranca: el botón, recogido en la pestaña o con el chat abierto.`},overPageFab:{control:`boolean`,description:`La pantalla tiene su propio botón flotante (Scheduling): Confibot se apila arriba.`}}},E={controls:{disable:!0}},D={render:e=>(0,S.jsx)(`div`,{className:`p-4`,children:(0,S.jsx)(b,{...e},`${e.vista}-${e.overPageFab}`)})},O={parameters:{...E,docs:{story:{inline:!1,iframeHeight:900}}},render:()=>(0,S.jsx)(`div`,{className:`p-4`,children:(0,S.jsxs)(u,{children:[(0,S.jsx)(p,{nota:`El botón en reposo, con la flechita para recogerlo arriba; recogido, la pestaña al pie.`,children:(0,S.jsxs)(`div`,{className:`grid gap-4 md:grid-cols-2`,children:[(0,S.jsx)(y,{children:(0,S.jsx)(g,{recogido:!1,onAbrir:w,onRecoger:w,onTraer:w})}),(0,S.jsx)(y,{children:(0,S.jsx)(g,{recogido:!0,onAbrir:w,onRecoger:w,onTraer:w})})]})}),(0,S.jsx)(d,{partes:[[`Floating button`,`Círculo de 48px con el degradé azul y el ícono Bot. Con el mouse o el foco se estira a "Confibot", se prende un halo con el mismo degradé que corre y un anillo blanco de 2px. Abre la hoja de chat.`,`ConfibotLanzador · onAbrir`],[`Tuck away`,`Flechita de 24px arriba del botón, con 40px de área de toque. Lo recoge: queda la pestaña al pie.`,`onRecoger`],[`Tucked tab`,`Pestaña de 32px pegada al borde de abajo. Trae el botón de vuelta (no abre el chat). Recogido o no se recuerda entre visitas.`,`recogido · onTraer · useConfibotRecogido`],[`Chat sheet`,`Saludo, sugerencias, la conversación y el campo para preguntar. Ocupa el lugar del botón mientras está abierta; en el celular sube desde abajo a todo el ancho.`,`Confibot`],[`Topic answer`,`Cada respuesta trae hasta tres temas de Help; tocar uno cierra el chat y lo explica sobre la pantalla real (CoachMark).`,`onShowOnScreen`],[`Menu item`,`Confibot en el menú lateral abre la misma hoja: es el camino que queda con el botón recogido.`,`Sidebar · useHelp().toggleConfibot`],[`Page FAB stacking`,`Una pantalla con su propio botón flotante lo avisa y Confibot se apila arriba; recogido, la pestaña se corre a la izquierda de ese botón.`,`sobreFab · useFabDePagina()`]]})]})})},k={parameters:{...E,docs:{story:{inline:!1,iframeHeight:2300}}},render:()=>(0,S.jsx)(`div`,{className:`p-4`,children:(0,S.jsxs)(u,{children:[(0,S.jsxs)(`div`,{className:`grid gap-6 md:grid-cols-2`,children:[(0,S.jsx)(s,{titulo:`Resting`,nota:`El círculo y la flechita para recogerlo.`,children:(0,S.jsx)(y,{children:(0,S.jsx)(g,{recogido:!1,onAbrir:w,onRecoger:w,onTraer:w})})}),(0,S.jsx)(s,{titulo:`Hover`,nota:`Se estira a Confibot, se prende el halo y el degradé corre. Con el foco del teclado se ve igual.`,children:(0,S.jsx)(f,{selector:`.group`,estado:`hover`,children:(0,S.jsx)(y,{children:(0,S.jsx)(g,{recogido:!1,onAbrir:w,onRecoger:w,onTraer:w})})})}),(0,S.jsx)(s,{titulo:`Tucked`,nota:`La pestaña pegada al borde de abajo; la trae de vuelta.`,children:(0,S.jsx)(y,{children:(0,S.jsx)(g,{recogido:!0,onAbrir:w,onRecoger:w,onTraer:w})})}),(0,S.jsx)(s,{titulo:`Over a page FAB (Scheduling)`,nota:`Centrado arriba del botón de Appointment requests, a 12px, en vez de taparlo.`,children:(0,S.jsx)(y,{alto:260,fab:!0,children:(0,S.jsx)(g,{recogido:!1,sobreFab:!0,onAbrir:w,onRecoger:w,onTraer:w})})}),(0,S.jsx)(s,{titulo:`Tucked over a page FAB`,nota:`La pestaña se corre a la izquierda del botón de la pantalla.`,children:(0,S.jsx)(y,{fab:!0,children:(0,S.jsx)(g,{recogido:!0,sobreFab:!0,onAbrir:w,onRecoger:w,onTraer:w})})}),(0,S.jsx)(s,{titulo:`Hidden`,nota:`Con la hoja de chat o un CoachMark abiertos no se dibuja: ocupan su esquina. Un drawer abierto lo tapa (z-50 contra z-40).`,children:(0,S.jsx)(y,{children:(0,S.jsx)(`span`,{className:`absolute inset-0 flex items-center justify-center text-[12px] text-ink-faint`,children:`(nothing drawn)`})})})]}),(0,S.jsxs)(`div`,{className:`grid gap-6 md:grid-cols-2`,children:[(0,S.jsx)(s,{titulo:`Open, empty`,nota:`Saludo y sugerencias. Send queda deshabilitado (disabled) mientras el campo está vacío.`,children:(0,S.jsx)(y,{alto:600,children:(0,S.jsx)(v,{abierto:!0,onClose:w,onShowOnScreen:w,historialInicial:[]})})}),(0,S.jsx)(s,{titulo:`Open, answered`,nota:`La pregunta y hasta tres temas que llevan a la pantalla.`,children:(0,S.jsx)(y,{alto:600,children:(0,S.jsx)(v,{abierto:!0,onClose:w,onShowOnScreen:w,historialInicial:C(`How do I add a patient?`)})})}),(0,S.jsx)(s,{titulo:`Open, no match`,nota:`Sin resultados: dice qué temas conoce.`,children:(0,S.jsx)(y,{alto:600,children:(0,S.jsx)(v,{abierto:!0,onClose:w,onShowOnScreen:w,historialInicial:C(`Wifi password?`)})})})]})]})})},A={parameters:{...E,docs:{story:{inline:!0}}},render:()=>(0,S.jsx)(`div`,{className:`p-4`,children:(0,S.jsxs)(u,{children:[(0,S.jsx)(p,{titulo:`Floating button`,nota:`De Confibot.tsx (ConfibotLanzador).`,children:(0,S.jsxs)(c,{encabezado:[`Part`,`Value`],minimo:520,children:[(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold`,children:`Button`}),(0,S.jsx)(`td`,{children:`48 × 48, round; Bot 20px; label 14px Semibold, padding-right 20px on hover/focus`})]}),(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold`,children:`Halo`}),(0,S.jsx)(`td`,{children:`5px around the button, same gradient, sheen 2.4s while hovered; 2px white ring`})]}),(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold`,children:`Tuck away`}),(0,S.jsx)(`td`,{children:`24px circle (40px touch area), line border, white, ink-muted; 4px above the button`})]}),(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold`,children:`Tucked tab`}),(0,S.jsx)(`td`,{children:`32px high, 12px top radius, 13px Semibold, chevron up 16px`})]}),(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold`,children:`Position`}),(0,S.jsx)(`td`,{className:`tabular-nums`,children:`right 16 · bottom 16 on phones; right 24 · bottom 24 from 640px`})]}),(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold`,children:`Over a page FAB`}),(0,S.jsx)(`td`,{className:`tabular-nums`,children:`centered over it, 12px gap: right 38 · bottom 104; tucked tab at right 108`})]}),(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold`,children:`Layer`}),(0,S.jsx)(`td`,{children:`z-40: drawers (z-50) cover it; hidden while the chat or a CoachMark is open`})]}),(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold`,children:`Page room`}),(0,S.jsx)(`td`,{className:`tabular-nums`,children:`AppShell’s main reserves 96px (phone) / 112px at the bottom, so Cancel/Save and pagination scroll above it`})]}),(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold`,children:`Reduced motion`}),(0,S.jsx)(`td`,{children:`no sheen; the label still stretches`})]})]})}),(0,S.jsx)(p,{titulo:`Colors`,nota:`El degradé va a 110° y el doble de ancho, para que corra.`,children:(0,S.jsxs)(c,{encabezado:[`Use`,`Token`],minimo:480,children:[(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{children:`Gradient start and end`}),(0,S.jsx)(`td`,{children:(0,S.jsx)(m,{nombre:`dash-blue`})})]}),(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{children:`Gradient light middle`}),(0,S.jsx)(`td`,{children:(0,S.jsx)(m,{nombre:`dash-blue-glow`})})]}),(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{children:`Gradient deep middle · keyboard focus ring`}),(0,S.jsx)(`td`,{children:(0,S.jsx)(m,{nombre:`dash-ring`})})]}),(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{children:`Tuck away border · icon`}),(0,S.jsxs)(`td`,{children:[(0,S.jsx)(m,{nombre:`line`}),` · `,(0,S.jsx)(m,{nombre:`ink-muted`})]})]})]})}),(0,S.jsx)(p,{titulo:`Chat sheet`,children:(0,S.jsxs)(c,{encabezado:[`Part`,`Value`],minimo:480,children:[(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold`,children:`Size`}),(0,S.jsx)(`td`,{children:`400px wide, min(560px, 82svh) high; full width from the bottom on phones`})]}),(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold`,children:`Shadow`}),(0,S.jsx)(`td`,{children:`shadow-floating, like every floating pop up`})]}),(0,S.jsxs)(`tr`,{children:[(0,S.jsx)(`td`,{className:`font-semibold`,children:`Answers`}),(0,S.jsx)(`td`,{children:`Keyword search over the Help topics, no AI; up to three topics per answer`})]})]})})]})})},j={tags:[`!autodocs`],args:{vista:`chat`},render:e=>(0,S.jsx)(`div`,{className:`p-4`,children:(0,S.jsx)(b,{...e})}),play:o(/ask me anything/i,`How do I add a patient?`)},M=[`Playground`,`Parts`,`States`,`Specs`,`WithDraft`],D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:'{\n  render: a => <div className="p-4"><Demo key={`${a.vista}-${a.overPageFab}`} {...a} /></div>\n}',...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  parameters: {
    ...sinControles,
    docs: {
      story: {
        inline: false,
        iframeHeight: 900
      }
    }
  },
  render: () => <div className="p-4">
      <Lienzo>
        <Bloque nota="El botón en reposo, con la flechita para recogerlo arriba; recogido, la pestaña al pie.">
          <div className="grid gap-4 md:grid-cols-2">
            <Escena><ConfibotLanzador recogido={false} onAbrir={nada} onRecoger={nada} onTraer={nada} /></Escena>
            <Escena><ConfibotLanzador recogido onAbrir={nada} onRecoger={nada} onTraer={nada} /></Escena>
          </div>
        </Bloque>
        <TablaPartes partes={[['Floating button', 'Círculo de 48px con el degradé azul y el ícono Bot. Con el mouse o el foco se estira a "Confibot", se prende un halo con el mismo degradé que corre y un anillo blanco de 2px. Abre la hoja de chat.', 'ConfibotLanzador · onAbrir'], ['Tuck away', 'Flechita de 24px arriba del botón, con 40px de área de toque. Lo recoge: queda la pestaña al pie.', 'onRecoger'], ['Tucked tab', 'Pestaña de 32px pegada al borde de abajo. Trae el botón de vuelta (no abre el chat). Recogido o no se recuerda entre visitas.', 'recogido · onTraer · useConfibotRecogido'], ['Chat sheet', 'Saludo, sugerencias, la conversación y el campo para preguntar. Ocupa el lugar del botón mientras está abierta; en el celular sube desde abajo a todo el ancho.', 'Confibot'], ['Topic answer', 'Cada respuesta trae hasta tres temas de Help; tocar uno cierra el chat y lo explica sobre la pantalla real (CoachMark).', 'onShowOnScreen'], ['Menu item', 'Confibot en el menú lateral abre la misma hoja: es el camino que queda con el botón recogido.', 'Sidebar · useHelp().toggleConfibot'], ['Page FAB stacking', 'Una pantalla con su propio botón flotante lo avisa y Confibot se apila arriba; recogido, la pestaña se corre a la izquierda de ese botón.', 'sobreFab · useFabDePagina()']]} />
      </Lienzo>
    </div>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: {
    ...sinControles,
    docs: {
      story: {
        inline: false,
        iframeHeight: 2300
      }
    }
  },
  render: () => <div className="p-4">
      <Lienzo>
        <div className="grid gap-6 md:grid-cols-2">
          <Muestra titulo="Resting" nota="El círculo y la flechita para recogerlo.">
            <Escena><ConfibotLanzador recogido={false} onAbrir={nada} onRecoger={nada} onTraer={nada} /></Escena>
          </Muestra>
          <Muestra titulo="Hover" nota="Se estira a Confibot, se prende el halo y el degradé corre. Con el foco del teclado se ve igual.">
            <Forzar selector=".group" estado="hover">
              <Escena><ConfibotLanzador recogido={false} onAbrir={nada} onRecoger={nada} onTraer={nada} /></Escena>
            </Forzar>
          </Muestra>
          <Muestra titulo="Tucked" nota="La pestaña pegada al borde de abajo; la trae de vuelta.">
            <Escena><ConfibotLanzador recogido onAbrir={nada} onRecoger={nada} onTraer={nada} /></Escena>
          </Muestra>
          <Muestra titulo="Over a page FAB (Scheduling)" nota="Centrado arriba del botón de Appointment requests, a 12px, en vez de taparlo.">
            <Escena alto={260} fab><ConfibotLanzador recogido={false} sobreFab onAbrir={nada} onRecoger={nada} onTraer={nada} /></Escena>
          </Muestra>
          <Muestra titulo="Tucked over a page FAB" nota="La pestaña se corre a la izquierda del botón de la pantalla.">
            <Escena fab><ConfibotLanzador recogido sobreFab onAbrir={nada} onRecoger={nada} onTraer={nada} /></Escena>
          </Muestra>
          <Muestra titulo="Hidden" nota="Con la hoja de chat o un CoachMark abiertos no se dibuja: ocupan su esquina. Un drawer abierto lo tapa (z-50 contra z-40).">
            <Escena><span className="absolute inset-0 flex items-center justify-center text-[12px] text-ink-faint">(nothing drawn)</span></Escena>
          </Muestra>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Muestra titulo="Open, empty" nota="Saludo y sugerencias. Send queda deshabilitado (disabled) mientras el campo está vacío.">
            <Escena alto={600}><Confibot abierto onClose={nada} onShowOnScreen={nada} historialInicial={[]} /></Escena>
          </Muestra>
          <Muestra titulo="Open, answered" nota="La pregunta y hasta tres temas que llevan a la pantalla.">
            <Escena alto={600}><Confibot abierto onClose={nada} onShowOnScreen={nada} historialInicial={conversacion('How do I add a patient?')} /></Escena>
          </Muestra>
          <Muestra titulo="Open, no match" nota="Sin resultados: dice qué temas conoce.">
            <Escena alto={600}><Confibot abierto onClose={nada} onShowOnScreen={nada} historialInicial={conversacion('Wifi password?')} /></Escena>
          </Muestra>
        </div>
      </Lienzo>
    </div>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  parameters: {
    ...sinControles,
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <div className="p-4">
      <Lienzo>
        <Bloque titulo="Floating button" nota="De Confibot.tsx (ConfibotLanzador).">
          <Tabla encabezado={['Part', 'Value']} minimo={520}>
            <tr><td className="font-semibold">Button</td><td>48 × 48, round; Bot 20px; label 14px Semibold, padding-right 20px on hover/focus</td></tr>
            <tr><td className="font-semibold">Halo</td><td>5px around the button, same gradient, sheen 2.4s while hovered; 2px white ring</td></tr>
            <tr><td className="font-semibold">Tuck away</td><td>24px circle (40px touch area), line border, white, ink-muted; 4px above the button</td></tr>
            <tr><td className="font-semibold">Tucked tab</td><td>32px high, 12px top radius, 13px Semibold, chevron up 16px</td></tr>
            <tr><td className="font-semibold">Position</td><td className="tabular-nums">right 16 · bottom 16 on phones; right 24 · bottom 24 from 640px</td></tr>
            <tr><td className="font-semibold">Over a page FAB</td><td className="tabular-nums">centered over it, 12px gap: right 38 · bottom 104; tucked tab at right 108</td></tr>
            <tr><td className="font-semibold">Layer</td><td>z-40: drawers (z-50) cover it; hidden while the chat or a CoachMark is open</td></tr>
            <tr><td className="font-semibold">Page room</td><td className="tabular-nums">AppShell’s main reserves 96px (phone) / 112px at the bottom, so Cancel/Save and pagination scroll above it</td></tr>
            <tr><td className="font-semibold">Reduced motion</td><td>no sheen; the label still stretches</td></tr>
          </Tabla>
        </Bloque>
        <Bloque titulo="Colors" nota="El degradé va a 110° y el doble de ancho, para que corra.">
          <Tabla encabezado={['Use', 'Token']} minimo={480}>
            <tr><td>Gradient start and end</td><td><Token nombre="dash-blue" /></td></tr>
            <tr><td>Gradient light middle</td><td><Token nombre="dash-blue-glow" /></td></tr>
            <tr><td>Gradient deep middle · keyboard focus ring</td><td><Token nombre="dash-ring" /></td></tr>
            <tr><td>Tuck away border · icon</td><td><Token nombre="line" /> · <Token nombre="ink-muted" /></td></tr>
          </Tabla>
        </Bloque>
        <Bloque titulo="Chat sheet">
          <Tabla encabezado={['Part', 'Value']} minimo={480}>
            <tr><td className="font-semibold">Size</td><td>400px wide, min(560px, 82svh) high; full width from the bottom on phones</td></tr>
            <tr><td className="font-semibold">Shadow</td><td>shadow-floating, like every floating pop up</td></tr>
            <tr><td className="font-semibold">Answers</td><td>Keyword search over the Help topics, no AI; up to three topics per answer</td></tr>
          </Tabla>
        </Bloque>
      </Lienzo>
    </div>
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  tags: ['!autodocs'],
  args: {
    vista: 'chat'
  },
  render: a => <div className="p-4"><Demo {...a} /></div>,
  play: escribir(/ask me anything/i, 'How do I add a patient?')
}`,...j.parameters?.docs?.source}}}})))()}N();export{O as Parts,D as Playground,A as Specs,k as States,j as WithDraft,M as __namedExportsOrder,T as default};