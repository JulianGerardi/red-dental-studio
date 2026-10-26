import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{n,t as r}from"./PatientInSessionPopup-hcD4CV6K.js";import{a as i,c as a,d as o,i as s,l as c,r as l,t as u,u as d}from"./kit-CWUgB5-0.js";function f({alto:e=520,children:t}){return(0,p.jsx)(`div`,{className:`bg-page-background relative w-full overflow-hidden rounded-lg border border-line [transform:translateZ(0)]`,style:{height:e},children:t})}var p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{n(),o(),p=t(),m={title:`Components/Patients/PatientInSessionPopup`,component:r,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:620},description:{component:[`Quién está en el sillón ahora mismo, visible en toda la app (no sólo en Patients). Una **pestaña angosta pegada al borde derecho**, centrada verticalmente, que se abre en el lugar donde ya está -no un popover aparte-. Usa los turnos de hoy que todavía no están completados.`,``,`**Por qué una pestaña y no una card fija:** una card fija tapaba filas de tablas o el botón "+ New Patient"; moverla no alcanzaba, sólo corría el problema. La pestaña, lejos del header y de cualquier otro botón, no tapa nada.`,``,`**Probalo:** en *Default* tocá el avatar para abrir el detalle; Check out saca una fila de la lista.`].join(`
`)}}}},h={controls:{disable:!0}},g={decorators:[e=>(0,p.jsx)(f,{children:(0,p.jsx)(e,{})})]},_={parameters:{...h,docs:{story:{inline:!1,iframeHeight:700}}},decorators:[e=>(0,p.jsx)(`div`,{className:`p-4`,children:(0,p.jsx)(e,{})})],render:()=>(0,p.jsxs)(s,{children:[(0,p.jsx)(u,{nota:`Cerrada: sólo el avatar. Abierta: el mismo elemento se ensancha hacia la izquierda.`,children:(0,p.jsx)(`div`,{className:`grid gap-4 md:grid-cols-2`,children:(0,p.jsx)(f,{alto:260,children:(0,p.jsx)(r,{})})})}),(0,p.jsx)(c,{partes:[[`Tab`,`Pestaña angosta (46px) pegada al borde derecho, centrada verticalmente. Avatar del primer paciente en curso, o un ícono neutro si no hay ninguno.`,`onClick`],[`Live glow`,`Resplandor suave en el borde de toda la caja mientras hay alguien en curso, en vez de un punto que titila.`,"`session-live` en index.css"],[`Detail card`,`La pestaña se ensancha a 336px: lista de quién está en curso, con room, provider, hora y Check out.`,`abierto`],[`Row`,`Avatar, nombre (link a la ficha), room como chip de color, provider y hora; Check out saca la fila sin cerrar el panel.`,`onClick en el Link · Check out`],[`Collapse`,`Abierta, el botón del avatar cambia por un chevron para volver a la pestaña angosta.`,`ChevronRight`]]})]})},v={parameters:{...h,docs:{story:{inline:!1,iframeHeight:1300}}},decorators:[e=>(0,p.jsx)(`div`,{className:`p-4`,children:(0,p.jsx)(e,{})})],render:()=>(0,p.jsx)(s,{children:(0,p.jsxs)(`div`,{className:`grid gap-6 md:grid-cols-2`,children:[(0,p.jsx)(i,{titulo:`Closed, with patients`,nota:`Avatar del primero en curso; el borde brilla.`,children:(0,p.jsx)(f,{alto:260,children:(0,p.jsx)(r,{})})}),(0,p.jsx)(i,{titulo:`Hover`,nota:`Fondo sutil sobre la pestaña.`,children:(0,p.jsx)(l,{selector:`button`,estado:`hover`,children:(0,p.jsx)(f,{alto:260,children:(0,p.jsx)(r,{})})})})]})})},y={parameters:{...h,docs:{story:{inline:!0}}},render:()=>(0,p.jsx)(s,{children:(0,p.jsx)(u,{titulo:`Specs`,children:(0,p.jsxs)(a,{encabezado:[`Item`,`Value`],minimo:560,children:[(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Position`}),(0,p.jsxs)(`td`,{className:`tabular-nums`,children:[`fixed · top 50% · right 0 · z-30, centrada con `,(0,p.jsx)(`code`,{children:`-translate-y-1/2`}),`; no se mueve con el scroll.`]})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Closed width`}),(0,p.jsx)(`td`,{className:`tabular-nums`,children:`46px (Julián, 2026-10-26; antes 54px, junto con el disparador de Confibot: misma estética, los dos un poco más chicos).`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Open width`}),(0,p.jsx)(`td`,{className:`tabular-nums`,children:`336px; sólo el ancho anima (300ms).`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Avatar`}),(0,p.jsxs)(`td`,{children:[`28px (`,(0,p.jsxs)(`code`,{children:[`size=`,`{28}`]}),` de `,(0,p.jsx)(`code`,{children:`ui/avatar`}),`) cerrada; 32px (default) en cada fila de la lista abierta.`]})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Shape`}),(0,p.jsxs)(`td`,{children:[`Esquinas redondeadas sólo a la izquierda (`,(0,p.jsx)(`code`,{children:`rounded-l-xl`}),`): pegada al borde, sin borde derecho.`]})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Fill · border`}),(0,p.jsxs)(`td`,{children:[`Blanco, `,(0,p.jsx)(d,{nombre:`line`}),`, sombra `,(0,p.jsx)(`code`,{children:`shadow-floating`})]})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Live glow`}),(0,p.jsxs)(`td`,{children:[(0,p.jsx)(d,{nombre:`green`}),` (token detrás de `,(0,p.jsx)(`code`,{children:`session-live`}),`)`]})]})]})})})},b=[`Default`,`Parts`,`States`,`Specs`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  decorators: [Story => <Escena><Story /></Escena>]
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  parameters: {
    ...sinControles,
    docs: {
      story: {
        inline: false,
        iframeHeight: 700
      }
    }
  },
  decorators: [Story => <div className="p-4"><Story /></div>],
  render: () => <Lienzo>
      <Bloque nota="Cerrada: sólo el avatar. Abierta: el mismo elemento se ensancha hacia la izquierda.">
        <div className="grid gap-4 md:grid-cols-2">
          <Escena alto={260}><PatientInSessionPopup /></Escena>
        </div>
      </Bloque>
      <TablaPartes partes={[['Tab', 'Pestaña angosta (46px) pegada al borde derecho, centrada verticalmente. Avatar del primer paciente en curso, o un ícono neutro si no hay ninguno.', 'onClick'], ['Live glow', 'Resplandor suave en el borde de toda la caja mientras hay alguien en curso, en vez de un punto que titila.', '\`session-live\` en index.css'], ['Detail card', 'La pestaña se ensancha a 336px: lista de quién está en curso, con room, provider, hora y Check out.', 'abierto'], ['Row', 'Avatar, nombre (link a la ficha), room como chip de color, provider y hora; Check out saca la fila sin cerrar el panel.', 'onClick en el Link · Check out'], ['Collapse', 'Abierta, el botón del avatar cambia por un chevron para volver a la pestaña angosta.', 'ChevronRight']]} />
    </Lienzo>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  parameters: {
    ...sinControles,
    docs: {
      story: {
        inline: false,
        iframeHeight: 1300
      }
    }
  },
  decorators: [Story => <div className="p-4"><Story /></div>],
  render: () => <Lienzo>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="Closed, with patients" nota="Avatar del primero en curso; el borde brilla.">
          <Escena alto={260}><PatientInSessionPopup /></Escena>
        </Muestra>
        <Muestra titulo="Hover" nota="Fondo sutil sobre la pestaña.">
          <Forzar selector="button" estado="hover">
            <Escena alto={260}><PatientInSessionPopup /></Escena>
          </Forzar>
        </Muestra>
      </div>
    </Lienzo>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: {
    ...sinControles,
    docs: {
      story: {
        inline: true
      }
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Specs">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Position</td><td className="tabular-nums">fixed · top 50% · right 0 · z-30, centrada con <code>-translate-y-1/2</code>; no se mueve con el scroll.</td></tr>
          <tr><td className="font-semibold">Closed width</td><td className="tabular-nums">46px (Julián, 2026-10-26; antes 54px, junto con el disparador de Confibot: misma estética, los dos un poco más chicos).</td></tr>
          <tr><td className="font-semibold">Open width</td><td className="tabular-nums">336px; sólo el ancho anima (300ms).</td></tr>
          <tr><td className="font-semibold">Avatar</td><td>28px (<code>size={'{28}'}</code> de <code>ui/avatar</code>) cerrada; 32px (default) en cada fila de la lista abierta.</td></tr>
          <tr><td className="font-semibold">Shape</td><td>Esquinas redondeadas sólo a la izquierda (<code>rounded-l-xl</code>): pegada al borde, sin borde derecho.</td></tr>
          <tr><td className="font-semibold">Fill · border</td><td>Blanco, <Token nombre="line" />, sombra <code>shadow-floating</code></td></tr>
          <tr><td className="font-semibold">Live glow</td><td><Token nombre="green" /> (token detrás de <code>session-live</code>)</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...y.parameters?.docs?.source}}}})))()}x();export{g as Default,_ as Parts,y as Specs,v as States,b as __namedExportsOrder,m as default};