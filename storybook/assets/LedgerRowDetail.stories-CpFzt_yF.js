import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,o as r,t as i}from"./LedgerRowDetail-BkmwwTjJ.js";import{r as a,s as o}from"./ledger-C-DTVvwa.js";var s,c,l,u,d,f,p;function m(){return(m=e((()=>{o(),r(),s=t(),c=a.find(e=>(e.creditoDisponible??0)>0)??a[0],l={title:`Components/Ledger/LedgerRowDetail`,component:n,parameters:{layout:`padded`},args:{m:a[0],onVerTodo:()=>{}},decorators:[e=>(0,s.jsx)(`div`,{className:`w-[760px]`,children:(0,s.jsx)(e,{})})]},u={},d={args:{m:c,onAplicarCredito:()=>{}}},f={render:()=>(0,s.jsxs)(`div`,{className:`flex gap-3`,children:[(0,s.jsx)(i,{todasAbiertas:!1,hayAlgunaAbierta:!0,onExpandirTodo:()=>{},onColapsarTodo:()=>{}}),(0,s.jsx)(i,{todasAbiertas:!0,hayAlgunaAbierta:!0,onExpandirTodo:()=>{},onColapsarTodo:()=>{}})]})},p=[`Default`,`WithAvailableCredit`,`ExpandAll`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    m: CON_CREDITO,
    onAplicarCredito: () => {}
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex gap-3">
      <BotonExpandirTodo todasAbiertas={false} hayAlgunaAbierta onExpandirTodo={() => {}} onColapsarTodo={() => {}} />
      <BotonExpandirTodo todasAbiertas hayAlgunaAbierta onExpandirTodo={() => {}} onColapsarTodo={() => {}} />
    </div>
}`,...f.parameters?.docs?.source}}}})))()}m();export{u as Default,f as ExpandAll,d as WithAvailableCredit,p as __namedExportsOrder,l as default};