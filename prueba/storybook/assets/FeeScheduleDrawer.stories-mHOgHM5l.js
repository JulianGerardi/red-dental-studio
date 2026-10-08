import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,i as r,n as i,r as a}from"./play-C4HzH6w4.js";import{t as o,w as s}from"./finanzas-D49FH9Xj.js";import{i as c,n as l,r as u,t as d}from"./kit-drawer-BWB0Ospl.js";import{n as f,t as p}from"./finanzasStore-Z8Xm9ugn.js";import{n as m,t as h}from"./FeeScheduleDrawer-DOl_6bPg.js";var g,_,v,y,b,x,S,C,w;function T(){return(T=e((()=>{m(),a(),c(),f(),s(),g=t(),_={title:`Components/Finance/FeeScheduleDrawer`,component:h,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:720},description:{component:[`Alta y edición de un fee schedule (*Settings → Billing → Fee Schedules*), con los pasos de los drawers de 2.0.`,``,`**Nuevo:** General (nombre, tipo, fecha de vigencia, descripción y si es el default) y Fees (de qué fee schedule copia los precios y con qué ajuste, con la vista previa de cuatro códigos). **Editar:** sólo General; los precios se tocan en la tabla o con *Adjust fees*.`,``,`**Probalo:** en *Playground* completá General y en Fees elegí *UCR - Red* con -10. *Edit* abre el de PPO Premium Plan.`].join(`
`)}}},decorators:[e=>(0,g.jsx)(p,{children:(0,g.jsx)(e,{})})],args:{onClose:()=>{},onGuardar:()=>{}},argTypes:{inicial:{control:!1}}},v={},y={args:{inicial:o[1]}},b={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,g.jsx)(l,{nota:`Al editar hay un solo paso (General) y el pie es Cancel / Save.`,pasos:[{nombre:`General`,secciones:`General Information: Name, Type (con su ayuda), Effective Date, Description y la casilla de default`,obligatorios:`Name, Type, Effective Date`},{nombre:`Fees`,secciones:`Fees: Start From y Adjustment (%); Preview con cuatro códigos antes → después`,obligatorios:`Start From`}]})},x={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,g.jsx)(d,{estados:[{estado:`Default`,cuando:`Abre en General, sin errores.`,story:`Playground`},{estado:`Validation errors`,cuando:`Next Step con obligatorios vacíos: borde rojo y “This field is required.”. También: nombre repetido, fecha inválida y ajuste fuera de -90 a 200.`,story:`With Validation Errors`},{estado:`Adjustment disabled`,cuando:`Adjustment (%) queda disabled hasta elegir de qué fee schedule se copia; con “Empty schedule” no hay ajuste ni preview.`},{estado:`Default checkbox disabled`,cuando:`Al editar el default, la casilla queda tildada y disabled: para cambiarlo se elige otro como default.`,story:`Edit (con UCR - Red)`},{estado:`Saved`,cuando:`Entra primero en la lista con el toast “… was created.” y su acción Open.`}]})},S={play:n(r(/^next step$/i),i(/required/i))},C={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,g.jsx)(u,{filas:[[`Size`,`lg · 560px`],[`Opens from`,`New fee schedule (lista y /settings/finance/fee-schedule/new); Edit details en la fila y en el detalle.`],[`Fees copied`,`Cada precio del fee schedule de base × (1 + ajuste), redondeado al dólar.`],[`Validation`,`lib/useFormPasos + nombre único, fecha DD / MM / YY válida y ajuste de -90 a 200.`]]})},w=[`Playground`,`Edit`,`Parts`,`States`,`WithValidationErrors`,`Specs`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    inicial: ARANCELES[1]
  }
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
  render: () => <PasosDelDrawer nota="Al editar hay un solo paso (General) y el pie es Cancel / Save." pasos={[{
    nombre: 'General',
    secciones: 'General Information: Name, Type (con su ayuda), Effective Date, Description y la casilla de default',
    obligatorios: 'Name, Type, Effective Date'
  }, {
    nombre: 'Fees',
    secciones: 'Fees: Start From y Adjustment (%); Preview con cuatro códigos antes → después',
    obligatorios: 'Start From'
  }]} />
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
    cuando: 'Abre en General, sin errores.',
    story: 'Playground'
  }, {
    estado: 'Validation errors',
    cuando: 'Next Step con obligatorios vacíos: borde rojo y “This field is required.”. También: nombre repetido, fecha inválida y ajuste fuera de -90 a 200.',
    story: 'With Validation Errors'
  }, {
    estado: 'Adjustment disabled',
    cuando: 'Adjustment (%) queda disabled hasta elegir de qué fee schedule se copia; con “Empty schedule” no hay ajuste ni preview.'
  }, {
    estado: 'Default checkbox disabled',
    cuando: 'Al editar el default, la casilla queda tildada y disabled: para cambiarlo se elige otro como default.',
    story: 'Edit (con UCR - Red)'
  }, {
    estado: 'Saved',
    cuando: 'Entra primero en la lista con el toast “… was created.” y su acción Open.'
  }]} />
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^next step$/i), esperar(/required/i))
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
  render: () => <SpecsDelDrawer filas={[['Size', 'lg · 560px'], ['Opens from', 'New fee schedule (lista y /settings/finance/fee-schedule/new); Edit details en la fila y en el detalle.'], ['Fees copied', 'Cada precio del fee schedule de base × (1 + ajuste), redondeado al dólar.'], ['Validation', 'lib/useFormPasos + nombre único, fecha DD / MM / YY válida y ajuste de -90 a 200.']]} />
}`,...C.parameters?.docs?.source}}}})))()}T();export{y as Edit,b as Parts,v as Playground,C as Specs,x as States,S as WithValidationErrors,w as __namedExportsOrder,_ as default};