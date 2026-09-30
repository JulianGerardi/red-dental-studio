import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./pantalla-Bw3qxPUT.js";import{dt as i,ut as a}from"./iframe-CcTqTd_m.js";function o({screen:e,expanded:t,preview:n={}}){return(0,s.jsx)(a.Provider,{value:{...n,expanded:t},children:(0,s.jsx)(r,{ruta:c[e]},`${e}-${t}`)})}var s,c,l,u,d,f,p,m,h,g,_,v;function y(){return(y=e((()=>{i(),n(),s=t(),c={Dashboard:`/`,Patients:`/patients`,Scheduling:`/scheduling`,Billing:`/billing`,Help:`/help`,"Settings / Accounts":`/settings/accounts`},l={title:`Elements/Navigation`,parameters:{layout:`fullscreen`,router:!1,docs:{decisionsFrom:`components/layout/Sidebar.tsx`,story:{inline:!1,iframeHeight:720},description:{component:["**Menú lateral (rail)** (`Sidebar`, dentro de `AppShell`). Colapsado mide 58px y muestra sólo íconos; expandido mide 234px con los nombres. Se abre y se cierra con el botón de la barra de arriba, a la izquierda del saludo.",``,`- **Colapsado:** al pasar el mouse por un ícono aparece su nombre en un tooltip a la derecha.`,`- **Expandido:** no hay tooltips, el nombre ya se ve.`,`- **Ítem activo:** azul con texto blanco, según la pantalla en la que estás.`,`- **Settings:** queda abajo, en el mismo lugar colapsado y expandido. Al pasar el mouse abre un menú flotante con sus secciones.`,`- **En el celular:** el menú es un panel que tapa el contenido y se cierra solo al elegir una pantalla.`,``,`El menú del paciente está en *Elements / Patient menu*.`,``,`**Probalo:** en *Playground* elegí la pantalla y usá el botón de la barra de arriba; pasá el mouse por los íconos y por Settings.`].join(`
`)}}},args:{screen:`Dashboard`,expanded:!1},argTypes:{screen:{control:`select`,options:Object.keys(c),description:`Pantalla abierta: define el ítem activo.`},expanded:{control:`boolean`,description:`Cómo arranca el menú. En la app se cambia con el botón de la barra de arriba.`},preview:{table:{disable:!0}}}},u=(e,t,n)=>({name:e,args:t,parameters:{docs:{disable:!0},controls:n?{include:n}:{disable:!0}},render:e=>(0,s.jsx)(o,{...e})}),d={render:e=>(0,s.jsx)(o,{...e})},f=u(`Collapsed`,{expanded:!1},[`screen`]),p=u(`Expanded`,{expanded:!0},[`screen`]),m=u(`Collapsed: tooltip on hover`,{preview:{tooltip:`Scheduling`}}),h=u(`Settings menu`,{screen:`Settings / Accounts`,preview:{settingsMenu:!0}}),g=u(`Active item`,{screen:`Scheduling`,expanded:!0},[`screen`,`expanded`]),_={...u(`On a phone`,{screen:`Dashboard`,expanded:!0},[`screen`]),globals:{viewport:{value:`mobile2`,isRotated:!1}}},v=[`Playground`,`Collapsed`,`Expanded`,`CollapsedTooltip`,`SettingsMenu`,`ActiveItem`,`Phone`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => <Pantalla {...args} />
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`historia('Collapsed', {
  expanded: false
}, ['screen'])`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`historia('Expanded', {
  expanded: true
}, ['screen'])`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`historia('Collapsed: tooltip on hover', {
  preview: {
    tooltip: 'Scheduling'
  }
})`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`historia('Settings menu', {
  screen: 'Settings / Accounts',
  preview: {
    settingsMenu: true
  }
})`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`historia('Active item', {
  screen: 'Scheduling',
  expanded: true
}, ['screen', 'expanded'])`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  ...historia('On a phone', {
    screen: 'Dashboard',
    expanded: true
  }, ['screen']),
  globals: {
    viewport: {
      value: 'mobile2',
      isRotated: false
    }
  }
}`,..._.parameters?.docs?.source}}}})))()}y();export{g as ActiveItem,f as Collapsed,m as CollapsedTooltip,p as Expanded,_ as Phone,d as Playground,h as SettingsMenu,v as __namedExportsOrder,l as default};