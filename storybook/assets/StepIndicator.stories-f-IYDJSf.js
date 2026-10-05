import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{fn as r,mn as i,nt as a,rt as o}from"./iframe-Ntl7gO7B.js";var s,c,l,u,d,f,p,m,h;function g(){return(g=e((()=>{s=t(),o(),i(),c=n(),l={title:`Components/Clinical/StepIndicator`,component:a,args:{total:3,current:2}},u={},d={args:{current:1}},f={args:{total:4,current:4}},p={args:{total:3,current:2,labels:[`Procedure`,`Surfaces`,`Link to finding`]}},m={args:{total:3,current:1,labels:[`Procedure`,`Surfaces`,`Link to finding`]},render:function(e){let[t,n]=(0,s.useState)(e.current);return(0,c.jsxs)(`div`,{className:`flex w-[380px] flex-col gap-4`,children:[(0,c.jsx)(a,{...e,current:t}),(0,c.jsxs)(`div`,{className:`flex gap-2`,children:[(0,c.jsx)(r,{variant:`secondary`,disabled:t<=1,onClick:()=>n(e=>e-1),children:`Back`}),(0,c.jsx)(r,{disabled:t>e.total,onClick:()=>n(e=>e+1),children:`Next Step`})]})]})}},h=[`Default`,`FirstStep`,`LastStep`,`WithLabels`,`Interactive`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    current: 1
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    total: 4,
    current: 4
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    total: 3,
    current: 2,
    labels: ['Procedure', 'Surfaces', 'Link to finding']
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    total: 3,
    current: 1,
    labels: ['Procedure', 'Surfaces', 'Link to finding']
  },
  render: function Render(args) {
    const [paso, setPaso] = useState(args.current);
    return <div className="flex w-[380px] flex-col gap-4">
        <StepIndicator {...args} current={paso} />
        <div className="flex gap-2">
          <Button variant="secondary" disabled={paso <= 1} onClick={() => setPaso(p => p - 1)}>Back</Button>
          <Button disabled={paso > args.total} onClick={() => setPaso(p => p + 1)}>Next Step</Button>
        </div>
      </div>;
  }
}`,...m.parameters?.docs?.source}}}})))()}g();export{u as Default,d as FirstStep,m as Interactive,f as LastStep,p as WithLabels,h as __namedExportsOrder,l as default};