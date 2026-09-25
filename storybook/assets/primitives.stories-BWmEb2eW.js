import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,n as r,r as i,t as a}from"./primitives-DuFdzLdF.js";var o,s,c,l,u;function d(){return(d=e((()=>{n(),o=t(),s={title:`Components/Dashboard/Panel and StatusPill`,component:r,parameters:{layout:`padded`}},c={args:{title:`Today Appointments`},render:e=>(0,o.jsxs)(r,{...e,className:`w-[380px]`,bodyClassName:`flex flex-col gap-3 p-4 pt-0`,children:[(0,o.jsx)(a,{className:`p-3 text-sm`,children:`First card`}),(0,o.jsx)(a,{className:`p-3 text-sm`,children:`Second card`})]})},l={args:{title:``},render:()=>(0,o.jsxs)(`div`,{className:`flex gap-2`,children:[(0,o.jsx)(i,{tone:`ok`,children:`Available`}),(0,o.jsx)(i,{tone:`busy`,children:`Busy`}),(0,o.jsx)(i,{tone:`bad`,children:`Unavailable`})]})},u=[`PanelWithInnerCards`,`StatusPills`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Today Appointments'
  },
  render: args => <Panel {...args} className="w-[380px]" bodyClassName="flex flex-col gap-3 p-4 pt-0">
      <InnerCard className="p-3 text-sm">First card</InnerCard>
      <InnerCard className="p-3 text-sm">Second card</InnerCard>
    </Panel>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    title: ''
  },
  render: () => <div className="flex gap-2">
      <StatusPill tone="ok">Available</StatusPill>
      <StatusPill tone="busy">Busy</StatusPill>
      <StatusPill tone="bad">Unavailable</StatusPill>
    </div>
}`,...l.parameters?.docs?.source}}}})))()}d();export{c as PanelWithInnerCards,l as StatusPills,u as __namedExportsOrder,s as default};