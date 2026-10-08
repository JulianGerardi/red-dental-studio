import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{i as r,t as i}from"./notificaciones-B3gtyhW3.js";import{c as a,i as o,l as s,s as c,t as l}from"./kit-VhBMbBcY.js";import{n as u,t as d}from"./NotificationBanner-Dce6xg4Z.js";function f({items:e}){let[t,n]=(0,m.useState)(0);return(0,h.jsx)(d,{items:e,cursor:t,onCursor:n,onOcultar:()=>{}})}function p(){let[e,t]=(0,m.useState)(0);return(0,h.jsxs)(`div`,{className:`bg-page-background pb-6`,children:[(0,h.jsx)(d,{items:i,cursor:e,onCursor:t,onOcultar:()=>{}}),(0,h.jsxs)(`div`,{className:`mx-auto w-full max-w-[1400px] px-6 pt-5`,children:[(0,h.jsx)(`p`,{className:`text-[20px] font-bold text-ink`,children:`Notifications`}),(0,h.jsx)(`p`,{className:`text-[13px] text-ink-muted`,children:`Mark each one as read, pending or unread, and archive what’s done.`})]})]})}var m,h,g,_,v,y,b,x,S,C,w;function T(){return(T=e((()=>{m=t(),s(),r(),u(),h=n(),g={title:`Components/Layout/NotificationBanner`,component:d,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:620},description:{component:[`El aviso de tareas pendientes arriba de cada pantalla (documentos para firmar, consentimientos). Julián eligió la **tarjeta**: el aviso ámbar del design system, del ancho de su contenido y alineado con la página, sin barra de punta a punta.`,``,`**Qué tiene:** ícono, la tarea y su detalle, Review, el paginador cuando hay más de una y la X para ocultarlo.`,``,`**Probalo:** en *Playground* pasá de tarea con las flechas.`].join(`
`)}}},args:{items:i,cursor:0,onCursor:()=>{},onOcultar:()=>{}}},_={render:e=>(0,h.jsx)(f,{items:e.items})},v={render:()=>(0,h.jsx)(f,{items:i.slice(0,1)})},y={render:()=>(0,h.jsxs)(`div`,{className:`border border-dashed border-line-strong p-4 text-[12px] text-ink-muted`,children:[(0,h.jsx)(d,{items:[],cursor:0,onCursor:()=>{},onOcultar:()=>{}}),`No banner is rendered when there are no pending tasks.`]})},b={render:()=>(0,h.jsx)(p,{})},x={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,h.jsx)(o,{children:(0,h.jsx)(l,{titulo:`Parts`,children:(0,h.jsxs)(c,{encabezado:[`Part`,`What it does`],minimo:560,children:[(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Icon`}),(0,h.jsx)(`td`,{children:`El tipo de tarea, en el color del aviso.`})]}),(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Title and detail`}),(0,h.jsx)(`td`,{children:`Qué hay que hacer y para quién, con cuándo se mandó.`})]}),(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Review`}),(0,h.jsx)(`td`,{children:`Lleva a la tarea.`})]}),(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Pager`}),(0,h.jsx)(`td`,{children:`1 of 4 con flechas; sólo con más de una tarea. Separado por una línea.`})]}),(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Close`}),(0,h.jsx)(`td`,{children:`Oculta el aviso.`})]})]})})})},S={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,h.jsx)(o,{children:(0,h.jsx)(l,{titulo:`States`,children:(0,h.jsxs)(c,{encabezado:[`State`,`When`,`Story`],minimo:560,children:[(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Several`}),(0,h.jsx)(`td`,{children:`Más de una tarea: paginador.`}),(0,h.jsx)(`td`,{children:`Playground`})]}),(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Single`}),(0,h.jsx)(`td`,{children:`Una tarea: sin paginador.`}),(0,h.jsx)(`td`,{children:`Single`})]}),(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Empty`}),(0,h.jsx)(`td`,{children:`Sin tareas: no se dibuja.`}),(0,h.jsx)(`td`,{children:`Empty`})]})]})})})},C={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,h.jsx)(o,{children:(0,h.jsx)(l,{titulo:`Specs`,children:(0,h.jsxs)(c,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Width`}),(0,h.jsx)(`td`,{children:`Del contenido (w-fit), dentro del ancho de página, alineado con el título.`})]}),(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Fill`}),(0,h.jsx)(`td`,{children:(0,h.jsx)(a,{nombre:`warn-bg`})})]}),(0,h.jsxs)(`tr`,{children:[(0,h.jsx)(`td`,{className:`font-semibold`,children:`Text and border`}),(0,h.jsx)(`td`,{children:(0,h.jsx)(a,{nombre:`warn-fg`})})]})]})})})},w=[`Playground`,`Single`,`Empty`,`OnPage`,`Parts`,`States`,`Specs`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: args => <Demo items={args.items} />
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Demo items={NOTIFICACIONES.slice(0, 1)} />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div className="border border-dashed border-line-strong p-4 text-[12px] text-ink-muted">
      <NotificationBanner items={[]} cursor={0} onCursor={() => {}} onOcultar={() => {}} />
      No banner is rendered when there are no pending tasks.
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Pagina />
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded',
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Parts">
        <Tabla encabezado={["Part", "What it does"]} minimo={560}>
          <tr><td className="font-semibold">Icon</td><td>El tipo de tarea, en el color del aviso.</td></tr>
          <tr><td className="font-semibold">Title and detail</td><td>Qué hay que hacer y para quién, con cuándo se mandó.</td></tr>
          <tr><td className="font-semibold">Review</td><td>Lleva a la tarea.</td></tr>
          <tr><td className="font-semibold">Pager</td><td>1 of 4 con flechas; sólo con más de una tarea. Separado por una línea.</td></tr>
          <tr><td className="font-semibold">Close</td><td>Oculta el aviso.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded',
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="States">
        <Tabla encabezado={["State", "When", "Story"]} minimo={560}>
          <tr><td className="font-semibold">Several</td><td>Más de una tarea: paginador.</td><td>Playground</td></tr>
          <tr><td className="font-semibold">Single</td><td>Una tarea: sin paginador.</td><td>Single</td></tr>
          <tr><td className="font-semibold">Empty</td><td>Sin tareas: no se dibuja.</td><td>Empty</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded',
    controls: {
      disable: true
    },
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Specs">
        <Tabla encabezado={["Item", "Value"]} minimo={560}>
          <tr><td className="font-semibold">Width</td><td>Del contenido (w-fit), dentro del ancho de página, alineado con el título.</td></tr>
          <tr><td className="font-semibold">Fill</td><td><Token nombre="warn-bg" /></td></tr>
          <tr><td className="font-semibold">Text and border</td><td><Token nombre="warn-fg" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...C.parameters?.docs?.source}}}})))()}T();export{y as Empty,b as OnPage,x as Parts,_ as Playground,v as Single,C as Specs,S as States,w as __namedExportsOrder,g as default};