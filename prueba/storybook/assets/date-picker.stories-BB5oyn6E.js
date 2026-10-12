import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,t as i}from"./chevron-left-C7VWnWpO.js";import{f as a,n as o,p as s,r as c,s as l,t as u}from"./date-picker-BCSka6Ms.js";import{i as d,n as f,o as p,r as m}from"./play-Dr1R_I1D.js";import{a as h,c as g,d as _,f as v,i as y,l as b,n as x,o as S,p as C,r as w,t as T,u as E}from"./kit-CWUgB5-0.js";import{a as D,n as O}from"./date-filter-D7EzT-D_.js";function k({variant:e,value:t,markedDays:n,error:r}){let[i,a]=(0,N.useState)(t===`chosen`?I:null);return(0,P.jsx)(`div`,{className:`h-[400px] w-64`,children:(0,P.jsx)(u,{variant:e,value:i,onChange:a,marked:n?L:[],error:r,className:e===`field`?`h-9 w-full`:void 0})})}function A({elegido:e=I,max:t,yearNav:n=!0,verMes:r=e}){let[i,a]=(0,N.useState)(new Date(r.getFullYear(),r.getMonth(),1)),[s,c]=(0,N.useState)(e);return(0,P.jsx)(z,{children:(0,P.jsx)(o,{month:i,onMonthChange:a,from:s,to:s,onPick:c,marked:L,max:t,yearNav:n})})}function j(){let e=(0,N.useRef)(null),[t,n]=(0,N.useState)([]);return(0,N.useLayoutEffect)(()=>{n(G.map(([,t])=>{let n=e.current?.querySelector(t);return n?v(n):null}))},[]),(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(`div`,{ref:e,children:(0,P.jsx)(A,{})}),(0,P.jsx)(g,{encabezado:[`Part`,`Width`,`Height`,`Text`,`Radius`],minimo:560,children:G.map(([e],n)=>(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{className:`font-semibold`,children:e}),(0,P.jsx)(`td`,{className:`tabular-nums`,children:t[n]?.ancho??`—`}),(0,P.jsx)(`td`,{className:`tabular-nums`,children:t[n]?.alto??`—`}),(0,P.jsx)(`td`,{className:`tabular-nums`,children:t[n]?`${t[n].texto} · ${t[n].peso}`:`—`}),(0,P.jsx)(`td`,{className:`tabular-nums`,children:t[n]?.radio??`—`})]},e))})]})}function M({nombre:e,children:t}){let{ref:n,m:r}=C(`button`);return(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:e}),(0,P.jsx)(`td`,{children:(0,P.jsx)(`div`,{ref:n,className:`inline-flex`,children:t})}),(0,P.jsx)(`td`,{className:`tabular-nums`,children:r?.alto}),(0,P.jsx)(`td`,{className:`tabular-nums`,children:r?.padding}),(0,P.jsx)(`td`,{className:`tabular-nums`,children:r?`${r.texto} · ${r.peso}`:``}),(0,P.jsx)(`td`,{className:`tabular-nums`,children:r?.radio})]})}var N,P,F,I,L,R,z,B,V,H,U,W,G,K,q;function J(){return(J=e((()=>{N=t(),r(),s(),l(),D(),_(),m(),P=n(),F={title:`Components/UI/DatePicker`,parameters:{layout:`padded`,docs:{description:{component:["Elegir **un día** (`@/components/ui/date-picker`). Para filtrar una lista por un día o un rango está *Elements / Date filter*, que usa el mismo campo y el mismo calendario (`MonthCalendar`).",``,'**Dos looks:** *field* en formularios y drawers (dd-mm-aaaa, como el Figma; texto regular y foco con borde azul, como los demás campos; 36px con `className="h-9 w-full"`) · *toolbar* en la barra de una pantalla (Dashboard): "Feb 28, 2026", medium, hover gris y anillo de foco, el mismo campo que el Date filter.',``,`**El calendario:** el elegido en azul lleno, hoy en azul y negrita, punto en los días con contenido, saltos de mes y de año. Se abre en un popover de Radix: devuelve el foco al cerrar, Escape lo cierra y se da vuelta si no entra.`,``,`**Probalo:** en *Playground* abrí el campo y elegí un día; desde *Controls* cambiá el look, arrancá vacío o con fecha, sacá los puntos o mostralo con error.`].join(`
`)}}},args:{variant:`field`,value:`chosen`,markedDays:!0,error:!1},argTypes:{variant:{control:`inline-radio`,options:[`field`,`toolbar`],description:`field: formulario (dd-mm-aaaa) · toolbar: barra de una pantalla ("Feb 28, 2026").`},value:{control:`inline-radio`,options:[`empty`,`chosen`],description:`Sin fecha (placeholder) o con un día elegido.`},markedDays:{control:`boolean`,description:`Punto en los días con contenido (en el Dashboard, los días con turnos).`},error:{control:`boolean`,description:`Campo obligatorio sin fecha: borde rojo.`}}},I=new Date(2026,1,28),L=[2,5,9,12,16,19,23,26].map(e=>new Date(2026,1,e)),R={render:e=>(0,P.jsx)(k,{...e},JSON.stringify(e))},z=({children:e})=>(0,P.jsx)(`div`,{className:`w-fit max-w-full rounded-lg bg-popover p-3 shadow-md ring-1 ring-foreground/10`,children:e}),B=({variant:e=`field`,inicial:t=I,error:n,ancho:r})=>{let[i,a]=(0,N.useState)(t);return(0,P.jsx)(u,{variant:e,value:i,onChange:a,error:n,className:r?`h-9 w-[220px]`:void 0})},V=[[`Field`,`Muestra el día elegido (o el placeholder) y abre el calendario. field: dd-mm-aaaa; toolbar: "Feb 28, 2026".`,`DatePicker`],[`Year · month arrows`,`Saltan un año o un mes. Se esconden si hay un tope (max) y no hay nada adelante.`,`NavBtn`],[`Month`,`Mes y año a la vista; se anuncia al cambiar.`,`MonthCalendar`],[`Weekdays`,`Su a Sa, apagados.`,`MonthCalendar`],[`Day`,`Elegido en azul lleno; hoy en azul y negrita; punto si tiene contenido; los de otro mes, apagados. Tocarlo elige y cierra.`,`MonthCalendar`]],H={parameters:{controls:{disable:!0}},render:()=>(0,P.jsxs)(y,{children:[(0,P.jsx)(T,{titulo:`Field`,nota:`El mismo campo en los dos looks; cambia el formato, el peso de la letra y el foco.`,children:(0,P.jsxs)(S,{children:[(0,P.jsx)(x,{rotulo:`field · in a form (36px)`,children:(0,P.jsx)(B,{ancho:!0})}),(0,P.jsx)(x,{rotulo:`toolbar · Dashboard (32px)`,children:(0,P.jsx)(B,{variant:`toolbar`})})]})}),(0,P.jsxs)(T,{titulo:`Calendar`,nota:`MonthCalendar: el mismo del Date filter.`,children:[(0,P.jsx)(A,{}),(0,P.jsxs)(S,{children:[(0,P.jsx)(x,{rotulo:`Year arrow`,children:(0,P.jsx)(c,{onClick:()=>{},label:`Previous year`,children:(0,P.jsx)(a,{className:`size-4`})})}),(0,P.jsx)(x,{rotulo:`Month arrow`,children:(0,P.jsx)(c,{onClick:()=>{},label:`Previous month`,children:(0,P.jsx)(i,{className:`size-4`})})})]})]}),(0,P.jsx)(b,{partes:V})]})},U={parameters:{controls:{disable:!0}},render:()=>(0,P.jsxs)(y,{children:[(0,P.jsx)(T,{titulo:`field`,children:(0,P.jsxs)(g,{encabezado:[`State`,`Sample`,`What it means`],minimo:720,children:[(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{className:`font-semibold`,children:`Empty`}),(0,P.jsx)(`td`,{children:(0,P.jsx)(B,{inicial:null,ancho:!0})}),(0,P.jsx)(`td`,{className:`text-ink-medium`,children:`Placeholder apagado.`})]}),(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{className:`font-semibold`,children:`Chosen`}),(0,P.jsx)(`td`,{children:(0,P.jsx)(B,{ancho:!0})}),(0,P.jsx)(`td`,{className:`text-ink-medium`,children:`El día en dd-mm-aaaa.`})]}),(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{className:`font-semibold`,children:`Hover`}),(0,P.jsx)(`td`,{children:(0,P.jsx)(w,{selector:`button`,estado:`hover`,children:(0,P.jsx)(B,{ancho:!0})})}),(0,P.jsx)(`td`,{className:`text-ink-medium`,children:`Borde más oscuro, como los demás campos.`})]}),(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{className:`font-semibold`,children:`Keyboard focus`}),(0,P.jsx)(`td`,{children:(0,P.jsx)(w,{selector:`button`,estado:`focus-visible`,children:(0,P.jsx)(B,{ancho:!0})})}),(0,P.jsx)(`td`,{className:`text-ink-medium`,children:`Borde azul, como los demás campos. Enter o Espacio lo abre.`})]}),(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{className:`font-semibold`,children:`Error`}),(0,P.jsx)(`td`,{children:(0,P.jsx)(B,{inicial:null,error:!0,ancho:!0})}),(0,P.jsx)(`td`,{className:`text-ink-medium`,children:`Obligatorio sin fecha: borde rojo.`})]})]})}),(0,P.jsx)(T,{titulo:`toolbar`,children:(0,P.jsxs)(g,{encabezado:[`State`,`Sample`,`What it means`],minimo:720,children:[(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{className:`font-semibold`,children:`Chosen`}),(0,P.jsx)(`td`,{children:(0,P.jsx)(B,{variant:`toolbar`})}),(0,P.jsx)(`td`,{className:`text-ink-medium`,children:`"Feb 28, 2026", medium. En una barra siempre hay un día.`})]}),(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{className:`font-semibold`,children:`Hover`}),(0,P.jsx)(`td`,{children:(0,P.jsx)(w,{selector:`button`,estado:`hover`,children:(0,P.jsx)(B,{variant:`toolbar`})})}),(0,P.jsx)(`td`,{className:`text-ink-medium`,children:`Fondo gris, como el Date filter y Filter.`})]}),(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{className:`font-semibold`,children:`Keyboard focus`}),(0,P.jsx)(`td`,{children:(0,P.jsx)(w,{selector:`button`,estado:`focus-visible`,children:(0,P.jsx)(B,{variant:`toolbar`})})}),(0,P.jsx)(`td`,{className:`text-ink-medium`,children:`Anillo azul, como los botones.`})]})]})}),(0,P.jsx)(T,{titulo:`Calendar`,children:(0,P.jsxs)(`div`,{className:`flex flex-wrap gap-6`,children:[(0,P.jsx)(h,{titulo:`Chosen day · marked days`,nota:`El elegido en azul lleno; punto en los días con contenido.`,children:(0,P.jsx)(A,{})}),(0,P.jsx)(h,{titulo:`Today`,nota:`Hoy, sin elegir, en azul y negrita (antes era un fondo celeste: ahora el celeste es el medio de un rango).`,children:(0,P.jsx)(A,{elegido:new Date(new Date().getFullYear(),new Date().getMonth()-1,15),verMes:new Date})}),(0,P.jsx)(h,{titulo:`With a max (Date filter)`,nota:`Los días después del tope, deshabilitados; sin flecha hacia adelante.`,children:(0,P.jsx)(A,{elegido:new Date,max:new Date,yearNav:!1})})]})})]})},W={render:e=>(0,P.jsx)(k,{...e}),play:p(d(/28-02-2026/),f(/February 2026/))},G=[[`Arrow`,`button[aria-label="Previous month"]`],[`Month`,`span[aria-live]`],[`Weekday`,`.grid > span`],[`Day`,`.grid > button`]],K={parameters:{controls:{disable:!0}},render:()=>(0,P.jsxs)(y,{children:[(0,P.jsx)(T,{titulo:`Which one goes where`,children:(0,P.jsxs)(g,{encabezado:[`Piece`,`Sample`,`Where`],minimo:720,children:[(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{className:`font-semibold`,children:`DatePicker · field`}),(0,P.jsx)(`td`,{children:(0,P.jsx)(B,{ancho:!0})}),(0,P.jsx)(`td`,{className:`text-ink-medium`,children:`Formularios y drawers: Ledger, Post payment, New appointment, Exceptions, Birthdate.`})]}),(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{className:`font-semibold`,children:`DatePicker · toolbar`}),(0,P.jsx)(`td`,{children:(0,P.jsx)(B,{variant:`toolbar`})}),(0,P.jsx)(`td`,{className:`text-ink-medium`,children:`El día de una pantalla entera: Dashboard (con Today al lado).`})]}),(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{className:`font-semibold`,children:`DateFilter`}),(0,P.jsx)(`td`,{children:(0,P.jsx)(O,{value:null,onChange:()=>{}})}),(0,P.jsx)(`td`,{className:`text-ink-medium`,children:`Filtrar una lista por un día o un rango: Notifications.`})]})]})}),(0,P.jsx)(T,{titulo:`Field`,nota:`Medidas leídas del campo dibujado.`,children:(0,P.jsxs)(g,{encabezado:[`Look`,`Sample`,`Height`,`Padding`,`Text`,`Radius`],minimo:720,children:[(0,P.jsx)(M,{nombre:`field (form)`,children:(0,P.jsx)(B,{ancho:!0})}),(0,P.jsx)(M,{nombre:`toolbar`,children:(0,P.jsx)(B,{variant:`toolbar`})})]})}),(0,P.jsx)(T,{titulo:`Calendar`,nota:`Medidas leídas del calendario de arriba.`,children:(0,P.jsx)(j,{})}),(0,P.jsx)(T,{titulo:`Colors`,nota:`Tokens de date-picker.tsx; su valor está en src/index.css.`,children:(0,P.jsxs)(g,{encabezado:[`Part`,`Token`],minimo:480,children:[(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{className:`font-semibold`,children:`Field`}),(0,P.jsxs)(`td`,{children:[(0,P.jsx)(E,{nombre:`line`}),` border · `,(0,P.jsx)(E,{nombre:`ink`}),` text · placeholder `,(0,P.jsx)(E,{nombre:`ink-faint`})]})]}),(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{className:`font-semibold`,children:`Open · focus`}),(0,P.jsx)(`td`,{children:(0,P.jsx)(E,{nombre:`dash-blue`})})]}),(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{className:`font-semibold`,children:`Error`}),(0,P.jsx)(`td`,{children:(0,P.jsx)(E,{nombre:`field-error`})})]}),(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{className:`font-semibold`,children:`Chosen day`}),(0,P.jsxs)(`td`,{children:[(0,P.jsx)(E,{nombre:`primary`}),` · text `,(0,P.jsx)(E,{nombre:`primary-foreground`})]})]}),(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{className:`font-semibold`,children:`Hover day`}),(0,P.jsx)(`td`,{children:(0,P.jsx)(E,{nombre:`accent`})})]}),(0,P.jsxs)(`tr`,{children:[(0,P.jsx)(`td`,{className:`font-semibold`,children:`Today · dot`}),(0,P.jsxs)(`td`,{children:[(0,P.jsx)(E,{nombre:`dash-blue`}),` · dot `,(0,P.jsx)(E,{nombre:`primary`})]})]})]})}),(0,P.jsx)(T,{titulo:`Rules`,children:(0,P.jsxs)(`ul`,{className:`flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium`,children:[(0,P.jsx)(`li`,{children:`One calendar for the whole app: MonthCalendar, in DatePicker and Date filter. Never a calendar by hand.`}),(0,P.jsx)(`li`,{children:`In a form, field (dd-mm-aaaa, 36px). On a screen toolbar, toolbar ("Feb 28, 2026", 32px).`}),(0,P.jsx)(`li`,{children:`The popover is Radix: Escape closes it, focus goes back to the field and it flips when there is no room.`}),(0,P.jsx)(`li`,{children:`Today in blue bold; the chosen day in solid blue; dots for days with content.`}),(0,P.jsx)(`li`,{children:`Colors always from tokens.`})]})})]})},q=[`Playground`,`Parts`,`States`,`Open`,`Specs`],R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: args => <Demo key={JSON.stringify(args)} {...args} />
}`,...R.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Field" nota="El mismo campo en los dos looks; cambia el formato, el peso de la letra y el foco.">
        <Muestras>
          <ConRotulo rotulo="field · in a form (36px)"><Campo ancho /></ConRotulo>
          <ConRotulo rotulo="toolbar · Dashboard (32px)"><Campo variant="toolbar" /></ConRotulo>
        </Muestras>
      </Bloque>
      <Bloque titulo="Calendar" nota="MonthCalendar: el mismo del Date filter.">
        <Mes />
        <Muestras>
          <ConRotulo rotulo="Year arrow"><NavBtn onClick={() => {}} label="Previous year"><ChevronsLeft className="size-4" /></NavBtn></ConRotulo>
          <ConRotulo rotulo="Month arrow"><NavBtn onClick={() => {}} label="Previous month"><ChevronLeft className="size-4" /></NavBtn></ConRotulo>
        </Muestras>
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
      <Bloque titulo="field">
        <Tabla encabezado={['State', 'Sample', 'What it means']} minimo={720}>
          <tr><td className="font-semibold">Empty</td><td><Campo inicial={null} ancho /></td><td className="text-ink-medium">Placeholder apagado.</td></tr>
          <tr><td className="font-semibold">Chosen</td><td><Campo ancho /></td><td className="text-ink-medium">El día en dd-mm-aaaa.</td></tr>
          <tr><td className="font-semibold">Hover</td><td><Forzar selector="button" estado="hover"><Campo ancho /></Forzar></td><td className="text-ink-medium">Borde más oscuro, como los demás campos.</td></tr>
          <tr><td className="font-semibold">Keyboard focus</td><td><Forzar selector="button" estado="focus-visible"><Campo ancho /></Forzar></td><td className="text-ink-medium">Borde azul, como los demás campos. Enter o Espacio lo abre.</td></tr>
          <tr><td className="font-semibold">Error</td><td><Campo inicial={null} error ancho /></td><td className="text-ink-medium">Obligatorio sin fecha: borde rojo.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="toolbar">
        <Tabla encabezado={['State', 'Sample', 'What it means']} minimo={720}>
          <tr><td className="font-semibold">Chosen</td><td><Campo variant="toolbar" /></td><td className="text-ink-medium">"Feb 28, 2026", medium. En una barra siempre hay un día.</td></tr>
          <tr><td className="font-semibold">Hover</td><td><Forzar selector="button" estado="hover"><Campo variant="toolbar" /></Forzar></td><td className="text-ink-medium">Fondo gris, como el Date filter y Filter.</td></tr>
          <tr><td className="font-semibold">Keyboard focus</td><td><Forzar selector="button" estado="focus-visible"><Campo variant="toolbar" /></Forzar></td><td className="text-ink-medium">Anillo azul, como los botones.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Calendar">
        <div className="flex flex-wrap gap-6">
          <Muestra titulo="Chosen day · marked days" nota="El elegido en azul lleno; punto en los días con contenido.">
            <Mes />
          </Muestra>
          <Muestra titulo="Today" nota="Hoy, sin elegir, en azul y negrita (antes era un fondo celeste: ahora el celeste es el medio de un rango).">
            <Mes elegido={new Date(new Date().getFullYear(), new Date().getMonth() - 1, 15)} verMes={new Date()} />
          </Muestra>
          <Muestra titulo="With a max (Date filter)" nota="Los días después del tope, deshabilitados; sin flecha hacia adelante.">
            <Mes elegido={new Date()} max={new Date()} yearNav={false} />
          </Muestra>
        </div>
      </Bloque>
    </Lienzo>
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: args => <Demo {...args} />,
  play: secuencia(pulsar(/28-02-2026/), esperar(/February 2026/))
}`,...W.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Which one goes where">
        <Tabla encabezado={['Piece', 'Sample', 'Where']} minimo={720}>
          <tr><td className="font-semibold">DatePicker · field</td><td><Campo ancho /></td><td className="text-ink-medium">Formularios y drawers: Ledger, Post payment, New appointment, Exceptions, Birthdate.</td></tr>
          <tr><td className="font-semibold">DatePicker · toolbar</td><td><Campo variant="toolbar" /></td><td className="text-ink-medium">El día de una pantalla entera: Dashboard (con Today al lado).</td></tr>
          <tr><td className="font-semibold">DateFilter</td><td><DateFilter value={null} onChange={() => {}} /></td><td className="text-ink-medium">Filtrar una lista por un día o un rango: Notifications.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Field" nota="Medidas leídas del campo dibujado.">
        <Tabla encabezado={['Look', 'Sample', 'Height', 'Padding', 'Text', 'Radius']} minimo={720}>
          <MedidaCampo nombre="field (form)"><Campo ancho /></MedidaCampo>
          <MedidaCampo nombre="toolbar"><Campo variant="toolbar" /></MedidaCampo>
        </Tabla>
      </Bloque>
      <Bloque titulo="Calendar" nota="Medidas leídas del calendario de arriba.">
        <MedirMes />
      </Bloque>
      <Bloque titulo="Colors" nota="Tokens de date-picker.tsx; su valor está en src/index.css.">
        <Tabla encabezado={['Part', 'Token']} minimo={480}>
          <tr><td className="font-semibold">Field</td><td><Token nombre="line" /> border · <Token nombre="ink" /> text · placeholder <Token nombre="ink-faint" /></td></tr>
          <tr><td className="font-semibold">Open · focus</td><td><Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Error</td><td><Token nombre="field-error" /></td></tr>
          <tr><td className="font-semibold">Chosen day</td><td><Token nombre="primary" /> · text <Token nombre="primary-foreground" /></td></tr>
          <tr><td className="font-semibold">Hover day</td><td><Token nombre="accent" /></td></tr>
          <tr><td className="font-semibold">Today · dot</td><td><Token nombre="dash-blue" /> · dot <Token nombre="primary" /></td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>One calendar for the whole app: MonthCalendar, in DatePicker and Date filter. Never a calendar by hand.</li>
          <li>In a form, field (dd-mm-aaaa, 36px). On a screen toolbar, toolbar ("Feb 28, 2026", 32px).</li>
          <li>The popover is Radix: Escape closes it, focus goes back to the field and it flips when there is no room.</li>
          <li>Today in blue bold; the chosen day in solid blue; dots for days with content.</li>
          <li>Colors always from tokens.</li>
        </ul>
      </Bloque>
    </Lienzo>
}`,...K.parameters?.docs?.source}}}})))()}J();export{W as Open,H as Parts,R as Playground,K as Specs,U as States,q as __namedExportsOrder,F as default};