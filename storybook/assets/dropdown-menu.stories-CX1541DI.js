import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,c as r,d as i,f as a,g as o,h as s,i as c,l,m as u,n as d,o as f,p,r as m,s as h,t as g,u as _}from"./dropdown-menu-2J7FXUYb.js";import{a as v,r as y}from"./button-Cb-S0EUF.js";var b,x,S,C,w,T;function E(){return(E=e((()=>{o(),v(),b=t(),x={title:`Components/UI/DropdownMenu`,component:g},S={render:()=>(0,b.jsx)(`div`,{className:`h-64 w-64`,children:(0,b.jsxs)(g,{defaultOpen:!0,children:[(0,b.jsx)(s,{asChild:!0,children:(0,b.jsx)(y,{variant:`secondary`,children:`My Account`})}),(0,b.jsxs)(m,{className:`w-52`,children:[(0,b.jsx)(f,{children:`My Account`}),(0,b.jsx)(_,{}),(0,b.jsxs)(n,{children:[`Profile `,(0,b.jsx)(i,{children:`⇧P`})]}),(0,b.jsx)(n,{children:`Support`}),(0,b.jsx)(d,{checked:!0,children:`Notifications`}),(0,b.jsx)(_,{}),(0,b.jsx)(n,{variant:`destructive`,children:`Log out`})]})]})})},C={render:()=>(0,b.jsx)(`div`,{className:`h-64 w-64`,children:(0,b.jsxs)(g,{defaultOpen:!0,children:[(0,b.jsx)(s,{asChild:!0,children:(0,b.jsx)(y,{variant:`secondary`,children:`Actions`})}),(0,b.jsxs)(m,{className:`w-52`,children:[(0,b.jsx)(n,{children:`Edit`}),(0,b.jsx)(n,{disabled:!0,children:`Cancel (disabled - started)`}),(0,b.jsx)(d,{disabled:!0,checked:!0,children:`Notifications (disabled)`})]})]})})},w={render:()=>(0,b.jsx)(`div`,{className:`h-72 w-72`,children:(0,b.jsxs)(g,{defaultOpen:!0,children:[(0,b.jsx)(s,{asChild:!0,children:(0,b.jsx)(y,{variant:`secondary`,children:`View`})}),(0,b.jsxs)(m,{className:`w-56`,children:[(0,b.jsxs)(c,{children:[(0,b.jsx)(f,{children:`Sort by`}),(0,b.jsxs)(r,{value:`date`,children:[(0,b.jsx)(l,{value:`date`,children:`Date`}),(0,b.jsx)(l,{value:`name`,children:`Name`})]})]}),(0,b.jsx)(_,{}),(0,b.jsxs)(a,{children:[(0,b.jsx)(u,{children:`More`}),(0,b.jsx)(h,{children:(0,b.jsx)(p,{children:(0,b.jsx)(n,{children:`Export…`})})})]})]})]})})},T=[`Default`,`DisabledItem`,`GroupsRadioAndSubmenu`],S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div className="h-64 w-64">
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild><Button variant="secondary">My Account</Button></DropdownMenuTrigger>
        <DropdownMenuContent className="w-52">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile <DropdownMenuShortcut>⇧P</DropdownMenuShortcut></DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuCheckboxItem checked>Notifications</DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div className="h-64 w-64">
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild><Button variant="secondary">Actions</Button></DropdownMenuTrigger>
        <DropdownMenuContent className="w-52">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem disabled>Cancel (disabled - started)</DropdownMenuItem>
          <DropdownMenuCheckboxItem disabled checked>Notifications (disabled)</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <div className="h-72 w-72">
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild><Button variant="secondary">View</Button></DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuRadioGroup value="date">
              <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent><DropdownMenuItem>Export…</DropdownMenuItem></DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
}`,...w.parameters?.docs?.source}}}})))()}E();export{S as Default,C as DisabledItem,w as GroupsRadioAndSubmenu,T as __namedExportsOrder,x as default};