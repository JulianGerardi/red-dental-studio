import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,i as r,n as i,r as a}from"./play-CDw6varG.js";import{n as o,t as s}from"./NewAccountDrawer-NKoAEbKF.js";import{i as c,n as l,r as u,t as d}from"./kit-drawer-BB94JAuy.js";var f,p,m,h,g,_,v,y;function b(){return(b=e((()=>{o(),a(),c(),f=t(),p={title:`Components/Settings/NewAccountDrawer`,component:s,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:760},description:{component:[`Alta de una cuenta (una clínica) desde *Settings → Accounts overview → New Account*. Los pasos siguen las pestañas de Edit Account.`,``,`**Draft:** la cuenta nueva queda en Draft hasta tener plan, como las de la lista sin suscripción. El dueño puede copiar el contacto y el domicilio de la cuenta.`,``,`**Probalo:** en *Playground* completá los pasos; destildá "Copy … from account" en Owner para cargar otros datos.`].join(`
`)}}},args:{onClose:()=>{},onGuardar:()=>{}}},m={},h={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,f.jsx)(l,{pasos:[{nombre:`Information`,secciones:`General Information: Name, Subdomain (muestra el dominio), Fee Schedule Name · Contact Information: teléfono, Email, Website`,obligatorios:`Name, Country Code, Area Code, Number`},{nombre:`Address`,secciones:`Address Information: Line 1 y 2, Country, State, City, ZIP, Time Zone`,obligatorios:`Todos menos Address Line 2`},{nombre:`Owner`,secciones:`Owner Information: nombre, Birthdate, Email · Contact y Address con "Copy … from account" (tildadas por defecto)`,obligatorios:`First Name, Last Name, Birthdate, Email · y lo que se destilde`}]})},g={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,f.jsx)(d,{estados:[{estado:`Default`,cuando:`Abre en Information.`,story:`Playground`},{estado:`Validation errors`,cuando:`Next Step con Name o el teléfono vacíos.`,story:`With Validation Errors`},{estado:`Owner with own data`,cuando:`Al destildar "Copy contact" o "Copy address" aparecen esos campos, también obligatorios.`},{estado:`Saved`,cuando:`La cuenta entra primera en la tabla, en Draft, con su dueño, y aparece el toast.`}]})},_={play:n(r(/^next step$/i),i(/required/i))},v={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,f.jsx)(u,{filas:[[`Size`,`lg · 560px`],[`Opens from`,`New Account en Settings → Accounts overview.`],[`Steps`,`Las pestañas de Edit Account (Information, Owner), con Address aparte para no alargar el primero.`],[`Saves as`,`Draft, sin plan ni licencias.`],[`Validation`,`lib/useFormPasos`]]})},y=[`Playground`,`Parts`,`States`,`WithValidationErrors`,`Specs`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
    nombre: 'Information',
    secciones: 'General Information: Name, Subdomain (muestra el dominio), Fee Schedule Name · Contact Information: teléfono, Email, Website',
    obligatorios: 'Name, Country Code, Area Code, Number'
  }, {
    nombre: 'Address',
    secciones: 'Address Information: Line 1 y 2, Country, State, City, ZIP, Time Zone',
    obligatorios: 'Todos menos Address Line 2'
  }, {
    nombre: 'Owner',
    secciones: 'Owner Information: nombre, Birthdate, Email · Contact y Address con "Copy … from account" (tildadas por defecto)',
    obligatorios: 'First Name, Last Name, Birthdate, Email · y lo que se destilde'
  }]} />
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
    cuando: 'Abre en Information.',
    story: 'Playground'
  }, {
    estado: 'Validation errors',
    cuando: 'Next Step con Name o el teléfono vacíos.',
    story: 'With Validation Errors'
  }, {
    estado: 'Owner with own data',
    cuando: 'Al destildar "Copy contact" o "Copy address" aparecen esos campos, también obligatorios.'
  }, {
    estado: 'Saved',
    cuando: 'La cuenta entra primera en la tabla, en Draft, con su dueño, y aparece el toast.'
  }]} />
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^next step$/i), esperar(/required/i))
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
  render: () => <SpecsDelDrawer filas={[['Size', 'lg · 560px'], ['Opens from', 'New Account en Settings → Accounts overview.'], ['Steps', 'Las pestañas de Edit Account (Information, Owner), con Address aparte para no alargar el primero.'], ['Saves as', 'Draft, sin plan ni licencias.'], ['Validation', 'lib/useFormPasos']]} />
}`,...v.parameters?.docs?.source}}}})))()}b();export{h as Parts,m as Playground,v as Specs,g as States,_ as WithValidationErrors,y as __namedExportsOrder,p as default};