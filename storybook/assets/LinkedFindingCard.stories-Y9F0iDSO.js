import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,t as i}from"./LinkedFindingCard-C7ssZVKZ.js";function a(e){let[t,n]=(0,o.useState)(!1);return(0,s.jsx)(i,{...e,linked:t,onToggle:n})}var o,s,c,l,u,d;function f(){return(f=e((()=>{o=t(),r(),s=n(),c={title:`Components/Clinical/Dental/LinkedFindingCard`,component:i,args:{finding:{id:`F-1`,condition:`chronic enamel dental caries`,area:`Tooth 3`,surfaces:[`O`,`DB`],date:`May 12, 2026`,status:`Active`},linked:!1,onToggle:()=>{}},decorators:[e=>(0,s.jsx)(`div`,{className:`w-[360px]`,children:(0,s.jsx)(e,{})})]},l={render:e=>(0,s.jsx)(a,{...e})},u={args:{finding:{id:`F-2`,condition:`oral candidiasis`,area:`Soft Palate`,surfaces:[],date:`May 12, 2026`,status:`Active`}},render:e=>(0,s.jsx)(a,{...e})},d=[`Default`,`WithoutSurfaces`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => <Demo {...args} />
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    finding: {
      id: 'F-2',
      condition: 'oral candidiasis',
      area: 'Soft Palate',
      surfaces: [],
      date: 'May 12, 2026',
      status: 'Active'
    }
  },
  render: args => <Demo {...args} />
}`,...u.parameters?.docs?.source}}}})))()}f();export{l as Default,u as WithoutSurfaces,d as __namedExportsOrder,c as default};