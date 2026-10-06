import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,i as r,n as i,r as a}from"./play-CDw6varG.js";import{i as o,n as s,r as c,t as l}from"./kit-drawer-BB94JAuy.js";import{n as u,t as d}from"./NewEmployeeDrawer-C5ZX6Ygq.js";var f,p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{u(),a(),o(),f=t(),p={title:`Components/Settings/NewEmployeeDrawer`,component:d,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:720},description:{component:[`Alta de un empleado desde *Settings → Employees → New Employee*. Antes era una pantalla aparte; ahora es un drawer con los pasos de Confidentally 2.0.`,``,`**Link a person that already exists:** cambia los datos personales por un buscador de providers; Next Step queda deshabilitado hasta elegir a alguien.`,``,`**Probalo:** en *Playground* tildá la casilla de vincular o completá los datos y avanzá.`].join(`
`)}}},args:{onClose:()=>{},onGuardar:()=>{}}},m={},h={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,f.jsx)(s,{pasos:[{nombre:`General`,secciones:`General Information: casilla para vincular a alguien que ya existe; si no, First, Middle y Last name, Birthdate, Email`,obligatorios:`First name, Last name, Birthdate, Email · o una persona elegida`},{nombre:`Contact`,secciones:`Contact Information: Country Code, Area Code, Number, Extension`,obligatorios:`Todos menos Extension`},{nombre:`Address`,secciones:`Address Information: Line 1 y 2, Country, State, City, ZIP`,obligatorios:`Todos menos Address Line 2`}]})},g={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,f.jsx)(l,{estados:[{estado:`Default`,cuando:`Abre en General con los campos de la persona.`,story:`Playground`},{estado:`Validation errors`,cuando:`Next Step con obligatorios vacíos: se marcan en rojo sólo los del paso a la vista.`,story:`With Validation Errors`},{estado:`Next disabled`,cuando:`Con la casilla de vincular tildada y nadie elegido.`,story:`Link Existing`},{estado:`Saved`,cuando:`El empleado entra primero en la tabla, Active, y aparece el toast.`}]})},_={play:n(r(/^next step$/i),i(/required/i))},v={play:n(r(/link a person/i),i(/search providers/i))},y={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,f.jsx)(c,{filas:[[`Size`,`lg · 560px`],[`Opens from`,`New Employee en Settings → Employees; también /settings/team/new.`],[`Fields`,`De a dos por fila; Email a lo ancho.`],[`Shared piece`,`LinkExistingPerson, la misma de la ficha del empleado.`],[`Validation`,`lib/useFormPasos`]]})},b=[`Playground`,`Parts`,`States`,`WithValidationErrors`,`LinkExisting`,`Specs`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
    secciones: 'General Information: casilla para vincular a alguien que ya existe; si no, First, Middle y Last name, Birthdate, Email',
    obligatorios: 'First name, Last name, Birthdate, Email · o una persona elegida'
  }, {
    nombre: 'Contact',
    secciones: 'Contact Information: Country Code, Area Code, Number, Extension',
    obligatorios: 'Todos menos Extension'
  }, {
    nombre: 'Address',
    secciones: 'Address Information: Line 1 y 2, Country, State, City, ZIP',
    obligatorios: 'Todos menos Address Line 2'
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
    cuando: 'Abre en General con los campos de la persona.',
    story: 'Playground'
  }, {
    estado: 'Validation errors',
    cuando: 'Next Step con obligatorios vacíos: se marcan en rojo sólo los del paso a la vista.',
    story: 'With Validation Errors'
  }, {
    estado: 'Next disabled',
    cuando: 'Con la casilla de vincular tildada y nadie elegido.',
    story: 'Link Existing'
  }, {
    estado: 'Saved',
    cuando: 'El empleado entra primero en la tabla, Active, y aparece el toast.'
  }]} />
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/^next step$/i), esperar(/required/i))
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsar(/link a person/i), esperar(/search providers/i))
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
  render: () => <SpecsDelDrawer filas={[['Size', 'lg · 560px'], ['Opens from', 'New Employee en Settings → Employees; también /settings/team/new.'], ['Fields', 'De a dos por fila; Email a lo ancho.'], ['Shared piece', 'LinkExistingPerson, la misma de la ficha del empleado.'], ['Validation', 'lib/useFormPasos']]} />
}`,...y.parameters?.docs?.source}}}})))()}x();export{v as LinkExisting,h as Parts,m as Playground,y as Specs,g as States,_ as WithValidationErrors,b as __namedExportsOrder,p as default};