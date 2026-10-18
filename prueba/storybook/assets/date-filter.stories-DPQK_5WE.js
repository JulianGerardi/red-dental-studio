import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{nn as r,rn as i}from"./iframe-DHsBabhA.js";import{i as a,n as o,o as s,r as c}from"./play-Dr1R_I1D.js";import{a as l,c as u,d,f,i as p,l as m,n as h,o as g,p as _,r as v,t as y,u as b}from"./kit-CWUgB5-0.js";import{a as x,n as S,r as C,t as w}from"./date-filter-BPRZAcw_.js";function T({value:e,markedDays:t,disabled:n}){let[r,i]=(0,A.useState)(I[e]);return(0,j.jsx)(`div`,{className:`flex h-[420px] items-start justify-end sm:w-[560px]`,children:(0,j.jsx)(S,{value:r,onChange:i,marked:t?L:[],disabled:n})})}function E({inicial:e=null,ancla:t}){let[n,r]=(0,A.useState)(e);return(0,j.jsx)(z,{children:(0,j.jsx)(C,{value:n,onChange:r,marked:L,defaultAnchor:t})})}function D(){let[e,t]=(0,A.useState)(`Inbox`),[n,i]=(0,A.useState)(I.preset);return(0,j.jsxs)(`div`,{className:`flex w-full max-w-[820px] flex-wrap items-center justify-between gap-3 rounded-lg bg-page-background p-4`,children:[(0,j.jsx)(r,{"aria-label":`Filter notifications`,tabs:[{value:`Inbox`,count:9},{value:`Unread`,count:3}],value:e,onChange:t}),(0,j.jsx)(S,{value:n,onChange:i,marked:L,label:`Filter notifications by date`})]})}function O({nombre:e,children:t}){let{ref:n,m:r}=_(`button`);return(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:e}),(0,j.jsx)(`td`,{children:(0,j.jsx)(`div`,{ref:n,className:`inline-flex`,children:t})}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?.alto}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?.padding}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?.texto}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?.radio})]})}function k(){let e=(0,A.useRef)(null),[t,n]=(0,A.useState)([]);return(0,A.useLayoutEffect)(()=>{n(G.map(([,t])=>{let n=e.current?.querySelector(t);return n?f(n):null}))},[]),(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(`div`,{ref:e,children:(0,j.jsx)(E,{inicial:F})}),(0,j.jsx)(u,{encabezado:[`Part`,`Width`,`Height`,`Padding`,`Text`,`Radius`],minimo:620,children:G.map(([e],n)=>{let r=t[n];return(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:e}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?.ancho??`—`}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?.alto??`—`}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?.padding??`—`}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?`${r.texto} · ${r.peso}`:`—`}),(0,j.jsx)(`td`,{className:`tabular-nums`,children:r?.radio??`—`})]},e)})})]})}var A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q;function J(){return(J=e((()=>{A=t(),x(),i(),d(),c(),j=n(),M={title:`Elements/Date filter`,parameters:{layout:`padded`,docs:{description:{component:["El filtro de fecha de una lista (`@/components/ui/date-filter`): un solo campo que filtra **un día o un rango**. Hoy lo usa *Notifications*, para cuando hay muchas.",``,`**Cómo se usa:** un clic en un día filtra ese día; un segundo clic cierra el rango (en cualquier orden). Mientras se elige el segundo, el rango se ve hasta el día bajo el mouse. A la izquierda, atajos: *All dates* (sin filtro), *Today*, *Yesterday*, *Last 7 days*, *Last 30 days* y *Last 90 days*. Se aplica al tocar, sin botón Apply, como *Filter*.`,``,`**El campo:** *All dates* mientras no filtra; con fechas, azul como *Filter* con algo aplicado, dice el atajo ("Last 7 days") o las fechas ("Oct 3", "Sep 10 – Sep 20") y lleva una ✕ para sacarlas.`,``,"**El calendario:** el mismo del *DatePicker* (`MonthCalendar`), y el campo, su look *toolbar*: punto en los días que tienen algo, hoy en azul y negrita; los días que vienen, deshabilitados (no hay nada que filtrar ahí).",``,`**Probalo:** en *Playground* abrí el campo, tocá un atajo o dos días; desde *Controls* arrancá con un atajo, un día o un rango, sacá los puntos o deshabilitalo.`].join(`
`)}}},args:{value:`all dates`,markedDays:!0,disabled:!1},argTypes:{value:{control:`inline-radio`,options:[`all dates`,`preset`,`one day`,`range`],description:`Con qué arranca: sin filtro, un atajo (Last 7 days), un día o un rango.`},markedDays:{control:`boolean`,description:`Punto en los días que tienen algo.`},disabled:{control:`boolean`,description:`Deshabilitado: la lista está cargando.`}}},N=e=>{let t=new Date;return new Date(t.getFullYear(),t.getMonth(),t.getDate()-e)},P={from:N(3),to:N(3)},F={from:N(20),to:N(14)},I={"all dates":null,preset:w[2].range(),"one day":P,range:F},L=[0,1,2,4,5,8,9,11,13,15,16,18,20,23,25,26,28,31,33,38].map(N),R={render:e=>(0,j.jsx)(T,{...e},JSON.stringify(e))},z=({children:e})=>(0,j.jsx)(`div`,{className:`w-fit max-w-full rounded-lg bg-popover p-3 shadow-md ring-1 ring-foreground/10`,children:e}),B=({inicial:e=null,disabled:t})=>{let[n,r]=(0,A.useState)(e);return(0,j.jsx)(S,{value:n,onChange:r,disabled:t})},V=[[`Field`,`Dice qué fechas se ven: All dates, el atajo o las fechas. Abre el panel.`,`DateFilter`],[`Clear (✕)`,`Sólo con fechas elegidas: vuelve a All dates sin abrir el panel.`,`DateFilter`],[`Quick ranges`,`All dates y los cinco atajos. El elegido, en azul. Tocarlo aplica y cierra.`,`DateFilterPanel`],[`Month`,`Mes a la vista y flechas. No hay flecha hacia meses que vienen.`,`MonthCalendar · NavBtn`],[`Day`,`Un clic filtra ese día; el segundo cierra el rango. Extremos en azul, el medio celeste, punto si tiene algo, hoy en azul y negrita.`,`MonthCalendar`],[`Hint`,`Qué hacer ahora: "Pick a day, or two days for a range." o "Now pick the end date."`,`DateFilterPanel`]],H={parameters:{controls:{disable:!0}},render:()=>(0,j.jsxs)(p,{children:[(0,j.jsx)(y,{titulo:`Field`,nota:`Sin filtro, blanco. Con fechas, azul con la ✕.`,children:(0,j.jsxs)(g,{children:[(0,j.jsx)(h,{rotulo:`All dates`,children:(0,j.jsx)(B,{})}),(0,j.jsx)(h,{rotulo:`Preset`,children:(0,j.jsx)(B,{inicial:I.preset})}),(0,j.jsx)(h,{rotulo:`Range`,children:(0,j.jsx)(B,{inicial:F})})]})}),(0,j.jsx)(y,{titulo:`Panel`,nota:`Atajos a la izquierda (arriba, en una tira, en el celular) y el calendario.`,children:(0,j.jsx)(E,{inicial:F})}),(0,j.jsx)(m,{partes:V})]})},U={parameters:{controls:{disable:!0}},render:()=>(0,j.jsxs)(p,{children:[(0,j.jsx)(y,{titulo:`Field`,children:(0,j.jsxs)(u,{encabezado:[`State`,`Sample`,`What it means`],minimo:720,children:[(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`All dates`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(B,{})}),(0,j.jsx)(`td`,{className:`text-ink-medium`,children:`Sin filtro: se ve todo.`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Hover`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(v,{selector:`button`,estado:`hover`,children:(0,j.jsx)(B,{})})}),(0,j.jsx)(`td`,{className:`text-ink-medium`,children:`Fondo gris, como Filter.`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Keyboard focus`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(v,{selector:`button`,estado:`focus-visible`,children:(0,j.jsx)(B,{})})}),(0,j.jsx)(`td`,{className:`text-ink-medium`,children:`Anillo azul; Enter o Espacio lo abre.`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Preset`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(B,{inicial:I.preset})}),(0,j.jsx)(`td`,{className:`text-ink-medium`,children:`Un atajo: dice su nombre.`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`One day`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(B,{inicial:P})}),(0,j.jsx)(`td`,{className:`text-ink-medium`,children:`Un clic en un día y cerrar: ese día.`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Range`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(B,{inicial:F})}),(0,j.jsx)(`td`,{className:`text-ink-medium`,children:`Dos clics: del primero al segundo, los dos incluidos.`})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Disabled`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(B,{disabled:!0})}),(0,j.jsx)(`td`,{className:`text-ink-medium`,children:`La lista está cargando.`})]})]})}),(0,j.jsx)(y,{titulo:`Panel`,children:(0,j.jsxs)(`div`,{className:`flex flex-wrap gap-6`,children:[(0,j.jsx)(l,{titulo:`Nothing chosen`,nota:`All dates en azul; hoy en azul y negrita; los días que vienen, apagados.`,children:(0,j.jsx)(E,{})}),(0,j.jsx)(l,{titulo:`Picking the end date`,nota:`Ya se tocó un día: queda en azul y el rango sigue al mouse hasta el segundo clic.`,children:(0,j.jsx)(E,{inicial:{from:N(10),to:N(10)},ancla:N(10)})}),(0,j.jsx)(l,{titulo:`Preset`,nota:`El atajo elegido en azul y su rango en el calendario.`,children:(0,j.jsx)(E,{inicial:I.preset})})]})})]})},W={args:{value:`range`},render:e=>(0,j.jsx)(T,{...e}),play:s(a(/^Filter by date:/),o(/Pick a day, or two days for a range/))},G=[[`Quick range`,`[role=group] button`],[`Month arrow`,`button[aria-label="Previous month"]`],[`Weekday`,`.grid > span`],[`Day`,`.grid > button`],[`Hint`,`p`]],K={parameters:{controls:{disable:!0}},render:()=>(0,j.jsxs)(p,{children:[(0,j.jsx)(y,{titulo:`In Notifications`,nota:`En la fila de las pestañas, a la derecha: las dos cambian qué se ve. Las fechas acotan los números de las pestañas, la lista y Mark all as read.`,children:(0,j.jsx)(D,{})}),(0,j.jsx)(y,{titulo:`Field`,nota:`Medidas leídas del campo dibujado.`,children:(0,j.jsxs)(u,{encabezado:[`Part`,`Sample`,`Height`,`Padding`,`Text`,`Radius`],minimo:720,children:[(0,j.jsx)(O,{nombre:`Field`,children:(0,j.jsx)(B,{})}),(0,j.jsx)(O,{nombre:`Field · with dates`,children:(0,j.jsx)(B,{inicial:F})})]})}),(0,j.jsx)(y,{titulo:`Panel`,nota:`Medidas leídas del panel de arriba. Días de 36px, como el DatePicker; 12px de aire al borde de la pantalla.`,children:(0,j.jsx)(k,{})}),(0,j.jsx)(y,{titulo:`Colors`,nota:`Tokens de date-filter.tsx; su valor está en src/index.css.`,children:(0,j.jsxs)(u,{encabezado:[`Part`,`Token`],minimo:480,children:[(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Field`}),(0,j.jsxs)(`td`,{children:[(0,j.jsx)(b,{nombre:`line`}),` border · `,(0,j.jsx)(b,{nombre:`ink`}),` text · hover `,(0,j.jsx)(b,{nombre:`surface-subtle`})]})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Field with dates`}),(0,j.jsxs)(`td`,{children:[(0,j.jsx)(b,{nombre:`dash-blue`}),` border and text · `,(0,j.jsx)(b,{nombre:`info-bg`}),` fill`]})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Chosen quick range`}),(0,j.jsxs)(`td`,{children:[(0,j.jsx)(b,{nombre:`info-bg`}),` · text `,(0,j.jsx)(b,{nombre:`dash-blue`})]})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Range ends`}),(0,j.jsxs)(`td`,{children:[(0,j.jsx)(b,{nombre:`primary`}),` · text `,(0,j.jsx)(b,{nombre:`primary-foreground`})]})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Range middle`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(b,{nombre:`accent`})})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Today · dot`}),(0,j.jsxs)(`td`,{children:[(0,j.jsx)(b,{nombre:`dash-blue`}),` · dot `,(0,j.jsx)(b,{nombre:`primary`})]})]}),(0,j.jsxs)(`tr`,{children:[(0,j.jsx)(`td`,{className:`font-semibold`,children:`Hint`}),(0,j.jsx)(`td`,{children:(0,j.jsx)(b,{nombre:`ink-muted`})})]})]})}),(0,j.jsx)(y,{titulo:`Rules`,children:(0,j.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,j.jsx)(`li`,{children:`One field for a day or a range: one click picks a day, a second click closes the range.`}),(0,j.jsx)(`li`,{children:`Applies on click, like Filter: no Apply button. Quick ranges close the panel.`}),(0,j.jsx)(`li`,{children:`With dates the field turns blue and has a ✕; All dates means no filter.`}),(0,j.jsx)(`li`,{children:`Days with content get a dot; upcoming days are disabled.`}),(0,j.jsx)(`li`,{children:`Field 32px: the DatePicker toolbar look, like the Dashboard date. Same calendar (MonthCalendar). The panel keeps 12px from the screen edge.`}),(0,j.jsx)(`li`,{children:`When nothing falls in the dates, the list says so and offers Clear dates.`})]})})]})},q=[`Playground`,`Parts`,`States`,`Open`,`Specs`],R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: args => <Demo key={JSON.stringify(args)} {...args} />
}`,...R.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Field" nota="Sin filtro, blanco. Con fechas, azul con la ✕.">
        <Muestras>
          <ConRotulo rotulo="All dates"><Campo /></ConRotulo>
          <ConRotulo rotulo="Preset"><Campo inicial={ARRANQUE.preset} /></ConRotulo>
          <ConRotulo rotulo="Range"><Campo inicial={RANGO} /></ConRotulo>
        </Muestras>
      </Bloque>
      <Bloque titulo="Panel" nota="Atajos a la izquierda (arriba, en una tira, en el celular) y el calendario.">
        <Panel inicial={RANGO} />
      </Bloque>
      <TablaPartes partes={PARTES} />
    </Lienzo>
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Field">
        <Tabla encabezado={['State', 'Sample', 'What it means']} minimo={720}>
          <tr><td className="font-semibold">All dates</td><td><Campo /></td><td className="text-ink-medium">Sin filtro: se ve todo.</td></tr>
          <tr><td className="font-semibold">Hover</td><td><Forzar selector="button" estado="hover"><Campo /></Forzar></td><td className="text-ink-medium">Fondo gris, como Filter.</td></tr>
          <tr><td className="font-semibold">Keyboard focus</td><td><Forzar selector="button" estado="focus-visible"><Campo /></Forzar></td><td className="text-ink-medium">Anillo azul; Enter o Espacio lo abre.</td></tr>
          <tr><td className="font-semibold">Preset</td><td><Campo inicial={ARRANQUE.preset} /></td><td className="text-ink-medium">Un atajo: dice su nombre.</td></tr>
          <tr><td className="font-semibold">One day</td><td><Campo inicial={UN_DIA} /></td><td className="text-ink-medium">Un clic en un día y cerrar: ese día.</td></tr>
          <tr><td className="font-semibold">Range</td><td><Campo inicial={RANGO} /></td><td className="text-ink-medium">Dos clics: del primero al segundo, los dos incluidos.</td></tr>
          <tr><td className="font-semibold">Disabled</td><td><Campo disabled /></td><td className="text-ink-medium">La lista está cargando.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Panel">
        <div className="flex flex-wrap gap-6">
          <Muestra titulo="Nothing chosen" nota="All dates en azul; hoy en azul y negrita; los días que vienen, apagados.">
            <Panel />
          </Muestra>
          <Muestra titulo="Picking the end date" nota="Ya se tocó un día: queda en azul y el rango sigue al mouse hasta el segundo clic.">
            <Panel inicial={{
            from: haceDias(10),
            to: haceDias(10)
          }} ancla={haceDias(10)} />
          </Muestra>
          <Muestra titulo="Preset" nota="El atajo elegido en azul y su rango en el calendario.">
            <Panel inicial={ARRANQUE.preset} />
          </Muestra>
        </div>
      </Bloque>
    </Lienzo>
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    value: 'range'
  },
  render: args => <Demo {...args} />,
  play: secuencia(pulsar(/^Filter by date:/), esperar(/Pick a day, or two days for a range/))
}`,...W.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="In Notifications" nota="En la fila de las pestañas, a la derecha: las dos cambian qué se ve. Las fechas acotan los números de las pestañas, la lista y Mark all as read.">
        <EnNotificaciones />
      </Bloque>
      <Bloque titulo="Field" nota="Medidas leídas del campo dibujado.">
        <Tabla encabezado={['Part', 'Sample', 'Height', 'Padding', 'Text', 'Radius']} minimo={720}>
          <Medida nombre="Field"><Campo /></Medida>
          <Medida nombre="Field · with dates"><Campo inicial={RANGO} /></Medida>
        </Tabla>
      </Bloque>
      <Bloque titulo="Panel" nota="Medidas leídas del panel de arriba. Días de 36px, como el DatePicker; 12px de aire al borde de la pantalla.">
        <MedirPanel />
      </Bloque>
      <Bloque titulo="Colors" nota="Tokens de date-filter.tsx; su valor está en src/index.css.">
        <Tabla encabezado={['Part', 'Token']} minimo={480}>
          <tr><td className="font-semibold">Field</td><td><Token nombre="line" /> border · <Token nombre="ink" /> text · hover <Token nombre="surface-subtle" /></td></tr>
          <tr><td className="font-semibold">Field with dates</td><td><Token nombre="dash-blue" /> border and text · <Token nombre="info-bg" /> fill</td></tr>
          <tr><td className="font-semibold">Chosen quick range</td><td><Token nombre="info-bg" /> · text <Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Range ends</td><td><Token nombre="primary" /> · text <Token nombre="primary-foreground" /></td></tr>
          <tr><td className="font-semibold">Range middle</td><td><Token nombre="accent" /></td></tr>
          <tr><td className="font-semibold">Today · dot</td><td><Token nombre="dash-blue" /> · dot <Token nombre="primary" /></td></tr>
          <tr><td className="font-semibold">Hint</td><td><Token nombre="ink-muted" /></td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>One field for a day or a range: one click picks a day, a second click closes the range.</li>
          <li>Applies on click, like Filter: no Apply button. Quick ranges close the panel.</li>
          <li>With dates the field turns blue and has a ✕; All dates means no filter.</li>
          <li>Days with content get a dot; upcoming days are disabled.</li>
          <li>Field 32px: the DatePicker toolbar look, like the Dashboard date. Same calendar (MonthCalendar). The panel keeps 12px from the screen edge.</li>
          <li>When nothing falls in the dates, the list says so and offers Clear dates.</li>
        </ul>
      </Bloque>
    </Lienzo>
}`,...K.parameters?.docs?.source}}}})))()}J();export{W as Open,H as Parts,R as Playground,K as Specs,U as States,q as __namedExportsOrder,M as default};