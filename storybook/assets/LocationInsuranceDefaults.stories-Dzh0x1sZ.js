import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,f as i,i as a,s as o,t as s,u as c}from"./kit-Di92TvVK.js";import{a as l,i as u,n as d,o as f,r as p}from"./play-Dr1R_I1D.js";import{n as m,t as h}from"./finanzasStore-DLua8Svu.js";import{C as g,a as _,b as v,c as y,d as b,f as x,i as S,l as C,m as w,n as T,o as E,p as D,r as O,s as k,t as A,u as j}from"./LocationInsuranceDefaults-RyHxMOFG.js";function M(){let[e,t]=(0,P.useState)(`a`);return(0,F.jsx)(y,{etiqueta:`Billing provider`,valor:e,opciones:[[`a`,`Location Billing Profile`],[`b`,`Specific Billing Profile`]],onChange:t})}function N({inicial:e}){let[t,n]=(0,P.useState)(e);return(0,F.jsx)(T,{on:t,onChange:n,children:`Assignment of Benefits`})}var P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{P=t(),m(),w(),g(),i(),p(),x(),F=n(),I={Abril:`abril`,"Bayside Dental":`bayside`,"Northgate Clinic":`northgate`},L=e=>(0,F.jsx)(h,{children:(0,F.jsx)(D,{children:e})}),R={title:`Components/Settings/LocationInsuranceDefaults`,parameters:{layout:`padded`,docs:{jira:[`CON-1173`,`CON-4029`,`CON-3894`,`CON-3896`,`CON-4030`,`CON-3898`,`CON-3899`,`CON-4031`,`CON-4032`],story:{inline:!1,iframeHeight:820},description:{component:[`La pestaña **Insurance Defaults** de una Location (epic CON-1173): qué Billing Provider (CON-3894) y qué Rendering Provider (CON-3896) van por defecto en los claims, qué contrato se usa para los cálculos (CON-4030), el Place of Service (CON-3898) y las autorizaciones de un suscriptor nuevo (CON-3899).`,``,`**Cómo se usa:** todo se guarda junto con un solo *Save changes* (CON-4029). Elegir *Specific Billing Profile* o *Specific Provider* obliga a seleccionar uno: se eligen en un drawer que abre una card con Select / Change, no en un input. Un perfil o un provider elegido acá no se puede deshabilitar desde su pantalla: ahí aparece el aviso que lista dónde está en uso (CON-4031, CON-4032).`,``,`**Probalo:** en *Playground* elegí la Location desde *Controls*, cambiá las opciones y guardá. *Parts* dice qué hace cada pieza, *States* muestra la selección vacía, llena y con error y el aviso de bloqueo, y *Specs* las medidas leídas en vivo.`].join(`
`)}}},args:{location:`Abril`},argTypes:{location:{control:`inline-radio`,options:[`Abril`,`Bayside Dental`,`Northgate Clinic`],description:`La Location cuyos defaults se editan.`}},decorators:[e=>L((0,F.jsx)(`div`,{className:`bg-page-background min-h-[720px] p-6`,children:(0,F.jsx)(e,{})}))]},z={controls:{disable:!0},docs:{story:{inline:!0}}},B={layout:`fullscreen`,controls:{disable:!0},docs:{story:{inline:!1,iframeHeight:640}}},V=()=>{},H={render:({location:e})=>(0,F.jsx)(E,{locId:I[e]},e)},U={parameters:{controls:{disable:!0}},render:()=>(0,F.jsx)(E,{locId:`abril`}),play:f(l(`radio`,/Specific Billing Profile/),u(/save changes/i),d(/select/i))},W={parameters:z,render:()=>(0,F.jsxs)(a,{children:[(0,F.jsx)(s,{titulo:`Parts`,children:(0,F.jsx)(c,{partes:[[`Section header`,`Título y bajada de cada bloque de defaults.`,`Encabezado`],[`Options`,`El grupo de radios de un default (Location / Specific…).`,`Opciones`],[`Checkbox`,`Una autorización del suscriptor nuevo (Assignment of Benefits, Release of Information).`,`Casilla`],[`Selection card`,`La card con Select / Change que abre el drawer; llena muestra el resumen de lo elegido.`,`Seleccion`],[`Profile summary`,`El Billing Profile elegido: nombre y organización.`,`ResumenPerfil`],[`Provider summary`,`El provider elegido: avatar, nombre y especialidad.`,`ResumenProvider`],[`Drawer option`,`Una fila elegible dentro del drawer.`,`OpcionDrawer`],[`Select Billing Profile`,`El drawer con los perfiles habilitados.`,`ElegirPerfilDrawer`],[`Select provider`,`El drawer con los providers elegibles.`,`ElegirProviderDrawer`],[`In-use notice`,`El aviso que frena deshabilitar un perfil o un provider en uso, con link a cada Location.`,`BloqueoDefaults`]]})}),(0,F.jsx)(s,{titulo:`Section header`,children:(0,F.jsx)(_,{titulo:`Billing provider`,bajada:`Who bills the claims created in this location.`})}),(0,F.jsx)(s,{titulo:`Options`,children:(0,F.jsx)(M,{})}),(0,F.jsx)(s,{titulo:`Summaries`,children:(0,F.jsxs)(`div`,{className:`grid gap-4 sm:grid-cols-2`,children:[(0,F.jsx)(r,{titulo:`Profile summary`,children:(0,F.jsx)(C,{clave:v(`bayside`)})}),(0,F.jsx)(r,{titulo:`Provider summary`,children:(0,F.jsx)(j,{id:`elena-martinez`})})]})}),(0,F.jsx)(s,{titulo:`Drawer option`,nota:`Elegida y sin elegir.`,children:(0,F.jsxs)(`div`,{className:`flex max-w-[420px] flex-col gap-2`,children:[(0,F.jsx)(k,{on:!0,onMarcar:V,onElegir:V,children:(0,F.jsx)(j,{id:`elena-martinez`})}),(0,F.jsx)(k,{on:!1,onMarcar:V,onElegir:V,children:(0,F.jsx)(j,{id:`sarah-stone`})})]})})]})},G={parameters:z,render:()=>(0,F.jsxs)(a,{children:[(0,F.jsx)(s,{titulo:`Selection card`,children:(0,F.jsxs)(`div`,{className:`grid gap-4`,children:[(0,F.jsx)(r,{titulo:`Empty`,nota:`Sin nada elegido: Select abre el drawer.`,children:(0,F.jsx)(b,{id:`s1`,rotulo:`Billing Profile`,requerido:!0,vacio:`No billing profile selected.`,onElegir:V})}),(0,F.jsx)(r,{titulo:`Selected`,nota:`Con algo elegido: el resumen y Change.`,children:(0,F.jsx)(b,{id:`s2`,rotulo:`Billing Profile`,requerido:!0,vacio:`No billing profile selected.`,onElegir:V,onQuitar:V,children:(0,F.jsx)(C,{clave:v(`bayside`)})})}),(0,F.jsx)(r,{titulo:`Error`,nota:`Save changes sin elegir.`,children:(0,F.jsx)(b,{id:`s3`,rotulo:`Rendering Provider`,requerido:!0,vacio:`No provider selected.`,error:`Select a rendering provider.`,onElegir:V})})]})}),(0,F.jsx)(s,{titulo:`Checkbox`,children:(0,F.jsxs)(`div`,{className:`flex flex-wrap gap-6`,children:[(0,F.jsx)(N,{inicial:!0}),(0,F.jsx)(N,{inicial:!1})]})})]})},K={parameters:B,render:()=>(0,F.jsx)(O,{elegido:v(`bayside`),onClose:V,onElegir:V})},q={parameters:B,render:()=>(0,F.jsx)(S,{titulo:`Select Rendering Provider`,providers:[`elena-martinez`,`sarah-stone`,`daniel-anderson`],elegido:`elena-martinez`,onClose:V,onElegir:V})},J={parameters:B,render:()=>(0,F.jsx)(S,{titulo:`Select Rendering Provider`,providers:[],elegido:null,onClose:V,onElegir:V})},Y={parameters:B,render:()=>(0,F.jsx)(A,{tipo:`perfil`,referencias:[{locId:`abril`,campo:`billingProfileId`},{locId:`northgate`,campo:`billingProfileId`}],onClose:V})},X={parameters:B,render:()=>(0,F.jsx)(A,{tipo:`provider`,referencias:[{locId:`abril`,campo:`renderingId`}],onClose:V})},Z={parameters:z,render:()=>(0,F.jsx)(o,{piezas:[{nombre:`Selection card`,children:(0,F.jsx)(b,{id:`m1`,rotulo:`Billing Profile`,requerido:!0,vacio:`No billing profile selected.`,onElegir:V})},{nombre:`Select button`,selector:`button`,children:(0,F.jsx)(b,{id:`m2`,rotulo:`Billing Profile`,requerido:!0,vacio:`No billing profile selected.`,onElegir:V})},{nombre:`Drawer option`,children:(0,F.jsx)(k,{on:!0,onMarcar:V,onElegir:V,children:(0,F.jsx)(j,{id:`elena-martinez`})})},{nombre:`Checkbox`,children:(0,F.jsx)(N,{inicial:!0})}]})},Q=[`Playground`,`WithValidationErrors`,`Parts`,`States`,`SelectBillingProfile`,`SelectProvider`,`SelectProviderEmpty`,`BillingProfileInUse`,`ProviderInUse`,`Specs`],H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: ({
    location
  }) => <LocationInsuranceDefaults key={location} locId={IDS[location]} />
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <LocationInsuranceDefaults locId="abril" />,
  play: secuencia(pulsarRol('radio', /Specific Billing Profile/), pulsar(/save changes/i), esperar(/select/i))
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[['Section header', 'Título y bajada de cada bloque de defaults.', 'Encabezado'], ['Options', 'El grupo de radios de un default (Location / Specific…).', 'Opciones'], ['Checkbox', 'Una autorización del suscriptor nuevo (Assignment of Benefits, Release of Information).', 'Casilla'], ['Selection card', 'La card con Select / Change que abre el drawer; llena muestra el resumen de lo elegido.', 'Seleccion'], ['Profile summary', 'El Billing Profile elegido: nombre y organización.', 'ResumenPerfil'], ['Provider summary', 'El provider elegido: avatar, nombre y especialidad.', 'ResumenProvider'], ['Drawer option', 'Una fila elegible dentro del drawer.', 'OpcionDrawer'], ['Select Billing Profile', 'El drawer con los perfiles habilitados.', 'ElegirPerfilDrawer'], ['Select provider', 'El drawer con los providers elegibles.', 'ElegirProviderDrawer'], ['In-use notice', 'El aviso que frena deshabilitar un perfil o un provider en uso, con link a cada Location.', 'BloqueoDefaults']]} />
      </Bloque>
      <Bloque titulo="Section header"><Encabezado titulo="Billing provider" bajada="Who bills the claims created in this location." /></Bloque>
      <Bloque titulo="Options"><OpcionesDemo /></Bloque>
      <Bloque titulo="Summaries">
        <div className="grid gap-4 sm:grid-cols-2">
          <Muestra titulo="Profile summary"><ResumenPerfil clave={claveLocacion('bayside')} /></Muestra>
          <Muestra titulo="Provider summary"><ResumenProvider id="elena-martinez" /></Muestra>
        </div>
      </Bloque>
      <Bloque titulo="Drawer option" nota="Elegida y sin elegir.">
        <div className="flex max-w-[420px] flex-col gap-2">
          <OpcionDrawer on onMarcar={nada} onElegir={nada}><ResumenProvider id="elena-martinez" /></OpcionDrawer>
          <OpcionDrawer on={false} onMarcar={nada} onElegir={nada}><ResumenProvider id="sarah-stone" /></OpcionDrawer>
        </div>
      </Bloque>
    </Lienzo>
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Selection card">
        <div className="grid gap-4">
          <Muestra titulo="Empty" nota="Sin nada elegido: Select abre el drawer."><Seleccion id="s1" rotulo="Billing Profile" requerido vacio="No billing profile selected." onElegir={nada} /></Muestra>
          <Muestra titulo="Selected" nota="Con algo elegido: el resumen y Change."><Seleccion id="s2" rotulo="Billing Profile" requerido vacio="No billing profile selected." onElegir={nada} onQuitar={nada}><ResumenPerfil clave={claveLocacion('bayside')} /></Seleccion></Muestra>
          <Muestra titulo="Error" nota="Save changes sin elegir."><Seleccion id="s3" rotulo="Rendering Provider" requerido vacio="No provider selected." error="Select a rendering provider." onElegir={nada} /></Muestra>
        </div>
      </Bloque>
      <Bloque titulo="Checkbox">
        <div className="flex flex-wrap gap-6"><CasillaDemo inicial /><CasillaDemo inicial={false} /></div>
      </Bloque>
    </Lienzo>
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  parameters: enIframe,
  render: () => <ElegirPerfilDrawer elegido={claveLocacion('bayside')} onClose={nada} onElegir={nada} />
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  parameters: enIframe,
  render: () => <ElegirProviderDrawer titulo="Select Rendering Provider" providers={['elena-martinez', 'sarah-stone', 'daniel-anderson']} elegido="elena-martinez" onClose={nada} onElegir={nada} />
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  parameters: enIframe,
  render: () => <ElegirProviderDrawer titulo="Select Rendering Provider" providers={[]} elegido={null} onClose={nada} onElegir={nada} />
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  parameters: enIframe,
  render: () => <BloqueoDefaults tipo="perfil" referencias={[{
    locId: 'abril',
    campo: 'billingProfileId'
  }, {
    locId: 'northgate',
    campo: 'billingProfileId'
  }]} onClose={nada} />
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  parameters: enIframe,
  render: () => <BloqueoDefaults tipo="provider" referencias={[{
    locId: 'abril',
    campo: 'renderingId'
  }]} onClose={nada} />
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <SpecsMedidas piezas={[{
    nombre: 'Selection card',
    children: <Seleccion id="m1" rotulo="Billing Profile" requerido vacio="No billing profile selected." onElegir={nada} />
  }, {
    nombre: 'Select button',
    selector: 'button',
    children: <Seleccion id="m2" rotulo="Billing Profile" requerido vacio="No billing profile selected." onElegir={nada} />
  }, {
    nombre: 'Drawer option',
    children: <OpcionDrawer on onMarcar={nada} onElegir={nada}><ResumenProvider id="elena-martinez" /></OpcionDrawer>
  }, {
    nombre: 'Checkbox',
    children: <CasillaDemo inicial />
  }]} />
}`,...Z.parameters?.docs?.source}}}})))()}$();export{Y as BillingProfileInUse,W as Parts,H as Playground,X as ProviderInUse,K as SelectBillingProfile,q as SelectProvider,J as SelectProviderEmpty,Z as Specs,G as States,U as WithValidationErrors,Q as __namedExportsOrder,R as default};