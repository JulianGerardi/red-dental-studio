import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./plus-Cbf0BrW0.js";import{n as i,t as a}from"./button-CNW06Q4c.js";var o,s,c,l,u,d,f,p;function m(){return(m=e((()=>{n(),i(),o=t(),s={title:`Components/UI/Button`,component:a,args:{children:`Save`},argTypes:{variant:{control:`select`,options:[`default`,`secondary`,`destructive`,`success`,`outline`,`ghost`,`link`]},size:{control:`select`,options:[`default`,`sm`,`lg`,`icon`]}}},c={},l={render:e=>(0,o.jsx)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[`default`,`secondary`,`destructive`,`success`,`outline`,`ghost`,`link`].map(t=>(0,o.jsx)(a,{...e,variant:t,children:t},t))})},u={render:e=>(0,o.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,o.jsx)(a,{...e,size:`sm`,children:`Small`}),(0,o.jsx)(a,{...e,children:`Default`}),(0,o.jsx)(a,{...e,size:`lg`,children:`Large`}),(0,o.jsx)(a,{...e,size:`icon`,"aria-label":`Add`,children:(0,o.jsx)(r,{})})]})},d={render:e=>(0,o.jsx)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[`default`,`secondary`,`destructive`,`success`].map(t=>(0,o.jsx)(a,{...e,variant:t,disabled:!0,children:t},t))})},f={args:{children:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r,{}),` New appointment`]})}},p=[`Default`,`Variants`,`Sizes`,`Disabled`,`WithIcon`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-wrap items-center gap-3">
      {(['default', 'secondary', 'destructive', 'success', 'outline', 'ghost', 'link'] as const).map(v => <Button key={v} {...args} variant={v}>{v}</Button>)}
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex items-center gap-3">
      <Button {...args} size="sm">Small</Button>
      <Button {...args}>Default</Button>
      <Button {...args} size="lg">Large</Button>
      <Button {...args} size="icon" aria-label="Add"><Plus /></Button>
    </div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex flex-wrap items-center gap-3">
      {(['default', 'secondary', 'destructive', 'success'] as const).map(v => <Button key={v} {...args} variant={v} disabled>{v}</Button>)}
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    children: <><Plus /> New appointment</>
  }
}`,...f.parameters?.docs?.source}}}})))()}m();export{c as Default,d as Disabled,u as Sizes,l as Variants,f as WithIcon,p as __namedExportsOrder,s as default};