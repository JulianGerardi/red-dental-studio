import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,i as r,n as i,r as a,t as o}from"./tooltip-6ep9-x7U.js";import{n as s,t as c}from"./calendar-range-CNufQ_2M.js";import{dt as l,pt as u}from"./iframe-CNOXh5vK.js";var d,f,p,m,h,g;function _(){return(_=e((()=>{n(),u(),s(),d=t(),f={title:`Components/UI/Tooltip`,component:o,parameters:{docs:{description:{component:`El nombre de algo que se muestra sólo como ícono. **Probalo** en *Playground*: texto, lado, disparador, abierto fijo o al pasar el mouse, y demora.`}}}},p={args:{text:`Scheduling`,side:`right`,trigger:`icon`,open:!0,delay:100},argTypes:{text:{control:`text`,description:`Una palabra o frase corta: nombra lo que el ícono no dice.`},side:{control:`inline-radio`,options:[`top`,`right`,`bottom`,`left`],description:`Lado donde aparece. En los rieles, a la derecha.`},trigger:{control:`inline-radio`,options:[`icon`,`button`],description:`Sobre qué aparece.`},open:{control:`boolean`,description:`Abierto fijo para verlo. Apagado: aparece al pasar el mouse o con Tab.`},delay:{control:{type:`range`,min:0,max:800,step:50},description:`Demora en ms: 100-150 en los rieles, 500 en tablas para no parpadear al barrer.`}},render:({text:e,side:t,trigger:n,open:s,delay:u})=>(0,d.jsx)(a,{delayDuration:u,children:(0,d.jsx)(`div`,{className:`p-16`,children:(0,d.jsxs)(o,{open:s||void 0,children:[(0,d.jsx)(r,{asChild:!0,children:n===`icon`?(0,d.jsx)(`button`,{type:`button`,"aria-label":e,className:`flex size-8 items-center justify-center rounded-md text-ink hover:bg-surface-muted`,children:(0,d.jsx)(c,{className:`size-4`})}):(0,d.jsx)(l,{variant:`secondary`,children:`Hover me`})}),(0,d.jsx)(i,{side:t,className:`bg-ink text-white`,children:e})]})})},`${u}-${s}`)},m={render:()=>(0,d.jsx)(`div`,{className:`p-16`,children:(0,d.jsxs)(o,{defaultOpen:!0,children:[(0,d.jsx)(r,{asChild:!0,children:(0,d.jsx)(l,{variant:`secondary`,children:`Hover me`})}),(0,d.jsx)(i,{side:`right`,children:`Dashboard`})]})})},h={render:()=>(0,d.jsx)(a,{delayDuration:400,children:(0,d.jsx)(`div`,{className:`p-16`,children:(0,d.jsxs)(o,{children:[(0,d.jsx)(r,{asChild:!0,children:(0,d.jsx)(l,{variant:`secondary`,children:`Hover, waits 400 ms`})}),(0,d.jsx)(i,{children:`Delayed tooltip`})]})})})},g=[`Playground`,`Default`,`WithProviderDelay`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Scheduling',
    side: 'right',
    trigger: 'icon',
    open: true,
    delay: 100
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Una palabra o frase corta: nombra lo que el ícono no dice.'
    },
    side: {
      control: 'inline-radio',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Lado donde aparece. En los rieles, a la derecha.'
    },
    trigger: {
      control: 'inline-radio',
      options: ['icon', 'button'],
      description: 'Sobre qué aparece.'
    },
    open: {
      control: 'boolean',
      description: 'Abierto fijo para verlo. Apagado: aparece al pasar el mouse o con Tab.'
    },
    delay: {
      control: {
        type: 'range',
        min: 0,
        max: 800,
        step: 50
      },
      description: 'Demora en ms: 100-150 en los rieles, 500 en tablas para no parpadear al barrer.'
    }
  },
  render: ({
    text,
    side,
    trigger,
    open,
    delay
  }) => <TooltipProvider key={\`\${delay}-\${open}\`} delayDuration={delay}>
      <div className="p-16">
        <Tooltip open={open || undefined}>
          <TooltipTrigger asChild>
            {trigger === 'icon' ? <button type="button" aria-label={text} className="flex size-8 items-center justify-center rounded-md text-ink hover:bg-surface-muted"><CalendarRange className="size-4" /></button> : <Button variant="secondary">Hover me</Button>}
          </TooltipTrigger>
          <TooltipContent side={side} className="bg-ink text-white">{text}</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div className="p-16">
      <Tooltip defaultOpen>
        <TooltipTrigger asChild><Button variant="secondary">Hover me</Button></TooltipTrigger>
        <TooltipContent side="right">Dashboard</TooltipContent>
      </Tooltip>
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <TooltipProvider delayDuration={400}>
      <div className="p-16">
        <Tooltip>
          <TooltipTrigger asChild><Button variant="secondary">Hover, waits 400 ms</Button></TooltipTrigger>
          <TooltipContent>Delayed tooltip</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
}`,...h.parameters?.docs?.source}}}})))()}_();export{m as Default,p as Playground,h as WithProviderDelay,g as __namedExportsOrder,f as default};