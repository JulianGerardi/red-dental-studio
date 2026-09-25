import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,t as i}from"./Pagination-sAJrva2q.js";function a({paginas:e}){let[t,n]=(0,o.useState)(1);return(0,s.jsx)(i,{pagina:t,paginas:e,onChange:n})}var o,s,c,l,u,d,f,p;function m(){return(m=e((()=>{o=t(),r(),s=n(),c={title:`Components/Ledger/Pagination`,component:i,args:{pagina:1,paginas:6,onChange:()=>{}}},l={render:()=>(0,s.jsx)(a,{paginas:6})},u={render:()=>(0,s.jsx)(a,{paginas:24})},d={render:e=>(0,s.jsx)(i,{...e,pagina:1,paginas:6})},f={render:e=>(0,s.jsx)(i,{...e,pagina:6,paginas:6})},p=[`Default`,`ManyPages`,`FirstPage`,`LastPage`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <Demo paginas={6} />
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <Demo paginas={24} />
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => <Pagination {...args} pagina={1} paginas={6} />
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => <Pagination {...args} pagina={6} paginas={6} />
}`,...f.parameters?.docs?.source}}}})))()}m();export{l as Default,d as FirstPage,f as LastPage,u as ManyPages,p as __namedExportsOrder,c as default};