import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{n as t,t as n}from"./preload-helper-wdlQj8DP.js";import{t as r}from"./react-BZJXY1be.js";import{t as i}from"./jsx-runtime-DeHZSEgm.js";import{a,i as o,r as s}from"./PatientSidePanel-Q5gINGGT.js";import{a as c,i as l}from"./Topbar-CZb0QMsL.js";import{i as u,r as d}from"./Sidebar-5k8ORhY7.js";import{O as f,P as p,_ as m,y as h}from"./iframe-zKYdGUCs.js";import{n as g,t as _}from"./HelpProvider-BxrcGXbo.js";import{n as v,r as y}from"./decorators-N1uhO7v5.js";import{n as b,t as x}from"./notificaciones-D7aqeU5N.js";async function S(e,t){let{within:r}=await n(async()=>{let{within:e}=await import(__STORYBOOK_MODULE_TEST__);return{within:e}},[],import.meta.url);await r(e.ownerDocument.body).findAllByText(t)}function C({expanded:e,route:t,tooltip:n,settingsMenu:r}){let[i,a]=(0,T.useState)(e);return(0,E.jsx)(f,{initialEntries:[t],children:(0,E.jsx)(_,{children:(0,E.jsx)(m,{children:(0,E.jsxs)(`div`,{className:`flex h-svh bg-page-background`,children:[(0,E.jsx)(d,{expanded:i,onClose:()=>a(!1),tooltipAbierto:n,settingsAbierto:r}),(0,E.jsxs)(`div`,{className:`flex min-w-0 flex-1 flex-col`,children:[(0,E.jsx)(l,{expanded:i,onToggleSidebar:()=>a(e=>!e),notificaciones:x}),(0,E.jsx)(`div`,{className:`flex-1 p-8`,children:(0,E.jsxs)(`div`,{className:`max-w-[520px] rounded-lg border border-line-row bg-white p-5 text-[13px] text-ink-medium`,children:[(0,E.jsxs)(`p`,{className:`text-[14px] font-semibold text-ink`,children:[`Menu `,i?`expanded`:`collapsed`]}),(0,E.jsxs)(`ul`,{className:`mt-2 flex list-disc flex-col gap-1 pl-5`,children:[(0,E.jsxs)(`li`,{children:[`The button left of the greeting `,i?`collapses`:`expands`,` the menu.`]}),!i&&(0,E.jsx)(`li`,{children:`Hover an icon to see its name.`}),(0,E.jsx)(`li`,{children:`Hover Settings, at the bottom, to open its menu.`})]})]})})]})]})})})})}function w(){return(0,E.jsx)(f,{initialEntries:[`/patients/patient-0001`],children:(0,E.jsx)(_,{children:(0,E.jsx)(m,{children:(0,E.jsxs)(`div`,{className:`flex min-h-svh gap-5 bg-page-background p-6`,children:[(0,E.jsx)(s,{name:`Sarah Stone`,initials:`SS`,section:`Dashboard`,basePath:`/patients/patient-0001`}),(0,E.jsx)(`div`,{className:`flex-1 rounded-lg border border-line-row bg-white p-5 text-[13px] text-ink-medium`,children:`The patient’s content uses the width the menu frees when it collapses.`})]})})})})}var T,E,D,O,k,A,j,M,N,P;function F(){return(F=e((()=>{T=r(),p(),u(),c(),o(),h(),b(),y(),g(),E=i(),t(),D={title:`Elements/Navigation`,parameters:{layout:`fullscreen`,router:!1,docs:{story:{inline:!1,iframeHeight:640},description:{component:[`**Menú lateral (rail).** Colapsado mide 58px y muestra sólo íconos; expandido mide 234px con los nombres. Se abre y se cierra con el botón de la barra de arriba (⟨ ⟩, a la izquierda del saludo).`,``,`- **Colapsado:** al pasar el mouse por un ícono aparece su nombre en un tooltip a la derecha (a los 100 ms).`,`- **Expandido:** no hay tooltips, el nombre ya se ve.`,`- **Ítem activo:** azul con texto blanco, según la pantalla en la que estás.`,`- **Settings:** queda abajo, en el mismo lugar colapsado y expandido. Al pasar el mouse abre un menú flotante con sus secciones.`,`- **En el celular:** el menú es un panel que tapa el contenido y se cierra solo al elegir una pantalla.`,``,`**Menú del paciente.** En las pantallas de un paciente, el panel de la izquierda (218px) se colapsa a 60px con el botón de arriba del panel; colapsado muestra sólo íconos, con tooltip. Queda colapsado al pasar de una sección del paciente a otra. Sólo colapsa desde 1024px de ancho.`,``,`**Probalo:** en *Sidebar* usá el botón de la barra de arriba o el control *expanded*; pasá el mouse por los íconos y por Settings.`].join(`
`)}}},args:{expanded:!1,route:`/patients`},argTypes:{tooltip:{table:{disable:!0}},settingsMenu:{table:{disable:!0}},expanded:{control:`boolean`,description:`Rail expandido (234px) o colapsado (58px).`},route:{control:`select`,options:[`/`,`/patients`,`/scheduling`,`/billing`,`/settings/accounts`,`/help`],description:`Pantalla actual: define el ítem activo.`}}},O={name:`Sidebar`,render:e=>(0,E.jsx)(C,{...e},`${e.expanded}-${e.route}`)},k={name:`Collapsed: tooltip on hover`,args:{expanded:!1,tooltip:`Scheduling`},parameters:{controls:{include:[`route`]}},render:e=>(0,E.jsx)(C,{...e},`${e.expanded}-${e.route}`),play:async({canvasElement:e})=>{let{within:t,expect:r}=await n(async()=>{let{within:e,expect:t}=await import(__STORYBOOK_MODULE_TEST__);return{within:e,expect:t}},[],import.meta.url);await r(await t(e.ownerDocument.body).findByRole(`tooltip`)).toHaveTextContent(`Scheduling`)}},A={name:`Settings menu`,args:{expanded:!1,route:`/settings/accounts`,settingsMenu:!0},parameters:{controls:{include:[`expanded`]}},render:e=>(0,E.jsx)(C,{...e},`${e.expanded}-${e.route}`),play:async({canvasElement:e})=>S(e,/^Locations$/)},j={args:{expanded:!0,route:`/scheduling`},render:e=>(0,E.jsx)(C,{...e},`${e.expanded}-${e.route}`)},M={name:`Patient menu: expanded`,parameters:{controls:{disable:!0}},decorators:[v],loaders:[async()=>(a(!1),{})],render:()=>(0,E.jsx)(w,{})},N={name:`Patient menu: collapsed`,parameters:{controls:{disable:!0}},decorators:[v],loaders:[async()=>(a(!0),{})],render:()=>(0,E.jsx)(w,{})},P=[`Sidebar_`,`CollapsedTooltip`,`SettingsMenu`,`Expanded`,`PatientMenu`,`PatientMenuCollapsed`],O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:"{\n  name: 'Sidebar',\n  render: args => <Marco key={`${args.expanded}-${args.route}`} {...args} />\n}",...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    expanded: true,
    route: '/scheduling'
  },
  render: args => <Marco key={\`\${args.expanded}-\${args.route}\`} {...args} />
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  name: 'Patient menu: expanded',
  parameters: {
    controls: {
      disable: true
    }
  },
  decorators: [conPacientes],
  loaders: [async () => {
    setPatientMenuCollapsed(false);
    return {};
  }],
  render: () => <Paciente />
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'Patient menu: collapsed',
  parameters: {
    controls: {
      disable: true
    }
  },
  decorators: [conPacientes],
  loaders: [async () => {
    setPatientMenuCollapsed(true);
    return {};
  }],
  render: () => <Paciente />
}`,...N.parameters?.docs?.source}}}})))()}F();export{k as CollapsedTooltip,j as Expanded,M as PatientMenu,N as PatientMenuCollapsed,A as SettingsMenu,O as Sidebar_,P as __namedExportsOrder,D as default};