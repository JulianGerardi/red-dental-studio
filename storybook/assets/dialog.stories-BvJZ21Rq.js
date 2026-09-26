import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,c as r,d as i,i as a,l as o,n as s,o as c,r as l,s as u,t as d,u as f}from"./dialog-Blx6-jzY.js";import{a as p,r as m}from"./button-Cb-S0EUF.js";var h,g,_,v,y;function b(){return(b=e((()=>{i(),p(),h=t(),g={title:`Components/UI/Dialog`,component:d,parameters:{layout:`centered`}},_={render:()=>(0,h.jsxs)(d,{children:[(0,h.jsx)(f,{asChild:!0,children:(0,h.jsx)(m,{children:`Open dialog`})}),(0,h.jsxs)(l,{children:[(0,h.jsxs)(c,{children:[(0,h.jsx)(o,{children:`Discard changes?`}),(0,h.jsx)(a,{children:`Your edits to this template will be lost.`})]}),(0,h.jsx)(n,{showCloseButton:!0,children:(0,h.jsx)(m,{variant:`destructive`,children:`Discard`})})]})]})},v={render:()=>(0,h.jsx)(d,{defaultOpen:!0,children:(0,h.jsxs)(r,{children:[(0,h.jsx)(u,{}),(0,h.jsxs)(l,{showCloseButton:!1,children:[(0,h.jsxs)(c,{children:[(0,h.jsx)(o,{children:`Custom dialog`}),(0,h.jsx)(a,{children:`Built from Portal, Overlay and Close.`})]}),(0,h.jsx)(s,{asChild:!0,children:(0,h.jsx)(m,{variant:`secondary`,children:`Close`})})]})]})})},y=[`Default`,`ManualComposition`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}}})))()}b();export{_ as Default,v as ManualComposition,y as __namedExportsOrder,g as default};