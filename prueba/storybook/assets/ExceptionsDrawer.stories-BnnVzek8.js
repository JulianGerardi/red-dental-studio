import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,n as r,o as i,r as a,t as o}from"./play-Dr1R_I1D.js";import{c as s,d as c,i as l,t as u}from"./kit-4bQS7S9u.js";import{R as d,a as f}from"./finanzas-Cd24vV6l.js";import{i as p,n as m,r as h,t as g}from"./kit-drawer-BWB0Ospl.js";import{n as _,r as v,t as y}from"./ExceptionsDrawer-BBEByCKr.js";var b,x,S,C,w,T,E,D,O,k,A;function j(){return(j=e((()=>{_(),a(),p(),c(),d(),b=t(),x={title:`Components/Finance/ExceptionsDrawer`,component:y,parameters:{layout:`fullscreen`,docs:{decisionsFrom:`components/finance/ExceptionsDrawer.tsx`,story:{inline:!1,iframeHeight:720},description:{component:[`**Manage Exceptions** de una plantilla de *Coverage Table*. red.dev repite *Manage exceptions for standard with exceptions* en el título y la bajada; acá el título es *Manage Exceptions* (como el botón) y la bajada nombra la plantilla y dice para qué sirven.`,``,`Primero la lista: buscador con Search a la izquierda, *Add new exception* a la derecha y la tabla (*Code, Exception* · *Description* · *Reason* · *Actions*) con el patrón de tablas. *Add new exception* abre en el mismo drawer el asistente de cuatro pasos de red.dev; Cancel vuelve a la lista. Cada excepción se guarda al terminar, sin esperar al Save de la tabla.`,``,`**Probalo:** en *Playground* tocá *Add new exception* y armá una de tipo Frequency.`].join(`
`)}}},args:{excepciones:f[0].excepciones,tabla:f[0].nombre,onClose:()=>{},onGuardar:()=>{}},argTypes:{excepciones:{control:!1},tabla:{control:`text`,description:`El nombre de la plantilla, para la bajada.`},agregando:{control:`boolean`,description:`Abre directamente el asistente.`}}},S={},C={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,b.jsx)(m,{nota:`La lista es la vista inicial; el asistente reemplaza su contenido y su pie (Cancel · Back · Next Step · Save).`,pasos:[{nombre:`Exceptions Type`,secciones:`Age limitation · Downgrade · Frequency · Not covered (sin título de sección: lo dice el paso)`,obligatorios:`Exception Type`},{nombre:`Select Procedure`,secciones:`Add Procedures (n): buscador “Search for CDT Code o Description” y los elegidos como chips`,obligatorios:`Al menos uno (“Please add a procedure to the exception”)`},{nombre:`Specify Options`,secciones:`Age limitation: Minimum/Maximum age y Coverage % o Downgrade to + Deductible Type · Downgrade: Downgrade to · Frequency: How many times, Over the course of · Not covered: sin opciones`,obligatorios:`Los del tipo`},{nombre:`Reason For Exception`,secciones:`Reason for exception, con la ayuda “Select the reason for the exception.”`,obligatorios:`Reason`}]})},w={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,b.jsx)(g,{estados:[{estado:`List`,cuando:`Las excepciones de la plantilla.`,story:`Playground`},{estado:`Empty`,cuando:`Sin excepciones: “No exceptions found in the system.”.`,story:`Empty`},{estado:`Wizard`,cuando:`Add new exception: el asistente en el paso 1.`,story:`Wizard`},{estado:`Validation error`,cuando:`Next Step en Select Procedure sin códigos.`,story:`Without Procedure`},{estado:`Not covered options`,cuando:`Specify Options de Not covered: “There are no type specific options for Not covered type.”.`}]})},T={args:{excepciones:[]}},E={args:{agregando:!0}},D={args:{agregando:!0},play:i(n(/^next step$/i),n(/^next step$/i),r(/please add a procedure/i))},O={args:{agregando:!0},play:i(n(/^next step$/i),o(/search for cdt code/i,`D27`),r(/D2740 - /))},k={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,b.jsxs)(l,{children:[(0,b.jsx)(h,{filas:[[`Size`,`lg`],[`Guarda`,`onGuardar(lista, “added” | “removed”); quitar tiene Undo en el toast de la pantalla.`],[`Description`,`resumenExcepcion(): el efecto en una línea.`]]}),(0,b.jsx)(u,{titulo:`Description por tipo`,children:(0,b.jsx)(s,{encabezado:[`Type`,`Description`],children:f[0].excepciones.map(e=>(0,b.jsxs)(`tr`,{children:[(0,b.jsx)(`td`,{className:`font-semibold`,children:e.tipo}),(0,b.jsx)(`td`,{children:v(e)})]},e.id))})})]})},A=[`Playground`,`Parts`,`States`,`Empty`,`Wizard`,`WithoutProcedure`,`SearchProcedure`,`Specs`],S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
  render: () => <PasosDelDrawer nota="La lista es la vista inicial; el asistente reemplaza su contenido y su pie (Cancel · Back · Next Step · Save)." pasos={[{
    nombre: 'Exceptions Type',
    secciones: 'Age limitation · Downgrade · Frequency · Not covered (sin título de sección: lo dice el paso)',
    obligatorios: 'Exception Type'
  }, {
    nombre: 'Select Procedure',
    secciones: 'Add Procedures (n): buscador “Search for CDT Code o Description” y los elegidos como chips',
    obligatorios: 'Al menos uno (“Please add a procedure to the exception”)'
  }, {
    nombre: 'Specify Options',
    secciones: 'Age limitation: Minimum/Maximum age y Coverage % o Downgrade to + Deductible Type · Downgrade: Downgrade to · Frequency: How many times, Over the course of · Not covered: sin opciones',
    obligatorios: 'Los del tipo'
  }, {
    nombre: 'Reason For Exception',
    secciones: 'Reason for exception, con la ayuda “Select the reason for the exception.”',
    obligatorios: 'Reason'
  }]} />
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
  render: () => <EstadosDelDrawer estados={[{
    estado: 'List',
    cuando: 'Las excepciones de la plantilla.',
    story: 'Playground'
  }, {
    estado: 'Empty',
    cuando: 'Sin excepciones: “No exceptions found in the system.”.',
    story: 'Empty'
  }, {
    estado: 'Wizard',
    cuando: 'Add new exception: el asistente en el paso 1.',
    story: 'Wizard'
  }, {
    estado: 'Validation error',
    cuando: 'Next Step en Select Procedure sin códigos.',
    story: 'Without Procedure'
  }, {
    estado: 'Not covered options',
    cuando: 'Specify Options de Not covered: “There are no type specific options for Not covered type.”.'
  }]} />
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    excepciones: []
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    agregando: true
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    agregando: true
  },
  play: secuencia(pulsar(/^next step$/i), pulsar(/^next step$/i), esperar(/please add a procedure/i))
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    agregando: true
  },
  play: secuencia(pulsar(/^next step$/i), escribir(/search for cdt code/i, 'D27'), esperar(/D2740 - /))
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
  render: () => <Lienzo>
      <SpecsDelDrawer filas={[['Size', 'lg'], ['Guarda', 'onGuardar(lista, “added” | “removed”); quitar tiene Undo en el toast de la pantalla.'], ['Description', 'resumenExcepcion(): el efecto en una línea.']]} />
      <Bloque titulo="Description por tipo">
        <Tabla encabezado={['Type', 'Description']}>
          {COBERTURAS[0].excepciones.map(e => <tr key={e.id}><td className="font-semibold">{e.tipo}</td><td>{resumenExcepcion(e)}</td></tr>)}
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...k.parameters?.docs?.source}}}})))()}j();export{T as Empty,C as Parts,S as Playground,O as SearchProcedure,k as Specs,w as States,D as WithoutProcedure,E as Wizard,A as __namedExportsOrder,x as default};