import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{_ as n,g as r,h as i,v as a,y as o}from"./iframe-CEscDg4_.js";import{n as s,t as c}from"./button-CNW06Q4c.js";var l,u,d,f,p;function m(){return(m=e((()=>{o(),s(),l=t(),u={title:`Components/UI/Tooltip`,component:i},d={render:()=>(0,l.jsx)(`div`,{className:`p-16`,children:(0,l.jsxs)(i,{defaultOpen:!0,children:[(0,l.jsx)(a,{asChild:!0,children:(0,l.jsx)(c,{variant:`outline`,children:`Hover me`})}),(0,l.jsx)(r,{side:`right`,children:`Dashboard`})]})})},f={render:()=>(0,l.jsx)(n,{delayDuration:400,children:(0,l.jsx)(`div`,{className:`p-16`,children:(0,l.jsxs)(i,{children:[(0,l.jsx)(a,{asChild:!0,children:(0,l.jsx)(c,{variant:`outline`,children:`Hover, waits 400 ms`})}),(0,l.jsx)(r,{children:`Delayed tooltip`})]})})})},p=[`Default`,`WithProviderDelay`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div className="p-16">
      <Tooltip defaultOpen>
        <TooltipTrigger asChild><Button variant="outline">Hover me</Button></TooltipTrigger>
        <TooltipContent side="right">Dashboard</TooltipContent>
      </Tooltip>
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <TooltipProvider delayDuration={400}>
      <div className="p-16">
        <Tooltip>
          <TooltipTrigger asChild><Button variant="outline">Hover, waits 400 ms</Button></TooltipTrigger>
          <TooltipContent>Delayed tooltip</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
}`,...f.parameters?.docs?.source}}}})))()}m();export{d as Default,f as WithProviderDelay,p as __namedExportsOrder,u as default};