import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{i as r,n as i,o as a,r as o}from"./play-Dr1R_I1D.js";import{d as s,i as c,t as l}from"./kit-4bQS7S9u.js";import{R as u,t as d,y as f}from"./finanzas-Cd24vV6l.js";import{n as p,t as m}from"./finanzasStore-Dsa0dULP.js";import{a as h,i as g,l as _,n as v,o as y,r as b,s as x,t as S}from"./PlanDrawer-DjR2IiE4.js";import{i as C,n as w,r as T,t as E}from"./kit-drawer-BWB0Ospl.js";function D(){let[e,t]=(0,O.useState)({...b,nombre:`Acme Corp`,grupo:`AET-100245`}),[n,r]=(0,O.useState)(f.codigo),i=e=>n=>t(t=>({...t,[e]:n})),a=()=>void 0;return(0,k.jsxs)(c,{children:[(0,k.jsx)(l,{titulo:`General description`,children:(0,k.jsx)(x,{d:e,set:i,falta:a})}),(0,k.jsx)(l,{titulo:`Contact Information`,children:(0,k.jsx)(y,{d:e,set:i,falta:a,codigo:n,onCodigo:r})}),(0,k.jsx)(l,{titulo:`Address Information`,children:(0,k.jsx)(g,{d:e,set:i,falta:a})}),(0,k.jsx)(l,{titulo:`Configurations`,children:(0,k.jsx)(h,{d:e,set:i,falta:a,aranceles:d})})]})}var O,k,A,j,M,N,P,F,I,L;function R(){return(R=e((()=>{O=t(),v(),_(),o(),s(),C(),p(),u(),k=n(),A={title:`Components/Finance/PlanDrawer`,component:S,parameters:{layout:`fullscreen`,docs:{decisionsFrom:`components/finance/PlanFields.tsx`,story:{inline:!1,iframeHeight:720},description:{component:[`**New Insurance Plan**, desde *Edit Carrier* (botón arriba a la derecha o */insurance-plans/new*). Son los cuatro grupos de la pestaña *Information* del plan en red.dev, uno por paso: General, Contact, Address y Configurations.`,``,`Al guardar se abre la ficha del plan en *Coverage Table*, para seguir con lo que paga. Las otras pestañas (Predeterminations, Payment Table, Deductibles And Benefits, Coordination Of Benefits, Fee Schedule By Location) se completan ahí.`,``,"Los mismos campos (`PlanFields`) arman la pestaña *Information* del plan, una card por grupo: se ven en *Fields*.",``,`**Probalo:** en *Playground* completá cada paso; en Contact elegí un contacto para que llene nombre, email y organización.`].join(`
`)}}},decorators:[e=>(0,k.jsx)(m,{children:(0,k.jsx)(e,{})})],args:{aseguradoraId:`aetna`,onClose:()=>{},onGuardar:()=>{}},argTypes:{aseguradoraId:{control:`select`,options:[`aetna`,`benecare`,`cigna`,`delta-ca`,`metlife`],description:`El carrier del plan (viene de Edit Carrier).`}}},j={},M={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,k.jsx)(w,{pasos:[{nombre:`General`,secciones:`General description: Plan/Employer name, Group #`,obligatorios:`Los dos`},{nombre:`Contact`,secciones:`Contact Information: Country Code, Area Code, Number, Contact (buscador con ✕), First Name, Last Name, Email, Organization`,obligatorios:`Area Code y Number`},{nombre:`Address`,secciones:`Address Information: Address Line 1 y 2, Country, State, City, ZIP Code`,obligatorios:`Todos menos Address Line 2`},{nombre:`Configurations`,secciones:`Benefit Renewal Month, Source of Payment, Type, Max Allowable Amount Fee Schedule, Waiting Period (months), Dependent Max Age (years), Missing Tooth Clause, Crowns/Bridges Paid On, Out of Network Benefits, Out of Network Benefit Assignment`,obligatorios:`Renewal Month, Source of Payment, Type, Waiting Period, Dependent Max Age y Missing Tooth Clause`}]})},N={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,k.jsx)(E,{estados:[{estado:`Default`,cuando:`Abre en General, vacío; Country en Estados Unidos.`,story:`Playground`},{estado:`Validation errors`,cuando:`Next Step o Save con obligatorios vacíos.`,story:`With Validation Errors`},{estado:`Contact selected`,cuando:`Elegir un contacto completa sus datos; la ✕ (Clear contact) los borra.`},{estado:`Saved`,cuando:`Abre la ficha del plan en Coverage Table, vacía (“No procedure ranges found”).`}]})},P={play:a(r(/^next step$/i),i(/this field is required/i))},F={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,k.jsx)(D,{})},I={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,k.jsx)(T,{filas:[[`Size`,`lg`],[`Opens from`,`New Insurance Plan en Edit Carrier; también …/insurance-plans/new.`],[`Fields`,`components/finance/PlanFields.tsx, compartidos con la pestaña Information.`],[`Validation`,`lib/useFormPasos con obligatoriosPlan(country code).`],[`Origen`,`red.dev: New Insurance Plan es la página del plan con sólo Detail habilitada; acá drawer.`]]})},L=[`Playground`,`Parts`,`States`,`WithValidationErrors`,`Fields`,`Specs`],j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded',
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <PasosDelDrawer pasos={[{
    nombre: 'General',
    secciones: 'General description: Plan/Employer name, Group #',
    obligatorios: 'Los dos'
  }, {
    nombre: 'Contact',
    secciones: 'Contact Information: Country Code, Area Code, Number, Contact (buscador con ✕), First Name, Last Name, Email, Organization',
    obligatorios: 'Area Code y Number'
  }, {
    nombre: 'Address',
    secciones: 'Address Information: Address Line 1 y 2, Country, State, City, ZIP Code',
    obligatorios: 'Todos menos Address Line 2'
  }, {
    nombre: 'Configurations',
    secciones: 'Benefit Renewal Month, Source of Payment, Type, Max Allowable Amount Fee Schedule, Waiting Period (months), Dependent Max Age (years), Missing Tooth Clause, Crowns/Bridges Paid On, Out of Network Benefits, Out of Network Benefit Assignment',
    obligatorios: 'Renewal Month, Source of Payment, Type, Waiting Period, Dependent Max Age y Missing Tooth Clause'
  }]} />
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded',
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <EstadosDelDrawer estados={[{
    estado: 'Default',
    cuando: 'Abre en General, vacío; Country en Estados Unidos.',
    story: 'Playground'
  }, {
    estado: 'Validation errors',
    cuando: 'Next Step o Save con obligatorios vacíos.',
    story: 'With Validation Errors'
  }, {
    estado: 'Contact selected',
    cuando: 'Elegir un contacto completa sus datos; la ✕ (Clear contact) los borra.'
  }, {
    estado: 'Saved',
    cuando: 'Abre la ficha del plan en Coverage Table, vacía (“No procedure ranges found”).'
  }]} />
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^next step$/i), esperar(/this field is required/i))
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded',
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <Campos />
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded',
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <SpecsDelDrawer filas={[['Size', 'lg'], ['Opens from', 'New Insurance Plan en Edit Carrier; también …/insurance-plans/new.'], ['Fields', 'components/finance/PlanFields.tsx, compartidos con la pestaña Information.'], ['Validation', 'lib/useFormPasos con obligatoriosPlan(country code).'], ['Origen', 'red.dev: New Insurance Plan es la página del plan con sólo Detail habilitada; acá drawer.']]} />
}`,...I.parameters?.docs?.source}}}})))()}R();export{F as Fields,M as Parts,j as Playground,I as Specs,N as States,P as WithValidationErrors,L as __namedExportsOrder,A as default};