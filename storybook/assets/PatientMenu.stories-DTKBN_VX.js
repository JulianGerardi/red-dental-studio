import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,c as i,i as a,o,s}from"./PatientSidePanel-B8vKb1WX.js";import{n as c,t as l}from"./pantalla-byKtunLL.js";function u({collapsed:e,encounter:t}){return(0,f.useEffect)(()=>{o(e),r(t)},[e,t]),null}function d({section:e,collapsed:t,encounter:n,preview:r={}}){return(0,p.jsx)(s.Provider,{value:r,children:(0,p.jsx)(l,{ruta:`${m}${h[e]}`,despues:(0,p.jsx)(u,{collapsed:t,encounter:n})},e)})}var f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M;function N(){return(N=e((()=>{f=t(),a(),i(),c(),p=n(),m=`/patients/abril-viola`,h={Overview:``,Treatments:`/treatments`,Insurance:`/insurance`,Ledger:`/ledger`,Documents:`/documents`,"Relationships & Billing":`/relationships`},g={title:`Elements/Patient menu`,parameters:{layout:`fullscreen`,router:!1,docs:{decisionsFrom:`components/patients/PatientSidePanel.tsx`,story:{inline:!1,iframeHeight:760},description:{component:["El panel de la izquierda en las pantallas de un paciente (`@/components/patients/PatientSidePanel`), mostrado sobre las pantallas reales.",``,`**Expandido (218px):** colapsar · foto, nombre, estado y edad · botón de encuentro (*Start Encounter* / *Pending Encounter*, el chevron cambia entre los dos) · *Clinical Mode* · las secciones, con la actual en azul · *General* y *Contact* con su lápiz.`,``,`**Colapsado (60px):** sólo íconos con su tooltip; el estado pasa a un punto verde sobre la foto; General y Contact se leen en la tarjeta del ícono de ficha. La pantalla usa el ancho que libera (se nota en Ledger).`,``,`**Recuerda** colapsado/expandido y el encuentro al pasar de una sección a otra. **Menos de 1024px:** no colapsa; las secciones pasan a una tira horizontal.`].join(`
`)}}},args:{section:`Overview`,collapsed:!1,encounter:`start`},argTypes:{section:{control:`select`,options:Object.keys(h),description:`Sección: se abre su pantalla y queda en azul en el menú.`},collapsed:{control:`boolean`,description:`Expandido (218px) o colapsado (60px). En la app, con el botón de arriba del panel.`},encounter:{control:`inline-radio`,options:[`start`,`pending`],description:`Start Encounter (verde) o Pending Encounter (ámbar).`},preview:{table:{disable:!0}}},loaders:[async({args:e})=>(o(!!e.collapsed),r(e.encounter??`start`),{})]},_=(e,t,n)=>({name:e,args:t,parameters:{docs:{disable:!0},controls:n?{include:n}:{disable:!0}},render:e=>(0,p.jsx)(d,{...e})}),v={render:e=>(0,p.jsx)(d,{...e})},y=_(`Section: Overview`,{section:`Overview`},[`collapsed`]),b=_(`Section: Treatments`,{section:`Treatments`},[`collapsed`]),x=_(`Section: Insurance`,{section:`Insurance`},[`collapsed`]),S=_(`Section: Ledger`,{section:`Ledger`},[`collapsed`]),C=_(`Section: Documents`,{section:`Documents`},[`collapsed`]),w=_(`Section: Relationships & Billing`,{section:`Relationships & Billing`},[`collapsed`]),T=_(`Collapsed`,{section:`Ledger`,collapsed:!0},[`section`]),E=_(`Collapsed: tooltip on hover`,{section:`Overview`,collapsed:!0,preview:{tooltip:`Ledger`}}),D=_(`Collapsed: patient status`,{section:`Overview`,collapsed:!0,preview:{tooltip:`John Smith · Active · 50 years`}}),O=_(`Collapsed: patient information`,{section:`Overview`,collapsed:!0,preview:{infoCard:!0}}),k=_(`Encounter: pending`,{encounter:`pending`}),A=_(`Encounter: options`,{preview:{encounterOptions:!0}}),j={..._(`On a phone`,{section:`Overview`},[`section`]),globals:{viewport:{value:`mobile2`,isRotated:!1}}},M=[`Playground`,`Overview`,`Treatments`,`Insurance`,`Ledger`,`Documents`,`Relationships`,`Collapsed`,`CollapsedTooltip`,`CollapsedStatus`,`CollapsedInfoCard`,`PendingEncounter`,`EncounterOptions`,`Phone`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: args => <Pantalla {...args} />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`historia('Section: Overview', {
  section: 'Overview'
}, ['collapsed'])`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`historia('Section: Treatments', {
  section: 'Treatments'
}, ['collapsed'])`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`historia('Section: Insurance', {
  section: 'Insurance'
}, ['collapsed'])`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`historia('Section: Ledger', {
  section: 'Ledger'
}, ['collapsed'])`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`historia('Section: Documents', {
  section: 'Documents'
}, ['collapsed'])`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`historia('Section: Relationships & Billing', {
  section: 'Relationships & Billing'
}, ['collapsed'])`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`historia('Collapsed', {
  section: 'Ledger',
  collapsed: true
}, ['section'])`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`historia('Collapsed: tooltip on hover', {
  section: 'Overview',
  collapsed: true,
  preview: {
    tooltip: 'Ledger'
  }
})`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`historia('Collapsed: patient status', {
  section: 'Overview',
  collapsed: true,
  preview: {
    tooltip: 'John Smith · Active · 50 years'
  }
})`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`historia('Collapsed: patient information', {
  section: 'Overview',
  collapsed: true,
  preview: {
    infoCard: true
  }
})`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`historia('Encounter: pending', {
  encounter: 'pending'
})`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`historia('Encounter: options', {
  preview: {
    encounterOptions: true
  }
})`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  ...historia('On a phone', {
    section: 'Overview'
  }, ['section']),
  globals: {
    viewport: {
      value: 'mobile2',
      isRotated: false
    }
  }
}`,...j.parameters?.docs?.source}}}})))()}N();export{T as Collapsed,O as CollapsedInfoCard,D as CollapsedStatus,E as CollapsedTooltip,C as Documents,A as EncounterOptions,x as Insurance,S as Ledger,y as Overview,k as PendingEncounter,j as Phone,v as Playground,w as Relationships,b as Treatments,M as __namedExportsOrder,g as default};