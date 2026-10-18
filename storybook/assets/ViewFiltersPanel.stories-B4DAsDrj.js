import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{i as r,n as i,o as a,r as o}from"./play-Dr1R_I1D.js";import{a as s,c,d as l,i as u,l as d,r as f,t as p,u as m}from"./kit-CWUgB5-0.js";import{a as h,c as g,i as _,l as v,n as y,o as b,r as x,s as S,t as C,u as w}from"./ViewFiltersPanel-C5sCYqrd.js";function T({ancho:e=976,inicial:t,busqueda:n,largos:r,alto:i}){let a={width:e,maxWidth:`none`,...i?{"--radix-popover-content-available-height":`${i}px`}:{}};return(0,k.jsx)(`div`,{className:`overflow-x-auto p-1`,children:(0,k.jsx)(`div`,{style:a,children:(0,k.jsx)(g,{className:`w-full`,inicial:t,busquedaInicial:n,providers:r?M:void 0,salas:r?N:void 0,onClose:A},JSON.stringify([t,n,r]))})})}function E(){let[e,t]=(0,O.useState)(S);return(0,k.jsxs)(`div`,{className:`flex min-h-[880px] w-full items-start justify-end gap-2 rounded-lg bg-page-background p-4`,children:[(0,k.jsx)(`span`,{className:`flex h-8 items-center px-4 text-xs font-medium text-ink-slate`,children:`Day`}),(0,k.jsx)(`span`,{className:`bg-dash-blue flex h-8 items-center rounded-md px-4 text-xs font-medium text-white`,children:`Week`}),(0,k.jsx)(`span`,{className:`flex h-8 items-center px-4 text-xs font-medium text-ink-slate`,children:`Month`}),(0,k.jsx)(v,{valor:e,onGuardar:t})]})}function D({estado:e,nota:t,children:n}){return(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold whitespace-nowrap`,children:e}),(0,k.jsx)(`td`,{children:n}),(0,k.jsx)(`td`,{className:`text-ink-medium`,children:t})]})}var O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W;function G(){return(G=e((()=>{O=t(),w(),l(),o(),k=n(),A=()=>{},j={controls:{disable:!0}},M=[{id:`martinez`,nombre:`Dr. Maria Abril Viola Fernández de la Torre`,detalle:`General Dentist and Pediatric Orthodontics`},..._.slice(1)],N=[{id:`op1`,nombre:`Operatory 1 — North wing, second floor`,detalle:`General Dentist`},...h.slice(1)],P=(e,t)=>Object.fromEntries([[`all`,t],...e.map(e=>[e.id,`${e.nombre} (${e.id})`])]),F={title:`Components/Scheduling/ViewFiltersPanel`,parameters:{layout:`padded`,docs:{description:{component:["El filtro **View** de Scheduling: qué estado, qué provider y qué sala muestra la agenda. Se abre desde el botón *View* de la barra, debajo y alineado a su borde derecho, sin fondo oscuro (`ViewMenu`, con `ui/popover`). Diseño de Julián del 2026-10-17.",``,`- **Status** en una fila de opciones; **Providers** con buscador por nombre o especialidad y la lista de a dos; **Rooms** al costado, con *Current view*: lo que se va a ver al tocar Save.`,`- Cada grupo elige **uno o todos** ("Select all …"), como en el diseño. Arriba a la derecha de cada grupo, cuántos hay elegidos; al pie, el resumen ("1 provider · 1 room").`,`- **Save** guarda la vista (y avisa "Calendar view updated."); **Cancel**, la ✕, Escape o un clic afuera la descartan.`,`- Mide lo que su caja (container queries): 976px en escritorio; más angosto, Rooms baja debajo de Providers y en el celular la lista va de a uno.`,``,`**Probalo:** en *Playground* cambiá el ancho, lo elegido en cada grupo, la búsqueda y los nombres largos desde *Controls*. Tocá las opciones, usá Tab y las flechas, y buscá "pediatric" o algo que no exista. En *In the toolbar*, el botón de verdad.`].join(`
`)}}},args:{width:976,status:S.estado,provider:S.provider,room:S.sala,search:``,longNames:!1},argTypes:{width:{control:{type:`range`,min:320,max:976,step:8},description:`Ancho de la caja en px. 976 en escritorio; en tablet y celular, la pantalla menos 24.`},status:{control:{type:`select`,labels:P(C,`Select all Status`)},options:[`all`,...C.map(e=>e.id)],description:`Estado elegido al abrir.`},provider:{control:{type:`select`,labels:P(_,`Select all Providers`)},options:[`all`,..._.map(e=>e.id)],description:`Provider elegido al abrir.`},room:{control:{type:`select`,labels:P(h,`Select all Rooms`)},options:[`all`,...h.map(e=>e.id)],description:`Sala elegida al abrir.`},search:{control:`text`,description:`Búsqueda de providers al abrir. Probá "oral" o "zzz".`},longNames:{control:`boolean`,description:`El primer provider y la primera sala con nombres largos: se recortan, no bajan de renglón.`}}},I={render:e=>(0,k.jsx)(T,{ancho:e.width,inicial:{estado:e.status,provider:e.provider,sala:e.room},busqueda:e.search,largos:e.longNames})},L={name:`In the toolbar`,parameters:j,render:()=>(0,k.jsx)(E,{}),play:a(r(/^View$/),i(/Customize the schedule you want to see/))},R={parameters:j,render:()=>(0,k.jsxs)(u,{children:[(0,k.jsx)(p,{titulo:`Options`,nota:`Una sola pieza para las tres listas: sin marca (Status y los Select all), con avatar (providers) y con el círculo de sala (rooms). Elegida, fondo celeste.`,children:(0,k.jsxs)(`div`,{className:`flex flex-wrap items-start gap-6 rounded-lg bg-white p-4`,children:[(0,k.jsxs)(y,{etiqueta:`Status sample`,className:`flex flex-wrap gap-2`,children:[(0,k.jsx)(x,{nombre:`Select all Status`,on:!1,enfocable:!1,onElegir:A,className:`px-4`}),(0,k.jsx)(x,{nombre:`Proposed`,on:!0,enfocable:!0,onElegir:A,className:`px-4`})]}),(0,k.jsx)(y,{etiqueta:`Provider sample`,className:`w-[300px]`,children:(0,k.jsx)(x,{nombre:`Dr. Emily Okonkwo`,detalle:`Pediatric Specialist`,marca:`avatar`,on:!1,enfocable:!0,onElegir:A,className:`w-full`})}),(0,k.jsx)(y,{etiqueta:`Room sample`,className:`w-[248px]`,children:(0,k.jsx)(x,{nombre:`Operatory 1`,detalle:`General Dentist`,marca:`sala`,on:!0,enfocable:!0,onElegir:A,className:`w-full`})})]})}),(0,k.jsx)(p,{titulo:`Section header`,nota:`Rótulo a la izquierda y cuántos hay elegidos a la derecha.`,children:(0,k.jsx)(`div`,{className:`w-[400px] rounded-lg bg-white p-4`,children:(0,k.jsx)(b,{titulo:`Providers`,conteo:`1 of 12 selected`,children:(0,k.jsx)(`span`,{})})})}),(0,k.jsx)(d,{partes:[[`Header`,`"View" (22px Bold) y la bajada "Customize the schedule you want to see". La ✕ cierra sin guardar. Una línea lo separa del cuerpo.`,`header · ICONO_SUELTO`],[`Status`,`Select all Status, Proposed, Check In y Cancelled en una fila que baja de renglón si no entra. Arriba a la derecha: "1 selected".`,`SeccionFiltro · GrupoFiltro · OpcionFiltro`],[`Providers search`,`Filtra por nombre o especialidad mientras se escribe. No cambia lo elegido.`,`input type="search"`],[`Providers`,`Select all Providers y los doce, de a dos. "1 of 12 selected" arriba; "Showing all 12 providers" (o "Showing 4 of 12") abajo.`,`OpcionFiltro marca="avatar"`],[`No results`,`Si la búsqueda no encuentra a nadie: el estado vacío con Clear search.`,`EmptyState`],[`Rooms`,`Select all Rooms y las seis salas. Al costado de Providers, separadas por una línea; en angosto, debajo.`,`OpcionFiltro marca="sala"`],[`Current view`,`Lo que se va a ver al tocar Save: el provider (o All providers) y "estado · sala".`,`div bg-info-bg`],[`Footer`,`El resumen ("1 provider · 1 room") a la izquierda y Cancel / Save a la derecha. Queda fijo: el cuerpo scrollea.`,`footer · Button lg`]]})]})},z=(0,k.jsx)(x,{nombre:`Dr. Emily Okonkwo`,detalle:`Pediatric Specialist`,marca:`avatar`,on:!1,enfocable:!0,onElegir:A,className:`w-full`}),B={estado:`all`,provider:`all`,sala:`all`},V={parameters:j,render:()=>(0,k.jsxs)(u,{className:`max-w-none`,children:[(0,k.jsx)(p,{titulo:`Option`,children:(0,k.jsxs)(c,{encabezado:[`State`,`Sample`,`What it means`],minimo:720,children:[(0,k.jsx)(D,{estado:`Default`,nota:`Radio vacío, sin fondo.`,children:(0,k.jsx)(`div`,{className:`w-[300px]`,children:z})}),(0,k.jsx)(D,{estado:`Hover`,nota:`Fondo gris muy suave: se puede tocar.`,children:(0,k.jsx)(f,{selector:`button`,estado:`hover`,className:`w-[300px]`,children:z})}),(0,k.jsx)(D,{estado:`Keyboard focus`,nota:`Anillo azul por dentro. Tab entra al grupo por la opción elegida; las flechas recorren y eligen.`,children:(0,k.jsx)(f,{selector:`button`,estado:`focus-visible`,className:`w-[300px] p-1`,children:z})}),(0,k.jsx)(D,{estado:`Selected`,nota:`Radio lleno y fondo celeste (info-bg). Una por grupo.`,children:(0,k.jsx)(`div`,{className:`w-[300px]`,children:(0,k.jsx)(x,{nombre:`Dr. Emily Okonkwo`,detalle:`Pediatric Specialist`,marca:`avatar`,on:!0,enfocable:!0,onElegir:A,className:`w-full`})})}),(0,k.jsx)(D,{estado:`Long name`,nota:`Nombre y bajada se recortan en un renglón; el nombre completo queda en el title.`,children:(0,k.jsx)(`div`,{className:`w-[300px]`,children:(0,k.jsx)(x,{nombre:M[0].nombre,detalle:M[0].detalle,marca:`avatar`,on:!1,enfocable:!0,onElegir:A,className:`w-full`})})})]})}),(0,k.jsx)(s,{titulo:`Default`,nota:`Como abre la primera vez: Proposed, Dr. Martinez's y Operatory 1, el ejemplo del diseño.`,children:(0,k.jsx)(T,{})}),(0,k.jsx)(s,{titulo:`Everything selected`,nota:`Select all en los tres grupos: 3 selected, 12 of 12 y 6 of 6; Current view dice All providers · All statuses · All rooms.`,children:(0,k.jsx)(T,{inicial:B})}),(0,k.jsx)(s,{titulo:`Search with results`,nota:`"pediatric": quedan los cuatro Pediatric Specialist y el pie dice "Showing 4 of 12 providers".`,children:(0,k.jsx)(T,{busqueda:`pediatric`})}),(0,k.jsx)(s,{titulo:`Selected provider hidden by the search`,nota:`"oral" esconde a Dr. Martinez's, pero sigue elegido: 1 of 12 y Current view no cambian. Tab entra por Select all Providers.`,children:(0,k.jsx)(T,{busqueda:`oral`})}),(0,k.jsx)(s,{titulo:`No results`,nota:`Ningún provider coincide: el estado vacío con Clear search, que vuelve a mostrar los doce.`,children:(0,k.jsx)(T,{busqueda:`zzz`})}),(0,k.jsx)(s,{titulo:`Short screen`,nota:`Con poco alto (una laptop de 768px), el cuerpo scrollea y el encabezado y el pie quedan fijos.`,children:(0,k.jsx)(T,{alto:520})}),(0,k.jsx)(s,{titulo:`Long names`,nota:`Se recortan con puntos suspensivos: la grilla no se desarma.`,children:(0,k.jsx)(T,{largos:!0,inicial:{...S,provider:`martinez`}})})]})},H={parameters:j,render:()=>(0,k.jsxs)(u,{className:`max-w-none`,children:[(0,k.jsx)(s,{titulo:`Desktop · 976px`,nota:`Rooms al costado de Providers, separado por una línea; providers de a dos.`,children:(0,k.jsx)(T,{ancho:976})}),(0,k.jsx)(s,{titulo:`Tablet · 744px (768 − 24)`,nota:`Rooms baja debajo de Providers, de a dos, con Current view al final.`,children:(0,k.jsx)(T,{ancho:744})}),(0,k.jsx)(s,{titulo:`Phone · 351px (375 − 24)`,nota:`Todo de a uno; Status baja de renglón. El cuerpo scrollea con el alto que deja la pantalla.`,children:(0,k.jsx)(T,{ancho:351,alto:620})})]})},U={parameters:j,render:()=>(0,k.jsxs)(u,{children:[(0,k.jsx)(p,{titulo:`Measures`,nota:`De ViewFiltersPanel.tsx.`,children:(0,k.jsxs)(c,{encabezado:[`Part`,`Value`],minimo:560,children:[(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Panel`}),(0,k.jsxs)(`td`,{children:[`976px máx., la pantalla − 24 debajo de eso · radio 12 · `,(0,k.jsx)(`code`,{children:`shadow-floating`}),` · 6px debajo de View, alineado a su borde derecho, a 12px como mínimo de los bordes de la pantalla`]})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Height`}),(0,k.jsxs)(`td`,{children:[`El alto que deja la pantalla (`,(0,k.jsx)(`code`,{children:`--radix-popover-content-available-height`}),`): encabezado y pie fijos, el cuerpo scrollea`]})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Padding`}),(0,k.jsx)(`td`,{children:`24px a los lados desde 672px de caja; 16px más angosto`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Title · subtitle`}),(0,k.jsx)(`td`,{children:`22px Bold ink · 11px Regular ink-muted`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Section label · count`}),(0,k.jsx)(`td`,{children:`13px Medium ink · 11px ink-muted, números tabulares`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Option`}),(0,k.jsxs)(`td`,{children:[`40px mín. · padding 6/12 (Status 6/16) · radio 8 · gap 12 · radio de 18px (`,(0,k.jsx)(`code`,{children:`Radio`}),`) · nombre 13px Semibold · bajada 11px ink-muted`]})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Avatar · room`}),(0,k.jsx)(`td`,{children:`Avatar de 28px (Elements / Avatars) · círculo dash-blue para la sala`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Search`}),(0,k.jsx)(`td`,{children:`36px · borde line, dash-blue con foco · ícono 16px · 13px`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Columns`}),(0,k.jsx)(`td`,{children:`Providers de a dos desde 512px de caja; Rooms de 248px al costado desde 896px (24px a cada lado de la línea)`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Current view`}),(0,k.jsx)(`td`,{children:`info-bg · radio 8 · padding 12/16 · 11px Medium dash-blue, 13px Semibold, 11px ink-muted`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Footer`}),(0,k.jsxs)(`td`,{children:[`Línea arriba · padding 16/24 · resumen 12px ink-muted · Cancel y Save `,(0,k.jsx)(`code`,{children:`Button`}),` lg (36px)`]})]})]})}),(0,k.jsx)(p,{titulo:`Colors`,children:(0,k.jsxs)(c,{encabezado:[`Use`,`Token`],minimo:480,children:[(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{children:`Selected option · Current view`}),(0,k.jsx)(`td`,{children:(0,k.jsx)(m,{nombre:`info-bg`})})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{children:`Hover`}),(0,k.jsx)(`td`,{children:(0,k.jsx)(m,{nombre:`surface-subtle`})})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{children:`Radio · focus · room · Save`}),(0,k.jsx)(`td`,{children:(0,k.jsx)(m,{nombre:`dash-blue`})})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{children:`Avatar`}),(0,k.jsx)(`td`,{children:(0,k.jsx)(m,{nombre:`dash-count-bg`})})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{children:`Secondary text`}),(0,k.jsx)(`td`,{children:(0,k.jsx)(m,{nombre:`ink-muted`})})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{children:`Dividers · search border`}),(0,k.jsx)(`td`,{children:(0,k.jsx)(m,{nombre:`line`})})]})]})}),(0,k.jsx)(p,{titulo:`Behavior`,children:(0,k.jsxs)(c,{encabezado:[`Rule`,`Why`],minimo:560,children:[(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Uno o todos por grupo`}),(0,k.jsx)(`td`,{children:`Así está en el diseño: radios, con "Select all" como una opción más.`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Save guarda, lo demás descarta`}),(0,k.jsx)(`td`,{children:`Cancel, la ✕, Escape y un clic afuera dejan la vista como estaba; al abrir de nuevo arranca de lo guardado.`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Teclado`}),(0,k.jsx)(`td`,{children:`Tab: búsqueda, ✕ y un paso por grupo (la opción elegida). Flechas: recorren y eligen, como un radio nativo.`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`La búsqueda no elige`}),(0,k.jsx)(`td`,{children:`Esconder al provider elegido no lo saca: el conteo y Current view siguen diciendo lo que se va a ver.`})]}),(0,k.jsxs)(`tr`,{children:[(0,k.jsx)(`td`,{className:`font-semibold`,children:`Gris legible`}),(0,k.jsx)(`td`,{children:`La bajada, los conteos y las especialidades van en ink-muted (4.8:1) y no en el gris claro del diseño (2.6:1).`})]})]})})]})},W=[`Playground`,`InTheToolbar`,`Parts`,`States`,`Widths`,`Specs`],I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: a => <Panel ancho={a.width} inicial={{
    estado: a.status,
    provider: a.provider,
    sala: a.room
  }} busqueda={a.search} largos={a.longNames} />
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  name: 'In the toolbar',
  parameters: sinControles,
  render: () => <EnLaBarra />,
  play: secuencia(pulsar(/^View$/), esperar(/Customize the schedule you want to see/))
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Options" nota="Una sola pieza para las tres listas: sin marca (Status y los Select all), con avatar (providers) y con el círculo de sala (rooms). Elegida, fondo celeste.">
        <div className="flex flex-wrap items-start gap-6 rounded-lg bg-white p-4">
          <GrupoFiltro etiqueta="Status sample" className="flex flex-wrap gap-2">
            <OpcionFiltro nombre="Select all Status" on={false} enfocable={false} onElegir={nada} className="px-4" />
            <OpcionFiltro nombre="Proposed" on enfocable onElegir={nada} className="px-4" />
          </GrupoFiltro>
          <GrupoFiltro etiqueta="Provider sample" className="w-[300px]">
            <OpcionFiltro nombre="Dr. Emily Okonkwo" detalle="Pediatric Specialist" marca="avatar" on={false} enfocable onElegir={nada} className="w-full" />
          </GrupoFiltro>
          <GrupoFiltro etiqueta="Room sample" className="w-[248px]">
            <OpcionFiltro nombre="Operatory 1" detalle="General Dentist" marca="sala" on enfocable onElegir={nada} className="w-full" />
          </GrupoFiltro>
        </div>
      </Bloque>
      <Bloque titulo="Section header" nota="Rótulo a la izquierda y cuántos hay elegidos a la derecha.">
        <div className="w-[400px] rounded-lg bg-white p-4"><SeccionFiltro titulo="Providers" conteo="1 of 12 selected"><span /></SeccionFiltro></div>
      </Bloque>
      <TablaPartes partes={[['Header', '"View" (22px Bold) y la bajada "Customize the schedule you want to see". La ✕ cierra sin guardar. Una línea lo separa del cuerpo.', 'header · ICONO_SUELTO'], ['Status', 'Select all Status, Proposed, Check In y Cancelled en una fila que baja de renglón si no entra. Arriba a la derecha: "1 selected".', 'SeccionFiltro · GrupoFiltro · OpcionFiltro'], ['Providers search', 'Filtra por nombre o especialidad mientras se escribe. No cambia lo elegido.', 'input type="search"'], ['Providers', 'Select all Providers y los doce, de a dos. "1 of 12 selected" arriba; "Showing all 12 providers" (o "Showing 4 of 12") abajo.', 'OpcionFiltro marca="avatar"'], ['No results', 'Si la búsqueda no encuentra a nadie: el estado vacío con Clear search.', 'EmptyState'], ['Rooms', 'Select all Rooms y las seis salas. Al costado de Providers, separadas por una línea; en angosto, debajo.', 'OpcionFiltro marca="sala"'], ['Current view', 'Lo que se va a ver al tocar Save: el provider (o All providers) y "estado · sala".', 'div bg-info-bg'], ['Footer', 'El resumen ("1 provider · 1 room") a la izquierda y Cancel / Save a la derecha. Queda fijo: el cuerpo scrollea.', 'footer · Button lg']]} />
    </Lienzo>
}`,...R.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo className="max-w-none">
      <Bloque titulo="Option">
        <Tabla encabezado={['State', 'Sample', 'What it means']} minimo={720}>
          <Fila estado="Default" nota="Radio vacío, sin fondo.">
            <div className="w-[300px]">{OPCION}</div>
          </Fila>
          <Fila estado="Hover" nota="Fondo gris muy suave: se puede tocar.">
            <Forzar selector="button" estado="hover" className="w-[300px]">{OPCION}</Forzar>
          </Fila>
          <Fila estado="Keyboard focus" nota="Anillo azul por dentro. Tab entra al grupo por la opción elegida; las flechas recorren y eligen.">
            <Forzar selector="button" estado="focus-visible" className="w-[300px] p-1">{OPCION}</Forzar>
          </Fila>
          <Fila estado="Selected" nota="Radio lleno y fondo celeste (info-bg). Una por grupo.">
            <div className="w-[300px]"><OpcionFiltro nombre="Dr. Emily Okonkwo" detalle="Pediatric Specialist" marca="avatar" on enfocable onElegir={nada} className="w-full" /></div>
          </Fila>
          <Fila estado="Long name" nota="Nombre y bajada se recortan en un renglón; el nombre completo queda en el title.">
            <div className="w-[300px]"><OpcionFiltro nombre={LARGOS[0].nombre} detalle={LARGOS[0].detalle} marca="avatar" on={false} enfocable onElegir={nada} className="w-full" /></div>
          </Fila>
        </Tabla>
      </Bloque>
      <Muestra titulo="Default" nota="Como abre la primera vez: Proposed, Dr. Martinez's y Operatory 1, el ejemplo del diseño.">
        <Panel />
      </Muestra>
      <Muestra titulo="Everything selected" nota="Select all en los tres grupos: 3 selected, 12 of 12 y 6 of 6; Current view dice All providers · All statuses · All rooms.">
        <Panel inicial={TODO} />
      </Muestra>
      <Muestra titulo="Search with results" nota={'"pediatric": quedan los cuatro Pediatric Specialist y el pie dice "Showing 4 of 12 providers".'}>
        <Panel busqueda="pediatric" />
      </Muestra>
      <Muestra titulo="Selected provider hidden by the search" nota={'"oral" esconde a Dr. Martinez\\'s, pero sigue elegido: 1 of 12 y Current view no cambian. Tab entra por Select all Providers.'}>
        <Panel busqueda="oral" />
      </Muestra>
      <Muestra titulo="No results" nota="Ningún provider coincide: el estado vacío con Clear search, que vuelve a mostrar los doce.">
        <Panel busqueda="zzz" />
      </Muestra>
      <Muestra titulo="Short screen" nota="Con poco alto (una laptop de 768px), el cuerpo scrollea y el encabezado y el pie quedan fijos.">
        <Panel alto={520} />
      </Muestra>
      <Muestra titulo="Long names" nota="Se recortan con puntos suspensivos: la grilla no se desarma.">
        <Panel largos inicial={{
        ...VISTA_INICIAL,
        provider: 'martinez'
      }} />
      </Muestra>
    </Lienzo>
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo className="max-w-none">
      <Muestra titulo="Desktop · 976px" nota="Rooms al costado de Providers, separado por una línea; providers de a dos.">
        <Panel ancho={976} />
      </Muestra>
      <Muestra titulo="Tablet · 744px (768 − 24)" nota="Rooms baja debajo de Providers, de a dos, con Current view al final.">
        <Panel ancho={744} />
      </Muestra>
      <Muestra titulo="Phone · 351px (375 − 24)" nota="Todo de a uno; Status baja de renglón. El cuerpo scrollea con el alto que deja la pantalla.">
        <Panel ancho={351} alto={620} />
      </Muestra>
    </Lienzo>
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Measures" nota="De ViewFiltersPanel.tsx.">
        <Tabla encabezado={['Part', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Panel</td><td>976px máx., la pantalla − 24 debajo de eso · radio 12 · <code>shadow-floating</code> · 6px debajo de View, alineado a su borde derecho, a 12px como mínimo de los bordes de la pantalla</td></tr>
          <tr><td className="font-semibold">Height</td><td>El alto que deja la pantalla (<code>--radix-popover-content-available-height</code>): encabezado y pie fijos, el cuerpo scrollea</td></tr>
          <tr><td className="font-semibold">Padding</td><td>24px a los lados desde 672px de caja; 16px más angosto</td></tr>
          <tr><td className="font-semibold">Title · subtitle</td><td>22px Bold ink · 11px Regular ink-muted</td></tr>
          <tr><td className="font-semibold">Section label · count</td><td>13px Medium ink · 11px ink-muted, números tabulares</td></tr>
          <tr><td className="font-semibold">Option</td><td>40px mín. · padding 6/12 (Status 6/16) · radio 8 · gap 12 · radio de 18px (<code>Radio</code>) · nombre 13px Semibold · bajada 11px ink-muted</td></tr>
          <tr><td className="font-semibold">Avatar · room</td><td>Avatar de 28px (Elements / Avatars) · círculo dash-blue para la sala</td></tr>
          <tr><td className="font-semibold">Search</td><td>36px · borde line, dash-blue con foco · ícono 16px · 13px</td></tr>
          <tr><td className="font-semibold">Columns</td><td>Providers de a dos desde 512px de caja; Rooms de 248px al costado desde 896px (24px a cada lado de la línea)</td></tr>
          <tr><td className="font-semibold">Current view</td><td>info-bg · radio 8 · padding 12/16 · 11px Medium dash-blue, 13px Semibold, 11px ink-muted</td></tr>
          <tr><td className="font-semibold">Footer</td><td>Línea arriba · padding 16/24 · resumen 12px ink-muted · Cancel y Save <code>Button</code> lg (36px)</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Use', 'Token']} minimo={480}>
          <tr><td>Selected option · Current view</td><td><Token nombre="info-bg" /></td></tr>
          <tr><td>Hover</td><td><Token nombre="surface-subtle" /></td></tr>
          <tr><td>Radio · focus · room · Save</td><td><Token nombre="dash-blue" /></td></tr>
          <tr><td>Avatar</td><td><Token nombre="dash-count-bg" /></td></tr>
          <tr><td>Secondary text</td><td><Token nombre="ink-muted" /></td></tr>
          <tr><td>Dividers · search border</td><td><Token nombre="line" /></td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Behavior">
        <Tabla encabezado={['Rule', 'Why']} minimo={560}>
          <tr><td className="font-semibold">Uno o todos por grupo</td><td>Así está en el diseño: radios, con "Select all" como una opción más.</td></tr>
          <tr><td className="font-semibold">Save guarda, lo demás descarta</td><td>Cancel, la ✕, Escape y un clic afuera dejan la vista como estaba; al abrir de nuevo arranca de lo guardado.</td></tr>
          <tr><td className="font-semibold">Teclado</td><td>Tab: búsqueda, ✕ y un paso por grupo (la opción elegida). Flechas: recorren y eligen, como un radio nativo.</td></tr>
          <tr><td className="font-semibold">La búsqueda no elige</td><td>Esconder al provider elegido no lo saca: el conteo y Current view siguen diciendo lo que se va a ver.</td></tr>
          <tr><td className="font-semibold">Gris legible</td><td>La bajada, los conteos y las especialidades van en ink-muted (4.8:1) y no en el gris claro del diseño (2.6:1).</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...U.parameters?.docs?.source}}}})))()}G();export{L as InTheToolbar,R as Parts,I as Playground,U as Specs,V as States,H as Widths,W as __namedExportsOrder,F as default};