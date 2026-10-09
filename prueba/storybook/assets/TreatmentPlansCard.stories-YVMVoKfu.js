import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{a as n,c as r}from"./TreatmentPanel-dunv15tu.js";import{i,n as a,o,r as s}from"./play-Dr1R_I1D.js";import{c,d as l,i as u,t as d,u as f}from"./kit-4bQS7S9u.js";var p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{r(),l(),s(),p=t(),m={title:`Components/Clinical/Treatment plans card`,parameters:{layout:`padded`,docs:{decisionsFrom:`components/clinical/TreatmentPanel.tsx`,description:{component:[`La card *Treatment plans* de la columna derecha de Treatment, en Clinical Mode: los planes del paciente (los tres primeros sin descartar) con el detalle de cada procedimiento.`,``,`**Decisión:** Julián eligió esta opción (A) entre tres propuestas, porque muestra el detalle de cada procedimiento: estado, código, nombre, pieza, superficie y proveedor. Se probaron una con barra de avance por plan (B) y otra en línea de tiempo por visita (C).`,``,`**Probalo:** en *Playground* abrí y cerrá los planes y usá el menú de un procedimiento.`].join(`
`)}}},args:{width:311},argTypes:{width:{control:{type:`range`,min:260,max:420,step:1},description:`Ancho de la columna (311 en Treatment).`}}},h={render:({width:e})=>(0,p.jsx)(`div`,{style:{width:e},children:(0,p.jsx)(n,{})})},g={parameters:{controls:{disable:!0}},render:()=>(0,p.jsx)(u,{children:(0,p.jsx)(d,{titulo:`Parts`,children:(0,p.jsxs)(c,{encabezado:[`Part`,`What it does`],children:[(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Plan`}),(0,p.jsx)(`td`,{children:`Nombre del plan, plegable; el primero abre expandido.`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Procedure`}),(0,p.jsx)(`td`,{children:`Tarjeta chica con borde verde: pill de estado, código y nombre.`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Details`}),(0,p.jsx)(`td`,{children:`Tooth, Surface y Provider, con el rótulo en Semibold.`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Menu`}),(0,p.jsx)(`td`,{children:`⋮ con Open in Treatment Plan, que abre el caso.`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Limit`}),(0,p.jsx)(`td`,{children:`Los tres primeros procedimientos de cada plan.`})]})]})})})},_={parameters:{controls:{disable:!0}},render:()=>(0,p.jsx)(u,{children:(0,p.jsx)(d,{titulo:`States`,children:(0,p.jsxs)(c,{encabezado:[`State`,`When`,`Story`],children:[(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Expanded`}),(0,p.jsx)(`td`,{children:`El primer plan al abrir, o el que se toca.`}),(0,p.jsx)(`td`,{className:`text-ink-muted`,children:`Playground`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Collapsed`}),(0,p.jsx)(`td`,{children:`Los demás planes: sólo el nombre y la flecha.`}),(0,p.jsx)(`td`,{className:`text-ink-muted`,children:`Playground`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Two open`}),(0,p.jsx)(`td`,{children:`Se pueden abrir varios a la vez.`}),(0,p.jsx)(`td`,{className:`text-ink-muted`,children:`Second Plan Open`})]})]})})})},v={render:({width:e})=>(0,p.jsx)(`div`,{style:{width:e},children:(0,p.jsx)(n,{})}),play:o(i(/^periodontist alternative$/i),a(/periodontist alternative/i))},y={parameters:{controls:{disable:!0}},render:()=>(0,p.jsxs)(u,{children:[(0,p.jsx)(d,{titulo:`Measures`,children:(0,p.jsxs)(c,{encabezado:[`Piece`,`Value`],children:[(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Card`}),(0,p.jsx)(`td`,{className:`tabular-nums`,children:`311px (la columna derecha de Treatment), padding 16px; card de la página: sombra y sin borde`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Title`}),(0,p.jsx)(`td`,{className:`tabular-nums`,children:`15px Bold`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Plan name`}),(0,p.jsx)(`td`,{className:`tabular-nums`,children:`12px Medium`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Procedure`}),(0,p.jsx)(`td`,{className:`tabular-nums`,children:`12px, código en Semibold; borde izquierdo de 2px`})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Details`}),(0,p.jsx)(`td`,{className:`tabular-nums`,children:`10px`})]})]})}),(0,p.jsx)(d,{titulo:`Colors`,children:(0,p.jsxs)(c,{encabezado:[`Piece`,`Token`],children:[(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Procedure background`}),(0,p.jsx)(`td`,{children:(0,p.jsx)(f,{nombre:`surface-alt`})})]}),(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{className:`font-semibold`,children:`Procedure border`}),(0,p.jsx)(`td`,{children:(0,p.jsx)(f,{nombre:`status-ok`})})]})]})})]})},b=[`Playground`,`Parts`,`States`,`SecondPlanOpen`,`Specs`],h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: ({
    width
  }) => <div style={{
    width
  }}><TreatmentPlansCard /></div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Parts">
        <Tabla encabezado={['Part', 'What it does']}>
          <tr><td className="font-semibold">Plan</td><td>Nombre del plan, plegable; el primero abre expandido.</td></tr>
          <tr><td className="font-semibold">Procedure</td><td>Tarjeta chica con borde verde: pill de estado, código y nombre.</td></tr>
          <tr><td className="font-semibold">Details</td><td>Tooth, Surface y Provider, con el rótulo en Semibold.</td></tr>
          <tr><td className="font-semibold">Menu</td><td>⋮ con Open in Treatment Plan, que abre el caso.</td></tr>
          <tr><td className="font-semibold">Limit</td><td>Los tres primeros procedimientos de cada plan.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="States">
        <Tabla encabezado={['State', 'When', 'Story']}>
          <tr><td className="font-semibold">Expanded</td><td>El primer plan al abrir, o el que se toca.</td><td className="text-ink-muted">Playground</td></tr>
          <tr><td className="font-semibold">Collapsed</td><td>Los demás planes: sólo el nombre y la flecha.</td><td className="text-ink-muted">Playground</td></tr>
          <tr><td className="font-semibold">Two open</td><td>Se pueden abrir varios a la vez.</td><td className="text-ink-muted">Second Plan Open</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: ({
    width
  }) => <div style={{
    width
  }}><TreatmentPlansCard /></div>,
  play: secuencia(pulsar(/^periodontist alternative$/i), esperar(/periodontist alternative/i))
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <Lienzo>
      <Bloque titulo="Measures">
        <Tabla encabezado={['Piece', 'Value']}>
          <tr><td className="font-semibold">Card</td><td className="tabular-nums">311px (la columna derecha de Treatment), padding 16px; card de la página: sombra y sin borde</td></tr>
          <tr><td className="font-semibold">Title</td><td className="tabular-nums">15px Bold</td></tr>
          <tr><td className="font-semibold">Plan name</td><td className="tabular-nums">12px Medium</td></tr>
          <tr><td className="font-semibold">Procedure</td><td className="tabular-nums">12px, código en Semibold; borde izquierdo de 2px</td></tr>
          <tr><td className="font-semibold">Details</td><td className="tabular-nums">10px</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Piece', 'Token']}>
          <tr><td className="font-semibold">Procedure background</td><td><Token nombre="surface-alt" /></td></tr>
          <tr><td className="font-semibold">Procedure border</td><td><Token nombre="status-ok" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
}`,...y.parameters?.docs?.source}}}})))()}x();export{g as Parts,h as Playground,v as SecondPlanOpen,y as Specs,_ as States,b as __namedExportsOrder,m as default};