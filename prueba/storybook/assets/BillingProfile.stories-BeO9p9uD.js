import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,f as i,i as a,n as o,o as s,s as c,t as l,u}from"./kit-Di92TvVK.js";import{n as d,t as f}from"./finanzasStore-DLua8Svu.js";import{C as p,b as m,h,m as g,p as _,x as v}from"./LocationInsuranceDefaults-BKZ9t17D.js";import{a as y,c as b,i as x,l as S,n as C,o as w,r as T,s as E,t as D}from"./BillingProfile-CIzq0ySr.js";import{n as O,r as k,t as A}from"./LocationBillingProfile-dO3xLWJy.js";import{n as j,r as M,t as N}from"./ProviderBillingProfile-Bn1yEIUM.js";function P(){let{perfiles:e,guardarPerfil:t}=h(),n=m(`bayside`),[r,i]=(0,I.useState)(null);return(0,L.jsx)(A,{perfil:e[n],reemplazo:r,onReemplazar:i,onCerrarReemplazo:()=>i(null),onGuardar:r=>(t(n,{...e[n],...r}),!0),onDirtyChange:V})}function F({editable:e}){let{perfiles:t}=h();return(0,L.jsx)(N,{perfil:t[v(`elena-martinez`)],editable:e,onGuardar:()=>!0,onDirtyChange:V})}var I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=e((()=>{I=t(),d(),g(),p(),i(),S(),k(),M(),L=n(),R=e=>(0,L.jsx)(f,{children:(0,L.jsx)(_,{children:e})}),z={title:`Components/Settings/BillingProfile`,parameters:{layout:`padded`,docs:{decisionsFrom:[`components/settings/BillingProfile.tsx`,`components/settings/LocationBillingProfile.tsx`,`components/settings/ProviderBillingProfile.tsx`],jira:[`CON-4019`,`CON-4021`,`CON-4026`,`CON-4027`,`CON-4028`,`CON-4033`,`CON-4003`,`CON-4004`,`CON-4005`,`CON-4006`,`CON-4007`],story:{inline:!1,iframeHeight:760},description:{component:[`La pestaña **Insurance / Billing Profile** de una Location (epic CON-4019) y de un provider (epic CON-4003): con qué nombre, dirección, teléfono, NPI y Tax ID factura, y con qué carriers tiene contrato (*Contracted With*).`,``,`**Cómo se usa:** la Location lo habilita con el switch *Use this Location as a Billing Provider* y *Save and enable* (CON-4021): sólo queda activo con credenciales válidas. El provider no tiene switch: el perfil se prepara al guardar *Primary Provider* en Provider Info (CON-4004). Deshabilitado, todo se ve de lectura (CON-4028, CON-4007). Si el perfil está elegido en Insurance Defaults no se puede deshabilitar (CON-4032, CON-4031).`,``,`**Probalo:** en *Playground* elegí de quién es el perfil desde *Controls* (Abril arranca sin configurar, Bayside ya está activa). *Parts* dice qué hace cada pieza, *States* muestra cada estado del perfil y de sus piezas, y *Specs* las medidas leídas en vivo.`].join(`
`)}}},args:{owner:`Location · Abril`},argTypes:{owner:{control:`select`,options:[`Location · Abril`,`Location · Bayside`,`Provider · Elena Martinez`,`Provider · Emily Chen`],description:`De quién es el perfil. Abril: sin configurar · Bayside: activa · Elena Martinez: Primary Provider · Emily Chen: todavía no lo es.`}},decorators:[e=>R((0,L.jsx)(`div`,{className:`bg-page-background min-h-[640px] p-6`,children:(0,L.jsx)(e,{})}))]},B={controls:{disable:!0},docs:{story:{inline:!0}}},V=()=>{},H={render:({owner:e})=>e===`Location · Abril`?(0,L.jsx)(O,{locId:`abril`,nombreLocacion:`Abril`},e):e===`Location · Bayside`?(0,L.jsx)(O,{locId:`bayside`,nombreLocacion:`Bayside Dental`},e):(0,L.jsx)(j,{empleadoId:e===`Provider · Elena Martinez`?`elena-martinez`:`emily-chen`},e)},U={npi:`1234567890`,tipoFiscal:`TIN`,fiscal:`123456789`},W={parameters:B,render:()=>(0,L.jsxs)(a,{children:[(0,L.jsx)(l,{titulo:`Parts`,nota:`Location y provider comparten las piezas de BillingProfile.tsx; cada uno arma su pantalla con ellas.`,children:(0,L.jsx)(u,{partes:[[`Status pill`,`El estado del perfil: Not configured, Pending activation, Active o Inactive.`,`EstadoPerfilPill`],[`Profile field`,`Un dato de lectura con su rótulo (Billing name, NPI, Tax ID).`,`DatoPerfil`],[`Contact card`,`Dirección o teléfono de billing. Replace elige otro del titular o abre el drawer para cargar uno nuevo; el anterior no se borra.`,`ContactoCard`],[`Replace drawer`,`Carga una dirección o un teléfono nuevo.`,`ReplaceContactDrawer`],[`Credentials`,`NPI (10 dígitos) y Tax ID (TIN o SSN, 9 dígitos), en la pantalla o en su drawer.`,`CamposCredenciales · CredentialsDrawer`],[`Contracted With`,`Los carriers, con buscador, filtro e índice por letra. Se tilda con cuáles hay contrato (CON-4027, CON-4006).`,`ContractedWith`],[`Save bar`,`Cancel y Save; avisa si hay cambios sin guardar.`,`AccionesGuardado`],[`Location identity`,`Nombre, dirección, teléfono y credenciales de la Location.`,`IdentidadLocacion`],[`Provider contacts`,`Dirección y teléfono de billing del provider.`,`ContactosProvider`]]})}),(0,L.jsx)(l,{titulo:`Location identity`,children:(0,L.jsx)(P,{})}),(0,L.jsx)(l,{titulo:`Provider contacts`,children:(0,L.jsx)(F,{editable:!0})}),(0,L.jsx)(l,{titulo:`Contracted With`,children:(0,L.jsx)(x,{guardados:{aetna:!0},editable:!0,onGuardar:()=>!0})})]})},G=[`Not configured`,`Pending activation`,`Active`,`Inactive`],K={parameters:B,render:()=>(0,L.jsxs)(a,{children:[(0,L.jsx)(l,{titulo:`Profile status`,nota:`Not configured: nunca se cargó · Pending activation: el switch está prendido y falta guardar · Active · Inactive: se deshabilitó y queda de lectura.`,children:(0,L.jsx)(s,{children:G.map(e=>(0,L.jsx)(o,{rotulo:e,children:(0,L.jsx)(E,{estado:e})},e))})}),(0,L.jsx)(l,{titulo:`Contact card`,children:(0,L.jsxs)(`div`,{className:`grid gap-4 sm:grid-cols-2`,children:[(0,L.jsx)(r,{titulo:`Default`,nota:`Con otros contactos del titular, Replace abre un menú.`,children:(0,L.jsx)(T,{titulo:`Billing address`,valor:`36 Main Street
Miami, Florida 33131, United States`,opciones:[`36 Main Street
Miami, Florida 33131, United States`,`900 Ocean Drive
Miami, Florida 33139, United States`],onElegir:V,onReemplazar:V})}),(0,L.jsx)(r,{titulo:`New, not saved yet`,nota:`Lo cargado en esta pantalla lleva la marca New hasta guardar.`,children:(0,L.jsx)(T,{titulo:`Billing phone`,valor:`+1 (305) 555-0142`,nuevo:!0,onReemplazar:V})}),(0,L.jsx)(r,{titulo:`Disabled`,nota:`Con el perfil deshabilitado no se puede reemplazar.`,children:(0,L.jsx)(T,{titulo:`Billing address`,valor:`36 Main Street
Miami, Florida 33131, United States`,onReemplazar:V,disabled:!0})})]})}),(0,L.jsx)(l,{titulo:`Credentials`,children:(0,L.jsxs)(`div`,{className:`grid gap-4 sm:grid-cols-2`,children:[(0,L.jsx)(r,{titulo:`Filled`,children:(0,L.jsx)(C,{valor:U,onChange:V})}),(0,L.jsx)(r,{titulo:`With validation errors`,nota:`Save and enable con datos inválidos.`,children:(0,L.jsx)(C,{valor:{npi:`123`,tipoFiscal:`TIN`,fiscal:``},onChange:V,errores:{npi:`NPI must have 10 digits.`,fiscal:`Tax ID is required.`}})})]})}),(0,L.jsx)(l,{titulo:`Contracted With`,children:(0,L.jsxs)(`div`,{className:`grid gap-4`,children:[(0,L.jsx)(r,{titulo:`Editable`,nota:`Perfil activo.`,children:(0,L.jsx)(x,{guardados:{aetna:!0,cigna:!0},editable:!0,onGuardar:()=>!0})}),(0,L.jsx)(r,{titulo:`Read only`,nota:`Perfil deshabilitado: se ve, no se cambia.`,children:(0,L.jsx)(x,{guardados:{aetna:!0},editable:!1,onGuardar:()=>!0})})]})}),(0,L.jsx)(l,{titulo:`Save bar`,children:(0,L.jsxs)(`div`,{className:`grid gap-4`,children:[(0,L.jsx)(r,{titulo:`No changes`,nota:`Save queda apagado.`,children:(0,L.jsx)(D,{sucio:!1,aviso:`You have unsaved changes.`,onCancel:V,onSave:V,saveLabel:`Save`})}),(0,L.jsx)(r,{titulo:`Unsaved changes`,children:(0,L.jsx)(D,{sucio:!0,aviso:`You have unsaved changes.`,onCancel:V,onSave:V,saveLabel:`Save carrier contracts`})})]})}),(0,L.jsx)(l,{titulo:`Provider contacts · read only`,children:(0,L.jsx)(F,{editable:!1})})]})},q={layout:`fullscreen`,controls:{disable:!0},docs:{story:{inline:!1,iframeHeight:640}}},J={parameters:q,render:()=>(0,L.jsx)(b,{tipo:`direccion`,onClose:V,onUsar:V})},Y={parameters:q,render:()=>(0,L.jsx)(b,{tipo:`telefono`,onClose:V,onUsar:V})},X={parameters:q,render:()=>(0,L.jsx)(y,{inicial:U,onClose:V,onGuardar:()=>!0})},Z={parameters:B,render:()=>(0,L.jsx)(c,{piezas:[{nombre:`Status pill`,children:(0,L.jsx)(E,{estado:`Active`})},{nombre:`Profile field`,children:(0,L.jsx)(w,{titulo:`NPI`,children:`1234567890`})},{nombre:`Contact card`,children:(0,L.jsx)(T,{titulo:`Billing phone`,valor:`+1 (305) 555-0142`,onReemplazar:V})},{nombre:`Replace button`,selector:`button`,children:(0,L.jsx)(T,{titulo:`Billing phone`,valor:`+1 (305) 555-0142`,onReemplazar:V})},{nombre:`Save button`,selector:`button:last-of-type`,children:(0,L.jsx)(D,{sucio:!0,aviso:`You have unsaved changes.`,onCancel:V,onSave:V,saveLabel:`Save`})}]})},Q=[`Playground`,`Parts`,`States`,`ReplaceAddress`,`ReplacePhone`,`EditCredentials`,`Specs`],H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: ({
    owner
  }) => owner === 'Location · Abril' ? <LocationBillingProfile key={owner} locId="abril" nombreLocacion="Abril" /> : owner === 'Location · Bayside' ? <LocationBillingProfile key={owner} locId="bayside" nombreLocacion="Bayside Dental" /> : <ProviderBillingProfile key={owner} empleadoId={owner === 'Provider · Elena Martinez' ? 'elena-martinez' : 'emily-chen'} />
}`,...H.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Parts" nota="Location y provider comparten las piezas de BillingProfile.tsx; cada uno arma su pantalla con ellas.">
        <TablaPartes partes={[['Status pill', 'El estado del perfil: Not configured, Pending activation, Active o Inactive.', 'EstadoPerfilPill'], ['Profile field', 'Un dato de lectura con su rótulo (Billing name, NPI, Tax ID).', 'DatoPerfil'], ['Contact card', 'Dirección o teléfono de billing. Replace elige otro del titular o abre el drawer para cargar uno nuevo; el anterior no se borra.', 'ContactoCard'], ['Replace drawer', 'Carga una dirección o un teléfono nuevo.', 'ReplaceContactDrawer'], ['Credentials', 'NPI (10 dígitos) y Tax ID (TIN o SSN, 9 dígitos), en la pantalla o en su drawer.', 'CamposCredenciales · CredentialsDrawer'], ['Contracted With', 'Los carriers, con buscador, filtro e índice por letra. Se tilda con cuáles hay contrato (CON-4027, CON-4006).', 'ContractedWith'], ['Save bar', 'Cancel y Save; avisa si hay cambios sin guardar.', 'AccionesGuardado'], ['Location identity', 'Nombre, dirección, teléfono y credenciales de la Location.', 'IdentidadLocacion'], ['Provider contacts', 'Dirección y teléfono de billing del provider.', 'ContactosProvider']]} />
      </Bloque>
      <Bloque titulo="Location identity"><Identidad /></Bloque>
      <Bloque titulo="Provider contacts"><ContactosDelProvider editable /></Bloque>
      <Bloque titulo="Contracted With"><ContractedWith guardados={{
        aetna: true
      }} editable onGuardar={() => true} /></Bloque>
    </Lienzo>
}`,...W.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <Lienzo>
      <Bloque titulo="Profile status" nota="Not configured: nunca se cargó · Pending activation: el switch está prendido y falta guardar · Active · Inactive: se deshabilitó y queda de lectura.">
        <Muestras>{ESTADOS.map(e => <ConRotulo key={e} rotulo={e}><EstadoPerfilPill estado={e} /></ConRotulo>)}</Muestras>
      </Bloque>
      <Bloque titulo="Contact card">
        <div className="grid gap-4 sm:grid-cols-2">
          <Muestra titulo="Default" nota="Con otros contactos del titular, Replace abre un menú."><ContactoCard titulo="Billing address" valor={'36 Main Street\\nMiami, Florida 33131, United States'} opciones={['36 Main Street\\nMiami, Florida 33131, United States', '900 Ocean Drive\\nMiami, Florida 33139, United States']} onElegir={nada} onReemplazar={nada} /></Muestra>
          <Muestra titulo="New, not saved yet" nota="Lo cargado en esta pantalla lleva la marca New hasta guardar."><ContactoCard titulo="Billing phone" valor="+1 (305) 555-0142" nuevo onReemplazar={nada} /></Muestra>
          <Muestra titulo="Disabled" nota="Con el perfil deshabilitado no se puede reemplazar."><ContactoCard titulo="Billing address" valor={'36 Main Street\\nMiami, Florida 33131, United States'} onReemplazar={nada} disabled /></Muestra>
        </div>
      </Bloque>
      <Bloque titulo="Credentials">
        <div className="grid gap-4 sm:grid-cols-2">
          <Muestra titulo="Filled"><CamposCredenciales valor={CREDENCIALES} onChange={nada} /></Muestra>
          <Muestra titulo="With validation errors" nota="Save and enable con datos inválidos."><CamposCredenciales valor={{
            npi: '123',
            tipoFiscal: 'TIN',
            fiscal: ''
          }} onChange={nada} errores={{
            npi: 'NPI must have 10 digits.',
            fiscal: 'Tax ID is required.'
          }} /></Muestra>
        </div>
      </Bloque>
      <Bloque titulo="Contracted With">
        <div className="grid gap-4">
          <Muestra titulo="Editable" nota="Perfil activo."><ContractedWith guardados={{
            aetna: true,
            cigna: true
          }} editable onGuardar={() => true} /></Muestra>
          <Muestra titulo="Read only" nota="Perfil deshabilitado: se ve, no se cambia."><ContractedWith guardados={{
            aetna: true
          }} editable={false} onGuardar={() => true} /></Muestra>
        </div>
      </Bloque>
      <Bloque titulo="Save bar">
        <div className="grid gap-4">
          <Muestra titulo="No changes" nota="Save queda apagado."><AccionesGuardado sucio={false} aviso="You have unsaved changes." onCancel={nada} onSave={nada} saveLabel="Save" /></Muestra>
          <Muestra titulo="Unsaved changes"><AccionesGuardado sucio aviso="You have unsaved changes." onCancel={nada} onSave={nada} saveLabel="Save carrier contracts" /></Muestra>
        </div>
      </Bloque>
      <Bloque titulo="Provider contacts · read only"><ContactosDelProvider editable={false} /></Bloque>
    </Lienzo>
}`,...K.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  parameters: enIframe,
  render: () => <ReplaceContactDrawer tipo="direccion" onClose={nada} onUsar={nada} />
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  parameters: enIframe,
  render: () => <ReplaceContactDrawer tipo="telefono" onClose={nada} onUsar={nada} />
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  parameters: enIframe,
  render: () => <CredentialsDrawer inicial={CREDENCIALES} onClose={nada} onGuardar={() => true} />
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  parameters: sinControles,
  render: () => <SpecsMedidas piezas={[{
    nombre: 'Status pill',
    children: <EstadoPerfilPill estado="Active" />
  }, {
    nombre: 'Profile field',
    children: <DatoPerfil titulo="NPI">1234567890</DatoPerfil>
  }, {
    nombre: 'Contact card',
    children: <ContactoCard titulo="Billing phone" valor="+1 (305) 555-0142" onReemplazar={nada} />
  }, {
    nombre: 'Replace button',
    selector: 'button',
    children: <ContactoCard titulo="Billing phone" valor="+1 (305) 555-0142" onReemplazar={nada} />
  }, {
    nombre: 'Save button',
    selector: 'button:last-of-type',
    children: <AccionesGuardado sucio aviso="You have unsaved changes." onCancel={nada} onSave={nada} saveLabel="Save" />
  }]} />
}`,...Z.parameters?.docs?.source}}}})))()}$();export{X as EditCredentials,W as Parts,H as Playground,J as ReplaceAddress,Y as ReplacePhone,Z as Specs,K as States,Q as __namedExportsOrder,z as default};