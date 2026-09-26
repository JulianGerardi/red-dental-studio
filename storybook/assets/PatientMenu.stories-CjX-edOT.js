import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,i,o as a,r as o}from"./PatientSidePanel-lfv3ZAh_.js";import{O as s,P as c,_ as l,y as u}from"./iframe-BVKuPa81.js";import{n as d,t as f}from"./HelpProvider-CrnDAzu4.js";import{n as p,r as m}from"./decorators-Dn42hqYV.js";function h({collapsed:e,encounter:t}){return(0,v.useEffect)(()=>{a(e),r(t)},[e,t]),null}function g({children:e}){return(0,y.jsx)(s,{initialEntries:[`/patients/patient-0001`],children:(0,y.jsx)(f,{children:(0,y.jsx)(l,{children:e})})})}function _({collapsed:e,section:t,encounter:n,name:r,initials:i,tooltip:a,infoCard:s,encounterOptions:c}){return(0,y.jsxs)(g,{children:[(0,y.jsxs)(`div`,{className:`flex min-h-svh flex-col gap-5 bg-page-background p-6 lg:flex-row lg:items-start`,children:[(0,y.jsx)(o,{name:r,initials:i,section:t,basePath:`/patients/patient-0001`,tooltipAbierto:a,infoAbierta:s,opcionesEncuentroAbiertas:c}),(0,y.jsxs)(`div`,{className:`min-h-[240px] flex-1 rounded-lg border border-line-row bg-white p-5 text-[13px] text-ink-medium`,children:[(0,y.jsx)(`p`,{className:`text-[14px] font-semibold text-ink`,children:t}),(0,y.jsx)(`p`,{className:`mt-1`,children:`The patient’s screen. It uses the width the menu frees when it collapses.`})]})]}),(0,y.jsx)(h,{collapsed:e,encounter:n})]})}var v,y,b,x,S,C,w,T,E,D,O,k,A,j;function M(){return(M=e((()=>{v=t(),c(),i(),u(),d(),m(),y=n(),b={title:`Elements/Patient menu`,parameters:{layout:`fullscreen`,router:!1,docs:{story:{inline:!1,iframeHeight:780},description:{component:["El panel de la izquierda en todas las pantallas de un paciente (`@/components/patients/PatientSidePanel`).",``,`**Expandido (218px), de arriba hacia abajo:** botón para colapsar · foto (se cambia con clic), nombre, estado y edad · botón de encuentro (*Start Encounter* verde o *Pending Encounter* ámbar; el chevron cambia entre los dos) · *Clinical Mode* · las secciones del paciente, con la actual en azul · *General* y *Contact*, cada uno con su lápiz para editar.`,``,`**Colapsado (60px):** sólo íconos, cada uno con su nombre en un tooltip. El estado del paciente pasa a un punto verde sobre la foto (tooltip: nombre, estado y edad). *Clinical Mode* queda como ícono. *General* y *Contact* se leen en una tarjeta que abre el ícono de ficha al pasar el mouse. El botón de encuentro no está: se usa expandido.`,``,`**Recuerda el estado:** colapsado o expandido, y el estado del encuentro, se mantienen al pasar de una sección del paciente a otra.`,``,`**En pantallas angostas (menos de 1024px)** no se colapsa: las secciones pasan a una tira horizontal que se desliza, y General y Contact van en dos columnas.`,``,`**Probalo:** en *Playground* cambiá colapsado, sección, encuentro y paciente desde *Controls*.`].join(`
`)}}},args:{collapsed:!1,section:`Overview`,encounter:`start`,name:`Sarah Stone`,initials:`SS`},argTypes:{collapsed:{control:`boolean`,description:`Expandido (218px) o colapsado (60px). En la app se cambia con el botón de arriba del panel.`},section:{control:`select`,options:[`Overview`,`Treatments`,`Insurance`,`Ledger`,`Documents`,`Relationships & Billing`],description:`Sección actual: queda en azul.`},encounter:{control:`inline-radio`,options:[`start`,`pending`],description:`Start Encounter (verde) o Pending Encounter (ámbar).`},name:{control:`text`},initials:{control:`text`,description:`Iniciales cuando no hay foto.`},tooltip:{table:{disable:!0}},infoCard:{table:{disable:!0}},encounterOptions:{table:{disable:!0}}},decorators:[p],loaders:[async({args:e})=>(a(!!e.collapsed),r(e.encounter??`start`),{})]},x={render:e=>(0,y.jsx)(_,{...e})},S={parameters:{controls:{disable:!0}},render:e=>(0,y.jsx)(_,{...e})},C={args:{collapsed:!0},parameters:{controls:{include:[`section`]}},render:e=>(0,y.jsx)(_,{...e})},w={name:`Collapsed: tooltip on hover`,args:{collapsed:!0,section:`Overview`,tooltip:`Ledger`},parameters:{controls:{disable:!0}},render:e=>(0,y.jsx)(_,{...e})},T={name:`Collapsed: patient status`,args:{collapsed:!0,tooltip:`Sarah Stone · Active · 50 years`},parameters:{controls:{disable:!0}},render:e=>(0,y.jsx)(_,{...e})},E={name:`Collapsed: patient information`,args:{collapsed:!0,infoCard:!0},parameters:{controls:{disable:!0}},render:e=>(0,y.jsx)(_,{...e})},D={name:`Active section`,args:{section:`Ledger`},parameters:{controls:{include:[`section`,`collapsed`]}},render:e=>(0,y.jsx)(_,{...e})},O={name:`Encounter: pending`,args:{encounter:`pending`},parameters:{controls:{disable:!0}},render:e=>(0,y.jsx)(_,{...e})},k={name:`Encounter: options`,args:{encounterOptions:!0},parameters:{controls:{disable:!0}},render:e=>(0,y.jsx)(_,{...e})},A={name:`On a phone`,globals:{viewport:{value:`mobile2`,isRotated:!1}},parameters:{controls:{include:[`section`]}},render:e=>(0,y.jsx)(_,{...e})},j=[`Playground`,`Expanded`,`Collapsed`,`CollapsedTooltip`,`CollapsedStatus`,`CollapsedInfoCard`,`ActiveSection`,`PendingEncounter`,`EncounterOptions`,`Phone`],x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: args => <Pantalla {...args} />
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: args => <Pantalla {...args} />
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    collapsed: true
  },
  parameters: {
    controls: {
      include: ['section']
    }
  },
  render: args => <Pantalla {...args} />
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Collapsed: tooltip on hover',
  args: {
    collapsed: true,
    section: 'Overview',
    tooltip: 'Ledger'
  },
  parameters: {
    controls: {
      disable: true
    }
  },
  render: args => <Pantalla {...args} />
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Collapsed: patient status',
  args: {
    collapsed: true,
    tooltip: 'Sarah Stone · Active · 50 years'
  },
  parameters: {
    controls: {
      disable: true
    }
  },
  render: args => <Pantalla {...args} />
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Collapsed: patient information',
  args: {
    collapsed: true,
    infoCard: true
  },
  parameters: {
    controls: {
      disable: true
    }
  },
  render: args => <Pantalla {...args} />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'Active section',
  args: {
    section: 'Ledger'
  },
  parameters: {
    controls: {
      include: ['section', 'collapsed']
    }
  },
  render: args => <Pantalla {...args} />
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Encounter: pending',
  args: {
    encounter: 'pending'
  },
  parameters: {
    controls: {
      disable: true
    }
  },
  render: args => <Pantalla {...args} />
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Encounter: options',
  args: {
    encounterOptions: true
  },
  parameters: {
    controls: {
      disable: true
    }
  },
  render: args => <Pantalla {...args} />
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: 'On a phone',
  globals: {
    viewport: {
      value: 'mobile2',
      isRotated: false
    }
  },
  parameters: {
    controls: {
      include: ['section']
    }
  },
  render: args => <Pantalla {...args} />
}`,...A.parameters?.docs?.source}}}})))()}M();export{D as ActiveSection,C as Collapsed,E as CollapsedInfoCard,T as CollapsedStatus,w as CollapsedTooltip,k as EncounterOptions,S as Expanded,O as PendingEncounter,A as Phone,x as Playground,j as __namedExportsOrder,b as default};