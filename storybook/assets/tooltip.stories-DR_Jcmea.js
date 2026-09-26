import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{_ as n,b as r,v as i,x as a,y as o}from"./iframe-BgXPieCk.js";import{a as s,r as c}from"./button-Cb-S0EUF.js";var l,u,d,f,p;function m(){return(m=e((()=>{a(),s(),l=t(),u={title:`Components/UI/Tooltip`,component:n},d={render:()=>(0,l.jsx)(`div`,{className:`p-16`,children:(0,l.jsxs)(n,{defaultOpen:!0,children:[(0,l.jsx)(r,{asChild:!0,children:(0,l.jsx)(c,{variant:`secondary`,children:`Hover me`})}),(0,l.jsx)(i,{side:`right`,children:`Dashboard`})]})})},f={render:()=>(0,l.jsx)(o,{delayDuration:400,children:(0,l.jsx)(`div`,{className:`p-16`,children:(0,l.jsxs)(n,{children:[(0,l.jsx)(r,{asChild:!0,children:(0,l.jsx)(c,{variant:`secondary`,children:`Hover, waits 400 ms`})}),(0,l.jsx)(i,{children:`Delayed tooltip`})]})})})},p=[`Default`,`WithProviderDelay`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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