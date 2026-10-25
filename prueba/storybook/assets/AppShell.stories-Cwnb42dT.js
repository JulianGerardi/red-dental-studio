import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{c as t,l as n,r,s as i}from"./chunk-62JRHF6Z-QSPpyyt6.js";import{t as a}from"./jsx-runtime-DeHZSEgm.js";import{gt as o,ht as s}from"./iframe-BGgAqAY6.js";import{c,d as l,i as u,t as d}from"./kit-CWUgB5-0.js";import{r as f,t as p}from"./notificacionesStore-3eDmSFKO.js";import{n as m,t as h}from"./AppShell-fumU_Qoq.js";var g,_,v,y,b;function x(){return(x=e((()=>{n(),o(),f(),l(),m(),g=a(),_={title:`Components/Layout/AppShell`,component:h,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,iframeHeight:620},description:{component:["El marco de toda la app: rail a la izquierda, barra de arriba, banner de avisos y, debajo, el `main` con cada pantalla. Los botones flotantes (Confibot y la pestaña *Currently being seen*) viven en la columna derecha, encima del contenido.",``,"**Espacio al final de la página:** el contenido termina a ras, con el mismo padding que tiene a los costados (24px). Sólo en celular el `main` reserva 96px abajo para poder scrollear Cancel/Save por encima del botón de Confibot, que ahí no tiene columna propia (Julián, 2026-10-25, comparando con la app de red).",``,`**Probalo:** en *Default* achicá la ventana por debajo de 640px: aparece la reserva de abajo; por encima, no.`].join(`
`)}},router:!1}},v={render:()=>(0,g.jsx)(r,{children:(0,g.jsx)(s,{children:(0,g.jsx)(p,{children:(0,g.jsx)(t,{children:(0,g.jsx)(i,{element:(0,g.jsx)(h,{}),children:(0,g.jsx)(i,{index:!0,element:(0,g.jsx)(`div`,{className:`p-8 text-sm text-ink-muted`,children:`Page content goes here.`})})})})})})})},y={parameters:{layout:`padded`,controls:{disable:!0},docs:{story:{inline:!0}}},render:()=>(0,g.jsx)(u,{children:(0,g.jsx)(d,{titulo:`Page end spacing`,nota:`Medido con la página scrolleada hasta el final.`,children:(0,g.jsxs)(c,{encabezado:[`Width`,`Below the last element`,`Why`],minimo:560,children:[(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`640px and up`}),(0,g.jsxs)(`td`,{children:[`24px (`,(0,g.jsx)(`code`,{children:`py-6`}),` de la página)`]}),(0,g.jsx)(`td`,{children:`Igual que el padding de los costados; Confibot flota en la columna derecha y no tapa controles.`})]}),(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`Below 640px`}),(0,g.jsxs)(`td`,{children:[`24px + 96px (`,(0,g.jsx)(`code`,{children:`pb-24`}),` del `,(0,g.jsx)(`code`,{children:`main`}),`)`]}),(0,g.jsx)(`td`,{children:`No hay columna lateral: la reserva deja scrollear Cancel/Save por encima del botón de Confibot.`})]}),(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`td`,{className:`font-semibold`,children:`Right side, 640px and up`}),(0,g.jsxs)(`td`,{children:[`24px (`,(0,g.jsx)(`code`,{children:`sm:pr-6`}),` del `,(0,g.jsx)(`code`,{children:`main`}),`) + 24–32px de la página`]}),(0,g.jsxs)(`td`,{children:[`Margen para la pestaña `,(0,g.jsx)(`em`,{children:`Currently being seen`}),` (54px) sin tocar kebabs ni filas.`]})]})]})})})},b=[`Default`,`Specs`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <MemoryRouter>
      <HelpProvider>
        <NotificacionesProvider>
          <Routes>
            <Route element={<AppShell />}>
              <Route index element={<div className="p-8 text-sm text-ink-muted">Page content goes here.</div>} />
            </Route>
          </Routes>
        </NotificacionesProvider>
      </HelpProvider>
    </MemoryRouter>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
      <Bloque titulo="Page end spacing" nota="Medido con la página scrolleada hasta el final.">
        <Tabla encabezado={['Width', 'Below the last element', 'Why']} minimo={560}>
          <tr><td className="font-semibold">640px and up</td><td>24px (<code>py-6</code> de la página)</td><td>Igual que el padding de los costados; Confibot flota en la columna derecha y no tapa controles.</td></tr>
          <tr><td className="font-semibold">Below 640px</td><td>24px + 96px (<code>pb-24</code> del <code>main</code>)</td><td>No hay columna lateral: la reserva deja scrollear Cancel/Save por encima del botón de Confibot.</td></tr>
          <tr><td className="font-semibold">Right side, 640px and up</td><td>24px (<code>sm:pr-6</code> del <code>main</code>) + 24–32px de la página</td><td>Margen para la pestaña <em>Currently being seen</em> (54px) sin tocar kebabs ni filas.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...y.parameters?.docs?.source}}}})))()}x();export{v as Default,y as Specs,b as __namedExportsOrder,_ as default};