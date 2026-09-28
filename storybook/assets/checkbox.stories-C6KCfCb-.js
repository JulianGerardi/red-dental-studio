import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{K as r,q as i}from"./iframe-BxeDSl5M.js";function a(e){let[t,n]=(0,o.useState)(!1);return(0,s.jsx)(r,{...e,on:t,onChange:n})}var o,s,c,l,u,d,f;function p(){return(p=e((()=>{o=t(),i(),s=n(),c={title:`Components/UI/Checkbox`,component:r,args:{label:`Select row`,on:!1,onChange:()=>{}}},l={render:e=>(0,s.jsx)(a,{...e})},u={render:e=>(0,s.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,s.jsx)(r,{...e,on:!1,label:`Unchecked`}),(0,s.jsx)(r,{...e,on:!0,label:`Checked`})]})},d={render:e=>(0,s.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,s.jsx)(r,{...e,on:!1,disabled:!0,label:`Disabled`}),(0,s.jsx)(r,{...e,on:!0,disabled:!0,label:`Disabled, checked`})]})},f=[`Interactive`,`States`,`Disabled`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => <Interactivo {...args} />
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex items-center gap-4">
      <Checkbox {...args} on={false} label="Unchecked" />
      <Checkbox {...args} on label="Checked" />
    </div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex items-center gap-4">
      <Checkbox {...args} on={false} disabled label="Disabled" />
      <Checkbox {...args} on disabled label="Disabled, checked" />
    </div>
}`,...d.parameters?.docs?.source}}}})))()}p();export{d as Disabled,l as Interactive,u as States,f as __namedExportsOrder,c as default};