import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,r as i,t as a}from"./LinkedFindingCard-D3uPw6Nc.js";function o(e){let[t,n]=(0,s.useState)(!1);return(0,c.jsx)(r,{...e,linked:t,onToggle:n})}var s,c,l,u,d,f,p;function m(){return(m=e((()=>{s=t(),i(),c=n(),l={title:`Components/Clinical/Dental/LinkedFindingCard`,component:r,args:{finding:{id:`F-1`,condition:`chronic enamel dental caries`,area:`Tooth 3`,surfaces:[`O`,`DB`],date:`May 12, 2026`,status:`Active`},linked:!1,onToggle:()=>{}},decorators:[e=>(0,c.jsx)(`div`,{className:`w-[360px]`,children:(0,c.jsx)(e,{})})]},u={render:e=>(0,c.jsx)(o,{...e})},d={args:{finding:{id:`F-2`,condition:`oral candidiasis`,area:`Soft Palate`,surfaces:[],date:`May 12, 2026`,status:`Active`}},render:e=>(0,c.jsx)(o,{...e})},f={render:()=>(0,c.jsxs)(`div`,{className:`flex flex-col gap-2.5`,children:[(0,c.jsx)(a,{code:`K05.31`,surfaces:[`B`,`MB`],linked:!0,onToggle:()=>{}}),(0,c.jsx)(a,{code:`B37.0`,surfaces:[],linked:!1,onToggle:()=>{}})]})},p=[`Default`,`WithoutSurfaces`,`Diagnosis`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => <Demo {...args} />
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-2.5">
      <LinkedDiagnosisCard code="K05.31" surfaces={['B', 'MB']} linked onToggle={() => {}} />
      <LinkedDiagnosisCard code="B37.0" surfaces={[]} linked={false} onToggle={() => {}} />
    </div>
}`,...f.parameters?.docs?.source}}}})))()}m();export{u as Default,f as Diagnosis,d as WithoutSurfaces,p as __namedExportsOrder,l as default};