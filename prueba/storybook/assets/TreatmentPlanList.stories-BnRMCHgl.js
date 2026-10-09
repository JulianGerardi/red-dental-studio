import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,r}from"./TreatmentPlanList-BOB5lZlc.js";import{c as i,d as a,i as o,t as s}from"./kit-4bQS7S9u.js";var c,l,u,d,f,p;function m(){return(m=e((()=>{a(),n(),c=t(),l={title:`Components/Clinical/TreatmentPlanList`,component:r,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:720},description:{component:[`Los Treatment Plans del Overview de Clinical Mode, en tarjetas con la estructura de red.dev (la opción A que eligió Julián, porque muestra el detalle). Tocar una tarjeta abre ese caso en Treatment Plan.`,``,`**Probalo:** en *Playground* tocá una tarjeta.`].join(`
`)}}}},u={},d={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,c.jsx)(o,{children:(0,c.jsx)(s,{titulo:`Parts`,children:(0,c.jsxs)(i,{encabezado:[`Part`,`What it does`],minimo:560,children:[(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{className:`font-semibold`,children:`Header`}),(0,c.jsx)(`td`,{children:`Nombre del plan, grupo y la pill del estado del caso.`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{className:`font-semibold`,children:`Data`}),(0,c.jsx)(`td`,{children:`Doctor y rol, total y fecha de creación, con su ícono.`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{className:`font-semibold`,children:`Progress`}),(0,c.jsx)(`td`,{children:`Procedimientos completados sobre el total, con barra.`})]})]})})})},f={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,c.jsx)(o,{children:(0,c.jsx)(s,{titulo:`States`,children:(0,c.jsxs)(i,{encabezado:[`Case status`,`Pill tone`],minimo:560,children:[(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{className:`font-semibold`,children:`Planning`}),(0,c.jsx)(`td`,{children:`warning`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{className:`font-semibold`,children:`Pending`}),(0,c.jsx)(`td`,{children:`purple`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{className:`font-semibold`,children:`Presented`}),(0,c.jsx)(`td`,{children:`info`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{className:`font-semibold`,children:`Waiting for consent`}),(0,c.jsx)(`td`,{children:`neutral`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{className:`font-semibold`,children:`Accepted`}),(0,c.jsx)(`td`,{children:`success`})]})]})})})},p=[`Playground`,`Parts`,`States`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
        <Tabla encabezado={["Part", "What it does"]} minimo={560}>
          <tr><td className="font-semibold">Header</td><td>Nombre del plan, grupo y la pill del estado del caso.</td></tr>
          <tr><td className="font-semibold">Data</td><td>Doctor y rol, total y fecha de creación, con su ícono.</td></tr>
          <tr><td className="font-semibold">Progress</td><td>Procedimientos completados sobre el total, con barra.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
      <Bloque titulo="States">
        <Tabla encabezado={["Case status", "Pill tone"]} minimo={560}>
          <tr><td className="font-semibold">Planning</td><td>warning</td></tr>
          <tr><td className="font-semibold">Pending</td><td>purple</td></tr>
          <tr><td className="font-semibold">Presented</td><td>info</td></tr>
          <tr><td className="font-semibold">Waiting for consent</td><td>neutral</td></tr>
          <tr><td className="font-semibold">Accepted</td><td>success</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...f.parameters?.docs?.source}}}})))()}m();export{d as Parts,u as Playground,f as States,p as __namedExportsOrder,l as default};