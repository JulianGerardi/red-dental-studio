import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./preload-helper-wdlQj8DP.js";import{t as r}from"./react-BZJXY1be.js";import{t as i}from"./jsx-runtime-DeHZSEgm.js";import{a,i as o}from"./Topbar-D-xY9sLQ.js";import{i as s,r as c}from"./Sidebar-BaqySqe1.js";import{O as l,P as u,_ as d,y as f}from"./iframe-BVKuPa81.js";import{n as p,t as m}from"./HelpProvider-CrnDAzu4.js";import{n as h,t as g}from"./notificaciones-D7aqeU5N.js";async function _(e,t){let{within:r}=await n(async()=>{let{within:e}=await import(__STORYBOOK_MODULE_TEST__);return{within:e}},[],import.meta.url);await r(e.ownerDocument.body).findAllByText(t)}function v({expanded:e,route:t,tooltip:n,settingsMenu:r}){let[i,a]=(0,y.useState)(e);return(0,b.jsx)(l,{initialEntries:[t],children:(0,b.jsx)(m,{children:(0,b.jsx)(d,{children:(0,b.jsxs)(`div`,{className:`flex h-svh bg-page-background`,children:[(0,b.jsx)(c,{expanded:i,onClose:()=>a(!1),tooltipAbierto:n,settingsAbierto:r}),(0,b.jsxs)(`div`,{className:`flex min-w-0 flex-1 flex-col`,children:[(0,b.jsx)(o,{expanded:i,onToggleSidebar:()=>a(e=>!e),notificaciones:g}),(0,b.jsx)(`div`,{className:`flex-1 p-8`,children:(0,b.jsxs)(`div`,{className:`max-w-[520px] rounded-lg border border-line-row bg-white p-5 text-[13px] text-ink-medium`,children:[(0,b.jsxs)(`p`,{className:`text-[14px] font-semibold text-ink`,children:[`Menu `,i?`expanded`:`collapsed`]}),(0,b.jsxs)(`ul`,{className:`mt-2 flex list-disc flex-col gap-1 pl-5`,children:[(0,b.jsxs)(`li`,{children:[`The button left of the greeting `,i?`collapses`:`expands`,` the menu.`]}),!i&&(0,b.jsx)(`li`,{children:`Hover an icon to see its name.`}),(0,b.jsx)(`li`,{children:`Hover Settings, at the bottom, to open its menu.`})]})]})})]})]})})})})}var y,b,x,S,C,w,T,E;function D(){return(D=e((()=>{y=r(),u(),s(),a(),f(),h(),p(),b=i(),t(),x={title:`Elements/Navigation`,parameters:{layout:`fullscreen`,router:!1,docs:{story:{inline:!1,iframeHeight:640},description:{component:[`**Menú lateral (rail).** Colapsado mide 58px y muestra sólo íconos; expandido mide 234px con los nombres. Se abre y se cierra con el botón de la barra de arriba (⟨ ⟩, a la izquierda del saludo).`,``,`- **Colapsado:** al pasar el mouse por un ícono aparece su nombre en un tooltip a la derecha (a los 100 ms).`,`- **Expandido:** no hay tooltips, el nombre ya se ve.`,`- **Ítem activo:** azul con texto blanco, según la pantalla en la que estás.`,`- **Settings:** queda abajo, en el mismo lugar colapsado y expandido. Al pasar el mouse abre un menú flotante con sus secciones.`,`- **En el celular:** el menú es un panel que tapa el contenido y se cierra solo al elegir una pantalla.`,``,`**Menú del paciente:** está en *Elements / Patient menu*, con todas sus vistas.`,``,`**Probalo:** en *Sidebar* usá el botón de la barra de arriba o el control *expanded*; pasá el mouse por los íconos y por Settings.`].join(`
`)}}},args:{expanded:!1,route:`/patients`},argTypes:{tooltip:{table:{disable:!0}},settingsMenu:{table:{disable:!0}},expanded:{control:`boolean`,description:`Rail expandido (234px) o colapsado (58px).`},route:{control:`select`,options:[`/`,`/patients`,`/scheduling`,`/billing`,`/settings/accounts`,`/help`],description:`Pantalla actual: define el ítem activo.`}}},S={name:`Sidebar`,render:e=>(0,b.jsx)(v,{...e},`${e.expanded}-${e.route}`)},C={name:`Collapsed: tooltip on hover`,args:{expanded:!1,tooltip:`Scheduling`},parameters:{controls:{include:[`route`]}},render:e=>(0,b.jsx)(v,{...e},`${e.expanded}-${e.route}`),play:async({canvasElement:e})=>{let{within:t,expect:r}=await n(async()=>{let{within:e,expect:t}=await import(__STORYBOOK_MODULE_TEST__);return{within:e,expect:t}},[],import.meta.url);await r(await t(e.ownerDocument.body).findByRole(`tooltip`)).toHaveTextContent(`Scheduling`)}},w={name:`Settings menu`,args:{expanded:!1,route:`/settings/accounts`,settingsMenu:!0},parameters:{controls:{include:[`expanded`]}},render:e=>(0,b.jsx)(v,{...e},`${e.expanded}-${e.route}`),play:async({canvasElement:e})=>_(e,/^Locations$/)},T={args:{expanded:!0,route:`/scheduling`},render:e=>(0,b.jsx)(v,{...e},`${e.expanded}-${e.route}`)},E=[`Sidebar_`,`CollapsedTooltip`,`SettingsMenu`,`Expanded`],S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:"{\n  name: 'Sidebar',\n  render: args => <Marco key={`${args.expanded}-${args.route}`} {...args} />\n}",...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Collapsed: tooltip on hover',
  args: {
    expanded: false,
    tooltip: 'Scheduling'
  },
  parameters: {
    controls: {
      include: ['route']
    }
  },
  /* El tooltip de Scheduling queda abierto para verlo; en los demás ítems
     aparece al pasar el mouse. */
  render: args => <Marco key={\`\${args.expanded}-\${args.route}\`} {...args} />,
  play: async ({
    canvasElement
  }) => {
    const {
      within,
      expect
    } = await import('storybook/test');
    await expect(await within(canvasElement.ownerDocument.body).findByRole('tooltip')).toHaveTextContent('Scheduling');
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Settings menu',
  args: {
    expanded: false,
    route: '/settings/accounts',
    settingsMenu: true
  },
  parameters: {
    controls: {
      include: ['expanded']
    }
  },
  /* El menú queda abierto para verlo; en la app abre al pasar el mouse. */
  render: args => <Marco key={\`\${args.expanded}-\${args.route}\`} {...args} />,
  play: async ({
    canvasElement
  }) => aparece(canvasElement, /^Locations$/)
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    expanded: true,
    route: '/scheduling'
  },
  render: args => <Marco key={\`\${args.expanded}-\${args.route}\`} {...args} />
}`,...T.parameters?.docs?.source}}}})))()}D();export{C as CollapsedTooltip,T as Expanded,w as SettingsMenu,S as Sidebar_,E as __namedExportsOrder,x as default};