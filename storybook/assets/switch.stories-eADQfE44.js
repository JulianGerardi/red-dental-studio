import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./switch-CzlWg6Pb.js";var i,a,o,s,c,l;function u(){return(u=e((()=>{n(),i=t(),a={title:`Components/UI/Switch`,component:r,argTypes:{size:{control:`select`,options:[`default`,`sm`]}}},o={args:{defaultChecked:!0,"aria-label":`Active`}},s={render:()=>(0,i.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,i.jsx)(r,{"aria-label":`Off`}),(0,i.jsx)(r,{defaultChecked:!0,"aria-label":`On`}),(0,i.jsx)(r,{size:`sm`,defaultChecked:!0,"aria-label":`Small on`}),(0,i.jsx)(r,{disabled:!0,"aria-label":`Disabled`}),(0,i.jsx)(r,{disabled:!0,defaultChecked:!0,"aria-label":`Disabled on`})]})},c={render:()=>(0,i.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,i.jsx)(r,{"aria-invalid":!0,"aria-label":`Invalid off`}),(0,i.jsx)(r,{"aria-invalid":!0,defaultChecked:!0,"aria-label":`Invalid on`})]})},l=[`Default`,`States`,`Invalid`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    defaultChecked: true,
    'aria-label': 'Active'
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <Switch aria-label="Off" />
      <Switch defaultChecked aria-label="On" />
      <Switch size="sm" defaultChecked aria-label="Small on" />
      <Switch disabled aria-label="Disabled" />
      <Switch disabled defaultChecked aria-label="Disabled on" />
    </div>
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <Switch aria-invalid aria-label="Invalid off" />
      <Switch aria-invalid defaultChecked aria-label="Invalid on" />
    </div>
}`,...c.parameters?.docs?.source}}}})))()}u();export{o as Default,c as Invalid,s as States,l as __namedExportsOrder,a as default};