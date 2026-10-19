import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,o as i}from"./notificaciones-DOhTA4l5.js";import{c as a,d as o,i as s,t as c,u as l}from"./kit-CWUgB5-0.js";import{n as u,r as d}from"./notificacionesStore-DaCLdEac.js";import{n as f,t as p}from"./NotificationBanner-CFur9CX-.js";function m({items:e}){let[t,n]=(0,g.useState)(0);return(0,_.jsx)(p,{items:e,cursor:t,onCursor:n,onOcultar:()=>{}})}function h(){let[e,t]=(0,g.useState)(0);return(0,_.jsxs)(`div`,{className:`bg-page-background pb-6`,children:[(0,_.jsx)(p,{items:v,cursor:e,onCursor:t,onOcultar:()=>{}}),(0,_.jsxs)(`div`,{className:`mx-auto w-full max-w-[1400px] px-6 pt-5`,children:[(0,_.jsx)(`p`,{className:`text-[20px] font-bold text-ink`,children:`Notifications`}),(0,_.jsx)(`p`,{className:`text-[13px] text-ink-muted`,children:`Open one to go where it happened, or mark it as read or unread.`})]})]})}var g,_,v,y,b,x,S,C,w,T,E,D;function O(){return(O=e((()=>{g=t(),o(),i(),d(),f(),_=n(),v=u(r,[]),y={title:`Components/Layout/NotificationBanner`,component:p,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:620},description:{component:[`El aviso de tareas sin leer arriba de cada pantalla (documentos para firmar, derivaciones, llamados). Es la **tarjeta** ámbar del design system, de punta a punta del contenido de la página (Julián, 2026-10-13; antes iba del ancho de su texto).`,``,`**Cómo se ordena:** la tarea, Review y el paginador juntos a la izquierda; la X sola, a la derecha.`,``,`**Qué tiene:** ícono, la tarea y su detalle, Review, el paginador cuando hay más de una y la X para ocultarlo.`,``,`**Probalo:** en *Playground* pasá de tarea con las flechas.`].join(`
`)}}},args:{items:v,cursor:0,onCursor:()=>{},onOcultar:()=>{}}},b={render:e=>(0,_.jsx)(m,{items:e.items})},x={render:()=>(0,_.jsx)(m,{items:v.slice(0,1)})},S={render:()=>(0,_.jsxs)(`div`,{className:`border border-dashed border-line-strong p-4 text-[12px] text-ink-muted`,children:[(0,_.jsx)(p,{items:[],cursor:0,onCursor:()=>{},onOcultar:()=>{}}),`No banner is rendered when there are no pending tasks.`]})},C={render:()=>(0,_.jsx)(h,{})},w={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,_.jsx)(s,{children:(0,_.jsx)(c,{titulo:`Parts`,children:(0,_.jsxs)(a,{encabezado:[`Part`,`What it does`],minimo:560,children:[(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Icon`}),(0,_.jsx)(`td`,{children:`El tipo de tarea, en el color del aviso.`})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Title and detail`}),(0,_.jsx)(`td`,{children:`Qué hay que hacer y para quién, con cuándo se mandó.`})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Review`}),(0,_.jsx)(`td`,{children:`Lleva a la tarea.`})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Pager`}),(0,_.jsx)(`td`,{children:`1 of 4 con flechas; sólo con más de una tarea. Separado por una línea.`})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Close`}),(0,_.jsx)(`td`,{children:`Oculta esa tarea del banner; sigue sin leer en la campana y en Notifications. Va sola, en el extremo derecho.`})]})]})})})},T={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,_.jsx)(s,{children:(0,_.jsx)(c,{titulo:`States`,children:(0,_.jsxs)(a,{encabezado:[`State`,`When`,`Story`],minimo:560,children:[(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Several`}),(0,_.jsx)(`td`,{children:`Más de una tarea: paginador.`}),(0,_.jsx)(`td`,{children:`Playground`})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Single`}),(0,_.jsx)(`td`,{children:`Una tarea: sin paginador.`}),(0,_.jsx)(`td`,{children:`Single`})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Empty`}),(0,_.jsx)(`td`,{children:`Sin tareas: no se dibuja.`}),(0,_.jsx)(`td`,{children:`Empty`})]})]})})})},E={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,_.jsx)(s,{children:(0,_.jsx)(c,{titulo:`Specs`,children:(0,_.jsxs)(a,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Width`}),(0,_.jsx)(`td`,{children:`De punta a punta del contenido de la página (w-full dentro de ANCHO_PAGINA): alineado con el título y con las cards.`})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Order`}),(0,_.jsxs)(`td`,{children:[`Ícono, tarea, Review y paginador a la izquierda; la X con `,(0,_.jsx)(`code`,{children:`ml-auto`}),`, sola a la derecha.`]})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Fill`}),(0,_.jsx)(`td`,{children:(0,_.jsx)(l,{nombre:`warn-bg`})})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Text and border`}),(0,_.jsx)(`td`,{children:(0,_.jsx)(l,{nombre:`warn-fg`})})]})]})})})},D=[`Playground`,`Single`,`Empty`,`OnPage`,`Parts`,`States`,`Specs`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: args => <Demo items={args.items} />
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <Demo items={TAREAS.slice(0, 1)} />
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div className="border border-dashed border-line-strong p-4 text-[12px] text-ink-muted">
      <NotificationBanner items={[]} cursor={0} onCursor={() => {}} onOcultar={() => {}} />
      No banner is rendered when there are no pending tasks.
    </div>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <Pagina />
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
          <tr><td className="font-semibold">Close</td><td>Oculta esa tarea del banner; sigue sin leer en la campana y en Notifications. Va sola, en el extremo derecho.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
          <tr><td className="font-semibold">Width</td><td>De punta a punta del contenido de la página (w-full dentro de ANCHO_PAGINA): alineado con el título y con las cards.</td></tr>
          <tr><td className="font-semibold">Order</td><td>Ícono, tarea, Review y paginador a la izquierda; la X con <code>ml-auto</code>, sola a la derecha.</td></tr>
          <tr><td className="font-semibold">Fill</td><td><Token nombre="warn-bg" /></td></tr>
          <tr><td className="font-semibold">Text and border</td><td><Token nombre="warn-fg" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...E.parameters?.docs?.source}}}})))()}O();export{S as Empty,C as OnPage,w as Parts,b as Playground,x as Single,E as Specs,T as States,D as __namedExportsOrder,y as default};