import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,i as r,n as i,r as a}from"./play-C4HzH6w4.js";import{i as o,n as s,r as c,t as l}from"./kit-drawer-BWB0Ospl.js";import{n as u,t as d}from"./NewLocationDrawer-CI_AD3IP.js";var f,p,m,h,g,_,v,y;function b(){return(b=e((()=>{u(),a(),o(),f=t(),p={title:`Components/Settings/NewLocationDrawer`,component:d,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:720},description:{component:[`Alta de una locación desde *Settings → Locations → New location*. Antes era una pantalla aparte; ahora es un drawer con los pasos de Confidentally 2.0 y los mismos campos y catálogos.`,``,`**Pasos:** General, Contact y Address. Next Step sólo avanza con lo obligatorio del paso completo. Al guardar, la locación aparece primera en la tabla con su toast.`,``,`**Probalo:** en *Playground* completá cada paso; Next Step con campos vacíos los marca en rojo.`].join(`
`)}}},args:{onClose:()=>{},onGuardar:()=>{}}},m={},h={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,f.jsx)(s,{pasos:[{nombre:`General`,secciones:`General Information: Name, Abbreviation, Default Fee Schedule`,obligatorios:`Name, Default Fee Schedule`},{nombre:`Contact`,secciones:`Contact Information: Country Code, Area Code, Number, Email`,obligatorios:`Todos`},{nombre:`Address`,secciones:`Address Information: Line 1 y 2, Country, State, City, ZIP, Time Zone`,obligatorios:`Todos menos Address Line 2`}]})},g={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,f.jsx)(l,{estados:[{estado:`Default`,cuando:`Abre en General, sin errores.`,story:`Playground`},{estado:`Validation errors`,cuando:`Next Step o Save con obligatorios vacíos: borde rojo y "This field is required." sólo en el paso a la vista.`,story:`With Validation Errors`},{estado:`Saved`,cuando:`La locación entra primera en la tabla y aparece el toast "… was added to your locations."`}]})},_={play:n(r(/^next step$/i),i(/required/i))},v={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,f.jsx)(c,{filas:[[`Size`,`lg · 560px`],[`Opens from`,`New location en Settings → Locations; también /settings/locations/new, que abre la lista con el drawer abierto.`],[`Fields`,`De a dos por fila; Name y Time Zone a lo ancho.`],[`Validation`,`lib/useFormPasos`]]})},y=[`Playground`,`Parts`,`States`,`WithValidationErrors`,`Specs`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
    secciones: 'General Information: Name, Abbreviation, Default Fee Schedule',
    obligatorios: 'Name, Default Fee Schedule'
  }, {
    nombre: 'Contact',
    secciones: 'Contact Information: Country Code, Area Code, Number, Email',
    obligatorios: 'Todos'
  }, {
    nombre: 'Address',
    secciones: 'Address Information: Line 1 y 2, Country, State, City, ZIP, Time Zone',
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
    cuando: 'Abre en General, sin errores.',
    story: 'Playground'
  }, {
    estado: 'Validation errors',
    cuando: 'Next Step o Save con obligatorios vacíos: borde rojo y "This field is required." sólo en el paso a la vista.',
    story: 'With Validation Errors'
  }, {
    estado: 'Saved',
    cuando: 'La locación entra primera en la tabla y aparece el toast "… was added to your locations."'
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
  render: () => <SpecsDelDrawer filas={[['Size', 'lg · 560px'], ['Opens from', 'New location en Settings → Locations; también /settings/locations/new, que abre la lista con el drawer abierto.'], ['Fields', 'De a dos por fila; Name y Time Zone a lo ancho.'], ['Validation', 'lib/useFormPasos']]} />
}`,...v.parameters?.docs?.source}}}})))()}b();export{h as Parts,m as Playground,v as Specs,g as States,_ as WithValidationErrors,y as __namedExportsOrder,p as default};