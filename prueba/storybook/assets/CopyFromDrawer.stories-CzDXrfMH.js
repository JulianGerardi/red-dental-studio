import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{f as n,i as r,t as i,u as a}from"./kit-Di92TvVK.js";import{i as o,r as s,t as c}from"./kit-drawer-CIzMwpmc.js";import{a as l,n as u,o as d,r as f,t as p}from"./play-Dr1R_I1D.js";import{n as m,t as h}from"./finanzasStore-BG1w7wY1.js";import{n as g,t as _}from"./CopyFromDrawer-Ds3U6oBT.js";var v,y,b,x,S,C,w,T,E,D;function O(){return(O=e((()=>{g(),f(),o(),n(),m(),v=t(),y={title:`Components/Finance/CopyFromDrawer`,component:_,parameters:{layout:`fullscreen`,docs:{decisionsFrom:`components/finance/CopyFromDrawer.tsx`,story:{inline:!1,iframeHeight:680},description:{component:[`**Copy from**, en la pestaña *Coverage Table* de un insurance plan. Trae los rangos de una plantilla (*Copy from template*, las de Settings → Coverage Table) o de otro plan (*Copy from insurance*). Título, bajada y buscador tal cual red.dev.`,``,`Reemplaza el Type y todos los rangos del plan; nada se guarda hasta el *Save* de la pestaña.`,``,`**Probalo:** en *Playground* cambiá de pestaña, buscá por nombre y elegí una.`].join(`
`)}}},decorators:[e=>(0,v.jsx)(h,{children:(0,v.jsx)(e,{})})],args:{planId:`acme-ppo`,onClose:()=>{},onCopiar:()=>{}}},b={},x={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,v.jsx)(r,{children:(0,v.jsx)(i,{titulo:`Parts`,children:(0,v.jsx)(a,{partes:[[`Pestañas`,`Copy from template | Copy from insurance.`,`Tabs fullWidth`],[`Buscador`,`Placeholder “Search for name”.`,`input`],[`Opciones`,`Nombre — tipo y cantidad de rangos (o el carrier del plan); una sola elegida.`,`OpcionDireccion (radio)`],[`Pie`,`Cancel · Confirm.`,`FormFooter`]]})})})},S={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,v.jsx)(c,{estados:[{estado:`Default`,cuando:`Abre en Copy from template, sin nada elegido.`,story:`Playground`},{estado:`Selected`,cuando:`Una opción elegida: Confirm la copia.`,story:`Selected`},{estado:`Empty`,cuando:`La búsqueda no encuentra nada: “No results for …”.`,story:`Empty Search`},{estado:`From insurance`,cuando:`La otra pestaña lista los demás planes (no el que se edita).`,story:`From Insurance`}]})},C={play:d(l(`radio`,/premium ppo/i))},w={play:d(p(/search for name/i,`zzz`),u(/no results/i))},T={play:d(l(`tab`,/^copy from insurance/i),u(/northwind/i))},E={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,v.jsx)(s,{filas:[[`Size`,`md · 560px`],[`Copia`,`Type y rangos, con ids nuevos; reemplaza lo que había.`],[`Origen`,`red.dev: diálogo “Copy the form to the coverage table”.`]]})},D=[`Playground`,`Parts`,`States`,`Selected`,`EmptySearch`,`FromInsurance`,`Specs`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
      <Bloque titulo="Parts">
        <TablaPartes partes={[['Pestañas', 'Copy from template | Copy from insurance.', 'Tabs fullWidth'], ['Buscador', 'Placeholder “Search for name”.', 'input'], ['Opciones', 'Nombre — tipo y cantidad de rangos (o el carrier del plan); una sola elegida.', 'OpcionDireccion (radio)'], ['Pie', 'Cancel · Confirm.', 'FormFooter']]} />
      </Bloque>
    </Lienzo>
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
    cuando: 'Abre en Copy from template, sin nada elegido.',
    story: 'Playground'
  }, {
    estado: 'Selected',
    cuando: 'Una opción elegida: Confirm la copia.',
    story: 'Selected'
  }, {
    estado: 'Empty',
    cuando: 'La búsqueda no encuentra nada: “No results for …”.',
    story: 'Empty Search'
  }, {
    estado: 'From insurance',
    cuando: 'La otra pestaña lista los demás planes (no el que se edita).',
    story: 'From Insurance'
  }]} />
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsarRol('radio', /premium ppo/i))
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  play: secuencia(escribir(/search for name/i, 'zzz'), esperar(/no results/i))
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  play: secuencia(pulsarRol('tab', /^copy from insurance/i), esperar(/northwind/i))
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
  render: () => <SpecsDelDrawer filas={[['Size', 'md · 560px'], ['Copia', 'Type y rangos, con ids nuevos; reemplaza lo que había.'], ['Origen', 'red.dev: diálogo “Copy the form to the coverage table”.']]} />
}`,...E.parameters?.docs?.source}}}})))()}O();export{w as EmptySearch,T as FromInsurance,x as Parts,b as Playground,C as Selected,E as Specs,S as States,D as __namedExportsOrder,y as default};