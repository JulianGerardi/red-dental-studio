import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{d as n,i as r,l as i,t as a}from"./kit-4bQS7S9u.js";import{R as o,n as s}from"./finanzas-Cd24vV6l.js";import{n as c,t as l}from"./LocationNumberDrawer-BpZlWqyV.js";import{i as u,r as d,t as f}from"./kit-drawer-BWB0Ospl.js";var p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{c(),u(),n(),o(),p=t(),m={title:`Components/Finance/LocationNumberDrawer`,component:l,parameters:{layout:`fullscreen`,docs:{decisionsFrom:`components/finance/LocationNumberDrawer.tsx`,story:{inline:!1,iframeHeight:640},description:{component:[`**Location Number**, desde el botón del mismo nombre en *Edit Carrier → Information*. El número que el carrier le asignó a cada locación de la clínica, para que los reclamos electrónicos no se rechacen. Texto y columnas tal cual red.dev (allá es un diálogo).`,``,`Una fila por locación; las vacías no se guardan. Se guarda con el *Save* de la pantalla del carrier.`,``,`**Probalo:** en *Playground* escribí un número en Alaska Medical.`].join(`
`)}}},args:{numeros:s[0].numerosLocacion,onClose:()=>{},onGuardar:()=>{}},argTypes:{numeros:{control:`object`,description:`Número por id de locación.`}}},h={},g={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,p.jsx)(r,{children:(0,p.jsx)(a,{titulo:`Parts`,children:(0,p.jsx)(i,{partes:[[`Texto de ayuda`,`“Enter the location number assigned by the insurance carrier…”, de red.dev, como bajada del drawer (sin un título de sección que repita el del drawer).`,`description`],[`Location Name`,`Cada locación de Settings → Locations.`,`span`],[`Number`,`Texto libre, placeholder “Enter a number”.`,`TextField hideLabel`],[`Pie`,`Cancel · Save.`,`FormFooter`]]})})})},_={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,p.jsx)(f,{estados:[{estado:`With numbers`,cuando:`El carrier ya tiene números (Aetna: Abril y Bayside).`,story:`Playground`},{estado:`Empty`,cuando:`Ninguna locación con número: todas muestran el placeholder.`,story:`Empty`}]})},v={args:{numeros:{}}},y={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,p.jsx)(d,{filas:[[`Size`,`md · 560px`],[`Columnas`,`Location Name 1fr · Number 200px`],[`Guarda`,`Sólo las filas con número; el carrier se guarda con su Save.`]]})},b=[`Playground`,`Parts`,`States`,`Empty`,`Specs`],h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
        <TablaPartes partes={[['Texto de ayuda', '“Enter the location number assigned by the insurance carrier…”, de red.dev, como bajada del drawer (sin un título de sección que repita el del drawer).', 'description'], ['Location Name', 'Cada locación de Settings → Locations.', 'span'], ['Number', 'Texto libre, placeholder “Enter a number”.', 'TextField hideLabel'], ['Pie', 'Cancel · Save.', 'FormFooter']]} />
      </Bloque>
    </Lienzo>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
    estado: 'With numbers',
    cuando: 'El carrier ya tiene números (Aetna: Abril y Bayside).',
    story: 'Playground'
  }, {
    estado: 'Empty',
    cuando: 'Ninguna locación con número: todas muestran el placeholder.',
    story: 'Empty'
  }]} />
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    numeros: {}
  }
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
  render: () => <SpecsDelDrawer filas={[['Size', 'md · 560px'], ['Columnas', 'Location Name 1fr · Number 200px'], ['Guarda', 'Sólo las filas con número; el carrier se guarda con su Save.']]} />
}`,...y.parameters?.docs?.source}}}})))()}x();export{v as Empty,g as Parts,h as Playground,y as Specs,_ as States,b as __namedExportsOrder,m as default};