import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,n as r,o as i,r as a,t as o}from"./play-Dr1R_I1D.js";import{i as s,r as c,t as l}from"./kit-drawer-BWB0Ospl.js";import{a as u,i as d,o as f,t as p}from"./Accounts-DBnHwyz9.js";var m,h,g,_,v,y,b,x,S,C,w,T;function E(){return(E=e((()=>{f(),d(),a(),s(),m=t(),h=p.find(e=>e.id===`c11`),g=p.find(e=>e.id===`c2`),_=Object.fromEntries(p.map(e=>[e.nombre,e])),v={title:`Components/Settings/ManageLicensesDrawer`,component:u,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:620},description:{component:[`Cuántas licencias tiene una cuenta, desde el menú de una fila de *Accounts overview → Manage licenses*. Un solo paso.`,``,`**Reglas:** no se puede bajar el total por debajo de las licencias en uso (empleados activos y suspendidos); sin plan no hay licencias que ajustar, avisa y Save queda deshabilitado.`,``,`**Probalo:** en *Playground* elegí otra cuenta desde *Controls*.`].join(`
`)}}},args:{cuenta:h,onClose:()=>{},onGuardar:()=>{}},argTypes:{cuenta:{control:`select`,options:Object.keys(_),mapping:_,description:`La cuenta de la fila.`}}},y={},b={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,m.jsx)(c,{titulo:`Parts`,filas:[[`Subscription`,`Plan, Subscription, Expires on e In use, de a dos (sólo lectura).`],[`Licenses`,`Total licenses; debajo, cuántas quedan libres después de las que están en uso.`],[`Footer`,`Cancel · Save`]]})},x={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,m.jsx)(l,{estados:[{estado:`Default`,cuando:`Cuenta con plan: el total actual y las libres.`,story:`Playground`},{estado:`Validation errors`,cuando:`Vacío, no entero o menos que las que están en uso.`,story:`With Validation Errors`},{estado:`Save disabled`,cuando:`Cuenta en Draft, sin plan: aviso "This account has no plan yet".`,story:`No Plan`}]})},S={play:i(o(/^0$/,`2`),n(/^save$/i),r(/at least/i))},C={args:{cuenta:g}},w={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,m.jsx)(c,{filas:[[`Size`,`md · 480px`],[`Opens from`,`Manage licenses, en el menú de cada fila de Accounts overview.`],[`Saves`,`El total en la columna Licenses y el toast "… now has N licenses."`]]})},T=[`Playground`,`Parts`,`States`,`WithValidationErrors`,`NoPlan`,`Specs`],y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
  render: () => <SpecsDelDrawer titulo="Parts" filas={[['Subscription', 'Plan, Subscription, Expires on e In use, de a dos (sólo lectura).'], ['Licenses', 'Total licenses; debajo, cuántas quedan libres después de las que están en uso.'], ['Footer', 'Cancel · Save']]} />
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
    cuando: 'Cuenta con plan: el total actual y las libres.',
    story: 'Playground'
  }, {
    estado: 'Validation errors',
    cuando: 'Vacío, no entero o menos que las que están en uso.',
    story: 'With Validation Errors'
  }, {
    estado: 'Save disabled',
    cuando: 'Cuenta en Draft, sin plan: aviso "This account has no plan yet".',
    story: 'No Plan'
  }]} />
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  play: secuencia(escribir(/^0$/, '2'), pulsar(/^save$/i), esperar(/at least/i))
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    cuenta: SIN_PLAN
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
  render: () => <SpecsDelDrawer filas={[['Size', 'md · 480px'], ['Opens from', 'Manage licenses, en el menú de cada fila de Accounts overview.'], ['Saves', 'El total en la columna Licenses y el toast "… now has N licenses."']]} />
}`,...w.parameters?.docs?.source}}}})))()}E();export{C as NoPlan,b as Parts,y as Playground,w as Specs,x as States,S as WithValidationErrors,T as __namedExportsOrder,v as default};