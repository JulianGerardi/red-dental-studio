import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{a as r,r as i}from"./button-BOlyjP3C.js";import{n as a,r as o,t as s}from"./DockFlotantes-B597eq81.js";function c({baseY:e,open:t}){let[n,r]=(0,l.useState)(t);return(0,u.jsxs)(`div`,{className:`bg-page-background min-h-[480px] p-6`,children:[(0,u.jsx)(i,{variant:`secondary`,onClick:()=>r(e=>!e),children:n?`Close panel`:`Open panel`}),(0,u.jsxs)(s,{baseY:e,children:[(0,u.jsx)(f,{children:`Being seen`}),(0,u.jsx)(a,{abierto:n,children:(0,u.jsx)(`div`,{className:`pointer-events-auto mr-2 w-[240px] rounded-xl bg-white p-4 text-[13px] text-ink shadow-lg`,children:`The card grows inside the column and pushes the Confibot tab down.`})}),(0,u.jsx)(f,{children:`Confibot`})]})]})}var l,u,d,f,p,m,h,g,_;function v(){return(v=e((()=>{l=t(),r(),o(),u=n(),d={title:`Components/Layout/DockFlotantes`,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:520},description:{component:["La columna pegada al borde derecho donde viven recogidos los dos flotantes del app shell: la pestaña de *currently being seen* arriba y la de Confibot debajo. Al abrir una, su card u hoja se despliega **dentro de la columna** (`PanelDock`) y empuja a lo que tiene abajo, en vez de taparlo.",``,"**Cómo se usa:** `baseY` es la altura donde arranca la columna. Si al crecer no entra en la pantalla, la columna sube: reparte el crecimiento arriba y abajo y nunca se sale del alto de la ventana.",``,"**Probalo:** en *Playground* abrí y cerrá el panel con el botón o desde *Controls*, y cambiá `baseY` para ver cómo se acomoda cerca del borde."].join(`
`)}}},args:{baseY:120,open:!1},argTypes:{baseY:{control:{type:`range`,min:0,max:460,step:20},description:`Dónde arranca la columna, en px desde arriba.`},open:{control:`boolean`,description:`El panel desplegado adentro de la columna.`}}},f=({children:e})=>(0,u.jsx)(`span`,{className:`pointer-events-auto flex h-8 items-center rounded-l-lg bg-dash-blue px-3 text-[12px] font-medium text-white`,children:e}),p={render:e=>(0,u.jsx)(c,{...e},JSON.stringify(e))},m={parameters:{controls:{disable:!0}},render:()=>(0,u.jsx)(c,{baseY:120,open:!1})},h={parameters:{controls:{disable:!0}},render:()=>(0,u.jsx)(c,{baseY:120,open:!0})},g={parameters:{controls:{disable:!0}},render:()=>(0,u.jsx)(c,{baseY:440,open:!0})},_=[`Playground`,`Collapsed`,`PanelOpen`,`NearTheBottom`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => <Demo key={JSON.stringify(args)} {...args} />
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Demo baseY={120} open={false} />
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Demo baseY={120} open />
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Demo baseY={440} open />
}`,...g.parameters?.docs?.source}}}})))()}v();export{m as Collapsed,g as NearTheBottom,h as PanelOpen,p as Playground,_ as __namedExportsOrder,d as default};