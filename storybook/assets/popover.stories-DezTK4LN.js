import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,c as r,i,n as a,o,r as s,s as c,t as l}from"./popover-BhBsc-cK.js";import{fn as u,mn as d}from"./iframe-DGqv2Yie.js";var f,p,m,h,g,_;function v(){return(v=e((()=>{r(),d(),f=t(),p={title:`Components/UI/Popover`,component:l,parameters:{docs:{description:{component:`Un panel chico que se abre al lado de un botón y queda abierto hasta cerrarlo. **Probalo** en *Playground*: contenido, lado, alineación y ancho.`}}}},m={args:{title:`Patient information`,description:`General and contact data, readable without leaving the screen.`,side:`right`,align:`start`,open:!0,width:288},argTypes:{title:{control:`text`},description:{control:`text`},side:{control:`inline-radio`,options:[`top`,`right`,`bottom`,`left`]},align:{control:`inline-radio`,options:[`start`,`center`,`end`],description:`Cómo se alinea con el botón.`},open:{control:`boolean`,description:`Abierto fijo. Apagado: se abre con clic y se cierra con Escape o clic afuera.`},width:{control:{type:`range`,min:200,max:420,step:8},description:`Ancho en px (288 por defecto).`}},render:({title:e,description:t,side:r,align:a,open:d,width:p})=>(0,f.jsx)(`div`,{className:`p-24`,children:(0,f.jsxs)(l,{defaultOpen:d,children:[(0,f.jsx)(c,{asChild:!0,children:(0,f.jsx)(u,{variant:`secondary`,children:`Open`})}),(0,f.jsx)(s,{side:r,align:a,style:{width:p},children:(0,f.jsxs)(n,{children:[(0,f.jsx)(o,{children:e}),(0,f.jsx)(i,{children:t})]})})]},String(d))})},h={render:()=>(0,f.jsx)(`div`,{className:`p-24`,children:(0,f.jsxs)(l,{defaultOpen:!0,children:[(0,f.jsx)(c,{asChild:!0,children:(0,f.jsx)(u,{variant:`secondary`,children:`Open`})}),(0,f.jsx)(s,{children:(0,f.jsxs)(n,{children:[(0,f.jsx)(o,{children:`Dimensions`}),(0,f.jsx)(i,{children:`Set the dimensions for the layer.`})]})})]})})},g={render:()=>(0,f.jsx)(`div`,{className:`p-24`,children:(0,f.jsxs)(l,{open:!0,children:[(0,f.jsx)(a,{asChild:!0,children:(0,f.jsx)(`div`,{className:`h-10 w-48 rounded-md border border-dashed border-line-strong bg-surface-subtle p-2 text-xs`,children:`Anchor`})}),(0,f.jsxs)(s,{children:[(0,f.jsx)(o,{children:`Anchored`}),(0,f.jsx)(i,{children:`Positioned against the dashed box.`})]})]})})},_=[`Playground`,`Default`,`AnchoredElsewhere`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Patient information',
    description: 'General and contact data, readable without leaving the screen.',
    side: 'right',
    align: 'start',
    open: true,
    width: 288
  },
  argTypes: {
    title: {
      control: 'text'
    },
    description: {
      control: 'text'
    },
    side: {
      control: 'inline-radio',
      options: ['top', 'right', 'bottom', 'left']
    },
    align: {
      control: 'inline-radio',
      options: ['start', 'center', 'end'],
      description: 'Cómo se alinea con el botón.'
    },
    open: {
      control: 'boolean',
      description: 'Abierto fijo. Apagado: se abre con clic y se cierra con Escape o clic afuera.'
    },
    width: {
      control: {
        type: 'range',
        min: 200,
        max: 420,
        step: 8
      },
      description: 'Ancho en px (288 por defecto).'
    }
  },
  render: ({
    title,
    description,
    side,
    align,
    open,
    width
  }) => <div className="p-24">
      <Popover key={String(open)} defaultOpen={open}>
        <PopoverTrigger asChild><Button variant="secondary">Open</Button></PopoverTrigger>
        <PopoverContent side={side} align={align} style={{
        width
      }}>
          <PopoverHeader>
            <PopoverTitle>{title}</PopoverTitle>
            <PopoverDescription>{description}</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className="p-24">
      <Popover defaultOpen>
        <PopoverTrigger asChild><Button variant="secondary">Open</Button></PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div className="p-24">
      <Popover open>
        <PopoverAnchor asChild><div className="h-10 w-48 rounded-md border border-dashed border-line-strong bg-surface-subtle p-2 text-xs">Anchor</div></PopoverAnchor>
        <PopoverContent><PopoverTitle>Anchored</PopoverTitle><PopoverDescription>Positioned against the dashed box.</PopoverDescription></PopoverContent>
      </Popover>
    </div>
}`,...g.parameters?.docs?.source}}}})))()}v();export{g as AnchoredElsewhere,h as Default,m as Playground,_ as __namedExportsOrder,p as default};