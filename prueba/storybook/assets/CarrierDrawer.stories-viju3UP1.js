import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,n as r,o as i,r as a,t as o}from"./play-Dr1R_I1D.js";import{n as s,t as c}from"./finanzasStore-Dsa0dULP.js";import{n as l,t as u}from"./CarrierDrawer-TQRwMEwm.js";import{i as d,n as f,r as p,t as m}from"./kit-drawer-BWB0Ospl.js";var h,g,_,v,y,b,x,S,C;function w(){return(w=e((()=>{l(),a(),d(),s(),h=t(),g={title:`Components/Finance/CarrierDrawer`,component:u,parameters:{layout:`fullscreen`,docs:{decisionsFrom:`components/finance/CarrierDrawer.tsx`,story:{inline:!1,iframeHeight:720},description:{component:[`**New Carrier** (*Settings → Billing → Carriers*). Los campos y textos son los de la página New Carrier de red.dev; acá es un drawer con dos pasos, General y Contact.`,``,`*Carrier Name* es un buscador sobre los payers conocidos: elegir uno completa el *Payer ID*. Un nombre que ya está en la lista no se puede repetir. Con (+1) el teléfono pide Area Code y Number. *Location Number* no está acá: se carga después, en Edit Carrier.`,``,`**Después:** el carrier entra en la lista y el toast ofrece *Add plan*.`,``,`**Probalo:** en *Playground* escribí "Hum" en Carrier Name y elegí Humana Dental; Next Step con campos vacíos los marca en rojo.`].join(`
`)}}},decorators:[e=>(0,h.jsx)(c,{children:(0,h.jsx)(e,{})})],args:{onClose:()=>{},onGuardar:()=>{}}},_={},v={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,h.jsx)(f,{pasos:[{nombre:`General`,secciones:`General Information: Carrier Name (buscador), Payer ID, Printed Claim Format, Expected Period of Insurance Claim Resolution (days), Do not include Dental Diagnostic Codes, Do not bill Insurance`,obligatorios:`Carrier Name, Payer ID, Printed Claim Format y Expected Period`},{nombre:`Contact`,secciones:`Contact Information: Email, Website, Country Code, Area Code (3 digits), Number (7 digits)`,obligatorios:`Email, Country Code, Area Code y Number`}],nota:`Placeholders de red.dev: Select carrier, 00000, Select a printed claim format, example@example.com, Introduce your website link, 555, 000-0000.`})},y={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,h.jsx)(m,{estados:[{estado:`Default`,cuando:`Abre en General, vacío.`,story:`Playground`},{estado:`Payer search`,cuando:`Al escribir en Carrier Name sugiere los payers; elegir uno completa el Payer ID.`,story:`Payer Search`},{estado:`Validation errors`,cuando:`Next Step o Save con obligatorios vacíos: “This field is required.” en cada uno.`,story:`With Validation Errors`},{estado:`Duplicate`,cuando:`Un carrier que ya está en la lista: “This carrier is already in your list.”.`},{estado:`Saved`,cuando:`Entra en la lista y el toast dice “{Carrier} was added. Add its insurance plans next.” con Add plan.`}]})},b={play:i(o(/select carrier/i,`Hum`),r(/humana dental - 73288/i))},x={play:i(n(/^next step$/i),r(/this field is required/i))},S={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,h.jsx)(p,{filas:[[`Size`,`md`],[`Opens from`,`New Carrier en la lista; también /settings/finance/carriers/new.`],[`Payer ID`,`Sólo dígitos; lo completa el buscador.`],[`Validation`,`lib/useFormPasos por paso + nombre único.`],[`Origen`,`red.dev: New Carrier es una página; acá drawer (regla de pop ups).`]]})},C=[`Playground`,`Parts`,`States`,`PayerSearch`,`WithValidationErrors`,`Specs`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
    secciones: 'General Information: Carrier Name (buscador), Payer ID, Printed Claim Format, Expected Period of Insurance Claim Resolution (days), Do not include Dental Diagnostic Codes, Do not bill Insurance',
    obligatorios: 'Carrier Name, Payer ID, Printed Claim Format y Expected Period'
  }, {
    nombre: 'Contact',
    secciones: 'Contact Information: Email, Website, Country Code, Area Code (3 digits), Number (7 digits)',
    obligatorios: 'Email, Country Code, Area Code y Number'
  }]} nota="Placeholders de red.dev: Select carrier, 00000, Select a printed claim format, example@example.com, Introduce your website link, 555, 000-0000." />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
    cuando: 'Abre en General, vacío.',
    story: 'Playground'
  }, {
    estado: 'Payer search',
    cuando: 'Al escribir en Carrier Name sugiere los payers; elegir uno completa el Payer ID.',
    story: 'Payer Search'
  }, {
    estado: 'Validation errors',
    cuando: 'Next Step o Save con obligatorios vacíos: “This field is required.” en cada uno.',
    story: 'With Validation Errors'
  }, {
    estado: 'Duplicate',
    cuando: 'Un carrier que ya está en la lista: “This carrier is already in your list.”.'
  }, {
    estado: 'Saved',
    cuando: 'Entra en la lista y el toast dice “{Carrier} was added. Add its insurance plans next.” con Add plan.'
  }]} />
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  play: secuencia(escribir(/select carrier/i, 'Hum'), esperar(/humana dental - 73288/i))
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^next step$/i), esperar(/this field is required/i))
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
  render: () => <SpecsDelDrawer filas={[['Size', 'md'], ['Opens from', 'New Carrier en la lista; también /settings/finance/carriers/new.'], ['Payer ID', 'Sólo dígitos; lo completa el buscador.'], ['Validation', 'lib/useFormPasos por paso + nombre único.'], ['Origen', 'red.dev: New Carrier es una página; acá drawer (regla de pop ups).']]} />
}`,...S.parameters?.docs?.source}}}})))()}w();export{v as Parts,b as PayerSearch,_ as Playground,S as Specs,y as States,x as WithValidationErrors,C as __namedExportsOrder,g as default};