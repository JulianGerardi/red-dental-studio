import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./react-BZJXY1be.js";import{t as n}from"./jsx-runtime-DeHZSEgm.js";import{n as r,o as i}from"./notificaciones-CyKwYAlH.js";import{c as a,d as o,i as s,t as c,u as l}from"./kit-CWUgB5-0.js";import{n as u,r as d}from"./notificacionesStore-BURo7scn.js";import{n as f,t as p}from"./NotificationBanner-CHnUnMXw.js";function m({items:e}){let[t,n]=(0,g.useState)(0);return(0,_.jsx)(p,{items:e,cursor:t,onCursor:n,onOcultar:()=>{}})}function h(){let[e,t]=(0,g.useState)(0);return(0,_.jsxs)(`div`,{className:`bg-page-background pb-6`,children:[(0,_.jsx)(p,{items:b,cursor:e,onCursor:t,onOcultar:()=>{}}),(0,_.jsxs)(`div`,{className:`mx-auto w-full max-w-[1400px] px-6 pt-5`,children:[(0,_.jsx)(`p`,{className:`text-[20px] font-bold text-ink`,children:`Notifications`}),(0,_.jsx)(`p`,{className:`text-[13px] text-ink-muted`,children:`Open one to go where it happened, or mark it as read or unread.`})]})]})}var g,_,v,y,b,x,S,C,w,T,E,D,O,k,A;function j(){return(j=e((()=>{g=t(),o(),i(),d(),f(),_=n(),{userEvent:v,within:y}=__STORYBOOK_MODULE_TEST__,b=u(r,[]),x={title:`Components/Layout/NotificationBanner`,component:p,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:620},description:{component:["El aviso de tareas sin leer arriba de cada pantalla (documentos para firmar, derivaciones, llamados). Es la **tarjeta** ámbar del design system, de punta a punta de la columna de contenido (Julián, 2026-10-13; antes iba del ancho de su texto), sin padding, sin esquinas redondeadas ni tope de ancho (Julián, 2026-10-19): pegado al header, al rail y al borde derecho, sin el `max-w` que acota el resto de la página.",``,`**Cómo se ordena:** la tarea, Review y el paginador juntos a la izquierda; colapsar y la X, a la derecha.`,``,`**Qué tiene:** ícono, la tarea y su detalle, Review, el paginador cuando hay más de una, la flecha para colapsar el aviso entero y la X para ocultar esa tarea puntual.`,``,`**Probalo:** en *Playground* pasá de tarea con las flechas o colapsá el aviso con la flecha de arriba.`].join(`
`)}}},args:{items:b,cursor:0,onCursor:()=>{},onOcultar:()=>{}}},S={render:e=>(0,_.jsx)(m,{items:e.items})},C={render:()=>(0,_.jsx)(m,{items:b.slice(0,1)})},w={render:()=>(0,_.jsxs)(`div`,{className:`border border-dashed border-line-strong p-4 text-[12px] text-ink-muted`,children:[(0,_.jsx)(p,{items:[],cursor:0,onCursor:()=>{},onOcultar:()=>{}}),`No banner is rendered when there are no pending tasks.`]})},T={render:()=>(0,_.jsx)(m,{items:b}),play:async e=>{await v.click(await y(e.canvasElement).findByRole(`button`,{name:`Collapse banner`}))}},E={render:()=>(0,_.jsx)(h,{})},D={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,_.jsx)(s,{children:(0,_.jsx)(c,{titulo:`Parts`,children:(0,_.jsxs)(a,{encabezado:[`Part`,`What it does`],minimo:560,children:[(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Icon`}),(0,_.jsx)(`td`,{children:`El tipo de tarea, en el color del aviso.`})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Title and detail`}),(0,_.jsx)(`td`,{children:`Qué hay que hacer y para quién, con cuándo se mandó.`})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Review`}),(0,_.jsx)(`td`,{children:`Lleva a la tarea.`})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Pager`}),(0,_.jsx)(`td`,{children:`1 of 4 con flechas; sólo con más de una tarea. Separado por una línea.`})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Collapse`}),(0,_.jsx)(`td`,{children:`Colapsa el aviso entero a una tira angosta con el total ("4 pending tasks"); un clic ahí lo vuelve a abrir.`})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Close`}),(0,_.jsx)(`td`,{children:`Oculta esa tarea puntual del banner; sigue sin leer en la campana y en Notifications. No colapsa el aviso.`})]})]})})})},O={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,_.jsx)(s,{children:(0,_.jsx)(c,{titulo:`States`,children:(0,_.jsxs)(a,{encabezado:[`State`,`When`,`Story`],minimo:560,children:[(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Several`}),(0,_.jsx)(`td`,{children:`Más de una tarea: paginador.`}),(0,_.jsx)(`td`,{children:`Playground`})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Single`}),(0,_.jsx)(`td`,{children:`Una tarea: sin paginador.`}),(0,_.jsx)(`td`,{children:`Single`})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Collapsed`}),(0,_.jsx)(`td`,{children:`Colapsado con la flecha: tira angosta con el total.`}),(0,_.jsx)(`td`,{children:`Collapsed`})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Empty`}),(0,_.jsx)(`td`,{children:`Sin tareas: no se dibuja.`}),(0,_.jsx)(`td`,{children:`Empty`})]})]})})})},k={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,_.jsx)(s,{children:(0,_.jsx)(c,{titulo:`Specs`,children:(0,_.jsxs)(a,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Width`}),(0,_.jsxs)(`td`,{children:[`100% de la columna de contenido (sidebar aparte), sin el `,(0,_.jsx)(`code`,{children:`max-w`}),` de ANCHO_PAGINA que acota el título y las cards.`]})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Padding`}),(0,_.jsx)(`td`,{children:`Ninguno arriba ni a los costados: pegado al header, al rail y al borde derecho.`})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Corners`}),(0,_.jsxs)(`td`,{children:[`Sin redondear (0px): `,(0,_.jsx)(`code`,{children:`rounded-lg`}),` se saca a propósito.`]})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Border`}),(0,_.jsxs)(`td`,{children:[`Sólo abajo (`,(0,_.jsx)(`code`,{children:`border-b`}),`); arriba, a la izquierda y a la derecha ya delimitan el header, el rail y el borde de la ventana.`]})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Order`}),(0,_.jsxs)(`td`,{children:[`Ícono, tarea, Review y paginador a la izquierda; colapsar y la X juntas, con `,(0,_.jsx)(`code`,{children:`ml-auto`}),`, a la derecha.`]})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Fill`}),(0,_.jsx)(`td`,{children:(0,_.jsx)(l,{nombre:`warn-bg`})})]}),(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`td`,{className:`font-semibold`,children:`Text and border`}),(0,_.jsx)(`td`,{children:(0,_.jsx)(l,{nombre:`warn-fg`})})]})]})})})},A=[`Playground`,`Single`,`Empty`,`Collapsed`,`OnPage`,`Parts`,`States`,`Specs`],S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: args => <Demo items={args.items} />
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <Demo items={TAREAS.slice(0, 1)} />
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <div className="border border-dashed border-line-strong p-4 text-[12px] text-ink-muted">
      <NotificationBanner items={[]} cursor={0} onCursor={() => {}} onOcultar={() => {}} />
      No banner is rendered when there are no pending tasks.
    </div>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <Demo items={TAREAS} />,
  play: async c => {
    await userEvent.click(await within(c.canvasElement).findByRole('button', {
      name: 'Collapse banner'
    }));
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <Pagina />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
          <tr><td className="font-semibold">Collapse</td><td>Colapsa el aviso entero a una tira angosta con el total ("4 pending tasks"); un clic ahí lo vuelve a abrir.</td></tr>
          <tr><td className="font-semibold">Close</td><td>Oculta esa tarea puntual del banner; sigue sin leer en la campana y en Notifications. No colapsa el aviso.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
          <tr><td className="font-semibold">Collapsed</td><td>Colapsado con la flecha: tira angosta con el total.</td><td>Collapsed</td></tr>
          <tr><td className="font-semibold">Empty</td><td>Sin tareas: no se dibuja.</td><td>Empty</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
          <tr><td className="font-semibold">Width</td><td>100% de la columna de contenido (sidebar aparte), sin el <code>max-w</code> de ANCHO_PAGINA que acota el título y las cards.</td></tr>
          <tr><td className="font-semibold">Padding</td><td>Ninguno arriba ni a los costados: pegado al header, al rail y al borde derecho.</td></tr>
          <tr><td className="font-semibold">Corners</td><td>Sin redondear (0px): <code>rounded-lg</code> se saca a propósito.</td></tr>
          <tr><td className="font-semibold">Border</td><td>Sólo abajo (<code>border-b</code>); arriba, a la izquierda y a la derecha ya delimitan el header, el rail y el borde de la ventana.</td></tr>
          <tr><td className="font-semibold">Order</td><td>Ícono, tarea, Review y paginador a la izquierda; colapsar y la X juntas, con <code>ml-auto</code>, a la derecha.</td></tr>
          <tr><td className="font-semibold">Fill</td><td><Token nombre="warn-bg" /></td></tr>
          <tr><td className="font-semibold">Text and border</td><td><Token nombre="warn-fg" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...k.parameters?.docs?.source}}}})))()}j();export{T as Collapsed,w as Empty,E as OnPage,D as Parts,S as Playground,C as Single,k as Specs,O as States,A as __namedExportsOrder,x as default};