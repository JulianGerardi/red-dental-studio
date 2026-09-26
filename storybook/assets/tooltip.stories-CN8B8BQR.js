import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{_ as n,g as r,h as i,v as a,y as o}from"./iframe-zKYdGUCs.js";import{a as s,r as c}from"./button-Cb-S0EUF.js";var l,u,d,f,p;function m(){return(m=e((()=>{o(),s(),l=t(),u={title:`Components/UI/Tooltip`,component:i},d={render:()=>(0,l.jsx)(`div`,{className:`p-16`,children:(0,l.jsxs)(i,{defaultOpen:!0,children:[(0,l.jsx)(a,{asChild:!0,children:(0,l.jsx)(c,{variant:`secondary`,children:`Hover me`})}),(0,l.jsx)(r,{side:`right`,children:`Dashboard`})]})})},f={render:()=>(0,l.jsx)(n,{delayDuration:400,children:(0,l.jsx)(`div`,{className:`p-16`,children:(0,l.jsxs)(i,{children:[(0,l.jsx)(a,{asChild:!0,children:(0,l.jsx)(c,{variant:`secondary`,children:`Hover, waits 400 ms`})}),(0,l.jsx)(r,{children:`Delayed tooltip`})]})})})},p=[`Default`,`WithProviderDelay`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="p-16">
      <Tooltip defaultOpen>
        <TooltipTrigger asChild><Button variant="secondary">Hover me</Button></TooltipTrigger>
        <TooltipContent side="right">Dashboard</TooltipContent>
      </Tooltip>
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <TooltipProvider delayDuration={400}>
      <div className="p-16">
        <Tooltip>
          <TooltipTrigger asChild><Button variant="secondary">Hover, waits 400 ms</Button></TooltipTrigger>
          <TooltipContent>Delayed tooltip</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
}`,...f.parameters?.docs?.source}}}})))()}m();export{d as Default,f as WithProviderDelay,p as __namedExportsOrder,u as default};