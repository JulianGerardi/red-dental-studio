import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,r}from"./TreatmentPlanList-Bsb4Rex1.js";import{c as i,d as a,i as o,t as s}from"./kit-CWUgB5-0.js";var c,l,u,d,f,p,m,h;function g(){return(g=e((()=>{a(),n(),c=t(),l={title:`Components/Clinical/TreatmentPlanList`,component:r,parameters:{layout:`padded`,docs:{story:{inline:!1,iframeHeight:720},description:{component:[`Los Treatment Plans del Overview de Clinical Mode, en tarjetas con la estructura de red.dev (la opción A que eligió Julián, porque muestra el detalle). Tocar una tarjeta abre ese caso en Treatment Plan.`,``,"En el Overview va con `llena`: en desktop la columna llega hasta el final de la tabla de al lado, sin estirar la fila, y la lista scrollea adentro. Así no queda espacio muerto debajo (2026-10-18).",``,`**Probalo:** en *Playground* tocá una tarjeta y prendé *llena* desde *Controls*: la card toma el alto del contenedor (acá, 640px). *Fill the column* lo muestra al lado de una columna más alta.`].join(`
`)}}}},u={args:{llena:!1},argTypes:{llena:{control:`boolean`,description:`Desde 1024px ocupa todo el alto del contenedor (position: relative) sin estirarlo; la lista scrollea. Debajo, máximo 560px.`}},render:e=>(0,c.jsx)(`div`,{className:`relative h-[640px] w-[360px]`,children:(0,c.jsx)(r,{...e})})},d={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!1,iframeHeight:900}}},render:()=>(0,c.jsxs)(`div`,{className:`bg-page-background flex gap-4 p-4`,children:[(0,c.jsx)(`div`,{className:`relative w-[360px] shrink-0`,children:(0,c.jsx)(r,{llena:!0})}),(0,c.jsx)(`div`,{className:`flex h-[840px] flex-1 items-center justify-center rounded-lg border border-dashed border-line text-[12px] text-ink-muted`,children:`Chart + Problem List (840px)`})]})},f={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,c.jsx)(o,{children:(0,c.jsx)(s,{titulo:`Parts`,children:(0,c.jsxs)(i,{encabezado:[`Part`,`What it does`],minimo:560,children:[(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{className:`font-semibold`,children:`Header`}),(0,c.jsx)(`td`,{children:`Nombre del plan, grupo y la pill del estado del caso.`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{className:`font-semibold`,children:`Data`}),(0,c.jsx)(`td`,{children:`Doctor y rol, total y fecha de creación, con su ícono.`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{className:`font-semibold`,children:`Progress`}),(0,c.jsx)(`td`,{children:`Procedimientos completados sobre el total, con barra.`})]})]})})})},p={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,c.jsx)(o,{children:(0,c.jsx)(s,{titulo:`States`,children:(0,c.jsxs)(i,{encabezado:[`Case status`,`Pill tone`],minimo:560,children:[(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{className:`font-semibold`,children:`Planning`}),(0,c.jsx)(`td`,{children:`warning`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{className:`font-semibold`,children:`Pending`}),(0,c.jsx)(`td`,{children:`purple`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{className:`font-semibold`,children:`Presented`}),(0,c.jsx)(`td`,{children:`info`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{className:`font-semibold`,children:`Waiting for consent`}),(0,c.jsx)(`td`,{children:`neutral`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{className:`font-semibold`,children:`Accepted`}),(0,c.jsx)(`td`,{children:`success`})]})]})})})},m={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,c.jsx)(o,{children:(0,c.jsx)(s,{titulo:`Specs`,children:(0,c.jsxs)(i,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{className:`font-semibold`,children:`Width`}),(0,c.jsx)(`td`,{children:`360px en el Overview (con 300 los datos de la tarjeta no entraban en una línea).`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{className:`font-semibold`,children:`Height`}),(0,c.jsxs)(`td`,{children:[`Con `,(0,c.jsx)(`code`,{children:`llena`}),`, desde 1024px: el alto de la columna de al lado, hasta el final de la tabla. Debajo de 1024 (apilado) y sin `,(0,c.jsx)(`code`,{children:`llena`}),`: la lista hasta 560px.`]})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{className:`font-semibold`,children:`List`}),(0,c.jsx)(`td`,{children:`Scroll adentro, 12px entre tarjetas.`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{className:`font-semibold`,children:`Card`}),(0,c.jsx)(`td`,{children:`Card de la página: padding 16px, rounded-lg, shadow-panel, sin borde.`})]})]})})})},h=[`Playground`,`FillTheColumn`,`Parts`,`States`,`Specs`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    llena: false
  },
  argTypes: {
    llena: {
      control: 'boolean',
      description: 'Desde 1024px ocupa todo el alto del contenedor (position: relative) sin estirarlo; la lista scrollea. Debajo, máximo 560px.'
    }
  },
  render: args => <div className="relative h-[640px] w-[360px]"><TreatmentPlanList {...args} /></div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded',
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: false,
        iframeHeight: 900
      }
    }
  },
  render: () => <div className="bg-page-background flex gap-4 p-4">
      <div className="relative w-[360px] shrink-0"><TreatmentPlanList llena /></div>
      <div className="flex h-[840px] flex-1 items-center justify-center rounded-lg border border-dashed border-line text-[12px] text-ink-muted">Chart + Problem List (840px)</div>
    </div>
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
      <Bloque titulo="Parts">
        <Tabla encabezado={["Part", "What it does"]} minimo={560}>
          <tr><td className="font-semibold">Header</td><td>Nombre del plan, grupo y la pill del estado del caso.</td></tr>
          <tr><td className="font-semibold">Data</td><td>Doctor y rol, total y fecha de creación, con su ícono.</td></tr>
          <tr><td className="font-semibold">Progress</td><td>Procedimientos completados sobre el total, con barra.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
      <Bloque titulo="Specs">
        <Tabla encabezado={["Item", "Value"]} minimo={560}>
          <tr><td className="font-semibold">Width</td><td>360px en el Overview (con 300 los datos de la tarjeta no entraban en una línea).</td></tr>
          <tr><td className="font-semibold">Height</td><td>Con <code>llena</code>, desde 1024px: el alto de la columna de al lado, hasta el final de la tabla. Debajo de 1024 (apilado) y sin <code>llena</code>: la lista hasta 560px.</td></tr>
          <tr><td className="font-semibold">List</td><td>Scroll adentro, 12px entre tarjetas.</td></tr>
          <tr><td className="font-semibold">Card</td><td>Card de la página: padding 16px, rounded-lg, shadow-panel, sin borde.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...m.parameters?.docs?.source}}}})))()}g();export{d as FillTheColumn,f as Parts,u as Playground,m as Specs,p as States,h as __namedExportsOrder,l as default};