import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{i as n,n as r,r as i,t as a}from"./hover-card-CpSomOw-.js";var o,s,c,l,u;function d(){return(d=e((()=>{n(),o=t(),s={title:`Components/UI/HoverCard`,component:a,parameters:{docs:{description:{component:`Información para leer que aparece al pasar el mouse (la ficha de un diente). **Probalo** en *Playground*: contenido, lado y demora.`}}}},c={args:{trigger:`Tooth 14`,title:`Tooth 14 · Upper left first premolar`,detail:`Existing restoration on the occlusal surface. Last reviewed Mar 12, 2025.`,side:`bottom`,open:!0,openDelay:300},argTypes:{trigger:{control:`text`,description:`Sobre qué se pasa el mouse.`},title:{control:`text`},detail:{control:`text`},side:{control:`inline-radio`,options:[`top`,`right`,`bottom`,`left`]},open:{control:`boolean`,description:`Abierta fija. Apagado: aparece al pasar el mouse, después de la demora.`},openDelay:{control:{type:`range`,min:0,max:1e3,step:50},description:`Demora en ms: pasar de largo no la abre.`}},render:({trigger:e,title:t,detail:n,side:s,open:c,openDelay:l})=>(0,o.jsx)(`div`,{className:`p-24`,children:(0,o.jsxs)(a,{defaultOpen:c,openDelay:l,children:[(0,o.jsx)(i,{asChild:!0,children:(0,o.jsx)(`a`,{className:`text-dash-blue cursor-pointer text-sm font-medium`,children:e})}),(0,o.jsxs)(r,{side:s,children:[(0,o.jsx)(`p`,{className:`text-sm font-bold`,children:t}),(0,o.jsx)(`p`,{className:`mt-1 text-xs leading-relaxed text-ink-muted`,children:n})]})]},`${c}-${l}`)})},l={render:()=>(0,o.jsx)(`div`,{className:`p-24`,children:(0,o.jsxs)(a,{defaultOpen:!0,children:[(0,o.jsx)(i,{asChild:!0,children:(0,o.jsx)(`a`,{className:`text-dash-blue cursor-pointer text-sm font-medium`,children:`Sarah Stone`})}),(0,o.jsxs)(r,{children:[(0,o.jsx)(`p`,{className:`text-sm font-bold`,children:`Sarah Stone`}),(0,o.jsx)(`p`,{className:`text-xs text-ink-muted`,children:`DOB 04/02/1991 · Patient ID 12345432`})]})]})})},u=[`Playground`,`Default`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    trigger: 'Tooth 14',
    title: 'Tooth 14 · Upper left first premolar',
    detail: 'Existing restoration on the occlusal surface. Last reviewed Mar 12, 2025.',
    side: 'bottom',
    open: true,
    openDelay: 300
  },
  argTypes: {
    trigger: {
      control: 'text',
      description: 'Sobre qué se pasa el mouse.'
    },
    title: {
      control: 'text'
    },
    detail: {
      control: 'text'
    },
    side: {
      control: 'inline-radio',
      options: ['top', 'right', 'bottom', 'left']
    },
    open: {
      control: 'boolean',
      description: 'Abierta fija. Apagado: aparece al pasar el mouse, después de la demora.'
    },
    openDelay: {
      control: {
        type: 'range',
        min: 0,
        max: 1000,
        step: 50
      },
      description: 'Demora en ms: pasar de largo no la abre.'
    }
  },
  render: ({
    trigger,
    title,
    detail,
    side,
    open,
    openDelay
  }) => <div className="p-24">
      <HoverCard key={\`\${open}-\${openDelay}\`} defaultOpen={open} openDelay={openDelay}>
        <HoverCardTrigger asChild><a className="text-dash-blue cursor-pointer text-sm font-medium">{trigger}</a></HoverCardTrigger>
        <HoverCardContent side={side}>
          <p className="text-sm font-bold">{title}</p>
          <p className="mt-1 text-xs leading-relaxed text-ink-muted">{detail}</p>
        </HoverCardContent>
      </HoverCard>
    </div>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div className="p-24">
      <HoverCard defaultOpen>
        <HoverCardTrigger asChild><a className="text-dash-blue cursor-pointer text-sm font-medium">Sarah Stone</a></HoverCardTrigger>
        <HoverCardContent>
          <p className="text-sm font-bold">Sarah Stone</p>
          <p className="text-xs text-ink-muted">DOB 04/02/1991 · Patient ID 12345432</p>
        </HoverCardContent>
      </HoverCard>
    </div>
}`,...l.parameters?.docs?.source}}}})))()}d();export{l as Default,c as Playground,u as __namedExportsOrder,s as default};