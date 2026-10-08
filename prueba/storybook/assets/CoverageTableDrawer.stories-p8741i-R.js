import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,i as r,n as i,r as a}from"./play-C4HzH6w4.js";import{a as o,w as s}from"./finanzas-D49FH9Xj.js";import{i as c,n as l,r as u,t as d}from"./kit-drawer-BWB0Ospl.js";import{n as f,t as p}from"./finanzasStore-Z8Xm9ugn.js";import{n as m,t as h}from"./CoverageTableDrawer-D0_t1vwb.js";var g,_,v,y,b,x,S,C,w;function T(){return(T=e((()=>{m(),a(),c(),f(),s(),g=t(),_={title:`Components/Finance/CoverageTableDrawer`,component:h,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:720},description:{component:[`Alta y edición de una coverage table: qué paga un plan por categoría, con su deducible y sus máximos.`,``,`**Nuevo:** General (nombre, de qué parte -una plantilla como *Standard 100/80/50* o “Copy of” una tabla- y el período de beneficio), Limits (máximos y deducibles) y Coverage (el porcentaje de cada clase, precargado por lo elegido). **Editar:** General y Limits; cada categoría se ajusta en la tabla del detalle.`,``,`**Probalo:** en *Playground* elegí *Standard 100/80/50* en Start From y seguí hasta Coverage. *Edit* abre PPO Standard.`].join(`
`)}}},decorators:[e=>(0,g.jsx)(p,{children:(0,g.jsx)(e,{})})],args:{onClose:()=>{},onGuardar:()=>{}},argTypes:{inicial:{control:!1}}},v={},y={args:{inicial:o[0]}},b={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,g.jsx)(l,{nota:`Al editar hay dos pasos (General y Limits) y no se elige Start From.`,pasos:[{nombre:`General`,secciones:`General Information: Name, Start From (plantillas y “Copy of …”), Benefit Period`,obligatorios:`Todos`},{nombre:`Limits`,secciones:`Maximums: Annual Maximum, Orthodontic Lifetime Maximum. Deductibles: Individual, Family`,obligatorios:`Annual Maximum, Individual Deductible`},{nombre:`Coverage`,secciones:`Coverage by Class: Preventive, Basic, Major, Orthodontics (%), cada uno con las categorías que abarca`,obligatorios:`Los cuatro`}]})},x={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,g.jsx)(d,{estados:[{estado:`Default`,cuando:`Abre en General con Benefit Period en Calendar year.`,story:`Playground`},{estado:`Prefilled`,cuando:`Elegir una plantilla carga los cuatro porcentajes; “Copy of” una tabla carga además sus límites y copia sus reglas tal cual si no se tocan.`},{estado:`Validation errors`,cuando:`Obligatorios vacíos, montos que no son números y porcentajes fuera de 0 a 100.`,story:`With Validation Errors`},{estado:`Editing`,cuando:`Edit Coverage Table con dos pasos.`,story:`Edit`}]})},S={play:n(r(/^next step$/i),i(/required/i))},C={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,g.jsx)(u,{filas:[[`Size`,`lg · 560px`],[`Opens from`,`New coverage table (lista y /settings/finance/coverage-table/new); Edit limits en la fila y en el detalle.`],[`Zero values`,`Annual Maximum 0 = sin máximo (“No limit”). Ortho 0 = ortodoncia no cubierta.`],[`Classes`,`Preventive: Diagnostic, Preventive. Basic: Restorative, Endodontic, Periodontal, Oral surgery, Adjunctive. Major: Prosthodontics, Maxillofacial, Implants. Orthodontics. Other (cosmética) arranca en 0.`]]})},w=[`Playground`,`Edit`,`Parts`,`States`,`WithValidationErrors`,`Specs`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    inicial: COBERTURAS[0]
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
  render: () => <PasosDelDrawer nota="Al editar hay dos pasos (General y Limits) y no se elige Start From." pasos={[{
    nombre: 'General',
    secciones: 'General Information: Name, Start From (plantillas y “Copy of …”), Benefit Period',
    obligatorios: 'Todos'
  }, {
    nombre: 'Limits',
    secciones: 'Maximums: Annual Maximum, Orthodontic Lifetime Maximum. Deductibles: Individual, Family',
    obligatorios: 'Annual Maximum, Individual Deductible'
  }, {
    nombre: 'Coverage',
    secciones: 'Coverage by Class: Preventive, Basic, Major, Orthodontics (%), cada uno con las categorías que abarca',
    obligatorios: 'Los cuatro'
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
    cuando: 'Abre en General con Benefit Period en Calendar year.',
    story: 'Playground'
  }, {
    estado: 'Prefilled',
    cuando: 'Elegir una plantilla carga los cuatro porcentajes; “Copy of” una tabla carga además sus límites y copia sus reglas tal cual si no se tocan.'
  }, {
    estado: 'Validation errors',
    cuando: 'Obligatorios vacíos, montos que no son números y porcentajes fuera de 0 a 100.',
    story: 'With Validation Errors'
  }, {
    estado: 'Editing',
    cuando: 'Edit Coverage Table con dos pasos.',
    story: 'Edit'
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
  render: () => <SpecsDelDrawer filas={[['Size', 'lg · 560px'], ['Opens from', 'New coverage table (lista y /settings/finance/coverage-table/new); Edit limits en la fila y en el detalle.'], ['Zero values', 'Annual Maximum 0 = sin máximo (“No limit”). Ortho 0 = ortodoncia no cubierta.'], ['Classes', 'Preventive: Diagnostic, Preventive. Basic: Restorative, Endodontic, Periodontal, Oral surgery, Adjunctive. Major: Prosthodontics, Maxillofacial, Implants. Orthodontics. Other (cosmética) arranca en 0.']]} />
}`,...C.parameters?.docs?.source}}}})))()}T();export{y as Edit,b as Parts,v as Playground,C as Specs,x as States,S as WithValidationErrors,w as __namedExportsOrder,_ as default};