import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{_ as r,i}from"./data-BmMkgGYd.js";import{n as a,t as o}from"./IntraOralDiagram-f4_d8cIt.js";function s({pending:e,active:t}){let[n,r]=(0,c.useState)(e);return(0,l.jsx)(o,{pending:n,active:t,onToggle:e=>r(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])})}var c,l,u,d,f,p,m;function h(){return(h=e((()=>{c=t(),a(),r(),l=n(),u={title:`Components/Clinical/Dental/IntraOralDiagram`,parameters:{layout:`padded`,docs:{jira:[`CON-882`],description:{component:`El gráfico de Intraoral (CON-882): la boca abierta del Figma con las regiones clickeables encima. Una región **pending** (elegida, todavía sin condition) va en ámbar; una **active** (ya tiene un finding) va en verde. Usa [RegionDiagram](/docs/components-clinical-dental-regiondiagram--docs).

**Probalo:** tocá las regiones en *Playground*, o marcá cuáles están pending y active desde *Controls*.`}}},args:{pending:[],active:[]},argTypes:{pending:{control:`check`,options:i,description:`Elegidas para cargar una condition (ámbar).`},active:{control:`check`,options:i,description:`Con un finding cargado (verde).`}}},d={render:e=>(0,l.jsx)(s,{...e},JSON.stringify(e))},f={parameters:{controls:{disable:!0}},render:()=>(0,l.jsx)(s,{pending:[],active:[]})},p={parameters:{controls:{disable:!0}},render:()=>(0,l.jsx)(s,{pending:[`Soft Palate`],active:[`Right Hard Palate`]})},m=[`Playground`,`Empty`,`PendingAndActive`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => <Demo key={JSON.stringify(args)} {...args} />
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Demo pending={[]} active={[]} />
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Demo pending={['Soft Palate']} active={['Right Hard Palate']} />
}`,...p.parameters?.docs?.source}}}})))()}h();export{f as Empty,p as PendingAndActive,d as Playground,m as __namedExportsOrder,u as default};