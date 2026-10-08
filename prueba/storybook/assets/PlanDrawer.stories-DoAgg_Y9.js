import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,i as r,n as i,r as a}from"./play-C4HzH6w4.js";import{c as o,w as s}from"./finanzas-D49FH9Xj.js";import{i as c,n as l,r as u,t as d}from"./kit-drawer-BWB0Ospl.js";import{n as f,t as p}from"./finanzasStore-Z8Xm9ugn.js";import{n as m,t as h}from"./PlanDrawer-DEImsdDy.js";var g,_,v,y,b,x,S,C,w,T;function E(){return(E=e((()=>{m(),a(),c(),f(),s(),g=t(),_={title:`Components/Finance/PlanDrawer`,component:h,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:720},description:{component:[`Alta y edición de un plan de seguro: el plan de un carrier y los dos datos que lo hacen cobrable, su **fee schedule** (lo que cobra el consultorio) y su **coverage table** (lo que paga el plan).`,``,`**Pasos:** Plan (carrier, nombre, grupo, empleador, tipo; al editar también Status) y Billing (fee schedule con su tipo y cuántos precios tiene, coverage table con su resumen). Desde el detalle de un carrier el carrier viene fijo. Sólo se ofrece lo activo.`,``,`**Probalo:** en *Playground* completá Plan, y en Billing elegí una coverage table para ver su resumen. *Edit* abre Aetna Dental PPO.`].join(`
`)}}},decorators:[e=>(0,g.jsx)(p,{children:(0,g.jsx)(e,{})})],args:{onClose:()=>{},onGuardar:()=>{}},argTypes:{inicial:{control:!1},aseguradoraId:{control:`select`,options:[`aetna`,`cigna`,`metlife`],description:`Carrier fijo, como al abrirlo desde su detalle.`}}},v={},y={args:{aseguradoraId:`cigna`}},b={args:{inicial:o[0]}},x={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,g.jsx)(l,{pasos:[{nombre:`Plan`,secciones:`Plan Information: Carrier, Plan Name, Group Number, Employer, Plan Type (y Status al editar)`,obligatorios:`Carrier, Plan Name, Group Number, Plan Type`},{nombre:`Billing`,secciones:`Fee Schedule (con “tipo · N procedures priced”) y Coverage Table (con su CoverageSummary)`,obligatorios:`Los dos`}]})},S={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,g.jsx)(d,{estados:[{estado:`Default`,cuando:`Abre en Plan con todo vacío.`,story:`Playground`},{estado:`Carrier fixed (disabled)`,cuando:`Abierto desde el detalle de un carrier: el select de Carrier queda disabled con su nombre.`,story:`From Carrier`},{estado:`Editing`,cuando:`Edit Plan con los datos cargados y el select de Status.`,story:`Edit`},{estado:`Validation errors`,cuando:`Next Step o Save con obligatorios vacíos.`,story:`With Validation Errors`},{estado:`Saved`,cuando:`El plan aparece en la pestaña Plans del carrier y en las de su fee schedule y su coverage table.`}]})},C={play:n(r(/^next step$/i),i(/required/i))},w={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,g.jsx)(u,{filas:[[`Size`,`lg · 560px`],[`Opens from`,`New plan en el detalle del carrier y en el kebab de su fila; Edit plan en la tabla de planes.`],[`Options`,`Carriers, fee schedules y coverage tables activos; lo que el plan ya tenía se mantiene aunque esté inactivo.`],[`Group Number`,`Se guarda en mayúsculas.`]]})},T=[`Playground`,`FromCarrier`,`Edit`,`Parts`,`States`,`WithValidationErrors`,`Specs`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    aseguradoraId: 'cigna'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    inicial: PLANES[0]
  }
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
  render: () => <PasosDelDrawer pasos={[{
    nombre: 'Plan',
    secciones: 'Plan Information: Carrier, Plan Name, Group Number, Employer, Plan Type (y Status al editar)',
    obligatorios: 'Carrier, Plan Name, Group Number, Plan Type'
  }, {
    nombre: 'Billing',
    secciones: 'Fee Schedule (con “tipo · N procedures priced”) y Coverage Table (con su CoverageSummary)',
    obligatorios: 'Los dos'
  }]} />
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
  render: () => <EstadosDelDrawer estados={[{
    estado: 'Default',
    cuando: 'Abre en Plan con todo vacío.',
    story: 'Playground'
  }, {
    estado: 'Carrier fixed (disabled)',
    cuando: 'Abierto desde el detalle de un carrier: el select de Carrier queda disabled con su nombre.',
    story: 'From Carrier'
  }, {
    estado: 'Editing',
    cuando: 'Edit Plan con los datos cargados y el select de Status.',
    story: 'Edit'
  }, {
    estado: 'Validation errors',
    cuando: 'Next Step o Save con obligatorios vacíos.',
    story: 'With Validation Errors'
  }, {
    estado: 'Saved',
    cuando: 'El plan aparece en la pestaña Plans del carrier y en las de su fee schedule y su coverage table.'
  }]} />
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^next step$/i), esperar(/required/i))
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
  render: () => <SpecsDelDrawer filas={[['Size', 'lg · 560px'], ['Opens from', 'New plan en el detalle del carrier y en el kebab de su fila; Edit plan en la tabla de planes.'], ['Options', 'Carriers, fee schedules y coverage tables activos; lo que el plan ya tenía se mantiene aunque esté inactivo.'], ['Group Number', 'Se guarda en mayúsculas.']]} />
}`,...w.parameters?.docs?.source}}}})))()}E();export{b as Edit,y as FromCarrier,x as Parts,v as Playground,w as Specs,S as States,C as WithValidationErrors,T as __namedExportsOrder,_ as default};