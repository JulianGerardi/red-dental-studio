import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{_n as n,yn as r}from"./iframe-DIYF8Gpw.js";import{a as i,c as a,d as o,i as s,l as c,n as l,o as u,r as d,s as f,t as p,u as m}from"./dialog-OXKFAy0o.js";var h,g,_,v,y,b;function x(){return(x=e((()=>{o(),r(),h=t(),g={title:`Components/UI/Dialog`,component:p,parameters:{layout:`centered`,docs:{description:{component:`Una ventana para confirmar o completar algo antes de seguir. **Probalo** en *Playground*: pregunta, explicación, acción, tono y botón Close. Se cierra con Escape, con Close o con la acción.`}}}},_={args:{title:`Discard changes?`,description:`Your edits to this template will be lost.`,confirmLabel:`Discard`,tone:`destructive`,showCloseButton:!0,open:!0},argTypes:{title:{control:`text`,description:`La pregunta que hay que responder.`},description:{control:`text`,description:`Qué pasa si se confirma.`},confirmLabel:{control:`text`,description:`El verbo de la acción, no "OK".`},tone:{control:`inline-radio`,options:[`primary`,`destructive`],description:`destructive si borra o descarta.`},showCloseButton:{control:`boolean`,description:`Botón Close al lado de la acción.`},open:{control:`boolean`,description:`Abierto al cargar. Apagado: se abre con el botón.`}},parameters:{docs:{story:{inline:!1,iframeHeight:420}}},render:({title:e,description:t,confirmLabel:r,tone:a,showCloseButton:o,open:f})=>(0,h.jsxs)(p,{defaultOpen:f,children:[(0,h.jsx)(m,{asChild:!0,children:(0,h.jsx)(n,{children:`Open dialog`})}),(0,h.jsxs)(d,{children:[(0,h.jsxs)(u,{children:[(0,h.jsx)(c,{children:e}),(0,h.jsx)(s,{children:t})]}),(0,h.jsx)(i,{showCloseButton:o,children:(0,h.jsx)(l,{asChild:!0,children:(0,h.jsx)(n,{variant:a,children:r})})})]})]},String(f))},v={render:()=>(0,h.jsxs)(p,{children:[(0,h.jsx)(m,{asChild:!0,children:(0,h.jsx)(n,{children:`Open dialog`})}),(0,h.jsxs)(d,{children:[(0,h.jsxs)(u,{children:[(0,h.jsx)(c,{children:`Discard changes?`}),(0,h.jsx)(s,{children:`Your edits to this template will be lost.`})]}),(0,h.jsx)(i,{showCloseButton:!0,children:(0,h.jsx)(n,{variant:`destructive`,children:`Discard`})})]})]})},y={render:()=>(0,h.jsx)(p,{defaultOpen:!0,children:(0,h.jsxs)(a,{children:[(0,h.jsx)(f,{}),(0,h.jsxs)(d,{showCloseButton:!1,children:[(0,h.jsxs)(u,{children:[(0,h.jsx)(c,{children:`Custom dialog`}),(0,h.jsx)(s,{children:`Built from Portal, Overlay and Close.`})]}),(0,h.jsx)(l,{asChild:!0,children:(0,h.jsx)(n,{variant:`secondary`,children:`Close`})})]})]})})},b=[`Playground`,`Default`,`ManualComposition`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Discard changes?',
    description: 'Your edits to this template will be lost.',
    confirmLabel: 'Discard',
    tone: 'destructive',
    showCloseButton: true,
    open: true
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'La pregunta que hay que responder.'
    },
    description: {
      control: 'text',
      description: 'Qué pasa si se confirma.'
    },
    confirmLabel: {
      control: 'text',
      description: 'El verbo de la acción, no "OK".'
    },
    tone: {
      control: 'inline-radio',
      options: ['primary', 'destructive'],
      description: 'destructive si borra o descarta.'
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Botón Close al lado de la acción.'
    },
    open: {
      control: 'boolean',
      description: 'Abierto al cargar. Apagado: se abre con el botón.'
    }
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 420
      }
    }
  },
  render: ({
    title,
    description,
    confirmLabel,
    tone,
    showCloseButton,
    open
  }) => <Dialog key={String(open)} defaultOpen={open}>
      <DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton={showCloseButton}>
          <DialogClose asChild><Button variant={tone}>{confirmLabel}</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Discard changes?</DialogTitle>
          <DialogDescription>Your edits to this template will be lost.</DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <Button variant="destructive">Discard</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog defaultOpen>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Custom dialog</DialogTitle>
            <DialogDescription>Built from Portal, Overlay and Close.</DialogDescription>
          </DialogHeader>
          <DialogClose asChild><Button variant="secondary">Close</Button></DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
}`,...y.parameters?.docs?.source}}}})))()}x();export{v as Default,y as ManualComposition,_ as Playground,b as __namedExportsOrder,g as default};