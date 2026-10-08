import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,i as r,n as i,r as a}from"./play-C4HzH6w4.js";import{i as o,n as s,r as c,t as l}from"./kit-drawer-BWB0Ospl.js";import{n as u,t as d}from"./finanzasStore-Z8Xm9ugn.js";import{n as f,t as p}from"./CarrierDrawer-DHUP3FKL.js";var m,h,g,_,v,y,b,x;function S(){return(S=e((()=>{f(),a(),o(),u(),m=t(),h={title:`Components/Finance/CarrierDrawer`,component:p,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:720},description:{component:[`Alta de un carrier (*Settings → Billing → Carriers → New carrier*), con los pasos de New Location: General, Contact y Address.`,``,`**Después:** el toast ofrece *Add plans*, que abre el detalle del carrier con el drawer de New Plan. Editar un carrier es la pestaña *Information* de su detalle, no este drawer.`,``,`**Probalo:** en *Playground* completá cada paso; Next Step con campos vacíos los marca en rojo.`].join(`
`)}}},decorators:[e=>(0,m.jsx)(d,{children:(0,m.jsx)(e,{})})],args:{onClose:()=>{},onGuardar:()=>{}}},g={},_={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,m.jsx)(s,{pasos:[{nombre:`General`,secciones:`General Information: Carrier Name, Payer ID (con su ayuda), Claims Submission`,obligatorios:`Todos`},{nombre:`Contact`,secciones:`Contact Information: Phone, Fax, Email, Website`,obligatorios:`Phone`},{nombre:`Address`,secciones:`Claims Address: Line 1 y 2, City, State, ZIP`,obligatorios:`Todos menos Address Line 2`}]})},v={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,m.jsx)(l,{estados:[{estado:`Default`,cuando:`Abre en General con Claims Submission en Electronic.`,story:`Playground`},{estado:`Validation errors`,cuando:`Next Step o Save con obligatorios vacíos; un nombre que ya existe dice “This carrier already exists.”.`,story:`With Validation Errors`},{estado:`Saved`,cuando:`Entra en la lista y el toast ofrece Add plans.`}]})},y={play:n(r(/^next step$/i),i(/required/i))},b={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,m.jsx)(c,{filas:[[`Size`,`lg · 560px`],[`Opens from`,`New carrier en la lista; también /settings/finance/carriers/new.`],[`Payer ID`,`Se guarda en mayúsculas.`],[`Validation`,`lib/useFormPasos + nombre único.`]]})},x=[`Playground`,`Parts`,`States`,`WithValidationErrors`,`Specs`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
    secciones: 'General Information: Carrier Name, Payer ID (con su ayuda), Claims Submission',
    obligatorios: 'Todos'
  }, {
    nombre: 'Contact',
    secciones: 'Contact Information: Phone, Fax, Email, Website',
    obligatorios: 'Phone'
  }, {
    nombre: 'Address',
    secciones: 'Claims Address: Line 1 y 2, City, State, ZIP',
    obligatorios: 'Todos menos Address Line 2'
  }]} />
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
    cuando: 'Abre en General con Claims Submission en Electronic.',
    story: 'Playground'
  }, {
    estado: 'Validation errors',
    cuando: 'Next Step o Save con obligatorios vacíos; un nombre que ya existe dice “This carrier already exists.”.',
    story: 'With Validation Errors'
  }, {
    estado: 'Saved',
    cuando: 'Entra en la lista y el toast ofrece Add plans.'
  }]} />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^next step$/i), esperar(/required/i))
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
  render: () => <SpecsDelDrawer filas={[['Size', 'lg · 560px'], ['Opens from', 'New carrier en la lista; también /settings/finance/carriers/new.'], ['Payer ID', 'Se guarda en mayúsculas.'], ['Validation', 'lib/useFormPasos + nombre único.']]} />
}`,...b.parameters?.docs?.source}}}})))()}S();export{_ as Parts,g as Playground,b as Specs,v as States,y as WithValidationErrors,x as __namedExportsOrder,h as default};