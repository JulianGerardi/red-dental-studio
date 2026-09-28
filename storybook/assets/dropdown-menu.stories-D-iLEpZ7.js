import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,c as r,d as i,f as a,g as o,h as s,i as c,l,m as u,n as d,o as f,p,r as m,s as h,t as g,u as _}from"./dropdown-menu-Cp_CIA51.js";import{n as v,t as y}from"./ellipsis-vertical-CPfIlQ5Q.js";import{dt as b,pt as x}from"./iframe-CNOXh5vK.js";var S,C,w,T,E,D,O;function k(){return(k=e((()=>{o(),x(),v(),S=t(),C={title:`Components/UI/DropdownMenu`,component:g,parameters:{docs:{description:{component:`La lista de acciones que abre un botón: el ⋮ de cada fila, Columns, los filtros. **Probalo** en *Playground*: acciones, la que borra, una deshabilitada, casillas y alineación.`}}}},w={args:{trigger:`kebab`,items:`Edit, Duplicate, Download`,destructive:`Delete`,disabledItem:``,withCheckboxes:!1,align:`end`,open:!0},argTypes:{trigger:{control:`inline-radio`,options:[`kebab`,`button`],description:`kebab: el ⋮ de las filas · button: un botón con nombre.`},items:{control:`text`,description:`Acciones, separadas por coma.`},destructive:{control:`text`,description:`Acción que borra: va al final, en rojo y separada. Vacío = ninguna.`},disabledItem:{control:`text`,description:`Nombre de una acción que todavía no se puede usar.`},withCheckboxes:{control:`boolean`,description:`Opciones que se tildan sin cerrar el menú (filtros, columnas).`},align:{control:`inline-radio`,options:[`start`,`center`,`end`],description:`end para el ⋮ de las filas: abre hacia adentro de la tabla.`},open:{control:`boolean`,description:`Abierto al cargar.`}},render:({trigger:e,items:t,destructive:r,disabledItem:i,withCheckboxes:a,align:o,open:c})=>{let l=t.split(`,`).map(e=>e.trim()).filter(Boolean);return(0,S.jsx)(`div`,{className:`flex h-72 w-72 items-start justify-center pt-4`,children:(0,S.jsxs)(g,{defaultOpen:c,children:[(0,S.jsx)(s,{asChild:!0,children:e===`kebab`?(0,S.jsx)(`button`,{type:`button`,"aria-label":`Actions`,className:`flex size-8 items-center justify-center rounded-md text-ink hover:bg-surface-muted`,children:(0,S.jsx)(y,{className:`size-4`})}):(0,S.jsx)(b,{variant:`secondary`,children:`Actions`})}),(0,S.jsxs)(m,{align:o,className:`w-52`,children:[l.map(e=>(0,S.jsx)(n,{disabled:e===i.trim(),children:e},e)),a&&(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(_,{}),(0,S.jsx)(d,{checked:!0,onSelect:e=>e.preventDefault(),children:`Show inactive`}),(0,S.jsx)(d,{onSelect:e=>e.preventDefault(),children:`Only mine`})]}),r.trim()&&(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(_,{}),(0,S.jsx)(n,{variant:`destructive`,children:r})]})]})]},String(c))})}},T={render:()=>(0,S.jsx)(`div`,{className:`h-64 w-64`,children:(0,S.jsxs)(g,{defaultOpen:!0,children:[(0,S.jsx)(s,{asChild:!0,children:(0,S.jsx)(b,{variant:`secondary`,children:`My Account`})}),(0,S.jsxs)(m,{className:`w-52`,children:[(0,S.jsx)(f,{children:`My Account`}),(0,S.jsx)(_,{}),(0,S.jsxs)(n,{children:[`Profile `,(0,S.jsx)(i,{children:`⇧P`})]}),(0,S.jsx)(n,{children:`Support`}),(0,S.jsx)(d,{checked:!0,children:`Notifications`}),(0,S.jsx)(_,{}),(0,S.jsx)(n,{variant:`destructive`,children:`Log out`})]})]})})},E={render:()=>(0,S.jsx)(`div`,{className:`h-64 w-64`,children:(0,S.jsxs)(g,{defaultOpen:!0,children:[(0,S.jsx)(s,{asChild:!0,children:(0,S.jsx)(b,{variant:`secondary`,children:`Actions`})}),(0,S.jsxs)(m,{className:`w-52`,children:[(0,S.jsx)(n,{children:`Edit`}),(0,S.jsx)(n,{disabled:!0,children:`Cancel (disabled - started)`}),(0,S.jsx)(d,{disabled:!0,checked:!0,children:`Notifications (disabled)`})]})]})})},D={render:()=>(0,S.jsx)(`div`,{className:`h-72 w-72`,children:(0,S.jsxs)(g,{defaultOpen:!0,children:[(0,S.jsx)(s,{asChild:!0,children:(0,S.jsx)(b,{variant:`secondary`,children:`View`})}),(0,S.jsxs)(m,{className:`w-56`,children:[(0,S.jsxs)(c,{children:[(0,S.jsx)(f,{children:`Sort by`}),(0,S.jsxs)(r,{value:`date`,children:[(0,S.jsx)(l,{value:`date`,children:`Date`}),(0,S.jsx)(l,{value:`name`,children:`Name`})]})]}),(0,S.jsx)(_,{}),(0,S.jsxs)(a,{children:[(0,S.jsx)(u,{children:`More`}),(0,S.jsx)(h,{children:(0,S.jsx)(p,{children:(0,S.jsx)(n,{children:`Export…`})})})]})]})]})})},O=[`Playground`,`Default`,`DisabledItem`,`GroupsRadioAndSubmenu`],w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    trigger: 'kebab',
    items: 'Edit, Duplicate, Download',
    destructive: 'Delete',
    disabledItem: '',
    withCheckboxes: false,
    align: 'end',
    open: true
  },
  argTypes: {
    trigger: {
      control: 'inline-radio',
      options: ['kebab', 'button'],
      description: 'kebab: el ⋮ de las filas · button: un botón con nombre.'
    },
    items: {
      control: 'text',
      description: 'Acciones, separadas por coma.'
    },
    destructive: {
      control: 'text',
      description: 'Acción que borra: va al final, en rojo y separada. Vacío = ninguna.'
    },
    disabledItem: {
      control: 'text',
      description: 'Nombre de una acción que todavía no se puede usar.'
    },
    withCheckboxes: {
      control: 'boolean',
      description: 'Opciones que se tildan sin cerrar el menú (filtros, columnas).'
    },
    align: {
      control: 'inline-radio',
      options: ['start', 'center', 'end'],
      description: 'end para el ⋮ de las filas: abre hacia adentro de la tabla.'
    },
    open: {
      control: 'boolean',
      description: 'Abierto al cargar.'
    }
  },
  render: ({
    trigger,
    items,
    destructive,
    disabledItem,
    withCheckboxes,
    align,
    open
  }) => {
    const acciones = items.split(',').map(x => x.trim()).filter(Boolean);
    return <div className="flex h-72 w-72 items-start justify-center pt-4">
        <DropdownMenu key={String(open)} defaultOpen={open}>
          <DropdownMenuTrigger asChild>
            {trigger === 'kebab' ? <button type="button" aria-label="Actions" className="flex size-8 items-center justify-center rounded-md text-ink hover:bg-surface-muted"><MoreVertical className="size-4" /></button> : <Button variant="secondary">Actions</Button>}
          </DropdownMenuTrigger>
          <DropdownMenuContent align={align} className="w-52">
            {acciones.map(a => <DropdownMenuItem key={a} disabled={a === disabledItem.trim()}>{a}</DropdownMenuItem>)}
            {withCheckboxes && <>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked onSelect={e => e.preventDefault()}>Show inactive</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem onSelect={e => e.preventDefault()}>Only mine</DropdownMenuCheckboxItem>
              </>}
            {destructive.trim() && <>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">{destructive}</DropdownMenuItem>
              </>}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>;
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}}})))()}k();export{T as Default,E as DisabledItem,D as GroupsRadioAndSubmenu,w as Playground,O as __namedExportsOrder,C as default};